import { createClient } from '@/lib/supabase/server'
import { validateResponse } from '@/lib/supabase/error-handler'

export const SettingsRepository = {
  async getByKey(key: string) {
    const supabase = await createClient()
    const response = await supabase
      .from('platform_settings')
      .select('value')
      .eq('key', key)
      .single()

    validateResponse(response.error)

    if (response.error) return null
    return response.data.value
  },

  async getAll() {
    const supabase = await createClient()
    const response = await supabase.from('platform_settings').select('*')
    validateResponse(response.error)
    return response
  },

  async update(key: string, value: any) {
    const supabase = await createClient()
    const response = await supabase
      .from('platform_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
    validateResponse(response.error)
    return response
  },
}
