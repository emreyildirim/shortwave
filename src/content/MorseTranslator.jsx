import { useEffect, useRef, useState } from 'react'
import { MORSE, FROM_MORSE } from '../data/morse.js'
import { DIGITS, PUNCTUATION } from './shared.jsx'

// ── code tables ──────────────────────────────────────────────────────
// Letters, digits and the punctuation set defined by ITU-R M.1677-1.
const TO_CODE = { ...MORSE, ...DIGITS, ...PUNCTUATION }

// Reverse lookup for everything that is not a letter; FROM_MORSE already
// covers A–Z and is the canonical table for them.
const FROM_EXTRA = Object.entries({ ...DIGITS, ...PUNCTUATION })
  .reduce((acc, [ch, code]) => { acc[code] = ch; return acc }, {})

const codeToChar = (group) => FROM_MORSE[group] || FROM_EXTRA[group] || null

// Marks left in the output where nothing could be translated. They are
// printed, never silently dropped, and listed under the output box.
const NO_CODE = '#'
const NO_CHAR = '[?]'

const TONE_HZ = 620
const MIN_WPM = 5
const MAX_WPM = 40

// ── text → morse ─────────────────────────────────────────────────────
function encode(text) {
  const unknown = []
  const words = String(text).toUpperCase().split(/\s+/).filter(Boolean)
  const out = words
    .map((word) =>
      word
        .split('')
        .map((ch) => {
          const code = TO_CODE[ch]
          if (code) return code
          if (!unknown.includes(ch)) unknown.push(ch)
          return NO_CODE
        })
        .join(' ')
    )
    .join(' / ')
  return { out, unknown }
}

// ── morse → text ─────────────────────────────────────────────────────
// Accepts the glyphs people actually paste: bullets, em dashes, the site's
// own ▬ and •, underscores for dashes.
const normalise = (src) =>
  String(src)
    .replace(/[•·∙⋅*●]/g, '.')
    .replace(/[▬—–−_~]/g, '-')
    .replace(/[\\|]/g, '/')

function decode(src) {
  const unknown = []
  const norm = normalise(src).trim()
  if (!norm) return { out: '', unknown }
  const words = norm.split(/\s*\/+\s*|\s{3,}|\n+/)
  const out = words
    .map((word) =>
      word
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((group) => {
          const ch = codeToChar(group)
          if (ch) return ch
          if (!unknown.includes(group)) unknown.push(group)
          return NO_CHAR
        })
        .join('')
    )
    .filter((w) => w.length)
    .join(' ')
  return { out, unknown }
}

// ── timing ───────────────────────────────────────────────────────────
// One unit = 1200 / wpm milliseconds. Dot 1, dash 3, symbol gap 1,
// letter gap 3, word gap 7 — the PARIS standard.
function timeline(morse, unitMs) {
  const els = []
  const tokens = String(morse).split(/\s+/).filter(Boolean)
  let pendingGap = 0
  for (const tok of tokens) {
    if (tok === '/') { pendingGap = unitMs * 7; continue }
    const symbols = tok.split('').filter((s) => s === '.' || s === '-')
    if (!symbols.length) continue
    if (els.length) els.push({ on: false, ms: pendingGap || unitMs * 3 })
    pendingGap = 0
    symbols.forEach((s, i) => {
      if (i) els.push({ on: false, ms: unitMs })
      els.push({ on: true, ms: s === '-' ? unitMs * 3 : unitMs })
    })
  }
  return els
}

const totalMs = (els) => els.reduce((n, e) => n + e.ms, 0)

