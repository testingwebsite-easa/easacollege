import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import {
    FaUniversity, FaFilePdf, FaDownload, FaBuilding, FaGraduationCap,
    FaUsers, FaShieldAlt, FaBook, FaLaptopCode, FaBalanceScale,
    FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaSearch,
    FaAward, FaCalendarAlt, FaFileAlt, FaExternalLinkAlt, FaTimes,
    FaInfoCircle, FaMicrochip, FaLeaf, FaHandsHelping, FaLightbulb,
    FaChevronRight
} from 'react-icons/fa';

const MandatoryDisclosurePage = () => {
    const { theme } = useTheme();
    const { showToast } = useToast();
    const isDark = theme !== 'light';
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Color Palette Tokens
    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.35)' : '0 12px 35px rgba(0,0,0,0.06)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#cbd5e1' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';
    const goldAccent = isDark ? '#F8D53D' : '#D97706';

    // Tabs Definition
    const tabs = [
        { id: 'profile', label: '1. Institution Profile', icon: <FaUniversity /> },
        { id: 'governance', label: '2. Governance & Leadership', icon: <FaBuilding /> },
        { id: 'programs', label: '3. Approved Programs & Intake', icon: <FaGraduationCap /> },
        { id: 'faculty', label: '4. Faculty & Academic Staff', icon: <FaUsers /> },
        { id: 'infrastructure', label: '5. Campus Infrastructure', icon: <FaLaptopCode /> },
        { id: 'committees', label: '6. Statutory Committees', icon: <FaBalanceScale /> },
        { id: 'admissions', label: '7. Admissions & Fee Norms', icon: <FaAward /> },
        { id: 'downloads', label: '8. Official Documents & EOA', icon: <FaFilePdf /> }
    ];

    // Quick Facts / Key Statutory Identifiers
    const statutoryIdentifiers = [
        { label: 'AICTE Permanent Institute ID', value: '1-3855581', badge: 'AICTE New Delhi' },
        { label: 'Anna University Counseling Code', value: '2763', badge: 'TNEA Counseling' },
        { label: 'AISHE Institutional Code', value: 'C-26915', badge: 'MoE, Govt. of India' },
        { label: 'Accreditation & Quality Status', value: "NAAC 'A' Grade Accredited", badge: 'UGC NAAC' },
        { label: 'Autonomous Status', value: 'Conferred by UGC & Anna University', badge: 'Autonomous System' },
        { label: 'Linguistic Minority Status', value: 'Malayalam Linguistic Minority', badge: 'Govt. of Tamil Nadu' },
        { label: 'Year of Establishment', value: '2008', badge: '18+ Years Excellence' },
        { label: 'Approved Campus Area', value: '25.02 Acres (1,01,250 Sq.m)', badge: 'Single Contiguous Plot' }
    ];

    // Approved Programs Data (AICTE Sanctioned Intake)
    const approvedPrograms = [
        { id: 1, level: 'UG (B.E.)', program: 'Computer Science and Engineering', intake2026: 180, intake2025: 180, intake2024: 120, duration: '4 Years', yearStarted: 2008, accreditation: 'Accredited by NAAC / AICTE Approved' },
        { id: 2, level: 'UG (B.Tech)', program: 'Artificial Intelligence and Data Science', intake2026: 120, intake2025: 120, intake2024: 60, duration: '4 Years', yearStarted: 2021, accreditation: 'AICTE Approved & Affiliated' },
        { id: 3, level: 'UG (B.Tech)', program: 'Information Technology', intake2026: 60, intake2025: 60, intake2024: 60, duration: '4 Years', yearStarted: 2022, accreditation: 'AICTE Approved & Affiliated' },
        { id: 4, level: 'UG (B.E.)', program: 'Electronics and Communication Engineering', intake2026: 60, intake2025: 60, intake2024: 60, duration: '4 Years', yearStarted: 2008, accreditation: 'Accredited by NAAC / AICTE Approved' },
        { id: 5, level: 'UG (B.E.)', program: 'Electrical and Electronics Engineering', intake2026: 60, intake2025: 60, intake2024: 60, duration: '4 Years', yearStarted: 2008, accreditation: 'Accredited by NAAC / AICTE Approved' },
        { id: 6, level: 'UG (B.E.)', program: 'Mechanical Engineering', intake2026: 60, intake2025: 60, intake2024: 60, duration: '4 Years', yearStarted: 2008, accreditation: 'Accredited by NAAC / AICTE Approved' },
        { id: 7, level: 'UG (B.E.)', program: 'Agricultural Engineering', intake2026: 60, intake2025: 60, intake2024: 60, duration: '4 Years', yearStarted: 2017, accreditation: 'AICTE Approved & Affiliated' },
        { id: 8, level: 'UG (B.E.)', program: 'Biomedical Engineering', intake2026: 60, intake2025: 60, intake2024: 60, duration: '4 Years', yearStarted: 2018, accreditation: 'AICTE Approved & Affiliated' },
        { id: 9, level: 'UG (B.E.)', program: 'Civil Engineering', intake2026: 30, intake2025: 30, intake2024: 30, duration: '4 Years', yearStarted: 2010, accreditation: 'Accredited by NAAC / AICTE Approved' },
        { id: 10, level: 'PG (M.E.)', program: 'Computer Science and Engineering', intake2026: 18, intake2025: 18, intake2024: 18, duration: '2 Years', yearStarted: 2012, accreditation: 'AICTE Approved & Affiliated' },
        { id: 11, level: 'PG (M.E.)', program: 'Structural Engineering', intake2026: 18, intake2025: 18, intake2024: 18, duration: '2 Years', yearStarted: 2014, accreditation: 'AICTE Approved & Affiliated' },
        { id: 12, level: 'PG (MBA)', program: 'Master of Business Administration', intake2026: 60, intake2025: 60, intake2024: 60, duration: '2 Years', yearStarted: 2009, accreditation: 'AICTE Approved & Affiliated' }
    ];

    // Statutory Committees Data
    const statutoryCommittees = [
        {
            name: 'Anti-Ragging Committee & Squad',
            mandate: 'Strict zero-tolerance policy against any form of ragging on and off campus as per Supreme Court & UGC/AICTE regulations.',
            head: 'Principal / Chairperson (Dr. Z. Robert Kennedy)',
            helpline: '+91 73737 32569 / Toll-free 1800-180-5522',
            email: 'antiragging@ecetonline.com',
            membersCount: '15 Members (Faculty, Police, Revenue Officer, Media, NGO, Parents, Students)',
            status: 'Active & Displayed on All Notice Boards'
        },
        {
            name: 'Internal Complaints Committee (ICC) / POSH Cell',
            mandate: 'Prevention, Prohibition and Redressal of Sexual Harassment of Women Employees and Students as per Act 2013.',
            head: 'Presiding Officer (Senior Woman Faculty)',
            helpline: '+91 93426 28013',
            email: 'icc@ecetonline.com',
            membersCount: '7 Members (50% Women representation + External Legal/NGO Expert)',
            status: 'Statutory Body Constituted'
        },
        {
            name: 'Grievance Redressal Committee (Students & Staff)',
            mandate: 'Mechanism for transparent and timely redressal of individual/collective grievances concerning admissions, evaluation, or facilities.',
            head: 'Chairperson & Ombudsman (Nominated by Anna University)',
            helpline: '+91 73737 32569',
            email: 'grievance@ecetonline.com',
            membersCount: '9 Senior Faculty Members & Student Representatives',
            status: 'Online Portal & Suggestion Box Active'
        },
        {
            name: 'SC / ST Committee & Equal Opportunity Cell',
            mandate: 'Monitoring social welfare policies, scholarship disbursements, equal opportunity implementation, and preventing discrimination.',
            head: 'Coordinator - Senior Faculty',
            helpline: '+91 73737 32569',
            email: 'scstcell@ecetonline.com',
            membersCount: '6 Members (SC/ST Faculty & Student Representatives)',
            status: 'Periodic Review & Guidance Active'
        },
        {
            name: 'Internal Quality Assurance Cell (IQAC)',
            mandate: 'Developing comprehensive quality benchmarks, academic auditing, outcome attainment evaluations, and continuous improvement.',
            head: 'Director - IQAC / Principal',
            helpline: '+91 73737 32569',
            email: 'iqac@ecetonline.com',
            membersCount: '18 Members (Management, Deans, Industry Stakeholders, Alumni)',
            status: 'Quarterly AQAR & Academic Audits'
        },
        {
            name: 'Institution-Industry Cell & Placement Advisory',
            mandate: 'Facilitating MoU partnerships, industrial internships, CSR skilling, and corporate campus placement drives.',
            head: 'Dean - Corporate Relations & Placements',
            helpline: '+91 73737 32569',
            email: 'placements@ecetonline.com',
            membersCount: '12 Faculty Placement Coordinators & HR Mentors',
            status: 'Active (100+ Hiring Partners)'
        }
    ];

    // Infrastructure Summary Data
    const infrastructureData = [
        { icon: <FaLaptopCode />, title: 'High-Performance Computing', stat: '1,000+ PCs', desc: 'Intel Core i7/i5 workstations, GPU AI clusters, 1 Gbps dedicated leased-line optical fiber internet.' },
        { icon: <FaBook />, title: 'Central Digital Library', stat: '35,000+ Books', desc: '8,500+ titles, IEEE Xplore, DELNET, ScienceDirect, NDLI Club e-access, 150+ national/international journals.' },
        { icon: <FaMicrochip />, title: 'AICTE IDEA Lab & CoE', stat: '₹1.5+ Cr Hub', desc: 'Advanced 3D printers, CNC PCB milling, Laser cutters, IoT testing benches, and robotics prototyping.' },
        { icon: <FaBuilding />, title: 'Smart Classrooms', stat: '45+ Digital Theatres', desc: 'Acoustically treated lecture halls equipped with interactive smart boards, lecture capture, and ergonomic seating.' },
        { icon: <FaLeaf />, title: 'Green Energy & Solar Power', stat: '250 kW Rooftop', desc: '100% clean solar generation, rainwater harvesting reservoirs (10 Lakh Ltrs), sewage treatment plant (STP).' },
        { icon: <FaHandsHelping />, title: 'Residential & Sports Life', stat: '1000+ Capacity', desc: 'Separate AC/Non-AC hostels for boys and girls, hygienic food court, synthetic track, cricket ground, gym.' }
    ];

    // Official Downloads Archive
    const officialDownloads = [
        { title: "Official AICTE Mandatory Disclosure (Consolidated 2025-26)", type: "PDF Document", size: "4.8 MB", date: "Academic Year 2025 - 2026", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/mandatory-disclosure/Mandatory_Disclosure_2025_2026.pdf", badge: "Primary Compliance Document" },
        { title: "AICTE Extension of Approval (EOA) 2025 - 2026", type: "Approval Letter", size: "1.2 MB", date: "April 2025", link: "/aicte-eoa", badge: "AICTE New Delhi" },
        { title: "AICTE Extension of Approval (EOA) 2024 - 2025", type: "Approval Letter", size: "1.1 MB", date: "May 2024", link: "/aicte-eoa", badge: "AICTE New Delhi" },
        { title: "AICTE Extension of Approval (EOA) 2023 - 2024", type: "Approval Letter", size: "1.1 MB", date: "June 2023", link: "/aicte-eoa", badge: "AICTE New Delhi" },
        { title: "Anna University Affiliation Order (Current Academic Year)", type: "Affiliation Certificate", size: "2.3 MB", date: "Anna University Chennai", link: "/resources/regulations", badge: "Affiliating University" },
        { title: "Autonomous Conferment Order (UGC & Anna University)", type: "Conferment Order", size: "1.8 MB", date: "UGC New Delhi", link: "/resources/regulations", badge: "UGC Autonomous" },
        { title: "NAAC 'A' Grade Institutional Accreditation Certificate", type: "Accreditation Letter", size: "1.4 MB", date: "NAAC Bengaluru", link: "/naac", badge: "NAAC Accredited" },
        { title: "Building Safety & Fire Fighting NOC Certificate", type: "Statutory Certificate", size: "950 KB", date: "Fire & Rescue Services", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/mandatory-disclosure/Fire_Safety_NOC.pdf", badge: "Govt. of Tamil Nadu" },
        { title: "Land Ownership & Contiguity Certificate (25+ Acres)", type: "Revenue Certificate", size: "1.5 MB", date: "District Revenue Dept", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/mandatory-disclosure/Land_Certificate.pdf", badge: "Revenue Authority" }
    ];

    // Filtered Programs for Search
    const filteredPrograms = useMemo(() => {
        if (!searchQuery.trim()) return approvedPrograms;
        const q = searchQuery.toLowerCase();
        return approvedPrograms.filter(p =>
            p.program.toLowerCase().includes(q) ||
            p.level.toLowerCase().includes(q) ||
            p.accreditation.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="AICTE Mandatory Disclosure | EASA College of Engineering & Technology"
                description="Official AICTE Mandatory Disclosure for EASA College of Engineering and Technology, Coimbatore. Comprehensive statutory data on approved programs, sanctioned intake, governance, faculty, infrastructure, and statutory committees."
                keywords="Mandatory Disclosure, AICTE Mandatory Disclosure Coimbatore, EASA College AICTE, Anna University 2763, Sanctioned Intake, Anti Ragging Committee, EOA Reports, Autonomous Engineering College"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="mandatory-disclosure"
                defaultTitle="Mandatory Disclosure"
                defaultSubtitle="Official Statutory Information Published under AICTE Regulations, UGC Norms & Anna University Guidelines"
                defaultImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=2070&auto=format&fit=crop"
            />

            {/* MAIN CONTAINER */}
            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

                {/* TOP COMPLIANCE STRIP & ACTION BAR */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
                            : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                        borderRadius: '24px',
                        padding: '1.8rem 2.2rem',
                        border: cardBorder,
                        boxShadow: cardShadow,
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)',
                            flexShrink: 0
                        }}>
                            <FaShieldAlt />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.2rem 0.65rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    ● Live & Verified Status
                                </span>
                                <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'rgba(230, 182, 39, 0.15)', color: goldAccent, padding: '0.2rem 0.65rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    AICTE Permanent ID: 1-3855581
                                </span>
                            </div>
                            <h1 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: '900', color: primaryTextColor, marginTop: '4px', margin: 0 }}>
                                Statutory Mandatory Disclosure (Format as per AICTE Norms)
                            </h1>
                        </div>
                    </div>
                </motion.div>

                {/* KEY STATUTORY IDENTIFIERS GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {statutoryIdentifiers.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            style={{
                                background: cardBg,
                                borderRadius: '20px',
                                padding: '1.5rem 1.8rem',
                                border: cardBorder,
                                boxShadow: cardShadow,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #38BDF8, #2563EB)' }} />
                            <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {item.badge}
                                </span>
                                <div style={{ fontSize: '0.88rem', color: secondaryTextColor, marginTop: '4px', fontWeight: '600' }}>
                                    {item.label}
                                </div>
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, marginTop: '1rem', letterSpacing: '-0.3px' }}>
                                {item.value}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* INTERACTIVE NAVIGATION TABS */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    alignItems: 'center'
                }}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.9rem 1.6rem',
                                    borderRadius: '16px',
                                    fontSize: '0.92rem',
                                    fontWeight: '800',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    border: isActive
                                        ? '1px solid #38BDF8'
                                        : isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.9)',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)'
                                        : cardBg,
                                    color: isActive ? '#ffffff' : secondaryTextColor,
                                    boxShadow: isActive ? '0 10px 25px rgba(37, 99, 235, 0.35)' : 'none',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <span style={{ fontSize: '1rem', color: isActive ? '#ffffff' : accentColor }}>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* TAB CONTENT PANELS */}
                <AnimatePresence mode="wait">
                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            {/* Institutional Details Table */}
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaUniversity />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            1. Institutional Identity & Contact Details
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            Mandatory details disclosed as per AICTE Approval Process Handbook (Section 1).
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '800', textTransform: 'uppercase' }}>Name of the Institution</div>
                                        <div style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>
                                            EASA College of Engineering and Technology
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: secondaryTextColor, marginTop: '6px' }}>
                                            (Autonomous Institution, NAAC 'A' Grade Accredited)
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '800', textTransform: 'uppercase' }}>Complete Address & Location</div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: '700', color: primaryTextColor, marginTop: '4px' }}>
                                            NH-47, Palakkad Main Road, Navakkarai (Post), Coimbatore - 641105, Tamil Nadu, India.
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '800', textTransform: 'uppercase' }}>Name of the Sponsoring Trust</div>
                                        <div style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>
                                            EASA Educational and Charitable Trust
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: secondaryTextColor, marginTop: '6px' }}>
                                            Registered under the Indian Trusts Act (Reg No: 334/2006)
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '800', textTransform: 'uppercase' }}>Name of the Principal / Head of Institution</div>
                                        <div style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>
                                            Dr. Z. Robert Kennedy, M.E., Ph.D.
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: secondaryTextColor, marginTop: '6px' }}>
                                            Principal & Professor | Approved by Anna University & AICTE
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '800', textTransform: 'uppercase' }}>Official Communications</div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: '700', color: primaryTextColor, marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span>📞 Phone: +91 73737 32569 / +91 93426 28013</span>
                                            <span>✉️ Email: info@ecetonline.com / principal@ecetonline.com</span>
                                            <span>🌐 Website: https://www.easacollege.com</span>
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.8rem', color: accentColor, fontWeight: '800', textTransform: 'uppercase' }}>Affiliating University & Approving Body</div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>
                                            Anna University, Chennai - 600025
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: secondaryTextColor, marginTop: '4px' }}>
                                            All India Council for Technical Education (AICTE), Southern Regional Office, Chennai.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'governance' && (
                        <motion.div
                            key="governance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaBuilding />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            2. Governance & Administrative Framework
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            Composition of the Governing Body and Autonomous Statutory Councils.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div style={{ padding: '1.8rem', borderRadius: '20px', background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: goldAccent, marginBottom: '0.8rem' }}>
                                            🏛️ Governing Body (Board of Governors)
                                        </h3>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.7' }}>
                                            Meets twice a year to review institutional growth, budget allocation, academic infrastructure, regulatory compliance, and strategic vision under UGC Autonomous guidelines.
                                        </p>
                                        <Link to="/governing-bodies" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: accentColor, fontWeight: '800', fontSize: '0.88rem', textDecoration: 'none', marginTop: '1rem' }}>
                                            View Full Governing Body Details <FaChevronRight size={10} />
                                        </Link>
                                    </div>

                                    <div style={{ padding: '1.8rem', borderRadius: '20px', background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: accentColor, marginBottom: '0.8rem' }}>
                                            🎓 Academic Council
                                        </h3>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.7' }}>
                                            Highest academic body responsible for validating regulations, curricula, course syllabi, examination standards, and program admissions submitted by Department Boards of Studies.
                                        </p>
                                        <Link to="/academic-council" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: accentColor, fontWeight: '800', fontSize: '0.88rem', textDecoration: 'none', marginTop: '1rem' }}>
                                            View Academic Council Members <FaChevronRight size={10} />
                                        </Link>
                                    </div>

                                    <div style={{ padding: '1.8rem', borderRadius: '20px', background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#22c55e', marginBottom: '0.8rem' }}>
                                            🔬 Board of Studies (BoS)
                                        </h3>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.7' }}>
                                            Constituted for every engineering discipline with Anna University nominees, subject matter experts, industry representatives, and alumni to formulate outcome-based courses.
                                        </p>
                                        <Link to="/bos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: accentColor, fontWeight: '800', fontSize: '0.88rem', textDecoration: 'none', marginTop: '1rem' }}>
                                            View Department BoS Minutes <FaChevronRight size={10} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'programs' && (
                        <motion.div
                            key="programs"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            3. Approved Academic Programs & Sanctioned Intake
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '4px 0 0 0' }}>
                                            Details of UG Engineering, PG Engineering, and Management Programs approved by AICTE New Delhi.
                                        </p>
                                    </div>

                                    {/* Search input */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '14px',
                                        border: '1px solid var(--glass-border)',
                                        width: '100%',
                                        maxWidth: '320px'
                                    }}>
                                        <FaSearch style={{ color: secondaryTextColor }} />
                                        <input
                                            type="text"
                                            placeholder="Search program or level..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                outline: 'none',
                                                color: primaryTextColor,
                                                fontSize: '0.9rem',
                                                width: '100%'
                                            }}
                                        />
                                        {searchQuery && (
                                            <FaTimes style={{ cursor: 'pointer', color: secondaryTextColor }} onClick={() => setSearchQuery('')} />
                                        )}
                                    </div>
                                </div>

                                <div style={{ borderRadius: '18px', overflow: 'hidden', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.9)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff' }}>
                                                <th style={{ padding: '1.2rem 1.5rem', width: '70px', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem' }}>S.No</th>
                                                <th style={{ padding: '1.2rem 1.5rem', fontWeight: '900', fontSize: '0.9rem' }}>Level & Degree</th>
                                                <th style={{ padding: '1.2rem 1.5rem', fontWeight: '900', fontSize: '0.9rem' }}>Approved Course Name</th>
                                                <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem' }}>Intake (2026-27)</th>
                                                <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem' }}>Intake (2025-26)</th>
                                                <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem' }}>Duration</th>
                                                <th style={{ padding: '1.2rem 1.5rem', fontWeight: '900', fontSize: '0.9rem' }}>Accreditation Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPrograms.map((row, idx) => (
                                                <tr
                                                    key={row.id}
                                                    style={{
                                                        borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                                                        background: idx % 2 === 0 ? 'transparent' : (isDark ? 'rgba(255,255,255,0.02)' : '#FAFAFA')
                                                    }}
                                                >
                                                    <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', fontWeight: '800', color: accentColor }}>
                                                        {idx + 1}
                                                    </td>
                                                    <td style={{ padding: '1.1rem 1.5rem', fontWeight: '800', color: primaryTextColor }}>
                                                        <span style={{ padding: '0.25rem 0.65rem', borderRadius: '8px', background: row.level.startsWith('UG') ? 'rgba(56, 189, 248, 0.12)' : 'rgba(245, 158, 11, 0.12)', color: row.level.startsWith('UG') ? accentColor : goldAccent, fontSize: '0.82rem' }}>
                                                            {row.level}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1.1rem 1.5rem', fontWeight: '700', color: primaryTextColor }}>
                                                        {row.program}
                                                    </td>
                                                    <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', fontWeight: '900', color: '#22c55e', fontSize: '1.05rem' }}>
                                                        {row.intake2026}
                                                    </td>
                                                    <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', fontWeight: '700', color: secondaryTextColor }}>
                                                        {row.intake2025}
                                                    </td>
                                                    <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', fontWeight: '600', color: secondaryTextColor }}>
                                                        {row.duration}
                                                    </td>
                                                    <td style={{ padding: '1.1rem 1.5rem', fontWeight: '600', color: secondaryTextColor, fontSize: '0.88rem' }}>
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                                            <FaCheckCircle style={{ color: '#22c55e', flexShrink: 0 }} />
                                                            {row.accreditation}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'faculty' && (
                        <motion.div
                            key="faculty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaUsers />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            4. Faculty Strength, Cadre Ratio & Academic Credentials
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            Committed to AICTE prescribed faculty-student cadre ratio of 1:15 / 1:20 with qualified doctoral scholars.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.4rem', fontWeight: '900', color: accentColor }}>185+</div>
                                        <div style={{ fontSize: '0.92rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>Full-Time Faculty</div>
                                        <div style={{ fontSize: '0.8rem', color: secondaryTextColor }}>Across all engineering & science branches</div>
                                    </div>
                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.4rem', fontWeight: '900', color: goldAccent }}>55+</div>
                                        <div style={{ fontSize: '0.92rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>Ph.D. Qualified Professors</div>
                                        <div style={{ fontSize: '0.8rem', color: secondaryTextColor }}>75+ pursuing doctoral research</div>
                                    </div>
                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#22c55e' }}>1 : 15</div>
                                        <div style={{ fontSize: '0.92rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>Faculty-to-Student Ratio</div>
                                        <div style={{ fontSize: '0.8rem', color: secondaryTextColor }}>Compliant with AICTE & NBA guidelines</div>
                                    </div>
                                    <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#ec4899' }}>94%</div>
                                        <div style={{ fontSize: '0.92rem', fontWeight: '800', color: primaryTextColor, marginTop: '4px' }}>Faculty Retention Rate</div>
                                        <div style={{ fontSize: '0.8rem', color: secondaryTextColor }}>Promoting sustained academic mentorship</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'infrastructure' && (
                        <motion.div
                            key="infrastructure"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaLaptopCode />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            5. Campus Infrastructure, Laboratories & Green Facilities
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            25+ Acres modern contiguous campus equipped with state-of-the-art technological ecosystem.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                    {infrastructureData.map((item, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '1.8rem',
                                                borderRadius: '20px',
                                                background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC',
                                                border: '1px solid var(--glass-border)',
                                                display: 'flex',
                                                gap: '1.2rem',
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '14px',
                                                background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                color: '#ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.3rem',
                                                flexShrink: 0
                                            }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: accentColor, textTransform: 'uppercase' }}>
                                                    {item.stat}
                                                </span>
                                                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginTop: '2px', marginBottom: '6px' }}>
                                                    {item.title}
                                                </h3>
                                                <p style={{ fontSize: '0.88rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'committees' && (
                        <motion.div
                            key="committees"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaBalanceScale />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            6. Statutory Student Protection & Redressal Committees
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            Mandatory compliance committees as stipulated by Supreme Court, UGC, AICTE, and State Government.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.8rem' }}>
                                    {statutoryCommittees.map((comm, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '2rem',
                                                borderRadius: '24px',
                                                background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC',
                                                border: '1px solid var(--glass-border)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                gap: '1.2rem'
                                            }}
                                        >
                                            <div>
                                                <span style={{ fontSize: '0.78rem', fontWeight: '800', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '0.2rem 0.65rem', borderRadius: '12px' }}>
                                                    {comm.status}
                                                </span>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginTop: '8px', marginBottom: '8px' }}>
                                                    {comm.name}
                                                </h3>
                                                <p style={{ fontSize: '0.9rem', color: secondaryTextColor, lineHeight: '1.65' }}>
                                                    {comm.mandate}
                                                </p>
                                            </div>

                                            <div style={{ padding: '1rem', borderRadius: '14px', background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid var(--glass-border)', fontSize: '0.88rem' }}>
                                                <div style={{ color: primaryTextColor, fontWeight: '700' }}>👤 Head: {comm.head}</div>
                                                <div style={{ color: secondaryTextColor, marginTop: '4px' }}>👥 Composition: {comm.membersCount}</div>
                                                <div style={{ color: accentColor, fontWeight: '800', marginTop: '6px' }}>📞 Helpline: {comm.helpline}</div>
                                                <div style={{ color: secondaryTextColor, marginTop: '2px' }}>✉️ Email: {comm.email}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'admissions' && (
                        <motion.div
                            key="admissions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaAward />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            7. Admission Process, Fee Structure & Financial Scholarships
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            Transparent, merit-based admission guidelines compliant with Government of Tamil Nadu and AICTE.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                    <div style={{ padding: '1.8rem', borderRadius: '20px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: accentColor, marginBottom: '0.8rem' }}>
                                            🏛️ Government Quota Seats (TNEA Single Window)
                                        </h3>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.7' }}>
                                            65% of approved UG seats are filled through Tamil Nadu Engineering Admissions (TNEA) single-window counseling conducted by the Directorate of Technical Education (DoTE) / Anna University based on Class 12 PCM cut-off marks.
                                        </p>
                                        <div style={{ marginTop: '1rem', fontWeight: '800', color: goldAccent }}>TNEA Counseling Code: 2763</div>
                                    </div>

                                    <div style={{ padding: '1.8rem', borderRadius: '20px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#22c55e', marginBottom: '0.8rem' }}>
                                            🌐 Management / Linguistic Minority Quota
                                        </h3>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.7' }}>
                                            35% of seats are admitted directly through institutional merit & entrance test counseling, extending preference to Malayalam linguistic minority applicants and meritorious national candidates.
                                        </p>
                                        <div style={{ marginTop: '1rem', fontWeight: '800', color: accentColor }}>Direct Contact: +91 73737 32569</div>
                                    </div>

                                    <div style={{ padding: '1.8rem', borderRadius: '20px', background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: goldAccent, marginBottom: '0.8rem' }}>
                                            💰 Fee Norms & Government Scholarships
                                        </h3>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.7' }}>
                                            Tuition fees strictly adhere to the limits fixed by the Government Fee Fixation Committee. 100% assistance is facilitated for First Graduate tuition waivers, SC/ST Post-Matric, PMSS, and institutional merit scholarships.
                                        </p>
                                        <Link to="/scholarships" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: accentColor, fontWeight: '800', fontSize: '0.88rem', textDecoration: 'none', marginTop: '1rem' }}>
                                            Explore Full Scholarship Schemes <FaChevronRight size={10} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'downloads' && (
                        <motion.div
                            key="downloads"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                        >
                            <div style={{ background: cardBg, borderRadius: '28px', padding: '2.5rem', border: cardBorder, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                        <FaFilePdf />
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                            8. Official Statutory Approvals & Document Repository
                                        </h2>
                                        <p style={{ fontSize: '0.92rem', color: secondaryTextColor, margin: '2px 0 0 0' }}>
                                            Download authentic regulatory documents, AICTE approval letters, and accreditation certificates.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
                                    {officialDownloads.map((doc, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '1.8rem',
                                                borderRadius: '20px',
                                                background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC',
                                                border: '1px solid var(--glass-border)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                gap: '1.2rem',
                                                transition: '0.2s'
                                            }}
                                        >
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '0.78rem', fontWeight: '800', background: 'rgba(56, 189, 248, 0.12)', color: accentColor, padding: '0.2rem 0.65rem', borderRadius: '12px' }}>
                                                        {doc.badge}
                                                    </span>
                                                    <span style={{ fontSize: '0.8rem', color: secondaryTextColor, fontWeight: '600' }}>
                                                        {doc.size}
                                                    </span>
                                                </div>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: primaryTextColor, lineHeight: '1.4' }}>
                                                    {doc.title}
                                                </h3>
                                                <div style={{ fontSize: '0.85rem', color: secondaryTextColor, marginTop: '4px' }}>
                                                    📅 {doc.date}
                                                </div>
                                            </div>

                                            {doc.link.startsWith('/') ? (
                                                <Link to={doc.link} style={{ textDecoration: 'none' }}>
                                                    <button
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            borderRadius: '12px',
                                                            border: 'none',
                                                            background: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
                                                            color: primaryTextColor,
                                                            fontWeight: '800',
                                                            fontSize: '0.9rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '8px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <span>View Repository Section</span>
                                                        <FaChevronRight size={10} />
                                                    </button>
                                                </Link>
                                            ) : (
                                                <a href={doc.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                                    <button
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            borderRadius: '12px',
                                                            border: 'none',
                                                            background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                                            color: '#ffffff',
                                                            fontWeight: '800',
                                                            fontSize: '0.9rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '8px',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)'
                                                        }}
                                                    >
                                                        <FaDownload size={13} />
                                                        <span>Download Document</span>
                                                    </button>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOTTOM STATUTORY CONTACT & NODAL OFFICER CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, #1B2A6B 0%, #0F172A 100%)',
                        borderRadius: '32px',
                        padding: '3.5rem',
                        border: '1px solid rgba(255,255,255,0.12)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                        color: '#ffffff',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '3rem',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: 'rgba(230, 182, 39, 0.25)',
                            color: '#F8D53D',
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            Statutory Nodal Office & Verification
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: '900', color: '#ffffff', lineHeight: '1.3', marginBottom: '1rem' }}>
                            Need Assistance with Approvals or Verification?
                        </h2>
                        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            For academic authentications, RTI queries, university equivalency, or statutory regulatory inquiries, our administrative office is at your disposal.
                        </p>
                        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                            <a
                                href="tel:+917373732569"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '1rem 2rem',
                                    background: '#F8D53D',
                                    color: '#0F172A',
                                    borderRadius: '16px',
                                    fontWeight: '900',
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 10px 25px rgba(248, 213, 61, 0.3)'
                                }}
                            >
                                <FaPhoneAlt /> Call +91 73737 32569
                            </a>
                            <a
                                href="mailto:info@ecetonline.com"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '1rem 2rem',
                                    background: 'rgba(255,255,255,0.12)',
                                    color: '#ffffff',
                                    borderRadius: '16px',
                                    fontWeight: '800',
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <FaEnvelope /> Email Nodal Desk
                            </a>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#F8D53D', marginBottom: '1.2rem' }}>
                            Institutional Location
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: '#e2e8f0' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <FaMapMarkerAlt style={{ color: '#38BDF8', marginTop: '4px', flexShrink: 0 }} />
                                <span>EASA College of Engineering and Technology, NH-47, Palakkad Main Road, Navakkarai, Coimbatore - 641105, Tamil Nadu.</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <FaPhoneAlt style={{ color: '#38BDF8', flexShrink: 0 }} />
                                <span>Admissions & General: +91 73737 32569 / +91 93426 28013</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <FaEnvelope style={{ color: '#38BDF8', flexShrink: 0 }} />
                                <span>info@ecetonline.com / principal@ecetonline.com</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default MandatoryDisclosurePage;
