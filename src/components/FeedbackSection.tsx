import React, { useState } from 'react';
import { Facility, PatientFeedback, Language } from '../types';
import { translations } from '../data/translations';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Pill, 
  Sparkles, 
  Filter,
  User,
  MapPin,
  Building2,
  AlertCircle
} from 'lucide-react';

interface FeedbackSectionProps {
  facilities: Facility[];
  feedbackList: PatientFeedback[];
  language: Language;
  onAddFeedback: (fb: PatientFeedback) => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  facilities,
  feedbackList,
  language,
  onAddFeedback,
}) => {
  const t = translations[language];

  // Form State
  const [selectedFacilityId, setSelectedFacilityId] = useState(facilities[0]?.id ?? '');
  const [patientName, setPatientName] = useState('');
  const [village, setVillage] = useState('');
  const [overallRating, setOverallRating] = useState<number>(5);
  const [cleanlinessRating, setCleanlinessRating] = useState<number>(5);
  const [staffRating, setStaffRating] = useState<number>(5);
  const [medicineRating, setMedicineRating] = useState<number>(5);
  const [waitTimeMinutes, setWaitTimeMinutes] = useState<number>(15);
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'ALL'>('ALL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const fac = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

    const newFeedback: PatientFeedback = {
      id: `fb-${Date.now()}`,
      facilityId: fac.id,
      facilityName: language === 'hi' ? fac.nameHi : fac.name,
      patientName: patientName.trim() || t.feedback.anonymous,
      village: village.trim() || (language === 'hi' ? 'ग्रामीण क्लस्टर' : 'Rural Hamlet'),
      rating: overallRating,
      cleanlinessRating,
      staffHelpfulnessRating: staffRating,
      medicineAvailabilityRating: medicineRating,
      waitTimeMinutes: Number(waitTimeMinutes) || 15,
      comment: comment.trim(),
      commentHi: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedVisit: true,
      adminActionNote: language === 'hi' 
        ? 'प्रभारी चिकित्सा अधिकारी द्वारा समीक्षा हेतु दर्ज किया गया।' 
        : 'Logged in primary health ledger for monthly medical officer audit.'
    };

    onAddFeedback(newFeedback);
    setSubmittedSuccess(true);
    setComment('');
    setPatientName('');
    setVillage('');
  };

  const filteredList = filterRating === 'ALL'
    ? feedbackList
    : feedbackList.filter(f => f.rating === filterRating);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
            {language === 'hi' ? 'जन जवाबदेही एवं सामुदायिक समीक्षा' : 'Community Voice & Accountability'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t.feedback.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.feedback.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Feedback Submission Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-700" />
            <span>{t.feedback.shareTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {language === 'hi' ? 'आपकी निष्पक्ष राय स्वास्थ्य केंद्रों की सेवा सुधारने में मदद करती है।' : 'Your transparent review helps improve medicine stock and care quality.'}
          </p>

          {submittedSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'hi' ? 'समीक्षा सफलतापूर्वक दर्ज की गई!' : 'Thank you! Your review has been published.'}</span>
              </div>
              <button 
                onClick={() => setSubmittedSuccess(false)}
                className="text-emerald-700 hover:text-emerald-900 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            
            {/* Facility Visited */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {t.feedback.facilityVisited} *
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 text-xs"
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {language === 'hi' ? fac.nameHi : fac.name} ({fac.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Star Rating */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {t.feedback.overallRating}
              </label>
              <div className="flex items-center gap-1.5 pt-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setOverallRating(star)}
                    className="p-1 text-stone-300 hover:text-amber-400 focus:outline-none transition-colors"
                  >
                    <Star 
                      className={`w-6 h-6 ${star <= overallRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
                    />
                  </button>
                ))}
                <span className="ml-2 font-bold text-slate-700 text-sm">{overallRating}/5</span>
              </div>
            </div>

            {/* Sub-ratings Grid */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2.5">
              
              <div className="flex items-center justify-between">
                <span className="text-slate-600">{t.feedback.cleanliness}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setCleanlinessRating(s)}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] transition-colors ${
                        cleanlinessRating >= s ? 'bg-teal-700 text-white' : 'bg-stone-200 text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">{t.feedback.staffHelpfulness}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setStaffRating(s)}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] transition-colors ${
                        staffRating >= s ? 'bg-teal-700 text-white' : 'bg-stone-200 text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">{t.feedback.medicineAvailability}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setMedicineRating(s)}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] transition-colors ${
                        medicineRating >= s ? 'bg-teal-700 text-white' : 'bg-stone-200 text-slate-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Wait time */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {t.feedback.waitTime}
              </label>
              <input
                type="number"
                min="0"
                max="240"
                value={waitTimeMinutes}
                onChange={(e) => setWaitTimeMinutes(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

            {/* Name & Village */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t.feedback.yourName}
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. सुशीला देवी' : 'e.g., Sushila Devi'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t.feedback.yourVillage}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={language === 'hi' ? 'गांव का नाम' : 'Village name'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {t.feedback.commentLabel} *
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.feedback.commentPlaceholder}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg shadow-xs transition-colors"
            >
              {t.feedback.submitFeedback}
            </button>

          </form>
        </div>

        {/* Live Community Feedback Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Feed Filter Bar */}
          <div className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t.feedback.recentReviews}</span>
              <span className="text-slate-400 font-normal">({filteredList.length})</span>
            </span>

            <div className="flex items-center gap-1">
              {[
                { id: 'ALL', label: t.feedback.filterAllRatings },
                { id: 5, label: '5 ★' },
                { id: 4, label: '4 ★' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilterRating(item.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    filterRating === item.id
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div className="space-y-3">
            {filteredList.map((review) => {
              const reviewText = language === 'hi' && review.commentHi ? review.commentHi : review.comment;

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs text-xs space-y-2.5"
                >
                  
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span className="font-bold text-slate-900">{review.patientName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{review.village}</span>
                      <span aria-hidden="true">·</span>
                      <span>{review.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Facility Tag */}
                  <div className="text-[11px] font-semibold text-teal-800">
                    📍 {review.facilityName}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 leading-relaxed text-xs">
                    "{reviewText}"
                  </p>

                  {/* Sub-ratings indicators */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 border-t border-stone-100">
                    <span>
                      {language === 'hi' ? 'स्वच्छता:' : 'Cleanliness:'} <strong>{review.cleanlinessRating}/5</strong>
                    </span>
                    <span>·</span>
                    <span>
                      {language === 'hi' ? 'दवाएं:' : 'Medicines:'} <strong>{review.medicineAvailabilityRating}/5</strong>
                    </span>
                    <span>·</span>
                    <span>
                      {language === 'hi' ? 'इंतजार:' : 'Wait:'} <strong>{review.waitTimeMinutes} min</strong>
                    </span>
                  </div>

                  {/* Official Action / ASHA Supervisor Response Note */}
                  {review.adminActionNote && (
                    <div className="mt-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-slate-600 flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 block mb-0.5">
                          {t.feedback.officialAction}:
                        </strong>
                        <span>{review.adminActionNote}</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
