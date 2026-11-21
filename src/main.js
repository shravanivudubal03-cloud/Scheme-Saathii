import { schemes } from '../data/schemes.js';
import { evaluateCatalog, evaluateScheme, factFields, matchSchemes } from './eligibility.js';

const words = {
  en:{tellMore:'Tell us a little about your situation first.',brandTag:'YOUR BENEFITS, WITH YOU',skip:'Skip to content',navDiscover:'Find schemes',navExplore:'Explore',navSaved:'Saved',navApplications:'My preparation',pilotLabel:'MAHARASHTRA PILOT · 6 VERIFIED SCHEMES',heroTitle:'The support you’re looking for<br /><em>could be closer than you think.</em>',heroSubtitle:'Tell us a little about your life. We’ll help you find schemes, understand the rules and prepare your next step.',heroPoint1:'Rules checked, never guessed',heroPoint2:'Every scheme links to its official source',trustRules:'Eligibility checked by clear rules',trustSources:'Official sources on every scheme',trustPrivate:'Your notes stay on this device',copilotLabel:'YOUR SCHEME COPILOT',storyTitle:'What’s your situation?',stepOne:'STEP 1 OF 2',storyIntro:'Write or speak naturally. A few details about your household can help us check the rules.',storyLabel:'Describe your situation',storyPlaceholder:'For example: We live in Maharashtra. I farm our family land, and my wife is 42. We have two daughters and an orange ration card…',speak:'Speak',privacyStory:'Your story is sent to Ollama for fact extraction. Never include Aadhaar or bank numbers.',tryExample:'Try:',exampleFarmer:'Farmer family',exampleGirl:'Daughter in school',exampleSenior:'Older parent',manualFallbackTitle:'Let’s keep going',manualFallbackText:'The language service isn’t connected right now. You can answer a few simple questions instead.',openQuestions:'Answer questions →',guidedAlternative:'I’d rather answer questions',checkSchemes:'Find my schemes',readingStory:'Understanding your story…',browseLabel:'EXPLORE A DIFFERENT WAY',momentsTitle:'Start with what matters to you',seeAll:'See all schemes',catFarming:'Farming',catFarmingHint:'Support for cultivators',catFamily:'Women & children',catFamilyHint:'Help for every new chapter',catSupport:'Monthly support',catSupportHint:'A little more certainty',catSenior:'For older adults',catSeniorHint:'Support for later life',catHealth:'Health cover',catHealthHint:'Care for older family',catEnergy:'Clean cooking',catEnergyHint:'A safer cooking option',scopeNote:'Scheme Saathi is a Maharashtra pilot. We currently cover a focused set of schemes; we’ll keep growing the verified catalogue.',browsePilot:'Browse the pilot →',exploreLabel:'THE VERIFIED CATALOGUE',exploreTitle:'Explore schemes',exploreSubtitle:'Browse the Maharashtra pilot catalogue. Each scheme includes its source, conditions and documents to prepare.',searchPlaceholder:'Search schemes or support…',filterAll:'All schemes',filterFarming:'Farming',filterFamily:'Women & children',filterSupport:'Monthly support',filterSenior:'Older adults',filterHealth:'Health cover',filterEnergy:'Clean cooking',catalogNote:'Information is a summary, not an application decision. Always check the department’s current instructions.',savedLabel:'YOUR SHORTLIST',savedTitle:'Saved schemes',savedSubtitle:'Keep the schemes that matter close at hand.',prepLabel:'ONE STEP AT A TIME',applicationsTitle:'Your preparation',applicationsSubtitle:'Collect documents, keep your notes and prepare a draft for your next visit.',prepBannerTitle:'Your information stays yours',prepBannerText:'Drafts are stored only in this browser. Nothing is submitted to a government office.',clearDrafts:'Clear drafts',footerDisclaimer:'A citizen guide, not a government office. Final eligibility is decided by the department.',howItWorks:'How it works',guidedEyebrow:'A FEW SIMPLE QUESTIONS',guidedTitle:'Let’s build your profile',guidedSubtitle:'Answer what you can. Skip anything you don’t know.',localOnly:'Saved in this browser only',reviewAnswers:'Review my answers →',guideLabel:'HOW SCHEME SAATHI WORKS',guideTitle:'A clear path, one step at a time.',guideStep1:'Tell us about your life',guideStep1Body:'Write, speak, or answer a few simple questions. You decide what to share.',guideStep2:'Check your details',guideStep2Body:'The language model extracts possible facts. You review and correct them before anything is matched.',guideStep3:'Prepare your next step',guideStep3Body:'A fixed rules engine checks scheme conditions. Save a scheme and print a preparation draft when ready.',guideNote:'This is a small, verified pilot. It gives guidance, not a government approval.',reviewLabel:'STEP 2 OF 2 · CHECK YOUR DETAILS',reviewTitle:'Does this look right?',reviewSubtitle:'We pulled out these details from what you said. Correct anything, and leave unknowns blank.',editStory:'Edit my story',applyRules:'Check scheme rules',eligibleHeading:'A possible match',needHeading:'Could fit — a little more to check',notConfirmed:'No confirmed match yet',noCandidates:'We couldn’t find a scheme match with these details.',noCandidatesHelp:'You can change your answers or explore the full pilot catalogue below.',missingPrefix:'To check this scheme, tell us:',matchesCount:'possible scheme matches',shownResults:'Showing schemes that fit your answers or need one more detail.',statusEligible:'CORE CONDITIONS MATCH',statusNeeds:'NEEDS DETAILS',statusNot:'DOES NOT MATCH',whyFits:'Why it may fit',needsInfo:'Still to confirm',documents:'Documents to gather',officialSource:'Official source',saveScheme:'Save',savedScheme:'Saved',prepare:'Prepare application',readResults:'Read aloud',printResults:'Print summary',detailsUpdated:'Answers updated',savedToast:'Saved to your shortlist',removedToast:'Removed from saved schemes',draftCreated:'Preparation draft created',emptySaved:'Your shortlist is empty',emptySavedText:'Save a scheme from the catalogue or your results to keep it here.',emptyApplications:'No preparation drafts yet',emptyApplicationsText:'Choose “Prepare application” on a scheme to start a local checklist and draft.',exploreSchemes:'Explore schemes',checkAgain:'Check my details',sourceUpdated:'Source reviewed',notSubmit:'This draft does not submit an application.',draftTitle:'Application preparation',draftStatus:'Local preparation draft',draftFormTitle:'Application details',applicantName:'Applicant name',district:'District',village:'Village / town',ageYears:'Age',incomeRupees:'Annual household income (₹)',schemeInterest:'Scheme',documentsDone:'Documents checklist',notesLabel:'Notes for your visit',notesPlaceholder:'Questions, office details, or next steps…',printDraft:'Print draft',deleteDraft:'Delete',progressLabel:'documents ready',progressOf:'of',confirmDeleteDraft:'Delete this local draft?',confirmClearDrafts:'Clear all local drafts?',draftDeleted:'Draft deleted',draftsCleared:'Drafts cleared',textSize:'Larger text',voiceUnavailable:'Voice input is not available in this browser.',voiceListening:'Listening… tap to stop',voiceAdded:'Voice input added',nothingToRead:'There are no scheme results to read yet.',factState:'State of residence',factAge:'Age of the person being checked',factFarmer:'Your family farms',factLand:'Agricultural land in family ownership',factIncome:'Annual household income (₹)',factBpl:'Household listed as BPL',factSupport:'Need support due to a qualifying condition',factGirl:'Girl child in the family',factGirlDate:'Girl born on or after 1 April 2023',factRation:'Yellow or orange ration card',factTax:'Any family member paid income tax',factGov:'Any family member is a government employee',factExclusion:'Any other PM-KISAN exclusion applies',factApplicantWoman:'Person applying is a woman',factLpg:'Someone in the household has an LPG connection',factPoorHousehold:'Household meets PMUY poor-household conditions',notSure:'Not sure',yes:'Yes',no:'No',maharashtra:'Maharashtra',otherState:'Another state',agePrompt:'Choose age range',incomePath:'BPL or annual income up to ₹21,000',girlIncome:'Annual household income up to ₹1,00,000',stateHint:'This catalogue currently covers Maharashtra only.',factsSaved:'Details ready to review',ruleCta:'Confirm details to see matches',filterResults:'Search and filters',noSearchResults:'No schemes found',noSearchHelp:'Try another word or choose a different category.',catalogueKicker:'VERIFIED SCHEMES',printDisclaimer:'This is a preparation summary, not an official application.',downloadJson:'Download my details',clearNotice:'This clears only locally stored drafts.',exampleFarmerText:'We live in Maharashtra. Our family farms and owns agricultural land. Nobody in my family pays income tax or works as a government employee.',exampleGirlText:'We live in Maharashtra. My daughter was born in May 2023. We have an orange ration card and our annual household income is ₹80,000.',exampleSeniorText:'My father is 68, lives in Maharashtra, and our household is on the BPL list.'},
  mr:{tellMore:'आधी तुमच्या परिस्थितीबद्दल थोडे सांगा.',brandTag:'तुमच्या लाभांसाठी तुमचा साथी',skip:'मुख्य मजकुराकडे जा',navDiscover:'योजना शोधा',navExplore:'योजना पाहा',navSaved:'जतन केलेल्या',navApplications:'माझी तयारी',pilotLabel:'महाराष्ट्र पायलट · ६ पडताळलेल्या योजना',heroTitle:'तुम्ही शोधत असलेली मदत<br /><em>तुमच्या जवळ असू शकते.</em>',heroSubtitle:'तुमच्या परिस्थितीबद्दल थोडे सांगा. योजना शोधणे, नियम समजून घेणे आणि पुढचे पाऊल तयार करणे यात आम्ही मदत करू.',heroPoint1:'नियमांनुसार तपासणी, अंदाज नाही',heroPoint2:'प्रत्येक योजनेसाठी अधिकृत स्रोत',trustRules:'पात्रतेची स्पष्ट नियमांनुसार तपासणी',trustSources:'प्रत्येक योजनेसाठी अधिकृत स्रोत',trustPrivate:'तुमच्या नोंदी या उपकरणातच राहतात',copilotLabel:'तुमचा योजना साथी',storyTitle:'तुमची परिस्थिती काय आहे?',stepOne:'टप्पा १ पैकी २',storyIntro:'तुमच्या भाषेत लिहा किंवा बोला. कुटुंबाबद्दलची थोडी माहिती नियम तपासण्यास मदत करू शकते.',storyLabel:'तुमच्या परिस्थितीबद्दल सांगा',storyPlaceholder:'उदाहरण: आम्ही महाराष्ट्रात राहतो. आमची शेतीची जमीन आहे. माझे वय ४२ आहे, दोन मुली आहेत आणि आमच्याकडे केशरी रेशन कार्ड आहे…',speak:'बोला',privacyStory:'माहिती काढण्यासाठी तुमची माहिती Ollama कडे पाठवली जाते. आधार किंवा बँक क्रमांक लिहू नका.',tryExample:'उदाहरणे:',exampleFarmer:'शेतकरी कुटुंब',exampleGirl:'शाळेत जाणारी मुलगी',exampleSenior:'वृद्ध पालक',manualFallbackTitle:'पुढे सुरू ठेवूया',manualFallbackText:'भाषा सेवा सध्या जोडलेली नाही. त्याऐवजी काही सोप्या प्रश्नांची उत्तरे द्या.',openQuestions:'प्रश्नांची उत्तरे द्या →',guidedAlternative:'मला प्रश्नांची उत्तरे द्यायची आहेत',checkSchemes:'माझ्या योजना शोधा',readingStory:'तुमची माहिती समजून घेत आहोत…',browseLabel:'दुसऱ्या पद्धतीने शोधा',momentsTitle:'तुमच्यासाठी महत्त्वाच्या गोष्टीपासून सुरू करा',seeAll:'सर्व योजना पाहा',catFarming:'शेती',catFarmingHint:'शेतकरी कुटुंबांसाठी सहाय्य',catFamily:'महिला व मुले',catFamilyHint:'नव्या टप्प्यासाठी मदत',catSupport:'मासिक सहाय्य',catSupportHint:'थोडी अधिक स्थिरता',catSenior:'ज्येष्ठ नागरिक',catSeniorHint:'वृद्धापकाळातील सहाय्य',catHealth:'आरोग्य संरक्षण',catHealthHint:'ज्येष्ठ कुटुंबीयांसाठी',catEnergy:'स्वच्छ स्वयंपाक',catEnergyHint:'सुरक्षित इंधन पर्याय',scopeNote:'योजना साथी हा महाराष्ट्र पायलट आहे. सध्या काही निवडक योजना समाविष्ट आहेत; पडताळलेला संग्रह वाढवत राहू.',browsePilot:'पायलटमधील योजना पाहा →',exploreLabel:'पडताळलेला योजना संग्रह',exploreTitle:'योजना शोधा',exploreSubtitle:'महाराष्ट्र पायलटमधील योजना पाहा. प्रत्येक योजनेसोबत स्रोत, अटी आणि कागदपत्रांची माहिती आहे.',searchPlaceholder:'योजना किंवा सहाय्य शोधा…',filterAll:'सर्व योजना',filterFarming:'शेती',filterFamily:'महिला व मुले',filterSupport:'मासिक सहाय्य',filterSenior:'ज्येष्ठ नागरिक',filterHealth:'आरोग्य संरक्षण',filterEnergy:'स्वच्छ स्वयंपाक',catalogNote:'ही माहिती सारांश आहे, अर्जाचा निर्णय नाही. विभागाच्या सध्याच्या सूचना तपासा.',savedLabel:'तुमची यादी',savedTitle:'जतन केलेल्या योजना',savedSubtitle:'महत्त्वाच्या योजना जवळ ठेवा.',prepLabel:'एकावेळी एक पाऊल',applicationsTitle:'तुमची तयारी',applicationsSubtitle:'कागदपत्रे जमा करा, नोंदी ठेवा आणि पुढच्या भेटीसाठी मसुदा तयार करा.',prepBannerTitle:'तुमची माहिती तुमच्याचकडे',prepBannerText:'मसुदे फक्त या ब्राउझरमध्ये साठवले जातात. कोणताही अर्ज सरकारी कार्यालयात पाठवला जात नाही.',clearDrafts:'मसुदे पुसा',footerDisclaimer:'नागरिकांसाठी मार्गदर्शन, सरकारी कार्यालय नाही. अंतिम पात्रता विभाग ठरवतो.',howItWorks:'कसे कार्य करते',guidedEyebrow:'काही सोपे प्रश्न',guidedTitle:'तुमची माहिती भरूया',guidedSubtitle:'जितके माहीत आहे ते सांगा. माहीत नसलेले सोडा.',localOnly:'फक्त या ब्राउझरमध्ये जतन',reviewAnswers:'माझी उत्तरे तपासा →',guideLabel:'योजना साथी कसे काम करते',guideTitle:'एकावेळी एक स्पष्ट पाऊल.',guideStep1:'तुमच्या परिस्थितीबद्दल सांगा',guideStep1Body:'लिहा, बोला किंवा काही सोप्या प्रश्नांची उत्तरे द्या. काय सांगायचे ते तुम्ही ठरवा.',guideStep2:'तुमची माहिती तपासा',guideStep2Body:'भाषा मॉडेल संभाव्य माहिती काढते. जुळवणीपूर्वी तुम्ही ती तपासून दुरुस्त करता.',guideStep3:'पुढचे पाऊल तयार करा',guideStep3Body:'निश्चित नियम इंजिन योजनेच्या अटी तपासते. योजना जतन करा आणि तयारीचा मसुदा छापा.',guideNote:'हा लहान पडताळलेला पायलट आहे. ही माहिती आहे, सरकारी मंजुरी नाही.',reviewLabel:'टप्पा २ पैकी २ · तुमची माहिती तपासा',reviewTitle:'ही माहिती बरोबर आहे का?',reviewSubtitle:'तुमच्या सांगितलेल्या माहितीमधून हे तपशील घेतले आहेत. दुरुस्त करा किंवा माहीत नसलेले रिकामे ठेवा.',editStory:'माहिती बदला',applyRules:'योजनेचे नियम तपासा',eligibleHeading:'संभाव्य जुळवणी',needHeading:'पात्र असू शकते — आणखी थोडी माहिती हवी',notConfirmed:'अजून जुळवणी निश्चित नाही',noCandidates:'या तपशीलांवर कोणतीही योजना निश्चित झाली नाही.',noCandidatesHelp:'उत्तरे बदलून पुन्हा पाहा किंवा पायलटमधील सर्व योजना शोधा.',missingPrefix:'ही योजना तपासण्यासाठी माहिती द्या:',matchesCount:'संभाव्य योजना',shownResults:'तुमच्या उत्तरांशी जुळणाऱ्या किंवा एका तपशीलाची गरज असलेल्या योजना.',statusEligible:'मुख्य अटी जुळल्या',statusNeeds:'माहिती हवी',statusNot:'जुळत नाही',whyFits:'का लागू होऊ शकते',needsInfo:'तपासायचे तपशील',documents:'जमवायची कागदपत्रे',officialSource:'अधिकृत स्रोत',saveScheme:'जतन करा',savedScheme:'जतन',prepare:'अर्जाची तयारी',readResults:'ऐकून घ्या',printResults:'सारांश छापा',detailsUpdated:'उत्तरे अद्ययावत झाली',savedToast:'योजना जतन केली',removedToast:'जतन केलेल्या यादीतून काढली',draftCreated:'तयारीचा मसुदा तयार',emptySaved:'तुमची जतन यादी रिकामी आहे',emptySavedText:'योजना जतन करून येथे ठेवा.',emptyApplications:'अजून तयारीचा मसुदा नाही',emptyApplicationsText:'योजनेवरील “अर्जाची तयारी” निवडून कागदपत्रांची यादी आणि मसुदा सुरू करा.',exploreSchemes:'योजना शोधा',checkAgain:'माहिती तपासा',sourceUpdated:'स्रोत तपासला',notSubmit:'या मसुद्याने अर्ज जमा होत नाही.',draftTitle:'अर्ज तयारी',draftStatus:'स्थानिक तयारीचा मसुदा',draftFormTitle:'अर्जाचे तपशील',applicantName:'अर्जदाराचे नाव',district:'जिल्हा',village:'गाव / शहर',ageYears:'वय',incomeRupees:'कुटुंबाचे वार्षिक उत्पन्न (₹)',schemeInterest:'योजना',documentsDone:'कागदपत्रांची यादी',notesLabel:'भेटीसाठी नोंदी',notesPlaceholder:'प्रश्न, कार्यालयाचा पत्ता किंवा पुढची पावले…',printDraft:'मसुदा छापा',deleteDraft:'पुसा',progressLabel:'कागदपत्रे तयार',progressOf:'पैकी',confirmDeleteDraft:'हा स्थानिक मसुदा पुसायचा?',confirmClearDrafts:'सर्व स्थानिक मसुदे पुसायचे?',draftDeleted:'मसुदा पुसला',draftsCleared:'मसुदे पुसले',textSize:'मोठा मजकूर',voiceUnavailable:'या ब्राउझरमध्ये आवाजाने माहिती देण्याची सुविधा नाही.',voiceListening:'ऐकत आहे… थांबवण्यासाठी पुन्हा दाबा',voiceAdded:'आवाजातील माहिती जोडली',nothingToRead:'वाचण्यासाठी योजना निकाल नाहीत.',factState:'राहण्याचे राज्य',factAge:'तपासत असलेल्या व्यक्तीचे वय',factFarmer:'तुमचे कुटुंब शेती करते',factLand:'शेतीची जमीन कुटुंबाच्या मालकीची',factIncome:'कुटुंबाचे वार्षिक उत्पन्न (₹)',factBpl:'कुटुंबाचे नाव BPL यादीत आहे',factSupport:'पात्र कारणामुळे सहाय्याची गरज',factGirl:'कुटुंबात मुलगी आहे',factGirlDate:'मुलीचा जन्म १ एप्रिल २०२३ रोजी किंवा नंतर',factRation:'पिवळे किंवा केशरी रेशन कार्ड',factTax:'कुटुंबातील कोणी आयकर भरला',factGov:'कुटुंबातील कोणी सरकारी कर्मचारी आहे',factExclusion:'PM-KISAN ची इतर अपात्रता लागू आहे',factApplicantWoman:'अर्ज करणारी व्यक्ती महिला आहे',factLpg:'कुटुंबात कोणाच्या नावावर LPG जोडणी आहे',factPoorHousehold:'कुटुंब PMUY गरीब-कुटुंबाच्या अटी पूर्ण करते',notSure:'माहित नाही',yes:'होय',no:'नाही',maharashtra:'महाराष्ट्र',otherState:'दुसरे राज्य',agePrompt:'वयोगट निवडा',incomePath:'BPL किंवा ₹२१,००० पर्यंत वार्षिक उत्पन्न',girlIncome:'वार्षिक उत्पन्न ₹१,००,००० पर्यंत',stateHint:'या संग्रहात सध्या महाराष्ट्रातील योजना आहेत.',factsSaved:'माहिती तपासायला तयार',ruleCta:'जुळवणी पाहण्यासाठी तपशील निश्चित करा',filterResults:'शोध आणि गाळणी',noSearchResults:'योजना सापडली नाही',noSearchHelp:'दुसरा शब्द वापरून पाहा किंवा दुसरा प्रकार निवडा.',catalogueKicker:'पडताळलेल्या योजना',printDisclaimer:'ही तयारीची माहिती आहे, अधिकृत अर्ज नाही.',downloadJson:'माझी माहिती डाउनलोड करा',clearNotice:'यामुळे फक्त या ब्राउझरमधील मसुदे पुसले जातील.',exampleFarmerText:'आम्ही महाराष्ट्रात राहतो. आमचे कुटुंब शेती करते आणि शेतीची जमीन आहे. कुटुंबात कोणी आयकर भरत नाही किंवा सरकारी कर्मचारी नाही.',exampleGirlText:'आम्ही महाराष्ट्रात राहतो. माझ्या मुलीचा जन्म मे २०२३ मध्ये झाला. आमच्याकडे केशरी रेशन कार्ड आहे आणि वार्षिक उत्पन्न ₹८०,००० आहे.',exampleSeniorText:'माझ्या वडिलांचे वय ६८ आहे. आम्ही महाराष्ट्रात राहतो आणि कुटुंबाचे नाव BPL यादीत आहे.'},
  hi:{tellMore:'पहले अपनी परिस्थिति के बारे में थोड़ा बताएँ।',brandTag:'आपके लाभ, आपका साथी',skip:'मुख्य सामग्री पर जाएँ',navDiscover:'योजनाएँ खोजें',navExplore:'योजनाएँ देखें',navSaved:'सहेजी योजनाएँ',navApplications:'मेरी तैयारी',pilotLabel:'महाराष्ट्र पायलट · ६ सत्यापित योजनाएँ',heroTitle:'जिस मदद की आप तलाश में हैं<br /><em>वह आपके क़रीब हो सकती है।</em>',heroSubtitle:'अपनी परिस्थिति के बारे में थोड़ा बताएँ। योजनाएँ खोजने, नियम समझने और अगला कदम तैयार करने में हम मदद करेंगे।',heroPoint1:'नियम जाँचे जाते हैं, अनुमान नहीं',heroPoint2:'हर योजना के साथ आधिकारिक स्रोत',trustRules:'स्पष्ट नियमों से पात्रता जाँच',trustSources:'हर योजना का आधिकारिक स्रोत',trustPrivate:'आपकी जानकारी इसी डिवाइस पर',copilotLabel:'आपका योजना साथी',storyTitle:'आपकी परिस्थिति क्या है?',stepOne:'चरण १ में से २',storyIntro:'अपनी भाषा में लिखें या बोलें। परिवार की थोड़ी जानकारी से नियम जाँचने में मदद मिल सकती है।',storyLabel:'अपनी परिस्थिति बताएँ',storyPlaceholder:'उदाहरण: हम महाराष्ट्र में रहते हैं। हमारा परिवार खेती करता है, पत्नी की उम्र ४२ है और हमारे पास नारंगी राशन कार्ड है…',speak:'बोलें',privacyStory:'जानकारी निकालने के लिए आपकी बात Ollama को भेजी जाती है। आधार या बैंक नंबर न लिखें।',tryExample:'उदाहरण:',exampleFarmer:'किसान परिवार',exampleGirl:'स्कूल जाती बेटी',exampleSenior:'बुज़ुर्ग माता-पिता',manualFallbackTitle:'आगे बढ़ते हैं',manualFallbackText:'भाषा सेवा अभी जुड़ी नहीं है। इसके बदले कुछ आसान सवालों के जवाब दें।',openQuestions:'सवालों के जवाब दें →',guidedAlternative:'मैं सवालों के जवाब देना चाहूँगा',checkSchemes:'मेरी योजनाएँ खोजें',readingStory:'आपकी बात समझ रहे हैं…',browseLabel:'दूसरे तरीक़े से खोजें',momentsTitle:'अपने लिए ज़रूरी बात से शुरू करें',seeAll:'सभी योजनाएँ देखें',catFarming:'खेती',catFarmingHint:'किसान परिवारों के लिए सहायता',catFamily:'महिलाएँ और बच्चे',catFamilyHint:'हर नए पड़ाव में मदद',catSupport:'मासिक सहायता',catSupportHint:'थोड़ी और निश्चितता',catSenior:'बुज़ुर्ग नागरिक',catSeniorHint:'बढ़ती उम्र में सहायता',catHealth:'स्वास्थ्य कवच',catHealthHint:'बुज़ुर्ग परिजन के लिए',catEnergy:'स्वच्छ ईंधन',catEnergyHint:'खाना पकाने का सुरक्षित विकल्प',scopeNote:'योजना साथी महाराष्ट्र पायलट है। अभी कुछ चुनिंदा योजनाएँ शामिल हैं; सत्यापित सूची बढ़ाते रहेंगे।',browsePilot:'पायलट देखें →',exploreLabel:'सत्यापित योजना सूची',exploreTitle:'योजनाएँ खोजें',exploreSubtitle:'महाराष्ट्र पायलट की योजनाएँ देखें। हर योजना के साथ स्रोत, शर्तें और दस्तावेज़ दिए हैं।',searchPlaceholder:'योजना या सहायता खोजें…',filterAll:'सभी योजनाएँ',filterFarming:'खेती',filterFamily:'महिलाएँ और बच्चे',filterSupport:'मासिक सहायता',filterSenior:'बुज़ुर्ग नागरिक',filterHealth:'स्वास्थ्य कवच',filterEnergy:'स्वच्छ ईंधन',catalogNote:'यह सारांश है, आवेदन का निर्णय नहीं। विभाग के मौजूदा निर्देश ज़रूर देखें।',savedLabel:'आपकी सूची',savedTitle:'सहेजी योजनाएँ',savedSubtitle:'ज़रूरी योजनाएँ अपने पास रखें।',prepLabel:'एक बार में एक कदम',applicationsTitle:'आपकी तैयारी',applicationsSubtitle:'दस्तावेज़ जुटाएँ, नोट रखें और अगली मुलाकात के लिए मसौदा तैयार करें।',prepBannerTitle:'आपकी जानकारी आपकी है',prepBannerText:'मसौदे इसी ब्राउज़र में सहेजे जाते हैं। सरकारी कार्यालय को कुछ जमा नहीं होता।',clearDrafts:'मसौदे मिटाएँ',footerDisclaimer:'नागरिक मार्गदर्शिका, सरकारी कार्यालय नहीं। अंतिम पात्रता विभाग तय करता है।',howItWorks:'कैसे काम करता है',guidedEyebrow:'कुछ आसान सवाल',guidedTitle:'आपकी जानकारी भरें',guidedSubtitle:'जितना पता है बताएँ। जो नहीं पता, उसे छोड़ दें।',localOnly:'सिर्फ़ इसी ब्राउज़र में सहेजा गया',reviewAnswers:'मेरे जवाब देखें →',guideLabel:'योजना साथी कैसे काम करता है',guideTitle:'हर कदम साफ़ और आसान।',guideStep1:'अपनी परिस्थिति बताएँ',guideStep1Body:'लिखें, बोलें या आसान सवालों के जवाब दें। क्या बताना है, यह आप तय करें।',guideStep2:'अपनी जानकारी जाँचें',guideStep2Body:'भाषा मॉडल संभावित जानकारी निकालता है। मिलान से पहले आप उसे जाँचते और सुधारते हैं।',guideStep3:'अगला कदम तैयार करें',guideStep3Body:'निश्चित नियम इंजन योजना की शर्तें जाँचता है। योजना सहेजें और तैयारी का मसौदा छापें।',guideNote:'यह छोटा सत्यापित पायलट है। यह मार्गदर्शन है, सरकारी मंज़ूरी नहीं।',reviewLabel:'चरण २ में से २ · अपनी जानकारी जाँचें',reviewTitle:'क्या यह जानकारी सही है?',reviewSubtitle:'आपकी बात से ये जानकारी निकाली है। सुधार करें या जो पता नहीं उसे खाली छोड़ें।',editStory:'जानकारी बदलें',applyRules:'योजना के नियम जाँचें',eligibleHeading:'संभावित योजना',needHeading:'हो सकती है — एक बात और जाँचें',notConfirmed:'अभी पात्रता पक्की नहीं',noCandidates:'इन जानकारियों से कोई योजना पक्की नहीं हुई।',noCandidatesHelp:'जवाब बदलें या पायलट की पूरी सूची देखें।',missingPrefix:'इस योजना को जाँचने के लिए बताएँ:',matchesCount:'संभावित योजनाएँ',shownResults:'आपके जवाब से मेल खाती या एक और जानकारी माँगती योजनाएँ।',statusEligible:'मुख्य शर्तें मेल खाती हैं',statusNeeds:'जानकारी चाहिए',statusNot:'मेल नहीं खाती',whyFits:'आपके लिए क्यों हो सकती है',needsInfo:'अभी जाँचना है',documents:'जुटाने के दस्तावेज़',officialSource:'आधिकारिक स्रोत',saveScheme:'सहेजें',savedScheme:'सहेजी',prepare:'आवेदन की तैयारी',readResults:'सुनें',printResults:'सारांश छापें',detailsUpdated:'जवाब अपडेट हुए',savedToast:'सूची में सहेजा',removedToast:'सहेजी सूची से हटाया',draftCreated:'तैयारी का मसौदा बना',emptySaved:'आपकी सूची खाली है',emptySavedText:'योजना सहेजकर यहाँ रखें।',emptyApplications:'अभी कोई तैयारी मसौदा नहीं',emptyApplicationsText:'योजना में “आवेदन की तैयारी” चुनकर दस्तावेज़ सूची और मसौदा शुरू करें।',exploreSchemes:'योजनाएँ देखें',checkAgain:'मेरी जानकारी जाँचें',sourceUpdated:'स्रोत जाँचा गया',notSubmit:'यह मसौदा आवेदन जमा नहीं करता।',draftTitle:'आवेदन की तैयारी',draftStatus:'स्थानीय तैयारी मसौदा',draftFormTitle:'आवेदन की जानकारी',applicantName:'आवेदक का नाम',district:'ज़िला',village:'गाँव / शहर',ageYears:'उम्र',incomeRupees:'परिवार की सालाना आय (₹)',schemeInterest:'योजना',documentsDone:'दस्तावेज़ सूची',notesLabel:'मुलाक़ात के लिए नोट',notesPlaceholder:'सवाल, कार्यालय का पता या अगला कदम…',printDraft:'मसौदा छापें',deleteDraft:'मिटाएँ',progressLabel:'दस्तावेज़ तैयार',progressOf:'में से',confirmDeleteDraft:'यह स्थानीय मसौदा मिटाएँ?',confirmClearDrafts:'सभी स्थानीय मसौदे मिटाएँ?',draftDeleted:'मसौदा मिटाया',draftsCleared:'मसौदे मिटाए',textSize:'बड़ा अक्षर',voiceUnavailable:'इस ब्राउज़र में आवाज़ की सुविधा उपलब्ध नहीं।',voiceListening:'सुन रहे हैं… रोकने के लिए फिर दबाएँ',voiceAdded:'आवाज़ से जानकारी जुड़ी',nothingToRead:'सुनाने के लिए योजना के नतीजे नहीं हैं।',factState:'निवास का राज्य',factAge:'जिस व्यक्ति की पात्रता जाँच रहे हैं, उसकी उम्र',factFarmer:'आपका परिवार खेती करता है',factLand:'खेती की ज़मीन परिवार के नाम है',factIncome:'परिवार की सालाना आय (₹)',factBpl:'परिवार BPL सूची में है',factSupport:'किसी पात्र कारण से सहायता चाहिए',factGirl:'परिवार में बेटी है',factGirlDate:'बेटी का जन्म १ अप्रैल २०२३ या उसके बाद',factRation:'पीला या नारंगी राशन कार्ड',factTax:'परिवार के किसी सदस्य ने आयकर भरा',factGov:'परिवार का सदस्य सरकारी कर्मचारी है',factExclusion:'PM-KISAN की कोई दूसरी अपात्रता लागू है',factApplicantWoman:'आवेदन करने वाली व्यक्ति महिला हैं',factLpg:'परिवार में किसी के नाम LPG कनेक्शन है',factPoorHousehold:'परिवार PMUY की गरीब-परिवार शर्त पूरी करता है',notSure:'पता नहीं',yes:'हाँ',no:'नहीं',maharashtra:'महाराष्ट्र',otherState:'दूसरा राज्य',agePrompt:'उम्र चुनें',incomePath:'BPL या सालाना आय ₹२१,००० तक',girlIncome:'सालाना आय ₹१,००,००० तक',stateHint:'इस सूची में अभी महाराष्ट्र की योजनाएँ हैं।',factsSaved:'जानकारी जाँचने के लिए तैयार',ruleCta:'मिलान देखने के लिए जानकारी पक्की करें',filterResults:'खोज और फ़िल्टर',noSearchResults:'योजनाएँ नहीं मिलीं',noSearchHelp:'दूसरा शब्द या श्रेणी चुनकर देखें।',catalogueKicker:'सत्यापित योजनाएँ',printDisclaimer:'यह तैयारी सारांश है, आधिकारिक आवेदन नहीं।',downloadJson:'मेरी जानकारी डाउनलोड करें',clearNotice:'इससे इसी ब्राउज़र में सहेजे मसौदे मिटेंगे।',exampleFarmerText:'हम महाराष्ट्र में रहते हैं। हमारा परिवार खेती करता है और खेती की ज़मीन है। परिवार में कोई आयकर नहीं भरता या सरकारी कर्मचारी नहीं है।',exampleGirlText:'हम महाराष्ट्र में रहते हैं। मेरी बेटी का जन्म मई २०२३ में हुआ। हमारे पास नारंगी राशन कार्ड है और सालाना आय ₹८०,००० है।',exampleSeniorText:'मेरे पिता ६८ साल के हैं। हम महाराष्ट्र में रहते हैं और परिवार BPL सूची में है.'}
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const t = key => words[lang]?.[key] ?? words.en[key] ?? key;
const parseStore = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let lang = ['en','mr','hi'].includes(localStorage.getItem('ss-lang')) ? localStorage.getItem('ss-lang') : 'en';
let facts = null;
let evaluations = [];
let filterCategory = 'all';
let searchQuery = '';
let saved = new Set(parseStore('ss-saved', []));
let drafts = parseStore('ss-drafts', []);

const labels = {
  state:['factState','state'], applicantWoman:['factApplicantWoman','boolean'], lpgConnection:['factLpg','boolean'], poorHousehold:['factPoorHousehold','boolean'], age:['factAge','number'], farmer:['factFarmer','boolean'], landOwned:['factLand','boolean'], annualIncome:['factIncome','number'], bpl:['factBpl','boolean'], supportNeed:['factSupport','boolean'], hasGirlChild:['factGirl','boolean'], girlBornAfter2023:['factGirlDate','boolean'], rationCardEligible:['factRation','boolean'], incomeTaxPayer:['factTax','boolean'], governmentEmployee:['factGov','boolean'], otherPmKisanExclusion:['factExclusion','boolean']
};
const baseFacts = () => Object.fromEntries(factFields.map(key => [key, null]));
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const localized = (item, key) => item[`${key}${lang === 'hi' ? 'Hi' : lang === 'mr' ? 'Mr' : ''}`] || item[key] || '';
const schemeName = scheme => localized(scheme, 'name');
const schemeAmount = scheme => localized(scheme, 'amount');
const schemeSummary = scheme => localized(scheme, 'summary');
const schemeChecks = scheme => localized(scheme, 'checks') || scheme.checks;
const schemeDocs = scheme => localized(scheme, 'docs') || scheme.docs;
const categoryName = id => t(({farming:'catFarming',family:'catFamily',support:'catSupport',senior:'catSenior',health:'catHealth',energy:'catEnergy'})[id] || 'catSenior');
const labelName = key => t(labels[key]?.[0] || key);

function setLanguage(code) {
  lang = code;
  localStorage.setItem('ss-lang', code);
  document.documentElement.lang = code;
  $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('[data-lang]').forEach(button => { const selected = button.dataset.lang === lang; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); });
  $('#textSizeBtn').setAttribute('aria-label', t('textSize'));
  if ($('#story')) $('#charCount').textContent = `${$('#story').value.length.toLocaleString()} / 6,000`;
  if (facts) renderResults();
  renderSaved(); renderApplications(); renderCatalog(); renderCategoryFilters();
}

