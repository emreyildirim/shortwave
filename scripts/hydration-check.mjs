// Real-browser hydration check. Zero dependencies: drives the local Chrome
// over the DevTools Protocol using Node's built-in WebSocket.
//
// The static checks in verify.mjs prove the markup is deterministic. Only a
// browser can prove React actually hydrates it without a mismatch, which is
// the failure mode that would silently blank a prerendered page.
//
//   node scripts/hydration-check.mjs [baseUrl]

import { spawn } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.argv[2] || 'http://localhost:4173'
const PORT = 9333
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const { ROUTES } = await import(join(ROOT, 'dist-ssr', 'entry-server.js'))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu',
  '--user-data-dir=' + join(process.env.TMPDIR || '/tmp', 'shortwave-hydration-profile'),
  'about:blank',
], { stdio: 'ignore' })

const cleanup = () => { try { chrome.kill() } catch {} }
process.on('exit', cleanup); process.on('SIGINT', () => { cleanup(); process.exit(1) })

// wait for the debugging endpoint
let target
for (let i = 0; i < 50; i++) {
  await sleep(200)
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })
    if (r.ok) { target = await r.json(); break }
  } catch {}
}
if (!target) { cleanup(); throw new Error('Chrome did not expose a debugging endpoint') }

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let id = 0
const pending = new Map()
let events = []
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data)
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) }
  else if (msg.method) events.push(msg)
}
const send = (method, params = {}) =>
  new Promise((res) => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method, params })) })

await send('Runtime.enable')
await send('Log.enable')
await send('Page.enable')

const textOf = (e) => {
  if (e.method === 'Runtime.consoleAPICalled')
    return { level: e.params.type, text: (e.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ') }
  if (e.method === 'Runtime.exceptionThrown')
    return { level: 'exception', text: e.params.exceptionDetails?.exception?.description || e.params.exceptionDetails?.text || '' }
  if (e.method === 'Log.entryAdded')
    return { level: e.params.entry.level, text: e.params.entry.text }
  return null
}

const HYDRATION = /hydrat|did not match|server.rendered HTML|server HTML/i
const failures = []
let checked = 0

console.log(`\nHYDRATION — real Chrome against ${BASE}\n`)
for (const r of ROUTES) {
  events = []
  await send('Page.navigate', { url: BASE + (r.path === '/' ? '/' : r.path + '/') })
  // wait for load, then give React time to hydrate
  for (let i = 0; i < 40; i++) {
    await sleep(100)
    if (events.some((e) => e.method === 'Page.loadEventFired')) break
  }
  await sleep(700)

  const msgs = events.map(textOf).filter(Boolean)
  const hyd = msgs.filter((m) => HYDRATION.test(m.text))
  const errs = msgs.filter((m) =>
    (m.level === 'error' || m.level === 'exception') &&
    // the ad loader is blocked offline; that is not our bug
    !/googlesyndication|adsbygoogle|ERR_|favicon|fonts\.googleapis/i.test(m.text))

  // the page must actually have content after hydration
  const { result } = await send('Runtime.evaluate', {
    expression: 'document.getElementById("root")?.innerText.trim().length || 0',
    returnByValue: true,
  })
  const len = result?.result?.value ?? 0

  checked++
  if (hyd.length) failures.push([r.path, 'hydration mismatch: ' + hyd[0].text.slice(0, 160)])
  else if (errs.length) failures.push([r.path, 'console error: ' + errs[0].text.slice(0, 160)])
  else if (len < 40) failures.push([r.path, `root is empty after hydration (${len} chars)`])
  else console.log(`  ok   ${r.path}${' '.repeat(Math.max(0, 34 - r.path.length))} ${len} chars live`)
}

for (const [p, m] of failures) console.log(`  FAIL ${p} — ${m}`)
console.log(`\n${failures.length ? 'FAILED' : 'PASSED'} — ${checked - failures.length}/${checked} routes hydrate cleanly\n`)
ws.close(); cleanup()
process.exit(failures.length ? 1 : 0)
