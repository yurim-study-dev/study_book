import Link from 'next/link'
import { getAllTils, COURSE_START_DATE } from '@/lib/til'
import { TilCard } from '@/components/TilCard'

export const revalidate = 3600

export default async function HomePage() {
  const allTils = await getAllTils()
  const recentTils = allTils.slice(0, 6)
  const totalDays = allTils.length

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative space-y-5 pt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
          ✨ Java 부트캠프 수강 중
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#fef08a] via-[#93c5fd] to-[#1e3a8a] bg-clip-text text-transparent">
            Study Book
          </span>
          <span className="ml-3">📖</span>
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-slate-500 dark:text-slate-400">
          매일 배운 것을 기록합니다. 흘려보내지 않고 쌓아가는 학습 일지.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/til"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            전체 TIL 보기 →
          </Link>
          <a
            href="https://github.com/yurim-study-dev/java_rim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="총 TIL" value={`${totalDays}개`} emoji="📝" />
          <StatCard label="학습 시작일" value={COURSE_START_DATE.replace(/-/g, '.')} emoji="🗓️" />
          <StatCard label="누적 학습일" value={`${totalDays}일`} emoji="🔥" />
        </div>
      </section>

      {/* Recent TIL */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            최근 TIL
            <span className="ml-2 text-sm font-normal text-slate-400">— 최신순</span>
          </h2>
          <Link
            href="/til"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {recentTils.map(til => (
            <TilCard key={til.date} {...til} />
          ))}
        </div>
      </section>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function StatCard({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4 text-center shadow-sm dark:border-teal-900/40 dark:from-slate-800 dark:to-slate-800/60">
      <p className="text-lg">{emoji}</p>
      <p className="mt-1 text-xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</p>
    </div>
  )
}
