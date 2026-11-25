---
titre: "Champi-Hardcore — plugin Paper de cycle de vie"
resume: "Plugin Paper en Java : résurrections mensuelles pilotées par les permissions et les rangs, mécaniques de réanimation, notifications Discord et intégration boutique Tebex."
ordre: 3
annee: 2026
contexte: personnel
selectionE5: true
matieres:
  - Java / POO
  - API événementielle Bukkit
  - Build Maven
  - Permissions et intégrations
statut: production
role: "Architecture, développement Java, intégrations et tests sur serveur dédié"
stack:
  - Java (JDK 25)
  - Maven
  - API Paper / Bukkit
  - LuckPerms
  - Webhooks Discord
  - Tebex
  - YAML
competences:
  - "Programmation orientée objet et séparation gestionnaires / écouteurs"
  - "Gestion d'événements Bukkit et retour au fil principal"
  - "Lecture des permissions et des rangs avec LuckPerms"
  - "Appels HTTP sortants : webhooks Discord"
  - "Persistance YAML et rechargement de l'état au démarrage"
  - "Build et packaging Maven"
besoins:
  - "Gérer le cycle de vie d'un joueur hardcore : mort, élimination, résurrection."
  - "Accorder des résurrections mensuelles différentes selon le rang et les permissions."
  - "Automatiser les annonces et les notifications vers un serveur Discord."
  - "Relier les avantages du serveur à la boutique Tebex sans exposer de secrets."
  - "Conserver un état cohérent même après un redémarrage ou un crash."
choixTechniques:
  - "Java 21+ (compilation JDK 25) et API Paper 1.21.4."
  - "Architecture en gestionnaires (règles, état) et écouteurs (réactions aux événements)."
  - "LuckPerms comme source de vérité pour les rangs et les permissions."
  - "Webhooks Discord pour les annonces de résurrection et d'élimination."
  - "Tebex pour la partie boutique, avec les identifiants en configuration."
  - "Maven pour compiler, packager et livrer un JAR reproductible."
fonctionnalites:
  - "Résurrections mensuelles calculées à partir du rang et des permissions du joueur."
  - "Mécaniques de réanimation : autel, sacrifice et validation par les adversaires."
  - "Suivi des lignées et élimination progressive d'un clan."
  - "Commandes d'administration protégées par la permission champi.admin."
  - "Notifications Discord lors des résurrections, éliminations et événements importants."
  - "Intégration boutique Tebex pour les avantages liés aux rangs."
  - "Sauvegarde de l'état des joueurs et rechargement au démarrage."
crud:
  - "Joueurs : lire et mettre à jour l'état (vie, rang, statut d'élimination)."
  - "Résurrections : créer, consommer et annuler une résurrection mensuelle."
  - "Rangs / permissions : lire les droits LuckPerms, jamais les modifier à l'aveugle."
  - "Configuration : mettre à jour les paramètres YAML (durées, messages, webhooks)."
securite:
  - "Vérification des permissions côté serveur avant chaque commande administrative."
  - "Aucun secret (token Discord, clé Tebex) écrit dans le code ou versionné."
  - "Validation des URLs de webhook et des paramètres de configuration."
  - "Limitation des commandes sensibles et journalisation des actions admin."
  - "Principe du moindre privilège : un joueur ne peut déclencher que ses propres résurrections."
competencesBts: [C4, C5, C6]
captures: []
aCompleter:
  - "Capture de la commande /champi et du menu d'administration."
  - "Capture d'une notification Discord."
  - "Extrait de code LuckPerms et extrait de configuration YAML anonymisé."
  - "Lien du dépôt GitHub et version du JAR présentée."
misEnAvant: true
repo: https://github.com/Sharly-mod/ChampiHardcore
couleur: ambre
liens:
  - label: Paper API
    url: https://papermc.io/software/paper
  - label: LuckPerms
    url: https://luckperms.net/
---

## Le contexte

Les serveurs Minecraft « hardcore » reposent sur une règle simple : mourir,
c'est fini. Le joueur perd son stuff, parfois sa tête devient un trophée, et
la partie s'arrête pour lui.

**Champi-Hardcore** transforme cette règle en jeu de cycle de vie. Un joueur
mort peut être réanimé dans des conditions précises, et le nombre de
résurrections dépend de son rang et de ses permissions. L'objectif est de
donner une seconde chance sans supprimer la tension du hardcore.

La version présentée à l'oral est compilée avec **JDK 25**, packagée avec
**Maven** et s'appuie sur l'**API Paper/Bukkit**. Les permissions et les rangs
sont lus via **LuckPerms**, les événements importants sont envoyés à
**Discord** par webhook, et la boutique **Tebex** relie les avantages du
serveur aux rangs.

