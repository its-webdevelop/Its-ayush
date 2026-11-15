# Its Ayush — deployment testing checklist

## Before deployment
- [ ] Keep `Its-Ayush-Original-Source-Backup.zip` somewhere safe.
- [ ] Confirm the GitHub repository root contains `index.html`, `style.css`, `premium-ui.css`, `app-enhancements.js`, `robots.txt`, `sitemap.xml`, `404.html` and `vercel.json`.
- [ ] Confirm Vercel uses static output with no build command.
- [ ] Confirm the intended Firebase project is `its-ayush`.

## After Vercel preview deployment
- [ ] Open the preview homepage and check desktop and mobile navigation.
- [ ] Test the theme toggle, portfolio filters, project details modal, FAQ accordion and back-to-top button.
- [ ] Check every portfolio destination and social/contact link.
- [ ] Check the mobile menu opens, closes and updates its accessible state.
- [ ] Check the page at 320px, 375px, 768px, 1024px and wide desktop widths.
- [ ] Confirm there is no horizontal page overflow.
- [ ] Open `/404` or a deliberately missing path and confirm the branded not-found page appears.
- [ ] Open `/robots.txt` and `/sitemap.xml`; confirm the sitemap lists `https://www.its-ayush.in/`.
- [ ] Confirm the homepage canonical tag and social preview metadata use the WWW URL.
- [ ] Confirm the apex domain redirects to the WWW domain in Vercel Domains.

## Contact form (requires live Firebase)
- [ ] Submit a controlled test inquiry using valid name, email, project type and description.
- [ ] Confirm the success modal appears only after Firestore accepts the write.
- [ ] Confirm the document is created in Firestore collection `leads`.
- [ ] Test invalid email, missing required fields and a too-short description.
- [ ] Test the failure message with Firebase rules temporarily unavailable only in a safe test environment.
- [ ] Confirm no public visitor can read, update or delete lead documents.
- [ ] Do not publish broader Firestore rules merely to make a failed test pass.

## Search and performance
- [ ] Submit the updated sitemap in Google Search Console if needed.
- [ ] Inspect the live canonical URL and indexing status in Search Console.
- [ ] Run Lighthouse on the deployed WWW URL.
- [ ] Check mobile layout and Core Web Vitals using real device/field data when available.
- [ ] Confirm the logo and profile image load on the deployed site.

## Do not do
- [ ] Do not change GoDaddy nameservers or DNS unless you intentionally plan a domain migration.
- [ ] Do not upload Firebase Admin credentials or private service-account keys.
- [ ] Do not load the legacy `script.js`/`firebase.js` path without reconciling its `contactMessages` collection with backend rules.
