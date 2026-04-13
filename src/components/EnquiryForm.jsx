import React, { useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import API_BASE_URL from '../api';

const EnquiryForm = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lock body scroll when open
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Replace with your actual API endpoint for enquiries
            const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Enquiry submitted successfully!');
                onClose();
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Failed to submit enquiry. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
            <div onClick={onClose} style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', zIndex: 1
            }} />

            <div style={{
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                zIndex: 2,
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: '1.5rem',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
                    border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer'
                }}>
                    <FaTimes />
                </button>

                <h2 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>
                    Quick Enquiry
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Have questions? Send us a message and we'll get back to you.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <input
                        type="text" name="name" placeholder="Your Name" required
                        value={formData.name} onChange={handleChange}
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-highlight)', color: 'var(--text-main)', outline: 'none' }}
                    />
                    <input
                        type="email" name="email" placeholder="Your Email" required
                        value={formData.email} onChange={handleChange}
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-highlight)', color: 'var(--text-main)', outline: 'none' }}
                    />
                    <input
                        type="tel" name="phone" placeholder="Phone Number" required
                        value={formData.phone} onChange={handleChange}
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-highlight)', color: 'var(--text-main)', outline: 'none' }}
                    />
                    <textarea
                        name="message" placeholder="Your Message" rows="4" required
                        value={formData.message} onChange={handleChange}
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-highlight)', color: 'var(--text-main)', outline: 'none', resize: 'none' }}
                    />

                    <button type="submit" disabled={isSubmitting} style={{
                        padding: '1rem', borderRadius: '8px', border: 'none',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s',
                        opacity: isSubmitting ? 0.7 : 1
                    }}>
                        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EnquiryForm;
