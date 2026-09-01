import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaUniversity, FaUserTie, FaBuilding, FaCheckCircle,
    FaBalanceScale, FaShieldAlt, FaAward, FaUsers,
    FaChartLine, FaCogs, FaHandshake
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';

const governingData = {
    title: "Governing Body / Governing Council",
    subtitle: "Apex Statutory Governance Body Directing Institutional Strategy, Policy & Fiscal Allocations.",
    heroImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3",
    overview: [
        "The Governing Body (Governing Council) of EASA College of Engineering and Technology is the highest apex statutory administrative authority established as per UGC, AICTE, and Anna University statutes.",
        "Comprising the Managing Trust, UGC Nominees, State Government Representatives, University Nominees, distinguished industrialists, eminent educationists, and faculty representatives, the Governing Body steers long-term strategic policy.",
        "The council reviews and approves annual budgets, major infrastructure expansion master plans, new academic program introductions, faculty recruitment and appraisal policies, and ensures institutional compliance with national accreditation standards."
    ],
    members: [
        { name: "Shri. T. D. Eswaramoorthy", role: "Chairman", designation: "Managing Trustee, EASA Educational Trust" },
        { name: "Smt. Sujatha Eswaramoorthy", role: "Trust Member", designation: "Trustee, EASA Educational Trust" },
        { name: "Dr. K. N. Somasekhar", role: "UGC Nominee", designation: "Professor & Former Dean, Central University" },
        { name: "Dr. S. Jayanthi", role: "State Govt. Nominee", designation: "Joint Director of Technical Education (DOTE)" },
        { name: "Dr. R. Senthamilselvan", role: "University Nominee", designation: "Professor, Anna University, Chennai" },
        { name: "Mr. V. Sundararajan", role: "Industrialist", designation: "Managing Director, Texmo Industries" },
        { name: "Dr. M. Soundararajan", role: "Educationalist", designation: "Former Vice-Chancellor & Senior Academician" },
        { name: "Dr. S. Ramasamy", role: "Faculty Member", designation: "Professor & Dean (Academics)" },
        { name: "Dr. K. Arulmurugan", role: "Faculty Member", designation: "Professor & Dean (Research)" },
        { name: "Dr. P. Manoharan", role: "Member Secretary", designation: "Principal & Head of Institution" }
    ],
    functions: [
        {
            title: "Institutional Strategic Planning",
            desc: "Approving 5-year strategic plans, vision-mission realignments, and institutional development roadmaps."
        },
        {
            title: "Budgetary Sanctions & Capital Expenditure",
            desc: "Ratifying annual operating budgets, laboratory modernization funding, and research seed grant grants."
        },
        {
            title: "Policy Formulation & Faculty Governance",
            desc: "Setting service rules, promotion criteria, performance appraisal systems, and faculty welfare measures."
        },
        {
            title: "Academic & Regulatory Accreditations",
            desc: "Reviewing institutional reports for NAAC, NBA, NIRF, AICTE EoA, and Anna University affiliation renewals."
        }
    ]
};

const GoverningBodiesPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="Governing Body / Council | EASA College"
                description="Governing Body of EASA College - Apex statutory authority directing policy, fiscal management, and institutional excellence."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="governing-bodies"
                defaultTitle={governingData.title}
                defaultSubtitle={governingData.subtitle}
                defaultImage={governingData.heroImage}
            />

            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
                {/* OVERVIEW */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
                            Apex Administration
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Statutory Governance Body
                        </h2>
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {governingData.overview.map((para, idx) => (
                            <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </section>

                {/* FUNCTIONS */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
                            Statutory Mandate
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Key Functions & Responsibilities
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
                        {governingData.functions.map((fn, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem', boxShadow: cardShadow }}>
                                <div style={{ color: accentColor, fontSize: '1.8rem', marginBottom: '1rem' }}><FaBuilding /></div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>{fn.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>{fn.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MEMBERS TABLE */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
                            Council Constitution
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Governing Council Members
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {governingData.members.map((mem, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '20px', border: cardBorder, padding: '1.8rem', boxShadow: cardShadow }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: accentColor, fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                    {mem.role}
                                </div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
                                    {mem.name}
                                </h4>
                                <p style={{ fontSize: '0.88rem', color: secondaryTextColor, margin: 0 }}>
                                    {mem.designation}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default GoverningBodiesPage;
