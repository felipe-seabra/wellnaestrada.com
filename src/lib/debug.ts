export async function debugLog(eventName: string, payload: any) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return

  try {
    await fetch(`${url}/rest/v1/analytics_events`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        event_name: 'DEBUG_AUTH_' + eventName,
        payload: payload,
      }),
    })
  } catch (e) {
    console.error('Debug log failed', e)
  }
}
