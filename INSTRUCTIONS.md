# 🚀 DayPilot – Personal Daily Operating System for Students

> **This file is the single source of truth for understanding this project.**
> AI agents, frontend developers, and backend developers should read this before making any changes.

---

## 📌 Project Overview

**DayPilot** là một **personal daily operating system** dành cho sinh viên, giúp người dùng:

- **Không quên việc quan trọng** mỗi ngày
- **Kiểm soát chi tiêu** cá nhân
- **Duy trì kỷ luật** và tiến bộ mỗi ngày
- **Nhìn lại cách làm việc** và thói quen chi tiêu một cách khách quan
- **Nhận lời khuyên nhẹ nhàng từ AI** để cải thiện dần dần

DayPilot **không chỉ là todo app hay expense tracker**, mà là một hệ thống **"đóng ngày" (daily closure system)**.

### Triết lý cốt lõi

```
Do today well → Log today honestly → Prepare tomorrow clearly
→ Day complete → Streak continues → AI gives insight
```

### Daily Flow

Mỗi ngày người dùng sẽ:
1. Hoàn thành các task **Urgent + High** quan trọng
2. Ghi lại **toàn bộ chi tiêu** theo buổi
3. Chuẩn bị **kế hoạch cho ngày mai**
4. Nhận **tổng kết khách quan** từ AI về ngày hôm nay

Khi hoàn thành đủ điều kiện → ngày được **"Complete"** → giữ **Streak** (chuỗi ngày kỷ luật).

### Target User

- Vietnamese university students who:
  - Tend to **forget tasks** and miss critical (Urgent/High) deadlines
  - Have **poor spending habits** and want session-based awareness
  - Need **streak-based motivation** to build daily discipline
  - Want an **objective AI observer** to review daily + weekly patterns

---

## 🎯 Core Goals

| # | Goal | Problem It Solves |
|---|------|-------------------|
| 1 | **Chống quên việc quan trọng** | Mỗi ngày phải hoàn thành hết task Urgent + High → đảm bảo tiến bộ thực sự |
| 2 | **Kiểm soát chi tiêu theo buổi** | Chia chi tiêu thành Morning/Noon/Afternoon/Evening → không bỏ sót, nhìn rõ pattern |
| 3 | **Tạo động lực (Streak)** | Complete Day khi đủ 3 điều kiện → duy trì streak → dopamine nhẹ mỗi ngày |
| 4 | **AI observer khách quan** | AI đọc dữ liệu task + time tracking + spending → đưa nhận xét + lời khuyên actionable |

---

## 🚀 Future Features (Phase 2+)

| # | Feature | Description |
|---|---------|-------------|
| 5 | **AI English Writing Assistant** | AI gợi ý grammar, vocabulary khi user viết task hoặc journal bằng tiếng Anh |
| 6 | **Multi-user / Public Release** | Scale cho nhiều sinh viên sử dụng |

---

## 🏗️ Tech Stack

### Backend (this repo)

| Component | Technology |
|-----------|-----------|
| Framework | **NestJS v11** (TypeScript) |
| Database | **PostgreSQL** with **TypeORM** |
| Authentication | **JWT** (access token) + **Argon2** (password hashing) |
| Validation | **class-validator** + **class-transformer** |
| API Documentation | **Swagger** (`/api` endpoint) |
| Configuration | **@nestjs/config** (dotenv `.env` file) |
| AI Integration | **OpenAI / Google Gemini** (daily + weekly insights) |

### Frontend (separate repo)

| Component | Technology |
|-----------|-----------|
| Framework | **React** (Vite) |
| UI Library | **Ant Design / Tailwind CSS** (TBD) |
| State Management | **Zustand** or **React Query** |
| Expected API base | `http://localhost:3000` |
| CORS origin | `http://localhost:5173` |

---

## 📂 Backend Module Architecture

```
src/
├── main.ts                        # App bootstrap, Swagger, CORS, ValidationPipe
├── app.module.ts                  # Root module
│
├── common/                        # Shared utilities
│   ├── enums/                     # UserRole, UserStatus, TaskPriority, TaskStatus, SpendingSession...
│   ├── guards/                    # JwtAuthGuard, RolesGuard
│   ├── decorators/                # @CurrentUser(), @Roles()
│   ├── pipes/                     # Custom validation pipes
│   ├── utils/                     # ApiResponse helper
│   └── cloudinary/                # Image upload (future)
│
├── config/                        # App configuration
│
└── modules/
    ├── auth/                      # ✅ Authentication (signup, login, JWT)
    ├── users/                     # ✅ User CRUD, profile management
    ├── tasks/                     # 🔴 Task management + time tracking
    ├── categories/                # 🟡 Expense categories
    ├── spending-sessions/         # 🔴 Session-based spending (Morning/Noon/Afternoon/Evening)
    ├── daily-completion/          # 🔴 Daily completion engine + streak
    ├── tomorrow-planning/         # 🔴 Plan tomorrow's tasks
    ├── journals/                  # 🔴 End-of-day journal entries
    ├── ai-insights/               # 🔴 AI daily summary + weekly review
    └── analytics/                 # 🔴 Spending & task stats
```

