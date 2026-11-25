---
titre: "OWASP Top 10:2025 — la chaîne logistique logicielle devient un risque de premier plan"
date: 2026-11-12
source: "OWASP Foundation"
sourceUrl: https://owasp.org/Top10/
resume: "La nouvelle édition du Top 10 met en avant les défaillances de la chaîne logistique logicielle : dépendances compromises, pipelines CI/CD, provenance des artefacts et mises à jour."
impact: "Verrouiller les versions, auditer les dépendances, signer les artefacts et ne jamais exposer de secrets dans la CI."
tags: [OWASP, supply chain, dépendances, CI/CD]
tempsLecture: 6
ordre: 1
---

## Ce que dit la source

Le projet OWASP Top 10 classe les risques de sécurité les plus importants pour
les applications web. L’édition 2025 met en avant une catégorie longtemps
sous-estimée : les **défaillances de la chaîne logistique logicielle**
(*Software Supply Chain Failures*).

Le principe est simple : une application n’est pas seulement le code que
j’écris. Elle est aussi composée de bibliothèques, d’outils de build, de
registres de paquets, de scripts d’installation et de pipelines de déploiement.
Si l’un de ces maillons est compromis, le code applicatif peut être parfait et
l’application rester vulnérable.

## Pourquoi c’est un changement de perspective

En BTS, on apprend surtout à sécuriser **ce qu’on écrit** : valider les
entrées, échapper les sorties, utiliser PDO, hacher les mots de passe. C’est
indispensable, mais incomplet.

La supply chain ajoute une question différente : **d’où vient le code que je
n’ai pas écrit ?** Une dépendance peut être abandonnée, mal maintenue, ou
volontairement compromise. Un script `postinstall` peut exécuter du code au
moment de l’installation. Un pipeline CI peut contenir un secret accessible à
une pull request.

## Ce que ça change dans mes projets

- **Verrouiller les versions** : conserver `composer.lock` et
  `package-lock.json`, et installer avec `npm ci` plutôt qu’un `npm install`
  non maîtrisé.
- **Auditer** : lancer `composer audit`, `npm audit` et activer Dependabot sur
  GitHub.
- **Limiter les dépendances** : chaque paquet ajouté doit avoir une raison
  claire. Une librairie pour une fonction de 20 lignes est une dette.
- **Protéger les secrets** : fichiers `.env` ignorés, secrets dans les
  variables du dépôt, jamais dans le code ou dans un prompt d’IA.
- **Signer et vérifier** : la signature des artefacts et le SBOM sont des
  sujets que je découvre ; je sais aujourd’hui pourquoi ils existent, même si
  je ne les maîtrise pas encore en production.

## Ce que je retiens pour l’oral

La sécurité d’une application commence avant la première ligne de code : dans
le choix des dépendances et dans la manière de construire. C’est un argument
que je peux relier directement à Fair’repair (PDO, dépendances limitées) et à
mes projets React/Java (Maven, npm).

## Source

- [OWASP Top 10](https://owasp.org/Top10/) — OWASP Foundation.
- [OWASP Software Component Verification Standard](https://owasp.org/www-project-software-component-verification-standard/) pour aller plus loin sur la vérification des composants.
