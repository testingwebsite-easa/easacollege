import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaChartLine, FaStar, FaCalculator, FaUserTie, FaCode, FaUsers, FaGraduationCap } from 'react-icons/fa';
import API_BASE_URL from '../api';

const PlacementSection = () => {
    const [companies, setCompanies] = React.useState([]);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/placement-partners`)
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    setCompanies(data);
                }
            })
            .catch(err => {
                console.error("Error fetching placement partners:", err);
            });
    }, []);

    const row1 = companies.filter(c => c.row === 1 || !c.row);
    const row2 = companies.filter(c => c.row === 2);

    const stats = [
        { label: "Placement Percentage", value: "96%", icon: <FaCheckCircle />, color: "#ffffff" },
        { label: "Highest Package", value: "12 LPA", icon: <FaRocket />, color: "#ffffff" },
        { label: "Average Package", value: "4.5 LPA", icon: <FaChartLine />, color: "#ffffff" },
        { label: "Top Recruiters", value: "150+", icon: <FaStar />, color: "#ffffff" }
    ];

    const training = [
        { title: "Aptitude Training", desc: "Logical, Verbal & Quant", icon: <FaCalculator /> },
        { title: "Soft Skills", desc: "Communication & Manners", icon: <FaUserTie /> },
        { title: "Tech Bootcamps", desc: "Full Stack & AI/ML", icon: <FaCode /> },
        { title: "Mock Interviews", desc: "With Industry Experts", icon: <FaUsers /> }
    ];

    return (
        <section id="placement-section" style={{
            padding: '6rem 0',
            background: 'var(--bg-dark)',
            color: 'var(--text-main)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                opacity: 0.3,
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: '0.9rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'var(--text-muted)',
                            display: 'block',
                            marginBottom: '1rem'
                        }}
                    >
                        Career Excellence
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '900',
                            marginBottom: '1.5rem',
                            color: 'var(--text-main)',
                            lineHeight: 1.1
                        }}
                    >
                        Transforming Potential <br />Into Professional Success
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            color: 'var(--text-muted)',
                            fontSize: '1.2rem',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}
                    >
                        Our robust placement cell connects students with industry giants, ensuring a future-ready career platform and global opportunities.
                    </motion.p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2rem',
                    marginBottom: '6rem'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                textAlign: 'center',
                                padding: '2.5rem',
                                background: 'var(--glass)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '20px',
                                color: 'var(--text-main)'
                            }}
                        >
                            <div style={{
                                fontSize: '2.5rem',
                                color: 'var(--secondary)',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {stat.icon}
                            </div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>{stat.value}</h3>
                            <p style={{
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: 'var(--text-muted)',
                                fontWeight: '700'
                            }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            position: 'relative',
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000"
                                alt="Placement Training"
                                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, var(--bg-dark), transparent)'
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                bottom: '30px',
                                left: '30px',
                                right: '30px'
                            }}>
                                <div style={{
                                    background: 'var(--glass)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                        <FaGraduationCap size={24} color="var(--secondary)" />
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Industry Ready</h4>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Dedicated training sessions integrated within the academic curriculum for holistic development.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-main)' }}>Comprehensive Training</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                We believe in preparing students for the real world through intensive training modules designed by industry veterans.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {training.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}
                                >
                                    <div style={{
                                        minWidth: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: 'var(--glass)',
                                        border: '1px solid var(--glass-border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--secondary)',
                                        fontSize: '1.2rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-main)' }}>{item.title}</h5>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            style={{ marginTop: '1rem' }}
                        >
                            <a href="/page/placement" className="btn btn-light" style={{ borderRadius: '50px', padding: '1rem 2.5rem', fontWeight: '800' }}>
                                View Success Stories
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '8rem',
                background: 'var(--bg-dark)',
                padding: '6rem 0',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        style={{
                            fontSize: '1.2rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            color: 'var(--text-main)',
                            marginBottom: '1rem'
                        }}
                    >
                        Our Strategic Hiring Partners
                    </motion.h4>
                    <div style={{ width: '60px', height: '4px', background: 'var(--secondary)', margin: '0 auto' }}></div>
                </div>

                <div className="partners-scroller">
                    <style>{`
                        .partners-scroller {
                            display: flex;
                            flex-direction: column;
                            gap: 3rem;
                            overflow: hidden;
                            position: relative;
                        }
                        .scroll-track {
                            display: flex;
                            gap: 3rem;
                            width: max-content;
                            padding: 10px 0;
                        }
                        .animate-left {
                            animation: scroll-left 40s linear infinite;
                        }
                        .animate-right {
                            animation: scroll-right 40s linear infinite;
                        }
                        @keyframes scroll-left {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        @keyframes scroll-right {
                            0% { transform: translateX(-50%); }
                            100% { transform: translateX(0); }
                        }
                        .partner-card {
                            width: 200px;
                            height: 100px;
                            background: transparent;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 1rem;
                        }
                        .partner-card img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            filter: brightness(0) invert(1);
                        }
                        [data-theme="light"] .partner-card img {
                            filter: brightness(0);
                        }
                        .scroller-fade {
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            width: 150px;
                            z-index: 2;
                            pointer-events: none;
                        }
                        .scroller-fade-left {
                            left: 0;
                            background: linear-gradient(to right, var(--bg-dark), transparent);
                        }
                        .scroller-fade-right {
                            right: 0;
                            background: linear-gradient(to left, var(--bg-dark), transparent);
                        }
                    `}</style>

                    <div className="scroller-fade scroller-fade-left"></div>
                    <div className="scroller-fade scroller-fade-right"></div>

                    {/* Row 1: Right to Left */}
                    <div className="scroll-track animate-left">
                        {row1.length > 0 && [...row1, ...row1].map((company, index) => (
                            <div key={`left-${index}`} className="partner-card">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Left to Right */}
                    <div className="scroll-track animate-right">
                        {row2.length > 0 && [...row2, ...row2].map((company, index) => (
                            <div key={`right-${index}`} className="partner-card">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    #placement-section { padding: 4rem 0; }
                    .partner-card { width: 160px; height: 80px; }
                }
            `}</style>
        </section>
    );
};

export default PlacementSection;
