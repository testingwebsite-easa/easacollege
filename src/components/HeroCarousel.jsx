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
            image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"
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
                .hero-content-container {
                    position: absolute;
                    bottom: 70px;
                    left: 80px;
                    z-index: 20;
                    text-align: left;
                    color: white;
                    width: calc(100% - 320px);
                    max-width: 650px;
                    padding: 0;
                }
                .hero-btn-group {
                    position: absolute;
                    bottom: 91px;
                    left: 40%;
                    transform: translateX(-50%);
                    right: auto !important;
                    margin: 0 !important;
                    z-index: 30;
                    display: flex;
                    gap: 1.2rem;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .hero-btn {
                    padding: 0.8rem 2.2rem;
                    font-size: 1rem;
                    font-weight: 600;
                    background-color: #1B2A6B !important;
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
                    z-index: 25; /* Increased Z-index to ensure visibility */
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                    transition: all 0.3s ease;
                }
                .custom-slick-arrow:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-50%) scale(1.1);
                }
                .custom-prev-arrow {
                    left: 30px;
                }
                .custom-next-arrow {
                    right: 30px;
                }

                /* Custom Dots Override */
                .hero-carousel .slick-dots {
                    bottom: 25px !important;
                    z-index: 25;
                }
                .hero-carousel .slick-dots li {
                    margin: 0 5px;
                }
                .hero-carousel .slick-dots li button:before {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .hero-carousel .slick-dots li.slick-active button:before {
                    color: white;
                    font-size: 14px;
                }

                /* Mobile Adjustments */
                @media (max-width: 768px) {
                    .hero-content-container {
                        left: 20px;
                        bottom: 120px;
                        width: calc(100% - 40px);
                        max-width: 100%;
                        padding: 0;
                    }
                    .hero-btn-group {
                        bottom: 60px;
                        left: 50%;
                        transform: translateX(-50%);
                        right: auto !important;
                    }
                    .hero-btn {
                        padding: 0.7rem 1.5rem !important;
                        font-size: 0.9rem !important;
                        width: auto;
                        max-width: 250px;
                    }
                    .custom-slick-arrow {
                        width: 40px;
                        height: 40px;
                    }
                    .custom-prev-arrow {
                        left: 10px;
                    }
                    .custom-next-arrow {
                        right: 10px;
                    }
                }
                
                /* Hero Carousel Positioned Flush Below Sticky Navbar */
                .hero-carousel {
                    margin-top: 0 !important;
                }

                .hero-carousel,
                .hero-carousel .slick-slider,
                .hero-carousel .slick-list,
                .hero-carousel .slick-track,
                .hero-slide-item {
                    height: calc(100vh - 160px);
                    height: calc(100dvh - 160px);
                    min-height: 480px;
                }
                
                .hero-carousel .slick-slide {
                    height: 100%;
                }
                
                .hero-carousel .slick-slide > div {
                    height: calc(100vh - 160px);
                    height: calc(100dvh - 160px);
                    min-height: 480px;
                }

                @media (max-width: 1100px) {
                    .hero-carousel {
                        margin-top: 0 !important;
                    }
                    .hero-carousel,
                    .hero-carousel .slick-slider,
                    .hero-carousel .slick-list,
                    .hero-carousel .slick-track,
                    .hero-carousel .slick-slide > div,
                    .hero-slide-item {
                        height: calc(100vh - 90px);
                        height: calc(100dvh - 90px);
                        min-height: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .hero-carousel {
                        margin-top: 0 !important;
                    }
                    .hero-carousel,
                    .hero-carousel .slick-slider,
                    .hero-carousel .slick-list,
                    .hero-carousel .slick-track,
                    .hero-carousel .slick-slide > div,
                    .hero-slide-item {
                        height: calc(100vh - 60px);
                        height: calc(100dvh - 60px);
                        min-height: 350px;
                    }
                }

                /* Hero Image Override */
                .hero-bg-image {
                    height: 100% !important;
                    width: 100% !important;
                    max-width: none !important;
                    object-fit: cover !important;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
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
                            {/* Background Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="hero-bg-image"
                                fetchPriority={index === 0 ? "high" : "low"}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                style={{
                                    transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)', // Subtle zoom effect on active
                                    transition: 'transform 6s ease' // Long zoom over time
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
                                }}
                            />

                            {/* Content Overlay */}
                            <div className="hero-content-container">
                                {/* Smaller Left-Aligned Title & Subtitle */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate={index === currentSlide ? "visible" : "hidden"}
                                >
                                    <motion.h1
                                        variants={itemVariants}
                                        className="hero-title"
                                        style={{
                                            fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)',
                                            fontWeight: '700',
                                            marginBottom: '0.5rem',
                                            textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)',
                                            lineHeight: 1.2,
                                            letterSpacing: '-0.5px',
                                            color: slide.titleColor || '#ffffff'
                                        }}
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        variants={itemVariants}
                                        className="hero-subtitle"
                                        style={{
                                            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                                            marginBottom: '0',
                                            opacity: 1,
                                            maxWidth: '650px',
                                            marginLeft: '0',
                                            marginRight: 'auto',
                                            fontWeight: 400,
                                            textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)',
                                            color: slide.subtitleColor || '#ffffff'
                                        }}
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                </motion.div>
                            </div>

                            {/* Admissions Button Centered at Bottom */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate={index === currentSlide ? "visible" : "hidden"}
                                className="hero-btn-group"
                            >
                                <button
                                    className="btn btn-primary hero-btn"
                                    onClick={onApplyClick}
                                    style={{
                                        ...(slide.buttonBgColor ? { backgroundColor: slide.buttonBgColor, background: slide.buttonBgColor } : {}),
                                        ...(slide.buttonTextColor ? { color: slide.buttonTextColor } : {})
                                    }}
                                >
                                    Admissions Open
                                </button>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};


