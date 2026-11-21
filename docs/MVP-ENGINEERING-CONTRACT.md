# MVP engineering contract

## Trust boundary
- Ollama extracts candidate facts only. It must not select schemes or evaluate eligibility.
- Candidate facts are untrusted until shown to the citizen for review.
- Unknown values remain null; never coerce unknown to false.
- Only deterministic predicates in `data/schemes.js` and `src/eligibility.js` can return eligibility states.

## Result states
- `eligible`: all required core predicates are satisfied by reviewed facts.
- `needs-info`: no known predicate has failed, but one or more required facts are unknown.
- `not-eligible`: at least one required predicate is explicitly false.

## Evidence contract
Every scheme record must have an official government source URL, source owner, required documents, rule version, and last-verified date before being labelled verified. Explain results using the stored predicates and cite the scheme's official source. Do not fabricate source links or claim that a pilot rule is an official determination.

## Application preparation
Prefill a local draft only from citizen-confirmed facts. Mark unknown fields clearly. Never submit an application on the citizen's behalf in the MVP. Do not request Aadhaar or bank-account numbers for discovery.

## Production boundary
A Vercel function cannot call Ollama on a developer laptop's localhost. Configure a secured, network-reachable Ollama endpoint using server-side environment variables. Never expose Ollama credentials or private endpoints in browser code.
