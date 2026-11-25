# Captures d’écran des projets

Dépose ici les captures utilisées dans les fiches projets. Le site ne les
invente pas : tant que le tableau `captures` d’un projet est vide, la fiche
affiche les zones **« À compléter »**.

## Organisation conseillée

```text
public/captures/
├── fairrepair/
│   ├── dashboard-reparateur.webp
│   ├── carte-leaflet.webp
│   └── mcd-mld.png
├── stage-gestioparc/
│   ├── dashboard-admin.webp
│   ├── espace-utilisateur.webp
│   ├── ticket.webp
│   └── active-directory.webp
├── champihardcore/
│   ├── commande-champi.webp
│   └── discord.webp
├── conversa/
│   ├── conversation.webp
│   └── amis-statuts.webp
├── ongaku/
│   ├── accueil-pc.webp
│   ├── lecteur-paroles.webp
│   └── telechargements.webp
└── dayana/
    ├── accueil.png
    └── reseau.png
```

## Utilisation dans une fiche

Dans le frontmatter du projet (`src/content/projets/...md`) :

```yaml
captures:
  - captures/fairrepair/dashboard-reparateur.webp
  - captures/fairrepair/carte-leaflet.webp
```

Le chemin est relatif à `public/` et commence donc par `captures/`, pas par
`/public/`. Une fois les captures ajoutées, tu peux retirer les entrées
correspondantes de `aCompleter`.

## Bonnes pratiques

- Format WebP ou PNG, largeur maximale 1600 px.
- Anonymiser les noms, emails, adresses et identifiants visibles.
- Nommer les fichiers en minuscules avec des tirets.
- Vérifier le rendu sur mobile (les images sont responsives).
