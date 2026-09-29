import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaBullhorn,
    FaExternalLinkAlt,
    FaTimes,
    FaArrowRight,
    FaFilePdf,
    FaBell,
    FaFire,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import API_BASE_URL from '../api';

// Realistic fallback dataset with full details
const FALLBACK_NEWS_EVENTS = [
    {
        _id: "news-001",
        title: "National Level AI & Web3 Hackathon 2026 - Registrations Open",
        date: "2026-03-25",
        time: "09:00 AM - 05:00 PM",
        venue: "EASA Innovation Center & Idea Lab",
        category: "Event",
        badge: "FLAGSHIP EVENT",
        isFeatured: true,
        desc: "Join us for a 36-hour national hackathon on Artificial Intelligence, Edge Computing, and Web3 innovation. ₹2,50,000 cash prize pool.",
        description: "Join us for a 36-hour national hackathon on Artificial Intelligence, Edge Computing, and Web3 innovation. ₹2,50,000 cash prize pool with top industry mentors from Google, Microsoft, and Zoho.",
        content: "EASA College of Engineering and Technology proudly announces the National Level Hackathon 2026! Participants from engineering institutions across India will converge to solve real-world problems in HealthTech, Smart Cities, Sustainable Energy, and Generative AI. Winners will receive direct internship offers, mentorship from incubator leaders, and ₹2.5 Lakhs in cash prizes.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
        link: "/idea-lab",
        pdf_url: "",
        highlights: ["₹2,50,000 Prize Pool", "36-Hour Non-Stop Coding", "Direct Internship Opportunities"]
    },
    {
        _id: "news-002",
        title: "Annual Mega Cultural Extravaganza 'DHRUVA 2026' - Schedule Announced",
        date: "2026-03-18",
        time: "10:00 AM Onwards",
        venue: "EASA Central Amphitheatre",
        category: "Event",
        badge: "MEGA FEST",
        isFeatured: true,
        desc: "Celebrate youth, artistry, and passion at EASA's signature cultural extravaganza featuring celebrity performances and 40+ inter-collegiate events.",
        description: "Celebrate youth, artistry, and passion at EASA's signature cultural extravaganza featuring celebrity performances, pro-shows, battle of the bands, and over 40 inter-collegiate competitive events.",
        content: "DHRUVA 2026 is back with an exhilarating 3-day lineup of music, dance, theater, fashion shows, and culinary contests. Top artists and playback singers will headline the celebrity nights. Don't miss out on the biggest celebration of talent in South India.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
        link: "",
        pdf_url: "",
        highlights: ["Celebrity Live Concert", "40+ College Teams", "3 Days of Festivities"]
    },
    {
        _id: "news-003",
        title: "Campus Placement Conclave 2026 - Record 94% Placement Conversion",
        date: "2026-02-28",
        time: "08:30 AM - 04:30 PM",
        venue: "Placement Auditorium & Seminar Hall 1",
        category: "Placement",
        badge: "PLACEMENTS",
        isFeatured: true,
        desc: "Over 45+ premier technology companies including Amazon, TCS, Infosys, Zoho, and Bosch conducted intensive on-campus hiring drives.",
        description: "Over 45+ premier technology companies including Amazon, TCS, Infosys, Zoho, and Bosch conducted intensive on-campus hiring drives offering record CTC packages up to 24 LPA.",
        content: "The Centre for Career Development is thrilled to report over 94% placement conversion in the current recruitment cycle. Students have secured coveted roles in Software Engineering, Cloud Architecture, Embedded Systems, and Data Science.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        link: "/placement",
        pdf_url: "",
        highlights: ["Highest CTC: 24 LPA", "45+ Top Recruiters", "94% Placement Rate"]
    },
    {
        _id: "news-004",
        title: "Autonomous Curriculum & Regulation 2026 Framework Approved",
        date: "2026-02-15",
        time: "11:00 AM - 01:00 PM",
        venue: "Academic Council Boardroom",
        category: "Circular",
        badge: "ACADEMICS",
        isFeatured: false,
        desc: "The Academic Council has approved the forward-looking 2026 Autonomous Regulation featuring industry-aligned minors.",
        description: "The Academic Council has approved the forward-looking 2026 Autonomous Regulation featuring industry-aligned minors in AI, Robotics, Cyber Security, and EV Technologies.",
        content: "Under the Autonomous mandate, curricula for all UG and PG branches have been updated to integrate mandatory industrial internships, project-based learning credits, and AICTE Model Curriculum recommendations.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
        link: "/syllabus",
        pdf_url: "",
        highlights: ["Mandatory Internships", "Industry 4.0 Minors", "Choice Based Credit System"]
    },
    {
        _id: "news-005",
        title: "IEEE International Conference on Smart Grid & Sustainable Technologies",
        date: "2026-02-10",
        time: "09:30 AM - 04:30 PM",
        venue: "Dr. APJ Abdul Kalam Auditorium",
        category: "Event",
        badge: "CONFERENCE",
        isFeatured: false,
        desc: "Global delegates and researchers from 12 countries present over 120 peer-reviewed papers on clean energy conversion.",
        description: "Global delegates and researchers from 12 countries present over 120 peer-reviewed papers on clean energy conversion and intelligent micro-grids.",
        content: "Organized in collaboration with IEEE Madras Section, this international conference explores breakthrough research in EV charging infrastructures, IoT sensor telemetry, and renewable micro-grid stability.",
        image: "https://images.unsplash.com/photo-1515378960530-7bea60bd14d2?q=80&w=1000&auto=format&fit=crop",
        link: "",
        pdf_url: "",
        highlights: ["120+ Research Papers", "Delegates from 12 Nations", "Scopus Indexed Proceedings"]
    },
    {
        _id: "news-006",
        title: "Anna University Inter-Collegiate Athletics Championship Victory",
        date: "2026-02-04",
        time: "04:00 PM - 07:00 PM",
        venue: "EASA Sports Complex",
        category: "News",
        badge: "SPORTS",
        isFeatured: false,
        desc: "EASA College athletes bagged 8 Gold and 5 Silver medals at the Anna University Zone Athletics Meet.",
        description: "EASA College athletes bagged 8 Gold and 5 Silver medals at the Anna University Zone Athletics Meet, securing the Overall Runners Trophy.",
        content: "Hearty congratulations to our track and field champions! The 4x100m relay squad set a new zonal record, while our Badminton and Volleyball squads qualified for the South Zone Inter-University trials.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
        link: "",
        pdf_url: "",
        highlights: ["8 Gold & 5 Silver Medals", "Zonal Record in 4x100m", "Overall Runners Trophy"]
    },
    {
        _id: "news-007",
        title: "End Semester Examinations Schedule & Hall Ticket Portal Released",
        date: "2026-01-28",
        time: "10:00 AM - 01:00 PM",
        venue: "Office of the Controller of Examinations",
        category: "Circular",
        badge: "EXAM CELL",
        isFeatured: false,
        desc: "Students can now download their authenticated Hall Tickets from the COE Student ERP portal.",
        description: "Students can now download their authenticated Hall Tickets from the COE Student ERP portal. Check time tables and seating allocations.",
        content: "The Controller of Examinations has officially released the detailed time schedule for the upcoming Semester Examinations. Students must download hall tickets and carry their official college identity cards.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
        link: "/result-passing-board",
        pdf_url: "",
        highlights: ["ERP Portal Live", "Strict Examination Guidelines", "COE Helpdesk Active"]
    },
    {
        _id: "news-008",
        title: "Inauguration of Advanced Robotics & AI IDEA Lab with DST Grant",
        date: "2026-01-20",
        time: "10:30 AM - 12:30 PM",
        venue: "Tech Park 2nd Floor",
        category: "News",
        badge: "INNOVATION",
        isFeatured: false,
        desc: "A state-of-the-art ₹1.2 Crore AICTE IDEA Lab dedicated to additive manufacturing and humanoid robotics commissioned.",
        description: "A state-of-the-art ₹1.2 Crore AICTE IDEA Lab dedicated to additive manufacturing, humanoid robotics, and edge compute officially commissioned.",
        content: "The IDEA Lab features industrial 3D printers, CNC laser engravers, robotic manipulator arms, and high-performance GPU workstations for student startup prototyping.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
        link: "/idea-lab",
        pdf_url: "",
        highlights: ["₹1.2 Cr AICTE Grant", "Industrial 3D Printers", "Open 24/7 for Student Startups"]
    }
];

