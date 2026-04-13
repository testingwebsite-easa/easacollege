import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import clubLogo from '../assets/club_logo_gen.png';
import clubsHeroImg from '../assets/clubs_hero_unique.png';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './CampusClubsPage.css';

const clubs = [
    {
        id: 1,
        name: "0s & 1s Club",
        description: "Encouraging curiosity, research, and innovation through experiments, projects, exhibitions, and scientific discussions.",
        activities: [
            "Science fairs and exhibitions",
            "Research talks and workshops",
            "Innovation challenges"
        ]
    },
    {
        id: 2,
        name: "Mobile App Development Club",
        description: "A platform for tech enthusiasts to learn, build, and collaborate using modern technologies.",
        activities: [
            "Coding bootcamps",
            "Hackathons",
            "App and web development projects"
        ]
    },
    {
        id: 3,
        name: "Entrepreneurship Development Club",
        description: "Empowering future entrepreneurs and business leaders with practical knowledge and skills.",
        activities: [
            "Startup ideation sessions",
            "Guest lectures from industry experts",
            "Business plan competitions"
        ]
    },
    {
        id: 4,
        name: "Music & Dance Club (Thandava Raaga)",
        description: "Vibrant space for creativity and expression, bringing together individuals passionate about rhythm, movement, and melody.",
        activities: [
            "Dance practice sessions (classical, folk, and contemporary)",
            "Music training and jam sessions (vocal and instrumental)",
            "Stage performances for cultural and institutional events",
            "Choreography and music composition workshops",
            "Talent showcases and inter-club competitions",
            "Celebration of cultural and festive occasions"
        ]
    },
    {
        id: 5,
        name: "Fine Arts Club (Dream Weavers)",
        description: "Encouraging creativity and artistic expression by providing a platform for individuals to explore, learn, and showcase their talents in visual and creative arts.",
        activities: [
            "Drawing, painting, and sketching sessions",
            "Craft and design workshops",
            "Art exhibitions and displays",
            "Poster-making and collage activities",
            "Rangoli and mural art",
            "Participation in art competitions and cultural events"
        ]
    },
    {
        id: 6,
        name: "Oratory Club",
        description: "Enhancing communication, critical thinking, and public speaking skills.",
        activities: [
            "Debates and group discussions",
            "Creative writing sessions",
            "Poetry slams and storytelling"
        ]
    },
    {
        id: 7,
        name: "Tamil Mandram Club",
        description: "Dedicated to promoting the richness of the Tamil language, literature, and culture.",
        activities: [
            "Tamil debates and speech competitions",
            "Poetry recitation and creative writing",
            "Drama, skits, and storytelling",
            "Celebration of Tamil festivals and cultural days",
            "Quiz programs on Tamil language and literature",
            "Reading and discussion of classical and modern Tamil works"
        ]
    },
    {
        id: 8,
        name: "Photography & Media Club (Shutter Stories)",
        description: "Capturing moments and telling stories through visual and digital media.",
        activities: [
            "Photography walks",
            "Media coverage of events",
            "Editing and design workshops"
        ]
    },
    {
        id: 9,
        name: "Eco Evolve Club",
        description: "Promoting sustainability and environmental responsibility.",
        activities: [
            "Tree plantation drives",
            "Clean-up campaigns",
            "Awareness programs on climate change"
        ]
    },
    {
        id: 10,
        name: "Gender Champions Club",
        description: "Advocating gender equality, inclusivity, and social justice.",
        activities: [
            "Gender sensitization workshops",
            "Awareness campaigns",
            "Panel discussions and community outreach"
        ]
    },
    {
        id: 11,
        name: "Aura Club",
        description: "Focusing on mental, emotional, and physical well-being.",
        activities: [
            "Mental health awareness sessions",
            "Meditation and mindfulness workshops",
            "Stress management programs"
        ]
    },
    {
        id: 12,
        name: "Rovers & Rangers Club",
        description: "Inspiring compassion and community engagement through service.",
        activities: [
            "Volunteering programs",
            "Community development initiatives",
            "Charity and relief drives"
        ]
    },
    {
        id: 13,
        name: "NSS",
        description: "Instilling civic responsibility and leadership through community service.",
        activities: [
            "Social awareness drives",
            "Rural development programs",
            "National service initiatives"
        ]
    }
];

// Mock Events Data
const clubEvents = [
    { id: 1, clubName: "0s & 1s Club", title: "Tech Symposium 2024", date: "March 15, 2024", image: clubsHeroImg },
    { id: 2, clubName: "Music & Dance Club", title: "Cultural Night", date: "April 02, 2024", image: clubsHeroImg },
    { id: 3, clubName: "Fine Arts Club", title: "Art Expo", date: "April 10, 2024", image: clubsHeroImg }
];

