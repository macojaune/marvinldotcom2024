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
updatedAt: 2024-10-08T06:39:26.935Z
---

# [LeJusteCoin](https://lejustecoin.marvinl.com)

Un nouveau projet perso qui part d'une frustration. Si vous avez suivi le projet "Jou san bèt a mil pat", mon appart bien que très bien lotti est une plaque tournante de ces insectes de malheur.\
Du coup même si ce n'est pas une recherche active pour le moment, je passe de temps à autre sur leboncoin pour voir l'état du marché immobilier (locatif) et visualiser à quoi pourrait ressembler notre prochaine maison. Oui, j'ai dit maison !

Le problème c'est que plus ça va et plus je suis tendu en passant en revue les annonces… je vois des biens a des prix hallucinants, des photos qui laissent a désirer, des frais d'agence complètement incohérents et je me demande comment c'est possible, pourquoi personne n'en parle et comment font les personnes qui sont réellement en recherche d'un lieu ou habiter ? 

L'idée d'un jeu qui ressemble au juste prix m'a traversé l'esprit et quelques temps après j'ai décidé de passer à l'action. On commence toujours simple, 2 photos, 4 prix aléatoires, gagné ou perdu. Ok, maintenant comment on fait ça ?

## Le Scraping 

Scrap-quoi ? Scraping, c'est en quelque sorte récupérer des données, gratter le code source des sites pour pouvoir faire ce que tu veux du contenu… On reparlera de la partie légalité etc un jour, le but ici n'est pas lucratif, juste fun.

J'ai d'abord cherché des librairies, spécifiques à Leboncoin, y en a quelques unes qui datent un peu et ne fonctionnent plus, du coup on repart de zéro.

J'ai choisi d'utiliser le langage Go pour cette partie parce que j'ai commencé à m'y intéresser il y a peu et je trouve que sa simplicité serait une bonne corde supplémentaire à mon arc. Ne maitrisant pas spécialement le fameux Python, je me rabats sur le "concurrent".

J'ai commencé a trifouiller Go, il y a quelques mois avec du scrapping justement et en tentant de reprendre le meme code et l'appliquer à Leboncoin, je me suis heurté à cette fameuse mesure de sécurité, le Captcha. Leboncoin est logiquement protégé par CloudFlare pour éviter ce type d'usages robotiques (et peut-être illicites ?) 

Mais bien heureusement, il y a des solutions pour contourner tout ça. Et non je ne parle pas d'aller copier coller le code source de chaque page d'annonce à la main. 

On est fainéant ici, je veux dire efficace !

### Zenrows

C'est un service payant (cher!) qui propose une API et des SDK pour outrepasser les sécurités des sites, formatter les données récupées et plein d'autres choses… J'ai utilisé les 14jours d'essais gratuits qui nous limite à 1000requetes je crois.

Quelques essais en echec plus tard, nous voilà avec notre premier jeu de données. D'abord on récupère une liste d'annonces selon une recherche basique, en gros c'est comme si on allait sur Leboncoin, et cliquait sur guadeloupe, immo, location, je récupère les liens vers les annonces de la première page de résultat, simple.

Ensuite, 2ème requete vers la page de chaque annonce et là on cherche a récupérer les données des éléments sur la page via des sélecteurs CSS, c'est assez facile mais il faut faire gaffe. Le site est fait de telle façon a ce que les sélecteurs changent régulièrement.

Une fois qu'on a ce qu'il nous faut, URL de l'annonces, liste de photos, prix… On sauvegarde tout ça, j'ai commencé par tout mettre dans un fichier JSON (simplicité).

## Le site 

Maintenant qu'on a la partie données, il nous faut la mécanique de jeu. Et vous savez quoi ? J'ai testé un service tout nouveau tout chaud.

### V0 by Vercel

Un service qui permet de génerer des interfaces utilisateur grâce à l'IA. Franchement j'étais plutot impressionné par la rapidité et le rendu qui était directement fonctionnel et testable dans l'aperçu, contrairement à d'autres IA.

Alors bien évidemment, c'est grace à mes talents de prompt engineer (comment ça les chevilles ?) en herbe.

J'ai quand meme modifié quelques choses avant de publier la première version. Le jeu était fonctionnel, c'est a dire qu'on peut lancer la partie, le timer se met en route, en cliquant sur les boutons on arrive passe a l'étape suivante et une fois le temps écoulé on voit le classement. 

Maintenant il me fallait dynamiser le tout, avec les vraies données et un peu de style.

### Les données

J'ai utilisé un nouveau service dont j'ai vu l'efficacité sur youtube (learn everyday). Convex, c'est un genre de Firebase en plus cool, je trouve.

J'ai utilisé leur intégration avec Next.js et ce fut très rapide. Tout est fortement typé donc ça glisse tout seul et j'aime la façon dont le code est synchronisé au SaaS. 

J'utilise leur base de données pour enregistrer les scores et leurs fonctions pour publier 1 tweet quotidien avec le classement et un tweet quand quelqu'un prend la tête du classement. 

## Lancement 

J'ai lancé un Tweet avec le lien et j'ai été me coucher, oui parce que j'ai fait tout ça sur une nuit blanche (comme d'habitude). Ensuite la magie des réseaux à fait son affaire.

Le jeu à été bien reçu, les joueurs et joueuses sont amusé·es et ont l'envie de gagner. On est à plus de 300 parties lancées et y a plus de 130 joueurs au classement. \
Assez content du résultat, j'ai déjà pu améliorer quelques éléments selon les retours que j'ai reçu et pour le moment je n'ai pas d'idée de suite ou autre pour ce projet… 
