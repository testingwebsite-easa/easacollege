import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    FaChevronLeft, 
    FaChevronRight, 
    FaExpand 
} from 'react-icons/fa';

/**
 * Coverflow3D - High-performance 3D Coverflow Carousel
 * Renders center image prominently in focus with left/right images angled in 3D depth space.
 */
const Coverflow3D = ({
    items = [],
    initialIndex = 0,
    onChange,
    onImageClick,
    autoPlay = true,
    interval = 3500,
    aspectRatio = '4/3',
    showThumbs = false,
    showControls = false,
    height = '480px',
    className = ''
}) => {
    // Normalize items to { src, title, caption }
    const normalizedItems = React.useMemo(() => {
        if (!Array.isArray(items)) return [];
        return items.map((it, idx) => {
            if (typeof it === 'string') {
                return { src: it, title: `Capture ${idx + 1}`, caption: '' };
            }
            return {
                src: it.src || it.image || it.url || '',
                title: it.title || it.caption || it.eventName || `Moment ${idx + 1}`,
                caption: it.caption || it.desc || it.description || ''
            };
        }).filter(it => Boolean(it.src));
    }, [items]);

    const total = normalizedItems.length;
    const [currentIndex, setCurrentIndex] = useState(() => {
        if (total === 0) return 0;
        return Math.min(Math.max(0, initialIndex), total - 1);
    });
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);
    const isDragging = useRef(false);

    // Keep currentIndex within bounds if total items change
    useEffect(() => {
        if (total > 0 && currentIndex >= total) {
            setCurrentIndex(0);
        }
    }, [total, currentIndex]);

    // Notify parent on change
    useEffect(() => {
        if (onChange && total > 0) {
            onChange(currentIndex, normalizedItems[currentIndex]);
        }
    }, [currentIndex, normalizedItems, onChange, total]);

    const goTo = useCallback((index) => {
        if (total === 0) return;
        const normalized = (index + total) % total;
        setCurrentIndex(normalized);
    }, [total]);

    const next = useCallback(() => {
        goTo(currentIndex + 1);
    }, [currentIndex, goTo]);

    const prev = useCallback(() => {
        goTo(currentIndex - 1);
    }, [currentIndex, goTo]);

    // Autoplay timer
    useEffect(() => {
        if (!isPlaying || isHovered || total <= 1) return;
        const timer = setInterval(() => {
            next();
        }, interval);
        return () => clearInterval(timer);
    }, [isPlaying, isHovered, total, interval, next]);

    // Keyboard navigation (Left / Right)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (containerRef.current && containerRef.current.contains(document.activeElement)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    next();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prev, next]);

    // Touch & Swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
        isDragging.current = true;
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    const handleTouchEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const threshold = 40; // minimum drag px
        if (touchDeltaX.current < -threshold) {
            next();
        } else if (touchDeltaX.current > threshold) {
            prev();
        }
    };

    // Mouse drag handlers for desktop
    const handleMouseDown = (e) => {
        touchStartX.current = e.clientX;
        touchDeltaX.current = 0;
        isDragging.current = true;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        touchDeltaX.current = e.clientX - touchStartX.current;
    };

    const handleMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const threshold = 50;
        if (touchDeltaX.current < -threshold) {
            next();
        } else if (touchDeltaX.current > threshold) {
            prev();
        }
    };

    if (total === 0) {
        return (
            <div className="coverflow-3d-empty">
                <p>No gallery images to display.</p>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className={`coverflow-3d-root ${className}`}
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                isDragging.current = false;
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* 3D Scene Viewport */}
            <div className="coverflow-stage" style={{ height }}>
                {normalizedItems.map((item, index) => {
                    // Cyclic distance from current active index
                    let diff = index - currentIndex;
                    if (diff > total / 2) diff -= total;
                    if (diff < -total / 2) diff += total;

                    const absDiff = Math.abs(diff);
                    const isCenter = diff === 0;
                    const isVisible = absDiff <= 2;

                    // Compute 3D transforms matching the user's reference image
                    let translateX = '0%';
                    let translateZ = '0px';
                    let rotateY = '0deg';
                    let scale = 1;
                    let opacity = 1;
                    let zIndex = 10;
                    let filter = 'none';

                    if (isCenter) {
                        translateX = '0%';
                        translateZ = '40px';
                        rotateY = '0deg';
                        scale = 1;
                        opacity = 1;
                        zIndex = 10;
                        filter = 'none';
                    } else if (diff === -1) {
                        // Immediate left card
                        translateX = '-48%';
                        translateZ = '-60px';
                        rotateY = '16deg';
                        scale = 0.84;
                        opacity = 0.65;
                        zIndex = 5;
                        filter = 'brightness(0.72) contrast(0.95)';
                    } else if (diff === 1) {
                        // Immediate right card
                        translateX = '48%';
                        translateZ = '-60px';
                        rotateY = '-16deg';
                        scale = 0.84;
                        opacity = 0.65;
                        zIndex = 5;
                        filter = 'brightness(0.72) contrast(0.95)';
                    } else if (diff === -2) {
                        // Far left card
                        translateX = '-88%';
                        translateZ = '-140px';
                        rotateY = '26deg';
                        scale = 0.70;
                        opacity = 0.25;
                        zIndex = 2;
                        filter = 'brightness(0.5)';
                    } else if (diff === 2) {
                        // Far right card
                        translateX = '88%';
                        translateZ = '-140px';
                        rotateY = '-26deg';
                        scale = 0.70;
                        opacity = 0.25;
                        zIndex = 2;
                        filter = 'brightness(0.5)';
                    } else {
                        // Offscreen
                        translateX = diff < 0 ? '-130%' : '130%';
                        translateZ = '-250px';
                        scale = 0.5;
                        opacity = 0;
                        zIndex = 0;
                        filter = 'brightness(0.2)';
                    }

                    return (
                        <div
                            key={index}
                            className={`coverflow-card ${isCenter ? 'is-active' : ''}`}
                            style={{
                                transform: `translate(-50%, -50%) translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                                zIndex,
                                opacity,
                                filter,
                                pointerEvents: isVisible ? 'auto' : 'none',
                                cursor: isCenter ? (onImageClick ? 'zoom-in' : 'default') : 'pointer'
                            }}
                            onClick={() => {
                                if (isCenter) {
                                    if (onImageClick) onImageClick(item, index);
                                } else {
                                    goTo(index);
                                }
                            }}
                        >
                            <div className="coverflow-card-inner" style={{ aspectRatio }}>
                                <img 
                                    src={item.src} 
                                    alt={item.title}
                                    className="coverflow-card-img"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";
                                    }}
                                />

                                {/* Subtle ambient depth shadow inside card */}
                                <div className="coverflow-card-overlay" />

                                {/* Caption & Title Bar */}
                                {isCenter && (item.title || item.caption) && (
                                    <div className="coverflow-card-caption">
                                        <h4 className="coverflow-caption-title">{item.title}</h4>
                                        {item.caption && item.caption !== item.title && (
                                            <p className="coverflow-caption-text">{item.caption}</p>
                                        )}
                                    </div>
                                )}

                                {/* Zoom badge for active card */}
                                {isCenter && onImageClick && (
                                    <button 
                                        type="button" 
                                        className="coverflow-zoom-badge"
                                        aria-label="View Fullscreen"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onImageClick(item, index);
                                        }}
                                    >
                                        <FaExpand size={13} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Floating Chevron Navigation Arrows */}
                <button
                    type="button"
                    className="coverflow-nav-arrow coverflow-prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        prev();
                    }}
                    aria-label="Previous image"
                >
                    <FaChevronLeft size={16} />
                </button>

                <button
                    type="button"
                    className="coverflow-nav-arrow coverflow-next"
                    onClick={(e) => {
                        e.stopPropagation();
                        next();
                    }}
                    aria-label="Next image"
                >
                    <FaChevronRight size={16} />
                </button>
            </div>

            <style>{`
                .coverflow-3d-root {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    margin: 0 auto;
                    user-select: none;
                    outline: none;
                    overflow: hidden;
                    box-sizing: border-box;
                }

                .coverflow-3d-empty {
                    padding: 3rem;
                    text-align: center;
                    color: var(--text-muted);
                    background: var(--bg-card);
                    border-radius: 20px;
                    border: 1px dashed var(--glass-border);
                }

                .coverflow-stage {
                    position: relative;
                    width: 100%;
                    max-width: 100%;
                    perspective: 1200px;
                    perspective-origin: center center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    box-sizing: border-box;
                }

                .coverflow-card {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: min(520px, 78vw);
                    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), 
                                opacity 0.5s ease, 
                                filter 0.5s ease;
                    transform-style: preserve-3d;
                    will-change: transform, opacity, filter;
                    box-sizing: border-box;
                }

                .coverflow-card-inner {
                    position: relative;
                    width: 100%;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #0f172a;
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.65), 
                                0 0 30px rgba(0, 0, 0, 0.25);
                    transition: box-shadow 0.4s ease, border-color 0.4s ease;
                }

                .coverflow-card.is-active .coverflow-card-inner {
                    border-color: rgba(230, 182, 39, 0.5);
                    box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.8), 
                                0 0 35px rgba(230, 182, 39, 0.25);
                }

                .coverflow-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.6s ease;
                }

                .coverflow-card.is-active:hover .coverflow-card-img {
                    transform: scale(1.03);
                }

                .coverflow-card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.15) 50%, transparent 100%);
                    pointer-events: none;
                }

                .coverflow-card-caption {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 2.2rem 1.6rem 1.2rem;
                    color: #ffffff;
                    text-align: left;
                    pointer-events: none;
                    z-index: 4;
                }

                .coverflow-caption-title {
                    font-size: clamp(1.05rem, 2vw, 1.35rem);
                    font-weight: 800;
                    color: #FCCA26;
                    margin: 0 0 0.35rem 0;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
                    line-height: 1.3;
                }

                .coverflow-caption-text {
                    font-size: clamp(0.82rem, 1.4vw, 0.95rem);
                    color: rgba(255, 255, 255, 0.9);
                    margin: 0;
                    line-height: 1.5;
                    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .coverflow-zoom-badge {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(15, 23, 42, 0.75);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    color: #FCCA26;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 5;
                    transition: all 0.25s ease;
                }

                .coverflow-zoom-badge:hover {
                    background: #FCCA26;
                    color: #111827;
                    transform: scale(1.1);
                }

                /* Chevron Navigation Arrows */
                .coverflow-nav-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 25;
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .coverflow-nav-arrow:hover {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    border-color: #FCCA26;
                    transform: translateY(-50%) scale(1.12);
                    box-shadow: 0 10px 30px rgba(27, 42, 107, 0.6);
                }

                .coverflow-prev {
                    left: 20px;
                }

                .coverflow-next {
                    right: 20px;
                }

                /* Bottom Bar */
                .coverflow-bottom-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 600px;
                    margin: 1.25rem auto 0 auto;
                    padding: 8px 18px;
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 50px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
                    gap: 12px;
                    box-sizing: border-box;
                }

                .coverflow-play-toggle {
                    background: var(--glass-highlight);
                    border: 1px solid var(--glass-border);
                    color: var(--text-main);
                    padding: 6px 14px;
                    border-radius: 50px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .coverflow-play-toggle:hover {
                    background: #1B2A6B;
                    color: #FCCA26;
                    border-color: #FCCA26;
                }

                .coverflow-counter {
                    font-size: 0.84rem;
                    color: var(--text-muted);
                    letter-spacing: 0.3px;
                }

                .coverflow-counter strong {
                    color: var(--text-main);
                }

                .coverflow-dots {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .coverflow-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--text-muted);
                    opacity: 0.4;
                    border: none;
                    padding: 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .coverflow-dot.is-active {
                    background: var(--secondary);
                    opacity: 1;
                    width: 18px;
                    border-radius: 10px;
                }

                /* Thumbnail Strip */
                .coverflow-thumb-strip {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    max-width: 800px;
                    margin: 1.2rem auto 0 auto;
                    padding: 6px 12px;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                    box-sizing: border-box;
                }

                .coverflow-thumb-strip::-webkit-scrollbar {
                    display: none;
                }

                .coverflow-thumb-item {
                    width: 65px;
                    height: 48px;
                    flex-shrink: 0;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 2px solid transparent;
                    padding: 0;
                    background: #0f172a;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: all 0.25s ease;
                }

                .coverflow-thumb-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .coverflow-thumb-item:hover {
                    opacity: 0.85;
                    transform: translateY(-2px);
                }

                .coverflow-thumb-item.is-active {
                    opacity: 1;
                    border-color: var(--secondary);
                    box-shadow: 0 4px 14px rgba(230, 182, 39, 0.4);
                    transform: scale(1.08) translateY(-2px);
                }

                /* Responsive Breakpoints */
                @media (max-width: 768px) {
                    .coverflow-card {
                        width: min(340px, 80vw);
                    }
                    .coverflow-card-inner {
                        border-radius: 18px;
                    }
                    .coverflow-nav-arrow {
                        width: 38px;
                        height: 38px;
                    }
                    .coverflow-prev { left: 8px; }
                    .coverflow-next { right: 8px; }
                    .coverflow-bottom-bar {
                        padding: 6px 12px;
                        margin-top: 1rem;
                    }
                    .coverflow-play-label {
                        display: none;
                    }
                    .coverflow-thumb-item {
                        width: 52px;
                        height: 38px;
                    }
                }

                @media (max-width: 480px) {
                    .coverflow-card {
                        width: min(270px, 82vw);
                    }
                    .coverflow-card-inner {
                        border-radius: 16px;
                    }
                    .coverflow-caption-title {
                        font-size: 0.98rem;
                    }
                    .coverflow-caption-text {
                        font-size: 0.78rem;
                    }
                    .coverflow-thumb-strip {
                        gap: 6px;
                    }
                    .coverflow-thumb-item {
                        width: 44px;
                        height: 34px;
                        border-radius: 6px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Coverflow3D;

