import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function InternalDashboard() {
  const supabase = await createClient()

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8">Erro ao carregar leads: {error.message}</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard de Leads</h1>
        <Badge variant="outline">{leads?.length || 0} Leads Totais</Badge>
      </div>

      <div className="grid gap-6">
        {leads?.map((lead) => (
          <Card key={lead.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{lead.full_name}</h3>
                <p className="text-zinc-500">{lead.email} • {lead.phone}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-400">Momento</span>
                    <p className="text-sm">{lead.funnel_answers?.current_moment || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-400">Financeiro</span>
                    <p className="text-sm">{lead.funnel_answers?.financial_planning || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-zinc-400">Engajamento VSL</span>
                    <p className="text-sm">{lead.video_engagement_seconds || 0}s</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge>{lead.status}</Badge>
                <span className="text-xs text-zinc-400">
                  {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
            {lead.funnel_answers?.goal && (
              <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                <span className="text-xs font-bold uppercase text-zinc-400">Objetivo / Sonho</span>
                <p className="mt-1 text-sm italic">"{lead.funnel_answers.goal}"</p>
              </div>
            )}
          </Card>
        ))}

        {leads?.length === 0 && (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">Nenhum lead encontrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
