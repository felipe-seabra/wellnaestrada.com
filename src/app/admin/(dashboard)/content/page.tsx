import { ContentService } from '@/services/content.service'
import {
  HeroContentForm,
  AboutContentForm,
  FooterContentForm,
} from './content-forms'

export default async function AdminContent() {
  const [hero, footer, about, whyIreland] = await Promise.all([
    ContentService.getHeroContent(),
    ContentService.getFooterContent(),
    ContentService.getAboutContent(),
    ContentService.getWhyIrelandContent(),
  ])

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Gestão de Conteúdo</h1>
        <p className="text-zinc-500 mt-1">
          Altere os textos principais da landing page em tempo real.
        </p>
      </div>

      <div className="grid gap-8">
        <HeroContentForm hero={hero} />
        <AboutContentForm about={about} />
        <FooterContentForm footer={footer} />
      </div>
    </div>
  )
}
