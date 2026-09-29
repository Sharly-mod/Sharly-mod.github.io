#!/usr/bin/env node
/**
 * Veille automatique — récupère les flux RSS déclarés dans veille.config.mjs,
 * ne garde que les articles pertinents pour l'IA et le jeu vidéo, et écrit un
 * fichier JSON par nouvel article dans src/content/veille/.
 *
 *   node scripts/fetch-veille.mjs [options]
 *
 * Options :
 *   --max <n>       nombre maximal d'articles conservés au total (défaut 300)
 *   --days <n>      ne chercher que les articles des n derniers jours (défaut 30)
 *   --dry-run       n'écrit rien, affiche ce qui serait ajouté
 *   --quiet         n'affiche pas le détail par flux
 *
 * Le script est idempotent : relancer sans modification n'ajoute rien.
 */

import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import { feeds, scoring, quotaParCategorie } from './veille.config.mjs';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOSSIER = join(RACINE, 'src', 'content', 'veille');
const OPML = join(RACINE, 'public', 'veille.opml');

/**
 * Un article est gardé si `score + poidsDuFlux >= SEUIL`.
 * Calibré pour que : les flux très ciblés passent avec un titre pauvre en
 * mots-clés, et qu'un flux généraliste (arXiv) ne vide pas la base.
 */
const SEUIL = 9;

const args = process.argv.slice(2);
const option = (nom, defaut) => {
  const i = args.indexOf(`--${nom}`);
  return i === -1 ? defaut : args[i + 1];
};
const MAX = Number(option('max', 300));
const JOURS = Number(option('days', 30));
const DRY = args.includes('--dry-run');
const QUIET = args.includes('--quiet');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
  parseTagValue: false,
});

/* ------------------------------ utilitaires ------------------------------ */

/**
 * Extrait la valeur textuelle d'un nœud XML. Selon le flux et le parseur, la
 * valeur arrive en chaîne (`<title>Foo</title>`) ou enveloppée dans un objet
 * (`<title type="html">Foo</title>` devient `{ '#text': 'Foo' }`).
 */
const texte = (v) => {
  if (Array.isArray(v)) return texte(v[0]);
  if (v && typeof v === 'object') return texte(v['#text'] ?? v['@_href'] ?? '');
  return v ?? '';
};

const nettoyer = (s) =>
  String(s ?? '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

/** Normalise une URL pour la comparaison (paramètres de tracking retiré). */
function cleUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    for (const p of [...u.searchParams.keys()]) {
      if (/^(utm_|ref|fbclid|gclid|mc_|oc$)/i.test(p)) u.searchParams.delete(p);
    }
    return `${u.origin}${u.pathname}${u.search}`.replace(/\/$/, '').toLowerCase();
  } catch {
    return String(url).toLowerCase();
  }
}

function slug(texte_) {
  return String(texte_)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

/** Score de pertinence : 0 = jeté. */
function scorer(article) {
  const t = article.titre.toLowerCase();
  const r = (article.resume ?? '').toLowerCase();

  for (const mot of scoring.exclusion) {
    if (t.includes(mot)) return { score: -1, tags: [] };
  }

  const tags = [];
  let score = 0;

  for (const [liste, poids, prefixe] of [
    [scoring.fort, 6, 'ia-jv'],
    [scoring.moyen, 3, 'ia'],
    [scoring.large, 2, 'tech'],
  ]) {
    for (const mot of liste) {
      if (t.includes(mot)) {
        score += poids;
        if (!tags.includes(prefixe)) tags.push(prefixe);
      } else if (r.includes(mot)) {
        score += Math.max(1, poids / 3);
        if (!tags.includes(prefixe)) tags.push(prefixe);
      }
    }
  }

  return { score, tags };
}

function lireDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

/* ------------------------------ lecture RSS ------------------------------ */

/** Extrait les items d'un flux, qu'il soit RSS 2.0 ou Atom. */
function extraireItems(xml) {
  const doc = parser.parse(xml);
  const racine = doc?.rss?.channel ?? doc?.feed ?? doc?.['rdf:RDF'] ?? {};

  const items = racine.item ?? racine.entry ?? (Array.isArray(racine) ? racine : []);
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      // Atom : les liens sont des objets avec @_href, le premier rel="alternate" gagne
      const liens = item.link
        ? Array.isArray(item.link)
          ? item.link
          : [item.link]
        : [];
      const href =
        item.guid?.['@_href'] ??
        item.id ??
        liens.find((l) => l?.['@_rel'] !== 'self')?.['@_href'] ??
        liens.find((l) => typeof l === 'string');

      return {
        titre: nettoyer(texte(item.title)),
        url: typeof href === 'string' ? href.trim() : '',
        resume: nettoyer(
          texte(item.description) ?? texte(item.summary) ?? texte(item['content:encoded'])
        ).slice(0, 600),
        date: lireDate(
          texte(item.pubDate) ??
            texte(item.published) ??
            texte(item.updated) ??
            texte(item['dc:date'])
        ),
      };
    })
    .filter((a) => a.titre && a.url.startsWith('http'));
}

