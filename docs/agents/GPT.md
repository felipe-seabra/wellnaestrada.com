# AI Development Notes

This document complements [AGENTS.md](../../AGENTS.md) with high-level context for AI-assisted development.

## Project

Well na Estrada is a Next.js application centered on a conversion-focused marketing experience, a VSL funnel and lead management.

## Architecture

- Next.js App Router
- React and TypeScript
- Tailwind CSS and shadcn/ui
- Framer Motion
- Supabase/PostgreSQL
- Repository and service layers
- Configuration-driven funnel

## Development Principles

- Prefer simple solutions.
- Reuse existing architecture before introducing new abstractions.
- Preserve server-first rendering.
- Keep domain logic outside presentation components.
- Validate external data.
- Protect server-only credentials.
- Avoid changes to stable architecture without a concrete requirement.

## AI Collaboration

AI-generated changes should:

1. Read `AGENTS.md` first.
2. Inspect the existing implementation before proposing architectural changes.
3. Prefer small, focused changes.
4. Run the relevant lint, type-check and build checks.
5. Keep code, documentation and commits in English.
