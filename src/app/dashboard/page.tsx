import { getUser } from '@/lib/auth/actions'
import { redirect } from 'next/navigation'
import AuthStatus from '@/components/auth/auth-status'

export default async function DashboardPage() {
  const { user, error } = await getUser()

  if (error || !user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">대시보드</h1>
          <p className="text-lg text-gray-600 mt-2">
            Memora AI 메모 관리 시스템
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">최근 메모</h2>
              <div className="text-gray-500 text-center py-8">
                아직 메모가 없습니다. 첫 번째 메모를 작성해보세요!
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AuthStatus />
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-3">빠른 작업</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  📝 새 메모 작성
                </button>
                <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  🎤 음성 메모 녹음
                </button>
                <button className="w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  🔍 메모 검색
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-3">통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">총 메모</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">이번 주 작성</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">즐겨찾기</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 