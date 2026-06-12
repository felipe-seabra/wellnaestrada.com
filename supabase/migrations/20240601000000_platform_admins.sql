-- Create platform_admins table for secure local-first authentication
-- This table is used when the full Supabase Auth stack is not available locally
CREATE TABLE IF NOT EXISTS public.platform_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.platform_admins ENABLE ROW LEVEL SECURITY;

-- Deny all public access to this table
CREATE POLICY "Deny all public access to platform_admins"
ON public.platform_admins FOR ALL TO anon USING (false);

-- Note: We use crypt() from pgcrypto which is standard in Supabase images
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Secure RPC to initialize admin credentials from a setup script (service_role only)
CREATE OR REPLACE FUNCTION public.set_admin_credentials(p_email TEXT, p_password TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.platform_admins (email, password_hash)
    VALUES (
        p_email,
        crypt(p_password, gen_salt('bf'))
    )
    ON CONFLICT (email) DO UPDATE 
    SET password_hash = crypt(p_password, gen_salt('bf'));
END;
$$;

-- Restrict execution to service_role to prevent public access
REVOKE ALL ON FUNCTION public.set_admin_credentials(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_admin_credentials(TEXT, TEXT) TO service_role;

-- Function to verify admin credentials
CREATE OR REPLACE FUNCTION public.verify_admin_credentials(p_email TEXT, p_password TEXT)
RETURNS TABLE (admin_id UUID, admin_email TEXT, admin_role TEXT) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT id, email, role
    FROM public.platform_admins
    WHERE email = p_email
    AND password_hash = crypt(p_password, password_hash);
END;
$$;
