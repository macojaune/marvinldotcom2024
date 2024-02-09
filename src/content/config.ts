import { defineCollection, z } from "astro:content";
const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    isClient: z.boolean(),
  }),
});
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
  }),
});

export const collections = { project: projectCollection, blog: blogCollection };
