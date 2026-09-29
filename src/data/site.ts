/* ---------------------------------------------------------------------------
 * Identité du site — c'est le SEUL fichier à modifier pour personnaliser
 * le nom, le titre, la bio et les liens.
 * ------------------------------------------------------------------------- */

export const site = {
  nom: 'FARAG Sharly',
  pseudo: 'Sharly-mod',
  titre: 'FARAG Sharly — Développeur web & game systems',
  description:
    'Portfolio de FARAG Sharly : applications web full-stack, plugins de jeu en Java et veille technologique sur l’IA appliquée au jeu vidéo.',
  resumeCourt:
    'Développeur web full-stack et systèmes de jeu. Je conçois des applications complètes — du modèle de données à l’interface — et je surveille de près ce que l’IA change vraiment dans le game design, les moteurs et le web.',

  // L'adresse est affichée en clair sur la page À propos et dans un bouton
  // « Email » : c'est un contact public, à lire par des recruteurs.
  email: 'Sharly923@gmail.com',

  liens: [
    { label: 'GitHub', url: 'https://github.com/Sharly-mod', icone: 'github' },
    // Placeholder : aucune URL LinkedIn n'a encore été fournie. À remplacer
    // par l'URL complète du profil, ou à supprimer si le profil n'existe pas.
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/', icone: 'linkedin' },
  ],

  localisation: 'France',
  disponiblesPour: 'Alternance / stage en développement web ou game systems',
} as const;

/* Thème utilisé pour l'alternance clair/sombre (voir global.css) */
export const theme = {
  modeParDefaut: 'sombre' as const,
};
