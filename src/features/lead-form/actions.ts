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
    return { success: false, error: error.message }
  }

  revalidatePath('/internal')
  return { success: true, data }
}
