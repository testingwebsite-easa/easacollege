import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaMicrophone,
    FaClock,
    FaTimes,
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
    FaCheckCircle,
    FaStar,
    FaQuoteLeft,
    FaBuilding,
    FaGraduationCap
} from 'react-icons/fa';

const ALUMNI_TALKS = [
    {
        id: 'talk-1',
        title: 'Demystifying Generative AI & Large-Scale Cloud Architectures',
        speaker: 'UTPAL SHARMA',
        batch: 'B.Tech. CSE | Batch: 2018 - 22',
        role: 'SENIOR SOFTWARE ENGINEER',
        company: 'HARMAN INTERNATIONAL BANGALORE',
        category: 'AI & Cloud',
        date: 'Recent Masterclass',
        duration: '60 mins',
        tag: 'KEYNOTE MASTERCLASS',
        avatarBg: 'linear-gradient(135deg, #1B2A6B 0%, #009FE3 100%)',
        accentColor: '#009FE3',
        quote: 'My journey at EASA College (2018 - 2022) has been one of the most defining phases of my life. The institution provided a strong academic environment that helped me build a solid foundation in both technical knowledge and practical skills through hands-on labs, real-time projects, and industry-oriented learning.',
        summary: 'Utpal returns to campus to share insights on how Generative AI, transformer architectures, and multi-cloud scalability are revolutionizing enterprise computing.',
        keyTakeaways: [
            'Enterprise deployment of Multi-modal Large Language Models',
            'Latency reduction and edge computing optimization'
        ]
    },
    {
        id: 'talk-2',
        title: 'From College Lab Prototype to a $5M Robotics Startup',
        speaker: 'PRIYA RAJENDRAN',
        batch: 'B.E. ECE | Batch: 2012 - 16',
        role: 'FOUNDER & CEO',
        company: 'NEXUS ROBOTICS PVT LTD',
        category: 'Entrepreneurship',
        date: 'Fireside Chat',
        duration: '50 mins',
        tag: 'STARTUP DIALOGUE',
        avatarBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
        accentColor: '#38BDF8',
        quote: 'When I think back to my days at EASA, a wave of nostalgia washes over me. Stepping into the vibrant tech workshop was one of the biggest transitions of my life. Hands-on mentoring in IDEA Labs gave me the courage to build and scale an autonomous robotics enterprise straight out of college.',
        summary: 'Priya shares her inspiring entrepreneurial transition from student project in the electronics workshop to scaling an autonomous industrial IoT robotics venture.',
        keyTakeaways: [
            'Prototyping MVPs in institutional IDEA Labs',
            'Seed funding strategies and early client acquisition'
        ]
    },
    {
        id: 'talk-3',
        title: 'Modern Power Electronics & Sustainable Renewable Microgrids',
        speaker: 'CHERUVUPALLI SREE KAVYA',
        batch: 'B.Tech. CSE (AIML) | Batch: 2021 - 25',
        role: 'ASSOCIATE DATA SCIENTIST',
        company: 'GLOBAL CLOUD DYNAMICS',
        category: 'AI & Cloud',
        date: 'Featured Session',
        duration: '55 mins',
        tag: 'FEATURED MASTERCLASS',
        avatarBg: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        accentColor: '#A855F7',
        quote: 'My journey at EASA has been filled with experiences that shaped my technical thinking and confidence. The practical AI curriculum, national hackathons, and constant faculty mentorship transformed my passion into a rewarding career in high-scale AI engineering.',
        summary: 'A deep-dive technical lecture focusing on smart grid stability, high-voltage battery storage, and the global engineering transition towards 100% renewables.',
        keyTakeaways: [
            'Modern power electronics for large-scale grid integration',
            'Global compliance standards and automated fault detection'
        ]
    },
    {
        id: 'talk-4',
        title: 'Cracking Top Tier MNCs: The Software Engineering Playbook',
        speaker: 'VENKATESH RAMAN',
        batch: 'B.E. CSE | Batch: 2011 - 15',
        role: 'STAFF SOFTWARE ENGINEER',
        company: 'GOOGLE USA',
        category: 'Career & Tech',
        date: 'Mentorship Session',
        duration: '65 mins',
        tag: 'CAREER BLUEPRINT',
        avatarBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
        accentColor: '#10B981',
        quote: 'Consistency, active peer learning, and real-time coding projects at EASA made all the difference in cracking global tier-1 tech algorithmic interviews and engineering leadership rounds. Always stay curious and build with intent.',
        summary: 'Venkatesh walks engineering students through high-performance distributed systems design, data structure mastery, and global interview success tactics.',
        keyTakeaways: [
            'Mastering distributed caching and microservice design',
            'Navigating algorithmic coding rounds for tier-1 tech firms'
        ]
    },
    {
        id: 'talk-5',
        title: 'Modern Automotive Systems & EV Powertrain Innovations',
        speaker: 'ARVIND SUBRAMANIAN',
        batch: 'B.E. MECH | Batch: 2011 - 15',
        role: 'VEHICLE DYNAMICS LEAD',
        company: 'TESLA / EV MOBILITY LABS',
        category: 'Core Engineering',
        date: 'Guest Keynote',
        duration: '45 mins',
        tag: 'EV MOBILITY TECH',
        avatarBg: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
        accentColor: '#F97316',
        quote: 'EASA gave us the freedom to experiment and design Formula student prototypes in the mechanical workshops that laid my direct path into cutting-edge EV dynamics, regenerative braking, and autonomous mobility control.',
        summary: 'An exploration into the next era of electric vehicles, thermal management architectures, regenerative braking, and autonomous drive systems.',
        keyTakeaways: [
            'Thermal dynamics in high-density lithium battery packs',
            'Mechatronics integration in autonomous vehicle control'
        ]
    },
    {
        id: 'talk-6',
        title: 'Storytelling, Digital Media Technologies & Creative Leadership',
        speaker: 'KARTHIK SUBBARAJ',
        batch: 'B.E. MECHATRONICS | Batch: 2008 - 12',
        role: 'FILM DIRECTOR & PRODUCER',
        company: 'STONE BENCH CREATIONS',
        category: 'Leadership & Creative',
        date: 'Inspire Series',
        duration: '75 mins',
        tag: 'SPECIAL TALK',
        avatarBg: 'linear-gradient(135deg, #DB2777 0%, #9D174D 100%)',
        accentColor: '#EC4899',
        quote: 'College is where passion meets purpose. The diverse environment, creative camaraderie, and interdisciplinary engineering at EASA shaped my vision and creative fearlessness to tell authentic stories on the global stage.',
        summary: 'A celebrated talk exploring the synthesis of technical precision, creative storytelling, cinematography innovations, and creative entrepreneurship.',
        keyTakeaways: [
            'Harnessing analytical engineering mindset for creative problem solving',
            'Leading multi-disciplinary production and visual effects teams'
        ]
    }
];

