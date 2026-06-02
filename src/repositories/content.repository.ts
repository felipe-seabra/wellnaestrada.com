import { createClient } from '@/lib/supabase/server'
import { validateResponse } from '@/lib/supabase/error-handler'

export const ContentRepository = {
  async getBySection(section: string) {
    const supabase = await createClient()
    const response = await supabase
      .from('platform_content')
      .select('content')
      .eq('section', section)
      .single()

    validateResponse(response.error)

    if (response.error) return null
    return response.data.content
  },

  async getAll() {
    const supabase = await createClient()
    const response = await supabase.from('platform_content').select('*')
    validateResponse(response.error)
    return response
  },

  async update(section: string, content: any) {
    const supabase = await createClient()
    const response = await supabase
      .from('platform_content')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('section', section)
    validateResponse(response.error)
    return response
  },
}
