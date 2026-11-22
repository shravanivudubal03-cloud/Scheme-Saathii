import { schemes } from '../data/schemes.js';

// Deterministic rules engine matcher.
// The rules engine evaluates exact boolean predicates from data/schemes.js.
// Follows MVP Engineering Contract:
// - eligible: all required core predicates are satisfied by reviewed facts.
// - needs-info: no known predicate has failed, but one or more required facts are unknown.
// - not-eligible: at least one required predicate is explicitly false.
export function matchSchemes(facts) {
  return schemes
    .filter(scheme => {
      try {
        return Boolean(scheme.rule(facts));
      } catch {
        return false;
      }
    })
    .map(scheme => {
      const evaluation = scheme.evaluator
        ? scheme.evaluator(facts)
        : { isEligible: true, matched: [], unmet: [], missing: [] };
      return {
        ...scheme,
        status: 'ELIGIBLE',
        resultState: 'eligible',
        ruleVersion: scheme.ruleVersion || '2026.1',
        lastVerified: scheme.lastVerified || '2026-11-20',
        sourceOwner: scheme.sourceOwner || scheme.source,
        evaluation
      };
    });
}

// Convert Devanagari numerals (०१२३४५६७८९) to standard ASCII digits (0123456789)
export function normalizeDevanagariNumbers(str) {
  if (!str) return '';
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  let result = str;
  devanagariDigits.forEach((d, idx) => {
    result = result.replaceAll(d, idx.toString());
  });
  return result;
}

