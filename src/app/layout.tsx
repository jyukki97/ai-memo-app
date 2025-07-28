import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memora - AI 음성 메모장",
  description: "음성이나 텍스트로 메모하면 AI가 자동으로 요약하고 분류해주는 스마트 메모 서비스",
  keywords: ["메모", "음성인식", "AI", "요약", "분류", "노트"],
  authors: [{ name: "Memora Team" }],
  creator: "Memora",
  openGraph: {
    title: "Memora - AI 음성 메모장",
    description: "음성이나 텍스트로 메모하면 AI가 자동으로 요약하고 분류해주는 스마트 메모 서비스",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
