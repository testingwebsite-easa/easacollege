import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const milestonesData = [
    { year: '2008', desc: 'Established', sub: 'UG - ECE, CSE, EEE, IT', color: '#34495e', borderColor: '#34495e' },
    { year: '2009', desc: 'UG - MECH', sub: 'PG - MBA', color: '#9b59b6', borderColor: '#8e44ad' },
    { year: '2011', desc: 'PG - CSE', sub: '', color: '#795548', borderColor: '#5d4037' },
    { year: '2012', desc: 'PG - PED, CS', sub: '', color: '#3498db', borderColor: '#2980b9' },
    { year: '2013', desc: 'PG - SE', sub: '', color: '#2980b9', borderColor: '#1f618d' },
    { year: '2014', desc: 'PG - CEM, MFE', sub: '', color: '#f1c40f', borderColor: '#d4ac0d' },
    { year: '2015', desc: 'ISO 9001 : 2015', sub: 'certification', color: '#3f51b5', borderColor: '#303f9f' },
    { year: '2020', desc: 'UG - AIDS, AGRI', sub: '', color: '#8e44ad', borderColor: '#7d3c98' },
    { year: '2022', desc: 'IIC MoE', sub: 'UG - CSE (CYBER)', color: '#c0392b', borderColor: '#a93226' },
    { year: '2023', desc: 'NAAC "A" Grade', sub: 'CGPA: 3.18, UGC 2(f), UG - BME, AIML', color: '#27ae60', borderColor: '#229954' },
    { year: '2024', desc: 'UGC Conferred Autonomous', sub: 'From AY 2024 - 25', color: '#8e44ad', borderColor: '#7d3c98' },
    { year: '2025', desc: 'Proposal for NBA', sub: '', color: '#f39c12', borderColor: '#d35400' }
];

function MilestonesPage() {
    const [showAdmissionForm, setShowAdmissionForm] = React.useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div style={{ position: 'relative', overflowX: 'hidden', background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
            <SEO title="Institute Milestones | EASA College" description="Tracing the journey of EASA College from its inception to becoming a premier educational institution." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="milestones"
                defaultTitle="Institute Milestones"
                defaultSubtitle="Celebrating our journey of growth, innovation, and educational excellence."
            />

            <div className="milestone-container" style={{ padding: '6rem 2rem' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="timeline-grid"
                    style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        position: 'relative'
                    }}
                >
                    {milestonesData.map((item, index) => {
                        // Position Logic
                        const isTopRow = index >= 8;
                        const gridColumn = isTopRow ? 16 - index : index + 1;
                        const gridRow = isTopRow ? 1 : 2;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="milestone-card"
                                style={{
                                    gridColumn: gridColumn,
                                    gridRow: gridRow,
                                    position: 'relative',
                                    zIndex: 2
                                }}
                            >
                                <div style={{
                                    border: `5px solid ${item.borderColor}`,
                                    borderRadius: '20px',
                                    padding: '1.5rem 1rem',
                                    background: 'var(--bg-card)',
                                    textAlign: 'center',
                                    minHeight: '160px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                                    position: 'relative'
                                }}>
                                    {/* Speech Bubble Tail */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-14px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 0,
                                        height: 0,
                                        borderLeft: '15px solid transparent',
                                        borderRight: '15px solid transparent',
                                        borderTop: `15px solid ${item.borderColor}`,
                                        display: 'block'
                                    }}></div>

                                    <h3 style={{
                                        color: item.borderColor,
                                        fontWeight: '800',
                                        fontSize: '2rem',
                                        marginBottom: '0.4rem',
                                        lineHeight: 1
                                    }}>{item.year}</h3>

                                </div>

                                {/* Text Below the box */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: 'var(--text-main)',
                                    lineHeight: '1.4'
                                }}>
                                    <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>{item.desc}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                                </div>

                                {/* Connectors */}
                                {index < 7 && (
                                    <div className="connector-h" style={{
                                        position: 'absolute',
                                        top: '80px',
                                        right: '-2rem',
                                        width: '2rem',
                                        height: '3px',
                                        background: 'transparent',
                                        borderTop: '3px dashed #cbd5e1',
                                        zIndex: 1
                                    }}>

                                    </div>
                                )}
                                {index === 7 && (
                                    <div className="connector-v" style={{
                                        position: 'absolute',
                                        top: '-4rem',
                                        left: '50%',
                                        height: '4rem',
                                        width: '3px',
                                        background: 'transparent',
                                        borderLeft: '3px dashed #cbd5e1',
                                        zIndex: 1
                                    }}>

                                    </div>
                                )}
                                {index >= 8 && index < 11 && (
                                    <div className="connector-h-rev" style={{
                                        position: 'absolute',
                                        top: '80px',
                                        left: '-2rem',
                                        width: '2rem',
                                        height: '3px',
                                        background: 'transparent',
                                        borderTop: '3px dashed #a6adb5ff',
                                        zIndex: 1
                                    }}>

                                    </div>
                                )}

                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .timeline-grid {
                    display: grid;
                    grid-template-columns: repeat(8, 1fr);
                    gap: 2rem;
                }
                
                @media (max-width: 1200px) {
                    .timeline-grid {
                        display: flex !important;
                        flex-direction: column;
                        align-items: center;
                        gap: 3rem !important;
                    }
                    .milestone-card {
                        width: 100%;
                        max-width: 350px;
                        grid-column: auto !important;
                        grid-row: auto !important;
                        margin-bottom: 2rem;
                    }
                    .connector-h, .connector-v, .connector-h-rev {
                        display: none !important;
                    }
                    .milestone-card::after {
                        content: '';
                        position: absolute;
                        bottom: -40px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 2px;
                        height: 40px;
                        border-left: 2px dashed #cbd5e1;
                        opacity: 0.5;
                    }
                    .milestone-card:last-child::after {
                        display: none;
                    }
                    .milestone-container {
                        padding: 4rem 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default MilestonesPage;

