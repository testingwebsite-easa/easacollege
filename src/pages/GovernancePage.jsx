import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ManagementSection from '../components/ManagementSection';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function GovernancePage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const governanceFunctions = [
        {
            title: "Policy Formulation",
            desc: "Developing and implementing policies that align with our mission of academic excellence and holistic development."
        },
        {
            title: "Strategic Planning",
            desc: "Mapping the long-term vision of the institution, including infrastructure expansion and collaborative research ventures."
        },
        {
            title: "Quality Assurance",
            desc: "Ensuring all academic and administrative processes adhere to national and international benchmarks (NAAC, NBA, ISO)."
        },
        {
            title: "Stakeholder Engagement",
            desc: "Regular interaction with students, faculty, and industry partners to ensure inclusive and responsive governance."
        }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Governance | EASA College" description="Transparent and effective governance structures at EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="governance"
                defaultTitle="Governance"
                defaultSubtitle="Transparent and effective governance structures for institutional excellence."
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '6rem' }}
                >
                    <ManagementSection
                        category="governance"
                        title="Governing Body"
                        subtitle="The supreme administrative authority guiding EASA College towards its mission and vision."
                        isStatic={true}
                    />
                </motion.div>

                {/* Governance Functions Section */}
                <div style={{ marginBottom: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--text-main), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Core Governance Functions
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                            Our governance framework is built on transparency, accountability, and a commitment to continuous improvement across all educational aspects.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {governanceFunctions.map((func, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    padding: '3rem 2.5rem',
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    textAlign: 'left',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                                }}
                            >
                                <div style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    background: 'rgba(62,62,126,0.1)', 
                                    borderRadius: '12px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    marginBottom: '1.5rem',
                                    color: 'var(--secondary)',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}>
                                    {idx + 1}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>{func.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>{func.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Statutory Committees Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{
                        padding: '5rem 4rem',
                        background: 'var(--bg-section)',
                        borderRadius: '40px',
                        border: '1px solid var(--glass-border)',
                        textAlign: 'center'
                    }}
                >
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2.5rem' }}>Statutory Committees</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                        {["Academic Council", "Board of Studies", "Finance Committee", "Internal Quality Assurance Cell", "Grievance Redressal Cell"].map((tag, idx) => (
                            <span key={idx} style={{ 
                                padding: '1rem 2rem', 
                                background: 'var(--bg-card)', 
                                borderRadius: '50px', 
                                border: '1px solid var(--glass-border)', 
                                fontWeight: '700', 
                                color: 'var(--secondary)',
                                fontSize: '1rem'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default GovernancePage;