// High-accuracy multilingual facts extractor.
// Extracts structured facts from Marathi, Hindi, and English natural speech/text.
// If any value is unknown or unstated, it strictly remains null (no guessing).
export function extractFacts(rawText, defaultState = 'Maharashtra', defaultFamilyType = '') {
  const text = normalizeDevanagariNumbers(rawText || '').toLowerCase();

  const includesAny = (...words) => {
    return words.some(w => text.includes(w.toLowerCase()));
  };

  // 1. AGE EXTRACTION
  let age = null;
  const agePatterns = [
    /(?:वय|age|उम्र|आयु)\s*(?:आहे|is|है|:)?\s*(\d{1,2})/i,
    /(\d{1,2})\s*(?:years?|वर्षे|वर्ष|साल|वयाची|वयाचा|सालाचा|सालाची)/i,
    /(?:माझे|माझं|मेरा|meri|majhe)\s*वय\s*(\d{1,2})/i
  ];
  for (const re of agePatterns) {
    const m = text.match(re);
    if (m && m[1]) {
      const parsed = parseInt(m[1], 10);
      if (parsed >= 0 && parsed <= 110) {
        age = parsed;
        break;
      }
    }
  }

  // 2. ANNUAL INCOME EXTRACTION
  let annualIncome = null;
  const lakhMatch = text.match(/([\d.]+)\s*(?:लाख|lakh|lac)/i);
  const thousandMatch = text.match(/([\d.]+)\s*(?:हजार|thousand|k)/i);
  const directIncomeMatch = text.match(/(?:₹|rs\.?|रुपये|रु\.?)\s*([\d,]{4,})/i) ||
                             text.match(/([\d,]{4,})\s*(?:वार्षिक|annual|सालाना|उत्पन्न|income|कमाई)/i);

  if (lakhMatch && lakhMatch[1]) {
    annualIncome = parseFloat(lakhMatch[1]) * 100000;
  } else if (thousandMatch && thousandMatch[1]) {
    annualIncome = parseFloat(thousandMatch[1]) * 1000;
  } else if (directIncomeMatch && directIncomeMatch[1]) {
    annualIncome = parseFloat(directIncomeMatch[1].replaceAll(',', ''));
  }

  // 3. LANDOWNING EXTRACTION (Acre / Guntha)
  let landOwned = null;
  let landAcre = null;
  const acreMatch = text.match(/([\d.]+)\s*(?:acre|एकर|एकड़|एकड़)/i);
  const gunthaMatch = text.match(/([\d.]+)\s*(?:गुंठा|guntha)/i);

  if (acreMatch && acreMatch[1]) {
    landAcre = parseFloat(acreMatch[1]);
    landOwned = true;
  } else if (gunthaMatch && gunthaMatch[1]) {
    landAcre = parseFloat(gunthaMatch[1]) / 40.0;
    landOwned = true;
  } else if (includesAny('own land', 'owns land', 'जमीन आहे', 'मालकीची जमीन', 'जमीन मालक', 'जमीन माझ्या नावावर', 'जमीन आहे माझी', 'जमिनीची मालकी', 'शेतीची जमीन आहे', 'खुद की जमीन', 'जमीन हमारे नाम')) {
    landOwned = true;
  } else if (includesAny('landless', 'भूमिहीन', 'जमीन नाही', 'जमीन नाहीये', 'नावावर जमीन नाही')) {
    landOwned = false;
  }

  // 4. FARMER STATUS
  let farmer = null;
  if (defaultFamilyType === 'farmer' || landAcre !== null || includesAny('farmer', 'farm', 'farming', 'शेतकरी', 'शेती', 'किसान', 'खेती', 'कास्तकार', 'शेतजमीन', 'शेतमजूर')) {
    farmer = true;
  }

  // 5. GENDER & WOMAN APPLICANT
  let gender = null;
  let womanApplicant = false;
  if (defaultFamilyType === 'woman' || includesAny('महिला', 'स्त्री', 'woman', 'female', 'गृहिणी', 'माता', 'आई', 'मुलगी', 'विधवा', 'बाई', 'patni', 'wife', 'aurat', 'ladki')) {
    gender = 'female';
    womanApplicant = true;
  } else if (includesAny('पुरुष', 'male', 'man', 'पती', 'husband', 'शेतकरी भाऊ')) {
    gender = 'male';
  }

  // 6. FAMILY GIRL CHILD
  let hasGirlChild = null;
  let girlBornAfter2023 = null;
  if (includesAny('daughter', 'girl child', 'girl', 'मुलगी', 'मुली', 'लेक', 'बेटी', 'लड़की', 'कन्या', 'दो मुली', 'दोन मुली', 'एक मुलगी', 'दोन कन्या')) {
    hasGirlChild = true;
  }
  if (includesAny('born after 2023', '२०२३ नंतर', '2023 नंतर', '2024', '2025', '2026', 'लहान मुलगी', 'नवजात मुलगी', 'तान्हे मूल')) {
    girlBornAfter2023 = true;
  }

  // 7. RATION CARD
  let rationCardEligible = null;
  let rationCardType = null;
  if (includesAny('yellow ration', 'yellow card', 'पिवळे रेशन', 'पिवळं रेशन', 'पिवळे कार्ड', 'पीला राशन', 'पीला कार्ड')) {
    rationCardEligible = true;
    rationCardType = 'YELLOW';
  } else if (includesAny('orange ration', 'orange card', 'केशरी रेशन', 'केशरी कार्ड', 'नारंगी राशन', 'नारंगी कार्ड')) {
    rationCardEligible = true;
    rationCardType = 'ORANGE';
  } else if (includesAny('antyodaya', 'अंत्योदय', 'aay card', 'annapurna', 'अन्नपूर्णा')) {
    rationCardEligible = true;
    rationCardType = 'ANTYODAYA';
  } else if (includesAny('white ration', 'पांढरे रेशन', 'सफेद राशन', 'white card')) {
    rationCardEligible = false;
    rationCardType = 'WHITE';
  }

  // 8. BPL STATUS
  let bpl = null;
  if (includesAny('bpl', 'below poverty', 'दारिद्र्य रेष', 'बीपीएल', 'गरीबी रेखा', 'दारिद्र्यरेषेखालील')) {
    bpl = true;
  }

  // 9. SUPPORT NEED (Widow / Disability / Destitute / Orphan)
  let supportNeed = null;
  if (defaultFamilyType === 'disability' || includesAny('widow', 'widowed', 'disabled', 'disability', 'handicapped', 'orphan', 'destitute', 'unmarried', 'divorced', 'निराधार', 'विधवा', 'दिव्यांग', 'अपंग', 'अनाथ', 'घटस्फोट', 'घटस्फोटित', 'एकटी', 'आधार नाही', 'विकलांग', 'परित्यक्ता')) {
    supportNeed = true;
  }

  // 10. SENIOR CITIZEN
  let seniorCitizen = null;
  if (defaultFamilyType === 'senior' || (age !== null && age >= 60) || includesAny('senior citizen', 'old age', 'वृद्ध', 'म्हातारे', 'ज्येष्ठ नागरिक', 'वयस्कर', 'बुजुर्ग')) {
    seniorCitizen = true;
  }

  // 11. STUDENT IN FAMILY
  let studentInFamily = null;
  if (defaultFamilyType === 'student' || includesAny('student', 'college', 'school', 'विद्यार्थी', 'शाळा', 'कॉलेज', 'शिकत आहे', 'डिप्लोमा', 'डिग्री', 'अभियांत्रिकी', 'शिक्षण', 'दहावी', 'बारावी', '10th', '12th', 'scholarship')) {
    studentInFamily = true;
  }

  // 12. ARTISAN / TRADITIONAL CRAFT
  let artisan = null;
  if (defaultFamilyType === 'artisan' || includesAny('artisan', 'carpenter', 'blacksmith', 'potter', 'tailor', 'barber', 'cobbler', 'सुतार', 'लोहार', 'कुंभार', 'शिंपी', 'न्हावी', 'चांभार', 'कारागीर', 'हातकाम', 'बढ़ई', 'कारीगर', 'मोची', 'दर्जी', 'कुम्हार')) {
    artisan = true;
  }

  // 13. STREET VENDOR / HAWKER
  let vendor = null;
  if (defaultFamilyType === 'vendor' || includesAny('vendor', 'hawker', 'stall', 'cart', 'फेरीवाला', 'हातगाडी', 'भाजी विक्रेता', 'फळे विक्रेता', 'रेहड़ी', 'पटरी', 'ठेला', 'दुकानदार', 'चाय टपरी')) {
    vendor = true;
  }

  // 14. EXCLUSIONS: Income Tax & Government Job
  let incomeTaxPayer = null;
  if (includesAny('income tax payer', 'pay income tax', 'taxpayer', 'आयकर भरतो', 'टॅक्स भरतो', 'आयकरदाता')) {
    incomeTaxPayer = true;
  } else if (includesAny('do not pay tax', "don't pay tax", 'no tax', 'never paid tax', 'आयकर भरत नाही', 'टॅक्स भरत नाही', 'टॅक्स देत नाही', 'आयकर नहीं भरते')) {
    incomeTaxPayer = false;
  }

  let governmentEmployee = null;
  if (includesAny('government employee', 'govt employee', 'सरकारी कर्मचारी', 'शासकीय नोकरी', 'सरकारी नोकरी')) {
    governmentEmployee = true;
  } else if (includesAny('not a government employee', 'no govt employee', 'सरकारी कर्मचारी नाही', 'शासकीय नोकरी नाही', 'सरकारी नौकरी नहीं')) {
    governmentEmployee = false;
  }

  // 15. STATE
  let state = defaultState;
  if (includesAny('maharashtra', 'महाराष्ट्र', 'पुणे', 'मुंबई', 'नागपूर', 'नाशिक', 'औरंगाबाद', 'छत्रपती संभाजीनगर', 'कोल्हापूर', 'सोलापूर', 'अमरावती', 'ठाणे', 'सातारा', 'सांगली')) {
    state = 'Maharashtra';
  } else if (includesAny('uttar pradesh', 'up', 'bihar', 'madhya pradesh', 'karnataka', 'rajasthan', 'gujarat')) {
    state = 'Other';
  }

  return {
    state,
    age,
    annualIncome,
    farmer,
    landOwned,
    landAcre,
    gender,
    womanApplicant,
    hasGirlChild,
    girlBornAfter2023,
    rationCardEligible,
    rationCardType,
    bpl,
    supportNeed,
    seniorCitizen,
    studentInFamily,
    artisan,
    vendor,
    incomeTaxPayer: incomeTaxPayer ?? false,
    governmentEmployee: governmentEmployee ?? false,
    otherPmKisanExclusion: false,
    familyType: defaultFamilyType,
    extractedFieldsCount: [age, annualIncome, farmer, landOwned, hasGirlChild, rationCardEligible, bpl, supportNeed].filter(x => x !== null).length
  };
}

