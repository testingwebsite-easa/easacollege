import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBriefcase, FaChartLine, FaHandshake, FaChalkboardTeacher,
    FaChartPie, FaIdBadge, FaCogs, FaQuoteLeft, FaImages, FaDownload,
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserTie,
    FaCheckCircle, FaStar, FaGlobe, FaRocket, FaFileAlt, FaCalendarCheck,
    FaChevronRight,
    FaCertificate, FaLaptopCode, FaTools, FaLightbulb
} from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const skillingData = {
    name: "Center for Skilling & Development",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    vision: "To empower students with cutting-edge industry skills and vocational training, bridging the gap between academic knowledge and industrial application.",
    mission: [
        "To provide hands-on training in emerging technologies and industrial tools.",
        "To offer value-added courses and certifications from global leaders.",
        "To enhance employability through soft skills and personality development.",
        "To foster a culture of lifelong learning and professional excellence."
    ],
    overview: `The Center for Skilling & Development at EASA College is a dedicated hub for nurturing the professional capabilities of our students. We go beyond the curriculum to offer a wide range of value-added courses, vocational training, and industry-recognized certifications. Our programs are designed in collaboration with industry partners to ensure relevance and practicality. From technical skills like coding, robotics, and automation to essential soft skills, we ensure our students are future-ready and capable of adapting to the dynamic demands of the global workforce.`,
    stats: [
        { label: "Students Trained", value: "2000+", icon: <FaUserTie /> },
        { label: "Courses Offered", value: "30+", icon: <FaChalkboardTeacher /> },
        { label: "Certifications Issued", value: "1500+", icon: <FaCertificate /> },
        { label: "Training Partners", value: "25+", icon: <FaHandshake /> },
        { label: "Placement Support", value: "100%", icon: <FaCheckCircle /> }
    ],
    partners: [
        "AWS", "Google Cloud", "Microsoft", "Cisco", "Oracle", "Red Hat", "Salesforce", "IBM",
        "Siemens", "Bosch", "Texas Instruments", "National Instruments", "Autodesk", "Unity"
    ],
    trainingPrograms: [
        { title: "Full Stack Development", desc: "Comprehensive training in MERN stack, covering frontend and backend technologies.", icon: "FaLaptopCode" },
        { title: "Data Science & AI", desc: "Practical sessions on Python, Machine Learning algorithms, and Data Analytics.", icon: "FaBrain" },
        { title: "IoT & Robotics", desc: "Hands-on workshops on Arduino, Raspberry Pi, and industrial automation systems.", icon: "FaRobot" },
        { title: "CAD/CAM/CAE", desc: "Advanced training in design and analysis software like AutoCAD, SolidWorks, and ANSYS.", icon: "FaTools" },
        { title: "Communication Skills", desc: "Intensive training to enhance verbal and written communication for the corporate world.", icon: "FaComments" },
        { title: "Cloud Computing", desc: "Certification courses on AWS, Azure, and Google Cloud platforms.", icon: "FaCloud" }
    ],
    certifications: [
        { title: "CCNA Networking", provider: "Cisco", duration: "3 Months", level: "Intermediate" },
        { title: "AWS Certified Practitioner", provider: "AWS", duration: "2 Months", level: "Beginner" },
        { title: "Java SE 8 Programmer", provider: "Oracle", duration: "4 Months", level: "Advanced" },
        { title: "AutoCAD Certified User", provider: "Autodesk", duration: "2 Months", level: "Beginner" },
        { title: "Google Data Analytics", provider: "Google", duration: "6 Months", level: "Beginner" }
    ],
    process: [
        { step: 1, title: "Needs Analysis", desc: "Identifying skill gaps and industry requirements." },
        { step: 2, title: "Course Selection", desc: "Students choose relevant value-added courses." },
        { step: 3, title: "Training Delivery", desc: "Expert-led sessions with practical exposure." },
        { step: 4, title: "Assessment", desc: "Evaluate learning through projects and tests." },
        { step: 5, title: "Certification", desc: "Awarding certificates upon successful completion." },
        { step: 6, title: "Career Support", desc: "Connecting skilled students with opportunities." }
    ],
    testimonials: [
        { name: "Sneha R.", branch: "CSE", course: "Full Stack Dev", text: "The full stack course gave me the confidence to build my own projects. The hands-on approach was excellent." },
        { name: "Karthik M.", branch: "Mech", course: "AutoCAD", text: "Learning AutoCAD through the skilling center helped me secure a design internship. Highly recommended!" },
        { name: "Anjali P.", branch: "ECE", course: "IoT", text: "The IoT workshop was an eye-opener. We worked with real sensors and built a smart home prototype." }
    ],
    gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
    ],
    downloads: [
        { title: "Skill Development Brochure", size: "3.5 MB", type: "PDF" },
        { title: "Course Catalog 2025", size: "2.1 MB", type: "PDF" },
        { title: "Certification Guidelines", size: "1.2 MB", type: "PDF" }
    ],
    contact: {
        name: "Dr. Skill Coordinator",
        designation: "Head - Skilling & Development",
        email: "skilling@easacollege.com",
        phone: "+91 98765 43211",
        address: "Skill Center, Tech Block, EASA College of Engineering & Technology, Coimbatore."
    }
};

