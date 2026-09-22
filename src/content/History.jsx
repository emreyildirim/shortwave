
export default function History() {
  return (
    <>
      <h1>A SHORT HISTORY OF SHORTWAVE &amp; CW</h1>
      <p className="lede">
        Long before voices crossed the air, the radio spoke in dots and dashes.
      </p>

      <h2>The code</h2>
      <p>
        In the 1840s Samuel Morse and Alfred Vail gave the telegraph a language:
        dots and dashes that could be tapped down a wire. Vail did much of the
        practical work on the alphabet itself, and the pair demonstrated the
        finished system publicly on 24 May 1844, sending
        <em> What hath God wrought</em> from the Capitol in Washington to a
        railway depot in Baltimore. Within two decades wire ran across
        continents and under oceans, and the dot-dash alphabet was the only
        thing moving on it.
      </p>

      <h2>Two alphabets, one survivor</h2>
      <p>
        The code Morse and Vail built — American Morse, or railroad Morse — was
        not the code we use now. It had dashes of three different lengths and,
        worse, characters containing an internal pause: C was keyed as two dots,
        a gap, then a dot. On a clean land line with a skilled operator that
        worked well and was slightly faster than the alternative. On a long
        cable, on a noisy circuit, or later on a radio signal fading in and out,
        an ambiguous silence is indistinguishable from a letter break, and the
        errors piled up.
      </p>
      <p>
        In 1848 Friedrich Clemens Gerke reworked the alphabet for the
        Hamburg–Cuxhaven line, reducing it to two element lengths and one gap
        length with no internal pauses. The German-Austrian Telegraph Union
        adopted his version in 1851, and the International Telegraph Congress
        in Paris standardised a near-identical code in 1865. That is
        <strong> International Morse</strong>, still current and still
        maintained as an ITU recommendation. It won because it is unambiguous:
        every character is a solid run of elements, and the only silences that
        mean anything are the ones between characters and between words.
        American Morse hung on in North American railroad and press service into
        the middle of the twentieth century, then went quiet.
      </p>

      <h2>Spark, and then continuous wave</h2>
      <p>
        The first wireless transmitters were spark-gap sets. A spark does not
        produce a tone — it produces a damped burst of energy smeared across an
        enormous swathe of spectrum, heard in the receiver as a harsh buzz. It
        was loud, it was simple, and it was hopeless at sharing a band. Two
        spark stations within range of each other were two stations jamming each
        other.
      </p>
      <p>
        <strong>Continuous wave</strong> changed the arithmetic completely.
        Instead of a burst, the transmitter holds a single steady frequency and
        the key simply turns it on and off. The Poulsen arc and the Alexanderson
        alternator got there first, and the vacuum-tube oscillator made it
        cheap. Because all the power now sits in a narrow slice of spectrum, the
        receiver can throw away everything outside that slice, and a beat
        oscillator turns the bare carrier into a clean audio tone the ear can
        follow through noise that would bury anything else. A CW signal occupies
        a couple of hundred hertz where a voice signal needs some two and a half
        thousand. That is the entire reason CW gets through when nothing else
        does. Spark was prohibited for most services by international agreement
        in 1927 and had effectively disappeared during the 1930s.
      </p>

      <h2>Marconi, and across the Atlantic</h2>
      <p>
        Guglielmo Marconi filed his first wireless patent in 1896 and spent the
        following years pushing range for its own sake. On 12 December 1901 at
        Signal Hill in St John's, Newfoundland, he reported hearing the letter S
        — three dots — sent from Poldhu in Cornwall. The claim was contested at
        the time and is still argued over, since there was no recording, no
        independent witness, and the daytime path should not have supported the
        wavelength he was using. What is not in doubt is what followed:
        documented transatlantic transmissions from Glace Bay in Nova Scotia in
        1902, and a commercial transatlantic message service opened in 1907
        between Clifden in Ireland and Glace Bay. Long-distance wireless was a
        business within a decade of being a curiosity.
      </p>

      <h2>Why shortwave</h2>
      <p>
        Nobody could explain Marconi's results. Signals should travel in
        straight lines and the Earth curves away. In 1902 Oliver Heaviside and
        Arthur Kennelly independently proposed a conducting layer high in the
        atmosphere that bent the signal back down; Edward Appleton demonstrated
        it experimentally in the mid-1920s and later took a Nobel Prize for it.
        The <strong>ionosphere</strong> is real, it is layered, and it
        rearranges itself between day and night.
      </p>
      <p>
        The practical discovery came from amateurs. Regulation had pushed them
        onto the short wavelengths below 200 metres on the assumption that
        nothing useful happened there. In late 1923 a station in Nice and two in
        Connecticut worked each other across the Atlantic on roughly 110 metres,
        with power that the great longwave stations would have considered a
        rounding error. Commercial and government services moved within a few
        years: the enormous longwave installations were superseded by compact
        shortwave beam stations, and the high-frequency bands — roughly 3 to
        30 MHz, with the 160-metre band sitting just beneath them — became the
        backbone of long-distance communication for the rest of the century.
        Signals skip off the ionosphere and over the curve of the Earth, and a
        few watts into a wire antenna can cross an ocean. Navies, embassies,
        broadcasters and spies all built on that one fact.
      </p>

      <h2>Morse at sea</h2>
      <p>
        The distress signal <strong>SOS</strong> was agreed at the Berlin
        radiotelegraph convention of 1906 and came into force in 1908. It stands
        for nothing. It was chosen because, run together as a single character,
        its rhythm is unmistakable even through heavy interference.
      </p>
      <p>
        On the night of 14–15 April 1912 the Titanic's operators, Jack Phillips
        and Harold Bride, sent both the older CQD and the newer SOS. Ships close
        enough to help had no one on the headphones. The regulatory response was
        immediate and permanent: operator licensing and a continuous radio
        watch, written into United States law that same year and into the first
        international Safety of Life at Sea convention in 1914. Out of it came
        the discipline that governed maritime Morse for eighty years — 500 kHz
        as the calling and distress frequency, and twice an hour, at a quarter
        past and a quarter to, three minutes of enforced silence across the band
        while every station in range listened for someone in trouble. The
        <a href="/famous-messages"> famous messages</a> page collects the
        traffic that survived from that night and others.
      </p>

      <h2>The wartime fist</h2>
      <p>
        In the Second World War, signal-corps operators hunched over field sets
        in tents and trenches, copying Morse by ear under fire. Every operator
        had a recognisable <strong>fist</strong> — a personal rhythm in the
        keying, the particular weight given to a dash, the habitual hesitation
        before a difficult letter. Skilled listeners could tell who was sending
        from the cadence alone, and the Allied intercept service turned that
        into a method: operators at the listening stations logged the keying
        characteristics of individual enemy operators, which let analysts follow
        a unit across a change of callsign or a move to a new frequency. The
        content stayed encrypted; the handwriting gave the sender away. CW got
        through when nothing else would — weak, jammed, and buried in static.
      </p>

      <h2>The long decline</h2>
      <p>
        Single-sideband voice took over the point-to-point traffic from the
        1950s, radio teleprinters took the rest, and satellites removed the
        reason to bounce anything off the ionosphere at all. Maritime Morse held
        on longest and then went in one step: the Global Maritime Distress and
        Safety System was phased in through the 1990s and came fully into force
        on 1 February 1999, ending the requirement for a Morse watch at sea.
        Later that year the last commercial Morse station in the United States
        closed its own watch, signing off with Morse's 1844 message and the
        prosign SK — the one that means the conversation is over, not merely
        paused.
      </p>

      <h2>Still on the air</h2>
      <p>
        Amateur licensing kept a Morse test for most of a century, then dropped
        it: the international requirement went at the 2003 World
        Radiocommunication Conference, and the United States removed its last
        five-word-per-minute element in February 2007. The obvious prediction
        was that CW would follow the requirement into history. It did not. More
        people are learning it now than were learning it when it was compulsory,
        because the ones doing it chose to.
      </p>
      <p>
        They have reasons. A CW signal is narrow, so a receiver can filter down
        to a sliver of bandwidth and pull a readable note out of noise that
        would swallow a voice. The equipment is simple enough to build on a
        kitchen table. Low-power and portable operating live on it almost
        entirely. And there is a craft to it that a microphone cannot offer — a
        skill that takes months to acquire and never quite stops improving.
        There is more on that in
        <a href="/dispatches/why-cw-survives"> Why CW Refuses to Die</a>.
      </p>
      <p>
        Shortwave is a small tribute to that craft: a bakelite-and-brass field
        set you can key from a browser. If you want to actually learn the code
        rather than read about it, start at the
        <a href="/learn"> primer</a>.
      </p>
    </>
  )
}
