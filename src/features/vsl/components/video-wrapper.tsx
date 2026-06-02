'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface VideoWrapperProps {
  children: ReactNode
  className?: string
}

export function VideoWrapper({ children, className }: VideoWrapperProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-5xl overflow-hidden bg-zinc-950 shadow-2xl transition-all duration-500',
        'rounded-2xl border border-white/5 ring-1 ring-white/10 aspect-video',
        className,
      )}
    >
      {/* Premium Glossy Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50" />

      {/* Content */}
      <div className="absolute inset-0 z-0">{children}</div>
    </div>
  )
}
