import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API_BASE_URL from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTimes, 
    FaQuoteLeft, 
    FaAward, 
    FaGraduationCap, 
    FaLightbulb, 
    FaHandshake, 
    FaArrowRight, 
    FaCheckCircle,
    FaStar,
    FaHeart
} from 'react-icons/fa';

// Fallback data for the 4 core management trustees with verified official Amazon S3 images
const FALLBACK_MANAGEMENT = [
    {
        _id: "lead-001",
        name: "Late Shri T.E. Eswaramoothy",
        designation: "FOUNDER & CHAIRMAN",
        category: "founder",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769498987215-989607021-founder.jpeg",
        message: "EASA College of Engineering and Technology was founded with a profound mission: to democratize world-class technical education and empower young minds with knowledge, ethical leadership, and innovation. His vision was to create an institution that not only provides academic knowledge but also builds character and fosters innovation.",
        quote: "Empowering rural and urban youth through accessible, high-caliber technical education and enduring human values.",
        focus: "Pioneering Vision & Universal Education"
    },
    {
        _id: "lead-002",
        name: "Smt. Sujatha Eswaramoorthy",
        designation: "CHAIRPERSON",
        category: "chairperson",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769496978582-206081635-chairperson.jpeg",
        message: "It gives me immense pleasure to welcome you to EASA College. Our institution is dedicated to creating a vibrant environment where students can discover their passions, hone their technical skills, and emerge as responsible global citizens. As a visionary dedicated to nurturing young minds, I am committed to supporting students in their journey to become future leaders.",
        quote: "Nurturing an inclusive campus culture that inspires creativity, discipline, and lifelong learning.",
        focus: "Student Welfare & Inclusive Campus Culture"
    },
    {
        _id: "lead-003",
        name: "Shri. T.E. Ajith",
        designation: "SECRETARY & CEO",
        category: "secretary",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769496992644-586176077-ceo.jpeg",
        message: "As the Secretary & CEO of EASA College, I am committed to driving academic excellence and industry relevance. We prepare our students to lead in emerging technologies like AI, Robotics, and Cloud Computing. We believe in integrating technology with traditional values to create a unique educational experience.",
        quote: "Bridging the gap between academic brilliance and cutting-edge industrial innovation.",
        focus: "Global AI, Robotics & Strategic Corporate Growth"
    },
    {
        _id: "lead-004",
        name: "Shri. T.E. Aadarsh",
        designation: "CORRESPONDENT",
        category: "correspondent",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769497006357-389813990-cro.jpeg",
        message: "In my role as Correspondent, I focus on the holistic development of our students, ensuring top-tier infrastructure, state-of-the-art research labs, and world-class athletic and extracurricular opportunities. We aim to provide an environment where every student has the opportunity to explore their potential and excel.",
        quote: "Equipping young engineers with entrepreneurial resilience, athletic vitality, and global competence.",
        focus: "Next-Gen Infrastructure & Athletic Vitality"
    }
];

const STRATEGIC_PILLARS = [
    {
        number: "01",
        icon: <FaAward />,
        title: "Autonomous Excellence",
        desc: "Future-ready academic curriculum continuously calibrated with premier industry boards and academic councils."
    },
    {
        number: "02",
        icon: <FaLightbulb />,
        title: "R&D & Innovation Hub",
        desc: "State-of-the-art DST funded IDEA Labs, robotics incubators, and student prototype venture acceleration."
    },
    {
        number: "03",
        icon: <FaHandshake />,
        title: "Corporate Immersion",
        desc: "Strong synergy with 100+ global tech giants providing internships, live corporate projects, and elite placements."
    },
    {
        number: "04",
        icon: <FaGraduationCap />,
        title: "Holistic Development",
        desc: "Comprehensive character development, ethical values, sports leadership, and vibrant student-led associations."
    }
];

// Helper to get strategic focus area for a member
const getMemberFocus = (member) => {
    if (member.focus) return member.focus;
    const cat = (member.category || '').toLowerCase();
    const name = (member.name || '').toLowerCase();
    if (cat.includes('founder') || (name.includes('eswaramoothy') || name.includes('eswaramoorthy')) && !name.includes('sujatha')) {
        return "Pioneering Vision & Universal Education";
    }
    if (cat.includes('chairperson') || name.includes('sujatha')) {
        return "Student Welfare & Inclusive Campus Culture";
    }
    if (cat.includes('secretary') || name.includes('ajith')) {
        return "Global AI, Robotics & Strategic Corporate Growth";
    }
    if (cat.includes('correspondent') || name.includes('aadarsh')) {
        return "Next-Gen Infrastructure & Athletic Vitality";
    }
    return "Institutional Leadership & Excellence";
};