function openView(name) {
  $$('.view').forEach(view => { const active = view.id === `view-${name}`; view.classList.toggle('active-view', active); view.hidden = !active; });
  $$('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.view === name));
  if (name === 'explore') { renderCatalog(); renderCategoryFilters(); }
  if (name === 'saved') renderSaved();
  if (name === 'applications') renderApplications();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function buildFactFields(target, values = facts || baseFacts()) {
  target.innerHTML = factFields.map(key => {
    const [label, type] = labels[key]; const value = values[key];
    if (type === 'boolean') return `<label class="fact-field"><span>${t(label)}</span><select name="${key}" data-fact="${key}"><option value="" ${value == null ? 'selected' : ''}>${t('notSure')}</option><option value="true" ${value === true ? 'selected' : ''}>${t('yes')}</option><option value="false" ${value === false ? 'selected' : ''}>${t('no')}</option></select></label>`;
    if (key === 'state') return `<label class="fact-field"><span>${t(label)}</span><select name="state" data-fact="state"><option value="" ${value == null ? 'selected' : ''}>${t('notSure')}</option><option value="Maharashtra" ${value === 'Maharashtra' ? 'selected' : ''}>${t('maharashtra')}</option><option value="Other" ${value === 'Other' ? 'selected' : ''}>${t('otherState')}</option></select></label>`;
    const min = type === 'number' ? `min="0" ${key === 'age' ? 'max="120" step="1"' : 'step="1"'}` : '';
    return `<label class="fact-field"><span>${t(label)}</span><input name="${key}" data-fact="${key}" type="number" ${min} value="${value ?? ''}" placeholder="${t('notSure')}" /></label>`;
  }).join('');
}

function collectFacts(container) {
  const next = baseFacts();
  container.querySelectorAll('[data-fact]').forEach(input => {
    const key = input.dataset.fact;
    if (input.type === 'number') next[key] = input.value.trim() === '' ? null : Number(input.value);
    else if (key === 'state') next[key] = input.value === 'Maharashtra' ? 'Maharashtra' : input.value === 'Other' ? 'Other' : null;
    else next[key] = input.value === '' ? null : input.value === 'true';
  });
  return next;
}

function startReview(candidateFacts) {
  facts = { ...baseFacts(), ...candidateFacts };
  openView('results');
  renderResults();
}

function showGuided() {
  buildFactFields($('#guidedFields'), facts || baseFacts());
  $('#guidedDialog').showModal();
}

async function analyzeStory() {
  const story = $('#story').value.trim();
  if (!story) { $('#story').focus(); toast(t('tellMore')); return; }
  const button = $('#checkBtn'); button.disabled = true; $('#loadingMessage').classList.remove('hidden'); $('#ollamaNotice').classList.add('hidden');
  try {
    const response = await fetch('/api/extract', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ text:story, language:lang }) });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Ollama unavailable');
    if (!payload.facts || typeof payload.facts !== 'object') throw new Error('Invalid fact response');
    const clean = baseFacts();
    for (const key of factFields) {
      const value = payload.facts[key];
      if (key === 'age') clean[key] = Number.isInteger(value) && value >= 0 && value <= 120 ? value : null;
      else if (key === 'annualIncome') clean[key] = Number.isFinite(value) && value >= 0 ? value : null;
      else if (key === 'state') clean[key] = value === 'Maharashtra' ? value : null;
      else clean[key] = value === true || value === false ? value : null;
    }
    startReview(clean);
  } catch (error) {
    $('#ollamaNotice').classList.remove('hidden');
    $('#ollamaNotice').setAttribute('data-error', error.message || '');
    $('#ollamaNotice').scrollIntoView({ behavior:'smooth', block:'center' });
  } finally { button.disabled = false; $('#loadingMessage').classList.add('hidden'); }
}

