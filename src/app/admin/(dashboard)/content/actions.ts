'use server'

import { ContentService } from '@/services/content.service'
import { revalidatePath } from 'next/cache'

export async function updateSectionContent(formData: FormData) {
  const section = formData.get('section') as string
  const contentRaw = formData.get('content') as string
  const content = JSON.parse(contentRaw)

  await ContentService.updateSection(section, content)

  revalidatePath('/admin/content')
  revalidatePath('/')
}
