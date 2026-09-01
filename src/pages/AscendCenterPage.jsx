import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaRocket, FaGraduationCap, FaBriefcase, FaLaptopCode,
    FaChartLine, FaHandshake, FaAward, FaBuilding,
    FaCheckCircle, FaStar, FaGlobe, FaCertificate,
    FaFileAlt, FaCoins, FaUsers, FaArrowRight,
    FaCompass, FaLightbulb, FaShieldAlt, FaPhone,
    FaEnvelope, FaMapMarkerAlt, FaUserTie, FaChevronRight,
    FaCogs, FaCheckDouble, FaMicrochip, FaTools
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import { Link } from 'react-router-dom';

const ascendData = {
    title: "ASCEND - Career Advancement Centre",
    subtitle: "A unified, 4-pillar ecosystem empowering EASA engineers in Skilling, Higher Education, Entrepreneurship, and Corporate Placements.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    vision: "To establish an integrated, world-class career advancement hub that transforms every student into a globally competitive professional, innovative entrepreneur, or distinguished postgraduate scholar.",
    mission: [
        "To deliver industry-aligned technical skill training, practical bootcamps, and global certifications.",
        "To provide personalized coaching, scholarship guidance, and international university pathways for higher studies.",
        "To incubate student technology startups through the AICTE IDEA Lab, seed funding, and patent mentorship.",
        "To achieve 100% placement readiness and connect graduates with leading national and global corporate recruiters."
    ],
    overviewParagraphs: [
        "ASCEND (Career Advancement Centre) is EASA College of Engineering and Technology's signature umbrella initiative designed to prepare students for the rapidly evolving demands of the 21st-century global economy.",
        "Rather than a one-size-fits-all approach, ASCEND recognizes that each engineering student possesses unique aspirations. We provide structured, dedicated pathways across four foundational pillars: Technical Skilling, Higher Education & Global Studies, Startup Incubation, and Corporate Placements.",
        "Through state-of-the-art facilities like the AICTE IDEA Lab, language testing centers, industry-sponsored laboratories, and a network of 40+ corporate partners and global universities, ASCEND guides students from their second year of study to tangible career milestones."
    ],
    stats: [
        { label: "Overall Career Progression", value: "93%+", icon: <FaChartLine /> },
        { label: "Placement Offers (2025-26)", value: "350+", icon: <FaBriefcase /> },
        { label: "Highest CTC Package", value: "₹16 LPA", icon: <FaAward /> },
        { label: "Alumni in Higher Studies", value: "350+", icon: <FaGraduationCap /> },
        { label: "Student Startups Incubated", value: "28+", icon: <FaRocket /> },
        { label: "Industry & Academic MoUs", value: "45+", icon: <FaHandshake /> }
    ],
    pillars: [
        {
            id: "skilling",
            num: "01",
            title: "Center for Skilling & Development",
            tagline: "Industry-Ready Technical Competencies & Certifications",
            desc: "Bridging the academic-industry gap with 35+ specialized value-added courses covering Full-Stack Web Tech (MERN), AI/Data Science, IoT, CAD/CAM, Embedded Systems, Cloud Computing (AWS/Google), and Corporate Communication.",
            highlights: ["35+ Value-Added Courses", "AWS, Google, RedHat & Cisco Certifications", "100% Hands-On Practical Exposure"],
            icon: <FaLaptopCode />,
            link: "/page/skilling",
            color: "#2563EB",
            gradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)"
        },
        {
            id: "higher-education",
            num: "02",
            title: "Center for Higher Education & Global Studies",
            tagline: "GATE, GRE, IELTS, Master's & International Scholarships",
            desc: "End-to-end mentoring for postgraduate engineering (M.E/M.Tech, MS, MBA, Ph.D.) admissions in IITs, NITs, IIMs, and premier global universities across USA, Germany, UK, Canada, Australia, and Singapore with scholarship support.",
            highlights: ["GATE, GRE, IELTS, TOEFL & CAT Coaching", "Study Abroad & DAAD Scholarship Guidance", "SOP & LOR Faculty Mentorship Cell"],
            icon: <FaGraduationCap />,
            link: "/page/higher-education",
            color: "#7C3AED",
            gradient: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)"
        },
        {
            id: "entrepreneurship",
            num: "03",
            title: "Center for Innovation, Incubation & Entrepreneurship (EDC)",
            tagline: "Idea to Prototype, Seed Capital, Patents & Startups",
            desc: "Fostering student ventures through AICTE IDEA Lab prototyping machinery, institutional seed capital (up to ₹2.5L), MSME and Tamil Nadu EDII grant facilitation, patent drafting, and student EIR academic credits.",
            highlights: ["24/7 Rapid Prototyping IDEA Lab", "₹85L+ Mobilized in Seed Grants", "100% Subsidized Patent Filing Desk"],
            icon: <FaRocket />,
            link: "/page/entrepreneurship",
            color: "#D97706",
            gradient: "linear-gradient(135deg, #B45309 0%, #F59E0B 100%)"
        },
        {
            id: "placement",
            num: "04",
            title: "Corporate Training & Placement Cell",
            tagline: "Top Tier MNC Recruitment, Internships & Career Launches",
            desc: "Connecting graduating engineers with over 150+ national and global corporate recruiters (TCS, Zoho, Cognizant, Accenture, L&T, DBS Bank, Infosys) through structured aptitude drills, mock interviews, and campus recruitment drives.",
            highlights: ["350+ Placement Offers Recorded", "₹16 LPA Highest Package", "150+ Top Tier Hiring Partners"],
            icon: <FaBriefcase />,
            link: "/page/placement",
            color: "#059669",
            gradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)"
        }
    ],
    roadmap: [
        {
            year: "1st Year (Semester 1 & 2)",
            title: "Foundation & Aptitude Discovery",
            desc: "Diagnostic aptitude screening, foundational mathematics, communication skills workshops, and exposure to technological trends."
        },
        {
            year: "2nd Year (Semester 3 & 4)",
            title: "Core Skilling & Track Selection",
            desc: "Hands-on coding, mini-projects in IDEA Lab, industry certifications (AWS, Cisco, RedHat), and choosing an ASCEND career track."
        },
        {
            year: "3rd Year (Semester 5 & 6)",
            title: "Advanced Specialization & Test Prep",
            desc: "Rigorous GATE/GRE/CAT prep, pre-placement mock interviews, internship internships, patent drafting, and hackathons."
        },
        {
            year: "4th Year (Semester 7 & 8)",
            title: "Placement Drives & Global Transitions",
            desc: "On-campus placement drives, international university admit confirmations, seed funding disbursals, and full-time hiring."
        }
    ],
    faqs: [
        {
            q: "What is the primary role of the ASCEND Career Advancement Centre?",
            a: "ASCEND brings together all career development services at EASA—technical skilling, competitive exam coaching for higher studies, startup incubation, and campus placements—into a single, coordinated student support ecosystem."
        },
        {
            q: "Can a student participate in multiple ASCEND tracks simultaneously?",
            a: "Yes! For example, a student can enroll in technical skill certifications (Full Stack / AI) during 2nd and 3rd year, while simultaneously preparing for GATE/GRE or developing a prototype in the incubation center."
        },
        {
            q: "How does ASCEND help students prepare for top-tier IT and core company interviews?",
            a: "We conduct weekly aptitude test series, technical domain bootcamps, coding practice on industry platforms, soft skills & GD workshops, and 1-on-1 mock interviews with corporate HR leaders."
        },
        {
            q: "What resources are available for students aiming for Master's degrees abroad?",
            a: "The Higher Education cell provides classroom coaching for GRE, IELTS, and TOEFL, guidance on tuition-free master's programs in Germany, SOP/LOR drafting clinics, and assistance with DAAD, Erasmus, and university scholarships."
        }
    ]
};

const AscendCenterPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [counselingModal, setCounselingModal] = useState(false);
    const [counselingForm, setCounselingForm] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        year: '2nd Year',
        primaryInterest: 'Corporate Placements'
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const handleCounselingSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setCounselingModal(false);
            setFormSubmitted(false);
            setCounselingForm({
                name: '',
                email: '',
                phone: '',
                department: '',
                year: '2nd Year',
                primaryInterest: 'Corporate Placements'
            });
            alert('✨ Thank you! Your ASCEND Career Counseling Request has been received. Our career advisor will contact you shortly.');
        }, 1500);
    };

    return (
        <div className="ascend-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="ASCEND - Career Advancement Centre | EASA College"
                description="ASCEND Career Advancement Centre at EASA College - Comprehensive 4-pillar ecosystem: Technical Skilling, Higher Education & Global Studies, Startup Incubation, and Placements."
                keywords="ASCEND EASA, Career Advancement Centre, Skilling, Placements, Higher Education, Entrepreneurship, AICTE IDEA Lab, Coimbatore Engineering"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="ascend-center"
                defaultTitle={ascendData.title}
                defaultSubtitle={ascendData.subtitle}
                defaultImage={ascendData.heroImage}
            />

            {/* MAIN CONTAINER */}
            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>

                {/* 1. OVERVIEW & MISSION SECTION */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
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
                            Unified Career Ecosystem
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Bridging Education with Global Career Success
                        </h2>
                        <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #2563EB, #F59E0B)', margin: '1rem auto 0', borderRadius: '2px' }} />
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                            {ascendData.overviewParagraphs.map((para, idx) => (
                                <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                    {para}
                                </p>
                            ))}
                            <div>
                                <button
                                    onClick={() => setCounselingModal(true)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        padding: '1rem 2.2rem',
                                        borderRadius: '50px',
                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                        color: '#ffffff',
                                        fontWeight: '800',
                                        fontSize: '0.98rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span>Book Career Counseling</span>
                                    <FaArrowRight size={13} />
                                </button>
                            </div>
                        </div>

                        {/* VISION & MISSION CARD */}
                        <div style={{
                            background: cardBg,
                            borderRadius: '28px',
                            border: cardBorder,
                            padding: '2.5rem',
                            boxShadow: cardShadow
                        }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: isDark ? '#38BDF8' : '#1E40AF', marginBottom: '0.8rem' }}>
                                ASCEND Vision & Core Objectives
                            </h3>
                            <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', marginBottom: '1.5rem' }}>
                                {ascendData.vision}
                            </p>

                            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: secondaryTextColor, fontWeight: '800', marginBottom: '0.8rem' }}>
                                Mission Goals:
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {ascendData.mission.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.5' }}>
                                        <FaCheckCircle size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.2rem' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 2. THE 4 FOUNDATIONAL ASCEND PILLARS */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
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
                            Core Ecosystem
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            The 4 Pillars of Career Advancement
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '700px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
                            Explore our specialized centers dedicated to skill training, global higher studies, startup entrepreneurship, and corporate recruitment.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {ascendData.pillars.map((pillar) => (
                            <motion.div
                                key={pillar.id}
                                whileHover={{ y: -8 }}
                                style={{
                                    background: cardBg,
                                    borderRadius: '28px',
                                    border: cardBorder,
                                    padding: '2.8rem 2.2rem',
                                    boxShadow: cardShadow,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '20px',
                                            background: pillar.gradient,
                                            color: '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.8rem',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                                        }}>
                                            {pillar.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '2rem',
                                            fontWeight: '900',
                                            color: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(37, 99, 235, 0.2)',
                                            fontFamily: 'Outfit, sans-serif'
                                        }}>
                                            Pillar {pillar.num}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.3rem', lineHeight: '1.3' }}>
                                        {pillar.title}
                                    </h3>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? '#38BDF8' : '#1E40AF', marginBottom: '1.2rem' }}>
                                        {pillar.tagline}
                                    </div>

                                    <p style={{ fontSize: '0.98rem', color: secondaryTextColor, lineHeight: '1.65', marginBottom: '1.8rem' }}>
                                        {pillar.desc}
                                    </p>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            {pillar.highlights.map((h, hIdx) => (
                                                <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: primaryTextColor, fontWeight: '600' }}>
                                                    <FaCheckCircle size={13} style={{ color: '#10B981', flexShrink: 0 }} />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <Link
                                        to={pillar.link}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.7rem',
                                            width: '100%',
                                            padding: '0.9rem',
                                            borderRadius: '50px',
                                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                            color: isDark ? '#38BDF8' : '#2563EB',
                                            fontWeight: '800',
                                            fontSize: '0.92rem',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                        className="pillar-link-btn"
                                    >
                                        <span>Explore Pillar Portal</span>
                                        <FaArrowRight size={12} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. KEY METRICS & ACHIEVEMENTS */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
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
                            Proven Impact
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            ASCEND Performance Milestones
                        </h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.8rem' }}>
                        {ascendData.stats.map((st, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: cardBg,
                                    borderRadius: '24px',
                                    border: cardBorder,
                                    padding: '2.2rem 1.5rem',
                                    textAlign: 'center',
                                    boxShadow: cardShadow
                                }}
                            >
                                <div style={{ fontSize: '2.4rem', color: accentColor, marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    {st.icon}
                                </div>
                                <div style={{ fontSize: '2.2rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.3rem' }}>
                                    {st.value}
                                </div>
                                <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: secondaryTextColor, fontWeight: '700' }}>
                                    {st.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. 4-YEAR PROGRESSIVE LIFECYCLE */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
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
                            Student Journey
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            4-Year Progressive Career Lifecycle
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '650px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
                            How ASCEND progressively nurtures and elevates each student from first-year induction to final-year career placement.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
                        {ascendData.roadmap.map((step, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: cardBg,
                                    borderRadius: '24px',
                                    border: cardBorder,
                                    padding: '2.5rem 1.8rem',
                                    boxShadow: cardShadow,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <span style={{
                                        padding: '0.35rem 0.9rem',
                                        borderRadius: '50px',
                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                        color: '#ffffff',
                                        fontWeight: '900',
                                        fontSize: '0.78rem',
                                        textTransform: 'uppercase',
                                        display: 'inline-block',
                                        marginBottom: '1rem'
                                    }}>
                                        Year 0{idx + 1}
                                    </span>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem' }}>
                                        {step.year}
                                    </h4>
                                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: accentColor, marginBottom: '1rem' }}>
                                        {step.title}
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. FAQS ACCORDION */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
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
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            ASCEND Frequently Asked Questions
                        </h2>
                    </motion.div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {ascendData.faqs.map((faq, idx) => {
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
                </section>
            </div>

            {/* CAREER COUNSELING MODAL */}
            <AnimatePresence>
                {counselingModal && (
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
                                onClick={() => setCounselingModal(false)}
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
                                Book ASCEND Career Counseling
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, marginBottom: '1.5rem' }}>
                                Connect with our certified mentors across Skilling, Placements, Higher Studies, and Startups.
                            </p>

                            <form onSubmit={handleCounselingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Student Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={counselingForm.name}
                                        onChange={(e) => setCounselingForm({ ...counselingForm, name: e.target.value })}
                                        placeholder="e.g. John Doe"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={counselingForm.email}
                                            onChange={(e) => setCounselingForm({ ...counselingForm, email: e.target.value })}
                                            placeholder="you@email.com"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Phone *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={counselingForm.phone}
                                            onChange={(e) => setCounselingForm({ ...counselingForm, phone: e.target.value })}
                                            placeholder="+91 9876543210"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Department *</label>
                                        <select
                                            value={counselingForm.department}
                                            onChange={(e) => setCounselingForm({ ...counselingForm, department: e.target.value })}
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
                                            value={counselingForm.year}
                                            onChange={(e) => setCounselingForm({ ...counselingForm, year: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="1st Year">1st Year</option>
                                            <option value="2nd Year">2nd Year</option>
                                            <option value="3rd Year">3rd Year</option>
                                            <option value="4th Year">4th Year</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Primary Career Track *</label>
                                    <select
                                        value={counselingForm.primaryInterest}
                                        onChange={(e) => setCounselingForm({ ...counselingForm, primaryInterest: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    >
                                        <option value="Corporate Placements">Pillar 4: Corporate Training & Placements</option>
                                        <option value="Technical Skilling">Pillar 1: Technical Skilling & Global Certifications</option>
                                        <option value="Higher Education (GATE/GRE/IELTS)">Pillar 2: Higher Education & Study Abroad</option>
                                        <option value="Startup Incubation (EDC)">Pillar 3: Startup Incubation & Seed Grants</option>
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
                                    {formSubmitted ? 'Submitting...' : 'Confirm Counseling Request'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .pillar-link-btn:hover {
                    background: #2563EB !important;
                    color: #ffffff !important;
                }
            `}</style>
        </div>
    );
};

export default AscendCenterPage;
