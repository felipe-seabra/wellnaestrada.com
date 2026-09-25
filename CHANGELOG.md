# Changelog

Notable changes to the project are documented here.

## Unreleased

### Added
- Configuration-driven marketing content and settings.
- Resilient fallback configuration for public routes.
- VSL-based conversion flow with a multi-step qualification funnel.
- Repository and service layers for data access and business logic.
- Administrative interface for lead and content management.
- Funnel analytics and event tracking.

### Changed
- Refactored the application around Next.js App Router and Server Components.
- Consolidated reusable UI and motion patterns.
- Replaced the original video integration with the official YouTube IFrame Player API.
- Improved responsive presentation and mobile conversion flow.
- Centralized validation with Zod and form handling with React Hook Form.

### Fixed
- Improved handling of backend failures on public routes.
- Improved PostgREST/local development configuration.
- Added defensive response validation around data access.

## 0.2.0 — 2026-05-29

### Added
- VSL preview and playback experience.
- 15-second CTA unlock flow.
- Multi-step onboarding funnel.
- Local draft persistence.
- Lead submission through Next.js Server Actions.
- Funnel analytics events.
- Responsive lifestyle and branding sections.

### Changed
- Shifted the primary conversion flow from direct contact CTAs to the qualification funnel.
- Improved the landing page visual identity and motion system.

## 0.1.0 — 2026-05-27

### Added
- Initial Next.js App Router project.
- TypeScript and Tailwind CSS 4.
- Supabase/PostgreSQL integration.
- Docker-based local development infrastructure.
- shadcn/ui and Radix UI components.
- Initial lead and analytics data model.
- ESLint, Prettier, Husky and lint-staged configuration.
