import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaGraduationCap, FaChartLine, FaCheckCircle, FaFileAlt,
    FaUniversity, FaBalanceScale, FaAward, FaSearch,
    FaShieldAlt, FaUserTie, FaCheckDouble
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';

const rpbData = {
    title: "Result Passing Board (RPB)",
    subtitle: "Autonomous Examination Scrutiny, Grade Moderation & Result Publication Authority.",
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    overview: [
        "The Result Passing Board (RPB) operates under the Controller of Examinations (COE) as the statutory board responsible for scrutinizing, moderating, and authorizing the publication of End-Semester Autonomous Examination results.",
        "Convening immediately following central evaluation and valuation auditing, the RPB conducts comprehensive statistical analysis of course-wise pass percentages, grade point distributions, evaluation anomalies, and moderation requirements.",
        "The board ensures absolute confidentiality, transparency, and fairness in grading as per autonomous regulations and Anna University guidelines before approving the final marksheets and grade cards."
    ],
    members: [
        { name: "Dr. P. Manoharan", role: "Chairman", designation: "Principal, EASA College" },
        { name: "Dr. M. Vijayakumar", role: "Member Secretary", designation: "Controller of Examinations (COE)" },
        { name: "Dr. K. Balakrishnan", role: "University Representative", designation: "Professor, Anna University, Chennai" },
        { name: "Dr. S. Ramasamy", role: "Member", designation: "Head, Computer Science & Engineering" },
        { name: "Dr. K. Arulmurugan", role: "Member", designation: "Head, Mechanical Engineering" },
        { name: "Dr. N. Saravanan", role: "Member", designation: "Head, Electronics & Communication Engg" },
        { name: "Dr. R. Anuradha", role: "Member", designation: "Head, Biomedical Engineering" },
        { name: "Dr. S. Thilagavathi", role: "Member", designation: "Head, Agriculture Engineering" }
    ],
    workflow: [
        {
            step: "01",
            title: "Central Valuation & Re-checking",
            desc: "Double-blind evaluation of answer scripts by qualified internal and external examiners with Chief Examiner spot auditing."
        },
        {
            step: "02",
            title: "Statistical Performance Analysis",
            desc: "COE office computes course-wise pass percentages, mean marks, standard deviations, and identify courses requiring scrutiny."
        },
        {
            step: "03",
            title: "Board Scrutiny & Moderation Review",
            desc: "RPB reviews evaluation reports, considers question paper difficulty feedback, and applies authorized statutory moderation rules."
        },
        {
            step: "04",
            title: "Result Publication Authorization",
            desc: "Formal sign-off by Principal, COE, and University Nominee, followed by instant publishing on the student portal."
        }
    ],
    policies: [
        {
            title: "Revaluation & Transparency Policy",
            desc: "Students can request photocopies of evaluated answer scripts and apply for revaluation within 7 days of result declaration."
        },
        {
            title: "Malpractice Prevention Cell",
            desc: "Strict disciplinary review of reported examination violations as per Autonomous Disciplinary Ordinances."
        },
        {
            title: "Supplementary Examinations",
            desc: "Fast-track supplementary examinations for final-year students with single standing backlogs to facilitate immediate placement onboarding."
        }
    ]
};

const ResultPassingBoardPage = () => {
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
                title="Result Passing Board (RPB) | EASA College"
                description="Result Passing Board (RPB) at EASA College - Examination result moderation, grade scrutiny, and official publication board."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="result-passing-board"
                defaultTitle={rpbData.title}
                defaultSubtitle={rpbData.subtitle}
                defaultImage={rpbData.heroImage}
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
                            Evaluation Governance
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Examination Scrutiny & Moderation
                        </h2>
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {rpbData.overview.map((para, idx) => (
                            <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </section>

                {/* WORKFLOW */}
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
                            Evaluation Lifecycle
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            4-Stage Result Approval Protocol
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
                        {rpbData.workflow.map((st, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem', boxShadow: cardShadow }}>
                                <span style={{ padding: '0.35rem 0.8rem', borderRadius: '50px', background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', display: 'inline-block', marginBottom: '1rem' }}>
                                    Stage {st.step}
                                </span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>{st.title}</h3>
                                <p style={{ fontSize: '0.92rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>{st.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MEMBERS */}
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
                            Board Composition
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Result Passing Board Members
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {rpbData.members.map((mem, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '20px', border: cardBorder, padding: '1.8rem', boxShadow: cardShadow }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: accentColor, fontWeight: '800', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                    {mem.role}
                                </div>
                                <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem' }}>
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

export default ResultPassingBoardPage;
