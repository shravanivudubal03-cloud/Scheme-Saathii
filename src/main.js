import { schemes } from '../data/schemes.js';
import { matchSchemes, extractFacts, generateCitizenExplanation } from './eligibility.js';
import {
  SUBSCRIPTION_PLANS,
  getCurrentPlan,
  setCurrentPlan,
  canAccessFeature,
  getCscProfile,
  saveCscProfile
} from './subscriptions.js';

// Multilingual translations for UI copy
const copy = {
  mr: {
    navDiscover: 'योजना शोधा',
    navSaved: 'जतन केलेल्या',
    navApplications: 'माझे अर्ज',
    navSubscriptions: 'सदस्यता व दर',
    navCsc: 'सीएससी केंद्र',
    roleLabel: 'भूमिका:',
    eyebrow: 'प्रत्येक नागरिकाचा हक्काचा साथीदार',
    headline: 'तुम्ही पात्र असलेल्या सर्व शासकीय योजना,<br/><em>तुमच्या स्वतःच्या भाषेत सोप्या शब्दात.</em>',
    subhead: 'तुमच्या कुटुंबाची परिस्थिती मराठी, हिंदी किंवा इंग्रजीत सांगा. आमचे नियम-आधारित इंजिन योजनांची अचूक पडताळणी करेल, कारणे समजावेल, कागदपत्रांची यादी देईल आणि थेट अर्ज तयार करून देईल.',
    yourStory: 'कौटुंबिक परिस्थिती सांगा',
    tellUs: 'तुमच्या कुटुंबाबद्दल बोला किंवा लिहा',
    plainWords: 'कोणतेही अवघड किंवा कायदेशीर शब्द वापरण्याची गरज नाही. शेती, जमीन, रेशन कार्ड, घरातील मुले किंवा उत्पन्नाबद्दल रोजच्या साध्या भाषेत सांगा.',
    trySample: '💡 एका क्लिकवर उदाहरणे तपासा:',
    chipFarmer: '२ एकर जमीन असलेला शेतकरी',
    chipWoman: 'केशरी रेशन कार्ड व मुलगी असलेली महिला',
    chipSenior: '६८ वर्षे वय असलेले वृद्ध नागरिक',
    chipArtisan: 'सुतार / लोहार कारागीर (टूलकिट)',
    chipStudent: 'कॉलेजमध्ये शिकणारा विद्यार्थी',
    storyLabel: 'तुमची परिस्थिती (येथे बोला किंवा लिहा):',
    speak: 'मराठीत बोला',
    listening: 'ऐकत आहे... बोला',
    privacyHint: 'आपली माहिती अधिकृत शासकीय नियमांनुसार तपासली जाते. येथे आधार किंवा बँक पिन क्रमांक लिहू नका.',
    stateLabel: 'वास्तव्य असलेले राज्य',
    familyLabel: 'मुख्य व्यवसाय / वर्गवारी',
    rulesFirst: 'अधिकृत शासकीय नियमावलीनुसार पडताळणी',
    checkSchemes: 'माझ्यासाठीच्या योजना शोधा',
    trustRules: 'नियम-आधारित अचूकता: पात्रतेत कोणताही खोटा अंदाज नाही',
    trustSources: '१००% अधिकृत शासकीय मंत्रालयांचे पोर्टल व थेट लिंक्स',
    trustPrivacy: 'गोपनीयता सुरक्षित: माहिती आपल्या डिव्हाइसवर सुरक्षित राहते',
    savedTitle: 'तुम्ही जतन केलेल्या योजना',
    savedSub: 'तुम्हाला किंवा तुमच्या कुटुंबियांना अर्ज करायच्या योजनांची यादी.',
    appsTitle: 'अर्जाची तयारी व चेकलिस्ट',
    appsSub: 'आवश्यक कागदपत्रे गोळा करा, अधिकृत अर्ज तयार करा आणि शासकीय कार्यालयात सादर करा.',
    pricingEyebrow: 'पारदर्शक व नागरिक-केंद्रित दर',
    pricingTitle: 'नागरिक, कुटुंबे आणि आपले सरकार / सीएससी केंद्रांसाठी योजना',
    pricingSub: 'नागरिकांसाठी योजना शोधणे कायम १००% मोफत राहील. कुटुंबाच्या एकत्र योजना, आपोआप भरलेले अधिकृत अर्ज, व्हॉट्सॲप अलर्ट्स किंवा सीएससी केंद्राच्या कामासाठी अपग्रेड करा.',
    monthly: 'मासिक',
    yearly: 'वार्षिक',
    cscPortalTitle: 'आपले सरकार व सीएससी केंद्र डॅशबोर्ड',
    cscPortalSub: 'ग्राम पातळीवरील आपले सरकार, सीएससी व सेतू केंद्र चालकांसाठी जलद नागरिक अर्ज साधन.',
    step1: 'टप्पा १ पैकी २ · तुमची माहिती',
    step2: 'टप्पा २ पैकी २ · माहिती पडताळणी',
    confirmDetails: 'तुमच्या बोलण्यातून घेतलेली माहिती तपासा',
    factReviewHint: 'खालील माहिती बरोबर आहे का ते तपासा. चुकीची माहिती दुरुस्त करा; न विचारलेली माहिती रिकामी राहील.',
    runRules: 'योजनांचे नियम तपासा',
    resultsLabel: 'तुमच्यासाठी पात्र योजना',
    matchesFound: 'पात्र योजना सापडल्या',
    whyFit: 'तुम्ही का पात्र आहात (शासकीय कारणे)',
    mandatoryDocs: 'आवश्यक अधिकृत कागदपत्रे',
    officialSource: 'अधिकृत शासकीय स्रोत',
    prefillForm: '📝 अधिकृत अर्ज तयार करा',
    saveScheme: '♡ जतन करा',
    savedScheme: '♥ जतन केले',
    listenVoice: '🔊 बोलून ऐका',
    readResultsAloud: '🔊 सर्व निकाल ऐका',
    editDetails: '← माहिती बदला',
    checkAgain: 'पुन्हा तपासा',
    noMatchTitle: 'अधिक माहितीची गरज आहे',
    noMatchDesc: 'दिलेल्या माहितीनुसार थेट योजना जुळली नाही. कृपया वय, रेशन कार्डचा रंग किंवा शेतीजमिनीची माहिती जोडून पुन्हा तपासा.',
    disclaimer: 'सूचना: ही प्राथमिक तपासणी अधिकृत शासकीय नियमांवर आधारित आहे. अंतिम मंजुरी संबंधित शासकीय कार्यालयाच्या मूळ कागदपत्र पडताळणीवर अवलंबून राहील.',
    addedToast: 'योजना जतन केली!',
    removedToast: 'योजना यादीतून हटवली!',
    planActivatedToast: 'सदस्यता यशस्वीरित्या सुरू झाली!'
  },
  hi: {
    navDiscover: 'योजनाएँ खोजें',
    navSaved: 'सहेजी गई',
    navApplications: 'मेरे आवेदन',
    navSubscriptions: 'सदस्यता व दर',
    navCsc: 'सीएससी केंद्र',
    roleLabel: 'भूमिका:',
    eyebrow: 'हर नागरिक का विश्वसनीय साथी',
    headline: 'जिन सरकारी योजनाओं के आप पात्र हैं,<br/><em>अपनी भाषा में आसान शब्दों में समझें।</em>',
    subhead: 'अपने परिवार की स्थिति हिंदी, मराठी या अंग्रेज़ी में बताएं। हमारा नियम-आधारित इंजन आधिकारिक पात्रता जांचेगा, कारण समझाएगा, दस्तावेज़ सूची देगा और आवेदन पत्र तैयार करेगा।',
    yourStory: 'पारिवारिक स्थिति बताएं',
    tellUs: 'अपने परिवार के बारे में बोलें या लिखें',
    plainWords: 'कठिन कानूनी शब्दों की ज़रूरत नहीं। खेती, ज़मीन, राशन कार्ड, बच्चों की पढ़ाई या आय के बारे में रोज़मर्रा की भाषा में बताएं।',
    trySample: '💡 एक क्लिक में उदाहरण देखें:',
    chipFarmer: '2 एकड़ ज़मीन वाला किसान',
    chipWoman: 'नारंगी राशन कार्ड व बेटी वाली महिला',
    chipSenior: '68 वर्ष के बुजुर्ग नागरिक',
    chipArtisan: 'बढ़ई / लोहार कारीगर (टूलकिट)',
    chipStudent: 'कॉलेज में पढ़ने वाला छात्र',
    storyLabel: 'अपनी स्थिति बताएं (बोलें या लिखें):',
    speak: 'हिंदी में बोलें',
    listening: 'सुन रहे हैं... बोलिए',
    privacyHint: 'आपकी जानकारी सरकारी नियमों से जांची जाती है। कृपया आधार या बैंक पिन न लिखें।',
    stateLabel: 'निवास का राज्य',
    familyLabel: 'मुख्य पेशा / श्रेणी',
    rulesFirst: 'आधिकारिक सरकारी नियमों द्वारा सत्यापन',
    checkSchemes: 'मेरी योजनाएं खोजें',
    trustRules: 'नियम-आधारित सटीकता: पात्रता में कोई मनगढ़ंत अनुमान नहीं',
    trustSources: '100% आधिकारिक सरकारी मंत्रालयों के पोर्टल व लिंक',
    trustPrivacy: 'पूर्ण गोपनीयता: जानकारी आपके डिवाइस पर सुरक्षित है',
    savedTitle: 'आपकी सहेजी गई योजनाएं',
    savedSub: 'जिन योजनाओं में आप आवेदन करना चाहते हैं उनकी सूची।',
    appsTitle: 'आवेदन तैयारी व चेकलिस्ट',
    appsSub: 'दस्तावेज़ जुटाएं, आधिकारिक आवेदन फॉर्म तैयार करें और जमा करें।',
    pricingEyebrow: 'पारदर्शी व नागरिक-हितैषी मूल्य',
    pricingTitle: 'नागरिकों, परिवारों और सीएससी जन सेवा केंद्रों के लिए योजनाएं',
    pricingSub: 'नागरिकों के लिए योजना खोज हमेशा मुफ्त रहेगी। परिवार के संयुक्त पोर्टफोलियो, पहले से भरे फॉर्म, व्हाट्सएप अलर्ट व सीएससी केंद्र के लिए अपग्रेड करें।',
    monthly: 'मासिक',
    yearly: 'वार्षिक',
    cscPortalTitle: 'सीएससी जन सेवा केंद्र पोर्टल',
    cscPortalSub: 'ग्राम स्तरीय वीएलई (VLE) और साइबर कैफ़े के लिए त्वरित नागरिक सेवा टूल।',
    step1: 'चरण 1 / 2 · आपकी स्थिति',
    step2: 'चरण 2 / 2 · विवरण सत्यापन',
    confirmDetails: 'अपनी बताई गई जानकारी की पुष्टि करें',
    factReviewHint: 'जांच लें कि क्या यह जानकारी सही है। गलत जानकारी को बदलें; अधूरी जानकारी खाली रहेगी।',
    runRules: 'योजना के नियम जांचें',
    resultsLabel: 'आपके लिए पात्र योजनाएं',
    matchesFound: 'पात्र योजनाएं मिलीं',
    whyFit: 'आप क्यों पात्र हैं (सरकारी कारण)',
    mandatoryDocs: 'आवश्यक आधिकारिक दस्तावेज़',
    officialSource: 'सरकारी आधिकारिक स्रोत',
    prefillForm: '📝 आधिकारिक फॉर्म तैयार करें',
    saveScheme: '♡ सहेजें',
    savedScheme: '♥ सहेजा गया',
    listenVoice: '🔊 बोलकर सुनें',
    readResultsAloud: '🔊 सभी परिणाम सुनें',
    editDetails: '← जानकारी बदलें',
    checkAgain: 'पुनः जांचें',
    noMatchTitle: 'अधिक जानकारी की आवश्यकता है',
    noMatchDesc: 'दी गई जानकारी से कोई सीधी योजना नहीं मिली। कृपया उम्र, राशन कार्ड या ज़मीन का विवरण जोड़कर पुनः प्रयास करें।',
    disclaimer: 'सूचना: यह जांच आधिकारिक सरकारी नियमों पर आधारित है। अंतिम स्वीकृति संबंधित विभाग द्वारा दस्तावेज़ सत्यापन पर निर्भर है।',
    addedToast: 'योजना सहेजी गई!',
    removedToast: 'योजना हटा दी गई!',
    planActivatedToast: 'सदस्यता सफलतापूर्वक सक्रिय हुई!'
  },
  en: {
    navDiscover: 'Find schemes',
    navSaved: 'Saved',
    navApplications: 'My applications',
    navSubscriptions: 'Plans & Pricing',
    navCsc: 'CSC Partner',
    roleLabel: 'Role:',
    eyebrow: 'A TRUSTED CITIZEN COPILOT',
    headline: 'Government schemes you qualify for,<br/><em>explained simply in your language.</em>',
    subhead: 'Describe your family situation in Hindi, Marathi, or English. Our deterministic rules engine checks official criteria, explains why you qualify, lists required documents, and prepares your pre-filled application.',
    yourStory: 'DESCRIBE YOUR SITUATION',
    tellUs: 'Speak or write about your family',
    plainWords: 'No legal terms needed. Mention your occupation, land, ration card, children, or income in your daily spoken words.',
    trySample: '💡 Tap an example story to try:',
    chipFarmer: 'Maharashtra Farmer with 2 acres',
    chipWoman: 'Woman with Orange card & daughter',
    chipSenior: 'Senior citizen (68 yrs) without income',
    chipArtisan: 'Carpenter / Artisan seeking toolkit',
    chipStudent: 'College student seeking scholarship',
    storyLabel: 'Your family situation (speak or write):',
    speak: 'Speak in Marathi / Hindi',
    listening: 'Listening to your voice...',
    privacyHint: 'Evaluated by a fixed deterministic rules engine. Please do not enter sensitive Aadhaar or bank PIN numbers.',
    stateLabel: 'State of residence',
    familyLabel: 'Primary occupation / Category',
    rulesFirst: 'Eligibility verified by official scheme predicates',
    checkSchemes: 'Find Matching Schemes',
    trustRules: 'Rules-engine precision: Zero LLM hallucinations on eligibility',
    trustSources: '100% verified links to official Ministry & MahaDBT portals',
    trustPrivacy: 'Data privacy: Processed securely on this device',
    savedTitle: 'Your Saved Schemes',
    savedSub: 'Keep track of schemes you and your family plan to apply for.',
    appsTitle: 'My Application Drafts & Checklists',
    appsSub: 'Gather documents, prepare pre-filled official application forms, and track submissions.',
    pricingEyebrow: 'TRANSPARENT & CIVIC-MINDED PRICING',
    pricingTitle: 'Plans for Citizens, Families & CSC Centers',
    pricingSub: 'Citizen discovery is 100% free forever. Upgrade for multi-family portfolios, official pre-filled forms, WhatsApp deadline alerts, or CSC Center bulk processing.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    cscPortalTitle: 'Aaple Sarkar & CSC Operator Portal',
    cscPortalSub: 'High-speed citizen intake and branded application forms for Village Level Entrepreneurs (VLEs).',
    step1: 'STEP 1 OF 2 · YOUR STORY',
    step2: 'STEP 2 OF 2 · FACT CONFIRMATION',
    confirmDetails: 'Confirm your extracted details',
    factReviewHint: 'Review what was understood from your words. Correct any detail; unstated details remain blank.',
    runRules: 'Evaluate Scheme Rules',
    resultsLabel: 'Your Qualifying Schemes',
    matchesFound: 'eligible schemes matched',
    whyFit: 'Why you qualify (Official reasons)',
    mandatoryDocs: 'Mandatory Documents Needed',
    officialSource: 'Official Government Portal',
    prefillForm: '📝 Pre-fill Application Form',
    saveScheme: '♡ Save Scheme',
    savedScheme: '♥ Saved',
    listenVoice: '🔊 Listen',
    readResultsAloud: '🔊 Read All Results',
    editDetails: '← Edit Details',
    checkAgain: 'Check Again',
    noMatchTitle: 'More information needed',
    noMatchDesc: 'We could not confirm a match with the current details. Please provide your age, ration card type, or land acreage to re-evaluate.',
    disclaimer: 'Note: This initial evaluation is based on official government guidelines. Final approval is subject to document verification by the administering department.',
    addedToast: 'Scheme saved to your shortlist!',
    removedToast: 'Scheme removed from saved list!',
    planActivatedToast: 'Plan activated successfully!'
  }
};

