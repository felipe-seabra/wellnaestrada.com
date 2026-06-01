import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReactNode, ComponentPropsWithoutRef } from 'react'

interface CTAButtonProps extends ComponentPropsWithoutRef<
  typeof ButtonPrimitive
> {
  children: ReactNode
  className?: string
  glow?: boolean
}

export const CTAButton = ({
  children,
  className,
  glow,
  ...props
}: CTAButtonProps) => {
  return (
    <Button
      className={cn(
        'h-16 rounded-2xl text-lg font-bold transition-all active:scale-95 px-8',
        glow && 'shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.02]',
        className,
      )}
      {...(props as any)}
    >
      {children}
    </Button>
  )
}