---

## 🎮 6 Module chính của hệ thống

| # | Module | Mô tả |
|---|--------|-------|
| 1 | **Task Management** | Quản lý task hàng ngày (Urgent/High/Medium/Low) + time tracking |
| 2 | **Time Tracking** | Start/Pause/Resume/Done – theo dõi cách làm việc, không chỉ kết quả |
| 3 | **Spending Tracking** | Ghi chi tiêu theo 4 buổi trong ngày, xác nhận no-spend |
| 4 | **Daily Completion Engine** | Kiểm tra 3 điều kiện → Complete Day → tăng Streak |
| 5 | **Tomorrow Planning Engine** | Lập kế hoạch ngày mai (≥3 tasks, trong đó có ≥1 Urgent hoặc High) |
| 6 | **AI Insight Engine** | AI daily summary + weekly review + lời khuyên |

---

## 📊 Database Schema

### `users` ✅ (Implemented)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| email | VARCHAR(255) | Unique, indexed |
| password_hash | VARCHAR(255) | Argon2 hashed, excluded from API response |
| full_name | VARCHAR(255) | Nullable |
| phone | VARCHAR(20) | Nullable |
| avatar_url | VARCHAR(512) | Nullable |
| role | VARCHAR(16) | `USER` \| `ADMIN` (default: `USER`) |
| status | VARCHAR(16) | `ACTIVE` \| `INACTIVE` \| `SUSPENDED` \| `BANNED` |
| email_verified | BOOLEAN | Default: false |
| provider | VARCHAR(32) | `local` \| `google` \| `facebook` |
| last_login_at | TIMESTAMPTZ | Nullable |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |
| deleted_at | TIMESTAMPTZ | Soft delete |

### `tasks` 🔴 (To be implemented)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Owner of the task |
| title | VARCHAR(255) | Task title |
| description | TEXT | Optional details |
| priority | VARCHAR(16) | `URGENT` \| `HIGH` \| `MEDIUM` \| `LOW` |
| status | VARCHAR(16) | `TODO` \| `IN_PROGRESS` \| `PAUSED` \| `DONE` \| `CANCELED` |
| task_date | DATE | Ngày thuộc về (today hoặc tomorrow khi planning) |
| cancel_reason | VARCHAR(32) | `NOT_NEEDED` \| `SCOPE_CHANGED` \| `WRONG_ESTIMATE` \| `DUPLICATE` \| `OTHER` (nullable) |
| cancel_description | TEXT | Mô tả thêm lý do cancel (nullable) |
| completed_at | TIMESTAMPTZ | Khi task được DONE (null nếu chưa) |
| sort_order | INT | Thứ tự hiển thị trong ngày |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |
| deleted_at | TIMESTAMPTZ | Soft delete |

### `task_time_logs` 🔴 (To be implemented)

> Theo dõi mỗi lần Start/Pause/Resume/Done trên task

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| task_id | UUID (FK → tasks) | Task đang track |
| user_id | UUID (FK → users) | Owner |
| action | VARCHAR(16) | `START` \| `PAUSE` \| `RESUME` \| `DONE` |
| started_at | TIMESTAMPTZ | Thời điểm bắt đầu work segment |
| ended_at | TIMESTAMPTZ | Thời điểm kết thúc work segment (nullable, null nếu đang chạy) |
| duration_seconds | INT | Tổng giây làm việc trong segment này (computed khi end) |
| created_at | TIMESTAMPTZ | Auto |

### `categories` 🟡 (To be implemented)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Nullable (null = system default category) |
| name | VARCHAR(100) | e.g., "Ăn uống", "Di chuyển", "Giải trí" |
| icon | VARCHAR(50) | Icon identifier for frontend |
| color | VARCHAR(7) | Hex color code, e.g., `#FF5733` |
| is_default | BOOLEAN | System-provided default category |
| created_at | TIMESTAMPTZ | Auto |

### `spending_sessions` 🔴 (To be implemented)

> Mỗi ngày có 4 buổi, mỗi buổi phải được xác nhận (có chi tiêu hoặc no-spend)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Owner |
| session_date | DATE | Ngày |
| session | VARCHAR(16) | `MORNING` \| `NOON` \| `AFTERNOON` \| `EVENING` |
| is_no_spend | BOOLEAN | True nếu user xác nhận không chi tiêu buổi này |
| confirmed | BOOLEAN | True khi user đã xác nhận (dù có hoặc không chi tiêu) |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

**Unique constraint:** `(user_id, session_date, session)` – mỗi buổi mỗi ngày chỉ có 1 record.

### `expenses` 🔴 (To be implemented)

