import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { ComponentShowcase } from '@/components/component-showcase';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="h-10 w-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-brand">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-3xl font-bold text-brand-gradient">Memora</h1>
          </div>
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <ThemeToggle />
            <Button variant="outline" className="transition-colors-smooth">로그인</Button>
            <Avatar className="transition-all-smooth hover:scale-105">
              <AvatarImage src="/placeholder-avatar.jpg" alt="사용자" />
              <AvatarFallback className="bg-brand-gradient text-white">사용자</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            <span className="text-brand-gradient">AI</span> 음성 메모장
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
            음성이나 텍스트로 메모하면 AI가 자동으로 요약하고 분류해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="brand"
            >
              🎤 음성 메모 시작
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="transition-all-smooth hover:shadow-brand text-lg px-8 py-6 rounded-xl border-2"
            >
              ✏️ 텍스트 메모 작성
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card variant="glass" className="group">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-brand-primary transition-colors-smooth">
                <span className="text-3xl">🎤</span>
                음성 인식
              </CardTitle>
              <CardDescription className="text-base">
                실시간 음성을 텍스트로 변환
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                웹 브라우저의 음성 인식 기능을 활용하여 빠르고 정확하게 메모를 작성할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass" className="group">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-brand-primary transition-colors-smooth">
                <span className="text-3xl">🤖</span>
                AI 요약
              </CardTitle>
              <CardDescription className="text-base">
                긴 메모를 핵심만 간추려 요약
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Anthropic Claude AI가 메모의 핵심 내용을 파악하여 간결하고 명확한 요약을 제공합니다.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass" className="group">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-brand-primary transition-colors-smooth">
                <span className="text-3xl">📁</span>
                자동 분류
              </CardTitle>
              <CardDescription className="text-base">
                메모를 주제별로 자동 정리
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                메모 내용을 분석하여 적절한 카테고리와 태그를 자동으로 생성해 체계적으로 관리합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card variant="glass" className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-brand-gradient">메모 검색</CardTitle>
            <CardDescription className="text-lg">
              키워드, 카테고리, 날짜로 메모를 빠르게 찾아보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="메모 내용, 키워드, 카테고리로 검색..." 
                className="flex-1 transition-all-smooth focus:shadow-brand rounded-lg border-2"
              />
              <Button variant="brand" className="rounded-lg px-6">
                검색
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Memos */}
        <div className="animate-fade-in mb-16">
          <h3 className="text-3xl font-semibold mb-8 text-brand-gradient">최근 메모</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder memo cards */}
            {[1, 2, 3].map((i) => (
              <Card 
                key={i} 
                variant="glass"
                className="cursor-pointer transition-all-smooth hover:shadow-brand-lg hover:-translate-y-2 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-brand-primary transition-colors-smooth">
                      메모 제목 {i}
                    </CardTitle>
                    <Badge variant="glass" size="sm">
                      2시간 전
                    </Badge>
                  </div>
                  <CardDescription className="text-brand-accent font-medium">
                    카테고리: 회의록
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed mb-3">
                    이것은 샘플 메모입니다. AI가 요약한 내용이 여기에 표시됩니다...
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="brand" size="sm">
                      중요
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      작업
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Component Showcase */}
        <ComponentShowcase />
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 glass">
        <div className="container-custom py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-brand-gradient">Memora</span>
          </div>
          <p className="text-muted-foreground text-lg">
            &copy; 2024 Memora. AI 기반 음성 메모장 서비스
          </p>
        </div>
      </footer>
    </div>
  );
}
