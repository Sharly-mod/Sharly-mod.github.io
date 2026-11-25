---
titre: "Ongaku — de Python à une application Rust assistée par IA"
resume: "Application de musique née d'un script Python, portée en Rust/Slint pour PC et Android, avec une PWA : import de playlists Spotify, téléchargement tagué, lecteur local, paroles et compte Supabase."
ordre: 5
annee: 2026
contexte: personnel
selectionE5: false
matieres:
  - Python
  - Rust / Slint
  - Android / NDK
  - PWA
  - Développement assisté par IA
statut: production
role: "Conception, prototypage Python, portage Rust/Slint, builds Android/PC et tests"
stack:
  - Python
  - Rust
  - Slint
  - PWA (HTML / CSS / JS)
  - Android (Gradle / NDK)
  - Supabase
  - yt-dlp / ffmpeg
  - mp4ameta
  - rodio / symphonia
  - InnerTube
competences:
  - "Automatisation Python : parsing, téléchargement, métadonnées"
  - "Rust : ownership, threads, appels HTTP et gestion de fichiers"
  - "Interface desktop et mobile avec Slint"
  - "Build Android avec Gradle, NDK et cargo-ndk"
  - "Manipulation de fichiers audio M4A/AAC et tags iTunes"
  - "Développement assisté par IA avec revue et tests manuels"
besoins:
  - "Coller une URL de playlist Spotify publique et récupérer les titres automatiquement."
  - "Télécharger chaque morceau dans un format lisible sur Android et sur PC, avec titre, artiste, album et jaquette."
  - "Lire la musique hors ligne, avec précédent, pause, suivant, aléatoire et boucle."
  - "Retrouver ses playlists, ses favoris, sa reprise de lecture et ses paroles."
  - "Fonctionner sur téléphone Android et sur ordinateur, sans dépendre d'un serveur interne."
choixTechniques:
  - "Prototype Python avec yt-dlp, ffmpeg et eyed3 pour valider le besoin et la chaîne de traitement."
  - "Portage en Rust pour obtenir un binaire PC et une bibliothèque Android performante, sans runtime Python embarqué."
  - "Slint pour une interface unique desktop/mobile, compilée avec le binaire Rust."
  - "M4A/AAC 128 kbps sur Android plutôt que MP3 + ffmpeg embarqué : APK plus léger, lecture native."
  - "Client InnerTube pour résoudre les URLs audio sans dépendre de yt-dlp côté Rust."
  - "Stockage local dans Music/Musique/<playlist>/, avec reprise et fichiers .m3u pour les lecteurs du téléphone."
  - "Supabase pour le compte, le partage et la synchronisation des playlists."
fonctionnalites:
  - "Import d'une playlist Spotify publique par URL."
  - "Téléchargement des morceaux avec progression, annulation et reprise après interruption."
  - "Écriture des tags et de la jaquette dans le fichier audio."
  - "Lecteur intégré : lecture, pause, précédent, suivant, aléatoire, boucle et déplacement dans la piste."
  - "Paroles synchronisées, file d'attente, favoris, historique et reprise de lecture."
  - "Recherche globale dans les playlists et les titres."
  - "Gestionnaire de téléchargements avec réessai des échecs."
  - "Version PC, APK Android et PWA, avec contrôles média et notifications."
  - "Compte Supabase, partage de playlist et mode réception."
crud:
  - "Playlists : importer, lire, renommer/supprimer localement."
  - "Titres : lire, mettre à jour les métadonnées et la jaquette."
  - "Favoris : ajouter, lister et retirer."
  - "File d'attente : ajouter, déplacer et retirer un morceau."
  - "Compte : créer une session, lire et mettre à jour le profil."
securite:
  - "Aucun identifiant Spotify privé : seule la page embed publique est lue."
  - "Aucune clé secrète dans le dépôt ; les variables sensibles restent en configuration locale."
  - "Validation des URLs de playlist et des réponses réseau avant écriture sur le disque."
  - "Fichiers écrits dans un dossier public contrôlé, avec reprise sans écraser l'existant."
  - "Code produit avec l'IA mais relu, compilé et testé manuellement avant diffusion."
  - "APK signé en debug pour les tests ; signature release à prévoir pour une publication."
competencesBts: [C4, C5, C6]
captures:
  - captures/ongaku/accueil.png
  - captures/ongaku/bibliotheque.png
  - captures/ongaku/lecture.png
  - captures/ongaku/paroles.png
  - captures/ongaku/recherche.png
  - captures/ongaku/mobile-lecture.png
