/* ---------------------------------------------------------------------------
 * Référentiel BTS SIO — les six blocs de compétences utilisés dans le tableau
 * de synthèse E5. Les codes C1 à C6 servent de clé dans les fiches projets.
 * ------------------------------------------------------------------------- */

export interface BlocCompetenceBts {
  code: 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
  titre: string;
  description: string;
}

export const blocsBts: BlocCompetenceBts[] = [
  {
    code: 'C1',
    titre: 'Gérer le patrimoine informatique',
    description:
      "Recenser les ressources, gérer les comptes et les droits, veiller à la disponibilité et à la sécurité des données.",
  },
  {
    code: 'C2',
    titre: 'Répondre aux incidents et aux demandes d’assistance et d’évolution',
    description:
      "Traiter un ticket, qualifier une demande, suivre sa résolution et documenter l'intervention.",
  },
  {
    code: 'C3',
    titre: 'Développer la présence en ligne de l’organisation',
    description:
      "Concevoir un service web accessible, référencé et cohérent avec l'image de l'organisation.",
  },
  {
    code: 'C4',
    titre: 'Travailler en mode projet',
    description:
      "Analyser le besoin, planifier, répartir le travail, suivre l'avancement et rendre compte.",
  },
  {
    code: 'C5',
    titre: 'Mettre à disposition des utilisateurs un service informatique',
    description:
      "Développer, tester, documenter et déployer un service utilisable, avec les droits adaptés.",
  },
  {
    code: 'C6',
    titre: 'Organiser son développement professionnel',
    description:
      "Maintenir ses compétences, faire une veille, documenter ses réalisations et préparer son insertion professionnelle.",
  },
];

/* Couleur d'accent utilisée dans les tableaux et les fiches, pour différencier
   les blocs sans multiplier les icônes. */
export const tonsBts: Record<BlocCompetenceBts['code'], string> = {
  C1: 'cyan',
  C2: 'ambre',
  C3: 'vert',
  C4: 'violet',
  C5: 'cyan',
  C6: 'ambre',
};
