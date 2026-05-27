'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type LeadInput = {
  full_name: string
  email: string
  phone: string
  funnel_answers: Record<string, any>
  video_engagement_seconds?: number
  session_id?: string
  funnel_id?: string
  variant_id?: string
  metadata?: Record<string, any>
}

export async function createLead(input: LeadInput) {
  // Use anonymous client for public lead creation to avoid JWT errors
  const supabase = await createClient({ anonymous: true })

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        full_name: input.full_name,
        email: input.email,
        phone: input.phone,
        funnel_answers: input.funnel_answers,
        video_engagement_seconds: input.video_engagement_seconds || 0,
        session_id: input.session_id,
        funnel_id: input.funnel_id,
        variant_id: input.variant_id,
        metadata: input.metadata || {},
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/internal')
  return { success: true, data }
}

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
