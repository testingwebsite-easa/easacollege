import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Real Official (OG) Logos
import nbaLogo from '../assets/accreditations/nba_logo.svg';
import naacLogo from '../assets/accreditations/naac_official.png';
import emblemSvg from '../assets/accreditations/emblem_of_india.svg';
import nirfLogo from '../assets/accreditations/nirf_official.png';
import sdgLogo from '../assets/accreditations/sdg_official.png';

export const AccreditationsBar = () => {
    return (
        <section className="accreditations-strip-wrapper" aria-label="Accreditations & Recognitions">
            <div className="accreditations-container">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="accreditations-white-bar"
                >
                    {/* 1. Official NBA Logo */}
                    <Link to="/nba" className="acc-logo-link" title="National Board of Accreditation (NBA)">
                        <div className="acc-logo-box">
                            <img 
                                src={nbaLogo} 
                                alt="National Board of Accreditation (NBA) Official Logo" 
                                className="acc-img-logo nba-img"
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    {/* 2. Official NAAC Seal */}
                    <Link to="/naac" className="acc-logo-link" title="National Assessment and Accreditation Council (NAAC)">
                        <div className="acc-logo-box">
                            <img 
                                src={naacLogo} 
                                alt="NAAC Accredited Grade A Official Seal" 
                                className="acc-img-logo naac-img"
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    {/* 3. Official Ministry of Science and Technology (Govt of India) */}
                    <Link to="/governance" className="acc-logo-link" title="Ministry of Science and Technology, Govt. of India">
                        <div className="acc-logo-box govt-layout">
                            <img 
                                src={emblemSvg} 
                                alt="State Emblem of India" 
                                className="acc-img-logo emblem-img"
                                loading="lazy"
                            />
                            <div className="govt-text-box">
                                <span className="hindi-txt">विज्ञान एवं प्रौद्योगिकी मंत्रालय</span>
                                <span className="eng-main">MINISTRY OF</span>
                                <span className="eng-bold">SCIENCE AND TECHNOLOGY</span>
                            </div>
                        </div>
                    </Link>

                    {/* 4. Official NIRF Logo */}
                    <Link to="/nirf" className="acc-logo-link" title="National Institutional Ranking Framework (NIRF)">
                        <div className="acc-logo-box">
                            <img 
                                src={nirfLogo} 
                                alt="National Institutional Ranking Framework (NIRF) Official Logo" 
                                className="acc-img-logo nirf-img"
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    {/* 5. Official UN Sustainable Development Goals Logo */}
                    <Link to="/sdgs" className="acc-logo-link" title="United Nations Sustainable Development Goals">
                        <div className="acc-logo-box">
                            <img 
                                src={sdgLogo} 
                                alt="United Nations Sustainable Development Goals (SDGs) Official Logo" 
                                className="acc-img-logo sdg-img"
                                loading="lazy"
                            />
                        </div>
                    </Link>
                </motion.div>
            </div>

            <style>{`
                .accreditations-strip-wrapper {
                    position: relative;
                    z-index: 20;
                    padding: 1.25rem 1.5rem 3.5rem 1.5rem;
                    background: var(--bg-main, #f8fafc);
                }

                .accreditations-container {
                    max-width: 1380px;
                    margin: 0 auto;
                }

                /* Clean White Card Strip matching CIT reference image */
                .accreditations-white-bar {
                    background: #ffffff;
                    border-radius: 16px;
                    padding: 1.25rem 2.8rem;
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03);
                    border: 1px solid rgba(226, 232, 240, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                }

                :root[data-theme="dark"] .accreditations-white-bar {
                    background: #ffffff; /* Preserved crisp white container for pristine official crest visibility */
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
                }

                .acc-logo-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    flex: 1;
                    padding: 0.6rem 0.5rem;
                    transition: transform 0.25s ease, filter 0.25s ease;
                }

                .acc-logo-link:hover {
                    transform: translateY(-4px) scale(1.04);
                }

                .acc-logo-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 60px;
                }

                .acc-img-logo {
                    display: block;
                    width: auto;
                    object-fit: contain;
                    transition: all 0.25s ease;
                }

                /* Individual Logo Dimensions */
                .nba-img {
                    height: 50px;
                    max-width: 160px;
                }

                .naac-img {
                    height: 58px;
                    max-width: 120px;
                }

                .emblem-img {
                    height: 52px;
                    max-width: 45px;
                }

                .nirf-img {
                    height: 50px;
                    max-width: 140px;
                }

                .sdg-img {
                    height: 56px;
                    max-width: 150px;
                }

                /* Govt of India Typography */
                .govt-layout {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .govt-text-box {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    line-height: 1.12;
                }

                .hindi-txt {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #1e293b;
                    font-family: inherit;
                }

                .eng-main {
                    font-size: 0.6rem;
                    font-weight: 700;
                    color: #334155;
                    letter-spacing: 0.6px;
                    margin-top: 2px;
                }

                .eng-bold {
                    font-size: 0.68rem;
                    font-weight: 900;
                    color: #0f172a;
                    letter-spacing: 0.6px;
                }

                /* Responsive Breakpoints */
                @media (max-width: 1150px) {
                    .accreditations-white-bar {
                        padding: 1.1rem 1.8rem;
                        gap: 1.2rem;
                    }
                    .acc-logo-box {
                        height: 52px;
                    }
                    .nba-img { height: 42px; }
                    .naac-img { height: 46px; }
                    .emblem-img { height: 44px; }
                    .nirf-img { height: 42px; }
                    .sdg-img { height: 46px; }
                }

                @media (max-width: 860px) {
                    .accreditations-strip-wrapper {
                        padding: 0.8rem 1rem 2.5rem 1rem;
                    }
                    .accreditations-white-bar {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1.5rem 1rem;
                        padding: 1.5rem 1.2rem;
                        border-radius: 14px;
                    }
                    .acc-logo-box {
                        height: 48px;
                    }
                }

                @media (max-width: 540px) {
                    .accreditations-white-bar {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.2rem;
                        padding: 1.2rem 0.8rem;
                    }
                    .acc-logo-link:last-child {
                        grid-column: span 2;
                    }
                }
            `}</style>
        </section>
    );
};

export default AccreditationsBar;
