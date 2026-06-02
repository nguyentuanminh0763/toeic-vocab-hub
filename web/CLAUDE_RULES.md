# CLAUDE RULES — WEB (Next.js)

## Tech Stack (cứng)

- Next.js 15 + TypeScript
- Tailwind CSS (no CSS modules, no styled-components)
- App Router + src/ directory

## Color System (không tự ý thay đổi)

| Token        | Hex       | Dùng cho |
|-------------|-----------|----------|
| Purple       | #534AB7   | Primary, progress bar, nút chính |
| Purple light | #EAE8F9   | Badge, hover bg |
| Green bg     | #E1F5EE   | "Nhớ rồi" background |
| Green text   | #085041   | "Nhớ rồi" text, nghĩa từ |
| Green border | #9FE1CB   | Card back border |
| Red bg       | #FAECE7   | "Cần ôn" background |
| Red text     | #712B13   | "Cần ôn" text |
| Body bg      | #F5F4FC   | Page background |

## Architecture Rules

- State: `useState` + `localStorage` (no Redux, no Zustand unless discussed)
- Server components by default, `'use client'` only when needed (events, hooks)
- No `any` type
- Words data lives in `src/lib/words.ts` — never inline in components
- Keep components in `src/components/`, pages in `src/app/`
- API calls go in `src/lib/api.ts`

## What NOT to do

- Do NOT add animation libraries (Framer Motion) without discussion
- Do NOT use `document.querySelector` — use React refs
- Do NOT break the flashcard flip animation (CSS 3D transform)
- Do NOT change the keyboard shortcut scheme (Space/Arrow/R)
