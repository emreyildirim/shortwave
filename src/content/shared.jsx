// Shared building blocks for content pages.
//
// Every content page is a PURE component: no props, no window access during
// render, no randomness. That is what makes build-time prerendering safe —
// the server-rendered markup and the first client render must be identical
// or React will throw a hydration mismatch.

export const CONTACT = 'info@shortwaveradio.online'
export const GITHUB = 'https://github.com/emreyildirim/shortwave'

export const DIGITS = {
  1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....',
  6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----',
}

export const PUNCTUATION = {
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.',  '(': '-.--.',  ')': '-.--.-',
  '&': '.-...',  ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.',  '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.',
}

// Renders a code string as the site's dot/dash glyphs.
export function Code({ c }) {
  return (
    <span className="code-cell">
      {c.split('').map((s, i) => (
        <span key={i}>{s === '-' ? '▬' : '•'}</span>
      ))}
    </span>
  )
}

// A two-column reference row list: term → explanation.
export function DefList({ items }) {
  return (
    <dl className="def-list">
      {items.map(([term, code, body]) => (
        <div className="def-row" key={term}>
          <dt>
            <span className="def-term">{term}</span>
            {code ? <Code c={code} /> : null}
          </dt>
          <dd>{body}</dd>
        </div>
      ))}
    </dl>
  )
}

// Morse table used by the chart and the learn page.
export function MorseTable({ map }) {
  return (
    <table className="morse-table">
      <tbody>
        {Object.entries(map).map(([k, code]) => (
          <tr key={k}>
            <th>{k}</th>
            <td><Code c={code} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
