# PROJECT STATE — BACKEND

_Last updated: 2026-06-02_

## Current Phase

Phase 1 — New modules `words` + `progress` added on top of DayPilot base.

## Modules Status

| Module   | Status | Notes |
|----------|--------|-------|
| auth     | ✅ Done | login + signup + JWT |
| users    | ✅ Done | CRUD + soft delete |
| words    | ✅ Done | entity + seeder (80 words) + GET endpoints |
| progress | ✅ Done | entity + PATCH/GET per user |
| tasks    | ⚠️ Legacy | DayPilot module, unused for TOEIC |
| spending | ⚠️ Legacy | DayPilot module, unused for TOEIC |

## API Endpoints (TOEIC-relevant)

```
GET  /words                  List all words (optional ?set=ETS_2026_TEST1)
GET  /words/:id              Get single word
GET  /progress               Get current user's progress (JWT required)
PATCH /progress/:wordId      Update word status: ok | hard | unseen (JWT required)
POST /auth/signup            Register
POST /auth/login             Login → JWT
```

## Environment Variables Required

```
DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE
DB_SYNCHRONIZE=true (dev only)
JWT_SECRET
PORT=3000
CORS_ORIGIN=http://localhost:3001
```

## Known Issues

- CORS currently hardcoded to `:5173`; update to `:3001` for Next.js dev server
- tasks/spending modules still registered in app.module.ts (not harmful)
