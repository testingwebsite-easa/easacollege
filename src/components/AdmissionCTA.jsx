import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaArrowRight } from 'react-icons/fa';

const AdmissionCTA = ({ onApplyClick }) => {
    return (
        <section style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1e1b4b 100%)',
            padding: 'clamp(3rem, 5vw, 6rem) 2rem',
            marginTop: '0',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid var(--glass-border)'
        }}>
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '50%',
                filter: 'blur(100px)'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'var(--secondary)',
                opacity: 0.05,
                borderRadius: '50%',
                filter: 'blur(80px)'
            }} />

            <div className="container cta-flex" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1,
                color: 'white'
            }}>
                <div style={{ textAlign: 'left', maxWidth: '700px' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        Admissions Open 2025-26
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '900',
                            lineHeight: '1.1',
                            marginBottom: '1.5rem',
                        }}
                    >
                        Shape Your Future with <span style={{ color: 'var(--secondary)' }}>EASA College</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{
                            fontSize: '1.25rem',
                            opacity: 0.8,
                            lineHeight: '1.6',
                            maxWidth: '600px'
                        }}
                    >
                        Join our vibrant community of innovators, leaders, and change-makers. Excellence begins here.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '3rem',
                        borderRadius: '32px',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        minWidth: '350px'
                    }}
                    className="cta-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary)', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                            <FaPhoneAlt />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, marginBottom: '4px' }}>Admission Hotline</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '900' }}>+91 93426 28013</div>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onApplyClick}
                        style={{
                            padding: '1.2rem',
                            fontSize: '1.1rem',
                            fontWeight: '800',
                            borderRadius: '16px',
                            background: 'white',
                            color: 'var(--primary)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: '0.3s'
                        }}
                    >
                        Apply Online Now <FaArrowRight />
                    </motion.button>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .cta-flex { flex-direction: column !important; text-align: center !important; gap: 4rem !important; }
                    div[style*="textAlign: 'left'"] { text-align: center !important; display: flex !important; flexDirection: column !important; alignItems: center !important; }
                    .cta-card { width: 100% !important; min-width: 0 !important; padding: 2.5rem !important; }
                }
            `}</style>
        </section>
    );
};

export default AdmissionCTA;
