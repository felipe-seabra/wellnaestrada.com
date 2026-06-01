import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  dark?: boolean
}

export const Section = ({ children, className, id, dark }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-24 overflow-hidden',
        dark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900',
        className,
      )}
    >
      {children}
    </section>
  )
}