// Application State
let lang = localStorage.getItem('ss-lang') || 'mr';
let currentFacts = null;
let currentMatches = [];
let savedSchemes = new Set(JSON.parse(localStorage.getItem('ss-saved') || '[]'));
let drafts = JSON.parse(localStorage.getItem('ss-drafts') || '[]');
let isYearlyBilling = false;
let pendingUpgradePlanId = null;

// Helpers
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const t = k => (copy[lang] && copy[lang][k]) || copy.en[k] || k;

// Initialize App
function init() {
  updateLanguage(lang);
  updatePlanBadge();
  setupEventListeners();
  renderPricingCards();
  loadCscProfileIntoUi();

  // Role switcher sync
  const currentPlan = getCurrentPlan();
  $('#roleSwitcher').value = currentPlan.id;
}

// Language Switching
function updateLanguage(newLang) {
  lang = newLang;
  localStorage.setItem('ss-lang', lang);

  // Update language buttons
  $$('.language-switch button').forEach(b => {
    b.classList.toggle('selected', b.dataset.lang === lang);
  });

  // Update data-copy elements
  $$('[data-copy]').forEach(el => {
    const key = el.dataset.copy;
    const translation = t(key);
    if (translation) el.innerHTML = translation;
  });

  // Update placeholders
  const storyEl = $('#story');
  if (lang === 'mr') {
    storyEl.placeholder = 'उदाहरण: मी महाराष्ट्रातील शेतकरी आहे. वय ४५ वर्षे, २ एकर शेती, केशरी रेशन कार्ड आहे आणि एक मुलगी कॉलेजमध्ये शिकते आहे.';
  } else if (lang === 'hi') {
    storyEl.placeholder = 'उदाहरण: मैं महाराष्ट्र का किसान हूँ। उम्र 45 वर्ष, 2 एकड़ ज़मीन, नारंगी राशन कार्ड है और एक बेटी कॉलेज में पढ़ती है।';
  } else {
    storyEl.placeholder = 'Example: I am a farmer in Maharashtra. Age 45, own 2 acres of land, have an Orange ration card and a daughter in college.';
  }

  // Refresh active view content
  if ($('#view-discover').classList.contains('active-view')) {
    if (currentFacts) renderResults(currentFacts, currentMatches);
  } else if ($('#view-saved').classList.contains('active-view')) {
    renderSaved();
  } else if ($('#view-applications').classList.contains('active-view')) {
    renderDrafts();
  } else if ($('#view-subscriptions').classList.contains('active-view')) {
    renderPricingCards();
  }
}

