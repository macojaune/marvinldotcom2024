---
title: 'Extension Chrome : AutoSongLink'
description: >-
  Remplace rapidement les liens de partage Spotify ou Apple Music par un lien
  Odesli.
technos:
  - Javascript
isClient: false
isDraft: false
createdAt: 2024-07-10T02:58:39.099Z
updatedAt: 2024-07-11T01:59:51.463Z
---

# AutoSongLink

Je partage très souvent de la musique sur les réseaux sociaux, le partage de lien via Spotify est simple et efficace mais un problème se pose pour les personnes qui ne sont pas sur Spotify. Avec tant de plateformes de streaming disponibles (Spotify, Apple Music, YouTube, etc.), c'est assez frustrant de cliquer sur un nouveau morceau qu'on veut découvrir et arriver sur une plateforme qu'on utilise pas. Obligé de faire la recherche a la main, souvent je ne prends pas le temps. J'imagine que mes abonnés font pareil.

J'ai donc pensé a une extension Chrome qui transformerait le lien spotify en lien multi plateforme en 1 clic si possible.

## Qu'est-ce que cette extension Chrome ?

J'en avais créé une à l'époque du Spot, je ne sais même plus pour quelle utilisation mais c'était quelque chose de très simple. \
J'avais été étonné de la simplicité, c'est de l'HTML et du Javascript, avec un fichier de configuration en JSON et puis c'est tout.

Au départ je voulais que lien soit remplacé au simple clic sur le bouton de l'extension, mais je me suis heurté a des soucis d'accès au presse-papier, apparemment pour le moment on ne peut y accéder qu'après une action utilisateur dans la fenêtre de l'extension.

Donc il y a un simple bouton tout moche et du texte pour donner de l'informations sur ce qu'il se passe. Ce sera en 2 clics donc.

Niveau style, je ne me suis pas foulé non plus. UI/UX designer qui lisez ceci, vous avez des suggestions, je suis preneur !

## Pourquoi maintenant ?

J'ai eu l'idée il a un moment, et en cherchant je n'avais rien trouvé de tel. J'avais déjà fait une tentative il y a quelques années, en vain. Aucun service de lien multiplateforme n'exposait d'API.

C'est très récemment que je suis tombé sur celle d'Odesli (Songlink). Elle est limitée à 10 requête par heure je crois…\
Je pense que ça devrait suffir, on partage rarement autant liens.

## OpenSource parce que c'est la vie !

Ce n'est pas un projet à but lucratif top secret, le code est vraiment rudimentaire et pour le moment c'est plus pour me faciliter la vie à moi qu'autre chose.

Et j'imagine que d'autres personnes verrons des limites ou voudront améliorer l'aspect visuel ou corriger des bugs. C'est totalement bienvenu ! Le projet est disponible sur [Github](https://github.com/macojaune/auto-songlink-extension)

Si vous avez des idées pour améliorer l'extension ou si vous rencontrez des problèmes, n'hésitez pas à soumettre une pull request ou à ouvrir une issue.

## Comment on publie une extension Chrome en fait ?

Très bonne question, je suis en train de regarder ça justement.

Déjà, c'est 5€ pour être développeur d'extension. Voilà… et là ils me demandent tout plein de papiers. Vous connaissez mon amour pour la paperasse ?

Bon le site de Canalbox ne veut pas me laisser voir mon compte client du coup je ne peux valider mon compte. Mais j'ai réussi à publier l'extension, elle est en attente de validation.\
Il faut créer des images et des icones un peu comme pour les applications mobiles \
(J'ai fait ça sur paint à l'arrache, c'est beurk)

Et ensuite justifier chaque permissions demandées par l'extension, attester qu'on n'utilise pas les informations utilisateurs pour faire de la soupe et ça devrait être bon !

Je vous tiens au courant. À suivre.

Update (10/07/2024)  

## C'est en ligne ! 

Ça a été très rapide au final. 

Vous pouvez tester ici : [AutoSongLink](chromewebstore.google.com/detail/autosonglink/gndjompcjcpibmidddkjmnhimgepoodo?hl=fr) et sentez-vous libre de me faire un retour où vous voulez !
