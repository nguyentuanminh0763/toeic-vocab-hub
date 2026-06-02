# AI Journal — Session 001: Next.js Init

_Date: 2026-06-02_

## Context

Refactored TOEIC_VOCAB from DayPilot (React/Vite) to a proper project structure following OSA workflow pattern. Created `web/` with Next.js 15.

## Architecture Decisions

### App Router + src/ directory
Standard choice. Server components by default keeps bundle lean.

### localStorage as primary state store (no auth yet)
User needs the app working NOW (TOEIC exam on 2026-06-05). Auth sync is Phase 2.
localStorage is sufficient for single-device use.

### 'use client' on Flashcard only
`Flashcard.tsx` uses `useState`, `useEffect`, `useCallback`, and Web Speech API — must be client.
`layout.tsx` and `page.tsx` are server components. `NavBar.tsx` uses `usePathname` → client.

### No animation library
The card flip uses pure CSS `transform: rotateY(180deg)` with `perspective` and `backface-visibility`.
Framer Motion would be overkill and adds bundle size.

### Words data in lib/words.ts
Duplicates api seed data but avoids an API call on page load. Fast and works offline.
Will consolidate when api auth is integrated (fetch words from `GET /words` on login).

## Files Created

- `src/lib/words.ts` — word data + localStorage helpers
- `src/components/Flashcard.tsx` — main flashcard component
- `src/components/NavBar.tsx` — top navigation
- `src/app/layout.tsx` — root layout with NavBar
- `src/app/page.tsx` — flashcard page (home)
- `src/app/words/page.tsx` — word list with search/filter
- `src/app/progress/page.tsx` — stats + hard words
