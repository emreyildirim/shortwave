import { DefList } from '../shared.jsx'

export default function WireAntennaBudget() {
  return (
    <>
      <p>
        An antenna that will work the world is about twenty metres of wire, two
        bits of plastic, some rope and a connector. The expensive part of a
        station is never the antenna; it is the equipment bought to make up for
        a bad one. Here are the three wires worth building, the arithmetic for
        cutting them, and the one variable that matters more than all the others
        put together and that nobody optimises first.
      </p>

      <h2>The half-wave dipole</h2>
      <p>
        A wire half a wavelength long, cut in the middle, fed there. It is the
        reference antenna everything else is quoted against, the cheapest thing
        you can build, and on a good day also the best thing you can build.
      </p>
      <p>
        Two formulas, and the units matter. For the <strong>total</strong>{' '}
        length of wire, both legs together:
      </p>
      <p><strong>length in feet = 468 / frequency in MHz</strong></p>
      <p><strong>length in metres = 143 / frequency in MHz</strong></p>
      <p>
        Each leg is half of that. The numbers come from somewhere: a free-space
        half wavelength is 492 over the frequency in feet, or 150 over it in
        metres, and a real wire near ground behaves as though it were about five
        percent shorter. Five percent off 492 is 468; off 150 it is 142.5, which
        everyone rounds to 143. Both are starting points, not specifications.
      </p>
      <DefList
        items={[
          ['3.55 MHz', null, '131 ft 10 in total, 65 ft 11 in each leg. In metric, 40.3 m total, 20.1 m each leg.'],
          ['7.03 MHz', null, '66 ft 7 in total, 33 ft 3 in each leg. 20.3 m total, 10.2 m each leg.'],
          ['10.11 MHz', null, '46 ft 3 in total, 23 ft 2 in each leg. 14.1 m total, 7.07 m each leg.'],
          ['14.05 MHz', null, '33 ft 4 in total, 16 ft 8 in each leg. 10.2 m total, 5.09 m each leg.'],
          ['21.05 MHz', null, '22 ft 3 in total, 11 ft 1 in each leg. 6.79 m total, 3.40 m each leg.'],
          ['28.05 MHz', null, '16 ft 8 in total, 8 ft 4 in each leg. 5.10 m total, 2.55 m each leg.'],
        ]}
      />
      <p>
        Cut two percent long and trim. A one percent change in length moves the
        resonant frequency about one percent the other way, split evenly between
        the ends. Sweep the SWR across the whole band to find where the minimum
        actually sits; one reading cannot tell you which direction to go.
      </p>
      <p>
        At resonance a dipole in free space is about 73 ohms, resistive. Over
        real ground it swings with height, dropping well below that when the
        antenna is low, but fed with 50-ohm coax the mismatch alone is around
        1.5:1 at worst — nothing. With one support instead of two, feed it at
        the apex and let the legs slope down at ninety degrees or more. That
        <strong> inverted V</strong> drops the feedpoint to around 50 ohms,
        costs perhaps a decibel, and needs one less tree.
      </p>

      <h2>The end-fed half-wave</h2>
      <p>
        Same wire, same length, fed at one end. At the end of a half-wave the
        current is near zero and the voltage near maximum, and impedance is
        voltage over current, so the feedpoint impedance is enormous — thousands
        of ohms, moving around enough with height and surroundings that quoting
        one figure misleads. It is matched with a transformer, almost always
        49:1, because 49 is seven squared and 2450 ohms over 49 is 50.
      </p>
      <p>
        What you buy is convenience. The radio sits at the bottom of the wire
        and the far end goes into a tree, with one support and no coax run to
        speak of. And a half wave on 40 metres is a full wave on 20, a wave and
        a half on 15 and two waves on 10, so one wire gives usable impedances on
        four bands. That is why end-feds have taken over portable operating. The
        cost is a fraction of a decibel of transformer loss, more in a cheap one
        driven hard, plus a requirement people ignore until it bites — see
        counterpoises, below.
      </p>

      <h2>The random wire</h2>
      <p>
        Any convenient length, fed against radials through a 9:1 transformer and
        a tuner. One rule for the length: avoid anything close to a half
        wavelength, or a whole multiple of one, on a band you want to use,
        because there the impedance goes so high that nothing will bring it
        down. Work it out with the metric formula. A half wave at 7.1 MHz is
        20.1 m; at 14.2 MHz, 10.1 m; at 21.1 MHz, 6.78 m, so 6.78, 13.6 and
        20.3; at 28.4 MHz, 5.03 m, so 5.03, 10.1, 15.1 and 20.1. Notice how many
        converge on twenty metres, which is exactly the length a beginner
        reaches for. Twelve metres clears all four lists.
      </p>
      <p>
        The honest warning: a random wire and a tuner will always show you a low
        SWR, and a low SWR measures nothing you want. The tuner's job is keeping
        the transmitter happy; it has no opinion about whether power is radiated
        or turned into heat in its own coils. A dummy load is a flawless match.
      </p>

      <h2>Height beats every other variable</h2>
      <p>
        Energy radiated upward from a horizontal wire bounces off the ground and
        recombines with the direct wave, and where the two add and where they
        cancel is set by the height of the antenna in wavelengths. So the
        vertical pattern of a horizontal antenna is decided almost entirely by
        how high it is and almost not at all by how well it is built.
      </p>
      <p>
        A quarter wavelength up, the main lobe points nearly straight overhead.
        A half wavelength up it comes down to around thirty degrees. A full
        wavelength up there is a lobe near fifteen degrees, which is the region
        long paths use. A low wire does not put energy there and no amount of
        tuning will persuade it to.
      </p>
      <p>
        Half a wavelength is 10 m on the 20-metre band, 20 m on 40 and 40 m on
        80 — so most amateurs run high-angle antennas on the low bands whether
        they meant to or not, and 20 metres is where a modest garden is
        competitive. If the choice is between a clever antenna at six metres and
        a plain dipole at twelve, take the dipole. Height has the most leverage
        of any variable and is the one people optimise last, usually after
        buying an amplifier. One qualification: a low antenna is not broken, it
        is specialised. For dependable coverage out to two or three hundred
        kilometres on 80 or 40 it is the correct antenna. Radiating straight up
        is only a fault when you wanted to go somewhere.
      </p>

      <h2>Baluns and counterpoises in plain terms</h2>
      <p>
        A dipole is balanced: two equal halves, equal and opposite currents.
        Coax is not, and the <em>outside</em> of its shield is effectively a
        third conductor. Join them directly and current flows down that outer
        surface and radiates, which makes your feedline part of your antenna: a
        distorted pattern, house noise conducted up to the feedpoint on receive,
        RF biting you in the shack, and an SWR reading that changes when you
        move the cable. The fix is a <strong>1:1 current balun</strong>, or
        choke balun, at the feedpoint — a few turns of coax on a ferrite core,
        or a string of beads over it. It presents a high impedance to current on
        the outside of the braid and does nothing to the signal inside.
      </p>
      <p>
        A <strong>counterpoise</strong> solves the same problem from the other
        end. Current has to leave the antenna and return to something. A
        dipole's something is its other half. An end-fed has no other half, so it
        improvises with whatever is attached — the coax braid, the power lead,
        you. Give it a deliberate wire and it stops improvising. For a 49:1
        end-fed that means a short counterpoise at the transformer plus a choke
        roughly a quarter wavelength down the coax. For a 9:1 random wire it
        means radials, ideally a quarter wave on your lowest band, and several
        short ones are more consistent than one long one.
      </p>
      <p>
        One last piece of arithmetic to stop you worrying about the wrong thing.
        At 2:1 SWR the reflection coefficient is one third, eleven percent of
        the power comes back, and the mismatch costs about half a decibel — under
        a tenth of an S-unit. What does cost you is feedline loss, which rises
        with SWR and gets ugly on long runs of thin coax at higher frequencies.
      </p>
      <p>
        The whole build is wire around 18 to 22 AWG, two scraps of
        non-conductive plastic, UV-stable cord, a throw weight, a ferrite choke
        and a connector. And one rule with no exceptions: never anywhere near
        power lines. Not carefully near, not briefly near. The wire is long, the
        throw line is longer, and the failure mode is fatal.
      </p>
      <p>
        What the wire can then do depends on the hour and the band, which is{' '}
        <a href="/dispatches/reading-the-bands">a separate subject</a>. On low
        power the height argument is the whole difference between working people
        and calling into silence — see{' '}
        <a href="/dispatches/qrp-five-watts">five watts and a wire</a> — and for
        the portable version, where every metre of coax is weighed before it
        goes in the pack, see{' '}
        <a href="/dispatches/field-kit">what goes in a field kit</a>.
      </p>
    </>
  )
}
