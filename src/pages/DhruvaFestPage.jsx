import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from '../components/LoadingBar';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import Coverflow3D from '../components/Coverflow3D';
import { FaTimes, FaCalendarAlt, FaMusic } from 'react-icons/fa';

// Fallback high-res fest events data if API is loading or offline
const DEFAULT_FEST_PAGE = {
    title: "DHRUVA 2026 & SARVAM",
    subtitle: "The Ultimate Inter-Collegiate Cultural, Arts & Tech Extravaganza at EASA College",
    heroImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    events: [
        {
            title: "Pro Show & Celebrity Night",
            description: "Electrifying live musical concerts and celebrity performances under the starlit quadrangle.",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop"
            ]
        },
        {
            title: "Choreonite & Western Dance War",
            description: "Synchronized beats, acrobatic stunts, and jaw-dropping dance crew face-offs.",
            image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop"
            ]
        },
        {
            title: "Battle of the Bands",
            description: "High-voltage guitar riffs, heavy percussion, and soaring vocals competing for the championship trophy.",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop"
            ]
        },
        {
            title: "Traditional Procession & Chenda Melam",
            description: "Grand cultural opening with traditional caparisoned regalia, thalapoli, and thunderous beats echoing across campus.",
            image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
            images: [
                "https://images.unsplash.com/photo-1609137144822-411394f9d02d?q=80&w=1200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"
            ]
        }
    ]
};

const EventGallery = ({ event, onSelectImage }) => {
    // Flatten images for this event into Coverflow items
    const items = React.useMemo(() => {
        const list = [];
        if (event.image) {
            list.push({
                src: event.image,
                title: event.title,
                caption: event.description || ''
            });
        }
        if (Array.isArray(event.images)) {
            event.images.forEach((img, i) => {
                const src = typeof img === 'string' ? img : (img?.url || img?.src || '');
                if (src && src !== event.image) {
                    list.push({
                        src,
                        title: `${event.title} - Moment ${i + 1}`,
                        caption: event.description || ''
                    });
                }
            });
        }
        return list;
    }, [event]);

    return (
        <div className="fest-gallery-card" style={{ marginBottom: '4.5rem' }}>
            {/* Header info */}
            <div className="fest-gallery-head">
                <div className="fest-gallery-head-left">
                    <span className="fest-badge-pill">
                        DHRUVA SPECIAL SHOWCASE
                    </span>
                    <h3 className="fest-event-heading">{event.title}</h3>
                    {event.description && (
                        <p className="fest-event-desc">{event.description}</p>
                    )}
                </div>
                <div className="fest-gallery-head-right">
                    <span className="fest-captures-count">
                        {items.length} 3D Captures
                    </span>
                </div>
            </div>

            {/* 3D Coverflow Carousel */}
            <div className="fest-coverflow-box">
                <Coverflow3D
                    items={items}
                    height="450px"
                    autoPlay={true}
                    interval={3800}
                    onImageClick={(item) => onSelectImage(item)}
                />
            </div>
        </div>
    );
};

