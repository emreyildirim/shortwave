import { useCallback, useEffect, useRef, useState } from 'react'

// Scroll speed in pixels per second. Slow tape feel.
const SPEED_PX_PER_S = 42
// Items further off the left than this many px get pruned visually.
const FADE_PX = 40

export default function SignalStream({
  items,
  activeSign,
  isKeying,
  wpm,
  onKeyDown,
  onKeyUp,
}) {
  // re-render at 60fps so each item's "right" offset advances continuously
  const [tick, setTick] = useState(() => performance.now())
  useEffect(() => {
    let raf
    const loop = (t) => {
      setTick(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const trackRef = useRef(null)
  const [trackW, setTrackW] = useState(800)
  useEffect(() => {
    if (!trackRef.current) return
    const measure = () => setTrackW(trackRef.current.getBoundingClientRect().width)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  // Press handling (mouse + global mouseup safety)
  const pressingRef = useRef(false)
  const handleDown = useCallback((e) => {
    e.preventDefault()
    pressingRef.current = true
    onKeyDown?.()
  }, [onKeyDown])
  const handleUp = useCallback(() => {
    if (!pressingRef.current) return
    pressingRef.current = false
    onKeyUp?.()
  }, [onKeyUp])
  useEffect(() => {
    const up = () => handleUp()
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    window.addEventListener('blur', up)
    return () => {
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
      window.removeEventListener('blur', up)
    }
  }, [handleUp])

  // Right-edge offset reserved for the keyer + a small gap so new items
  // don't appear ON TOP of the keyer.
  const RIGHT_INSET = 60

  // Compute each item's position. Items off the left edge are dropped.
  const positioned = items.map((it) => {
    const ageMs = tick - (it.tCreated || tick)
    const rightPx = RIGHT_INSET + (ageMs / 1000) * SPEED_PX_PER_S
    return { it, rightPx }
  }).filter(({ rightPx }) => rightPx < trackW + FADE_PX)

  return (
    <section className="signal-stream">
      <div className="stream-end">
        <span className="lbl">ETHER FEED</span>
        <span className="val">CW · 14.073</span>
      </div>

      <div className="stream-track" ref={trackRef}>
        {positioned.map(({ it, rightPx }) => {
          // fade out near the left edge
          const remaining = trackW - rightPx
          const fadeStart = 30
          const opacity = remaining < fadeStart ? Math.max(0, remaining / fadeStart) : 1
          return (
            <span
              key={it.id}
              className={`stream-item ${it.spacer ? 'spacer' : ''} ${it.invalid ? 'invalid' : ''}`}
              style={{ right: `${rightPx}px`, opacity }}
            >
              {it.spacer ? (
                <span className="code-glyph">/</span>
              ) : (
                <span className="code-glyph">{renderCode(it.code)}</span>
              )}
            </span>
          )
        })}

        {/* keyer pinned to the right edge */}
        <div className={`keyer mini stream-keyer ${activeSign ? 'on' : ''}`}>
          <span className="sign">
            {activeSign === '-' ? '▬' : activeSign === '.' ? '•' : ''}
          </span>
        </div>
      </div>

      <div className="op-key-wrap">
        <div className="op-key-hint">
          <span>HOLD <kbd>SPACE</kbd> OR CLICK</span>
          <span className="muted">SHORT = • · LONG = ▬</span>
        </div>
        <button
          className={`op-key ${isKeying ? 'pressed' : ''}`}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchEnd={handleUp}
          aria-label="Telegraph key"
        >
          <div className="op-key-base" />
          <div className="op-key-arm">
            <div className="op-key-knob" />
          </div>
        </button>
      </div>
    </section>
  )
}

function renderCode(code) {
  return code.split('').map((c, i) => (
    <span key={i} style={{ marginRight: 2 }}>
      {c === '-' ? '▬' : c === '.' ? '•' : c}
    </span>
  ))
}
