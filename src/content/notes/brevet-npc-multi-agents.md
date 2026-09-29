---
titre: "Un brevet sur les PNJ multi-agents : l'outillage d'écriture avant le modèle"
url: https://futureofgaming.com/publications/patents/20260273414-bitpart-ai-wants-npcs-to-finally-act-like-a-cast-not-a-crowd
source: "Future of Gaming (brevet Bitpart AI, publié par l'USPTO)"
date: 2026-09-24
categories: [ia-jv, metiers]
tags: [npc, outillage, brevet, narration, multi-agents]
poids: 1
---

Ce brevet n'est pas encore accordé et son issue est incertaine. L'architecture
proposée mérite néanmoins qu'on s'y arrête, parce qu'elle s'attaque au bon
problème : **qui écrit le comportement des personnages**.

## Le pipeline proposé

La phase d'écriture est séparée de l'exécution. Un concepteur écrit des
transcriptions — des descriptions de ce que les personnages font et disent selon
les scénarios — et un outil les transforme en un réseau hiérarchique de tâches
recomposables. Chaque nœud est une tâche, chaque chemin une manière valide de la
réaliser.

À l'exécution, un composant « directeur » observe en continu l'état du jeu :
position du joueur, actions récentes, activité des autres personnages,
évolution de l'environnement. Il sélectionne et ordonne les plans en temps réel.

L'idée est que le concepteur n'a plus à écrire un arbre de décisions couvrant
chaque action possible du joueur. Il écrit des briques, le système compose.

## Pourquoi c'est intéressant, et où ça s'arrête

L'observation juste du dépôt de brevet : la valeur stratégique revendiquée n'est pas
l'IA, mais le **pipeline d'écriture**. Rendre la chose accessible à un concepteur
narratif non technique déplace le goulot d'étranglement dans l studio. C'est un
enjeu de production avant d'être un enjeu technique.

Mais la limite est là, et elle est structurelle : la richesse des comportements à
l'exécution est **plafonnée par ce que le concepteur a écrit**. Le directeur ne
peut sélectionner que des plans qu'un humain a définis. L'émergence réelle, elle,
n'existe pas. C'est une amplification, pas une création.

Reste aussi le coût : coordonner plusieurs agents sur un réseau hiérarchique
partagé dans un monde ouvert est coûteux en temps réel, précisément là où le
nombre de personnages actifs et de variables d'état est le plus élevé.

## Ce que je retiens

Une idée transférable à n'importe quel projet : **l'IA ne se substitute pas à
l'auteur, elle opère sur ce que l'auteur a décidé de lui donner**. Écrire les
transcriptions, c'est déjà faire le travail de conception narrative ; l system's
tâche est de le combiner, pas de s'y substituer.

Cela rejoint l'observation faite sur le GDC : la question utile n'est pas ce que
l'IA peut générer, mais quelle part de la conception humaine reste non délégable.
Ici, la réponse est : la structure, pas l'exécution.
