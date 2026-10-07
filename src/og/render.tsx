import { ImageResponse } from "@vercel/og"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { SocialCard as Card } from "./catalog"
import { SocialCard, socialImageSize } from "./SocialCard"
import { ProjectArt } from "./ProjectArt"

let fonts:
  | Promise<
      NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]
    >
  | undefined
function getFonts() {
  return (fonts ??= Promise.all(
    [
      ["Anybody", "Anybody-800.ttf", 800],
      ["IBM Plex Sans", "IBMPlexSans-400.ttf", 400],
      ["IBM Plex Sans", "IBMPlexSans-600.ttf", 600]
    ].map(async ([name, file, weight]) => ({
      name: name as string,
      data: await readFile(resolve("src/og/fonts", file as string)),
      weight: weight as 400 | 600 | 800,
      style: "normal" as const
    }))
  ))
}

const illustrations = new Map<NonNullable<Card["art"]>, Promise<string>>()
function getIllustration(art: NonNullable<Card["art"]>) {
  let image = illustrations.get(art)
  if (!image) {
    image = getFonts().then(async (fonts) => {
      const response = new ImageResponse(
        (
          <div style={{ display: "flex", width: 500, height: 340 }}>
            <ProjectArt project={art} />
          </div>
        ),
        { width: 500, height: 340, fonts }
      )
      return `data:image/png;base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`
    })
    illustrations.set(art, image)
  }
  return image
}

export async function renderSocialCard(card: Card) {
  const arts = new Set(
    [card.art, ...(card.featured?.map((entry) => entry.art) ?? [])].filter(
      (art): art is NonNullable<Card["art"]> => Boolean(art)
    )
  )
  const artImages = Object.fromEntries(
    await Promise.all(
      [...arts].map(async (art) => [art, await getIllustration(art)])
    )
  )
  // Called by a prerendered endpoint: fonts and image generation stay at build time.
  return new ImageResponse(<SocialCard card={card} artImages={artImages} />, {
    ...socialImageSize,
    fonts: await getFonts()
  })
}
