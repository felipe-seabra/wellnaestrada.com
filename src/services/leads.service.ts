import { LeadRepository, Lead } from '@/repositories/lead.repository'
import { AnalyticsService } from './analytics.service'

export const LeadsService = {
  async createLead(leadData: Lead) {
    // 1. Logic before saving (e.g., duplicate check, normalization)
    const { data: lead, error } = await LeadRepository.create(leadData)

    if (error) throw new Error(error.message)

    // 2. Automated tracking
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

  async getAllLeads() {
    const { data, error } = await LeadRepository.findAll()
    if (error) throw new Error(error.message)
    return data
  },

  async updateLeadStatus(id: string, status: string) {
    const { error } = await LeadRepository.updateStatus(id, status)
    if (error) throw new Error(error.message)
  },
}
