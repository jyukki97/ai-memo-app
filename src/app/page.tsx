import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <h1 className="text-2xl font-bold">Memora</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">로그인</Button>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="사용자" />
              <AvatarFallback>사용자</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">AI 음성 메모장</h2>
          <p className="text-xl text-muted-foreground mb-8">
            음성이나 텍스트로 메모하면 AI가 자동으로 요약하고 분류해드립니다
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              🎤 음성 메모 시작
            </Button>
            <Button variant="outline" size="lg">
              ✏️ 텍스트 메모 작성
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎤 음성 인식
              </CardTitle>
              <CardDescription>
                실시간 음성을 텍스트로 변환
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                웹 브라우저의 음성 인식 기능을 활용하여 빠르고 정확하게 메모를 작성할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🤖 AI 요약
              </CardTitle>
              <CardDescription>
                긴 메모를 핵심만 간추려 요약
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Anthropic Claude AI가 메모의 핵심 내용을 파악하여 간결하고 명확한 요약을 제공합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📁 자동 분류
              </CardTitle>
              <CardDescription>
                메모를 주제별로 자동 정리
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                메모 내용을 분석하여 적절한 카테고리와 태그를 자동으로 생성해 체계적으로 관리합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>메모 검색</CardTitle>
            <CardDescription>
              키워드, 카테고리, 날짜로 메모를 빠르게 찾아보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder="메모 내용, 키워드, 카테고리로 검색..." 
                className="flex-1"
              />
              <Button>검색</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Memos */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">최근 메모</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder memo cards */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">메모 제목 {i}</CardTitle>
                    <span className="text-xs text-muted-foreground">2시간 전</span>
                  </div>
                  <CardDescription>
                    카테고리: 회의록
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    이것은 샘플 메모입니다. AI가 요약한 내용이 여기에 표시됩니다...
                  </p>
                  <div className="flex gap-1 mt-2">
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                      중요
                    </span>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                      작업
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Memora. AI 기반 음성 메모장 서비스</p>
        </div>
      </footer>
    </div>
  );
}