async function charger(url, signal) {
  const reponse = await fetch(url, {
    signal,
    headers: {
      'user-agent': 'portfolio-veille/1.0 (+https://github.com/Sharly-mod)',
      accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    },
  });
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
  return reponse.text();
}

/* --------------------------------- OPML ---------------------------------- */

function ecrireOpml() {
  const parCategorie = new Map();
  for (const f of feeds) {
    if (f.actif === false) continue;
    if (!parCategorie.has(f.categorie)) parCategorie.set(f.categorie, []);
    parCategorie.get(f.categorie).push(f);
  }

  const echappe = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n  <head>\n';
  xml += `    <title>Veille — Sharly Farag</title>\n`;
  xml += `    <dateCreated>${new Date().toUTCString()}</dateCreated>\n`;
  xml += '  </head>\n  <body>\n';

  for (const [categorie, liste] of parCategorie) {
    xml += `    <outline text="${echappe(categorie)}" title="${echappe(categorie)}">\n`;
    for (const f of liste) {
      xml += `      <outline type="rss" text="${echappe(f.nom)}" title="${echappe(f.nom)}" xmlUrl="${echappe(
        f.url
      )}" htmlUrl="${echappe(f.url.replace(/\/feed\/?$/, ''))}"/>\n`;
    }
    xml += '    </outline>\n';
  }

  xml += '  </body>\n</opml>\n';
  return xml;
}

/* --------------------------------- run ----------------------------------- */

async function existant() {
  if (!existsSync(DOSSIER)) return [];
  const fichiers = (await readdir(DOSSIER)).filter((f) => f.endsWith('.json'));
  return Promise.all(
    fichiers.map(async (f) => {
      const brut = await readFile(join(DOSSIER, f), 'utf8');
      return { fichier: f, ...JSON.parse(brut) };
    })
  );
}

