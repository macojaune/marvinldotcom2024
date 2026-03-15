import { persona } from "./persona"

export type JsonLd = Record<string, unknown>

export const siteUrl = new URL("https://www.marvinl.com")
export const defaultSocialImage = new URL(
  "/favicon/android-chrome-512x512.png",
  siteUrl
).toString()

const personId = `${siteUrl}#person`
const serviceId = `${siteUrl}#service`
const websiteId = `${siteUrl}#website`

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

export function getBaseStructuredData(): JsonLd[] {
  return [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl.toString(),
      name: persona.brandName,
      inLanguage: "fr-FR",
      publisher: {
        "@id": serviceId
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
        "@id": serviceId
      },
      sameAs: persona.sameAs,
      knowsAbout: persona.knowsAbout
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: persona.brandName,
      alternateName: persona.handle,
      url: siteUrl.toString(),
      image: defaultSocialImage,
      description: persona.shortDescription,
      email: persona.email,
      founder: {
        "@id": personId
      },
      areaServed: persona.serviceAreas.map((area) => ({
        "@type": "Place",
        name: area
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: persona.location.locality,
        addressRegion: persona.location.region,
        postalCode: persona.location.postalCode,
        addressCountry: persona.location.countryCode
      },
      availableLanguage: ["fr-FR", "en"],
      serviceType: persona.serviceTypes,
      sameAs: persona.sameAs
    }
  ]
}
