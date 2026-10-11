# OpenCode Resume Progress

> **Purpose:** a single, self-contained snapshot of the ClassMate project so any OpenCode
> session (even a freshly opened terminal) can pick up exactly where we left off.
> **Last updated:** 2026-10-12 · **Repo:** PowerPuffBoys (Group 7)

---

## 0. Quick resume (copy-paste)

Background processes (API server, Flutter web app) die when the terminal closes, so
restart them:

```powershell
# 1. Flutter on PATH (new terminals may not have it)
$env:Path = "$env:USERPROFILE\flutter\bin;$env:Path"

# 2. Start the API  ->  http://localhost:3000
cd "D:\Classroom\Application Development\PowerPuffBoys\server"
npm install            # only needed once, or after dependency changes
npm run dev            # leave running

# 3. In a SECOND terminal, run the client  ->  opens in Edge
cd "D:\Classroom\Application Development\PowerPuffBoys\client"
flutter pub get        # only needed once
flutter run -d edge
```

Sign in with the demo account: **demo@classmate.app / demo12345**

Health check: `http://localhost:3000/api/health` → `{"status":"ok",...}`

---

## 1. What this project is

**ClassMate** — a cross-platform study app for students: weekly **schedule**,
one-tap **attendance** (with absence % and at-risk warnings), and **school works**
(assignments/quizzes/exams with due dates). One account across Mobile, Web, and Desktop.

- Team: **Nick** (PM / backend, repo owner) · **Jetlee** (backend / Flutter client)
- Timeline: **4 weeks**, started 2026-10-12, demo target **2026-11-09**
- Stack: **Flutter** client · **Node + Express** API · **SQLite** · **JWT auth**

---

## 2. Current status (done vs. pending)

| Area | State |
|---|---|
| Project proposal (`info.txt`) | ✅ Complete |
| Technical plan (`docs/plan.md`) | ✅ Complete |
| Team handoff guide (`docs/kickoff.md`) | ✅ Complete |
| Backend API (`server/`) | ✅ Built + verified — smoke test **25/25 passing** |
| Flutter client (`client/`) | ✅ Built — `analyze` clean, 5 tests pass, web build OK |
| App running end-to-end on Web (Edge) | ✅ Verified live at `http://localhost:5180` |
| **Android toolchain** | ⏳ **Not installed — next task** |
| Windows desktop build | ⏳ Needs the VS "Desktop development with C++" workload |
| Reminders (push notifications) | ⏳ Stretch — not started |

---

## 3. Environment setup (already done on this machine)

| Tool | Version / location |
|---|---|
| Node.js | **v26.11.1** (project requires **≥22**) |
| npm | 11.20.0 |
| Flutter SDK | **3.47.7 stable** · Dart 3.13.5 |
| Flutter path | `C:\Users\Admin\flutter` (added to user PATH as `…\flutter\bin`) |
| Available devices | `Windows (desktop)`, `Edge (web)` |
| Chrome | ❌ not installed — use **Edge** for web |
| Android Studio / SDK / Java | ❌ not installed |
| Visual Studio | Build Tools 2026 present, **C++ workload missing** |

Run `flutter doctor` to re-check. Enable **Developer Mode** before any
Android/desktop plugin build (see §5).

---

## 4. Repository map

```
PowerPuffBoys/
├── OpenCode Resume Progress.md   ← this file
├── info.txt                      project proposal (submitted)
├── README.md                     repo readme (links to kickoff.md)
├── CONTRIBUTING.md               Git/GitHub rulebook — read before committing
├── docs/
│   ├── kickoff.md                team brief + setup guide (start here)
│   ├── plan.md                   architecture, ERD, full API reference
│   ├── team-notes.md             session log + conflict drill
│   └── PROJECT PROPOSAL.docx / PROJECT_PROPOSAL.txt   ← user's own copies, do not touch
├── client/                       Flutter app (Android, iOS, Web, Windows, macOS)
│   ├── lib/main.dart             entry, providers, auth gate
│   ├── lib/config.dart           API base URL (dart-define)
│   ├── lib/api/                  ApiClient (http) + typed Api
│   ├── lib/models/               User, Subject, ScheduleSlot, Attendance, SchoolWork, Dashboard
│   ├── lib/state/                AuthState, AppState, TokenStore (shared_preferences)
│   ├── lib/screens/              login, register, home_shell, dashboard, schedule,
│   │                             attendance, works, subjects
│   ├── lib/utils/format.dart     color/date/time helpers
│   └── README.md                 client run notes + Windows caveats
├── server/                       Node + Express REST API
│   ├── src/app.js                Express app (no listen; testable)
│   ├── src/index.js              server bootstrap
│   ├── src/db.js                 SQLite schema (5 tables, auto-created)
│   ├── src/routes/               auth, subjects, schedule, attendance, works, dashboard
│   ├── src/services/attendance.js   attendance % logic
│   ├── scripts/smoke.js          end-to-end test (isolated DB/port)
│   ├── data/                     SQLite files (gitignored)
│   └── README.md                 endpoint reference
└── profiles/                     member pages
```

