import { useCallback, useEffect, useRef, useState } from 'react'
import { FROM_MORSE } from '../data/morse.js'

// WebSocket client for the shortwave relay. Joins a room keyed by frequency
// (kHz), broadcasts local key/letter events, and exposes the most recent
// peer's keying state for visualization. Multiple peers may be in the same
// room; the UI surfaces all of them in the log but only the latest one
// drives the green "remote signal" overlay on the tree.

const DEFAULT_URL = import.meta.env?.VITE_RADIO_URL || 'ws://localhost:8787'

const CONNECTION_STATES = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error',
}

const COMMIT_IDLE_MS = 750
const PEER_BEEP_HZ = 540 // slightly lower than local (620 Hz) so you can tell apart

export function useRadioChannel({
  url = DEFAULT_URL,
  frequency,            // kHz integer
  callsign,
  enabled = true,
} = {}) {
  const [status, setStatus] = useState(CONNECTION_STATES.IDLE)
  const [myRole, setMyRole] = useState('operator')  // 'operator' | 'listener'
  const [peers, setPeers] = useState([])   // [{id, callsign, role}]
  const [remote, setRemote] = useState({   // last-active peer's keying state
    peerId: null,
    callsign: null,
    activeSign: null,
    currentCode: '',
    isKeying: false,
  })
  const [remoteLog, setRemoteLog] = useState([])  // [{peerId, callsign, letter, code, t}]
  const [streamItems, setStreamItems] = useState([])  // ticker tape items (RX only)

  const wsRef = useRef(null)
  const reconnectTimerRef = useRef(null)
  const reconnectAttemptRef = useRef(0)
  const aliveRef = useRef(true)
  const streamIdRef = useRef(0)

  // Per-peer transient state (their currentCode buffer, idle commit timer)
  const peerStateRef = useRef(new Map())

  // Audio: a small dedicated AudioContext for the peer's beep (different
  // pitch from local). Lazy-init on first peer signal.
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

  const startPeerTone = () => {
    const ctx = ensureAudio()
    if (!ctx) return
    if (oscRef.current) stopPeerTone(true)
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = PEER_BEEP_HZ
    const gain = ctx.createGain()
    gain.gain.value = 0
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    const t = ctx.currentTime
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.14, t + 0.008)
    oscRef.current = osc
    gainRef.current = gain
  }

  const stopPeerTone = (immediate = false) => {
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

  // ----- low-level send -----
  const send = useCallback((msg) => {
    const ws = wsRef.current
    if (!ws || ws.readyState !== 1) return false
    try { ws.send(JSON.stringify(msg)); return true } catch { return false }
  }, [])

  // ----- public actions ----- (no-op for listeners; the key UI is also
  // disabled, this just guards the wire)
  const keyDown = useCallback(() => {
    if (myRole !== 'operator') return false
    return send({ type: 'key-down' })
  }, [send, myRole])
  const keyUp = useCallback((sign, durationMs) => {
    if (myRole !== 'operator') return false
    return send({ type: 'key-up', sign, durationMs })
  }, [send, myRole])
  const sendLetter = useCallback((letter, code) => {
    if (myRole !== 'operator') return false
    return send({ type: 'letter', letter, code })
  }, [send, myRole])

  // ----- peer state mutation helpers -----
  const ensurePeerState = (peerId) => {
    let state = peerStateRef.current.get(peerId)
    if (!state) {
      state = { currentCode: '', commitTimer: null }
      peerStateRef.current.set(peerId, state)
    }
    return state
  }

  const clearPeerCommitTimer = (state) => {
    if (state.commitTimer) {
      clearTimeout(state.commitTimer)
      state.commitTimer = null
    }
  }

  const pushStream = (code, letter, callsign, invalid = false) => {
    setStreamItems((s) => [
      ...s.slice(-80),
      {
        id: ++streamIdRef.current,
        code,
        letter,
        callsign,
        invalid,
        tCreated: performance.now(),
      },
    ])
  }

  const commitPeerLetter = (peerId, peerCallsign) => {
    const state = peerStateRef.current.get(peerId)
    if (!state || !state.currentCode) return
    const code = state.currentCode
    state.currentCode = ''
    clearPeerCommitTimer(state)
    setRemote((r) => (r.peerId === peerId ? { ...r, currentCode: '' } : r))
    const letter = FROM_MORSE[code]
    if (letter) {
      setRemoteLog((log) => [
        ...log.slice(-200),
        { peerId, callsign: peerCallsign, letter, code, t: Date.now() },
      ])
      pushStream(code, letter, peerCallsign, false)
    } else {
      pushStream(code, '?', peerCallsign, true)
    }
  }

  // ----- message handling -----
  const handleMessage = useCallback((msg) => {
    switch (msg.type) {
      case 'welcome':
        // server assigned us a peerId; we don't need it directly
        break
      case 'tuned':
        setPeers(msg.peers || [])
        setMyRole(msg.myRole || 'operator')
        break
      case 'role-assigned':
        setMyRole(msg.role === 'operator' ? 'operator' : 'listener')
        break
      case 'peer-role-changed':
        setPeers((p) => p.map((x) => x.id === msg.peerId
          ? { ...x, role: msg.role }
          : x))
        break
      case 'peer-joined':
        setPeers((p) => [...p.filter((x) => x.id !== msg.peer.id), msg.peer])
        break
      case 'peer-left':
        setPeers((p) => p.filter((x) => x.id !== msg.peerId))
        peerStateRef.current.delete(msg.peerId)
        setRemote((r) => (r.peerId === msg.peerId
          ? { peerId: null, callsign: null, activeSign: null, currentCode: '', isKeying: false }
          : r))
        break
      case 'peer-callsign':
        setPeers((p) => p.map((x) => x.id === msg.peerId
          ? { ...x, callsign: msg.callsign }
          : x))
        break
      case 'peer-key-down': {
        const peer = lookupPeer(msg.peerId)
        startPeerTone()
        setRemote({
          peerId: msg.peerId,
          callsign: peer?.callsign || '???',
          activeSign: '?',
          currentCode: ensurePeerState(msg.peerId).currentCode,
          isKeying: true,
        })
        break
      }
      case 'peer-key-up': {
        stopPeerTone()
        const peer = lookupPeer(msg.peerId)
        const sign = msg.sign === '-' ? '-' : '.'
        const state = ensurePeerState(msg.peerId)
        clearPeerCommitTimer(state)
        state.currentCode = (state.currentCode + sign).slice(0, 12)
        setRemote({
          peerId: msg.peerId,
          callsign: peer?.callsign || '???',
          activeSign: null,
          currentCode: state.currentCode,
          isKeying: false,
        })
        state.commitTimer = setTimeout(() => {
          commitPeerLetter(msg.peerId, peer?.callsign || '???')
        }, COMMIT_IDLE_MS)
        break
      }
      case 'peer-letter': {
        // Sender confirms a commit. The local idle timer (commitPeerLetter)
        // is the source of truth for log/stream — we just use this to
        // synchronize the buffer in case the local accumulator drifted.
        const state = ensurePeerState(msg.peerId)
        if (!state.commitTimer) {
          state.currentCode = ''
          setRemote((r) => (r.peerId === msg.peerId ? { ...r, currentCode: '' } : r))
        }
        break
      }
      case 'pong':
        break
    }
  }, [])

  // setPeers updates state asynchronously; we sometimes need an immediate read
  const peersRef = useRef(peers)
  useEffect(() => { peersRef.current = peers }, [peers])
  function lookupPeer(id) { return peersRef.current.find((p) => p.id === id) }

  // ----- connection lifecycle -----
  useEffect(() => {
    if (!enabled) return
    aliveRef.current = true

    const connect = () => {
      if (!aliveRef.current) return
      setStatus(CONNECTION_STATES.CONNECTING)
      let ws
      try {
        ws = new WebSocket(url)
      } catch (e) {
        setStatus(CONNECTION_STATES.ERROR)
        scheduleReconnect()
        return
      }
      wsRef.current = ws

      ws.onopen = () => {
        reconnectAttemptRef.current = 0
        setStatus(CONNECTION_STATES.CONNECTED)
        ws.send(JSON.stringify({
          type: 'hello',
          callsign,
          frequency,
        }))
      }
      ws.onmessage = (e) => {
        let msg
        try { msg = JSON.parse(e.data) } catch { return }
        if (msg && typeof msg === 'object') handleMessage(msg)
      }
      ws.onclose = () => {
        setStatus(CONNECTION_STATES.IDLE)
        setMyRole('operator')
        setPeers([])
        setRemote({ peerId: null, callsign: null, activeSign: null, currentCode: '', isKeying: false })
        peerStateRef.current.forEach((s) => clearPeerCommitTimer(s))
        peerStateRef.current.clear()
        stopPeerTone(true)
        wsRef.current = null
        scheduleReconnect()
      }
      ws.onerror = () => {
        setStatus(CONNECTION_STATES.ERROR)
      }
    }

    const scheduleReconnect = () => {
      if (!aliveRef.current) return
      const attempt = ++reconnectAttemptRef.current
      const delay = Math.min(15_000, 1000 * Math.pow(1.7, attempt - 1))
      reconnectTimerRef.current = setTimeout(connect, delay)
    }

    connect()

    return () => {
      aliveRef.current = false
      clearTimeout(reconnectTimerRef.current)
      reconnectTimerRef.current = null
      const ws = wsRef.current
      if (ws) {
        ws.onclose = null
        ws.onerror = null
        try { ws.close() } catch {}
      }
      wsRef.current = null
      stopPeerTone(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, enabled])

  // re-tune room when frequency changes (without reconnecting)
  useEffect(() => {
    if (status === CONNECTION_STATES.CONNECTED) {
      send({ type: 'tune', frequency })
      // reset remote state on tune
      setRemote({ peerId: null, callsign: null, activeSign: null, currentCode: '', isKeying: false })
      peerStateRef.current.forEach((s) => clearPeerCommitTimer(s))
      peerStateRef.current.clear()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency])

  // push callsign updates while connected
  useEffect(() => {
    if (status === CONNECTION_STATES.CONNECTED) {
      send({ type: 'callsign', callsign })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsign])

  return {
    status,
    isConnected: status === CONNECTION_STATES.CONNECTED,
    myRole,
    peers,
    remote,
    remoteLog,
    streamItems,
    keyDown,
    keyUp,
    sendLetter,
  }
}
