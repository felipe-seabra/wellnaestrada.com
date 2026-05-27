'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

import { MaxWidthWrapper } from '../../layout/max-width-wrapper'
import { buttonVariants } from '../../ui/button'

export const Hero = () => {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-primary/20 bg-primary/10 px-7 py-2 shadow-md backdrop-blur transition-all hover:border-primary/30 hover:bg-primary/20"
      >
        <p className="text-sm font-semibold text-primary">
          Mentoria Exclusiva • Vagas Limitadas para 2024
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl tracking-tight text-zinc-900"
      >
        O próximo capítulo da sua vida começa na{' '}
        <span className="text-emerald-600">Irlanda</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 max-w-2xl text-zinc-600 sm:text-lg leading-relaxed"
      >
        Muito mais que um intercâmbio. Uma consultoria estratégica e humanizada
        com quem vive a realidade da Ilha Esmeralda todos os dias. Realize seu
        sonho com segurança e suporte premium.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="https://wa.me/353000000000"
          className={buttonVariants({
            size: 'lg',
            className:
              'gap-2 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-emerald-200 transition-all',
          })}
        >
          Iniciar meu planejamento gratuito
          <MessageCircle className="h-5 w-5" />
        </Link>
        <Link
          href="#metodologia"
          className={buttonVariants({
            variant: 'outline',
            size: 'lg',
            className: 'gap-2 px-8 py-6 text-lg rounded-full',
          })}
        >
          Conhecer a metodologia
          <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>

      {/* Hero Image/Video Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 flow-root sm:mt-24 w-full max-w-5xl"
      >
        <div className="-m-2 rounded-2xl bg-zinc-900/5 p-2 ring-1 ring-inset ring-zinc-900/10 lg:-m-4 lg:rounded-3xl lg:p-4">
          <div className="rounded-xl bg-zinc-900 shadow-2xl ring-1 ring-zinc-900/10 aspect-video flex items-center justify-center relative overflow-hidden group">
            {/* Placeholder para vídeo cinematográfico */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590059132718-5683086ee099?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-all cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <p className="mt-4 text-white font-medium tracking-wide uppercase text-sm">
                Assistir vídeo do Well
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </MaxWidthWrapper>
  )
}
