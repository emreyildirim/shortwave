import { useEffect, useRef } from 'react'

export default function MessageLog({
  log,
  currentCode,
  isKeying,
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

  const tail = log.slice(-30).map((e) => e.letter).join('')

  return (
    <section className="col log">
      <div className="col-label">
        {earCopy ? "OPERATOR'S NOTEPAD" : 'DECODED LOG'}
        <span className="meta">{earCopy ? 'EAR-COPY' : `N=${log.length}`}</span>
      </div>

      {earCopy ? (
        <Notepad value={notepad} onChange={onNotepadChange} />
      ) : (
        <>
          <div className="log-feed" ref={feedRef}>
            {log.length === 0 && (
              <div className="muted" style={{ padding: '8px 0' }}>
                — hold <kbd>SPACE</kbd> to transmit —
              </div>
            )}
            {log.slice(-80).map((e, i) => {
              const d = new Date(e.t)
              const t = `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`
              return (
                <div className="log-entry is-tx" key={`${e.t}-${i}`}>
                  <span className="time">{t}</span>
                  <span className="tag">TX</span>
                  <span className="msg">
                    <span className="ch">{e.letter}</span>
                    <span className="code">{e.code}</span>
                  </span>
                </div>
              )
            })}
          </div>

          <div className="transmission-banner is-tx">
            <span className="label">OPERATOR TRANSMITTING</span>
            <span className="done">{tail}</span>
            <span className="pending">{currentCode || ''}</span>
            <span className={`cursor ${isKeying ? 'hot' : ''}`} />
          </div>
        </>
      )}
    </section>
  )
}

function Notepad({ value, onChange }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.selectionStart === el.value.length) {
      el.scrollTop = el.scrollHeight
    }
  }, [value])

  return (
    <div className="notepad">
      <div className="notepad-header">
        <span className="np-stamp">OPERATOR'S LOG</span>
        <span className="np-meta">
          <span className="np-quiet">— channel quiet —</span>
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
