import { useEffect, useRef } from 'react'

export default function MessageLog({
  log,
  currentCode,
  isKeying,
  remoteCode,
  remoteCallsign,
  earCopy,
  notepad,
  onNotepadChange,
}) {
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current && !earCopy) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [log.length, earCopy])

  const txTail = log.filter((e) => e.kind === 'tx').slice(-30).map((e) => e.letter).join('')

  return (
    <section className="col log">
      <div className="col-label">
        {earCopy ? "OPERATOR'S NOTEPAD" : 'DECODED LOG'}
        <span className="meta">
          {earCopy ? 'EAR-COPY' : `N=${log.length}`}
        </span>
      </div>

      {earCopy ? (
        <Notepad
          value={notepad}
          onChange={onNotepadChange}
          remoteCallsign={remoteCallsign}
          isRxKeying={Boolean(remoteCode)}
        />
      ) : (
        <>
          <div className="log-feed" ref={feedRef}>
            {log.length === 0 && (
              <div className="muted" style={{ padding: '8px 0' }}>
                — hold <kbd>SPACE</kbd> or click the key to transmit —
              </div>
            )}
            {log.slice(-80).map((e, i) => {
              const d = new Date(e.t)
              const t = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`
              const isRx = e.kind === 'rx'
              return (
                <div className={`log-entry ${isRx ? 'is-rx' : 'is-tx'}`} key={`${e.t}-${i}`}>
                  <span className="time">{t}</span>
                  <span className="tag">{isRx ? 'RX' : 'TX'}</span>
                  {isRx && <span className="from">{e.callsign || '???'}</span>}
                  <span className="msg">
                    <span className="ch">{e.letter}</span>
                    <span className="code">{e.code}</span>
                  </span>
                </div>
              )
            })}
          </div>

          <div className="transmission-banner is-tx">
            <span className="label">
              {remoteCode
                ? `RX · ${remoteCallsign || 'PEER'} TRANSMITTING`
                : 'OPERATOR TRANSMITTING'}
            </span>
            <span className="done">{txTail}</span>
            <span className="pending">{currentCode || ''}</span>
            <span className={`cursor ${isKeying ? 'hot' : ''}`} />
          </div>
        </>
      )}
    </section>
  )
}

function Notepad({ value, onChange, remoteCallsign, isRxKeying }) {
  const ref = useRef(null)

  // Auto-scroll to bottom as user types
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // only scroll if caret is at end
    if (el.selectionStart === el.value.length) {
      el.scrollTop = el.scrollHeight
    }
  }, [value])

  return (
    <div className="notepad">
      <div className="notepad-header">
        <span className="np-stamp">OPERATOR'S LOG</span>
        <span className="np-meta">
          {isRxKeying
            ? <span className="np-rx">● {remoteCallsign || 'PEER'} ON AIR</span>
            : <span className="np-quiet">— channel quiet —</span>}
        </span>
      </div>
      <textarea
        ref={ref}
        className="notepad-paper"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Transcribe what you hear…"
        spellCheck={false}
      />
      <div className="notepad-foot">
        <span>{value.length} chars · saved locally</span>
        <button
          type="button"
          className="np-clear"
          onClick={() => onChange('')}
          title="Clear pad"
        >CLEAR</button>
      </div>
    </div>
  )
}
