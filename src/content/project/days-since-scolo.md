---
title: "X Jours sans scolopendre"
description: "Suivez l'évolution de ce cauchemar"
technos:
  - Vite
  - React
  - Tanstack Query
  - Tailwind CSS
  - Drizzle
  - TursoDB
  - Netlify Functions 
isClient: false
isDraft: false
updatedAt: 2024-02-12T15:00:00Z
createdAt: 2024-02-08T03:40:00Z
---

# [X jours sans scolopendre](https://scolo.marvinl.com)
J'habite à la campagne depuis 4 ou 5ans maintenant et, disons que les scolopendres aiment beaucoup notre domicile. 
C'est surement la bête que je déteste le plus, et à force de frustration et des moqueries de mon audience Twitter, 
j'ai décidé sur un coup de tête à 3h du mat de créer ce compteur pour apaiser ma frustration.  

J'ai utilisé [Vite](https://vitejs.dev/), qui comme son nom _(à lire en français)_ l'indique, permet de rapidement lancer un environnement de 
développement. J'utilise React comme framework avec Typescript pour créer cette page et Tailwind pour la mise en page. 

Hébergé sur Netlify j'utilise deux fonctions serverless, une pour récupérer la date de dernière rencontre avec mon 
ennemi 
plein de 
pattes quand on arrive sur le site et une pour la mettre à jour _(en espérant ne jamais àvoir à l'utiliser)_.
Cette date est enregistrée dans une table via [Turso](https://turso.tech/), un nouveau service pour moi que je trouve vraiment 
simple à utiliser. Et qui fourni gratuitement jusqu'à 500 bases de données libsql _(ceci n'est pas un placement de produit, quand c'est 
bon il faut le dire)_.

Du coup je ne cherche pas encore activement de nouveau logement, mais si tu lis ceci et que ton oncle ou ta mamie à une 
jolie 
villa à 
louer, fais moi signe !  
