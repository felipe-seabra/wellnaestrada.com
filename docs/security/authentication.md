# Authentication Architecture

This project uses a dual-mode authentication system to protect the `/admin` routes. This approach guarantees security in production while allowing seamless local development even when Supabase Auth services are unavailable or bypassed.

## Dual-Mode Strategy

The authentication flow is intercepted and evaluated at the Next.js Middleware level (`src/lib/supabase/middleware.ts`).

1. **Primary Auth (Supabase native):** The system first attempts to validate the user via `supabase.auth.getUser()`. If successful, the user is authenticated securely using Supabase's ecosystem.
2. **Fallback Auth (HMAC Cookie):** If Supabase validation fails (e.g., local development without internet, or a specific dev setup), the middleware checks for a custom secure cookie named `well_admin_session`.

## The `well_admin_session` Token

The local session token is a simple HMAC-signed string verified using the Web Crypto API, making it fully compatible with the Next.js Edge Runtime.

- **Structure:** `payload.signature`
- **Payload:** Contains timestamp and user data (e.g., `admin:true:timestamp`).
- **Signature:** Signed using `HMAC-SHA256`.
- **Secret Key:** Uses `PGRST_JWT_SECRET` from environment variables, or a fallback secret for local dev.
- **Expiration:** Hardcoded to 24 hours.

## Security Considerations

- **Production Rules:** In production environments, it is critical that `PGRST_JWT_SECRET` is strong, unique, and strictly kept secret.
- **Edge Compatibility:** The use of `crypto.subtle` instead of Node's `crypto` module ensures the middleware executes fast and without errors on Edge environments like Vercel.

## Administrator Setup

Administrators are provisioned via the `scripts/setup-admin.mjs` utility, which securely syncs credentials to both Supabase Auth and the local fallback `platform_admins` table.

To set up an admin:
1. Define `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env.local` file.
2. Run `npm run setup-admin`.

This ensures that hardcoded credentials are never committed to the repository.
