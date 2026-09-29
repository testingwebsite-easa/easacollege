import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImages, FaInstagram, FaVideo, FaArrowRight, FaCamera } from 'react-icons/fa';

const HomeGalleryButton = () => {
    return (
        <section className="home-gallery-btn-section" id="home-gallery-cta">
            <div className="home-gallery-btn-container">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="home-gallery-cta-card"
                >
                    {/* Ambient Glows */}
                    <div className="hg-ambient-glow hg-glow-gold" />
                    <div className="hg-ambient-glow hg-glow-navy" />

                    <div className="hg-content-wrap">
                        {/* Left Info Column */}
                        <div className="hg-info-col">
                            <div className="hg-badge-pill">
                                <FaCamera className="hg-badge-icon" />
                                <span>CAMPUS LIFE & MEDIA</span>
                            </div>
                            <h2 className="hg-title">
                                Experience Life at <span className="hg-title-highlight">EASA College</span>
                            </h2>
                            <p className="hg-subtitle">
                                Explore official Instagram photo feeds, trending campus reels, student festivals, and video highlights.
                            </p>
                        </div>

                        {/* Right Buttons Column */}
                        <div className="hg-buttons-group">
                            <Link to="/gallery" className="hg-main-btn" id="home-view-gallery-btn">
                                <FaImages className="hg-btn-icon" />
                                <span>View Full Gallery</span>
                                <FaArrowRight className="hg-btn-arrow" />
                            </Link>

                            <div className="hg-sub-buttons-row">
                                <Link to="/gallery?tab=photos" className="hg-sub-btn hg-sub-photos">
                                    <FaInstagram className="hg-sub-icon ig-color" />
                                    <span>Instagram Posts</span>
                                </Link>
                                <Link to="/gallery?tab=videos" className="hg-sub-btn hg-sub-videos">
                                    <FaVideo className="hg-sub-icon video-color" />
                                    <span>Reels & Videos</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeGalleryButton;
