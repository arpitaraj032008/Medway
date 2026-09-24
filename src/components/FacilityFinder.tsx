import React, { useState, useMemo } from 'react';
import { Facility, Language } from '../types';
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Building2, 
  Maximize2, 
  RefreshCw, 
  Home, 
  Check, 
  ChevronDown, 
  PhoneCall, 
  Truck,
  UserCheck,
  Calendar,
  X,
  ShieldCheck
} from 'lucide-react';

interface FacilityFinderProps {
  facilities: Facility[];
  language: Language;
  onBookFacility: (fac: Facility) => void;
  selectedFacilityId?: string;
}

export const FacilityFinder: React.FC<FacilityFinderProps> = ({
  facilities,
  language,
  onBookFacility,
  selectedFacilityId,
}) => {
  const isHi = language === 'hi';

  // Filters state
  const [selectedTaluk, setSelectedTaluk] = useState('ALL_TALUKS');
  const [selectedVillage, setSelectedVillage] = useState('ALL_VILLAGES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [openNowToggle, setOpenNowToggle] = useState(true);
  
  // Service checkboxes
  const [filterMaternity, setFilterMaternity] = useState(false);
  const [filterDiagnostic, setFilterDiagnostic] = useState(false);
  const [filterPediatric, setFilterPediatric] = useState(false);
  const [filterVaccination, setFilterVaccination] = useState(false);
  const [filterDoctorOnDuty, setFilterDoctorOnDuty] = useState(false);

  // Modals
  const [directionsModalFac, setDirectionsModalFac] = useState<Facility | null>(null);
  const [expandedMap, setExpandedMap] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState(false);

  // Filter logic
  const filteredFacilities = useMemo(() => {
    return facilities.filter((fac) => {
      // Tier filter
      if (selectedTier === 'PHC' && fac.type !== 'PHC') return false;
      if (selectedTier === 'CHC' && fac.type !== 'CHC') return false;
      if (selectedTier === 'SC' && fac.type !== 'SC') return false;
      if (selectedTier === 'MMU' && fac.type !== 'MMU') return false;

      // Village filter
      if (selectedVillage !== 'ALL_VILLAGES') {
        if (!fac.village.toLowerCase().includes(selectedVillage.toLowerCase()) && 
            !fac.villageHi.includes(selectedVillage)) {
          return false;
        }
      }

      // Checkboxes
      if (filterMaternity && !fac.services.some(s => s.toLowerCase().includes('maternal') || s.toLowerCase().includes('maternity'))) {
        return false;
      }
      if (filterDiagnostic && !fac.services.some(s => s.toLowerCase().includes('diagnostic') || s.toLowerCase().includes('ecg') || s.toLowerCase().includes('lab') || s.toLowerCase().includes('ultrasound'))) {
        return false;
      }
      if (filterDoctorOnDuty && !fac.doctorOnDuty) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = fac.name.toLowerCase().includes(q) || fac.nameHi.includes(q);
        const matchesBlock = fac.block.toLowerCase().includes(q) || fac.blockHi.includes(q);
        const matchesVillage = fac.village.toLowerCase().includes(q) || fac.villageHi.includes(q);
        const matchesService = fac.services.some(s => s.toLowerCase().includes(q)) || fac.servicesHi.some(s => s.includes(q));
        const matchesDoctor = fac.doctorOnDuty.toLowerCase().includes(q) || fac.doctorOnDutyHi.includes(q);
        if (!matchesName && !matchesBlock && !matchesVillage && !matchesService && !matchesDoctor) {
          return false;
        }
      }

      return true;
    });
  }, [facilities, selectedTier, selectedVillage, filterMaternity, filterDiagnostic, filterDoctorOnDuty, searchQuery]);

  const handleResetFilters = () => {
    setSelectedTaluk('ALL_TALUKS');
    setSelectedVillage('ALL_VILLAGES');
    setSearchQuery('');
    setSelectedTier('ALL');
    setOpenNowToggle(true);
    setFilterMaternity(false);
    setFilterDiagnostic(false);
    setFilterPediatric(false);
    setFilterVaccination(false);
    setFilterDoctorOnDuty(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Main Search & Filter Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        
        {/* Row 1: Dropdowns + Search Input + Search Button */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* District / Block / Taluk */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              <span>{isHi ? 'जिला / प्रखण्ड / तहसील' : 'District / Block / Taluk'}</span>
            </label>
            <div className="relative">
              <select
                value={selectedTaluk}
                onChange={(e) => setSelectedTaluk(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 appearance-none"
              >
                <option value="ALL_TALUKS">{isHi ? 'रामपुर प्रखण्ड (सभी क्षेत्र)' : 'Rampur Taluk (All Areas)'}</option>
                <option value="Bhimtal Tehsil">{isHi ? 'भीमताल तहसील' : 'Bhimtal Tehsil'}</option>
                <option value="Garud Block">{isHi ? 'गरुड़ ब्लॉक' : 'Garud Block'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Gram Panchayat / Village */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-teal-700" />
              <span>{isHi ? 'ग्राम पंचायत / गाँव' : 'Gram Panchayat / Village'}</span>
            </label>
            <div className="relative">
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 appearance-none"
              >
                <option value="ALL_VILLAGES">{isHi ? 'सभी गाँव' : 'All Villages'}</option>
                <option value="Kishorepur">{isHi ? 'किशोरपुर' : 'Kishorepur'}</option>
                <option value="Bhimtal">{isHi ? 'भीमताल' : 'Bhimtal'}</option>
                <option value="Gopalganj">{isHi ? 'गोपालगंज' : 'Gopalganj'}</option>
                <option value="Chandrapur">{isHi ? 'चंद्रापुर' : 'Chandrapur'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick Search Facility or Service */}
          <div className="md:col-span-6 flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-teal-700" />
                <span>{isHi ? 'केंद्र या सेवा खोजें' : 'Quick Search Facility or Service Name'}</span>
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHi ? 'उदा. प्रसव, सोनोग्राफी, रक्त जांच, डॉ. शर्मा...' : 'e.g. Delivery, Ultrasound, Blood test, Dr. Sharma...'}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            </div>

            <button
              onClick={() => {}}
              className="px-4 py-2 bg-[#0d5c58] hover:bg-[#094744] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 shrink-0 transition-colors h-[34px]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isHi ? 'खोजें' : 'Search'}</span>
            </button>
          </div>

        </div>

        {/* Row 2: Tier / Center Classification Pills + Reset Filters */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-600 mr-1">
              {isHi ? 'स्वास्थ्य केंद्र प्रकार :' : 'Center Classification :'}
            </span>

            {[
              { id: 'ALL', label: isHi ? 'सभी केंद्र' : 'All Facilities' },
              { id: 'PHC', label: isHi ? 'प्राथमिक स्वास्थ्य केंद्र (PHC)' : 'Primary Health Centre (PHC)' },
              { id: 'CHC', label: isHi ? 'सामुदायिक स्वास्थ्य केंद्र (CHC)' : 'Community Health Centre (CHC)' },
              { id: 'SC', label: isHi ? 'उप-केंद्र (HWC)' : 'Sub-Centre (HWC)' },
              { id: 'MMU', label: isHi ? 'सचल यूनिट (MMU)' : 'Mobile Medical Unit (MMU)' },
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTier === tier.id
                    ? 'bg-[#0d5c58] text-white font-semibold shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-slate-700'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetFilters}
            className="text-xs font-medium text-[#0d5c58] hover:text-[#094744] underline underline-offset-2"
          >
            {isHi ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
          </button>
        </div>

        {/* Row 3: Essential Services Checkboxes + Open Right Now Switch */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <span className="text-teal-700">⚡</span>
              <span>{isHi ? 'आवश्यक सेवाएं:' : 'Essential Services:'}</span>
            </span>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterMaternity}
                onChange={(e) => setFilterMaternity(e.target.checked)}
                className="rounded border-stone-300 text-teal-800 focus:ring-0"
              />
              <span>{isHi ? '24/7 प्रसव सेवा' : '24/7 Maternity & Delivery'}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterDiagnostic}
                onChange={(e) => setFilterDiagnostic(e.target.checked)}
                className="rounded border-stone-300 text-teal-800 focus:ring-0"
              />
              <span>{isHi ? 'नैदानिक प्रयोगशाला' : 'Basic Diagnostic Lab'}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterPediatric}
                onChange={(e) => setFilterPediatric(e.target.checked)}
                className="rounded border-stone-300 text-teal-800 focus:ring-0"
              />
              <span>{isHi ? 'बाल चिकित्सा' : 'Pediatric Care'}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterVaccination}
                onChange={(e) => setFilterVaccination(e.target.checked)}
                className="rounded border-stone-300 text-teal-800 focus:ring-0"
              />
              <span>{isHi ? 'टीकाकरण शिविर' : 'Vaccination Camp'}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filterDoctorOnDuty}
                onChange={(e) => setFilterDoctorOnDuty(e.target.checked)}
                className="rounded border-stone-300 text-teal-800 focus:ring-0"
              />
              <span>{isHi ? 'चिकित्सक उपस्थित' : 'Doctor On-Duty'}</span>
            </label>
          </div>

          {/* Open Right Now Toggle Switch */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-medium text-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>{isHi ? 'वर्तमान में खुला' : 'Open Right Now'}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpenNowToggle(!openNowToggle)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                openNowToggle ? 'bg-[#0d5c58]' : 'bg-stone-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  openNowToggle ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Facility Feed */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Subheader Status Line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pb-1 gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0d5c58] text-sm">
                {filteredFacilities.length} {isHi ? 'सत्यापित केंद्र उपलब्ध' : 'Verified Centers Available'}
              </span>
              <span className="text-stone-300">|</span>
              <span>{isHi ? 'आपके जीपीएस स्थान के आधार पर क्रमबद्ध' : 'Sorted by proximity to your current GPS lock'}</span>
            </div>
            <div className="flex items-center gap-1 text-[#0d7a68] font-medium">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isHi ? 'दैनिक रोस्टर सत्यापित: आज, प्रातः 08:00' : 'Daily roster synced: Today, 08:00 AM'}</span>
            </div>
          </div>

          {/* ================= CARD 1: Kishorepur Primary Health Centre ================= */}
          {filteredFacilities.some(f => f.id === 'fac-1') && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-teal-700/40 transition-all space-y-3.5">
              
              {/* Header with Type badge, status pills, distance & wait */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Green PHC Badge */}
                  <div className="w-11 h-11 rounded-xl bg-[#e6f4ea] border border-[#ceead6] text-[#137333] flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-black leading-none">+</span>
                    <span className="text-[10px] font-bold tracking-wider">PHC</span>
                  </div>

                  <div>
                    {/* Pills row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                        {isHi ? '२४ घंटे खुला' : 'Open 24 Hours'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-slate-600">
                        {isHi ? 'प्राथमिक स्वास्थ्य केंद्र' : 'Primary Health Centre'}
                      </span>
                    </div>

                    {/* Facility Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {isHi ? 'किशोरपुर प्राथमिक स्वास्थ्य केंद्र' : 'Kishorepur Primary Health Centre'}
                    </h3>

                    {/* Location & Distance */}
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="text-teal-700 font-semibold">↗ 3.2 km</span> {isHi ? 'दूर • किशोरपुर मुख्य मार्ग, सेक्टर 3' : 'away • Kishorepur Main Road, Sector 3'}
                    </p>
                  </div>
                </div>

                {/* Right access tag */}
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#e8f0fe] text-[#1967d2] border border-[#d2e3fc]">
                    <span>🚶</span> {isHi ? 'पक्की सड़क' : 'Paved Access'}
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {isHi ? 'औसत प्रतीक्षा: < 15 मिनट' : 'Avg wait: < 15 mins'}
                  </div>
                </div>
              </div>

              {/* Doctor on Duty Box */}
              <div className="bg-[#f8fafc] rounded-xl border border-stone-200 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                    alt="Dr. Ananya Sharma"
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{isHi ? 'ड्यूटी पर चिकित्सक उपस्थित' : 'Doctor On Duty Right Now'}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Dr. Ananya Sharma, MBBS
                    </div>
                    <div className="text-xs text-slate-500">
                      {isHi ? 'प्रभारी चिकित्सा अधिकारी (स्त्री एवं सामान्य रोग)' : 'Medical Officer In-Charge (Maternal & General Medicine)'}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 font-medium flex items-center gap-1 self-end sm:self-center">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isHi ? 'शिफ्ट: 08:00 - 20:00' : 'Shift: 08:00 - 20:00'}</span>
                </div>
              </div>

              {/* Available Onsite Care Pills */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-medium text-slate-500">
                  {isHi ? 'उपलब्ध स्वास्थ्य सेवाएं:' : 'Available Onsite Care:'}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#e8f0fe] text-[#1967d2] border border-[#d2e3fc] flex items-center gap-1">
                    <span>🤰</span> {isHi ? 'प्रसूति सेवा' : 'Maternal Care'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#e8f0fe] text-[#1967d2] border border-[#d2e3fc] flex items-center gap-1">
                    <span>💉</span> {isHi ? 'नियमित टीकाकरण' : 'Routine Immunization'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#e8f0fe] text-[#1967d2] border border-[#d2e3fc] flex items-center gap-1">
                    <span>🫀</span> {isHi ? 'टेली-ईसीजी सेवा' : 'Tele-ECG Direct'}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#e8f0fe] text-[#1967d2] border border-[#d2e3fc] flex items-center gap-1">
                    <span>💊</span> {isHi ? 'निःशुल्क जेनेरिक दवाएं' : 'Free Generic Pharmacy'}
                  </span>
                </div>
              </div>

              {/* Card Footer: Phone + Action Buttons */}
              <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>+91 98765 43210</span>
                  <span className="text-slate-400">{isHi ? '(क्लीनिक स्वागत कक्ष)' : '(Clinic Reception)'}</span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      const fac = facilities.find(f => f.id === 'fac-1');
                      if (fac) setDirectionsModalFac(fac);
                    }}
                    className="px-4 py-2 bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1967d2] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isHi ? 'दिशा-निर्देश' : 'Directions'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const fac = facilities.find(f => f.id === 'fac-1');
                      if (fac) onBookFacility(fac);
                    }}
                    className="px-4 py-2 bg-[#0d5c58] hover:bg-[#08423f] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isHi ? 'पर्ची / स्लॉट लें' : 'Request Slot'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= CARD 2: Bhimtal Community Health Centre (CHC) ================= */}
          {filteredFacilities.some(f => f.id === 'fac-2') && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-teal-700/40 transition-all space-y-3.5">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Green CHC Badge */}
                  <div className="w-11 h-11 rounded-xl bg-[#e6f4ea] border border-[#ceead6] text-[#137333] flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-black leading-none">+</span>
                    <span className="text-[10px] font-bold tracking-wider">CHC</span>
                  </div>

                  <div>
                    {/* Pills row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca] flex items-center gap-1">
                        <span>🚨</span> {isHi ? 'आपातकाल 24x7 खुला' : 'Emergency 24x7'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-slate-600">
                        {isHi ? 'सामुदायिक स्वास्थ्य केंद्र' : 'Community Health Centre'}
                      </span>
                    </div>

                    {/* Facility Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {isHi ? 'भीमताल सामुदायिक स्वास्थ्य केंद्र (CHC)' : 'Bhimtal Community Health Centre (CHC)'}
                    </h3>

                    {/* Location & Distance */}
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="text-teal-700 font-semibold">↗ 8.5 km</span> {isHi ? 'दूर • स्टेट हाईवे 14, डाकघर के पास' : 'away • State Highway 14, Near Post Office'}
                    </p>
                  </div>
                </div>

                {/* Inpatient Beds Tag */}
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-stone-100 text-slate-700">
                    <span>🛏️</span> {isHi ? '30 भर्ती बिस्तर' : '30 Inpatient Beds'}
                  </span>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    {isHi ? '12 बिस्तर वर्तमान में रिक्त' : '12 Beds Currently Vacant'}
                  </div>
                </div>
              </div>

              {/* 3 Clinical Facility Feature Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-lg">🚑</span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{isHi ? 'इन-हाउस एम्बुलेंस' : 'In-house Ambulance'}</div>
                    <div className="text-[11px] text-slate-500">{isHi ? 'परिसर में 24x7 वाहन तैनात' : 'Standby Vehicle On Premise'}</div>
                  </div>
                </div>

                <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-lg">🩺</span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{isHi ? 'सोनोग्राफी (अल्ट्रासाउंड)' : 'Ultrasound'}</div>
                    <div className="text-[11px] text-slate-500">{isHi ? 'प्रत्येक मंगल एवं गुरु (विशेषज्ञ)' : 'Every Tue & Thu (Specialist)'}</div>
                  </div>
                </div>

                <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-lg">🩸</span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{isHi ? 'रक्त भंडारण इकाई' : 'Blood Storage Unit'}</div>
                    <div className="text-[11px] text-slate-500">{isHi ? 'O+ / B+ उपलब्ध' : 'O+ / B+ Available'}</div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Emergency Dial + Buttons */}
              <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs font-bold text-[#b91c1c] flex items-center gap-1.5">
                  <span>🚨</span>
                  <span>{isHi ? 'आपातकालीन डायल: 108 / +91 94120 01108' : 'Emergency Dial: 108 / +91 94120 01108'}</span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      const fac = facilities.find(f => f.id === 'fac-2');
                      if (fac) setDirectionsModalFac(fac);
                    }}
                    className="px-4 py-2 bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1967d2] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{isHi ? 'दिशा-निर्देश' : 'Directions'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const fac = facilities.find(f => f.id === 'fac-2');
                      if (fac) onBookFacility(fac);
                    }}
                    className="px-4 py-2 bg-[#0d5c58] hover:bg-[#08423f] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isHi ? 'अपॉइंटमेंट लें' : 'Book Appointment'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= CARD 3: Gopalganj Health & Wellness Sub-Centre ================= */}
          {filteredFacilities.some(f => f.id === 'fac-3') && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-teal-700/40 transition-all space-y-3.5">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Blue-Slate HWC Badge */}
                  <div className="w-11 h-11 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-black leading-none">+</span>
                    <span className="text-[10px] font-bold tracking-wider">HWC</span>
                  </div>

                  <div>
                    {/* Pills row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                        {isHi ? 'शाम 5:00 बजे तक खुला' : 'Open until 5:00 PM'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-slate-600">
                        {isHi ? 'उप-केंद्र (आयुष्मान आरोग्य मंदिर)' : 'Sub-Centre (Ayushman Arogya Mandir)'}
                      </span>
                    </div>

                    {/* Facility Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {isHi ? 'गोपालगंज स्वास्थ्य एवं कल्याण उप-केंद्र' : 'Gopalganj Health & Wellness Sub-Centre'}
                    </h3>

                    {/* Location & Distance */}
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="text-teal-700 font-semibold">↗ 1.8 km</span> {isHi ? 'दूर • गोपालगंज पंचायत भवन के पास' : 'away • Walking distance from Gopalganj Panchayat Bhavan'}
                    </p>
                  </div>
                </div>

                {/* Right tag */}
                <div className="text-right shrink-0">
                  <div className="text-xs font-semibold text-slate-800">
                    {isHi ? 'पैदल: ~20 मिनट' : 'Walking: ~20 mins'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isHi ? 'ग्राम स्तरीय देखभाल' : 'Village Level Care'}
                  </div>
                </div>
              </div>

              {/* CHO Staff Box */}
              <div className="bg-[#f8fafc] rounded-xl border border-stone-200 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0d5c58] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    RK
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Rajesh Kumar (CHO)
                    </div>
                    <div className="text-xs text-slate-500">
                      {isHi ? 'सामुदायिक स्वास्थ्य अधिकारी उपस्थित • एनसीडी जांच' : 'Community Health Officer On Duty • NCD Screening'}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e6f4ea] text-[#137333] border border-[#ceead6] flex items-center gap-1 self-start sm:self-center">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isHi ? 'आज निःशुल्क रक्त शर्करा एवं बीपी जांच' : 'Free Blood Sugar & BP Screening Today'}</span>
                </span>
              </div>

              {/* Card Footer: Description + Action Buttons */}
              <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  {isHi ? 'सामान्य ओपीडी एवं निवारक स्वास्थ्य जांच बिना लंबी कतार के' : 'General OPD & Preventive Check-ups without registration queue'}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      const fac = facilities.find(f => f.id === 'fac-3');
                      if (fac) setDirectionsModalFac(fac);
                    }}
                    className="px-4 py-2 bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1967d2] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>🚶</span>
                    <span>{isHi ? 'पैदल मार्ग' : 'Walking Directions'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const fac = facilities.find(f => f.id === 'fac-3');
                      if (fac) onBookFacility(fac);
                    }}
                    className="px-4 py-2 bg-[#0d5c58] hover:bg-[#08423f] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{isHi ? 'कार्यकर्ता से संपर्क' : 'Contact Worker'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= CARD 4: Mobile Health Unit Route 4B (Van) ================= */}
          {filteredFacilities.some(f => f.id === 'fac-4') && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-teal-700/40 transition-all space-y-3.5">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Cyan MMU Van Badge */}
                  <div className="w-11 h-11 rounded-xl bg-[#ccfbf1] border border-[#99f6e4] text-[#0f766e] flex flex-col items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-wider">MMU</span>
                  </div>

                  <div>
                    {/* Pills row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e6f4ea] text-[#137333] border border-[#ceead6] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {isHi ? 'सक्रिय मार्ग पर' : 'Active En-Route'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-slate-600">
                        {isHi ? 'सचल चिकित्सा क्लिनिक' : 'Mobile Medical Clinic'}
                      </span>
                    </div>

                    {/* Facility Title */}
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {isHi ? 'मोबाइल हेल्थ यूनिट रूट 4B (सचल वैन)' : 'Mobile Health Unit Route 4B (Van)'}
                    </h3>

                    {/* Current Camp Schedule */}
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <span>📍</span>
                      <strong>{isHi ? 'आज का शिविर:' : "Today's Camp:"}</strong> {isHi ? 'चंद्रापुर ग्राम चौपाल (10:00 AM - 2:00 PM)' : 'Chandrapur Village Square (10:00 AM - 2:00 PM)'}
                    </p>
                  </div>
                </div>

                {/* Current Stopping status */}
                <div className="text-right shrink-0">
                  <div className="text-xs font-semibold text-slate-800">
                    {isHi ? 'चंद्रापुर में ठहराव जारी' : 'Stopping in Chandrapur now'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isHi ? 'अगला पड़ाव: सोनपुर हाट (2:30 PM)' : 'Next: Sonpur Hat at 2:30 PM'}
                  </div>
                </div>
              </div>

              {/* Onboard Team & Medication Vault Box */}
              <div className="bg-[#f0fdfa] rounded-xl border border-[#ccfbf1] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 flex items-center gap-1">
                    <span>👥</span> {isHi ? 'उपस्थित दल:' : 'Onboard:'}
                  </span>
                  <span>{isHi ? '1 एमबीबीएस डॉक्टर, 1 फार्मासिस्ट, 1 लैब तकनीशियन' : '1 MBBS Doctor, 1 Registered Pharmacist, 1 Lab Technician'}</span>
                </div>

                <div className="flex items-center gap-1 font-semibold text-teal-900">
                  <span className="text-teal-700">💊</span>
                  <span>{isHi ? '60+ आवश्यक दवाएं उपलब्ध' : '60+ Essential Medicines Stocked'}</span>
                </div>
              </div>

              {/* Card Footer: Vehicle Registration + Action Button */}
              <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600 font-mono">
                  {isHi ? 'वाहन संख्या: UP-32-G-8491 (राष्ट्रीय स्वास्थ्य मिशन)' : 'Vehicle Reg: UP-32-G-8491 (Government Health Mission)'}
                </div>

                <button
                  onClick={() => {
                    const fac = facilities.find(f => f.id === 'fac-4');
                    if (fac) onBookFacility(fac);
                  }}
                  className="px-4 py-2 bg-[#0d5c58] hover:bg-[#08423f] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5 self-end sm:self-auto"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{isHi ? 'सचल वैन का रूट व समय देखें' : 'View Van Live Route & Schedule'}</span>
                </button>
              </div>

            </div>
          )}

          {/* Empty fallback if search yields nothing */}
          {filteredFacilities.length === 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-slate-600">
              <Building2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="font-semibold text-slate-900">{isHi ? 'कोई स्वास्थ्य केंद्र नहीं मिला' : 'No centers found matching filter criteria'}</div>
              <p className="text-xs text-slate-500 mt-1">{isHi ? 'सभी केंद्र देखने के लिए "फ़िल्टर रीसेट करें" दबाएं।' : 'Try clicking "Reset Filters" to see all verified regional centers.'}</p>
            </div>
          )}

          {/* Official Public Notice Banner */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <span className="text-blue-600 text-base shrink-0 mt-0.5">ℹ️</span>
              <div>
                <strong className="text-slate-900">{isHi ? 'आधिकारिक सार्वजनिक सूचना:' : 'Official Public Notice:'}</strong>{' '}
                {isHi 
                  ? 'स्वास्थ्य केंद्रों के खुलने का समय एवं डॉक्टरों की उपलब्धता जिला मुख्य चिकित्सा अधिकारी द्वारा प्रतिदिन प्रातः 08:00 बजे सत्यापित की जाती है।'
                  : 'Facility hours and doctor availability updated every morning at 08:00 AM by local district health authorities.'
                }
              </div>
            </div>

            <button
              onClick={() => {
                setRefreshNotice(true);
                setTimeout(() => setRefreshNotice(false), 800);
              }}
              className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-slate-800 rounded-full font-medium text-xs flex items-center gap-1.5 shrink-0 shadow-2xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${refreshNotice ? 'animate-spin' : ''}`} />
              <span>{isHi ? 'उपलब्धता रीफ्रेश करें' : 'Refresh Availability'}</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Geographic Map & Advisory Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Card 1: Interactive Geographic Map Widget */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            
            {/* Header */}
            <div className="p-3.5 bg-stone-50/90 border-b border-stone-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>{isHi ? 'इंटरैक्टिव भौगोलिक मानचित्र' : 'Interactive Geographic Map'}</span>
              </div>
              <button 
                onClick={() => setExpandedMap(true)}
                className="text-slate-500 hover:text-slate-800 text-[11px] flex items-center gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isHi ? 'बड़ा देखें' : 'Expand View'}</span>
              </button>
            </div>

            {/* Map Canvas matching the green topographic screenshot */}
            <div className="relative w-full h-[290px] bg-[#e5f5e0] overflow-hidden select-none">
              
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                {/* Terrain contours & zones */}
                <rect width="100" height="100" fill="#e8f5e9" />
                
                {/* Valley green patch */}
                <path d="M 0,30 Q 30,10 70,25 T 100,50 L 100,100 L 0,100 Z" fill="#dcedc8" opacity="0.6" />
                <path d="M 10,70 Q 40,50 80,75 L 100,100 L 0,100 Z" fill="#c8e6c9" opacity="0.7" />

                {/* River Basin */}
                <path
                  d="M 5,20 Q 30,35 48,55 T 95,78"
                  fill="none"
                  stroke="#81d4fa"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* Arterial Paved Roads */}
                <path d="M 20,40 L 45,35 L 75,45 L 88,30" fill="none" stroke="#fbc02d" strokeWidth="2" strokeLinecap="round" />
                <path d="M 45,35 L 52,65 L 72,78" fill="none" stroke="#fbc02d" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 25,60 L 45,35" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="1,1" />

                {/* Village / Facility points */}
                {/* Kishorepur PHC */}
                <circle cx="45" cy="35" r="3" fill="#137333" stroke="#ffffff" strokeWidth="0.8" />
                <rect x="30" y="27" width="30" height="6" rx="2" fill="#ffffff" opacity="0.9" />
                <text x="45" y="31.5" fill="#1b5e20" fontSize="2.6" fontWeight="bold" textAnchor="middle">
                  {isHi ? 'किशोरपुर पीएचसी' : 'Kishorepur PHC'}
                </text>

                {/* Bhimtal CHC */}
                <circle cx="75" cy="45" r="3.2" fill="#b91c1c" stroke="#ffffff" strokeWidth="0.8" />
                <rect x="62" y="38" width="28" height="6" rx="2" fill="#ffffff" opacity="0.9" />
                <text x="76" y="42.5" fill="#b91c1c" fontSize="2.6" fontWeight="bold" textAnchor="middle">
                  {isHi ? 'भीमताल सीएचसी ☩' : 'Bhimtal CHC ☩'}
                </text>

                {/* Gopalganj Sub-centre */}
                <circle cx="25" cy="60" r="2.5" fill="#0284c7" stroke="#ffffff" strokeWidth="0.7" />
                <text x="25" y="67" fill="#0f172a" fontSize="2.2" fontWeight="600" textAnchor="middle">
                  {isHi ? 'गोपालगंज उप-केंद्र' : 'Gopalganj HWC'}
                </text>

                {/* Chandrapur (MMU Stop) */}
                <circle cx="52" cy="65" r="2.8" fill="#0d9488" stroke="#ffffff" strokeWidth="0.7" />
                <text x="52" y="72" fill="#0f172a" fontSize="2.2" fontWeight="600" textAnchor="middle">
                  {isHi ? 'चंद्रापुर वैन स्टॉप' : 'Chandrapur MMU'}
                </text>

                {/* Neighboring village names */}
                <text x="20" y="24" fill="#558b2f" fontSize="2.2" fontWeight="500">Saina</text>
                <text x="35" y="16" fill="#558b2f" fontSize="2.2" fontWeight="500">Khat Khera</text>
                <text x="65" y="18" fill="#558b2f" fontSize="2.2" fontWeight="500">Dungarpur</text>
                <text x="82" y="22" fill="#558b2f" fontSize="2.2" fontWeight="500">Panwaria</text>
                <text x="85" y="55" fill="#558b2f" fontSize="2.2" fontWeight="500">Lalu Nagla</text>
                <text x="75" y="66" fill="#558b2f" fontSize="2.2" fontWeight="500">Shahzad Nagar</text>

                {/* Live GPS Active dot */}
                <circle cx="48" cy="38" r="4.5" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
                <circle cx="48" cy="38" r="2" fill="#10b981" stroke="#ffffff" strokeWidth="0.6" />
              </svg>

              {/* Top GPS Active Badge on Map */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-slate-800 shadow-xs flex items-center gap-1.5 border border-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{isHi ? 'सक्रिय जीपीएस' : 'Live GPS Active'}</span>
              </div>

              {/* Bottom Road condition bar */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs flex items-center justify-between shadow-xs border border-stone-200">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium text-[11px]">
                  <span>🛣️</span>
                  <span>{isHi ? 'हर मौसम में पक्की सड़क उपलब्ध' : 'All-weather paved road access'}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e6f4ea] text-[#137333]">
                  {isHi ? 'सुगम मार्ग' : 'Passable'}
                </span>
              </div>

            </div>

          </div>

          {/* Card 2: Road Conditions & Terrain Advisory */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <span className="text-teal-700">⛰️</span>
              <span>{isHi ? 'सड़क स्थिति एवं भू-भाग परामर्श' : 'Road Conditions & Terrain Advisory'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isHi 
                ? 'रामपुर से किशोरपुर पीएचसी और भीमताल सीएचसी को जोड़ने वाले सभी मुख्य मार्ग पक्के हैं। हालिया वर्षा के उपरांत जलभराव की कोई समस्या नहीं है। बस स्टैंड से प्रत्येक २० मिनट पर ऑटो व ग्रामीण बसें उपलब्ध हैं।'
                : 'All arterial roads connecting Rampur to Kishorepur PHC and Bhimtal CHC are paved (pucca road). No waterlogging reported after recent rainfall. Auto-rickshaw and rural bus connectivity operational every 20 minutes from the bus stand.'
              }
            </p>
          </div>

          {/* Card 3: Need Guidance on Which Center to Visit? */}
          <div className="bg-[#e6f4ea] border border-[#ceead6] rounded-2xl p-4 text-slate-800 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#137333] text-white flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {isHi ? 'कौन से केंद्र जाएं, मार्गदर्शन चाहिए?' : 'Need Guidance on Which Center to Visit?'}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {isHi 
                    ? 'जिला स्वास्थ्य नेविगेटर से संपर्क करें जो बिस्तरों की उपलब्धता, एम्बुलेंस स्थिति जांच सकते हैं या आपका स्लॉट बुक कर सकते हैं।'
                    : 'Speak with a district healthcare navigator who can check bed availability, ambulance status, or schedule your visit.'
                  }
                </p>
              </div>
            </div>

            <a
              href="tel:104"
              className="block text-xs font-bold text-[#137333] hover:text-[#0b4d21] pt-1 flex items-center justify-between"
            >
              <span>{isHi ? 'स्वास्थ्य हेल्पलाइन: 104 (निःशुल्क)' : 'Call Health Helpline: 104 (Toll-Free)'}</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 4: Official Registry Badge */}
          <div className="bg-white rounded-xl border border-stone-200 p-3 flex items-center gap-2 text-xs text-slate-600 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#137333] shrink-0" />
            <span className="font-medium text-[11px]">
              {isHi ? 'जिला स्वास्थ्य प्राधिकरण आधिकारिक रियल-टाइम रजिस्ट्री' : 'District Health Authority Official Real-Time Registry'}
            </span>
          </div>

        </div>

      </div>

      {/* Rural Directions Modal */}
      {directionsModalFac && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 sm:p-6 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  📍
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {isHi ? 'मार्ग एवं दिशा-निर्देश' : 'Route & Directions Guidance'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isHi ? directionsModalFac.nameHi : directionsModalFac.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDirectionsModalFac(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-slate-900 mb-1">
                  {isHi ? 'भू-भाग एवं लैंडमार्क मार्ग:' : 'Terrain & Landmark Route:'}
                </div>
                <p className="leading-relaxed">
                  {isHi ? directionsModalFac.directionsGuideHi : directionsModalFac.directionsGuideEn}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-slate-500 block">{isHi ? 'दूरी:' : 'Distance:'}</span>
                  <strong className="text-slate-900">{directionsModalFac.distanceKm} km {isHi ? 'दूर' : 'away'}</strong>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-slate-500 block">{isHi ? 'यात्रा समय:' : 'Travel Duration:'}</span>
                  <strong className="text-slate-900">{directionsModalFac.travelTimeMin} {isHi ? 'मिनट लगभग' : 'minutes approx'}</strong>
                </div>
              </div>

              <div className="p-3 bg-[#e6f4ea] border border-[#ceead6] rounded-xl text-[#137333]">
                <strong className="block mb-0.5">{isHi ? 'सड़क की स्थिति:' : 'Access Condition:'}</strong>
                <span>{isHi ? 'स्टेट हाईवे बस स्टैंड से सीधे जोड़ने वाली हर मौसम में चालू पक्की सड़क।' : 'All-weather pucca paved road directly connecting from state highway bus stop.'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setDirectionsModalFac(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const fac = directionsModalFac;
                  setDirectionsModalFac(null);
                  onBookFacility(fac);
                }}
                className="px-4 py-2 bg-[#0d5c58] hover:bg-[#08423f] text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                {isHi ? 'पर्ची / टोकन बुक करें' : 'Book Appointment / Token'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Expanded Map Modal */}
      {expandedMap && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-5 border border-stone-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-700" />
                <span>{isHi ? 'रामपुर जिला व्यापक जन स्वास्थ्य नेटवर्क मानचित्र' : 'Rampur District Comprehensive Public Health Network'}</span>
              </div>
              <button onClick={() => setExpandedMap(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-[420px] w-full mt-4 rounded-xl overflow-hidden relative">
              <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <rect width="100" height="100" fill="#e8f5e9" />
                <path d="M 0,30 Q 30,10 70,25 T 100,50 L 100,100 L 0,100 Z" fill="#dcedc8" opacity="0.6" />
                <path d="M 5,20 Q 30,35 48,55 T 95,78" fill="none" stroke="#81d4fa" strokeWidth="4" />
                <path d="M 20,40 L 45,35 L 75,45 L 88,30" fill="none" stroke="#fbc02d" strokeWidth="2.5" />
                <circle cx="45" cy="35" r="4" fill="#137333" stroke="#fff" strokeWidth="1" />
                <text x="45" y="30" fill="#1b5e20" fontSize="3.5" fontWeight="bold" textAnchor="middle">{isHi ? 'किशोरपुर पीएचसी' : 'Kishorepur PHC'}</text>
                <circle cx="75" cy="45" r="4" fill="#b91c1c" stroke="#fff" strokeWidth="1" />
                <text x="75" y="40" fill="#b91c1c" fontSize="3.5" fontWeight="bold" textAnchor="middle">{isHi ? 'भीमताल सीएचसी ☩' : 'Bhimtal CHC ☩'}</text>
                <circle cx="25" cy="60" r="3" fill="#0284c7" stroke="#fff" strokeWidth="1" />
                <text x="25" y="67" fill="#0f172a" fontSize="3" fontWeight="600" textAnchor="middle">{isHi ? 'गोपालगंज उप-केंद्र' : 'Gopalganj HWC'}</text>
                <circle cx="52" cy="65" r="3.5" fill="#0d9488" stroke="#fff" strokeWidth="1" />
                <text x="52" y="73" fill="#0f172a" fontSize="3" fontWeight="600" textAnchor="middle">{isHi ? 'चंद्रापुर वैन स्टॉप' : 'Chandrapur MMU'}</text>
              </svg>
            </div>

            <div className="pt-3 border-t border-stone-200 mt-4 flex justify-end">
              <button
                onClick={() => setExpandedMap(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold rounded-lg"
              >
                {isHi ? 'मानचित्र बंद करें' : 'Close Map'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
