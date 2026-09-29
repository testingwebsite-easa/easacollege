import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaBuilding, 
    FaMicrochip, 
    FaRocket, 
    FaMusic, 
    FaRunning, 
    FaBookOpen, 
    FaImages, 
    FaQuoteLeft, 
    FaArrowRight, 
    FaExpand, 
    FaTimes, 
    FaGraduationCap,
    FaStar,
    FaVrCardboard
} from 'react-icons/fa';
import API_BASE_URL from '../api';

// 1. Campus Infrastructure Data
const facilitiesData = [
    {
        id: 'arch-campus',
        category: 'Campus Architecture',
        title: '25-Acre Smart Green Infrastructure',
        description: 'Eco-friendly academic towers, serene courtyards, and digitally integrated smart classrooms designed for holistic growth.',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85',
        badge: 'Smart Campus',
        icon: <FaBuilding />
    },
    {
        id: 'ai-robotics',
        category: 'Research & Labs',
        title: 'Futuristic AI, IoT & Robotics Superlabs',
        description: 'High-performance GPU computing clusters, autonomous drone testbeds, and precision mechatronics equipment.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
        badge: 'Idea Labs & CoE',
        icon: <FaMicrochip />
    },
    {
        id: 'incubation-hub',
        category: 'Innovation & Startups',
        title: 'Ascend Incubation & Innovation Arena',
        description: 'Where student ideas are transformed into patented technologies, seed-funded ventures, and scalable startups.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
        badge: 'Startup Incubator',
        icon: <FaRocket />
    },
    {
        id: 'campus-life',
        category: 'Culture & Vibrancy',
        title: 'Dhruva Fest & Cultural Celebrations',
        description: 'Spectacular campus life featuring electrifying technical symposiums, youth music festivals, and pro-shows.',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
        badge: 'Dhruva Mega Fest',
        icon: <FaMusic />
    },
    {
        id: 'sports-arena',
        category: 'Sports & Wellness',
        title: 'Championship Athletic Arena & Gym',
        description: 'Multi-sport turf grounds, floodlit courts, synthetic badminton courts, and modern fitness facilities.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
        badge: 'Sports Complex',
        icon: <FaRunning />
    },
    {
        id: 'central-library',
        category: 'Knowledge Hub',
        title: 'Hi-Tech Central Digital Library',
        description: '50,000+ academic volumes, IEEE digital subscriptions, multimedia research lounges, and quiet study zones.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85',
        badge: '50,000+ Books',
        icon: <FaBookOpen />
    }
];

