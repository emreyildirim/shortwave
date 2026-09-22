import { DefList } from '../shared.jsx'

export default function ReadingTheBands() {
  return (
    <>
      <p>
        Ask why 40 metres is dead at lunchtime and alive at midnight and you
        will get answers that amount to "that is just how it is". It is not
        folklore. There is a specific layer of the atmosphere doing a specific
        thing, appearing and disappearing on a schedule set by the sun, and once
        you know which layer is doing what, choosing a band stops being
        superstition and becomes a decision you can defend.
      </p>

      <h2>Four layers, two of which matter most</h2>
      <p>
        Ultraviolet and X-ray from the sun strip electrons off the thin upper
        atmosphere, producing regions of free electrons at different altitudes.
        Those regions bend radio waves — and whether they bend or simply absorb
        depends on the electron density, the air density around it, and the
        frequency.
      </p>
      <p>
        <strong>The D layer</strong> sits roughly 60 to 90 km up and exists only
        in daylight: the air there is dense enough that free electrons recombine
        within minutes of sunset, so the layer collapses at dusk and rebuilds at
        dawn. Crucially, at high frequencies it does not refract. It absorbs — an
        electron set moving by the passing wave collides with a neutral molecule
        and the energy becomes heat. That absorption falls off roughly as the
        square of frequency, which is the single most useful fact here: halve
        the frequency and you roughly quadruple the daytime absorption.
      </p>
      <p>
        <strong>The E layer</strong> is around 90 to 150 km, also
        daylight-driven, and it does refract, supporting short and medium
        daytime paths. It also produces <strong>sporadic E</strong>: intense,
        patchy, short-lived clouds of ionisation, most common in late spring and
        summer, throwing single hops of several hundred to a couple of thousand
        kilometres on the higher bands whatever the sun is doing overall.
      </p>
      <p>
        <strong>F1</strong> sits around 150 to 220 km and exists only by day.
        <strong> F2</strong>, the one that matters, runs from roughly 250 to
        400 km and higher. Up there the air is so thin that electrons take hours
        to find anything to recombine with, so F2 survives the night at reduced
        density. That single fact — one layer that persists in darkness — is why
        night-time long-distance work exists at all.
      </p>

      <h2>Why 40 metres is two different bands</h2>
      <p>
        Put those together. In daylight the D layer absorbs, and it absorbs low
        frequencies hardest. A 7 MHz signal launched at a low angle passes
        through it twice on every hop and comes out the far side with most of
        its energy gone. What survives is the high-angle stuff that goes almost
        straight up, hits the F layer and lands within a few hundred kilometres.
        So daytime 40 metres is a regional band.
      </p>
      <p>
        At sunset the D layer collapses within about half an hour. The
        absorption disappears, the F layer is still there, and the same
        transmitter into the same antenna is suddenly working across an ocean.
        Nothing about your station changed. A layer 70 km up stopped existing.
      </p>
      <p>
        Run the logic upward and the higher bands invert it. At 14 MHz the D
        layer absorption is roughly a quarter of what it is at 7 MHz, so
        daylight is no obstacle — but 14 MHz needs enough F-layer ionisation to
        be bent back at all, and after midnight the F region has thinned and the
        band closes. Hence the shorthand: higher frequencies by day, lower by
        night.
      </p>

      <h2>MUF and the ceiling</h2>
      <p>
        A signal sent straight up at an ionised layer either comes back or
        punches through, and the dividing line is the <strong>critical
        frequency</strong> — for the F2 layer, written foF2 and measured
        continuously by ionosondes around the world. Send anything above foF2
        vertically and it is gone into space.
      </p>
      <p>
        Send it at a shallow angle and the ceiling rises: the flatter the angle,
        the higher the frequency the layer can still turn around, roughly as the
        secant of the angle of incidence. For a long path the
        <strong> maximum usable frequency</strong> can be around three times the
        critical frequency — which is why a long-haul contact works on a band
        where a station two hundred kilometres away is inaudible. The dead
        ground between them is the <strong>skip zone</strong>, and on 20 metres
        at midday it can be a thousand kilometres wide.
      </p>
      <p>
        There is a floor as well, the <strong>lowest usable frequency</strong>,
        set by absorption and noise. Going lower past that point just feeds the
        D layer. The best band for a given path at a given hour is usually the
        highest one open, because that is the one paying the least absorption
        tax. Working just under the MUF is the whole game.
      </p>

      <h2>Grey line</h2>
      <p>
        The terminator — the moving line of sunrise and sunset — is the best
        thing that happens to the low bands. Along it the D layer has either
        collapsed or not yet formed, while the F layer is still ionised from the
        day or already ionising for it. For twenty or forty minutes either side,
        a path running along the terminator gets F-layer refraction with no
        D-layer absorption, and 160, 80 and 40 metres do things they cannot do
        at any other hour. It is short and it moves, so you plan for it rather
        than stumbling into it.
      </p>

      <h2>The sun over eleven years and over three hours</h2>
      <p>
        The <strong>solar cycle</strong> runs about eleven years. More sunspots
        means more ultraviolet, more F2 ionisation, higher critical frequencies
        and a higher MUF. The number to watch is the 10.7 cm
        <strong> solar flux index</strong>, reported daily. When it is high, 15,
        12 and 10 metres come alive for hours and a small station can work the
        world. Near solar minimum those bands are quiet outside sporadic E
        season and 20 metres becomes the long-haul band by default.
      </p>
      <p>
        The <strong>geomagnetic indices</strong> work over hours instead, and
        people routinely confuse the two timescales. The K index runs 0 to 9,
        reported every three hours; the A index is its daily cousin. High values
        mean a disturbed magnetic field, usually after a coronal mass ejection,
        and the consequence is extra absorption at high latitudes, auroral
        flutter on polar paths, and on a bad day a blackout on the sunlit side.
        A K of 0 to 2 is quiet and good; 5 or more means the polar paths are in
        trouble.
      </p>

      <h2>What to expect, band by band</h2>
      <DefList
        items={[
          [
            '160 m',
            null,
            'From 1.8 MHz. Winter nights only — summer atmospheric noise buries it. Big antennas, high local noise, and some of the most satisfying long-distance work in the hobby when the grey line cooperates.',
          ],
          [
            '80 m',
            null,
            'From 3.5 MHz. Regional by day, continental and beyond after dark. Noisy in thunderstorm season. A dipole for it is 40 m of wire, which is the honest reason most people skip it.',
          ],
          [
            '40 m',
            null,
            'From 7 MHz. The all-rounder and the one to learn on. Regional in daylight, long-haul after sunset, something open at almost any hour of any year. Crowded, and in some regions it shares space with broadcasters after dark.',
          ],
          [
            '30 m',
            null,
            'From 10.1 MHz. Narrow, CW and data only, no contests permitted, and consequently the quietest band on the list. Sits between the day and night behaviours and often works when its neighbours do not.',
          ],
          [
            '20 m',
            null,
            'From 14 MHz. The long-distance workhorse: open somewhere most days, often into the evening, and at solar minimum the most dependable band you have. If you only ever put up one antenna, put it up for this.',
          ],
          [
            '17 m',
            null,
            'From 18.068 MHz. A quieter 20 with a shorter opening. Needs moderate solar flux, carries no contest traffic.',
          ],
          [
            '15 m',
            null,
            'From 21 MHz. Daytime long-haul, excellent when the flux is up, closes not long after dark. At solar maximum it is often better than 20.',
          ],
          [
            '12 m and 10 m',
            null,
            'From 24.89 and 28 MHz. Need real solar activity for F2, and then they are spectacular — a few watts and a wire crossing oceans. Outside that, sporadic E in late spring and summer gives short, sharp openings.',
          ],
        ]}
      />
      <p>
        Band edges vary between the three ITU regions, so check what your own
        licence allows before transmitting near the bottom of one.
      </p>

      <h2>Three rules that cover most of it</h2>
      <p>
        Higher frequency in daylight, lower after dark. The best band open is
        usually the highest band open. And if a band sounds empty, listen for
        another thirty seconds before concluding it is closed — an open band
        with nobody on it and a closed band are indistinguishable until somebody
        transmits, which is why people underestimate 30 and 17 metres for years
        at a time.
      </p>
      <p>
        None of it helps if the antenna is putting its energy at the wrong
        angle, which is the other half of the problem and the subject of{' '}
        <a href="/dispatches/wire-antenna-budget">the wire antenna dispatch</a>.
        Height sets your radiation angle, and radiation angle decides whether
        you are talking to the next province or the next continent. On low power
        band choice matters more still — see{' '}
        <a href="/dispatches/qrp-five-watts">five watts and a wire</a>. And how
        any of this was discovered is a good story, told on the{' '}
        <a href="/history">history page</a>.
      </p>
    </>
  )
}
