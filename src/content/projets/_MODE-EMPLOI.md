---
# Comment ajouter ou modifier un projet

Ce dossier contient **un fichier Markdown par projet**. Les fichiers qui
commencent par un `_` (comme celui-ci) sont ignorés par le site : tu peux donc
ajouter ici toutes les notes que tu veux.

## Ajouter un projet en 3 étapes

1. Copie `_modele.md` et renomme-le `mon-projet.md` (minuscules, tirets, pas
   d'espace : le nom du fichier devient l'URL `/projets/mon-projet/`).
2. Remplis le bloc `---` du haut (les métadonnées) et le texte en dessous
   (l'explication).
3. Lance `npm run dev` : la page apparaît immédiatement dans le menu Projets.

Rien d'autre à faire : pas d'import à ajouter, pas d'index à maintenir, pas de
menu à modifier.

## Le bloc de métadonnées, champ par champ

| Champ | Obligatoire | Rôle |
| --- | --- | --- |
| `titre` | oui | Nom affiché. |
| `resume` | oui | 2 phrases maximum, 220 caractères. Apparaît sur les cartes. |
| `ordre` | non | 1 = tout en haut de l'accueil. Défaut 99. |
| `annee` | oui | Année de réalisation. |
| `contexte` | oui | `cours`, `personnel`, `stage` ou `professionnel`. Sert au filtre sur `/projets/`. |
| `matieres` | non | Matières ou modules du cours. Utile pour un projet scolaire. |
| `statut` | non | `termine` (défaut), `en-cours`, `prototype`, `production`. |
| `role` | oui | **Ce que tu as personally fait.** Une phrase à la première personne. |
| `stack` | non | Technologies, les plus parlantes d'abord. |
| `competences` | non | Compétences démontrées, formulées comme des acquis. |
| `misEnAvant` | non | `true` = mis en avant sur l'accueil. |
| `repo` | non | URL GitHub. |
| `demo` | non | URL de la démo en ligne. |
| `image` | non | Image depuis `/public`, ex. `captures/mon-projet/accueil.webp`. |
| `couleur` | non | `violet` (défaut), `cyan`, `ambre` ou `vert`. |
| `liens` | non | Liste de `{ label, url }` affichée en bas de la page. |

## Structurer l'explication

Le texte libre en dessous du bloc est rendu tel quel en Markdown, avec une table
des matières automatique. Les sections qui rendent le mieux à l'oral :

- `## Le contexte` — le commanditaire, les contraintes imposées, le périmètre.
- `## Ce que j'ai fait` — les livrables, formulés à la première personne.
- `## Le point technique` — **la partie la plus importante.** Une seule
  décision d'architecture, expliquée *et justifiée*. C'est ce qu'on te demandera
  en entretien ; décris le problème, la solution, et pourquoi l'alternative a été
  écartée.
- `## Les difficultés` — les problèmes réels et la façon dont tu les as résolus.
  Un échec documenté vaut mieux qu'un succès lisse.
- `## Ce que j'ai appris` — la transposition, formulée comme une compétence
  réutilisable ailleurs.

Évite les adjectifs (« Innovative », « robuste », « performant ») sans chiffre ni
sans justification : un recruteur les ignore. Ce qui marque, c'est le mécanisme.

## Contrôle avant de publier

```bash
npm run build   # valide le schéma de toutes les métadonnées
```

Si un champ est mal typé ou manquant, le build échoue en indiquant le fichier et
le champ fautif.
