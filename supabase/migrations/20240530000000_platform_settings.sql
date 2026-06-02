-- Create platform_settings table for dynamic configuration
CREATE TABLE IF NOT EXISTS public.platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Create platform_content table for section-based content management
CREATE TABLE IF NOT EXISTS public.platform_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.platform_content ENABLE ROW LEVEL SECURITY;

-- Basic policies (Restrict select to authenticated or for specific development needs)
CREATE POLICY "Allow public read for platform_settings"
ON public.platform_settings FOR SELECT TO anon USING (true);

CREATE POLICY "Allow public read for platform_content"
ON public.platform_content FOR SELECT TO anon USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_platform_settings_updated_at
    BEFORE UPDATE ON public.platform_settings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_platform_content_updated_at
    BEFORE UPDATE ON public.platform_content
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Seed Initial Settings
INSERT INTO public.platform_settings (key, value) VALUES
('brand_name', '"Well na Estrada"'),
('instagram_url', '"https://instagram.com/wellnaestrada"'),
('contact_email', '"contato@wellnaestrada.com"'),
('youtube_video_id', '"dQw4w9WgXcQ"'),
('video_unlock_seconds', '15')
ON CONFLICT (key) DO NOTHING;

-- Seed Initial Content
INSERT INTO public.platform_content (section, content) VALUES
('hero', '{
    "title": "O mapa estratégico para o seu intercâmbio premium",
    "subtitle": "Assista ao vídeo abaixo para liberar seu planejamento personalizado e descobrir como transformar o sonho da Irlanda em realidade."
}'),
('footer', '{
    "description": "Consultoria especializada para brasileiros que desejam estudar, trabalhar e construir uma nova vida na Irlanda."
}'),
('about', '{
    "title": "De brasileiro para brasileiro: Eu estive no seu lugar.",
    "p1": "Quando decidi mudar para a Irlanda, ouvi de tudo. Agências que só queriam vender cursos e promessas que não batiam com a realidade de quem vive aqui.",
    "p2": "A brand_name nasceu para ser o guia que eu gostaria de ter tido. Sem letras miúdas, com suporte real e uma estratégia personalizada para o seu objetivo.",
    "quote": "Sua jornada é única."
}'),
('why_ireland', '{
    "title": "Por que escolher a Irlanda?",
    "subtitle": "A Ilha Esmeralda oferece oportunidades únicas que você não encontra em nenhum outro lugar da Europa.",
    "items": [
        {"title": "Salário em Euro", "desc": "Um dos maiores salários mínimos da Europa, permitindo viver bem e guardar dinheiro."},
        {"title": "Visto de Trabalho", "desc": "Estudantes podem trabalhar legalmente, facilitando a imigração e o sustento."},
        {"title": "Porta para a Europa", "desc": "Viaje para Paris, Londres ou Roma com passagens que custam menos que um jantar."}
    ]
}')
ON CONFLICT (section) DO NOTHING;
