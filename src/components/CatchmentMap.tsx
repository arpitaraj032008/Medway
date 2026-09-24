import React, { useState } from 'react';
import { Facility, Language } from '../types';
import { MapPin, Navigation, Phone, ShieldCheck, HeartPulse, Stethoscope, ChevronRight } from 'lucide-react';

interface CatchmentMapProps {
  facilities: Facility[];
  selectedFacility: Facility | null;
  onSelectFacility: (fac: Facility) => void;
  language: Language;
  onBookAppointment: (fac: Facility) => void;
  onViewDirections: (fac: Facility) => void;
}

export const CatchmentMap: React.FC<CatchmentMapProps> = ({
  facilities,
  selectedFacility,
  onSelectFacility,
  language,
  onBookAppointment,
  onViewDirections,
}) => {
  const [hoveredFacility, setHoveredFacility] = useState<Facility | null>(null);

  const activeFac = hoveredFacility || selectedFacility;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CHC':
        return '#0284c7'; // Sky/Blue
      case 'PHC':
        return '#0f766e'; // Teal/Sage
      case 'DH':
        return '#e11d48'; // Rose
      case 'MMU':
        return '#7c3aed'; // Purple
      case 'SC':
        return '#d97706'; // Amber
      default:
        return '#475569';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
      
      {/* Top Map Control Bar */}
      <div className="p-4 bg-stone-50/80 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-slate-800">
            {language === 'hi' ? 'ग्रामीण क्षेत्रीय स्वास्थ्य मानचित्र' : 'Rural Catchment Health Mapping'}
          </span>
          <span className="text-slate-500 ml-2">
            {language === 'hi' ? 'विभिन्न स्वास्थ्य केंद्रों का भौगोलिक विस्तार' : 'Geographical distribution of primary & tertiary facilities'}
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e]"></span>
            <span>PHC ({language === 'hi' ? 'प्राथमिक' : 'Primary'})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>
            <span>CHC ({language === 'hi' ? 'सामुदायिक' : 'Community'})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]"></span>
            <span>SC ({language === 'hi' ? 'उपकेंद्र' : 'Sub-Centre'})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]"></span>
            <span>MMU ({language === 'hi' ? 'मोबाइल वैन' : 'Mobile Van'})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]"></span>
            <span>DH ({language === 'hi' ? 'जिला अस्पताल' : 'District Hosp'})</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-[#f8faf9] overflow-hidden select-none">
        
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full cursor-crosshair"
          preserveAspectRatio="none"
        >
          {/* Subtle River / Valley Curve */}
          <path
            d="M 5,20 Q 30,35 45,55 T 95,75"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <text x="75" y="68" fill="#0284c7" fontSize="2.5" fontWeight="500" opacity="0.7">
            {language === 'hi' ? 'कोसी / सरयू नदी घाटी' : 'Valley River Basin'}
          </text>

          {/* Rural Connecting Link Roads */}
          <path
            d="M 15,35 L 38,42 L 62,28 L 78,18"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.2"
            strokeDasharray="1.5,1.5"
          />
          <path
            d="M 38,42 L 48,72 L 62,28"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.2"
            strokeDasharray="1.5,1.5"
          />
          <path
            d="M 22,65 L 38,42"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.2"
            strokeDasharray="1.5,1.5"
          />

          {/* Forest & Terrain Outline Clusters */}
          <path
            d="M 8,25 Q 18,15 28,30 T 12,48 Z"
            fill="#ecfdf5"
            opacity="0.7"
          />
          <text x="12" y="24" fill="#065f46" fontSize="2.2" fontWeight="500">
            {language === 'hi' ? 'वन सीमांत क्लस्टर' : 'Forest Fringe Belt'}
          </text>

          <path
            d="M 55,20 Q 75,10 88,25 T 70,40 Z"
            fill="#f1f5f9"
            opacity="0.8"
          />
          <text x="64" y="16" fill="#475569" fontSize="2.2" fontWeight="500">
            {language === 'hi' ? 'तराई / उप-विभागीय क्षेत्र' : 'Tehsil Foothills'}
          </text>

          {/* Facility Nodes and Coverage Radii */}
          {facilities.map((fac) => {
            const isSelected = activeFac?.id === fac.id;
            const color = getTypeColor(fac.type);

            return (
              <g 
                key={fac.id}
                onClick={() => onSelectFacility(fac)}
                onMouseEnter={() => setHoveredFacility(fac)}
                onMouseLeave={() => setHoveredFacility(null)}
                className="cursor-pointer transition-all duration-150"
              >
                {/* Catchment coverage radius */}
                <circle
                  cx={fac.coordinates.mapX}
                  cy={fac.coordinates.mapY}
                  r={isSelected ? "14" : "10"}
                  fill={color}
                  fillOpacity={isSelected ? "0.15" : "0.08"}
                  stroke={color}
                  strokeWidth="0.4"
                  strokeDasharray="1,1"
                />

                {/* Outer Pulse ring if emergency/antivenom */}
                {fac.snakebiteAntivenom && (
                  <circle
                    cx={fac.coordinates.mapX}
                    cy={fac.coordinates.mapY}
                    r={isSelected ? "5" : "4"}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Center Node Pin */}
                <circle
                  cx={fac.coordinates.mapX}
                  cy={fac.coordinates.mapY}
                  r={isSelected ? "3.2" : "2.6"}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                />

                {/* Node Label Text */}
                <text
                  x={fac.coordinates.mapX}
                  y={fac.coordinates.mapY - 4.5}
                  textAnchor="middle"
                  fill="#1e293b"
                  fontSize="2.4"
                  fontWeight="600"
                  className="pointer-events-none drop-shadow-xs"
                >
                  {language === 'hi' ? fac.nameHi.split(' ')[0] : fac.name.split(' ')[0]} ({fac.type})
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Facility Floating Card (Desktop/Tablet) */}
        {activeFac && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white/98 backdrop-blur-md rounded-lg border border-stone-300 p-4 shadow-lg text-slate-800 transition-all">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <div className="text-[11px] font-semibold text-teal-800 uppercase tracking-wide">
                  {language === 'hi' ? activeFac.typeLabelHi : activeFac.typeLabelEn}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {language === 'hi' ? activeFac.nameHi : activeFac.name}
                </h4>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-stone-100 px-2 py-0.5 rounded">
                {activeFac.distanceKm} km · {activeFac.travelTimeMin} min
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1 mb-3">
              <div className="flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{language === 'hi' ? activeFac.doctorOnDutyHi : activeFac.doctorOnDuty}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>{language === 'hi' ? 'बिस्तर:' : 'Beds:'} <strong className="text-slate-700">{activeFac.bedsAvailable}</strong>/{activeFac.totalBeds}</span>
                <span>·</span>
                <span>{language === 'hi' ? 'दवा स्टॉक:' : 'Meds:'} <strong className="text-teal-700">{language === 'hi' ? activeFac.medicineStockStatusHi : activeFac.medicineStockStatus}</strong></span>
                {activeFac.snakebiteAntivenom && (
                  <>
                    <span>·</span>
                    <span className="text-rose-700 font-semibold">{language === 'hi' ? 'एंटीवेनम उपलब्ध' : 'Antivenom Ready'}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => onBookAppointment(activeFac)}
                className="flex-1 py-1.5 px-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors text-center"
              >
                {language === 'hi' ? 'टोकन बुक करें' : 'Book Visit Token'}
              </button>
              <button
                onClick={() => onViewDirections(activeFac)}
                className="py-1.5 px-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-md transition-colors flex items-center gap-1"
              >
                <Navigation className="w-3 h-3 text-slate-600" />
                <span>{language === 'hi' ? 'रास्ता' : 'Directions'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
