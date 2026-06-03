import {
  SettingsRepository,
  SiteSettings,
} from '@/repositories/settings.repository'

export const SettingsService = {
  async getSettings(): Promise<SiteSettings> {
    return await SettingsRepository.get()
  },

  async updateSettings(settings: Partial<SiteSettings>) {
    const { error } = await SettingsRepository.update(settings)
    if (error) throw new Error(error.message)
  },

  /**
   * Helper to get specific brand settings for public UI
   */
  async getBrandConfig() {
    const settings = await this.getSettings()
    return {
      brandName: 'Well na Estrada', // Hardcoded as per vision, or could be added to SiteSettings
      instagramUrl: settings.instagram_url || '#',
      contactEmail: settings.public_email || '',
      copyrightText: settings.copyright_text || '',
    }
  },

  /**
   * Helper to get video config for VSL
   */
  async getVideoConfig() {
    const settings = await this.getSettings()
    return {
      youtubeId: settings.youtube_video_id || '',
      unlockSeconds: Number(settings.cta_unlock_seconds) || 15,
    }
  },
}
