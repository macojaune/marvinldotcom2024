import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const vote = sqliteTable("vote", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  vote: integer("vote").notNull(),
  projectId: integer("projectId")
    .notNull()
    .references(() => project.id),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
});

export const project = sqliteTable("project", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug"),
  audioUrl: text("audioUrl"),
   transcript: text("transcript", {mode:'json'}).$type<{text:string, segments:{ start: number, end: number, text: string}[] }>(),
  description: text("description"),
  url: text("url"),
  active: integer("active", { mode: "boolean" }).default(false),
  createdAt: integer("createdAt", { mode: "timestamp" }),
});
export type Project = typeof project.$inferSelect & { votes: Vote[] };
export type Vote = typeof vote.$inferSelect;

export const voteRelations = relations(vote, ({ one }) => ({
  project: one(project, {
    fields: [vote.projectId],
    references: [project.id],
  }),
}));

export const projectRelations = relations(project, ({ many }) => ({
  votes: many(vote),
}));
