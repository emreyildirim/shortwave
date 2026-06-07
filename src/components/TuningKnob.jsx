import { useCallback, useEffect, useRef, useState } from 'react'

const FREQ_MIN_KHZ = 1800
const FREQ_MAX_KHZ = 148_000
const DRAG_SENSITIVITY = 0.18 // kHz per pixel of vertical drag

const formatMhz = (khz) => {
  const mhz = Math.floor(khz / 1000)
  const rem = String(khz % 1000).padStart(3, '0')
  return `${mhz}.${rem}`
}

export default function TuningKnob({ frequency, onChange }) {
  const dragRef = useRef({ active: false, startY: 0, startFreq: 0 })
  // draft holds the in-progress text while the readout is being edited; null = not editing
  const [draft, setDraft] = useState(null)

  const clamp = (v) => Math.min(FREQ_MAX_KHZ, Math.max(FREQ_MIN_KHZ, Math.round(v)))

  const beginDrag = useCallback((clientY) => {
    dragRef.current = { active: true, startY: clientY, startFreq: frequency }
    document.body.style.cursor = 'ns-resize'
  }, [frequency])

  const updateDrag = useCallback((clientY) => {
    if (!dragRef.current.active) return
    const dy = dragRef.current.startY - clientY
    const next = clamp(dragRef.current.startFreq + dy * DRAG_SENSITIVITY)
    if (next !== frequency) onChange(next)
  }, [frequency, onChange])

  const endDrag = useCallback(() => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    document.body.style.cursor = ''
  }, [])

  useEffect(() => {
    const onMove = (e) => updateDrag(e.clientY)
    const onUp = () => endDrag()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [updateDrag, endDrag])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const step = e.shiftKey ? 10 : 1
    onChange(clamp(frequency + (e.deltaY < 0 ? step : -step)))
  }, [frequency, onChange])

  // visual: knob rotates based on frequency position in the band
  const rangePct = (frequency - FREQ_MIN_KHZ) / (FREQ_MAX_KHZ - FREQ_MIN_KHZ)
  const knobRotation = -150 + rangePct * 300

  const onInputChange = (e) => {
    // accept digits and a single decimal point only — strips letters, signs,
    // scientific notation and any pasted non-numeric characters
    const cleaned = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    setDraft(cleaned)
  }

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') { e.currentTarget.blur(); return }
    // allow control/navigation keys; block everything that isn't a digit or '.'
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End']
    if (allowed.includes(e.key) || e.metaKey || e.ctrlKey) return
    if (!/^[0-9.]$/.test(e.key)) e.preventDefault()
    // only one decimal point
    if (e.key === '.' && e.currentTarget.value.includes('.')) e.preventDefault()
  }

  const commitDraft = () => {
    if (draft === null) return
    const mhz = parseFloat(draft)
    if (!Number.isNaN(mhz)) onChange(clamp(mhz * 1000))
    setDraft(null)
  }

  const readoutValue = draft !== null ? draft : formatMhz(frequency)

  return (
    <div className="tuner">
      <div className="tuner-readout">
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]*"
          className="tuner-input"
          value={readoutValue}
          onChange={onInputChange}
          onFocus={() => setDraft(formatMhz(frequency))}
          onBlur={commitDraft}
          onKeyDown={onInputKeyDown}
          aria-label="Frequency in MHz"
        />
        <span className="unit">MHz</span>
      </div>
      <div className="tuner-controls">
        <button
          type="button"
          className="freq-step"
          onMouseDown={(e) => { e.preventDefault(); onChange(clamp(frequency - 1)) }}
          aria-label="Step down 1 kHz"
        >–</button>
        <div
          className="tuner-knob"
          onMouseDown={(e) => { e.preventDefault(); beginDrag(e.clientY) }}
          onWheel={onWheel}
          role="slider"
          aria-label="Frequency tuning"
          aria-valuemin={FREQ_MIN_KHZ}
          aria-valuemax={FREQ_MAX_KHZ}
          aria-valuenow={frequency}
        >
          <div className="tuner-knob-inner" style={{ transform: `rotate(${knobRotation}deg)` }}>
            <div className="tuner-knob-marker" />
          </div>
          <div className="tuner-knob-ridges" />
        </div>
        <button
          type="button"
          className="freq-step"
          onMouseDown={(e) => { e.preventDefault(); onChange(clamp(frequency + 1)) }}
          aria-label="Step up 1 kHz"
        >+</button>
      </div>
      <div className="tuner-hint">DRAG · WHEEL · ± 1 kHz</div>
    </div>
  )
}
