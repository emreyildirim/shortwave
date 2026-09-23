import { CONTACT, GITHUB } from './shared.jsx'

export default function About() {
  return (
    <>
      <h1>SHORTWAVE — FIELD STATION LOG</h1>
      <p className="lede">
        A WWII-era field radio you operate in the browser. Tap Morse on a
        telegraph key, watch the decoder light up, and meet other operators
        drifting on the same frequency.
      </p>

      <h2>What this is</h2>
      <p>
        Shortwave is a simulator, not a radio. Nothing here transmits on the
        air and no licence is involved. What it does is reproduce the part of
        CW operating that a chart cannot teach you: the feel of a key under
        your hand, the delay before a stranger answers, and the particular
        concentration of copying something by ear while it is still arriving.
      </p>
      <p>
        It grew out of a simple observation. Learning Morse from a table is
        easy and almost useless — you end up translating shapes instead of
        hearing characters. Learning it against another person, live, with
        something at stake, works. The relay exists so there is someone on the
        other end.
      </p>

      <h2>How it works</h2>
      <p>
        Every visit drops you onto a random frequency in one of the classic CW
        sub-bands. A frequency is a room: anyone tuned to the same number
        shares the ether with you. Drag the tuning knob, spin the wheel, or hit
        <em> scan</em> to wander until you find company.
      </p>
      <p>
        Hold <strong>SPACE</strong> (or press and hold the key) to transmit.
        A short press is a dot, a longer press a dash; after a beat of silence
        the buffer commits to a letter. The decoder tree traces your path in
        amber; incoming operators glow green. Your key sounds at 620 Hz and
        theirs at 540 Hz, so you can tell yourself apart without looking.
      </p>

      <h2>Two on the key</h2>
      <p>
        A frequency carries two transmitting operators at a time — the first two
        to arrive. Anyone after that rides along in <strong>LISTEN ONLY</strong>,
        copying the traffic. When a transmitting operator leaves, the longest
        waiting listener is promoted automatically. It is a deliberate limit:
        two people can hold a conversation in Morse, and a dozen cannot.
      </p>

      <h2>Ear-copy mode</h2>
      <p>
        Flip the lever and the decoder goes dark. You still hear everything,
        but the letters are yours to write down. This is the drill wartime
        operators trained on and it is the only one that builds real copying
        speed — the decoder is a crutch, and the lever is there so you can take
        it away from yourself. The notepad keeps what you transcribe.
      </p>

      <h2>The rest of the station</h2>
      <p>
        Around the console there is a small reference library, all of it free
        and none of it gated. <a href="/learn">The primer</a> covers timing,
        Farnsworth spacing and the habits that stall most beginners. The{' '}
        <a href="/morse-translator">translator</a> converts either direction and
        keys the result aloud; the <a href="/morse-trainer">trainer</a> runs
        Koch-method practice and scores it; the{' '}
        <a href="/morse-code-chart">chart</a> prints on a single sheet.{' '}
        <a href="/prosigns">Prosigns</a>, <a href="/q-codes">Q codes</a> and the{' '}
        <a href="/phonetic-alphabet">phonetic alphabet</a> cover the shorthand
        you will actually hear. <a href="/dispatches">The dispatch board</a>{' '}
        carries longer field notes, and <a href="/history">the history</a>{' '}
        explains how dots and dashes ended up bouncing off the ionosphere.
      </p>

      <h2>Who made it</h2>
      <p>
        Shortwave is a personal project — one person, built for the feel of it:
        bakelite, brass, amber phosphor and grain. There is no company behind
        it, no account to create, and no paid tier. Advertising covers the
        relay server and the domain, and that is the whole business model.
      </p>
      <p>
        It is open source under the MIT licence, so the schematics are on{' '}
        <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a> — including
        the relay, if you want to check what it does with your traffic (the
        short answer is: passes it along and forgets it, as the{' '}
        <a href="/privacy">privacy policy</a> describes).
      </p>
      <p>
        Corrections to any reference page are welcome and get made. Say hello:{' '}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>, or see the{' '}
        <a href="/contact">contact page</a> for what is worth writing about.
      </p>
    </>
  )
}
