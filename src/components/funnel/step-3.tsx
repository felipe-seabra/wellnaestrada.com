'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowRight, ChevronLeft } from 'lucide-react'

export function Step3() {
  const { form, nextStep, prevStep } = useFunnel()

  const phone = form.watch('phone')
  const isValid = phone && phone.length >= 10

  return (
    <StepWrapper
      title="Quase lá!"
      subtitle="Qual seu WhatsApp para enviarmos o acesso?"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone">WhatsApp</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            className="h-14 text-lg rounded-xl"
            {...form.register('phone')}
            autoFocus
          />
          {form.formState.errors.phone && (
            <p className="text-sm text-destructive">
              {form.formState.errors.phone.message}
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
