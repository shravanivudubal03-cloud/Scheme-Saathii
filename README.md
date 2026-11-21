# Scheme Saathi

Scheme Saathi is a voice-friendly, English/Hindi/Marathi benefits discovery pilot. A citizen can describe a household in their own words or use a guided profile. The app turns a story into reviewable facts, checks those facts against explicit scheme rules, shows the reasons and official source, and creates a local preparation draft.

## What is in the MVP

- Story input with browser speech recognition and read-aloud results.
- Ollama structured fact extraction through `POST /api/extract`; a guided question path remains usable when Ollama is not configured.
- A citizen review step where unknown facts remain unknown until the person answers them.
- Deterministic rules and three result states: core conditions match, more information needed, or not a match.
- A sourced catalogue of six schemes, with search and category filters.
- Saved schemes, editable application-preparation drafts, document checklist progress, and print-to-PDF.
- English, Marathi, and Hindi page content, a larger-text preference, responsive layout, and local browser storage.

## Run locally

1. Install Ollama and pull a model that supports structured output (for example, `qwen3:4b`).
2. Copy `.env.example` to `.env.local` and set `OLLAMA_MODEL` to the model you pulled. Keep `OLLAMA_BASE_URL=http://localhost:11434` for local use.
3. Run the app with the Vercel development server (`vercel dev`) so the `/api/extract` function is available.
4. Open the local URL printed by Vercel. Without Ollama, use **I’d rather answer questions** to try the deterministic rules flow.

The static page can also be served without the function, but story extraction will show the manual guided profile as a fallback.

## Deploy to Vercel

Set `OLLAMA_BASE_URL` and `OLLAMA_MODEL` in the Vercel project environment. A deployed function cannot reach Ollama at `localhost`; use an Ollama host that is reachable by Vercel, then redeploy. The story is sent to that configured endpoint for fact extraction only. Guided-profile facts stay in the browser.

## Eligibility architecture

`api/extract.mjs` asks Ollama to return only a fixed JSON schema of candidate facts. The endpoint limits request size and normalizes the response. The page presents those facts for review and correction. `src/eligibility.js` evaluates explicit predicates in `data/schemes.js`; Ollama never chooses a scheme, interprets an eligibility rule, or determines a match. Missing answers are surfaced as “needs details.”

The rules represent a curated summary of core scheme conditions, not every administrative check or an official decision. Scheme cards link directly to the relevant government source and display additional verification notes. Departments make final determinations and can update rules; keep the catalogue current before using this beyond a demo.

## Privacy and scope

Stories sent through the Ollama path go to the Vercel function and the Ollama host configured by the project. Do not enter Aadhaar, bank, or other sensitive identifiers. The guided flow, saved schemes, text-size choice, and draft details are stored in browser local storage only. No application is submitted. The current catalogue is a focused Maharashtra pilot plus central schemes available to Maharashtra residents, not a complete national directory.

## Scheme sources

Each scheme record in `data/schemes.js` has its own official source link. The current pilot includes PM-KISAN, Sanjay Gandhi Niradhar Anudan Yojana, Lek Ladki Yojana, Indira Gandhi National Old Age Pension, Ayushman Vay Vandana Card, and Pradhan Mantri Ujjwala Yojana.

## Project structure

```text
api/extract.mjs        Ollama fact-extraction endpoint
data/schemes.js        Curated scheme records, conditions, sources, documents
src/eligibility.js     Deterministic rule evaluation and missing-fact states
src/main.js            UI, localization, voice, saved items, preparation drafts
index.html             Accessible app shell and views
styles.css             Responsive visual system
```
