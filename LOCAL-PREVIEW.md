# Proposition locale : Anybody et mouvement

Branche `feature/anybody-motion`, issue de `origin/main` au commit `cb0555d`.
URL locale : http://127.0.0.1:4323/

Lancer depuis ce worktree :

```sh
pnpm exec astro dev --host 127.0.0.1 --port 4323
```

Anybody remplace Fraunces pour les titres. IBM Plex Sans reste la police du texte.
L'accueil desktop (à partir de 768 px) conserve la scène validée : trois aperçus des projets récents sont empilés, puis se déploient au défilement pendant que le titre se resserre. Le défilement reste natif et le titre reste opaque. Les aperçus utilisent les mêmes données et représentations que les cartes de projets.

Sur mobile et petit écran, l'accueil reprend la présentation statique : titre Anybody, lien « Voir les projets », puis bloc MAGGMA. Les aperçus ajoutés au hero sont masqués ; les projets restent accessibles dans la section « Projets récents ». Aucun carrousel horizontal, aucune section épinglée sur mobile.

Les anciens fondus d'arrivée du titre et des cartes de projets ont été retirés. Le trait MAGGMA se déclenche à l'entrée du bloc dans l'écran. Les flèches ont un retour de survol réservé à la souris, et les boutons un retour d'appui. Le sommaire conserve sa navigation native et déplace un repère vers la section active. La confirmation de newsletter apparaît avec un fondu, sans réduire brusquement la hauteur du formulaire.

Avec la préférence système de mouvement réduit, la scène desktop devient une présentation statique. Le contenu reste visible si le contrôleur de mouvement ne charge pas.

La section « Parfois, j’écris » distingue le titre de section (Anybody, 48 px sur mobile et 92,8 px sur grand écran) des titres d’articles (IBM Plex Sans 600, 24 px sur mobile et 28 px sur desktop). Une liste avec séparateurs regroupe les articles. Le texte, les dates et les destinations restent ceux du contenu existant. Contrôle visuel à 390 × 844 et 1280 × 900, sans débordement ; liens de la section et du premier article exercés dans le navigateur. Build Astro réussi.

Le titre « Questions fréquentes » interdit les coupures à l’intérieur des mots. Sa taille suit la largeur de sa colonne avec un plafond adapté aux breakpoints existants. Les deux mots restent entiers à 1280 px, 390 px et 320 px, sans débordement horizontal. Anybody est conservée.

Les espacements des cartes de projets sur mobile passent de 40 à 16 px, avec un padding vertical de 8 px au lieu de 12 px. La page Projets utilise une colonne avant 640 px, deux ensuite et trois à partir de 1024 px. Le H1 est à 60 px sur mobile et 96 px sur grand écran, les H2 à 30 et 48 px. Les flèches SVG des lignes d’articles sont retirées.

Le partage utilise des glyphes monochromes de 20 px sur des liens de 44 × 44 px, avec noms accessibles, focus visible et URLs encodées. Le logo X provient de Simple Icons : https://github.com/simple-icons/simple-icons/blob/develop/icons/x.svg. L’icône e-mail est une enveloppe SVG. Les destinations de partage sont conservées. Contrôle à 1280, 390 et 320 px ; le focus clavier du bouton Facebook a été vérifié, ainsi que les couleurs dans les deux thèmes. Aucun partage externe n’a été déclenché.

LeJusteCoin garde sa route et son fichier source. Le titre de contenu devient « LeJusteCoin », la description « Mon premier jeu en ligne sur l’immobilier en Guadeloupe ». La carte et la page détaillée ont été vérifiées via la navigation locale. Build Astro et contrôle des espaces Git réussis.

Le lightmode utilise la palette validée « Sable & brique » : fond `#EEDDBD`, titres `#792F21`, texte secondaire `#835044`, liens `#AC3522` et surfaces claires `#F7EAD2`. Le halo blanc de fond est supprimé en lightmode. Le bloc newsletter de l’accueil est brique avec un texte sable et un bouton clair. Les surfaces de lecture, les placeholders, les états de focus et de sélection suivent les mêmes tokens. Les couleurs des aperçus de produits et de MAGGMA restent celles de leurs marques ; les couleurs du darkmode sont conservées.

Validation de cette palette dans le navigateur local : accueil à 1280, 390 et 320 px, Projets à 390 px et article « Entrepreneur, malgré-moi ? » à 320 px, sans débordement horizontal. Le changement de thème a été exercé, dont le bloc newsletter inversé dans les deux modes. Contrastes : texte secondaire 4,92:1, titres 7,01:1, liens 4,78:1, texte newsletter 7,01:1 à 7,88:1. Build Astro réussi et React Doctor sans diagnostic sur les fichiers modifiés.

## Vérifications

- Build Astro réussi, sans ajout de dépendance d'animation.
- React Doctor sur les fichiers modifiés : aucun diagnostic.
- Dernière version servie contrôlée à 1280 × 900 et 390 × 844, sans débordement horizontal. Desktop : pile initiale et déploiement vérifiés au défilement. Mobile : hero statique de 508 px, titre sans transformation, aperçus du hero masqués et MAGGMA immédiatement après. Passage entre les tailles vérifié sans rechargement.
- Thèmes clair et sombre vérifiés lors de la première passe.
- Navigation du sommaire d'article sur mobile, repère de section active vérifié.
- Navigation du sommaire de projet sur desktop au clavier.
- Branche JavaScript de mouvement réduit simulée pour la nouvelle scène : position relative, aucune transformation du titre ou des aperçus. Cette simulation ne remplace pas un contrôle avec le réglage système réel.
- Confirmation newsletter testée avec clé publique de test Cloudflare et réponse `/api/newsletter` interceptée dans le navigateur. Hauteur avant/après : 241 px. Aucun enregistrement Brevo effectué. La configuration temporaire de test a été retirée.

Les clés Brevo et Turnstile actuelles ne sont pas présentes dans les fichiers locaux. Le formulaire signale cette indisponibilité ; la connexion réelle à Brevo ne fait pas partie de cette validation.

Validation initiale réalisée en local sur `feature/anybody-motion`. Le chantier est transférable à `develop` par cherry-pick sans reprendre les différences de contenu entre `main` et `develop`. Le déploiement en production attend la validation humaine.
