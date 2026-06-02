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

// YouTube API configuration - Replace with your actual API key and Channel ID
const YOUTUBE_API_KEY = 'AIzaSyDtVDkT24cuhIAYj_I5YzeQwBYaFKER2Ng';
const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; // e.g., 'UCxxxxx'
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

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

    // Fetch videos from YouTube API
    useEffect(() => {
        fetchYouTubeVideos();
    }, []);

    const fetchYouTubeVideos = async () => {
        setLoading(true);
        try {
            // Step 1: Get channel's uploads playlist ID
            const channelRes = await fetch(
                `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
            );
            const channelData = await channelRes.json();
            
            if (!channelData.items || channelData.items.length === 0) {
                throw new Error('Channel not found');
            }
            
            const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
            
            // Step 2: Fetch videos from the uploads playlist
            const videosRes = await fetch(
                `${YOUTUBE_API_BASE}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
            );
            const videosData = await videosRes.json();
            
            // Step 3: Extract video IDs for additional stats
            const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
            
            // Step 4: Fetch video statistics (views, likes, etc.)
            const statsRes = await fetch(
                `${YOUTUBE_API_BASE}/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
            );
            const statsData = await statsRes.json();
            
            // Create a map of video stats by video ID
            const statsMap = {};
            statsData.items.forEach(item => {
                statsMap[item.id] = {
                    views: item.statistics.viewCount,
                    likes: item.statistics.likeCount,
                    comments: item.statistics.commentCount,
                    duration: item.contentDetails.duration
                };
            });
            
            // Step 5: Combine and format video data
            const formattedVideos = videosData.items.map(item => {
                const videoId = item.snippet.resourceId.videoId;
                const stats = statsMap[videoId] || {};
                const isShort = isYouTubeShort(item.snippet.title, stats.duration);
                
                return {
                    id: videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    url: `https://www.youtube.com/watch?v=${videoId}`,
                    thumbnail: item.snippet.thumbnails.high.url,
                    mediumThumbnail: item.snippet.thumbnails.medium.url,
                    publishedAt: formatDate(item.snippet.publishedAt),
                    views: stats.views || '0',
                    likes: stats.likes || '0',
                    duration: formatDuration(stats.duration),
                    category: isShort ? 'Shorts' : 'Videos',
                    isShort: isShort
                };
            });
            
            setVideos(formattedVideos);
            extractCategories(formattedVideos);
            
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            // Fallback to local API if YouTube fails
            fetchLocalVideos();
        } finally {
            setLoading(false);
        }
    };
    
    const fetchLocalVideos = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/video-gallery`);
            const data = await res.json();
            
            const formattedData = data.map(item => {
                const ytId = getYouTubeIdFromUrl(item.url);
                return {
                    id: ytId || item._id,
                    title: item.title || 'Untitled',
                    url: item.url,
                    thumbnail: item.thumbnail,
                    category: item.category || 'Videos',
                    publishedAt: formatDate(item.createdAt || new Date()),
                    views: null,
                    duration: null,
                    isShort: false
                };
            });
            
            setVideos(formattedData);
            extractCategories(formattedData);
        } catch (err) {
            console.error('Error fetching local videos:', err);
        } finally {
            setLoading(false);
        }
    };
    
    // Helper: Check if video is a YouTube Short
    const isYouTubeShort = (title, duration) => {
        // Shorts are typically under 60 seconds
        if (duration) {
            const durationSeconds = parseISODuration(duration);
            return durationSeconds <= 60;
        }
        // Also check title for #Shorts
        return title?.toLowerCase().includes('#shorts');
    };
    
    // Helper: Parse ISO 8601 duration (PT1H2M10S format)
    const parseISODuration = (duration) => {
        if (!duration) return 0;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return 0;
        const hours = parseInt(match[1] || 0);
        const minutes = parseInt(match[2] || 0);
        const seconds = parseInt(match[3] || 0);
        return hours * 3600 + minutes * 60 + seconds;
    };
    
    // Helper: Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7) {
            return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months === 1 ? '' : 's'} ago`;
        } else {
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    };
    
    // Helper: Format duration from ISO to readable (e.g., "2:30")
    const formatDuration = (isoDuration) => {
        if (!isoDuration) return null;
        const seconds = parseISODuration(isoDuration);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    // Extract unique categories from videos
    const extractCategories = (videoData) => {
        const cats = ['all', ...new Set(videoData.map(v => v.category).filter(Boolean))];
        setCategories(cats);
    };
    
    // Filter videos based on search and category
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
                            key={`${viewMode}-${selectedCategory}`}
                        >
                            <AnimatePresence mode='popLayout'>
                                {currentVideos.map((video) => (
                                    <VideoCard
                                        key={video.id}
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

// --- Video Card Component ---
const VideoCard = ({ video, viewMode, onPlay, variants }) => {
    const hasValidThumbnail = video.thumbnail && video.thumbnail.length > 5;
    const thumbnailUrl = hasValidThumbnail ? video.thumbnail : `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    
    return (
        <motion.div
            className="video-card-glass"
            variants={variants}
            layout
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
                {video.isShort && (
                    <span className="shorts-badge">#Shorts</span>
                )}
            </div>
            
            <div className="card-content">
                <h3 className="card-title" title={video.title}>{video.title}</h3>
                
                <div className="card-meta">
                    {video.views && (
                        <div className="meta-item">
                            <Eye size={14} />
                            <span>{formatViews(video.views)} views</span>
                        </div>
                    )}
                    {video.publishedAt && (
                        <div className="meta-item">
                            <Calendar size={14} />
                            <span>{video.publishedAt}</span>
                        </div>
                    )}
                </div>
                
                {viewMode === 'list' && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {video.description?.slice(0, 150)}
                        {video.description?.length > 150 && '...'}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

// --- Video Modal Component ---
const VideoModal = ({ video, onClose }) => {
    const videoId = video.id;
    
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
                onClick={(e) => e.stopPropagation()}
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
                <div className="modal-info">
                    <h3>{video.title}</h3>
                    {video.description && <p>{video.description}</p>}
                </div>
                <button className="close-modal-btn" onClick={onClose}>
                    <X size={32} />
                </button>
            </motion.div>
        </motion.div>
    );
};

// --- Utility Functions ---
const getYouTubeIdFromUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const formatViews = (views) => {
    if (!views) return null;
    const numViews = parseInt(views);
    if (numViews >= 1000000) return `${(numViews / 1000000).toFixed(1)}M`;
    if (numViews >= 1000) return `${(numViews / 1000).toFixed(1)}K`;
    return numViews.toString();
};

export default VideoGalleryPage;