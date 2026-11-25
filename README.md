# 0xnullex — upgraded static website

This project is a static HTML/CSS/JavaScript website for Vercel. No framework or build step is required. The existing architecture was preserved and upgraded rather than replaced.

## Brand
- Brand: 0xnullex
- Website: https://its-ayush.in
- Email: 0xnullex@gmail.com
- Phone: +91 7004106326
- WhatsApp: https://wa.me/917004106326
- Instagram: https://www.instagram.com/0xnullex/

## Main files
- `index.html` — homepage, SEO metadata, structured data, services, portfolio, process, FAQ, contact form and interactive UI.
- `style.css` — original site styles retained.
- `premium-ui.css` — premium visual system, responsive refinements, accessibility finishing and v3 studio polish.
- `app-enhancements.js` — interaction layer, portfolio/service shortcuts, mobile navigation cleanup, copy helpers and resilient keyboard handling.
- `firebase.js` / `script.js` — legacy files retained but not loaded by the homepage.
- `firestore.rules` — restrictive create-only lead rules for the `leads` collection.
- `404.html` — rebranded not-found page.
- `privacy.html` / `terms.html` — basic informational legal pages.
- `favicon.svg` / `manifest.webmanifest` — local brand identity and install metadata.
- `robots.txt` / `sitemap.xml` — updated for the canonical apex domain.
- `vercel.json` — security and static asset cache headers.

## Important deployment note
The active contact form writes to Firestore from the browser. Before production use, verify the Firebase project, published Firestore rules and API-key restrictions. A successful UI message is shown only after Firestore confirms the write.

## Deploy to Vercel
1. Upload the contents of this folder to the root of the GitHub repository.
2. Import the repository into Vercel.
3. Use no build command and the project root as the output.
4. Deploy a preview first.
5. Configure `its-ayush.in` as the production domain in Vercel without changing DNS records from this package.
6. Test navigation, mobile layout, external contact links and a controlled Firestore form submission.

## Upgrade highlights
- Complete 0xnullex branding replacement across the homepage and contact experience.
- Updated SEO title, description, canonical URL, Open Graph/Twitter metadata and Organization structured data.
- Premium dark technology visual layer with cyan/purple accent energy while preserving the existing gold identity.
- New responsive studio highlights strip.
- Added direct phone and Instagram contact cards.
- Replaced Telegram-focused contact CTAs with direct WhatsApp CTAs.
- Added local favicon and web manifest.
- Added Privacy and Terms pages.
- Added keyboard Escape handling and small interaction resilience improvements.
- Updated robots and sitemap.

## Verification limits
Static source inspection and local file checks were performed on the supplied archive. No live Vercel deployment, GitHub account, DNS change or production Firebase submission was performed in this environment.
