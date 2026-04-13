import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaExternalLinkAlt, FaAward, FaBuilding, FaLightbulb, FaTree } from "react-icons/fa";

const nirfDocuments = [
    {
        id: 1,
        category: "Overall",
        year: "2026",
        icon: <FaAward size={32} />,
        description: "National Institutional Ranking Framework (NIRF) 2026 - Overall Institutional Ranking Participation.",
        link: "src/assets/pdfs/nirf/Overall.pdf",
        color: "#4F46E5"
    },
    {
        id: 2,
        category: "Engineering",
        year: "2026",
        icon: <FaBuilding size={32} />,
        description: "National Institutional Ranking Framework (NIRF) 2026 - Engineering Discipline Ranking Participation.",
        link: "src/assets/pdfs/nirf/Engg.pdf",
        color: "#10B981"
    },
    {
        id: 3,
        category: "Innovation",
        year: "2026",
        icon: <FaLightbulb size={32} />,
        description: "National Institutional Ranking Framework (NIRF) 2026 - Innovation Ranking Participation.",
        link: "src/assets/pdfs/nirf/Innovation.pdf",
        color: "#F59E0B"
    },
    {
        id: 4,
        category: "Sustainable Institution",
        year: "2026",
        icon: <FaTree size={32} />,
        description: "National Institutional Ranking Framework (NIRF) 2026 - Sustainable Institution Ranking Participation.",
        link: "src/assets/pdfs/nirf/SDG.pdf",
        color: "#EF4444"
    }
]; 

const NirfPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <div style={{ background: "var(--bg-main)", minHeight: "100vh", color: "var(--text-main)" }}>
            <SEO 
                title="NIRF 2026 | EASA College" 
                description="National Institutional Ranking Framework (NIRF) 2026 documents for EASA College, including Engineering, Overall, Innovation, and Sustainable Institution categories." 
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero 
                pageKey="nirf"
                defaultTitle="NIRF 2026"
                defaultSubtitle="National Institutional Ranking Framework - Participation & Ranking Details"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
            />

            <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" }}>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "4rem" }}
                >
                    <h2 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "1.5rem" }}>
                        NIRF <span style={{ color: "var(--primary)" }}>Participation Documents</span>
                    </h2>
                    <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
                        EASA College of Engineering and Technology is committed to academic excellence and transparency. 
                        Explore our NIRF 2026 participation documents across various categories here.
                    </p>
                </motion.div>

                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                    gap: "2.5rem" 
                }}>
                    {nirfDocuments.map((doc, index) => (
                        <motion.div
                            key={doc.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            style={{
                                background: "var(--bg-card)",
                                borderRadius: "24px",
                                padding: "2.5rem",
                                border: "1px solid var(--glass-border)",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                transition: "all 0.3s ease",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* Accent line */}
                            <div style={{ 
                                position: "absolute", 
                                top: 0, 
                                left: 0, 
                                width: "100%", 
                                height: "6px", 
                                background: doc.color 
                            }} />

                            <div>
                                <div style={{ 
                                    width: "65px", 
                                    height: "65px", 
                                    background: `${doc.color}15`, 
                                    color: doc.color,
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "1.5rem"
                                }}>
                                    {doc.icon}
                                </div>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>{doc.category}</h3>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                                    {doc.description}
                                </p>
                            </div>

                            <a 
                                href={doc.link} 
                                target="_blank" 
                                rel="noreferrer" 
                                style={{ 
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    padding: "1rem",
                                    background: "var(--glass)",
                                    border: "1px solid var(--glass-border)",
                                    color: "var(--text-main)",
                                    borderRadius: "12px",
                                    fontWeight: "600",
                                    transition: "all 0.2s ease"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = doc.color;
                                    e.currentTarget.style.color = "white";
                                    e.currentTarget.style.borderColor = doc.color;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = "var(--glass)";
                                    e.currentTarget.style.color = "var(--text-main)";
                                    e.currentTarget.style.borderColor = "var(--glass-border)";
                                }}
                            >
                                <FaFilePdf size={18} />
                                View Document
                                <FaExternalLinkAlt size={12} style={{ opacity: 0.6 }} />
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ 
                        marginTop: "6rem", 
                        background: "var(--primary)", 
                        borderRadius: "32px", 
                        padding: "4rem", 
                        textAlign: "center", 
                        color: "white",
                        boxShadow: "0 30px 60px rgba(var(--primary-rgb), 0.2)"
                    }}
                >
                    <h3 style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "1.5rem" }}>Seeking More Information?</h3>
                    <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 2.5rem" }}>
                        If you have any questions regarding our NIRF rankings or would like to request more data, please feel free to contact our administrative office.
                    </p>
                    <button 
                        onClick={() => setShowAdmissionForm(true)}
                        style={{
                            padding: "1.2rem 3rem",
                            background: "white",
                            color: "var(--primary)",
                            border: "none",
                            borderRadius: "16px",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                            transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        Contact Admissions
                    </button>
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

export default NirfPage;
