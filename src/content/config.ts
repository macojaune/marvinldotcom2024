import { defineCollection, z } from "astro:content"
const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    technos: z.array(z.string()),
    isClient: z.boolean(),
    isDraft: z.boolean(),
    status: z.enum(["En cours", "Terminé", "En pause"]).optional(),
    types: z
      .array(
        z.enum([
          "Application web",
          "Application mobile",
          "Extension navigateur",
          "Jeu web",
          "Site web"
        ])
      )
      .optional(),
    impact: z.string().optional(),
    updatedAt: z.date(),
    createdAt: z.date()
  })
})
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    isDraft: z.boolean(),
    updatedAt: z.date(),
    createdAt: z.date()
  })
})

export const collections = { project: projectCollection, blog: blogCollection }
