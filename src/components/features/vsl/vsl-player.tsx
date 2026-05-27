'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useInView } from 'framer-motion'
import { useVideoTracking } from '@/hooks/use-video-tracking'
import { cn } from '@/lib/utils'

const ReactPlayer = dynamic<any>(
  () => import('react-player').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-zinc-900 animate-pulse rounded-2xl" />
    ),
  },
)

interface VSLPlayerProps {
  videoUrl: string
  onUnlock?: () => void
  className?: string
}

export function VSLPlayer({ videoUrl, onUnlock, className }: VSLPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const isInView = useInView(containerRef, { amount: 0.5 })

  const {
    isUnlocked,
    handleImpression,
    handlePlay,
    handleProgress,
    handleEnded,
  } = useVideoTracking({
    videoId: 'main-vsl',
    unlockThreshold: 15,
  })

  // Notify parent when unlocked
  useEffect(() => {
    if (isUnlocked && onUnlock) {
      onUnlock()
    }
  }, [isUnlocked, onUnlock])

  // Handle autoplay/pause based on viewport
  useEffect(() => {
    if (isInView) {
      setIsPlaying(true)
      handleImpression()
    } else {
      setIsPlaying(false)
    }
  }, [isInView, handleImpression])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl',
        className,
      )}
    >
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={false} // Audio enabled as requested
        playsinline
        controls={true} // Add controls for better UX since audio is enabled
        onPlay={handlePlay}
        onProgress={(state: { playedSeconds: number }) =>
          handleProgress(state.playedSeconds)
        }
        onEnded={handleEnded}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
            },
          },
        }}
      />
    </div>
  )
}
