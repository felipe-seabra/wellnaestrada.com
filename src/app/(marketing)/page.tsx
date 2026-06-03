import { Check, Star, Users, ShieldCheck, Plane } from 'lucide-react'
import Image from 'next/image'

import { Hero } from '@/components/marketing/hero'
import { LifestyleSection } from '@/components/marketing/lifestyle-section'
import { Section } from '@/components/shared/section'
import { Container } from '@/components/shared/container'
import { Heading } from '@/components/shared/heading'
import { StatCard } from '@/components/shared/stat-card'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { SettingsService } from '@/services/settings.service'
import { ContentService } from '@/services/content.service'

export default async function Home() {
  const [
    brandSettings,
    videoConfig,
    heroContent,
    footerContent,
    aboutContent,
    whyIrelandContent,
  ] = await Promise.all([
    SettingsService.getBrandConfig(),
    SettingsService.getVideoConfig(),
    ContentService.getHeroContent(),
    ContentService.getFooterContent(),
    ContentService.getAboutContent(),
    ContentService.getWhyIrelandContent(),
  ])

  const stats = [
    { label: 'Vidas Transformadas', value: '500+', icon: Users },
    { label: 'Satisfação', value: '99%', icon: Star },
    { label: 'Suporte 24/7', value: 'Premium', icon: ShieldCheck },
    { label: 'Destinos na Irlanda', value: 'Top 5', icon: Plane },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar brandName={brandSettings.brandName} />

      {/* Hero Section */}
      <Hero
        brandName={brandSettings.brandName}
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        videoId={videoConfig.youtubeId}
        unlockSeconds={videoConfig.unlockSeconds}
      />

      {/* Social Proof / Stats */}
      <Section>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Storytelling / O Well */}
      <Section id="sobre" className="bg-zinc-50">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="aspect-[4/5] rounded-2xl bg-zinc-200 overflow-hidden shadow-2xl rotate-2 relative">
                <Image
                  src="/images/well.jpg"
                  alt={`${brandSettings.brandName} na Irlanda`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-600 rounded-2xl -rotate-3 -z-10 flex items-end p-4">
                <p className="text-white font-serif text-2xl italic leading-tight">
                  &quot;{aboutContent.quote}&quot;
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-8 text-left">
              <Heading>{aboutContent.title}</Heading>
              <div className="space-y-4 text-zinc-600 text-lg leading-relaxed">
                <p>{aboutContent.p1}</p>
                <p>
                  {aboutContent.p2.replace(
                    'brand_name',
                    brandSettings.brandName,
                  )}
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  'Foco total em segurança e transparência',
                  'Apoio na chegada e busca de acomodação',
                  'Comunidade exclusiva de mentorados',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-zinc-700 font-medium"
                  >
                    <Check className="w-5 h-5 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lifestyle Cinematic Section */}
      <LifestyleSection brandName={brandSettings.brandName} />

      {/* Why Ireland Section */}
      <Section dark>
        <Container className="text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <Heading level={2} className="text-white">
              {whyIrelandContent.title}
            </Heading>
            <p className="text-zinc-400 text-lg">
              {whyIrelandContent.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyIrelandContent.items.map((card: any, i: number) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-800 hover:border-emerald-500/50 transition-colors text-left space-y-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-600/20 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Footer
        brandName={brandSettings.brandName}
        description={footerContent.description}
        instagramUrl={brandSettings.instagramUrl}
        contactEmail={brandSettings.contactEmail}
        copyrightText={brandSettings.copyrightText}
      />
    </div>
  )
}
