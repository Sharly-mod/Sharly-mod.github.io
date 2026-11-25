import type { CollectionEntry } from 'astro:content';

/* Libellés affichés pour les catégories de projets. Les valeurs du frontmatter
   restent techniques (atelier, stage, personnel…), l'affichage est centralisé
   ici pour éviter les incohérences entre la carte, la fiche et le tableau E5. */
export const libellesContexte: Record<string, string> = {
  atelier: 'Atelier Pro',
  stage: 'Stage',
  personnel: 'Projet Personnel',
  cours: 'Projet de cours',
  professionnel: 'Projet professionnel',
};

export const tonsContexte: Record<string, string> = {
  atelier: 'violet',
  stage: 'cyan',
  personnel: 'vert',
  cours: 'ambre',
  professionnel: 'ambre',
};

export const categoriesFiltre = [
  { id: 'tous', label: 'Tous' },
  { id: 'atelier', label: 'Atelier Pro' },
  { id: 'stage', label: 'Stage' },
  { id: 'personnel', label: 'Projet Personnel' },
] as const;

export function libelleContexte(projet: CollectionEntry<'projets'>): string {
  return libellesContexte[projet.data.contexte] ?? projet.data.contexte;
}

export function tonContexte(projet: CollectionEntry<'projets'>): string {
  return tonsContexte[projet.data.contexte] ?? 'violet';
}

/* Formate une date au format « 12 novembre 2026 ». */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
