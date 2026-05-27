'use client'

import { useCallback, useState } from 'react'
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
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [hasTracked15s, setHasTracked15s] = useState(false)
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false)
  const [hasTrackedCompletion, setHasTrackedCompletion] = useState(false)

  const handleImpression = useCallback(() => {
    if (!hasTrackedImpression) {
      trackEvent({
        event_name: 'video_impression',
        payload: { video_id: videoId },
        funnel_id: funnelId,
        variant_id: variantId,
      })
      setHasTrackedImpression(true)
    }
  }, [hasTrackedImpression, videoId, funnelId, variantId])

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
    [unlockThreshold, isUnlocked, hasTracked15s, videoId, funnelId, variantId],
  )

  const handleEnded = useCallback(() => {
    if (!hasTrackedCompletion) {
      trackEvent({
        event_name: 'video_complete',
        payload: { video_id: videoId },
        funnel_id: funnelId,
        variant_id: variantId,
      })
      setHasTrackedCompletion(true)
    }
  }, [hasTrackedCompletion, videoId, funnelId, variantId])

  return {
    isUnlocked,
    currentTime,
    progress: (currentTime / unlockThreshold) * 100,
    handleImpression,
    handlePlay,
    handleProgress,
    handleEnded,
  }
}
