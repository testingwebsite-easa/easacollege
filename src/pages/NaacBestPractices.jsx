import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { 
    FaFilePdf, FaLeaf, FaStar, FaLightbulb, FaHandsHelping, 
    FaBookOpen, FaDownload, FaExternalLinkAlt, FaCheckCircle, 
    FaLayerGroup, FaAward, FaEye, FaArrowRight, FaLaptopCode,
    FaHeartbeat, FaGraduationCap
} from "react-icons/fa";
import "./inner1.css";

const bestPracticesList = [
    {
        id: "practice-1",
        badge: "BEST PRACTICE - I",
        title: "Innovative Teaching & Learning Process",
        subtitle: "Outcome-Based Education, ICT-Enabled Pedagogies & Experiential Learning",
        description: "Transforming traditional classroom instructions into active, student-centric learning through ICT tools, virtual labs, flipped classrooms, and industry-oriented project development.",
        keyPillars: [
            "Smart Classrooms & LMS Portal Integration",
            "Project-Based Experiential Capstone Engineering",
            "Continuous Internal Assessment & Remedial Coaching",
            "Faculty Upskilling through NPTEL & FDP Certifications"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/Best Practice 1.pdf",
        icon: <FaLaptopCode />,
        color: "linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%)",
        accentColor: "#FCCA26"
    },
    {
        id: "practice-2",
        badge: "BEST PRACTICE - II",
        title: "Holistic Development through Community Engagement",
        subtitle: "Social Responsibility, Rural Empowerment & Civic Sensitization",
        description: "Empowering students as socially conscious engineers through active participation in NSS, Youth Red Cross, rural community upliftment, digital literacy, and environmental sustainability campaigns.",
        keyPillars: [
            "Adopted Village Development & Skill Centers",
            "Regular Health, Eye Care & Blood Donation Drives",
            "Green Campus, Tree Plantation & Water Conservation",
            "Disaster Relief, Societal Awareness & Civic Programs"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/Best Practice 2.pdf",
        icon: <FaHandsHelping />,
        color: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
        accentColor: "#34d399"
    },
    {
        id: "summary-doc",
        badge: "INSTITUTIONAL SUMMARY",
        title: "Overview of Institutional Best Practices",
        subtitle: "Comprehensive Documentation & Quality Impact Assessment",
        description: "Consolidated institutional report detailing objectives, contexts, implementation methodologies, evidence of success, and resources mobilized as per NAAC manual guidelines.",
        keyPillars: [
            "Formal NAAC Format Compliance",
            "Measurable Student Learning Outcomes",
            "Institutional Thrust & Distinctive Growth",
            "Long-Term Quality Enhancement Roadmap"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/best-practices.pdf",
        icon: <FaBookOpen />,
        color: "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
        accentColor: "#fbbf24"
    }
];

const NaacBestPractices = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [modalTitle, setModalTitle] = useState("Best Practice Document");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleViewPdf = (e, link, title) => {
        e.preventDefault();
        setPdfUrl(link);
        if (title) setModalTitle(title);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true }
    };

    return (
        <div className="naac-page">
            <SEO
                title="Best Practices | NAAC | EASA College of Engineering and Technology"
                description="Explore the best institutional practices implemented at EASA College for quality enhancement in higher engineering education."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-best-practices"
                defaultTitle="Institutional Best Practices"
                defaultSubtitle="Fostering Academic Innovation, Research Mindset & Holistic Social Sensitization"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
            />

            {/* Sticky Navigation Sub-menu */}
            <section className="scroll-menu-container">
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
                    <ul className="scroll-menu-list">
                        <li className="ssr-link-item">
                            <a href="https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/ssr.pdf" target="_blank" rel="noreferrer" className="highlight-pill">
                                <FaDownload style={{ marginRight: '6px' }} /> SSR Report
                            </a>
                        </li>
                        <li><a href="/naac-dvv-clarifications"><FaCheckCircle className="menu-icon" /> DVV Clarification</a></li>
                        <li><a href="/naac-extended-profile"><FaBookOpen className="menu-icon" /> Extended Profile</a></li>
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                            <li key={num}><a href={`/naac#c${num}`}><FaLeaf className="menu-icon" /> Criterion {num}</a></li>
                        ))}
                        <li><a href="/naac-committee"><FaLayerGroup className="menu-icon" /> Committees</a></li>
                        <li><a href="/naac-distinction"><FaAward className="menu-icon" /> Distinction</a></li>
                        <li><a href="/naac-best-practices" className="active" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}><FaStar className="menu-icon" /> Best Practices</a></li>
                        <li><a href="/naac-feedback"><FaCheckCircle className="menu-icon" /> Feedback</a></li>
                        <li><a href="/naac-rti"><FaBookOpen className="menu-icon" /> RTI</a></li>
                    </ul>
                </div>
            </section>

            {/* Main Content */}
            <div className="container naac-content py-12" style={{ maxWidth: '1350px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                
                {/* 3D Overview Pillar Banner */}
                <div className="naac-overview-grid mb-10">
                    <div className="overview-3d-card">
                        <div className="overview-icon-box">
                            <FaLightbulb />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge">Criterion 7.2.1</span>
                            <h3 className="overview-title">Innovative Pedagogy</h3>
                            <p className="overview-text">Continuous adoption of modern digital classrooms, coding hubs, and student-centric problem-solving frameworks.</p>
                            <a href="#practice-1" className="mini-link">Explore Practice I <FaArrowRight /></a>
                        </div>
                    </div>

                    <div className="overview-3d-card">
                        <div className="overview-icon-box" style={{ background: 'linear-gradient(135deg, #065f46, #047857)' }}>
                            <FaHandsHelping />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge" style={{ color: '#34d399' }}>Criterion 7.2.2</span>
                            <h3 className="overview-title">Community Upliftment</h3>
                            <p className="overview-text">Social sensitization and student leadership nurturing ethical, responsible engineers.</p>
                            <a href="#practice-2" className="mini-link">Explore Practice II <FaArrowRight /></a>
                        </div>
                    </div>

                    <div className="overview-3d-card stat-summary-card">
                        <div className="stat-pill-row">
                            <div className="stat-pill-item">
                                <span className="stat-num">100%</span>
                                <span className="stat-label">ICT Labs</span>
                            </div>
                            <div className="stat-pill-item">
                                <span className="stat-num">50+</span>
                                <span className="stat-label">Outreach Drives</span>
                            </div>
                            <div className="stat-pill-item">
                                <span className="stat-num">360°</span>
                                <span className="stat-label">Quality Loop</span>
                            </div>
                        </div>
                        <div className="quick-links-mini">
                            <a href="https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/best-practices.pdf" target="_blank" rel="noreferrer" className="mini-link">
                                Summary Report <FaDownload />
                            </a>
                            <a href="/naac" className="mini-link">NAAC Criteria <FaExternalLinkAlt /></a>
                        </div>
                    </div>
                </div>

                {/* Best Practices Showcase Cards */}
                <div className="best-practices-container">
                    {bestPracticesList.map((practice, index) => (
                        <motion.div
                            key={practice.id}
                            id={practice.id}
                            className="criterion-card-wrapper mb-8"
                            {...fadeInUp}
                            transition={{ delay: index * 0.15 }}
                        >
                            {/* Card Header */}
                            <div className="criterion-card-header open" style={{ cursor: 'default' }}>
                                <div className="header-left">
                                    <div 
                                        className="criterion-badge-3d" 
                                        style={{ background: practice.color, border: `1px solid ${practice.accentColor}` }}
                                    >
                                        <span style={{ fontSize: '1.4rem', color: practice.accentColor }}>{practice.icon}</span>
                                    </div>
                                    <div className="header-text-group">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span className="overview-badge" style={{ color: practice.accentColor, margin: 0 }}>
                                                {practice.badge}
                                            </span>
                                        </div>
                                        <h3 className="criterion-heading">{practice.title}</h3>
                                        <p className="criterion-subdesc">{practice.subtitle}</p>
                                    </div>
                                </div>
                                <div className="header-right">
                                    <button
                                        onClick={(e) => handleViewPdf(e, practice.link, practice.title)}
                                        className="btn-view-document"
                                        title={`Preview document for ${practice.title}`}
                                    >
                                        <FaEye className="pdf-icon" style={{ color: 'var(--secondary)' }} />
                                        <span>Quick Preview</span>
                                    </button>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="criterion-card-body" style={{ paddingTop: '1.8rem' }}>
                                <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                    {practice.description}
                                </p>

                                {/* Key Pillars Grid */}
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                                    gap: '1rem',
                                    marginBottom: '1.8rem'
                                }}>
                                    {practice.keyPillars.map((pillar, pIdx) => (
                                        <div 
                                            key={pIdx} 
                                            style={{
                                                background: 'var(--glass-highlight)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '14px',
                                                padding: '0.9rem 1.1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <FaCheckCircle style={{ color: practice.accentColor, fontSize: '1rem', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                {pillar}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons Footer */}
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    borderTop: '1px solid var(--glass-border)', 
                                    paddingTop: '1.2rem',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        Official verified NAAC Criterion 7.2 documentation
                                    </span>
                                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={(e) => handleViewPdf(e, practice.link, practice.title)}
                                            className="btn btn-secondary"
                                            style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}
                                        >
                                            <FaEye style={{ marginRight: '6px' }} /> Interactive Preview
                                        </button>
                                        <a 
                                            href={practice.link} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="btn btn-yellow"
                                            style={{ padding: '0.55rem 1.4rem', fontSize: '0.8rem' }}
                                        >
                                            <FaFilePdf style={{ marginRight: '6px' }} /> Download PDF Document <FaExternalLinkAlt style={{ marginLeft: '4px', fontSize: '0.7rem' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Navigation CTA */}
                <div className="search-filter-card mt-10" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                        Explore Complete Accreditation Records
                    </h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
                        Access the institutional distinctiveness statement, committees, DVV clarifications, or the comprehensive NAAC Self Study Report.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="/naac-distinction" className="btn btn-primary" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
                            <FaAward style={{ marginRight: '6px' }} /> Institutional Distinctiveness
                        </a>
                        <a href="/naac" className="btn btn-warning" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
                            <FaLeaf style={{ marginRight: '6px' }} /> All 7 NAAC Criteria
                        </a>
                    </div>
                </div>

            </div>

            {/* Document Preview Modal */}
            <AnimatePresence>
                {pdfUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pdf-modal-overlay"
                        onClick={() => setPdfUrl(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="pdf-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="pdf-modal-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FaFilePdf style={{ color: '#ef4444', fontSize: '1.3rem' }} />
                                    <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{modalTitle}</h3>
                                </div>
                                <button className="close-btn" onClick={() => setPdfUrl(null)} title="Close">&times;</button>
                            </div>
                            <div className="pdf-modal-body">
                                <iframe
                                    src={pdfUrl}
                                    title="Best Practices PDF Document"
                                    className="pdf-iframe"
                                />
                            </div>
                            <div className="pdf-modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    Official EASA College NAAC Repository
                                </span>
                                <a href={pdfUrl} target="_blank" rel="noreferrer" className="btn-ssr-download">
                                    <FaExternalLinkAlt /> Open in Full Browser Tab
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default NaacBestPractices;
