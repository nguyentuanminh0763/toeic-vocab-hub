# PROJECT STATE — WEB

_Last updated: 2026-06-02_

## Current Phase

Phase 1 — Core pages complete. localStorage-based state. Backend sync not yet wired.

## Pages Status

| Route      | Status | Notes |
|------------|--------|-------|
| `/`        | ✅ Done | Flashcard study (flip, speak, mark ok/hard) |
| `/words`   | ✅ Done | Word list with search + filter by word form |
| `/progress`| ✅ Done | Stats, progress bars, hard words list, reset |

## Components

| Component     | Status | Notes |
|---------------|--------|-------|
| `Flashcard`   | ✅ Done | Full flip + speech + keyboard shortcuts |
| `NavBar`      | ✅ Done | Sticky, active link highlight |

## State Management

- `StudyState` stored in `localStorage` key `toeic_test1_progress_v2`
- State shape: `{ okSet, hardSet, seenSet, currentIdx, isHardMode, deck }`
- All state in `Flashcard.tsx` via `useState` + `useCallback`

## Pending

- [ ] Auth login page (`/login`) — connect to backend JWT
- [ ] Progress sync to backend (`PATCH /progress/:wordId`)
- [ ] Quiz mode page (`/quiz`) — 4-option multiple choice
- [ ] Dark mode toggle

## Known Issues

- `Geist_Mono` removed from layout (was unused) — no visual regression
- Words data duplicated between `web/src/lib/words.ts` and `backend/words.service.ts` — acceptable for now, single source of truth will be backend when auth is wired