const SkillingPage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [data, setData] = useState(skillingData);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Optional: Fetch data from API if needed in future
        // const fetchData = async () => { ... };
        // fetchData();
    }, []);

    const sections = [
        { id: 'overview', label: 'Overview', icon: <FaBriefcase /> },
        { id: 'statistics', label: 'Key Metrics', icon: <FaChartLine /> },
        { id: 'partners', label: 'Skill Partners', icon: <FaHandshake /> },
        { id: 'programs', label: 'Training Programs', icon: <FaChalkboardTeacher /> },
        { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> },
        { id: 'process', label: 'Process Flow', icon: <FaCogs /> },
        { id: 'testimonials', label: 'Student Stories', icon: <FaQuoteLeft /> },
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
                                    <div className="card-box" style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}><FaGlobe /></div>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>Vision</h4>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{data.vision}</p>
                                    </div>
                                    <div className="card-box" style={{ textAlign: 'center' }}>
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
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Key Metrics</h2>
                            <div className="stats-grid">
                                {data.stats.map((stat, idx) => (
                                    <div key={idx} className="stat-card">
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                            {stat.icon}
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: '700' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'partners' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Our Skill Partners</h2>
                            <div className="overview-hero">
                                <div className="partners-grid">
                                    {data.partners.map((partner, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            style={{ background: 'var(--bg-section)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', padding: '15px', border: '1px solid var(--glass-border)' }}
                                        >
                                            <span style={{ color: 'var(--text-main)', fontWeight: '800', textAlign: 'center' }}>{partner}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'programs' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Training Programs</h2>
                            <div className="training-grid">
                                {data.trainingPrograms.map((prog, idx) => (
                                    <div key={idx} className="card-box" style={{ background: 'var(--bg-card)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
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

                    {activeSection === 'certifications' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Certifications</h2>
                            <div className="training-grid">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx} className="card-box" style={{ background: 'var(--bg-card)', borderLeft: '6px solid var(--secondary)' }}>
                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '0.5rem' }}>{cert.title}</h3>
                                        <div style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{cert.provider}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCheckCircle /> {cert.level}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalendarCheck /> {cert.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'process' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Skilling Process</h2>
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
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Student Stories</h2>
                            <div className="training-grid">
                                {data.testimonials.map((testim, idx) => (
                                    <div key={idx} className="card-box" style={{ background: 'var(--bg-card)', position: 'relative' }}>
                                        <FaQuoteLeft style={{ position: 'absolute', top: '25px', right: '25px', fontSize: '3rem', color: 'var(--glass-highlight)', opacity: 0.2 }} />
                                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>"{testim.text}"</p>
                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                                            <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--bg-dark)' }}>🎓</div>
                                            <div>
                                                <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '1.1rem' }}>{testim.name}</div>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: '700' }}>{testim.branch} • {testim.course}</div>
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
                                        <img src={img} alt="Skilling" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '18px' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'downloads' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Downloads</h2>
                            <div className="downloads-grid">
                                {data.downloads.map((file, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                            <div style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}><FaFileAlt /></div>
                                            <div>
                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.3rem' }}>{file.title}</h4>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{file.type} • {file.size}</div>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
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
            <SEO title="Skilling & Development | EASA College" description="Center for Skilling & Development at EASA College - Empowering students with industry-ready skills." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="skilling"
                defaultTitle={data.name}
                defaultSubtitle="Empowering Minds with Industry-Ready Skills"
                defaultImage={data.heroImage}
            />

            <div className="skilling-container">
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Menu Navigation</div>
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
                .skilling-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 5rem 2rem;
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 4rem;
                    width: 100%;
                    box-sizing: border-box;
                }
                
                .overview-hero {
                    background: var(--bg-card);
                    border-radius: 32px;
                    padding: 3.5rem;
                    border: 1px solid var(--glass-border);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.05);
                    width: 100%;
                    box-sizing: border-box;
                }

                @media (max-width: 1024px) {
                    .skilling-container { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; gap: 3rem !important; }
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
                    aside > div > div:first-child { display: none; } /* Hide "Menu Navigation" title */
                    aside > div > div:last-child { display: none; } /* Hide social icons */

                    main { width: 100%; box-sizing: border-box; }
                    /* Collapse grids */
                    .vision-mission-grid, .training-grid, .downloads-grid { grid-template-columns: 1fr; }
                    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .partners-grid { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 1rem; }
                    .overview-hero { padding: 2rem; }
                }

                @media (max-width: 480px) {
                    .skilling-container { padding: 0.5rem 0; width: 100vw; max-width: 100vw; }
                     aside > div { 
                        margin-left: -0.5rem !important; /* Adjusted for smaller padding */
                     }
                    .overview-hero { padding: 0.7rem; border-radius: 12px; }
                    .card-box, .stat-card { padding: 1.5rem; }
                    h2 { font-size: 2rem !important; }
                    /* Adjust contact circle size */
                    .contact-grid > div:first-child > div:first-child { width: 160px !important; height: 160px !important; }
                    .contact-grid > div:first-child > div:first-child svg { font-size: 4rem !important; }
                }

                /* Make images responsive */
                img { max-width: 100%; height: auto; display: block; }

                /* Prevent card overflow */
                .card-box, .stat-card { min-width: 0; word-break: break-word; }

                /* Horizontal scroll for stats on very small screens */
                @media (max-width: 600px) {
                    .stats-grid { flex-wrap: nowrap; overflow-x: auto; gap: 1rem; }
                    .stat-card { min-width: 220px; max-width: 260px; flex: 0 0 220px; }
                }

                .card-box {
                    padding: 2.5rem;
                    background: var(--bg-section);
                    border-radius: 24px;
                    border: 1px solid var(--glass-border);
                    transition: all 0.3s ease;
                    width: 100%;
                    box-sizing: border-box;
                }

                .vision-mission-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2.5rem;
                    width: 100%;
                }

                .stats-grid {
                    display: flex;
                    gap: 2rem;
                    flex-wrap: wrap;
                    justify-content: center;
                    width: 100%;
                    box-sizing: border-box;
                    overflow-x: auto;
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
                    min-width: 0;
                    box-sizing: border-box;
                }

                .partners-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: 1.5rem;
                    width: 100%;
                }

                .training-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    width: 100%;
                }
                
                .downloads-grid {
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
                    gap: 2rem;
                    width: 100%;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 4rem;
                    align-items: center;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default SkillingPage;
