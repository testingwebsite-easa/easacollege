import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_BASE_URL from '../api';
import { FaImages, FaArrowRight } from 'react-icons/fa';

const GalleryCarousel = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(1);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/gallery-events`)
            .then(res => res.json())
            .then(data => {
                const recentEvents = data.slice(0, 10);
                const slides = recentEvents.map(event => {
                    if (event.photos && event.photos.length > 0) {
                        return {
                            src: event.photos[0].src,
                            caption: event.eventName,
                            date: event.date,
                            id: event._id
                        };
                    }
                    return null;
                }).filter(item => item !== null);

                setGalleryImages(slides);
            })
            .catch(err => console.error("Error fetching gallery events:", err));

        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1280) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="gallery-section" style={{ padding: '4rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--glass-highlight)', padding: '0.6rem 1.5rem', borderRadius: '50px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}
                    >
                        <FaImages /> Visual Journey
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1', marginBottom: '1.5rem' }}
                    >
                        Campus <span style={{ color: 'var(--secondary)' }}>Gallery</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}
                    >
                        Glimpses of vibrant life, innovation, and academic activity at EASA College.
                    </motion.p>
                </div>

                <div className="gallery-slider-wrapper" style={{ paddingBottom: '4rem' }}>
                    <Slider {...settings}>
                        {galleryImages.map((item, index) => (
                            <div key={item.id || index} style={{ padding: '1.5rem' }}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="gallery-card"
                                    onClick={() => window.location.href = '/gallery'}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="g-img"
                                    />
                                    <div className="gallery-overlay" />
                                    <div className="gallery-content">
                                        <div>
                                            <h3 className="gallery-title">{item.caption}</h3>
                                            <p className="gallery-date">{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</p>
                                        </div>
                                        <div className="gallery-icon">
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <style>{`
                .gallery-card {
                    background: var(--bg-card);
                    border-radius: 32px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                    height: 450px;
                    position: relative;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    cursor: pointer;
                }
                .g-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }
                .g-img:hover { transform: scale(1.1); }
                
                .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
                }

                .gallery-content {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 2.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .gallery-title {
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: white;
                    margin: 0;
                }

                .gallery-date {
                    color: rgba(255,255,255,0.7);
                    font-size: 0.9rem;
                    margin-top: 8px;
                    font-weight: 600;
                }

                .gallery-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.3);
                }

                .slick-dots li button:before { color: var(--text-muted) !important; font-size: 12px !important; transition: 0.3s; }
                .slick-dots li.slick-active button:before { color: var(--secondary) !important; transform: scale(1.4); }
                
                @media (max-width: 768px) {
                    .gallery-section {
                        padding: 3rem 1rem !important;
                    }
                    .gallery-card { height: 350px; }
                    .gallery-title { font-size: 1.2rem; }
                    .gallery-content { padding: 1.5rem; }
                }
            `}</style>
        </section>
    );
};

export default GalleryCarousel;
