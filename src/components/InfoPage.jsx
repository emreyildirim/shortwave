// Static content pages (About / Privacy) styled like the operator's notepad —
// aged paper, typewriter type. Reachable at /about and /privacy so the site
// has real, crawlable content + a privacy policy (needed for AdSense review).

const CONTACT = '98yildirimemre@gmail.com'
const GITHUB = 'https://github.com/emreyildirim/shortwave'

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
        waiting listener is promoted automatically. Want a private channel? Tune
        to an empty frequency and bring a friend.
      </p>

      <h2>Ear-copy drill</h2>
      <p>
        Flip the lever to <strong>EAR-COPY</strong> and the decoder goes dark —
        the signal still sounds, but the letters are yours to transcribe in the
        operator's notepad. It's how real operators trained their fist and ear.
      </p>

      <h2>The station</h2>
      <p>
        Shortwave is a personal project, built for the feel of it — bakelite,
        brass, amber phosphor and grain. It's open source; the schematics live
        on <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>.
        Questions, bug reports, or just a dit-dah hello:
        {' '}<a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
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

export default function InfoPage({ page, navigate }) {
  const isPrivacy = page === 'privacy'
  const go = (to) => (e) => { e.preventDefault(); navigate(to) }

  return (
    <div className="info-wrap">
      <article className="paper-sheet">
        <header className="paper-head">
          <span className="paper-stamp">SHORTWAVE</span>
          <span className="paper-file">{isPrivacy ? 'FILE 02 · PRIVACY' : 'FILE 01 · STATION LOG'}</span>
        </header>

        <div className="paper-body">
          {isPrivacy ? <Privacy /> : <About />}
        </div>

        <footer className="paper-foot">
          <a href="/" onClick={go('/')} className="paper-link">⟵ BACK TO STATION</a>
          <nav className="paper-nav">
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
    </div>
  )
}
