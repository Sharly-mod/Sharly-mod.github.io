---
titre: "DLSS 5 et ACE : l'IA dans le moteur est déjà une norme, pas une promesse"
url: https://developer.nvidia.com/blog/whats-new-for-game-developers-dlss-5-with-3d-guided-neural-rendering-nvidia-ace-updates-and-new-rtx-kit-capabilities/
source: "NVIDIA Developer Blog"
date: 2026-09-22
categories: [ia-jv, moteurs]
tags: [dlss, rendu neuronal, inférence, shader, nvidia]
poids: 2
---

La mise à jour de septembre 2026 est intéressante parce qu'elle ne parle pas
d'expérience de recherche : elle décrit ce que les studios **utilisent déjà** pour
livrer un jeu sur le marché.

## Le rendu neuronal change de nature

DLSS 5 introduit le *3D-Guided Neural Rendering*. Le principe est important : la
frame rendue par le moteur reste la **source de vérité non négociable**. La
géométrie, les textures et l'éclairage produits par les artistes ne sont pas
remplacés, ils sont utilisés comme condition d'entrée du modèle. Le moteur décide
de ce qui est intangible, l'IA ajoute du détail haute fréquence et de l'éclairage
plus naturel.

Deux consequences en découlent :

- Le modèle est déterministe et stable dans le temps, avec une entrée et une sortie
  par frame, conditionné par les vecteurs de mouvement du moteur.
- Les studios gardent la main : sélection du modèle, réglage de l'intensité
  structurelle et tonale, et surtout des **masques** — sémantiques ou définis au
  niveau du moteur — pour appliquer l'effet à certains éléments et l'exclure
  d'autres. La verrerie, l'eau, le feuillage peuvent rester hors du traitement.

## En face, ACE avance du même pas

Le même billet annonce le_sdk d'inférence dans le moteur (exécution in-process),
un modèle de reconnaissance vocale streaming, un modèle de synthèse vocale
paramétrable, et un connecteur Stable Diffusion. L'orientation est nette : les
modèles sont **assez petits pour tourner dans le jeu**, et l'outillage devient une
brique de pipeline comme une autre.

## Ce que je retiens

Il y a un écart important entre « l'IA dans les jeux » au sens de la recherche et
l'IA dans les jeux au sens de la production. Un jeu commercial n'intègre pas un
modèle pour refaire son moteur : il intègre un modèle **borné**, à un endroit précis
du pipeline, avec des réglages pour que l'artiste garde le contrôle.

C'est la bonne posture de conception, et elle rejoint celles d'Ubisoft et
d'Entropy : l'IA s'insère à un endroit mesurable du système, avec des garde-fous,
pas à la place du système.
