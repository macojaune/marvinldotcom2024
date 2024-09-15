CREATE TABLE `project` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`audioUrl` text,
	`description` text,
	`url` text,
	`active` integer DEFAULT false,
	`createdAt` integer
);
--> statement-breakpoint
CREATE TABLE `vote` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vote` integer,
	`projectId` integer,
	`createdAt` integer
);
