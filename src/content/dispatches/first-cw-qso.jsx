import { Code, DefList } from '../shared.jsx'

export default function FirstCwQso() {
  return (
    <>
      <p>
        Almost nobody's first contact goes badly because they did not know the
        code. It goes badly because they knew the code and not the script.
        Somebody answers, there is a tone in the headphones with your callsign
        in front of it, and the question stops being <em>what are those
        letters</em> and becomes <em>what am I supposed to say now</em>. Below
        is the whole answer: one complete contact, written out uninterrupted and
        then taken apart line by line. The callsigns are invented for the
        example. Everything else is what actually gets sent.
      </p>

      <h2>Before you key anything</h2>
      <p>
        Find a clear frequency and listen for a good thirty seconds. Then ask:
        <strong> QRL?</strong> — is this frequency in use. If somebody is there
        but too weak to hear, they come back with <strong>C</strong> or just
        their call, and you move. Nothing after a second ask and it is yours.
      </p>
      <p>
        Two more things. Send at the speed you can <em>receive</em>, not the
        speed you can send — a brisk CQ invites a brisk answer and you will have
        nobody to blame. And zero-beat the station you are answering: tune until
        his note sits at the same pitch as your sidetone. Calling 400 Hz off the
        mark is the most common beginner mistake, and on a busy band it means he
        never hears you at all.
      </p>

      <h2>The contact</h2>
      <p><strong>CQ CQ CQ DE K6Z K6Z K6Z K</strong></p>
      <p><strong>K6Z DE W7XY W7XY K</strong></p>
      <p>
        <strong>
          W7XY DE K6Z = GE OM ES TNX FER CALL = UR RST 579 579 = QTH SAN DIEGO
          CA = OP JIM JIM = HW CPY? = W7XY DE K6Z KN
        </strong>
      </p>
      <p>
        <strong>
          K6Z DE W7XY = R FB JIM ES GE = UR RST 559 559 = QTH BOISE ID = OP DAVE
          DAVE = RIG 40 W ES ANT DIPOLE UP 30 FT = HW? = K6Z DE W7XY KN
        </strong>
      </p>
      <p>
        <strong>
          W7XY DE K6Z = R TNX FER RPRT DAVE = RIG HR 5 W ES ANT EFHW IN A TREE =
          WX SUNNY 22 C = FB QSO ES TNX = 73 ES HPE CUL = W7XY DE K6Z KN
        </strong>
      </p>
      <p>
        <strong>
          K6Z DE W7XY = R TNX JIM = QSL VIA LOTW = 73 ES GL = SK K6Z DE W7XY E E
        </strong>
      </p>
      <p><strong>E E</strong></p>

      <h2>Line by line</h2>
      <p><strong>CQ CQ CQ DE K6Z K6Z K6Z K</strong></p>
      <p>
        CQ is the general call — <em>any station, please answer</em>. DE is
        French for "from", and the call after it is the sender's. The
        three-and-three shape is not arbitrary: somebody tuning across the band
        has to land in the middle of your call and still catch enough of it to
        answer. Two repeats is too few, six is long enough that people tune
        past. The closing <strong>K</strong> means "go ahead", addressed to
        nobody in particular. Send that block twice, listen ten seconds, send it
        again. Three unanswered rounds and the band is telling you something.
      </p>
      <p><strong>K6Z DE W7XY W7XY K</strong></p>
      <p>
        The answer, and the shape is deliberate. His call twice, mine once. The
        rule of thumb is to send the other station's callsign as few times as it
        takes to get his attention and your own as many times as it takes to be
        copied correctly — he already knows who he is. On a quiet band one and
        two is plenty. In a pileup you send nothing but your own call, once, and
        then shut up and listen.
      </p>
      <p><strong>W7XY DE K6Z = GE OM ES TNX FER CALL ...</strong></p>
      <p>
        The first real transmission, and every piece of it earns its place. The
        <strong> =</strong> is the prosign BT, <Code c="-...-" />, keyed as one
        run-together character: a separator, the CW equivalent of a paragraph
        break, doubling as breathing room for whoever is writing this down.
        <strong> GE</strong> is good evening; GM and GA do morning and
        afternoon. <strong>OM</strong> is "old man", the standard address to a
        male operator of any age whatsoever, with <strong>YL</strong> the
        equivalent for a woman. <strong>ES</strong> is "and",
        <strong> TNX FER</strong> is thanks for, <strong>UR</strong> is your.
      </p>
      <p>
        <strong>RST</strong> is the signal report and it is three separate
        scales: Readability 1 to 5, Strength 1 to 9, Tone 1 to 9. 579 says
        perfectly readable, moderately strong, a pure note with no hum or chirp.
        Almost everyone sends 599 out of reflex, which is a courtesy rather than
        a measurement. Send what you actually observe and you will be a more
        useful correspondent than most of the band. <strong>QTH</strong> is
        location, <strong>OP</strong> introduces the operator's name, and
        <strong> HW CPY?</strong> asks how well you are being copied.
      </p>
      <p>
        The closing <strong>KN</strong>, <Code c="-.--." />, matters more than
        it looks. K invites anybody to transmit. KN invites only the station you
        just named. Use KN once you are in a contact and you will lose fewer of
        them to a third operator wandering in.
      </p>
      <p><strong>K6Z DE W7XY = R FB JIM ES GE = UR RST 559 559 ...</strong></p>
      <p>
        The same shape coming back, which is the point — hear one of these and
        you have heard the structure of nearly all of them. <strong>R</strong>{' '}
        is roger, "I received all of that", a claim about copy and not about
        agreement. <strong>FB</strong> is fine business: good, well done. His
        report to me is 559, so I am readable and clean but weaker than he is.
        Then rig, power and antenna, the usual third leg of a first exchange and
        the part most operators actually want to hear.
      </p>
      <p><strong>W7XY DE K6Z = R TNX FER RPRT DAVE = RIG HR 5 W ...</strong></p>
      <p>
        <strong>RPRT</strong> is report, <strong>HR</strong> is here,
        <strong> WX</strong> is weather, <strong>HPE CUL</strong> is hope to see
        you later. This is the fork in the road: keep going and you have a
        ragchew, which can run an hour, or say 73 and close. Neither is rude.
      </p>
      <p><strong>K6Z DE W7XY = R TNX JIM = QSL VIA LOTW = 73 ...</strong></p>
      <p>
        <strong>QSL</strong> here means "I will confirm this contact", and LoTW
        is the electronic logbook most operators use for it.
        <strong> 73</strong> is best regards — already plural, so "73s" is a
        small tell. <strong>SK</strong>, <Code c="...-.-" />, is end of contact,
        and is not interchangeable with AR, <Code c=".-.-." />, which only ends
        a message. Then <strong>E E</strong>: two bare dits, the traditional
        wave goodbye, answered by two more from the other end. It is the one
        piece of the exchange with no information in it at all, and nobody has
        proposed dropping it.
      </p>

      <h2>Every abbreviation, expanded</h2>
      <DefList
        items={[
          ['QRL?', null, 'Is this frequency in use. Ask before you call, always.'],
          ['CQ / DE', null, 'A general call to anyone / from. The callsign after DE is the sender.'],
          ['K', '-.-', 'Go ahead — any station may reply.'],
          ['KN', '-.--.', 'Go ahead — only the station I named.'],
          ['BT ( = )', '-...-', 'Separator between thoughts. One character.'],
          ['AR', '.-.-.', 'End of message. Not the end of the contact.'],
          ['SK', '...-.-', 'End of contact.'],
          ['R', '.-.', 'Roger — received and understood.'],
          ['RST', null, 'Readability 1-5, Strength 1-9, Tone 1-9.'],
          ['QTH', null, 'My location is / what is your location.'],
          ['QRS / QRQ', null, 'Send slower / faster. QRS is the one you will need.'],
          ['QSB / QRM / QRN', null, 'Fading / station interference / atmospheric noise.'],
          ['OM / YL', null, 'Address for a male / female operator.'],
          ['ES / FER / UR / HR', null, 'And / for / your / here.'],
          ['TNX / TU / FB', null, 'Thanks / thank you / fine business, meaning good.'],
          ['HW? / PSE / AGN', null, 'How am I being copied / please / again.'],
          ['QSL', null, 'I acknowledge, or I will confirm the contact.'],
          ['73 / GL / CUL', null, 'Best regards / good luck / see you later.'],
        ]}
      />
      <p>
        The full set lives on the <a href="/prosigns">prosigns page</a> and the
        <a href="/q-codes"> Q code page</a>, and it is worth reading both once
        before your first call rather than during it.
      </p>

      <h2>What will actually go wrong</h2>
      <p>
        <strong>He sends faster than you can copy.</strong> Send
        <strong> PSE QRS</strong>. Most operators drop five words per minute
        immediately and without comment, because most operators have been you.
      </p>
      <p>
        <strong>You miss his callsign.</strong> Send
        <strong> PSE UR CALL AGN</strong>. Losing a call in the noise is an
        ordinary event, not a failure, and it happens to people with thirty
        years on the band.
      </p>
      <p>
        <strong>Two stations answer at once.</strong> Send the two or three
        letters you are certain of with a question mark —
        <strong> W7? AGN</strong> — and the right one comes back while the other
        waits. Never guess a whole callsign.
      </p>
      <p>
        <strong>He fades out mid-sentence.</strong> That is QSB. Wait thirty
        seconds before calling into the gap. It usually comes back.
      </p>

      <h2>The short version</h2>
      <p>
        Everything above compresses. In a contest the entire contact is two
        transmissions: <strong>K6Z DE W7XY 5NN ID K</strong> and
        <strong> TU 5NN CA K6Z K</strong> — where 5NN is 599 with the nines cut
        to N to save a fraction of a second. Four seconds, and it counts for
        exactly as much in the log as the long one.
      </p>
      <p>
        Learn the long version first anyway. It teaches you the shape the short
        one abbreviates, and the shape is what you are after. Run the whole
        exchange against the <a href="/morse-trainer">trainer</a> until the
        abbreviations arrive as sounds rather than puzzles, and if you are still
        counting dots when they do, that is a separate problem with a separate
        fix — see{' '}
        <a href="/dispatches/breaking-the-plateau">
          breaking the 10 WPM plateau
        </a>
        .
      </p>
    </>
  )
}