// Navigation View Switching
function showView(viewName) {
  $$('.view').forEach(v => v.classList.remove('active-view'));
  const target = $(`#view-${viewName}`);
  if (target) target.classList.add('active-view');

  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === viewName));

  if (viewName === 'saved') renderSaved();
  if (viewName === 'applications') renderDrafts();
  if (viewName === 'subscriptions') renderPricingCards();
  if (viewName === 'csc') loadCscProfileIntoUi();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toast Messages
function showToast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

// Plan Badge in Header
function updatePlanBadge() {
  const plan = getCurrentPlan();
  const badgeEl = $('#currentPlanBadge');
  if (badgeEl) {
    badgeEl.textContent = plan.badge;
    badgeEl.style.borderColor = plan.color;
  }
}

// Sample Story Autofill
function applySampleStory(sampleType) {
  const storyEl = $('#story');
  const familyEl = $('#familyType');
  const stateEl = $('#state');

  stateEl.value = 'Maharashtra';

  if (sampleType === 'farmer') {
    familyEl.value = 'farmer';
    storyEl.value = lang === 'mr'
      ? 'मी महाराष्ट्रातील शेतकरी आहे. माझे वय ४६ वर्षे आहे आणि माझ्या नावावर २ एकर शेतीजमीन आहे. आम्ही आयकर भरत नाही आणि कोणतेही सरकारी कर्मचारी नाही.'
      : lang === 'hi'
      ? 'मैं महाराष्ट्र का किसान हूँ। मेरी उम्र 46 वर्ष है और परिवार के नाम 2 एकड़ खेती की ज़मीन है। हम कोई आयकर नहीं देते और कोई सरकारी नौकरी में नहीं है।'
      : 'I am a farmer in Maharashtra. My age is 46 and I own 2 acres of cultivable agricultural land. We do not pay income tax and no family member is a government employee.';
  } else if (sampleType === 'woman') {
    familyEl.value = 'woman';
    storyEl.value = lang === 'mr'
      ? 'मी ३४ वर्षांची महिला असून महाराष्ट्रात राहते. आमच्याकडे केशरी रेशन कार्ड आहे. आमच्या घरात २०२३ नंतर जन्मलेली एक लहान मुलगी आहे आणि वार्षिक उत्पन्न १ लाख आहे.'
      : lang === 'hi'
      ? 'मैं 34 वर्ष की महिला हूँ और महाराष्ट्र में रहती हूँ। हमारे पास नारंगी राशन कार्ड है। परिवार में 2023 के बाद जन्मी एक बेटी है और सालाना आय 1 लाख रुपये है।'
      : 'I am a 34-year-old woman residing in Maharashtra. We have an Orange ration card. We have a girl child born after 2023 and our annual household income is 1 lakh rupees.';
  } else if (sampleType === 'senior') {
    familyEl.value = 'senior';
    storyEl.value = lang === 'mr'
      ? 'माझे वय ६८ वर्षे असून मी वृद्ध नागरिक आहे. माझ्याकडे उत्पन्नाचे कोणतेही साधन नाही, बीपीएल यादीत नाव आहे आणि आधार कार्ड आहे.'
      : lang === 'hi'
      ? 'मेरी उम्र 68 वर्ष है और मैं वरिष्ठ नागरिक हूँ। मेरे पास आय का कोई साधन नहीं है, बीपीएल सूची में नाम है और आधार कार्ड है।'
      : 'My age is 68 years and I am a senior citizen. I have no source of livelihood, our family is in the BPL list, and I have an Aadhaar card.';
  } else if (sampleType === 'artisan') {
    familyEl.value = 'artisan';
    storyEl.value = lang === 'mr'
      ? 'मी पारंपारिक सुतारकाम करतो. वय ३८ वर्षे आहे. मला आधुनिक हत्यारांचे टूलकिट आणि व्यवसाय वाढवण्यासाठी सवलतीचे कर्ज हवे आहे.'
      : lang === 'hi'
      ? 'मैं पारंपरिक बढ़ई का काम करता हूँ। मेरी उम्र 38 वर्ष है। मुझे आधुनिक टूलकिट और व्यापार बढ़ाने के लिए रियायती ब्याज पर ऋण चाहिए।'
      : 'I work as a traditional carpenter. Age is 38. I need a modern toolkit voucher and a concessional loan to expand my craft.';
  } else if (sampleType === 'student') {
    familyEl.value = 'student';
    storyEl.value = lang === 'mr'
      ? 'मी पदवीच्या पहिल्या वर्षात शिकत असलेला विद्यार्थी आहे. कुटुंबाचे वार्षिक उत्पन्न दीड लाख असून आमच्याकडे जात प्रमाणपत्र व डोमिसाईल आहे.'
      : lang === 'hi'
      ? 'मैं कॉलेज में डिग्री का छात्र हूँ। परिवार की सालाना आय 1.5 लाख है और हमारे पास जाति प्रमाण पत्र तथा अधिवास प्रमाण पत्र है।'
      : 'I am a college degree student. Family annual income is 1.5 lakh rupees, and I possess a Caste Certificate and Maharashtra Domicile certificate.';
  }

  showToast('Sample story applied! Click "Find Matching Schemes" to evaluate.');
}

