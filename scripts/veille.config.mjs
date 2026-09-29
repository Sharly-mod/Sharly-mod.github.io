/**
 * Sources de veille.
 *
 * Chaque entrée produit :
 *   - des fichiers JSON dans src/content/veille/ (les nouveaux articles)
 *   - une ligne dans public/veille.opml (à importer dans un lecteur RSS)
 *
 * `poids`   importance de la source (0-10). Il augmente le seuil de
 *           pertinence : une source très ciblée est gardée même si le titre
 *           seul est pauvre en mots-clés. Seuils : voir `seuil` dans le script.
 * `actif: false`  met la source en sommeil sans la supprimer.
 *
 * Toutes les URL ci-dessous ont été vérifiées comme répondant.
 */

export const categories = {
  'ia-jv': { nom: 'IA & jeu vidéo', couleur: 'violet', description: "L'IA appliquée au jeu vidéo : NPC, moteurs, rendu, outils de studio." },
  recherche: { nom: 'Recherche', couleur: 'cyan', description: "Prépublications et résumés de l'IA." },
  moteurs: { nom: 'Moteurs & rendu', couleur: 'ambre', description: 'Moteurs, rendu temps réel, systèmes de jeu.' },
  web: { nom: 'Web & outillage', couleur: 'vert', description: 'Techno web, modèles ouverts, outillage.' },
};

/** Nombre maximal d'articles retenus par catégorie et par exécution. */
export const quotaParCategorie = {
  'ia-jv': 50,
  recherche: 30,
  moteurs: 30,
  web: 30,
};

export const feeds = [
  /* ------------------------- IA & jeu vidéo (cœur du sujet) ------------------------- */
  {
    id: 'ai-and-games',
    nom: 'AI and Games',
    url: 'https://www.aiandgames.com/feed/',
    categorie: 'ia-jv',
    poids: 10,
    description: "La newsletter de référence sur l'IA appliquée au jeu vidéo, par un praticien.",
  },
  {
    id: 'gamedeveloper',
    nom: 'Game Developer',
    url: 'https://www.gamedeveloper.com/rss.xml',
    categorie: 'ia-jv',
    poids: 6,
    seuil: 0,
    description: 'Le média de référence du développement de jeux, sections technique et IA.',
  },
  {
    id: 'gamesindustry',
    nom: 'GamesIndustry.biz',
    url: 'https://www.gamesindustry.biz/feed',
    categorie: 'ia-jv',
    poids: 5,
    description: "L'industrie du jeu et ses transformations, dont l'IA générative.",
  },
  {
    id: 'nvidia-genai',
    nom: 'NVIDIA Developer — Générative AI',
    url: 'https://developer.nvidia.com/blog/category/generative-ai/feed/',
    categorie: 'ia-jv',
    poids: 6,
    description: "Rendu neuronal (DLSS), ACE, inférence dans le moteur : l'IA côté moteur.",
  },
  {
    id: 'unity',
    nom: 'Unity Blog',
    url: 'https://unity.com/blog/rss',
    categorie: 'ia-jv',
    poids: 4,
    seuil: 0,
    description: 'Moteur Unity, ses outils et sa position sur l\'IA générative.',
  },

  /* ------------------------------- Recherche --------------------------------------- */
  {
    id: 'arxiv-cs-ai',
    nom: 'arXiv cs.AI',
    url: 'https://rss.arxiv.org/rss/cs.AI',
    categorie: 'recherche',
    poids: 4,
    description: "Les prépublications d'intelligence artificielle.",
  },
  {
    id: 'arxiv-cs-lg',
    nom: 'arXiv cs.LG',
    url: 'https://rss.arxiv.org/rss/cs.LG',
    categorie: 'recherche',
    poids: 3,
    description: 'Apprentissage automatique, agents, reinforcement learning.',
  },
  {
    id: 'arxiv-cs-cv',
    nom: 'arXiv cs.CV',
    url: 'https://rss.arxiv.org/rss/cs.CV',
    categorie: 'recherche',
    poids: 3,
    description: "Vision par ordinateur, génération d'images et de vidéo.",
  },

  /* ------------------------------ Moteurs & rendu ---------------------------------- */
  {
    id: 'simonschreibt',
    nom: 'Simon Schreibt',
    url: 'https://simonschreibt.de/feed/',
    categorie: 'moteurs',
    poids: 5,
    seuil: 0,
    description: 'Programmation de systèmes de jeu par un ingénieur ancien d\'Ubisoft.',
  },
  {
    id: 'level-80',
    nom: '80 Level',
    url: 'https://80.lv/feed/',
    categorie: 'moteurs',
    poids: 3,
    seuil: 0,
    description: "Techniques d'art et d'asset pour le jeu, y compris générées par IA.",
  },

  /* ----------------------------- Web & outillage ------------------------------------ */
  {
    id: 'openai',
    nom: 'OpenAI News',
    url: 'https://openai.com/news/rss.xml',
    categorie: 'web',
    poids: 4,
    description: 'Annonces de modèles et de produits.',
  },
  {
    id: 'hf-blog',
    nom: 'Hugging Face',
    url: 'https://huggingface.co/blog/feed.xml',
    categorie: 'web',
    poids: 4,
    description: 'Modèles ouverts, outils et écosystème ML.',
  },
  {
    id: 'marktechpost',
    nom: 'MarkTechPost',
    url: 'https://www.marktechpost.com/feed/',
    categorie: 'web',
    poids: 3,
    description: 'Résumés très réactifs des sorties de modèles et de papiers.',
  },
  {
    id: 'mit-techreview',
    nom: 'MIT Technology Review — IA',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    categorie: 'web',
    poids: 3,
    seuil: 0,
    description: "Analyse éditoriale et questions de société sur l'IA.",
  },
  {
    id: 'webdev',
    nom: 'web.dev',
    url: 'https://web.dev/feed.xml',
    categorie: 'web',
    poids: 2,
    seuil: 0,
    description: 'Référentiel Google pour la performance web moderne.',
  },
  {
    id: 'hacker-news',
    nom: 'Hacker News — mieux notés',
    url: 'https://hnrss.org/frontpage?points=150',
    categorie: 'web',
    poids: 2,
    description: 'Liens techniques très commentés, filtrés par score.',
  },
];

