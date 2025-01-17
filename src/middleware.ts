import { defineMiddleware } from "astro:middleware";
import {db} from "./db";

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.db = db;
  return next();
});
