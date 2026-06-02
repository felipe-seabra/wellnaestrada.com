# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased]

### Added
- **Architecture Refactor (Clean Architecture)**:
  - Implemented Repository and Service layers to decouple UI from data persistence.
  - Created `LeadRepository`, `SettingsRepository`, `ContentRepository`, and `AnalyticsRepository`.
  - Created `LeadsService`, `SettingsService`, `ContentService`, and `AnalyticsService`.
  - Added new Supabase tables `platform_settings` and `platform_content` for dynamic content management.
- **Admin Dashboard Expansion**:
  - Expanded `/internal` route with a professional admin layout and sidebar navigation.
  - Added `/internal/leads` for CRM-style lead management.
  - Added `/internal/settings` for dynamic brand and VSL configuration.
  - Added main `/internal` dashboard with high-level metrics (Total Leads, Leads Today, Recent Activity).
- **Configuration-Driven UI**:
  - Landing Page components (Hero, Navbar, Footer, About, Why Ireland) are now fully dynamic, fetching data from the Services layer.
  - Removed hardcoded brand names, video IDs, and marketing copy from the frontend codebase.
- **Privacy Policy Page**:
  - Created `src/app/politica-de-privacidade/page.tsx` with full compliance content (LGPD/GDPR).
  - Integrated SEO metadata for the privacy page.
- **Centralized Navigation**:
  - Implemented `src/lib/constants/navigation.ts` to manage all project URLs in a single place.
- **VSL Architectural Refactor**:
  - Replaced `react-player` with official YouTube IFrame Player API.
  - Created dedicated VSL feature module in `src/features/vsl`.
  - Implemented centralized video configuration and types.
  - Isolated player logic from business/analytics tracking.
- **VSL Visual Improvements**:
  - Implemented `VideoWrapper` for responsive handling in standard landscape (16:9) format.
  - Enhanced visual framing with premium borders, glossy overlays, and 2xl shadows.
  - Optimized desktop (max-width 5xl) and mobile (full-width) presentation.
  - Fixed: YouTube player now correctly fills 100% of its container, eliminating black empty areas.
  - Fixed: Reverted portrait (9:16) implementation as source video is standard landscape.
- **Terminal Cleanup**:
  - Removed all temporary debugging logs (`console.log`, `console.error`) that were printing full HTML content in the terminal during failed API requests.
  - Stabilized Server Actions to return clean error messages without logging raw objects.


### Changed
- **Navigation Fixes & Audit**:
  - Fixed broken links in Footer (Privacy Policy 404 and Application Form inaction).
  - Implemented smooth scroll-to-top behavior for the application form link to trigger the Hero's VSL/Funnel context.
  - Converted `Navbar` and `Footer` to Client Components to support interactive navigation handlers.
  - Conducted full project audit to eliminate dead links (`#`, `javascript:void(0)`).
- **Footer Redesign & Strategy Pivot**:
  - Removed all WhatsApp-first CTAs and direct "wa.me" links from the footer area.
  - Implemented a new professional `Footer` component with a premium "Stripe-like" aesthetic.
  - Shifted primary conversion focus to the qualification funnel/application form.
  - Integrated Instagram and Email as the primary contact channels in the footer.
  - Added professional legal sections and quick links for improved trust and navigation.
- **Visual Identity Redesign**:
  - Introduced "Kaushan Script" as the primary brand font for a "brush/travel-oriented" aesthetic.
  - Redesigned the Hero branding to be significantly larger (up to `9xl` on desktop) for maximum visual impact.
  - Prioritized "Well na Estrada" branding as the main focal point, communicating the creator's identity before the service value proposition.
  - Applied premium visual treatments including subtle text shadows and emerald accent coloring.
  - Updated Navbar branding for cross-platform consistency.
- **Architecture Refactor (Clean Architecture)**:
  - Reorganized project structure into `components/`, `features/`, `lib/`, and `hooks/`.
  - Moved domain-specific logic to `features/` (`vsl`, `lead-form`, `analytics`).
  - Centralized reusable UI patterns into `components/shared/` (`Section`, `Container`, `Heading`, `StatCard`, `CTAButton`).
  - Refactored `src/app/(marketing)/page.tsx` to use shared components, significantly reducing layout duplication.
- **Analytics & Lead Unification**:
  - Consolidated duplicate `trackEvent` logic into a single feature-based service.
  - Separated Server Actions for Leads and Analytics into their respective features.
  - Implemented centralized Zod validation in `src/lib/validations/`.

### Removed
- **Project Cleanup**:
  - Deleted unused/empty directories: `src/app/(funnel)`, `src/schemas`, `src/services`, `src/types`.
  - Removed dead code and abandoned experiments in `src/actions` and `src/lib`.
  - Cleaned up redundant layout wrappers in favor of shared components.

## [0.2.0] - 2026-05-29


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
