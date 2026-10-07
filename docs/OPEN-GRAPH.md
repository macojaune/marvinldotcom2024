# Images de partage

Les cartes Open Graph et Twitter prolongent l'identité actuelle de MarvinL.com, avec des titres en Anybody 800, des textes en IBM Plex Sans et les illustrations des projets. Chaque destination publiée possède deux PNG de 1200 × 630 pixels : une variante claire sur fond sable `#EEDDBD` avec du texte brique `#792F21`, et une variante sombre sur fond bordeaux `#741D12` avec du texte crème `#FFF4CF`, repris du site. Chaque page choisit aléatoirement l'une de ces variantes à chaque build.

## Couverture actuelle

Le build couvre 22 pages publiées et produit 44 PNG, soit une variante claire et une variante sombre par page. Les métadonnées de chaque page référencent une seule de ces deux variantes.

| Destination                           | Nombre de pages | Contenu de la carte                                                           |
| ------------------------------------- | --------------: | ----------------------------------------------------------------------------- |
| Projets personnels illustrés          |              11 | Titre, description, catégorie, technologies et illustration existante adaptée |
| Réalisations client sans illustration |               3 | Composition typographique avec les informations du projet                     |
| Articles                              |               5 | Titre, description et date de publication réelle                              |
| Accueil, `/projets`, `/blog`          |               3 | Présentation du site, projets récents ou titres des articles récents          |

`/ideas` redirige vers l'accueil avec un statut 302 et ne possède pas de carte distincte. Les brouillons sont exclus du build public. Le serveur de développement peut les afficher pour travailler dessus.

## Sources et rendu

`src/content/project/*.mdx` et `src/content/blog/*.mdx` restent les sources des titres, descriptions, dates, catégories et technologies. `src/og/catalog.ts` construit les cartes à partir des collections Astro. La date d'un article provient de `createdAt`, formatée en français avec le fuseau UTC.

L'accueil reprend `src/home.ts` et `src/persona.ts`. L'accueil et l'index des projets sélectionnent les trois projets personnels illustrés les plus récemment modifiés, selon `updatedAt`. L'index du blog reprend les trois articles publiés les plus récents, selon `createdAt`. Ces listes évoluent avec les données du site.

Les illustrations actuelles sont des compositions HTML/CSS et SVG de `src/components/ProjectPreview.astro`, pas des fichiers bitmap de projets. `src/og/ProjectArt.tsx` les adapte au rendu JSX de Vercel OG. `src/project-previews.ts` liste les slugs illustrés. Une nouvelle illustration doit rester cohérente entre l'aperçu du site et son adaptation sociale. Un projet sans illustration utilise la composition typographique, comme les trois réalisations client actuelles.

`src/og/SocialCard.tsx` compose les cartes. `src/og/render.tsx` charge les polices locales et utilise `ImageResponse` de `@vercel/og`. Les illustrations passent d'abord par un rendu PNG intermédiaire en mémoire, puis la carte complète est générée.

`src/og/theme.ts` centralise les palettes claire et sombre. Le thème change les couleurs de la carte, tout en conservant sa composition, ses polices et ses illustrations.

La dépendance est épinglée à `@vercel/og` **0.11.1**. Cette version a passé le build Astro avec Node **24.21.0**. L'essai de la version 1.0.3 échouait sur `Dynamic require of "fs" is not supported` dans le bundle ESM. Aucun contournement par un `require` global n'est utilisé. Une mise à jour de cette dépendance doit donc repasser le build et les contrôles HTTP.

## Génération et URL

L'endpoint `src/pages/og/[...path].png.ts` est prérendu pendant le build. Les PNG aboutissent dans `dist/client/og/`; aucun PNG OG généré n'est versionné dans les sources. Les TTF et leurs licences se trouvent dans `src/og/fonts/`, avec leur provenance dans le README adjacent. Le rendu ne dépend pas d'un téléchargement de police au moment du build.

