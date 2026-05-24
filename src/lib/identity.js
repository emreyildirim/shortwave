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
const FREQ_KEY = 'shortwave.frequency'

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

export function loadFrequency() {
  try {
    const v = Number(localStorage.getItem(FREQ_KEY))
    if (Number.isFinite(v) && v >= 1800 && v <= 148000) return v
  } catch {}
  return 14_073
}

export function saveFrequency(freqKHz) {
  try { localStorage.setItem(FREQ_KEY, String(Math.round(freqKHz))) } catch {}
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