## L'architecture

Le plugin est organisé en **gestionnaires** (état et règles) et en
**écouteurs** (réaction aux événements du serveur). Cette séparation est ce qui
rend le code lisible : aucun `Listener` ne contient de règle métier.

- **La mort** : l'inventaire est conservé par le plugin, la tête du joueur est
  générée et identifiée avec des métadonnées persistantes.
- **L'élimination** : quand tous les joueurs d'une lignée sont morts, la lignée
  est éliminée. La progression est affichée en barre de boss.
- **La résurrection** : un autel permet de ramener un joueur dont la tête a été
  récupérée, au prix d'un sacrifice.
- **Les rangs** : LuckPerms fournit le rang et les permissions. Le gestionnaire
  calcule le nombre de résurrections disponibles sur le mois.
- **Les annonces** : les webhooks Discord reçoivent les événements importants,
  avec un message différent selon le type d'action.
- **La persistance** : l'état (vies, lignée, statut) est sauvegardé en YAML et
  relu au démarrage.

## Le point technique : l'état avant la mécanique

Le vrai problème d'un plugin de survie n'est pas la mécanique, c'est la
**persistance**. Un serveur Minecraft s'arrête pour des raisons arbitraires :
crash, redémarrage, mise à jour. Chaque transition — une mort, une élimination,
une résurrection — doit être écrite immédiatement.

J'ai centralisé l'écriture : tous les gestionnaires passent par un même objet
joueur, et la sauvegarde est déclenchée aux points de transition. Les données
ne sont jamais reconstruites depuis l'état en mémoire au démarrage : elles sont
relues depuis le disque, ce qui évite qu'un état divergent devienne la
référence.

Deuxième point : les écouteurs ne touchent jamais directement à la
persistance. Ils appellent un gestionnaire, le gestionnaire applique la règle,
le gestionnaire déclenche la sauvegarde. Cette contrainte, en apparence
mineure, garantit qu'aucun chemin de code ne peut écrire un état incohérent.

## Les intégrations

**LuckPerms.** Le plugin ne réinvente pas les grades : il lit les permissions
et les rangs existants. Cela évite de dupliquer une configuration déjà gérée
par l'administration du serveur, mais impose de vérifier les permissions à
chaque action et de ne jamais supposer qu'un rang existe.

**Discord.** Les webhooks sont appelés avec un timeout et un message construit
côté serveur. Les identifiants sont dans la configuration, jamais dans le code.
Une erreur d'envoi ne doit pas bloquer la mécanique de jeu : la notification
est un effet secondaire, pas une condition de réussite.

**Tebex.** La boutique est traitée comme une source externe : les avantages
sont débloqués après vérification, et les secrets restent hors du dépôt. C'est
la même logique que pour une API de paiement sur un site web.

## Les difficultés

- **L'asynchrone et les événements différés.** Une partie des actions Paper ne
  peut pas être exécutée dans le fil principal. Rappeler une API Bukkit depuis
  un autre fil provoque des erreurs aléatoires difficiles à reproduire. Chaque
  retour dans le fil principal est donc explicite.
- **Les effets visuels persistants.** La barre de progression et les cadres de
  tête sont des objets d'affichage : il faut les créer, les rattacher aux bons
  joueurs et les détruire au bon moment, sinon le serveur accumule des entités
  fantômes.
- **Les permissions.** Un joueur ne doit pas pouvoir déclencher la résurrection
  d'un autre joueur ni contourner la limite mensuelle. La vérification est
  serveur, pas seulement dans le menu.
- **Le packaging.** Passer d'un simple `javac` à Maven oblige à structurer les
  sources, les ressources et la configuration. C'est plus long au départ, mais
  le JAR devient reproductible.

## Ce que j'en retiens

Écrire pour une API événementielle, c'est accepter de ne pas contrôler l'ordre
d'exécution. On ne peut pas dire « je fais A puis B » depuis un événement : on
peut seulement dire « quand ceci arrive, réagis ainsi ». Concevoir un plugin
correct revient donc à décider **où** sont les frontières entre réaction et
décision — la même réflexion que pour un contrôleur web, avec un modèle de
concurrence en plus.

J'ai aussi compris l'importance de l'**interopérabilité des formats** :
conserver l'identité du propriétaire d'une tête dans les métadonnées
persistantes permet au monde de rester cohérent après un redémarrage, et rend
la donnée lisible depuis les commandes d'administration.

## À compléter avant l'oral

- [ ] Capture de `/champi` et du menu d'administration.
- [ ] Capture d'une notification Discord.
- [ ] Extrait de code LuckPerms et configuration YAML anonymisée.
- [ ] Lien du dépôt et version du JAR présentée.
