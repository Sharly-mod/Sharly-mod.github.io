# Portfolio — FARAG Sharly

Site statique construit avec [Astro](https://astro.build). Deux sections :
les **projets** (Frood, FairRepair, ChampiHardcore) et une **veille
technologique** sur l'IA appliquée au jeu vidéo.

## Commandes

| Commande          | Action                                                        |
| :---------------- | :----------------------------------------------------------- |
| `npm install`     | Installe les dépendances                                      |
| `npm run dev`     | Serveur de développement sur `localhost:4321`                 |
| `npm run build`   | Construit le site dans `dist/`                                |
| `npm run preview` | Prévisualise le build en local                                |
| `npm run check`   | Vérification des types (à lancer avant chaque commit)         |
| `npm run veille`  | Collecte les flux RSS de la veille                            |
| `npm run veille:dry` | Idem, sans rien écrire — pour tester la configuration      |

## Ajouter un projet

1. Copie `src/content/projets/_modele.md` vers `src/content/projets/mon-projet.md`.
2. Remplis le frontmatter (voir `_MODE-EMPLOI.md` pour le détail de chaque champ).
3. Écris le corps en Markdown, en suivant le plan : problème, mon rôle, décisions
   techniques, difficultés, ce que j'en retiens.
4. Lance `npm run check` puis `npm run build`.

Le projet apparaît automatiquement sur l'accueil et sur `/projets/`. La page de
détail, le lien dans la navigation et le sitemap sont générés tout seuls.

## La veille

Deux niveaux, volontairement distincts :

- **Les notes** (`src/content/notes/*.md`) sont écrites à la main. Ce sont les
  seules pages qui portent une valeur d'analyse : ce que j'ai compris de
  l'article, et ce que ça change dans ma façon de concevoir.
- **Les articles** (`src/content/veille/*.json`) sont collectés automatiquement
  par `scripts/fetch-veille.mjs`, filtrés par mots-clés, notés, dédupliqués et
  plafonnés. C'est une boîte de réception, pas du contenu publié tel quel.

Les sources, les mots-clés et les quotas se règlent dans
`scripts/veille.config.mjs`. Le fichier `public/veille.opml` s'exporte vers
n'importe quel lecteur RSS.

`npm run veille` accepte `--days 30` (fenêtre de collecte) et `--max 300`
(nombre d'articles conservés, les plus anciens sont purgés).

## Personalisation

Un seul fichier contient l'identité, l'email et les liens :
`src/data/site.ts`.

## Déploiement

Le site se publie automatiquement sur GitHub Pages à chaque push sur `main`,
via `.github/workflows/deploy.yml`. Il n'y a aucun secret à configurer : le
déploiement utilise le token automatique de GitHub Actions.

Le workflow détecte seul le type de dépôt :

| Dépôt                              | URL                              |
| :--------------------------------- | :------------------------------- |
| `Sharly-mod/Sharly-mod.github.io`  | `https://sharly-mod.github.io`   |
| `Sharly-mod/portfolio`             | `https://sharly-mod.github.io/portfolio/` |

Le second cas publie sous un sous-chemin. C'est géré par `base` dans
`astro.config.mjs` et par l'aide `lien()` de `src/lib/urls.ts`, qui préfixe les
liens internes. **Si tu écris un lien vers une page du site, écris-le avec
`lien('/chemin/')`, pas `href="/chemin/"`.**

Le workflow `veille.yml` collecte chaque nuit à 6h17 UTC, puis commite les
nouveaux articles — ce commit déclenche à son tour le déploiement.

### Après le premier push

Dans les paramètres du dépôt, onglet **Pages**, *Source* : **GitHub Actions**.
