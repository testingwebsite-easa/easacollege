import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import {
    FaTimes,
    FaArrowLeft,
    FaCalendarAlt,
    FaImages,
    FaChevronRight,
    FaPlay,
    FaYoutube,
    FaInstagram,
    FaSearch,
    FaExternalLinkAlt,
    FaVideo,
    FaClock,
    FaBolt,
    FaEye,
    FaShareAlt,
    FaChevronLeft,
    FaHeart,
    FaRegHeart,
    FaComment,
    FaBookmark,
    FaMapMarkerAlt,
    FaCheckCircle
} from 'react-icons/fa';

// Official Social Channels
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/easacollege/";
const INSTAGRAM_REELS_URL = "https://www.instagram.com/easacollege/reels/";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@EASACollegeOfficial";

// ==========================================
// 1. CURATED INSTAGRAM POSTS (PHOTOS SESSION)
// ==========================================
const OFFICIAL_INSTAGRAM_POSTS = [
    {
        _id: "ig-post-001",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
        likes: "1,248",
        comments: "86",
        caption: "Golden hour over the 25-acre green EASA campus! 🌿🏛️ Welcoming our new engineering cohort for academic year 2026. #EASACollege #CampusLife #EngineeringCoimbatore #GreenCampus",
        date: "2 DAYS AGO",
        location: "EASA College of Engineering and Technology, Coimbatore",
        url: "https://www.instagram.com/easacollege/"
    },
    {
        _id: "ig-post-002",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
        likes: "2,840",
        comments: "194",
        caption: "DHRUVA 2026 was pure electricity! 🎸✨ Huge shoutout to everyone who made the pro-show and cultural competitions unforgettable! #DHRUVA2026 #EASAFest #CollegeVibes #Culturals",
        date: "5 DAYS AGO",
        location: "EASA Open Air Auditorium",
        url: "https://www.instagram.com/easacollege/"
    },
    {
        _id: "ig-post-003",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        likes: "1,890",
        comments: "112",
        caption: "Proud moment! Placement drive 2026 crosses 94% conversion rate with top offers from Amazon, Zoho, and Bosch! 💼🎉 #EASAPlacements #EngineeringCareers #CampusHiring #FutureReady",
        date: "1 WEEK AGO",
        location: "EASA Placement Cell",
        url: "https://www.instagram.com/easacollege/"
    },
    {
        _id: "ig-post-004",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
        likes: "1,420",
        comments: "64",
        caption: "Building humanoid prototypes and autonomous bots at our AICTE IDEA Lab! 🤖💡 Real-time engineering innovation at work. #IDEALab #Robotics #AICTE #EASATech",
        date: "2 WEEKS AGO",
        location: "AICTE IDEA Lab, ECET",
        url: "https://www.instagram.com/easacollege/"
    },
    {
        _id: "ig-post-005",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
        likes: "1,680",
        comments: "98",
        caption: "Champions on and off the field! ⚽🏆 Our athletes secured 8 Gold and 5 Silver medals at the Anna University Athletics Zone Meet. #EASASports #Athletes #Champions #CollegeSports",
        date: "3 WEEKS AGO",
        location: "EASA Sports Complex",
        url: "https://www.instagram.com/easacollege/"
    },
    {
        _id: "ig-post-006",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
        likes: "3,120",
        comments: "240",
        caption: "Caps in the air, dreams in motion! 🎓 Celebrating our 16th Graduation Ceremony. Congratulations to all university gold medalists and graduates! #GraduationDay #EASAAlumni #ClassOf2026",
        date: "1 MONTH AGO",
        location: "EASA Main Auditorium",
        url: "https://www.instagram.com/easacollege/"
    }
];

// ==========================================
// 2. CURATED INSTAGRAM REELS (VIDEOS SESSION)
// ==========================================
const OFFICIAL_INSTAGRAM_REELS = [
    {
        _id: "ig-reel-001",
        mediaType: "instagram_reel",
        isShort: true,
        title: "DHRUVA 2026 Concert Crowd Energy Going Wild! 🎸🔥",
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Original Audio - easacollege",
        views: "54.8K",
        likes: "4.2K",
        date: "March 2026",
        category: "Culturals",
        caption: "When the bass drops at DHRUVA! Over 3,000 students vibing together at EASA College 🎶 #DHRUVA #Reels #CampusVibes",
        url: "https://www.instagram.com/easacollege/reels/"
    },
    {
        _id: "ig-reel-002",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Inside the AICTE IDEA Lab 3D Printing Station 🤖✨",
        thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Tech Beats - Innovation Hub",
        views: "38.2K",
        likes: "2.9K",
        date: "March 2026",
        category: "Tech & Labs",
        caption: "Precision 3D printing in action! Our students creating drone chassis in the IDEA Lab. #TechReels #Robotics #Engineering",
        url: "https://www.instagram.com/easacollege/reels/"
    },
    {
        _id: "ig-reel-003",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Campus Tour in 30 Seconds! Green & High-Tech 🌴🏢",
        thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Trending Summer - easacollege",
        views: "72.4K",
        likes: "6.1K",
        date: "February 2026",
        category: "Campus Life",
        caption: "Take a fast drone ride through classrooms, cafeteria, and sports grounds of EASA College Coimbatore! #CampusTour #CollegeLife",
        url: "https://www.instagram.com/easacollege/reels/"
    },
    {
        _id: "ig-reel-004",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Placement Celebration: 24 LPA Dream Package Secured! 🎉💼",
        thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Celebration Beat - Success",
        views: "64.1K",
        likes: "5.4K",
        date: "February 2026",
        category: "Placements",
        caption: "Big cheers for our final year star securing the highest CTC at the 2026 recruitment drive! #Placements #SuccessStory",
        url: "https://www.instagram.com/easacollege/reels/"
    },
    {
        _id: "ig-reel-005",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Championship Winning Last-Minute Goal! ⚽🏆",
        thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Stadium Roar - Sports",
        views: "41.9K",
        likes: "3.7K",
        date: "January 2026",
        category: "Sports",
        caption: "Unreal strike to seal the zonal football trophy for EASA College! #Football #Goal #CollegeChampions",
        url: "https://www.instagram.com/easacollege/reels/"
    },
    {
        _id: "ig-reel-006",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Hackathon Midnight 3:00 AM Coding Energy 💻⚡",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Lo-Fi Beats - Code Grind",
        views: "49.3K",
        likes: "4.1K",
        date: "January 2026",
        category: "Tech & Labs",
        caption: "36 hours of non-stop code, debug, and pizza at the EASA National AI Hackathon! #Hackathon #DevLife #Coding",
        url: "https://www.instagram.com/easacollege/reels/"
    }
];

