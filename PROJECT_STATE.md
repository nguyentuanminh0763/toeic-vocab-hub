# PROJECT STATE — TOEIC VOCAB

_Last updated: 2026-06-02_

## Current Phase

Phase 1 — Core scaffolding complete. Backend modules added. Next.js web initialized.

## Completed

- [x] Standalone HTML flashcard app (`index.html`) — 80 từ ETS 2026 Test 1, phát âm, localStorage
- [x] NestJS api base (auth, users, tasks, spending inherited from DayPilot)
- [x] `words` module — entity + seeder + GET endpoints
- [x] `progress` module — entity + PATCH/GET endpoints per user
- [x] Next.js `web/` initialized (App Router, TypeScript, Tailwind)
- [x] Flashcard page (`/`) — full flashcard UI ported to React
- [x] Word list page (`/words`) — searchable, filterable
- [x] Progress page (`/progress`) — stats per user
- [x] Workflow docs created (TOEIC_AI_WORKFLOW_GUIDE.md, CLAUDE_RULES.md per folder)

## Pending

- [ ] Auth integration in web (login → get JWT → sync progress to api)
- [ ] Quiz mode (4-option multiple choice)
- [ ] Dark mode
- [ ] Add more word sets (ETS 2026 Test 2, 3...)
- [ ] Remove DayPilot-inherited modules (tasks, spending) when confirmed unused

## Known Issues

- `index.html` still exists at root — legacy standalone version, keep for now
- Backend CORS currently allows localhost:5173; update to localhost:3001 for Next.js dev
- DayPilot tasks/spending modules still in api — not harmful, just unused

## Architecture Decisions

- Keep api modules `tasks` and `spending` (don't delete yet — may pivot)
- `words` are seeded on startup (not managed via admin UI for now)
- Progress is tied to `user_id`; unauthenticated users fall back to localStorage in web
