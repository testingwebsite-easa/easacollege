import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API_BASE_URL from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaQuoteLeft } from 'react-icons/fa';

const ManagementPage = () => {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/management-team`);
                if (response.ok) {
                    const data = await response.json();
                    setMembers(data);
                }
            } catch (error) {
                console.error("Failed to fetch management team:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="management-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <PageHero
                title="Management Team"
                subtitle="The visionaries and leaders steering EASA College towards global excellence."
            />

            <div style={{ background: 'var(--bg-main)', minHeight: '60vh', padding: '3rem 0 5rem' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            Loading management team...
                        </div>
                    ) : (
                        <div className="management-grid">
                            {members
                                .filter(m => m.category !== 'principal' && !m.designation?.toLowerCase().includes('principal'))
                                .map((member, index) => (
                                    <motion.div
                                        key={member._id || index}
                                        id={member.category}
                                        className="management-card-item"
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -8 }}
                                        style={{
                                            background: 'var(--bg-card)',
                                            borderRadius: '20px',
                                            padding: '2rem 1.5rem',
                                            border: '1px solid var(--glass-border)',
                                            boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <div style={{
                                            width: '120px',
                                            height: '120px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            marginBottom: '1.2rem',
                                            border: '4px solid #FFD700',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                            flexShrink: 0
                                        }}>
                                            <img
                                                src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=200`}
                                                alt={member.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=200`;
                                                }}
                                            />
                                        </div>

                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                                            {member.name}
                                        </h3>

                                        <p style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                                            {member.designation}
                                        </p>

                                        {member.message && (
                                            <>
                                                <p style={{
                                                    fontSize: '0.92rem',
                                                    color: 'var(--text-muted)',
                                                    lineHeight: '1.5',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    marginBottom: '1.2rem',
                                                    fontStyle: 'italic'
                                                }}>
                                                    "{member.message}"
                                                </p>

                                                <button
                                                    onClick={() => setSelectedMember(member)}
                                                    style={{
                                                        marginTop: 'auto',
                                                        padding: '0.6rem 1.4rem',
                                                        fontSize: '0.82rem',
                                                        fontWeight: '700',
                                                        borderRadius: '30px',
                                                        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                                                        border: 'none',
                                                        color: '#ffffff',
                                                        boxShadow: '0 4px 12px rgba(30, 27, 75, 0.3)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.25s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(30, 27, 75, 0.45)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 27, 75, 0.3)';
                                                    }}
                                                >
                                                    Read Full Message
                                                </button>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Overlay for Full Message */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 999999,
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
                                background: 'var(--bg-card)',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                maxWidth: '700px',
                                width: '100%',
                                maxHeight: '85vh',
                                overflowY: 'auto',
                                border: '1px solid var(--glass-border)',
                                position: 'relative',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.2rem',
                                    right: '1.2rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-main)',
                                    cursor: 'pointer',
                                    fontSize: '1.1rem'
                                }}
                            >
                                <FaTimes />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <img
                                    src={selectedMember.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=0D8ABC&color=fff&size=200`}
                                    alt={selectedMember.name}
                                    style={{
                                        width: '90px',
                                        height: '90px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '3px solid #FFD700',
                                        flexShrink: 0
                                    }}
                                />
                                <div>
                                    <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                                        {selectedMember.name}
                                    </h2>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {selectedMember.designation}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                fontSize: '1.05rem',
                                lineHeight: '1.8',
                                color: 'var(--text-muted)',
                                whiteSpace: 'pre-wrap',
                                borderTop: '1px solid var(--glass-border)',
                                paddingTop: '1.5rem'
                            }}>
                                <FaQuoteLeft style={{ color: 'var(--primary)', opacity: 0.3, fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }} />
                                {selectedMember.message}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer />

            <style>{`
                .management-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    width: 100%;
                }
                .management-card-item {
                    width: 100%;
                }
                @media (max-width: 992px) {
                    .management-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.2rem;
                    }
                }
                @media (max-width: 480px) {
                    .management-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ManagementPage;