const DhruvaFestPage = () => {
    const slug = 'fest';
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(DEFAULT_FEST_PAGE);
    const [events, setEvents] = useState(DEFAULT_FEST_PAGE.events);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const pageRes = await fetch(`${API_BASE_URL}/api/fest-page`);
                if (pageRes.ok) {
                    const pData = await pageRes.json();
                    if (isMounted && pData) {
                        setPageData(pData);
                        if (Array.isArray(pData.events) && pData.events.length > 0) {
                            setEvents(pData.events);
                        } else {
                            setEvents(DEFAULT_FEST_PAGE.events);
                        }
                    }
                    return;
                }
            } catch (err) {
                console.warn("Fest API unavailable, using rich default fest data:", err);
            }
            if (isMounted) {
                setPageData(DEFAULT_FEST_PAGE);
                setEvents(DEFAULT_FEST_PAGE.events);
            }
        };

        fetchData().finally(() => {
            if (isMounted) setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    if (loading) return <LoadingBar />;

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative', overflowX: 'hidden' }}>
            <SEO 
                title={`${pageData.title || "Dhruva Fest"} | EASA College`} 
                description={pageData.subtitle || "Experience the vibrant celebrations of Dhruva Fest at EASA College."} 
                image={pageData.heroImage || DEFAULT_FEST_PAGE.heroImage} 
            />
            <Navbar />

            <GlobalHero
                pageKey={slug}
                defaultTitle={pageData.title || DEFAULT_FEST_PAGE.title}
                defaultSubtitle={pageData.subtitle || DEFAULT_FEST_PAGE.subtitle}
                defaultImage={pageData.heroImage || DEFAULT_FEST_PAGE.heroImage}
                minHeight="60vh"
            />

            <div className="container fest-content-container">
                {/* Section Introduction */}
                <div className="fest-intro-banner">
                    <span className="fest-sub-tag">ANNUAL CELEBRATIONS</span>
                    <h2 className="fest-main-title">Dhruva 3D Experience & Gallery</h2>
                    <p className="fest-main-subtitle">
                        Immerse yourself in high-energy moments from Coimbatore's premier collegiate festival. Swipe through our interactive 3D galleries below.
                    </p>
                </div>

                {/* Event 3D Coverflow Galleries */}
                <div className="fest-events-stack">
                    {events.map((event, index) => (
                        <EventGallery 
                            key={index} 
                            event={event} 
                            onSelectImage={(item) => setSelectedImage(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Fullscreen Photo Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fest-lightbox-overlay"
                    onClick={() => setSelectedImage(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fest-lightbox-backdrop" />
                    <div className="fest-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
                        <button 
                            type="button" 
                            className="fest-lightbox-close" 
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close Lightbox"
                        >
                            <FaTimes size={16} />
                        </button>
                        <div className="fest-lightbox-media-wrap">
                            <img 
                                src={selectedImage.src || selectedImage.image} 
                                alt={selectedImage.title || "Fest Moment"} 
                                className="fest-lightbox-img" 
                            />
                        </div>
                        <div className="fest-lightbox-caption-bar">
                            <h3>{selectedImage.title}</h3>
                            {selectedImage.caption && <p>{selectedImage.caption}</p>}
                        </div>
                    </div>
                </div>
            )}

            <Footer />

            <style>{`
                .fest-content-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4.5rem 1.5rem;
                }

                .fest-intro-banner {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto 4rem auto;
                }

                .fest-sub-tag {
                    display: inline-block;
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: var(--secondary);
                    margin-bottom: 0.75rem;
                    background: rgba(230, 182, 39, 0.12);
                    padding: 6px 16px;
                    border-radius: 50px;
                    border: 1px solid rgba(230, 182, 39, 0.25);
                }

                .fest-main-title {
                    font-size: clamp(2rem, 3.5vw, 3rem);
                    font-weight: 900;
                    color: var(--text-main);
                    margin: 0 0 1rem 0;
                    text-transform: uppercase;
                    letter-spacing: -0.5px;
                }

                .fest-main-subtitle {
                    font-size: clamp(0.95rem, 1.6vw, 1.15rem);
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin: 0;
                }

                .fest-gallery-card {
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 28px;
                    padding: 2.2rem;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
                    transition: border-color 0.3s ease;
                }

                .fest-gallery-card:hover {
                    border-color: rgba(230, 182, 39, 0.3);
                }

                .fest-gallery-head {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid var(--glass-border);
                }

                .fest-gallery-head-left {
                    flex: 1;
                    min-width: 260px;
                }

                .fest-badge-pill {
                    display: inline-block;
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    color: #FCCA26;
                    margin-bottom: 0.4rem;
                }

                .fest-event-heading {
                    font-size: clamp(1.4rem, 2.5vw, 2rem);
                    font-weight: 800;
                    color: var(--text-main);
                    margin: 0 0 0.5rem 0;
                }

                .fest-event-desc {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    margin: 0;
                    max-width: 700px;
                    line-height: 1.5;
                }

                .fest-captures-count {
                    font-size: 0.82rem;
                    font-weight: 700;
                    padding: 6px 14px;
                    border-radius: 50px;
                    background: var(--glass-highlight);
                    border: 1px solid var(--glass-border);
                    color: var(--text-muted);
                    display: inline-flex;
                    align-items: center;
                }

                .fest-coverflow-box {
                    width: 100%;
                    max-width: 100%;
                    overflow: hidden;
                    box-sizing: border-box;
                }

                /* Lightbox Modal */
                .fest-lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .fest-lightbox-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(8, 12, 22, 0.92);
                    backdrop-filter: blur(12px);
                }

                .fest-lightbox-dialog {
                    position: relative;
                    max-width: 950px;
                    width: 100%;
                    max-height: 90vh;
                    background: #0f172a;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 35px 80px rgba(0, 0, 0, 0.8);
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    animation: festFadeZoomIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                @keyframes festFadeZoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.92);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .fest-lightbox-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 20;
                    transition: all 0.25s ease;
                }

                .fest-lightbox-close:hover {
                    background: #EF4444;
                    color: #ffffff;
                    transform: scale(1.1);
                }

                .fest-lightbox-media-wrap {
                    position: relative;
                    width: 100%;
                    max-height: 68vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000000;
                    overflow: hidden;
                }

                .fest-lightbox-img {
                    max-width: 100%;
                    max-height: 68vh;
                    object-fit: contain;
                    display: block;
                }

                .fest-lightbox-caption-bar {
                    padding: 1.25rem 1.8rem;
                    background: #0f172a;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    color: #ffffff;
                }

                .fest-lightbox-caption-bar h3 {
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: #FCCA26;
                    margin: 0 0 0.35rem 0;
                }

                .fest-lightbox-caption-bar p {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin: 0;
                    line-height: 1.4;
                }

                @media (max-width: 768px) {
                    .fest-content-container {
                        padding: 3rem 1rem;
                    }
                    .fest-gallery-card {
                        padding: 1.25rem;
                        border-radius: 20px;
                    }
                    .fest-lightbox-overlay {
                        padding: 0.75rem;
                    }
                    .fest-lightbox-dialog {
                        border-radius: 18px;
                    }
                }
            `}</style>
        </div>
    );
};

export default DhruvaFestPage;
