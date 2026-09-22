import { CONTACT, GITHUB } from './shared.jsx'
import { QA } from './faqData.js'

export default function Faq() {
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