async function main() {
  if (!existsSync(DOSSIER)) await mkdir(DOSSIER, { recursive: true });

  const deja = await existant();
  const connues = new Set(deja.map((a) => cleUrl(a.url)));
  console.log(`\n  ${deja.length} article(s) déjà en base.\n`);

  const limite = Date.now() - JOURS * 86_400_000;
  const nouveaux = [];
  const echecs = [];
  let totalLus = 0;

  const controlleur = new AbortController();
  const minuteur = setTimeout(() => controlleur.abort(), 20_000);

  const actives = feeds.filter((f) => f.actif !== false);

  // Parallélisme raisonnable : 6 flux à la fois
  for (let i = 0; i < actives.length; i += 6) {
    const lot = actives.slice(i, i + 6);
    const resultats = await Promise.all(
      lot.map(async (flux) => {
        try {
          const xml = await charger(flux.url, controlleur.signal);
          const items = extraireItems(xml);
          return { flux, items };
        } catch (e) {
          return { flux, erreur: e.name === 'AbortError' ? 'délai dépassé (20 s)' : e.message };
        }
      })
    );

    for (const { flux, items, erreur } of resultats) {
      if (erreur) {
        echecs.push({ flux, erreur });
        if (!QUIET) console.log(`  ✗ ${flux.nom.padEnd(28)} ${erreur}`);
        continue;
      }

      const retenus = [];
      // Une source peut imposer son propre seuil ; 0 = on garde tout ce qui
      // passe le filtre anti-bruit (utile pour les médias déjà spécialisés).
      const seuil = flux.seuil ?? SEUIL;
      for (const item of items) {
        totalLus++;
        if (item.date && item.date.getTime() < limite) continue;
        const cle = cleUrl(item.url);
        if (connues.has(cle)) continue;

        const { score, tags } = scorer(item);
        if (seuil > 0 && score + flux.poids < seuil) continue;

        connues.add(cle);
        retenus.push({ ...item, score, tags: [...tags, flux.categorie], source: flux });
      }

      if (!QUIET) {
        const garde = `${retenus.length}/${items.length}`;
        console.log(
          `  ✓ ${flux.nom.padEnd(28)} ${garde.padStart(9)} retenu(s)  ${flux.categorie}`
        );
      }
      nouveaux.push(...retenus);
    }
  }

  clearTimeout(minuteur);

  /* ------------------------------ écriture ------------------------------- */

  // Équilibrage : on plafonne le nombre d'articles par catégorie pour qu'un
  // flux très bavard (arXiv) n'écrase pas le reste de la veille.
  const parCategorie = new Map();
  for (const a of nouveaux) {
    const cat = a.source.categorie;
    if (!parCategorie.has(cat)) parCategorie.set(cat, []);
    parCategorie.get(cat).push(a);
  }

  const equilibrés = [];
  for (const [cat, liste] of parCategorie) {
    const quota = quotaParCategorie[cat] ?? 30;
    if (liste.length > quota && !QUIET) {
      console.log(
        `  … ${cat} : ${liste.length} articles, ${quota} retenus (quota atteint)`
      );
    }
    equilibrés.push(...liste.sort((a, b) => b.score - a.score).slice(0, quota));
  }

  const tries = equilibrés
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, MAX - deja.length))
    .map((a) => {
      const date = (a.date ?? new Date()).toISOString().slice(0, 10);
      return {
        fichier: `${date}--${slug(a.source.nom)}--${slug(a.titre)}.json`,
        contenu: {
          titre: a.titre,
          url: a.url,
          source: a.source.nom,
          sourceUrl: a.source.url,
          date: (a.date ?? new Date()).toISOString(),
          categories: [...new Set(a.tags)],
          resume: a.resume,
          score: a.score,
        },
      };
    });

  if (DRY) {
    console.log(`\n  --dry-run : ${tries.length} article(s) seraient écrits.`);
  } else {
    // Noms de fichiers uniques : un suffixe -2, -3… est ajouté en cas de collision
    const nomsPris = new Set(
      (await readdir(DOSSIER)).filter((f) => f.endsWith('.json'))
    );
    for (const { fichier, contenu } of tries) {
      let nom = fichier;
      let suffixe = 2;
      while (nomsPris.has(nom)) {
        nom = fichier.replace(/\.json$/, `-${suffixe}.json`);
        suffixe++;
      }
      nomsPris.add(nom);
      await writeFile(join(DOSSIER, nom), JSON.stringify(contenu, null, 2) + '\n', 'utf8');
    }

    // Export OPML pour importer les mêmes sources dans un lecteur RSS
    await writeFile(OPML, ecrireOpml(), 'utf8');

    // Purge : on garde les MAX articles les plus récents
    const fichiers = nomsPris.size ? [...nomsPris] : [];
    if (fichiers.length > MAX) {
      const triesSupprimes = fichiers.sort().slice(0, fichiers.length - MAX);
      for (const f of triesSupprimes) await rm(join(DOSSIER, f), { force: true });
      console.log(`  Purge : ${triesSupprimes.length} article(s) hors quota supprimés.`);
    }

    console.log(`\n  ${tries.length} article(s) ajouté(s).`);
    console.log(`  OPML écrit dans public/veille.opml.\n`);
  }

  console.log(`  ${totalLus} article(s) lus sur ${actives.length} flux.`);
  if (echecs.length) {
    console.log(`  ${echecs.length} flux en échec : ${echecs.map((e) => e.flux.id).join(', ')}`);
    console.log('  (un flux mort n’empêche pas les autres d’être mis à jour)\n');
  } else {
    console.log('');
  }
}

main().catch((e) => {
  console.error('\n  Échec de la veille :', e.message, '\n');
  process.exit(1);
});
