import React, { useState } from 'react';
import { Language, HealthcareStatMetric } from '../types';
import { translations } from '../data/translations';
import { 
  statMetrics, 
  monthlyFootfallData, 
  medicineAvailabilityByBlock, 
  topPresentingConditions 
} from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Pill, 
  Baby, 
  ShieldCheck, 
  Activity,
  Layers,
  Info
} from 'lucide-react';

interface HealthcareDashboardProps {
  language: Language;
}

export const HealthcareDashboard: React.FC<HealthcareDashboardProps> = ({
  language,
}) => {
  const t = translations[language];
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Maximum footfall for chart scaling
  const maxFootfall = Math.max(...monthlyFootfallData.map(d => d.phc + d.chc + d.mmu + d.sc));

  return (
    <div className="space-y-6">
      
      {/* Header & Filter */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
              {language === 'hi' ? 'जन स्वास्थ्य निगरानी एवं मूल्यांकन' : 'Public Health Telemetry & Impact'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t.dashboard.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {t.dashboard.subtitle}
            </p>
          </div>

          <div className="self-stretch sm:self-auto text-xs">
            <label className="block text-slate-500 font-medium mb-1">
              {t.dashboard.districtFilter}
            </label>
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            >
              <option value="all">{t.dashboard.allDistricts}</option>
              <option value="sitapur">Sitapur Rural Cluster (UP)</option>
              <option value="bageshwar">Bageshwar Valley (UK)</option>
              <option value="tarikhet">Almora Tarikhet Belt (UK)</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statMetrics.map((m) => {
          return (
            <div 
              key={m.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold text-slate-700">
                    {language === 'hi' ? m.labelHi : m.labelEn}
                  </span>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {m.trend}
                  </span>
                </div>
                
                <div className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                  {m.value}
                </div>
              </div>

              <div className="text-xs text-slate-500 pt-3 mt-3 border-t border-stone-100">
                {language === 'hi' ? m.subtextHi : m.subtextEn}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid: Footfall Bar Chart + Essential Drug Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Footfall Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {t.dashboard.footfallTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'मासिक ओपीडी में आए मरीजों का स्तर-वार विभाजन' : 'Monthly outpatient volume across health tiers'}
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-700"></span>
                <span>PHC</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-600"></span>
                <span>CHC</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-600"></span>
                <span>MMU</span>
              </span>
            </div>
          </div>

          {/* SVG/HTML Bar Chart */}
          <div className="mt-6 h-64 flex items-end justify-between gap-3 px-2 sm:px-6 pt-6 border-b border-stone-200">
            {monthlyFootfallData.map((d) => {
              const total = d.phc + d.chc + d.mmu;
              const heightPercent = (total / maxFootfall) * 100;
              const isHovered = hoveredMonth === d.month;

              const phcHeight = (d.phc / total) * 100;
              const chcHeight = (d.chc / total) * 100;
              const mmuHeight = (d.mmu / total) * 100;

              return (
                <div 
                  key={d.month}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(d.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Tooltip on hover */}
                  <div className={`text-[10px] font-mono text-slate-600 mb-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    {(total / 1000).toFixed(1)}k
                  </div>

                  {/* Stacked Bar */}
                  <div 
                    className="w-full max-w-[48px] rounded-t-md overflow-hidden flex flex-col-reverse shadow-xs transition-all duration-200 group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div style={{ height: `${phcHeight}%` }} className="bg-teal-700" title={`PHC: ${d.phc.toLocaleString()}`} />
                    <div style={{ height: `${chcHeight}%` }} className="bg-sky-600" title={`CHC: ${d.chc.toLocaleString()}`} />
                    <div style={{ height: `${mmuHeight}%` }} className="bg-purple-600" title={`MMU: ${d.mmu.toLocaleString()}`} />
                  </div>

                  {/* Month Label */}
                  <div className="mt-2 text-xs font-semibold text-slate-600">
                    {d.month}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{language === 'hi' ? 'स्रोत: जिला स्वास्थ्य प्रबंधन सूचना प्रणाली (HMIS)' : 'Source: District Health Management Information System (HMIS)'}</span>
            <span>{language === 'hi' ? 'कुल 5 माह में 1.8 लाख+ मरीज' : '184,000+ Rural Patients Served'}</span>
          </div>

        </div>

        {/* Essential Drug Availability Rate by Block (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          
          <div>
            <h3 className="text-base font-bold text-slate-900 pb-1">
              {t.dashboard.medicineTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {language === 'hi' ? '42 आवश्यक जेनेरिक दवाओं की प्राथमिक स्वास्थ्य केंद्रों पर वास्तविक उपलब्धता' : 'Audit of 42 essential life-saving drugs at primary tier'}
            </p>

            <div className="space-y-4">
              {medicineAvailabilityByBlock.map((b) => (
                <div key={b.block} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-800">{b.block}</span>
                    <span className="font-bold text-teal-800">{b.rate}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        b.rate >= 90 ? 'bg-teal-700' : b.rate >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${b.rate}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>{b.status}</span>
                    <span>{language === 'hi' ? 'सप्ताहिक ऑडिट' : 'Audited Weekly'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-slate-600 flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              {language === 'hi'
                ? 'सभी 42 जेनेरिक दवाएं (एंटीबायोटिक, ओआरएस, बीपी, आयरन) सरकारी केंद्रों पर पूरी तरह निशुल्क हैं।'
                : 'All 42 essential drugs are provided completely free at government pharmacies.'}
            </span>
          </div>

        </div>

      </div>

      {/* Seasonal Health Conditions Breakdown */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          {t.dashboard.conditionsTitle}
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          {language === 'hi' ? 'ग्रामीण ओपीडी में प्रस्तुत होने वाली मुख्य मौसमी बीमारियां' : 'Primary health concerns presenting at rural OPD clinics'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {topPresentingConditions.map((cond, i) => (
            <div key={i} className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="text-2xl font-black text-slate-800 mb-1">
                  {cond.percentage}%
                </div>
                <div className="text-xs font-semibold text-slate-800 leading-snug">
                  {language === 'hi' ? cond.conditionHi : cond.conditionEn}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 pt-2 mt-2 border-t border-stone-200/80">
                {cond.cases}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers & Data note */}
      <div className="text-center text-xs text-slate-500 py-2">
        {t.dashboard.dataNote}
      </div>

    </div>
  );
};
