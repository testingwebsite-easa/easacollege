import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { 
    FaFilePdf, FaLeaf, FaComments, FaUserGraduate, FaChalkboardTeacher, 
    FaBriefcase, FaUserTie, FaDownload, FaExternalLinkAlt, FaCheckCircle, 
    FaLayerGroup, FaAward, FaEye, FaArrowRight, FaSyncAlt, FaClipboardCheck,
    FaBookOpen, FaPaperPlane
} from "react-icons/fa";
import "./inner1.css";

const stakeholderFeedbackData = [
    {
        id: "students",
        title: "Student Feedback on Curriculum & Ambience",
        stakeholder: "Students",
        metric: "1.4.1",
        icon: <FaUserGraduate />,
        color: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
        accentColor: "#38bdf8",
        description: "Comprehensive annual feedback collected from undergraduate and postgraduate students regarding curriculum design, delivery effectiveness, laboratory exposure, and campus ambience.",
        keyFocusAreas: [
            "Course Structure & Syllabus Coverage",
            "ICT Tools & Experiential Lab Training",
            "Continuous Internal Evaluation Transparency",
            "Skill Development & Placement Readiness"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf"
    },
    {
        id: "teachers",
        title: "Teacher Feedback on Curriculum & Academic Ambience",
        stakeholder: "Teachers",
        metric: "1.4.1",
        icon: <FaChalkboardTeacher />,
        color: "linear-gradient(135deg, #2D2C7A 0%, #1B2A6B 100%)",
        accentColor: "#FCCA26",
        description: "Constructive feedback from faculty members regarding syllabus contemporary relevance, balance between theory and practicals, academic flexibility, and research infrastructure.",
        keyFocusAreas: [
            "Curriculum Modernization & Emerging Trends",
            "Availability of Reference Books & E-Journals",
            "Teaching Autonomy & Pedagogical Support",
            "Research Funding & FDP Participation"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf"
    },
    {
        id: "employers",
        title: "Employer Feedback on Graduate Competency",
        stakeholder: "Employers",
        metric: "1.4.1",
        icon: <FaBriefcase />,
        color: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
        accentColor: "#34d399",
        description: "Valuable industry inputs gathered from corporate recruiters on graduate employability, technical competencies, communication skills, ethics, and ability to handle modern engineering tools.",
        keyFocusAreas: [
            "Technical Problem-Solving & Coding Acumen",
            "Interpersonal & Team Leadership Skills",
            "Workplace Ethics & Professional Demeanor",
            "Adaptability to Emerging Industry 4.0 Technologies"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf"
    },
    {
        id: "alumni",
        title: "Alumni Feedback on Institutional Development",
        stakeholder: "Alumni",
        metric: "1.4.1",
        icon: <FaUserTie />,
        color: "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
        accentColor: "#fbbf24",
        description: "Strategic inputs from alumni regarding real-world curriculum applicability, bridge programs required for corporate transitions, mentorship initiatives, and alumni network expansion.",
        keyFocusAreas: [
            "Relevance of Core Curriculum in Corporate Domain",
            "Need for Value-Added Certificate Courses",
            "Alumni-Student Mentorship & Mock Interviews",
            "Entrepreneurship & Incubation Center Support"
        ],
        link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf"
    }
];

const feedbackProcessSteps = [
    {
        step: "01",
        title: "Collection",
        desc: "Structured feedback forms administered annually across all departments."
    },
    {
        step: "02",
        title: "IQAC Analysis",
        desc: "Consolidation, statistical evaluation & report preparation by IQAC committee."
    },
    {
        step: "03",
        title: "Action Taken",
        desc: "Implementation of syllabus enhancements, value-added programs & lab upgrades."
    },
    {
        step: "04",
        title: "Web Disclosure",
        desc: "Action Taken Reports (ATR) published transparently on the institutional website."
    }
];

const NaacFeedback = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [modalTitle, setModalTitle] = useState("Feedback & Action Taken Report");

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
                title="Stakeholders Feedback | NAAC | EASA College of Engineering and Technology"
                description="Comprehensive Feedback Analysis & Action Taken Reports (ATR) from Students, Teachers, Employers, and Alumni for NAAC Metric 1.4.1."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-feedback"
                defaultTitle="Stakeholders Feedback System"
                defaultSubtitle="Structured Feedback, Analysis & Action Taken Reports for Continuous Quality Enhancement"
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
                        <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                        <li><a href="/naac-feedback" className="active" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}><FaComments className="menu-icon" /> Feedback</a></li>
                        <li><a href="/naac-rti"><FaBookOpen className="menu-icon" /> RTI</a></li>
                    </ul>
                </div>
            </section>

            {/* Main Content */}
            <div className="container naac-content py-12" style={{ maxWidth: '1350px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                
                {/* 3D Overview Highlights Banner */}
                <div className="naac-overview-grid mb-10">
                    <div className="overview-3d-card">
                        <div className="overview-icon-box">
                            <FaComments />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge">NAAC Metric 1.4.1</span>
                            <h3 className="overview-title">360° Feedback Mechanism</h3>
                            <p className="overview-text">Systematic feedback collected across all four key stakeholders to ensure curriculum quality.</p>
                            <a href="#feedback-list" className="mini-link">View All Stakeholder ATRs <FaArrowRight /></a>
                        </div>
                    </div>

                    <div className="overview-3d-card">
                        <div className="overview-icon-box" style={{ background: 'linear-gradient(135deg, #065f46, #047857)' }}>
                            <FaClipboardCheck />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge" style={{ color: '#34d399' }}>Action Taken Report</span>
                            <h3 className="overview-title">Institutional Impact</h3>
                            <p className="overview-text">Curricular reforms and infrastructural additions implemented based on stakeholder insights.</p>
                            <a href="https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf" target="_blank" rel="noreferrer" className="mini-link">
                                Download Consolidated ATR <FaDownload />
                            </a>
                        </div>
                    </div>

                    <div className="overview-3d-card stat-summary-card">
                        <div className="stat-pill-row">
                            <div className="stat-pill-item">
                                <span className="stat-num">4</span>
                                <span className="stat-label">Stakeholder Groups</span>
                            </div>
                            <div className="stat-pill-item">
                                <span className="stat-num">100%</span>
                                <span className="stat-label">Annual Audits</span>
                            </div>
                            <div className="stat-pill-item">
                                <span className="stat-num">IQAC</span>
                                <span className="stat-label">Governed Loop</span>
                            </div>
                        </div>
                        <div className="quick-links-mini">
                            <a href="/naac" className="mini-link">NAAC Criteria <FaExternalLinkAlt /></a>
                            <a href="/naac-best-practices" className="mini-link">Best Practices <FaExternalLinkAlt /></a>
                        </div>
                    </div>
                </div>

                {/* 4-Step 3D Feedback Lifecycle */}
                <div className="search-filter-card mb-10" style={{ padding: '2rem 2.2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span className="overview-badge" style={{ fontSize: '0.8rem' }}>Quality Assurance Cycle</span>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                            How We Process Stakeholder Feedback
                        </h3>
                    </div>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                        gap: '1.2rem' 
                    }}>
                        {feedbackProcessSteps.map((step, sIdx) => (
                            <div 
                                key={sIdx} 
                                style={{
                                    background: 'var(--glass-highlight)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '18px',
                                    padding: '1.5rem',
                                    position: 'relative',
                                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                                }}
                            >
                                <span style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '16px',
                                    fontSize: '1.8rem',
                                    fontWeight: '900',
                                    color: 'var(--secondary)',
                                    opacity: 0.2
                                }}>
                                    {step.step}
                                </span>
                                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                    {step.title}
                                </h4>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stakeholder Feedback Cards */}
                <div id="feedback-list" className="stakeholders-container">
                    {stakeholderFeedbackData.map((data, index) => (
                        <motion.div
                            key={data.id}
                            id={data.id}
                            className="criterion-card-wrapper mb-8"
                            {...fadeInUp}
                            transition={{ delay: index * 0.12 }}
                        >
                            {/* Card Header */}
                            <div className="criterion-card-header open" style={{ cursor: 'default' }}>
                                <div className="header-left">
                                    <div 
                                        className="criterion-badge-3d" 
                                        style={{ background: data.color, border: `1px solid ${data.accentColor}` }}
                                    >
                                        <span style={{ fontSize: '1.4rem', color: data.accentColor }}>{data.icon}</span>
                                    </div>
                                    <div className="header-text-group">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span className="overview-badge" style={{ color: data.accentColor, margin: 0 }}>
                                                STAKEHOLDER • {data.stakeholder.toUpperCase()}
                                            </span>
                                            <span className="metrics-counter-pill" style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem' }}>
                                                Metric {data.metric}
                                            </span>
                                        </div>
                                        <h3 className="criterion-heading">{data.title}</h3>
                                    </div>
                                </div>
                                <div className="header-right">
                                    <button
                                        onClick={(e) => handleViewPdf(e, data.link, `${data.stakeholder} Feedback & ATR`)}
                                        className="btn-view-document"
                                        title={`Preview ${data.stakeholder} Feedback Document`}
                                    >
                                        <FaEye className="pdf-icon" style={{ color: 'var(--secondary)' }} />
                                        <span>Quick Preview</span>
                                    </button>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="criterion-card-body" style={{ paddingTop: '1.8rem' }}>
                                <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                    {data.description}
                                </p>

                                {/* Key Areas Grid */}
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                                    gap: '1rem',
                                    marginBottom: '1.8rem'
                                }}>
                                    {data.keyFocusAreas.map((area, aIdx) => (
                                        <div 
                                            key={aIdx} 
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
                                            <FaCheckCircle style={{ color: data.accentColor, fontSize: '1rem', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                {area}
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
                                        Official verified NAAC Metric 1.4.1 Feedback & ATR Report
                                    </span>
                                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={(e) => handleViewPdf(e, data.link, `${data.stakeholder} Feedback & ATR`)}
                                            className="btn btn-secondary"
                                            style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}
                                        >
                                            <FaEye style={{ marginRight: '6px' }} /> Interactive Preview
                                        </button>
                                        <a 
                                            href={data.link} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="btn btn-yellow"
                                            style={{ padding: '0.55rem 1.4rem', fontSize: '0.8rem' }}
                                        >
                                            <FaFilePdf style={{ marginRight: '6px' }} /> Download ATR Report <FaExternalLinkAlt style={{ marginLeft: '4px', fontSize: '0.7rem' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Direct IQAC Feedback Contact Card */}
                <div className="search-filter-card mt-10" style={{ textAlign: 'center', padding: '2.8rem 2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), #1B2A6B)',
                        border: '1px solid rgba(230, 182, 39, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--secondary)',
                        fontSize: '1.6rem',
                        margin: '0 auto 1.2rem auto'
                    }}>
                        <FaPaperPlane />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                        Have Feedback to Share with EASA College?
                    </h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 1.8rem auto', fontSize: '0.95rem', lineHeight: '1.7' }}>
                        Your valuable inputs drive our pedagogical innovations, infrastructure upgrades, and academic policies. Reach out to our Internal Quality Assurance Cell (IQAC).
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="/iqac-about" className="btn btn-primary" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
                            <FaLayerGroup style={{ marginRight: '6px' }} /> Visit IQAC Portal
                        </a>
                        <a href="/naac" className="btn btn-warning" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
                            <FaLeaf style={{ marginRight: '6px' }} /> View NAAC SSR Documentation
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
                                    title="Feedback & Action Taken Report Document"
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

export default NaacFeedback;
