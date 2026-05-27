'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Volume2, VolumeX } from 'lucide-react'
import { useVideoTracking } from '@/hooks/use-video-tracking'
import { cn } from '@/lib/utils'

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
  const { videoRef, isUnlocked, progress } = useVideoTracking({
    videoId: 'main-vsl',
    unlockThreshold: 15,
  })
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (isUnlocked && onUnlock) {
      onUnlock()
    }
  }, [isUnlocked, onUnlock])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
      setHasInteracted(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl ring-1 ring-white/10 group',
        className
      )}
      onClick={togglePlay}
    >
      {/* Thumbnail / Poster */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl"
              >
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </motion.div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center">
              <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
                Toque para ver o planejamento personalizado
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Controls Overlay */}
      {isPlaying && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Top Controls */}
          <div className="absolute top-4 right-4 pointer-events-auto">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-black/60 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Bottom Progress Bar (Unlock) */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
            <motion.div
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          
          {!isUnlocked && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/90 border border-white/10 uppercase tracking-widest font-bold">
                Liberando botão em {Math.max(0, 15 - Math.floor(videoRef.current?.currentTime || 0))}s
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
