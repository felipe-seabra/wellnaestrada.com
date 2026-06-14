'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { VSLPlayer } from '@/features/vsl/components/vsl-player'
import { Container } from '@/components/shared/container'
import { Heading } from '@/components/shared/heading'
import { CTAButton } from '@/components/shared/cta-button'
import { FunnelProvider } from '../funnel/funnel-context'
import { FunnelModal } from '../funnel/funnel-modal'
import { trackEvent } from '@/features/analytics/actions'

interface HeroProps {
  brandName: string
  title: string
  subtitle: string
  videoId: string
  unlockSeconds: number
}

export const HeroContent = ({
  brandName,
  title,
  subtitle,
  videoId,
  unlockSeconds,
}: HeroProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('funnel_session_id')
      if (!sessionId) {
        sessionId = crypto.randomUUID()
        localStorage.setItem('funnel_session_id', sessionId)
      }
    }
  }, [])

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/well.jpg"
          alt="Well na Estrada na Irlanda"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Dark overlay: zinc-950 (not pure black). 75-95% opacity keeps photo visible but ensures text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/75 via-zinc-950/85 to-zinc-950" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10 lg:space-y-12">
          {/* Header Text */}
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-emerald-400 font-brand text-3xl sm:text-4xl lg:text-5xl drop-shadow-md"
            >
              {brandName}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* White text, large authoritative size */}
              <Heading
                level={1}
                className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight"
              >
                {title}
              </Heading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-balance"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* VSL Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl mx-auto relative group"
          >
            {/* Glassmorphism subtle frame behind player */}
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-zinc-800/20 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-1000" />
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-zinc-950">
              <VSLPlayer
                videoId={videoId}
                unlockSeconds={unlockSeconds}
                onUnlock={() => setIsUnlocked(true)}
              />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm mx-auto pt-2"
          >
            {/* CTA solid in BOTH states. Dormant (zinc) vs Vibrant (emerald) */}
            <CTAButton
              glow={isUnlocked}
              className={cn(
                'w-full flex gap-3 justify-center items-center group transition-all duration-700 border border-transparent',
                isUnlocked
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)]'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700/50',
              )}
              onClick={() => {
                setIsModalOpen(true)
                trackEvent({
                  event_name: 'form_open',
                  session_id:
                    localStorage.getItem('funnel_session_id') || undefined,
                })
              }}
            >
              <Sparkles
                className={cn(
                  'h-5 transition-all duration-700',
                  isUnlocked
                    ? 'w-5 opacity-100 animate-pulse text-emerald-100'
                    : 'w-0 opacity-0 -ml-2',
                )}
              />
              <span className="truncate">Iniciar meu planejamento</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </CTAButton>
            <p
              className={cn(
                'mt-4 text-sm font-medium transition-colors duration-700',
                isUnlocked ? 'text-emerald-400' : 'text-zinc-400',
              )}
            >
              {isUnlocked
                ? '✓ Diagnóstico personalizado liberado'
                : 'Assista ao vídeo para uma experiência completa'}
            </p>
          </motion.div>
        </div>
      </Container>

      <FunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}

export const Hero = (props: HeroProps) => {
  return (
    <FunnelProvider>
      <HeroContent {...props} />
    </FunnelProvider>
  )
}
