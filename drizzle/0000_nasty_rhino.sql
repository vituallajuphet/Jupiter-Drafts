CREATE TABLE `jupinotes_account` (
	`user_id` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `jupinotes_account_provider_provider_account_id_pk` PRIMARY KEY(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `jupinotes_notes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(256),
	`contents` text,
	`created_by` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `jupinotes_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jupinotes_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`created_by` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `jupinotes_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jupinotes_session` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `jupinotes_session_session_token` PRIMARY KEY(`session_token`)
);
--> statement-breakpoint
CREATE TABLE `jupinotes_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `jupinotes_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jupinotes_verification_token` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `jupinotes_verification_token_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `jupinotes_account` ADD CONSTRAINT `jupinotes_account_user_id_jupinotes_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `jupinotes_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jupinotes_notes` ADD CONSTRAINT `jupinotes_notes_created_by_jupinotes_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `jupinotes_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jupinotes_post` ADD CONSTRAINT `jupinotes_post_created_by_jupinotes_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `jupinotes_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jupinotes_session` ADD CONSTRAINT `jupinotes_session_user_id_jupinotes_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `jupinotes_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `jupinotes_account` (`user_id`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `jupinotes_post` (`created_by`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `jupinotes_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `jupinotes_session` (`user_id`);