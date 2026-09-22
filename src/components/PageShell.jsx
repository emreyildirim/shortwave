// The frame every non-console page renders inside: masthead, grouped
// directory nav, the page body, and the footer. Pure — safe to prerender.

import AdSlot from './AdSlot.jsx'
import { navGroups, byPath } from '../routes.js'
import { componentFor } from '../content/registry.jsx'
import { CONTACT, GITHUB } from '../content/shared.jsx'

const FILE_LABEL = {
  '/about': 'FILE 01 · STATION LOG',
  '/privacy': 'FILE 02 · PRIVACY',
  '/learn': 'FILE 03 · CW PRIMER',
  '/history': 'FILE 04 · DISPATCHES',
  '/faq': 'FILE 05 · Q & A',
  '/terms': 'FILE 06 · TERMS',
  '/contact': 'FILE 07 · TRAFFIC',
  '/prosigns': 'FILE 08 · PROSIGNS',
  '/q-codes': 'FILE 09 · Q CODES',
  '/phonetic-alphabet': 'FILE 10 · PHONETICS',
  '/famous-messages': 'FILE 11 · SIGNALS',
  '/morse-code-chart': 'INSTRUMENT · CHART',
  '/morse-translator': 'INSTRUMENT · TRANSLATOR',
  '/morse-trainer': 'INSTRUMENT · TRAINER',
  '/dispatches': 'THE BOARD',
}

const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-')
  const MON = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  return `${d} ${MON[Number(m) - 1]} ${y}`
}

// Difficulty badge. Reports how demanding a piece is — never a vote count.
// Deliberately NOT called s-meter: index.css already owns that name for the
// console's analog signal-strength gauge, which is 88px tall with its own
// background and border.
export function LevelMeter({ level }) {
  return (
    <span className={`level-meter level-${level}`}
          title={['', 'Entry level', 'Intermediate', 'Deep'][level]}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={i <= level ? 'lm-bar on' : 'lm-bar'} />
      ))}
      <span className="lm-label">S{level * 3}</span>
    </span>
  )
}

function DirectoryNav({ go, current }) {
  return (
    <nav className="directory" aria-label="Site sections">
      {navGroups().map((g) => (
        <div className="dir-col" key={g.id}>
          <span className="dir-head">{g.label}</span>
          <ul>
            {g.items.map((r) => (
              <li key={r.path}>
                <a
                  href={r.path}
                  onClick={go(r.path)}
                  className={r.path === current ? 'is-current' : undefined}
                  aria-current={r.path === current ? 'page' : undefined}
                >
                  {r.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function PageShell({ path, navigate }) {
  const route = byPath(path)
  const Body = componentFor(route?.path)
  const go = (to) => (e) => {
    if (!navigate) return
    e.preventDefault()
    navigate(to)
  }
  if (!route || !Body) return null

  const post = route.dispatch
  const wide = route.kind === 'board' || route.path === '/morse-code-chart'

  return (
    <div className="info-wrap">
      <header className="masthead">
        <a href="/" onClick={go('/')} className="mast-brand">
          <span className="mast-mark">SHORTWAVE</span>
          <span className="mast-sub">STATION K6-Z</span>
        </a>
        <a href="/" onClick={go('/')} className="mast-back">⟵ BACK TO THE KEY</a>
      </header>

      <DirectoryNav go={go} current={route.path} />

      <article className={`paper-sheet${wide ? ' paper-wide' : ''}`}>
        <div className="paper-head">
          <span className="paper-stamp">SHORTWAVE</span>
          <span className="paper-file">{FILE_LABEL[route.path] || 'DISPATCH'}</span>
        </div>

        {post ? (
          <div className="post-head">
            <div className="post-meta-row">
              <span className={`flair flair-${post.flair.toLowerCase()}`}>{post.flair}</span>
              <LevelMeter level={post.level} />
              <span className="post-dot">·</span>
              <time dateTime={post.date}>{fmtDate(post.date)}</time>
              <span className="post-dot">·</span>
              <span>{post.readMin} MIN COPY</span>
            </div>
            <h1>{post.title}</h1>
            <p className="lede">{post.summary}</p>
            <p className="byline">Filed by the station operator</p>
          </div>
        ) : null}

        <div className="paper-body">
          <Body />
        </div>

        <footer className="paper-foot">
          {post ? (
            <a href="/dispatches" onClick={go('/dispatches')} className="paper-link">
              ⟵ ALL DISPATCHES
            </a>
          ) : (
            <a href="/" onClick={go('/')} className="paper-link">⟵ BACK TO STATION</a>
          )}
          <nav className="paper-nav">
            <a href="/about" onClick={go('/about')}>ABOUT</a>
            <span className="sep">·</span>
            <a href="/contact" onClick={go('/contact')}>CONTACT</a>
            <span className="sep">·</span>
            <a href="/privacy" onClick={go('/privacy')}>PRIVACY</a>
            <span className="sep">·</span>
            <a href="/terms" onClick={go('/terms')}>TERMS</a>
            <span className="sep">·</span>
            <a href={GITHUB} target="_blank" rel="noreferrer">GITHUB</a>
          </nav>
        </footer>
      </article>

      <div className="info-ad">
        <AdSlot variant="desktop-bottom" slot={import.meta.env?.VITE_ADSENSE_SLOT_BOTTOM} />
      </div>

      <p className="colophon">
        Shortwave is a free, open-source field-radio simulator. Corrections to
        any reference page are welcome at{' '}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    </div>
  )
}
