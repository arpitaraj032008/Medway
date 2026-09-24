import { Facility, PreventiveGuide, Appointment, PatientFeedback, HealthcareStatMetric } from '../types';

export const initialFacilities: Facility[] = [
  {
    id: "fac-1",
    name: "Kishorepur Primary Health Centre",
    nameHi: "किशोरपुर प्राथमिक स्वास्थ्य केंद्र",
    type: "PHC",
    typeLabelEn: "Primary Health Centre",
    typeLabelHi: "प्राथमिक स्वास्थ्य केंद्र",
    district: "Rampur Taluk",
    districtHi: "रामपुर प्रखण्ड",
    block: "Rampur Sector 3",
    blockHi: "रामपुर सेक्टर 3",
    village: "Kishorepur",
    villageHi: "किशोरपुर",
    address: "Kishorepur Main Road, Sector 3",
    addressHi: "किशोरपुर मुख्य मार्ग, सेक्टर 3",
    distanceKm: 3.2,
    travelTimeMin: 12,
    phone: "+91 98765 43210",
    operatingHours: "Open 24 Hours (२४ घंटे उपलब्ध)",
    operatingHoursHi: "२४ घंटे उपलब्ध (Open 24 Hours)",
    openStatusTag: "Open 24 Hours (२४ घंटे उपलब्ध)",
    openStatusTagHi: "२४ घंटे उपलब्ध",
    openStatusType: "green",
    accessTag: "Paved Access",
    accessTagHi: "पक्की सड़क",
    avgWait: "Avg wait: < 15 mins",
    doctorOnDuty: "Dr. Ananya Sharma, MBBS",
    doctorOnDutyHi: "डॉ. अनन्या शर्मा, एमबीबीएस",
    doctorSpecialty: "Medical Officer In-Charge (स्त्री एवं सामान्य रोग)",
    doctorSpecialtyHi: "प्रभारी चिकित्सा अधिकारी (स्त्री एवं सामान्य रोग)",
    doctorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
    doctorShift: "Shift: 08:00 - 20:00",
    nurseOnDuty: "Staff Nurse Anita & Sunita",
    nurseOnDutyHi: "स्टाफ नर्स अनीता व सुनीता",
    bedsAvailable: 4,
    totalBeds: 6,
    medicineStockStatus: "Adequate",
    medicineStockStatusHi: "पर्याप्त",
    services: [
      "Maternal Care (प्रसूति सेवा)",
      "Routine Immunization",
      "Tele-ECG Direct",
      "Free Generic Pharmacy"
    ],
    servicesHi: [
      "मातृ देखभाल (प्रसूति सेवा)",
      "नियमित टीकाकरण",
      "टेली-ईसीजी डायरेक्ट",
      "निःशुल्क जेनेरिक फार्मेसी"
    ],
    ambulanceAvailable: true,
    emergency24x7: true,
    teleconsultationAvailable: true,
    snakebiteAntivenom: true,
    coordinates: {
      lat: 27.562,
      lng: 80.681,
      mapX: 42,
      mapY: 38,
    },
    directionsGuideEn: "Take Kishorepur Main Road past the gram panchayat office towards Sector 3. All-weather paved road with clear hospital signage.",
    directionsGuideHi: "ग्राम पंचायत कार्यालय से आगे किशोरपुर मुख्य मार्ग लें। सभी मौसमों में चलने योग्य पक्की सड़क।",
  },
  {
    id: "fac-2",
    name: "Bhimtal Community Health Centre (CHC)",
    nameHi: "भीमताल सामुदायिक स्वास्थ्य केंद्र (CHC)",
    type: "CHC",
    typeLabelEn: "Community Health Centre",
    typeLabelHi: "सामुदायिक स्वास्थ्य केंद्र",
    district: "Rampur Taluk",
    districtHi: "रामपुर प्रखण्ड",
    block: "Bhimtal Highway Circle",
    blockHi: "भीमताल हाईवे सर्कल",
    village: "Bhimtal Town",
    villageHi: "भीमताल कस्बा",
    address: "State Highway 14, Near Post Office",
    addressHi: "स्टेट हाईवे 14, डाकघर के पास",
    distanceKm: 8.5,
    travelTimeMin: 22,
    phone: "+91 94120 01108",
    operatingHours: "Emergency 24x7 (आपातकाल खुला)",
    operatingHoursHi: "आपातकाल 24x7 खुला",
    openStatusTag: "Emergency 24x7 (आपातकाल खुला)",
    openStatusTagHi: "आपातकाल 24x7 खुला",
    openStatusType: "red",
    accessTag: "30 Inpatient Beds",
    accessTagHi: "30 इनपेशेंट बिस्तर",
    avgWait: "12 Beds Currently Vacant",
    doctorOnDuty: "Dr. V. K. Verma (General Surgeon) & Dr. Neha (Pediatrician)",
    doctorOnDutyHi: "डॉ. वी. के. वर्मा व डॉ. नेहा (बाल रोग विशेषज्ञ)",
    nurseOnDuty: "Senior Staff Nurse Team (24x7 Coverage)",
    nurseOnDutyHi: "वरिष्ठ नर्सिंग टीम",
    bedsAvailable: 12,
    totalBeds: 30,
    medicineStockStatus: "Adequate",
    medicineStockStatusHi: "पर्याप्त",
    specialFeatures: [
      { title: "In-house Ambulance", subtitle: "Standby Vehicle On Premise", icon: "ambulance" },
      { title: "Ultrasound (सोनोग्राफी)", subtitle: "Every Tue & Thu (विशेषज्ञ)", icon: "ultrasound" },
      { title: "Blood Storage Unit", subtitle: "O+ / B+ Available", icon: "blood" }
    ],
    services: [
      "In-house Ambulance Standby",
      "Ultrasound (सोनोग्राफी)",
      "Blood Storage Unit (O+ / B+)",
      "Surgical Inpatient Ward",
      "24x7 Emergency Trauma"
    ],
    servicesHi: [
      "इन-हाउस एम्बुलेंस स्टैंडबाय",
      "अल्ट्रासाउंड (सोनोग्राफी)",
      "रक्त भंडारण इकाई",
      "शल्य चिकित्सा वार्ड",
      "24x7 आपातकालीन ट्रॉमा"
    ],
    ambulanceAvailable: true,
    emergency24x7: true,
    teleconsultationAvailable: true,
    snakebiteAntivenom: true,
    coordinates: {
      lat: 27.604,
      lng: 80.742,
      mapX: 68,
      mapY: 26,
    },
    directionsGuideEn: "Directly on State Highway 14, 200m before the old post office junction. Dedicated ambulance lane open round the clock.",
    directionsGuideHi: "स्टेट हाईवे 14 पर पुराने डाकघर मोड़ से 200 मीटर पहले। 24 घंटे एम्बुलेंस लेन खुली है।",
  },
  {
    id: "fac-3",
    name: "Gopalganj Health & Wellness Sub-Centre",
    nameHi: "गोपालगंज स्वास्थ्य एवं कल्याण उप-केंद्र",
    type: "SC",
    typeLabelEn: "Sub-Centre (Ayushman Arogya Mandir)",
    typeLabelHi: "उप-केंद्र (आयुष्मान आरोग्य मंदिर)",
    district: "Rampur Taluk",
    districtHi: "रामपुर प्रखण्ड",
    block: "Gopalganj Rural",
    blockHi: "गोपालगंज ग्रामीण",
    village: "Gopalganj",
    villageHi: "गोपालगंज",
    address: "Walking distance from Gopalganj Panchayat Bhavan",
    addressHi: "गोपालगंज पंचायत भवन से पैदल दूरी पर",
    distanceKm: 1.8,
    travelTimeMin: 18,
    phone: "+91 98210 33419",
    operatingHours: "Open until 5:00 PM",
    operatingHoursHi: "सायं 5:00 बजे तक खुला",
    openStatusTag: "Open until 5:00 PM",
    openStatusTagHi: "सायं 5:00 बजे तक खुला",
    openStatusType: "green",
    accessTag: "Walking: ~20 mins",
    accessTagHi: "पैदल: ~20 मिनट",
    avgWait: "Village Level Care",
    doctorOnDuty: "Rajesh Kumar (CHO)",
    doctorOnDutyHi: "राजेश कुमार (कम्युनिटी हेल्थ ऑफिसर)",
    doctorSpecialty: "Community Health Officer On Duty • NCD Screening",
    doctorSpecialtyHi: "कम्युनिटी हेल्थ ऑफिसर ड्यूटी पर • गैर-संचारी रोग जांच",
    medicinesCount: "Free Blood Sugar & BP Screening Today",
    nurseOnDuty: "ANM Radha Devi",
    nurseOnDutyHi: "एएनएम राधा देवी",
    bedsAvailable: 2,
    totalBeds: 2,
    medicineStockStatus: "Adequate",
    medicineStockStatusHi: "पर्याप्त",
    services: [
      "General OPD & Preventive Check-ups without registration queue",
      "Free Blood Sugar & BP Screening",
      "Oral Rehydration Salts & Zinc",
      "ASHA Village Support Hub"
    ],
    servicesHi: [
      "बिना कतार सामान्य ओपीडी एवं रोकथाम जांच",
      "निःशुल्क ब्लड शुगर व बीपी जांच",
      "ओआरएस व जिंक वितरण",
      "आशा कार्यकर्ता केंद्र"
    ],
    ambulanceAvailable: false,
    emergency24x7: false,
    teleconsultationAvailable: true,
    snakebiteAntivenom: false,
    coordinates: {
      lat: 27.512,
      lng: 80.612,
      mapX: 25,
      mapY: 62,
    },
    directionsGuideEn: "Located 100 meters behind Gopalganj Gram Panchayat Bhavan. Easy walking route via the village paved path.",
    directionsGuideHi: "गोपालगंज ग्राम पंचायत भवन के 100 मीटर पीछे स्थित। गांव के पक्के रास्ते से पैदल पहुंच।",
  },
  {
    id: "fac-4",
    name: "Mobile Health Unit Route 4B (Van)",
    nameHi: "मोबाइल हेल्थ यूनिट रूट 4B (सचल वैन)",
    type: "MMU",
    typeLabelEn: "Mobile Medical Clinic (सचल यूनिट)",
    typeLabelHi: "मोबाइल मेडिकल क्लिनिक (सचल यूनिट)",
    district: "Rampur Taluk",
    districtHi: "रामपुर प्रखण्ड",
    block: "Chandrapur & Sonpur Belt",
    blockHi: "चंद्रापुर व सोनपुर क्षेत्र",
    village: "Chandrapur Village Square",
    villageHi: "चंद्रापुर ग्राम चौपाल",
    address: "Today's Camp: Chandrapur Village Square (10:00 AM - 2:00 PM)",
    addressHi: "आज का कैंप: चंद्रापुर ग्राम चौपाल (सुबह 10:00 - दोपहर 2:00)",
    distanceKm: 2.1,
    travelTimeMin: 8,
    phone: "+91 98380 99411",
    operatingHours: "10:00 AM - 02:00 PM (Today's Camp)",
    operatingHoursHi: "सुबह 10:00 - दोपहर 02:00",
    openStatusTag: "Active En-Route",
    openStatusTagHi: "मार्ग पर सक्रिय (Active En-Route)",
    openStatusType: "green",
    accessTag: "Stopping in Chandrapur now",
    accessTagHi: "चंद्रापुर में ठहराव",
    avgWait: "Next: Sonpur Hat at 2:30 PM",
    campLocation: "Chandrapur Village Square (10:00 AM - 2:00 PM)",
    campLocationHi: "चंद्रापुर ग्राम चौपाल (सुबह 10:00 - दोपहर 2:00)",
    onboardStaff: "1 MBBS Doctor, 1 Registered Pharmacist, 1 Lab Technician",
    onboardStaffHi: "1 एमबीबीएस डॉक्टर, 1 फार्मासिस्ट, 1 लैब तकनीशियन",
    medicinesCount: "60+ Essential Medicines Stocked",
    vehicleReg: "UP-32-G-8491 (Government Health Mission)",
    doctorOnDuty: "Dr. Himanshu Joshi, MBBS",
    doctorOnDutyHi: "डॉ. हिमांशु जोशी, एमबीबीएस",
    doctorSpecialty: "Mobile Primary Healthcare Officer",
    doctorSpecialtyHi: "सचल प्राथमिक स्वास्थ्य अधिकारी",
    nurseOnDuty: "Pharmacist Arvind & Lab Tech Ravinder",
    nurseOnDutyHi: "फार्मासिस्ट अरविंद व लैब टेक रविंदर",
    bedsAvailable: 1,
    totalBeds: 1,
    medicineStockStatus: "Adequate",
    medicineStockStatusHi: "पर्याप्त",
    services: [
      "Doorstep Village Health Camps",
      "Immediate Blood & Urine Rapid Tests",
      "Free 30-Day Chronic Drug Dispensing",
      "Child Immunization Catch-up",
      "Emergency Transport Referral"
    ],
    servicesHi: [
      "गांव में कैंप परामर्श",
      "रक्त व पेशाब की त्वरित जांच",
      "30 दिन की आवश्यक दवा वितरण",
      "बच्चों का टीकाकरण"
    ],
    ambulanceAvailable: true,
    emergency24x7: false,
    teleconsultationAvailable: true,
    snakebiteAntivenom: true,
    coordinates: {
      lat: 27.534,
      lng: 80.702,
      mapX: 48,
      mapY: 72,
    },
    directionsGuideEn: "Parked under the banyan tree at Chandrapur Village Square until 2:00 PM. Moves to Sonpur Hat Market at 2:30 PM.",
    directionsGuideHi: "दोपहर 2:00 बजे तक चंद्रापुर ग्राम चौपाल पर बरगद के पेड़ के नीचे। दोपहर 2:30 बजे सोनपुर हाट बाजार प्रस्थान।",
  },
  {
    id: "fac-5",
    name: "Kotdwar Sub-Divisional Hospital (SDH)",
    nameHi: "कोटद्वार उप-जिला अस्पताल",
    type: "DH",
    typeLabelEn: "Sub-Divisional / District Hospital",
    typeLabelHi: "उप-जिला अस्पताल",
    district: "Garhwal Foothills",
    districtHi: "गढ़वाल तराई",
    block: "Kotdwar Central",
    blockHi: "कोटद्वार केंद्रीय",
    village: "Civil Lines",
    villageHi: "सिविल लाइंस",
    address: "Station Road, Opposite Bus Terminal, Kotdwar",
    addressHi: "स्टेशन रोड, बस टर्मिनल के सामने, कोटद्वार",
    distanceKm: 16.2,
    travelTimeMin: 38,
    phone: "+91 94120 77319",
    operatingHours: "24x7 Comprehensive Tertiary Referral",
    operatingHoursHi: "24x7 संपूर्ण आपातकाल व रेफरल अस्पताल",
    doctorOnDuty: "Chief Medical Officer on round + 6 Resident Specialists",
    doctorOnDutyHi: "मुख्य चिकित्सा अधिकारी एवं 6 विशेषज्ञ चिकित्सक",
    nurseOnDuty: "Critical Care Nursing Division",
    nurseOnDutyHi: "गंभीर देखभाल नर्सिंग टीम",
    bedsAvailable: 42,
    totalBeds: 100,
    medicineStockStatus: "Adequate",
    medicineStockStatusHi: "पर्याप्त",
    services: [
      "Full 24x7 Emergency & Trauma Centre",
      "Specialized Pediatric & NICU Unit",
      "Advanced Surgical Operation Theatre",
      "Dialysis Center",
      "Fully Stocked Government Generic Pharmacy",
      "Antivenom & Rabies Immunoglobulin Vault",
      "Computed Tomography (CT) & Pathology Lab"
    ],
    servicesHi: [
      "24x7 पूर्ण आपातकालीन एवं ट्रॉमा सेंटर",
      "शिशु गहन चिकित्सा इकाई (NICU)",
      "उन्नत ऑपरेशन थिएटर",
      "डायलिसिस केंद्र",
      "पूर्ण सरकारी जन औषधि केंद्र",
      "एंटीवेनम व रेबीज वैक्सीन बैंक",
      "सीटी स्कैन व संपूर्ण पैथोलॉजी लैब"
    ],
    ambulanceAvailable: true,
    emergency24x7: true,
    teleconsultationAvailable: true,
    snakebiteAntivenom: true,
    coordinates: {
      lat: 27.652,
      lng: 80.641,
      mapX: 78,
      mapY: 18,
    },
    directionsGuideEn: "Major landmark opposite Kotdwar Central Bus Depot. Dedicated 24-hour red triage entrance for acute emergencies.",
    directionsGuideHi: "कोटद्वार सेंट्रल बस डिपो के ठीक सामने मुख्य अस्पताल। गंभीर मरीजों के लिए 24 घंटे लाल रंग का आपातकालीन प्रवेश द्वार खुला है।",
  },
  {
    id: "fac-6",
    name: "Ramgarh Forest Fringe PHC",
    nameHi: "रामगढ़ वन सीमांत प्राथमिक स्वास्थ्य केंद्र",
    type: "PHC",
    typeLabelEn: "Primary Health Centre (PHC)",
    typeLabelHi: "प्राथमिक स्वास्थ्य केंद्र (PHC)",
    district: "Bageshwar Valley",
    districtHi: "बागेश्वर घाटी",
    block: "Kapkot Block",
    blockHi: "कपकोट ब्लॉक",
    village: "Ramgarh Gaon",
    villageHi: "रामगढ़ गांव",
    address: "Forest Gate 2, PWD Rest House Road, Ramgarh",
    addressHi: "वन गेट 2, पीडब्ल्यूडी रेस्ट हाउस रोड, रामगढ़",
    distanceKm: 11.4,
    travelTimeMin: 28,
    phone: "+91 94103 22890",
    operatingHours: "08:30 AM - 04:30 PM (On-call Night Care)",
    operatingHoursHi: "प्रातः 08:30 - सायं 04:30 (रात्रि आपातकाल ऑन-कॉल)",
    doctorOnDuty: "Dr. Himanshu Negi, MBBS",
    doctorOnDutyHi: "डॉ. हिमांशु नेगी, एमबीबीएस",
    nurseOnDuty: "Staff Nurse Kamla & Asha Sarla Devi",
    nurseOnDutyHi: "स्टाफ नर्स कमला व आशा सरला देवी",
    bedsAvailable: 3,
    totalBeds: 4,
    medicineStockStatus: "Limited",
    medicineStockStatusHi: "सीमित",
    services: [
      "Primary Consultation & Minor Dressing",
      "Vaccine Cold-Box Carrier Station",
      "Maternal ANC Delivery Bed",
      "Snakebite First-Response Antivenom",
      "Basic Waterborne Disease Testing"
    ],
    servicesHi: [
      "प्राथमिक परामर्श व घाव की पट्टी",
      "टीकाकरण कोल्ड-बॉक्स केंद्र",
      "गर्भवती प्रसव सुविधा",
      "सांप के काटने का प्राथमिक उपचार (एंटीवेनम)",
      "जलजनित रोगों की जांच"
    ],
    ambulanceAvailable: true,
    emergency24x7: false,
    teleconsultationAvailable: true,
    snakebiteAntivenom: true,
    coordinates: {
      lat: 27.589,
      lng: 80.598,
      mapX: 18,
      mapY: 34,
    },
    directionsGuideEn: "Turn right from the PWD inspection bungalow. Solar-powered facility with 24x7 backup inverter for refrigerator cold-chain.",
    directionsGuideHi: "पीडब्ल्यूडी डाक बंगले से दाएं मुड़ें। केंद्र सौर ऊर्जा से संचालित है तथा वैक्सीन की सुरक्षा के लिए 24 घंटे बैकअप उपलब्ध है।",
  },
];

