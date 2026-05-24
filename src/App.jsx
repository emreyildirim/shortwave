import { useEffect, useRef, useState } from 'react'
import { useMorseSimulator } from './hooks/useMorseSimulator.js'
import RadioPanel from './components/RadioPanel.jsx'
import MorseTree from './components/MorseTree.jsx'
import MessageLog from './components/MessageLog.jsx'
import SignalStream from './components/SignalStream.jsx'
import {
  loadCallsign, saveCallsign,
  loadFrequency, saveFrequency,
} from './lib/identity.js'

export default function App() {
  const [callsign, setCallsignState] = useState(() => loadCallsign())
  const [frequency, setFrequencyState] = useState(() => loadFrequency())

  // eslint-disable-next-line no-unused-vars
  const setCallsign = (v) => {
    const clean = saveCallsign(v)
    setCallsignState(clean)
  }
  // eslint-disable-next-line no-unused-vars
  const setFrequency = (v) => {
    saveFrequency(v)
    setFrequencyState(v)
  }

  // Local tape — each committed letter scrolls across the stream
  const [streamItems, setStreamItems] = useState([])
  const streamIdRef = useRef(0)

  const sim = useMorseSimulator({
    wpm: 14,
    onLetterCommit: (letter, code) => {
      setStreamItems((s) => [...s.slice(-80), {
        id: ++streamIdRef.current,
        code,
        letter,
        tCreated: performance.now(),
      }])
    },
  })

  const wpm = Math.round(1200 / sim.dotMs)

  // Spacebar = global telegraph key
  useEffect(() => {
    const onDown = (e) => {
      if (e.code !== 'Space' || e.repeat) return
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      e.preventDefault()
      sim.beginKey()
    }
    const onUp = (e) => {
      if (e.code !== 'Space') return
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      e.preventDefault()
      sim.endKey()
    }
    const onBlur = () => sim.endKey()
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [sim])

  return (
    <div className="shell">
      <div className="stage">
        <RadioPanel
          activeSign={sim.activeSign}
          isKeying={sim.isKeying}
          frequency={frequency}
          callsign={callsign}
          connected={false}
          remoteKeying={false}
        />

        <main className="main">
          <MessageLog
            log={sim.decodedLog}
            currentCode={sim.currentCode}
            isKeying={sim.isKeying}
          />

          <MorseTree
            currentCode={sim.currentCode}
            activeSign={sim.activeSign}
          />
        </main>

        <SignalStream
          items={streamItems}
          activeSign={sim.activeSign}
          isKeying={sim.isKeying}
          wpm={wpm}
          onKeyDown={sim.beginKey}
          onKeyUp={sim.endKey}
        />
      </div>
    </div>
  )
}
