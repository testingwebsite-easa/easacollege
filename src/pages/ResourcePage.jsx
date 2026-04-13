import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import { FaFilePdf, FaFileWord, FaFileAlt, FaFolderOpen, FaArrowRight, FaDownload } from 'react-icons/fa';

const ResourcePage = ({ title, subtitle = "Exploring Resources" }) => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
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
    }, [title]);

    const getFileIcon = (url) => {
        if (!url) return <FaFileAlt />;
        if (url.toLowerCase().endsWith('.pdf')) return <FaFilePdf style={{ color: '#ff4d4d' }} />;
        if (url.toLowerCase().endsWith('.doc') || url.toLowerCase().endsWith('.docx')) return <FaFileWord style={{ color: '#2b579a' }} />;
        return <FaFileAlt style={{ color: 'var(--secondary)' }} />;
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title={`${title} | EASA College`} description={`Access various educational resources, documents, and downloads for ${title} at EASA College.`} />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey={`resource-${title}`}
                defaultTitle={title}
                defaultSubtitle={subtitle}
            />

            <section className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', flex: 1 }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>
                        <div className="loader" style={{ border: '4px solid var(--glass-border)', borderTop: '4px solid var(--secondary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                        <p style={{ color: 'var(--text-muted)' }}>Searching for resources...</p>
                    </div>
                ) : resources.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {resources.map((resource, index) => (
                            <motion.div
                                key={resource._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10, borderColor: 'var(--secondary)' }}
                                style={{
                                    padding: '2.5rem',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                    {getFileIcon(resource.fileUrl)}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.8rem', color: 'var(--text-main)' }}>{resource.title}</h3>
                                    {resource.description && <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{resource.description}</p>}
                                </div>
                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                    {resource.fileUrl ? (
                                        <a
                                            href={resource.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                color: 'var(--secondary)',
                                                textDecoration: 'none',
                                                fontWeight: '700',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            Download Asset <FaDownload size={14} />
                                        </a>
                                    ) : (
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No file attached</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ background: 'var(--bg-card)', padding: '5rem 3rem', borderRadius: '32px', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '2rem', color: 'var(--secondary-glow)' }}><FaFolderOpen /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Resources Not Found</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.8', fontSize: '1.2rem' }}>
                            We couldn't find any documents listed under <strong>{title}</strong> at this time. Our team is constantly updating this section.
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '3rem', padding: '1rem 2.5rem', borderRadius: '50px' }}
                            onClick={() => setShowAdmissionForm(true)}
                        >
                            Request Resource
                        </button>
                    </motion.div>
                )}
            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                    .container { padding: 3rem 1.5rem !important; }
                    h2 { font-size: 2rem !important; }
                }
            `}</style>
        </div>
    );
};

export default ResourcePage;