export const preventiveGuides: PreventiveGuide[] = [
  {
    id: "prev-1",
    category: "maternal",
    categoryEn: "Maternal & Newborn Care",
    categoryHi: "मातृ एवं नवजात शिशु सुरक्षा",
    titleEn: "Antenatal Care (ANC) & Safe Delivery Checklist",
    titleHi: "गर्भावस्था में 4 आवश्यक जांच व सुरक्षित प्रसव",
    summaryEn: "Every pregnant mother in rural areas is entitled to 4 free ANC checkups, iron-folic acid tablets, tetanus toxoid vaccination, and institutional delivery support through the 102 Janani Shishu ambulance.",
    summaryHi: "प्रत्येक गर्भवती महिला को 4 निशुल्क स्वास्थ्य जांच (ANC), आयरन-फॉलिक एसिड की गोलियां, टिटनेस का टीका और 102 जननी एक्सप्रेस द्वारा निशुल्क अस्पताल प्रसव की सुविधा मिलती है।",
    keyStepsEn: [
      "1st Visit: Register within 12 weeks of pregnancy; receive MCP Card, blood group & Hb test.",
      "2nd Visit: Check between 14-26 weeks; ultrasound scan & blood pressure monitoring.",
      "3rd Visit: Check at 28-34 weeks; fetal growth check and iron supplementation refill.",
      "4th Visit: Check at 36 weeks; plan safe institutional delivery and keep 102 ambulance number ready.",
      "Nutrition: Take 1 Iron-Folic tablet daily with meals and ensure leafy greens, lentils & milk."
    ],
    keyStepsHi: [
      "पहली जांच: 12 सप्ताह के भीतर पंजीकरण कराएं; ममता कार्ड, हीमोग्लोबिन व रक्त समूह जांच करवाएं।",
      "दूसरी जांच: 14 से 26 सप्ताह के बीच; रक्तचाप व बच्चे के विकास की जांच।",
      "तीसरी जांच: 28 से 34 सप्ताह पर; आयरन की गोलियां पुनः प्राप्त करें व वजन की जांच कराएं।",
      "चौथी जांच: 36वें सप्ताह में; अस्पताल में प्रसव की योजना बनाएं व 102 नंबर अपने पास रखें।",
      "आहार: प्रतिदिन खाने के बाद 1 आयरन-फॉलिक एसिड की गोली लें, हरी सब्जियां व दालें अवश्य खाएं।"
    ],
    warningSignsEn: [
      "Vaginal bleeding or watery discharge before labor time",
      "Severe swelling in face and hands with sudden headache or blurred vision",
      "Reduced or absent movement of the baby in the womb",
      "High fever, chills, or sudden convulsions"
    ],
    warningSignsHi: [
      "समय से पूर्व रक्तस्राव या पानी का रिसाव होना",
      "चेहरे व हाथों में अत्यधिक सूजन और तेज सिरदर्द या धुंधला दिखाई देना",
      "गर्भ में बच्चे की हलचल का कम होना या बंद होना",
      "तेज बुखार, ठंड लगना या अचानक दौरे पड़ना"
    ],
    audioTextEn: "Antenatal care guidance for mothers: Ensure at least four checkups during pregnancy at your nearest Primary Health Centre. Take your free iron-folic acid tablets daily. If you notice severe swelling, headache, or bleeding, contact your ASHA worker or call 102 immediately.",
    audioTextHi: "गर्भवती माताओं के लिए स्वास्थ्य सलाह: अपने नजदीकी स्वास्थ्य केंद्र पर गर्भावस्था के दौरान कम से कम चार बार जांच अवश्य कराएं। प्रतिदिन आयरन की गोली लें। यदि सिरदर्द, अत्यधिक सूजन या रक्तस्राव हो, तो तुरंत आशा दीदी से संपर्क करें या 102 पर फोन करें।",
    iconName: "Baby",
  },
  {
    id: "prev-2",
    category: "immunization",
    categoryEn: "Child Immunization",
    categoryHi: "बाल टीकाकरण सुरक्षा",
    titleEn: "National Universal Immunization Schedule",
    titleHi: "राष्ट्रीय सार्वभौमिक बाल टीकाकरण समय-सारणी",
    summaryEn: "Timely vaccination protects your child from 12 life-threatening diseases including Polio, Measles, Rubella, Tetanus, Hepatitis B, and Pneumonia. All vaccines are provided 100% free at PHC, CHC, and Village Health Days.",
    summaryHi: "समय पर टीकाकरण आपके बच्चे को पोलियो, खसरा, रूबेला, टिटनेस, हेपेटाइटिस और निमोनिया जैसी 12 गंभीर बीमारियों से बचाता है। सभी टीके सरकारी स्वास्थ्य केंद्रों पर पूरी तरह निशुल्क हैं।",
    keyStepsEn: [
      "At Birth: BCG (against TB), Oral Polio Vaccine (OPV 0), and Hepatitis B birth dose.",
      "6, 10 & 14 Weeks: Pentavalent (DPT, Hep B, Hib), Rotavirus (diarrhea), and fractional IPV.",
      "9-12 Months: MR (Measles-Rubella 1st dose), PCV booster, and Vitamin A syrup.",
      "16-24 Months: DPT booster 1, MR 2nd dose, and OPV booster.",
      "5-6 Years: DPT booster 2 to ensure lifelong immunity before starting school."
    ],
    keyStepsHi: [
      "जन्म के समय: बीसीजी (टीबी से बचाव), पोलियो की खुराक (OPV 0) और हेपेटाइटिस बी।",
      "6, 10 एवं 14 सप्ताह: पेंटावेलेंट टीका, रोटावायरस (दस्त से बचाव) और पोलियो इंजेक्शन (IPV)।",
      "9 से 12 महीने: एमआर (खसरा-रूबेला पहला टीका), पीसीवी बूस्टर और विटामिन 'ए' की खुराक।",
      "16 से 24 महीने: डीपीटी बूस्टर 1, एमआर का दूसरा टीका और पोलियो बूस्टर।",
      "5 से 6 वर्ष: स्कूल जाने से पहले रोग प्रतिरोधक क्षमता हेतु डीपीटी बूस्टर 2।"
    ],
    warningSignsEn: [
      "Mild fever or soreness at injection site is normal for 24-48 hours.",
      "Give plenty of breastmilk or boiled cool water; do not apply mud or cow dung on injection point.",
      "If fever exceeds 102°F or child cries inconsolably for over 3 hours, visit your PHC."
    ],
    warningSignsHi: [
      "टीका लगने के 24-48 घंटे तक हल्का बुखार या दर्द सामान्य है।",
      "बच्चे को भरपूर मां का दूध पिलाएं; टीके की जगह पर मिट्टी या तेल बिल्कुल न लगाएं।",
      "यदि बुखार बहुत तेज हो या बच्चा लगातार रोए, तो तुरंत प्राथमिक स्वास्थ्य केंद्र दिखाएं।"
    ],
    audioTextEn: "Child immunization protects your newborn from twelve deadly diseases. Keep your child's immunization card safe and bring it to every Village Health and Nutrition Day. Vaccines are completely safe and free.",
    audioTextHi: "बाल टीकाकरण आपके बच्चे को 12 जानलेवा बीमारियों से सुरक्षित रखता है। अपने बच्चे का टीकाकरण कार्ड संभाल कर रखें और हर टीकाकरण दिवस पर केंद्र पर अवश्य लाएं। सभी टीके सुरक्षित एवं मुफ्त हैं।",
    iconName: "ShieldAlert",
  },
  {
    id: "prev-3",
    category: "fevers",
    categoryEn: "Vector-Borne & Seasonal Fevers",
    categoryHi: "मौसमी बुखार, मलेरिया व डेंगू से बचाव",
    titleEn: "Preventing Malaria, Dengue & Monsoon Illnesses",
    titleHi: "मलेरिया, डेंगू और मौसमी बुखार की रोकथाम व सही उपचार",
    summaryEn: "Monsoon and post-harvest seasons bring mosquito breeding in village water tanks, puddles, and paddy fields. Rapid blood testing at the PHC detects malaria and dengue within 20 minutes.",
    summaryHi: "बरसात और धान के मौसम में गड्ढों, कूलरों और नालियों में मच्छर पनपते हैं। प्राथमिक स्वास्थ्य केंद्र पर तुरंत 20 मिनट में मलेरिया व डेंगू की निशुल्क खून जांच उपलब्ध है।",
    keyStepsEn: [
      "Clean Stagnant Water: Empty and scrub water storage barrels, discarded tires, and cattle troughs once every week.",
      "Sleep Under Nets: Use Long-Lasting Insecticide Nets (LLINs) distributed free by health workers, especially for children and pregnant mothers.",
      "Get Tested on Day 1 of Fever: Visit the PHC for a finger-prick blood slide or rapid card test before taking any medicine.",
      "Never Take Painkillers blindly: Avoid taking Ibuprofen, Aspirin, or unknown quack cocktails, as they worsen dengue bleeding."
    ],
    keyStepsHi: [
      "ठहरे पानी को हटाएं: पानी की टंकियों, पुराने टायरों और पशुओं की हौदी को सप्ताह में एक बार खाली कर साफ करें।",
      "मच्छरदानी में सोएं: स्वास्थ्य विभाग द्वारा दी जाने वाली मच्छरदानी का नियमित प्रयोग करें, विशेषकर बच्चों और गर्भवती महिलाओं के लिए।",
      "बुखार के पहले दिन ही जांच कराएं: कोई भी दवा खाने से पहले स्वास्थ्य केंद्र पर उंगली से खून की मुफ्त जांच कराएं।",
      "बिना पर्चे के दर्द निवारक दवा न लें: ब्रूफेन या एस्पिरिन जैसी दवाएं न लें, इनसे डेंगू में रक्तस्राव का खतरा बढ़ सकता है। केवल सादा पैरासिटामोल लें।"
    ],
    warningSignsEn: [
      "Sudden drops in fever accompanied by severe stomach pain or black stools (Dengue danger sign)",
      "High fever with shivering, delirium, or unconsciousness (Cerebral Malaria risk)",
      "Yellowing of eyes or extreme dark urine (Jaundice/Hepatitis)"
    ],
    warningSignsHi: [
      "बुखार उतरने के साथ पेट में तेज दर्द, उल्टी या काले रंग का मल आना (डेंगू का खतरा)",
      "कपकपी के साथ तेज बुखार, बेहोशी या बहकी-बहकी बातें करना (दिमागी मलेरिया का संकेत)",
      "आंखों या पेशाब का गहरा पीला होना (पीलिया का लक्षण)"
    ],
    audioTextEn: "Preventing seasonal fever: Do not let water stagnate around your home. Sleep inside treated mosquito nets. Always get a free blood test at your nearest health centre before taking any fever medicine.",
    audioTextHi: "मौसमी बुखार से बचाव: घर के आसपास पानी जमा न होने दें। मच्छरदानी का इस्तेमाल करें। बुखार होने पर झोलाछाप के पास जाने के बजाय सरकारी अस्पताल में खून की निशुल्क जांच कराएं।",
    iconName: "HeartPulse",
  },
  {
    id: "prev-4",
    category: "water_hygiene",
    categoryEn: "Safe Water & Hygiene",
    categoryHi: "सुरक्षित पेयजल व दस्त रोकथाम (ORS)",
    titleEn: "Clean Water, Diarrhea Management & Oral Rehydration",
    titleHi: "स्वच्छ पानी, दस्त का घरेलू उपचार व ओआरएस का सही घोल",
    summaryEn: "Contaminated handpump and well water is the leading cause of rural childhood diarrhea. Learn how to prepare life-saving ORS solution and Zinc dispersible tablets at home.",
    summaryHi: "दूषित पानी ग्रामीण क्षेत्रों में बच्चों में उल्टी-दस्त का मुख्य कारण है। जीवनरक्षक ओआरएस का सही घोल और जिंक की गोली देने का तरीका जानें।",
    keyStepsEn: [
      "Boil or Chlorinate: In monsoon, bring drinking water to a rolling boil for 1 minute or use government chlorine tablets (Halogen tablets).",
      "How to Make ORS: Mix 1 complete sachet of WHO-formula ORS into 1 litre of clean drinking water. Stir well until dissolved.",
      "Shelf-life: Prepared ORS solution must be used within 24 hours. Discard any leftover and make fresh solution the next day.",
      "Zinc Supplementation: Give 1 dispersible Zinc tablet daily for 14 continuous days to prevent recurrent diarrhea."
    ],
    keyStepsHi: [
      "पानी उबालकर पिएं: बरसात में पीने के पानी को कम से कम 1 मिनट तक उबालें या सरकारी क्लोरीन की गोली डालें।",
      "ओआरएस बनाने की सही विधि: 1 लीटर साफ पीने के पानी में ओआरएस का पूरा पैकेट घोलें। चम्मच से अच्छी तरह मिलाएं।",
      "24 घंटे का नियम: तैयार किया गया ओआरएस घोल केवल 24 घंटे तक ही प्रयोग करें। बचा हुआ घोल फेंक कर नया बनाएं।",
      "जिंक की गोली: दस्त रुक जाने के बाद भी 14 दिनों तक लगातार प्रतिदिन 1 जिंक की गोली पानी या मां के दूध में घोलकर अवश्य दें।"
    ],
    warningSignsEn: [
      "Sunken eyes, dry tongue, and child unable to drink fluids",
      "Pinching the skin of the abdomen takes longer than 2 seconds to flatten back",
      "Blood in the stool or continuous vomiting for more than 6 hours"
    ],
    warningSignsHi: [
      "आंखें धंस जाना, जीभ सूखना और बच्चे का पानी न पी पाना",
      "पेट की चमड़ी को चुटकी से उठाने पर 2 सेकंड से ज्यादा समय में सामान्य होना (गंभीर निर्जलीकरण)",
      "मल में खून आना या 6 घंटे से अधिक समय तक लगातार उल्टी होना"
    ],
    audioTextEn: "Safe drinking water saves lives. If anyone suffers from loose motions, start giving ORS solution immediately sip by sip. Never stop feeding food and clean liquids.",
    audioTextHi: "सुरक्षित पानी जीवन बचाता है। दस्त होने पर तुरंत ओआरएस का घोल घूंट-घूंट करके पिलाना शुरू करें। बच्चे को मां का दूध और खाना देना कभी बंद न करें।",
    iconName: "Activity",
  },
  {
    id: "prev-5",
    category: "first_aid",
    categoryEn: "Rural First Aid & Emergency",
    categoryHi: "सांप-बिच्छू के काटने पर प्राथमिक उपचार",
    titleEn: "Snakebite Emergency: Life-Saving Do's & Don'ts",
    titleHi: "सर्पदंश (सांप का काटना): क्या करें और क्या कतई न करें",
    summaryEn: "India has effective polyvalent antivenom stocked in public CHCs and District Hospitals. Fatalities occur primarily due to faith-healing delays, tight tourniquets, and cutting the bite site.",
    summaryHi: "सरकारी सामुदायिक स्वास्थ्य केंद्रों पर सांप के जहर की निशुल्क दवा (एंटीवेनम) उपलब्ध है। सही समय पर अस्पताल पहुंचना ही मरीज की जान बचा सकता है। झाड़-फूंक में समय नष्ट न करें।",
    keyStepsEn: [
      "DO Keep the Patient Calm: Panic increases heart rate and speeds venom spread through the bloodstream.",
      "DO Immobilize the Limb: Splint the affected arm or leg using a wooden stick or cloth, like a broken bone. Keep limb at or slightly below heart level.",
      "DO Transport Immediately: Reach the nearest CHC or District Hospital with antivenom right away via ambulance or vehicle.",
      "DO Note Snake Appearance if possible: Color, pattern, or head shape helps the medical officer, but NEVER attempt to catch or kill the snake."
    ],
    keyStepsHi: [
      "मरीज को शांत रखें: घबराहट और भागदौड़ से दिल की धड़कन तेज होती है और जहर तेजी से फैलता है।",
      "अंग को स्थिर रखें: जिस हाथ या पैर में काटा हो, उसे लकड़ी की पट्टी बांधकर ऐसे स्थिर करें जैसे हड्डी टूटने पर करते हैं।",
      "तुरंत अस्पताल ले जाएं: बिना किसी देरी के 108 एम्बुलेंस या उपलब्ध साधन से सीधे एंटीवेनम युक्त सरकारी अस्पताल पहुंचें।",
      "झाड़-फूंक में समय न गंवाएं: तांत्रिक या झाड़-फूंक के चक्कर में कीमती समय बर्बाद न करें; केवल एंटीवेनम इंजेक्शन ही जान बचाता है।"
    ],
    warningSignsEn: [
      "DO NOT cut the wound with razor blades or attempt to suck venom.",
      "DO NOT tie tight rope or rubber tourniquets that stop arterial blood flow (causes gangrene and amputation).",
      "DO NOT apply cow dung, leaves, lime, or ice to the wound."
    ],
    warningSignsHi: [
      "घाव पर चीरा या ब्लेड न लगाएं और मुंह से जहर चूसने का प्रयास कभी न करें।",
      "रस्सी या तार से बहुत कसकर न बांधें, इससे रक्त प्रवाह रुकने से हाथ-पैर काटने की नौबत आ सकती है।",
      "घाव पर गोबर, राख, चूना या बर्फ कतई न लगाएं।"
    ],
    audioTextEn: "Snakebite emergency guidance: Keep the victim calm and immobilize the bitten limb like a fracture. Do not tie tight ropes or make cuts. Rush immediately to the nearest Community Health Centre with antivenom.",
    audioTextHi: "सर्पदंश आपातकालीन निर्देश: मरीज को बिल्कुल शांत रखें और काटे गए अंग को लकड़ी की पट्टी से स्थिर करें। रस्सी न बांधें, चीरा न लगाएं। सीधे एंटीवेनम वाले सामुदायिक अस्पताल ले जाएं।",
    iconName: "AlertTriangle",
  },
  {
    id: "prev-6",
    category: "elder_care",
    categoryEn: "Elder Care & Non-Communicable Diseases",
    categoryHi: "बुजुर्ग स्वास्थ्य व बीपी/शुगर नियंत्रण",
    titleEn: "Managing Hypertension & Diabetes in Village Elders",
    titleHi: "गांव के बुजुर्गों में ब्लड प्रेशर और शुगर की रोकथाम व देखभाल",
    summaryEn: "Blood pressure and sugar checks are provided free every 15 days at village Health & Wellness Centres (Arogya Mandir). Regular medication prevents paralysis, heart attacks, and kidney failure.",
    summaryHi: "गांव के आरोग्य मंदिर में हर 15 दिन में मुफ्त बीपी और शुगर की जांच की जाती है। नियमित दवा खाने से लकवा, दिल का दौरा और गुर्दे की बीमारी से बचा जा सकता है।",
    keyStepsEn: [
      "Get Tested Twice a Month: Visit your Sub-Centre CHO or ANM for a quick 2-minute digital BP and glucometer test.",
      "Cut Extra Salt: Do not add raw salt on curd, salads, or cooked meals. Avoid heavily salted papads, pickles, and dry fish.",
      "Never Stop BP Medicine: Even if you feel fine, high blood pressure is a silent condition. Refill your free 30-day generic tablet supply at the PHC.",
      "Daily Morning Walk: 30 minutes of gentle walking keeps joints mobile and regulates blood circulation."
    ],
    keyStepsHi: [
      "महीने में 2 बार जांच कराएं: अपने उपकेंद्र पर जाकर एएनएम दीदी से 2 मिनट में डिजिटल बीपी और शुगर नपवाएं।",
      "नमक कम करें: दाल या सब्जी के ऊपर से कच्चा नमक न डालें। पापड़, ज्यादा नमकीन अचार और डिब्बाबंद चीजों से परहेज करें।",
      "दवा कभी बीच में न छोड़ें: अच्छा महसूस होने पर भी बीपी की गोली बंद न करें। सरकारी केंद्र से 30 दिन की दवाएं हमेशा समय पर लें।",
      "प्रतिदिन टहलें: सुबह 30 मिनट की हल्की सैर रक्तचाप को नियंत्रित रखने और जोड़ों के लिए अत्यंत लाभकारी है।"
    ],
    warningSignsEn: [
      "Sudden weakness or numbness in one side of the face or arm (FAST - Stroke sign; rush to hospital)",
      "Slurred speech or confusion while talking",
      "Persistent non-healing sores or blackening on toes or feet"
    ],
    warningSignsHi: [
      "चेहरे या शरीर के एक तरफ अचानक कमजोरी या सुन्नपन (लकवा का संकेत; तुरंत अस्पताल पहुंचें)",
      "बोलने में लड़खड़ाहट या आवाज का स्पष्ट न होना",
      "पैर की उंगलियों में लंबे समय से घाव का न भरना या काला पड़ना"
    ],
    audioTextEn: "Elder healthcare: High blood pressure is a silent condition. Get checked regularly at your local Sub-Centre, reduce daily salt intake, and never skip your prescribed blood pressure tablets.",
    audioTextHi: "बुजुर्गों का स्वास्थ्य: उच्च रक्तचाप बिना लक्षण के भी शरीर को नुकसान पहुंचाता है। उपकेंद्र पर नियमित जांच कराएं, नमक कम खाएं और सरकारी केंद्र से मुफ्त दवा समय पर लेते रहें।",
    iconName: "Stethoscope",
  }
];

