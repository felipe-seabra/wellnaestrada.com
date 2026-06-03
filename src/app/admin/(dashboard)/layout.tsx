import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  BarChart3,
} from 'lucide-react'
import { Container } from '@/components/shared/container'

import { logout } from '../login/actions'

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Conteúdo', href: '/admin/content', icon: FileText },
  { label: 'Configurações', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="font-brand text-2xl text-emerald-600">
            Well na Estrada
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
            Admin Platform
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-500 rounded-xl transition-all font-medium group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair do Painel
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8 lg:hidden">
          <Link href="/" className="font-brand text-xl text-emerald-600">
            Well na Estrada
          </Link>
          {/* Mobile menu button could go here */}
        </header>

        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
