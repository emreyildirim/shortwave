# Deploy — Shortwave on Coolify

Single docker-compose resource, two services:

| Service | What | Domain | Internal port |
|---------|------|--------|---------------|
| `web`   | Vite SPA via nginx | `shortwaveradio.online` | 80 |
| `relay` | WebSocket bus (`ws`) | `ws.shortwaveradio.online` | 8787 |

The SPA reads the relay URL from `VITE_RADIO_URL`, baked in at build time
(default `wss://ws.shortwaveradio.online`).

---

## 1. DNS (at the registrar for shortwaveradio.online)

Point both records at the Coolify server's public IP:

```
A   @     <COOLIFY_SERVER_IP>
A   ws    <COOLIFY_SERVER_IP>
```

(If the panel only offers CNAME for subdomains: `CNAME ws → shortwaveradio.online`.)

## 2. Coolify — create the application

1. **+ New → Application → Public/Private Repository.**
2. Repository: `https://github.com/emreyildirim/shortwave`, branch `main`.
3. Build Pack: **Docker Compose**. Compose file: `docker-compose.yaml`.
4. Deploy once so Coolify discovers the `web` and `relay` services.

## 3. Assign domains (per service)

In the resource's **Configuration → service domains**:

- `web`  (port 80)   → `https://shortwaveradio.online`
- `relay` (port 8787) → `https://ws.shortwaveradio.online`

Coolify issues Let's Encrypt certs and proxies the WS upgrade through Traefik.

## 4. Auto-deploy on push

- **Private repo:** install the **Coolify GitHub App** on `emreyildirim/shortwave`
  (Coolify → Sources → GitHub) — gives push-triggered redeploys.
- **Public repo:** in the app's **Webhooks** tab, copy the deploy webhook URL and
  add it to GitHub → repo **Settings → Webhooks** (content type `application/json`).

Push to `main` → Coolify rebuilds and redeploys automatically.

## 5. Verify

```
curl -I  https://shortwaveradio.online            # 200, nginx
curl     https://ws.shortwaveradio.online/healthz  # {"ok":true,...}
```

Open the site in two tabs on the same frequency — keying in one should stream
to the other through the relay.

---

## Local sanity check

```
docker compose up --build      # web on :80, relay on :8787 inside the network
```