export const immunizationScheduleByAge = [
  {
    ageKey: "birth",
    ageLabelEn: "At Birth",
    ageLabelHi: "जन्म के समय",
    vaccines: [
      { name: "BCG", protectionEn: "Tuberculosis (TB)", protectionHi: "टीबी (तपेदिक)", dose: "0.1 ml (Intra-dermal, Left upper arm)" },
      { name: "OPV 0 Dose", protectionEn: "Polio virus", protectionHi: "पोलियो वायरस", dose: "2 drops (Oral)" },
      { name: "Hepatitis B Birth Dose", protectionEn: "Hepatitis B viral infection", protectionHi: "हेपेटाइटिस बी संक्रमण", dose: "0.5 ml (Intra-muscular within 24 hrs)" },
    ]
  },
  {
    ageKey: "sixWeeks",
    ageLabelEn: "6 Weeks",
    ageLabelHi: "6 सप्ताह",
    vaccines: [
      { name: "Pentavalent 1", protectionEn: "Diphtheria, Pertussis, Tetanus, Hep B, Hib pneumonia", protectionHi: "गलाघोंटू, काली खांसी, टिटनेस, हेपेटाइटिस बी व हिब", dose: "0.5 ml (Intra-muscular, Thigh)" },
      { name: "OPV 1", protectionEn: "Polio", protectionHi: "पोलियो", dose: "2 drops (Oral)" },
      { name: "Rotavirus 1", protectionEn: "Rotavirus severe diarrhea", protectionHi: "रोटावायरस गंभीर दस्त", dose: "5 drops (Oral)" },
      { name: "f-IPV 1", protectionEn: "Inactivated Polio booster", protectionHi: "पोलियो इंजेक्शन", dose: "0.1 ml (Intra-dermal, Right arm)" },
      { name: "PCV 1", protectionEn: "Pneumococcal pneumonia", protectionHi: "निमोनिया व दिमागी बुखार", dose: "0.5 ml (Intra-muscular)" },
    ]
  },
  {
    ageKey: "tenWeeks",
    ageLabelEn: "10 Weeks",
    ageLabelHi: "10 सप्ताह",
    vaccines: [
      { name: "Pentavalent 2", protectionEn: "Diphtheria, Pertussis, Tetanus, Hep B, Hib", protectionHi: "काली खांसी, टिटनेस, हेपेटाइटिस व हिब 2", dose: "0.5 ml (Intra-muscular)" },
      { name: "OPV 2", protectionEn: "Polio second oral dose", protectionHi: "पोलियो दूसरी खुराक", dose: "2 drops (Oral)" },
      { name: "Rotavirus 2", protectionEn: "Severe infant diarrhea", protectionHi: "रोटावायरस दस्त रोकथाम 2", dose: "5 drops (Oral)" },
    ]
  },
  {
    ageKey: "fourteenWeeks",
    ageLabelEn: "14 Weeks",
    ageLabelHi: "14 सप्ताह",
    vaccines: [
      { name: "Pentavalent 3", protectionEn: "Third primary dose for five diseases", protectionHi: "पांच जानलेवा रोगों की तीसरी खुराक", dose: "0.5 ml (Intra-muscular)" },
      { name: "OPV 3", protectionEn: "Polio third oral dose", protectionHi: "पोलियो तीसरी खुराक", dose: "2 drops (Oral)" },
      { name: "Rotavirus 3", protectionEn: "Severe diarrhea protection", protectionHi: "रोटावायरस खुराक 3", dose: "5 drops (Oral)" },
      { name: "f-IPV 2", protectionEn: "Inactivated Polio vaccine dose 2", protectionHi: "पोलियो इंजेक्शन खुराक 2", dose: "0.1 ml (Intra-dermal)" },
      { name: "PCV 2", protectionEn: "Pneumococcal dose 2", protectionHi: "निमोनिया रोकथाम खुराक 2", dose: "0.5 ml (Intra-muscular)" },
    ]
  },
  {
    ageKey: "nineMonths",
    ageLabelEn: "9-12 Months",
    ageLabelHi: "9-12 महीने",
    vaccines: [
      { name: "MR 1st Dose", protectionEn: "Measles and Rubella", protectionHi: "खसरा और रूबेला", dose: "0.5 ml (Subcutaneous, Right upper arm)" },
      { name: "PCV Booster", protectionEn: "Pneumococcal booster", protectionHi: "निमोनिया बूस्टर", dose: "0.5 ml (Intra-muscular)" },
      { name: "Vitamin A 1st Dose", protectionEn: "Night blindness & immunity", protectionHi: "रतौंधी से बचाव व रोग प्रतिरोधक क्षमता", dose: "1 ml / 1 Lakh IU (Oral spoon)" },
    ]
  },
  {
    ageKey: "sixteenMonths",
    ageLabelEn: "16-24 Months",
    ageLabelHi: "16-24 महीने",
    vaccines: [
      { name: "MR 2nd Dose", protectionEn: "Measles Rubella completion", protectionHi: "खसरा व रूबेला पूर्ण सुरक्षा", dose: "0.5 ml (Subcutaneous)" },
      { name: "DPT Booster 1", protectionEn: "Diphtheria, Pertussis, Tetanus booster", protectionHi: "डीपीटी बूस्टर 1", dose: "0.5 ml (Intra-muscular)" },
      { name: "OPV Booster", protectionEn: "Oral Polio booster", protectionHi: "पोलियो बूस्टर खुराक", dose: "2 drops (Oral)" },
      { name: "Vitamin A Dose 2", protectionEn: "Vision and growth", protectionHi: "विटामिन 'ए' दूसरी खुराक", dose: "2 ml / 2 Lakh IU (Oral)" },
    ]
  },
  {
    ageKey: "fiveYears",
    ageLabelEn: "5-6 Years",
    ageLabelHi: "5-6 वर्ष",
    vaccines: [
      { name: "DPT Booster 2", protectionEn: "Childhood booster before primary school", protectionHi: "प्राथमिक स्कूल जाने से पूर्व डीपीटी बूस्टर 2", dose: "0.5 ml (Intra-muscular, Upper arm)" },
    ]
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: "apt-101",
    token: "MED-2026-4412",
    patientName: "Kamla Devi",
    age: 26,
    gender: "Female",
    phone: "+91 94120 88412",
    village: "Sitapur Kalan",
    district: "Sitapur Rural",
    facilityId: "fac-1",
    facilityName: "Sitapur Primary Health Centre",
    facilityType: "PHC",
    serviceType: "Maternal Antenatal Checkup (ANC)",
    serviceTypeHi: "गर्भवती महिला प्रसव पूर्व जांच (ANC)",
    preferredDate: "2026-09-26",
    timeSlot: "Morning Session (09:00 AM - 12:30 PM)",
    symptomsNotes: "7-month pregnancy routine checkup and iron tablet refill.",
    status: "Confirmed",
    createdAt: "2026-09-24T06:30:00Z"
  },
  {
    id: "apt-102",
    token: "MED-2026-8910",
    patientName: "Ramcharan Verma",
    age: 62,
    gender: "Male",
    phone: "+91 98380 12093",
    village: "Rampur Basti",
    district: "Sitapur Rural",
    facilityId: "fac-4",
    facilityName: "Medway Mobile Medical Unit (Van Cluster 4)",
    facilityType: "MMU",
    serviceType: "Elder Hypertension & Diabetes Checkup",
    serviceTypeHi: "बुजुर्ग उच्च रक्तचाप व शुगर जांच",
    preferredDate: "2026-09-27",
    timeSlot: "Morning Session (09:00 AM - 12:30 PM)",
    symptomsNotes: "Monthly blood pressure check and generic tablet renewal.",
    status: "Confirmed",
    createdAt: "2026-09-24T07:15:00Z"
  },
  {
    id: "apt-103",
    token: "MED-2026-1192",
    patientName: "Aarav (Parent: Sunita Rawat)",
    age: 1,
    gender: "Male",
    phone: "+91 94111 65421",
    village: "Garud Town",
    district: "Bageshwar Valley",
    facilityId: "fac-2",
    facilityName: "Bageshwar Community Health Centre",
    facilityType: "CHC",
    serviceType: "Child Routine Immunization (9-Month MR)",
    serviceTypeHi: "शिशु नियमित टीकाकरण (9-माह खसरा-रूबेला)",
    preferredDate: "2026-09-28",
    timeSlot: "Morning Session (09:00 AM - 12:30 PM)",
    symptomsNotes: "Due for MR 1st dose and Vitamin A syrup.",
    status: "Confirmed",
    createdAt: "2026-09-24T08:00:00Z"
  }
];

