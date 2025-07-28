'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth/actions'

interface LogoutButtonProps {
  children?: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function LogoutButton({ 
  children = '로그아웃', 
  variant = 'outline',
  size = 'default',
  className 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch {
      // 에러는 서버 액션에서 처리됩니다
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? '로그아웃 중...' : children}
    </Button>
  )
} 