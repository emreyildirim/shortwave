import { useEffect, useRef, useState } from 'react'
import { useMorseSimulator } from './hooks/useMorseSimulator.js'
import RadioPanel from './components/RadioPanel.jsx'
import MorseTree from './components/MorseTree.jsx'
import MessageLog from './components/MessageLog.jsx'
import ChannelPanel from './components/ChannelPanel.jsx'
import SignalStream from './components/SignalStream.jsx'
import {
  loadCallsign, saveCallsign,
  loadFrequency, saveFrequency,
  loadEarCopy, saveEarCopy,
  loadNotepad, saveNotepad,
} from './lib/identity.js'

export default function App() {
  const [callsign, setCallsignState] = useState(() => loadCallsign())
  const [frequency, setFrequencyState] = useState(() => loadFrequency())
  const [earCopy, setEarCopyState] = useState(() => loadEarCopy())
  const [notepad, setNotepadState] = useState(() => loadNotepad())

  const setCallsign = (v) => {
    const clean = saveCallsign(v)
    setCallsignState(clean)
  }
  const setFrequency = (v) => {
    saveFrequency(v)
    setFrequencyState(v)
  }
  const setEarCopy = (v) => {
    saveEarCopy(v)
    setEarCopyState(v)
  }
  const setNotepad = (v) => {
    setNotepadState(v)
    saveNotepad(v)
  }

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
            earCopy={earCopy}
            notepad={notepad}
            onNotepadChange={setNotepad}
          />

          <MorseTree
            currentCode={sim.currentCode}
            activeSign={sim.activeSign}
            frozen={earCopy}
          />

          <ChannelPanel
            frequency={frequency}
            onFrequencyChange={setFrequency}
            callsign={callsign}
            onCallsignChange={setCallsign}
            signalStrength={sim.signalStrength}
            earCopy={earCopy}
            onEarCopyChange={setEarCopy}
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
