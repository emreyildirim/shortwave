import { useEffect, useState } from 'react'

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
          <img className="seal-logo" src="/favicon.svg" alt="Shortwave" width="28" height="28" />
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
