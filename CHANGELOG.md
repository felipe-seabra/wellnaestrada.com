# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased]

### Fixed
- **Analytics & Auth Architecture**:
  - Isolated public analytics tracking from authenticated sessions to prevent `JWSError (CompactDecodeError)`.
  - Implemented `createClient({ anonymous: true })` to bypass malformed JWT cookies in public flows.
  - Added RLS policies to allow anonymous inserts for `leads` and `analytics_events`.
  - Ensured tracking resilience: failures no longer block UI or funnel progression.
- **Video Player Architecture**:
  - Replaced native HTML5 `<video>` element with `react-player` for better stability and YouTube support.
  - Fixed `NotSupportedError` by implementing robust source handling.
  - Refactored `useVideoTracking` hook to be player-agnostic.
  - Implemented dynamic loading for video player to optimize performance and prevent hydration issues.


### Added
- **VSL Architecture (Production Grade)**:
  - Implemented viewport-aware autoplay using Intersection Observer (Framer Motion `useInView`).
  - Added premium cinematic preview state with parallax effects and blurred overlays.
  - Migrated to a stable YouTube-first implementation using `react-player`.
  - Enhanced video tracking with impression, start, 15s completion, and full completion events.
  - Implemented buffering states and smooth transitions for a high-end feel.
- **Visuals & Lifestyle**:
  - Implemented immersive `LifestyleSection` with cinematic overlays and motion design.
  - Integrated high-quality creator imagery (`well.jpg`) across the landing page.
  - Optimized all marketing images using `next/image` for better LCP and performance.
- **VSL Funnel & Architecture**:
  - Implemented cinematic VSL video player with 15-second unlock mechanism.
  - Created premium "Typeform-like" multi-step onboarding funnel using Framer Motion and React Hook Form.
  - Added local draft persistence (localStorage) for the funnel process.
  - Implemented Next.js Server Actions for secure lead creation and analytics tracking.
  - Added deeper analytics fields (session_id, funnel_id, variant_id) to the database schema.
  - Created `/internal` lead dashboard for simplified management.
- **Branding & UI**:
  - Formalized branding typography (Script fonts for emotional highlights, Sans-serif for UI).
  - Enhanced Hero section with mobile-first focus and premium motion design.
  - Added decorative background elements for cinematic feel.

### Removed
- Legacy WhatsApp-centric CTAs in favor of the qualification funnel.
- Direct "wa.me" links in Navbar and Hero.

### Added
- Enterprise-grade project governance rules.
...
- Mandatory Security & Vulnerability Audit system.
- Professional Changelog system.
- Gemini Memory system for architectural continuity.
- Centralized Agent Governance in `docs/agents/`.
- Security documentation in `docs/security/`.

### Fixed
- Removed deprecated `CLAUDE.md`.
- Consolidated agent-related files into `docs/agents/`.

## [0.1.0] - 2026-05-27

### Added
- Initial project setup with Next.js 15 (App Router).
- Tailwind CSS 4 configuration with Premium Emerald aesthetic.
- Docker infrastructure (PostgreSQL, PostgREST, Adminer).
- Supabase SSR integration for client and server.
- Documentation for architecture, conversion strategy, and roadmap.
- UI components based on Radix UI and Shadcn.
- Husky and lint-staged for git discipline.
- Analytics foundation (PostHog and Meta Pixel structure).
- Initial schema for leads and analytics events.
- Linting and formatting setup (ESLint, Prettier).
