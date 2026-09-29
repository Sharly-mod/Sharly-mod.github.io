---
titre: "TP GLPI — parc informatique sous Docker"
resume: "Installation de GLPI et de sa base MariaDB dans Docker, pour s'entraîner à la gestion d'un parc informatique : postes, logiciels, tickets et contrats."
ordre: 10
annee: 2025
contexte: cours
matieres:
  - Docker
  - Gestion de parc informatique
statut: termine
role: "Déploiement de la pile et prise en main de l'outil"
stack:
  - Docker
  - Docker Compose
  - MariaDB
  - GLPI
competences:
  - "Écriture d'un docker-compose"
  - "Volumes nommés et persistance des données"
  - "Réseau entre conteneurs"
  - "Gestion d'un parc informatique avec GLPI"
misEnAvant: false
repo: https://github.com/Sharly-mod/tp-glpi
couleur: vert
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/tp-glpi
  - label: Documentation
    url: https://github.com/Sharly-mod/tp-glpi#readme
---

## Le contexte

Un TP d'infrastructure, pas de développement : l'objectif est de faire
tourner une pile complète avec Docker, puis d'apprendre à se servir de l'outil
qu'elle expose.

**GLPI** (Gestion Libre du Parc Informatique) est la solution libre de
référence pour la gestion de parc : on y tient l'inventaire des postes, les
 logiciels, les contrats, et surtout les **tickets** d'incident et de demande.
C'est l'outil que meet beaucoup de services IT français.

## Ce que montre ce dépôt

Un `docker-compose.yml`, et c'est tout — ce qui est exactement le sujet du TP.
La difficulté n'est pas d'écrire du code, mais de faire tenir ensemble deux
conteneurs qui doivent se parler.

## Les points à comprendre

**Le réseau entre conteneurs.** Les deux services partagent un réseau Docker
implicite et se joindre par leur **nom de service**, pas par `localhost`. C'est
l'erreur la plus fréquente : depuis le conteneur `glpi`, la base de données
répond sur `mariadb`, pas sur `127.0.0.1` — pour la machine hôte, ce n'est
pas la même chose.

**La dépendance au démarrage.** `depends_on` indique l'ordre de lancement,
mais pas que la base soit prête à accepter des connexions. Un conteneur qui
démarre avant que MariaDB ne répondes doit réessayer — c'est souvent là que
le TP bloque.

**Les volumes nommés.** `db_data` et `glpi_data` sont des volumes, pas des
dossiers montés. C'est ce qui permet aux données de survivre à la
recréation d'un conteneur. `docker compose down -v` les supprime, et c'est
aussi le moyen de repartir de zéro.

**Les ports.** `8080:80` publie le port 80 du conteneur sur le 8080 de
l'hôte. Sans cette ligne, GLPI serait injoignable depuis le navigateur.

## Un choix à signaler

L'image utilisée (`diouxx/glpi`) est une image communautaire. En production, on
partirait de l'image officielle GLPI, plus maintenue. C'est un détail de TP,
mais il montre que le choix d'une image n'est pas neutre : c'est ce composant
qui fait tourner l'outil, et c'est lui qu'il faut surveiller.

Les identifiants sont en clair dans le compose. Ils ne protègent que la pile
locale, jetable, mais c'est une habitude à garder : tout ce qui est en clair
dans un dépôt est en clair pour tout le monde.
