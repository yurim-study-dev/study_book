import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllLectures, getLectureBySlug } from '@/lib/lecture'
import { MarkdownContent } from '@/components/MarkdownContent'
import { TableOfContents } from '@/components/TableOfContents'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const lectures = await getAllLectures()
  return lectures.map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lecture = await getLectureBySlug(slug)
  if (!lecture) return {}
  return { title: `${lecture.title} | Study Book`, description: `강의 자료 ${lecture.slug}` }
}

export default async function LectureDetailPage({ params }: Props) {
  const { slug } = await params
  const lecture = await getLectureBySlug(slug)
  if (!lecture) notFound()

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-200 pb-6 dark:border-slate-700">
        <Link
          href="/lecture"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          ← 강의 자료 목록으로
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
            {String(lecture.order).padStart(2, '0')}
          </span>
          <h1 className="text-2xl font-bold leading-snug text-slate-900 dark:text-slate-50">
            {lecture.title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <MarkdownContent html={lecture.contentHtml} />
      <TableOfContents />

      {/* Prev / Next */}
      <nav className="flex justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-700">
        {lecture.prevSlug ? (
          <Link
            href={`/lecture/${lecture.prevSlug}`}
            className="group flex max-w-[45%] flex-col gap-1 rounded-lg border border-slate-200 p-4 transition hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-600"
          >
            <span className="text-xs text-slate-400">← 이전 강의</span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400">
              {lecture.prevSlug}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {lecture.nextSlug ? (
          <Link
            href={`/lecture/${lecture.nextSlug}`}
            className="group ml-auto flex max-w-[45%] flex-col items-end gap-1 rounded-lg border border-slate-200 p-4 transition hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-600"
          >
            <span className="text-xs text-slate-400">다음 강의 →</span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400">
              {lecture.nextSlug}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  )
}
