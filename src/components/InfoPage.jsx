// Static content pages styled like the operator's notepad — aged paper,
// typewriter type. Real, crawlable routes (/about /privacy /learn /history
// /faq) give the site genuine content + a privacy policy for AdSense review.

import AdSlot from './AdSlot.jsx'
import { MORSE } from '../data/morse.js'

const CONTACT = '98yildirimemre@gmail.com'
const GITHUB = 'https://github.com/emreyildirim/shortwave'

const DIGITS = {
  1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....',
  6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----',
}

function Code({ c }) {
  return (
    <span className="code-cell">
      {c.split('').map((s, i) => (
        <span key={i}>{s === '-' ? '▬' : '•'}</span>
      ))}
    </span>
  )
}

function About() {
  return (
    <>
      <h1>SHORTWAVE — FIELD STATION LOG</h1>
      <p className="lede">
        A WWII-era field radio you operate in the browser. Tap Morse on a
        telegraph key, watch the decoder light up, and meet other operators
        drifting on the same frequency.
      </p>

      <h2>How it works</h2>
      <p>
        Every visit drops you onto a random frequency in one of the classic CW
        sub-bands. A frequency is a room: anyone tuned to the same number shares
        the ether with you. Drag the tuning knob, spin the wheel, or hit
        <em> scan</em> to wander until you find company.
      </p>
      <p>
        Hold <strong>SPACE</strong> (or press and hold the key) to transmit.
        A short press is a dot, a longer press a dash; after a beat of silence
        the buffer commits to a letter. The decoder tree traces your path in
        amber; incoming operators glow green.
      </p>

      <h2>Two on the key</h2>
      <p>
        A frequency carries two transmitting operators at a time — the first two
        to arrive. Anyone after that rides along in <strong>LISTEN ONLY</strong>,
        copying the traffic. When a transmitting operator leaves, the longest
        waiting listener is promoted automatically.
      </p>

      <h2>The station</h2>
      <p>
        Shortwave is a personal project, built for the feel of it — bakelite,
        brass, amber phosphor and grain. It's open source; the schematics live
        on <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>.
        Say hello: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    </>
  )
}

function Privacy() {
  return (
    <>
      <h1>PRIVACY POLICY</h1>
      <p className="lede">Last updated: May 2026.</p>
      <p>
        Shortwave (shortwaveradio.online) is built to collect as little as
        possible. There are no accounts and no sign-up.
      </p>

      <h2>What stays on your device</h2>
      <p>
        Your callsign, chosen frequency, receive mode, and anything you type in
        the operator's notepad are saved in your own browser
        (localStorage / sessionStorage). They never leave your device and we
        never see them. Clear your browser storage and they're gone.
      </p>

      <h2>What passes through the relay</h2>
      <p>
        When you transmit, your callsign and the live key events (dots, dashes,
        decoded letters) are relayed in real time to other operators on the same
        frequency, so they can hear you. These messages are a pass-through —
        they are not stored, logged, or associated with any identity, and they
        disappear the instant they are delivered.
      </p>

      <h2>Advertising &amp; cookies</h2>
      <p>
        We may display ads through Google AdSense. Google and its partners use
        cookies to serve ads based on your prior visits to this and other
        sites. You can opt out of personalized advertising via
        {' '}<a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>,
        and learn how Google uses data at
        {' '}<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">policies.google.com</a>.
        Third-party vendors, including Google, use cookies to serve ads based on
        a user's prior visits to this website.
      </p>

      <h2>Analytics</h2>
      <p>
        We do not run our own analytics or tracking beyond what advertising
        partners described above may set.
      </p>

      <h2>Children</h2>
      <p>
        Shortwave is not directed to children under 13 and does not knowingly
        collect personal information from them.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Write to
        {' '}<a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    </>
  )
}

