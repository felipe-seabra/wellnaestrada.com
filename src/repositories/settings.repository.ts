import { createClient, createAdminClient } from '@/lib/supabase/server'
import { validateResponse } from '@/lib/supabase/error-handler'

export interface SiteSettings {
  id?: string
  instagram_url?: string
  youtube_video_id?: string
  tiktok_url?: string
  linkedin_url?: string
  public_email?: string
  support_email?: string
  cta_unlock_seconds?: number
  meta_title?: string
  meta_description?: string
  og_image_url?: string
  copyright_text?: string
  legal_text?: string
  created_at?: string
  updated_at?: string
}

export const SettingsRepository = {
  async get() {
    const supabase = await createClient()
    const response = await supabase.from('site_settings').select('*').single()

    validateResponse(response.error)
    return response.data as SiteSettings
  },

  async update(settings: Partial<SiteSettings>) {
    const supabase = await createAdminClient()
    // We update the first row as there's only one
    const { data: current } = await supabase
      .from('site_settings')
      .select('id')
      .single()

    const response = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', current?.id)
      .select()
      .single()

    validateResponse(response.error)
    return response
  },
}
