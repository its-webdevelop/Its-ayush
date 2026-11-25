# 0xnullex — upgrade audit

## Scope
The supplied `Its-ayush-main(2).zip` was inspected and upgraded in place. The existing HTML/CSS/JavaScript architecture was retained.

## Completed
- Rebranded visible website identity to `0xnullex`.
- Updated official Instagram to `@0xnullex`.
- Added direct WhatsApp, phone and Instagram contact actions.
- Updated page title, description, canonical URL and social metadata.
- Updated WebSite + Organization structured data.
- Added local favicon and web manifest.
- Added Privacy and Terms pages.
- Added responsive studio highlight strip.
- Added keyboard Escape handling for overlays/mobile navigation.
- Added a small phone-copy interaction without changing the normal `tel:` action.
- Updated `robots.txt` and `sitemap.xml`.
- Rebranded the 404 page.

## Preserved
- Existing service sections and portfolio content.
- Existing Firebase lead workflow and restrictive Firestore rules.
- Existing responsive layout and animation architecture.
- Existing Vercel static deployment structure.

## Not changed
- Firebase project credentials/configuration.
- Firestore security model.
- DNS records.
- GitHub repository settings.
- Vercel account/deployment.

## Verification
- Archive contents inspected before editing.
- Required new files exist.
- Internal references for favicon, manifest, Privacy and Terms were checked.
- Brand/contact references were searched after modification.
- JavaScript files were syntax-checked where directly applicable.

## Remaining production checks
- Run a real browser test on the deployed Vercel origin.
- Verify Firestore submission using a controlled test inquiry.
- Verify external CDN availability and real Core Web Vitals.
- Verify the final production domain/canonical behavior in Search Console.
