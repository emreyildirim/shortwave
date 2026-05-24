import { useState } from 'react'
import RadioPanel from './components/RadioPanel.jsx'
import MorseTree from './components/MorseTree.jsx'
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

  const [currentCode] = useState('')
  const activeSign = null

  return (
    <div className="shell">
      <div className="stage">
        <RadioPanel
          activeSign={activeSign}
          isKeying={false}
          frequency={frequency}
          callsign={callsign}
          connected={false}
          remoteKeying={false}
        />

        <main className="main">
          <MorseTree currentCode={currentCode} activeSign={activeSign} />
        </main>
      </div>
    </div>
  )
}
