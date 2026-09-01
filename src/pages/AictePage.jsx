import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFileAlt, FaCertificate, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdmissionForm from '../components/AdmissionForm';
import { useTheme } from '../context/ThemeContext';

const AictePage = () => {
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
                title="AICTE Approval | EASA College" 
                description="Information about AICTE approvals and mandatory disclosures for EASA College." 
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero 
                pageKey="aicte-approval"
                defaultTitle="AICTE Approvals"
                defaultSubtitle="Committed to Quality Technical Education and National Accreditation Standards"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp" 
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: cardBg, 
                        borderRadius: '32px', 
                        padding: '3.5rem', 
                        border: cardBorder, 
                        boxShadow: cardShadow,
                        marginBottom: '4rem'
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <span style={{
                                padding: '0.4rem 1.2rem',
                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                color: accentColor,
                                borderRadius: '50px',
                                fontSize: '0.82rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                display: 'inline-block',
                                marginBottom: '1rem'
                            }}>
                                Accreditation & Compliance
                            </span>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginBottom: '1.2rem' }}>
                                AICTE Mandatory Disclosures
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: secondaryTextColor, lineHeight: '1.8', marginBottom: '2rem' }}>
                                EASA College of Engineering and Technology is approved by the All India Council for Technical Education (AICTE), New Delhi, for conducting technical courses across all undergraduate and postgraduate engineering disciplines.
                            </p>
                            
                            <Link to="/aicte-eoa" style={{ textDecoration: 'none' }}>
                                <motion.div 
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '1.1rem 2.2rem',
                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                        color: '#ffffff',
                                        borderRadius: '16px',
                                        fontWeight: '800',
                                        fontSize: '1rem',
                                        boxShadow: '0 10px 25px rgba(37,99,235,0.35)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaFileAlt size={18} />
                                    <span>View Extension of Approval (EOA)</span>
                                    <FaExternalLinkAlt size={13} style={{ opacity: 0.8 }} />
                                </motion.div>
                            </Link>
                        </div>
                        
                        <div style={{ textAlign: 'center', padding: '2.5rem', background: '#ffffff', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                           <img src="https://smcopharmacy.com/wp-content/uploads/2025/05/4-1.png" alt="AICTE Logo" style={{ width: '100%', maxWidth: '240px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.08))' }} />
                        </div>
                    </div>
                </motion.div>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default AictePage;
