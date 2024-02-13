---
title: "Booke.fr"
description: "Site de réservation de portraits photo corporate"
technos:
  - Gatsby.js
  - Bootstrap
  - OpenCart
  - Laravel
  - Sellsy
  - Google Calendar API
  - AWS 
  - GraphQL
isClient: true
isDraft: false
updatedAt: 2024-02-12T19:54:00Z
createdAt: 2022-06-01T00:00:00Z
---
# Booké

Service de photographie corporate B2B et B2C. [Booké.fr](https://booke.fr) propose a ses clients des séances photo 
sur mesure, aussi bien chez le client B2B que directement dans ses Studios photo partenaires en France. 

 C'est mon premier projet avec l'agence Platypus en tant que Lead Developer. J'ai rejoint l'équipe de 
 développement (7 développeurs durant le projet) en cours de route et j'ai pu m'adapter rapidement au fonctionnement 
 du projet ainsi qu'à l'architecture déjà mise en place. 

## Architecture technique 

### Frontend
Côté Front, on utilise le framework Gatsby.js basé sur React qui permet une génération statique des pages pour une 
optimisation SEO et une rapidité de navigation. 

Pour l'intégration on utilise Bootstrap avec une couche de personnalisation en SCSS. 

Déployé sur AWS Amplify on arrive rapidement à avoir quelque chose de fluide et l'essentiel du chargement se fait 
durant le build (génération du site), déclenché par une Intégration continue (CI/CD) à chaque commit/push.
                                         
Le site est séparé en deux parties, d'abord l'accès public, ou les visiteurs peuvent consulter le contenu éditorial, 
sélectionner une prestation, la personnaliser et en fonction du profil passer sa commande (B2C), ou créer une 
demande afin d'être recontacté par l'équipe commerciale (B2B). 

Ensuite l'accès privé, ou les clients vont pouvoir consulter leurs projets (séance photo), sélectionner les photos à 
retoucher et télécharger les photos finales une fois traitées.
Là encore deux fonctionnements, le·a client·e B2B peut créer des accès pour chaque collaborateur·ice afin que chacun·e 
fasse 
individuellement la sélection des photos à traiter et le téléchargement des photos finales.

### Backend
Côté Backend on est aussi dans la complexité, le contenu (pages, articles, textes, images) est contribué 
sur un 
Wordpress. 

#### Wordpress
Les équipes du client ont déjà l'habitude de cette plateforme, ça évite les changements d'habitudes trop 
importants. Et on n'utilisera que le Back-office et l'API de 
Wordpress, des types de contenus sur mesure y sont mis en place afin de coller avec les besoins du site. 
Le tout sera consommé par Gatsby via son plugin Wordpress et accessible via une API GraphQL au sein du Front. _Nouveau 
langage 
pour moi_

#### Laravel
Ensuite on a le backend central basé sur Laravel _(framework PHP)_ qui via son API communiquera avec les différents 
services de l'architecture
#### OpenCart
OpenCart pour la partie e-commerce pure (authentification, paniers, commandes, paiements…).
Des modules et de la configuration seront nécessaires pour répondre aux besoins du projet.

#### Sellsy
Sellsy c'est le CRM du client (Booké). On va venir y créer des prospects et ensuite l'équipe commerciale pourra 
créer le projet dans leur outil de suivi.

#### Amazon Webservices
Ce projet sera mon initiation aux technologies AWS. 
D'abord les S3 où seront stockés les fichiers des projets (RAW, Jpegs bruts, 
Photos 
sélectionnées, Photos 
retouchées)
Les studios/photographes et retoucheurs y ont accès via FTP.
Le backend répond aux évènements des différents services et va venir, créer des dossiers projet, 
déplacer/renommer des 
fichiers en fonction de leur état de sélection.

On a aussi des fonctions Lambda écrites en Javascript _(découverte du serverless pour moi)_, qui vont créer des 
versions d'images allégées pour le Web, ajouter des Watermark pour la protection des photos…

### Expérience
C'est la première fois où je travaille en full Remote, avec une équipe éparpillée entre la France, la Guadeloupe, 
la Martinique, le Canada, et la Tunisie. Sur un projet qui allie deux de mes passions (le web et la photo). Ça m'a 
permis d'apprendre pas mal de choses, au niveau méthodologies et travail en équipe mais aussi techniquement, 
travailler sur un projet à envergure nationale avec un niveau technique assez poussé, c'est enivrant et ça donne des 
idées pour la suite de mes projets

### Durée de la mission 
1 an et demi _(?)_


