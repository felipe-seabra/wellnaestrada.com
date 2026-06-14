'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const SCROLL_THRESHOLD = 300

export function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="sm:hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="px-4 py-3">
              <button
                onClick={scrollToTop}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-colors hover:bg-emerald-500 active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                Iniciar Planejamento
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
