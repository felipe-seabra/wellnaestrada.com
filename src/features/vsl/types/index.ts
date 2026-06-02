export interface VideoConfig {
  videoId: string
  videoUrl: string
  unlockSeconds: number
  orientation: 'landscape' | 'portrait'
  aspectRatio: string
  tracking: {
    impression: boolean
    start: boolean
    milestones: number[]
    completion: boolean
  }
}

export interface PlayerEvents {
  onReady?: () => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onProgress?: (seconds: number) => void
  onStateChange?: (state: number) => void
  onUnlock?: () => void
}

export type YouTubePlayerState =
  | 'UNSTARTED'
  | 'ENDED'
  | 'PLAYING'
  | 'PAUSED'
  | 'BUFFERING'
  | 'CUED'

export const YT_STATE: Record<number, YouTubePlayerState> = {
  [-1]: 'UNSTARTED',
  [0]: 'ENDED',
  [1]: 'PLAYING',
  [2]: 'PAUSED',
  [3]: 'BUFFERING',
  [5]: 'CUED',
}
