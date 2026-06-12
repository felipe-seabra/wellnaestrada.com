import 'server-only'
import { createServerClient } from '@supabase/ssr'
import { createClient as createBaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Creates an anonymous client with the public anon key.
 * Used when no auth context is needed (e.g., initial page load of public routes).
 */
export async function createAnonymousClient() {
  return createBaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (url, options) => {
          if (typeof url === 'string' && url.includes('/rest/v1/')) {
            url = url.replace('/rest/v1/', '/')
          } else if (url instanceof URL && url.pathname.includes('/rest/v1/')) {
            url.pathname = url.pathname.replace('/rest/v1/', '/')
          }
          return fetch(url, options)
        },
      },
    },
  )
}

/**
 * Creates an Admin client with the Service Role key that BYPASSES Row Level Security (RLS).
 * WARNING: NEVER use this in components that render public user data.
 * MUST only be used inside trusted server actions and protected API routes.
 */
export async function createAdminClient() {
  return createBaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (url, options) => {
          if (typeof url === 'string' && url.includes('/rest/v1/')) {
            url = url.replace('/rest/v1/', '/')
          } else if (url instanceof URL && url.pathname.includes('/rest/v1/')) {
            url.pathname = url.pathname.replace('/rest/v1/', '/')
          }
          return fetch(url, options)
        },
      },
    },
  )
}

/**
 * Creates an authenticated client that extracts user cookies from the incoming Next.js request.
 * Respects Row Level Security (RLS) under the context of the currently authenticated user (or anon if not logged in).
 * This is the standard client for public AND user-facing contexts.
 */
export async function createClient(options?: { anonymous?: boolean }) {
  if (options?.anonymous) {
    return createAnonymousClient()
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          try {
            return cookieStore.getAll()
          } catch (error) {
            return []
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch (error) {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
      global: {
        fetch: (url, options) => {
          if (typeof url === 'string' && url.includes('/rest/v1/')) {
            url = url.replace('/rest/v1/', '/')
          } else if (url instanceof URL && url.pathname.includes('/rest/v1/')) {
            url.pathname = url.pathname.replace('/rest/v1/', '/')
          }
          return fetch(url, options)
        },
      },
    },
  )
}
