import { useRef, useState, useCallback } from 'react'
import { FROM_MORSE } from '../data/morse.js'

const DASH_THRESHOLD_MS = 180   // hold beyond this becomes a dash, shorter = dot
const MANUAL_COMMIT_MS = 750    // idle after release: commit buffer as letter

export function useMorseSimulator({
  wpm = 14,
  onKeyDown,        // fired when the operator starts a sign (for socket fan-out)
  onKeyUp,          // fired when the operator releases — (sign, durationMs)
  onLetterCommit,   // fired when the buffer collapses to a valid letter
} = {}) {
  const dotMs = Math.max(60, Math.round(1200 / wpm))

  const [currentCode, setCurrentCode] = useState('')
  const [activeSign, setActiveSign] = useState(null)
  const [decodedLog, setDecodedLog] = useState([])
  const [signalStrength, setSignalStrength] = useState(0)
  const [isKeying, setIsKeying] = useState(false)

  const manualHoldRef = useRef({ start: 0, sign: null, growTimer: null })
  const manualCommitTimerRef = useRef(null)

  // === Telegraph beep (Web Audio) ===
  // Lazily create an AudioContext on first user gesture (beginKey is a
  // gesture, so the browser allows playback). A single oscillator is
  // started on key-down and gain-faded on key-up to kill clicks.
  const audioCtxRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)

  const ensureAudio = () => {
    if (!audioCtxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      audioCtxRef.current = new AC()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }

  const startTone = () => {
    const ctx = ensureAudio()
    if (!ctx) return
    if (oscRef.current) stopTone(true)
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = 620
    const gain = ctx.createGain()
    gain.gain.value = 0
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    const t = ctx.currentTime
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.18, t + 0.008)
    oscRef.current = osc
    gainRef.current = gain
  }

  const stopTone = (immediate = false) => {
    const ctx = audioCtxRef.current
    const osc = oscRef.current
    const gain = gainRef.current
    if (!ctx || !osc || !gain) return
    oscRef.current = null
    gainRef.current = null
    const t = ctx.currentTime
    gain.gain.cancelScheduledValues(t)
    gain.gain.setValueAtTime(gain.gain.value, t)
    gain.gain.linearRampToValueAtTime(0, t + (immediate ? 0.005 : 0.018))
    try { osc.stop(t + (immediate ? 0.01 : 0.03)) } catch {}
  }

  const beginKey = useCallback(() => {
    if (manualCommitTimerRef.current) {
      clearTimeout(manualCommitTimerRef.current)
      manualCommitTimerRef.current = null
    }
    setIsKeying(true)
    manualHoldRef.current.start = Date.now()
    manualHoldRef.current.sign = '.'
    setActiveSign('.')
    setSignalStrength(0.85)
    startTone()
    onKeyDown?.()
    if (manualHoldRef.current.growTimer) clearTimeout(manualHoldRef.current.growTimer)
    manualHoldRef.current.growTimer = setTimeout(() => {
      manualHoldRef.current.sign = '-'
      setActiveSign('-')
    }, DASH_THRESHOLD_MS)
  }, [onKeyDown])

  const endKey = useCallback(() => {
    if (manualHoldRef.current.growTimer) {
      clearTimeout(manualHoldRef.current.growTimer)
      manualHoldRef.current.growTimer = null
    }
    stopTone()
    if (!isKeying) return
    setIsKeying(false)
    const sign = manualHoldRef.current.sign || '.'
    const durationMs = Date.now() - manualHoldRef.current.start
    setActiveSign(null)
    setSignalStrength(0.18)
    setCurrentCode((c) => c + sign)
    onKeyUp?.(sign, durationMs)

    if (manualCommitTimerRef.current) clearTimeout(manualCommitTimerRef.current)
    manualCommitTimerRef.current = setTimeout(() => {
      setCurrentCode((c) => {
        if (c && FROM_MORSE[c]) {
          const letter = FROM_MORSE[c]
          setDecodedLog((log) => [
            ...log.slice(-200),
            { letter, code: c, t: Date.now(), source: 'tx' },
          ])
          onLetterCommit?.(letter, c)
        }
        return ''
      })
      setSignalStrength(0)
    }, MANUAL_COMMIT_MS)
  }, [isKeying, onKeyUp, onLetterCommit])

  return {
    currentCode,
    activeSign,
    decodedLog,
    signalStrength,
    isKeying,
    dotMs,
    beginKey,
    endKey,
  }
}
