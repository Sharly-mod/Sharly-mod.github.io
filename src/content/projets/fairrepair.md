---
titre: "Fair'repair — plateforme de réparation de vélos"
resume: "Application web PHP en architecture MVC écrite sans framework, qui met en relation cyclistes et réparateurs indépendants : réservation, paiement, cartographie, avis et modération. Projet de BTS."
ordre: 2
annee: 2025
contexte: cours
matieres:
  - PHP orienté objet
  - Modélisation de données (MCD / MLD)
  - Cas d'utilisation
  - Sécurité applicative
statut: termine
role: "Analyse fonctionnelle, modélisation, développement complet, recette"
stack:
  - PHP 8
  - MySQL / MariaDB
  - PDO
  - Leaflet.js
  - OpenStreetMap
  - HTML / CSS / JavaScript
competences:
  - "Architecture MVC from scratch"
  - "Conception de base de données relationnelle"
  - "Sécurité : injections SQL, XSS, hachage, contrôle d'accès par rôle"
  - "Routage et cycle requête/réponse"
  - "Géolocalisation et cartographie interactive"
misEnAvant: true
repo: https://github.com/Sharly-mod/FairRepair
couleur: cyan
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/FairRepair
  - label: Documentation
    url: https://github.com/Sharly-mod/FairRepair#readme
  - label: Schéma conceptuel (MCD)
    url: https://fr.wikipedia.org/wiki/Mod%C3%A8le_de_conception_de_donn%C3%A9es
---

## Le contexte

C'est un projet de **BTS S_LAM**, à partir d'un cahier des charges : mettre en
relation des cyclistes qui ont besoin d'une réparation avec des réparateurs
indépendants ou des ateliers de proximité.

Deux contraintes ont orienté tout le reste. La première est **technique** : PHP
en MVC **sans framework**, avec un moteur de routage et une couche d'accès aux
données écrits de zéro. La seconde est **métier** : trois rôles avec des règles
très différentes sur les mêmes données (client, réparateur, administrateur), et une
modération qui doit être tracée.

## Ce que j'ai fait

J'ai réalisé l'analyse fonctionnelle, la modélisation, puis l'intégralité de
l'application.

- **L'analyse et la modélisation** — cas d'utilisation, modèle conceptuel de
  données (MCD) et modèle logique (MLD), sous forme de diagrammes Draw.io livrés
  avec le projet.
- **Le moteur MVC** — un routeur qui transforme les URL en expressions régulières
  à groupes nommés, un contrôleur de base qui gère l'affichage et les redirections,
  et une couche modèle en DAO sur PDO.
- **Les trois rôles** — un client réserve, suit et annule ses demandes ; un
  réparateur gère ses services et ses interventions ; un administrateur modère les
  signalements et arbitre les avis.
- **La cartographie** — les réparateurs sont géolocalisés sur une carte
  interactive, avec fiche détaillée au clic sur le marqueur.
- **La chaîne métier complète** — réservation → paiement → intervention →
  avis → signalement éventuel → modération tracée.

## Le point technique : la sécurité comme exigence de conception

Le projet a été l'occasion de traiter la sécurité non comme une couche à ajouter
à la fin, mais comme une propriété du modèle.

| Menace | Traitement |
| --- | --- |
| Injection SQL | PDO + requêtes préparées, émulation désactivée (`ATTR_EMULATE_PREPARES => false`) |
| Vol de mots de passe | `password_hash()` / `password_verify()`, jamais de hash maison |
| XSS | Échappement systématique à l'affichage via une fonction `sanitize()` |
| Contrôle d'accès | Rôle vérifié dans le contrôleur sur **chaque** route, pas seulement à l'entrée |
| Fuite entre comptes | Isolation multi-locataire : chaque requête est filtrée par `user_id` |

Le point que je retiens : désactiver l'émulation des requêtes préparées n'est pas
une option décorative. C'est ce qui garantit que le pilote envoie réellement la
requête et les paramètres séparément à MySQL, au lieu de reconstruire la chaîne
SQL côté PHP. C'est le seul endroit où l'injection revit malgré les placeholders.

Un deuxième aspect est plus subtil : `users` et `reparateurs` partagent la même
clé, avec une spécialisation. Un réparateur est un utilisateur qui possède une
ligne de plus. Ce choix rend le schéma simple, mais il impose de ne jamais faire
de jointure « à l'aveugle » sur `users` sans regarder le rôle.

## Les difficultés

- **Le routeur.** Écrire un routeur correct avec des paramètres dynamics demande
  de faire attention à la capture des groupes nommés et à l'ordre des routes :
  une route trop générales déclarée avant une route précise capture tout et casse
  le reste du site. Le routeur convertit chaque `{paramètre}` en groupe nommé et
  recopie les valeurs capturées.
- **Les règles de visibilité.** Une règle de gestion du cahier des charges
  comporte presque toujours une exception (« un réparateur ne peut lier que ses
  propres services »). Ces exceptions sont la vraie difficulté du projet, pas le
  CRUD.
- **La cohérence des contraintes en base.** Certaines règles ne peuvent pas
  être seulement du code applicatif : une réservation ne peut porter qu'un seul
  paiement, et qu'un seul avis. Elles sont des contraintes `UNIQUE` en SQL, pour
  que la base reste correcte même si deux requêtes arrivent en même temps.

## Ce que j'ai appris

Écrire un framework minimal est un exercice pédagogique redoutable et très
instructif : on comprend qu'un framework, ce n'est pas de la magie, c'est un
routeur, une gestion de vue, un accès aux données et des conventions. On comprend
aussi où sont les frontières : dès que le projet grossit, c'est le routeur maison
et la duplication dans les contrôleurs qui coûtent cher.

Le second enseignement est sur les données : la majorité des bugs de ce projet
n'étaient pas des bugs de code, mais des cas de figure absents du modèle. Quand
la règle métier n'a pas de place dans le schéma, elle sera réimplémentée
n'importe comment dans chaque contrôleur.
