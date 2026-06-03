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

  async findAll(options?: {
    search?: string
    status?: string
    limit?: number
    offset?: number
  }) {
    const supabase = await createClient()
    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (options?.status && options.status !== 'all') {
      query = query.eq('status', options.status)
    }

    if (options?.search) {
      query = query.or(
        `full_name.ilike.%${options.search}%,email.ilike.%${options.search}%`,
      )
    }

    if (options?.limit) {
      const offset = options.offset || 0
      query = query.range(offset, offset + options.limit - 1)
    }

    const response = await query
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