function factValue(factKey) {
  if (factKey === 'incomePath') {
    if (facts.bpl === true) return true;
    if (Number.isFinite(facts.annualIncome) && facts.annualIncome <= 21000) return true;
    if (facts.bpl === false && Number.isFinite(facts.annualIncome) && facts.annualIncome > 21000) return false;
    return null;
  }
  return facts[factKey];
}

function formatMissing(key) {
  if (key === 'incomePath') return t('incomePath');
  if (key === 'annualIncome' && facts.annualIncome == null) return t('girlIncome');
  return labelName(key);
}

function renderSchemeCard(scheme, evaluation, mode = 'catalog') {
  const isSaved = saved.has(scheme.id);
  const status = evaluation?.status;
  const eligible = status === 'eligible';
  const needs = status === 'needs-info';
  const statusHtml = !evaluation ? `<div class="eligibility-state"><span class="state-mark">i</span><span>${t('ruleCta')}</span></div>` : eligible ? `<div class="eligibility-state match"><span class="state-mark">✓</span><span>${t('statusEligible')}</span></div>` : needs ? `<div class="eligibility-state partial"><span class="state-mark">◷</span><span>${t('missingPrefix')} ${evaluation.missing.map(formatMissing).join(' · ')}</span></div>` : '';
  const docList = schemeDocs(scheme);
  const why = eligible ? `<ul class="why-list">${schemeChecks(scheme).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul><p class="scheme-caveat">${escapeHtml(scheme.note || t('footerDisclaimer'))}</p>` : '';
  const buttonDraft = mode === 'result' ? `<button class="small-button primary-small" data-draft="${scheme.id}">${t('prepare')} →</button>` : '';
  return `<article class="scheme-card" data-scheme-card="${scheme.id}">
    <div class="scheme-card-top"><span class="scheme-icon" aria-hidden="true">${scheme.categoryIcon}</span><div class="scheme-card-meta"><span class="category-label">${escapeHtml(categoryName(scheme.categoryId))}</span><h3>${escapeHtml(schemeName(scheme))}</h3></div><button class="scheme-save ${isSaved ? 'is-saved' : ''}" data-save="${scheme.id}" aria-label="${isSaved ? t('savedScheme') : t('saveScheme')}">${isSaved ? '♥' : '♡'}</button></div>
    <div class="benefit-line"><span class="benefit-value">${escapeHtml(schemeAmount(scheme))}</span><span class="benefit-hint">${escapeHtml(schemeSummary(scheme).split('.')[0])}</span></div>
    <p class="scheme-summary">${escapeHtml(schemeSummary(scheme))}</p>
    ${statusHtml}
    ${why ? `<div class="why-block"><strong>${t('whyFits')}</strong>${why}</div>` : ''}
    <div class="doc-preview"><strong>${t('documents')}</strong><div class="doc-chips">${docList.map(doc => `<span class="doc-chip">${escapeHtml(doc)}</span>`).join('')}</div></div>
    <div class="scheme-card-footer"><a class="official-link" href="${scheme.url}" target="_blank" rel="noopener noreferrer">${t('officialSource')}: ${escapeHtml(scheme.sourceLabel)} <span>↗</span></a><div class="card-actions">${buttonDraft}<button class="small-button" data-save-text="${scheme.id}">${isSaved ? t('savedScheme') : t('saveScheme')}</button></div></div>
  </article>`;
}

