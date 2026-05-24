import TuningKnob from './TuningKnob.jsx'
import ModeSwitch from './ModeSwitch.jsx'

export default function ChannelPanel({
  frequency,
  onFrequencyChange,
  status,
  peers,
  callsign,
  onCallsignChange,
  signalStrength,
  isKeying,
  remote,
  earCopy,
  onEarCopyChange,
}) {
  const angle = -55 + signalStrength * 110

  const statusClass = {
    idle:       'lamp red',
    connecting: 'lamp amber blink',
    connected:  'lamp green',
    error:      'lamp red blink',
  }[status] || 'lamp red'
  const statusLabel = {
    idle:       'OFF AIR',
    connecting: 'TUNING…',
    connected:  'ON AIR',
    error:      'NO RELAY',
  }[status] || 'OFF AIR'

  return (
    <aside className="col">
      <div className="col-label">CHANNEL <span className="meta">PANEL B</span></div>
      <div className="instr-stack">

        <div className="gauge mode-gauge">
          <ModeSwitch earCopy={earCopy} onChange={onEarCopyChange} />
        </div>

        <div className="gauge">
          <div className="gauge-label">Operator</div>
          <input
            className="callsign-input"
            value={callsign}
            onChange={(e) => onCallsignChange(e.target.value.toUpperCase())}
            spellCheck={false}
            maxLength={16}
            aria-label="Operator callsign"
          />
          <div className="link-status">
            <span className={statusClass}><span className="bulb" /></span>
            <span className="link-text">{statusLabel}</span>
          </div>
        </div>

        <div className="gauge">
          <div className="gauge-label">Frequency</div>
          <TuningKnob frequency={frequency} onChange={onFrequencyChange} />
        </div>

        <div className="gauge">
          <div className="gauge-label">Signal Strength</div>
          <div className="s-meter">
            <div className="arc" />
            <div className="scale">
              <span>0</span><span>3</span><span>5</span><span>7</span><span>9+</span>
            </div>
            <div className="needle" style={{ transform: `rotate(${angle}deg)` }} />
            <div className="pivot" />
          </div>
        </div>

        <div className="gauge">
          <div className="gauge-label">On Frequency</div>
          {status !== 'connected' ? (
            <div className="muted small">— off the air —</div>
          ) : peers.length === 0 ? (
            <div className="muted small">— no other operators —</div>
          ) : (
            <ul className="peer-list">
              {peers.map((p) => {
                const active = remote?.peerId === p.id && remote?.isKeying
                return (
                  <li key={p.id} className={`peer-row ${active ? 'is-active' : ''}`}>
                    <span className={`peer-dot ${active ? 'pulse' : ''}`} />
                    <span className="peer-name">{p.callsign}</span>
                    <span className="peer-tag">RX</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

      </div>
    </aside>
  )
}