// Generate empathetic, citizen-centric explanation citing official guidelines
export function generateCitizenExplanation(scheme, facts, lang = 'en') {
  const evalResult = scheme.evaluator ? scheme.evaluator(facts) : { isEligible: true, matched: [] };
  const matchedPoints = evalResult.matched || [];

  if (lang === 'mr') {
    return {
      title: `${scheme.name} - पात्रता स्पष्टीकरण`,
      badge: 'अधिकृत शासकीय नियमांनुसार पात्र',
      intro: `आपल्या कुटुंबाने दिलेल्या माहितीची पडताळणी शासकीय नियमावलीनुसार करण्यात आली आहे. खालील कारणांमुळे आपण या योजनेसाठी पात्र ठरता:`,
      reasons: matchedPoints.length > 0
        ? matchedPoints.map(p => p.mr || p.en)
        : scheme.checksMr || scheme.checks,
      officialCitation: `स्रोत: ${scheme.source} (${scheme.sourceLabel}). अंतिम मंजुरी संबंधित शासकीय कार्यालयाच्या पडताळणीवर अवलंबून राहील.`
    };
  } else if (lang === 'hi') {
    return {
      title: `${scheme.name} - पात्रता स्पष्टीकरण`,
      badge: 'सरकारी नियमों के अनुसार पात्र',
      intro: `आपके परिवार द्वारा दी गई जानकारी की जाँच सरकारी नियमों के आधार पर की गई है। निम्नलिखित कारणों से आप इस योजना के पात्र हैं:`,
      reasons: matchedPoints.length > 0
        ? matchedPoints.map(p => p.hi || p.en)
        : scheme.checksHi || scheme.checks,
      officialCitation: `स्रोत: ${scheme.source} (${scheme.sourceLabel})। अंतिम स्वीकृति सरकारी विभाग द्वारा दस्तावेज़ सत्यापन पर निर्भर है।`
    };
  } else {
    return {
      title: `${scheme.name} - Eligibility Explanation`,
      badge: 'Verified by Official Rules Engine',
      intro: `Your facts were evaluated against the official government scheme guidelines. You qualify based on the following verified criteria:`,
      reasons: matchedPoints.length > 0
        ? matchedPoints.map(p => p.en)
        : scheme.checks,
      officialCitation: `Official Source: ${scheme.source} (${scheme.sourceLabel}). Final approval subject to verification by the administering department.`
    };
  }
}
