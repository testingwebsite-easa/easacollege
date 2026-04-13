import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const NotFoundPage = () => {
    return (
        <>
            <SEO
                title="Page Not Found"
                description="The page you are looking for does not exist."
            />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
                <Header />
                <GlobalHero 
                    pageKey="not-found"
                    defaultTitle="404 - Page Not Found"
                    defaultSubtitle="The page you are looking for might have been removed or is temporarily unavailable."
                />
                <main style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '4rem 2rem'
                }}>


                    {/* Abstract Background Shapes */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                top: '10%',
                                left: '10%',
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(230, 182, 39, 0.1) 0%, rgba(26, 31, 75, 0.05) 100%)',
                                filter: 'blur(60px)'
                            }}
                        />
                        <motion.div
                            animate={{
                                y: [0, 30, 0],
                                x: [0, 20, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            style={{
                                position: 'absolute',
                                bottom: '15%',
                                right: '5%',
                                width: '400px',
                                height: '400px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(230, 182, 39, 0.05) 0%, rgba(26, 31, 75, 0.1) 100%)',
                                filter: 'blur(80px)'
                            }}
                        />
                    </div>

                    <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ position: 'relative', zIndex: 11 }}
                        >
                            <p style={{
                                fontSize: '1.2rem',
                                color: 'var(--text-muted)',
                                maxWidth: '600px',
                                margin: '0 auto 3rem',
                                lineHeight: '1.6'
                            }}>
                                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                            </p>

                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(230, 182, 39, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-warning"
                                    style={{
                                        padding: '1rem 3rem',
                                        fontSize: '1.1rem',
                                        borderRadius: '50px',
                                        fontWeight: '700',
                                        color: '#000',
                                        border: 'none'
                                    }}
                                >
                                    BACK TO HOME
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                </main>
                <Footer />
            </div>
        </>
    );
};

export default NotFoundPage;
