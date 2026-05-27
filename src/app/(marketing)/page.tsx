import { Check, Star, Users, ShieldCheck, Plane } from 'lucide-react'
import Image from 'next/image'

import { Hero } from '@/components/features/marketing/hero'
import { LifestyleSection } from '@/components/features/marketing/lifestyle-section'
import { MaxWidthWrapper } from '@/components/layout/max-width-wrapper'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Social Proof / Stats */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Vidas Transformadas', value: '500+', icon: Users },
              { label: 'Satisfação', value: '99%', icon: Star },
              { label: 'Suporte 24/7', value: 'Premium', icon: ShieldCheck },
              { label: 'Destinos na Irlanda', value: 'Top 5', icon: Plane },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Storytelling / O Well */}
      <section id="sobre" className="py-24 bg-zinc-50 overflow-hidden">
        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="aspect-[4/5] rounded-2xl bg-zinc-200 overflow-hidden shadow-2xl rotate-2 relative">
                <Image
                  src="/images/well.jpg"
                  alt="Well na Estrada na Irlanda"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-600 rounded-2xl -rotate-3 -z-10 flex items-end p-4">
                <p className="text-white font-serif text-2xl italic leading-tight">
                  &quot;Sua jornada é única.&quot;
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-8 text-left">
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900">
                De brasileiro para brasileiro: Eu estive no seu lugar.
              </h2>
              <div className="space-y-4 text-zinc-600 text-lg leading-relaxed">
                <p>
                  Quando decidi mudar para a Irlanda, ouvi de tudo. Agências que
                  só queriam vender cursos e promessas que não batiam com a
                  realidade de quem vive aqui.
                </p>
                <p>
                  A <strong>Well na Estrada</strong> nasceu para ser o guia que
                  eu gostaria de ter tido. Sem letras miúdas, com suporte real e
                  uma estratégia personalizada para o <em>seu</em> objetivo.
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
        </MaxWidthWrapper>
      </section>

      {/* Lifestyle Cinematic Section */}
      <LifestyleSection />

      {/* Why Ireland Section */}
      <section className="py-24 bg-zinc-900 text-white">
        <MaxWidthWrapper className="text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Por que escolher a Irlanda?
            </h2>
            <p className="text-zinc-400 text-lg">
              A Ilha Esmeralda oferece oportunidades únicas que você não
              encontra em nenhum outro lugar da Europa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Salário em Euro',
                desc: 'Um dos maiores salários mínimos da Europa, permitindo viver bem e guardar dinheiro.',
              },
              {
                title: 'Visto de Trabalho',
                desc: 'Estudantes podem trabalhar legalmente, facilitando a imigração e o sustento.',
              },
              {
                title: 'Porta para a Europa',
                desc: 'Viaje para Paris, Londres ou Roma com passagens que custam menos que um jantar.',
              },
            ].map((card, i) => (
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
        </MaxWidthWrapper>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600 -z-10"></div>
        <MaxWidthWrapper className="text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Pronto para transformar sua realidade?
          </h2>
          <p className="text-emerald-50 text-xl max-w-2xl mx-auto">
            As vagas para a mentoria de 2024 estão abertas. Clique abaixo e
            inicie sua jornada com segurança total.
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/353000000000"
              className="bg-white text-emerald-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-zinc-100 transition-all active:scale-95"
            >
              Falar com o Well no WhatsApp
            </a>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
