export type Language = 'en' | 'hi';

export type FacilityType = 'PHC' | 'CHC' | 'SC' | 'DH' | 'MMU';

export interface Facility {
  id: string;
  name: string;
  nameHi: string;
  type: FacilityType;
  typeLabelEn: string;
  typeLabelHi: string;
  district: string;
  districtHi: string;
  block: string;
  blockHi: string;
  village: string;
  villageHi: string;
  address: string;
  addressHi: string;
  distanceKm: number;
  travelTimeMin: number;
  phone: string;
  operatingHours: string;
  operatingHoursHi: string;
  doctorOnDuty: string;
  doctorOnDutyHi: string;
  doctorSpecialty?: string;
  doctorSpecialtyHi?: string;
  doctorAvatar?: string;
  doctorShift?: string;
  nurseOnDuty: string;
  nurseOnDutyHi: string;
  bedsAvailable: number;
  totalBeds: number;
  medicineStockStatus: 'Adequate' | 'Limited' | 'Critical';
  medicineStockStatusHi: 'पर्याप्त' | 'सीमित' | 'अति आवश्यक';
  services: string[];
  servicesHi: string[];
  ambulanceAvailable: boolean;
  emergency24x7: boolean;
  teleconsultationAvailable: boolean;
  snakebiteAntivenom: boolean;
  accessTag?: string;
  accessTagHi?: string;
  avgWait?: string;
  specialFeatures?: Array<{ title: string; subtitle: string; icon: string }>;
  onboardStaff?: string;
  onboardStaffHi?: string;
  medicinesCount?: string;
  vehicleReg?: string;
  campLocation?: string;
  campLocationHi?: string;
  campTime?: string;
  nextStop?: string;
  nextStopHi?: string;
  openStatusTag?: string;
  openStatusTagHi?: string;
  openStatusType?: 'green' | 'red' | 'gray';
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // For clean interactive SVG map representation (0-100%)
    mapY: number;
  };
  directionsGuideEn: string;
  directionsGuideHi: string;
}

export interface PreventiveGuide {
  id: string;
  category: 'maternal' | 'immunization' | 'fevers' | 'water_hygiene' | 'elder_care' | 'first_aid';
  categoryEn: string;
  categoryHi: string;
  titleEn: string;
  titleHi: string;
  summaryEn: string;
  summaryHi: string;
  keyStepsEn: string[];
  keyStepsHi: string[];
  warningSignsEn: string[];
  warningSignsHi: string[];
  audioTextEn: string;
  audioTextHi: string;
  iconName: string;
}

export interface Appointment {
  id: string;
  token: string;
  patientName: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  village: string;
  district: string;
  facilityId: string;
  facilityName: string;
  facilityType: FacilityType;
  serviceType: string;
  serviceTypeHi: string;
  preferredDate: string;
  timeSlot: string;
  symptomsNotes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface PatientFeedback {
  id: string;
  facilityId: string;
  facilityName: string;
  patientName: string;
  village: string;
  rating: number; // 1 to 5
  cleanlinessRating: number;
  staffHelpfulnessRating: number;
  medicineAvailabilityRating: number;
  waitTimeMinutes: number;
  comment: string;
  commentHi?: string;
  date: string;
  verifiedVisit: boolean;
  adminActionNote?: string;
}

export interface HealthcareStatMetric {
  id: string;
  labelEn: string;
  labelHi: string;
  value: string;
  subtextEn: string;
  subtextHi: string;
  trend: string;
}
