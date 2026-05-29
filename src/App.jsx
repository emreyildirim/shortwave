import { useEffect, useMemo, useState } from 'react'
import { useMorseSimulator } from './hooks/useMorseSimulator.js'
import { useRadioChannel } from './hooks/useRadioChannel.js'
import { useIsMobile } from './hooks/useIsMobile.js'
import RadioPanel from './components/RadioPanel.jsx'
import MorseTree from './components/MorseTree.jsx'
import MessageLog from './components/MessageLog.jsx'
import ChannelPanel from './components/ChannelPanel.jsx'
import SignalStream from './components/SignalStream.jsx'
import MobileConsole from './components/MobileConsole.jsx'
import AdSlot from './components/AdSlot.jsx'
import InfoPage from './components/InfoPage.jsx'
import SiteFooter from './components/SiteFooter.jsx'
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
  const isMobile = useIsMobile()

  // Tiny path router: '/' is the console, '/about' & '/privacy' are content
  // pages. nginx serves index.html for all paths (SPA fallback).
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const navigate = (to) => {
    if (to === window.location.pathname) return
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }
  const CONTENT_PATHS = ['/about', '/privacy', '/learn', '/history', '/faq']
  const onConsole = !CONTENT_PATHS.includes(path)

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

  // Channel layer first so we can pass its callbacks into the simulator.
  // Disabled off the console so reading the policy doesn't open a relay socket.
  const channel = useRadioChannel({ frequency, callsign, enabled: onConsole })
  const listening = channel.myRole === 'listener'

  const sim = useMorseSimulator({
    wpm: 14,
    listening,
    onKeyDown: () => channel.keyDown(),
    onKeyUp: (sign, durationMs) => channel.keyUp(sign, durationMs),
    onLetterCommit: (letter, code) => channel.sendLetter(letter, code),
  })

  const wpm = Math.round(1200 / sim.dotMs)

  // Spacebar = global telegraph key (console only)
  useEffect(() => {
    if (!onConsole) return
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
  }, [sim, onConsole])

  // merge local + remote logs sorted by time for the message log
  const mergedLog = useMemo(() => {
    const local = sim.decodedLog.map((e) => ({ ...e, kind: 'tx' }))
    const remote = channel.remoteLog.map((e) => ({ ...e, kind: 'rx' }))
    return [...local, ...remote].sort((a, b) => a.t - b.t).slice(-200)
  }, [sim.decodedLog, channel.remoteLog])

  if (!onConsole) {
    return <InfoPage page={path.slice(1)} navigate={navigate} />
  }

  if (isMobile) {
    return (
      <div className="shell shell-mobile">
        <MobileConsole
          callsign={callsign}
          frequency={frequency}
          onFrequencyChange={setFrequency}
          channel={channel}
          sim={sim}
          mergedLog={mergedLog}
          wpm={wpm}
          earCopy={earCopy}
          onEarCopyChange={setEarCopy}
          notepad={notepad}
          onNotepadChange={setNotepad}
          navigate={navigate}
        />
      </div>
    )
  }

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
            myRole={channel.myRole}
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
          label={listening ? 'RX ONLY' : 'CW'}
        />

        <AdSlot variant="desktop-bottom" slot={import.meta.env?.VITE_ADSENSE_SLOT_BOTTOM} />

        <SiteFooter navigate={navigate} variant="desktop" />
      </div>
    </div>
  )
}
