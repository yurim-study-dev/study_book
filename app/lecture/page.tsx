import Link from 'next/link'
import { getAllLectures } from '@/lib/lecture'

export const revalidate = 3600

export default async function LecturePage() {
  const lectures = await getAllLectures()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">강의 자료</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          총 {lectures.length}개의 강의 자료
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {lectures.map(lecture => (
          <Link key={lecture.slug} href={`/lecture/${lecture.slug}`}>
            <article className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-indigo-900/30 dark:bg-slate-800/60 dark:hover:border-indigo-500/40 dark:hover:bg-slate-800">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                {String(lecture.order).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-wide text-slate-800 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                  {lecture.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  {lecture.slug}
                </p>
              </div>
              <span className="text-slate-300 dark:text-slate-600">→</span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
