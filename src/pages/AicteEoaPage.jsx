import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import AdmissionForm from '../components/AdmissionForm';

const AicteEoaPage = () => {
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

            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ 
                        background: 'var(--bg-card)', 
                        borderRadius: '32px', 
                        padding: '3rem', 
                        border: '1px solid var(--glass-border)', 
                        boxShadow: '0 20px 50px rgba(0,0,0,0.05)' 
                    }}
                >
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2.5rem', textAlign: 'center', color: 'var(--text-main)' }}>
                        AICTE Extension of Approval (EOA)
                    </h2>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
                            <thead>
                                <tr style={{ background: 'var(--secondary)', color: 'var(--primary)' }}>
                                    <th style={{ padding: '1.2rem', borderRadius: '12px 0 0 12px', textAlign: 'center' }}>S.NO</th>
                                    <th style={{ padding: '1.2rem', borderRadius: '0 12px 12px 0', textAlign: 'center' }}>AICTE EOA Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eoaReports.map((report, index) => (
                                    <tr key={index} style={{ background: 'rgba(var(--primary-rgb), 0.03)', transition: 'background 0.3s' }}>
                                        <td style={{ padding: '1.2rem', textAlign: 'center', fontWeight: '600', borderBottom: '1px solid var(--glass-border)' }}>
                                            {index + 1}.
                                        </td>
                                        <td style={{ padding: '1.2rem', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                                            <a 
                                                href={report.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                download={isMobile}
                                                style={{ 
                                                    display: 'inline-flex', 
                                                    alignItems: 'center', 
                                                    gap: '10px', 
                                                    color: 'var(--primary)', 
                                                    textDecoration: 'none', 
                                                    fontWeight: '500',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                                            >
                                                <FaFilePdf size={18} />
                                                EOA Report {report.year}
                                                {isMobile && <FaDownload size={14} style={{ opacity: 0.7 }} />}
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
        </div>
    );
};

export default AicteEoaPage;
