# Rival Blog — Secure Blog Platform

A production-ready, full-stack blog platform with authentication, private dashboard, public feed, likes, and comments.

**Live URL:** _[deployed-url-here]_

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS (v10) · TypeScript (strict) |
| Database | PostgreSQL · Prisma ORM |
| Frontend | Next.js 15 (App Router) · TypeScript |
| Styling | Tailwind CSS 3 · Dark mode |
| Auth | JWT (access + refresh) · bcrypt (12 rounds) |
| Logging | Pino (structured) · pino-pretty (dev) |
| Rate Limiting | @nestjs/throttler |

---

## Quick Start

### Prerequisites
- Node.js ≥ 18
- PostgreSQL (or Docker)

### 1. Clone & Install

```bash
git clone <repo-url> && cd rival-blog

# Backend
cd backend && npm install
cp .env.example .env   # Edit DATABASE_URL

# Frontend
cd ../frontend && npm install
cp .env.example .env
```

### 2. Database Setup

```bash
cd backend
npx prisma db push      # Create tables
npx prisma generate     # Generate client
```

### 3. Run

```bash
# Terminal 1 — Backend (port 4000)
cd backend && npm run start:dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

Open **http://localhost:3000**

---

## Architecture

### Backend (NestJS)

```
backend/src/
├── auth/                  # Authentication module
│   ├── auth.controller.ts # POST /register, /login, /refresh
│   ├── auth.service.ts    # Bcrypt hashing, JWT generation
│   ├── jwt.strategy.ts    # Passport JWT strategy + validation
│   ├── jwt-auth.guard.ts  # Route protection guard
│   └── dto/auth.dto.ts    # Input validation (class-validator)
├── blogs/                 # Blog management module
│   ├── blogs.controller.ts # CRUD + likes + comments
│   ├── blogs.service.ts   # Business logic + slug generation
│   └── dto/blog.dto.ts    # Validated DTOs with summary
├── public/                # Public endpoints (no auth)
│   └── public.controller.ts # GET /feed (paginated), GET /blogs/:slug
├── prisma/                # Database layer
│   ├── prisma.service.ts  # PrismaClient lifecycle
│   └── prisma.module.ts   # Global module
├── common/
│   ├── current-user.decorator.ts # @CurrentUser() param decorator
│   └── http-exception.filter.ts  # Global exception filter
├── app.module.ts          # Root module (throttler, logger, guards)
└── main.ts                # Bootstrap (CORS, validation, prefix)
```

**Key patterns:**
- **Global validation pipe** — Whitelist + transform + forbidNonWhitelisted
- **Global exception filter** — Consistent error shape across all endpoints
- **Structured logging** — Pino with auto HTTP request logging
- **Rate limiting** — 100 req/min globally, 10 req/min for auth endpoints
- **Owner-only modification** — Blogs checked against `userId` before mutation
- **N+1 prevention** — Feed uses Prisma `select` + `_count` aggregations in single query
- **Unique slug generation** — Auto-generated from title with collision handling

### Frontend (Next.js 15)

```
frontend/src/
├── app/                   # App Router pages
│   ├── page.tsx           # Landing page
│   ├── feed/page.tsx      # Public feed (paginated)
│   ├── blog/[slug]/       # Public blog detail
│   ├── login/page.tsx     # Login form
│   ├── register/page.tsx  # Registration form
│   ├── dashboard/         # Private dashboard
│   │   ├── page.tsx       # Blog list + management
│   │   ├── new/page.tsx   # Create blog
│   │   └── [id]/page.tsx  # Edit blog
│   ├── layout.tsx         # Root layout (AuthProvider, Navbar)
│   └── globals.css        # Design system (dark mode)
├── components/
│   ├── blog/
│   │   ├── BlogCard.tsx   # Feed card with hover glow
│   │   ├── BlogEditor.tsx # Create/edit form with summary
│   │   ├── LikeButton.tsx # Optimistic UI + heartbeat animation
│   │   └── CommentSection.tsx # Real-time comments
│   └── ui/
│       └── Navbar.tsx     # Glassmorphism navigation
└── lib/
    ├── api.ts             # API abstraction layer (typed)
    ├── auth.tsx           # AuthContext (login, register, logout)
    └── utils.ts           # Helpers (cn, dates, initials)
```

**Key patterns:**
- **API abstraction layer** — All calls go through typed `api.ts` functions
- **AuthContext** — Centralized auth state with localStorage persistence
- **Protected routes** — Dashboard redirects to `/login` if unauthenticated
- **Optimistic UI** — Like button updates immediately, rolls back on failure
- **Loading states** — Skeleton shimmer on every data-fetching page
- **Empty states** — Meaningful UI when no content exists
- **No page reloads** — Comments and likes work without navigation

### Database (Prisma)

```
User ──┬── Blog ──┬── Like
       │          └── Comment
       ├── Like
       └── Comment
