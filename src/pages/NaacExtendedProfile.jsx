import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { 
    FaFilePdf, FaLeaf, FaUsers, FaChalkboardTeacher, FaCoins, 
    FaExternalLinkAlt, FaDownload, FaCheckCircle, FaBookOpen, 
    FaLayerGroup, FaAward, FaArrowRight, FaEye
} from "react-icons/fa";
import "./inner1.css";

const extendedProfileCategories = [
    {
        id: "students",
        categoryTitle: "1. Students",
        categorySubtitle: "Student enrollment and academic strength over 5 consecutive academic years",
        icon: <FaUsers />,
        color: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
        items: [
            {
                metric: "1.1",
                parameter: "Number of students year wise during the last five years",
                description: "Certified list of admitted students across all UG and PG programs for the assessment period as per Anna University and AICTE norms.",
                link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/extended-profile/1.1/viewpage.pdf"
            }
        ]
    },
    {
        id: "teachers",
        categoryTitle: "2. Teachers & Academic Staff",
        categorySubtitle: "Full-time faculty strength, sanctioned posts, and academic continuity",
        icon: <FaChalkboardTeacher />,
        color: "linear-gradient(135deg, #2D2C7A 0%, #1B2A6B 100%)",
        items: [
            {
                metric: "2.1",
                parameter: "Number of teaching staff / full time teachers during the last five years (Without repeat count)",
                description: "Consolidated list of unique full-time faculty members employed across all departments during the five-year evaluation window.",
                link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/extended-profile/2.1/viewpage.pdf"
            },
            {
                metric: "2.2",
                parameter: "Number of teaching staff / full time teachers year wise during the last five years",
                description: "Annual breakdown of approved full-time faculty serving each academic year to compute the student-to-teacher ratio.",
                link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/extended-profile/2.2/viewpage.pdf"
            }
        ]
    },
    {
        id: "expenditure",
        categoryTitle: "3. Institutional Expenditure",
        categorySubtitle: "Annual financial investment excluding salary component (INR in Lakhs)",
        icon: <FaCoins />,
        color: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
        items: [
            {
                metric: "3.1",
                parameter: "Expenditure excluding salary component year wise during the last five years (INR in lakhs)",
                description: "Audited financial statements highlighting operational expenditure, library augmentation, laboratory maintenance, and infrastructure enhancement.",
                link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/extended-profile/3.1/viewpage.pdf"
            }
        ]
    }
];

