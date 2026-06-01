'use server'

import { createClient } from '@/lib/supabase/server'

export type AnalyticsEventInput = {
  event_name: string
  url?: string
  payload?: Record<string, any>
  lead_id?: string
  session_id?: string
  funnel_id?: string
  variant_id?: string
}

export async function trackEvent(input: AnalyticsEventInput) {
  try {
    // Use anonymous client for public analytics to avoid JWT issues
    const supabase = await createClient({ anonymous: true })

    const { error } = await supabase.from('analytics_events').insert([
      {
        event_name: input.event_name,
        url: input.url,
        payload: input.payload || {},
        lead_id: input.lead_id,
        session_id: input.session_id,
        funnel_id: input.funnel_id,
        variant_id: input.variant_id,
      },
    ])

    if (error) {
      console.error('Error tracking event:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Fatal error in trackEvent:', err)
    return { success: false, error: 'Internal server error' }
  }
}
