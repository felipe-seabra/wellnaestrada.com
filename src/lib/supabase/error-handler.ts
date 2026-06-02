export class InfrastructureError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InfrastructureError'
  }
}

export function validateResponse(error: any) {
  if (!error) return

  const message = error.message || ''

  if (
    typeof message === 'string' &&
    (message.includes('<!DOCTYPE html>') ||
      message.includes('<html') ||
      message.includes('<body'))
  ) {
    throw new InfrastructureError(
      'Infrastructure Error: Received an HTML response instead of JSON. ' +
        'This typically indicates a misconfigured Supabase URL or a port conflict (e.g., hitting the Next.js dev server instead of the API).',
    )
  }
}
