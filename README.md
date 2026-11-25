# Portfolio — Sharly Farag · BTS SIO SLAM

Portfolio préparé pour l’**épreuve E5 (parcours de professionnalisation)** du
BTS SIO option SLAM. Il présente quatre réalisations, les compétences
techniques, le tableau de synthèse et une veille technologique sur la sécurité
de la chaîne logistique logicielle et l’impact des outils d’IA.

Site statique généré avec **Astro**, déployé sur **GitHub Pages**.

## Pourquoi Astro et pas PHP ?

Le portfolio est un site de présentation : il n’a pas besoin d’une base de
données ni d’un back-office pour être consulté. Astro permet de garder :

- un **contenu séparé de l’affichage** (Markdown + JSON dans `src/content/`,
  données de compétences et documents dans `src/data/`) ;
- un site **rapide et sans serveur**, donc sans surface d’attaque inutile ;
- un déploiement automatique sur GitHub Pages.

Les compétences PHP/MySQL/MVC sont démontrées dans les **projets présentés**
(Fair’repair, GestioParc), pas dans le portfolio lui-même. C’est un choix
assumé, explicable à l’oral.

## Stack

| Élément | Technologie |
| --- | --- |
| Générateur | Astro 7 |
| Langage | TypeScript |
| Contenu | Content collections Markdown / JSON |
| Styles | CSS maison (aucun framework) |
| Déploiement | GitHub Pages + GitHub Actions |
| Veille | Flux RSS, synthèses Markdown |

## Commandes

| Commande | Action |
| --- | --- |
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de développement sur `localhost:4321` |
| `npm run build` | Construit le site dans `dist/` |
| `npm run preview` | Prévisualise le build local |
| `npm run check` | Vérifie les types et les contenus Astro |
| `npm run veille` | Collecte les flux RSS de l’ancienne veille (archive) |

Avant chaque commit : `npm run check` puis `npm run build`.

## Structure

```text
src/
├── components/        Cartes projets, compétences, documents, tableau E5, navigation
├── content/
│   ├── projets/       Une fiche Markdown par réalisation
│   ├── veille-e5/     Les 3 synthèses de veille présentées à l’oral
│   ├── notes/         Ancienne veille IA & jeu vidéo (archive)
│   └── veille/        Flux RSS collecté (archive)
├── data/              Identité, compétences, parcours, documents, référentiel BTS
├── layouts/           Layout principal
├── lib/               Helpers (URLs, dates, vérification des documents)
├── pages/             Accueil, réalisations, E5, veille, à propos
└── styles/            Design system CSS
public/
├── documents/         PDF à déposer avant l’oral (non versionnés)
├── favicon.svg
└── veille.opml
docs/
├── PLAN-ORAL.md       Plan de soutenance et questions probables
└── MCD-MLD.md         Modèles de données des projets
```

## Les quatre réalisations E5

| Projet | Catégorie | Compétences principales |
| --- | --- | --- |
| Fair’repair | Atelier Pro | PHP MVC, MySQL, PDO, RBAC, Leaflet |
| Stage DydyITServices / TIS-INGÉ | Stage | PHP/MySQL, helpdesk, CRUD, sécurité, AD/DHCP |
| Champi-Hardcore | Projet Personnel | Java, Paper/Bukkit, LuckPerms, Discord, Tebex |
| Conversa | Projet Personnel | React, Supabase, PostgreSQL, RLS, temps réel |

La refonte du site de **Dayana** (deuxième stage, en cours) et **Ongaku** sont
conservées en réalisations complémentaires, hors tableau E5 :

- **Dayana** : refonte de site, stage en cours.
- **Ongaku** : expérimentation de développement assisté par IA, d’un script
  Python à une application Rust/Slint PC + Android + PWA.

## Ajouter ou modifier un projet

1. Copie `src/content/projets/_modele.md` vers
   `src/content/projets/mon-projet.md`.
