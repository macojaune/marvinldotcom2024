/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { DB } from "../db";

type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

declare namespace App {
  interface Locals extends NetlifyLocals {
    db: DB;
  }
}

interface ImportMetaEnv {
  readonly ASTRO_DB_REMOTE_URL: string;
  readonly ASTRO_DB_APP_TOKEN: string;
  // more env variables...
}
