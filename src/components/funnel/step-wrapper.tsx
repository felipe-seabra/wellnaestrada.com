'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StepWrapperProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function StepWrapper({ children, title, subtitle }: StepWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col"
    >
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </motion.div>
  )
}
