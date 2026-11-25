import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { lien } from '../lib/urls';
import type { APIContext } from 'astro';

/**
 * Flux RSS de la veille E5 : uniquement les synthèses écrites à la main sur la
 * sécurité de la chaîne logistique logicielle et l'impact des outils d'IA.
 */
export async function GET(context: APIContext) {
  const syntheses = (await getCollection('veilleE5')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: `Veille technologique — ${site.nom}`,
    description:
      "Synthèses de veille sur la sécurité de la chaîne logistique logicielle (OWASP Top 10) et l'impact des outils d'IA sur le développement.",
    site: context.site ?? 'https://sharly-mod.github.io',
    trailingSlash: false,
    items: syntheses.map((note) => ({
      title: note.data.titre,
      description: note.data.resume,
      pubDate: note.data.date,
      link: lien(`/veille/${note.id}/`),
      categories: note.data.tags,
    })),
    customData: '<language>fr-fr</language>',
  });
}