export const initialFeedback: PatientFeedback[] = [
  {
    id: "fb-1",
    facilityId: "fac-1",
    facilityName: "Sitapur Primary Health Centre",
    patientName: "Rameshwar Singh",
    village: "Sitapur Kalan",
    rating: 5,
    cleanlinessRating: 5,
    staffHelpfulnessRating: 5,
    medicineAvailabilityRating: 5,
    waitTimeMinutes: 12,
    comment: "Doctor Sharma was on duty at 9:30 AM. He conducted a blood pressure check and gave 30 days of free medicine from the generic counter. Clean waiting hall.",
    commentHi: "डॉ. शर्मा सुबह 9:30 बजे उपस्थित थे। उन्होंने बीपी की जांच की और सरकारी काउंटर से 30 दिन की दवाएं मुफ्त दीं। प्रतीक्षालय भी साफ-सुथरा था।",
    date: "2026-09-22",
    verifiedVisit: true,
    adminActionNote: "Verified by ASHA Facilitator. Generic drug stock replenished weekly on Thursdays."
  },
  {
    id: "fb-2",
    facilityId: "fac-2",
    facilityName: "Bageshwar Community Health Centre",
    patientName: "Sushila Devi",
    village: "Garud",
    rating: 4,
    cleanlinessRating: 4,
    staffHelpfulnessRating: 5,
    medicineAvailabilityRating: 4,
    waitTimeMinutes: 25,
    comment: "Brought my daughter for delivery at 2 AM. Staff nurses were prompt, clean maternity room, and Janani Shishu financial assistance processed without hassle.",
    commentHi: "रात 2 बजे बेटी के प्रसव के लिए अस्पताल पहुंचे। स्टाफ नर्सों ने तुरंत संभाला, कमरा साफ था और जननी सुरक्षा योजना का लाभ भी बिना परेशानी के मिला।",
    date: "2026-09-20",
    verifiedVisit: true,
    adminActionNote: "Labor ward sterilized daily. 102 ambulance log verified."
  },
  {
    id: "fb-3",
    facilityId: "fac-4",
    facilityName: "Medway Mobile Medical Unit (Van Cluster 4)",
    patientName: "Ganga Prasad",
    village: "Rampur Basti",
    rating: 5,
    cleanlinessRating: 5,
    staffHelpfulnessRating: 5,
    medicineAvailabilityRating: 5,
    waitTimeMinutes: 15,
    comment: "The mobile van reached our tribal village on time. As elderly villagers who cannot travel 10 km to town, getting blood sugar tested at our doorstep is a blessing.",
    commentHi: "मोबाइल वैन हमारे गांव में समय पर पहुंची। हम बुजुर्ग जो 10 किमी दूर अस्पताल नहीं जा सकते, उनके लिए गांव में ही खून की जांच व दवा मिलना बहुत बड़ी सुविधा है।",
    date: "2026-09-18",
    verifiedVisit: true,
    adminActionNote: "MMU route schedule confirmed for every Tuesday and Friday."
  },
  {
    id: "fb-4",
    facilityId: "fac-6",
    facilityName: "Ramgarh Forest Fringe PHC",
    patientName: "Mohan Chandra",
    village: "Ramgarh Gaon",
    rating: 4,
    cleanlinessRating: 3,
    staffHelpfulnessRating: 4,
    medicineAvailabilityRating: 3,
    waitTimeMinutes: 30,
    comment: "Doctor was helpful for my son's fever, but Paracetamol syrup was running low. The staff said the new district supply arrives on Monday.",
    commentHi: "डॉक्टर साहब ने बेटे के बुखार की अच्छी जांच की, पर पैरासिटामोल सिरप की कुछ कमी थी। स्टाफ ने बताया कि सोमवार को जिला मुख्यालय से नई खेप आ जाएगी।",
    date: "2026-09-15",
    verifiedVisit: true,
    adminActionNote: "District CMO dispatched 200 units of pediatric antipyretic syrup on Sept 16."
  },
  {
    id: "fb-5",
    facilityId: "fac-3",
    facilityName: "Ranikhet Hills Sub-Centre (Arogya Mandir)",
    patientName: "Bimla Joshi",
    village: "Chiliyanaula",
    rating: 5,
    cleanlinessRating: 5,
    staffHelpfulnessRating: 5,
    medicineAvailabilityRating: 5,
    waitTimeMinutes: 8,
    comment: "CHO Priyanshu Joshi connected us via tele-consultation video call to the eye specialist at Almora hospital within 10 minutes. Saved me an entire day of mountain travel.",
    commentHi: "कम्युनिटी हेल्थ ऑफिसर प्रियांशु ने 10 मिनट में टेली-परामर्श से अल्मोड़ा के नेत्र विशेषज्ञ से वीडियो कॉल पर बात कराई। इससे मेरे पूरे दिन का सफर और खर्च बच गया।",
    date: "2026-09-12",
    verifiedVisit: true,
    adminActionNote: "Tele-medicine kiosk active Monday to Saturday 10 AM to 2 PM."
  }
];