---

## 5. Known environment blockers & fixes

1. **Developer Mode is OFF** (needed for plugins on mobile/desktop builds). Enabling needs
   admin — the OpenCode shell is **not elevated**, so this must be done manually:
   *Settings → System → For developers → Developer Mode → On*, or run elevated:
   ```powershell
   New-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" `
     -Name AllowDevelopmentWithoutDevLicense -Type DWord -Value 1 -Force
   ```
2. **Smart App Control** blocks Flutter's `font-subset.exe` during a *release* web build.
   Workaround:
   ```powershell
   flutter build web --release --no-tree-shake-icons
   ```
   Debug runs (`flutter run`) are unaffected.
3. **`better-sqlite3` needs Node ≥22** (v13 has no Node 20 prebuild). Do not downgrade Node.
4. **Web target is Edge** (Chrome not installed).

---

## 6. Verification commands & last results

```powershell
# Backend
cd server
npm run smoke          # -> All 25 checks passed   (uses throwaway DB + port 3999)

# Client
cd client
flutter analyze        # -> No issues found!
flutter test           # -> 5/5 passed (models + format helpers)
flutter build web --release --no-tree-shake-icons   # -> Built build\web
```

Last run of all four: **all passing** (2026-10-12).

---

## 7. Git state (updated 2026-10-12)

Three branches are **committed and pushed** to `origin` — base branch `main` is protected:

| Branch | Commit | Contents |
|---|---|---|
| `docs/project-proposal` | `4d7fdeb` | `info.txt`, `docs/plan.md`, `docs/kickoff.md`, README, `.gitignore`, `profiles/`, this file |
| `feature/backend-scaffold` | `063ebb0` | `server/` (Express + SQLite + JWT) |
| `feature/flutter-client` | `8b44584` | `client/` (Flutter app) |

**Open the 3 PRs in the GitHub web UI** (`gh` is not installed):

- https://github.com/NickBayer1026/PowerPuffBoys/compare/main...docs/project-proposal?expand=1
- https://github.com/NickBayer1026/PowerPuffBoys/compare/main...feature/backend-scaffold?expand=1
- https://github.com/NickBayer1026/PowerPuffBoys/compare/main...feature/flutter-client?expand=1

The three branches touch disjoint files, so they merge cleanly in any order.

**Local-only branch `integration/all`** merges all three so the whole workspace is runnable
before the PRs land — **do not push it**. After the PRs merge: `git checkout main && git pull`.

---

## 8. API quick reference

Base `http://localhost:3000/api`; all routes need `Authorization: Bearer <token>` except
register/login.

```
GET  /health
POST /auth/register | /auth/login        GET /auth/me
GET/POST /subjects        GET/PUT/DELETE /subjects/:id
GET/POST /schedule        PUT/DELETE /schedule/:id
GET/POST /attendance      GET /attendance/summary
GET/POST /works           GET/PUT/DELETE /works/:id   PATCH /works/:id/status
GET  /dashboard/today
```

Data notes: dates `YYYY-MM-DD`, times `HH:MM`, timestamps ISO-8601.
Attendance % = `present / (present + absent + late)`; `cancelled` ignored; warning
threshold default **20%**.

---

## 9. Next steps / open threads

1. **Install Android toolchain** (chosen next step) — available via winget:
   ```powershell
   winget install --id Google.AndroidStudio -e
   winget install --id EclipseAdoptium.Temurin.21.JDK -e
   ```
   Then accept SDK licenses (`flutter doctor --android-licenses`) and run on a device/emulator.
2. **Enable Developer Mode** (§5) before Android/desktop builds.
3. *(Optional)* GitHub Actions workflow running `npm run smoke` on every PR.
4. *(Optional)* Add `flutter_local_notifications` for the reminders feature (mobile only).
5. **Done** — the 3 branches are committed & pushed. Open the PRs from §7.

---

## 10. Decisions locked (don't relitigate)

- App = **ClassMate**; attendance + schedule + school works.
- Flutter (one codebase, all platforms); Node + Express; SQLite; JWT + bcrypt.
- Attendance = manual one-tap (QR is future work).
- Token storage = `shared_preferences` (works on all platforms); can swap to
  `flutter_secure_storage` later.
- Reminders = stretch; MVP = auth, subjects, schedule, attendance, works, dashboard.
- iOS/macOS are supported targets but need a Mac to build; demo on Android + Web + Windows.
