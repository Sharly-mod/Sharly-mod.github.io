---
titre: "Stage développeur — DydyITServices / TIS-INGÉ (2026)"
resume: "Stage de 1re année de 5 semaines chez DydyITServices (projet TIS-INGÉ pour le client DITS) : application PHP/MySQL de gestion de parc et de ticketing, avec un socle Active Directory / DHCP en amont."
ordre: 2
annee: 2026
contexte: stage
selectionE5: true
matieres:
  - Analyse et cahier des charges
  - Modélisation (UML, MLD)
  - PHP / MySQL / PDO
  - Sécurité applicative
  - Administration Windows Server
statut: termine
role: "Développeur stagiaire SLAM : analyse, modélisation, développement, tests et documentation"
stack:
  - PHP 8
  - MySQL / MariaDB
  - PDO
  - HTML / CSS / JavaScript
  - Apache
  - Windows Server 2022 / AD DS
  - Debian 12
competences:
  - "Développement d'une application web de bout en bout"
  - "Modélisation d'une base relationnelle (MLD, clés étrangères)"
  - "Authentification, sessions et contrôle d'accès par rôles"
  - "Requêtes préparées PDO et hachage bcrypt"
  - "Supervision simple du parc par test de ports TCP"
  - "Rédaction du cahier des charges, des tests et du rapport"
besoins:
  - "Authentifier les utilisateurs et appliquer les permissions de quatre profils : Admin, Technicien, Utilisateur, Stagiaire."
  - "Centraliser l'inventaire des équipements et leur affectation à un utilisateur."
  - "Permettre à un utilisateur de déclarer un incident sur son matériel et de suivre ses tickets."
  - "Donner aux administrateurs et techniciens une vue globale des tickets et la possibilité de faire évoluer leur statut."
  - "Mettre en place le socle réseau nécessaire : domaine dits.com, DHCP et intégration de postes Windows et Debian."
choixTechniques:
  - "PHP natif, sans framework, avec une organisation en couches inspirée du MVC : configuration, traitement, vues."
  - "MySQL/MariaDB avec le moteur InnoDB et des clés étrangères entre UTILISATEURS, EQUIPEMENTS et TICKETS."
  - "PDO avec requêtes préparées et émulation désactivée (ATTR_EMULATE_PREPARES = false)."
  - "Sessions PHP avec régénération d'identifiant et contrôle du rôle sur chaque page protégée."
  - "Scan de disponibilité par sockets TCP : port 135 pour les machines Windows, port 22 pour les machines Linux, avec un timeout court."
  - "Export CSV des tickets pour l'administration, sans dépendance externe."
fonctionnalites:
  - "Connexion, déconnexion et redirection automatique vers le tableau de bord correspondant au rôle."
  - "Tableau de bord administrateur : inventaire du parc, tous les tickets, changement de statut, suppression et export CSV."
  - "Espace utilisateur : matériel affecté, statut réseau, déclaration d'incident et suivi de ses propres tickets."
  - "Gestion du parc : ajout, consultation, modification et suppression des équipements (admin)."
  - "Workflow des tickets : Ouvert, En cours, Résolu, avec priorité Basse, Moyenne ou Haute."
  - "Journalisation des actions d'administration dans un fichier de logs."
crud:
  - "Utilisateurs : lecture, import depuis l'Active Directory, attribution d'un rôle."
  - "Équipements : créer, lire, modifier et supprimer (admin)."
  - "Tickets : créer (utilisateur), lire selon le rôle, modifier le statut (admin/technicien), supprimer un ticket résolu (admin)."
securite:
  - "Mots de passe hachés avec password_hash() en bcrypt ; vérification avec password_verify()."
  - "Toutes les requêtes SQL passent par PDO et des requêtes préparées."
  - "Échappement des données affichées avec htmlspecialchars() contre le XSS."
  - "Régénération de session après connexion et expiration après 30 minutes d'inactivité."
  - "Contrôle d'accès par rôle sur chaque page et chaque action critique."
  - "Actions critiques protégées et journalisées côté administration."
competencesBts: [C1, C2, C4, C5, C6]
captures:
  - captures/stage-gestioparc/mld.png
  - captures/stage-gestioparc/cas-utilisation.png
  - captures/stage-gestioparc/dashboard-admin.png
  - captures/stage-gestioparc/dashboard-utilisateur.png
  - captures/stage-gestioparc/active-directory.png
  - captures/stage-gestioparc/dhcp.png
aCompleter:
  - "Nom du tuteur / référent de stage et raison sociale complète de l'entreprise."
  - "Missions précises validées par le tuteur (compléter ou corriger la liste ci-dessous)."
  - "Lien du dépôt Git privé ou archive ZIP du code à fournir au jury."
misEnAvant: true
couleur: cyan
---

## Le contexte

