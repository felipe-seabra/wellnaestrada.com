'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { VSL_VIDEO_CONFIG } from '../constants/video'

interface VideoWrapperProps {
  children: ReactNode
  className?: string
}

export function VideoWrapper({ children, className }: VideoWrapperProps) {
  const isPortrait = VSL_VIDEO_CONFIG.orientation === 'portrait'

  return (
    <div
      className={cn(
        'relative mx-auto w-full overflow-hidden bg-zinc-950 shadow-2xl transition-all duration-500',
        'rounded-2xl border border-white/5 ring-1 ring-white/10',
        isPortrait
          ? 'max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[9/16]'
          : 'max-w-5xl aspect-video',
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
