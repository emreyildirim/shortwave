// Single source of truth for every public URL on the site.
//
// The prerenderer, the sitemap generator, the site navigation and the
// client router all read this file, so they cannot drift apart. Adding a
// page means adding one entry here and one component in content/registry.

import { DISPATCHES } from './content/dispatches/manifest.js'

export const ORIGIN = 'https://shortwaveradio.online'

// group → the nav column a route appears under. 'none' keeps it out of nav.
export const GROUPS = [
  { id: 'tools',     label: 'INSTRUMENTS' },
  { id: 'reference', label: 'REFERENCE' },
  { id: 'station',   label: 'STATION' },
]

const page = (path, title, description, group, navLabel, extra = {}) => ({
  path, title, description, group, navLabel,
  kind: 'page', changefreq: 'monthly', priority: 0.7, ...extra,
})

export const ROUTES = [
  {
    path: '/',
    title: 'SHORTWAVE — STATION K6-Z / RECEIVING',
    description:
      'A WWII-era field radio in your browser. Tap Morse on a telegraph key, watch the decoder tree light up, and meet other operators on the same frequency.',
    group: 'none', navLabel: 'STATION',
    kind: 'app', changefreq: 'weekly', priority: 1.0,
    jsonLd: 'WebApplication',
  },

  // — instruments ————————————————————————————————————————
  page('/morse-translator',
    'Morse Code Translator — Text to Morse with Audio | Shortwave',
    'Translate text to Morse code and Morse back to text, then hear it keyed at any speed from 5 to 40 WPM. Free, no sign-up, works offline.',
    'tools', 'TRANSLATOR', { priority: 0.9, changefreq: 'weekly' }),
  page('/morse-code-chart',
    'Morse Code Chart — Letters, Numbers, Punctuation, Prosigns | Shortwave',
    'The complete International Morse alphabet: letters, digits, punctuation and prosigns in one printable chart, with timing notes for each.',
    'tools', 'CHART', { priority: 0.9 }),
  page('/morse-trainer',
    'Morse Code Trainer — Koch Method Practice | Shortwave',
    'Learn Morse by ear with the Koch method: two characters at full speed, then one more each time you clear 90 percent. Scored, in the browser.',
    'tools', 'TRAINER', { priority: 0.9, changefreq: 'weekly' }),

  // — reference ——————————————————————————————————————————
  page('/learn',
    'Learn Morse Code — Timing, Farnsworth Spacing and Practice | Shortwave',
    'How Morse timing actually works, why Farnsworth spacing exists, the mistakes that stall most beginners, and a practice progression that gets past them.',
    'reference', 'LEARN', { priority: 0.9, jsonLd: 'HowTo' }),
  page('/prosigns',
    'Morse Prosigns and Abbreviations — CQ, SOS, SK, AR, 73 | Shortwave',
    'What CQ, SOS, SK, AR, KN, BK, 73 and 88 mean, how they are keyed as single run-together characters, and when operators actually use them.',
    'reference', 'PROSIGNS'),
  page('/q-codes',
    'Q Codes Explained — QTH, QSL, QRM, QSY, QRZ | Shortwave',
    'The Q codes a CW operator hears every session, what each one means as a question and as an answer, and which ones have drifted from their official definition.',
    'reference', 'Q-CODES'),
  page('/phonetic-alphabet',
    'NATO Phonetic Alphabet — and the WWII Able Baker Set | Shortwave',
    'Alpha through Zulu with pronunciations, alongside the Able Baker alphabet it replaced and the reason the change was made.',
    'reference', 'PHONETICS'),

  // — station ————————————————————————————————————————————
  {
    path: '/dispatches',
    title: 'The Dispatch Board — Notes for Operators | Shortwave',
    description:
      'Field notes for radio operators: getting through a first CW contact, breaking the speed plateau, reading the bands, and building a station that works.',
    group: 'station', navLabel: 'DISPATCHES',
    kind: 'board', changefreq: 'weekly', priority: 0.9,
    jsonLd: 'Blog',
  },
  page('/history',
    'A History of Shortwave and CW — From Spark Gap to Today | Shortwave',
    'How dots and dashes moved from the telegraph wire to the ionosphere, what the wartime operators did with them, and why the mode outlived its replacements.',
    'station', 'HISTORY', { jsonLd: 'Article' }),
  page('/famous-messages',
    'Famous Morse Messages — Titanic, D-Day and the Last Commercial CQ | Shortwave',
    'The signals that got recorded: the Titanic distress traffic, the D-Day coded broadcasts, and the message that closed commercial Morse in 1999.',
    'station', 'SIGNALS', { jsonLd: 'Article' }),
  page('/about',
    'About Shortwave — A Field Radio You Can Key in a Browser | Shortwave',
    'What this station is, how the relay puts two operators on the same frequency, and who built it.',
    'station', 'ABOUT'),
  page('/faq',
    'Frequently Asked Questions | Shortwave',
    'How to transmit, what a frequency means here, why you might be in listen-only, and what happens to anything you key.',
    'station', 'FAQ', { jsonLd: 'FAQPage' }),
  page('/contact',
    'Contact the Station | Shortwave',
    'How to reach the operator behind Shortwave — bug reports, corrections to the reference pages, and everything else.',
    'station', 'CONTACT', { priority: 0.4 }),

  // — legal ——————————————————————————————————————————————
  page('/privacy',
    'Privacy Policy | Shortwave',
    'What Shortwave stores (almost nothing), what passes through the relay, and how advertising cookies are handled.',
    'none', 'PRIVACY', { priority: 0.3 }),
  page('/terms',
    'Terms of Service | Shortwave',
    'The terms you accept by using Shortwave: acceptable use on the relay, what is provided as-is, and the limits of that.',
    'none', 'TERMS', { priority: 0.3 }),

  // — dispatch posts ————————————————————————————————————
  ...DISPATCHES.map((d) => ({
    path: `/dispatches/${d.slug}`,
    title: `${d.title} | Shortwave Dispatches`,
    description: d.summary,
    group: 'none', navLabel: d.title,
    kind: 'post', changefreq: 'yearly', priority: 0.8,
    jsonLd: 'BlogPosting', dispatch: d,
  })),
]

export const byPath = (p) => {
  const clean = p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p
  return ROUTES.find((r) => r.path === clean)
}

export const navGroups = () =>
  GROUPS.map((g) => ({
    ...g,
    items: ROUTES.filter((r) => r.group === g.id),
  }))

// Everything except the console, which is prerendered head-only.
export const contentRoutes = () => ROUTES.filter((r) => r.kind !== 'app')
