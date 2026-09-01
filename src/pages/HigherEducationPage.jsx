import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap, FaGlobeAmericas, FaBookReader, FaAward,
    FaUniversity, FaPassport, FaChartLine, FaUserTie,
    FaCheckCircle, FaStar, FaGlobe, FaRocket, FaFileAlt,
    FaChevronRight, FaCertificate, FaLaptopCode, FaLightbulb,
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaHandshake,
    FaDownload, FaQuoteLeft, FaSearch, FaArrowRight, FaClock,
    FaFlagUsa, FaBuilding, FaMicroscope, FaCompass
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const higherEducationData = {
    name: "Center for Higher Education & Global Studies",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    vision: "To empower and mentor aspiring engineering students to pursue postgraduate degrees (M.E, M.Tech, MS, MBA, Ph.D.) and research programs in top-tier national institutions and prestigious global universities.",
    mission: [
        "To provide structured coaching, preparatory workshops, and test series for competitive exams like GATE, GRE, IELTS, TOEFL, CAT, and GMAT.",
        "To guide students through the university selection, application filing, Statement of Purpose (SOP), and Letter of Recommendation (LOR) processes.",
        "To connect students with international scholarships, fellowships (Erasmus Mundus, DAAD, Fullbright, Commonwealth), and financial aid opportunities.",
        "To build academic collaborations and exchange pathways with premier universities across the USA, UK, Germany, Canada, Australia, and Singapore."
    ],
    overviewParagraphs: [
        "The Center for Higher Education & Global Studies (ASCEND) at EASA College of Engineering and Technology is committed to shaping the academic future of students aiming for excellence in advanced studies, specialized master's programs, and doctoral research.",
        "Recognizing that higher education is a transformative journey, the Cell offers end-to-end guidance starting right from the second year of engineering. We help students identify their academic passions, build strong research profiles, prepare for standardized entrance examinations, and secure admissions with scholarships in premier Indian institutes (IITs, NITs, IIMs, IISc, Anna University) and world-renowned international universities.",
        "With dedicated faculty advisors, experienced exam trainers, language specialists, and an active network of alumni studying in top global institutions, EASA provides every student with the tools, resources, and mentorship needed to fulfill their higher education dreams."
    ],
    stats: [
        { label: "Alumni in Higher Studies", value: "350+", icon: <FaGraduationCap /> },
        { label: "Global Partner Universities", value: "45+", icon: <FaUniversity /> },
        { label: "Competitive Exams Covered", value: "12+", icon: <FaBookReader /> },
        { label: "Scholarships Secured", value: "₹1.5 Cr+", icon: <FaAward /> },
        { label: "Success & Visa Rate", value: "98%", icon: <FaPassport /> }
    ],
    examTracks: [
        {
            title: "GATE (Graduate Aptitude Test in Engineering)",
            category: "National Engineering / PSU Admissions",
            desc: "Comprehensive preparation for M.Tech/Ph.D. admissions in IITs, NITs, IISc, and premier government engineering colleges, as well as direct recruitment in Maharatna & Navratna PSUs (ONGC, IOCL, BHEL, NTPC).",
            eligibility: "Final & Pre-Final Year Engineering Students",
            subjects: "Domain Engineering, Engineering Mathematics & General Aptitude",
            frequency: "Annual (February)",
            icon: <FaBuilding />
        },
        {
            title: "GRE (Graduate Record Examinations)",
            category: "International MS & Ph.D. Admissions",
            desc: "Targeted coaching for students aiming for Master of Science (MS) and doctoral research in leading universities across the USA, Germany, Canada, Singapore, and Europe.",
            eligibility: "Any Engineering Graduate / Pre-Final Year Student",
            subjects: "Verbal Reasoning, Quantitative Reasoning & Analytical Writing",
            frequency: "Year-Round (Computer-Delivered)",
            icon: <FaGlobeAmericas />
        },
        {
            title: "IELTS & TOEFL (English Language Proficiency)",
            category: "Study Abroad Language Testing",
            desc: "Intensive training in Listening, Reading, Writing, and Speaking to meet the language requirements for university admissions and student visas in the UK, USA, Canada, Australia, and New Zealand.",
            eligibility: "Students applying for foreign universities",
            subjects: "Reading, Writing, Listening & Speaking (Band 7.5+ Target)",
            frequency: "Multiple dates each month",
            icon: <FaCertificate />
        },
        {
            title: "CAT & TANCET (Management & Post-Graduation)",
            category: "MBA / MCA Admissions in India",
            desc: "Strategic coaching for top business schools (IIMs, XLRI, FMS) and Tamil Nadu state government engineering colleges for MBA & M.E. programs.",
            eligibility: "Pre-Final & Final Year Students of all branches",
            subjects: "Quantitative Aptitude, Data Interpretation, Logical Reasoning & Verbal Ability",
            frequency: "CAT (November) / TANCET (March)",
            icon: <FaLaptopCode />
        },
        {
            title: "GMAT (Graduate Management Admission Test)",
            category: "Global Business Schools & Masters in Management",
            desc: "Specialized training for students seeking global MBA and specialized MIM (Masters in International Management) programs abroad.",
            eligibility: "Graduating Students & Working Alumni",
            subjects: "Quantitative, Verbal, and Data Insights",
            frequency: "Year-Round",
            icon: <FaChartLine />
        },
        {
            title: "Foreign Language Training (German & Japanese)",
            category: "Specialized Global Mobility",
            desc: "Language proficiency classes (German A1/A2/B1 and JLPT N5/N4) for tuition-free master's education in Germany and direct engineering career pathways in Japan.",
            eligibility: "All interested engineering students from 2nd year",
            subjects: "Grammar, Vocabulary, Pronunciation & Cultural Context",
            frequency: "Semester-wise modules",
            icon: <FaGlobe />
        }
    ],
    destinations: [
        {
            country: "United States of America (USA)",
            flag: "🇺🇸",
            universities: ["Purdue University", "University of Texas at Dallas", "Northeastern University", "Arizona State University", "University of Southern California"],
            highlight: "Highest research funding, STEM OPT 3-year post-study work authorization, and top technology hubs."
        },
        {
            country: "Germany",
            flag: "🇩🇪",
            universities: ["Technical University of Munich (TUM)", "RWTH Aachen University", "University of Stuttgart", "TU Berlin", "Karlsruhe Institute of Technology"],
            highlight: "World-class engineering, tuition-free public universities, strong automotive & robotics industries."
        },
        {
            country: "United Kingdom (UK)",
            flag: "🇬🇧",
            universities: ["University of Manchester", "University of Sheffield", "University of Leeds", "University of Birmingham", "Cranfield University"],
            highlight: "1-year intensive Master's programs, 2-year Graduate Route post-study work visa, prestigious global reputation."
        },
        {
            country: "Canada",
            flag: "🇨🇦",
            universities: ["University of Windsor", "Concordia University", "University of Ottawa", "Carleton University", "Memorial University"],
            highlight: "High standard of living, 3-year Post-Graduation Work Permit (PGWP), smooth PR immigration pathways."
        },
        {
            country: "Australia & Singapore",
            flag: "🇦🇺 🇸🇬",
            universities: ["National University of Singapore (NUS)", "Nanyang Technological University (NTU)", "University of Melbourne", "UNSW Sydney", "Monash University"],
            highlight: "Asia-Pacific tech capitals, cutting-edge AI and electronics research, vibrant international student communities."
        },
        {
            country: "India (National Premier Institutes)",
            flag: "🇮🇳",
            universities: ["IIT Madras", "IIT Bombay", "IISc Bangalore", "NIT Trichy", "Anna University CEG", "IIM Bangalore"],
            highlight: "M.Tech / MS by Research / Ph.D. with MHRD monthly stipends (₹12,400 to ₹35,000/month) and stellar placement records."
        }
    ],
    roadmapSteps: [
        {
            year: "2nd Year (Semester 3 & 4)",
            title: "Discovery & Foundation",
            points: [
                "Orientation on national vs. global postgraduate pathways.",
                "Diagnostic assessment for GATE / GRE / CAT aptitude.",
                "Foundation classes for Quantitative Aptitude, Mathematics & English Communication.",
                "Initiating mini-research projects and publishing first technical papers."
            ]
        },
        {
            year: "3rd Year (Semester 5 & 6)",
            title: "Rigorous Test Preparation & Profile Building",
            points: [
                "Full-fledged classroom coaching and online mock tests for GATE, GRE, IELTS, TOEFL.",
                "Participation in national hackathons, IEEE conferences, and patent filing.",
                "Shortlisting universities, identifying faculty research mentors, and exploring scholarships.",
                "Foreign language certification (German A1/A2 or Japanese JLPT N5)."
            ]
        },
        {
            year: "Final Year - Fall (Semester 7)",
            title: "Application & Documentation Filing",
            points: [
                "Drafting Statement of Purpose (SOP), Research Statements, and CV under faculty mentorship.",
                "Securing official Letters of Recommendation (LORs) and Transcripts.",
                "Submitting university applications for Fall / Spring intakes.",
                "Applying for international scholarships (DAAD, Erasmus, Commonwealth, Fullbright)."
            ]
        },
        {
            year: "Final Year - Spring (Semester 8)",
            title: "Admissions, Visa & Pre-Departure",
            points: [
                "Evaluating admit offers, financial assistance, and teaching/research assistantships (TA/RA).",
                "Financial documentation and educational loan assistance with nationalized banks.",
                "Mock visa interview sessions and visa documentation approval.",
                "Pre-departure briefing, student accommodation guidance, and connecting with EASA Global Alumni."
            ]
        }
    ],
    services: [
        {
            title: "Profile Building & Research Guidance",
            desc: "Guiding students to author research papers in Scopus/UGC CARE journals, present at international conferences, and patent innovative ideas to stand out in top university applications.",
            icon: <FaMicroscope />
        },
        {
            title: "SOP & LOR Mentorship Cell",
            desc: "One-on-one review and refinement of Statements of Purpose, Personal Essays, and faculty recommendation letters to meet international admission standards.",
            icon: <FaFileAlt />
        },
        {
            title: "Scholarship & Financial Aid Bureau",
            desc: "Active assistance in identifying and applying for fully-funded international scholarships, government subsidies, and low-interest education loans with leading partner banks.",
            icon: <FaAward />
        },
        {
            title: "End-to-End Visa & Immigration Support",
            desc: "Expert visa counseling, financial statement verification, biometric scheduling, mock visa interviews, and pre-departure briefings for hassle-free travel.",
            icon: <FaPassport />
        }
    ],
    mentors: [
        {
            name: "Dr. P. Sivakumar",
            role: "Convener - Higher Education Cell",
            dept: "Research & Development",
            focus: "Ph.D. Pathways & International Research Fellowships"
        },
        {
            name: "Prof. S. Santhiya",
            role: "Coordinator - Competitive Examinations",
            dept: "Computer Science & Engineering",
            focus: "GATE Coaching & Public Sector Recruitment"
        },
        {
            name: "Prof. Hari Balaji",
            role: "Advisor - Study Abroad Programs",
            dept: "Mechanical Engineering",
            focus: "MS in Germany & Europe (TU9 Universities)"
        },
        {
            name: "Prof. S. Subha",
            role: "Coordinator - Language & IELTS Center",
            dept: "Biomedical & Science & Humanities",
            focus: "IELTS / TOEFL Training & Verbal Proficiency"
        }
    ],
    faqs: [
        {
            q: "When should I start preparing for GATE or GRE?",
            a: "The ideal time to start preparation is during the 3rd or 4th semester (2nd Year). This gives you adequate time to build core conceptual clarity, take practice test series, and appear for the exam in your 3rd year with a buffer to improve your score in final year."
        },
        {
            q: "Does EASA offer on-campus coaching for competitive exams?",
            a: "Yes! EASA's Center for Higher Education conducts evening and weekend coaching batches for GATE, GRE, IELTS, and TANCET, complete with study materials, practice problem sets, and computer-based mock tests."
        },
        {
            q: "Can I study in Germany with zero tuition fees?",
            a: "Yes. Most public universities in Germany charge zero tuition fees for both domestic and international students. Our cell provides specialized guidance on APS certification, German language training (A1/A2/B1), blocked account setup, and university selection."
        },
        {
            q: "How does the Cell help with Letters of Recommendation (LORs) and Transcripts?",
            a: "The Cell coordinates directly with department Heads and faculty members to issue official signed LORs on institutional letterheads. The Controller of Examinations (COE) office facilitates expedited WES-evaluated transcripts for foreign university portals."
        },
        {
            q: "What scholarships are available for EASA students pursuing master's abroad?",
            a: "Students can apply for world-renowned scholarships such as DAAD (Germany), Erasmus Mundus (Europe), Fullbright-Nehru (USA), Commonwealth Scholarship (UK), Inlaks, and various university-specific merit fellowships and Graduate Assistantships (TA/RA)."
        }
    ]
};

const HigherEducationPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [selectedExamCategory, setSelectedExamCategory] = useState('All');
    const [openFaq, setOpenFaq] = useState(null);
    const [enquiryModal, setEnquiryModal] = useState(false);
    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        year: '3rd Year',
        targetTrack: 'GATE / PSU Preparation',
        targetCountry: 'India'
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'overview', label: 'Overview & Vision', icon: <FaUniversity /> },
        { id: 'statistics', label: 'Key Highlights', icon: <FaChartLine /> },
        { id: 'exams', label: 'Competitive Exams', icon: <FaBookReader /> },
        { id: 'destinations', label: 'Global Destinations', icon: <FaGlobeAmericas /> },
        { id: 'services', label: 'Cell Services', icon: <FaHandshake /> },
        { id: 'roadmap', label: '4-Year Roadmap', icon: <FaCompass /> },
        { id: 'mentors', label: 'Advisory Mentors', icon: <FaUserTie /> },
        { id: 'faqs', label: 'FAQs & Guidance', icon: <FaLightbulb /> }
    ];

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const handleEnquirySubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setEnquiryModal(false);
            setFormSubmitted(false);
            setEnquiryForm({
                name: '',
                email: '',
                phone: '',
                department: '',
                year: '3rd Year',
                targetTrack: 'GATE / PSU Preparation',
                targetCountry: 'India'
            });
            alert('Thank you! Your Higher Education Guidance Enquiry has been submitted. Our cell counselor will contact you shortly.');
        }, 1500);
    };

    return (
        <div className="higher-education-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
            <SEO
                title="Higher Education & Global Studies Cell | EASA College"
                description="Center for Higher Education at EASA College - Comprehensive coaching for GATE, GRE, IELTS, TOEFL, CAT, GMAT, study abroad admissions, and global university scholarships."
                keywords="Higher Education, GATE Coaching, GRE Preparation, IELTS TOEFL, Study Abroad, MS in USA Germany, MBA CAT, EASA College higher studies"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="higher-education"
                defaultTitle="Center for Higher Education & Global Studies"
                defaultSubtitle="Guiding and empowering EASA engineers to pursue postgraduate degrees (M.E, M.Tech, MS, MBA, Ph.D.) and research in premier Indian and top-ranked global universities."
                defaultImage={higherEducationData.heroImage}
            />

            {/* MAIN CONTENT WRAPPER WITH MODERN TABBED LAYOUT */}
            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem' }} className="higher-edu-grid">
                    
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
                                    ASCEND Ecosystem
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                    Higher Education Hub
                                </h3>
                            </div>

                            {sections.map((sec) => {
                                const isActive = activeSection === sec.id;
                                return (
                                    <button
                                        key={sec.id}
                                        onClick={() => {
                                            setActiveSection(sec.id);
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
                                        className="sidebar-tab-btn"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                            <span style={{ fontSize: '1.15rem' }}>{sec.icon}</span>
                                            <span>{sec.label}</span>
                                        </div>
                                        <FaChevronRight size={12} style={{ opacity: isActive ? 1 : 0.4 }} />
                                    </button>
                                );
                            })}

                            {/* COUNSELING QUICK CTA CARD */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.5rem',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                color: '#ffffff',
                                textAlign: 'center',
                                boxShadow: '0 10px 25px rgba(37,99,235,0.3)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}><FaCompass /></div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '0.4rem' }}>Need Higher Studies Guidance?</h4>
                                <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: '1.4', marginBottom: '1.2rem' }}>
                                    Connect with our certified mentors for free profile evaluation & scholarship tips.
                                </p>
                                <button
                                    onClick={() => setEnquiryModal(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
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
                                    Book Free Counseling
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT MAIN DYNAMIC CONTENT */}
                    <main style={{ minHeight: '600px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* 1. OVERVIEW & VISION */}
                                {activeSection === 'overview' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Center for Higher Education
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Empowering Future Scholars & Global Leaders
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {higherEducationData.overviewParagraphs.map((para, idx) => (
                                                <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                                    {para}
                                                </p>
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
                                                boxShadow: cardShadow,
                                                position: 'relative'
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
                                                    <FaGlobe />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#38BDF8' : '#1E40AF', marginBottom: '1rem' }}>
                                                    Our Vision
                                                </h3>
                                                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
                                                    {higherEducationData.vision}
                                                </p>
                                            </div>

                                            {/* MISSION */}
                                            <div style={{
                                                background: cardBg,
                                                borderRadius: '24px',
                                                border: cardBorder,
                                                padding: '2.5rem',
                                                boxShadow: cardShadow,
                                                position: 'relative'
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
                                                    <FaRocket />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#FBBF24' : '#B45309', marginBottom: '1rem' }}>
                                                    Our Mission
                                                </h3>
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                                    {higherEducationData.mission.map((item, idx) => (
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

                                {/* 2. KEY STATISTICS */}
                                {activeSection === 'statistics' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Performance & Milestones
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Key Highlights & Achievements
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Track record of our students excelling in national competitive examinations and international university admissions.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                            {higherEducationData.stats.map((stat, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '20px',
                                                        border: cardBorder,
                                                        padding: '2.2rem 1.5rem',
                                                        textAlign: 'center',
                                                        boxShadow: cardShadow
                                                    }}
                                                >
                                                    <div style={{ fontSize: '2.4rem', color: accentColor, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                                        {stat.icon}
                                                    </div>
                                                    <div style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.3rem' }}>
                                                        {stat.value}
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: secondaryTextColor, fontWeight: '700' }}>
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* ACHIEVEMENTS BANNER */}
                                        <div style={{
                                            background: isDark ? 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(124,58,237,0.2) 100%)' : 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
                                            borderRadius: '24px',
                                            border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(191,219,254,1)',
                                            padding: '2.5rem',
                                            marginTop: '1rem'
                                        }}>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: primaryTextColor, marginBottom: '1rem' }}>
                                                Institutional Excellence in Postgraduate Success
                                            </h3>
                                            <p style={{ color: secondaryTextColor, lineHeight: '1.7', margin: 0, fontSize: '1rem' }}>
                                                Every year, EASA graduates secure top percentile ranks in GATE and TANCET examinations, gaining entry to premier institutes such as IIT Madras, NIT Trichy, PSG Tech, and Anna University College of Engineering Guindy. On the global stage, over 50+ students secure MS/Ph.D. admits each cycle with substantial tuition waivers and research assistantships.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* 3. COMPETITIVE EXAMS */}
                                {activeSection === 'exams' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Examination Pathways
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Targeted Competitive Exam Coaching
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Structured syllabus coverage, regular mock tests, and expert problem-solving sessions for high percentile performance.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                            {higherEducationData.examTracks.map((exam, idx) => (
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
                                                                {exam.icon}
                                                            </div>
                                                            <span style={{
                                                                padding: '0.3rem 0.8rem',
                                                                borderRadius: '50px',
                                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                                color: accentColor,
                                                                fontSize: '0.75rem',
                                                                fontWeight: '800',
                                                                textTransform: 'uppercase'
                                                            }}>
                                                                {exam.category}
                                                            </span>
                                                        </div>

                                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem', lineHeight: '1.3' }}>
                                                            {exam.title}
                                                        </h3>

                                                        <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                            {exam.desc}
                                                        </p>
                                                    </div>

                                                    <div style={{
                                                        paddingTop: '1.2rem',
                                                        borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)',
                                                        fontSize: '0.85rem',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: secondaryTextColor, fontWeight: '600' }}>Eligibility:</span>
                                                            <span style={{ color: primaryTextColor, fontWeight: '700' }}>{exam.eligibility}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: secondaryTextColor, fontWeight: '600' }}>Frequency:</span>
                                                            <span style={{ color: accentColor, fontWeight: '700' }}>{exam.frequency}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 4. GLOBAL DESTINATIONS */}
                                {activeSection === 'destinations' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Study Abroad Pathways
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Top Higher Education Destinations & Universities
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Where EASA alumni pursue advanced Master's and Ph.D. programs with scholarships worldwide.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
                                            {higherEducationData.destinations.map((dest, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2.2rem',
                                                        boxShadow: cardShadow
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                                                        <span style={{ fontSize: '2rem' }}>{dest.flag}</span>
                                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                                            {dest.country}
                                                        </h3>
                                                    </div>

                                                    <p style={{ fontSize: '0.92rem', color: isDark ? '#38BDF8' : '#1D4ED8', fontWeight: '700', lineHeight: '1.5', marginBottom: '1.2rem' }}>
                                                        {dest.highlight}
                                                    </p>

                                                    <div>
                                                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: secondaryTextColor, fontWeight: '800', marginBottom: '0.6rem' }}>
                                                            Key Universities:
                                                        </div>
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                            {dest.universities.map((uni, uIdx) => (
                                                                <li key={uIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: primaryTextColor, fontWeight: '600' }}>
                                                                    <FaCheckCircle size={13} style={{ color: '#10B981', flexShrink: 0 }} />
                                                                    <span>{uni}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 5. CELL SERVICES */}
                                {activeSection === 'services' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Support System
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Comprehensive Student Support Services
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                End-to-end guidance from research paper publication to visa approval and pre-departure briefings.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
                                            {higherEducationData.services.map((svc, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2.5rem 2rem',
                                                        boxShadow: cardShadow
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '56px',
                                                        height: '56px',
                                                        borderRadius: '16px',
                                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                        color: '#ffffff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '1.6rem',
                                                        marginBottom: '1.5rem',
                                                        boxShadow: '0 8px 20px rgba(37,99,235,0.3)'
                                                    }}>
                                                        {svc.icon}
                                                    </div>
                                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>
                                                        {svc.title}
                                                    </h3>
                                                    <p style={{ fontSize: '0.98rem', color: secondaryTextColor, lineHeight: '1.65', margin: 0 }}>
                                                        {svc.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 6. 4-YEAR ROADMAP */}
                                {activeSection === 'roadmap' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Step-by-Step Trajectory
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                4-Year Higher Education Roadmap
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                How EASA mentors students at each stage of their undergraduate journey to secure top postgraduate admissions.
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {higherEducationData.roadmapSteps.map((step, idx) => (
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
                                                    className="roadmap-card-grid"
                                                >
                                                    <div style={{ borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)', paddingRight: '1rem' }}>
                                                        <span style={{
                                                            padding: '0.35rem 0.9rem',
                                                            borderRadius: '50px',
                                                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                                            color: '#000000',
                                                            fontWeight: '900',
                                                            fontSize: '0.78rem',
                                                            textTransform: 'uppercase',
                                                            display: 'inline-block',
                                                            marginBottom: '0.8rem'
                                                        }}>
                                                            Stage 0{idx + 1}
                                                        </span>
                                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                            {step.year}
                                                        </h4>
                                                        <div style={{ fontSize: '0.92rem', fontWeight: '700', color: accentColor }}>
                                                            {step.title}
                                                        </div>
                                                    </div>

                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                        {step.points.map((pt, pIdx) => (
                                                            <li key={pIdx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.5' }}>
                                                                <FaCheckCircle size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.2rem' }} />
                                                                <span>{pt}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 7. ADVISORY MENTORS */}
                                {activeSection === 'mentors' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Leadership & Guidance
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Higher Education Cell Advisory Mentors
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Dedicated faculty coordinators across engineering disciplines mentoring students for competitive exams and study abroad.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
                                            {higherEducationData.mentors.map((mentor, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '24px',
                                                        border: cardBorder,
                                                        padding: '2.5rem 1.8rem',
                                                        textAlign: 'center',
                                                        boxShadow: cardShadow
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '72px',
                                                        height: '72px',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                        color: '#ffffff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '2rem',
                                                        margin: '0 auto 1.2rem',
                                                        boxShadow: '0 8px 20px rgba(37,99,235,0.3)'
                                                    }}>
                                                        <FaUserTie />
                                                    </div>
                                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                        {mentor.name}
                                                    </h3>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: isDark ? '#FBBF24' : '#D97706', marginBottom: '0.4rem' }}>
                                                        {mentor.role}
                                                    </div>
                                                    <div style={{ fontSize: '0.82rem', color: secondaryTextColor, fontWeight: '700', marginBottom: '1rem' }}>
                                                        {mentor.dept}
                                                    </div>
                                                    <div style={{
                                                        padding: '0.6rem 0.8rem',
                                                        borderRadius: '12px',
                                                        background: isDark ? 'rgba(56, 189, 248, 0.1)' : '#F1F5F9',
                                                        fontSize: '0.82rem',
                                                        color: primaryTextColor,
                                                        fontWeight: '600'
                                                    }}>
                                                        {mentor.focus}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 8. FAQS */}
                                {activeSection === 'faqs' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Frequently Asked Questions
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Common Queries on Higher Studies
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {higherEducationData.faqs.map((faq, idx) => {
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

            {/* FREE COUNSELING ENQUIRY MODAL */}
            <AnimatePresence>
                {enquiryModal && (
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
                                maxWidth: '540px',
                                padding: '2.5rem',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setEnquiryModal(false)}
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
                                Higher Education Guidance Request
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, marginBottom: '1.5rem' }}>
                                Fill this form to book a 1-on-1 counseling session with our expert advisors.
                            </p>

                            <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Student Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={enquiryForm.name}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                        placeholder="e.g. Rahul Sharma"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={enquiryForm.email}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                            placeholder="you@email.com"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={enquiryForm.phone}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                            placeholder="+91 9876543210"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Department *</label>
                                        <select
                                            value={enquiryForm.department}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, department: e.target.value })}
                                            required
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="">Select Department</option>
                                            <option value="CSE">Computer Science & Engineering</option>
                                            <option value="AI&DS">AI & Data Science</option>
                                            <option value="MECH">Mechanical Engineering</option>
                                            <option value="ECE">Electronics & Communication</option>
                                            <option value="EEE">Electrical & Electronics</option>
                                            <option value="BME">Biomedical Engineering</option>
                                            <option value="Agri">Agriculture Engineering</option>
                                            <option value="IT">Information Technology</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Current Year *</label>
                                        <select
                                            value={enquiryForm.year}
                                            onChange={(e) => setEnquiryForm({ ...enquiryForm, year: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="1st Year">1st Year</option>
                                            <option value="2nd Year">2nd Year</option>
                                            <option value="3rd Year">3rd Year</option>
                                            <option value="4th Year">4th Year (Final)</option>
                                            <option value="Alumni">Alumni / Graduate</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Target Program / Exam *</label>
                                    <select
                                        value={enquiryForm.targetTrack}
                                        onChange={(e) => setEnquiryForm({ ...enquiryForm, targetTrack: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    >
                                        <option value="GATE / PSU Preparation">GATE & PSU Recruitment</option>
                                        <option value="MS in USA / Canada / Germany">MS in USA / Canada / Germany (GRE/IELTS)</option>
                                        <option value="MBA / Management (CAT/TANCET/GMAT)">MBA / Management (CAT/TANCET/GMAT)</option>
                                        <option value="IELTS / TOEFL English Proficiency">IELTS / TOEFL English Proficiency</option>
                                        <option value="Foreign Language (German/Japanese)">Foreign Language (German / Japanese)</option>
                                        <option value="Ph.D. / Research Fellowship">Ph.D. / Research Fellowship</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formSubmitted}
                                    style={{
                                        marginTop: '1rem',
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
                                    {formSubmitted ? 'Submitting...' : 'Submit Guidance Request'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .sidebar-tab-btn:hover {
                    background: ${isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.06)'} !important;
                    color: ${accentColor} !important;
                }
                @media (max-width: 968px) {
                    .higher-edu-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .roadmap-card-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default HigherEducationPage;
