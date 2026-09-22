import { DefList } from './shared.jsx'

const PROSIGNS = [
  ['AR', '.-.-.',
    'End of message. The transmission is finished, though the contact may not be. Same element pattern as the plus sign, which is why AR is often written as a plus in logs and printed text.'],
  ['SK', '...-.-',
    'End of contact. The whole exchange is over and the operator is clearing. Also written VA, because the identical run of elements reads equally well as V followed by A. Two spellings, one sound.'],
  ['BT', '-...-',
    'Separator. Sent between the parts of a message, between a preamble and the text, or wherever a paragraph break would go on paper. Shares its pattern with the equals sign.'],
  ['KN', '-.--.',
    'Go ahead, named station only. Invites a reply from the station just called and asks everyone else to hold off. Reached for when a frequency is crowded or a third station keeps breaking in.'],
  ['K', '-.-',
    'Go ahead, anyone. Strictly a single letter rather than a run-together character, but it does procedural work and every operator treats it as a prosign.'],
  ['AS', '.-...',
    'Wait. Stand by a moment while the operator finds a pencil, checks a log, or deals with something off the air. Often followed by a number of minutes.'],
  ['BK', null,
    'Break. Used to interrupt, or to hand the transmission back and forth quickly without a formal turnover. Unlike the others it is normally sent as two separate letters, which is why it appears here without a solid pattern.'],
  ['HH', '........',
    'Error. Eight dots sent solid, meaning: scratch that, the last word or group was wrong and I am starting it again. Written HH because eight dots read as two H characters, but there is no gap in the middle.'],
]

const ABBREVIATIONS = [
  ['DE', null, 'From. Separates the station being called from the station sending. Straight out of French, and older than radio.'],
  ['R', null, 'Received, understood. It confirms that everything sent arrived intact. It does not mean yes.'],
  ['TU', null, 'Thank you. Usually near the end of a contact, often paired with 73.'],
  ['OM', null, 'Old man. Any male operator, regardless of age. Not an insult and not a comment on years.'],
  ['YL', null, 'Young lady. A female operator. XYL, for an operator wife, is the same joke extended.'],
  ['ES', null, 'And. Carried over from American Morse, where the ampersand was keyed in a way that reads as E followed by S in the international code.'],
  ['HI', null, 'Laughter. The dots of H and I run together into a chuckle at speed. It is the closest CW gets to a tone of voice.'],
  ['GM GA GE', null, 'Good morning, good afternoon, good evening. GA also means go ahead, so context decides which one you have just been handed.'],
  ['WX', null, 'Weather. A staple of ragchewing. Conditions on the band and conditions out of the window are related.'],
  ['RST', null, 'Signal report: readability, strength, tone.'],
  ['AGN', null, 'Again. Repeat what you just sent.'],
  ['PSE', null, 'Please. Vowels are expensive at twenty words a minute.'],
  ['CUL', null, 'See you later. The sign-off before the sign-off.'],
]

