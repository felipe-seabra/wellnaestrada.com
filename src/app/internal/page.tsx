import { AnalyticsService } from '@/services/analytics.service'
import { Card } from '@/components/ui/card'
import { TrendingUp, Users, PlayCircle, MousePointer2 } from 'lucide-react'

export default async function AdminDashboard() {
  const stats = await AnalyticsService.getDashboardStats()
  const recentActivity = await AnalyticsService.getRecentActivity()

  const metrics = [
    {
      label: 'Total de Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Leads Hoje',
      value: stats.leadsToday,
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
    {
      label: 'Conversão VSL',
      value: '12.5%',
      icon: PlayCircle,
      color: 'text-purple-600',
    },
    {
      label: 'Cliques CTA',
      value: '45',
      icon: MousePointer2,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Visão Geral</h1>
        <p className="text-zinc-500 mt-1">
          Bem-vindo ao centro de comando da Well na Estrada.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card
            key={metric.label}
            className="p-6 border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500">
                  {metric.label}
                </p>
                <h3 className="text-3xl font-bold mt-1">{metric.value}</h3>
              </div>
              <div
                className={`p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl ${metric.color}`}
              >
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="p-6 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold mb-6">Atividade Recente</h3>
          <div className="space-y-6">
            {recentActivity?.map((event: any) => (
              <div key={event.id} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                <div>
                  <p className="text-sm">
                    <span className="font-bold">
                      {event.leads?.full_name || 'Visitante Anônimo'}
                    </span>{' '}
                    {event.event_name.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {new Date(event.created_at).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
            {!recentActivity?.length && (
              <p className="text-sm text-zinc-500 italic">
                Nenhuma atividade recente.
              </p>
            )}
          </div>
        </Card>

        {/* Quick Insights */}
        <Card className="p-6 border-zinc-200 dark:border-zinc-800 bg-emerald-600 text-white">
          <h3 className="text-lg font-bold mb-4">Dica de Performance</h3>
          <p className="text-emerald-50 leading-relaxed">
            Seus leads que assistem mais de 30 segundos de VSL têm uma taxa de
            conversão 3x maior. Considere otimizar a introdução do vídeo para
            manter a retenção.
          </p>
          <div className="mt-8 pt-6 border-t border-emerald-500/30 flex justify-between items-center">
            <span className="text-sm font-medium">Meta mensal de leads</span>
            <span className="text-2xl font-bold">85%</span>
          </div>
          <div className="w-full bg-emerald-700 rounded-full h-2 mt-2">
            <div className="bg-white h-2 rounded-full w-[85%]" />
          </div>
        </Card>
      </div>
    </div>
  )
}
