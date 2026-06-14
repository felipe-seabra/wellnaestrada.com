import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
      },
      global: {
        fetch: (url, options) => {
          const urlString = url.toString()
          if (
            urlString.includes('localhost:8000') &&
            urlString.includes('/rest/v1/')
          ) {
            if (typeof url === 'string') {
              url = url.replace('/rest/v1/', '/')
            } else if (url instanceof URL) {
              url.pathname = url.pathname.replace('/rest/v1/', '/')
            }
          }
          return fetch(url, options)
        },
      },
    },
  )
}
