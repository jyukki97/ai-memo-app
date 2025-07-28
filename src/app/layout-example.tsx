"use client"

import { Layout } from '@/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Stack, Inline, Grid, Center, Spacer } from '@/components/ui/slot-composition'

export default function LayoutExample() {
  return (
    <Layout variant="default" spacing="normal">
      {/* Header with compound components */}
      <Layout.Header variant="glass" size="default">
        <Layout.Brand asLink href="/">
          <div className="h-10 w-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-brand">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-gradient">Memora</h1>
        </Layout.Brand>
        
        <Layout.Navigation>
          <Button variant="ghost">기능</Button>
          <Button variant="ghost">가격</Button>
          <Button variant="ghost">문서</Button>
        </Layout.Navigation>
        
        <Layout.Actions>
          <ThemeToggle />
          <Button variant="outline">로그인</Button>
          <Avatar className="transition-all-smooth hover:scale-105">
            <AvatarImage src="/placeholder-avatar.jpg" alt="사용자" />
            <AvatarFallback className="bg-brand-gradient text-white">사용자</AvatarFallback>
          </Avatar>
        </Layout.Actions>
      </Layout.Header>

      {/* Main content using layout composition */}
      <Layout.Main padding="lg" maxWidth="full">
        <Layout.Section spacing="xl">
          {/* Hero Section with Center composition */}
          <Center axis="horizontal" className="text-center">
            <Stack spacing="lg" align="center" className="max-w-4xl">
              <h2 className="text-5xl md:text-6xl font-bold text-balance">
                <span className="text-brand-gradient">AI</span> 음성 메모장
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground text-pretty">
                음성이나 텍스트로 메모하면 AI가 자동으로 요약하고 분류해드립니다
              </p>
              <Inline spacing="md" wrap>
                <Button size="lg" variant="brand">
                  🎤 음성 메모 시작
                </Button>
                <Button size="lg" variant="outline">
                  ✏️ 텍스트 메모 작성
                </Button>
              </Inline>
            </Stack>
          </Center>

          <Spacer size="2xl" />

          {/* Features Grid using Grid composition */}
          <Stack spacing="lg">
            <Center axis="horizontal">
              <h3 className="text-3xl font-bold text-brand-gradient">주요 기능</h3>
            </Center>
            
            <Grid 
              cols={3} 
              gap="lg"
              responsive={{ sm: 1, md: 2, lg: 3 }}
              className="animate-fade-in"
            >
              <Card variant="glass" className="group">
                <CardHeader>
                  <Stack spacing="sm">
                    <Inline spacing="sm" align="center">
                      <span className="text-3xl">🎤</span>
                      <CardTitle className="text-xl group-hover:text-brand-primary transition-colors-smooth">
                        음성 인식
                      </CardTitle>
                    </Inline>
                    <CardDescription className="text-base">
                      실시간 음성을 텍스트로 변환
                    </CardDescription>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    웹 브라우저의 음성 인식 기능을 활용하여 빠르고 정확하게 메모를 작성할 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass" className="group">
                <CardHeader>
                  <Stack spacing="sm">
                    <Inline spacing="sm" align="center">
                      <span className="text-3xl">🤖</span>
                      <CardTitle className="text-xl group-hover:text-brand-primary transition-colors-smooth">
                        AI 요약
                      </CardTitle>
                    </Inline>
                    <CardDescription className="text-base">
                      긴 메모를 핵심만 간추려 요약
                    </CardDescription>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Anthropic Claude AI가 메모의 핵심 내용을 파악하여 간결하고 명확한 요약을 제공합니다.
                  </p>
                </CardContent>
              </Card>

              <Card variant="glass" className="group">
                <CardHeader>
                  <Stack spacing="sm">
                    <Inline spacing="sm" align="center">
                      <span className="text-3xl">📁</span>
                      <CardTitle className="text-xl group-hover:text-brand-primary transition-colors-smooth">
                        자동 분류
                      </CardTitle>
                    </Inline>
                    <CardDescription className="text-base">
                      메모를 주제별로 자동 정리
                    </CardDescription>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    메모 내용을 분석하여 적절한 카테고리와 태그를 자동으로 생성해 체계적으로 관리합니다.
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Stack>

          <Spacer size="xl" />

          {/* Search Section */}
          <Card variant="glass">
            <CardHeader>
              <Stack spacing="sm">
                <CardTitle className="text-2xl text-brand-gradient">메모 검색</CardTitle>
                <CardDescription className="text-lg">
                  키워드, 카테고리, 날짜로 메모를 빠르게 찾아보세요
                </CardDescription>
              </Stack>
            </CardHeader>
            <CardContent>
              <Inline spacing="sm" className="w-full">
                <input 
                  placeholder="메모 내용, 키워드, 카테고리로 검색..." 
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground transition-all-smooth focus:shadow-brand focus:border-brand-accent outline-none"
                />
                <Button variant="brand" className="px-6">
                  검색
                </Button>
              </Inline>
            </CardContent>
          </Card>

          <Spacer size="xl" />

          {/* Recent Memos with composition */}
          <Stack spacing="lg">
            <Center axis="horizontal">
              <h3 className="text-3xl font-semibold text-brand-gradient">최근 메모</h3>
            </Center>
            
            <Grid 
              cols="auto-fit" 
              gap="lg"
              minItemWidth="320px"
              className="animate-fade-in"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card 
                  key={i} 
                  variant="glass"
                  className="cursor-pointer transition-all-smooth hover:shadow-brand-lg hover:-translate-y-2 group"
                >
                  <CardHeader>
                    <Stack spacing="sm">
                                             <Inline align="center" className="justify-between">
                        <CardTitle className="text-lg group-hover:text-brand-primary transition-colors-smooth">
                          메모 제목 {i}
                        </CardTitle>
                        <Badge variant="glass" size="sm">
                          {i}시간 전
                        </Badge>
                      </Inline>
                      <CardDescription className="text-brand-accent font-medium">
                        카테고리: {i % 2 === 0 ? '회의록' : '아이디어'}
                      </CardDescription>
                    </Stack>
                  </CardHeader>
                  <CardContent>
                    <Stack spacing="sm">
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        이것은 샘플 메모 {i}입니다. AI가 요약한 내용이 여기에 표시됩니다. 
                        실제 프로젝트에서는 사용자가 입력한 메모의 요약 내용이 표시됩니다.
                      </p>
                      <Inline spacing="xs" wrap>
                        <Badge variant="brand" size="sm">
                          {i % 3 === 0 ? '중요' : i % 2 === 0 ? '작업' : '개인'}
                        </Badge>
                        {i % 2 === 0 && (
                          <Badge variant="secondary" size="sm">
                            완료
                          </Badge>
                        )}
                        {i % 3 === 0 && (
                          <Badge variant="success" size="sm">
                            공유됨
                          </Badge>
                        )}
                      </Inline>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Layout.Section>
      </Layout.Main>

      {/* Footer */}
      <Layout.Footer variant="glass" size="lg">
        <Stack spacing="md" align="center">
          <Layout.Brand>
            <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-brand-gradient">Memora</span>
          </Layout.Brand>
          
          <Inline spacing="lg" wrap className="text-center">
            <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors-smooth">
              개인정보처리방침
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors-smooth">
              서비스 약관
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-primary transition-colors-smooth">
              고객지원
            </a>
          </Inline>
          
          <p className="text-muted-foreground text-lg">
            &copy; 2024 Memora. AI 기반 음성 메모장 서비스
          </p>
        </Stack>
      </Layout.Footer>
    </Layout>
  )
} 