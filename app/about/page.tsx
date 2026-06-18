import { getAllTils, COURSE_START_DATE } from '@/lib/til'

export const revalidate = 3600

const SKILLS = [
  { name: 'Java', desc: '기초 문법, OOP, 컬렉션 프레임워크' },
  { name: 'SQL', desc: 'SELECT, JOIN, 서브쿼리, 집계함수' },
  { name: 'Database', desc: '트랜잭션, ACID, TCL, 인덱스' },
  { name: 'Spring', desc: 'Spring Framework, MVC 패턴' },
  { name: 'Algorithm', desc: '자료구조, 정렬, 탐색 알고리즘' },
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
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <GitHubIcon />
              GitHub
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

      {/* Reference Sites */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">📖 참고 사이트</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">자바 학습</p>
            <ul className="space-y-2">
              {[
                { label: '위키독스 점프 투 자바', href: 'https://wikidocs.net/book/31' },
                { label: '위키독스 프로그래밍 입문자를 위한 Java 기초', href: 'https://wikidocs.net/book/2970' },
                { label: 'Oracle Java Tutorials (dev.java)', href: 'https://dev.java/learn' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    <span className="text-xs">↗</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">코딩 테스트</p>
            <ul className="space-y-2">
              {[
                { label: '프로그래머스 코딩 테스트', href: 'https://school.programmers.co.kr/learn/challenges' },
                { label: '자바 기초 트레이닝', href: 'https://school.programmers.co.kr/learn/challenges/training?languages=java' },
                { label: '자바 입문', href: 'https://school.programmers.co.kr/learn/challenges/beginner?languages=java' },
                { label: '자바 레벨 1', href: 'https://school.programmers.co.kr/learn/challenges?languages=java&levels=1' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    <span className="text-xs">↗</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">기타 도구</p>
            <ul className="space-y-2">
              {[
                { label: 'gitignore.io - .gitignore 자동 생성', href: 'https://www.toptal.com/developers/gitignore' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                  >
                    <span className="text-xs">↗</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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

function GitHubIcon() {
  return (
    <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}
