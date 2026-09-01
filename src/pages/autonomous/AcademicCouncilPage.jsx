import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaUniversity, FaGraduationCap, FaUserTie, FaBookOpen,
    FaCheckCircle, FaAward, FaFileAlt, FaShieldAlt,
    FaBalanceScale, FaCogs, FaUsers
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';

const councilData = {
    title: "Academic Council",
    subtitle: "Principal Academic Statutory Body for Curricula Ratification, Regulations & Examinations.",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    overview: [
        "The Academic Council is the supreme statutory academic decision-making body of the institution, responsible for laying down academic policies, approving regulations, ratifying curricula, and maintaining the highest standards of instruction and examination.",
        "Convening regularly, the Academic Council scrutinizes and ratifies all proposals submitted by the various Boards of Studies (BoS), the Curriculum Development Committee (CDC), and the Standing Committee on Academic Affairs.",
        "The council is composed of the Principal (Chairman), all Heads of Departments, three Anna University Nominees, four external experts from Industry, Law, and Education nominated by the Governing Body, and senior faculty coordinators."
    ],
    members: [
        { name: "Dr. P. Manoharan", role: "Chairman", designation: "Principal, EASA College" },
        { name: "Dr. K. Balakrishnan", role: "University Nominee", designation: "Professor, Dept. of Computer Science, Anna University" },
        { name: "Dr. T. Murugesan", role: "University Nominee", designation: "Professor, Dept. of Mechanical Engg, Anna University" },
        { name: "Dr. S. Albert", role: "University Nominee", designation: "Professor, Dept. of Electrical Engg, Anna University" },
        { name: "Mr. G. Arvind", role: "Industry Expert", designation: "Principal Architect, Zoho Corporation" },
        { name: "Mr. S. Ravichandran", role: "Industry Expert", designation: "VP - Operations, L&T Valves" },
        { name: "Dr. M. Sridharan", role: "Academic Expert", designation: "Professor, Coimbatore Institute of Technology" },
        { name: "Adv. R. Soundarajan", role: "Legal Expert", designation: "Senior Advocate, High Court of Madras" },
        { name: "Dr. S. Ramasamy", role: "Member (HOD)", designation: "Head, Computer Science & Engineering" },
        { name: "Dr. K. Arulmurugan", role: "Member (HOD)", designation: "Head, Mechanical Engineering" },
        { name: "Dr. N. Saravanan", role: "Member (HOD)", designation: "Head, Electronics & Communication Engg" },
        { name: "Dr. M. Vijayakumar", role: "Member (COE)", designation: "Controller of Examinations" },
        { name: "Dr. R. Anuradha", role: "Member (HOD)", designation: "Head, Biomedical Engineering" },
        { name: "Dr. S. Thilagavathi", role: "Member (HOD)", designation: "Head, Agriculture Engineering" },
        { name: "Prof. S. Santhiya", role: "Member Secretary", designation: "Dean of Academic Affairs" }
    ],
    powers: [
        {
            title: "Curriculum & Syllabus Ratification",
            desc: "Final approval of all degree curriculum structures, syllabus schemes, credits, and evaluation matrices passed by Boards of Studies."
        },
        {
            title: "Academic Regulations & Ordinances",
            desc: "Formulating examination rules, grading criteria (CBCS 10-point scale), attendance rules, and graduation prerequisites."
        },
        {
            title: "Degree Recommendation & Merit Awards",
            desc: "Approving eligible candidate lists for the conferment of undergraduate and postgraduate degrees and institutional gold medals."
        },
        {
            title: "Interdisciplinary Programs & MoUs",
            desc: "Sanctioning new specialized programs, honours degrees, interdisciplinary minors, and international university academic MoUs."
        }
    ]
};

const AcademicCouncilPage = () => {
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
                title="Academic Council | EASA College"
                description="Academic Council of EASA College - Supreme academic authority approving regulations, curricula, and degrees."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="academic-council"
                defaultTitle={councilData.title}
                defaultSubtitle={councilData.subtitle}
                defaultImage={councilData.heroImage}
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
                            Supreme Academic Authority
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Academic Council Governance
                        </h2>
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {councilData.overview.map((para, idx) => (
                            <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </section>

                {/* POWERS */}
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
                            Statutory Powers
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Powers & Responsibilities of the Council
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
                        {councilData.powers.map((p, idx) => (
                            <div key={idx} style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem', boxShadow: cardShadow }}>
                                <div style={{ color: accentColor, fontSize: '1.8rem', marginBottom: '1rem' }}><FaBalanceScale /></div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem' }}>{p.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>{p.desc}</p>
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
                            Eminent Constitution
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Academic Council Members
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {councilData.members.map((mem, idx) => (
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

export default AcademicCouncilPage;
