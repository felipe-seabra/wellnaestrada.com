# Well na Estrada

Plataforma premium de consultoria e intercâmbio para a Irlanda.

## 1. Project Purpose & Product Description

**Well na Estrada** is a premium creator-led platform designed to drive high-quality lead conversion for Ireland exchange consultancy. It uses a trust-building Video Sales Letter (VSL) funnel, transitioning users through a cinematic experience into a multi-step onboarding form, and finally into a local CRM for lead management.

## 2. Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui (Radix UI), Framer Motion
- **Video:** Official YouTube IFrame Player API (Native integration)
- **Backend:** Supabase (PostgreSQL, SSR, Auth, Storage)
- **State Management:** React Hook Form + Zod, Context API
- **Infrastructure:** Docker-based local development (Postgres, PostgREST, Adminer)

## 3. Folder Structure Overview

```text
src/
├── app/               # Next.js App Router (Public routes & Admin Dashboard)
├── components/        # React components (Funnel, Layout, Marketing, Shared, UI)
├── config/            # Fallback configuration and default content
├── features/          # Domain-specific modules (Analytics, Lead Form, VSL)
├── lib/               # Utilities, Supabase clients, Constants, Validations (Zod)
├── repositories/      # Data access layer for Supabase
└── services/          # Business logic and content fallback orchestration
```

## 4. Environment Setup & Workflow

### Prerequisites
- Node.js 18+
- npm
- Docker & Docker Compose

### Local Development Workflow
1. Install dependencies: `npm install`
2. Start the Docker infrastructure: `docker compose up -d`
   - **PostgreSQL 15:** Port `54322`
   - **PostgREST API:** Port `8000`
   - **Adminer (DB UI):** Port `8080`
3. Run the development server: `npm run dev`
4. Setup Admin user (locally): `npm run setup-admin`

### Supabase Workflow (Local vs Production)
- **Local:** The app connects to the local PostgREST API (`http://localhost:8000`) spun up by Docker. Migrations located in `supabase/migrations` are automatically applied on the first run.
- **Production:** The app connects to Supabase Cloud via `NEXT_PUBLIC_SUPABASE_URL` and uses Supabase Auth directly.

## 5. Key Architectures

### Authentication Overview
We use a **Dual-Mode Authentication** system for resilience:
1. Tries **Supabase Cloud Auth** (GoTrue) first.
2. Falls back to a **Local DB** verification (`verify_admin_credentials` RPC) using an HMAC session cookie (`well_admin_session`) powered by the Web Crypto API.

### Funnel Overview
A configuration-driven 7-step onboarding flow (`src/components/funnel/config.ts`).
- **Flow:** VSL View → Unlock CTA → Funnel Form → Server Action (`createLead`) → CRM.
- **Persistence:** Local draft recovery via `localStorage`.

### Motion System Overview
Centralized in `src/components/shared/motion.tsx` using a premium ease curve (`[0.16, 1, 0.3, 1]`). We enforce the use of shared wrappers (`FadeUp`, `ScaleIn`, `StaggerContainer`) instead of inline `motion.div` configs to guarantee visual consistency.

## 6. Branding Assets & Deployment

- **Branding:** Uses Kaushan Script for the brand name, a premium Emerald color palette, and cinematic lifestyle images (`public/images/`). A dynamic OG image is available for social sharing.
- **Deployment (Vercel):** The project relies on Vercel's zero-config Next.js detection. Standard deployment processes apply. 
- **Pre-deployment Checklist:** Always run `npm run lint`, `npm run type-check`, `npm run build`, and `npm audit`.

## 7. Database Migration History

Migrations are stored in `supabase/migrations/`:
1. `init_schema.sql`: Initial `leads` and `analytics_events` tables.
2. `update_vsl_funnel.sql`: Funnel tracking columns.
3. `rls_policies.sql`: Row Level Security policies.
4. `platform_settings.sql`: Initial CMS tables.
5. `site_settings.sql`: Flat table for central settings.
6. `platform_admins.sql`: Local admin authentication fallback.
7. `drop_platform_settings.sql`: Cleanup of legacy tables.

---

## 8. Current State of the Project

### Completed
- [x] Supabase Cloud migration
- [x] Production login fix
- [x] Funnel refactor
- [x] Motion system
- [x] Hero redesign
- [x] Branding assets
- [x] OG image
- [x] Mobile CTA
- [x] Password visibility toggle

### Pending
- [ ] Content simplification audit
- [ ] Footer/content centralization
- [ ] Premium motion enhancements
- [ ] CRM improvements

## 9. Known Limitations
- Several instances of `any` types remain in the codebase, bypassing strict typing.
- Some dashboard metrics might rely on hardcoded fallbacks if data is missing.

## 10. Future Roadmap
- Implement advanced filters and pagination for leads in the CRM.
- Expand Content Management UI to cover all landing page sections natively without fallbacks.
- Migrate away from `any` types using robust Zod schemas.
