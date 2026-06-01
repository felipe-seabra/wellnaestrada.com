'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section } from '@/components/shared/section'
import { Container } from '@/components/shared/container'
import { Heading } from '@/components/shared/heading'

export const LifestyleSection = () => {
  return (
    <Section className="relative py-24 sm:py-32" dark>
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/well.jpg"
          alt="Well na Estrada - Lifestyle na Irlanda"
          fill
          className="object-cover object-center opacity-60"
          priority
          sizes="100vw"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-transparent to-zinc-900/80" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-3xl"
          >
            <span className="text-emerald-500 font-serif italic text-xl sm:text-2xl tracking-wide">
              Viver, não apenas existir
            </span>
            <Heading level={2} className="text-white">
              A Irlanda que você sempre sonhou,{' '}
              <span className="text-emerald-500">agora ao seu alcance.</span>
            </Heading>
            <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed text-balance">
              Mais do que um intercâmbio, uma transformação completa de vida
              através de estratégia, segurança e o estilo de vida que você
              merece.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-4xl aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay z-10" />
            <Image
              src="/images/well.jpg"
              alt="Lifestyle Preview"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[3000ms]"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="text-left">
                <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold">
                  Dublin, Ireland
                </p>
                <p className="text-white font-serif italic text-lg">
                  The journey begins here.
                </p>
              </div>
              <div className="w-12 h-[1px] bg-white/30 mb-2" />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
