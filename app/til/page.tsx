'use client'

import { useEffect, useState } from 'react'
import type { TilMeta } from '@/lib/til'
import { TilCard, TAG_COLORS } from '@/components/TilCard'

const FIXED_TAGS = ['Java', 'SQL', 'Database', 'Spring', 'Algorithm']
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function CalendarPicker({
  tils,
  selectedDate,
  onSelect,
  onClose,
}: {
  tils: TilMeta[]
  selectedDate: string | null
  onSelect: (date: string | null) => void
  onClose: () => void
}) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const tilDates = new Set(tils.map(t => t.date))
  const firstDow = new Date(year, month, 1).getDay()
  const lastDay = new Date(year, month + 1, 0).getDate()

  const pad = (n: number) => String(n).padStart(2, '0')
  const toDateStr = (d: number) => `${year}-${pad(month + 1)}-${pad(d)}`

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= lastDay; d++) cells.push(d)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {year}년 {month + 1}월
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          >
            ›
          </button>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-sm text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            aria-label="달력 닫기"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`pb-2 text-[11px] font-semibold tracking-wide ${
              i === 0 ? 'text-rose-400' : i === 6 ? 'text-blue-400' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} className="h-9" />
          const ds = toDateStr(d)
          const hasTil = tilDates.has(ds)
          const isSelected = selectedDate === ds
          return (
            <button
              key={ds}
              onClick={() => hasTil && onSelect(isSelected ? null : ds)}
              disabled={!hasTil}
              className={`relative flex h-9 w-full flex-col items-center justify-center rounded-xl text-xs transition
                ${isSelected
                  ? 'bg-indigo-600 font-bold text-white shadow-md'
                  : hasTil
                  ? 'cursor-pointer font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-indigo-900/40 dark:hover:text-indigo-300'
                  : 'cursor-default text-slate-300 dark:text-slate-600'
                }
              `}
            >
              {d}
              {hasTil && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo-400 dark:bg-indigo-500" />
              )}
            </button>
          )
        })}
      </div>

      {selectedDate && (
        <button
          onClick={() => onSelect(null)}
          className="mt-4 w-full rounded-lg border border-slate-200 py-1.5 text-xs text-slate-400 transition hover:border-indigo-300 hover:text-indigo-500 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:text-indigo-400"
        >
          날짜 필터 해제 ✕
        </button>
      )}
    </div>
  )
}

export default function TilListPage() {
  const [tils, setTils] = useState<TilMeta[]>([])
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    fetch('/api/tils').then(r => r.json()).then(setTils)
  }, [])

  const filtered = tils.filter(til => {
    const matchesSearch =
      search === '' ||
      til.title.toLowerCase().includes(search.toLowerCase()) ||
      til.date.includes(search)
    const matchesTag = activeTag === null || til.tags.includes(activeTag)
    const matchesDate = selectedDate === null || til.date === selectedDate
    return matchesSearch && matchesTag && matchesDate
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">TIL 목록</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          총 {tils.length}개의 학습 기록
        </p>
      </div>

      {/* Search + Calendar toggle */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="날짜 또는 키워드로 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500"
        />
        <button
          onClick={() => setShowCalendar(v => !v)}
          className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
            showCalendar || selectedDate
              ? 'border-indigo-300 bg-indigo-50 text-indigo-600 dark:border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600'
          }`}
        >
          <CalendarIcon />
          {selectedDate ? selectedDate.replace(/-/g, '.') : '날짜'}
        </button>
      </div>

      {/* Calendar */}
      {showCalendar && (
        <CalendarPicker
          tils={tils}
          selectedDate={selectedDate}
          onSelect={d => {
            setSelectedDate(d)
            if (d) setShowCalendar(false)
          }}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
            activeTag === null
              ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
          }`}
        >
          전체
        </button>
        {FIXED_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
              activeTag === tag
                ? (TAG_COLORS[tag] ?? 'bg-slate-200 text-slate-700')
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

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
    </svg>
  )
}
