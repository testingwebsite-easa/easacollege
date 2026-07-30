import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api';

const ManagementSection = ({ category, title = "Visionary Leadership", subtitle = "Guiding EASA College towards excellence", isStatic = false }) => {
    const [managementTeam, setManagementTeam] = React.useState([]);

    useEffect(() => {
        const url = category
            ? `${API_BASE_URL}/api/management-team?category=${category}`
            : `${API_BASE_URL}/api/management-team`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const limitedData = (!category || isStatic) ? data.slice(0, 5) : data;
                setManagementTeam(limitedData);
            })
            .catch(err => console.error("Error fetching management team:", err));
    }, [category, isStatic]);

    const isScrolling = !isStatic && !!category;

    return (
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 0', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)', padding: '0 2rem' }}>
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: '900',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', marginBottom: '2rem' }}
                >
                    {subtitle}
                </motion.p>
                {!isStatic && (
                    <a href="/management" style={{
                        display: 'inline-block',
                        padding: '0.8rem 2rem',
                        background: 'transparent',
                        border: '2px solid var(--secondary)',
                        color: 'var(--secondary)',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => { e.target.style.background = 'var(--secondary)'; e.target.style.color = 'white'; }}
                        onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--secondary)'; }}
                    >
                        Meet Our Full Team
                    </a>
                )}
            </div>

            <div style={{ width: '100%', padding: '0 2rem' }}>
                {isScrolling ? (
                    <div className="infinite-scroll-track" style={{ display: 'flex', gap: '2.5rem', animation: 'management-scroll 40s linear infinite' }}>
                        {[...managementTeam, ...managementTeam].map((member, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -12 }}
                                style={{
                                    width: '320px',
                                    flexShrink: 0,
                                    borderRadius: '24px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ width: '100%', height: 'clamp(280px, 40vw, 380px)', overflow: 'hidden' }}>
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3E3E7E&color=fff&size=400`;
                                        }}
                                    />
                                </div>
                                <div style={{ padding: '1.5rem 1rem', textAlign: 'center', minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: '1.2' }}>{member.name}</h3>
                                    <p style={{ color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>{member.designation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div className="management-static-grid">
                            {managementTeam.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    style={{
                                        background: 'var(--bg-card)',
                                        borderRadius: '24px',
                                        border: '1px solid var(--glass-border)',
                                        overflow: 'hidden',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
                                        <img
                                            src={member.image_url}
                                            alt={member.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3E3E7E&color=fff&size=400`;
                                            }}
                                        />
                                    </div>
                                    <div style={{ padding: '1.5rem 1rem', textAlign: 'center', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--text-main)', lineHeight: '1.2' }}>{member.name}</h3>
                                        <p style={{ color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem' }}>{member.designation}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes management-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .infinite-scroll-track:hover {
                    animation-play-state: paused;
                }
                .management-static-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1.5rem;
                    width: 100%;
                }
                @media (max-width: 1200px) {
                    .management-static-grid { grid-template-columns: repeat(4, 1fr); }
                }
                @media (max-width: 992px) {
                    .management-static-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 768px) {
                    .management-static-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
                }
                @media (max-width: 550px) {
                    .management-static-grid { grid-template-columns: 1fr; gap: 1rem; }
                }

            `}</style>
        </section>
    );
};

export default ManagementSection;
