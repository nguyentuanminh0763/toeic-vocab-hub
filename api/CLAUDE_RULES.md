# CLAUDE RULES — TOEIC VOCAB BACKEND

## Tech Stack (cứng)

- NestJS 11 + TypeScript
- TypeORM + PostgreSQL
- JWT (access token) + Argon2
- Swagger at `/api`
- class-validator + class-transformer

## Module Pattern (bắt buộc theo)

```
modules/<name>/
  entities/<name>.entity.ts
  dtos/create-<name>.dto.ts
  dtos/update-<name>.dto.ts
  <name>.module.ts
  <name>.service.ts
  <name>.controller.ts
```

## Coding Rules

- UUID for all PKs (`@PrimaryGeneratedColumn('uuid')`)
- Soft delete on all user-facing entities (`@DeleteDateColumn`)
- Always use `class-validator` in DTOs
- `@Exclude()` on sensitive fields
- Return `ApiResponse` helper — never raw objects
- All passwords: Argon2 only
- No `any` type
- Repository pattern via `@InjectRepository`

## What NOT to do

- Do NOT remove `auth` or `users` modules
- Do NOT change the response format `{ success, message, data }`
- Do NOT add new global middleware without discussion
- Do NOT change `synchronize` setting in production
- Do NOT use `delete` operator — use soft delete