const NaacExtendedProfile = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleViewPdf = (e, link) => {
        e.preventDefault();
        setPdfUrl(link);
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
                title="Extended Profile | NAAC | EASA College of Engineering and Technology"
                description="Official NAAC Extended Profile documentation covering student enrollment, faculty metrics, and institutional expenditure data for EASA College."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-extended-profile"
                defaultTitle="Extended Profile"
                defaultSubtitle="Verified Institutional Data & Baseline Academic Documentation for NAAC Assessment"
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
                        <li><a href="/naac-extended-profile" className="active" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}><FaBookOpen className="menu-icon" /> Extended Profile</a></li>
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                            <li key={num}><a href={`/naac#c${num}`}><FaLeaf className="menu-icon" /> Criterion {num}</a></li>
                        ))}
                        <li><a href="/naac-committee"><FaLayerGroup className="menu-icon" /> Committees</a></li>
                        <li><a href="/naac-distinction"><FaAward className="menu-icon" /> Distinction</a></li>
                        <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                        <li><a href="/naac-feedback"><FaCheckCircle className="menu-icon" /> Feedback</a></li>
                        <li><a href="/naac-rti"><FaBookOpen className="menu-icon" /> RTI</a></li>
                    </ul>
                </div>
            </section>

            {/* Main Content */}
            <div className="container naac-content py-12" style={{ maxWidth: '1300px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                
                {/* 3D Overview Stat Cards */}
                <div className="naac-overview-grid mb-10">
                    <div className="overview-3d-card">
                        <div className="overview-icon-box">
                            <FaUsers />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge">Metric 1.1</span>
                            <h3 className="overview-title">Student Strength</h3>
                            <p className="overview-text">Annual enrollment records and academic progression over the last 5 years.</p>
                            <a href="#students" className="mini-link">View Student Metric <FaArrowRight /></a>
                        </div>
                    </div>

                    <div className="overview-3d-card">
                        <div className="overview-icon-box gold">
                            <FaChalkboardTeacher />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge gold">Metrics 2.1 & 2.2</span>
                            <h3 className="overview-title">Faculty Strength</h3>
                            <p className="overview-text">Full-time approved teaching staff with and without repeat count.</p>
                            <a href="#teachers" className="mini-link">View Faculty Metrics <FaArrowRight /></a>
                        </div>
                    </div>

                    <div className="overview-3d-card">
                        <div className="overview-icon-box" style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}>
                            <FaCoins />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge" style={{ color: '#FBBF24' }}>Metric 3.1</span>
                            <h3 className="overview-title">Institutional Outlay</h3>
                            <p className="overview-text">Audited statement of expenditure excluding salary component.</p>
                            <a href="#expenditure" className="mini-link">View Financial Metric <FaArrowRight /></a>
                        </div>
                    </div>
                </div>

                {/* Extended Profile Categories */}
                <div className="extended-profile-sections">
                    {extendedProfileCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            id={category.id}
                            className="criterion-card-wrapper mb-8"
                            {...fadeInUp}
                        >
                            {/* Category Header */}
                            <div className="criterion-card-header open" style={{ cursor: 'default' }}>
                                <div className="header-left">
                                    <div 
                                        className="criterion-badge-3d" 
                                        style={{ background: category.color }}
                                    >
                                        <span style={{ fontSize: '1.4rem', color: '#ffffff' }}>{category.icon}</span>
                                    </div>
                                    <div className="header-text-group">
                                        <h3 className="criterion-heading">{category.categoryTitle}</h3>
                                        <p className="criterion-subdesc">{category.categorySubtitle}</p>
                                    </div>
                                </div>
                                <div className="header-right">
                                    <span className="metrics-counter-pill">
                                        {category.items.length} {category.items.length === 1 ? 'Metric' : 'Metrics'}
                                    </span>
                                </div>
                            </div>

                            {/* Category Body */}
                            <div className="criterion-card-body" style={{ paddingTop: '1.5rem' }}>
                                <div className="metric-items-list">
                                    {category.items.map((item, idx) => (
                                        <div key={idx} className="metric-row-card">
                                            <div className="metric-id-column">
                                                <span className="metric-code-pill" style={{ minWidth: '75px', fontSize: '1.05rem' }}>
                                                    {item.metric}
                                                </span>
                                            </div>
                                            <div className="metric-parameter-column">
                                                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                                                    {item.parameter}
                                                </h4>
                                                <p className="parameter-description" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="metric-action-column" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                                <button
                                                    onClick={(e) => handleViewPdf(e, item.link)}
                                                    className="btn-view-document"
                                                    title={`Preview PDF for Metric ${item.metric}`}
                                                >
                                                    <FaEye className="pdf-icon" style={{ color: 'var(--secondary)' }} />
                                                    <span>Quick Preview</span>
                                                </button>
                                                <a 
                                                    href={item.link} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    className="btn-view-document"
                                                    style={{ background: 'var(--secondary)', color: '#0b0f19', borderColor: 'var(--secondary)' }}
                                                    title={`Open PDF in new tab for Metric ${item.metric}`}
                                                >
                                                    <FaFilePdf className="pdf-icon" style={{ color: '#0b0f19' }} />
                                                    <span>View PDF</span>
                                                    <FaExternalLinkAlt className="ext-icon" style={{ opacity: 0.9 }} />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Help Banner */}
                <div className="search-filter-card mt-10 text-center" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                        Looking for Criterion-Wise Documents?
                    </h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
                        Explore our complete NAAC SSR documentation across all 7 criteria or view the Data Validation and Verification (DVV) clarifications.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="/naac" className="btn btn-primary" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
                            <FaLeaf style={{ marginRight: '6px' }} /> View 7 Criteria Documentation
                        </a>
                        <a href="/naac-dvv-clarifications" className="btn btn-warning" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
                            <FaCheckCircle style={{ marginRight: '6px' }} /> DVV Clarification Matrix
                        </a>
                    </div>
                </div>

            </div>

            {/* Document Modal */}
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
                                    <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Extended Profile Documentation</h3>
                                </div>
                                <button className="close-btn" onClick={() => setPdfUrl(null)} title="Close">&times;</button>
                            </div>
                            <div className="pdf-modal-body">
                                <iframe
                                    src={pdfUrl}
                                    title="Extended Profile PDF Document"
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

export default NaacExtendedProfile;
