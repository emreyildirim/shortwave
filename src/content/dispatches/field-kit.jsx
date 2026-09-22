import { DefList } from '../shared.jsx'

export default function FieldKit() {
  return (
    <>
      <p>
        A portable station is not a small station. It is a set of arguments
        about weight, and every item in the bag has to win one. The version of
        the kit you assemble at the kitchen table is always heavier than the
        version that survives three trips, because the kitchen table has no
        opinion about carrying anything uphill in the rain. What follows is what
        tends to be left after the trimming, and roughly what it weighs.
      </p>

      <h2>The decision that sets every other one</h2>
      <p>
        Transmitter power. Not because of what it does on the air but because of
        what it does to the pack.
      </p>
      <p>
        Five watts of CW draws something like ten to twelve watts from the
        supply, which is under an amp at 12 volts. Two hours of operating at a
        realistic thirty percent key-down, plus receive current the whole time,
        comes to around one amp-hour. A four-cell lithium iron phosphate pack of
        three amp-hours holds about 38 watt-hours, weighs roughly 400 grams, and
        will do that three times over before it needs a charger.
      </p>
      <p>
        A hundred watts draws something over twenty amps key-down. The same two
        hours needs around fourteen amp-hours, close to two kilograms of battery
        on top of a radio that is itself two kilograms rather than four hundred
        grams. So the choice is not between five watts and a hundred. It is
        between a kilogram of kit and four, and{' '}
        <a href="/dispatches/qrp-five-watts">
          the on-air penalty is about two S-units
        </a>
        . Decide that first and the rest follows.
      </p>

      <h2>The weight budget</h2>
      <DefList
        items={[
          [
            'Radio',
            null,
            'A multiband CW transceiver in the five to ten watt class runs roughly 300 to 700 g. Single-band kit radios go under 200. The difference in the pack is small; the difference when a band closes is not.',
          ],
          [
            'Battery',
            null,
            'Around 400 g for a 3 Ah four-cell LiFePO4 pack, which is a full day of CW. Anything bigger is a decision about power you have not revisited.',
          ],
          [
            'Antenna',
            null,
            'An end-fed half-wave for 40 through 10 metres — 20 m of thin wire, a 49:1 transformer, a winder — comes to 200 to 300 g with counterpoise.',
          ],
          [
            'Feedline',
            null,
            'Five metres of RG-316 or RG-174 is 50 to 80 g and costs well under half a decibel at HF. The same length of RG-58 is 200 g. Take the thin stuff.',
          ],
          [
            'Support',
            null,
            'A throw weight and line is 80 to 150 g and needs a tree. A six-metre pole is 400 to 600 g and does not. Which is dead weight depends on where you go.',
          ],
          [
            'Key',
            null,
            'A small paddle is 40 to 150 g. Whatever it weighs, it is not enough to stop it sliding, which is the real problem and is solved separately.',
          ],
          [
            'Audio',
            null,
            'Earbuds, 20 g. Better than any speaker you can carry for pulling a weak signal out of wind noise.',
          ],
          [
            'Log',
            null,
            'A small notebook and two pencils, 60 g.',
          ],
          [
            'Everything else',
            null,
            'Cables, one or two adapters, cord, tape. 150 g if you are disciplined and 600 if you are not.',
          ],
        ]}
      />
      <p>
        That is somewhere between 1.5 and 2.5 kg for a station that will work
        across an ocean on a good afternoon. The bag and the non-radio kit —
        water, layers, food, first aid — will outweigh all of it, and should.
      </p>

      <h2>The antenna is where the over-engineering happens</h2>
      <p>
        An end-fed half-wave has taken over portable operating for a good
        reason: it is fed at one end, so the radio sits with you and the far end
        goes up a tree, and a half wave on 40 metres is usable on 20, 15 and 10
        as well. One wire, four bands, one support, no coax run to speak of.
      </p>
      <p>
        A linked dipole is lighter still with no transformer loss at all, but
        you have to walk to the links to change band, which in practice means
        you change band twice and then stop. A short loaded whip is the lightest
        option by a distance and gives up real signal to get there — fine for a
        quick activation, frustrating for a session.
      </p>
      <p>
        Whatever you pick, what decides its performance is how high the wire
        goes, not what kind of wire it is — as true on a hillside as at home,
        and covered properly in{' '}
        <a href="/dispatches/wire-antenna-budget">the antenna dispatch</a>. A
        throw weight and thirty metres of light line weigh about as much as a
        chocolate bar and routinely buy four or five decibels that nothing else
        in the bag can match.
      </p>

      <h2>Power, in slightly more detail</h2>
      <p>
        Lithium iron phosphate is the right chemistry for this. It is more
        tolerant of abuse than the higher-density lithium cells, it holds a flat
        voltage through most of its discharge so the radio sees a steady supply
        almost until the end, and four cells in series sit at 12.8 volts
        nominal, which is what a 12-volt radio wants.
      </p>
      <p>
        One caution worth reading the manual for: a fully charged four-cell pack
        comes off the charger at around 14.6 volts and not every small radio
        accepts that. Check the maximum input voltage before you connect
        anything.
      </p>
      <p>
        Two more things the cold does. Capacity falls noticeably below freezing,
        so a pack that lasts all day in summer will not in January. And lithium
        cells of any chemistry should not be charged below freezing, which
        matters if you run a solar panel in winter. Keep the battery in a jacket
        pocket rather than in the snow beside the radio.
      </p>

      <h2>The key, and the problem nobody anticipates</h2>
      <p>
        A portable paddle weighs almost nothing, which is the entire difficulty:
        the first dash launches it across the rock. Everything else about
        portable keying is downstream of anchoring the key. Magnets on a steel
        plate, a thigh strap, hook and loop onto the radio, a flat stone on the
        base — all of them work, and none of them work if you did not bring the
        part.
      </p>
      <p>
        There is an argument for a small straight key in cold weather that gets
        made less often than it should. Gloved fingers are clumsy at the fine
        side-to-side motion a paddle wants, and a knob you can hit with the
        whole hand is more forgiving. Your sending will be worse and the
        contacts will still happen. If you are undecided,{' '}
        <a href="/dispatches/straight-key-bug-paddle">
          the three key types are compared here
        </a>
        .
      </p>

      <h2>Logging: paper wins</h2>
      <p>
        A pencil writes in the rain, in the cold, upside down, and does not run
        out in a way that surprises you. Ink pens quit below freezing. A phone
        screen is unreadable in bright sun, unusable with wet fingers, and is
        also your map, your clock and your way of calling for help — spending
        its battery on logging twelve contacts is a poor trade.
      </p>
      <p>
        Write the callsign, the time, the band and the two reports. Nothing
        else. Transcribe it at home. Anyone who has tried to type a callsign
        into a phone while a station repeats it at 22 words per minute only
        tries it once.
      </p>

      <h2>Things people carry once and never again</h2>
      <p>
        A separate SWR and power meter, when the radio has one built in. A
        second antenna for conditions that never materialise. Spare coax. A
        laptop. A camp chair and folding table, both of which lose to a foam sit
        pad weighing eighty grams. A battery sized for a hundred watts, on a day
        when only CW got used. A soldering iron. A bag of adapters, nineteen of
        which stay in it forever. A tripod mast carried through a forest. A
        second radio, in case the first one failed, which it did not.
      </p>
      <p>
        The pattern is consistent: nearly everything on that list is insurance
        against a failure that has never happened, bought at a weight you pay
        every single trip.
      </p>

      <h2>Things people forget once and never again</h2>
      <p>
        A headlamp, because activations run past sunset and packing a wire
        antenna in the dark is miserable. Insulating tape and a spare connector.
        Something to sit on and something to keep the rain off the radio — foam
        and a bin liner, under two hundred grams together. Enough cord to tie
        the far end off somewhere other than where you first aimed. Gloves you
        can still send in. Water, layers and a way to tell someone where you
        are, which is not radio kit and is the only non-negotiable part of the
        list.
      </p>
      <p>
        And a card with your planned frequencies and times. Standing on a summit
        trying to remember which end of the band the activity is on wastes the
        twenty minutes of good propagation you walked two hours to reach. If the{' '}
        <a href="/dispatches/first-cw-qso">exchange itself</a> is still new,
        write that on the back of the same card. Nobody will see it and it will
        save you the first three contacts.
      </p>
    </>
  )
}
