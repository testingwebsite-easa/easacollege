import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api';

// Official verified EASA College Leadership with official Amazon S3 images
const OFFICIAL_MANAGEMENT_TEAM = [
    {
        _id: "lead-001",
        name: "Late Shri T.E. Eswaramoothy",
        designation: "Founder & Chairman",
        category: "founder",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769498987215-989607021-founder.jpeg",
        message: "Easa College of Engineering and Technology stands as a testament to the vision and commitment of our late founder to excellence in technical education.",
        order: 1
    },
    {
        _id: "lead-002",
        name: "Smt. Sujatha Eswaramoorthy",
        designation: "Chairperson",
        category: "chairperson",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769496978582-206081635-chairperson.jpeg",
        message: "It gives me immense pleasure to welcome you to Easa College of Engineering and Technology. Our college has seen continuous growth and success.",
        order: 2
    },
    {
        _id: "lead-003",
        name: "Shri. T.E. Ajith",
        designation: "Secretary & CEO",
        category: "secretary",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769496992644-586176077-ceo.jpeg",
        message: "As the Secretary & CEO of Easa College, I am committed to driving operational excellence and strategic growth.",
        order: 3
    },
    {
        _id: "lead-004",
        name: "Shri. T.E. Aadarsh",
        designation: "Correspondent",
        category: "correspondent",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769497006357-389813990-cro.jpeg",
        message: "In my role as Correspondent, I focus on the holistic development of our students and the continuous improvement of our campus facilities.",
        order: 4
    },
    {
        _id: "lead-005",
        name: "Dr. Z. Robert Kennedy",
        designation: "Principal",
        category: "principal",
        image_url: "https://easa-college.s3.eu-north-1.amazonaws.com/images/1769497023151-755142356-pri.jpeg",
        message: "Welcome to Easa College of Engineering and Technology. As the Principal, I am honored to lead an institution that prioritizes academic excellence.",
        order: 5
    }
];

const ManagementSection = ({ category, title = "Visionary Leadership", subtitle = "Guiding EASA College towards excellence", isStatic = false }) => {
    // Initialize immediately with the official leadership so the section never renders empty or missing cards
    const [managementTeam, setManagementTeam] = React.useState(() => {
        if (category) {
            const filtered = OFFICIAL_MANAGEMENT_TEAM.filter(m => m.category === category);
            return filtered.length > 0 ? filtered : OFFICIAL_MANAGEMENT_TEAM.slice(0, 5);
        }
        return isStatic ? OFFICIAL_MANAGEMENT_TEAM.slice(0, 5) : OFFICIAL_MANAGEMENT_TEAM;
    });
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchTeam = async () => {
            try {
                const url = category
                    ? `${API_BASE_URL}/api/management-team?category=${category}`
                    : `${API_BASE_URL}/api/management-team`;

                const res = await fetch(url);
                if (!res.ok) return;

                const data = await res.json();
                if (!Array.isArray(data) || data.length === 0) return;

                let teamList = [...data];

                // Check if principal is in the list
                const hasPrincipal = teamList.some(m =>
                    m.category === 'principal' ||
                    m.designation?.toLowerCase().includes('principal') ||
                    m.name?.toLowerCase().includes('principal')
                );

                // If not filtered to a single subcategory and principal is missing, append principal
                if (!hasPrincipal && (!category || category === 'management' || category === 'leadership')) {
                    const principalFallback = OFFICIAL_MANAGEMENT_TEAM.find(m => m.category === 'principal');
                    if (principalFallback) {
                        teamList.push(principalFallback);
                    }
                }

                if (isMounted) {
                    const limitedData = (!category || isStatic) ? teamList.slice(0, 5) : teamList;
                    setManagementTeam(limitedData);
                }
            } catch (err) {
                console.error("Error fetching management team, using official default team:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTeam();
        return () => { isMounted = false; };
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
                                            style={
                                                member.name?.toLowerCase().includes('sujatha') || member.category === 'chairperson'
                                                    ? { objectPosition: 'center 35%', transform: 'scale(1.12)' }
                                                    : {}
                                            }
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
