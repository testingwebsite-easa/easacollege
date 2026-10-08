import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import InstagramFeedWidget from '../components/InstagramFeedWidget';
import {
    FaTimes,
    FaArrowLeft,
    FaCalendarAlt,
    FaImages,
    FaChevronRight,
    FaPlay,
    FaYoutube,
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
        shortcode: "C9xPq19LzA8",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
        likes: "1,248",
        comments: "86",
        caption: "Golden hour over the 25-acre green EASA campus! 🌿🏛️ Welcoming our new engineering cohort for academic year 2026. #EASACollege #CampusLife #EngineeringCoimbatore #GreenCampus",
        date: "2 DAYS AGO",
        location: "EASA College of Engineering and Technology, Coimbatore",
        url: "https://www.instagram.com/easacollege/p/C9xPq19LzA8/"
    },
    {
        _id: "ig-post-002",
        shortcode: "C8mNk42QyW1",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
        likes: "2,840",
        comments: "194",
        caption: "DHRUVA 2026 & SARVAM was pure electricity! 🎸✨ Huge shoutout to everyone who made the pro-show and cultural competitions unforgettable! #DHRUVA2026 #EASAFest #CollegeVibes #Culturals",
        date: "5 DAYS AGO",
        location: "EASA Open Air Auditorium",
        url: "https://www.instagram.com/easacollege/p/C8mNk42QyW1/"
    },
    {
        _id: "ig-post-003",
        shortcode: "C7hBv83PrX5",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        likes: "1,890",
        comments: "112",
        caption: "Proud moment! Placement drive 2026 crosses 96% conversion rate with top offers from Amazon, Zoho, and Bosch! 💼🎉 #EASAPlacements #EngineeringCareers #CampusHiring #FutureReady",
        date: "1 WEEK AGO",
        location: "EASA Placement Cell",
        url: "https://www.instagram.com/easacollege/p/C7hBv83PrX5/"
    },
    {
        _id: "ig-post-004",
        shortcode: "C6dRt71MvK3",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
        likes: "1,420",
        comments: "64",
        caption: "Building humanoid prototypes and autonomous bots at our AICTE IDEA Lab! 🤖💡 Real-time engineering innovation at work. #IDEALab #Robotics #AICTE #EASATech",
        date: "2 WEEKS AGO",
        location: "AICTE IDEA Lab, ECET",
        url: "https://www.instagram.com/easacollege/p/C6dRt71MvK3/"
    },
    {
        _id: "ig-post-005",
        shortcode: "C5kLs90TqP7",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
        likes: "1,680",
        comments: "98",
        caption: "Champions on and off the field! ⚽🏆 Our athletes secured 8 Gold and 5 Silver medals at the Anna University Athletics Zone Meet. #EASASports #Athletes #Champions #CollegeSports",
        date: "3 WEEKS AGO",
        location: "EASA Sports Complex",
        url: "https://www.instagram.com/easacollege/p/C5kLs90TqP7/"
    },
    {
        _id: "ig-post-006",
        shortcode: "C4fJy62WzN9",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
        likes: "3,120",
        comments: "240",
        caption: "Caps in the air, dreams in motion! 🎓 Celebrating our 16th Graduation Ceremony. Congratulations to all university gold medalists and graduates! #GraduationDay #EASAAlumni #ClassOf2026",
        date: "1 MONTH AGO",
        location: "EASA Main Auditorium",
        url: "https://www.instagram.com/easacollege/p/C4fJy62WzN9/"
    }
];

