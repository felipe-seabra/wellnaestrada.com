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
