import { useEffect, useRef } from 'react'

export default function MessageLog({ log, currentCode, isKeying }) {
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [log.length])

  const tail = log.slice(-30).map((e) => e.letter).join('')

  return (
    <section className="col log">
      <div className="col-label">
        DECODED LOG
        <span className="meta">N={log.length}</span>
      </div>

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
    </section>
  )
}
