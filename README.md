# Its Ayush — updated static website

This project remains a static HTML/CSS/JavaScript website for Vercel. No framework or build step is required.

## Files

- `index.html` — homepage, sections, portfolio cards, FAQ, inquiry form and structured data.
- `style.css` — original site styles.
- `premium-ui.css` — premium visual layer plus accessibility/responsive finishing styles.
- `app-enhancements.js` — portfolio-card, service-card, mobile-navigation and copy-email enhancements.
- `script.js` — legacy standalone form module retained from the source archive; it is not loaded by `index.html`.
- `firebase.js` — legacy Firestore helper retained from the source archive; it is not loaded by `index.html`.
- `firestore.rules` — original Firestore security rules (not modified).
- `firestore.rules.example` — original example rules (not modified).
- `firebase.json`, `.firebaserc` — original Firebase project configuration (not modified).
- `robots.txt`, `sitemap.xml` — updated to the preferred WWW canonical domain.
- `vercel.json` — security response headers and static asset cache headers.
- `404.html` — branded not-found page for static hosting.
- `ORIGINAL-SOURCE` is not included in this deployable folder; the original upload is supplied separately as a backup ZIP.

## Contact form: read before deployment

The active form handler is the inline module in `index.html`. It writes inquiry documents to the Firestore `leads` collection. The existing Firestore rules also define create access for `leads`. The original Formspree `action` attribute remains in the HTML, but the JavaScript prevents the browser's native form submission and uses Firestore instead. There is no automatic Formspree fallback if Firestore is unavailable.

The separate `script.js` / `firebase.js` files are not loaded by the homepage. They contain a different legacy submission path that writes to `contactMessages`, which is not covered by the supplied `firestore.rules`. They were retained unchanged and should not be loaded unless that integration is deliberately reviewed and approved.

No Firebase configuration or database rules were changed. The Firebase web API key in `firebase.js` and the inline module is client configuration, not a server secret. Review API-key restrictions in Google Cloud/Firebase and keep Firestore rules published and appropriately restrictive. This static project cannot prevent automated spam on its own.

## Deploy to Vercel

1. Keep the supplied original ZIP as your backup.
2. Extract `Its-Ayush-Updated-Website.zip`.
3. Open the `Its-ayush-main` folder in VS Code.
4. Upload the **contents** of that folder to the root of your GitHub repository (not the enclosing folder, unless you configure Vercel's Root Directory to `Its-ayush-main`).
5. In Vercel, import or reconnect that GitHub repository.
6. Use no build command. Set the output directory to `.` (or leave the default static setting if Vercel detects it).
7. Deploy and test the preview URL before promoting it to production.
8. In Vercel Domains, make `www.its-ayush.in` the primary domain and configure the apex `its-ayush.in` to redirect to it. This dashboard step is needed for a real host-level redirect; this package does not change DNS or nameservers.
9. After deployment, test the contact form with a controlled test inquiry and verify that a document appears in Firebase Firestore under `leads`.

## Important verification limits

- The HTML/JavaScript/configuration checks described in `AUDIT-REPORT.md` were run locally.
- No live Firebase submission was performed; it requires the deployed origin and the correct Firebase project/rules.
- No Vercel or GitHub account was accessed.
- No DNS, nameserver, Search Console or production deployment changes were made.
- Browser-based visual testing was limited to the local environment; external CDN assets may behave differently online.
