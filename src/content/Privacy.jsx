import { CONTACT } from './shared.jsx'

export default function Privacy() {
  return (
    <>
      <h1>PRIVACY POLICY</h1>
      <p className="lede">Last updated: September 2026.</p>
      <p>
        Shortwave (shortwaveradio.online) is a personal project built to
        collect as little as possible. There are no accounts, no sign-up, and
        no profile. This page describes everything the site does with data,
        including the parts that are out of our hands.
      </p>

      <h2>What stays on your device</h2>
      <p>
        Your callsign, chosen frequency, receive mode, trainer progress and
        anything you type in the operator's notepad are saved in your own
        browser (localStorage and sessionStorage). They never leave your
        device and we never see them. Clearing your browser storage deletes
        them permanently.
      </p>

      <h2>What passes through the relay</h2>
      <p>
        When you transmit, your callsign and the live key events — dots,
        dashes and decoded letters — are relayed in real time to the other
        operators tuned to your frequency, so they can hear you. These
        messages are a pass-through: they are not written to disk, not
        logged, and not associated with any identity, and they cease to exist
        the moment they are delivered. There is no message history to
        retrieve, for you or for anyone else.
      </p>
      <p>
        Connecting to any server on the internet necessarily reveals your IP
        address to it. The relay application does not record, store or log IP
        addresses. The hosting and proxy layer in front of it may hold
        short-lived operational logs, as any web host does, and those are used
        only to keep the service running.
      </p>

      <h2>Advertising and cookies</h2>
      <p>
        This site displays ads served by Google AdSense. Third-party vendors,
        including Google, use cookies to serve ads based on your prior visits
        to this website and to other websites. Google's use of advertising
        cookies enables it and its partners to serve ads to you based on those
        visits.
      </p>
      <p>
        You can opt out of personalised advertising in{' '}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Google Ads Settings</a>,
        or opt out of third-party vendors' use of cookies for personalised
        advertising at{' '}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">aboutads.info</a>.
        How Google handles data from sites that use its services is described
        at{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">policies.google.com</a>.
      </p>

      <h2>Consent in the EEA, the UK and Switzerland</h2>
      <p>
        If you visit from the European Economic Area, the United Kingdom or
        Switzerland, a consent message appears before personalised advertising
        cookies are set, and your choice is recorded and respected. You can
        change or withdraw that choice at any time through the same message,
        which is reachable from the privacy link shown with the ads.
        Declining does not restrict any part of the site — the station works
        the same either way.
      </p>

      <h2>Analytics</h2>
      <p>
        We run no analytics of our own: no Google Analytics, no tag manager,
        no pixels, no fingerprinting, no heatmaps. The only third-party code
        on the site is the Google advertising script and the web fonts served
        by Google Fonts, which is requested by your browser when a page loads.
      </p>

      <h2>Your data rights</h2>
      <p>
        Because nothing is stored, there is no account to access, export or
        delete — clearing your browser storage removes everything the site
        holds about you. For the advertising cookies described above, the
        controls linked in that section are the effective route, since those
        cookies are set by Google rather than by us. If you have a request we
        can act on, write and we will.
      </p>

      <h2>Children</h2>
      <p>
        Shortwave is not directed to children under 13 and does not knowingly
        collect personal information from them. If you believe a child has
        provided personal information through the site, write to the address
        below and it will be removed.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If what the site does with data changes, this page changes with it and
        the date at the top is updated. There is no mailing list to notify, so
        the date is the record.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Write to{' '}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. See also the{' '}
        <a href="/terms">terms of service</a> and the{' '}
        <a href="/about">station notes</a>.
      </p>
    </>
  )
}
