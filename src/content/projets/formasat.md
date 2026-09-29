---
titre: "FormaSat — satisfaction des stagiaires"
resume: "Application PHP de collecte des évaluations de satisfaction des stagiaires d'un BTS, avec back-office administrateur et statistiques par module."
ordre: 7
annee: 2025
contexte: cours
matieres:
  - PHP/MySQL
  - Administration de base de données
  - Sécurité applicative
statut: en-cours
role: "Développement complet, en travail dirigé"
stack:
  - PHP
  - MySQL
  - HTML
competences:
  - "Formulaires et traitement PHP"
  - "Hachage des mots de passe"
  - "Sessions et authentification"
  - "Agrégation de statistiques"
misEnAvant: false
repo: https://github.com/Sharly-mod/FormaSat
couleur: vert
liens:
  - label: Dépôt GitHub
    url: https://github.com/Sharly-mod/FormaSat
  - label: Documentation
    url: https://github.com/Sharly-mod/FormaSat#readme
---

## Le contexte

**FormaSat** est un travail pratique de BTS SIO quiasked de faire évoluer une
application déjà existante. Le point de départ : une v1 qui fonctionne déjà —
un stagiaire crée son compte, se connecte, évalue un module via un formulaire,
et un administrateur consulte les statistiques de satisfaction.

C'est le cadrage qui rend le projet intéressant : la difficulté n'est pas de
créer, mais de **corriger les limites** d'un code qu'on n'a pas écrit.

## Les limites de la v1

Le cahier des charges du prof liste précisément ce qui coinçait :

- les stagiaires et les professeurs sont insérés **manuellement** en base, par
  des `INSERT` bruts ;
- aucun lien entre une promotion et un formateur ;
- les modules sont créés à la main, sans être rattachés à qui les évalue.

Autrement dit, l'administration n'existe pas vraiment : on ne peut créer ni
promotion, ni_module, ni affecter un formateur.

## L'administrateur, cœur du sujet

La v2 demande que l'administration puisse créer les promotions, inscrire les
étudiants dans une promo, ajouter les formateurs, et créer les modules en les
assignant à un formateur **et** à une promotion.

Cela change la forme du modèle de données. On ne peut plus se contenter d'une
table `module` : il faut une table de promotion, une table de formateur, et une
association entre les trois. C'est le moment où la modélisation devient le
travail principal, et où l'on comprend qu'une base qui marche peut
nécessiter d'être remaniée.

## Le modèle de données

```
étudiant   (id, nom, email, mot_de_passe, promo_id)      ← v2 : promo_id
module     (id, libelle, formateur_id, promo_id)          ← v2 : les deux
formateur  (id, nom, email)
promotion  (id, libelle)                                  ← v2 : nouvelle table
évaluation (id, etudiant_id, module_id, note, ...)
```

La table `évaluation` porte les notes du formulaire. Le formulaire ne propose
qu'une seule évaluation par module et par stagiaire : c'est une règle
métier, pas une contrainte technique.

## Un point à corriger

J'ai relevé une chose que je documentais mal : le traitement de connexion
construit sa requête SQL en concaténant directement les valeurs reçues du
formulaire. C'est une injection SQL, quel que soit le nombre de filtres
appliqués en aval. La correction consiste à préparer la requête :

```php
$stmt = $conn->prepare('SELECT * FROM etudiant WHERE email = ? AND mot_de_passe = ?');
$stmt->bind_param('ss', $email, $hash);
$stmt->execute();
```

C'est le genre de détail qui ne se voit pas dans une démonstration, mais qui
fait la différence entre une application de cours et une application
utilisable.

## État

Projet en cours d'évolution. Le code du dépôt correspond à un état
intermédiaire : la v1 fonctionne, la v2 est en construction.
