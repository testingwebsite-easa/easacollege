import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaSpa, FaLeaf, FaYinYang, FaPeace } from 'react-icons/fa';

function YogaPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const benefits = [
        { title: "Mental Clarity", desc: "Enhances focus and concentration for better academic performance." },
        { title: "Stress Reduction", desc: "Helps manage academic pressure and anxiety." },
        { title: "Physical Flexibility", desc: "Improves posture and reduces physical strain from long study hours." },
        { title: "Holistic Health", desc: "Promotes overall well-being and emotional balance." }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Yoga & Meditation Center | EASA College" description="Find inner peace and balance at EASA College's Yoga & Meditation Center, fostering holistic student development." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="yoga"
                defaultTitle="Yoga & Meditation"
                defaultSubtitle="Harmonizing mind, body, and spirit for a balanced life."
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>

                    {/* Image Side - Order swapped for variety if desired, but sticking to standard logic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            position: 'relative',
                            borderRadius: '50% 50% 0 0', // Arch shape
                            overflow: 'hidden',
                            height: '550px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Yoga Session"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '-20px',
                            background: 'var(--bg-card)',
                            padding: '2rem',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            maxWidth: '280px'
                        }}>
                            <FaYinYang size={32} style={{ color: 'var(--secondary)' }} />
                            <div>
                                <h4 style={{ fontWeight: '700', fontSize: '1.1rem' }}>Daily Sessions</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Morning & Evening Classes</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px', background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(46, 204, 113, 0.2)' }}>
                            <FaLeaf style={{ marginRight: '8px' }} /> SERENITY & PEACE
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Cultivate <span className="text-gradient">Inner Peace</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                            The Yoga and Meditation Center at EASA College offers a tranquil sanctuary for students and staff to unwind and rejuvenate. Regular yoga sessions are conducted to promote physical flexibility, mental clarity, and emotional stability, which are crucial for a well-rounded academic life.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                            {benefits.map((benefit, index) => (
                                <div key={index} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ color: 'var(--secondary)', marginBottom: '0.8rem' }}>
                                        <FaSpa size={22} />
                                    </div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{benefit.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{benefit.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <blockquote style={{ borderLeft: '4px solid var(--secondary)', paddingLeft: '1.5rem', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                                "Yoga is the journey of the self, through the self, to the self."
                                <footer style={{ fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: '600', color: 'var(--text-main)' }}>- The Bhagavad Gita</footer>
                            </blockquote>
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

export default YogaPage;
