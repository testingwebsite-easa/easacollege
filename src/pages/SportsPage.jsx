import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from '../components/LoadingBar';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import { FaChevronRight, FaInfoCircle, FaStar, FaTimes, FaCamera, FaQuoteLeft } from 'react-icons/fa';

const SportsPage = () => {
    const slug = 'sports';
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(null);
    const [sportsList, setSportsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');
    const [selectedSport, setSelectedSport] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [pageRes, sportsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/pages/${slug}`),
                    fetch(`${API_BASE_URL}/api/sports`)
                ]);

                if (!pageRes.ok) throw new Error('Page not found');

                const pageData = await pageRes.json();
                const sportsData = await sportsRes.json();

                setPageData(pageData);
                setSportsList(sportsData);
                setActiveSection('overview');
            } catch (err) {
                console.error(err);
                setPageData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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
        { id: 'outdoor', label: 'Outdoor Games', icon: <FaStar /> },
        { id: 'indoor', label: 'Indoor Games', icon: <FaStar /> }
    ];

    const outdoorSports = sportsList.filter(s => s.type === 'Outdoor');
    const indoorSports = sportsList.filter(s => s.type === 'Indoor');

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

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '4rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content', zIndex: 10 }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Categories</div>
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

                    {/* Physical Director Profile */}
                    <div style={{ marginTop: '2rem', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '2rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '80px', background: 'var(--secondary)', opacity: 0.1 }} />
                        <div style={{ width: '100px', height: '100px', margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--bg-card)', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>
                            <img
                                src="https://ui-avatars.com/api/?name=Physical+Director&background=Random"
                                alt="Physical Director"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Dr. Varatharajan .R</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>Physical Director</p>

                        <div style={{ position: 'relative', padding: '1rem', background: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                            <FaQuoteLeft style={{ position: 'absolute', top: '-10px', left: '1rem', background: 'var(--bg-card)', color: 'var(--secondary)', padding: '0 5px', fontSize: '1.2rem' }} />
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6', paddingTop: '0.5rem' }}>
                                "Sports instill discipline and teamwork. Our goal is to nurture champions both on the field and in life."
                            </p>
                        </div>
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
                                {tabs.find(t => t.id === activeSection)?.label}
                            </h2>

                            {activeSection === 'overview' && (
                                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
                                        {pageData.content}
                                    </div>
                                </div>
                            )}

                            {(activeSection === 'outdoor' || activeSection === 'indoor') && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {(activeSection === 'outdoor' ? outdoorSports : indoorSports).map((sport, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -10 }}
                                            onClick={() => setSelectedSport(sport)}
                                            style={{
                                                background: 'var(--bg-card)',
                                                borderRadius: '24px',
                                                border: '1px solid var(--glass-border)',
                                                overflow: 'hidden',
                                                boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                                <img
                                                    src={sport.image}
                                                    alt={sport.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                                                    onMouseOut={e => e.target.style.transform = 'scale(1.0)'}
                                                />
                                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700', backdropFilter: 'blur(5px)' }}>
                                                    {sport.count}
                                                </div>
                                                {/* Hint that there are more photos */}
                                                {sport.gallery && sport.gallery.length > 0 && (
                                                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FaCamera size={14} />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '2rem' }}>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.8rem', color: 'var(--text-main)' }}>{sport.name}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{sport.description}</p>
                                                <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 'bold' }}>View Gallery &rarr;</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <Footer />

            {/* Gallery Modal */}
            <AnimatePresence>
                {selectedSport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.9)', zIndex: 1000,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedSport(null)}
                    >
                        <button
                            onClick={() => setSelectedSport(null)}
                            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
                        >
                            <FaTimes />
                        </button>

                        <div onClick={e => e.stopPropagation()} style={{ maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                            <h2 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '2rem' }}>{selectedSport.name}</h2>
                            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Gallery</p>

                            {selectedSport.gallery && selectedSport.gallery.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                    {[selectedSport.image, ...selectedSport.gallery].filter(Boolean).map((img, idx) => (
                                        <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', height: '250px' }}>
                                            <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', color: '#666' }}>
                                    <img src={selectedSport.image} alt={selectedSport.name} style={{ maxWidth: '100%', maxHeight: '600px', borderRadius: '12px' }} />
                                    <p style={{ marginTop: '1rem' }}>No additional photos available.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 1024px) {
                    .container { 
                        display: flex !important; 
                        flex-direction: column !important;
                        padding: 2rem 1.5rem !important; 
                    }
                    aside { display: contents !important; }
                    
                    /* Navigation Bar (First Div) */
                    aside > div:first-of-type { 
                        order: 1;
                        background: var(--bg-card) !important; 
                        padding: 1rem !important; 
                        border-bottom: 1px solid var(--glass-border) !important; 
                        border-radius: 0 !important; 
                        margin: -2rem -1.5rem 2rem !important; 
                        width: calc(100% + 3rem) !important; 
                        position: sticky;
                        top: 100px;
                        z-index: 50;
                    }
                    
                    /* Physical Director / Staff (Last Div) */
                    aside > div:last-child {
                        order: 3;
                        margin-top: 3rem !important;
                        width: 100% !important;
                        /* Revert to card look (inline styles usually handle this but we ensure spacing) */
                    }

                    main { order: 2; }

                    nav { 
                        flex-direction: row !important; 
                        overflow-x: auto !important; 
                        padding-bottom: 0 !important; 
                        gap: 0.8rem !important; 
                        scrollbar-width: none; 
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
                    }
                    /* Remove chevron in mobile nav to save space */
                    button svg { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default SportsPage;
