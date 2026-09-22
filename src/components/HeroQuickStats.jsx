import React from 'react';
import { motion } from 'framer-motion';

const statsData = [
    {
        id: 'stat-1',
        value: '19+',
        label: 'YEARS OF EXCELLENCE',
        sublabel: 'ESTD. 2008'
    },
    {
        id: 'stat-2',
        value: '25+',
        label: 'ACRES SMART CAMPUS',
        sublabel: 'COIMBATORE'
    },
    {
        id: 'stat-3',
        value: '35+',
        label: 'INDUSTRY MOUs & COEs',
        sublabel: 'TECH PARTNERS'
    },
    {
        id: 'stat-4',
        value: '16 LPA',
        label: 'HIGHEST PACKAGE',
        sublabel: 'DREAM OFFERS'
    },
    {
        id: 'stat-5',
        value: '96%',
        label: 'PLACEMENT RECORD',
        sublabel: 'CONSISTENT RECORD'
    },
    {
        id: 'stat-6',
        value: '150+',
        label: 'TOP RECRUITERS',
        sublabel: 'GLOBAL MNCS'
    }
];

// Animated 3D Page Turning Book Component
const TurningPageBook = () => {
    return (
        <div className="turning-book-container" aria-label="Animated Turning Book">
            <div className="turning-book-3d">
                {/* Left Base Page */}
                <div className="book-leaf-base book-leaf-left">
                    <div className="book-lines">
                        <span className="b-line l1" />
                        <span className="b-line l2" />
                        <span className="b-line l3" />
                    </div>
                </div>

                {/* Right Base Page */}
                <div className="book-leaf-base book-leaf-right">
                    <div className="book-lines">
                        <span className="b-line l1" />
                        <span className="b-line l2" />
                        <span className="b-line l3" />
                    </div>
                </div>

                {/* Center Spine Glow */}
                <div className="book-spine-glow" />

                {/* Animated 3D Flipping Page Leaves */}
                <div className="turning-page leaf-1">
                    <div className="page-face page-front">
                        <span className="b-line f1" />
                        <span className="b-line f2" />
                    </div>
                    <div className="page-face page-back">
                        <span className="b-line f1" />
                        <span className="b-line f2" />
                    </div>
                </div>

                <div className="turning-page leaf-2">
                    <div className="page-face page-front">
                        <span className="b-line f1" />
                        <span className="b-line f2" />
                    </div>
                    <div className="page-face page-back">
                        <span className="b-line f1" />
                        <span className="b-line f2" />
                    </div>
                </div>

                <div className="turning-page leaf-3">
                    <div className="page-face page-front">
                        <span className="b-line f1" />
                        <span className="b-line f2" />
                    </div>
                    <div className="page-face page-back">
                        <span className="b-line f1" />
                        <span className="b-line f2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const HeroQuickStats = () => {
    const leftStats = statsData.slice(0, 3);
    const rightStats = statsData.slice(3, 6);

    return (
        <section className="hero-quick-stats-section" aria-label="College Key Highlights">
            <div className="stats-container">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className="stats-main-bar"
                >
                    {/* Left 3 Stat Cards */}
                    <div className="stats-group stats-group-left">
                        {leftStats.map((item) => (
                            <motion.div 
                                key={item.id}
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ duration: 0.25 }}
                                className="stat-pill-card"
                            >
                                <span className="stat-number">{item.value}</span>
                                <span className="stat-label">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Pod with Animated Page Turning Book */}
                    <div className="stats-center-notch">
                        <div className="center-pod-inner">
                            <TurningPageBook />
                            <span className="center-pod-tag">ECET</span>
                        </div>
                    </div>

                    {/* Right 3 Stat Cards */}
                    <div className="stats-group stats-group-right">
                        {rightStats.map((item) => (
                            <motion.div 
                                key={item.id}
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ duration: 0.25 }}
                                className="stat-pill-card"
                            >
                                <span className="stat-number">{item.value}</span>
                                <span className="stat-label">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
                .hero-quick-stats-section {
                    position: relative;
                    z-index: 30;
                    margin-top: -45px;
                    padding: 0 1.5rem 2rem 1.5rem;
                }

                .stats-container {
                    max-width: 1360px;
                    margin: 0 auto;
                }

                .stats-main-bar {
                    background: var(--bg-card, #ffffff);
                    border-radius: 40px;
                    padding: 1rem 1.8rem;
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08), 0 4px 15px rgba(0, 0, 0, 0.04);
                    border: 1px solid var(--glass-border, rgba(0, 0, 0, 0.08));
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.2rem;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }

                .stats-group {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex: 1;
                    justify-content: space-around;
                }

                .stat-pill-card {
                    flex: 1;
                    min-width: 0;
                    background: transparent;
                    border: 2px solid #2563eb;
                    border-radius: 20px;
                    padding: 0.85rem 0.6rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: default;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.06);
                }

                .stat-pill-card:hover {
                    border-color: #1B2A6B;
                    background: rgba(37, 99, 235, 0.03);
                    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.18);
                }

                .stat-number {
                    font-size: clamp(1.4rem, 1.8vw, 2rem);
                    font-weight: 900;
                    color: #1B2A6B;
                    line-height: 1.1;
                    margin-bottom: 0.25rem;
                    letter-spacing: -0.02em;
                }

                :root[data-theme="dark"] .stat-number {
                    color: #60a5fa;
                }

                .stat-label {
                    font-size: clamp(0.68rem, 0.75vw, 0.78rem);
                    font-weight: 800;
                    color: var(--text-muted, #475569);
                    text-transform: uppercase;
                    line-height: 1.25;
                    letter-spacing: 0.4px;
                    max-width: 130px;
                }

                /* Center Pod */
                .stats-center-notch {
                    flex-shrink: 0;
                    padding: 0 0.5rem;
                }

                .center-pod-inner {
                    background: linear-gradient(145deg, #0b0f19 0%, #172033 100%);
                    border-radius: 28px;
                    padding: 0.75rem 1.3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 30px rgba(11, 15, 25, 0.35), 0 0 25px rgba(252, 202, 38, 0.25);
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    position: relative;
                    min-width: 105px;
                }

                .center-pod-tag {
                    color: #FCCA26;
                    font-size: 0.7rem;
                    font-weight: 900;
                    letter-spacing: 2.5px;
                    margin-top: 0.4rem;
                    text-shadow: 0 0 8px rgba(252, 202, 38, 0.6);
                }

                /* 3D Animated Page Turning Book Styles */
                .turning-book-container {
                    position: relative;
                    width: 56px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .turning-book-3d {
                    position: relative;
                    width: 52px;
                    height: 34px;
                    perspective: 450px;
                    transform-style: preserve-3d;
                }

                /* Base Left / Right Book Covers */
                .book-leaf-base {
                    position: absolute;
                    top: 0;
                    width: 25px;
                    height: 34px;
                    background: linear-gradient(135deg, #18233a 0%, #0c1322 100%);
                    border: 1.5px solid rgba(252, 202, 38, 0.65);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), inset 0 0 6px rgba(252, 202, 38, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    box-sizing: border-box;
                }

                .book-leaf-left {
                    left: 0;
                    border-right: none;
                    border-radius: 4px 1px 1px 4px;
                }

                .book-leaf-right {
                    right: 0;
                    border-left: none;
                    border-radius: 1px 4px 4px 1px;
                }

                .book-spine-glow {
                    position: absolute;
                    left: 50%;
                    top: -1px;
                    width: 2.5px;
                    height: 36px;
                    background: #FCCA26;
                    transform: translateX(-50%);
                    box-shadow: 0 0 10px #FCCA26, 0 0 16px rgba(252, 202, 38, 0.8);
                    z-index: 20;
                    border-radius: 2px;
                }

                /* Book Page Decorative Lines */
                .book-lines {
                    display: flex;
                    flex-direction: column;
                    gap: 3.5px;
                    width: 100%;
                }

                .b-line {
                    height: 1.5px;
                    background: rgba(252, 202, 38, 0.4);
                    border-radius: 2px;
                }

                .b-line.l1 { width: 85%; }
                .b-line.l2 { width: 65%; }
                .b-line.l3 { width: 75%; }
                .b-line.f1 { width: 80%; background: rgba(17, 24, 39, 0.6); }
                .b-line.f2 { width: 60%; background: rgba(17, 24, 39, 0.6); }

                /* 3D Flipping Page Leaves */
                .turning-page {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    width: 24.5px;
                    height: 32px;
                    transform-origin: left center;
                    transform-style: preserve-3d;
                    pointer-events: none;
                    animation: flipPageAnimation 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }

                .turning-page.leaf-1 {
                    animation-delay: 0s;
                }

                .turning-page.leaf-2 {
                    animation-delay: 0.8s;
                }

                .turning-page.leaf-3 {
                    animation-delay: 1.6s;
                }

                .page-face {
                    position: absolute;
                    inset: 0;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    border-radius: 1px 3px 3px 1px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 3px;
                    padding: 3px;
                    box-sizing: border-box;
                }

                .page-front {
                    background: linear-gradient(to right, #e2a818 0%, #fef08a 60%, #FCCA26 100%);
                    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.35);
                    border: 0.5px solid rgba(255, 255, 255, 0.4);
                }

                .page-back {
                    background: linear-gradient(to left, #e2a818 0%, #fef08a 60%, #FCCA26 100%);
                    transform: rotateY(180deg);
                    box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.35);
                    border: 0.5px solid rgba(255, 255, 255, 0.4);
                }

                @keyframes flipPageAnimation {
                    0% {
                        transform: rotateY(0deg);
                        z-index: 10;
                        opacity: 0;
                    }
                    8% {
                        opacity: 1;
                    }
                    50% {
                        transform: rotateY(-90deg);
                        z-index: 15;
                        opacity: 1;
                    }
                    88% {
                        opacity: 1;
                    }
                    96% {
                        transform: rotateY(-180deg);
                        z-index: 5;
                        opacity: 0;
                    }
                    100% {
                        transform: rotateY(-180deg);
                        z-index: 5;
                        opacity: 0;
                    }
                }

                /* Responsive Breakpoints */
                @media (max-width: 1100px) {
                    .stats-main-bar {
                        padding: 0.9rem 1.2rem;
                        gap: 0.8rem;
                    }
                    .stat-pill-card {
                        padding: 0.7rem 0.4rem;
                        border-radius: 16px;
                    }
                    .stat-number {
                        font-size: 1.35rem;
                    }
                    .stat-label {
                        font-size: 0.65rem;
                    }
                    .center-pod-inner {
                        padding: 0.6rem 1rem;
                        min-width: 90px;
                    }
                }

                @media (max-width: 900px) {
                    .hero-quick-stats-section {
                        margin-top: -25px;
                        padding: 0 1rem 1.5rem 1rem;
                    }
                    .stats-main-bar {
                        border-radius: 28px;
                        flex-direction: column;
                        gap: 1rem;
                        padding: 1.2rem;
                    }
                    .stats-center-notch {
                        order: -1;
                    }
                    .center-pod-inner {
                        flex-direction: row;
                        gap: 12px;
                        padding: 0.5rem 1.5rem;
                    }
                    .center-pod-tag {
                        margin-top: 0;
                    }
                    .stats-group {
                        width: 100%;
                    }
                }

                @media (max-width: 600px) {
                    .hero-quick-stats-section {
                        margin-top: 10px;
                        padding: 0 0.8rem 1.5rem 0.8rem;
                    }
                    .stats-main-bar {
                        border-radius: 20px;
                        padding: 1rem 0.8rem;
                    }
                    .stats-group {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.5rem;
                    }
                    .stat-pill-card {
                        padding: 0.6rem 0.25rem;
                        border-width: 1.5px;
                        border-radius: 14px;
                    }
                    .stat-number {
                        font-size: 1.1rem;
                    }
                    .stat-label {
                        font-size: 0.58rem;
                        letter-spacing: 0px;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroQuickStats;

