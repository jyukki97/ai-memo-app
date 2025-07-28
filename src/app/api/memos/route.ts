import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../lib/db';
import { memos } from '../../../lib/db/schema';
import { eq, desc, and, lt } from 'drizzle-orm';
import { createClient } from '../../../utils/supabase/server';

// 메모 생성을 위한 Zod 스키마
const createMemoSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다'),
  content: z.string().min(1, '내용은 필수입니다').max(10000, '내용은 10000자를 초과할 수 없습니다'),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// 인증 검증 헬퍼 함수
async function validateAuth() {
  const supabase = await createClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session?.user) {
    return { error: '인증이 필요합니다', user: null };
  }
  
  return { error: null, user: session.user };
}

// GET: 메모 목록 조회
export async function GET(request: NextRequest) {
  try {
    // 인증 검증
    const { error: authError, user } = await validateAuth();
    if (authError || !user) {
      return NextResponse.json(
        { error: authError || '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor'); // cursor-based pagination
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50); // 최대 50개

    // 쿼리 조건 구성
    let whereConditions;
    
    if (cursor) {
      whereConditions = and(
        eq(memos.userId, user.id),
        lt(memos.createdAt, new Date(cursor))
      );
    } else {
      whereConditions = eq(memos.userId, user.id);
    }

    // 메모 목록 조회
    const memoList = await db
      .select()
      .from(memos)
      .where(whereConditions)
      .orderBy(desc(memos.createdAt))
      .limit(limit + 1); // 다음 페이지 존재 여부 확인용

    // 페이지네이션 처리
    const hasNextPage = memoList.length > limit;
    const memosToReturn = hasNextPage ? memoList.slice(0, limit) : memoList;
    const nextCursor = hasNextPage && memosToReturn.length > 0 ? 
      memosToReturn[memosToReturn.length - 1]?.createdAt.toISOString() : null;

    return NextResponse.json({
      data: memosToReturn,
      pagination: {
        nextCursor,
        hasNextPage,
        limit,
      },
    });

  } catch (error) {
    console.error('메모 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '메모 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST: 메모 생성
export async function POST(request: NextRequest) {
  try {
    // 인증 검증
    const { error: authError, user } = await validateAuth();
    if (authError || !user) {
      return NextResponse.json(
        { error: authError || '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검사
    const validationResult = createMemoSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: '잘못된 요청 데이터',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { title, content, category, tags } = validationResult.data;

    // 메모 생성
    const now = new Date();
    const newMemo = await db
      .insert(memos)
      .values({
        title,
        content,
        userId: user.id,
        category: category || null,
        tags: tags || [],
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(
      { data: newMemo[0] },
      { status: 201 }
    );

  } catch (error) {
    console.error('메모 생성 오류:', error);
    return NextResponse.json(
      { error: '메모 생성에 실패했습니다' },
      { status: 500 }
    );
  }
} 