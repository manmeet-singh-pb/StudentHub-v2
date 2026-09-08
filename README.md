# StudentHub v2

**A role-aware academic portal — API-first, JWT-secured, built to grow.**

StudentHub is a full-stack web platform for students and teachers. It provides authenticated workspaces, a student identity profile, subject enrollment, and a teacher-owned student registry — served from an Express REST API and persisted in MongoDB.

v2 exists because a local CRUD roster is not an academic product. The load-bearing pieces sit where they belong: identity on the server, authorization on the server, academic records in MongoDB.

[![React](https://img.shields.io/badge/React-19-0B1220?logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-0B1220?logo=vite&logoColor=646CFF)](https://vite.dev)
[![Express](https://img.shields.io/badge/Express-4-0B1220?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-0B1220?logo=mongodb&logoColor=47A248)](https://www.mongodb.com)
[![Auth](https://img.shields.io/badge/Auth-JWT-0B1220?logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![GitHub last commit](https://img.shields.io/github/last-commit/manmeet-singh-pb/StudentHub-v2?color=0B1220)](https://github.com/manmeet-singh-pb/StudentHub-v2)

| Layer | Current state |
| --- | --- |
| Frontend | React + Vite application with role-specific views |
| API | Express REST with JWT and role guards |
| Data | MongoDB via Mongoose |
| Teacher academic core | Subject/enrollment handlers exist; router not mounted |
| Campus suite | Attendance, timetable, exams — planned |

---

## Contents

- [About StudentHub](#about-studenthub)
- [Core Capabilities](#core-capabilities)
- [Product Architecture](#product-architecture)
- [Authentication and Security](#authentication-and-security)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Development Workflow](#development-workflow)
- [Current Development Status](#current-development-status)
- [Roadmap](#roadmap)
- [Engineering Principles](#engineering-principles)
- [Contributing](#contributing)
- [License](#license)

---

## About StudentHub

StudentHub is a student portal and academic management platform. Two audiences share one system and see different surfaces:

| Audience | What they get today |
| --- | --- |
| Students | Sign-in, a dashboard with enrolled subjects, and a read-only profile |
| Teachers | Sign-in, a workspace shell, and a private student registry (name, email, course) |
| Developers | A split client/server codebase with explicit auth, roles, and Mongoose models |

Academic life is usually scattered across attendance sheets, subject lists, profiles, and gradebooks. Most student-management demos collapse that into a single table in the browser. StudentHub v2 keeps the product small, but moves the foundation into a real session model:

- Accounts are first-class (`User`), with `student` and `teacher` roles.
- Passwords are hashed; sessions are JWTs, not a client-side flag.
- Student identity is a `StudentProfile`, not only a row a teacher typed in.
- Subjects and enrollments exist as domain documents, with uniqueness enforced in the database.
- Navigation, dashboards, and API access diverge by role.

Campus features people expect from a university portal — attendance, timetable, announcements, exams, results — are **not implemented**. They are the roadmap, not the current product.

---

## Core Capabilities

Only behavior the repository actually runs is listed as implemented. Unmounted route modules and UI placeholders are marked **in progress**.

### Implemented

**Authentication**  
Register with name, email, password, and role (`student` or `teacher`). Sign in with email and password. The API returns a JWT and a serialized user. The client stores the token, restores the session with `GET /api/auth/me`, and clears it on logout.

**Role-based access**  
API mounts are role-gated. `/api/students` requires a teacher. `/api/student` requires a student. The sidebar filters navigation by role. Route files pass intended roles into `ProtectedRoute`; **server-side checks are the source of truth**.

**Student experience**  
Authenticated students land on a dedicated dashboard. Enrolled subjects are fetched from the API and listed with name and subject code. Attendance, assessments, and activity cards are empty states — they are not live modules.

**Student profile**  
`GET /api/student/profile` returns (and lazily creates) a profile bound to the signed-in user: name, email, optional roll number, and membership date. The page shows a completeness indicator over those fields. The profile is **read-only**; there is no update endpoint yet.

**Teacher student registry**  
Teachers can create, search, filter, update, and delete student records (`name`, `email`, `course`). Records are persisted in MongoDB and scoped to the authenticated teacher (`owner`). This registry is distinct from student user accounts.

**Subject and enrollment data model**  
`Subject` documents include name, optional code, and a teacher reference. `Enrollment` links a `StudentProfile` to a `Subject`, with a unique compound index so the same student cannot be enrolled twice in the same subject. Students can list their enrollments via `GET /api/student/subjects`.

**Theme and interface**  
Light and dark themes, persisted in `localStorage`, with a no-flash bootstrap in `index.html` and a system-preference fallback. The shell is responsive (collapsible sidebar under 768px). CSS Modules, a shared button, an error boundary, and a skip-to-content link are in use.

**Protected APIs**  
Student and teacher collection routes require a valid Bearer token. Unknown routes return a structured 404. Uncaught errors pass through a central error handler. Duplicate-key conflicts return `409`.

### In progress

| Area | What exists | What is not live |
| --- | --- | --- |
| Teacher subject management | `server/routes/teacher.js` implements subject CRUD, ownership checks, and enrollment-by-email | The teacher router is **not mounted** in `server/app.js`, so those HTTP endpoints are unreachable |
| Teacher dashboard | Role-specific page | Placeholder copy only — no subject or marks UI |
| Student enrollment (teacher flow) | Model, unique index, and teacher handler | No mounted API and no teacher UI to enroll students |
| Frontend role guards | `allowedRoles` passed from `App.jsx`; nav is filtered | `ProtectedRoute` currently checks authentication only |
| Profile completeness | Indicator on the profile page | Roll number cannot be set through the API |

### Planned

Attendance, timetable, announcements, assignments, exams, results, mentor records, queries, notifications, academic progress, events, documents, library, fees, and LMS integration are **planned**. They are not available features. See [Roadmap](#roadmap).

### Live HTTP surface

| Method | Path | Access | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Public | Liveness |
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Issue JWT |
| GET | `/api/auth/me` | Authenticated | Restore session |
| GET, POST | `/api/students` | Teacher | List / create registry records |
| GET, PUT, DELETE | `/api/students/:id` | Teacher | Read / update / delete own records |
| GET | `/api/student/profile` | Student | Read (or create) own profile |
| GET | `/api/student/subjects` | Student | List enrolled subjects |

Frontend routes: `/login`, `/register` (public); `/` (role dashboard); `/students` (teacher registry); `/profile` (student profile).

---

## Product Architecture

StudentHub is a two-process system. The Vite app never talks to MongoDB. The Express app never renders pages. Authorization is decided on the server.

```mermaid
flowchart TB
    FE[React / Vite Frontend]
    RR[React Router / UI]
    API[Express REST API]
    JWT[JWT Authentication Middleware]
    AUTHZ[Role / Ownership Authorization]
    MG[Mongoose]
    DB[(MongoDB)]
    FE --> RR
    RR --> API
    API --> JWT
    JWT --> AUTHZ
    AUTHZ --> MG
    MG --> DB
```

| Layer | Responsibility |
| --- | --- |
| React / Vite frontend | Screens, theme, client session, form UX. Talks to the API through `src/services`. |
| React Router / UI | Public auth pages vs. `MainLayout` (navbar, sidebar, outlet). `ProtectedRoute` requires a session. |
| Express REST API | JSON endpoints under `/api`. CORS is set to the Vite origin (`http://localhost:5173`). |
| JWT authentication middleware | Requires `Authorization: Bearer` token, verifies the signature, loads the user, attaches `req.user`. |
| Role / ownership authorization | `requireRole` rejects the wrong role with `403`. Teacher registry queries are scoped by `owner`. Student profile and subjects are scoped to the caller. |
| Mongoose | Schemas, indexes, and serialization for `User`, `Student`, `StudentProfile`, `Subject`, `Enrollment`. |
| MongoDB | Source of truth for accounts and academic documents. |

The frontend is not trusted for access control. Hiding a nav item is convenience. A teacher-only route without a valid teacher JWT still fails at the API.

---

## Authentication and Security

What is implemented is listed below. Cookie sessions, refresh tokens, email verification, password reset, rate limiting, and HTTP-only token storage are **not** implemented.

**Password hashing**  
Passwords are hashed with `bcryptjs` (10 salt rounds) before insert. The `User` schema sets `select: false` on `password`, so list/get queries do not return hashes. Login loads the hash explicitly and compares with `bcrypt.compare`. Failed logins return a generic unauthorized message.

**JWT sessions**  
On register and login the API signs a token containing `{ userId }`, expiring in **7 days**. The client sends it as a Bearer token. Middleware verifies the token with `JWT_SECRET` and confirms the user still exists. Invalid, missing, or expired tokens return `401`.

**Protected routes**  
`/api/auth/register` and `/api/auth/login` are public. `/api/auth/me`, `/api/students`, and `/api/student` require a valid token. Collection mounts apply `auth` then `requireRole`.

**Role authorization**  
Roles are an enum: `student` or `teacher`. Registration only accepts those two values. Email is normalized to lowercase and unique.

**Ownership and isolation**  
Teacher registry documents store `owner` and are queried with `{ owner: req.user.id }`. Students cannot call teacher collection routes. Teachers cannot call student profile/subject routes. Subject handlers (when mounted) additionally match `{ teacher: req.user.id }`.

**Registration is development-stage**  
Role is currently **self-selected** at registration so both account types can be tested without an admin console. The auth route comments this as intentional and temporary. A production deployment should not ship unrestricted teacher self-provisioning.

**Client storage**  
The access token is stored in `localStorage` (`studenthub-auth-token`). This is a standard SPA pattern and is XSS-sensitive. It is not an HTTP-only cookie session.

**CORS**  
The API allows `http://localhost:5173` only. That matches the default Vite dev server.

**Secrets**  
`JWT_SECRET` must be set in `server/.env`. Do not commit `.env` files; they are gitignored.

---

## Technology Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | React 19, Vite 8, React Router 7 | JavaScript, CSS Modules |
| UI | Lucide React, PropTypes | Shared button, layout, theme toggle |
| Backend | Node.js, Express 4 | ESM (`type: module`) |
| Database | MongoDB, Mongoose 8 | Indexes on owner, email, enrollments |
| Authentication | jsonwebtoken, bcryptjs | Bearer JWT, hashed passwords |
| HTTP | cors, dotenv | Origin lock and env loading |
| Tooling | ESLint, Vite plugin React | `npm run lint` / `npm run build` |

Two packages, two install trees:

| Package | Path | npm name |
| --- | --- | --- |
| Client | repository root | `studenthub-v2` |
| API | `server/` | `studenthub-server` |

---

## Project Structure

```text
StudentHub-v2/
├── src/                          # Vite + React client
│   ├── assets/
│   ├── components/
│   │   ├── common/               # Button, ErrorBoundary, ProtectedRoute
│   │   ├── courses/              # Earlier-phase course UI (not routed)
│   │   ├── dashboard/            # Earlier-phase analytics widgets (not routed)
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── StatCard/
│   │   ├── students/             # Teacher registry table / form / modal
│   │   └── theme/
│   ├── constants/
│   ├── context/                  # AuthProvider
│   ├── hooks/                    # useStudents, useTheme
│   ├── layouts/                  # Authenticated shell
│   ├── pages/                    # Login, Register, dashboards, profile, students
│   ├── services/                 # auth, students, profile, subjects API clients
│   ├── styles/                   # tokens, global CSS
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── server/                       # Express API
│   ├── config/db.js
│   ├── middleware/               # auth, requireRole, notFound, errorHandler
│   ├── models/                   # User, Student, StudentProfile, Subject, Enrollment
│   ├── routes/                   # auth, students, student, teacher, health
│   ├── app.js                    # middleware + mounted routers
│   ├── server.js                 # process entry
│   └── .env.example
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

`server/routes/teacher.js` is in the tree and implements teacher subject/enrollment handlers. It is **not** registered in `server/app.js`.

Some client modules (`Courses`, `Dashboard` analytics, local course state) remain from earlier phases and are **not** in the current router.

---

## Getting Started

### Prerequisites

- **Node.js 18+** (the API uses `node --watch`)
- **npm**
- **MongoDB** running locally, or a MongoDB Atlas URI

### Clone

```bash
git clone https://github.com/manmeet-singh-pb/StudentHub-v2.git
cd StudentHub-v2
```

### Install

```bash
npm install
cd server
npm install
cd ..
```

### Configure the API

```bash
cp server/.env.example server/.env
```

Edit `server/.env` (see [Environment Configuration](#environment-configuration)). The client defaults to `http://localhost:5000/api` if `VITE_API_URL` is unset.

### Run the API

```bash
cd server
npm run dev
```

Health check: `GET http://localhost:5000/api/health`

### Run the client

In a second terminal, from the repository root:

```bash
npm run dev
```

Vite serves the app at [http://localhost:5173](http://localhost:5173). CORS is configured for that origin.

Create a student account and a teacher account from `/register` to exercise both workspaces.

---

## Environment Configuration

### API — `server/.env`

Copied from `server/.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studenthub
JWT_SECRET=change_this_to_a_real_secret
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | No | Listen port. Defaults to `5000`. |
| `MONGODB_URI` | **Yes** | MongoDB connection string. The process exits if it is missing. |
| `JWT_SECRET` | **Yes** | HMAC secret for access tokens. Use a long random value locally and in any shared environment. |

Atlas example (placeholder only):

```bash
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/studenthub
```

### Client

The client reads `import.meta.env.VITE_API_URL` and falls back to `http://localhost:5000/api`. To override, create a gitignored `.env` at the repository root:

```bash
VITE_API_URL=http://localhost:5000/api
```

There is no frontend `.env.example` in the repository. Do not commit secrets. `server/.env` and root `.env` are listed in `.gitignore`.

---

## Development Workflow

| Command | Where | What |
| --- | --- | --- |
| `npm run dev` | `server/` | API with `node --watch` on port 5000 |
| `npm start` | `server/` | API without watch |
| `npm run dev` | repo root | Vite dev server (port 5173) |
| `npm run build` | repo root | Production client bundle |
| `npm run preview` | repo root | Preview the built client |
| `npm run lint` | repo root | ESLint |

Typical loop: start MongoDB, start the API, start Vite, sign in at `/login`. The client and API are separate processes; both must be running for authenticated screens to load data.

---

## Current Development Status

StudentHub is in **active development**. The authentication core, role split, student profile, enrolled-subject list, and teacher registry are usable. The teacher academic workspace is the next seam.

| Capability | State |
| --- | --- |
| Registration, login, JWT session restore | **Implemented** |
| bcrypt password hashing | **Implemented** |
| Role-gated API mounts | **Implemented** |
| Teacher student registry (CRUD, search, filter) | **Implemented** |
| Student dashboard + enrolled subjects | **Implemented** |
| Student profile + completeness indicator | **Implemented** |
| Subject / Enrollment models + uniqueness | **Implemented** |
| Light / dark theme, responsive shell | **Implemented** |
| Teacher subject route module | **In progress** — written, not mounted |
| Teacher dashboard | **In progress** — placeholder |
| Teacher-driven enrollment UI | **In progress** |
| Frontend `allowedRoles` enforcement | **In progress** |
| Profile editing | **In progress** |
| Attendance | **Planned** |
| Timetable | **Planned** |
| Assignments / exams / results | **Planned** |
| Announcements / notifications | **Planned** |
| Mentor info, queries, events | **Planned** |
| Documents, library, fees, LMS | **Planned** |

The navbar bell is decorative. Login-panel figures (attendance percentages, due assignments) are visual copy, not live data.

---

## Roadmap

The intended direction is a university-style academic portal. Nothing in this section is implemented unless it also appears as **Implemented** above.

**Academic core**  
Wire and mount teacher subject management. Teacher-driven enrollment. Profile editing (roll number). Attendance. Timetable. Assignments. Exams. Results and grades. Academic progress.

**Communication**  
Announcements. Notifications (replace the inert bell). Student queries. Mentor information.

**Campus services**  
Events. Documents. Library. Fees / accounts. University services. LMS integration.

Work proceeds incrementally: keep auth and authorization stable, then add one academic vertical at a time rather than collapsing the domain into a single form.

---

## Engineering Principles

These are constraints already visible in the codebase, not aspirations.

- **Authorize on the server.** Role and owner checks live in Express middleware and queries. The UI does not decide access.
- **Separate the client from the API.** Pages call `src/services`; services call HTTP; Mongoose stays in `server/`.
- **Keep domain models explicit.** `User`, `Student`, `StudentProfile`, `Subject`, and `Enrollment` are different documents. The teacher registry is not the same thing as a student account.
- **Prefer small dependencies.** React, Router, Lucide, Express, Mongoose, JWT, bcrypt, cors, dotenv. No client state library, no UI kit.
- **Isolate UI.** CSS Modules, layouts, shared controls, an error boundary.
- **Develop in slices.** The history is phased (auth, roles, theme, subjects). New work should follow that grain.
- **Fail closed.** Missing token, bad token, wrong role, missing document, duplicate enrollment — each has a structured error, not a silent success.

---

## Contributing

This is a single-maintainer repository in active development. There is no contributor covenant, issue template set, or public roadmap tracker beyond this README.

If you want to change something:

1. Fork and branch from `main`.
2. Run the client and API locally as documented above.
3. Keep the change scoped. Do not mix a feature with a drive-by rewrite.
4. Do not commit `.env` files or secrets.
5. Open a pull request that states what is implemented vs. still open.

Useful seams right now: mounting the teacher router, a teacher subject UI, profile update APIs, and tightening `ProtectedRoute` so `allowedRoles` is enforced.

---

## License

No license file is included in this repository. Rights are unspecified until a license is published. Do not assume you may reuse, redistribute, or commercially exploit the source without an explicit grant from the copyright holder.

---

StudentHub v2 is the foundation of an academic platform: identity, roles, and records on a real API. The next work is not another landing screen — it is mounting the subject layer and growing the portal one vertical at a time.

[Back to top](#studenthub-v2)
