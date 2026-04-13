import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api';
import useScrollAnimation from '../hooks/useScrollAnimation';
import AdmissionForm from '../components/AdmissionForm';

function PrincipalPage() {
    useScrollAnimation();
    const [principal, setPrincipal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/management-team?category=principal`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setPrincipal(data[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching principal info:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Principal | EASA College" description="Message from the Principal of EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="principal"
                defaultTitle="Principal's Message"
                defaultSubtitle="Leadership committed to academic and research excellence."
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                {principal ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                        {/* Profile Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ position: 'sticky', top: '100px' }}
                        >
                            <div style={{
                                width: '100%',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src={principal.image_url}
                                    alt={principal.name}
                                    style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(principal.name)}&background=3E3E7E&color=fff&size=500`;
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{principal.name}</h2>
                                <p style={{ fontSize: '1.1rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{principal.designation}</p>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                background: 'var(--bg-card)',
                                padding: '3.5rem',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                            }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--text-highlight)' }}>Academic Leadership & Vision</h3>
                                <div
                                    style={{
                                        color: 'var(--text-muted)',
                                        lineHeight: '2',
                                        fontSize: '1.15rem',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: principal.message }}
                                />
                            </div>

                            {/* Additional Stats/Info if needed */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
                                <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Experience</h4>
                                    <p style={{ fontWeight: '800', fontSize: '1.2rem' }}>25+ Years</p>
                                </div>
                                <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Focus Area</h4>
                                    <p style={{ fontWeight: '800', fontSize: '1.2rem' }}>Research & Innovation</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <h2>Principal Information Not Available</h2>
                        <p>The content is being updated. Please check back later.</p>
                    </div>
                )}
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default PrincipalPage;
