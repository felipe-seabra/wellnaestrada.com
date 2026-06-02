'use client'

import { useState, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { useVideoTracking } from '../hooks/use-video-tracking'
import { cn } from '@/lib/utils'
import { YouTubePlayer } from './youtube-player'
import { VSL_VIDEO_CONFIG } from '../constants/video'

interface VSLPlayerProps {
  onUnlock?: () => void
  className?: string
}

export function VSLPlayer({ onUnlock, className }: VSLPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const isInView = useInView(containerRef, { amount: 0.5 })

  const {
    isUnlocked,
    handleImpression,
    handlePlay,
    handleProgress,
    handleEnded,
  } = useVideoTracking({
    videoId: VSL_VIDEO_CONFIG.videoId,
    unlockThreshold: VSL_VIDEO_CONFIG.unlockSeconds,
  })

  // Notify parent when unlocked
  useEffect(() => {
    if (isUnlocked && onUnlock) {
      onUnlock()
    }
  }, [isUnlocked, onUnlock])

  // Handle autoplay based on viewport
  useEffect(() => {
    if (isInView) {
      setIsPlaying(true)
      handleImpression()
    } else {
      setIsPlaying(false)
    }
  }, [isInView, handleImpression])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    setHasInteracted(true)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl group',
        className,
      )}
    >
      <YouTubePlayer
        videoId={VSL_VIDEO_CONFIG.videoId}
        className="w-full h-full"
        playing={isPlaying}
        muted={isMuted}
        controls={hasInteracted}
        onPlay={handlePlay}
        onProgress={handleProgress}
        onEnded={handleEnded}
      />

      {/* Unmute Overlay */}
      {isMuted && isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-colors z-10"
        >
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-xl transform transition-transform hover:scale-105 active:scale-95">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            </div>
            <span className="text-zinc-900 font-bold text-sm sm:text-base uppercase tracking-wider">
              Clique para ativar o áudio
            </span>
          </div>
        </button>
      )}
    </div>
  )
}
