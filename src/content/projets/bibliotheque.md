---
titre: "Ma Bibliothèque — gestion d'une bibliothèque"
resume: "Application PHP de gestion de bibliothèque : catalogue, auteurs, emprunts, retours notés, messagerie entre membres et back-office administrateur."
ordre: 8
annee: 2025
contexte: cours
matieres:
  - PHP/MySQL
  - Modélisation de données
  - Sécurité applicative
statut: termine
role: "Développement complet"
stack:
  - PHP
  - MySQL
  - PDO
  - CSS
competences:
  - "Architecture d'une application PHP à scripts"
  - "PDO et requêtes préparées"
  - "Gestion des emprunts et des retours"
  - "Notations et avis"
  - "Messagerie entre utilisateurs"
misEnAvant: false
repo: https://github.com/Sharly-mod/bibliotheque
couleur: vert
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/bibliotheque
  - label: Documentation
    url: https://github.com/Sharly-mod/bibliotheque#readme
---

## Le contexte

Un projet d'application web de gestion de bibliothèque : le genre de chose qui
paraît simple parce qu'on imagine mal ce que « gérer une bibliothèque »
recouvre. EnReality, c'est un catalogue, des emprunts qui reviennent, des
lecteurs qui rendent un livre, et un endroit où déposer une note.

## Les fonctionnalités

**Le catalogue.** Livres et auteurs, avec recherche et fiche détaillée. C'est
le socle : tout le reste s'y accroche.

**Les emprunts.** Réserver un livre, le suivre, le rendre. C'est la partie qui
porte la logique métier, parce que c'est la seule qui a un état qui évolue
dans le temps : un livre disponible, un livre emprunté, un livre rendu.

**Les retours notés.** Au moment du retour, le lecteur peut laisser une note
par étoile et un commentaire. L'idée est pleasing : le catalogue porte sa
propre évaluation, sans moderation ni intervention.

**La messagerie.** Échanger des messages entre membres. Simple en surface,
mais c'est un espace où le contenu vient des utilisateurs, donc où les règles
d'affichage et de suppression comptent.

**Le back-office.** Gestion des utilisateurs, ajout et édition de livres,
tableau de bord et statistiques.

## Un choix qui simplifie tout : la page par page

L'application est écrite en PHP procédural, un fichier par page, sans
framework ni gestionnaire de dépendances. Ce n'est pas un choix de mode, c'est
un choix de contexte : sans ce qui ressemble à un framework entre le
navigateur et la base, on voit exactement ce qui se passe.

Chaque page s'occupe de sa requête, de son traitement et de son affichage, et
inclut `navbar.php` pour la navigation. Le PDO est configuré une fois dans
`config.php`, avec les requêtes préparées activées par défaut — un détail
qui évite d'avoir à s'en soucier à chaque requête.

## Le point manquant

Le schéma SQL n'a pas été conservé avec le code. Les tables utilisées sont
identifiables dans les scripts, mais reconstituer la structure complète
(propriétés du schéma, index, clés étrangères, données de départ) prendrait du
temps. C'est la leçon à tirer : **le schéma fait partie du projet**. Sans
lui, l'application n'est pas reproductible.

## Sécurité

`config.php` contient les identifiants de connexion à la base : il n'est pas
versionné, et `config.example.php` sert de gabarit. C'est le minimum, mais
c'est le principe : les identifiants ne voyagent pas dans un dépôt.
