# Well na Estrada - Technical Overview

## Core Vision
A premium Ireland exchange consultancy platform focused on a VSL-driven conversion funnel.

## Architecture
- **Clean Architecture:** Strict separation between Services (Business), Repositories (Persistence), and UI (Presentation).
- **Admin Dashboard:** `/admin` path, protected by Supabase Auth and Next.js Middleware.
- **Dynamic Platform:** Managed via `site_settings` (flat table) and `platform_content` (section-based JSON).

## Tech Stack
- Next.js 15 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- Supabase (PostgreSQL + Auth + SSR)
- Framer Motion

## Modules
- **VSL Funnel:** Impression -> Delay -> CTA Unlock -> Multi-step Onboarding.
- **CRM:** Lead management with status tracking, search, and filtering.
- **Analytics:** Funnel metrics (Impressions, Starts, Unlocks, Conversions).
- **Content:** Real-time editing of Hero, Storytelling, and Footer sections.
