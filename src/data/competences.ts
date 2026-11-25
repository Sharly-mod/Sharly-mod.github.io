/* ---------------------------------------------------------------------------
 * Compétences techniques classées par domaine.
 *
 * Choix assumé : pas de barres de pourcentage. Une compétence se prouve par un
 * projet, un extrait de code ou une explication, pas par une jauge arbitraire.
 * ------------------------------------------------------------------------- */

export type IconeCompetence = 'code' | 'database' | 'shield' | 'outils';

export interface CategorieCompetence {
  id: string;
  titre: string;
  description: string;
  icone: IconeCompetence;
  items: string[];
}

export const competences: CategorieCompetence[] = [
  {
    id: 'developpement',
    titre: 'Développement web & applicatif',
    description:
      "Du back-end PHP à l'interface React, en passant par les scripts et les applications Java.",
    icone: 'code',
    items: [
      'PHP (POO, architecture MVC sans framework)',
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Node.js',
      'Java',
      'C#',
      'Python',
    ],
  },
  {
    id: 'bases-de-donnees',
    titre: 'Bases de données',
    description:
      "Conception du modèle avant l'écriture des requêtes : MCD, MLD, contraintes d'intégrité et accès sécurisé.",
    icone: 'database',
    items: [
      'MySQL',
      'MariaDB',
      'MCD / MLD',
      'InnoDB & clés étrangères',
      'Jointures et requêtes SQL avancées',
      'MongoDB',
      'Supabase / PostgreSQL',
    ],
  },
  {
    id: 'securite',
    titre: 'Cybersécurité & bonnes pratiques',
    description:
      "Sécuriser les entrées, les sessions et les accès, puis documenter les risques plutôt que les masquer.",
    icone: 'shield',
    items: [
      'Injections SQL — PDO & requêtes préparées',
      'XSS — htmlspecialchars()',
      'Hachage — password_hash() / password_verify()',
      'Contrôle d’accès par rôles (RBAC)',
      'OWASP Top 10',
      'Supply chain logicielle',
    ],
  },
  {
    id: 'outils',
    titre: 'Outils & environnement',
    description:
      "Versionner, conteneuriser et déployer sur un serveur Linux, avec des outils que je sais expliquer.",
    icone: 'outils',
    items: [
      'Git / GitHub',
      'VS Code',
      'Docker',
      'Linux Debian / Ubuntu Server',
      'Apache2',
      'Maven',
    ],
  },
];

/* Méthodes transversales affichées à part, pour ne pas mélanger outils et
   démarche de conception. */
export const methodes = [
  'Architecture MVC',
  'Opérations CRUD',
  'MCD / MLD',
  'UML',
  'Git Flow simplifié',
  'Revue de code',
] as const;
