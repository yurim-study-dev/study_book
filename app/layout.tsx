import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import './globals.css'

const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Study Book | 유림의 TIL',
  description: 'Java 부트캠프 학습 기록 블로그 — Today I Learned',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning className={geistMono.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 dark:bg-[#060c18] dark:text-slate-100">
        <ThemeProvider>
          <Header />
          <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
          <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
            © 2026 Study Book · Built with Next.js &amp; Tailwind CSS
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
