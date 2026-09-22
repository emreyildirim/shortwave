import { useEffect, useRef, useState } from 'react'
import { MORSE } from '../data/morse.js'
import { Code, DIGITS, PUNCTUATION } from './shared.jsx'

const CODE = { ...MORSE, ...DIGITS, ...PUNCTUATION }

// Ludwig Koch's ordering as it is normally taught today: K and M first
// because they are opposites at the same length, then a sequence chosen so
// each new character is hard to confuse with the ones already learned.
const KOCH = [
  'K', 'M', 'R', 'S', 'U', 'A', 'P', 'T', 'L', 'O', 'W', 'I', '.', 'N', 'J',
  'E', 'F', '0', 'Y', ',', 'V', 'G', '5', '/', 'Q', '9', 'Z', 'H', '3', '8',
  'B', '?', '4', '2', '7', 'C', '1', 'D', '6', 'X',
]

const STORE_KEY = 'shortwave.trainer.v1'
const TONE_HZ = 620
const GROUPS = 5
const GROUP_LEN = 5
const PASS = 0.9

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))
const strip = (s) => String(s).toUpperCase().replace(/\s+/g, '')

// ARRL / Jon Bloom KE3Z Farnsworth timing. Characters are sent at the full
// character speed; the extra time needed to hit the slower effective speed
// is pushed entirely into the gaps, in the 3:7 ratio the code uses.
function spacing(charWpm, effWpm) {
  const c = charWpm
  const s = Math.min(effWpm, charWpm)
  const unit = 1200 / c
  const ta = (60 * c - 37.2 * s) / (c * s) // seconds of space per PARIS word
  return {
    unit,
    letterGap: Math.max(unit * 3, (3 * ta) / 19 * 1000),
    wordGap: Math.max(unit * 7, (7 * ta) / 19 * 1000),
  }
}

function timeline(text, charWpm, effWpm) {
  const { unit, letterGap, wordGap } = spacing(charWpm, effWpm)
  const els = []
  let pendingGap = 0
  for (const ch of String(text)) {
    if (ch === ' ') { pendingGap = wordGap; continue }
    const code = CODE[ch]
    if (!code) continue
    if (els.length) els.push({ on: false, ms: pendingGap || letterGap })
    pendingGap = 0
    code.split('').forEach((sym, i) => {
      if (i) els.push({ on: false, ms: unit })
      els.push({ on: true, ms: sym === '-' ? unit * 3 : unit })
    })
  }
  return els
}

function makeRound(set) {
  const out = []
  for (let g = 0; g < GROUPS; g++) {
    let group = ''
    for (let i = 0; i < GROUP_LEN; i++) {
      group += set[Math.floor(Math.random() * set.length)]
    }
    out.push(group)
  }
  return out.join(' ')
}