export const statMetrics: HealthcareStatMetric[] = [
  {
    id: "m-1",
    labelEn: "Health Facilities Mapped",
    labelHi: "सक्रिय स्वास्थ्य केंद्र",
    value: "128",
    subtextEn: "38 PHCs · 14 CHCs · 72 Sub-Centres · 4 MMUs",
    subtextHi: "38 प्राथमिक केंद्र · 14 सामुदायिक · 72 उपकेंद्र · 4 वैन",
    trend: "+12% this quarter",
  },
  {
    id: "m-2",
    labelEn: "Rural Population Covered",
    labelHi: "कवर्ड ग्रामीण आबादी",
    value: "342,800+",
    subtextEn: "Across 214 Gram Panchayats",
    subtextHi: "214 ग्राम पंचायतों में विस्तारित",
    trend: "98.4% geo-coverage",
  },
  {
    id: "m-3",
    labelEn: "Avg Travel Time to Care",
    labelHi: "औसत यात्रा समय",
    value: "14.2 min",
    subtextEn: "Reduced from 48 mins via mobile units",
    subtextHi: "मोबाइल वैन व उपकेंद्रों से 48 मिनट से घटकर 14 मिनट हुआ",
    trend: "-70% travel reduction",
  },
  {
    id: "m-4",
    labelEn: "Essential Drug Availability",
    labelHi: "आवश्यक औषधि उपलब्धता दर",
    value: "92.4%",
    subtextEn: "Stocked across 42 key generic medicines",
    subtextHi: "42 आवश्यक जेनेरिक दवाओं में पर्याप्त स्टॉक",
    trend: "Monitored weekly",
  },
  {
    id: "m-5",
    labelEn: "Institutional Delivery Rate",
    labelHi: "संस्थागत सुरक्षित प्रसव दर",
    value: "95.6%",
    subtextEn: "Zero home deliveries in mapped cluster",
    subtextHi: "चिन्हित क्षेत्र में 100% अस्पताल प्रसव का लक्ष्य",
    trend: "+8.2% annual gain",
  },
  {
    id: "m-6",
    labelEn: "Full Infant Immunization",
    labelHi: "शिशु संपूर्ण टीकाकरण दर",
    value: "93.8%",
    subtextEn: "Tracking birth to 24-month cohort",
    subtextHi: "जन्म से 24 माह तक के बच्चों की पूर्ण सुरक्षा",
    trend: "Top tier in state",
  }
];