function bindSchemeActions(root) {
  root.querySelectorAll('[data-save],[data-save-text]').forEach(button => button.addEventListener('click', () => toggleSaved(button.dataset.save || button.dataset.saveText)));
  root.querySelectorAll('[data-draft]').forEach(button => button.addEventListener('click', () => createDraft(button.dataset.draft)));
}

function toggleSaved(id) {
  if (saved.has(id)) { saved.delete(id); toast(t('removedToast')); }
  else { saved.add(id); toast(t('savedToast')); }
  localStorage.setItem('ss-saved', JSON.stringify([...saved]));
  $('#savedCount').textContent = saved.size;
  renderCatalog(); renderSaved();
  if (facts) renderResults();
}

function renderReviewFields() {
  const box = document.createElement('div'); box.className = 'facts-grid'; buildFactFields(box, facts); return box.innerHTML;
}

function renderResults() {
  if (!facts) return;
  evaluations = evaluateCatalog(facts);
  const candidates = evaluations.filter(result => result.status === 'eligible' || result.status === 'needs-info');
  const confirmed = candidates.filter(result => result.status === 'eligible');
  const needs = candidates.filter(result => result.status === 'needs-info');
  const empty = `<div class="result-empty"><strong>${t('noCandidates')}</strong>${t('noCandidatesHelp')} <button class="text-button" data-go="explore">${t('exploreSchemes')} →</button></div>`;
  $('#resultsContent').innerHTML = `<div class="results-hero"><div><span class="section-label">${t('reviewLabel')}</span><h1>${confirmed.length ? `${confirmed.length} ${t('matchesCount')}` : t('notConfirmed')}</h1><p>${t('shownResults')}</p></div><div class="results-toolbar"><button class="secondary-button" id="readResultsBtn">◖ ${t('readResults')}</button><button class="secondary-button" id="printResultsBtn">▤ ${t('printResults')}</button><button class="secondary-button" id="downloadFactsBtn">↓ ${t('downloadJson')}</button></div></div>
    <section class="review-panel" aria-labelledby="reviewDetailsTitle"><div class="review-panel-head"><div><h2 id="reviewDetailsTitle">${t('reviewTitle')}</h2><p>${t('reviewSubtitle')}</p></div><button class="text-button" id="editStoryBtn">${t('editStory')}</button></div><div id="resultFacts" class="facts-grid">${renderReviewFields()}</div><div class="review-actions"><button id="updateResultsBtn" class="primary-button">${t('applyRules')} <span class="button-arrow">→</span></button></div></section>
    <div class="result-columns"><section><h2 class="column-heading"><span>✓</span>${t('eligibleHeading')} (${confirmed.length})</h2>${confirmed.length ? `<div class="catalog-grid single">${confirmed.map(result => renderSchemeCard(result.scheme, result, 'result')).join('')}</div>` : empty}</section><section><h2 class="column-heading needs"><span>◷</span>${t('needHeading')} (${needs.length})</h2>${needs.length ? `<div class="catalog-grid single">${needs.map(result => renderSchemeCard(result.scheme, result, 'result')).join('')}</div>` : `<div class="result-empty"><strong>${t('noSearchResults')}</strong>${t('ruleCta')}</div>`}</section></div><p class="disclaimer">${t('footerDisclaimer')} ${t('catalogNote')}</p>`;
  bindSchemeActions($('#resultsContent'));
  $('#updateResultsBtn').onclick = () => { facts = collectFacts($('#resultFacts')); renderResults(); toast(t('detailsUpdated')); };
  $('#editStoryBtn').onclick = () => { openView('discover'); $('#story').focus(); };
  $('#readResultsBtn').onclick = readAloud;
  $('#printResultsBtn').onclick = () => window.print();
  $('#downloadFactsBtn').onclick = downloadFacts;
  $('#resultsContent').querySelector('[data-go="explore"]')?.addEventListener('click', () => openView('explore'));
}

