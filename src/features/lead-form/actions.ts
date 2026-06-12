'use server'

import { LeadRepository } from '@/repositories/lead.repository'
import { AnalyticsRepository } from '@/repositories/analytics.repository'
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
  try {
    const { data: lead, error } = await LeadRepository.create({
      full_name: input.full_name,
      email: input.email,
      phone: input.phone,
      funnel_answers: input.funnel_answers,
      video_engagement_seconds: input.video_engagement_seconds || 0,
      session_id: input.session_id,
      funnel_id: input.funnel_id,
      variant_id: input.variant_id,
      metadata: input.metadata || {},
    })

    if (error) throw new Error(error.message)

    if (lead) {
      try {
        await AnalyticsRepository.create({
          event_name: 'lead_captured',
          lead_id: lead.id,
          session_id: lead.session_id,
          payload: { source: lead.source },
        })
      } catch (analyticsError) {
        console.error(
          '[Analytics Error] Failed to track lead capture:',
          analyticsError,
        )
        // Fire and forget - do not fail the lead creation
      }
    }

    revalidatePath('/admin')
    return { success: true, data: lead }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
