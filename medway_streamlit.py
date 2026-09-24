"""
Medway - Rural & Underserved Public Healthcare Access Platform
Python + Streamlit Prototype for College Project Presentation
Author: Medway Public Health Engineering Team
Requirements: pip install streamlit pandas
Run command: streamlit run medway_streamlit.py
"""

import streamlit as st
import pandas as pd
import datetime

st.set_page_config(
    page_title="Medway - Rural Healthcare Access",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Minimal Satoshi typography & clean styling
st.markdown("""
<style>
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');
    html, body, [class*="css"] {
        font-family: 'Satoshi', -apple-system, sans-serif;
    }
    .metric-card {
        background-color: #F8FAF9;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
    }
    .emergency-banner {
        background-color: #FEF2F2;
        border-left: 5px solid #EF4444;
        padding: 12px 16px;
        border-radius: 6px;
        color: #991B1B;
        font-weight: 500;
        margin-bottom: 20px;
    }
</style>
""", unsafe_allow_html=True)

# Language Selector
lang = st.sidebar.radio("🌐 Select Language / भाषा चुनें", ["English", "हिन्दी (Hindi)"])
is_hindi = lang == "हिन्दी (Hindi)"

# Title & Emergency Banner
st.title("🏥 Medway" if not is_hindi else "🏥 मेदवे (Medway)")
st.caption(
    "Rural & Underserved Public Healthcare Access Platform"
    if not is_hindi else
    "ग्रामीण एवं वंचित क्षेत्रों के लिए सुलभ जन स्वास्थ्य सेवा मंच"
)

st.markdown("""
<div class="emergency-banner">
    🚨 <b>Emergency / आपातकालीन 24x7:</b> Dial <b>108</b> (Free Ambulance), <b>102</b> (Janani Shishu Pregnant Transport), <b>104</b> (Medical Advice).
    <br><small>Medway is an informational directory prototype. In case of emergency or snakebite, visit the nearest CHC immediately.</small>
</div>
""", unsafe_allow_html=True)

# Navigation
nav_options = [
    "🏥 Facility Finder",
    "🩺 Preventive Care & Health Guidance",
    "📋 Book Service / Appointment",
    "⭐ Patient Feedback",
    "📊 Healthcare Access Dashboard",
    "🎓 College Project Overview"
] if not is_hindi else [
    "🏥 अस्पताल / केंद्र खोजें",
    "🩺 रोकथाम व स्वास्थ्य सलाह",
    "📋 सेवा / टोकन बुक करें",
    "⭐ मरीज की राय व समीक्षा",
    "📊 स्वास्थ्य सांख्यिकी डैशबोर्ड",
    "🎓 कॉलेज प्रोजेक्ट विवरण"
]

menu = st.sidebar.selectbox("Navigation / नेविगेशन", nav_options)

facilities = [
    {
        "Name": "Sitapur Primary Health Centre",
        "Type": "PHC",
        "Block": "Sitapur Block A",
        "Distance (km)": 2.8,
        "Doctor on Duty": "Dr. Rajesh Sharma, MBBS",
        "Beds Available": 4,
        "Medicine Stock": "Adequate (94%)",
        "Emergency 24x7": "Yes",
        "Snakebite Antivenom": "Yes",
        "Contact": "+91 94120 44810"
    },
    {
        "Name": "Bageshwar Community Health Centre",
        "Type": "CHC",
        "Block": "Garud Block",
        "Distance (km)": 8.5,
        "Doctor on Duty": "Dr. Sunita Pant (Gynecologist) & Dr. V. K. Verma",
        "Beds Available": 18,
        "Medicine Stock": "Adequate (91%)",
        "Emergency 24x7": "Yes",
        "Snakebite Antivenom": "Yes",
        "Contact": "+91 94111 88320"
    },
    {
        "Name": "Ranikhet Hills Sub-Centre (Arogya Mandir)",
        "Type": "Sub-Centre",
        "Block": "Tarikhet",
        "Distance (km)": 1.4,
        "Doctor on Duty": "CHO Priyanshu Joshi",
        "Beds Available": 2,
        "Medicine Stock": "Adequate (89%)",
        "Emergency 24x7": "No (Daytime)",
        "Snakebite Antivenom": "No",
        "Contact": "+91 94563 11209"
    },
    {
        "Name": "Medway Mobile Medical Unit (Van Cluster 4)",
        "Type": "Mobile Van",
        "Block": "Tribal Fringe Belt",
        "Distance (km)": 3.5,
        "Doctor on Duty": "Dr. Ananya Roy, MBBS",
        "Beds Available": 1,
        "Medicine Stock": "Adequate (93%)",
        "Emergency 24x7": "No (Rotating)",
        "Snakebite Antivenom": "Yes",
        "Contact": "+91 98380 99411"
    }
]

if "Facility Finder" in menu or "अस्पताल" in menu:
    st.header("🏥 Healthcare Facility Finder")
    col1, col2 = st.columns([2, 1])
    with col1:
        search_query = st.text_input("🔍 Search by village, facility name or block", "")
    with col2:
        selected_type = st.selectbox("Filter by Facility Type", ["All", "PHC", "CHC", "Sub-Centre", "Mobile Van"])

    df = pd.DataFrame(facilities)
    if selected_type != "All":
        df = df[df["Type"] == selected_type]
    if search_query:
        df = df[df["Name"].str.contains(search_query, case=False) | df["Block"].str.contains(search_query, case=False)]

    st.dataframe(df, use_container_width=True)

    for f in facilities:
        with st.expander(f"📍 {f['Name']} ({f['Type']}) - {f['Distance (km)']} km away"):
            c1, c2, c3 = st.columns(3)
            c1.write(f"**Doctor:** {f['Doctor on Duty']}")
            c1.write(f"**Phone:** {f['Contact']}")
            c2.write(f"**Beds Available:** {f['Beds Available']}")
            c2.write(f"**Medicines:** {f['Medicine Stock']}")
            c3.write(f"**Emergency 24x7:** {f['Emergency 24x7']}")
            c3.write(f"**Antivenom Ready:** {f['Snakebite Antivenom']}")

elif "Preventive Care" in menu or "रोकथाम" in menu:
    st.header("🩺 Preventive Care & Health Guidance")
    topic = st.selectbox(
        "Select Health Topic",
        ["Maternal Care (ANC)", "Child Immunization Schedule", "Seasonal Fevers & Malaria", "Safe Drinking Water & ORS", "Snakebite First Aid"]
    )
    if topic == "Child Immunization Schedule":
        st.subheader("Child Immunization Tracker (Universal Schedule)")
        age = st.select_slider("Select Child Age", ["At Birth", "6 Weeks", "10 Weeks", "14 Weeks", "9 Months", "16-24 Months", "5 Years"])
        st.info(f"Due vaccines for child aged: **{age}**")
        if age == "At Birth":
            st.write("• **BCG:** Protection against Tuberculosis (TB)")
            st.write("• **OPV 0:** Oral Polio Vaccine")
            st.write("• **Hepatitis B Birth Dose:** Given within 24 hours of birth")
        elif age == "6 Weeks":
            st.write("• **Pentavalent 1:** Protects against Diphtheria, Pertussis, Tetanus, Hep B, Hib")
            st.write("• **Rotavirus 1:** Prevents severe viral diarrhea")
            st.write("• **f-IPV 1:** Fractional Inactivated Polio Vaccine")
        else:
            st.write("All recommended vaccines are administered free at your local Primary Health Centre.")
    elif topic == "Snakebite First Aid":
        st.error("🚨 Snakebite Life-Saving Protocol: Do NOT cut, suck venom, or tie tight rope tourniquets. Keep limb still and rush immediately to the nearest CHC for Antivenom.")

elif "Book Service" in menu or "टोकन बुक" in menu:
    st.header("📋 Book Healthcare Service / Appointment Token")
    with st.form("appointment_form"):
        p_name = st.text_input("Patient Full Name")
        c1, c2 = st.columns(2)
        p_age = c1.number_input("Age", min_value=1, max_value=110, value=25)
        p_gender = c2.selectbox("Gender", ["Female", "Male", "Other"])
        p_phone = st.text_input("Mobile Phone (for SMS Token)")
        p_village = st.text_input("Village / Gram Panchayat")
        p_facility = st.selectbox("Preferred Health Facility", [f["Name"] for f in facilities])
        p_service = st.selectbox("Service Needed", [
            "General OPD Doctor Checkup",
            "Maternal Antenatal Checkup (ANC)",
            "Child Routine Vaccination",
            "Elder BP & Sugar Medicine Refill",
            "Diagnostic Blood/Lab Test"
        ])
        p_date = st.date_input("Preferred Date", datetime.date.today() + datetime.timedelta(days=1))
        p_slot = st.selectbox("Time Window", ["Morning (09:00 AM - 12:30 PM)", "Afternoon (01:30 PM - 04:30 PM)"])
        submitted = st.form_submit_button("Generate Appointment Token")
        if submitted:
            token_id = f"MED-2026-{hash(p_name + str(p_age)) % 9000 + 1000}"
            st.success(f"✅ Appointment Booked! Token Number: **{token_id}**")
            st.write(f"An SMS has been dispatched to {p_phone} for visit at **{p_facility}** on **{p_date}**.")

elif "Patient Feedback" in menu or "मरीज की राय" in menu:
    st.header("⭐ Patient Feedback & Community Voice")
    st.write("Transparent community reviews ensure medicine availability and respectful care.")
    with st.form("feedback_form"):
        f_name = st.text_input("Your Name (or leave blank for Anonymous)")
        f_facility = st.selectbox("Facility Visited", [f["Name"] for f in facilities])
        f_rating = st.slider("Overall Experience (1 = Poor, 5 = Excellent)", 1, 5, 5)
        f_meds = st.radio("Were prescribed medicines available free?", ["Yes, full supply", "Partially available", "Out of stock"])
        f_comment = st.text_area("Your Feedback / Grievance")
        fb_submit = st.form_submit_button("Submit Review")
        if fb_submit:
            st.success("Thank you! Your feedback has been recorded in the community monitoring ledger.")

elif "Dashboard" in menu or "सांख्यिकी" in menu:
    st.header("📊 Rural Healthcare Access Dashboard")
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Mapped Facilities", "128", "+12% this quarter")
    m2.metric("Rural Population", "342,800+", "214 Panchayats")
    m3.metric("Avg Travel Time", "14.2 min", "-70% reduction")
    m4.metric("Medicine Stock Rate", "92.4%", "Essential Drug Index")
    st.subheader("Monthly Outpatient Footfall")
    chart_data = pd.DataFrame({
        "Month": ["May", "Jun", "Jul", "Aug", "Sep"],
        "PHC Patients": [12400, 13800, 15900, 18200, 17100],
        "CHC Patients": [8900, 9400, 11200, 12800, 11900],
        "Mobile Van Patients": [3200, 3900, 4800, 5900, 5400]
    })
    st.bar_chart(chart_data.set_index("Month"))

else:
    st.header("🎓 College Project Presentation Overview")
    st.markdown("""
    ### Problem Statement
    Rural public healthcare delivery faces severe challenges: long travel times, doctor absenteeism, frequent medicine stockouts, and lack of digital transparency.
    ### Medway Solution
    Medway is a low-bandwidth, accessible web prototype offering:
    1. **Facility Discovery with Live Stock Status**
    2. **Preventive Health & Universal Immunization Tracking**
    3. **Paperless Appointment Tokens via SMS**
    4. **Community Feedback & Grievance Redressal**
    5. **Public Health Analytics Dashboard**
    """)
    st.success("Prototype ready for academic viva and project presentation.")
