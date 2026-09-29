---
titre: "GTA VI, foules et PNJ : ce que coûte un vrai NPC"
url: https://gamingbolt.com/grand-theft-auto-6-is-at-least-10-years-ahead-of-the-industry-with-npcs-says-iois-ai-programmer
source: "GamingBolt (d'après les publications de Berkay Dursun, IO Interactive)"
date: 2026-08-28
categories: [ia-jv, metiers]
tags: [npc, simulation, performance, open world, game design]
poids: 2
projetLie: champihardcore
---

Le programmeur IA de IO Interactive, qui a travaillé trois ans sur la technologie
de foule de Hitman puis sur *Mount & Blade II*, commente les foules montrées dans
*Grand Theft Auto VI*. Sa distinction est la plus utile de toutes les discussions
sur les PNJ.

## Foule ≠ PNJ

Ce que l'on voit dans un bac à sable n'est pas une collection de personnages
intelligents, c'est une **foule** : des personnages sans IA, qui suivent des motifs
programmés et jouent un rôle décoratif. Un vrai PNJ, lui, réagit au joueur, a ses
propres comportements, et coûte — parce que c'est une simulation, pas un
animation.

Dans *GTA VI*, d'après lui, chaque personnage est simulé individuellement, à une
échelle que rien d'autre dans l'industrie n'atteint. L'exemple qu'il donne comme
plus proche reste un jeu de 2022, avec un quart du volume.

## Pourquoi c'est un problème de game design

Ce n'est pas une question d'IA générative : c'est une question de budget. Faire
réagir des milliers de personnes à ce que fait le joueur impose un coût par
entité. La conséquence est directe — plus la simulation est fine, plus la
distribution des rôles doit être hiérarchisée. On ne donne pas une IA de combat à
tous : on définit quels personnages méritent un comportement riche, et le reste
est traité comme de la foule.

C'est un arbitrage de conception avant d'être un problème technique. Le jeu ouvert
grand public n'a pas le luxe de la simulation totale ; un jeu où le lien social
avec les personnages est le cœur du sujet, si.

## Ce que je retiens

Dans ChampiHardcore, la question s'est posée exactement comme ça. Chaque joueur a
un coût de simulation — mort, tête, autel, élimination de clan — et l'ensemble ne
tient que parce que chaque état est petit, sérialisé et sauvegardé immédiatement.
Une économie de ressources n'est viable que si le coût unitaire est minuscule.

Deux enseignements, donc. Le premier est que « plus de PNJ intelligents » est une
promesse coûteuse et rarement tenable. Le second est que le vocabulaire compte :
distinguer une foule d'un PNJ évite de comparer deux problèmes qui n'ont rien en
commun.
