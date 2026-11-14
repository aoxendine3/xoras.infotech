#!/usr/bin/env python3
"""
xoras-notary — Agent Notary v0.1.0
==================================
Issues and verifies tamper-evident receipts that bind an agent action to a
cryptographic fingerprint. A receipt chain is a WORM (write-once-read-many)
sequence: each receipt commits to the hash of the previous one, so any
retroactive edit breaks verification of every subsequent link.

Scope, stated plainly:
  * v0.1 uses HMAC-SHA256. Verification requires the notary's key. This is
    symmetric attestation: a holder of the key can issue and verify.
  * This tool does not inspect what the agent did. It proves that a payload
    was notarized by the key holder at a given time, and that the chain is
    intact. Semantic review of agent behavior is a separate control.
  * Public-key (asymmetric) attestation with a public verifier is the v1
    roadmap item. Do not claim otherwise.

No third-party dependencies. Python 3.8+.

Usage:
  xoras-notary keygen [--key PATH]            Generate a 256-bit key (default: ./notary.key)
  xoras-notary issue  --key KEY --payload P [--chain CHAIN]
                                              Notarize payload JSON; appends to chain JSONL
  xoras-notary verify-key --key KEY
                                              Sanity-check a key file
  xoras-notary verify-chain --chain CHAIN --key KEY
                                              Re-verify every link in a chain; exit 1 on any break
  xoras-notary sha256 FILE                    Print the SHA-256 of a file (payload fingerprint)
"""
import argparse
import hashlib
import hmac
import json
import os
import sys
import time

VERSION = "0.1.0"
GENESIS = "0" * 64

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()

def sha256_json(obj):
    return hashlib.sha256(json.dumps(obj, sort_keys=True, separators=(",", ":")).encode()).hexdigest()

def load_key(path):
    raw = open(path, "rb").read().strip()
    try:
        key = bytes.fromhex(raw.decode())
    except ValueError:
        print(f"[FAIL] {path} is not a hex key — generate one with `keygen`", file=sys.stderr)
        sys.exit(2)
    if len(key) < 32:
        print("[FAIL] key must be at least 32 bytes", file=sys.stderr)
        sys.exit(2)
    return key

def cmd_keygen(args):
    if os.path.exists(args.key):
        print(f"[FAIL] {args.key} already exists — refusing to overwrite a notary key", file=sys.stderr)
        sys.exit(2)
    key = os.urandom(32)
    with open(args.key, "wb") as f:
        f.write(key.hex().encode() + b"\n")
    os.chmod(args.key, 0o600)
    print(f"[OK] key written to {args.key} (mode 0600). Keep it secret; it is the notary's identity.")
    return 0

def cmd_issue(args):
    key = load_key(args.key)
    payload = json.load(open(args.payload))
    prev = GENESIS
    if args.chain and os.path.exists(args.chain):
        with open(args.chain) as f:
            lines = [l for l in f.read().splitlines() if l.strip()]
        if lines:
            prev = json.loads(lines[-1])["receipt_sha256"]
    body = {
        "v": VERSION,
        "issued_at": int(time.time()),
        "payload_sha256": sha256_json(payload),
        "payload": payload,
        "prev_receipt_sha256": prev,
    }
    body_bytes = json.dumps(body, sort_keys=True, separators=(",", ":")).encode()
    receipt_sha = hashlib.sha256(body_bytes).hexdigest()
    sig = hmac.new(key, receipt_sha.encode(), hashlib.sha256).hexdigest()
    receipt = dict(body, receipt_sha256=receipt_sha, signature=sig)
    if args.chain:
        with open(args.chain, "a", encoding="utf-8") as f:
            f.write(json.dumps(receipt, sort_keys=True) + "\n")
        print(f"[OK] receipt notarized -> {args.chain}  id={receipt_sha[:16]}...  prev={prev[:16]}...")
    else:
        print(json.dumps(receipt, indent=2, sort_keys=True))
    return 0

def cmd_verify_key(args):
    key = load_key(args.key)
    derived = hashlib.sha256(key).hexdigest()
    print(f"[OK] key parses. fingerprint=sha256:{derived[:32]}... (use this fingerprint as the notary's public name)")
    return 0

def cmd_verify_chain(args):
    key = load_key(args.key)
    prev = GENESIS
    n = 0
    with open(args.chain) as f:
        for i, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            r = json.loads(line)
            body = {k: r[k] for k in ("v", "issued_at", "payload_sha256", "payload", "prev_receipt_sha256")}
            body_bytes = json.dumps(body, sort_keys=True, separators=(",", ":")).encode()
            expect_sha = hashlib.sha256(body_bytes).hexdigest()
            expect_sig = hmac.new(key, expect_sha.encode(), hashlib.sha256).hexdigest()
            if not hmac.compare_digest(expect_sha, r["receipt_sha256"]):
                print(f"[FAIL] link {i}: receipt hash mismatch (payload or content altered)"); return 1
            if not hmac.compare_digest(expect_sig, r["signature"]):
                print(f"[FAIL] link {i}: signature mismatch (key altered or receipt forged)"); return 1
            if not hmac.compare_digest(prev, r["prev_receipt_sha256"]):
                print(f"[FAIL] link {i}: chain break (previous receipt missing or replaced)"); return 1
            prev = r["receipt_sha256"]
            n += 1
    print(f"[OK] chain intact: {n} receipt(s) verified with key {os.path.basename(args.key)}")
    return 0

def main():
    ap = argparse.ArgumentParser(prog="xoras-notary", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("keygen"); p.add_argument("--key", default="notary.key"); p.set_defaults(fn=cmd_keygen)
    p = sub.add_parser("issue"); p.add_argument("--key", required=True); p.add_argument("--payload", required=True); p.add_argument("--chain", default=None); p.set_defaults(fn=cmd_issue)
    p = sub.add_parser("verify-key"); p.add_argument("--key", required=True); p.set_defaults(fn=cmd_verify_key)
    p = sub.add_parser("verify-chain"); p.add_argument("--chain", required=True); p.add_argument("--key", required=True); p.set_defaults(fn=cmd_verify_chain)
    p = sub.add_parser("sha256"); p.add_argument("file"); p.set_defaults(fn=lambda a: (print(sha256_file(a.file)), 0)[1])
    args = ap.parse_args()
    sys.exit(args.fn(args))

if __name__ == "__main__":
    main()