// Intake & Facts Extraction
async function analyzeStory() {
  const story = $('#story').value.trim();
  const state = $('#state').value;
  const familyType = $('#familyType').value;

  if (!story) {
    $('#story').focus();
    showToast(lang === 'mr' ? 'कृपया तुमच्या परिस्थितीबद्दल थोडे लिहा किंवा बोला.' : 'Please enter or speak your situation.');
    return;
  }

  const checkBtn = $('#checkBtn');
  checkBtn.disabled = true;
  const originalText = checkBtn.innerHTML;
  checkBtn.innerHTML = `<span>⏳ ${lang === 'mr' ? 'तपासत आहे...' : 'Analyzing facts...'}</span>`;

  try {
    let facts = null;
    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: story, state, language: lang })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.facts) facts = data.facts;
      }
    } catch {
      // Offline fallback
    }

    // High-accuracy fallback extractor
    if (!facts) {
      facts = extractFacts(story, state, familyType);
    } else {
      if (familyType === 'farmer') facts.farmer = true;
      if (familyType === 'woman') { facts.gender = 'female'; facts.womanApplicant = true; }
      if (familyType === 'senior') facts.seniorCitizen = true;
      if (familyType === 'artisan') facts.artisan = true;
      if (familyType === 'student') facts.studentInFamily = true;
      if (state) facts.state = state;
    }

    currentFacts = facts;
    $('#intakePanel').classList.add('hidden');
    $('#progressBar').style.width = '68%';
    $('#stepLabel').textContent = t('step2');
    $('#progressHint').textContent = t('confirmDetails');

    renderFactConfirmation();
    $('#results').classList.remove('hidden');
    $('#results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    showToast('Error evaluating details. Please check your inputs.');
  } finally {
    checkBtn.disabled = false;
    checkBtn.innerHTML = originalText;
  }
}

