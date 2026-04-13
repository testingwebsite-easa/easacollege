import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaBullseye, FaCheckCircle } from 'react-icons/fa';
import API_BASE_URL from '../api';
import visionImg from '../assets/vision.png';
import missionImg from '../assets/mission.png';

const MissionVision = () => {
    const [data, setData] = useState({ vision: "", mission: [] });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/mission-vision`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching mission data:", error);
            } finally {
                setLoading(false);
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

                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}
                    >
                        {data.mission && data.mission.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                style={{
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    padding: '0.6rem',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s'
                                }}
                            >
                                <span style={{
                                    marginRight: '12px',
                                    color: 'var(--secondary)',
                                    marginTop: '4px',
                                    flexShrink: 0
                                }}>
                                    <FaCheckCircle size={16} />
                                </span>
                                <span style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.5'
                                }}>
                                    {item}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </motion.div>

            <style>{`
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
