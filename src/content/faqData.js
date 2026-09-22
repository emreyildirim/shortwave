// FAQ entries. Shared by the page component and the FAQPage JSON-LD the
// prerenderer emits, so the structured data can never drift from the page.

export const QA = [
  ['How do I transmit?',
    'Hold the SPACE bar or press and hold the telegraph key. A short press is a dot, a longer press a dash. A short pause commits your buffer to a letter. There is nothing to configure first — the key is live as soon as the page loads.'],

  ['What is a "frequency"?',
    'Each frequency (in kHz) is a private room. Everyone tuned to the same number shares the air. You arrive on a random frequency so people spread out — drag the knob, spin the wheel, or hit scan to find company or to make a quiet channel of your own.'],

  ['Why am I "LISTEN ONLY"?',
    'A frequency carries two transmitting operators at a time — whoever arrived first. If two are already keying you can hear everything but not send. Tune to an empty frequency to transmit, or wait: when an operator leaves, the longest-waiting listener is promoted automatically.'],

  ['What is EAR-COPY mode?',
    'Flip the lever to EAR-COPY and the decoder goes dark. You still hear the signal, but the letters are yours to transcribe in the notepad. It is the classic drill for training your ear, and it is the difference between recognising Morse and actually reading it.'],

  ['Is there sound?',
    'Yes — your key sounds at 620 Hz and other operators at 540 Hz, so you can tell yourself apart from them without looking. Most browsers require one tap or key press on the page before any audio starts, so press the key once if you hear nothing.'],

  ['I pressed the key and still hear nothing. What now?',
    'Check that the tab is not muted and that your system volume is up, then press the key once more — the browser needs a genuine click or keypress to unlock audio, and a page refresh resets that. On iPhone, the physical silent switch also mutes browser audio.'],

  ['Is it free? Do I need an account?',
    'Completely free, and there is no account. Your callsign, frequency and notes live only in your own browser. Nothing is gated, and nothing asks you to sign up.'],

  ['Do you store my messages?',
    'No. The relay passes live signals between operators in real time and stores nothing — there is no message history to retrieve, for you or for anyone else. See the privacy policy for the full detail.'],

  ['How long does it take to learn Morse code?',
    'Most people can recognise all twenty-six letters within six to ten weeks of daily practice of fifteen or twenty minutes. Getting from there to a conversational twenty words per minute takes considerably longer — months, not weeks — and that second stretch is where almost everyone stalls.'],

  ['Do I need a licence to use this?',
    'Not for this site: it is a simulator, and nothing here transmits on real radio. Transmitting on the actual amateur bands is different and requires a licence in essentially every country. The reference pages here are educational material, not operating authority.'],

  ['What is the difference between the trainer and the station?',
    'The station is a live relay — you key at other people in real time. The trainer is solo practice: it sends you groups of characters, you type what you hear, and it scores you and unlocks the next character at ninety percent accuracy. Use the trainer to build recognition, the station to use it.'],

  ['Why does the trainer send at full speed from the very first character?',
    'Because slowing characters down teaches you to count elements, and counting is a habit that caps you at around ten words per minute. The Koch method keeps each character at full speed and stretches the silence between them instead, so you learn the sound as one shape. The gaps close as you improve.'],

  ['Can I print the Morse chart?',
    'Yes. The chart page has a print button and a print stylesheet that drops the dark theme, strips the navigation and advertising, and lays the code out black-on-white to fit a single sheet.'],

  ['Does the translator play the code out loud?',
    'It does. Type or paste text, press KEY IT, and it is sent as audio at whatever speed you choose between five and forty words per minute. It translates in both directions, and characters with no Morse equivalent are flagged rather than silently dropped.'],

  ['Does this work on a phone?',
    'Yes. The station has a dedicated mobile layout with a large telegraph key, and the reference pages, translator, chart and trainer are all built for small screens. A physical keyboard is not required anywhere.'],

  ['What is the dispatch board?',
    'A set of longer field notes written by the station — first contacts, speed plateaus, antennas, band conditions. There are no accounts and no user submissions on it, so nothing there is a vote or a comment; the meter beside each title reports how demanding the piece is.'],

  ['Why are there ads on the site?',
    'They pay for the relay server and the domain. The station itself is free, open source, and has no paid tier, no upsell and no account to buy.'],
]
