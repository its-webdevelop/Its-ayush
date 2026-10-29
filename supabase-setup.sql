-- Run in Supabase Dashboard > SQL Editor > New query.
-- Intended for a NEW public.leads table. If the table already exists, inspect it first.
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) BETWEEN 1 AND 100),
    email TEXT NOT NULL CHECK (char_length(trim(email)) BETWEEN 3 AND 254),
    phone TEXT NOT NULL DEFAULT '' CHECK (char_length(phone) <= 30),
    company_name TEXT NOT NULL DEFAULT '' CHECK (char_length(company_name) <= 200),
    project_type TEXT NOT NULL CHECK (char_length(trim(project_type)) BETWEEN 1 AND 100),
    budget TEXT NOT NULL DEFAULT '' CHECK (char_length(budget) <= 50),
    delivery_time TEXT NOT NULL DEFAULT '' CHECK (char_length(delivery_time) <= 100),
    website_url TEXT NOT NULL DEFAULT '' CHECK (char_length(website_url) <= 2048),
    project_description TEXT NOT NULL CHECK (char_length(trim(project_description)) BETWEEN 1 AND 5000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can submit enquiries" ON public.leads;
CREATE POLICY "Public can submit enquiries"
ON public.leads FOR INSERT TO anon
WITH CHECK (
    char_length(trim(full_name)) BETWEEN 1 AND 100
    AND char_length(trim(email)) BETWEEN 3 AND 254
    AND char_length(trim(project_type)) BETWEEN 1 AND 100
    AND char_length(trim(project_description)) BETWEEN 1 AND 5000
);
REVOKE ALL ON TABLE public.leads FROM anon;
GRANT INSERT ON TABLE public.leads TO anon;
