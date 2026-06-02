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
- **VSL Implementation:** Use the official YouTube IFrame Player API directly. Avoid third-party player abstractions like `ReactPlayer` for better maintainability and control. Logic must be isolated in `src/features/vsl`.

## Core Conventions
- **Server-First:** Prefer Server Components and Server Actions.
- **Surgical Updates:** Use targeted code changes.
- **Documentation:** Maintain `CHANGELOG.md` and `docs/` updated.
- **Security:** Run `npm audit` before deployment.

## Folder Structure
- `src/app`: Routes and Layouts.
- `src/components/features`: Domain-specific logic.
- `src/components/ui`: Shadcn/ui components.
- `src/lib`: Utilities and Supabase clients.
- `src/actions`: Server-side mutations.

## Deployment Safety
Always run:
1. `npm run lint`
2. `npm run type-check`
3. `npm run build`
4. `npm audit`
