import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { STREAMLIT_CODE_TEMPLATE } from '../data/mockData';
import { 
  GraduationCap, 
  X, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Layers, 
  Server, 
  Smartphone, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface CollegePresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CollegePresentationModal: React.FC<CollegePresentationModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'viva'>('overview');
  const [copied, setCopied] = useState(false);
  const t = translations[language];

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(STREAMLIT_CODE_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([STREAMLIT_CODE_TEMPLATE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medway_streamlit.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full p-5 sm:p-7 border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.project.title}
              </h3>
              <p className="text-xs text-slate-500">
                {t.project.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-stone-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-1.5 pt-4 pb-2 border-b border-stone-100 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रोजेक्ट रूपरेखा' : 'Academic Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.project.streamlitTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'viva'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'वायवा प्रश्नोत्तर' : 'Viva Prep QA'}</span>
          </button>
        </div>

        {/* Tab 1: Academic Overview */}
        {activeTab === 'overview' && (
          <div className="py-4 space-y-4 text-xs text-slate-700">
            
            {/* Problem Statement Box */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">
                1. {t.project.problemTitle}
              </h4>
              <p className="leading-relaxed text-slate-600">
                {t.project.problemText}
              </p>
            </div>

            {/* Architecture Principles */}
            <div className="p-4 bg-teal-50/50 rounded-lg border border-teal-200/80 space-y-2">
              <h4 className="font-bold text-teal-950 text-sm">
                2. {t.project.architectureTitle}
              </h4>
              <ul className="space-y-1.5 pl-1">
                {t.project.architecturePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-700 font-bold shrink-0 mt-0.5">•</span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Stakeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="font-bold text-slate-900 mb-1">
                  {language === 'hi' ? 'ग्रामीण नागरिक एवं परिवार' : 'Rural Citizens'}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {language === 'hi' 
                    ? 'सुदूर क्षेत्रों से बिना भटके निकटतम चालू अस्पताल, डॉक्टर व दवा की सटीक जानकारी प्राप्त करना।' 
                    : 'Locate verified health facilities, check medicine stock, and get digital appointment slips.'}
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="font-bold text-slate-900 mb-1">
                  {language === 'hi' ? 'आशा एवं एएनएम कार्यकर्ता' : 'ASHA / ANM Workers'}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {language === 'hi' 
                    ? 'गांव की गर्भवती महिलाओं और बच्चों के टीकाकरण व संस्थागत प्रसव का डिजिटल समन्वय।' 
                    : 'Assist villagers with registration, immunization tracking, and 102 transport.'}
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="font-bold text-slate-900 mb-1">
                  {language === 'hi' ? 'प्रभारी चिकित्सा अधिकारी (MOIC)' : 'Public Health Admins'}
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {language === 'hi' 
                    ? 'ब्लॉक स्तर पर दवाओं की कमी का पूर्व-आकलन और मौसमी बुखार के प्रकोप की निगरानी।' 
                    : 'Monitor footfall, prevent essential drug stockouts, and audit patient grievances.'}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Python + Streamlit Code */}
        {activeTab === 'code' && (
          <div className="py-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs text-slate-600">
                {t.project.streamlitDesc}
              </p>
              
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-md border border-stone-300 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.project.codeCopied : t.project.copyCode}</span>
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.project.downloadPython}</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-lg bg-slate-900 p-4 text-slate-200 font-mono text-xs max-h-96 overflow-y-auto border border-slate-800 select-all">
              <pre>{STREAMLIT_CODE_TEMPLATE}</pre>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-slate-600 flex items-center justify-between">
              <span><strong>How to run locally:</strong> <code className="bg-stone-200 px-1.5 py-0.5 rounded text-slate-800">pip install streamlit pandas</code> followed by <code className="bg-stone-200 px-1.5 py-0.5 rounded text-slate-800">streamlit run medway_streamlit.py</code></span>
              <span className="text-teal-700 font-semibold">Ready for submission</span>
            </div>
          </div>
        )}

        {/* Tab 3: Viva Questions & Evaluation Guide */}
        {activeTab === 'viva' && (
          <div className="py-4 space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 text-sm">
              College Viva & Evaluation Questions (Ready Answers)
            </h4>

            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-slate-900 block mb-1">
                  Q1: Why is a digital health platform specifically needed for rural underserved areas?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  A: Unlike urban settings with abundant private clinics, rural patients travel 10-40 km across hilly or unpaved terrain only to discover a PHC has no doctor on duty or medicines are out of stock. Medway provides real-time facility visibility, medicine stock indices, and verified SMS appointment tokens to eliminate wasted travel.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-slate-900 block mb-1">
                  Q2: How does the system address digital illiteracy and regional language barriers?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  A: Medway features seamless bilingual English-Hindi localization and integrates the Web Speech API for voice readout. Community ASHA workers can use the platform on low-cost smartphones to book tokens on behalf of illiterate villagers.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <strong className="text-slate-900 block mb-1">
                  Q3: What medical safety and non-diagnostic disclaimers are in place?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  A: The prototype strictly adheres to ethical public health guidelines: it never offers algorithmic diagnostic claims or prescription drugs. Instead, it directs patients to certified Primary Health Centres, displays 108/102 emergency ambulance numbers, and highlights red-flag danger signs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-lg"
          >
            {language === 'hi' ? 'वापस जाएं' : 'Return to App'}
          </button>
        </div>

      </div>
    </div>
  );
};
