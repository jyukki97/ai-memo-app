'use client'

import { useAuth } from '@/lib/auth/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LogoutButton from './logout-button'

export default function AuthStatus() {
  const { user, loading, error, refreshUser } = useAuth()

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">로딩 중...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600">오류 발생</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={refreshUser} variant="outline" className="w-full">
            다시 시도
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>로그인이 필요합니다</CardTitle>
          <CardDescription>
            이 기능을 사용하려면 로그인해야 합니다.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>환영합니다!</CardTitle>
        <CardDescription>
          {user.email}로 로그인되었습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>사용자 ID: {user.id}</p>
          <p>이메일 확인: {user.email_confirmed_at ? '완료' : '미완료'}</p>
          <p>
            가입일: {user.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : 'N/A'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshUser} variant="outline" size="sm">
            새로고침
          </Button>
          <LogoutButton size="sm" variant="destructive">
            로그아웃
          </LogoutButton>
        </div>
      </CardContent>
    </Card>
  )
} 