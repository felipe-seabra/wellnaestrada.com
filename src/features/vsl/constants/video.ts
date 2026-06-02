import { VideoConfig } from '../types'

export const VSL_VIDEO_CONFIG: VideoConfig = {
  videoId: 'MBGdI_eRwIA',
  videoUrl: 'https://www.youtube.com/watch?v=MBGdI_eRwIA',
  unlockSeconds: 15,
  tracking: {
    impression: true,
    start: true,
    milestones: [15, 30, 60],
    completion: true,
  },
}
