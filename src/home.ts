export type HomeCTA = {
  href: string
  label: string
}

export type HomeStatusItem = {
  body: string
  label: string
  title: string
}

export const home = {
  hero: {
    eyebrow: "Développeur fullstack indépendant depuis la Guadeloupe",
    title:
      "Je construis des projets web, je teste des idées et je publie ce qui fais sens.",
    body: "Je travaille entre missions, prototypes, outils utiles et projets un peu loufoques. MarvinL.com me sert de carnet de bord public : j’y montre ce qui se passe vraiment, comment ça évolue et les projets qui prennent une forme suffisamment solide pour rester ici."
  },
  ctas: [
    {
      href: "/projets",
      label: "Voir les projets"
    },
    {
      href: "/ideas",
      label: "Explorer les idées"
    }
  ] satisfies HomeCTA[],
  now: [
    {
      label: "Construire",
      title: "Des outils qui partent d’une frustration réelle",
      body: "J’aime les petits produits utiles, les prototypes rapides et les projets qui règlent un problème concret avant de chercher à faire du bruit."
    },
    {
      label: "Publier",
      title: "Montrer ce qui existe déjà, pas seulement l’intention",
      body: "Ici je garde surtout les choses qui ont pris vie : un site, un test, une interface, un article, une idée qui a quitté le carnet."
    },
    {
      label: "Suivre",
      title: "Laisser une trace nette de ce qui bouge",
      body: "La newsletter sert de fil discret pour suivre les sorties, les évolutions et les projets qui mériteront un vrai lancement plus tard."
    }
  ] satisfies HomeStatusItem[],
  writing: {
    eyebrow: "Traces écrites",
    title: "J’écris parfois pour poser les idées proprement.",
    body: "Consistant dans l'irrégularité. Par moments l'écrit est la façon la plus efficace de partager ce que j'ai a dire."
  },
  projects: {
    eyebrow: "Sorties récentes",
    title: "Les projets restent le meilleur résumé de ce que je fais.",
    body: "Des outils persos, des expériences publiques et quelques objets web qui mélangent tech, contexte local et envie de tester quelque chose de concret."
  }
} as const
