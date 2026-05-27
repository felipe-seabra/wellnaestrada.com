# Project Memory: Well na Estrada

## 1. Project Vision

**Well na Estrada** is a premium, creator-led platform focused on intercâmbio (studying in Ireland). It serves as a high-converting lead generation tool designed to transition users seamlessly into a WhatsApp conversion funnel. The brand positions itself as a modern startup with an aesthetic akin to Stripe, Airbnb, and premium creator brands—cinematic, minimal, and premium.

## 2. Business Goals

- Maximize lead generation through high-converting landing pages.
- Drive user conversion via a smart lead qualification form before redirecting to WhatsApp.
- Establish strong SEO presence for institutional and intercâmbio-related search terms.
- Provide a scalable foundation for a future CRM, CMS, AI integrations, and student portal.

## 3. Technical Decisions & Rationale

- **Next.js 15 (App Router):** Chosen for optimal SEO, server-side rendering, edge caching, and modern React features.
- **Supabase:** Provides a scalable PostgreSQL backend, Row Level Security (RLS) for data protection, and seamless Edge Functions, removing the need for managing separate backend infrastructure.
- **TailwindCSS + shadcn/ui:** Enables rapid, consistent, and highly customizable UI development without CSS bloat.
- **Server Actions + Zod:** Ensures end-to-end type safety and secure server-side form processing.

## 4. Branding & UX Philosophy

- **Vibe:** Cinematic, emotional, premium, minimal.
- **Palette:** Dark mode friendly with an "Irish green" accent palette. High contrast for CTA sections.
- **Typography:** Strong, clean, modern typography.
- **Motion:** Smooth, deliberate animations using Framer Motion to make the application feel "alive".

## 5. Current Stack

- **Frontend:** Next.js 15, React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, React Hook Form, Zod.
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions, RLS).
- **Analytics:** PostHog, Google Analytics, Meta Pixel, Microsoft Clarity.
- **DX:** ESLint, Prettier, Husky, lint-staged, Conventional Commits.

## 6. Conversion Strategy

- **Primary Flow:** User clicks CTA -> Opens lead qualification modal -> Answers questions -> Data saved to Supabase & Analytics event fired -> Redirected to WhatsApp with a dynamic message.
- **Tracking:** Full attribution and funnel tracking via PostHog and marketing pixels.

## 7. Completed Milestones

- [x] Defined foundational architecture and tech stack.
- [x] Established project memory (`gpt.md`) and agent instructions (`agents.md`).
- [x] Initialized documentation folder structure.

## 8. Future Roadmap

- Implementation of the initial UI shell and layout.
- Development of the lead qualification form and WhatsApp funnel.
- Integration of Supabase auth and database schema.
- Setup of robust analytics tracking.
- Implementation of programmatic SEO features.
- Future expansion: CMS integration for blog/articles, AI-driven lead scoring, and a dedicated student portal.
