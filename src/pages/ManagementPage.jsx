import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import API_BASE_URL from '../api';
import ManagementSection from '../components/ManagementSection';
import { motion } from 'framer-motion';

const MemberSection = ({ category, id, title }) => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/management-team?category=${category}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setMember(data[0]);
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch ${category}:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchMember();
    }, [category]);

    if (loading) return null;

    return (
        <section id={id} style={{ padding: '5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ padding: '0 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-highlight" style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{title}</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--primary)', margin: '1rem auto' }}></div>
                </div>

                <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{
                            width: '250px',
                            height: '250px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginBottom: '2rem',
                            border: '5px solid #FFD700',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                        }}
                    >
                        <img
                            src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=250`}
                            alt={member.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=250`;
                            }}
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gradient"
                        style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
                    >
                        {member.name}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '2rem', textTransform: 'uppercase' }}
                    >
                        {member.designation}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        style={{
                            maxWidth: '900px',
                            textAlign: 'justify',
                            color: 'var(--text-muted)',
                            lineHeight: '1.8',
                            whiteSpace: 'pre-wrap',
                            fontSize: '1.1rem'
                        }}
                    >
                        {member.message}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


const ManagementPage = () => {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="management-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <PageHero
                title="Management Team"
                subtitle="The visionaries and leaders steering EASA College towards global excellence."
            />

            <div style={{ background: 'var(--bg-main)' }}>
                {/* Individual Message Sections */}
                <MemberSection category="founder" id="founder" title="Founder's Message" />
                <MemberSection category="chairperson" id="chairperson" title="Chairperson's Message" />
                <MemberSection category="secretary" id="secretary" title="Secretary's Message" />
                <MemberSection category="correspondent" id="correspondent" title="Correspondent's Message" />
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer />
        </div>
    );
};

export default ManagementPage;
