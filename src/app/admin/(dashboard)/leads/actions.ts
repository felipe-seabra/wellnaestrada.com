'use server'

import { LeadsService } from '@/services/leads.service'
import { revalidatePath } from 'next/cache'

export async function updateLeadStatus(formData: FormData) {
  const id = formData.get('leadId') as string
  const status = formData.get('status') as string

  await LeadsService.updateLeadStatus(id, status)

  revalidatePath('/admin/leads')
}
