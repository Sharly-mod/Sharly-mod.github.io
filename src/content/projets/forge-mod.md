---
titre: "Forge 1.21 — mod Minecraft"
resume: "Premier mod d'un serveur Minecraft sous Forge 1.21 : compréhension du chargement de mod, des ressources et de la déclaration d'un item, en Java 21."
ordre: 6
annee: 2025
contexte: personnel
matieres: []
statut: prototype
role: "Apprentissage du chargement de mods Forge et des ressources"
stack:
  - Java 21
  - Minecraft Forge 1.21
  - Gradle
  - Parchment mappings
competences:
  - "Structure d'un mod Forge (mods.toml, items, modèles)"
  - "Chaîne de build Gradle et datagen"
  - "Ressources d'assets (modèles, textures, traductions)"
  - "Java 21 et toolchains Gradle"
misEnAvant: false
repo: https://github.com/Sharly-mod/forge1.21.test
couleur: vert
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/forge1.21.test
---

## Le contexte

Ce dépôt part du **modèle de développement officiel** (MDK) de Forge pour
Minecraft 1.21, avec l'ajout d'un item. Ce n'est pas un mod publié, c'est un
projet d'apprentissage : comprendre comment un mod se charge, se déclare et
se construit.

## Ce que le MDK donne, et ce que j'y ai ajouté

Le MDK fournit déjà la structure complète du build. J'ai ajouté l'item
**Alexandrite** et ses ressources, ce qui a demandé de toucher à quatre
endroits distincts.

**`TutorialMod.java`** — le point d'entrée déclaré dans `mods.toml`. C'est la
classe que Forge instancie au chargement ; c'est là qu'on enregistre les
objets via les *bus d'événements*.

**`Moditems.java`** — la déclaration de l'item : sa classe, son nom
technique, et son enregistrement dans le registre. Un objet absent de ce
registre n'existe pas pour le jeu, même si sa classe est compilée.

**Le modèle** (`models/item/alexandrite.json`) — la forme de l'item à l'écran.
C'est un fichier de ressources, pas du code.

**La texture** (`textures/item/alexandrite.png`) — le dessin lui-même.

**La traduction** (`lang/en_us.json`) — le nom affiché. Sans ce fichier,
l'objet apparaît avec sa clé technique à la place de son nom.

## Ce que le projet m'a appris

Le point le plus contre-intuitif est la séparation entre **code** et
**ressources**. En Java, tout ce qui est lisible par le jeu est compilé dans
un JAR ; mais le modèle, la texture et la traduction sont des fichiers de
ressources, lus à l'exécution. Les modifier ne demande pas de recompiler.

Le build Gradle est lui-même un petit projet : il déclare la version de
Minecraft, celle de Forge, les mappings, et le language level (Java 21, via
une toolchain, pour ne pas dépendre du JDK installé sur la machine). Le
résultat sort dans `target/`, qu'il suffit de déposer dans le dossier
`plugins/` d'un serveur Forge.

## État

Projet d'apprentissage conservé pour référence. Le mod n'est pas publié, et
le dépôt reste le MDK complété d'un seul item.
