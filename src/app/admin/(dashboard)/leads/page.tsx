import { LeadsService } from '@/services/leads.service'
import { updateLeadStatus } from './actions'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default async function AdminLeads(props: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}) {
  const searchParams = await props.searchParams
  const q = searchParams.q
  const status = searchParams.status
  const page = Number(searchParams.page) || 1

  const { leads, total, totalPages } = await LeadsService.getAllLeads({
    search: q,
    status,
    page,
  })

  const statusOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Novo', value: 'new' },
    { label: 'Contatado', value: 'contacted' },
    { label: 'Qualificado', value: 'qualified' },
    { label: 'Convertido', value: 'converted' },
    { label: 'Perdido', value: 'lost' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Leads</h1>
          <p className="text-zinc-500 mt-1">
            Total de {total} interessados capturados.
          </p>
        </div>

        <form className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              name="q"
              placeholder="Buscar por nome ou email..."
              className="pl-10"
              defaultValue={q}
            />
          </div>
          <Button type="submit">Buscar</Button>
        </form>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {statusOptions.map((opt) => (
          <a
            key={opt.value}
            href={`/admin/leads?status=${opt.value}${q ? `&q=${q}` : ''}`}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap border ${
              (status || 'all') === opt.value
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500'
            }`}
          >
            {opt.label}
          </a>
        ))}
      </div>

      <div className="grid gap-6">
        {leads.map((lead: any) => (
          <Card
            key={lead.id}
            className="p-6 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between lg:justify-start lg:gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{lead.full_name}</h3>
                    <p className="text-zinc-500 text-sm font-medium">
                      {lead.email} • {lead.phone}
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none px-3 py-1">
                    {lead.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-zinc-100 dark:border-zinc-800/50">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Momento
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      {lead.funnel_answers?.current_moment || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Financeiro
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      {lead.funnel_answers?.financial_planning || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Retenção VSL
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      {lead.video_engagement_seconds || 0}s
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Origem
                    </span>
                    <p className="text-sm font-semibold mt-1">
                      {lead.source || 'Landing Page'}
                    </p>
                  </div>
                </div>

                {lead.funnel_answers?.goal && (
                  <div className="bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs italic text-zinc-600 dark:text-zinc-400">
                      &quot;{lead.funnel_answers.goal}&quot;
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:w-64 flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-zinc-100 dark:border-zinc-800 pt-6 lg:pt-0 lg:pl-6">
                <div className="text-right">
                  <p className="text-xs text-zinc-400 font-mono">
                    {new Date(lead.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    {new Date(lead.created_at).toLocaleTimeString('pt-BR')}
                  </p>
                </div>

                <div className="mt-4 w-full">
                  <form action={updateLeadStatus} className="space-y-2">
                    <input type="hidden" name="leadId" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                      onChange={(e) => e.target.form?.requestSubmit()}
                    >
                      {statusOptions
                        .filter((o) => o.value !== 'all')
                        .map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            Mudar para {opt.label}
                          </option>
                        ))}
                    </select>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {leads.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <Users className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <p className="text-zinc-500 font-medium">
              Nenhum lead encontrado para estes filtros.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <a
                key={i}
                href={`/admin/leads?page=${i + 1}${q ? `&q=${q}` : ''}${
                  status ? `&status=${status}` : ''
                }`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                  page === i + 1
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500'
                }`}
              >
                {i + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
