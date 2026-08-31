export type HomeCTA = {
  href: string
  label: string
}

export type HomeStatusItem = {
  body: string
  label: string
  title: string
}

export type HomeSummaryItem = {
  answer: string
  label: string
}

export type HomeFAQItem = {
  answer: string
  question: string
}

export const home = {
  hero: {
    eyebrow: "Développeur fullstack indépendant depuis la Guadeloupe",
    title:
      "Je construis des projets web, je teste des idées et je publie ce qui fait sens.",
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
  summary: {
    eyebrow: "En bref",
    title:
      "Quelques réponses rapides pour comprendre qui je suis et ce que je fais.",
    items: [
      {
        label: "Qui",
        answer:
          "Développeur fullstack indépendant basé en Guadeloupe, avec un goût prononcé pour les projets web concrets."
      },
      {
        label: "Quoi",
        answer:
          "Des produits web, des prototypes utiles, des interfaces sur mesure et des expériences qui vont jusqu’à une vraie mise en ligne."
      },
      {
        label: "Où",
        answer:
          "Je travaille depuis la Guadeloupe, en remote, sur des sujets locaux comme sur des projets plus larges côté France et au-delà."
      },
      {
        label: "Pourquoi ce site",
        answer:
          "MarvinL.com me sert de portfolio vivant, de laboratoire public et de trace claire de ce que je construis réellement."
      }
    ] satisfies HomeSummaryItem[]
  },
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
    body: "Consistant dans l'irrégularité. Par moments l'écrit est la façon la plus efficace de partager ce que j'ai à dire."
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Les réponses que les gens cherchent souvent en arrivant ici.",
    items: [
      {
        question: "Qui est derrière MarvinL.com ?",
        answer:
          "MarvinL.com est le site personnel de Marvin, développeur fullstack indépendant basé en Guadeloupe."
      },
      {
        question: "Quel type de projets sont présentés ici ?",
        answer:
          "Tu trouveras ici des projets clients, des outils personnels, des prototypes produits et des articles liés au développement web, au freelance et à la construction de produits."
      },
      {
        question: "Tu travailles uniquement en Guadeloupe ?",
        answer:
          "Non. Je suis basé en Guadeloupe mais je travaille aussi en remote sur des projets en France et ailleurs, tant que le cadre de collaboration est clair."
      },
      {
        question: "Quand est-ce qu’un projet apparaît sur le site ?",
        answer:
          "En général quand il a dépassé l’idée pure et qu’il existe sous une forme assez solide pour être montré, expliqué et assumé publiquement."
      }
    ] satisfies HomeFAQItem[]
  },
  projects: {
    eyebrow: "Sorties récentes",
    title: "Les projets restent le meilleur résumé de ce que je fais.",
    body: "Des outils persos, des expériences publiques et quelques objets web qui mélangent tech, contexte local et envie de tester quelque chose de concret."
  }
} as const
