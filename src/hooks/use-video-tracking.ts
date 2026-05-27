'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/actions/leads'

interface UseVideoTrackingProps {
  videoId: string
  unlockThreshold?: number
  funnelId?: string
  variantId?: string
}

export function useVideoTracking({
  videoId,
  unlockThreshold = 15,
  funnelId,
  variantId,
}: UseVideoTrackingProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasTracked15s, setHasTracked15s] = useState(false)

  const handlePlay = useCallback(() => {
    if (!hasStarted) {
      trackEvent({
        event_name: 'video_start',
        payload: { video_id: videoId },
        funnel_id: funnelId,
        variant_id: variantId,
      })
      setHasStarted(true)
    }
  }, [hasStarted, videoId, funnelId, variantId])

  const handleProgress = useCallback(
    (seconds: number) => {
      setCurrentTime(seconds)

      if (seconds >= unlockThreshold && !isUnlocked) {
        setIsUnlocked(true)
        trackEvent({
          event_name: 'cta_unlock',
          payload: { video_id: videoId, time_reached: seconds },
          funnel_id: funnelId,
          variant_id: variantId,
        })
      }

      if (seconds >= 15 && !hasTracked15s) {
        setHasTracked15s(true)
        trackEvent({
          event_name: 'video_15s',
          payload: { video_id: videoId },
          funnel_id: funnelId,
          variant_id: variantId,
        })
      }
    },
    [unlockThreshold, isUnlocked, hasTracked15s, videoId, funnelId, variantId]
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => handlePlay()
    const onTimeUpdate = () => handleProgress(video.currentTime)

    video.addEventListener('play', onPlay)
    video.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [handlePlay, handleProgress])

  return {
    videoRef,
    isUnlocked,
    currentTime,
    progress: (currentTime / unlockThreshold) * 100,
    handlePlay,
    handleProgress,
  }
}
