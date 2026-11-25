---
titre: "Dépendances npm compromises : comprendre une attaque par propagation"
date: 2026-10-03
source: "GitHub Security Lab / ANSSI"
sourceUrl: https://github.blog/security/
resume: "Retour sur les attaques de type ver qui se propagent par les dépendances npm : un paquet compromis peut exécuter du code à l’installation, puis contaminer les projets et les pipelines."
impact: "Désactiver les scripts d’installation non nécessaires, vérifier les paquets avant ajout, utiliser un registre miroir et surveiller les alertes."
tags: [npm, dépendances, malware, CI/CD]
tempsLecture: 5
ordre: 2
---

## Le cas étudié

En septembre 2025, une campagne de type ver a touché l’écosystème npm : des
paquets compromis exécutaient du code malveillant lors de l’installation, puis
tentaient de se propager à d’autres paquets et de récupérer des identifiants
présents sur la machine ou dans l’environnement.

Le point important n’est pas le nom de la campagne : c’est le **mécanisme**.
Une dépendance n’est pas un simple fichier inerte. Au moment de
l’installation, npm peut exécuter des scripts `preinstall`, `install` ou
`postinstall`. Ces scripts ont les droits de l’utilisateur qui lance la
commande.

## Comment ça se propage

1. Un mainteneur de paquet est compromis, ou un paquet malveillant est publié
   avec un nom proche d’un paquet connu (*typosquatting*).
2. Le script d’installation récupère des variables d’environnement, des jetons
   npm ou des clés SSH.
3. Il publie une nouvelle version compromise de paquets auxquels il a accès.
4. Les projets qui installent ces paquets, puis les pipelines CI qui les
   construisent, sont contaminés à leur tour.

C’est la partie qui fait peur : la propagation ne dépend pas d’une action
humaine, mais de l’automatisation normale d’une chaîne de build.

## Ce que ça change pour un projet étudiant

Même un petit projet est concerné :

- Un `npm install` lancé sans regarder peut exécuter du code.
- Un `package-lock.json` absent rend les versions non reproductibles.
- Un `.env` versionné ou collé dans un prompt d’IA peut fuiter.
- Une dépendance ajoutée « pour tester » reste dans le projet.

## Ce que j’applique

- `npm ci` en CI plutôt que `npm install`.
- Vérification des scripts d’installation des nouveaux paquets.
- `npm audit` et Dependabot activés sur les dépôts.
- Aucun secret dans le dépôt ; `.env.example` documente seulement les variables.
- Avant d’ajouter une dépendance : est-ce que je peux l’écrire moi-même
  proprement, et est-ce que je comprends ce qu’elle fait ?

## Source

- [GitHub Security Lab](https://github.blog/security/) — analyses et bonnes pratiques.
- [ANSSI — CERT-FR](https://www.cert.ssi.gouv.fr/) — alertes et recommandations.
- [npm — scripts d’installation](https://docs.npmjs.com/cli/v10/using-npm/scripts) — documentation officielle.
