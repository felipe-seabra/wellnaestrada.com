import * as z from 'zod'

export const funnelSchema = z.object({
  full_name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  current_moment: z.string().min(1, 'Selecione uma opção'),
  financial_planning: z.string().min(1, 'Selecione uma opção'),
  goal: z.string().min(5, 'Conte um pouco mais sobre seu sonho'),
})

export type FunnelData = z.infer<typeof funnelSchema>
