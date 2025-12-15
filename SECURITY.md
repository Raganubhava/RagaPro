## Security Checklist (Client & API)

- **HTTPS only**: Serve UI and API over TLS; block mixed content.
- **CORS**: Restrict to known origins; disallow `*`.
- **Authentication/Authorization**: Require auth for any non-public operations; avoid exposing archive/file endpoints publicly if not intended.
- **Input validation**:
  - Server: enforce length/format (DataAnnotations, parameterized DB queries) and reject unexpected fields.
  - Client: keep basic validation, but never rely on it for protection.
- **Rate limiting / bot protection**: Apply per-IP/user rate limits to search, feedback, and bot endpoints; add CAPTCHA on abuse-prone routes if needed.
- **Error handling**: Return generic errors; avoid stack traces or SQL messages in responses.
- **Headers**: Set CSP, X-Content-Type-Options, X-Frame-Options/Frame-Ancestors, Referrer-Policy, HSTS.
- **File handling**: Enforce size/MIME limits, scan uploads, and use signed URLs for private media; set safe download headers.
- **Secrets**: Keep API keys/credentials out of source; use environment configuration.
- **Logging**: Log auth and error events server-side; avoid logging sensitive payloads; monitor for anomalies.
