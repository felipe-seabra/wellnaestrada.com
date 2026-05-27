-- Update leads table with VSL and Funnel specific data
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS funnel_answers JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS video_engagement_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS session_id TEXT,
ADD COLUMN IF NOT EXISTS funnel_id TEXT,
ADD COLUMN IF NOT EXISTS variant_id TEXT;

-- Enhance analytics_events for deeper tracking
ALTER TABLE public.analytics_events
ADD COLUMN IF NOT EXISTS session_id TEXT,
ADD COLUMN IF NOT EXISTS funnel_id TEXT,
ADD COLUMN IF NOT EXISTS variant_id TEXT;

-- Index for session and funnel tracking
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics_events(session_id);

-- Add comments for better documentation
COMMENT ON COLUMN public.leads.funnel_answers IS 'Stores the multi-step form responses in JSON format';
COMMENT ON COLUMN public.leads.video_engagement_seconds IS 'Total seconds of VSL watched by the lead';
COMMENT ON COLUMN public.analytics_events.payload IS 'Extra context for the event (e.g., current step, video timestamp)';
