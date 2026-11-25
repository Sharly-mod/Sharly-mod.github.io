import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Le motif `[!_]*.md` ignore les fichiers commençant par un underscore :
   le guide et le modèle de projet vivent dans le dossier sans être publiés. */

/* ---------------------------------------------------------------------------
 * PROJETS — un fichier Markdown par projet dans src/content/projets/
 *
 * Le frontmatter porte les métadonnées et la fiche E5 (besoins, choix
 * techniques, CRUD, sécurité, compétences BTS). Le corps Markdown sert au
 * retour d'expérience : contexte vécu, difficultés, recul critique.
 *
 * `selectionE5: true` fait apparaître le projet dans la grille principale et
 * dans le tableau de synthèse. Les autres projets restent consultables dans
 * « Autres travaux ».
 * ------------------------------------------------------------------------- */
const projets = defineCollection({
  loader: glob({ pattern: '**/[!_]*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string().max(240),
    ordre: z.number().default(99),
    annee: z.number(),
    contexte: z.enum(['atelier', 'stage', 'personnel', 'cours', 'professionnel']),
    selectionE5: z.boolean().default(false),
    matieres: z.array(z.string()).default([]),
    statut: z.enum(['termine', 'en-cours', 'prototype', 'production']).default('termine'),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    competences: z.array(z.string()).default([]),
    besoins: z.array(z.string()).default([]),
    choixTechniques: z.array(z.string()).default([]),
    fonctionnalites: z.array(z.string()).default([]),
    crud: z.array(z.string()).default([]),
    securite: z.array(z.string()).default([]),
    competencesBts: z.array(z.enum(['C1', 'C2', 'C3', 'C4', 'C5', 'C6'])).default([]),
    captures: z.array(z.string()).default([]),
    aCompleter: z.array(z.string()).default([]),
    misEnAvant: z.boolean().default(false),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // Chemin depuis /public, ex. « captures/fairrepair/accueil.webp »
    image: z.string().optional(),
    couleur: z.enum(['violet', 'cyan', 'ambre', 'vert']).default('violet'),
    liens: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

/* ---------------------------------------------------------------------------
 * VEILLE E5 — trois synthèses écrites à la main dans src/content/veille-e5/
 *
 * C'est la veille présentée au jury : un sujet, une méthode, des sources et
 * une analyse d'impact pour un développeur SLAM. L'ancienne veille automatique
 * reste dans les collections `veille` et `notes`, accessible via les archives.
 * ------------------------------------------------------------------------- */
const veilleE5 = defineCollection({
  loader: glob({ pattern: '**/[!_]*.md', base: './src/content/veille-e5' }),
  schema: z.object({
    titre: z.string(),
    date: z.coerce.date(),
    source: z.string(),
    sourceUrl: z.string().url().optional(),
    resume: z.string().max(320),
    impact: z.string().max(420),
    tags: z.array(z.string()).default([]),
    tempsLecture: z.number().default(5),
    ordre: z.number().default(99),
  }),
});

/* ---------------------------------------------------------------------------
 * VEILLE AUTOMATIQUE — JSON écrits par `npm run veille`
 * Dossier src/content/veille/. Ne pas éditer à la main : le script ajoute
 * seulement, il ne supprime jamais. Sert d'archive.
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
 * Ancienne veille IA & jeu vidéo, conservée comme archive.
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

export const collections = { projets, veilleE5, veille, notes };
