# Polices des images Open Graph

`src/og/render.tsx` charge ces TTF locaux pour générer les PNG pendant le build. Les fichiers incluent les glyphes nécessaires aux textes français. Aucun appel à Google Fonts n'est requis pour ce rendu.

| Fichier               | Famille et graisse        | Source du fichier                                                                                                                   |
| --------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Anybody-800.ttf`     | Anybody 800, normal       | [Google Fonts, TTF](https://fonts.gstatic.com/s/anybody/v13/VuJbdNvK2Ib2ppdWYq311GH32hxIv0sd5grncSUi2F_Wim4JV2fPrg.ttf)             |
| `IBMPlexSans-400.ttf` | IBM Plex Sans 400, normal | [Google Fonts, TTF](https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llzAA.ttf) |
| `IBMPlexSans-600.ttf` | IBM Plex Sans 600, normal | [Google Fonts, TTF](https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSDNF5zAA.ttf) |

Les licences SIL Open Font License 1.1 accompagnent les fichiers :

- `Anybody-OFL.txt`, copyright 2020 The Anybody Project Authors, [projet d'origine](https://github.com/Etcetera-Type-Co/Anybody).
- `IBMPlexSans-OFL.txt`, copyright 2017 IBM Corp., nom réservé "Plex".

Conserver ces licences avec les polices lors de leur redistribution. Lors d'un remplacement de TTF, mettre à jour sa provenance ici, vérifier les accents et les graisses dans les PNG, puis augmenter `designVersion` dans `src/og/catalog.ts` pour renouveler les URL des images.
