<div align="center">

# 📖 Study Book

**Java 부트캠프 학습 기록 블로그**

매일 배운 것을 기록하고, 흘려보내지 않고 쌓아가는 TIL 아카이브

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![Vibe Coded with Claude Code](https://img.shields.io/badge/Vibe_Coded_with-Claude_Code-blueviolet?style=flat-square&logo=anthropic)](https://claude.ai/code)

</div>

---

## ✨ 소개

**Study Book**은 Java 부트캠프 수강 중 매일 배운 내용을 기록하는 TIL(Today I Learned) 블로그입니다.
GitHub 레포(`java_rim`)에 마크다운 파일을 올리면 **자동으로 사이트에 반영**됩니다.

- **TIL 소스 레포** → [yurim-study-dev/java_rim](https://github.com/yurim-study-dev/java_rim)

---

## 🖥️ 주요 기능

| 기능 | 설명 |
|------|------|
| 📝 **TIL 목록** | 검색 · 태그 필터링으로 원하는 글 빠르게 탐색 |
| 📄 **TIL 상세** | 마크다운 렌더링 + 코드 문법 강조 + 복사 버튼 |
| 🗂️ **목차 (TOC)** | 스크롤에 따라 현재 섹션 하이라이트되는 사이드 목차 |
| 🌙 **다크 / 라이트 모드** | 토글 버튼으로 테마 전환 |
| 🔄 **자동 동기화** | GitHub API + ISR(1시간)으로 새 TIL 자동 반영 |
| 📱 **모바일 반응형** | 모든 화면 크기에서 최적화된 레이아웃 |

---

## 🛠️ 기술 스택

```
Frontend    Next.js 16 (App Router) · React 19 · TypeScript 5
Styling     Tailwind CSS v4 · Pretendard Variable
Markdown    remark · remark-gfm · rehype-highlight · rehype-slug
Theme       next-themes
Deploy      Vercel (ISR)
```

---

## 📁 프로젝트 구조

```
study_book/
├── app/
│   ├── page.tsx              # 홈 (통계 + 최근 TIL)
│   ├── til/
│   │   ├── page.tsx          # TIL 목록 (검색 · 태그 필터)
│   │   └── [date]/page.tsx   # TIL 상세 페이지
│   ├── about/page.tsx        # About 페이지
│   ├── api/tils/route.ts     # TIL 목록 API
│   └── globals.css           # 전역 스타일
├── components/
│   ├── Header.tsx            # 네비게이션 헤더
│   ├── TilCard.tsx           # TIL 카드 컴포넌트
│   ├── MarkdownContent.tsx   # 마크다운 렌더러 (클라이언트)
│   └── TableOfContents.tsx   # 사이드 목차 (TOC)
└── lib/
    └── til.ts                # GitHub API에서 TIL 파싱
```

---

## 🚀 로컬 실행

```bash
# 1. 레포 클론
git clone https://github.com/yurim-web/study_book.git
cd study_book

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

`http://localhost:3000` 에서 확인

> **GitHub API 요청 한도**가 걱정된다면 `.env.local` 파일에 토큰을 추가하세요.
> ```
> GITHUB_TOKEN=ghp_xxxxxxxxxxxx
> ```

---

## 🏷️ 태그 분류

TIL 마크다운의 `## 학습 주제` 섹션을 분석해 자동으로 태그를 부여합니다.

| 태그 | 키워드 |
|------|--------|
| ☕ **Java** | Java, 배열, 메서드, 클래스, OOP, 캡슐화, 상속, 예외, switch, for문 등 |
| 🌱 **Spring** | Spring, 스프링 |
| 🗄️ **SQL** | SQL, 쿼리, JOIN, SELECT, DML, DDL, TCL |
| 💾 **Database** | 데이터베이스, 트랜잭션, ACID, 인덱스 |
| 🧮 **Algorithm** | 알고리즘, Algorithm |

---

## 🤖 개발 방식

이 프로젝트는 **Vibe Coding** 방식으로 개발되었습니다.
[Claude Code](https://claude.ai/code)와 AI 페어 프로그래밍으로 기획 · 디자인 · 개발 전 과정을 진행했습니다.

> 기능 정의, 디자인 방향, 피드백, 의사결정은 모두 직접 주도했으며  
> Claude Code는 구현 파트너로 활용했습니다.

---

## 📌 To-do

- [ ] 배포 (Vercel 연결)
- [ ] GitHub Actions 웹훅 연동으로 즉시 반영
- [ ] 검색 기능 고도화
- [ ] OG Image 생성

---

<div align="center">

Made with 💙 by **yurim** · Powered by [Next.js](https://nextjs.org/) & [Vercel](https://vercel.com/)

</div>
