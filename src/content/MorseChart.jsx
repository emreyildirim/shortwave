import { MORSE } from '../data/morse.js'
import { Code, MorseTable, DIGITS, PUNCTUATION } from './shared.jsx'

// Prosigns are sent as one run-together character with no internal letter
// gap, which is why they are written with a bar over them. Several share a
// code with a punctuation mark — context, not the dots, tells them apart.
const PROSIGNS = [
  ['AR', '.-.-.', 'End of message. Also the plus sign.'],
  ['SK', '...-.-', 'End of contact — the last thing you send.'],
  ['BT', '-...-', 'Paragraph break or a pause while you think. Also the equals sign.'],
  ['AS', '.-...', 'Wait, stand by. Also the ampersand.'],
  ['KN', '-.--.', 'Go ahead, named station only. Also the open bracket.'],
  ['K', '-.-', 'Go ahead, anyone. Plain letter K, used as an invitation.'],
  ['KA', '-.-.-', 'Attention — starts a formal message.'],
  ['BK', null, 'Break — interrupt, or hand the key straight back. Normally sent as two ordinary letters rather than solid.'],
  ['SN', '...-.', 'Understood, verified.'],
  ['HH', '........', 'Error. Eight dots, then resend the word.'],
  ['SOS', '...---...', 'Distress. One character, never S-O-S in three parts.'],
  ['CQ', '-.-. --.-', 'Calling any station. Two letters, not a prosign.'],
]

const TIMING = [
  ['Dot (dit)', '1 unit', 'The shortest element. Key down.'],
  ['Dash (dah)', '3 units', 'Key down for three times a dot.'],
  ['Gap inside a character', '1 unit', 'Key up between the dots and dashes of one letter.'],
  ['Gap between characters', '3 units', 'Key up. Getting this wrong runs letters together.'],
  ['Gap between words', '7 units', 'Key up. Written as a slash in text.'],
]

export default function MorseChart() {
  const print = () => { window.print() }

  return (
    <>
      <h1>MORSE CODE CHART</h1>
      <p className="lede">
        The complete International Morse alphabet on one sheet: letters,
        digits, punctuation and the prosigns that hold a contact together.
        Built to be printed and pinned above the key.
      </p>

      <div className="tool-chart-bar tool-noprint">
        <button
          type="button"
          className="tool-btn is-primary"
          onClick={print}
          aria-label="Print this chart"
        >
          PRINT THIS SHEET
        </button>
        <span className="tool-note">
          Prints as black on white, one page, without the navigation or the
          notes below.
        </span>
      </div>

      <h2>Letters</h2>
      <MorseTable map={MORSE} />

      <h2>Numbers</h2>
      <MorseTable map={DIGITS} />

      <h2>Punctuation &amp; symbols</h2>
      <MorseTable map={PUNCTUATION} />

      <h2>Prosigns</h2>
      <dl className="tool-prosigns">
        {PROSIGNS.map(([name, code, note]) => (
          <div className="tool-prosign" key={name}>
            <dt>
              <span className="tool-prosign-name">{name}</span>
              {code
                ? <span className="tool-codes">
                    {code.split(' ').map((g, i) => <Code key={i} c={g} />)}
                  </span>
                : <span className="tool-units">two letters</span>}
            </dt>
            <dd>{note}</dd>
          </div>
        ))}
      </dl>

      <h2>Timing</h2>
      <dl className="tool-prosigns tool-timing">
        {TIMING.map(([name, len, note]) => (
          <div className="tool-prosign" key={name}>
            <dt>
              <span className="tool-prosign-name">{name}</span>
              <span className="tool-units">{len}</span>
            </dt>
            <dd>{note}</dd>
          </div>
        ))}
      </dl>
      <p className="tool-note">
        One unit = 1200 / WPM milliseconds. At 14 WPM a dot is 86 ms; at 20 WPM
        it is 60 ms.
      </p>

      <section className="tool-prose tool-noprint">
        <h2>How to read this chart</h2>
        <p>
          Each row pairs a character with its code, written here as
          <strong> •</strong> for a dot and <strong>▬</strong> for a dash. Read
          it left to right in the order you would send it: C is
          dah-di-dah-dit, not the other way round. The chart is a lookup table
          and nothing more — it will get you unstuck on a character you have
          forgotten, but it is a poor way to learn, because anything you learn
          by eye has to be unlearned before you can copy by ear. Use it the way
          an operator uses a logbook: open on the desk, glanced at, not studied.
        </p>
        <p>
          Notice that the shortest codes belong to the most common letters. E is
          a single dot, T a single dash, and A, I, M and N take two elements
          apiece. That is not an accident: Alfred Vail is generally credited
          with counting the type in a Morristown newspaper's job cases to find
          out which letters printers used most, and assigning the cheapest codes
          to those. The result is a code that is roughly optimal for English
          text, which is why a message in Morse is shorter than the same message
          in a fixed-length code such as Baudot.
        </p>

        <h2>The timing rules</h2>
        <p>
          A character is a pattern of durations, not a picture. Everything
          derives from one unit of time: a dot lasts one unit, a dash three, the
          gap between the elements inside a character one, the gap between
          characters three, and the gap between words seven. Sending speed is
          quoted in words per minute against the reference word PARIS, which
          measures exactly 50 units including the word space, so a unit is
          1200 / WPM milliseconds. Beginners almost always fail on the gaps
          rather than the elements — three units between characters feels like
          an eternity when you are sending, and anything shorter turns HE INT
          into a single unreadable blur at the far end.
        </p>
        <p>
          Prosigns break the gap rule deliberately. They are two or more letters
          sent with <em>no</em> gap between them, so they arrive as one long
          character: AR is di-dah-di-dah-dit in a single breath, and if you
          leave three units in the middle it is heard as the letters A and R.
          That run-together trick is also why several prosigns share a code with
          a punctuation mark — AR is the plus sign, BT the equals sign, AS the
          ampersand, KN the open bracket. The dots are identical; only where it
          appears in the traffic tells you which one is meant.
        </p>
        <p>
          Punctuation is sent sparingly on the air. A period costs six elements
          and a comma six more, so operators drop most of it and use the ones
          that carry real information: the slash in a callsign, the equals sign
          between the parts of a message, and the question mark that turns a Q
          code into a question. For what those Q codes mean, see the
          <a href="/q-codes"> Q code list</a>; to hear any of these characters
          keyed at a speed you choose, paste them into the
          <a href="/morse-translator"> translator</a>.
        </p>
      </section>
    </>
  )
}
