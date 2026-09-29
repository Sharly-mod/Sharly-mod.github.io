---
titre: "GDC 2026 : trois ans de discours, toujours pas de production"
url: https://www.aiandgames.com/p/generative-ai-at-gdc-jogging-in-place
source: "AI and Games"
date: 2026-03-18
categories: [ia-jv, metiers]
tags: [gdc, industrie, doute, adoption, game design]
poids: 3
---

Le meilleur compte rendu de la GDC 2026 sur l'IA générative n'est pas du marketing :
c'est un inventaire sceptique. Il vaut la peine parce qu'il décrit un décalage qui
n'a pas bougé en trois ans.

## Le constat

Trois observations se détachent :

1. **Beaucoup de stands, peu de preuves.** Des outils présentés comme prêts pour
   la production, beaucoup de présentations sponsorisées, et très peu de retours
   d'expérience sur ce que l'IA a réellement changé dans un pipeline existant.
2. **Un décalage entre le discours et l'usage.** Le discours porte sur l'IA comme
   outil de production ; dans les faits, hors petites équipes indépendantes, il
   n'existe presque aucune donnée publique sur son efficacité réelle, parce que
   presque rien n'est sorti en AAA avec l'IA présente dès le premier jour.
3. **L'aveu de DeepMind.** Sur la scène de la conférence, Google a indiqué que
   **Genie 3 n'est pas utilisable comme moteur de jeu**, car il ne maintient pas la
   cohérence du monde dans le temps. C'est l'information la plus importante de la
   conférence, et elle a été traitée comme un détail.

## Pourquoi le troisième point est le plus intéressant

Un modèle de monde qui génère des images plausibles image par image n'est pas un
moteur de jeu. Un moteur de jeu doit garantir qu'un objet déplacé reste déplacé,
qu'une règle continue de s'appliquer, que deux joueurs voient le même monde. Ce
n'est pas un problème de qualité d'image, c'est un problème de **propriétés**.

Cela rejoint directement le travail sur la génération vidéo autoregressive :
l'accumulation d'erreurs est structurelle, puisque chaque image générée devient le
contexte de la suivante et que les écarts se cumulent. Un jeu ne peut pas se
contenter d'être « à peu près » cohérent.

## Ce que je retiens

Le secteur a produit en trois ans beaucoup de démonstration et très peu de retours
sur investissement. Pour sélectionner un projet, la bonne question n'est donc pas
« qu'est-ce que l'IA peut faire », mais **« quelle propriété du système ne peut
pas être déléguée »**. Cette réponse change d'un projet à l'autre, et c'est
précisément ce qui rend une veille utile plutôt qu'un flux de communiqués.
