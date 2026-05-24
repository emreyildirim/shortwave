import { useState } from 'react'
import RadioPanel from './components/RadioPanel.jsx'
import MorseTree from './components/MorseTree.jsx'

export default function App() {
  // hardcoded for now — operator identity comes later
  const callsign = 'K6Z-DELTA'
  const frequency = 14_073

  // buffer of the letter currently being keyed (no keyer wired yet)
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
