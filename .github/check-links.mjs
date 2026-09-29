/*
 * Vérifie qu'aucun lien interne du site généré ne renvoie vers un fichier
 * absent de dist/. Un lien cassé passe inaperçu à la compilation, et se voit
 * seulement une fois en ligne — donc on le bloque avant le déploiement.
 *
 * Gère les deux modes de publication : à la racine (base = /) ou sous un
 * sous-chemin (base = /portfolio). Un lien sans le préfixe attendu est signalé
 * au même titre qu'un 404.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const dist = 'dist';
const base = (process.argv[2] ?? '/').replace(/\/$/, '');

const pages = [];
async function marcher(dossier) {
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) await marcher(chemin);
    else if (entree.name.endsWith('.html')) pages.push(chemin);
  }
}
await marcher(dist);

const problemes = [];
let liens = 0;

for (const page of pages) {
  const html = await readFile(page, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const url = m[1];
    liens++;
    if (!url.startsWith(`${base}/`) && url !== base) {
      problemes.push(`${page} -> ${url}  (préfixe « ${base} » manquant)`);
      continue;
    }
    const relatif = url.slice(base.length) || '/';
    if (relatif.startsWith('/_astro/')) continue; // assets, déjà vérifiés à la compilation
    const cible = relatif.endsWith('/') ? join(dist, relatif, 'index.html') : join(dist, relatif);
    try {
      await stat(cible);
    } catch {
      problemes.push(`${page} -> ${url}  (fichier absent)`);
    }
  }
}

if (problemes.length) {
  console.error(`${problemes.length} lien(s) interne(s) cassé(s) :`);
  for (const p of problemes.slice(0, 30)) console.error('  ' + p);
  process.exit(1);
}

console.log(`${pages.length} pages, ${liens} liens internes, aucun cassé.`);
