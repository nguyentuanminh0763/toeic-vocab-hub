# PROJECT STATE - WEB

_Last updated: 2026-06-02_

## Current Phase

Phase 1 - Core pages complete. Frontend architecture refactor complete for feature-based structure. Backend sync not yet wired.

## Pages Status

| Route | Status | Notes |
|-------|--------|-------|
| `/` | Done | Flashcard study (flip, speak, mark ok/hard) |
| `/quiz` | Done | 4-option multiple choice quiz, all words or hard words |
| `/words` | Done | Word list with search + filter by word form |
| `/progress` | Done | Stats, progress bars, hard words list, reset |

## Architecture Status

| Area | Status | Notes |
|------|--------|-------|
| `app/` routes | Done | Thin route wrappers import feature components |
| `features/flashcard` | Done | UI in `Flashcard`, logic in `useFlashcard` |
| `features/quiz` | Done | `Quiz` composes setup/question/result screens and `useQuiz` |
| `features/words` | Done | UI in `WordList`, logic in `useWordList` |
| `features/progress` | Done | UI in `ProgressView`, logic in `useProgress` |
| `shared/lib` | Done | `words.ts` contains word data, `study-storage.ts` owns localStorage |
| `services` | Stub | `progress.api.ts` reserved for backend sync |

## State Management

- `StudyState` stored in `localStorage` key `toeic_test1_progress_v2`
- State shape: `{ okSet, hardSet, seenSet, currentIdx, isHardMode, deck }`
- Flashcard, quiz, words, and progress feature state lives in feature hooks
- Backend progress sync is not wired yet

## Pending

- [ ] Auth login page (`/login`) - connect to backend JWT
- [ ] Progress sync to backend (`PATCH /progress/:wordId`)
- [ ] Dark mode toggle
- [ ] Replace local word source with backend source after auth/sync model is decided

## Known Issues

- `Geist` font fetch can block production build in offline/restricted network environments
- Words data duplicated between `web/src/shared/lib/words.ts` and `api/src/modules/words/words.service.ts` - acceptable for now
