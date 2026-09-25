# Development & Deployment Roadmap

This document describes the current technical setup path for local development and deployment.

## 1. Local Foundation

1. Install project dependencies.
2. Copy `.env.example` to `.env.local`.
3. Configure the local Supabase or Docker/PostgREST environment.
4. Start the development server with `npm run dev`.

## 2. Backend

1. Configure Supabase environment variables.
2. Apply the versioned migrations in `supabase/migrations`.
3. Keep service-role credentials and session secrets server-side.
4. Use the admin setup script only with environment-provided credentials.

## 3. Application

1. Run the Next.js App Router application.
2. Use the multi-step qualification funnel for lead capture.
3. Keep privileged database operations in server-side code.
4. Keep anonymous tracking limited to the intended events and consent model.

## 4. Quality Checks

Before deployment, run:

```bash
npm run lint
npm run type-check
npm run build
```

Review environment configuration and database policies before each deployment.

## 5. Deployment

The application is structured for deployment to a Next.js-compatible host such as Vercel with Supabase as the managed database and authentication layer.

Production secrets must be configured through the hosting platform's environment settings and must never be committed to Git.
