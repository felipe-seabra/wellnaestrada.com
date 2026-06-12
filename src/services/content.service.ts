import { ContentRepository } from '@/repositories/content.repository'
import { DEFAULT_CONTENT } from '@/config/default-content'

const isDynamicError = (err: unknown) =>
  err instanceof Error &&
  (err.message.includes('DYNAMIC_SERVER_USAGE') ||
    err.message.includes('Dynamic server usage'))

export const ContentService = {
  /**
   * Safe fetch for all content sections with in-memory mapping and fallbacks
   */
  async getAllContentSafe() {
    let map: Record<string, any> = {}
    try {
      const { data } = await ContentRepository.getAll()
      if (data) {
        map = data.reduce((acc: any, curr: any) => {
          acc[curr.section] = curr.content
          return acc
        }, {})
      }
    } catch (error) {
      if (isDynamicError(error)) throw error
      console.error(
        '[ContentService] Failed to fetch all content, using fallbacks:',
        error,
      )
    }

    return {
      hero: { ...DEFAULT_CONTENT.hero, ...map.hero },
      footer: { ...DEFAULT_CONTENT.footer, ...map.footer },
      about: { ...DEFAULT_CONTENT.about, ...map.about },
      whyIreland: { ...DEFAULT_CONTENT.why_ireland, ...map.why_ireland },
    }
  },

  /**
   * Admin-only: Updates a content section
   */
  async updateSection(section: string, content: any) {
    const { error } = await ContentRepository.update(section, content)
    if (error) throw new Error(error.message)
  },

  /**
   * Admin-only: Fetches all content records
   */
  async getAllContent() {
    const { data, error } = await ContentRepository.getAll()
    if (error) throw new Error(error.message)
    return data
  },
}
