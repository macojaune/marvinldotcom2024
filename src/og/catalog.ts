import { getCollection } from "astro:content"
import { createHash } from "node:crypto"
import { home } from "../home"
import { persona } from "../persona"
import { previewProjects } from "../project-previews"
import { pickSocialTheme, type SocialTheme } from "./theme"

export type SocialCard = {
  theme: SocialTheme
  path: string
  kind: "home" | "projects" | "blog" | "project" | "article"
  title: string
  description: string
  label: string
  technos?: string[]
  date?: string
  art?: (typeof previewProjects)[number]
  featured?: { title: string; art: (typeof previewProjects)[number] }[]
  articles?: string[]
}

// Bump when the layout, fonts or project illustrations change.
const designVersion = "4"
const published = ({ data }: { data: { isDraft: boolean } }) =>
  import.meta.env.PROD ? !data.isDraft : true

async function createCatalog(): Promise<SocialCard[]> {
  const [projects, articles] = await Promise.all([
    getCollection("project", published),
    getCollection("blog", published)
  ])
  const featured = projects
    .filter((entry) => !entry.data.isClient)
    .sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime())
    .flatMap((entry) => {
      const art = previewProjects.find((slug) => slug === entry.slug)
      return art ? [{ title: entry.data.title, art }] : []
    })
    .slice(0, 3)

  const cards: Omit<SocialCard, "theme">[] = [
    {
      path: "/",
      kind: "home",
      title: home.hero.title,
      description: persona.description,
      label: "Guadeloupe",
      featured
    },
    {
      path: "/projets",
      kind: "projects",
      title: "Tous les projets.",
      description: "Produits personnels et réalisations client.",
      label: "Projets",
      featured
    },
    {
      path: "/blog",
      kind: "blog",
      title: home.writing.title,
      description: home.writing.body,
      label: "Articles",
      articles: articles
        .sort((a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime())
        .slice(0, 3)
        .map((entry) => entry.data.title)
    },
    ...projects.map(
      (entry): Omit<SocialCard, "theme"> => ({
        path: `/projets/${entry.slug}`,
        kind: "project",
        title: entry.data.title,
        description: entry.data.description ?? "Un projet de Marvin Londinfer.",
        label: [
          entry.data.isClient ? "Réalisation client" : "Projet personnel",
          entry.data.types?.[0]
        ]
          .filter(Boolean)
          .join(" · "),
        technos: entry.data.technos,
        art: previewProjects.find((slug) => slug === entry.slug)
      })
    ),
    ...articles.map(
      (entry): Omit<SocialCard, "theme"> => ({
        path: `/blog/${entry.slug}`,
        kind: "article",
        title: entry.data.title,
        description:
          entry.data.description ?? "Un article de Marvin Londinfer.",
        label: "Article",
        date: entry.data.createdAt.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC"
        })
      })
    )
  ]
  return cards.map((card) => ({
    ...card,
    theme: pickSocialTheme(card.path, import.meta.env.OG_BUILD_SEED)
  }))
}

// Dev must reflect edits immediately; a build shares one immutable catalog.
let catalog: Promise<SocialCard[]> | undefined
export function getSocialCards() {
  if (import.meta.env.DEV) return createCatalog()
  return (catalog ??= createCatalog())
}

export async function getSocialCardVariants() {
  return (await getSocialCards()).flatMap((card) =>
    (["light", "dark"] as const).map((theme) => ({ ...card, theme }))
  )
}

export function getCardImagePath(card: SocialCard) {
  const version = createHash("sha256")
    .update(JSON.stringify({ designVersion, card }))
    .digest("hex")
    .slice(0, 12)
  return `/og/${card.path === "/" ? "accueil" : card.path.slice(1)}.${card.theme}.${version}.png`
}

export async function getSocialImagePath(path: string) {
  const pathname =
    new URL(path, "https://www.marvinl.com").pathname.replace(/\/$/, "") || "/"
  const cards = await getSocialCards()
  const card = cards.find((card) => card.path === decodeURI(pathname))
  return card ? getCardImagePath(card) : undefined
}
