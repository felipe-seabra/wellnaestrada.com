import { createClient } from '@/lib/supabase/server'
import { validateResponse } from '@/lib/supabase/error-handler'

export interface AnalyticsEvent {
  id?: string
  event_name: string
  url?: string
  payload?: any
  lead_id?: string
  session_id?: string
  funnel_id?: string
  variant_id?: string
  created_at?: string
}

export const AnalyticsRepository = {
  async create(event: AnalyticsEvent) {
    const supabase = await createClient()
    const response = await supabase.from('analytics_events').insert(event)
    validateResponse(response.error)
    return response
  },

  async getStats() {
    const supabase = await createClient()
    // Basic stats for dashboard
    const { count: totalLeads, error: totalError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    validateResponse(totalError)

    const { count: leadsToday, error: todayError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte(
        'created_at',
        new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      )

    validateResponse(todayError)

    return {
      totalLeads: totalLeads || 0,
      leadsToday: leadsToday || 0,
    }
  },

  async getDetailedStats() {
    const supabase = await createClient()

    const { count: impressions } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_name', 'video_impression')

    const { count: starts } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_name', 'video_start')

    const { count: unlocks } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_name', 'cta_unlock')

    const { count: formOpens } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_name', 'funnel_start')

    const { count: leadCaptured } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_name', 'lead_captured')

    return {
      impressions: impressions || 0,
      starts: starts || 0,
      unlocks: unlocks || 0,
      formOpens: formOpens || 0,
      conversions: leadCaptured || 0,
    }
  },

  async getRecentEvents(limit = 10) {
    const supabase = await createClient()
    const response = await supabase
      .from('analytics_events')
      .select('*, leads(full_name)')
      .order('created_at', { ascending: false })
      .limit(limit)

    validateResponse(response.error)
    return response
  },
}
