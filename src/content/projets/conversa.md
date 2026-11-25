---
titre: "Conversa — application de messagerie instantanée"
resume: "Application React + Supabase : authentification, demandes d'amis, statuts et messagerie privée en temps réel, avec Row Level Security côté PostgreSQL."
ordre: 4
annee: 2026
contexte: personnel
selectionE5: true
matieres:
  - React / hooks
  - PostgreSQL
  - Authentification
  - Temps réel
statut: prototype
role: "Conception et développement complet : base, authentification, temps réel et interface"
stack:
  - React
  - Vite
  - Supabase (PostgreSQL, Auth, Realtime)
  - Tailwind CSS
  - OneSignal
competences:
  - "Composants React, hooks et séparation logique / affichage"
  - "Authentification et gestion de session avec Supabase Auth"
  - "Abonnement temps réel aux changements PostgreSQL"
  - "Politiques Row Level Security (RLS)"
  - "Variables d'environnement et build Vite"
  - "Notifications push avec OneSignal"
besoins:
  - "Permettre à un utilisateur de créer un compte et de gérer son profil."
  - "Ajouter des amis, accepter ou refuser une demande."
  - "Afficher un statut (en ligne, occupé, hors ligne) et une liste de contacts."
  - "Envoyer et recevoir des messages privés en temps réel."
  - "Conserver l'historique des conversations et éviter les doublons."
choixTechniques:
  - "React et Vite pour une interface réactive et un build rapide."
  - "Supabase Auth pour l'inscription, la connexion et les sessions JWT."
  - "PostgreSQL avec des politiques RLS : la sécurité est dans la base, pas seulement dans l'interface."
  - "Supabase Realtime pour l'abonnement aux nouveaux messages et aux changements de statut."
  - "Un hook useMessages isole la logique temps réel du composant d'affichage."
fonctionnalites:
  - "Inscription, connexion et déconnexion."
  - "Recherche d'utilisateurs et envoi de demandes d'amis."
  - "Acceptation / refus des demandes et liste de contacts."
  - "Statuts de présence et mise à jour en temps réel."
  - "Conversations privées et historique des messages."
  - "Notifications push lorsqu'un message arrive (OneSignal)."
crud:
  - "Profils : créer, lire et mettre à jour ses informations."
  - "Demandes d'amis : créer, lire, accepter ou supprimer."
  - "Messages : créer, lire et supprimer ses propres messages."
  - "Statuts : mettre à jour sa présence."
securite:
  - "Authentification Supabase et jetons JWT."
  - "Row Level Security activé sur les tables : un utilisateur ne lit que ses conversations."
  - "Aucune clé service_role dans le client React : seule la clé anonyme est exposée."
  - "Variables d'environnement dans .env, ignorées par Git."
  - "Validation des messages et des identifiants côté client et côté base."
competencesBts: [C3, C4, C5, C6]
captures: []
aCompleter:
  - "Capture d'une conversation et de la liste d'amis."
  - "Capture des statuts en temps réel."
  - "Lien du dépôt GitHub et éventuellement une démo (le projet Supabase n'est plus actif)."
misEnAvant: true
repo: https://github.com/Sharly-mod/Conversa
couleur: violet
liens:
  - label: Documentation
    url: https://github.com/Sharly-mod/Conversa#readme
---

## Le contexte

Une messagerie temps réel paraît simple et ne l'est pas : l'échange de messages
n'est que la partie visible. Ce qui compte, c'est la persistance, l'identité des
utilisateurs, les demandes d'amis, les statuts et la manière dont une connexion
reste ouverte sans figer l'interface.

J'ai construit **Conversa** sur React et Supabase pour travailler l'écosystème
temps réel et un modèle de données relationnel exposé au client.

## Les choix techniques

**Supabase plutôt qu'un backend maison.** J'avais besoin d'authentification,
d'une base relationnelle et de temps réel. Supabase apporte les trois, avec
PostgreSQL et une API standard. Ce n'est pas une boîte noire : on peut lire le
schéma, écrire des politiques RLS et interroger les données en SQL.

**React + Vite.** Vite pour le serveur de développement et le build, React pour
les composants et les hooks. La logique temps réel est isolée dans
`useMessages` : le composant `Chat` ne sait pas comment les messages arrivent,
il sait seulement les afficher.

**Row Level Security.** C'est le point central. La clé anonyme Supabase est
publique : elle est injectée dans le bundle du navigateur, donc n'importe qui
peut l'extraire. La seule chose qui protège réellement les données est le
RLS activé dans PostgreSQL. Comprendre cela a changé ma façon de voir ce qu'on
peut versionner et ce qu'on peut exposer.

## L'organisation du code

```text
src/
├── components/    AddFriend, Chat, UserList, Layout
├── hooks/         useMessages (abonnement temps réel)
├── lib/           client Supabase
├── pages/         Auth
└── assets/
```

## Les fonctionnalités

- Authentification et profil.
- Recherche d'utilisateurs, demandes d'amis, acceptation ou refus.
- Statuts de présence et mise à jour en temps réel.
- Conversations privées et historique.
- Notifications push avec OneSignal.

## Ce que j'ai appris

Le vrai sujet d'un projet temps réel n'est pas l'envoi, c'est **l'état**. Quand
un message part, l'application a un message optimiste. Quand il arrive par le
canal Realtime, elle a le même message, peut-être avec un identifiant serveur.
Il faut gérer le doublon, l'échec d'envoi et la désynchronisation entre deux
onglets ouverts.

J'ai aussi compris que la sécurité d'une application Supabase ne se joue pas
dans le composant React : elle se joue dans les politiques de la base. Un
`if` dans l'interface n'est pas une protection.

## État du projet

Projet conservé comme démonstration technique. Le projet Supabase lié n'est
plus actif : le code et la structure restent exploitables, mais l'application
en ligne ne répond plus. Les identifiants ne sont plus versionnés : `.env` est
ignoré et `.env.example` documente les variables attendues.

## À compléter avant l'oral

- [ ] Capture d'une conversation et de la liste d'amis.
- [ ] Capture des statuts en temps réel.
- [ ] Lien du dépôt et explication de la politique RLS.
