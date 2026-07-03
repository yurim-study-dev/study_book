import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

const GITHUB_API = 'https://api.github.com/repos/yurim-study-dev/java_rim/contents/docs/lecture'
const GITHUB_RAW = 'https://raw.githubusercontent.com/yurim-study-dev/java_rim/main/docs/lecture'

export interface LectureMeta {
  slug: string
  title: string
  order: number
}

export interface LectureFull extends LectureMeta {
  contentHtml: string
  prevSlug: string | null
  nextSlug: string | null
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function fetchRaw(filename: string): Promise<string | null> {
  const res = await fetch(`${GITHUB_RAW}/${filename}`, {
    next: { revalidate: 3600 },
  })
  return res.ok ? res.text() : null
}

function extractTitle(content: string, slug: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : slug
}

function extractOrder(filename: string): number {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1]) : 999
}

function addHeadingAnchors(html: string): string {
  return html.replace(
    /<(h[123]) id="([^"]+)">/g,
    '<$1 id="$2"><a class="heading-anchor" href="#$2" aria-hidden="true" tabindex="-1"><span class="anchor-icon">#</span></a>'
  )
}

export async function getAllLectures(): Promise<LectureMeta[]> {
  const res = await fetch(GITHUB_API, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []

  const files: Array<{ name: string; type: string }> = await res.json()
  const mdFiles = files.filter(f => f.type === 'file' && f.name.endsWith('.md'))

  const metas = await Promise.all(
    mdFiles.map(async f => {
      const slug = f.name.replace('.md', '')
      const content = await fetchRaw(f.name)
      return {
        slug,
        title: content ? extractTitle(content, slug) : slug,
        order: extractOrder(f.name),
      }
    })
  )

  return metas.sort((a, b) => a.order - b.order)
}

export async function getLectureBySlug(slug: string): Promise<LectureFull | null> {
  const [content, allLectures] = await Promise.all([
    fetchRaw(`${slug}.md`),
    getAllLectures(),
  ])
  if (!content) return null

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const idx = allLectures.findIndex(l => l.slug === slug)

  return {
    slug,
    title: extractTitle(content, slug),
    order: extractOrder(slug),
    contentHtml: addHeadingAnchors(processed.toString()),
    prevSlug: idx > 0 ? allLectures[idx - 1].slug : null,
    nextSlug: idx < allLectures.length - 1 ? allLectures[idx + 1].slug : null,
  }
}
