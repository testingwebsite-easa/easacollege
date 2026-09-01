import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBookOpen, FaSearch, FaFilter, FaFilePdf,
    FaGraduationCap, FaDownload, FaLaptopCode, FaMicrochip,
    FaCogs, FaBolt, FaHeartbeat, FaSeedling, FaCheckCircle,
    FaCalendarAlt, FaLayerGroup, FaUniversity
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';
import { Link } from 'react-router-dom';

const sampleCourses = [
    // CSE
    { code: "CS3401", title: "Algorithms & Complex Data Structures", dept: "CSE", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. S. Ramasamy" },
    { code: "CS3491", title: "Artificial Intelligence and Machine Learning", dept: "CSE", sem: 4, type: "Professional Core", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. V. Deepa" },
    { code: "CS3492", title: "Database Management Systems & NoSQL", dept: "CSE", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Mr. R. Karthik" },
    { code: "CS3451", title: "Full-Stack Web Development Laboratory", dept: "CSE", sem: 4, type: "Employability Enhancement", ltpc: "0-0-4-2", credits: 2, faculty: "Ms. P. Gayathri" },
    { code: "CS3601", title: "Cloud Architecture and DevOps Engineering", dept: "CSE", sem: 6, type: "Professional Elective", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. M. Soundararajan" },
    { code: "CS3602", title: "Cyber Security & Cryptographic Protocols", dept: "CSE", sem: 6, type: "Professional Elective", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. S. Ramasamy" },

    // AI&DS
    { code: "AD3401", title: "Deep Neural Networks and Architectures", dept: "AI&DS", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. P. Manoharan" },
    { code: "AD3402", title: "Computer Vision & Pattern Recognition", dept: "AI&DS", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. R. Kavitha" },
    { code: "AD3403", title: "Big Data Lakehouses and Stream Processing", dept: "AI&DS", sem: 4, type: "Professional Core", ltpc: "3-0-0-3", credits: 3, faculty: "Mr. T. Dinesh" },
    { code: "AD3601", title: "Natural Language Processing and Generative AI", dept: "AI&DS", sem: 6, type: "Professional Elective", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. P. Manoharan" },

    // MECH
    { code: "ME3401", title: "Theory of Machines and Kinematics", dept: "MECH", sem: 4, type: "Professional Core", ltpc: "3-1-0-4", credits: 4, faculty: "Dr. K. Arulmurugan" },
    { code: "ME3402", title: "Thermal Engineering and Heat Transfer", dept: "MECH", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. P. Selvakumar" },
    { code: "ME3403", title: "Computer Aided Design & Manufacturing (CAD/CAM)", dept: "MECH", sem: 4, type: "Professional Core", ltpc: "2-0-4-4", credits: 4, faculty: "Mr. N. Ramesh" },
    { code: "ME3601", title: "Industrial Robotics and Automation (AICTE IDEA)", dept: "MECH", sem: 6, type: "Professional Elective", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. K. Arulmurugan" },

    // ECE
    { code: "EC3401", title: "VLSI Design & Hardware Description Languages", dept: "ECE", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. N. Saravanan" },
    { code: "EC3402", title: "Microprocessors, Microcontrollers & Embedded C", dept: "ECE", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. K. Revathi" },
    { code: "EC3403", title: "Electromagnetic Fields & Wave Propagation", dept: "ECE", sem: 4, type: "Professional Core", ltpc: "3-1-0-4", credits: 4, faculty: "Mr. M. Anand" },
    { code: "EC3601", title: "Wireless Cellular Communications & 5G MIMO", dept: "ECE", sem: 6, type: "Professional Elective", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. N. Saravanan" },

    // EEE
    { code: "EE3401", title: "Power Electronics and Electric Drives", dept: "EEE", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. M. Vijayakumar" },
    { code: "EE3402", title: "Electric Vehicle (EV) Powertrain & BMS", dept: "EEE", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. A. Sundar" },
    { code: "EE3403", title: "Linear Control Systems & Simulation", dept: "EEE", sem: 4, type: "Professional Core", ltpc: "3-1-0-4", credits: 4, faculty: "Mr. C. Mohan" },

    // BME
    { code: "BM3401", title: "Biomedical Instrumentation & Bio-Sensors", dept: "BME", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. R. Anuradha" },
    { code: "BM3402", title: "Diagnostic Medical Imaging Systems (CT/MRI)", dept: "BME", sem: 4, type: "Professional Core", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. G. Pavithra" },
    { code: "BM3403", title: "Physiological Modeling & Bio-Signal Processing", dept: "BME", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Mr. S. Santhosh" },

    // Agri
    { code: "AG3401", title: "Farm Machinery, Tractors & Automation", dept: "Agri", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Dr. S. Thilagavathi" },
    { code: "AG3402", title: "Soil and Water Conservation Engineering", dept: "Agri", sem: 4, type: "Professional Core", ltpc: "3-0-0-3", credits: 3, faculty: "Dr. R. Senthamil" },
    { code: "AG3403", title: "Precision Agriculture Technologies and IoT", dept: "Agri", sem: 4, type: "Professional Core", ltpc: "3-0-2-4", credits: 4, faculty: "Mr. K. Vetrivel" }
];

const departments = [
    { id: "ALL", name: "All Departments" },
    { id: "CSE", name: "Computer Science" },
    { id: "AI&DS", name: "AI & Data Science" },
    { id: "MECH", name: "Mechanical" },
    { id: "ECE", name: "Electronics & Comm" },
    { id: "EEE", name: "Electrical & Elect" },
    { id: "BME", name: "Biomedical" },
    { id: "Agri", name: "Agriculture" }
];

const CoursesRegisteredPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [selectedDept, setSelectedDept] = useState('ALL');
    const [selectedSem, setSelectedSem] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const filteredCourses = sampleCourses.filter(c => {
        const matchesDept = selectedDept === 'ALL' || c.dept === selectedDept;
        const matchesSem = selectedSem === 'ALL' || c.sem.toString() === selectedSem;
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              c.faculty.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDept && matchesSem && matchesSearch;
    });

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="Courses Registered (Curriculum Preview) | EASA College"
                description="Preview semester course registrations, course codes, L-T-P-C credits, and syllabus outlines across all engineering disciplines at EASA College."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="courses-registered"
                defaultTitle="Courses Registered (Curriculum Preview)"
                defaultSubtitle="Active Autonomous Course Schemes, L-T-P-C Credits, and Faculty Coordinators."
                defaultImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
            />

            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* SEARCH AND FILTER BAR */}
                <div style={{
                    background: cardBg,
                    borderRadius: '24px',
                    border: cardBorder,
                    padding: '2rem',
                    boxShadow: cardShadow,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', alignItems: 'center' }}>
                        {/* SEARCH INPUT */}
                        <div style={{ position: 'relative' }}>
                            <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: secondaryTextColor }} />
                            <input
                                type="text"
                                placeholder="Search by course code, title, or faculty name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 3rem',
                                    borderRadius: '50px',
                                    border: cardBorder,
                                    background: isDark ? 'var(--bg-section)' : '#F8FAFC',
                                    color: primaryTextColor,
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                        </div>

                        {/* SEMESTER SELECTOR */}
                        <select
                            value={selectedSem}
                            onChange={(e) => setSelectedSem(e.target.value)}
                            style={{
                                padding: '0.85rem 1.5rem',
                                borderRadius: '50px',
                                border: cardBorder,
                                background: isDark ? 'var(--bg-section)' : '#F8FAFC',
                                color: primaryTextColor,
                                outline: 'none',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="ALL">All Semesters</option>
                            <option value="4">Semester 04 (Even)</option>
                            <option value="6">Semester 06 (Even)</option>
                        </select>
                    </div>

                    {/* DEPARTMENT FILTER PILLS */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {departments.map((dept) => {
                            const isSel = selectedDept === dept.id;
                            return (
                                <button
                                    key={dept.id}
                                    onClick={() => setSelectedDept(dept.id)}
                                    style={{
                                        padding: '0.55rem 1.2rem',
                                        borderRadius: '50px',
                                        border: isSel ? `1px solid ${accentColor}` : cardBorder,
                                        background: isSel ? 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)' : 'transparent',
                                        color: isSel ? '#ffffff' : secondaryTextColor,
                                        fontWeight: '800',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {dept.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* COURSES TABLE */}
                <div style={{
                    background: cardBg,
                    borderRadius: '24px',
                    border: cardBorder,
                    boxShadow: cardShadow,
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '1.8rem 2rem', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>
                                Active Registered Courses ({filteredCourses.length})
                            </h3>
                            <span style={{ fontSize: '0.85rem', color: secondaryTextColor }}>
                                Autonomous Curriculum Scheme (CBCS 2024 Regulations)
                            </span>
                        </div>
                        <Link
                            to="/resources/syllabus-curriculum"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '50px',
                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                color: accentColor,
                                textDecoration: 'none',
                                fontWeight: '800',
                                fontSize: '0.85rem'
                            }}
                        >
                            <span>Download Full Syllabus</span>
                            <FaDownload size={11} />
                        </Link>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)', color: '#ffffff' }}>
                                    <th style={{ padding: '1.1rem 1.5rem', fontWeight: '900', fontSize: '0.88rem', textTransform: 'uppercase', width: '120px' }}>Course Code</th>
                                    <th style={{ padding: '1.1rem 1.5rem', fontWeight: '900', fontSize: '0.88rem', textTransform: 'uppercase' }}>Course Title</th>
                                    <th style={{ padding: '1.1rem 1.5rem', fontWeight: '900', fontSize: '0.88rem', textTransform: 'uppercase', width: '100px' }}>Dept / Sem</th>
                                    <th style={{ padding: '1.1rem 1.5rem', fontWeight: '900', fontSize: '0.88rem', textTransform: 'uppercase', width: '180px' }}>Category</th>
                                    <th style={{ padding: '1.1rem 1.5rem', fontWeight: '900', fontSize: '0.88rem', textTransform: 'uppercase', textAlign: 'center', width: '110px' }}>L-T-P-C</th>
                                    <th style={{ padding: '1.1rem 1.5rem', fontWeight: '900', fontSize: '0.88rem', textTransform: 'uppercase', width: '180px' }}>Faculty In-Charge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map((c, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            background: index % 2 === 0 ? 'transparent' : isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(248, 250, 252, 0.7)',
                                            borderBottom: index === filteredCourses.length - 1 ? 'none' : isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(226, 232, 240, 0.8)'
                                        }}
                                    >
                                        <td style={{ padding: '1.1rem 1.5rem', fontWeight: '800', color: accentColor }}>
                                            {c.code}
                                        </td>
                                        <td style={{ padding: '1.1rem 1.5rem', fontWeight: '700', color: primaryTextColor }}>
                                            {c.title}
                                        </td>
                                        <td style={{ padding: '1.1rem 1.5rem', color: secondaryTextColor, fontWeight: '700' }}>
                                            {c.dept} / S{c.sem}
                                        </td>
                                        <td style={{ padding: '1.1rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.3rem 0.7rem',
                                                borderRadius: '50px',
                                                background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#EFF6FF',
                                                color: accentColor,
                                                fontSize: '0.78rem',
                                                fontWeight: '800'
                                            }}>
                                                {c.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.1rem 1.5rem', textAlign: 'center', fontWeight: '800', color: isDark ? '#FBBF24' : '#D97706' }}>
                                            {c.ltpc} ({c.credits}C)
                                        </td>
                                        <td style={{ padding: '1.1rem 1.5rem', color: primaryTextColor, fontWeight: '600', fontSize: '0.9rem' }}>
                                            {c.faculty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default CoursesRegisteredPage;
