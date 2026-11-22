// Scheme Saathi Subscription & Monetization Engine
// Ethical civic-tech model: Free for citizens forever, micro-pricing for families, B2B SaaS for CSC / Seva Kendras, and institutional tools for Gram Panchayats.

export const SUBSCRIPTION_PLANS = {
  CITIZEN_FREE: {
    id: 'CITIZEN_FREE',
    name: 'Citizen Basic',
    nameMr: 'नागरिक विनामूल्य',
    nameHi: 'नागरिक नि:शुल्क',
    tagline: 'Always free for every citizen and rural family',
    taglineMr: 'प्रत्येक नागरिक आणि ग्रामीण कुटुंबासाठी कायम मोफत',
    taglineHi: 'हर नागरिक और ग्रामीण परिवार के लिए हमेशा मुफ्त',
    priceMonthly: 0,
    priceYearly: 0,
    badge: 'FREE',
    color: '#3d6350',
    features: [
      { text: 'Unlimited scheme eligibility checks', mr: 'अमर्यादित योजनांची पात्रता तपासणी', hi: 'असीमित योजनाओं की पात्रता जांच' },
      { text: 'Voice & text input in Marathi, Hindi & English', mr: 'मराठी, हिंदी व इंग्रजीत बोलून किंवा लिहून शोध', hi: 'मराठी, हिंदी व अंग्रेज़ी में बोलकर या लिखकर खोज' },
      { text: 'Deterministic rules check (Zero LLM guesswork)', mr: 'नियम-आधारित अचूक पात्रता (कोणतीही दिशाभूल नाही)', hi: 'नियम-आधारित सटीक पात्रता (कोई गलत अनुमान नहीं)' },
      { text: 'Official government source citation & portals', mr: 'प्रत्येक योजनेचा अधिकृत शासकीय स्रोत व लिंक', hi: 'प्रत्येक योजना का आधिकारिक सरकारी स्रोत व लिंक' },
      { text: 'Basic document preparation checklist', mr: 'कागदपत्रांची प्राथमिक चेकलिस्ट', hi: 'कागजातों की प्राथमिक चेकलिस्ट' }
    ]
  },
  FAMILY_SAATHI: {
    id: 'FAMILY_SAATHI',
    name: 'Family Saathi (कुटुंब साथी)',
    nameMr: 'कुटुंब साथी प्रो',
    nameHi: 'परिवार साथी प्रो',
    popular: true,
    tagline: 'Complete welfare security for your whole family',
    taglineMr: 'आपल्या संपूर्ण कुटुंबाच्या शासकीय हक्कांची खात्री',
    taglineHi: 'आपके पूरे परिवार के सरकारी हकों की सुरक्षा',
    priceMonthly: 49,
    priceYearly: 299,
    badge: 'POPULAR',
    color: '#d99e38',
    features: [
      { text: 'Everything in Free, plus:', mr: 'मोफत योजनेतील सर्व, तसेच:', hi: 'मुफ्त योजना के सभी लाभ, साथ ही:' },
      { text: 'Multi-member family portfolio (up to 6 members)', mr: 'कुटुंबातील ६ सदस्यांचे एकत्र प्रोफाईल व योजना ट्रॅकिंग', hi: 'परिवार के 6 सदस्यों का संयुक्त प्रोफ़ाइल व योजना ट्रैकिंग' },
      { text: 'Pre-filled official Government Application PDF', mr: 'शासकीय नमुन्यातील आपोआप भरलेला अधिकृत अर्ज (PDF)', hi: 'सरकारी प्रारूप में पहले से भरा हुआ आवेदन फॉर्म (PDF)' },
      { text: 'WhatsApp & SMS deadline reminders (e-KYC, dates)', mr: 'व्हॉट्सॲप व एसएमएसवर महत्त्वाच्या तारखांचे अलर्ट', hi: 'व्हाट्सएप व एसएमएस पर अंतिम तिथि व किस्त सूचना' },
      { text: 'Digital Document Vault with validity/expiry alerts', mr: 'उत्पन्न व जात दाखला मुदत संपण्यापूर्वी अलर्ट', hi: 'आय व जाति प्रमाण पत्र वैधता समाप्त होने की पूर्व सूचना' },
      { text: 'Mother-tongue voice assistant guidance', mr: 'मराठी/हिंदीत संपूर्ण ऑडिओ मार्गदर्शन', hi: 'मराठी/हिंदी में पूर्ण ऑडियो मार्गदर्शन' }
    ]
  },
  CSC_PARTNER: {
    id: 'CSC_PARTNER',
    name: 'CSC / Seva Kendra Partner',
    nameMr: 'आपले सरकार / सीएससी केंद्र प्रो',
    nameHi: 'सीएससी / सेवा केंद्र पार्टनर',
    tagline: 'High-speed citizen processing for VLEs & Cyber Cafes',
    taglineMr: 'ग्राम पातळीवरील आपले सरकार व सीएससी चालकांसाठी व्यवसाय साधन',
    taglineHi: 'ग्राम स्तरीय सीएससी व जन सेवा केंद्र संचालकों के लिए व्यावसायिक टूल',
    priceMonthly: 499,
    priceYearly: 3999,
    badge: 'BUSINESS',
    color: '#1a4e3e',
    features: [
      { text: 'Unlimited citizen assessments & daily speed intake', mr: 'अमर्यादित नागरिकांचे अर्ज व जलद तपासणी', hi: 'असीमित नागरिकों की त्वरित पात्रता जांच' },
      { text: 'Branded Application Kits with your CSC Seal & Header', mr: 'आपल्या केंद्राच्या नावाचे व शिक्क्याचे छापील अर्ज किट', hi: 'अपने केंद्र के नाम व मुहर के साथ ब्रांडेड फॉर्म' },
      { text: 'Rejection Prevention Engine (save client fees)', mr: 'अपात्रतेचे धोके आधीच ओळखून अर्ज रद्द होण्यापासून बचाव', hi: 'अपात्रता जांच जिससे नागरिक का पैसा व समय व्यर्थ न हो' },
      { text: 'Citizen Application CRM & Token Tracker', mr: 'नागरिक अर्ज ट्रॅकिंग व टोकन पावती व्यवस्थापन', hi: 'नागरिक आवेदन ट्रैकिंग व टोकन रसीद सिस्टम' },
      { text: 'Bulk WhatsApp dispatch to villagers on benefit arrival', mr: 'गावकऱ्यांना अनुदान जमा झाल्याचे थेट व्हॉट्सॲप मेसेज', hi: 'गाँव वालों को किस्त आने पर सीधे व्हाट्सएप सूचना' },
      { text: 'Verified Scheme Saathi Partner Certificate', mr: 'अधिकृत योजना साथी केंद्र प्रमाणपत्र', hi: 'अधिकृत योजना साथी पार्टनर प्रमाण पत्र' }
    ]
  },
  GRAM_PANCHAYAT: {
    id: 'GRAM_PANCHAYAT',
    name: 'Gram Panchayat & NGO Drive',
    nameMr: 'ग्राम पंचायत व संस्था सॅच्युरेशन',
    nameHi: 'ग्राम पंचायत व सामाजिक संस्था',
    tagline: '100% village scheme saturation tracking for Sarpanches & NGOs',
    taglineMr: 'गावातील १००% कुटुंबांना सर्व शासकीय योजनांचा लाभ मिळवून देण्यासाठी',
    taglineHi: 'गाँव के 100% परिवारों को सरकारी योजनाओं से संतृप्त करने हेतु',
    priceMonthly: 2499,
    priceYearly: 19999,
    badge: 'INSTITUTIONAL',
    color: '#654424',
    features: [
      { text: 'Village-wide welfare saturation analytics dashboard', mr: 'गावातील योजना सॅच्युरेशन डॅशबोर्ड (% कव्हरेज)', hi: 'गाँव का संपूर्ण योजना कवरेज व संतृप्ति डैशबोर्ड' },
      { text: 'Multi-login field worker app for Anganwadi / ASHA', mr: 'अंगणवाडी सेविका व आशा कार्यकर्त्यांसाठी लॉगिन', hi: 'आंगनवाड़ी व आशा कार्यकर्ताओं के लिए फील्ड मोड' },
      { text: 'Identify 100% left-out eligible families in village', mr: 'गावातील वंचित राहिलेल्या पात्र कुटुंबांची यादी', hi: 'गाँव के छूटे हुए पात्र परिवारों की वार्डवार सूची' },
      { text: 'Exportable CSV/PDF audit reports for CSR & Collectorate', mr: 'जिल्हाधिकारी व सीएसआर फंडासाठी तयार अहवाल', hi: 'कलेक्टर कार्यालय व सीएसआर ऑडिट के लिए रेडी रिपोर्ट' }
    ]
  }
};

