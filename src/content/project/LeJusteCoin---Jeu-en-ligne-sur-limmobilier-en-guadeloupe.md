---
title: LeJusteCoin - Jeu en ligne sur l'immobilier en guadeloupe
description: Mon premier jeu en ligne
technos:
  - Next.js
  - Typescript
  - Golang
isClient: false
isDraft: true
createdAt: 2024-10-02T05:51:01.222Z
updatedAt: 2024-10-08T06:02:50.960Z
---

# [LeJusteCoin](https://lejustecoin.marvinl.com)

Un nouveau projet perso qui part d'une frustration. Si vous avez suivi le projet "Jou san bèt a mil pat", mon appart bien que très bien lotti est une plaque tournante de ces insectes de malheur.\
Du coup même si ce n'est pas une recherche active pour le moment, je passe de temps à autre sur leboncoin pour voir l'état du marché immobilier (locatif) et visualiser à quoi pourrait ressembler notre prochaine maison. Oui, j'ai dit maison !

Le problème c'est que plus ça va et plus je suis tendu en passant en revue les annonces… je vois des biens a des prix hallucinants, des photos qui laissent a désirer, des frais d'agence complètement incohérents et je me demande comment c'est possible, pourquoi personne n'en parle et comment font les personnes qui sont réellement en recherche d'un lieu ou habiter ? 

L'idée d'un jeu qui ressemble au juste prix m'a traversé l'esprit et quelques temps après j'ai décidé de passer à l'action. On commence toujours simple, 2 photos, 4 prix aléatoires, gagné ou perdu. Ok, maintenant comment on fait ça ?

## Le Scraping 

Scrap-quoi ? Scraping, c'est en quelque sorte récupérer des données, gratter le code source des sites pour pouvoir faire ce que tu veux du contenu… On reparlera de la partie légalité etc un jour, le but ici n'est pas lucratif, juste fun.

J'ai d'abord cherché des librairies, spécifiques à Leboncoin, y en a quelques unes qui datent un peu et ne fonctionnent plus.\
 
