'use server'

import { LeadRepository } from '@/repositories/lead.repository'
import { revalidatePath } from 'next/cache'

export async function updateLeadStatus(formData: FormData) {
  const id = formData.get('leadId') as string
  const status = formData.get('status') as string

  const { error } = await LeadRepository.updateStatus(id, status)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/leads')
}
