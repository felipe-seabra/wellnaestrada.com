# Architecture Overview

## Application Structure

The application is built using Next.js 15 App Router, focusing on a separation of concerns between server components, client components, and modular feature logic.

### Folder Structure Strategy

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── (marketing)/      # Route group for landing pages and SEO content
│   ├── (funnel)/         # Route group for isolated funnel/conversion flows
│   └── api/              # Edge API routes and webhooks
├── actions/              # Server Actions for mutations (form submissions, Supabase writes)
├── components/           # React components
│   ├── ui/               # Generic, reusable UI components (shadcn/ui)
│   ├── features/         # Domain-specific components (e.g., lead-funnel, testimonials)
│   └── layout/           # Header, Footer, Navigation
├── lib/                  # Shared utilities
│   ├── supabase/         # Supabase client instances (server, client, middleware)
│   ├── utils.ts          # Generic helpers (Tailwind merge, etc.)
│   └── constants.ts      # Global configurations
├── schemas/              # Zod schemas for validation
├── types/                # Global TypeScript definitions
├── services/             # External third-party integrations (e.g., analytics triggers)
└── hooks/                # Custom React hooks
```

## Architectural Principles

1.  **Server-First Rendering:** Use Server Components by default for better performance, smaller client bundles, and direct backend access. Only use `"use client"` when interactivity, state, or browser APIs are required.
2.  **Modular Domain Features:** Group related logic (components, specific hooks) into `components/features/[domain]` to keep the codebase scalable.
3.  **End-to-End Type Safety:** Use Zod schemas in `schemas/` to define data models. These schemas are used by React Hook Form on the client and Server Actions on the server.
4.  **Database Access:** All direct database interactions should occur within Server Actions or Server Components using the Supabase Server Client.
