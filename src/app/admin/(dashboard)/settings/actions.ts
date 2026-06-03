'use server'

import { SettingsService } from '@/services/settings.service'
import { revalidatePath } from 'next/cache'

export async function updateSiteSettings(formData: FormData) {
  const settings = {
    instagram_url: formData.get('instagram_url') as string,
    youtube_video_id: formData.get('youtube_video_id') as string,
    public_email: formData.get('public_email') as string,
    support_email: formData.get('support_email') as string,
    cta_unlock_seconds: Number(formData.get('cta_unlock_seconds')),
    meta_title: formData.get('meta_title') as string,
    meta_description: formData.get('meta_description') as string,
    copyright_text: formData.get('copyright_text') as string,
    legal_text: formData.get('legal_text') as string,
  }

  await SettingsService.updateSettings(settings)

  revalidatePath('/admin/settings')
  revalidatePath('/')
}
