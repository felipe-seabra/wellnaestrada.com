import {
  AnalyticsRepository,
  AnalyticsEvent,
} from '@/repositories/analytics.repository'

export const AnalyticsService = {
  async trackEvent(event: AnalyticsEvent) {
    // Add logic to enrich event (e.g., user agent, IP if needed)
    return await AnalyticsRepository.create(event)
  },

  async getDashboardStats() {
    return await AnalyticsRepository.getStats()
  },

  async getRecentActivity() {
    const { data, error } = await AnalyticsRepository.getRecentEvents()
    if (error) throw new Error(error.message)
    return data
  },
}