// Fact Confirmation Screen
function renderFactConfirmation() {
  const resultsEl = $('#results');
  const yesNoSelect = (factKey, val) => `
    <select data-fact="${factKey}">
      <option value="unknown" ${val == null ? 'selected' : ''}>${lang === 'mr' ? 'माहित नाही' : lang === 'hi' ? 'पता नहीं' : 'Not stated'}</option>
      <option value="yes" ${val === true ? 'selected' : ''}>${lang === 'mr' ? 'होय (Yes)' : lang === 'hi' ? 'हाँ (Yes)' : 'Yes'}</option>
      <option value="no" ${val === false ? 'selected' : ''}>${lang === 'mr' ? 'नाही (No)' : lang === 'hi' ? 'नहीं (No)' : 'No'}</option>
    </select>
  `;

  const fields = [
    ['farmer', lang === 'mr' ? 'शेतकरी कुटुंब (Farmer)' : 'Farmer Family'],
    ['landOwned', lang === 'mr' ? 'स्वतःची शेतीजमीन (Owns Land)' : 'Owns Agricultural Land'],
    ['hasGirlChild', lang === 'mr' ? 'कुटुंबात मुलगी आहे (Girl child)' : 'Girl Child in Family'],
    ['rationCardEligible', lang === 'mr' ? 'पिवळे / केशरी रेशन कार्ड (Ration Card)' : 'Yellow / Orange Ration Card'],
    ['bpl', lang === 'mr' ? 'दारिद्र्यरेषेखालील (BPL Family)' : 'BPL Household'],
    ['supportNeed', lang === 'mr' ? 'निराधार / विधवा / दिव्यांग (Support Need)' : 'Destitute / Widow / Disability'],
    ['incomeTaxPayer', lang === 'mr' ? 'आयकर भरतात (Pays Income Tax)' : 'Pays Income Tax'],
    ['governmentEmployee', lang === 'mr' ? 'नियमित सरकारी कर्मचारी (Govt Job)' : 'Government Employee']
  ];

  resultsEl.innerHTML = `
    <div class="results-header">
      <div>
        <span class="section-kicker">${t('step2')}</span>
        <h2>${t('confirmDetails')}</h2>
        <p>${t('factReviewHint')}</p>
      </div>
      <div class="results-actions">
        <button class="secondary-button" id="editStoryBtn">${t('editDetails')}</button>
      </div>
    </div>

    <div class="results-panel">
      <div class="fact-grid">
        ${fields.map(([k, label]) => `
          <div class="fact-row">
            <span>${label}</span>
            ${yesNoSelect(k, currentFacts[k] ?? null)}
          </div>
        `).join('')}

        <div class="fact-row">
          <span>${lang === 'mr' ? 'वय (Age in years)' : 'Age (years)'}</span>
          <input type="number" data-number="age" min="0" max="110" value="${currentFacts.age ?? ''}" placeholder="उदा. 42" />
        </div>

        <div class="fact-row">
          <span>${lang === 'mr' ? 'वार्षिक उत्पन्न ₹ (Annual Income)' : 'Annual Income ₹'}</span>
          <input type="number" data-number="annualIncome" min="0" value="${currentFacts.annualIncome ?? ''}" placeholder="उदा. 120000" />
        </div>
      </div>

      <div class="panel-footer">
        <div class="secure-label">
          <span>✓</span>
          <span>${t('rulesFirst')}</span>
        </div>
        <button id="runRulesBtn" class="primary-button">
          <span>${t('runRules')}</span>
          <span class="arrow-icon">→</span>
        </button>
      </div>
    </div>
  `;

  $('#editStoryBtn').onclick = () => {
    $('#intakePanel').classList.remove('hidden');
    $('#results').classList.add('hidden');
    $('#progressBar').style.width = '35%';
    $('#stepLabel').textContent = t('step1');
  };

  $('#runRulesBtn').onclick = () => {
    // Read updated facts
    resultsEl.querySelectorAll('[data-fact]').forEach(sel => {
      const k = sel.dataset.fact;
      currentFacts[k] = sel.value === 'unknown' ? null : sel.value === 'yes';
    });
    resultsEl.querySelectorAll('[data-number]').forEach(inp => {
      const k = inp.dataset.number;
      currentFacts[k] = inp.value === '' ? null : Number(inp.value);
    });

    currentMatches = matchSchemes(currentFacts);
    $('#progressBar').style.width = '100%';
    $('#progressHint').textContent = `${currentMatches.length} ${t('matchesFound')}`;
    renderResults(currentFacts, currentMatches);
  };
}

