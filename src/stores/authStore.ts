import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createClient } from '../utils/supabase/client';
import type { AuthStore, User } from '../types/store';

// 인증 스토어의 초기 상태
const initialState = {
  user: null as User | null,
  isAuthenticated: false,
  isLoading: false,
  error: null as string | null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        // 상태
        ...initialState,

        // 액션 함수들
        signIn: async (email: string, password: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error) {
              throw error;
            }

            if (data.user) {
              const user: User = {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name || null,
                avatarUrl: data.user.user_metadata?.avatar_url || null,
              };

              set((state) => {
                state.user = user;
                state.isAuthenticated = true;
                state.isLoading = false;
              });
            }
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '로그인에 실패했습니다.';
              state.isLoading = false;
            });
          }
        },

        signUp: async (email: string, password: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });

            if (error) {
              throw error;
            }

            if (data.user) {
              // 회원가입 성공 시에는 이메일 확인이 필요할 수 있으므로 인증 상태를 false로 유지
              set((state) => {
                state.isLoading = false;
                state.error = null;
              });
            }
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
              state.isLoading = false;
            });
          }
        },

        signOut: async () => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();

            if (error) {
              throw error;
            }

            set((state) => {
              state.user = null;
              state.isAuthenticated = false;
              state.isLoading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
              state.isLoading = false;
            });
          }
        },

        setUser: (user: User | null) => {
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          });
        },

        setError: (error: string | null) => {
          set((state) => {
            state.error = error;
          });
        },

        setLoading: (loading: boolean) => {
          set((state) => {
            state.isLoading = loading;
          });
        },
      })),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// 인증 상태 변경 감지를 위한 초기화 함수
export const initializeAuth = () => {
  const supabase = createClient();
  const { setUser } = useAuthStore.getState();

  // 현재 세션 확인
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      const user: User = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata?.name || null,
        avatarUrl: session.user.user_metadata?.avatar_url || null,
      };
      setUser(user);
    }
  });

  // 인증 상태 변경 구독
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      const user: User = {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata?.name || null,
        avatarUrl: session.user.user_metadata?.avatar_url || null,
      };
      setUser(user);
    } else {
      setUser(null);
    }
  });
}; 