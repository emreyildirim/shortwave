import { CONTACT, GITHUB } from './shared.jsx'

export default function Terms() {
  return (
    <>
      <h1>TERMS OF SERVICE</h1>
      <p className="lede">Last updated: September 2026.</p>
      <p>
        Shortwave (shortwaveradio.online) is a personal project run by one
        person, not a company. These terms are written in plain language so they
        can actually be read. By using the site you accept them. They are a
        description of how this station is run — they are not legal advice, and
        nothing here is a substitute for it.
      </p>

      <h2>What the service is</h2>
      <p>
        Shortwave is a browser-based simulation of a field radio. It lets you
        key Morse, hear it, and relay it live to anyone else who happens to be
        tuned to the same frequency. It is free, it has no paid tier, and it is
        provided <strong>as-is</strong> and <strong>as-available</strong>, with
        no warranty of any kind — no promise that it will work, that it will
        keep working, that it will be free of faults, or that it is fit for any
        particular purpose. It is not a communications service and must not be
        relied on for anything that matters.
      </p>

      <h2>No accounts</h2>
      <p>
        There is no sign-up, no password and no account to close. The callsign
        you choose is stored in your own browser and means nothing to anyone
        else. A callsign here is a handle, not proof of identity, and you should
        not treat another operator's callsign as proof of theirs.
      </p>

      <h2>Using the relay</h2>
      <p>
        The relay is shared, small, and open to anyone. Keep it usable:
      </p>
      <p>
        Do not transmit content that harasses, threatens or abuses another
        operator. Do not transmit anything unlawful where you are, or anything
        that infringes someone else's rights. Do not attempt to disrupt,
        overload, flood or otherwise degrade the relay, and do not probe it for
        weaknesses or run automated clients against it at a volume a human could
        not produce. Do not use the site to impersonate a real station,
        emergency service or licensed operator.
      </p>
      <p>
        Because nothing is stored there is no moderation queue and no way to
        retrieve or remove past traffic. The practical remedy for abuse is
        blocking access or taking the relay down, and both are available.
      </p>

      <h2>What happens to what you send</h2>
      <p>
        Your key events and callsign are passed straight through to the other
        operators on your frequency and then discarded. Nothing is stored,
        logged or archived, which also means nothing can be recovered. Treat
        everything you key as public to whoever is listening on that frequency
        at that moment. The
        {' '}<a href="/privacy">privacy policy</a> sets out the detail.
      </p>

      <h2>Availability</h2>
      <p>
        The relay may be taken down, restarted, rate-limited, moved or changed
        at any time, with or without notice, including permanently. Features may
        be added or removed. There is no uptime commitment and no obligation to
        keep any part of the site running.
      </p>

      <h2>The code</h2>
      <p>
        Shortwave is open source under the MIT licence and the code lives on
        {' '}<a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>. The
        licence governs your use of the source. It does not grant any right to
        the site's name or branding, and it does not entitle you to use the
        hosted relay in any particular way — that is what this page is for.
      </p>

      <h2>Advertising</h2>
      <p>
        Advertising on this site is served by Google. Those ads, and the data
        handling behind them, are governed by Google's own terms and policies
        rather than these. The advertisers are not endorsed here and their
        content is not reviewed here.
      </p>

      <h2>Reference pages are not operating authority</h2>
      <p>
        The learn, chart, prosign, Q code and history pages are educational
        material about a mode of communication. They are not a licence and they
        confer no authority to transmit. Operating an amateur radio transmitter
        on real hardware requires a licence from the relevant authority in
        essentially every country, and in most of them unlicensed transmission
        is an offence. What you do in a browser is a simulation; what you do on
        the air is regulated. Check your own national rules before you key
        anything that radiates.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, the operator of this site is not
        liable for any loss or damage arising from your use of it, from its
        unavailability, from anything another operator transmits through the
        relay, or from anything a third party serves onto the page. If some part
        of that cannot be excluded where you live, then the remaining parts
        still apply.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change. The date at the top of this page is the only
        version marker, and continuing to use the site after a change means you
        accept the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, objections or reports of abuse go to
        {' '}<a href={`mailto:${CONTACT}`}>{CONTACT}</a>. More on how to reach
        the station is on the {' '}<a href="/contact">contact page</a>.
      </p>
    </>
  )
}
