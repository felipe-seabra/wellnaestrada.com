'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, Search, Calendar, Plane } from 'lucide-react'
import { cn } from '@/lib/utils'

const options = [
  {
    id: 'pesquisando',
    label: 'Estou pesquisando',
    icon: Search,
    description: 'Ainda estou descobrindo as possibilidades.',
  },
  {
    id: 'organizando',
    label: 'Estou me organizando',
    icon: Calendar,
    description: 'Já decidi, agora estou planejando os detalhes.',
  },
  {
    id: 'em-breve',
    label: 'Quero ir em breve',
    icon: Plane,
    description: 'Estou pronto para embarcar nos próximos meses.',
  },
]

export function Step4() {
  const { form, nextStep, prevStep } = useFunnel()
  const currentMoment = form.watch('current_moment')

  const handleSelect = (id: string) => {
    form.setValue('current_moment', id, { shouldValidate: true })
    setTimeout(nextStep, 300) // Small delay for visual feedback
  }

  return (
    <StepWrapper
      title="Em qual momento você está?"
      subtitle="Selecione a opção que melhor te descreve hoje."
    >
      <div className="space-y-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              'p-6 cursor-pointer border-2 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 group',
              currentMoment === option.id
                ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900',
            )}
            onClick={() => handleSelect(option.id)}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'p-3 rounded-xl transition-colors',
                  currentMoment === option.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-500',
                )}
              >
                <option.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{option.label}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {option.description}
                </p>
              </div>
            </div>
          </Card>
        ))}

        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            className="flex gap-2 text-zinc-500 hover:text-zinc-900"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </div>
    </StepWrapper>
  )
}