// ==========================================
// 2. CURATED INSTAGRAM REELS (VIDEOS SESSION)
// ==========================================
const OFFICIAL_INSTAGRAM_REELS = [
    {
        _id: "ig-reel-001",
        shortcode: "C1hR8Y9PzX4",
        mediaType: "instagram_reel",
        isShort: true,
        title: "16th Graduation Ceremony & Degree Conferral 🎓✨",
        thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Convocation Anthem - easacollege",
        views: "24.2K",
        likes: "1.6K",
        date: "2025-03-26",
        category: "Graduation",
        caption: "Honoring academic excellence and brilliant milestones at the 16th Graduation Ceremony of EASA College. #EASACollege #GraduationDay #Convocation #Autonomous",
        url: "https://www.instagram.com/easacollege/reel/C1hR8Y9PzX4/"
    },
    {
        _id: "ig-reel-002",
        shortcode: "C5_fM18PqL9",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Traditional Chenda Melam & Grand Fest Procession 🥁🔥",
        thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Chenda Melam Rhythm - easacollege",
        views: "52.6K",
        likes: "4.8K",
        date: "2025-03-21",
        category: "Culturals",
        caption: "Thunderous beats of Chenda Melam echoing across the EASA sports quadrangle! Pure festival spirit & vibrant energy. #EASAFest #ChendaMelam #Sarvam26 #CampusVibes",
        url: "https://www.instagram.com/easacollege/reel/C5_fM18PqL9/"
    },
    {
        _id: "ig-reel-003",
        shortcode: "C3qNkK4PrY2",
        mediaType: "instagram_reel",
        isShort: true,
        title: "SARVAM 26 & Thai Uthsavam Massive Crowd Energy 🌟🎉",
        thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Trending Festive - easacollege",
        views: "68.1K",
        likes: "5.9K",
        date: "2025-02-14",
        category: "Culturals",
        caption: "Thousands of students uniting for Thai Uthsavam & Sarvam 26 celebrations with music, colors, and memories! #Sarvam26 #ThaiUthsavam #EASAEvents",
        url: "https://www.instagram.com/easacollege/reel/C3qNkK4PrY2/"
    },
    {
        _id: "ig-reel-004",
        shortcode: "C2mGqY3LqS1",
        mediaType: "instagram_reel",
        isShort: true,
        title: "AICTE IDEA Lab: 3D Prototyping & Student Inventions 🤖💡",
        thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Tech Beats - Innovation Hub",
        views: "34.4K",
        likes: "2.9K",
        date: "2025-01-25",
        category: "Tech & Labs",
        caption: "From ideas to prototypes! Watch students engineer automated robotics and drone chassis in our ₹1.2 Cr AICTE IDEA Lab. #IDEALab #EngineeringInnovation #Robotics #AICTE",
        url: "https://www.instagram.com/easacollege/reel/C2mGqY3LqS1/"
    },
    {
        _id: "ig-reel-005",
        shortcode: "C0fK2L9MxW8",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Placement Drive 2026: Elite Offers from Amazon, Bosch & Zoho 💼🚀",
        thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Celebration Beat - Success",
        views: "45.8K",
        likes: "3.8K",
        date: "2025-01-18",
        category: "Placements",
        caption: "Record placements in motion! Big congratulations to our final-year engineers placed in tier-1 MNCs and global firms. #EASAPlacements #CareerSuccess #AutonomousAdvantage",
        url: "https://www.instagram.com/easacollege/reel/C0fK2L9MxW8/"
    },
    {
        _id: "ig-reel-006",
        shortcode: "DdVSGwViZH2",
        mediaType: "instagram_reel",
        isShort: true,
        title: "Anna University Athletics Zone Champions 🏆⚽",
        thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
        audioTrack: "Stadium Roar - Sports",
        views: "32.5K",
        likes: "2.9K",
        date: "2025-01-10",
        category: "Sports",
        caption: "Dominating the sports arena with 8 Gold medals and the Championship cup! Proud champions of EASA College. #EASASports #AnnaUniversity #ZoneChampions",
        url: "https://www.instagram.com/easacollege/reel/DdVSGwViZH2/"
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

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Videos Session State: Filter by Category & Search
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);

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

    // Fetch Photo Albums from Backend
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
        if (selectedImage || selectedMedia) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage, selectedMedia]);

    // Official YouTube Videos List (No Reels)
    const combinedVideoMedia = OFFICIAL_YOUTUBE_MEDIA;

    const filteredVideoMedia = combinedVideoMedia.filter(item => {
        const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;

        const matchesSearch =
            searchQuery.trim() === '' ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCat && matchesSearch;
    });

    const videoCategories = ['ALL', ...new Set(combinedVideoMedia.map(v => v.category).filter(Boolean))];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', overflowX: 'hidden', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title={activeTab === 'videos' ? "Official Video Gallery & YouTube Broadcasts | EASA College" : "Campus Photo Albums & Moments | EASA College"}
                description="Explore EASA College campus life with official photo albums, campus captures, and YouTube broadcasts."
            />
            <Navbar />

            <GlobalHero
                pageKey={selectedEvent ? `gallery-${selectedEvent._id}` : (activeTab === 'videos' ? "video-gallery" : "gallery")}
                defaultTitle={selectedEvent ? selectedEvent.eventName : (activeTab === 'videos' ? "Official Video Gallery" : "Campus Photo Gallery")}
                defaultSubtitle={selectedEvent
                    ? new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    : (activeTab === 'videos'
                        ? "Watch official campus tours, seminars, graduation broadcasts, and student innovations from @EASACollegeOfficial."
                        : "Browse campus photo albums, annual fests, technical events, and memorable student moments.")}
                defaultImage={selectedEvent && selectedEvent.photos?.length > 0
                    ? selectedEvent.photos[0].src
                    : (events.length > 0 && events[0].photos?.length > 0 ? events[0].photos[0].src : OFFICIAL_INSTAGRAM_POSTS[0].image)}
            />

            <div className="gallery-main-container">

                {/* 1. TOP SEGMENTED TAB SWITCHER (PHOTOS / VIDEOS) */}
                <div className="gallery-tab-switcher-wrap">
                    <div className="gallery-pill-nav">
                        <button
                            type="button"
                            onClick={() => handleTabChange('photos')}
                            className={`gallery-nav-pill photo-pill ${activeTab === 'photos' ? 'active' : ''}`}
                        >
                            <FaImages className="pill-icon photo-icon" />
                            <span>Photo Gallery & Albums</span>
                            <span className="pill-badge photo-badge">{events.length}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleTabChange('videos')}
                            className={`gallery-nav-pill yt-nav-pill ${activeTab === 'videos' ? 'active' : ''}`}
                        >
                            <FaYoutube className="pill-icon yt-icon" />
                            <span>YouTube Video Gallery</span>
                            <span className="pill-badge yt-badge">{combinedVideoMedia.length}</span>
                        </button>
                    </div>
                </div>

                {/* =========================================================
                    PHOTOS SESSION: CAMPUS PHOTO ALBUMS
                   ========================================================= */}
                {activeTab === 'photos' && (
                    <div className="photos-session-content">
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

                            {/* LIVE INSTAGRAM FEED SECTION */}
                            {!selectedEvent && (
                                <div className="instagram-live-feed-section" style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '0.4rem 1.2rem',
                                            borderRadius: '50px',
                                            background: 'linear-gradient(135deg, rgba(225, 48, 108, 0.15) 0%, rgba(131, 58, 180, 0.15) 100%)',
                                            border: '1px solid rgba(225, 48, 108, 0.3)',
                                            color: '#E1306C',
                                            fontWeight: '700',
                                            fontSize: '0.85rem',
                                            marginBottom: '0.75rem'
                                        }}>
                                            <span>LIVE SOCIAL FEED</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
                                            Follow Our Live Moments on Instagram
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                                            Real-time campus highlights, events, and student stories from <a href="https://www.instagram.com/easacollege/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none' }}>@easacollege</a>
                                        </p>
                                    </div>
                                    <InstagramFeedWidget embedId="25719657" />
                                </div>
                            )}
                    </div>
                )}

                {/* =========================================================
                    VIDEOS SESSION: OFFICIAL YOUTUBE VIDEO GALLERY
                   ========================================================= */}
                {activeTab === 'videos' && (
                    <div className="videos-session-content">

                        {/* YOUTUBE SPOTLIGHT BANNER */}
                        <div className="reels-hub-banner yt-hub-banner">
                            <div className="reels-banner-backdrop yt-banner-backdrop" />
                            <div className="reels-banner-content">
                                <div className="reels-avatar-box yt-avatar-box">
                                    <FaYoutube className="reels-banner-icon yt-banner-icon" />
                                </div>

                                <div className="reels-channel-info">
                                    <div className="reels-badge-tag yt-badge-tag">
                                        <span className="reels-live-dot" style={{ background: '#EF4444' }} />
                                        <span>OFFICIAL YOUTUBE BROADCASTS</span>
                                    </div>
                                    <h2 className="reels-channel-title">EASA Official Video Gallery</h2>
                                    <p className="reels-channel-handle">
                                        <span>@EASACollegeOfficial</span>
                                        <span className="handle-dot">•</span>
                                        <span>Watch campus tours, seminars, graduation & cultural fests</span>
                                    </p>
                                </div>

                                <div className="reels-channel-actions">
                                    <a
                                        href={YOUTUBE_CHANNEL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="yt-subscribe-btn-sm"
                                        style={{ padding: '0.8rem 1.6rem', fontSize: '0.92rem' }}
                                    >
                                        <FaYoutube size={18} />
                                        <span>Subscribe on YouTube</span>
                                        <FaExternalLinkAlt size={11} style={{ marginLeft: '4px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CATEGORY & SEARCH FILTER BAR */}
                        <div className="media-format-toggle-bar">
                            <div className="video-category-pills-row" style={{ margin: 0, padding: 0 }}>
                                {videoCategories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`vcat-pill ${selectedCategory === cat ? 'active' : ''}`}
                                    >
                                        {cat === 'ALL' ? 'All Videos' : cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Box */}
                            <div className="video-search-box">
                                <FaSearch className="vsearch-icon" />
                                <input
                                    type="text"
                                    placeholder="Search YouTube videos..."
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

                        {/* YOUTUBE VIDEO SHOWCASE GRID */}
                        <div className="unified-video-section">
                            <div className="section-head-bar">
                                <div className="head-left">
                                    <div className="unified-badge-icon-box" style={{ background: '#DC2626', color: '#FFFFFF', borderColor: '#EF4444' }}>
                                        <FaYoutube size={20} />
                                    </div>
                                    <div>
                                        <h3 className="section-title">Campus YouTube Video Broadcasts</h3>
                                        <p className="section-sub">
                                            Showing {filteredVideoMedia.length} videos • Click any video to play directly in-site
                                        </p>
                                    </div>
                                </div>
                                <div className="head-channel-links">
                                    <a
                                        href={YOUTUBE_CHANNEL_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="channel-badge-link yt-link"
                                    >
                                        <FaYoutube size={14} />
                                        <span>@EASACollegeOfficial</span>
                                    </a>
                                </div>
                            </div>

                            {filteredVideoMedia.length === 0 ? (
                                <div className="no-media-empty-state">
                                    <FaSearch size={32} style={{ color: '#64748B', marginBottom: '1rem' }} />
                                    <h3>No Videos Found</h3>
                                    <p>No videos match your search term "{searchQuery}" or selected category.</p>
                                    <button
                                        type="button"
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                                        className="reset-filters-btn"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="unified-video-grid">
                                    {filteredVideoMedia.map((item, idx) => (
                                        <motion.div
                                            key={item._id || idx}
                                            initial={{ opacity: 0, y: 22 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                                            whileHover={{ y: -7 }}
                                            onClick={() => setSelectedMedia(item)}
                                            className="unified-media-card youtube-card-type"
                                        >
                                            {/* Media Poster Container */}
                                            <div className="media-card-poster-wrap aspect-video">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="media-card-poster-img"
                                                    loading="lazy"
                                                />
                                                <div className="media-poster-overlay" />

                                                {/* Platform Badge */}
                                                <div className="media-platform-badge yt-badge">
                                                    <FaYoutube size={11} />
                                                    <span>YouTube Video</span>
                                                </div>

                                                {/* Duration Tag */}
                                                {item.duration && (
                                                    <div className="media-duration-tag">
                                                        <FaClock size={9} style={{ marginRight: '3px' }} />
                                                        <span>{item.duration}</span>
                                                    </div>
                                                )}

                                                {/* Hover Play Button */}
                                                <div className="media-hover-play-layer">
                                                    <div className="media-play-glow-circle yt-glow">
                                                        <FaPlay size={16} className="play-triangle-center" />
                                                    </div>
                                                    <span className="media-tap-play-hint">Watch Video</span>
                                                </div>

                                                {/* Bottom stats row inside poster */}
                                                <div className="media-poster-bottom-stats">
                                                    {item.views && (
                                                        <span className="stat-pill">
                                                            <FaEye size={10} style={{ marginRight: '3px' }} />
                                                            {item.views}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Media Information & Details Body */}
                                            <div className="media-card-info-body">
                                                <div className="media-meta-head">
                                                    <span className="media-cat-badge">{item.category}</span>
                                                    <span className="media-date-text">
                                                        <FaCalendarAlt size={10} style={{ color: '#fdbc12', marginRight: '4px' }} />
                                                        {item.date}
                                                    </span>
                                                </div>

                                                <h4 className="media-card-title" title={item.title}>{item.title}</h4>
                                                
                                                <p className="media-card-desc">
                                                    {item.desc}
                                                </p>

                                                <div className="media-card-action-bar">
                                                    <span className="media-play-trigger-text" style={{ color: '#EF4444' }}>
                                                        <FaPlay size={9} />
                                                        <span>Watch Video</span>
                                                    </span>
                                                    <span className="media-source-handle">
                                                        @EASACollege
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>

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
                    {selectedMedia && (
                        <div
                            className="unified-media-modal-backdrop"
                            onClick={() => setSelectedMedia(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="media-modal-shade"
                            />

                            <motion.div
                                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                                className="unified-media-dialog youtube-dialog-split"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* LEFT SIDE: YOUTUBE PLAYER EMBED */}
                                <div className="split-dialog-left-player">
                                    <div className="split-youtube-player-wrap">
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${selectedMedia.youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                                            title={selectedMedia.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="split-youtube-iframe"
                                        />
                                    </div>
                                </div>

                                {/* RIGHT SIDE: DETAILS, TITLE, DESCRIPTION & ACTIONS */}
                                <div className="split-dialog-right-details">
                                    {/* Header: Brand & Close */}
                                    <div className="split-details-header">
                                        <div className="dialog-brand-box">
                                            <FaYoutube className="yt-brand-icon" size={20} />
                                            <span className="dialog-brand-handle">@EASACollegeOfficial</span>
                                            <span className="dialog-type-tag yt-type-tag">YouTube Video</span>
                                            <span className="dialog-cat-pill">{selectedMedia.category}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedMedia(null)}
                                            className="dialog-close-btn"
                                            aria-label="Close Player"
                                        >
                                            <FaTimes size={14} />
                                        </button>
                                    </div>

                                    {/* Body: Title, Stats & Description */}
                                    <div className="split-details-body">
                                        <h3 className="dialog-media-title">{selectedMedia.title}</h3>

                                        <div className="dialog-stats-pills">
                                            {selectedMedia.views && (
                                                <span className="dialog-stat-item">
                                                    <FaEye size={12} />
                                                    <span>{selectedMedia.views} views</span>
                                                </span>
                                            )}
                                            {selectedMedia.duration && (
                                                <span className="dialog-stat-item">
                                                    <FaClock size={12} style={{ color: '#fdbc12' }} />
                                                    <span>{selectedMedia.duration}</span>
                                                </span>
                                            )}
                                            <span className="dialog-stat-item">
                                                <FaCalendarAlt size={11} style={{ color: '#fdbc12' }} />
                                                <span>{selectedMedia.date}</span>
                                            </span>
                                        </div>

                                        {/* Description Block */}
                                        <div className="split-caption-block">
                                            <h5 className="split-caption-label">
                                                Video Description
                                            </h5>
                                            <div className="dialog-caption-box">
                                                <p className="dialog-caption-text">
                                                    {selectedMedia.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="split-details-footer">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${selectedMedia.youtubeId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="dialog-external-btn yt-ext-btn"
                                        >
                                            <FaYoutube size={16} />
                                            <span>Open on YouTube</span>
                                            <FaExternalLinkAlt size={10} />
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedMedia(null)}
                                            className="dialog-dismiss-pill"
                                        >
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

                .gallery-nav-pill.photo-pill.active {
                    background: linear-gradient(135deg, #2e2d78 0%, #1B2A6B 100%);
                    color: #fdbc12;
                    border-color: rgba(253, 188, 18, 0.4);
                    box-shadow: 0 4px 18px rgba(46, 45, 120, 0.5);
                }

                .gallery-nav-pill.yt-nav-pill.active {
                    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
                    color: #FFFFFF;
                    border-color: rgba(239, 68, 68, 0.5);
                    box-shadow: 0 4px 18px rgba(220, 38, 38, 0.45);
                }

                .pill-icon {
                    font-size: 1.15rem;
                }

                .photo-icon {
                    color: #fdbc12;
                }

                .yt-icon {
                    color: #EF4444;
                }

                .gallery-nav-pill.yt-nav-pill.active .yt-icon {
                    color: #FFFFFF;
                }

                .pill-badge {
                    font-size: 0.72rem;
                    background: rgba(0, 0, 0, 0.35);
                    padding: 2px 7px;
                    border-radius: 50px;
                    font-weight: 900;
                }

                .photo-badge {
                    background: rgba(253, 188, 18, 0.25);
                    color: #FEF08A;
                }

                .yt-badge {
                    background: rgba(220, 38, 38, 0.35);
                    color: #FEE2E2;
                }

                .yt-hub-banner {
                    border-color: rgba(220, 38, 38, 0.4) !important;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(220, 38, 38, 0.15) !important;
                }

                .yt-banner-backdrop {
                    background-image: radial-gradient(rgba(220, 38, 38, 0.15) 1px, transparent 1px) !important;
                }

                .yt-avatar-box {
                    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%) !important;
                    box-shadow: 0 4px 20px rgba(220, 38, 38, 0.5) !important;
                }

                .yt-banner-icon {
                    color: #FFFFFF !important;
                }

                .yt-badge-tag {
                    background: rgba(220, 38, 38, 0.2) !important;
                    border: 1px solid rgba(220, 38, 38, 0.4) !important;
                    color: #F87171 !important;
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
                    margin-bottom: 1.75rem;
                    padding-bottom: 0.85rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    flex-wrap: wrap;
                    gap: 12px;
                }

                .head-left {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .unified-badge-icon-box {
                    width: 42px;
                    height: 42px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #2e2d78 0%, #1a1954 100%);
                    border: 1px solid rgba(253, 188, 18, 0.4);
                    color: #fdbc12;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 16px rgba(46, 45, 120, 0.4);
                }

                .section-title {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0;
                }

                .section-sub {
                    font-size: 0.82rem;
                    color: #94A3B8;
                    margin: 3px 0 0 0;
                }

                .head-channel-links {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .channel-badge-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    border-radius: 50px;
                    font-size: 0.78rem;
                    font-weight: 800;
                    text-decoration: none;
                    transition: all 0.25s ease;
                }

                .channel-badge-link.ig-link {
                    background: rgba(225, 48, 108, 0.12);
                    border: 1px solid rgba(225, 48, 108, 0.35);
                    color: #F472B6;
                }

                .channel-badge-link.ig-link:hover {
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    border-color: transparent;
                    transform: translateY(-2px);
                }

                .channel-badge-link.yt-link {
                    background: rgba(220, 38, 38, 0.12);
                    border: 1px solid rgba(220, 38, 38, 0.35);
                    color: #F87171;
                }

                .channel-badge-link.yt-link:hover {
                    background: #DC2626;
                    color: #FFFFFF;
                    border-color: transparent;
                    transform: translateY(-2px);
                }

                /* EMPTY STATE */
                .no-media-empty-state {
                    text-align: center;
                    padding: 4rem 1.5rem;
                    background: rgba(17, 24, 39, 0.6);
                    border: 1px dashed rgba(255, 255, 255, 0.15);
                    border-radius: 20px;
                    color: #CBD5E1;
                    margin: 2rem 0;
                }

                .no-media-empty-state h3 {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.5rem;
                }

                .no-media-empty-state p {
                    color: #94A3B8;
                    font-size: 0.88rem;
                    margin: 0 0 1.5rem;
                }

                .reset-filters-btn {
                    padding: 8px 20px;
                    background: #2e2d78;
                    border: 1px solid rgba(253, 188, 18, 0.4);
                    color: #fdbc12;
                    font-size: 0.85rem;
                    font-weight: 800;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .reset-filters-btn:hover {
                    background: #1a1954;
                    color: #FFFFFF;
                    transform: scale(1.05);
                }

                /* =========================================================
                   UNIFIED VIDEO & REELS GRID (ALL IN ONE)
                   ========================================================= */
                .unified-video-section {
                    margin-bottom: 3.5rem;
                }

                .unified-video-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
                    gap: 1.75rem;
                }

                .unified-media-card {
                    background: rgba(17, 24, 39, 0.88);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                }

                .unified-media-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 22px 50px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(253, 188, 18, 0.2);
                }

                .unified-media-card.reel-card-type:hover {
                    border-color: rgba(225, 48, 108, 0.7);
                    box-shadow: 0 22px 50px -10px rgba(225, 48, 108, 0.35), 0 10px 30px rgba(0, 0, 0, 0.7);
                }

                .unified-media-card.youtube-card-type:hover {
                    border-color: rgba(253, 188, 18, 0.6);
                    box-shadow: 0 22px 50px -10px rgba(253, 188, 18, 0.3), 0 10px 30px rgba(0, 0, 0, 0.7);
                }

                /* Media Poster Container */
                .media-card-poster-wrap {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    background: #0B1120;
                }

                .media-card-poster-wrap.aspect-reel {
                    height: 280px;
                }

                .media-card-poster-wrap.aspect-video {
                    height: 185px;
                }

                .media-card-poster-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .unified-media-card:hover .media-card-poster-img {
                    transform: scale(1.09);
                }

                .media-poster-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(17, 24, 39, 0.98) 0%, rgba(17, 24, 39, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%);
                }

                /* Platform Badge */
                .media-platform-badge {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.68rem;
                    font-weight: 900;
                    padding: 3px 9px;
                    border-radius: 50px;
                    backdrop-filter: blur(8px);
                    z-index: 2;
                }

                .media-platform-badge.ig-badge {
                    background: rgba(225, 48, 108, 0.85);
                    color: #FFFFFF;
                    box-shadow: 0 2px 10px rgba(225, 48, 108, 0.5);
                }

                .media-platform-badge.yt-badge {
                    background: rgba(220, 38, 38, 0.9);
                    color: #FFFFFF;
                    box-shadow: 0 2px 10px rgba(220, 38, 38, 0.5);
                }

                /* Audio / Duration tags */
                .media-audio-tag, .media-duration-tag {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0, 0, 0, 0.75);
                    backdrop-filter: blur(6px);
                    color: #E2E8F0;
                    font-size: 0.65rem;
                    font-weight: 700;
                    padding: 3px 8px;
                    border-radius: 6px;
                    max-width: 120px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    z-index: 2;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                /* Hover Play Overlay */
                .media-hover-play-layer {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    z-index: 3;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .unified-media-card:hover .media-hover-play-layer {
                    opacity: 1;
                }

                .media-play-glow-circle {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: scale(0.85);
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .media-play-glow-circle.ig-glow {
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    box-shadow: 0 0 28px rgba(225, 48, 108, 0.95);
                }

                .media-play-glow-circle.yt-glow {
                    background: #DC2626;
                    box-shadow: 0 0 28px rgba(239, 68, 68, 0.95);
                }

                .unified-media-card:hover .media-play-glow-circle {
                    transform: scale(1.15);
                }

                .play-triangle-center {
                    margin-left: 3px;
                }

                .media-tap-play-hint {
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(8px);
                    color: #FFFFFF;
                    font-size: 0.72rem;
                    font-weight: 800;
                    padding: 3px 10px;
                    border-radius: 50px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                /* Bottom stats inside poster */
                .media-poster-bottom-stats {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    right: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    z-index: 2;
                }

                .stat-pill {
                    display: inline-flex;
                    align-items: center;
                    background: rgba(0, 0, 0, 0.68);
                    backdrop-filter: blur(4px);
                    color: #E2E8F0;
                    font-size: 0.7rem;
                    font-weight: 800;
                    padding: 2px 7px;
                    border-radius: 5px;
                }

                /* Media Card Info Body */
                .media-card-info-body {
                    padding: 1.15rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .media-meta-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }

                .media-cat-badge {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #fdbc12;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .media-date-text {
                    font-size: 0.7rem;
                    color: #94A3B8;
                    display: flex;
                    align-items: center;
                }

                .media-card-title {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 0.45rem;
                    line-height: 1.35;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.2s ease;
                }

                .unified-media-card:hover .media-card-title {
                    color: #fdbc12;
                }

                .media-card-desc {
                    color: #94A3B8;
                    font-size: 0.78rem;
                    line-height: 1.45;
                    margin: 0 0 0.85rem;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .media-card-action-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 0.75rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .media-play-trigger-text {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    color: #fdbc12;
                    font-size: 0.78rem;
                    font-weight: 800;
                    transition: transform 0.2s ease;
                }

                .unified-media-card:hover .media-play-trigger-text {
                    transform: translateX(3px);
                }

                .media-source-handle {
                    font-size: 0.72rem;
                    color: #64748B;
                    font-weight: 700;
                }

                /* =========================================================
                   UNIFIED IN-SITE MEDIA PLAYER MODAL
                   ========================================================= */
                .unified-media-modal-backdrop {
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

                .media-modal-shade {
                    position: absolute;
                    inset: 0;
                    background: rgba(3, 7, 18, 0.95);
                    backdrop-filter: blur(18px);
                }

                /* =========================================================
                   MODAL DIALOG: 2-COLUMN SPLIT LAYOUT (LEFT VIDEO, RIGHT DETAILS)
                   ========================================================= */
                .unified-media-dialog {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    background: #0B1120;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.95);
                    margin: auto;
                    color: #FFFFFF;
                    display: grid;
                    max-height: 88vh;
                }

                .unified-media-dialog.youtube-dialog-split {
                    max-width: 1060px;
                    grid-template-columns: 1.45fr 1fr;
                    border: 1px solid rgba(220, 38, 38, 0.45);
                    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.95), 0 0 45px rgba(220, 38, 38, 0.25);
                }

                /* Left Column: Player */
                .split-dialog-left-player {
                    background: #000000;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100%;
                }

                .split-youtube-player-wrap {
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000000;
                    position: relative;
                }

                .split-youtube-iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    display: block;
                }

                /* Right Column: Details Sheet */
                .split-dialog-right-details {
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(180deg, #0F172A 0%, #090E1A 100%);
                    border-left: 1px solid rgba(255, 255, 255, 0.08);
                    overflow-y: auto;
                    max-height: 88vh;
                    padding: 1.5rem 1.75rem;
                    gap: 1.25rem;
                }

                .split-details-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    flex-shrink: 0;
                }

                .dialog-brand-box {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .ig-brand-icon {
                    color: #E1306C;
                }

                .yt-brand-icon {
                    color: #EF4444;
                }

                .dialog-brand-handle {
                    font-size: 0.9rem;
                    font-weight: 800;
                    color: #FFFFFF;
                }

                .dialog-type-tag {
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 2px 7px;
                    border-radius: 50px;
                }

                .ig-type-tag {
                    background: rgba(225, 48, 108, 0.25);
                    color: #FCE7F3;
                    border: 1px solid rgba(225, 48, 108, 0.4);
                }

                .yt-type-tag {
                    background: rgba(220, 38, 38, 0.25);
                    color: #FEE2E2;
                    border: 1px solid rgba(220, 38, 38, 0.4);
                }

                .dialog-cat-pill {
                    background: rgba(253, 188, 18, 0.15);
                    color: #fdbc12;
                    font-size: 0.68rem;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 50px;
                    border: 1px solid rgba(253, 188, 18, 0.3);
                }

                .dialog-close-btn {
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
                    transition: all 0.2s ease;
                }

                .dialog-close-btn:hover {
                    background: #EF4444;
                    color: #FFFFFF;
                    border-color: #EF4444;
                }

                /* Details Body */
                .split-details-body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.15rem;
                    flex: 1;
                }

                .dialog-media-title {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.4;
                    margin: 0;
                }

                .dialog-stats-pills {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .dialog-stat-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #CBD5E1;
                    font-size: 0.72rem;
                    font-weight: 700;
                    padding: 3px 8px;
                    border-radius: 6px;
                }

                .dialog-stat-item.audio-track-item {
                    background: rgba(253, 188, 18, 0.12);
                    border-color: rgba(253, 188, 18, 0.3);
                    color: #FEF08A;
                }

                .split-caption-block {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 0.25rem;
                }

                .split-caption-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: #fdbc12;
                    margin: 0;
                }

                .dialog-caption-box {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                    padding: 1rem 1.15rem;
                    max-height: 220px;
                    overflow-y: auto;
                }

                .dialog-caption-text {
                    font-size: 0.88rem;
                    color: #CBD5E1;
                    line-height: 1.6;
                    margin: 0;
                    white-space: pre-wrap;
                }

                /* Details Footer */
                .split-details-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    flex-shrink: 0;
                    flex-wrap: wrap;
                }

                .dialog-external-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.65rem 1.25rem;
                    border-radius: 50px;
                    font-size: 0.82rem;
                    font-weight: 800;
                    text-decoration: none;
                    transition: transform 0.2s ease;
                }

                .dialog-external-btn.ig-ext-btn {
                    background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%);
                    color: #FFFFFF;
                    box-shadow: 0 4px 14px rgba(225, 48, 108, 0.4);
                }

                .dialog-external-btn.yt-ext-btn {
                    background: #DC2626;
                    color: #FFFFFF;
                    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);
                }

                .dialog-external-btn:hover {
                    transform: translateY(-2px);
                    color: #FFFFFF;
                }

                .dialog-dismiss-pill {
                    padding: 0.65rem 1.25rem;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 50px;
                    color: #CBD5E1;
                    font-size: 0.82rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .dialog-dismiss-pill:hover {
                    background: rgba(255, 255, 255, 0.16);
                    color: #FFFFFF;
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

                /* LIGHTBOX OVERLAY */
                .fullscreen-lightbox-overlay {
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

                .lightbox-backdrop-shade {
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

                @media (max-width: 860px) {
                    .unified-media-dialog.youtube-dialog-split {
                        grid-template-columns: 1fr;
                        max-height: 90vh;
                        overflow-y: auto;
                    }
                    .split-dialog-left-player {
                        min-height: unset;
                    }
                    .split-youtube-player-wrap,
                    .split-youtube-iframe {
                        aspect-ratio: 16 / 9;
                        width: 100%;
                        height: auto;
                        min-height: unset;
                    }
                    .split-dialog-right-details {
                        border-left: none;
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                        max-height: none;
                        padding: 1.25rem 1.25rem;
                    }
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
                    .unified-video-grid {
                        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    }
                }

                @media (max-width: 600px) {
                    .gallery-main-container {
                        padding: 2.5rem 1rem 4.5rem;
                    }
                    .instagram-posts-grid, .albums-grid {
                        grid-template-columns: 1fr;
                    }
                    .unified-video-grid {
                        grid-template-columns: 1fr;
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
