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

function AdministrationPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const adminSections = [
        {
            title: "Administrative Departments",
            desc: "The administrative departments at EASA College are responsible for managing the day-to-day operations, including finance, human resources, facilities, and academic administration."
        },
        {
            title: "Student Support Services",
            desc: "Our student support services are dedicated to ensuring that students have access to a wide range of resources and support, including counseling, academic advising, and career services."
        },
        {
            title: "Infrastructure Management",
            desc: "The infrastructure management team is responsible for ensuring that the college's physical facilities are well-maintained and that students have access to state-of-the-art learning environments."
        }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Administration | EASA College" description="Meet the administrative team at EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="administration"
                defaultTitle="Administration"
                defaultSubtitle="Efficient administrative support for academic excellence."
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
                        category="administration"
                        title="Administrative Team"
                        subtitle="Ensuring a smooth and efficient campus environment for academic success."
                        isStatic={true}
                    />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
                    {adminSections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                padding: '3.5rem 3rem',
                                background: 'linear-gradient(to bottom right, var(--bg-card), var(--bg-section))',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 15px 40px rgba(0,0,0,0.03)',
                                minHeight: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--secondary)', borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem' }}>
                                {section.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                {section.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div style={{ padding: '6rem 4rem', background: 'var(--bg-section)', borderRadius: '48px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem' }}>Core Operations Office</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', marginBottom: '4rem' }}>
                        Providing robust support systems to empower our academic fraternity and students in their pursuit of excellence.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <span style={{ fontSize: '2rem', color: 'var(--secondary)' }}>📅</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Academic Calendar</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Efficient scheduling and planning of activities.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <span style={{ fontSize: '2rem', color: 'var(--secondary)' }}>👨‍💼</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Recruitment & HR</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Attracting and retaining top academic talent.</p>
                        </div>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <span style={{ fontSize: '2rem', color: 'var(--secondary)' }}>🏗️</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Campus Maintenance</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Maintaining world-class campus facilities.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <span style={{ fontSize: '2rem', color: 'var(--secondary)' }}>📋</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Regulatory Compliance</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ensuring adherence to all educational norms.</p>
                        </div>
                    </div>
                </div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default AdministrationPage;
