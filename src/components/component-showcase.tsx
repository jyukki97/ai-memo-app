"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function ComponentShowcase() {
  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-brand-gradient">
          Memora 디자인 시스템
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          통일된 브랜드 아이덴티티와 향상된 사용자 경험을 위한 컴포넌트 시스템
        </p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buttons">버튼</TabsTrigger>
          <TabsTrigger value="badges">배지</TabsTrigger>
          <TabsTrigger value="cards">카드</TabsTrigger>
          <TabsTrigger value="other">기타</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-8">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>버튼 Variants</CardTitle>
              <CardDescription>
                다양한 상황에 맞는 버튼 스타일들
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="default">기본</Button>
                <Button variant="brand">브랜드</Button>
                <Button variant="gradient">그라데이션</Button>
                <Button variant="glass">글래스</Button>
                <Button variant="outline">아웃라인</Button>
                <Button variant="secondary">세컨더리</Button>
                <Button variant="ghost">고스트</Button>
                <Button variant="link">링크</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-semibold">사이즈 Variants</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <Button size="sm" variant="brand">작은 버튼</Button>
                  <Button size="default" variant="brand">기본 버튼</Button>
                  <Button size="lg" variant="brand">큰 버튼</Button>
                  <Button size="xl" variant="brand">매우 큰 버튼</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-8">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>배지 Variants</CardTitle>
              <CardDescription>
                상태와 카테고리를 표시하는 배지들
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">기본</Badge>
                <Badge variant="brand">브랜드</Badge>
                <Badge variant="gradient">그라데이션</Badge>
                <Badge variant="glass">글래스</Badge>
                <Badge variant="secondary">세컨더리</Badge>
                <Badge variant="outline">아웃라인</Badge>
                <Badge variant="success">성공</Badge>
                <Badge variant="warning">경고</Badge>
                <Badge variant="info">정보</Badge>
                <Badge variant="destructive">위험</Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-semibold">사이즈 Variants</h4>
                <div className="flex items-center gap-3">
                  <Badge size="sm" variant="brand">작음</Badge>
                  <Badge size="default" variant="brand">기본</Badge>
                  <Badge size="lg" variant="brand">큼</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
                <CardDescription>
                  표준 그림자 효과를 가진 기본 카드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  일반적인 내용을 표시하는 데 사용됩니다.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>향상된 카드</CardTitle>
                <CardDescription>
                  더 강한 그림자 효과를 가진 카드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  중요한 내용을 강조할 때 사용됩니다.
                </p>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>글래스 카드</CardTitle>
                <CardDescription>
                  글래스모피즘 효과를 가진 카드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  모던한 느낌을 주고 싶을 때 사용됩니다.
                </p>
              </CardContent>
            </Card>

            <Card variant="brand">
              <CardHeader>
                <CardTitle>브랜드 카드</CardTitle>
                <CardDescription>
                  브랜드 컬러를 강조한 카드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  브랜드 관련 내용에 사용됩니다.
                </p>
              </CardContent>
            </Card>

            <Card variant="outline">
              <CardHeader>
                <CardTitle>아웃라인 카드</CardTitle>
                <CardDescription>
                  경계선을 강조한 카드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  구분이 필요한 섹션에 사용됩니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>프로그레스 바</CardTitle>
                <CardDescription>
                  작업 진행률을 표시하는 컴포넌트
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>업로드 진행률</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>프로젝트 완성도</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>브랜드 그라데이션</CardTitle>
                <CardDescription>
                  Memora 브랜드의 시그니처 그라데이션
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-20 bg-brand-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">브랜드 그라데이션</span>
                </div>
                <div className="h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">보조 그라데이션</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 