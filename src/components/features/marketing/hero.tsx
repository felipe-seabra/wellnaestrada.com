'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Lock, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { VSLPlayer } from '../vsl/vsl-player'
import { MaxWidthWrapper } from '../../layout/max-width-wrapper'
import { Button } from '../../ui/button'
import { FunnelProvider } from '../funnel/funnel-context'
import { FunnelModal } from '../funnel/funnel-modal'
import { trackEvent } from '@/actions/leads'

export const HeroContent = () => {
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
    <MaxWidthWrapper className="relative pb-24 pt-10 sm:pt-16 lg:pt-24 flex flex-col items-center">
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
        className="mb-6"
      >
        <span className="text-emerald-500 font-serif italic text-2xl sm:text-3xl tracking-wide">
          Well na Estrada
        </span>
      </motion.div>

      <div className="text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1] text-balance"
        >
          O mapa estratégico para o seu{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-emerald-600">
              intercâmbio premium
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500/30 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 25 0 50 5 T 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-zinc-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-balance"
        >
          Assista ao vídeo abaixo para liberar seu planejamento personalizado e
          descobrir como transformar o sonho da Irlanda em realidade.
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
          videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Placeholder YouTube URL
          thumbnailUrl="https://images.unsplash.com/photo-1590059132718-5683086ee099?auto=format&fit=crop&q=80"
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
              <Button
                size="lg"
                className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex gap-3 text-lg font-bold group"
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
              </Button>
              <p className="mt-3 text-sm text-emerald-500 font-medium text-center">
                Acesso liberado! Clique acima para começar.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FunnelModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </MaxWidthWrapper>
  )
}

export const Hero = () => {
  return (
    <FunnelProvider>
      <HeroContent />
    </FunnelProvider>
  )
}
