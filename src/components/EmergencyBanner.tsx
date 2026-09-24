import React from 'react';
import { 
  PhoneCall, 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  ExternalLink, 
  MapPin, 
  Stethoscope, 
  Clock,
  HeartPulse
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface EmergencyBannerProps {
  language: Language;
  onOpenModal: () => void;
  isOpen: boolean;
  onCloseModal: () => void;
  onSelectFacilityById: (facilityId: string) => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  language,
  onOpenModal,
  isOpen,
  onCloseModal,
  onSelectFacilityById,
}) => {
  const t = translations[language];

  return (
    <>
      {/* Top Prominent Emergency & Alert Banner */}
      <div 
        onClick={onOpenModal}
        className="bg-[#b91c1c] hover:bg-[#a81a1a] text-white px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors text-center flex items-center justify-center gap-2 shadow-xs"
      >
        <span className="inline-block text-amber-300 animate-pulse">✱</span>
        <span>
          {language === 'hi' ? (
            <>
              <strong>आपातकालीन सूचना:</strong> जिले के सभी ग्रामीण केंद्रों पर त्वरित प्रतिक्रिया दल तैनात हैं। सीधे <strong>108</strong> या <strong>112</strong> डायल करें।
            </>
          ) : (
            <>
              <strong>Emergency Alert:</strong> Immediate response teams on standby across district rural centers. Dial <strong>108</strong> or <strong>112</strong> directly.
            </>
          )}
        </span>
      </div>

      {/* Emergency Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-5 sm:p-7 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.emergency.quickTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'hi' 
                      ? 'गंभीर आपातकाल में बिना देरी किए इन सरकारी टोल-फ्री नंबरों पर संपर्क करें' 
                      : 'Immediate toll-free government hotlines for acute emergencies & patient transport'}
                  </p>
                </div>
              </div>
              <button
                onClick={onCloseModal}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-stone-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Dial Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
              
              <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-rose-900 uppercase tracking-wide">
                    {language === 'hi' ? 'निःशुल्क एम्बुलेंस' : 'Free Ambulance'}
                  </div>
                  <div className="text-2xl font-black text-rose-700 tracking-tight">108</div>
                  <div className="text-xs text-rose-800">
                    {language === 'hi' ? 'दुर्घटना, आघात, हृदय, प्रसव' : 'Trauma, Cardiac, Maternity'}
                  </div>
                </div>
                <a
                  href="tel:108"
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
                </a>
              </div>

              <div className="p-3.5 rounded-lg border border-teal-200 bg-teal-50/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-teal-900 uppercase tracking-wide">
                    {language === 'hi' ? 'जननी शिशु सुरक्षा' : 'Janani Shishu Transport'}
                  </div>
                  <div className="text-2xl font-black text-teal-700 tracking-tight">102</div>
                  <div className="text-xs text-teal-800">
                    {language === 'hi' ? 'गर्भवती एवं 1 वर्ष तक के शिशु' : 'Pregnant Mothers & Newborns'}
                  </div>
                </div>
                <a
                  href="tel:102"
                  className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
                </a>
              </div>

              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    {language === 'hi' ? 'स्वास्थ्य परामर्श हेल्पलाइन' : 'Medical Tele-Advice'}
                  </div>
                  <div className="text-2xl font-black text-slate-800 tracking-tight">104</div>
                  <div className="text-xs text-slate-600">
                    {language === 'hi' ? '24x7 डॉक्टर सलाह व दवा पूछताछ' : '24x7 Tele-counseling & drug info'}
                  </div>
                </div>
                <a
                  href="tel:104"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
                </a>
              </div>

              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    {language === 'hi' ? 'राष्ट्रीय आपात नंबर' : 'National Emergency'}
                  </div>
                  <div className="text-2xl font-black text-slate-800 tracking-tight">112</div>
                  <div className="text-xs text-slate-600">
                    {language === 'hi' ? 'पुलिस, अग्निशमन व आपदा राहत' : 'Unified Police, Fire & Rescue'}
                  </div>
                </div>
                <a
                  href="tel:112"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
                </a>
              </div>

            </div>

            {/* Red Flag Symptoms Guide */}
            <div className="rounded-lg bg-amber-50/70 border border-amber-200 p-4 mb-4">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{t.emergency.triageTitle}</span>
              </div>
              <p className="text-xs text-amber-800 mb-2.5">
                {t.emergency.triageSub}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {t.emergency.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold mt-0.5">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Action to Nearest Antivenom & Trauma Center */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-200">
              <button
                onClick={() => {
                  onSelectFacilityById('fac-2');
                  onCloseModal();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>
                  {language === 'hi' 
                    ? 'निकटतम 24x7 एंटीवेनम अस्पताल (CHC बागेश्वर) देखें' 
                    : 'View Nearest 24x7 Antivenom Hospital (CHC Bageshwar)'}
                </span>
              </button>

              <button
                onClick={onCloseModal}
                className="w-full sm:w-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-lg"
              >
                {language === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>

            {/* Medical Disclaimer Note */}
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-slate-500 text-center">
              {t.disclaimer.bannerText}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
