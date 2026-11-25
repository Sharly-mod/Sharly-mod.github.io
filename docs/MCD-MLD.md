# Modèles de données — Fair’repair et GestioParc

Ces diagrammes servent de support à l’oral. Ils sont écrits en **Mermaid** :
GitHub et VS Code les affichent directement. Les scripts SQL complets sont dans
les dépôts des projets.

## Fair’repair — MCD simplifié

```mermaid
erDiagram
    UTILISATEURS ||--o{ SERVICES : propose
    UTILISATEURS ||--o{ RESERVATIONS : effectue
    SERVICES ||--o{ RESERVATIONS : concerne
    RESERVATIONS ||--o| AVIS : donne_lieu_a
    RESERVATIONS ||--o| PAIEMENTS : donne_lieu_a
    UTILISATEURS ||--o{ SIGNALEMENTS : emet
    SERVICES ||--o{ SIGNALEMENTS : peut_etre_cible
    AVIS ||--o{ SIGNALEMENTS : peut_etre_cible

    UTILISATEURS {
        int id PK
        string nom
        string prenom
        string email UK
        string mot_de_passe
        enum role "client, reparateur, admin"
        string ville
        decimal latitude
        decimal longitude
    }
    SERVICES {
        int id PK
        int user_id FK
        string titre
        text description
        decimal tarif
        int rayon
    }
    RESERVATIONS {
        int id PK
        int client_id FK
        int service_id FK
        datetime date_intervention
        enum statut "en_attente, confirmee, annulee, terminee"
        decimal montant
    }
    AVIS {
        int id PK
        int reservation_id FK "UNIQUE"
        int note
        text commentaire
    }
    PAIEMENTS {
        int id PK
        int reservation_id FK "UNIQUE"
        decimal montant
        enum statut "en_attente, paye, rembourse"
    }
    SIGNALEMENTS {
        int id PK
        int signalant_id FK
        int avis_id FK
        int service_id FK
        enum statut "en_attente, refuse, traite"
        int modere_par_id FK
    }
```

### Points à défendre

- `AVIS.reservation_id` et `PAIEMENTS.reservation_id` sont `UNIQUE` :
  **une réservation = un avis maximum, un paiement maximum**. La règle métier
  est portée par la base, pas seulement par le PHP.
- Toutes les tables sont en **InnoDB** avec clés étrangères.
- Les requêtes d’accès sont filtrées par `user_id` pour éviter les fuites entre
  comptes.

## GestioParc — MLD

```mermaid
erDiagram
    UTILISATEURS ||--o{ EQUIPEMENTS : possede
    UTILISATEURS ||--o{ TICKETS : declare
    EQUIPEMENTS ||--o{ TICKETS : concerne

    UTILISATEURS {
        int id_user PK
        string login UK
        string password_hash
        string nom
        string prenom
        enum role "Admin, Technicien, Utilisateur, Stagiaire"
        string service
    }
    EQUIPEMENTS {
        int id_equip PK
        string nom_equip
        string type_equip
        string adresse_ip
        enum statut_equip "Operationnel, En maintenance, Hors ligne"
        int id_user FK
    }
    TICKETS {
        int id_ticket PK
        string titre
        text description
        enum priorite "Basse, Moyenne, Haute"
        enum statut_ticket "Ouvert, En cours, Resolu, Ferme"
        datetime date_creation
        int id_user FK
        int id_equip FK
    }
```

### Points à défendre

- `EQUIPEMENTS.id_user` → `UTILISATEURS.id_user` avec `ON DELETE SET NULL` :
  supprimer un utilisateur ne doit pas supprimer le matériel.
- `TICKETS.id_equip` → `EQUIPEMENTS.id_equip` avec `ON DELETE SET NULL` :
  un ticket peut rester dans l’historique même si l’équipement est retiré.
- `TICKETS.id_user` → `UTILISATEURS.id_user` : le déclarant reste identifié.
- Le contrôle d’accès est appliqué dans les pages : un utilisateur ne voit que
  ses équipements et ses tickets ; l’admin voit tout.

## Ce que le jury peut demander

- La différence entre **MCD** (conceptuel, entités/relations) et **MLD**
  (tables, clés, types).
- Pourquoi une clé étrangère plutôt qu’un simple champ `user_id` sans contrainte.
- Ce qui se passe si on supprime un utilisateur qui a des tickets.
- Pourquoi une contrainte `UNIQUE` est plus fiable qu’un `if` en PHP.
- Où se trouve la sécurité : base, modèle, contrôleur, vue ?
