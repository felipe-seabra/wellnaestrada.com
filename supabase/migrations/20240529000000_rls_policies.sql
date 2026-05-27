-- Allow anonymous inserts for leads
CREATE POLICY "Allow anonymous inserts for leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous inserts for analytics events
CREATE POLICY "Allow anonymous inserts for analytics_events"
ON public.analytics_events
FOR INSERT
TO anon
WITH CHECK (true);

-- For now, allow public read on internal dashboard if RLS is enabled
-- (This should be restricted to authenticated users in production)
CREATE POLICY "Allow public read for leads (development)"
ON public.leads
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public read for analytics_events (development)"
ON public.analytics_events
FOR SELECT
TO anon
USING (true);
