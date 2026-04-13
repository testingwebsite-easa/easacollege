import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import missionBg from '../assets/mission-bg.png';
import sdgHero from '../assets/sdg-hero.png';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';

const sdgData = [
    { id: 1, title: "No Poverty", color: "#e5243b", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg", description: "Providing scholarships and affordable education to students from economically backward sections." },
    { id: 2, title: "Zero Hunger", color: "#dda63a", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg", description: "Campus organic farming and food distribution programs for the local community." },
    { id: 3, title: "Good Health and Well-being", color: "#4c9f38", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg", description: "Healthcare center on campus and regular medical camps for staff and students." },
    { id: 4, title: "Quality Education", color: "#c5192d", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg", description: "Holistic engineering education aligned with industry standards and outcome-based learning." },
    { id: 5, title: "Gender Equality", color: "#ff3a21", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg", description: "Equal opportunities for all genders in staffing, admissions, and leadership roles." },
    { id: 6, title: "Clean Water and Sanitation", color: "#26bde2", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg", description: "Water treatment plants and efficient water management across the campus." },
    { id: 7, title: "Affordable and Clean Energy", color: "#fcc30b", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg", description: "Extensive use of solar panels and energy-efficient lighting systems." },
    { id: 8, title: "Decent Work and Economic Growth", color: "#a21942", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg", description: "Skill development centers and an active placement cell for career growth." },
    { id: 9, title: "Industry, Innovation and Infrastructure", color: "#fd6925", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg", description: "State-of-the-art labs, incubation centers, and industry collaborations." },
    { id: 10, title: "Reduced Inequalities", color: "#dd1367", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg", description: "Promoting social inclusion and supporting diverse backgrounds." },
    { id: 11, title: "Sustainable Cities and Communities", color: "#fd9d24", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg", description: "Eco-friendly campus initiatives and community outreach programs." },
    { id: 12, title: "Responsible Consumption and Production", color: "#bf8b2e", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg", description: "Waste management systems and promotion of a paperless environment." },
    { id: 13, title: "Climate Action", color: "#3f7e44", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg", description: "Tree plantation drives and carbon footprint reduction initiatives." },
    { id: 14, title: "Life Below Water", color: "#0a97d9", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg", description: "Responsible disposal of chemicals and protection of local water bodies." },
    { id: 15, title: "Life on Land", color: "#56c02b", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg", description: "Maintaining a lush green campus and protecting the local biodiversity." },
    { id: 16, title: "Peace, Justice and Strong Institutions", color: "#00689d", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg", description: "Transparent governance and ethical practices across all departments." },
    { id: 17, title: "Partnerships for the Goals", color: "#19486a", icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg", description: "Collaborations with global institutions and industries to achieve shared goals." }
];

const SdgsPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    return (
        <div className="sdgs-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* Hero Section */}
            <div style={{
                position: 'relative', height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg-section)', paddingTop: '120px',
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(${sdgHero})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5, zIndex: 0 }} />
                
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '1000px' }}>
                    <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', fontWeight: 'bold' }}>Sustainable Development Goals</span>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px' }}>SDG Goals @EASA</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', maxWidth: '700px', margin: '0 auto' }}>Implementing global standards for a sustainable and inclusive future through innovation and education.</p>
                </motion.div>
            </div>

            {/* Goals Grid */}
            <section className="container" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {sdgData.map((goal, index) => (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="glass-card"
                            style={{
                                padding: '2.5rem 2rem',
                                borderLeft: `6px solid ${goal.color}`,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.2rem',
                                height: '100%',
                                background: 'var(--glass)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ 
                                width: '120px', 
                                height: '120px', 
                                borderRadius: '12px', 
                                overflow: 'hidden',
                                background: '#fff', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: `0 10px 25px ${goal.color}44`,
                                border: '1px solid rgba(0,0,0,0.1)'
                            }}>
                                <img src={goal.icon} alt={goal.title} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{goal.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{goal.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Impact Section */}
            <section style={{ background: 'var(--bg-section)', padding: '6rem 2rem', textAlign: 'center' }}>
                <div className="container">
                    {/* <img src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08/SDG_logo_horizontal-300x164.png" alt="SDG Logo" style={{ height: '80px', marginBottom: '2rem', filter: 'brightness(0) invert(var(--is-dark, 0))' }} /> */}
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Collective Impact</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}>EASA College is committed to integrating these 17 goals into our academic curriculum, campus operations, and community engagement initiatives.</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
                        <div>
                            <h3 style={{ fontSize: '3rem', color: 'var(--primary)' }}>50+</h3>
                            <p>Community Programs</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '3rem', color: 'var(--secondary)' }}>30%</h3>
                            <p>Solar Powered Campus</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '3rem', color: 'var(--primary)' }}>100%</h3>
                            <p>Inclusive Education</p>
                        </div>
                    </div>
                </div>
            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default SdgsPage;
