import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaBookOpen, FaCogs, FaLightbulb, FaCheckCircle,
    FaLaptopCode, FaChartLine, FaShieldAlt, FaUsers,
    FaCompass, FaGraduationCap, FaTools, FaFileAlt
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';

const cdcData = {
    title: "Curriculum Development Committee (CDC)",
    subtitle: "Pioneering Futuristic, Industry-Embedded & Outcome-Based Curriculum Architecture.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    overview: [
        "The Curriculum Development Committee (CDC) functions as the nodal innovation engine responsible for systematically conceptualizing, designing, and upgrading academic course structures across all engineering and management disciplines.",
        "Working at the intersection of academic rigor and industry evolution, the CDC benchmarks curricula against premier international universities, AICTE Model Curriculum norms, and emerging Industry 4.0 pillars (Artificial Intelligence, Generative Tech, Cyber Security, Robotics, Renewable Energy, and Smart Manufacturing).",
        "The CDC ensures the continuous integration of Project-Based Learning (PBL), interdisciplinary open electives, mandatory industry internships, and professional certification credits into standard degree pathways."
    ],
    pillars: [
        {
            num: "01",
            title: "Choice-Based Credit System (CBCS)",
            desc: "Providing students academic freedom to select specialized vertical honours, interdisciplinary minors, and multidisciplinary open electives.",
            icon: <FaCompass />
        },
        {
            num: "02",
            title: "Industry 4.0 & Applied Tech Stacks",
            desc: "Embedding high-demand competencies—Full Stack MERN, Cloud Computing, Edge IoT, VLSI, EV Powertrains—into foundational course schemes.",
            icon: <FaLaptopCode />
        },
        {
            num: "03",
            title: "Bloom's Taxonomy & OBE Alignment",
            desc: "Structuring every course unit with clear higher-order cognitive learning objectives (Apply, Analyze, Evaluate, Create) for transparent assessment.",
            icon: <FaChartLine />
        },
        {
            num: "04",
            title: "Experiential Project-Based Learning",
            desc: "Mandating design thinking, AICTE IDEA Lab prototyping, hackathons, and capstone industrial live projects as integral credit components.",
            icon: <FaTools />
        }
    ],
    stages: [
        {
            step: "Stage 01",
            title: "Industry & Societal Need Analysis",
            desc: "Gathering insights from corporate hiring partners, recruiters, alumni surveys, and emerging technological trends."
        },
        {
            step: "Stage 02",
            title: "Curriculum Framing & Benchmark Mapping",
            desc: "Drafting syllabus blueprints against AICTE Model Curricula and premier global engineering university frameworks."
        },
        {
            step: "Stage 03",
            title: "Program Advisory Committee (PAC) Scrutiny",
            desc: "Departmental PAC reviews course outcomes, prerequisites, and laboratory mapping."
        },
        {
            step: "Stage 04",
            title: "Board of Studies (BoS) Deliberation",
            desc: "Subject matter experts from NITs/IITs, Anna University nominees, and industry leaders refine and approve the syllabus."
        },
        {
            step: "Stage 05",
            title: "Academic Council Ratification & Implementation",
            desc: "Final approval by the Academic Council for seamless institutional rollout and LMS integration."
        }
    ]
};

const CdcPage = () => {
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
                title="Curriculum Development Committee (CDC) | EASA College"
                description="Curriculum Development Committee (CDC) at EASA College - Leading modern curriculum formulation, CBCS integration, and industry-aligned syllabus design."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="cdc"
                defaultTitle={cdcData.title}
                defaultSubtitle={cdcData.subtitle}
                defaultImage={cdcData.heroImage}
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
                            Academic Innovation Engine
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Future-Ready Curriculum Design
                        </h2>
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {cdcData.overview.map((para, idx) => (
                            <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </section>

                {/* 4 PILLARS */}
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
                            Design Philosophy
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            4 Pillars of Curriculum Architecture
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
                        {cdcData.pillars.map((pil, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem', boxShadow: cardShadow }}>
                                <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                                    {pil.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>
                                    {pil.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                    {pil.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5-STAGE WORKFLOW */}
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
                            Operating Lifecycle
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            5-Stage Curriculum Formulation Lifecycle
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '1000px', margin: '0 auto' }}>
                        {cdcData.stages.map((st, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '20px', border: cardBorder, padding: '1.8rem 2rem', boxShadow: cardShadow, display: 'grid', gridTemplateColumns: '180px 1fr', gap: '2rem', alignItems: 'center' }}>
                                <div style={{ borderRight: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)', paddingRight: '1rem' }}>
                                    <span style={{ padding: '0.35rem 0.8rem', borderRadius: '50px', background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.5rem' }}>
                                        {st.step}
                                    </span>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                        {st.title}
                                    </h4>
                                </div>
                                <p style={{ fontSize: '0.98rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                    {st.desc}
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

export default CdcPage;