```

- **User.email** — Unique index
- **Blog.slug** — Unique index, auto-generated
- **Like(userId, blogId)** — Unique compound constraint (prevents duplicates)
- **Comment** — Indexed by `blogId` and `createdAt`
- **Blog** — Indexed by `userId`, `isPublished+publishedAt`, and `slug`
- **Cascade deletes** — Deleting a user/blog cascades to likes/comments

---

## Security

| Feature | Implementation |
|---------|---------------|
| Password hashing | bcrypt with 12 salt rounds |
| Authentication | JWT access (15min) + refresh (7d) tokens |
| Route protection | Passport JWT guard on private endpoints |
| Input validation | class-validator DTOs with whitelist|
| Rate limiting | 100 req/min global, 10 req/min auth |
| Owner-only edits | userId check before blog mutation |
| Duplicate likes | DB unique constraint (userId, blogId) |
| Error responses | No stack traces or internal details exposed |
| CORS | Restricted to frontend origin |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login user |
| POST | /api/auth/refresh | Yes | Refresh tokens |
| GET | /api/blogs | Yes | List user's blogs |
| POST | /api/blogs | Yes | Create blog |
| GET | /api/blogs/:id | Yes | Get blog by ID |
| PATCH | /api/blogs/:id | Yes | Update blog (owner) |
| DELETE | /api/blogs/:id | Yes | Delete blog (owner) |
| POST | /api/blogs/:id/like | Yes | Like a blog |
| DELETE | /api/blogs/:id/like | Yes | Unlike a blog |
| GET | /api/blogs/:id/like | Yes | Get like status |
| POST | /api/blogs/:id/comments | Yes | Create comment |
| GET | /api/blogs/:id/comments | No | List comments |
| GET | /api/public/feed | No | Paginated public feed |
| GET | /api/public/blogs/:slug | No | Public blog by slug |

---

## Tradeoffs

1. **JWT in localStorage vs. httpOnly cookies** — Chose localStorage for simplicity with the SPA architecture. In production, httpOnly cookies would be more secure against XSS.

2. **No rich text editor** — Content is stored as plain text with `whitespace-pre-wrap` rendering. A markdown parser or rich editor (TipTap, Slate) would improve the writing experience.

3. **No async job processing** — Summary generation could be offloaded to a BullMQ worker. Currently, summaries are user-provided. Redis + BullMQ was not added to keep the stack lean.

4. **Client-side auth state** — Auth state is hydrated from localStorage on mount. A server-side session check would be more robust but adds complexity with App Router.

5. **No image uploads** — Blog content is text-only. Adding S3/Cloudinary integration would enable media-rich posts.

---

## What I Would Improve

- **Add BullMQ** for async summary generation with AI (OpenAI/Gemini)
- **Implement server-side rendering** for SEO on public blog pages
- **Add E2E tests** with Playwright covering auth flow, blog CRUD, and interactions
- **Rich text editor** (TipTap) for formatted content
- **Image upload** via presigned S3 URLs
- **WebSocket** notifications for real-time comment updates
- **Redis caching** for hot feed pages
- **Pagination cursor-based** instead of offset for feed scalability

---

## Scaling to 1M Users

### Database
- **Read replicas** — Route public feed queries to read replicas
- **Connection pooling** — Use PgBouncer to manage connection limits
- **Cursor-based pagination** — Replace offset pagination to avoid slow `SKIP`
- **Materialized views** — Pre-compute feed with like/comment counts
- **Partitioning** — Partition blogs table by `createdAt` for archival

### Application
- **Horizontal scaling** — Stateless NestJS behind a load balancer (ALB)
- **Redis cache** — Cache hot feed pages (TTL: 30s) and blog detail pages
- **CDN** — Put Next.js on Vercel/CloudFront edge for global latency
- **Rate limiting** — Move to Redis-backed rate limiter (distributed)

### Infrastructure
- **Kubernetes** — Auto-scale based on CPU/request metrics
- **Async workers** — BullMQ for summary generation, notifications
- **Monitoring** — Pino → Datadog/Grafana for structured log aggregation
- **Database** — Neon/Aurora serverless with auto-scaling storage

### Architecture at Scale
```
CDN (Vercel Edge)
       ↓
   Next.js SSR
       ↓
  API Gateway / ALB
       ↓
  NestJS Pods (x N)
    ├── Redis (cache + rate limit + sessions)
    ├── PostgreSQL Primary + Read Replicas
    └── BullMQ Workers (async jobs)
```

---

## License

MIT
