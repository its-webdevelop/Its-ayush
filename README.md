# ITS-AYUSH.IN — Existing website with Supabase form integration

This package preserves the existing website files and design. The existing quotation/lead form in `index.html` now submits to the Supabase REST API instead of Firebase.

## Files
- `index.html` — existing full website and interactions, with Supabase lead submission.
- `style.css` — existing website styles (preserved).
- `script.js` and `firebase.js` — original legacy files retained for reference; the current page's lead form does not import these files.
- `supabase-setup.sql` — SQL to create the leads table and a restricted anonymous insert policy.
- `sitemap.xml` — existing sitemap.
- `firestore.rules.example` — legacy Firebase example, not used by this Supabase integration.

## Setup
1. Open the Supabase project `jkmlmtqkkkzsdalnjoha`.
2. Go to SQL Editor → New query. Paste `supabase-setup.sql` and click Run. Do this only if you do not already have a `public.leads` table with important data.
3. In Supabase, open Project Settings/API Keys and copy the **publishable key** (starts with `sb_publishable_`). Never use a secret/service-role key in frontend code.
4. Open `index.html` and find `PASTE_YOUR_SB_PUBLISHABLE_KEY_HERE`. Replace only that text with your publishable key. Keep the key between the quotation marks. It is intentionally a placeholder in this ZIP.
5. Save and commit all changed files to the existing GitHub repository. Vercel should deploy automatically if connected to that repository.
6. Open `https://its-ayush.in`, submit a test enquiry, then check Supabase → Table Editor → `leads`.

## Security
- The browser uses only the Supabase project URL and publishable key.
- RLS is enabled. The provided policy grants anonymous visitors INSERT only; it does not grant SELECT, UPDATE, or DELETE.
- Never place a Supabase secret/service-role key in HTML, browser JavaScript, or public GitHub.
- The form is validated in the browser and constrained by database checks. This is not full anti-spam protection; add bot protection/rate limiting before relying on the public endpoint at scale.
- If the existing `public.leads` table is already present, inspect its columns and policies before running the SQL; do not blindly replace a live schema.

## Notes
- No DNS/domain changes are required for this integration.
- The website's original `style.css` and visual layout are retained.
- The existing Firebase-related files are retained but are no longer used by the main page's lead form.
- The form only displays success after Supabase confirms the insert.