function readAloud() {
  if (!('speechSynthesis' in window)) { toast(t('voiceUnavailable')); return; }
  const confirmed = evaluations.filter(item => item.status === 'eligible');
  if (!confirmed.length) { toast(t('nothingToRead')); return; }
  const text = confirmed.map(({scheme}) => `${schemeName(scheme)}. ${schemeSummary(scheme)}. ${t('whyFits')}: ${schemeChecks(scheme).join('. ')}. ${t('documents')}: ${schemeDocs(scheme).join(', ')}`).join('. ');
  window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'; utterance.rate = .87; window.speechSynthesis.speak(utterance);
}

function renderCategoryFilters() {
  const target = $('#categoryFilters'); if (!target) return;
  const options = [['all','filterAll'],['farming','filterFarming'],['family','filterFamily'],['support','filterSupport'],['senior','filterSenior'],['health','filterHealth'],['energy','filterEnergy']];
  target.innerHTML = options.map(([id,label]) => `<button class="filter-chip ${filterCategory === id ? 'active' : ''}" data-filter="${id}" aria-pressed="${filterCategory === id}">${t(label)}</button>`).join('');
  target.querySelectorAll('[data-filter]').forEach(button => button.onclick = () => { filterCategory = button.dataset.filter; renderCategoryFilters(); renderCatalog(); });
}

