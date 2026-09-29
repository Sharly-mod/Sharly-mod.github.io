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

  /* ─────────────── À REMPLIR : 2 champs, rien d'autre ───────────────
   *
   * 1. EMAIL  (ligne 18) — l'adresse où on peut t'écrire.
   *    Le site l'affiche en clair sur la page À propos et dans un bouton
   *    « Email ». Formate-le comme tu le veux, mais vérifie qu'il est
   *    correct : il sera public et lu par des recruteurs.
   *
   *    Exemple : email: 'ton.adresse@outlook.fr'
   *
   * 2. GITHUB (ligne 22) — l'URL complète de ton profil, pas d'un dépôt.
   *    Ouvre github.com, clique sur ta photo en haut à droite, copie
   *    l'adresse de la barre du navigateur. Elle finit par ton pseudo.
   *
   *    Exemple : url: 'https://github.com/TON-PSEUDO'
   *
   * ⚠ Remplace bien les deux valeurs d'exemple. Ne laisse ni
   *   example.com ni une URL tronquée : ça se voit immédiatement.
   * ──────────────────────────────────────────────────────────────────── */

  email: 'Sharly923@gmail.com',

  liens: [
    { label: 'GitHub', url: 'https://github.com/Sharly-mod', icone: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/', icone: 'linkedin' },
  ],

  localisation: 'France',
  disponiblesPour: 'Alternance / stage en développement web ou game systems',
} as const;

/* Thème utilisé pour l'alternance clair/sombre (voir global.css) */
export const theme = {
  modeParDefaut: 'sombre' as const,
};
