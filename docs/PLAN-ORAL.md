# Guide d’oral E5 — 9 décembre

Ce document n’est pas public : il sert à préparer la soutenance et à vérifier
que tout est prêt la veille.

## 1. Avant l’oral : checklist

### Documents

**Examen blanc : aucun PDF n’est requis.** Le mode `examenBlanc = true` masque
les documents manquants et le tableau HTML en ligne suffit.

Pour l’épreuve finale seulement :

- [ ] `public/documents/tableau-synthese-e5.pdf` déposé.
- [ ] `public/documents/attestation-stage.pdf` déposé.
- [ ] `public/documents/convention-stage.pdf` déposé (si demandé).
- [ ] `public/documents/rapport-stage.pdf` déposé.
- [ ] `public/documents/cv-sharly-farag.pdf` déposé.
- [ ] Passer `examenBlanc` à `false` dans `src/data/site.ts`.
- [ ] Relancer `npm run build` et vérifier les badges « Disponible » sur `/e5/`.

### Captures

- [ ] Fair’repair : tableau de bord réparateur, carte Leaflet, MCD/MLD.
- [ ] Stage : dashboard admin, espace utilisateur, ticket, export CSV, AD/DHCP.
- [ ] Champi-Hardcore : commande `/champi`, notification Discord, extrait YAML.
- [ ] Conversa : conversation, demandes d’amis, statuts.
- [ ] Ongaku : accueil PC, écran mobile, lecteur avec paroles, téléchargements.
- [ ] Dayana : avant / après, page d’accueil mobile.

### Site

- [ ] `npm run check` sans erreur.
- [ ] `npm run build` sans erreur.
- [ ] Test sur mobile (390 px) : menu, filtres, tableau E5 scrollable.
- [ ] Test en mode clair et sombre.
- [ ] Vérifier les liens GitHub et le lien LinkedIn.
- [ ] Vérifier que le bouton « CV sur demande » ouvre bien l’email.

## 2. Plan de soutenance (10 minutes)

| Temps | Contenu | Message clé |
| --- | --- | --- |
| 0:00–0:45 | Présentation, parcours, objectif professionnel | BTS SIO SLAM, Ingetis, alternance/poursuite d’études |
| 0:45–3:00 | Fair’repair | MVC sans framework, MCD/MLD, PDO, RBAC, carte |
| 3:00–4:45 | Stage DydyITServices / TIS-INGÉ | besoin réel, GestioParc, CRUD, tests, AD/DHCP |
| 4:45–5:45 | Champi-Hardcore | POO Java, événements, LuckPerms, Discord, Tebex |
| 5:45–6:45 | Conversa | React, Supabase, RLS, temps réel |
| 6:45–7:45 | Tableau E5 | 4 projets × 6 blocs, preuves et tableau en ligne |
| 7:45–9:00 | Veille | supply chain + IA, méthode, impact concret |
| 9:00–10:00 | Bilan | difficultés, recul, ce que je ferais autrement |

## 3. Les quatre projets en une phrase

- **Fair’repair** : plateforme PHP/MySQL en MVC maison qui met en relation
  cyclistes et réparateurs, avec trois rôles, CRUD des prestations, réservation
  et carte Leaflet.
- **Stage GestioParc** : application PHP/MySQL de gestion de parc et de
  ticketing développée pendant cinq semaines chez DydyITServices / TIS-INGÉ
  pour le client DITS.
- **Champi-Hardcore** : plugin Paper en Java qui gère les résurrections
  mensuelles par permissions, les lignées et les intégrations Discord/Tebex.
- **Conversa** : messagerie React/Supabase avec authentification, amis, statuts
  et messages temps réel protégés par RLS.
- **Ongaku** (complémentaire, hors E5) : expérimentation IA de bout en bout,
  d’un script Python à une application Rust/Slint PC + Android + PWA.

## 4. Questions probables et réponses courtes

### « Pourquoi un MVC sans framework ? »

