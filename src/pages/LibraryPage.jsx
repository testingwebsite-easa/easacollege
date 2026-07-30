import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBook, FaLaptop, FaLink, FaIdCard, FaGavel, FaSearch, FaUsers, FaImage, FaChevronRight, FaExternalLinkAlt,
    FaCheckCircle, FaBookOpen, FaUserTie
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API_BASE_URL from '../api';
import LoadingBar from '../components/LoadingBar';

const LibraryPage = () => {
    useScrollAnimation();
    const [activeTab, setActiveTab] = useState('overview');
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const sections = [
        { id: 'overview', label: 'Overview', icon: <FaBook /> },
        { id: 'e-resources', label: 'E-RESOURCES', icon: <FaLaptop /> },
        { id: 'open-access', label: 'OPEN ACCESS RESOURCES', icon: <FaLink /> },
        { id: 'ndli', label: 'NDLI CLUB MEMBERSHIP', icon: <FaIdCard /> },
        { id: 'rules', label: 'RULES AND REGULATIONS', icon: <FaGavel /> },
        { id: 'opac', label: 'WEB OPAC', icon: <FaSearch /> },
        { id: 'staff', label: 'LIBRARY STAFFS', icon: <FaUsers /> },
        { id: 'gallery', label: 'GALLERY', icon: <FaImage /> },
    ];

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/library`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && Object.keys(data).length > 0) {
                        setPageData(data);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch library data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLibraryData();
    }, []);

    // Fallback Content
    const content = pageData || {
        overview: {
            title: 'Welcome to Central Library',
            subtitle: 'The Heart of Learning & Research at EASA',
            description: `The EASA Central Library is a cornerstone of our academic excellence. It is meticulously designed to provide a serene and technologically advanced environment for students and faculty alike.\n\nWith over 35,000 volumes across diverse disciplines, our library serves as a knowledge nexus where tradition meets innovation. Whether you are seeking physical textbooks or accessing global electronic databases, we offer the resources necessary for your academic journey.`,
            image: '',
            stats: [
                { label: 'Books', value: '35,000+' },
                { label: 'Journals', value: '150+' },
                { label: 'E-Books', value: '5,000+' },
                { label: 'Capacity', value: '300+' },
            ],
            highlights: [
                'State-of-the-art Digital Library',
                'Fully Automated Search (OPAC)',
                'Dedicated Research Section',
                '24/7 E-Resource Access'
            ]
        },
        eResources: [],
        openAccess: [],
        ndli: { description: '', benefits: [] },
        rules: [],
        academicProfile: [],
        opac: { description: '', cta: '', link: '#' },
        staff: [],
        gallery: []
    };

    if (loading) return <div style={{ height: '100vh', background: 'var(--bg-dark)' }}><LoadingBar /></div>;

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO title="Library | EASA College" description="Explore the wealth of information at the EASA Central Library. Physical and digital resources for engineering excellence." />
            <Navbar />

            <GlobalHero
                pageKey="library"
                defaultTitle="Central Library"
                defaultSubtitle="Empowering your intellect through global resources"
                defaultImage={content?.overview?.image}
            />

            <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>

                {/* SIDE MENU */}
                <aside style={{ flex: '1 1 280px', position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                    >
                        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--secondary)', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', fontWeight: '800' }}>Explore Library</h3>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {sections.map(sec => (
                                <button
                                    key={sec.id}
                                    onClick={() => setActiveTab(sec.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: activeTab === sec.id ? 'var(--secondary)' : 'transparent',
                                        color: activeTab === sec.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease',
                                        fontWeight: activeTab === sec.id ? '700' : '500',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <span style={{ fontSize: '1.1rem', display: 'flex' }}>{sec.icon}</span>
                                    <span style={{ flex: 1 }}>{sec.label}</span>
                                    {activeTab === sec.id && <FaChevronRight style={{ fontSize: '0.7rem' }} />}
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                </aside>

                {/* MAIN CONTENT */}
                <main style={{ flex: '3 1 600px', position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div style={{ padding: '3.5rem', minHeight: '600px', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>

                                {/* Header of Content */}
                                <div style={{ marginBottom: '3.5rem' }}>
                                    <div style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '0.5rem' }}>
                                        {activeTab === 'overview' ? 'Central Library' : 'Resource Section'}
                                    </div>
                                    <h2 style={{ fontSize: '3rem', margin: '0 0 1rem', fontWeight: '900', lineHeight: '1.1', color: 'var(--text-main)' }}>
                                        {activeTab === 'overview' ? content.overview.title : sections.find(s => s.id === activeTab)?.label}
                                    </h2>
                                    {activeTab === 'overview' && (
                                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', borderLeft: '4px solid var(--secondary)', paddingLeft: '1.5rem', fontWeight: '500' }}>
                                            {content.overview.subtitle}
                                        </p>
                                    )}
                                </div>

                                {activeTab === 'overview' && (
                                    <>
                                        <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '3.5rem', color: 'var(--text-muted)' }}>
                                            {content.overview.description}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
                                            {content.overview.stats?.map(s => (
                                                <div key={s.label} style={{ padding: '2rem 1rem', borderRadius: '24px', background: 'var(--glass-highlight)', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '0.25rem' }}>{s.value}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>{s.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                                            {content.overview.highlights?.map(h => (
                                                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '1.2rem 1.5rem', borderRadius: '16px', background: 'var(--glass-highlight)', border: '1px solid var(--glass-border)' }}>
                                                    <FaCheckCircle color="var(--secondary)" size={18} />
                                                    <span style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)' }}>{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {activeTab === 'e-resources' && (
                                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                                        {content.eResources?.map(r => (
                                            <div key={r.name} className="resource-card-hover" style={{ padding: '2.5rem', borderRadius: '24px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => window.open(r.link, '_blank')}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                                    {r.logo ? (
                                                        <img src={r.logo} alt={r.name} style={{ height: '60px', objectFit: 'contain', maxWidth: '180px' }} />
                                                    ) : (
                                                        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>{r.name}</h3>
                                                    )}
                                                    <div className="link-circle" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
                                                        <FaExternalLinkAlt />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{r.name}</h4>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{r.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'open-access' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                                        {content.openAccess?.map(l => (
                                            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="resource-card-hover" style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textDecoration: 'none', borderRadius: '24px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', transition: 'all 0.3s ease' }}>
                                                <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '0.5rem' }}>
                                                    {l.logo ? (
                                                        <img src={l.logo} alt={l.name} style={{ maxHeight: '100%', maxWidth: '90%', objectFit: 'contain' }} />
                                                    ) : (
                                                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <FaLink color="var(--primary)" size={32} />
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '800' }}>{l.name}</h4>
                                                <span className="btn" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>Visit Library</span>
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'ndli' && (
                                    <div style={{ display: 'grid', gap: '3rem' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8' }}>{content.ndli?.description}</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                            {content.ndli?.benefits?.map((b, i) => (
                                                <div key={i} style={{ padding: '2rem', borderRadius: '24px', background: 'var(--glass-highlight)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                                    <div style={{ background: 'var(--secondary)', color: 'var(--bg-dark)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <FaBookOpen size={16} />
                                                    </div>
                                                    <span style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.6', fontWeight: '500' }}>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'rules' && (
                                    <div style={{ display: 'grid', gap: '1.2rem' }}>
                                        {content.rules?.map((p, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem 2.5rem', background: 'var(--glass-highlight)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                                                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', opacity: 0.3, minWidth: '40px' }}>{String(i + 1).padStart(2, '0')}</span>
                                                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0, lineHeight: '1.6' }}>{p}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'staff' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
                                        {content.staff?.map(m => (
                                            <div key={m.name} style={{ padding: '3rem 2rem', textAlign: 'center', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                                <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', overflow: 'hidden', border: '5px solid var(--glass-highlight)' }}>
                                                    {m.image ? (
                                                        <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <FaUserTie size={50} color="white" />
                                                    )}
                                                </div>
                                                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{m.name}</h3>
                                                <p style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '800' }}>{m.role}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'opac' && (
                                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                                        <div style={{ width: '120px', height: '120px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
                                            <FaSearch size={40} color="var(--primary)" />
                                        </div>
                                        <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', fontWeight: '900' }}>Web OPAC Access</h2>
                                        <p style={{ color: 'var(--text-muted)', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto 3.5rem', fontSize: '1.2rem', lineHeight: '1.8' }}>{content.opac?.description}</p>
                                        <a href={content.opac?.link} className="btn btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.1rem' }}>{content.opac?.cta || 'Launch Online Catalog'}</a>
                                    </div>
                                )}

                                {activeTab === 'gallery' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                                        {content.gallery?.map((img, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -10 }}
                                                style={{ height: '240px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                            >
                                                <img src={img} alt={`Library ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <Footer />
            <style>{`
                .resource-card-hover:hover {
                    background: var(--secondary) !important;
                    transform: translateY(-8px);
                    box-shadow: 0 30px 60px -15px rgba(230, 182, 39, 0.3) !important;
                    border-color: var(--secondary) !important;
                }
                .resource-card-hover:hover h4, 
                .resource-card-hover:hover h3, 
                .resource-card-hover:hover p,
                .resource-card-hover:hover .link-circle { 
                    color: var(--bg-dark) !important; 
                }
                .resource-card-hover:hover .link-circle {
                    background: rgba(0,0,0,0.1) !important;
                    border-color: rgba(0,0,0,0.1) !important;
                }
                .resource-card-hover:hover .btn {
                    background: var(--bg-dark) !important;
                    color: white !important;
                }
                
                @media (max-width: 1024px) {
                    .container {
                        flex-direction: column;
                        padding: 2rem 1rem !important;
                    }
                    aside { 
                        position: sticky !important; 
                        top: 100px; 
                        flex: 0 0 auto !important; 
                        order: -1 !important; 
                        width: 100%; 
                        margin-top: 0 !important;
                        margin-bottom: 2rem;
                        background: var(--bg-main);
                        z-index: 90;
                        padding: 10px 0;
                        border-bottom: 1px solid var(--glass-border);
                    }
                    aside > div {
                        display: flex;
                        overflow-x: auto;
                        padding: 0.5rem !important;
                        background: transparent !important;
                        box-shadow: none !important;
                        border: none !important;
                        gap: 1rem;
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                        width: 100%;
                    }
                    aside > div::-webkit-scrollbar {
                        display: none;
                    }
                    aside h3 {
                        display: none;
                    }
                    aside nav {
                        flex-direction: row !important;
                        gap: 10px !important;
                        width: max-content;
                    }
                    aside nav button {
                        white-space: nowrap;
                        padding: 0.6rem 1.2rem !important;
                        border-radius: 50px !important;
                        background: var(--bg-card) !important;
                        border: 1px solid var(--glass-border) !important;
                        flex-shrink: 0;
                        margin-bottom: 0 !important;
                    }
                    aside nav button span:first-child {
                        font-size: 1rem !important;
                    }
                    main { 
                        flex: 1 1 100% !important; 
                        order: 2 !important; 
                    }
                }
            `}</style>
        </div>
    );
};

export default LibraryPage;
