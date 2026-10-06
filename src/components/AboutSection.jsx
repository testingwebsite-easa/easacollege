import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUniversity,
    FaGraduationCap,
    FaMicrochip,
    FaBriefcase,
    FaArrowRight,
    FaCheck,
    FaAward,
    FaMapMarkerAlt,
    FaQuoteLeft,
    FaBookOpen,
    FaUsers,
    FaShieldAlt
} from 'react-icons/fa';
import aicteIdeaLabLogo from '../assets/aicte-idea-lab.png';
import about1Img from '../assets/about1.jpg';

const STORY_CHAPTERS = [
    {
        id: 'legacy',
        tabLabel: 'Legacy & Vision',
        icon: <FaUniversity />,
        badge: 'FOUNDED 2008 • COIMBATORE',
        title: 'A Premier Center for Value-Based Technical Education',
        subtitle: 'Nestled along the scenic Western Ghats in Navakkarai, Coimbatore, EASA College of Engineering and Technology has spent nearly two decades cultivating visionary technocrats and ethical leaders.',
        highlights: [
            {
                title: '25-Acre Eco-Friendly Tech Campus',
                desc: 'State-of-the-art academic blocks, digital research libraries, and modern student living facilities on NH-47.'
            },
            {
                title: 'Anna University Affiliated & AICTE Approved',
                desc: 'Conferred Autonomous status with full academic freedom to design future-ready engineering curricula.'
            },
            {
                title: 'Holistic Student Development',
                desc: 'Focusing on technical rigor, entrepreneurial spirit, research publications, and societal responsibility.'
            }
        ],
        quote: '“We don’t just teach engineering; we ignite curiosity, build character, and empower students to solve real-world challenges.”',
        quoteAuthor: 'EASA Academic Advisory Board',
        image: about1Img,
        primaryCta: { label: 'Explore Our Heritage', link: '/institution' },
        secondaryCta: { label: 'Campus Life & Facilities', link: '/campus-life' }
    },
    {
        id: 'autonomous',
        tabLabel: 'Autonomous Advantage',
        icon: <FaGraduationCap />,
        badge: 'ACADEMIC FREEDOM 2026',
        title: 'Industry-Integrated Choice-Based Credit System',
        subtitle: 'Our Autonomous mandate allows us to swiftly adapt to emerging technology paradigms, giving students a dynamic blend of core engineering mastery and high-demand specialized minors.',
        highlights: [
            {
                title: 'Specialized Tech Minors',
                desc: 'Interdisciplinary elective tracks in Generative AI, Robotics, Cyber Security, Cloud Architecture & Electric Vehicles.'
            },
            {
                title: 'Mandatory Industrial Internships',
                desc: 'Structured semester-long internships with leading MNCs ensuring immediate day-one productivity.'
            },
            {
                title: 'Continuous Experiential Evaluation',
                desc: 'Shift from rote exams to project-based learning, hackathon participation, and technical paper publications.'
            }
        ],
        quote: '“Autonomous status enables us to bridge the gap between classroom theory and multi-national industrial requirements.”',
        quoteAuthor: 'Dean of Academic Affairs',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
        primaryCta: { label: 'View Autonomous Regulations', link: '/syllabus' },
        secondaryCta: { label: 'Academic Programs', link: '/courses' }
    },
    {
        id: 'innovation',
        tabLabel: 'IDEA Lab & R&D',
        icon: <FaMicrochip />,
        badge: '₹1.2 CR AICTE IDEA LAB',
        title: 'Hands-On Prototyping, Patents & Startup Incubation',
        subtitle: 'Our campus is an active sandbox for breakthrough engineering ideas. From 3D printing labs to drone testing tracks, we provide students the tools to convert concepts into commercial patents.',
        highlights: [
            {
                title: 'AICTE IDEA Superlab',
                desc: 'Industrial 3D printers, CNC laser engravers, robotic manipulators, and high-performance GPU workstations.'
            },
            {
                title: 'Ascend Startup Incubation Hub',
                desc: 'Pre-seed funding, legal patent filing support, and direct mentorship from experienced startup founders.'
            },
            {
                title: 'Sponsored Research & Patents',
                desc: 'Funded research projects supported by DST, AICTE, and premier industrial consortiums.'
            }
        ],
        quote: '“Every student at EASA has access to open-ended labs 24/7 to design, build, test, and patent their inventions.”',
        quoteAuthor: 'Director of Innovation & Research',
        image: aicteIdeaLabLogo,
        primaryCta: { label: 'Discover Innovation Hub', link: '/research' },
        secondaryCta: { label: 'View IDEA Lab Facilities', link: '/idea-lab' }
    },
    {
        id: 'careers',
        tabLabel: 'Corporate & Global Mobility',
        icon: <FaBriefcase />,
        badge: 'RECORD 96% PLACEMENTS',
        title: 'Elite Campus Placements & Overseas Career Pathways',
        subtitle: 'With 150+ corporate hiring partners and an in-house Centre for Foreign Languages (Japanese, German, French, Spanish), our graduates secure dream CTC offers in India and across the globe.',
        highlights: [
            {
                title: '150+ Top Tier Recruiters',
                desc: 'Amazon, Bosch, Zoho, TCS, Infosys, Cognizant, and Japanese tech conglomerates regularly recruit our talent.'
            },
            {
                title: 'Global Mobility & Foreign Languages',
                desc: 'Sponsored JLPT, Goethe, and DELF language coaching for direct placements in Tokyo, Germany, and Europe.'
            },
            {
                title: 'Day-One Career Training',
                desc: 'Rigorous 360-degree training covering full-stack coding, data structures, corporate etiquette, and communication.'
            }
        ],
        quote: '“Our robust placement ecosystem empowers students from all backgrounds to step into high-growth global careers.”',
        quoteAuthor: 'Head of Corporate Relations & Placements',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
        primaryCta: { label: 'Explore Placement Report', link: '/placement' },
        secondaryCta: { label: 'Foreign Language Centre', link: '/higher-education' }
    }
];

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    const currentStory = STORY_CHAPTERS[activeTab];

    return (
        <section className="easa-about-human-section" aria-label="About EASA College of Engineering and Technology">
            {/* Subtle atmospheric ambient glows */}
            <div className="ambient-warm-glow top-left" />
            <div className="ambient-warm-glow bottom-right" />

            <div className="about-wrapper">

                {/* Section Header: Authentic University Masthead */}
                <div className="about-header-masthead">
                    <div className="masthead-eyebrow">
                        <FaShieldAlt className="shield-icon" />
                        <span>ABOUT EASA COLLEGE OF ENGINEERING &amp; TECHNOLOGY</span>
                    </div>
                    <h2 className="masthead-heading">
                        Rooted in Heritage. Driven by Autonomy.{' '}
                        <span className="heading-accent">Shaping Tomorrow's Engineers.</span>
                    </h2>
                    <p className="masthead-lede">
                        Approved by AICTE, affiliated to Anna University, and accredited for academic excellence—EASA stands as a vibrant landmark of technological innovation and career empowerment in Coimbatore.
                    </p>
                </div>

                {/* Main Human-Crafted Split Showcase */}
                <div className="about-main-canvas">

                    {/* Left Column: Interactive Story Navigator */}
                    <div className="story-nav-column">
                        
                        {/* Chapter Tabs Bar */}
                        <div className="chapter-tabs-strip">
                            {STORY_CHAPTERS.map((ch, idx) => {
                                const isActive = activeTab === idx;
                                return (
                                    <button
                                        key={ch.id}
                                        type="button"
                                        onClick={() => setActiveTab(idx)}
                                        className={`chapter-tab-button ${isActive ? 'active' : ''}`}
                                    >
                                        <span className="tab-icon">{ch.icon}</span>
                                        <span className="tab-title">{ch.tabLabel}</span>
                                        {isActive && <motion.div layoutId="activeTabIndicator" className="active-pill-glow" />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Chapter Body Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStory.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.28, ease: 'easeOut' }}
                                className="chapter-content-body"
                            >
                                <div className="chapter-meta-row">
                                    <span className="chapter-badge">{currentStory.badge}</span>
                                </div>

                                <h3 className="chapter-heading">{currentStory.title}</h3>
                                <p className="chapter-subtitle">{currentStory.subtitle}</p>

                                {/* Highlights 3-Point Checklist */}
                                <div className="chapter-highlights-list">
                                    {currentStory.highlights.map((h, i) => (
                                        <div key={i} className="highlight-row">
                                            <div className="highlight-bullet">
                                                <FaCheck size={10} />
                                            </div>
                                            <div className="highlight-text-wrap">
                                                <strong className="highlight-title">{h.title}:</strong>{' '}
                                                <span className="highlight-desc">{h.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Authentic Quote Callout */}
                                <div className="chapter-quote-box">
                                    <FaQuoteLeft className="quote-glyph" />
                                    <div className="quote-text-col">
                                        <p className="quote-text">{currentStory.quote}</p>
                                        <span className="quote-author">— {currentStory.quoteAuthor}</span>
                                    </div>
                                </div>

                                {/* Call to Action Links */}
                                <div className="chapter-actions-row">
                                    <a href={currentStory.primaryCta.link} className="btn-primary-gold">
                                        <span>{currentStory.primaryCta.label}</span>
                                        <FaArrowRight size={11} />
                                    </a>
                                    <a href={currentStory.secondaryCta.link} className="btn-secondary-outline">
                                        <span>{currentStory.secondaryCta.label}</span>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                    </div>

                    {/* Right Column: Large Circular Photo with Animated Concentric Tech Rings */}
                    <div className="prestige-visual-column">
                        
                        {/* Enlarged Circular Rotating Ring Portal Showcase */}
                        <div className="circular-portal-wrapper">
                            {/* Decorative Tech Accents */}
                            <div className="tech-corner-chevrons top-right">
                                <span>&raquo;&raquo;&raquo;</span>
                            </div>
                            <div className="tech-crosshair bottom-left">+</div>
                            <div className="tech-dot top-left">&#9675;</div>
                            <div className="tech-dot bottom-right">&#9675;</div>

                            {/* Outer Animated Segmented Ring (Counter-Clockwise) */}
                            <div className="ring-outer-segmented" />

                            {/* Middle Animated Dashed Ring (Clockwise) */}
                            <div className="ring-middle-dashed" />

                            {/* Inner Accent Ring with Tech Bevel */}
                            <div className="ring-inner-bevel" />

                            {/* Large Center Circular Photo */}
                            <div className="circular-photo-container">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentStory.id}
                                        src={currentStory.image}
                                        alt={currentStory.title}
                                        className={`portal-photo ${currentStory.id === 'innovation' ? 'portal-photo-idealab' : ''}`}
                                        initial={{ opacity: 0, scale: currentStory.id === 'innovation' ? 1.45 : 1.08 }}
                                        animate={{ opacity: 1, scale: currentStory.id === 'innovation' ? 1.36 : 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.35 }}
                                    />
                                </AnimatePresence>
                                <div className="portal-photo-glass-glare" />
                            </div>

                            {/* Floating Campus Geography Tag */}
                            <div className="portal-floating-tag">
                                {currentStory.id === 'innovation' ? (
                                    <>
                                        <FaMicrochip className="portal-geo-icon" style={{ color: '#FCCA26' }} />
                                        <div>
                                            <h5 className="portal-geo-title">AICTE IDEA Superlab</h5>
                                            <span className="portal-geo-sub">₹1.2 Crore Prototyping Sandbox</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <FaMapMarkerAlt className="portal-geo-icon" />
                                        <div>
                                            <h5 className="portal-geo-title">Navakkarai, Coimbatore</h5>
                                            <span className="portal-geo-sub">NH-47 Palakkad Highway, TN</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Four Verified Institutional Milestones */}
                        <div className="milestones-quad-grid">
                            <div className="milestone-box">
                                <div className="milestone-icon-pod"><FaAward /></div>
                                <div className="milestone-info">
                                    <strong className="milestone-value">ESTD. 2008</strong>
                                    <span className="milestone-label">19+ Years Heritage</span>
                                </div>
                            </div>

                            <div className="milestone-box">
                                <div className="milestone-icon-pod"><FaGraduationCap /></div>
                                <div className="milestone-info">
                                    <strong className="milestone-value">Autonomous</strong>
                                    <span className="milestone-label">Anna Univ Affiliation</span>
                                </div>
                            </div>

                            <div className="milestone-box">
                                <div className="milestone-icon-pod"><FaUsers /></div>
                                <div className="milestone-info">
                                    <strong className="milestone-value">96% Record</strong>
                                    <span className="milestone-label">Placement Conversions</span>
                                </div>
                            </div>

                            <div className="milestone-box">
                                <div className="milestone-icon-pod"><FaBookOpen /></div>
                                <div className="milestone-info">
                                    <strong className="milestone-value">25 Acres</strong>
                                    <span className="milestone-label">Smart Green Campus</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <style>{`
                /* =========================================================
                   AUTHENTIC HUMAN-CRAFTED ABOUT EASA STYLING
                   ========================================================= */
                .easa-about-human-section {
                    position: relative;
                    padding: 4.5rem 1.5rem 5rem;
                    background: #090D16;
                    color: #F8FAFC;
                    overflow: hidden;
                    font-family: inherit;
                }

                .ambient-warm-glow {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    pointer-events: none;
                    z-index: 0;
                }

                .ambient-warm-glow.top-left {
                    top: -10%;
                    left: 10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(230, 182, 39, 0.08) 0%, transparent 70%);
                }

                .ambient-warm-glow.bottom-right {
                    bottom: -10%;
                    right: 10%;
                    width: 550px;
                    height: 550px;
                    background: radial-gradient(circle, rgba(27, 42, 107, 0.22) 0%, transparent 70%);
                }

                .about-wrapper {
                    max-width: 1340px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* Masthead Header */
                .about-header-masthead {
                    text-align: center;
                    max-width: 900px;
                    margin: 0 auto 3rem;
                }

                .masthead-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.4rem 1rem;
                    border-radius: 30px;
                    background: rgba(230, 182, 39, 0.08);
                    border: 1px solid rgba(230, 182, 39, 0.25);
                    color: #FCCA26;
                    font-size: 0.74rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }

                .shield-icon {
                    font-size: 0.8rem;
                }

                .masthead-heading {
                    font-size: clamp(1.8rem, 3.2vw, 2.75rem);
                    font-weight: 900;
                    line-height: 1.25;
                    color: #FFFFFF;
                    margin: 0 0 1rem 0;
                    letter-spacing: -0.6px;
                }

                .heading-accent {
                    background: linear-gradient(135deg, #FFE259 0%, #FCCA26 40%, #E6B627 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .masthead-lede {
                    font-size: 1.02rem;
                    line-height: 1.7;
                    color: #94A3B8;
                    margin: 0 auto;
                }

                /* Split Canvas Layout */
                .about-main-canvas {
                    display: grid;
                    grid-template-columns: 50% 50%;
                    gap: 2rem;
                    background: rgba(15, 23, 42, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 2.2rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
                    align-items: center;
                }

                /* Left Story Column */
                .story-nav-column {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .chapter-tabs-strip {
                    display: flex;
                    gap: 8px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    padding-bottom: 1.2rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .chapter-tab-button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 0.55rem 1rem;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    color: #94A3B8;
                    font-size: 0.8rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .chapter-tab-button:hover {
                    color: #FFFFFF;
                    background: rgba(255, 255, 255, 0.07);
                }

                .chapter-tab-button.active {
                    color: #0B0F19;
                    background: #FCCA26;
                    border-color: #FCCA26;
                    font-weight: 800;
                    box-shadow: 0 4px 15px rgba(252, 202, 38, 0.25);
                }

                .chapter-content-body {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    justify-content: space-between;
                }

                .chapter-meta-row {
                    margin-bottom: 0.6rem;
                }

                .chapter-badge {
                    display: inline-block;
                    font-size: 0.68rem;
                    font-weight: 800;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    color: #FCCA26;
                    background: rgba(252, 202, 38, 0.1);
                    border: 1px solid rgba(252, 202, 38, 0.25);
                    padding: 3px 10px;
                    border-radius: 8px;
                }

                .chapter-heading {
                    font-size: clamp(1.25rem, 1.8vw, 1.55rem);
                    font-weight: 900;
                    color: #FFFFFF;
                    line-height: 1.3;
                    margin: 0 0 0.6rem 0;
                }

                .chapter-subtitle {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: #CBD5E1;
                    margin: 0 0 1.2rem 0;
                }

                /* Highlights Checklist */
                .chapter-highlights-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.4rem;
                }

                .highlight-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 0.65rem 0.9rem;
                    border-radius: 10px;
                }

                .highlight-bullet {
                    width: 20px;
                    height: 20px;
                    border-radius: 6px;
                    background: rgba(16, 185, 129, 0.15);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    color: #10B981;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 1px;
                }

                .highlight-text-wrap {
                    font-size: 0.8rem;
                    line-height: 1.45;
                }

                .highlight-title {
                    color: #F8FAFC;
                    font-weight: 800;
                }

                .highlight-desc {
                    color: #94A3B8;
                }

                /* Quote Box */
                .chapter-quote-box {
                    display: flex;
                    gap: 12px;
                    background: rgba(27, 42, 107, 0.2);
                    border-left: 3px solid #FCCA26;
                    padding: 0.8rem 1rem;
                    border-radius: 0 12px 12px 0;
                    margin-bottom: 1.4rem;
                }

                .quote-glyph {
                    color: #FCCA26;
                    font-size: 1.1rem;
                    flex-shrink: 0;
                    margin-top: 3px;
                }

                .quote-text-col {
                    display: flex;
                    flex-direction: column;
                }

                .quote-text {
                    font-size: 0.82rem;
                    font-style: italic;
                    color: #E2E8F0;
                    line-height: 1.5;
                    margin: 0 0 4px 0;
                }

                .quote-author {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #FCCA26;
                }

                /* Action Links */
                .chapter-actions-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .btn-primary-gold {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0.65rem 1.4rem;
                    border-radius: 24px;
                    background: linear-gradient(135deg, #FFE259 0%, #FCCA26 50%, #E6B627 100%);
                    color: #0B0F19;
                    text-decoration: none;
                    font-size: 0.82rem;
                    font-weight: 900;
                    box-shadow: 0 4px 15px rgba(252, 202, 38, 0.25);
                    transition: 0.2s;
                }

                .btn-primary-gold:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 22px rgba(252, 202, 38, 0.4);
                }

                .btn-secondary-outline {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.65rem 1.2rem;
                    border-radius: 24px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #CBD5E1;
                    text-decoration: none;
                    font-size: 0.8rem;
                    font-weight: 700;
                    transition: 0.2s;
                }

                .btn-secondary-outline:hover {
                    background: rgba(255, 255, 255, 0.09);
                    color: #FFFFFF;
                }

                /* =========================================================
                   RIGHT COLUMN: ENLARGED CIRCULAR PORTAL WITH ANIMATED RINGS
                   ========================================================= */
                .prestige-visual-column {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.8rem;
                }

                .circular-portal-wrapper {
                    position: relative;
                    width: 440px;
                    height: 440px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0.5rem auto;
                }

                /* Large Center Circular Photo */
                .circular-photo-container {
                    position: relative;
                    width: 320px;
                    height: 320px;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
                    border: 5px solid #ffffff;
                    z-index: 2;
                    background: #0B1120;
                }

                .portal-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    display: block;
                }

                .portal-photo-idealab {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    transform-origin: center center;
                }

                .portal-photo-glass-glare {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.22) 0%, transparent 60%);
                    pointer-events: none;
                }

                /* Inner Tech Bevel Ring */
                .ring-inner-bevel {
                    position: absolute;
                    width: 345px;
                    height: 345px;
                    border-radius: 50%;
                    border: 2.5px solid rgba(252, 202, 38, 0.5);
                    box-shadow: 0 0 20px rgba(252, 202, 38, 0.3);
                    z-index: 1;
                    pointer-events: none;
                }

                /* Middle Dashed Ring (Clockwise Rotation) */
                .ring-middle-dashed {
                    position: absolute;
                    width: 385px;
                    height: 385px;
                    border-radius: 50%;
                    border: 3px dashed rgba(255, 255, 255, 0.75);
                    z-index: 1;
                    pointer-events: none;
                    animation: ringRotateClockwise 22s linear infinite;
                }

                /* Outer Segmented Ring (Counter-Clockwise Rotation) */
                .ring-outer-segmented {
                    position: absolute;
                    width: 430px;
                    height: 430px;
                    border-radius: 50%;
                    border: 5px solid transparent;
                    border-top: 5px solid #ffffff;
                    border-bottom: 5px solid #ffffff;
                    border-right: 5px solid rgba(252, 202, 38, 0.9);
                    border-left: 5px solid rgba(59, 130, 246, 0.9);
                    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
                    z-index: 1;
                    pointer-events: none;
                    animation: ringRotateCounter 32s linear infinite;
                }

                @keyframes ringRotateClockwise {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes ringRotateCounter {
                    0% { transform: rotate(360deg); }
                    100% { transform: rotate(0deg); }
                }

                /* Tech Geometric Corner Elements */
                .tech-corner-chevrons {
                    position: absolute;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.25rem;
                    font-weight: 900;
                    letter-spacing: -2px;
                    pointer-events: none;
                }

                .tech-corner-chevrons.top-right {
                    top: 8px;
                    right: 15px;
                }

                .tech-crosshair {
                    position: absolute;
                    color: rgba(252, 202, 38, 0.7);
                    font-size: 1.1rem;
                    font-weight: 900;
                    pointer-events: none;
                }

                .tech-crosshair.bottom-left {
                    bottom: 12px;
                    left: 15px;
                }

                .tech-dot {
                    position: absolute;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1rem;
                    pointer-events: none;
                }

                .tech-dot.top-left {
                    top: 15px;
                    left: 20px;
                }

                .tech-dot.bottom-right {
                    bottom: 15px;
                    right: 20px;
                }

                /* Floating Campus Geography Tag */
                .portal-floating-tag {
                    position: absolute;
                    bottom: -6px;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    background: rgba(15, 23, 42, 0.94);
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    border-radius: 24px;
                    padding: 0.5rem 1.1rem;
                    backdrop-filter: blur(14px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
                    z-index: 3;
                }

                .portal-geo-icon {
                    color: #FCCA26;
                    font-size: 0.95rem;
                    flex-shrink: 0;
                }

                .portal-geo-title {
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                    line-height: 1.2;
                }

                .portal-geo-sub {
                    font-size: 0.68rem;
                    color: #94A3B8;
                }

                /* Milestones Grid */
                .milestones-quad-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.8rem;
                    width: 100%;
                }

                .milestone-box {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.025);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 12px;
                    padding: 0.75rem 0.9rem;
                    transition: all 0.2s ease;
                }

                .milestone-box:hover {
                    background: rgba(252, 202, 38, 0.05);
                    border-color: rgba(252, 202, 38, 0.25);
                    transform: translateY(-2px);
                }

                .milestone-icon-pod {
                    width: 36px;
                    height: 36px;
                    border-radius: 9px;
                    background: #1B2A6B;
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    color: #60A5FA;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.95rem;
                    flex-shrink: 0;
                }

                .milestone-info {
                    display: flex;
                    flex-direction: column;
                }

                .milestone-value {
                    font-size: 0.95rem;
                    font-weight: 900;
                    color: #FFFFFF;
                    line-height: 1.2;
                }

                .milestone-label {
                    font-size: 0.68rem;
                    color: #94A3B8;
                    font-weight: 600;
                }

                /* Responsive */
                @media (max-width: 1100px) {
                    .about-main-canvas {
                        grid-template-columns: 1fr;
                    }
                    .circular-portal-wrapper {
                        margin: 1.5rem auto;
                    }
                }

                @media (max-width: 640px) {
                    .easa-about-human-section {
                        padding: 3rem 1rem;
                    }
                    .about-main-canvas {
                        padding: 1.2rem;
                    }
                    .chapter-tabs-strip {
                        gap: 6px;
                    }
                    .chapter-tab-button {
                        padding: 0.45rem 0.8rem;
                        font-size: 0.75rem;
                    }
                    .circular-portal-wrapper {
                        width: 290px;
                        height: 290px;
                    }
                    .circular-photo-container {
                        width: 200px;
                        height: 200px;
                    }
                    .ring-inner-bevel {
                        width: 220px;
                        height: 220px;
                    }
                    .ring-middle-dashed {
                        width: 250px;
                        height: 250px;
                    }
                    .ring-outer-segmented {
                        width: 285px;
                        height: 285px;
                    }
                    .milestones-quad-grid {
                        grid-template-columns: 1fr;
                    }
                    .chapter-actions-row {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .btn-primary-gold, .btn-secondary-outline {
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
