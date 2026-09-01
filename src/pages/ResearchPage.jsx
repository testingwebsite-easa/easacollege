import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import missionBg from '../assets/mission-bg.webp';
import GlobalHero from '../components/GlobalHero';
import { useTheme } from '../context/ThemeContext';
import {
    FaLightbulb,
    FaRocket,
    FaUserTie,
    FaBookOpen,
    FaFileContract,
    FaScaleBalanced,
    FaHandshake,
    FaDollarSign,
    FaMagnifyingGlass,
    FaCircleCheck,
    FaArrowRight,
    FaQuoteLeft,
    FaMicroscope,
    FaCertificate,
    FaGraduationCap,
    FaShieldHalved,
    FaAward
} from 'react-icons/fa6';

const ResearchPage = () => {
    useScrollAnimation();
    const { theme } = useTheme();
    const isDark = theme !== 'light';

    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activePillar, setActivePillar] = useState(null);

    // R&D Committee Members 2026-2027
    const committeeMembers = [
        {
            sno: 1,
            name: 'Dr. M. Sivakumar',
            designation: 'Dean Research & Development',
            department: 'Research & Development (R&D)',
            isLead: true
        },
        {
            sno: 2,
            name: 'Dr. S. Santhiya',
            designation: 'Research Coordinator',
            department: 'Research & Development (R&D)',
            isLead: true
        },
        {
            sno: 3,
            name: 'Mrs. Gopika',
            designation: 'Committee Member',
            department: 'Artificial Intelligence & Data Science (AI&DS) & Computer Science & Engineering (CSE)'
        },
        {
            sno: 4,
            name: 'Mr. Hari Balaji',
            designation: 'Committee Member',
            department: 'Mechanical Engineering (MECH)'
        },
        {
            sno: 5,
            name: 'Mr. Ayyappan',
            designation: 'Committee Member',
            department: 'Electronics & Communication Engineering (ECE) & Electrical & Electronics Engineering (EEE)'
        },
        {
            sno: 6,
            name: 'Mr. Govendhan',
            designation: 'Committee Member',
            department: 'Agriculture'
        },
        {
            sno: 7,
            name: 'Mrs. S. Subha',
            designation: 'Committee Member',
            department: 'Biomedical Engineering (BME)'
        },
        {
            sno: 8,
            name: 'Dr. Senoj',
            designation: 'Committee Member',
            department: 'Information Technology (IT)'
        },
        {
            sno: 9,
            name: 'Dr. Sasikala',
            designation: 'Committee Member',
            department: 'Cyber Security'
        }
    ];

    // Filter members based on search input
    const filteredMembers = committeeMembers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Organizational Structure Pillars
    const orgPillars = [
        {
            id: 'finance',
            title: 'Finance & Infrastructure',
            color: '#E74C3C',
            bgGradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)',
            icon: FaDollarSign,
            description: 'Manages research grants, institutional funding allocation, laboratory infrastructure development, state-of-the-art equipment acquisition, and financial auditing of research activities.'
        },
        {
            id: 'policy',
            title: 'Research Program Policy & Development',
            color: '#F39C12',
            bgGradient: 'linear-gradient(135deg, #FECA57 0%, #FF9F43 100%)',
            icon: FaBookOpen,
            description: 'Formulates academic research guidelines, oversees PhD & Master’s research projects, incentivizes paper publications, and evaluates research performance metrics across departments.'
        },
        {
            id: 'collaboration',
            title: 'Collaboration & Consultancy',
            color: '#2ECC71',
            bgGradient: 'linear-gradient(135deg, #1DD1A1 0%, #10AC84 100%)',
            icon: FaHandshake,
            description: 'Establishes MoUs with leading industries, universities, and research laboratories worldwide. Coordinates consultancy services, industry-sponsored projects, and technology transfer.'
        },
        {
            id: 'ipr',
            title: 'IPR Legal and Ethical Matters',
            color: '#3498DB',
            bgGradient: 'linear-gradient(135deg, #48DBFB 0%, #0ABDE3 100%)',
            icon: FaScaleBalanced,
            description: 'Guides researchers through patent drafting, copyright filing, trademark protection, and ensures strict compliance with research ethics, plagiarism standards, and advisory board oversight.'
        }
    ];

    // Department Badge Color Mapping
    const getDeptBadgeStyle = (dept) => {
        if (dept.includes('R&D')) return { bg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('AI&DS') || dept.includes('CSE')) return { bg: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('MECH')) return { bg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('ECE') || dept.includes('EEE')) return { bg: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('Agriculture')) return { bg: 'linear-gradient(135deg, #15803D 0%, #22C55E 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('BME')) return { bg: 'linear-gradient(135deg, #BE123C 0%, #F43F5E 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('Information Technology') || dept.includes('(IT)')) return { bg: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)', color: '#ffffff', border: 'none' };
        if (dept.includes('Cyber Security')) return { bg: 'linear-gradient(135deg, #5B21B6 0%, #9333EA 100%)', color: '#ffffff', border: 'none' };
        return { bg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#ffffff', border: 'none' };
    };

    // Research Programs Offered Data
    const researchPrograms = [
        {
            title: 'Faculty Research & Consultancy Projects',
            icon: FaUserTie,
            badge: 'Faculty Excellence',
            iconBg: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            description: 'Empowering faculty members to undertake high-impact research, consultancy projects, and industry-sponsored technical solutions that address modern engineering challenges.',
            link: '/faculty-research'
        },
        {
            title: 'Interdisciplinary Research Initiatives',
            icon: FaMicroscope,
            badge: 'Cross-Disciplinary',
            iconBg: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
            description: 'Fostering cross-departmental research collaborations uniting Artificial Intelligence, Robotics, Renewable Energy, Agricultural Engineering, and Biomedical fields.',
            link: '/department-research'
        },
        {
            title: 'Industry Sponsored Research Projects',
            icon: FaHandshake,
            badge: 'Industry Partnership',
            iconBg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
            description: 'Partnering with industrial leaders to execute targeted R&D assignments, solve operational challenges, and prototype innovative technology solutions.',
            link: '/industrial-research'
        },
        {
            title: 'Innovation & Product Development',
            icon: FaLightbulb,
            badge: 'R&D Innovation',
            iconBg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
            description: 'Transforming novel research concepts and proof-of-concepts into functional hardware/software prototypes ready for commercialization.',
            link: '/rd-projects'
        },
        {
            title: 'Patent Filing & Intellectual Property Rights (IPR)',
            icon: FaCertificate,
            badge: 'IP Protection',
            iconBg: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)',
            description: 'Comprehensive support for patent drafting, prior art search, copyright filing, and commercializing intellectual property developed at EASA.',
            link: '/ipr-cell'
        },
        {
            title: 'Student Research & Innovation Projects',
            icon: FaGraduationCap,
            badge: 'Student Talent',
            iconBg: 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)',
            description: 'Inspiring undergraduate and postgraduate students through seed funding, mentored research projects, national hackathons, and paper publications.',
            link: '/student-research'
        }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Card styling helper based on theme
    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const sectionBadgeBg = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)';
    const sectionBadgeColor = isDark ? '#38BDF8' : '#1D4ED8';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';

    return (
        <div className="research-page" style={{ position: 'relative', overflowX: 'hidden', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="research"
                defaultTitle="Research & Development (R&D) Cell"
                defaultSubtitle="To create an innovative research environment that allows for the flourishing of research innovation and knowledge generation aimed at benefiting society."
                defaultImage={missionBg}
            />

            {/* QUICK NAVIGATION STRIP */}
            <section style={{
                background: isDark ? 'var(--bg-card)' : 'rgba(255, 255, 255, 0.92)',
                borderBottom: cardBorder,
                position: 'sticky',
                top: '70px',
                zIndex: 40,
                backdropFilter: 'blur(12px)',
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.04)'
            }}>
                <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0.8rem 1.5rem', display: 'flex', gap: '1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {[
                        { id: 'vision-mission', label: 'Vision & Mission' },
                        { id: 'objectives', label: 'Objectives' },
                        { id: 'dean-message', label: "Dean's Message" },
                        { id: 'org-structure', label: 'Organizational Structure' },
                        { id: 'committee', label: 'R&D Committee' },
                        { id: 'programs', label: 'Programs Offered' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '50px',
                                border: isDark ? '1px solid var(--glass-border)' : '1px solid rgba(203, 213, 225, 0.8)',
                                background: isDark ? 'var(--bg-section)' : '#ffffff',
                                color: primaryTextColor,
                                fontSize: '0.88rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.25s ease',
                                boxShadow: isDark ? 'none' : '0 2px 6px rgba(0,0,0,0.04)'
                            }}
                            className="quick-nav-btn"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '6rem' }}>

                {/* 1. VISION & MISSION SECTION */}
                <section id="vision-mission">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
                        <span style={{ padding: '0.4rem 1.2rem', background: sectionBadgeBg, color: sectionBadgeColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Core Foundation
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.8rem', color: primaryTextColor }}>
                            Vision & Mission
                        </h2>
                        <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #3B82F6, #F59E0B)', margin: '1rem auto 0', borderRadius: '2px' }} />
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                        {/* VISION CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.7 }}
                            style={{
                                background: cardBg,
                                borderRadius: '24px',
                                border: cardBorder,
                                padding: '3rem 2.5rem',
                                boxShadow: cardShadow,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.9rem',
                                marginBottom: '1.8rem',
                                boxShadow: '0 12px 24px rgba(37,99,235,0.35)'
                            }}>
                                <FaLightbulb />
                            </div>

                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.5rem', color: isDark ? '#38BDF8' : '#1E40AF' }}>
                                Our Vision
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', color: '#ffffff', padding: '0.45rem', borderRadius: '50%', flexShrink: 0, marginTop: '0.2rem', boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}>
                                        <FaCircleCheck size={14} />
                                    </span>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
                                        To create an innovative research environment that allows for the flourishing of research innovation and knowledge generation aimed at benefiting society.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', color: '#ffffff', padding: '0.45rem', borderRadius: '50%', flexShrink: 0, marginTop: '0.2rem', boxShadow: '0 4px 10px rgba(16,185,129,0.3)' }}>
                                        <FaCircleCheck size={14} />
                                    </span>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: primaryTextColor, fontWeight: '500', margin: 0 }}>
                                        To promote high-quality research that supports academic excellence, drives industry advancements and encourages sustainable development.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* MISSION CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            style={{
                                background: cardBg,
                                borderRadius: '24px',
                                border: cardBorder,
                                padding: '3rem 2.5rem',
                                boxShadow: cardShadow,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.9rem',
                                marginBottom: '1.8rem',
                                boxShadow: '0 12px 24px rgba(245,158,11,0.35)'
                            }}>
                                <FaRocket />
                            </div>

                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.5rem', color: isDark ? '#FBBF24' : '#B45309' }}>
                                Our Mission
                            </h3>

                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                {[
                                    'Foster a robust research culture among faculty and students.',
                                    'Facilitate publication of research papers in reputable national and international journals.',
                                    'Expedite funding for research activities and support initiatives in consultancy, patents and technology transfer.',
                                    'Provide cutting-edge facilities and essential infrastructure to support research activities.',
                                    'Nurture collaborative partnerships with industries, research institutes, and universities.',
                                    'Adopt an ethical approach to research activities by establishing research ethics and advisory committees to guide and oversee such efforts.',
                                    'Offer innovative solutions to tackle challenges faced by society and various industries.'
                               ].map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', fontSize: '0.98rem', lineHeight: '1.6', color: primaryTextColor, fontWeight: '500' }}>
                                        <span style={{ color: isDark ? '#F59E0B' : '#D97706', flexShrink: 0, marginTop: '0.2rem' }}>
                                            <FaArrowRight size={13} />
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* 2. OBJECTIVES SECTION */}
                <section id="objectives">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
                        <span style={{ padding: '0.4rem 1.2rem', background: sectionBadgeBg, color: sectionBadgeColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Strategic Focus
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.8rem', color: primaryTextColor }}>
                            Key Objectives
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '650px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
                            Driving impactful outcomes through structured consultancy, industry presence, and academic identity.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
                        {[
                            {
                                num: '01',
                                icon: FaFileContract,
                                iconBg: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                                title: 'Consultancy Guidelines',
                                text: 'Establish guidelines and standards for consultancy activities that reflect the EASA identity.'
                            },
                            {
                                num: '02',
                                icon: FaAward,
                                iconBg: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                                title: 'Institutional Stature',
                                text: 'Enhance EASA’s reputation through the provision of high-value consultancy services.'
                            },
                            {
                                num: '03',
                                icon: FaBookOpen,
                                iconBg: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                                title: 'Learning Resources',
                                text: 'Provide continuous opportunities and state-of-the-art resources for learning and consultancy.'
                            },
                            {
                                num: '04',
                                icon: FaShieldHalved,
                                iconBg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                                title: 'Brand Distinction',
                                text: 'Strengthen the EASA brand and elevate its stature by guaranteeing that its name is acknowledged suitably and perceived favorably by the public.'
                            }
                        ].map((obj, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                style={{
                                    background: cardBg,
                                    borderRadius: '20px',
                                    padding: '2.2rem 1.8rem',
                                    border: cardBorder,
                                    boxShadow: cardShadow,
                                    position: 'relative',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                                className="objective-card"
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                    <span style={{ fontSize: '2.2rem', fontWeight: '900', color: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(37, 99, 235, 0.25)', fontFamily: 'Outfit, sans-serif' }}>
                                        {obj.num}
                                    </span>
                                    <div style={{ padding: '0.8rem', background: obj.iconBg, color: '#ffffff', borderRadius: '16px', fontSize: '1.4rem', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}>
                                        <obj.icon />
                                    </div>
                                </div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.8rem', color: primaryTextColor }}>
                                    {obj.title}
                                </h4>
                                <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                    {obj.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. DEAN MESSAGE SECTION */}
                <section id="dean-message" style={{ scrollMarginTop: '100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7 }}
                        style={{
                            background: isDark
                                ? 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-section) 100%)'
                                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                            borderRadius: '32px',
                            border: cardBorder,
                            padding: '3.5rem 3rem',
                            boxShadow: cardShadow,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        className="dean-message-box"
                    >
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '30px',
                            fontSize: '12rem',
                            color: isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(37, 99, 235, 0.06)',
                            pointerEvents: 'none',
                            lineHeight: 1
                        }}>
                            <FaQuoteLeft />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3.5rem', alignItems: 'center' }} className="dean-grid">
                            {/* DEAN PROFILE SIDEBAR */}
                            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                                    padding: '6px',
                                    boxShadow: '0 15px 35px rgba(37,99,235,0.3)',
                                    marginBottom: '1.5rem',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background: isDark ? 'var(--bg-card)' : '#F1F5F9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '4.5rem',
                                        color: isDark ? '#38BDF8' : '#2563EB'
                                    }}>
                                        <FaUserTie />
                                    </div>
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        right: '8px',
                                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                        color: '#ffffff',
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.3rem',
                                        border: `3px solid ${isDark ? 'var(--bg-card)' : '#FFFFFF'}`,
                                        boxShadow: '0 4px 12px rgba(245,158,11,0.4)'
                                    }}>
                                        <FaAward />
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                    Dr. M. Sivakumar
                                </h3>
                                <p style={{ fontSize: '1rem', fontWeight: '800', color: isDark ? '#FBBF24' : '#D97706', margin: '0 0 0.4rem' }}>
                                    Dean of R&D
                                </p>
                                <p style={{ fontSize: '0.88rem', color: secondaryTextColor, margin: 0, lineHeight: '1.4' }}>
                                    Research and Development Cell<br />
                                    EASA College of Engineering and Technology, Coimbatore
                                </p>
                            </div>

                            {/* DEAN MESSAGE CONTENT */}
                            <div>
                                <span style={{ padding: '0.35rem 1rem', background: sectionBadgeBg, color: sectionBadgeColor, borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Dean's Message
                                </span>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '0.8rem', marginBottom: '1.5rem', color: primaryTextColor }}>
                                    Inspiring Innovation & Impactful Research
                                </h2>

                                <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: isDark ? '#E2E8F0' : '#334155', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    <p style={{ margin: 0 }}>
                                        Welcome to the Research and Development (R&D) Cell of EASA College of Engineering and Technology.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        Research serves as the catalyst for innovation, academic excellence, and societal advancement. The R&D Cell is dedicated to cultivating a vibrant research environment that inspires both faculty members and students to engage in high-quality, ethical, and impactful research.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        Our goal is to enhance the research culture by fostering collaboration across various fields, assisting in securing funding for research initiatives, supporting the publication of articles in reputable journals, promoting the application for patents, and strengthening partnerships between industry and academia.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        We believe that research should create new knowledge and offer practical solutions to real-world challenges. We aim to foster creativity, critical thinking, and innovation within our research efforts.
                                    </p>
                                    <p style={{ margin: 0, fontWeight: '700', color: isDark ? '#FBBF24' : '#B45309' }}>
                                        We encourage all faculty members and students to engage actively in research activities, pursue innovative ideas, and collaborate with both academic and industry partners. I wish all researchers success and look forward to your valuable contributions to the growth and advancement of our institution.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 4. ORGANIZATIONAL STRUCTURE SECTION */}
                <section id="org-structure" style={{ scrollMarginTop: '100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
                        <span style={{ padding: '0.4rem 1.2rem', background: sectionBadgeBg, color: sectionBadgeColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Governance & Architecture
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.8rem', color: primaryTextColor }}>
                            Organizational Structure
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '700px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
                            Hierarchical flow guiding strategic research execution, ethical governance, industry collaborations, and financial infrastructure.
                        </p>
                    </motion.div>

                    {/* INTERACTIVE ORGANIZATIONAL TREE DIAGRAM */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7 }}
                        style={{
                            background: cardBg,
                            borderRadius: '28px',
                            border: cardBorder,
                            padding: '4rem 2rem',
                            boxShadow: cardShadow,
                            overflowX: 'auto'
                        }}
                    >
                        <div style={{ minWidth: '850px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            {/* LEVEL 1 & 2 HORIZONTAL TREE FLOW */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '3rem', width: '100%', justifyContent: 'center' }}>
                                {/* PRINCIPAL NODE */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    whileHover={{ scale: 1.04 }}
                                    style={{
                                        background: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
                                        color: '#ffffff',
                                        borderRadius: '20px',
                                        padding: '1.8rem 2.5rem',
                                        minWidth: '220px',
                                        textAlign: 'center',
                                        boxShadow: '0 15px 30px rgba(142,68,173,0.4)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.8rem'
                                    }}
                                >
                                    <div style={{ fontSize: '2.4rem', background: 'rgba(255,255,255,0.2)', color: '#ffffff', padding: '0.8rem', borderRadius: '50%' }}>
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9, fontWeight: '800' }}>Executive Leader</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>Principal</div>
                                    </div>
                                </motion.div>

                                {/* CONNECTOR LINE 1 */}
                                <div style={{ width: '60px', height: '4px', background: '#9B59B6', position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: '-6px', top: '-5px', width: '0', height: '0', borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '10px solid #9B59B6' }} />
                                </div>

                                {/* RESEARCH DEAN NODE */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    whileHover={{ scale: 1.04 }}
                                    style={{
                                        background: 'linear-gradient(135deg, #00A896 0%, #028090 100%)',
                                        color: '#ffffff',
                                        borderRadius: '20px',
                                        padding: '1.8rem 2.5rem',
                                        minWidth: '240px',
                                        textAlign: 'center',
                                        boxShadow: '0 15px 30px rgba(0,168,150,0.4)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.8rem'
                                    }}
                                >
                                    <div style={{ fontSize: '2.4rem', background: 'rgba(255,255,255,0.2)', color: '#ffffff', padding: '0.8rem', borderRadius: '50%' }}>
                                        <FaMicroscope />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.9, fontWeight: '800' }}>Head of R&D Cell</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>Research Dean</div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* DIVIDER & CONNECTOR HUB TO 4 PILLARS */}
                            <div style={{ textAlign: 'center', margin: '-1rem 0 2rem 0' }}>
                                <span style={{
                                    padding: '0.4rem 1.2rem',
                                    background: isDark ? 'var(--glass-highlight)' : 'rgba(37, 99, 235, 0.08)',
                                    borderRadius: '50px',
                                    fontSize: '0.85rem',
                                    fontWeight: '800',
                                    color: isDark ? '#38BDF8' : '#1D4ED8',
                                    border: isDark ? '1px solid var(--glass-border)' : '1px solid rgba(37, 99, 235, 0.2)'
                                }}>
                                    4 Functional Pillars of R&D
                                </span>
                            </div>

                            {/* LEVEL 3: 4 PILLARS GRID */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%' }}>
                                {orgPillars.map((pillar, index) => {
                                    const IconComp = pillar.icon;
                                    const isSelected = activePillar === pillar.id;

                                    return (
                                        <motion.div
                                            key={pillar.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.1 * index }}
                                            whileHover={{ y: -8 }}
                                            onClick={() => setActivePillar(isSelected ? null : pillar.id)}
                                            style={{
                                                background: pillar.bgGradient,
                                                color: '#ffffff',
                                                borderRadius: '20px',
                                                padding: '2rem 1.5rem',
                                                boxShadow: '0 15px 30px rgba(0,0,0,0.18)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                border: isSelected ? '3px solid #ffffff' : 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.25)', color: '#ffffff', padding: '0.9rem', borderRadius: '18px' }}>
                                                <IconComp />
                                            </div>
                                            <h4 style={{ fontSize: '1.15rem', fontWeight: '900', lineHeight: '1.3', margin: '0 0 0.8rem' }}>
                                                {pillar.title}
                                            </h4>
                                            <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.3)', color: '#ffffff', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: '800' }}>
                                                {isSelected ? 'Hide Details' : 'Click to View Details'}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* EXPANDABLE PILLAR DETAILS */}
                            <AnimatePresence>
                                {activePillar && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ width: '100%', marginTop: '2rem', overflow: 'hidden' }}
                                    >
                                        {(() => {
                                            const p = orgPillars.find(x => x.id === activePillar);
                                            if (!p) return null;
                                            const IconComp = p.icon;
                                            return (
                                                <div style={{
                                                    background: isDark ? 'var(--bg-section)' : '#F8FAFC',
                                                    borderRadius: '20px',
                                                    padding: '2rem 2.5rem',
                                                    borderLeft: `6px solid ${p.color}`,
                                                    border: cardBorder,
                                                    display: 'flex',
                                                    gap: '1.5rem',
                                                    alignItems: 'center',
                                                    boxShadow: isDark ? 'none' : '0 8px 24px rgba(0,0,0,0.04)'
                                                }}>
                                                    <div style={{ fontSize: '2.8rem', color: p.color, flexShrink: 0 }}>
                                                        <IconComp />
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem' }}>
                                                            {p.title} - Scope & Responsibilities
                                                        </h4>
                                                        <p style={{ margin: 0, fontSize: '1.02rem', color: isDark ? '#E2E8F0' : '#334155', lineHeight: '1.6' }}>
                                                            {p.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </motion.div>
                </section>

                {/* 5. COMMITTEE MEMBERS TABLE SECTION */}
                <section id="committee" style={{ scrollMarginTop: '100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
                        <span style={{ padding: '0.4rem 1.2rem', background: sectionBadgeBg, color: sectionBadgeColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Leadership Team
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.8rem', color: primaryTextColor }}>
                            Research & Development (R&D) Committee Members 2026-2027
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '650px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
                            Dedicated academic leaders representing diverse engineering disciplines overseeing research quality and innovation.
                        </p>
                    </motion.div>

                    {/* SEARCH & FILTER BAR */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: cardBg,
                            borderRadius: '20px',
                            border: cardBorder,
                            padding: '1rem 1.5rem',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.04)'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            width: '100%',
                            maxWidth: '450px',
                            background: isDark ? 'var(--bg-section)' : '#F1F5F9',
                            padding: '0.7rem 1.2rem',
                            borderRadius: '14px',
                            border: isDark ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(203, 213, 225, 0.8)'
                        }}>
                            <FaMagnifyingGlass style={{ color: isDark ? '#38BDF8' : '#2563EB', fontSize: '1.1rem' }} />
                            <input
                                type="text"
                                placeholder="Search by name, designation, or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    width: '100%',
                                    color: primaryTextColor,
                                    fontSize: '0.95rem',
                                    fontWeight: '600'
                                }}
                            />
                        </div>
                        <span style={{ fontSize: '0.9rem', color: isDark ? '#38BDF8' : '#2563EB', fontWeight: '800', whiteSpace: 'nowrap' }}>
                            Showing {filteredMembers.length} of {committeeMembers.length} Members
                        </span>
                    </motion.div>

                    {/* COMMITTEE TABLE WITH ATTRACTIVE HIGH-CONTRAST COLOURS */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7 }}
                        style={{
                            background: cardBg,
                            borderRadius: '24px',
                            border: isDark ? '2px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(226, 232, 240, 0.9)',
                            overflow: 'hidden',
                            boxShadow: cardShadow
                        }}
                    >
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        <th style={{ padding: '1.4rem 1.5rem', width: '90px', textAlign: 'center', fontWeight: '900' }}>S. No.</th>
                                        <th style={{ padding: '1.4rem 1.5rem', fontWeight: '900' }}>Member Name</th>
                                        <th style={{ padding: '1.4rem 1.5rem', fontWeight: '900' }}>Designation</th>
                                        <th style={{ padding: '1.4rem 1.5rem', fontWeight: '900' }}>Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: primaryTextColor, fontWeight: '700', fontSize: '1.1rem' }}>
                                                No committee members found matching "{searchTerm}".
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMembers.map((member, index) => {
                                            const badgeStyle = getDeptBadgeStyle(member.department);

                                            return (
                                                <motion.tr
                                                    key={member.sno}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                                    style={{
                                                        borderBottom: index === filteredMembers.length - 1 ? 'none' : isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(226, 232, 240, 0.8)',
                                                        background: member.isLead
                                                            ? isDark ? 'rgba(37, 99, 235, 0.18)' : 'rgba(37, 99, 235, 0.07)'
                                                            : index % 2 === 0
                                                                ? 'transparent'
                                                                : isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(248, 250, 252, 0.7)',
                                                        transition: 'background 0.2s ease'
                                                    }}
                                                    className="table-row-hover"
                                                >
                                                    {/* S. NO. */}
                                                    <td style={{ padding: '1.3rem 1.5rem', textAlign: 'center' }}>
                                                        <span style={{
                                                            width: '34px',
                                                            height: '34px',
                                                            borderRadius: '50%',
                                                            background: member.isLead ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                                                            color: '#ffffff',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: '900',
                                                            fontSize: '0.95rem',
                                                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                                                        }}>
                                                            {member.sno}
                                                        </span>
                                                    </td>

                                                    {/* MEMBER NAME */}
                                                    <td style={{ padding: '1.3rem 1.5rem' }}>
                                                        <div style={{ fontWeight: '900', color: primaryTextColor, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                            {member.name}
                                                            {member.isLead && (
                                                                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.55rem', background: '#F59E0B', color: '#000000', borderRadius: '50px', fontWeight: '900', textTransform: 'uppercase' }}>LEAD</span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* DESIGNATION */}
                                                    <td style={{ padding: '1.3rem 1.5rem', fontWeight: '800', fontSize: '1rem', color: member.isLead ? isDark ? '#FBBF24' : '#D97706' : isDark ? '#38BDF8' : '#2563EB' }}>
                                                        {member.designation}
                                                    </td>

                                                    {/* DEPARTMENT PILL */}
                                                    <td style={{ padding: '1.3rem 1.5rem' }}>
                                                        <span style={{
                                                            padding: '0.5rem 1.1rem',
                                                            borderRadius: '50px',
                                                            background: badgeStyle.bg,
                                                            color: badgeStyle.color,
                                                            fontSize: '0.88rem',
                                                            fontWeight: '800',
                                                            display: 'inline-block',
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                                            lineHeight: '1.4'
                                                        }}>
                                                            {member.department}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </section>

                {/* 6. RESEARCH PROGRAMS OFFERED SECTION */}
                <section id="programs" style={{ scrollMarginTop: '100px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
                        <span style={{ padding: '0.4rem 1.2rem', background: sectionBadgeBg, color: sectionBadgeColor, borderRadius: '50px', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Opportunities & Ecosystem
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.8rem', color: primaryTextColor }}>
                            Research Programs Offered
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '750px', margin: '0.8rem auto 0', fontSize: '1.05rem' }}>
                            The Research & Development (R&D) Cell promotes a vibrant research culture by encouraging faculty members and students to engage in innovative and interdisciplinary research.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                        {researchPrograms.map((prog, index) => {
                            const IconC = prog.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 35, scale: 0.96 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.6, delay: index * 0.08 }}
                                    style={{
                                        background: cardBg,
                                        borderRadius: '24px',
                                        border: cardBorder,
                                        padding: '2.5rem 2rem',
                                        boxShadow: cardShadow,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    className="program-card"
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '18px',
                                                background: prog.iconBg,
                                                color: '#ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                                            }}>
                                                <IconC />
                                            </div>
                                            <span style={{
                                                padding: '0.4rem 1rem',
                                                borderRadius: '50px',
                                                background: sectionBadgeBg,
                                                color: sectionBadgeColor,
                                                fontSize: '0.78rem',
                                                fontWeight: '900',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {prog.badge}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '1.45rem', fontWeight: '900', marginBottom: '1rem', color: primaryTextColor, lineHeight: '1.3' }}>
                                            {prog.title}
                                        </h3>

                                        <p style={{ fontSize: '1rem', color: secondaryTextColor, lineHeight: '1.65', marginBottom: '2rem' }}>
                                            {prog.description}
                                        </p>
                                    </div>

                                    <Link
                                        to={prog.link}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            color: isDark ? '#38BDF8' : '#2563EB',
                                            fontWeight: '800',
                                            fontSize: '0.98rem',
                                            textDecoration: 'none',
                                            marginTop: 'auto'
                                        }}
                                        className="explore-link"
                                    >
                                        Explore Program Details <FaArrowRight size={13} />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* CALL TO ACTION & MODALS */}
            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .quick-nav-btn:hover {
                    background: #2563EB !important;
                    color: #ffffff !important;
                    border-color: #2563EB !important;
                }
                .objective-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
                }
                .program-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
                }
                .explore-link:hover {
                    text-decoration: underline;
                }
                .table-row-hover:hover {
                    background: ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.12)'} !important;
                }
                @media (max-width: 968px) {
                    .dean-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .dean-message-box {
                        padding: 2.5rem 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResearchPage;
