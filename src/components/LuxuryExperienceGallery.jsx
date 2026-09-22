import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGem, FaArrowRight, FaExpand, FaBuilding, FaMicrochip, FaRocket, FaMusic, FaRunning, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const luxuryShowcaseData = [
    {
        id: 'arch-campus',
        category: 'Campus Architecture',
        title: '25-Acre Smart Green Infrastructure',
        description: 'Eco-friendly modern academic towers, serene landscape courtyards, and digitally integrated smart classrooms designed for holistic academic growth.',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85',
        badge: 'Smart Campus',
        icon: <FaBuilding />
    },
    {
        id: 'ai-robotics',
        category: 'Research & Labs',
        title: 'Futuristic AI, IoT & Robotics Superlabs',
        description: 'High-performance GPU computing clusters, autonomous drone testbeds, and precision mechatronics equipment powering cutting-edge innovations.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
        badge: 'Centres of Excellence',
        icon: <FaMicrochip />
    },
    {
        id: 'incubation-hub',
        category: 'Innovation & Startups',
        title: 'Ascend Incubation & Innovation Arena',
        description: 'State-of-the-art incubation studios where student ideas are transformed into patented technologies, funded ventures, and scalable startups.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
        badge: 'Startup Incubator',
        icon: <FaRocket />
    },
    {
        id: 'campus-life',
        category: 'Culture & Vibrancy',
        title: 'Dhruva Fest & National Celebrations',
        description: 'Spectacular campus life featuring electrifying technical symposiums, youth music festivals, and inter-collegiate championship tournaments.',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
        badge: 'Cultural Grandeur',
        icon: <FaMusic />
    },
    {
        id: 'sports-arena',
        category: 'Sports & Wellness',
        title: 'Championship Athletic Arena & Gym',
        description: 'Multi-sport turf grounds, floodlit basketball courts, synthetic badminton courts, and modern fitness facilities fostering athletic excellence.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
        badge: 'Sports Complex',
        icon: <FaRunning />
    },
    {
        id: 'central-library',
        category: 'Knowledge Hub',
        title: 'Hi-Tech Central Digital Library',
        description: 'Comprehensive repository housing 50,000+ academic volumes, IEEE digital subscriptions, multimedia research lounges, and quiet study zones.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85',
        badge: '50,000+ Volumes',
        icon: <FaBookOpen />
    }
];

