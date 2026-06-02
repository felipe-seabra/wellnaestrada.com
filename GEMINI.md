# Well na Estrada - Project Instructions

This file serves as the primary guidance for the project's architecture, conventions, and workflows.

## Project Vision
Premium creator-led platform for Irish exchange consultancy. Focus on high-conversion funnels and premium aesthetics.

## Tech Stack
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS 4, Radix UI, Framer Motion.
- **Video:** Official YouTube IFrame Player API (Native integration).
- **Backend:** Supabase (PostgreSQL, SSR, Auth, Storage).
- **Infrastructure:** Docker-based local development (Postgres, PostgREST).

## Architectural Decisions
- **Clean Architecture:** Use Repository/Service pattern. Components must never query Supabase directly.
- **Repository Layer (`src/repositories/`):** Dedicated to data persistence and external integrations.
- **Service Layer (`src/services/`):** Dedicated to business logic and cross-domain orchestration.
- **Configuration-Driven:** All business content (copy, links, brand settings) must be managed in the database (`platform_settings`, `platform_content`) and exposed via the Admin dashboard.
- **VSL Implementation:** Use the official YouTube IFrame Player API directly. Logic must be isolated in `src/features/vsl`.

## Folder Structure
- `src/app`: Routes and Layouts.
- `src/services`: Business logic layer.
- `src/repositories`: Data access layer.
- `src/components/shared`: Reusable UI patterns.
- `src/lib`: Utilities and Supabase clients.
- `src/features`: Domain-specific components and hooks.

## Deployment Safety
Always run:
1. `npm run lint`
2. `npm run type-check`
3. `npm run build`
4. `npm audit`
