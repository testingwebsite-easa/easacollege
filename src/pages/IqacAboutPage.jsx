import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaBullseye, FaCogs, FaChessKnight, FaHandHoldingHeart } from 'react-icons/fa';

function IqacAboutPage() {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    const functions = [
        "Developing and implementing quality benchmarks and parameters for academic and administrative activities.",
        "Disseminating information related to quality standards and best practices in higher education.",
        "Organizing workshops, seminars, and initiatives on quality-related themes and promoting quality circles.",
        "Documenting institutional programs and activities that contribute to continuous quality improvement.",
        "Preparing and submitting the Annual Quality Assurance Report (AQAR) to NAAC in accordance with prescribed quality parameters."
    ];

    const strategies = [
        "Ensuring timely, efficient, and progressive execution of academic, administrative, and financial processes.",
        "Optimizing and integrating modern teaching, learning, and evaluation methodologies.",
        "Ensuring the adequacy, maintenance, and effective functioning of institutional support systems."
    ];

    const benefits = [
        "Enhanced clarity and focus in institutional functioning towards continuous quality improvement and the internalization of a quality culture.",
        "Strengthened integration and coordination among various institutional activities and the institutionalization of best practices.",
        "Providing a strong foundation for informed decision-making to improve overall institutional performance.",
        "Acting as a catalyst for positive change within the institution.",
        "Improved internal communication and collaboration across departments."
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="IQAC About | EASA College" description="Internal Quality Assurance Cell (IQAC) of EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="iqac-about"
                defaultTitle="Internal Quality Assurance Cell (IQAC)"
                defaultSubtitle="Developing a structured system for conscious, consistent, and catalytic actions."
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>

                {/* Introduction Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '2rem' }}>About IQAC</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)' }}>
                        The Internal Quality Assurance Cell (IQAC) of EASA College of Engineering and Technology is committed to developing a structured system for conscious, consistent, and catalytic actions aimed at enhancing the academic and administrative performance of the institution. IQAC was established during 2023, following the first cycle of accreditation, focusing on quality sustenance and establishment of a centralized mechanism to synergize accreditation processes, rankings, and institutional excellence initiatives.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}
                >
                    <div style={{ flex: 1, background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '50%', color: 'var(--bg-dark)' }}>
                                <FaBullseye size={24} />
                            </div>
                            <h3 style={{ fontSize: '2rem', fontWeight: '800' }}>Our Mission</h3>
                        </div>
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                            To institutionalize and internalize a culture of quality that enables EASA College of Engineering and Technology to achieve excellence in higher education and emerge as a leading engineering institution.
                        </p>
                    </div>
                </motion.div>

                {/* Functions Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaCogs style={{ color: 'var(--secondary)' }} /> Key Functions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {functions.map((func, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}
                            >
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>{func}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Strategies Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaChessKnight style={{ color: 'var(--secondary)' }} /> Strategies
                    </h3>
                    <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {strategies.map((strategy, index) => (
                                <li key={index} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'start', gap: '1rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                    <span style={{ color: 'var(--secondary)', marginTop: '5px' }}>➤</span>
                                    {strategy}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Benefits Section */}
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaHandHoldingHeart style={{ color: 'var(--secondary)' }} /> Benefits
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}
                            >
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>{benefit}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default IqacAboutPage;