export const LuxuryExperienceGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="luxury-experience-section" aria-label="Campus Experience Showcase">
            {/* Background Ambient Glow Orbs */}
            <div className="luxury-bg-orb orb-top-left" />
            <div className="luxury-bg-orb orb-bottom-right" />

            <div className="luxury-container">
                {/* Section Header */}
                <div className="luxury-header">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="luxury-badge"
                    >
                        <FaGem className="gem-icon" />
                        <span>The EASA Experience</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="luxury-title"
                    >
                        World-Class Infrastructure. <br />
                        <span className="gold-gradient-text">Designed for Tomorrow.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="luxury-subtitle"
                    >
                        Immerse yourself in a luxurious 25-acre academic haven combining cutting-edge high-tech facilities, innovation studios, and vibrant student life.
                    </motion.p>
                </div>

                {/* Luxury Photo Grid */}
                <div className="luxury-gallery-grid">
                    {luxuryShowcaseData.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.1 }}
                            className={`luxury-card card-${idx + 1}`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <div className="luxury-img-container">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="luxury-card-img"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80";
                                    }}
                                />
                                <div className="luxury-card-overlay" />
                                
                                {/* Floating Top Badge */}
                                <div className="floating-top-badge">
                                    <span className="card-icon">{item.icon}</span>
                                    <span>{item.badge}</span>
                                </div>

                                {/* Floating Expand Action */}
                                <div className="floating-zoom-btn">
                                    <FaExpand size={13} />
                                </div>
                            </div>

                            {/* Card Content Footer */}
                            <div className="luxury-card-content">
                                <span className="card-category">{item.category}</span>
                                <h3 className="card-heading">{item.title}</h3>
                                <p className="card-desc">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="luxury-cta-banner"
                >
                    <div className="cta-banner-content">
                        <h3>Experience EASA Campus in Person</h3>
                        <p>Take an exclusive guided campus tour or explore our immersive 360° virtual tour today.</p>
                    </div>
                    <div className="cta-banner-actions">
                        <Link to="/virtual-tour" className="luxury-cta-btn primary">
                            <span>Virtual Tour 360°</span>
                            <FaArrowRight size={13} />
                        </Link>
                        <Link to="/gallery" className="luxury-cta-btn secondary">
                            <span>Full Photo Gallery</span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="luxury-lightbox-modal" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-img" />
                        <div className="lightbox-info">
                            <span className="card-category">{selectedImage.category}</span>
                            <h4>{selectedImage.title}</h4>
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .luxury-experience-section {
                    position: relative;
                    padding: 6rem 1.5rem;
                    background: linear-gradient(180deg, var(--bg-main) 0%, rgba(11, 15, 25, 0.98) 50%, var(--bg-main) 100%);
                    overflow: hidden;
                }

                .luxury-bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(90px);
                    pointer-events: none;
                    z-index: 0;
                }

                .orb-top-left {
                    top: 10%;
                    left: -5%;
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(230, 182, 39, 0.12) 0%, transparent 70%);
                }

                .orb-bottom-right {
                    bottom: 10%;
                    right: -5%;
                    width: 550px;
                    height: 550px;
                    background: radial-gradient(circle, rgba(27, 42, 107, 0.35) 0%, transparent 70%);
                }

                .luxury-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                .luxury-header {
                    text-align: center;
                    margin-bottom: 4.5rem;
                }

                .luxury-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, rgba(252, 202, 38, 0.15) 0%, rgba(27, 42, 107, 0.25) 100%);
                    padding: 0.65rem 1.6rem;
                    border-radius: 50px;
                    color: #FCCA26;
                    font-weight: 800;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2.5px;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    box-shadow: 0 0 20px rgba(252, 202, 38, 0.15);
                }

                .gem-icon {
                    color: #FCCA26;
                    filter: drop-shadow(0 0 8px #FCCA26);
                }

                .luxury-title {
                    font-size: clamp(2.3rem, 4.8vw, 4rem);
                    font-weight: 900;
                    color: var(--text-main, #ffffff);
                    line-height: 1.15;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }

                .gold-gradient-text {
                    background: linear-gradient(135deg, #ffffff 10%, #FFF08A 55%, #FCCA26 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 15px rgba(252, 202, 38, 0.25));
                }

                .luxury-subtitle {
                    font-size: clamp(1.05rem, 1.4vw, 1.25rem);
                    color: var(--text-muted, #94a3b8);
                    max-width: 680px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                /* Luxury Grid */
                .luxury-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    margin-bottom: 4rem;
                }

                .luxury-card {
                    background: var(--bg-card, rgba(15, 23, 42, 0.7));
                    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
                    border-radius: 28px;
                    overflow: hidden;
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    transition: all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .luxury-card:hover {
                    transform: translateY(-10px) scale(1.01);
                    border-color: rgba(252, 202, 38, 0.45);
                    box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.5), 0 0 30px rgba(252, 202, 38, 0.18);
                }

                .luxury-img-container {
                    position: relative;
                    height: 240px;
                    overflow: hidden;
                }

                .luxury-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .luxury-card:hover .luxury-card-img {
                    transform: scale(1.12);
                }

                .luxury-card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(11, 15, 25, 0.95) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%);
                }

                .floating-top-badge {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    background: rgba(11, 15, 25, 0.75);
                    backdrop-filter: blur(10px);
                    color: #FCCA26;
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 5px 12px;
                    border-radius: 50px;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 2;
                }

                .floating-zoom-btn {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(8px);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.3s ease;
                    z-index: 2;
                }

                .luxury-card:hover .floating-zoom-btn {
                    opacity: 1;
                    transform: scale(1);
                }

                .luxury-card-content {
                    padding: 1.8rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .card-category {
                    font-size: 0.78rem;
                    font-weight: 800;
                    color: var(--secondary, #FCCA26);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 0.6rem;
                    display: block;
                }

                .card-heading {
                    font-size: 1.25rem;
                    font-weight: 900;
                    color: var(--text-main, #ffffff);
                    line-height: 1.35;
                    margin-bottom: 0.8rem;
                }

                .card-desc {
                    font-size: 0.92rem;
                    color: var(--text-muted, #94a3b8);
                    line-height: 1.65;
                    margin: 0;
                }

                /* CTA Banner */
                .luxury-cta-banner {
                    background: linear-gradient(135deg, rgba(27, 42, 107, 0.65) 0%, rgba(11, 15, 25, 0.95) 100%);
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    border-radius: 28px;
                    padding: 2.5rem 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25), 0 0 35px rgba(252, 202, 38, 0.1);
                }

                .cta-banner-content h3 {
                    font-size: clamp(1.4rem, 2.2vw, 1.8rem);
                    font-weight: 900;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                }

                .cta-banner-content p {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin: 0;
                }

                .cta-banner-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-shrink: 0;
                }

                .luxury-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0.85rem 1.8rem;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .luxury-cta-btn.primary {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    border: 1px solid #FCCA26;
                    box-shadow: 0 4px 15px rgba(252, 202, 38, 0.25);
                }

                .luxury-cta-btn.primary:hover {
                    background: #FCCA26;
                    color: #111827;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(252, 202, 38, 0.45);
                }

                .luxury-cta-btn.secondary {
                    background: rgba(255, 255, 255, 0.1);
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                }

                .luxury-cta-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-3px);
                }

                /* Lightbox Modal */
                .luxury-lightbox-modal {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.88);
                    backdrop-filter: blur(12px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }

                .lightbox-dialog {
                    background: #0f172a;
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    border-radius: 24px;
                    max-width: 800px;
                    width: 100%;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(252, 202, 38, 0.2);
                    position: relative;
                }

                .lightbox-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: rgba(0,0,0,0.6);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.1rem;
                    z-index: 10;
                }

                .lightbox-img {
                    width: 100%;
                    height: 420px;
                    object-fit: cover;
                }

                .lightbox-info {
                    padding: 1.8rem;
                }

                .lightbox-info h4 {
                    font-size: 1.4rem;
                    font-weight: 900;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                }

                .lightbox-info p {
                    color: #94a3b8;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Responsive */
                @media (max-width: 1100px) {
                    .luxury-gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.5rem;
                    }
                    .luxury-cta-banner {
                        flex-direction: column;
                        text-align: center;
                        padding: 2rem;
                    }
                    .cta-banner-actions {
                        justify-content: center;
                    }
                }

                @media (max-width: 768px) {
                    .luxury-experience-section {
                        padding: 4rem 1rem;
                    }
                    .luxury-gallery-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .luxury-img-container {
                        height: 200px;
                    }
                    .luxury-card-content {
                        padding: 1.4rem;
                    }
                    .cta-banner-actions {
                        flex-direction: column;
                        width: 100%;
                    }
                    .luxury-cta-btn {
                        width: 100%;
                        justify-content: center;
                    }
                    .lightbox-img {
                        height: 250px;
                    }
                }
            `}</style>
        </section>
    );
};

export default LuxuryExperienceGallery;