export const monthlyFootfallData = [
  { month: "May", phc: 12400, chc: 8900, mmu: 3200, sc: 5100 },
  { month: "Jun", phc: 13800, chc: 9400, mmu: 3900, sc: 5600 },
  { month: "Jul", phc: 15900, chc: 11200, mmu: 4800, sc: 6800 },
  { month: "Aug", phc: 18200, chc: 12800, mmu: 5900, sc: 7400 },
  { month: "Sep", phc: 17100, chc: 11900, mmu: 5400, sc: 7100 },
];

export const medicineAvailabilityByBlock = [
  { block: "Sitapur Block A", rate: 94, status: "Adequate" },
  { block: "Garud Valley", rate: 91, status: "Adequate" },
  { block: "Tarikhet Cluster", rate: 89, status: "Adequate" },
  { block: "Kapkot Hill Belt", rate: 78, status: "Moderate (Replenishing)" },
  { block: "Tribal Fringe", rate: 93, status: "Adequate" },
];

export const topPresentingConditions = [
  { conditionEn: "Upper Respiratory & Seasonal Fevers", conditionHi: "मौसमी बुखार व श्वसन संक्रमण", percentage: 32, cases: "8,940 cases" },
  { conditionEn: "Maternal Antenatal & Postnatal Care", conditionHi: "मातृ एवं प्रसव पूर्व/पश्चात देखभाल", percentage: 24, cases: "6,710 visits" },
  { conditionEn: "Waterborne Diarrhea & Gastrointestinal", conditionHi: "उल्टी-दस्त व जलजनित पेट की समस्याएं", percentage: 18, cases: "5,020 cases" },
  { conditionEn: "Hypertension & Diabetes Management", conditionHi: "उच्च रक्तचाप व मधुमेह (बीपी/शुगर)", percentage: 16, cases: "4,470 patients" },
  { conditionEn: "Dermatological, Minor Injury & First Aid", conditionHi: "त्वचा रोग, प्राथमिक चोट व अन्य", percentage: 10, cases: "2,790 cases" },
];

