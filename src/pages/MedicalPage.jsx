
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaUserMd, FaAmbulance, FaHeartbeat, FaFirstAid, FaProcedures } from 'react-icons/fa';
import { FaKitMedical } from 'react-icons/fa6';

function MedicalPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "24/7 Medical Assistance",
        "Qualified Medical Officer on Duty",
        "Basic First-Aid & Emergency Care",
        "Emergency Ambulance Service",
        "Regular Health Check-up Camps",
        "Tie-ups with nearby Multi-specialty Hospitals"
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Health & First Aid Center | EASA College" description="Ensuring the well-being of our students with 24/7 medical support and first aid facilities." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="medical"
                defaultTitle="Health Center"
                defaultSubtitle="Prioritizing your well-being with round-the-clock medical care."
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
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px', background: 'rgba(235, 87, 87, 0.1)', color: '#EB5757', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(235, 87, 87, 0.2)' }}>
                            <FaHeartbeat style={{ marginRight: '8px' }} /> WELLNESS FIRST
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Caring for the <span className="text-gradient">Campus Community</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            The health and safety of our students and staff are of paramount importance.
                            The EASA Health Center is equipped to handle day-to-day medical needs and emergency situations.
                            With a dedicated medical officer and support staff, we ensure that immediate care is always available on campus.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            {features.map((feature, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '1rem', fontWeight: '500' }}>
                                    <FaFirstAid style={{ color: '#EB5757', flexShrink: 0 }} /> {feature}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-section)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EB5757' }}>
                                <FaAmbulance size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>Emergency Response</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Ambulance available 24/7 for critical cases.</p>
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
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
                                alt="Medical Center"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaUserMd size={30} style={{ color: '#EB5757' }} />
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '800' }}>Medical Center</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Located in Block C</p>
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
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>"Your Health, Our Priority"</p>
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

export default MedicalPage;
