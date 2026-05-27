import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient(options?: { anonymous?: boolean }) {
  const cookieStore = options?.anonymous ? null : await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (!cookieStore) return []
          try {
            return cookieStore.getAll()
          } catch (error) {
            console.warn('Supabase SSR: Error accessing cookies', error)
            return []
          }
        },
        setAll(cookiesToSet) {
          if (!cookieStore) return
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch (error) {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    },
  )
}
