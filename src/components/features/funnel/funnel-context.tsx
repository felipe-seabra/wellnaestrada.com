'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const funnelSchema = z.object({
  full_name: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  current_moment: z.string().min(1, 'Selecione uma opção'),
  financial_planning: z.string().min(1, 'Selecione uma opção'),
  goal: z.string().min(5, 'Conte um pouco mais sobre seu sonho'),
})

type FunnelData = z.infer<typeof funnelSchema>

interface FunnelContextType {
  form: UseFormReturn<FunnelData>
  step: number
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  isSubmitting: boolean
  setIsSubmitting: (loading: boolean) => void
}

const FunnelContext = createContext<FunnelContextType | null>(null)

export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FunnelData>({
    resolver: zodResolver(funnelSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      current_moment: '',
      financial_planning: '',
      goal: '',
    },
    mode: 'onChange',
  })

  // Draft Persistence
  useEffect(() => {
    const saved = localStorage.getItem('funnel_draft')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        form.reset(data)
        // Optionally restore step
        const savedStep = localStorage.getItem('funnel_step')
        if (savedStep) setStep(parseInt(savedStep))
      } catch (e) {
        console.error('Failed to restore draft', e)
      }
    }
  }, [form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('funnel_draft', JSON.stringify(value))
    })
    localStorage.setItem('funnel_step', step.toString())
    return () => subscription.unsubscribe()
  }, [form, step])

  const nextStep = () => setStep((s) => s + 1)
  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  return (
    <FunnelContext.Provider
      value={{
        form,
        step,
        setStep,
        nextStep,
        prevStep,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </FunnelContext.Provider>
  )
}

export function useFunnel() {
  const context = useContext(FunnelContext)
  if (!context) throw new Error('useFunnel must be used within FunnelProvider')
  return context
}