// ==========================================
// 3. OFFICIAL YOUTUBE VIDEOS & SHORTS
// ==========================================
const OFFICIAL_YOUTUBE_MEDIA = [
    {
        _id: "yt-vid-001",
        youtubeId: "Tm1CpLgk964",
        mediaType: "youtube_video",
        isShort: false,
        title: "Why choose between sports & studies when you can have both? 🤩",
        category: "Campus Life",
        date: "2025-03-26",
        duration: "4:15",
        views: "18.4K",
        desc: "At EASA Engineering College, we promote all-round excellence—from tech innovations to sports domination! Explore admissions, facilities, and campus culture.",
        thumbnail: "https://i.ytimg.com/vi/Tm1CpLgk964/maxresdefault.jpg"
    },
    {
        _id: "yt-vid-002",
        youtubeId: "AS3VAaOuEaw",
        mediaType: "youtube_video",
        isShort: false,
        title: "Life at EASA (BTS Video) - Student Experience & Innovation",
        category: "Campus Life",
        date: "2025-03-21",
        duration: "3:40",
        views: "22.6K",
        desc: "A sneak peek into what makes EASA the ultimate student experience! Relive behind-the-scenes moments, student clubs, labs, and celebrations.",
        thumbnail: "https://i.ytimg.com/vi/AS3VAaOuEaw/maxresdefault.jpg"
    },
    {
        _id: "yt-vid-003",
        youtubeId: "rgP7qrQKkXQ",
        mediaType: "youtube_video",
        isShort: false,
        title: "CRM, Career, & The Future – A Deep Dive into Salesforce!",
        category: "Tech & Labs",
        date: "2025-03-21",
        duration: "5:20",
        views: "14.8K",
        desc: "The Department of CSE conducted an engaging seminar on Salesforce & CRM Software for career advancement and enterprise cloud computing.",
        thumbnail: "https://i.ytimg.com/vi/rgP7qrQKkXQ/maxresdefault.jpg"
    },
    {
        _id: "yt-vid-004",
        youtubeId: "GD8XrKoYoUI",
        mediaType: "youtube_video",
        isShort: false,
        title: "ECET Republic Day Celebrations - Freedom & Fervour at EASA College",
        category: "Fests & Events",
        date: "2025-01-27",
        duration: "6:10",
        views: "16.2K",
        desc: "Relive energetic flag unfurling, cultural performances, and inspiring speeches celebrating unity and pride at EASA College.",
        thumbnail: "https://i.ytimg.com/vi/GD8XrKoYoUI/maxresdefault.jpg"
    },
    {
        _id: "yt-vid-005",
        youtubeId: "6MKVAHS3uE0",
        mediaType: "youtube_video",
        isShort: false,
        title: "ECET Republic Day - Celebrating India's Diversity & Heritage",
        category: "Fests & Events",
        date: "2025-01-26",
        duration: "4:50",
        views: "12.5K",
        desc: "Nurturing future engineering leaders who contribute to building a stronger and self-reliant nation.",
        thumbnail: "https://i.ytimg.com/vi/6MKVAHS3uE0/maxresdefault.jpg"
    },
    {
        _id: "yt-vid-006",
        youtubeId: "sIYdI7o8Pok",
        mediaType: "youtube_video",
        isShort: false,
        title: "ECET Seminar on Innovation & Entrepreneurship with EDII & MSME",
        category: "Tech & Labs",
        date: "2025-01-25",
        duration: "7:30",
        views: "11.1K",
        desc: "Fostering Innovation and Entrepreneurship at EASA College campus empowering young minds with valuable insights through EDII and MSME schemes.",
        thumbnail: "https://i.ytimg.com/vi/sIYdI7o8Pok/maxresdefault.jpg"
    }
];

const GalleryPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Active Gallery View: 'photos' or 'videos'
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabParam === 'videos' ? 'videos' : 'photos');

    // Photos Session: 'instagram' or 'albums'
    const [photosSubView, setPhotosSubView] = useState('instagram'); // 'instagram' | 'albums'
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});

    // Videos Session State: 'ALL' | 'REELS' | 'YOUTUBE'
    const [videoMediaFilter, setVideoMediaFilter] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedReel, setSelectedReel] = useState(null);

    // Synchronize tab state with query param
    useEffect(() => {
        if (tabParam === 'videos' && activeTab !== 'videos') {
            setActiveTab('videos');
        } else if ((!tabParam || tabParam === 'photos') && activeTab !== 'photos') {
            setActiveTab('photos');
        }
    }, [tabParam]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedEvent(null);
        setSearchParams({ tab });
    };

    // Fetch Photo Albums
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`${API_BASE_URL}/api/gallery-events`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setEvents(data);
                }
            })
            .catch(err => {
                console.error("Error fetching gallery events:", err);
            });
    }, []);

    // Lock body scroll when any modal is open
    useEffect(() => {
        if (selectedImage || selectedVideo || selectedReel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage, selectedVideo, selectedReel]);

    // Toggle Instagram Post Like Heart Animation
    const toggleLikePost = (postId) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    // Filtered Videos & Reels
    const combinedVideoMedia = [
        ...OFFICIAL_INSTAGRAM_REELS,
        ...OFFICIAL_YOUTUBE_MEDIA
    ];

    const filteredVideoMedia = combinedVideoMedia.filter(item => {
        const matchesType =
            videoMediaFilter === 'ALL' ||
            (videoMediaFilter === 'REELS' && item.mediaType === 'instagram_reel') ||
            (videoMediaFilter === 'YOUTUBE' && item.mediaType === 'youtube_video');

        const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;

        const matchesSearch =
            searchQuery.trim() === '' ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesType && matchesCat && matchesSearch;
    });

    const videoCategories = ['ALL', ...new Set(combinedVideoMedia.map(v => v.category).filter(Boolean))];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title={activeTab === 'videos' ? "Official Video Gallery, Reels & YouTube | EASA College" : "Instagram Posts & Photo Gallery | EASA College"}
                description="Explore EASA College campus life with official Instagram posts, Instagram reels, photo albums, and YouTube highlights."
            />
            <Navbar />

            <GlobalHero
                pageKey={selectedEvent ? `gallery-${selectedEvent._id}` : (activeTab === 'videos' ? "video-gallery" : "gallery")}
                defaultTitle={selectedEvent ? selectedEvent.eventName : (activeTab === 'videos' ? "Reels & Video Gallery" : "Instagram Posts & Photos")}
                defaultSubtitle={selectedEvent
                    ? new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    : (activeTab === 'videos'
                        ? "Watch Instagram Reels, student shorts, and official YouTube broadcasts from @easacollege & @EASACollegeOfficial."
                        : "Experience campus moments and student life through our official Instagram feed @easacollege.")}
                defaultImage={selectedEvent && selectedEvent.photos?.length > 0
                    ? selectedEvent.photos[0].src
                    : OFFICIAL_INSTAGRAM_POSTS[0].image}
            />

            <div className="gallery-main-container">

                {/* 1. TOP SEGMENTED TAB SWITCHER (PHOTOS / VIDEOS) */}
                <div className="gallery-tab-switcher-wrap">
                    <div className="gallery-pill-nav">
                        <button
                            type="button"
                            onClick={() => handleTabChange('photos')}
                            className={`gallery-nav-pill insta-pill ${activeTab === 'photos' ? 'active' : ''}`}
                        >
                            <FaInstagram className="pill-icon ig-gradient-icon" />
                            <span>Instagram Posts & Photos</span>
                            <span className="pill-badge ig-badge">{OFFICIAL_INSTAGRAM_POSTS.length}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabChange('videos')}
                            className={`gallery-nav-pill reels-pill ${activeTab === 'videos' ? 'active' : ''}`}
                        >
                            <FaVideo className="pill-icon reels-icon" />
                            <span>Instagram Reels & Videos</span>
                            <span className="pill-badge reels-badge">{combinedVideoMedia.length}</span>
                        </button>
                    </div>
                </div>

                {/* =========================================================
                    PHOTOS SESSION: INSTAGRAM POSTS & PHOTO ALBUMS
                   ========================================================= */}
                {activeTab === 'photos' && (
                    <div className="photos-session-content">

                        {/* INSTAGRAM PROFILE SPOTLIGHT HEADER */}
                        <div className="instagram-profile-banner">
                            <div className="ig-banner-backdrop" />
                            <div className="ig-banner-content">
                                <div className="ig-avatar-ring">
                                    <img
                                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop"
                                        alt="EASA College"
                                        className="ig-avatar-img"
                                    />
                                </div>

                                <div className="ig-profile-info">
                                    <div className="ig-handle-row">
                                        <h2 className="ig-handle-text">easacollege</h2>
                                        <FaCheckCircle className="ig-verified-icon" title="Verified College Profile" />
                                        <span className="ig-official-tag">Official Feed</span>
                                    </div>
                                    <h3 className="ig-fullname">EASA College of Engineering and Technology</h3>
                                    <p className="ig-bio">
                                        🎓 Top Autonomous Engineering College in Coimbatore <br />
                                        💡 AICTE IDEA Lab • High Placements • Vibrant Campus Life
                                    </p>
                                </div>

                                <div className="ig-action-col">
                                    <a
                                        href={INSTAGRAM_PROFILE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ig-follow-btn"
                                    >
                                        <FaInstagram size={17} />
                                        <span>Follow on Instagram</span>
                                        <FaExternalLinkAlt size={10} style={{ marginLeft: '4px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* SUB-VIEW SWITCHER: INSTAGRAM POSTS vs ALBUMS */}
                        <div className="photos-sub-switcher-row">
                            <div className="sub-switcher-group">
                                <button
                                    type="button"
                                    onClick={() => { setPhotosSubView('instagram'); setSelectedEvent(null); }}
                                    className={`sub-switcher-btn ${photosSubView === 'instagram' ? 'active' : ''}`}
                                >
                                    <FaInstagram size={14} />
                                    <span>Instagram Posts Feed</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPhotosSubView('albums')}
                                    className={`sub-switcher-btn ${photosSubView === 'albums' ? 'active' : ''}`}
                                >
                                    <FaImages size={14} />
                                    <span>Campus Photo Albums ({events.length})</span>
                                </button>
                            </div>
                        </div>

                        {/* A. INSTAGRAM POSTS FEED */}
                        {photosSubView === 'instagram' && (
                            <div className="instagram-posts-grid">
                                {OFFICIAL_INSTAGRAM_POSTS.map((post, idx) => (
                                    <motion.div
                                        key={post._id || idx}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
                                        className="instagram-post-card"
                                    >
                                        {/* Post Header */}
                                        <div className="ig-post-header">
                                            <div className="ig-post-author">
                                                <div className="ig-small-avatar">
                                                    <FaInstagram />
                                                </div>
                                                <div className="ig-author-meta">
                                                    <div className="ig-author-handle-row">
                                                        <span className="ig-card-handle">easacollege</span>
                                                        <FaCheckCircle size={10} className="ig-verified-mini" />
                                                    </div>
                                                    <span className="ig-card-location">{post.location}</span>
                                                </div>
                                            </div>
                                            <a
                                                href={post.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ig-post-ext-link"
                                                title="Open in Instagram"
                                            >
                                                <FaInstagram size={16} />
                                            </a>
                                        </div>

                                        {/* Post Image with Lightbox click */}
                                        <div
                                            className="ig-post-image-box"
                                            onClick={() => setSelectedImage({ src: post.image, caption: post.caption })}
                                        >
                                            <img
                                                src={post.image}
                                                alt={post.caption}
                                                className="ig-post-img"
                                                loading="lazy"
                                            />
                                            <div className="ig-post-image-overlay">
                                                <span className="view-full-badge">Click to View Full Size</span>
                                            </div>
                                        </div>

                                        {/* Post Actions Bar */}
                                        <div className="ig-post-actions-bar">
                                            <div className="ig-left-actions">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleLikePost(post._id)}
                                                    className={`ig-action-icon-btn ${likedPosts[post._id] ? 'liked' : ''}`}
                                                    aria-label="Like Post"
                                                >
                                                    {likedPosts[post._id] ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
                                                </button>
                                                <button type="button" className="ig-action-icon-btn" aria-label="Comment">
                                                    <FaComment />
                                                </button>
                                                <a
                                                    href={post.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ig-action-icon-btn"
                                                    title="Share Post"
                                                >
                                                    <FaShareAlt />
                                                </a>
                                            </div>
                                            <button type="button" className="ig-action-icon-btn" aria-label="Bookmark">
                                                <FaBookmark />
                                            </button>
                                        </div>

                                        {/* Likes Count & Caption */}
                                        <div className="ig-post-footer">
                                            <div className="ig-likes-count">
                                                <span>{likedPosts[post._id] ? '1,249 likes' : `${post.likes} likes`}</span>
                                            </div>
                                            <p className="ig-caption-text">
                                                <strong>easacollege</strong> {post.caption}
                                            </p>
                                            <span className="ig-post-time">{post.date}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* B. CAMPUS PHOTO ALBUMS */}
                        {photosSubView === 'albums' && (
                            <div className="photo-albums-container">
                                <AnimatePresence>
                                    {selectedEvent && (
                                        <motion.button
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            onClick={() => setSelectedEvent(null)}
                                            className="back-to-albums-btn"
                                        >
                                            <FaArrowLeft />
                                            <span>Back to All Albums</span>
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {!selectedEvent ? (
                                    <div className="albums-grid">
                                        {events.map((event, index) => (
                                            <motion.div
                                                key={event._id || index}
                                                initial={{ opacity: 0, y: 25 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                                whileHover={{ y: -8 }}
                                                onClick={() => setSelectedEvent(event)}
                                                className="album-card"
                                            >
                                                <div className="album-cover-box">
                                                    {event.photos && event.photos.length > 0 ? (
                                                        <img src={event.photos[0].src} alt={event.eventName} className="album-cover-img" />
                                                    ) : (
                                                        <div className="album-placeholder"><FaImages size={48} style={{ opacity: 0.3 }} /></div>
                                                    )}
                                                    <div className="album-gradient-shade" />
                                                    <div className="album-captures-badge">
                                                        <FaImages size={11} style={{ marginRight: '5px' }} />
                                                        <span>{event.photos?.length || 0} Captures</span>
                                                    </div>
                                                </div>
                                                <div className="album-details">
                                                    <h3 className="album-title">{event.eventName}</h3>
                                                    <div className="album-meta-row">
                                                        <span className="album-date">
                                                            <FaCalendarAlt />
                                                            <span>{new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                        </span>
                                                        <span className="album-view-link">
                                                            <span>Open Album</span>
                                                            <FaChevronRight size={10} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="photos-masonry-grid">
                                        {selectedEvent.photos.map((photo, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                onClick={() => setSelectedImage(photo)}
                                                className="masonry-photo-item"
                                                whileHover={{ scale: 1.02, y: -4 }}
                                            >
                                                <img src={photo.src} alt={photo.caption || selectedEvent.eventName} className="masonry-photo-img" loading="lazy" />
                                                <div className="photo-hover-overlay">
                                                    <p className="photo-caption-txt">{photo.caption || "View Full Resolution"}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                )}

                {/* =========================================================
                    VIDEOS SESSION: INSTAGRAM REELS & YOUTUBE VIDEOS
                   ========================================================= */}
                {activeTab === 'videos' && (
                    <div className="videos-session-content">

                        {/* REELS & YOUTUBE SPOTLIGHT BANNER */}
                        <div className="reels-hub-banner">
                            <div className="reels-banner-backdrop" />
                            <div className="reels-banner-content">
                                <div className="reels-avatar-box">
                                    <FaVideo className="reels-banner-icon" />
                                </div>

                                <div className="reels-channel-info">
                                    <div className="reels-badge-tag">
                                        <span className="reels-live-dot" />
                                        <span>INSTAGRAM REELS & YOUTUBE BROADCASTS</span>
                                    </div>
                                    <h2 className="reels-channel-title">EASA Media & Video Hub</h2>
                                    <p className="reels-channel-handle">
                                        <span>@easacollege (Reels)</span>
                                        <span className="handle-dot">•</span>
                                        <span>@EASACollegeOfficial (YouTube)</span>
                                    </p>
                                </div>

                                <div className="reels-channel-actions">
                                    <a
                                        href={INSTAGRAM_REELS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ig-reels-btn"
                                    >
                                        <FaInstagram size={17} />
                                        <span>Watch Reels on Instagram</span>
                                        <FaExternalLinkAlt size={10} style={{ marginLeft: '4px' }} />
                                    </a>

                                    <a
                                        href={YOUTUBE_CHANNEL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="yt-subscribe-btn-sm"
                                    >
                                        <FaYoutube size={16} />
                                        <span>YouTube Channel</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* MEDIA FORMAT SWITCHER: ALL / INSTAGRAM REELS / YOUTUBE */}
                        <div className="media-format-toggle-bar">
                            <div className="format-pills-wrap">
                                <button
                                    type="button"
                                    onClick={() => setVideoMediaFilter('ALL')}
                                    className={`format-pill-btn ${videoMediaFilter === 'ALL' ? 'active' : ''}`}
                                >
                                    <span>All Video Media</span>
                                    <span className="fbadge">{combinedVideoMedia.length}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVideoMediaFilter('REELS')}
                                    className={`format-pill-btn reels-pill-btn ${videoMediaFilter === 'REELS' ? 'active' : ''}`}
                                >
                                    <FaInstagram size={14} className="reels-ig-icon" />
                                    <span>Instagram Reels (9:16)</span>
                                    <span className="fbadge reels-count">{OFFICIAL_INSTAGRAM_REELS.length}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setVideoMediaFilter('YOUTUBE')}
                                    className={`format-pill-btn yt-pill-btn ${videoMediaFilter === 'YOUTUBE' ? 'active' : ''}`}
                                >
                                    <FaYoutube size={14} className="yt-pill-icon" />
                                    <span>YouTube Videos</span>
                                    <span className="fbadge">{OFFICIAL_YOUTUBE_MEDIA.length}</span>
                                </button>
                            </div>

                            {/* Search Box */}
                            <div className="video-search-box">
                                <FaSearch className="vsearch-icon" />
                                <input
                                    type="text"
                                    placeholder="Search reels & videos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="vsearch-input"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="vsearch-clear"
                                    >
                                        <FaTimes size={11} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* CATEGORY FILTER PILLS */}
                        <div className="video-category-pills-row">
                            {videoCategories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`vcat-pill ${selectedCategory === cat ? 'active' : ''}`}
                                >
                                    {cat === 'ALL' ? 'All Categories' : cat}
                                </button>
                            ))}
                        </div>

                        {/* 1. INSTAGRAM REELS (9:16 VERTICAL CARDS) */}
                        {filteredVideoMedia.some(v => v.mediaType === 'instagram_reel') && (videoMediaFilter === 'ALL' || videoMediaFilter === 'REELS') && (
                            <div className="reels-section-block">
                                <div className="section-head-bar">
                                    <div className="head-left">
                                        <div className="reels-badge-icon-box">
                                            <FaInstagram size={16} />
                                        </div>
                                        <div>
                                            <h3 className="section-title">Official Instagram Reels</h3>
                                            <p className="section-sub">Trending 9:16 campus highlights, fest celebrations & student life @easacollege</p>
                                        </div>
                                    </div>
                                    <a
                                        href={INSTAGRAM_REELS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-all-reels-link"
                                    >
                                        <span>View on Instagram</span>
                                        <FaExternalLinkAlt size={10} />
                                    </a>
                                </div>

                                <div className="reels-cards-grid">
                                    {filteredVideoMedia.filter(v => v.mediaType === 'instagram_reel').map((reel, idx) => (
                                        <motion.div
                                            key={reel._id || idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            onClick={() => setSelectedReel(reel)}
                                            className="instagram-reel-card"
                                        >
                                            <div className="reel-thumb-wrap">
                                                <img
                                                    src={reel.thumbnail}
                                                    alt={reel.title}
                                                    className="reel-thumb-img"
                                                    loading="lazy"
                                                />
                                                <div className="reel-gradient-overlay" />

                                                {/* Top Reels Badge */}
                                                <div className="reel-top-badge">
                                                    <FaInstagram size={11} className="reel-ig-badge-icon" />
                                                    <span>Reels</span>
                                                </div>

                                                {/* Audio Track Tag */}
                                                <div className="reel-audio-tag">
                                                    <FaBolt size={9} style={{ color: '#fdbc12', marginRight: '4px' }} />
                                                    <span>{reel.audioTrack}</span>
                                                </div>

                                                {/* Bottom Meta */}
                                                <div className="reel-bottom-meta">
                                                    <span className="reel-views">
                                                        <FaEye size={10} style={{ marginRight: '4px' }} />
                                                        {reel.views}
                                                    </span>
                                                    <span className="reel-likes">
                                                        <FaHeart size={10} style={{ color: '#EF4444', marginRight: '4px' }} />
                                                        {reel.likes}
                                                    </span>
                                                </div>

                                                {/* Play Button Overlay */}
                                                <div className="reel-play-hover-overlay">
                                                    <div className="reel-play-circle">
                                                        <FaPlay size={15} className="play-triangle" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="reel-info-box">
                                                <h4 className="reel-title" title={reel.title}>{reel.title}</h4>
                                                <span className="reel-date">{reel.date}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. YOUTUBE VIDEOS (16:9) */}
                        {filteredVideoMedia.some(v => v.mediaType === 'youtube_video') && (videoMediaFilter === 'ALL' || videoMediaFilter === 'YOUTUBE') && (
                            <div className="youtube-videos-section-block">
                                <div className="section-head-bar">
                                    <div className="head-left">
                                        <div className="yt-badge-icon-box">
                                            <FaYoutube size={16} />
                                        </div>
                                        <div>
                                            <h3 className="section-title">Official YouTube Broadcasts</h3>
                                            <p className="section-sub">Campus drone tours, tech inaugurations, placements & annual fest broadcasts</p>
                                        </div>
                                    </div>
                                    <a
                                        href={YOUTUBE_CHANNEL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-all-reels-link"
                                    >
                                        <span>YouTube Channel</span>
                                        <FaExternalLinkAlt size={10} />
                                    </a>
                                </div>

                                <div className="videos-cards-grid">
                                    {filteredVideoMedia.filter(v => v.mediaType === 'youtube_video').map((video, idx) => (
                                        <motion.div
                                            key={video._id || idx}
                                            initial={{ opacity: 0, y: 25 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
                                            whileHover={{ y: -6 }}
                                            onClick={() => setSelectedVideo(video)}
                                            className="youtube-video-card"
                                        >
                                            <div className="vcard-thumb-wrap">
                                                <img src={video.thumbnail} alt={video.title} className="vcard-thumb-img" />
                                                <div className="vcard-thumb-shade" />
                                                {video.duration && (
                                                    <div className="vcard-duration-badge">
                                                        <FaClock size={9} style={{ marginRight: '3px' }} />
                                                        <span>{video.duration}</span>
                                                    </div>
                                                )}
                                                <span className="vcard-cat-pill">{video.category}</span>
                                                <div className="vcard-play-overlay">
                                                    <div className="yt-play-button-circle">
                                                        <FaPlay size={16} className="play-triangle" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="vcard-body">
                                                <h3 className="vcard-title">{video.title}</h3>
                                                <p className="vcard-desc">{video.desc}</p>
                                                <div className="vcard-footer">
                                                    <span className="vcard-date"><FaCalendarAlt size={10} style={{ color: '#fdbc12', marginRight: '4px' }} />{video.date}</span>
                                                    <span className="vcard-watch-link"><FaPlay size={9} /><span>Watch Video</span></span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* =========================================================
                INSTAGRAM REEL MODAL VIEWER
               ========================================================= */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedReel && (
                        <div
                            className="instagram-reel-modal-backdrop"
                            onClick={() => setSelectedReel(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="reel-modal-shade"
                            />

                            <motion.div
                                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                                className="instagram-reel-dialog"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Reel Header */}
                                <div className="reel-dialog-header">
                                    <div className="reel-dialog-brand">
                                        <FaInstagram className="reel-ig-brand-icon" size={18} />
                                        <span className="reel-dialog-handle">@easacollege</span>
                                        <FaCheckCircle size={10} className="ig-verified-mini" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedReel(null)}
                                        className="reel-dialog-close"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                </div>

                                {/* Reel Preview Frame */}
                                <div className="reel-dialog-frame">
                                    <img
                                        src={selectedReel.thumbnail}
                                        alt={selectedReel.title}
                                        className="reel-dialog-img"
                                    />
                                    <div className="reel-dialog-overlay-content">
                                        <div className="reel-dialog-audio-pill">
                                            <FaBolt size={10} />
                                            <span>{selectedReel.audioTrack}</span>
                                        </div>
                                        <h3 className="reel-dialog-title">{selectedReel.title}</h3>
                                        <p className="reel-dialog-caption">{selectedReel.caption}</p>
                                    </div>
                                </div>

                                {/* Reel Footer Action */}
                                <div className="reel-dialog-footer">
                                    <div className="reel-stats-col">
                                        <span><FaEye size={12} /> {selectedReel.views} views</span>
                                        <span><FaHeart size={12} style={{ color: '#EF4444' }} /> {selectedReel.likes} likes</span>
                                    </div>
                                    <a
                                        href={selectedReel.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="reel-open-btn"
                                    >
                                        <FaInstagram size={15} />
                                        <span>Watch Reel on Instagram</span>
                                        <FaExternalLinkAlt size={10} />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* =========================================================
                PHOTO FULLSCREEN LIGHTBOX
               ========================================================= */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <div
                            className="fullscreen-lightbox-overlay"
                            onClick={() => setSelectedImage(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lightbox-backdrop-shade" />
                            <motion.div
                                initial={{ scale: 0.92, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.92, opacity: 0 }}
                                className="lightbox-photo-dialog"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={selectedImage.src} alt={selectedImage.caption} className="lightbox-photo-img" />
                                <div className="lightbox-photo-caption-bar">
                                    <h3>{selectedImage.caption}</h3>
                                </div>
                                <button type="button" onClick={() => setSelectedImage(null)} className="lightbox-close-circle">
                                    <FaTimes />
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* =========================================================
                YOUTUBE VIDEO PLAYER MODAL
               ========================================================= */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedVideo && (
                        <div
                            className="youtube-modal-overlay"
                            onClick={() => setSelectedVideo(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="yt-modal-backdrop" />
                            <motion.div
                                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                                className="youtube-player-dialog"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="yt-dialog-header">
                                    <div className="yt-dialog-badge-group">
                                        <FaYoutube className="yt-red" size={18} />
                                        <span className="yt-dialog-cat">{selectedVideo.category}</span>
                                        <span className="yt-dialog-subtag">• @EASACollegeOfficial</span>
                                    </div>
                                    <button type="button" onClick={() => setSelectedVideo(null)} className="yt-dialog-close-btn">
                                        <FaTimes size={14} />
                                    </button>
                                </div>

                                <div className="yt-iframe-wrapper">
                                    <iframe
                                        src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                                        title={selectedVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="yt-iframe-player"
                                    />
                                </div>

                                <div className="yt-dialog-info-footer">
                                    <div className="yt-dialog-text-col">
                                        <h3 className="yt-modal-video-title">{selectedVideo.title}</h3>
                                        <p className="yt-modal-video-desc">{selectedVideo.desc}</p>
                                    </div>
                                    <div className="yt-dialog-actions-col">
                                        <a href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`} target="_blank" rel="noopener noreferrer" className="yt-direct-open-link">
                                            <FaYoutube size={14} className="yt-red" />
                                            <span>Open in YouTube</span>
                                            <FaExternalLinkAlt size={10} />
                                        </a>
                                        <button type="button" onClick={() => setSelectedVideo(null)} className="yt-modal-close-pill">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <Footer />

            {/* STYLES */}
            <style>{`
                .gallery-main-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 3.5rem 1.5rem 6rem;
                    position: relative;
                    z-index: 2;
                }

                /* 1. TOP SEGMENTED TAB SWITCHER */
                .gallery-tab-switcher-wrap {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 3.5rem;
                }

                .gallery-pill-nav {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 60px;
                    padding: 6px 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                }

                .gallery-nav-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: transparent;
                    border: 1px solid transparent;
                    color: #94A3B8;
                    font-size: 0.95rem;
                    font-weight: 800;
                    padding: 10px 22px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .gallery-nav-pill:hover {
                    color: #FFFFFF;
                    background: rgba(255, 255, 255, 0.06);
                }

                .gallery-nav-pill.insta-pill.active {
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    border-color: rgba(253, 29, 29, 0.5);
                    box-shadow: 0 4px 18px rgba(225, 48, 108, 0.45);
                }

                .gallery-nav-pill.reels-pill.active {
                    background: linear-gradient(135deg, #2e2d78 0%, #1B2A6B 100%);
                    color: #fdbc12;
                    border-color: rgba(253, 188, 18, 0.4);
                    box-shadow: 0 4px 18px rgba(46, 45, 120, 0.5);
                }

                .pill-icon {
                    font-size: 1.15rem;
                }

                .ig-gradient-icon {
                    color: #E1306C;
                }

                .gallery-nav-pill.insta-pill.active .ig-gradient-icon {
                    color: #FFFFFF;
                }

                .reels-icon {
                    color: #fdbc12;
                }

                .pill-badge {
                    font-size: 0.72rem;
                    background: rgba(0, 0, 0, 0.35);
                    padding: 2px 7px;
                    border-radius: 50px;
                    font-weight: 900;
                }

                .ig-badge {
                    background: rgba(225, 48, 108, 0.3);
                    color: #FCE7F3;
                }

                .reels-badge {
                    background: rgba(253, 188, 18, 0.25);
                    color: #FEF08A;
                }

                /* =========================================================
                   INSTAGRAM PROFILE SPOTLIGHT HEADER
                   ========================================================= */
                .instagram-profile-banner {
                    position: relative;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.9) 100%);
                    border: 1px solid rgba(225, 48, 108, 0.35);
                    border-radius: 24px;
                    overflow: hidden;
                    padding: 2rem 2.5rem;
                    margin-bottom: 2.5rem;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(225, 48, 108, 0.15);
                }

                .ig-banner-backdrop {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(225, 48, 108, 0.1) 1px, transparent 1px);
                    background-size: 24px 24px;
                    opacity: 0.6;
                }

                .ig-banner-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 1.75rem;
                    flex-wrap: wrap;
                }

                .ig-avatar-ring {
                    width: 76px;
                    height: 76px;
                    border-radius: 50%;
                    padding: 3px;
                    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                    flex-shrink: 0;
                }

                .ig-avatar-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #0d1226;
                }

                .ig-profile-info {
                    flex-grow: 1;
                    min-width: 260px;
                }

                .ig-handle-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 0.3rem;
                }

                .ig-handle-text {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                }

                .ig-verified-icon {
                    color: #38BDF8;
                    font-size: 1.1rem;
                }

                .ig-official-tag {
                    font-size: 0.7rem;
                    font-weight: 900;
                    background: rgba(225, 48, 108, 0.2);
                    border: 1px solid rgba(225, 48, 108, 0.4);
                    color: #F472B6;
                    padding: 2px 8px;
                    border-radius: 50px;
                }

                .ig-fullname {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #fdbc12;
                    margin: 0 0 0.3rem;
                }

                .ig-bio {
                    font-size: 0.85rem;
                    color: #CBD5E1;
                    line-height: 1.45;
                    margin: 0;
                }

                .ig-follow-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    font-size: 0.9rem;
                    font-weight: 800;
                    padding: 0.75rem 1.6rem;
                    border-radius: 50px;
                    text-decoration: none;
                    box-shadow: 0 6px 20px rgba(225, 48, 108, 0.45);
                    transition: all 0.25s ease;
                }

                .ig-follow-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(225, 48, 108, 0.65);
                    color: #FFFFFF;
                }

                /* SUB-SWITCHER: INSTAGRAM POSTS vs ALBUMS */
                .photos-sub-switcher-row {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2.5rem;
                }

                .sub-switcher-group {
                    display: inline-flex;
                    gap: 8px;
                    background: rgba(17, 24, 39, 0.75);
                    padding: 5px;
                    border-radius: 50px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .sub-switcher-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 18px;
                    background: transparent;
                    border: none;
                    color: #94A3B8;
                    font-size: 0.85rem;
                    font-weight: 700;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .sub-switcher-btn.active {
                    background: #2e2d78;
                    color: #fdbc12;
                    box-shadow: 0 4px 12px rgba(46, 45, 120, 0.5);
                }

                /* INSTAGRAM POSTS GRID (COMPACT & SLEEK 3D CARDS) */
                .instagram-posts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
                    gap: 1.5rem;
                }

                .instagram-post-card {
                    background: rgba(17, 24, 39, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.09);
                    border-radius: 18px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                }

                .instagram-post-card:hover {
                    border-color: rgba(225, 48, 108, 0.65);
                    box-shadow: 0 20px 45px -8px rgba(225, 48, 108, 0.35), 0 12px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    transform: translateY(-8px) scale(1.02);
                }

                .ig-post-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.75rem 1rem;
                    background: rgba(15, 23, 42, 0.5);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .ig-post-author {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .ig-small-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.95rem;
                    box-shadow: 0 2px 8px rgba(225, 48, 108, 0.4);
                }

                .ig-author-handle-row {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .ig-card-handle {
                    font-size: 0.82rem;
                    font-weight: 800;
                    color: #FFFFFF;
                }

                .ig-verified-mini {
                    color: #38BDF8;
                }

                .ig-card-location {
                    font-size: 0.68rem;
                    color: #94A3B8;
                    display: block;
                    max-width: 150px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .ig-post-ext-link {
                    color: #E1306C;
                    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease;
                }

                .ig-post-ext-link:hover {
                    color: #F472B6;
                    transform: scale(1.2) rotate(8deg);
                }

                .ig-post-image-box {
                    position: relative;
                    aspect-ratio: 1 / 1;
                    width: 100%;
                    overflow: hidden;
                    background: #0B1120;
                    cursor: pointer;
                }

                .ig-post-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .instagram-post-card:hover .ig-post-img {
                    transform: scale(1.08);
                }

                .ig-post-image-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(225, 48, 108, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
                    opacity: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.3s ease;
                }

                .ig-post-image-box:hover .ig-post-image-overlay {
                    opacity: 1;
                }

                .view-full-badge {
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(12px);
                    color: #FFFFFF;
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 6px 14px;
                    border-radius: 50px;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
                    transform: scale(0.9);
                    transition: transform 0.25s ease;
                }

                .ig-post-image-box:hover .view-full-badge {
                    transform: scale(1);
                }

                .ig-post-actions-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.65rem 1rem 0.25rem;
                }

                .ig-left-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .ig-action-icon-btn {
                    background: transparent;
                    border: none;
                    color: #CBD5E1;
                    font-size: 1.15rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    padding: 0;
                    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease;
                }

                .ig-action-icon-btn:hover {
                    color: #FFFFFF;
                    transform: scale(1.25);
                }

                .ig-action-icon-btn.liked {
                    color: #EF4444;
                }

                .heart-filled {
                    animation: heartPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                @keyframes heartPop {
                    0% { transform: scale(0.6); }
                    50% { transform: scale(1.4); }
                    100% { transform: scale(1); }
                }

                .ig-post-footer {
                    padding: 0.25rem 1rem 0.9rem;
                }

                .ig-likes-count {
                    font-size: 0.78rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.3rem;
                }

                .ig-caption-text {
                    font-size: 0.78rem;
                    color: #CBD5E1;
                    line-height: 1.4;
                    margin: 0 0 0.35rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ig-caption-text strong {
                    color: #FFFFFF;
                    margin-right: 4px;
                }

                .ig-post-time {
                    font-size: 0.65rem;
                    color: #94A3B8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                /* =========================================================
                   VIDEOS SESSION & INSTAGRAM REELS
                   ========================================================= */
                .reels-hub-banner {
                    position: relative;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.9) 100%);
                    border: 1px solid rgba(253, 188, 18, 0.35);
                    border-radius: 24px;
                    overflow: hidden;
                    padding: 2rem 2.5rem;
                    margin-bottom: 2.25rem;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
                }

                .reels-banner-backdrop {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(253, 188, 18, 0.08) 1px, transparent 1px);
                    background-size: 24px 24px;
                    opacity: 0.6;
                }

                .reels-banner-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    gap: 1.75rem;
                    flex-wrap: wrap;
                }

                .reels-avatar-box {
                    width: 72px;
                    height: 72px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #2e2d78 0%, #1a1954 100%);
                    border: 1px solid rgba(253, 188, 18, 0.4);
                    color: #fdbc12;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    box-shadow: 0 8px 25px rgba(46, 45, 120, 0.45);
                    flex-shrink: 0;
                }

                .reels-channel-info {
                    flex-grow: 1;
                    min-width: 260px;
                }

                .reels-badge-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(253, 188, 18, 0.12);
                    border: 1px solid rgba(253, 188, 18, 0.35);
                    color: #fdbc12;
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 0.8px;
                    padding: 3px 10px;
                    border-radius: 50px;
                    margin-bottom: 0.4rem;
                }

                .reels-live-dot {
                    width: 6px;
                    height: 6px;
                    background: #fdbc12;
                    border-radius: 50%;
                    box-shadow: 0 0 6px #fdbc12;
                }

                .reels-channel-title {
                    font-size: 1.6rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.3rem 0;
                }

                .reels-channel-handle {
                    color: #CBD5E1;
                    font-size: 0.88rem;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .reels-channel-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .ig-reels-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    font-size: 0.88rem;
                    font-weight: 800;
                    padding: 0.75rem 1.4rem;
                    border-radius: 50px;
                    text-decoration: none;
                    box-shadow: 0 6px 18px rgba(225, 48, 108, 0.4);
                    transition: all 0.25s ease;
                }

                .ig-reels-btn:hover {
                    transform: translateY(-2px);
                    color: #FFFFFF;
                }

                .yt-subscribe-btn-sm {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: #DC2626;
                    color: #FFFFFF;
                    font-size: 0.85rem;
                    font-weight: 800;
                    padding: 0.75rem 1.25rem;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.25s ease;
                }

                .yt-subscribe-btn-sm:hover {
                    background: #B91C1C;
                    color: #FFFFFF;
                }

                /* MEDIA FORMAT TOGGLE BAR */
                .media-format-toggle-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    flex-wrap: wrap;
                    background: rgba(17, 24, 39, 0.75);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 18px;
                    padding: 0.85rem 1.25rem;
                    margin-bottom: 1.5rem;
                }

                .format-pills-wrap {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .format-pill-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #94A3B8;
                    font-size: 0.85rem;
                    font-weight: 800;
                    padding: 8px 16px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .format-pill-btn.active {
                    background: #2e2d78;
                    color: #fdbc12;
                    border-color: rgba(253, 188, 18, 0.4);
                }

                .format-pill-btn.reels-pill-btn.active {
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    border-color: rgba(225, 48, 108, 0.5);
                }

                .reels-ig-icon {
                    color: #E1306C;
                }

                .format-pill-btn.reels-pill-btn.active .reels-ig-icon {
                    color: #FFFFFF;
                }

                .yt-pill-icon {
                    color: #EF4444;
                }

                .format-pill-btn.yt-pill-btn.active {
                    background: #DC2626;
                    color: #FFFFFF;
                }

                .fbadge {
                    font-size: 0.7rem;
                    background: rgba(0, 0, 0, 0.35);
                    padding: 2px 7px;
                    border-radius: 50px;
                    font-weight: 900;
                }

                .reels-count {
                    background: rgba(225, 48, 108, 0.3);
                    color: #FCE7F3;
                }

                .video-search-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .vsearch-icon {
                    position: absolute;
                    left: 12px;
                    color: #64748B;
                    font-size: 0.85rem;
                    pointer-events: none;
                }

                .vsearch-input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 50px;
                    padding: 7px 32px 7px 34px;
                    color: #FFFFFF;
                    font-size: 0.82rem;
                    width: 240px;
                    outline: none;
                }

                .vsearch-input:focus {
                    border-color: #E1306C;
                    box-shadow: 0 0 12px rgba(225, 48, 108, 0.3);
                }

                .vsearch-clear {
                    position: absolute;
                    right: 10px;
                    background: transparent;
                    border: none;
                    color: #94A3B8;
                    cursor: pointer;
                }

                /* CATEGORY PILLS */
                .video-category-pills-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    margin-bottom: 2.5rem;
                }

                .vcat-pill {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: #94A3B8;
                    font-size: 0.8rem;
                    font-weight: 700;
                    padding: 5px 14px;
                    border-radius: 50px;
                    cursor: pointer;
                }

                .vcat-pill.active {
                    background: #2e2d78;
                    color: #fdbc12;
                    border-color: rgba(253, 188, 18, 0.4);
                }

                /* SECTION HEAD BARS */
                .section-head-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .head-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .reels-badge-icon-box {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 14px rgba(225, 48, 108, 0.4);
                }

                .yt-badge-icon-box {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    background: #DC2626;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                }

                .section-sub {
                    font-size: 0.8rem;
                    color: #94A3B8;
                    margin: 2px 0 0 0;
                }

                .view-all-reels-link {
                    color: #fdbc12;
                    font-size: 0.82rem;
                    font-weight: 800;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    text-decoration: none;
                }

                .view-all-reels-link:hover {
                    color: #FFFFFF;
                }

                /* =========================================================
                   INSTAGRAM REELS GRID (COMPACT 9:16 CARDS WITH NEON GLOW)
                   ========================================================= */
                .reels-section-block {
                    margin-bottom: 3rem;
                }

                .reels-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 1.25rem;
                }

                .instagram-reel-card {
                    background: rgba(17, 24, 39, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 18px;
                    overflow: hidden;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                }

                .instagram-reel-card:hover {
                    border-color: rgba(225, 48, 108, 0.8);
                    box-shadow: 0 20px 45px -8px rgba(225, 48, 108, 0.45), 0 10px 25px rgba(0, 0, 0, 0.7);
                    transform: translateY(-8px) scale(1.03);
                }

                .reel-thumb-wrap {
                    position: relative;
                    aspect-ratio: 9 / 16;
                    width: 100%;
                    overflow: hidden;
                    background: #0B1120;
                }

                .reel-thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .instagram-reel-card:hover .reel-thumb-img {
                    transform: scale(1.1);
                }

                .reel-gradient-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 40%, transparent 80%);
                }

                .reel-top-badge {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(8px);
                    color: #FFFFFF;
                    font-size: 0.65rem;
                    font-weight: 900;
                    padding: 2px 7px;
                    border-radius: 50px;
                    display: inline-flex;
                    align-items: center;
                    gap: 3px;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    z-index: 2;
                }

                .reel-ig-badge-icon {
                    color: #E1306C;
                }

                .reel-audio-tag {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(6px);
                    color: #CBD5E1;
                    font-size: 0.62rem;
                    padding: 2px 6px;
                    border-radius: 4px;
                    max-width: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    z-index: 2;
                }

                .reel-bottom-meta {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    right: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #CBD5E1;
                    font-size: 0.68rem;
                    font-weight: 800;
                    z-index: 2;
                }

                .reel-views, .reel-likes {
                    display: inline-flex;
                    align-items: center;
                    background: rgba(0, 0, 0, 0.65);
                    backdrop-filter: blur(4px);
                    padding: 2px 6px;
                    border-radius: 4px;
                }

                .reel-play-hover-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3;
                    opacity: 0;
                    transition: opacity 0.25s ease;
                }

                .instagram-reel-card:hover .reel-play-hover-overlay {
                    opacity: 1;
                }

                .reel-play-circle {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 25px rgba(225, 48, 108, 0.9);
                    transform: scale(0.85);
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .instagram-reel-card:hover .reel-play-circle {
                    transform: scale(1.12);
                }

                .play-triangle {
                    margin-left: 2px;
                }

                .reel-info-box {
                    padding: 0.75rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .reel-title {
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.2s ease;
                }

                .instagram-reel-card:hover .reel-title {
                    color: #F472B6;
                }

                .reel-date {
                    font-size: 0.68rem;
                    color: #94A3B8;
                }

                /* =========================================================
                   YOUTUBE VIDEOS GRID (COMPACT 16:9 CARDS)
                   ========================================================= */
                .youtube-videos-section-block {
                    margin-bottom: 2rem;
                }

                .videos-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
                    gap: 1.5rem;
                }

                .youtube-video-card {
                    background: rgba(17, 24, 39, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 18px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .youtube-video-card:hover {
                    border-color: rgba(253, 188, 18, 0.6);
                    box-shadow: 0 20px 45px -8px rgba(253, 188, 18, 0.3), 0 10px 25px rgba(0, 0, 0, 0.7);
                    transform: translateY(-8px) scale(1.02);
                }

                .vcard-thumb-wrap {
                    position: relative;
                    height: 165px;
                    overflow: hidden;
                    background: #0B1120;
                }

                .vcard-thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .youtube-video-card:hover .vcard-thumb-img {
                    transform: scale(1.08);
                }

                .vcard-thumb-shade {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(17, 24, 39, 0.95) 0%, transparent 60%);
                }

                .vcard-duration-badge {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(15, 23, 42, 0.9);
                    color: #FFFFFF;
                    font-size: 0.68rem;
                    font-weight: 800;
                    padding: 2px 7px;
                    border-radius: 5px;
                    display: inline-flex;
                    align-items: center;
                }

                .vcard-cat-pill {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: rgba(15, 23, 42, 0.85);
                    color: #fdbc12;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 50px;
                }

                .vcard-play-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3;
                }

                .yt-play-button-circle {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #DC2626;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 16px rgba(220, 38, 38, 0.6);
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s;
                }

                .youtube-video-card:hover .yt-play-button-circle {
                    transform: scale(1.2);
                    background: #EF4444;
                    box-shadow: 0 0 25px rgba(239, 68, 68, 0.9);
                }

                .vcard-body {
                    padding: 1rem 1.15rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .vcard-title {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.4rem;
                    line-height: 1.35;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .vcard-desc {
                    color: #94A3B8;
                    font-size: 0.75rem;
                    line-height: 1.45;
                    margin: 0 0 0.75rem;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .vcard-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 0.65rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .vcard-date {
                    font-size: 0.7rem;
                    color: #94A3B8;
                }

                .vcard-watch-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #fdbc12;
                    transition: transform 0.2s ease;
                }

                .youtube-video-card:hover .vcard-watch-link {
                    transform: translateX(3px);
                }

                /* =========================================================
                   INSTAGRAM REEL MODAL VIEWER
                   ========================================================= */
                .instagram-reel-modal-backdrop {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.25rem;
                    box-sizing: border-box;
                }

                .reel-modal-shade {
                    position: absolute;
                    inset: 0;
                    background: rgba(3, 7, 18, 0.94);
                    backdrop-filter: blur(16px);
                }

                .instagram-reel-dialog {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 400px;
                    background: #0D1322;
                    border: 1px solid rgba(225, 48, 108, 0.4);
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(225, 48, 108, 0.3);
                    margin: auto;
                    color: #FFFFFF;
                }

                .reel-dialog-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.85rem 1.15rem;
                    background: rgba(15, 23, 42, 0.85);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .reel-dialog-brand {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .reel-ig-brand-icon {
                    color: #E1306C;
                }

                .reel-dialog-handle {
                    font-size: 0.88rem;
                    font-weight: 800;
                    color: #FFFFFF;
                }

                .reel-dialog-close {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #CBD5E1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .reel-dialog-close:hover {
                    background: #EF4444;
                    color: #FFFFFF;
                }

                .reel-dialog-frame {
                    position: relative;
                    aspect-ratio: 9 / 16;
                    max-height: 58vh;
                    width: 100%;
                    background: #000000;
                    overflow: hidden;
                }

                .reel-dialog-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .reel-dialog-overlay-content {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(13, 19, 34, 0.98) 0%, rgba(13, 19, 34, 0.3) 50%, transparent 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.15rem;
                }

                .reel-dialog-audio-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: rgba(0, 0, 0, 0.7);
                    color: #CBD5E1;
                    font-size: 0.7rem;
                    padding: 3px 9px;
                    border-radius: 50px;
                    margin-bottom: 0.5rem;
                    width: fit-content;
                }

                .reel-dialog-title {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.35rem;
                }

                .reel-dialog-caption {
                    font-size: 0.78rem;
                    color: #94A3B8;
                    margin: 0;
                    line-height: 1.4;
                }

                .reel-dialog-footer {
                    padding: 0.85rem 1.15rem;
                    background: rgba(15, 23, 42, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .reel-stats-col {
                    display: flex;
                    gap: 10px;
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #CBD5E1;
                }

                .reel-stats-col span {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }

                .reel-open-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    font-size: 0.78rem;
                    font-weight: 800;
                    padding: 0.55rem 1rem;
                    border-radius: 50px;
                    text-decoration: none;
                }

                /* =========================================================
                   CAMPUS PHOTO ALBUMS GRID (COMPACT & LAYERED)
                   ========================================================= */
                .photo-albums-container {
                    margin-top: 1rem;
                }

                .back-to-albums-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.65rem 1.4rem;
                    font-size: 0.88rem;
                    margin-bottom: 2rem;
                    border-radius: 12px;
                    background: rgba(17, 24, 39, 0.8);
                    color: #FFFFFF;
                    border: 1px solid rgba(253, 188, 18, 0.3);
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .back-to-albums-btn:hover {
                    background: #2e2d78;
                    color: #fdbc12;
                    border-color: rgba(253, 188, 18, 0.5);
                }

                .albums-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .album-card {
                    background: rgba(17, 24, 39, 0.85);
                    border-radius: 18px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .album-card:hover {
                    border-color: rgba(253, 188, 18, 0.6);
                    box-shadow: 0 20px 45px -8px rgba(253, 188, 18, 0.3), 0 10px 25px rgba(0, 0, 0, 0.7);
                    transform: translateY(-8px) scale(1.02);
                }

                .album-cover-box {
                    height: 190px;
                    position: relative;
                    overflow: hidden;
                }

                .album-cover-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .album-card:hover .album-cover-img {
                    transform: scale(1.08);
                }

                .album-gradient-shade {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(17, 24, 39, 0.95) 0%, transparent 60%);
                }

                .album-captures-badge {
                    position: absolute;
                    bottom: 0.85rem;
                    right: 0.85rem;
                    background: rgba(15, 23, 42, 0.9);
                    padding: 0.3rem 0.75rem;
                    border-radius: 50px;
                    color: #FFFFFF;
                    font-size: 0.72rem;
                    font-weight: 800;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                }

                .album-details {
                    padding: 1.15rem;
                }

                .album-title {
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.5rem;
                    line-height: 1.35;
                }

                .album-meta-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .album-date {
                    color: #94A3B8;
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .album-view-link {
                    color: #fdbc12;
                    font-size: 0.78rem;
                    font-weight: 800;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }

                /* PHOTOS MASONRY GRID */
                .photos-masonry-grid {
                    columns: 3 320px;
                    column-gap: 1.75rem;
                }

                .masonry-photo-item {
                    break-inside: avoid;
                    margin-bottom: 1.75rem;
                    border-radius: 18px;
                    overflow: hidden;
                    cursor: pointer;
                    position: relative;
                }

                .masonry-photo-img {
                    width: 100%;
                    display: block;
                }

                .photo-hover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 60%);
                    opacity: 0;
                    display: flex;
                    align-items: flex-end;
                    padding: 1.5rem;
                    transition: opacity 0.3s ease;
                }

                .masonry-photo-item:hover .photo-hover-overlay {
                    opacity: 1;
                }

                .photo-caption-txt {
                    color: #FFFFFF;
                    font-weight: 800;
                    font-size: 0.95rem;
                    margin: 0;
                }

                /* LIGHTBOX & YOUTUBE MODAL */
                .fullscreen-lightbox-overlay, .youtube-modal-overlay {
                    position: fixed;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.25rem;
                    box-sizing: border-box;
                }

                .lightbox-backdrop-shade, .yt-modal-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(3, 7, 18, 0.94);
                    backdrop-filter: blur(16px);
                }

                .lightbox-photo-dialog {
                    position: relative;
                    z-index: 2;
                    max-width: 90vw;
                    max-height: 90vh;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #0D1322;
                    margin: auto;
                }

                .lightbox-photo-img {
                    max-width: 100%;
                    max-height: 80vh;
                    display: block;
                    object-fit: contain;
                }

                .lightbox-photo-caption-bar {
                    padding: 1.5rem 2rem;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.5));
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    color: #FFFFFF;
                }

                .lightbox-close-circle {
                    position: absolute;
                    top: 1.25rem;
                    right: 1.25rem;
                    background: rgba(255, 255, 255, 0.15);
                    color: #FFFFFF;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .youtube-player-dialog {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 860px;
                    background: #0D1322;
                    border: 1px solid rgba(253, 188, 18, 0.35);
                    border-radius: 24px;
                    overflow: hidden;
                    margin: auto;
                    color: #FFFFFF;
                }

                .yt-dialog-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem 1.5rem;
                    background: rgba(15, 23, 42, 0.85);
                }

                .yt-dialog-badge-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .yt-red {
                    color: #EF4444;
                }

                .yt-dialog-cat {
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #fdbc12;
                    text-transform: uppercase;
                }

                .yt-dialog-subtag {
                    font-size: 0.75rem;
                    color: #94A3B8;
                }

                .yt-dialog-close-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #CBD5E1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .yt-iframe-wrapper {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                    background: #000000;
                }

                .yt-iframe-player {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }

                .yt-dialog-info-footer {
                    padding: 1.25rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    background: rgba(15, 23, 42, 0.8);
                }

                .yt-modal-video-title {
                    font-size: 1.05rem;
                    font-weight: 800;
                    margin: 0 0 0.35rem;
                }

                .yt-modal-video-desc {
                    color: #94A3B8;
                    font-size: 0.78rem;
                    margin: 0;
                }

                .yt-dialog-actions-col {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .yt-direct-open-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.55rem 0.95rem;
                    background: rgba(220, 38, 38, 0.15);
                    border: 1px solid rgba(239, 68, 68, 0.4);
                    border-radius: 50px;
                    color: #FFFFFF;
                    font-size: 0.78rem;
                    font-weight: 800;
                    text-decoration: none;
                }

                .yt-modal-close-pill {
                    padding: 0.55rem 0.95rem;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 50px;
                    color: #CBD5E1;
                    font-size: 0.78rem;
                    font-weight: 700;
                    cursor: pointer;
                }

                @media (max-width: 860px) {
                    .ig-banner-content, .reels-banner-content {
                        flex-direction: column;
                        text-align: center;
                        align-items: center;
                    }
                    .gallery-pill-nav {
                        width: 100%;
                        flex-direction: column;
                        border-radius: 20px;
                    }
                    .gallery-nav-pill {
                        width: 100%;
                        justify-content: center;
                    }
                    .media-format-toggle-bar {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .vsearch-input {
                        width: 100%;
                    }
                    .photos-masonry-grid {
                        columns: 2 240px;
                    }
                }

                @media (max-width: 600px) {
                    .gallery-main-container {
                        padding: 2.5rem 1rem 4.5rem;
                    }
                    .instagram-posts-grid, .albums-grid, .videos-cards-grid {
                        grid-template-columns: 1fr;
                    }
                    .reels-cards-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.85rem;
                    }
                    .photos-masonry-grid {
                        columns: 1 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default GalleryPage;
