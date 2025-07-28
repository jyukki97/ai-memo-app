// Memo 인터페이스 정의
export interface Memo {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string;
  tags?: string[];
}

// User 인터페이스 정의
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

// 메모 스토어 상태 인터페이스
export interface MemoState {
  memos: Memo[];
  currentMemo: Memo | null;
  isLoading: boolean;
  error: string | null;
}

// 메모 스토어 액션 인터페이스
export interface MemoActions {
  fetchMemos: () => Promise<void>;
  createMemo: (memo: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateMemo: (id: string, updates: Partial<Memo>) => Promise<void>;
  deleteMemo: (id: string) => Promise<void>;
  setCurrentMemo: (memo: Memo | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

// 인증 스토어 상태 인터페이스
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// 인증 스토어 액션 인터페이스
export interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

// 통합 스토어 타입
export type MemoStore = MemoState & MemoActions;
export type AuthStore = AuthState & AuthActions; 