import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from '../components/LoadingBar';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import { FaChevronRight, FaInfoCircle, FaStar } from 'react-icons/fa';

const StudentCellsPage = () => {
    const slug = 'cells';
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/pages/${slug}`);
                if (!res.ok) throw new Error('Page not found');
                const data = await res.json();
                setPageData(data);
                setActiveSection('overview');
            } catch (err) {
                console.error(err);
                setPageData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, []);

    if (loading) return <LoadingBar />;

    if (!pageData) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: '900' }}>404</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page Not Found</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">Return Home</button>
                </div>
                <Footer />
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
        ...(pageData.sections?.map((sec, idx) => ({
            id: `section-${idx}`,
            label: sec.heading,
            icon: <FaStar />
        })) || [])
    ];

    const activeTabData = activeSection === 'overview'
        ? null
        : pageData.sections[parseInt(activeSection.split('-')[1])];

    const renderFormattedText = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                const title = trimmedLine.slice(2, -2);
                return (
                    <h3 key={index} style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        marginTop: '2.5rem',
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '2px solid var(--secondary)',
                        display: 'inline-block'
                    }}>
                        {title}
                    </h3>
                );
            }
            if (trimmedLine.startsWith('•')) {
                return (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '0.8rem', paddingLeft: '0.5rem' }}>
                        <span style={{ color: 'var(--secondary)', fontSize: '1.2rem', lineHeight: '1' }}>•</span>
                        <span style={{ lineHeight: '1.6' }}>{trimmedLine.substring(1).trim()}</span>
                    </div>
                );
            }
            if (trimmedLine === '') return <div key={index} style={{ height: '0.5rem' }}></div>;

            return <p key={index} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>{trimmedLine}</p>;
        });
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title={pageData.title} description={pageData.subtitle || pageData.content?.slice(0, 150)} image={pageData.heroImage} />
            <Navbar />

            <GlobalHero
                pageKey={slug}
                defaultTitle={pageData.title}
                defaultSubtitle={pageData.subtitle}
                defaultImage={pageData.heroImage}
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Navigation</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {tabs.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    style={{
                                        textAlign: 'left', padding: '1rem 1.2rem', borderRadius: '12px',
                                        background: activeSection === item.id ? 'var(--secondary)' : 'transparent',
                                        border: 'none', color: activeSection === item.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        cursor: 'pointer', fontSize: '0.95rem', fontWeight: '700', transition: 'all 0.3s ease',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}
                                >
                                    <span>{item.label}</span>
                                    {activeSection === item.id && <FaChevronRight size={10} />}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main style={{ minHeight: '600px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '2.5rem', color: 'var(--text-main)' }}>
                                {activeSection === 'overview' ? 'Overview' : activeTabData?.heading}
                            </h2>

                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                                {activeSection === 'overview' ? (
                                    <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                                        {renderFormattedText(pageData.content)}
                                    </div>
                                ) : (
                                    <>
                                        {activeTabData?.image && (
                                            <div style={{ width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid var(--glass-border)' }}>
                                                <img src={activeTabData.image} alt={activeTabData.heading} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                        <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                                            {renderFormattedText(activeTabData?.body)}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <Footer />
            <style>{`
                @media (max-width: 1024px) {
                    .container { 
                        display: flex !important; 
                        flex-direction: column !important;
                        padding: 2rem 1.5rem !important; 
                    }
                    aside { 
                        position: sticky !important; 
                        top: 100px; /* Navbar + Ticker */
                        z-index: 50;
                        margin-bottom: 2rem;
                        width: calc(100% + 3rem) !important; 
                        margin-left: -1.5rem !important;
                        background: var(--bg-main);
                    }
                    aside > div { 
                        background: var(--bg-card) !important; 
                        padding: 1rem 1.5rem !important; 
                        border-bottom: 1px solid var(--glass-border) !important; 
                        border-radius: 0 !important; 
                        width: 100% !important;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    }
                    /* Hide text title on mobile */
                    aside > div > div:first-child {
                        display: none;
                    }
                    nav { 
                        flex-direction: row !important; 
                        overflow-x: auto !important; 
                        padding-bottom: 0 !important; 
                        gap: 0.8rem !important; 
                        scrollbar-width: none; 
                        align-items: center;
                    }
                    nav::-webkit-scrollbar { display: none; }
                    
                    button { 
                        white-space: nowrap !important; 
                        background: var(--glass-highlight) !important; 
                        border: 1px solid var(--glass-border) !important; 
                        padding: 0.6rem 1.2rem !important; 
                        border-radius: 50px !important; 
                        color: var(--text-muted) !important; 
                        flex-shrink: 0;
                        margin-bottom: 0 !important;
                    }
                button svg:last-child {
                        display: none !important;
                    }
                    /* Ensure full image is shown on mobile */
                    main > div > div > div:first-child[style*="height: 450px"] {
                        height: auto !important;
                        min-height: 250px;
                    }
                }
            `}</style>
        </div>
    );
};

export default StudentCellsPage;