> Chi tiết từng khoản chi tiêu trong một buổi

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| spending_session_id | UUID (FK → spending_sessions) | Thuộc buổi nào |
| user_id | UUID (FK → users) | Owner |
| category_id | UUID (FK → categories) | Loại chi tiêu |
| amount | DECIMAL(12,2) | Số tiền (VND) |
| note | VARCHAR(500) | Mô tả (optional) |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |
| deleted_at | TIMESTAMPTZ | Soft delete |

### `daily_completions` 🔴 (To be implemented)

> Lưu trạng thái "đóng ngày" cho mỗi ngày

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Owner |
| completion_date | DATE | Ngày được complete |
| critical_tasks_done | BOOLEAN | Tất cả Urgent + High tasks đã DONE? |
| spending_confirmed | BOOLEAN | Tất cả 4 buổi đã confirmed? |
| tomorrow_planned | BOOLEAN | Đã plan ≥3 tasks (có ≥1 Urgent/High) cho ngày mai? |
| is_completed | BOOLEAN | Đủ cả 3 điều kiện → true |
| streak_count | INT | Streak hiện tại tại thời điểm complete |
| completed_at | TIMESTAMPTZ | Thời điểm bấm Complete Day |
| created_at | TIMESTAMPTZ | Auto |

**Unique constraint:** `(user_id, completion_date)` – mỗi ngày chỉ complete 1 lần.

### `journals` 🔴 (To be implemented)

> Nhật ký cuối ngày (optional, không ảnh hưởng streak)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Owner |
| journal_date | DATE | Ngày |
| win_today | TEXT | Điều tốt nhất hôm nay |
| struggle | TEXT | Khó khăn gặp phải |
| tomorrow_focus | TEXT | Tập trung gì ngày mai |
| free_note | TEXT | Ghi chú tự do |
| mood | VARCHAR(16) | `GOOD` \| `OKAY` \| `BAD` (🙂 😐 😣) |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

**Unique constraint:** `(user_id, journal_date)`

### `ai_daily_reports` 🔴 (To be implemented)

> AI tổng kết sau khi Complete Day

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Owner |
| report_date | DATE | Ngày |
| task_summary | JSONB | tasks completed/uncompleted/canceled |
| work_style_summary | JSONB | thời gian, pause count, switch count, focus level |
| spending_summary | JSONB | tổng, top categories, vượt mức? |
| ai_feedback | TEXT | AI-generated daily review (Vietnamese) |
| created_at | TIMESTAMPTZ | Auto |

### `ai_weekly_reports` 🔴 (To be implemented)