const CATEGORIES = [
    { key: 'ALL', label: 'All Highlights' },
    { key: 'Event', label: 'Events & Fests' },
    { key: 'Circular', label: 'Official Circulars' },
    { key: 'Placement', label: 'Placements' },
    { key: 'News', label: 'Campus News' }
];

// Intelligently map categories even from legacy 'general', 'admin', or other variations
const normalizeCategory = (cat, title = '', desc = '') => {
    const raw = (cat || '').trim().toLowerCase();
    if (raw === 'event' || raw === 'events' || raw === 'fest' || raw === 'fests') return 'Event';
    if (raw === 'circular' || raw === 'circulars' || raw === 'notice' || raw === 'notices') return 'Circular';
    if (raw === 'placement' || raw === 'placements' || raw === 'career' || raw === 'careers') return 'Placement';
    if (raw === 'news' || raw === 'campus news' || raw === 'update' || raw === 'updates') return 'News';

    // Auto-categorize based on title/desc keywords if legacy label like 'general' / 'admin'
    const text = `${title} ${desc}`.toLowerCase();
    if (text.includes('placement') || text.includes('recruit') || text.includes('internship') || text.includes('hiring') || text.includes('drive') || text.includes('ctc') || text.includes('package')) {
        return 'Placement';
    }
    if (text.includes('circular') || text.includes('exam') || text.includes('hall ticket') || text.includes('regulation') || text.includes('portal') || text.includes('semester') || text.includes('syllabus') || text.includes('timetable') || text.includes('time table') || text.includes('academic council')) {
        return 'Circular';
    }
    if (text.includes('research') || text.includes('paper') || text.includes('journal') || text.includes('publication') || text.includes('grant') || text.includes('ranking') || text.includes('mou') || text.includes('achievement') || text.includes('award') || text.includes('inauguration') || text.includes('idea lab')) {
        return 'News';
    }
    if (text.includes('hackathon') || text.includes('fest') || text.includes('conference') || text.includes('workshop') || text.includes('symposium') || text.includes('event') || text.includes('conclave') || text.includes('talk') || text.includes('championship') || text.includes('sports') || text.includes('athletics')) {
        return 'Event';
    }
    return 'News';
};

