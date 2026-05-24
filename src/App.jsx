import { useEffect, useMemo, useState } from 'react'
import { useMorseSimulator } from './hooks/useMorseSimulator.js'
import { useRadioChannel } from './hooks/useRadioChannel.js'
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

  // Channel layer first so we can pass its callbacks into the simulator
  const channel = useRadioChannel({ frequency, callsign })

  const sim = useMorseSimulator({
    wpm: 14,
    onKeyDown: () => channel.keyDown(),
    onKeyUp: (sign, durationMs) => channel.keyUp(sign, durationMs),
    onLetterCommit: (letter, code) => channel.sendLetter(letter, code),
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

  // merge local + remote logs sorted by time for the message log
  const mergedLog = useMemo(() => {
    const local = sim.decodedLog.map((e) => ({ ...e, kind: 'tx' }))
    const remote = channel.remoteLog.map((e) => ({ ...e, kind: 'rx' }))
    return [...local, ...remote].sort((a, b) => a.t - b.t).slice(-200)
  }, [sim.decodedLog, channel.remoteLog])

  return (
    <div className="shell">
      <div className="stage">
        <RadioPanel
          activeSign={sim.activeSign}
          isKeying={sim.isKeying}
          frequency={frequency}
          callsign={callsign}
          connected={channel.isConnected}
          remoteKeying={channel.remote.isKeying}
        />

        <main className="main">
          <MessageLog
            log={mergedLog}
            currentCode={sim.currentCode}
            isKeying={sim.isKeying}
            remoteCode={channel.remote.currentCode}
            remoteCallsign={channel.remote.callsign}
            earCopy={earCopy}
            notepad={notepad}
            onNotepadChange={setNotepad}
          />

          <MorseTree
            currentCode={sim.currentCode}
            activeSign={sim.activeSign}
            remoteCode={channel.remote.currentCode}
            remoteActiveSign={channel.remote.activeSign}
            remoteCallsign={channel.remote.callsign}
            frozen={earCopy}
          />

          <ChannelPanel
            frequency={frequency}
            onFrequencyChange={setFrequency}
            status={channel.status}
            peers={channel.peers}
            callsign={callsign}
            onCallsignChange={setCallsign}
            signalStrength={sim.signalStrength}
            isKeying={sim.isKeying}
            remote={channel.remote}
            earCopy={earCopy}
            onEarCopyChange={setEarCopy}
          />
        </main>

        <SignalStream
          items={channel.streamItems}
          activeSign={channel.remote.activeSign}
          isKeying={channel.remote.isKeying}
          wpm={wpm}
          onKeyDown={sim.beginKey}
          onKeyUp={sim.endKey}
        />
      </div>
    </div>
  )
}
