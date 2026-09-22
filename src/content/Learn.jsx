import { MORSE } from '../data/morse.js'
import { Code, MorseTable, DIGITS } from './shared.jsx'

export default function Learn() {
  return (
    <>
      <h1>LEARN MORSE CODE</h1>
      <p className="lede">
        Morse is just two sounds — a short <em>dit</em> and a long <em>dah</em> —
        arranged into letters. Here's everything you need to start sending.
      </p>

      <h2>Dots, dashes &amp; timing</h2>
      <p>
        Every character is built from <strong>dots</strong> (•) and
        <strong> dashes</strong> (▬), and the whole system is measured against a
        single unit of time. A dot lasts <strong>1 unit</strong>. A dash lasts
        <strong> 3 units</strong>. The gap between symbols inside a character is
        <strong> 1 unit</strong>, the gap between characters is
        <strong> 3 units</strong>, and the gap between words is
        <strong> 7 units</strong>. That is the entire specification. There is
        nothing else to know about the structure of the code.
      </p>
      <p>
        Speed is nothing more than how long that unit lasts. The convention
        measures it against the word <strong>PARIS</strong>, which comes to
        exactly fifty units including the word space that follows it — so a
        station sending PARIS twenty times a minute is running twenty words per
        minute. That gives one formula worth remembering:
        <strong> unitMs = 1200 / wpm</strong>.
      </p>
      <p>
        Work it through. At 20 WPM the unit is 60 milliseconds. A dot is 60 ms,
        a dash 180 ms, the gap inside a character 60 ms, the gap between
        characters 180 ms, and the gap between words 420 ms. Now key
        <strong> CQ</strong>. The letter C is <Code c="-.-." /> — dash, gap, dot,
        gap, dash, gap, dot, which is 3 + 1 + 1 + 1 + 3 + 1 + 1 = 11 units, or
        660 ms. Q is <Code c="--.-" /> — 13 units, 780 ms. Add the three-unit
        gap between them and the call is 27 units: 1.62 seconds. Drop to 5 WPM
        and the unit stretches to 240 ms, so the same two letters take 6.48
        seconds. The proportions never move. Only the clock does.
      </p>
      <p>
        In Shortwave you don't measure any of this yourself. A quick tap
        registers as a dot, a longer hold as a dash, and a short pause commits
        the letter. But knowing the ratios matters, because every good practice
        method is built on deliberately breaking one of them.
      </p>

      <h2>Farnsworth spacing</h2>
      <p>
        The obvious way to make Morse easier for a beginner is to slow it down.
        It is also the wrong way. Slow the unit and you do not get an easier
        version of the same letter — you get a different sound. At 5 WPM
        <Code c="...-" /> is four separate events with long silences between
        them, and the only way to identify it is to count. At 18 WPM it is a
        single rhythmic shape, <em>di-di-di-dah</em>, that you recognise the way
        you recognise a spoken syllable. Those are two different skills, and
        only one of them scales.
      </p>
      <p>
        <strong>Farnsworth spacing</strong> is the fix. Characters are sent at
        full speed — 18 or 20 WPM, fast enough that each one has a rhythm — and
        the gaps between characters and words are stretched until the overall
        rate drops to something a beginner can follow. You might hear characters
        at 20 WPM with enough padding that the message crawls along at 8 WPM
        overall. The extra silence is thinking time, and thinking time is the
        one thing that should get shorter as you improve. When it does, you
        close the gaps and the characters are already at speed. Nothing has to
        be unlearned.
      </p>

      <h2>The Koch method</h2>
      <p>
        The other half of the method comes from Ludwig Koch, a German
        psychologist who worked on Morse training in the 1930s. His finding was
        that the usual approach — learn all forty-odd characters slowly, then
        try to speed up — produced operators who plateaued. His alternative was
        blunt: start at full target speed immediately, but with only
        <strong> two characters</strong>. Copy them until you are hitting
        <strong> 90 percent accuracy</strong>, then add a third. Copy again to
        90 percent, add a fourth. The speed never changes. Only the alphabet
        grows.
      </p>
      <p>
        It feels absurd for the first two sessions and then it starts working.
        You are never learning to recognise a sound and later learning to
        recognise it faster; you learn it once, at the speed you actually want.
        The 90 percent threshold matters too — move on at 70 percent and you
        carry the gaps forward and stall three characters later. The trainer on
        this site implements exactly this, and will not advance you until you
        clear the bar.
      </p>
      <p>
        The usual opening pair is K and M, chosen because they are distinct from
        each other and neither is trivially short. If you would rather start
        somewhere gentler, the shortest and most common letters work too —
        <strong> E</strong> (•), <strong>T</strong> (▬), <strong>A</strong>
        (•▬), <strong>N</strong> (▬•), <strong>I</strong> (••) and
        <strong> M</strong> (▬▬). Whichever set you pick, name each character to
        yourself in sound rather than in symbols: <em>di-dah</em> for A,
        <em> dah-di-di-dit</em> for B, <em>dah-di-dah-dit</em> for C. The
        vowel change is not decoration — a dot at the end of a character is a
        <em> dit</em> and a dot in the middle is a <em>di</em>, which is exactly
        how the rhythm falls when it is keyed properly.
      </p>

      <h2>The mistakes that stall people</h2>
      <p>
        Most people who give up on Morse give up for one of five reasons, and
        all five are habits rather than talent.
      </p>
      <p>
        <strong>Counting dots.</strong> If your internal process for H is "one,
        two, three, four dots," you have a hard ceiling somewhere around 10 WPM,
        because above that there is no time to count. The fix is to stop
        thinking in numbers and start thinking in rhythm:
        <em> di-di-di-dit</em>, one sound.
      </p>
      <p>
        <strong>Visualising dots and dashes.</strong> Hearing the signal,
        picturing <Code c="-..." /> on an imaginary page, and then reading that
        picture as B is a three-step process pretending to be one. Sound should
        map straight to letter with nothing in between.
      </p>
      <p>
        <strong>Memorising the chart.</strong> The alphabet table further down
        this page is a reference, not a study aid. Learning it by sight builds a
        lookup table in your head, and a lookup table is precisely what you have
        to demolish later to get past 12 WPM.
      </p>
      <p>
        <strong>Practising only sending.</strong> Sending is the easy half — you
        set the pace and you already know what the message says. Receiving is
        where the skill lives and where the bottleneck is. Copy far more than
        you send.
      </p>
      <p>
        <strong>Stopping at 5 WPM.</strong> Five words per minute is slow enough
        to count, which means every hour spent there reinforces the habit that
        will stop you. Learn characters at 15 to 20 WPM from day one and use
        spacing, not speed, to control the difficulty.
      </p>

      <h2>A practice progression</h2>
      <p>
        Short and daily beats long and occasional, without exception. Fifteen to
        twenty minutes a day will take you further than two hours on a Sunday,
        because this is motor and auditory learning and it consolidates between
        sessions rather than during them.
      </p>
      <p>
        Expect the first two characters to take a session or two. From there,
        most people add roughly one new character per one or two sessions, which
        puts the full twenty-six letters somewhere around six to ten weeks of
        daily work. Digits and the handful of punctuation marks that actually
        get used add another two or three weeks. That is the honest timeline for
        knowing the alphabet by ear, and it is the easy part.
      </p>
      <p>
        The hard part is the stretch from about 10 WPM to about 20 WPM, where
        you stop decoding character by character and start hearing whole words.
        That takes months, not weeks, and it is where nearly everyone gets
        stuck. There is a whole dispatch on it:
        <a href="/dispatches/breaking-the-plateau"> Breaking the 10 WPM
        Plateau</a>. A realistic target for someone practising most days is a
        comfortable contact at 15 to 20 WPM within six months to a year. People
        who claim faster are usually counting only the good weeks.
      </p>

      <h2>Using this station</h2>
      <p>
        The console on the front page is a real key, not a keyboard shortcut.
        Hold <strong>SPACE</strong>, or press and hold the telegraph key with
        the mouse: a short press is a dot, a longer press a dash, and a beat of
        silence commits the buffer to a letter. The decoder tree traces your
        path in amber as you go, which makes the structure of the code visible —
        you can watch how <Code c=".-" /> and <Code c="-." /> sit as mirror
        images two steps from the root.
      </p>
      <p>
        Once the shapes are familiar, switch the receiver to
        <strong> EAR-COPY</strong>. The decoder goes dark, you still hear the
        signal, and the letters are yours to write down in the notepad. This is
        the drill that matters. A decoder that prints the answer for you will
        keep you at beginner level indefinitely, because your ear never has to
        commit. Wartime operators trained exactly this way, on paper, with
        nothing to check against until the message was done.
      </p>
      <p>
        For structured work, the <a href="/morse-trainer">Morse trainer</a> runs
        the Koch progression described above and scores each session. The
        <a href="/morse-translator"> Morse translator</a> converts any text you
        paste into keyed audio at anything from 5 to 40 WPM, which makes it easy
        to build your own drills — a page of a book, a list of callsigns, the
        alphabet in a random order. The
        <a href="/morse-code-chart"> full chart</a> covers punctuation and
        prosigns beyond the two tables below, and
        <a href="/prosigns"> prosigns and abbreviations</a> explains the
        run-together characters like CQ, SK and AR that you will hear on the air
        long before anyone spells anything out.
      </p>

      <h2>The alphabet</h2>
      <MorseTable map={MORSE} />

      <h2>Numbers</h2>
      <MorseTable map={DIGITS} />
    </>
  )
}
