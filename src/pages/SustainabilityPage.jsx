import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function SustainabilityPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/sustainability`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) setPageData(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Sustainability | EASA College" description="Our commitment to environmental sustainability and a greener future through innovative initiatives." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="sustainability"
                defaultTitle="Sustainability"
                defaultSubtitle="Commitment to a greener and sustainable future."
                defaultImage={pageData?.heroImage}
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}
                >
                    {pageData ? (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: pageData.description }} style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)', marginBottom: '3.5rem', whiteSpace: 'pre-wrap' }} />

                            {pageData.initiatives && pageData.initiatives.length > 0 && (
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3.5rem' }}>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '2.5rem' }}>Our Initiatives</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                        {pageData.initiatives.map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -5 }}
                                                style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}
                                            >
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>{item.title}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>{item.desc || item.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div className="loading-spinner" style={{ border: '4px solid var(--glass-border)', borderTop: '4px solid var(--secondary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading sustainability initiatives...</p>
                        </div>
                    )}
                </motion.div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                    .container > div { padding: 2.5rem 1.5rem !important; }
                    h2 { fontSize: 2rem !important; }
                }
            `}</style>
        </div>
    );
}

export default SustainabilityPage;
