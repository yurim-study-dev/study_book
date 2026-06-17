'use client'

import { useEffect, useState } from 'react'
import type { TilMeta } from '@/lib/til'
import { TilCard, TAG_COLORS } from '@/components/TilCard'

const ALL_TAGS = ['Java', 'SQL', 'Database', 'Algorithm', 'Spring', 'TIL']

export default function TilListPage() {
  const [tils, setTils] = useState<TilMeta[]>([])
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/tils')
      .then(r => r.json())
      .then(setTils)
  }, [])

  const filtered = tils.filter(til => {
    const matchesSearch =
      search === '' ||
      til.title.toLowerCase().includes(search.toLowerCase()) ||
      til.date.includes(search)
    const matchesTag = activeTag === null || til.tags.includes(activeTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">TIL 목록</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          총 {tils.length}개의 학습 기록
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="날짜 또는 키워드로 검색..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
      />

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            activeTag === null
              ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
          }`}
        >
          전체
        </button>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              activeTag === tag
                ? TAG_COLORS[tag]
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Result */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-slate-400 dark:text-slate-500">
          검색 결과가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map(til => (
            <TilCard key={til.date} {...til} />
          ))}
        </div>
      )}
    </div>
  )
}
