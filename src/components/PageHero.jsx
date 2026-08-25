import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUniversity, FaAward } from 'react-icons/fa';
import missionBg from '../assets/mission-bg.webp'; // Fallback or default

const PageHero = ({ title, subtitle, backgroundImage = missionBg }) => {
    const { scrollY } = useScroll();
    const heroRef = useRef(null);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    // Parallax effect on scroll
    const yParallax = useTransform(scrollY, [0, 400], [0, 120]);
    const opacityParallax = useTransform(scrollY, [0, 350], [1, 0]);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMouseOffset({ x: x * 20, y: y * 20 });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    return (
        <div
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="page-hero"
            style={{
                position: 'relative',
                minHeight: 'calc(100vh - 160px)',
                height: 'calc(100vh - 160px)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#0a0f1d',
                perspective: '1200px'
            }}
        >
            {/* Dynamic 3D Parallax Background Image */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-5%',
                    left: '-5%',
                    width: '110%',
                    height: '110%',
                    backgroundImage: `linear-gradient(to bottom, rgba(10, 15, 29, 0.85) 0%, rgba(10, 15, 29, 0.75) 60%, #0a0f1d 100%), url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    zIndex: 0,
                    transform: `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px, 0)`
                }}
            />

            {/* Glowing 3D Ambient Orbs */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '10%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(230, 182, 39, 0.18) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 1,
                pointerEvents: 'none',
                transform: `translate3d(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 1.2}px, 0)`
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(45, 44, 122, 0.4) 0%, transparent 70%)',
                filter: 'blur(70px)',
                zIndex: 1,
                pointerEvents: 'none',
                transform: `translate3d(${-mouseOffset.x * 1.2}px, ${-mouseOffset.y * 1.2}px, 0)`
            }} />

            {/* Animated High-Tech Grid Pattern Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                backgroundSize: '45px 45px',
                opacity: 0.6,
                maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* 3D Foreground Content Layer */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '2.5rem 1.5rem',
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    y: yParallax,
                    opacity: opacityParallax,
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${-mouseOffset.y * 0.35}deg) rotateY(${mouseOffset.x * 0.35}deg)`
                }}
            >
                {/* 3D FLOATING INSTITUTION BADGE */}
                <motion.div
                    initial={{ opacity: 0, y: -25, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="hero-3d-badge"
                >
                    <FaUniversity style={{ color: 'var(--secondary)' }} />
                    <span>EASA College of Engineering and Technology • Autonomous</span>
                </motion.div>

                {/* 3D EXTRUDED METALLIC/GLOWING TITLE */}
                <motion.h1
                    className="hero-3d-title"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    {title}
                </motion.h1>

                {/* 3D FROSTED SUBTITLE BOX */}
                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="hero-3d-subtitle-box"
                    >
                        <p style={{ margin: 0 }}>
                            {subtitle}
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default PageHero;
