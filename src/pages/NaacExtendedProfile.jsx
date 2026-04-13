import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaLeaf, FaInfoCircle } from "react-icons/fa";
import "./inner1.css";

const profileData = [
    { metric: "1.1", parameter: "Number of students year wise during the last five years", link: "/assets/naac/dvv-clarification/extended-profile/1.1/viewpage.pdf" },
    { metric: "2.1", parameter: "Number of teaching staff / full time teachers during the last five years (Without repeat count)", link: "/assets/naac/dvv-clarification/extended-profile/2.1/viewpage.pdf" },
    { metric: "2.2", parameter: "Number of teaching staff / full time teachers year wise during the last five years", link: "/assets/naac/dvv-clarification/extended-profile/2.2/viewpage.pdf" },
    { metric: "3.1", parameter: "Expenditure excluding salary component year wise during the last five years (INR in lakhs)", link: "/assets/naac/dvv-clarification/extended-profile/3.1/viewpage.pdf" }
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
                title="Extended Profile | NAAC | EASA College"
                description="Extended profile documentation for National Assessment and Accreditation Council (NAAC) at EASA College."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-extended-profile"
                defaultTitle="Extended Profile"
                defaultSubtitle="Institutional data and verification profiles"
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
                    <li className="ssr-link-item"><a href="/assets/naac/ssr.pdf" target="_blank" rel="noreferrer">SSR</a></li>
                    <li><a href="/naac-dvv-clarifications"><FaLeaf className="menu-icon" /> DVV Clarification</a></li>
                    <li><a href="/naac-extended-profile" className="active"><FaLeaf className="menu-icon" /> Extended Profile</a></li>
                    <li><a href="/naac-committee"><FaLeaf className="menu-icon" /> Committees</a></li>
                    <li><a href="/naac-distinction"><FaLeaf className="menu-icon" /> Distinction</a></li>
                    <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                    <li><a href="/naac-feedback"><FaLeaf className="menu-icon" /> Feedback</a></li>
                    <li><a href="/naac-rti"><FaLeaf className="menu-icon" /> RTI</a></li>
                </ul>
            </section>

            <div className="container naac-content mt-5 mb-5">
                <motion.section className="criterion-section" {...fadeInUp}>
                    <div className="criterion-header">
                        <FaInfoCircle className="header-icon" />
                        <h3>Extended Profile</h3>
                    </div>

                    <div className="metric-box">
                        <div className="table-responsive">
                            <table className="naac-table">
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>Parameter</th>
                                        <th>Document</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profileData.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="metric-id">{item.metric}</td>
                                            <td className="parameter-text">{item.parameter}</td>
                                            <td className="action-cell">
                                                <button onClick={(e) => handleViewPdf(e, item.link)} className="view-btn">
                                                    <FaFilePdf style={{ marginRight: '8px' }} /> VIEW
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.section>
            </div>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default NaacExtendedProfile;
