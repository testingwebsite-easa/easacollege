import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap,
    FaArrowRight,
    FaCheckCircle,
    FaBuilding,
    FaAward,
    FaMoneyBillWave,
    FaTimes,
    FaExternalLinkAlt,
    FaGlobeAmericas
} from 'react-icons/fa';

const LANGUAGE_CARDS = [
    {
        id: 'german',
        name: 'GERMAN',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        placeName: 'Germany',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80',
        levels: 'Goethe-Zertifikat A1, A2 & B1',
        description: 'Automotive R&D engineering careers with German MNCs and tuition-free Master of Science admissions at elite TU9 Universities.',
        package: '€ 58,000 – € 76,000 (~₹52–70 LPA)',
        recruiters: ['Robert Bosch', 'Mercedes-Benz', 'Siemens AG', 'BMW Group', 'ZF Group'],
        tag: 'AUTOMOTIVE & TU9 GERMANY',
        color: '#f97316'
    },
    {
        id: 'japanese',
        name: 'JAPANESE',
        nativeName: '日本語',
        flag: '🇯🇵',
        placeName: 'Japan (Tokyo)',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
        levels: 'JLPT N5, N4 & N3 Intensive',
        description: 'Fast-track engineering recruitment across Tokyo, Osaka, and Nagoya robotics, semiconductor, and IT corridors.',
        package: '¥ 4.2M – ¥ 6.0M (~₹26–38 LPA)',
        recruiters: ['Hitachi Global', 'Sony Tech', 'Panasonic', 'Toyota Tsusho', 'Rakuten'],
        tag: 'TOKYO & NAGOYA TECH',
        color: '#ec4899'
    },
    {
        id: 'french',
        name: 'FRENCH',
        nativeName: 'Français',
        flag: '🇫🇷',
        placeName: 'France (Paris)',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
        levels: 'DELF A1, A2 & TCF Canada',
        description: 'High-profile opportunities in European aerospace supply chains, software engineering, and Canada Express Entry PR advantage.',
        package: '€ 50,000 – € 66,000 (~₹46–60 LPA)',
        recruiters: ['Airbus Group', 'Capgemini Europe', 'Schneider Electric', 'Dassault', 'Thales'],
        tag: 'AEROSPACE & TECH HUBS',
        color: '#3b82f6'
    },
    {
        id: 'mandarin',
        name: 'MANDARIN',
        nativeName: '普通话',
        flag: '🇨🇳',
        placeName: 'China / East Asia',
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80',
        levels: 'HSK Level 1, 2 & 3 Official',
        description: 'Strategic mastery in global consumer electronics manufacturing, precision robotics, VLSI, and hardware supply chains.',
        package: '¥ 240K – ¥ 360K (~₹30–45 LPA)',
        recruiters: ['Foxconn Global', 'Huawei Tech', 'Lenovo', 'BYD Electronics', 'Alibaba Cloud'],
        tag: 'HARDWARE & VLSI SUPPLY',
        color: '#ef4444'
    },
    {
        id: 'spanish',
        name: 'SPANISH',
        nativeName: 'Español',
        flag: '🇪🇸',
        placeName: 'Spain (Madrid)',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=400&q=80',
        levels: 'DELE A1, A2 & SIELE Global',
        description: 'Command cross-border telecommunications, cloud architecture, and multinational FinTech networks across 20+ countries.',
        package: '€ 45,000 – € 60,000 (~₹40–55 LPA)',
        recruiters: ['Telefónica', 'Santander Tech', 'Indra Sistemas', 'Accenture Global', 'BBVA Digital'],
        tag: 'GLOBAL CLOUD & FINTECH',
        color: '#eab308'
    }
];

