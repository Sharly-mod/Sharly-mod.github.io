---
titre: "Frood — le tournoi qui choisit où manger"
resume: "Application web/PWA de sélection de restaurants par budget et distance, arbitrée par un tournoi à élimination directe. Supabase, Stripe, données OpenStreetMap, déploiement mobile natif."
ordre: 1
annee: 2026
contexte: personnel
matieres: []
statut: production
role: "Conception, développement front et back, monétisation, publication"
stack:
  - Next.js 16
  - TypeScript
  - React 19
  - Tailwind CSS v4
  - shadcn/ui
  - Supabase
  - Stripe
  - PWA
  - Capacitor
  - OpenStreetMap / Overpass
competences:
  - Architecture App Router et rendu serveur
  - Modélisation PostgreSQL et Row Level Security
  - API Stripe (checkout, webhooks, portail)
  - PWA, service worker et offline
  - Publication mobile (Android / iOS)
  - Intégration d'API tierces sans clé payante
misEnAvant: true
repo: https://github.com/Sharly-mod/frood
couleur: violet
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/frood
  - label: Documentation
    url: https://github.com/Sharly-mod/frood#readme
---

## Le problème

Choisir un restaurant au hasard prend toujours la même forme : on ouvre une carte,
on filtre, on hésite, on referme l'application sans avoir décidé. La friction n'est
pas le manque d'informations, c'est l'**arbitrage** : il faut en fait *trancher* entre
des options déjà correctes.

Frood déplace l'arbitrage dans le jeu. On donne un budget, une distance et une envie
de cuisine ; l'application sort une liste de vrais restaurants, puis un **tournoi à
élimination directe** impose une décision à chaque match : quarts de finale, demies,
finale. Le gagnant est un restaurant, pas un « peut-être ».

## Ce que j'ai fait

J'ai fait le projet seul, de la modélisation des données jusqu'au bundle Android.

- **Le parcours de sélection et le tournoi** — l'élimination directe complète
  (bracket Quarts → Demi → Finale) avec la règle qu'un tournoi à moins de deux
  participants est refusé : l'état vide est traité comme une erreur métier, pas
  comme un écran bloqué.
- **La couche de données** — restaurants, favoris, historique, abonnements dans
  Supabase, avec des politiques **Row Level Security** écrites en SQL : un utilisateur
  ne voit que ses lignes, les administrateurs voient tout.
- **La monétisation** — abonnement Stripe (mensuel et annuel), trois points
  d'intégration : création de session de paiement, webhook de synchronisation,
  portail d'autogestion. Tout est centralisé dans un seul fichier de *feature flags*
  pour qu'ajouter un accès Premium se fasse à un seul endroit.
- **Les données réelles, sans facture** — le point technique dont je suis le plus
  fier. Les restaurants viennent d'**OpenStreetMap** via l'API Overpass, appelée
  uniquement depuis une route serveur (rien n'est exposé au client). La cuisine est
  déduite des tags OSM, le prix est estimé par type de cuisine, la distance est
  calculée depuis la géolocalisation. Aucune clé, aucun quota, aucun coût. Si le
  fournisseur est indisponible, un jeu de données de secours prend le relais
  silencieusement.
- **La PWA et le mobile** — manifest + service worker en *stale-while-revalidate*,
  avec une règle explicite : les appels `/api/` ne sont jamais mis en cache. Le même
  code est empaqueté pour l'App Store et le Play Store via Capacitor.
- **Le panneau d'administration** — un compte administrateur peut accorder un
  Premium à vie, indépendamment des abonnements Stripe, et ces grants ne sont
  jamais annulés par un webhook.

## Le point technique : afficher de vraies données pour zéro euro

Le choix d'architecture le plus important du projet est d'avoir refusé la
dépendance payante. Une API de restaurants coûte facilement plusieurs centaines
d'euros par mois, ce qui rend l'application invivable en free-to-play.

La réponse tient en une route serveur, `app/api/restaurants` : elle interroge
Overpass, puis **normalise** la réponse dans un modèle interne unique — hachage
stable pour la déduplication, cuisine dérivée des tags, prix estimé, note
dérivée. Les données mock et les données réelles produisent le même type, donc
l'interface ne sait pas — et n'a pas besoin de savoir — d'où viennent les lignes.
C'est ce qui rend le remplacement de fournisseur possible sans toucher au front.

## Les difficultés

- **Le premier lancement ne doit rien demander à l'utilisateur.** Pas de compte,
  pas de clé API, pas de configuration : l'app doit fonctionner immédiatement
  après `npm install`. D'où le repli silencieux sur les données mock, et le mode
  simulation de l'abonnement quand Stripe n'est pas configuré.
- **La cohérence entre l'interface et l'abonnement.** Le webhook Stripe est la
  seule source de vérité, et il arrive après la redirection. J'ai dû gérer trois
  états distincts — paiement confirmé mais webhook pas encore reçu, reçu, refusé —
  sans jamais afficher un abonnement paid avant que la base soit à jour.
- **Le chemin critique du `sw.js`.** Un service worker mal mis en cache sert
  l'ancienne version de l'application indéfiniment. Il a fallu forcer
  `no-cache, no-store, must-revalidate` sur la route du service worker lui-même.

## Ce que j'ai appris

Que la valeur d'un produit grand public tient souvent à ce qu'il **refuse** de
demander : ici, zéro compte, zéro clé, zéro euro d'infrastructure. Cette contrainte,
posée dès le début, a orienté toutes les décisions techniques — où faire tourner la
normalisation, comment typer les données, comment gérer l'échec silencieux.

J'ai aussi compris la différence entre une fonctionnalité et une fonctionnalité
*vendable* : c'est le *feature flag* qui transforme la première en la seconde, et
centraliser cette logique dans un seul fichier est ce qui rend le modèle économique
lisible dans le code.
