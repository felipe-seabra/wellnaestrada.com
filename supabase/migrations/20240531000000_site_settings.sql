-- Create site_settings table for centralized platform configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instagram_url TEXT,
    youtube_video_id TEXT,
    tiktok_url TEXT,
    linkedin_url TEXT,
    public_email TEXT,
    support_email TEXT,
    cta_unlock_seconds INTEGER DEFAULT 15,
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,
    copyright_text TEXT,
    legal_text TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read for site_settings"
ON public.site_settings FOR SELECT TO anon USING (true);

CREATE POLICY "Allow authenticated update for site_settings"
ON public.site_settings FOR UPDATE TO authenticated USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Seed initial record
INSERT INTO public.site_settings (
    instagram_url,
    youtube_video_id,
    public_email,
    support_email,
    cta_unlock_seconds,
    meta_title,
    meta_description,
    copyright_text
) VALUES (
    'https://instagram.com/wellnaestrada',
    'dQw4w9WgXcQ',
    'contato@wellnaestrada.com',
    'suporte@wellnaestrada.com',
    15,
    'Well na Estrada - O mapa estratégico para o seu intercâmbio premium',
    'Consultoria especializada para brasileiros que desejam estudar, trabalhar e construir uma nova vida na Irlanda.',
    '© 2024 Well na Estrada. Todos os direitos reservados.'
) ON CONFLICT DO NOTHING;
