import React from 'react';
import { motion } from 'framer-motion';

export const LuxuryMarquee = () => {
    const marqueeLine1 = [
        "19+ YEARS OF EXCELLENCE",
        "AUTONOMOUS INSTITUTION",
        "NAAC ACCREDITED",
        "96% PLACEMENT RECORD",
        "16 LPA HIGHEST CTC",
        "150+ TOP RECRUITERS",
        "AICTE APPROVED",
        "ANNA UNIVERSITY AFFILIATED",
        "25-ACRE SMART CAMPUS"
    ];

    const marqueeLine2 = [
        "FUTURE-READY ENGINEERING",
        "CENTRE OF EXCELLENCE",
        "AI & ROBOTICS LABS",
        "100% SCHOLARSHIP SUPPORT",
        "INDUSTRY 4.0 INCUBATION",
        "GLOBAL COLLABORATIONS",
        "INNOVATION & STARTUP HUB",
        "DHRUVA NATIONAL FEST"
    ];

    return (
        <div className="luxury-marquee-wrapper" aria-hidden="true">
            {/* Ambient Background Glow */}
            <div className="marquee-ambient-glow" />

            {/* Top Stream: Scrolling Left */}
            <div className="marquee-track track-left">
                <div className="marquee-content">
                    {marqueeLine1.concat(marqueeLine1).map((text, i) => (
                        <div key={`m1-${i}`} className="marquee-item gold-theme">
                            <span className="marquee-star">✦</span>
                            <span className="marquee-text">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Stream: Scrolling Right */}
            <div className="marquee-track track-right">
                <div className="marquee-content reverse">
                    {marqueeLine2.concat(marqueeLine2).map((text, i) => (
                        <div key={`m2-${i}`} className="marquee-item white-theme">
                            <span className="marquee-star gold">★</span>
                            <span className="marquee-text outline-text">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .luxury-marquee-wrapper {
                    position: relative;
                    overflow: hidden;
                    padding: 2.2rem 0;
                    background: linear-gradient(180deg, rgba(11, 15, 25, 0.95) 0%, #080b12 50%, rgba(11, 15, 25, 0.95) 100%);
                    border-top: 1px solid rgba(252, 202, 38, 0.25);
                    border-bottom: 1px solid rgba(252, 202, 38, 0.25);
                    box-shadow: inset 0 0 40px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.4);
                    margin: 1.5rem 0 3rem 0;
                }

                .marquee-ambient-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60%;
                    height: 100%;
                    background: radial-gradient(ellipse at center, rgba(230, 182, 39, 0.08) 0%, transparent 70%);
                    pointer-events: none;
                }

                .marquee-track {
                    display: flex;
                    overflow: hidden;
                    user-select: none;
                    white-space: nowrap;
                    position: relative;
                }

                .marquee-track.track-left {
                    margin-bottom: 0.8rem;
                }

                .marquee-content {
                    display: flex;
                    flex-shrink: 0;
                    align-items: center;
                    animation: scrollMarquee 38s linear infinite;
                    will-change: transform;
                }

                .marquee-content.reverse {
                    animation: scrollMarqueeReverse 42s linear infinite;
                }

                .luxury-marquee-wrapper:hover .marquee-content {
                    animation-play-state: paused;
                }

                .marquee-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 1.2rem;
                    padding: 0 1.8rem;
                }

                .marquee-star {
                    font-size: 1.1rem;
                    color: #FCCA26;
                    filter: drop-shadow(0 0 8px rgba(252, 202, 38, 0.8));
                    animation: starTwinkle 3s ease-in-out infinite;
                }

                .marquee-star.gold {
                    color: #FCCA26;
                }

                .marquee-text {
                    font-size: clamp(1.05rem, 1.6vw, 1.45rem);
                    font-weight: 900;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .gold-theme .marquee-text {
                    background: linear-gradient(135deg, #ffffff 10%, #FFF2A6 50%, #FCCA26 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 2px 10px rgba(252, 202, 38, 0.3));
                }

                .white-theme .marquee-text.outline-text {
                    color: rgba(255, 255, 255, 0.88);
                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
                    letter-spacing: 2.5px;
                }

                @keyframes scrollMarquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }

                @keyframes scrollMarqueeReverse {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }

                @keyframes starTwinkle {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
                    50% { transform: scale(1.25) rotate(45deg); opacity: 1; }
                }

                @media (max-width: 768px) {
                    .luxury-marquee-wrapper {
                        padding: 1.6rem 0;
                        margin: 1rem 0 2rem 0;
                    }
                    .marquee-text {
                        font-size: 0.92rem;
                        letter-spacing: 1px;
                    }
                    .marquee-item {
                        gap: 0.8rem;
                        padding: 0 1.2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LuxuryMarquee;
