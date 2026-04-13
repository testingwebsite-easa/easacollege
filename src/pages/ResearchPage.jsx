import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API_BASE_URL from '../api';
import missionBg from '../assets/mission-bg.png'; // Fallback
import GlobalHero from '../components/GlobalHero';

const ResearchPage = () => {
    useScrollAnimation();
    const [courses, setCourses] = useState([]);
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        // Fetch Research category courses
        fetch(`${API_BASE_URL}/api/research-courses`)
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.error('Error fetching research courses:', err));
    }, []);

    return (
        <div className="research-page" style={{ position: 'relative', overflowX: 'hidden', background: 'var(--bg-main)' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="research"
                defaultTitle="Research & Innovation"
                defaultSubtitle="Pioneering the future through advanced doctoral programs and cutting-edge research."
                defaultImage={missionBg}
            />

            {/* COURSES LIST SECTION */}
            <section className="container" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
                {courses.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4rem' }}>
                        <p>Research programs are currently being updated. Please check back soon.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                        {courses.map((course, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                style={{
                                    padding: '0',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '0',
                                    overflow: 'hidden',
                                    minHeight: '400px',
                                    background: 'var(--bg-card)',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
                                }}
                                className="research-card"
                            >
                                {/* Text Content */}
                                <div style={{
                                    padding: '3.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    order: index % 2 === 0 ? 1 : 2
                                }} className="course-content">
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                        <span style={{ padding: '0.4rem 1rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {course.duration || 'Ph.D / M.S'}
                                        </span>
                                        <span style={{ padding: '0.4rem 1rem', background: 'var(--glass-highlight)', color: 'var(--text-main)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Research
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.2rem', color: 'var(--text-main)', lineHeight: '1.1' }}>
                                        {course.title}
                                    </h3>

                                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                                        {course.description}
                                    </p>

                                    <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'var(--glass-highlight)', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                            <strong style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>Eligibility:</strong> {course.eligibility}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <motion.button
                                            className="btn btn-primary"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowAdmissionForm(true)}
                                            style={{ padding: '1rem 2rem' }}
                                        >
                                            Apply for Program
                                        </motion.button>
                                        <Link
                                            to={`/department/${course.title.toLowerCase().replace(/ph\.d\.|m\.s\./g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                                            className="btn"
                                            style={{ padding: '1rem 2rem', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                                        >
                                            Department Info
                                        </Link>
                                    </div>
                                </div>

                                {/* Image Content */}
                                <div style={{ position: 'relative', height: '100%', minHeight: '350px', order: index % 2 === 0 ? 2 : 1 }}>
                                    <motion.img
                                        src={course.image}
                                        alt={course.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop";
                                        }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)' }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                <style>{`
                    @media (max-width: 968px) {
                        .research-card { grid-template-columns: 1fr !important; }
                        .course-content { padding: 2.5rem 1.5rem !important; order: 2 !important; }
                        .course-content + div { order: 1 !important; height: 300px !important; min-height: 300px !important; }
                    }
                `}</style>
            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div >
    );
};

export default ResearchPage;
