import {
  SettingsRepository,
  SiteSettings,
} from '@/repositories/settings.repository'
import { DEFAULT_SETTINGS } from '@/config/default-settings'

const isDynamicError = (err: unknown) =>
  err instanceof Error &&
  (err.message.includes('DYNAMIC_SERVER_USAGE') ||
    err.message.includes('Dynamic server usage'))

export const SettingsService = {
  /**
   * Fetches settings from DB with graceful fallback
   */
  async getSettings(): Promise<SiteSettings> {
    try {
      const settings = await SettingsRepository.get()
      if (!settings) return DEFAULT_SETTINGS as unknown as SiteSettings
      return settings
    } catch (error) {
      if (isDynamicError(error)) throw error
      console.error(
        '[SettingsService] Failed to fetch settings from DB, using fallback:',
        error,
      )
      return DEFAULT_SETTINGS as unknown as SiteSettings
    }
  },

  /**
   * Admin-only: Updates settings in DB
   */
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
      brandName: DEFAULT_SETTINGS.brandName,
      instagramUrl: settings.instagram_url || DEFAULT_SETTINGS.instagram_url,
      contactEmail: settings.public_email || DEFAULT_SETTINGS.public_email,
      copyrightText: settings.copyright_text || DEFAULT_SETTINGS.copyright_text,
    }
  },

  /**
   * Helper to get video config for VSL
   */
  async getVideoConfig() {
    const settings = await this.getSettings()
    return {
      youtubeId: settings.youtube_video_id || DEFAULT_SETTINGS.youtube_video_id,
      unlockSeconds:
        Number(settings.cta_unlock_seconds) ||
        DEFAULT_SETTINGS.cta_unlock_seconds,
    }
  },
}
