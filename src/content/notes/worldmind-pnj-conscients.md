---
titre: "WorldMind : rendre les PNJ conscients de l'état du jeu"
url: https://www.alphaxiv.org/abs/2608.21439
source: "alphaXiv — WorldMind (Tencent, National University of Singapore)"
date: 2026-08-18
categories: [ia-jv, recherche]
tags: [npc, modèle de monde, état, llm, dataset]
poids: 2
projetLie: champihardcore
---

La plupart des modèles de monde traitent le personnage non joueur comme des
pixels de fond. WorldMind pose le problème frontalement et propose une réponse
architecturale.

## Le problème bien posé

Un boss ne devrait pas utiliser une attaque de mêlée si le joueur est loin, ni une
compétence forte en recharge. Mais un modèle qui génère l'image doit alors
simuler l'état, décider, et rendre en même temps : ces trois tâches sont
mélangées, et le modèle ne peut pas raisonner sur un état qu'il n'a jamais
extrait.

## La réponse : découpler en quatre couches

1. **Compréhension** — construire un état compact à partir des frames générées.
2. **Décision** — raisonner sur cet état pour planifier la prochaine action, avec
   un modèle de langage utilisé en zero-shot ou few-shot, à partir de la
   description des compétences disponibles (« Charge : combleur d'écart, dégâts
   élevés »).
3. **Contrôle** — traduire la décision en conditions temporelles alignées, via
   un gabarit en langage : « le boss melee pendant qu'il se déplace à gauche ».
4. **Génération** — synthétiser le résultat visuel.

La boucle est fermée : ce qui vient d'être montré au joueur influence la
décision suivante.

## Le résultat qui compte

Le modèle est préféré aux autres en comparaison deux à deux dans environ 70 % des
cas, jugé plus tactiquement approprié et plus cohérent. Le générateur vidéo
est distillé pour tourner à 20 images par seconde, seuil minimal pour du jeu
interactif. Le tout fonctionne **sans accès au moteur à l'inférence** : l'état est
reconstruit depuis l'image.

## Ce que je retiens

Deux choses. La première est une idée d'ingénierie transférable à tout jeu : **un
décideur a besoin d'un état, pas d'une image**. Séparer l'extraction de l'état, la
décision, et le rendu rend chaque couche testable séparément.

La seconde est une limite assumée qui rend le travail honnête : l'entraînement
utilise l'état interne du moteur comme vérité, mais le modèle ne le reçoit pas à
l'inférence. Tout le transfert repose sur la capacité à reconstruire un état
fiable depuis ce que le joueur voit. Dans un jeu, se tromper d'état n'est pas un
détail visuel, c'est un joueur qui perd contre une logique impossible.
