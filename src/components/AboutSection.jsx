import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap, FaUniversity } from 'react-icons/fa';

const AboutSection = () => {
    return (
        <section style={{ padding: '4rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'var(--secondary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'var(--primary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(80px)' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="about-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    background: 'var(--bg-card)',
                    borderRadius: '40px',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div className="about-grid">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                            <FaUniversity /> Excellence in Education
                        </div>
                        <h2 className="about-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '2rem' }}>
                            Crafting the Leaders of <span style={{ color: 'var(--secondary)' }}>Tomorrow</span>
                        </h2>
                        <p className="about-description" style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                            EASA College of Engineering and Technology, located in Coimbatore, is a premier institution dedicated to fostering innovation and excellence in technical education. With state-of-the-at infrastructure and a curriculum designed to meet industry standards, we empower students to become future-ready leaders.
                        </p>
                        <div className="about-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ minWidth: '40px', height: '40px', borderRadius: '10px', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}><FaGraduationCap /></div>
                                <div>
                                    <h4 style={{ color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>Holistic Growth</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>Balanced academic and extracurricular path.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ minWidth: '40px', height: '40px', borderRadius: '10px', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}><FaUniversity /></div>
                                <div>
                                    <h4 style={{ color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>Modern Campus</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>High-tech labs and research facilities.</p>
                                </div>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/institution'}
                            style={{ padding: '1.2rem 2.5rem', background: 'var(--secondary)', color: 'var(--bg-dark)', border: 'none', borderRadius: '50px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                            className="about-btn"
                        >
                            Explore Our Legacy <FaArrowRight size={14} />
                        </motion.button>
                    </div>

                    <div className="about-image-wrapper" style={{ position: 'relative' }}>
                        <div className="about-image-corner top-left" style={{ position: 'absolute', top: '-20px', left: '-20px', width: '120px', height: '120px', borderTop: '4px solid var(--secondary)', borderLeft: '4px solid var(--secondary)', borderRadius: '20px' }}></div>
                        <div className="about-image-corner bottom-right" style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '120px', height: '120px', borderBottom: '4px solid var(--secondary)', borderRight: '4px solid var(--secondary)', borderRadius: '20px' }}></div>
                        <div className="about-image-container" style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
                            <img
                                src="src/assets/about-main.JPG"
                                alt="EASA College Campus"
                                className="about-image"
                                style={{ width: '110%', height: '550px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
                .about-container { padding: 4rem; }
                .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
                
                @media (max-width: 1200px) {
                    .about-grid { gap: 3rem; }
                    .about-container { padding: 3rem; }
                }

                @media (max-width: 1024px) {
                    .about-grid { grid-template-columns: 1fr !important; gap: 4rem !important; }
                    .about-image { height: 400px !important; }
                    .about-container { padding: 2.5rem !important; }
                }

                @media (max-width: 768px) {
                    .about-features { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
                    .about-description { font-size: 1.1rem !important; }
                    .about-title { font-size: 2.2rem !important; }
                }

                @media (max-width: 600px) {
                    .about-container { padding: 1.5rem !important; }
                    .about-image { height: 250px !important; }
                    .about-title { font-size: 2rem !important; margin-bottom: 1.5rem !important; }
                    .about-btn { width: 100%; justify-content: center; }
                    .about-grid { gap: 3rem !important; }
                    .about-image-corner { width: 60px !important; height: 60px !important; }
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
