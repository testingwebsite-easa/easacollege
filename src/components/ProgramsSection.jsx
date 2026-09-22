import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { 
    FaArrowRight, 
    FaGraduationCap, 
    FaChevronLeft, 
    FaChevronRight, 
    FaClock, 
    FaFlask, 
    FaAward, 
    FaCheckCircle 
} from 'react-icons/fa';
import { departments } from '../data/departmentsData';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Prev Arrow
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

// Custom Next Arrow
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
    const sliderRef = useRef(null);

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
                ? (dept.overview.length > 130 ? dept.overview.substring(0, 130) + "..." : dept.overview)
                : "Comprehensive curriculum designed to develop critical engineering thinking and real-world leadership.",
            link: `/department/${dept.id}`,
            image: dept.heroImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
        };
    });

    // Slider settings: loop mode (infinite: true) with 2 minutes gap (120000 ms)
    const settings = {
        dots: true,
        infinite: programsList.length > 3,
        speed: 800,
        slidesToShow: Math.min(3, programsList.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 120000, // 2 minutes auto transition interval (120,000 ms)
        pauseOnHover: true,
        pauseOnFocus: true,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: Math.min(2, programsList.length),
                    slidesToScroll: 1,
                    infinite: programsList.length > 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    infinite: programsList.length > 1
                }
            }
        ]
    };

    return (
        <section className="programs-section" id="courses-offered" style={{ padding: '5rem 1.5rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
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

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--glass-highlight)',
                            padding: '0.6rem 1.6rem',
                            borderRadius: '50px',
                            color: 'var(--secondary)',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '1.2rem',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}
                    >
                        <FaGraduationCap size={16} /> Courses &amp; Programs Offered
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        style={{
                            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                            fontWeight: '900',
                            color: 'var(--text-main)',
                            lineHeight: '1.15',
                            marginBottom: '1.2rem'
                        }}
                    >
                        Programs that <span style={{ color: 'var(--secondary)' }}>inspire.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            fontSize: '1.15rem',
                            color: 'var(--text-muted)',
                            maxWidth: '650px',
                            margin: '0 auto 2.5rem',
                            lineHeight: '1.7'
                        }}
                    >
                        Explore accredited undergraduate and postgraduate degree courses built for futuristic technological leadership and career acceleration.
                    </motion.p>

                    {/* Filter Tabs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="courses-filter-bar"
                    >
                        {[
                            { key: 'ALL', label: 'All Courses' },
                            { key: 'UG', label: 'Undergraduate (UG)' },
                            { key: 'PG', label: 'Postgraduate (PG)' }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveFilter(tab.key)}
                                className={`courses-filter-btn ${activeFilter === tab.key ? 'active' : ''}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Carousel Slider */}
                <div className="courses-carousel-wrapper">
                    <Slider ref={sliderRef} key={activeFilter} {...settings}>
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

                                        <p className="course-card-desc">
                                            {program.description}
                                        </p>

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

            </div>

            {/* Custom Carousel Styles */}
            <style>{`
                .courses-filter-bar {
                    display: inline-flex;
                    gap: 8px;
                    background: var(--bg-card);
                    padding: 6px;
                    border-radius: 50px;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
                    margin-bottom: 2rem;
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
                }

                .courses-filter-btn:hover {
                    color: var(--text-main);
                }

                .courses-filter-btn.active {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    box-shadow: 0 4px 15px rgba(27, 42, 107, 0.35);
                }

                .courses-carousel-wrapper {
                    position: relative;
                    padding: 0 20px 2.5rem 20px;
                }

                .courses-carousel-wrapper .slick-list {
                    margin: 0 -14px;
                    padding: 15px 0 25px 0;
                    overflow: visible;
                }

                .courses-carousel-wrapper .slick-slide {
                    padding: 0 14px;
                    box-sizing: border-box;
                    height: inherit !important;
                }

                .courses-carousel-wrapper .slick-slide > div {
                    height: 100%;
                }

                .course-slide-item {
                    height: 100%;
                    outline: none;
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
                    min-height: 470px;
                    position: relative;
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
                    left: 16px;
                    right: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 2;
                }

                .course-degree-badge {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(8px);
                    color: #1B2A6B;
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 4px 12px;
                    border-radius: 50px;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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
                }

                .course-card-body {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
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
                    margin-bottom: 1rem;
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
                }

                .course-card-desc {
                    font-size: 0.92rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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

                /* Custom Dots */
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

                @media (max-width: 1024px) {
                    .prog-prev-arrow { left: -8px; }
                    .prog-next-arrow { right: -8px; }
                }

                @media (max-width: 768px) {
                    .programs-section {
                        padding: 3.5rem 1rem !important;
                    }
                    .courses-carousel-wrapper {
                        padding: 0 0 2rem 0;
                    }
                    .courses-filter-btn {
                        padding: 0.5rem 1rem;
                        font-size: 0.82rem;
                    }
                    .course-card-inner {
                        min-height: auto;
                    }
                }
            `}</style>
        </section>
    );
};

export default ProgramsSection;

