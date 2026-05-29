// Shortwave radio relay.
// Tiny WebSocket message bus that groups clients by "frequency". A client
// joins a room (freq), broadcasts key/letter events, and receives others'
// events. The server does not interpret morse — it's a pure fan-out.

import { WebSocketServer } from 'ws'
import http from 'node:http'

const PORT = Number(process.env.PORT) || 8787

// Allowed frequency band — clamps so a malformed client can't fragment
// rooms into garbage. We work in kHz integer so the room key is exact.
const FREQ_MIN_KHZ = 1800       // 1.800 MHz (start of 160m band)
const FREQ_MAX_KHZ = 148_000    // 148.000 MHz (top of 2m band)
const DEFAULT_FREQ_KHZ = 14_073

// Map<freqKHz, Set<ws>>
const rooms = new Map()
let nextPeerId = 1

function safeFreq(value) {
  const f = Math.round(Number(value))
  if (!Number.isFinite(f)) return DEFAULT_FREQ_KHZ
  return Math.min(FREQ_MAX_KHZ, Math.max(FREQ_MIN_KHZ, f))
}

function safeStr(value, max = 16) {
  return String(value ?? '').slice(0, max).replace(/[\x00-\x1f]/g, '')
}

function getRoom(freq) {
  let room = rooms.get(freq)
  if (!room) {
    room = new Set()
    rooms.set(freq, room)
  }
  return room
}

function broadcast(freq, msg, exclude) {
  const room = rooms.get(freq)
  if (!room) return
  const data = JSON.stringify(msg)
  for (const peer of room) {
    if (peer === exclude) continue
    if (peer.readyState === 1) {
      try { peer.send(data) } catch {}
    }
  }
}

function send(ws, msg) {
  if (ws.readyState !== 1) return
  try { ws.send(JSON.stringify(msg)) } catch {}
}

// Per frequency, the first 2 occupants are "operators" (may transmit); anyone
// beyond that is a "listener" (receive only).
const MAX_OPERATORS = 2

function leaveRoom(ws) {
  if (ws.frequency == null) return
  const freq = ws.frequency
  const room = rooms.get(freq)
  if (room) {
    room.delete(ws)

    // If an operator left, promote the longest-waiting listener so the
    // transmit slot doesn't stay dead while listeners are queued.
    if (ws.role === 'operator') {
      const next = [...room].find((p) => p.readyState === 1 && p.role === 'listener')
      if (next) {
        next.role = 'operator'
        send(next, { type: 'role-assigned', role: 'operator' })
        broadcast(freq, {
          type: 'peer-role-changed', peerId: next.peerId, role: 'operator',
        }, next)
      }
    }

    if (room.size === 0) rooms.delete(freq)
    broadcast(freq, { type: 'peer-left', peerId: ws.peerId })
  }
  ws.frequency = null
  ws.role = null
}

function joinRoom(ws, freq) {
  leaveRoom(ws)
  ws.frequency = freq
  const room = getRoom(freq)

  // Role decided by how many operators are already present.
  const operators = [...room].filter((p) => p.readyState === 1 && p.role === 'operator')
  ws.role = operators.length < MAX_OPERATORS ? 'operator' : 'listener'

  const peers = []
  for (const p of room) {
    if (p === ws || p.readyState !== 1) continue
    peers.push({ id: p.peerId, callsign: p.callsign, role: p.role })
  }
  room.add(ws)

  send(ws, { type: 'tuned', frequency: freq, peers, myRole: ws.role })
  broadcast(freq, {
    type: 'peer-joined',
    peer: { id: ws.peerId, callsign: ws.callsign, role: ws.role },
  }, ws)
}

// HTTP server so health checks work and we can serve a tiny status page.
const httpServer = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({
      ok: true,
      rooms: rooms.size,
      clients: wss?.clients?.size ?? 0,
    }))
    return
  }
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('shortwave relay · open a WS connection to talk morse')
})

const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws, req) => {
  ws.peerId = `p${nextPeerId++}`
  ws.callsign = 'UNKNOWN'
  ws.frequency = null
  ws.role = null
  ws.isAlive = true
  ws.on('pong', () => { ws.isAlive = true })

  ws.on('message', (raw) => {
    let msg
    try { msg = JSON.parse(raw.toString()) } catch { return }
    if (!msg || typeof msg !== 'object' || typeof msg.type !== 'string') return

    switch (msg.type) {
      case 'hello': {
        ws.callsign = safeStr(msg.callsign, 16) || 'UNKNOWN'
        joinRoom(ws, safeFreq(msg.frequency))
        break
      }
      case 'tune': {
        joinRoom(ws, safeFreq(msg.frequency))
        break
      }
      case 'callsign': {
        ws.callsign = safeStr(msg.callsign, 16) || ws.callsign
        if (ws.frequency != null) {
          broadcast(ws.frequency, {
            type: 'peer-callsign',
            peerId: ws.peerId,
            callsign: ws.callsign,
          }, ws)
        }
        break
      }
      // Transmit messages only fan out from operators. Listeners are dropped
      // silently (their client also blocks keying, this is the safety net).
      case 'key-down': {
        if (ws.frequency != null && ws.role === 'operator') {
          broadcast(ws.frequency, {
            type: 'peer-key-down',
            peerId: ws.peerId,
          }, ws)
        }
        break
      }
      case 'key-up': {
        if (ws.frequency != null && ws.role === 'operator') {
          broadcast(ws.frequency, {
            type: 'peer-key-up',
            peerId: ws.peerId,
            sign: msg.sign === '-' ? '-' : '.',
            durationMs: Number(msg.durationMs) || 100,
          }, ws)
        }
        break
      }
      case 'letter': {
        if (ws.frequency != null && ws.role === 'operator') {
          broadcast(ws.frequency, {
            type: 'peer-letter',
            peerId: ws.peerId,
            letter: safeStr(msg.letter, 1),
            code: safeStr(msg.code, 8),
          }, ws)
        }
        break
      }
      case 'ping': {
        send(ws, { type: 'pong' })
        break
      }
    }
  })

  const cleanup = () => leaveRoom(ws)
  ws.on('close', cleanup)
  ws.on('error', cleanup)

  send(ws, { type: 'welcome', peerId: ws.peerId })
})

// Heartbeat: drop dead sockets every 30s
const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) {
      try { ws.terminate() } catch {}
      continue
    }
    ws.isAlive = false
    try { ws.ping() } catch {}
  }
}, 30_000)

wss.on('close', () => clearInterval(heartbeat))

httpServer.listen(PORT, () => {
  console.log(`shortwave relay listening on :${PORT}`)
})

const shutdown = () => {
  console.log('shutting down')
  clearInterval(heartbeat)
  for (const ws of wss.clients) {
    try { ws.close(1001, 'server shutdown') } catch {}
  }
  httpServer.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 2000).unref()
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
