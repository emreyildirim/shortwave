import { Code, DefList } from './shared.jsx'

const CODES = [
  ['QRL', null,
    'Are you busy? / I am busy, please do not interfere. On the amateur bands the question form is the standard courtesy before transmitting on a frequency that sounds empty. Ask twice: a weak station you cannot hear may be working someone you cannot hear either.'],
  ['QRM', null,
    'Are you being interfered with? / I am being interfered with. Strictly, interference from other transmitters. Man-made noise, and usually another operator.'],
  ['QRN', null,
    'Are you troubled by static? / I am troubled by static. Natural noise: lightning a thousand miles away, atmospherics, the hiss of a summer evening on the lower bands.'],
  ['QRO', null,
    'Shall I increase power? / Increase power. As an adjective it means running a big transmitter.'],
  ['QRP', null,
    'Shall I decrease power? / Decrease power.'],
  ['QRQ', null,
    'Shall I send faster? / Send faster. Usually with a figure attached in words per minute.'],
  ['QRS', null,
    'Shall I send more slowly? / Send more slowly. The most useful three letters a beginner can own, and nobody who receives it will think less of you.'],
  ['QRT', null,
    'Shall I stop sending? / Stop sending. Operators use the answer form about themselves: I am going off the air.'],
  ['QRU', null,
    'Have you anything for me? / I have nothing for you.'],
  ['QRV', null,
    'Are you ready? / I am ready.'],
  ['QRX', null,
    'When will you call me again? / I will call you again at a stated time. In daily use it has shrunk to a plain stand by.'],
  ['QRZ', null,
    'Who is calling me? / You are being called by the station named.'],
  ['QSB', null,
    'Are my signals fading? / Your signals are fading. The slow swell and collapse of a skywave signal as the path shifts.'],
  ['QSL', null,
    'Can you acknowledge receipt? / I acknowledge receipt.'],
  ['QSO', null,
    'Can you communicate with the named station direct? / I can communicate with that station direct.'],
  ['QSY', null,
    'Shall I change to another frequency? / Change to transmission on another frequency. Almost always followed by the frequency in kilohertz.'],
  ['QTC', null,
    'How many messages have you to send? / I have a stated number of messages for you. Formal traffic handling, and still used by message-relay networks.'],
  ['QTH', null,
    'What is your position? / My position is as stated. Officially latitude and longitude. On the amateur bands, a town and a country.'],
]