J'ai effectué mon stage de première année — cinq semaines — chez
**DydyITServices**, dans le cadre du projet **TIS-INGÉ** pour le compte du
client **DITS**. Le stage s'est déroulé du **29 juin au 31 juillet 2026**. Le
tuteur / référent est à préciser : `[À COMPLÉTER : nom et fonction]`.

La mission comportait deux phases :

1. **Un socle infrastructure commun** : un contrôleur de domaine Windows Server
   2022 (AD DS + DHCP), huit utilisateurs du domaine `dits.com`, un poste client
   Windows 11 et un poste client Debian 12 intégrés au domaine.
2. **Une application SLAM** : **GestioParc**, une application web de gestion de
   parc informatique et de ticketing, développée en PHP et MySQL.

C'est la deuxième phase qui constitue le cœur de ma fiche E5, mais la première
m'a permis de comprendre l'environnement dans lequel l'application allait
vivre : des utilisateurs réels, des machines, des droits et des incidents.

> **À compléter avant l'oral :** nom du tuteur / référent, raison sociale
> exacte et lien du dépôt privé ou archive du code. Les captures de
> l'application, les diagrammes et les preuves d'infrastructure sont déjà
> intégrés.

## Les missions

- Analyser le cahier des charges et reformuler les besoins du client DITS.
- Réaliser le diagramme de cas d’utilisation et le MLD de l’application.
- Développer l’application GestioParc en PHP/MySQL avec PDO.
- Mettre en place l’authentification, les sessions et le contrôle d’accès par rôles.
- Tester les scénarios par profil et documenter les résultats.
- Configurer le socle Active Directory / DHCP et intégrer les postes clients.
- Rédiger le rapport de stage et préparer les captures de recette.

> `[À COMPLÉTER : missions précises validées par le tuteur, si elles diffèrent
> de cette liste.]`

## Phase 1 — le socle infrastructure

Le réseau a été simulé sous VMware avec un plan d'adressage simple :

| Machine | Rôle | Adresse |
| --- | --- | --- |
| SRV-DC01 | Contrôleur de domaine, AD DS, DHCP | 172.16.0.10 |
| WIN-CLI-01 | Poste client Windows 11 | 172.16.0.53 |
| DEB-CLI-01 | Poste client Debian 12 | 172.16.0.30 |

Les huit utilisateurs sont répartis dans des unités d'organisation
(Informatique, RH, Commercial, Juridique, Comptabilité) et dans des groupes de
sécurité. Le serveur DHCP distribue la plage `172.16.0.50` à `172.16.0.100`.
Le poste Debian a été joint au domaine avec `realmd` et `sssd`.

Cette partie m'a surtout appris à **prouver** une configuration : une machine
qui démarre ne veut pas dire qu'elle est intégrée, et une adresse IP correcte ne
veut pas dire que le DNS fonctionne. Les captures et les tests de connectivité
font partie du livrable.

## Phase 2 — GestioParc

### Le besoin

Le client DITS voulait une application unique pour suivre son parc et traiter
les demandes d'assistance. Le cahier des charges distingue quatre profils :

| Fonctionnalité | Admin | Technicien | Utilisateur | Stagiaire |
| --- | --- | --- | --- | --- |
| Gérer les équipements (CRUD) | Oui | Non | Non | Non |
| Voir tous les équipements | Oui | Oui | Non | Non |
| Voir ses équipements | Oui | Oui | Oui | Oui |
| Créer un ticket | Oui | Oui | Oui | Oui |
| Voir tous les tickets | Oui | Oui | Non | Non |
| Modifier le statut d'un ticket | Oui | Oui | Non | Non |
| Export CSV des tickets | Oui | Oui | Non | Non |

### Les fonctionnalités développées

- **Authentification** : formulaire de connexion, vérification du hash bcrypt,
  session régénérée et redirection selon le rôle.
- **Espace administrateur** : inventaire complet, gestion des équipements,
  visualisation de tous les tickets, modification du statut, suppression d'un
  ticket résolu et export CSV.
- **Espace utilisateur** : uniquement son matériel et ses propres tickets, avec
  un formulaire de déclaration d'incident.
- **Supervision** : test de disponibilité des machines par ouverture d'une
  socket TCP sur le port 135 (Windows) ou 22 (Linux), avec un timeout de 0,5 s
  pour ne pas bloquer l'affichage.
- **Traçabilité** : les actions d'administration sont écrites dans un journal.

## Le modèle de données

Le MLD tient en trois tables, avec des clés étrangères et le moteur InnoDB :

```text
UTILISATEURS (id_user, login, password_hash, nom, prenom, role, service)
      │
      ├──< EQUIPEMENTS (id_equip, nom_equip, type_equip, adresse_ip,
      │                 statut_equip, id_user → UTILISATEURS.id_user)
      │
      └──< TICKETS (id_ticket, titre, description, priorite, statut_ticket,
                    date_creation, id_user → UTILISATEURS.id_user,
                    id_equip → EQUIPEMENTS.id_equip)
```

