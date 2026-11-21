# Scheme Saathi

A low-friction citizen benefits discovery MVP. People can describe their situation in English, Hindi, or Marathi; review the interpreted facts; receive deterministic rule-based scheme matches with reasons, document checklists, and official government sources; and keep application preparation drafts locally.

## Run locally

Open `index.html` in a modern browser, or serve the project directory with any static HTTP server. No build step or API key is required. Deploy as a static site on Vercel; no build command or output directory is needed.

## Eligibility architecture

`src/eligibility.js` is the only eligibility matcher. It receives structured facts and applies explicit predicates from `data/schemes.js`. It does not use an LLM to select schemes. The current MVP uses a conservative multilingual phrase extractor for demonstration; unknown values remain unknown, and the user should review the interpreted details before matching. A production extraction service can replace `extractFacts` with a schema-constrained model that returns proposed JSON facts only. Validate that JSON, show it to the citizen for correction, and pass accepted facts to `matchSchemes`. Never expose a model-selected scheme ID as an eligibility decision.

## Data and privacy

The current catalog covers three Maharashtra schemes and stores saved schemes, preparation checklists, and language preference in the browser's local storage. It does not collect or transmit personal information. Speech uses the browser's native Web Speech API where available. Rules and benefits are a curated snapshot; each result links to its official source and final eligibility remains with the administering department.

## Production roadmap

1. Expand a reviewed, versioned scheme catalog with department sources and effective dates.
2. Add a schema-validated Hindi/Marathi/English extraction API and user confirmation step.
3. Add voice playback and accessible assisted flows, with a human help option.
4. Add secure backend storage and authentication only with explicit consent and a data retention plan.
5. Integrate official application endpoints or provide downloadable, department-approved drafts. The current checklist is not a submitted form.
6. Add automated coverage for rule boundaries, exclusions, multilingual fact extraction, and source freshness.

## Ollama fact extraction

The description is sent to the configured Ollama service to propose structured facts. Citizens review and can correct every fact before the deterministic matcher in `src/eligibility.js` checks the catalog. Ollama never selects schemes or decides eligibility. Do not include Aadhaar, bank, or other sensitive identifiers in the description.

For local development, copy `.env.example` to `.env.local`, choose an Ollama model available on your machine, and run the site through Vercel's local development server so `/api/extract` is available. For a Vercel deployment, configure `OLLAMA_BASE_URL` and `OLLAMA_MODEL` in the project environment. The Ollama URL must be reachable from Vercel; `localhost` on Vercel points to the function itself, not your computer. The app shows an error when Ollama is unavailable and does not silently substitute an AI eligibility decision.
