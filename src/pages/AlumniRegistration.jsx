import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaIdCard, FaDownload, FaCamera, FaSpinner, FaCheckCircle, FaShieldAlt, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import collegeLogo from '../assets/College Logo with White Letter.webp';
import GlobalHero from '../components/GlobalHero';
import { useTheme } from '../context/ThemeContext';

const AlumniRegistration = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';

    const [formData, setFormData] = useState({
        name: '',
        batch: '',
        department: '',
        currentJob: '',
        email: '',
        phone: ''
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alumniData, setAlumniData] = useState(null);

    const idCardRef = useRef(null);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/departments`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    const sortedData = [...data].sort((a, b) => {
                        const nameA = (a.name || a.departmentName || a || '').toString().trim();
                        const nameB = (b.name || b.departmentName || b || '').toString().trim();
                        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
                    });
                    setDepartments(sortedData);
                } else {
                    setDepartments([]);
                }
            } catch (err) {
                console.error("Error fetching departments:", err);
            }
        };
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('data', JSON.stringify(formData));
        if (photo) {
            data.append('photo', photo);
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/alumni`, {
                method: 'POST',
                body: data
            });

            const result = await res.json();
            if (result.success) {
                setSubmitted(true);
                setAlumniData(result.alumni);
            } else {
                alert(result.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const downloadIDCard = async () => {
        if (!idCardRef.current) return;

        try {
            const canvas = await html2canvas(idCardRef.current, {
                backgroundColor: null,
                scale: 3, // Crisp ultra-high resolution export
                useCORS: true,
                allowTaint: true
            });

            const link = document.createElement('a');
            link.download = `EASA_Alumni_ID_${(formData.name || 'Card').replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("ID Card Generation Failed", err);
            alert("Could not generate ID card. Please try again.");
        }
    };

    const getAlumniPhoto = (url, name = 'Alumni') => {
        if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('profile-placeholder')) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Alumni')}&background=0F172A&color=F8D53D&bold=true&size=200`;
        }
        return url;
    };

    const displayPhone = formData.phone || alumniData?.phone || alumniData?.mobile || alumniData?.phoneNumber || '';
    const cardUniqueNumber = alumniData?.alumniId || 
        (alumniData?._id ? `ECET-${alumniData._id.slice(-8).toUpperCase()}` : 
        `ECET-${(formData.batch ? formData.batch.slice(-4) : new Date().getFullYear())}-${Math.floor(100000 + Math.random() * 900000)}`);

    const qrPayload = `EASA COLLEGE ALUMNI DIGITAL ID
Name: ${formData.name || alumniData?.name || 'Alumni Member'}
Card No: ${cardUniqueNumber}
Department: ${formData.department || alumniData?.department || 'N/A'}
Batch: ${formData.batch || alumniData?.batch || 'N/A'}
Job Title: ${formData.currentJob || alumniData?.currentJob || 'N/A'}
Mobile: ${displayPhone || 'N/A'}
Email: ${formData.email || alumniData?.email || 'N/A'}
Status: Verified Lifetime Alumni`;

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 25px 60px rgba(0,0,0,0.45)' : '0 15px 40px rgba(0,0,0,0.06)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#cbd5e1' : '#475569';
    const goldAccent = isDark ? '#F8D53D' : '#D97706';

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', transition: 'background-color 0.3s ease' }}>
            <SEO title="Alumni Registration | EASA College" description="Register as an EASA College Alumni and get your digital ID card." />
            <Navbar />

            <GlobalHero
                pageKey="alumni"
                defaultTitle="Alumni Registration"
                defaultSubtitle="Join our global community. Reconnect with peers, mentor students, and get your exclusive digital ID card."
                defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="container" style={{ paddingBottom: '5rem', marginTop: '2.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>

                    {/* Registration Form */}
                    {!submitted ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            style={{
                                maxWidth: '960px',
                                width: '100%',
                                padding: '3.5rem 3rem',
                                background: cardBg,
                                border: cardBorder,
                                boxShadow: cardShadow,
                                borderRadius: '32px'
                            }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                                {/* Academic Details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '44px', height: '44px', background: isDark ? 'rgba(248, 213, 61, 0.15)' : 'rgba(217, 119, 6, 0.12)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: goldAccent, fontSize: '1.2rem' }}>
                                            <FaUser />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>Academic Details</h3>
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Full Name *</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="custom-input-themed" placeholder="Enter your full name" />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Batch Year *</label>
                                        <input type="text" name="batch" required value={formData.batch} onChange={handleChange} className="custom-input-themed" placeholder="e.g. 2018-2022" />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Department *</label>
                                        <select name="department" required value={formData.department} onChange={handleChange} className="custom-input-themed">
                                            <option value="">Select your department</option>
                                            {departments.map((dept) => (
                                                <option key={dept._id || dept.id || dept.name} value={dept.name}>{dept.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Current Designation / Company</label>
                                        <input type="text" name="currentJob" value={formData.currentJob} onChange={handleChange} className="custom-input-themed" placeholder="e.g. Software Engineer, Infosys" />
                                    </div>
                                </div>

                                {/* Identity & Contact */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '44px', height: '44px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.12)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#38BDF8' : '#2563EB', fontSize: '1.2rem' }}>
                                            <FaIdCard />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>Identity & Contact</h3>
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Email Address *</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="custom-input-themed" placeholder="official@alumni.com" />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Phone Number *</label>
                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="custom-input-themed" placeholder="+91 XXXX XXX XXX" />
                                    </div>

                                    <div className="input-group">
                                        <label style={{ color: primaryTextColor, fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Profile Picture (For Digital ID)</label>
                                        <div style={{
                                            border: isDark ? '2px dashed rgba(255,255,255,0.2)' : '2px dashed #CBD5E1',
                                            borderRadius: '16px',
                                            padding: '2rem',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            background: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC',
                                            transition: '0.3s'
                                        }} className="photo-upload-zone">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
                                            />
                                            {photoPreview ? (
                                                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
                                                    <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: `3px solid ${goldAccent}` }} />
                                                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: goldAccent, color: '#ffffff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}><FaCamera /></div>
                                                </div>
                                            ) : (
                                                <div style={{ color: secondaryTextColor }}>
                                                    <FaCamera size={32} style={{ marginBottom: '0.8rem', color: goldAccent }} />
                                                    <p style={{ fontWeight: '700', marginBottom: '0.2rem', color: primaryTextColor }}>Click to upload profile photo</p>
                                                    <p style={{ fontSize: '0.8rem', margin: 0 }}>JPG, PNG or WEBP (Max 2MB)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
                                <button type="submit" disabled={loading} style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    borderRadius: '50px',
                                    fontSize: '1.05rem',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#ffffff',
                                    boxShadow: '0 12px 30px rgba(217, 119, 6, 0.35)'
                                }}>
                                    {loading ? <><FaSpinner className="spin" /> VERIFYING & GENERATING CARD...</> : 'GENERATE ALUMNI ID CARD'}
                                </button>
                                <p style={{ marginTop: '1.2rem', color: secondaryTextColor, fontSize: '0.85rem' }}>By clicking generate, you agree to our alumni association terms and code of conduct.</p>
                            </div>
                        </motion.form>

                    ) : (
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', width: '100%', maxWidth: '960px' }}
                        >
                            {/* Success Header */}
                            <div style={{ textAlign: 'center' }}>
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    style={{
                                        display: 'inline-flex',
                                        padding: '0.5rem 1.5rem',
                                        background: 'rgba(16, 185, 129, 0.12)',
                                        borderRadius: '50px',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        color: '#10B981',
                                        fontSize: '0.88rem',
                                        fontWeight: '800',
                                        marginBottom: '1rem',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <FaCheckCircle /> REGISTRATION COMPLETE
                                </motion.div>
                                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: '900', color: primaryTextColor, marginBottom: '0.6rem', letterSpacing: '-0.5px' }}>Welcome to the Alumni Network!</h2>
                                <p style={{ color: secondaryTextColor, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Your official digital identification has been generated based on your credentials.</p>
                            </div>

                            {/* ID CARD VISUAL */}
                            <div 
                                ref={idCardRef} 
                                style={{
                                    width: '560px',
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
                                    userSelect: 'none'
                                }}
                            >
                                {/* Decorative Shimmer & Glow Accents */}
                                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}>
                                    <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248, 213, 61, 0.15) 0%, rgba(0,0,0,0) 70%)' }} />
                                    <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(0,0,0,0) 70%)' }} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #F8D53D 0%, #EAB308 50%, #3B82F6 100%)' }} />
                                </div>

                                {/* Top Header: Official College Logo + Digital Badge */}
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
                                                src={photoPreview || getAlumniPhoto(alumniData?.photoUrl, formData.name)}
                                                alt={formData.name || "Alumni Profile"}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'Alumni')}&background=0F172A&color=F8D53D&bold=true&size=200`;
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
                                            {formData.name || 'ALUMNI NAME'}
                                        </h3>

                                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#F8D53D', lineHeight: '1.2' }}>
                                            {formData.department || 'Department of Engineering'}
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
                                                Batch {formData.batch || 'N/A'}
                                            </span>
                                            
                                            {formData.currentJob && (
                                                <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <FaBriefcase style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }} /> {formData.currentJob}
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
                                                    {displayPhone || 'Not Provided'}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)' }}>
                                                <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(248, 213, 61, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8D53D', fontSize: '0.7rem', flexShrink: 0 }}>
                                                    <FaEnvelope />
                                                </div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
                                                    {formData.email || 'alumni@easa.ac.in'}
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
                                            {cardUniqueNumber}
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
                                                value={qrPayload} 
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

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', width: '100%' }}>
                                <button onClick={downloadIDCard} style={{
                                    padding: '1.2rem 3.5rem',
                                    borderRadius: '50px',
                                    fontWeight: '900',
                                    fontSize: '1.05rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    color: '#ffffff',
                                    boxShadow: '0 12px 30px rgba(217, 119, 6, 0.35)'
                                }}>
                                    <FaDownload size={18} /> DOWNLOAD DIGITAL CARD
                                </button>

                                <button
                                    onClick={() => { setSubmitted(false); setFormData({ name: '', batch: '', department: '', currentJob: '', email: '', phone: '' }); setPhoto(null); setPhotoPreview(null); }}
                                    style={{ background: 'transparent', border: 'none', color: secondaryTextColor, textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
                                >
                                    Register Another Alumni
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />

            <style>{`
                .custom-input-themed {
                    width: 100%;
                    padding: 0.95rem 1.2rem;
                    border: ${isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #CBD5E1'};
                    background: ${isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC'};
                    border-radius: 14px;
                    color: ${primaryTextColor};
                    outline: none;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }
                .custom-input-themed:focus {
                    border-color: ${goldAccent};
                    background: ${isDark ? 'rgba(255,255,255,0.06)' : '#FFFFFF'};
                    box-shadow: 0 0 0 4px ${isDark ? 'rgba(248, 213, 61, 0.15)' : 'rgba(217, 119, 6, 0.15)'};
                }
                .photo-upload-zone:hover {
                    border-color: ${goldAccent} !important;
                    background: ${isDark ? 'rgba(248, 213, 61, 0.05)' : 'rgba(217, 119, 6, 0.04)'} !important;
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                @media (max-width: 768px) {
                    div[ref*="idCardRef"] {
                        width: 100% !important;
                        height: auto !important;
                        min-height: 250px !important;
                        flex-direction: column !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default AlumniRegistration;