2. Remplis le frontmatter. Les champs importants pour l’E5 :
   - `contexte` : `atelier`, `stage`, `personnel`, `cours` ou
     `professionnel` ;
   - `selectionE5` : `true` pour l’afficher dans la grille principale et le
     tableau de synthèse ;
   - `besoins`, `choixTechniques`, `fonctionnalites`, `crud`, `securite` :
     listes affichées dans la fiche ;
   - `competencesBts` : codes `C1` à `C6` ;
   - `captures` : chemins depuis `public/`, par exemple
     `captures/fairrepair/dashboard.webp` ;
   - `aCompleter` : liste des preuves restant à ajouter.
3. Écris le corps Markdown (retour d’expérience, difficultés, recul).
4. Lance `npm run check` et `npm run build`.

## Mode examen blanc

`src/data/site.ts` contient `examenBlanc = true`. Dans ce mode :

- aucun PDF n’est réclamé dans l’interface ;
- les badges « À déposer » et les chemins de fichiers manquants sont masqués ;
- le tableau de synthèse est consultable directement en ligne sur `/e5/#tableau` ;
- le bouton CV devient « CV sur demande » (lien `mailto:`).

C’est le mode à garder pour l’examen blanc. Pour l’épreuve finale, lorsque les
documents existent, dépose-les dans `public/documents/` puis passe
`examenBlanc` à `false`. Les cartes de téléchargement réapparaîtront.

## Documents E5 (épreuve finale)

Les PDF ne sont pas fournis dans ce dépôt. Dépose-les dans
`public/documents/` avec les noms attendus (voir
`public/documents/README.md`) :

- `tableau-synthese-e5.pdf`
- `attestation-stage.pdf`
- `convention-stage.pdf`
- `rapport-stage.pdf`
- `cv-sharly-farag.pdf`

Le site vérifie leur présence au build. Tant qu’un fichier manque, la carte
affiche **« À déposer »** au lieu d’un lien mort. Relance le build après ajout.
Si tu commits les PDF, ils seront publiés tels quels sur GitHub Pages :
vérifie qu’ils ne contiennent pas de données personnelles inutiles.

## Veille technologique

La veille principale est dans `src/content/veille-e5/` (3 synthèses) :

1. OWASP Top 10:2025 et la chaîne logistique logicielle.
2. Dépendances npm compromises et propagation.
3. IA générative et code : gagner du temps sans perdre la maîtrise.

Chaque fiche contient une source, un résumé, un impact concret et une analyse.
L’ancienne veille IA & jeu vidéo reste accessible sur `/veille/archives/` ;
elle n’est plus le sujet principal.

## Sécurité et qualité

- Aucun cookie, aucun traceur, aucune police externe.
- Aucun secret dans le dépôt (`.env` ignoré).
- Liens internes vérifiés par `.github/check-links.mjs` avant déploiement.
- Contenu et affichage séparés : les données sont dans `src/content/` et
  `src/data/`, les composants ne contiennent pas de contenu métier.
- Accessibilité : lien d’évitement, navigation clavier, `aria-current`,
  contrastes, `prefers-reduced-motion`.

## Déploiement

Le workflow `.github/workflows/deploy.yml` construit et publie le site sur
GitHub Pages à chaque push sur `main`. Aucun secret n’est nécessaire.

```bash
git add .
git commit -m "Refonte du portfolio pour l'épreuve E5"
git push origin main
```

Le site est publié sur `https://sharly-mod.github.io`.

## À compléter avant l’oral du 9 décembre

Voir la liste détaillée dans [`docs/PLAN-ORAL.md`](docs/PLAN-ORAL.md) et les
badges **« À compléter »** sur les fiches projets. Les principaux points :

- [ ] Examen blanc : rien à déposer, le mode `examenBlanc` est actif.
- [ ] Épreuve finale : déposer les 5 PDF dans `public/documents/` et passer
      `examenBlanc` à `false`.
- [ ] Renseigner le tuteur et la raison sociale du stage dans
      `stage-tis-inge-2026.md`.
- [ ] Ajouter les captures d’écran des 4 projets.
- [ ] Compléter la fiche Dayana (dates, activité, URL, stack).
- [ ] Remplacer le lien LinkedIn placeholder dans `src/data/site.ts`.
- [ ] Vérifier les liens GitHub des projets.
- [ ] Tester le site sur mobile et en mode clair/sombre.
