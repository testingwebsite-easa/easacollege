import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaRocket, FaLightbulb, FaChartLine, FaHandshake,
    FaBuilding, FaAward, FaSeedling, FaUsers,
    FaCogs, FaCheckCircle, FaLaptopCode, FaMicrochip,
    FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaFileAlt, FaGlobe, FaCertificate, FaCoins,
    FaCompass, FaShieldAlt, FaNetworkWired, FaBriefcase,
    FaComments, FaIndustry, FaUserTie, FaCheckDouble
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const entrepreneurshipData = {
    name: "Center for Innovation, Incubation & Entrepreneurship (EDC)",
    heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    vision: "To cultivate a vibrant, innovation-driven entrepreneurial ecosystem that inspires students and faculty to transform disruptive technological concepts into commercially viable, high-impact startup enterprises.",
    mission: [
        "To provide end-to-end incubation support including modern co-working infrastructure, state-of-the-art prototyping laboratories, and seed capital assistance.",
        "To deliver intensive mentoring in business modeling, market research, design thinking, intellectual property rights (IPR), and company incorporation.",
        "To connect early-stage student founders with angel investor networks, venture capitalists, government funding agencies (MSME, EDII, DST), and industry mentors.",
        "To champion a culture of risk-taking, ethical leadership, and sustainable wealth creation that addresses pressing industrial and societal challenges."
    ],
    overviewParagraphs: [
        "The Center for Innovation, Incubation & Entrepreneurship (CIIE / EDC) at EASA College of Engineering and Technology serves as the central springboard for student entrepreneurs, innovators, and creative problem-solvers.",
        "Equipped with the AICTE IDEA Lab, dedicated maker spaces, advanced rapid-prototyping machinery, and high-speed collaboration zones, the Center bridges the crucial gap between academic innovation and commercial startup reality.",
        "From pre-incubation ideation hackathons to venture registration, seed funding, patent drafting, and investor pitch sessions, we empower young innovators to build scalable businesses and become creators of employment."
    ],
    stats: [
        { label: "Startups Incubated", value: "28+", icon: <FaRocket /> },
        { label: "Seed Grants & Funding", value: "₹85L+", icon: <FaCoins /> },
        { label: "Patents & Innovations", value: "45+", icon: <FaShieldAlt /> },
        { label: "Industry & VC Mentors", value: "35+", icon: <FaUsers /> },
        { label: "Prototype Success Rate", value: "95%", icon: <FaCheckCircle /> }
    ],
    programs: [
        {
            title: "Pre-Incubation & Ideation Bootcamps",
            badge: "Ideation Stage",
            desc: "Structured 6-week experiential workshops covering Design Thinking, Lean Canvas modeling, Problem-Solution fit, and Customer Discovery.",
            icon: <FaLightbulb />,
            deliverables: ["Idea Validation", "Lean Business Model", "Problem Discovery Pitch", "Faculty Mentorship"]
        },
        {
            title: "AICTE IDEA Lab & Rapid Prototyping",
            badge: "Prototyping Stage",
            desc: "24/7 access to industrial 3D printers, laser cutters, CNC milling machines, IoT testbeds, and PCB fabrication units for physical hardware prototypes.",
            icon: <FaMicrochip />,
            deliverables: ["Hardware & IoT Prototyping", "CAD/CAM Testing", "PCB Fabrication", "BOM Optimization"]
        },
        {
            title: "EASA Seed Capital & Grant Facilitation",
            badge: "Seed Funding",
            desc: "Direct institutional seed grants up to ₹2.5 Lakhs per startup, plus facilitation for MSME Innovation Grants (up to ₹15 Lakhs) and EDII Tamil Nadu Vouchers.",
            icon: <FaCoins />,
            deliverables: ["POC Proof Grant", "MSME Incubation Grant", "EDII Voucher A & B", "Zero-Equity Angel Grants"]
        },
        {
            title: "IPR Filing, Legal & Incorporation Desk",
            badge: "Legal & IP",
            desc: "Comprehensive support for Private Limited company incorporation, GST registration, trademark filings, and patent drafting with 100% institutional subsidy.",
            icon: <FaShieldAlt />,
            deliverables: ["Pvt Ltd / LLP Registration", "Patent Drafting Support", "Trademark & Copyright", "Founder Agreement Drafting"]
        },
        {
            title: "Investor Pitch Days & Demo Day (E-Summit)",
            badge: "Venture Scaling",
            desc: "Bi-annual flagship startup showcase connecting incubated ventures with Coimbatore Innovation Network, angel syndicates, and seed-stage VC funds.",
            icon: <FaChartLine />,
            deliverables: ["Live Pitch to Angels", "Term Sheet Review", "Market Go-To-Market Strategy", "Media & Press Coverage"]
        },
        {
            title: "Student Entrepreneur-in-Residence (EIR) Policy",
            badge: "Academic Support",
            desc: "Special institutional provisions offering academic credits for startup milestones, attendance flexibility for investor meetings, and semester gap year options.",
            icon: <FaBriefcase />,
            deliverables: ["Academic Credit Swap", "Attendance Relaxation", "Hostel Co-Living for Founders", "Deferred Placement Support"]
        }
    ],
    startups: [
        {
            name: "AgroBotix Technologies",
            founder: "Karthik R. (MECH '24)",
            sector: "Agri-Tech & Robotics",
            desc: "Autonomous solar-powered weeding and precision pesticide spraying rover for turmeric and sugarcane plantations.",
            funding: "₹5.0 Lakhs (EDII IVP-B)",
            stage: "Commercial Pilots in Erode & Coimbatore",
            icon: <FaSeedling />
        },
        {
            name: "Vitalsense IoT Devices",
            founder: "Deepika S. & Team (BME '25)",
            sector: "HealthTech & Wearables",
            desc: "Continuous non-invasive multi-parameter vital signs monitor with cloud telemedicine telemetry for rural primary health centers.",
            funding: "₹3.5 Lakhs (MSME Scheme)",
            stage: "Clinical Trial Validation",
            icon: <FaLaptopCode />
        },
        {
            name: "EcoVolt Clean Energy",
            founder: "Suresh Kumar (EEE '23)",
            sector: "Renewable Energy & IoT",
            desc: "Modular battery management system and smart solar charge controllers with predictive maintenance analytics.",
            funding: "₹4.0 Lakhs (Institutional Seed Fund)",
            stage: "Supplying to 12 Solar Integrators",
            icon: <FaLightbulb />
        },
        {
            name: "QuantLogix AI Solutions",
            founder: "Praveen M. (CSE '24)",
            sector: "Enterprise AI & Workflow",
            desc: "Automated optical inspection software using edge computer vision for defect detection in automotive manufacturing lines.",
            funding: "₹6.5 Lakhs (Angel Syndicate)",
            stage: "Active Commercial Deployments",
            icon: <FaNetworkWired />
        }
    ],
    incubationRoadmap: [
        {
            step: "01",
            phase: "Ideation & Problem Identification",
            duration: "Months 1 - 2",
            desc: "Campus hackathons, problem discovery workshops, customer interviews, and initial feasibility screening."
        },
        {
            step: "02",
            phase: "Proof-of-Concept & Prototyping",
            duration: "Months 3 - 4",
            desc: "AICTE IDEA Lab fabrication, breadboard to PCB transition, functional MVP development, and seed grant sanction."
        },
        {
            step: "03",
            phase: "Legal Setup & Patent Filing",
            duration: "Months 5 - 6",
            desc: "Provisional patent filing, MCA company registration, trademark protection, and advisory board onboarding."
        },
        {
            step: "04",
            phase: "Pilot Testing & Market Validation",
            duration: "Months 7 - 9",
            desc: "Field deployment with initial pilot customers, customer feedback iterations, and revenue model refinement."
        },
        {
            step: "05",
            phase: "Demo Day & Scaling",
            duration: "Months 10 - 12",
            desc: "Pitching at the Annual E-Summit, securing seed VC funding, team expansion, and market launch."
        }
    ],
    mentors: [
        {
            name: "Dr. K. Arulmurugan",
            role: "Director - Incubation & Innovation Cell",
            specialization: "Technology Commercialization & Grant Management"
        },
        {
            name: "Mr. R. Vigneshwaran",
            role: "Chief Startup Mentor & Angel Investor",
            specialization: "Go-to-Market Strategy & Venture Scaling"
        },
        {
            name: "Prof. S. Santhiya",
            role: "Coordinator - IPR & Patent Cell",
            specialization: "Patent Drafting, Copyright & Prior Art Search"
        },
        {
            name: "Mr. G. Arvind",
            role: "Industry Liaison & Legal Advisor",
            specialization: "Company Law, Founder Agreements & Term Sheets"
        }
    ],
    faqs: [
        {
            q: "Who is eligible to apply for incubation at EASA CIIE?",
            a: "All current undergraduate and postgraduate students, alumni (up to 3 years from graduation), and faculty members across any engineering department are eligible to apply with an innovative concept."
        },
        {
            q: "Do I need to already have a working prototype to apply?",
            a: "No! We support innovators from the earliest ideation stage. Our pre-incubation program and AICTE IDEA Lab facilities will assist you in building your first functional prototype."
        },
        {
            q: "What financial assistance does the college offer to student startups?",
            a: "EASA provides direct seed funding of up to ₹2.5 Lakhs per vetted project, alongside end-to-end assistance to apply for government grants including MSME Innovation Grants (up to ₹15 Lakhs) and EDII Tamil Nadu Innovation Vouchers."
        },
        {
            q: "How does the Student Entrepreneur-in-Residence (EIR) policy work?",
            a: "Recognized student founders receive up to 10% attendance relaxation for startup-related events and investor meetings, academic credits for startup milestones in place of open electives, and access to 24/7 incubator facilities."
        },
        {
            q: "Does EASA assist with patent filing and legal company incorporation?",
            a: "Yes. Our in-house IPR cell manages patent prior art searches, patent drafting, filing fees, and company incorporation (Pvt Ltd / LLP) with 100% subsidized institutional assistance."
        }
    ]
};

const EntrepreneurshipPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [pitchModal, setPitchModal] = useState(false);
    const [pitchForm, setPitchForm] = useState({
        founderName: '',
        email: '',
        phone: '',
        department: '',
        year: '3rd Year',
        startupName: '',
        sector: 'Software & AI',
        ideaSummary: '',
        currentStage: 'Idea Stage'
    });
    const [pitchSubmitted, setPitchSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'overview', label: 'Overview & Vision', icon: <FaBuilding /> },
        { id: 'statistics', label: 'Key Highlights', icon: <FaChartLine /> },
        { id: 'programs', label: 'Incubation Programs', icon: <FaRocket /> },
        { id: 'startups', label: 'Incubated Startups', icon: <FaIndustry /> },
        { id: 'roadmap', label: '5-Stage Roadmap', icon: <FaCompass /> },
        { id: 'mentors', label: 'Mentors & Advisory', icon: <FaUsers /> },
        { id: 'faqs', label: 'FAQs & Policies', icon: <FaLightbulb /> }
    ];

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const handlePitchSubmit = (e) => {
        e.preventDefault();
        setPitchSubmitted(true);
        setTimeout(() => {
            setPitchModal(false);
            setPitchSubmitted(false);
            setPitchForm({
                founderName: '',
                email: '',
                phone: '',
                department: '',
                year: '3rd Year',
                startupName: '',
                sector: 'Software & AI',
                ideaSummary: '',
                currentStage: 'Idea Stage'
            });
            alert('🎉 Congratulations! Your Startup Pitch has been submitted to EASA Incubation Cell. Our team will review your proposal and invite you for an evaluation pitch.');
        }, 1500);
    };

    return (
        <div className="entrepreneurship-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
            <SEO
                title="Innovation & Entrepreneurship Cell (EDC / Incubation) | EASA College"
                description="Center for Innovation, Incubation & Entrepreneurship at EASA College - Seed funding, AICTE IDEA Lab prototyping, startup incubation, patent filing, and investor pitch sessions."
                keywords="EASA Entrepreneurship Cell, Startup Incubation, AICTE IDEA Lab, Seed Capital, MSME Grant, Student Startups, Coimbatore Incubator"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="entrepreneurship"
                defaultTitle="Center for Innovation, Incubation & Entrepreneurship"
                defaultSubtitle="Igniting the entrepreneurial mindset, incubating cutting-edge technology startups, providing seed capital, and turning engineering innovations into viable commercial ventures."
                defaultImage={entrepreneurshipData.heroImage}
            />

            {/* MAIN CONTENT WRAPPER */}
            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem' }} className="ent-grid">

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
                                    Incubation & E-Cell Hub
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

                            {/* PITCH IDEA CTA CARD */}
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1.5rem',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                color: '#ffffff',
                                textAlign: 'center',
                                boxShadow: '0 10px 25px rgba(37,99,235,0.3)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}><FaRocket /></div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '0.4rem' }}>Have a Startup Idea?</h4>
                                <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: '1.4', marginBottom: '1.2rem' }}>
                                    Submit your concept for seed funding, prototyping lab access & mentorship.
                                </p>
                                <button
                                    onClick={() => setPitchModal(true)}
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
                                    Pitch Your Startup Idea
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
                                                Ecosystem Overview
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Nurturing Builders, Innovators & Job Creators
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {entrepreneurshipData.overviewParagraphs.map((para, idx) => (
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
                                                    <FaLightbulb />
                                                </div>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: isDark ? '#38BDF8' : '#1E40AF', marginBottom: '1rem' }}>
                                                    Our Vision
                                                </h3>
                                                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
                                                    {entrepreneurshipData.vision}
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
                                                    {entrepreneurshipData.mission.map((item, idx) => (
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

                                {/* 2. KEY HIGHLIGHTS & METRICS */}
                                {activeSection === 'statistics' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Ecosystem Metrics
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Key Highlights & Impact
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Measurable outcomes from our incubation ecosystem, seed grants, and patent portfolio.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                            {entrepreneurshipData.stats.map((stat, idx) => (
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

                                        {/* INCUBATOR FACILITIES HIGHLIGHT */}
                                        <div style={{
                                            background: isDark ? 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(124,58,237,0.2) 100%)' : 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
                                            borderRadius: '24px',
                                            border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(191,219,254,1)',
                                            padding: '2.5rem',
                                            marginTop: '1rem'
                                        }}>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: primaryTextColor, marginBottom: '1rem' }}>
                                                World-Class Prototyping & Incubation Facilities
                                            </h3>
                                            <p style={{ color: secondaryTextColor, lineHeight: '1.7', margin: 0, fontSize: '1rem' }}>
                                                Spanning over 10,000+ sq. ft. of dedicated incubation space, EASA CIIE provides 24/7 access to high-speed internet, dedicated founder desks, conference rooms, advanced 3D printing & CNC fabrication machinery at the AICTE IDEA Lab, legal documentation support, and direct mentor office hours.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* 3. INCUBATION PROGRAMS */}
                                {activeSection === 'programs' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Structured Support
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Incubation & Entrepreneurship Programs
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Comprehensive pathways designed to take young innovators from early proof-of-concept to venture scaling.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.8rem' }}>
                                            {entrepreneurshipData.programs.map((prog, idx) => (
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
                                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                                color: accentColor,
                                                                fontSize: '0.75rem',
                                                                fontWeight: '800',
                                                                textTransform: 'uppercase'
                                                            }}>
                                                                {prog.badge}
                                                            </span>
                                                        </div>

                                                        <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem', lineHeight: '1.3' }}>
                                                            {prog.title}
                                                        </h3>

                                                        <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                            {prog.desc}
                                                        </p>
                                                    </div>

                                                    <div style={{
                                                        paddingTop: '1.2rem',
                                                        borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        <div style={{ fontWeight: '800', color: primaryTextColor, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                                            Key Deliverables:
                                                        </div>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                            {prog.deliverables.map((item, dIdx) => (
                                                                <span key={dIdx} style={{
                                                                    padding: '0.25rem 0.6rem',
                                                                    borderRadius: '8px',
                                                                    background: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9',
                                                                    color: primaryTextColor,
                                                                    fontSize: '0.78rem',
                                                                    fontWeight: '600'
                                                                }}>
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 4. INCUBATED STARTUPS */}
                                {activeSection === 'startups' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Success Stories
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Featured Student Startups & Ventures
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Spotlight on student-led enterprises born and nurtured at EASA Incubation Center.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                                            {entrepreneurshipData.startups.map((st, idx) => (
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
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                                        <div>
                                                            <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                                {st.name}
                                                            </h3>
                                                            <span style={{ fontSize: '0.85rem', color: accentColor, fontWeight: '700' }}>
                                                                {st.founder}
                                                            </span>
                                                        </div>
                                                        <span style={{
                                                            padding: '0.35rem 0.8rem',
                                                            borderRadius: '50px',
                                                            background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                                                            color: '#10B981',
                                                            fontSize: '0.78rem',
                                                            fontWeight: '800'
                                                        }}>
                                                            {st.sector}
                                                        </span>
                                                    </div>

                                                    <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                                        {st.desc}
                                                    </p>

                                                    <div style={{
                                                        padding: '1rem',
                                                        borderRadius: '16px',
                                                        background: isDark ? 'rgba(56, 189, 248, 0.08)' : '#F8FAFC',
                                                        border: cardBorder,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: secondaryTextColor, fontWeight: '600' }}>Funding Secured:</span>
                                                            <span style={{ color: isDark ? '#FBBF24' : '#D97706', fontWeight: '800' }}>{st.funding}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: secondaryTextColor, fontWeight: '600' }}>Milestone:</span>
                                                            <span style={{ color: primaryTextColor, fontWeight: '700' }}>{st.stage}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 5. 5-STAGE ROADMAP */}
                                {activeSection === 'roadmap' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Idea to Market
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                5-Stage Startup Incubation Roadmap
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Structured roadmap transforming early concept notes into investment-ready, revenue-generating businesses.
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {entrepreneurshipData.incubationRoadmap.map((stage, idx) => (
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
                                                            Stage {stage.step}
                                                        </span>
                                                        <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                            {stage.phase}
                                                        </h4>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: accentColor }}>
                                                            {stage.duration}
                                                        </div>
                                                    </div>

                                                    <p style={{ fontSize: '1rem', color: secondaryTextColor, lineHeight: '1.65', margin: 0 }}>
                                                        {stage.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 6. MENTORS & ADVISORY */}
                                {activeSection === 'mentors' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Expert Guidance
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Incubation Advisory Board & Mentors
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Seasoned angel investors, technology leaders, and IP attorneys mentoring EASA founders.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
                                            {entrepreneurshipData.mentors.map((mentor, idx) => (
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
                                                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: isDark ? '#FBBF24' : '#D97706', marginBottom: '0.8rem' }}>
                                                        {mentor.role}
                                                    </div>
                                                    <div style={{
                                                        padding: '0.6rem 0.8rem',
                                                        borderRadius: '12px',
                                                        background: isDark ? 'rgba(56, 189, 248, 0.1)' : '#F1F5F9',
                                                        fontSize: '0.82rem',
                                                        color: primaryTextColor,
                                                        fontWeight: '600'
                                                    }}>
                                                        {mentor.specialization}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 7. FAQS */}
                                {activeSection === 'faqs' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Got Questions?
                                            </span>
                                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Frequently Asked Questions & Policies
                                            </h2>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {entrepreneurshipData.faqs.map((faq, idx) => {
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

            {/* PITCH YOUR IDEA MODAL */}
            <AnimatePresence>
                {pitchModal && (
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
                                maxWidth: '580px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                padding: '2.5rem',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setPitchModal(false)}
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
                                Apply for Startup Incubation & Seed Grants
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, marginBottom: '1.5rem' }}>
                                Pitch your innovation to EASA CIIE to access prototyping labs, seed grants, and mentor networks.
                            </p>

                            <form onSubmit={handlePitchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Lead Founder Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={pitchForm.founderName}
                                        onChange={(e) => setPitchForm({ ...pitchForm, founderName: e.target.value })}
                                        placeholder="e.g. Karthik R."
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={pitchForm.email}
                                            onChange={(e) => setPitchForm({ ...pitchForm, email: e.target.value })}
                                            placeholder="founder@email.com"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={pitchForm.phone}
                                            onChange={(e) => setPitchForm({ ...pitchForm, phone: e.target.value })}
                                            placeholder="+91 9876543210"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Department *</label>
                                        <select
                                            value={pitchForm.department}
                                            onChange={(e) => setPitchForm({ ...pitchForm, department: e.target.value })}
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
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Proposed Startup / Project Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={pitchForm.startupName}
                                            onChange={(e) => setPitchForm({ ...pitchForm, startupName: e.target.value })}
                                            placeholder="e.g. EcoPower Tech"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Technology Sector *</label>
                                        <select
                                            value={pitchForm.sector}
                                            onChange={(e) => setPitchForm({ ...pitchForm, sector: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="AgriTech & Robotics">AgriTech & Robotics</option>
                                            <option value="HealthTech & Wearables">HealthTech & Wearables</option>
                                            <option value="Renewable Energy & EV">Renewable Energy & CleanTech</option>
                                            <option value="Software & AI">Software, AI & IoT</option>
                                            <option value="FinTech & EdTech">FinTech & EdTech</option>
                                            <option value="Defense & Aerospace">Defense & Advanced Tech</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Current Stage *</label>
                                        <select
                                            value={pitchForm.currentStage}
                                            onChange={(e) => setPitchForm({ ...pitchForm, currentStage: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        >
                                            <option value="Concept / Ideation">Concept / Ideation</option>
                                            <option value="Prototype Ready">Prototype / MVP Ready</option>
                                            <option value="Pilot Testing">Pilot Testing</option>
                                            <option value="Registered Startup">Registered Company (Revenue)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Brief Idea Summary & Problem Solved *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={pitchForm.ideaSummary}
                                        onChange={(e) => setPitchForm({ ...pitchForm, ideaSummary: e.target.value })}
                                        placeholder="Describe the problem, your proposed solution, target customers, and technology used..."
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none', resize: 'vertical' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={pitchSubmitted}
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
                                    {pitchSubmitted ? 'Submitting Pitch...' : 'Submit Pitch for Incubation'}
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
                    .ent-grid {
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

export default EntrepreneurshipPage;
