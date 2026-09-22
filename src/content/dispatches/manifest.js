// The dispatch board — station-authored posts for operators.
//
// These are editorial pieces written by the station, presented on a
// bulletin-board layout. There are no user accounts and no user-submitted
// posts: everything here has a real author and a real date. The board
// borrows the *shape* of a link aggregator (flairs, a sorted list, signal
// meters) but never fabricates votes, usernames or comment counts.
//
// `level` drives the S-meter badge (S3/S6/S9) — it reports how demanding
// the piece is, not how popular it is.

export const DISPATCHES = [
  {
    slug: 'first-cw-qso',
    title: 'Your First CW Contact, Start to Finish',
    flair: 'ELMER',
    level: 1,
    date: '2026-09-18',
    readMin: 7,
    summary:
      'The exact exchange, in order, with every abbreviation spelled out — so the first time someone answers your CQ you know what happens next.',
  },
  {
    slug: 'breaking-the-plateau',
    title: 'Breaking the 10 WPM Plateau',
    flair: 'PRACTICE',
    level: 2,
    date: '2026-09-11',
    readMin: 8,
    summary:
      'Almost everyone stalls around ten words per minute. The cause is usually the same, and so is the fix: stop counting and start hearing whole characters.',
  },
  {
    slug: 'straight-key-bug-paddle',
    title: 'Straight Key, Bug, or Paddle',
    flair: 'GEAR',
    level: 1,
    date: '2026-09-04',
    readMin: 9,
    summary:
      'Three ways to make a dot, each with a different learning curve and a different effect on your fist. What to start on and when to switch.',
  },
  {
    slug: 'learning-by-ear',
    title: 'The Chart Is Holding You Back',
    flair: 'PRACTICE',
    level: 2,
    date: '2026-08-28',
    readMin: 8,
    summary:
      'Why Koch and Farnsworth both start at full character speed, and why memorising a lookup table builds a habit you will spend months unlearning.',
  },
  {
    slug: 'reading-the-bands',
    title: 'Why 40 Metres at Night and 20 at Noon',
    flair: 'PROPAGATION',
    level: 2,
    date: '2026-08-21',
    readMin: 10,
    summary:
      'The ionosphere rearranges itself twice a day. Once you know which layer is doing what, band choice stops being folklore and starts being a decision.',
  },
  {
    slug: 'qrp-five-watts',
    title: 'Five Watts and a Wire',
    flair: 'OPERATING',
    level: 2,
    date: '2026-08-14',
    readMin: 7,
    summary:
      'Running low power sounds like a handicap and mostly is. The argument for doing it anyway, and what CW gives you that voice cannot.',
  },
  {
    slug: 'wire-antenna-budget',
    title: 'A Wire Antenna for Almost Nothing',
    flair: 'GEAR',
    level: 3,
    date: '2026-08-07',
    readMin: 11,
    summary:
      'Half-wave dipole, end-fed, random wire — what the differences actually mean, how long to cut them, and why height beats every other variable.',
  },
  {
    slug: 'numbers-stations',
    title: 'Numbers Stations: What Is Actually Known',
    flair: 'HISTORY',
    level: 1,
    date: '2026-07-31',
    readMin: 9,
    summary:
      'Decades of voices reading digits into the shortwave dark. Separating the documented record from the folklore that has grown around it.',
  },
  {
    slug: 'field-kit',
    title: 'What Actually Goes in a Field Kit',
    flair: 'GEAR',
    level: 1,
    date: '2026-07-24',
    readMin: 8,
    summary:
      'A portable station is a series of trade-offs about weight. The short list that survives contact with an actual hillside.',
  },
  {
    slug: 'why-cw-survives',
    title: 'Why CW Refuses to Die',
    flair: 'HISTORY',
    level: 1,
    date: '2026-07-17',
    readMin: 7,
    summary:
      'Commercial Morse ended in 1999. Three decades of better technology later, more people are learning it than were learning it then.',
  },
]

export const FLAIRS = ['ELMER', 'PRACTICE', 'GEAR', 'PROPAGATION', 'OPERATING', 'HISTORY']

export const bySlug = (slug) => DISPATCHES.find((d) => d.slug === slug)
