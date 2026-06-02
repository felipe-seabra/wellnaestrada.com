import { createClient } from '@/lib/supabase/server'

export const SettingsRepository = {
  async getByKey(key: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('platform_settings')
      .select('value')
      .eq('key', key)
      .single()

    if (error) return null
    return data.value
  },

  async getAll() {
    const supabase = await createClient()
    return await supabase.from('platform_settings').select('*')
  },

  async update(key: string, value: any) {
    const supabase = await createClient()
    return await supabase
      .from('platform_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
  },
}
