import { ContentRepository } from '@/repositories/content.repository'
import { DEFAULT_CONTENT } from '@/config/default-content'

const isDynamicError = (err: unknown) =>
  err instanceof Error &&
  (err.message.includes('DYNAMIC_SERVER_USAGE') ||
    err.message.includes('Dynamic server usage'))

export const ContentService = {
  /**
   * Safe fetch for content sections with fallback
   */
  async getSafeContent(section: string, fallback: any) {
    try {
      const content = await ContentRepository.getBySection(section)
      return content || fallback
    } catch (error) {
      if (isDynamicError(error)) throw error
      console.error(
        `[ContentService] Failed to fetch section "${section}", using fallback:`,
        error,
      )
      return fallback
    }
  },

  async getHeroContent() {
    const hero = await this.getSafeContent('hero', DEFAULT_CONTENT.hero)
    return {
      title: hero.title,
      subtitle: hero.subtitle,
    }
  },

  async getFooterContent() {
    const footer = await this.getSafeContent('footer', DEFAULT_CONTENT.footer)
    return {
      description: footer.description,
    }
  },

  async getAboutContent() {
    const about = await this.getSafeContent('about', DEFAULT_CONTENT.about)
    return {
      title: about.title,
      p1: about.p1,
      p2: about.p2,
      quote: about.quote,
    }
  },

  async getWhyIrelandContent() {
    const why = await this.getSafeContent(
      'why_ireland',
      DEFAULT_CONTENT.why_ireland,
    )
    return {
      title: why.title,
      subtitle: why.subtitle,
      items: why.items,
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
