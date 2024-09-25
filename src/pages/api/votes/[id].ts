import type { APIRoute } from "astro";
import { db } from "../../../db";
import {vote} from "../../../db/schema";


export const prerender = false;

export const POST: APIRoute = async ({ params, locals }) => {
  const res = await db.insert(vote).values({
    projectId: parseInt(params.id),
    vote: 1,
  });
  console.log('voted: '+params.id)
  return new Response(null, { status: 201 });
};
