# Shortwave — AdSense Readiness Design

Date: 2026-09-22
Status: approved for planning

## 1. Problem

The site was submitted for AdSense and judged insufficient. Diagnosis
against the live site (`shortwaveradio.online`) found four blocking
technical defects and one content deficit.

### 1.1 Blocking technical defects (verified, not inferred)

**D1 — The site is not indexed by Google.** A `site:shortwaveradio.online`
query returns nothing from the domain. AdSense cannot review a site it
cannot find. This alone is an automatic rejection.

**D2 — Content pages are invisible to crawlers.** `curl https://shortwaveradio.online/learn`
returns the console's `<title>` ("SHORTWAVE — STATION K6-Z / RECEIVING"),
the console's `<meta name="description">`, and an empty `<div id="root">`.
All five content routes serve byte-identical HTML. Even after JS render,
the head metadata is the same on every route, so the site reads as one
page duplicated six times.

**D3 — `robots.txt` and `sitemap.xml` are broken.** Neither file exists.
The nginx SPA fallback (`try_files $uri $uri/ /index.html`) serves the
HTML shell for both with HTTP 200. Google receives an HTML document where
it expects a robots directive.

**D4 — Unlimited soft-404s carrying ad code.** `/gibberish-nonexistent-page-xyz`
returns HTTP 200 with the full console and the ad slot. `App.jsx` routes
every path outside `CONTENT_PATHS` to the console, so an unbounded set of
URLs serves ad markup with no corresponding content. This is the highest
review risk on the site.

### 1.2 Content deficit

| Page | Words |
|---|---|
| `/about` | ~183 |
| `/learn` | ~164 |
| `/history` | ~253 |
| `/faq` | ~251 |
| `/privacy` | ~235 (not content) |

Roughly 850 words of substantive content. No Terms of Service. No contact
page (a `mailto:` link only). No Google-certified CMP for EEA/UK traffic.

### 1.3 Policy context

The common advice — "add thirty blog posts" — is actively harmful under
current policy. Google's scaled content abuse policy targets bulk pages
that provide no real user value, and applies identically to AI-generated,
human-written, and hybrid content. Volume alone does not clear the bar;
distinct, genuinely useful pages do.

## 2. Goals

1. Make every content route independently crawlable, indexable, and
   distinctly described.
2. Eliminate soft-404s and ad code on contentless URLs.
3. Raise substantive content from ~850 to ~7,000 words plus three working
   tools, without resorting to bulk-generated articles.
4. Supply the trust pages and consent mechanism AdSense expects.

## 3. Non-goals — explicit constraints

- **The console at `/` is not modified.** No content block, no layout
  change. The radio console remains the landing experience. Only `<head>`
  metadata and a `<noscript>` link list are added to `index.html`, neither
  of which a user sees.
  - One exception, pending confirmation: `SiteFooter` already renders a
    visible link strip on the console. Section 6 proposes extending it
    with the new sections. This is the *only* visible change to `/` under
    this design, and it is optional — the sitemap and the `<noscript>`
    list already give crawlers a complete path, so the footer can stay
    exactly as it is with no loss.
- **No framework migration.** Vite + React stays. Docker, nginx, and the
  Coolify deployment shape are unchanged; the build still emits static
  files.
- **No changes to the relay server, the morse simulator, the channel
  hook, or any console component.**
- Routes stay flat siblings of the existing ones. No `/tools/*` or
  `/reference/*` grouping.

## 4. Architecture

### 4.1 Route manifest — single source of truth

`src/routes.js` exports one entry per public route:

```js
{ path, title, description, component, changefreq, priority, jsonLd }
```

The prerender script, the sitemap generator, and the site navigation all
read from this file so they cannot drift apart. Adding a page means
adding one entry.

### 4.2 Build-time prerendering

Uses Vite's native SSR build. No new framework, no prerender plugin.

- `src/entry-server.jsx` — exports `render(path)` returning
  `{ html, title, description, canonical, jsonLd }`.
- `scripts/prerender.mjs` — runs after the client build. For each content
  route it renders the component to static markup, injects it plus the
  route's metadata into the `dist/index.html` template, and writes
  `dist/<route>/index.html`.
- `src/main.jsx` — `hydrateRoot` when `#root` already has children,
  `createRoot` otherwise.
- `package.json` build script:
  `vite build && vite build --ssr src/entry-server.jsx && node scripts/prerender.mjs`

Hydration is safe: `InfoPage` and the planned content components are
pure, with no randomness and no `window` access during render. The
console is deliberately excluded from prerendering — it reads `window`,
picks a random frequency, and opens a socket.

### 4.3 The console page (`/`)

`dist/index.html` keeps the empty `#root`. Three additions, none visible
to a JS-enabled user:

- A `<title>` and `<meta name="description">` specific to the console,
  distinct from every content route.
- `<link rel="canonical" href="https://shortwaveradio.online/">`.
- A `WebApplication` JSON-LD block.
- A `<noscript>` list of the same links `SiteFooter` renders, giving the
  AdSense crawler a static path into the content pages. The links match
  what users see, so this is not cloaking.

### 4.4 404 handling

After prerendering, every real route exists on disk as a directory with
an `index.html`, so `try_files` resolves it. The fallback becomes a real
404:

```nginx
try_files $uri $uri/ /404.html;
error_page 404 /404.html;
```

