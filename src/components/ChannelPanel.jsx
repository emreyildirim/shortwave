import TuningKnob from './TuningKnob.jsx'
import ModeSwitch from './ModeSwitch.jsx'

export default function ChannelPanel({
  frequency,
  onFrequencyChange,
  callsign,
  onCallsignChange,
  signalStrength,
  earCopy,
  onEarCopyChange,
}) {
  const angle = -55 + signalStrength * 110

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
            <span className="lamp red"><span className="bulb" /></span>
            <span className="link-text">OFF AIR</span>
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

      </div>
    </aside>
  )
}
