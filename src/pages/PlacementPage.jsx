import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBriefcase, FaChartLine, FaHandshake, FaChalkboardTeacher,
    FaChartPie, FaIdBadge, FaCogs, FaQuoteLeft, FaImages, FaDownload,
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserTie,
    FaCheckCircle, FaStar, FaGlobe, FaRocket, FaFileAlt, FaCalendarCheck,
    FaChevronRight,
} from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const placementData = {
    name: "Training & Placement Cell",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2868&ixlib=rb-4.0.3",
    vision: "To become a center of excellence in grooming students into industry-ready professionals and providing them with the best career opportunities.",
    mission: [
        "To provide comprehensive training in soft skills and technical aptitude.",
        "To foster strong industry-academia linkages.",
        "To facilitate internships and placements in reputed organizations.",
        "To guide students in their career planning and development."
    ],
    overview: `The Training and Placement Cell at EASA College is dedicated to ensuring that every student gets the best possible start to their career. We act as a bridge between the industry and academia, facilitating a smooth transition for our students. Our comprehensive training programs, industry partnerships, and dedicated team work tirelessly to bring the best recruiters to campus. We focus not just on job placement, but on holistic career development, equipping our students with the skills, confidence, and knowledge required to excel in the global marketplace.`,
    stats: [
        { label: "Placement Percentage", value: "96%", icon: <FaCheckCircle /> },
        { label: "Highest Package", value: "12 LPA", icon: <FaRocket /> },
        { label: "Average Package", value: "4.5 LPA", icon: <FaChartLine /> },
        { label: "Recruiters", value: "150+", icon: <FaStar /> },
        { label: "Internships Offered", value: "500+", icon: <FaIdBadge /> }
    ],
    trainingPrograms: [
        { title: "Aptitude Training", desc: "Intensive sessions on quantitative aptitude, logical reasoning, and verbal ability." },
        { title: "Soft Skills Development", desc: "Workshops on communication, personality development, and interview etiquette." },
        { title: "Technical Bootcamps", desc: "Hands-on training in emerging technologies like AI, ML, Data Science, and Full Stack Development." },
        { title: "Mock Interviews", desc: "Simulated interview sessions with industry experts to build confidence." },
        { title: "Resume Building", desc: "Guidance on crafting professional resumes and LinkedIn profiles." }
    ],
    branchData: [
        { branch: "Computer Science", placed: "98%" },
        { branch: "Electronics & Comm.", placed: "95%" },
        { branch: "Mechanical", placed: "92%" },
        { branch: "Electrical & Electronics", placed: "94%" },
        { branch: "Information Technology", placed: "97%" },
        { branch: "MBA", placed: "99%" }
    ],
    internships: [
        { company: "Zoho Corporation", role: "Software Developer Intern", stipend: "₹15,000/mo", duration: "6 Months" },
        { company: "Roots Industries", role: "Graduate Engineer Trainee", stipend: "₹12,000/mo", duration: "3 Months" },
        { company: "L&T Construction", role: "Site Engineer Intern", stipend: "₹10,000/mo", duration: "4 Months" },
        { company: "Pricol", role: "Industrial Trainee", stipend: "₹8,000/mo", duration: "3 Months" },
        { company: "Cognizant", role: "Process Executive Intern", stipend: "₹18,000/mo", duration: "6 Months" }
    ],
    process: [
        { step: 1, title: "Registration", desc: "Students register with the placement cell." },
        { step: 2, title: "Training", desc: "Pre-placement training and assessments." },
        { step: 3, title: "Eligibility Check", desc: "Shortlisting based on academic and skill criteria." },
        { step: 4, title: "Pre-Placement Talk", desc: "Companies present their profiles and job roles." },
        { step: 5, title: "Selection Process", desc: "Aptitude tests, GDs, and Interviews." },
        { step: 6, title: "Offer Letter", desc: "Successful candidates receive offer letters." }
    ],
    testimonials: [
        { name: "Arjun K.", branch: "CSE", company: "Zoho", text: "The placement training at EASA was a game-changer. The mock interviews really helped me crack the actual one." },
        { name: "Priya S.", branch: "ECE", company: "Infosys", text: "I am grateful to the placement cell for their constant support and guidance. I landed my dream job!" },
        { name: "Rahul M.", branch: "Mech", company: "TVS", text: "The core industry connections EASA has are amazing. I got placed in a top manufacturing firm." }
    ],
    gallery: [
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000"
    ],
    downloads: [
        { title: "Placement Brochure 2025", size: "4.2 MB", type: "PDF" },
        { title: "Student Placement Policy", size: "1.5 MB", type: "PDF" },
        { title: "Recruitment Form for Companies", size: "850 KB", type: "DOCX" },
        { title: "Resume Format Template", size: "500 KB", type: "DOCX" }
    ],
    recruiters: [],
    contact: {
        name: "Mr. Placement Officer",
        designation: "Head - Training & Placement",
        email: "placement@easacollege.com",
        phone: "+91 98765 43210",
        address: "Placement Cell, Main Block"
    }
};