const CampusClubsPage = () => {
    useScrollAnimation();
    const [activeClubId, setActiveClubId] = useState('overview');

    const activeClub = clubs.find(c => c.id === activeClubId);

    return (
        <div className="page-wrapper">
            <SEO
                title="Campus Clubs & Societies"
                description="Discover, Engage, Lead, and Thrive with EASA College's vibrant clubs and societies."
            />
            <Navbar />

            <main className="min-h-screen bg-main pb-20">
                <GlobalHero
                    pageKey="clubs"
                    defaultTitle="Campus Clubs & Societies"
                    defaultSubtitle="Discover. Engage. Lead. Thrive."
                    defaultImage={clubsHeroImg}
                />

                {/* Clubs Sidebar Layout */}
                <section className="container mx-auto px-4 clubs-content-wrapper animate-on-scroll">
                    <div className="clubs-page-container">

                        {/* Sidebar */}
                        <div className="clubs-sidebar">
                            <div className="glass-card clubs-list-card">
                                <h3 className="clubs-list-title">Clubs List</h3>
                                <div className="clubs-list">
                                    {/* Overview Option */}
                                    <button
                                        onClick={() => setActiveClubId('overview')}
                                        className={`club-nav-btn ${activeClubId === 'overview' ? 'active' : ''}`}
                                    >
                                        {activeClubId === 'overview' && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="active-indicator"
                                            />
                                        )}
                                        <span className="truncate">Overview</span>
                                    </button>

                                    {/* Events Option */}
                                    <button
                                        onClick={() => setActiveClubId('events')}
                                        className={`club-nav-btn ${activeClubId === 'events' ? 'active' : ''}`}
                                    >
                                        {activeClubId === 'events' && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="active-indicator"
                                            />
                                        )}
                                        <span className="truncate">Events</span>
                                    </button>

                                    {clubs.map((club) => (
                                        <button
                                            key={club.id}
                                            onClick={() => setActiveClubId(club.id)}
                                            className={`club-nav-btn ${activeClubId === club.id ? 'active' : ''}`}
                                        >
                                            {/* Selection Indicator */}
                                            {activeClubId === club.id && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="active-indicator"
                                                />
                                            )}
                                            <span className="truncate">{club.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="club-content-area">
                            <AnimatePresence mode="wait">
                                {activeClubId === 'overview' ? (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-card club-details-card"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        <div className="club-bg-decoration"></div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}
                                        >
                                            <h2 className="club-title">Overview</h2>
                                            <div className="club-divider"></div>

                                            <p className="club-description" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                                                Our clubs and societies provide students with opportunities to explore interests, develop skills,
                                                and build leadership while fostering creativity, teamwork, and social responsibility.
                                            </p>

                                            <p className="club-description">
                                                Each club offers a unique space to learn, grow, and make an impact beyond the classroom.
                                                Whether you are interested in technology, arts, culture, or social service, there is a community waiting for you at EASA.
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                ) : activeClubId === 'events' ? (
                                    <motion.div
                                        key="events"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-card club-details-card"
                                    >
                                        <div className="club-bg-decoration"></div>

                                        <h2 className="club-title">Upcoming Events</h2>
                                        <div className="club-divider"></div>

                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', zIndex: 1 }}>
                                            {clubEvents.map(event => (
                                                <div key={event.id} className="glass-card p-4" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}>
                                                    <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden bg-black/50">
                                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="text-sm text-[#FCCA26]" style={{ color: 'var(--accent-yellow)', fontSize: '0.875rem' }}>{event.date}</span>
                                                        <h3 className="text-xl font-bold text-white mb-1" style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginTop: '0.25rem' }}>{event.title}</h3>
                                                        <p className="text-sm text-white/60" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{event.clubName}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={activeClubId}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-card club-details-card"
                                    >
                                        {/* Background decorative element */}
                                        <div className="club-bg-decoration"></div>

                                        {/* Large Logo */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="club-logo-container"
                                        >
                                            <img
                                                src={clubLogo}
                                                alt={`${activeClub.name} Logo`}
                                                className="club-logo-img"
                                            />
                                        </motion.div>

                                        {/* Club Title & Description */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            style={{ width: '100%', position: 'relative', zIndex: 1 }}
                                        >
                                            <h2 className="club-title">
                                                {activeClub.name}
                                            </h2>

                                            <div className="club-divider"></div>

                                            <p className="club-description">
                                                {activeClub.description}
                                            </p>
                                        </motion.div>

                                        {/* Activities */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="club-activities-box"
                                        >
                                            <h4 className="activities-title">
                                                <span>Activities & Highlights</span>
                                            </h4>
                                            <div className="activities-grid">
                                                {activeClub.activities.map((activity, idx) => (
                                                    <div key={idx} className="activity-item group/item">
                                                        <span className="activity-icon">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5 12L9 16L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                        <span className="activity-text">{activity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Why Join & Get Involved */}
                <section className="container mx-auto px-4 clubs-section-spacing">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Why Join */}
                        <div className="glass-card animate-on-scroll">
                            <h2 className="text-2xl font-bold mb-6 text-gradient" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Why Join a Club?</h2>
                            <ul className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    "Explore your passions",
                                    "Develop leadership and teamwork skills",
                                    "Gain real-world experience",
                                    "Build lasting friendships",
                                    "Create meaningful impact"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-text-main" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
                                        <span className="w-2 h-2 rounded-full bg-[#FCCA26]" style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#FCCA26' }}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Get Involved */}
                        <div className="glass-card animate-on-scroll delay-200">
                            <h2 className="text-2xl font-bold mb-6 text-gradient" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Get Involved</h2>
                            <p className="text-text-muted mb-6" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Joining a club is simple:</p>
                            <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {[
                                    { step: "01", title: "Explore your interests", desc: "Browse through our diverse range of clubs." },
                                    { step: "02", title: "Register", desc: "Contact the club coordinator to sign up." },
                                    { step: "03", title: "Participate", desc: "Attend events, contribute ideas, and lead initiatives." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
                                        <span className="text-3xl font-bold text-[#FCCA26]/20" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'rgba(252, 202, 38, 0.2)' }}>{item.step}</span>
                                        <div>
                                            <h3 className="font-bold text-text-main" style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{item.title}</h3>
                                            <p className="text-sm text-text-muted" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default CampusClubsPage;
