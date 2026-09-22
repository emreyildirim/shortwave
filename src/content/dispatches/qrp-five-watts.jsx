import { DefList } from '../shared.jsx'

export default function QrpFiveWatts() {
  return (
    <>
      <p>
        QRP is a <a href="/q-codes">Q code</a> before it is anything else — it
        means "reduce power", and as a question it asks whether you should. At
        some point it stopped being an instruction and became an identity. The
        working convention is five watts or less output on CW, ten watts peak on
        voice, and under one watt gets its own name, QRPp. The obvious question
        is why anyone would deliberately throw away thirteen decibels, and the
        honest answer starts with admitting that thirteen decibels is exactly
        what you are throwing away.
      </p>

      <h2>The arithmetic, without the romance</h2>
      <p>
        Dropping from 100 watts to 5 watts is a factor of twenty, and ten times
        the base-ten logarithm of twenty is 13 decibels. The S-meter convention
        on HF puts one S-unit at 6 dB, so that is a little over two S-units. A
        station hearing you at S7 with a hundred watts hears you at about S5
        with five. That is the entire penalty, stated plainly, and it is smaller
        than most people expect and larger than any amount of enthusiasm can
        close.
      </p>
      <DefList
        items={[
          ['3 dB', null, 'Twice the power. Half an S-unit. Genuinely inaudible on the other end.'],
          ['6 dB', null, 'Four times the power. One S-unit. The smallest change worth arguing about.'],
          ['10 dB', null, 'Ten times the power. Around one and two-thirds S-units.'],
          ['13 dB', null, 'Twenty times. Five watts against a hundred. Two S-units and a bit.'],
          ['25 dB', null, 'Three hundred times. Five watts against a legal-limit kilowatt and a half — about four S-units.'],
        ]}
      />
      <p>
        Read that table the other way round and it becomes useful. To gain a
        single S-unit you must quadruple your power. Going from 5 watts to 20
        buys you one S-unit. Going from 5 to 100 buys you two. Going all the way
        to the legal limit — a linear amplifier, a three-phase supply's worth of
        heat, and a small fortune — buys four. Transmitter power is the most
        expensive decibel in radio, and it is the one that people buy first.
      </p>

      <h2>Where the cheap decibels live</h2>
      <p>
        Almost anywhere else. Raising a horizontal dipole from an eighth of a
        wavelength above ground to a half wavelength can be worth four to six
        decibels in the low-angle directions that matter for long paths, and
        sometimes considerably more, because a low wire is not weak so much as
        pointed at the sky. A three-element Yagi gives something like five
        decibels over a dipole in its favoured direction. Together that is the
        difference between five watts and a hundred, paid for in rope and
        aluminium instead of in a power supply.
      </p>
      <p>
        And there is an asymmetry that settles the argument. Antenna gain works
        in both directions. Every decibel you add to the antenna you also get on
        receive, and you cannot work a station you cannot hear. An amplifier
        does nothing whatever for your receiver. Spend the first money in the
        air.
      </p>

      <h2>What CW gives you that voice cannot</h2>
      <p>
        This is where the five-watt case actually gets made, and it is made with
        bandwidth.
      </p>
      <p>
        A single-sideband voice signal needs about 2.4 kHz of receiver bandwidth
        to be intelligible. A CW signal at conversational speed needs well under
        a hundred hertz, and a practical receiver filters it at 250 or 500.
        Noise power scales with bandwidth, so narrowing from 2400 Hz to 250 Hz
        throws away roughly ten decibels of noise while keeping all of the
        signal. Ten log of 2400 over 250 is 9.8 dB, and it costs nothing but a
        filter.
      </p>
      <p>
        Now put the two numbers together. Five watts of CW is 13 dB below a
        hundred watts of voice on raw power and about 10 dB ahead on detection
        bandwidth. The net is something like 3 dB — half an S-unit — and that is
        before counting the fact that a human ear tracking a steady tone works
        at a lower signal-to-noise ratio than a human ear reconstructing speech,
        which is worth several more.
      </p>
      <p>
        There is a further point that gets left out of these comparisons. A
        hundred watts of SSB is a hundred watts at the peak of a syllable; the
        average power in a voice signal is a small fraction of that. Five watts
        of CW is five watts for the whole duration of every single element you
        send. The peak-power comparison flatters voice considerably.
      </p>
      <p>
        So the QRP claim is not that five watts is as good as a hundred. It is
        that five watts of CW is roughly in the same conversation as a hundred
        watts of voice, and it gets there with a radio you can put in a coat
        pocket and a battery you can carry up a hill.
      </p>

      <h2>The culture, briefly</h2>
      <p>
        There are calling frequencies, and knowing them saves a lot of aimless
        tuning: 3.560, 7.030, 10.106, 14.060, 18.096, 21.060, 24.906 and
        28.060 MHz are the ones in general international use, though North
        American practice has historically also used 7.040. Call near them, not
        exactly on them.
      </p>
      <p>
        There is a tradition of measuring contacts in miles per watt, and an
        award at a thousand. Five watts across the Atlantic works out around
        seven hundred, which tells you that most of the impressive numbers come
        from turning the power down rather than from going further. There is a
        deep kit-building strand — the low-power end of the hobby is where
        people still design and solder their own transmitters — and a large
        overlap with portable operating, because low power and light weight are
        the same engineering problem viewed from two sides.
      </p>
      <p>
        Some operators append /QRP to their callsign. It is common in some
        circles and quietly disliked in others, it is not required anywhere, and
        it makes your call longer in precisely the conditions where a short call
        helps. Make your own decision, but know that it costs you something.
      </p>

      <h2>The frustration, honestly</h2>
      <p>
        Most of a low-power session is spent calling. You will send CQ for
        twenty minutes into a band that sounds open while a station two S-units
        above you works somebody new every ninety seconds. That is not bad luck.
        That is the thirteen decibels, working exactly as arithmetic says it
        should.
      </p>
      <p>
        Pileups are worse. When a rare station has forty people calling, the
        loudest three get through and you are not one of them. The tactics that
        work are patience and timing rather than volume: wait until the crowd
        thins, call at the very end of his listening period rather than the
        start, and if he is working split, listen to where he is actually
        picking people up rather than to where everyone is transmitting.
      </p>
      <p>
        Fading will take contacts away from you at the worst moment, because
        your margin is small enough that a normal QSB cycle can drop you below
        the noise mid-exchange. You will lose contacts at the report stage and
        there is nothing to be done about it.
      </p>
      <p>
        And the trap that catches most people: low power demands a
        <em> better</em> antenna than high power, not a worse one. Five watts
        into a compromise wire indoors is not QRP operating, it is a
        demonstration that the band is closed. People buy a small radio to save
        money, hang the cheapest antenna they can, conclude that CW does not
        work, and put both in a cupboard. The radio was never the problem. Read{' '}
        <a href="/dispatches/wire-antenna-budget">the antenna dispatch</a>{' '}
        before you buy anything at all.
      </p>
      <p>
        The other honest piece of advice is not to start here. Learn to make
        contacts at whatever power you have, get fluent at the{' '}
        <a href="/dispatches/first-cw-qso">exchange</a>, and then turn the
        knob down. Starting at five watts with a new skill, an unproven antenna
        and no idea which{' '}
        <a href="/dispatches/reading-the-bands">band should be open</a> stacks
        four unknowns into one silence, and you will not be able to tell which
        one is failing.
      </p>
      <p>
        What you get in return is worth saying plainly. Operating at five watts
        makes you competent at everything else, because nothing is covered up.
        You learn the bands properly because you have to be on the right one.
        You learn to listen, because calling blind is expensive. You find the
        decibels hiding in your feedline and your antenna height because you
        cannot afford to leave them there. Operators who came up on low power
        are noticeably better at the whole craft, and the equipment is only
        part of the reason.
      </p>
    </>
  )
}
