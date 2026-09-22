import { DefList } from '../shared.jsx'

export default function StraightKeyBugPaddle() {
  return (
    <>
      <p>
        There are three pieces of hardware in general use for sending Morse, and
        the difference between them is not style. It is how much of the timing
        the machine does and how much is left to your arm. That split determines
        how long the key takes to learn, what your sending sounds like at the
        other end, and — the part nobody mentions until it is too late — which
        tendons take the load.
      </p>

      <h2>The straight key</h2>
      <p>
        A lever on a pivot, a contact underneath, a return spring. Press and the
        transmitter is on; release and it is off. The key contributes nothing to
        the timing at all. Every dot, every dash, every gap inside a character
        and every gap between characters comes out of your wrist, measured
        against a clock you are running in your head.
      </p>
      <p>
        That is the whole argument for learning on one. On a straight key you
        find out immediately whether you know what a three-to-one ratio sounds
        like, because if you do not, nobody can copy you. On a keyer the machine
        covers for you and you can send for a year without discovering the hole.
      </p>
      <p>
        The characteristic beginner fault is not the dot-to-dash ratio. It is
        the gaps: dashes creep out to four or five units while the space between
        characters collapses to one, so words arrive as a single long smear of
        elements. If somebody asks you to slow down and it does not help, this
        is why — the problem is proportion, not rate.
      </p>
      <p>
        Grip it with the thumb along one side, index and middle finger on the
        knob, hand loose, driving from the wrist and forearm rather than
        pinching with the fingers. The forearm rests on the table. And the key
        must not move: bolt it down, or use one heavy enough not to skate,
        because chasing a sliding key is what makes people clench, and clenching
        is what hurts.
      </p>
      <p>
        Most operators settle between 15 and 20 words per minute on a straight
        key and stay there comfortably. Past 25 is possible and genuinely
        athletic. If you want to live above that, the key is the wrong tool and
        practice will not change it.
      </p>

      <h2>The bug</h2>
      <p>
        A bug — a semi-automatic key — works sideways, the lever swinging left
        and right rather than up and down. Push it one way and you are simply
        closing a contact by hand for as long as you want: that is your dash.
        Push the other way and you release a weighted pendulum that vibrates
        against a contact, producing a run of automatic, evenly spaced dots
        until you let go. A sliding weight on the arm sets how fast the dots
        come: further out, slower.
      </p>
      <p>
        So a bug automates exactly half the code. Dots are machine-regular,
        dashes entirely manual, and that asymmetry is why bug sending is the
        most identifiable of the three. Against perfectly spaced dots, any drift
        in your dashes is obvious, and most bug operators drift long. The heavy,
        swinging rhythm people associate with old maritime and railroad traffic
        is that drift, standardised into a house style by decades of operators
        listening to each other.
      </p>
      <p>
        The semi-automatic key was patented by Horace Martin in the early 1900s
        and Vibroplex has been building them since 1905. It was not invented for
        fun: professional telegraphers were losing their arms to the straight
        key, and turning vertical hammering into a horizontal flick took real
        load off the wrist while raising sustainable speed. It is also the
        hardest of the three to make sound good. A bug is not a first key, and
        for most people not a second one either. Come to it because you want a
        bug.
      </p>

      <h2>The paddle and keyer</h2>
      <p>
        A paddle is just a switch — usually two, one for dots and one for dashes
        — mounted to move side to side. The timing lives in the
        <strong> keyer</strong>, inside the radio or in a small box beside it.
        Hold the dot side and you get dots at exactly the set speed with exactly
        one unit between them, indefinitely. The keyer cannot send a wrong
        ratio.
      </p>
      <p>
        Two mechanical families. A <strong>single-lever</strong> paddle has one
        lever with a contact on each side, so only one element is possible at a
        time. A <strong>dual-lever</strong> or iambic paddle has two independent
        levers, so you can squeeze both at once, and squeezing produces
        alternating dot-dash-dot-dash for as long as you hold. That saves real
        motion on characters built from alternation — A, N, K, R, C, the full
        stop.
      </p>
      <p>
        If you squeeze, pick a mode and stick to it. <strong>Mode A</strong>{' '}
        finishes the element in progress when you release both paddles and then
        stops. <strong>Mode B</strong> sends one additional opposite element
        after you release. Mode B began as the behaviour of a particular keyer
        chip in the 1970s and survived because a generation learned the release
        timing that goes with it. Neither is better; changing after your hands
        have learned one is disorienting, so choose once. And plenty of very
        fast operators use a single-lever paddle and never squeeze anything.
        Iambic technique is a convenience, not a prerequisite for speed.
      </p>
      <p>
        The paddle's characteristic fault is the mirror image of the straight
        key's. The machine handles everything inside a character and nothing
        between characters, so paddle operators run letters together — the keyer
        removed the only gap they ever had to think about, so they stopped
        thinking about it. Some keyers offer automatic character spacing, which
        fixes it and which most people switch off within a week.
      </p>

      <h2>Setting the thing up</h2>
      <DefList
        items={[
          [
            'Straight key gap',
            null,
            'About the thickness of a business card, half a millimetre, closing as your speed rises. Too wide is tiring, too close is chattery.',
          ],
          [
            'Straight key spring',
            null,
            'As light as will reliably open the contact. Most keys arrive far too stiff and most beginners then tighten them.',
          ],
          [
            'Paddle gap',
            null,
            'Very small — a sheet of paper is the usual reference. A paddle set as wide as a straight key is unusable at speed.',
          ],
          [
            'Paddle spring',
            null,
            'Light enough that your fingers rest on it without pressing. Heavy springs and high speed do not combine.',
          ],
          [
            'Bug weight',
            null,
            'Sets dot speed only. Out for slower, in for faster. Match it to the dashes you can make by hand.',
          ],
          [
            'Anything on the desk',
            null,
            'Bolted, clamped, or heavy enough not to move. The most important adjustment, and it is not on the key.',
          ],
        ]}
      />

      <h2>What to learn on, and when to switch</h2>
      <p>
        Start on a straight key, for two or three months of sending. Not for
        tradition — because it forces you to build the timing yourself, makes
        your errors audible, and nothing you learn there has to be unlearned
        afterwards. Record yourself and play it back; the faults are obvious
        from outside and invisible from inside.
      </p>
      <p>
        Spend far more time receiving than sending regardless. Sending is the
        easy half, the half where you already know what the message says. Copy
        is the bottleneck, and it is where the{' '}
        <a href="/dispatches/breaking-the-plateau">speed plateau</a> lives.
      </p>
      <p>
        Move to a paddle when one of two things happens: either you want to work
        above about 18 to 20 words per minute, or your wrist, forearm or fingers
        have started to complain. The first is a preference. The second is not,
        and it is the part of this dispatch worth remembering.
      </p>

      <h2>The part people ignore until they cannot</h2>
      <p>
        Nineteenth-century telegraphers called it <strong>glass arm</strong>:
        cramping, loss of fine control, and in bad cases the end of a career. It
        was common enough in the professional trade to have a name, and the bug
        and later the electronic keyer were both built in response to it. The
        equipment evolved specifically to take load off the operator's arm.
        Using that is not cheating.
      </p>
      <p>
        The rules are dull and they work. Wrist neutral rather than cocked.
        Forearm rested; never key with the arm unsupported. Hold the key, do not
        grip it. Light spring, small movements, key fixed to the desk, desk at
        roughly elbow height. Stop every twenty or thirty minutes and shake the
        hand out. Keep your hands warm, because cold hands grip harder without
        asking.
      </p>
      <p>
        And treat pain as a stop signal rather than a training signal. Aching
        after an hour is ordinary. Tingling or numbness in the fingers is not,
        and means stop for the day and change something before tomorrow — the
        key, the height, the grip, the speed. Nearly every keying injury in this
        hobby comes from a key that slides and a wrist held at an angle, not
        from ambition.
      </p>
      <p>
        Whatever you end up on, the code is the same. If you have not put a
        contact together yet, the{' '}
        <a href="/dispatches/first-cw-qso">full shape of one</a> is written out
        elsewhere on the board, and the{' '}
        <a href="/learn">timing ratios</a> are worth having in front of you the
        first few times you sit down with a straight key and a metronome.
      </p>
    </>
  )
}
