'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/shared/container'
import { NAVIGATION } from '@/lib/constants/navigation'

interface NavbarProps {
  brandName: string
}

export const Navbar = ({ brandName }: NavbarProps) => {
  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-lg transition-all">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={NAVIGATION.home} className="flex z-40 items-center gap-2">
            <span className="font-brand text-2xl text-emerald-600">
              {brandName}
            </span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href={NAVIGATION.about}
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              Metodologia
            </Link>
            <Link
              href={NAVIGATION.home}
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={buttonVariants({
                size: 'sm',
                className:
                  'gap-2 bg-emerald-600 hover:bg-emerald-500 text-white',
              })}
            >
              <Sparkles className="h-4 w-4" />
              Iniciar Planejamento
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  )
}
