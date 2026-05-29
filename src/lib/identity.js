// Operator identity — random callsign, persisted in localStorage.
// Format: 1 letter + 1 digit + 1 letter + "-" + phonetic word.
// e.g., "K6Z-DELTA", "M3R-FOXTROT".

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const PHONETIC = [
  'ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'GOLF',
  'HOTEL', 'INDIA', 'JULIET', 'KILO', 'LIMA', 'MIKE', 'NOVEMBER',
  'OSCAR', 'PAPA', 'QUEBEC', 'ROMEO', 'SIERRA', 'TANGO', 'UNIFORM',
  'VICTOR', 'WHISKEY', 'XRAY', 'YANKEE', 'ZULU',
]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export function generateCallsign() {
  const a = pick(LETTERS)
  const digit = Math.floor(Math.random() * 10)
  const b = pick(LETTERS)
  const phon = pick(PHONETIC)
  return `${a}${digit}${b}-${phon}`
}

const CALLSIGN_KEY = 'shortwave.callsign'
const SESSION_FREQ_KEY = 'shortwave.sessionFreq'

// Realistic CW sub-bands (kHz). Each new visit lands on a random spot inside
// one of these so operators spread out instead of all piling onto 14.073.
const CW_SEGMENTS = [
  [1800, 1840], [3500, 3570], [7000, 7040], [10100, 10130],
  [14000, 14070], [18068, 18095], [21000, 21070], [24890, 24915],
  [28000, 28070], [50000, 50100], [144000, 144100],
]

export function randomFrequency() {
  const seg = CW_SEGMENTS[Math.floor(Math.random() * CW_SEGMENTS.length)]
  return seg[0] + Math.floor(Math.random() * (seg[1] - seg[0] + 1))
}

export function loadCallsign() {
  try {
    const v = localStorage.getItem(CALLSIGN_KEY)
    if (v && v.length <= 16) return v
  } catch {}
  const fresh = generateCallsign()
  try { localStorage.setItem(CALLSIGN_KEY, fresh) } catch {}
  return fresh
}

export function saveCallsign(value) {
  const v = String(value || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 16)
  try { localStorage.setItem(CALLSIGN_KEY, v) } catch {}
  return v
}

// Random per session: a fresh visit picks a new frequency, but a reload in the
// same tab keeps it (sessionStorage) so an in-progress QSO doesn't get torn
// apart by an accidental refresh.
export function loadFrequency() {
  try {
    const v = Number(sessionStorage.getItem(SESSION_FREQ_KEY))
    if (Number.isFinite(v) && v >= 1800 && v <= 148000) return v
  } catch {}
  const fresh = randomFrequency()
  try { sessionStorage.setItem(SESSION_FREQ_KEY, String(fresh)) } catch {}
  return fresh
}

export function saveFrequency(freqKHz) {
  try { sessionStorage.setItem(SESSION_FREQ_KEY, String(Math.round(freqKHz))) } catch {}
}

const EAR_COPY_KEY = 'shortwave.earCopy'
const NOTEPAD_KEY = 'shortwave.notepad'

export function loadEarCopy() {
  try { return localStorage.getItem(EAR_COPY_KEY) === '1' } catch { return false }
}
export function saveEarCopy(on) {
  try { localStorage.setItem(EAR_COPY_KEY, on ? '1' : '0') } catch {}
}

export function loadNotepad() {
  try { return localStorage.getItem(NOTEPAD_KEY) || '' } catch { return '' }
}
export function saveNotepad(text) {
  try { localStorage.setItem(NOTEPAD_KEY, String(text || '').slice(0, 20000)) } catch {}
}
