import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldAlert, X, AlertTriangle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-5 sm:p-6 border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-start justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {t.disclaimer.modalTitle}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 text-xs text-slate-600 space-y-3 leading-relaxed">
          <p className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-950 font-medium">
            {t.disclaimer.bannerText}
          </p>

          <p>
            {t.disclaimer.fullText}
          </p>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-slate-700">
            <strong className="block text-slate-900 mb-1">
              {language === 'hi' ? 'आपातकालीन सहायता:' : 'Emergency Assistance:'}
            </strong>
            <span>
              {language === 'hi'
                ? 'यदि किसी मरीज को सीने में तेज दर्द, सांस लेने में तकलीफ, सर्पदंश, या अत्यधिक रक्तस्राव हो, तो बिना समय गंवाए 108 डायल करें या निकटतम 24x7 अस्पताल पहुंचें।'
                : 'If a patient exhibits acute chest pain, shortness of breath, snakebite, or severe trauma, call 108 immediately or transport them directly to the nearest 24/7 Community Health Centre.'}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs"
          >
            {t.disclaimer.understood}
          </button>
        </div>

      </div>
    </div>
  );
};
