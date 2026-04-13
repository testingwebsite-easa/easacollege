import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaIdCard, FaDownload, FaCamera, FaSpinner } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';

import GlobalHero from '../components/GlobalHero';

const AlumniRegistration = () => {
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
    const [alumniData, setAlumniData] = useState(null); // Return from API

    const idCardRef = useRef(null);

    const [departments, setDepartments] = useState([]);

    React.useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/departments`);
                const data = await res.json();
                setDepartments(data);
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
                scale: 2 // Higher resolution
            });

            const link = document.createElement('a');
            link.download = `EASA_Alumni_ID_${formData.name.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("ID Card Generation Failed", err);
            alert("Could not generate ID card. Please try again.");
        }
    };

    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO title="Alumni Registration" description="Register as an EASA College Alumni and get your digital ID card." />
            <Navbar />

            <GlobalHero
                pageKey="alumni"
                defaultTitle="Alumni Registration"
                defaultSubtitle="Join our global community. Reconnect with peers, mentor students, and get your exclusive digital ID card."
                defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            />


            <div className="container" style={{ paddingBottom: '4rem', marginTop: '2rem', position: 'relative', zIndex: 2 }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>

                    {/* Registration Form */}
                    {!submitted ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            className="glass-card"
                            style={{
                                maxWidth: '1000px',
                                width: '100%',
                                padding: '4rem',
                                background: 'rgba(15, 23, 42, 0.6)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                                borderRadius: '32px'
                            }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3.5rem' }}>
                                {/* Personal Details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'rgba(248, 213, 61, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8D53D' }}>
                                            <FaUser />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: 0 }}>Academic Details</h3>
                                    </div>

                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="custom-input" placeholder="Enter your full name" />
                                    </div>

                                    <div className="input-group">
                                        <label>Batch Year</label>
                                        <input type="text" name="batch" required value={formData.batch} onChange={handleChange} className="custom-input" placeholder="e.g. 2018-2022" />
                                    </div>

                                    <div className="input-group">
                                        <label>Department</label>
                                        <select name="department" required value={formData.department} onChange={handleChange} className="custom-input" style={{ background: '#0F172A' }}>
                                            <option value="">Select your department</option>
                                            {departments.map((dept) => (
                                                <option key={dept._id} value={dept.name}>{dept.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input-group">
                                        <label>Current Designation</label>
                                        <input type="text" name="currentJob" value={formData.currentJob} onChange={handleChange} className="custom-input" placeholder="Current Role & Company" />
                                    </div>
                                </div>

                                {/* Contact & Photo */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '40px', height: '40px', background: 'rgba(248, 213, 61, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8D53D' }}>
                                            <FaIdCard />
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: 0 }}>Identity & Contact</h3>
                                    </div>

                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="custom-input" placeholder="official@alumni.com" />
                                    </div>

                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="custom-input" placeholder="+91 XXXX XXX XXX" />
                                    </div>

                                    <div className="input-group">
                                        <label>Profile Picture</label>
                                        <div style={{
                                            border: '2px dashed rgba(255,255,255,0.1)',
                                            borderRadius: '16px',
                                            padding: '2.5rem',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            background: 'rgba(255,255,255,0.02)',
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
                                                    <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '3px solid #F8D53D' }} />
                                                    <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#F8D53D', color: '#000', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}><FaCamera /></div>
                                                </div>
                                            ) : (
                                                <div style={{ color: 'var(--text-muted)' }}>
                                                    <FaCamera size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                                    <p style={{ fontWeight: '600', marginBottom: '0.3rem' }}>Click to upload profile photo</p>
                                                    <p style={{ fontSize: '0.8rem' }}>JPG, PNG or WEBP (Max 2MB)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                                <button type="submit" disabled={loading} className="btn" style={{
                                    padding: '1.2rem 4rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '50px',
                                    background: 'linear-gradient(135deg, #F8D53D 0%, #D4A017 100%)',
                                    color: '#000',
                                    fontWeight: '900',
                                    boxShadow: '0 15px 30px rgba(248, 213, 61, 0.2)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: '0.3s'
                                }}>
                                    {loading ? <><FaSpinner className="spin" /> VERIFYING...</> : 'GENERATE ALUMNI ID CARD'}
                                </button>
                                <p style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>By clicking generate, you agree to our alumni association terms.</p>
                            </div>
                        </motion.form>

                    ) : (
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', width: '100%', maxWidth: '1000px' }}
                        >
                            {/* Success Header */}
                            <div style={{ textAlign: 'center' }}>
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    style={{
                                        display: 'inline-flex',
                                        padding: '0.5rem 1.5rem',
                                        background: 'rgba(74, 222, 128, 0.1)',
                                        borderRadius: '50px',
                                        border: '1px solid rgba(74, 222, 128, 0.2)',
                                        color: '#4ade80',
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        marginBottom: '1.2rem',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <FaIdCard /> REGISTRATION COMPLETE
                                </motion.div>
                                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: '#fff', marginBottom: '0.8rem', letterSpacing: '-1px' }}>Welcome to the Alumni Network!</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Your official digital identification has been generated based on your credentials.</p>
                            </div>

                            {/* ID CARD VISUAL */}
                            <div ref={idCardRef} style={{
                                width: '512px',
                                height: '325px',
                                background: '#0F172A',
                                borderRadius: '24px',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                                position: 'relative',
                                overflow: 'hidden',
                                color: 'white',
                                display: 'flex',
                                border: '1px solid rgba(255,255,255,0.08)',
                                userSelect: 'none'
                            }}>
                                {/* Yellow Accent Strip */}
                                <div style={{ width: '18px', height: '100%', background: '#F8D53D', flexShrink: 0 }}></div>

                                {/* Decorative Circles Section */}
                                <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-40px',
                                        right: '-40px',
                                        width: '200px',
                                        height: '200px',
                                        background: 'rgba(255, 255, 255, 0.02)',
                                        borderRadius: '50%'
                                    }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-30px',
                                        right: '10%',
                                        width: '120px',
                                        height: '120px',
                                        background: 'rgba(248, 213, 61, 0.03)',
                                        borderRadius: '50%'
                                    }}></div>
                                </div>

                                <div style={{ flex: 1, padding: '2rem 2.2rem', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                                    {/* Header Section */}
                                    <div style={{ marginBottom: '1.2rem' }}>
                                        <h2 style={{
                                            fontSize: '1.4rem',
                                            fontWeight: '800',
                                            margin: 0,
                                            letterSpacing: '0.4px',
                                            lineHeight: '1.2',
                                            color: '#FFFFFF',
                                            fontFamily: "'Outfit', sans-serif"
                                        }}>
                                            EASA COLLEGE OF ENGINEERING AND TECHNOLOGY
                                        </h2>
                                        <div style={{
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            color: '#F8D53D',
                                            marginTop: '0.3rem',
                                            letterSpacing: '1.2px',
                                            textTransform: 'uppercase'
                                        }}>
                                            ALUMNI ASSOCIATION
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '1.8rem' }}></div>

                                    {/* Profile & Info Section */}
                                    <div style={{ display: 'flex', gap: '2.2rem', alignItems: 'center', flex: 1 }}>
                                        {/* Profile Photo Wrapper */}
                                        <div style={{
                                            width: '115px',
                                            height: '115px',
                                            borderRadius: '50%',
                                            border: '5px solid #F8D53D',
                                            background: '#FFFFFF',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            boxShadow: '0 12px 25px rgba(0,0,0,0.4)',
                                            position: 'relative'
                                        }}>
                                            <img
                                                src={photoPreview || alumniData?.photoUrl || "https://res.cloudinary.com/dzt6vksue/image/upload/v1/assets/profile-placeholder"}
                                                alt="Profile"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                crossOrigin="anonymous"
                                            />
                                        </div>

                                        {/* Details Column */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center' }}>
                                            <h3 style={{
                                                fontSize: '1.75rem',
                                                fontWeight: '900',
                                                color: '#F8D53D',
                                                margin: '0 0 0.1rem 0',
                                                lineHeight: '1.1',
                                                textTransform: 'uppercase',
                                                fontFamily: "'Outfit', sans-serif"
                                            }}>
                                                {formData.name}
                                            </h3>

                                            <div style={{ fontSize: '1rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.95)', maxWidth: '300px' }}>
                                                {formData.department}
                                            </div>
                                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#F8D53D' }}>
                                                Batch {formData.batch}
                                            </div>

                                            <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <FaEnvelope size={11} style={{ opacity: 0.6 }} /> {formData.email}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <FaPhone size={11} style={{ opacity: 0.6 }} /> {formData.phone}
                                                </div>
                                                <div style={{ fontSize: '1.05rem', color: '#F8D53D', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '6px' }}>
                                                    ID: {alumniData?.alumniId || (alumniData?._id ? `EASA-AL-${alumniData._id.slice(-6).toUpperCase()}` : 'PENDING')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Right Subtle Label */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '2.5rem',
                                        right: '2.2rem',
                                        fontSize: '0.6rem',
                                        color: 'rgba(255,255,255,0.2)',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        fontWeight: '700'
                                    }}>
                                        Electronic Issued Card
                                    </div>
                                </div>
                            </div>


                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
                                <button onClick={downloadIDCard} className="btn" style={{
                                    background: 'linear-gradient(135deg, #F8D53D 0%, #D4A017 100%)',
                                    color: '#000',
                                    padding: '1.2rem 3.5rem',
                                    borderRadius: '50px',
                                    fontWeight: '900',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    border: 'none',
                                    boxShadow: '0 15px 35px rgba(248, 213, 61, 0.3)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}>
                                    <FaDownload /> DOWNLOAD DIGITAL CARD
                                </button>

                                <button
                                    onClick={() => { setSubmitted(false); setFormData({ name: '', batch: '', department: '', currentJob: '', email: '', phone: '' }); setPhoto(null); setPhotoPreview(null); }}
                                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
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
                .custom-input {
                    width: 100%;
                    padding: 1rem 1.2rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.03);
                    border-radius: 12px;
                    color: #fff;
                    outline: none;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }
                .custom-input:focus {
                    border-color: #F8D53D;
                    background: rgba(255,255,255,0.06);
                    box-shadow: 0 0 0 4px rgba(248, 213, 61, 0.1);
                }
                .input-group label {
                    display: block;
                    margin-bottom: 0.8rem;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.7);
                    letter-spacing: 0.5px;
                }
                .photo-upload-zone:hover {
                    border-color: #F8D53D !important;
                    background: rgba(248, 213, 61, 0.05) !important;
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
