import { MORSE } from '../data/morse.js'
import { Code, DIGITS } from './shared.jsx'

export default function Learn() {
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
