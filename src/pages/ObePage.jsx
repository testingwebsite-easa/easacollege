import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import missionBg from '../assets/mission-bg.png';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';
import API_BASE_URL from '../api';
import { FaGraduationCap, FaBullseye, FaChartLine, FaLightbulb, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

const ObePage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDept, setSelectedDept] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/departments`)
            .then(res => res.json())
            .then(data => {
                setDepartments(data);
                if (data.length > 0) setSelectedDept(data[0]);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch departments", err);
                setLoading(false);
            });
    }, []);

    const obeComponents = [
        {
            title: "Program Educational Objectives (PEOs)",
            icon: <FaBullseye />,
            description: "PEOs are broad statements that describe the career and professional accomplishments that the program is preparing graduates to achieve.",
            color: "#3b82f6"
        },
        {
            title: "Program Outcomes (POs)",
            icon: <FaChartLine />,
            description: "POs describe what students are expected to know and be able to do by the time of graduation. These relate to the skills, knowledge, and behaviors that students acquire as they progress through the program.",
            color: "#10b981"
        },
        {
            title: "Program Specific Outcomes (PSOs)",
            icon: <FaLightbulb />,
            description: "PSOs are statements that describe what the graduates of a specific engineering program should be able to do.",
            color: "#f59e0b"
        },
        {
            title: "Course Outcomes (COs)",
            icon: <FaGraduationCap />,
            description: "COs are direct statements that describe the essential and enduring disciplinary knowledge, abilities that students should possess and the depth of learning that is expected upon completion of a course.",
            color: "#ef4444"
        }
    ];

    return (
        <div className="obe-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* Hero Section */}
            <div style={{
                position: 'relative', height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg-section)', paddingTop: '120px',
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), url(${missionBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5, zIndex: 0 }} />
                
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '1000px' }}>
                    <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', display: 'block' }}>Academic Excellence</span>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-2px', lineHeight: 1.1 }}>Outcome Based Education (OBE)</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', maxWidth: '800px', margin: '0 auto', fontWeight: '300', lineHeight: 1.6 }}>Transparency in learning, clarity in outcomes, and excellence in engineering education.</p>
                </motion.div>
            </div>

            {/* Introduction Section */}
            <section style={{ padding: '8rem 2rem', background: 'var(--bg-main)', position: 'relative' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: '800' }}>What is <span style={{ color: 'var(--primary)' }}>OBE?</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            <p>Outcome Based Education (OBE) is a student-centric teaching and learning methodology in which the course delivery and assessment are planned to achieve stated objectives and outcomes.</p>
                            <p>It focuses on measuring student performance through outcomes. Outcomes include knowledge, skills, and attitudes that a student should be able to demonstrate after completing a course or program.</p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <div className="glass-card" style={{ padding: '1rem', flex: 1, borderTop: '4px solid var(--primary)' }}>
                                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Student Centric</h4>
                                    <p style={{ fontSize: '0.9rem' }}>Focuses on what students learn rather than what is taught.</p>
                                </div>
                                <div className="glass-card" style={{ padding: '1rem', flex: 1, borderTop: '4px solid var(--secondary)' }}>
                                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Continuous Improvement</h4>
                                    <p style={{ fontSize: '0.9rem' }}>Enables data-driven enhancements to curriculum and teaching.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '10rem', opacity: 0.05, color: 'var(--primary)' }}><FaGraduationCap /></div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '700' }}>Philosophy of OBE</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {[
                                "Clarity of focus on outcomes",
                                "Designing backwards for results",
                                "High expectations for all students",
                                "Expanded opportunities for learning",
                                "Constructive alignment of assessment"
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                                    <FaCheckCircle style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Components Section */}
            <section style={{ padding: '6rem 2rem', background: 'var(--bg-section)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Key Components of OBE</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>The structural framework that ensures educational quality and accountability.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {obeComponents.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card hover-lift"
                                style={{ padding: '3rem 2rem', borderTop: `5px solid ${item.color}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                            >
                                <div style={{ fontSize: '3rem', color: item.color }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Department OBE Explorer */}
            <section style={{ padding: '8rem 2rem', background: 'var(--bg-main)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '2rem' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Explore OBE by Department</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Select a department to view their specific Program Educational Objectives, Outcomes, and more.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', width: '100%' }}>
                            {departments.map((dept) => (
                                <button
                                    key={dept._id}
                                    onClick={() => setSelectedDept(dept)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '50px',
                                        border: '1px solid var(--glass-border)',
                                        background: selectedDept?._id === dept._id ? 'var(--primary)' : 'var(--glass)',
                                        color: selectedDept?._id === dept._id ? '#fff' : 'var(--text-main)',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: selectedDept?._id === dept._id ? '0 10px 20px var(--primary-glow)' : 'none'
                                    }}
                                >
                                    {dept.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedDept && (
                            <motion.div
                                key={selectedDept._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="glass-card"
                                style={{ padding: '4rem', border: '1px solid var(--glass-border)' }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '300px' }}>
                                            <img 
                                                src={selectedDept.heroImage || missionBg} 
                                                alt={selectedDept.name} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: '#fff' }}>
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{selectedDept.name}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--secondary)', marginBottom: '1rem' }}>Vision</h4>
                                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontStyle: 'italic' }}>"{selectedDept.vision}"</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <a href={`/department/${selectedDept.slug}`} className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>Full Dept Profile</a>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                        {/* PEOs */}
                                        {selectedDept.peo?.length > 0 && (
                                            <div>
                                                <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <span style={{ width: '30px', height: '30px', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>1</span>
                                                    Program Educational Objectives (PEOs)
                                                </h4>
                                                <div style={{ display: 'grid', gap: '1rem' }}>
                                                    {selectedDept.peo.map((p, i) => (
                                                        <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--primary)' }}>
                                                            {p}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* POs */}
                                        {selectedDept.po?.length > 0 && (
                                            <div>
                                                <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <span style={{ width: '30px', height: '30px', background: 'var(--secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>2</span>
                                                    Program Outcomes (POs)
                                                </h4>
                                                <div style={{ display: 'grid', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
                                                    {selectedDept.po.map((p, i) => (
                                                        <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--secondary)', fontSize: '0.95rem' }}>
                                                            <strong style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}>PO{i+1}:</strong> {p}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* PSOs */}
                                        {selectedDept.pso?.length > 0 && (
                                            <div>
                                                <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <span style={{ width: '30px', height: '30px', background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>3</span>
                                                    Program Specific Outcomes (PSOs)
                                                </h4>
                                                <div style={{ display: 'grid', gap: '1rem' }}>
                                                    {selectedDept.pso.map((p, i) => (
                                                        <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid #f59e0b' }}>
                                                            <strong style={{ color: '#f59e0b', marginRight: '0.5rem' }}>PSO{i+1}:</strong> {p}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Bloom's Taxonomy Section */}
            <section style={{ padding: '8rem 2rem', background: 'var(--bg-section)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>Bloom's Taxonomy in OBE</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 5rem', color: 'var(--text-muted)', fontSize: '1.2rem' }}>We align our assessment tools with various levels of Bloom's Taxonomy to ensure high-order thinking skills.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        {[
                            { level: "Create", color: "#4f46e5", desc: "Producing new or original work" },
                            { level: "Evaluate", color: "#7c3aed", desc: "Justifying a stand or decision" },
                            { level: "Analyze", color: "#2563eb", desc: "Drawing connections among ideas" },
                            { level: "Apply", color: "#10b981", desc: "Using information in new situations" },
                            { level: "Understand", color: "#f59e0b", desc: "Explaining ideas or concepts" },
                            { level: "Remember", color: "#ef4444", desc: "Recalling facts and basic concepts" }
                        ].map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, width: '40%' }}
                                whileInView={{ opacity: 1, width: `${90 - i * 10}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                style={{
                                    background: b.color,
                                    color: '#fff',
                                    padding: '1.2rem',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{b.level}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.9 }}>{b.desc}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
            
            <style>{`
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }
                .obe-page ::-webkit-scrollbar {
                    width: 6px;
                }
                .obe-page ::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.1);
                }
                .obe-page ::-webkit-scrollbar-thumb {
                    background: var(--primary);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default ObePage;
