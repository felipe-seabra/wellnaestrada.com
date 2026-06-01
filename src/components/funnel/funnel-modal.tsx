'use client'

import { AnimatePresence } from 'framer-motion'
import { useFunnel } from './funnel-context'
import { Step1 } from './step-1'
import { Step2 } from './step-2'
import { Step3 } from './step-3'
import { Step4 } from './step-4'
import { Step5 } from './step-5'
import { Step6 } from './step-6'
import { Step7 } from './step-7'
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
            {step === 1 && <Step1 key="step1" />}
            {step === 2 && <Step2 key="step2" />}
            {step === 3 && <Step3 key="step3" />}
            {step === 4 && <Step4 key="step4" />}
            {step === 5 && <Step5 key="step5" />}
            {step === 6 && <Step6 key="step6" />}
            {step === 7 && <Step7 key="step7" />}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
