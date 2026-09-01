import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaSearch, FaFilter, FaIdCard, FaSpinner, FaTimes, FaDownload, FaShieldAlt, FaCheckCircle, FaUserGraduate } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';
import collegeLogo from '../assets/College Logo with White Letter.webp';
import { useTheme } from '../context/ThemeContext';

const AlumniSocial = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';

    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('All');
    const [departments, setDepartments] = useState([]);
    const [selectedAlumni, setSelectedAlumni] = useState(null);

    const modalIdCardRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [alumniRes, deptRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/alumni`),
                    fetch(`${API_BASE_URL}/api/departments`)
                ]);
                const alumniData = await alumniRes.json();
                const deptData = await deptRes.json();
                
                setAlumni(alumniData);
                if (Array.isArray(deptData)) {
                    const sortedDepts = [...deptData].sort((a, b) => {
                        const nameA = (a.name || a.departmentName || a || '').toString().trim();
                        const nameB = (b.name || b.departmentName || b || '').toString().trim();
                        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
                    });
                    setDepartments(sortedDepts);
                } else {
                    setDepartments([]);
                }
            } catch (err) {
                console.error("Error fetching alumni social data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getAlumniPhoto = (url, name = 'Alumni') => {
        if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('profile-placeholder')) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Alumni')}&background=0F172A&color=F8D53D&bold=true&size=200`;
        }
        return url;
    };

    const filteredAlumni = alumni.filter(person => {
        const nameMatch = (person.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const batchMatch = (person.batch || '').toString().toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSearch = nameMatch || batchMatch;
        const matchesDept = filterDept === 'All' || person.department === filterDept;
        return matchesSearch && matchesDept;
    });

    const downloadIDCard = async (alumniName) => {
        if (!modalIdCardRef.current) return;

        try {
            const canvas = await html2canvas(modalIdCardRef.current, {
                backgroundColor: null,
                scale: 3,
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            const link = document.createElement('a');
            link.download = `EASA_Alumni_ID_${(alumniName || 'Card').replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("ID Card Generation Failed", err);
            alert("Could not generate ID card. Please try again.");
        }
    };

    const getQrPayload = (person) => {
        if (!person) return '';
        const phone = person.phone || person.mobile || person.phoneNumber || 'N/A';
        const cardId = person.alumniId || (person._id ? `ECET-${person._id.slice(-8).toUpperCase()}` : `ECET-AL-MEMBER`);
        return `EASA COLLEGE ALUMNI DIGITAL ID
Name: ${person.name || 'Alumni Member'}
Card No: ${cardId}
Department: ${person.department || 'N/A'}
Batch: ${person.batch || 'N/A'}
Job Title: ${person.currentJob || 'N/A'}
Mobile: ${phone}
Email: ${person.email || 'N/A'}
Status: Verified Lifetime Alumni`;
    };

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 15px 35px rgba(0,0,0,0.35)' : '0 10px 30px rgba(0,0,0,0.06)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#cbd5e1' : '#475569';
    const goldAccent = isDark ? '#F8D53D' : '#D97706';
    const blueAccent = isDark ? '#38BDF8' : '#2563EB';

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', transition: 'background-color 0.3s ease' }}>
            <SEO title="Alumni Social Hub | EASA College" description="Connect with the global EASA Alumni network. Reconnect, share, and grow together." />
            <Navbar />

            <GlobalHero 
                pageKey="alumni-social"
                defaultTitle="Alumni Social Hub"
                defaultSubtitle="Discover and connect with your fellow graduates. Building a lifelong network of EASAians worldwide."
                defaultImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            />

            <main className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1300px', margin: '0 auto' }}>
                {/* Search & Filter Bar */}
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1.5rem', 
                    marginBottom: '3.5rem',
                    background: cardBg,
                    padding: '1.5rem 2rem',
                    borderRadius: '24px',
                    border: cardBorder,
                    boxShadow: cardShadow,
                    alignItems: 'center'
                }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: 'min(100%, 280px)' }}>
                        <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: secondaryTextColor }} />
                        <input 
                            type="text" 
                            placeholder="Search alumni by name or batch year..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 3.2rem',
                                background: isDark ? 'rgba(0,0,0,0.25)' : '#F8FAFC',
                                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #CBD5E1',
                                borderRadius: '50px',
                                color: primaryTextColor,
                                outline: 'none',
                                fontSize: '0.92rem'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 'min(100%, 260px)' }}>
                        <FaFilter style={{ color: goldAccent, flexShrink: 0 }} />
                        <select 
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.85rem 1.2rem',
                                background: isDark ? '#0F172A' : '#F8FAFC',
                                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #CBD5E1',
                                borderRadius: '50px',
                                color: primaryTextColor,
                                outline: 'none',
                                cursor: 'pointer',
                                fontSize: '0.92rem'
                            }}
                        >
                            <option value="All">All Departments ({alumni.length})</option>
                            {departments.map(dept => (
                                <option key={dept._id || dept.id || dept.name} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '6rem 2rem', color: secondaryTextColor }}>
                        <FaSpinner className="spin" size={40} style={{ color: goldAccent }} />
                        <p style={{ marginTop: '1.2rem', fontSize: '1.1rem', fontWeight: '700' }}>Bringing our alumni community together...</p>
                    </div>
                ) : filteredAlumni.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '6rem 2rem', background: cardBg, borderRadius: '24px', border: cardBorder, boxShadow: cardShadow }}>
                        <FaUserGraduate size={50} style={{ color: goldAccent, opacity: 0.6, marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: primaryTextColor, margin: '0 0 0.5rem 0' }}>No Alumni Found</h3>
                        <p style={{ color: secondaryTextColor, margin: 0 }}>Try searching with a different keyword or batch year.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
                        <AnimatePresence>
                            {filteredAlumni.map((person, index) => {
                                const displayPhone = person.phone || person.mobile || person.phoneNumber || '';
                                const cardId = person.alumniId || (person._id ? `ECET-${person._id.slice(-6).toUpperCase()}` : 'ALUMNI');

                                return (
                                    <motion.div
                                        key={person._id || index}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                        whileHover={{ y: -8, boxShadow: isDark ? '0 20px 45px rgba(0,0,0,0.5)' : '0 18px 40px rgba(0,0,0,0.1)' }}
                                        style={{
                                            background: cardBg,
                                            border: cardBorder,
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            boxShadow: cardShadow,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                        }}
                                    >
                                        {/* Top Accent Strip */}
                                        <div style={{ height: '5px', background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 50%, #2563EB 100%)' }} />

                                        {/* Header Badges */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem 0.5rem 1.5rem' }}>
                                            <span style={{ 
                                                fontSize: '0.72rem', 
                                                fontWeight: '800', 
                                                color: goldAccent,
                                                background: isDark ? 'rgba(248, 213, 61, 0.15)' : 'rgba(217, 119, 6, 0.1)',
                                                border: isDark ? '1px solid rgba(248, 213, 61, 0.3)' : '1px solid rgba(217, 119, 6, 0.3)',
                                                padding: '3px 10px',
                                                borderRadius: '20px',
                                                fontFamily: "'Courier New', monospace"
                                            }}>
                                                ID: {cardId}
                                            </span>

                                            <span style={{ 
                                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9', 
                                                color: primaryTextColor,
                                                padding: '4px 12px',
                                                borderRadius: '50px',
                                                fontSize: '0.78rem',
                                                fontWeight: '800'
                                            }}>
                                                Class of {person.batch?.match(/20\d{2}/g)?.pop() || person.batch || 'Alumni'}
                                            </span>
                                        </div>

                                        {/* Member Info Body */}
                                        <div style={{ padding: '1.2rem 1.5rem 1.8rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                                <div style={{ 
                                                    width: '74px', 
                                                    height: '74px', 
                                                    borderRadius: '50%', 
                                                    border: `3px solid ${goldAccent}`,
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                                    position: 'relative'
                                                }}>
                                                    <img 
                                                        src={getAlumniPhoto(person.photoUrl, person.name)} 
                                                        alt={person.name || "Alumni Member"}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name || 'Alumni')}&background=0F172A&color=F8D53D&bold=true&size=200`;
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.3rem 0', lineHeight: '1.2' }}>
                                                        {person.name}
                                                    </h3>
                                                    <p style={{ color: goldAccent, fontSize: '0.85rem', fontWeight: '800', margin: 0 }}>
                                                        {person.department}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Details Rows */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', padding: '1rem', borderRadius: '16px', border: cardBorder }}>
                                                {person.currentJob && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: secondaryTextColor, fontSize: '0.88rem' }}>
                                                        <FaBriefcase style={{ color: goldAccent, flexShrink: 0 }} />
                                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.currentJob}</span>
                                                    </div>
                                                )}

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: secondaryTextColor, fontSize: '0.88rem' }}>
                                                    <FaPhone style={{ color: goldAccent, flexShrink: 0 }} />
                                                    <span style={{ fontWeight: '700', color: primaryTextColor }}>{displayPhone || 'Not Provided'}</span>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: secondaryTextColor, fontSize: '0.88rem' }}>
                                                    <FaEnvelope style={{ color: goldAccent, flexShrink: 0 }} />
                                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Actions */}
                                        <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <button 
                                                onClick={() => setSelectedAlumni(person)}
                                                style={{ 
                                                    flex: 1, 
                                                    padding: '0.85rem 1.2rem', 
                                                    background: isDark ? 'rgba(248, 213, 61, 0.12)' : '#FEF3C7', 
                                                    border: isDark ? '1px solid rgba(248, 213, 61, 0.3)' : '1px solid #FDE68A', 
                                                    borderRadius: '14px', 
                                                    color: goldAccent, 
                                                    fontWeight: '900',
                                                    fontSize: '0.88rem',
                                                    cursor: 'pointer', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center', 
                                                    gap: '8px',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseOver={e => {
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
                                                    e.currentTarget.style.color = '#ffffff';
                                                }}
                                                onMouseOut={e => {
                                                    e.currentTarget.style.background = isDark ? 'rgba(248, 213, 61, 0.12)' : '#FEF3C7';
                                                    e.currentTarget.style.color = goldAccent;
                                                }}
                                            >
                                                <FaIdCard size={15} /> VIEW DIGITAL CARD
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            {/* DIGITAL ID CARD MODAL */}
            <AnimatePresence>
                {selectedAlumni && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAlumni(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            overflowY: 'auto'
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
                                padding: '2rem 2.2rem 2.2rem 2.2rem',
                                maxWidth: '620px',
                                width: '100%',
                                maxHeight: '92vh',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.4rem',
                                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8)',
                                position: 'relative',
                                margin: 'auto'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedAlumni(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.2rem',
                                    right: '1.2rem',
                                    background: isDark ? 'rgba(255, 255, 255, 0.1)' : '#F1F5F9',
                                    border: 'none',
                                    color: primaryTextColor,
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: '0.2s',
                                    zIndex: 10
                                }}
                            >
                                <FaTimes size={18} />
                            </button>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '6px', 
                                    color: goldAccent, 
                                    fontSize: '0.8rem', 
                                    fontWeight: '800', 
                                    marginBottom: '0.3rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    <FaShieldAlt /> EASA ALUMNI ASSOCIATION
                                </div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>Official Alumni Digital ID</h2>
                            </div>

                            {/* ID CARD RENDERED FOR DOWNLOAD */}
                            <div 
                                ref={modalIdCardRef} 
                                style={{
                                    width: '560px',
                                    maxWidth: '100%',
                                    minHeight: '345px',
                                    background: 'linear-gradient(135deg, #070B14 0%, #111827 50%, #0A0F1D 100%)',
                                    borderRadius: '24px',
                                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(248, 213, 61, 0.15)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '2px solid rgba(248, 213, 61, 0.4)',
                                    boxSizing: 'border-box',
                                    padding: '1.6rem 1.8rem',
                                    fontFamily: "'Inter', 'Outfit', sans-serif",
                                    userSelect: 'none',
                                    flexShrink: 0
                                }}
                            >
                                {/* Decorative Shimmer & Glow Accents */}
                                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
                                    <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248, 213, 61, 0.15) 0%, rgba(0,0,0,0) 70%)' }} />
                                    <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(0,0,0,0) 70%)' }} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #F8D53D 0%, #EAB308 50%, #3B82F6 100%)' }} />
                                </div>

                                {/* Top Header: Logo + Digital Badge */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', position: 'relative', zIndex: 2 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img 
                                            src={collegeLogo} 
                                            alt="EASA College Logo" 
                                            style={{ height: '40px', maxWidth: '240px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '6px',
                                        background: 'linear-gradient(135deg, rgba(248, 213, 61, 0.2) 0%, rgba(248, 213, 61, 0.05) 100%)',
                                        border: '1px solid rgba(248, 213, 61, 0.5)',
                                        padding: '4px 10px',
                                        borderRadius: '20px'
                                    }}>
                                        <FaShieldAlt style={{ color: '#F8D53D', fontSize: '0.75rem' }} />
                                        <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#F8D53D', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                            ALUMNI DIGITAL ID
                                        </span>
                                    </div>
                                </div>

                                {/* Metallic Gold Line */}
                                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(248, 213, 61, 0.6) 0%, rgba(248, 213, 61, 0.1) 100%)', marginBottom: '1.2rem', position: 'relative', zIndex: 2 }} />

                                {/* Middle Section: Photo & Info */}
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flex: 1, position: 'relative', zIndex: 2 }}>
                                    {/* Photo & Verified Status */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '110px',
                                            height: '120px',
                                            borderRadius: '16px',
                                            border: '2px solid #F8D53D',
                                            background: '#0F172A',
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
                                            position: 'relative'
                                        }}>
                                            <img
                                                src={getAlumniPhoto(selectedAlumni.photoUrl, selectedAlumni.name)}
                                                alt={selectedAlumni.name || "Alumni Profile"}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedAlumni.name || 'Alumni')}&background=0F172A&color=F8D53D&bold=true&size=200`;
                                                }}
                                            />
                                        </div>
                                        
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '4px',
                                            fontSize: '0.65rem',
                                            fontWeight: '700',
                                            color: '#4ADE80',
                                            background: 'rgba(74, 222, 128, 0.1)',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(74, 222, 128, 0.2)'
                                        }}>
                                            <FaCheckCircle style={{ fontSize: '0.65rem' }} /> VERIFIED
                                        </div>
                                    </div>

                                    {/* Alumni Details */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '1.35rem',
                                            fontWeight: '900',
                                            color: '#FFFFFF',
                                            margin: 0,
                                            lineHeight: '1.2',
                                            letterSpacing: '0.5px',
                                            textTransform: 'uppercase',
                                            fontFamily: "'Outfit', sans-serif"
                                        }}>
                                            {selectedAlumni.name}
                                        </h3>

                                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F8D53D', lineHeight: '1.2' }}>
                                            {selectedAlumni.department}
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                fontWeight: '800', 
                                                color: '#000', 
                                                background: '#F8D53D',
                                                padding: '2px 8px', 
                                                borderRadius: '6px' 
                                            }}>
                                                Batch {selectedAlumni.batch || 'N/A'}
                                            </span>
                                            
                                            {selectedAlumni.currentJob && (
                                                <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <FaBriefcase style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }} /> {selectedAlumni.currentJob}
                                                </span>
                                            )}
                                        </div>

                                        {/* Mobile Number & Email Contact Box */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
                                                <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(248, 213, 61, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8D53D', fontSize: '0.7rem', flexShrink: 0 }}>
                                                    <FaPhone />
                                                </div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '0.5px' }}>
                                                    {selectedAlumni.phone || selectedAlumni.mobile || selectedAlumni.phoneNumber || 'Not Provided'}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)' }}>
                                                <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(248, 213, 61, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8D53D', fontSize: '0.7rem', flexShrink: 0 }}>
                                                    <FaEnvelope />
                                                </div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                                                    {selectedAlumni.email || 'alumni@easa.ac.in'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Unique Card Number Badge & Barcode */}
                                <div style={{ 
                                    marginTop: '0.8rem', 
                                    paddingTop: '0.7rem', 
                                    borderTop: '1px dashed rgba(255, 255, 255, 0.15)', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            UNIQUE CARD NO:
                                        </span>
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(248, 213, 61, 0.25) 0%, rgba(248, 213, 61, 0.1) 100%)',
                                            border: '1px solid rgba(248, 213, 61, 0.6)',
                                            padding: '4px 12px',
                                            borderRadius: '8px',
                                            color: '#F8D53D',
                                            fontWeight: '900',
                                            fontSize: '0.9rem',
                                            letterSpacing: '1.5px',
                                            fontFamily: "'Courier New', monospace",
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                        }}>
                                            {selectedAlumni.alumniId || (selectedAlumni._id ? `ECET-${selectedAlumni._id.slice(-8).toUpperCase()}` : 'ECET-AL-MEMBER')}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            padding: '4px',
                                            background: '#FFFFFF',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                                            flexShrink: 0
                                        }}>
                                            <QRCodeSVG 
                                                value={getQrPayload(selectedAlumni)} 
                                                size={54} 
                                                bgColor="#FFFFFF"
                                                fgColor="#070B14"
                                                level="M"
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SCAN TO VERIFY</span>
                                            <span style={{ fontSize: '0.65rem', color: '#F8D53D', fontWeight: '800' }}>VALID LIFETIME</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={() => downloadIDCard(selectedAlumni.name)}
                                style={{
                                    padding: '1rem 3rem',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#ffffff',
                                    boxShadow: '0 10px 25px rgba(217, 119, 6, 0.35)',
                                    marginTop: '0.5rem',
                                    flexShrink: 0
                                }}
                            >
                                <FaDownload size={16} /> DOWNLOAD DIGITAL CARD
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AlumniSocial;
