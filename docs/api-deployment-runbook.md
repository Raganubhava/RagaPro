# RagaNidhi API Deployment Runbook (.NET + FastAPI)

This document captures the final working setup for both APIs behind `https://raganidhi.com`.

## Architecture

- `.NET Web API` (Raga discovery): `http://127.0.0.1:5000`
- `FastAPI` (Learning endpoints): `http://127.0.0.1:5001`
- `Frontend SPA`: served by nginx from:
  - `/var/www/ragapro/RagaPro/apps/web/dist`

## Frontend API Configuration

### Discovery API

File: `packages/ui/src/constants/api.ts`

- Use same-origin API base:
  - `export const API_BASE_URL = '/api';`

This ensures production requests resolve to:
- `https://raganidhi.com/api/...`

### Learning API

File: `apps/web/src/fastApi.ts`

- Learning endpoints use:
  - `FAST_API_BASE_URL = '/fastapi'`
  - `/fastapi/api/learn/kalyani`

In dev, `vite` proxies `/fastapi` to port `5001`.

## Vite Dev Proxy

File: `apps/web/vite.config.mts`

```ts
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    secure: false,
  },
  '/fastapi': {
    target: 'http://localhost:5001',
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/fastapi/, ''),
  },
}
```

## Nginx Production Config

File: `/etc/nginx/sites-available/raganidhi.com`

Use these critical `location` blocks inside the HTTPS server:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /fastapi/ {
    proxy_pass http://127.0.0.1:5001/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

Important:
- Keep `proxy_pass http://127.0.0.1:5000;` (no trailing `/`) for `/api/`.
- Keep `/api/` and `/fastapi/` blocks before `location /`.

Apply config:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## FastAPI Deployment (systemd)

FastAPI source path:
- `/var/www/ragapro/learning-api`

Real app module:
- `app.py` with `app = FastAPI()`

Service file:
- `/etc/systemd/system/learning-fastapi.service`

```ini
[Unit]
Description=RagaNidhi Learning FastAPI
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/var/www/ragapro/learning-api
ExecStart=/var/www/ragapro/learning-api/.venv/bin/uvicorn app:app --host 127.0.0.1 --port 5001
Restart=always
RestartSec=3
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

Service commands:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now learning-fastapi
sudo systemctl restart learning-fastapi
sudo systemctl status learning-fastapi
```

## Verification Checklist

### Local upstream checks

```bash
curl -i http://127.0.0.1:5000/api/ping
curl -i http://127.0.0.1:5001/api/learn/kalyani
```

### Public checks

```bash
curl -i https://raganidhi.com/api/ping
curl -i https://raganidhi.com/api/raga/Kalyani
curl -i https://raganidhi.com/fastapi/api/learn/kalyani
```

Expected:
- `/api/*` returns `.NET` responses.
- `/fastapi/*` returns learning JSON.
- Learning page `https://raganidhi.com/learn/kalyani` loads lesson content.

## Issues Fixed During This Setup

1. Frontend was calling `https://localhost:44308/api` in production.
   - Fixed by switching to `/api`.
2. Service worker warnings from unreachable `localhost`.
   - Resolved after API base fix + redeploy/cache refresh.
3. FastAPI returned 502 publicly.
   - Root cause: FastAPI not running/import failure.
4. `app import` failures in systemd.
   - Root cause: source files were not copied to deploy path.
   - Fixed by copying from `/home/ubuntu/Downloads/Learning` to `/var/www/ragapro/learning-api`.
5. `.NET` public API returned 404 while local API was healthy.
   - Root cause: nginx proxy path handling.
   - Fixed with correct `/api/` proxy block and reload.

## Operational Notes

- If frontend changes are made, rebuild web app:

```bash
cd /var/www/ragapro/RagaPro
pnpm --filter web build
```

- If browser shows stale behavior, clear cache/service worker:
  - DevTools -> Empty Cache and Hard Reload.
