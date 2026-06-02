import { createClient } from '@/lib/supabase/server'
import { validateResponse } from '@/lib/supabase/error-handler'

export interface Lead {
  id?: string
  full_name: string
  email: string
  phone?: string
  budget?: string
  travel_intent_date?: string
  status?: string
  source?: string
  metadata?: any
  funnel_answers?: any
  video_engagement_seconds?: number
  session_id?: string
  funnel_id?: string
  variant_id?: string
}

export const LeadRepository = {
  async create(lead: Lead) {
    const supabase = await createClient()
    const response = await supabase.from('leads').insert(lead).select().single()
    validateResponse(response.error)
    return response
  },

  async findAll() {
    const supabase = await createClient()
    const response = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    validateResponse(response.error)
    return response
  },

  async findById(id: string) {
    const supabase = await createClient()
    const response = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()
    validateResponse(response.error)
    return response
  },

  async updateStatus(id: string, status: string) {
    const supabase = await createClient()
    const response = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
    validateResponse(response.error)
    return response
  },
}
