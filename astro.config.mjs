import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site:"https://www.marvinl.com",
  integrations: [tailwind(), compress(), robotsTxt(), react()],
  output: "hybrid",
  adapter: netlify()
});
