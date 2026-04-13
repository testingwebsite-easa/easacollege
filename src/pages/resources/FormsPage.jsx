import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import missionBg from '../../assets/mission-bg.png';
import AdmissionForm from '../../components/AdmissionForm';
import AdmissionCTA from '../../components/AdmissionCTA';
import API_BASE_URL from '../../api';

const FormsPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const title = "Forms"; // This must match the category in the DB
    const displayTitle = "Downloadable Forms"; // This is what is shown to the user
    const subtitle = "Application forms, requisition slips, and other administrative documents.";

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/api/resources?category=${encodeURIComponent(title)}`)
            .then(res => res.json())
            .then(data => {
                setResources(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch resources", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="resource-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <div style={{
                position: 'relative', height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg-section)',paddingTop: '120px',
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${missionBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5, zIndex: 0 }} />
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '1000px' }}>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px', textShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>{displayTitle}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', maxWidth: '700px', margin: '0 auto', fontWeight: '300' }}>{subtitle}</p>
                </motion.div>
            </div>

            <section className="container" style={{ padding: '4rem 2rem', flex: 1, position: 'relative', zIndex: 10 }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading forms...</div>
                ) : resources.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {resources.map((resource, index) => (
                            <motion.div key={resource._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ fontSize: '2rem', color: 'var(--primary)' }}>📝</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{resource.title}</h3>
                                {resource.description && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{resource.description}</p>}
                                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                                    {resource.fileUrl ? (
                                        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Download Form</a>
                                    ) : <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No file attached</span>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: '3rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>📝</div>
                        <h2 style={{ marginBottom: '1rem' }}>No Forms Available</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.6' }}>We are currently updating our forms repository.</p>
                        <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => setShowAdmissionForm(true)}>Contact Office</button>
                    </div>
                )}
            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default FormsPage;
