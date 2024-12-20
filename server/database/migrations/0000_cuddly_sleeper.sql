CREATE TABLE `machines` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`enabled` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `schedules` (
	`id` integer PRIMARY KEY NOT NULL,
	`machine_id` integer NOT NULL,
	`day` integer NOT NULL,
	`shift` text NOT NULL,
	`user_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`apartment` integer NOT NULL,
	`password` text NOT NULL
);