export default function MorseTrainer() {
  // Every initial value is a constant: this component is prerendered, and
  // saved progress is read from localStorage in an effect after hydration.
  const [level, setLevel] = useState(2)
  const [charWpm, setCharWpm] = useState(20)
  const [effWpm, setEffWpm] = useState(10)
  const [stats, setStats] = useState({})
  const [loaded, setLoaded] = useState(false)

  const [phase, setPhase] = useState('idle') // idle | sending | copy | scored
  const [target, setTarget] = useState('')
  const [typed, setTyped] = useState('')
  const [lastAcc, setLastAcc] = useState(null)
  const [rounds, setRounds] = useState(0)
  const [accSum, setAccSum] = useState(0)
  const [unlocked, setUnlocked] = useState('')
  const [progress, setProgress] = useState(0)
  const [armReset, setArmReset] = useState(false)

  const ctxRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)
  const rafRef = useRef(null)
  const endRef = useRef(null)
  const startRef = useRef(0)
  const spanRef = useRef(0)
  const inputRef = useRef(null)

  const set = KOCH.slice(0, level)
  const { unit, letterGap } = spacing(charWpm, effWpm)

  // ── persistence (effects only) ─────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (d && typeof d === 'object') {
          if (typeof d.level === 'number') setLevel(clamp(Math.round(d.level), 2, KOCH.length))
          if (typeof d.charWpm === 'number') setCharWpm(clamp(Math.round(d.charWpm), 15, 30))
          if (typeof d.effWpm === 'number') setEffWpm(clamp(Math.round(d.effWpm), 5, 30))
          if (d.stats && typeof d.stats === 'object') setStats(d.stats)
        }
      }
    } catch { /* private mode, or corrupt entry — start fresh */ }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ level, charWpm, effWpm, stats }))
    } catch { /* storage full or blocked — progress stays in memory */ }
  }, [loaded, level, charWpm, effWpm, stats])

  // ── audio ──────────────────────────────────────────────────────────
  const ensureCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      ctxRef.current = new AC()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume().catch(() => {})
    return ctxRef.current
  }

  const hardStop = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    if (endRef.current) { clearTimeout(endRef.current); endRef.current = null }
    const ctx = ctxRef.current
    if (ctx && gainRef.current) {
      const t = ctx.currentTime
      gainRef.current.gain.cancelScheduledValues(t)
      gainRef.current.gain.setValueAtTime(0, t)
    }
    if (oscRef.current) {
      try { oscRef.current.stop() } catch { /* already stopped */ }
      oscRef.current = null
    }
    gainRef.current = null
  }

  const send = (text) => {
    hardStop()
    const els = timeline(text, charWpm, effWpm)
    if (!els.length) return
    const ctx = ensureCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = TONE_HZ
    const gain = ctx.createGain()
    gain.gain.value = 0
    osc.connect(gain).connect(ctx.destination)

    const t0 = ctx.currentTime + 0.4 // a beat to get the pencil ready
    let t = t0
    for (const el of els) {
      const dur = el.ms / 1000
      if (el.on) {
        const edge = Math.min(0.006, dur / 4)
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.18, t + edge)
        gain.gain.setValueAtTime(0.18, t + dur - edge)
        gain.gain.linearRampToValueAtTime(0, t + dur)
      }
      t += dur
    }
    osc.start(t0)
    osc.stop(t + 0.05)

    oscRef.current = osc
    gainRef.current = gain
    startRef.current = t0
    spanRef.current = (t - t0) * 1000
    setPhase('sending')
    setProgress(0)

    const tick = () => {
      const c = ctxRef.current
      if (!c) return
      const elapsed = (c.currentTime - startRef.current) * 1000
      setProgress(clamp(elapsed / spanRef.current, 0, 1))
      if (elapsed < spanRef.current) rafRef.current = requestAnimationFrame(tick)
      else rafRef.current = null
    }
    rafRef.current = requestAnimationFrame(tick)

    endRef.current = setTimeout(() => {
      endRef.current = null
      setProgress(0)
      setPhase((p) => (p === 'sending' ? 'copy' : p))
    }, spanRef.current + 500)
  }

  useEffect(() => () => {
    hardStop()
    if (ctxRef.current) { try { ctxRef.current.close() } catch { /* closed */ } }
  }, [])

  // ── round flow ─────────────────────────────────────────────────────
  const startRound = () => {
    const next = makeRound(set)
    setTarget(next)
    setTyped('')
    setLastAcc(null)
    setUnlocked('')
    setArmReset(false)
    send(next)
    if (inputRef.current) inputRef.current.focus()
  }

  const replay = () => { if (target) send(target) }

  const stopSending = () => {
    hardStop()
    setProgress(0)
    setPhase(target ? 'copy' : 'idle')
  }

  const check = () => {
    hardStop()
    setProgress(0)
    const want = strip(target)
    const got = strip(typed)
    if (!want.length) return

    let hits = 0
    const nextStats = { ...stats }
    for (let i = 0; i < want.length; i++) {
      const ch = want[i]
      const ok = got[i] === ch
      if (ok) hits++
      const s = nextStats[ch] || { hit: 0, tot: 0 }
      nextStats[ch] = { hit: s.hit + (ok ? 1 : 0), tot: s.tot + 1 }
    }
    const acc = hits / want.length

    setStats(nextStats)
    setLastAcc(acc)
    setRounds((n) => n + 1)
    setAccSum((n) => n + acc)
    setPhase('scored')

    if (acc >= PASS && level < KOCH.length) {
      setUnlocked(KOCH[level])
      setLevel(level + 1)
    }
  }

  const resetProgress = () => {
    if (!armReset) { setArmReset(true); return }
    hardStop()
    setArmReset(false)
    setLevel(2)
    setStats({})
    setTarget('')
    setTyped('')
    setLastAcc(null)
    setUnlocked('')
    setRounds(0)
    setAccSum(0)
    setPhase('idle')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (phase === 'scored') startRound()
      else if (target) check()
    }
  }

  // ── derived readouts (pure) ────────────────────────────────────────
  const want = strip(target)
  const got = strip(typed)
  const marks = phase === 'scored'
    ? want.split('').map((ch, i) => ({ ch, got: got[i] || '·', ok: got[i] === ch }))
    : []

  const weak = set
    .map((ch) => ({ ch, ...(stats[ch] || { hit: 0, tot: 0 }) }))
    .filter((s) => s.tot >= 4 && s.hit / s.tot < PASS)
    .sort((a, b) => a.hit / a.tot - b.hit / b.tot)
    .slice(0, 6)

  const sessionAvg = rounds ? Math.round((accSum / rounds) * 100) : null
  const sending = phase === 'sending'

  return (
    <>
      <h1>MORSE CODE TRAINER</h1>
      <p className="lede">
        Koch-method practice in the browser. Two characters at full speed, one
        more every time you clear ninety percent. No charts, no counting — you
        learn the sound or you do the round again.
      </p>

      <div className="tool-panel tool-noprint">
        <div className="tool-panel-head">
          <span className="tool-tag">KOCH TRAINER</span>
          <span className="tool-tag tool-tag-dim">
            {TONE_HZ} Hz · {charWpm} WPM CHARACTERS
          </span>
        </div>

        <div className="tool-stats">
          <div className="tool-stat">
            <span className="tool-stat-val">{level}</span>
            <span className="tool-stat-lbl">CHARACTERS</span>
          </div>
          <div className="tool-stat">
            <span className="tool-stat-val">
              {lastAcc === null ? '—' : `${Math.round(lastAcc * 100)}%`}
            </span>
            <span className="tool-stat-lbl">LAST ROUND</span>
          </div>
          <div className="tool-stat">
            <span className="tool-stat-val">{sessionAvg === null ? '—' : `${sessionAvg}%`}</span>
            <span className="tool-stat-lbl">SESSION AVG</span>
          </div>
          <div className="tool-stat">
            <span className="tool-stat-val">{rounds}</span>
            <span className="tool-stat-lbl">ROUNDS</span>
          </div>
        </div>

        <span className="tool-label">CURRENT SET</span>
        <ul className="tool-set" aria-label="Characters in the current practice set">
          {set.map((ch) => {
            const s = stats[ch]
            const pct = s && s.tot ? Math.round((s.hit / s.tot) * 100) : null
            return (
              <li
                key={ch}
                className={`tool-set-ch${ch === unlocked ? ' is-new' : ''}`}
                title={pct === null ? `${ch} — not tested yet` : `${ch} — ${pct}% correct`}
              >
                <span className="tool-set-glyph">{ch}</span>
                <Code c={CODE[ch]} />
              </li>
            )
          })}
        </ul>

        {unlocked ? (
          <p className="tool-note is-good" role="status">
            PASSED — new character unlocked: <strong>{unlocked}</strong>{' '}
            <Code c={CODE[unlocked]} />. It is mixed into the next round.
          </p>
        ) : null}

        <div className="tool-bar">
          <button
            type="button"
            className="tool-btn is-primary"
            onClick={sending ? stopSending : startRound}
            aria-label={sending ? 'Stop sending' : 'Send a new practice round'}
          >
            <span className={`tool-lamp${sending ? ' is-on' : ''}`} aria-hidden="true" />
            {sending ? 'STOP' : phase === 'idle' ? 'SEND A ROUND' : 'NEW ROUND'}
          </button>
          <button
            type="button"
            className="tool-btn"
            onClick={replay}
            disabled={!target || sending}
            aria-label="Send the same round again"
          >
            REPLAY
          </button>
          <button
            type="button"
            className="tool-btn"
            onClick={check}
            disabled={!target || phase === 'scored'}
            aria-label="Score what you typed against what was sent"
          >
            CHECK
          </button>
        </div>

        <div className="tool-meter" aria-hidden="true">
          <span className="tool-meter-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>

        <div className="tool-field">
          <label className="tool-label" htmlFor="tr-copy">
            YOUR COPY — TYPE WHAT YOU HEAR
          </label>
          <input
            id="tr-copy"
            ref={inputRef}
            className="tool-type"
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={sending ? 'listening…' : 'kmmkr kkmmr …'}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-label="Type the characters you hear"
          />
          <span className="tool-count">
            {got.length} / {want.length || GROUPS * GROUP_LEN} · ENTER TO SCORE
          </span>
        </div>

        {phase === 'scored' ? (
          <div className="tool-result" role="status">
            <div className="tool-result-row">
              {marks.map((m, i) => (
                <span key={i} className={`tool-mark${m.ok ? ' is-ok' : ' is-bad'}`}>
                  <span className="tool-mark-want">{m.ch}</span>
                  <span className="tool-mark-got">{m.ok ? '·' : m.got}</span>
                </span>
              ))}
            </div>
            <p className="tool-note">
              {Math.round((lastAcc || 0) * 100)}% correct.{' '}
              {lastAcc >= PASS
                ? 'Clean enough — the set grows.'
                : `Under ${Math.round(PASS * 100)}%, so the set stays where it is. Run it again.`}
            </p>
          </div>
        ) : null}

        <div className="tool-bar">
          <div className="tool-ctl">
            <label className="tool-label" htmlFor="tr-char">CHARACTER SPEED</label>
            <input
              id="tr-char"
              className="tool-range"
              type="range"
              min={15}
              max={30}
              step={1}
              value={charWpm}
              onChange={(e) => {
                const v = Number(e.target.value)
                setCharWpm(v)
                if (effWpm > v) setEffWpm(v)
              }}
              aria-label="Character speed in words per minute"
              aria-valuetext={`${charWpm} words per minute`}
            />
            <span className="tool-readout">{charWpm} WPM</span>
          </div>
          <div className="tool-ctl">
            <label className="tool-label" htmlFor="tr-eff">EFFECTIVE SPEED</label>
            <input
              id="tr-eff"
              className="tool-range"
              type="range"
              min={5}
              max={30}
              step={1}
              value={effWpm}
              onChange={(e) => setEffWpm(Math.min(Number(e.target.value), charWpm))}
              aria-label="Effective Farnsworth speed in words per minute"
              aria-valuetext={`${effWpm} words per minute`}
            />
            <span className="tool-readout">{effWpm} WPM</span>
          </div>
        </div>

        <p className="tool-note">
          Dot {Math.round(unit)} ms · gap between characters {Math.round(letterGap)} ms.
          Characters stay at {charWpm} WPM whatever the effective speed says;
          only the silence stretches.
        </p>

        {weak.length ? (
          <>
            <span className="tool-label">WEAK SPOTS</span>
            <ul className="tool-weak" aria-label="Characters you are getting wrong most often">
              {weak.map((w) => (
                <li className="tool-weak-row" key={w.ch}>
                  <span className="tool-weak-ch">{w.ch}</span>
                  <Code c={CODE[w.ch]} />
                  <span className="tool-weak-bar" aria-hidden="true">
                    <span style={{ width: `${Math.round((w.hit / w.tot) * 100)}%` }} />
                  </span>
                  <span className="tool-weak-pct">
                    {Math.round((w.hit / w.tot) * 100)}% of {w.tot}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="tool-bar">
          <button
            type="button"
            className={`tool-btn${armReset ? ' is-armed' : ''}`}
            onClick={resetProgress}
            aria-label={armReset ? 'Confirm resetting all saved progress' : 'Reset saved progress'}
          >
            {armReset ? 'CONFIRM RESET' : 'RESET PROGRESS'}
          </button>
          <span className="tool-note">
            Progress is stored in this browser only. Nothing is sent anywhere.
          </span>
        </div>
      </div>

      <h2>What the Koch method is</h2>
      <p>
        In 1935 Ludwig Koch, a German psychologist, ran an experiment that
        contradicted everything the telegraph schools were doing. Instead of
        teaching the alphabet slowly and speeding it up, he sent just two
        characters at <strong>full target speed</strong> and had his students
        copy them until they were right nine times out of ten. Then he added a
        third character, at the same speed, and waited for ninety percent again.
        His group reached 12 words per minute in under fourteen hours of
        instruction — a result nobody teaching the conventional way could come
        close to.
      </p>
      <p>
        The reasoning is straightforward once you accept what the skill
        actually is. Copying Morse is not decoding; it is recognition, closer to
        hearing a spoken word than to reading a cipher. A character sent at 20
        WPM has a rhythm — <em>dah-di-dah</em> for K, two even <em>dah dah</em>
        for M — and that rhythm is what the ear learns. Send the same character
        at 5 WPM and the rhythm dissolves into separate events that the
        conscious mind starts counting instead. Counting works up to about 10
        WPM and then hits a wall, and everyone who learns that way has to
        demolish the habit before they can go faster. Koch's method never builds
        it.
      </p>

      <h2>Why it starts at full speed</h2>
      <p>
        The characters here are sent at 20 words per minute by default, which is
        faster than a beginner can copy continuous text. That is deliberate, and
        it is the part people are most tempted to change. The trick that makes
        it bearable is <strong>Farnsworth spacing</strong>: the dots and dashes
        keep their fast timing while the silence between characters is
        stretched, so your ear gets the correct, final shape of every character
        but your brain gets a moment to write it down. As you improve you close
        the gap by raising the effective speed, and the characters themselves
        never have to be relearned.
      </p>
      <p>
        The other half of the method is the ninety percent rule. Two characters
        is a coin flip you cannot fake, so the score means something from the
        first round. Add a character only when you are genuinely at 90% and the
        difficulty stays roughly constant: each new character costs you a few
        rounds and then settles. Add one early and the errors compound, because
        you are now guessing between characters you never solidly knew. If a
        round comes in at 60%, the honest move is to run it again rather than
        turn the speed down.
      </p>
      <p>
        Practice in short sittings — fifteen to twenty minutes, most days.
        Fatigue shows up as a sudden accuracy collapse, and pushing through it
        teaches you to guess. Keep your eyes off the current-set list while you
        copy; if you are checking which characters are possible, you are
        reasoning rather than hearing. When a character sticks stubbornly, the
        weak-spot list above will name it, and the
        <a href="/morse-translator"> translator</a> will send it on repeat at
        whatever speed you like. For the timing rules behind all of this, see
        the <a href="/learn">CW primer</a>.
      </p>
    </>
  )
}
