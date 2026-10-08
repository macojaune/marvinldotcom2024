import { defineConfig, envField } from "astro/config"
import { randomBytes } from "node:crypto"
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import robotsTxt from "astro-robots-txt"
import node from "@astrojs/node"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      // One random seed shared by page metadata and all OG endpoints in this build.
      "import.meta.env.OG_BUILD_SEED": JSON.stringify(
        randomBytes(16).toString("hex")
      )
    }
  },
  site: "https://www.marvinl.com",
  integrations: [
    tailwind(),
    compress(),
    robotsTxt(),
    react(),
    mdx(),
    sitemap({
      filter: (page) =>
        new URL(page).pathname.replace(/\/$/, "") !==
        "/projets/extension-chrome-odesli"
    })
  ],
  output: "hybrid",
  adapter: node({ mode: "standalone" }),
  prefetch: true,
  env: {
    schema: {
      BREVO_API_KEY: envField.string({ context: "server", access: "secret" }),
      BREVO_CONTACT_LIST_ID: envField.string({
        context: "server",
        access: "secret"
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public"
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: "server",
        access: "secret"
      })
    }
  }
})
