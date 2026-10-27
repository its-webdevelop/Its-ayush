# AYUSHlabs Portfolio — Firebase-ready upgrade

This package separates the supplied portfolio into `index.html`, `style.css`, and `script.js`, while retaining the original page layout and interactions. It also includes setup guidance and example Firestore rules.

## Files
- `index.html` — page markup and SEO metadata
- `style.css` — extracted site styles
- `script.js` — site interactions and contact-form submission
- `firebase.js` — Firebase modular SDK setup and Firestore message writer
- `firestore.rules.example` — restrictive starter rules (review before publishing)

## Connect Firebase
1. Open the Firebase Console: https://console.firebase.google.com/ and select the project used by this site (or create one).
2. The live website domain is `https://its-ayush.in/`. Open Graph, Twitter, canonical, and structured-data URLs are set to this domain. This version is configured with the `its-ayush` Firebase Web App values supplied in the conversation. If you use a different project, update `firebaseConfig` in `firebase.js`.
3. Create a **Cloud Firestore** database.
4. Deploy/adjust Firestore Security Rules. The contact form writes to the `contactMessages` collection. The project details are included in the `message` field to match the supplied rules. Do not publish broad rules such as `allow read, write: if true`.
5. Serve the site over HTTP/HTTPS (Firebase Hosting, another static host, or a local development server). Do not test by opening `index.html` as a `file://` URL.
6. Submit a test lead and verify the document appears in Firestore. Check the browser console if it fails.

## Important security notes
- Firebase web config values are client-side identifiers, not server secrets. Restrict the API key to your site where appropriate.
- Public contact forms can be abused. Before production, add App Check and/or a server-side callable/HTTP endpoint, validation, spam protection, and rate limiting.
- The included form writes directly to Firestore. Its success dialog should appear only after Firestore confirms the write. If Firebase is not configured, it does not pretend the lead was saved.
- Never let public visitors read the `leads` collection. The example rules deny all reads and permit only tightly limited creates; review field validation and abuse protections for your requirements. Paste `firestore.rules.example` into Firestore → Rules and publish it before testing.
- The existing page includes third-party CDN scripts and metadata. Review these, your contact details, SEO URLs, and any analytics/ad IDs before deployment.

## Run locally
Use VS Code Live Server, or from this directory run a static server such as `python -m http.server 8000`, then visit `http://localhost:8000`.

## Deploy with Firebase Hosting (optional)
Install the Firebase CLI, run `firebase login`, then `firebase init hosting` in this directory. Choose `index.html` as the public entry point and deploy with `firebase deploy`. Carefully inspect the generated `firebase.json` before deploying.