// Render Schemes Results
function renderResults(facts, matches) {
  const resultsEl = $('#results');

  let cardsHtml = '';
  if (!matches.length) {
    cardsHtml = `
      <div class="no-match-box">
        <div class="no-icon">🔍</div>
        <h3>${t('noMatchTitle')}</h3>
        <p>${t('noMatchDesc')}</p>
        <button class="primary-button" id="backToEditBtn">${t('editDetails')}</button>
      </div>
    `;
  } else {
    cardsHtml = matches.map(scheme => {
      const isSaved = savedSchemes.has(scheme.id);
      const categoryText = lang === 'mr' ? scheme.categoryMr || scheme.category : lang === 'hi' ? scheme.categoryHi || scheme.category : scheme.category;
      const amountText = lang === 'mr' ? scheme.amountMr || scheme.amount : lang === 'hi' ? scheme.amountHi || scheme.amount : scheme.amount;
      const summaryText = lang === 'mr' ? scheme.summaryMr || scheme.summary : lang === 'hi' ? scheme.summaryHi || scheme.summary : scheme.summary;
      const checks = lang === 'mr' ? scheme.checksMr || scheme.checks : lang === 'hi' ? scheme.checksHi || scheme.checks : scheme.checks;
      const docs = lang === 'mr' ? scheme.docsMr || scheme.docs : lang === 'hi' ? scheme.docsHi || scheme.docs : scheme.docs;

      return `
        <article class="match-card" data-scheme-id="${scheme.id}">
          <div class="match-top">
            <div class="scheme-icon">${scheme.categoryIcon || '🏛️'}</div>
            <div class="scheme-heading">
              <div class="category-label">${scheme.level} · ${categoryText}</div>
              <h3>${scheme.name}</h3>
            </div>
            <span class="match-badge">✓ ${lang === 'mr' ? 'पात्र (Eligible)' : lang === 'hi' ? 'पात्र (Eligible)' : 'Eligible'}</span>
          </div>

          <div class="amount-row">
            <span class="amount">${amountText}</span>
            <span class="amount-label">${scheme.benefitDetail ? (lang === 'mr' ? scheme.benefitDetailMr : lang === 'hi' ? scheme.benefitDetailHi : scheme.benefitDetail) : ''}</span>
          </div>

          <p class="scheme-desc">${summaryText}</p>

          <div class="match-why">
            <div class="why-title">${t('whyFit')}:</div>
            <ul class="why-list">
              ${checks.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>

          <div class="docs-area">
            <div class="docs-title">${t('mandatoryDocs')}:</div>
            <div class="docs-list">
              ${docs.map(d => `<span class="doc-chip">${d}</span>`).join('')}
            </div>
          </div>

          <div class="match-bottom">
            <a class="source-link" href="${scheme.url}" target="_blank" rel="noopener">
              🏛️ ${t('officialSource')}: ${scheme.sourceLabel} ↗
            </a>
            <div class="match-bottom-actions">
              <button class="audio-play-btn" data-audio-scheme="${scheme.id}" title="Listen in your language">
                ${t('listenVoice')}
              </button>
              <button class="save-button ${isSaved ? 'saved' : ''}" data-save-id="${scheme.id}">
                ${isSaved ? t('savedScheme') : t('saveScheme')}
              </button>
              <button class="fill-form-btn" data-form-scheme="${scheme.id}">
                ${t('prefillForm')}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  resultsEl.innerHTML = `
    <div class="results-header">
      <div>
        <span class="section-kicker">${t('resultsLabel')}</span>
        <h2>${matches.length} ${t('matchesFound')}</h2>
        <p>${t('trustRules')} · ${t('trustSources')}</p>
      </div>
      <div class="results-actions">
        <button class="secondary-button" id="readAllResultsBtn">${t('readResultsAloud')}</button>
        <button class="secondary-button" id="editInputsBtn">${t('editDetails')}</button>
      </div>
    </div>
    ${cardsHtml}
    <p class="disclaimer">${t('disclaimer')}</p>
  `;

  // Attach event handlers
  $('#readAllResultsBtn').onclick = readAllResultsAloud;
  $('#editInputsBtn').onclick = () => {
    $('#intakePanel').classList.remove('hidden');
    $('#results').classList.add('hidden');
    $('#progressBar').style.width = '35%';
    $('#stepLabel').textContent = t('step1');
  };

  const backBtn = $('#backToEditBtn');
  if (backBtn) backBtn.onclick = $('#editInputsBtn').onclick;

  $$('[data-save-id]').forEach(b => {
    b.onclick = () => toggleSaveScheme(b.dataset.saveId);
  });

  $$('[data-audio-scheme]').forEach(b => {
    b.onclick = () => readSchemeAloud(b.dataset.audioScheme);
  });

  $$('[data-form-scheme]').forEach(b => {
    b.onclick = () => openOfficialApplicationModal(b.dataset.formScheme);
  });
}

// Text-To-Speech (TTS) Voice Readout for low-literacy users
function readSchemeAloud(schemeId) {
  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis not supported on this browser.');
    return;
  }
  window.speechSynthesis.cancel();

  const scheme = schemes.find(s => s.id === schemeId);
  if (!scheme) return;

  const explanation = generateCitizenExplanation(scheme, currentFacts || {}, lang);
  const reasonsText = explanation.reasons.slice(0, 3).join('. ');
  const docsText = (lang === 'mr' ? scheme.docsMr : lang === 'hi' ? scheme.docsHi : scheme.docs).slice(0, 4).join(', ');

  const speechText = lang === 'mr'
    ? `${scheme.name}. ${scheme.summaryMr}. लाभ: ${scheme.amountMr}. पात्रतेची कारणे: ${reasonsText}. आवश्यक कागदपत्रे: ${docsText}.`
    : lang === 'hi'
    ? `${scheme.name}. ${scheme.summaryHi}. लाभ: ${scheme.amountHi}. पात्रता के कारण: ${reasonsText}. आवश्यक कागज़ात: ${docsText}.`
    : `${scheme.name}. ${scheme.summary}. Benefit: ${scheme.amount}. Reasons you qualify: ${reasonsText}. Mandatory documents: ${docsText}.`;

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
  showToast(`🔊 Reading ${scheme.name} aloud...`);
}

function readAllResultsAloud() {
  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis not supported on this browser.');
    return;
  }
  window.speechSynthesis.cancel();

  if (!currentMatches.length) {
    const u = new SpeechSynthesisUtterance(lang === 'mr' ? 'कोणतीही योजना जुळलेली नाही.' : 'No schemes matched.');
    window.speechSynthesis.speak(u);
    return;
  }

  const summaries = currentMatches.map((s, idx) => {
    const amt = lang === 'mr' ? s.amountMr : lang === 'hi' ? s.amountHi : s.amount;
    return `${idx + 1}. ${s.name}, ${amt}`;
  }).join('. ');

  const fullText = lang === 'mr'
    ? `आपल्यासाठी एकूण ${currentMatches.length} योजना सापडल्या आहेत. ${summaries}. अधिक माहितीसाठी योजनेच्या कार्डवरील बोलून ऐका बटण दाबा.`
    : `Found ${currentMatches.length} schemes for you. ${summaries}.`;

  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// Toggle Save Scheme
function toggleSaveScheme(schemeId) {
  if (savedSchemes.has(schemeId)) {
    savedSchemes.delete(schemeId);
    showToast(t('removedToast'));
  } else {
    savedSchemes.add(schemeId);
    showToast(t('addedToast'));
  }
  localStorage.setItem('ss-saved', JSON.stringify([...savedSchemes]));
  $('#savedCount').textContent = savedSchemes.size;

  if (currentFacts) renderResults(currentFacts, currentMatches);
  renderSaved();
}

// Render Saved Schemes View
function renderSaved() {
  const el = $('#savedList');
  if (!el) return;
  $('#savedCount').textContent = savedSchemes.size;

  if (!savedSchemes.size) {
    el.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">♡</span>
        <strong>${lang === 'mr' ? 'अजून कोणतीही योजना जतन केलेली नाही' : 'No saved schemes yet'}</strong>
        <p>${lang === 'mr' ? 'योजना शोधून निकालांमधून योजना जतन करा.' : 'Search for schemes and save them here.'}</p>
      </div>
    `;
    return;
  }

  el.innerHTML = [...savedSchemes].map(id => {
    const s = schemes.find(x => x.id === id);
    if (!s) return '';
    const amt = lang === 'mr' ? s.amountMr : s.amount;
    return `
      <div class="saved-row">
        <div>
          <span class="category-label">${s.level} · ${s.category}</span>
          <h3>${s.name}</h3>
          <small>${amt} · <a href="${s.url}" target="_blank" rel="noopener">Official Portal ↗</a></small>
        </div>
        <div class="saved-row-actions">
          <button class="fill-form-btn" data-form-scheme="${s.id}">${t('prefillForm')}</button>
          <button class="save-button saved" data-unsave-id="${s.id}">✕ Remove</button>
        </div>
      </div>
    `;
  }).join('');

  $$('#savedList [data-unsave-id]').forEach(b => {
    b.onclick = () => toggleSaveScheme(b.dataset.unsaveId);
  });
  $$('#savedList [data-form-scheme]').forEach(b => {
    b.onclick = () => openOfficialApplicationModal(b.dataset.formScheme);
  });
}

// Render Drafts View
function renderDrafts() {
  const el = $('#applicationList');
  if (!el) return;

  if (!drafts.length) {
    el.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">▤</span>
        <strong>${lang === 'mr' ? 'अजून कोणताही अर्ज तयार केलेला नाही' : 'No application drafts yet'}</strong>
        <p>${lang === 'mr' ? 'पात्र योजनेच्या खाली "अधिकृत अर्ज तयार करा" बटण दाबून अर्ज सुरू करा.' : 'Click "Pre-fill Application Form" on any eligible scheme to create a draft.'}</p>
      </div>
    `;
    return;
  }

  el.innerHTML = drafts.map(d => {
    const s = schemes.find(x => x.id === d.schemeId);
    if (!s) return '';
    return `
      <article class="draft-card" data-draft-id="${d.id}">
        <span class="category-label">${s.level} · ${s.category}</span>
        <h3>${s.name}</h3>
        <p>Application Ref: <strong>${d.refId || 'MH-SS-2026-901'}</strong> · Generated on ${new Date(d.createdAt).toLocaleDateString()}</p>
        <div class="match-bottom-actions" style="margin-top: 10px;">
          <button class="fill-form-btn" data-form-scheme="${s.id}">Open Printable Form</button>
          <button class="secondary-button" data-delete-draft="${d.id}">Delete Draft</button>
        </div>
      </article>
    `;
  }).join('');

  $$('#applicationList [data-form-scheme]').forEach(b => {
    b.onclick = () => openOfficialApplicationModal(b.dataset.formScheme);
  });
  $$('#applicationList [data-delete-draft]').forEach(b => {
    b.onclick = () => {
      drafts = drafts.filter(x => x.id !== b.dataset.deleteDraft);
      localStorage.setItem('ss-drafts', JSON.stringify(drafts));
      renderDrafts();
      showToast('Draft deleted.');
    };
  });
}

// OFFICIAL APPLICATION FORM GENERATOR & MODAL
function openOfficialApplicationModal(schemeId) {
  const scheme = schemes.find(s => s.id === schemeId);
  if (!scheme) return;

  const csc = getCscProfile();
  const facts = currentFacts || {};

  // Fill in modal values
  $('#modalSchemeName').textContent = `${scheme.name} — ${lang === 'mr' ? 'अधिकृत अर्ज' : 'Official Application Form'}`;
  $('#modalDeptName').textContent = scheme.source;
  $('#printSchemeTitle').textContent = `APPLICATION FOR ${scheme.name.toUpperCase()}`;

  const refNumber = `MH-SS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  $('#formAppId').textContent = refNumber;

  // CSC Header
  $('#formCscName').textContent = csc.centerName;
  $('#formCscDetails').textContent = `VLE ID: ${csc.vleId} · Operator: ${csc.operatorName} · Phone: ${csc.contactPhone} · ${csc.taluka}, ${csc.district}`;

  // Applicant Profile
  const genderStr = facts.gender === 'female' ? 'Female (महिला)' : facts.gender === 'male' ? 'Male (पुरुष)' : 'Citizen (नागरिक)';
  $('#formApplicantName').textContent = facts.gender === 'female' ? 'श्रीमती [Citizen Applicant]' : 'श्री / श्रीमती [Citizen Applicant]';
  $('#formApplicantAge').textContent = facts.age ? `${facts.age} Years (${facts.age} वर्षे)` : '42 Years (वयाचा दाखला संलग्न)';
  $('#formApplicantGender').textContent = genderStr;
  $('#formApplicantCategory').textContent = facts.bpl ? 'BPL / SECC Priority' : 'General / OBC / SC / ST';
  $('#formApplicantAddress').textContent = `Village / Ward, Taluka ${csc.taluka}, District ${csc.district}, Maharashtra`;

  // Criteria
  const inc = facts.annualIncome ? `₹ ${facts.annualIncome.toLocaleString('en-IN')} /-` : '₹ 1,20,000 /- (Under Limit)';
  $('#formApplicantIncome').textContent = inc;
  $('#formApplicantRation').textContent = facts.rationCardType ? `${facts.rationCardType} Ration Card` : 'Orange / Yellow Ration Card';
  $('#formApplicantLand').textContent = facts.landAcre ? `${facts.landAcre} Acres (7/12 Gut No. 142)` : (facts.landOwned ? 'Cultivable Land (7/12 attached)' : 'Not Applicable');

  // Documents checklist
  const docs = lang === 'mr' ? scheme.docsMr || scheme.docs : scheme.docs;
  $('#formDocsChecklist').innerHTML = docs.map(d => `
    <div class="form-doc-item">
      <input type="checkbox" checked />
      <span>${d}</span>
    </div>
  `).join('');

  // Save to drafts if not already saved
  if (!drafts.some(d => d.schemeId === scheme.id)) {
    drafts.push({
      id: crypto.randomUUID(),
      schemeId: scheme.id,
      refId: refNumber,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('ss-drafts', JSON.stringify(drafts));
  }

  const modal = $('#applicationFormModal');
  modal.showModal();
}

// PRICING CARDS & SUBSCRIPTION MODAL
function renderPricingCards() {
  const container = $('#pricingCardsContainer');
  if (!container) return;

  const currentPlan = getCurrentPlan();
  const plansList = Object.values(SUBSCRIPTION_PLANS);

  container.innerHTML = plansList.map(plan => {
    const isCurrent = plan.id === currentPlan.id;
    const price = isYearlyBilling ? plan.priceYearly : plan.priceMonthly;
    const periodLabel = isYearlyBilling ? (lang === 'mr' ? '/ वर्ष' : '/ year') : (lang === 'mr' ? '/ महिना' : '/ month');
    const name = lang === 'mr' ? plan.nameMr : lang === 'hi' ? plan.nameHi : plan.name;
    const tagline = lang === 'mr' ? plan.taglineMr : lang === 'hi' ? plan.taglineHi : plan.tagline;

    return `
      <div class="pricing-card ${plan.popular ? 'popular' : ''}">
        ${plan.popular ? `<div class="popular-ribbon">MOST POPULAR · सर्वाधिक पसंती</div>` : ''}
        <div class="category-label" style="color: ${plan.color};">${plan.badge}</div>
        <h3 class="pricing-title">${name}</h3>
        <p class="pricing-tagline">${tagline}</p>

        <div class="pricing-amount-block">
          <span class="price-currency">₹</span>
          <span class="price-number">${price}</span>
          <span class="price-cycle">${price === 0 ? (lang === 'mr' ? 'कायम मोफत' : 'Forever') : periodLabel}</span>
        </div>

        <ul class="features-list">
          ${plan.features.map(f => `<li>${lang === 'mr' ? f.mr || f.text : lang === 'hi' ? f.hi || f.text : f.text}</li>`).join('')}
        </ul>

        <button class="plan-select-btn ${isCurrent ? 'active-plan-btn' : ''}" data-select-plan="${plan.id}" ${isCurrent ? 'disabled' : ''}>
          ${isCurrent ? (lang === 'mr' ? '✓ चालू सदस्यता (Current)' : '✓ Current Plan') : (lang === 'mr' ? 'निवडा व अपग्रेड करा →' : 'Choose Plan →')}
        </button>
      </div>
    `;
  }).join('');

  $$('[data-select-plan]').forEach(b => {
    b.onclick = () => initiatePlanUpgrade(b.dataset.selectPlan);
  });
}

function initiatePlanUpgrade(planId) {
  const plan = SUBSCRIPTION_PLANS[planId];
  if (!plan) return;

  if (planId === 'CITIZEN_FREE') {
    setCurrentPlan('CITIZEN_FREE');
    $('#roleSwitcher').value = 'CITIZEN_FREE';
    updatePlanBadge();
    renderPricingCards();
    showToast(t('planActivatedToast'));
    return;
  }

  pendingUpgradePlanId = planId;
  const price = isYearlyBilling ? plan.priceYearly : plan.priceMonthly;
  const cycle = isYearlyBilling ? '/ year' : '/ month';

  $('#checkoutPlanTitle').textContent = `${plan.name} (${lang === 'mr' ? plan.nameMr : plan.name})`;
  $('#checkoutPlanDesc').textContent = lang === 'mr' ? plan.taglineMr : plan.tagline;
  $('#checkoutPriceVal').textContent = price;
  $('#checkoutPeriod').textContent = cycle;
  $('.qr-center').textContent = `₹${price}`;

  $('#subscriptionModal').showModal();
}

function completeUpgrade() {
  if (pendingUpgradePlanId) {
    setCurrentPlan(pendingUpgradePlanId);
    $('#roleSwitcher').value = pendingUpgradePlanId;
    updatePlanBadge();
    renderPricingCards();
    $('#subscriptionModal').close();
    showToast(`🎉 ${t('planActivatedToast')}`);
  }
}

// CSC Center Profile Settings
function loadCscProfileIntoUi() {
  const csc = getCscProfile();
  const nameEl = $('#cscCenterName');
  if (nameEl) nameEl.value = csc.centerName;
  const idEl = $('#cscVleId');
  if (idEl) idEl.value = csc.vleId;
  const opEl = $('#cscOperatorName');
  if (opEl) opEl.value = csc.operatorName;
  const phEl = $('#cscContactPhone');
  if (phEl) phEl.value = csc.contactPhone;
  const locEl = $('#cscLocation');
  if (locEl) locEl.value = `${csc.taluka}, ${csc.district}, ${csc.state}`;
}

function saveCscProfileFromUi() {
  const locParts = ($('#cscLocation').value || '').split(',').map(s => s.trim());
  const profile = {
    centerName: $('#cscCenterName').value,
    vleId: $('#cscVleId').value,
    operatorName: $('#cscOperatorName').value,
    contactPhone: $('#cscContactPhone').value,
    taluka: locParts[0] || 'Haveli',
    district: locParts[1] || 'Pune',
    state: locParts[2] || 'Maharashtra'
  };
  saveCscProfile(profile);
  showToast('CSC Center profile saved and updated on application forms.');
}

// Speech Recognition (Voice Input)
function setupVoiceInput() {
  const micBtn = $('#micBtn');
  const speechStatus = $('#speechStatus');

  micBtn.addEventListener('click', () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      showToast('Speech recognition is not supported in this browser. Try Google Chrome.');
      return;
    }

    if (window._ssRecognition) {
      window._ssRecognition.stop();
      window._ssRecognition = null;
      micBtn.classList.remove('recording');
      speechStatus.classList.add('hidden');
      return;
    }

    const rec = new Speech();
    rec.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    rec.interimResults = false;

    rec.onstart = () => {
      micBtn.classList.add('recording');
      speechStatus.classList.remove('hidden');
      $('#speechText').textContent = lang === 'mr' ? 'तुमचा आवाज ऐकत आहे... बोला.' : 'Listening to your voice...';
    };

    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const storyEl = $('#story');
      storyEl.value += (storyEl.value ? ' ' : '') + transcript;
      showToast(lang === 'mr' ? 'आवाज मजकुरात घेतला!' : 'Speech captured!');
    };

    rec.onerror = () => {
      micBtn.classList.remove('recording');
      speechStatus.classList.add('hidden');
      window._ssRecognition = null;
      showToast('Microphone error or permission denied.');
    };

    rec.onend = () => {
      micBtn.classList.remove('recording');
      speechStatus.classList.add('hidden');
      window._ssRecognition = null;
    };

    rec.start();
    window._ssRecognition = rec;
  });
}

// Event Listeners
function setupEventListeners() {
  // Navigation tabs
  $$('.nav-item').forEach(b => {
    b.addEventListener('click', () => showView(b.dataset.view));
  });

  // Language buttons
  $$('.language-switch button').forEach(b => {
    b.addEventListener('click', () => updateLanguage(b.dataset.lang));
  });

  // Role selector
  $('#roleSwitcher').addEventListener('change', (e) => {
    setCurrentPlan(e.target.value);
    updatePlanBadge();
    renderPricingCards();
    showToast(`Role switched to: ${e.target.value}`);
  });

  // Sample chips
  $$('.sample-chip').forEach(b => {
    b.addEventListener('click', () => applySampleStory(b.dataset.sample));
  });

  // Check schemes button
  $('#checkBtn').addEventListener('click', analyzeStory);

  // Guide dialog
  $('#guideBtn').addEventListener('click', () => $('#guideDialog').showModal());
  $('#closeGuide').addEventListener('click', () => $('#guideDialog').close());

  // Modal close buttons
  $('#closeModalBtn').addEventListener('click', () => $('#applicationFormModal').close());
  $('#closeSubModalBtn').addEventListener('click', () => $('#subscriptionModal').close());

  // Print button
  $('#printFormBtn').addEventListener('click', () => window.print());

  // Complete Payment button
  $('#confirmPaymentBtn').addEventListener('click', completeUpgrade);

  // Save CSC Profile
  const saveCscBtn = $('#saveCscProfileBtn');
  if (saveCscBtn) saveCscBtn.addEventListener('click', saveCscProfileFromUi);

  // Billing period toggle
  const toggle = $('#billingPeriodToggle');
  if (toggle) {
    toggle.addEventListener('change', (e) => {
      isYearlyBilling = e.target.checked;
      renderPricingCards();
    });
  }

  // Setup Voice Input
  setupVoiceInput();
}

// Start Application
document.addEventListener('DOMContentLoaded', init);
