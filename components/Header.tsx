'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/til', label: 'TIL' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur dark:border-indigo-900/30 dark:bg-[#060c18]/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-extrabold">
            <span className="bg-gradient-to-r from-[#fef08a] via-[#93c5fd] to-[#1e3a8a] bg-clip-text text-transparent">
              Study Book
            </span>
            <span className="ml-1">📖</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-indigo-900/20 dark:hover:text-slate-200'
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="ml-2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-indigo-900/20 dark:hover:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {mounted ? (resolvedTheme === 'dark' ? '☀️' : '🌙') : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
