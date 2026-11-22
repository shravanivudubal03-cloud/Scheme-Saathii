# Scheme Saathi (योजना साथी) — Citizen Benefits Copilot

An AI and deterministic rules-powered civic-tech copilot designed to help crores of eligible Indian families discover, verify, and claim government welfare schemes they are legally entitled to.

Citizens can describe their situation in their mother tongue (**Marathi**, **Hindi**, or **English**) using voice or text. The system extracts structured facts, runs a deterministic rules engine to evaluate eligibility against official government criteria, explains why they qualify with official ministry citations, provides a mandatory document checklist, and generates pre-filled official application forms.

---

## 🌟 Key Capabilities

### 1. Zero-Hallucination Deterministic Rules Engine
- **No LLM Guesswork on Eligibility**: LLMs should never make the final eligibility decision on government entitlements. Eligibility is computed through strict, verified boolean rules in `src/eligibility.js` based on official government gazettes, criteria, and departmental guidelines.
- **Explainability**: The system explains *why* the citizen matches every condition (e.g. landholding, income ceilings, family criteria, age thresholds) and what documents prove it.
- **Official Citations**: Every single scheme result cites the official government department, central/state portal URL, and citizen charter.

### 2. Built for Low-Literacy Users through Voice
- **Speech-to-Text (Voice Input)**: Citizens can speak their story in Marathi (`mr-IN`), Hindi (`hi-IN`), or English (`en-IN`) using the Web Speech API.
- **Text-to-Speech (Audio Guidance)**: Built-in voice playback reads aloud the matched schemes, reasons for qualification, and required documents so rural and low-literacy citizens don't need to read complex paperwork.
- **1-Click Rural Scenario Chips**: Test typical rural and semi-urban stories (marginal farmer, woman with daughter and ration card, senior citizen seeking pension, artisan, student) with a single tap.

### 3. Comprehensive Central & Maharashtra Schemes Catalog
Covering top welfare schemes with real impact:
- **PM-KISAN Samman Nidhi**: ₹6,000/year for landholding farmers.
- **Namo Shetkari Mahasanman Nidhi Yojana**: Additional ₹6,000/year from Maharashtra Govt (Combined ₹12,000).
- **Mukhyamantri Majhi Ladki Bahin Yojana**: ₹1,500/month (₹18,000/year) direct cash transfer for women aged 21–65.
- **Ayushman Bharat PM-JAY & MJPJAY**: ₹5,00,000/year cashless hospitalisation cover.
- **Lek Ladki Yojana**: Up to ₹1,01,000 in 5 stages for girl children born in yellow/orange ration card families.
- **Sanjay Gandhi Niradhar Anudan Yojana**: ₹1,500/month for destitute, widows, and persons with disabilities.
- **Shravanbal Seva Rajya Nivruttivetan Yojana**: ₹1,500/month old-age pension for senior citizens (65+).
- **PM Ujjwala Yojana 2.0**: Free deposit-free LPG gas connection + stove + subsidy for women.
- **PM Awas Yojana (Gramin / Urban)**: ₹1.2–2.5 Lakh housing construction grant + MGNREGA wages.
- **PM Vishwakarma Kaushal Samman Yojana**: ₹15,000 toolkit voucher + collateral-free loans at 5% for artisans.
- **PM SVANidhi**: Working capital loans up to ₹50,000 with 7% interest subsidy for street vendors and hawkers.
- **MahaDBT Post-Matric Scholarship**: 100% Tuition & Exam fee waiver for college students.

### 4. Official Pre-filled Application Forms & CSC Kits
- Automatically fills standard Government of Maharashtra / Aaple Sarkar application forms with the applicant's profile (name, age, landholding, income, ration card, and Aadhaar DBT bank account details).
- Includes applicant self-declaration (हमीपत्र), signature/thumb impression box, document checkboxes, and QR code to the official ministry portal.
- Dedicated `@media print` styling for 1-click A4 printing or PDF download.

---

## 💼 Subscription & Monetization Model

To ensure financial sustainability while remaining true to the civic mission:

| Plan | Target Audience | Price | Key Features |
| :--- | :--- | :--- | :--- |
| **Citizen Basic (नागरिक विनामूल्य)** | Any citizen or family | **₹0 (Free Forever)** | Unlimited scheme search, voice/text input in 3 languages, rules check, official citations, basic checklist. |
| **Family Saathi (कुटुंब साथी)** | Families seeking welfare security | **₹49/mo or ₹299/yr** | Multi-member family portfolio (up to 6 members), 1-click pre-filled printable official PDF forms, WhatsApp & SMS alerts for e-KYC deadlines and payment disbursements, document expiry vault. |
| **CSC / Seva Kendra Partner** | 5+ Lakh VLEs & Cyber Cafes | **₹499/mo or ₹3,999/yr** | Unlimited daily citizen processing, branded forms with custom CSC Center Name, VLE ID, and seal, Rejection Prevention Engine, Citizen Application CRM, and bulk WhatsApp updates. |
| **Gram Panchayat & NGO Drive** | Sarpanches & NGOs | **₹2,499/mo or ₹19,999/yr** | Village-wide welfare saturation tracker (% coverage of PM-KISAN, Ayushman, PMAY), multi-worker field login for Anganwadi & ASHA workers, CSR audit reports. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Vanilla ES Modules JavaScript, responsive modern CSS, Web Speech API (Recognition & Synthesis).
- **Rules Engine**: Pure functional, deterministic predicates in `src/eligibility.js`.
- **Extraction Layer**:
  - `api/extract.mjs`: Serverless function with multi-engine design (Ollama local LLM support, Gemini API support, and built-in offline multilingual NLP regex extractor that supports Devanagari numerals `०-९`, Marathi units like `एकर`, `गुंठा`, `लाख`, and dialectal terms).
- **Deployment**: Vercel Serverless & Static CDN with zero build dependencies.

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/shravanivudubal03-cloud/Scheme-Saathii.git
cd Scheme-Saathii

# Start any local HTTP server
python3 -m http.server 3000
# or
npx serve .
```

Open `http://localhost:3000` in Google Chrome or any modern browser.

---

## ☁️ Deployment on Vercel

```bash
# Deploy using Vercel CLI
npx vercel
```
Or connect the repository on [Vercel Dashboard](https://vercel.com) — zero build configuration is needed as it is fully static with standard serverless functions in `/api`.

---

## 📜 License
MIT License. Built for public good and civic empowerment.
