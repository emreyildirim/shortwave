import RadioPanel from './components/RadioPanel.jsx'

export default function App() {
  // hardcoded for now — operator identity comes later
  const callsign = 'K6Z-DELTA'
  const frequency = 14_073

  return (
    <div className="shell">
      <div className="stage">
        <RadioPanel
          activeSign={null}
          isKeying={false}
          frequency={frequency}
          callsign={callsign}
          connected={false}
          remoteKeying={false}
        />

        <main className="main">
          <div className="placeholder-col">— decoder coming soon —</div>
        </main>
      </div>
    </div>
  )
}
