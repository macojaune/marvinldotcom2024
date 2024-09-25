import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: "sqlite",
  driver: "turso",
  verbose: true,
  dbCredentials: {
    url: process.env.ASTRO_DB_REMOTE_URL,
    authToken: process.env.ASTRO_DB_APP_TOKEN,
  },
});
