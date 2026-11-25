---
titre: "Fair'repair — plateforme de mise en relation"
resume: "Application web PHP en MVC maison qui met en relation cyclistes et réparateurs indépendants : trois rôles, CRUD des prestations, réservation de rendez-vous et carte interactive."
ordre: 1
annee: 2026
contexte: atelier
selectionE5: true
matieres:
  - PHP orienté objet
  - Modélisation de données (MCD / MLD)
  - Cas d'utilisation
  - Sécurité applicative
statut: termine
role: "Analyse, modélisation, développement back-end et front-end, recette"
stack:
  - PHP 8
  - MySQL / MariaDB
  - PDO
  - HTML / CSS
  - JavaScript
  - Leaflet.js
  - OpenStreetMap
competences:
  - "Architecture MVC sans framework : routeur, contrôleurs, modèles DAO, vues"
  - "Conception d'une base relationnelle avec contraintes d'intégrité"
  - "Contrôle d'accès par rôles (client, réparateur, admin)"
  - "Requêtes préparées PDO et hachage bcrypt"
  - "Cartographie interactive avec Leaflet et OpenStreetMap"
besoins:
  - "Permettre à un cycliste de trouver un réparateur et de réserver une prestation."
  - "Donner au réparateur un espace pour gérer ses prestations et ses rendez-vous."
  - "Fournir à l'administrateur des outils de modération et de supervision."
  - "Afficher les réparateurs sur une carte interactive avec leur fiche détaillée."
  - "Séparer strictement les données et les actions de chaque rôle."
choixTechniques:
  - "Architecture MVC maison : front controller, routeur à paramètres, contrôleurs, modèles DAO et vues séparées."
  - "MySQL / MariaDB avec le moteur InnoDB et des clés étrangères pour garantir l'intégrité."
  - "PDO avec requêtes préparées et émulation désactivée (ATTR_EMULATE_PREPARES = false)."
  - "Leaflet.js et OpenStreetMap, sans clé API payante."
  - "JavaScript vanilla pour les interactions, les filtres et la carte."
fonctionnalites:
  - "Inscription, connexion et gestion du profil pour les trois rôles."
  - "CRUD complet des prestations côté réparateur (titre, description, tarif, rayon)."
  - "Création, modification et annulation d'un rendez-vous côté client."
  - "Tableau de bord réparateur : demandes, planning et suivi des gains."
  - "Carte interactive des réparateurs et fiches détaillées au clic."
  - "Avis, signalements et modération côté administrateur."
crud:
  - "Utilisateurs : créer, lire, modifier et supprimer (admin)."
  - "Prestations : créer, lire, modifier et supprimer (réparateur propriétaire)."
  - "Rendez-vous : créer, lire, modifier le statut et annuler (client / réparateur)."
  - "Avis et signalements : créer, lire, modérer et supprimer."
securite:
  - "Requêtes préparées PDO, émulation désactivée."
  - "Hachage des mots de passe avec password_hash() et vérification avec password_verify()."
  - "Échappement systématique des sorties avec htmlspecialchars() contre le XSS."
  - "Contrôle d'accès par rôle (RBAC) sur chaque route, pas seulement dans le menu."
  - "Sessions régénérées après connexion, cookie HttpOnly et SameSite."
  - "Limitation des tentatives de connexion contre le brute-force."
  - "Isolation des données : chaque requête est filtrée par l'identifiant du propriétaire."
competencesBts: [C1, C3, C4, C5, C6]
captures: []
aCompleter:
  - "Capture du tableau de bord réparateur."
  - "Capture de la carte Leaflet avec plusieurs réparateurs."
  - "Capture du MCD / MLD et du diagramme de cas d'utilisation."
  - "Lien du dépôt Git et éventuellement une démo en ligne."
misEnAvant: true
repo: https://github.com/Sharly-mod/FairRepair
couleur: cyan
liens:
  - label: Documentation
    url: https://github.com/Sharly-mod/FairRepair#readme
---

## Le contexte

