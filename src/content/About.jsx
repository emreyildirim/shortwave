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