export const STREAMLIT_CODE_TEMPLATE = `"""
Medway - Rural & Underserved Public Healthcare Access Platform
Python + Streamlit Prototype for College Project Presentation
Author: Medway Public Health Engineering Team
Requirements: pip install streamlit pandas plotly
Run command: streamlit run medway_streamlit.py
"""

import streamlit as st
import pandas as pd
import datetime

# Page configuration
st.set_page_config(
    page_title="Medway - Rural Healthcare Access",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom minimal styling (Satoshi-like clean design, soft medical tones)
st.markdown("""
<style>
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
    html, body, [class*="css"] {
        font-family: 'Satoshi', -apple-system, sans-serif;
    }
    .metric-card {
        background-color: #F8FAF9;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
    }
    .emergency-banner {
        background-color: #FEF2F2;
        border-left: 5px solid #EF4444;
        padding: 12px 16px;
        border-radius: 6px;
        color: #991B1B;
        font-weight: 500;
        margin-bottom: 20px;
    }
</style>
""", unsafe_allow_html=True)

# Language Selector in Sidebar
lang = st.sidebar.radio("🌐 Select Language / भाषा चुनें", ["English", "हिन्दी (Hindi)"])
is_hindi = lang == "हिन्दी (Hindi)"

# Title & Emergency Banner
st.title("🏥 Medway" if not is_hindi else "🏥 मेदवे (Medway)")
st.caption(
    "Rural & Underserved Public Healthcare Access Platform"
    if not is_hindi else
    "ग्रामीण एवं वंचित क्षेत्रों के लिए सुलभ जन स्वास्थ्य सेवा मंच"
)

st.markdown("""
<div class="emergency-banner">
    🚨 <b>Emergency / आपातकालीन 24x7:</b> Dial <b>108</b> (Free Ambulance), <b>102</b> (Janani Shishu Pregnant Transport), <b>104</b> (Medical Advice).
    <br><small>Medway is an informational directory prototype. For severe emergencies or snakebite, visit the nearest CHC immediately.</small>
</div>
""", unsafe_allow_html=True)

# Sidebar Navigation
nav_options = [
    "🏥 Facility Finder",
    "🩺 Preventive Care & Health Guidance",
    "📋 Book Service / Appointment",
    "⭐ Patient Feedback",
    "📊 Healthcare Access Dashboard",
    "🎓 College Project Overview"
] if not is_hindi else [
    "🏥 अस्पताल / केंद्र खोजें",
    "🩺 रोकथाम व स्वास्थ्य सलाह",
    "📋 सेवा / टोकन बुक करें",
    "⭐ मरीज की राय व समीक्षा",
    "📊 स्वास्थ्य सांख्यिकी डैशबोर्ड",
    "🎓 कॉलेज प्रोजेक्ट विवरण"
]

menu = st.sidebar.selectbox("Navigation / नेविगेशन", nav_options)

# Mock Facilities Dataset
facilities = [
    {
        "Name": "Sitapur Primary Health Centre",
        "Type": "PHC",
        "Block": "Sitapur Block A",
        "Distance (km)": 2.8,
        "Doctor on Duty": "Dr. Rajesh Sharma, MBBS",
        "Beds Available": 4,
        "Medicine Stock": "Adequate (94%)",
        "Emergency 24x7": "Yes",
        "Snakebite Antivenom": "Yes",
        "Contact": "+91 94120 44810"
    },
    {
        "Name": "Bageshwar Community Health Centre",
        "Type": "CHC",
        "Block": "Garud Block",
        "Distance (km)": 8.5,
        "Doctor on Duty": "Dr. Sunita Pant (Gynecologist) & Dr. V. K. Verma",
        "Beds Available": 18,
        "Medicine Stock": "Adequate (91%)",
        "Emergency 24x7": "Yes",
        "Snakebite Antivenom": "Yes",
        "Contact": "+91 94111 88320"
    },
    {
        "Name": "Ranikhet Hills Sub-Centre (Arogya Mandir)",
        "Type": "Sub-Centre",
        "Block": "Tarikhet",
        "Distance (km)": 1.4,
        "Doctor on Duty": "CHO Priyanshu Joshi",
        "Beds Available": 2,
        "Medicine Stock": "Adequate (89%)",
        "Emergency 24x7": "No (Daytime)",
        "Snakebite Antivenom": "No",
        "Contact": "+91 94563 11209"
    },
    {
        "Name": "Medway Mobile Medical Unit (Van Cluster 4)",
        "Type": "Mobile Van",
        "Block": "Tribal Fringe Belt",
        "Distance (km)": 3.5,
        "Doctor on Duty": "Dr. Ananya Roy, MBBS",
        "Beds Available": 1,
        "Medicine Stock": "Adequate (93%)",
        "Emergency 24x7": "No (Rotating)",
        "Snakebite Antivenom": "Yes",
        "Contact": "+91 98380 99411"
    }
]

# Section 1: Facility Finder
if "Facility Finder" in menu or "अस्पताल" in menu:
    st.header("🏥 Healthcare Facility Finder")
    col1, col2 = st.columns([2, 1])
    with col1:
        search_query = st.text_input("🔍 Search by village, facility name or block", "")
    with col2:
        selected_type = st.selectbox("Filter by Facility Type", ["All", "PHC", "CHC", "Sub-Centre", "Mobile Van"])

    df = pd.DataFrame(facilities)
    if selected_type != "All":
        df = df[df["Type"] == selected_type]
    if search_query:
        df = df[df["Name"].str.contains(search_query, case=False) | df["Block"].str.contains(search_query, case=False)]

    st.dataframe(df, use_container_width=True)

    st.subheader("Quick Facility Spotlight")
    for f in facilities:
        with st.expander(f"📍 {f['Name']} ({f['Type']}) - {f['Distance (km)']} km away"):
            c1, c2, c3 = st.columns(3)
            c1.write(f"**Doctor:** {f['Doctor on Duty']}")
            c1.write(f"**Phone:** {f['Contact']}")
            c2.write(f"**Beds Available:** {f['Beds Available']}")
            c2.write(f"**Medicines:** {f['Medicine Stock']}")
            c3.write(f"**Emergency 24x7:** {f['Emergency 24x7']}")
            c3.write(f"**Antivenom Ready:** {f['Snakebite Antivenom']}")

# Section 2: Preventive Care
elif "Preventive Care" in menu or "रोकथाम" in menu:
    st.header("🩺 Preventive Care & Health Guidance")
    topic = st.selectbox(
        "Select Health Topic",
        ["Maternal Care (ANC)", "Child Immunization Schedule", "Seasonal Fevers & Malaria", "Safe Drinking Water & ORS", "Snakebite First Aid"]
    )
    if topic == "Child Immunization Schedule":
        st.subheader("Child Immunization Tracker (Universal Schedule)")
        age = st.select_slider("Select Child Age", ["At Birth", "6 Weeks", "10 Weeks", "14 Weeks", "9 Months", "16-24 Months", "5 Years"])
        st.info(f"Due vaccines for child aged: **{age}**")
        if age == "At Birth":
            st.write("• **BCG:** Protection against Tuberculosis (TB)")
            st.write("• **OPV 0:** Oral Polio Vaccine")
            st.write("• **Hepatitis B Birth Dose:** Given within 24 hours of birth")
        elif age == "6 Weeks":
            st.write("• **Pentavalent 1:** Protects against Diphtheria, Pertussis, Tetanus, Hep B, Hib")
            st.write("• **Rotavirus 1:** Prevents severe viral diarrhea")
            st.write("• **f-IPV 1:** Fractional Inactivated Polio Vaccine")
        else:
            st.write("All recommended vaccines are administered free at your local Primary Health Centre.")
    elif topic == "Snakebite First Aid":
        st.error("🚨 Snakebite Life-Saving Protocol: Do NOT cut, suck venom, or tie tight rope tourniquets. Keep limb still and rush immediately to the nearest CHC for Antivenom.")

# Section 3: Book Service / Appointment
elif "Book Service" in menu or "टोकन बुक" in menu:
    st.header("📋 Book Healthcare Service / Appointment Token")
    with st.form("appointment_form"):
        p_name = st.text_input("Patient Full Name")
        c1, c2 = st.columns(2)
        p_age = c1.number_input("Age", min_value=1, max_value=110, value=25)
        p_gender = c2.selectbox("Gender", ["Female", "Male", "Other"])
        p_phone = st.text_input("Mobile Phone (for SMS Token)")
        p_village = st.text_input("Village / Gram Panchayat")
        p_facility = st.selectbox("Preferred Health Facility", [f["Name"] for f in facilities])
        p_service = st.selectbox("Service Needed", [
            "General OPD Doctor Checkup",
            "Maternal Antenatal Checkup (ANC)",
            "Child Routine Vaccination",
            "Elder BP & Sugar Medicine Refill",
            "Diagnostic Blood/Lab Test"
        ])
        p_date = st.date_input("Preferred Date", datetime.date.today() + datetime.timedelta(days=1))
        p_slot = st.selectbox("Time Window", ["Morning (09:00 AM - 12:30 PM)", "Afternoon (01:30 PM - 04:30 PM)"])
        submitted = st.form_submit_button("Generate Appointment Token")
        if submitted:
            token_id = f"MED-2026-{hash(p_name + str(p_age)) % 9000 + 1000}"
            st.success(f"✅ Appointment Booked! Token Number: **{token_id}**")
            st.write(f"An SMS has been dispatched to {p_phone} for visit at **{p_facility}** on **{p_date}**.")

# Section 4: Patient Feedback
elif "Patient Feedback" in menu or "मरीज की राय" in menu:
    st.header("⭐ Patient Feedback & Community Voice")
    st.write("Transparent community reviews ensure medicine availability and respectful care.")
    with st.form("feedback_form"):
        f_name = st.text_input("Your Name (or leave blank for Anonymous)")
        f_facility = st.selectbox("Facility Visited", [f["Name"] for f in facilities])
        f_rating = st.slider("Overall Experience (1 = Poor, 5 = Excellent)", 1, 5, 5)
        f_meds = st.radio("Were prescribed medicines available free?", ["Yes, full supply", "Partially available", "Out of stock"])
        f_comment = st.text_area("Your Feedback / Grievance")
        fb_submit = st.form_submit_button("Submit Review")
        if fb_submit:
            st.success("Thank you! Your feedback has been recorded in the community monitoring ledger.")

# Section 5: Access Dashboard
elif "Dashboard" in menu or "सांख्यिकी" in menu:
    st.header("📊 Rural Healthcare Access Dashboard")
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Mapped Facilities", "128", "+12% this quarter")
    m2.metric("Rural Population", "342,800+", "214 Panchayats")
    m3.metric("Avg Travel Time", "14.2 min", "-70% reduction")
    m4.metric("Medicine Stock Rate", "92.4%", "Essential Drug Index")
    st.subheader("Monthly Outpatient Footfall")
    chart_data = pd.DataFrame({
        "Month": ["May", "Jun", "Jul", "Aug", "Sep"],
        "PHC Patients": [12400, 13800, 15900, 18200, 17100],
        "CHC Patients": [8900, 9400, 11200, 12800, 11900],
        "Mobile Van Patients": [3200, 3900, 4800, 5900, 5400]
    })
    st.bar_chart(chart_data.set_index("Month"))

# Section 6: College Project Overview
else:
    st.header("🎓 College Project Presentation Overview")
    st.markdown("""
    ### Problem Statement
    Rural public healthcare delivery faces severe challenges: long travel times, doctor absenteeism, frequent medicine stockouts, and lack of digital transparency.
    ### Medway Solution
    Medway is a low-bandwidth, accessible web prototype offering:
    1. **Facility Discovery with Live Stock Status**
    2. **Preventive Health & Universal Immunization Tracking**
    3. **Paperless Appointment Tokens via SMS**
    4. **Community Feedback & Grievance Redressal**
    5. **Public Health Analytics Dashboard**
    """)
    st.success("Prototype ready for academic viva and project presentation.")
`;
