import { createClient } from '@/lib/supabase/server'

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
    return await supabase.from('analytics_events').insert(event)
  },

  async getStats() {
    const supabase = await createClient()
    // Basic stats for dashboard
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    const { count: leadsToday } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte(
        'created_at',
        new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      )

    return {
      totalLeads: totalLeads || 0,
      leadsToday: leadsToday || 0,
    }
  },

  async getRecentEvents(limit = 10) {
    const supabase = await createClient()
    return await supabase
      .from('analytics_events')
      .select('*, leads(full_name)')
      .order('created_at', { ascending: false })
      .limit(limit)
  },
}
