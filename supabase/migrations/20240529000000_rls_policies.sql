-- Public users may submit leads and analytics events.
-- Read access remains restricted to authenticated/admin server contexts.

CREATE POLICY "Allow anonymous inserts for leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts for analytics_events"
ON public.analytics_events
FOR INSERT
TO anon
WITH CHECK (true);

-- Administrative reads should use authenticated/server-side access.
