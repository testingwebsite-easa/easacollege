
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaBus, FaMapMarkedAlt, FaClock, FaUserCheck, FaShieldAlt } from 'react-icons/fa';

function TransportPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "Extensive Fleet of College Buses",
        "Routes Covering All Major City Points",
        "GPS Tracking for Safety",
        "Experienced & Verified Drivers",
        "Regular Maintenance for Safety",
        "Affordable Transport Fee"
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Transport Facilities | EASA College" description="Safe and convenient transportation ensuring seamless connectivity for students and staff across the city." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="transport"
                defaultTitle="Transport Facilities"
                defaultSubtitle="Connecting you from home to campus safely and on time."
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px', background: 'rgba(230, 182, 39, 0.1)', color: 'var(--secondary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(230, 182, 39, 0.2)' }}>
                            <FaBus style={{ marginRight: '8px' }} /> SAFE & SECURE COMMUTE
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Your Journey <span className="text-gradient">Our Responsibility</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            EASA College operates a comprehensive fleet of buses to ensure hassle-free transportation
                            for students and staff from various parts of the city and surrounding suburbs.
                            Our transport service is designed to be safe, punctual, and comfortable, allowing students
                            to focus on their studies without worrying about their daily commute.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>
                                    <FaUserCheck style={{ color: 'var(--secondary)', flexShrink: 0 }} /> {feature}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-section)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <FaMapMarkedAlt size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Wide Coverage</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Covers 40+ Routes across Coimbatore & Palakkad</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            position: 'relative',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            height: '500px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
                                alt="College Bus"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaShieldAlt size={30} style={{ color: 'var(--secondary)' }} />
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '800' }}>Safe Transport</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Fleet of 30+ Buses</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default TransportPage;
