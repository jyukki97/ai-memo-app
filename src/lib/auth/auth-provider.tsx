'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const refreshUser = async () => {
    try {
      setError(null)
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        setError(error.message)
        setUser(null)
      } else {
        setUser(user)
      }
    } catch {
      setError('사용자 정보를 가져오는 중 오류가 발생했습니다.')
      setUser(null)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        setError(error.message)
      } else {
        setUser(null)
        // 페이지 새로고침으로 상태 완전 초기화
        window.location.href = '/auth/signin'
      }
    } catch {
      setError('로그아웃 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    // 초기 사용자 세션 확인
    refreshUser().finally(() => setLoading(false))

    // 인증 상태 변경 이벤트 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        setError(null)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setError(null)
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null)
        setError(null)
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user ?? null)
        setError(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const value: AuthContextType = {
    user,
    loading,
    error,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 