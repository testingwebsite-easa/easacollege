import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from '../components/LoadingBar';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import { FaChevronRight, FaInfoCircle, FaMale, FaFemale, FaUtensils, FaClipboardList } from 'react-icons/fa';

const HostelPage = () => {
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    const menuItems = [
        { id: 'overview', slug: 'hostel', label: 'Overview', icon: <FaInfoCircle /> },
        { id: 'boys-hostel', slug: 'boys-hostel', label: 'Boys Hostel', icon: <FaMale /> },
        { id: 'girls-hostel', slug: 'girls-hostel', label: 'Girls Hostel', icon: <FaFemale /> },
        { id: 'mess', slug: 'mess', label: 'Mess', icon: <FaUtensils /> },
        { id: 'rules', slug: 'hostel-rules', label: 'Rules & Regulations', icon: <FaClipboardList /> }
    ];

    useEffect(() => {
        const fetchSectionData = async () => {
            setLoading(true);
            const activeItem = menuItems.find(item => item.id === activeSection);
            const targetSlug = activeItem ? activeItem.slug : 'hostel';

            try {
                const res = await fetch(`${API_BASE_URL}/api/pages/${targetSlug}`);
                if (!res.ok) throw new Error('Section not found');
                const data = await res.json();
                setPageData(data);
            } catch (err) {
                console.error(err);
                if (targetSlug === 'hostel') {
                    setPageData(null);
                } else {
                    setPageData({
                        title: activeItem.label,
                        subtitle: 'Details coming soon',
                        content: 'Information regarding this facility will be updated shortly.',
                        heroImage: null
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchSectionData();
    }, [activeSection]);

    if (loading) return <LoadingBar />;

    if (!pageData && activeSection === 'overview') {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: '900' }}>404</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Hostel Page Not Found</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">Return Home</button>
                </div>
                <Footer />
            </div>
        );
    }

    const displayData = pageData || { title: 'Not Found', content: '' };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title={displayData.title} description={displayData.subtitle || displayData.content?.slice(0, 150)} image={displayData.heroImage} />
            <Navbar />

            <GlobalHero
                pageKey={activeSection === 'overview' ? 'hostel' : (menuItems.find(i => i.id === activeSection)?.slug || 'hostel')}
                defaultTitle={displayData.title}
                defaultSubtitle={displayData.subtitle}
                defaultImage={displayData.heroImage}
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Facilities</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {menuItems.map(item => (
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
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
                                {displayData.title}
                            </h2>

                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                                {(displayData.aboutImage || displayData.heroImage) && activeSection !== 'overview' && (
                                    <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid var(--glass-border)' }}>
                                        <img src={displayData.aboutImage || displayData.heroImage} alt={displayData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                                    {displayData.content?.split('\n').map((line, index) => {
                                        const trimmedLine = line.trim();
                                        if (trimmedLine.startsWith('•')) {
                                            return (
                                                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                    <span style={{ color: '#ffd900ff', fontSize: '2.5rem', marginRight: '1.2rem', lineHeight: '1.5rem' }}>•</span>
                                                    <span>{trimmedLine.substring(1).trim()}</span>
                                                </div>
                                            );
                                        }
                                        return <div key={index} style={{ marginBottom: '1rem', whiteSpace: 'pre-line' }}>{line}</div>;
                                    })}
                                </div>
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
                        top: 100px; /* Adjusted for Navbar (70px) + Ticker (~30px) */
                        z-index: 50;
                        margin-bottom: 2rem;
                        width: calc(100% + 3rem) !important; /* Edge-to-edge */
                        margin-left: -1.5rem !important;
                        background: var(--bg-main); /* Ensure background prevents see-through */
                    }
                    aside > div { 
                        background: var(--bg-card) !important; 
                        padding: 1rem 1.5rem !important; /* Restore internal padding */
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
                    /* Hide chevron on mobile */
                    button svg:last-child {
                        display: none !important;
                    }
                    /* Adjust icon/text gap */
                    button > div {
                        gap: 0.5rem !important;
                    }
                }
            `}</style>
        </div >
    );
};

export default HostelPage;
