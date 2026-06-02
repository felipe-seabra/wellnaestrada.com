'use client'

import Link from 'next/link'
import { Camera, Mail } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { NAVIGATION } from '@/lib/constants/navigation'

interface FooterProps {
  brandName: string
  description: string
  instagramUrl: string
  contactEmail: string
}

export const Footer = ({
  brandName,
  description,
  instagramUrl,
  contactEmail,
}: FooterProps) => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Início', href: NAVIGATION.home },
    { label: 'Como Funciona', href: NAVIGATION.about },
    { label: 'Benefícios', href: NAVIGATION.home },
    { label: 'Formulário de Aplicação', href: NAVIGATION.application },
    { label: 'Política de Privacidade', href: NAVIGATION.privacy },
  ]

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href={NAVIGATION.home} className="inline-block">
              <span className="font-brand text-3xl text-emerald-500">
                {brandName}
              </span>
            </Link>
            <p className="max-w-sm text-lg leading-relaxed">{description}</p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Links Rápidos</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === NAVIGATION.application) {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-500 transition-colors group"
                >
                  <Camera className="w-5 h-5 text-zinc-500 group-hover:text-emerald-500" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 hover:text-emerald-500 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-zinc-500 group-hover:text-emerald-500" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>
            © {currentYear} {brandName}. Todos os direitos reservados.
          </p>
          <p className="font-mono opacity-50 uppercase tracking-widest">
            IRL • BR
          </p>
        </div>
      </Container>
    </footer>
  )
}
