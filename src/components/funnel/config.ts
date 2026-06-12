import {
  Search,
  Calendar,
  Plane,
  PiggyBank,
  BarChart3,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

export type FunnelStepType =
  | 'text-input'
  | 'choice-cards'
  | 'textarea-submit'
  | 'success'

export interface FunnelStepConfig {
  id: string
  type: FunnelStepType
  name?: any // type it as any for react-hook-form keys to prevent complex generics
  title?: string
  subtitle?: string
  placeholder?: string
  inputType?: 'text' | 'email' | 'tel'
  options?: Array<{
    id: string
    label: string
    description: string
    icon: LucideIcon
  }>
}

export const FUNNEL_STEPS: FunnelStepConfig[] = [
  {
    id: 'step-1',
    type: 'text-input',
    name: 'full_name',
    title: 'Vamos começar!',
    subtitle: 'Como podemos te chamar?',
    placeholder: 'Seu nome aqui',
    inputType: 'text',
  },
  {
    id: 'step-2',
    type: 'text-input',
    name: 'email',
    title: 'Prazer em te conhecer!',
    subtitle: 'Qual seu melhor e-mail para receber o planejamento?',
    placeholder: 'seu@email.com',
    inputType: 'email',
  },
  {
    id: 'step-3',
    type: 'text-input',
    name: 'phone',
    title: 'Quase lá!',
    subtitle: 'Qual seu WhatsApp para enviarmos o acesso?',
    placeholder: '(00) 00000-0000',
    inputType: 'tel',
  },
  {
    id: 'step-4',
    type: 'choice-cards',
    name: 'current_moment',
    title: 'Em qual momento você está?',
    subtitle: 'Selecione a opção que melhor te descreve hoje.',
    options: [
      {
        id: 'pesquisando',
        label: 'Estou pesquisando',
        description: 'Ainda estou descobrindo as possibilidades.',
        icon: Search,
      },
      {
        id: 'organizando',
        label: 'Estou me organizando',
        description: 'Já decidi, agora estou planejando os detalhes.',
        icon: Calendar,
      },
      {
        id: 'em-breve',
        label: 'Quero ir em breve',
        description: 'Estou pronto para embarcar nos próximos meses.',
        icon: Plane,
      },
    ],
  },
  {
    id: 'step-5',
    type: 'choice-cards',
    name: 'financial_planning',
    title: 'Como está sua organização financeira?',
    subtitle: 'Isso nos ajuda a entender qual o melhor caminho para você.',
    options: [
      {
        id: 'comecar',
        label: 'Vou começar a me planejar',
        description: 'Estou no estágio inicial de poupança.',
        icon: PiggyBank,
      },
      {
        id: 'em-andamento',
        label: 'Já estou me organizando',
        description: 'Já tenho uma reserva e estou progredindo.',
        icon: BarChart3,
      },
      {
        id: 'pronto',
        label: 'Estou pronto para embarcar',
        description: 'Tenho o investimento necessário disponível.',
        icon: Rocket,
      },
    ],
  },
  {
    id: 'step-6',
    type: 'textarea-submit',
    name: 'goal',
    title: 'Para finalizar...',
    subtitle: 'Qual seu maior objetivo ou sonho com esse intercâmbio?',
    placeholder:
      'Ex: Quero aprender inglês para alavancar minha carreira e viver uma experiência cultural única.',
  },
  {
    id: 'step-7',
    type: 'success',
  },
]
