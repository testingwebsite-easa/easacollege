import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { 
    FaArrowRight, 
    FaGraduationCap, 
    FaChevronLeft, 
    FaChevronRight, 
    FaClock, 
    FaFlask, 
    FaCheckCircle 
} from 'react-icons/fa';
import { departments } from '../data/departmentsData';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Prev Arrow (Desktop / Tablet)
const PrevArrow = ({ onClick }) => (
    <button 
        className="prog-slick-arrow prog-prev-arrow" 
        onClick={onClick} 
        aria-label="Previous Course"
        type="button"
    >
        <FaChevronLeft size={16} />
    </button>
);

// Custom Next Arrow (Desktop / Tablet)
const NextArrow = ({ onClick }) => (
    <button 
        className="prog-slick-arrow prog-next-arrow" 
        onClick={onClick} 
        aria-label="Next Course"
        type="button"
    >
        <FaChevronRight size={16} />
    </button>
);

const ProgramsSection = () => {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const sliderRef = useRef(null);

    // Responsive screen width detection
    const [windowWidth, setWindowWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth;
        }
        return 1200;
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1200;

    // Filter departments based on selected category
    const filteredDepartments = departments.filter(dept => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'UG') return dept.type === 'UG';
        if (activeFilter === 'PG') return dept.type === 'PG';
        return true;
    });

    const programsList = filteredDepartments.map(dept => {
        const isPG = dept.type === 'PG';
        const isMBA = dept.id === 'master-of-business-administration' || dept.slug === 'mba';
        
        let degreeBadge = isPG ? (isMBA ? 'MBA Program' : 'M.E. / M.Tech') : 'B.E. / B.Tech';
        let duration = isPG ? '2 Years' : '4 Years';

        return {
            id: dept.id,
            slug: dept.slug,
            title: dept.name,
            type: dept.type || 'UG',
            degreeBadge,
            duration,
            labCount: dept.labCount || (dept.labs ? `${dept.labs.length}+` : '3+'),
            description: dept.overview 
                ? (dept.overview.length > 130 ? dept.overview.substring(0, 130) + '...' : dept.overview)
                : 'Comprehensive curriculum designed to develop critical engineering thinking and real-world leadership.',
            link: `/department/${dept.id}`,
            image: dept.heroImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
        };
    });

    // Compute active slidesToShow: 1 on mobile, max 2 on tablet, max 3 on desktop
    const currentSlidesToShow = isMobile 
        ? 1 
        : isTablet 
            ? Math.min(2, programsList.length) 
            : Math.min(3, programsList.length);

    const isInfinite = programsList.length > currentSlidesToShow;

    // Slider settings optimized for touch and multi-device fluidity
    const settings = {
        dots: !isMobile,
        infinite: isInfinite,
        speed: 500,
        slidesToShow: currentSlidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnHover: true,
        pauseOnFocus: true,
        arrows: !isMobile,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        swipe: true,
        swipeToSlide: true,
        touchThreshold: 15,
        beforeChange: (_, next) => setCurrentSlideIndex(next),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: Math.min(2, programsList.length),
                    slidesToScroll: 1,
                    infinite: programsList.length > 2,
                    arrows: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: programsList.length > 1,
                    arrows: false,
                    dots: false
                }
            }
        ]
    };

    const handleFilterChange = (key) => {
        setActiveFilter(key);
        setCurrentSlideIndex(0);
        if (sliderRef.current?.slickGoTo) {
            sliderRef.current.slickGoTo(0);
        }
    };

    return (
        <section 
            className="programs-section" 
            id="courses-offered" 
            style={{ 
                padding: '3.5rem 1.5rem', 
                background: 'var(--bg-main)', 
                position: 'relative', 
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box'
            }}
        >
            {/* Background Ambient Glows */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(230, 182, 39, 0.08) 0%, rgba(27, 42, 107, 0.05) 50%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="programs-inner-container">
                
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="programs-pill-badge"
                    >
                        <FaGraduationCap size={15} /> Courses &amp; Programs Offered
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(1.85rem, 4.5vw, 3.6rem)',
                            fontWeight: '900',
                            color: 'var(--text-main)',
                            lineHeight: '1.2',
                            marginBottom: '1rem',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        Programs that <span style={{ color: 'var(--secondary)' }}>inspire.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                            color: 'var(--text-muted)',
                            maxWidth: '650px',
                            margin: '0 auto 1.8rem',
                            lineHeight: '1.65'
                        }}
                    >
                        Explore accredited undergraduate and postgraduate degree courses built for futuristic technological leadership and career acceleration.
                    </motion.p>

                    {/* Filter Tabs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="courses-filter-bar"
                    >
                        {[
                            { key: 'ALL', label: 'All Courses', count: departments.length },
                            { key: 'UG', label: 'UG Degrees', count: departments.filter(d => d.type === 'UG').length },
                            { key: 'PG', label: 'PG Degrees', count: departments.filter(d => d.type === 'PG').length }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => handleFilterChange(tab.key)}
                                className={`courses-filter-btn ${activeFilter === tab.key ? 'active' : ''}`}
                            >
                                <span>{tab.label}</span>
                                <span className="filter-count-badge">{tab.count}</span>
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Carousel Slider */}
                <div className="courses-carousel-wrapper">
                    <Slider ref={sliderRef} key={`${activeFilter}-${currentSlidesToShow}`} {...settings}>
                        {programsList.map((program) => (
                            <div key={program.id} className="course-slide-item">
                                <div className="course-card-inner">
                                    
                                    {/* Image & Badges */}
                                    <div className="course-img-wrapper">
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="course-card-img"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";
                                            }}
                                        />
                                        <div className="course-img-overlay" />
                                        
                                        <div className="course-badge-container">
                                            <span className="course-degree-badge">
                                                {program.degreeBadge}
                                            </span>
                                            <span className="course-type-pill">
                                                {program.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="course-card-body">
                                        <h3 className="course-card-title" title={program.title}>
                                            {program.title}
                                        </h3>

                                        {/* Specs / Meta Badges */}
                                        <div className="course-meta-tags">
                                            <span className="meta-tag">
                                                <FaClock style={{ color: 'var(--secondary)' }} /> {program.duration}
                                            </span>
                                            <span className="meta-tag">
                                                <FaFlask style={{ color: 'var(--secondary)' }} /> {program.labCount} Labs
                                            </span>
                                            <span className="meta-tag">
                                                <FaCheckCircle style={{ color: '#10B981' }} /> AICTE
                                            </span>
                                        </div>

                                        {/* Explore Button */}
                                        <div className="course-card-footer">
                                            <Link
                                                to={program.link}
                                                className="course-explore-btn"
                                            >
                                                <span>Explore Course</span>
                                                <div className="btn-arrow-circle">
                                                    <FaArrowRight size={12} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Mobile Bottom Navigation Bar (Active counter + progress bar + touch arrows) */}
                {isMobile && programsList.length > 1 && (
                    <div className="mobile-carousel-controls">
                        <button
                            type="button"
                            className="mobile-nav-btn"
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous course"
                        >
                            <FaChevronLeft size={14} />
                        </button>
                        
                        <div className="mobile-slide-indicator">
                            <span className="mobile-slide-text">
                                Course <strong>{((currentSlideIndex % programsList.length) + 1)}</strong> of <strong>{programsList.length}</strong>
                            </span>
                            <div className="mobile-progress-track">
                                <div 
                                    className="mobile-progress-bar"
                                    style={{ 
                                        width: `${(((currentSlideIndex % programsList.length) + 1) / programsList.length) * 100}%` 
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mobile-nav-btn"
                            onClick={() => sliderRef.current?.slickNext()}
                            aria-label="Next course"
                        >
                            <FaChevronRight size={14} />
                        </button>
                    </div>
                )}

            </div>

            {/* Custom Carousel Styles */}
            <style>{`
                .programs-inner-container {
                    max-width: 1400px;
                    width: 100%;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                    box-sizing: border-box;
                }

                .programs-pill-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--glass-highlight);
                    padding: 0.6rem 1.6rem;
                    border-radius: 50px;
                    color: var(--secondary);
                    font-weight: 800;
                    fontSize: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 1.2rem;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                }

                .courses-filter-bar {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--bg-card);
                    padding: 6px;
                    border-radius: 50px;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    margin-bottom: 2rem;
                    max-width: 100%;
                    box-sizing: border-box;
                }

                .courses-filter-btn {
                    background: transparent;
                    border: none;
                    color: var(--text-muted);
                    font-weight: 700;
                    font-size: 0.9rem;
                    padding: 0.6rem 1.4rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }

                .courses-filter-btn:hover {
                    color: var(--text-main);
                }

                .courses-filter-btn.active {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    box-shadow: 0 4px 15px rgba(27, 42, 107, 0.35);
                }

                .filter-count-badge {
                    font-size: 0.75rem;
                    padding: 2px 7px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.12);
                    font-weight: 800;
                }

                .courses-carousel-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    padding: 0 20px 2.5rem 20px;
                    box-sizing: border-box;
                    overflow: hidden;
                }

                .courses-carousel-wrapper .slick-slider {
                    width: 100%;
                    box-sizing: border-box;
                }

                .courses-carousel-wrapper .slick-list {
                    margin: 0 -12px;
                    padding: 12px 0 20px 0;
                    overflow: hidden;
                }

                .courses-carousel-wrapper .slick-slide {
                    padding: 0 12px;
                    box-sizing: border-box;
                    outline: none;
                }

                .courses-carousel-wrapper .slick-slide > div {
                    height: 100%;
                }

                .course-slide-item {
                    height: 100%;
                    outline: none;
                    box-sizing: border-box;
                }

                .course-card-inner {
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.06);
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    min-height: 380px;
                    position: relative;
                    box-sizing: border-box;
                }

                .course-card-inner:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px -10px rgba(0,0,0,0.25), 0 0 25px rgba(230, 182, 39, 0.12);
                    border-color: rgba(230, 182, 39, 0.35);
                }

                .course-img-wrapper {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                    width: 100%;
                }

                .course-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }

                .course-card-inner:hover .course-card-img {
                    transform: scale(1.08);
                }

                .course-img-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(11, 15, 25, 0.85) 0%, rgba(11, 15, 25, 0.2) 60%, transparent 100%);
                }

                .course-badge-container {
                    position: absolute;
                    bottom: 14px;
                    left: 14px;
                    right: 14px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 6px;
                    z-index: 2;
                }

                .course-degree-badge {
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(8px);
                    color: #1B2A6B;
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 4px 12px;
                    border-radius: 50px;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .course-type-pill {
                    background: rgba(252, 202, 38, 0.95);
                    color: #111827;
                    font-size: 0.72rem;
                    font-weight: 900;
                    padding: 3px 10px;
                    border-radius: 50px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    flex-shrink: 0;
                }

                .course-card-body {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    box-sizing: border-box;
                }

                .course-card-title {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: var(--text-main);
                    line-height: 1.35;
                    margin-bottom: 0.75rem;
                    min-height: 2.7rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .course-meta-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 1.2rem;
                }

                .meta-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    background: var(--glass-highlight);
                    padding: 4px 10px;
                    border-radius: 6px;
                    border: 1px solid var(--glass-border);
                    white-space: nowrap;
                }

                .course-card-footer {
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid var(--glass-border);
                }

                .course-explore-btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.75rem 1.2rem;
                    background: var(--glass-highlight);
                    color: var(--text-main);
                    text-decoration: none;
                    font-weight: 800;
                    font-size: 0.92rem;
                    border-radius: 12px;
                    border: 1px solid var(--glass-border);
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                }

                .course-explore-btn:hover {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #ffffff;
                    border-color: transparent;
                    box-shadow: 0 6px 20px rgba(27, 42, 107, 0.3);
                }

                .course-explore-btn:hover .btn-arrow-circle {
                    background: #FCCA26;
                    color: #111827;
                    transform: translateX(3px);
                }

                .btn-arrow-circle {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--secondary);
                    transition: all 0.3s ease;
                }

                /* Custom Slick Arrows */
                .prog-slick-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 20;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    color: var(--text-main);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                }

                .prog-slick-arrow:hover {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    border-color: #FCCA26;
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 8px 25px rgba(27, 42, 107, 0.4);
                }

                .prog-prev-arrow {
                    left: -18px;
                }

                .prog-next-arrow {
                    right: -18px;
                }

                /* Custom Dots (Desktop / Tablet) */
                .courses-carousel-wrapper .slick-dots {
                    bottom: -15px !important;
                }

                .courses-carousel-wrapper .slick-dots li {
                    margin: 0 4px;
                }

                .courses-carousel-wrapper .slick-dots li button:before {
                    font-size: 8px !important;
                    color: var(--text-muted) !important;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }

                .courses-carousel-wrapper .slick-dots li.slick-active button:before {
                    color: var(--secondary) !important;
                    opacity: 1;
                    font-size: 11px !important;
                }

                /* Mobile Controls Bar */
                .mobile-carousel-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    max-width: 380px;
                    margin: 0.5rem auto 0 auto;
                    padding: 8px 14px;
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 50px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
                    box-sizing: border-box;
                }

                .mobile-nav-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: var(--glass-highlight);
                    border: 1px solid var(--glass-border);
                    color: var(--text-main);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: all 0.2s ease;
                }

                .mobile-nav-btn:active {
                    background: #FCCA26;
                    color: #111827;
                    transform: scale(0.92);
                }

                .mobile-slide-indicator {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex-grow: 1;
                    gap: 4px;
                }

                .mobile-slide-text {
                    font-size: 0.78rem;
                    color: var(--text-muted);
                    letter-spacing: 0.3px;
                }

                .mobile-slide-text strong {
                    color: var(--text-main);
                }

                .mobile-progress-track {
                    width: 100%;
                    max-width: 140px;
                    height: 4px;
                    background: var(--glass-highlight);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .mobile-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #FCCA26 0%, #F59E0B 100%);
                    border-radius: 4px;
                    transition: width 0.3s ease;
                }

                @media (max-width: 1024px) {
                    .prog-prev-arrow { left: -8px; }
                    .prog-next-arrow { right: -8px; }
                }

                @media (max-width: 768px) {
                    .programs-section {
                        padding: 2.5rem 1rem !important;
                    }
                    .programs-pill-badge {
                        padding: 0.45rem 1.2rem;
                        font-size: 0.76rem;
                        letter-spacing: 1.5px;
                        margin-bottom: 0.8rem;
                    }
                    .courses-filter-bar {
                        display: flex;
                        width: 100%;
                        max-width: 440px;
                        margin: 0 auto 1.5rem auto;
                        padding: 4px;
                        border-radius: 16px;
                        gap: 4px;
                        box-sizing: border-box;
                    }
                    .courses-filter-btn {
                        flex: 1;
                        padding: 0.55rem 0.4rem;
                        font-size: 0.78rem;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 5px;
                        white-space: nowrap;
                    }
                    .filter-count-badge {
                        font-size: 0.7rem;
                        padding: 1px 5px;
                    }
                    .courses-carousel-wrapper {
                        padding: 0 0 1rem 0 !important;
                        overflow: hidden !important;
                    }
                    .courses-carousel-wrapper .slick-list {
                        margin: 0 !important;
                        padding: 8px 0 16px 0 !important;
                        overflow: hidden !important;
                    }
                    .courses-carousel-wrapper .slick-slide {
                        padding: 0 4px !important;
                    }
                    .prog-slick-arrow {
                        display: none !important;
                    }
                    .course-card-inner {
                        min-height: auto;
                        border-radius: 20px;
                    }
                    .course-img-wrapper {
                        height: 180px;
                    }
                    .course-card-body {
                        padding: 1.25rem 1.15rem;
                    }
                    .course-card-title {
                        font-size: 1.15rem;
                        min-height: auto;
                        margin-bottom: 0.55rem;
                        line-height: 1.3;
                    }
                    .course-meta-tags {
                        gap: 6px;
                        margin-bottom: 1rem;
                    }
                    .meta-tag {
                        font-size: 0.74rem;
                        padding: 3px 8px;
                    }
                    .course-explore-btn {
                        padding: 0.7rem 1rem;
                        font-size: 0.88rem;
                    }
                }

                @media (max-width: 480px) {
                    .programs-section {
                        padding: 2rem 0.65rem !important;
                    }
                    .courses-filter-btn {
                        font-size: 0.72rem;
                        padding: 0.5rem 0.25rem;
                    }
                    .filter-count-badge {
                        display: none;
                    }
                    .course-img-wrapper {
                        height: 165px;
                    }
                    .course-badge-container {
                        left: 10px;
                        right: 10px;
                        bottom: 10px;
                    }
                    .course-degree-badge {
                        font-size: 0.7rem;
                        padding: 3px 9px;
                    }
                    .course-type-pill {
                        font-size: 0.68rem;
                        padding: 2px 7px;
                    }
                    .course-card-body {
                        padding: 1.1rem 0.95rem;
                    }
                    .course-card-title {
                        font-size: 1.08rem;
                    }
                    .mobile-carousel-controls {
                        max-width: 320px;
                        padding: 6px 10px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ProgramsSection;
