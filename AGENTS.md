# Agents Operational Guide

This file defines the mandatory behaviors, coding standards, and architectural rules for all AI agents working on **Well na Estrada**. It acts as the absolute source of truth for code generation and project maintenance.

## 1. Architectural Rules

- **Framework:** Next.js 15 (App Router) with TypeScript.
- **Backend:** Supabase (PostgreSQL, Edge Functions, Storage).
- **Styling:** TailwindCSS + shadcn/ui.
- **Animations:** Framer Motion.
- **State Management:** React Hook Form + Zod for forms; URL state for UI parameters; React Context for global UI state; Server Components for data fetching.
- **Data Fetching:** Always prefer Server Components (`app/`) for initial data fetching. Use Server Actions for mutations. Client-side fetching should be minimized.

## 2. Coding Standards

- **TypeScript:** Strict mode enabled. No `any` types. Use proper interfaces and Zod schemas for validation.
- **Components:** Functional components only. Keep components small, focused, and pure.
- **Naming Conventions:**
  - `PascalCase` for React components and interfaces.
  - `camelCase` for functions, variables, and hooks.
  - `kebab-case` for file names and directories (e.g., `user-profile.tsx`).
  - `UPPER_SNAKE_CASE` for global constants.
- **Clean Code:** DRY (Don't Repeat Yourself), single responsibility principle. Avoid deep nesting.

## 3. Folder Responsibilities

- `src/app`: Routes, pages, and layouts (Server Components by default).
- `src/components/ui`: Reusable, generic UI components (shadcn/ui).
- `src/components/features`: Domain-specific components (e.g., `lead-funnel`, `creator-profile`).
- `src/lib`: Utility functions, formatters, and core generic logic.
- `src/hooks`: Custom React hooks.
- `src/services`: External API wrappers and Supabase client abstractions.
- `src/actions`: Next.js Server Actions for mutations.
- `src/types`: Global TypeScript definitions.
- `src/schemas`: Zod validation schemas.

## 4. Forbidden Patterns

- No Prop Drilling (use Context or component composition).
- No inline styles (use Tailwind classes).
- No generic `index.ts` barrel files that cause circular dependencies.
- No client-side secrets exposure (use `NEXT_PUBLIC_` only when absolutely necessary).
- No unnecessary `useEffect` (use derived state or Server Actions).

## 5. Performance Rules

- **Lighthouse 95+ Target.**
- Use `next/image` for all images with proper sizing and formats.
- Optimize fonts using `next/font`.
- Implement dynamic imports (`next/dynamic`) for heavy, non-critical components.
- Rely on Next.js caching and ISR where applicable.

## 6. SEO & Accessibility Rules

- Generate dynamic metadata using Next.js `generateMetadata`.
- Include structured data (JSON-LD) for rich snippets.
- Use semantic HTML tags (`<article>`, `<nav>`, `<section>`).
- Ensure all interactive elements have `aria-labels` and keyboard support.
- Provide descriptive `alt` tags for images.

## 8. Communication Rules

- **Conversational Responses:** All chat interactions with the user MUST be in **Brazilian Portuguese**.
- **Codebase:** All code, filenames, and code comments MUST be in **English**.
- **Documentation:** All `.md` files in `/docs` and root (including `agents.md` and `gpt.md`) MUST be in **English**.
- **Commits:** All commit messages MUST be in **English**.
- **Terminology:** Technical and architectural terms should remain in English when appropriate to maintain professional standards.
