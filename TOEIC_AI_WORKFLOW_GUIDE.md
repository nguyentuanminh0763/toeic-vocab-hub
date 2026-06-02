# TOEIC VOCAB AI WORKFLOW GUIDE

## Project Overview

TOEIC Vocab là một web app ôn từ vựng TOEIC cho người dùng Việt Nam.

Core concept:
"Flashcard + Phát âm + Tracking tiến độ theo tài khoản"

Users can:
- Ôn từ vựng qua flashcard với phát âm chuẩn (Web Speech API)
- Đánh dấu từ "Nhớ rồi" / "Cần ôn"
- Xem tiến độ học tổng thể
- Lưu tiến độ vào tài khoản (backend sync)
- Ôn chế độ "Từ khó" — chỉ hiện từ đã đánh dấu Cần ôn

---

## PROJECT STRUCTURE

```txt
TOEIC_VOCAB/
│
├── TOEIC_AI_WORKFLOW_GUIDE.md    ← file này
├── CLAUDE_RULES.md               ← constraints toàn dự án
├── PROJECT_STATE.md              ← trạng thái hiện tại
├── INSTRUCTIONS.md               ← spec chi tiết
├── docker-compose.yml
│
├── api/                          ← NestJS API
│   ├── src/
│   ├── CLAUDE_RULES.md
│   ├── PROJECT_STATE.md
│   └── docs/ai-journal/
│
└── web/                          ← Next.js frontend
    ├── src/
    ├── CLAUDE_RULES.md
    ├── PROJECT_STATE.md
    └── docs/ai-journal/
```

---

## IMPORTANT FILES — ĐỌC ĐẦU MỖI SESSION

### 1. CLAUDE_RULES.md (mỗi folder)
- Architecture constraints
- Coding rules
- Tech stack cứng
- Branding / UI direction

### 2. PROJECT_STATE.md (mỗi folder)
- Work completed
- Current phase
- Pending tasks
- Known issues

### 3. docs/ai-journal/\*
- Log quyết định architecture
- Lý do thay đổi thiết kế
- Bug post-mortems
- Phase summaries

---

## HOW TO START A NEW AI SESSION

### API session bootstrap prompt:

```
Before making changes, read:
- api/CLAUDE_RULES.md
- api/PROJECT_STATE.md
- api/docs/ai-journal/*

This is a NestJS + PostgreSQL + TypeORM project for TOEIC vocabulary.

Do NOT rewrite existing modules.
Follow the existing entity/module/service/controller pattern.
Preserve auth and users modules as-is.
Incremental changes only.
```

### Frontend session bootstrap prompt:

```
Before making changes, read:
- web/CLAUDE_RULES.md
- web/PROJECT_STATE.md
- web/docs/ai-journal/*

This is a Next.js 15 + TypeScript + Tailwind CSS project.
App Router. src/ directory.

Do NOT rewrite page structure.
Preserve flashcard study flow.
Color system: purple #534AB7, green #085041, red #712B13.
Incremental changes only.
```

---

## STANDARD TASK WORKFLOW

1. READ CONTEXT
   - CLAUDE_RULES.md → PROJECT_STATE.md → ai-journal

2. AUDIT FIRST
   - Inspect affected files
   - Identify risk

3. PROPOSE PLAN
   - List files to touch
   - Explain risk level

4. IMPLEMENT SMALL
   - No giant rewrites
   - One module at a time

5. VERIFY
   - npm run build (no type errors)
   - Test key flows in browser

6. DOCUMENT
   - Update PROJECT_STATE.md
   - Add entry to docs/ai-journal/

---

## TECH STACK

| Layer    | Tech |
|----------|------|
| Backend  | NestJS 11 + TypeORM + PostgreSQL + JWT |
| Frontend | Next.js 15 + TypeScript + Tailwind CSS |
| Auth     | JWT Bearer token |
| Speech   | Web Speech API (browser) |

---

## AI COLLABORATION MODE

Khi không được yêu cầu code trực tiếp, AI đóng vai:
- Technical strategist
- Architecture reviewer
- Task planner & prompt engineer

Typical flow: Discuss → Analyze → Identify risk → Propose → Implement → Document
