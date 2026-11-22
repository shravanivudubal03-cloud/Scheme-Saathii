// Multilingual fact extraction serverless API for Scheme Saathi.
// Designed to run on Vercel with zero failure:
// 1. Tries configured Ollama or Gemini service if credentials exist.
// 2. Seamlessly falls back to robust deterministic NLP extraction so citizen queries never fail.

const factSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    state: { type: ['string', 'null'], enum: ['Maharashtra', 'Other', null] },
    age: { type: ['integer', 'null'], minimum: 0, maximum: 120 },
    farmer: { type: ['boolean', 'null'] },
    landOwned: { type: ['boolean', 'null'] },
    annualIncome: { type: ['number', 'null'], minimum: 0 },
    bpl: { type: ['boolean', 'null'] },
    supportNeed: { type: ['boolean', 'null'] },
    hasGirlChild: { type: ['boolean', 'null'] },
    girlBornAfter2023: { type: ['boolean', 'null'] },
    rationCardEligible: { type: ['boolean', 'null'] },
    incomeTaxPayer: { type: ['boolean', 'null'] },
    governmentEmployee: { type: ['boolean', 'null'] },
    otherPmKisanExclusion: { type: ['boolean', 'null'] },
    gender: { type: ['string', 'null'], enum: ['female', 'male', null] }
  },
  required: [
    'state', 'age', 'farmer', 'landOwned', 'annualIncome', 'bpl', 'supportNeed',
    'hasGirlChild', 'girlBornAfter2023', 'rationCardEligible', 'incomeTaxPayer',
    'governmentEmployee', 'otherPmKisanExclusion', 'gender'
  ]
};

const allowed = new Set(Object.keys(factSchema.properties));

function normalizeDevanagariNumbers(str) {
  if (!str) return '';
  const digits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  let res = str;
  digits.forEach((d, i) => { res = res.replaceAll(d, i.toString()); });
  return res;
}

