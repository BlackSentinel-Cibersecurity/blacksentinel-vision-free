# BlackSentinel Vision — Free / Open-Source Edition

> **This is the free, limited edition.** It's a real, functioning threat
> intelligence platform — not a demo — but it is genuinely limited, not
> just flag-disabled: Dark Web Intel, AI Correlation, Threat Predictions,
> Attack Paths, AI Copilot, and Knowledge Graph are **not included in
> this repository's source at all**. For the full platform with those
> modules, see [blacksentinel.tech](https://blacksentinel.tech).
>
> Note: this app doesn't have a real per-tenant backend yet (only
> `/api/auth` and `/api/health` are real routes — everything else renders
> from local mock data), so unlike the other BlackSentinel free editions
> there's no server-side usage limit to enforce here; the module removal
> above is the whole story for this repo.

## Getting Started

### With Docker (recommended)

```bash
git clone https://github.com/BlackSentinel-Cibersecurity/blacksentinel-vision-free.git
cd blacksentinel-vision-free
./scripts/init-env.sh          # writes .env with a random ADMIN_PASSWORD and JWT_SECRET
docker compose up -d --build
```

Open http://localhost:3000 and sign in as `admin` with the `ADMIN_PASSWORD` that
`init-env.sh` printed (it is also in `.env`). There are no published default
credentials: without `ADMIN_PASSWORD`, sign-in stays off.

### For development

```bash
npm ci
./scripts/init-env.sh
npm run dev
```

### In the browser, nothing to install

Open it in GitHub Codespaces from the repository page (**Code → Codespaces**): the
dev container generates the secrets and starts the stack for you.

---

## Before you run it

- This is a **technical preview** and the open-source edition of the product. It comes with no warranty and no service-level commitment: try it in a test environment first.
- It is **self-hosted**. BlackSentinel does not host it for you, and paid plans are not on sale.
- There are no default credentials: `./scripts/init-env.sh` generates every secret. Never deploy with the example values from `.env.example` or `.env.production`.
- Use it only on systems you own or are explicitly authorized to test or monitor. See the [Acceptable Use Policy](https://blacksentinel.tech/acceptable-use/).

## Support

- Bugs and questions: [open an issue](https://github.com/BlackSentinel-Cibersecurity/blacksentinel-vision-free/issues) in this repository.
- Security reports: follow [security.txt](https://blacksentinel.tech/.well-known/security.txt). Please do not open a public issue for a vulnerability.
- Everything else: BlackSentinel-tech@protonmail.com

## License

MIT. See [LICENSE](LICENSE). The BlackSentinel name and logo are not covered by the licence.
