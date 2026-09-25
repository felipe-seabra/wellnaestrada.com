# Well na Estrada

A premium web platform for an Ireland exchange consultancy, designed around a conversion-focused Video Sales Letter (VSL) funnel and a multi-step lead qualification experience.

## Overview

Well na Estrada combines a cinematic marketing experience with a structured lead-generation flow.

The application guides visitors from the VSL through a progressive qualification form and securely submits qualified leads to a CRM-oriented backend.

The project was built as a production-oriented application, with a strong focus on:

- Conversion-focused UX
- Responsive and accessible interfaces
- Server-first rendering
- Secure data access
- Resilient public pages
- Reusable UI patterns
- Clear separation between presentation, business logic and persistence

## Features

### VSL Conversion Funnel

- Video Sales Letter integrated through the official YouTube IFrame Player API
- Timed CTA unlock
- Multi-step qualification experience
- Progress-aware funnel navigation
- Form validation with Zod
- React Hook Form integration
- Local draft persistence
- Server-side lead submission
- Funnel analytics events

### Content Management

- Configuration-driven marketing content
- Dynamic site settings
- Admin dashboard
- Editable landing-page content
- Centralized brand and video configuration
- Fallback content for public routes

### Lead Management

- Lead capture and persistence
- CRM-oriented admin interface
- Lead status management
- Search and filtering
- Pagination
- Conversion-oriented analytics

### UI & Motion

- Responsive mobile-first design
- Tailwind CSS 4
- shadcn/ui and Radix UI primitives
- Framer Motion
- Centralized motion wrappers
- Premium easing and transition patterns
- Optimized image rendering with Next.js

## Tech Stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 · React 19 · TypeScript |
| Rendering | Next.js App Router · Server Components |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui · Radix UI |
| Animation | Framer Motion |
| Forms | React Hook Form · Zod |
| Backend | Supabase · PostgreSQL |
| Data Access | Supabase SSR · PostgREST |
| Infrastructure | Docker · Docker Compose |
| Tooling | ESLint · Prettier · Husky · Commitlint |
| Deployment | Vercel |

## Architecture

The application follows a server-first architecture using the Next.js App Router.

```text
src/
├── app/
│   ├── (marketing)/       # Public marketing experience
│   └── admin/              # Administrative interface
│
├── components/
│   ├── funnel/             # Qualification funnel
│   ├── marketing/          # Landing page sections
│   ├── shared/             # Reusable application components
│   └── ui/                 # UI primitives
│
├── features/
│   ├── analytics/           # Funnel and event tracking
│   ├── lead-form/           # Lead submission and validation
│   └── vsl/                 # Video Sales Letter functionality
│
├── config/                  # Defaults and fallback configuration
├── lib/                     # Infrastructure and shared utilities
├── repositories/            # Persistence and data access
└── services/                # Business logic and orchestration
```

### Separation of responsibilities

**Components** handle presentation and user interaction.

**Features** group domain-specific functionality such as the VSL, funnel and analytics.

**Services** contain business logic and orchestration.

**Repositories** isolate persistence and external data access.

This keeps the UI independent from the underlying data layer and makes individual parts of the application easier to change.

## Funnel Architecture

The main conversion path is:

```text
┌───────────────┐
│      VSL      │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  CTA Unlock   │
└───────┬───────┘
        │
        ▼
┌─────────────────────┐
│ Multi-step Funnel   │
│                     │
│ React Hook Form     │
│ + Zod Validation    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Server Action     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Supabase / Database │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      CRM / Admin    │
└─────────────────────┘
```

The funnel is configuration-driven, allowing individual steps and validation rules to be maintained without duplicating the rendering logic.

## Rendering Strategy

The public experience uses Next.js Server Components by default.

Client Components are introduced only where browser interaction is required, such as:

- Video playback
- Funnel interaction
- Form state
- Animations
- Interactive admin interfaces

This approach keeps the public experience server-first while preserving rich interactions where they provide value.

## Data & Backend

Supabase provides the application's PostgreSQL database and authentication infrastructure.

The application separates data access from the UI through repositories and services.

Core areas include:

- Leads
- Site settings
- Marketing content
- Analytics events
- Administrative users

Row Level Security is used where appropriate to isolate protected data.

## Resilience

Public marketing routes are designed with fallback configuration so that the core experience can continue rendering when persistence services are temporarily unavailable.

The application keeps default configuration and content available locally and uses the database as the dynamic source when available.

This avoids making the public landing page completely dependent on a successful database request.

## Local Development

### Requirements

- Node.js
- npm
- Docker
- Docker Compose

### Installation

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Configure the required local or Supabase credentials in `.env.local`.

Start the local infrastructure:

```bash
docker compose up -d
```

Start the development server:

```bash
npm run dev
```

The application will be available through the Next.js development server.

## Quality Checks

Before deployment, the project can be validated with:

```bash
npm run lint
npm run type-check
npm run build
```

## Project Structure

The project intentionally favors straightforward, maintainable architecture over excessive abstraction.

The main architectural principles are:

- Server-first rendering
- Feature-oriented organization
- Isolated persistence
- Typed validation
- Reusable UI primitives
- Centralized motion patterns
- Configuration-driven content
- Graceful fallbacks
- Small, focused components

## Privacy & Security

The public repository does not contain production credentials.

Environment-specific values belong in local environment configuration and should never be committed.

Sensitive production configuration, operational documentation and private business information are intentionally excluded from the public version of the project.

## Deployment

The application is designed for deployment on Vercel with Supabase providing the production backend infrastructure.

The Next.js application uses the standard Vercel deployment model and can be built with:

```bash
npm run build
```

## Project Status

This repository represents a production-oriented implementation and is being prepared as a public technical case study.

The public version focuses on the engineering, architecture and UX decisions behind the application while keeping production-specific configuration and proprietary operational information private.
