import type { APIRoute } from "astro"
import {
  getCardImagePath,
  getSocialCardVariants,
  type SocialCard
} from "../../og/catalog"
import { renderSocialCard } from "../../og/render"

export const prerender = true

export async function getStaticPaths() {
  return (await getSocialCardVariants()).map((card) => ({
    params: {
      path: getCardImagePath(card).slice("/og/".length, -".png".length)
    },
    props: { card }
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const card = props.card as SocialCard | undefined
  if (!card) return new Response("Not found", { status: 404 })
  const response = await renderSocialCard(card)
  // Consume before returning so rendering failures also fail the build.
  return new Response(await response.arrayBuffer(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
