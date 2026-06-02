import { LeadsService } from '@/services/leads.service'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'

export default async function InternalLeads() {
  const leads = await LeadsService.getAllLeads()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leads Capturados</h1>
          <p className="text-zinc-500 mt-1">
            Gerencie os interessados na mentoria.
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-1 text-sm">
          {leads?.length || 0} Leads Totais
        </Badge>
      </div>

      <div className="grid gap-6">
        {leads?.map((lead) => (
          <Card
            key={lead.id}
            className="p-6 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{lead.full_name}</h3>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none">
                    {lead.status}
                  </Badge>
                </div>
                <p className="text-zinc-500 mt-1">
                  {lead.email} • {lead.phone}
                </p>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Momento
                    </span>
                    <p className="text-sm font-medium mt-0.5">
                      {lead.funnel_answers?.current_moment || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Financeiro
                    </span>
                    <p className="text-sm font-medium mt-0.5">
                      {lead.funnel_answers?.financial_planning || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Destino
                    </span>
                    <p className="text-sm font-medium mt-0.5">
                      {lead.funnel_answers?.main_interest || 'Irlanda'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Assistiu VSL
                    </span>
                    <p className="text-sm font-medium mt-0.5">
                      {lead.video_engagement_seconds || 0}s
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <span className="text-xs text-zinc-400 font-mono">
                  {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>

                <div className="flex gap-2 mt-4 md:mt-0">
                  {/* Actions could go here (e.g., mark as contacted) */}
                </div>
              </div>
            </div>

            {lead.funnel_answers?.goal && (
              <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Objetivo / Sonho
                </span>
                <p className="mt-1 text-sm italic text-zinc-700 dark:text-zinc-300">
                  &quot;{lead.funnel_answers.goal}&quot;
                </p>
              </div>
            )}
          </Card>
        ))}

        {leads?.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <Users className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500">Nenhum lead encontrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
