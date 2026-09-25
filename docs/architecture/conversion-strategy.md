# Conversion Architecture

This document describes the technical conversion architecture implemented by the Well na Estrada platform. It focuses on the application flow and engineering decisions rather than private business strategy.

## Conversion Flow

The current landing-page experience uses a video sales letter (VSL) and progressive lead qualification:

1. **Hero and value proposition** — establish context and the primary call to action.
2. **VSL engagement** — present the core content through an embedded video.
3. **Timed CTA unlock** — enable the qualification action after the configured engagement threshold.
4. **Multi-step qualification** — collect structured information through a guided form.
5. **Server-side submission** — validate and persist the lead through server-side application logic.
6. **Confirmation** — complete the funnel without exposing privileged backend credentials to the browser.

## Technical Principles

- Keep the primary conversion path focused and easy to understand.
- Use progressive disclosure instead of presenting every question at once.
- Validate form data with React Hook Form and Zod.
- Persist only the local draft state required for the user experience.
- Submit lead data through server-side application logic.
- Keep analytics and tracking behind the application's privacy and consent controls.
- Keep production credentials, customer data, and private operational information out of the public repository.

## Current Implementation

The implementation uses:

- Next.js App Router and Server Components where appropriate.
- Framer Motion for UI transitions.
- React Hook Form and Zod for form state and validation.
- Supabase/PostgreSQL for lead persistence.
- Server Actions and server-side services for privileged operations.
- A configurable VSL integration and engagement threshold.

## Repository Scope

This repository documents technical architecture and implementation patterns. It intentionally excludes private sales scripts, customer data, production credentials, and internal operating procedures.
