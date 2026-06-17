import { getAllTils, COURSE_START_DATE } from '@/lib/til'

export const revalidate = 3600

const SKILLS = [
  { name: 'Java', desc: '기초 문법, OOP, 컬렉션 프레임워크' },
  { name: 'SQL', desc: 'SELECT, JOIN, 서브쿼리, 집계함수' },
  { name: 'Database', desc: '트랜잭션, ACID, TCL, 인덱스' },
  { name: 'Next.js', desc: 'App Router, SSG, React 19' },
  { name: 'TypeScript', desc: '타입 시스템, 인터페이스' },
  { name: 'Tailwind CSS', desc: '유틸리티 퍼스트 CSS' },
]

export default async function AboutPage() {
  const allTils = await getAllTils()
  const totalDays = allTils.length

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">About</h1>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">안녕하세요! 👋</p>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
            Java 부트캠프를 수강 중인 개발자 지망생입니다.
            매일 배운 내용을 TIL로 기록하며 꾸준히 성장하고 있습니다.
            이 블로그는 학습 기록을 모아두는 포트폴리오 프로젝트입니다.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/yurim-study-dev/java_rim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              🐙 GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Learning Stats */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">학습 현황</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs font-medium text-slate-400">학습 시작일</p>
            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {COURSE_START_DATE.replace(/-/g, '.')}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs font-medium text-slate-400">총 TIL 작성</p>
            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalDays}개
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">학습 중인 기술</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SKILLS.map(({ name, desc }) => (
            <div
              key={name}
              className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <p className="font-semibold text-slate-800 dark:text-slate-100">{name}</p>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* This site */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">이 사이트는</h2>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/30 dark:bg-blue-900/10">
          <ul className="space-y-1.5 text-sm text-blue-800 dark:text-blue-300">
            <li>• Next.js 16 (App Router) + TypeScript로 제작</li>
            <li>• Tailwind CSS v4로 스타일링</li>
            <li>• GitHub에서 TIL을 실시간으로 가져와 렌더링 (ISR 1시간)</li>
            <li>• Vercel로 배포</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
