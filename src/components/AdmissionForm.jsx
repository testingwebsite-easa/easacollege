import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaUniversity, FaUserGraduate, FaBriefcase, FaGlobe, FaTimes, FaAward, FaMedal, FaIndustry, FaLeaf, FaFutbol, FaBed, FaCertificate, FaHandshake } from 'react-icons/fa';
import API_BASE_URL from '../api';
import { departments as departmentsData } from '../data/departmentsData';
import { useTheme } from '../context/ThemeContext';

const AdmissionForm = ({ isOpen, onClose }) => {
    const { theme } = useTheme();
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        community: '',
        state: '',
        district: ''
    });

    const [statesData, setStatesData] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [departments, setDepartments] = useState(departmentsData);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json');
                const data = await response.json();
                setStatesData(data.states);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        if (isOpen) {
            fetchStates();
        }
    }, [isOpen]);

    useEffect(() => {
        if (formData.state) {
            const selectedState = statesData.find(s => s.state === formData.state);
            setDistricts(selectedState ? selectedState.districts : []);
        } else {
            setDistricts([]);
        }
    }, [formData.state, statesData]);

    const checkScroll = () => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }
    // Lock body scroll when open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const validate = () => {
        const newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Phone validation (10 digits, optionally starting with +91)
        const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Thank you for your application! Our admissions team will contact you shortly.");
                onClose();
                setFormData({ name: '', email: '', phone: '', course: '', community: '', state: '', district: '' });
                setErrors({});
            } else {
                alert("Failed to submit application. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        border: '1px solid var(--glass-border)',
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
        color: 'var(--text-main)',
        outline: 'none',
        fontSize: '0.95rem',
        transition: '0.3s',
        appearance: 'auto'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1
                }}
            />

            {/* Modal Content */}
            <div className="admission-modal-container" style={{
                width: '100%',
                maxWidth: '1000px',
                position: 'relative',
                zIndex: 2,
                maxHeight: 'min(90vh, 800px)',
                display: 'flex',
                overflow: 'hidden',
                borderRadius: '1.5rem',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <button
                    onClick={onClose}
                    className="modal-close-btn"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <FaTimes />
                </button>

                {/* Left Side: Why Choose Us */}
                <div className="admission-modal-info" style={{
                    flex: '0.8',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '2rem',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                            Why Choose EASA College?
                        </h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: '2rem', lineHeight: '1.6' }}>
                            Join a community dedicated to excellence and innovation.
                        </p>

                        <div className="features-list" style={{ display: 'grid', gap: '1rem', overflowY: 'auto', maxHeight: '50vh', paddingRight: '0.5rem' }}>
                            {[
                                { icon: <FaAward />, text: "18+ years of Academic Excellence" },
                                { icon: <FaMedal />, text: "University Rank Holders" },
                                { icon: <FaHandshake />, text: "Reputed Company Recruiters", highlight: true },
                                { icon: <FaIndustry />, text: "Great Industrial Exposure" },
                                { icon: <FaLeaf />, text: "Eco-friendly campus" },
                                { icon: <FaFutbol />, text: "20+ Sports & Activities" }
                            ].map((point, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    background: point.highlight ? '#fbbf24' : 'rgba(255,255,255,0.1)',
                                    color: point.highlight ? '#1e293b' : '#fff',
                                    padding: '0.8rem',
                                    borderRadius: '12px'
                                }}>
                                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.5rem', borderRadius: '8px', minWidth: '35px', display: 'flex', justifyContent: 'center' }}>
                                        {point.icon}
                                    </div>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>{point.text}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="admission-modal-form" style={{
                    flex: '1.2',
                    padding: '2.5rem',
                    overflowY: 'auto',
                    background: 'var(--bg-card)'
                }}>
                    <h2 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                        Apply for Admission
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        Start your journey with EASA College today.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}>Student Name</label>
                            <input type="text" name="name" required style={inputStyle} value={formData.name} onChange={handleChange} placeholder="Full Name" />
                        </div>

                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}>Email</label>
                                <input type="email" name="email" required style={{ ...inputStyle, border: errors.email ? '1px solid #ef4444' : '1px solid var(--glass-border)' }} value={formData.email} onChange={handleChange} placeholder="Email" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}>Phone</label>
                                <input type="tel" name="phone" required style={{ ...inputStyle, border: errors.phone ? '1px solid #ef4444' : '1px solid var(--glass-border)' }} value={formData.phone} onChange={handleChange} placeholder="Phone" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}>Department</label>
                            <select name="course" required style={inputStyle} value={formData.course} onChange={handleChange}>
                                <option value="">Select Course</option>
                                {[...new Set(departments.map(dept => dept.name))].filter(n => n !== "Science and Humanities").map((n, i) => (
                                    <option key={i} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row-multi" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                            <select name="community" required style={inputStyle} value={formData.community} onChange={handleChange}>
                                <option value="">Community</option>
                                {['OC', 'BC', 'BCM', 'MBC/DNC', 'SC', 'SCA', 'ST'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <select name="state" required style={inputStyle} value={formData.state} onChange={(e) => setFormData(p => ({ ...p, state: e.target.value, district: '' }))}>
                                <option value="">State</option>
                                {statesData.map((s, i) => <option key={i} value={s.state}>{s.state}</option>)}
                            </select>
                            <select name="district" required disabled={!formData.state} style={inputStyle} value={formData.district} onChange={handleChange}>
                                <option value="">District</option>
                                {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="submit-btn" style={{
                            width: '100%', marginTop: '1rem', padding: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none', color: 'white', fontWeight: '700', borderRadius: '12px', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
                        }}>{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
                    </form>
                </div>
            </div>

            <style>{`
                .admission-modal-container { transform: scale(1); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                @media (max-width: 900px) {
                    .admission-modal-container { flex-direction: column !important; max-height: 95vh !important; }
                    .admission-modal-info { padding: 1.5rem !important; flex: none !important; }
                    .features-list { display: flex !important; overflow-x: auto !important; overflow-y: hidden !important; gap: 0.8rem !important; max-height: none !important; padding-bottom: 5px; }
                    .features-list > div { flex-shrink: 0; min-width: 180px; }
                    .admission-modal-form { padding: 1.5rem !important; }
                    .form-row, .form-row-multi { grid-template-columns: 1fr !important; gap: 0.8rem !important; }
                }
                .submit-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }
                
                /* Dropdown visibility fix */
                select option {
                    background-color: ${theme === 'dark' ? '#1e293b' : '#ffffff'};
                    color: ${theme === 'dark' ? '#f8fafc' : '#1d1d1f'};
                }
            `}</style>
        </div>
    );
};

export default AdmissionForm;
