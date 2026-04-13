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
    const navigate = useNavigate();
    const [heroSlides, setHeroSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/hero-slides`)
            .then(res => res.json())
            .then(data => {
                setHeroSlides(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching hero slides:", err);
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
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    color: white;
                    max-width: 900px;
                    padding: 0 1rem;
                }
                .hero-btn-group {
                    display: flex;
                    gap: 1.2rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .hero-btn {
                    padding: 1rem 2.5rem;
                    font-size: 1.1rem;
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
                    bottom: 30px !important;
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
                        width: 90%;
                        max-width: 100%;
                    }
                    .hero-btn-group {
                        gap: 0.8rem;
                        flex-direction: column;
                        align-items: center;
                    }
                    .hero-btn {
                        padding: 0.8rem 2rem !important;
                        font-size: 0.95rem !important;
                        width: 100%;
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
                
                /* Force Full Screen Height */
                .hero-carousel,
                .hero-carousel .slick-slider,
                .hero-carousel .slick-list,
                .hero-carousel .slick-track {
                    height: 100vh;
                    height: 100dvh;
                }
                
                .hero-carousel .slick-slide {
                    height: 100%;
                }
                
                .hero-carousel .slick-slide > div {
                    height: 100vh;
                    height: 100dvh;
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
                        <div style={{
                            position: 'relative',
                            height: '100vh',
                            minHeight: '100dvh', // Ensure mobile adaptation
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
                                style={{
                                    filter: 'brightness(0.35)', // Slightly darker for text pop
                                    transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)', // Subtle zoom effect on active
                                    transition: 'transform 6s ease' // Long zoom over time
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
                                }}
                            />

                            {/* Content Overlay */}
                            <div className="container hero-content-container">
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate={index === currentSlide ? "visible" : "hidden"}
                                >
                                    <motion.h1
                                        variants={itemVariants}
                                        className="hero-title"
                                        style={{
                                            fontSize: 'clamp(2rem, 5vw, 4.5rem)', // Adjusted min size
                                            fontWeight: '800',
                                            marginBottom: '1rem',
                                            textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                                            lineHeight: 1.1,
                                            letterSpacing: '-1px'
                                        }}
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p
                                        variants={itemVariants}
                                        className="hero-subtitle"
                                        style={{
                                            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                                            marginBottom: '2.5rem',
                                            opacity: 0.9,
                                            maxWidth: '700px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            fontWeight: 300
                                        }}
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    <motion.div
                                        variants={itemVariants}
                                        className="hero-btn-group"
                                    >
                                        <button
                                            className="btn btn-primary hero-btn"
                                            onClick={onApplyClick}
                                        >
                                            Admissions Open
                                        </button>
                                        <button
                                            className="btn hero-btn"
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                backdropFilter: 'blur(10px)',
                                                WebkitBackdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: 'white'
                                            }}
                                        >
                                            Virtual Tour
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};


