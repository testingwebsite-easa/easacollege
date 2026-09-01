import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaUniversity, FaUserTie, FaGraduationCap, FaCheckCircle,
    FaCalendarAlt, FaFileAlt, FaBalanceScale, FaShieldAlt,
    FaCogs, FaUsers, FaArrowRight
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';

const standingData = {
    title: "Standing Committee on Academic Affairs",
    subtitle: "Executive Statutory Body for Interim Academic Approvals, Regulations & Calendar Compliance.",
    heroImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3",
    overview: [
        "The Standing Committee on Academic Affairs is an empowered statutory executive body acting on behalf of the Academic Council between its formal bi-annual meetings.",
        "Headed by the Principal and comprised of Academic Deans, all Heads of Departments, and the Controller of Examinations (COE), the committee reviews emergent academic requirements, syllabus updates, exam schedule adjustments, and credit transfer requests.",
        "All decisions and resolutions passed by the Standing Committee are placed before the full Academic Council during its subsequent session for formal ratification."
    ],
    members: [
        { name: "Dr. P. Manoharan", role: "Chairman", designation: "Principal & Head of Institution" },
        { name: "Dr. S. Ramasamy", role: "Member", designation: "Dean - Academic Affairs & Head (CSE)" },
        { name: "Dr. K. Arulmurugan", role: "Member", designation: "Dean - Research & Head (MECH)" },
        { name: "Dr. N. Saravanan", role: "Member", designation: "Dean - Student Affairs & Head (ECE)" },
        { name: "Dr. M. Vijayakumar", role: "Member", designation: "Controller of Examinations (COE)" },
        { name: "Dr. R. Anuradha", role: "Member", designation: "Head - Biomedical Engineering" },
        { name: "Dr. S. Thilagavathi", role: "Member", designation: "Head - Agriculture Engineering" },
        { name: "Prof. G. Arvind", role: "Member Secretary", designation: "Senior Academic Coordinator" }
    ],
    responsibilities: [
        {
            title: "Urgent Curriculum Modifications",
            desc: "Scrutinizing time-sensitive curriculum or course prerequisite adjustments recommended by departmental Boards of Studies."
        },
        {
            title: "NPTEL & MOOC Credit Equivalence",
            desc: "Approving online course credit transfers (NPTEL, SWAYAM, Coursera) against open electives and honours degree requirements."
        },
        {
            title: "Academic Calendar & Schedule Audits",
            desc: "Monitoring adherence to instructional day quotas (90 working days per semester), CIA test dates, and semester break schedules."
        },
        {
            title: "Student Academic Grievances & Discretionary Approvals",
            desc: "Deliberating on genuine student condonation requests, break-of-study petitions, and re-admission equivalencies."
        }
    ]
};

const StandingCommitteePage = () => {
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
                title="Standing Committee on Academic Affairs | EASA College"
                description="Standing Committee on Academic Affairs at EASA College - Executive body for interim academic council approvals and regulations."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="standing-committee"
                defaultTitle={standingData.title}
                defaultSubtitle={standingData.subtitle}
                defaultImage={standingData.heroImage}
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
                            Executive Academic Body
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Mandate & Powers
                        </h2>
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {standingData.overview.map((para, idx) => (
                            <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </section>

                {/* RESPONSIBILITIES */}
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
                            Operational Scope
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Key Functions & Powers
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
                        {standingData.responsibilities.map((res, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem', boxShadow: cardShadow }}>
                                <div style={{ color: accentColor, fontSize: '1.8rem', marginBottom: '1rem' }}><FaBalanceScale /></div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>{res.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>{res.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* COMMITTEE MEMBERS */}
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
                            Leadership
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Standing Committee Members
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {standingData.members.map((mem, idx) => (
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

export default StandingCommitteePage;
