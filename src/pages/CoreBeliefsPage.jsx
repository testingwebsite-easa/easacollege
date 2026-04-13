import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import { motion, useScroll, useTransform } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import { FaHandHoldingHeart, FaLightbulb, FaUsers, FaBalanceScale, FaGlobeAsia, FaStar, FaGraduationCap, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';

const iconMap = {
    FaHandHoldingHeart: <FaHandHoldingHeart size={40} />,
    FaLightbulb: <FaLightbulb size={40} />,
    FaUsers: <FaUsers size={40} />,
    FaBalanceScale: <FaBalanceScale size={40} />,
    FaGlobeAsia: <FaGlobeAsia size={40} />,
    FaStar: <FaStar size={40} />,
    FaGraduationCap: <FaGraduationCap size={40} />,
    FaChalkboardTeacher: <FaChalkboardTeacher size={40} />,
    FaLaptopCode: <FaLaptopCode size={40} />
};

function CoreBeliefsPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [beliefs, setBeliefs] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBeliefs = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/core-beliefs`);
                if (res.ok) {
                    const data = await res.json();
                    setBeliefs(data);
                }
            } catch (err) {
                console.error("Error fetching beliefs:", err);
            }
        };
        fetchBeliefs();
    }, []);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Core Beliefs | EASA College" description="The foundational principles and values that guide EASA College in its pursuit of academic excellence." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="core-beliefs"
                defaultTitle="Our Core Beliefs"
                defaultSubtitle="The principles that guide our journey towards academic excellence."
            />

            <section className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {beliefs.map((belief, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -12, borderColor: 'var(--secondary)' }}
                            style={{
                                padding: '3.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '1.8rem',
                                background: 'var(--bg-card)',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                padding: '1.2rem',
                                background: 'var(--glass-highlight)',
                                borderRadius: '18px',
                                color: 'var(--secondary)',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {iconMap[belief.icon] || <FaStar size={40} />}
                            </div>
                            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                {belief.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.15rem' }}>
                                {belief.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default CoreBeliefsPage;