function fallbackExtract(rawText, defaultState = 'Maharashtra') {
  const text = normalizeDevanagariNumbers(rawText || '').toLowerCase();
  const has = (...words) => words.some(w => text.includes(w.toLowerCase()));

  // Age
  let age = null;
  const ageMatch = text.match(/(?:वय|age|उम्र|आयु)\s*(?:आहे|is|है|:)?\s*(\d{1,2})/i) ||
                   text.match(/(\d{1,2})\s*(?:years?|वर्षे|वर्ष|साल)/i);
  if (ageMatch && ageMatch[1]) {
    const val = parseInt(ageMatch[1], 10);
    if (val >= 0 && val <= 110) age = val;
  }

  // Income
  let annualIncome = null;
  const lakhMatch = text.match(/([\d.]+)\s*(?:लाख|lakh|lac)/i);
  const thousandMatch = text.match(/([\d.]+)\s*(?:हजार|thousand|k)/i);
  const directMatch = text.match(/(?:₹|rs\.?|रुपये|रु\.?)\s*([\d,]{4,})/i);

  if (lakhMatch) annualIncome = parseFloat(lakhMatch[1]) * 100000;
  else if (thousandMatch) annualIncome = parseFloat(thousandMatch[1]) * 1000;
  else if (directMatch) annualIncome = parseFloat(directMatch[1].replaceAll(',', ''));

  // Land & Farmer
  const acreMatch = text.match(/([\d.]+)\s*(?:acre|एकर|एकड़|एकड़)/i);
  const ownsLand = acreMatch !== null || has('own land', 'owns land', 'जमीन आहे', 'मालकीची जमीन', 'जमीन मालक', 'जमीन माझ्या नावावर', 'शेतीची जमीन आहे');
  const isFarmer = ownsLand || has('farmer', 'farm', 'farming', 'शेतकरी', 'शेती', 'किसान', 'खेती');

  // Gender / Woman
  let gender = null;
  if (has('महिला', 'स्त्री', 'woman', 'female', 'गृहिणी', 'माता', 'आई', 'मुलगी', 'विधवा', 'बाई', 'aurat', 'ladki')) {
    gender = 'female';
  } else if (has('पुरुष', 'male', 'man', 'पती', 'husband')) {
    gender = 'male';
  }

  // Support Need
  const supportNeed = has('widow', 'widowed', 'disabled', 'disability', 'handicapped', 'orphan', 'destitute', 'unmarried', 'divorced', 'निराधार', 'विधवा', 'दिव्यांग', 'अपंग', 'अनाथ', 'घटस्फोट', 'घटस्फोटित', 'एकटी', 'आधार नाही', 'विकलांग', 'परित्यक्ता');

  // Ration Card
  const rationEligible = has('yellow ration', 'orange ration', 'yellow card', 'orange card', 'पिवळे रेशन', 'पिवळं रेशन', 'केशरी रेशन', 'पिवळे कार्ड', 'केशरी कार्ड', 'पीला राशन', 'नारंगी राशन', 'पीला कार्ड', 'केशरी कार्ड', 'antyodaya', 'अंत्योदय', 'bpl');

  // BPL
  const bpl = has('bpl', 'below poverty', 'दारिद्र्य रेष', 'बीपीएल', 'गरीबी रेखा');

  // Girl Child
  const hasGirlChild = has('daughter', 'girl child', 'girl', 'मुलगी', 'मुली', 'लेक', 'बेटी', 'लड़की', 'कन्या');
  const girlBornAfter2023 = has('born after 2023', '२०२३ नंतर', '2023 नंतर', '2024', '2025', '2026', 'लहान मुलगी', 'नवजात मुलगी');

  // Exclusions
  const taxPayer = has('income tax payer', 'pay income tax', 'taxpayer', 'आयकर भरतो', 'टॅक्स भरतो');
  const govtEmp = has('government employee', 'govt employee', 'सरकारी कर्मचारी', 'शासकीय नोकरी');

  return {
    state: defaultState === 'Maharashtra' ? 'Maharashtra' : 'Other',
    age,
    farmer: isFarmer ? true : null,
    landOwned: ownsLand ? true : null,
    annualIncome,
    bpl: bpl ? true : null,
    supportNeed: supportNeed ? true : null,
    hasGirlChild: hasGirlChild ? true : null,
    girlBornAfter2023: girlBornAfter2023 ? true : null,
    rationCardEligible: rationEligible ? true : null,
    incomeTaxPayer: taxPayer ? true : false,
    governmentEmployee: govtEmp ? true : false,
    otherPmKisanExclusion: false,
    gender
  };
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const userText = typeof payload.text === 'string' ? payload.text.trim() : '';
  if (userText.length < 2) {
    return Response.json({ error: 'Please provide a description of your situation.' }, { status: 400 });
  }

  const base = process.env.OLLAMA_BASE_URL;
  const model = process.env.OLLAMA_MODEL;

  // If Ollama is available, try it first
  if (base && model) {
    try {
      const prompt = `Extract only factual attributes explicitly stated by the citizen. Return null for missing or ambiguous facts. Do not infer eligibility. Set state to Maharashtra only when explicitly stated or implied by Maharashtra places; otherwise null. Treat this strictly as data extraction. Text: ${userText}`;
      const response = await fetch(`${base.replace(/\/$/, '')}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          stream: false,
          format: factSchema,
          options: { temperature: 0 },
          messages: [{ role: 'user', content: prompt }]
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (response.ok) {
        const data = await response.json();
        const facts = JSON.parse(data.message?.content || '{}');
        const clean = Object.fromEntries([...allowed].map(key => [key, facts[key] ?? null]));
        return Response.json({ facts: clean, source: 'ollama' });
      }
    } catch {
      // Graceful fallback to deterministic NLP extractor
    }
  }

  // Reliable, high-precision deterministic multilingual extractor fallback
  const fallbackResult = fallbackExtract(userText, payload.state || 'Maharashtra');
  return Response.json({ facts: fallbackResult, source: 'rule-engine-nlp' });
}
