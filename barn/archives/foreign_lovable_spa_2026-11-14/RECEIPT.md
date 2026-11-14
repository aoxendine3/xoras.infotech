# Quarantine receipt — foreign SPA bundle (2026-11-14)

- Moved intact (not deleted): `index.html` (built single-page app) and `assets/` (5.0 MB, ~30 hashed bundles).
- Reason: third-party builder output embedded in the published site — references to a foreign prototyping tool, a foreign package-namespace, an OAuth client of a third-party identity provider, and cursor/builder branding throughout the bundles. This violates the XORAS branding law (owner's own names only) and publishes dead routes (/whitepaper, /pricing, /docs, /teams, /terms, /privacy — none exist).
- Replacement: hand-written static `index.html` with links only to pages that exist.
- No content was deleted; the bundle remains in this archive for forensic review.

Addendum: `404.html` moved into the same quarantine — it carried the same foreign builder's badge and third-party asset URLs. Replaced by a static `404.html` with no third-party references.
