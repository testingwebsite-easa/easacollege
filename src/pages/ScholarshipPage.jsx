import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionForm from '../components/AdmissionForm';
import AdmissionCTA from '../components/AdmissionCTA';
import API_BASE_URL from '../api';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { FaGraduationCap, FaCheckCircle, FaClipboardList, FaUsers, FaArrowRight, FaCalendarAlt, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const ScholarshipPage = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedScholarship, setSelectedScholarship] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/scholarships`);
            if (response.ok) {
                const data = await response.json();
                setScholarships(data);
            }
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredScholarships = scholarships.filter(item => {
        return selectedCategory === 'All' || item.category === selectedCategory;
    });

    const categories = ['All', ...new Set(scholarships.map(s => s.category))];

    const formatDate = (dateString) => {
        if (!dateString) return 'Ongoing';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Scholarships | EASA College" description="Explore various scholarship opportunities and financial aid programs available for students at EASA College." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="scholarships"
                defaultTitle="Scholarships & Financial Aid"
                defaultSubtitle="Empowering students to achieve their academic dreams through various scholarship programs and financial support."
                defaultImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
            />

            <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: '70px', zIndex: 10 }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.2rem 2rem', display: 'flex', gap: '1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.7rem 1.5rem',
                                borderRadius: '50px',
                                border: '1px solid var(--glass-border)',
                                background: selectedCategory === cat ? 'var(--secondary)' : 'var(--glass-highlight)',
                                color: selectedCategory === cat ? 'var(--bg-dark)' : 'var(--text-muted)',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <section style={{ padding: '6rem 2rem' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '4rem', maxWidth: '900px' }}
                    >
                        Our institution is committed to supporting meritorious and economically disadvantaged students by facilitating various Government and Institutional Scholarships. Eligible students are encouraged to apply through the respective portals within the stipulated time.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '32px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        >
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ background: 'var(--glass-highlight)', padding: '10px', borderRadius: '14px', color: 'var(--secondary)', display: 'flex' }}><FaClipboardList /></span> Available Schemes
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {['7.5% Reservation Scholarship', 'Post Matric Scholarship (SC / ST / SCC)', 'BC / MBC / DNC Scholarships', 'Minority Scholarship', 'AICTE Fee Waiver Scheme', 'First Graduate Tuition Fee Concession'].map((item, i) => (
                                    <li key={i} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                                        <FaCheckCircle style={{ color: 'var(--secondary)', flexShrink: 0 }} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '32px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        >
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ background: 'var(--glass-highlight)', padding: '10px', borderRadius: '14px', color: 'var(--secondary)', display: 'flex' }}><FaGraduationCap /></span> Eligibility
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {['Meet eligibility criteria from authorities', 'Valid UMIS / Aadhaar Certificate', 'Income & Community Certificates', 'Satisfy academic performance requirements', 'Meet attendance criteria'].map((item, i) => (
                                    <li key={i} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                                        <FaCheckCircle style={{ color: 'var(--secondary)', flexShrink: 0 }} /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1e1b4b 100%)', padding: '4rem', borderRadius: '32px', marginTop: '4rem', color: 'white', position: 'relative', overflow: 'hidden', border: '1px solid var(--glass-border)' }}
                    >
                        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem', alignItems: 'center' }} className="nodal-grid">
                            <div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem' }}>Scholarship Nodal Officer</h3>
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.9, marginBottom: '2.5rem' }}>
                                    For assistance and clarification regarding scholarships, students may contact the Scholarship Section or reach out to our Nodal Officer through the Admissions office.
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                    <button onClick={() => setShowAdmissionForm(true)} className="btn btn-primary" style={{ background: 'white', color: 'var(--primary)', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: '800' }}>Contact Admissions</button>
                                    <a href="tel:+919342628013" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: '800', border: '1px solid rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>Call Nodal Officer</a>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '2px solid rgba(255,255,255,0.2)' }}>
                                    <FaUsers size={80} />
                                </div>
                            </div>
                        </div>
                    </motion.div> */}
                </div>
            </section>

            <main className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Featured Scholarships</h2>
                    <div style={{ height: '4px', flex: 1, background: 'var(--glass-border)', margin: '0 2rem', borderRadius: '2px', opacity: 0.3 }}></div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>
                        <div className="loader" style={{ border: '4px solid var(--glass-border)', borderTop: '4px solid var(--secondary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                        <p style={{ color: 'var(--text-muted)' }}>Loading scholarship listings...</p>
                    </div>
                ) : filteredScholarships.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--bg-card)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem' }}>No scholarships found in this category.</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Please try another filter or check back later.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
                        {filteredScholarships.map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -12, borderColor: 'var(--secondary)' }}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    padding: '3rem',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.8rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onClick={() => setSelectedScholarship(item)}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--secondary)' }} />
                                <span style={{ alignSelf: 'flex-start', background: 'var(--glass-highlight)', color: 'var(--secondary)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    {item.category}
                                </span>
                                <div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.6rem', lineHeight: '1.3' }}>{item.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '600' }}>Provided by {item.provider}</p>
                                </div>
                                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Grant Amount</div>
                                        <div style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '900' }}>{item.amount}</div>
                                    </div>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                                        <FaArrowRight />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <AnimatePresence>
                {selectedScholarship && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            style={{ background: 'var(--bg-card)', borderRadius: '32px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--glass-border)', position: 'relative', boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}
                        >
                            <button onClick={() => setSelectedScholarship(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--glass-highlight)', border: 'none', color: 'var(--text-main)', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                                <FaTimes size={20} />
                            </button>
                            <div style={{ padding: '4rem' }}>
                                <span style={{ background: 'var(--glass-highlight)', color: 'var(--secondary)', padding: '0.6rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'inline-block' }}>{selectedScholarship.category}</span>
                                <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem', lineHeight: '1.2' }}>{selectedScholarship.name}</h2>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>Facilitated by <strong style={{ color: 'var(--secondary)' }}>{selectedScholarship.provider}</strong></p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>
                                    <div style={{ background: 'var(--bg-section)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Total Benefit</div>
                                        <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)' }}>{selectedScholarship.amount}</div>
                                    </div>
                                    <div style={{ background: 'var(--bg-section)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Application Deadline</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <FaCalendarAlt size={24} style={{ opacity: 0.5 }} /> {formatDate(selectedScholarship.deadline)}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>Description</h3>
                                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{selectedScholarship.description}</p>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>Eligibility Criteria</h3>
                                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{selectedScholarship.eligibility}</p>
                                    </div>
                                </div>

                                <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '2rem' }}>
                                    {selectedScholarship.link && (
                                        <a href={selectedScholarship.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, padding: '1.2rem', fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                            Apply via Official Portal <FaExternalLinkAlt size={16} />
                                        </a>
                                    )}
                                    <button onClick={() => setShowAdmissionForm(true)} style={{ background: 'var(--glass-highlight)', color: 'var(--text-main)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.2rem 2rem', fontWeight: '700', cursor: 'pointer' }}>Inquiry</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @media (max-width: 768px) {
                    .nodal-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
                    .nodal-grid > div:last-child { order: -1; }
                    h2 { font-size: 2.22rem !important; }
                    main > div { flex-direction: column; align-items: flex-start !important; gap: 1.5rem; }
                    main > div > div:last-child { display: none; }
                }
            `}</style>
        </div>
    );
};

export default ScholarshipPage;
