CREATE TABLE `chapters` (
	`id` varchar(255) NOT NULL,
	`course_id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`order_index` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chapters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`slug` varchar(255) NOT NULL,
	`level` varchar(50) NOT NULL,
	`market_type` varchar(50) NOT NULL,
	`order_index` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `exercise_options` (
	`id` varchar(255) NOT NULL,
	`exercise_id` varchar(255) NOT NULL,
	`option_text` varchar(255) NOT NULL,
	`is_correct` boolean NOT NULL,
	CONSTRAINT `exercise_options_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` varchar(255) NOT NULL,
	`lesson_id` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`chart_data_json` text,
	`question` text NOT NULL,
	`correct_answer` varchar(255) NOT NULL,
	`explanation` text,
	`market` varchar(50) NOT NULL,
	`timeframe` varchar(10) NOT NULL,
	`difficulty` varchar(50) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` varchar(255) NOT NULL,
	`chapter_id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content_json` text NOT NULL,
	`lesson_type` varchar(50) NOT NULL,
	`duration_min` int NOT NULL DEFAULT 5,
	`order_index` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_exercise_attempts` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`exercise_id` varchar(255) NOT NULL,
	`selected_answer` varchar(255) NOT NULL,
	`is_correct` boolean NOT NULL,
	`attempted_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_exercise_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_progress` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`lesson_id` varchar(255) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'completed',
	`completed_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp(3),
	`image` varchar(255),
	`password_hash` varchar(255),
	`role` varchar(50) NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
