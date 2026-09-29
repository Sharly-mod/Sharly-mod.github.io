---
titre: "Conversa — messagerie temps réel avec Supabase"
resume: "Application de discussion en React et Supabase : authentification, liste d'amis, conversations et réception des messages en temps réel, déployée en ligne."
ordre: 4
annee: 2026
contexte: personnel
matieres: []
statut: prototype
role: "Conception et développement complet"
stack:
  - React 19
  - Vite
  - Supabase (PostgreSQL, Auth, Realtime)
  - Tailwind CSS v4
  - lucide-react
  - React OneSignal
competences:
  - "Composants React et hooks"
  - "Authentification Supabase"
  - "Écoute du temps réel (Realtime)"
  - "Vite et build de production"
  - "Notification push (OneSignal)"
  - "Intégration d'une API tierce sans clé payante"
misEnAvant: true
repo: https://github.com/Sharly-mod/Conversa
couleur: violet
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/Conversa
  - label: Documentation
    url: https://github.com/Sharly-mod/Conversa#readme
---

## Le contexte

Une messagerie temps réel est un exercice qui paraît simple et ne l'est pas :
l'échange de messages n'est que la partie visible. Ce qui compte, c'est la
persistance, l'identité des utilisateurs et la manière dont une connexion
reste ouverte sans jamais figer l'interface.

J'ai construit **Conversa** sur React et Supabase, pour m'entraîner sur
l'écosystème temps réel et sur un modèle de données relationnel exposé au
client.

## Les choix techniques

**Supabase plutôt qu'un backend maison.** J'avais besoin d'authentification, de
base relationnelle et de temps réel. Supabase apporte les trois, et son API
est du REST standard : c'est un Postgres, avec une couche d'API, pas un
boîte-noir. On peut interroger les données avec PostgREST, s'abonner aux
changements avec le canal Realtime.

**Vite.** Le serveur de développement est instantané et le build de
production est Out-of-the-box rapide. Le projet utilise d'ailleurs
`rolldown-vite`, le bundler écrit en Rust, à la place de Rollup.

**Tailwind v4 et lucide-react.** Tailwind pour la mise en page sans écrire de
CSS à la main, lucide pour les icônes plutôt que d'embarquer une police
d'icônes entière.

**OneSignal.** Ajouté pour les notifications push : c'est ce qui fait qu'une
application de messagerie sert vraiment quand elle est fermée.

## L'organisation du code

```
src/
├── components/    AddFriend, Chat, UserList, Layout
├── hooks/         useMessages (abonnement temps réel)
├── lib/           client Supabase
├── pages/         Auth
└── assets/
```

Le point intéressant est `useMessages` : c'est là que vit la logique
temps réel, isolée du composant qui affiche. Le composant `Chat` ne sait pas
comment les messages arrivent ; il sait seulement les afficher.

## Ce que j'ai appris

Le vrai sujet d'un projet temps réel n'est pas l'envoi, c'est **l'état**.
Quand un message part, l'application a un message optimiste. Quand il arrive
par le canal Realtime, elle a le même message, peut-être avec un identifiant
serveur. Il faut gérer le doublon, l'échec d'envoi, et la désynchronisation
entre deux onglets ouverts.

C'est aussi le projet qui m'a fait regarder de près la question des **clés
publiques**. La clé anonyme Supabase n'est pas un secret : Vite l'injecte dans
le bundle du navigateur, donc n'importe qui l'extrait. La seule chose qui
protège les données est donc le **Row Level Security**, activé dans la base.
Comprendre cela a changé ma façon de voir ce qu'on peut versionner.

## État

Projet conservé comme démonstration technique. Le projet Supabase lié n'est
plus actif : le code et la structure restent exploitables, mais l'application
en ligne ne répond plus.

Les identifiants ne sont plus versionnés : `.env` est ignoré, et
`.env.example` documente les variables attendues.
