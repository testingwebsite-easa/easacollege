import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaArrowRight, FaGraduationCap, FaCheckCircle, FaAward, FaUniversity } from 'react-icons/fa';
import Tilt3DCard from './Tilt3DCard';
import AdmissionForm from './AdmissionForm';

const AdmissionCTA = ({ onApplyClick }) => {
    const [showInternalModal, setShowInternalModal] = useState(false);

    const handleApply = () => {
        if (onApplyClick) {
            onApplyClick();
        } else {
            setShowInternalModal(true);
        }
    };

    return (
        <>
            <section
                className="admission-cta-section"
                style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, #1e1b4b 100%)',
                    padding: 'clamp(3rem, 5vw, 6rem) 2rem',
                    marginTop: '0',
                    position: 'relative',
                    overflow: 'hidden',
                    borderTop: '1px solid var(--glass-border)'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--secondary)',
                    opacity: 0.06,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    pointerEvents: 'none'
                }} />

                <div className="container cta-flex" style={{
                    maxWidth: '1300px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '3rem',
                    position: 'relative',
                    zIndex: 1,
                    color: 'white'
                }}>
                    <div style={{ textAlign: 'left', maxWidth: '720px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '1.5rem' }}>
                            {/* 3D Glowing Admissions Open Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="badge-3d-offer"
                                title="Admissions Open 2025-26"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    padding: '0.4rem 1.2rem',
                                    borderRadius: '30px',
                                    background: 'rgba(230, 182, 39, 0.15)',
                                    border: '1px solid rgba(230, 182, 39, 0.35)',
                                    color: 'var(--secondary)',
                                    fontWeight: '800',
                                    fontSize: '0.88rem',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                <span style={{
                                    background: 'var(--secondary)',
                                    color: '#000',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '900'
                                }}>
                                    ADMISSIONS OPEN
                                </span>
                                <span>Academic Year 2026 - 2027</span>
                            </motion.div>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            style={{
                                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                                fontWeight: '900',
                                lineHeight: '1.15',
                                marginBottom: '1.2rem',
                                color: '#ffffff'
                            }}
                        >
                            Shape Your Future with <span style={{ color: 'var(--secondary)' }}>EASA College</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{
                                fontSize: '1.15rem',
                                color: 'rgba(255, 255, 255, 0.85)',
                                lineHeight: '1.7',
                                maxWidth: '640px',
                                marginBottom: '1.8rem'
                            }}
                        >
                            Join our vibrant community of innovators, engineers, and change-makers. Experience autonomous academic excellence, advanced research labs, and top-tier career placements.
                        </motion.p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaCheckCircle style={{ color: 'var(--secondary)' }} />
                                <span>AICTE Approved & Anna Univ. Affiliated</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaCheckCircle style={{ color: 'var(--secondary)' }} />
                                <span>NAAC Accredited Autonomous Institution</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaCheckCircle style={{ color: 'var(--secondary)' }} />
                                <span>100% Placement Assistance</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        style={{ minWidth: '350px' }}
                        className="cta-card-wrapper"
                    >
                        <Tilt3DCard
                            maxTilt={6}
                            glareOpacity={0.18}
                            style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                padding: '2.5rem',
                                borderRadius: '28px',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.8rem',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(230, 182, 39, 0.15)'
                            }}
                            className="cta-card card-3d-subtle"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', transform: 'translateZ(20px)' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: 'var(--secondary)',
                                    color: '#000000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.4rem',
                                    boxShadow: '0 8px 20px rgba(230, 182, 39, 0.35)',
                                    flexShrink: 0
                                }}>
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.7)', marginBottom: '3px' }}>
                                        Admission Hotline
                                    </div>
                                    <a
                                        href="tel:+917373732569"
                                        style={{ fontSize: '1.6rem', fontWeight: '900', color: '#ffffff', textDecoration: 'none' }}
                                    >
                                        +91 73737 32569
                                    </a>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleApply}
                                className="btn-3d"
                                style={{
                                    padding: '1.1rem',
                                    fontSize: '1.05rem',
                                    fontWeight: '800',
                                    borderRadius: '14px',
                                    background: 'var(--secondary)',
                                    color: '#000000',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: '0.3s',
                                    transform: 'translateZ(25px)',
                                    boxShadow: '0 10px 25px rgba(217, 119, 6, 0.35)'
                                }}
                            >
                                Apply Online Now <FaArrowRight />
                            </motion.button>
                        </Tilt3DCard>
                    </motion.div>
                </div>

                <style>{`
                    @media (max-width: 1024px) {
                        .cta-flex { flex-direction: column !important; text-align: center !important; gap: 3.5rem !important; }
                        div[style*="textAlign: 'left'"] { text-align: center !important; display: flex !important; flex-direction: column !important; align-items: center !important; }
                        .cta-card-wrapper { width: 100% !important; min-width: 0 !important; }
                        .cta-card { width: 100% !important; min-width: 0 !important; padding: 2rem !important; }
                    }
                `}</style>
            </section>

            {/* BUILT-IN ADMISSION MODAL IF TRIGGERED LOCALLY */}
            <AdmissionForm
                isOpen={showInternalModal}
                onClose={() => setShowInternalModal(false)}
            />
        </>
    );
};

export default AdmissionCTA;
