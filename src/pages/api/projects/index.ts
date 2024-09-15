import type { APIRoute } from "astro";
import { db } from "../../../../db";

export const POST: APIRoute = async ({ locals }) => {
  const res = await db.query.project.findMany({
    with: { votes: true },
    where: (project, { eq }) => eq(project.active, false),
  });
  return new Response(JSON.stringify(res));
};
