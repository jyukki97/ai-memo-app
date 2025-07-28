# 데이터베이스 설정 가이드

## Supabase 설정

### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 로그인
2. 새 프로젝트 생성
3. 프로젝트 이름: `ai-memo-app`
4. 데이터베이스 비밀번호 설정 (기억해두세요!)

### 2. 환경 변수 설정
`.env.local` 파일에 다음 정보를 추가하세요:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database URL for Drizzle
DATABASE_URL=postgresql://postgres.your-project-ref:[YOUR-PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres

# Feature flags
NEXT_PUBLIC_ENABLED_FEATURES=voice-memo,ai-summary,auto-categorization
```

### 3. 데이터베이스 스키마 적용

```bash
# 마이그레이션 생성
npm run db:generate

# 데이터베이스에 스키마 적용
npm run db:push

# Drizzle Studio 실행 (선택사항)
npm run db:studio
```

## 데이터베이스 스키마

### Users 테이블
- `id`: UUID (Primary Key)
- `email`: VARCHAR(255) (Unique)
- `name`: VARCHAR(100)
- `avatarUrl`: TEXT
- `createdAt`: TIMESTAMP
- `updatedAt`: TIMESTAMP

### Memos 테이블
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key to users.id)
- `title`: VARCHAR(255)
- `content`: TEXT
- `summary`: TEXT (AI-generated)
- `category`: VARCHAR(50)
- `tags`: JSONB (Array of strings)
- `audioUrl`: TEXT (Optional)
- `isFavorite`: BOOLEAN
- `isArchived`: BOOLEAN
- `metadata`: JSONB
- `createdAt`: TIMESTAMP
- `updatedAt`: TIMESTAMP

### Tags 테이블
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key to users.id)
- `name`: VARCHAR(50)
- `color`: VARCHAR(7) (Hex color)
- `createdAt`: TIMESTAMP

### Memo_Tags 테이블 (Junction)
- `id`: UUID (Primary Key)
- `memoId`: UUID (Foreign Key to memos.id)
- `tagId`: UUID (Foreign Key to tags.id)
- `createdAt`: TIMESTAMP

## 인덱스
- `users.email_idx`: 이메일 검색 최적화
- `memos.user_id_idx`: 사용자별 메모 검색
- `memos.category_idx`: 카테고리별 검색
- `memos.created_at_idx`: 날짜순 정렬
- `memos.favorite_idx`: 즐겨찾기 필터링
- `tags.user_id_name_idx`: 사용자별 태그 검색
- `memo_tags.memo_tag_idx`: 메모-태그 관계 검색

## 사용법

### 데이터베이스 연결 테스트
```bash
npx tsx src/lib/db/test-connection.ts
```

### 쿼리 함수 사용 예시
```typescript
import { getUserById, createMemo, getMemosByUserId } from '@/lib/db/queries'

// 사용자 조회
const user = await getUserById('user-id')

// 메모 생성
const memo = await createMemo({
  userId: 'user-id',
  title: '새 메모',
  content: '메모 내용...',
  category: '개인'
})

// 사용자의 메모 목록 조회
const memos = await getMemosByUserId('user-id', {
  limit: 10,
  category: '개인',
  search: '검색어'
})
```

## 주의사항

1. **보안**: `.env.local` 파일을 Git에 커밋하지 마세요
2. **백업**: 중요한 데이터는 정기적으로 백업하세요
3. **성능**: 대용량 데이터의 경우 인덱스를 추가로 생성하세요
4. **마이그레이션**: 스키마 변경 시 마이그레이션을 생성하고 테스트하세요