`404.html` is a static page carrying the site's styling and a link home.
**It contains no ad code.** Because every route is known at build time
and no state lives in the URL, nothing legitimate is caught by this.

### 4.5 robots.txt and sitemap.xml

`public/robots.txt` is written by hand and allows everything, declaring
the sitemap location. `sitemap.xml` is generated into `dist/` by
`scripts/prerender.mjs` from the route manifest, so it stays in sync.

### 4.6 Structured data

`FAQPage` on `/faq`, `WebApplication` on `/`, `Article` on `/history` and
`/famous-messages`, `HowTo` on `/learn`. Emitted from the manifest at prerender time.

## 5. Content plan

### 5.1 New tools — utility, not prose

| Route | Description |
|---|---|
| `/morse-translator` | Text to Morse and back, with audio playback and a WPM control. The highest-volume search intent in this niche, and a tool rather than an article. |
| `/morse-code-chart` | Complete reference: letters, digits, punctuation, prosigns. Includes a print stylesheet. |
| `/morse-trainer` | Koch-method practice with scoring — the single-operator form of the existing ear-copy drill. |

These reuse `src/data/morse.js` and the sidetone approach already in the
codebase, but are self-contained components that do not import or alter
console state.

### 5.2 New reference pages

| Route | Description | Target |
|---|---|---|
| `/prosigns` | CQ, SOS, SK, AR, KN, 73, 88 — meaning and usage | ~800 w |
| `/q-codes` | QTH, QSL, QRM, QRN, QSY, QRZ — table plus explanation | ~900 w |
| `/phonetic-alphabet` | NATO/ICAO alongside the WWII-era "Able Baker" set | ~700 w |
| `/famous-messages` | Titanic's CQD/SOS, the D-Day signals — continues `/history` | ~900 w |

### 5.3 Expansions

- `/learn`: 164 → ~1,200 words. Timing units, Farnsworth spacing, common
  beginner mistakes, a practice progression.
- `/history`: 253 → ~1,000 words.

### 5.4 Trust pages

- `/terms` — Terms of Service.
- `/contact` — a real contact page stating what the address is for and
  expected response time, replacing the bare `mailto:`.

### 5.5 Totals

~7,000 words of substantive content plus three working tools, across
pages that differ in format and purpose. This clears the low-value-content
bar without resembling bulk generation.

## 5.6 Phasing

The work splits into two phases that ship independently. Indexing has
days-to-weeks of latency and gates approval (section 8), so the
infrastructure must go live before the content is finished rather than
alongside it.

**Phase 1 — infrastructure.** Sections 4.1 through 4.6, plus `/terms` and
`/contact` from 5.4. Ships the prerender pipeline, working `robots.txt`
and `sitemap.xml`, real 404s, and per-route metadata over the five
existing content pages. On deploy, the Search Console steps in section 8
begin immediately and indexing starts accruing.

**Phase 2 — content.** Sections 5.1 through 5.3 and section 6. Each new
page is one route-manifest entry plus one component, and each is added to
the sitemap automatically. AdSense is resubmitted after Phase 2 is live
and indexed.

## 6. Navigation

Content pages get a grouped header nav — TOOLS / REFERENCE / STATION —
replacing the flat `paper-nav`, built from the route manifest. The
console's `SiteFooter` may be extended with the new sections to preserve
a visible crawl path from `/` — see the exception in section 3. If it is
left untouched, the sitemap and the `<noscript>` list carry that role
instead.

## 7. Consent (CMP)

Google Funding Choices, enabled from the AdSense dashboard under Privacy
& messaging → European regulations. It is Google-certified and requires
no site code, since the AdSense loader is already present. Required for
EEA/UK/Swiss traffic.

## 8. Manual steps — owner, not implementable here

1. Deploy the rebuilt site.
2. Add the property in Google Search Console and verify it.
3. Submit `https://shortwaveradio.online/sitemap.xml`.
4. Request indexing for `/` and the main content routes.
5. Confirm pages are indexed before resubmitting to AdSense.
6. Enable Funding Choices in the AdSense dashboard.

Step 5 gates everything: AdSense will not approve a site that is not
indexed.

## 9. Verification

Each item is checked against the built output or the deployed site, not
assumed:

- `curl <site>/learn` contains the page's own `<title>` and body text.
- `curl <site>/robots.txt` returns `text/plain` with correct directives.
- `curl <site>/sitemap.xml` returns valid XML listing every route.
- `curl -o /dev/null -w "%{http_code}" <site>/nonexistent-xyz` returns 404.
- `404.html` contains no `adsbygoogle` reference.
- The console at `/` renders and behaves exactly as before; the relay
  connects, keying and decoding are unaffected.
- No hydration warnings in the browser console on any content route.

## 10. Risks

- **Hydration mismatch** on content routes. Mitigated by keeping content
  components pure and by the verification step above.
- **Build time and complexity** grow with the SSR pass. Contained to
  `scripts/prerender.mjs` and `src/entry-server.jsx`; the client build and
  the deployment artifact are unchanged.
- **Indexing latency.** Approval cannot proceed until Google indexes the
  site, which is outside our control and may take days to weeks.
- **`/` remains app-only.** Accepted deliberately. Mitigated by distinct
  metadata, JSON-LD, the `<noscript>` link path, and substantial linked
  content one click away.
