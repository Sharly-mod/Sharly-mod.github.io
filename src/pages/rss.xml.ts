import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { lien } from '../lib/urls';
import type { APIContext } from 'astro';

/**
 * Flux RSS de la veille : les notes d'analyse écrites à la main en premier
 * (elles ont de la valeur), puis les articles collectés automatiquement.
 */
export async function GET(context: APIContext) {
  const notes = (await getCollection('notes')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const flux = (await getCollection('veille'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 60);

  return rss({
    title: `Veille — ${site.nom}`,
    description:
      "Veille technologique sur l'IA appliquée au jeu vidéo : notes d'analyse et articles suivis automatiquement.",
    site: context.site ?? 'https://sharly-mod.github.io',
    trailingSlash: false,
    items: [
      ...notes.map((note) => ({
        title: note.data.titre,
        description: `${note.data.source} — note de veille personnelle.`,
        pubDate: note.data.date,
        link: lien(`/veille/note/${note.id}/`),
        categories: note.data.categories,
      })),
      ...flux.map((article) => ({
        title: article.data.titre,
        description: article.data.resume,
        pubDate: article.data.date,
        link: article.data.url,
        categories: article.data.categories,
      })),
    ],
    customData: '<language>fr-fr</language>',
  });
}
