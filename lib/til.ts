import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

const GITHUB_API = 'https://api.github.com/repos/yurim-study-dev/java_rim/contents/docs/TIL'
const GITHUB_RAW = 'https://raw.githubusercontent.com/yurim-study-dev/java_rim/main/docs/TIL'

export const COURSE_START_DATE = '2026-05-14'

export interface TilMeta {
  date: string
  title: string
  tags: string[]
}

export interface TilFull extends TilMeta {
  contentHtml: string
  prevDate: string | null
  nextDate: string | null
}

const TAG_RULES: [RegExp, string][] = [
  [/Spring|스프링/i, 'Spring'],
  [/SQL|쿼리|JOIN|SELECT|DML|DDL|TCL/i, 'SQL'],
  [/데이터베이스|Database|트랜잭션|ACID|인덱스/i, 'Database'],
  [/알고리즘|Algorithm/i, 'Algorithm'],
  [/Java|자바|OOP|객체지향|배열|Array|메서드|Method|캡슐화|정적|클래스|Class|상속|다형성|인터페이스|Interface|제네릭|Generic|컬렉션|Collection|예외|Exception|switch|Switch|for문|For문|스트림|Stream|람다|Lambda|CH\d+/i, 'Java'],
]

function extractTags(topicLine: string): string[] {
  const tags = TAG_RULES
    .filter(([re]) => re.test(topicLine))
    .map(([, tag]) => tag)
  return tags.length > 0 ? tags : ['TIL']
}

function extractMeta(content: string, date: string): TilMeta {
  const topicMatch = content.match(/##\s*학습\s*주제\s*\n([^\n]+)/)
  const title = topicMatch ? topicMatch[1].trim() : date
  return { date, title, tags: extractTags(title) }
}

function addHeadingAnchors(html: string): string {
  return html.replace(
    /<(h[123]) id="([^"]+)">/g,
    '<$1 id="$2"><a class="heading-anchor" href="#$2" aria-hidden="true" tabindex="-1"><span class="anchor-icon">#</span></a>'
  )
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function fetchRaw(date: string): Promise<string | null> {
  const res = await fetch(`${GITHUB_RAW}/${date}.md`, {
    next: { revalidate: 3600 },
  })
  return res.ok ? res.text() : null
}

async function listDates(): Promise<string[]> {
  const res = await fetch(GITHUB_API, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const files: Array<{ name: string; type: string }> = await res.json()
  return files
    .filter(f => f.type === 'file' && f.name.endsWith('.md'))
    .map(f => f.name.replace('.md', ''))
    .sort()
}

export async function getAllTils(): Promise<TilMeta[]> {
  const dates = await listDates()
  const metas = await Promise.all(
    dates.map(async date => {
      const content = await fetchRaw(date)
      return content ? extractMeta(content, date) : null
    })
  )
  return metas
    .filter((m): m is TilMeta => m !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function getTilByDate(date: string): Promise<TilFull | null> {
  const [content, dates] = await Promise.all([fetchRaw(date), listDates()])
  if (!content) return null

  const meta = extractMeta(content, date)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const idx = dates.indexOf(date)
  return {
    ...meta,
    contentHtml: addHeadingAnchors(processed.toString()),
    prevDate: idx > 0 ? dates[idx - 1] : null,
    nextDate: idx < dates.length - 1 ? dates[idx + 1] : null,
  }
}
