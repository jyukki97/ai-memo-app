import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { MemoStore, Memo } from '../types/store';

// 메모 스토어의 초기 상태
const initialState = {
  memos: [] as Memo[],
  currentMemo: null as Memo | null,
  isLoading: false,
  error: null as string | null,
};

export const useMemoStore = create<MemoStore>()(
  devtools(
    persist(
      immer((set) => ({
        // 상태
        ...initialState,

        // 액션 함수들
        fetchMemos: async () => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // TODO: API 호출 로직 구현 (6번 작업 완료 후)
            const response = await fetch('/api/memos');
            if (!response.ok) {
              throw new Error('메모 목록을 불러오는데 실패했습니다.');
            }
            
            const memos = await response.json();
            
            set((state) => {
              state.memos = memos;
              state.isLoading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
              state.isLoading = false;
            });
          }
        },

        createMemo: async (memo: Omit<Memo, 'id' | 'createdAt' | 'updatedAt'>) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // TODO: API 호출 로직 구현 (6번 작업 완료 후)
            const response = await fetch('/api/memos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(memo),
            });

            if (!response.ok) {
              throw new Error('메모 생성에 실패했습니다.');
            }

            const newMemo = await response.json();
            
            set((state) => {
              state.memos.unshift(newMemo); // 최신 메모를 맨 앞에 추가
              state.isLoading = false;
              state.currentMemo = newMemo;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
              state.isLoading = false;
            });
          }
        },

        updateMemo: async (id: string, updates: Partial<Memo>) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // TODO: API 호출 로직 구현 (6번 작업 완료 후)
            const response = await fetch(`/api/memos/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updates),
            });

            if (!response.ok) {
              throw new Error('메모 수정에 실패했습니다.');
            }

            const updatedMemo = await response.json();
            
            set((state) => {
              const index = state.memos.findIndex((memo) => memo.id === id);
              if (index !== -1) {
                state.memos[index] = updatedMemo;
              }
              if (state.currentMemo?.id === id) {
                state.currentMemo = updatedMemo;
              }
              state.isLoading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
              state.isLoading = false;
            });
          }
        },

        deleteMemo: async (id: string) => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });

          try {
            // TODO: API 호출 로직 구현 (6번 작업 완료 후)
            const response = await fetch(`/api/memos/${id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('메모 삭제에 실패했습니다.');
            }
            
            set((state) => {
              state.memos = state.memos.filter((memo) => memo.id !== id);
              if (state.currentMemo?.id === id) {
                state.currentMemo = null;
              }
              state.isLoading = false;
            });
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
              state.isLoading = false;
            });
          }
        },

        setCurrentMemo: (memo: Memo | null) => {
          set((state) => {
            state.currentMemo = memo;
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
        name: 'memo-store',
        partialize: (state) => ({
          memos: state.memos,
          currentMemo: state.currentMemo,
        }),
      }
    ),
    {
      name: 'memo-store',
    }
  )
); 