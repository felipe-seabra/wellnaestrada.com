'use client'

import { useFunnel } from './funnel-context'
import { FUNNEL_STEPS } from './config'
import { DynamicFunnelStep } from './dynamic-step'

export function FunnelRenderer() {
  const { step } = useFunnel()

  // steps are 1-indexed (1 to 7)
  const activeIndex = step - 1
  const activeConfig = FUNNEL_STEPS[activeIndex]

  if (!activeConfig) return null

  return <DynamicFunnelStep key={activeConfig.id} step={activeConfig} />
}
