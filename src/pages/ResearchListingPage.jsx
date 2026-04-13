import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';
import { motion, useScroll, useTransform } from 'framer-motion';
import API_BASE_URL from '../api';
import missionBg from '../assets/mission-bg.png';

import GlobalHero from '../components/GlobalHero';

const ResearchListingPage = () => {
    const { category } = useParams();
    const location = useLocation();

    const getCategoryFromPath = () => {
        const path = location.pathname.substring(1);
        return path;
    };

    const activeCategory = category || getCategoryFromPath();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    const formatTitle = (str) => {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        setLoading(true);
        // Simulate API delay for smooth transition or actual fetch
        const endpoint = activeCategory === 'research'
            ? `${API_BASE_URL}/api/research-items`
            : `${API_BASE_URL}/api/research-items?category=${activeCategory}`;

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching research items:', err);
                setLoading(false);
            });
    }, [activeCategory]);

    return (
        <div className="research-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey={activeCategory}
                defaultTitle={formatTitle(activeCategory)}
                defaultSubtitle={`Pushing boundaries and exploring new frontiers in ${formatTitle(activeCategory).toLowerCase()}.`}
                defaultImage={missionBg}
            />


            {/* MAIN CONTENT - IMPRESSIVE GRID */}
            <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', minHeight: '40vh' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <span className="loader" style={{ display: 'inline-block', marginRight: '1rem' }} />
                        Loading research items...
                    </div>
                ) : items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        No research items found in this category.
                    </div>
                ) : (
                    <div
                        className="research-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '2rem',
                        }}
                    >
                        {items.map(item => (
                            <div
                                key={item.id}
                                className="research-card"
                                style={{
                                    background: 'var(--bg-section)',
                                    borderRadius: '1rem',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '260px',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                            >
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '180px',
                                            objectFit: 'cover',
                                            borderRadius: '0.75rem',
                                            marginBottom: '1rem',
                                            background: '#f3f4f6'
                                        }}
                                    />
                                )}
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>
                                    {item.description}
                                </p>
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: 'var(--primary)',
                                            fontWeight: 600,
                                            textDecoration: 'underline',
                                            marginTop: 'auto'
                                        }}
                                    >
                                        Learn more
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div >
    );
};

export default ResearchListingPage;
