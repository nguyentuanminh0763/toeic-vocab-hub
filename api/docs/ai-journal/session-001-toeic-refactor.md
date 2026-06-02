# AI Journal — Session 001: TOEIC Refactor

_Date: 2026-06-02_

## Context

Project TOEIC_VOCAB was originally "DayPilot" — a personal daily OS for students (tasks + spending + streak). The user decided to repurpose this NestJS/PostgreSQL base for a TOEIC vocabulary study app.

## Decisions Made

### Keep existing modules (don't delete)
- `auth` and `users` are reusable and stable — kept as-is
- `tasks` and `spending` are DayPilot-specific — kept but unused, will remove in future phase

### Add two new modules
- `words`: stores 80 TOEIC vocab entries, seeded on startup via `OnModuleInit`
- `progress`: per-user word status tracking (ok / hard / unseen)

### Architecture choice: seed via OnModuleInit
Words are static (80 vocab from ETS 2026 Test 1). Chose seeder pattern over migration to keep dev setup simple.

### JWT stays mandatory for progress sync
Unauthenticated users use localStorage in the web app. When logged in, progress syncs to backend.

## Files Added

- `api/src/modules/words/` — full module
- `api/src/modules/progress/` — full module
- `api/src/app.module.ts` — updated imports
- `api/src/main.ts` — CORS updated to allow :3001

## Next Steps

- Web (Next.js): implement auth login flow + progress sync
- Remove tasks/spending modules after confirming unused
