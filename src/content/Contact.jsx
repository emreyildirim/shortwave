import { CONTACT, GITHUB } from './shared.jsx'

export default function Contact() {
  return (
    <>
      <h1>CONTACT THE STATION</h1>
      <p className="lede">How to reach the operator.</p>
      <p>
        Shortwave is a personal project — one person, no company, no support
        desk. There is more on that on the <a href="/about">about page</a>. Mail
        reaches that one person directly:
        {' '}<a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>

      <h2>What to write about</h2>
      <p>
        <strong>Faults on the console.</strong> The key not registering, audio
        that will not start, the decoder disagreeing with what you sent, a
        frequency that shows operators who are not there, anything that looks
        broken on a phone.
      </p>
      <p>
        <strong>Corrections to the reference pages.</strong> The chart, the
        prosigns, the Q codes, the phonetics and the history pages are meant to
        be accurate. If something on them is wrong, or right but misleading,
        that is worth an email. A source helps but is not required — a clear
        statement of what is wrong is enough to go and check.
      </p>
      <p>
        <strong>Dispatch board suggestions.</strong> Subjects you would like
        covered, or gaps in what is already there.
      </p>
      <p>
        <strong>Advertising and partnership enquiries.</strong> These are read.
        Most are declined, and a generic template is deleted unread, so say
        plainly what you are proposing.
      </p>

      <h2>Reporting a fault</h2>
      <p>
        The useful details, in one message: which <strong>browser</strong> and
        which device, what you were <strong>doing</strong> when it went wrong,
        what you expected instead, and whether the station showed
        <strong> CONNECTED</strong> or was trying to reconnect at the time. A
        screenshot settles most arguments. If the problem involves audio, say
        whether you had tapped or pressed a key before it happened, since
        browsers hold sound back until you do.
      </p>
      <p>
        For anything that is clearly a bug, the
        {' '}<a href={GITHUB} target="_blank" rel="noreferrer">GitHub issues
        page</a> is the better channel. It is public, it will not get buried,
        and the fix ends up attached to the report.
      </p>

      <h2>Before you write</h2>
      <p>
        The <a href="/faq">FAQ</a> already answers most of what arrives by
        email — how to transmit, what a frequency is here, why you might be in
        listen-only, and whether anything you key is stored. Questions about
        data are answered on the <a href="/privacy">privacy page</a>.
      </p>

      <h2>Response time</h2>
      <p>
        This is run around a job. Expect a few days, sometimes a couple of
        weeks, and occasionally nothing at all if a message gets lost in a busy
        inbox. Every message is read. Not every message can be answered, and a
        bug being reported is not a promise that it will be fixed quickly.
      </p>
    </>
  )
}
