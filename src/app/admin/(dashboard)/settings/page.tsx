import { SettingsService } from '@/services/settings.service'
import { updateSiteSettings } from './actions'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default async function AdminSettings() {
  const settings = await SettingsService.getSettings()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações da Plataforma</h1>
        <p className="text-zinc-500 mt-1">
          Gerencie a identidade visual e parâmetros do sistema.
        </p>
      </div>

      <form action={updateSiteSettings} className="grid gap-8">
        {/* Brand & Social */}
        <Card className="p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Identidade & Social</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="instagram_url">URL do Instagram</Label>
              <Input
                id="instagram_url"
                name="instagram_url"
                defaultValue={settings.instagram_url || ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="public_email">Email Público</Label>
              <Input
                id="public_email"
                name="public_email"
                defaultValue={settings.public_email || ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="support_email">Email de Suporte</Label>
              <Input
                id="support_email"
                name="support_email"
                defaultValue={settings.support_email || ''}
              />
            </div>
          </div>
        </Card>

        {/* Video Configuration */}
        <Card className="p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Configuração do VSL</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="youtube_video_id">YouTube Video ID</Label>
              <Input
                id="youtube_video_id"
                name="youtube_video_id"
                defaultValue={settings.youtube_video_id || ''}
              />
              <p className="text-xs text-zinc-400">Exemplo: dQw4w9WgXcQ</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="video_unlock_seconds">
                Tempo para Liberar CTA (Segundos)
              </Label>
              <Input
                id="video_unlock_seconds"
                name="cta_unlock_seconds"
                type="number"
                defaultValue={settings.cta_unlock_seconds || 15}
              />
            </div>
          </div>
        </Card>

        {/* SEO */}
        <Card className="p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">SEO & Metadados</h3>
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="meta_title">Título da Página (SEO)</Label>
              <Input
                id="meta_title"
                name="meta_title"
                defaultValue={settings.meta_title || ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="meta_description">Descrição (SEO)</Label>
              <Textarea
                id="meta_description"
                name="meta_description"
                defaultValue={settings.meta_description || ''}
              />
            </div>
          </div>
        </Card>

        {/* Legal & Footer */}
        <Card className="p-8 border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-6">Rodapé & Legal</h3>
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="copyright_text">Texto de Copyright</Label>
              <Input
                id="copyright_text"
                name="copyright_text"
                defaultValue={settings.copyright_text || ''}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="legal_text">Termos Legais (Resumo)</Label>
              <Textarea
                id="legal_text"
                name="legal_text"
                defaultValue={settings.legal_text || ''}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 min-w-[200px]"
          >
            Salvar Todas as Alterações
          </Button>
        </div>
      </form>
    </div>
  )
}
