# Gemini Project Memory: Well na Estrada

## 1. Project Vision & Goals
**Well na Estrada** is a premium platform for Ireland exchange consultancy.
- **Goal:** Maximize lead generation and qualify leads for WhatsApp conversion.
- **Aesthetic:** Minimal, premium, "Stripe-like" (Emerald palette).

## 2. Architecture & Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS 4.
- **Backend:** Supabase (Postgres, SSR integration).
- **Infrastructure:** Dockerized local environment with PostgreSQL 15, PostgREST API, and Adminer.
- **Rationale:** Docker ensures consistency; PostgREST provides a fast API layer over Postgres; Supabase handles auth and complex logic.

## 3. UX & Conversion Strategy
- **Funnel:** CTA -> Qualification Modal (Zod/React Hook Form) -> Supabase Save -> WhatsApp Redirect.
- **Tracking:** PostHog for behavior, Meta Pixel for marketing.

## 4. Infrastructure Decisions (Docker)
- **well-db:** PostgreSQL 15 on port `54322`.
- **well-api:** PostgREST on port `3000`.
- **well-adminer:** Database management on port `8080`.
- **Rationale:** Isolated environment avoids conflicts with other local projects.

## 5. Roadmap & Milestones
- [x] Tech stack definition.
- [x] Docker infrastructure setup.
- [x] Governance & Security standards (Current).
- [ ] Initial UI shell & Landing page.
- [ ] Lead Funnel implementation.
