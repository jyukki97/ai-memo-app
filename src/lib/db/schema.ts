import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
}))

// Memos table
export const memos = pgTable('memos', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  summary: text('summary'), // AI-generated summary
  category: varchar('category', { length: 50 }),
  tags: jsonb('tags').$type<string[]>(), // Array of tags
  audioUrl: text('audio_url'), // Optional audio file URL
  isFavorite: boolean('is_favorite').default(false),
  isArchived: boolean('is_archived').default(false),
  metadata: jsonb('metadata').$type<Record<string, any>>(), // Additional metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId),
  categoryIdx: index('category_idx').on(table.category),
  createdAtIdx: index('created_at_idx').on(table.createdAt),
  favoriteIdx: index('favorite_idx').on(table.isFavorite),
}))

// Tags table for better tag management
export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 50 }).notNull(),
  color: varchar('color', { length: 7 }), // Hex color code
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdNameIdx: index('user_id_name_idx').on(table.userId, table.name),
}))

// Memo-Tags junction table for many-to-many relationship
export const memoTags = pgTable('memo_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  memoId: uuid('memo_id').notNull().references(() => memos.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  memoTagIdx: index('memo_tag_idx').on(table.memoId, table.tagId),
}))

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  memos: many(memos),
  tags: many(tags),
}))

export const memosRelations = relations(memos, ({ one, many }) => ({
  user: one(users, {
    fields: [memos.userId],
    references: [users.id],
  }),
  memoTags: many(memoTags),
}))

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  memoTags: many(memoTags),
}))

export const memoTagsRelations = relations(memoTags, ({ one }) => ({
  memo: one(memos, {
    fields: [memoTags.memoId],
    references: [memos.id],
  }),
  tag: one(tags, {
    fields: [memoTags.tagId],
    references: [tags.id],
  }),
}))

// Types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Memo = typeof memos.$inferSelect
export type NewMemo = typeof memos.$inferInsert
export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert
export type MemoTag = typeof memoTags.$inferSelect
export type NewMemoTag = typeof memoTags.$inferInsert
