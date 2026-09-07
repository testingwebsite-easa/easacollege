import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    FaExpand, FaCompress, FaExternalLinkAlt, FaRedo, FaCube,
    FaCompass, FaBuilding, FaMapMarkedAlt, FaLayerGroup, FaInfoCircle,
    FaLaptopCode, FaCheckCircle
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import GlobalHero from '../components/GlobalHero';

const VirtualTourPage = () => {
    const [tourData, setTourData] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const iframeContainerRef = useRef(null);

    const defaultTourUrl = "https://easa-3d.onrender.com";
    const activeUrl = tourData?.tourUrl || defaultTourUrl;

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/virtual-tour`)
            .then(res => res.json())
            .then(data => {
                if (data && data.tourUrl) {
                    setTourData(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const toggleFullscreen = () => {
        if (!iframeContainerRef.current) return;
        if (!document.fullscreenElement) {
            iframeContainerRef.current.requestFullscreen?.().then(() => {
                setIsFullscreen(true);
            }).catch(err => console.error("Error attempting fullscreen:", err));
        } else {
            document.exitFullscreen?.().then(() => {
                setIsFullscreen(false);
            }).catch(err => console.error("Error exiting fullscreen:", err));
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleReload = () => {
        setIsLoading(true);
        const iframe = document.getElementById('easa-virtual-tour-iframe');
        if (iframe) {
            iframe.src = activeUrl;
        }
    };

    const campusHighlights = [
        {
            title: "Administrative & Main Block",
            desc: "Central admissions, principal's office, boardrooms, and academic administration.",
            icon: <FaBuilding />
        },
        {
            title: "Departmental Labs & Workshops",
            desc: "AICTE IDEA Lab, specialized Centers of Excellence, robotic workbenches, and computer centers.",
            icon: <FaLaptopCode />
        },
        {
            title: "Central Digital Library",
            desc: "35,000+ volumes, IEEE digital access portal, and collaborative study spaces.",
            icon: <FaMapMarkedAlt />
        },
        {
            title: "Sports Complex & Residential Hubs",
            desc: "25-acre lush green campus, athletic track, fitness centers, and student residences.",
            icon: <FaLayerGroup />
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Virtual Campus Tour | EASA College of Engineering and Technology"
                description="Experience the EASA College 3D interactive virtual tour. Walk through our 25-acre campus, world-class laboratories, library, and modern amenities."
            />
            <Navbar />

            <GlobalHero
                pageKey="virtual-tour"
                defaultTitle="Virtual Campus Tour"
                defaultSubtitle={tourData?.description || "Step into our immersive 3D interactive campus environment from anywhere in the world."}
                title="Virtual Campus Tour"
                subtitle="Step into our immersive 3D interactive campus environment from anywhere in the world."
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '3.5rem 1.5rem', flexGrow: 1 }}>

                {/* CONTROLS HEADER BAR */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'rgba(217, 119, 6, 0.15)',
                            color: 'var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            border: '1px solid rgba(217, 119, 6, 0.3)'
                        }}>
                            <FaCube />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                                3D Interactive Campus Walkthrough
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                WebGL Real-time 3D Rendering & 360° Navigation
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <button
                            onClick={handleReload}
                            className="btn-3d"
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-main)',
                                padding: '0.6rem 1.1rem',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}
                            title="Reload Virtual Tour"
                        >
                            <FaRedo /> Reset Tour
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="btn-3d"
                            style={{
                                background: 'rgba(217, 119, 6, 0.15)',
                                border: '1px solid rgba(217, 119, 6, 0.35)',
                                color: 'var(--secondary)',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.85rem',
                                fontWeight: '700'
                            }}
                            title="Toggle Fullscreen"
                        >
                            {isFullscreen ? <FaCompress /> : <FaExpand />} {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        </button>

                        <a
                            href={activeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-3d"
                            style={{
                                background: 'var(--secondary)',
                                color: '#000000',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                            }}
                            title="Open in new window"
                        >
                            <FaExternalLinkAlt size={12} /> Open Full 3D App
                        </a>
                    </div>
                </div>

                {/* 3D IFRAME WRAPPER */}
                <motion.div
                    ref={iframeContainerRef}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="card-3d-subtle"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: isFullscreen ? '100vh' : '78vh',
                        minHeight: isFullscreen ? '100vh' : '650px',
                        background: '#0a0f1d',
                        borderRadius: isFullscreen ? '0' : '24px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(217, 119, 6, 0.15)',
                        border: isFullscreen ? 'none' : '1px solid var(--glass-border)',
                        marginBottom: '3rem'
                    }}
                >
                    {/* LOADING INDICATOR OVERLAY */}
                    {isLoading && (
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(10, 15, 29, 0.95)',
                            zIndex: 10,
                            gap: '1.2rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div className="loading-spinner" style={{ width: '48px', height: '48px', borderWidth: '3px' }} />
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-main)', margin: '0 0 0.3rem 0' }}>
                                    Loading EASA 3D Campus Experience...
                                </p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                                    Fetching 3D geometries, textures, and campus landmarks
                                </p>
                            </div>
                        </div>
                    )}

                    {/* EMBEDDED 3D IFRAME */}
                    <iframe
                        id="easa-virtual-tour-iframe"
                        src={activeUrl}
                        title="EASA College 3D Virtual Tour"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            display: 'block'
                        }}
                        onLoad={() => setIsLoading(false)}
                        allow="fullscreen; accelerometer; gyroscope; spatial-tracking; vr; xr-spatial-tracking"
                        loading="lazy"
                    />

                    {/* NAVIGATION HINT OVERLAY AT BOTTOM */}
                    {!isFullscreen && (
                        <div style={{
                            position: 'absolute',
                            bottom: '15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid var(--glass-border)',
                            padding: '0.45rem 1.2rem',
                            borderRadius: '30px',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            pointerEvents: 'none',
                            zIndex: 5
                        }}>
                            <span><FaCompass style={{ color: 'var(--secondary)' }} /> <strong>Navigation:</strong> Click & Drag to Rotate | Scroll to Zoom | Click Buildings to Inspect</span>
                        </div>
                    )}
                </motion.div>

                {/* 4 HIGHLIGHT CARDS BELOW TOUR */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {campusHighlights.map((hl, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.4 }}
                            className="card-3d-subtle"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem'
                            }}
                        >
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: 'rgba(217, 119, 6, 0.12)',
                                color: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.3rem',
                                flexShrink: 0,
                                border: '1px solid rgba(217, 119, 6, 0.25)'
                            }}>
                                {hl.icon}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                                    {hl.title}
                                </h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                                    {hl.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default VirtualTourPage;
