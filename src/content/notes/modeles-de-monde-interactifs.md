---
titre: "Modèles de monde interactifs : pourquoi ils ne sont pas encore des moteurs"
url: https://aibreakingwire.com/news/runway-launches-worldprompt-to-power-real-time-720p-world-model
source: "AI Breaking Wire (à propos de GWM Worlds 2, Runway)"
date: 2026-09-25
categories: [ia-jv, recherche]
tags: [modèle de monde, génération vidéo, causalité, mémoire, temps réel]
poids: 2
---

En septembre 2026, Runway présente un modèle de monde temps réel : flux vidéo 720p
à 24 images par seconde avec l'audio synchronisé, piloté par des événements
injectés en temps réel. L'exploit technique est réel. Les limites décrites par les
chercheurs eux-mêmes le sont davantage.

## Les trois obstacles nommés

1. **L'accumulation d'erreurs.** Dans une génération autoregressive, chaque image
   produite réintègre le réseau comme contexte pour la suivante. Une petite
   incohérence visuelle se propage et s'amplifie sur une session longue. Ce n'est
   pas un bug à corriger, c'est une propriété du fonctionnement.
2. **La mémoire.** Maintenir un monde cohérent sur plusieurs heures demanderait de
   conserver un historique illimité en mémoire GPU. Il faut donc choisir ce que
   l'on garde et ce que l'on oublie, et la question de la mémoire longue reste
   ouverte.
3. **La causalité et le contrefactuel.** Les données d'entraînement sont biaisées :
   un clip de football contient surtout des buts réussis. Un vrai modèle de monde
   doit produire des conséquences tout aussi plausibles quelle que soit l'action
   choisie. Savoir générer une scène n'est pas savoir simuler.

## Le point clé pour le game design

La première version de Runway produisait de la vidéo par lots. La nouvelle est un
moteur interactif : les événements sont horodatés et injectés pendant la session,
sans table d'état explicite ni interpréteur de script.

Autrement dit, le contrôle passe par des instructions en langage naturel plutôt
que par une logique de jeu. C'est une **abstraction de contrôle radicale** : pas de
variables, pas de règles, pas d'état consultable. Ce qui se perd n'est donc pas la
qualité visuelle, c'est l'accès à l'état.

## Ce que je retiens

Un système que l'on ne peut pas interroger n'est pas un système que l'on peut
concevoir. Un moteur de jeu expose son état au concepteur, qui peut alors écrire
une règle, la tester, et garantir qu'elle tiendra. Les modèles de monde actuels
sont des générateurs d'expérience, pas des moteurs : ils produisent le rendu
visible, jamais les règles.

C'est la frontière que les studios n'ont pas encore franchie, et c'est celle qui
décidera de l'adoption en production.
