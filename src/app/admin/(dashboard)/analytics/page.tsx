import { AnalyticsRepository } from '@/repositories/analytics.repository'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Eye,
  Play,
  LockOpen,
  FileText,
  UserCheck,
} from 'lucide-react'
import { StatCard } from '@/components/shared/stat-card'

export default async function AdminAnalytics() {
  const stats = await AnalyticsRepository.getDetailedStats()

  const funnelSteps = [
    {
      label: 'Impressões VSL',
      value: stats.impressions,
      icon: Eye,
      color: 'text-zinc-500',
    },
    {
      label: 'Inícios Vídeo',
      value: stats.starts,
      icon: Play,
      color: 'text-blue-500',
    },
    {
      label: 'CTAs Liberados',
      value: stats.unlocks,
      icon: LockOpen,
      color: 'text-purple-500',
    },
    {
      label: 'Formulário Aberto',
      value: stats.formOpens,
      icon: FileText,
      color: 'text-orange-500',
    },
    {
      label: 'Leads Convertidos',
      value: stats.conversions,
      icon: UserCheck,
      color: 'text-emerald-500',
    },
  ]

  // Conversion calculations
  const viewToStart = stats.impressions
    ? ((stats.starts / stats.impressions) * 100).toFixed(1)
    : 0
  const startToUnlock = stats.starts
    ? ((stats.unlocks / stats.starts) * 100).toFixed(1)
    : 0
  const unlockToConversion = stats.unlocks
    ? ((stats.conversions / stats.unlocks) * 100).toFixed(1)
    : 0
  const totalConversion = stats.impressions
    ? ((stats.conversions / stats.impressions) * 100).toFixed(1)
    : 0

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Performance</h1>
        <p className="text-zinc-500 mt-1">
          Acompanhe o funil de conversão e comportamento dos visitantes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {funnelSteps.map((step) => (
          <Card key={step.label} className="p-6">
            <div
              className={`p-2 w-fit rounded-lg bg-zinc-50 dark:bg-zinc-900 mb-4 ${step.color}`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-zinc-500">{step.label}</p>
            <h3 className="text-2xl font-bold mt-1">{step.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-8">Funil de Conversão</h3>

          <div className="space-y-12 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-zinc-100 dark:bg-zinc-800 -z-10" />

            <div className="flex items-center gap-8">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold ring-8 ring-blue-500/10">
                1
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold">Retenção de Visualização</span>
                  <span className="text-blue-500 font-bold">
                    {viewToStart}%
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${viewToStart}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Visitantes que deram play no vídeo após carregar a página.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold ring-8 ring-purple-500/10">
                2
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold">Engajamento VSL</span>
                  <span className="text-purple-500 font-bold">
                    {startToUnlock}%
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${startToUnlock}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Leads que assistiram até o momento da oferta (CTA Unlock).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold ring-8 ring-emerald-500/10">
                3
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold">Conversão de Aplicação</span>
                  <span className="text-emerald-500 font-bold">
                    {unlockToConversion}%
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${unlockToConversion}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Leads que completaram o formulário após liberar o botão.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-zinc-950 text-white border-none shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-400 mb-2">
              Taxa de Conversão Geral
            </h3>
            <h2 className="text-6xl font-black text-emerald-500">
              {totalConversion}%
            </h2>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Esta é a porcentagem de visitantes únicos que se tornam leads
              qualificados.
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-zinc-800">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Benchmark do Mercado</span>
              <span className="font-bold text-zinc-300">2.5% - 4.0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Status da Campanha</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                Excelente
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
