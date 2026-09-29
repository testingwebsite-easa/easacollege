import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlay,
    FaYoutube,
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaTimes,
    FaFilm,
    FaArrowRight
} from 'react-icons/fa';
import API_BASE_URL from '../api';

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@EASACollegeOfficial";

// Official Fallback Videos for @EASACollegeOfficial if YouTube API is offline or initial load
const OFFICIAL_FALLBACK_VIDEOS = [
    {
        id: "Tm1CpLgk964",
        title: "Why choose between sports & studies when you can have both? 🤩",
        thumbnail: "https://i.ytimg.com/vi/Tm1CpLgk964/maxresdefault.jpg",
        publishedAt: "2025-03-26T05:08:44Z",
        url: "https://www.youtube.com/watch?v=Tm1CpLgk964",
        description: "At EASA Engineering College, we promote all-round excellence—from tech innovations to sports domination!"
    },
    {
        id: "AS3VAaOuEaw",
        title: "Life at EASA (BTS Video) - Campus & Student Experience",
        thumbnail: "https://i.ytimg.com/vi/AS3VAaOuEaw/maxresdefault.jpg",
        publishedAt: "2025-03-21T12:30:24Z",
        url: "https://www.youtube.com/watch?v=AS3VAaOuEaw",
        description: "A sneak peek into what makes EASA the ultimate student experience! Relive behind-the-scenes moments."
    },
    {
        id: "rgP7qrQKkXQ",
        title: "CRM, Career, & The Future – A Deep Dive into Salesforce! #TechForFuture",
        thumbnail: "https://i.ytimg.com/vi/rgP7qrQKkXQ/maxresdefault.jpg",
        publishedAt: "2025-03-21T11:17:30Z",
        url: "https://www.youtube.com/watch?v=rgP7qrQKkXQ",
        description: "The Department of CSE conducted an engaging seminar on Salesforce & CRM Software for career advancement."
    },
    {
        id: "GD8XrKoYoUI",
        title: "ECET Republic Day Celebrations - Freedom and Fervour at EASA College!",
        thumbnail: "https://i.ytimg.com/vi/GD8XrKoYoUI/maxresdefault.jpg",
        publishedAt: "2025-01-27T14:16:38Z",
        url: "https://www.youtube.com/watch?v=GD8XrKoYoUI",
        description: "From energetic flag unfurling to inspiring conversations, celebrating the spirit of India at EASA College."
    },
    {
        id: "6MKVAHS3uE0",
        title: "ECET Republic Day - Celebrating India's Diversity & Heritage",
        thumbnail: "https://i.ytimg.com/vi/6MKVAHS3uE0/maxresdefault.jpg",
        publishedAt: "2025-01-26T01:30:04Z",
        url: "https://www.youtube.com/watch?v=6MKVAHS3uE0",
        description: "At EASA College of Engineering and Technology, we take pride in nurturing future engineering leaders."
    },
    {
        id: "sIYdI7o8Pok",
        title: "ECET Seminar on Innovation & Entrepreneurship with EDII & MSME",
        thumbnail: "https://i.ytimg.com/vi/sIYdI7o8Pok/maxresdefault.jpg",
        publishedAt: "2025-01-25T14:01:08Z",
        url: "https://www.youtube.com/watch?v=sIYdI7o8Pok",
        description: "A seminar on 'Fostering Innovation and Entrepreneurship' at EASA College of Engineering & Technology."
    }
];

