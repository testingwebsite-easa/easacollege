import React from 'react';
import { motion, useInView, animate } from 'framer-motion';
import API_BASE_URL from '../api';

const StatCounter = ({ value }) => {
    const [displayValue, setDisplayValue] = React.useState(value);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    React.useEffect(() => {
        if (!isInView) return;

        const numberMatches = value.match(/\d+/g);
        if (!numberMatches) return;

        const numbers = numberMatches.map(Number);
        const isReverse = value.includes('#1');

        const controls = animate(0, 1, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (progress) => {
                let currentText = value;
                numberMatches.forEach((numStr, i) => {
                    const target = numbers[i];
                    let start = 0;
                    if (isReverse && numStr === '1') {
                        start = 20;
                    }
                    const current = Math.round(start + (target - start) * progress);
                    const regex = new RegExp(`(?<!\\d)${numStr}(?!\\d)`, 'g');
                    currentText = currentText.replace(regex, current);
                });
                setDisplayValue(currentText);
            }
        });

        return () => controls.stop();
    }, [value, isInView]);

    return <span ref={ref}>{displayValue}</span>;
};

const FacultyStats = () => {
    const [stats, setStats] = React.useState([]);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/faculty-stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching stats:", err));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } }
    };

    return (
        <div style={{ width: '100%', padding: '4rem 0', background: 'var(--bg-main)' }}>
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <motion.h2
                    className="text-gradient"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '900',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    World-class faculty <br /> inspire on all levels.
                </motion.h2>
                <motion.a
                    href="/institution"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        color: 'var(--secondary)',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        borderBottom: '2px solid var(--secondary)',
                        paddingBottom: '4px'
                    }}
                >
                    Know about our Faculty Members.
                </motion.a>
            </div>

            {/* Stats Bar */}
            <div style={{
                background: 'linear-gradient(135deg, var(--primary) 0%, #252451 100%)',
                padding: '5rem 0',
                width: '100%',
                marginTop: '4rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '3rem',
                            textAlign: 'center'
                        }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                style={{ color: 'white' }}
                            >
                                <div style={{
                                    fontSize: '3.5rem',
                                    fontWeight: '900',
                                    marginBottom: '0.8rem',
                                    textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                                }}>
                                    <StatCounter value={stat.value} />
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    lineHeight: '1.5',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    opacity: 0.9
                                }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default FacultyStats;