aCompleter:
  - "Capture du gestionnaire de téléchargements (les autres écrans sont intégrés)."
  - "Capture de la version PC si tu veux la distinguer du mobile."
  - "Lien du dépôt GitHub ou archive de l'APK / de l'exécutable PC."
  - "Quelques chiffres : taille de l'APK, temps de build, nombre de pistes importées."
---

## Le point de départ : un script Python

Ongaku est né d'un besoin simple : coller une URL de playlist Spotify publique
et récupérer les morceaux automatiquement. Le premier prototype, `main.py`,
tenait en quelques fonctions :

- lire la page *embed* publique de Spotify et extraire les titres ;
- chercher chaque morceau sur YouTube avec `yt-dlp` ;
- convertir en MP3 avec `ffmpeg` ;
- écrire les tags et la jaquette avec `eyed3` ;
- reprendre le téléchargement sans écraser les fichiers déjà présents.

Ce script a validé la chaîne complète. Il a aussi montré ses limites : dépendance
à `ffmpeg`, format MP3 discutable sur Android, pas d'interface, pas de lecteur,
pas de gestion de bibliothèque.

## Le passage à une vraie application

J'ai poussé l'expérience jusqu'au bout : transformer ce script en application
utilisable au quotidien, sur PC et sur Android, en **Rust + Slint**.

| Sujet | Choix |
| --- | --- |
| Interface | Slint, compilée avec le binaire Rust |
| Réseau | `ureq`, `serde_json`, client InnerTube |
| Audio | M4A/AAC sur Android, lecture `rodio` / `symphonia` sur PC |
| Tags | `mp4ameta` (tags iTunes + jaquette) |
| Stockage | `Music/Musique/<playlist>/`, fichiers `.m3u`, reprise |
| Compte | Supabase (session, profil, partage) |
| Build | Cargo + Gradle + NDK pour l'APK, scripts PowerShell pour le PC |

La version Android ne peut pas embarquer `yt-dlp` et `ffmpeg` sans alourdir
fortement l'APK. J'ai donc changé de stratégie : appel direct à InnerTube pour
obtenir une URL audio, téléchargement en streaming, puis écriture des tags. Le
fichier reste lisible par les lecteurs du téléphone et indexé dans MediaStore.

## La place de l'IA

C'est le cœur de l'expérience : **partir d'un code Python et voir jusqu'où un
flux de travail assisté par IA peut mener**, sans perdre la maîtrise du
résultat.

L'IA a servi à produire des squelettes, proposer des architectures, expliquer
des erreurs de compilation Rust, générer des tests et accélérer les parties
répétitives. Elle n'a pas remplacé :

- la **lecture des erreurs** de compilation et de runtime ;
- les **tests réels** sur PC et sur téléphone ;
- la vérification des **fichiers produits** (tags, jaquettes, doublons) ;
- les décisions de **produit** : quel format, quel écran, quel comportement
  quand YouTube change.

C'est cette distinction que je retiens : l'IA rend le développement plus rapide,
mais elle déplace l'effort vers la revue, le test et la compréhension.

## Les difficultés

- **YouTube change régulièrement.** Le client InnerTube et les constantes de
  version doivent être maintenus, comme pour `yt-dlp`.
- **Android est plus contraignant que prévu.** JDK, build-tools, NDK,
  `cargo-ndk`, ABI `arm64-v8a`, permissions de stockage : chaque couche a ses
  propres erreurs.
- **L'APK a explosé à 362 Mo.** La bibliothèque Rust était compilée en debug
  avec les symboles. La correction : build release, `strip = true`, une seule
  ABI. L'APK redescend à environ 16 Mo.
- **Le threading audio.** La sortie audio doit rester dans un thread dédié ;
  l'interface lit l'état (position, durée, aléatoire, boucle) sans bloquer.
- **Les fichiers.** Il faut gérer les doublons, la reprise, les tags, les
  jaquettes et les `.m3u` sans corrompre la bibliothèque existante.

## Ce que j'en retiens

Ongaku m'a fait travailler trois choses que le BTS ne couvre pas toujours :
le **portage d'un langage à un autre**, la **compilation mobile** et la
**maintenance d'une dépendance externe qui casse**. C'est aussi le projet qui
m'a le plus fait utiliser l'IA — et le plus fait comprendre ses limites.

La suite serait de publier une version release signée, d'ajouter des tests
automatisés sur les fichiers produits et de documenter la procédure de mise à
jour du client YouTube.

## À compléter avant l'oral

- [ ] Capture du gestionnaire de téléchargements.
- [ ] Lien du dépôt GitHub ou archive APK/EXE.
- [ ] Chiffres : taille de l'APK, temps de build, nombre de pistes.
- [ ] Courte explication du rôle exact de l'IA dans le développement.
