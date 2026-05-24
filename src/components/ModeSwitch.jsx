// Hardware-style horizontal lever switch.
// LEFT position = ASSIST (default; decoder tree highlights paths,
// decoded log shows on the left).
// RIGHT position = EAR-COPY (operator's drill; tree freezes, log is
// replaced by a notepad — you transcribe what you hear by yourself).

export default function ModeSwitch({ earCopy, onChange }) {
  return (
    <div className="mode-switch">
      <div className="mode-switch-label">RECEIVE MODE</div>
      <button
        type="button"
        className={`mode-lever ${earCopy ? 'is-right' : 'is-left'}`}
        onClick={() => onChange(!earCopy)}
        aria-pressed={earCopy}
        title="Toggle ASSIST / EAR-COPY"
      >
        <span className={`mode-side left ${!earCopy ? 'active' : ''}`}>
          ASSIST
        </span>
        <span className="mode-track">
          <span className="mode-detent left-detent" />
          <span className="mode-detent right-detent" />
          <span className="mode-knob">
            <span className="mode-knob-cap" />
          </span>
        </span>
        <span className={`mode-side right ${earCopy ? 'active' : ''}`}>
          EAR-COPY
        </span>
      </button>
      <div className="mode-switch-hint">
        {earCopy
          ? 'tree frozen · transcribe by ear'
          : 'decoder lit · auto-transcribe'}
      </div>
    </div>
  )
}
