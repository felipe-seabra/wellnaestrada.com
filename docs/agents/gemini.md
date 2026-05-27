# Gemini Project Memory: Well na Estrada

## 1. Project Vision & Goals
**Well na Estrada** is a premium platform for Ireland exchange consultancy.
- **Goal:** Drive premium lead conversion through a trust-building VSL funnel.
- **Primary Conversion:** VSL Video -> Delayed CTA (15s unlock) -> Multi-step Onboarding Form -> SQL Lead Storage.
- **Aesthetic:** Cinematic, premium, emotionally strong (Emerald palette + Script branding).

## 2. Architecture & Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS 4.
- **Backend:** PostgreSQL (Generic migrations, Supabase compatible, SSR integration).
- **Core Libraries:** Framer Motion (Premium motion & Viewport tracking), React Hook Form + Zod (Funnel validation), ReactPlayer (Stable YouTube-first video engine).
- **Architecture:** Next.js Server Actions for lead creation and analytics. Context API for multi-step form state. Dynamic loading for third-party scripts/players to prevent hydration mismatches. Anonymous-safe tracking flow (bypassing malformed JWTs). Viewport-aware autoplay (mutado) for VSL with debounced (400ms) cinematic stabilization to prevent playback interruptions (AbortError).
- **Infrastructure:** Dockerized local environment with PostgreSQL 15, PostgREST API, and Adminer.

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

