// Build-time prerenderer.
//
// Runs after the client build and the SSR build. For every route in the
// manifest it writes a real HTML file with that route's own <title>,
// description, canonical and structured data. Also emits sitemap.xml and a
// static 404.html that carries no ad code.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const { render, ROUTES, contentRoutes, ORIGIN, QA } =
  await import(join(ROOT, 'dist-ssr', 'entry-server.js'))

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function jsonLd(route) {
  const url = ORIGIN + route.path
  const base = { '@context': 'https://schema.org' }
  switch (route.jsonLd) {
    case 'WebApplication':
      return { ...base, '@type': 'WebApplication', name: 'Shortwave',
        url, applicationCategory: 'GameApplication',
        operatingSystem: 'Any browser', description: route.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }
    case 'FAQPage':
      return { ...base, '@type': 'FAQPage', mainEntity: QA.map(([q, a]) => ({
        '@type': 'Question', name: q,
        acceptedAnswer: { '@type': 'Answer', text: a } })) }
    case 'Blog':
      return { ...base, '@type': 'Blog', '@id': url, name: 'Shortwave Dispatches',
        url, description: route.description }
    case 'BlogPosting': {
      const d = route.dispatch
      return { ...base, '@type': 'BlogPosting', headline: d.title,
        description: d.summary, datePublished: d.date, dateModified: d.date,
        url, mainEntityOfPage: url, articleSection: d.flair,
        author: { '@type': 'Organization', name: 'Shortwave' },
        publisher: { '@type': 'Organization', name: 'Shortwave' } }
    }
    case 'Article':
      return { ...base, '@type': 'Article', headline: route.title.split(' | ')[0],
        description: route.description, url, mainEntityOfPage: url,
        author: { '@type': 'Organization', name: 'Shortwave' },
        publisher: { '@type': 'Organization', name: 'Shortwave' } }
    case 'HowTo':
      return { ...base, '@type': 'HowTo', name: 'How to learn Morse code',
        description: route.description, url }
    default:
      return null
  }
}

function buildHead(route) {
  const url = ORIGIN + route.path
  const ld = jsonLd(route)
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.kind === 'post' ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="Shortwave" />`,
    `<meta name="twitter:card" content="summary" />`,
  ]
  if (ld) tags.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`)
  return tags.map((t) => '    ' + t).join('\n')
}

function pageFor(route, body) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(route.description)}" />`)
    .replace('</head>', buildHead(route) + '\n  </head>')
  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return html
}

// — the console: head-only, plus a <noscript> crawl path —————————
const consoleRoute = ROUTES.find((r) => r.kind === 'app')
const navLinks = ROUTES.filter((r) => r.group !== 'none' && r.kind !== 'app')
  .map((r) => `<a href="${r.path}">${r.navLabel}</a>`).join(' · ')
const noscript =
  `<noscript><nav>${navLinks}` +
  ` · <a href="/privacy">PRIVACY</a> · <a href="/terms">TERMS</a></nav>` +
  `<p>Shortwave is an interactive Morse-code field radio and needs JavaScript. ` +
  `The reference pages linked above work without it.</p></noscript>`
writeFileSync(join(DIST, 'index.html'),
  pageFor(consoleRoute, null).replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`))
console.log('  /  (console, head + noscript)')

// — content routes ————————————————————————————————————————————
let n = 0
for (const route of contentRoutes()) {
  const body = render(route.path)
  if (!body) throw new Error(`prerender produced no markup for ${route.path}`)
  const dir = join(DIST, route.path.slice(1))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), pageFor(route, body))
  n++
}
console.log(`  ${n} content routes prerendered`)

// — sitemap ————————————————————————————————————————————————————
const today = new Date().toISOString().slice(0, 10)
writeFileSync(join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ROUTES.map((r) =>
    `  <url>\n    <loc>${ORIGIN}${r.path}</loc>\n` +
    `    <lastmod>${r.dispatch?.date || today}</lastmod>\n` +
    `    <changefreq>${r.changefreq}</changefreq>\n` +
    `    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`).join('\n') +
  `\n</urlset>\n`)
console.log(`  sitemap.xml (${ROUTES.length} urls)`)

// — 404: static, no JS bundle, no ad code —————————————————————
const cssHref = (template.match(/href="(\/assets\/[^"]+\.css)"/) || [])[1]
writeFileSync(join(DIST, '404.html'),
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>NO SIGNAL — 404 | Shortwave</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    ${cssHref ? `<link rel="stylesheet" href="${cssHref}" />` : ''}
  </head>
  <body>
    <div class="notfound">
      <p class="nf-code">404</p>
      <p class="nf-title">NO SIGNAL ON THIS FREQUENCY</p>
      <p class="nf-body">Nothing is transmitting here. The band may have shifted,
        or the address was mistyped.</p>
      <nav class="nf-nav">
        <a href="/">BACK TO THE KEY</a> ·
        <a href="/learn">LEARN MORSE</a> ·
        <a href="/dispatches">DISPATCHES</a> ·
        <a href="/faq">FAQ</a>
      </nav>
    </div>
  </body>
</html>
`)
console.log('  404.html (no ad code, no bundle)')
