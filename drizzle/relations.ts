import { relations } from "drizzle-orm/relations";
import { project, vote } from "./schema";

export const voteRelations = relations(vote, ({one}) => ({
	project: one(project, {
		fields: [vote.projectId],
		references: [project.id]
	}),
}));

export const projectRelations = relations(project, ({many}) => ({
	votes: many(vote),
}));