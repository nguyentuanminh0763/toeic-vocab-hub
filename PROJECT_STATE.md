# PROJECT STATE — TOEIC VOCAB

_Last updated: 2026-06-02_

## Current Phase

Phase 2 — Feature architecture complete. API JWT auth wired. Ready for auth integration in web.

## Completed

### Web (Next.js)
- [x] Standalone HTML flashcard app (`index.html`) — fallback, no server needed
- [x] Next.js bootstrapped — App Router, TypeScript, Tailwind, Yarn 4
- [x] Feature-based architecture — `features/`, `shared/`, `services/`, `app/` thin wrappers
- [x] Flashcard (`/`) — flip 3D, Web Speech API, ok/hard, keyboard shortcuts, localStorage
- [x] Quiz (`/quiz`) — 4-option MCQ, setup screen, live score, result + retry wrong
- [x] Word list (`/words`) — search, filter by word form, pronunciation
- [x] Progress (`/progress`) — stats cards, progress bars, hard words list, reset
- [x] Each feature has component (UI) + hook (logic) properly separated

### API (NestJS)
- [x] `auth` module — signup + login → `{ access_token, user }` (JWT 7d)
- [x] `words` module — seeder 80 ETS 2026 Test 1, GET /words
- [x] `progress` module — protected by JwtAuthGuard, user_id from JWT
- [x] `JwtStrategy` + `JwtAuthGuard` + `@CurrentUser()` decorator
- [x] Swagger at `/api` with BearerAuth support

## Pending

- [ ] Auth login page in web (`/login`) — form → POST /auth/login → lưu token
- [ ] Progress sync web → api (sau khi login)
- [ ] Refresh token (httpOnly cookie, 30 ngày)
- [ ] Dark mode
- [ ] Thêm bộ từ (ETS 2026 Test 2, 3...)
- [ ] Xóa DayPilot legacy modules (tasks, spending) khỏi api

## Known Issues

- `index.html` gốc vẫn còn ở root — giữ làm fallback
- `words` data bị duplicate giữa `web/shared/lib/words.ts` và `api/words.service.ts`
  → sẽ hợp nhất khi auth + sync được wired
- Legacy `tasks`/`spending` modules vẫn còn trong api — unused, không harmful
