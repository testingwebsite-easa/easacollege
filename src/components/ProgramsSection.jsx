import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import { departments } from '../data/departmentsData';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
    // Group departments by type if needed, or just list them.
    // For now, let's display a selection or all of them.
    // Let's filter for unique programs or just show the main ones.

    // We can map the departments data to the format expected by the UI.
    const programsList = departments.map(dept => ({
        title: dept.name,
        subtitle: `${dept.type} Program`, // e.g., UG Program
        description: dept.overview.substring(0, 150) + "...",
        link: `/department/${dept.id}`,
        image: dept.heroImage
    }));

    return (
        <section className="programs-section" style={{ padding: '4rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--glass-highlight)', padding: '0.6rem 1.5rem', borderRadius: '50px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}
                    >
                        <FaGraduationCap /> Academic Programs
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '1.5rem' }}
                    >
                        Programs that <span style={{ color: 'var(--secondary)' }}>inspire.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}
                    >
                        Crafting professional excellence through world-class education and industry-integrated learning paths.
                    </motion.p>
                </div>

                <div className="programs-grid">
                    {programsList.map((program, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="program-card"
                        >
                            <div className="program-content" style={{ order: index % 2 === 0 ? 1 : 2 }}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="program-title">{program.title}</h3>
                                    <span className="program-subtitle">{program.subtitle}</span>
                                    <p className="program-desc">{program.description}</p>
                                    <Link
                                        to={program.link}
                                        className="program-link"
                                    >
                                        Explore Program <FaArrowRight style={{ color: 'var(--secondary)' }} />
                                    </Link>
                                </motion.div>
                            </div>
                            <div className="program-image" style={{ order: index % 2 === 0 ? 2 : 1 }}>
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="p-img"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <div className="program-overlay"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .programs-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .program-card {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    background: var(--bg-card);
                    border-radius: 40px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                    min-height: 400px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.05);
                    position: relative;
                }

                .program-content {
                    padding: 3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .program-title {
                    font-size: 2.2rem;
                    font-weight: 900;
                    color: var(--text-main);
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .program-subtitle {
                    font-size: 0.9rem;
                    color: var(--secondary);
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    display: block;
                    margin-bottom: 1.5rem;
                }

                .program-desc {
                    font-size: 1.1rem;
                    color: var(--text-muted);
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    max-width: 550px;
                }

                .program-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--text-main);
                    text-decoration: none;
                    font-weight: 800;
                    font-size: 1.1rem;
                    transition: 0.3s;
                }

                .program-image {
                    position: relative;
                    overflow: hidden;
                    min-height: 300px;
                }

                .p-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1s ease;
                }

                .program-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));
                }

                .p-img:hover { transform: scale(1.1); }

                @media (max-width: 1024px) {
                    .programs-section {
                        padding: 3rem 1rem !important;
                    }
                    .program-card {
                        grid-template-columns: 1fr;
                        height: auto;
                    }
                    .program-content { 
                        padding: 2rem !important; 
                        order: 2 !important; 
                    }
                    .program-image { 
                        order: 1 !important; 
                        height: 250px !important; 
                        min-height: 250px;
                    }
                    .program-title { 
                        font-size: 1.8rem; 
                    }
                }
            `}</style>
        </section>
    );
};

export default ProgramsSection;