Les contraintes `ON DELETE SET NULL` et `ON DELETE CASCADE` ont été choisies
selon le sens métier : supprimer un utilisateur ne doit pas supprimer
l'historique des tickets, mais un ticket doit rester rattaché à un déclarant
identifié. Ce sont des décisions de modèle, pas des détails de code.

## Les choix techniques

**PHP natif plutôt qu'un framework.** Le cahier des charges imposait de
comprendre le MVC sans Symfony ou Laravel. L'application est organisée en
couches : `config.php` pour la connexion PDO, des pages de traitement pour
l'authentification et les actions, des vues HTML pour l'affichage. Avec le
recul, je sais que cette organisation reste **une MVC incomplète** : il manque
un routeur et de vrais contrôleurs séparés. C'est la première amélioration que
je ferais aujourd'hui.

**PDO et requêtes préparées.** Toutes les requêtes utilisent des paramètres
nommés. L'émulation des requêtes préparées est désactivée, ce qui garantit que
le pilote envoie bien la requête et les paramètres séparément à MySQL.

**Les sessions plutôt qu'un JWT.** Le contexte est une application interne
rendue côté serveur, sans API mobile. La session PHP est le choix le plus
simple et le plus lisible : un identifiant de session, des données de rôle, et
un contrôle à chaque page.

**Le scan réseau.** Le statut « en ligne / hors ligne » est calculé à
l'affichage avec `fsockopen`. C'est volontairement simple : pas d'agent à
installer, pas de dépendance. La limite est connue : un port fermé ne signifie
pas forcément que la machine est éteinte, et un scan trop long ralentirait la
page. D'où le timeout court et la limitation aux ports RPC/SSH.

## La sécurité

| Risque | Mesure mise en place |
| --- | --- |
| Injection SQL | PDO + requêtes préparées, émulation désactivée |
| Vol de mots de passe | `password_hash()` / `password_verify()`, bcrypt |
| XSS | `htmlspecialchars()` sur toutes les sorties |
| Accès non autorisé | Vérification du rôle sur chaque page et chaque action |
| Session volée | `session_regenerate_id()` après connexion, cookie HttpOnly |
| Session oubliée | Expiration après 30 minutes d'inactivité |
| Actions critiques | Protection des formulaires et journalisation admin |

La leçon principale : la sécurité n'est pas une page « paramètres ». Elle est
présente dans la requête SQL, dans l'affichage, dans la session et dans le
contrôle de rôle. Si l'une de ces couches manque, le reste ne suffit pas.

## Les tests

| Test | Attendu | Résultat |
| --- | --- | --- |
| Connexion avec un compte valide | Accès au dashboard du rôle | OK |
| Mauvais mot de passe | Message d'erreur, pas de session | OK |
| Accès direct à une page admin en tant qu'utilisateur | Redirection | OK |
| Déclaration d'un ticket | Ticket visible dans l'espace utilisateur | OK |
| Modification du statut par un admin | Statut mis à jour | OK |
| Injection SQL dans un champ | Requête neutralisée | OK |

Ces tests sont aussi une preuve pour le jury : ils montrent que le contrôle
d'accès ne repose pas seulement sur l'affichage conditionnel des boutons.

## Les difficultés rencontrées

- **La synchronisation avec l'Active Directory.** Les utilisateurs du domaine
  devaient exister dans la base de l'application avec le bon rôle. La solution
  retenue est un script SQL d'import qui hash les mots de passe avec bcrypt.
  Une vraie synchronisation LDAP serait la suite logique.
- **Les permissions.** Au début, les boutons étaient masqués côté HTML, mais
  une requête directe restait possible. J'ai ajouté un contrôle serveur sur
  chaque action. C'est la différence entre cacher et interdire.
- **Le scan réseau.** `fsockopen` peut bloquer si l'hôte ne répond pas. Le
  timeout de 0,5 s et la limitation aux ports utiles ont permis de garder un
  tableau de bord utilisable.
- **L'intégration Debian au domaine.** Le DNS pointait vers la passerelle VMware
  au lieu du contrôleur de domaine. La correction de `/etc/resolv.conf` et de la
  route par défaut a débloqué la jonction.

## Ce que j'en retiens

Ce stage m'a fait passer d'un projet « qui marche sur ma machine » à un projet
qui doit vivre dans un environnement : des utilisateurs du domaine, des
machines qui tombent, des droits à vérifier et des preuves à fournir.

J'ai aussi appris à présenter un choix technique sans le survendre. Dire
« j'ai fait une MVC incomplète, voici pourquoi et voici ce que je changerais »
est plus utile devant un jury que prétendre avoir écrit un framework. La suite
logique du projet serait : un routeur, des contrôleurs séparés, des tests
automatisés et une synchronisation LDAP propre.

## À compléter avant l'oral

- [ ] Lien du dépôt Git privé ou archive ZIP du code.
- [ ] Nom du tuteur / référent et raison sociale complète de l'entreprise.
- [ ] Missions validées par le tuteur, si elles diffèrent de la liste.
