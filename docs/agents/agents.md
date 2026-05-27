# Agents Operational Guide

This file defines the mandatory behaviors, coding standards, and architectural rules for all AI agents working on **Well na Estrada**.

## 1. Architectural Rules
- **Framework:** Next.js 15 (App Router) with TypeScript.
- **Backend:** Supabase (PostgreSQL, Edge Functions, Storage).
- **Styling:** TailwindCSS 4 + shadcn/ui.
- **Animations:** Framer Motion.
- **State Management:** React Hook Form + Zod; URL state; Server Components for data.

## 2. Coding Standards
- **TypeScript:** Strict mode, no `any`.
- **Components:** Functional components, small and focused.
- **Naming:** PascalCase (Components), camelCase (hooks/vars), kebab-case (files).

## 3. Forbidden Patterns
- No Prop Drilling.
- No inline styles.
- No client-side secrets exposure.
- No unnecessary `useEffect`.

## 4. Communication Rules
- **Conversational Responses:** Brazilian Portuguese.
- **Code/Docs/Commits:** English.
