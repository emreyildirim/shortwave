# SHORTWAVE

A WWII-era field radio simulator. Hold the spacebar to tap morse,
watch the decoder tree light up, and meet other operators on the
same frequency.

The UI is meant to feel like a piece of bakelite-and-brass kit from a
signal corps tent: amber phosphor over warm bakelite, scanlines, grain,
a clickable telegraph key with audible sidetone.

![shortwave](https://img.shields.io/badge/morse-CW-orange) ![tech](https://img.shields.io/badge/vite-react-blue)

## How it works

- **Local key** — hold `SPACE` (or click the telegraph key). Short hold = dot,
  long hold = dash. After ~750ms of silence the buffer commits as a letter
  if the code is valid.
- **Decoder tree** — left branch = dash, right branch = dot. Your path glows
  amber. Remote operators on the same frequency glow green.
- **Frequency** — drag the tuning knob (or use the wheel / ± buttons).
  Each kHz is a separate room on the relay; tune the same number to hear
  another operator.
- **Ear-copy mode** — flip the lever to freeze the decoder. The decoded log
  becomes a notepad and you have to transcribe what you hear yourself.
- **Sidetone** — your key is 620 Hz, peers are 540 Hz, so you can tell
  yourself apart from them at a glance.

## Running locally

You need Node 18+.

```bash
# frontend (in the repo root)
npm install
npm run dev          # vite dev server on :5173

# relay server (in another shell)
cd server
npm install
npm start            # ws relay on :8787
```

Open `http://localhost:5173` in two browser tabs, tune both to the same
frequency, and tap morse at each other.

### Environment

The frontend looks for `VITE_RADIO_URL` at build time. Default is
`ws://localhost:8787`. For production set it to your relay's `wss://` URL,
e.g.:

```bash
VITE_RADIO_URL=wss://relay.example.com npm run build
```

## Deploying

The frontend is a plain Vite static build; the relay is a tiny Node WS
server. Two pieces, two deploy targets.

### Coolify (self-hosted)

- **Relay (backend)** — add a new "Dockerfile" application, base directory
  `server/`, port `8787`, healthcheck `/healthz`. Coolify's Traefik handles
  WebSocket upgrades out of the box; expose it on a subdomain like
  `relay.example.com`.
- **Frontend** — add a "Static Site" application, base directory `.`,
  build command `npm install && npm run build`, publish directory `dist`.
  Set `VITE_RADIO_URL=wss://relay.example.com` as a build-time env var,
  serve it on `shortwave.example.com`.

### Fly.io (relay only)

`server/fly.toml` is already wired up. From the `server/` directory:

```bash
fly launch --no-deploy   # only if you haven't created an app yet
fly deploy
```

WebSockets and the `/healthz` check are configured. The default region is
`fra`; change `primary_region` in `fly.toml` if you want it elsewhere.

## Project layout

```
.
├── index.html
├── package.json            # frontend deps
├── src/
│   ├── App.jsx             # top-level layout
│   ├── components/         # RadioPanel, MorseTree, ChannelPanel, …
│   ├── hooks/              # useMorseSimulator, useRadioChannel
│   ├── data/morse.js       # alphabet + tree layout coordinates
│   ├── lib/identity.js     # callsign / frequency / notepad persistence
│   └── styles/index.css    # the whole bakelite-and-amber theme
└── server/
    ├── index.js            # WebSocket relay (rooms keyed by freq)
    ├── package.json
    ├── Dockerfile
    └── fly.toml
```

## License

MIT — do what you want, no warranty.
