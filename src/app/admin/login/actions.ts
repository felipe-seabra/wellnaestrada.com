'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const SESSION_COOKIE = 'well_admin_session'
const SESSION_SECRET =
  process.env.PGRST_JWT_SECRET ||
  'super-secret-jwt-token-change-me-in-production'

/**
 * Creates a simple secure HMAC session token for local/custom auth
 */
function createSessionToken(userId: string, email: string) {
  const payload = `${userId}:${email}:${Date.now()}`
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex')
  return `${payload}.${signature}`
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()
  const cookieStore = await cookies()

  // 1. Try Official Supabase Auth (Cloud or Full Stack)
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error && data.user) {
      redirect('/admin')
      return
    }

    // If it's a real Auth error (wrong pass), we stop here
    if (error && !error.message.includes('fetch failed')) {
      redirect('/admin/login?error=Invalid credentials')
      return
    }
  } catch (err) {
    // Continue to local fallback if fetch fails
  }

  // 2. Fallback: Local DB Auth (Postgres + PostgREST)
  // This works with the provided docker-compose (well-api + well-db)
  const { data: admin, error: rpcError } = await supabase.rpc(
    'verify_admin_credentials',
    {
      p_email: email,
      p_password: password,
    },
  )

  if (rpcError || !admin || admin.length === 0) {
    console.error('[Login] Custom Auth failed:', rpcError)
    redirect('/admin/login?error=Invalid credentials')
    return
  }

  const user = admin[0]
  const token = createSessionToken(user.admin_id, user.admin_email)

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  })

  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  const cookieStore = await cookies()

  await supabase.auth.signOut()
  cookieStore.delete(SESSION_COOKIE)

  redirect('/admin/login')
}
