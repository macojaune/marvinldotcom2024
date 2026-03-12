/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { DB } from "../db";

declare namespace App {
  interface Locals {
    db: DB;
  }
}

interface ImportMetaEnv {
  readonly ASTRO_DB_REMOTE_URL: string;
  readonly ASTRO_DB_APP_TOKEN: string;
  readonly MJ_PUBLIC_KEY: string;
  readonly MJ_SECRET_KEY: string;
  readonly MJ_LIST_ID: string;
  // more env variables...
}
