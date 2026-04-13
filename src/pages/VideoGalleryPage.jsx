import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Grid, List, LayoutGrid, Play, X,
    ChevronLeft, ChevronRight, Clock, Eye, Calendar, Film
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';
import './VideoGallery.css';

const VideoGalleryPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'compact'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null); // For Modal

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(12);

    // Fetch videos
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/video-gallery`)
            .then(res => res.json())
            .then(data => {
                setVideos(data);
                extractCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Extract unique categories
    const extractCategories = (videoData) => {
        const cats = ['all', ...new Set(videoData.map(v => v.category).filter(Boolean))];
        setCategories(cats);
    };

    // Filter Logic
    const filteredVideos = videos.filter(video => {
        const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
        const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (video.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Pagination Logic
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

    // Grid Classes
    const getGridClass = () => {
        switch (viewMode) {
            case 'list': return 'list-view';
            case 'compact': return 'compact-view';
            default: return 'grid-view';
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 50 }
        }
    };

    return (
        <div className="video-gallery-page">
            <SEO title="Video Gallery" description="Watch highlights of events and campus life at EASA College." />
            <Navbar />

            {/* Impressive Hero Section */}
            <GlobalHero
                pageKey="video-gallery"
                defaultTitle="Video Gallery"
                defaultSubtitle="Experience the energy in motion"
                defaultImage="https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            />

            <div className="gallery-container">
                {/* Custom Glass Controls Bar */}
                <div className="gallery-controls">
                    {/* Search */}
                    <div className="search-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search highlights..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {/* Categories */}
                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            >
                                {category === 'all' ? 'All Videos' : category}
                            </button>
                        ))}
                    </div>

                    {/* View Toggles */}
                    <div className="view-toggles">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                            onClick={() => setViewMode('compact')}
                            title="Compact View"
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            title="List View"
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="gallery-content">
                    <div className="results-meta" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'result' : 'results'}
                    </div>

                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : filteredVideos.length === 0 ? (
                        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                            <Film size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No videos found</h3>
                            <p>Try adjusting your search or filter</p>
                        </div>
                    ) : (
                        <motion.div
                            className={`videos-grid ${getGridClass()}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={`${viewMode}-${selectedCategory}`} // Re-trigger animation on category change
                        >
                            <AnimatePresence mode='popLayout'>
                                {currentVideos.map((video) => (
                                    <VideoCard
                                        key={video._id || video.url} // Use unique ID if available
                                        video={video}
                                        viewMode={viewMode}
                                        onPlay={() => setSelectedVideo(video)}
                                        variants={itemVariants}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {!loading && filteredVideos.length > 0 && (
                        <div className="pagination-container">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="page-btn"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="page-btn"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            {/* Video Modal Player */}
            <AnimatePresence>
                {selectedVideo && (
                    <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Sub Components ---

const VideoCard = ({ video, viewMode, onPlay, variants }) => {
    const videoId = getYouTubeId(video.url);
    const thumbnailUrl = videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` // High quality thumb
        : 'https://via.placeholder.com/640x360?text=No+Thumbnail';

    return (
        <motion.div
            className="video-card-glass"
            variants={variants}
            layout // Smooth layout transitions
        >
            <div className="card-thumbnail-wrapper" onClick={onPlay} style={{ cursor: 'pointer' }}>
                <img src={thumbnailUrl} alt={video.title} className="card-thumbnail" loading="lazy" />
                <div className="play-overlay">
                    <div className="play-icon">
                        <Play size={24} fill="currentColor" />
                    </div>
                </div>
                {video.duration && (
                    <span className="duration-badge">{video.duration}</span>
                )}
            </div>

            <div className="card-content">
                <h3 className="card-title" title={video.title}>{video.title}</h3>

                <div className="card-meta">
                    {/* Only show views if available */}
                    {video.views && (
                        <div className="meta-item">
                            <Eye size={14} />
                            <span>{formatViews(video.views)}</span>
                        </div>
                    )}
                    {video.published && (
                        <div className="meta-item">
                            <Calendar size={14} />
                            <span>{video.published}</span>
                        </div>
                    )}
                </div>

                {viewMode === 'list' && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {video.description}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

const VideoModal = ({ video, onClose }) => {
    const videoId = getYouTubeId(video.url);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
            >
                <div className="video-wrapper">
                    <iframe
                        title={video.title}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <button className="close-modal-btn" onClick={onClose}>
                    <X size={32} />
                </button>
            </motion.div>
        </motion.div>
    );
};

// --- Utilities ---

const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:.*[?&]v=|(?:embed|shorts|live|v)\/))([a-zA-Z0-9_-]{11}).*/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

const formatViews = (views) => {
    if (!views) return null;
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
};

export default VideoGalleryPage;