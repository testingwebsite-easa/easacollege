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
    FaStar
} from 'react-icons/fa';

// Fallback data for the 4 core management trustees
const FALLBACK_MANAGEMENT = [
    {
        _id: "lead-001",
        name: "Late Shri T.E. Eswaramoothy",
        designation: "FOUNDER & CHAIRMAN",
        category: "founder",
        image_url: "",
        message: "EASA College of Engineering and Technology was founded with a profound mission: to democratize world-class technical education and empower young minds with knowledge, ethical leadership, and innovation.",
        quote: "Empowering rural and urban youth through accessible, high-caliber technical education and human values."
    },
    {
        _id: "lead-002",
        name: "Smt. Sujatha Eswaramoorthy",
        designation: "CHAIRPERSON",
        category: "chairperson",
        image_url: "",
        message: "It gives me immense pleasure to welcome you to EASA College. Our institution is dedicated to creating a vibrant environment where students can discover their passions, hone their technical skills, and emerge as responsible global citizens.",
        quote: "Nurturing an inclusive campus culture that inspires creativity, discipline, and lifelong learning."
    },
    {
        _id: "lead-003",
        name: "Shri. T.E. Ajith",
        designation: "SECRETARY & CEO",
        category: "secretary",
        image_url: "",
        message: "As the Secretary & CEO of EASA College, I am committed to driving academic excellence and industry relevance. We prepare our students to lead in emerging technologies like AI, Robotics, and Cloud Computing.",
        quote: "Bridging the gap between academic brilliance and cutting-edge industrial innovation."
    },
    {
        _id: "lead-004",
        name: "Shri. T.E. Aadarsh",
        designation: "CORRESPONDENT",
        category: "correspondent",
        image_url: "",
        message: "In my role as Correspondent, I focus on the holistic development of our students, ensuring top-tier infrastructure, state-of-the-art research labs, and world-class athletic and extracurricular opportunities.",
        quote: "Equipping young engineers with entrepreneurial resilience and global competence."
    }
];

