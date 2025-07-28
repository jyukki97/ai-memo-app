import { NextRequest } from 'next/server'
import { updateSession } from './src/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  // 보호된 라우트 패턴 정의
  const protectedPaths = ['/dashboard', '/memo', '/profile', '/settings']
  const authPaths = ['/auth/signin', '/auth/signup']
  const currentPath = request.nextUrl.pathname

  // 보호된 라우트에 접근하려는 경우
  if (protectedPaths.some(path => currentPath.startsWith(path))) {
    if (!user) {
      // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
      const url = request.nextUrl.clone()
      url.pathname = '/auth/signin'
      url.searchParams.set('redirectTo', currentPath)
      return Response.redirect(url)
    }
  }

  // 이미 로그인한 사용자가 인증 페이지에 접근하려는 경우
  if (authPaths.some(path => currentPath.startsWith(path))) {
    if (user) {
      // 로그인된 사용자는 대시보드로 리다이렉트
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return Response.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청과 매치됩니다:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     * - API 라우트 (선택적으로 보호)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 