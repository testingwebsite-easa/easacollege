import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import missionBg from '../assets/mission-bg.png'; // Fallback or default

const PageHero = ({ title, subtitle, backgroundImage = missionBg }) => {
    const { scrollY } = useScroll();

    // Parallax effect for hero text
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="page-hero" style={{
            position: 'relative',
            minHeight: 'calc(100vh - 160px)',
            height: 'calc(100vh - 160px)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'var(--bg-section)',
        }}>
            {/* Dynamic Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.75)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                zIndex: 0
            }} />

            {/* Animated Grid Pattern Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                opacity: 0.5,
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                zIndex: 0
            }} />

            {/* Content */}
            <motion.div
                style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    textAlign: 'center', 
                    padding: '2rem 1.5rem', 
                    width: '100%', 
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    y: y1, 
                    opacity 
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '0.8rem' }}
                >
                    <span style={{
                        padding: '0.4rem 0',
                        color: '#F8D53D',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        display: 'block'
                    }}>
                        EASA College of Engineering And Technology
                    </span>
                </motion.div>

                <motion.h1
                    className="text-gradient"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                        fontWeight: '900',
                        lineHeight: '1.15',
                        marginBottom: '1rem',
                        letterSpacing: '-1.5px',
                        textShadow: '0 4px 10px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)'
                    }}
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            color: 'var(--text-muted)',
                            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                            maxWidth: '750px',
                            margin: '0 auto',
                            fontWeight: '300',
                            lineHeight: '1.6'
                        }}
                    >
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
};

export default PageHero;
