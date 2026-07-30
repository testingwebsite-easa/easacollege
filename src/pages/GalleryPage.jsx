import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LoadingBar from '../components/LoadingBar';
import { FaTimes, FaArrowLeft, FaCalendarAlt, FaImages, FaChevronRight } from 'react-icons/fa';
import GlobalHero from '../components/GlobalHero';

const GalleryPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/gallery-events`)
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching gallery events:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Photo Gallery | EASA College" description="Explore the vibrant life and events at EASA College through our extensive photo gallery." />
            <Navbar />

            <GlobalHero
                pageKey={selectedEvent ? `gallery-${selectedEvent._id}` : "gallery"}
                defaultTitle={selectedEvent ? selectedEvent.eventName : "Photo Gallery"}
                defaultSubtitle={selectedEvent ? new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Explore the vibrant moments and memories of EASA College."}
                defaultImage={selectedEvent && selectedEvent.photos?.length > 0 ? selectedEvent.photos[0].src : (events.length > 0 && events[0].photos?.length > 0 ? events[0].photos[0].src : null)}
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', position: 'relative', zIndex: 2 }}>

                <AnimatePresence>
                    {selectedEvent && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={() => setSelectedEvent(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.8rem',
                                padding: '0.8rem 1.8rem', fontSize: '1rem', marginBottom: '3.5rem',
                                borderRadius: '12px', background: 'var(--bg-card)',
                                color: 'var(--text-main)', border: '1px solid var(--glass-border)',
                                fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease'
                            }}
                            whileHover={{ background: 'var(--glass-highlight)', scale: 1.05 }}
                        >
                            <FaArrowLeft /> Back to Albums
                        </motion.button>
                    )}
                </AnimatePresence>

                {!selectedEvent ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
                        {events.map((event, index) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -12 }}
                                onClick={() => setSelectedEvent(event)}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>
                                    {event.photos && event.photos.length > 0 ? (
                                        <img
                                            src={event.photos[0].src}
                                            alt={event.eventName}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                                            className="album-cover"
                                        />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', background: 'var(--bg-section)' }}>
                                            <FaImages size={60} style={{ opacity: 0.2 }} />
                                        </div>
                                    )}
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', padding: '0.6rem 1.2rem', borderRadius: '50px', color: 'white', fontSize: '0.9rem', fontWeight: '800', border: '1px solid rgba(255,255,255,0.2)' }}>
                                        {event.photos?.length || 0} Captures
                                    </div>
                                </div>
                                <div style={{ padding: '2.5rem' }}>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.2' }}>{event.eventName}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{ color: 'var(--secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '700' }}>
                                            <FaCalendarAlt /> {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <FaChevronRight style={{ color: 'var(--secondary)' }} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={{ columns: '3 350px', columnGap: '2.5rem' }}>
                        {selectedEvent.photos.map((photo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                onClick={() => setSelectedImage(photo)}
                                style={{
                                    breakInside: 'avoid',
                                    marginBottom: '2.5rem',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                                    border: '1px solid var(--glass-border)'
                                }}
                                whileHover={{ scale: 1.03, y: -5 }}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.caption}
                                    style={{ width: '100%', display: 'block' }}
                                    loading="lazy"
                                />
                                <div style={{
                                    position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)',
                                    opacity: 0, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'flex-end', padding: '2rem'
                                }}
                                    className="photo-overlay"
                                >
                                    <p style={{ color: 'white', fontWeight: '800', fontSize: '1.1rem' }}>{photo.caption || "View Capture"}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{
                                position: 'relative', maxWidth: '90vw', maxHeight: '90vh',
                                borderRadius: '32px', overflow: 'hidden',
                                boxShadow: '0 50px 100px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.caption}
                                style={{ maxWidth: '100%', maxHeight: '90vh', display: 'block' }}
                            />
                            <div style={{ padding: '3rem', background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)', position: 'absolute', bottom: 0, width: '100%', color: 'white' }}>
                                <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>{selectedImage.caption || selectedEvent?.eventName}</h3>
                            </div>

                            <button
                                onClick={() => setSelectedImage(null)}
                                style={{
                                    position: 'absolute', top: '2.5rem', right: '2.5rem',
                                    background: 'rgba(255,255,255,0.15)', color: 'white',
                                    borderRadius: '50%', width: '60px', height: '60px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                    backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.2)',
                                    fontSize: '2rem'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
            <style>{`
                .album-cover:hover { transform: scale(1.1); }
                .photo-overlay:hover { opacity: 1 !important; }
                @media (max-width: 768px) {
                    .container { padding: 3rem 1.5rem !important; }
                    button { width: 100% !important; justify-content: center !important; }
                }
            `}</style>
        </div>
    );
};

export default GalleryPage;
