import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaBullseye, FaCheckCircle } from 'react-icons/fa';
import API_BASE_URL from '../api';
import visionImg from '../assets/vision.webp';
import missionImg from '../assets/mission.webp';

const defaultVision = "To be a world-class centre for engineering, technology and management, empowering individuals ethically to lead, innovate and thrive in an ever-evolving global landscape and create socially responsible citizens.";

const defaultMission = [
    "To foster a culture of academic excellence, intellectual and personal growth and practical training that includes hands-on experience in the fields of engineering, technology, and management.",
    "To advance knowledge and drive innovation through cutting-edge research and development in engineering, technology and management.",
    "To bridge the gap between academia and industry by offering industry aligned programs, practical experience and hands-on training in engineering, technology and management that prepare students to lead, innovate and thrive in an ever-evolving global landscape.",
    "To prioritise health, safety, diversity, equity and inclusion to create a welcoming and inclusive environment that produces socially responsible citizens.",
    "To prepare students for successful careers and fulfilling lives by equipping them with the knowledge, skills and ethical principles needed to lead, innovate and thrive in their chosen fields, while emphasising hands-on training as a vital component of their education."
];

const getMissionPoints = (missionData) => {
    if (Array.isArray(missionData) && missionData.length > 0) {
        return missionData;
    }
    if (typeof missionData === 'string' && missionData.trim().length > 0) {
        const points = missionData
            .split(/(?=\d+\.\s*)/)
            .map(p => p.replace(/^\d+\.\s*/, '').trim())
            .filter(p => p.length > 0);
        if (points.length > 0) return points;
    }
    return defaultMission;
};

const MissionVision = () => {
    const [data, setData] = useState({ vision: defaultVision, mission: defaultMission });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/mission-vision`);
                if (response.ok) {
                    const result = await response.json();
                    if (result && (result.vision || (Array.isArray(result.mission) && result.mission.length > 0))) {
                        setData({
                            vision: result.vision || defaultVision,
                            mission: (Array.isArray(result.mission) && result.mission.length > 0) ? result.mission : defaultMission
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching mission data:", error);
            }
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>Loading vision...</div>;
    }

    return (
        <section className="container" style={{ paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

            {/* VISION SECTION (Image Right, Text Left) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                    padding: '0',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0',
                    overflow: 'hidden',
                    minHeight: '400px',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
                }}
            >
                {/* Text Content */}
                <div style={{
                    padding: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    order: 1 // Text Left
                }} className="program-content">
                    <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div style={{
                            padding: '0.8rem',
                            background: 'rgba(79, 70, 229, 0.1)',
                            borderRadius: '50%',
                            color: 'var(--primary)',
                            border: '1px solid rgba(79, 70, 229, 0.2)'
                        }}>
                            <FaEye size={24} />
                        </div>
                        <h3 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: 'var(--text-main)',
                            margin: 0
                        }}>
                            Our Vision
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px' }}
                        style={{ height: '4px', background: 'var(--primary)', marginBottom: '1.5rem', borderRadius: '2px' }} />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-muted)',
                            lineHeight: '1.8',
                            fontStyle: 'italic',
                            fontWeight: '300'
                        }}
                    >
                        "{data.vision}"
                    </motion.p>
                </div>

                {/* Image Content */}
                <div style={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '350px',
                    order: 2 // Image Right
                }}>
                    <motion.img
                        src={visionImg}
                        alt="Vision"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }} />
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to right, var(--bg-card) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
                        pointerEvents: 'none'
                    }} />
                </div>
            </motion.div>


            {/* MISSION SECTION (Image Left, Text Right) */}
            <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                    padding: '0',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0',
                    overflow: 'hidden',
                    minHeight: '400px',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
                }}
            >
                {/* Image Content */}
                <div style={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '350px',
                    order: 1 // Image Left
                }}>
                    <motion.img
                        src={missionImg}
                        alt="Mission"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }} />
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to left, var(--bg-card) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
                        pointerEvents: 'none'
                    }} />
                </div>

                {/* Text Content */}
                <div style={{
                    padding: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    order: 2 // Text Right
                }} className="program-content">
                    <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div style={{
                            padding: '0.8rem',
                            background: 'rgba(236, 72, 153, 0.1)',
                            borderRadius: '50%',
                            color: 'var(--secondary)',
                            border: '1px solid rgba(236, 72, 153, 0.2)'
                        }}>
                            <FaBullseye size={24} />
                        </div>
                        <h3 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: 'var(--text-main)',
                            margin: 0
                        }}>
                            Our Mission
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px' }}
                        style={{ height: '4px', background: 'var(--secondary)', marginBottom: '1.5rem', borderRadius: '2px' }} />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        {getMissionPoints(data.mission).map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="mission-point-card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1.2rem',
                                    padding: '1rem 1.2rem',
                                    borderRadius: '14px',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span style={{
                                    minWidth: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--secondary, #ec4899), #be185d)',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '800',
                                    fontSize: '0.85rem',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 10px rgba(236, 72, 153, 0.3)'
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.65',
                                    fontWeight: '400'
                                }}>
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            <style>{`
                .mission-point-card:hover {
                    transform: translateX(4px);
                    border-color: rgba(236, 72, 153, 0.3) !important;
                    background: rgba(255, 255, 255, 0.07) !important;
                }
                @media (max-width: 968px) {
                    .glass-card {
                        grid-template-columns: 1fr !important;
                    }
                    .program-content {
                        padding: 3rem 1.5rem !important;
                        order: 2 !important; /* Text always below image on mobile */
                    }
                    .program-content + div, div:has(> .program-content) > div:not(.program-content) {
                        order: 1 !important; /* Image always on top on mobile */
                        height: 250px !important;
                        min-height: 250px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default MissionVision;