Pour comprendre le mécanisme : un routeur, des contrôleurs, des modèles DAO et
des vues. Le cahier des charges l’imposait. Aujourd’hui, je sais aussi dire les
limites : un routeur maison et de la duplication dans les contrôleurs coûtent
cher quand le projet grossit. La suite logique serait d’extraire des services
et d’ajouter des tests.

### « Requête préparée ou échappement : quelle différence ? »

Une requête préparée sépare la structure SQL des données : c’est la protection
contre l’injection SQL. `htmlspecialchars()` protège l’affichage contre le XSS.
Ce sont deux couches différentes ; il faut les deux.

### « Pourquoi désactiver l’émulation des requêtes préparées ? »

Avec `ATTR_EMULATE_PREPARES = false`, le pilote envoie réellement la requête et
les paramètres séparément à MySQL. Sinon, PDO peut reconstruire la chaîne côté
PHP, ce qui laisse réapparaître le risque d’injection.

### « Comment fonctionne le contrôle d’accès ? »

Le rôle est vérifié côté serveur sur chaque route et chaque action, pas
seulement dans le menu. Un bouton masqué ne protège rien : l’URL reste
accessible.

### « Pourquoi pas de barres de pourcentage dans les compétences ? »

Une jauge ne prouve rien. Une compétence se démontre par un projet, un extrait
de code, un test ou une explication. J’ai préféré relier chaque compétence à
une réalisation.

### « Qu’est-ce que le RLS chez Supabase ? »

Row Level Security : des politiques PostgreSQL qui filtrent les lignes selon
l’utilisateur authentifié. La clé anonyme Supabase est publique, donc la
sécurité ne peut pas reposer sur le client React : elle doit être dans la base.

### « Qu’est-ce que la supply chain logicielle ? »

C’est l’ensemble des maillons qui produisent et distribuent le logiciel :
dépendances, registres, scripts d’installation, CI/CD, artefacts. Une
application peut être bien codée et vulnérable si une dépendance ou un pipeline
est compromis. Les mesures : verrouiller les versions, auditer, limiter les
dépendances, protéger les secrets, signer les artefacts.

### « Que ferais-tu différemment sur Fair’repair ? »

Ajouter des tests automatisés, un vrai jeu de migrations SQL, et découper les
contrôleurs en services. J’ai aussi appris à documenter les règles métier dans
le schéma (contraintes `UNIQUE`, clés étrangères) plutôt que seulement dans le
code.

### « Quelle est la place de l’IA dans ton travail ? »

Un accélérateur, pas un substitut de compréhension. Je génère des squelettes ou
des tests, puis je relis, je teste et je dois pouvoir expliquer chaque ligne.
Je ne mets jamais de secret dans un prompt, et je vérifie les dépendances
suggérées.

### « Pourquoi Ongaku n’est pas dans le tableau E5 ? »

C’est un projet personnel d’expérimentation, pas une réalisation de stage ou
d’atelier professionnel. Il est complémentaire : il montre surtout le portage
Python → Rust/Slint, le build Android et la démarche de développement assisté
par IA, avec revue et tests manuels.

## 5. Ce qu’il reste à compléter

- [ ] Tuteur / référent et raison sociale exacte du stage.
- [ ] Captures de tous les projets.
- [ ] Fiche Dayana : dates, activité, URL, stack, captures avant/après.
- [ ] Lien LinkedIn réel.
- [ ] Liens GitHub des projets à vérifier.
- [ ] Ongaku : captures PC/mobile, lien APK/EXE ou dépôt.
- [ ] Documents PDF dans `public/documents/` (épreuve finale uniquement ;
      examen blanc : mode `examenBlanc` actif).

## 6. Dernier conseil

Le jury ne cherche pas un portfolio parfait. Il cherche un étudiant capable
d’expliquer **ce qu’il a fait**, **pourquoi** et **ce qu’il ferait autrement**.
Les zones « À compléter » doivent être remplies avant l’oral, mais les limites
assumées (MVC incomplète, projet Supabase arrêté) peuvent devenir un point fort
si elles sont expliquées avec recul.
