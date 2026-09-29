---
titre: "ChampiHardcore — plugin de survie pour serveur Minecraft"
resume: "Plugin Paper 1.21.4 en Java 21 qui rejoue la boucle classique des serveurs hardcore : mort définitive, tête conservée comme trophée, autel de résurrection et élimination progressive du clan."
ordre: 3
annee: 2026
contexte: personnel
matieres: []
statut: production
role: "Architecture, développement Java, tests sur serveur dédié"
stack:
  - Java 21
  - Paper API 1.21.4
  - Maven
  - Bukkit / Spigot
  - NBT / Persistent Data Container
  - YAML
competences:
  - API événementielle Bukkit (Listener, Event)
  - Persistance YAML et gestion de l'état joueur
  - Manipulation d'entités, d'inventaires et de métadonnées NBT
  - Programmation asynchrone et sécurité des callbacks
  - Build Maven et packaging de plugin
misEnAvant: true
couleur: ambre
liens:
  - label: Paper API
    url: https://papermc.io/software/paper
  - label: Documentation Bukkit
    url: https://bukkit.fandom.com/wiki/Plugin_Tutorial
---

## Le contexte

Les serveurs Minecraft « hardcore » reposent sur une règle : **mourir, c'est
fini**. Le joueur perd son stuff, qui est réparti ou ramassé, et parfois sa tête
elle-même devient un trophée des autres.

J'ai voulu transformer cette règle en jeu à part entière, jouable en équipe : au
lieu d'éliminer un joueur, on élimine toute une lignée. Un joueur mort perd sa tête,
qui peut être récupérée par un adversaire et posée sur un autel pour le
ressusciter — ou conservée définitivement pour le clan adverse. Plus le clan
rétrécit, plus chaque mort est lourd.

## Ce que j'ai fait

Le plugin est organisé en **gestionnaires** (l'état et les règles) et en
**écouteurs** (la réaction aux événements du serveur). Cette séparation est ce
qui rend le code lisible : aucun `Listener` ne contient de règle métier.

- **La mort** — à la mort, l'inventaire est conservé par le plugin au lieu d'être
  dispersé, et la tête du joueur est générée puis placée dans un cadre, avec
  l'identité du propriétaire inscrite en métadonnées persistantes.
- **L'élimination** — quand tous les joueurs d'un clan sont morts, le clan est
  éliminé. La progression du clan est affichée en barre de boss à l'écran, ce qui
  rend la course lisible pendant le jeu.
- **La résurrection** — un autel permet de ramener un joueur dont la tête a été
  récupérée, au prix d'un sacrifice : c'est le mécanisme central de la boucle.
- **La persistance** — l'état des joueurs (vies restantes, clan, statut
  d'élimination) est sauvegardé dans un fichier YAML, rechargé au démarrage du
  serveur, et écrit à chaque transition importante.
- **La robustesse** — les callbacks asynchrones et la fermeture du serveur sont
  traités explicitement : la sauvegarde est forcée à l'arrêt pour ne pas perdre
  l'état en cours de partie.

## Le point technique : garder l'état sans jamais perdre une partie

Le vrai problème d'un plugin de survie n'est pas la mécanique, c'est la
**persistance**. Un serveur Minecraft s'arrête pour des raisons arbitraires :
crash, redémarrage, mise à jour. Chaque transition d'état — une mort, une
élimination de clan, une résurrection — doit être écrite immédiatement.

J'ai centralisé l'écriture : tous les gestionnaires passent par un même
objet joueur, et la sauvegarde est déclenchée aux points de transition plutôt
qu'à la fin. Les données ne sont jamais reconstruites depuis l'état en mémoire au
démarrage ; elles sont relues depuis le disque, ce qui évite qu'un état divergent
devienne la référence.

Second point : les écouteurs ne touchent jamais directement à la persistance.
Ils appellent un gestionnaire, le gestionnaire applique la règle, le
gestionnaire déclenche la sauvegarde. Cette contrainte, en apparence mineure, est
ce qui permet de garantir qu'aucun chemin de code ne peut écrire un état
incohérent.

## Les difficultés

- **L'asynchrone et les événements différés.** Une partie des actions d'un plugin
  Paper ne peut pas être exécutée dans le fil principal (attente d'un joueur,
  changement de monde). Rappeler une API Bukkit depuis un autre fil provoque des
  erreurs aléatoires difficiles à reproduire. Chaque retour dans le fil principal
  est donc explicite.
- **Les effets visuels publics.** La barre de progression et les cadres de tête
  sont des objets d'affichage persistants : il faut les créer, les rattacher aux
  bons joueurs et les détruire au bon moment, sinon le serveur accumule des
  entités fantômes.
- **Nettoyer les trophées.** Une tête de joueur est un objet droppable : il faut
  gérer sa disparition proprement pour ne pas laisser de décor incohérent.

## Ce que j'ai appris

Écrire pour une API événementielle, c'est accepter de ne pas contrôler l'ordre
d'exécution. On ne peut pas dire « je fais A puis B » depuis un événement : on
peut seulement dire « quand ceci arrive, réagis ainsi ». Concevoir un plugin
correct revient donc à décider **où** sont les frontières entre réaction et
décision — exactement la même réflexion que pour un contrôleur web, mais avec un
modèle de concurrence en plus.

J'ai aussi compris l'importance de l'**interopérabilité des formats** : conserver
le nom du propriétaire d'une tête dans les métadonnées persistantes (et pas dans
un tableau Java) permet au monde de rester cohérent même après un redémarrage, et
rend la donnée lisible depuis les commandes de l'administration du serveur.
