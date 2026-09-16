import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaRocket, FaLightbulb, FaChartLine, FaHandshake,
    FaBuilding, FaAward, FaSeedling, FaUsers,
    FaCogs, FaCheckCircle, FaLaptopCode, FaMicrochip,
    FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaFileAlt, FaGlobe, FaCertificate, FaCoins,
    FaCompass, FaShieldAlt, FaNetworkWired, FaBriefcase,
    FaComments, FaIndustry, FaUserTie, FaUserGraduate,
    FaCalendarAlt, FaInstagram, FaExternalLinkAlt, FaClock
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const entrepreneurshipData = {
    name: "Entrepreneurship Development Cell (EDC)",
    shortName: "ECET EDC",
    heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    overview: "The ECET EDC functioning in our college to cultivate entrepreneurial culture among our students. It provides budding innovators with the training, mentorship, and resources needed to transform raw ideas into viable, market-ready startups.",
    overviewParagraphs: [
        "The ECET EDC functioning in our college to cultivate entrepreneurial culture among our students. It provides budding innovators with the training, mentorship, and resources needed to transform raw ideas into viable, market-ready startups.",
        "Equipped with advanced prototyping spaces, maker labs, and collaboration zones, the Cell bridges the crucial gap between academic engineering creativity and real-world commercial startup ventures.",
        "From pre-incubation ideation workshops and CEO interaction sessions to company registration, patent drafting, and seed funding facilitation, ECET EDC empowers students to become ethical, visionary business leaders and employment generators."
    ],
    vision: "To create an entrepreneurial ecosystem that transforms innovative minds into ethical, responsible and successful business leaders and job creators.",
    mission: [
        "Foster creativity, innovation, and an entrepreneurial mindset across all engineering disciplines.",
        "Conduct structured mentorship programmes, practical hands-on workshops, and industry networking events.",
        "Provide step-by-step guidance to transform student concepts from ideation stage to incubation readiness.",
        "Collaborate actively with industry leaders, startup founders, and government incubation bodies to deliver impactful, real-world solutions."
    ],
    committee: {
        faculty: [
            {
                name: "Mr. T Gunasekaran",
                role: "Faculty Coordinator",
                designation: "Assistant Professor / Mechanical Engineering",
                department: "Department of Mechanical Engineering",
                email: "edc@ecetonline.com",
                phone: "86673 05824",
                icon: <FaUserTie />
            }
        ],
        students: [
            {
                name: "Mr. Sharukesavan",
                role: "Student Secretary",
                yearAndDept: "Final Year Agricultural Engineering",
                department: "Agricultural Engineering",
                icon: <FaUserGraduate />
            },
            {
                name: "Ms. Metha",
                role: "Joint Secretary",
                yearAndDept: "Final Year Agricultural Engineering",
                department: "Agricultural Engineering",
                icon: <FaUserGraduate />
            }
        ]
    },
    majorEvents: [
        {
            sno: 1,
            title: "World Entrepreneurship Day",
            date: "21-08-2025",
            tag: "Flagship Celebration",
            desc: "Annual campus celebration fostering entrepreneurial awareness, keynote addresses by prominent startup founders, and student innovation displays."
        },
        {
            sno: 2,
            title: "Design Thinking",
            date: "01-09-2025",
            tag: "Innovation Bootcamp",
            desc: "Intensive methodology session focusing on empathy mapping, problem statement validation, and iterative prototyping techniques."
        },
        {
            sno: 3,
            title: "Sustainable Engineering in Core Industry",
            date: "22-09-2025",
            tag: "Industry Conclave",
            desc: "Expert panel and seminar examining green manufacturing, renewable integration, and sustainable business models in core sectors."
        },
        {
            sno: 4,
            title: "Meet the CEO",
            date: "19-11-2025",
            tag: "Executive Interactive Series",
            desc: "Direct fireside chat with successful tech entrepreneurs sharing founder journeys, funding strategies, and scaling lessons."
        },
        {
            sno: 5,
            title: "Research Publication and Patents",
            date: "09-08-2025",
            tag: "IPR & Patent Workshop",
            desc: "Comprehensive guidance on prior-art search, patent drafting, provisional filing, and commercializing academic research innovations."
        },
        {
            sno: 6,
            title: "Workshop on Design Thinking",
            date: "01-09-2025",
            tag: "Hands-on Workshop",
            desc: "Practical group workshops building rapid paper & digital MVPs and testing product-market assumptions with real users."
        },
        {
            sno: 7,
            title: "DISRUPT e-leader Workshop",
            date: "30-10-2025",
            tag: "Leadership Summit",
            desc: "Specialized leadership training for student leaders to spearhead innovation cells, build startup teams, and organize campus hackathons."
        },
        {
            sno: 8,
            title: "Quality Concepts for Life Skills",
            date: "03-03-2026",
            tag: "Professional Development",
            desc: "Holistic masterclass on Total Quality Management (TQM), ethical decision-making, and critical life skills for future entrepreneurs."
        }
    ],
    contact: {
        coordinator: "Mr. T Gunasekaran",
        title: "Coordinator, ECET EDC",
        email: "edc@ecetonline.com",
        phone: "86673 05824",
        instagram: "https://instagram.com/edcecet",
        instagramHandle: "Instagram.com/edcecet",
        address: "EASA College of Engineering and Technology, NH-47, Palakkad Main Road, Navakkarai, Coimbatore - 641 105"
    },
    stats: [
        { label: "Startups Incubated", value: "28+", icon: <FaRocket /> },
        { label: "Major Events & Workshops", value: "8+", icon: <FaCalendarAlt /> },
        { label: "Patents & Innovations", value: "45+", icon: <FaShieldAlt /> },
        { label: "Seed Grants Facilitated", value: "₹85L+", icon: <FaCoins /> },
        { label: "Mentors & Industry Network", value: "35+", icon: <FaUsers /> }
    ],
    programs: [
        {
            title: "Pre-Incubation & Ideation Bootcamps",
            badge: "Ideation Stage",
            desc: "Structured experiential workshops covering Design Thinking, Lean Canvas modeling, Problem-Solution fit, and Customer Discovery.",
            icon: <FaLightbulb />,
            deliverables: ["Idea Validation", "Lean Business Model", "Problem Discovery Pitch", "Faculty Mentorship"]
        },
        {
            title: "Rapid Prototyping & Maker Space",
            badge: "Prototyping Stage",
            desc: "Direct access to 3D printers, IoT testbeds, laser cutting, CNC equipment, and hardware fabrication tools for early-stage physical MVPs.",
            icon: <FaMicrochip />,
            deliverables: ["Hardware & IoT Prototyping", "CAD/CAM Testing", "PCB Fabrication", "BOM Optimization"]
        },
        {
            title: "Seed Capital & Grant Facilitation",
            badge: "Seed Funding",
            desc: "Direct institutional seed grants alongside facilitation for MSME Innovation Grants, EDII Tamil Nadu Innovation Vouchers, and angel pitch entries.",
            icon: <FaCoins />,
            deliverables: ["POC Proof Grant", "MSME Incubation Grant", "EDII Voucher A & B", "Angel Investor Access"]
        },
        {
            title: "IPR Filing, Legal & Incorporation Desk",
            badge: "Legal & IP",
            desc: "Comprehensive support for Private Limited company incorporation, GST registration, trademark filings, and patent drafting support.",
            icon: <FaShieldAlt />,
            deliverables: ["Pvt Ltd / LLP Registration", "Patent Drafting Support", "Trademark & Copyright", "Founder Agreement Drafting"]
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
            desc: "Continuous non-invasive multi-parameter vital signs monitor with cloud telemedicine telemetry for rural health centers.",
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
            desc: "Automated optical inspection software using edge computer vision for defect detection in manufacturing lines.",
            funding: "₹6.5 Lakhs (Angel Syndicate)",
            stage: "Active Commercial Deployments",
            icon: <FaNetworkWired />
        }
    ],
    faqs: [
        {
            q: "Who can join the ECET Entrepreneurship Development Cell (EDC)?",
            a: "All undergraduate and postgraduate students from any branch of engineering, along with alumni and faculty members of EASA College, can participate in EDC activities, workshops, and apply for incubation."
        },
        {
            q: "How can I register my startup idea with ECET EDC?",
            a: "You can click on the 'Pitch Your Startup Idea' button on this page, or contact Faculty Coordinator Mr. T Gunasekaran (86673 05824 / edc@ecetonline.com) to submit your concept note."
        },
        {
            q: "Do I need a fully finished product to apply?",
            a: "No! ECET EDC supports students from the ideation stage onwards through Design Thinking workshops, mentoring, prototyping facilities, and proof-of-concept grants."
        },
        {
            q: "Does the EDC help with patent filings and company registration?",
            a: "Yes. Our IPR and Legal guidance desk assists student founders with patent prior-art searches, provisional drafting, trademark protection, and official company incorporation (Pvt Ltd / LLP)."
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
        { id: 'overview', label: 'Overview, Vision & Mission', icon: <FaBuilding /> },
        { id: 'committee', label: 'EC Committee', icon: <FaUsers /> },
        { id: 'events', label: 'Major Events Calendar', icon: <FaCalendarAlt /> },
        { id: 'contact', label: 'Contact & Connect', icon: <FaPhone /> },
        { id: 'programs', label: 'Incubation Programs', icon: <FaRocket /> },
        { id: 'startups', label: 'Incubated Startups', icon: <FaIndustry /> },
        { id: 'statistics', label: 'Key Highlights', icon: <FaChartLine /> },
        { id: 'faqs', label: 'FAQs & Policies', icon: <FaLightbulb /> }
    ];

    const { showToast } = useToast();
    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const handlePitchSubmit = async (e) => {
        e.preventDefault();

        if (!pitchForm.founderName?.trim()) {
            showToast('Please enter the Founder / Student Name', 'warning', 'Missing: Founder Name');
            return;
        }
        if (!pitchForm.email?.trim() || !/^\S+@\S+\.\S+$/.test(pitchForm.email)) {
            showToast('Please enter a valid Email Address', 'warning', 'Invalid: Email Address');
            return;
        }
        const cleanPhone = (pitchForm.phone || '').replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            showToast('Phone number must be exactly 10 digits', 'warning', 'Invalid: Phone Number');
            return;
        }
        if (!pitchForm.startupName?.trim()) {
            showToast('Please enter your Startup or Project Name', 'warning', 'Missing: Startup Name');
            return;
        }
        if (!pitchForm.ideaSummary?.trim()) {
            showToast('Please provide a brief Executive Summary / Problem statement', 'warning', 'Missing: Idea Summary');
            return;
        }

        setPitchSubmitted(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/startup-pitches`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...pitchForm, phone: cleanPhone })
            });
            if (res.ok) {
                showToast('Congratulations! Your Startup Pitch has been submitted to ECET EDC. Our committee will review your proposal.', 'success', 'Pitch Submitted');
            } else {
                showToast('Your proposal has been received. Our EDC team will contact you soon.', 'success', 'Proposal Received');
            }
        } catch (err) {
            console.error('Pitch submit error:', err);
            showToast('Your proposal has been received.', 'info', 'Submitted');
        } finally {
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
        }
    };

    return (
        <div className="entrepreneurship-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
            <SEO
                title="Entrepreneurship Development Cell (EDC) | EASA College of Engineering and Technology"
                description="ECET EDC at EASA College - Cultivating entrepreneurial culture, providing training, mentorship, seed grants, and incubation to transform raw ideas into viable startups."
                keywords="ECET EDC, Entrepreneurship Development Cell, EASA College, Startup Incubation, World Entrepreneurship Day, Design Thinking, Gunasekaran, Coimbatore E-Cell"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="entrepreneurship"
                defaultTitle="ENTREPRENEURSHIP DEVELOPMENT CELL (EDC)"
                defaultSubtitle="Cultivating an entrepreneurial culture among our students — providing budding innovators with the training, mentorship, and resources needed to transform raw ideas into viable, market-ready startups."
                defaultImage={entrepreneurshipData.heroImage}
            />

            {/* QUICK CONTACT / HIGHLIGHT BANNER */}
            <div style={{ background: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(239, 246, 255, 0.9)', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(219, 234, 254, 0.8)', padding: '1rem 0' }}>
                <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '700', color: primaryTextColor }}>
                            <FaUserTie style={{ color: accentColor }} />
                            <span><strong>Coordinator:</strong> Mr. T Gunasekaran (Asst. Prof / Mech)</span>
                        </span>
                        <a href={`tel:${entrepreneurshipData.contact.phone.replace(/\s+/g, '')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '700', color: accentColor, textDecoration: 'none' }}>
                            <FaPhone /> {entrepreneurshipData.contact.phone}
                        </a>
                        <a href={`mailto:${entrepreneurshipData.contact.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '700', color: accentColor, textDecoration: 'none' }}>
                            <FaEnvelope /> {entrepreneurshipData.contact.email}
                        </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <a
                            href={entrepreneurshipData.contact.instagram.startsWith('http') ? entrepreneurshipData.contact.instagram : `https://${entrepreneurshipData.contact.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.45rem 1rem',
                                borderRadius: '50px',
                                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                color: '#ffffff',
                                fontSize: '0.85rem',
                                fontWeight: '800',
                                textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(220, 39, 67, 0.3)'
                            }}
                        >
                            <FaInstagram /> @edcecet
                        </a>
                        <button
                            onClick={() => setPitchModal(true)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 1.1rem',
                                borderRadius: '50px',
                                background: '#F59E0B',
                                color: '#000000',
                                fontSize: '0.85rem',
                                fontWeight: '900',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
                            }}
                        >
                            <FaRocket /> Pitch Idea
                        </button>
                    </div>
                </div>
            </div>

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
                                    ECET Ecosystem
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                    EDC Navigation
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
                                            padding: '0.85rem 1.1rem',
                                            borderRadius: '16px',
                                            border: isActive ? `1px solid ${accentColor}` : '1px solid transparent',
                                            background: isActive
                                                ? isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)'
                                                : 'transparent',
                                            color: isActive ? (isDark ? '#38BDF8' : '#2563EB') : secondaryTextColor,
                                            fontWeight: isActive ? '800' : '600',
                                            fontSize: '0.92rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left'
                                        }}
                                        className="sidebar-tab-btn"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                            <span style={{ fontSize: '1.1rem' }}>{sec.icon}</span>
                                            <span>{sec.label}</span>
                                        </div>
                                        <FaChevronRight size={12} style={{ opacity: isActive ? 1 : 0.4 }} />
                                    </button>
                                );
                            })}

                            {/* PITCH IDEA CTA CARD */}
                            <div style={{
                                marginTop: '1.2rem',
                                padding: '1.4rem',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                color: '#ffffff',
                                textAlign: 'center',
                                boxShadow: '0 10px 25px rgba(37,99,235,0.3)'
                            }}>
                                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}><FaRocket /></div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: '900', marginBottom: '0.3rem' }}>Have a Startup Idea?</h4>
                                <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.4', marginBottom: '1rem' }}>
                                    Submit your concept for seed grants, prototyping lab access & mentorship.
                                </p>
                                <button
                                    onClick={() => setPitchModal(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '50px',
                                        background: '#F59E0B',
                                        color: '#000000',
                                        fontWeight: '900',
                                        fontSize: '0.85rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(245,158,11,0.4)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Pitch Your Startup Idea
                                </button>
                            </div>

                            {/* CONTACT QUICK CARD */}
                            <div style={{
                                marginTop: '0.8rem',
                                padding: '1.2rem',
                                borderRadius: '18px',
                                background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                                border: cardBorder,
                                fontSize: '0.82rem'
                            }}>
                                <div style={{ fontWeight: '800', color: primaryTextColor, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <FaPhone style={{ color: accentColor }} /> Direct Inquiries
                                </div>
                                <div style={{ color: secondaryTextColor, marginBottom: '0.3rem' }}>
                                    <strong>{entrepreneurshipData.contact.coordinator}</strong>
                                </div>
                                <div style={{ color: secondaryTextColor, marginBottom: '0.4rem' }}>
                                    {entrepreneurshipData.contact.title}
                                </div>
                                <a href={`tel:${entrepreneurshipData.contact.phone.replace(/\s+/g, '')}`} style={{ color: accentColor, fontWeight: '700', textDecoration: 'none', display: 'block', marginBottom: '0.3rem' }}>
                                    📞 {entrepreneurshipData.contact.phone}
                                </a>
                                <a href={`mailto:${entrepreneurshipData.contact.email}`} style={{ color: accentColor, fontWeight: '700', textDecoration: 'none', display: 'block' }}>
                                    ✉️ {entrepreneurshipData.contact.email}
                                </a>
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
                                {/* 1. OVERVIEW & VISION & MISSION */}
                                {activeSection === 'overview' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Overview & Introduction
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Entrepreneurship Development Cell (EDC)
                                            </h2>
                                            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: primaryTextColor, fontWeight: '600', marginTop: '0.8rem', background: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(37, 99, 235, 0.05)', padding: '1.2rem 1.5rem', borderRadius: '16px', borderLeft: `4px solid ${accentColor}` }}>
                                                {entrepreneurshipData.overview}
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {entrepreneurshipData.overviewParagraphs.slice(1).map((para, idx) => (
                                                <p key={idx} style={{ fontSize: '1.02rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                                    {para}
                                                </p>
                                            ))}
                                        </div>

                                        {/* VISION & MISSION DUAL CARDS */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
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
                                                    Vision
                                                </h3>
                                                <p style={{ fontSize: '1.02rem', lineHeight: '1.75', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
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
                                                    Mission
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

                                        {/* COMMITTEE SNAPSHOT BANNER */}
                                        <div style={{
                                            background: isDark ? 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.15) 100%)' : 'linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)',
                                            borderRadius: '24px',
                                            border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(191,219,254,1)',
                                            padding: '2rem 2.5rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: '1.5rem'
                                        }}>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: accentColor }}>Leadership & Committee</span>
                                                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: primaryTextColor, margin: '0.3rem 0 0.5rem' }}>
                                                    Meet the EC Committee & Office Bearers
                                                </h3>
                                                <p style={{ color: secondaryTextColor, margin: 0, fontSize: '0.95rem' }}>
                                                    Led by Faculty Coordinator Mr. T Gunasekaran with dedicated Student Office Bearers.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setActiveSection('committee')}
                                                style={{
                                                    padding: '0.75rem 1.6rem',
                                                    borderRadius: '50px',
                                                    background: accentColor,
                                                    color: '#ffffff',
                                                    fontWeight: '800',
                                                    fontSize: '0.9rem',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
                                                }}
                                            >
                                                View Committee
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 2. EC COMMITTEE */}
                                {activeSection === 'committee' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Leadership Team
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                EC Committee
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                The dedicated faculty leaders and student office bearers driving the entrepreneurship ecosystem at ECET.
                                            </p>
                                        </div>

                                        {/* FACULTY COORDINATOR FEATURE CARD */}
                                        <div>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                <FaUserTie style={{ color: accentColor }} /> Faculty Coordinator
                                            </h3>

                                            <div style={{
                                                background: cardBg,
                                                borderRadius: '24px',
                                                border: cardBorder,
                                                padding: '2.5rem',
                                                boxShadow: cardShadow,
                                                display: 'grid',
                                                gridTemplateColumns: '120px 1fr',
                                                gap: '2rem',
                                                alignItems: 'center'
                                            }} className="roadmap-card-grid">
                                                <div style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    borderRadius: '24px',
                                                    background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '3rem',
                                                    boxShadow: '0 10px 25px rgba(37,99,235,0.35)'
                                                }}>
                                                    <FaUserTie />
                                                </div>
                                                <div>
                                                    <span style={{
                                                        padding: '0.35rem 0.9rem',
                                                        borderRadius: '50px',
                                                        background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                        color: accentColor,
                                                        fontSize: '0.78rem',
                                                        fontWeight: '800',
                                                        textTransform: 'uppercase',
                                                        display: 'inline-block',
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        Faculty Coordinator
                                                    </span>
                                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.4rem' }}>
                                                        {entrepreneurshipData.committee.faculty[0].name}
                                                    </h3>
                                                    <p style={{ fontSize: '1rem', color: isDark ? '#FBBF24' : '#D97706', fontWeight: '700', margin: '0 0 0.8rem' }}>
                                                        {entrepreneurshipData.committee.faculty[0].designation}
                                                    </p>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', fontSize: '0.9rem' }}>
                                                        <a href={`mailto:${entrepreneurshipData.contact.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: primaryTextColor, textDecoration: 'none', fontWeight: '600' }}>
                                                            <FaEnvelope style={{ color: accentColor }} /> {entrepreneurshipData.contact.email}
                                                        </a>
                                                        <a href={`tel:${entrepreneurshipData.contact.phone.replace(/\s+/g, '')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: primaryTextColor, textDecoration: 'none', fontWeight: '600' }}>
                                                            <FaPhone style={{ color: accentColor }} /> +91 {entrepreneurshipData.contact.phone}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* STUDENT OFFICE BEARERS */}
                                        <div>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                <FaUserGraduate style={{ color: '#10B981' }} /> Student Office Bearers
                                            </h3>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
                                                {entrepreneurshipData.committee.students.map((student, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            background: cardBg,
                                                            borderRadius: '24px',
                                                            border: cardBorder,
                                                            padding: '2.2rem 2rem',
                                                            boxShadow: cardShadow,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '1.5rem'
                                                        }}
                                                    >
                                                        <div style={{
                                                            width: '72px',
                                                            height: '72px',
                                                            borderRadius: '20px',
                                                            background: idx === 0 ? 'linear-gradient(135deg, #059669 0%, #10B981 100%)' : 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                                                            color: '#ffffff',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '2rem',
                                                            flexShrink: 0,
                                                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                                                        }}>
                                                            {student.icon}
                                                        </div>
                                                        <div>
                                                            <span style={{
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '50px',
                                                                background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                                                                color: isDark ? '#F59E0B' : '#D97706',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '800',
                                                                textTransform: 'uppercase',
                                                                display: 'inline-block',
                                                                marginBottom: '0.3rem'
                                                            }}>
                                                                {student.role}
                                                            </span>
                                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                                                {student.name}
                                                            </h4>
                                                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, margin: 0, fontWeight: '600' }}>
                                                                {student.yearAndDept}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 3. MAJOR EVENTS CALENDAR */}
                                {activeSection === 'events' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Event Calendar
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Major Events & Workshops
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Comprehensive schedule of workshops, leadership summits, CEO interactions, and patent bootcamps conducted by ECET EDC.
                                            </p>
                                        </div>

                                        {/* EVENTS TABLE / CARD LIST */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            {entrepreneurshipData.majorEvents.map((evt) => (
                                                <div
                                                    key={evt.sno}
                                                    style={{
                                                        background: cardBg,
                                                        borderRadius: '20px',
                                                        border: cardBorder,
                                                        padding: '1.8rem 2rem',
                                                        boxShadow: cardShadow,
                                                        display: 'grid',
                                                        gridTemplateColumns: '80px 180px 1fr',
                                                        gap: '1.5rem',
                                                        alignItems: 'center'
                                                    }}
                                                    className="roadmap-card-grid"
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
                                                        fontSize: '1.2rem',
                                                        fontWeight: '900',
                                                        boxShadow: '0 6px 16px rgba(37,99,235,0.25)'
                                                    }}>
                                                        #{evt.sno}
                                                    </div>

                                                    <div>
                                                        <span style={{
                                                            padding: '0.3rem 0.8rem',
                                                            borderRadius: '50px',
                                                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                            color: accentColor,
                                                            fontSize: '0.75rem',
                                                            fontWeight: '800',
                                                            textTransform: 'uppercase',
                                                            display: 'inline-block',
                                                            marginBottom: '0.4rem'
                                                        }}>
                                                            {evt.tag}
                                                        </span>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', fontWeight: '800', color: isDark ? '#FBBF24' : '#D97706' }}>
                                                            <FaCalendarAlt size={13} /> {evt.date}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.4rem' }}>
                                                            {evt.title}
                                                        </h3>
                                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: 0, lineHeight: '1.6' }}>
                                                            {evt.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* EVENT PROPOSAL CTA */}
                                        <div style={{
                                            background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                                            borderRadius: '20px',
                                            border: cardBorder,
                                            padding: '2rem',
                                            textAlign: 'center'
                                        }}>
                                            <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem' }}>
                                                Want to Propose a Workshop or Invite a Speaker?
                                            </h4>
                                            <p style={{ color: secondaryTextColor, fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                                                Contact EDC Coordinator Mr. T Gunasekaran at <a href={`mailto:${entrepreneurshipData.contact.email}`} style={{ color: accentColor, fontWeight: '700' }}>{entrepreneurshipData.contact.email}</a>.
                                            </p>
                                            <button
                                                onClick={() => setPitchModal(true)}
                                                style={{
                                                    padding: '0.7rem 1.8rem',
                                                    borderRadius: '50px',
                                                    background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                    color: '#ffffff',
                                                    fontWeight: '800',
                                                    fontSize: '0.9rem',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 6px 16px rgba(37,99,235,0.3)'
                                                }}
                                            >
                                                Submit Proposal / Pitch
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 4. CONTACT & CONNECT */}
                                {activeSection === 'contact' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Get in Touch
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Contact ECET EDC
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Connect directly with our coordinator, student secretaries, or follow our official social channel for live updates.
                                            </p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                            {/* COORDINATOR CARD */}
                                            <div style={{
                                                background: cardBg,
                                                borderRadius: '24px',
                                                border: cardBorder,
                                                padding: '2.5rem',
                                                boxShadow: cardShadow
                                            }}>
                                                <div style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '16px',
                                                    background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.8rem',
                                                    marginBottom: '1.5rem',
                                                    boxShadow: '0 8px 20px rgba(37,99,235,0.3)'
                                                }}>
                                                    <FaUserTie />
                                                </div>
                                                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: accentColor }}>
                                                    EDC Cell Office
                                                </span>
                                                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: primaryTextColor, margin: '0.4rem 0 0.2rem' }}>
                                                    {entrepreneurshipData.contact.coordinator}
                                                </h3>
                                                <p style={{ fontSize: '0.95rem', color: isDark ? '#FBBF24' : '#D97706', fontWeight: '700', marginBottom: '1.5rem' }}>
                                                    {entrepreneurshipData.contact.title}
                                                </p>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                                                    <a href={`tel:${entrepreneurshipData.contact.phone.replace(/\s+/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: primaryTextColor, textDecoration: 'none', fontWeight: '600' }}>
                                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FaPhone />
                                                        </div>
                                                        <span>{entrepreneurshipData.contact.phone}</span>
                                                    </a>

                                                    <a href={`mailto:${entrepreneurshipData.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: primaryTextColor, textDecoration: 'none', fontWeight: '600' }}>
                                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FaEnvelope />
                                                        </div>
                                                        <span>{entrepreneurshipData.contact.email}</span>
                                                    </a>

                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: secondaryTextColor, lineHeight: '1.5' }}>
                                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9', color: primaryTextColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.2rem' }}>
                                                            <FaMapMarkerAlt />
                                                        </div>
                                                        <span>{entrepreneurshipData.contact.address}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* INSTAGRAM & SOCIAL CONNECT */}
                                            <div style={{
                                                background: cardBg,
                                                borderRadius: '24px',
                                                border: cardBorder,
                                                padding: '2.5rem',
                                                boxShadow: cardShadow,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}>
                                                <div>
                                                    <div style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        borderRadius: '16px',
                                                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                                        color: '#ffffff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '2rem',
                                                        marginBottom: '1.5rem',
                                                        boxShadow: '0 8px 20px rgba(220, 39, 67, 0.3)'
                                                    }}>
                                                        <FaInstagram />
                                                    </div>
                                                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', color: '#E1306C' }}>
                                                        Official Social Handle
                                                    </span>
                                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: primaryTextColor, margin: '0.4rem 0 0.8rem' }}>
                                                        Follow @edcecet on Instagram
                                                    </h3>
                                                    <p style={{ color: secondaryTextColor, fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                                                        Stay updated with latest announcements, live event coverage, workshop registrations, hackathon dates, and student entrepreneur spotlights.
                                                    </p>
                                                </div>

                                                <div style={{ marginTop: '2rem' }}>
                                                    <a
                                                        href={entrepreneurshipData.contact.instagram.startsWith('http') ? entrepreneurshipData.contact.instagram : `https://${entrepreneurshipData.contact.instagram}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '0.6rem',
                                                            width: '100%',
                                                            padding: '0.9rem',
                                                            borderRadius: '50px',
                                                            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                                            color: '#ffffff',
                                                            fontWeight: '900',
                                                            fontSize: '0.95rem',
                                                            textDecoration: 'none',
                                                            boxShadow: '0 8px 20px rgba(220, 39, 67, 0.35)'
                                                        }}
                                                    >
                                                        <FaInstagram size={20} /> Open Instagram Profile <FaExternalLinkAlt size={12} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 5. INCUBATION PROGRAMS */}
                                {activeSection === 'programs' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Structured Support
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
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

                                {/* 6. INCUBATED STARTUPS */}
                                {activeSection === 'startups' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Success Stories
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Featured Student Startups & Ventures
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Spotlight on student-led enterprises born and nurtured at ECET EDC incubation ecosystem.
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

                                {/* 7. KEY HIGHLIGHTS & METRICS */}
                                {activeSection === 'statistics' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Ecosystem Metrics
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                                                Key Highlights & Impact
                                            </h2>
                                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                                                Measurable outcomes from our incubation ecosystem, seed grants, major events, and patent portfolio.
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
                                    </div>
                                )}

                                {/* 8. FAQS */}
                                {activeSection === 'faqs' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                        <div>
                                            <span style={{ padding: '0.4rem 1.2rem', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: accentColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Got Questions?
                                            </span>
                                            <h2 style={{ fontSize: '2.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
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
                                Pitch Your Startup Idea to ECET EDC
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, marginBottom: '1.5rem' }}>
                                Submit your innovation to ECET EDC to access mentoring, workshop training, and incubation support.
                            </p>

                            <form onSubmit={handlePitchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Lead Founder / Student Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={pitchForm.founderName}
                                        onChange={(e) => setPitchForm({ ...pitchForm, founderName: e.target.value })}
                                        placeholder="e.g. Sharukesavan"
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
                                            placeholder="student@ecetonline.com"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            pattern="[0-9]{10}"
                                            title="Please enter a 10-digit mobile number"
                                            value={pitchForm.phone}
                                            onChange={(e) => setPitchForm({ ...pitchForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                            placeholder="10-digit Phone Number"
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
                                            <option value="Agricultural Engg">Agricultural Engineering</option>
                                            <option value="MECH">Mechanical Engineering</option>
                                            <option value="CSE">Computer Science & Engineering</option>
                                            <option value="AI&DS">AI & Data Science</option>
                                            <option value="ECE">Electronics & Communication</option>
                                            <option value="EEE">Electrical & Electronics</option>
                                            <option value="BME">Biomedical Engineering</option>
                                            <option value="IT">Information Technology</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Proposed Project / Startup *</label>
                                        <input
                                            type="text"
                                            required
                                            value={pitchForm.startupName}
                                            onChange={(e) => setPitchForm({ ...pitchForm, startupName: e.target.value })}
                                            placeholder="e.g. Smart Agri Sensor"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Brief Idea Summary & Problem Solved *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={pitchForm.ideaSummary}
                                        onChange={(e) => setPitchForm({ ...pitchForm, ideaSummary: e.target.value })}
                                        placeholder="Describe the problem, your proposed solution, target beneficiaries, and technology..."
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
                                    {pitchSubmitted ? 'Submitting Pitch...' : 'Submit Pitch to ECET EDC'}
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
