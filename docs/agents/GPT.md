# AI Project Memory & Continuity (Well na Estrada)

This document serves as the continuity and memory handover for all AI sessions. It enables any AI to understand the project context, priorities, and constraints in under 2 minutes, avoiding redundant investigations.

## 1. Project Summary
- **What it is:** Well na Estrada is a premium creator-led platform providing consultancy and exchange guidance for Brazilians moving to Ireland.
- **Target Audience:** Brazilians looking for an exclusive, reliable, and supportive experience to study, work, and live in Ireland.
- **Business Goals:** Drive high-quality lead conversion via a trust-building VSL (Video Sales Letter) funnel.

## 2. Current Architecture
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Language:** TypeScript (Strict)
- **Database/Backend:** 
  - **Production:** Supabase Cloud
  - **Local Development:** Docker-based Supabase infrastructure
- **Deployment:** Vercel

## 3. Major Decisions Already Made (Completed)
- Funnel refactored into a configuration-driven dynamic architecture.
- Funnel is frozen.
- Motion system implemented with a unified premium ease curve.
- Supabase Cloud migration successfully completed.
- Production login and session persistence fixed.
- Hero section completely redesigned.
- Mobile sticky CTA implemented.
- Password visibility toggle added to login.
- New branding assets and dynamic OG image created.

## 4. Areas Frozen
The following areas are stable and must **NOT** be redesigned without explicit approval:
- `src/components/funnel` (Funnel state machine and validation)
- Authentication flow (`src/middleware.ts` and `src/lib/supabase/middleware.ts` dual-mode setup)
- Supabase infrastructure and migrations

## 5. Areas Open For Improvement
- Content management architecture
- Footer and overall content centralization
- Premium motion enhancements across new views
- CRM enhancements and UI updates
- General Marketing UI improvements

## 6. Known Technical Debt
- **Content discoverability:** Some data flows lack tight typing (`any` usage).
- **Hardcoded content:** Some marketing and footer content is still hardcoded as fallback and needs migration to the database layer.
- **Footer audit pending:** Needs review for proper CMS centralization.

## 7. Current Priorities
1. **Content Simplification Sprint:** Audit and simplify text management.
2. **Footer/content centralization:** Ensure all global text lives in the DB/services.
3. **Premium Motion Enhancements:** Spread the established `[0.16, 1, 0.3, 1]` ease curve globally.
4. **CRM improvements:** Introduce advanced filtering and pagination.

## 8. Development Philosophy
- **Simplicity first:** If it works cleanly, leave it.
- **Avoid over-engineering:** No future-proofing for non-existent requirements.
- **Avoid complex abstractions:** No factories, builders, or generic engines.
- **Maintainability over architectural cleverness:** Code should be easy to delete or replace.

## 9. Deployment State
- **Production:** Active on Supabase Cloud.
- **Local:** Maintained via Docker Compose Supabase.
- **Hosting:** Vercel deployment is active.

## 10. Session Handoff Notes
During the recent sprints, the platform transitioned entirely to Supabase Cloud with a robust dual-authentication fallback mechanism for local resilience. The marketing landing page now relies on a centralized content configuration, and the VSL funnel has been consolidated into a dynamic 7-step renderer. Documentation (`AGENTS.md`, `README.md`, `GPT.md`) was completely rebuilt to ensure future AI models respect these architectural boundaries and never propose breaking changes to frozen modules.
