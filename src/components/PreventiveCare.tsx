import React, { useState, useEffect } from 'react';
import { PreventiveGuide, Language } from '../types';
import { translations } from '../data/translations';
import { immunizationScheduleByAge } from '../data/mockData';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Baby, 
  HeartPulse, 
  Activity, 
  AlertTriangle, 
  Stethoscope, 
  Printer, 
  CheckCircle2, 
  Info,
  Calendar,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface PreventiveCareProps {
  guides: PreventiveGuide[];
  language: Language;
}

export const PreventiveCare: React.FC<PreventiveCareProps> = ({
  guides,
  language,
}) => {
  const t = translations[language];

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('birth');
  const [isPlayingAudioId, setIsPlayingAudioId] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('prev-1');
  const [audioNotice, setAudioNotice] = useState<string | null>(null);

  // Web Speech Synthesis Audio
  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      setAudioNotice(
        language === 'hi' 
          ? 'आपके ब्राउज़र में ऑडियो वाचन सपोर्ट उपलब्ध नहीं है।' 
          : 'Audio speech reading is not supported on this browser.'
      );
      setTimeout(() => setAudioNotice(null), 4000);
      return;
    }

    if (isPlayingAudioId === id) {
      window.speechSynthesis.cancel();
      setIsPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlayingAudioId(null);
    };

    utterance.onerror = () => {
      setIsPlayingAudioId(null);
    };

    setIsPlayingAudioId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const filteredGuides = selectedCategory === 'all'
    ? guides
    : guides.filter(g => g.category === selectedCategory);

  const currentAgeSchedule = immunizationScheduleByAge.find(s => s.ageKey === selectedAge) || immunizationScheduleByAge[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby':
        return Baby;
      case 'HeartPulse':
        return HeartPulse;
      case 'Activity':
        return Activity;
      case 'AlertTriangle':
        return AlertTriangle;
      case 'Stethoscope':
        return Stethoscope;
      default:
        return ShieldCheck;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {audioNotice && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in">
          <span>{audioNotice}</span>
          <button 
            onClick={() => setAudioNotice(null)} 
            className="text-amber-700 hover:text-amber-950 font-bold ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              {language === 'hi' ? 'सामुदायिक जन स्वास्थ्य शिक्षा' : 'Public Health Knowledge'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.preventive.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.preventive.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 border border-stone-200"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.preventive.printGuide}</span>
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी विषय' : 'All Topics' },
            { id: 'maternal', label: language === 'hi' ? 'मातृ एवं प्रसव' : 'Maternal ANC' },
            { id: 'immunization', label: language === 'hi' ? 'बाल टीकाकरण' : 'Immunization' },
            { id: 'fevers', label: language === 'hi' ? 'मौसमी बुखार / डेंगू' : 'Vector Fevers' },
            { id: 'water_hygiene', label: language === 'hi' ? 'स्वच्छ जल व ORS' : 'Water & ORS' },
            { id: 'first_aid', label: language === 'hi' ? 'सांप-बिच्छू प्राथमिक उपचार' : 'Snakebite First Aid' },
            { id: 'elder_care', label: language === 'hi' ? 'बुजुर्ग बीपी/शुगर' : 'Elder Care' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Child Immunization Schedule Calculator */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wide">
              {language === 'hi' ? 'राष्ट्रीय टीकाकरण मिशन' : 'Universal Immunization Programme'}
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.preventive.viewImmunization}
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {language === 'hi' ? 'सभी सरकारी स्वास्थ्य केंद्रों पर 100% निशुल्क' : '100% Free at all PHCs & Health Days'}
          </span>
        </div>

        {/* Age Selector Slider Buttons */}
        <div className="mt-4">
          <label className="text-xs font-medium text-slate-700 block mb-2">
            {t.preventive.selectAge}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {immunizationScheduleByAge.map((item) => (
              <button
                key={item.ageKey}
                onClick={() => setSelectedAge(item.ageKey)}
                className={`py-2 px-2 text-center text-xs font-medium rounded-lg border transition-all ${
                  selectedAge === item.ageKey
                    ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                    : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {language === 'hi' ? item.ageLabelHi : item.ageLabelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Due Vaccines Table */}
        <div className="mt-4 bg-stone-50/70 rounded-lg border border-stone-200 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-slate-500 bg-stone-100/80">
                <th className="py-2.5 px-3 font-semibold">{t.preventive.vaccineName}</th>
                <th className="py-2.5 px-3 font-semibold">{t.preventive.protectsAgainst}</th>
                <th className="py-2.5 px-3 font-semibold">{t.preventive.dose}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-slate-700">
              {currentAgeSchedule.vaccines.map((v, i) => (
                <tr key={i} className="hover:bg-white/60">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{v.name}</td>
                  <td className="py-2.5 px-3">{language === 'hi' ? v.protectionHi : v.protectionEn}</td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{v.dose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preventive Guidance Guides List */}
      <div className="space-y-4">
        {filteredGuides.map((guide) => {
          const Icon = getCategoryIcon(guide.iconName);
          const isPlaying = isPlayingAudioId === guide.id;
          const isExpanded = activeAccordion === guide.id;

          const audioText = language === 'hi' ? guide.audioTextHi : guide.audioTextEn;

          return (
            <div 
              key={guide.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs transition-all"
            >
              
              {/* Accordion / Card Header */}
              <div 
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                onClick={() => setActiveAccordion(isExpanded ? null : guide.id)}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    {/* Clean unboxed category label */}
                    <div className="text-xs font-semibold text-teal-800 mb-0.5">
                      {language === 'hi' ? guide.categoryHi : guide.categoryEn}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      {language === 'hi' ? guide.titleHi : guide.titleEn}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                  {/* Audio Readout Tool */}
                  <button
                    onClick={() => speakText(guide.id, audioText)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      isPlaying
                        ? 'bg-teal-700 text-white border-teal-700 animate-pulse'
                        : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                    }`}
                    title={isPlaying ? t.preventive.stopAudio : t.preventive.audioReader}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-700" />}
                    <span>{isPlaying ? t.preventive.stopAudio : t.preventive.audioReader}</span>
                  </button>

                  <button
                    onClick={() => setActiveAccordion(isExpanded ? null : guide.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
                    aria-label="Expand guide details"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="px-5 pb-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi' ? guide.summaryHi : guide.summaryEn}
              </div>

              {/* Expanded Advice & Warning Signs */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 space-y-4 text-xs">
                  
                  {/* Step-by-Step Guidance */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4 text-teal-700" />
                      <span>{language === 'hi' ? 'महत्वपूर्ण दिशानिर्देश एवं सावधानियां:' : 'Key Preventive Steps & Protocols:'}</span>
                    </h4>
                    <ul className="space-y-1.5 text-slate-700 pl-1">
                      {(language === 'hi' ? guide.keyStepsHi : guide.keyStepsEn).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-teal-700 font-bold shrink-0 mt-0.5">•</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Red Flag Warning Signs */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <h4 className="font-bold text-amber-950 mb-1.5 flex items-center gap-1.5 text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>{language === 'hi' ? 'खतरे के लक्षण (तुरंत अस्पताल जाएं):' : 'Emergency Danger Signs (Seek Care Promptly):'}</span>
                    </h4>
                    <ul className="space-y-1 text-slate-700">
                      {(language === 'hi' ? guide.warningSignsHi : guide.warningSignsEn).map((warn, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold shrink-0">•</span>
                          <span>{warn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Non-Diagnostic Disclaimer Box */}
      <div className="rounded-xl border border-stone-200 bg-stone-100/60 p-4 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-900 block">
            {t.preventive.symptomCheckerTitle}
          </span>
          <p className="leading-relaxed">
            {t.preventive.symptomWarning} {t.disclaimer.bannerText}
          </p>
        </div>
      </div>

    </div>
  );
};