const ForeignLanguageSection = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    return (
        <section className="cfl-section" aria-label="Centre for Foreign Languages">
            {/* Ambient Lighting Gradients Matching Theme */}
            <div className="cfl-ambient-glow glow-gold" />
            <div className="cfl-ambient-glow glow-blue" />

            <div className="cfl-container">

                {/* Section Header with Theme Badge */}
                <div className="cfl-header">
                    <div className="cfl-tag-badge">
                        <FaGlobeAmericas size={11} />
                        <span>GLOBAL MOBILITY • 100% SPONSORED</span>
                    </div>

                    <h2 className="cfl-main-title">
                        CENTRE FOR<br />
                        <span className="cfl-yellow-text">FOREIGN LANGUAGES</span>
                    </h2>
                    
                    <p className="cfl-subtitle">
                        Specialized Foreign Language Training designed to enhance global mobility, opening direct gateways to overseas engineering recruitment and tuition-free Master’s degrees abroad.
                    </p>
                </div>

                {/* Grid of Clean White Cards with Floating Circular Place Images */}
                <div className="cfl-cards-grid">
                    {LANGUAGE_CARDS.map((lang, idx) => (
                        <motion.div
                            key={lang.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="cfl-card"
                            onClick={() => setSelectedLanguage(lang)}
                            role="button"
                            tabIndex={0}
                        >
                            {/* Floating Circular Place Photo Perched at Top Center */}
                            <div className="cfl-circle-place-wrap">
                                <img
                                    src={lang.image}
                                    alt={lang.name + ' - ' + lang.placeName}
                                    className="cfl-circle-place-img"
                                    loading="lazy"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="cfl-card-body">
                                <h3 className="cfl-lang-name">{lang.name}</h3>
                                <p className="cfl-lang-levels">{lang.levels}</p>

                                <div className="cfl-salary-tag">
                                    <FaMoneyBillWave size={12} style={{ color: '#10b981', marginRight: '5px' }} />
                                    <span>{lang.package}</span>
                                </div>

                                {/* Simple High-Visibility Glass Effect Button */}
                                <button
                                    type="button"
                                    className="cfl-glass-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedLanguage(lang);
                                    }}
                                    aria-label={`View syllabus for ${lang.name}`}
                                >
                                    <span className="cfl-glass-shine" />
                                    <span className="btn-content-inner">
                                        <span>View Syllabus &amp; Recruiters</span>
                                        <FaArrowRight size={10} className="btn-arrow-glide" />
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Banner Strip */}
                <div className="cfl-bottom-strip">
                    <div className="cfl-strip-item">
                        <FaCheckCircle className="strip-icon" />
                        <span>100% Free Sponsored in Autonomous Curriculum</span>
                    </div>
                    <div className="cfl-strip-item">
                        <FaAward className="strip-icon" />
                        <span>Native &amp; CEFR-Certified Language Instructors</span>
                    </div>
                    <div className="cfl-strip-item">
                        <FaGraduationCap className="strip-icon" />
                        <span>Choice-Based Academic Degree Credits</span>
                    </div>
                </div>

            </div>

            {/* Screen-Fitted Lightbox Modal */}
            <AnimatePresence>
                {selectedLanguage && (
                    <div 
                        className="cfl-modal-overlay" 
                        onClick={() => setSelectedLanguage(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="cfl-modal-box"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Fixed Modal Header */}
                            <div className="cfl-modal-header" style={{ background: selectedLanguage.color }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '2.2rem', lineHeight: '1' }}>{selectedLanguage.flag}</span>
                                    <div>
                                        <span className="cfl-modal-tag">{selectedLanguage.tag}</span>
                                        <h3 className="cfl-modal-title">{selectedLanguage.name} ({selectedLanguage.nativeName})</h3>
                                    </div>
                                </div>
                                <button 
                                    className="cfl-modal-close" 
                                    onClick={() => setSelectedLanguage(null)}
                                    aria-label="Close dialog"
                                >
                                    <FaTimes size={13} />
                                </button>
                            </div>

                            {/* Scrollable Modal Content */}
                            <div className="cfl-modal-body">
                                <div className="cfl-modal-banner-img-wrap">
                                    <img 
                                        src={selectedLanguage.image} 
                                        alt={selectedLanguage.placeName} 
                                        className="cfl-modal-banner-img"
                                    />
                                    <span className="cfl-modal-place-badge">{selectedLanguage.placeName}</span>
                                </div>

                                <p className="cfl-modal-desc">{selectedLanguage.description}</p>

                                <div className="cfl-modal-salary-box">
                                    <div>
                                        <span className="modal-label">Expected Starting CTC Package</span>
                                        <strong className="modal-val" style={{ color: selectedLanguage.color }}>
                                            {selectedLanguage.package}
                                        </strong>
                                    </div>
                                    <span className="cfl-free-pill">100% Free Sponsored</span>
                                </div>

                                <div className="cfl-modal-section">
                                    <h4 className="modal-sec-title">
                                        <FaAward style={{ color: selectedLanguage.color }} />
                                        Target Certification Levels
                                    </h4>
                                    <p className="modal-sec-text">{selectedLanguage.levels}</p>
                                </div>

                                <div className="cfl-modal-section">
                                    <h4 className="modal-sec-title">
                                        <FaBuilding style={{ color: selectedLanguage.color }} />
                                        Premier Corporate Recruiters
                                    </h4>
                                    <div className="cfl-recruiter-tags">
                                        {selectedLanguage.recruiters.map((r, i) => (
                                            <span key={i} className="recruiter-pill">
                                                {r}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="cfl-modal-footer">
                                    <a href="/higher-education" className="cfl-glass-btn modal-apply-btn" style={{ background: selectedLanguage.color }}>
                                        <span className="cfl-glass-shine" />
                                        <span className="btn-content-inner">
                                            <span>Apply for 2026 Language Batch</span>
                                            <FaExternalLinkAlt size={11} className="btn-arrow-glide" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                /* =========================================================
                   CENTRE FOR FOREIGN LANGUAGES - EASA THEMED BACKGROUND
                   ========================================================= */
                .cfl-section {
                    position: relative;
                    padding: 4.5rem 1.5rem 4rem;
                    background: #090D16;
                    color: #ffffff;
                    overflow: hidden;
                    font-family: inherit;
                }

                .cfl-ambient-glow {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    pointer-events: none;
                    z-index: 0;
                }

                .cfl-ambient-glow.glow-gold {
                    top: -8%;
                    left: 15%;
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(252, 202, 38, 0.08) 0%, transparent 70%);
                }

                .cfl-ambient-glow.glow-blue {
                    bottom: -8%;
                    right: 15%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(27, 42, 107, 0.25) 0%, transparent 70%);
                }

                .cfl-container {
                    max-width: 1360px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* Header */
                .cfl-header {
                    text-align: center;
                    max-width: 860px;
                    margin: 0 auto 3.8rem;
                }

                .cfl-tag-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 0.35rem 0.95rem;
                    border-radius: 20px;
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    color: #FCCA26;
                    background: rgba(252, 202, 38, 0.1);
                    border: 1px solid rgba(252, 202, 38, 0.28);
                    margin-bottom: 0.9rem;
                }

                .cfl-main-title {
                    font-size: clamp(1.9rem, 3.5vw, 3rem);
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: 0.5px;
                    line-height: 1.15;
                    margin: 0 0 0.8rem 0;
                    text-transform: uppercase;
                }

                .cfl-yellow-text {
                    background: linear-gradient(135deg, #FFE259 0%, #FCCA26 45%, #E6B627 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .cfl-subtitle {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #94A3B8;
                    max-width: 760px;
                    margin: 0 auto;
                }

                /* Cards Grid */
                .cfl-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 3.2rem 1.2rem;
                    margin-bottom: 3.5rem;
                    padding-top: 1.5rem;
                }

                .cfl-card {
                    position: relative;
                    background: #ffffff;
                    color: #0f172a;
                    border-radius: 20px;
                    padding: 3.2rem 1.2rem 1.4rem;
                    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: all 0.25s ease;
                }

                .cfl-card:hover {
                    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.45);
                    transform: translateY(-6px);
                }

                /* Floating Circular Place Photo Perched at Top Center */
                .cfl-circle-place-wrap {
                    position: absolute;
                    top: -38px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 76px;
                    height: 76px;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
                    border: 3.5px solid #ffffff;
                    transition: transform 0.25s ease;
                    background: #0f172a;
                }

                .cfl-circle-place-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .cfl-card:hover .cfl-circle-place-wrap {
                    transform: translateX(-50%) scale(1.08);
                }

                /* Card Body */
                .cfl-card-body {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    justify-content: space-between;
                    gap: 0.5rem;
                }

                .cfl-lang-name {
                    font-size: 1.2rem;
                    font-weight: 900;
                    color: #0f172a;
                    margin: 0;
                    letter-spacing: 0.8px;
                }

                .cfl-lang-levels {
                    font-size: 0.76rem;
                    font-weight: 800;
                    color: #2563eb;
                    margin: 0 0 0.4rem 0;
                    min-height: 20px;
                }

                .cfl-salary-tag {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    border-radius: 8px;
                    padding: 0.4rem 0.6rem;
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0.2rem 0 0.8rem 0;
                }

                /* =========================================================
                   CLEAN & HIGH-VISIBILITY GLASS EFFECT BUTTON
                   ========================================================= */
                .cfl-glass-btn {
                    position: relative;
                    overflow: hidden;
                    border-radius: 24px;
                    background: linear-gradient(135deg, rgba(27, 42, 107, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);
                    border: 1px solid rgba(255, 255, 255, 0.28);
                    cursor: pointer;
                    padding: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 14px rgba(27, 42, 107, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.35);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    min-height: 40px;
                    text-decoration: none;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                /* Subtle Glass Shimmer Sheen */
                .cfl-glass-btn .cfl-glass-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 60%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.38) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    transform: skewX(-20deg);
                    pointer-events: none;
                    transition: left 0.6s ease;
                    z-index: 1;
                }

                .cfl-glass-btn:hover .cfl-glass-shine,
                .cfl-card:hover .cfl-glass-btn .cfl-glass-shine {
                    left: 140%;
                }

                /* High-Contrast Clear Text & Icon */
                .btn-content-inner {
                    position: relative;
                    z-index: 2;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    height: 100%;
                    padding: 0.65rem 1rem;
                    color: #ffffff;
                    font-size: 0.78rem;
                    font-weight: 800;
                    letter-spacing: 0.3px;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                }

                .btn-arrow-glide {
                    transition: transform 0.25s ease;
                }

                /* Button & Card Hover State */
                .cfl-glass-btn:hover,
                .cfl-card:hover .cfl-glass-btn {
                    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #3b82f6 100%);
                    border-color: rgba(252, 202, 38, 0.65);
                    box-shadow: 0 6px 22px rgba(37, 99, 235, 0.45), 0 0 12px rgba(252, 202, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5);
                    transform: translateY(-2px);
                }

                .cfl-glass-btn:hover .btn-arrow-glide,
                .cfl-card:hover .cfl-glass-btn .btn-arrow-glide {
                    transform: translateX(4px);
                }

                .cfl-glass-btn.modal-apply-btn {
                    min-height: 44px;
                }

                .cfl-glass-btn.modal-apply-btn:hover {
                    filter: brightness(1.12);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
                }

                /* Bottom Strip */
                .cfl-bottom-strip {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                    background: rgba(15, 23, 42, 0.75);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 50px;
                    padding: 0.8rem 1.6rem;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                .cfl-strip-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.82rem;
                    font-weight: 800;
                    color: #F8FAFC;
                }

                .strip-icon {
                    color: #FCCA26;
                    font-size: 1rem;
                }

                /* =========================================================
                   MODAL: SCREEN-FITTED & FULLY RESPONSIVE
                   ========================================================= */
                .cfl-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(5, 12, 28, 0.85);
                    backdrop-filter: blur(10px);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.25rem;
                }

                .cfl-modal-box {
                    background: #ffffff;
                    color: #0f172a;
                    border-radius: 20px;
                    max-width: 500px;
                    width: 100%;
                    max-height: calc(100vh - 3rem);
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .cfl-modal-header {
                    padding: 1.2rem 1.4rem;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                }

                .cfl-modal-tag {
                    display: inline-block;
                    font-size: 0.64rem;
                    font-weight: 800;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    background: rgba(0, 0, 0, 0.25);
                    padding: 2px 8px;
                    border-radius: 10px;
                    margin-bottom: 2px;
                }

                .cfl-modal-title {
                    font-size: 1.2rem;
                    font-weight: 900;
                    margin: 0;
                }

                .cfl-modal-close {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.25);
                    border: none;
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.2s;
                    flex-shrink: 0;
                }

                .cfl-modal-close:hover {
                    background: rgba(0, 0, 0, 0.45);
                    transform: rotate(90deg);
                }

                .cfl-modal-body {
                    padding: 1.2rem 1.4rem;
                    overflow-y: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                }

                .cfl-modal-banner-img-wrap {
                    position: relative;
                    height: 130px;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .cfl-modal-banner-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .cfl-modal-place-badge {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    background: rgba(15, 23, 42, 0.85);
                    color: #ffffff;
                    font-size: 0.72rem;
                    font-weight: 800;
                    padding: 3px 8px;
                    border-radius: 6px;
                }

                .cfl-modal-desc {
                    font-size: 0.84rem;
                    line-height: 1.55;
                    color: #475569;
                    margin: 0;
                }

                .cfl-modal-salary-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 0.75rem 1rem;
                }

                .modal-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #64748b;
                    text-transform: uppercase;
                    display: block;
                }

                .modal-val {
                    font-size: 0.95rem;
                    font-weight: 900;
                }

                .cfl-free-pill {
                    font-size: 0.7rem;
                    font-weight: 800;
                    background: #dcfce7;
                    color: #15803d;
                    padding: 3px 9px;
                    border-radius: 16px;
                }

                .cfl-modal-section {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .modal-sec-title {
                    font-size: 0.74rem;
                    font-weight: 800;
                    color: #0f172a;
                    text-transform: uppercase;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .modal-sec-text {
                    font-size: 0.8rem;
                    color: #475569;
                    margin: 0;
                }

                .cfl-recruiter-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .recruiter-pill {
                    background: #f1f5f9;
                    border: 1px solid #cbd5e1;
                    color: #334155;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 2px 7px;
                    border-radius: 5px;
                }

                .cfl-modal-footer {
                    margin-top: auto;
                    padding-top: 0.85rem;
                    border-top: 1px solid #e2e8f0;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .cfl-section {
                        padding: 3.5rem 1rem;
                    }
                    .cfl-cards-grid {
                        grid-template-columns: 1fr;
                        gap: 3.2rem 1rem;
                    }
                    .cfl-bottom-strip {
                        border-radius: 20px;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.7rem;
                    }
                    .cfl-modal-box {
                        max-height: calc(100vh - 2rem);
                    }
                }
            `}</style>
        </section>
    );
};

export default ForeignLanguageSection;
