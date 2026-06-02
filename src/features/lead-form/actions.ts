'use server'

import { LeadsService } from '@/services/leads.service'
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
    const data = await LeadsService.createLead({
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

    revalidatePath('/internal')
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
