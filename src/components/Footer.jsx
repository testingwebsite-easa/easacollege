import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
    FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronRight,
    FaPaperPlane
} from 'react-icons/fa';

const Footer = ({ onOpenAdmission }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your API
        console.log("Enquiry Submitted:", formData);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setFormData({ name: '', phone: '', message: '' });
            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1000);
    };

    const inputStyle = {
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        border: '1px solid var(--glass-border)',
        background: 'var(--bg-section)',
        color: 'var(--text-main)',
        marginBottom: '0.8rem',
        outline: 'none',
        fontSize: '0.9rem',
        transition: '0.3s'
    };

    const buttonStyle = {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '12px',
        border: 'none',
        background: 'var(--secondary)',
        color: 'var(--bg-dark)',
        fontWeight: '800',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    };

    return (
        <footer style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--glass-border)',
            paddingTop: '6rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '4rem',
                    paddingBottom: '5rem'
                }} className="footer-grid">
                    {/* COLUMN 1: LOGO & IDENTITY */}
                    <div style={{ maxWidth: '350px' }}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            color: 'var(--text-main)',
                            fontFamily: 'Outfit, sans-serif'
                        }}>
                            EASA <span style={{ color: 'var(--secondary)' }}>College</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1rem' }}>
                            Empowering future leaders through excellence in technical education, innovation, and holistic development. NH-47, Palakkad Main Road, Navakkarai, Coimbatore.
                        </p>

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            <FaMapMarkerAlt style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                            <span>NH-47, Palakkad Main Road, Navakkarai, Coimbatore - 641105</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <FaPhoneAlt style={{ color: 'var(--secondary)' }} /> +91 93426 28013
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <FaEnvelope style={{ color: 'var(--secondary)' }} /> info@easacollege.com
                        </div>
                    </div>

                    {/* COLUMN 2: QUICK LINKS */}
                    <div>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                            Quick Links
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { name: 'Admission', action: true },
                                { name: 'Academics', path: '/academics' },
                                { name: 'Research', path: '/research' },
                                { name: 'Placements', path: '/page/placement' },
                                { name: 'Gallery', path: '/gallery' },
                                { name: 'Virtual Tour', path: '/virtual-tour' }
                            ].map((link) => (
                                <li key={link.name}>
                                    {link.action ? (
                                        <button
                                            onClick={() => {
                                                if (onOpenAdmission) {
                                                    onOpenAdmission();
                                                } else {
                                                    navigate('/', { state: { openAdmission: true } });
                                                }
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--text-muted)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.8rem',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                padding: 0,
                                                fontFamily: 'inherit',
                                                transition: '0.3s'
                                            }}
                                            className="footer-link"
                                        >
                                            <FaChevronRight size={10} style={{ color: 'var(--secondary)' }} /> {link.name}
                                        </button>
                                    ) : (
                                        <Link to={link.path} style={{
                                            color: 'var(--text-muted)',
                                            transition: '0.3s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            fontWeight: '600'
                                        }}
                                            className="footer-link"
                                        >
                                            <FaChevronRight size={10} style={{ color: 'var(--secondary)' }} /> {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: RESOURCES */}
                    <div>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                            Support
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { name: 'Library', path: '/page/library' },
                                { name: 'MOU', path: 'https://docs.google.com/document/d/1APC44Ed6-unX82A5RonU4qU54ykSuiF_exREfvrzJMg/edit?usp=sharing' },
                                { name: 'Faculty Portal', path: 'https://portal.easacollege.com/Login', external: true },
                                { name: 'Student Portal', path: 'https://portal.easacollege.com/Login', external: true },
                                { name: 'Center of Excellence', path: '/page/center-of-excellence' },
                                { name: 'Mandatory Disclosure', path: '/page/mandatory-disclosure' },
                                { name: 'Grievance', path: '/grievance/general' }
                            ].map((link) => (
                                <li key={link.name}>
                                    {link.external ? (
                                        <a href={link.path} target="_blank" rel="noopener noreferrer" style={{
                                            color: 'var(--text-muted)',
                                            transition: '0.3s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            fontWeight: '600'
                                        }}
                                            className="footer-link"
                                        >
                                            <FaChevronRight size={10} style={{ color: 'var(--secondary)' }} /> {link.name}
                                        </a>
                                    ) : (
                                        <Link to={link.path} style={{
                                            color: 'var(--text-muted)',
                                            transition: '0.3s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            fontWeight: '600'
                                        }}
                                            className="footer-link"
                                        >
                                            <FaChevronRight size={10} style={{ color: 'var(--secondary)' }} /> {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: SOCIAL & NEWSLETTER */}
                    <div style={{ paddingRight: '1rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                            Stay Connected
                        </h3>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
                            {[
                                { icon: <FaFacebookF />, href: 'https://www.facebook.com/easacollegecbe/' },
                                { icon: <FaTwitter />, href: 'https://x.com/EasacollegeC' },
                                { icon: <FaInstagram />, href: 'https://www.instagram.com/easacollege/' },
                                { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/easa-cet/' },
                                { icon: <FaYoutube />, href: 'https://www.youtube.com/@EASACollegeOfficial' }
                            ].map((social, index) => (
                                <a key={index} href={social.href} style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-section)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--glass-border)',
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem'
                                }}
                                    className="social-icon"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem' }}>Newsletter Signup</h4>
                        {isSubmitted ? (
                            <div style={{ background: 'rgba(46, 204, 113, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid #2ecc71', color: '#2ecc71', marginBottom: '1.5rem' }}>
                                <p style={{ fontWeight: 'bold' }}>Subscribed!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    style={{ ...inputStyle, marginBottom: 0, padding: '0.7rem', width: 'auto', flex: 1 }}
                                />
                                <button type="submit" style={{ ...buttonStyle, width: 'auto', padding: '0 1rem' }}>
                                    <FaPaperPlane />
                                </button>
                            </form>
                        )}

                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Emergency Contacts</h4>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
                                <FaPhoneAlt size={12} /> Ambulance: 108
                            </div>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
                                <FaPhoneAlt size={12} /> Police: 100
                            </div>

                            <Link to="/feedback" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                                <FaPaperPlane size={12} /> Send Feedback
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div style={{
                borderTop: '1px solid var(--glass-border)',
                padding: '2.5rem 0',
                background: 'rgba(0,0,0,0.2)'
            }}>
                <div className="container bottom-bar" style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} EASA College of Engineering and Technology. All rights reserved.</p>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(item => (
                            <a key={item} href="#" style={{ color: 'inherit', textDecoration: 'none', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--secondary)'} onMouseOut={e => e.currentTarget.style.color = 'inherit'}>
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .social-icon:hover { background: var(--secondary) !important; color: var(--bg-dark) !important; transform: translateY(-5px) rotate(8deg); }
                .footer-link:hover { color: var(--secondary) !important; padding-left: 5px; }
                @media (max-width: 768px) {
                    .footer-grid { gap: 3rem !important; }
                    .bottom-bar { flex-direction: column !important; text-align: center !important; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
