---
title: "La clef des îles"
description: "Back-office et script de génération de factures de gestion locative"
technos:
  - Nuxt.js
  - Node.js
  - Javascript
  - MongoDb
  - Quickbooks
  - VPS OVH
  - API Smoobu 
isClient: true
isDraft: true
updatedAt: 2024-02-12T20:00:00Z
createdAt: 2022-06-01T00:00:00Z
---

# La Clef des iles Conciergerie

## Problématique
Chaque mois, une personne de la petite équipe passe un temps fou, à lister les réservations sur la période pour chaque 
biens, calculer 
les tarifs à appliquer en fonction des contrats, des différences de commission entre les plateformes de location, 
créer, vérifier et envoyer les factures manuellement à chaque client (propriétaires). C'est beaucoup de temps 
"perdu" sur des 
tâches assez pénibles finalement.

## Solution
Automatiser ce qu'on peut pour réduire le temps passé sur la génération des factures. 

On a du faire un gros travail en amont pour standardiser au maximum les différents cas spécifiques. Isoler les 
variables et vérifier que les calculs sont bons dans tous les cas.
Ensuite il a fallu trouver un service de facturation qui permet un accès API, _(pas simple du tout !)_.

J'ai développé un back-office avec Nuxt.js permettant de configurer les paramètres généraux, lister les clients et 
leurs propriétés et déclencher l'envoie de factures. 

C'est ensuite une API Nodejs qui s'occupe d'interroger l'API de leur [logiciel de gestion de location](https://www.
smoobu.com/fr/), pour: 
- récupérer les réservations effectuées sur la période cible,
- calculer les montants à facturer par rapport aux différents cas 
- et ensuite créer une nouvelle facture dans Quickbooks.
                             
## Conclusion
Après une période de tests et une _presque_ adoption
Le service de facturation à décidé de fermer ses activités sur le territoire Français…

Ce fut plutôt compliqué de trouver un service équivalent autant en terme de fonctionnalités que de tarif et entre 
temps le client à été approché et à fini par opter par une solution spécialisée et clé en main qui est conçue 
pour leur secteur d'activité.
