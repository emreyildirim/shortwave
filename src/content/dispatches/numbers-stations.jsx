import { DefList } from '../shared.jsx'

export default function NumbersStations() {
  return (
    <>
      <p>
        Tune across the shortwave bands for long enough and you will eventually
        find a voice reading numbers. Usually a woman, usually flat and
        unhurried, sometimes synthesised, reading digits in groups of five for
        twenty or forty minutes and then stopping. No station identification you
        can look up, no explanation, no acknowledgement that anyone is listening.
        They have been doing it for decades. A great deal is known about them and
        a great deal more is asserted, and the two sets overlap less than the
        internet suggests.
      </p>

      <h2>What a transmission actually sounds like</h2>
      <p>
        The format is consistent across stations and across decades, and it is
        not mysterious. Usually an interval signal — a few bars of music, a
        repeated tone, a spoken callword — running for some minutes so a
        listener can find the frequency. Then an identifier, often a
        three-figure group repeated. Then a count of how many groups are coming.
        Then the groups, read at dictation speed and very often read twice. Then
        an ending word and silence.
      </p>
      <p>
        Every piece of that is ordinary radiotelegraph message procedure of the
        period. An interval signal to acquire the frequency, an address, a group
        count so the recipient can tell whether anything was lost in a fade,
        repetition for redundancy over a noisy channel, a defined end. It is the
        same discipline that governed maritime and military traffic. Nothing
        about the mechanics needs explaining. Only the context does.
      </p>

      <h2>The documented record</h2>
      <p>
        Hobbyist monitors have logged these transmissions systematically for
        decades — frequencies, schedules, formats, changes — and much of that
        record is public. The volunteer ENIGMA classification scheme gives each
        station a letter for the kind of transmission and a number: E for an
        English voice, G for German, S for Slavic, V for other languages, M for
        Morse, X for digital. A compilation of recordings released commercially
        in 1997 put a large archive in public hands. This is the least contested
        part of the subject: the broadcasts exist, they are on tape, and their
        behaviour over time is documented.
      </p>
      <DefList
        items={[
          [
            'Lincolnshire Poacher',
            null,
            'Classified E03. An English female voice reading five-figure groups, introduced by two bars of the folk tune it is named for. Logged from roughly the mid-1970s until 2008, when it stopped. Monitors placed the transmitter in Cyprus by direction finding; no government has confirmed it. A sister station using the tune Cherry Ripe ran Far East schedules and ended around the same time.',
          ],
          [
            'UVB-76, The Buzzer',
            null,
            'A repetitive buzzing tone on 4625 kHz, documented since at least the early 1980s and still transmitting. Occasionally the buzz stops and a Russian voice reads a callword followed by names and groups. The identifier comes from an early announcement; others have been logged since. Direction finding places it in Russia. No official statement of purpose has ever been made.',
          ],
          [
            'HM01',
            null,
            'A Cuban hybrid transmission monitored since around 2009, alternating spoken Spanish digit groups with segments of digital data. It succeeds a family of Spanish-language voice stations logged for decades.',
          ],
          [
            'The Morse ones',
            null,
            'Voice gets the attention, but much of the same traffic has always gone out in Morse and, more recently, in digital modes. The format is identical. Only the modulation changed.',
          ],
        ]}
      />

      <h2>The one piece of hard evidence</h2>
      <p>
        Most attribution in this field is inference. There is one category that
        is not, and it is worth being precise about: numbers-station traffic has
        been entered into evidence in criminal proceedings.
      </p>
      <p>
        In the United States federal prosecution of a Cuban intelligence network
        in Miami, decided in 2001, the government produced decrypted shortwave
        numbers messages in court, having recovered the means to decrypt them
        during searches. In a later Washington case, in 2009, a couple who
        pleaded to acting as agents of Cuba were described in the charging
        documents as having received instructions by coded shortwave
        transmission. Those are public court records, not anyone's theory, and
        they establish beyond argument that at least one family of these
        stations was an operational intelligence channel working exactly the way
        the obvious reading suggests.
      </p>
      <p>
        What those cases do not establish is anything at all about any other
        station. Evidence about one transmitter is evidence about one
        transmitter.
      </p>

      <h2>Why a broadcast of digits is a sensible design</h2>
      <p>
        The cryptography is the easy part to explain, and explaining it removes
        most of the mystique.
      </p>
      <p>
        A <strong>one-time pad</strong> is a key of truly random digits, as long
        as the message, used once and then destroyed. Claude Shannon proved in
        1949 that such a cipher has perfect secrecy: the ciphertext reveals
        nothing about the plaintext except its length, no matter how much
        computing power an attacker has. It is the only cipher with that
        property and the constraints are the price of it.
      </p>
      <p>
        In manual practice the plaintext is converted to digits with a small
        substitution table, then the pad digits are added one at a time modulo
        ten, without carrying. The recipient subtracts. The output is a string
        of digits — which is why the traffic is digits — broken into groups of
        five because that is what telegraph operators have always done to keep
        count. There is no cleverness in the format at all.
      </p>
      <p>
        The channel choice follows from one property that is easy to overlook:
        <strong> the recipient never transmits</strong>. A listener with a radio
        emits nothing. There is no signal to direction-find, no callback, no
        registration, no account. Every other way of delivering a message —
        dead drops, couriers, telephones, the internet — creates something
        somewhere that can be watched. A shortwave receiver creates nothing.
      </p>
      <p>
        The rest reinforces it. HF crosses continents without infrastructure
        inside the target country, so there is no domestic system to compromise
        and no metadata to subpoena. Broadcasting in the open to everybody
        conceals which of the millions of people in range the message is for, so
        traffic analysis yields nothing. A human voice reading digits slowly,
        twice, gets through fading that would defeat most data schemes of the
        era, and needs no equipment at the receiving end beyond ears, paper and
        a pencil. And because the cipher is a one-time pad, interception is
        worthless; the only useful thing to seize is the pad, which can be
        printed small enough to swallow.
      </p>
      <p>
        That is also the answer to the question of why any of this survived the
        arrival of the internet. Nothing about the argument depended on the
        1960s. It depended on the receiver being silent, and it still is. The
        <a href="/dispatches/reading-the-bands"> physics that carries a
        shortwave signal across an ocean</a> has not changed either.
      </p>

      <h2>Where the evidence stops</h2>
      <p>
        <strong>Well established.</strong> The transmissions exist and are
        recorded. The formats are consistent and documented by decades of
        independent monitoring. At least one station family was an intelligence
        channel, proved in court.
      </p>
      <p>
        <strong>Reasonable inference.</strong> That these are state operations
        in general. The transmitter power, the schedule discipline maintained
        across decades, the frequency management and the sites themselves are
        beyond hobbyists or broadcasters, and no other kind of organisation has
        been proposed that could do it.
      </p>
      <p>
        <strong>Not established, whatever you have read.</strong> Which agency
        operates any given station, in nearly every case. Enthusiast direction
        finding produces informed estimates of location, which is not
        confirmation of ownership and is not knowledge of purpose. The content
        of any message not decrypted with a recovered pad is unknown and, if the
        procedure was followed properly, unknowable.
      </p>
      <p>
        <strong>Folklore.</strong> That the Buzzer is a trigger for an automatic
        retaliatory system has no evidence behind it and does not fit the
        station's observed behaviour. Reading world events into changes of
        schedule is pattern-seeking of the purest kind: a station transmitting
        continuously for forty years will always have done something unusual
        near any date you choose to test. Claims about submarines belong to a
        different and well-documented problem with a well-documented solution at
        far lower frequencies. And the idea that all this ended with the Cold War
        is simply wrong — several stations are transmitting today, on schedules
        anyone can check with a receiver.
      </p>
      <p>
        A last piece of honesty in the other direction. Not every odd digit
        transmission on HF is espionage. Plenty of what gets posted as a numbers
        station is a channel marker, a frequency-management transmission, a
        military exercise or a misidentified utility service. The bands are full
        of things that are strange without being secret, which is a good
        description of <a href="/history">shortwave in general</a> and of the{' '}
        <a href="/famous-messages">traffic that came off it</a>.
      </p>
    </>
  )
}
