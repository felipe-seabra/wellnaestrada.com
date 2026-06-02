import { ContentRepository } from '@/repositories/content.repository'

export const ContentService = {
  async getHeroContent() {
    const hero = await ContentRepository.getBySection('hero')
    return {
      title: hero?.title || 'O mapa estratégico para o seu intercâmbio premium',
      subtitle:
        hero?.subtitle ||
        'Assista ao vídeo abaixo para descobrir como transformar o sonho da Irlanda em realidade.',
    }
  },

  async getFooterContent() {
    const footer = await ContentRepository.getBySection('footer')
    return {
      description:
        footer?.description ||
        'Consultoria especializada para brasileiros na Irlanda.',
    }
  },

  async getAboutContent() {
    const about = await ContentRepository.getBySection('about')
    return {
      title:
        about?.title ||
        'De brasileiro para brasileiro: Eu estive no seu lugar.',
      p1: about?.p1 || '',
      p2: about?.p2 || '',
      quote: about?.quote || 'Sua jornada é única.',
    }
  },

  async getWhyIrelandContent() {
    const why = await ContentRepository.getBySection('why_ireland')
    return {
      title: why?.title || 'Por que escolher a Irlanda?',
      subtitle: why?.subtitle || '',
      items: why?.items || [],
    }
  },

  async updateSection(section: string, content: any) {
    const { error } = await ContentRepository.update(section, content)
    if (error) throw new Error(error.message)
  },

  async getAllContent() {
    const { data, error } = await ContentRepository.getAll()
    if (error) throw new Error(error.message)
    return data
  },
}
