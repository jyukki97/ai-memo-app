# Memora - AI 음성 메모장 웹서비스

Memora는 AI 기반 웹 메모 애플리케이션으로, 음성 또는 텍스트 입력을 받아 AI가 자동으로 요약 및 분류해주는 기능을 제공합니다.

## 🚀 기술 스택

- **Frontend & Backend**: Next.js 15.4.4 (App Router)
- **언어**: TypeScript 5.0+
- **스타일링**: Tailwind CSS 4.0+
- **데이터베이스**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **인증**: Supabase Auth
- **AI 서비스**: Anthropic Claude API
- **상태 관리**: Zustand
- **UI 컴포넌트**: shadcn/ui
- **배포**: Vercel

## 📋 필수 요구사항

- **Node.js**: 18.18.0+ 또는 20.0.0+ (현재 18.16.0은 지원되지 않음)
- **npm**: 9.0.0+

## 🛠️ 설치 및 실행

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd ai-memo-app
npm install
```

### 2. 환경변수 설정

루트 디렉토리에 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Service
ANTHROPIC_API_KEY=your_anthropic_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Memora

# Development
NODE_ENV=development
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 스크립트

- `npm run dev` - 개발 서버 실행 (Turbopack 활성화)
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행
- `npm run lint:fix` - ESLint 실행 및 자동 수정
- `npm run type-check` - TypeScript 타입 체크
- `npm run format` - Prettier로 코드 포맷팅
- `npm run format:check` - Prettier 포맷 검사

## 🏗️ 프로젝트 구조

```
ai-memo-app/
├── src/
│   ├── app/              # App Router 페이지
│   ├── components/       # 재사용 컴포넌트
│   ├── lib/             # 유틸리티 함수
│   ├── store/           # Zustand 스토어
│   └── types/           # TypeScript 타입 정의
├── public/              # 정적 파일
├── .taskmaster/         # 프로젝트 관리 파일
└── ...
```

## 🔧 개발 환경 설정

### ESLint
프로젝트는 Next.js 권장 ESLint 설정을 사용합니다:
- TypeScript 엄격 모드
- React 권장 규칙
- 코드 품질 규칙

### Prettier
일관된 코드 스타일을 위해 Prettier를 사용합니다:
- 세미콜론 사용
- 싱글 쿼트
- 2 스페이스 들여쓰기
- Tailwind CSS 클래스 자동 정렬

## 🚀 배포

이 프로젝트는 Vercel에 최적화되어 있습니다:

1. Vercel에 프로젝트 연결
2. 환경변수 설정
3. 자동 배포

## 📚 개발 로드맵

현재 프로젝트는 Taskmaster를 통해 관리되고 있습니다:

1. ✅ **Next.js 14 프로젝트 초기 설정** (완료)
2. 🔄 **Tailwind CSS 및 shadcn/ui 구축** (다음 단계)
3. 📋 **Supabase 데이터베이스 설정**
4. 🔐 **인증 시스템 구현**
5. 📝 **메모 CRUD 기능**
6. 🎤 **음성 인식 기능**
7. 🤖 **AI 요약 및 분류**
8. 🔍 **검색 및 필터링**

## 🤝 기여하기

1. 이슈 확인 또는 새 이슈 생성
2. 브랜치 생성 (`git checkout -b feature/새기능`)
3. 변경사항 커밋 (`git commit -m 'feat: 새 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/새기능`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
