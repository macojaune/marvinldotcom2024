import { persona } from "./persona"

export type JsonLd = Record<string, unknown>

export const siteUrl = new URL("https://www.marvinl.com")
export const defaultSocialImage = new URL(
  "/favicon/android-chrome-512x512.png",
  siteUrl
).toString()

const personId = `${siteUrl}#person`
const websiteId = `${siteUrl}#website`
const maggmaId = "https://maggma.studio/#organization"

export function getCanonicalUrl(pathOrUrl?: string | URL) {
  if (!pathOrUrl) {
    return siteUrl.toString()
  }

  if (pathOrUrl instanceof URL) {
    return pathOrUrl.toString()
  }

  try {
    return new URL(pathOrUrl).toString()
  } catch {
    return new URL(pathOrUrl, siteUrl).toString()
  }
}

export function toIsoDate(value?: string | Date) {
  if (!value) {
    return undefined
  }

  return new Date(value).toISOString()
}

export function buildBreadcrumbList(
  items: { name: string; url: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.url)
    }))
  }
}

export function buildWebPage({
  description,
  name,
  url
}: {
  description: string
  name: string
  url: string
}): JsonLd {
  const canonical = getCanonicalUrl(url)

  return {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name,
    description,
    inLanguage: "fr-FR",
    isPartOf: {
      "@id": websiteId
    },
    about: {
      "@id": personId
    }
  }
}

export function buildFaqPage(
  items: { answer: string; question: string }[]
): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
}

export function getBaseStructuredData(): JsonLd[] {
  return [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl.toString(),
      name: persona.brandName,
      inLanguage: "fr-FR",
      publisher: {
        "@id": personId
      }
    },
    {
      "@type": "Person",
      "@id": personId,
      name: persona.name,
      alternateName: [persona.brandName, persona.handle],
      url: siteUrl.toString(),
      image: defaultSocialImage,
      description: persona.shortDescription,
      jobTitle: persona.jobTitle,
      email: persona.email,
      homeLocation: {
        "@type": "Place",
        name: `${persona.location.locality}, ${persona.location.region}`
      },
      worksFor: {
        "@id": maggmaId
      },
      sameAs: persona.sameAs,
      knowsAbout: persona.knowsAbout
    },
    {
      "@type": "Organization",
      "@id": maggmaId,
      name: "MAGGMA Studio",
      url: "https://maggma.studio/"
    }
  ]
}
