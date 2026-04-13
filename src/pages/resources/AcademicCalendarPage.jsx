import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import missionBg from '../../assets/mission-bg.png';
import AdmissionForm from '../../components/AdmissionForm';
import AdmissionCTA from '../../components/AdmissionCTA';
import { FaEye, FaDownload, FaFilePdf } from 'react-icons/fa';

const AcademicCalendarPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    const title = "Academic Calendar";
    const subtitle = "Schedule of exams, holidays, and important academic events.";

    // Calendar Data 
    const calendarData = [
        {
            year: '2025-2026',
            semester: 'Even',
            description: 'Academic Calendar for Even Semester 2025-26',
            fileUrl: '/pdfs/academic-calendar-2025-26-even.pdf'
        },
    ];

    return (
        <div className="resource-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <div style={{
                position: 'relative', height: '40vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg-section)', paddingTop: '80px',
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url(${missionBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5, zIndex: 0 }} />
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '1000px' }}>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px', textShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>{title}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', maxWidth: '700px', margin: '0 auto', fontWeight: '300' }}>{subtitle}</p>
                </motion.div>
            </div>

            <section className="container" style={{ padding: '4rem 2rem', flex: 1, position: 'relative', zIndex: 10 }}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card"
                    style={{ padding: '2rem', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', overflowX: 'auto' }}
                >
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Academic Year</th>
                                <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Semester</th>
                                <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Description</th>
                                <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendarData.map((item, index) => (
                                <tr key={index} style={{ borderBottom: index !== calendarData.length - 1 ? '1px solid var(--border-color)' : 'none', transition: 'background 0.3s' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{item.year}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: item.semester === 'Odd' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            color: item.semester === 'Odd' ? '#3b82f6' : '#10b981',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600'
                                        }}>
                                            {item.semester}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaFilePdf style={{ color: '#ef4444' }} /> {item.description}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                            <a
                                                href={item.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View PDF"
                                                style={{
                                                    color: 'var(--text-main)',
                                                    fontSize: '1.2rem',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    borderRadius: '50%',
                                                    background: 'var(--bg-card)',
                                                    transition: 'all 0.2s',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                                            >
                                                <FaEye />
                                            </a>
                                            <a
                                                href={item.fileUrl}
                                                download
                                                title="Download PDF"
                                                style={{
                                                    color: 'var(--text-main)',
                                                    fontSize: '1.2rem',
                                                    cursor: 'pointer',
                                                    padding: '0.5rem',
                                                    borderRadius: '50%',
                                                    background: 'var(--bg-card)',
                                                    transition: 'all 0.2s',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                                            >
                                                <FaDownload />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {calendarData.length === 0 && (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <p>No academic calendars currently available.</p>
                        </div>
                    )}
                </motion.div>

            </section>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default AcademicCalendarPage;
