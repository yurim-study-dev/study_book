import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllTils, getTilByDate } from '@/lib/til'
import { TAG_COLORS } from '@/components/TilCard'
import { MarkdownContent } from '@/components/MarkdownContent'
import { TableOfContents } from '@/components/TableOfContents'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ date: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const tils = await getAllTils()
  return tils.map(t => ({ date: t.date }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params
  const til = await getTilByDate(date)
  if (!til) return {}
  return { title: `${til.date} | Study Book`, description: til.title }
}

export default async function TilDetailPage({ params }: Props) {
  const { date } = await params
  const til = await getTilByDate(date)
  if (!til) notFound()

  const [year, month, day] = til.date.split('-')
  const displayDate = `${year}년 ${month}월 ${day}일`

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-200 pb-6 dark:border-slate-700">
        <Link
          href="/til"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          ← TIL 목록으로
        </Link>
        <time className="block text-sm font-medium text-slate-500 dark:text-slate-400">
          {displayDate}
        </time>
        <h1 className="text-2xl font-bold leading-snug text-slate-900 dark:text-slate-50">
          {til.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {til.tags.map(tag => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? TAG_COLORS.TIL}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <MarkdownContent html={til.contentHtml} />
      <TableOfContents />

      {/* Prev / Next */}
      <nav className="flex justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-700">
        {til.prevDate ? (
          <Link
            href={`/til/${til.prevDate}`}
            className="group flex max-w-[45%] flex-col gap-1 rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600"
          >
            <span className="text-xs text-slate-400">← 이전 글</span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
              {til.prevDate}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {til.nextDate ? (
          <Link
            href={`/til/${til.nextDate}`}
            className="group ml-auto flex max-w-[45%] flex-col items-end gap-1 rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600"
          >
            <span className="text-xs text-slate-400">다음 글 →</span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
              {til.nextDate}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}
