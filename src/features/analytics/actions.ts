'use server'

import { AnalyticsService } from '@/services/analytics.service'

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
    const { error } = await AnalyticsService.trackEvent({
      event_name: input.event_name,
      url: input.url,
      payload: input.payload || {},
      lead_id: input.lead_id,
      session_id: input.session_id,
      funnel_id: input.funnel_id,
      variant_id: input.variant_id,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: 'Internal server error' }
  }
}