export default function QCodes() {
  return (
    <>
      <h1>Q CODES</h1>
      <p className="lede">
        Three letters that work as a question or as an answer, and the single
        piece of punctuation that decides which.
      </p>

      <h2>Where they came from</h2>
      <p>
        The Q code began as a British regulation. In 1909 a list of three-letter
        codes, every one of them starting with Q, was issued for traffic between
        British ships and coast stations. It was short — a few dozen entries —
        and it covered the things an operator needed to say a hundred times a
        watch and did not want to spell out by hand.
      </p>
      <p>
        The idea spread fast because it solved two problems at once. It cut
        transmission time, which mattered when every word was keyed by hand
        through interference, and it crossed languages: a Norwegian operator and
        an Italian one with no common tongue could still agree completely about
        QRM. International conventions took the system up, expanded it, and it
        has been maintained ever since by the ITU, with a separate aeronautical
        portion administered through ICAO.
      </p>
      <p>
        The modern allocation carves up the alphabet. <strong>QAA to QNZ</strong>
        {' '}belongs to aviation. <strong>QOA to QQZ</strong> is maritime.
        <strong> QRA to QUZ</strong> is available to all services, and that is
        the block amateur radio lives in — which is why practically every code
        you will hear on the air begins QR or QS. A handful of codes in common
        use were never official at all. They were invented on the air, spread by
        imitation, and stuck.
      </p>

      <h2>The question mark is the whole mechanic</h2>
      <p>
        This is the part newcomers miss, and it is the reason the system works
        at all. Every Q code carries two meanings. The difference between them
        is one trailing question mark — <Code c="..--.." /> — and nothing else.
      </p>
      <p>
        Sent with the question mark, QRL asks whether the frequency is in use.
        Sent without it, QRL states that the frequency <em>is</em> in use and
        asks you to go elsewhere. QRS with a question mark offers to slow down;
        QRS without one tells the other operator to. One code, two directions,
        no ambiguity and no wasted characters. Many of them take a parameter as
        well: QRS 10 asks for ten words a minute, QSY 7030 names the frequency
        to move to, QTC 3 announces three messages waiting.
      </p>
      <p>
        The question mark is not decorative politeness. Sending QRT without one
        on somebody else's frequency reads as an instruction to stop
        transmitting, which is almost certainly not what you meant.
      </p>

      <h2>The ones you will actually hear</h2>
      <p>
        Question meaning first, answer meaning second.
      </p>
      <DefList items={CODES} />

      <h2>Where usage has drifted</h2>
      <p>
        A code that stays in daily use for a century does not stay put. Several
        of the entries above mean something on the air that the official list
        would not recognise.
      </p>
      <p>
        <strong>QSL</strong> officially asks for, and gives, acknowledgement of
        receipt. It has since become a noun. A QSL is a printed card confirming
        a contact, sent direct or through a national bureau, and increasingly an
        electronic record instead of a card at all. Asking someone for a QSL is
        asking for paperwork, not for an acknowledgement on the air. The word
        has also slid sideways into plain agreement, so that QSL alone now often
        just means understood, agreed, yes.
      </p>
      <p>
        <strong>QRP</strong> has outgrown its definition entirely. As a Q code
        it asks another station to reduce power. As a word on the bands it names
        an entire practice: working the world with five watts or less on CW,
        with its own contests, awards, clubs and a long tradition of homebuilt
        equipment. Calling CQ QRP does not ask anyone to turn anything down. It
        announces that you are running a small signal and would be grateful for
        patience. The reverse, QRO, is used the same way for the other end of
        the scale.
      </p>
      <p>
        <strong>QSO</strong> officially concerns whether you can reach some
        third station directly. In use it simply means a contact, and it works
        as a noun and a verb alike: a first QSO, a long QSO on twenty metres, to
        QSO somebody. The original sense has effectively disappeared.
      </p>
      <p>
        <strong>QRM</strong> and <strong>QRN</strong> get used loosely and often
        interchangeably, but the distinction is real and worth keeping, because
        the two have different cures. QRM is another transmitter sitting on top
        of you, and the fix is to move. QRN is nature, and the fix is to wait,
        change band, or accept it. Operators also say QRM for anything
        irritating, including a neighbour's switching power supply, which is
        strictly neither one nor the other.
      </p>
      <p>
        <strong>QRZ</strong> has drifted from a specific question — who is
        calling me — into a general solicitation. Sent on its own at the end of
        a contact it means whoever else is out there, go ahead, which is closer
        to a short <a href="/prosigns">CQ</a> than to anything in the printed
        definition. <strong>QTH</strong> is now a plain noun for home, and
        <strong> QRT</strong> is used for retiring from the hobby altogether.
        None of this is wrong exactly. It is what happens to any vocabulary that
        gets worked hard for a hundred years.
      </p>

      <h2>Sending them</h2>
      <p>
        Q codes are keyed as three ordinary letters with normal spacing between
        them. They are abbreviations, not prosigns, and the difference is set
        out in full on the <a href="/prosigns">prosigns</a> page: a prosign runs
        together into one character, a Q code does not. Nobody sends QSL solid,
        and an operator who did would be misheard.
      </p>
      <p>
        They survive on voice too, which is faintly absurd given that the entire
        point was to save keying time, but they persist because they are precise
        and universally understood, and because saying QSY is quicker than
        explaining what you mean by it. If you want to hear one at speed rather
        than read it, feed it to the <a href="/morse-translator">translator</a>
        {' '}and listen a few times. QSB and QRM have rhythms you will start
        picking out of the noise before you can consciously decode them, which
        is exactly how experienced operators read them in the first place.
      </p>
    </>
  )
}
