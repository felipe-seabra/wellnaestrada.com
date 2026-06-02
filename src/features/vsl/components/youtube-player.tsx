'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useYouTubeApi } from '../hooks/use-youtube-api'
import { PlayerEvents } from '../types'

interface YouTubePlayerProps extends PlayerEvents {
  videoId: string
  className?: string
  playing?: boolean
  muted?: boolean
  controls?: boolean
}

export function YouTubePlayer({
  videoId,
  className,
  playing = false,
  muted = true,
  controls = false,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onProgress,
  onStateChange,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout>(null)
  const isApiReady = useYouTubeApi()

  useEffect(() => {
    if (!isApiReady || !containerRef.current || playerRef.current) return

    const playerElementId = `yt-player-${videoId}`
    const playerContainer = document.createElement('div')
    playerContainer.id = playerElementId
    containerRef.current.appendChild(playerContainer)

    playerRef.current = new window.YT.Player(playerElementId, {
      videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: playing ? 1 : 0,
        controls: controls ? 1 : 0,
        mute: muted ? 1 : 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          onReady?.()
          if (playing) playerRef.current.playVideo()
        },
        onStateChange: (event: any) => {
          onStateChange?.(event.data)

          // YT.PlayerState.PLAYING = 1
          if (event.data === 1) {
            onPlay?.()
            startProgressTracking()
          } else {
            stopProgressTracking()
          }

          if (event.data === 2) onPause?.()

          // YT.PlayerState.ENDED = 0
          if (event.data === 0) onEnded?.()
        },
      },
    })

    return () => {
      stopProgressTracking()
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [isApiReady, videoId])

  // Handle updates to playing/muted props
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.getPlayerState) return

    if (playing) {
      playerRef.current.playVideo()
    } else {
      playerRef.current.pauseVideo()
    }
  }, [playing])

  useEffect(() => {
    if (!playerRef.current || !playerRef.current.mute) return

    if (muted) {
      playerRef.current.mute()
    } else {
      playerRef.current.unMute()
    }
  }, [muted])

  const startProgressTracking = () => {
    stopProgressTracking()
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        onProgress?.(playerRef.current.getCurrentTime())
      }
    }, 1000)
  }

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('yt-player-container relative w-full h-full', className)}
    >
      <style jsx global>{`
        .yt-player-container iframe {
          width: 100% !important;
          height: 100% !important;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}
