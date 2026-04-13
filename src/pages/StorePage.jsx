
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaStore, FaBook, FaPrint, FaCoffee, FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

function StorePage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "Academic Textbooks & Reference Materials",
        "Stationery & Art Supplies",
        "High-Speed Printing & Xerox",
        "College Merchandise & Apparel",
        "Snacks & Refreshments",
        "Binding & Project Report Services"
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Campus Store | EASA College" description="Essentials at your fingertips. From books to snacks, the EASA Campus Store has it all." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="store"
                defaultTitle="Campus Store"
                defaultSubtitle="Your one-stop shop for academic essentials and daily needs."
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
                            <FaShoppingBag style={{ marginRight: '8px' }} /> CONVENIENCE ON CAMPUS
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Everything You Need <span className="text-gradient">Right Here</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            The EASA Campus Store is designed to cater to the diverse needs of our students and faculty.
                            Located centrally within the campus, it saves you time and effort by providing easy access to
                            academic resources, stationery, and refreshments. Whether you need a notebook for your next class
                            or a quick snack break, we've got you covered.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>
                                    <FaCheckCircle style={{ color: 'var(--secondary)', flexShrink: 0 }} /> {feature}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-section)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <FaStore size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Store Timings</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Mon - Sat: 8:30 AM - 5:30 PM</p>
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
                                src="https://images.unsplash.com/photo-1556740649-175911c7284a?q=80&w=2070&auto=format&fit=crop"
                                alt="Campus Store"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaBook size={30} style={{ color: 'var(--secondary)' }} />
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '800' }}>Student Store</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Located near the Main Block</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            right: '-20px',
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            maxWidth: '180px',
                            zIndex: 10
                        }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>"Quality Supplies for Quality Education"</p>
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

export default StorePage;
