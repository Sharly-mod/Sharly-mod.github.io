---
titre: "Cognitive Tree : quand l'IA générative rencontre les arbres de comportement"
url: https://entropyai.co/research/building-the-next-generation-of-games/
source: "Entropy AI"
date: 2026-02-12
categories: [ia-jv]
tags: [npc, arbre de comportement, mémoire, on-device, architecture]
poids: 3
---

Entropy AI décrit l'architecture de ses jeux « IA-natifs ». Le document vaut surtout
pour une idée : **ne pas remplacer les arbres de comportement, les étendre**.

## L'idée centrale

Un arbre de comportement est la structure classique du jeu : des états, des
transitions, des conditions. Elle est prévisible, testable, et un studio sait la
raisonner. Le problème, c'est qu'elle ne sait pas comprendre une phrase.

Le *Cognitive Tree* ajoute une couche qui raisonne en langage naturel au-dessus de
l'arbre. Le signal ne part pas du seul contenu des mots : le joueur qui se tait, qui
se détourne, qui s'approche, qui bloque le passage sont autant d'**indices
sémantiques** injectés dans le système. Le PNJ ne réagit donc pas à « va-t-en »,
mais à « va-t-en » *plus* « le joueur reste immobile à deux mètres ».

C'est une boucle bidirectionnelle : ce que le joueur fait dans le monde modifie ce
que l'IA comprend, et ce que l'IA comprend modifie ce que le joueur vit.

## Le reste, en chiffres

- **Mémoire partagée** — faits du monde, graphe des relations entre personnages,
  journal des événements, position narrative. Les PNJ lisent cet état avant de
  générer quoi que ce soit, ce qui garantit la cohérence sur la durée.
- **Un directeur narratif** qui surveille l'engagement du joueur et peut injecter
  des événements ou ouvrir des branches, dans les limites définies par le
  concepteur. L'adaptation reste bornée par l'intention humaine.
- **Local plutôt que cloud** — le discours de coût est assumé : l'inférence
  exécutée sur la machine du joueur remplace un coût par session.
- **Mesures annoncées** — 4 ms jusqu'au premier token, 265 ms de latence de
  réponse pour le modèle seul, 124 ms jusqu'au premier fragment audio, le tout en
  streaming. Ce sont des chiffres de éditeur, à prendre comme tels, mais ils
  donnent l'ordre de grandeur des budgets à viser.

## Ce que je retiens

L'idée transférable est l'**hybridation** : garder la partie déterministe pour ce
qui doit être fiable (les règles, les transitions, les limites) et n'utiliser le
modèle que pour ce qui doit être compris (l'intention, le contexte, la mémoire).
Un système de jeu entièrement probabiliste n'est pas testable ; un système
entièrement scripté ne dialogue pas.

C'est la même frontière que celle de mon plugin ChampiHardcore, vue par l'autre
bout : les règles d'élimination et de résurrection sont déterministes et
persistées, et c'est précisément ce qui les rend fiables.
