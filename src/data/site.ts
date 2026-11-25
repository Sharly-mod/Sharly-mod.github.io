/* ---------------------------------------------------------------------------
 * Identité et informations générales du portfolio.
 * C'est le fichier à modifier en premier pour changer le nom, l'email ou les
 * liens affichés sur le site.
 * ------------------------------------------------------------------------- */

export const site = {
  nom: 'Sharly Farag',
  pseudo: 'Sharly-mod',
  titre: 'Sharly Farag — Portfolio BTS SIO SLAM',
  description:
    "Portfolio de Sharly Farag, étudiant en 2e année de BTS SIO option SLAM à Ingetis (Paris). Réalisations professionnelles, compétences, tableau de synthèse E5 et veille technologique.",
  resumeCourt:
    "Étudiant en 2e année de BTS SIO option SLAM à Ingetis (Paris). Je développe des applications web et des services back-end en PHP, Java et React, avec une attention particulière portée à la structure du code, aux bases de données et à la sécurité.",

  // Adresse de contact publique, affichée sur le site.
  email: 'Sharly923@gmail.com',

  liens: [
    { label: 'GitHub', url: 'https://github.com/Sharly-mod', icone: 'github' },
    // À remplacer par l'URL complète du profil LinkedIn, ou à supprimer
    // si le profil n'existe pas encore.
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/', icone: 'linkedin' },
  ],

  localisation: 'Paris / Île-de-France',
  formation: 'BTS SIO — option SLAM',
  etablissement: 'Ingetis, Paris',
  periodeFormation: '2025 — 2027',
  disponiblesPour:
    "Recherche une alternance ou une poursuite d'études en développement web & applicatif",
} as const;

/* Thème utilisé au premier chargement. L'utilisateur peut ensuite basculer
   clair/sombre : le choix est conservé dans localStorage. */
export const theme = {
  modeParDefaut: 'sombre' as const,
};

/* Mode examen blanc : les documents officiels ne sont pas encore disponibles.
   L'interface masque les fichiers manquants et présente le tableau HTML en
   ligne. Passer à false quand les PDF sont déposés dans public/documents/. */
export const examenBlanc: boolean = true;
