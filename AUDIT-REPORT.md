# Its Ayush — project audit and upgrade report

## Source inspected

Primary source: the newly uploaded `Its-ayush-main(1).zip` (15 entries). It contains one homepage (`index.html`), two stylesheets, two JavaScript files plus a separate Firebase helper, Firebase/Firestore configuration, robots/sitemap files and supporting documentation. The earlier uploaded multi-page archive was not used as the primary source because the latest request explicitly named `Its-ayush-main(1).zip`.

An untouched copy of the original extracted source is preserved separately in `Its-Ayush-Original-Source-Backup.zip`.

## Findings in the supplied source

1. **Canonical inconsistency:** the page metadata, sitemap and robots.txt referred to the apex/non-WWW host even though the requested preferred canonical is `https://www.its-ayush.in/`.
2. **Unsubstantiated public claims:** the about section contained employer names, career dates and achievement claims; the testimonials section contained named customer quotes and quantified results; the hero included an unsupported performance score; some service/pricing text implied guaranteed speed, 24/7 support or a one-year support commitment.
3. **Portfolio mismatch:** portfolio card titles/descriptions did not consistently match their destination URLs, and one destination was duplicated. The displayed project identifiers were changed to the actual linked hostnames rather than claiming unsupported project details. Existing destinations were preserved.
4. **Multiple form paths:** the active inline module writes to Firestore collection `leads`. The provided Firestore rules also target `leads`. Separately, the unreferenced `script.js` imports `firebase.js`, which writes to `contactMessages`; that collection is not covered by the supplied rules. The form also retains a Formspree action attribute, but its submit handler prevents native submission and sends to Firestore. There is no working automatic fallback to Formspree.
5. **Security issue in terminal UI:** typed terminal commands were interpolated into `innerHTML`, creating a DOM injection risk.
6. **Animation lifecycle bug:** the Three.js visibility observer could start multiple animation loops when the hero re-entered the viewport.
7. **Performance overhead:** the page loaded an unrelated AdSense script and Blogger publisher metadata. These were removed. Three.js, Font Awesome and Google Fonts remain because the current design uses them.
8. **Accessibility gaps:** mobile navigation did not expose its expanded state; FAQ headers were generic clickable elements; keyboard focus and skip navigation needed improvement.
9. **Deployment/security configuration:** no Vercel-specific security response headers were supplied.

## Changes made

### Content and brand integrity
- Kept the original single-page structure, black/charcoal and champagne-gold visual direction, section order, project links, contact fields, Firebase submission code and existing interaction layer.
- Replaced unverifiable career history with a factual project workflow section.
- Replaced fabricated named testimonials with a clearly labelled “What You Can Expect” section describing process principles, not customer endorsements.
- Removed unsupported numeric skill ratings and the fictional performance score.
- Changed package prices to scope-based custom quotes rather than presenting unverified fixed rates.
- Reworded unsupported guarantees about speed, support availability and outcomes.
- Updated portfolio labels to match the actual linked hostnames while preserving the original URLs.
- Kept the owner identity, official logo, email, GitHub, Instagram and Telegram references.

### SEO and indexing
- Set the homepage title and description to the requested copy.
- Set canonical, Open Graph URL and Twitter URL to `https://www.its-ayush.in/`.
- Updated social title/description/image metadata.
- Replaced the structured data with conservative `Person` JSON-LD using only supplied identity and social profile information.
- Updated `robots.txt` and the one-page sitemap to the WWW canonical host.
- Added an Apple touch icon reference using the supplied logo.
- Added a branded `404.html` with `noindex`.

### Security and accessibility
- Changed terminal output to `textContent` so user-entered commands are not parsed as HTML.
- Added basic client-side length checks and trimmed required form values without changing the Firestore payload structure.
- Added `noopener noreferrer` to links opening new tabs.
- Added skip-to-content navigation, visible keyboard focus styling and mobile navigation ARIA state.
- Converted FAQ headers to native buttons and updated `aria-expanded` state.
- Added image lazy-loading/decoding for the below-the-fold profile image.
- Added Vercel response headers for MIME sniffing, referrer policy, framing and browser permissions.

### Performance and behavior
- Removed the unrelated AdSense script and Blogger-specific publisher metadata.
- Fixed the Three.js animation loop so only one loop runs while the hero is visible.
- Preserved the original visual effects and external libraries rather than replacing the design or introducing a framework.
- Added static asset cache headers in `vercel.json`.

## Files changed or created

**Changed**
- `index.html`
- `premium-ui.css`
- `robots.txt`
- `sitemap.xml`
- `README.md`

**Created**
- `404.html`
- `vercel.json`
- `AUDIT-REPORT.md`
- `TESTING-CHECKLIST.md`

**Preserved unchanged**
- `style.css`
- `script.js`
- `app-enhancements.js`
- `firebase.js`
- `firestore.rules`
- `firestore.rules.example`
- `firebase.json`
- `.firebaserc`
- `temp`

No original source files were deleted. The full original source is also delivered as a separate backup ZIP.

## Tests actually performed locally

- Parsed the updated HTML using BeautifulSoup.
- Confirmed there are no duplicate HTML IDs.
- Confirmed all in-page fragment links resolve to an existing ID.
- Confirmed local CSS/JavaScript references in the HTML exist.
- Parsed the JSON-LD as valid JSON.
- Parsed `vercel.json` as valid JSON.
- Parsed `sitemap.xml` as XML.
- Ran `node --check` on the inline JavaScript module; it passed syntax checking.
- Confirmed the canonical URL is the preferred WWW URL.
- Confirmed fabricated testimonial names, career-history names, performance percentages and promotional discount claims were removed from the visible page content.

## Not verified / requires your accounts or a deployed browser

- A real Firestore submission and success notification.
- Firestore rules deployment and live write permissions.
- The Formspree endpoint (it is not used by the active JavaScript handler).
- Vercel deployment and host-level apex-to-WWW redirect.
- Google Search Console indexing/canonical selection.
- Live external image/CDN availability.
- Full Lighthouse/Core Web Vitals measurements.
- Cross-device visual checks on physical iOS/Android devices.
- Third-party link destinations and social profile ownership for legacy links not explicitly supplied in the brief.

## Important backend note

The Firestore rules were deliberately not edited. They permit schema-constrained creation in `leads` and deny public reads/updates/deletes. The active page writes to `leads`. The unused `firebase.js` helper writes to `contactMessages`, which would not be accepted by the supplied rules. Do not load the legacy `script.js`/`firebase.js` flow unless you approve a separate backend change.

The Firebase web API key is visible in client-side code by design for Firebase web apps; it is not equivalent to a private server credential. Restrict it to the required APIs/domains in Google Cloud and monitor Firestore usage. Do not place Admin SDK credentials or service-account keys in this static project.
