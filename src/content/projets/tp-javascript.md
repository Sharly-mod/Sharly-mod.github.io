---
titre: "Travaux pratiques JavaScript"
resume: "Travaux dirigés de JavaScript, HTML et CSS : manipulation du DOM, événements, formulaires, jeu du Juste Prix, calculatrice et curseur."
ordre: 9
annee: 2025
contexte: cours
matieres:
  - JavaScript
  - HTML
  - CSS
statut: termine
role: "Réalisation des TP"
stack:
  - JavaScript
  - HTML
  - CSS
competences:
  - "Manipulation du DOM"
  - "Gestion des événements"
  - "Formulaires et validation côté client"
  - "CSS et mise en page"
misEnAvant: false
repo: https://github.com/Sharly-mod/tp-javascript
couleur: vert
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/tp-javascript
  - label: Documentation
    url: https://github.com/Sharly-mod/tp-javascript#readme
---

## Le contexte

Des travaux dirigés de JavaScript, HTML et CSS, pris au fil de la formation.
C'est le socle du développement web, et la partie où l'on comprend que le
JavaScript n'est pas « la page qui change d'apparence » mais un programme qui
pilote le document.

## Le jeu du Juste Prix

Le TP principal est un jeu : deviner un prix, avec une page d'accueil
(`index.html`) et un écran de partie (`game.html`), reliés par `js/game.js`.

C'est un bon exercice parce qu'il mobilise tout ce qui compte en JavaScript
côté navigateur : sélectionner un élément, écouter un clic ou une touche,
mettre à jour l'affichage, et gérer un état de partie (gagné, perdu, en
cours) qui doit rester cohérent entre le DOM et la logique.

## Les autres TP

**TP2 — calculatrice** : le cas classique des événements sur des boutons. La
difficulté n'est pas de calculer, c'est de gérer l'état : après avoir cliqué
`7`, puis `+`, le prochain chiffre doit remplacer l'affichage au lieu de
s'y ajouter.

**TP2 — slider** : une valeur affichée qui suit un curseur, et la
correspondance entre l'état JavaScript et l'attribut de l'élément.

**Exercices isolés** : `test.html` et `test.js` servent de bac à sable pour
tester un comportement sans l'entourer de l'application.

## Un mot sur ce qui manque

Les dossiers `tp3`, `tp5` et `tp7-2` ne contiennent que leurs sous-dossiers
`Ressources` : le code de ces TP n'a pas été conservé. J'ai préféré le signaler
plutôt que de reconstruire quelque chose qui n'existe plus — un dépôt qui
annonce des parties vides est plus honnête qu'un dépôt qui n'en dit rien.

## Ce que ces TP ont appris

Le HTML est une structure, pas un décor. Le CSS est une présentation, pas du
style inline. Le JavaScript est le comportement, et il ne doit pas mélanger
les deux autres.

Et surtout : ce qui s'affiche à l'écran est une **copie** de l'état du
programme. La plupart des bugs viennent d'un désaccord entre les deux — et le
remède est presque toujours de reconstruire l'affichage depuis l'état, plutôt
que de le modifier morceau par morceau.
