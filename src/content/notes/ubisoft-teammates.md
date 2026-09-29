---
titre: "Ubisoft — Teammates : ce qu'un LLM coûte quand il doit jouer en temps réel"
url: https://www.nvidia.com/gtc/session-catalog/sessions/gtc26-s81739/
source: "NVIDIA GTC — Tech Talk"
date: 2026-03-15
categories: [ia-jv]
tags: [npc, llm, inférence, latence, on-device, studio]
poids: 3
---

Ubisoft a présenté en novembre 2025 *Teammates*, son premier projet jouable de
NPC pilotés à la voix, puis détaillé toute la pile technique à la GTC de mars 2026.
La conférence est plus intéressante que l'annonce : elle dit exactement **ce que
l'IA générative coûte dans un moteur de jeu**.

## La chaîne, et où passe le temps

Le joueur parle à une équipe de PNJ. Le pipeline est une cascade : reconnaissance
vocale, modèle de langage, synthèse vocale. Ubisoft détail la répartition de la
latence — la reconnaissance vocale est déjà largement sous la seconde, la
synthèse vocale ajoute un délai faible, et **le modèle de langage concentre à lui
seul environ les deux tiers du temps total**. Tout le reste est de l'ingénierie
autour d'un goulot unique.

C'est la leçon : en jeu, l'IA générative n'est pas un problème de modèle, c'est un
projet d'architecture autour d'un composant qu'on ne peut pas faire stipuler plus
vite.

## Trois techniques transposables

1. **L'analyse partielle des appels de fonction.** Le LLM n'émet pas une action
   unique, il émet une structure. Dès que la première fonction est complète, elle
   part au moteur, l'arbre de comportement l'exécute, et le PNJ bouge — pendant
   que le reste est encore en génération. On n'attend pas la fin de la réponse
   pour agir.
2. **Le streaming partout.** Le texte s'affiche token par token, l'audio est
   découpé en morceaux et recollé pour rester cohérent. Le joueur perçoit une
   réponse immédiate même si le calcul continue.
3. **L'inférence locale pour les PNJ de masse.** Le prototype embarqué utilise un
   modèle de 0,34 milliard de paramètres quantifié en INT4, ajusté par SFT/DPO/GRPO
   sur des interactions réelles. Le critère de choix du modèle n'est pas la qualité
   maximale, c'est **la mémoire vidéo et la latence** : les modèles de 4 milliards
   de paramètres, plus beaux, dépassent le budget temps réel.

## Ce que je retiens

Le passage à l'échelle d'une IA conversationnelle dans un jeu ne se décide pas au
niveau du modèle mais au niveau du **budget de temps par tour de boucle**. Cette
contrainte d'ingénierie est structurelle : elle reprend exactement ce que j'ai
appris en concevant ChampiHardcore, où l'état du clan est écrit à chaque
transition pour ne jamais dépendre d'un état en mémoire potentiellement perdu.

Elle est aussi ce qui distingue une démonstration d'un jeu : une démo peut se
permettre cinq secondes de latence, un jeu non. C'est exactement la frontière que
le GTC 2026 et Ubisoft rendent visible.
