import { LeadRepository, Lead } from '@/repositories/lead.repository'
import { AnalyticsService } from './analytics.service'

export const LeadsService = {
  async createLead(leadData: Lead) {
    const { data: lead, error } = await LeadRepository.create(leadData)
    if (error) throw new Error(error.message)

    if (lead) {
      await AnalyticsService.trackEvent({
        event_name: 'lead_captured',
        lead_id: lead.id,
        session_id: lead.session_id,
        payload: { source: lead.source },
      })
    }

    return lead
  },

  async getAllLeads(options?: {
    search?: string
    status?: string
    page?: number
    limit?: number
  }) {
    const limit = options?.limit || 20
    const page = options?.page || 1
    const offset = (page - 1) * limit

    const { data, count, error } = await LeadRepository.findAll({
      search: options?.search,
      status: options?.status,
      limit,
      offset,
    })

    if (error) throw new Error(error.message)

    return {
      leads: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    }
  },

  async updateLeadStatus(id: string, status: string) {
    const { error } = await LeadRepository.updateStatus(id, status)
    if (error) throw new Error(error.message)
  },
}
