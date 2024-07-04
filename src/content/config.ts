import { defineCollection, z } from "astro:content";
const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    technos: z.array(z.string()),
    isClient: z.boolean(),
    isDraft: z.boolean(),
    updatedAt: z.date(),
    createdAt: z.date(),
  }),
});
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    isDraft: z.boolean(),
    updatedAt: z.date(),
    createdAt: z.date(),
  }),
});

export const collections = { project: projectCollection, blog: blogCollection };
