import { useEffect, useState } from 'react'

const Antenna = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 3 L12 13" />
    <path d="M8 6 L12 3 L16 6" />
    <path d="M9 9 L12 7 L15 9" />
    <circle cx="12" cy="15" r="2" fill="currentColor" stroke="none" />
    <path d="M6 21 L18 21" strokeLinecap="round" />
    <path d="M9 18 L9 21" />
    <path d="M15 18 L15 21" />
  </svg>
)

const formatFreq = (kHz) => {
  const mhz = Math.floor(kHz / 1000)
  const rem = String(kHz % 1000).padStart(3, '0')
  return `${mhz}.${rem}`
}

export default function RadioPanel({
  activeSign,
  isKeying,
  frequency,
  callsign,
  connected,
  remoteKeying,
}) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hh = String(now.getUTCHours()).padStart(2, '0')
  const mm = String(now.getUTCMinutes()).padStart(2, '0')
  const ss = String(now.getUTCSeconds()).padStart(2, '0')

  return (
    <header className="top-panel">
      <div className="brand">
        <div className="seal">
          <Antenna />
        </div>
        <div className="title">
          <div className="name">SHORTWAVE</div>
          <div className="sub">Field Transmitter MK-IV · Property of Signal Corps</div>
        </div>
      </div>

      <div className="callsign">
        {callsign || 'UNKNOWN'}
        <span className="freq">{formatFreq(frequency)} MHz · CW · ANT-G/12</span>
      </div>

      <div className="indicators">
        <div className={`lamp on amber`}>
          <div className="bulb" />
          <div className="label">PWR</div>
        </div>
        <div className={`lamp ${activeSign ? 'on red' : ''}`}>
          <div className="bulb" />
          <div className="label">TX</div>
        </div>
        <div className={`lamp ${remoteKeying ? 'on green' : ''}`}>
          <div className="bulb" />
          <div className="label">RX</div>
        </div>
        <div className={`lamp ${isKeying ? 'on amber' : ''}`}>
          <div className="bulb" />
          <div className="label">KEY</div>
        </div>
        <div className={`lamp ${connected ? 'on green' : 'red blink'}`}>
          <div className="bulb" />
          <div className="label">NET</div>
        </div>
        <div style={{ marginLeft: 12, fontFamily: 'var(--font-crt)', fontSize: 20, color: 'var(--amber)', textShadow: '0 0 6px var(--amber-glow)', letterSpacing: '0.14em' }}>
          {hh}:{mm}:{ss}<span style={{ fontFamily: 'var(--font-stencil)', fontSize: 9, color: 'var(--paper-dim)', letterSpacing: '0.3em', display: 'block', textShadow: 'none', marginTop: 2, textAlign: 'right' }}>ZULU</span>
        </div>
      </div>
    </header>
  )
}
