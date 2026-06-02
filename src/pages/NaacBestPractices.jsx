import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaLeaf, FaStar } from "react-icons/fa";
import "./inner1.css";

const NaacBestPractices = () => {
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

    const practices = [
        {
            title: "Best Practice - I",
            subtitle: "Innovative Teaching & Learning Process",
            link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/Best Practice 1.pdf",
            color: "#e6b627"
        },
        {
            title: "Best Practice - II",
            subtitle: "Holistic Development through Community Engagement",
            link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/Best Practice 2.pdf",
            color: "#4ade80"
        },
        {
            title: "Summary Document",
            subtitle: "Overview of Institutional Best Practices",
            link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/best-practices.pdf",
            color: "#60a5fa"
        }
    ];

    return (
        <div className="naac-page">
            <SEO
                title="Best Practices | NAAC | EASA College"
                description="Explore the best practices implemented at EASA College for quality enhancement in education."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-best-practices"
                defaultTitle="Best Practices"
                defaultSubtitle="Striving for continuous improvement and excellence"
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
                    <li><a href="/naac-best-practices" className="active"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                    <li><a href="/naac-feedback"><FaLeaf className="menu-icon" /> Feedback</a></li>
                    <li><a href="/naac-rti"><FaLeaf className="menu-icon" /> RTI</a></li>
                </ul>
            </section>

            <div className="container naac-content mt-5 mb-5">
                <div className="row g-4">
                    {practices.map((practice, idx) => (
                        <div key={idx} className="col-md-4">
                            <motion.div
                                className="practice-card"
                                {...fadeInUp}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="practice-card-header" style={{ borderColor: practice.color }}>
                                    <FaStar color={practice.color} />
                                    <h4>{practice.title}</h4>
                                </div>
                                <div className="practice-card-body">
                                    <p>{practice.subtitle}</p>
                                    <button
                                        onClick={(e) => handleViewPdf(e, practice.link)}
                                        className="view-btn w-100 mt-3"
                                    >
                                        <FaFilePdf style={{ marginRight: '8px' }} /> VIEW DOCUMENT
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default NaacBestPractices;
