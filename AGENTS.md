# Well na Estrada — Project Instructions

This file is the canonical set of development instructions for contributors and AI coding agents working on the project.

## Project Philosophy

- Build simple, readable code that is easy to change or remove.
- Prefer existing patterns over introducing unnecessary abstractions.
- Keep public marketing routes resilient with local fallback configuration.
- Keep business content configuration-driven where appropriate.
- Prefer server-first rendering and use Client Components only when browser interaction requires them.

## Architecture

### Layers

- `src/components/`: presentation and reusable UI.
- `src/features/`: domain-specific functionality such as the funnel, lead forms and analytics.
- `src/services/`: business logic and orchestration.
- `src/repositories/`: persistence and external data access.
- `src/lib/`: shared infrastructure, validation and utilities.
- `src/config/`: default and fallback configuration.

### Server-first

Use Next.js Server Components by default. Introduce Client Components for interactive behavior such as video playback, form state, animation and browser APIs.

### Funnel

The main conversion flow is:

VSL → CTA unlock → multi-step qualification form → server-side submission → lead persistence.

Keep the funnel configuration-driven and reuse the existing validation and UI patterns.

### Motion

Use the shared motion components in `src/components/shared/motion.tsx` for recurring animation patterns. Avoid duplicating animation configuration unnecessarily.

## Coding Standards

- TypeScript strict mode.
- Prefer explicit types and `unknown` over `any`.
- Functional React components.
- PascalCase for component names.
- camelCase for variables and functions.
- kebab-case for file names.
- Tailwind CSS for styling.
- Avoid unnecessary factories, builders and generic rendering engines.
- Keep components focused.
- Validate external input at system boundaries.
- Do not expose server-only credentials or privileged configuration to Client Components.

## Data Access

Keep persistence concerns outside presentation components. Use the repository/service structure when business logic or data orchestration is required.

Never commit real credentials, tokens, private keys or production environment files.

## Development Workflow

Before submitting changes, run the relevant checks:

```bash
npm run lint
npm run type-check
npm run build
```

Use Conventional Commits for changes, for example:

```
feat(vsl): improve CTA unlock flow
```

## Communication

Conversational responses may be written in Brazilian Portuguese. Code, documentation and commit messages should be written in English.

## Public Repository Rule

This repository is suitable for public technical review. Do not add client credentials, personal data, production secrets, private operational notes or proprietary business information.
