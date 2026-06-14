# Well na Estrada — Project Instructions

This file is the **single source of truth** for all AI agents and human developers working on this project.

## 1. Project Vision

**Well na Estrada** is a premium creator-led platform for Ireland exchange consultancy.

- **Goal:** Drive premium lead conversion through a trust-building VSL funnel.
- **Conversion Flow:** VSL Video → Delayed CTA (Dynamic unlock) → Multi-step Onboarding Form → SQL Lead Storage.
- **Aesthetic:** Cinematic, premium, emotionally strong (Emerald palette + Script branding).

## 2. Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS 4, shadcn/ui (Radix UI), Framer Motion.
- **Video:** Official YouTube IFrame Player API (Native integration).
- **Backend:** Supabase (PostgreSQL, SSR, Auth, Storage).
- **State Management:** React Hook Form + Zod; URL state; Server Components for data fetching.
- **Infrastructure:** Docker-based local development (Postgres, PostgREST, Adminer).

## 3. Architecture

### Principles

- **Clean Architecture:** Use Repository/Service pattern. Components must never query Supabase directly.
- **Repository Layer (`src/repositories/`):** Dedicated to data persistence and external integrations. Isolates Supabase/DB from the rest of the app.
- **Service Layer (`src/services/`):** Dedicated to business logic, fallbacks, and cross-domain orchestration. Do not create pure pass-through services; components and actions may call Repositories directly if no business logic is required.
- **Resilience First:** Public marketing routes (`/`, `/politica-de-privacidade`) must always render using graceful fallbacks if the database is unavailable.
- **Configuration-Driven:** All business content (copy, links, brand settings) must be managed in the database (`site_settings`, `platform_content`) and exposed via the `/admin` dashboard. No hardcoded marketing strings in the frontend.
- **Server-First Rendering:** Use Server Components by default. Interactivity is delegated to specialized Client Components.

### Folder Structure

- `src/app`: Routes and Layouts (Next.js App Router).
- `src/services`: Business logic layer.
- `src/repositories`: Data access layer.
- `src/components/shared`: Reusable UI patterns (Section, Container, Heading, CTAButton, StatCard).
- `src/components/ui`: Generic UI primitives (Radix/Shadcn).
- `src/components/marketing`: Marketing-specific sections.
- `src/components/funnel`: Funnel step components.
- `src/components/layout`: Global layouts (Navbar, Footer).
- `src/lib`: Utilities, Supabase clients, constants, validations.
- `src/features`: Domain-specific components, hooks, and actions (vsl, lead-form, analytics).
- `src/config`: Fallback defaults for resilience.

### Key Modules

- **VSL Funnel:** User watches a configurable amount of VSL to trigger the "Soft-Gated CTA" upgrade. Logic isolated in `src/features/vsl`. The CTA is always available but receives a premium visual upgrade after viewing. Uses the official YouTube IFrame Player API directly.
- **Lead Onboarding (Dynamic Funnel):** Configuration-driven multi-step flow rendered via `DynamicFunnelStep`.
  - Configured via an array in `src/components/funnel/config.ts`.
  - Step types: `text-input` (auto-focuses input), `choice-cards` (auto-advances 300ms after selection), `textarea-submit` (submits form via Server Action), `success` (static confirmation).
  - Navigation: Next/Prev buttons disabled automatically based on Zod/RHF validation state.
  - Local draft recovery via localStorage.
- **CRM:** Lead management with status tracking (new, contacted, qualified, converted, lost), search, and filtering.
- **Analytics:** Funnel metrics tracking (video_impression, video_start, cta_unlock, funnel_start, lead_captured). Session, variant, and engagement tracking.
- **Content Management:** Real-time editing of Hero, About, Why Ireland, and Footer sections via Admin Dashboard.

### Admin Platform

- **Dashboard:** Located at `/admin`. Protected by Supabase Auth and Next.js Middleware.
- **Leads:** CRM-style management of captured leads.
- **Settings:** Management of Brand Identity (Socials, Email) and Video Configuration (YouTube ID, Unlock Time).
- **Analytics:** High-level metrics and recent activity tracking.
- **Content:** Section-based content editing for the marketing landing page.

## 4. Coding Standards

- **TypeScript:** Strict mode. No `any`. Use `unknown` for untyped data and narrow with type guards. Use `Record<string, unknown>` instead of `Record<string, any>`.
- **Components:** Functional components only. Keep them small and focused.
- **Motion System:** All UI animations must use the shared Framer Motion wrappers in `src/components/shared/motion.tsx` (e.g., `FadeUp`, `ScaleIn`, `StaggerContainer`). Avoid inline `motion.div` configs to ensure a consistent premium ease curve (`[0.16, 1, 0.3, 1]`).
- **Naming:**
  - PascalCase for components and types.
  - camelCase for hooks, variables, and functions.
  - kebab-case for file names.
- **Validation:** All data validation logic (Zod) resides in `src/lib/validations/`.
- **Error Handling:** Never silently swallow errors. Log meaningful context. Re-throw Next.js dynamic errors (`DYNAMIC_SERVER_USAGE`).

## 5. Forbidden Patterns

- No `any` type annotations.
- No Prop Drilling.
- No inline styles.
- No client-side secrets exposure (never prefix Service Role Keys with `NEXT_PUBLIC_`).
- No direct usage of `createAdminClient()` or `SUPABASE_SERVICE_ROLE_KEY` inside Client Components.
- No unnecessary `useEffect`.
- No hardcoded credentials in migrations or scripts.
- No direct Supabase queries from components — always go through Services/Repositories.

## 6. Communication Rules

- **Conversational Responses:** Brazilian Portuguese.
- **Code, Documentation, and Commits:** English.
- **Commit Style:** Conventional Commits (enforced by commitlint + Husky).

## 7. Deployment Safety

Always run before any deployment:

1. `npm run lint`
2. `npm run type-check`
3. `npm run build`
4. `npm audit`

See `docs/security/deployment-checklist.md` for the full pre-deployment checklist.

## 8. Roadmap

- [x] Tech stack & Docker setup.
- [x] VSL Conversion Strategy.
- [x] Lead Funnel & Analytics implementation.
- [x] Cinematic Lifestyle & Branding integration.
- [x] Clean Architecture Refactor (Services/Repositories).
- [x] Expanded Admin Dashboard (Leads, Analytics, Settings).
- [ ] Advanced Filters for Leads.
- [ ] Content Management UI for all landing sections.