function renderCatalog() {
  const grid = $('#catalogGrid'); if (!grid) return;
  const matches = schemes.filter(scheme => {
    const categoryMatches = filterCategory === 'all' || scheme.categoryId === filterCategory;
    const haystack = `${scheme.name} ${scheme.shortName} ${scheme.category} ${scheme.summary} ${scheme.summaryHi || ''} ${scheme.summaryMr || ''}`.toLocaleLowerCase();
    return categoryMatches && haystack.includes(searchQuery.toLocaleLowerCase());
  });
  grid.innerHTML = matches.length ? matches.map(scheme => renderSchemeCard(scheme, facts ? evaluateScheme(scheme, facts) : null)).join('') : `<div class="no-results"><strong>${t('noSearchResults')}</strong><br />${t('noSearchHelp')}</div>`;
  bindSchemeActions(grid);
}

function renderSaved() {
  const target = $('#savedGrid'); if (!target) return;
  const savedSchemes = schemes.filter(scheme => saved.has(scheme.id));
  target.innerHTML = savedSchemes.length ? savedSchemes.map(scheme => renderSchemeCard(scheme, facts ? evaluateScheme(scheme, facts) : null)).join('') : `<div class="saved-empty"><span class="empty-heart">♡</span><strong>${t('emptySaved')}</strong><p>${t('emptySavedText')}</p><button class="text-button" data-go="explore">${t('exploreSchemes')} →</button></div>`;
  bindSchemeActions(target); target.querySelector('[data-go="explore"]')?.addEventListener('click', () => openView('explore'));
}

