'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  PartyPopper,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createLead } from '@/features/lead-form/actions'
import { trackEvent } from '@/features/analytics/actions'
import { FunnelStepConfig } from './config'
import { motion } from 'framer-motion'

export function DynamicFunnelStep({ step }: { step: FunnelStepConfig }) {
  const { form, nextStep, prevStep, isSubmitting, setIsSubmitting } =
    useFunnel()

  // For success step, render immediately to avoid form hooks logic
  if (step.type === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-zinc-900 dark:text-white mb-4"
        >
          Planejamento enviado com sucesso!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-md"
        >
          Obrigado por sua confiança. Em breve, nossa equipe entrará em contato
          pelo seu WhatsApp para dar os próximos passos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="w-full h-14 rounded-xl text-lg font-bold flex gap-2"
          >
            <PartyPopper className="w-5 h-5" />
            Voltar para o início
          </Button>
        </motion.div>
      </div>
    )
  }

  // Value watching and validation for dynamic fields
  const value = form.watch(step.name)
  let isValid = false

  if (step.name === 'full_name') isValid = value && value.length >= 3
  if (step.name === 'email')
    isValid = value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  if (step.name === 'phone') isValid = value && value.length >= 10
  if (step.name === 'current_moment') isValid = !!value
  if (step.name === 'financial_planning') isValid = !!value
  if (step.name === 'goal') isValid = value && value.length >= 5

  const errorMessage =
    form.formState.errors[step.name as keyof typeof form.formState.errors]
      ?.message

  const handleCardSelect = (id: string) => {
    form.setValue(step.name, id, { shouldValidate: true })
    setTimeout(nextStep, 300)
  }

  const handleSubmitForm = async () => {
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
    <StepWrapper title={step.title || ''} subtitle={step.subtitle || ''}>
      <div className="space-y-6">
        {step.type === 'text-input' && (
          <div className="space-y-2">
            <Label htmlFor={step.name}>
              {step.name === 'full_name'
                ? 'Nome completo'
                : step.name === 'email'
                  ? 'E-mail'
                  : 'WhatsApp'}
            </Label>
            <Input
              id={step.name}
              type={step.inputType || 'text'}
              placeholder={step.placeholder}
              className="h-14 text-lg rounded-xl"
              {...form.register(step.name)}
              autoFocus
            />
            {errorMessage && (
              <p className="text-sm text-destructive">
                {errorMessage as string}
              </p>
            )}
          </div>
        )}

        {step.type === 'choice-cards' && (
          <div className="space-y-4">
            {step.options?.map((option) => (
              <Card
                key={option.id}
                className={cn(
                  'p-6 cursor-pointer border-2 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 group',
                  value === option.id
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900',
                )}
                onClick={() => handleCardSelect(option.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'p-3 rounded-xl transition-colors',
                      value === option.id
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
          </div>
        )}

        {step.type === 'textarea-submit' && (
          <div className="space-y-2">
            <Label htmlFor={step.name}>Seu objetivo</Label>
            <Textarea
              id={step.name}
              placeholder={step.placeholder}
              className="min-h-[150px] text-lg rounded-xl resize-none"
              {...form.register(step.name)}
              autoFocus
            />
            {errorMessage && (
              <p className="text-sm text-destructive">
                {errorMessage as string}
              </p>
            )}
          </div>
        )}

        {/* Universal Navigation */}
        <div
          className={cn(
            'flex gap-3',
            step.type === 'text-input' && step.name === 'full_name'
              ? 'pt-0'
              : step.type === 'choice-cards'
                ? 'pt-4'
                : '',
          )}
        >
          {step.name !== 'full_name' && (
            <Button
              variant={step.type === 'choice-cards' ? 'ghost' : 'outline'}
              onClick={prevStep}
              disabled={isSubmitting}
              size={step.type === 'choice-cards' ? 'default' : 'lg'}
              className={cn(
                step.type === 'choice-cards'
                  ? 'flex gap-2 text-zinc-500 hover:text-zinc-900'
                  : 'h-14 rounded-xl px-4',
              )}
            >
              <ChevronLeft
                className={step.type === 'choice-cards' ? 'w-4 h-4' : 'w-5 h-5'}
              />
              {step.type === 'choice-cards' ? 'Voltar' : ''}
            </Button>
          )}

          {step.type !== 'choice-cards' && step.type !== 'textarea-submit' && (
            <Button
              onClick={nextStep}
              disabled={!isValid}
              size="lg"
              className={cn(
                'h-14 rounded-xl text-lg font-bold group',
                step.name !== 'full_name' ? 'flex-1' : 'w-full',
              )}
            >
              Continuar
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}

          {step.type === 'textarea-submit' && (
            <Button
              onClick={handleSubmitForm}
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
          )}
        </div>
      </div>
    </StepWrapper>
  )
}
