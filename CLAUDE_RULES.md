# CLAUDE RULES — TOEIC VOCAB (Root)

## Project Identity

- Project name: **TOEIC Vocab**
- Purpose: Ôn từ vựng TOEIC ETS cho người Việt Nam
- Primary language: Vietnamese UI, English API

## Folder Structure (cứng — không đổi)

```
api/    NestJS API
web/    Next.js frontend
```

## Cross-cutting Rules

- NEVER add a new dependency without commenting why
- NEVER use `any` type in TypeScript
- All API responses follow `{ success, message, data }` format
- All entities use UUID primary key
- Soft delete on all user-facing entities
- Vietnamese as UI language, English as API/code language

## Git Commit Convention

```
feat(scope): short description
fix(scope): short description
refactor(scope): short description
```

Scopes: `api`, `web`, `docker`, `docs`

## What AI should NOT do

- Rewrite existing working modules
- Add unrelated features
- Change folder structure without explicit request
- Skip writing PROJECT_STATE.md update after work
