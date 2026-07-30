import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaEnvelope, FaPhone, FaSearch, FaFilter, FaIdCard, FaLinkedin, FaGithub, FaTwitter, FaSpinner } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const AlumniSocial = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('All');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [alumniRes, deptRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/alumni`),
                    fetch(`${API_BASE_URL}/api/departments`)
                ]);
                const alumniData = await alumniRes.json();
                const deptData = await deptRes.json();
                
                setAlumni(alumniData);
                setDepartments(deptData);
            } catch (err) {
                console.error("Error fetching alumni social data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredAlumni = alumni.filter(person => {
        const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             person.batch.includes(searchTerm);
        const matchesDept = filterDept === 'All' || person.department === filterDept;
        return matchesSearch && matchesDept;
    });

    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
            <SEO title="Alumni Social" description="Connect with the global EASA Alumni network. Reconnect, share, and grow together." />
            <Navbar />

            <GlobalHero 
                pageKey="alumni-social"
                defaultTitle="Alumni Social Hub"
                defaultSubtitle="Discover and connect with your fellow graduates. Building a lifelong network of EASAians."
                defaultImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
            />

            <main className="container" style={{ padding: '4rem 2rem' }}>
                {/* Search & Filter Bar */}
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1.5rem', 
                    marginBottom: '4rem',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.5rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
                        <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                        <input 
                            type="text" 
                            placeholder="Search by name or batch year..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3.5rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '14px',
                                color: '#fff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaFilter style={{ color: '#F8D53D' }} />
                        <select 
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '14px',
                                color: '#fff',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="All">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                        <FaSpinner className="spin" size={40} />
                        <p style={{ marginTop: '1rem' }}>Bringing our community together...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        <AnimatePresence>
                            {filteredAlumni.map((person, index) => (
                                <motion.div
                                    key={person._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ y: -10 }}
                                    className="glass-card"
                                    style={{
                                        background: 'rgba(30, 41, 59, 0.5)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Batch Badge */}
                                    <div style={{ 
                                        position: 'absolute', 
                                        top: '1.2rem', 
                                        right: '1.2rem', 
                                        background: 'rgba(248, 213, 61, 0.15)', 
                                        color: '#F8D53D',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        zIndex: 2
                                    }}>
                                        Class of {person.batch.match(/20\d{2}/g)?.pop() || person.batch}
                                    </div>

                                    <div style={{ padding: '2.5rem 2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ 
                                                width: '80px', 
                                                height: '80px', 
                                                borderRadius: '50%', 
                                                border: '3px solid #F8D53D',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                <img 
                                                    src={person.photoUrl || "https://res.cloudinary.com/dzt6vksue/image/upload/v1/assets/profile-placeholder"} 
                                                    alt={person.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.2rem' }}>{person.name}</h3>
                                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: '500' }}>{person.department}</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                                <FaBriefcase style={{ color: '#F8D53D', opacity: 0.8 }} /> {person.currentJob || 'Alumni Member'}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                                <FaEnvelope style={{ color: '#F8D53D', opacity: 0.8 }} /> {person.email}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                                            <button 
                                                className="btn-link"
                                                style={{ flex: 1, padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                            >
                                                <FaIdCard size={14} /> View ID
                                            </button>
                                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                <a href="#" style={{ color: 'rgba(255,255,255,0.3)', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#F8D53D'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}><FaLinkedin size={18} /></a>
                                                <a href="#" style={{ color: 'rgba(255,255,255,0.3)', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#F8D53D'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}><FaTwitter size={18} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .btn-link:hover { background: rgba(248, 213, 61, 0.1) !important; color: #F8D53D !important; }
            `}</style>
        </div>
    );
};

export default AlumniSocial;
