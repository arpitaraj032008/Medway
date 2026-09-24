/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Facility, Appointment, PatientFeedback } from './types';
import { initialFacilities, preventiveGuides, initialAppointments, initialFeedback } from './data/mockData';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { FacilityFinder } from './components/FacilityFinder';
import { PreventiveCare } from './components/PreventiveCare';
import { AppointmentForm } from './components/AppointmentForm';
import { FeedbackSection } from './components/FeedbackSection';
import { HealthcareDashboard } from './components/HealthcareDashboard';
import { CollegePresentationModal } from './components/CollegePresentationModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { Footer } from './components/Footer';

export default function App() {
  // Application State with LocalStorage persistence
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('medway_language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const [currentTab, setCurrentTab] = useState<string>('facilities');
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('medway_appointments');
      return saved ? JSON.parse(saved) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  const [feedbackList, setFeedbackList] = useState<PatientFeedback[]>(() => {
    try {
      const saved = localStorage.getItem('medway_feedback');
      return saved ? JSON.parse(saved) : initialFeedback;
    } catch {
      return initialFeedback;
    }
  });

  // Modal states
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);

  // Cross-component interaction state
  const [preSelectedFacility, setPreSelectedFacility] = useState<Facility | null>(null);
  const [highlightedFacilityId, setHighlightedFacilityId] = useState<string | undefined>(undefined);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('medway_language', language);
  }, [language]);

  // Sync Appointments
  useEffect(() => {
    localStorage.setItem('medway_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Sync Feedback
  useEffect(() => {
    localStorage.setItem('medway_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Handlers
  const handleBookFacility = (facility: Facility) => {
    setPreSelectedFacility(facility);
    setCurrentTab('appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFacilityById = (facilityId: string) => {
    setHighlightedFacilityId(facilityId);
    setCurrentTab('facilities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleAddFeedback = (newFb: PatientFeedback) => {
    setFeedbackList(prev => [newFb, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800">
      
      {/* Top Emergency Hotline Banner */}
      <EmergencyBanner
        language={language}
        onOpenModal={() => setIsEmergencyModalOpen(true)}
        isOpen={isEmergencyModalOpen}
        onCloseModal={() => setIsEmergencyModalOpen(false)}
        onSelectFacilityById={handleSelectFacilityById}
      />

      {/* Main App Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {currentTab === 'facilities' && (
          <FacilityFinder
            facilities={facilities}
            language={language}
            onBookFacility={handleBookFacility}
            selectedFacilityId={highlightedFacilityId}
          />
        )}

        {currentTab === 'preventive' && (
          <PreventiveCare
            guides={preventiveGuides}
            language={language}
          />
        )}

        {currentTab === 'appointment' && (
          <AppointmentForm
            facilities={facilities}
            language={language}
            preSelectedFacility={preSelectedFacility}
            onClearPreSelectedFacility={() => setPreSelectedFacility(null)}
            appointments={appointments}
            onAddAppointment={handleAddAppointment}
            onCancelAppointment={handleCancelAppointment}
          />
        )}

        {currentTab === 'feedback' && (
          <FeedbackSection
            facilities={facilities}
            feedbackList={feedbackList}
            language={language}
            onAddFeedback={handleAddFeedback}
          />
        )}

        {currentTab === 'dashboard' && (
          <HealthcareDashboard
            language={language}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerModalOpen(true)}
        setCurrentTab={setCurrentTab}
      />

      {/* College Project Architecture & Streamlit Code Modal */}
      <CollegePresentationModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        language={language}
      />

      {/* Full Medical Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
        language={language}
      />

    </div>
  );
}
