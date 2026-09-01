import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUsers, FaUserTie, FaGraduationCap, FaIndustry,
    FaAward, FaBookOpen, FaChartLine, FaCheckCircle,
    FaBuilding, FaCalendarAlt, FaFileAlt, FaDownload,
    FaChevronRight, FaLightbulb, FaShieldAlt, FaComments,
    FaCompass, FaCheckDouble, FaBriefcase, FaHandshake,
    FaLaptopCode, FaMicrochip, FaCogs, FaBolt,
    FaHeartbeat, FaSeedling, FaFilePdf, FaExternalLinkAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import { Link } from 'react-router-dom';

const pacData = {
    title: "Program Advisory Committee (PAC)",
    subtitle: "Steering Academic Excellence, Curriculum Innovation & Outcome-Based Education (OBE) Quality Frameworks.",
    heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    vision: "To establish a dynamic and proactive academic-industry consultative forum that continuously elevates the pedagogical quality, curriculum relevance, and professional competency of our engineering graduates.",
    mission: [
        "To review and validate the Vision, Mission, Program Educational Objectives (PEOs), Program Outcomes (POs), and Program Specific Outcomes (PSOs) for all academic programs.",
        "To conduct annual curriculum gap analysis and formulate recommendations for value-added courses, hands-on workshops, and industry internships.",
        "To analyze Course Outcome (CO) - Program Outcome (PO) attainment reports and guide departmental faculty in Continuous Quality Improvement (CQI) measures.",
        "To foster collaborative research, student live projects, faculty development programs, and consultancy partnerships with leading industries and premier academic institutions."
    ],
    overviewParagraphs: [
        "The Program Advisory Committee (PAC) / Program Assessment Committee at EASA College of Engineering and Technology serves as the strategic steering body for each academic department.",
        "Composed of distinguished academicians from premier universities, veteran corporate executives, accomplished alumni, senior faculty members, and student representatives, the PAC ensures our engineering curriculum remains agile, rigorous, and directly aligned with modern industrial transformations.",
        "Meeting bi-annually, the committee evaluates direct and indirect assessment metrics, reviews syllabus gap-filling initiatives, benchmarks laboratory infrastructure, and monitors student progression toward national and global standards (NBA Tier-II / Washington Accord)."
    ],
    keyFunctions: [
        {
            num: "01",
            title: "Vision, Mission & PEO Alignment",
            desc: "Regularly reviewing and refining departmental Vision, Mission, and Program Educational Objectives based on evolving societal and technological needs.",
            icon: <FaCompass />
        },
        {
            num: "02",
            title: "Curriculum Gap Analysis & Upgrades",
            desc: "Identifying syllabus gaps in Anna University curriculum and recommending specialized value-added courses, coding bootcamps, and modern tools.",
            icon: <FaBookOpen />
        },
        {
            num: "03",
            title: "CO-PO Attainment Assessment & CQI",
            desc: "Evaluating direct internal assessment data and indirect survey feedback to formulate Continuous Quality Improvement (CQI) action plans.",
            icon: <FaChartLine />
        },
        {
            num: "04",
            title: "Industry Collaboration & Internships",
            desc: "Facilitating corporate internships, sponsored student hackathons, industrial visits, guest lectures by technical leaders, and MoUs.",
            icon: <FaHandshake />
        },
        {
            num: "05",
            title: "Laboratory Modernization & Research",
            desc: "Recommending advanced laboratory equipment, software licenses, AICTE IDEA Lab modules, and interdisciplinary student innovation projects.",
            icon: <FaCogs />
        },
        {
            num: "06",
            title: "Placement & Higher Studies Readiness",
            desc: "Assessing student performance in campus recruitment drives and national competitive examinations (GATE, GRE, CAT) to guide mentoring.",
            icon: <FaGraduationCap />
        }
    ],
    departments: [
        {
            id: "cse",
            name: "Computer Science & Engineering (CSE)",
            chairperson: "Dr. S. Ramasamy, Professor & Head",
            academicExpert: "Dr. K. Balakrishnan, Associate Professor, NIT Tiruchirappalli",
            industryExpert: "Mr. G. Arvind, Principal Architect, Zoho Corporation",
            alumniRep: "Ms. Priyanka R. (Batch '21), Senior Software Engineer, Cognizant",
            members: ["Dr. M. Soundararajan (Prof)", "Dr. V. Deepa (Asst Prof)", "Mr. R. Karthik (Asst Prof)"],
            focus: "Cloud Computing, Generative AI, Cyber Security & Full Stack Architecture",
            icon: <FaLaptopCode />
        },
        {
            id: "aids",
            name: "Artificial Intelligence & Data Science (AI&DS)",
            chairperson: "Dr. P. Manoharan, Professor & Head",
            academicExpert: "Dr. M. Sridharan, Professor, Anna University Regional Campus",
            industryExpert: "Mr. K. Vignesh, Data Engineering Lead, LatentView Analytics",
            alumniRep: "Mr. Vignesh S. (Batch '22), ML Ops Engineer, Freshworks",
            members: ["Dr. R. Kavitha (Assoc Prof)", "Mr. T. Dinesh (Asst Prof)", "Ms. S. Abinaya (Asst Prof)"],
            focus: "Deep Neural Networks, Computer Vision, Big Data Lakehouses & NLP",
            icon: <FaLightbulb />
        },
        {
            id: "mech",
            name: "Mechanical Engineering (MECH)",
            chairperson: "Dr. K. Arulmurugan, Professor & Head",
            academicExpert: "Dr. T. Murugesan, Professor, PSG College of Technology",
            industryExpert: "Mr. S. Ravichandran, Vice President - Operations, L&T Valves",
            alumniRep: "Mr. Karthik R. (Batch '20), Founder, AgroBotix Technologies",
            members: ["Dr. P. Selvakumar (Assoc Prof)", "Mr. N. Ramesh (Asst Prof)", "Mr. G. Prabhu (Asst Prof)"],
            focus: "Robotics & Automation, 3D Printing, Thermal Systems & Smart Manufacturing",
            icon: <FaCogs />
        },
        {
            id: "ece",
            name: "Electronics & Communication Engineering (ECE)",
            chairperson: "Dr. N. Saravanan, Professor & Head",
            academicExpert: "Dr. R. Jayagopal, Associate Professor, Government College of Tech (GCT)",
            industryExpert: "Mr. B. Suresh Kumar, Senior Director, Texas Instruments",
            alumniRep: "Ms. Lavanya K. (Batch '21), Embedded Systems Engineer, Bosch",
            members: ["Dr. K. Revathi (Assoc Prof)", "Mr. M. Anand (Asst Prof)", "Ms. P. Gayathri (Asst Prof)"],
            focus: "VLSI Design, Edge IoT Sensors, 5G Wireless & Embedded Firmware",
            icon: <FaMicrochip />
        },
        {
            id: "eee",
            name: "Electrical & Electronics Engineering (EEE)",
            chairperson: "Dr. M. Vijayakumar, Professor & Head",
            academicExpert: "Dr. S. Albert, Professor, Coimbatore Institute of Technology (CIT)",
            industryExpert: "Mr. D. Srinivasan, General Manager, ABB India Ltd",
            alumniRep: "Mr. Mohanraj P. (Batch '19), EV Battery Specialist, Ather Energy",
            members: ["Dr. A. Sundar (Assoc Prof)", "Mr. C. Mohan (Asst Prof)", "Ms. V. Divya (Asst Prof)"],
            focus: "Electric Vehicles (EV), Smart Microgrids, Renewable Energy & Power Electronics",
            icon: <FaBolt />
        },
        {
            id: "bme",
            name: "Biomedical Engineering (BME)",
            chairperson: "Dr. R. Anuradha, Professor & Head",
            academicExpert: "Dr. S. Meenakshi, Professor, PSG Institute of Medical Sciences",
            industryExpert: "Mr. K. Rajesh, Lead Medical Device Engineer, Siemens Healthineers",
            alumniRep: "Ms. Deepika S. (Batch '22), Clinical Telemetry Specialist, Apollo",
            members: ["Dr. G. Pavithra (Assoc Prof)", "Mr. S. Santhosh (Asst Prof)", "Ms. K. Nithya (Asst Prof)"],
            focus: "Bio-Instrumentation, Telemedicine, Medical Imaging & Implantable Devices",
            icon: <FaHeartbeat />
        },
        {
            id: "agri",
            name: "Agriculture Engineering (AGRI)",
            chairperson: "Dr. S. Thilagavathi, Professor & Head",
            academicExpert: "Dr. M. Chinnasamy, Professor, Tamil Nadu Agricultural University (TNAU)",
            industryExpert: "Mr. V. Sakthivel, Agronomist & Director, Jain Irrigation Systems",
            alumniRep: "Mr. Pradeep K. (Batch '20), Precision Agriculture Consultant",
            members: ["Dr. R. Senthamil (Assoc Prof)", "Mr. K. Vetrivel (Asst Prof)", "Ms. T. Mythili (Asst Prof)"],
            focus: "Drone Crop Monitoring, Precision Irrigation, Soil Sensors & Post-Harvest Tech",
            icon: <FaSeedling />
        }
    ],
    compositionRoles: [
        {
            role: "Chairperson",
            designation: "Head of Department (HOD)",
            responsibility: "Convenes meetings, presides over deliberations, and oversees overall execution of PAC resolutions."
        },
        {
            role: "Member Secretary / Coordinator",
            designation: "Senior Associate Professor",
            responsibility: "Prepares meeting agendas, compiles assessment data reports, records minutes, and tracks Action Taken Reports."
        },
        {
            role: "Academic Experts (External)",
            designation: "Professors from Premier Institutes (IIT/NIT/Anna Univ)",
            responsibility: "Provides peer benchmarking, pedagogical best practices, and evaluates syllabus rigor against global standards."
        },
        {
            role: "Industry Experts (External)",
            designation: "Senior Technical Directors / Corporate Heads",
            responsibility: "Identifies emerging industry skill gaps, suggests modern software/tools, and facilitates internship opportunities."
        },
        {
            role: "Alumni Representative",
            designation: "Distinguished Alumni in Corporate/Startup Leadership",
            responsibility: "Shares real-world workplace feedback on curriculum efficacy and guides student mentoring tracks."
        },
        {
            role: "Faculty & Student Members",
            designation: "Program Coordinators, Module Leads & Student Reps",
            responsibility: "Presents direct classroom and laboratory feedback, learning challenges, and student suggestions."
        }
    ],
    meetingProcess: [
        {
            step: "01",
            phase: "Pre-Meeting Data Compilation",
            desc: "Department compiles internal assessment marks, semester exam results, CO-PO attainment indices, student exit feedback, and employer survey responses."
        },
        {
            step: "02",
            phase: "Bi-Annual Deliberation & Gap Analysis",
            desc: "PAC convenes to review attainment reports, evaluate curriculum gaps against Anna University updates, and deliberate on modern industry needs."
        },
        {
            step: "03",
            phase: "Resolution & Minutes of Meeting (MoM)",
            desc: "Formal resolutions are passed regarding value-added courses, laboratory equipment additions, internship programs, and remedial coaching."
        },
        {
            step: "04",
            phase: "Action Taken Report (ATR) Execution",
            desc: "Department executes approved recommendations, implements value-added courses, and reports the Action Taken Report (ATR) in the subsequent meeting."
        }
    ],
    faqs: [
        {
            q: "What is the difference between PAC and DAC (Department Academic Committee)?",
            a: "While the Department Academic Committee (DAC) manages day-to-day internal academic operations, the Program Advisory Committee (PAC) includes external industry leaders, academic scholars from premier universities, and alumni to provide high-level strategic guidance, OBE attainment audits, and curriculum relevance benchmarking."
        },
        {
            q: "How frequently does the Program Advisory Committee meet?",
            a: "The PAC meets at least twice per academic year (once each semester before academic commencement and after examination result publications) to review assessment data and approve the upcoming action plan."
        },
        {
            q: "How do PAC recommendations impact student learning and placements?",
            a: "PAC recommendations directly translate into specialized value-added certificate courses (e.g. Full-Stack Web, AI/ML, VLSI, EV Tech), upgraded lab equipment in the AICTE IDEA Lab, hands-on corporate workshops, and live industry project opportunities."
        },
        {
            q: "Can students or alumni submit curriculum feedback to the PAC?",
            a: "Yes! Students submit regular course-end exit surveys, and alumni can submit industry recommendations through our digital feedback portal or via alumni representatives serving on the committee."
        }
    ]
};

const PacPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDept, setSelectedDept] = useState('cse');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(false);
    const [feedbackForm, setFeedbackForm] = useState({
        name: '',
        email: '',
        role: 'Student',
        department: 'CSE',
        suggestionType: 'Curriculum & Value-Added Courses',
        message: ''
    });
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tabs = [
        { id: 'overview', label: 'Overview & Vision', icon: <FaCompass /> },
        { id: 'functions', label: 'Key Responsibilities', icon: <FaCheckDouble /> },
        { id: 'departments', label: 'Department PACs', icon: <FaBuilding /> },
        { id: 'composition', label: 'Committee Composition', icon: <FaUsers /> },
        { id: 'process', label: 'Meeting Lifecycle', icon: <FaCalendarAlt /> },
        { id: 'faqs', label: 'FAQs & Feedback', icon: <FaLightbulb /> }
    ];

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        setFeedbackSubmitted(true);
        setTimeout(() => {
            setFeedbackModal(false);
            setFeedbackSubmitted(false);
            setFeedbackForm({
                name: '',
                email: '',
                role: 'Student',
                department: 'CSE',
                suggestionType: 'Curriculum & Value-Added Courses',
                message: ''
            });
            alert('✨ Thank you! Your recommendation has been submitted to the Program Advisory Committee (PAC) for review.');
        }, 1500);
    };

    const currentDeptData = pacData.departments.find(d => d.id === selectedDept) || pacData.departments[0];

    return (
        <div className="pac-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="Program Advisory Committee (PAC) | EASA College"
                description="Program Advisory Committee (PAC) at EASA College - Departmental academic steering committees, industry gap analysis, PEOs/POs attainment, and OBE quality improvement."
                keywords="Program Advisory Committee, PAC EASA, Program Assessment Committee, Outcome Based Education, NBA OBE, Curriculum Gap Analysis, Department Advisory"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="pac"
                defaultTitle={pacData.title}
                defaultSubtitle={pacData.subtitle}
                defaultImage={pacData.heroImage}
            />

            {/* MAIN CONTENT WRAPPER */}
            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2.5rem' }} className="pac-grid">

                    {/* LEFT SIDEBAR NAVIGATION */}
                    <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <div style={{
                            background: cardBg,
                            borderRadius: '24px',
                            border: cardBorder,
                            padding: '1.8rem',
                            boxShadow: cardShadow,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem'
                        }}>
                            <div style={{ padding: '0.5rem 0.8rem 1.2rem', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.9)' }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: accentColor, marginBottom: '0.3rem' }}>
                                    Academic Governance
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                    PAC Directory
                                </h3>
                            </div>

                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            window.scrollTo({ top: 380, behavior: 'smooth' });
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '0.9rem 1.2rem',
                                            borderRadius: '16px',
                                            border: isActive ? `1px solid ${accentColor}` : '1px solid transparent',
                                            background: isActive
                                                ? isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)'
                                                : 'transparent',
                                            color: isActive ? (isDark ? '#38BDF8' : '#2563EB') : secondaryTextColor,
                                            fontWeight: isActive ? '800' : '600',
                                            fontSize: '0.95rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left'
                                        }}
                                        className="pac-tab-btn"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                            <span style={{ fontSize: '1.15rem' }}>{tab.icon}</span>
                                            <span>{tab.label}</span>
                                        </div>
                                        <FaChevronRight size={12} style={{ opacity: isActive ? 1 : 0.4 }} />
                                    </button>
                                );
                            })}

                            {/* SUBMIT FEEDBACK CTA BANNER */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.5rem',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                color: '#ffffff',
                                textAlign: 'center',
                                boxShadow: '0 10px 25px rgba(37,99,235,0.3)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}><FaComments /></div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '0.4rem' }}>Submit Feedback</h4>
                                <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: '1.4', marginBottom: '1.2rem' }}>
                                    Submit your curriculum, technical, or lab enhancement proposals directly to the PAC.
                                </p>
                                <button
                                    onClick={() => setFeedbackModal(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '50px',
                                        background: '#F59E0B',
                                        color: '#000000',
                                        fontWeight: '900',
                                        fontSize: '0.88rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(245,158,11,0.4)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Submit Proposal
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT DYNAMIC TAB CONTENT */}
                    <main style={{ minHeight: '600px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* 1. OVERVIEW & VISION */}
                                {activeTab === 'overview' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{
                                                padding: '0.4rem 1.2rem',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: accentColor,
                                                borderRadius: '50px',
                                                fontSize: '0.82rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Academic Steering Body
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Program Advisory Committee (PAC)
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {pacData.overviewParagraphs.map((para, idx) => (
                                                <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                                    {para}
                                                </p>
                                            ))}
                                        </div>

                                        {/* VISION & MISSION DUAL CARDS */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '0.5rem' }}>
                                            {/* VISION */}
                                            <div style={{
                                                background: cardBg,
                                                borderRadius: '24px',
                                                border: cardBorder,
                                                padding: '2.5rem',
                                                boxShadow: cardShadow
                                            }}>
                                                <div style={{
                                                    width: '56px',
                                                    height: '56px',
                                                    borderRadius: '16px',
                                                    background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.6rem',
                                                    marginBottom: '1.5rem',
                                                    boxShadow: '0 8px 20px rgba(37,99,235,0.3)'
                                                }}>
                                                    <FaCompass />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#38BDF8' : '#1E40AF', marginBottom: '1rem' }}>
                                                    PAC Vision
                                                </h3>
                                                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
                                                    {pacData.vision}
                                                </p>
                                            </div>

                                            {/* MISSION */}
                                            <div style={{
                                                background: cardBg,
                                                borderRadius: '24px',
                                                border: cardBorder,
                                                padding: '2.5rem',
                                                boxShadow: cardShadow
                                            }}>
                                                <div style={{
                                                    width: '56px',
                                                    height: '56px',
                                                    borderRadius: '16px',
                                                    background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.6rem',
                                                    marginBottom: '1.5rem',
                                                    boxShadow: '0 8px 20px rgba(245,158,11,0.3)'
                                                }}>
                                                    <FaAward />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#FBBF24' : '#B45309', marginBottom: '1rem' }}>
                                                    PAC Mission & Objectives
                                                </h3>
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                                    {pacData.mission.map((item, idx) => (
                                                        <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', fontSize: '0.95rem', lineHeight: '1.5', color: primaryTextColor, fontWeight: '500' }}>
                                                            <span style={{ color: isDark ? '#F59E0B' : '#D97706', flexShrink: 0, marginTop: '0.2rem' }}>
                                                                <FaCheckCircle size={14} />
                                                            </span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 2. KEY RESPONSIBILITIES & FUNCTIONS */}
                                {activeTab === 'functions' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{
                                                padding: '0.4rem 1.2rem',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: accentColor,
                                                borderRadius: '50px',
                                                fontSize: '0.82rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Strategic Mandate
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Core Functions & Responsibilities
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Key operational domains overseen by the Program Advisory Committee across each department.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                            {pacData.keyFunctions.map((func, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2.2rem 1.8rem',
                                                        boxShadow: cardShadow,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                                            <div style={{
                                                                width: '52px',
                                                                height: '52px',
                                                                borderRadius: '16px',
                                                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                                color: '#ffffff',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '1.5rem',
                                                                boxShadow: '0 6px 16px rgba(37,99,235,0.25)'
                                                            }}>
                                                                {func.icon}
                                                            </div>
                                                            <span style={{
                                                                fontSize: '1.8rem',
                                                                fontWeight: '900',
                                                                color: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(37, 99, 235, 0.2)',
                                                                fontFamily: 'Outfit, sans-serif'
                                                            }}>
                                                                {func.num}
                                                            </span>
                                                        </div>

                                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>
                                                            {func.title}
                                                        </h3>

                                                        <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                                            {func.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. DEPARTMENT-WISE PACs */}
                                {activeTab === 'departments' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{
                                                padding: '0.4rem 1.2rem',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: accentColor,
                                                borderRadius: '50px',
                                                fontSize: '0.82rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Departmental Committees
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Department Program Advisory Committees
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Select a department to view its PAC chairperson, external academic scholars, industry executives, and faculty members.
                                            </p>
                                        </div>

                                        {/* DEPARTMENT SELECTION CHIPS */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                            {pacData.departments.map((dept) => {
                                                const isSel = selectedDept === dept.id;
                                                return (
                                                    <button
                                                        key={dept.id}
                                                        onClick={() => setSelectedDept(dept.id)}
                                                        style={{
                                                            padding: '0.7rem 1.4rem',
                                                            borderRadius: '50px',
                                                            border: isSel ? `1px solid ${accentColor}` : cardBorder,
                                                            background: isSel
                                                                ? 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)'
                                                                : cardBg,
                                                            color: isSel ? '#ffffff' : primaryTextColor,
                                                            fontWeight: '800',
                                                            fontSize: '0.88rem',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.6rem'
                                                        }}
                                                    >
                                                        <span>{dept.icon}</span>
                                                        <span>{dept.name.split(' ')[0]}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* SELECTED DEPARTMENT PAC CARD */}
                                        <motion.div
                                            key={selectedDept}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                background: cardBg,
                                                borderRadius: '28px',
                                                border: cardBorder,
                                                padding: '2.8rem 2.2rem',
                                                boxShadow: cardShadow
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.4rem' }}>
                                                        {currentDeptData.name}
                                                    </h3>
                                                    <div style={{ fontSize: '0.92rem', color: accentColor, fontWeight: '800' }}>
                                                        Curriculum Focus: {currentDeptData.focus}
                                                    </div>
                                                </div>
                                                <span style={{
                                                    padding: '0.4rem 1rem',
                                                    borderRadius: '50px',
                                                    background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                                                    color: '#10B981',
                                                    fontSize: '0.82rem',
                                                    fontWeight: '800'
                                                }}>
                                                    Active PAC (2025 - 2026)
                                                </span>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                                {/* CHAIRPERSON */}
                                                <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: accentColor, fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                                        Chairperson (HOD)
                                                    </div>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.2rem' }}>
                                                        {currentDeptData.chairperson}
                                                    </h4>
                                                </div>

                                                {/* ACADEMIC EXPERT */}
                                                <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: isDark ? '#FBBF24' : '#D97706', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                                        External Academic Expert
                                                    </div>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.2rem' }}>
                                                        {currentDeptData.academicExpert}
                                                    </h4>
                                                </div>

                                                {/* INDUSTRY EXPERT */}
                                                <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#10B981', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                                        Industry Leader / Expert
                                                    </div>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.2rem' }}>
                                                        {currentDeptData.industryExpert}
                                                    </h4>
                                                </div>

                                                {/* ALUMNI REP */}
                                                <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                                        Alumni Representative
                                                    </div>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.2rem' }}>
                                                        {currentDeptData.alumniRep}
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* INTERNAL FACULTY MEMBERS */}
                                            <div style={{ marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)' }}>
                                                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: primaryTextColor, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                                                    Internal Department Faculty Members:
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                                    {currentDeptData.members.map((mem, mIdx) => (
                                                        <span key={mIdx} style={{
                                                            padding: '0.4rem 0.9rem',
                                                            borderRadius: '8px',
                                                            background: isDark ? 'rgba(56, 189, 248, 0.1)' : '#F1F5F9',
                                                            color: primaryTextColor,
                                                            fontSize: '0.85rem',
                                                            fontWeight: '700'
                                                        }}>
                                                            {mem}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}

                                {/* 4. COMMITTEE COMPOSITION & ROLES */}
                                {activeTab === 'composition' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{
                                                padding: '0.4rem 1.2rem',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: accentColor,
                                                borderRadius: '50px',
                                                fontSize: '0.82rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Organizational Framework
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                PAC Structure & Role Definitions
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {pacData.compositionRoles.map((role, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '20px',
                                                        border: cardBorder,
                                                        padding: '1.8rem 2rem',
                                                        boxShadow: cardShadow,
                                                        display: 'grid',
                                                        gridTemplateColumns: '260px 1fr',
                                                        gap: '2rem',
                                                        alignItems: 'center'
                                                    }}
                                                    className="pac-role-grid"
                                                >
                                                    <div style={{ borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)', paddingRight: '1rem' }}>
                                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                            {role.role}
                                                        </h4>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: accentColor }}>
                                                            {role.designation}
                                                        </div>
                                                    </div>

                                                    <p style={{ fontSize: '0.98rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                                        {role.responsibility}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 5. MEETING LIFECYCLE */}
                                {activeTab === 'process' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{
                                                padding: '0.4rem 1.2rem',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: accentColor,
                                                borderRadius: '50px',
                                                fontSize: '0.82rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Quality Assurance Cycle
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                PAC 4-Stage Operating Lifecycle
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                How data flows from classroom evaluations to committee deliberation, resolution passing, and Action Taken Report (ATR) execution.
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {pacData.meetingProcess.map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2.2rem 2rem',
                                                        boxShadow: cardShadow,
                                                        display: 'grid',
                                                        gridTemplateColumns: '220px 1fr',
                                                        gap: '2rem',
                                                        alignItems: 'center'
                                                    }}
                                                    className="pac-role-grid"
                                                >
                                                    <div style={{ borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)', paddingRight: '1rem' }}>
                                                        <span style={{
                                                            padding: '0.35rem 0.9rem',
                                                            borderRadius: '50px',
                                                            background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                            color: '#ffffff',
                                                            fontWeight: '900',
                                                            fontSize: '0.78rem',
                                                            textTransform: 'uppercase',
                                                            display: 'inline-block',
                                                            marginBottom: '0.8rem'
                                                        }}>
                                                            Stage {step.step}
                                                        </span>
                                                        <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                                            {step.phase}
                                                        </h4>
                                                    </div>

                                                    <p style={{ fontSize: '1rem', color: secondaryTextColor, lineHeight: '1.65', margin: 0 }}>
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 6. FAQS */}
                                {activeTab === 'faqs' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{
                                                padding: '0.4rem 1.2rem',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: accentColor,
                                                borderRadius: '50px',
                                                fontSize: '0.82rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                Got Questions?
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Frequently Asked Questions
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {pacData.faqs.map((faq, idx) => {
                                                const isOpen = openFaq === idx;
                                                return (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            background: cardBg,
                                                            borderRadius: '20px',
                                                            border: cardBorder,
                                                            overflow: 'hidden',
                                                            boxShadow: cardShadow
                                                        }}
                                                    >
                                                        <button
                                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                                            style={{
                                                                width: '100%',
                                                                padding: '1.5rem 1.8rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                background: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                color: primaryTextColor,
                                                                textAlign: 'left',
                                                                fontSize: '1.05rem',
                                                                fontWeight: '800'
                                                            }}
                                                        >
                                                            <span>{faq.q}</span>
                                                            <FaChevronRight size={14} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', color: accentColor }} />
                                                        </button>
                                                        <AnimatePresence>
                                                            {isOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    style={{ padding: '0 1.8rem 1.5rem', color: secondaryTextColor, fontSize: '0.98rem', lineHeight: '1.7' }}
                                                                >
                                                                    {faq.a}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* FEEDBACK PROPOSAL MODAL */}
            <AnimatePresence>
                {feedbackModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.75)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                background: cardBg,
                                borderRadius: '28px',
                                border: cardBorder,
                                width: '100%',
                                maxWidth: '560px',
                                padding: '2.5rem',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setFeedbackModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.2rem',
                                    right: '1.2rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    color: secondaryTextColor,
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem' }}>
                                Submit PAC Curriculum Proposal
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, marginBottom: '1.5rem' }}>
                                Share your recommendations on syllabus value-adds, emerging industry tools, or laboratory facilities.
                            </p>

                            <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Your Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={feedbackForm.name}
                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                                        placeholder="e.g. Dr. K. Ramesh / Karthik S."
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={feedbackForm.email}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                                            placeholder="user@domain.com"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Stakeholder Role *</label>
                                        <select
                                            value={feedbackForm.role}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, role: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="Student">Current Student</option>
                                            <option value="Faculty">Faculty Member</option>
                                            <option value="Alumni">Alumni</option>
                                            <option value="Industry Expert">Industry Expert / Employer</option>
                                            <option value="Parent">Parent</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Department *</label>
                                        <select
                                            value={feedbackForm.department}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, department: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="CSE">Computer Science & Engineering</option>
                                            <option value="AI&DS">AI & Data Science</option>
                                            <option value="MECH">Mechanical Engineering</option>
                                            <option value="ECE">Electronics & Communication</option>
                                            <option value="EEE">Electrical & Electronics</option>
                                            <option value="BME">Biomedical Engineering</option>
                                            <option value="Agri">Agriculture Engineering</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Proposal Category *</label>
                                        <select
                                            value={feedbackForm.suggestionType}
                                            onChange={(e) => setFeedbackForm({ ...feedbackForm, suggestionType: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="Curriculum & Value-Added Courses">Curriculum / Value-Added Courses</option>
                                            <option value="Lab Equipment & Software">Lab Equipment & Software Upgrades</option>
                                            <option value="Industry Project & Internship">Industry Projects & Internships</option>
                                            <option value="PEO / PSO Review">PEO / PSO Formulation</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Detailed Recommendation *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={feedbackForm.message}
                                        onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                                        placeholder="Describe your suggested topic, tool, or workshop and its benefits..."
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none', resize: 'vertical' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={feedbackSubmitted}
                                    style={{
                                        marginTop: '0.8rem',
                                        padding: '0.85rem',
                                        borderRadius: '50px',
                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                        color: '#ffffff',
                                        fontWeight: '900',
                                        fontSize: '0.95rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {feedbackSubmitted ? 'Submitting...' : 'Submit to PAC'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .pac-tab-btn:hover {
                    background: ${isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.06)'} !important;
                    color: ${accentColor} !important;
                }
                @media (max-width: 968px) {
                    .pac-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .pac-role-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default PacPage;
