import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import GlobalHero from '../components/GlobalHero';

const VirtualTourPage = () => {
    const [tourData, setTourData] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/virtual-tour`)
            .then(res => res.json())
            .then(data => setTourData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
            <SEO title="Virtual Tour" description="Take a 360-degree virtual tour of the EASA College campus." />
            <Navbar />

            <GlobalHero
                pageKey="virtual-tour"
                defaultTitle="Virtual Tour"
                defaultSubtitle={tourData?.description || "Explore our campus from anywhere in the world."}
                defaultImage={null}
            />

            <div className="container" style={{ flexGrow: 1, padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        flexGrow: 1, position: 'relative', width: '100%', minHeight: '70vh',
                        background: 'var(--bg-card)', borderRadius: '32px', overflow: 'hidden',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.1)', border: '1px solid var(--glass-border)'
                    }}
                >
                    {tourData?.tourUrl ? (
                        <iframe
                            src={tourData.tourUrl}
                            title="Campus Virtual Tour"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-section)', color: 'var(--text-muted)', flexDirection: 'column', gap: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                            <p style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '2px', textTransform: 'uppercase' }}>360° Tour Loading...</p>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, textAlign: 'center', maxWidth: '400px', padding: '0 2rem' }}>Our virtual tour is being updated. Explore our campus highlights below.</p>
                        </div>
                    )}
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default VirtualTourPage;
