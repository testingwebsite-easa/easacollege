import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API_BASE_URL from '../api';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt, FaNewspaper, FaLink, FaImage } from 'react-icons/fa';

function MediaPressPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [news, setNews] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/news-events`)
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Media & Press | EASA College" description="Latest news, press releases, and media coverage of EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="media-press"
                defaultTitle="Media & Press"
                defaultSubtitle="Latest news, press releases, and media coverage of EASA College."
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -12 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ height: '240px', position: 'relative', overflow: 'hidden', background: 'var(--bg-section)' }}>
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="news-image" />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaImage size={60} style={{ opacity: 0.1, color: 'var(--text-muted)' }} />
                                        </div>
                                    )}
                                    {item.category && (
                                        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--secondary)', color: 'var(--bg-dark)', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                                            {item.category}
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>
                                        <FaRegCalendarAlt style={{ color: 'var(--secondary)' }} /> {formatDate(item.date)}
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.4' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {item.desc}
                                    </p>

                                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                        {item.pdf_url ? (
                                            <a
                                                href={item.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    color: 'var(--secondary)',
                                                    textDecoration: 'none',
                                                    fontWeight: '800',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                Read Article <FaLink size={14} />
                                            </a>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>EASA Campus</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                        <FaNewspaper size={80} style={{ opacity: 0.1, marginBottom: '2rem' }} />
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1rem' }}>No News Articles Found</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Stay tuned for the latest updates from EASA College.</p>
                    </div>
                    )}
                </div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .news-image:hover { transform: scale(1.1); }
                @media (max-width: 768px) {
                    .container { padding: 4rem 1.5rem !important; }
                    h3 { font-size: 1.3rem !important; }
                }
            `}</style>
        </div>
    );
}

export default MediaPressPage;
