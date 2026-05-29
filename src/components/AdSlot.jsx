import { useEffect, useRef } from 'react'

// Google AdSense banner slot.
//
// Activation (no code change needed beyond env):
//   1. Get an AdSense account + publisher ID (ca-pub-XXXXXXXXXXXXXXXX).
//   2. Create ad units and note their slot IDs.
//   3. Set build-time env vars (e.g. in Coolify build variables / .env):
//        VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
//        VITE_ADSENSE_SLOT_TOP=1234567890
//        VITE_ADSENSE_SLOT_BOTTOM=0987654321
//   When VITE_ADSENSE_CLIENT is present we load the AdSense loader and render a
//   real <ins class="adsbygoogle">. Until then we show a styled placeholder so
//   the layout reserves the exact same space (no shift when ads go live).

const CLIENT = import.meta.env?.VITE_ADSENSE_CLIENT || ''

let loaderInjected = false
function ensureAdSenseLoader(client) {
  if (loaderInjected || typeof document === 'undefined') return
  loaderInjected = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
  s.crossOrigin = 'anonymous'
  document.head.appendChild(s)
}

// As soon as a publisher ID is configured, load the AdSense snippet on every
// page load — this is what Google checks for site/account review, so approval
// works even while no ad units are rendered yet.
if (CLIENT) ensureAdSenseLoader(CLIENT)

export default function AdSlot({ slot, variant = 'desktop-bottom', label = 'SPONSORED TRANSMISSION' }) {
  const insRef = useRef(null)
  const live = Boolean(CLIENT && slot)

  useEffect(() => {
    if (!live) return
    ensureAdSenseLoader(CLIENT)
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [live])

  if (!live) {
    // No publisher ID yet: show the reserved slot only while developing so the
    // layout is visible; render nothing in production so visitors don't see a
    // fake placeholder before real ads are approved.
    if (!import.meta.env?.DEV) return null
    return (
      <div className={`ad-slot ad-${variant} ad-placeholder`} aria-hidden="true">
        <span className="ad-corner tl" /><span className="ad-corner tr" />
        <span className="ad-corner bl" /><span className="ad-corner br" />
        <span className="ad-label">{label}</span>
        <span className="ad-sub">ad slot · dev preview</span>
      </div>
    )
  }

  return (
    <div className={`ad-slot ad-${variant}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
