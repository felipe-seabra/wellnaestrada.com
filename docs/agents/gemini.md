# Gemini Project Memory: Well na Estrada

## 1. Project Vision & Goals
**Well na Estrada** is a premium platform for Ireland exchange consultancy.
- **Goal:** Drive premium lead conversion through a trust-building VSL funnel.
- **Primary Conversion:** VSL Video -> Delayed CTA (Dynamic unlock) -> Multi-step Onboarding Form -> SQL Lead Storage.
- **Aesthetic:** Cinematic, premium, emotionally strong (Emerald palette + Script branding).

## 2. Architecture & Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS 4.
- **Backend:** Supabase (PostgreSQL, SSR integration).
- **Clean Architecture:** 
  - **Services (src/services/):** Domain logic and orchestration. Mandatory layer for all business rules.
  - **Repositories (src/repositories/):** Data access and persistence abstraction. Isolates Supabase/DB from the rest of the app.
  - **Shared Components:** Centralized reusable UI patterns in `src/components/shared/`.
- **Configuration-Driven:** All business content (copy, brand, video config) is dynamic and managed via the Admin Dashboard. No hardcoded marketing strings in the frontend.
- **Infrastructure:** Dockerized environment for local development.

## 3. UX & Conversion Strategy (VSL Funnel)
- **Mechanism:** User watches a configurable amount of VSL to unlock the "Iniciar Planejamento" button.
- **Funnel:** 7-step onboarding flow (Name, Email, WhatsApp, Current Moment, Financials, Goal, Confirmation).
- **Persistence:** Local draft recovery for mobile-first optimization.
- **Tracking:** Detailed session, variant, and engagement analytics (video_impression, cta_unlock, lead_captured).

## 4. Admin Platform
- **Dashboard:** Located at `/admin`.
- **Leads:** CRM-style management of captured leads.
- **Settings:** Management of Brand Identity (Name, Socials) and Video Configuration (YouTube ID, Unlock Time).
- **Analytics:** High-level metrics and recent activity tracking.

## 5. Roadmap & Milestones
- [x] Tech stack & Docker setup.
- [x] VSL Conversion Strategy.
- [x] Lead Funnel & Analytics implementation.
- [x] Cinematic Lifestyle & Branding integration.
- [x] Clean Architecture Refactor (Services/Repositories).
- [x] Expanded Admin Dashboard (Leads, Analytics, Settings).
- [ ] Advanced Filters for Leads.
- [ ] Content Management UI for all landing sections.
