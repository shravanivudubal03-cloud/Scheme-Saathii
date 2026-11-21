import { schemes } from '../data/schemes.js';

// Keep this function deterministic. Any future language model may only return a candidate
// facts object; this rules engine is the sole authority for matching schemes.
export function matchSchemes(facts) {
  return schemes.filter(scheme => scheme.rule(facts));
}

const patterns = {
  age: [/(?:\b|^)(\d{1,2})\s*(?:years?|वर्ष|साल|वर्षे|वय)(?:\b|$)/i, /(?:वय|age|उम्र)\s*(?:आहे|is|है)?\s*(\d{1,2})/i],
  income: [/(?:₹|rs\.?\s*)?([\d,]{4,})\s*(?:वार्षिक|annual|per year|वर्षाचं|वर्षाचे|सालाना)?\s*(?:उत्पन्न|income|कमाई)/i],
  acre: [/([\d.]+)\s*(?:acre|एकर|एकर जमीन)/i]
};

// A conservative prototype extractor. Unknown or ambiguous answers remain null and never qualify.
export function extractFacts(text, state='Maharashtra', familyType='') {
  const t = text.toLowerCase();
  const get = regexes => { for (const re of regexes) { const m = t.match(re); if (m) return m[1]; } return null; };
  const ageRaw = get(patterns.age), incomeRaw = get(patterns.income), acreRaw = get(patterns.acre);
  const yes = (...words) => words.some(w => t.includes(w));
  const no = (...words) => words.some(w => t.includes(w));
  const hasFamilyGirl = yes('daughter','girl child','मुलगी','मुली','बेटी','लड़की');
  const farmer = familyType === 'farmer' || yes('farmer','farm','शेतकरी','शेती','किसान','खेती');
  const hasSupportCue = yes('widow','widowed','disabled','disability','orphan','destitute','unmarried','sickle','निराधार','विधवा','दिव्यांग','अनाथ','घटस्फोट','एकटी','आधार नाही');
  const bpl = yes('bpl','below poverty','दारिद्र्य रेष','बीपीएल','गरीबी रेखा');
  const rationEligible = yes('yellow ration','orange ration','yellow card','orange card','पिवळे रेशन','पिवळं रेशन','केशरी रेशन','पिवळे कार्ड','केशरी कार्ड','पीला राशन','नारंगी राशन','पीला कार्ड','केशरी कार्ड');
  const noTax = /(?:do not|don't|never)\s+(?:pay|file)\s+(?:income\s+)?tax|आयकर (?:भरत नाही|भरत नाहीत)/i.test(t);
  const noGovt = /(?:not|no longer)\s+(?:a\s+)?government employee|सरकारी कर्मचारी नाही/i.test(t);
  const result = {
    state: state === 'Maharashtra' ? 'Maharashtra' : null,
    age: ageRaw ? Number(ageRaw) : null,
    farmer: farmer ? true : null,
    landOwned: acreRaw !== null || yes('own land','owns land','जमीन आहे','मालकीची जमीन','जमीन मालक','जमीन माझ्या नावावर','जमीन आहे माझी','जमिनीची मालकी') ? true : null,
    annualIncome: incomeRaw ? Number(incomeRaw.replaceAll(',','')) : null,
    bpl: bpl ? true : null,
    supportNeed: hasSupportCue ? true : null,
    hasGirlChild: hasFamilyGirl ? true : null,
    girlBornAfter2023: null,
    rationCardEligible: rationEligible ? true : null,
    incomeTaxPayer: yes('income tax payer','pay income tax','आयकर भरतो','आयकरदाता') ? true : noTax ? false : null,
    governmentEmployee: yes('government employee','सरकारी कर्मचारी','government officer') ? true : noGovt ? false : null,
    otherPmKisanExclusion: null,
    extracted: { age: ageRaw !== null, income: incomeRaw !== null, land: acreRaw !== null || yes('own land','owns land','जमीन आहे','मालकीची जमीन','जमीन माझ्या नावावर'), supportNeed: hasSupportCue, girlChild: hasFamilyGirl, rationCard: rationEligible }
  };
  return result;
}

export function explainMatches(matches, facts) {
  return matches.map(s => ({ id: s.id, matched: Boolean(s.rule(facts)), conditions: [...(facts.age != null ? [`age=${facts.age}`] : []), ...(facts.farmer ? ['farmer=true'] : []), ...(facts.landOwned ? ['landOwned=true'] : []), ...(facts.supportNeed ? ['supportNeed=true'] : []), ...(facts.hasGirlChild ? ['hasGirlChild=true'] : []), ...(facts.rationCardEligible ? ['rationCardEligible=true'] : [])] }));
}