function createDraft(schemeId) {
  if (!drafts.some(draft => draft.schemeId === schemeId)) {
    drafts.unshift({ id:crypto.randomUUID(), schemeId, checked:[], applicant:'', district:'', village:'', notes:'', profile:{ age:facts?.age ?? null, annualIncome:facts?.annualIncome ?? null, state:facts?.state ?? null }, created:new Date().toISOString() });
    localStorage.setItem('ss-drafts', JSON.stringify(drafts));
  }
  toast(t('draftCreated')); openView('applications');
}

function renderApplications() {
  const target = $('#applicationList'); if (!target) return;
  if (!drafts.length) { target.innerHTML = `<div class="saved-empty"><span class="empty-heart">▤</span><strong>${t('emptyApplications')}</strong><p>${t('emptyApplicationsText')}</p><button class="text-button" data-go="explore">${t('exploreSchemes')} →</button></div>`; target.querySelector('[data-go]')?.addEventListener('click', () => openView('explore')); return; }
  target.innerHTML = drafts.map(draft => {
    const scheme = schemes.find(item => item.id === draft.schemeId); if (!scheme) return '';
    const docs = schemeDocs(scheme); const checked = new Set(draft.checked || []); const percent = docs.length ? Math.round(checked.size / docs.length * 100) : 0;
    const profile = draft.profile || {};
    return `<article class="draft-card" data-card="${draft.id}"><div class="draft-header"><div><span class="category-label">${escapeHtml(categoryName(scheme.categoryId))} · ${t('draftStatus')}</span><h2>${escapeHtml(schemeName(scheme))}</h2><p>${t('notSubmit')} <a class="official-link" href="${scheme.url}" target="_blank" rel="noopener noreferrer">${t('officialSource')} ↗</a></p></div><div class="draft-controls"><button class="small-button" data-print="${draft.id}">▤ ${t('printDraft')}</button><button class="small-button" data-delete="${draft.id}">${t('deleteDraft')}</button></div></div><div class="draft-divider"></div><div class="draft-body"><div><div class="draft-section-title">${t('documentsDone')}</div><div class="draft-checklist">${docs.map((doc,index) => `<label><input type="checkbox" data-check="${index}" ${checked.has(index) ? 'checked' : ''} /> ${escapeHtml(doc)}</label>`).join('')}</div><div class="draft-progress">${t('progressLabel')}: ${checked.size} ${t('progressOf')} ${docs.length}</div><div class="draft-progress-track"><span style="width:${percent}%"></span></div></div><div><div class="draft-section-title">${t('draftFormTitle')}</div><div class="draft-form"><label>${t('applicantName')}<input data-draft-field="applicant" value="${escapeHtml(draft.applicant)}" autocomplete="name" /></label><label>${t('district')}<input data-draft-field="district" value="${escapeHtml(draft.district)}" /></label><label>${t('village')}<input data-draft-field="village" value="${escapeHtml(draft.village)}" /></label><label>${t('ageYears')}<input data-draft-field="age" type="number" min="0" max="120" value="${profile.age ?? ''}" /></label><label>${t('incomeRupees')}<input data-draft-field="annualIncome" type="number" min="0" value="${profile.annualIncome ?? ''}" /></label><label>${t('schemeInterest')}<input value="${escapeHtml(schemeName(scheme))}" readonly /></label><label class="notes-field">${t('notesLabel')}<textarea data-draft-field="notes" placeholder="${t('notesPlaceholder')}">${escapeHtml(draft.notes)}</textarea></label></div></div></div><p class="draft-note">${t('localOnly')} · ${t('printDisclaimer')}</p></article>`;
  }).join('');
  target.querySelectorAll('.draft-card').forEach(card => {
    const draft = drafts.find(item => item.id === card.dataset.card);
    card.querySelectorAll('[data-check]').forEach(input => input.onchange = () => { const i = Number(input.dataset.check); draft.checked = input.checked ? [...new Set([...draft.checked, i])] : draft.checked.filter(index => index !== i); persistDrafts(); renderApplications(); });
    card.querySelectorAll('[data-draft-field]').forEach(input => input.oninput = () => { const key = input.dataset.draftField; if (key === 'age' || key === 'annualIncome') draft.profile[key] = input.value === '' ? null : Number(input.value); else draft[key] = input.value; persistDrafts(); });
    card.querySelector('[data-print]').onclick = () => { $$('.draft-card').forEach(item => item.classList.remove('print-target')); card.classList.add('print-target'); window.print(); card.classList.remove('print-target'); };
    card.querySelector('[data-delete]').onclick = () => { if (!confirm(t('confirmDeleteDraft'))) return; drafts = drafts.filter(item => item.id !== draft.id); persistDrafts(); renderApplications(); toast(t('draftDeleted')); };
  });
}