const YouTubeVideos = ({ limit = 6 }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Fetch Videos Dynamically via Backend YouTube Data API v3 Proxy
    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetch(`${API_BASE_URL}/api/youtube/videos?limit=${limit}`)
            .then(res => {
                if (!res.ok) throw new Error("HTTP error " + res.status);
                return res.json();
            })
            .then(data => {
                if (!isMounted) return;
                if (data && Array.isArray(data.videos) && data.videos.length > 0) {
                    setVideos(data.videos.slice(0, limit));
                    setError(null);
                } else {
                    // Fallback to official channel highlights
                    setVideos(OFFICIAL_FALLBACK_VIDEOS.slice(0, limit));
                }
                setLoading(false);
            })
            .catch(err => {
                if (!isMounted) return;
                console.warn("YouTube API proxy notice, using official fallback:", err.message);
                setVideos(OFFICIAL_FALLBACK_VIDEOS.slice(0, limit));
                setError(null);
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [limit]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedVideo]);

    const formatDate = (dateStr) => {
        try {
            if (!dateStr) return "Recent Broadcast";
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return "Recent Broadcast";
            return d.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        } catch {
            return "Recent Broadcast";
        }
    };

    return (
        <section className="yt-section-wrapper" aria-label="EASA College on YouTube">
            <div className="yt-section-container">
                
                {/* Section Header */}
                <div className="yt-header-block">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="yt-tag-pill"
                    >
                        <FaYoutube className="yt-pill-icon" />
                        <span>OFFICIAL YOUTUBE CHANNEL</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="yt-main-heading"
                    >
                        EASA College on YouTube
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="yt-sub-heading"
                    >
                        Watch the latest events, achievements, campus activities, student experiences, and updates from EASA College.
                    </motion.p>
                </div>

                {/* Loading State: Skeleton Cards */}
                {loading && (
                    <div className="yt-cards-grid">
                        {[...Array(limit)].map((_, i) => (
                            <div key={i} className="yt-skeleton-card">
                                <div className="yt-skeleton-thumb shimmer" />
                                <div className="yt-skeleton-body">
                                    <div className="yt-skeleton-line shimmer" style={{ width: '85%' }} />
                                    <div className="yt-skeleton-line shimmer" style={{ width: '60%' }} />
                                    <div className="yt-skeleton-meta shimmer" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error / Empty Fallback State */}
                {!loading && error && videos.length === 0 && (
                    <div className="yt-error-card">
                        <FaFilm size={48} className="yt-error-icon" />
                        <h3 className="yt-error-title">Official Video Broadcasts</h3>
                        <p className="yt-error-text">
                            Explore all videos and campus updates directly on our official YouTube channel @EASACollegeOfficial.
                        </p>
                        <a
                            href={YOUTUBE_CHANNEL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="yt-primary-cta"
                        >
                            <FaYoutube size={18} />
                            <span>Visit @EASACollegeOfficial on YouTube</span>
                        </a>
                    </div>
                )}

                {/* Responsive Video Cards Grid */}
                {!loading && videos.length > 0 && (
                    <div className="yt-cards-grid">
                        {videos.map((video, index) => (
                            <motion.div
                                key={video.id || index}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                                whileHover={{ y: -6 }}
                                onClick={() => setSelectedVideo(video)}
                                className="yt-video-card"
                            >
                                {/* Thumbnail Container */}
                                <div className="yt-card-thumb-box">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="yt-card-img"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                        }}
                                    />
                                    <div className="yt-thumb-gradient" />

                                    {/* Channel Badge Overlay */}
                                    <div className="yt-channel-badge">
                                        <FaYoutube size={12} className="yt-badge-red" />
                                        <span>@EASACollegeOfficial</span>
                                    </div>

                                    {/* Play Button Overlay */}
                                    <div className="yt-play-overlay">
                                        <div className="yt-play-circle">
                                            <FaPlay size={16} className="play-arrow" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="yt-card-body">
                                    <h3 className="yt-card-title" title={video.title}>
                                        {video.title}
                                    </h3>

                                    <div className="yt-card-footer">
                                        <span className="yt-card-date">
                                            <FaCalendarAlt size={12} className="date-icon" />
                                            {formatDate(video.publishedAt)}
                                        </span>

                                        <span className="yt-watch-btn">
                                            <span>Watch Video</span>
                                            <FaPlay size={9} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Bottom View All Button */}
                <div className="yt-bottom-action">
                    <a
                        href={YOUTUBE_CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yt-view-all-btn"
                    >
                        <FaYoutube size={18} className="yt-cta-icon" />
                        <span>View All Videos on YouTube</span>
                        <FaExternalLinkAlt size={12} className="yt-ext-icon" />
                    </a>
                </div>

            </div>

            {/* Privacy-Enhanced YouTube Video Modal (createPortal to document.body) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedVideo && (
                        <div
                            className="yt-modal-backdrop"
                            onClick={() => setSelectedVideo(null)}
                            role="dialog"
                            aria-modal="true"
                            aria-label={selectedVideo.title}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="yt-modal-shade"
                            />

                            <motion.div
                                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                                className="yt-modal-dialog"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="yt-modal-header">
                                    <div className="yt-modal-brand">
                                        <FaYoutube className="yt-badge-red" size={20} />
                                        <div>
                                            <span className="yt-modal-handle">@EASACollegeOfficial</span>
                                            <span className="yt-modal-verified">• Official Broadcast</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedVideo(null)}
                                        className="yt-modal-close"
                                        aria-label="Close video player"
                                    >
                                        <FaTimes size={15} />
                                    </button>
                                </div>

                                {/* Privacy-Enhanced 16:9 Embed (youtube-nocookie.com, rel=0) */}
                                <div className="yt-modal-iframe-wrap">
                                    <iframe
                                        src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                                        title={selectedVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="yt-modal-iframe"
                                    />
                                </div>

                                {/* Modal Footer */}
                                <div className="yt-modal-footer">
                                    <div className="yt-modal-info">
                                        <h4 className="yt-modal-title">{selectedVideo.title}</h4>
                                        <span className="yt-modal-date">
                                            <FaCalendarAlt size={12} style={{ color: '#fdbc12', marginRight: '5px' }} />
                                            {formatDate(selectedVideo.publishedAt)}
                                        </span>
                                    </div>

                                    <div className="yt-modal-btns">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="yt-open-external"
                                        >
                                            <FaYoutube size={14} className="yt-badge-red" />
                                            <span>Open in YouTube</span>
                                            <FaExternalLinkAlt size={10} />
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedVideo(null)}
                                            className="yt-modal-dismiss"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Scoped CSS with EASA College Theme System */}
            <style>{`
                .yt-section-wrapper {
                    position: relative;
                    background: linear-gradient(180deg, #0d1226 0%, #151c38 50%, #0d1226 100%);
                    padding: 5.5rem 1.5rem 6.5rem;
                    color: #FFFFFF;
                    overflow: hidden;
                    border-top: 1px solid rgba(253, 188, 18, 0.15);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .yt-section-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                /* Section Header */
                .yt-header-block {
                    text-align: center;
                    max-width: 820px;
                    margin: 0 auto 3.75rem;
                }

                .yt-tag-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(220, 38, 38, 0.12);
                    border: 1px solid rgba(239, 68, 68, 0.35);
                    color: #F87171;
                    font-size: 0.76rem;
                    font-weight: 900;
                    letter-spacing: 1px;
                    padding: 5px 14px;
                    border-radius: 50px;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                }

                .yt-pill-icon {
                    color: #EF4444;
                    font-size: 0.95rem;
                }

                .yt-main-heading {
                    font-size: 2.6rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 1rem 0;
                    letter-spacing: -0.5px;
                    line-height: 1.2;
                    background: linear-gradient(135deg, #FFFFFF 0%, #fdbc12 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .yt-sub-heading {
                    font-size: 1.05rem;
                    line-height: 1.6;
                    color: #CBD5E1;
                    margin: 0 auto;
                    font-weight: 400;
                }

                /* Cards Grid: Desktop (3), Tablet (2), Mobile (1) */
                .yt-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    margin-bottom: 3.5rem;
                }

                /* Video Card */
                .yt-video-card {
                    background: rgba(26, 33, 62, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .yt-video-card:hover {
                    border-color: rgba(253, 188, 18, 0.5);
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(46, 45, 120, 0.4);
                }

                .yt-card-thumb-box {
                    position: relative;
                    aspect-ratio: 16 / 9;
                    width: 100%;
                    overflow: hidden;
                    background: #0B1120;
                }

                .yt-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .yt-video-card:hover .yt-card-img {
                    transform: scale(1.06);
                }

                .yt-thumb-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(13, 18, 38, 0.95) 0%, rgba(13, 18, 38, 0.15) 50%, transparent 100%);
                }

                .yt-channel-badge {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: rgba(13, 18, 38, 0.85);
                    backdrop-filter: blur(8px);
                    color: #FFFFFF;
                    font-size: 0.72rem;
                    font-weight: 800;
                    padding: 4px 10px;
                    border-radius: 50px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    z-index: 2;
                }

                .yt-badge-red {
                    color: #EF4444;
                }

                .yt-play-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3;
                }

                .yt-play-circle {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    background: #DC2626;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.55);
                    transition: all 0.25s ease;
                }

                .yt-video-card:hover .yt-play-circle {
                    transform: scale(1.15);
                    background: #EF4444;
                    box-shadow: 0 0 25px rgba(239, 68, 68, 0.8);
                }

                .play-arrow {
                    margin-left: 3px;
                }

                /* Card Body */
                .yt-card-body {
                    padding: 1.4rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    justify-content: space-between;
                }

                .yt-card-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #FFFFFF;
                    margin: 0 0 1rem 0;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.2s ease;
                }

                .yt-video-card:hover .yt-card-title {
                    color: #fdbc12;
                }

                .yt-card-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 0.85rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                }

                .yt-card-date {
                    color: #94A3B8;
                    font-size: 0.78rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }

                .date-icon {
                    color: #fdbc12;
                }

                .yt-watch-btn {
                    color: #fdbc12;
                    font-size: 0.8rem;
                    font-weight: 800;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    transition: gap 0.2s ease;
                }

                .yt-video-card:hover .yt-watch-btn {
                    gap: 8px;
                    color: #FFD966;
                }

                /* Bottom Action Button */
                .yt-bottom-action {
                    text-align: center;
                }

                .yt-view-all-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: linear-gradient(135deg, #2e2d78 0%, #1a1954 100%);
                    color: #FFFFFF;
                    font-size: 0.95rem;
                    font-weight: 800;
                    padding: 0.9rem 2.2rem;
                    border-radius: 50px;
                    text-decoration: none;
                    border: 1px solid rgba(253, 188, 18, 0.4);
                    box-shadow: 0 8px 24px rgba(46, 45, 120, 0.45);
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .yt-view-all-btn:hover {
                    background: linear-gradient(135deg, #fdbc12 0%, #e5a709 100%);
                    color: #1a1954;
                    border-color: #fdbc12;
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(253, 188, 18, 0.4);
                }

                .yt-cta-icon {
                    color: #EF4444;
                    transition: color 0.2s ease;
                }

                .yt-view-all-btn:hover .yt-cta-icon {
                    color: #1a1954;
                }

                .yt-ext-icon {
                    margin-left: 2px;
                }

                /* Skeletons */
                .yt-skeleton-card {
                    background: rgba(26, 33, 62, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    overflow: hidden;
                }

                .yt-skeleton-thumb {
                    aspect-ratio: 16 / 9;
                    background: rgba(255, 255, 255, 0.04);
                }

                .yt-skeleton-body {
                    padding: 1.4rem;
                }

                .yt-skeleton-line {
                    height: 14px;
                    background: rgba(255, 255, 255, 0.06);
                    border-radius: 4px;
                    margin-bottom: 0.6rem;
                }

                .yt-skeleton-meta {
                    height: 12px;
                    width: 40%;
                    background: rgba(255, 255, 255, 0.04);
                    border-radius: 4px;
                    margin-top: 1.2rem;
                }

                .shimmer {
                    animation: shimmerAnim 1.6s infinite linear;
                    background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
                    background-size: 200% 100%;
                }

                @keyframes shimmerAnim {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                /* Error Card */
                .yt-error-card {
                    text-align: center;
                    padding: 3.5rem 2rem;
                    background: rgba(26, 33, 62, 0.6);
                    border-radius: 20px;
                    border: 1px dashed rgba(253, 188, 18, 0.3);
                    margin-bottom: 3rem;
                }

                .yt-error-icon {
                    color: #fdbc12;
                    margin-bottom: 1rem;
                    opacity: 0.7;
                }

                .yt-error-title {
                    font-size: 1.35rem;
                    font-weight: 800;
                    margin: 0 0 0.5rem;
                }

                .yt-error-text {
                    color: #CBD5E1;
                    font-size: 0.95rem;
                    margin: 0 0 1.5rem;
                }

                .yt-primary-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #DC2626;
                    color: #FFFFFF;
                    font-size: 0.9rem;
                    font-weight: 800;
                    padding: 0.75rem 1.6rem;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .yt-primary-cta:hover {
                    background: #B91C1C;
                    transform: translateY(-2px);
                }

                /* Modal Lightbox */
                .yt-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.25rem;
                    box-sizing: border-box;
                }

                .yt-modal-shade {
                    position: absolute;
                    inset: 0;
                    background: rgba(3, 7, 18, 0.94);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }

                .yt-modal-dialog {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 860px;
                    background: #0d1226;
                    border: 1px solid rgba(253, 188, 18, 0.35);
                    border-radius: 22px;
                    overflow: hidden;
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(46, 45, 120, 0.5);
                    margin: auto;
                    color: #FFFFFF;
                }

                .yt-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.9rem 1.4rem;
                    background: rgba(15, 23, 42, 0.85);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .yt-modal-brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .yt-modal-handle {
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #FFFFFF;
                }

                .yt-modal-verified {
                    font-size: 0.75rem;
                    color: #fdbc12;
                    margin-left: 4px;
                }

                .yt-modal-close {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #CBD5E1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .yt-modal-close:hover {
                    background: #DC2626;
                    color: #FFFFFF;
                    transform: rotate(90deg);
                }

                .yt-modal-iframe-wrap {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                    background: #000000;
                }

                .yt-modal-iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }

                .yt-modal-footer {
                    padding: 1.25rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    flex-wrap: wrap;
                    background: rgba(15, 23, 42, 0.85);
                }

                .yt-modal-info {
                    flex-grow: 1;
                    min-width: 200px;
                }

                .yt-modal-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    margin: 0 0 0.3rem 0;
                    color: #FFFFFF;
                }

                .yt-modal-date {
                    font-size: 0.78rem;
                    color: #94A3B8;
                    display: inline-flex;
                    align-items: center;
                }

                .yt-modal-btns {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .yt-open-external {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.55rem 1rem;
                    background: rgba(220, 38, 38, 0.15);
                    border: 1px solid rgba(239, 68, 68, 0.4);
                    border-radius: 50px;
                    color: #FFFFFF;
                    font-size: 0.78rem;
                    font-weight: 800;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .yt-open-external:hover {
                    background: #DC2626;
                    color: #FFFFFF;
                }

                .yt-modal-dismiss {
                    padding: 0.55rem 1rem;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 50px;
                    color: #CBD5E1;
                    font-size: 0.78rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .yt-modal-dismiss:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: #FFFFFF;
                }

                /* Responsive Breakpoints: Tablet (2 cards), Mobile (1 card) */
                @media (max-width: 1024px) {
                    .yt-cards-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.75rem;
                    }
                    .yt-main-heading {
                        font-size: 2.2rem;
                    }
                }

                @media (max-width: 640px) {
                    .yt-section-wrapper {
                        padding: 4rem 1rem 5rem;
                    }
                    .yt-cards-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .yt-main-heading {
                        font-size: 1.8rem;
                    }
                    .yt-sub-heading {
                        font-size: 0.95rem;
                    }
                    .yt-modal-footer {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .yt-modal-btns {
                        justify-content: space-between;
                    }
                }
            `}</style>
        </section>
    );
};

export default YouTubeVideos;