// Fallback Testimonials
const fallbackTestimonials = [
    {
        id: 't-1',
        name: 'Aravind Swaminathan',
        role: 'B.E. Computer Science & Engineering (2024 Batch)',
        company: 'Placed at Amazon (16 LPA)',
        quote: 'The AI Superlabs and constant hackathon mentoring at EASA completely transformed my technical readiness. The placement training helped me land my dream offer.',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 't-2',
        name: 'Sneha Priyadarshini',
        role: 'B.Tech AI & Data Science (2025 Batch)',
        company: 'Placed at Zoho Corp',
        quote: 'The autonomous curriculum is closely aligned with real industry standards. Hands-on projects and incubation support gave me the edge I needed.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 't-3',
        name: 'Karthik Raja',
        role: 'B.E. Mechanical Engineering',
        company: 'Placed at Bosch Global Software',
        quote: 'State-of-the-art Robotics & CAD/CAM labs combined with supportive faculty made learning practical and exciting. EASA shaped my engineering career.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
];

export const CampusExperienceHub = () => {
    const [activeTab, setActiveTab] = useState('facilities'); // 'facilities' | 'gallery' | 'voices'
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [testimonials, setTestimonials] = useState(fallbackTestimonials);
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Fetch Gallery Photos & Testimonials
    useEffect(() => {
        // Fetch gallery events
        fetch(`${API_BASE_URL}/api/gallery-events`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const photos = [];
                    data.forEach(ev => {
                        if (ev.photos && ev.photos.length > 0) {
                            ev.photos.forEach(p => {
                                photos.push({
                                    src: p.src || p.url,
                                    title: ev.eventName || 'Campus Moment',
                                    category: ev.category || 'Event',
                                    date: ev.date || ''
                                });
                            });
                        }
                    });
                    if (photos.length > 0) {
                        setGalleryPhotos(photos.slice(0, 8));
                    }
                }
            })
            .catch(() => {});

        // Fetch testimonials / advice
        fetch(`${API_BASE_URL}/api/advice`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((item, idx) => ({
                        id: item._id || `test-${idx}`,
                        name: item.author || item.name || 'EASA Alumnus',
                        role: item.role || item.designation || 'Alumni / Student',
                        company: item.company || 'Distinguished Engineer',
                        quote: item.content || item.advice || item.message || '',
                        avatar: item.imageUrl || `https://images.unsplash.com/photo-${1535713875002 + idx}?auto=format&fit=crop&w=200&q=80`
                    })).filter(t => t.quote);
                    if (formatted.length > 0) {
                        setTestimonials(formatted);
                    }
                }
            })
            .catch(() => {});
    }, []);

    // Fallback gallery photos if none fetched
    const displayGallery = galleryPhotos.length > 0 ? galleryPhotos : [
        { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', title: 'Tech Symposium 2026', category: 'Academics' },
        { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', title: 'Dhruva Fest Live Concert', category: 'Cultural' },
        { src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', title: 'AI & Robotics Expo', category: 'Innovation' },
        { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', title: 'Annual Sports Meet', category: 'Sports' },
        { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', title: 'Incubation Pitch Day', category: 'Startups' },
        { src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', title: 'Smart Campus Aerial View', category: 'Campus' }
    ];

    return (
        <section className="campus-hub-section" aria-label="Campus Experience and Life Hub">
            <div className="campus-hub-container">
                {/* Header with Compact Switchable Pills */}
                <div className="hub-top-bar">
                    <div className="hub-header-text">
                        <div className="hub-badge">
                            <span className="hub-badge-dot"></span>
                            <span>EASA Experience & Student Life</span>
                        </div>
                        <h2 className="hub-title">
                            Campus Life, Facilities & <span className="text-highlight">Student Voices</span>
                        </h2>
                    </div>

                    {/* Interactive Tab Switcher */}
                    <div className="hub-tabs-pills" role="tablist">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'facilities'}
                            className={`hub-tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
                            onClick={() => setActiveTab('facilities')}
                        >
                            <FaBuilding className="tab-icon" />
                            <span>World-Class Facilities</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'gallery'}
                            className={`hub-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                            onClick={() => setActiveTab('gallery')}
                        >
                            <FaImages className="tab-icon" />
                            <span>Campus Moments ({displayGallery.length})</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'voices'}
                            className={`hub-tab-btn ${activeTab === 'voices' ? 'active' : ''}`}
                            onClick={() => setActiveTab('voices')}
                        >
                            <FaQuoteLeft className="tab-icon" />
                            <span>Student Stories</span>
                        </button>
                    </div>
                </div>

                {/* Tab Content Display */}
                <div className="hub-tab-content-area">
                    <AnimatePresence mode="wait">
                        {/* TAB 1: FACILITIES & INFRASTRUCTURE */}
                        {activeTab === 'facilities' && (
                            <motion.div
                                key="tab-facilities"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="facilities-grid"
                            >
                                {facilitiesData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="facility-card"
                                        onClick={() => setSelectedMedia({
                                            image: item.image,
                                            title: item.title,
                                            category: item.category,
                                            desc: item.description
                                        })}
                                    >
                                        <div className="facility-img-wrap">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80";
                                                }}
                                            />
                                            <div className="facility-badge">
                                                {item.icon}
                                                <span>{item.badge}</span>
                                            </div>
                                            <div className="facility-zoom">
                                                <FaExpand size={12} />
                                            </div>
                                        </div>
                                        <div className="facility-info">
                                            <span className="facility-cat">{item.category}</span>
                                            <h3 className="facility-name">{item.title}</h3>
                                            <p className="facility-desc">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* TAB 2: CAMPUS MOMENTS / GALLERY */}
                        {activeTab === 'gallery' && (
                            <motion.div
                                key="tab-gallery"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="gallery-feed-grid"
                            >
                                {displayGallery.map((photo, pIdx) => (
                                    <div
                                        key={pIdx}
                                        className="gallery-photo-card"
                                        onClick={() => setSelectedMedia({
                                            image: photo.src,
                                            title: photo.title,
                                            category: photo.category,
                                            desc: photo.date ? `Captured on ${photo.date}` : 'EASA Campus Celebration'
                                        })}
                                    >
                                        <img src={photo.src} alt={photo.title} loading="lazy" />
                                        <div className="photo-overlay">
                                            <span className="photo-tag">{photo.category}</span>
                                            <h4 className="photo-title">{photo.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* TAB 3: STUDENT VOICES & TESTIMONIALS */}
                        {activeTab === 'voices' && (
                            <motion.div
                                key="tab-voices"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="testimonials-grid"
                            >
                                {testimonials.map((t, idx) => (
                                    <div key={t.id || idx} className="testimonial-card">
                                        <div className="t-card-top">
                                            <div className="t-avatar-box">
                                                <img 
                                                    src={t.avatar} 
                                                    alt={t.name} 
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "https://images.unsplash.com/photo-1535713875002?auto=format&fit=crop&w=200&q=80";
                                                    }}
                                                />
                                            </div>
                                            <div className="t-meta">
                                                <h4 className="t-name">{t.name}</h4>
                                                <span className="t-role">{t.role}</span>
                                                <span className="t-company"><FaStar className="star-icon" /> {t.company}</span>
                                            </div>
                                            <FaQuoteLeft className="t-quote-watermark" />
                                        </div>
                                        <p className="t-quote-text">"{t.quote}"</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Compact Action Footer */}
                <div className="hub-bottom-actions">
                    <div className="hub-action-info">
                        <FaVrCardboard className="vr-icon" />
                        <span>Experience the campus in person or online anytime:</span>
                    </div>
                    <div className="hub-action-btns">
                        <Link to="/virtual-tour" className="btn-action-primary">
                            <span>Virtual Tour 360°</span>
                            <FaArrowRight size={12} />
                        </Link>
                        <Link to="/gallery" className="btn-action-outline">
                            <span>Photo Gallery</span>
                        </Link>
                        <Link to="/dhruva-fest" className="btn-action-outline">
                            <span>Dhruva Fest</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <div className="media-modal-backdrop" onClick={() => setSelectedMedia(null)}>
                    <div className="media-modal-card" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="modal-close-btn"
                            onClick={() => setSelectedMedia(null)}
                            aria-label="Close Preview"
                        >
                            <FaTimes size={16} />
                        </button>
                        <div className="modal-img-holder">
                            <img src={selectedMedia.image} alt={selectedMedia.title} />
                        </div>
                        <div className="modal-details">
                            <span className="modal-tag">{selectedMedia.category}</span>
                            <h3>{selectedMedia.title}</h3>
                            <p>{selectedMedia.desc}</p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .campus-hub-section {
                    padding: 3rem 1.5rem;
                    background: var(--bg-main, #f8fafc);
                    position: relative;
                }

                .campus-hub-container {
                    max-width: 1360px;
                    margin: 0 auto;
                    background: var(--bg-card, #ffffff);
                    border-radius: 28px;
                    border: 1px solid var(--glass-border, rgba(226, 232, 240, 0.8));
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.05);
                    padding: 2rem 2.2rem;
                }

                :root[data-theme="dark"] .campus-hub-container {
                    background: #0d1527;
                    border-color: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
                }

                .hub-top-bar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    gap: 1.5rem;
                    margin-bottom: 2.2rem;
                    padding-bottom: 1.8rem;
                    border-bottom: 1px solid var(--glass-border, rgba(0, 0, 0, 0.06));
                }

                :root[data-theme="dark"] .hub-top-bar {
                    border-bottom-color: rgba(255, 255, 255, 0.08);
                }

                .hub-header-text {
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .hub-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.35rem 0.9rem;
                    border-radius: 30px;
                    background: rgba(37, 99, 235, 0.08);
                    color: #2563eb;
                    font-size: 0.78rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    margin-bottom: 0.6rem;
                }

                :root[data-theme="dark"] .hub-badge {
                    background: rgba(96, 165, 250, 0.15);
                    color: #60a5fa;
                }

                .hub-badge-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #2563eb;
                }

                :root[data-theme="dark"] .hub-badge-dot {
                    background: #60a5fa;
                }

                .hub-title {
                    font-size: clamp(1.5rem, 2.4vw, 2.2rem);
                    font-weight: 900;
                    color: var(--text-main, #0f172a);
                    line-height: 1.2;
                    margin: 0;
                }

                .text-highlight {
                    color: #e6b627;
                }

                /* Tab Pills */
                .hub-tabs-pills {
                    display: flex;
                    align-items: center;
                    background: rgba(0, 0, 0, 0.04);
                    padding: 5px;
                    border-radius: 40px;
                    gap: 4px;
                }

                :root[data-theme="dark"] .hub-tabs-pills {
                    background: rgba(255, 255, 255, 0.05);
                }

                .hub-tab-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.65rem 1.25rem;
                    border-radius: 30px;
                    border: none;
                    background: transparent;
                    color: var(--text-muted, #64748b);
                    font-size: 0.88rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .hub-tab-btn.active {
                    background: #1B2A6B;
                    color: #ffffff;
                    box-shadow: 0 4px 14px rgba(27, 42, 107, 0.25);
                }

                :root[data-theme="dark"] .hub-tab-btn.active {
                    background: #2563eb;
                    color: #ffffff;
                }

                .tab-icon {
                    font-size: 0.95rem;
                }

                /* Facilities Grid (3 Columns) */
                .facilities-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .facility-card {
                    background: var(--bg-main, #f8fafc);
                    border: 1px solid var(--glass-border, rgba(0, 0, 0, 0.06));
                    border-radius: 20px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                    display: flex;
                    flex-direction: column;
                }

                :root[data-theme="dark"] .facility-card {
                    background: rgba(255, 255, 255, 0.03);
                    border-color: rgba(255, 255, 255, 0.06);
                }

                .facility-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
                }

                .facility-img-wrap {
                    position: relative;
                    height: 180px;
                    overflow: hidden;
                }

                .facility-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }

                .facility-card:hover .facility-img-wrap img {
                    transform: scale(1.05);
                }

                .facility-badge {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.3rem 0.75rem;
                    border-radius: 20px;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(8px);
                    color: #fde047;
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.3px;
                }

                .facility-zoom {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.9);
                    color: #0f172a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .facility-card:hover .facility-zoom {
                    opacity: 1;
                }

                .facility-info {
                    padding: 1.1rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .facility-cat {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #2563eb;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    margin-bottom: 0.3rem;
                }

                :root[data-theme="dark"] .facility-cat {
                    color: #60a5fa;
                }

                .facility-name {
                    font-size: 1rem;
                    font-weight: 800;
                    color: var(--text-main, #0f172a);
                    margin: 0 0 0.4rem 0;
                    line-height: 1.3;
                }

                .facility-desc {
                    font-size: 0.82rem;
                    color: var(--text-muted, #64748b);
                    line-height: 1.45;
                    margin: 0;
                }

                /* Gallery Feed (4 Columns compact) */
                .gallery-feed-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.2rem;
                }

                .gallery-photo-card {
                    position: relative;
                    height: 200px;
                    border-radius: 18px;
                    overflow: hidden;
                    cursor: pointer;
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
                }

                .gallery-photo-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }

                .gallery-photo-card:hover img {
                    transform: scale(1.08);
                }

                .photo-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1rem;
                }

                .photo-tag {
                    color: #fde047;
                    font-size: 0.68rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .photo-title {
                    color: #ffffff;
                    font-size: 0.9rem;
                    font-weight: 800;
                    margin: 2px 0 0 0;
                    line-height: 1.25;
                }

                /* Testimonials (3 Columns) */
                .testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .testimonial-card {
                    background: var(--bg-main, #f8fafc);
                    border: 1px solid var(--glass-border, rgba(0, 0, 0, 0.06));
                    border-radius: 20px;
                    padding: 1.4rem;
                    position: relative;
                }

                :root[data-theme="dark"] .testimonial-card {
                    background: rgba(255, 255, 255, 0.03);
                    border-color: rgba(255, 255, 255, 0.06);
                }

                .t-card-top {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 1rem;
                    position: relative;
                }

                .t-avatar-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    overflow: hidden;
                    flex-shrink: 0;
                    border: 2px solid #e6b627;
                }

                .t-avatar-box img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .t-meta {
                    flex: 1;
                    min-width: 0;
                }

                .t-name {
                    font-size: 0.92rem;
                    font-weight: 800;
                    color: var(--text-main, #0f172a);
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .t-role {
                    display: block;
                    font-size: 0.75rem;
                    color: var(--text-muted, #64748b);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .t-company {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #2563eb;
                    margin-top: 2px;
                }

                :root[data-theme="dark"] .t-company {
                    color: #60a5fa;
                }

                .star-icon {
                    color: #e6b627;
                }

                .t-quote-watermark {
                    color: rgba(0, 0, 0, 0.06);
                    font-size: 1.8rem;
                }

                :root[data-theme="dark"] .t-quote-watermark {
                    color: rgba(255, 255, 255, 0.08);
                }

                .t-quote-text {
                    font-size: 0.85rem;
                    color: var(--text-main, #334155);
                    line-height: 1.55;
                    font-style: italic;
                    margin: 0;
                }

                :root[data-theme="dark"] .t-quote-text {
                    color: #cbd5e1;
                }

                /* Bottom Actions Strip */
                .hub-bottom-actions {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 1.2rem;
                    border-top: 1px solid var(--glass-border, rgba(0, 0, 0, 0.06));
                }

                :root[data-theme="dark"] .hub-bottom-actions {
                    border-top-color: rgba(255, 255, 255, 0.08);
                }

                .hub-action-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: var(--text-muted, #64748b);
                }

                .vr-icon {
                    color: #2563eb;
                    font-size: 1.1rem;
                }

                :root[data-theme="dark"] .vr-icon {
                    color: #60a5fa;
                }

                .hub-action-btns {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .btn-action-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.55rem 1.2rem;
                    border-radius: 30px;
                    background: #1B2A6B;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 800;
                    transition: all 0.25s ease;
                }

                .btn-action-primary:hover {
                    background: #2563eb;
                    transform: translateY(-2px);
                }

                .btn-action-outline {
                    padding: 0.55rem 1.1rem;
                    border-radius: 30px;
                    border: 1px solid var(--glass-border, rgba(0, 0, 0, 0.12));
                    background: transparent;
                    color: var(--text-main, #0f172a);
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 700;
                    transition: all 0.25s ease;
                }

                .btn-action-outline:hover {
                    background: rgba(0, 0, 0, 0.04);
                    border-color: var(--text-main, #0f172a);
                }

                :root[data-theme="dark"] .btn-action-outline:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.3);
                }

                /* Modal Backdrop */
                .media-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .media-modal-card {
                    background: var(--bg-card, #ffffff);
                    border-radius: 24px;
                    max-width: 650px;
                    width: 100%;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
                    position: relative;
                }

                :root[data-theme="dark"] .media-modal-card {
                    background: #0f172a;
                }

                .modal-close-btn {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: rgba(15, 23, 42, 0.7);
                    color: #ffffff;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                }

                .modal-img-holder {
                    height: 300px;
                    width: 100%;
                    overflow: hidden;
                }

                .modal-img-holder img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .modal-details {
                    padding: 1.5rem;
                }

                .modal-tag {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #2563eb;
                    text-transform: uppercase;
                }

                .modal-details h3 {
                    margin: 4px 0 8px 0;
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: var(--text-main, #0f172a);
                }

                .modal-details p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: var(--text-muted, #64748b);
                    line-height: 1.5;
                }

                /* Responsive */
                @media (max-width: 1100px) {
                    .facilities-grid { grid-template-columns: repeat(2, 1fr); }
                    .gallery-feed-grid { grid-template-columns: repeat(3, 1fr); }
                    .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 800px) {
                    .hub-top-bar { flex-direction: column; align-items: center; text-align: center; }
                    .hub-tabs-pills { width: 100%; overflow-x: auto; justify-content: center; }
                    .facilities-grid { grid-template-columns: 1fr; }
                    .gallery-feed-grid { grid-template-columns: repeat(2, 1fr); }
                    .testimonials-grid { grid-template-columns: 1fr; }
                    .hub-bottom-actions { flex-direction: column; align-items: flex-start; }
                }

                @media (max-width: 500px) {
                    .campus-hub-container { padding: 1.2rem 1rem; }
                    .hub-tab-btn { font-size: 0.78rem; padding: 0.5rem 0.8rem; }
                    .gallery-feed-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
};

export default CampusExperienceHub;
