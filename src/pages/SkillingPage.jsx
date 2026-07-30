import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBriefcase, FaChartLine, FaHandshake, FaChalkboardTeacher,
    FaChartPie, FaIdBadge, FaCogs, FaQuoteLeft, FaImages, FaDownload,
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserTie,
    FaCheckCircle, FaStar, FaGlobe, FaRocket, FaFileAlt, FaCalendarCheck,
    FaChevronRight, FaCertificate, FaLaptopCode, FaTools, FaLightbulb,
    FaMicrochip, FaCode, FaCloud, FaRobot, FaBrain, FaBuilding, FaCheckDouble
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
    vision: "To empower students with cutting-edge industry skills, vocational training, and global certifications, bridging the gap between academic knowledge and industrial application.",
    mission: [
        "To provide hands-on training in emerging technologies, coding, and industrial automation tools.",
        "To offer value-added courses and internationally recognized certifications from global leaders.",
        "To enhance employability through communication skills, aptitude, and professional etiquette.",
        "To foster a culture of innovation, lifelong learning, and professional excellence."
    ],
    overviewParagraphs: [
        "The Center for Skilling & Development at EASA College of Engineering and Technology is a dedicated hub for nurturing the technical and professional capabilities of our students. We go beyond the conventional university curriculum to offer a comprehensive range of value-added courses, vocational training, and industry-recognized certifications.",
        "Our programmes are developed in active collaboration with leading industrial partners to ensure direct relevance to current technological trends. From core technical skills like Full Stack Development, Data Science, AI, Robotics, and IoT to essential soft skills and aptitude training, we prepare our students to become confident, industry-ready professionals.",
        "Through practical hands-on laboratories, real-world mini projects, expert guest lectures, and continuous mentoring, the Skilling Center equips students to adapt seamlessly to the dynamic demands of the global corporate landscape."
    ],
    stats: [
        { label: "Students Trained", value: "2500+", icon: <FaUserTie /> },
        { label: "Skill Courses Offered", value: "35+", icon: <FaChalkboardTeacher /> },
        { label: "Certifications Issued", value: "1800+", icon: <FaCertificate /> },
        { label: "Training Partners & MoUs", value: "30+", icon: <FaHandshake /> },
        { label: "Practical Exposure", value: "100%", icon: <FaCheckCircle /> }
    ],
    partners: [
        { name: "AWS Academy", category: "Cloud Computing" },
        { name: "Google Cloud", category: "Cloud & Data" },
        { name: "Microsoft", category: "Software & Cloud" },
        { name: "Cisco Networking Academy", category: "Networking & Security" },
        { name: "Oracle Academy", category: "Database & Java" },
        { name: "Red Hat", category: "Linux & DevOps" },
        { name: "Salesforce", category: "CRM & Cloud" },
        { name: "IBM SkillsBuild", category: "AI & Emerging Tech" },
        { name: "Siemens", category: "Industrial Automation" },
        { name: "Bosch", category: "Automotive & Electronics" },
        { name: "Texas Instruments", category: "Embedded Systems" },
        { name: "National Instruments", category: "LabVIEW & Testing" },
        { name: "Autodesk", category: "CAD / CAM Design" },
        { name: "Unity", category: "AR/VR & Game Dev" },
        { name: "Festo", category: "Pneumatics & Automation" }
    ],
    trainingPrograms: [
        {
            title: "Full Stack Development & Web Tech",
            subtitle: "Frontend, Backend & Database Architecture",
            desc: "Comprehensive hands-on training in modern MERN stack (MongoDB, Express, React, Node.js), HTML5, CSS3, JavaScript (ES6+), and Version Control (Git/GitHub).",
            icon: <FaLaptopCode />,
            skills: ["React.js", "Node.js & Express", "MongoDB & SQL", "RESTful APIs", "Git & GitHub"]
        },
        {
            title: "Data Science, AI & Machine Learning",
            subtitle: "Data Analytics, Python & Predictive Modeling",
            desc: "Practical modules covering Python programming, Pandas, NumPy, Scikit-Learn, data visualization, machine learning models, and introductory Deep Learning.",
            icon: <FaBrain />,
            skills: ["Python Programming", "Data Visualization", "Supervised/Unsupervised ML", "Neural Networks", "Data Wrangling"]
        },
        {
            title: "Embedded Systems & IoT Training",
            subtitle: "Smart Hardware, Sensors & Microcontrollers",
            desc: "Specialized training in Embedded C programming, Microcontrollers (8051, PIC, ARM), Arduino, Raspberry Pi, sensor integration, and cloud-based IoT solutions.",
            icon: <FaMicrochip />,
            skills: ["Embedded C", "Arduino & Raspberry Pi", "Sensor Interfacing", "Wireless Protocols (MQTT/BLE)", "IoT Cloud Integration"]
        },
        {
            title: "CAD / CAM / CAE Design & Modeling",
            subtitle: "Computer-Aided Engineering & 3D Modeling",
            desc: "Advanced mechanical design and simulation training using AutoCAD, SolidWorks, ANSYS, and Creo for product design, stress analysis, and manufacturing workflows.",
            icon: <FaTools />,
            skills: ["2D Drafting (AutoCAD)", "3D Parametric Modeling", "FEA Analysis (ANSYS)", "SolidWorks", "Product Lifecycle Management"]
        },
        {
            title: "Communication & Soft Skills Training",
            subtitle: "Professional Etiquette & Corporate Readiness",
            desc: "Intensive modules focused on verbal and written communication, public speaking, group discussions, business correspondence, interview preparation, and teamwork.",
            icon: <FaUserTie />,
            skills: ["Verbal & Written English", "Presentation Skills", "Group Discussion Techniques", "HR Mock Interviews", "Workplace Ethics"]
        },
        {
            title: "Cloud Computing & Cyber Security",
            subtitle: "AWS, Azure & Network Security Fundamentals",
            desc: "Fundamentals of cloud architecture, virtualization, AWS services (EC2, S3, IAM), network security protocols, ethical hacking concepts, and threat analysis.",
            icon: <FaCloud />,
            skills: ["AWS Cloud Architecture", "Virtualization & Containers", "Network Security Protocols", "Identity Management", "Cyber Hygiene"]
        }
    ],
    certifications: [
        { title: "AWS Certified Solutions Architect / Practitioner", provider: "AWS Academy", duration: "2–3 Months", level: "Beginner – Intermediate" },
        { title: "CCNA Network Associate", provider: "Cisco Networking Academy", duration: "3 Months", level: "Intermediate" },
        { title: "Java SE & Database Certified Specialist", provider: "Oracle Academy", duration: "3 Months", level: "Intermediate – Advanced" },
        { title: "AutoCAD & SolidWorks Certified Professional", provider: "Autodesk / Dassault Systems", duration: "2 Months", level: "Beginner – Intermediate" },
        { title: "Google Data Analytics Professional", provider: "Google", duration: "4 Months", level: "Beginner – Intermediate" },
        { title: "Embedded Systems & IoT Specialist", provider: "Texas Instruments / EASA Center", duration: "3 Months", level: "Intermediate" }
    ],
    process: [
        { step: 1, title: "Skill Needs Analysis & Registration", desc: "Diagnostic evaluation to identify individual skill gaps and career aspirational paths." },
        { step: 2, title: "Course Selection & Enrollment", desc: "Students select relevant value-added courses aligned with industry demands." },
        { step: 3, title: "Hands-on Training & Project Labs", desc: "Expert-led practical sessions, lab workshops, and mini project building." },
        { step: 4, title: "Assessment & Capstone Project", desc: "Evaluating learning outcomes through practical coding tests, quizzes, and live capstones." },
        { step: 5, title: "Certification & Badge Awarding", desc: "Earning globally recognized certifications and verified digital badges upon completion." },
        { step: 6, title: "Placement & Internship Integration", desc: "Connecting certified students directly with campus recruitment drives and internship slots." }
    ],
    testimonials: [
        { name: "Sneha R.", branch: "CSE", course: "Full Stack Development", text: "The Full Stack Web Development course at EASA Skilling Center gave me complete confidence to build real projects. The hands-on coding approach directly helped me crack my campus interview." },
        { name: "Karthik M.", branch: "Mechanical", course: "AutoCAD & SolidWorks", text: "Learning parametric 3D modeling and ANSYS at the skilling center enabled me to secure a core design internship. The trainers were extremely supportive." },
        { name: "Anjali P.", branch: "ECE", course: "IoT & Embedded Systems", text: "The IoT workshop was a fantastic experience. Working with microcontrollers, sensors, and cloud dashboards prepared me thoroughly for core electronics roles." }
    ],
    gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
    ],
    downloads: [
        { title: "Skill Development Brochure 2025-26", size: "3.5 MB", fileType: "PDF" },
        { title: "Value-Added Course Catalog", size: "2.1 MB", fileType: "PDF" },
        { title: "Certification Guidelines & Policies", size: "1.2 MB", fileType: "PDF" },
        { title: "Student Skill Registration Form", size: "650 KB", fileType: "DOCX" }
    ],
    contact: {
        name: "Head - Skilling & Development",
        designation: "Center for Skilling & Professional Development",
        email: "skilling@easacollege.com",
        phone: "+91 93426 28013",
        address: "Skill Center, Tech Block, EASA College of Engineering & Technology, Coimbatore."
    }
};

