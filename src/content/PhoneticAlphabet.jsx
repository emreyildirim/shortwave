import { DefList } from './shared.jsx'
import { MORSE } from '../data/morse.js'

const NATO = [
  ['A', 'Alfa', 'AL FAH'],
  ['B', 'Bravo', 'BRAH VOH'],
  ['C', 'Charlie', 'CHAR LEE or SHAR LEE'],
  ['D', 'Delta', 'DELL TAH'],
  ['E', 'Echo', 'ECK OH'],
  ['F', 'Foxtrot', 'FOKS TROT'],
  ['G', 'Golf', 'GOLF'],
  ['H', 'Hotel', 'HOH TELL'],
  ['I', 'India', 'IN DEE AH'],
  ['J', 'Juliett', 'JEW LEE ETT'],
  ['K', 'Kilo', 'KEY LOH'],
  ['L', 'Lima', 'LEE MAH'],
  ['M', 'Mike', 'MIKE'],
  ['N', 'November', 'NO VEM BER'],
  ['O', 'Oscar', 'OSS CAH'],
  ['P', 'Papa', 'PAH PAH'],
  ['Q', 'Quebec', 'KEH BECK'],
  ['R', 'Romeo', 'ROW ME OH'],
  ['S', 'Sierra', 'SEE AIR RAH'],
  ['T', 'Tango', 'TANG GO'],
  ['U', 'Uniform', 'YOU NEE FORM or OO NEE FORM'],
  ['V', 'Victor', 'VIK TAH'],
  ['W', 'Whiskey', 'WISS KEY'],
  ['X', 'X-ray', 'ECKS RAY'],
  ['Y', 'Yankee', 'YANG KEY'],
  ['Z', 'Zulu', 'ZOO LOO'],
]

const ABLE_BAKER = [
  ['A', 'Able', 'Alfa'], ['B', 'Baker', 'Bravo'], ['C', 'Charlie', 'Charlie'],
  ['D', 'Dog', 'Delta'], ['E', 'Easy', 'Echo'], ['F', 'Fox', 'Foxtrot'],
  ['G', 'George', 'Golf'], ['H', 'How', 'Hotel'], ['I', 'Item', 'India'],
  ['J', 'Jig', 'Juliett'], ['K', 'King', 'Kilo'], ['L', 'Love', 'Lima'],
  ['M', 'Mike', 'Mike'], ['N', 'Nan', 'November'], ['O', 'Oboe', 'Oscar'],
  ['P', 'Peter', 'Papa'], ['Q', 'Queen', 'Quebec'], ['R', 'Roger', 'Romeo'],
  ['S', 'Sugar', 'Sierra'], ['T', 'Tare', 'Tango'], ['U', 'Uncle', 'Uniform'],
  ['V', 'Victor', 'Victor'], ['W', 'William', 'Whiskey'], ['X', 'X-ray', 'X-ray'],
  ['Y', 'Yoke', 'Yankee'], ['Z', 'Zebra', 'Zulu'],
]

