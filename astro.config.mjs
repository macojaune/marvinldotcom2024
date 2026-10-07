import { defineConfig, envField } from "astro/config"
import tailwind from "@astrojs/tailwind"
import compress from "astro-compress"
import robotsTxt from "astro-robots-txt"
import node from "@astrojs/node"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"

import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://www.marvinl.com",
  integrations: [
    tailwind(),
    compress(),
    robotsTxt(),
    react(),
    mdx(),
    sitemap()
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
