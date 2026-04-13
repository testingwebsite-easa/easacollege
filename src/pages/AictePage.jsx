import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdmissionForm from '../components/AdmissionForm';

const AictePage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const approvals = [
        {
            title: "AICTE - All India Council for Technical Education",
            description: "EASA College of Engineering and Technology is approved by the All India Council for Technical Education (AICTE), New Delhi. This ensures that the college adheres to the high standards of technical education set by the national regulatory body.",
            image: "https://www.aicte-india.org/sites/default/files/logo_1.png"
        }
    ];

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
                defaultSubtitle="Committed to Quality Technical Education and Standards"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp" 
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: 'var(--bg-card)', 
                        borderRadius: '32px', 
                        padding: '4rem', 
                        border: '1px solid var(--glass-border)', 
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        marginBottom: '4rem'
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem' }}>AICTE Mandatory Disclosures</h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                                The college is approved by the All India Council for Technical Education (AICTE), New Delhi, for conducting technical courses. The approval is valid for all its undergraduate and postgraduate programs.
                            </p>
                            
                            <Link to="/aicte-eoa" style={{ textDecoration: 'none' }}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '1.2rem 2.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '16px',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        boxShadow: '0 10px 30px rgba(var(--primary-rgb), 0.3)'
                                    }}
                                >
                                    <FaFileAlt size={20} />
                                    View Extension of Approval (EOA)
                                    <FaExternalLinkAlt size={14} style={{ opacity: 0.6 }} />
                                </motion.div>
                            </Link>
                        </div>
                        
                        <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '32px', border: '1px solid #eee' }}>
                           <img src="https://smcopharmacy.com/wp-content/uploads/2025/05/4-1.png" alt="AICTE Logo" style={{ width: '100%', maxWidth: '250px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} />
                        </div>
                    </div>
                </motion.div>

                {/* Additional Sections can go here (e.g., Mandatory Disclosure PDF cards) */}
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default AictePage;
