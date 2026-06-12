# Architecture Overview

## Application Structure

The application is built using Next.js 16 App Router, focusing on a separation of concerns between server components, client components, and modular feature logic.

### Folder Structure Strategy

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts)
├── features/             # Domain-specific logic (vsl, lead-form, analytics)
│   ├── actions.ts        # Feature-specific Server Actions
│   ├── client.ts         # Feature-specific client utilities
│   └── ...               # Specific hooks or constants
├── components/           # React components
│   ├── ui/               # Generic UI primitives (Radix, Shadcn)
│   ├── shared/           # Reusable UI patterns (Section, Container, Heading)
│   ├── marketing/        # Marketing-specific UI sections
│   ├── funnel/           # Funnel-specific UI components
│   └── layout/           # Global layouts (Navbar, Footer)
├── lib/                  # Shared utilities
│   ├── supabase/         # Supabase client configurations
│   ├── validations/      # Centralized Zod schemas
│   ├── constants/        # Global constants
│   └── utils.ts          # Generic helpers
├── hooks/                # Global React hooks
└── types/                # Global TypeScript definitions
```

## Architectural Principles

1.  **Server-First Rendering:** Use Server Components by default. Interactivity is delegated to specialized Client Components or shared UI patterns.
2.  **Clean Architecture & SRP:** Separate UI (`components/`) from business logic (`features/`). Each feature has a single responsibility and centralizes its actions and utilities.
3.  **Shared UI Patterns:** Use `components/shared/` to enforce visual consistency and reduce layout duplication across the marketing site and funnel.
4.  **Centralized Validation:** All data validation logic (Zod) resides in `lib/validations/`, ensuring consistent rules across the client and server.
5.  **Secure Public Tracking:** Use anonymous Supabase clients for public interactions to avoid session-related errors (`JWSError`) on the landing page.
6.  **Admin Privileged Writes:** Use `createAdminClient()` (secured by `server-only`) inside Server Actions for privileged database updates (like CRM mutations and `site_settings`) to bypass RLS securely.
7.  **Dual-Mode Authentication:** The `/admin` routes are protected by a hybrid auth system (Supabase native Auth + local HMAC cookie fallback) implemented in Next.js Middleware.
