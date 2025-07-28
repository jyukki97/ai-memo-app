import { eq, desc, asc, and, or, like, inArray } from 'drizzle-orm'
import { db } from './index'
import { users, memos, tags, memoTags, type User, type Memo, type Tag } from './schema'

// User queries
export async function getUserById(id: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return result[0] || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
  return result[0] || null
}

export async function createUser(userData: { email: string; name?: string; avatarUrl?: string }): Promise<User> {
  const result = await db.insert(users).values(userData).returning()
  return result[0]
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const result = await db.update(users).set(userData).where(eq(users.id, id)).returning()
  return result[0] || null
}

// Memo queries
export async function getMemosByUserId(
  userId: string,
  options: {
    limit?: number
    offset?: number
    category?: string
    isFavorite?: boolean
    isArchived?: boolean
    search?: string
  } = {}
): Promise<Memo[]> {
  const { limit = 50, offset = 0, category, isFavorite, isArchived, search } = options
  
  let query = db.select().from(memos).where(eq(memos.userId, userId))
  
  if (category) {
    query = query.where(eq(memos.category, category))
  }
  
  if (isFavorite !== undefined) {
    query = query.where(eq(memos.isFavorite, isFavorite))
  }
  
  if (isArchived !== undefined) {
    query = query.where(eq(memos.isArchived, isArchived))
  }
  
  if (search) {
    query = query.where(
      or(
        like(memos.title, `%${search}%`),
        like(memos.content, `%${search}%`),
        like(memos.summary, `%${search}%`)
      )
    )
  }
  
  return query.orderBy(desc(memos.createdAt)).limit(limit).offset(offset)
}

export async function getMemoById(id: string): Promise<Memo | null> {
  const result = await db.select().from(memos).where(eq(memos.id, id)).limit(1)
  return result[0] || null
}

export async function createMemo(memoData: {
  userId: string
  title: string
  content: string
  summary?: string
  category?: string
  tags?: string[]
  audioUrl?: string
  metadata?: Record<string, any>
}): Promise<Memo> {
  const result = await db.insert(memos).values(memoData).returning()
  return result[0]
}

export async function updateMemo(id: string, memoData: Partial<Memo>): Promise<Memo | null> {
  const result = await db.update(memos).set(memoData).where(eq(memos.id, id)).returning()
  return result[0] || null
}

export async function deleteMemo(id: string): Promise<boolean> {
  const result = await db.delete(memos).where(eq(memos.id, id)).returning()
  return result.length > 0
}

export async function toggleMemoFavorite(id: string): Promise<Memo | null> {
  const memo = await getMemoById(id)
  if (!memo) return null
  
  const result = await db
    .update(memos)
    .set({ isFavorite: !memo.isFavorite })
    .where(eq(memos.id, id))
    .returning()
  
  return result[0] || null
}

// Tag queries
export async function getTagsByUserId(userId: string): Promise<Tag[]> {
  return db.select().from(tags).where(eq(tags.userId, userId)).orderBy(asc(tags.name))
}

export async function createTag(tagData: { userId: string; name: string; color?: string }): Promise<Tag> {
  const result = await db.insert(tags).values(tagData).returning()
  return result[0]
}

export async function deleteTag(id: string): Promise<boolean> {
  const result = await db.delete(tags).where(eq(tags.id, id)).returning()
  return result.length > 0
}

// Memo-Tag relationship queries
export async function addTagsToMemo(memoId: string, tagIds: string[]): Promise<void> {
  const values = tagIds.map(tagId => ({ memoId, tagId }))
  await db.insert(memoTags).values(values)
}

export async function removeTagsFromMemo(memoId: string, tagIds: string[]): Promise<void> {
  await db.delete(memoTags).where(
    and(
      eq(memoTags.memoId, memoId),
      inArray(memoTags.tagId, tagIds)
    )
  )
}

export async function getMemosWithTags(userId: string): Promise<Array<Memo & { tags: Tag[] }>> {
  // This is a simplified version. In a real app, you might want to use a more complex join
  const userMemos = await getMemosByUserId(userId)
  const userTags = await getTagsByUserId(userId)
  
  // For now, return memos with their tags from the tags array field
  return userMemos.map(memo => ({
    ...memo,
    tags: userTags.filter(tag => memo.tags?.includes(tag.name) || false)
  }))
}

// Statistics queries
export async function getMemoStats(userId: string) {
  const allMemos = await getMemosByUserId(userId, { limit: 1000 })
  
  return {
    total: allMemos.length,
    favorites: allMemos.filter(m => m.isFavorite).length,
    archived: allMemos.filter(m => m.isArchived).length,
    categories: [...new Set(allMemos.map(m => m.category).filter(Boolean))],
    tags: [...new Set(allMemos.flatMap(m => m.tags || []))],
    recentCount: allMemos.filter(m => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(m.createdAt) > weekAgo
    }).length
  }
}
