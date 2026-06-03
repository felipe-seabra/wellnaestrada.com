import {
  AnalyticsRepository,
  AnalyticsEvent,
} from '@/repositories/analytics.repository'

export const AnalyticsService = {
  async trackEvent(event: AnalyticsEvent) {
    return await AnalyticsRepository.create(event)
  },

  async getDashboardStats() {
    return await AnalyticsRepository.getStats()
  },

  async getDetailedStats() {
    return await AnalyticsRepository.getDetailedStats()
  },

  async getRecentActivity() {
    const { data, error } = await AnalyticsRepository.getRecentEvents()
    if (error) throw new Error(error.message)
    return data
  },
}
