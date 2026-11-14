# XORAS Systems — Agent Notary (xoras.infotech)

> **Evidence over claims.** Cryptographic, replayable proof for AI agent actions.

This repository serves **Agent Notary by XORAS** at [aoxendine3.github.io/xoras.infotech](https://aoxendine3.github.io/xoras.infotech/) — a static site, hand-written HTML, zero build system, zero tracking, zero third-party scripts, hosted on GitHub Pages.

## What the site ships

| Route | Purpose |
|---|---|
| `/` | Agent Notary landing — what it proves, how to verify it, download |
| `/product.html` | Buyer-facing product brief with the evidence table |
| `/security.html` | Security model & honest scope — what v0.1 proves and what it does not |
| `/download/xoras-notary-v0.1.0.tar.gz` | **xoras-notary v0.1.0** — stdlib-only Python CLI |
| `/download/xoras-notary.py` | Same CLI as a single file, for direct reading/audit |
| `/download/xoras-notary-v0.1.0.tar.gz.sha256` | Published checksum (also shown on the site) |
| `/404.html` | Plain static 404 |

*(GitHub Pages also serves extensionless paths: `/product`, `/security`.)*

## xoras-notary v0.1.0

Issues and verifies tamper-evident receipts binding an agent action to a cryptographic fingerprint, in a WORM chain: every receipt commits to the hash of the previous one.

- Stdlib-only Python 3.8+. No dependencies. No network. No telemetry.
- v0.1 uses HMAC-SHA256 — **that is symmetric attestation**: the verifier holds the same key. Public-key attestation is the v1 roadmap item.
- It notarizes evidence; it does not judge whether the agent's action was semantically correct.
- Verified end-to-end at publication: issue x2, full-chain verify, single-byte tamper caught at link 1 with exit 1.

## Inventory of the previous incarnation

The pre-2026-11-14 site was a foreign-builder SPA (generated bundles, embedded builder branding, dead routes, and a Cloudflare Worker proxying to a Google-hosted reasoning engine). All of it is quarantined intact under `barn/archives/` with receipts — nothing was destroyed. The Worker additionally has a **live edge deployment**: the account holder must unbind it on Cloudflare (or re-point it at a sovereign endpoint) — that step requires the account's own credential and is the one action this repository cannot perform on its behalf.

## Deployment

GitHub Pages, source `main`, folder `/ (root)`. Push to `main`; Pages rebuilds. Verify with `curl -s https://aoxendine3.github.io/xoras.infotech/`.

*Governed under XORAS Systems Sovereign Architecture Standards. © 2026 XORAS Systems LLC.*
