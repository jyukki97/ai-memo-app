-- AI Memo App Database Schema
-- Created with Drizzle ORM

-- Users table
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(100),
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Memos table
CREATE TABLE "memos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"summary" text,
	"category" varchar(50),
	"tags" jsonb,
	"audio_url" text,
	"is_favorite" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Tags table
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(50) NOT NULL,
	"color" varchar(7),
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Memo-Tags junction table
CREATE TABLE "memo_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"memo_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Foreign Key Constraints
ALTER TABLE "memo_tags" ADD CONSTRAINT "memo_tags_memo_id_memos_id_fk" 
  FOREIGN KEY ("memo_id") REFERENCES "public"."memos"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "memo_tags" ADD CONSTRAINT "memo_tags_tag_id_tags_id_fk" 
  FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "memos" ADD CONSTRAINT "memos_user_id_users_id_fk" 
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_users_id_fk" 
  FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

-- Indexes for Performance
CREATE INDEX "email_idx" ON "users" USING btree ("email");
CREATE INDEX "user_id_idx" ON "memos" USING btree ("user_id");
CREATE INDEX "category_idx" ON "memos" USING btree ("category");
CREATE INDEX "created_at_idx" ON "memos" USING btree ("created_at");
CREATE INDEX "favorite_idx" ON "memos" USING btree ("is_favorite");
CREATE INDEX "memo_tag_idx" ON "memo_tags" USING btree ("memo_id","tag_id");
CREATE INDEX "user_id_name_idx" ON "tags" USING btree ("user_id","name");
