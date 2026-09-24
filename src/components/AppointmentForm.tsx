import React, { useState, useEffect } from 'react';
import { Facility, Appointment, Language, FacilityType } from '../types';
import { translations } from '../data/translations';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  Download, 
  AlertCircle,
  XCircle,
  Building2,
  QrCode,
  Share2,
  Trash2
} from 'lucide-react';

interface AppointmentFormProps {
  facilities: Facility[];
  language: Language;
  preSelectedFacility: Facility | null;
  onClearPreSelectedFacility: () => void;
  appointments: Appointment[];
  onAddAppointment: (apt: Appointment) => void;
  onCancelAppointment: (id: string) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  facilities,
  language,
  preSelectedFacility,
  onClearPreSelectedFacility,
  appointments,
  onAddAppointment,
  onCancelAppointment,
}) => {
  const t = translations[language];

  // Form Fields
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [selectedFacilityId, setSelectedFacilityId] = useState(preSelectedFacility?.id || (facilities[0]?.id ?? ''));
  const [serviceType, setServiceType] = useState('General Outpatient (OPD) Consultation');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>(t.appointment.slotMorning);
  const [notes, setNotes] = useState('');

  // Success state modal / slip
  const [newlyCreatedApt, setNewlyCreatedApt] = useState<Appointment | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preSelectedFacility) {
      setSelectedFacilityId(preSelectedFacility.id);
    }
  }, [preSelectedFacility]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientName.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया मरीज का नाम दर्ज करें।' : 'Please enter patient name.');
      return;
    }
    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMessage(language === 'hi' ? 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!village.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया गांव या ग्राम पंचायत का नाम दर्ज करें।' : 'Please enter village or panchayat name.');
      return;
    }

    const fac = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

    // Generate token
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const token = `MED-2026-${randomSuffix}`;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      token,
      patientName: patientName.trim(),
      age: Number(age) || 25,
      gender,
      phone: phone.trim(),
      village: village.trim(),
      district: fac.district,
      facilityId: fac.id,
      facilityName: language === 'hi' ? fac.nameHi : fac.name,
      facilityType: fac.type,
      serviceType,
      serviceTypeHi: serviceType, // mapping in practical use
      preferredDate,
      timeSlot,
      symptomsNotes: notes.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    onAddAppointment(newApt);
    setNewlyCreatedApt(newApt);

    // Reset some fields
    setPatientName('');
    setPhone('');
    setNotes('');
  };

  const handleDownloadSlip = (apt: Appointment) => {
    const slipText = `
========================================
MEDWAY - PUBLIC HEALTHCARE TOKEN SLIP
========================================
Token Number : ${apt.token}
Status       : ${apt.status}
Patient Name : ${apt.patientName} (${apt.age}y / ${apt.gender})
Phone        : ${apt.phone}
Village      : ${apt.village}
Facility     : ${apt.facilityName}
Service      : ${apt.serviceType}
Date         : ${apt.preferredDate}
Time Window  : ${apt.timeSlot}
----------------------------------------
Instructions:
1. Present this digital token number at the OPD counter.
2. Free generic medicines are dispensed at the pharmacy counter.
3. In case of emergency or snakebite, do not wait; visit CHC triage directly.
========================================
    `;

    const blob = new Blob([slipText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Medway_Token_${apt.token}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            {language === 'hi' ? 'डिजिटल ओपीडी टोकन एवं सेवा अनुरोध' : 'Digital Healthcare Scheduling'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.appointment.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.appointment.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Appointment Booking Form (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-xl border border-stone-200 p-5 sm:p-7 shadow-xs">
          
          {preSelectedFacility && (
            <div className="mb-5 p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between text-xs text-teal-900">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-700" />
                <span>
                  {language === 'hi' ? 'चयनित स्वास्थ्य केंद्र:' : 'Selected Facility:'}{' '}
                  <strong>{language === 'hi' ? preSelectedFacility.nameHi : preSelectedFacility.name}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={onClearPreSelectedFacility}
                className="text-teal-800 hover:text-teal-950 font-semibold underline"
              >
                {language === 'hi' ? 'बदलें' : 'Change'}
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Patient Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.appointment.patientName} *
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={language === 'hi' ? 'उदा. सुमित्रा देवी या रमेश कुमार' : 'e.g., Sumitra Devi or Ramesh Kumar'}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

            {/* Age & Gender Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.appointment.patientAge} *
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  required
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.appointment.gender}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Female">{t.appointment.genderFemale}</option>
                  <option value="Male">{t.appointment.genderMale}</option>
                  <option value="Other">{t.appointment.genderOther}</option>
                </select>
              </div>
            </div>

            {/* Phone & Village */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.appointment.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.appointment.village} *
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. सीतापुर कलां / रामपुर' : 'e.g., Sitapur Kalan / Rampur'}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            {/* Facility Choice */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.appointment.selectFacility} *
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {language === 'hi' ? fac.nameHi : fac.name} ({fac.type}) - {fac.distanceKm} km
                  </option>
                ))}
              </select>
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.appointment.selectService} *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              >
                <option value="General Outpatient (OPD) Consultation">
                  {language === 'hi' ? 'सामान्य ओपीडी परामर्श (डॉक्टर जांच)' : 'General Outpatient (OPD) Consultation'}
                </option>
                <option value="Maternal Antenatal Checkup (ANC)">
                  {language === 'hi' ? 'गर्भवती महिला प्रसव पूर्व जांच (ANC)' : 'Maternal Antenatal Checkup (ANC)'}
                </option>
                <option value="Child Routine Immunization Vaccine">
                  {language === 'hi' ? 'शिशु नियमित टीकाकरण (वैक्सीन)' : 'Child Routine Immunization Vaccine'}
                </option>
                <option value="Elder BP & Sugar Generic Tablet Refill">
                  {language === 'hi' ? 'बुजुर्ग बीपी व शुगर की दवा का नवीनीकरण' : 'Elder BP & Sugar Generic Tablet Refill'}
                </option>
                <option value="Point-of-Care Lab Test (Malaria/Hb/Sugar)">
                  {language === 'hi' ? 'प्राथमिक रक्त जांच (मलेरिया/हीमोग्लोबिन/शुगर)' : 'Point-of-Care Lab Test (Malaria/Hb/Sugar)'}
                </option>
                <option value="Mobile Medical Van Doorstep Visit">
                  {language === 'hi' ? 'मोबाइल मेडिकल वैन कैंप परामर्श' : 'Mobile Medical Van Doorstep Visit'}
                </option>
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.appointment.preferredDate}
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.appointment.timeSlot}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value={t.appointment.slotMorning}>{t.appointment.slotMorning}</option>
                  <option value={t.appointment.slotAfternoon}>{t.appointment.slotAfternoon}</option>
                </select>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.appointment.symptomsNotes}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'hi' ? 'लक्षण या कोई विशेष आवश्यकता लिखें...' : 'Briefly describe reason for visit...'}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.appointment.submitButton}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Side Panel: Active Tokens / Created Slip (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          
          {/* Newly Created Appointment Slip Card */}
          {newlyCreatedApt && (
            <div className="bg-white rounded-xl border-2 border-teal-600 p-5 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-teal-100">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>{t.appointment.bookingSuccess}</span>
                </div>
                <button
                  onClick={() => setNewlyCreatedApt(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Digital Token Box */}
              <div className="my-4 p-3.5 bg-teal-50/70 border border-teal-200 rounded-lg text-center">
                <div className="text-[11px] font-semibold text-teal-900 uppercase tracking-wider">
                  {t.appointment.tokenNumber}
                </div>
                <div className="text-2xl font-black text-teal-900 font-mono tracking-tight my-0.5">
                  {newlyCreatedApt.token}
                </div>
                <div className="text-[11px] text-teal-800">
                  {newlyCreatedApt.facilityName}
                </div>
              </div>

              {/* Simulated SMS Alert Preview */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1 mb-4">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{t.appointment.smsNotice}</span>
                </div>
                <p className="text-slate-600 font-mono text-[11px] leading-relaxed">
                  "SMS sent to {newlyCreatedApt.phone}: Token {newlyCreatedApt.token} confirmed for {newlyCreatedApt.patientName} on {newlyCreatedApt.preferredDate}. Please report at registration window."
                </p>
              </div>

              {/* Download / Print Slip Button */}
              <button
                onClick={() => handleDownloadSlip(newlyCreatedApt)}
                className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-stone-200"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>{t.appointment.printSlip}</span>
              </button>
            </div>
          )}

          {/* Active Bookings List in Session */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>{t.appointment.myBookings}</span>
              <span className="text-xs font-semibold text-slate-500 bg-stone-100 px-2 py-0.5 rounded-full ml-auto">
                {appointments.length}
              </span>
            </h3>

            {appointments.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                {t.appointment.noBookings}
              </p>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        {apt.token}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        {apt.status}
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900">{apt.patientName}</div>
                      <div className="text-slate-500 text-[11px] truncate">{apt.facilityName}</div>
                    </div>

                    <div className="text-slate-600 text-[11px] flex items-center gap-2">
                      <span>{apt.preferredDate}</span>
                      <span>·</span>
                      <span className="truncate">{apt.timeSlot.split('(')[0]}</span>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                      <button
                        onClick={() => handleDownloadSlip(apt)}
                        className="text-teal-700 hover:text-teal-900 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Slip</span>
                      </button>

                      <button
                        onClick={() => onCancelAppointment(apt.id)}
                        className="text-rose-600 hover:text-rose-800 text-[11px] font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{language === 'hi' ? 'रद्द करें' : 'Cancel'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
