import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaGraduationCap, FaUniversity, FaRocket, FaMicrochip, FaCheckCircle } from 'react-icons/fa';
import aboutMain from '../assets/about-main.webp';
import Tilt3DCard from './Tilt3DCard';

const AboutSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            tag: "Autonomous Excellence",
            title: "Crafting the Leaders of Tomorrow",
            highlight: "Tomorrow",
            description: "EASA College of Engineering and Technology, located in Coimbatore, is an Autonomous institution dedicated to fostering innovation, cutting-edge research, and technical mastery aligned with global standards.",
            features: [
                { icon: <FaGraduationCap />, title: "Autonomous Curriculum", desc: "Agile, industry-integrated learning modules." },
                { icon: <FaUniversity />, title: "25-Acre Smart Campus", desc: "High-tech research facilities and smart classrooms." }
            ],
            badge: "ESTD. 2008 • 16+ YRS",
            stat: "96% Placement Success"
        },
        {
            tag: "World-Class Labs & R&D",
            title: "Future-Ready Innovation & Incubation",
            highlight: "Innovation",
            description: "Equipped with state-of-the-art Centers of Excellence in Artificial Intelligence, IoT, Robotics, and Renewable Energy to turn student ideas into real-world patented technologies.",
            features: [
                { icon: <FaMicrochip />, title: "Advanced Tech Labs", desc: "AI, Drone Tech, IoT & Embedded Systems." },
                { icon: <FaRocket />, title: "Incubation Center", desc: "Seed funding, mentorship & startup support." }
            ],
            badge: "AI & ROBOTICS HUB",
            stat: "15+ Industry Labs"
        },
        {
            tag: "Corporate Partnerships",
            title: "Bridging Academia with Global Tech",
            highlight: "Global Tech",
            description: "Our dedicated Training & Placement Cell partners with 150+ top multinational corporations, providing continuous bootcamps, mock interviews, and high-paying career opportunities.",
            features: [
                { icon: <FaRocket />, title: "150+ Recruiters", desc: "TCS, Infosys, Wipro, Cognizant, Zoho & more." },
                { icon: <FaCheckCircle />, title: "Highest 12 LPA", desc: "Consistently rising career packages." }
            ],
            badge: "TOP RECRUITERS",
            stat: "150+ Hiring Partners"
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const handleDragEnd = (event, info) => {
        if (info.offset.x < -40) {
            nextSlide();
        } else if (info.offset.x > 40) {
            prevSlide();
        }
    };

    const slide = slides[currentSlide];

    return (
        <section style={{ padding: '5rem 2rem', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'var(--secondary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '300px', height: '300px', background: 'var(--primary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(80px)' }} />

            <div
                className="about-container"
                style={{
                    maxWidth: '1250px',
                    margin: '0 auto',
                    background: 'var(--bg-card)',
                    borderRadius: '40px',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.06)',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden'
                }}
            >
                {/* TOP SWIPEABLE TAB CONTROLLER */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--glass-border)',
                    padding: '1.2rem 2.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {slides.map((s, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                style={{
                                    padding: '0.55rem 1.3rem',
                                    borderRadius: '30px',
                                    fontSize: '0.85rem',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    border: currentSlide === idx ? '1px solid var(--secondary)' : '1px solid transparent',
                                    background: currentSlide === idx ? 'rgba(230, 182, 39, 0.15)' : 'rgba(255,255,255,0.03)',
                                    color: currentSlide === idx ? 'var(--secondary)' : 'var(--text-muted)',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentSlide === idx ? 'var(--secondary)' : 'rgba(255,255,255,0.2)' }} />
                                {s.tag}
                            </button>
                        ))}
                    </div>

                    {/* SWIPE NAVIGATION CONTROLS */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-main)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: '0.2s'
                            }}
                        >
                            <FaArrowLeft size={13} />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: 'var(--secondary)',
                                border: 'none',
                                color: 'var(--bg-dark)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: '0.2s',
                                boxShadow: '0 4px 15px rgba(230, 182, 39, 0.3)'
                            }}
                        >
                            <FaArrowRight size={13} />
                        </button>
                    </div>
                </div>

                {/* SWIPEABLE / DRAGGABLE CONTENT CONTAINER */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: 'grab', padding: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 25 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -25 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="about-grid"
                        >
                            {/* Left Text Content */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
                                    <FaUniversity /> {slide.tag}
                                </div>
                                <h2 className="about-title" style={{ fontSize: 'clamp(2.3rem, 4vw, 3.4rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.15', marginBottom: '1.5rem' }}>
                                    {slide.title.replace(slide.highlight, '')}
                                    <span style={{ color: 'var(--secondary)' }}>{slide.highlight}</span>
                                </h2>
                                <p className="about-description" style={{ fontSize: '1.15rem', lineHeight: '1.85', color: 'var(--text-muted)', marginBottom: '2.2rem' }}>
                                    {slide.description}
                                </p>
                                <div className="about-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    {slide.features.map((feat, fIdx) => (
                                        <div key={fIdx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                            <div style={{ minWidth: '44px', height: '44px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.2rem', flexShrink: 0 }}>
                                                {feat.icon}
                                            </div>
                                            <div>
                                                <h4 style={{ color: 'var(--text-main)', fontWeight: '800', fontSize: '1rem', margin: 0 }}>{feat.title}</h4>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px', lineHeight: '1.4' }}>{feat.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => window.location.href = '/institution'}
                                        style={{ padding: '1.1rem 2.4rem', background: 'var(--secondary)', color: 'var(--bg-dark)', border: 'none', borderRadius: '50px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 12px 25px rgba(230, 182, 39, 0.25)' }}
                                        className="about-btn"
                                    >
                                        Explore Our Institution <FaArrowRight size={14} />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Right 3D Visual Card */}
                            <div className="about-image-wrapper" style={{ position: 'relative' }}>
                                <Tilt3DCard
                                    maxTilt={6}
                                    glareOpacity={0.18}
                                    style={{
                                        borderRadius: '30px',
                                        overflow: 'hidden',
                                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                                        border: '1px solid var(--glass-border)',
                                        position: 'relative'
                                    }}
                                >
                                    <img
                                        src={aboutMain}
                                        alt="EASA College Campus"
                                        className="about-image"
                                        style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '25px',
                                        left: '25px',
                                        right: '25px',
                                        transform: 'translateZ(25px)'
                                    }}>
                                        <div style={{
                                            background: 'rgba(15, 23, 42, 0.85)',
                                            backdropFilter: 'blur(16px)',
                                            borderRadius: '20px',
                                            padding: '1.4rem',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>{slide.badge}</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: 'white', marginTop: '2px' }}>{slide.stat}</div>
                                            </div>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: 'rgba(230, 182, 39, 0.2)',
                                                color: 'var(--secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1rem'
                                            }}>
                                                <FaArrowRight />
                                            </div>
                                        </div>
                                    </div>
                                </Tilt3DCard>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>

            <style>{`
                .about-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 4rem; align-items: center; }
                
                @media (max-width: 1024px) {
                    .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                    .about-image { height: 360px !important; }
                }

                @media (max-width: 768px) {
                    .about-features { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
                    .about-description { font-size: 1.05rem !important; }
                    .about-title { font-size: 2.1rem !important; }
                }
            `}</style>
        </section>
    );
};

export default AboutSection;
