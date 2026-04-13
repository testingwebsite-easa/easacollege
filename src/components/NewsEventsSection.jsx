import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_BASE_URL from '../api';

const NewsEventsSection = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const sliderRef = useRef(null);

    useEffect(() => {
        // Keeping the same endpoint for now as requested "same that just change the name"
        // If the backend has a specific news endpoint, it should be used, but user implied reusing the same content structure.
        // Assuming 'moments' data source is what they want to show as 'News & Events' or I should fetch news?
        // "change the moments page to news and evnt same that just change the name"
        // Only changing the name/title. The data source might still be 'moments' if that's what they have populated.
        // I will keep the fetch as is but rename state variables for clarity? Or just keep them to minimize diff.
        // Let's keep fetching 'moments' but label it News & Events for now, unless there is a /api/news.
        // The user didn't ask to change the data source.
        fetch(`${API_BASE_URL}/api/moments`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setNews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch news", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner"></div>
            <style>{`
                .spinner {
                    border: 4px solid rgba(255, 255, 255, 0.1);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border-left-color: #FCCA26;
                    animation: spin 1s ease infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
    if (news.length === 0) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "cubic-bezier(0.25, 1, 0.5, 1)",
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        appendDots: dots => (
            <div style={{ bottom: "-40px" }}>
                <ul style={{ margin: "0px", padding: "0" }}> {dots} </ul>
            </div>
        )
    };

    return (
        <section className="news-events-section">
            {/* Background Decorative Elements */}
            <div className="section-bg-decor">
                <div className="decor-blob blob-1" />
                <div className="decor-blob blob-2" />
            </div>

            <div className="container relative z-10">
                <div className="section-header-wrapper">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title-large">
                            NEWS & EVENTS
                        </h2>
                        <div className="title-underline"></div>
                        <p className="section-description">
                            Check out the latest updates, achievements, and upcoming events at EASA College.
                        </p>
                    </motion.div>
                </div>

                <div className="slider-wrapper">
                    {/* Custom Arrows */}
                    <button onClick={() => sliderRef.current?.slickPrev()} className="slider-arrow arrow-left">
                        <FaChevronLeft />
                    </button>

                    <button onClick={() => sliderRef.current?.slickNext()} className="slider-arrow arrow-right">
                        <FaChevronRight />
                    </button>

                    <Slider ref={sliderRef} {...settings} className="news-slider">
                        {news.map((item, index) => (
                            <div key={item._id || index} className="slide-padding">
                                <motion.div
                                    className="news-card-premium"
                                    whileHover={{ y: -10 }}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Image Container */}
                                    <div className="image-container">
                                        <div className="image-overlay" />
                                        <img
                                            src={item.image || 'https://via.placeholder.com/400x300'}
                                            alt={item.title}
                                            className="news-image"
                                        />

                                        {/* Date Badge */}
                                        {item.date && (
                                            <div className="date-badge">
                                                <span className="date-day">
                                                    {new Date(item.date).getDate()}
                                                </span>
                                                <span className="date-month">
                                                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short' })}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Container */}
                                    <div className="content-container">
                                        <div className="content-inner">
                                            <h3 className="news-title">
                                                {item.title}
                                            </h3>
                                            <div className="title-accent" />
                                            <p className="news-desc">
                                                {item.description}
                                            </p>
                                            <div className="read-more-wrapper">
                                                <button
                                                    className="read-more-btn"
                                                    onClick={() => navigate('/gallery')}
                                                >
                                                    Read More
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <style>{`
                .news-events-section {
                    position: relative;
                    padding: 5rem 1rem;
                    overflow: hidden;
                    // background: linear-gradient(to bottom, #0f172a, #1e293b);
                    color: white;
                }

                .section-bg-decor {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }

                .decor-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.1;
                }

                .blob-1 {
                    top: -20%;
                    left: -10%;
                    width: 400px;
                    height: 400px;
                    background: #2563eb;
                }

                .blob-2 {
                    top: 40%;
                    right: -10%;
                    width: 300px;
                    height: 300px;
                    background: #eab308;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }

                .relative { position: relative; }
                .z-10 { z-index: 10; }

                .section-header-wrapper {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-title-large {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #facc15, #fef08a);
                    -webkit-background-clip: text;
                    color: transparent;
                    display: inline-block;
                    text-transform: uppercase;
                }

                .title-underline {
                    height: 4px;
                    width: 100px;
                    background: linear-gradient(to right, #eab308, transparent);
                    margin: 0 auto 1.5rem auto;
                    border-radius: 2px;
                }

                .section-description {
                    color: #94a3b8;
                    max-width: 600px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }

                .slider-wrapper {
                    position: relative;
                    padding: 0 1rem;
                }

                .slider-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    outline: none;
                }

                .slider-arrow:hover {
                    background: #eab308;
                    color: black;
                }

                .arrow-left { left: -20px; }
                .arrow-right { right: -20px; }

                .slide-padding {
                    padding: 0.75rem;
                    height: 100%;
                    box-sizing: border-box;
                }

                .news-card-premium {
                    position: relative;
                    height: 450px;
                    border-radius: 16px;
                    overflow: hidden;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    transition: all 0.5s ease;
                }

                .news-card-premium:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }

                .image-container {
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, #0f172a 10%, rgba(15, 23, 42, 0.6) 50%, transparent 100%);
                    z-index: 10;
                    opacity: 0.9;
                }

                .news-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.7s ease;
                }

                .news-card-premium:hover .news-image {
                    transform: scale(1.1);
                }

                .date-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    z-index: 20;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.5rem 0.8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 60px;
                }

                .date-day {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #facc15;
                    line-height: 1;
                }

                .date-month {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.8);
                    letter-spacing: 0.05em;
                }

                .content-container {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 1.5rem;
                    z-index: 20;
                    background: linear-gradient(to top, #0f172a 0%, transparent 100%);
                }

                .news-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.3s;
                }

                .news-card-premium:hover .news-title {
                    color: #facc15;
                }

                .title-accent {
                    width: 3rem;
                    height: 3px;
                    background: #eab308;
                    border-radius: 2px;
                    margin-bottom: 0.75rem;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .news-card-premium:hover .title-accent {
                    opacity: 1;
                }

                .news-desc {
                    color: #cbd5e1;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }

                .news-card-premium:hover .news-desc {
                    opacity: 1;
                }

                .read-more-wrapper {
                    margin-top: 1.5rem;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.4s ease;
                }

                .news-card-premium:hover .read-more-wrapper {
                    opacity: 1;
                    transform: translateY(0);
                }

                .read-more-btn {
                    background: transparent;
                    border: 1px solid rgba(250, 204, 21, 0.5);
                    color: #facc15;
                    padding: 0.6rem 1.2rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .read-more-btn:hover {
                    background: #facc15;
                    color: #0f172a;
                    border-color: #facc15;
                    box-shadow: 0 0 20px rgba(250, 204, 21, 0.4);
                }

                .read-more-btn svg {
                    transition: transform 0.3s ease;
                }

                .read-more-btn:hover svg {
                    transform: translateX(4px);
                }

                /* Slick Slider Overrides */
                .news-slider .slick-dots li button:before {
                    color: white;
                    opacity: 0.25;
                    font-size: 10px;
                }
                .news-slider .slick-dots li.slick-active button:before {
                    color: #FCCA26;
                    opacity: 1;
                }
                
                .news-slider .slick-slide > div {
                    height: 100%;
                }

                /* Mobile Sizing overrides */
                @media (max-width: 1024px) {
                    .news-card-premium { height: 400px; }
                    .slider-arrow { display: none; }
                }

                @media (max-width: 768px) {
                    .section-title-large { font-size: 2rem; }
                    .news-card-premium { height: 380px; }
                    .slider-wrapper { padding: 0 0.5rem; }
                    .slide-padding { padding: 0.5rem; }
                    .content-container { padding: 1rem; }
                    .date-badge { top: 0.75rem; right: 0.75rem; padding: 0.4rem 0.6rem; min-width: 50px; }
                    .date-day { font-size: 1.1rem; }
                    .date-month { font-size: 0.7rem; }
                }

                @media (max-width: 480px) {
                    .news-events-section { padding: 3rem 1rem; }
                    .news-card-premium { height: 350px; }
                    .slide-padding { padding: 0.25rem; }
                    .section-description { font-size: 0.95rem; }
                    .title-underline { width: 80px; }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default NewsEventsSection;