/**
 * Score de pertinence d'un article, calculé sur le titre (poids fort) et le
 * résumé (poids faible). Le script n'ajoute l'article que si
 * `score + poidsDuFlux >= seuil`.
 */
export const scoring = {
  // Motifs qui font rejeter l'article quoi qu'il arrive
  exclusion: ['coupon', 'deal of the day', 'black friday', 'sponsored post', 'horoscope'],

  // IA appliquée au jeu : c'est le sujet du portfolio
  fort: [
    'game ai',
    'npc',
    'agentic',
    'world model',
    'behavior tree',
    'in-game inference',
    'neural rendering',
    'dlss',
    'upscaling',
    'realtime generation',
    'real-time generation',
    'gameplay',
    'game developer',
    'ai teammate',
    'player experience',
    'virtual character',
    'llm in games',
    'ai engine',
    'generative video',
    'game engine',
    'game studio',
    'virtual world',
    'character ai',
  ],

  // IA générale : la culture technique qui alimente la veille
  moyen: [
    'llm',
    'large language model',
    'language model',
    'diffusion model',
    'reinforcement learning',
    'transformer',
    'inference',
    'quantization',
    'text-to-speech',
    'speech recognition',
    'fine-tuning',
    'openai',
    'anthropic',
    'deepmind',
    'hugging face',
    'multimodal',
    'benchmark',
    'text-to-image',
    'text-to-video',
    'gpt',
    'claude',
    'gemini',
    'llama',
    'gemma',
    'qwen',
    'nemotron',
    'chatbot',
    'ai agent',
    'ai agents',
    'copilot',
  ],

  // Technologies transverses du métier
  large: [
    'webgpu',
    'wasm',
    'rust',
    'typescript',
    'postgresql',
    'docker',
    'kubernetes',
    'pwa',
    'accessibilité',
    'accessibility',
    'webassembly',
  ],
};
