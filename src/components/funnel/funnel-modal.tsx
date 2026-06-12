'use client'

import { AnimatePresence } from 'framer-motion'
import { useFunnel } from './funnel-context'
import { FunnelRenderer } from './funnel-renderer'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface FunnelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FunnelModal({ open, onOpenChange }: FunnelModalProps) {
  const { step } = useFunnel()

  const progress = (step / 7) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-none shadow-2xl">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-100 dark:bg-zinc-900 z-50">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 pt-10">
          <AnimatePresence mode="wait">
            <FunnelRenderer />
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
