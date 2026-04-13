import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaDumbbell, FaHeartbeat, FaClock, FaCheckCircle } from 'react-icons/fa';

function GymPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "State-of-the-art Cardio Equipment",
        "Free Weights & Resistance Training Area",
        "Certified Fitness Trainers",
        "Personalized Workout Plans",
        "Locker & Shower Facilities",
        "Open 7 Days a Week"
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Fitness Center & Gym | EASA College" description="Stay fit and healthy at EASA College's modern gymnasium equipped with the latest fitness gear." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="gym"
                defaultTitle="Fitness Center"
                defaultSubtitle="Empowering mind and body through physical excellence."
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
                            <FaHeartbeat style={{ marginRight: '8px' }} /> HEALTH IS WEALTH
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            World-Class <span className="text-gradient">Fitness Facilities</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            At EASA College, we believe that physical fitness is essential for academic success. Our on-campus gymnasium provides students and faculty with a comprehensive range of equipment to maintain a healthy lifestyle. Whether you are a beginner or a fitness enthusiast, our facility caters to all levels.
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
                                <FaClock size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Opening Hours</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Mon - Sat: 5:00 AM - 9:00 AM | 5:00 PM - 8:00 PM</p>
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
                                src="https://easa-college.s3.eu-north-1.amazonaws.com/images/DSC08490.JPG"
                                alt="Students in Gym"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaDumbbell size={30} style={{ color: 'var(--secondary)' }} />
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '800' }}>Student Gym</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Located near the Sports Complex</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating element */}
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
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>"Train Hard, Study Hard"</p>
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

export default GymPage;
