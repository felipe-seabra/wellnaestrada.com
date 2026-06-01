import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4
  balance?: boolean
}

export const Heading = ({
  children,
  className,
  level = 2,
  balance = true,
}: HeadingProps) => {
  const Tag = `h${level}` as const

  const styles = {
    1: 'text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]',
    2: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
    3: 'text-2xl sm:text-3xl font-bold',
    4: 'text-xl sm:text-2xl font-bold',
  }

  return (
    <Tag className={cn(styles[level], balance && 'text-balance', className)}>
      {children}
    </Tag>
  )
}
