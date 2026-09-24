import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  HeartPulse, 
  Phone, 
  ShieldAlert, 
  GraduationCap, 
  ExternalLink,
  Info
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenEmergency: () => void;
  onOpenProjectModal: () => void;
  onOpenDisclaimer: () => void;
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenEmergency,
  onOpenProjectModal,
  onOpenDisclaimer,
  setCurrentTab,
}) => {
  const t = translations[language];

  return (
    <footer className="mt-16 bg-white border-t border-stone-200 text-xs text-slate-600">
      
      {/* Top Banner Notice */}
      <div className="bg-stone-50 border-b border-stone-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-700">
            <Info className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              {language === 'hi' 
                ? 'मेदवे ग्रामीण जन स्वास्थ्य प्रोटोटाइप · यह चिकित्सीय नुस्खा या निदान प्रदान नहीं करता।' 
                : 'Medway Rural Public Health Prototype · Informational directory & appointment scheduling only.'}
            </span>
          </div>

          <button
            onClick={onOpenDisclaimer}
            className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2"
          >
            {language === 'hi' ? 'पूर्ण अस्वीकरण पढ़ें' : 'Read Full Disclaimer'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-slate-900">
                {language === 'hi' ? 'मेदवे (Medway)' : 'Medway'}
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              {language === 'hi'
                ? 'ग्रामीण एवं दूरदराज के क्षेत्रों में प्राथमिक स्वास्थ्य सेवाओं, दवाओं की उपलब्धता और निशुल्क रेफरल सुविधा हेतु समर्पित डिजिटल मंच।'
                : 'Empowering rural citizens, frontline ASHA workers, and primary health centres with accessible public health navigation.'}
            </p>
            <div className="text-[11px] text-teal-800 font-medium">
              {t.brand.initiative}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              {language === 'hi' ? 'मुख्य अनुभाग' : 'Platform Navigation'}
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <button 
                  onClick={() => setCurrentTab('facilities')}
                  className="hover:text-teal-700 transition-colors"
                >
                  {t.nav.facilities}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('preventive')}
                  className="hover:text-teal-700 transition-colors"
                >
                  {t.nav.preventive}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('appointment')}
                  className="hover:text-teal-700 transition-colors"
                >
                  {t.nav.appointment}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('feedback')}
                  className="hover:text-teal-700 transition-colors"
                >
                  {t.nav.feedback}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('dashboard')}
                  className="hover:text-teal-700 transition-colors"
                >
                  {t.nav.dashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency Contacts */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              {language === 'hi' ? 'आपातकालीन सेवाएं (24x7)' : 'National Emergency Helplines'}
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="tel:108" className="hover:text-rose-600 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>108 - {language === 'hi' ? 'आपातकालीन एम्बुलेंस' : 'Emergency Ambulance'}</span>
                </a>
              </li>
              <li>
                <a href="tel:102" className="hover:text-teal-700 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span>102 - {language === 'hi' ? 'जननी शिशु सुरक्षा वाहन' : 'Janani Shishu Transport'}</span>
                </a>
              </li>
              <li>
                <a href="tel:104" className="hover:text-slate-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>104 - {language === 'hi' ? 'स्वास्थ्य परामर्श सेवा' : 'Medical Advice Hotline'}</span>
                </a>
              </li>
              <li>
                <a href="tel:112" className="hover:text-slate-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>112 - {language === 'hi' ? 'एकीकृत आपातकालीन नंबर' : 'National Universal 112'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Academic Project Presentation */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              {language === 'hi' ? 'कॉलेज प्रोजेक्ट प्रस्तुति' : 'College Presentation'}
            </h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {language === 'hi'
                ? 'शैक्षणिक मूल्यांकन व वायवा हेतु संपूर्ण सिस्टम डिजाइन तथा पायथन + स्ट्रीमलिट कोड उपलब्ध।'
                : 'Built for academic presentation, lab viva, and public health technology research.'}
            </p>
            <button
              onClick={onOpenProjectModal}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold rounded-lg border border-stone-300 flex items-center gap-1.5 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
              <span>{language === 'hi' ? 'पायथन / स्ट्रीमलिट कोड देखें' : 'View Python + Streamlit Code'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © 2026 Medway Prototype. Built for rural public health equity.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenDisclaimer} className="hover:text-slate-600">
              {language === 'hi' ? 'अस्वीकरण' : 'Disclaimer'}
            </button>
            <span>·</span>
            <button onClick={onOpenEmergency} className="hover:text-slate-600">
              {language === 'hi' ? 'आपातकाल' : 'Emergency Triage'}
            </button>
            <span>·</span>
            <button onClick={onOpenProjectModal} className="hover:text-slate-600">
              {language === 'hi' ? 'सिस्टम वास्तुकला' : 'Architecture'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
