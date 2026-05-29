// Slim navigation strip on the console — links to the content pages, contact
// and source. Real <a href> targets so the pages are crawlable.

const CONTACT = '98yildirimemre@gmail.com'
const GITHUB = 'https://github.com/emreyildirim/shortwave'

export default function SiteFooter({ navigate, variant = 'desktop' }) {
  const go = (to) => (e) => { e.preventDefault(); navigate(to) }
  return (
    <nav className={`site-nav site-nav-${variant}`}>
      <a href="/learn" onClick={go('/learn')}>LEARN</a>
      <span className="sep">·</span>
      <a href="/history" onClick={go('/history')}>HISTORY</a>
      <span className="sep">·</span>
      <a href="/faq" onClick={go('/faq')}>FAQ</a>
      <span className="sep">·</span>
      <a href="/about" onClick={go('/about')}>ABOUT</a>
      <span className="sep">·</span>
      <a href="/privacy" onClick={go('/privacy')}>PRIVACY</a>
      <span className="sep">·</span>
      <a href={`mailto:${CONTACT}`}>CONTACT</a>
      <span className="sep">·</span>
      <a href={GITHUB} target="_blank" rel="noreferrer">GITHUB</a>
    </nav>
  )
}
