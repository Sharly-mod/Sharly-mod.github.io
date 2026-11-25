---
titre: "Stage DydyITServices — mise en production d'un centre d'imagerie médicale"
resume: "Mise en service d'une infrastructure réseau et serveur pour un centre d'imagerie médicale : Debian, Windows 11, VMware, DHCP, routage statique et audit de sécurité."
ordre: 1
annee: 2026
contexte: stage
matieres:
  - Administration Linux (Debian)
  - Windows Server et Windows 11
  - Virtualisation VMware
  - Ingénierie IP et modèle OSI
  - DHCP et routage statique
  - Sécurité et audit système
statut: termine
role: "Technicien : mise en production, configuration et recette des deux sites"
stack:
  - Debian 12
  - Windows 11 / Windows Server
  - VMware Workstation
  - IP / DHCP / routage statique
  - auditd (audit Linux)
  - PowerShell
competences:
  - "Administration système Linux et Windows"
  - "Dimensionnement d'adresses et de sous-réseaux (CIDR)"
  - "Configuration DHCP et tables de routage"
  - "Durcissement et audit de permissions"
  - "Virtualisation et snapshots de machines"
  - "Lecture du modèle OSI et analyse d'encapsulation (PDU)"
misEnAvant: true
repo: https://github.com/Sharly-mod/stage-dydyitservices
couleur: cyan
liens:
  - label: Notes techniques
    url: https://github.com/Sharly-mod/stage-dydyitservices
  - label: Répertoire des notes
    url: https://github.com/Sharly-mod/stage-dydyitservices/tree/main/notes
---

## Le contexte

J'ai effectué mon stage chez **DydyITServices**, sur une mission de mise en
production d'un **centre d'imagerie médicale**. L'objectif n'était pas de
développer une application, mais de faire fonctionner une infrastructure
complète : un site **Centre** avec ses postes de travail et son serveur de
département, à l'adresse `10.0.0.10`, et un site **Département**
interconnecté.

Le travail s'est déroulé dans un laboratoire de machines virtuelles
reproduisant cette architecture : deux sites, une liaison entre les deux, et
les équipements de chaque site. Chaque mission se conclut par une **preuve**
à produire : une capture, un rapport, un test de connectivité.

C'est le premier contexte où je vois un projet de bout en bout : une
infrastructure n'est pas « finie » quand les machines démarrent, mais quand
elles se parlent, quand elles sont surveillables et quand on sait prouver
qu'elles sont configuring comme prévu.

## Les cinq missions

### 1. Administration Debian

Création du compte technique et mise en place de l'élévation de privilèges.
Le compte de travail n'est pas `root` : il faut pouvoir tracer qui a fait
quoi. J'ai mis en place l'accès via `sudo`, en passant par `visudo` plutôt
qu'en éditant `/etc/sudoers` directement, et j'ai été carpal sur un détail qui
m'a coûté du temps : un changement de groupe ne prend effet qu'à la
**prochaine** ouverture de session, pas dans la session courante.

### 2. Optimisation Windows 11 et VMware

Intégration du pilote réseau et point de restauration. Le point de
restauration d'abord — avant de toucher à quoi que ce soit — puis le pilote
réseau, que VMware ne fournit qu'une fois les **VMware Tools** installés.
Sans eux, la carte réseau existe dans le gestionnaire de périphériques mais
sans pilote, donc sans adresse IP exploitable.

### 3. Ingénierie IP et modèle OSI

Analyse d'encapsulation (nom des PDU par couche) et calcul de sous-réseaux.
L'adresse MAC est traitée en **couche 2** (liaison de données) : c'est une
adresse physique, locale au réseau Ethernet, jamais routée au-delà. Pour le
réseau `192.168.10.128/26`, le bloc fait 64 adresses, l'adresse de
diffusion est `192.168.10.191`, et les hôtes utilisables vont de `.129` à
`.190`.

### 4. Interconnexion et services

Configuration du DHCP sur le serveur, puis table de routage statique entre les
deux sites. C'est la partie où la théorie devient concrète : une plage DHCP
mal calculée se voit immédiatement, et une route statique ne survit pas à un
redémarrage si on ne l'a pas rendue persistante.

### 5. Sécurité et audit

Droits récursifs sur une arborescence et extraction d'un rapport d'audit. Le
point important est la différence entre `chmod -R` avec `x` et avec `X` : le
`X` majuscule n'ajoute le droit d'exécution qu'aux répertoires et aux fichiers
déjà exécutables. Utiliser `x` rendrait exécutables tous les fichiers, ce qui
est rarely ce qu'on veut.

## Validation finale

La recette se termine par un test de connectivité inter-sites : un `ping`
depuis `PC2` (Centre) vers le serveur du Département à `10.0.0.10`. Si la
requête aboutit, c'est que toute la chaîne tient : adressage, DHCP, routage et
configuration des interfaces.

## Ce que j'en retiens

Ce stage m'a appris que l'infrastructure ne se valide pas à l'œil. Une
configuration peut sembler correcte à l'écran et ne pas fonctionner : il faut
une commande qui tranche (`ip route get`, `ipconfig /all`, `ausearch`), et une
preuve horodatée.

J'ai aussi compris l'intérêt du **reproductible** : un rapport d'audit n'a de
valeur que s'il est accompagné de la commande qui l'a produit, pour que
n'importe qui puisse le refaire et obtenir le même résultat.

## Notes techniques

Le détail des commandes, des fichiers de configuration et des pièges
rencontrés est dans le dépôt de notes, une note par mission.
