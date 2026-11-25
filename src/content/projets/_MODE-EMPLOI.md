# Comment ajouter ou modifier un projet

Ce dossier contient **un fichier Markdown par projet**. Les fichiers qui
commencent par un `_` (comme celui-ci) sont ignorés par le site : tu peux donc
ajouter ici toutes les notes que tu veux.

## Ajouter un projet en 3 étapes

1. Copie `_modele.md` et renomme-le `mon-projet.md` (minuscules, tirets, pas
   d’espace : le nom du fichier devient l’URL `/projets/mon-projet/`).
2. Remplis le bloc `---` du haut (les métadonnées et la fiche E5) et le texte
   en dessous (le retour d’expérience).
3. Lance `npm run dev` : la page apparaît immédiatement. Pour l’afficher dans
   la grille principale et le tableau E5, mets `selectionE5: true`.

Rien d’autre à faire : pas d’import à ajouter, pas d’index à maintenir, pas de
menu à modifier.

## Le bloc de métadonnées, champ par champ

| Champ | Obligatoire | Rôle |
| --- | --- | --- |
| `titre` | oui | Nom affiché. |
| `resume` | oui | 2 phrases maximum, 240 caractères. Apparaît sur les cartes. |
| `ordre` | non | 1 = tout en haut. Défaut 99. |
| `annee` | oui | Année de réalisation. |
| `contexte` | oui | `atelier`, `stage`, `personnel`, `cours` ou `professionnel`. Sert au filtre. |
| `selectionE5` | non | `true` = projet principal E5 (grille + tableau). Défaut `false`. |
| `matieres` | non | Modules ou matières associés. |
| `statut` | non | `termine` (défaut), `en-cours`, `prototype`, `production`. |
| `role` | oui | **Ce que tu as réellement fait.** Une phrase. |
| `stack` | non | Technologies, les plus parlantes d’abord. |
| `competences` | non | Compétences techniques démontrées. |
| `besoins` | non | Besoins fonctionnels, côté utilisateur. |
| `choixTechniques` | non | Décisions techniques et justifications. |
| `fonctionnalites` | non | Fonctionnalités visibles. |
| `crud` | non | Opérations CRUD par entité et par rôle. |
| `securite` | non | Mesures concrètes (PDO, RBAC, hachage, XSS…). |
| `competencesBts` | non | Codes `C1` à `C6` couverts. |
| `captures` | non | Chemins depuis `/public`, ex. `captures/mon-projet/accueil.webp`. |
| `aCompleter` | non | Preuves restant à ajouter (captures, liens, informations). |
| `misEnAvant` | non | `true` = mis en avant sur l’ancien système (conservé). |
| `repo` | non | URL GitHub. |
| `demo` | non | URL de la démo en ligne. |
| `image` | non | Image depuis `/public` pour la carte. |
| `couleur` | non | `violet` (défaut), `cyan`, `ambre` ou `vert`. |
| `liens` | non | Liste de `{ label, url }`. Évite de dupliquer `repo`. |

## Structurer le retour d’expérience

Le texte libre en dessous du bloc est rendu en Markdown. Les sections qui
rendent le mieux à l’oral :

- `## Le contexte` — le commanditaire, les contraintes, le périmètre.
- `## Ce que j’ai fait` — les livrables, à la première personne.
- `## Le point technique` — **la partie la plus importante.** Une décision
  d’architecture expliquée et justifiée : problème, solution, alternative
  écartée.
- `## Les difficultés` — les problèmes réels et leur résolution.
- `## Ce que j’ai appris` — la compétence transposable.

Évite les adjectifs (« innovant », « robuste », « performant ») sans preuve :
ce qui marque le jury, c’est le mécanisme et le recul critique.

## Contrôle avant de publier

```bash
npm run check   # types + schéma des contenus
npm run build   # génère le site
```

Si un champ est mal typé ou manquant, le build échoue en indiquant le fichier et
le champ fautif.
