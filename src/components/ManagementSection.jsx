import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api';

const ManagementSection = ({ category, title = "Visionary Leadership", subtitle = "Guiding EASA College towards excellence", isStatic = false }) => {
    const [managementTeam, setManagementTeam] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const url = category
            ? `${API_BASE_URL}/api/management-team?category=${category}`
            : `${API_BASE_URL}/api/management-team`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const filteredData = Array.isArray(data)
                    ? data.filter(m => m.category !== 'principal' && !m.designation?.toLowerCase().includes('principal'))
                    : [];
                const limitedData = (!category || isStatic) ? filteredData.slice(0, 5) : filteredData;
                setManagementTeam(limitedData);
            })
            .catch(err => console.error("Error fetching management team:", err))
            .finally(() => setLoading(false));
    }, [category, isStatic]);

    const isScrolling = false;

    return (
        <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: 'clamp(1.8rem, 4vw, 3rem)', padding: '0 1rem' }}>
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                        fontWeight: '900',
                        marginBottom: '0.8rem',
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
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                        maxWidth: '700px',
                        margin: '0 auto 1.5rem auto',
                        lineHeight: '1.6'
                    }}
                >
                    {subtitle}
                </motion.p>
                {!isStatic && (
                    <a href="/management" style={{
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        background: 'transparent',
                        border: '2px solid var(--secondary)',
                        color: 'var(--secondary)',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
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

            <div style={{ width: '100%', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
                {isScrolling ? (
                    <div className="infinite-scroll-track" style={{ display: 'flex', gap: '1.5rem', animation: 'management-scroll 40s linear infinite' }}>
                        {[...managementTeam, ...managementTeam].map((member, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="scroll-member-card"
                                style={{
                                    width: '220px',
                                    flexShrink: 0,
                                    borderRadius: '16px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ width: '100%', aspectRatio: '4 / 4.2', overflow: 'hidden' }}>
                                    <img
                                        src={member.image_url}
                                        alt={member.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3E3E7E&color=fff&size=300`;
                                        }}
                                    />
                                </div>
                                <div style={{ padding: '1rem 0.8rem', textAlign: 'center', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h3 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontWeight: '800', marginBottom: '0.2rem', color: 'var(--text-main)', lineHeight: '1.2' }}>{member.name}</h3>
                                    <p style={{ color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: 'clamp(0.65rem, 1.5vw, 0.72rem)' }}>{member.designation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
                        <div className="management-static-grid">
                            {managementTeam.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6 }}
                                    className="management-card"
                                >
                                    <div className="management-img-wrapper">
                                        <img
                                            src={member.image_url}
                                            alt={member.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3E3E7E&color=fff&size=300`;
                                            }}
                                        />
                                    </div>
                                    <div className="management-card-body">
                                        <h3 className="management-card-title">{member.name}</h3>
                                        <p className="management-card-role">{member.designation}</p>
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
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1.25rem;
                    width: 100%;
                }
                .management-card {
                    flex: 1 1 200px;
                    max-width: 235px;
                    min-width: 180px;
                    background: var(--bg-card);
                    border-radius: 16px;
                    border: 1px solid var(--glass-border);
                    overflow: hidden;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }
                .management-card:hover {
                    border-color: rgba(230, 182, 39, 0.4);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
                }
                .management-img-wrapper {
                    width: 100%;
                    aspect-ratio: 4 / 4.2;
                    overflow: hidden;
                    position: relative;
                    background: var(--bg-section);
                }
                .management-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top center;
                    transition: transform 0.5s ease;
                }
                .management-card:hover .management-img-wrapper img {
                    transform: scale(1.05);
                }
                .management-card-body {
                    padding: 1rem 0.8rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 1;
                    min-height: 80px;
                }
                .management-card-title {
                    font-size: clamp(0.9rem, 1.8vw, 1.05rem);
                    font-weight: 800;
                    margin-bottom: 0.25rem;
                    color: var(--text-main);
                    line-height: 1.3;
                }
                .management-card-role {
                    color: var(--secondary);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    font-size: clamp(0.65rem, 1.4vw, 0.72rem);
                }
                @media (max-width: 992px) {
                    .management-static-grid {
                        gap: 1.1rem;
                    }
                    .management-card {
                        flex: 1 1 calc(33.333% - 1.1rem);
                        max-width: 260px;
                        min-width: 170px;
                    }
                }
                @media (max-width: 768px) {
                    .management-static-grid {
                        gap: 1rem;
                    }
                    .management-card {
                        flex: 1 1 calc(50% - 1rem);
                        max-width: calc(50% - 0.5rem);
                        min-width: 140px;
                    }
                }
                @media (max-width: 480px) {
                    .management-static-grid {
                        gap: 0.75rem;
                    }
                    .management-card {
                        flex: 1 1 calc(50% - 0.75rem);
                        max-width: calc(50% - 0.375rem);
                        min-width: 130px;
                        border-radius: 14px;
                    }
                    .management-card-body {
                        padding: 0.8rem 0.5rem;
                        min-height: 70px;
                    }
                    .scroll-member-card {
                        width: 170px !important;
                    }
                }
                @media (max-width: 350px) {
                    .management-card {
                        flex: 1 1 100%;
                        max-width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default ManagementSection;

