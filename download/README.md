# Agent Notary — Download

**xoras-notary v0.1.0** — tamper-evident receipts for AI agent actions.

- `xoras-notary-v0.1.0.tar.gz` — source archive (this CLI + README). SHA-256 shown on the product page and in `xoras-notary-v0.1.0.tar.gz.sha256`.
- `xoras-notary.py` — the bare CLI, stdlib-only, Python 3.8+.

## Quick start
```bash
tar -xzf xoras-notary-v0.1.0.tar.gz
cd xoras-notary-0.1.0
python3 xoras-notary.py keygen --key notary.key
echo '{"agent":"your-agent","action":"what it did"}' > payload.json
python3 xoras-notary.py issue --key notary.key --payload payload.json --chain chain.jsonl
python3 xoras-notary.py verify-chain --chain chain.jsonl --key notary.key
```

## What v0.1 proves — and what it does not
- Proves: a payload was notarized by the holder of the notary key at a recorded time, and the chain was not altered afterward.
- Uses HMAC-SHA256 (symmetric). The verifier needs the same key. Public-key attestation with a public verifier is the v1 roadmap item.
- Does not judge whether the agent's action was correct. It notarizes evidence; review of the action itself is a separate control.

No dependencies. No network calls. No telemetry.
