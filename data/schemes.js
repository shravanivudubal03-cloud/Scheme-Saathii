// Comprehensive Scheme Catalog for Indian Central & Maharashtra State Schemes.
// All eligibility criteria are deterministic boolean predicates. The LLM or language layer NEVER decides eligibility.

export const schemes = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    shortName: 'PM-KISAN',
    level: 'CENTRAL',
    category: 'FARMING',
    categoryIcon: '🌾',
    categoryMr: 'कृषी व शेतकरी कल्याण',
    categoryHi: 'कृषि एवं किसान कल्याण',
    amount: '₹6,000 / year',
    amountHi: '₹6,000 प्रति वर्ष',
    amountMr: '₹६,००० प्रति वर्ष',
    benefitDetail: 'Paid directly into Aadhaar-linked bank accounts in 3 equal instalments of ₹2,000 every 4 months.',
    benefitDetailHi: 'प्रत्येक ४ महीने में ₹२,००० की ३ समान किस्तों में सीधे आधार लिंक बैंक खाते में जमा।',
    benefitDetailMr: 'दर ४ महिन्यांनी ₹२,००० च्या ३ समान हप्त्यांमध्ये थेट आधार जोडणी असलेल्या बँक खात्यात जमा.',
    summary: 'Direct income support for landholding small and marginal farmer families across India.',
    summaryHi: 'देश भर के पात्र ज़मीनधारक किसान परिवारों के लिए प्रत्यक्ष वित्तीय सहायता।',
    summaryMr: 'महाराष्ट्रासह देशभरातील पात्र शेती जमीनधारक शेतकरी कुटुंबांना थेट आर्थिक सहाय्य.',
    rule: (facts) => {
      return (
        facts.farmer === true &&
        facts.landOwned === true &&
        facts.incomeTaxPayer !== true &&
        facts.governmentEmployee !== true &&
        facts.otherPmKisanExclusion !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.farmer === true) matched.push({ en: 'Citizen engages in farming', mr: 'कुटुंब शेती व्यवसाय करते', hi: 'परिवार खेती करता है' });
      else if (facts.farmer === false) unmet.push({ en: 'Not a farmer family', mr: 'शेतकरी कुटुंब नाही', hi: 'किसान परिवार नहीं है' });
      else missing.push('farmer');

      if (facts.landOwned === true) matched.push({ en: 'Owns cultivable agricultural land in family name', mr: 'स्वतःच्या नावावर लागवडीयोग्य शेतीजमीन आहे', hi: 'परिवार के नाम खेती की ज़मीन है' });
      else if (facts.landOwned === false) unmet.push({ en: 'Does not own cultivable land', mr: 'स्वतःच्या नावावर शेतजमीन नाही', hi: 'नाम पर कृषि भूमि नहीं है' });
      else missing.push('landOwned');

      if (facts.incomeTaxPayer === false) matched.push({ en: 'Non-income tax payer', mr: 'कुटुंबातील कोणीही आयकर भरत नाही', hi: 'परिवार में कोई आयकर दाता नहीं है' });
      else if (facts.incomeTaxPayer === true) unmet.push({ en: 'Excluded: Pays income tax', mr: 'अपात्र: आयकर भरतात', hi: 'अपात्र: परिवार में आयकर दिया जाता है' });

      if (facts.governmentEmployee === false) matched.push({ en: 'Not a government employee', mr: 'सरकारी कर्मचारी नाही', hi: 'सरकारी सेवा में नहीं है' });
      else if (facts.governmentEmployee === true) unmet.push({ en: 'Excluded: Regular government employee/pensioner', mr: 'अपात्र: नियमित शासकीय कर्मचारी/निवृत्तीवेतनधारक', hi: 'अपात्र: नियमित सरकारी कर्मचारी हैं' });

      const isEligible = facts.farmer === true && facts.landOwned === true && facts.incomeTaxPayer !== true && facts.governmentEmployee !== true && facts.otherPmKisanExclusion !== true;
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Your family actively farms and owns cultivable land.',
      'No member pays income tax or holds a government job.',
      'Aadhaar is linked with bank account for Direct Benefit Transfer (DBT).'
    ],
    checksHi: [
      'आपका परिवार खेती करता है और परिवार के नाम खेती की ज़मीन है।',
      'परिवार का कोई सदस्य आयकर नहीं भरता और सरकारी सेवा में नहीं है।',
      'डीबीटी (DBT) के लिए बैंक खाता आधार से जुड़ा होना चाहिए।'
    ],
    checksMr: [
      'आपले कुटुंब शेती करते आणि शेतीजमीन आपल्या कुटुंबाच्या नावावर आहे.',
      'कुटुंबातील कोणीही आयकर भरत नाही व नियमित शासकीय नोकरीत नाही.',
      'थेट अनुदानासाठी (DBT) बँक खाते आधारशी जोडलेले असावे.'
    ],
    docs: [
      'Aadhaar card of landholder',
      '7/12 Extract (Satbara) & 8A Land Record',
      'Aadhaar-seeded Bank Passbook',
      'Mobile number linked to Aadhaar for e-KYC'
    ],
    docsHi: [
      'ज़मीनधारक का आधार कार्ड',
      'खतौनी / ज़मीन स्वामित्व अभिलेख (7/12 व 8A)',
      'आधार से जुड़ा बैंक पासबुक',
      'आधार से लिंक मोबाइल नंबर (e-KYC हेतु)'
    ],
    docsMr: [
      'जमीनधारकाचे आधार कार्ड',
      'नवीन ७/१२ उतारा व ८-अ नोंद',
      'आधार जोडणी असलेले बँक पासबुक',
      'ई-केवायसीसाठी आधार लिंक मोबाईल नंबर'
    ],
    source: 'Ministry of Agriculture & Farmers Welfare, GoI',
    sourceLabel: 'PM-KISAN National Portal',
    url: 'https://pmkisan.gov.in/',
    detailUrl: 'https://pmkisan.gov.in/Documents/FAQPMKISAN.pdf',
    applyMethod: 'Apply online on pmkisan.gov.in or visit nearest CSC (Common Service Centre) / Aaple Sarkar Kendra.'
  },
  {
    id: 'namo-shetkari',
    name: 'Namo Shetkari Mahasanman Nidhi Yojana',
    shortName: 'Namo Shetkari',
    level: 'MAHARASHTRA',
    category: 'FARMING',
    categoryIcon: '🚜',
    categoryMr: 'महाराष्ट्र शेतकरी सन्मान',
    categoryHi: 'महाराष्ट्र किसान सम्मान',
    amount: '₹6,000 / year (Combined ₹12,000 with PM-KISAN)',
    amountHi: '₹6,000 प्रति वर्ष (PM-KISAN मिलाकर ₹12,000)',
    amountMr: '₹६,००० प्रति वर्ष (PM-KISAN सह एकूण ₹१२,०००)',
    benefitDetail: 'Government of Maharashtra gives additional ₹6,000 per year in 3 instalments of ₹2,000 alongside PM-KISAN.',
    benefitDetailHi: 'महाराष्ट्र सरकार द्वारा पीएम-किसान के साथ अतिरिक्त ₹6,000 प्रति वर्ष 3 किस्तों में।',
    benefitDetailMr: 'महाराष्ट्र शासनाकडून पीएम-किसानच्या हप्त्यासोबतच आणखी ₹६,००० प्रति वर्ष (₹२,००० चे ३ हप्ते).',
    summary: 'Maharashtra state bonus income support scheme for all PM-KISAN beneficiary farmers.',
    summaryHi: 'महाराष्ट्र के सभी पीएम-किसान पात्र किसानों के लिए राज्य सरकार की विशेष वित्तीय सहायता।',
    summaryMr: 'महाराष्ट्रातील सर्व पीएम-किसान पात्र शेतकऱ्यांसाठी राज्य शासनाची दुहेरी सन्मान योजना.',
    rule: (facts) => {
      return (
        facts.state === 'Maharashtra' &&
        facts.farmer === true &&
        facts.landOwned === true &&
        facts.incomeTaxPayer !== true &&
        facts.governmentEmployee !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];
      if (facts.state === 'Maharashtra') matched.push({ en: 'Resident of Maharashtra', mr: 'महाराष्ट्राचे रहिवासी आहात', hi: 'महाराष्ट्र के निवासी हैं' });
      else if (facts.state && facts.state !== 'Maharashtra') unmet.push({ en: 'Only for Maharashtra residents', mr: 'केवळ महाराष्ट्रातील शेतकऱ्यांसाठी लागू', hi: 'केवल महाराष्ट्र के निवासियों के लिए' });
      else missing.push('state');

      if (facts.farmer === true && facts.landOwned === true) matched.push({ en: 'Eligible landholding farmer', mr: 'पात्र जमीनधारक शेतकरी', hi: 'पात्र ज़मीनधारक किसान' });
      else unmet.push({ en: 'Requires land ownership and farming status', mr: 'शेतजमीन मालकी आवश्यक आहे', hi: 'कृषि भूमि का स्वामित्व आवश्यक' });

      const isEligible = facts.state === 'Maharashtra' && facts.farmer === true && facts.landOwned === true && facts.incomeTaxPayer !== true && facts.governmentEmployee !== true;
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'You reside in Maharashtra.',
      'You are registered and approved under PM-KISAN.',
      'Land records (7/12) are verified with Aadhaar linkage.'
    ],
    checksHi: [
      'आप महाराष्ट्र के निवासी हैं।',
      'आप पीएम-किसान में पंजीकृत और पात्र हैं।',
      'भूमि अभिलेख (7/12) और बैंक खाता आधार से लिंक हैं।'
    ],
    checksMr: [
      'आपण महाराष्ट्राचे रहिवासी आहात.',
      'आपण पीएम-किसान योजनेत पात्र व नोंदणीकृत आहात.',
      '७/१२ उतारा व बँक खाते आधार लिंक आहे.'
    ],
    docs: [
      'PM-KISAN Registration Number / Beneficiary Status',
      'Aadhaar card',
      'Maharashtra 7/12 and 8A extract',
      'Aadhaar-linked Bank account statement'
    ],
    docsHi: [
      'पीएम-किसान पंजीकरण संख्या / लाभार्थी स्थिति',
      'आधार कार्ड',
      'महाराष्ट्र 7/12 और 8A नकल',
      'आधार लिंक बैंक पासबुक'
    ],
    docsMr: [
      'पीएम-किसान नोंदणी क्रमांक (Registration ID)',
      'आधार कार्ड',
      'नवीन डिजिटल स्वाक्षरीत ७/१२ व ८-अ उतारा',
      'आधार जोडलेले बँक खाते पासबुक'
    ],
    source: 'Department of Agriculture, Govt of Maharashtra',
    sourceLabel: 'MahaDBT Agriculture Portal',
    url: 'https://krishi.maharashtra.gov.in/',
    detailUrl: 'https://mahadbt.maharashtra.gov.in/Farmer/SchemeData/SchemeData?param=Y',
    applyMethod: 'Auto-credited to verified PM-KISAN beneficiaries in Maharashtra. Verification at Krishi Sahayak or Talathi office.'
  },
  {
    id: 'ladki-bahin',
    name: 'Mukhyamantri Majhi Ladki Bahin Yojana',
    shortName: 'Majhi Ladki Bahin',
    level: 'MAHARASHTRA',
    category: 'WOMEN',
    categoryIcon: '🌸',
    categoryMr: 'महिला सक्षमीकरण',
    categoryHi: 'महिला सशक्तिकरण',
    amount: '₹1,500 / month (₹18,000 / year)',
    amountHi: '₹1,500 प्रति माह (₹18,000 प्रति वर्ष)',
    amountMr: '₹१,५०० प्रति महिना (₹१८,००० प्रति वर्ष)',
    benefitDetail: 'Direct monthly financial assistance of ₹1,500 transferred directly to the woman beneficiary’s Aadhaar-linked bank account.',
    benefitDetailHi: 'प्रत्येक माह ₹1,500 सीधे महिला के आधार-लिंक बैंक खाते में डीबीटी द्वारा अंतरित।',
    benefitDetailMr: 'दरमहा ₹१,५०० थेट महिला लाभार्थ्यांच्या आधार जोडणी असलेल्या बँक खात्यात थेट जमा.',
    summary: 'Flagship Maharashtra financial independence scheme for women aged 21–65 from low and middle income families.',
    summaryHi: '21 से 65 वर्ष की महिलाओं के लिए महाराष्ट्र की मुख्य आर्थिक स्वावलंबन योजना।',
    summaryMr: 'महाराष्ट्रातील २१ ते ६५ वयोगटातील पात्र महिलांसाठी दरमहा ₹१,५०० ची थेट आर्थिक मदत.',
    rule: (facts) => {
      const incomeOk = facts.annualIncome == null || facts.annualIncome <= 250000 || facts.rationCardEligible === true || facts.bpl === true;
      const ageOk = facts.age == null || (facts.age >= 21 && facts.age <= 65);
      const genderOk = facts.gender === 'female' || facts.womanApplicant === true || facts.hasGirlChild === true;
      return (
        facts.state === 'Maharashtra' &&
        genderOk &&
        ageOk &&
        incomeOk &&
        facts.incomeTaxPayer !== true &&
        facts.governmentEmployee !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.state === 'Maharashtra') matched.push({ en: 'Resident of Maharashtra', mr: 'महाराष्ट्राचे रहिवासी आहात', hi: 'महाराष्ट्र की निवासी हैं' });
      else if (facts.state) unmet.push({ en: 'Must reside in Maharashtra', mr: 'केवळ महाराष्ट्रातील रहिवाशांसाठी', hi: 'केवल महाराष्ट्र के लिए' });
      else missing.push('state');

      if (facts.age >= 21 && facts.age <= 65) matched.push({ en: `Age ${facts.age} is within eligible bracket (21-65 years)`, mr: `वय ${facts.age} वर्षे पात्र वयोगटात (२१ ते ६५ वर्षे) आहे`, hi: `उम्र ${facts.age} वर्ष पात्र श्रेणी (21-65) में है` });
      else if (facts.age < 21 || facts.age > 65) unmet.push({ en: 'Age must be between 21 and 65 years', mr: 'वय २१ ते ६५ वर्षांच्या दरम्यान असणे आवश्यक आहे', hi: 'उम्र 21 से 65 वर्ष के बीच होनी चाहिए' });
      else missing.push('age');

      if (facts.annualIncome && facts.annualIncome <= 250000) matched.push({ en: `Annual income ₹${facts.annualIncome.toLocaleString('en-IN')} ≤ ₹2.5 Lakh`, mr: `वार्षिक उत्पन्न ₹${facts.annualIncome.toLocaleString('en-IN')} हे ₹२.५ लाखांच्या आत आहे`, hi: `वार्षिक आय ₹${facts.annualIncome.toLocaleString('en-IN')} ₹2.5 लाख के अंदर है` });
      else if (facts.rationCardEligible === true || facts.bpl === true) matched.push({ en: 'Yellow/Orange ration card waives separate income certificate', mr: 'पिवळे किंवा केशरी रेशन कार्ड असल्यामुळे वेगळ्या उत्पन्न दाखल्याची गरज नाही', hi: 'पीला/नारंगी राशन कार्ड होने पर आय प्रमाण पत्र की छूट' });
      else if (facts.annualIncome > 250000) unmet.push({ en: 'Annual income exceeds ₹2.5 Lakh limit', mr: 'वार्षिक उत्पन्न मर्यादा ₹२.५ लाख पेक्षा जास्त आहे', hi: 'वार्षिक आय ₹2.5 लाख से अधिक है' });

      const isEligible = facts.state === 'Maharashtra' && (facts.age == null || (facts.age >= 21 && facts.age <= 65)) && facts.incomeTaxPayer !== true && facts.governmentEmployee !== true;
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Woman aged between 21 and 65 years residing in Maharashtra.',
      'Family annual income is under ₹2.5 Lakh (or family possesses Yellow/Orange ration card).',
      'Applicant possesses an individual Aadhaar-seeded active bank account.',
      'No member of the household is an income tax payer or permanent government employee.'
    ],
    checksHi: [
      'महाराष्ट्र में रहने वाली 21 से 65 वर्ष की महिला।',
      'परिवार की वार्षिक आय ₹2.5 लाख से कम (या पीला/नारंगी राशन कार्ड)।',
      'महिला का स्वयं का आधार लिंक चालू बैंक खाता।',
      'परिवार में कोई आयकर दाता या स्थायी सरकारी कर्मचारी न हो।'
    ],
    checksMr: [
      'महाराष्ट्रात वास्तव्यास असलेली २१ ते ६५ वयोगटातील महिला.',
      'कुटुंबाचे एकत्रित वार्षिक उत्पन्न ₹२.५ लाख किंवा त्यापेक्षा कमी (किंवा पिवळे/केशरी रेशन कार्ड).',
      'अर्जदार महिलेचे स्वतःचे आधार जोडणी असलेले बँक खाते.',
      'कुटुंबात कोणीही आयकर भरणारे किंवा नियमित शासकीय कर्मचारी नसावे.'
    ],
    docs: [
      'Aadhaar Card of the woman applicant',
      'Yellow or Orange Ration Card (or Tehsildar Income Certificate ≤ ₹2.5 Lakh)',
      'Domicile Certificate of Maharashtra (or 15-yr Ration Card / Voter ID / School Leaving Certificate)',
      'Bank Passbook of Aadhaar-linked account (in applicant woman’s own name)',
      'Self-Declaration (Hamipatra)'
    ],
    docsHi: [
      'महिला आवेदक का आधार कार्ड',
      'पीला अथवा नारंगी राशन कार्ड (या तहसीलदार आय प्रमाण पत्र ₹2.5 लाख तक)',
      'महाराष्ट्र अधिवास प्रमाण पत्र (या 15 वर्ष पुराना राशन कार्ड / वोटर आईडी / स्कूल दाखिला)',
      'आधार लिंक बैंक पासबुक (स्वयं के नाम पर)',
      'स्वयं-घोषणा पत्र (हमीपत्र)'
    ],
    docsMr: [
      'अर्जदार महिलेचे आधार कार्ड',
      'पिवळे किंवा केशरी रेशन कार्ड (किंवा तहसीलदार उत्पन्न दाखला वार्षिक ₹२.५ लाखांपर्यंत)',
      'अधिवास प्रमाणपत्र / डोमिसाईल (किंवा १५ वर्षे जुने रेशन कार्ड / मतदार ओळखपत्र / शाळा सोडल्याचा दाखला)',
      'महिलेचे स्वतःच्या नावाचे आधार संलग्न बँक पासबुक',
      'हमीपत्र (नियम व अटी मान्यतेचा स्वयंघोषणा फॉर्म)'
    ],
    source: 'Women & Child Development Department, Govt of Maharashtra',
    sourceLabel: 'Official Ladki Bahin Portal',
    url: 'https://ladkibahin.maharashtra.gov.in/',
    detailUrl: 'https://womenchild.maharashtra.gov.in/',
    applyMethod: 'Apply online on ladkibahin.maharashtra.gov.in, via Nari Shakti Doot App, or at Gram Panchayat / Anganwadi Kendra / Setu Kendra.'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY & MJPJAY',
    shortName: 'Ayushman Bharat / MJPJAY',
    level: 'CENTRAL & STATE',
    category: 'HEALTH',
    categoryIcon: '🏥',
    categoryMr: 'आरोग्य संरक्षण',
    categoryHi: 'स्वास्थ्य सुरक्षा',
    amount: '₹5,00,000 / year cashless health cover',
    amountHi: '₹5,00,000 प्रति वर्ष कैशलेस इलाज',
    amountMr: '₹५,००,००० प्रति वर्ष मोफत रोखरहित उपचार',
    benefitDetail: 'Cashless hospitalisation coverage up to ₹5 Lakh per family per year across 1,900+ empanelled government and private hospitals.',
    benefitDetailHi: 'सरकारी और निजी अस्पतालों में ₹5 लाख तक का सालाना मुफ़्त कैशलेस इलाज।',
    benefitDetailMr: 'मान्यताप्राप्त सरकारी व खासगी रुग्णालयांमध्ये दरवर्षी ₹५ लाखांपर्यंतचे मोफत रोखरहित (Cashless) उपचार.',
    summary: 'Comprehensive free medical and surgical treatment cover for low and middle income families.',
    summaryHi: 'गरीब और मध्यमवर्गीय परिवारों के लिए 5 लाख रुपये तक का मुफ्त स्वास्थ्य बीमा।',
    summaryMr: 'रेशन कार्डधारक व गरजू कुटुंबांसाठी वर्षाला ₹५ लाखांपर्यंतचे मोफत वैद्यकीय उपचार व शस्त्रक्रिया.',
    rule: (facts) => {
      return (
        facts.rationCardEligible === true ||
        facts.bpl === true ||
        (facts.annualIncome != null && facts.annualIncome <= 100000) ||
        facts.supportNeed === true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.rationCardEligible === true || facts.bpl === true) {
        matched.push({ en: 'Holds Yellow, Orange, or Antyodaya ration card', mr: 'पिवळे, केशरी किंवा अंत्योदय रेशन कार्डधारक आहात', hi: 'पीला, नारंगी या अंत्योदय राशन कार्ड धारक हैं' });
      } else if (facts.annualIncome && facts.annualIncome <= 100000) {
        matched.push({ en: `Annual income ₹${facts.annualIncome} qualifies for state health cover`, mr: 'वार्षिक उत्पन्न ₹१ लाखांच्या आत असल्याने पात्र', hi: 'वार्षिक आय ₹1 लाख के अंदर होने से पात्र' });
      } else {
        missing.push('rationCardEligible');
      }

      const isEligible = facts.rationCardEligible === true || facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 100000) || facts.supportNeed === true;
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Possesses a Yellow, Orange, Antyodaya, or Annapurna ration card.',
      'Cover applies to all enrolled family members with no age limit.',
      'Covers pre-existing illnesses, surgery, ICU, and diagnostics.'
    ],
    checksHi: [
      'पीला, नारंगी, अंत्योदय या अन्नपूर्णा राशन कार्ड उपलब्ध है।',
      'परिवार के सभी सदस्यों के लिए बिना किसी आयु सीमा के लागू।',
      'गंभीर बीमारियाँ, सर्जरी, आईसीयू और दवाइयां पूर्णतः कैशलेस।'
    ],
    checksMr: [
      'पिवळे, केशरी, अंत्योदय किंवा अन्नपूर्णा रेशन कार्ड उपलब्ध आहे.',
      'कुटुंबातील सर्व सदस्यांना वयाची कोणतीही अट न ठेवता लाभ मिळतो.',
      'गंभीर आजार, शस्त्रक्रिया, अतिदक्षता विभाग (ICU) आणि चाचण्या पूर्णपणे मोफत.'
    ],
    docs: [
      'Aadhaar card of all family members',
      'Valid Ration Card (Yellow, Orange, or Antyodaya)',
      'Active mobile number',
      'Ayushman / Golden Card (generated at hospital Arogyamitra desk)'
    ],
    docsHi: [
      'परिवार के सभी सदस्यों का आधार कार्ड',
      'वैध राशन कार्ड (पीला, नारंगी या अंत्योदय)',
      'चालू मोबाइल नंबर',
      'आयुष्मान कार्ड (अस्पताल के आरोग्यमित्र काउंटर पर तैयार)'
    ],
    docsMr: [
      'कुटुंबातील सर्व व्यक्तींचे आधार कार्ड',
      'वैध रेशन कार्ड (पिवळे, केशरी किंवा अंत्योदय कार्ड)',
      'चालू मोबाईल नंबर',
      'आयुष्मान गोल्डन कार्ड (सरकारी किंवा अंगीकृत रुग्णालयातील आरोग्यमित्राकडून)'
    ],
    source: 'National Health Authority & State Health Assurance Society, MH',
    sourceLabel: 'Ayushman Bharat & Jeevandayee Portal',
    url: 'https://beneficiary.nha.gov.in/',
    detailUrl: 'https://www.jeevandayee.gov.in/',
    applyMethod: 'Check status on beneficiary.nha.gov.in using Aadhaar/Ration Card or create Golden Card directly at any empanelled hospital Arogyamitra desk.'
  },
  {
    id: 'lek-ladki',
    name: 'Lek Ladki Yojana',
    shortName: 'Lek Ladki',
    level: 'MAHARASHTRA',
    category: 'GIRL CHILD',
    categoryIcon: '👧',
    categoryMr: 'मुलींचे सक्षमीकरण व शिक्षण',
    categoryHi: 'बालिका कल्याण व शिक्षा',
    amount: 'Up to ₹1,01,000 in stages',
    amountHi: '₹1,01,000 तक टप्पों में',
    amountMr: 'टप्प्याटप्प्याने एकूण ₹१,०१,००० पर्यंत',
    benefitDetail: 'Cash assistance: ₹5,000 at birth, ₹6,000 in Class 1, ₹7,000 in Class 6, ₹8,000 in Class 11, and ₹75,000 lump sum at age 18.',
    benefitDetailHi: 'जन्म पर ₹5,000, कक्षा 1 में ₹6,000, कक्षा 6 में ₹7,000, कक्षा 11 में ₹8,000 और 18 वर्ष पूरे होने पर ₹75,000 की एकमुश्त सहायता।',
    benefitDetailMr: 'मुलीच्या जन्मानंतर ₹५,०००, पहिलीत ₹६,०००, सहावीत ₹७,०००, अकरावीत ₹८,००० व १८ वर्षे पूर्ण झाल्यावर ₹७५,००० ची एकरकमी रक्कम.',
    summary: 'Staged financial empowerment for girl children born in yellow or orange ration card families in Maharashtra.',
    summaryHi: 'महाराष्ट्र में पीले या नारंगी राशन कार्ड वाले परिवारों की बालिकाओं के लिए चरणबद्ध वित्तीय सहायता।',
    summaryMr: 'पिवळे किंवा केशरी रेशन कार्डधारक कुटुंबातील मुलींच्या जन्मापासून ते १८ वर्षांपर्यंत टप्प्याटप्प्याने आर्थिक आधार.',
    rule: (facts) => {
      return (
        facts.state === 'Maharashtra' &&
        facts.hasGirlChild === true &&
        facts.rationCardEligible === true &&
        facts.incomeTaxPayer !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.state === 'Maharashtra') matched.push({ en: 'Resident of Maharashtra', mr: 'महाराष्ट्राचे रहिवासी', hi: 'महाराष्ट्र के निवासी' });
      else missing.push('state');

      if (facts.hasGirlChild === true) matched.push({ en: 'Family has a girl child', mr: 'कुटुंबात मुलगी आहे', hi: 'परिवार में बेटी है' });
      else unmet.push({ en: 'Scheme is specifically for families with girl children', mr: 'ही योजना केवळ मुली असलेल्या कुटुंबांसाठी आहे', hi: 'यह योजना केवल बालिकाओं वाले परिवारों के लिए है' });

      if (facts.rationCardEligible === true || facts.bpl === true) matched.push({ en: 'Possesses Yellow or Orange Ration Card', mr: 'पिवळे किंवा केशरी रेशन कार्डधारक', hi: 'पीला अथवा नारंगी राशन कार्ड है' });
      else unmet.push({ en: 'Requires Yellow or Orange ration card', mr: 'पिवळे किंवा केशरी रेशन कार्ड आवश्यक आहे', hi: 'पीला या नारंगी राशन कार्ड होना अनिवार्य है' });

      const isEligible = facts.state === 'Maharashtra' && facts.hasGirlChild === true && (facts.rationCardEligible === true || facts.bpl === true);
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Girl child born on or after 1 April 2023 in Maharashtra.',
      'Family holds a valid Yellow or Orange ration card.',
      'Parents adhere to family planning guidelines after 2 children.'
    ],
    checksHi: [
      'बालिका का जन्म 1 अप्रैल 2023 या उसके बाद महाराष्ट्र में हुआ हो।',
      'परिवार के पास वैध पीला अथवा नारंगी राशन कार्ड हो।',
      'दो बच्चों के बाद परिवार नियोजन के नियमों का पालन।'
    ],
    checksMr: [
      'मुलीचा जन्म १ एप्रिल २०२३ रोजी किंवा त्यानंतर झालेला असावा.',
      'कुटुंबाकडे वैध पिवळे किंवा केशरी रेशन कार्ड असणे आवश्यक.',
      'दुसऱ्या अपत्यानंतर कुटुंब नियोजन शस्त्रक्रिया प्रमाणपत्र आवश्यक.'
    ],
    docs: [
      'Girl child official Birth Certificate',
      'Yellow or Orange Ration Card',
      'Aadhaar card of parents & child (if available)',
      'Bank passbook in girl’s name (jointly with mother)',
      'Family planning certificate (for 2nd child onwards)'
    ],
    docsHi: [
      'बालिका का आधिकारिक जन्म प्रमाण पत्र',
      'पीला अथवा नारंगी राशन कार्ड',
      'माता-पिता व बालिका का आधार कार्ड',
      'बालिका के नाम बैंक पासबुक (माता के साथ संयुक्त खाता)',
      'परिवार नियोजन प्रमाण पत्र (दूसरे बच्चे के बाद)'
    ],
    docsMr: [
      'मुलीचा अधिकृत जन्म दाखला (नगरपरिषद / ग्रामपंचायत)',
      'कुटुंबाचे पिवळे किंवा केशरी रेशन कार्ड',
      'पालकांचे व मुलीचे आधार कार्ड',
      'मुलीच्या नावे बँक पासबुक (आईसह संयुक्त खाते)',
      'कुटुंब नियोजन शस्त्रक्रिया प्रमाणपत्र (दुसऱ्या अपत्यानंतर)'
    ],
    source: 'Women & Child Development Department, Maharashtra',
    sourceLabel: 'MahaDBT WCD Portal',
    url: 'https://mahadbt.maharashtra.gov.in/',
    detailUrl: 'https://zpwardha.maharashtra.gov.in/en/women-and-child-development-department/',
    applyMethod: 'Submit application through the local Anganwadi Sevika or Child Development Project Officer (CDPO) in your taluka.'
  },
  {
    id: 'sanjay-gandhi',
    name: 'Sanjay Gandhi Niradhar Anudan Yojana',
    shortName: 'Sanjay Gandhi Niradhar',
    level: 'MAHARASHTRA',
    category: 'MONTHLY SUPPORT',
    categoryIcon: '🤝',
    categoryMr: 'निराधार व दिव्यांग सहाय्य',
    categoryHi: 'निराधार एवं दिव्यांग सहायता',
    amount: '₹1,500 / month (₹2,500 for family with 2+ kids)',
    amountHi: '₹1,500 प्रति माह (बच्चों के साथ ₹2,500)',
    amountMr: '₹१,५०० प्रति महिना (मुले असल्यास ₹२,५०० पर्यंत)',
    benefitDetail: 'Monthly pension of ₹1,500 per month for single beneficiary; ₹2,500 per month if there are two or more dependent minor children.',
    benefitDetailHi: 'एकल लाभार्थी को ₹1,500 प्रति माह; 2 या अधिक आश्रित बच्चे होने पर ₹2,500 प्रति माह।',
    benefitDetailMr: 'एका लाभार्थ्यास दरमहा ₹१,५००; दोन किंवा अधिक अल्पवयीन मुले असल्यास दरमहा ₹२,५०० पर्यंत पेन्शन.',
    summary: 'Social security pension for destitute persons, widows, divorced women, orphans, and persons with severe disabilities.',
    summaryHi: 'निराधार, विधवा, दिव्यांग, अनाथ और गंभीर रूप से अस्वस्थ व्यक्तियों के लिए मासिक सामाजिक सुरक्षा पेंशन।',
    summaryMr: 'निराधार व्यक्ती, विधवा, घटस्फोटित महिला, अनाथ मुले व ४०% पेक्षा जास्त दिव्यांग व्यक्तींसाठी दरमहा पेन्शन.',
    rule: (facts) => {
      const incomeOk = facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 50000);
      const ageOk = facts.age == null || (facts.age >= 18 && facts.age < 65);
      return (
        facts.state === 'Maharashtra' &&
        facts.supportNeed === true &&
        ageOk &&
        incomeOk
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.state === 'Maharashtra') matched.push({ en: 'Maharashtra resident', mr: 'महाराष्ट्रात १५ वर्षे वास्तव्य', hi: 'महाराष्ट्र में 15 वर्ष से निवास' });
      else missing.push('state');

      if (facts.supportNeed === true) matched.push({ en: 'Qualifying need: destitute, widow, disability, or orphan', mr: 'पात्र कारण: निराधार, विधवा, दिव्यांग किंवा गंभीर आजार', hi: 'पात्र स्थिति: निराधार, विधवा, दिव्यांग या असाध्य रोग' });
      else unmet.push({ en: 'Requires qualifying support need condition', mr: 'पात्र परिस्थिती (निराधार/विधवा/दिव्यांग) नोंदवलेली नाही', hi: 'पात्र निराधार या दिव्यांग स्थिति नहीं पाई गई' });

      if (facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 50000)) {
        matched.push({ en: 'Income within limit (≤ ₹21,000 / ₹50,000 or BPL)', mr: 'उत्पन्न मर्यादेत आहे (वार्षिक ₹२१,००० / ₹५०,००० च्या आत किंवा BPL)', hi: 'वार्षिक आय सीमा के भीतर (₹21,000 / ₹50,000 तक अथवा BPL)' });
      } else if (facts.annualIncome > 50000) {
        unmet.push({ en: 'Income exceeds eligible ceiling of ₹50,000', mr: 'वार्षिक उत्पन्न ₹५०,००० पेक्षा जास्त आहे', hi: 'वार्षिक आय सीमा ₹50,000 से अधिक है' });
      }

      const isEligible = facts.state === 'Maharashtra' && facts.supportNeed === true && (facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 50000));
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Age between 18 and 64 years residing in Maharashtra for at least 15 years.',
      'Destitute, widow, person with 40%+ disability, deserted woman, or trans person.',
      'Family annual income does not exceed ₹21,000 (or ₹50,000 for disability cases).'
    ],
    checksHi: [
      '18 से 64 वर्ष की आयु और महाराष्ट्र में कम से कम 15 वर्ष का अधिवास।',
      'निराधार, विधवा, 40% या अधिक दिव्यांग, परित्यक्ता अथवा अनाथ।',
      'पारिवारिक वार्षिक आय ₹21,000 (दिव्यांगों हेतु ₹50,000) से अधिक न हो।'
    ],
    checksMr: [
      'वय १८ ते ६४ वर्षे आणि महाराष्ट्रात किमान १५ वर्षांचे वास्तव्य.',
      'निराधार, विधवा, ४०% किंवा त्याहून अधिक दिव्यांग, घटस्फोटित किंवा असाध्य आजारी व्यक्ती.',
      'कुटुंबाचे वार्षिक उत्पन्न ₹२१,००० (दिव्यांगांसाठी ₹५०,०००) च्या मर्यादेत असणे आवश्यक.'
    ],
    docs: [
      'Age Proof (School Leaving Certificate / Medical Certificate / Voter ID)',
      '15-year Maharashtra Domicile / Residence Proof',
      'Tahsildar Income Certificate (≤ ₹21,000 or ₹50,000) or BPL Certificate',
      'Proof of Qualifying Condition (Death certificate of husband / Civil Surgeon Disability Certificate / Court Divorce decree)',
      'Aadhaar card & Bank Passbook'
    ],
    docsHi: [
      'आयु प्रमाण पत्र (स्कूल दाखिला / मतदाता पत्र / सरकारी डॉक्टर प्रमाण पत्र)',
      '15 वर्ष का महाराष्ट्र निवास प्रमाण पत्र (डोमिसाइल)',
      'तहसीलदार आय प्रमाण पत्र (₹21,000 तक) अथवा BPL कार्ड',
      'पात्र स्थिति का प्रमाण (पति का मृत्यु प्रमाण पत्र / सिविल सर्जन दिव्यांगता प्रमाण पत्र)',
      'आधार कार्ड एवं बैंक पासबुक'
    ],
    docsMr: [
      'वयाचा पुरावा (शाळा सोडल्याचा दाखला / जन्म दाखला / वैद्यकीय दाखला)',
      'महाराष्ट्रात १५ वर्षे वास्तव्याचा पुरावा (तहसीलदार अधिवास दाखला / रेशन कार्ड)',
      'तहसीलदारांचा उत्पन्नाचा दाखला (वार्षिक ₹२१,००० च्या आत) किंवा बीपीएल नोंद',
      'पात्रतेचे प्रमाणपत्र (पतीचा मृत्यू दाखला / जिल्हा शल्यचिकित्सकांचा किमान ४०% दिव्यांग दाखला)',
      'आधार कार्ड व बँक पासबुकची प्रत'
    ],
    source: 'Social Justice & Special Assistance Department, Govt of Maharashtra',
    sourceLabel: 'SJSA Maharashtra Portal',
    url: 'https://sjsa.maharashtra.gov.in/',
    detailUrl: 'https://sjsa.maharashtra.gov.in/en/scheme/sanjay-gandhi-niradhar-anudan-yojana/',
    applyMethod: 'Apply at the Tahsildar office (Sanjay Gandhi Yojana Cell) or Aaple Sarkar Seva Kendra in your taluka.'
  },
  {
    id: 'shravanbal',
    name: 'Shravanbal Seva Rajya Nivruttivetan Yojana',
    shortName: 'Shravanbal Pension',
    level: 'MAHARASHTRA',
    category: 'SENIORS',
    categoryIcon: '👴',
    categoryMr: 'ज्येष्ठ नागरिक निवृत्तीवेतन',
    categoryHi: 'वरिष्ठ नागरिक पेंशन',
    amount: '₹1,500 / month',
    amountHi: '₹1,500 प्रति माह',
    amountMr: '₹१,५०० प्रति महिना',
    benefitDetail: 'Direct monthly pension of ₹1,500 credited to senior citizen’s Aadhaar-linked bank account.',
    benefitDetailHi: 'वरिष्ठ नागरिक के बैंक खाते में प्रतिमाह ₹1,500 की सीधी पेंशन।',
    benefitDetailMr: 'ज्येष्ठ नागरिकांच्या बँक खात्यात थेट दरमहा ₹१,५०० निवृत्तीवेतन जमा.',
    summary: 'Old age pension scheme for senior citizens aged 65 and above from economically weaker backgrounds.',
    summaryHi: '65 वर्ष या अधिक आयु के गरीब वरिष्ठ नागरिकों के लिए वृद्धावस्था पेंशन योजना।',
    summaryMr: '६५ वर्षे किंवा त्याहून अधिक वय असलेल्या आर्थिकदृष्ट्या दुर्बल ज्येष्ठ नागरिकांसाठी वृद्धापकाळ पेन्शन.',
    rule: (facts) => {
      const incomeOk = facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 21000) || facts.rationCardEligible === true;
      const ageOk = facts.age != null && facts.age >= 65;
      return (
        facts.state === 'Maharashtra' &&
        ageOk &&
        incomeOk
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.state === 'Maharashtra') matched.push({ en: 'Maharashtra resident (15+ yrs)', mr: 'महाराष्ट्रात १५ वर्षे वास्तव्य', hi: 'महाराष्ट्र में 15 वर्ष से निवास' });
      else missing.push('state');

      if (facts.age >= 65) matched.push({ en: `Age ${facts.age} meets senior threshold (65+ years)`, mr: `वय ${facts.age} वर्षे हे ६५ वर्षांवरील निकषात बसते`, hi: `आयु ${facts.age} वर्ष (65+) वरिष्ठ नागरिक श्रेणी में है` });
      else if (facts.age != null && facts.age < 65) unmet.push({ en: 'Requires age 65 years or above', mr: 'वय ६५ वर्षे किंवा त्याहून अधिक असणे आवश्यक आहे', hi: 'आयु 65 वर्ष या उससे अधिक होनी चाहिए' });
      else missing.push('age');

      if (facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 21000)) {
        matched.push({ en: 'Household annual income ≤ ₹21,000 or in BPL list', mr: 'वार्षिक उत्पन्न ₹२१,००० च्या आत किंवा बीपीएल यादीत नोंद', hi: 'वार्षिक आय ₹21,000 के अंदर अथवा बीपीएल सूची में' });
      }

      const isEligible = facts.state === 'Maharashtra' && facts.age >= 65 && (facts.bpl === true || (facts.annualIncome != null && facts.annualIncome <= 21000));
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Age 65 years or older residing in Maharashtra for 15+ years.',
      'Family annual income under ₹21,000 or name included in the BPL list.',
      'Not receiving any other government/EPFO pension.'
    ],
    checksHi: [
      'आयु 65 वर्ष या अधिक और महाराष्ट्र में 15 वर्ष से निवास।',
      'परिवार की वार्षिक आय ₹21,000 से कम अथवा बीपीएल सूची में नाम।',
      'अन्य कोई सरकारी या ईपीएफओ पेंशन न मिलती हो।'
    ],
    checksMr: [
      'वय ६५ वर्षे किंवा अधिक आणि महाराष्ट्रात किमान १५ वर्षे वास्तव्य.',
      'कुटुंबाचे वार्षिक उत्पन्न ₹२१,००० च्या आत किंवा केंद्र/राज्य शासनाच्या बीपीएल यादीत नाव.',
      'इतर कोणतीही शासकीय अथवा निमशासकीय पेन्शन मिळत नसावी.'
    ],
    docs: [
      'Age Proof (School Leaving Certificate / Civil Surgeon Age Certificate / Voter ID)',
      '15-Year Domicile / Residence Certificate',
      'Tahsildar Income Certificate (≤ ₹21,000/yr) or BPL Ration Card',
      'Aadhaar card & Bank Passbook',
      'Non-pensioner self-declaration affidavit'
    ],
    docsHi: [
      'आयु प्रमाण पत्र (स्कूल प्रमाणपत्र / मेडिकल बोर्ड आयु प्रमाण पत्र)',
      'महाराष्ट्र निवास प्रमाण पत्र (15 वर्ष)',
      'तहसीलदार आय प्रमाण पत्र (₹21,000 तक) अथवा बीपीएल कार्ड',
      'आधार कार्ड एवं बैंक पासबुक',
      'अन्य पेंशन न लेने का शपथ पत्र'
    ],
    docsMr: [
      'वयाचा पुरावा (शाळा सोडल्याचा दाखला किंवा सरकारी डॉक्टरांचे वयाचे प्रमाणपत्र)',
      'महाराष्ट्रातील १५ वर्षे वास्तव्याचा पुरावा',
      'तहसीलदारांचा उत्पन्नाचा दाखला (वार्षिक उत्पन्न ₹२१,००० च्या आत) किंवा बीपीएल दाखला',
      'आधार कार्ड व बँक पासबुक',
      'अन्य कोणतीही पेन्शन न घेत असल्याबाबतचे स्वयंघोषणापत्र'
    ],
    source: 'Social Justice & Special Assistance Department, Maharashtra',
    sourceLabel: 'SJSA Shravanbal Portal',
    url: 'https://sjsa.maharashtra.gov.in/',
    detailUrl: 'https://sjsa.maharashtra.gov.in/scheme/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%B5%E0%A4%A3%E0%A4%AC%E0%A4%BE%E0%A4%B3-%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE-%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A5%8D%E0%A4%AF-%E0%A4%A8%E0%A4%BF%E0%A4%B5%E0%A5%83%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%80%E0%A4%B5%E0%A5%87%E0%A4%A4%E0%A4%A8-%E0%A4%AF%E0%A5%8B%E0%A4%9C%E0%A4%A8%E0%A4%BE',
    applyMethod: 'Submit application in prescribed form at the Tahsildar Office (Social Welfare Desk) or Aaple Sarkar CSC.'
  },
  {
    id: 'pm-ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana 2.0',
    shortName: 'PM Ujjwala Yojana',
    level: 'CENTRAL',
    category: 'ENERGY & WOMEN',
    categoryIcon: '🔥',
    categoryMr: 'स्वच्छ इंधन व महिला आरोग्य',
    categoryHi: 'स्वच्छ ईंधन व महिला स्वास्थ्य',
    amount: 'Free LPG Connection + Stove + Subsidy',
    amountHi: 'मुफ़्त गैस कनेक्शन + चूल्हा + सब्सिडी',
    amountMr: 'मोफत गॅस जोडणी + शेगडी + अनुदान',
    benefitDetail: 'Deposit-free LPG cylinder connection, free first cylinder refill, free hotplate stove, plus ongoing targeted subsidy per cylinder.',
    benefitDetailHi: 'बिना सिक्योरिटी डिपॉजिट का एलपीजी कनेक्शन, पहला भरा हुआ सिलेंडर और चूल्हा मुफ़्त, साथ ही प्रति सिलेंडर सब्सिडी।',
    benefitDetailMr: 'मोफत गॅस सिलिंडर जोडणी, पहिला सिलिंडर मोफत भरून, मोफत गॅस शेगडी व दर सिलिंडरवर थेट खात्यात अनुदान.',
    summary: 'Clean cooking fuel access for adult women from poor and marginalized households.',
    summaryHi: 'गरीब और वंचित ग्रामीण परिवारों की वयस्क महिलाओं के लिए मुफ्त एलपीजी कनेक्शन।',
    summaryMr: 'ग्रामीण भागातील गरीब व वंचित कुटुंबांतील महिलांसाठी धूरमुक्त स्वयंपाकघरासाठी मोफत गॅस जोडणी.',
    rule: (facts) => {
      const incomeOk = facts.bpl === true || facts.rationCardEligible === true || (facts.annualIncome != null && facts.annualIncome <= 180000);
      const genderOk = facts.gender === 'female' || facts.womanApplicant === true || facts.hasGirlChild === true;
      return (
        genderOk &&
        incomeOk &&
        facts.incomeTaxPayer !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.bpl === true || facts.rationCardEligible === true) {
        matched.push({ en: 'BPL / Priority Household ration cardholder', mr: 'बीपीएल किंवा प्राधान्य कुटुंब रेशन कार्डधारक', hi: 'बीपीएल या प्राथमिकता राशन कार्ड धारक' });
      } else if (facts.annualIncome && facts.annualIncome <= 180000) {
        matched.push({ en: 'Low-income family without LPG connection', mr: 'कमी उत्पन्न गटातील कुटुंब', hi: 'कम आय वर्ग का परिवार' });
      } else {
        missing.push('rationCardEligible');
      }

      const isEligible = facts.bpl === true || facts.rationCardEligible === true || (facts.annualIncome != null && facts.annualIncome <= 180000);
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Adult woman (18+ years) applying on behalf of the household.',
      'No member of the household already owns an active LPG connection.',
      'Possesses a BPL / Antyodaya / Priority ration card.'
    ],
    checksHi: [
      'परिवार की वयस्क महिला (18 वर्ष या अधिक) के नाम पर आवेदन।',
      'घर में पहले से कोई अन्य एलपीजी गैस कनेक्शन न हो।',
      'बीपीएल / अंत्योदय अथवा प्राथमिकता राशन कार्ड उपलब्ध हो।'
    ],
    checksMr: [
      'कुटुंबातील १८ वर्षे किंवा त्याहून अधिक वयाची महिला अर्जदार असावी.',
      'कुटुंबातील कोणाच्याही नावावर आधीच एलपीजी गॅस जोडणी नसावी.',
      'कुटुंबाकडे बीपीएल / अंत्योदय / प्राधान्य रेशन कार्ड असणे आवश्यक.'
    ],
    docs: [
      'Aadhaar card of adult woman applicant',
      'BPL / Priority Ration Card confirming family composition',
      'Aadhaar-linked Bank Passbook (for subsidy credit)',
      'Declaration of no existing LPG connection in the house'
    ],
    docsHi: [
      'महिला आवेदक का आधार कार्ड',
      'बीपीएल / राशन कार्ड (परिवार के सभी सदस्यों के नाम सहित)',
      'सब्सिडी हेतु आधार से जुड़ा बैंक खाता पासबुक',
      'घर में दूसरा गैस कनेक्शन न होने का घोषणा पत्र'
    ],
    docsMr: [
      'अर्जदार महिलेचे आधार कार्ड',
      'रेशन कार्ड (कुटुंबातील सर्व सदस्यांची नावे समाविष्ट असलेले)',
      'अनुदान जमा होण्यासाठी आधार जोडलेले बँक पासबुक',
      'घरात अन्य गॅस जोडणी नसल्याबाबतचे हमीपत्र'
    ],
    source: 'Ministry of Petroleum & Natural Gas, GoI',
    sourceLabel: 'PM Ujjwala Official Portal',
    url: 'https://www.pmuy.gov.in/',
    detailUrl: 'https://www.pmuy.gov.in/en/eligibility.html',
    applyMethod: 'Apply online at pmuy.gov.in or submit form directly to nearest HP Gas, Bharat Gas, or Indane distributor.'
  },
  {
    id: 'pm-awas',
    name: 'Pradhan Mantri Awas Yojana (PMAY Gramin / Urban)',
    shortName: 'PM Awas Yojana',
    level: 'CENTRAL & STATE',
    category: 'HOUSING',
    categoryIcon: '🏡',
    categoryMr: 'पक्के घर व गृहनिर्माण',
    categoryHi: 'पक्का आवास एवं गृह निर्माण',
    amount: '₹1,20,000 to ₹2,50,000 financial grant',
    amountHi: '₹1,20,000 से ₹2,50,000 की पक्की सहायता',
    amountMr: '₹१,२०,००० ते ₹२,५०,००० चे घरकुल अनुदान',
    benefitDetail: 'Direct financial assistance of ₹1.2 Lakh (plain areas) / ₹1.3 Lakh (hilly areas) + 90 days MGNREGA wages + ₹12,000 for Swachh Bharat toilet.',
    benefitDetailHi: 'मकान निर्माण हेतु ₹1.20 लाख सहायता + 90 दिन का मनरेगा मजदूरी भुगतान + शौचालय हेतु ₹12,000।',
    benefitDetailMr: 'घर बांधकामासाठी ₹१,२०,००० थेट अनुदान + ९० दिवसांची मनरेगा मजुरी + स्वच्छ भारत मिशन अंतर्गत शौचालयासाठी ₹१२,०००.',
    summary: 'Housing grant for homeless families or those living in kutcha/dilapidated houses.',
    summaryHi: 'बेघर अथवा कच्चे मकान में रहने वाले परिवारों के लिए पक्के मकान का निर्माण अनुदान।',
    summaryMr: 'बेघर अथवा कच्च्या घरात राहणाऱ्या गरीब कुटुंबांना स्वतःचे पक्के घरकुल बांधण्यासाठी शासकीय आर्थिक मदत.',
    rule: (facts) => {
      const incomeOk = facts.bpl === true || facts.rationCardEligible === true || (facts.annualIncome != null && facts.annualIncome <= 300000);
      return (
        incomeOk &&
        facts.incomeTaxPayer !== true &&
        facts.governmentEmployee !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.bpl === true || facts.rationCardEligible === true) {
        matched.push({ en: 'Identified under housing deprivation / low income criteria', mr: 'कच्चे घर / दारिद्र्य रेषेखालील निकषात पात्र', hi: 'कच्चा मकान / बीपीएल आवास श्रेणी में पात्र' });
      } else if (facts.annualIncome && facts.annualIncome <= 300000) {
        matched.push({ en: 'EWS income under ₹3 Lakh', mr: 'वार्षिक उत्पन्न ईडब्ल्यूएस मर्यादेत (₹३ लाख)', hi: 'वार्षिक आय ₹3 लाख के अंदर' });
      }

      const isEligible = facts.bpl === true || facts.rationCardEligible === true || (facts.annualIncome != null && facts.annualIncome <= 300000);
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Beneficiary family does not own a pucca house anywhere in India.',
      'Living in a kutcha house (thatched/tin/mud roof) or houseless.',
      'Name listed in SECC 2011 / Awas+ survey list or verified by Gram Sabha.'
    ],
    checksHi: [
      'परिवार के पास भारत में कहीं भी पक्का मकान न हो।',
      'वर्तमान में कच्चे अथवा अस्थायी मकान में रहते हों।',
      'आवास प्लस सूची अथवा ग्राम सभा द्वारा सत्यापित पात्रता।'
    ],
    checksMr: [
      'कुटुंबाच्या मालकीचे भारतात कुठेही पक्के घर नसावे.',
      'सध्या कुडाच्या, मातीच्या किंवा कच्च्या घरात वास्तव्य असावे.',
      'आवास प्लस सर्वेक्षण यादीत नोंद किंवा ग्रामसभेची अधिकृत मान्यता.'
    ],
    docs: [
      'Aadhaar cards of all family members',
      'MGNREGA Job Card Number',
      'Bank passbook linked with Aadhaar (DBT enabled)',
      'Land ownership deed / Gram Panchayat Patta / No Objection Certificate (NOC)',
      'Photograph of existing kutcha house'
    ],
    docsHi: [
      'परिवार के सभी सदस्यों का आधार कार्ड',
      'मनरेगा जॉब कार्ड नंबर',
      'आधार से जुड़ा बैंक पासबुक',
      'भूमि स्वामित्व प्रमाण / ग्राम पंचायत पट्टा / अनापत्ति प्रमाण पत्र',
      'वर्तमान कच्चे मकान की फ़ोटो'
    ],
    docsMr: [
      'कुटुंबातील सर्व व्यक्तींचे आधार कार्ड',
      'मनरेगा जॉब कार्ड (MGNREGA Job Card)',
      'आधार संलग्न बँक पासबुक',
      'जागेची मालकी पावती / ग्रामपंचायत घरठाण पट्टा / नमुना ८ नोंद',
      'सध्याच्या कच्च्या घराचे छायाचित्र'
    ],
    source: 'Ministry of Rural Development & MoHUA, GoI',
    sourceLabel: 'PMAY-G National Portal',
    url: 'https://pmayg.nic.in/',
    detailUrl: 'https://pmayg.nic.in/netiay/about-pmayg.aspx',
    applyMethod: 'Contact your Gram Sevak / Gram Panchayat office for enrollment in Awas+ list or apply through PMAY Urban portal.'
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Kaushal Samman Yojana',
    shortName: 'PM Vishwakarma',
    level: 'CENTRAL',
    category: 'ARTISANS & LIVELIHOOD',
    categoryIcon: '🔨',
    categoryMr: 'कारागीर व पारंपारिक व्यवसाय',
    categoryHi: 'पारंपरिक कारीगर व कौशल सम्मान',
    amount: '₹15,000 Toolkit + Loan up to ₹3,00,000 at 5%',
    amountHi: '₹15,000 टूलकिट + ₹3 लाख तक का सस्ता ऋण (5%)',
    amountMr: '₹१५,००० टूलकिट अनुदान + ₹३ लाखांपर्यंत ५% व्याजाने कर्ज',
    benefitDetail: 'Skill training with ₹500/day stipend, ₹15,000 free digital modern toolkit voucher, and collateral-free enterprise loan up to ₹3 Lakh at just 5% interest.',
    benefitDetailHi: 'प्रतिदिन ₹500 भत्ते के साथ कौशल प्रशिक्षण, ₹15,000 का आधुनिक टूलकिट वाउचर, और 5% रियायती ब्याज पर ₹3 लाख तक का ऋण।',
    benefitDetailMr: 'दररोज ₹५०० मानधनासह आधुनिक प्रशिक्षण, ₹१५,००० चे मोफत आधुनिक हत्यारांचे किट, आणि फक्त ५% सवलतीच्या व्याजाने ₹३ लाखांपर्यंत विनातारण कर्ज.',
    summary: 'Comprehensive livelihood support for traditional artisans and craftsmen working with hands and tools.',
    summaryHi: 'हाथ और औज़ारों से काम करने वाले 18 पारंपरिक शिल्पकर्मियों और कारीगरों के लिए संपूर्ण कल्याण योजना।',
    summaryMr: 'हाताने व पारंपारिक अवजारांनी काम करणाऱ्या सुतार, लोहार, कुंभार, चांभार, शिंपी इत्यादी १८ प्रकारच्या कारागिरांसाठी योजना.',
    rule: (facts) => {
      const isArtisan = facts.familyType === 'artisan' || facts.artisan === true;
      const ageOk = facts.age == null || facts.age >= 18;
      return (
        isArtisan &&
        ageOk &&
        facts.governmentEmployee !== true &&
        facts.incomeTaxPayer !== true
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.age == null || facts.age >= 18) matched.push({ en: 'Minimum age 18 years', mr: 'किमान वय १८ वर्षे पूर्ण', hi: 'न्यूनतम आयु 18 वर्ष पूर्ण' });
      else unmet.push({ en: 'Must be at least 18 years old', mr: 'वय १८ वर्षे पूर्ण असणे आवश्यक आहे', hi: 'आयु 18 वर्ष होनी चाहिए' });

      matched.push({ en: 'Engaged in one of 18 notified traditional trades (Carpenter, Blacksmith, Potter, Tailor, Barber, Cobbler, etc.)', mr: '१८ पारंपारिक व्यवसायांपैकी एका व्यवसायात (सुतार, लोहार, कुंभार, शिंपी, न्हावी इत्यादी) कार्यरत', hi: '18 पारंपरिक व्यवसायों में से किसी एक में कार्यरत' });

      const isEligible = (facts.age == null || facts.age >= 18) && facts.governmentEmployee !== true;
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Artisan or craftsperson working in one of 18 traditional family trades.',
      'Minimum age 18 years; only one member per family eligible.',
      'Has not availed Mudra or PMEGP loans in the last 5 years.'
    ],
    checksHi: [
      '18 अधिसूचित पारंपरिक शिल्पकर्म (बढ़ई, लोहार, कुम्हार, दर्जी, मोची आदि) में संलग्न।',
      'न्यूनतम आयु 18 वर्ष; परिवार का केवल एक सदस्य पात्र।',
      'पिछले 5 वर्षों में पीएमईजीपी या मुद्रा लोन न लिया हो।'
    ],
    checksMr: [
      '१८ अधिसूचित पारंपारिक बलुतेदार/कारागीर व्यवसायांपैकी एका व्यवसायात प्रत्यक्ष कार्यरत.',
      'किमान वय १८ वर्षे; कुटुंबातील एकाच व्यक्तीला योजनेचा लाभ मिळू शकतो.',
      'गेल्या ५ वर्षांत मुद्रा किंवा PMEGP योजनेतून कर्ज घेतलेले नसावे.'
    ],
    docs: [
      'Aadhaar card and active mobile number',
      'Aadhaar-linked Bank Passbook',
      'Ration Card / Family details proof',
      'Trade / Skill self-declaration certificate'
    ],
    docsHi: [
      'आधार कार्ड और लिंक मोबाइल नंबर',
      'आधार लिंक बैंक खाता पासबुक',
      'राशन कार्ड / परिवार विवरण',
      'पारंपरिक कार्य का स्वयं-प्रमाण पत्र'
    ],
    docsMr: [
      'आधार कार्ड आणि आधार लिंक मोबाईल नंबर',
      'आधार जोडणी असलेले बँक पासबुक',
      'रेशन कार्ड किंवा कुटुंब नोंद',
      'पारंपारिक व्यवसायाचे स्वयंघोषणापत्र'
    ],
    source: 'Ministry of Micro, Small and Medium Enterprises (MSME), GoI',
    sourceLabel: 'PM Vishwakarma Official Portal',
    url: 'https://pmvishwakarma.gov.in/',
    detailUrl: 'https://pmvishwakarma.gov.in/Home/TradeList',
    applyMethod: 'Register online at any CSC (Common Service Center) or Aaple Sarkar Center with biometric authentication.'
  },
  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi (Street Vendor’s AtmaNirbhar Nidhi)',
    shortName: 'PM SVANidhi',
    level: 'CENTRAL',
    category: 'URBAN LIVELIHOOD',
    categoryIcon: '🛒',
    categoryMr: 'फेरीवाले व छोटे विक्रेते कर्ज',
    categoryHi: 'स्ट्रीट वेंडर आत्मनिर्भर निधि',
    amount: 'Collateral-free working capital loan up to ₹50,000 + 7% interest subsidy',
    amountHi: '₹50,000 तक बिना गारंटी का ऋण + 7% ब्याज सब्सिडी',
    amountMr: '₹५०,००० पर्यंत विनातारण खेळते भांडवल कर्ज + ७% व्याज परतावा',
    benefitDetail: '1st tranche loan of ₹10,000 (repayable in 1 yr); on timely repayment, 2nd tranche of ₹20,000, and 3rd tranche of ₹50,000, plus ₹1,200/yr cashback on digital transactions.',
    benefitDetailHi: 'पहला लोन ₹10,000; समय पर चुकाने पर दूसरा ₹20,000 और तीसरा ₹50,000; साथ ही डिजिटल लेन-देन पर ₹1,200 का सालाना कैशबैक।',
    benefitDetailMr: 'पहिला हप्ता ₹१०,०००; वेळेवर परतफेडीवर दुसरा हप्ता ₹२०,००० आणि तिसरा ₹५०,०००; तसेच डिजिटल व्यवहारांवर वर्षाला ₹१,२०० पर्यंत कॅशबॅक.',
    summary: 'Affordable working capital loans to street vendors, hawkers, and roadside stalls.',
    summaryHi: 'रेहड़ी-पटरी, ठेला लगाने वाले और फुटपाथ के छोटे दुकानदारों के लिए आसान व्यवसाय ऋण।',
    summaryMr: 'शहरी व निमशहरी भागातील हातगाडी, भाजीपाला, फळे व छोटे स्टॉल चालवणाऱ्या फेरीवाल्यांसाठी खेळते भांडवल कर्ज.',
    rule: (facts) => {
      const isVendor = facts.familyType === 'vendor' || facts.vendor === true || facts.smallBusiness === true;
      return Boolean(isVendor && facts.governmentEmployee !== true);
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      matched.push({ en: 'Street vendor, hawker, or small stall operator in urban/semi-urban area', mr: 'शहरी/ग्रामीण भागातील फेरीवाला किंवा लहान व्यावसायिक', hi: 'शहरी/कस्बाई क्षेत्र में रेहड़ी, पटरी या ठेला संचालक' });

      const isEligible = true;
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Street vendor vending in urban or surrounding rural areas.',
      'Possesses Certificate of Vending (CoV) / Identity Card issued by Urban Local Body, OR Letter of Recommendation (LoR).',
      'No collateral or security needed.'
    ],
    checksHi: [
      'शहरी अथवा आसपास के ग्रामीण क्षेत्र में रेहड़ी-पटरी या ठेला लगाने वाले विक्रेता।',
      'नगर पालिका/निगम द्वारा जारी वेंडिंग प्रमाण पत्र या पहचान पत्र, अथवा सिफ़ारिश पत्र (LoR)।',
      'किसी भी गारंटी या गिरवी की आवश्यकता नहीं।'
    ],
    checksMr: [
      'शहरी अथवा आसपासच्या भागात प्रत्यक्ष पथविक्री किंवा फेरीचा व्यवसाय.',
      'नगरपालिका/महानगरपालिकेचे फेरीवाला प्रमाणपत्र (CoV), ओळखपत्र किंवा शिफारस पत्र (LoR).',
      'कोणतेही तारण किंवा हमी देण्याची गरज नाही.'
    ],
    docs: [
      'Aadhaar card linked with mobile number',
      'Certificate of Vending (CoV) / Municipal ID / Letter of Recommendation (LoR)',
      'Bank Account Passbook',
      'UPI QR code / digital payment ID (for cashback)'
    ],
    docsHi: [
      'मोबाइल लिंक आधार कार्ड',
      'नगर निकाय से वेंडिंग प्रमाण पत्र / पहचान पत्र / अनुशंसा पत्र (LoR)',
      'बैंक पासबुक',
      'डिजिटल भुगतान हेतु यूपीआई आईडी'
    ],
    docsMr: [
      'मोबाईल संलग्न आधार कार्ड',
      'स्थानिक स्वराज्य संस्थेचे फेरीवाला प्रमाणपत्र / ओळखपत्र / शिफारस पत्र (LoR)',
      'बँक पासबुक',
      'डिजिटल कॅशबॅकसाठी यूपीआय क्यूआर कोड'
    ],
    source: 'Ministry of Housing and Urban Affairs (MoHUA), GoI',
    sourceLabel: 'PM SVANidhi Portal',
    url: 'https://pmsvanidhi.mohua.gov.in/',
    detailUrl: 'https://pmsvanidhi.mohua.gov.in/Home/Schemes',
    applyMethod: 'Apply online on pmsvanidhi.mohua.gov.in or visit nearby CSC center / Municipal Ward Office.'
  },
  {
    id: 'mahadbt-scholarship',
    name: 'MahaDBT Post-Matric Scholarship (SC/ST/OBC/VJNT/EBC)',
    shortName: 'MahaDBT Scholarship',
    level: 'MAHARASHTRA',
    category: 'STUDENTS & EDUCATION',
    categoryIcon: '🎓',
    categoryMr: 'विद्यार्थी शिष्यवृत्ती व शिक्षण फी माफी',
    categoryHi: 'विद्यार्थी छात्रवृत्ति व शुल्क प्रतिपूर्ति',
    amount: '100% Tuition & Exam Fee Waiver + Allowance',
    amountHi: '100% कॉलेज व परीक्षा शुल्क माफ़ी + भत्ता',
    amountMr: '१००% महाविद्यालयीन शिक्षण व परीक्षा फी माफी + निर्वाह भत्ता',
    benefitDetail: 'Full reimbursement of college tuition fees and exam fees paid directly to institute, plus monthly maintenance allowance into student’s bank account.',
    benefitDetailHi: 'कॉलेज ट्यूशन फ़ीस और परीक्षा शुल्क की शत-प्रतिशत प्रतिपूर्ति तथा छात्र के खाते में निर्वाह भत्ता।',
    benefitDetailMr: 'महाविद्यालयाची पूर्ण शिक्षण फी व परीक्षा फी शासनाकडून थेट कॉलेजला जमा, आणि विद्यार्थ्यांच्या खात्यात निर्वाह भत्ता.',
    summary: 'Higher education financial support for students pursuing Class 11, 12, Diploma, Degree, or Post-Graduation.',
    summaryHi: '11वीं, 12वीं, डिप्लोमा, डिग्री अथवा उच्च शिक्षा प्राप्त कर रहे छात्रों के लिए शुल्क प्रतिपूर्ति।',
    summaryMr: 'इयत्ता ११ वी, १२ वी, पदविका (Diploma), पदवी (Degree) व पदव्युत्तर शिक्षण घेणाऱ्या विद्यार्थ्यांसाठी शिष्यवृत्ती.',
    rule: (facts) => {
      const isStudent = facts.familyType === 'student' || facts.studentInFamily === true;
      const incomeOk = facts.annualIncome == null || facts.annualIncome <= 250000 || facts.bpl === true;
      return (
        facts.state === 'Maharashtra' &&
        isStudent &&
        incomeOk
      );
    },
    evaluator: (facts) => {
      const matched = [];
      const unmet = [];
      const missing = [];

      if (facts.state === 'Maharashtra') matched.push({ en: 'Maharashtra domicile student', mr: 'महाराष्ट्राचे अधिवास प्रमाणपत्र धारक विद्यार्थी', hi: 'महाराष्ट्र का अधिवास प्रमाण पत्र धारक छात्र' });
      else missing.push('state');

      if (facts.annualIncome && facts.annualIncome <= 250000) matched.push({ en: `Annual family income ₹${facts.annualIncome} is within ₹2.5 Lakh limit`, mr: `कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांच्या मर्यादेत आहे`, hi: `वार्षिक पारिवारिक आय ₹2.5 लाख की सीमा में है` });
      else if (facts.bpl === true) matched.push({ en: 'BPL family category eligible for full scholarship', mr: 'बीपीएल कुटुंब शिष्यवृत्तीस पूर्ण पात्र', hi: 'बीपीएल श्रेणी पूर्ण छात्रवृत्ति हेतु पात्र' });

      const isEligible = facts.state === 'Maharashtra' && (facts.annualIncome == null || facts.annualIncome <= 250000 || facts.bpl === true);
      return { isEligible, matched, unmet, missing };
    },
    checks: [
      'Student enrolled in recognised post-matric course (11th, 12th, ITI, Polytechnic, Degree, PG).',
      'Belongs to SC / ST / VJNT / OBC / SBC or Economically Backward Class (EBC).',
      'Annual family income under ₹2.5 Lakh (up to ₹8 Lakh for EBC tuition waiver).'
    ],
    checksHi: [
      'मान्यता प्राप्त कॉलेज में 11वीं, 12वीं, आईटीआई, डिग्री या पीजी पाठ्यक्रम में अध्ययनरत।',
      'एससी / एसटी / वीजेएनटी / ओबीसी / एसबीसी अथवा ईबीसी श्रेणी के छात्र।',
      'पारिवारिक वार्षिक आय ₹2.5 लाख (ईबीसी के लिए ₹8 लाख) के अंदर।'
    ],
    checksMr: [
      'मान्यताप्राप्त कनिष्ठ किंवा वरिष्ठ महाविद्यालयात (११ वी, १२ वी, आयटीआय, पदविका, पदवी किंवा पीजी) प्रवेशित.',
      'अनुसूचित जाती (SC), जमाती (ST), विमुक्त जाती-भटक्या जमाती (VJNT), इतर मागासवर्ग (OBC), किंवा ईबीसी प्रवर्गातील.',
      'कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपर्यंत (ईबीसी फी सवलतीसाठी ₹८ लाखांपर्यंत).'
    ],
    docs: [
      'Caste Certificate & Caste Validity Certificate (for reserved categories)',
      'Tahsildar Income Certificate (current financial year)',
      'Maharashtra Domicile Certificate',
      'Current Year College Admission Fee Receipt & Bonafide Certificate',
      'SSC (10th) & HSC Marksheet',
      'Student’s individual Aadhaar-linked Bank Passbook'
    ],
    docsHi: [
      'जाति प्रमाण पत्र एवं वैधता (Caste Validity)',
      'तहसीलदार सक्षम आय प्रमाण पत्र',
      'महाराष्ट्र अधिवास प्रमाण पत्र (Domicile)',
      'कॉलेज प्रवेश शुल्क रसीद एवं बोनाफाइड सर्टिफिकेट',
      '10वीं और 12वीं की अंकतालिका',
      'छात्र का आधार लिंक बैंक पासबुक'
    ],
    docsMr: [
      'सक्षम अधिकाऱ्यांचा जातीचा दाखला व जात पडताळणी प्रमाणपत्र (Validity)',
      'तहसीलदारांचा चालू आर्थिक वर्षातील उत्पन्नाचा दाखला',
      'अधिवास प्रमाणपत्र (Domicile Certificate)',
      'चालू शैक्षणिक वर्षाची कॉलेज फी पावती व बोनाफाईड प्रमाणपत्र',
      '१० वी, १२ वी व आधीच्या परीक्षांची गुणपत्रिका',
      'विद्यार्थ्याचे स्वतःचे आधार संलग्न बँक पासबुक'
    ],
    source: 'Social Justice & Tribal Development Department, Maharashtra',
    sourceLabel: 'MahaDBT Official Portal',
    url: 'https://mahadbt.maharashtra.gov.in/',
    detailUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?param=Y',
    applyMethod: 'Apply online on mahadbt.maharashtra.gov.in and submit hard copy of application with documents to college scholarship desk.'
  }
];
