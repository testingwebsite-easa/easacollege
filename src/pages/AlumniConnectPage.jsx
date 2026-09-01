import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaGraduationCap, FaUsers, FaGlobe, FaBriefcase, FaHandshake, 
    FaAward, FaChalkboardTeacher, FaLightbulb, FaFlask, FaCalendarAlt, 
    FaEnvelope, FaPhone, FaMapMarkerAlt, FaRocket, FaQuoteLeft, FaTimes, 
    FaCheckCircle, FaArrowRight, FaIdCard, FaBuilding, FaUserCheck, FaUserTie,
    FaRegLightbulb, FaStar, FaChevronRight, FaImages
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import { useTheme } from '../context/ThemeContext';
import aboutMain from '../assets/about-main.webp';

const AlumniConnectPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';

    const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
    const [mentorFormSubmitted, setMentorFormSubmitted] = useState(false);
    const [distinguishedFilter, setDistinguishedFilter] = useState('All');
    const [activeGalleryTab, setActiveGalleryTab] = useState('All');

    const [mentorFormData, setMentorFormData] = useState({
        name: '',
        email: '',
        phone: '',
        batch: '',
        company: '',
        role: 'Student Mentor',
        expertise: ''
    });

    const handleMentorSubmit = (e) => {
        e.preventDefault();
        setMentorFormSubmitted(true);
        setTimeout(() => {
            setMentorFormSubmitted(false);
            setIsMentorModalOpen(false);
            setMentorFormData({ name: '', email: '', phone: '', batch: '', company: '', role: 'Student Mentor', expertise: '' });
        }, 2500);
    };

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 15px 35px rgba(0,0,0,0.35)' : '0 10px 30px rgba(0,0,0,0.06)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#cbd5e1' : '#475569';
    const sectionBg = isDark ? 'rgba(0, 0, 0, 0.2)' : '#F8FAFC';
    const goldAccent = isDark ? '#F8D53D' : '#D97706';
    const blueAccent = isDark ? '#38BDF8' : '#2563EB';

    const stats = [
        { count: '15,000+', label: 'Global Alumni', icon: FaUsers },
        { count: '20+', label: 'Departments', icon: FaGraduationCap },
        { count: '25+', label: 'Countries Present', icon: FaGlobe },
        { count: '100+', label: 'Industry Partners', icon: FaBuilding },
        { count: '1,000+', label: 'Career Connections', icon: FaHandshake }
    ];

    const whyJoinPillars = [
        {
            title: 'Stay Connected',
            desc: 'Receive official institutional updates, alumni newsletters, and exclusive event invitations.',
            icon: FaUsers,
            color: isDark ? '#F8D53D' : '#D97706'
        },
        {
            title: 'Expand Professional Network',
            desc: 'Reconnect with classmates and engage with high-achieving alumni across diverse global industries.',
            icon: FaHandshake,
            color: isDark ? '#38BDF8' : '#2563EB'
        },
        {
            title: 'Mentor Future Engineers',
            desc: 'Empower current students through career guidance, mock interviews, guest talks, and industry mentorship.',
            icon: FaChalkboardTeacher,
            color: '#10B981'
        },
        {
            title: 'Create Career Opportunities',
            desc: 'Post job openings, offer internship opportunities, and recruit talented EASA graduates for your organization.',
            icon: FaBriefcase,
            color: '#F59E0B'
        },
        {
            title: 'Collaborate with EASA',
            desc: 'Partner on cutting-edge research, consultancy, sponsored industry projects, and tech transfer initiatives.',
            icon: FaFlask,
            color: '#8B5CF6'
        },
        {
            title: 'Global Ecosystem & Impact',
            desc: 'Participate in international alumni chapters and contribute to the growth of future engineering leaders.',
            icon: FaGlobe,
            color: '#EC4899'
        }
    ];

    const distinguishedCategories = ['All', 'Corporate Leadership', 'Entrepreneurship', 'Research & Academia', 'Government & Innovation'];

    const distinguishedAlumniList = [
        {
            name: 'Karthik Subbaraj',
            batch: 'Class of 2012 (Mechatronics/Mech)',
            role: 'Film Director & Producer',
            category: 'Government & Innovation',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
            achievement: 'Acclaimed Indian filmmaker & creative leader inspiring youth across cinema & media.'
        },
        {
            name: 'Dr. Anand Kumar',
            batch: 'Class of 2014 (CSE)',
            role: 'Lead AI Scientist',
            company: 'Tech Research Labs USA',
            category: 'Research & Academia',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
            achievement: 'Published 15+ IEEE papers & holder of 4 international utility patents in AI & Deep Learning.'
        },
        {
            name: 'Priya Rajendran',
            batch: 'Class of 2016 (ECE)',
            role: 'Founder & CEO',
            company: 'Nexus Robotics Pvt Ltd',
            category: 'Entrepreneurship',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
            achievement: 'Built an IoT startup valued at $5M+, creating smart automation tools for manufacturing.'
        },
        {
            name: 'Suresh Varma',
            batch: 'Class of 2013 (EEE)',
            role: 'Vice President - Engineering',
            company: 'Global Power Corp Systems',
            category: 'Corporate Leadership',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
            achievement: 'Spearheading renewable grid deployment across North America & Asia Europe regions.'
        }
    ];

    const mentorRoles = [
        { title: 'Student Mentor', desc: 'Provide 1-on-1 guidance for academic and professional growth.', icon: FaUserCheck },
        { title: 'Guest Lecturer', desc: 'Deliver expert technical lectures & industry workshops.', icon: FaChalkboardTeacher },
        { title: 'Industry Expert', desc: 'Evaluate capstone projects & guide curriculum relevance.', icon: FaBuilding },
        { title: 'Career Coach', desc: 'Conduct mock interviews, resume reviews & career prep.', icon: FaBriefcase },
        { title: 'Placement Partner', desc: 'Enable campus hiring & internships at your company.', icon: FaHandshake },
        { title: 'Startup Mentor', desc: 'Guide student founders in EASA Idea Lab & Incubator.', icon: FaRocket },
        { title: 'Research Collaborator', desc: 'Partner with faculty on joint papers, R&D & patents.', icon: FaFlask }
    ];

    const newsEventsList = [
        {
            title: 'Annual Global Alumni Meet 2026',
            date: 'DECEMBER 18, 2026',
            type: 'Reunion',
            location: 'EASA Main Campus Auditorium',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop'
        },
        {
            title: 'International Alumni Virtual Connect',
            date: 'OCTOBER 24, 2026',
            type: 'Webinar',
            location: 'Online / Zoom Webinar',
            image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop'
        },
        {
            title: 'Industry 5.0 & AI Masterclass by Alumni Experts',
            date: 'NOVEMBER 14, 2026',
            type: 'Guest Session',
            location: 'EASA Seminar Hall',
            image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop'
        }
    ];

    const galleryImages = [
        { category: 'Convocation', title: 'Graduation Day Ceremony', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop' },
        { category: 'Alumni Events', title: 'Grand Alumni Reunion', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop' },
        { category: 'Campus Memories', title: 'Students at EASA Central Library', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop' },
        { category: 'Industry Visits', title: 'Robotics & Automation Lab Interaction', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' },
        { category: 'Guest Lectures', title: 'Alumni Leadership Seminar', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop' },
        { category: 'Convocation', title: 'Awarding Gold Medalists', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop' }
    ];

    const testimonials = [
        {
            quote: "EASA laid the strong technical foundation and leadership values that empowered me to launch my career in Silicon Valley. Staying connected as an alumnus allows me to give back to current students.",
            name: "Venkatesh Raman",
            batch: "Class of 2015 (CSE)",
            role: "Staff Software Engineer, Google USA",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
        },
        {
            quote: "The practical laboratory experience and encouragement from faculty at EASA ignited my entrepreneurial drive. The alumni network continues to open global doors.",
            name: "Deepa Sundaram",
            batch: "Class of 2017 (ECE)",
            role: "Co-Founder, Smart Grid Solutions",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
        }
    ];

    const filteredDistinguished = distinguishedFilter === 'All' 
        ? distinguishedAlumniList 
        : distinguishedAlumniList.filter(item => item.category === distinguishedFilter);

    const filteredGallery = activeGalleryTab === 'All'
        ? galleryImages
        : galleryImages.filter(item => item.category === activeGalleryTab);

    return (
        <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
            <SEO 
                title="EASA Alumni Connect | Official Alumni Portal" 
                description="Connecting Alumni. Building Futures. Creating Global Impact. Join the official EASA College Alumni Network." 
            />
            <Navbar />

            {/* HERO BANNER */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <GlobalHero
                    pageKey="alumni-connect-hero"
                    defaultTitle="EASA Alumni Connect"
                    defaultSubtitle="Connecting Alumni. Building Futures. Creating Global Impact."
                    defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
                />

                {/* Hero CTA overlay buttons */}
                <div style={{
                    position: 'relative',
                    marginTop: '-3rem',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.2rem',
                    flexWrap: 'wrap',
                    padding: '0 1rem'
                }}>
                    <Link to="/alumni-registration" style={{
                        padding: '1.1rem 2.5rem',
                        borderRadius: '50px',
                        fontWeight: '900',
                        fontSize: '1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        color: '#ffffff',
                        boxShadow: '0 12px 30px rgba(217, 119, 6, 0.35)',
                        transition: 'all 0.3s ease'
                    }}>
                        <FaIdCard size={18} /> REGISTER NOW & GET ID CARD
                    </Link>

                    <Link to="/alumni-social" style={{
                        padding: '1.1rem 2.5rem',
                        borderRadius: '50px',
                        fontWeight: '800',
                        fontSize: '1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                        background: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
                        color: primaryTextColor,
                        border: cardBorder,
                        boxShadow: cardShadow,
                        transition: 'all 0.3s ease'
                    }}>
                        <FaUsers size={18} /> ALUMNI DIRECTORY
                    </Link>

                    <button 
                        onClick={() => setIsMentorModalOpen(true)}
                        style={{
                            padding: '1.1rem 2.5rem',
                            borderRadius: '50px',
                            fontWeight: '800',
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF',
                            color: blueAccent,
                            border: isDark ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #BFDBFE',
                            boxShadow: cardShadow,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <FaChalkboardTeacher size={18} /> BECOME A MENTOR
                    </button>
                </div>

                {/* QUICK STATISTICS BAR */}
                <div className="container" style={{ marginTop: '3.5rem', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        background: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff',
                        border: cardBorder,
                        borderRadius: '24px',
                        padding: '2.2rem 1.8rem',
                        boxShadow: cardShadow,
                        backdropFilter: 'blur(12px)'
                    }}>
                        {stats.map((item, i) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: isDark ? 'rgba(248, 213, 61, 0.12)' : 'rgba(217, 119, 6, 0.1)', color: goldAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
                                        <IconComponent />
                                    </div>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.2rem 0', fontFamily: "'Outfit', sans-serif" }}>
                                        {item.count}
                                    </h3>
                                    <p style={{ margin: 0, color: secondaryTextColor, fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {item.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ABOUT ALUMNI CONNECT / WELCOME SECTION */}
            <section style={{ padding: '4.5rem 0', position: 'relative' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                                <FaBuilding /> WELCOME MESSAGE
                            </div>
                            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '900', color: primaryTextColor, lineHeight: '1.2', marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>
                                Welcome to EASA Alumni Connect
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: secondaryTextColor, lineHeight: '1.8', marginBottom: '1.2rem' }}>
                                Welcome to <strong>EASA Alumni Connect</strong>, the official platform dedicated to fostering lifelong relationships between EASA College of Engineering and Technology and its global alumni community.
                            </p>
                            <p style={{ fontSize: '1rem', color: secondaryTextColor, lineHeight: '1.8', marginBottom: '2rem' }}>
                                Our alumni are the institution's greatest ambassadors, contributing to engineering, technology, research, entrepreneurship, education, healthcare, public service, and innovation across the globe. This platform serves as a bridge that connects alumni, students, faculty, and industry, creating opportunities for mentoring, collaboration, professional networking, and institutional development.
                            </p>

                            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                                <Link to="/alumni-registration" style={{
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#ffffff',
                                    padding: '0.9rem 2.2rem',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)'
                                }}>
                                    Join Network <FaArrowRight />
                                </Link>
                                <Link to="/institution" style={{
                                    background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                                    border: cardBorder,
                                    color: primaryTextColor,
                                    padding: '0.9rem 2.2rem',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    boxShadow: cardShadow
                                }}>
                                    About EASA Campus
                                </Link>
                            </div>
                        </div>

                        {/* Aerial Campus & Vision/Mission Cards Grid */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ borderRadius: '24px', overflow: 'hidden', border: isDark ? '2px solid rgba(248, 213, 61, 0.3)' : '1px solid rgba(226, 232, 240, 0.9)', boxShadow: cardShadow, height: '280px' }}>
                                <img src={aboutMain} alt="EASA Campus View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {/* Vision Card */}
                                <div style={{ background: cardBg, border: isDark ? '1px solid rgba(248, 213, 61, 0.3)' : '1px solid #FDE68A', borderRadius: '20px', padding: '1.6rem', boxShadow: cardShadow }}>
                                    <div style={{ color: goldAccent, fontWeight: '900', fontSize: '1.1rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaLightbulb /> Our Vision
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: secondaryTextColor, margin: 0, lineHeight: '1.6' }}>
                                        To cultivate a globally connected alumni community that strengthens institutional excellence through lifelong engagement, professional collaboration, and meaningful contributions to society.
                                    </p>
                                </div>

                                {/* Mission Card */}
                                <div style={{ background: cardBg, border: isDark ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #BFDBFE', borderRadius: '20px', padding: '1.6rem', boxShadow: cardShadow }}>
                                    <div style={{ color: blueAccent, fontWeight: '900', fontSize: '1.1rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaRocket /> Our Mission
                                    </div>
                                    <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem', color: secondaryTextColor, lineHeight: '1.6' }}>
                                        <li>Build comprehensive alumni database</li>
                                        <li>Promote lifelong engagement</li>
                                        <li>Strengthen industry-academia ties</li>
                                        <li>Encourage student mentorship</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY JOIN THE ALUMNI NETWORK */}
            <section style={{ padding: '5rem 0', background: sectionBg, borderTop: cardBorder, borderBottom: cardBorder }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
                        <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                            <FaStar /> LIFELONG ENGAGEMENT
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, fontFamily: "'Outfit', sans-serif" }}>
                            Why Join the Alumni Network?
                        </h2>
                        <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                            Stay connected with your alma mater, advance your career, and inspire the next generation of engineers.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {whyJoinPillars.map((pillar, idx) => {
                            const PillarIcon = pillar.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -8 }}
                                    style={{
                                        background: cardBg,
                                        border: cardBorder,
                                        borderRadius: '24px',
                                        padding: '2.2rem',
                                        boxShadow: cardShadow,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '16px',
                                        background: `${pillar.color}15`,
                                        border: `1px solid ${pillar.color}40`,
                                        color: pillar.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem'
                                    }}>
                                        <PillarIcon />
                                    </div>
                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: primaryTextColor, margin: 0 }}>
                                        {pillar.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                        {pillar.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ALUMNI REGISTRATION CTA BANNER */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{
                        background: isDark 
                            ? 'linear-gradient(135deg, #0B1329 0%, #172554 100%)'
                            : 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                        border: isDark ? '2px solid rgba(248, 213, 61, 0.4)' : '1px solid rgba(37, 99, 235, 0.3)',
                        borderRadius: '32px',
                        padding: '4rem 3rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2.5rem',
                        boxShadow: '0 25px 60px rgba(37, 99, 235, 0.25)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ maxWidth: '650px' }}>
                            <span style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#FDE68A', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                OFFICIAL MEMBERSHIP
                            </span>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: '#ffffff', marginTop: '1.2rem', marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>
                                Become Part of the EASA Alumni Network
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.7', margin: 0 }}>
                                Join thousands of alumni who continue to contribute to the growth, innovation, and academic excellence of EASA College. Get your official digital Alumni Card instantly!
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                            <Link to="/alumni-registration" style={{
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#ffffff',
                                padding: '1.2rem 2.8rem',
                                borderRadius: '50px',
                                fontWeight: '900',
                                fontSize: '1.05rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                            }}>
                                <FaIdCard /> REGISTER NOW
                            </Link>

                            <Link to="/alumni-social" style={{
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: '#ffffff',
                                padding: '1.2rem 2.5rem',
                                borderRadius: '50px',
                                fontWeight: '800',
                                fontSize: '1.05rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                backdropFilter: 'blur(8px)'
                            }}>
                                EXPLORE DIRECTORY
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* DISTINGUISHED ALUMNI */}
            <section style={{ padding: '5rem 0', background: sectionBg, borderTop: cardBorder, borderBottom: cardBorder }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
                        <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                            <FaAward /> GLOBAL ACHIEVERS
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, fontFamily: "'Outfit', sans-serif" }}>
                            Distinguished Alumni Highlights
                        </h2>
                        <p style={{ color: secondaryTextColor, fontSize: '1.05rem', margin: '0.5rem 0 0' }}>
                            Celebrating EASAians leading in Engineering, Corporate Leadership, Research, Entrepreneurship, and Innovation worldwide.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                        {distinguishedCategories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setDistinguishedFilter(cat)}
                                style={{
                                    padding: '0.65rem 1.5rem',
                                    borderRadius: '50px',
                                    border: distinguishedFilter === cat ? `2px solid ${goldAccent}` : cardBorder,
                                    background: distinguishedFilter === cat 
                                        ? (isDark ? 'rgba(248, 213, 61, 0.2)' : 'rgba(217, 119, 6, 0.12)')
                                        : (isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'),
                                    color: distinguishedFilter === cat ? goldAccent : secondaryTextColor,
                                    fontWeight: '800',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: distinguishedFilter === cat ? '0 4px 15px rgba(217,119,6,0.2)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {filteredDistinguished.map((alumnus, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -6 }}
                                style={{
                                    background: cardBg,
                                    border: cardBorder,
                                    borderRadius: '24px',
                                    padding: '2.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    boxShadow: cardShadow
                                }}
                            >
                                <div style={{ width: '96px', height: '96px', borderRadius: '50%', border: `3px solid ${goldAccent}`, overflow: 'hidden', marginBottom: '1.2rem', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                                    <img src={alumnus.image} alt={alumnus.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: primaryTextColor, margin: '0 0 0.3rem 0' }}>{alumnus.name}</h3>
                                <p style={{ color: goldAccent, fontSize: '0.85rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>{alumnus.batch}</p>
                                <p style={{ color: primaryTextColor, fontSize: '0.95rem', fontWeight: '700', margin: '0 0 0.8rem 0' }}>{alumnus.role} {alumnus.company ? `• ${alumnus.company}` : ''}</p>
                                <p style={{ fontSize: '0.9rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>{alumnus.achievement}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAREER & MENTORSHIP (BECOME A MENTOR) */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                                <FaChalkboardTeacher /> CAREER & MENTORSHIP
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, lineHeight: '1.2', marginBottom: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>
                                Inspire the Next Generation of EASA Engineers
                            </h2>
                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Your experience and technical expertise can transform student careers. Join our Alumni Mentorship Cell and volunteer across various engagement opportunities.
                            </p>

                            <button
                                onClick={() => setIsMentorModalOpen(true)}
                                style={{
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#ffffff',
                                    padding: '1.1rem 2.8rem',
                                    borderRadius: '50px',
                                    fontWeight: '900',
                                    fontSize: '1.05rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 12px 30px rgba(217, 119, 6, 0.35)'
                                }}
                            >
                                <FaChalkboardTeacher /> BECOME A MENTOR
                            </button>
                        </div>

                        {/* Mentorship Roles Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
                            {mentorRoles.map((role, idx) => {
                                const RoleIcon = role.icon;
                                return (
                                    <div key={idx} style={{
                                        background: cardBg,
                                        border: cardBorder,
                                        borderRadius: '20px',
                                        padding: '1.4rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.6rem',
                                        boxShadow: cardShadow
                                    }}>
                                        <div style={{ color: goldAccent, fontSize: '1.4rem' }}><RoleIcon /></div>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: primaryTextColor, margin: 0 }}>{role.title}</h4>
                                        <p style={{ fontSize: '0.84rem', color: secondaryTextColor, margin: 0, lineHeight: '1.5' }}>{role.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* INDUSTRY CONNECT & RESEARCH/INNOVATION */}
            <section style={{ padding: '5rem 0', background: sectionBg, borderTop: cardBorder, borderBottom: cardBorder }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem' }}>
                        {/* Industry Connect Card */}
                        <div style={{
                            background: cardBg,
                            border: isDark ? '1px solid rgba(248, 213, 61, 0.3)' : '1px solid #FDE68A',
                            borderRadius: '28px',
                            padding: '2.8rem',
                            boxShadow: cardShadow
                        }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: isDark ? 'rgba(248, 213, 61, 0.15)' : 'rgba(217, 119, 6, 0.1)', color: goldAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                                <FaBuilding />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem', fontFamily: "'Outfit', sans-serif" }}>
                                Industry Connect
                            </h3>
                            <p style={{ color: secondaryTextColor, fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Partner with your alma mater to drive corporate collaborations, campus hiring, and industrial exposure for students.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, margin: '0 0 2rem 0', listStyle: 'none' }}>
                                {['Campus Placements & Hiring Drives', 'Student Internships & Industrial Visits', 'Sponsored Projects & Industrial Consultancy', 'Corporate MoU Partnerships'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: primaryTextColor, fontSize: '0.95rem', fontWeight: '600' }}>
                                        <FaCheckCircle style={{ color: goldAccent, flexShrink: 0 }} /> {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/page/placement" style={{ color: goldAccent, fontWeight: '800', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                Explore Placement Cell <FaChevronRight size={12} />
                            </Link>
                        </div>

                        {/* Research & Innovation Card */}
                        <div style={{
                            background: cardBg,
                            border: isDark ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #BFDBFE',
                            borderRadius: '28px',
                            padding: '2.8rem',
                            boxShadow: cardShadow
                        }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(37, 99, 235, 0.1)', color: blueAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.2rem' }}>
                                <FaFlask />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.8rem', fontFamily: "'Outfit', sans-serif" }}>
                                Research & Innovation
                            </h3>
                            <p style={{ color: secondaryTextColor, fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Collaborate on cutting-edge research, patent publications, startup incubation, and technological advancements at EASA.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, margin: '0 0 2rem 0', listStyle: 'none' }}>
                                {['Joint IEEE Research Publications', 'Utility Patent Filings & Commercialization', 'Startup Mentorship at EASA Idea Lab', 'Technology Transfer & R&D Grants'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: primaryTextColor, fontSize: '0.95rem', fontWeight: '600' }}>
                                        <FaCheckCircle style={{ color: blueAccent, flexShrink: 0 }} /> {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/research" style={{ color: blueAccent, fontWeight: '800', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                Explore Research Cell <FaChevronRight size={12} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERNATIONAL ALUMNI */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{
                        background: cardBg,
                        border: cardBorder,
                        borderRadius: '32px',
                        padding: '3.5rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '3rem',
                        alignItems: 'center',
                        boxShadow: cardShadow
                    }}>
                        <div>
                            <div style={{ color: blueAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaGlobe /> GLOBAL PRESENCE
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: '900', color: primaryTextColor, marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>
                                International Alumni Network
                            </h2>
                            <p style={{ color: secondaryTextColor, fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.8rem' }}>
                                EASA graduates live and work across 25+ countries, including the USA, UK, UAE, Germany, Australia, Singapore, and Canada. Join your regional alumni chapter to connect with fellow EASAians abroad.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/alumni-social" style={{
                                    background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF',
                                    border: isDark ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #BFDBFE',
                                    color: blueAccent,
                                    padding: '0.9rem 2.2rem',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    textDecoration: 'none'
                                }}>
                                    Find International Alumni
                                </Link>
                            </div>
                        </div>

                        {/* Interactive World Visual Graphic */}
                        <div style={{ background: isDark ? 'rgba(0,0,0,0.3)' : '#F1F5F9', border: cardBorder, borderRadius: '24px', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
                            <FaGlobe size={90} style={{ color: blueAccent, opacity: 0.3, marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: primaryTextColor, margin: '0 0 0.5rem 0' }}>Interactive World Map</h4>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor }}>Country-wise chapters & international networking hubs launching soon.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* UPCOMING NEWS & EVENTS */}
            <section style={{ padding: '5rem 0', background: sectionBg, borderTop: cardBorder, borderBottom: cardBorder }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
                        <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                            <FaCalendarAlt /> ALUMNI CALENDAR
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, fontFamily: "'Outfit', sans-serif" }}>
                            Upcoming Alumni News & Events
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {newsEventsList.map((event, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -6 }}
                                style={{
                                    background: cardBg,
                                    border: cardBorder,
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: cardShadow
                                }}
                            >
                                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#ffffff', fontWeight: '800', fontSize: '0.75rem', padding: '4px 12px', borderRadius: '50px' }}>
                                        {event.type}
                                    </span>
                                </div>
                                <div style={{ padding: '1.8rem' }}>
                                    <div style={{ fontSize: '0.85rem', color: goldAccent, fontWeight: '800', marginBottom: '0.4rem' }}>{event.date}</div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: primaryTextColor, marginBottom: '0.6rem', lineHeight: '1.3' }}>{event.title}</h3>
                                    <div style={{ fontSize: '0.85rem', color: secondaryTextColor, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaMapMarkerAlt /> {event.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PHOTO GALLERY */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
                        <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                            <FaImages /> MEMORIES & EVENTS
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, fontFamily: "'Outfit', sans-serif" }}>
                            Alumni Photo Gallery
                        </h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                        {['All', 'Convocation', 'Alumni Events', 'Campus Memories', 'Industry Visits', 'Guest Lectures'].map((tab, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveGalleryTab(tab)}
                                style={{
                                    padding: '0.55rem 1.4rem',
                                    borderRadius: '50px',
                                    border: activeGalleryTab === tab ? `2px solid ${goldAccent}` : cardBorder,
                                    background: activeGalleryTab === tab 
                                        ? (isDark ? 'rgba(248, 213, 61, 0.2)' : 'rgba(217, 119, 6, 0.12)')
                                        : (isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'),
                                    color: activeGalleryTab === tab ? goldAccent : secondaryTextColor,
                                    fontWeight: '800',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    boxShadow: activeGalleryTab === tab ? '0 4px 15px rgba(217,119,6,0.2)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredGallery.map((item, idx) => (
                            <div key={idx} style={{ borderRadius: '20px', overflow: 'hidden', border: cardBorder, height: '230px', position: 'relative', boxShadow: cardShadow }}>
                                <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', padding: '1.2rem', color: '#FFF' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#FDE68A', fontWeight: '800', textTransform: 'uppercase' }}>{item.category}</span>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: '2px 0 0 0' }}>{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section style={{ padding: '5rem 0', background: sectionBg, borderTop: cardBorder, borderBottom: cardBorder }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
                        <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                            <FaQuoteLeft /> ALUMNI VOICES
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, fontFamily: "'Outfit', sans-serif" }}>
                            What Our Alumni Say
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
                        {testimonials.map((testi, idx) => (
                            <div key={idx} style={{
                                background: cardBg,
                                border: cardBorder,
                                borderRadius: '24px',
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: cardShadow
                            }}>
                                <p style={{ fontSize: '1.05rem', color: secondaryTextColor, lineHeight: '1.7', fontStyle: 'italic', marginBottom: '2rem' }}>
                                    "{testi.quote}"
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={testi.image} alt={testi.name} style={{ width: '56px', height: '56px', borderRadius: '50%', border: `2px solid ${goldAccent}`, objectFit: 'cover' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: primaryTextColor, margin: '0 0 0.2rem 0' }}>{testi.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: goldAccent, fontWeight: '700', margin: 0 }}>{testi.batch} • {testi.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONNECT WITH US / OFFICE DETAILS */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{
                        background: cardBg,
                        border: isDark ? '2px solid rgba(248, 213, 61, 0.4)' : '1px solid rgba(217, 119, 6, 0.3)',
                        borderRadius: '32px',
                        padding: '3.5rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '3rem',
                        alignItems: 'center',
                        boxShadow: cardShadow
                    }}>
                        <div>
                            <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                                REACH OUT TO US
                            </div>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginBottom: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>
                                Office of International Relations & Alumni Connect
                            </h2>
                            <p style={{ color: goldAccent, fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem' }}>
                                Director – International Relations and Alumni Connect
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: secondaryTextColor }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: isDark ? 'rgba(248, 213, 61, 0.15)' : 'rgba(217, 119, 6, 0.1)', color: goldAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaEnvelope />
                                    </div>
                                    <span style={{ fontWeight: '600' }}>director.irac@ecetonline.com</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: secondaryTextColor }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: isDark ? 'rgba(248, 213, 61, 0.15)' : 'rgba(217, 119, 6, 0.1)', color: goldAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <span style={{ fontWeight: '600' }}>EASA College of Engineering and Technology, Coimbatore, Tamil Nadu, India</span>
                                </div>
                            </div>
                        </div>

                        {/* MOTTO BANNER */}
                        <div style={{
                            background: isDark 
                                ? 'linear-gradient(135deg, rgba(248, 213, 61, 0.15) 0%, rgba(248, 213, 61, 0.03) 100%)'
                                : 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                            border: isDark ? '1px solid rgba(248, 213, 61, 0.4)' : '1px solid #FDE68A',
                            borderRadius: '24px',
                            padding: '3rem 2rem',
                            textAlign: 'center'
                        }}>
                            <FaGraduationCap size={60} style={{ color: goldAccent, marginBottom: '1.2rem' }} />
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: primaryTextColor, fontStyle: 'italic', margin: '0 0 1rem 0', fontFamily: "'Outfit', sans-serif" }}>
                                "Once an EASAian, Always an EASAian."
                            </h3>
                            <p style={{ color: secondaryTextColor, fontSize: '0.95rem', margin: 0 }}>
                                Building a lifelong global legacy together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MENTOR VOLUNTEER MODAL */}
            <AnimatePresence>
                {isMentorModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMentorModalOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: cardBg,
                                border: cardBorder,
                                borderRadius: '28px',
                                padding: '2.5rem',
                                maxWidth: '550px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
                            }}
                        >
                            <button
                                onClick={() => setIsMentorModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.2rem',
                                    right: '1.2rem',
                                    background: isDark ? 'rgba(255,255,255,0.1)' : '#F1F5F9',
                                    border: 'none',
                                    color: primaryTextColor,
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaTimes />
                            </button>

                            {!mentorFormSubmitted ? (
                                <form onSubmit={handleMentorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                                        <div style={{ color: goldAccent, fontWeight: '800', fontSize: '0.85rem' }}>VOLUNTEER AS A MENTOR</div>
                                        <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: '0.3rem 0' }}>Join EASA Mentorship Cell</h3>
                                        <p style={{ color: secondaryTextColor, fontSize: '0.9rem', margin: 0 }}>Share your expertise with current engineering students.</p>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', color: primaryTextColor, fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Full Name *</label>
                                        <input type="text" required value={mentorFormData.name} onChange={e => setMentorFormData({ ...mentorFormData, name: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }} placeholder="Enter your name" />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', color: primaryTextColor, fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Email *</label>
                                            <input type="email" required value={mentorFormData.email} onChange={e => setMentorFormData({ ...mentorFormData, email: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }} placeholder="alumni@email.com" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: primaryTextColor, fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Phone *</label>
                                            <input type="tel" required value={mentorFormData.phone} onChange={e => setMentorFormData({ ...mentorFormData, phone: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }} placeholder="+91 XXX XXX XXXX" />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', color: primaryTextColor, fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Volunteer Role Preference</label>
                                        <select value={mentorFormData.role} onChange={e => setMentorFormData({ ...mentorFormData, role: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? '#0F172A' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}>
                                            <option value="Student Mentor">Student Mentor</option>
                                            <option value="Guest Lecturer">Guest Lecturer</option>
                                            <option value="Industry Expert">Industry Expert</option>
                                            <option value="Career Coach">Career Coach</option>
                                            <option value="Placement Partner">Placement Partner</option>
                                            <option value="Startup Mentor">Startup Mentor</option>
                                            <option value="Research Collaborator">Research Collaborator</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', color: primaryTextColor, fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Company & Area of Expertise</label>
                                        <textarea rows={3} value={mentorFormData.expertise} onChange={e => setMentorFormData({ ...mentorFormData, expertise: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }} placeholder="Current designation, company & domain expertise..." />
                                    </div>

                                    <button type="submit" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#ffffff', padding: '1rem', borderRadius: '50px', fontWeight: '900', fontSize: '1rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)' }}>
                                        SUBMIT MENTOR INTEREST
                                    </button>
                                </form>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                    <FaCheckCircle size={50} style={{ color: '#10B981', marginBottom: '1rem' }} />
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.5rem' }}>Thank You for Volunteering!</h3>
                                    <p style={{ color: secondaryTextColor }}>Our Office of International Relations & Alumni Connect team will reach out to you shortly.</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default AlumniConnectPage;
