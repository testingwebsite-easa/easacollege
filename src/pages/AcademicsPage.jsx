import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap, FaSearch, FaArrowRight, FaLaptopCode,
    FaMicrochip, FaRobot, FaCogs, FaLeaf, FaBuilding,
    FaBroadcastTower, FaBolt, FaHeartbeat, FaCheckCircle,
    FaBookOpen, FaUserTie, FaFlask, FaUsers
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import { departments as staticDepartments } from '../data/departmentsData';

const getDepartmentIcon = (slug = '') => {
    const s = slug.toLowerCase();
    if (s.includes('ai') || s.includes('intelligence') || s.includes('machine-learning')) return <FaRobot />;
    if (s.includes('cyber') || s.includes('security')) return <FaLaptopCode />;
    if (s.includes('computer') || s.includes('information') || s.includes('it')) return <FaLaptopCode />;
    if (s.includes('electronics') || s.includes('communication') || s.includes('ece') || s.includes('communication-systems')) return <FaBroadcastTower />;
    if (s.includes('electrical') || s.includes('eee') || s.includes('power')) return <FaBolt />;
    if (s.includes('biomedical') || s.includes('bme')) return <FaHeartbeat />;
    if (s.includes('mechanical') || s.includes('mech') || s.includes('manufacturing')) return <FaCogs />;
    if (s.includes('agriculture') || s.includes('agri')) return <FaLeaf />;
    if (s.includes('construction') || s.includes('structural')) return <FaBuilding />;
    return <FaGraduationCap />;
};

const AcademicsPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('ALL');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter departments based on search query and program level
    const filteredDepartments = staticDepartments.filter((dept) => {
        const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (dept.overview && dept.overview.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (dept.slug && dept.slug.toLowerCase().includes(searchQuery.toLowerCase()));

        const deptType = (dept.type || 'UG').toUpperCase();
        const matchesLevel = selectedLevel === 'ALL' || deptType === selectedLevel;

        return matchesSearch && matchesLevel;
    });

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 15px 35px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const ugCount = staticDepartments.filter(d => (d.type || 'UG').toUpperCase() === 'UG').length;
    const pgCount = staticDepartments.filter(d => (d.type || '').toUpperCase() === 'PG').length;

    return (
        <div className="academics-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO
                title="Academic Departments & Programs | EASA College"
                description="Explore all Undergraduate (UG) and Postgraduate (PG) engineering departments at EASA College of Engineering and Technology, Coimbatore."
                keywords="EASA Academic Departments, B.E Engineering Coimbatore, B.Tech AI & Data Science, CSE, ECE, EEE, Mechanical, Agriculture, Biomedical, M.E Courses"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="academics"
                defaultTitle="Academic Departments"
                defaultSubtitle="Discover our cutting-edge Undergraduate and Postgraduate engineering programs co-designed with Industry 4.0 leaders."
                defaultImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
            />

            <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

                {/* SEARCH & LEVEL FILTER CONTROLS */}
                <div style={{
                    background: cardBg,
                    borderRadius: '24px',
                    border: cardBorder,
                    padding: '2rem',
                    boxShadow: cardShadow,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                        
                        {/* PROGRAM LEVEL TABS */}
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setSelectedLevel('ALL')}
                                style={{
                                    padding: '0.65rem 1.4rem',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: selectedLevel === 'ALL'
                                        ? 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)'
                                        : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
                                    color: selectedLevel === 'ALL' ? '#ffffff' : primaryTextColor,
                                    boxShadow: selectedLevel === 'ALL' ? '0 4px 15px rgba(37,99,235,0.3)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                All Programs ({staticDepartments.length})
                            </button>
                            <button
                                onClick={() => setSelectedLevel('UG')}
                                style={{
                                    padding: '0.65rem 1.4rem',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: selectedLevel === 'UG'
                                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                        : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
                                    color: selectedLevel === 'UG' ? '#ffffff' : primaryTextColor,
                                    boxShadow: selectedLevel === 'UG' ? '0 4px 15px rgba(16,185,129,0.3)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Undergraduate - UG ({ugCount})
                            </button>
                            <button
                                onClick={() => setSelectedLevel('PG')}
                                style={{
                                    padding: '0.65rem 1.4rem',
                                    borderRadius: '50px',
                                    fontWeight: '800',
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: selectedLevel === 'PG'
                                        ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
                                        : (isDark ? 'rgba(255,255,255,0.06)' : '#F1F5F9'),
                                    color: selectedLevel === 'PG' ? '#ffffff' : primaryTextColor,
                                    boxShadow: selectedLevel === 'PG' ? '0 4px 15px rgba(139,92,246,0.3)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Postgraduate - PG ({pgCount})
                            </button>
                        </div>

                        {/* SEARCH INPUT */}
                        <div style={{ position: 'relative', minWidth: 'min(100%, 300px)', flex: 1, maxWidth: '420px' }}>
                            <FaSearch style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: secondaryTextColor }} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search department by name..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                                    borderRadius: '50px',
                                    border: cardBorder,
                                    background: isDark ? 'var(--bg-section)' : '#F8FAFC',
                                    color: primaryTextColor,
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* DEPARTMENT CARDS GRID */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                {selectedLevel === 'ALL' ? 'All Engineering Departments' : selectedLevel === 'UG' ? 'Undergraduate (B.E. / B.Tech) Departments' : 'Postgraduate (M.E.) Departments'}
                            </h2>
                            <p style={{ color: secondaryTextColor, margin: '0.4rem 0 0', fontSize: '0.95rem' }}>
                                Showing {filteredDepartments.length} degree programs available for enrollment.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
                        {filteredDepartments.map((dept, index) => {
                            const isUg = (dept.type || 'UG').toUpperCase() === 'UG';
                            const badgeBg = isUg ? 'rgba(16, 185, 129, 0.15)' : 'rgba(139, 92, 246, 0.15)';
                            const badgeColor = isUg ? '#10B981' : (isDark ? '#A78BFA' : '#7C3AED');
                            const deptLink = `/department/${dept.slug || dept.id}`;

                            return (
                                <motion.div
                                    key={dept.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    style={{
                                        background: cardBg,
                                        borderRadius: '24px',
                                        border: cardBorder,
                                        boxShadow: cardShadow,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                    }}
                                    whileHover={{ y: -6, boxShadow: isDark ? '0 20px 45px rgba(0,0,0,0.45)' : '0 18px 40px rgba(0,0,0,0.1)' }}
                                >
                                    <div>
                                        {/* HERO PHOTO HEADER */}
                                        <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                            <img
                                                src={dept.heroImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'}
                                                alt={dept.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 70%)' }} />
                                            
                                            {/* PROGRAM BADGE */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                left: '1rem',
                                                padding: '0.35rem 0.9rem',
                                                borderRadius: '50px',
                                                background: badgeBg,
                                                color: badgeColor,
                                                backdropFilter: 'blur(8px)',
                                                border: `1px solid ${badgeColor}44`,
                                                fontWeight: '900',
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {isUg ? 'B.E. / B.Tech (UG)' : 'M.E. (PG)'}
                                            </div>

                                            {/* ICON IN CORNER */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '1rem',
                                                right: '1rem',
                                                width: '42px',
                                                height: '42px',
                                                borderRadius: '12px',
                                                background: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(8px)',
                                                color: '#ffffff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem',
                                                border: '1px solid rgba(255,255,255,0.4)'
                                            }}>
                                                {getDepartmentIcon(dept.slug || dept.name)}
                                            </div>
                                        </div>

                                        {/* CARD BODY */}
                                        <div style={{ padding: '1.8rem' }}>
                                            <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.6rem', lineHeight: '1.3' }}>
                                                {dept.name}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                lineHeight: '1.6',
                                                color: secondaryTextColor,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                marginBottom: '1.2rem'
                                            }}>
                                                {dept.overview || 'Comprehensive engineering curriculum with high-tech laboratories, experiential learning, and industrial internships.'}
                                            </p>

                                            {/* STATS ROW */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                paddingTop: '0.8rem',
                                                borderTop: cardBorder,
                                                fontSize: '0.8rem',
                                                color: secondaryTextColor
                                            }}>
                                                {dept.studentCount && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <FaUsers style={{ color: accentColor }} /> {dept.studentCount} Students
                                                    </span>
                                                )}
                                                {dept.labCount && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <FaFlask style={{ color: '#10B981' }} /> {dept.labCount} Labs
                                                    </span>
                                                )}
                                                {dept.hod && dept.hod.name && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <FaUserTie style={{ color: '#F59E0B' }} /> HOD: {dept.hod.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CARD FOOTER LINK */}
                                    <div style={{ padding: '0 1.8rem 1.8rem' }}>
                                        <Link
                                            to={deptLink}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.6rem',
                                                width: '100%',
                                                padding: '0.85rem',
                                                borderRadius: '14px',
                                                background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#EFF6FF',
                                                color: accentColor,
                                                fontWeight: '800',
                                                fontSize: '0.9rem',
                                                textDecoration: 'none',
                                                border: isDark ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #BFDBFE',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.background = accentColor;
                                                e.currentTarget.style.color = '#ffffff';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.background = isDark ? 'rgba(56, 189, 248, 0.12)' : '#EFF6FF';
                                                e.currentTarget.style.color = accentColor;
                                            }}
                                        >
                                            <span>Explore Department</span>
                                            <FaArrowRight size={12} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* WHY STUDY AT EASA SECTION */}
                <section style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(16,185,129,0.15) 100%)' : 'linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 100%)',
                    borderRadius: '28px',
                    border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid #BAE6FD',
                    padding: '3rem 2.5rem',
                    boxShadow: cardShadow
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: 'rgba(37, 99, 235, 0.12)',
                            color: accentColor,
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Academic Excellence
                        </span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.6rem' }}>
                            Why Choose Engineering at EASA?
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: cardBg, padding: '1.8rem', borderRadius: '20px', border: cardBorder }}>
                            <div style={{ fontSize: '2rem', color: '#10B981', marginBottom: '0.8rem' }}><FaCheckCircle /></div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginBottom: '0.4rem' }}>Outcome-Based Education</h4>
                            <p style={{ fontSize: '0.88rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                NAAC 'A' Grade accredited OBE frameworks ensuring hands-on mastery of engineering principles.
                            </p>
                        </div>
                        <div style={{ background: cardBg, padding: '1.8rem', borderRadius: '20px', border: cardBorder }}>
                            <div style={{ fontSize: '2rem', color: accentColor, marginBottom: '0.8rem' }}><FaRobot /></div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginBottom: '0.4rem' }}>AICTE IDEA Lab</h4>
                            <p style={{ fontSize: '0.88rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                24/7 access to advanced 3D printers, CNC laser routers, and embedded IoT prototyping workstations.
                            </p>
                        </div>
                        <div style={{ background: cardBg, padding: '1.8rem', borderRadius: '20px', border: cardBorder }}>
                            <div style={{ fontSize: '2rem', color: '#8B5CF6', marginBottom: '0.8rem' }}><FaLaptopCode /></div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: primaryTextColor, marginBottom: '0.4rem' }}>ASCEND Career Cell</h4>
                            <p style={{ fontSize: '0.88rem', color: secondaryTextColor, lineHeight: '1.6', margin: 0 }}>
                                85%+ consistent campus placements, corporate internships, and international technical certification tracks.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default AcademicsPage;
