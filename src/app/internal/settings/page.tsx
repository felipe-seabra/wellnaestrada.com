import { SettingsService } from '@/services/settings.service'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default async function AdminSettings() {
  const settings = await SettingsService.getAllSettings()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações da Plataforma</h1>
        <p className="text-zinc-500 mt-1">
          Gerencie a identidade visual e parâmetros do sistema.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Brand Identity */}
        <Card className="p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Identidade da Marca</h3>
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="brand_name">Nome da Marca</Label>
              <Input
                id="brand_name"
                defaultValue={
                  settings?.find((s: any) => s.key === 'brand_name')?.value ||
                  ''
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instagram_url">URL do Instagram</Label>
              <Input
                id="instagram_url"
                defaultValue={
                  settings?.find((s: any) => s.key === 'instagram_url')
                    ?.value || ''
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_email">Email de Contato</Label>
              <Input
                id="contact_email"
                defaultValue={
                  settings?.find((s: any) => s.key === 'contact_email')
                    ?.value || ''
                }
              />
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-500">
              Salvar Alterações
            </Button>
          </div>
        </Card>

        {/* Video Configuration */}
        <Card className="p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Configuração do VSL</h3>
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="youtube_video_id">YouTube Video ID</Label>
              <Input
                id="youtube_video_id"
                defaultValue={
                  settings?.find((s: any) => s.key === 'youtube_video_id')
                    ?.value || ''
                }
              />
              <p className="text-xs text-zinc-400">
                Exemplo: dQw4w9WgXcQ (Código após o v= na URL)
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="video_unlock_seconds">
                Tempo para Liberar CTA (Segundos)
              </Label>
              <Input
                id="video_unlock_seconds"
                type="number"
                defaultValue={
                  settings?.find((s: any) => s.key === 'video_unlock_seconds')
                    ?.value || 15
                }
              />
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-500">
              Atualizar Vídeo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
