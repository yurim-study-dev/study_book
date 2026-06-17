'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // 헤딩 목록 추출
  useEffect(() => {
    const elements = document.querySelectorAll('.prose h1, .prose h2')
    const items: Heading[] = Array.from(elements)
      .map(el => {
        // heading-anchor의 '#' 텍스트 제외
        const clone = el.cloneNode(true) as HTMLElement
        clone.querySelector('.heading-anchor')?.remove()
        return {
          id: el.id,
          text: clone.textContent?.trim() ?? '',
          level: parseInt(el.tagName[1]),
        }
      })
      .filter(h => h.id && h.text)
    setHeadings(items)
  }, [])

  // 현재 보이는 섹션 추적
  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      className="hidden xl:block fixed top-28 w-52 max-h-[calc(100vh-8rem)] overflow-y-auto"
      style={{ left: 'calc(50% + 410px)' }}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        목차
      </p>
      <ul className="space-y-0.5 border-l border-slate-200 dark:border-slate-700">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setActiveId(id)
              }}
              className={`block py-1 text-[12px] leading-snug transition-colors border-l-2 -ml-px ${
                level === 1 ? 'pl-3 font-semibold' : 'pl-5'
              } ${
                activeId === id
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
