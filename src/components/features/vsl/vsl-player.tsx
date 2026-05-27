'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Volume2, VolumeX } from 'lucide-react'
import { useVideoTracking } from '@/hooks/use-video-tracking'
import { cn } from '@/lib/utils'

// Dynamic import to avoid SSR issues and optimize bundle
// Using any for the component type to avoid complex ReactPlayer type conflicts with next/dynamic
const DynamicReactPlayer = dynamic<any>(() => import('react-player').then((mod) => mod.default), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
})

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
  const { isUnlocked, progress, currentTime, handlePlay, handleProgress } = useVideoTracking({
    videoId: 'main-vsl',
    unlockThreshold: 15,
  })
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isUnlocked && onUnlock) {
      onUnlock()
    }
  }, [isUnlocked, onUnlock])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <div
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl ring-1 ring-white/10 group cursor-pointer',
        className
      )}
      onClick={togglePlay}
    >
      {/* Thumbnail / Poster Layer */}
      <AnimatePresence>
        {(!isPlaying || !isReady) && (
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
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center text-center">
              <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
                Toque para ver o planejamento personalizado
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Wrapper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <DynamicReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          muted={isMuted}
          playsinline
          onReady={() => setIsReady(true)}
          onPlay={() => {
            setIsPlaying(true)
            handlePlay()
          }}
          onPause={() => setIsPlaying(false)}
          onProgress={(state: { playedSeconds: number }) => handleProgress(state.playedSeconds)}
          config={{
            file: {
              attributes: {
                poster: thumbnailUrl,
                style: { objectFit: 'cover', width: '100%', height: '100%' },
              },
            },
            youtube: {
              playerVars: { showinfo: 0, rel: 0, modestbranding: 1 },
            },
          }}
        />
      </div>

      {/* Controls Overlay */}
      {isPlaying && isReady && (
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
                Liberando botão em {Math.max(0, 15 - Math.floor(currentTime))}s
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
