'use client'

import { useEffect, useRef, useState } from 'react'
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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      if (!hasStarted) {
        trackEvent({
          event_name: 'video_start',
          payload: { video_id: videoId },
          funnel_id: funnelId,
          variant_id: variantId,
        })
        setHasStarted(true)
      }
    }

    const handleTimeUpdate = () => {
      const time = video.currentTime
      setCurrentTime(time)

      if (time >= unlockThreshold && !isUnlocked) {
        setIsUnlocked(true)
        trackEvent({
          event_name: 'cta_unlock',
          payload: { video_id: videoId, time_reached: time },
          funnel_id: funnelId,
          variant_id: variantId,
        })
      }

      if (time >= 15 && !hasTracked15s) {
        setHasTracked15s(true)
        trackEvent({
          event_name: 'video_15s',
          payload: { video_id: videoId },
          funnel_id: funnelId,
          variant_id: variantId,
        })
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [videoId, unlockThreshold, isUnlocked, hasStarted, hasTracked15s, funnelId, variantId])

  return {
    videoRef,
    isUnlocked,
    currentTime,
    progress: (currentTime / unlockThreshold) * 100,
  }
}
