'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { createLead } from '@/features/lead-form/actions'
import { trackEvent } from '@/features/analytics/actions'

export function Step6() {
  const { form, prevStep, isSubmitting, setIsSubmitting, nextStep } =
    useFunnel()

  const goal = form.watch('goal')
  const isValid = goal && goal.length >= 5

  const onSubmit = async () => {
    setIsSubmitting(true)
    const data = form.getValues()

    try {
      const result = await createLead({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        funnel_answers: {
          current_moment: data.current_moment,
          financial_planning: data.financial_planning,
          goal: data.goal,
        },
        session_id: localStorage.getItem('funnel_session_id') || undefined,
      })

      if (result.success) {
        trackEvent({
          event_name: 'form_complete',
          lead_id: (result.data as any).id,
        })
        localStorage.removeItem('funnel_draft')
        localStorage.removeItem('funnel_step')
        nextStep()
      } else {
        alert('Ocorreu um erro ao salvar seu planejamento. Tente novamente.')
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <StepWrapper
      title="Para finalizar..."
      subtitle="Qual seu maior objetivo ou sonho com esse intercâmbio?"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="goal">Seu objetivo</Label>
          <Textarea
            id="goal"
            placeholder="Ex: Quero aprender inglês para alavancar minha carreira e viver uma experiência cultural única."
            className="min-h-[150px] text-lg rounded-xl resize-none"
            {...form.register('goal')}
            autoFocus
          />
          {form.formState.errors.goal && (
            <p className="text-sm text-destructive">
              {form.formState.errors.goal.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isSubmitting}
            size="lg"
            className="h-14 rounded-xl px-4"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            size="lg"
            className="flex-1 h-14 rounded-xl text-lg font-bold group bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Gerar meu planejamento
                <CheckCircle2 className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </StepWrapper>
  )
}
