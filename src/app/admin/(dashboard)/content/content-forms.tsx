'use client'

import { updateSectionContent } from './actions'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function HeroContentForm({ hero }: { hero: any }) {
  return (
    <Card className="p-8 border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold mb-6">Seção Hero (Topo)</h3>
      <form action={updateSectionContent} className="space-y-6">
        <input type="hidden" name="section" value="hero" />
        <div className="grid gap-2">
          <Label>Título Principal</Label>
          <Input
            name="title"
            defaultValue={hero.title}
            onChange={(e) => {
              const form = e.target.form!
              const title = (
                form.elements.namedItem('title') as HTMLInputElement
              ).value
              const subtitle = (
                form.elements.namedItem('subtitle') as HTMLInputElement
              ).value
              form.querySelector<HTMLInputElement>(
                'input[name="content"]',
              )!.value = JSON.stringify({ title, subtitle })
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label>Subtítulo / Chamada</Label>
          <Textarea
            name="subtitle"
            defaultValue={hero.subtitle}
            onChange={(e) => {
              const form = e.target.form!
              const title = (
                form.elements.namedItem('title') as HTMLInputElement
              ).value
              const subtitle = (
                form.elements.namedItem('subtitle') as HTMLTextAreaElement
              ).value
              form.querySelector<HTMLInputElement>(
                'input[name="content"]',
              )!.value = JSON.stringify({ title, subtitle })
            }}
          />
        </div>
        <input type="hidden" name="content" value={JSON.stringify(hero)} />
        <div className="flex justify-end">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500">
            Atualizar Hero
          </Button>
        </div>
      </form>
    </Card>
  )
}

export function AboutContentForm({ about }: { about: any }) {
  return (
    <Card className="p-8 border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold mb-6">Sobre o Well (Storytelling)</h3>
      <form action={updateSectionContent} className="space-y-6">
        <input type="hidden" name="section" value="about" />
        <div className="grid gap-2">
          <Label>Título da Seção</Label>
          <Input name="title" defaultValue={about.title} />
        </div>
        <div className="grid gap-2">
          <Label>Parágrafo 1</Label>
          <Textarea name="p1" defaultValue={about.p1} rows={4} />
        </div>
        <div className="grid gap-2">
          <Label>Parágrafo 2</Label>
          <Textarea name="p2" defaultValue={about.p2} rows={4} />
          <p className="text-[10px] text-zinc-400">
            Use &quot;brand_name&quot; para inserir o nome da marca
            automaticamente.
          </p>
        </div>
        <div className="grid gap-2">
          <Label>Frase de Efeito (Quote)</Label>
          <Input name="quote" defaultValue={about.quote} />
        </div>

        <input type="hidden" name="content" value={JSON.stringify(about)} />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500"
            onClick={(e) => {
              const form = (e.target as HTMLButtonElement).form!
              const title = (
                form.elements.namedItem('title') as HTMLInputElement
              ).value
              const p1 = (form.elements.namedItem('p1') as HTMLTextAreaElement)
                .value
              const p2 = (form.elements.namedItem('p2') as HTMLTextAreaElement)
                .value
              const quote = (
                form.elements.namedItem('quote') as HTMLInputElement
              ).value
              form.querySelector<HTMLInputElement>(
                'input[name="content"]',
              )!.value = JSON.stringify({ title, p1, p2, quote })
            }}
          >
            Atualizar Storytelling
          </Button>
        </div>
      </form>
    </Card>
  )
}

export function FooterContentForm({ footer }: { footer: any }) {
  return (
    <Card className="p-8 border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold mb-6">Rodapé (Footer)</h3>
      <form action={updateSectionContent} className="space-y-6">
        <input type="hidden" name="section" value="footer" />
        <div className="grid gap-2">
          <Label>Descrição Curta</Label>
          <Textarea
            name="description"
            defaultValue={footer.description}
            onChange={(e) => {
              const form = e.target.form!
              const description = e.target.value
              form.querySelector<HTMLInputElement>(
                'input[name="content"]',
              )!.value = JSON.stringify({ description })
            }}
          />
        </div>
        <input type="hidden" name="content" value={JSON.stringify(footer)} />
        <div className="flex justify-end">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500">
            Atualizar Rodapé
          </Button>
        </div>
      </form>
    </Card>
  )
}
