// Slim navigation strip on the console. Built from the route manifest so it
// cannot fall out of step with what actually exists. Real <a href> targets,
// so this doubles as the crawl path from the console into the content.

import { navGroups } from '../routes.js'
import { CONTACT, GITHUB } from '../content/shared.jsx'

export default function SiteFooter({ navigate, variant = 'desktop' }) {
  const go = (to) => (e) => {
    if (!navigate) return
    e.preventDefault()
    navigate(to)
  }
  const groups = navGroups()

  return (
    <nav className={`site-nav site-nav-${variant}`} aria-label="Site sections">
      {groups.map((g, gi) => (
        <span className="nav-group" key={g.id}>
          {g.items.map((r, i) => (
            <span key={r.path}>
              {i > 0 ? <span className="sep">·</span> : null}
              <a href={r.path} onClick={go(r.path)}>{r.navLabel}</a>
            </span>
          ))}
          {gi < groups.length - 1 ? <span className="sep bar">|</span> : null}
        </span>
      ))}
      <span className="sep bar">|</span>
      <a href="/privacy" onClick={go('/privacy')}>PRIVACY</a>
      <span className="sep">·</span>
      <a href="/terms" onClick={go('/terms')}>TERMS</a>
      <span className="sep">·</span>
      <a href={`mailto:${CONTACT}`}>MAIL</a>
      <span className="sep">·</span>
      <a href={GITHUB} target="_blank" rel="noreferrer">GITHUB</a>
    </nav>
  )
}
