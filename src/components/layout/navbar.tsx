import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '../ui/button'
import { MaxWidthWrapper } from './max-width-wrapper'

export const Navbar = () => {
  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-border/40 bg-background/60 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-bold text-xl tracking-tight">
            Well <span className="text-primary ml-1">na Estrada</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="#about"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              Sobre
            </Link>
            <Link
              href="https://wa.me/353000000000"
              className={buttonVariants({
                size: 'sm',
                className: 'gap-2',
              })}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
