/**
 * Analytics Client Side Utility
 */

export const trackClientEvent = (
  event: string,
  properties?: Record<string, any>,
) => {
  if (process.env.NODE_ENV === 'development') {
    console.info(`[Analytics] Event: ${event}`, properties)
  }

  // Here we could also call the Server Action if we want to persist it in DB
  // or just use client-side tools like PostHog, Meta Pixel etc.
}
