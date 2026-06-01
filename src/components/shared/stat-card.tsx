import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  icon: any
  className?: string
}

export const StatCard = ({
  label,
  value,
  icon: Icon,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center space-y-2',
        className,
      )}
    >
      <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl font-bold text-zinc-900">{value}</p>
      <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  )
}
