---
titre: "Vocal_System — bot vocal Discord"
resume: "Bot Discord qui pilote les salons vocaux : il transforme un salon vocal en salon textuel et en salon temporaire, avec une extension dédiée à la gestion des AFK."
ordre: 5
annee: 2025
contexte: personnel
matieres: []
statut: production
role: "Conception et développement complet"
stack:
  - Python
  - discord.py
  - Application Commands
  - Interactions et boutons
  - Heroku (Procfile)
competences:
  - "API Discord et intents"
  - "Programmation asynchrone (asyncio)"
  - "Architecture à extensions (cogs)"
  - "Interfaces à boutons et menus"
  - "Déploiement d'un service persistant"
misEnAvant: true
repo: https://github.com/Sharly-mod/discord_vocal_bot
couleur: ambre
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/discord_vocal_bot
  - label: Documentation
    url: https://github.com/Sharly-mod/discord_vocal_bot#readme
---

## Le contexte

J'ai un serveur Discord avec beaucoup de monde, et beaucoup de discussions
commencent en vocal puis se perdent : quand quelqu'un sort du salon, la
conversation continue en vocal mais plus personne ne sait ce qui s'est dit,
ou les participants se dispersent sans trace écrite.

**Vocal_System** répond à ce problème : le bot transforme un salon vocal en
**salon textuel temporaire**. Dès que quelqu'un se connecte, le bot ouvre un
salon écrit qui l'accompagne ; quand tout le monde part, il le supprime. La
conversation se retrouve archivée au lieu d'être perdue.

## Comment ça marche

Le bot a besoin de connaître les changements d'état vocaux — qui entre, qui
sort, qui est seul. C'est l'intent `voice_states`, qui n'est pas activé par
défaut. Sans lui, l'intelligence de salons de base suffit pour la gestion
administrative, mais pas pour ce genre de fonctionnement.

Le code est organisé en **cogs** (extensions), la mécanisme prévu par
`discord.py` pour découper un bot en modules chargeables séparément. Ici,
`afk_muter` gère la coupure de micro des joueurs AFK : un module distinct,
chargé indépendamment du cœur du bot.

## Le challenge : les IDs comme clés

Le premier vrai obstacle n'est pas technique, c'est conceptuel. Discord
identifie les salons et les serveurs par des **identifiants numériques figés**.
Un salon textuel est rattaché à un salon vocal, et cette correspondance doit
être mémorisée pour que le bot puisse retrouver le bon salon plus tard.

La table de correspondance relie un salon vocal à son salon textuel, et
l'identifiant du salon textuel est construit à partir de l'identifiant du
salon vocal. C'est une astide d'adaptation : l'API de Discord ne permet pas
de choisir l'identifiant d'un salon, on doit donc le déduire et le stocker.

## Ce que j'ai appris

`asyncio` change la façon d'écrire du code serveur. Une opération d'API est
une attente : on ne bloque pas le programme, on rend la main. Le corollaire
est qu'un oubli de `await` ne lève pas d'erreur — il provoque un bug
silencieux, ce qui est bien plus pénible à traquer.

Le déploiement a aussi été l'apprentissage le plus concret : un bot doit être
**toujours** en ligne. D'où le `Procfile`, qui décrit à la plateforme
hébergeuse la commande de lancement, et le passage en bot utilisateur plutôt
qu'en application à usage unique.

## Sécurité

Le token du bot est un secret, et il ne doit jamais être versionné. Il est
donc lu depuis une variable d'environnement, `.env` est ignoré, et
`.env.example` documente la variable attendue. Un token de bot Discord
donne un contrôle total sur le bot : il vaut mieux le considérer comme
compromis dès qu'il apparaît dans un historique Git.
