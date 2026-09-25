import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'well_admin_session'
const SESSION_SECRET = process.env.PGRST_JWT_SECRET

/**
 * Verifies the simple secure HMAC session token using Web Crypto API
 * (Compatible with Edge Runtime)
 */
async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  try {
    const lastDot = token.lastIndexOf('.')
    if (lastDot === -1) return false

    const payload = token.slice(0, lastDot)
    const signature = token.slice(lastDot + 1)

    const encoder = new TextEncoder()
    const keyData = encoder.encode(SESSION_SECRET)
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    )

    const signatureBytes = new Uint8Array(
      signature.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
    )

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(payload),
    )

    if (!isValid) return false

    const [, , timestamp] = payload.split(':')
    const expirationTime = 60 * 60 * 24 * 1000 // 24 hours
    if (Date.now() - Number(timestamp) > expirationTime) return false

    return true
  } catch (err) {
    return false
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // 1. Try official Supabase Auth
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    // Fail silently, fallback to local session
  }

  // 2. Fallback to local session cookie if no Supabase user
  const localSession = request.cookies.get(SESSION_COOKIE)?.value
  const isLocalAuthenticated = await verifySessionToken(localSession)

  const isAuthenticated = !!user || isLocalAuthenticated

  if (
    !isAuthenticated &&
    !request.nextUrl.pathname.startsWith('/admin/login') &&
    request.nextUrl.pathname.startsWith('/admin')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
