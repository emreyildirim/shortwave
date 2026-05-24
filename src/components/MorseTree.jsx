import { useMemo, useRef } from 'react'
import { NODES, LAYOUT, ROOT_POS, FROM_MORSE } from '../data/morse.js'

const Antenna = ({ active }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 26 L16 8" strokeLinecap="round" />
    <path d="M9 12 L16 6 L23 12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 16 L16 12 L21 16" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="6" r="1.8" fill="currentColor" stroke="none" />
    <path d="M10 28 L22 28" strokeLinecap="round" />
    {active && <circle cx="16" cy="6" r="4" fill="none" opacity="0.5" />}
  </svg>
)

const buildPathSet = (code) => {
  const out = new Set()
  if (!code) return out
  for (let i = 1; i <= code.length; i++) out.add(code.slice(0, i))
  return out
}

export default function MorseTree({ currentCode, activeSign }) {
  const localPath = useMemo(() => buildPathSet(currentCode), [currentCode])

  const lastLocalPos = useRef(ROOT_POS)
  const localSignalPos = resolvePos(currentCode, lastLocalPos)

  const connections = NODES.map((n) => ({
    from: n.parentPos,
    to: n.pos,
    code: n.code,
    onLocalPath: localPath.has(n.code),
    sign: n.lastSign,
  }))

  const letter = FROM_MORSE[currentCode]

  return (
    <section className="col tree-col">
      <div className="col-label">
        MORSE DECODER TREE <span className="meta">CHART INTL · 26 LET</span>
      </div>

      <div className="tree-stage">
        <div className="tree-caption">
          BRANCH KEY · <span className="brass">DASH</span> ◀ LEFT · DOT <span className="brass">RIGHT</span> ▶
          <span className="ser">SN-447/CW</span>
        </div>
        <div className="tree-meta">
          <span>BUFFER</span>
          <span className="code-now">{currentCode || '—'}</span>
        </div>

        <svg className="tree-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="0.7" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dim base connections */}
          {connections.map((c) => (
            <line
              key={`dim-${c.code}`}
              x1={c.from.x}
              y1={c.from.y}
              x2={c.to.x}
              y2={c.to.y}
              stroke="#c89858"
              strokeWidth="2"
              strokeOpacity={c.onLocalPath ? 0.22 : 0.95}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          ))}
          {/* Local (amber) hot path */}
          {connections.filter(c => c.onLocalPath).map((c) => (
            <line
              key={`tx-${c.code}`}
              x1={c.from.x}
              y1={c.from.y}
              x2={c.to.x}
              y2={c.to.y}
              stroke="#ffd34d"
              strokeWidth="2.8"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              filter="url(#lineGlow)"
            />
          ))}
        </svg>

        {/* Root antenna */}
        <div
          className={`antenna ${currentCode ? 'on' : ''}`}
          style={{ left: `${ROOT_POS.x}%`, top: `${ROOT_POS.y}%` }}
        >
          <Antenna active={!!currentCode} />
        </div>

        {/* Letter nodes */}
        {NODES.map((n) => {
          if (!n.letter) return null
          const isCurrent = !!currentCode && n.code === currentCode
          const onLocal = localPath.has(n.code)
          const shape = n.lastSign === '-' ? 'is-dash' : 'is-dot'
          const classes = ['node', shape]
          if (onLocal) classes.push('on-path')
          if (isCurrent) classes.push('is-current')
          return (
            <div
              key={n.code}
              className={classes.join(' ')}
              style={{ left: `${n.pos.x}%`, top: `${n.pos.y}%` }}
              title={`${n.letter}  ${n.code}`}
            >
              {n.letter}
            </div>
          )
        })}

        {/* Local traveling signal */}
        <div
          className={`signal-disk ${currentCode ? 'is-on' : ''}`}
          style={{ left: `${localSignalPos.x}%`, top: `${localSignalPos.y}%` }}
        />

        {/* Current letter at bottom */}
        <div className={`now-letter ${currentCode && letter ? '' : 'empty'}`}>
          {letter || (currentCode ? '?' : '·')}
          <span className="lbl">
            {currentCode
              ? (letter ? 'DECODED' : 'INCOMPLETE')
              : 'AWAITING SIGNAL'}
          </span>
        </div>
      </div>
    </section>
  )
}

function resolvePos(code, lastRef) {
  if (!code) return lastRef.current
  for (let len = code.length; len > 0; len--) {
    const prefix = code.slice(0, len)
    if (LAYOUT[prefix]) {
      lastRef.current = LAYOUT[prefix]
      return LAYOUT[prefix]
    }
  }
  return lastRef.current
}
