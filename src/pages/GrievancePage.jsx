import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';
import { FaCheckCircle, FaExclamationCircle, FaUser, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaHeading, FaCommentAlt } from 'react-icons/fa';

const GrievancePage = () => {
    const { type } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        rollNo: '',
        department: '',
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formattedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'General';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`${API_BASE_URL}/api/grievances`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, type: formattedType })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '', rollNo: '', department: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title={`${formattedType} Grievance | EASA College`} description={`Secure and confidential grievance redressal form for ${formattedType} at EASA College.`} />
            <Navbar />

            <GlobalHero
                pageKey="grievance"
                defaultTitle={`${formattedType} Grievance`}
                defaultSubtitle="We value your feedback. Please fill out the form below to register your grievance and help us improve."
            />

            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.05)' }}
                >
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                style={{ textAlign: 'center', padding: '3rem 0' }}
                            >
                                <div style={{ width: '100px', height: '100px', background: 'var(--glass-highlight)', color: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', margin: '0 auto 2.5rem', border: '2px solid var(--secondary)' }}>
                                    <FaCheckCircle size={50} />
                                </div>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>Submitted Successfully</h3>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>Your grievance has been recorded and assigned to the relevant department. We will get back to you shortly.</p>
                                <button onClick={() => setStatus('')} className="btn btn-primary" style={{ padding: '1rem 3rem', borderRadius: '50px' }}>Register Another</button>
                            </motion.div>
                        ) : (
                            <form key="form" onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-grid">
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaUser /> Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s' }}
                                            placeholder="Enter your name"
                                            onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaEnvelope /> Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s' }}
                                            placeholder="your@email.com"
                                            onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaPhone /> Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s' }}
                                            placeholder="Mobile number"
                                            onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                        />
                                    </div>

                                    {(type === 'students' || type === 'faculty') && (
                                        <div className="input-group">
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaBuilding /> Department</label>
                                            <input
                                                type="text"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s' }}
                                                placeholder="Faculty/Student department"
                                                onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                            />
                                        </div>
                                    )}

                                    {type === 'students' && (
                                        <div className="input-group">
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaIdCard /> Roll Number</label>
                                            <input
                                                type="text"
                                                name="rollNo"
                                                value={formData.rollNo}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s' }}
                                                placeholder="Roll No / Reg No"
                                                onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="input-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaHeading /> Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s' }}
                                        placeholder="Brief subject of grievance"
                                        onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                    />
                                </div>

                                <div className="input-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.8rem' }}><FaCommentAlt /> Detailed Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '14px', color: 'var(--text-main)', outline: 'none', transition: '0.3s', resize: 'none' }}
                                        placeholder="Please describe your grievance in detail..."
                                        onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: 'none', background: 'var(--secondary)', color: 'var(--bg-dark)', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', transition: '0.3s', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                    className="submit-btn"
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Register Grievance'}
                                </button>

                                {status === 'error' && (
                                    <p style={{ color: '#ff4d4d', textAlign: 'center', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><FaExclamationCircle /> An error occurred. Please try again later.</p>
                                )}
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <Footer />
            <style>{`
                @media (max-width: 768px) {
                    .form-grid { grid-template-columns: 1fr !important; }
                    .container { padding: 4rem 1.5rem !important; }
                    div[style*="padding: '4rem'"] { padding: 2.5rem !important; }
                }
                .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important; filter: brightness(1.1); }
                .submit-btn:disabled { opacity: 0.7; transform: none; cursor: not-allowed; }
            `}</style>
        </div>
    );
};

export default GrievancePage;