// Highlights key inspiring phrases
const renderHighlightedKeywords = (text) => {
    if (!text) return null;
    const keywords = [
        "world-class technical education",
        "ethical leadership",
        "innovation",
        "academic excellence",
        "human values",
        "cutting-edge industrial innovation",
        "emerging technologies",
        "AI, Robotics, and Cloud Computing",
        "entrepreneurial resilience",
        "athletic vitality",
        "global competence",
        "inclusive campus culture",
        "future leaders"
    ];

    let result = text;
    keywords.forEach((kw) => {
        const regex = new RegExp(`(${kw})`, 'gi');
        result = result.replace(regex, `<span class="highlight-text-kw">$1</span>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

const ManagementPage = () => {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [members, setMembers] = useState(FALLBACK_MANAGEMENT);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchManagement = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/management-team`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        // Filter to exclusively show the 4 Management Trustees (No Principal on this page)
                        const managementOnly = data.filter(m => 
                            m.category !== 'principal' && 
                            !m.designation?.toLowerCase().includes('principal') &&
                            !m.name?.toLowerCase().includes('principal')
                        );

                        if (managementOnly.length > 0) {
                            // Merge with fallback verified images/quotes if empty
                            const merged = managementOnly.map(m => {
                                const fb = FALLBACK_MANAGEMENT.find(f => 
                                    f.category === m.category || 
                                    f.name.toLowerCase() === m.name.toLowerCase()
                                );
                                return {
                                    ...m,
                                    image_url: m.image_url || fb?.image_url || '',
                                    quote: m.quote || fb?.quote || '',
                                    focus: m.focus || fb?.focus || ''
                                };
                            });
                            setMembers(merged);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch management team:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchManagement();
    }, []);

    return (
        <div className="management-page-root">
            <SEO 
                title="Visionary Leadership | Management Team | EASA College" 
                description="Meet the visionary Management Team and Trustees guiding EASA College of Engineering and Technology towards academic excellence and global leadership." 
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* Page Hero */}
            <GlobalHero
                pageKey="management"
                defaultTitle="Visionary Leadership"
                defaultSubtitle="The visionary management team and trustees steering EASA College towards global excellence."
            />

            {/* Main Section */}
            <section className="management-content-section">
                
                {/* Ambient Decorative Lighting */}
                <div className="ambient-backdrop">
                    <div className="ambient-blob blob-left" />
                    <div className="ambient-blob blob-right" />
                    <div className="ambient-blob blob-center" />
                </div>

                <div className="management-inner-container">
                    
                    {/* Introductory Section Header */}
                    <div className="management-heading-wrapper">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="section-kicker-pill"
                        >
                            <FaStar className="kicker-star" />
                            <span>BOARD OF TRUSTEES & VISIONARY GOVERNANCE</span>
                            <span className="kicker-pulse-dot" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="management-title-text"
                        >
                            The Visionaries Guiding <span className="gold-highlight-gradient">EASA College</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="management-subtitle-text"
                        >
                            Committed to academic eminence, ethical grounding, and cutting-edge innovation, our leadership shapes future-ready engineers, fearless innovators, and visionary entrepreneurs.
                        </motion.p>
                    </div>

                    {/* Executive 4-Card Grid with Circular Animated Border Photos */}
                    <div className="management-cards-layout">
                        {members.map((member, index) => {
                            const fallbackMatch = FALLBACK_MANAGEMENT.find(fb => 
                                fb.category === member.category || 
                                fb.name.toLowerCase() === member.name.toLowerCase()
                            );
                            const resolvedImg = member.image_url || fallbackMatch?.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1B2A6B&color=FCCA26&size=500`;
                            const focusArea = getMemberFocus(member);

                            return (
                                <motion.div
                                    key={member._id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: index * 0.12 }}
                                    className="management-executive-card"
                                >
                                    {/* CREATIVE CIRCULAR PHOTO OUTLINE (ANIMATIVE DESIGN IN BORDER ONLY) */}
                                    <div className="card-circle-portrait-box">
                                        {/* Outer subtle concentric decorative dashed orbit ring */}
                                        <div className="circle-orbit-ring" />

                                        {/* 360° Spinning Conic Gradient Border - Strictly in the border */}
                                        <div className="circle-border-animated" />

                                        {/* Inner Circle Image Container */}
                                        <div className="circle-img-inner">
                                            <img
                                                src={resolvedImg}
                                                alt={member.name}
                                                className="circle-portrait-img"
                                                style={
                                                    member.name?.toLowerCase().includes('sujatha') || member.category === 'chairperson'
                                                        ? { objectPosition: 'center 30%', transform: 'scale(1.15)' }
                                                        : {}
                                                }
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    if (fallbackMatch?.image_url && e.target.src !== fallbackMatch.image_url) {
                                                        e.target.src = fallbackMatch.image_url;
                                                    } else {
                                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1B2A6B&color=FCCA26&size=500`;
                                                    }
                                                }}
                                            />
                                            {/* Specular Glide light sheen across circular glass */}
                                            <div className="circle-specular-glow" />
                                        </div>

                                        {/* Verified Trustee Star Badge anchored on the circular border */}
                                        <div className="circle-border-badge" title="Official Trustee">
                                            <FaStar className="badge-star-icon" />
                                        </div>
                                    </div>

                                    {/* Content Details with Highlighted Text */}
                                    <div className="card-details-box">
                                        {/* Role Pill */}
                                        <div className="card-role-strip">
                                            <span className="card-role-tag">
                                                {member.designation}
                                            </span>
                                        </div>

                                        {/* Highlighted Leader Name */}
                                        <h3 className="card-leader-name">
                                            <span className="card-name-highlight">{member.name}</span>
                                        </h3>

                                        {/* Strategic Focus Ribbon */}
                                        {focusArea && (
                                            <div className="card-focus-ribbon">
                                                <FaLightbulb className="focus-bulb-icon" />
                                                <span>{focusArea}</span>
                                            </div>
                                        )}

                                        {/* Highlighted Message Quote Preview */}
                                        {member.message && (
                                            <div className="card-quote-preview">
                                                <FaQuoteLeft className="card-quote-icon" />
                                                <p className="card-quote-content">
                                                    "{renderHighlightedKeywords(member.quote || member.message)}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Read Full Address Button */}
                                        {member.message && (
                                            <button
                                                type="button"
                                                onClick={() => setSelectedMember(member)}
                                                className="card-explore-msg-btn"
                                                aria-label={`Read official address from ${member.name}`}
                                            >
                                                <span>Read Full Address</span>
                                                <div className="btn-circle-arrow">
                                                    <FaArrowRight size={11} />
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* INSPIRING FEEL-GOOD WORDS OF WISDOM BANNER */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="wisdom-inspirational-banner"
                    >
                        <div className="wisdom-ambient-glow" />
                        <div className="wisdom-inner-content">
                            <div className="wisdom-crest-emblem">
                                <FaHeart className="wisdom-heart-icon" />
                            </div>
                            <span className="wisdom-sub-label">A SACRED LEGACY OF EMPOWERMENT & VALUES</span>
                            <h3 className="wisdom-main-quote">
                                "Education is not merely the accumulation of technical knowledge; it is the ignition of character, resilience, and compassion to serve society with honor."
                            </h3>
                            <div className="wisdom-author-bar">
                                <span className="wisdom-author-name">Late Shri T.E. Eswaramoothy</span>
                                <span className="wisdom-author-role">Founder & Chairman &bull; EASA Educational Trust</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Strategic Governance Pillars */}
                    <div className="strategic-pillars-block">
                        <div className="pillars-header">
                            <span className="pillars-tag">INSTITUTIONAL FOUNDATION & ETHOS</span>
                            <h3 className="pillars-main-title">Core Governance Commitments</h3>
                            <p className="pillars-subtext">
                                Under visionary governance, EASA College fosters a multidisciplinary environment dedicated to intellectual excellence, global technical relevance, and personal growth.
                            </p>
                        </div>

                        <div className="pillars-grid">
                            {STRATEGIC_PILLARS.map((pillar, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="pillar-item-card"
                                >
                                    <div className="pillar-top-meta">
                                        <div className="pillar-icon-container">
                                            {pillar.icon}
                                        </div>
                                        <span className="pillar-number-badge">{pillar.number}</span>
                                    </div>
                                    <h4 className="pillar-title">{pillar.title}</h4>
                                    <p className="pillar-text">{pillar.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Modal for Full Address */}
            <AnimatePresence>
                {selectedMember && (() => {
                    const fallbackMatch = FALLBACK_MANAGEMENT.find(fb => 
                        fb.category === selectedMember.category || 
                        fb.name.toLowerCase() === selectedMember.name.toLowerCase()
                    );
                    const modalImg = selectedMember.image_url || fallbackMatch?.image_url;

                    return (
                        <div
                            className="leadership-modal-backdrop"
                            onClick={() => setSelectedMember(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 25 }}
                                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                                className="leadership-modal-dialog"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedMember(null)}
                                    className="modal-close-icon-btn"
                                    aria-label="Close address modal"
                                >
                                    <FaTimes size={16} />
                                </button>

                                {/* Modal Header with Circular Animated Border Avatar */}
                                <div className="modal-person-header">
                                    <div className="modal-person-circle-box">
                                        <div className="circle-border-animated modal-circle-border" />
                                        <div className="circle-img-inner modal-circle-inner">
                                            <img
                                                src={modalImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=1B2A6B&color=FCCA26&size=300`}
                                                alt={selectedMember.name}
                                                className="modal-person-img"
                                                style={
                                                    selectedMember.name?.toLowerCase().includes('sujatha') || selectedMember.category === 'chairperson'
                                                        ? { objectPosition: 'center 30%', transform: 'scale(1.15)' }
                                                        : {}
                                                }
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=1B2A6B&color=FCCA26&size=300`;
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-person-meta">
                                        <span className="modal-role-badge">
                                            {selectedMember.designation}
                                        </span>
                                        <h2 className="modal-person-name">
                                            {selectedMember.name}
                                        </h2>
                                        <span className="modal-person-college">EASA College of Engineering and Technology &bull; Autonomous</span>
                                        <div className="modal-focus-tag">
                                            {getMemberFocus(selectedMember)}
                                        </div>
                                    </div>
                                </div>

                                {/* Message Body */}
                                <div className="modal-address-content">
                                    {(selectedMember.quote || fallbackMatch?.quote) && (
                                        <div className="modal-quote-callout">
                                            <FaQuoteLeft className="callout-quote-icon" />
                                            <p className="callout-quote-text">
                                                "{selectedMember.quote || fallbackMatch?.quote}"
                                            </p>
                                        </div>
                                    )}

                                    <h4 className="modal-address-heading">Official Leadership Message</h4>
                                    
                                    <div className="modal-formatted-message">
                                        <p>{renderHighlightedKeywords(selectedMember.message)}</p>
                                    </div>

                                    <div className="modal-verification-seal">
                                        <FaCheckCircle style={{ color: '#10B981', flexShrink: 0, fontSize: '1.1rem' }} />
                                        <div>
                                            <div className="seal-heading">Official Governance Communication</div>
                                            <div className="seal-sub">EASA Educational Trust &bull; Board of Trustees</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="modal-bottom-controls">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedMember(null)}
                                        className="modal-dismiss-btn"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    );
                })()}
            </AnimatePresence>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />

            {/* STYLES FOR CIRCULAR ANIMATED BORDER & HIGHLIGHTED TEXT */}
            <style>{`
                .management-page-root {
                    background: #0B0F19;
                    color: #FFFFFF;
                    min-height: 100vh;
                    position: relative;
                    overflow-x: hidden;
                    font-family: inherit;
                }

                .management-content-section {
                    position: relative;
                    padding: 4.5rem 1.5rem 6.5rem;
                    background: #0B0F19;
                }

                .ambient-backdrop {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .ambient-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(140px);
                    opacity: 0.15;
                    animation: floatGlow 10s ease-in-out infinite alternate;
                }

                .blob-left {
                    top: 10%;
                    left: -10%;
                    width: 520px;
                    height: 520px;
                    background: #1B2A6B;
                }

                .blob-right {
                    bottom: 15%;
                    right: -10%;
                    width: 480px;
                    height: 480px;
                    background: #FCCA26;
                }

                .blob-center {
                    top: 50%;
                    left: 30%;
                    width: 400px;
                    height: 400px;
                    background: #0284C7;
                    opacity: 0.08;
                }

                @keyframes floatGlow {
                    0% { transform: scale(0.95) translate(0, 0); }
                    100% { transform: scale(1.05) translate(20px, -15px); }
                }

                .management-inner-container {
                    max-width: 1260px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                /* Section Header */
                .management-heading-wrapper {
                    text-align: center;
                    margin-bottom: 3.8rem;
                }

                .section-kicker-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: linear-gradient(135deg, rgba(252, 202, 38, 0.14) 0%, rgba(27, 42, 107, 0.3) 100%);
                    color: #FCCA26;
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    padding: 6px 20px;
                    border-radius: 50px;
                    font-size: 0.76rem;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    margin-bottom: 1.1rem;
                    box-shadow: 0 4px 18px rgba(252, 202, 38, 0.15);
                }

                .kicker-star {
                    color: #FCCA26;
                    font-size: 0.85rem;
                }

                .kicker-pulse-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10B981;
                    box-shadow: 0 0 8px #10B981;
                }

                .management-title-text {
                    font-size: clamp(2rem, 3.8vw, 3rem);
                    font-weight: 900;
                    color: #FFFFFF;
                    line-height: 1.25;
                    margin-bottom: 0.95rem;
                    letter-spacing: -0.5px;
                }

                .gold-highlight-gradient {
                    background: linear-gradient(135deg, #FFFBEB 0%, #FCCA26 45%, #F59E0B 85%, #FFFFFF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(252, 202, 38, 0.3);
                }

                .management-subtitle-text {
                    font-size: clamp(0.98rem, 1.6vw, 1.12rem);
                    color: #94A3B8;
                    max-width: 760px;
                    margin: 0 auto;
                    line-height: 1.68;
                }

                /* Text Keyword Highlighter */
                .highlight-text-kw {
                    color: #FCCA26;
                    font-weight: 700;
                    background: rgba(252, 202, 38, 0.08);
                    padding: 0 4px;
                    border-radius: 4px;
                    text-shadow: 0 0 10px rgba(252, 202, 38, 0.3);
                }

                /* -------------------------------------------------------------
                   CIRCULAR PHOTO CONTAINER WITH ANIMATED OUTLINE IN BORDER ONLY
                ------------------------------------------------------------- */
                .card-circle-portrait-box {
                    position: relative;
                    width: 175px;
                    height: 175px;
                    margin: 1.6rem auto 1.1rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                /* Concentric Outer Dashed Orbit Ring */
                .circle-orbit-ring {
                    position: absolute;
                    inset: -12px;
                    border-radius: 50%;
                    border: 1.5px dashed rgba(59, 130, 246, 0.4);
                    animation: spinCircleReverse 14s linear infinite;
                    pointer-events: none;
                    z-index: 0;
                    transition: all 0.35s ease;
                }

                @keyframes spinCircleReverse {
                    0% { transform: rotate(360deg); }
                    100% { transform: rotate(0deg); }
                }

                .management-executive-card:hover .circle-orbit-ring {
                    border-color: #FCCA26;
                    inset: -15px;
                }

                /* Creative 360° Rotating Conic Gradient Border - Blue and Yellow colors */
                .circle-border-animated {
                    position: absolute;
                    inset: -4.5px;
                    border-radius: 50%;
                    background: conic-gradient(
                        from 0deg,
                        #FCCA26 0%,
                        #FCCA26 22%,
                        #2563EB 28%,
                        #2563EB 47%,
                        #FCCA26 53%,
                        #FCCA26 72%,
                        #2563EB 78%,
                        #2563EB 97%,
                        #FCCA26 100%
                    );
                    animation: spinCircleBorder 6s linear infinite;
                    z-index: 1;
                    filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.6)) drop-shadow(0 0 10px rgba(252, 202, 38, 0.6));
                }

                @keyframes spinCircleBorder {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .management-executive-card:hover .circle-border-animated {
                    animation-duration: 2.8s;
                    filter: drop-shadow(0 0 16px rgba(37, 99, 235, 0.85)) drop-shadow(0 0 16px rgba(252, 202, 38, 0.85));
                }

                /* Inner Circle Image Container */
                .circle-img-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    background: #0B0F19;
                    z-index: 2;
                    border: 3.5px solid #0B0F19; /* High-contrast separator creating the distinct border outline */
                    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
                }

                .circle-portrait-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top center;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                    filter: contrast(1.05) brightness(1.02);
                }

                .management-executive-card:hover .circle-portrait-img {
                    transform: scale(1.08);
                }

                /* Specular Glide light sheen across circular glass */
                .circle-specular-glow {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: linear-gradient(
                        115deg,
                        transparent 35%,
                        rgba(255, 255, 255, 0.35) 45%,
                        rgba(252, 202, 38, 0.4) 50%,
                        transparent 60%
                    );
                    transform: translateX(-150%) skewX(-20deg);
                    animation: circleLightSweep 6s ease-in-out infinite;
                    pointer-events: none;
                    z-index: 3;
                }

                @keyframes circleLightSweep {
                    0% { transform: translateX(-160%) skewX(-20deg); opacity: 0; }
                    20% { opacity: 0.8; }
                    40% { transform: translateX(240%) skewX(-20deg); opacity: 0; }
                    100% { transform: translateX(240%) skewX(-20deg); opacity: 0; }
                }

                /* Verified Trustee Star Badge anchored on the circular border */
                .circle-border-badge {
                    position: absolute;
                    bottom: 3px;
                    right: 8px;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FCCA26 0%, #F59E0B 100%);
                    border: 2px solid #0B0F19;
                    color: #0B0F19;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 4;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(252, 202, 38, 0.5);
                    transition: transform 0.3s ease;
                }

                .management-executive-card:hover .circle-border-badge {
                    transform: scale(1.15) rotate(15deg);
                    background: #FFFFFF;
                    color: #F59E0B;
                }

                .badge-star-icon {
                    font-size: 0.72rem;
                }

                /* -------------------------------------------------------------
                   EXECUTIVE CARDS GRID & TEXT HIGHLIGHTING
                ------------------------------------------------------------- */
                .management-cards-layout {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.6rem;
                    margin-bottom: 5.5rem;
                }

                @media (max-width: 1100px) {
                    .management-cards-layout {
                        grid-template-columns: repeat(2, 1fr);
                        max-width: 720px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }

                @media (max-width: 600px) {
                    .management-cards-layout {
                        grid-template-columns: 1fr;
                        max-width: 360px;
                    }
                }

                .management-executive-card {
                    background: rgba(17, 24, 39, 0.85);
                    backdrop-filter: blur(16px);
                    border: 1.5px solid rgba(59, 130, 246, 0.28);
                    border-radius: 26px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(27, 42, 107, 0.2);
                    transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
                    position: relative;
                    padding-bottom: 1.5rem;
                }

                .management-executive-card:hover {
                    transform: translateY(-8px);
                    border-color: #FCCA26;
                    box-shadow: 0 25px 55px rgba(0, 0, 0, 0.55), 0 0 25px rgba(59, 130, 246, 0.3), 0 0 18px rgba(252, 202, 38, 0.3);
                }

                .card-details-box {
                    padding: 0.25rem 1.25rem 0;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    text-align: center;
                }

                .card-role-strip {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 0.65rem;
                }

                .card-role-tag {
                    background: rgba(252, 202, 38, 0.12);
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    color: #FCCA26;
                    font-size: 0.68rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.9px;
                    padding: 4px 14px;
                    border-radius: 50px;
                    box-shadow: 0 0 12px rgba(252, 202, 38, 0.15);
                }

                /* Highlighted Leader Name */
                .card-leader-name {
                    font-size: 1.18rem;
                    font-weight: 800;
                    line-height: 1.3;
                    margin-bottom: 0.65rem;
                    min-height: 2.8rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card-name-highlight {
                    background: linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 40%, #FCCA26 80%, #F59E0B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* Strategic Focus Ribbon */
                .card-focus-ribbon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #38BDF8;
                    background: rgba(56, 189, 248, 0.08);
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    padding: 4px 10px;
                    border-radius: 8px;
                    margin-bottom: 0.95rem;
                    line-height: 1.35;
                }

                .focus-bulb-icon {
                    color: #FCCA26;
                    font-size: 0.72rem;
                    flex-shrink: 0;
                }

                /* Highlighted Quote Preview */
                .card-quote-preview {
                    background: rgba(255, 255, 255, 0.03);
                    border-left: 3px solid #FCCA26;
                    border-radius: 0 12px 12px 0;
                    padding: 0.85rem 0.95rem;
                    margin-bottom: 1.15rem;
                    flex-grow: 1;
                    text-align: left;
                    display: flex;
                    gap: 8px;
                }

                .card-quote-icon {
                    color: #FCCA26;
                    opacity: 0.75;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                    margin-top: 3px;
                }

                .card-quote-content {
                    font-size: 0.79rem;
                    color: #CBD5E1;
                    line-height: 1.5;
                    margin: 0;
                    font-style: italic;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Read Full Address Button */
                .card-explore-msg-btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.7rem 1.1rem;
                    background: linear-gradient(135deg, rgba(27, 42, 107, 0.9) 0%, rgba(45, 44, 122, 0.9) 100%);
                    color: #FFFFFF;
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: auto;
                    box-shadow: 0 4px 15px rgba(27, 42, 107, 0.35);
                }

                .card-explore-msg-btn:hover {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    border-color: #FCCA26;
                    box-shadow: 0 6px 20px rgba(252, 202, 38, 0.35);
                    transform: translateY(-2px);
                }

                .btn-circle-arrow {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background: #FCCA26;
                    color: #111827;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s ease;
                }

                .card-explore-msg-btn:hover .btn-circle-arrow {
                    transform: translateX(3px);
                    background: #FFFFFF;
                }

                /* -------------------------------------------------------------
                   INSPIRATIONAL FEEL-GOOD WORDS OF WISDOM BANNER
                ------------------------------------------------------------- */
                .wisdom-inspirational-banner {
                    position: relative;
                    background: linear-gradient(135deg, rgba(27, 42, 107, 0.6) 0%, rgba(17, 24, 39, 0.85) 50%, rgba(45, 44, 122, 0.6) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    border-radius: 28px;
                    padding: 3.5rem 2.5rem;
                    margin-bottom: 5.5rem;
                    text-align: center;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
                }

                .wisdom-ambient-glow {
                    position: absolute;
                    top: -40%;
                    left: 30%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(252, 202, 38, 0.25) 0%, transparent 70%);
                    filter: blur(60px);
                    pointer-events: none;
                }

                .wisdom-inner-content {
                    position: relative;
                    z-index: 2;
                    max-width: 860px;
                    margin: 0 auto;
                }

                .wisdom-crest-emblem {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(252, 202, 38, 0.15);
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.2rem;
                    box-shadow: 0 0 25px rgba(252, 202, 38, 0.3);
                }

                .wisdom-heart-icon {
                    color: #FCCA26;
                    font-size: 1.3rem;
                }

                .wisdom-sub-label {
                    display: block;
                    font-size: 0.76rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #FCCA26;
                    text-transform: uppercase;
                    margin-bottom: 0.95rem;
                }

                .wisdom-main-quote {
                    font-size: clamp(1.25rem, 2.4vw, 1.8rem);
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.55;
                    font-style: italic;
                    margin: 0 0 1.5rem 0;
                    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
                }

                .wisdom-author-bar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 3px;
                }

                .wisdom-author-name {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #FCCA26;
                }

                .wisdom-author-role {
                    font-size: 0.8rem;
                    color: #94A3B8;
                }

                /* -------------------------------------------------------------
                   STRATEGIC GOVERNANCE PILLARS
                ------------------------------------------------------------- */
                .strategic-pillars-block {
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 3rem 2.25rem;
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
                }

                .pillars-header {
                    text-align: center;
                    max-width: 680px;
                    margin: 0 auto 2.5rem;
                }

                .pillars-tag {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #FCCA26;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .pillars-main-title {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.5rem;
                }

                .pillars-subtext {
                    font-size: 0.92rem;
                    color: #94A3B8;
                    line-height: 1.55;
                }

                .pillars-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                }

                .pillar-item-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 16px;
                    padding: 1.6rem 1.4rem;
                    transition: all 0.3s ease;
                }

                .pillar-item-card:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(252, 202, 38, 0.3);
                    transform: translateY(-4px);
                }

                .pillar-top-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }

                .pillar-icon-container {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                }

                .pillar-number-badge {
                    font-size: 1rem;
                    font-weight: 900;
                    color: rgba(255, 255, 255, 0.2);
                    font-family: monospace;
                }

                .pillar-title {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.5rem;
                }

                .pillar-text {
                    font-size: 0.85rem;
                    color: #94A3B8;
                    line-height: 1.5;
                    margin: 0;
                }

                /* -------------------------------------------------------------
                   LEADERSHIP ADDRESS MODAL
                ------------------------------------------------------------- */
                .leadership-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(14px);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .leadership-modal-dialog {
                    background: #111827;
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    border-radius: 24px;
                    max-width: 660px;
                    width: 100%;
                    max-height: 88vh;
                    overflow-y: auto;
                    padding: 2.25rem 2.25rem;
                    position: relative;
                    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 35px rgba(27, 42, 107, 0.5);
                    color: #FFFFFF;
                }

                .modal-close-icon-btn {
                    position: absolute;
                    top: 1.25rem;
                    right: 1.25rem;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: #CBD5E1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .modal-close-icon-btn:hover {
                    background: #EF4444;
                    color: #FFFFFF;
                    border-color: #EF4444;
                    transform: rotate(90deg);
                }

                .modal-person-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 1.75rem;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .modal-person-circle-box {
                    position: relative;
                    width: 85px;
                    height: 85px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-circle-border {
                    inset: -3px;
                }

                .modal-circle-inner {
                    border-width: 2.5px;
                }

                .modal-person-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }

                .modal-person-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .modal-role-badge {
                    display: inline-block;
                    background: #FCCA26;
                    color: #111827;
                    font-size: 0.68rem;
                    font-weight: 900;
                    padding: 3px 10px;
                    border-radius: 50px;
                    text-transform: uppercase;
                    align-self: flex-start;
                    margin-bottom: 0.25rem;
                }

                .modal-person-name {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                }

                .modal-person-college {
                    font-size: 0.78rem;
                    color: #94A3B8;
                    margin-bottom: 0.25rem;
                }

                .modal-focus-tag {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #38BDF8;
                }

                .modal-quote-callout {
                    background: rgba(252, 202, 38, 0.06);
                    border-left: 4px solid #FCCA26;
                    border-radius: 0 12px 12px 0;
                    padding: 0.85rem 1.1rem;
                    margin-bottom: 1.25rem;
                }

                .callout-quote-icon {
                    color: #FCCA26;
                    opacity: 0.6;
                    font-size: 1rem;
                    margin-bottom: 0.3rem;
                }

                .callout-quote-text {
                    font-size: 0.9rem;
                    color: #F8FAFC;
                    line-height: 1.5;
                    font-style: italic;
                    margin: 0;
                }

                .modal-address-heading {
                    font-size: 1rem;
                    font-weight: 800;
                    color: #FCCA26;
                    margin-bottom: 0.65rem;
                }

                .modal-formatted-message {
                    font-size: 0.92rem;
                    line-height: 1.75;
                    color: #CBD5E1;
                    margin-bottom: 1.4rem;
                }

                .modal-verification-seal {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(16, 185, 129, 0.08);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    padding: 0.65rem 1rem;
                    border-radius: 10px;
                }

                .seal-heading {
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #10B981;
                }

                .seal-sub {
                    font-size: 0.72rem;
                    color: #94A3B8;
                }

                .modal-bottom-controls {
                    padding-top: 1.25rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 1.25rem;
                }

                .modal-dismiss-btn {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FFFFFF;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    font-weight: 800;
                    font-size: 0.82rem;
                    padding: 0.65rem 1.4rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .modal-dismiss-btn:hover {
                    background: #FCCA26;
                    color: #111827;
                    border-color: #FCCA26;
                }

                @media (max-width: 640px) {
                    .management-content-section {
                        padding: 3rem 1rem 4.5rem;
                    }
                    .management-title-text {
                        font-size: 1.8rem;
                    }
                    .strategic-pillars-block {
                        padding: 2rem 1.25rem;
                    }
                    .leadership-modal-dialog {
                        padding: 1.5rem;
                    }
                    .modal-person-header {
                        flex-direction: column;
                        text-align: center;
                    }
                    .modal-role-badge {
                        align-self: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default ManagementPage;