// Storage keys
const STORAGE_PLAN = 'ss-subscription-plan';
const STORAGE_FAMILY = 'ss-family-members';
const STORAGE_CSC = 'ss-csc-profile';

// Get current active plan
export function getCurrentPlan() {
  const savedId = localStorage.getItem(STORAGE_PLAN) || 'CITIZEN_FREE';
  return SUBSCRIPTION_PLANS[savedId] || SUBSCRIPTION_PLANS.CITIZEN_FREE;
}

// Upgrade / change plan
export function setCurrentPlan(planId) {
  if (SUBSCRIPTION_PLANS[planId]) {
    localStorage.setItem(STORAGE_PLAN, planId);
    window.dispatchEvent(new CustomEvent('plan-changed', { detail: SUBSCRIPTION_PLANS[planId] }));
    return SUBSCRIPTION_PLANS[planId];
  }
  return getCurrentPlan();
}

// Check feature permissions
export function canAccessFeature(featureKey) {
  const plan = getCurrentPlan();
  const planId = plan.id;

  switch (featureKey) {
    case 'official_prefilled_pdf':
    case 'whatsapp_alerts':
    case 'family_portfolio':
    case 'document_vault':
      return planId === 'FAMILY_SAATHI' || planId === 'CSC_PARTNER' || planId === 'GRAM_PANCHAYAT';

    case 'csc_branded_kits':
    case 'rejection_engine':
    case 'citizen_crm':
    case 'bulk_whatsapp':
      return planId === 'CSC_PARTNER' || planId === 'GRAM_PANCHAYAT';

    case 'village_saturation':
    case 'field_worker_mode':
    case 'csr_audit_reports':
      return planId === 'GRAM_PANCHAYAT';

    default:
      return true;
  }
}