function persistDrafts() { localStorage.setItem('ss-drafts', JSON.stringify(drafts)); }
function downloadFacts() {
  const blob = new Blob([JSON.stringify({ language:lang, reviewedAt:new Date().toISOString(), facts }, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'scheme-saathi-profile.json'; anchor.click(); URL.revokeObjectURL(url);
}

function initVoice() {
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Speech) { toast(t('voiceUnavailable')); return; }
  if (window._ssRecognition) { window._ssRecognition.stop(); return; }
  const recognition = new Speech(); recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'; recognition.interimResults = false; recognition.maxAlternatives = 1;
  recognition.onresult = event => { $('#story').value = `${$('#story').value}${$('#story').value ? ' ' : ''}${event.results[0][0].transcript}`; $('#charCount').textContent = `${$('#story').value.length.toLocaleString()} / 6,000`; toast(t('voiceAdded')); };
  recognition.onerror = () => toast(t('voiceUnavailable'));
  recognition.onend = () => { $('#micBtn').classList.remove('recording'); $('#micBtn').querySelector('span').textContent = t('speak'); window._ssRecognition = null; };
  window._ssRecognition = recognition; $('#micBtn').classList.add('recording'); $('#micBtn').querySelector('span').textContent = t('voiceListening'); recognition.start();
}

$$('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
$$('.nav-link').forEach(button => button.addEventListener('click', () => openView(button.dataset.view)));
$$('[data-view-link]').forEach(button => button.addEventListener('click', event => { event.preventDefault(); openView(button.dataset.viewLink); }));
$$('[data-go]').forEach(button => button.addEventListener('click', () => openView(button.dataset.go)));
$$('.moment-card').forEach(button => button.addEventListener('click', () => { filterCategory = button.dataset.category; openView('explore'); renderCategoryFilters(); renderCatalog(); }));
$$('.example-chip').forEach(button => button.addEventListener('click', () => { $('#story').value = t(`example${button.dataset.example[0].toUpperCase()}${button.dataset.example.slice(1)}Text`); $('#charCount').textContent = `${$('#story').value.length.toLocaleString()} / 6,000`; $('#story').focus(); }));
$('#story').addEventListener('input', () => { $('#charCount').textContent = `${$('#story').value.length.toLocaleString()} / 6,000`; });
$('#checkBtn').addEventListener('click', analyzeStory);
$('#micBtn').addEventListener('click', initVoice);
$('#openGuided').addEventListener('click', showGuided);
$('#openGuidedSecondary').addEventListener('click', showGuided);
$('#closeGuided').addEventListener('click', () => $('#guidedDialog').close());
$('#guidedForm').addEventListener('submit', event => { event.preventDefault(); facts = collectFacts($('#guidedFields')); $('#guidedDialog').close(); startReview(facts); });
$('#schemeSearch').addEventListener('input', event => { searchQuery = event.target.value.trim(); renderCatalog(); });
$('#textSizeBtn').addEventListener('click', () => { document.documentElement.classList.toggle('large-text'); localStorage.setItem('ss-large-text', document.documentElement.classList.contains('large-text') ? 'true' : 'false'); });
$('#clearDrafts').addEventListener('click', () => { if (!drafts.length) return; if (!confirm(t('confirmClearDrafts'))) return; drafts = []; persistDrafts(); renderApplications(); toast(t('draftsCleared')); });
$('#guideBtn').addEventListener('click', () => $('#guideDialog').showModal());
$('#closeGuide').addEventListener('click', () => $('#guideDialog').close());
$('#savedCount').textContent = saved.size;
if (localStorage.getItem('ss-large-text') === 'true') document.documentElement.classList.add('large-text');
setLanguage(lang); openView('discover'); renderCategoryFilters(); renderCatalog(); renderApplications();
