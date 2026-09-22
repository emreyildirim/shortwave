import { CONTACT } from './shared.jsx'

export default function Privacy() {
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
