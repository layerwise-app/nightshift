CREATE TABLE `contact_messages` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`sender_hash` text NOT NULL,
	`email_status` text DEFAULT 'skipped' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `contact_messages_sender_created_idx` ON `contact_messages` (`sender_hash`,`created_at`);--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
DROP TABLE `verification`;