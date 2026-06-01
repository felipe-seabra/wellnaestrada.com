'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowRight, ChevronLeft } from 'lucide-react'

export function Step2() {
  const { form, nextStep, prevStep } = useFunnel()

  const email = form.watch('email')
  const isValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <StepWrapper
      title="Prazer em te conhecer!"
      subtitle="Qual seu melhor e-mail para receber o planejamento?"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="h-14 text-lg rounded-xl"
            {...form.register('email')}
            autoFocus
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={prevStep}
            size="lg"
            className="h-14 rounded-xl px-4"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={nextStep}
            disabled={!isValid}
            size="lg"
            className="flex-1 h-14 rounded-xl text-lg font-bold group"
          >
            Continuar
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </StepWrapper>
  )
}
