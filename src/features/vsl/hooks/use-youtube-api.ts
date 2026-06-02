'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT: any
  }
}

let isApiLoading = false
let apiLoaded = false
const pendingResolvers: ((value: void | PromiseLike<void>) => void)[] = []

export function useYouTubeApi() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.YT && window.YT.Player) {
      setIsReady(true)
      return
    }

    if (apiLoaded) {
      setIsReady(true)
      return
    }

    const loadApi = new Promise<void>((resolve) => {
      pendingResolvers.push(resolve)

      if (isApiLoading) return

      isApiLoading = true

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        apiLoaded = true
        isApiLoading = false
        pendingResolvers.forEach((res) => res())
        pendingResolvers.length = 0
      }
    })

    loadApi.then(() => setIsReady(true))
  }, [])

  return isReady
}
