# AdSense — what was fixed, and what you have to do by hand

## Why the site was rejected

Four things, all verified against the live site before any of this was
written:

1. **The site was not indexed by Google.** `site:shortwaveradio.online`
   returned nothing. AdSense cannot review a site it cannot find, so this
   alone was an automatic rejection.
2. **The content pages were invisible.** `curl .../learn` returned the
   console's `<title>`, the console's `<meta description>` and an empty
   `<div id="root">`. All five content pages served byte-identical HTML.
3. **`robots.txt` and `sitemap.xml` did not exist.** The nginx SPA fallback
   answered both with the HTML shell and a 200.
4. **Every nonexistent URL returned 200 with ad code on it.**
   `/gibberish-xyz` rendered the full console, ad slot included — an
   unbounded set of contentless URLs serving ads.

All four are fixed in the build. `npm run verify` checks each one and fails
the build if any regresses.

## What you still have to do — none of this can be done from the repo

### 1. Deploy

Nothing changed in the deployment shape. Coolify still builds the Docker
Compose resource; nginx still serves static files. The build now runs three
steps instead of one (client build → SSR build → prerender), which the
existing `npm run build` handles.

### 2. Google Search Console — this is the gate

AdSense will not approve a site that is not indexed. Do this **before**
resubmitting, and expect it to take days, not hours.

1. Go to <https://search.google.com/search-console> and add
   `shortwaveradio.online` as a **Domain** property (or URL-prefix if you
   cannot add the DNS TXT record).
2. Verify ownership — DNS TXT is easiest through your registrar.
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL Inspection** → paste `https://shortwaveradio.online/` → *Request
   indexing*. Repeat for `/learn`, `/morse-translator`, `/dispatches` and
   `/morse-code-chart`.
5. Wait. Check **Pages** until the indexed count is climbing. When
   `site:shortwaveradio.online` returns your pages, you are ready.

### 3. Resubmit to AdSense

Only once step 2 shows pages indexed. In AdSense → **Sites** → resubmit.

### 4. Turn on consent for EEA/UK traffic

Required for anyone serving Google ads to the EEA, UK or Switzerland. Google
Funding Choices is free, Google-certified, and needs no code — the AdSense
loader is already in the page.

AdSense → **Privacy & messaging** → **European regulations** → create the
message, pick your ad partners, publish.

> **This one is not optional bookkeeping.** `/privacy` now states that a
> consent message appears for EEA/UK/Swiss visitors and that the choice can
> be withdrawn. That sentence is only true once Funding Choices is published.
> Until you do it, the privacy policy describes something the site does not
> do — so either publish the message or remove that section.

### 5. Create the ad units and set the build variable

The ad slot currently renders a reserved empty frame. To go live, create an
ad unit in AdSense, then set the build variable in Coolify:

```
VITE_ADSENSE_SLOT_BOTTOM=<the slot id>
```

The publisher ID already defaults to the right value; override with
`VITE_ADSENSE_CLIENT` if it ever changes.

## Keeping it passing

`npm run check` = build + verify. Run it before any deploy. The suite fails
on a duplicate title, a missing canonical, an empty page, a thin dispatch
post, ad code reaching `404.html`, a broken internal link, or a component
whose markup would differ between server and client.

Adding a page means one entry in `src/routes.js` and one component in
`src/content/registry.jsx`. The sitemap, the nav and the prerenderer all
follow from the manifest.

## A note on what was deliberately not done

The usual advice for a "low value content" rejection is to add thirty blog
posts. Under Google's scaled content abuse policy that is now a liability
rather than a fix: the policy targets bulk pages that provide no real user
value and applies identically to AI-generated and human-written text.

So the content here is three working tools and a set of reference pages that
each answer a distinct question, plus an editorial board. The board has no
user accounts and no submissions — user-generated content would bring
moderation obligations and spam risk that a site this size cannot carry, and
the page states plainly that the meters are difficulty ratings rather than
votes. Nothing on the site fabricates engagement.
