'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Lock, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { VSLPlayer } from '@/features/vsl/components/vsl-player'
import { Container } from '@/components/shared/container'
import { Heading } from '@/components/shared/heading'
import { CTAButton } from '@/components/shared/cta-button'
import { Button } from '@/components/ui/button'
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
    // Initialize session_id if not present
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('funnel_session_id')
      if (!sessionId) {
        sessionId = crypto.randomUUID()
        localStorage.setItem('funnel_session_id', sessionId)
      }
    }
  }, [])

  return (
    <Container className="relative pb-24 pt-10 sm:pt-16 lg:pt-24 flex flex-col items-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-[-20%] lg:left-[10%]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl" />
        </div>
      </div>

      {/* Script Branding Moment */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <span className="text-emerald-500 font-brand text-6xl sm:text-7xl lg:text-9xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)] block leading-tight">
          {brandName}
        </span>
      </motion.div>

      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Heading level={1} className="text-3xl sm:text-5xl lg:text-6xl">
            {title}
          </Heading>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-zinc-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-balance"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* VSL Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 w-full max-w-5xl px-4"
      >
        <VSLPlayer
          videoId={videoId}
          unlockSeconds={unlockSeconds}
          onUnlock={() => setIsUnlocked(true)}
        />
      </motion.div>

      {/* CTA Section */}
      <div className="mt-12 flex flex-col items-center gap-4 px-4 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full"
            >
              <Button
                disabled
                size="lg"
                className="w-full h-16 rounded-2xl bg-zinc-800 text-zinc-400 border-zinc-700 cursor-not-allowed flex gap-3 text-lg font-semibold"
              >
                <Lock className="w-5 h-5 opacity-50" />
                Assista para liberar
              </Button>
              <p className="mt-3 text-sm text-zinc-500 text-center animate-pulse">
                O botão de planejamento será liberado em instantes...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="w-full"
            >
              <CTAButton
                glow
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white flex gap-3 group"
                onClick={() => {
                  setIsModalOpen(true)
                  trackEvent({
                    event_name: 'form_open',
                    session_id:
                      localStorage.getItem('funnel_session_id') || undefined,
                  })
                }}
              >
                <Sparkles className="w-6 h-6 animate-pulse" />
                Iniciar meu planejamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CTAButton>
              <p className="mt-3 text-sm text-emerald-500 font-medium text-center">
                Acesso liberado! Clique acima para começar.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </Container>
  )
}

export const Hero = (props: HeroProps) => {
  return (
    <FunnelProvider>
      <HeroContent {...props} />
    </FunnelProvider>
  )
}
