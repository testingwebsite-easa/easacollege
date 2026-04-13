import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import ManagementSection from '../components/ManagementSection';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function InstitutionPage() {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [visionMission, setVisionMission] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/institution`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) setPageData(data);
            })
            .catch(err => console.error(err));

        fetch(`${API_BASE_URL}/api/mission-vision`)
            .then(res => res.json())
            .then(data => setVisionMission(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Institution | EASA College" description="Learn about the legacy, vision, and mission of EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="institution"
                defaultTitle={pageData?.title || "About the Institution"}
                defaultSubtitle={pageData?.subtitle || "A legacy of excellence in engineering education since 2008."}
                defaultImage={pageData?.heroImage}
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}
                >
                    {pageData ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {pageData.content && <div dangerouslySetInnerHTML={{ __html: pageData.content }} style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }} />}

                            {pageData.history && (
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Our History</h3>
                                    <div dangerouslySetInnerHTML={{ __html: pageData.history }} style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }} />
                                </div>
                            )}
                            {pageData.legacy && (
                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '3rem' }}>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Our Legacy</h3>
                                    <div dangerouslySetInnerHTML={{ __html: pageData.legacy }} style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Our History & Legacy</h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)' }}>
                                EASA College of Engineering and Technology, established in 2008, is a premier institution dedicated to imparting quality technical education. Approved by AICTE, New Delhi, and affiliated to Anna University, Chennai, the college has established itself as a center for excellence in engineering and technology.
                            </p>
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)' }}>
                                Our institution is committed to molding students into competent professionals with strong ethical values, ready to face the challenges of the global industry. With state-of-the-art infrastructure and a dedicated team of faculty, we ensure holistic development of our students.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>

            {visionMission && (
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '3.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        >
                            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '4px solid var(--secondary)', width: 'fit-content' }}>Our Vision</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.8' }}>{visionMission.vision}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '3.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        >
                            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '4px solid var(--secondary)', width: 'fit-content' }}>Our Mission</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.8' }}>{visionMission.mission}</p>
                        </motion.div>
                    </div>
                </div>
            )}

            <ManagementSection title="Our Leadership" subtitle="The visionaries guiding EASA College" />

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default InstitutionPage;