Fair'repair est le projet d'atelier professionnel majeur de ma deuxième année.
À partir d'un cahier des charges, il fallait concevoir une plateforme qui met
en relation des cyclistes avec des réparateurs indépendants ou des ateliers de
proximité. Le projet devait couvrir l'analyse, la modélisation, le
développement et la recette.

Deux contraintes ont structuré le reste :

- **technique** : PHP 8 en MVC **sans framework**, avec un routeur, des
  contrôleurs et une couche d'accès aux données écrits de zéro ;
- **métier** : trois rôles avec des règles différentes sur les mêmes données
  (client, réparateur, administrateur), et une modération qui doit être tracée.

## Le modèle de données

Le MCD a été traduit en un MLD MySQL avec InnoDB et clés étrangères. Les
entités principales sont :

```text
users (id, nom, prenom, email, mot_de_passe, role, ville, latitude, longitude)
  ├──< services (id, user_id → users.id, titre, description, tarif, rayon)
  ├──< reservations (id, client_id → users.id, service_id → services.id,
  │                  date, statut, montant)
  └──< avis (id, reservation_id → reservations.id, note, commentaire)
```

Deux règles métier sont portées directement par le schéma : **une réservation
ne peut avoir qu'un seul avis** et **un seul paiement**. Elles sont traduites
par des contraintes `UNIQUE`, pour que la base reste correcte même si deux
requêtes arrivent en même temps. C'est un point que je défends à l'oral : tout
ne doit pas être vérifié uniquement dans le code PHP.

## Le point technique : la sécurité comme exigence de conception

| Risque | Traitement |
| --- | --- |
| Injection SQL | PDO + requêtes préparées, émulation désactivée |
| Vol de mots de passe | `password_hash()` / `password_verify()` |
| XSS | `htmlspecialchars()` à l'affichage |
| Accès non autorisé | Rôle vérifié dans le contrôleur sur chaque route |
| Fuite entre comptes | Requêtes filtrées par `user_id` |
| Brute-force | Limitation des tentatives de connexion |

Le point le plus important est l'**émulation des requêtes préparées**. La
désactiver garantit que le pilote envoie la requête et les paramètres
séparément à MySQL, au lieu de reconstruire la chaîne SQL côté PHP. Sans cela,
les placeholders peuvent donner une fausse impression de sécurité.

Le deuxième point est le **contrôle d'accès**. Un bouton masqué dans une vue ne
protège rien : l'URL reste accessible. Chaque action vérifie donc le rôle et la
propriété de la ressource côté serveur.

## Les difficultés

- **Le routeur.** Écrire un routeur avec des paramètres dynamiques oblige à
  faire attention à l'ordre des routes : une route trop générale déclarée avant
  une route précise capture tout. J'ai converti chaque `{paramètre}` en groupe
  nommé et testé les routes une par une.
- **Les règles de visibilité.** Une règle de gestion comporte presque toujours
  une exception (« un réparateur ne peut modifier que ses propres services »).
  Ces exceptions sont la vraie difficulté du projet, pas le CRUD.
- **Les contraintes en base.** Certaines règles ne peuvent pas rester seulement
  dans le code applicatif. Les contraintes `UNIQUE` et les clés étrangères
  évitent des états incohérents que le PHP devrait sinon rattraper.

## Ce que j'en retiens

Écrire un framework minimal est un exercice très instructif : on comprend
qu'un framework n'est pas de la magie, mais un routeur, une gestion de vues,
une couche d'accès aux données et des conventions. On comprend aussi ses
limites : dès que le projet grossit, le routeur maison et la duplication dans
les contrôleurs coûtent cher.

La deuxième leçon concerne les données : la majorité des bugs venaient de cas
de figure absents du modèle, pas de code mal écrit. Quand une règle métier n'a
pas de place dans le schéma, elle finit réimplémentée différemment dans chaque
contrôleur.

## À compléter avant l'oral

- [ ] Captures : tableau de bord réparateur, carte Leaflet, MCD/MLD.
- [ ] Lien du dépôt et éventuellement une démo.
- [ ] Jeu de données de démonstration anonymisé.