export default function Prosigns() {
  return (
    <>
      <h1>PROSIGNS &amp; ABBREVIATIONS</h1>
      <p className="lede">
        Two kinds of shorthand travel on a CW circuit, and operators mix them
        without thinking: procedural signals keyed as single run-together
        characters, and plain abbreviations keyed as ordinary letters.
      </p>

      <h2>The difference that matters</h2>
      <p>
        An <strong>abbreviation</strong> is just text, shortened. TU for thank
        you is sent as two separate letters with the usual three-unit gap
        between them, exactly the spacing you would use inside any word. A
        <strong> prosign</strong> is a procedural signal, and it is keyed as one
        character: the letters run together with only the one-unit gap that
        separates dots from dashes inside a letter, and no letter gap at all.
        AR is not A and then R. It is nine elements arriving as a single shape,
        and a trained ear hears one sound rather than two.
      </p>
      <p>
        In print the difference is marked with a bar drawn across the top of the
        letters, because there is no other way to show that a gap is missing.
        Where the typography will not allow a bar, operators put the letters in
        brackets or simply run them together and trust the reader. Anything
        listed below as a prosign is keyed solid.
      </p>
      <p>
        One consequence is that several prosigns collide with punctuation, since
        the element pattern is identical. AR is a plus sign, BT an equals sign,
        KN an opening bracket, AS an ampersand. An automatic decoder with no
        sense of context will print the punctuation and be technically correct.
        Operators tell them apart by position: an equals sign in the middle of a
        message is a break, not arithmetic.
      </p>

      <h2>Calling and answering</h2>
      <p>
        Almost every contact opens the same way. <strong>CQ</strong> is a general
        call, meaning any station at all, please answer. It is not an acronym.
        The usual account traces it to landline telegraphy in France, where a
        general-call prefix derived from <em>securite</em> was taken over by
        English-speaking operators as CQ. A call runs CQ CQ CQ DE and then your
        callsign, twice or three times, then K.
      </p>
      <p>
        <strong>DE</strong> means from. It separates the station being called
        from the station sending, and it is the one word of French that every
        operator in the world knows. <strong>K</strong> invites anyone to
        transmit. <strong>KN</strong> narrows the invitation to one station:
        go ahead, the station I just named, and nobody else.
      </p>
      <p>
        Asking who is calling you is Q-code business rather than prosign
        business. QRZ, set out on the <a href="/q-codes">Q codes</a> page, asks
        exactly that, and it turns up constantly at the end of a contact when an
        operator wants to know who else is waiting. In practice a run of CQ, an
        answer, DE, two callsigns and K or KN is the entire opening ritual, and
        you will hear it a thousand times before you hear anything unusual.
      </p>

      <h2>The prosigns</h2>
      <DefList items={PROSIGNS} />
      <p>
        Not every operator sends a clean eight dots for an error. Under pressure
        the signal degrades into a rapid string of dots, and any competent
        receiving operator understands it just the same. That tolerance is
        typical of CW procedure: it exists to be understood, not to be marked.
      </p>

      <h2>SOS and CQD</h2>
      <p>
        SOS is the most misunderstood string in radio. It does not stand for
        save our souls, save our ship, or send out succour. Those readings were
        invented afterwards, to make a memorable pattern easier to remember. The
        signal was agreed at the Berlin radiotelegraphic conference in 1906 and
        came into international force in 1908 for one reason only: keyed as a
        single run-together character, three dots, three dashes, three dots with
        no gaps anywhere, it is unmistakable. Nine elements, perfectly
        symmetrical, shaped like nothing else on the band. Its outline survives
        even when individual elements are lost to static.
      </p>
      <p>
        Before SOS the Marconi company ran its own distress call,
        <strong> CQD</strong>: the general call CQ with a D for distress on the
        end, introduced in 1904. It is not come quick danger. That is another
        invention after the fact. Marconi operators were slow to give the old
        call up, and ships carried both for years, which is why the distress
        traffic described on the <a href="/famous-messages">famous messages</a>
        {' '}page opens in CQD and shifts to SOS partway through the night.
      </p>

      <h2>Numbers and courtesies</h2>
      <p>
        <strong>73</strong> means best regards and closes almost every contact.
        It is not modern shorthand. It comes from the numeral codes used on
        nineteenth-century American landline telegraphy, where a two-digit
        number stood in for a stock phrase to save time on the wire. Most of
        that code died with the landlines. 73 outlived all of it.
        <strong> 88</strong>, from the same source, means love and kisses, and
        goes to someone you actually know.
      </p>
      <p>
        Because 73 is already a complete phrase, 73s and best 73 are redundant,
        and old hands will notice. Send 73. One number, no plural.
      </p>
      <p>
        <strong>RST</strong> is a signal report: readability from 1 to 5,
        strength from 1 to 9, tone from 1 to 9. A perfect CW report is 599, and
        in contests it is sent regardless of what is actually being heard.
        Outside a contest an honest 449 is far more useful than a polite 599,
        because it tells the other operator their signal is weak and their note
        is rough, which may be the only feedback they get all year.
      </p>

      <h2>Abbreviations you will hear</h2>
      <DefList items={ABBREVIATIONS} />

      <h2>When to bother</h2>
      <p>
        None of this is compulsory. You can hold a contact in plain English and
        be understood perfectly well, and a slow operator sending clear text is
        better company than a fast one sending soup. But the shorthand exists
        because CW is slow and conditions are hostile: every character you do
        not send is a character that cannot be lost to fading or wiped out by a
        crash of static. Work through the timing on the <a href="/learn">learn</a>
        {' '}page first, then key a few of these on the station. AR and SK are
        worth having in your fist before your first contact.
      </p>
    </>
  )
}
