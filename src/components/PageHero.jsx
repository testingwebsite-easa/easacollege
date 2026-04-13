import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import missionBg from '../assets/mission-bg.png'; // Fallback or default

const PageHero = ({ title, subtitle, backgroundImage = missionBg }) => {
    const { scrollY } = useScroll();

    // Parallax effect for hero text
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div style={{
            position: 'relative',
            height: '100vh', // Full screen height
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
                backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url(${backgroundImage})`,
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
                    padding: '180px 2rem 5rem 2rem', 
                    width: '100%', 
                    maxWidth: '1200px', 
                    y: y1, 
                    opacity 
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <span style={{
                        padding: '0.6rem 0',
                        color: '#F8D53D', // Yellow color as seen in screenshot
                        fontSize: '1rem',
                        fontWeight: '800',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        display: 'block' // Ensure it behaves like a block to allow potential wrapping if needed, but centering comes from parent
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
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: '900',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        letterSpacing: '-2px',
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
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            maxWidth: '700px',
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
