import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../../lib/db';
import { memos } from '../../../../lib/db/schema';
import { eq } from 'drizzle-orm';
import { createClient } from '../../../../utils/supabase/server';

// 메모 수정을 위한 Zod 스키마
const updateMemoSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자를 초과할 수 없습니다').optional(),
  content: z.string().min(1, '내용은 필수입니다').max(10000, '내용은 10000자를 초과할 수 없습니다').optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFavorite: z.boolean().optional(),
  isArchived: z.boolean().optional(),
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

// 메모 소유자 검증 헬퍼 함수
async function validateMemoOwnership(memoId: string, userId: string) {
  const memo = await db
    .select()
    .from(memos)
    .where(eq(memos.id, memoId))
    .limit(1);

  if (memo.length === 0) {
    return { error: '메모를 찾을 수 없습니다', memo: null };
  }

  if (memo[0]?.userId !== userId) {
    return { error: '이 메모에 접근할 권한이 없습니다', memo: null };
  }

  return { error: null, memo: memo[0] };
}

// GET: 개별 메모 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 인증 검증
    const { error: authError, user } = await validateAuth();
    if (authError || !user) {
      return NextResponse.json(
        { error: authError || '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // 메모 소유자 검증
    const { error: ownershipError, memo } = await validateMemoOwnership(params.id, user.id);
    if (ownershipError || !memo) {
      const status = ownershipError === '메모를 찾을 수 없습니다' ? 404 : 403;
      return NextResponse.json(
        { error: ownershipError },
        { status }
      );
    }

    return NextResponse.json({ data: memo });

  } catch (error) {
    console.error('메모 조회 오류:', error);
    return NextResponse.json(
      { error: '메모를 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// PUT: 메모 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 인증 검증
    const { error: authError, user } = await validateAuth();
    if (authError || !user) {
      return NextResponse.json(
        { error: authError || '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // 메모 소유자 검증
    const { error: ownershipError, memo } = await validateMemoOwnership(params.id, user.id);
    if (ownershipError || !memo) {
      const status = ownershipError === '메모를 찾을 수 없습니다' ? 404 : 403;
      return NextResponse.json(
        { error: ownershipError },
        { status }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    
    // 데이터 유효성 검사
    const validationResult = updateMemoSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: '잘못된 요청 데이터',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const updateData = validationResult.data;

    // 업데이트할 데이터가 없는 경우
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: '업데이트할 데이터가 없습니다' },
        { status: 400 }
      );
    }

    // 메모 수정
    const updatedMemo = await db
      .update(memos)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(memos.id, params.id))
      .returning();

    return NextResponse.json({ data: updatedMemo[0] });

  } catch (error) {
    console.error('메모 수정 오류:', error);
    return NextResponse.json(
      { error: '메모 수정에 실패했습니다' },
      { status: 500 }
    );
  }
}

// DELETE: 메모 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 인증 검증
    const { error: authError, user } = await validateAuth();
    if (authError || !user) {
      return NextResponse.json(
        { error: authError || '인증이 필요합니다' },
        { status: 401 }
      );
    }

    // 메모 소유자 검증
    const { error: ownershipError, memo } = await validateMemoOwnership(params.id, user.id);
    if (ownershipError || !memo) {
      const status = ownershipError === '메모를 찾을 수 없습니다' ? 404 : 403;
      return NextResponse.json(
        { error: ownershipError },
        { status }
      );
    }

    // 메모 삭제
    await db
      .delete(memos)
      .where(eq(memos.id, params.id));

    return NextResponse.json(
      { message: '메모가 성공적으로 삭제되었습니다' },
      { status: 200 }
    );

  } catch (error) {
    console.error('메모 삭제 오류:', error);
    return NextResponse.json(
      { error: '메모 삭제에 실패했습니다' },
      { status: 500 }
    );
  }
} 