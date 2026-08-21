import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    Home, 
    ArrowLeft, 
    Compass, 
    GraduationCap, 
    Briefcase, 
    Microscope, 
    Building2, 
    Sparkles, 
    Users, 
    HelpCircle,
    Search,
    Satellite,
    Radio,
    Terminal,
    RefreshCw,
    Rocket,
    BookOpen,
    ShieldAlert,
    ExternalLink,
    MapPin,
    PhoneCall,
    Award,
    Cpu
} from 'lucide-react';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ALL_DESTINATIONS = [
    // Admissions & Careers
    { title: 'Admissions 2025-26', category: 'Admissions', desc: 'Eligibility, BE/B.Tech/ME/MBA programs & application portal', icon: GraduationCap, path: '/admissions', color: '#FCCA26', tag: 'Fast-track' },
    { title: 'Training & Placements', category: 'Admissions', desc: '500+ recruitments, salary packages & top MNC partners', icon: Briefcase, path: '/page/placement', color: '#38bdf8', tag: '95% Placed' },
    { title: 'Scholarships & Grants', category: 'Admissions', desc: 'Merit, sports, first-graduate & management concession schemes', icon: Award, path: '/scholarships', color: '#4ade80', tag: 'Financial Aid' },
    
    // Academics & Innovation
    { title: 'AICTE IDEA Lab', category: 'Academics', desc: 'State-of-the-art prototyping facility, 3D printing & IoT hubs', icon: Cpu, path: '/idea-lab', color: '#ec4899', tag: 'Innovation' },
    { title: 'Research & Development', category: 'Academics', desc: 'Funded projects, patents, journals & student innovation cell', icon: Microscope, path: '/research', color: '#a855f7', tag: 'R&D Cell' },
    { title: 'Digital Central Library', category: 'Academics', desc: '50,000+ technical volumes, IEEE/Delnet e-journals & repo', icon: BookOpen, path: '/resources/digital-library', color: '#2dd4bf', tag: 'E-Library' },
    { title: 'Curriculum & Syllabi', category: 'Academics', desc: 'Anna University regulations, CBCS syllabus & academic scheme', icon: Terminal, path: '/resources/syllabus-curriculum', color: '#f59e0b', tag: 'Anna Univ' },
    
    // Campus Life
    { title: 'Dhruva Annual Fest', category: 'Campus Life', desc: 'National level cultural extravaganza, arts & techno-symposium', icon: Sparkles, path: '/page/fest', color: '#fb7185', tag: 'Flagship Event' },
    { title: 'Campus Amenities & Hostels', category: 'Campus Life', desc: 'Modern Wi-Fi hostels, food court, cafeteria & gymnasium', icon: Building2, path: '/page/amenities', color: '#60a5fa', tag: 'Facilities' },
    { title: 'Sports Complex & Arena', category: 'Campus Life', desc: 'Olympic-grade track, cricket ground, indoor courts & yoga', icon: Rocket, path: '/page/sports', color: '#34d399', tag: 'Athletics' },
    { title: 'Global Alumni Network', category: 'Campus Life', desc: 'Connect with alumni leaders across top global technology firms', icon: Users, path: '/alumni', color: '#fbbf24', tag: '10,000+ Alumni' },
    { title: 'Virtual Campus 360° Tour', category: 'Campus Life', desc: 'Experience 360-degree panoramic virtual walk of EASA campus', icon: Compass, path: '/virtual-tour', color: '#818cf8', tag: '360° Tour' }
];

const CATEGORIES = ['All Destinations', 'Admissions', 'Academics', 'Campus Life'];

const NotFoundPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Destinations');
    const [isRebooting, setIsRebooting] = useState(false);
    const [beaconSignal, setBeaconSignal] = useState('STABLE 99.4%');

    const handleReboot = () => {
        setIsRebooting(true);
        setBeaconSignal('RECALIBRATING...');
        setTimeout(() => {
            setIsRebooting(false);
            setBeaconSignal('BEACON LOCK ESTABLISHED');
        }, 1200);
    };

    const filteredDestinations = useMemo(() => {
        return ALL_DESTINATIONS.filter(item => {
            const matchesCategory = selectedCategory === 'All Destinations' || item.category === selectedCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.tag.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <>
            <SEO
                title="404 - Transmission Lost | EASA College of Engineering & Technology"
                description="The requested campus coordinate could not be resolved on the EASA College network."
            />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'radial-gradient(ellipse at 50% 0%, #131b31 0%, #080c16 65%, #03050a 100%)',
                color: '#f8fafc',
                overflowX: 'hidden'
            }}>
                <Header />

                <main style={{
                    flex: 1,
                    position: 'relative',
                    padding: '3.5rem 1.5rem 6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/* Animated High-tech Background Grid & Glows */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                        {/* Golden Core Pulse */}
                        <div style={{
                            position: 'absolute',
                            top: '15%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '750px',
                            height: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(230, 182, 39, 0.15) 0%, rgba(45, 44, 122, 0.25) 45%, transparent 75%)',
                            filter: 'blur(90px)',
                            zIndex: 0
                        }} />

                        {/* Top Right Cyan Beacon */}
                        <div style={{
                            position: 'absolute',
                            top: '5%',
                            right: '10%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                            zIndex: 0
                        }} />

                        {/* Cyber Matrix Coordinate Grid */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                            backgroundSize: '48px 48px',
                            maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 85%)',
                            zIndex: 0
                        }} />
                    </div>

                    <div style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        maxWidth: '1150px',
                        margin: '0 auto'
                    }}>
                        {/* Holographic Telemetry HUD Header */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            padding: '0.85rem 1.4rem',
                            background: 'rgba(15, 23, 42, 0.65)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(230, 182, 39, 0.25)',
                            borderRadius: '16px',
                            marginBottom: '3rem',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: 'rgba(230, 182, 39, 0.15)',
                                    color: '#E6B627'
                                }}>
                                    <Satellite size={18} className={isRebooting ? 'animate-spin' : ''} />
                                </span>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: '600' }}>
                                        Telemetry Channel
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f8fafc' }}>
                                        EASA-SAT-01 • Navamalai Range
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.82rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Radio size={14} color="#4ade80" />
                                    <span style={{ color: '#94a3b8' }}>Status:</span>
                                    <span style={{ color: '#4ade80', fontWeight: '700' }}>{beaconSignal}</span>
                                </div>
                                <div className="d-none d-md-flex" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ShieldAlert size={14} color="#f59e0b" />
                                    <span style={{ color: '#94a3b8' }}>Unresolved Route:</span>
                                    <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '4px', color: '#facc15' }}>
                                        {location.pathname}
                                    </code>
                                </div>
                                <button
                                    onClick={handleReboot}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '0.4rem 0.9rem',
                                        borderRadius: '8px',
                                        background: 'rgba(230, 182, 39, 0.12)',
                                        border: '1px solid rgba(230, 182, 39, 0.3)',
                                        color: '#E6B627',
                                        fontSize: '0.78rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <RefreshCw size={13} style={{ transform: isRebooting ? 'rotate(360deg)' : 'none', transition: 'transform 0.8s ease' }} />
                                    Calibrate Signal
                                </button>
                            </div>
                        </div>

                        {/* Central Holographic Error Presentation */}
                        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                            {/* Glowing Cyber 404 Digit */}
                            <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto' }}>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ position: 'relative' }}
                                >
                                    <h1 style={{
                                        fontSize: 'clamp(6.5rem, 18vw, 12.5rem)',
                                        fontWeight: '950',
                                        lineHeight: '0.85',
                                        letterSpacing: '-0.05em',
                                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FCCA26 45%, #ca8a04 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: 'drop-shadow(0 20px 45px rgba(230, 182, 39, 0.3))',
                                        margin: 0,
                                        userSelect: 'none'
                                    }}>
                                        404
                                    </h1>
                                </motion.div>

                                {/* Orbiting Holographic Rings */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: 'absolute',
                                        top: '-15%',
                                        left: '-15%',
                                        right: '-15%',
                                        bottom: '-15%',
                                        borderRadius: '50%',
                                        border: '1px dashed rgba(230, 182, 39, 0.25)',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: 'absolute',
                                        top: '-30%',
                                        left: '-30%',
                                        right: '-30%',
                                        bottom: '-30%',
                                        borderRadius: '50%',
                                        border: '1px solid rgba(56, 189, 248, 0.12)',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>

                            {/* Main Narrative Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                style={{ marginTop: '1.75rem' }}
                            >
                                <div style={{
                                    display: 'inline-block',
                                    color: '#E6B627',
                                    fontSize: '0.9rem',
                                    fontWeight: '800',
                                    letterSpacing: '2.5px',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.6rem'
                                }}>
                                    • Navigation Error •
                                </div>
                                <h2 style={{
                                    fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    letterSpacing: '-0.02em',
                                    marginBottom: '1rem',
                                    lineHeight: '1.2'
                                }}>
                                    Campus Sector Coordinate Not Found
                                </h2>
                                <p style={{
                                    fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                                    color: '#94a3b8',
                                    maxWidth: '680px',
                                    margin: '0 auto 2.5rem',
                                    lineHeight: '1.7',
                                    fontWeight: '400'
                                }}>
                                    The academic department, resource URL, or portal node you requested is currently unreachable or has migrated. Use the emergency directory below to reach any wing of the campus.
                                </p>

                                {/* High Impact Action Group */}
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(230, 182, 39, 0.5)' }}
                                            whileTap={{ scale: 0.96 }}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.65rem',
                                                padding: '0.95rem 2.4rem',
                                                borderRadius: '50px',
                                                fontSize: '1.05rem',
                                                fontWeight: '800',
                                                color: '#080c16',
                                                background: 'linear-gradient(135deg, #FCCA26 0%, #E6B627 100%)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                boxShadow: '0 6px 25px rgba(230, 182, 39, 0.35)'
                                            }}
                                        >
                                            <Home size={20} />
                                            Return to Campus Home
                                        </motion.button>
                                    </Link>

                                    <button
                                        onClick={() => navigate(-1)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.6rem',
                                            padding: '0.95rem 1.9rem',
                                            borderRadius: '50px',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            color: '#f8fafc',
                                            background: 'rgba(30, 41, 59, 0.65)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            backdropFilter: 'blur(10px)',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.65)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <ArrowLeft size={18} />
                                        Previous Screen
                                    </button>

                                    <Link to="/admissions" style={{ textDecoration: 'none' }}>
                                        <button
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.6rem',
                                                padding: '0.95rem 1.9rem',
                                                borderRadius: '50px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#FCCA26',
                                                background: 'rgba(230, 182, 39, 0.1)',
                                                border: '1px solid rgba(230, 182, 39, 0.35)',
                                                cursor: 'pointer',
                                                transition: 'all 0.25s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(230, 182, 39, 0.2)';
                                                e.currentTarget.style.borderColor = '#FCCA26';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(230, 182, 39, 0.1)';
                                                e.currentTarget.style.borderColor = 'rgba(230, 182, 39, 0.35)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <GraduationCap size={19} />
                                            Apply for Admission
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Interactive Instant Route Search & Directory Filter */}
                        <div style={{
                            background: 'rgba(15, 23, 42, 0.75)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '24px',
                            padding: '2.25rem',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)'
                        }}>
                            {/* Search and Category Control Bar */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1.25rem',
                                marginBottom: '2rem'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '800',
                                        color: '#ffffff',
                                        marginBottom: '0.35rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <Compass size={22} color="#E6B627" />
                                        EASA Interactive Campus Navigator
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>
                                        Search or select a portal category to immediately teleport to your target destination.
                                    </p>
                                </div>

                                {/* Instant Live Search Field */}
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: '340px'
                                }}>
                                    <Search size={18} style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#E6B627'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search departments, portals, fest..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem 0.75rem 2.6rem',
                                            borderRadius: '12px',
                                            background: 'rgba(30, 41, 59, 0.8)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            color: '#f8fafc',
                                            fontSize: '0.92rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s ease',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#E6B627'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            style={{
                                                position: 'absolute',
                                                right: '12px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#94a3b8',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Category Filter Pills */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.6rem',
                                marginBottom: '2rem'
                            }}>
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        style={{
                                            padding: '0.5rem 1.15rem',
                                            borderRadius: '30px',
                                            fontSize: '0.86rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: selectedCategory === cat
                                                ? '1px solid #E6B627'
                                                : '1px solid rgba(255, 255, 255, 0.08)',
                                            background: selectedCategory === cat
                                                ? 'rgba(230, 182, 39, 0.18)'
                                                : 'rgba(255, 255, 255, 0.03)',
                                            color: selectedCategory === cat ? '#FCCA26' : '#94a3b8'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Destination Cards Grid */}
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    layout
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                                        gap: '1.25rem'
                                    }}
                                >
                                    {filteredDestinations.map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.title}
                                                to={item.path}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                                                    style={{
                                                        background: 'rgba(30, 41, 59, 0.5)',
                                                        border: '1px solid rgba(255, 255, 255, 0.07)',
                                                        borderRadius: '16px',
                                                        padding: '1.3rem',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: '100%',
                                                        boxSizing: 'border-box',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        transition: 'all 0.25s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.borderColor = `${item.color}60`;
                                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.85)';
                                                        e.currentTarget.style.boxShadow = `0 12px 30px rgba(0, 0, 0, 0.35), 0 0 20px ${item.color}15`;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '1rem'
                                                    }}>
                                                        <div style={{
                                                            width: '42px',
                                                            height: '42px',
                                                            borderRadius: '12px',
                                                            background: `${item.color}18`,
                                                            border: `1px solid ${item.color}40`,
                                                            color: item.color,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <Icon size={22} />
                                                        </div>
                                                        <span style={{
                                                            fontSize: '0.72rem',
                                                            fontWeight: '700',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px',
                                                            padding: '0.2rem 0.6rem',
                                                            borderRadius: '20px',
                                                            background: 'rgba(255, 255, 255, 0.06)',
                                                            color: item.color,
                                                            border: `1px solid ${item.color}25`
                                                        }}>
                                                            {item.tag}
                                                        </span>
                                                    </div>

                                                    <div style={{ flex: 1 }}>
                                                        <h4 style={{
                                                            fontSize: '1.05rem',
                                                            fontWeight: '700',
                                                            color: '#f8fafc',
                                                            marginBottom: '0.4rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            {item.title}
                                                            <ExternalLink size={14} style={{ opacity: 0.5 }} />
                                                        </h4>
                                                        <p style={{
                                                            fontSize: '0.85rem',
                                                            color: '#94a3b8',
                                                            lineHeight: '1.5',
                                                            margin: 0
                                                        }}>
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>

                            {filteredDestinations.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                                    <HelpCircle size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f8fafc', marginBottom: '0.5rem' }}>
                                        No matching campus portals found for "{searchQuery}"
                                    </p>
                                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                                        Try searching with keywords like "Placements", "Admissions", "Hostel", "IDEA Lab", or reset the filter.
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('All Destinations'); }}
                                        style={{
                                            marginTop: '1.25rem',
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: '8px',
                                            background: '#E6B627',
                                            color: '#000',
                                            fontWeight: '700',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Reset Search
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Campus Helpdesk Support Direct Hotline */}
                        <div style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '1rem'
                        }}>
                            <div style={{
                                padding: '1.25rem 1.5rem',
                                borderRadius: '16px',
                                background: 'rgba(15, 23, 42, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(230, 182, 39, 0.15)', color: '#E6B627', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PhoneCall size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Admission Helpline</div>
                                    <div style={{ fontSize: '0.98rem', fontWeight: '700', color: '#ffffff' }}>+91 94426 44444 / +91 94437 44444</div>
                                </div>
                            </div>

                            <div style={{
                                padding: '1.25rem 1.5rem',
                                borderRadius: '16px',
                                background: 'rgba(15, 23, 42, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Campus Location</div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>NH-47, Navamalai Hills, Coimbatore - 641105</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default NotFoundPage;