const STRATEGIC_PILLARS = [
    {
        icon: <FaAward />,
        title: "Autonomous Excellence",
        desc: "Future-ready academic curriculum continuously calibrated with premier industry boards and academic councils."
    },
    {
        icon: <FaLightbulb />,
        title: "R&D & Innovation Hub",
        desc: "State-of-the-art DST funded IDEA Labs, robotics incubators, and student prototype venture acceleration."
    },
    {
        icon: <FaHandshake />,
        title: "Corporate Immersion",
        desc: "Strong synergy with 100+ global tech giants providing internships, live corporate projects, and elite placements."
    },
    {
        icon: <FaGraduationCap />,
        title: "Holistic Development",
        desc: "Comprehensive character development, ethical values, sports leadership, and vibrant student-led associations."
    }
];

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
                            setMembers(managementOnly);
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
                title="Management Team | EASA College of Engineering and Technology" 
                description="Meet the visionary Management Team and Trustees guiding EASA College towards academic excellence and global leadership." 
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
                            BOARD OF TRUSTEES & LEADERSHIP
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
                            Committed to academic eminence, ethical grounding, and cutting-edge innovation, our leadership shapes future-ready engineers and visionary entrepreneurs.
                        </motion.p>
                    </div>

                    {/* Executive 4-Card Grid */}
                    <div className="management-cards-layout">
                        {members.map((member, index) => (
                            <motion.div
                                key={member._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="management-executive-card"
                            >
                                {/* Portrait Container */}
                                <div className="card-portrait-box">
                                    <img
                                        src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1B2A6B&color=FCCA26&size=500`}
                                        alt={member.name}
                                        className="card-portrait-img"
                                        style={
                                            member.name?.toLowerCase().includes('sujatha') || member.category === 'chairperson'
                                                ? { objectPosition: 'center 35%', transform: 'scale(1.12)' }
                                                : {}
                                        }
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1B2A6B&color=FCCA26&size=500`;
                                        }}
                                    />
                                    <div className="card-image-gradient-overlay" />
                                </div>

                                {/* Content Details */}
                                <div className="card-details-box">
                                    {/* Role Pill */}
                                    <div className="card-role-tag">
                                        {member.designation}
                                    </div>

                                    {/* Leader Name */}
                                    <h3 className="card-leader-name">
                                        {member.name}
                                    </h3>

                                    {/* Message Quote */}
                                    {member.message && (
                                        <div className="card-quote-preview">
                                            <FaQuoteLeft className="card-quote-icon" />
                                            <p className="card-quote-content">
                                                {member.quote || member.message}
                                            </p>
                                        </div>
                                    )}

                                    {/* Read Full Address Button */}
                                    {member.message && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedMember(member)}
                                            className="card-explore-msg-btn"
                                        >
                                            <span>Read Full Address</span>
                                            <div className="btn-circle-arrow">
                                                <FaArrowRight size={11} />
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Strategic Governance Pillars */}
                    <div className="strategic-pillars-block">
                        <div className="pillars-header">
                            <span className="pillars-tag">INSTITUTIONAL FOUNDATION</span>
                            <h3 className="pillars-main-title">Core Governance Commitments</h3>
                            <p className="pillars-subtext">
                                Under visionary governance, EASA College fosters a multidisciplinary environment dedicated to intellectual and personal growth.
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
                                    <div className="pillar-icon-container">
                                        {pillar.icon}
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
                {selectedMember && (
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

                            {/* Modal Header */}
                            <div className="modal-person-header">
                                <div className="modal-person-avatar">
                                    <img
                                        src={selectedMember.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=1B2A6B&color=FCCA26&size=300`}
                                        alt={selectedMember.name}
                                        className="modal-person-img"
                                        style={
                                            selectedMember.name?.toLowerCase().includes('sujatha') || selectedMember.category === 'chairperson'
                                                ? { objectPosition: 'center 35%', transform: 'scale(1.1)' }
                                                : {}
                                        }
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=1B2A6B&color=FCCA26&size=300`;
                                        }}
                                    />
                                </div>
                                <div className="modal-person-meta">
                                    <span className="modal-role-badge">
                                        {selectedMember.designation}
                                    </span>
                                    <h2 className="modal-person-name">
                                        {selectedMember.name}
                                    </h2>
                                    <span className="modal-person-college">EASA College of Engineering and Technology</span>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="modal-address-content">
                                {selectedMember.quote && (
                                    <div className="modal-quote-callout">
                                        <FaQuoteLeft className="callout-quote-icon" />
                                        <p className="callout-quote-text">
                                            "{selectedMember.quote}"
                                        </p>
                                    </div>
                                )}

                                <h4 className="modal-address-heading">Official Leadership Message</h4>
                                <div 
                                    className="modal-formatted-message"
                                    dangerouslySetInnerHTML={{ __html: selectedMember.message }}
                                />

                                <div className="modal-verification-seal">
                                    <FaCheckCircle style={{ color: '#10B981', flexShrink: 0 }} />
                                    <span>Official Management Communication &bull; EASA Educational Trust</span>
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
                )}
            </AnimatePresence>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />

            {/* Refined Page Styles */}
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
                    padding: 4.5rem 1.5rem 6rem;
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
                    opacity: 0.12;
                }

                .blob-left {
                    top: 10%;
                    left: -10%;
                    width: 500px;
                    height: 500px;
                    background: #1B2A6B;
                }

                .blob-right {
                    bottom: 10%;
                    right: -10%;
                    width: 450px;
                    height: 450px;
                    background: #FCCA26;
                }

                .management-inner-container {
                    max-width: 1240px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                /* Section Header */
                .management-heading-wrapper {
                    text-align: center;
                    margin-bottom: 3.5rem;
                }

                .section-kicker-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(252, 202, 38, 0.1);
                    color: #FCCA26;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    padding: 5px 16px;
                    border-radius: 50px;
                    font-size: 0.76rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }

                .kicker-star {
                    color: #FCCA26;
                    font-size: 0.85rem;
                }

                .management-title-text {
                    font-size: clamp(2rem, 3.8vw, 2.85rem);
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.25;
                    margin-bottom: 0.85rem;
                    letter-spacing: -0.5px;
                }

                .gold-highlight-gradient {
                    background: linear-gradient(135deg, #FCCA26 0%, #FBBF24 50%, #FFFBEB 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .management-subtitle-text {
                    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
                    color: #94A3B8;
                    max-width: 720px;
                    margin: 0 auto;
                    line-height: 1.65;
                }

                /* Cards Grid */
                .management-cards-layout {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 5rem;
                }

                @media (max-width: 1024px) {
                    .management-cards-layout {
                        grid-template-columns: repeat(2, 1fr);
                        max-width: 650px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }

                @media (max-width: 580px) {
                    .management-cards-layout {
                        grid-template-columns: 1fr;
                        max-width: 340px;
                    }
                }

                .management-executive-card {
                    background: rgba(17, 24, 39, 0.85);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
                    transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .management-executive-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(252, 202, 38, 0.4);
                    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(252, 202, 38, 0.12);
                }

                .card-portrait-box {
                    position: relative;
                    width: 100%;
                    height: 230px;
                    overflow: hidden;
                    background: #0f172a;
                }

                .card-portrait-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top center;
                    transition: transform 0.6s ease;
                }

                .management-executive-card:hover .card-portrait-img {
                    transform: scale(1.06);
                }

                .card-image-gradient-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.15) 60%, transparent 100%);
                }

                .card-details-box {
                    padding: 1.25rem 1.15rem 1.4rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    text-align: center;
                }

                .card-role-tag {
                    align-self: center;
                    background: rgba(252, 202, 38, 0.12);
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    color: #FCCA26;
                    font-size: 0.68rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    padding: 4px 12px;
                    border-radius: 50px;
                    margin-bottom: 0.65rem;
                }

                .card-leader-name {
                    font-size: 1.12rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.3;
                    margin-bottom: 0.75rem;
                    min-height: 2.7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card-quote-preview {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 0.75rem 0.85rem;
                    margin-bottom: 1.1rem;
                    flex-grow: 1;
                    text-align: left;
                    display: flex;
                    gap: 8px;
                }

                .card-quote-icon {
                    color: #FCCA26;
                    opacity: 0.6;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                    margin-top: 3px;
                }

                .card-quote-content {
                    font-size: 0.78rem;
                    color: #94A3B8;
                    line-height: 1.45;
                    margin: 0;
                    font-style: italic;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-explore-msg-btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.65rem 1rem;
                    background: linear-gradient(135deg, rgba(27, 42, 107, 0.85) 0%, rgba(45, 44, 122, 0.85) 100%);
                    color: #FFFFFF;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    border-radius: 12px;
                    font-size: 0.78rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: auto;
                }

                .card-explore-msg-btn:hover {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    border-color: #FCCA26;
                    box-shadow: 0 4px 15px rgba(27, 42, 107, 0.4);
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
                    transition: transform 0.2s;
                }

                .card-explore-msg-btn:hover .btn-circle-arrow {
                    transform: translateX(3px);
                }

                /* Strategic Pillars */
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
                    margin-bottom: 1rem;
                    border: 1px solid rgba(252, 202, 38, 0.3);
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

                /* Modal Overlay */
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
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    border-radius: 24px;
                    max-width: 650px;
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
                    gap: 1.25rem;
                    margin-bottom: 1.75rem;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .modal-person-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 18px;
                    overflow: hidden;
                    border: 2px solid #FCCA26;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                    flex-shrink: 0;
                }

                .modal-person-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
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
                    margin-bottom: 0.3rem;
                }

                .modal-person-name {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.2rem 0;
                }

                .modal-person-college {
                    font-size: 0.78rem;
                    color: #94A3B8;
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
                    opacity: 0.5;
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
                    gap: 8px;
                    font-size: 0.75rem;
                    color: #94A3B8;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    padding: 0.55rem 0.85rem;
                    border-radius: 8px;
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
                }
            `}</style>
        </div>
    );
};

export default ManagementPage;