const CATEGORIES = ['All', 'AI & Cloud', 'Entrepreneurship', 'Core Engineering', 'Career & Tech', 'Leadership & Creative'];

const getInitials = (name) => {
    return name
        .replace(/^(DR\.|MR\.|MS\.|MRS\.)\s+/i, '')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

const AlumniTalkSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalTalk, setActiveModalTalk] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredTalks = selectedCategory === 'All'
        ? ALUMNI_TALKS
        : ALUMNI_TALKS.filter(talk => talk.category === selectedCategory);

    const totalTalks = filteredTalks.length;
    const safeIndex = Math.min(currentIndex, Math.max(0, totalTalks - 1));
    const currentTalk = filteredTalks[safeIndex] || filteredTalks[0];

    useEffect(() => {
        setCurrentIndex(0);
    }, [selectedCategory]);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : totalTalks - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev < totalTalks - 1 ? prev + 1 : 0));
    };

    if (!currentTalk) return null;

    return (
        <section id="alumni-talk-section" className="alumni-single-section">
            {/* Ambient Lighting Gradients */}
            <div className="alumni-glow glow-gold" />
            <div className="alumni-glow glow-blue" />

            <div className="container">
                
                {/* SECTION HEADER */}
                <div className="alumni-header-row">
                    <div className="alumni-title-side">
                        <div className="alumni-badge-pill">
                            <FaMicrophone className="pulse-mic-icon" />
                            <span>EASA ALUMNI TALK SERIES</span>
                        </div>
                        <h2 className="alumni-main-title">
                            LEARN FROM OUR <span className="gold-text">GLOBAL ALUMNI</span>
                        </h2>
                    </div>

                    <div className="alumni-actions-side">
                        <div className="alumni-filter-tabs">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`filter-tab-pill ${selectedCategory === category ? 'active' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {totalTalks > 1 && (
                            <div className="alumni-nav-cluster">
                                <button
                                    onClick={handlePrev}
                                    className="alumni-nav-btn"
                                    aria-label="Previous talk"
                                >
                                    <FaChevronLeft size={13} />
                                </button>
                                <span className="alumni-counter-txt">
                                    {safeIndex + 1} / {totalTalks}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="alumni-nav-btn"
                                    aria-label="Next talk"
                                >
                                    <FaChevronRight size={13} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* SINGLE FEATURED SHOWCASE CARD */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTalk.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="alumni-single-showcase-card"
                        onClick={() => setActiveModalTalk(currentTalk)}
                    >
                        {/* LEFT: PROFILE SHIELD & IDENTITY */}
                        <div className="showcase-left-profile">
                            <div
                                className="showcase-avatar-shield"
                                style={{
                                    background: currentTalk.avatarBg,
                                    borderColor: currentTalk.accentColor
                                }}
                            >
                                <span className="avatar-initials-txt">{getInitials(currentTalk.speaker)}</span>
                            </div>

                            <h4 className="showcase-speaker-name">{currentTalk.speaker}</h4>
                            <p className="showcase-batch-label">{currentTalk.batch}</p>

                            <div className="showcase-org-badge">
                                <span className="org-label">ORGANIZATION</span>
                                <span className="org-val">{currentTalk.company}</span>
                            </div>

                            <div className="showcase-desig-badge">
                                <span className="desig-label">DESIGNATION</span>
                                <span className="desig-val">{currentTalk.role}</span>
                            </div>

                            <div className="showcase-stars-row">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="star-icon" size={14} />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: CURVED SPEECH BUBBLE TESTIMONIAL */}
                        <div className="showcase-right-bubble">
                            <div className="showcase-bubble-pointer" />

                            <div className="bubble-header-bar">
                                <div className="bubble-stars-group">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="star-icon" size={15} />
                                    ))}
                                </div>
                                <div className="bubble-tags-wrap">
                                    <span className="bubble-tag-pill">{currentTalk.tag}</span>
                                    <span className="bubble-duration-pill">
                                        <FaClock size={11} />
                                        <span>{currentTalk.duration}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="bubble-quote-wrap">
                                <FaQuoteLeft className="bubble-quote-icon" />
                                <p className="bubble-quote-text">
                                    {currentTalk.quote}
                                </p>
                            </div>

                            <div className="bubble-footer-bar">
                                <div className="bubble-topic-side">
                                    <span className="topic-sub-label">MASTERCLASS TOPIC</span>
                                    <h5 className="topic-main-title">{currentTalk.title}</h5>
                                </div>
                                <button
                                    className="bubble-action-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveModalTalk(currentTalk);
                                    }}
                                >
                                    <span>View Masterclass Details</span>
                                    <FaArrowRight size={11} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* SLIDE PAGINATION DOTS */}
                {totalTalks > 1 && (
                    <div className="alumni-dots-pagination">
                        {filteredTalks.map((t, idx) => (
                            <button
                                key={t.id}
                                onClick={() => setCurrentIndex(idx)}
                                className={`pagination-dot ${safeIndex === idx ? 'active' : ''}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

            </div>

            {/* COMPACT INTERACTIVE MODAL */}
            <AnimatePresence>
                {activeModalTalk && (
                    <div className="alumni-modal-overlay" onClick={() => setActiveModalTalk(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="alumni-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-exit-btn"
                                onClick={() => setActiveModalTalk(null)}
                                aria-label="Close"
                            >
                                <FaTimes size={13} />
                            </button>

                            <div className="modal-header-box">
                                <div className="modal-top-badges">
                                    <span className="modal-tag-pill">{activeModalTalk.tag}</span>
                                    <span className="modal-dur-tag">
                                        <FaClock size={11} />
                                        <span>{activeModalTalk.duration}</span>
                                    </span>
                                </div>
                                <h3 className="modal-talk-heading">{activeModalTalk.title}</h3>
                                
                                <div className="modal-speaker-row">
                                    <div
                                        className="modal-initials-avatar"
                                        style={{ background: activeModalTalk.avatarBg, borderColor: activeModalTalk.accentColor }}
                                    >
                                        {getInitials(activeModalTalk.speaker)}
                                    </div>
                                    <div className="modal-speaker-info">
                                        <h4 className="modal-speaker-name">{activeModalTalk.speaker}</h4>
                                        <p className="modal-speaker-meta">{activeModalTalk.role} • <strong>{activeModalTalk.company}</strong></p>
                                        <span className="modal-speaker-sub">{activeModalTalk.batch}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body-content">
                                <div className="modal-quote-snippet">
                                    <FaQuoteLeft className="quote-icon" />
                                    <p className="quote-text">"{activeModalTalk.quote}"</p>
                                </div>

                                <div className="modal-takeaways-box">
                                    <h5 className="modal-takeaways-heading">Key Highlights:</h5>
                                    <ul className="modal-bullet-list">
                                        {activeModalTalk.keyTakeaways.map((item, idx) => (
                                            <li key={idx}>
                                                <FaCheckCircle className="bullet-check" size={11} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="modal-action-footer">
                                <span className="modal-format-hint">Format: Masterclass & Q&A</span>
                                <Link to="/alumni" className="modal-join-btn" onClick={() => setActiveModalTalk(null)}>
                                    <span>Alumni Portal</span>
                                    <FaArrowRight size={11} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* STYLES */}
            <style>{`
                .alumni-single-section {
                    padding: 2.75rem 0 3.25rem;
                    background: var(--bg-main, #0B1120);
                    position: relative;
                    overflow: hidden;
                }

                .alumni-glow {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    filter: blur(140px);
                    pointer-events: none;
                    opacity: 0.18;
                    z-index: 0;
                }

                .glow-gold {
                    top: -50px;
                    right: 8%;
                    background: radial-gradient(circle, #FDBC12 0%, rgba(253, 188, 18, 0) 70%);
                }

                .glow-blue {
                    bottom: -50px;
                    left: 8%;
                    background: radial-gradient(circle, #1B2A6B 0%, rgba(27, 42, 107, 0) 70%);
                }

                /* HEADER */
                .alumni-header-row {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 1.5rem;
                    margin-bottom: 1.75rem;
                    flex-wrap: wrap;
                    position: relative;
                    z-index: 1;
                }

                .alumni-title-side {
                    flex: 1 1 320px;
                }

                .alumni-badge-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.25rem 0.85rem;
                    border-radius: 50px;
                    background: rgba(253, 188, 18, 0.12);
                    border: 1px solid rgba(253, 188, 18, 0.35);
                    color: var(--secondary, #FDBC12);
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.6px;
                    margin-bottom: 0.4rem;
                }

                .pulse-mic-icon {
                    animation: talkPulse 2s infinite;
                }

                @keyframes talkPulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .alumni-main-title {
                    font-size: 1.95rem;
                    font-weight: 900;
                    color: #FFFFFF;
                    margin: 0;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                }

                .gold-text {
                    background: linear-gradient(135deg, #FDBC12 0%, #F59E0B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .alumni-actions-side {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .alumni-filter-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                }

                .filter-tab-pill {
                    padding: 0.35rem 0.85rem;
                    border-radius: 50px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(15, 23, 42, 0.6);
                    color: #94A3B8;
                    font-size: 0.76rem;
                    font-weight: 600;
                    cursor: pointer;
                    backdrop-filter: blur(8px);
                    transition: all 0.2s ease;
                }

                .filter-tab-pill:hover {
                    color: #FFFFFF;
                    border-color: rgba(253, 188, 18, 0.4);
                }

                .filter-tab-pill.active {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2e2d78 100%);
                    color: #FDBC12;
                    border-color: #FDBC12;
                    box-shadow: 0 2px 10px rgba(253, 188, 18, 0.2);
                }

                .alumni-nav-cluster {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .alumni-nav-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    background: rgba(15, 23, 42, 0.7);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .alumni-nav-btn:hover {
                    background: #1B2A6B;
                    border-color: #FDBC12;
                    color: #FDBC12;
                    transform: scale(1.06);
                }

                .alumni-counter-txt {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #94A3B8;
                    min-width: 38px;
                    text-align: center;
                }

                /* SINGLE SHOWCASE CARD */
                .alumni-single-showcase-card {
                    display: flex;
                    align-items: stretch;
                    gap: 1.5rem;
                    background: rgba(15, 23, 42, 0.65);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 1.6rem 1.8rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
                    position: relative;
                    z-index: 1;
                }

                .alumni-single-showcase-card:hover {
                    border-color: rgba(253, 188, 18, 0.45);
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.4), 0 0 25px rgba(253, 188, 18, 0.12);
                }

                /* LEFT PROFILE */
                .showcase-left-profile {
                    flex: 0 0 240px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding-right: 1.5rem;
                    border-right: 1px dashed rgba(255, 255, 255, 0.12);
                    justify-content: center;
                }

                .showcase-avatar-shield {
                    width: 78px;
                    height: 78px;
                    border-radius: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid #FDBC12;
                    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
                    margin-bottom: 0.75rem;
                }

                .avatar-initials-txt {
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #FFFFFF;
                }

                .showcase-speaker-name {
                    font-size: 1.05rem;
                    font-weight: 900;
                    color: #FFFFFF;
                    margin: 0 0 3px;
                    line-height: 1.2;
                }

                .showcase-batch-label {
                    font-size: 0.74rem;
                    color: #009FE3;
                    font-weight: 700;
                    margin: 0 0 0.75rem;
                }

                .showcase-org-badge, .showcase-desig-badge {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 8px;
                    padding: 4px 8px;
                    width: 100%;
                    box-sizing: border-box;
                    margin-bottom: 0.4rem;
                }

                .org-label, .desig-label {
                    display: block;
                    font-size: 0.58rem;
                    font-weight: 800;
                    color: #94A3B8;
                    letter-spacing: 0.4px;
                    line-height: 1;
                    margin-bottom: 2px;
                }

                .org-val, .desig-val {
                    display: block;
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .showcase-stars-row {
                    display: flex;
                    gap: 3px;
                    margin-top: 0.4rem;
                }

                .star-icon {
                    color: #F59E0B;
                }

                /* RIGHT SPEECH BUBBLE */
                .showcase-right-bubble {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                }

                .showcase-bubble-pointer {
                    position: absolute;
                    left: -28px;
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                    width: 14px;
                    height: 14px;
                    background: rgba(15, 23, 42, 0.65);
                    border-left: 1px solid rgba(255, 255, 255, 0.08);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .bubble-header-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.85rem;
                }

                .bubble-stars-group {
                    display: flex;
                    gap: 3px;
                }

                .bubble-tags-wrap {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .bubble-tag-pill {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #FDBC12;
                    background: rgba(253, 188, 18, 0.12);
                    border: 1px solid rgba(253, 188, 18, 0.3);
                    padding: 2px 10px;
                    border-radius: 50px;
                }

                .bubble-duration-pill {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.74rem;
                    color: #94A3B8;
                    font-weight: 600;
                }

                .bubble-quote-wrap {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.025);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 14px;
                    padding: 1.1rem 1.35rem;
                    margin-bottom: 1rem;
                    flex-grow: 1;
                }

                .bubble-quote-icon {
                    color: #FDBC12;
                    opacity: 0.7;
                    font-size: 1.4rem;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .bubble-quote-text {
                    font-size: 0.94rem;
                    color: #E2E8F0;
                    line-height: 1.6;
                    font-style: italic;
                    margin: 0;
                }

                .bubble-footer-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1.25rem;
                    padding-top: 0.65rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .bubble-topic-side {
                    flex: 1;
                    min-width: 0;
                }

                .topic-sub-label {
                    display: block;
                    font-size: 0.64rem;
                    font-weight: 800;
                    color: #FDBC12;
                    letter-spacing: 0.5px;
                    margin-bottom: 1px;
                }

                .topic-main-title {
                    font-size: 0.92rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .bubble-action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #1B2A6B 0%, #2e2d78 100%);
                    border: 1px solid rgba(253, 188, 18, 0.4);
                    color: #FDBC12;
                    font-size: 0.82rem;
                    font-weight: 800;
                    padding: 0.55rem 1.2rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .bubble-action-btn:hover {
                    background: #FDBC12;
                    color: #0F172A;
                    transform: translateY(-2px);
                }

                /* PAGINATION DOTS */
                .alumni-dots-pagination {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .pagination-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    transition: all 0.25s ease;
                    padding: 0;
                }

                .pagination-dot.active {
                    width: 28px;
                    border-radius: 50px;
                    background: linear-gradient(135deg, #FDBC12 0%, #E5A800 100%);
                    border-color: #FDBC12;
                    box-shadow: 0 0 10px rgba(253, 188, 18, 0.4);
                }

                /* MODAL */
                .alumni-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: rgba(3, 7, 18, 0.85);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }

                .alumni-modal-content {
                    background: #0F172A;
                    border: 1px solid rgba(253, 188, 18, 0.35);
                    border-radius: 18px;
                    max-width: 480px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
                    position: relative;
                    overflow: hidden;
                }

                .modal-exit-btn {
                    position: absolute;
                    top: 0.85rem;
                    right: 0.85rem;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s ease;
                }

                .modal-exit-btn:hover {
                    background: #E11D48;
                    transform: rotate(90deg);
                }

                .modal-top-section {
                    padding: 1.25rem 1.4rem 1rem;
                    background: linear-gradient(180deg, rgba(27, 42, 107, 0.45) 0%, transparent 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .modal-pill-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 0.5rem;
                }

                .modal-tag-pill {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #FDBC12;
                    background: rgba(253, 188, 18, 0.15);
                    padding: 2px 8px;
                    border-radius: 50px;
                }

                .modal-dur-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.72rem;
                    color: #94A3B8;
                    font-weight: 600;
                }

                .modal-talk-heading {
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.3;
                    margin: 0 0 0.85rem;
                }

                .modal-speaker-row {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .modal-initials-avatar {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.95rem;
                    font-weight: 900;
                    color: #FFFFFF;
                    flex-shrink: 0;
                    border: 2px solid #FDBC12;
                }

                .modal-speaker-info {
                    flex-grow: 1;
                    min-width: 0;
                }

                .modal-name {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                }

                .modal-role {
                    font-size: 0.76rem;
                    color: #94A3B8;
                    margin: 1px 0;
                }

                .modal-batch {
                    font-size: 0.72rem;
                    color: #FDBC12;
                    font-weight: 600;
                }

                .modal-main-body {
                    padding: 1rem 1.4rem;
                }

                .modal-quote-snippet {
                    background: rgba(253, 188, 18, 0.06);
                    border-left: 3px solid #FDBC12;
                    padding: 0.75rem 1rem;
                    border-radius: 0 8px 8px 0;
                    margin-bottom: 0.85rem;
                }

                .quote-icon {
                    color: #FDBC12;
                    opacity: 0.6;
                    font-size: 0.8rem;
                    margin-bottom: 0.2rem;
                }

                .quote-text {
                    font-size: 0.82rem;
                    font-style: italic;
                    color: #E2E8F0;
                    line-height: 1.45;
                    margin: 0;
                }

                .modal-takeaways-box {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 10px;
                    padding: 0.75rem 0.9rem;
                }

                .modal-takeaways-heading {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #FFFFFF;
                    margin: 0 0 0.4rem;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                }

                .modal-bullet-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .modal-bullet-list li {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8rem;
                    color: #CBD5E1;
                }

                .bullet-check {
                    color: #10B981;
                    flex-shrink: 0;
                }

                .modal-action-footer {
                    padding: 0.75rem 1.4rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    background: rgba(0, 0, 0, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }

                .modal-format-hint {
                    font-size: 0.74rem;
                    color: #94A3B8;
                }

                .modal-join-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: linear-gradient(135deg, #1B2A6B 0%, #2e2d78 100%);
                    border: 1px solid rgba(253, 188, 18, 0.4);
                    color: #FDBC12;
                    font-size: 0.78rem;
                    font-weight: 800;
                    padding: 0.4rem 0.9rem;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .modal-join-btn:hover {
                    background: #FDBC12;
                    color: #0F172A;
                }

                /* RESPONSIVE */
                @media (max-width: 860px) {
                    .alumni-single-showcase-card {
                        flex-direction: column;
                        padding: 1.25rem;
                    }
                    .showcase-left-profile {
                        flex: 0 0 auto;
                        width: 100%;
                        border-right: none;
                        border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
                        padding-right: 0;
                        padding-bottom: 1rem;
                    }
                    .showcase-bubble-pointer {
                        display: none;
                    }
                    .bubble-footer-bar {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.75rem;
                    }
                    .bubble-action-btn {
                        width: 100%;
                        justify-content: center;
                    }
                }

                @media (max-width: 640px) {
                    .alumni-main-title {
                        font-size: 1.5rem;
                    }
                    .alumni-header-row {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    .alumni-actions-side {
                        width: 100%;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </section>
    );
};

export default AlumniTalkSection;
