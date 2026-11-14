# Quarantine receipt — cloudflare_worker_daxx.js (2026-11-14)

- Diagnosis: tracked Cloudflare Worker proxying the retired foreign-builder SPA's "Cloud DAXX" to a Google AI Platform Reasoning Engine (projects/262277406581/us-west1/reasoningEngines/...). Two defects: (1) hard dependency on Google infrastructure against the XORAS zero-cloud-transit mandate; (2) the tracked file carried the live project ID and engine resource ID.
- Context: the SPA that called this worker was quarantined in an earlier pass; nothing on the current site references this worker. It was also API-keyed, so its removal breaks no public flow.
- Action: moved intact to this archive. The live Cloudflare Worker on the account must also be undeployed (or re-pointed at a sovereign endpoint) by the account holder — that is a DNS/worker operation only the owner's Cloudflare credential can perform. Until then, it remains available at the edge with no code in this repository and no secrets tracked here.
