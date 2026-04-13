import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ManagementSection from '../components/ManagementSection';
import LeadershipHierarchy from '../components/LeadershipHierarchy';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function LeadershipPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rolesData = [
        {
            title: "Trustees & Founder",
            desc: "The visionary founders who laid the foundation of EASA College with a mission to provide quality education and empower future generations."
        },
        {
            title: "Chairperson",
            desc: "Oversees the overall strategic direction of the institution, ensuring alignment with global educational standards and institutional values."
        },
        {
            title: "Secretary & Correspondent",
            desc: "Responsible for the administrative and regulatory compliance, fostering partnerships, and ensuring operational excellence across all departments."
        },
        {
            title: "Principal",
            desc: "Chief Academic Officer responsible for curriculum development, faculty management, and fostering a research-driven student environment."
        }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Leadership | EASA College" description="Meet the leadership team and visionaries guiding EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="leadership"
                defaultTitle="Leadership Hierarchy"
                defaultSubtitle="The visionaries guiding our institution towards the future."
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5.5rem' }}
                >
                    <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.9' }}>
                        Our leadership team comprises eminent educationists and industry veterans who are dedicated to steering the college towards academic and operational excellence through a structured and visionary approach.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        padding: '4rem 2rem',
                        border: '1px solid var(--glass-border)',
                        textAlign: 'center',
                        marginBottom: '6rem',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                    }}
                >
                    <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '2.5rem' }}>Organizational Structure</h3>
                    <LeadershipHierarchy />
                </motion.div>

                {/* Roles & Responsibilities */}
                <div style={{ marginBottom: '6rem' }}>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '3rem', textAlign: 'center' }}
                    >
                        Roles & Responsibilities
                    </motion.h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {rolesData.map((role, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, borderColor: 'var(--secondary)' }}
                                style={{
                                    padding: '2.5rem',
                                    background: 'var(--bg-section)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <h4 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--secondary)', marginBottom: '1rem' }}>{role.title}</h4>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>{role.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Leadership Philosophy */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{
                        padding: '4rem 2rem',
                        background: 'linear-gradient(135deg, rgba(62,62,126,0.1) 0%, rgba(33,150,243,0.1) 100%)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        marginBottom: '6rem',
                        textAlign: 'center'
                    }}
                >
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Leadership Philosophy</h3>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic' }}>
                        "True leadership at EASA means creating a culture where innovation meets tradition. Our commitment is to provide students with not just technical skills, but a moral compass and a global perspective to navigate the challenges of the 21st century."
                    </p>
                </motion.div>

                <ManagementSection title="Key Decision Makers" subtitle="The core team driving our strategic goals" category="management" isStatic={true} />
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default LeadershipPage;