const NewsEventsSection = () => {
    const [newsData, setNewsData] = useState(FALLBACK_NEWS_EVENTS);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [spotlightIndex, setSpotlightIndex] = useState(0);
    const [isAutoRotate, setIsAutoRotate] = useState(true);

    // Fetch live announcements from backend
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/news-events`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map((item, idx) => {
                        const resolvedCategory = normalizeCategory(item.category, item.title, item.desc || item.description);
                        const defaultBadge = resolvedCategory === 'Event' ? 'EVENT' : resolvedCategory === 'Placement' ? 'PLACEMENTS' : resolvedCategory === 'Circular' ? 'CIRCULAR' : 'CAMPUS NEWS';
                        return {
                            _id: item._id || `backend-${idx}`,
                            title: item.title || 'Campus Announcement',
                            date: item.date ? (item.date.includes('T') ? item.date.split('T')[0] : item.date) : '2026-03-01',
                            time: item.time || (resolvedCategory === 'Event' ? '09:30 AM - 04:30 PM' : resolvedCategory === 'Circular' ? '10:00 AM - 01:00 PM' : resolvedCategory === 'Placement' ? '08:30 AM - 04:30 PM' : '10:00 AM'),
                            venue: item.venue || (resolvedCategory === 'Placement' ? 'Placement Cell' : resolvedCategory === 'Event' ? 'EASA Auditorium' : resolvedCategory === 'Circular' ? 'Office of the COE' : 'EASA Campus'),
                            category: resolvedCategory,
                            badge: item.badge && !['general', 'admin'].includes(item.badge.toLowerCase()) ? item.badge : defaultBadge,
                            isFeatured: item.isFeatured !== undefined ? item.isFeatured : (idx < 3),
                            desc: item.desc || item.description || '',
                            description: item.description || item.desc || '',
                            content: item.content || item.desc || item.description || '',
                            image: item.image || FALLBACK_NEWS_EVENTS[idx % FALLBACK_NEWS_EVENTS.length].image,
                            link: item.link || '',
                            pdf_url: item.pdf_url || '',
                            highlights: item.highlights || ["Verified Announcement", "EASA Campus", "Official Notice"]
                        };
                    });
                    setNewsData(formatted);
                }
            })
            .catch(() => {
                // Fallback remains active
            });
    }, []);

    // Filtered data based on category
    const filteredItems = newsData.filter(item => {
        return activeCategory === 'ALL' || item.category?.toLowerCase() === activeCategory.toLowerCase();
    });

    // Spotlight flagship events
    const spotlightItems = newsData.filter(item => item.isFeatured || item.category === 'Event' || item.image);
    const featuredList = spotlightItems.length > 0 ? spotlightItems : newsData;

    // Auto rotate spotlight
    useEffect(() => {
        if (!isAutoRotate || featuredList.length <= 1) return;
        const interval = setInterval(() => {
            setSpotlightIndex(prev => (prev + 1) % featuredList.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoRotate, featuredList.length]);

    // Prevent body scroll when event detail modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedItem]);

    const currentSpotlight = featuredList[spotlightIndex] || featuredList[0] || newsData[0];

    const formatDate = (dateStr) => {
        if (!dateStr) return { day: '25', month: 'MAR', year: '2026', full: 'Mar 25, 2026' };
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return { day: '25', month: 'MAR', year: '2026', full: dateStr };
            const day = d.getDate().toString().padStart(2, '0');
            const month = d.toLocaleDateString(undefined, { month: 'short' }).toUpperCase();
            const year = d.getFullYear();
            const full = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
            return { day, month, year, full };
        } catch {
            return { day: '25', month: 'MAR', year: '2026', full: dateStr };
        }
    };

    const getCategoryBadgeClass = (category) => {
        const cat = (category || '').toLowerCase();
        if (cat.includes('event')) return 'cat-badge-event';
        if (cat.includes('circular')) return 'cat-badge-circular';
        if (cat.includes('placement')) return 'cat-badge-placement';
        return 'cat-badge-news';
    };

    // Render a single card component
    const renderCard = (item, uniqueKey) => {
        const dateObj = formatDate(item.date);
        const badgeClass = getCategoryBadgeClass(item.category);
        return (
            <div
                key={uniqueKey}
                className="news-card-compact"
                onClick={() => setSelectedItem(item)}
            >
                {/* Card Image Area */}
                <div className="card-thumb-box">
                    <img
                        src={item.image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"}
                        alt={item.title}
                        className="card-thumb-img"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80";
                        }}
                    />
                    <div className="card-thumb-shade" />

                    {/* Floating Date Pod */}
                    <div className="card-date-pod">
                        <span className="date-day">{dateObj.day}</span>
                        <span className="date-month">{dateObj.month}</span>
                    </div>

                    {/* Category Tag */}
                    <span className={`card-tag-pill ${badgeClass}`}>
                        {item.category || 'General'}
                    </span>
                </div>

                {/* Card Body */}
                <div className="card-body-compact">
                    {/* Time & Venue Particulars */}
                    <div className="card-quick-meta">
                        {item.time && (
                            <span className="card-time-highlight">
                                <FaClock size={11} className="time-icon" />
                                <span>{item.time}</span>
                            </span>
                        )}
                        {item.venue && (
                            <span className="card-venue-txt venue-ellipsis" title={item.venue}>
                                <FaMapMarkerAlt size={10} style={{ color: '#94A3B8', marginRight: '3px' }} />
                                {item.venue}
                            </span>
                        )}
                    </div>

                    <h4 className="card-title-compact" title={item.title}>
                        {item.title}
                    </h4>

                    <p className="card-desc-compact">
                        {item.desc || item.description}
                    </p>

                    {/* Card Footer */}
                    <div className="card-action-strip">
                        <span className="card-read-link">
                            <span>Read Notice</span>
                            <FaArrowRight size={10} className="card-arrow" />
                        </span>

                        {item.pdf_url && (
                            <span className="card-pdf-pill" title="PDF Attachment">
                                <FaFilePdf size={11} style={{ color: '#EF4444' }} />
                                <span>PDF</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="news-portal-section" id="news-events">
            {/* Ambient Lighting Gradients */}
            <div className="news-ambient-backdrop">
                <div className="ambient-blob blob-gold" />
                <div className="ambient-blob blob-navy" />
                <div className="ambient-grid-overlay" />
            </div>

            <div className="news-main-container">

                {/* 1. TOP LIVE TICKER TAPE (FAST SMOOTH MARQUEE) */}
                <div className="breaking-ticker-tape">
                    <div className="ticker-label">
                        <FaFire className="ticker-fire-icon" />
                        <span>CAMPUS LIVE</span>
                    </div>
                    <div className="ticker-marquee-wrapper">
                        <div className="ticker-marquee-track">
                            {newsData.concat(newsData).map((item, idx) => {
                                const dObj = formatDate(item.date);
                                return (
                                    <div
                                        key={`ticker-${idx}`}
                                        className="ticker-item"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <span className="ticker-item-dot">•</span>
                                        <span className="ticker-item-cat">[{item.category || 'UPDATE'}]</span>
                                        <span className="ticker-item-title">{item.title}</span>
                                        {item.time && <span className="ticker-item-time">⏰ {item.time}</span>}
                                        <span className="ticker-item-date">({dObj.full})</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 2. SECTION HEADER */}
                <div className="news-header-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="news-pill-tag"
                    >
                        <span className="live-radar-ping">
                            <span className="ping-wave"></span>
                            <span className="ping-dot"></span>
                        </span>
                        <span>CAMPUS PULSE & HAPPENINGS</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="news-heading-title"
                    >
                        News, Circulars & <span className="gold-shimmer-text">Live Events</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="news-heading-subtitle"
                    >
                        Stay updated with our academic breakthroughs, official circulars, student fests, and career drives.
                    </motion.p>
                </div>

                {/* 3. HERO SPOTLIGHT CAROUSEL BANNER */}
                <div
                    className="spotlight-showcase-wrapper"
                    onMouseEnter={() => setIsAutoRotate(false)}
                    onMouseLeave={() => setIsAutoRotate(true)}
                >
                    <div className="spotlight-compact-frame">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSpotlight._id || spotlightIndex}
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="spotlight-inner-grid"
                            >
                                {/* Spotlight Visual with Overlay */}
                                <div className="spotlight-media-wrap">
                                    <img
                                        src={currentSpotlight.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"}
                                        alt={currentSpotlight.title}
                                        className="spotlight-img"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80";
                                        }}
                                    />
                                    <div className="spotlight-media-gradient" />

                                    {/* Corner Badge */}
                                    <div className="spotlight-tags-float">
                                        <span className={`spotlight-badge-pill ${getCategoryBadgeClass(currentSpotlight.category)}`}>
                                            {currentSpotlight.badge || currentSpotlight.category || 'SPOTLIGHT'}
                                        </span>
                                    </div>

                                    {/* Prev/Next Smooth Controls */}
                                    <button
                                        type="button"
                                        className="spotlight-arrow-btn spot-prev"
                                        onClick={() => setSpotlightIndex(prev => (prev - 1 + featuredList.length) % featuredList.length)}
                                        aria-label="Previous Featured Event"
                                    >
                                        <FaChevronLeft size={11} />
                                    </button>
                                    <button
                                        type="button"
                                        className="spotlight-arrow-btn spot-next"
                                        onClick={() => setSpotlightIndex(prev => (prev + 1) % featuredList.length)}
                                        aria-label="Next Featured Event"
                                    >
                                        <FaChevronRight size={11} />
                                    </button>
                                </div>

                                {/* Spotlight Content */}
                                <div className="spotlight-content-wrap">
                                    <div className="spotlight-kicker-line">
                                        <span className="kicker-star">★</span>
                                        <span>FEATURED CAMPUS HIGHLIGHT</span>
                                        <span className="spotlight-kicker-date">
                                            <FaCalendarAlt size={10} style={{ color: '#FCCA26', marginRight: '4px' }} />
                                            {formatDate(currentSpotlight.date).full}
                                        </span>
                                    </div>

                                    <h3 className="spotlight-title-compact" title={currentSpotlight.title}>
                                        {currentSpotlight.title}
                                    </h3>

                                    <div className="spotlight-chips-row">
                                        {currentSpotlight.time && (
                                            <span className="spot-meta-chip time-chip">
                                                <FaClock size={11} style={{ color: '#FCCA26' }} />
                                                <span>{currentSpotlight.time}</span>
                                            </span>
                                        )}
                                        {currentSpotlight.venue && (
                                            <span className="spot-meta-chip">
                                                <FaMapMarkerAlt size={11} style={{ color: '#FCCA26' }} />
                                                <span>{currentSpotlight.venue}</span>
                                            </span>
                                        )}
                                    </div>

                                    <p className="spotlight-desc-compact">
                                        {currentSpotlight.desc || currentSpotlight.description}
                                    </p>

                                    {/* Action Row with Two-Door Sliding Glass Button */}
                                    <div className="spotlight-btn-row">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedItem(currentSpotlight)}
                                            className="door-glass-btn spot-action-btn"
                                        >
                                            <div className="door-door-left"></div>
                                            <div className="door-door-right"></div>
                                            <div className="door-glass-shine"></div>
                                            <span className="door-btn-text">
                                                Explore Full Event & Schedule
                                                <FaArrowRight size={11} style={{ marginLeft: '6px' }} />
                                            </span>
                                        </button>

                                        {currentSpotlight.link && (
                                            <a
                                                href={currentSpotlight.link}
                                                className="spot-secondary-link"
                                            >
                                                <FaExternalLinkAlt size={10} />
                                                <span>Visit Page</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Smooth Sleek Carousel Dots */}
                    <div className="spotlight-sleek-dots">
                        {featuredList.slice(0, 6).map((item, idx) => (
                            <button
                                key={`spot-dot-${idx}`}
                                type="button"
                                onClick={() => setSpotlightIndex(idx)}
                                className={`sleek-dot-item ${spotlightIndex === idx ? 'active' : ''}`}
                                aria-label={`Slide ${idx + 1}`}
                            >
                                <span className="sleek-dot-pill"></span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. CLEAN CATEGORY FILTER PILLS */}
                <div className="news-cat-filter-wrapper">
                    <div className="news-cat-pills">
                        {CATEGORIES.map(cat => {
                            const count = cat.key === 'ALL'
                                ? newsData.length
                                : newsData.filter(i => i.category?.toLowerCase() === cat.key.toLowerCase()).length;
                            return (
                                <button
                                    key={cat.key}
                                    type="button"
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`cat-pill-btn ${activeCategory === cat.key ? 'active' : ''}`}
                                >
                                    <span>{cat.label}</span>
                                    <span className="cat-count-badge">{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 5. CARDS DISPLAY: STATIC (1-4 ITEMS) OR SMOOTH AUTO-SCROLLING LOOP (5+ ITEMS) */}
                {filteredItems.length === 0 ? (
                    <div className="news-empty-state">
                        <div className="empty-icon-circle">
                            <FaBullhorn size={24} />
                        </div>
                        <h3>No Announcements Found</h3>
                        <p>No notices available in this category. Click below to view all highlights.</p>
                        <button
                            type="button"
                            onClick={() => setActiveCategory('ALL')}
                            className="door-glass-btn"
                            style={{ margin: '1rem auto 0', padding: '0.55rem 1.4rem', width: 'auto', display: 'inline-flex' }}
                        >
                            <span className="door-btn-text">Reset to All Highlights</span>
                        </button>
                    </div>
                ) : filteredItems.length <= 4 ? (
                    /* STATIC CENTERED DISPLAY (1 to 4 CARDS: STAY STATIONARY, DO NOT SCROLL) */
                    <div className="cards-static-container">
                        {filteredItems.map((item, idx) => renderCard(item, `static-${item._id || idx}`))}
                    </div>
                ) : (
                    /* CONTINUOUS SEAMLESS MARQUEE (5+ CARDS: SMOOTH INFINITE LOOP) */
                    <div className="cards-marquee-viewport">
                        <div className="cards-marquee-track">
                            {/* Group 1 */}
                            <div className="cards-marquee-group">
                                {filteredItems.map((item, idx) => renderCard(item, `g1-${item._id || idx}`))}
                            </div>
                            {/* Group 2 (Duplicate for seamless infinite loop) */}
                            <div className="cards-marquee-group" aria-hidden="true">
                                {filteredItems.map((item, idx) => renderCard(item, `g2-${item._id || idx}`))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* 6. POPUP DETAIL MODAL (PORTAL TO DOCUMENT.BODY FOR ABSOLUTE VIEWPORT CENTERING) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedItem && (
                        <div
                            className="news-lightbox-overlay"
                            onClick={() => setSelectedItem(null)}
                            role="dialog"
                            aria-modal="true"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                                className="news-lightbox-dialog-landscape"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button Top-Right */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="lightbox-corner-close-btn"
                                    aria-label="Close Announcement Dialog"
                                >
                                    <FaTimes size={13} />
                                </button>

                                {/* LEFT PANEL: Visual Banner & Quick Info */}
                                <div className="lightbox-left-panel">
                                    {selectedItem.image && (
                                        <div className="lightbox-left-image-wrap">
                                            <img
                                                src={selectedItem.image}
                                                alt={selectedItem.title}
                                                className="lightbox-left-img"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                            <div className="lightbox-img-shade" />
                                            <span className={`modal-cat-tag floating-cat-tag ${getCategoryBadgeClass(selectedItem.category)}`}>
                                                {selectedItem.category || 'Announcement'}
                                            </span>
                                        </div>
                                    )}

                                    <div className="lightbox-left-meta-stack">
                                        {selectedItem.date && (
                                            <div className="left-meta-row">
                                                <div className="left-meta-icon"><FaCalendarAlt /></div>
                                                <div>
                                                    <span className="left-meta-label">Date</span>
                                                    <span className="left-meta-val">{formatDate(selectedItem.date).full}</span>
                                                </div>
                                            </div>
                                        )}
                                        {selectedItem.time && (
                                            <div className="left-meta-row">
                                                <div className="left-meta-icon"><FaClock /></div>
                                                <div>
                                                    <span className="left-meta-label">Time & Schedule</span>
                                                    <span className="left-meta-val" style={{ color: '#FCCA26' }}>{selectedItem.time}</span>
                                                </div>
                                            </div>
                                        )}
                                        {selectedItem.venue && (
                                            <div className="left-meta-row">
                                                <div className="left-meta-icon"><FaMapMarkerAlt /></div>
                                                <div>
                                                    <span className="left-meta-label">Venue</span>
                                                    <span className="left-meta-val">{selectedItem.venue}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {selectedItem.pdf_url && (
                                        <a
                                            href={selectedItem.pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-left-pdf"
                                        >
                                            <FaFilePdf size={12} />
                                            <span>Download PDF Circular</span>
                                        </a>
                                    )}
                                </div>

                                {/* RIGHT PANEL: Title, Description, Highlights, Actions */}
                                <div className="lightbox-right-panel">
                                    <div className="right-panel-header">
                                        <div className="right-tags-row">
                                            <span className={`modal-cat-tag ${getCategoryBadgeClass(selectedItem.category)}`}>
                                                {selectedItem.category || 'Notice'}
                                            </span>
                                            {selectedItem.badge && (
                                                <span className="modal-badge-special">
                                                    {selectedItem.badge}
                                                </span>
                                            )}
                                            <span className="right-date-badge">
                                                <FaCalendarAlt size={10} style={{ color: '#FCCA26', marginRight: '4px' }} />
                                                {formatDate(selectedItem.date).full}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="right-panel-title">
                                        {selectedItem.title}
                                    </h3>

                                    <div className="right-panel-body-text">
                                        <p className="right-panel-desc">
                                            {selectedItem.content || selectedItem.description || selectedItem.desc}
                                        </p>

                                        {selectedItem.highlights && (
                                            <div className="right-highlights-box">
                                                <span className="right-hl-title">Highlights:</span>
                                                <div className="right-hl-pills">
                                                    {selectedItem.highlights.map((h, i) => (
                                                        <span key={i} className="right-hl-item">
                                                            <span className="hl-star">✦</span>
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="right-notice-strip">
                                            <FaBell style={{ color: '#FCCA26', flexShrink: 0, marginTop: '2px' }} />
                                            <span>Candidates & students are requested to report on time. For details, contact the office.</span>
                                        </div>
                                    </div>

                                    <div className="right-panel-actions">
                                        {selectedItem.link && (
                                            <a
                                                href={selectedItem.link}
                                                className="btn-right-portal"
                                            >
                                                <FaExternalLinkAlt size={11} />
                                                <span>Event Page</span>
                                            </a>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => setSelectedItem(null)}
                                            className="btn-right-close"
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

            {/* STYLES */}
            <style>{`
                .news-portal-section {
                    position: relative;
                    padding: 3rem 1.25rem 4.5rem;
                    background: #090D16;
                    color: #FFFFFF;
                    overflow: hidden;
                    font-family: inherit;
                }

                .news-ambient-backdrop {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .ambient-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(140px);
                    opacity: 0.12;
                }

                .blob-gold {
                    top: -5%;
                    right: -5%;
                    width: 450px;
                    height: 450px;
                    background: #FCCA26;
                }

                .blob-navy {
                    bottom: 0%;
                    left: -5%;
                    width: 550px;
                    height: 550px;
                    background: #1B2A6B;
                    opacity: 0.25;
                }

                .ambient-grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
                    background-size: 32px 32px;
                    opacity: 0.5;
                }

                .news-main-container {
                    max-width: 1360px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                /* 1. TOP BREAKING TICKER */
                .breaking-ticker-tape {
                    display: flex;
                    align-items: center;
                    background: rgba(17, 24, 39, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(252, 202, 38, 0.25);
                    border-radius: 50px;
                    padding: 4px 12px 4px 5px;
                    margin-bottom: 2.25rem;
                    overflow: hidden;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
                }

                .ticker-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
                    color: #FFFFFF;
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 0.8px;
                    padding: 5px 12px;
                    border-radius: 50px;
                    flex-shrink: 0;
                    box-shadow: 0 2px 10px rgba(220, 38, 38, 0.4);
                }

                .ticker-fire-icon {
                    color: #FEE2E2;
                    animation: flamePulse 1.2s infinite alternate;
                }

                @keyframes flamePulse {
                    from { transform: scale(1); }
                    to { transform: scale(1.2); }
                }

                .ticker-marquee-wrapper {
                    flex-grow: 1;
                    overflow: hidden;
                    margin-left: 12px;
                    mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
                }

                .ticker-marquee-track {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                    white-space: nowrap;
                    animation: tickerSlide 22s linear infinite;
                }

                .ticker-marquee-track:hover {
                    animation-play-state: paused;
                }

                @keyframes tickerSlide {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .ticker-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    font-size: 0.82rem;
                    color: #E2E8F0;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .ticker-item:hover {
                    color: #FCCA26;
                }

                .ticker-item-dot {
                    color: #FCCA26;
                    font-size: 0.9rem;
                }

                .ticker-item-cat {
                    color: #93C5FD;
                    font-weight: 700;
                    font-size: 0.72rem;
                }

                .ticker-item-title {
                    font-weight: 600;
                }

                .ticker-item-time {
                    color: #FCCA26;
                    font-size: 0.72rem;
                    font-weight: 700;
                }

                .ticker-item-date {
                    color: #64748B;
                    font-size: 0.72rem;
                }

                /* 2. SECTION HEADER */
                .news-header-center {
                    text-align: center;
                    margin-bottom: 2.25rem;
                }

                .news-pill-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(252, 202, 38, 0.1);
                    color: #FCCA26;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    padding: 5px 16px;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 0.85rem;
                }

                .live-radar-ping {
                    position: relative;
                    width: 10px;
                    height: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .ping-dot {
                    width: 6px;
                    height: 6px;
                    background: #10B981;
                    border-radius: 50%;
                    box-shadow: 0 0 6px #10B981;
                }

                .ping-wave {
                    position: absolute;
                    inset: -3px;
                    border-radius: 50%;
                    border: 1.5px solid #10B981;
                    animation: radarPing 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
                }

                @keyframes radarPing {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(2.2); opacity: 0; }
                }

                .news-heading-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 0.6rem;
                    letter-spacing: -0.5px;
                    line-height: 1.25;
                }

                .gold-shimmer-text {
                    background: linear-gradient(135deg, #FCCA26 0%, #F59E0B 50%, #FFFBEB 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .news-heading-subtitle {
                    color: #94A3B8;
                    font-size: 0.98rem;
                    max-width: 650px;
                    margin: 0 auto;
                    line-height: 1.5;
                }

                /* 3. HERO SPOTLIGHT CAROUSEL BANNER */
                .spotlight-showcase-wrapper {
                    margin-bottom: 2.25rem;
                }

                .spotlight-compact-frame {
                    background: rgba(17, 24, 39, 0.75);
                    backdrop-filter: blur(18px);
                    border: 1px solid rgba(252, 202, 38, 0.25);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px rgba(27, 42, 107, 0.25);
                    min-height: 230px;
                }

                .spotlight-inner-grid {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    min-height: 230px;
                }

                @media (max-width: 860px) {
                    .spotlight-inner-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .spotlight-media-wrap {
                    position: relative;
                    height: 100%;
                    min-height: 210px;
                    overflow: hidden;
                }

                .spotlight-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .spotlight-compact-frame:hover .spotlight-img {
                    transform: scale(1.05);
                }

                .spotlight-media-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, transparent 50%, rgba(17, 24, 39, 0.9) 100%),
                                linear-gradient(to top, #111827 0%, transparent 60%);
                }

                .spotlight-tags-float {
                    position: absolute;
                    top: 14px;
                    left: 14px;
                    z-index: 3;
                }

                .spotlight-badge-pill {
                    font-size: 0.7rem;
                    font-weight: 900;
                    padding: 4px 12px;
                    border-radius: 50px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }

                .cat-badge-event {
                    background: linear-gradient(135deg, #FCCA26 0%, #D97706 100%);
                    color: #111827;
                }

                .cat-badge-circular {
                    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                    color: #FFFFFF;
                }

                .cat-badge-placement {
                    background: linear-gradient(135deg, #10B981 0%, #047857 100%);
                    color: #FFFFFF;
                }

                .cat-badge-news {
                    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
                    color: #FFFFFF;
                }

                .spotlight-arrow-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(15, 23, 42, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    z-index: 4;
                }

                .spotlight-arrow-btn:hover {
                    background: #FCCA26;
                    color: #111827;
                    border-color: #FCCA26;
                    transform: translateY(-50%) scale(1.1);
                }

                .spotlight-arrow-btn.spot-prev { left: 10px; }
                .spotlight-arrow-btn.spot-next { right: 10px; }

                /* Spotlight Info Body */
                .spotlight-content-wrap {
                    padding: 1.35rem 1.6rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .spotlight-kicker-line {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #FCCA26;
                    font-weight: 800;
                    font-size: 0.72rem;
                    letter-spacing: 0.8px;
                    margin-bottom: 0.5rem;
                }

                .spotlight-kicker-date {
                    margin-left: auto;
                    color: #CBD5E1;
                    font-size: 0.72rem;
                    display: inline-flex;
                    align-items: center;
                }

                .kicker-star {
                    color: #FCCA26;
                    font-size: 0.85rem;
                }

                .spotlight-title-compact {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.35;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .spotlight-chips-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 0.65rem;
                }

                .spot-meta-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 3px 9px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #CBD5E1;
                }

                .spot-meta-chip.time-chip {
                    background: rgba(252, 202, 38, 0.12);
                    border-color: rgba(252, 202, 38, 0.3);
                    color: #FCCA26;
                    font-weight: 800;
                }

                .spotlight-desc-compact {
                    color: #94A3B8;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .spotlight-btn-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                /* TWO-DOOR SLIDING BUTTON */
                .door-glass-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.65rem 1.4rem;
                    border-radius: 50px;
                    border: 1px solid rgba(252, 202, 38, 0.4);
                    background: linear-gradient(135deg, #0B132B 0%, #172554 100%);
                    color: #FFFFFF;
                    font-size: 0.85rem;
                    font-weight: 800;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                    text-decoration: none;
                    z-index: 1;
                }

                .door-btn-text {
                    position: relative;
                    z-index: 4;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 800;
                    letter-spacing: 0.3px;
                    color: #FFFFFF;
                    transition: all 0.3s ease;
                }

                .door-door-left {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50.5%;
                    height: 100%;
                    background: linear-gradient(135deg, #1E40AF 0%, #2563EB 100%);
                    border-right: 1px solid rgba(255, 255, 255, 0.25);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
                    z-index: 2;
                    transform-origin: left center;
                }

                .door-door-right {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50.5%;
                    height: 100%;
                    background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
                    border-left: 1px solid rgba(255, 255, 255, 0.25);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
                    z-index: 2;
                    transform-origin: right center;
                }

                .door-glass-shine {
                    position: absolute;
                    top: -50%;
                    left: -70%;
                    width: 50%;
                    height: 200%;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.6) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    transform: rotate(25deg);
                    z-index: 3;
                    pointer-events: none;
                    transition: left 0.75s ease;
                }

                .door-glass-btn:hover {
                    background: rgba(30, 58, 138, 0.4);
                    backdrop-filter: blur(12px);
                    border-color: #FCCA26;
                    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45), 0 0 15px rgba(252, 202, 38, 0.35);
                    transform: translateY(-2px);
                }

                .door-glass-btn:hover .door-door-left {
                    transform: translateX(-100%);
                    opacity: 0.15;
                }

                .door-glass-btn:hover .door-door-right {
                    transform: translateX(100%);
                    opacity: 0.15;
                }

                .door-glass-btn:hover .door-glass-shine {
                    left: 140%;
                }

                .door-glass-btn:hover .door-btn-text {
                    color: #FCCA26;
                    text-shadow: 0 0 10px rgba(252, 202, 38, 0.5);
                }

                .spot-secondary-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0.65rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 50px;
                    color: #CBD5E1;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .spot-secondary-link:hover {
                    color: #FCCA26;
                    border-color: rgba(252, 202, 38, 0.4);
                    background: rgba(252, 202, 38, 0.08);
                }

                .spotlight-sleek-dots {
                    display: flex;
                    gap: 8px;
                    margin-top: 0.85rem;
                    justify-content: center;
                }

                .sleek-dot-item {
                    background: transparent;
                    border: none;
                    padding: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .sleek-dot-pill {
                    display: block;
                    width: 24px;
                    height: 5px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.15);
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .sleek-dot-item:hover .sleek-dot-pill {
                    background: rgba(255, 255, 255, 0.4);
                }

                .sleek-dot-item.active .sleek-dot-pill {
                    width: 44px;
                    background: linear-gradient(90deg, #FCCA26 0%, #3B82F6 100%);
                    box-shadow: 0 0 10px rgba(252, 202, 38, 0.5);
                }

                /* 4. CATEGORY FILTER WRAPPER */
                .news-cat-filter-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                }

                .news-cat-pills {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    background: rgba(17, 24, 39, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 50px;
                    padding: 6px 10px;
                }

                .cat-pill-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: transparent;
                    border: 1px solid transparent;
                    color: #94A3B8;
                    font-size: 0.8rem;
                    font-weight: 700;
                    padding: 6px 14px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    white-space: nowrap;
                }

                .cat-pill-btn:hover {
                    color: #FFFFFF;
                    background: rgba(255, 255, 255, 0.05);
                }

                .cat-pill-btn.active {
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FCCA26;
                    border-color: rgba(252, 202, 38, 0.4);
                    box-shadow: 0 4px 14px rgba(27, 42, 107, 0.45);
                }

                .cat-count-badge {
                    font-size: 0.68rem;
                    background: rgba(0, 0, 0, 0.35);
                    padding: 1px 6px;
                    border-radius: 50px;
                    font-weight: 800;
                }

                /* 5. CONTINUOUS SEAMLESS AUTO-SCROLLING MARQUEE OF CARDS */
                .cards-marquee-viewport {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    padding: 10px 0 20px;
                    mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
                }

                .cards-marquee-track {
                    display: flex;
                    gap: 1.35rem;
                    width: max-content;
                }

                .cards-marquee-group {
                    display: flex;
                    gap: 1.35rem;
                    flex-shrink: 0;
                    animation: continuousCardsLoop 40s linear infinite;
                }

                .cards-marquee-viewport:hover .cards-marquee-group {
                    animation-play-state: paused;
                }

                @keyframes continuousCardsLoop {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% - 1.35rem));
                    }
                }

                /* STATIC CARDS CONTAINER (1 TO 4 ITEMS: STAY STATIONARY, CENTERED) */
                .cards-static-container {
                    display: flex;
                    justify-content: center;
                    align-items: stretch;
                    flex-wrap: wrap;
                    gap: 1.35rem;
                    padding: 10px 0 20px;
                    max-width: 1360px;
                    margin: 0 auto;
                }

                .cards-static-container .news-card-compact {
                    flex: 0 1 310px;
                    width: 310px;
                }

                .news-card-compact {
                    flex: 0 0 310px;
                    width: 310px;
                    background: rgba(17, 24, 39, 0.78);
                    backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 18px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }

                .news-card-compact:hover {
                    transform: translateY(-6px) scale(1.02);
                    border-color: rgba(252, 202, 38, 0.45);
                    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.55), 0 0 22px rgba(252, 202, 38, 0.2);
                }

                .card-thumb-box {
                    position: relative;
                    height: 155px;
                    overflow: hidden;
                }

                .card-thumb-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .news-card-compact:hover .card-thumb-img {
                    transform: scale(1.08);
                }

                .card-thumb-shade {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.15) 60%, transparent 100%);
                }

                .card-date-pod {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    border-radius: 10px;
                    padding: 4px 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }

                .date-day {
                    font-size: 1.05rem;
                    font-weight: 900;
                    color: #FCCA26;
                    line-height: 1;
                }

                .date-month {
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: #E2E8F0;
                    letter-spacing: 0.5px;
                    margin-top: 1px;
                }

                .card-tag-pill {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 0.65rem;
                    font-weight: 800;
                    padding: 3px 8px;
                    border-radius: 50px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }

                .card-body-compact {
                    padding: 1.1rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                /* PARTICULAR TIME & VENUE HIGHLIGHT */
                .card-quick-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 6px;
                    margin-bottom: 0.65rem;
                }

                .card-time-highlight {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: rgba(252, 202, 38, 0.12);
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    color: #FCCA26;
                    font-size: 0.72rem;
                    font-weight: 800;
                    padding: 2px 7px;
                    border-radius: 6px;
                    letter-spacing: 0.2px;
                }

                .card-venue-txt {
                    font-size: 0.72rem;
                    color: #94A3B8;
                    display: inline-flex;
                    align-items: center;
                }

                .venue-ellipsis {
                    max-width: 140px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .card-title-compact {
                    font-size: 1.02rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.35;
                    margin: 0 0 0.45rem 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.2s ease;
                }

                .news-card-compact:hover .card-title-compact {
                    color: #FCCA26;
                }

                .card-desc-compact {
                    color: #94A3B8;
                    font-size: 0.8rem;
                    line-height: 1.5;
                    margin: 0 0 0.9rem 0;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .card-action-strip {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 0.75rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                .card-read-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.78rem;
                    font-weight: 800;
                    color: #FCCA26;
                    transition: gap 0.2s ease;
                }

                .news-card-compact:hover .card-read-link {
                    gap: 8px;
                }

                .card-pdf-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 3px;
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #EF4444;
                    background: rgba(239, 68, 68, 0.1);
                    padding: 2px 6px;
                    border-radius: 4px;
                }

                /* EMPTY STATE */
                .news-empty-state {
                    text-align: center;
                    padding: 3rem 1.5rem;
                    background: rgba(17, 24, 39, 0.6);
                    border-radius: 20px;
                    border: 1px dashed rgba(255, 255, 255, 0.15);
                }

                .empty-icon-circle {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    background: rgba(252, 202, 38, 0.1);
                    color: #FCCA26;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }

                .news-empty-state h3 {
                    font-size: 1.2rem;
                    font-weight: 800;
                    margin-bottom: 0.4rem;
                }

                .news-empty-state p {
                    color: #94A3B8;
                    font-size: 0.88rem;
                    max-width: 420px;
                    margin: 0 auto;
                }

                /* 6. LIGHTBOX DIALOG MODAL (CENTERED VIEWPORT DIALOG) */
                .news-lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(3, 7, 18, 0.88);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.25rem;
                    overflow-y: auto;
                    box-sizing: border-box;
                }

                .news-lightbox-dialog-landscape {
                    background: #0D1322;
                    border: 1px solid rgba(252, 202, 38, 0.35);
                    border-radius: 20px;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(27, 42, 107, 0.6);
                    width: 100%;
                    max-width: 820px;
                    max-height: min(520px, calc(100vh - 2.5rem));
                    display: grid;
                    grid-template-columns: 270px 1fr;
                    overflow: hidden;
                    position: relative;
                    color: #FFFFFF;
                    margin: auto;
                }

                .lightbox-corner-close-btn {
                    position: absolute;
                    top: 12px;
                    right: 12px;
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
                    transition: all 0.2s ease;
                    z-index: 10;
                }

                .lightbox-corner-close-btn:hover {
                    background: #EF4444;
                    color: #FFFFFF;
                    border-color: #EF4444;
                    transform: rotate(90deg);
                }

                /* LEFT PANEL */
                .lightbox-left-panel {
                    background: rgba(15, 23, 42, 0.7);
                    border-right: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 1.15rem;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    overflow: hidden;
                }

                .lightbox-left-image-wrap {
                    position: relative;
                    height: 140px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    flex-shrink: 0;
                }

                .lightbox-left-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .floating-cat-tag {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    z-index: 2;
                }

                .lightbox-left-meta-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 10px;
                    padding: 0.65rem;
                    flex-grow: 1;
                    justify-content: center;
                }

                .left-meta-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .left-meta-icon {
                    width: 24px;
                    height: 24px;
                    border-radius: 6px;
                    background: rgba(252, 202, 38, 0.12);
                    color: #FCCA26;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    flex-shrink: 0;
                }

                .left-meta-label {
                    display: block;
                    font-size: 0.62rem;
                    color: #94A3B8;
                    text-transform: uppercase;
                    font-weight: 700;
                    line-height: 1;
                }

                .left-meta-val {
                    display: block;
                    font-size: 0.75rem;
                    color: #F1F5F9;
                    font-weight: 700;
                    line-height: 1.2;
                }

                .btn-left-pdf {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    background: #DC2626;
                    color: #FFFFFF;
                    font-weight: 800;
                    font-size: 0.72rem;
                    padding: 0.5rem 0.75rem;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }

                .btn-left-pdf:hover {
                    background: #B91C1C;
                    box-shadow: 0 4px 10px rgba(220, 38, 38, 0.4);
                }

                /* RIGHT PANEL */
                .lightbox-right-panel {
                    padding: 1.25rem 1.4rem 1.1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    overflow-y: auto;
                }

                .right-panel-header {
                    margin-bottom: 0.4rem;
                    padding-right: 28px;
                }

                .right-tags-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .modal-cat-tag {
                    font-size: 0.68rem;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 50px;
                    text-transform: uppercase;
                }

                .modal-badge-special {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #93C5FD;
                    background: rgba(59, 130, 246, 0.15);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    padding: 2px 8px;
                    border-radius: 50px;
                }

                .right-date-badge {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #CBD5E1;
                    display: inline-flex;
                    align-items: center;
                    margin-left: auto;
                }

                .right-panel-title {
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: #FFFFFF;
                    line-height: 1.35;
                    margin: 0 0 0.5rem 0;
                }

                .right-panel-body-text {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 0.65rem;
                }

                .right-panel-desc {
                    font-size: 0.82rem;
                    line-height: 1.5;
                    color: #CBD5E1;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .right-highlights-box {
                    background: rgba(27, 42, 107, 0.2);
                    border: 1px solid rgba(252, 202, 38, 0.2);
                    border-radius: 8px;
                    padding: 0.5rem 0.75rem;
                }

                .right-hl-title {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #FCCA26;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: block;
                    margin-bottom: 3px;
                }

                .right-hl-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }

                .right-hl-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.72rem;
                    color: #E2E8F0;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2px 7px;
                    border-radius: 5px;
                }

                .hl-star {
                    color: #FCCA26;
                    font-size: 0.65rem;
                }

                .right-notice-strip {
                    display: flex;
                    gap: 6px;
                    background: rgba(252, 202, 38, 0.05);
                    border: 1px solid rgba(252, 202, 38, 0.15);
                    border-radius: 6px;
                    padding: 0.4rem 0.65rem;
                    font-size: 0.72rem;
                    color: #E2E8F0;
                    line-height: 1.35;
                }

                .right-panel-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-top: 0.65rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                }

                .btn-right-portal {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%);
                    color: #FFFFFF;
                    font-weight: 800;
                    font-size: 0.75rem;
                    padding: 0.5rem 0.9rem;
                    border-radius: 6px;
                    border: 1px solid rgba(252, 202, 38, 0.3);
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .btn-right-portal:hover {
                    border-color: #FCCA26;
                    color: #FCCA26;
                }

                .btn-right-close {
                    margin-left: auto;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    color: #E2E8F0;
                    font-weight: 700;
                    font-size: 0.75rem;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-right-close:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: #FFFFFF;
                }

                @media (max-width: 768px) {
                    .news-lightbox-dialog-landscape {
                        grid-template-columns: 1fr;
                        max-height: calc(100vh - 2rem);
                        overflow-y: auto;
                    }
                    .lightbox-left-panel {
                        border-right: none;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    }
                }

                @media (max-width: 640px) {
                    .news-portal-section {
                        padding: 2.5rem 0.85rem 3.5rem;
                    }
                    .news-heading-title {
                        font-size: 1.85rem;
                    }
                    .spotlight-content-wrap {
                        padding: 1.25rem;
                    }
                    .spotlight-title-compact {
                        font-size: 1.15rem;
                    }
                    .news-card-compact {
                        flex: 0 0 270px;
                        width: 270px;
                    }
                }
            `}</style>
        </section>
    );
};

export default NewsEventsSection;
