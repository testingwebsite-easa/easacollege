import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaCalendarAlt, FaFileContract } from 'react-icons/fa';
import AdmissionForm from '../components/AdmissionForm';
import { useTheme } from '../context/ThemeContext';

const AicteEoaPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

    useEffect(() => {
        window.scrollTo(0, 0);
        const handleResize = () => setIsMobile(window.innerWidth < 800);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const eoaReports = [
        { year: "2025-2026", link: "src/assets/pdfs/aicte-eoa/eoa-report-2025-26.pdf" },
        { year: "2024-2025", link: "src/assets/pdfs/aicte-eoa/eoa-report-2024-2025.pdf" },
        { year: "2023-2024", link: "src/assets/pdfs/aicte-eoa/eoa-report-23-24.pdf" },
        { year: "2022-2023", link: "src/assets/pdfs/aicte-eoa/eoa-report-22-23.pdf" },
        { year: "2021-2022", link: "src/assets/pdfs/aicte-eoa/eoa-report-21-22.pdf" },
        { year: "2020-2021", link: "src/assets/pdfs/aicte-eoa/eoa-report-20-21.pdf" },
        { year: "2019-2020", link: "src/assets/pdfs/aicte-eoa/eoa-report-19-20.pdf" },
        { year: "2018-2019", link: "src/assets/pdfs/aicte-eoa/eoa-report-18-19.pdf" },
        { year: "2017-2018", link: "src/assets/pdfs/aicte-eoa/eoa-report-17-18.pdf" },
    ];

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const linkTextColor = isDark ? '#38BDF8' : '#1D4ED8';

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO 
                title="AICTE EOA Reports | EASA College" 
                description="Extension of Approval (EOA) reports from AICTE for EASA College of Engineering and Technology." 
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero 
                pageKey="aicte-eoa"
                defaultTitle="AICTE EOA"
                defaultSubtitle="Extension of Approval Reports (Academic Years)"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp" 
            />

            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: cardBg, 
                        borderRadius: '32px', 
                        padding: isMobile ? '2rem 1.5rem' : '3.5rem 3rem', 
                        border: cardBorder, 
                        boxShadow: cardShadow 
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                            color: linkTextColor,
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Statutory Approvals
                        </span>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '0.8rem', color: primaryTextColor }}>
                            AICTE Extension of Approval (EOA)
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '650px', margin: '0.6rem auto 0', fontSize: '1rem' }}>
                            Mandatory annual Extension of Approval letters issued by the All India Council for Technical Education (AICTE), New Delhi.
                        </p>
                    </div>

                    <div style={{ overflowX: 'auto', borderRadius: '18px', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.9)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff' }}>
                                    <th style={{ padding: '1.2rem 1.5rem', width: '100px', textAlign: 'center', fontWeight: '900', fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>S.No.</th>
                                    <th style={{ padding: '1.2rem 1.5rem', fontWeight: '900', fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Academic Year Report</th>
                                    <th style={{ padding: '1.2rem 1.5rem', textAlign: 'center', width: '160px', fontWeight: '900', fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eoaReports.map((report, index) => (
                                    <tr 
                                        key={index} 
                                        style={{ 
                                            background: index % 2 === 0 ? 'transparent' : isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(248, 250, 252, 0.7)',
                                            borderBottom: index === eoaReports.length - 1 ? 'none' : isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(226, 232, 240, 0.8)',
                                            transition: 'background 0.2s ease'
                                        }}
                                        className="eoa-table-row"
                                    >
                                        <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center', fontWeight: '800', color: primaryTextColor }}>
                                            <span style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                color: linkTextColor,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.88rem',
                                                fontWeight: '800'
                                            }}>
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.2rem 1.5rem' }}>
                                            <a 
                                                href={report.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                download={isMobile}
                                                style={{ 
                                                    display: 'inline-flex', 
                                                    alignItems: 'center', 
                                                    gap: '12px', 
                                                    color: primaryTextColor, 
                                                    textDecoration: 'none', 
                                                    fontWeight: '700',
                                                    fontSize: '1.02rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                className="eoa-link"
                                            >
                                                <div style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '10px',
                                                    background: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                                                    color: '#EF4444',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.1rem',
                                                    flexShrink: 0
                                                }}>
                                                    <FaFilePdf />
                                                </div>
                                                <span>EOA Report for Academic Year {report.year}</span>
                                            </a>
                                        </td>
                                        <td style={{ padding: '1.2rem 1.5rem', textAlign: 'center' }}>
                                            <a
                                                href={report.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={isMobile}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '50px',
                                                    background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                                    color: linkTextColor,
                                                    textDecoration: 'none',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '800',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                className="view-btn"
                                            >
                                                <FaDownload size={12} />
                                                <span>View PDF</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .eoa-table-row:hover {
                    background: ${isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(37, 99, 235, 0.06)'} !important;
                }
                .eoa-link:hover {
                    color: ${linkTextColor} !important;
                    transform: translateX(4px);
                }
                .view-btn:hover {
                    background: #2563EB !important;
                    color: #ffffff !important;
                }
            `}</style>
        </div>
    );
};

export default AicteEoaPage;