Chaque nom de fichier inclut le thème `light` ou `dark` et les 12 premiers caractères d'un hash SHA-256 calculé sur les données de la carte, thème compris, et sur `designVersion` dans `catalog.ts`. Une modification du contenu change automatiquement l'URL. Pour modifier une illustration, une police, une palette ou une composition, augmenter aussi `designVersion`, actuellement `"3"`.

`astro.config.mjs` crée une graine aléatoire unique, partagée par Vite via `import.meta.env.OG_BUILD_SEED`. `pickSocialTheme` combine cette graine avec le chemin de la page pour choisir son thème. Une même page conserve donc le même thème dans tout le build, y compris entre les métadonnées HTML et les endpoints PNG. Un nouveau build peut changer le thème d'une page, sans garantir une alternance ni une répartition exacte à 50/50. Le thème ne change pas à chaque requête HTTP. Les deux variantes sont toujours générées ; la graine n'entre pas dans leur hash et une variante inchangée garde son URL entre deux builds.

`src/components/Head.astro` choisit l'image explicite fournie par une page, sinon sa carte du catalogue, sinon l'image de repli SEO existante. Les balises `og:image` et `twitter:image` utilisent la même URL. Les cartes générées ajoutent les dimensions et le type PNG.

Les URL absolues gardent le domaine canonique existant, `https://www.marvinl.com`, défini dans `src/seo.ts`. Pour vérifier un build local, résoudre le chemin de l'image sur le serveur local. Une URL canonique dans le HTML local ne prouve pas que le fichier est déjà disponible en production.

L'endpoint déclare un cache `immutable`, mais le serveur statique de l'adaptateur Astro Node standalone ne conserve pas cet en-tête après prérendu. Le serveur local construit a répondu `Cache-Control: public, max-age=0`. Les chemins contenant le hash assurent donc l'invalidation des images; le cache servi doit être vérifié sur chaque environnement déployé.

## Ajouter du contenu et vérifier

Un projet ou article publié dans une collection existante reçoit automatiquement ses deux variantes au prochain build. Pour une nouvelle famille de pages partageables, ajouter une entrée au catalogue et prévoir sa composition. Sans entrée, `Head.astro` conserve le repli SEO.

Avec Node 24.21.0 et les dépendances installées :

```sh
node --test scripts/og-theme.test.ts
pnpm run build
node scripts/verify-og.mjs
node scripts/verify-og.mjs http://127.0.0.1:4325
```

Les deux tests de thème vérifient la stabilité pour une même graine, le changement avec une autre graine et un contraste d'au moins 4,5:1 pour les textes principaux et secondaires des deux palettes.

La dernière commande suppose qu'un serveur sert ce build à cette adresse. Le vérificateur contrôle les métadonnées, l'unicité et le format versionné des URL, la présence des deux variantes par page, les dimensions et la signature des 44 PNG, un poids inférieur à 1 Mo et l'absence de brouillons. Avec une origine HTTP, il contrôle aussi les 22 pages et toutes les images servies, leur correspondance exacte avec le build et les réponses 404 prévues.

Relire visuellement les deux variantes de toutes les cartes après une modification de composition, de police, de palette ou d'illustration, en particulier les titres longs et les descriptions. La validation locale de cette version couvre le build Tina/Astro complet sous Node 24.21.0, le contrôle TypeScript strict ciblé, les deux tests de thème, React Doctor sans diagnostic sur le périmètre modifié et le vérificateur des 22 pages et 44 PNG via HTTP. Les pages et images ont répondu 200 ; le brouillon et l'image inconnue testés ont répondu 404.

La revue des 44 cartes, par paires claire et sombre, n'a relevé aucun texte coupé. La galerie a chargé les 44 cartes à 728 et 390 pixels sans débordement, avec ses contrôles fonctionnels. Le navigateur a confirmé une image servie en 200 et des métadonnées d'accueil stables entre deux requêtes. Deux builds réels ont changé le thème sélectionné pour 8 des 22 pages. La revue finale permet de livrer ce changement ; les aperçus propres aux plateformes sociales n'ont pas été testés.

Ces résultats concernent la branche locale `feature/og-social`. Le travail reste non commité, non poussé et non déployé. Les branches `main` et `develop` n'ont pas été modifiées.
