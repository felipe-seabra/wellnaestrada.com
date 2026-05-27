/**
 * Analytics Service Foundation
 *
 * This service centralizes all tracking logic (PostHog, Meta Pixel, Google Analytics).
 * For now, it provides a unified interface for logging events to the console
 * until actual providers are configured.
 */

type AnalyticsEvent =
  | 'cta_click'
  | 'lead_submission'
  | 'page_view'
  | 'form_start'

interface TrackEventProps {
  event: AnalyticsEvent
  properties?: Record<string, unknown>
}

export const trackEvent = ({ event, properties }: TrackEventProps) => {
  // In development, log the event
  if (process.env.NODE_ENV === 'development') {
    console.info(`[Analytics] Event: ${event}`, properties)
  }

  // Future implementation:
  // posthog.capture(event, properties);
  // fbq('track', event, properties);
  // gtag('event', event, properties);
}

export const identifyUser = (id: string, traits?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.info(`[Analytics] Identify: ${id}`, traits)
  }

  // Future implementation:
  // posthog.identify(id, traits);
}
