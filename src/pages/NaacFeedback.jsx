import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaLeaf, FaComments } from "react-icons/fa";
import "./inner1.css";

const NaacFeedback = () => {
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

    const feedbackLinks = [
        { stakeholder: "Students", metric: "1.4.1", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf" },
        { stakeholder: "Teachers", metric: "1.4.1", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf" },
        { stakeholder: "Employers", metric: "1.4.1", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf" },
        { stakeholder: "Alumni", metric: "1.4.1", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf" },
    ];

    return (
        <div className="naac-page">
            <SEO
                title="Stakeholders Feedback | NAAC | EASA College"
                description="Review the feedback obtained from students, teachers, employers, and alumni for institutional improvement."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-feedback"
                defaultTitle="Stakeholders Feedback"
                defaultSubtitle="Your voice helps us grow and improve"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
            />

            {/* PDF Modal */}
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
                                <h3>Document Viewer</h3>
                                <button className="close-btn" onClick={() => setPdfUrl(null)}>&times;</button>
                            </div>
                            <div className="pdf-modal-body">
                                <iframe
                                    src={pdfUrl}
                                    title="PDF Viewer"
                                    className="pdf-iframe"
                                />
                            </div>
                            <div className="pdf-modal-footer">
                                <a href={pdfUrl} target="_blank" rel="noreferrer" className="view-btn">
                                    Open in New Tab
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Menu */}
            <section className="scroll-menu-container">
                <ul className="scroll-menu-list">
                    <li className="ssr-link-item"><a href="https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/ssr.pdf" target="_blank" rel="noreferrer">SSR</a></li>
                    <li><a href="/naac-dvv-clarifications"><FaLeaf className="menu-icon" /> DVV Clarification</a></li>
                    <li><a href="/naac-extended-profile"><FaLeaf className="menu-icon" /> Extended Profile</a></li>
                    <li><a href="/naac-committee"><FaLeaf className="menu-icon" /> Committees</a></li>
                    <li><a href="/naac-distinction"><FaLeaf className="menu-icon" /> Distinction</a></li>
                    <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                    <li><a href="/naac-feedback" className="active"><FaLeaf className="menu-icon" /> Feedback</a></li>
                    <li><a href="/naac-rti"><FaLeaf className="menu-icon" /> RTI</a></li>
                </ul>
            </section>

            <div className="container naac-content mt-5 mb-5">
                <motion.div className="row justify-content-center" {...fadeInUp}>
                    <div className="col-lg-10">
                        <div className="criterion-section">
                            <div className="criterion-header">
                                <FaComments className="header-icon" />
                                <h3>Feedback Analysis & Action Taken Report</h3>
                            </div>

                            <div className="metric-box">
                                <div className="table-responsive">
                                    <table className="naac-table">
                                        <thead>
                                            <tr>
                                                <th>Stakeholder</th>
                                                <th>Metric Reference</th>
                                                <th>Link to Report</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feedbackLinks.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="parameter-text" style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>
                                                        {item.stakeholder} Feedback
                                                    </td>
                                                    <td className="metric-id">{item.metric}</td>
                                                    <td className="action-cell">
                                                        <button
                                                            onClick={(e) => handleViewPdf(e, item.link)}
                                                            className="view-btn"
                                                        >
                                                            <FaFilePdf style={{ marginRight: '8px' }} /> VIEW PDF
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-5 p-4 text-center glass-card">
                                <h5>Have something to share?</h5>
                                <p className="text-muted">We value your input. Please reach out to our IQAC cell for direct feedback.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default NaacFeedback;