export default function PhoneticAlphabet() {
  return (
    <>
      <h1>PHONETIC ALPHABET</h1>
      <p className="lede">
        Alfa through Zulu with the pronunciations that are part of the standard,
        and the Able Baker set the Second World War was fought with.
      </p>

      <h2>Why a spelling alphabet exists</h2>
      <p>
        Voice radio is far worse at carrying letters than it is at carrying
        words. B, C, D, E, G, P, T, V and Z all share the same vowel and differ
        only in a brief consonant at the front — exactly the part that a narrow
        channel, a burst of noise or a cheap microphone destroys first. M and N
        are barely separable at any distance. The fix is to replace each letter
        with a whole word, chosen so that no two words in the set can be
        confused even when half of each one is missing.
      </p>
      <p>
        That is a harder design problem than it looks. The words have to be
        distinct from one another, pronounceable by people who share no
        language, resistant to being clipped at either end, and free of any
        meaning that could be mistaken for part of a message.
      </p>

      <h2>The modern alphabet</h2>
      <p>
        The set below is the ICAO alphabet, adopted for civil aviation and taken
        up by NATO, the ITU and the maritime services, which is why it answers
        to several names for the same twenty-six words. The pronunciation is
        part of the standard rather than a suggestion: the official tables print
        the syllables and the stress alongside each word, because a word
        pronounced in a national accent stops doing its job. The Morse for each
        letter is given beside it.
      </p>
      <DefList
        items={NATO.map(([l, word, say]) => [
          l, MORSE[l], <><strong>{word}</strong> — spoken {say}</>,
        ])}
      />

      <h2>Alfa, Juliett and the deliberate misspellings</h2>
      <p>
        Two of those words are spelled wrong on purpose. <strong>Alfa</strong> is
        not Alpha because the combination ph is not read as an f sound outside
        English and a handful of other languages; a French or Spanish speaker
        reading Alpha off a printed card may well produce something with a p in
        it. <strong>Juliett</strong> carries a second t because a French speaker
        reading Juliet would treat the final consonant as silent, and a silent
        letter is the one thing a spelling alphabet cannot tolerate.
      </p>
      <p>
        The same reasoning runs through the whole list. Every word has at least
        two syllables except Golf and Mike, so that losing the start or the end
        of a transmission still leaves something identifiable. No two of them
        rhyme. The stress patterns differ from one to the next. Several are
        proper nouns recognisable across a lot of the world, which helps a
        listener guess at a word they only half heard.
      </p>
      <p>
        Digits get the same treatment in the aviation version: three is spoken
        <em> tree</em>, four <em>fower</em>, five <em>fife</em>, nine
        <em> niner</em>. Nine gains a syllable partly for length and partly
        because the bare word is close to the German <em>nein</em>. The maritime
        service has its own number words again — nadazero, unaone, bissotwo and
        the rest — which are correct, official, and rarely heard outside formal
        traffic.
      </p>

      <h2>Able Baker</h2>
      <p>
        The alphabet of the Second World War was a different list entirely. The
        US joint Army and Navy alphabet, universally called
        <strong> Able Baker</strong> after its first two words, was adopted in
        1941; British forces took it up in 1943 so that combined operations
        would run on one vocabulary instead of two. It is the set in the period
        recordings, in the wartime signals manuals, and in every war film made
        since. Modern equivalents are shown alongside.
      </p>
      <DefList
        items={ABLE_BAKER.map(([l, old, now]) => [
          l, null, <><strong>{old}</strong> — now {now}</>,
        ])}
      />
      <p>
        Only four words came through the changeover untouched: Charlie, Mike,
        Victor and X-ray. Everything else was replaced.
      </p>
      <p>
        Able Baker also left one word permanently in the language. On a circuit,
        R meant <em>received</em> — it still does in CW, as the
        <a href="/prosigns"> prosigns</a> page sets out — and because R was
        Roger, <strong>roger</strong> became the voice acknowledgement and
        stayed there long after the alphabet that produced it was retired.
        Wilco, short for will comply, is a separate word meaning something else
        entirely, which is why roger wilco is a redundancy rather than a
        procedure.
      </p>

      <h2>Before Able Baker</h2>
      <p>
        The British had their own sets earlier, and they are worth a look
        because they show how local these lists used to be. Signallers in the
        First World War used a spoken alphabet built around the letters that
        caused the most trouble on a field telephone: ack for A, beer for B,
        emma for M, pip for P, toc for T, esses for S, vic for V. The habit
        escaped the signal service entirely. <em>Ack emma</em> and <em>pip
        emma</em> served as morning and afternoon for a generation, and Talbot
        House, the soldiers' rest house behind the Ypres salient, was known as
        Toc H for the rest of the century.
      </p>
      <p>
        The RAF ran a longer alphabet of its own through the interwar years and
        into the early part of the war, mixing plain first names and place names
        with those older signalese words. It worked well enough inside one
        service and one language, which was the limit of what anybody was asking
        of it, and it gave way to Able Baker in 1943.
      </p>

      <h2>Why one alphabet</h2>
      <p>
        Able Baker was excellent for English speakers and poor for everyone
        else. Latin American aviation used a Spanish-language alphabet instead,
        so an aircraft crossing between regions changed vocabulary in mid-flight
        — which is precisely the kind of thing that kills people in bad weather.
        After the war ICAO commissioned linguistic research into a single list
        that would survive being spoken by people whose first languages had
        nothing in common, and candidate words were tested with speakers of many
        different languages, under noise, over real circuits, listening to each
        other.
      </p>
      <p>
        A first version was published in 1951 and ran into trouble almost
        immediately: several of its words proved fragile in practice and were
        replaced. The revised alphabet came into effect on 1 March 1956, NATO
        adopted it, the ITU followed before the decade was out and the maritime
        world came in behind. That is why one list now covers air traffic
        control, shipping, armies, emergency services and amateur radio alike,
        and why Alfa Bravo Charlie is understood in a tower anywhere on earth.
      </p>

      <h2>Phonetics on CW</h2>
      <p>
        You do not spell phonetically in Morse. Every letter already has its own
        unmistakable pattern, so sending Alfa would mean keying four characters
        to convey one — the opposite of the point. When a callsign or a word
        fails to get through, a CW operator simply repeats it, often twice and
        sometimes slower, or sends AGN to ask for a repeat. The nearest CW
        equivalent of switching to phonetics is abandoning cut numbers: contest
        operators shorten digits to save time, sending T for zero and N for
        nine, and when accuracy matters they go back to the full figures.
      </p>
      <p>
        Phonetics belong to voice. The moment an operator moves from CW to
        sideband on the same band, callsigns come out as Kilo Six Zulu and the
        alphabet earns its keep again. For the letters themselves the
        <a href="/morse-code-chart"> chart</a> has all of them, and the
        <a href="/learn"> learn</a> page covers the timing that makes them
        readable by ear.
      </p>
    </>
  )
}
