# Gemini Project Memory: Well na Estrada

## 1. Project Vision & Goals
**Well na Estrada** is a premium platform for Ireland exchange consultancy.
- **Goal:** Drive premium lead conversion through a trust-building VSL funnel.
- **Primary Conversion:** VSL Video -> Delayed CTA (15s unlock) -> Multi-step Onboarding Form -> SQL Lead Storage.
- **Aesthetic:** Cinematic, premium, emotionally strong (Emerald palette + Script branding).

## 2. Architecture & Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS 4.
- **Backend:** PostgreSQL (Generic migrations, Supabase compatible, SSR integration).
- **Architecture (Clean Architecture):** 
  - **Shared Components:** Centralized reusable UI patterns in `src/components/shared/` (Section, Container, Heading, StatCard, CTAButton).
  - **Feature-Based Logic:** Domain-specific logic organized in `src/features/` (vsl, lead-form, analytics).
  - **Validations:** Centralized Zod schemas in `src/lib/validations/`.
  - **Server Actions:** Secure feature-based actions for lead creation and analytics.
- **Core Libraries:** 
  - Framer Motion (Premium motion & Viewport tracking).
  - React Hook Form + Zod (Funnel validation).
  - YouTube IFrame API (Official player integration for VSL).
- **Public Flow Strategy:** 
  - **Zero-JWT tracking**: Anonymous Supabase clients skip session persistence to prevent `JWSError`.
  - **VSL Experience:** Viewport-aware muted autoplay with explicit unmute control.
- **Infrastructure:** Dockerized environment (PostgreSQL 15, PostgREST, Adminer).

## 3. UX & Conversion Strategy (VSL Funnel)
- **Mechanism:** User watches 15s of VSL to unlock the "Iniciar Planejamento" button.
- **Funnel:** 7-step onboarding flow (Name, Email, WhatsApp, Current Moment, Financials, Goal, Confirmation).
- **Persistence:** Local draft recovery for mobile-first optimization.
- **Tracking:** Detailed session, variant, and engagement analytics (video_15s, cta_unlock, form_complete).

## 4. Infrastructure Decisions (Docker)
- **well-db:** PostgreSQL 15 on port `54322`.
- **well-api:** PostgREST on port `3000`.
- **well-adminer:** Database management on port `8080`.
- **Internal Dashboard:** `/internal` route for lead management and tracking overview.

## 5. Roadmap & Milestones
- [x] Tech stack & Docker setup.
- [x] Governance & Security standards.
- [x] VSL Conversion Strategy (Current).
- [x] Lead Funnel & Analytics implementation.
- [x] Cinematic Lifestyle & Branding integration.
- [ ] Advanced Internal Dashboard with filters.

