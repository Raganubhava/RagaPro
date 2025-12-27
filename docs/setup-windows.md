# RagaPro Windows Setup Guide

Follow these steps to get the web app running on a Windows machine from scratch.

## Prerequisites
- Windows 10/11
- Node.js 18+ (LTS recommended) and Git installed
- Terminal: PowerShell (Admin once for Corepack) or Git Bash
- Dependencies like React/Vite install automatically via `pnpm install`; no separate React setup is needed.

## 1) Clone the repo
```powershell
git clone https://github.com/<your-org>/RagaProUI.git
cd RagaProUI/ragaPro
```

## 2) Enable pnpm via Corepack (required version)
```powershell
corepack enable
corepack prepare pnpm@10.24.0 --activate
```

## 3) Install dependencies (monorepo-wide)
```powershell
pnpm install
```

## 4) Run the web app (dev server)
```powershell
pnpm dev
```
- Opens Vite on http://localhost:5173/
- Hot reload is enabled.

## 5) Build for production
```powershell
pnpm build
```
- Outputs the web bundle to `apps/web/dist` (Turbo builds all workspaces).

## 6) Code quality
```powershell
pnpm lint
```

## Troubleshooting
- Stale deps: `pnpm install --force` (preferred on Windows). The `clean-install` script is POSIX-based (`rm`/`find`), so run it in Git Bash only if needed.
- Port 5173 busy: stop the other process or start Vite on another port: `pnpm dev -- --host --port 5174`.
- Missing pnpm: rerun step 2 to ensure Corepack activates pnpm@10.24.0.

## What’s included
- Monorepo managed by Turborepo + pnpm workspaces.
- Web app in `apps/web`, shared UI in `packages/ui`.
- No required `.env` variables for local dev (default `.env.local` is empty).
