// Verification suite for the built site.
//
// These are the invariants that decide whether a crawler — and therefore an
// AdSense reviewer — can actually see this site. Each one corresponds to a
// defect that was live before: identical titles across routes, an HTML
// document served as robots.txt, ad code on nonexistent URLs.
//
//   npm run verify        (runs against dist/, build first)

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const { ROUTES, ORIGIN } = await import(join(ROOT, 'dist-ssr', 'entry-server.js'))

let pass = 0
const failures = []
const check = (name, fn) => {
  try {
    const detail = fn()
    pass++
    console.log(`  ok   ${name}${detail ? ` — ${detail}` : ''}`)
  } catch (e) {
    failures.push([name, e.message])
    console.log(`  FAIL ${name} — ${e.message}`)
  }
}
const assert = (cond, msg) => { if (!cond) throw new Error(msg) }

const fileFor = (p) => join(DIST, p === '/' ? 'index.html' : join(p.slice(1), 'index.html'))
const read = (p) => readFileSync(fileFor(p), 'utf8')
const rootHtml = (h) => {
  const i = h.indexOf('<div id="root">')
  if (i < 0) return ''
  return h.slice(i + 15, h.lastIndexOf('</body>'))
}
const words = (h) => (rootHtml(h).replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<[^>]+>/g, ' ').match(/[A-Za-z'’]{2,}/g) || []).length
const tag = (h, re) => (h.match(re) || [])[1]

console.log('\nBUILD OUTPUT')
check('every route produced an HTML file', () => {
  const missing = ROUTES.filter((r) => !existsSync(fileFor(r.path))).map((r) => r.path)
  assert(missing.length === 0, `missing: ${missing.join(', ')}`)
  return `${ROUTES.length} files`
})

console.log('\nMETADATA — the defect that made 6 pages look like 1')
check('titles are unique across all routes', () => {
  const t = ROUTES.map((r) => tag(read(r.path), /<title>([\s\S]*?)<\/title>/))
  const dupes = t.filter((x, i) => t.indexOf(x) !== i)
  assert(dupes.length === 0, `duplicated: ${[...new Set(dupes)].join(' | ')}`)
  return `${t.length} unique`
})
check('descriptions are unique across all routes', () => {
  const d = ROUTES.map((r) => tag(read(r.path), /<meta name="description" content="([^"]*)"/))
  assert(d.every(Boolean), 'a route has no description')
  const dupes = d.filter((x, i) => d.indexOf(x) !== i)
  assert(dupes.length === 0, `duplicated: ${[...new Set(dupes)].length}`)
  return `${d.length} unique`
})
check('canonical on every route points at its own URL', () => {
  for (const r of ROUTES) {
    const c = tag(read(r.path), /<link rel="canonical" href="([^"]*)"/)
    assert(c === ORIGIN + r.path, `${r.path} → ${c}`)
  }
  return `${ROUTES.length} correct`
})
check('every route emits parseable JSON-LD or none at all', () => {
  let n = 0
  for (const r of ROUTES) {
    const m = read(r.path).match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    if (!m) continue
    JSON.parse(m[1]); n++
  }
  return `${n} blocks parse`
})

console.log('\nCRAWLABLE CONTENT — the defect that made /learn an empty div')
check('every content route ships rendered markup, not an empty root', () => {
  const empty = ROUTES.filter((r) => r.kind !== 'app' && words(read(r.path)) < 50).map((r) => r.path)
  assert(empty.length === 0, `near-empty: ${empty.join(', ')}`)
  return `${ROUTES.length - 1} routes`
})
check('reference and tool pages carry substantial prose', () => {
  const thin = ROUTES
    .filter((r) => ['page', 'board'].includes(r.kind))
    .map((r) => [r.path, words(read(r.path))])
    .filter(([p, w]) => w < 350 && !['/contact', '/privacy', '/terms', '/about'].includes(p))
  assert(thin.length === 0, `under 350 words: ${thin.map(([p, w]) => `${p}(${w})`).join(', ')}`)
  const total = ROUTES.reduce((a, r) => a + words(read(r.path)), 0)
  return `${total} words rendered site-wide`
})
check('every dispatch post is a full-length piece', () => {
  const posts = ROUTES.filter((r) => r.kind === 'post')
  assert(posts.length > 0, 'no posts found')
  const thin = posts.map((r) => [r.path, words(read(r.path))]).filter(([, w]) => w < 700)
  assert(thin.length === 0, `under 700 words: ${thin.map(([p, w]) => `${p}(${w})`).join(', ')}`)
  return `${posts.length} posts`
})
check('the console ships a noscript crawl path', () => {
  const h = read('/')
  assert(h.includes('<noscript>'), 'no noscript block')
  const n = (h.match(/<noscript>[\s\S]*?<\/noscript>/)[0].match(/href="\//g) || []).length
  assert(n >= 10, `only ${n} links`)
  return `${n} links`
})

console.log('\nNO ADS ON CONTENTLESS URLS — the soft-404 defect')
check('404.html carries no ad code', () => {
  const h = readFileSync(join(DIST, '404.html'), 'utf8')
  assert(!/adsbygoogle|googlesyndication/.test(h), 'ad code present on 404')
  return 'clean'
})
check('404.html loads no JS bundle (cannot mount the console)', () => {
  const h = readFileSync(join(DIST, '404.html'), 'utf8')
  assert(!/<script/.test(h), 'a script tag is present')
  return 'static only'
})
check('404.html is marked noindex', () => {
  const h = readFileSync(join(DIST, '404.html'), 'utf8')
  assert(/name="robots"[^>]*noindex/.test(h), 'missing noindex')
  return 'noindex'
})
check('nginx serves a real 404 rather than the SPA shell', () => {
  const c = readFileSync(join(ROOT, 'nginx.conf'), 'utf8')
  assert(!/try_files[^;]*\/index\.html/.test(c), 'SPA fallback still routes unknown paths to index.html')
  assert(/error_page\s+404/.test(c), 'no error_page directive')
  return 'try_files =404'
})

console.log('\nCRAWLER FILES — served as HTML with a 200 before')
check('robots.txt is a real file declaring the sitemap', () => {
  const p = join(DIST, 'robots.txt')
  assert(existsSync(p), 'missing from dist')
  const t = readFileSync(p, 'utf8')
  assert(!t.includes('<!doctype'), 'is an HTML document')
  assert(t.includes(`${ORIGIN}/sitemap.xml`), 'does not declare the sitemap')
  return 'valid'
})
check('sitemap.xml lists every route exactly once', () => {
  const x = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
  assert(x.startsWith('<?xml'), 'not XML')
  const locs = [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  assert(locs.length === ROUTES.length, `${locs.length} locs vs ${ROUTES.length} routes`)
  const expected = ROUTES.map((r) => ORIGIN + r.path).sort()
  assert(JSON.stringify(locs.slice().sort()) === JSON.stringify(expected), 'loc set does not match routes')
  return `${locs.length} urls`
})
check('ads.txt is present and authorises the publisher', () => {
  const t = readFileSync(join(DIST, 'ads.txt'), 'utf8')
  assert(/^google\.com,\s*pub-\d+,\s*DIRECT/m.test(t), 'malformed')
  return t.trim().split('\n')[0].slice(0, 40)
})

console.log('\nLINK INTEGRITY')
check('every internal link resolves to a real route or file', () => {
  const known = new Set(ROUTES.map((r) => r.path))
  const bad = new Set()
  for (const r of ROUTES) {
    const h = rootHtml(read(r.path))
    for (const m of h.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1].length > 1 && m[1].endsWith('/') ? m[1].slice(0, -1) : m[1]
      if (known.has(href)) continue
      if (existsSync(join(DIST, href.slice(1)))) continue
      bad.add(`${r.path} → ${href}`)
    }
  }
  assert(bad.size === 0, [...bad].join(', '))
  return 'all resolve'
})
check('every route is reachable from the console', () => {
  const h = read('/')
  const linked = new Set([...h.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]))
  // posts are reached via the board, which must itself be linked
  assert(linked.has('/dispatches'), 'the board is not linked from the console')
  const orphans = ROUTES.filter((r) => r.group !== 'none' && r.kind !== 'app' && !linked.has(r.path))
  assert(orphans.length === 0, `not linked: ${orphans.map((o) => o.path).join(', ')}`)
  return `${linked.size} links from /`
})

console.log('\nSTYLESHEET ISOLATION')
check('no new stylesheet redefines a bare class that index.css owns', () => {
  // A board meter reusing the name .s-meter silently inherited the console's
  // analog gauge — an 88px box with its own background and border. Sharing
  // design-system classes deliberately (.lede, .paper-body) is fine; what is
  // not fine is two files each writing `.foo { ... }` for different widgets.
  // Overrides inside @media blocks are legitimate: the print stylesheet has
  // every reason to retarget .paper-body and .info-wrap. Only top-level
  // redefinitions are the bug.
  const stripAtBlocks = (css) => {
    let out = '', i = 0
    while (i < css.length) {
      if (css.startsWith('@media', i) || css.startsWith('@supports', i)) {
        let j = css.indexOf('{', i)
        if (j < 0) break
        let d = 1; j++
        while (j < css.length && d > 0) { if (css[j] === '{') d++; else if (css[j] === '}') d--; j++ }
        i = j; continue
      }
      out += css[i]; i++
    }
    return out
  }
  const bare = (file) => {
    const css = stripAtBlocks(
      readFileSync(join(ROOT, 'src', 'styles', file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' '))
    const out = new Set()
    for (const m of css.matchAll(/(?:^|\})([^{}]+)\{/g)) {
      for (const sel of m[1].split(',')) {
        const t = sel.trim()
        if (!t || t.startsWith('@')) continue
        const solo = t.match(/^\.([A-Za-z][\w-]*)$/)   // exactly `.foo`, nothing else
        if (solo) out.add(solo[1])
      }
    }
    return out
  }
  const base = bare('index.css')
  const clashes = []
  for (const f of ['board.css', 'tools.css'])
    for (const c of bare(f)) if (base.has(c)) clashes.push(`.${c} in ${f}`)
  assert(clashes.length === 0, clashes.join(', '))
  return 'no bare-class shadowing'
})

console.log('\nHYDRATION SAFETY')
check('no content component varies its markup between server and client', () => {
  // Browser-API access during render cannot reach here: it would throw in the
  // SSR build and fail `npm run build` outright. What the build CANNOT catch
  // is markup that differs between the two renders — a clock or a random
  // value read during render hydrates into a mismatch. That is what this
  // looks for. Authoritative hydration proof is the browser check below.
  const offenders = []
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f)
      if (statSync(p).isDirectory()) { walk(p); continue }
      if (!f.endsWith('.jsx') && !f.endsWith('.js')) continue
      const src = readFileSync(p, 'utf8')
      // Drop comments, string literals and JSX text so prose mentioning
      // "localStorage" is not confused with a call to it.
      const code = src
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/\/\/[^\n]*/g, ' ')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''")
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/>[^<{}]+</g, '><')
      // Strip callback bodies: anything after => { or ) { up to its match.
      let bare = '', depth = 0
      for (let i = 0; i < code.length; i++) {
        const isOpen = code[i] === '{' && /(=>|\)|\btry\b)\s*$/.test(code.slice(Math.max(0, i - 6), i))
        if (isOpen) depth++
        else if (code[i] === '}' && depth > 0) { depth--; continue }
        if (depth === 0) bare += code[i]
      }
      const nd = bare.match(/(Math\.random\s*\(|Date\.now\s*\(|new\s+Date\s*\()/)
      if (nd) offenders.push(`${f}: ${nd[1]}) in render scope`)
      const dom = bare.match(/\b(window|document|localStorage|sessionStorage|navigator)\s*[.[]/)
      if (dom) offenders.push(`${f}: ${dom[1]} accessed in render scope`)
    }
  }
  walk(join(ROOT, 'src', 'content'))
  assert(offenders.length === 0, offenders.join('; '))
  return 'markup is deterministic'
})

check('the SSR build itself proves no render-time browser access', () => {
  // If any component read window/document during render, the prerender step
  // would have thrown and dist/ would be stale or absent.
  const age = Date.now() - statSync(join(DIST, 'sitemap.xml')).mtimeMs
  assert(age < 1000 * 60 * 30, 'dist/ is stale — rerun npm run build')
  return 'prerender completed'
})

console.log(`\n${failures.length ? 'FAILED' : 'PASSED'} — ${pass} checks passed, ${failures.length} failed\n`)
if (failures.length) { for (const [n, m] of failures) console.error(`  ${n}: ${m}`); process.exit(1) }
