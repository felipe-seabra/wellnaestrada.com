'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { useVideoTracking } from '@/hooks/use-video-tracking'
import { cn } from '@/lib/utils'

// Dynamic import to avoid SSR issues and optimize bundle
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
  thumbnailUrl: string
  onUnlock?: () => void
  className?: string
}

export function VSLPlayer({
  videoUrl,
  thumbnailUrl,
  onUnlock,
  className,
}: VSLPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use a stable in-view state with threshold
  const isCurrentlyInView = useInView(containerRef, {
    amount: 0.6, // Slightly more than 50% for stability
    once: false,
  })

  const [stableInView, setStableInView] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)

  const {
    isUnlocked,
    progress,
    currentTime,
    handleImpression,
    handlePlay,
    handleProgress,
    handleEnded,
  } = useVideoTracking({
    videoId: 'main-vsl',
    unlockThreshold: 15,
  })

  // Debounce visibility to prevent rapid play/pause
  useEffect(() => {
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current)
    }

    visibilityTimeoutRef.current = setTimeout(() => {
      setStableInView(isCurrentlyInView)
    }, 400) // 400ms delay to ensure the user actually stopped here

    return () => {
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current)
      }
    }
  }, [isCurrentlyInView])

  // Track impression when component enters viewport stably
  useEffect(() => {
    if (stableInView) {
      handleImpression()
    }
  }, [stableInView, handleImpression])

  // Stable Autoplay logic
  useEffect(() => {
    // Only auto-control playback if user hasn't manually interacted yet
    if (!hasInteracted) {
      if (stableInView && !isPlaying) {
        setIsPlaying(true)
      } else if (!stableInView && isPlaying) {
        setIsPlaying(false)
      }
    }
  }, [stableInView, isPlaying, hasInteracted])

  useEffect(() => {
    if (isUnlocked && onUnlock) {
      onUnlock()
    }
  }, [isUnlocked, onUnlock])

  const handleTogglePlay = useCallback(() => {
    setHasInteracted(true)
    setIsPlaying((prev) => !prev)
    if (isMuted) setIsMuted(false)
  }, [isMuted])

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setHasInteracted(true)
    setIsMuted((prev) => !prev)
  }, [])

  // Cinematic overlay variants
  const overlayVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  } as const

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl ring-1 ring-white/10 group cursor-pointer group/player',
        className,
      )}
      onClick={handleTogglePlay}
    >
      {/* Cinematic Preview / Poster Layer */}
      <AnimatePresence mode="wait">
        {(!isPlaying || !isReady) && (
          <motion.div
            key="poster"
            variants={overlayVariants}
            initial="initial"
            exit="exit"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Image */}
            <motion.img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[2000ms]"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />
            <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px]" />

            {/* Play Button Interface */}
            <div className="relative z-30 flex flex-col items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:border-white/40 transition-colors"
              >
                {isBuffering ? (
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                ) : (
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                )}
              </motion.div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                  Aperte para ouvir
                </span>
                <h3 className="text-white text-xl md:text-2xl font-light tracking-tight text-center px-6">
                  Descubra o caminho{' '}
                  <span className="text-emerald-400 font-medium italic">
                    Premium
                  </span>{' '}
                  para o seu intercâmbio
                </h3>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Wrapper */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-1000',
          isReady ? 'opacity-100' : 'opacity-0',
        )}
      >
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          muted={isMuted}
          playsinline
          onReady={() => {
            setIsReady(true)
            setIsBuffering(false)
          }}
          onBuffer={() => setIsBuffering(true)}
          onBufferEnd={() => setIsBuffering(false)}
          onPlay={() => {
            setIsPlaying(true)
            handlePlay()
          }}
          onPause={() => {
            // Only update state if it wasn't a system-triggered pause from viewport
            if (hasInteracted) setIsPlaying(false)
          }}
          onProgress={(state: { playedSeconds: number }) =>
            handleProgress(state.playedSeconds)
          }
          onEnded={handleEnded}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                rel: 0,
                modestbranding: 1,
                controls: 0,
                iv_load_policy: 3,
                disablekb: 1,
                origin:
                  typeof window !== 'undefined' ? window.location.origin : '',
              },
            },
          }}
        />
      </div>

      {/* Controls Overlay */}
      <AnimatePresence>
        {isPlaying && isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 pointer-events-none" />

            {/* Top Controls */}
            <div className="absolute top-6 right-6 pointer-events-auto">
              <button
                onClick={toggleMute}
                className="group/btn relative p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10">
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </div>
                {isMuted && (
                  <motion.div
                    layoutId="mute-pulse"
                    className="absolute inset-0 bg-white/10"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </button>
            </div>

            {/* Bottom Progress Layer */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col pointer-events-auto">
              {/* Progress Bar (Unlock) */}
              <div className="h-1 bg-white/10 w-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'linear', duration: 0.5 }}
                  style={{ boxShadow: '0 0 15px rgba(16,185,129,0.8)' }}
                />
              </div>

              <div className="bg-gradient-to-t from-zinc-950/80 to-transparent py-8 px-8 flex justify-between items-center">
                {!isUnlocked ? (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/70 uppercase tracking-[0.2em] font-bold">
                      Liberando recompensa em{' '}
                      {Math.max(0, 15 - Math.floor(currentTime))}s
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold">
                      Acesso Liberado
                    </span>
                  </motion.div>
                )}

                <div className="flex items-center gap-4 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    Well na Estrada VSL
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
