import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from '../components/LoadingBar';
import SEO from '../components/SEO';
import {
    FaChevronRight, 
    FaInfoCircle, FaStar, FaGlobe, FaArrowRight, FaDownload
} from 'react-icons/fa';

import GlobalHero from '../components/GlobalHero';

const DynamicPage = () => {
    const { slug } = useParams();
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
                setPageData(null); // Triggers 404
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchPage();
    }, [slug]);

    if (loading) return <LoadingBar />;

    if (!pageData) {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center">
                <Navbar />
                <div className="text-center mt-20 p-8">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <p className="text-xl mb-6">Page Not Found</p>
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

    return (
        <div className="department-page">
            <SEO
                title={pageData.title}
                description={pageData.subtitle || pageData.content?.slice(0, 150)}
                image={pageData.heroImage}
            />
            <style>{`
                .department-page {
                    background-color: var(--bg-dark);
                    min-height: 100vh;
                    color: var(--text-main);
                    position: relative;
                }
                
                /* MAIN LAYOUT */
                .dept-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 4rem;
                }

                /* SIDEBAR */
                .dept-sidebar-wrapper {
                     position: relative;
                }
                .dept-sidebar {
                    position: sticky;
                    top: 100px;
                    width: 100%;
                }
                .sidebar-card {
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--glass-border);
                    border-radius: 16px;
                    padding: 1.5rem;
                }
                .sidebar-title {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid var(--glass-border);
                }
                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .sidebar-btn {
                    text-align: left;
                    padding: 0.8rem 1rem;
                    border-radius: 8px;
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .sidebar-btn:hover {
                    background: rgba(255,255,255,0.05);
                    color: var(--text-main);
                }
                .sidebar-btn.active {
                    background: linear-gradient(90deg, rgba(230, 182, 39, 0.1), transparent);
                    color: var(--text-light);
                    border-left: 3px solid var(--secondary);
                }

                /* CONTENT AREA */
                .dept-content {
                    min-height: 500px;
                }
                .section-header {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    background: linear-gradient(to right, var(--text-main), var(--text-muted));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: 16px;
                    padding: 2.5rem;
                    margin-bottom: 2rem;
                }

                .content-text {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: var(--text-muted);
                    white-space: pre-line;
                }

                .section-image {
                    width: 100%;
                    height: 400px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    border: 1px solid var(--glass-border);
                }

                /* MOBILE RESPONSIVE */
                @media (max-width: 1024px) {
                    .dept-container {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        padding: 3rem 1.5rem;
                    }
                    .dept-sidebar {
                        position: sticky;
                        top: 70px;
                        z-index: 100;
                        margin: -2rem -2rem 2rem -2rem;
                        width: calc(100% + 4rem);
                        background: var(--bg-card);
                        padding: 1rem;
                        border-bottom: 1px solid var(--glass-border);
                        border-radius: 0 0 20px 20px;
                    }
                    .sidebar-card {
                        background: transparent;
                        border: none;
                        padding: 0;
                    }
                    .sidebar-title, .social-row { display: none; }
                    .sidebar-nav {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 0.5rem;
                        gap: 1rem;
                        flex-wrap: nowrap;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        align-items: center;
                    }
                    .sidebar-nav::-webkit-scrollbar { display: none; }

                    .sidebar-btn {
                        white-space: nowrap;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid var(--glass-border);
                        padding: 0.5rem 1rem;
                        border-radius: 50px;
                        flex-shrink: 0;
                        height: auto;
                    }
                    .sidebar-btn.active {
                        background: var(--secondary);
                        color: var(--bg-dark);
                        border: 1px solid var(--secondary);
                    }
                }

                @media (max-width: 480px) {
                    .dept-container {
                        padding: 2rem 1rem;
                    }
                    .section-header {
                        font-size: 2rem;
                    }
                    .glass-card {
                        padding: 1.5rem;
                    }
                }
            `}</style>

            <Navbar />

            <GlobalHero 
                pageKey={slug}
                defaultTitle={pageData.title}
                defaultSubtitle={pageData.subtitle}
                defaultImage={pageData.heroImage}
            />


            {/* MAIN CONTENT */}
            <div className="dept-container">
                {/* SIDEBAR */}
                <div className="dept-sidebar-wrapper">
                    <div className="dept-sidebar">
                        <div className="sidebar-card">
                            <div className="sidebar-title">Navigation</div>
                            <nav className="sidebar-nav">
                                {tabs.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`sidebar-btn ${activeSection === item.id ? 'active' : ''}`}
                                    >
                                        <span>{item.label}</span>
                                        {activeSection === item.id && <FaChevronRight size={10} />}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="dept-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="section-header">
                                {activeSection === 'overview' ? 'Overview' : activeTabData?.heading}
                            </h2>

                            <div className="glass-card">
                                {activeSection === 'overview' ? (
                                    <div className="content-text">
                                        {pageData.content}
                                    </div>
                                ) : (
                                    <>
                                        {activeTabData?.image && (
                                            <img src={activeTabData.image} alt={activeTabData.heading} className="section-image" />
                                        )}
                                        <div className="content-text">
                                            {activeTabData?.body}
                                        </div>
                                    </>
                                )}
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DynamicPage;
