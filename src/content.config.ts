import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Le motif `[!_]*.md` ignore les fichiers commençant par un underscore :
   le guide et le modèle de projet vivent dans le dossier sans être publiés. */

/* ---------------------------------------------------------------------------
 * PROJETS — un fichier Markdown par projet dans src/content/projets/
 * Le frontmatter porte les métadonnées, le corps sert au storytelling :
 * contexte, rôle, difficultés rencontrées, apprentissages.
 * Guide : src/content/projets/_MODE-EMPLOI.md
 * ------------------------------------------------------------------------- */
const projets = defineCollection({
  loader: glob({ pattern: '**/[!_]*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string().max(220),
    ordre: z.number().default(99),
    annee: z.number(),
    contexte: z.enum(['cours', 'personnel', 'stage', 'professionnel']),
    matieres: z.array(z.string()).default([]),
    statut: z.enum(['termine', 'en-cours', 'prototype', 'production']).default('termine'),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    competences: z.array(z.string()).default([]),
    misEnAvant: z.boolean().default(false),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // Chemin depuis /public, ex. « captures/frood/accueil.webp »
    image: z.string().optional(),
    couleur: z.enum(['violet', 'cyan', 'ambre', 'vert']).default('violet'),
    liens: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

/* ---------------------------------------------------------------------------
 * VEILLE AUTOMATIQUE — JSON écrits par `npm run veille`
 * Dossier src/content/veille/. Ne pas éditer à la main : le script ajoute
 * seulement, il ne supprime jamais.
 * ------------------------------------------------------------------------- */
const veille = defineCollection({
  loader: glob({ pattern: '**/[!_]*.json', base: './src/content/veille' }),
  schema: z.object({
    titre: z.string(),
    url: z.string().url(),
    source: z.string(),
    sourceUrl: z.string().url().optional(),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    resume: z.string().default(''),
    tags: z.array(z.string()).default([]),
    score: z.number().default(0),
  }),
});

/* ---------------------------------------------------------------------------
 * NOTES DE VEILLE — Markdown écrit à la main dans src/content/notes/
 * C'est ici qu'on explique en français ce qu'on a compris d'un article ou
 * d'un papier : c'est ce qui distingue une veille d'un simple agrégateur.
 * ------------------------------------------------------------------------- */
const notes = defineCollection({
  loader: glob({ pattern: '**/[!_]*.md', base: './src/content/notes' }),
  schema: z.object({
    titre: z.string(),
    url: z.string().url(),
    source: z.string(),
    date: z.coerce.date(),
    categories: z
      .array(z.enum(['ia-jv', 'recherche', 'moteurs', 'web', 'infra', 'metiers']))
      .default(['ia-jv']),
    tags: z.array(z.string()).default([]),
    projetLie: reference('projets').optional(),
    poids: z.number().default(1),
  }),
});

export const collections = { projets, veille, notes };
