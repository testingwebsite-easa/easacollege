import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaSearch, FaFilter, FaIdCard, FaLinkedin, FaGithub, FaTwitter, FaSpinner, FaTimes, FaDownload, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';
import collegeLogo from '../assets/College Logo with White Letter.webp';

const AlumniSocial = () => {
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

    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
            <SEO title="Alumni Social" description="Connect with the global EASA Alumni network. Reconnect, share, and grow together." />
            <Navbar />

            <GlobalHero 
                pageKey="alumni-social"
                defaultTitle="Alumni Social Hub"
                defaultSubtitle="Discover and connect with your fellow graduates. Building a lifelong network of EASAians."
                defaultImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            />

            <main className="container" style={{ padding: '4rem 2rem' }}>
                {/* Search & Filter Bar */}
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1.5rem', 
                    marginBottom: '4rem',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.5rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
                        <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by name or batch year..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3.5rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '14px',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaFilter style={{ color: '#F8D53D' }} />
                        <select 
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '14px',
                                color: '#fff',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="All">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept._id || dept.id || dept.name} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                        <FaSpinner className="spin" size={40} />
                        <p style={{ marginTop: '1rem' }}>Bringing our community together...</p>
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
                                        transition={{ duration: 0.3, delay: index * 0.04 }}
                                        whileHover={{ y: -8 }}
                                        style={{
                                            background: 'rgba(15, 23, 42, 0.75)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justify: 'space-between'
                                        }}
                                    >
                                        {/* Top Accent Strip */}
                                        <div style={{ height: '5px', background: 'linear-gradient(90deg, #F8D53D 0%, #EAB308 50%, #3B82F6 100%)' }} />

                                        {/* Header Badges */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem 0.5rem 1.5rem' }}>
                                            <span style={{ 
                                                fontSize: '0.72rem', 
                                                fontWeight: '800', 
                                                color: '#F8D53D',
                                                background: 'rgba(248, 213, 61, 0.15)',
                                                border: '1px solid rgba(248, 213, 61, 0.3)',
                                                padding: '3px 10px',
                                                borderRadius: '20px',
                                                fontFamily: "'Courier New', monospace"
                                            }}>
                                                ID: {cardId}
                                            </span>

                                            <span style={{ 
                                                background: 'rgba(255, 255, 255, 0.08)', 
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                padding: '4px 12px',
                                                borderRadius: '50px',
                                                fontSize: '0.78rem',
                                                fontWeight: '700'
                                            }}>
                                                Class of {person.batch?.match(/20\d{2}/g)?.pop() || person.batch || 'Alumni'}
                                            </span>
                                        </div>

                                        {/* Member Info Body */}
                                        <div style={{ padding: '1.5rem 1.5rem 2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                                <div style={{ 
                                                    width: '75px', 
                                                    height: '75px', 
                                                    borderRadius: '50%', 
                                                    border: '3px solid #F8D53D',
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
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
                                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', margin: '0 0 0.3rem 0', lineHeight: '1.2' }}>
                                                        {person.name}
                                                    </h3>
                                                    <p style={{ color: '#F8D53D', fontSize: '0.88rem', fontWeight: '700', margin: 0 }}>
                                                        {person.department}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Details Rows */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                                {person.currentJob && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>
                                                        <FaBriefcase style={{ color: '#F8D53D', flexShrink: 0 }} />
                                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.currentJob}</span>
                                                    </div>
                                                )}

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>
                                                    <FaPhone style={{ color: '#F8D53D', flexShrink: 0 }} />
                                                    <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{displayPhone || 'Not Provided'}</span>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>
                                                    <FaEnvelope style={{ color: '#F8D53D', flexShrink: 0 }} />
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
                                                    padding: '0.8rem 1.2rem', 
                                                    background: 'linear-gradient(135deg, rgba(248, 213, 61, 0.2) 0%, rgba(248, 213, 61, 0.08) 100%)', 
                                                    border: '1px solid rgba(248, 213, 61, 0.4)', 
                                                    borderRadius: '12px', 
                                                    color: '#F8D53D', 
                                                    fontWeight: '800',
                                                    fontSize: '0.9rem',
                                                    cursor: 'pointer', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justify: 'center', 
                                                    gap: '8px',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseOver={e => {
                                                    e.currentTarget.style.background = '#F8D53D';
                                                    e.currentTarget.style.color = '#000';
                                                }}
                                                onMouseOut={e => {
                                                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(248, 213, 61, 0.2) 0%, rgba(248, 213, 61, 0.08) 100%)';
                                                    e.currentTarget.style.color = '#F8D53D';
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
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center',
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
                                background: '#0F172A',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '28px',
                                padding: '1.5rem 1.8rem 2rem 1.8rem',
                                maxWidth: '620px',
                                width: '100%',
                                maxHeight: '92vh',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.2rem',
                                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9)',
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
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    color: '#FFF',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justify: 'center',
                                    cursor: 'pointer',
                                    transition: '0.2s',
                                    zIndex: 10
                                }}
                                onMouseOver={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'}
                                onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                            >
                                <FaTimes size={18} />
                            </button>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '6px', 
                                    color: '#F8D53D', 
                                    fontSize: '0.8rem', 
                                    fontWeight: '800', 
                                    marginBottom: '0.3rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    <FaShieldAlt /> EASA ALUMNI ASSOCIATION
                                </div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFF', margin: 0 }}>Official Alumni Digital ID</h2>
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
                                    justify: 'space-between', 
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
                                            justify: 'center',
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
                                    background: 'linear-gradient(135deg, #F8D53D 0%, #D4A017 100%)',
                                    color: '#000',
                                    padding: '0.9rem 3rem',
                                    borderRadius: '50px',
                                    fontWeight: '900',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    border: 'none',
                                    boxShadow: '0 12px 30px rgba(248, 213, 61, 0.4)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginTop: '0.5rem',
                                    flexShrink: 0
                                }}
                            >
                                <FaDownload /> DOWNLOAD DIGITAL CARD
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
