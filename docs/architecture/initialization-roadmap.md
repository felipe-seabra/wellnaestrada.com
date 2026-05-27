# Setup & Deployment Initialization

## Recommended Initialization Roadmap

To bring this architecture to life, follow these sequential steps:

### Phase 1: Foundation

1.  **Initialize Next.js:** `npx create-next-app@latest well-na-estrada --typescript --tailwind --eslint --app --src-dir`
2.  **Configure Tools:** Setup Prettier, Husky, and lint-staged to enforce code quality and conventional commits.
3.  **Install Base UI:** Initialize `shadcn/ui` and install Framer Motion.
4.  **Environment Setup:** Create `.env.example` and define required variables (Supabase URLs, Analytics Keys).

### Phase 2: Backend Integration

1.  **Supabase Setup:** Create the Supabase project. Initialize the local Supabase CLI.
2.  **Database Schema:** Write initial SQL migrations for the `leads` table.
3.  **Client Configuration:** Setup Supabase SSR clients (Browser, Server, Middleware) under `src/lib/supabase`.

### Phase 3: Core Features

1.  **Layouts & Routing:** Create the main layout, landing page skeleton, and shared UI components (Header, Footer).
2.  **Lead Funnel:** Develop the multi-step qualification modal using React Hook Form + Zod.
3.  **Server Actions:** Implement the server-side logic to handle lead submission securely and redirect to WhatsApp.

### Phase 4: Observability & SEO

1.  **Analytics:** Integrate PostHog and Meta Pixel using a custom generic event tracker service.
2.  **SEO Foundation:** Setup dynamic sitemaps, `robots.txt`, and base metadata configurations.

### Phase 5: Polish & Deployment

1.  **Animations:** Add Framer Motion reveals and page transitions.
2.  **Performance:** Run Lighthouse audits, optimize fonts and images.
3.  **Deployment:** Deploy to Vercel and link environment variables.
