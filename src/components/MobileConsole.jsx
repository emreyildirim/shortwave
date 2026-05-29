import { useCallback, useEffect, useRef } from 'react'
import SignalStream from './SignalStream.jsx'
import AdSlot from './AdSlot.jsx'
import { randomFrequency } from '../lib/identity.js'

const formatFreq = (kHz) => {
  const mhz = Math.floor(kHz / 1000)
  const rem = String(kHz % 1000).padStart(3, '0')
  return `${mhz}.${rem}`
}

// Tree-less, key-centric console for phones. Reuses the same channel + sim
// state as the desktop layout; only the presentation differs.
export default function MobileConsole({
  callsign,
  frequency,
  onFrequencyChange,
  channel,
  sim,
  mergedLog,
  wpm,
  earCopy,
  onEarCopyChange,
  notepad,
  onNotepadChange,
}) {
  const listening = channel.myRole === 'listener'
  const connected = channel.isConnected

  // Big telegraph key — press + global release safety (mouse & touch).
  const pressingRef = useRef(false)
  const down = useCallback((e) => {
    e.preventDefault()
    if (listening) return
    pressingRef.current = true
    sim.beginKey()
  }, [listening, sim])
  const up = useCallback(() => {
    if (!pressingRef.current) return
    pressingRef.current = false
    sim.endKey()
  }, [sim])
  useEffect(() => {
    const u = () => up()
    window.addEventListener('mouseup', u)
    window.addEventListener('touchend', u)
    window.addEventListener('blur', u)
    return () => {
      window.removeEventListener('mouseup', u)
      window.removeEventListener('touchend', u)
      window.removeEventListener('blur', u)
    }
  }, [up])

  const remote = channel.remote
  const rxKeying = Boolean(remote?.currentCode) || remote?.isKeying
  const recent = mergedLog.slice(-22).map((e) => e.letter).join('')
  const pendingCode = rxKeying ? remote.currentCode : sim.currentCode

  const statusLabel = {
    idle: 'OFF AIR', connecting: 'TUNING…', connected: 'ON AIR', error: 'NO RELAY',
  }[channel.status] || 'OFF AIR'

  const peerCount = channel.peers.length

  return (
    <div className="m-console">
      <header className="m-top">
        <div className="m-brand">SHORTWAVE</div>
        <div className="m-call">{callsign || 'UNKNOWN'}</div>
        <div className={`m-net ${connected ? 'on' : 'off'}`}>
          <span className="m-net-dot" />{statusLabel}
        </div>
      </header>

      <AdSlot variant="mobile-top" slot={import.meta.env?.VITE_ADSENSE_SLOT_TOP} />

      <section className="m-readout">
        <div className="m-readout-head">
          <span className={`m-role ${listening ? 'is-listen' : 'is-tx'}`}>
            {listening ? 'RX ONLY' : 'TX READY'}
          </span>
          <button className="m-freq-jump" onClick={() => onFrequencyChange(randomFrequency())} title="Scan to a new frequency">
            {formatFreq(frequency)} <span className="mhz">MHz</span> ↻
          </button>
        </div>
        <div className="m-mode-row">
          <button
            className={`m-mode ${earCopy ? 'on' : ''}`}
            onClick={() => onEarCopyChange(!earCopy)}
            aria-pressed={earCopy}
          >
            <span className="m-mode-dot" />
            {earCopy ? 'EAR-COPY' : 'ASSIST'}
          </button>
          <span className="m-mode-hint">
            {earCopy ? 'decoder off · transcribe by ear' : 'auto-decode on'}
          </span>
        </div>

        {earCopy ? (
          <textarea
            className="m-notepad"
            value={notepad}
            onChange={(e) => onNotepadChange(e.target.value)}
            placeholder="Transcribe what you hear…"
            spellCheck={false}
          />
        ) : (
          <>
            <div className="m-decoded">{recent || <span className="m-dim">— channel quiet —</span>}</div>
            <div className="m-pending">
              <span className="m-pending-tag">{rxKeying ? `RX ${remote.callsign || 'PEER'}` : 'TX'}</span>
              <span className="m-pending-code">{pendingCode}</span>
              <span className={`m-cursor ${sim.isKeying || rxKeying ? 'hot' : ''}`} />
            </div>
          </>
        )}
      </section>

      <button
        className={`m-key ${sim.isKeying ? 'pressed' : ''} ${listening ? 'locked' : ''}`}
        onMouseDown={down}
        onMouseUp={up}
        onMouseLeave={up}
        onTouchStart={down}
        onTouchEnd={up}
        disabled={listening}
        aria-label="Telegraph key"
      >
        {listening ? (
          <span className="m-key-locked">FREQUENCY FULL · LISTENING</span>
        ) : (
          <>
            <span className="m-key-cap" />
            <span className="m-key-hint">HOLD TO KEY · SHORT • · LONG ▬</span>
          </>
        )}
      </button>

      <div className="m-ticker">
        <SignalStream
          items={channel.streamItems}
          activeSign={remote?.activeSign}
          isKeying={remote?.isKeying}
          wpm={wpm}
          compact
        />
      </div>

      <footer className="m-foot">
        <div className="m-step">
          <button onClick={() => onFrequencyChange(Math.max(1800, frequency - 1))} aria-label="Down 1 kHz">–</button>
          <span className="m-step-val">{formatFreq(frequency)}</span>
          <button onClick={() => onFrequencyChange(Math.min(148000, frequency + 1))} aria-label="Up 1 kHz">+</button>
        </div>
        <div className="m-peers">
          {connected
            ? (peerCount ? `${peerCount} on freq` : 'alone on freq')
            : 'off the air'}
        </div>
      </footer>
    </div>
  )
}
