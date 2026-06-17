import Link from 'next/link'
import type { TilMeta } from '@/lib/til'

const TAG_COLORS: Record<string, string> = {
  Java: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300',
  SQL: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300',
  Database: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  Algorithm: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  Spring: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300',
  TIL: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
}

export function TilCard({ date, title, tags }: TilMeta) {
  const [year, month, day] = date.split('-')
  const displayDate = `${year}.${month}.${day}`

  return (
    <Link href={`/til/${date}`}>
      <article className="group relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md dark:border-indigo-900/30 dark:bg-slate-800/60 dark:hover:border-indigo-500/40 dark:hover:bg-slate-800">
        <time className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {displayDate}
        </time>
        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
          {title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAG_COLORS[tag] ?? TAG_COLORS.TIL}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}

export { TAG_COLORS }
