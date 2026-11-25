/* ---------------------------------------------------------------------------
 * Parcours de formation et d'expérience.
 * Les zones entre crochets sont volontairement visibles : elles doivent être
 * complétées avec les informations validées avant l'oral.
 * ------------------------------------------------------------------------- */

export interface EtapeParcours {
  periode: string;
  titre: string;
  lieu: string;
  texte: string;
  aCompleter?: boolean;
}

export const parcours: EtapeParcours[] = [
  {
    periode: '2025 — 2027',
    titre: 'BTS SIO — option SLAM',
    lieu: 'Ingetis, Paris',
    texte:
      "Deuxième année orientée développement d'applications : PHP, Java, bases de données relationnelles, cybersécurité et gestion de projet. Les projets sont menés en équipe, avec un cahier des charges et une soutenance.",
  },
  {
    periode: '29 juin — 31 juillet 2026',
    titre: 'Stage de 1re année — DydyITServices / TIS-INGÉ',
    lieu: 'Projet TIS-INGÉ pour le client DITS — 5 semaines',
    texte:
      "Application GestioParc en PHP/MySQL : gestion du parc, tickets, rôles et tableau de bord. Le stage comprenait aussi un socle infrastructure Active Directory / DHCP et une phase de tests documentée.",
  },
  {
    periode: '2026 — en cours',
    titre: 'Deuxième stage — Refonte du site de Dayana',
    lieu: 'Stage en cours — [À COMPLÉTER : activité de Dayana]',
    texte:
      "Refonte d'un site existant : audit, nouvelle arborescence, intégration responsive et mise en ligne. Un travail directement avec la cliente, où il faut défendre des choix de contenu autant que de code.",
    aCompleter: true,
  },
  {
    periode: '2025 — aujourd’hui',
    titre: 'Expérience terrain — Marché Frais',
    lieu: 'Île-de-France',
    texte:
      "Gestion des stocks, mise en rayon et relation client. Une expérience qui rappelle qu'un besoin métier se comprend aussi sur le terrain, pas seulement dans un cahier des charges.",
  },
  {
    periode: '2026 — aujourd’hui',
    titre: 'Projets personnels & veille',
    lieu: 'Java, React, sécurité logicielle',
    texte:
      "Développement d'un plugin Paper en Java et d'une messagerie React/Supabase, complétés par une veille sur la sécurité de la chaîne logistique logicielle et l'impact des outils d'IA.",
  },
];

export const faconDeTravailler = [
  {
    titre: 'Comprendre avant de coder',
    texte:
      "Reformuler le besoin, identifier les acteurs et les règles métier, puis seulement choisir les tables et les écrans.",
  },
  {
    titre: 'Séparer les responsabilités',
    texte:
      "Un contrôleur ne fait pas de SQL, une vue ne décide pas d'un droit d'accès. Le MVC maison de Fair'repair m'a fait comprendre cette frontière.",
  },
  {
    titre: 'Sécuriser par défaut',
    texte:
      "Requêtes préparées, échappement des sorties, hachage des mots de passe et contrôle de rôle sur chaque route.",
  },
  {
    titre: 'Documenter et versionner',
    texte:
      "Un README, des commits explicites et un schéma de base de données à jour valent mieux qu'un dossier de fichiers non expliqués.",
  },
] as const;
