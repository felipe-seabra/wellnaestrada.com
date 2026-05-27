'use client'

import { useFunnel } from './funnel-context'
import { StepWrapper } from './step-wrapper'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { ArrowRight } from 'lucide-react'

export function Step1() {
  const { form, nextStep } = useFunnel()
  
  const name = form.watch('full_name')
  const isValid = name && name.length >= 3

  return (
    <StepWrapper 
      title="Vamos começar!" 
      subtitle="Como podemos te chamar?"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full_name">Nome completo</Label>
          <Input
            id="full_name"
            placeholder="Seu nome aqui"
            className="h-14 text-lg rounded-xl"
            {...form.register('full_name')}
            autoFocus
          />
          {form.formState.errors.full_name && (
            <p className="text-sm text-destructive">{form.formState.errors.full_name.message}</p>
          )}
        </div>

        <Button
          onClick={nextStep}
          disabled={!isValid}
          size="lg"
          className="w-full h-14 rounded-xl text-lg font-bold group"
        >
          Continuar
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </StepWrapper>
  )
}
