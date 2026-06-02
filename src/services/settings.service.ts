import { SettingsRepository } from '@/repositories/settings.repository'

export const SettingsService = {
  async getBrandSettings() {
    const brandName = await SettingsRepository.getByKey('brand_name')
    const instagramUrl = await SettingsRepository.getByKey('instagram_url')
    const contactEmail = await SettingsRepository.getByKey('contact_email')

    return {
      brandName: brandName || 'Well na Estrada',
      instagramUrl: instagramUrl || '#',
      contactEmail: contactEmail || '',
    }
  },

  async getVideoConfig() {
    const youtubeId = await SettingsRepository.getByKey('youtube_video_id')
    const unlockSeconds = await SettingsRepository.getByKey(
      'video_unlock_seconds',
    )

    return {
      youtubeId: youtubeId || '',
      unlockSeconds: Number(unlockSeconds) || 15,
    }
  },

  async updateSetting(key: string, value: any) {
    const { error } = await SettingsRepository.update(key, value)
    if (error) throw new Error(error.message)
  },

  async getAllSettings() {
    const { data, error } = await SettingsRepository.getAll()
    if (error) throw new Error(error.message)
    return data
  },
}
