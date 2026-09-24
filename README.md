# 🏥 Medway — Rural & Underserved Public Healthcare Access Platform

> **Bridging the Last-Mile Healthcare Gap with Open Public Health Infrastructure**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python Streamlit](https://img.shields.io/badge/Streamlit-Compatible-FF4B4B?logo=streamlit&logoColor=white)](https://streamlit.io/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

---

## 📌 Executive Summary

**Medway** is a modern, responsive, and accessible digital public health platform engineered to improve access to quality public healthcare services in rural, tribal, and underserved communities. 

In many rural regions, citizens encounter severe information gaps: they often walk or travel 10 to 25 kilometers to a clinic only to discover that the facility is closed, the doctor is on leave, essential medications (such as snakebite antivenom or insulin) are out of stock, or inpatient beds are unavailable. Medway solves these barriers by unifying multi-tier facility discovery, real-time doctor attendance rosters, service slot scheduling, preventive health guidance, patient feedback, and regional health access analytics into one lightweight, mobile-first interface.

---

## 🌍 Why Medway is Needed (Problem Statement & Justification)

### 1. The Rural "Last-Mile" Accessibility Crisis
- **Geographic Isolation**: Rural habitations are often separated from Primary Health Centres (PHCs) and Community Health Centres (CHCs) by unpaved roads, seasonal rivers, and hilly terrain. Citizens lack prior information regarding road passability and transport schedules.
- **Wasted Out-of-Pocket Expenditure**: Rural families frequently expend critical financial resources on private auto-rickshaws or tractors to reach a hospital, only to find the relevant specialist (e.g., obstetrician or sonologist) unavailable.

### 2. Critical Information Asymmetry
- **Unverified Doctor & Staff Rosters**: Patients have no visibility into on-duty medical officers, Community Health Officers (CHOs), or Accredited Social Health Activists (ASHAs).
- **Medication & Diagnostic Uncertainty**: Patients do not know whether the clinic has generic medicines in stock, whether snakebite antivenom is active, or if diagnostic labs and Tele-ECG equipment are functional.

### 3. Delays in Acute Emergency Triage
- Snakebites, postpartum hemorrhages, infant convulsions, and acute respiratory trauma require immediate intervention within the "golden hour." Rural patients frequently lose vital hours by going to a sub-centre that lacks antivenom or emergency stabilization instead of heading directly to a 24x7 CHC.

### 4. Language & Digital Literacy Barriers
- Government portals are often dense, bureaucratic, and difficult to navigate on mobile devices. Medway addresses this with:
  - **Clean English by Default** for universal accessibility.
  - **Instant 1-Click Hindi Localization** for rural beneficiaries and grassroots health workers.
  - **Built-in Text-to-Speech (Audio Reader)** for low-literacy users.

---

## 🌟 Key Features & Functional Modules

### 🏥 1. Healthcare Facility Finder & Catchment Network
- **Multi-Tier Classification**: Covers all levels of the rural public healthcare pyramid:
  - **Sub-Centres (SC / Ayushman Arogya Mandir)**: Village-level primary care and NCD screenings.
  - **Primary Health Centres (PHC)**: Outpatient consultations, normal delivery, routine immunizations, and tele-ECG.
  - **Community Health Centres (CHC)**: 30-bed secondary inpatient care, ultrasound, in-house ambulance, and emergency triage.
  - **Mobile Medical Units (MMU Vans)**: Doorstep mobile health clinics with scheduled village square stops.
- **Multi-Dimensional Filtering**:
  - Filter by Taluk/Tehsil (e.g., Rampur Taluk, Bhimtal Tehsil, Garud Block).
  - Filter by Gram Panchayat / Village.
  - Quick Search for doctor names, specialized tests, and treatments.
  - Essential Service Checkboxes: *24/7 Maternity & Delivery*, *Basic Diagnostic Lab*, *Pediatric Care*, *Vaccination Camps*, *Doctor On-Duty*, and *Open Right Now*.
- **Interactive Topographic Map & Catchment Area**:
  - Vector terrain visualization displaying river basins, highway connectors, and neighboring hamlets.
  - Live GPS pulse lock and road condition indicators (*All-weather paved access — Passable*).
  - Expandable full-screen interactive network view.
- **Detailed Facility Cards**:
  - Doctor shift hours, on-duty qualifications (e.g., Dr. Ananya Sharma, MBBS), and bed occupancy count (e.g., 30 beds / 12 vacant).
  - One-click rural landmark directions and instant phone dialers.

### 🩺 2. Preventive Care & Health Guidance
- **Community Health Advisories**:
  - Maternal ANC (Antenatal Care) schedules and nutritional guidance.
  - Vector-borne disease management (Dengue, Malaria, viral fevers).
  - Safe drinking water purification and ORS diarrhea management.
  - Snakebite & scorpion sting emergency first aid (what to do and what to strictly avoid).
  - Elderly hypertension and diabetes (NCD) screening.
- **Child Immunization Schedule Calculator**:
  - Age-wise interactive selector (*Birth, 6 Weeks, 10 Weeks, 14 Weeks, 9-12 Months, 16-24 Months, 5-6 Years*).
  - Displays vaccine names (BCG, OPV, Pentavalent, Rotavirus, MR), target diseases, and administration routes.
- **Audio Voice Reader**: Browser Web Speech API synthesizer that reads out health instructions out loud in English or Hindi.
- **Printable Health Advisories**: One-click print / PDF export for distribution by frontline ASHA workers.

### 📋 3. Service Request & Digital Appointment Token Form
- **Paperless Scheduling**: Patients or ASHA workers can reserve an outpatient consultation, prenatal ANC checkup, or vaccination slot.
- **Token Generation**: Generates unique verifiable tokens (e.g., `MED-PHC-8392`) that reduce morning OPD queue crowding.
- **Digital Patient Token Slip**: Displays QR codes, patient demographics, appointed facility, and clinic instructions.
- **Simulated SMS Dispatch Notification**: Demonstrates SMS token dispatch to basic non-smartphone feature phones via cellular networks.
- **Appointment Registry**: View active appointments, download slips as text/PDF, or cancel scheduled visits.

### ⭐ 4. Patient Voice & Transparent Feedback Loop
- **Public Accountability**: Allows rural patients to rate public facilities on critical parameters:
  - Cleanliness and sanitation.
  - Doctor and nurse empathy / politeness.
  - Free generic medicine availability.
  - Real reported waiting times (in minutes).
- **Verified Community Feed**: Displays real-time community reviews with facility tags and time stamps.
- **Grievance Reporting Channel**: Highlights medicine stock shortages directly for district health authorities.

### 📊 5. Healthcare Access Statistics & Analytics Dashboard
- **Telemetry Key Performance Indicators (KPIs)**:
  - Total Monthly Consultations (~14,820+ rural OPD patients).
  - Average Catchment Travel Time (reduced to ~18.4 minutes).
  - Essential Generic Drug Stock Rate (~94.2% availability).
  - Full Maternal Institutional Delivery Rate (~88.6%).
- **Interactive Data Visualizations**:
  - Monthly footfall distribution across PHCs, CHCs, SCs, and MMUs.
  - Medicine availability percentages by district blocks.
  - Seasonal presenting conditions (Upper Respiratory, Water-borne Diarrhea, Vector Fevers, Skin Allergies).

### 🌐 6. Language Localization
- **English by Default**: Clean, uncluttered UI without messy bilingual parenthesis.
- **1-Click Hindi Switcher**: Located in the top header (`English` | `हिंदी`). Instantly translates navigation, rosters, symptom guides, map labels, and modals.

### 🚨 7. Emergency Protocol & Medical Disclaimers
- **Top Crimson Urgent Alert Strip**: Prominently displays immediate hotline shortcuts:
  - **108**: Free Emergency Medical & Ambulance Transport.
  - **102**: Janani Shishu Suraksha Karyakram (JSSK) Free Pregnant & Infant Transport.
  - **104**: 24/7 Medical Advice & Health Information Helpline.
  - **112**: Unified National Emergency Response.
- **Strict Non-Diagnostic Disclaimer**: Prominent banners affirming that Medway is an informational routing and scheduling directory, not an automated clinical diagnosis or prescribing system.

### 🎓 8. Academic Presentation & Streamlit Support
- **College Project Modal**: Outlines the Problem Statement, System Architecture, Viva Evaluation Questions & Answers, and User Personas.
- **Python + Streamlit Standalone Script (`medway_streamlit.py`)**: Included directly in the root directory for Python-only university lab evaluations (`pip install streamlit pandas && streamlit run medway_streamlit.py`).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Framework** | React 19 (SPA) with Vite 8 |
| **Language** | TypeScript (Strict type checking) |
| **Styling & Design** | Tailwind CSS v4, Satoshi & Plus Jakarta Sans typography |
| **Icons** | Lucide React |
| **Animations** | Tailwind transitions & CSS keyframes |
| **Audio Synthesis** | HTML5 Web Speech Synthesis API (`window.speechSynthesis`) |
| **Data & Storage** | In-memory verified mock database with browser `localStorage` synchronization |
| **Python Prototype** | Streamlit + Pandas (`medway_streamlit.py`) |

---

## 📂 Project Directory Structure

```text
├── index.html                   # HTML entry point with Satoshi & Jakarta fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependencies and scripts
├── medway_streamlit.py          # Standalone Python + Streamlit submission script
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Core state orchestrator & navigation container
│   ├── index.css                # Global styles with Tailwind CSS v4 & custom scrollbar
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces (Facility, Appointment, Guide, etc.)
│   ├── data/
│   │   ├── mockData.ts          # Verified facilities, doctors, guides, and statistics
│   │   └── translations.ts      # English & Hindi translation dictionaries
│   └── components/
│       ├── Navbar.tsx           # Brand header, emergency pill, language switch & nav tabs
│       ├── EmergencyBanner.tsx  # Top urgent red banner & emergency triage modal
│       ├── FacilityFinder.tsx   # Verified facility directory, filters, cards & map
│       ├── PreventiveCare.tsx   # Preventive health guides, TTS reader & vaccine calculator
│       ├── AppointmentForm.tsx  # Digital appointment booking, SMS preview & token slip
│       ├── FeedbackSection.tsx  # Patient ratings, community reviews & grievance submission
│       ├── HealthcareDashboard.tsx # Rural health access telemetry & KPI charts
│       ├── CatchmentMap.tsx     # Vector geographic catchment network visualization
│       ├── CollegePresentationModal.tsx # Project Viva prep, architecture & code viewer
│       ├── DisclaimerModal.tsx  # Comprehensive medical disclaimer dialog
│       └── Footer.tsx           # Institutional links, emergency contacts & disclaimers
└── README.md                    # Project documentation
```

---

## 🚀 How to Run the Application

### 1. Running the React Web Application

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be served at `http://localhost:3000`.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run TypeScript linter**:
   ```bash
   npm run lint
   ```

---

### 2. Running the Python + Streamlit Application

If presenting in a Python or Streamlit academic environment:

1. **Install requirements**:
   ```bash
   pip install streamlit pandas
   ```

2. **Run the Streamlit application**:
   ```bash
   streamlit run medway_streamlit.py
   ```
   The Streamlit dashboard will launch in your browser at `http://localhost:8501`.

---

## ⚖️ Ethical & Medical Disclaimer

> **IMPORTANT**: **Medway** is an informational prototype designed for educational, demonstration, and college project presentation purposes. None of the content, checklists, or triage suggestions constitute formal clinical diagnoses, medical advice, or prescriptions. In any critical health emergency, snakebite case, or acute maternal distress, users must immediately contact emergency services (**108** / **112**) or transport the patient to the nearest 24/7 Community Health Centre or District Hospital.

---

## 👥 Authors & Academic Credits
- **Project**: Medway — Rural & Underserved Public Healthcare Access Platform
- **Target Audience**: Rural Citizens, Frontline ASHA / Anganwadi Workers, Primary Care Physicians, Public Health Administrators, and Academic Evaluators.
