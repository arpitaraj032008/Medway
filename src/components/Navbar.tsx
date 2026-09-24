import React, { useState } from 'react';
import { 
  HeartPulse, 
  PhoneCall, 
  Globe, 
  GraduationCap, 
  Menu, 
  X, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenEmergency: () => void;
  onOpenProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenEmergency,
  onOpenProjectModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      id: 'dashboard', 
      label: language === 'hi' ? 'अवलोकन एवं आंकड़े' : 'Overview & Stats' 
    },
    { 
      id: 'facilities', 
      label: language === 'hi' ? 'स्वास्थ्य केंद्र खोजें' : 'Facility Finder' 
    },
    { 
      id: 'preventive', 
      label: language === 'hi' ? 'स्वास्थ्य मार्गदर्शिका' : 'Health Guides' 
    },
    { 
      id: 'appointment', 
      label: language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment' 
    },
    { 
      id: 'feedback', 
      label: language === 'hi' ? 'मरीज़ प्रतिक्रिया' : 'Patient Feedback' 
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('facilities')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              {/* Green plus emblem */}
              <div className="w-10 h-10 rounded-lg bg-[#0d7a68] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0a6556] transition-colors">
                <span className="text-2xl font-black leading-none">+</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    Medway
                  </span>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#0d7a68]">
                    Rural Health Access
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === 'hi' 
                    ? 'सार्वजनिक ग्रामीण स्वास्थ्य सेवा' 
                    : 'Rural Public Healthcare Access'}
                </div>
              </div>
            </button>
          </div>

          {/* Right Action Tools: Emergency Helpline Pill, Language Switcher & Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Emergency Helpline Pill */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#fee2e2] hover:bg-[#fcd0d0] border border-[#fca5a5] text-[#991b1b] text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#b91c1c]" />
              <span>
                {language === 'hi' 
                  ? 'आपातकालीन हेल्पलाइन: 108 / 112' 
                  : 'Emergency Helpline: 108 / 112'}
              </span>
            </button>

            {/* Language Switcher Option (English default with option to switch to Hindi) */}
            <div 
              className="flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200 text-xs shadow-2xs"
              title="Select language / भाषा चुनें"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  language === 'hi'
                    ? 'bg-[#0d5c58] text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* User Profile Avatar with dropdown arrow */}
            <div className="relative flex items-center gap-1.5 pl-1">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120"
                alt="Health Officer"
                className="w-8 h-8 rounded-full object-cover border border-stone-300 ring-2 ring-teal-50"
              />
              <span className="text-slate-400 text-xs cursor-pointer">▾</span>
            </div>

            {/* College Presentation Button */}
            <button
              onClick={onOpenProjectModal}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-slate-900 text-xs border border-stone-200 rounded-full bg-stone-50 transition-colors"
              title="College Project Info & Python Streamlit Code"
            >
              <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
              <span>{language === 'hi' ? 'प्रोजेक्ट विवरण' : 'Project Overview'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-stone-100 rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Sub-Header Navigation Tab Bar (From Screenshot) */}
      <div className="bg-[#f8fafc] border-t border-stone-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start overflow-x-auto py-2 gap-2 text-xs sm:text-sm no-scrollbar">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-[#0d5c58] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-white bg-[#0d5c58] font-semibold'
                    : 'text-slate-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                onOpenProjectModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 bg-stone-100 text-slate-800 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-teal-700" />
              <span>College Project Overview & Python Code</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
