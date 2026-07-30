import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaFlask, FaRunning, FaLightbulb } from 'react-icons/fa';
import API_BASE_URL from '../api';

const LifeAtEASASection = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/life-at-EASA`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);
                } else if (data && data.heroImage) {
                    setItems([{
                        _id: 'legacy',
                        imageUrl: data.heroImage,
                        title: 'Campus Life',
                        category: 'General',
                        description: 'Experience the vibrant life at EASA College.'
                    }]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching life at EASA:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section className="life-section" style={{ padding: 'clamp(2rem, 5vw, 4rem) 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--glass-highlight)', padding: '0.6rem 1.5rem', borderRadius: '50px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}
                >
                    <FaLightbulb /> Student Life
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '1.5rem' }}
                >
                    Life at EASA. <br />
                    <span style={{ color: 'var(--secondary)' }}>Beyond the classroom.</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}
                >
                    A vibrant community where innovation meets collaboration and every student shines.
                </motion.p>
            </div>

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div className="life-grid">
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id || index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="life-card"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="life-img"
                            />
                            <div className="life-overlay" />
                            <div className="life-content">
                                <span className="life-category">
                                    {item.category}
                                </span>
                                <h3 className="life-title">{item.title}</h3>
                                <p className="life-desc">{item.description}</p>
                                <div className="life-btn-wrapper">
                                    <button
                                        className="life-read-more"
                                        onClick={() => navigate('/gallery')}
                                    >
                                        Read More
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="stats-grid">
                    {[
                        { icon: <FaGraduationCap />, title: "Student Clubs", desc: "50+ active organizations fostering leadership and creativity." },
                        { icon: <FaFlask />, title: "Research Labs", desc: "State-of-the-art facilities for groundbreaking innovations." },
                        { icon: <FaRunning />, title: "Sports & Fitness", desc: "World-class amenities for physical excellence and sportsmanship." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + (index * 0.1) }}
                            whileHover={{ y: -5, borderColor: 'var(--secondary)' }}
                            className="stat-card"
                        >
                            <div className="stat-icon">{item.icon}</div>
                            <h4 className="stat-title">{item.title}</h4>
                            <p className="stat-desc">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .life-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2.5rem;
                    margin-bottom: 6rem;
                }

                .life-card {
                    position: relative;
                    border-radius: 32px;
                    overflow: hidden;
                    height: 450px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    cursor: pointer;
                    border: 1px solid var(--glass-border);
                }

                .life-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }

                .life-card:hover .life-img { 
                    transform: scale(1.1); 
                }

                .life-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%);
                }

                .life-content {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 2.5rem;
                }

                .life-category {
                    background: var(--secondary);
                    color: var(--bg-dark);
                    padding: 0.4rem 1.2rem;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    display: inline-block;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .life-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    color: white;
                    margin: 0.5rem 0 1rem;
                }

                .life-desc {
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.8);
                    line-height: 1.5;
                    margin: 0;
                }

                .life-btn-wrapper {
                    margin-top: 1.5rem;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.4s ease;
                }

                .life-card:hover .life-btn-wrapper {
                    opacity: 1;
                    transform: translateY(0);
                }

                .life-read-more {
                    background: var(--secondary);
                    color: black;
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .life-read-more:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(252, 202, 38, 0.4);
                }

                .life-read-more svg {
                    transition: transform 0.3s ease;
                }

                .life-read-more:hover svg {
                    transform: translateX(4px);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 3rem;
                }

                .stat-card {
                    text-align: center;
                    padding: 3rem;
                    background: var(--bg-card);
                    border-radius: 32px;
                    border: 1px solid var(--glass-border);
                    transition: 0.3s;
                }

                .stat-icon {
                    font-size: 2.5rem;
                    color: var(--secondary);
                    margin-bottom: 1.5rem;
                    display: inline-block;
                }

                .stat-title {
                    font-size: 1.5rem;
                    font-weight: 900;
                    margin-bottom: 1rem;
                    color: var(--text-main);
                }

                .stat-desc {
                    color: var(--text-muted);
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .life-section {
                        padding: 3rem 1rem !important;
                    }
                    .life-grid {
                        grid-template-columns: 1fr; /* Stack on mobile */
                        gap: 1.5rem;
                    }
                    .life-card {
                        height: 350px;
                        border-radius: 20px;
                    }
                    .life-content {
                        padding: 1.5rem;
                    }
                    .life-title {
                        font-size: 1.5rem;
                    }
                    .stats-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .stat-card {
                        padding: 2rem;
                    }
                    h2 { font-size: 2.2rem !important; }
                }
            `}</style>
        </section>
    );
};

export default LifeAtEASASection;
