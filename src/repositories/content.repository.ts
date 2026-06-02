import { createClient } from '@/lib/supabase/server'

export const ContentRepository = {
  async getBySection(section: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('platform_content')
      .select('content')
      .eq('section', section)
      .single()

    if (error) return null
    return data.content
  },

  async getAll() {
    const supabase = await createClient()
    return await supabase.from('platform_content').select('*')
  },

  async update(section: string, content: any) {
    const supabase = await createClient()
    return await supabase
      .from('platform_content')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('section', section)
  },
}
