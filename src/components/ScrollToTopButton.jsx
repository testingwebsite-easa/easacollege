import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronUp, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { pathname } = useLocation();

    // Check if we should hide on admin pages or login
    const isAdminPage = pathname.startsWith('/admin') || pathname === '/login';

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('scroll', toggleVisibility);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (isAdminPage) return null;

    return (
        <>
            {/* Scroll To Top Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        title="Scroll to top"
                        style={{
                            position: 'fixed',
                            bottom: isMobile ? '90px' : '30px',
                            right: '25px',
                            width: '50px',
                            height: '50px',
                            borderRadius: '15px',
                            background: 'var(--secondary)',
                            color: 'var(--bg-dark)',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 9999,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(8px)',
                            outline: 'none'
                        }}
                        whileHover={{
                            scale: 1.1,
                            background: 'var(--accent-yellow)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                            y: -5
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaChevronUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Mobile WhatsApp Button */}
            {isMobile && (
                <motion.a
                    href="https://wa.me/918220008082"
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '25px',
                        right: '25px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#25D366',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        zIndex: 9999,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        textDecoration: 'none'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaWhatsapp />
                </motion.a>
            )}
        </>
    );
};

export default ScrollToTopButton;

