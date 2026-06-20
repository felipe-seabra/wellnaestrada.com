# Well na Estrada — Project Instructions & Handoff

This file is the **single source of truth** for all AI agents and human developers working on this project. It serves as a complete project handoff document to ensure anyone can understand the project state, architecture, priorities, and constraints in less than 5-10 minutes.

---

## 1. Project Philosophy & Simplicity-First Approach

- **Goal:** Drive premium lead conversion through a trust-building VSL funnel.
- **Aesthetic:** Cinematic, premium, emotionally strong (Emerald palette + Script branding, e.g., Kaushan Script).
- **Simplicity-First:** Write code that is easy to read, delete, and modify. Avoid complex abstractions unless strictly necessary.
- **Resilience First:** Public marketing routes (`/`, `/politica-de-privacidade`) must always render using graceful fallbacks (`src/config/defaults.ts`) if the database is unavailable.
- **Configuration-Driven:** All business content (copy, links, brand settings) must be managed in the database (`site_settings`, `platform_content`) and exposed via the `/admin` dashboard.

## 2. What NOT To Do (Strict Constraints)

To maintain simplicity and prevent architectural bloat, we explicitly **warn against and forbid** the following:
- ❌ **Unnecessary abstractions:** Do not create layers just for the sake of it.
- ❌ **Factories and Builders:** Avoid complex instantiation patterns. Use straightforward functions and plain objects.
- ❌ **Generic engines:** Do not build "engines" to render everything dynamically if a simple specific component will do (e.g., keep the `DynamicFunnelStep` focused, don't over-engineer it).
- ❌ **Over-engineering:** Solve the problem at hand. Do not future-proof for requirements that don't exist.
- ❌ **Prop Drilling:** Use React Context or Server Components instead.
- ❌ **Inline styles:** Use Tailwind CSS exclusively.
- ❌ **Client-side secrets exposure:** Never prefix Service Role Keys with `NEXT_PUBLIC_`.
- ❌ **Direct Supabase queries from components:** Always go through Services/Repositories.

## 3. Architecture & Major Decisions

### Clean Architecture Principles
- **Repository Layer (`src/repositories/`):** Dedicated to data persistence and external integrations. Isolates Supabase/DB from the rest of the app.
- **Service Layer (`src/services/`):** Dedicated to business logic, fallbacks, and cross-domain orchestration. Do not create pure pass-through services; components and actions may call Repositories directly if no business logic is required.
- **Server-First Rendering:** Use Server Components by default. Interactivity is delegated to specialized Client Components.

### Areas Frozen (Do Not Rewrite)
- **Root Middleware (`src/middleware.ts`) & Supabase Middleware (`src/lib/supabase/middleware.ts`):** The dual-mode authentication is working perfectly in both local and production environments. Do not change it.
- **Motion Wrappers (`src/components/shared/motion.tsx`):** The easing curves and component APIs are set. Use them, don't rewrite them.
- **Database Schema & Migrations (`supabase/migrations/`):** The current tables (`leads`, `site_settings`, `platform_content`, `analytics_events`, `platform_admins`) are stable. Add new migrations if needed, but do not alter existing migration files.
- **Funnel State Machine:** The `DynamicFunnelStep` and form validation mechanisms are stable and configuration-driven.

### Supabase Architecture (Local vs Production)
- **Local:** Docker-based infrastructure (`docker-compose.yml`) running PostgreSQL, PostgREST, and Adminer. Access via `http://localhost:54321`. Uses a local-first `platform_admins` table for authentication fallback.
- **Production:** Supabase Cloud. Access via `https://[project-ref].supabase.co`.
- **Clients:** 
  - `createBrowserClient` (`src/lib/supabase/client.ts`)
  - `createServerClient` (`src/lib/supabase/server.ts`)
  - `createAdminClient` (`src/lib/supabase/admin.ts` - Service Role, Server-only)

### Authentication Architecture
- **Dual-Mode System:** Uses official Supabase Auth alongside a fallback HMAC session cookie (`well_admin_session`) powered by Web Crypto API for Edge compatibility.
- **Protection:** Next.js Middleware protects all `/admin/*` routes, redirecting unauthenticated users to `/admin/login`.
- **Admin Setup:** Admin users are created via `npm run setup-admin` script locally, writing to `platform_admins` or Supabase Auth depending on the environment.

### Funnel Architecture
- **Conversion Flow:** VSL Video → Soft-Gated CTA (Dynamic unlock) → Multi-step Onboarding Form → SQL Lead Storage.
- **Configuration-Driven:** Managed by `src/components/funnel/config.ts` (7 steps).
- **Execution:** Orchestrated by `FunnelContainer`, rendered dynamically via `DynamicFunnelStep`, validated via Zod + React Hook Form, and submitted via Server Actions (`src/features/lead-form/actions.ts`).

### Motion System Architecture
- **Centralized:** All UI animations must use the shared Framer Motion wrappers in `src/components/shared/motion.tsx` (`FadeUp`, `ScaleIn`, `StaggerContainer`, `SectionReveal`).
- **Premium Curve:** Ensures a consistent premium ease curve (`PREMIUM_EASE = [0.16, 1, 0.3, 1]`). Avoid inline `motion.div` configs.

### Content Management Philosophy
- **Dynamic with Fallbacks:** `src/app/(marketing)/page.tsx` fetches from `ContentService.getAllContentSafe()` and `SettingsService.getMappedSettings()`. If DB fails, it gracefully falls back to `src/config/default-content.ts` and `src/config/default-settings.ts`.
- **Admin Editor:** Section-based content editing available at `/admin/content`, utilizing JSON fields (`platform_content.content`).

## 4. Coding & Commit Standards

- **TypeScript:** Strict mode. No `any`. Use `unknown` for untyped data and narrow with type guards. Use `Record<string, unknown>` instead of `Record<string, any>`. *(Note: see Known Technical Debt).*
- **Components:** Functional components only. Keep them small and focused. PascalCase for files/components.
- **Variables/Functions:** camelCase.
- **File Names:** kebab-case.
- **Error Handling:** Never silently swallow errors. Log meaningful context. Re-throw Next.js dynamic errors (`DYNAMIC_SERVER_USAGE`).
- **Communication:** Conversational responses in Brazilian Portuguese. Code, documentation, and commits in English.
- **Commit Style:** Conventional Commits (enforced by commitlint + Husky). Example: `feat(vsl): implement soft-gated CTA`. Short and assertive.

## 5. Maintenance Principles

- **Security Checks:** Always run the pre-deployment checklist (`npm run lint`, `type-check`, `build`, `audit`).
- **Database Modularity:** Prefer isolating domains in new tables rather than adding generic JSONB columns everywhere.
- **Performant Data Fetching:** Use `Promise.all` for independent parallel queries (e.g., fetching settings and content).

## 6. Known Technical Debt

- **`any` Types:** There are currently around 18 violations of the `any` type rule across the codebase (e.g., `card: any` in why-ireland mapping, `event: any` in analytics/youtube player, `Record<string, any>` in `ContentService`). These should be progressively typed with Zod or proper interfaces.
- **Hardcoded Admin Metrics:** Some dashboard metrics (VSL conversion rate, CTA clicks) in `src/app/admin/(dashboard)/page.tsx` might contain hardcoded fallback values.

## 7. Current Roadmap & Priorities

**Current Priorities:**
1. Content simplification audit
2. Footer/content centralization
3. Premium motion enhancements
4. CRM improvements (Advanced Filters)

**Maintenance:** Keep iterating on the admin dashboard UI and type-safety while preserving the fast, resilient public marketing pages.
