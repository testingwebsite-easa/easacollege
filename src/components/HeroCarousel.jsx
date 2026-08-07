import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_BASE_URL from '../api';

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
    <button className="custom-slick-arrow custom-prev-arrow" onClick={onClick} aria-label="Previous Slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </button>
);

const NextArrow = ({ onClick }) => (
    <button className="custom-slick-arrow custom-next-arrow" onClick={onClick} aria-label="Next Slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </button>
);

export const HeroCarousel = ({ onApplyClick }) => {
    const defaultSlides = [
        {
            title: "EASA College of Engineering and Technology",
            subtitle: "Empowering Minds, Engineering the Future",
            image: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlufknq3G5LFb-mAJV4AWzIqN0InRpsLOujTCmaHqUcJ55AAz4CYKfO0AAeJ6eNmTRrYimN2o-rBL_w7KkaROavE3zl0xUX9DSAqN8N4XmbfTalti_PeoBUJ35oq3bXawP8KsE=s680-w680-h510-rw",
            mobileImage: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmqJDBQfqeJLgjWVjtIUVBVC-6cYjmEvQl-Txmi8h7psEy7l8BH2xpkw8Ik-eE5mYf2wuLmhywGJjahQ-2_MWQZntPc86DUJWI5zzSGBxlh4yUeWxNZ6mvcr1_zEO_9cWQQ6NJN=s680-w680-h510-rw"
        }
    ];

    const [heroSlides, setHeroSlides] = useState(defaultSlides);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/hero-slides`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setHeroSlides(data);
                } else {
                    setHeroSlides(defaultSlides);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching hero slides:", err);
                setHeroSlides(defaultSlides);
                setLoading(false);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: true, // Enabled arrows here
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        appendDots: dots => (
            <div style={{
                position: "absolute",
                bottom: "30px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 25
            }}>
                <ul style={{ margin: "0px", padding: 0, display: "flex", listStyle: "none" }}> {dots} </ul>
            </div>
        )
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 50 }
        }
    };

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                width: '100%',
                backgroundColor: '#111'
            }}>
                {/* Global Loader handles the visual */}
            </div>
        );
    }

    return (
        <div className="hero-carousel" style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
            <style>{`
                .hero-carousel {
                    margin-top: 0 !important;
                    width: 100%;
                    position: relative;
                }

                .hero-carousel,
                .hero-carousel .slick-slider,
                .hero-carousel .slick-list,
                .hero-carousel .slick-track,
                .hero-carousel .slick-slide > div,
                .hero-slide-item {
                    height: clamp(480px, 72vh, 700px);
                    min-height: 480px;
                }

                .hero-carousel .slick-slide {
                    height: 100%;
                }

                .hero-slide-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to top, 
                        rgba(11, 15, 25, 0.88) 0%, 
                        rgba(11, 15, 25, 0.45) 50%, 
                        rgba(0, 0, 0, 0.15) 100%
                    );
                    z-index: 10;
                    pointer-events: none;
                }

                .hero-content-container {
                    position: absolute;
                    bottom: 60px;
                    left: 60px;
                    z-index: 20;
                    text-align: left;
                    color: white;
                    width: calc(100% - 120px);
                    max-width: 700px;
                    padding: 0;
                }

                .hero-title {
                    font-size: clamp(1.4rem, 3vw, 2.5rem);
                    font-weight: 800;
                    margin-bottom: 0.6rem;
                    text-shadow: 0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7);
                    line-height: 1.25;
                    letter-spacing: -0.02em;
                }

                .hero-subtitle {
                    font-size: clamp(0.85rem, 1.5vw, 1.1rem);
                    margin-bottom: 0;
                    opacity: 0.95;
                    max-width: 650px;
                    line-height: 1.5;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                }

                .hero-btn-group {
                    margin-top: 1.2rem;
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    z-index: 30;
                }

                .hero-btn {
                    padding: 0.75rem 2rem;
                    font-size: 0.95rem;
                    font-weight: 600;
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%) !important;
                    color: #ffffff !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(27, 42, 107, 0.4);
                    transition: all 0.3s ease;
                }

                .hero-btn:hover {
                    background: linear-gradient(135deg, #2D2C7A 0%, #1B2A6B 100%) !important;
                    color: #FCCA26 !important;
                    border-color: #FCCA26 !important;
                    box-shadow: 0 6px 20px rgba(252, 202, 38, 0.4);
                    transform: translateY(-2px);
                }

                /* Custom Arrows */
                .custom-slick-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 25;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                    transition: all 0.3s ease;
                }

                .custom-slick-arrow:hover {
                    background: rgba(255, 255, 255, 0.35);
                    transform: translateY(-50%) scale(1.08);
                }

                .custom-prev-arrow {
                    left: 20px;
                }

                .custom-next-arrow {
                    right: 20px;
                }

                /* Custom Dots Override */
                .hero-carousel .slick-dots {
                    bottom: 20px !important;
                    z-index: 25;
                }

                .hero-carousel .slick-dots li {
                    margin: 0 4px;
                }

                .hero-carousel .slick-dots li button:before {
                    font-size: 10px;
                    color: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                .hero-carousel .slick-dots li.slick-active button:before {
                    color: #FCCA26;
                    font-size: 13px;
                }

                /* Hero Background Image */
                .hero-bg-picture {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    overflow: hidden;
                    display: block;
                }

                .hero-bg-image {
                    height: 100% !important;
                    width: 100% !important;
                    max-width: none !important;
                    object-fit: cover !important;
                    object-position: center top !important;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
                }

                .hero-bg-image.fit-contain {
                    object-fit: contain !important;
                    background-color: #0b0f19;
                }

                /* Tablet Responsiveness */
                @media (max-width: 991px) {
                    .hero-carousel,
                    .hero-carousel .slick-slider,
                    .hero-carousel .slick-list,
                    .hero-carousel .slick-track,
                    .hero-carousel .slick-slide > div,
                    .hero-slide-item {
                        height: clamp(380px, 60vh, 550px);
                        min-height: 380px;
                    }

                    .hero-content-container {
                        left: 30px;
                        bottom: 50px;
                        width: calc(100% - 60px);
                    }
                }

                /* Mobile Responsiveness */
                @media (max-width: 767px) {
                    .hero-carousel,
                    .hero-carousel .slick-slider,
                    .hero-carousel .slick-list,
                    .hero-carousel .slick-track,
                    .hero-carousel .slick-slide > div,
                    .hero-slide-item {
                        height: clamp(320px, 52vh, 480px);
                        min-height: 320px;
                    }

                    .hero-content-container {
                        left: 16px;
                        right: 16px;
                        bottom: 45px;
                        width: calc(100% - 32px);
                        max-width: 100%;
                        text-align: center;
                        background: rgba(11, 15, 25, 0.4);
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        padding: 0.9rem 1rem;
                        border-radius: 14px;
                        border: 1px solid rgba(255, 255, 255, 0.12);
                    }

                    .hero-title {
                        font-size: clamp(1.1rem, 4.5vw, 1.5rem);
                        margin-bottom: 0.3rem;
                    }

                    .hero-subtitle {
                        font-size: clamp(0.78rem, 3vw, 0.92rem);
                    }

                    .hero-btn-group {
                        justify-content: center;
                        margin-top: 0.8rem;
                    }

                    .hero-btn {
                        padding: 0.55rem 1.4rem !important;
                        font-size: 0.85rem !important;
                    }

                    .custom-slick-arrow {
                        width: 36px;
                        height: 36px;
                    }

                    .custom-prev-arrow {
                        left: 8px;
                    }

                    .custom-next-arrow {
                        right: 8px;
                    }
                }

                @media (max-width: 480px) {
                    .custom-slick-arrow {
                        display: none !important;
                    }
                }
            `}</style>
            <Slider {...settings}>
                {heroSlides.map((slide, index) => (
                    <div key={index}>
                        <div className="hero-slide-item" style={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Background Image with HTML5 Picture tag for Desktop / Mobile resolution separation */}
                            <picture className="hero-bg-picture">
                                {(slide.mobileImage || slide.mobile_image || slide.imageMobile || slide.mobileUrl || slide.mobile_url) && (
                                    <source
                                        media="(max-width: 767px)"
                                        srcSet={slide.mobileImage || slide.mobile_image || slide.imageMobile || slide.mobileUrl || slide.mobile_url}
                                    />
                                )}
                                <source
                                    media="(min-width: 768px)"
                                    srcSet={slide.image || slide.desktopImage || slide.desktop_image}
                                />
                                <img
                                    src={slide.image || slide.desktopImage || slide.desktop_image}
                                    alt={slide.title || "Hero Slide"}
                                    className={`hero-bg-image ${slide.fit === 'contain' || slide.mobileFit === 'contain' ? 'fit-contain' : ''}`}
                                    fetchPriority={index === 0 ? "high" : "low"}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                    style={{
                                        transform: index === currentSlide ? 'scale(1.04)' : 'scale(1)',
                                        transition: 'transform 6s ease'
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
                                    }}
                                />
                            </picture>

                            {/* Dark Gradient Overlay for Maximum Text Readability */}
                            <div className="hero-slide-overlay" />

                            {/* Content Overlay */}
                            <div className="hero-content-container">
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate={index === currentSlide ? "visible" : "hidden"}
                                >
                                    {slide.title && (
                                        <motion.h1
                                            variants={itemVariants}
                                            className="hero-title"
                                            style={{ color: slide.titleColor || '#ffffff' }}
                                        >
                                            {slide.title}
                                        </motion.h1>
                                    )}

                                    {slide.subtitle && (
                                        <motion.p
                                            variants={itemVariants}
                                            className="hero-subtitle"
                                            style={{ color: slide.subtitleColor || '#ffffff' }}
                                        >
                                            {slide.subtitle}
                                        </motion.p>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};