| Column | Type | Description |'''''''''''''''''''''''''''''''''''''''''''''''
|--------|------|-------------|
| id | UUID (PK) | Primary key |
| user_id | UUID (FK → users) | Owner |
| week_start | DATE | Start of the reviewed week (Monday) |
| week_end | DATE | End of the reviewed week (Sunday) |
| streak_days | INT | Số ngày giữ streak trong tuần |
| critical_completion_rate | DECIMAL(5,2) | % Urgent + High task hoàn thành |
| total_spending | DECIMAL(12,2) | Tổng chi tiêu tuần |
| top_categories | JSONB | Top spending categories |
| ai_patterns | JSONB | 3 patterns AI nhận ra |
| ai_actions | JSONB | 3 actions AI gợi ý |
| ai_focus | TEXT | 1 focus chính cho tuần tới |
| ai_feedback | TEXT | AI-generated Sunday Review (Vietnamese) |
| created_at | TIMESTAMPTZ | Auto |

---

## ⚙️ Task System Detail

### 4.1 Task Priority

| Priority | Ý nghĩa | Ảnh hưởng Streak? |
|----------|----------|-------------------|
| **URGENT** | Việc khẩn cấp, bắt buộc hoàn thành trong ngày | ✅ Yes |
| **HIGH** | Việc quan trọng, bắt buộc hoàn thành trong ngày | ✅ Yes |
| **MEDIUM** | Nên làm nhưng không bắt buộc | ❌ No |
| **LOW** | Có thể làm nếu rảnh | ❌ No |

> **URGENT** và **HIGH** ảnh hưởng tới streak. Nếu còn task Urgent/High chưa DONE → không thể Complete Day.

### 4.2 Task Status Flow

```
TODO → IN_PROGRESS → DONE
         ↓    ↑
        PAUSED
         
TODO → CANCELED (bất kỳ lúc nào)
IN_PROGRESS → CANCELED
PAUSED → CANCELED
```

| Status | Mô tả |
|--------|-------|
| `TODO` | Chưa bắt đầu |
| `IN_PROGRESS` | Đang làm, đang đếm thời gian |
| `PAUSED` | Tạm dừng, thời gian không chạy |
| `DONE` | Hoàn thành |
| `CANCELED` | Hủy bỏ (phải chọn reason) |

### 4.3 Cancel Reasons

Khi cancel task, user **phải chọn** lý do:

| Reason | Mô tả |
|--------|-------|
| `NOT_NEEDED` | Không cần thiết nữa |
| `SCOPE_CHANGED` | Thay đổi phạm vi |
| `WRONG_ESTIMATE` | Ước lượng sai |
| `DUPLICATE` | Trùng lặp |
| `OTHER` | Lý do khác (nhập mô tả) |

### 4.4 Time Tracking

DayPilot theo dõi **cách người dùng làm task**, không chỉ kết quả.

| Action | Transition | Timer |
|--------|-----------|-------|
| **Start** | TODO → IN_PROGRESS | Bắt đầu đếm: `Working 12m` |
| **Pause** | IN_PROGRESS → PAUSED | Dừng đếm: `Paused 1h 20m` |
| **Resume** | PAUSED → IN_PROGRESS | Tiếp tục đếm |
| **Done** | → DONE | Dừng, lưu tổng thời gian |

### 4.5 Task Switching Logic

Nếu đang có task `IN_PROGRESS` và user bấm **Start** task khác:

```
┌─────────────────────────────────┐
│  Bạn đang làm "Task A"         │
│  Muốn chuyển sang "Task B"?    │
│                                 │
│  [Switch]          [Cancel]     │
│  (pause A,         (giữ nguyên) │
│   start B)                      │
└─────────────────────────────────┘
```

- **Switch**: Pause task A → Start task B
- **Cancel**: Không thay đổi gì

---

## 💰 Spending System Detail

### 7.1 Session-based Spending

DayPilot chia chi tiêu mỗi ngày thành **4 buổi**:

| Session | Khi nào điền? |
|---------|--------------|
| **MORNING** | Buổi trưa điền lại chi tiêu buổi sáng |
| **NOON** | Buổi chiều/tối điền chi tiêu buổi trưa |
| **AFTERNOON** | Buổi tối điền chi tiêu buổi chiều |
| **EVENING** | Trước khi ngủ điền chi tiêu buổi tối |

Mỗi buổi cần:
- ✅ **Ghi chi tiêu** (1 hoặc nhiều expense entries)
- HOẶC ✅ **Xác nhận "No Spend"** (không chi tiêu buổi này)

> Nếu quên điền buổi sáng/trưa → tối trước khi ngủ vẫn có thể **điền bù**.

### 7.2 Luồng xác nhận

```
Morning session:  [Add expense] hoặc [No spend ✓]
Noon session:     [Add expense] hoặc [No spend ✓]
Afternoon session:[Add expense] hoặc [No spend ✓]
Evening session:  [Add expense] hoặc [No spend ✓]
```

Tất cả 4 buổi phải **confirmed** → mới đủ điều kiện Complete Day.

---

## 🏁 Daily Completion Logic

### 3 Điều kiện Complete Day

| # | Điều kiện | Chi tiết |
|---|-----------|---------|
| 1 | **Critical tasks done** | Tất cả task có priority `URGENT` hoặc `HIGH` phải ở trạng thái `DONE` |
| 2 | **Spending confirmed** | Cả 4 buổi (Morning/Noon/Afternoon/Evening) phải confirmed |
| 3 | **Tomorrow planned** | Đã tạo ≥3 tasks cho ngày mai, trong đó có ≥1 task `URGENT` hoặc `HIGH` |

Khi đủ cả 3 → hiện nút **"Complete Day"** → bấm → tăng Streak → trigger AI summary.

### Streak Logic

```
Day 1: Complete → streak = 1
Day 2: Complete → streak = 2
Day 3: Miss     → streak = 0 (reset)
Day 4: Complete → streak = 1 (bắt đầu lại)
```

---

## 🌙 End-of-Day Screen (Màn quan trọng nhất)

Trước khi ngủ, user mở màn **End of Day** – gồm các bước:

### Step 1: Spending Today
- Quick add expense cho từng buổi
- Xác nhận từng buổi (có chi tiêu hoặc No-spend)
- Hiện tổng chi tiêu trong ngày

### Step 2: Critical Tasks Review
- Hiển thị danh sách task Urgent + High
- Đánh dấu task còn thiếu (chưa DONE)
- Cho phép nhanh chóng complete hoặc cancel

### Step 3: Journal (Optional)
- **Accordion** – mở rộng nếu muốn viết
- Không ảnh hưởng streak
- Fields:

| Field | Type | Mô tả |
|-------|------|-------|
| Win today | TEXT | Điều tốt nhất hôm nay |
| Struggle | TEXT | Khó khăn gặp phải |
| Tomorrow focus | TEXT | Ngày mai tập trung gì |
| Free note | TEXT | Ghi chú tự do |
| Mood | EMOJI | 🙂 Good / 😐 Okay / 😣 Bad |

### Step 4: Plan Tomorrow
- Tạo task cho ngày mai
- Bắt buộc: **≥ 3 tasks**, trong đó có **≥ 1 Urgent hoặc High**
- Có thể thêm thêm task Medium/Low

### Step 5: Complete Day
- Kiểm tra 3 điều kiện:
  - ✅ All Urgent + High tasks DONE
  - ✅ All 4 spending sessions confirmed
  - ✅ Tomorrow has ≥ 3 tasks (≥1 Urgent/High)
- Nếu đủ → hiện **"Ready to complete ✨"**
- Bấm **"Complete Day"** → tăng streak → trigger AI summary

---

## 🤖 AI Insight System

### 9.1 AI Daily Summary (sau Complete Day)

AI đọc dữ liệu trong ngày và tổng kết:

**Task Analysis:**
- Tasks hoàn thành / chưa xong / canceled
- Critical (Urgent + High) completion rate

**Work Style Analysis:**
- Tổng thời gian làm task
- Số lần pause
- Số lần switch task
- Mức độ tập trung (focus score)

**Spending Analysis:**
- Tổng chi tiêu trong ngày
- Top categories
- So sánh với ngày trung bình

**Output:**
- Tổng kết ngày (2-3 câu)
- Nhận xét hành vi (1-2 câu)
- Lời khuyên nhẹ nhàng (1-2 câu)

> **Tone AI:** Nhẹ nhàng, không phán xét, actionable.

Ví dụ:
```
Hôm nay bạn hoàn thành đủ task Urgent + High – tốt lắm!
Bạn pause task khá nhiều (5 lần), có dấu hiệu bị ngắt quãng.
Chi tiêu buổi chiều hơi cao hơn bình thường (120k vs trung bình 80k).
→ Ngày mai nên cố gắng làm từng task trong block dài hơn nhé.
```

### 9.2 AI Weekly Review (Sunday)

Mỗi tuần (Chủ nhật), AI tạo **Sunday Review**:

| Section | Nội dung |
|---------|---------|
| **Stats** | Streak days, Critical (Urgent+High) completion rate, Total spending, Top categories |
| **3 Patterns** | 3 xu hướng AI nhận ra trong tuần |
| **3 Actions** | 3 hành động cụ thể cải thiện tuần tới |
| **1 Focus** | 1 điều quan trọng nhất cần tập trung |

---

## 📱 Frontend Screens (React)

### Screen Map

```
┌─────────────────────────────────────────────┐
│                 DayPilot App                 │
├─────────────────────────────────────────────┤
│                                             │
│  🔐 Auth Screens                            │
│  ├── /login                                 │
│  └── /signup                                │
│                                             │
│  📊 Dashboard (Home)                        │
│  └── /dashboard                             │
│      ├── Today's Streak Banner              │
│      ├── Critical Tasks Progress             │
│      ├── Spending Summary (by session)      │
│      └── Quick Actions                      │
│                                             │
│  ✅ Task Screens                             │
│  ├── /tasks/today                           │
│  │   ├── Task List (grouped by priority)    │
│  │   ├── Active Task Timer                  │
│  │   ├── Start/Pause/Resume/Done buttons    │
│  │   └── Switch Task Confirm Dialog         │
│  └── /tasks/tomorrow                        │
│      └── Plan Tomorrow Tasks                │
│                                             │
│  💰 Spending Screens                         │
│  ├── /spending/today                        │
│  │   ├── 4 Session Cards                    │
│  │   │   (Morning/Noon/Afternoon/Evening)   │
│  │   ├── Add Expense per session            │
│  │   └── No-spend toggle per session        │
│  └── /spending/history                      │
│      ├── Calendar view                      │
│      └── Category breakdown                 │
│                                             │
│  🌙 End-of-Day Screen                       │
│  └── /end-of-day                            │
│      ├── Step 1: Spending Confirmation      │
│      ├── Step 2: Critical Tasks Review      │
│      ├── Step 3: Journal (accordion)        │
│      ├── Step 4: Plan Tomorrow              │
│      └── Step 5: Complete Day Button        │
│                                             │
│  🤖 AI Insights                              │
│  ├── /insights/daily                        │
│  │   └── AI Daily Summary (after complete)  │
│  └── /insights/weekly                       │
│      └── AI Sunday Review                   │
│                                             │
│  📈 Analytics                                │
│  └── /analytics                             │
│      ├── Streak History Chart               │
│      ├── Spending Trend (week/month)        │
│      ├── Task Completion Rate               │
│      └── Category Breakdown (pie chart)     │
│                                             │
│  👤 Profile                                  │
│  └── /profile                               │
│      ├── User Info                          │
│      └── Settings                           │
│                                             │
└─────────────────────────────────────────────┘
```

### Detailed Screen Specs

#### 1. Dashboard (`/dashboard`)

**Purpose:** Cái nhìn tổng quan ngày hôm nay

| Component | Mô tả |
|-----------|-------|
| **Streak Banner** | `🔥 Day 12` – số ngày streak hiện tại, nổi bật |
| **Critical Tasks Progress** | Progress bar `3/5 Urgent+High tasks done` |
| **Spending Today** | Tổng chi tiêu hôm nay + số buổi đã confirmed (2/4) |
| **Active Task** | Nếu đang có task IN_PROGRESS: hiện tên + timer `Working 23m` |
| **Quick Actions** | Buttons: `Start Task`, `Add Expense`, `End of Day` |
| **Today Summary Cards** | Mini cards: Tasks (5 done/7 total), Spending (145k), Mood (nếu có journal) |

#### 2. Task Today (`/tasks/today`)

**Purpose:** Quản lý và thực hiện task trong ngày

| Component | Mô tả |
|-----------|-------|
| **Task List** | Grouped by priority: Urgent → High → Medium → Low |
| **Task Card** | Title, priority badge, status, timer (nếu IN_PROGRESS/PAUSED) |
| **Active Timer** | Floating/sticky: `📌 Task A – Working 12m` |
| **Actions** | Start, Pause, Resume, Done, Cancel (với reason picker) |
| **Switch Dialog** | Modal confirm khi start task mới khi đang có task IN_PROGRESS |
| **Add Task FAB** | Floating button để thêm task nhanh |
| **Task Form** | Title, Description (optional), Priority (Urgent/High/Medium/Low) |

#### 3. Task Tomorrow (`/tasks/tomorrow`)

**Purpose:** Lập kế hoạch cho ngày mai

| Component | Mô tả |
|-----------|-------|
| **Tomorrow Task List** | Hiện task đã tạo cho ngày mai |
| **Task Counter** | `Tasks: 2/3 (cần thêm 1)` + `Urgent/High: 0 (cần ≥1)` – validation |
| **Add Task** | Thêm task cho ngày mai |
| **Reorder** | Drag to reorder tasks |

#### 4. Spending Today (`/spending/today`)

**Purpose:** Ghi nhận chi tiêu theo 4 buổi

| Component | Mô tả |
|-----------|-------|
| **4 Session Cards** | Morning / Noon / Afternoon / Evening |
| **Session Card States** | ⬜ Not confirmed / ✅ Confirmed (has expenses) / ✅ No-spend |
| **Expense List** | Trong mỗi session: danh sách expenses (amount, category, note) |
| **Add Expense** | Category picker + amount + note (optional) |
| **No-spend Toggle** | Button "Buổi này không chi tiêu" |
| **Daily Total** | Tổng chi tiêu trong ngày ở top |

#### 5. End of Day (`/end-of-day`)

**Purpose:** Màn "đóng ngày" – quan trọng nhất

| Step | Component | Mô tả |
|------|-----------|-------|
| 1 | **Spending Confirmation** | 4 session cards – quick add hoặc confirm no-spend |
| 2 | **Critical Tasks Review** | List Urgent + High tasks, highlight chưa DONE, quick complete/cancel |
| 3 | **Journal** | Accordion (collapsed by default). Win/Struggle/Focus/Note/Mood |
| 4 | **Plan Tomorrow** | Add tasks cho ngày mai, validation ≥3 tasks (≥1 Urgent/High) |
| 5 | **Complete Day** | Checklist 3 điều kiện + nút "Complete Day ✨" |

**Flow:**

```
[Spending ✅] → [Critical Tasks ✅] → [Journal 📝] → [Plan Tomorrow 📋] → [Complete Day 🎉]
                                   (optional)
```

#### 6. AI Daily Summary (`/insights/daily`)

**Purpose:** Sau khi Complete Day, hiện AI summary

| Component | Mô tả |
|-----------|-------|
| **Task Summary** | Card: completed / uncompleted / canceled counts |
| **Work Style** | Card: total time, pause count, switch count, focus score |
| **Spending** | Card: total, top category, vs average |
| **AI Feedback** | Main card: tổng kết + nhận xét + lời khuyên (Vietnamese) |

#### 7. AI Weekly Review (`/insights/weekly`)

**Purpose:** Sunday Review tổng kết tuần

| Component | Mô tả |
|-----------|-------|
| **Week Stats** | Streak days, Critical (Urgent+High) completion %, Total spending |
| **Top Categories** | Pie chart chi tiêu theo category |
| **3 Patterns** | AI nhận ra 3 xu hướng trong tuần |
| **3 Actions** | 3 hành động cụ thể cải thiện |
| **1 Focus** | Điều quan trọng nhất tuần tới |

#### 8. Analytics (`/analytics`)

**Purpose:** Xem thống kê dài hạn

| Component | Mô tả |
|-----------|-------|
| **Streak History** | Line chart: streak theo thời gian |
| **Spending Trend** | Bar chart: chi tiêu theo tuần/tháng |
| **Task Completion** | Line chart: Critical (Urgent+High) completion rate theo tuần |
| **Category Breakdown** | Pie chart: % chi tiêu theo category |
| **Session Pattern** | Heatmap: buổi nào chi nhiều nhất |

#### 9. Spending History (`/spending/history`)

| Component | Mô tả |
|-----------|-------|
| **Calendar View** | Lịch tháng, mỗi ngày hiện tổng chi tiêu |
| **Day Detail** | Click vào ngày → xem chi tiêu 4 buổi chi tiết |
| **Filter** | Theo category, theo tháng |

---

## 🔐 Authentication Flow

```
1. POST /auth/signup  → Create account → Return user info
2. POST /auth/login   → Verify credentials → Return JWT access token
3. Authenticated requests → Send "Authorization: Bearer <token>" header
4. JwtAuthGuard → Validates token → Injects user into request
```

### JWT Payload Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "USER"
}
```

---

## 📡 API Response Format

All API responses should follow this consistent format:

```json
{
  "success": true,
  "message": "Description of what happened",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

---

## 📡 API Endpoints Plan

### Auth ✅
```
POST   /auth/signup
POST   /auth/login
```

### Users ✅
```
GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id/suspend
PATCH  /users/:id/activate
DELETE /users/:id          (soft delete)
PATCH  /users/:id/restore
DELETE /users/:id/hard     (permanent)
```

### Tasks 🔴
```
GET    /tasks?date=2026-03-08                    # Tasks theo ngày
POST   /tasks                                     # Tạo task (cho today hoặc tomorrow)
PATCH  /tasks/:id                                 # Update task info
DELETE /tasks/:id                                 # Soft delete

PATCH  /tasks/:id/start                           # TODO → IN_PROGRESS (start timer)
PATCH  /tasks/:id/pause                           # IN_PROGRESS → PAUSED
PATCH  /tasks/:id/resume                          # PAUSED → IN_PROGRESS
PATCH  /tasks/:id/done                            # → DONE (stop timer)
PATCH  /tasks/:id/cancel                          # → CANCELED (body: reason, description?)

GET    /tasks/:id/time-logs                       # Xem time logs của task
GET    /tasks/active                              # Lấy task đang IN_PROGRESS (nếu có)
```

### Spending Sessions 🔴
```
GET    /spending-sessions?date=2026-03-08         # 4 sessions của ngày
POST   /spending-sessions/:id/confirm-no-spend    # Xác nhận không chi tiêu
```

### Expenses 🔴
```
GET    /expenses?session_id=xxx                   # Expenses của 1 session
POST   /expenses                                  # Thêm expense vào session
PATCH  /expenses/:id                              # Sửa expense
DELETE /expenses/:id                              # Xóa expense
```

### Categories 🟡
```
GET    /categories                                # All categories (system + user custom)
POST   /categories                                # User tạo custom category
PATCH  /categories/:id                            # Sửa
DELETE /categories/:id                            # Xóa (chỉ custom)
```

### Daily Completion 🔴
```
GET    /daily-completion?date=2026-03-08          # Status completion của ngày
GET    /daily-completion/check                    # Check 3 điều kiện cho hôm nay
POST   /daily-completion/complete                 # Complete Day → trigger AI
GET    /daily-completion/streak                   # Current streak
```

### Journals 🔴
```
GET    /journals?date=2026-03-08                  # Journal của ngày
POST   /journals                                  # Tạo/update journal
PATCH  /journals/:id                              # Sửa journal
```

### AI Insights 🔴
```
GET    /ai-insights/daily?date=2026-03-08         # AI summary ngày
GET    /ai-insights/weekly?week_start=2026-03-02  # AI Sunday review
POST   /ai-insights/generate-daily                # Trigger generate (internal)
POST   /ai-insights/generate-weekly               # Trigger generate (internal)
```

### Analytics 🔴
```
GET    /analytics/spending?period=week|month       # Spending trend
GET    /analytics/tasks?period=week|month          # Task completion trend
GET    /analytics/streak-history                   # Streak over time
GET    /analytics/top-categories?period=month      # Top spending categories
```

---

## 🗓️ Development Phases

### Phase 1: Auth Complete ← CURRENT
- [ ] Fix signup controller (missing await)
- [ ] Implement JWT token generation on login
- [ ] Create JwtStrategy + JwtAuthGuard
- [ ] Create @CurrentUser() decorator
- [ ] Create RolesGuard + @Roles() decorator
- [ ] Use ApiResponse utility consistently

### Phase 2: Task Module + Time Tracking
- [ ] Task entity (priority: URGENT/HIGH/MEDIUM/LOW, status: TODO/IN_PROGRESS/PAUSED/DONE/CANCELED)
- [ ] TaskTimeLog entity
- [ ] CRUD endpoints
- [ ] Start/Pause/Resume/Done/Cancel endpoints
- [ ] Task switching logic (auto-pause current)
- [ ] Cancel reason system
- [ ] Filter by date, priority, status
- [ ] "Active task" endpoint

### Phase 3: Spending Sessions + Expenses
- [ ] Category entity + seed default Vietnamese categories
- [ ] SpendingSession entity (4 sessions per day)
- [ ] Expense entity + CRUD
- [ ] Auto-create 4 sessions when first expense added
- [ ] No-spend confirmation endpoint
- [ ] Filter expenses by date, session, category

### Phase 4: Daily Completion Engine
- [ ] DailyCompletion entity
- [ ] Check 3 conditions endpoint
- [ ] Complete Day endpoint (validate → save → update streak)
- [ ] Streak calculation logic
- [ ] Streak history

### Phase 5: Journal + End-of-Day
- [ ] Journal entity
- [ ] CRUD endpoints
- [ ] Tomorrow Planning validation (≥3 tasks, ≥1 Urgent/High)

### Phase 6: AI Insights
- [ ] Integrate OpenAI / Google Gemini API
- [ ] Daily AI summary (after Complete Day)
- [ ] Collect task + time tracking + spending data
- [ ] Generate AI feedback in Vietnamese
- [ ] Weekly Sunday Review
- [ ] Store reports

### Phase 7: Analytics
- [ ] Spending by category (pie chart data)
- [ ] Spending by week/month (bar chart data)
- [ ] Task completion rate over time
- [ ] Streak history chart
- [ ] Session spending pattern

### Phase 8: Future Enhancements
- [ ] AI English Writing Assistant
- [ ] Push notifications (task reminders, end-of-day reminder)
- [ ] Multi-user public release

---

## 🧑‍💻 Development Guidelines

### For AI Agents

- Always read this file first before making changes
- Follow NestJS module pattern: `module → controller → service → entity → dto`
- Use TypeORM repository pattern (injected via `@InjectRepository`)
- All passwords must be hashed with **Argon2** (never bcrypt, never plaintext)
- Use `class-validator` decorators in all DTOs
- Use `@Exclude()` from `class-transformer` for sensitive fields
- Use UUID for all primary keys
- Implement soft delete (`@DeleteDateColumn`) for all user-facing entities
- Return consistent API response format (success, message, data)
- All date-based queries use `DATE` type (not full timestamp) for daily grouping

### For Frontend Developers

- API base URL: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api`
- Auth: Send JWT in `Authorization: Bearer <token>` header
- All dates are in ISO 8601 format (UTC with timezone)
- Amounts are in VND (Vietnamese Dong), stored as decimal
- UUIDs are used for all resource IDs
- Task dates use `YYYY-MM-DD` format for daily operations
- Spending sessions are: `MORNING`, `NOON`, `AFTERNOON`, `EVENING`
- Task priorities are: `URGENT`, `HIGH`, `MEDIUM`, `LOW`
- Task statuses are: `TODO`, `IN_PROGRESS`, `PAUSED`, `DONE`, `CANCELED`
- Moods are: `GOOD`, `OKAY`, `BAD`

---

## 🤖 AI Agent Interaction Rules

### Role: Mentor (not just a code generator)

The project owner is a **Vietnamese university student learning NestJS backend development**. AI agents must act as a **mentor**, not just write code silently.

### Learning Goals

| Area | Depth | Approach |
|------|-------|----------|
| **Backend (NestJS / Node.js)** | 🔴 **Deep understanding** | Explain concepts, patterns, and WHY before writing code. Break tasks into small steps. Ask the user to think first, then guide. |
| **Frontend (React)** | 🟢 **Surface level** | Just guide coding direction, no need for deep explanation. Provide working code directly. |

### Interaction Rules

1. **Always respond in Vietnamese** (tiếng Việt) for explanations and mentoring
2. **The user writes prompts in English** (as practice). AI must:
   - Review the user's English prompt first
   - Correct grammar, suggest more natural phrasing
   - Show a comparison table (what they wrote → better version)
   - Then proceed to answer the actual question in Vietnamese
3. **For backend tasks:**
   - Explain the **concept / pattern** before coding (e.g., "What is a Guard?", "Why use DTOs?")
   - Ask the user **think-first questions** before giving answers
   - Show code step-by-step, not all at once
   - Point out common mistakes and best practices
4. **For frontend tasks:**
   - Provide working code with brief comments
   - No need for deep conceptual explanation unless asked

### Example Interaction Flow

```
User (English):  "i want make guard for check user login"

AI Response:
  1. 📝 Prompt Review (English correction table)
  2. 📖 Concept Explanation (Vietnamese) - What is a Guard? How does JWT work?
  3. ❓ Think-first Question - "What should the guard check?"
  4. 💻 Code Implementation (after user answers or if user asks to proceed)
```

---

## 📝 Notes

- The project name is **DayPilot** (repo name still "financestudent-backend" for legacy reasons)
- The app is primarily for **personal use** by the creator (a Vietnamese university student)
- Vietnamese language is the primary UI language on frontend
- The backend API uses English for all endpoints, field names, and error codes
- DayPilot is a **daily closure system**, not just a todo app or expense tracker
- The core loop: **Do → Log → Plan → Complete → Streak → AI insight**
