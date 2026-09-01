import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaAward, FaCertificate, FaGraduationCap, FaCheckCircle,
    FaBookOpen, FaChartLine, FaUsers, FaUniversity,
    FaFileAlt, FaDownload, FaExternalLinkAlt, FaLightbulb,
    FaBuilding, FaCogs, FaChevronRight, FaShieldAlt,
    FaLaptopCode, FaMicrochip, FaSeedling, FaHeartbeat,
    FaBolt, FaCompass, FaCheckDouble
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import { Link } from 'react-router-dom';

const nbaData = {
    title: "National Board of Accreditation (NBA)",
    subtitle: "Committed to Outcome-Based Technical Education & Global Standards",
    heroImage: "/images/banner/naac-a-grade-accreditation-2.webp",
    vision: "To achieve and sustain national and global standards in technical education through systematic Outcome-Based Education (OBE), continuous curriculum innovation, student-centric pedagogy, and industry-oriented research.",
    mission: [
        "To adhere rigorously to NBA's 10-tier quality evaluation framework for undergraduate and postgraduate engineering programs.",
        "To ensure systematic attainment of Program Outcomes (POs), Program Specific Outcomes (PSOs), and Course Outcomes (COs).",
        "To foster an environment of continuous quality improvement (CQI) driven by active feedback from students, alumni, employers, and academic peers.",
        "To align teaching-learning processes with Washington Accord benchmarks for global mobility and professional recognition of EASA graduates."
    ],
    overviewParagraphs: [
        "The National Board of Accreditation (NBA), established by AICTE, evaluates and certifies technical education programs in India based on qualitative and quantitative benchmarks aligned with the Washington Accord.",
        "At EASA College of Engineering and Technology, NBA accreditation represents our uncompromising commitment to Outcome-Based Education (OBE). Our engineering departments follow rigorous curriculum delivery, practical skill-building, modern laboratory exposure, research mentoring, and student-centered pedagogy.",
        "Through structured Course Outcome (CO) - Program Outcome (PO) mapping, continuous internal assessments, faculty development programs, and state-of-the-art infrastructure, EASA prepares graduates who are globally competent, ethically sound, and industry-ready."
    ],
    highlights: [
        { label: "NBA Assessment Framework", value: "Tier-II / OBE", icon: <FaAward /> },
        { label: "Engineering Disciplines", value: "8+ Branches", icon: <FaUniversity /> },
        { label: "Core Program Outcomes", value: "12 POs + PSOs", icon: <FaCheckDouble /> },
        { label: "Faculty Cadre Ratio", value: "1:15 / 1:20", icon: <FaUsers /> },
        { label: "Laboratory Modernization", value: "100%", icon: <FaCogs /> }
    ],
    criteria: [
        {
            num: "01",
            title: "Vision, Mission & PEOs",
            marks: "50 Marks",
            desc: "Well-defined vision, mission statements and Program Educational Objectives aligned with institutional and societal needs."
        },
        {
            num: "02",
            title: "Program Curriculum & Teaching-Learning",
            marks: "100 Marks",
            desc: "Curriculum structure, adherence to Anna University syllabus, innovative pedagogical practices, and experiential learning."
        },
        {
            num: "03",
            title: "Course Outcomes & Program Outcomes",
            marks: "175 Marks",
            desc: "Systematic formulation of COs, attainment calculation methodology, and direct/indirect PO-PSO assessment matrices."
        },
        {
            num: "04",
            title: "Students' Performance & Progression",
            marks: "100 Marks",
            desc: "Academic pass percentage, graduation rate, placement records, higher studies admissions, and professional achievements."
        },
        {
            num: "05",
            title: "Faculty Information & Contributions",
            marks: "200 Marks",
            desc: "Faculty cadre ratio, retention rates, Ph.D. qualifications, research publications in Scopus/SCI, patents, and consultancy."
        },
        {
            num: "06",
            title: "Facilities & Technical Support",
            marks: "80 Marks",
            desc: "Modern laboratory equipment, AICTE IDEA Lab, safety standards, computing facilities, and licensed engineering software."
        },
        {
            num: "07",
            title: "Continuous Improvement (CQI)",
            marks: "75 Marks",
            desc: "Systematic feedback loops, action taken on previous evaluations, curriculum value-adds, and academic quality audits."
        },
        {
            num: "08",
            title: "First Year Academics",
            marks: "50 Marks",
            desc: "First-year student-faculty ratio, qualification of basic science faculty, bridge courses, and foundational learning."
        },
        {
            num: "09",
            title: "Student Support Systems",
            marks: "50 Marks",
            desc: "Mentoring & proctorial system, career counseling, professional student chapters (IEEE, ISTE, CSI), and grievance redressal."
        },
        {
            num: "10",
            title: "Governance & Financial Resources",
            marks: "120 Marks",
            desc: "Institutional leadership, decentralized governance, adequate operational budget allocation, and infrastructure investment."
        }
    ],
    programs: [
        {
            name: "B.E. Computer Science & Engineering",
            short: "CSE",
            icon: <FaLaptopCode />,
            intake: 120,
            status: "NBA Tier-II OBE Aligned",
            focus: "Full-Stack Web Tech, Cloud Architecture, Cyber Security & Algorithms"
        },
        {
            name: "B.Tech. Artificial Intelligence & Data Science",
            short: "AI&DS",
            icon: <FaLightbulb />,
            intake: 60,
            status: "NBA Tier-II OBE Aligned",
            focus: "Machine Learning, Deep Neural Networks, Big Data & Analytics"
        },
        {
            name: "B.E. Mechanical Engineering",
            short: "MECH",
            icon: <FaCogs />,
            intake: 60,
            status: "NBA Tier-II OBE Aligned",
            focus: "CAD/CAM/CAE, Robotics, Thermal Systems & Smart Manufacturing"
        },
        {
            name: "B.E. Electronics & Communication Engineering",
            short: "ECE",
            icon: <FaMicrochip />,
            intake: 60,
            status: "NBA Tier-II OBE Aligned",
            focus: "VLSI Design, Embedded IoT, Wireless Communications & Signal Processing"
        },
        {
            name: "B.E. Electrical & Electronics Engineering",
            short: "EEE",
            icon: <FaBolt />,
            intake: 60,
            status: "NBA Tier-II OBE Aligned",
            focus: "Electric Vehicles (EV), Power Systems, Renewable Energy & Automation"
        },
        {
            name: "B.E. Biomedical Engineering",
            short: "BME",
            icon: <FaHeartbeat />,
            intake: 60,
            status: "NBA Tier-II OBE Aligned",
            focus: "Medical Imaging, Bio-Instrumentation, Telemedicine & Prosthetics"
        },
        {
            name: "B.E. Agriculture Engineering",
            short: "AGRI",
            icon: <FaSeedling />,
            intake: 60,
            status: "NBA Tier-II OBE Aligned",
            focus: "Precision Farming, Farm Machinery, Soil & Water Conservation"
        }
    ],
    obeProcessSteps: [
        {
            step: "01",
            title: "Definition of Vision, Mission & PEOs",
            desc: "Stakeholder consultation (faculty, industry, alumni, parents) to define measurable Program Educational Objectives."
        },
        {
            step: "02",
            title: "Curriculum Mapping & Course Outcomes (COs)",
            desc: "Formulating 5-6 Bloom's Taxonomy-based Course Outcomes for each theoretical and practical course syllabus."
        },
        {
            step: "03",
            title: "Instruction Delivery & Assessment Design",
            desc: "Implementing active learning methods, laboratory experiments, mini-projects, assignments, and internal assessments."
        },
        {
            step: "04",
            title: "Direct & Indirect Attainment Evaluation",
            desc: "Calculating CO attainment via test performance, and measuring PO/PSO attainment through exit surveys and employer feedback."
        },
        {
            step: "05",
            title: "Continuous Quality Improvement (CQI)",
            desc: "Analyzing attainment gaps and implementing remedial classes, value-added skill courses, and lab upgrades for the next cycle."
        }
    ],
    documents: [
        {
            title: "NBA Self-Assessment Report (SAR) - Overview & Framework",
            category: "Institutional SAR",
            year: "2025-2026",
            link: "#"
        },
        {
            title: "Program Outcomes (POs) & Graduate Attributes Manual",
            category: "OBE Manual",
            year: "2025-2026",
            link: "/obe"
        },
        {
            title: "Department Assessment & Attainment Policy Document",
            category: "Academic Policy",
            year: "2025-2026",
            link: "/resources/regulations"
        },
        {
            title: "Continuous Quality Improvement & Stakeholder Feedback Report",
            category: "Audit Report",
            year: "2024-2025",
            link: "/naac-feedback"
        }
    ]
};

const NbaPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [activeTab, setActiveTab] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const tabs = [
        { id: 'overview', label: 'Overview & Vision', icon: <FaAward /> },
        { id: 'criteria', label: '10 NBA Criteria', icon: <FaFileAlt /> },
        { id: 'programs', label: 'Eligible Programs', icon: <FaUniversity /> },
        { id: 'obe', label: 'OBE Methodology', icon: <FaCompass /> },
        { id: 'documents', label: 'SAR & Documents', icon: <FaCertificate /> }
    ];

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="NBA Accreditation | EASA College of Engineering and Technology"
                description="National Board of Accreditation (NBA) Outcome-Based Education (OBE) framework, 10 criteria evaluation, and program accreditations at EASA College."
                keywords="NBA Accreditation, EASA College NBA, Outcome Based Education, OBE Framework, Tier II SAR, Program Outcomes, Graduate Attributes"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="nba"
                defaultTitle="National Board of Accreditation (NBA)"
                defaultSubtitle="Benchmarking Technical Excellence through Outcome-Based Education & Global Graduate Attributes"
                defaultImage={nbaData.heroImage}
            />

            {/* MAIN CONTENT CONTAINER */}
            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2.5rem' }} className="nba-grid">

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
                                    Accreditation Cell
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                    NBA Navigation
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
                                        className="nba-tab-btn"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                            <span style={{ fontSize: '1.15rem' }}>{tab.icon}</span>
                                            <span>{tab.label}</span>
                                        </div>
                                        <FaChevronRight size={12} style={{ opacity: isActive ? 1 : 0.4 }} />
                                    </button>
                                );
                            })}

                            {/* OBE QUICK LINK BANNER */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.5rem',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                color: '#ffffff',
                                textAlign: 'center',
                                boxShadow: '0 10px 25px rgba(37,99,235,0.3)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}><FaGraduationCap /></div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '0.4rem' }}>Outcome-Based Education</h4>
                                <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: '1.4', marginBottom: '1.2rem' }}>
                                    Explore Course Outcomes, Program Outcomes (POs), and PSOs for all departments.
                                </p>
                                <Link
                                    to="/obe"
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '50px',
                                        background: '#F59E0B',
                                        color: '#000000',
                                        fontWeight: '900',
                                        fontSize: '0.88rem',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 12px rgba(245,158,11,0.4)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    View PO & PSO Details
                                </Link>
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
                                                Accreditation Framework
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                National Board of Accreditation (NBA)
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {nbaData.overviewParagraphs.map((para, idx) => (
                                                <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                                    {para}
                                                </p>
                                            ))}
                                        </div>

                                        {/* KEY HIGHLIGHT METRICS */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '0.5rem' }}>
                                            {nbaData.highlights.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '20px',
                                                        border: cardBorder,
                                                        padding: '1.8rem 1.4rem',
                                                        textAlign: 'center',
                                                        boxShadow: cardShadow
                                                    }}
                                                >
                                                    <div style={{ fontSize: '2.2rem', color: accentColor, marginBottom: '0.8rem', display: 'flex', justifyContent: 'center' }}>
                                                        {item.icon}
                                                    </div>
                                                    <div style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.2rem' }}>
                                                        {item.value}
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: secondaryTextColor, fontWeight: '700' }}>
                                                        {item.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* VISION & MISSION DUAL CARDS */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
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
                                                    <FaAward />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#38BDF8' : '#1E40AF', marginBottom: '1rem' }}>
                                                    NBA Quality Vision
                                                </h3>
                                                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
                                                    {nbaData.vision}
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
                                                    <FaCertificate />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#FBBF24' : '#B45309', marginBottom: '1rem' }}>
                                                    Quality Mission
                                                </h3>
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                                    {nbaData.mission.map((item, idx) => (
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

                                {/* 2. 10 NBA CRITERIA */}
                                {activeTab === 'criteria' && (
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
                                                Evaluation Parameters (1000 Marks Total)
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                10 NBA Quality Criteria Matrix
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                The National Board of Accreditation evaluates Tier-II engineering institutions across 10 core criteria covering teaching-learning, research, and governance.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                            {nbaData.criteria.map((c, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2rem',
                                                        boxShadow: cardShadow,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                            <span style={{
                                                                fontSize: '2rem',
                                                                fontWeight: '900',
                                                                color: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(37, 99, 235, 0.25)',
                                                                fontFamily: 'Outfit, sans-serif'
                                                            }}>
                                                                Criterion {c.num}
                                                            </span>
                                                            <span style={{
                                                                padding: '0.35rem 0.8rem',
                                                                borderRadius: '50px',
                                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                                color: accentColor,
                                                                fontSize: '0.78rem',
                                                                fontWeight: '800'
                                                            }}>
                                                                {c.marks}
                                                            </span>
                                                        </div>

                                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>
                                                            {c.title}
                                                        </h3>

                                                        <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                                            {c.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. ELIGIBLE / ACCREDITED PROGRAMS */}
                                {activeTab === 'programs' && (
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
                                                Academic Offerings
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                NBA Aligned Engineering Programs
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Undergraduate engineering disciplines following the Washington Accord Outcome-Based Education curriculum.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                            {nbaData.programs.map((prog, idx) => (
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
                                                                {prog.icon}
                                                            </div>
                                                            <span style={{
                                                                padding: '0.35rem 0.8rem',
                                                                borderRadius: '50px',
                                                                background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                                                                color: '#10B981',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '800'
                                                            }}>
                                                                {prog.status}
                                                            </span>
                                                        </div>

                                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem', lineHeight: '1.3' }}>
                                                            {prog.name}
                                                        </h3>
                                                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: accentColor, marginBottom: '1rem' }}>
                                                            Annual Approved Intake: {prog.intake} Seats
                                                        </div>

                                                        <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                            <strong style={{ color: primaryTextColor }}>Curriculum Focus: </strong>{prog.focus}
                                                        </p>
                                                    </div>

                                                    <div style={{ paddingTop: '1rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)' }}>
                                                        <Link
                                                            to="/obe"
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                color: accentColor,
                                                                fontWeight: '800',
                                                                fontSize: '0.9rem',
                                                                textDecoration: 'none'
                                                            }}
                                                        >
                                                            <span>View Course & Program Outcomes</span>
                                                            <FaChevronRight size={11} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 4. OBE METHODOLOGY */}
                                {activeTab === 'obe' && (
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
                                                Continuous Quality Improvement
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Outcome-Based Education (OBE) Process Flow
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                How Course Outcomes (COs) feed directly into Program Outcomes (POs) and Program Educational Objectives (PEOs).
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {nbaData.obeProcessSteps.map((st, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2.2rem 2rem',
                                                        boxShadow: cardShadow,
                                                        display: 'grid',
                                                        gridTemplateColumns: '200px 1fr',
                                                        gap: '2rem',
                                                        alignItems: 'center'
                                                    }}
                                                    className="obe-flow-grid"
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
                                                            Step {st.step}
                                                        </span>
                                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                                            {st.title}
                                                        </h4>
                                                    </div>

                                                    <p style={{ fontSize: '1rem', color: secondaryTextColor, lineHeight: '1.65', margin: 0 }}>
                                                        {st.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 5. SAR & DOCUMENTS */}
                                {activeTab === 'documents' && (
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
                                                Public Disclosure & Reports
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                NBA Self-Assessment Reports & Documents
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {nbaData.documents.map((doc, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '20px',
                                                        border: cardBorder,
                                                        padding: '1.8rem 2rem',
                                                        boxShadow: cardShadow,
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        gap: '1.5rem'
                                                    }}
                                                    className="nba-doc-row"
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                                        <div style={{
                                                            width: '48px',
                                                            height: '48px',
                                                            borderRadius: '14px',
                                                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                            color: accentColor,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '1.4rem',
                                                            flexShrink: 0
                                                        }}>
                                                            <FaFileAlt />
                                                        </div>
                                                        <div>
                                                            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                                {doc.title}
                                                            </h3>
                                                            <span style={{ fontSize: '0.82rem', color: secondaryTextColor, fontWeight: '700' }}>
                                                                {doc.category} • Academic Year {doc.year}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        to={doc.link}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.6rem',
                                                            padding: '0.65rem 1.4rem',
                                                            borderRadius: '50px',
                                                            background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                            color: '#ffffff',
                                                            textDecoration: 'none',
                                                            fontSize: '0.88rem',
                                                            fontWeight: '800',
                                                            boxShadow: '0 6px 16px rgba(37,99,235,0.25)',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        <span>View Details</span>
                                                        <FaExternalLinkAlt size={12} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .nba-tab-btn:hover {
                    background: ${isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.06)'} !important;
                    color: ${accentColor} !important;
                }
                @media (max-width: 968px) {
                    .nba-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .obe-flow-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                    .nba-doc-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default NbaPage;