const PlacementPage = () => {
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [data, setData] = useState(placementData);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                // Fetch page content
                const pageRes = await fetch(`${API_BASE_URL}/api/placement-page`);
                if (pageRes.ok) {
                    const pageData = await pageRes.json();
                    if (pageData) {
                        setData(prev => ({ ...prev, ...pageData }));
                    }
                }

                // Fetch placement partners
                const partnersRes = await fetch(`${API_BASE_URL}/api/placement-partners`);
                if (partnersRes.ok) {
                    const partnersData = await partnersRes.json();
                    if (Array.isArray(partnersData)) {
                        setPartners(partnersData);
                        // Also update data.recruiters for the UI
                        setData(prev => ({ ...prev, recruiters: partnersData }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch placement data", error);
            }
        };
        fetchData();
    }, []);

    const sections = [
        { id: 'overview', label: 'Placement Overview', icon: <FaBriefcase /> },
        { id: 'statistics', label: 'Statistics', icon: <FaChartLine /> },
        { id: 'recruiters', label: 'Recruiters', icon: <FaHandshake /> },
        { id: 'training', label: 'Training Programs', icon: <FaChalkboardTeacher /> },
        { id: 'branchData', label: 'Branch-wise Data', icon: <FaChartPie /> },
        { id: 'internships', label: 'Internships', icon: <FaIdBadge /> },
        { id: 'process', label: 'Process Flow', icon: <FaCogs /> },
        { id: 'testimonials', label: 'Testimonials', icon: <FaQuoteLeft /> },
        { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
        { id: 'downloads', label: 'Downloads', icon: <FaDownload /> },
        { id: 'contact', label: 'Contact', icon: <FaPhone /> }
    ];

    const renderContent = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeSection === 'overview' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Overview</h2>
                            <div className="overview-hero">
                                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '3rem' }}>{data.overview}</p>

                                <div className="vision-mission-grid">
                                    <div style={{ padding: '2.5rem', background: 'var(--bg-section)', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}><FaGlobe /></div>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>Vision</h4>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{data.vision}</p>
                                    </div>
                                    <div style={{ padding: '2.5rem', background: 'var(--bg-section)', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}><FaRocket /></div>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>Mission</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                                            {data.mission.map((item, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', color: 'var(--text-muted)' }}>
                                                    <span style={{ minWidth: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '8px' }}></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'statistics' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Placement Statistics</h2>
                            <div className="stats-grid">
                                {data.stats.map((stat, idx) => (
                                    <div key={idx} className="stat-card">
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                            {typeof stat.icon === 'string' && FaIcons[stat.icon] ? React.createElement(FaIcons[stat.icon]) : stat.icon}
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: '700' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'recruiters' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Our Top Recruiters</h2>
                            <div className="overview-hero">
                                <div className="recruiters-grid">
                                    {data.recruiters.map((recruiter, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            style={{ 
                                                background: 'var(--bg-card)', 
                                                borderRadius: '18px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                height: '120px', 
                                                padding: '20px', 
                                                border: '1px solid var(--glass-border)',
                                                boxShadow: 'var(--card-shadow)'
                                            }}
                                        >
                                            {typeof recruiter === 'string' ? (
                                                <span style={{ color: 'var(--text-main)', fontWeight: '800', textAlign: 'center' }}>{recruiter}</span>
                                            ) : (
                                                recruiter.logo ? (
                                                    <img 
                                                        src={recruiter.logo} 
                                                        alt={recruiter.name} 
                                                        style={{ 
                                                            maxWidth: '100%', 
                                                            maxHeight: '100%', 
                                                            objectFit: 'contain',
                                                            filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)',
                                                            opacity: theme === 'dark' ? 0.8 : 0.7
                                                        }} 
                                                    />
                                                ) : <span style={{ color: 'var(--text-main)', fontWeight: '800', textAlign: 'center' }}>{recruiter.name}</span>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'training' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Training Programs</h2>
                            <div className="training-grid">
                                {data.trainingPrograms.map((prog, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <div style={{ minWidth: '64px', height: '64px', background: 'var(--glass-highlight)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.8rem', border: '1px solid var(--glass-border)' }}>
                                            <FaChalkboardTeacher />
                                        </div>
                                        <div>
                                            <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.8rem' }}>{prog.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{prog.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'branchData' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Branch-wise Data</h2>
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '32px', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: 'var(--glass-highlight)' }}>
                                        <tr>
                                            <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', color: 'var(--secondary)' }}>Branch</th>
                                            <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', color: 'var(--secondary)' }}>Placement %</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...data.branchData].sort((a, b) => parseInt(b.placed) - parseInt(a.placed)).map((row, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                <td style={{ padding: '1.5rem 2rem', fontWeight: '700', color: 'var(--text-main)' }}>{row.branch}</td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                        <div style={{ flex: 1, maxWidth: '300px', height: '10px', background: 'var(--glass-highlight)', borderRadius: '5px', overflow: 'hidden' }}>
                                                            <div style={{ width: row.placed, height: '100%', background: 'var(--secondary)', boxShadow: '0 0 10px var(--secondary-glow)' }}></div>
                                                        </div>
                                                        <span style={{ fontWeight: '800', color: 'var(--text-main)' }}>{row.placed}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'internships' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Internship Opportunities</h2>
                            <div className="training-grid">
                                {data.internships.map((intern, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2.5rem', borderLeft: '6px solid var(--secondary)' }}>
                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '0.5rem' }}>{intern.role}</h3>
                                        <div style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{intern.company}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaHandshake /> {intern.stipend}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalendarCheck /> {intern.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'process' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Placement Process</h2>
                            <div className="overview-hero">
                                <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                                    <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)' }}></div>
                                    {data.process.map((step, idx) => (
                                        <div key={idx} style={{ position: 'relative', marginBottom: '3rem' }}>
                                            <div style={{ position: 'absolute', left: '-30px', top: '5px', width: '24px', height: '24px', background: 'var(--secondary)', borderRadius: '50%', border: '4px solid var(--bg-card)', zIndex: 2 }}></div>
                                            <div style={{ background: 'var(--bg-section)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--glass-border)' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Step {step.step}</span>
                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.8rem' }}>{step.title}</h4>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'testimonials' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Testimonials</h2>
                            <div className="training-grid">
                                {data.testimonials.map((testim, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2.5rem', position: 'relative' }}>
                                        <FaQuoteLeft style={{ position: 'absolute', top: '25px', right: '25px', fontSize: '3rem', color: 'var(--glass-highlight)', opacity: 0.2 }} />
                                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>"{testim.text}"</p>
                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                            <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--bg-dark)' }}>🎓</div>
                                            <div>
                                                <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '1.1rem' }}>{testim.name}</div>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: '700' }}>{testim.branch} • {testim.company}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'gallery' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Gallery</h2>
                            <div className="training-grid">
                                {data.gallery.map((img, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.8rem', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                                        <img src={img} alt="Placement" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '18px' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'downloads' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Downloads</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                                {data.downloads.map((file, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                            <div style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}><FaFileAlt /></div>
                                            <div>
                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.3rem' }}>{file.title}</h4>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{file.fileType} • {file.size}</div>
                                            </div>
                                        </div>
                                        <a
                                            href={file.fileUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ background: 'var(--secondary)', color: 'var(--bg-dark)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(230, 182, 39, 0.3)' }}
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <FaDownload />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'contact' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Contact Us</h2>
                            <div className="overview-hero contact-grid">
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '220px', height: '220px', borderRadius: '50%', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid var(--glass-border)', margin: '0 auto', overflow: 'hidden' }}>
                                        <FaUserTie style={{ fontSize: '6rem', color: 'var(--secondary)' }} />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '2rem' }}>{data.contact.name}</h3>
                                    <div style={{ fontSize: '1.1rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>{data.contact.designation}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-dark)', fontSize: '1.2rem' }}><FaEnvelope /></div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Email Us</div>
                                            <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{data.contact.email}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-dark)', fontSize: '1.2rem' }}><FaPhone /></div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Call Us</div>
                                            <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{data.contact.phone}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-dark)', fontSize: '1.2rem' }}><FaMapMarkerAlt /></div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Visit Us</div>
                                            <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700' }}>{data.contact.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="Top Engineering Placements: Top Recruiters & Highest Package"
                description="See why EASA College is a top choice for placements. Our students have been recruited by leading MNCs with impressive salary packages. View our placement statistics, top recruiters, and alumni success stories."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="placement"
                defaultTitle={data.name}
                defaultSubtitle="Bridging Academia and Industry for Professional Excellence"
                defaultImage={data.heroImage}
            />

            <div className="placement-container">
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Platform Menu</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    style={{
                                        textAlign: 'left', padding: '1rem 1.2rem', borderRadius: '12px',
                                        background: activeSection === section.id ? 'var(--secondary)' : 'transparent',
                                        border: 'none', color: activeSection === section.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        cursor: 'pointer', fontSize: '0.95rem', fontWeight: '700', transition: 'all 0.3s ease',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {section.icon}
                                        <span>{section.label}</span>
                                    </div>
                                    {activeSection === section.id && <FaChevronRight size={10} />}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main style={{ minHeight: '600px' }}>
                    {renderContent()}
                </main>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />


            <style>{`
                .placement-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 5rem 2rem;
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 4rem;
                }
                
                .overview-hero {
                    background: var(--bg-card);
                    border-radius: 32px;
                    padding: 3.5rem;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.05);
                }

                .vision-mission-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2.5rem;
                }

                .stats-grid {
                    display: flex;
                    gap: 2rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .stat-card {
                    flex: 1 1 300px;
                    max-width: 350px;
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 2.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .recruiters-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: 1.5rem;
                }

                .training-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 4rem;
                    align-items: center;
                }

                @media (max-width: 1024px) {
                    .placement-container { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; gap: 3rem !important; }
                    aside { position: sticky !important; top: 60px; z-index: 999; margin: 0 !important; width: 100% !important; }
                    aside > div { 
                        border-radius: 0 !important; 
                        margin: 0 !important;
                        width: 100vw !important;
                        margin-left: -1.5rem !important; /* Counteract container padding */
                        padding: 0.8rem 1rem !important;
                        background: rgba(15, 23, 42, 0.95) !important; /* Darker, more solid background */
                        backdrop-filter: blur(16px);
                        border-bottom: 1px solid var(--glass-border);
                        border-top: 1px solid var(--glass-border);
                        display: flex !important;
                        align-items: center;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    }
                    nav { 
                        flex-direction: row !important; 
                        overflow-x: auto !important; 
                        padding-bottom: 0 !important; 
                        gap: 0.8rem !important; 
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        display: flex !important;
                        flex-wrap: nowrap !important;
                        align-items: center;
                        -webkit-overflow-scrolling: touch;
                        width: 100%;
                    }
                    nav::-webkit-scrollbar { display: none; }
                    button { 
                        white-space: nowrap !important; 
                        background: transparent !important; /* Clean look */
                        border: 1px solid var(--glass-border) !important;
                        color: var(--text-muted) !important; 
                        padding: 0.5rem 1rem !important; 
                        border-radius: 50px !important; 
                        font-size: 0.85rem !important;
                        flex-shrink: 0;
                        transition: all 0.2s ease;
                    }
                    button[style*="var(--secondary)"] { /* Active State Override */
                         background: var(--secondary) !important;
                         color: var(--bg-dark) !important;
                         border-color: var(--secondary) !important;
                         font-weight: 700 !important;
                    }
                    
                    /* Hide non-essential elements in mobile nav to save space */
                    aside > div > div:first-child { display: none; } /* Hide "Platform Menu" title */
                    aside > div > div:last-child { display: none; } /* Hide social icons */

                    /* Grids collapse */
                    .vision-mission-grid, .training-grid { grid-template-columns: 1fr; }
                    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .recruiters-grid { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 1rem; }
                    .overview-hero { padding: 2rem; }
                }

                @media (max-width: 480px) {
                    .placement-container { padding: 0.5rem 0; width: 100vw; max-width: 100vw; }
                     aside > div { 
                        margin-left: -0.5rem !important; /* Adjusted for smaller padding */
                     }
                    .overview-hero { padding: 0.7rem; border-radius: 12px; }
                    
                    h2 { font-size: 2rem !important; }

                    .recruiters-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }

                    .vision-mission-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    /* Adjust contact circle size */
                    .contact-grid > div:first-child > div:first-child {
                        width: 160px !important;
                        height: 160px !important;
                    }
                    .contact-grid > div:first-child > div:first-child svg {
                        font-size: 4rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default PlacementPage;
