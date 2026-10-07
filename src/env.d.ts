/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { DB } from "../db"

declare namespace App {
  interface Locals {
    db: DB
  }
}

interface ImportMetaEnv {
  readonly ASTRO_DB_REMOTE_URL: string
  readonly ASTRO_DB_APP_TOKEN: string
  readonly BREVO_API_KEY: string
  readonly BREVO_CONTACT_LIST_ID: string
  readonly PUBLIC_TURNSTILE_SITE_KEY: string
  readonly TURNSTILE_SECRET_KEY: string
  // more env variables...
}