const SkillingPage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [data, setData] = useState(skillingData);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'overview', label: 'Overview', icon: <FaBriefcase /> },
        { id: 'statistics', label: 'Key Metrics', icon: <FaChartLine /> },
        { id: 'programs', label: 'Training Programs', icon: <FaChalkboardTeacher /> },
        { id: 'partners', label: 'Skill Partners', icon: <FaHandshake /> },
        { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> },
        { id: 'process', label: 'Process Flow', icon: <FaCogs /> },
        { id: 'testimonials', label: 'Student Stories', icon: <FaQuoteLeft /> },
        { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
        { id: 'downloads', label: 'Downloads', icon: <FaDownload /> },
        { id: 'contact', label: 'Contact Us', icon: <FaPhone /> }
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
                    {/* 1. Overview */}
                    {activeSection === 'overview' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Overview</h2>
                            <div className="overview-hero">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                    {data.overviewParagraphs.map((para, idx) => (
                                        <p key={idx} style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                                            {para}
                                        </p>
                                    ))}
                                </div>

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

                    {/* 2. Key Metrics */}
                    {activeSection === 'statistics' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Key Metrics & Highlights</h2>
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

                    {/* 3. Training Programs */}
                    {activeSection === 'programs' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Training Programs & Skill Courses</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                    Comprehensive hands-on training modules designed by industry experts to equip students with practical competencies.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {data.trainingPrograms.map((prog, idx) => (
                                    <div key={idx} className="card-box" style={{ background: 'var(--bg-card)', padding: '2.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.2rem' }}>
                                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--glass-highlight)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.8rem', flexShrink: 0 }}>
                                                {prog.icon}
                                            </div>
                                            <div>
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.2rem' }}>{prog.title}</h3>
                                                <div style={{ color: 'var(--secondary)', fontSize: '0.92rem', fontWeight: '700' }}>{prog.subtitle}</div>
                                            </div>
                                        </div>

                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                                            {prog.desc}
                                        </p>

                                        {prog.skills && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                                {prog.skills.map((skill, sIdx) => (
                                                    <span key={sIdx} style={{ background: 'var(--bg-section)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.88rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <FaCheckCircle style={{ color: 'var(--secondary)' }} />
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 4. Skill Partners */}
                    {activeSection === 'partners' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Our Industry Skill Partners</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                    Collaborating with leading global corporations and academies to deliver certified, industry-aligned training.
                                </p>
                            </div>

                            <div className="overview-hero">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                    {data.partners.map((partner, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            style={{
                                                background: 'var(--bg-section)',
                                                borderRadius: '20px',
                                                padding: '1.5rem',
                                                border: '1px solid var(--glass-border)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                minHeight: '120px'
                                            }}
                                        >
                                            <span style={{ color: 'var(--text-main)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                                                {partner.name}
                                            </span>
                                            <span style={{ color: 'var(--secondary)', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {partner.category}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. Certifications */}
                    {activeSection === 'certifications' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Global & Industry Certifications</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                    Earn internationally recognized credentials to validate technical expertise and stand out during campus recruitment.
                                </p>
                            </div>

                            <div className="training-grid">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx} className="card-box" style={{ background: 'var(--bg-card)', borderLeft: '6px solid var(--secondary)' }}>
                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '0.5rem' }}>{cert.title}</h3>
                                        <div style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{cert.provider}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', flexWrap: 'wrap', gap: '10px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCheckCircle /> {cert.level}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaCalendarCheck /> {cert.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. Process Flow */}
                    {activeSection === 'process' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Skilling & Development Process</h2>
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

                    {/* 7. Student Testimonials */}
                    {activeSection === 'testimonials' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Student Stories & Impact</h2>
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

                    {/* 8. Gallery */}
                    {activeSection === 'gallery' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Skilling & Workshop Gallery</h2>
                            <div className="training-grid">
                                {data.gallery.map((img, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.8rem', borderRadius: '24px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                                        <img src={img} alt="Skilling" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '18px' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 9. Downloads */}
                    {activeSection === 'downloads' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Resources & Downloads</h2>
                            <div className="downloads-grid">
                                {data.downloads.map((file, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                            <div style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}><FaFileAlt /></div>
                                            <div>
                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.3rem' }}>{file.title}</h4>
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{file.fileType || 'PDF'} • {file.size}</div>
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

                    {/* 10. Contact */}
                    {activeSection === 'contact' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Contact Skilling Center</h2>
                            <div className="overview-hero contact-grid">
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '220px', height: '220px', borderRadius: '50%', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid var(--glass-border)', margin: '0 auto', overflow: 'hidden' }}>
                                        <FaUserTie style={{ fontSize: '6rem', color: 'var(--secondary)' }} />
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '2rem' }}>{data.contact.name}</h3>
                                    <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>{data.contact.designation}</div>
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
            <SEO title="Skilling & Development | EASA College" description="Center for Skilling & Development at EASA College - Empowering students with industry-ready skills, certifications, and hands-on technical training." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="skilling"
                defaultTitle={data.name}
                defaultSubtitle="Empowering Minds with Industry-Ready Skills & Certifications"
                defaultImage={data.heroImage}
            />

            <div className="skilling-container">
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Skilling Navigation</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    style={{
                                        textAlign: 'left', padding: '0.9rem 1.1rem', borderRadius: '12px',
                                        background: activeSection === section.id ? 'var(--secondary)' : 'transparent',
                                        border: 'none', color: activeSection === section.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        cursor: 'pointer', fontSize: '0.92rem', fontWeight: '700', transition: 'all 0.3s ease',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
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
                        margin-left: -1.5rem !important;
                        padding: 0.8rem 1rem !important;
                        background: rgba(15, 23, 42, 0.95) !important;
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
                        background: transparent !important;
                        border: 1px solid var(--glass-border) !important;
                        color: var(--text-muted) !important; 
                        padding: 0.5rem 1rem !important; 
                        border-radius: 50px !important; 
                        font-size: 0.85rem !important;
                        flex-shrink: 0;
                        transition: all 0.2s ease;
                    }
                    button[style*="var(--secondary)"] {
                         background: var(--secondary) !important;
                         color: var(--bg-dark) !important;
                         border-color: var(--secondary) !important;
                         font-weight: 700 !important;
                    }
                    
                    aside > div > div:first-child { display: none; }

                    main { width: 100%; box-sizing: border-box; }
                    .vision-mission-grid, .training-grid, .downloads-grid { grid-template-columns: 1fr; }
                    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .overview-hero { padding: 2rem; }
                }

                @media (max-width: 480px) {
                    .skilling-container { padding: 0.5rem 0; width: 100vw; max-width: 100vw; }
                    aside > div { 
                        margin-left: -0.5rem !important;
                    }
                    .overview-hero { padding: 1.2rem; border-radius: 16px; }
                    .card-box, .stat-card { padding: 1.5rem; }
                    h2 { font-size: 2rem !important; }
                    .contact-grid > div:first-child > div:first-child { width: 160px !important; height: 160px !important; }
                    .contact-grid > div:first-child > div:first-child svg { font-size: 4rem !important; }
                }

                img { max-width: 100%; height: auto; display: block; }
                .card-box, .stat-card { min-width: 0; word-break: break-word; }

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
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 2rem;
                    width: 100%;
                    box-sizing: border-box;
                }

                .stat-card {
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 2.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    min-width: 0;
                    box-sizing: border-box;
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
