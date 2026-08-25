import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import ManagementSection from '../components/ManagementSection';
import Tilt3DCard from '../components/Tilt3DCard';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUniversity,
    FaGraduationCap,
    FaAward,
    FaHistory,
    FaEye,
    FaBullseye,
    FaCheckCircle,
    FaArrowRight,
    FaLightbulb,
    FaHandsHelping,
    FaShieldAlt,
    FaMicrochip,
    FaLeaf,
    FaBuilding,
    FaChartLine,
    FaUsers,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaBook,
    FaLaptopCode,
    FaTrophy,
    FaMedal
} from 'react-icons/fa';
import aboutMain from '../assets/about-main.webp';

function InstitutionPage() {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [visionMission, setVisionMission] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/institution`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) setPageData(data);
            })
            .catch(err => console.error(err));

        fetch(`${API_BASE_URL}/api/mission-vision`)
            .then(res => res.json())
            .then(data => setVisionMission(data))
            .catch(err => console.error(err));
    }, []);

    const keyStats = [
        { label: "Established Legacy", value: "2008", unit: "EST.", icon: <FaCalendarAlt />, desc: "16+ Years of Technical Excellence" },
        { label: "Smart Green Campus", value: "25+", unit: "ACRES", icon: <FaLeaf />, desc: "Eco-friendly, modern learning ecosystem" },
        { label: "Expert Faculty", value: "150+", unit: "MENTORS", icon: <FaUsers />, desc: "Ph.D. holders & seasoned industry experts" },
        { label: "Placement Track Record", value: "96%", unit: "SUCCESS", icon: <FaChartLine />, desc: "Placements with top global MNCs" }
    ];

    const campusHighlights = [
        { icon: <FaLaptopCode />, title: "Smart Classrooms & Tech Labs", desc: "Equipped with high-speed optical network & IoT workstations" },
        { icon: <FaBook />, title: "Central Digital Library", desc: "Over 50,000+ volumes, IEEE, Scopus & ScienceDirect access" },
        { icon: <FaBuilding />, title: "Multipurpose Auditorium & Gym", desc: "Acoustically treated auditoriums & international athletic zones" },
        { icon: <FaGraduationCap />, title: "10 UG, 6 PG & MBA Programs", desc: "Outcome-based education designed for global employability" }
    ];

    const corePillars = [
        {
            title: "Academic Eminence",
            subtitle: "Outcome-Based Pedagogy",
            desc: "Autonomous curriculum aligned with Anna University and global engineering benchmarks, combining theory with high-impact project mastery.",
            icon: <FaGraduationCap />,
            color: "var(--secondary)"
        },
        {
            title: "Innovation & Research",
            subtitle: "Incubation & Patents",
            desc: "State-of-the-art AI, IoT, and Robotics R&D centers empowering students to build real-world solutions and publish high-tier research.",
            icon: <FaMicrochip />,
            color: "#38bdf8"
        },
        {
            title: "Holistic Student Life",
            subtitle: "Culture, Sports & Clubs",
            desc: "Active clubs, national technical symposiums, vibrant cultural festivals, and Olympic-grade athletic facilities shaping well-rounded leaders.",
            icon: <FaHandsHelping />,
            color: "#4ade80"
        },
        {
            title: "Ethical & Green Vision",
            subtitle: "Sustainable Future",
            desc: "Promoting social responsibility, renewable energy initiatives, UN-SDG goals alignment, and strong moral grounding across all disciplines.",
            icon: <FaShieldAlt />,
            color: "#c084fc"
        }
    ];

    const milestones = [
        { year: "2008", title: "Genesis & Inception", desc: "Established with a visionary goal to provide premier engineering education in Coimbatore." },
        { year: "2014", title: "Infrastructure & Accreditations", desc: "Expanded cutting-edge research labs, AICTE approvals, and multi-department growth." },
        { year: "2019", title: "Research & Incubation Hub", desc: "Inaugurated dedicated Center of Excellence in Emerging Technologies and patent cells." },
        { year: "2023", title: "Autonomous Status & NAAC", desc: "Awarded Autonomous status, ushering in agile industry-oriented curriculum design." },
        { year: "2026+", title: "Global Innovation Center", desc: "Forging international university collaborations, smart tech integration, and AI-led education." }
    ];

    const accreditations = [
        { label: "Autonomous Institution", note: "UGC / Anna University" },
        { label: "NAAC 'A' Grade Accredited", note: "Quality Benchmark" },
        { label: "Approved by AICTE", note: "New Delhi" },
        { label: "Affiliated to Anna University", note: "Chennai" },
        { label: "ISO 9001:2015", note: "Certified Management" }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative', overflowX: 'hidden' }}>
            <SEO
                title="About Institution | EASA College of Engineering and Technology"
                description="Explore EASA College's rich legacy since 2008, Autonomous status, NAAC 'A' Grade accreditation, vision, mission, state-of-the-art 25-acre campus, and commitment to engineering leadership."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO SECTION */}
            <GlobalHero
                pageKey="institution"
                defaultTitle={pageData?.title || "About the Institution"}
                defaultSubtitle={pageData?.subtitle || "Shaping visionary engineers, innovators, and global leaders since 2008."}
                defaultImage={pageData?.heroImage}
            />

            {/* ACCREDITATIONS TICKER STRIP */}
            <div style={{
                background: 'linear-gradient(90deg, rgba(45, 44, 122, 0.95), #1e1b4b)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '1.2rem 2rem',
                position: 'relative',
                zIndex: 5
            }}>
                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}>
                        {accreditations.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FaCheckCircle style={{ color: 'var(--secondary)', fontSize: '1.1rem', flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'white' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.note}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* KEY METRICS (3D TILT CARDS) */}
            <section style={{ padding: '4rem 2rem 2rem', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2rem'
                    }}>
                        {keyStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Tilt3DCard
                                    maxTilt={7}
                                    glareOpacity={0.14}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '24px',
                                        padding: '2.5rem 2rem',
                                        height: '100%',
                                        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '16px',
                                            background: 'rgba(230, 182, 39, 0.12)',
                                            color: 'var(--secondary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            transform: 'translateZ(20px)'
                                        }}>
                                            {stat.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '900',
                                            letterSpacing: '1px',
                                            color: 'var(--secondary)',
                                            background: 'rgba(230, 182, 39, 0.1)',
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(230, 182, 39, 0.3)',
                                            transform: 'translateZ(15px)'
                                        }}>
                                            {stat.unit}
                                        </span>
                                    </div>
                                    <div style={{ transform: 'translateZ(20px)' }}>
                                        <h3 style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1', marginBottom: '0.5rem' }}>
                                            {stat.value}
                                        </h3>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                                            {stat.label}
                                        </h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                            {stat.desc}
                                        </p>
                                    </div>
                                </Tilt3DCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE HERITAGE & INSTITUTIONAL HIGHLIGHTS (IMPRESSIVE MAGAZINE-GRADE LAYOUT) */}
            <section style={{ padding: '3rem 2rem 5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15%', right: '-5%', width: '450px', height: '450px', background: 'var(--secondary)', opacity: 0.04, borderRadius: '50%', filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'var(--primary)', opacity: 0.05, borderRadius: '50%', filter: 'blur(90px)' }} />

                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '36px',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.06)',
                        padding: 'clamp(2.5rem, 5vw, 4rem)'
                    }}>
                        {/* TOP BADGE & TITLE */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                <FaHistory /> Institutional Profile
                            </div>
                            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: '900', lineHeight: '1.15', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                                Welcome to <span style={{ color: 'var(--secondary)' }}>EASA College</span> of Engineering and Technology
                            </h2>

                            {/* TAB CONTROLS */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {[
                                        { id: 'overview', label: 'Overview & Accreditations' },
                                        { id: 'history', label: 'Our Genesis & Inception' },
                                        { id: 'legacy', label: 'Autonomous Status & Vision' }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{
                                                padding: '0.65rem 1.5rem',
                                                borderRadius: '30px',
                                                fontSize: '0.9rem',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                                border: activeTab === tab.id ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                                                background: activeTab === tab.id ? 'var(--secondary)' : 'rgba(255,255,255,0.03)',
                                                color: activeTab === tab.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                                transition: 'all 0.3s ease',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeTab === tab.id ? 'var(--bg-dark)' : 'var(--secondary)' }} />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* TWO-COLUMN RICH CONTENT GRID */}
                        <div className="institution-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'start' }}>
                            {/* LEFT SIDE: TAB CONTENT & HIGHLIGHT CARDS */}
                            <div>
                                <AnimatePresence mode="wait">
                                    {activeTab === 'overview' && (
                                        <motion.div
                                            key="overview"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}
                                        >
                                            <p style={{ fontSize: '1.18rem', lineHeight: '1.85', color: 'var(--text-muted)' }}>
                                                Founded in <strong>2008 by the EASA Foundations</strong>, EASA College of Engineering and Technology (ECET) is a premier private engineering institution located in Coimbatore, Tamil Nadu. Affiliated with <strong>Anna University, Chennai</strong>, and approved by <strong>AICTE, New Delhi</strong>, the institution stands accredited with <strong>"A" Grade by NAAC</strong>, reflecting its unwavering commitment to academic rigor and holistic development.
                                            </p>

                                            <div style={{ background: 'rgba(230, 182, 39, 0.08)', border: '1px solid rgba(230, 182, 39, 0.25)', borderRadius: '20px', padding: '1.5rem 1.8rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '900', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                                                    <FaAward size={20} /> Autonomous Status Granted in 2024
                                                </div>
                                                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                                    ECET was granted autonomous status by UGC, empowering it to design modern curricula, conduct its own assessments, and implement innovative teaching methodologies tailored directly to global industry requirements.
                                                </p>
                                            </div>

                                            {/* CAMPUS HIGHLIGHTS GRID */}
                                            <div style={{ marginTop: '0.5rem' }}>
                                                <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.2rem' }}>
                                                    Campus & Academic Ecosystem
                                                </h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                                                    {campusHighlights.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.03)',
                                                                border: '1px solid var(--glass-border)',
                                                                borderRadius: '16px',
                                                                padding: '1.3rem',
                                                                transition: 'transform 0.2s ease, border-color 0.2s ease'
                                                            }}
                                                            className="highlight-card"
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.6rem', color: 'var(--secondary)', fontSize: '1.2rem' }}>
                                                                {item.icon}
                                                                <h5 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '800', margin: 0 }}>
                                                                    {item.title}
                                                                </h5>
                                                            </div>
                                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'history' && (
                                        <motion.div
                                            key="history"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.85' }}
                                        >
                                            <p>
                                                Under the visionary stewardship of the <strong>EASA Educational Trust</strong>, the institution began with a dedicated mission: to democratize high-quality, research-driven engineering education for ambitious youth across South India.
                                            </p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0' }}>
                                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ color: 'var(--secondary)', fontSize: '2rem', fontWeight: '900', marginBottom: '4px' }}>2008</div>
                                                    <h5 style={{ color: 'white', fontWeight: '800', marginBottom: '4px' }}>Genesis & Inception</h5>
                                                    <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)' }}>Inaugural batch launched with core engineering branches.</p>
                                                </div>
                                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ color: '#38bdf8', fontSize: '2rem', fontWeight: '900', marginBottom: '4px' }}>2024</div>
                                                    <h5 style={{ color: 'white', fontWeight: '800', marginBottom: '4px' }}>Autonomous Milestone</h5>
                                                    <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)' }}>UGC Autonomous conferment for progressive curriculum agility.</p>
                                                </div>
                                            </div>
                                            <p>
                                                From a single campus wing to a sprawling 25-acre multidisciplinary tech enclave, EASA has evolved into an academic center of excellence recognized for high placement ratios, patent filings, and industry incubators.
                                            </p>
                                        </motion.div>
                                    )}

                                    {activeTab === 'legacy' && (
                                        <motion.div
                                            key="legacy"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.85' }}
                                        >
                                            <p>
                                                With its <strong>Autonomous Status and NAAC "A" Grade</strong>, ECET is positioned to deliver contemporary, industry-resonant education. Students gain early exposure to real-world corporate problems, collaborative faculty research, and entrepreneurial mentorship.
                                            </p>
                                            <div style={{ background: 'linear-gradient(135deg, rgba(45, 44, 122, 0.3), rgba(230, 182, 39, 0.1))', padding: '1.8rem', borderRadius: '20px', border: '1px solid rgba(230, 182, 39, 0.3)' }}>
                                                <h4 style={{ color: 'var(--secondary)', fontWeight: '900', fontSize: '1.2rem', marginBottom: '8px' }}>
                                                    Empowering Student Potential
                                                </h4>
                                                <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                                    From advanced AI and biomedical research laboratories to comprehensive career coaching, every facet of EASA College is engineered to propel students into top-tier tech and managerial leadership.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* ACTION BUTTONS */}
                                <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => setShowAdmissionForm(true)}
                                        style={{
                                            padding: '1.1rem 2.5rem',
                                            borderRadius: '50px',
                                            background: 'var(--secondary)',
                                            color: 'var(--bg-dark)',
                                            fontWeight: '800',
                                            fontSize: '1rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            boxShadow: '0 12px 25px rgba(230, 182, 39, 0.3)'
                                        }}
                                    >
                                        Apply for Admission <FaArrowRight size={14} />
                                    </button>
                                    <a
                                        href="/naac"
                                        style={{
                                            padding: '1.1rem 2.2rem',
                                            borderRadius: '50px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--text-main)',
                                            fontWeight: '800',
                                            fontSize: '1rem',
                                            textDecoration: 'none',
                                            border: '1px solid var(--glass-border)',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}
                                    >
                                        NAAC & Accreditations
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT SIDE: STACKED 3D SHOWCASE CLUSTER */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* MAIN CAMPUS 3D TILT CARD */}
                                <Tilt3DCard
                                    maxTilt={6}
                                    glareOpacity={0.2}
                                    style={{
                                        borderRadius: '26px',
                                        overflow: 'hidden',
                                        boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
                                        border: '1px solid var(--glass-border)',
                                        position: 'relative'
                                    }}
                                >
                                    <img
                                        src={aboutMain}
                                        alt="EASA College Campus Entrance"
                                        style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        left: '20px',
                                        right: '20px',
                                        transform: 'translateZ(25px)'
                                    }}>
                                        <div style={{
                                            background: 'rgba(15, 23, 42, 0.85)',
                                            backdropFilter: 'blur(16px)',
                                            borderRadius: '16px',
                                            padding: '1.2rem',
                                            border: '1px solid rgba(255,255,255,0.15)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.8rem', marginBottom: '3px' }}>
                                                <FaMapMarkerAlt /> Palakkad Main Road, Navakkarai, Coimbatore
                                            </div>
                                            <h4 style={{ color: 'white', fontWeight: '900', fontSize: '1.15rem', margin: 0 }}>
                                                State-of-the-Art 25-Acre Campus
                                            </h4>
                                        </div>
                                    </div>
                                </Tilt3DCard>

                                {/* QUICK ACCREDITATION SUMMARY PILL CARD */}
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '22px',
                                    padding: '1.8rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                            <FaMedal />
                                        </div>
                                        <div>
                                            <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', color: 'white' }}>NAAC 'A' Grade Accredited</h5>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Excellence in Pedagogy & Infrastructure</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                                        <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                            <FaTrophy />
                                        </div>
                                        <div>
                                            <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', color: 'white' }}>UGC Autonomous Status</h5>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Agile Industry-Oriented Curriculum</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3D VISION & MISSION SHOWCASE */}
            <section style={{ padding: '0 2rem 5rem', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(230, 182, 39, 0.1)',
                                padding: '0.5rem 1.4rem',
                                borderRadius: '50px',
                                color: 'var(--secondary)',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '1.2rem',
                                border: '1px solid rgba(230, 182, 39, 0.25)'
                            }}
                        >
                            <FaBullseye /> Strategic Direction
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                                fontWeight: '900',
                                color: 'var(--text-main)',
                                lineHeight: '1.1'
                            }}
                        >
                            Vision & Mission of the <span style={{ color: 'var(--secondary)' }}>Institution</span>
                        </motion.h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                        gap: '3rem'
                    }}>
                        {/* VISION CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Tilt3DCard
                                maxTilt={6}
                                glareOpacity={0.16}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '32px',
                                    padding: '3.5rem',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '5px',
                                    background: 'linear-gradient(90deg, var(--secondary), #f59e0b)'
                                }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem', transform: 'translateZ(20px)' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '18px',
                                        background: 'rgba(230, 182, 39, 0.15)',
                                        color: 'var(--secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.8rem'
                                    }}>
                                        <FaEye />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--secondary)' }}>Institutional</span>
                                        <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>Our Vision</h3>
                                    </div>
                                </div>
                                <div style={{ transform: 'translateZ(15px)' }}>
                                    <p style={{
                                        color: 'var(--text-main)',
                                        fontSize: '1.25rem',
                                        lineHeight: '1.85',
                                        fontWeight: '500'
                                    }}>
                                        {visionMission?.vision || "To be a premier institution of academic excellence, fostering innovative research, ethical leadership, and empowering students to contribute meaningfully to global technological and societal advancement."}
                                    </p>
                                </div>
                            </Tilt3DCard>
                        </motion.div>

                        {/* MISSION CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Tilt3DCard
                                maxTilt={6}
                                glareOpacity={0.16}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '32px',
                                    padding: '3.5rem',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                                    height: '100%',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '5px',
                                    background: 'linear-gradient(90deg, #38bdf8, #818cf8)'
                                }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem', transform: 'translateZ(20px)' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '18px',
                                        background: 'rgba(56, 189, 248, 0.15)',
                                        color: '#38bdf8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.8rem'
                                    }}>
                                        <FaBullseye />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#38bdf8' }}>Institutional</span>
                                        <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>Our Mission</h3>
                                    </div>
                                </div>
                                <div style={{ transform: 'translateZ(15px)' }}>
                                    {Array.isArray(visionMission?.mission) ? (
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {visionMission.mission.map((item, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                                    <span style={{
                                                        fontWeight: '900',
                                                        color: '#38bdf8',
                                                        background: 'rgba(56, 189, 248, 0.12)',
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.85rem',
                                                        flexShrink: 0
                                                    }}>
                                                        {idx + 1}
                                                    </span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.8' }}>
                                            {visionMission?.mission || "To provide world-class technical education, cultivate entrepreneurial spirits, nurture industrial collaborations, and instill human values and ethical practices in future engineering leaders."}
                                        </p>
                                    )}
                                </div>
                            </Tilt3DCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CORE INSTITUTIONAL PILLARS */}
            <section style={{ padding: '4rem 2rem 5rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--glass-border)' }}>
                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '1rem' }}
                        >
                            The Foundation of Excellence
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: 'clamp(2.3rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1' }}
                        >
                            Our Core Institutional Pillars
                        </motion.h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {corePillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Tilt3DCard
                                    maxTilt={8}
                                    glareOpacity={0.15}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '26px',
                                        padding: '2.8rem 2.2rem',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: '0 15px 35px rgba(0,0,0,0.06)'
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '16px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: pillar.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.6rem',
                                            marginBottom: '1.8rem',
                                            border: '1px solid var(--glass-border)',
                                            transform: 'translateZ(20px)'
                                        }}>
                                            {pillar.icon}
                                        </div>
                                        <div style={{ transform: 'translateZ(15px)' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: pillar.color, display: 'block', marginBottom: '6px' }}>
                                                {pillar.subtitle}
                                            </span>
                                            <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.3' }}>
                                                {pillar.title}
                                            </h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>
                                </Tilt3DCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MILESTONES & EVOLUTION TIMELINE PREVIEW */}
            <section style={{ padding: '5rem 2rem 6rem', position: 'relative', background: 'var(--bg-main)' }}>
                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '1rem' }}
                        >
                            Journey of 16+ Years
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: 'clamp(2.3rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '1rem' }}
                        >
                            Milestones in Technical Education
                        </motion.h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto' }}>
                            A chronological snapshot of our growth, accreditations, and academic evolution.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.5rem',
                        position: 'relative'
                    }}>
                        {milestones.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Tilt3DCard
                                    maxTilt={6}
                                    glareOpacity={0.12}
                                    style={{
                                        background: 'var(--bg-card)',
                                        borderRadius: '24px',
                                        padding: '2.2rem 1.8rem',
                                        border: '1px solid var(--glass-border)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            fontSize: '2.2rem',
                                            fontWeight: '900',
                                            color: 'var(--secondary)',
                                            lineHeight: '1',
                                            marginBottom: '1rem',
                                            transform: 'translateZ(20px)'
                                        }}>
                                            {item.year}
                                        </div>
                                        <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem', transform: 'translateZ(15px)' }}>
                                            {item.title}
                                        </h4>
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', transform: 'translateZ(10px)' }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </Tilt3DCard>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                        <a
                            href="/milestones"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-main)',
                                border: '1px solid var(--glass-border)',
                                fontWeight: '800',
                                textDecoration: 'none',
                                transition: '0.3s'
                            }}
                        >
                            View Full Timeline & Milestones <FaArrowRight size={14} style={{ color: 'var(--secondary)' }} />
                        </a>
                    </div>
                </div>
            </section>

            {/* MANAGEMENT & GOVERNANCE SECTION */}
            <ManagementSection title="Our Leadership & Governance" subtitle="The visionaries and academic leaders guiding EASA College" />

            {/* ADMISSION CALL TO ACTION */}
            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />

            {/* ADMISSION FORM MODAL */}
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />

            {/* FOOTER */}
            <Footer />

            <style>{`
                .highlight-card:hover {
                    border-color: rgba(230, 182, 39, 0.4) !important;
                    transform: translateY(-3px);
                }
                @media (max-width: 1024px) {
                    .institution-content-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default InstitutionPage;