// Manage Family Members Portfolio
export function getFamilyMembers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_FAMILY) || '[]');
  } catch {
    return [];
  }
}

export function saveFamilyMember(member) {
  const members = getFamilyMembers();
  if (member.id) {
    const idx = members.findIndex(m => m.id === member.id);
    if (idx !== -1) members[idx] = member;
    else members.push(member);
  } else {
    member.id = 'fam-' + Date.now();
    members.push(member);
  }
  localStorage.setItem(STORAGE_FAMILY, JSON.stringify(members));
  return members;
}

export function deleteFamilyMember(memberId) {
  const members = getFamilyMembers().filter(m => m.id !== memberId);
  localStorage.setItem(STORAGE_FAMILY, JSON.stringify(members));
  return members;
}

// Manage CSC Center Profile
export function getCscProfile() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CSC) || JSON.stringify({
      centerName: 'Aaple Sarkar Seva Kendra (आपले सरकार सेवा केंद्र)',
      vleId: 'VLE-MH-412001',
      operatorName: 'Shravani Dubal',
      contactPhone: '+91 98765 43210',
      taluka: 'Haveli',
      district: 'Pune',
      state: 'Maharashtra'
    }));
  } catch {
    return {
      centerName: 'Aaple Sarkar Seva Kendra',
      vleId: 'VLE-MH-412001',
      operatorName: 'Center Operator',
      contactPhone: '+91 98765 43210',
      taluka: 'Haveli',
      district: 'Pune',
      state: 'Maharashtra'
    };
  }
}

export function saveCscProfile(profile) {
  localStorage.setItem(STORAGE_CSC, JSON.stringify(profile));
  return profile;
}
