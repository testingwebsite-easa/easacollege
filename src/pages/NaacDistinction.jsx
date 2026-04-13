import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaLeaf, FaAward } from "react-icons/fa";
import "./inner1.css";

const NaacDistinction = () => {
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
                title="Institutional Distinctiveness | NAAC | EASA College"
                description="Explore the unique and distinctive features of EASA College of Engineering and Technology."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-distinction"
                defaultTitle="Institutional Distinctiveness"
                defaultSubtitle="Defining excellence through unique institutional features"
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
                    <li><a href="/naac-extended-profile"><FaLeaf className="menu-icon" /> Extended Profile</a></li>
                    <li><a href="/naac-committee"><FaLeaf className="menu-icon" /> Committees</a></li>
                    <li><a href="/naac-distinction" className="active"><FaLeaf className="menu-icon" /> Distinction</a></li>
                    <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                    <li><a href="/naac-feedback"><FaLeaf className="menu-icon" /> Feedback</a></li>
                    <li><a href="/naac-rti"><FaLeaf className="menu-icon" /> RTI</a></li>
                </ul>
            </section>

            <div className="container naac-content mt-5 mb-5">
                <motion.div className="row justify-content-center" {...fadeInUp}>
                    <div className="col-lg-10">
                        <div className="criterion-section">
                            <div className="criterion-header">
                                <FaAward className="header-icon" />
                                <h3>Institutional Distinctiveness</h3>
                            </div>

                            <div className="metric-box p-5 text-center">
                                <div className="distinctive-card">
                                    <div className="icon-wrapper mb-4">
                                        <FaAward size={60} color="var(--secondary)" />
                                    </div>
                                    <h2 className="mb-4">Our Unique Identity</h2>
                                    <p className="lead mb-5 text-muted">
                                        EASA College of Engineering and Technology is committed to providing quality education
                                        and fostering an environment of innovation and excellence.
                                    </p>

                                    <div className="document-action-box">
                                        <button
                                            onClick={(e) => handleViewPdf(e, "/assets/naac/inst dist.pdf")}
                                            className="view-btn-large"
                                        >
                                            <FaFilePdf style={{ marginRight: '12px' }} />
                                            VIEW INSTITUTIONAL DISTINCTIVENESS DOCUMENT
                                        </button>
                                    </div>
                                </div>
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

export default NaacDistinction;
