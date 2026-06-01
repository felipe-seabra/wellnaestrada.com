'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, PiggyBank, BarChart3, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

const options = [
  {
    id: 'comecar',
    label: 'Vou começar a me planejar',
    icon: PiggyBank,
    description: 'Estou no estágio inicial de poupança.',
  },
  {
    id: 'em-andamento',
    label: 'Já estou me organizando',
    icon: BarChart3,
    description: 'Já tenho uma reserva e estou progredindo.',
  },
  {
    id: 'pronto',
    label: 'Estou pronto para embarcar',
    icon: Rocket,
    description: 'Tenho o investimento necessário disponível.',
  },
]

export function Step5() {
  const { form, nextStep, prevStep } = useFunnel()
  const financialPlanning = form.watch('financial_planning')

  const handleSelect = (id: string) => {
    form.setValue('financial_planning', id, { shouldValidate: true })
    setTimeout(nextStep, 300)
  }

  return (
    <StepWrapper
      title="Como está sua organização financeira?"
      subtitle="Isso nos ajuda a entender qual o melhor caminho para você."
    >
      <div className="space-y-4">
        {options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              'p-6 cursor-pointer border-2 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 group',
              financialPlanning === option.id
                ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900',
            )}
            onClick={() => handleSelect(option.id)}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'p-3 rounded-xl transition-colors',
                  financialPlanning === option.id
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