function Learn() {
  return (
    <>
      <h1>LEARN MORSE CODE</h1>
      <p className="lede">
        Morse is just two sounds — a short <em>dit</em> and a long <em>dah</em> —
        arranged into letters. Here's everything you need to start sending.
      </p>

      <h2>Dots, dashes &amp; timing</h2>
      <p>
        Every character is built from <strong>dots</strong> (•) and
        <strong> dashes</strong> (▬). The whole system runs on one unit of time:
        a dot is <strong>1 unit</strong>, a dash is <strong>3 units</strong>. The
        gap between symbols inside a letter is 1 unit, between letters 3 units,
        and between words 7 units. Once your ear locks onto that rhythm, copying
        becomes musical rather than mathematical.
      </p>
      <p>
        In Shortwave you don't measure units yourself — a quick tap registers as
        a dot, a longer hold as a dash, and a short pause commits the letter.
      </p>

      <h2>How to practice</h2>
      <p>
        Start with the shortest, most common letters — <strong>E</strong> (•),
        <strong> T</strong> (▬), <strong>A</strong> (•▬), <strong>N</strong> (▬•),
        <strong> I</strong> (••), <strong>M</strong> (▬▬). Learn by sound, not by
        sight: say "di-dah" for A, "dah-di-di-dit" for B. Don't memorise the
        chart by looking — that habit slows you down later. Switch the station to
        <strong> EAR-COPY</strong> mode to freeze the decoder and transcribe what
        you hear by hand. That's exactly how wartime operators trained their
        "fist" and ear.
      </p>

      <h2>The alphabet</h2>
      <table className="morse-table">
        <tbody>
          {Object.entries(MORSE).map(([letter, code]) => (
            <tr key={letter}>
              <th>{letter}</th>
              <td><Code c={code} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Numbers</h2>
      <table className="morse-table">
        <tbody>
          {Object.entries(DIGITS).map(([d, code]) => (
            <tr key={d}>
              <th>{d}</th>
              <td><Code c={code} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function History() {
  return (
    <>
      <h1>A SHORT HISTORY OF SHORTWAVE &amp; CW</h1>
      <p className="lede">
        Long before voices crossed the air, the radio spoke in dots and dashes.
      </p>

      <h2>The code</h2>
      <p>
        In the 1840s Samuel Morse and Alfred Vail gave the telegraph a language:
        dots and dashes that could be tapped down a wire. When wireless arrived
        at the turn of the century, that same code went with it. The earliest
        transmitters were spark-gap sets — crude, broadband and loud — and
        "continuous wave" (CW) keying soon replaced them with a clean, narrow
        tone that could be heard through tremendous noise.
      </p>

      <h2>Why shortwave</h2>
      <p>
        Shortwave (roughly 1.8–30 MHz) has a trick the higher bands don't:
        signals bounce off the ionosphere and skip thousands of kilometres
        around the curve of the Earth. A few watts and a wire antenna can cross
        an ocean. That made shortwave the backbone of long-distance
        communication for most of the twentieth century — for navies, embassies,
        broadcasters and spies alike.
      </p>

      <h2>The wartime fist</h2>
      <p>
        In the Second World War, signal-corps operators hunched over field sets
        in tents and trenches, copying Morse by ear under fire. Every operator
        had a recognisable "fist" — a personal rhythm in their keying — and
        skilled listeners could tell who was sending from the cadence alone. CW
        got through when nothing else would: weak, jammed, and buried in static.
      </p>

      <h2>Still on the air</h2>
      <p>
        Voice and digital modes eventually took over, but CW never died. Radio
        amateurs still prize it — it's efficient, it punches through poor
        conditions, and there's a craft to it that a microphone can't match.
        Shortwave is a small tribute to that craft: a bakelite-and-brass field
        set you can key from a browser.
      </p>
    </>
  )
}

function Faq() {
  const QA = [
    ['How do I transmit?',
      'Hold the SPACE bar or press and hold the telegraph key. A short press is a dot, a longer press a dash. A short pause commits your buffer to a letter.'],
    ['What is a "frequency"?',
      'Each frequency (in kHz) is a private room. Everyone tuned to the same number shares the air. You arrive on a random frequency so people spread out — drag the knob or hit scan to find or make a quiet channel.'],
    ['Why am I "LISTEN ONLY"?',
      'A frequency carries two transmitting operators at a time — whoever arrived first. If two are already keying you can hear everything but not send. Tune to an empty frequency to transmit, or wait: when an operator leaves, the next listener is promoted automatically.'],
    ['What is EAR-COPY mode?',
      'Flip the lever to EAR-COPY and the decoder goes dark. You still hear the signal, but the letters are yours to transcribe in the notepad — a classic drill for training your ear.'],
    ['Is there sound?',
      'Yes — your key sounds at 620 Hz, other operators at 540 Hz, so you can tell yourself apart. Most browsers need one tap or key press before audio starts.'],
    ['Is it free? Do I need an account?',
      'Completely free and no account. Your callsign and notes live only in your own browser.'],
    ['Do you store my messages?',
      'No. The relay passes live signals between operators in real time and stores nothing. See the Privacy page for details.'],
  ]
  return (
    <>
      <h1>FREQUENTLY ASKED QUESTIONS</h1>
      <p className="lede">Everything an operator usually asks on their first watch.</p>
      {QA.map(([q, a]) => (
        <div key={q}>
          <h2>{q}</h2>
          <p>{a}</p>
        </div>
      ))}
      <p>
        Still stuck? Write to <a href={`mailto:${CONTACT}`}>{CONTACT}</a> or read
        the code on <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>.
      </p>
    </>
  )
}

const PAGES = {
  about:   { file: 'FILE 01 · STATION LOG', body: About },
  privacy: { file: 'FILE 02 · PRIVACY',     body: Privacy },
  learn:   { file: 'FILE 03 · CW PRIMER',   body: Learn },
  history: { file: 'FILE 04 · DISPATCHES',  body: History },
  faq:     { file: 'FILE 05 · Q & A',       body: Faq },
}

export default function InfoPage({ page, navigate }) {
  const entry = PAGES[page] || PAGES.about
  const Body = entry.body
  const go = (to) => (e) => { e.preventDefault(); navigate(to) }

  return (
    <div className="info-wrap">
      <article className="paper-sheet">
        <header className="paper-head">
          <span className="paper-stamp">SHORTWAVE</span>
          <span className="paper-file">{entry.file}</span>
        </header>

        <div className="paper-body">
          <Body />
        </div>

        <footer className="paper-foot">
          <a href="/" onClick={go('/')} className="paper-link">⟵ BACK TO STATION</a>
          <nav className="paper-nav">
            <a href="/learn" onClick={go('/learn')}>LEARN</a>
            <span className="sep">·</span>
            <a href="/history" onClick={go('/history')}>HISTORY</a>
            <span className="sep">·</span>
            <a href="/faq" onClick={go('/faq')}>FAQ</a>
            <span className="sep">·</span>
            <a href="/about" onClick={go('/about')}>ABOUT</a>
            <span className="sep">·</span>
            <a href="/privacy" onClick={go('/privacy')}>PRIVACY</a>
            <span className="sep">·</span>
            <a href={`mailto:${CONTACT}`}>CONTACT</a>
            <span className="sep">·</span>
            <a href={GITHUB} target="_blank" rel="noreferrer">GITHUB</a>
          </nav>
        </footer>
      </article>

      <div className="info-ad">
        <AdSlot variant="desktop-bottom" slot={import.meta.env?.VITE_ADSENSE_SLOT_BOTTOM} />
      </div>
    </div>
  )
}
