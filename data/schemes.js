// Curated MVP catalog. Rules are explicit predicates; the language layer never selects a scheme.
export const schemes = [
  {
    id: 'pm-kisan', name: 'PM-KISAN Samman Nidhi', nameHi: 'प्रधानमंत्री किसान सम्मान निधि', nameMr: 'प्रधानमंत्री किसान सन्मान निधी', shortName: 'PM-KISAN', category: 'FARMING', categoryId: 'farming', categoryIcon: '⌁', amount: '₹6,000 / year', amountHi: '₹6,000 प्रति वर्ष', amountMr: '₹६,००० प्रति वर्ष',
    summary: 'Income support paid in three instalments to eligible landholding farmer families.', summaryHi: 'पात्र भूमि-धारक किसान परिवारों को तीन किस्तों में आर्थिक सहायता.', summaryMr: 'पात्र जमीनधारक शेतकरी कुटुंबांना तीन हप्त्यांत आर्थिक मदत.',
    criteria: [{key:'state',value:'Maharashtra'},{key:'farmer',value:true},{key:'landOwned',value:true},{key:'incomeTaxPayer',value:false},{key:'governmentEmployee',value:false},{key:'otherPmKisanExclusion',value:false}],
    rule: facts => facts.state === 'Maharashtra' && facts.farmer === true && facts.landOwned === true && facts.incomeTaxPayer === false && facts.governmentEmployee === false && facts.otherPmKisanExclusion === false,
    checks: ['You said your family farms and owns agricultural land.', 'No exclusion was identified in your answers.'], checksHi: ['आपने बताया कि आपका परिवार खेती करता है और कृषि भूमि का मालिक है.', 'आपके जवाबों में कोई अपात्रता नहीं मिली.'], checksMr: ['आपण सांगितले की आपले कुटुंब शेती करते आणि शेतीची जमीन मालकीची आहे.', 'आपल्या उत्तरांमध्ये अपात्रतेची अट आढळली नाही.'],
    docs: ['Aadhaar card', 'Land ownership / RoR record', 'Bank passbook (account linked to Aadhaar)', 'Mobile number'], docsHi: ['आधार कार्ड', 'भूमि स्वामित्व / रिकॉर्ड ऑफ राइट्स', 'बैंक पासबुक (आधार से जुड़ा खाता)', 'मोबाइल नंबर'], docsMr: ['आधार कार्ड', 'जमीन मालकीचा / हक्क अभिलेख', 'बँक पासबुक (आधारशी जोडलेले खाते)', 'मोबाइल नंबर'],
    source: 'PM-KISAN official portal', url: 'https://pmkisan.gov.in/', detailUrl: 'https://pmkisan.gov.in/Documents/FAQPMKISAN.pdf', sourceLabel: 'Official PM-KISAN portal + FAQ',
    note: 'Eligibility depends on land records and listed exclusions; the department makes the final determination.'
  },
  {
    id: 'sanjay-gandhi', name: 'Sanjay Gandhi Niradhar Anudan Yojana', nameHi: 'संजय गांधी निराधार अनुदान योजना', nameMr: 'संजय गांधी निराधार अनुदान योजना', shortName: 'Sanjay Gandhi Niradhar', category: 'MONTHLY SUPPORT', categoryId: 'support', categoryIcon: '♡', amount: '₹1,500 / month', amountHi: '₹1,500 प्रति माह', amountMr: '₹१,५०० प्रति महिना',
    summary: 'Monthly assistance for eligible people in Maharashtra who are without support or unable to earn a livelihood.', summaryHi: 'महाराष्ट्र में पात्र निराश्रित या आजीविका कमाने में असमर्थ लोगों को मासिक सहायता.', summaryMr: 'महाराष्ट्रातील पात्र निराधार किंवा उपजीविका करू न शकणाऱ्या व्यक्तींना मासिक मदत.',
    criteria: [{key:'state',value:'Maharashtra'},{key:'age',operator:'range',min:18,max:64},{key:'supportNeed',value:true},{key:'incomePath',value:true}],
    rule: facts => facts.state === 'Maharashtra' && facts.age >= 18 && facts.age < 65 && facts.supportNeed === true && (facts.bpl === true || (Number.isFinite(facts.annualIncome) && facts.annualIncome <= 21000)),
    checks: ['You are between 18 and 64 years old.', 'You described a qualifying support need.', 'You said your household is BPL or annual income is at most ₹21,000.'], checksHi: ['आपकी उम्र 18 से 64 वर्ष है.', 'आपने सहायता की पात्र परिस्थिति बताई.', 'परिवार BPL है या सालाना आय ₹21,000 तक है.'], checksMr: ['आपले वय १८ ते ६४ वर्षे आहे.', 'आपण पात्र सहाय्याची गरज सांगितली.', 'आपले कुटुंब BPL आहे किंवा वार्षिक उत्पन्न ₹२१,००० पर्यंत आहे.'],
    docs: ['Age proof', 'Income certificate or BPL proof', 'Aadhaar card', 'Bank passbook', 'Proof of qualifying condition (if applicable)'], docsHi: ['आयु प्रमाण', 'आय प्रमाणपत्र या BPL प्रमाण', 'आधार कार्ड', 'बैंक पासबुक', 'पात्र परिस्थिति का प्रमाण (यदि लागू हो)'], docsMr: ['वयाचा पुरावा', 'उत्पन्न प्रमाणपत्र किंवा BPL पुरावा', 'आधार कार्ड', 'बँक पासबुक', 'पात्र परिस्थितीचा पुरावा (लागू असल्यास)'],
    source: 'Maharashtra Social Justice & Special Assistance Department', url: 'https://sjsa.maharashtra.gov.in/en/scheme/sanjay-gandhi-niradhar-anudan-yojana/', detailUrl: 'https://sjsa.maharashtra.gov.in/scheme/%E0%A4%B8%E0%A4%82%E0%A4%9C%E0%A4%AF-%E0%A4%97%E0%A4%BE%E0%A4%82%E0%A4%A7%E0%A5%80-%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A4%BE%E0%A4%A7%E0%A4%BE%E0%A4%B0-%E0%A4%85%E0%A4%A8%E0%A5%81%E0%A4%A6%E0%A4%BE/', sourceLabel: 'Official Maharashtra department page',
    note: 'The office checks your documents and category. This initial check is not an approval.'
  },
  {
    id: 'lek-ladki', name: 'Lek Ladki Yojana', nameHi: 'लेक लाडकी योजना', nameMr: 'लेक लाडकी योजना', shortName: 'Lek Ladki', category: 'GIRL CHILD', categoryId: 'family', categoryIcon: '✿', amount: 'Up to ₹1,01,000', amountHi: '₹1,01,000 पर्यंत', amountMr: '₹१,०१,००० पर्यंत',
    summary: 'Financial support in stages for eligible girls from Maharashtra families with a yellow or orange ration card.', summaryHi: 'पिवळे किंवा केशरी रेशन कार्ड असलेल्या महाराष्ट्रातील पात्र कुटुंबांतील मुलींसाठी टप्प्याटप्प्याने आर्थिक मदत.', summaryMr: 'पिवळे किंवा केशरी रेशन कार्ड असलेल्या महाराष्ट्रातील पात्र कुटुंबांतील मुलींसाठी टप्प्याटप्प्याने आर्थिक मदत.',
    criteria: [{key:'state',value:'Maharashtra'},{key:'hasGirlChild',value:true},{key:'girlBornAfter2023',value:true},{key:'rationCardEligible',value:true},{key:'annualIncome',operator:'max',max:100000}],
    rule: facts => facts.state === 'Maharashtra' && facts.hasGirlChild === true && facts.girlBornAfter2023 === true && facts.rationCardEligible === true && Number.isFinite(facts.annualIncome) && facts.annualIncome <= 100000,
    checks: ['You said your family has a girl child born on or after 1 April 2023.', 'You said the household has a yellow or orange ration card.', 'You live in Maharashtra.'], checksHi: ['आपके परिवार में 1 अप्रैल 2023 या उसके बाद जन्मी बेटी है।', 'आपके पास पीला या नारंगी राशन कार्ड है।', 'आप महाराष्ट्र में रहते हैं।'], checksMr: ['आपल्या कुटुंबात १ एप्रिल २०२३ रोजी किंवा त्यानंतर जन्मलेली मुलगी आहे.', 'आपल्याकडे पिवळे किंवा केशरी रेशन कार्ड आहे.', 'आपण महाराष्ट्रात राहता.'],
    docs: ['Girl child birth certificate', 'Yellow / orange ration card', 'Aadhaar cards (parent and child, if available)', 'Bank passbook', 'Residence proof'], docsHi: ['मुलीचा जन्म दाखला', 'पिवळे / केशरी रेशन कार्ड', 'आधार कार्ड (पालक आणि मुलगी, उपलब्ध असल्यास)', 'बँक पासबुक', 'रहिवासी पुरावा'], docsMr: ['मुलीचा जन्म दाखला', 'पिवळे / केशरी रेशन कार्ड', 'आधार कार्ड (पालक आणि मुलगी, उपलब्ध असल्यास)', 'बँक पासबुक', 'रहिवासी पुरावा'],
    source: 'Maharashtra WCD / MahaDBT Citizen Charter', url: 'https://www.mahadbt.maharashtra.gov.in/CitizenCharterPDF/WCD_merged.pdf', detailUrl: 'https://zpwardha.maharashtra.gov.in/en/women-and-child-development-department/', sourceLabel: 'Official Maharashtra government charter',
    note: 'The official department verifies the child’s date of birth, ration card, income, and other conditions.'
  },
  {
    id: 'old-age-pension', name: 'Indira Gandhi National Old Age Pension', nameHi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन', nameMr: 'इंदिरा गांधी राष्ट्रीय वृद्धापकाळ निवृत्तीवेतन', shortName: 'Old age pension', category: 'OLDER ADULTS', categoryId: 'senior', categoryIcon: '◷', amount: '₹1,500 / month*', amountHi: '₹1,500 प्रति माह*', amountMr: '₹१,५०० प्रति महिना*',
    summary: 'Monthly pension support for Maharashtra residents aged 65 and above whose household is listed Below Poverty Line.',
    summaryHi: 'महाराष्ट्र के 65 वर्ष या उससे अधिक आयु के BPL सूची में शामिल निवासियों के लिए मासिक पेंशन सहायता।',
    summaryMr: 'महाराष्ट्रातील ६५ वर्षे किंवा त्याहून अधिक वयाच्या BPL यादीतील रहिवाशांसाठी मासिक निवृत्तीवेतन सहाय्य.',
    criteria: [{key:'state',value:'Maharashtra'},{key:'age',operator:'min',min:65},{key:'bpl',value:true}],
    rule: facts => facts.state === 'Maharashtra' && facts.age >= 65 && facts.bpl === true,
    checks: ['You are 65 or older.', 'You said your household is on the Below Poverty Line (BPL) list.', 'You live in Maharashtra.'],
    checksHi: ['आपकी उम्र 65 वर्ष या उससे अधिक है।', 'आपने बताया कि परिवार का नाम BPL सूची में है।', 'आप महाराष्ट्र में रहते हैं।'],
    checksMr: ['तुमचे वय ६५ वर्षे किंवा अधिक आहे.', 'तुमच्या कुटुंबाचे नाव BPL यादीत असल्याचे तुम्ही सांगितले.', 'तुम्ही महाराष्ट्रात राहता.'],
    docs: ['Age proof', 'BPL card or proof', 'Residence proof', 'Bank passbook'],
    docsHi: ['आयु प्रमाण', 'BPL कार्ड या प्रमाण', 'निवास प्रमाण', 'बैंक पासबुक'],
    docsMr: ['वयाचा पुरावा', 'BPL कार्ड किंवा पुरावा', 'रहिवासी पुरावा', 'बँक पासबुक'],
    source: 'Maharashtra Social Justice & Special Assistance Department', url: 'https://sjsa.maharashtra.gov.in/en/scheme/indira-gandhi-national-old-age-pension-scheme/', detailUrl: 'https://nsap.nic.in/', sourceLabel: 'Official Maharashtra department page',
    note: '*Maharashtra combines central and state pension support; the department confirms the current amount and eligibility.'
  },
  {
    id: 'ayushman-vay-vandana', name: 'Ayushman Vay Vandana Card', nameHi: 'आयुष्मान वय वंदना कार्ड', nameMr: 'आयुष्मान वय वंदना कार्ड', shortName: 'Ayushman Vay Vandana', category: 'HEALTH COVER', categoryId: 'health', categoryIcon: '+', amount: 'Health cover up to ₹5 lakh / year', amountHi: '₹५ लाख तक स्वास्थ्य कवच / वर्ष', amountMr: '₹५ लाखांपर्यंत आरोग्य संरक्षण / वर्ष',
    summary: 'Health cover under AB-PMJAY for every senior citizen aged 70 or above, irrespective of income.',
    summaryHi: 'आय की परवाह किए बिना 70 वर्ष या उससे अधिक उम्र के सभी वरिष्ठ नागरिकों के लिए AB-PMJAY स्वास्थ्य कवच।',
    summaryMr: 'उत्पन्नाची अट न ठेवता ७० वर्षे किंवा अधिक वयाच्या सर्व ज्येष्ठ नागरिकांसाठी AB-PMJAY आरोग्य संरक्षण.',
    criteria: [{key:'age',operator:'min',min:70}],
    rule: facts => Number.isFinite(facts.age) && facts.age >= 70,
    checks: ['You are 70 years of age or above.', 'The national programme does not apply an income test for this senior-citizen benefit.'],
    checksHi: ['आपकी उम्र 70 वर्ष या उससे अधिक है।', 'इस वरिष्ठ नागरिक लाभ के लिए आय की शर्त नहीं है।'],
    checksMr: ['तुमचे वय ७० वर्षे किंवा अधिक आहे.', 'या ज्येष्ठ नागरिक लाभासाठी उत्पन्नाची अट नाही.'],
    docs: ['Aadhaar for enrolment and e-KYC'], docsHi: ['नामांकन और e-KYC के लिए आधार'], docsMr: ['नोंदणी आणि e-KYC साठी आधार'],
    source: 'National Health Authority', url: 'https://nha.gov.in/img/resources/English_FAQs_related_to_the_benefits_for_senior_citizens.pdf', detailUrl: 'https://beneficiary.nha.gov.in/', sourceLabel: 'Official NHA senior-citizen FAQ',
    note: 'Aadhaar-based e-KYC is required by the programme; Scheme Saathi never asks you to enter an Aadhaar number.'
  },
  {
    id: 'pm-ujjwala', name: 'Pradhan Mantri Ujjwala Yojana', nameHi: 'प्रधानमंत्री उज्ज्वला योजना', nameMr: 'प्रधानमंत्री उज्ज्वला योजना', shortName: 'PM Ujjwala', category: 'CLEAN COOKING', categoryId: 'energy', categoryIcon: '♨', amount: 'Deposit-free LPG connection', amountHi: 'जमा रक्कम नसलेले LPG कनेक्शन', amountMr: 'ठेव रक्कम नसलेले LPG कनेक्शन',
    summary: 'A new LPG connection for an adult woman from a poor household that has no LPG connection.',
    summaryHi: 'ऐसे गरीब परिवार की वयस्क महिला के लिए नया LPG कनेक्शन, जिसके पास पहले से LPG कनेक्शन नहीं है।',
    summaryMr: 'आधी LPG जोडणी नसलेल्या गरीब कुटुंबातील प्रौढ महिलेसाठी नवीन LPG जोडणी.',
    criteria: [{key:'applicantWoman',value:true},{key:'age',operator:'min',min:18},{key:'lpgConnection',value:false},{key:'poorHousehold',value:true}],
    rule: facts => facts.applicantWoman === true && facts.age >= 18 && facts.lpgConnection === false && facts.poorHousehold === true,
    checks: ['The applicant is a woman aged 18 or above.', 'No LPG connection is registered to anyone in the household.', 'The applicant belongs to a poor household and can submit the prescribed declaration.'],
    checksHi: ['आवेदक 18 वर्ष या उससे अधिक उम्र की महिला हैं।', 'परिवार में किसी के नाम LPG कनेक्शन नहीं है।', 'आवेदक गरीब परिवार से हैं और निर्धारित घोषणा दे सकती हैं।'],
    checksMr: ['अर्जदार १८ वर्षे किंवा अधिक वयाची महिला आहे.', 'कुटुंबातील कोणाच्याही नावावर LPG जोडणी नाही.', 'अर्जदार गरीब कुटुंबातील असून निर्धारित घोषणापत्र देऊ शकते.'],
    docs: ['KYC application form', 'Proof of identity and address', 'Ration card or family-composition document', 'Bank account details', 'Poor-household deprivation declaration'],
    docsHi: ['KYC आवेदन पत्र', 'पहचान और पते का प्रमाण', 'राशन कार्ड या परिवार विवरण दस्तावेज़', 'बैंक खाते का विवरण', 'गरीब परिवार की वंचना घोषणा'],
    docsMr: ['KYC अर्ज', 'ओळख आणि पत्त्याचा पुरावा', 'रेशन कार्ड किंवा कुटुंब रचना दस्तऐवज', 'बँक खात्याचा तपशील', 'गरीब कुटुंबाचे वंचना घोषणापत्र'],
    source: 'Ministry of Petroleum & Natural Gas', url: 'https://pmuy.gov.in/Ujjwala2.html', detailUrl: 'https://pmuy.gov.in/faq.html', sourceLabel: 'Official PMUY eligibility & documents',
    note: 'The Oil Marketing Company checks the applicant, household connection status, and declaration before releasing a connection.'
  }
];
