export type HomeCTA = {
  href: string
  label: string
}

export type HomeFAQItem = {
  answer: string
  question: string
}

export const home = {
  hero: {
    eyebrow: "Développeur web fullstack et entrepreneur en Guadeloupe",
    title:
      "J’ai un problème avec mes idées : à un moment, il faut que je les code."
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
  writing: {
    title: "Parfois, j’écris.",
    body: "Pour partager le brouhaha du cerveau."
  },
  faq: {
    title: "Questions fréquentes.",
    items: [
      {
        question: "Qui est derrière MarvinL.com ?",
        answer:
          "MarvinL.com est le site personnel de Marvin Londinfer, développeur web fullstack et entrepreneur basé en Guadeloupe."
      },
      {
        question: "Quel type de projets sont présentés ici ?",
        answer:
          "Des produits personnels, des prototypes, quelques réalisations client et des articles."
      },
      {
        question: "Pourquoi la Guadeloupe revient souvent ici ?",
        answer:
          "J’y vis. Beaucoup de mes idées partent de problèmes ou d’usages rencontrés ici."
      },
      {
        question: "Quand est-ce qu’un projet apparaît sur le site ?",
        answer: "Quand il existe assez pour être montré."
      }
    ] satisfies HomeFAQItem[]
  },
  projects: {
    title: "Projets récents."
  }
} as const