export default function MorseTranslator() {
  // Constant initial state — the server render and the first client render
  // must be byte-identical, so nothing here may read the environment.
  const [dir, setDir] = useState('enc')
  const [textSrc, setTextSrc] = useState('CQ CQ DE K6Z K')
  const [morseSrc, setMorseSrc] = useState('... --- ...')
  const [wpm, setWpm] = useState(14)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  const ctxRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(0)
  const spanRef = useRef(0)
  const copyTimerRef = useRef(null)
  const outRef = useRef(null)

  const encoding = dir === 'enc'
  const source = encoding ? textSrc : morseSrc
  const result = encoding ? encode(textSrc) : decode(morseSrc)
  const output = result.out
  const unknown = result.unknown

  // What the oscillator will sound: the morse side, whichever it is.
  const morseForAudio = encoding ? output : normalise(morseSrc)
  const unitMs = Math.round(1200 / wpm)
  const els = timeline(morseForAudio, unitMs)
  const lengthMs = totalMs(els)

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

  const stop = () => {
    hardStop()
    setPlaying(false)
    setProgress(0)
  }

  const play = () => {
    if (!els.length) return
    hardStop()
    const ctx = ensureCtx()
    if (!ctx) return

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = TONE_HZ
    const gain = ctx.createGain()
    gain.gain.value = 0
    osc.connect(gain).connect(ctx.destination)

    const t0 = ctx.currentTime + 0.06
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
    setPlaying(true)
    setProgress(0)

    const tick = () => {
      const c = ctxRef.current
      if (!c) return
      const elapsed = (c.currentTime - startRef.current) * 1000
      if (elapsed >= spanRef.current) {
        rafRef.current = null
        setPlaying(false)
        setProgress(0)
        return
      }
      setProgress(Math.max(0, elapsed / spanRef.current))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => {
    hardStop()
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    if (ctxRef.current) { try { ctxRef.current.close() } catch { /* closed */ } }
  }, [])

  // ── handlers ───────────────────────────────────────────────────────
  const flip = () => {
    stop()
    if (encoding) { setMorseSrc(output); setDir('dec') }
    else { setTextSrc(output); setDir('enc') }
  }

  const setMode = (mode) => {
    if (mode === dir) return
    flip()
  }

  const onSourceChange = (e) => {
    const v = e.target.value
    if (encoding) setTextSrc(v)
    else setMorseSrc(v)
  }

  const clear = () => {
    stop()
    if (encoding) setTextSrc('')
    else setMorseSrc('')
  }

  const copy = () => {
    if (!output) return
    const done = () => {
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 1800)
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output).then(done, () => fallbackCopy(done))
    } else {
      fallbackCopy(done)
    }
  }

  const fallbackCopy = (done) => {
    const el = outRef.current
    if (!el) return
    el.removeAttribute('readonly')
    el.select()
    try { document.execCommand('copy'); done() } catch { /* nothing to do */ }
    el.setAttribute('readonly', 'readonly')
  }

  const srcLabel = encoding ? 'PLAIN TEXT IN' : 'MORSE IN'
  const outLabel = encoding ? 'MORSE OUT' : 'PLAIN TEXT OUT'
  const chars = source.length
  const seconds = (lengthMs / 1000).toFixed(1)

  return (
    <>
      <h1>MORSE CODE TRANSLATOR</h1>
      <p className="lede">
        Type text and read it back as dots and dashes, or paste dots and dashes
        and read them back as text. Then key it aloud at any speed between 5 and
        40 words per minute.
      </p>

      <div className="tool-panel tool-noprint">
        <div className="tool-panel-head">
          <span className="tool-tag">TRANSLATOR</span>
          <span className="tool-tag tool-tag-dim">{TONE_HZ} Hz · SINE</span>
        </div>

        <div className="tool-seg-row" role="group" aria-label="Translation direction">
          <button
            type="button"
            className={`tool-seg${encoding ? ' is-on' : ''}`}
            onClick={() => setMode('enc')}
            aria-pressed={encoding}
            aria-label="Translate text into Morse code"
          >
            TEXT → MORSE
          </button>
          <button
            type="button"
            className={`tool-seg${encoding ? '' : ' is-on'}`}
            onClick={() => setMode('dec')}
            aria-pressed={!encoding}
            aria-label="Translate Morse code into text"
          >
            MORSE → TEXT
          </button>
        </div>

        <div className="tool-io">
          <div className="tool-field">
            <label className="tool-label" htmlFor="xl-src">{srcLabel}</label>
            <textarea
              id="xl-src"
              className="tool-area"
              value={source}
              onChange={onSourceChange}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              rows={6}
              placeholder={encoding ? 'CQ CQ DE K6Z K' : '-.-. --.-  -.. .  -.- -.... --..'}
              aria-label={encoding ? 'Text to translate into Morse' : 'Morse code to translate into text'}
            />
            <span className="tool-count">{chars} CHARACTERS</span>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="xl-out">{outLabel}</label>
            <textarea
              id="xl-out"
              ref={outRef}
              className="tool-area tool-area-out"
              value={output}
              readOnly
              rows={6}
              aria-label={`${outLabel}, read only`}
            />
            <span className="tool-count">
              {output.length} CHARACTERS · {seconds}s AT {wpm} WPM
            </span>
          </div>
        </div>

        {unknown.length ? (
          <p className="tool-note is-warn" role="status">
            {encoding
              ? `NO MORSE EQUIVALENT — marked ${NO_CODE} in the output and skipped by the key: `
              : `NOT A VALID MORSE CHARACTER — marked ${NO_CHAR} in the output: `}
            <span className="tool-unknown">{unknown.join('  ·  ')}</span>
          </p>
        ) : null}

        <div className="tool-bar">
          <button
            type="button"
            className="tool-btn is-primary"
            onClick={playing ? stop : play}
            disabled={!els.length}
            aria-label={playing ? 'Stop the tone' : 'Key the Morse aloud'}
          >
            <span className={`tool-lamp${playing ? ' is-on' : ''}`} aria-hidden="true" />
            {playing ? 'STOP' : 'KEY IT'}
          </button>

          <button type="button" className="tool-btn" onClick={flip} aria-label="Swap the two boxes and reverse the direction">
            ⇄ SWAP
          </button>

          <button type="button" className="tool-btn" onClick={copy} disabled={!output} aria-label="Copy the output to the clipboard">
            {copied ? 'COPIED' : 'COPY'}
          </button>

          <button type="button" className="tool-btn" onClick={clear} aria-label="Clear the input">
            CLEAR
          </button>

          <div className="tool-ctl">
            <label className="tool-label" htmlFor="xl-wpm">SPEED</label>
            <input
              id="xl-wpm"
              className="tool-range"
              type="range"
              min={MIN_WPM}
              max={MAX_WPM}
              step={1}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              aria-label="Sending speed in words per minute"
              aria-valuetext={`${wpm} words per minute`}
            />
            <span className="tool-readout">{wpm} WPM</span>
          </div>
        </div>

        <div className="tool-meter" aria-hidden="true">
          <span className="tool-meter-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>

        <p className="tool-note">
          One unit is {unitMs} ms at {wpm} WPM. Dot = 1 unit, dash = 3, gap
          inside a character = 1, between characters = 3, between words = 7.
        </p>
      </div>

      <h2>How the timing works</h2>
      <p>
        Morse is not a set of shapes, it is a set of durations. Everything is
        measured against a single time unit, and once that unit is fixed the
        whole code follows from it: a <strong>dot is one unit</strong>, a
        <strong> dash is three</strong>, the silence between the dots and dashes
        inside one character is one unit, the silence between characters is
        three, and the silence between words is seven. Nothing else is
        negotiable. An operator sending badly is almost always sending the
        symbols correctly and the <em>gaps</em> wrongly.
      </p>
      <p>
        Speed is quoted in words per minute, where the reference word is
        <strong> PARIS</strong> — chosen because, counting every dot, dash and
        internal gap plus the word space that follows it, it comes to exactly 50
        units. Fifty units per word at one word per minute gives 60,000 ms / 50
        = 1200 ms per unit, so the unit length at any speed is simply
        <strong> 1200 / WPM</strong> milliseconds. At 14 WPM that is about 86 ms
        for a dot and 257 ms for a dash; at 25 WPM it is 48 ms and 144 ms. The
        player above uses that formula directly, and the tone sits at 620 Hz,
        the same pitch as the station's sidetone. A tone that low is easy to
        listen to for an hour, which matters more than it sounds.
      </p>

      <h2>Why Morse has no capital letters</h2>
      <p>
        There is no upper and lower case in Morse, and there never was. The code
        was built for a telegraph sounder and a trained ear, not for a
        typesetter, so <em>a</em> and <em>A</em> are the same character:
        di-dah. Translators like this one print the result in capitals purely by
        convention — it is how received traffic has been written on a message
        pad since the 1840s, and it keeps a hand-copied log unambiguous.
      </p>
      <p>
        The practical consequence is that a round trip through Morse is lossy.
        Send "Field Day" and it comes back "FIELD DAY". The same applies to any
        formatting: there is no bold, no tab, no line break. Operators recovered
        the missing structure with prosigns instead — <strong>BT</strong>
        (-...-) for a paragraph break, <strong>AA</strong> for a new line — and
        with a strict message format for anything that had to survive relaying
        by hand.
      </p>

      <h2>Characters with no Morse equivalent</h2>
      <p>
        The international code defines the 26 Latin letters, the ten digits and
        roughly eighteen punctuation marks. That is the whole set. There is no
        code for <strong>#</strong>, <strong>%</strong>, <strong>*</strong>,
        <strong> &lt;</strong>, <strong>&gt;</strong>, <strong>[</strong>,
        <strong> ]</strong>, <strong>{'{'}</strong>, <strong>{'}'}</strong>,
        <strong> ~</strong>, <strong>^</strong>, <strong>|</strong> or the
        backtick, and no code for emoji or any non-Latin script. Several
        national variants added accented letters — É is ..-.., Ü is ..--, Ñ is
        --.-- — but a receiving operator outside that tradition will copy them
        as nonsense, which is why they are rare on the air.
      </p>
      <p>
        Rather than drop those characters silently, this translator prints a
        <strong> {NO_CODE}</strong> where the code should be and lists every
        offending character under the box, so you can see exactly what will not
        survive transmission. Going the other way, a group of dots and dashes
        that matches nothing in the table is printed as
        <strong> {NO_CHAR}</strong> and listed the same way — which is usually
        how you discover a mistyped dash or a missing space between two
        characters. Real operators solve the gap by spelling things out: a
        multiplication sign becomes X, a percentage becomes "PCT", a slash
        already has a code (-..-.) and does most of the work.
      </p>

      <h2>Using the audio to train</h2>
      <p>
        Read the output box and you will learn to read Morse, which is a skill
        almost nobody needs. Listen to it and you learn to hear Morse, which is
        the skill the mode is built on. Use the player deliberately: put the
        speed at 18 to 20 WPM, well above what you can copy, then look away from
        the screen and write down what you hear with a pencil. Each character
        should arrive as one sound with its own rhythm — dah-di-dah-dit is C,
        not "dash dot dash dot" to be assembled afterwards. If you find yourself
        counting, the speed is too slow, not too fast.
      </p>
      <p>
        Short sessions beat long ones. Fifteen minutes a day will move you
        faster than two hours on a Sunday, because the bottleneck is reflex, not
        knowledge. Paste in a paragraph of ordinary prose rather than random
        letters once you have the alphabet, since real text carries the letter
        frequencies and the common words — THE, AND, DE, CQ, 73 — that you will
        eventually recognise whole. When a character keeps escaping you, look it
        up on the <a href="/morse-code-chart">chart</a>, send it twenty times,
        and go back to copying. For a structured path from two characters to the
        full alphabet, the <a href="/morse-trainer">Koch trainer</a> does the
        drilling for you and keeps score.
      </p>
    </>
  )
}
