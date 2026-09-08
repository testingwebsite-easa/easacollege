import React from 'react';
import { motion } from 'framer-motion';
import {
    FaBrain, FaCheckCircle, FaAward, FaHandshake, FaFlask, FaRocket,
    FaCertificate, FaIndustry, FaUsers, FaLightbulb,
    FaStar, FaTools, FaFileAlt, FaExternalLinkAlt,
    FaGraduationCap, FaServer, FaBullseye, FaChartLine,
    FaQuoteLeft, FaUniversity, FaAtom, FaCheck
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';

const CenterOfExcellencePage = () => {
    const coeStats = [
        { label: "Dedicated Lab Facilities", value: "4+", icon: <FaFlask />, desc: "GPU clusters & big data sandboxes" },
        { label: "Core Thrust Domains", value: "3", icon: <FaBrain />, desc: "AI/ML, Advanced Analytics, Emerging Tech" },
        { label: "Industry Partners & MoUs", value: "15+", icon: <FaHandshake />, desc: "Global tech & analytics leaders" },
        { label: "Patents & Innovations", value: "10+", icon: <FaAward />, desc: "High-impact deep-tech breakthroughs" }
    ];

    const center = {
        id: 'coe-aimaa',
        code: 'CoE-AIMAA',
        title: 'Centre of Excellence in AI, ML & Advanced Analytics',
        tagline: '“Transforming Data into Intelligence, Innovation, and Impact.”',
        department: 'Department of AI & Data Science',
        subtitle: 'Empowering Next-Generation Intelligent Computing, Machine Learning & Advanced Analytics',
        category: 'computing',
        icon: <FaBrain />,
        color: '#6366f1',
        accent: 'rgba(99, 102, 241, 0.2)',
        image: '/images/coe-aimaa-bg.png',
        vision: 'To become a nationally recognized Centre of Excellence in Artificial Intelligence, Machine Learning and Advanced Analytics by fostering innovation, research, industry collaboration, and data-driven decision-making that empowers learners and organizations in the digital era.',
        mission: [
            'Provide world-class training in AI, Machine Learning, and Advanced Analytics.',
            'Promote research, innovation, and interdisciplinary collaboration in data-driven technologies.',
            'Bridge the gap between academia and industry through experiential learning and industry partnerships.',
            'Develop skilled professionals capable of solving real-world problems using AI and emerging technologies.',
            'Establish a culture of continuous improvement and ethical use of AI and data for societal and industrial impact.'
        ],
        objectives: [
            'Develop competency in AI, ML, and Advanced Analytics among students and faculty.',
            'Facilitate industry-oriented certification programmes, workshops, and internships.',
            'Promote research, innovation, patents, and publications in AI-driven technologies.',
            'Establish strong collaborations with industries, research organizations, and academic institutions.',
            'Provide consultancy and technical support in AI, ML, and advanced analytics.',
            'Encourage entrepreneurship and startup initiatives in AI-centric domains.',
            'Enhance employability through hands-on projects and experiential learning.',
            'Promote ethical and responsible use of AI in academic and industrial applications.'
        ],
        thrustAreas: [
            {
                title: 'Artificial Intelligence & ML',
                icon: <FaBrain />,
                color: '#38bdf8',
                accentBg: 'rgba(56, 189, 248, 0.12)',
                borderColor: 'rgba(56, 189, 248, 0.3)',
                topics: [
                    'Machine Learning Applications',
                    'Deep Learning',
                    'Generative AI',
                    'Intelligent Automation'
                ]
            },
            {
                title: 'Advanced Analytics',
                icon: <FaChartLine />,
                color: '#818cf8',
                accentBg: 'rgba(129, 140, 248, 0.12)',
                borderColor: 'rgba(129, 140, 248, 0.3)',
                topics: [
                    'Predictive Analytics',
                    'Business Intelligence',
                    'Data Visualization & Storytelling',
                    'Power BI / Tableau'
                ]
            },
            {
                title: 'Data & Emerging Tech',
                icon: <FaServer />,
                color: '#a855f7',
                accentBg: 'rgba(168, 85, 247, 0.12)',
                borderColor: 'rgba(168, 85, 247, 0.3)',
                topics: [
                    'Data Engineering & Governance',
                    'Big Data (Hadoop, Spark)',
                    'Cloud Data Platforms',
                    'Industry 5.0 & Smart Systems'
                ]
            }
        ],
        keyFeatures: [
            'Industry-aligned curriculum and certification programmes.',
            'Advanced AI, ML & Analytics laboratories.',
            'Industry-supported projects and internships.',
            'Research and innovation ecosystem in AI and advanced analytics.',
            'Hackathons, Datathons, and Innovation Challenges.',
            'Entrepreneurship and startup support initiatives.'
        ],
        expectedOutcomes: [
            {
                stakeholder: 'Students',
                icon: <FaGraduationCap />,
                color: '#38bdf8',
                points: [
                    'Enhanced technical skills',
                    'Certifications & internships',
                    'Better placements'
                ]
            },
            {
                stakeholder: 'Faculty',
                icon: <FaUsers />,
                color: '#a855f7',
                points: [
                    'Research publications & patents',
                    'Industry engagement',
                    'Collaborative research'
                ]
            },
            {
                stakeholder: 'Institution',
                icon: <FaAward />,
                color: '#f59e0b',
                points: [
                    'Strong industry partnerships',
                    'Improved rankings',
                    'Research funding'
                ]
            },
            {
                stakeholder: 'Industry',
                icon: <FaIndustry />,
                color: '#10b981',
                points: [
                    'Access to skilled graduates',
                    'Consultancy support',
                    'Joint innovation'
                ]
            }
        ],
        facilities: [
            { name: 'GPU Deep Learning Cluster', spec: 'NVIDIA RTX 4090 / A5000 Workstations with 128GB RAM' },
            { name: 'Vision Computing Testbed', spec: 'Intel RealSense 3D Depth Cameras, FLIR Thermal Sensors' },
            { name: 'Edge AI Development Kits', spec: 'NVIDIA Jetson AGX Orin, Jetson Nano, Raspberry Pi 5 AI Kits' },
            { name: 'Big Data Sandbox', spec: 'Hadoop/Spark Distributed Cluster for Large Scale Analytics' }
        ],
        projects: [
            { title: 'Autonomous Agricultural Crop Disease Detection', tag: 'Computer Vision', status: 'Published Patent' },
            { title: 'Predictive Energy Optimization for Smart Grids', tag: 'Deep Learning', status: 'Funded Research' },
            { title: 'Multilingual Indic Healthcare Chatbot Assistant', tag: 'Generative AI & NLP', status: 'Live Prototype' }
        ],
        certifications: ['AWS Certified Machine Learning Specialist', 'TensorFlow Developer Certificate', 'NVIDIA Deep Learning Institute (DLI)', 'Power BI / Tableau Data Analyst Associate'],
        leadFaculty: ['Ms. Gopika P', 'Mr. Krushnaa R'],
        leadDepartment: 'Department of AI & Data Science'
    };

    const industryPartners = [
        { name: 'NVIDIA Deep Learning Institute', focus: 'Accelerated Computing & AI Research', domain: 'Artificial Intelligence' },
        { name: 'AWS Academy', focus: 'Cloud, Machine Learning & MLOps', domain: 'Cloud & AI' },
        { name: 'IBM Academic Initiative', focus: 'Data Science & Enterprise AI Analytics', domain: 'Advanced Analytics' },
        { name: 'Google Cloud Education', focus: 'Big Data, TensorFlow & Vertex AI', domain: 'Cloud Data Platforms' },
        { name: 'Microsoft Learn', focus: 'Azure AI, Cognitive Services & Power BI', domain: 'Business Intelligence' },
        { name: 'Maxbite Technologies', focus: 'IoT, Industrial Analytics & Smart Systems', domain: 'Smart Systems' }
    ];

    return (
        <div className="coe-page" style={{
            backgroundColor: '#070b14',
            backgroundImage: `
                radial-gradient(at 15% 10%, rgba(56, 189, 248, 0.12) 0px, transparent 50%),
                radial-gradient(at 85% 20%, rgba(99, 102, 241, 0.14) 0px, transparent 50%),
                radial-gradient(at 50% 65%, rgba(168, 85, 247, 0.1) 0px, transparent 60%),
                radial-gradient(at 10% 90%, rgba(2, 132, 199, 0.08) 0px, transparent 50%)
            `,
            minHeight: '100vh',
            color: '#f8fafc'
        }}>
            <SEO
                title="CoE-AIMAA | Centre of Excellence in AI, ML & Advanced Analytics | EASA College"
                description="Explore EASA's Centre of Excellence in AI, ML & Advanced Analytics (CoE-AIMAA) under Department of AI, ML & Data Science. Transforming Data into Intelligence, Innovation, and Impact."
            />
            <Navbar />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="center-of-excellence"
                defaultTitle="Center of Excellence"
                defaultSubtitle="Centre of Excellence in AI, ML & Advanced Analytics (CoE-AIMAA)"
                title="Center of Excellence"
                subtitle="Centre of Excellence in AI, ML & Advanced Analytics (CoE-AIMAA)"
            />

            <div className="coe-wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>

                {/* 1. STATS METRICS GRID WITH 3D DEPTH */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }} className="perspective-container">
                        {coeStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="card-3d-subtle"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                                    padding: '2rem 1.8rem',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(56, 189, 248, 0.2)',
                                    backdropFilter: 'blur(12px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '14px',
                                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
                                    color: '#38bdf8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem',
                                    flexShrink: 0,
                                    border: '1px solid rgba(56, 189, 248, 0.4)',
                                    boxShadow: '0 8px 16px -4px rgba(56, 189, 248, 0.25)'
                                }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.1' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#38bdf8', marginTop: '0.2rem' }}>
                                        {stat.label}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                        {stat.desc}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 2. MAIN CoE-AIMAA SHOWCASE CARD */}
                <section style={{ marginBottom: '4.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="card-3d-subtle"
                        style={{
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
                            border: '1px solid rgba(99, 102, 241, 0.35)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)'
                        }}
                    >
                        {/* TOP HERO BANNER WITH THEMATIC AI NEURAL DATA BACKGROUND */}
                        <div style={{
                            position: 'relative',
                            minHeight: '340px',
                            background: `
                                linear-gradient(to right, rgba(7, 11, 20, 0.94) 0%, rgba(15, 23, 42, 0.82) 48%, rgba(15, 23, 42, 0.35) 100%),
                                url(${center.image})
                            `,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center right',
                            padding: '3.5rem 2.5rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            alignItems: 'center',
                            gap: '2.5rem',
                            borderBottom: '1px solid rgba(99, 102, 241, 0.3)'
                        }}>
                            <div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.2rem' }}>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
                                        color: '#ffffff',
                                        fontSize: '0.85rem',
                                        fontWeight: '800',
                                        padding: '0.45rem 1.1rem',
                                        borderRadius: '20px',
                                        width: 'fit-content',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                                    }}>
                                        {center.icon} {center.code}
                                    </div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        backdropFilter: 'blur(10px)',
                                        color: '#e2e8f0',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        padding: '0.45rem 1.1rem',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255, 255, 255, 0.15)'
                                    }}>
                                        <FaUniversity style={{ color: '#38bdf8' }} /> {center.department}
                                    </div>
                                </div>

                                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: '800', color: '#ffffff', marginBottom: '0.8rem', lineHeight: '1.25' }}>
                                    {center.title}
                                </h2>
                                
                                <div style={{
                                    fontStyle: 'italic',
                                    fontSize: '1.2rem',
                                    color: '#38bdf8',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    marginTop: '0.2rem',
                                    marginBottom: '0.8rem',
                                    textShadow: '0 2px 10px rgba(56, 189, 248, 0.3)'
                                }}>
                                    <FaQuoteLeft size={15} style={{ opacity: 0.9, color: '#818cf8' }} /> {center.tagline}
                                </div>

                                <p style={{ color: '#cbd5e1', fontSize: '1.02rem', maxWidth: '750px', margin: 0, lineHeight: '1.7' }}>
                                    {center.subtitle}
                                </p>
                            </div>

                            {/* OFFICIAL EMBEDDED LOGO */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        width: 'clamp(200px, 22vw, 260px)',
                                        height: 'clamp(200px, 22vw, 260px)',
                                        borderRadius: '50%',
                                        padding: '10px',
                                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.6) 0%, rgba(99, 102, 241, 0.6) 50%, rgba(168, 85, 247, 0.6) 100%)',
                                        boxShadow: '0 16px 40px -6px rgba(56, 189, 248, 0.4), 0 0 30px rgba(99, 102, 241, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img 
                                        src="/images/coe-aimaa-logo.png" 
                                        alt="CoE-AIMAA Official Logo" 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: '50%',
                                            background: '#ffffff',
                                            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* MAIN BODY */}
                        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            
                            {/* 1. VISION & MISSION CARDS */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '1.8rem'
                            }}>
                                {/* VISION */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                    borderLeft: '4px solid #38bdf8',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '8px',
                                            background: 'rgba(56, 189, 248, 0.15)',
                                            color: '#38bdf8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            border: '1px solid rgba(56, 189, 248, 0.3)'
                                        }}>
                                            <FaRocket />
                                        </div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                            Vision
                                        </h3>
                                    </div>
                                    <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.8', margin: 0 }}>
                                        {center.vision}
                                    </p>
                                </div>

                                {/* MISSION */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                    border: '1px solid rgba(168, 85, 247, 0.25)',
                                    borderLeft: '4px solid #a855f7',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '8px',
                                            background: 'rgba(168, 85, 247, 0.15)',
                                            color: '#a855f7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            border: '1px solid rgba(168, 85, 247, 0.3)'
                                        }}>
                                            <FaBullseye />
                                        </div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                            Mission
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {center.mission.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                                                <span style={{ color: '#a855f7', fontWeight: 'bold', marginTop: '0.1rem' }}>•</span>
                                                <span style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 2. THRUST AREAS */}
                            <div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        <FaAtom /> Core Technical Pillars
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', marginTop: '0.3rem', margin: 0 }}>
                                        Thrust Areas
                                    </h3>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem'
                                }}>
                                    {center.thrustAreas.map((area, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                                border: `1px solid ${area.borderColor}`,
                                                borderRadius: '16px',
                                                padding: '1.8rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 8px 24px -4px rgba(0,0,0,0.25)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
                                                <div style={{
                                                    width: '44px',
                                                    height: '44px',
                                                    borderRadius: '12px',
                                                    background: area.accentBg,
                                                    color: area.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.3rem',
                                                    border: `1px solid ${area.borderColor}`
                                                }}>
                                                    {area.icon}
                                                </div>
                                                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                                    {area.title}
                                                </h4>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                                {area.topics.map((topic, tIdx) => (
                                                    <div key={tIdx} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.6rem',
                                                        fontSize: '0.9rem',
                                                        color: '#cbd5e1',
                                                        background: 'rgba(255, 255, 255, 0.03)',
                                                        padding: '0.6rem 0.9rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                                    }}>
                                                        <FaCheck style={{ color: area.color, fontSize: '0.75rem', flexShrink: 0 }} />
                                                        <span>{topic}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 3. OBJECTIVES & KEY FEATURES (TWO COLUMNS) */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '2rem'
                            }}>
                                {/* OBJECTIVES */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.25)',
                                    borderRadius: '16px',
                                    padding: '2rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                                        <FaBullseye style={{ color: '#38bdf8', fontSize: '1.3rem' }} />
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                            Strategic Objectives
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {center.objectives.map((obj, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                                                <FaCheckCircle style={{ color: '#38bdf8', marginTop: '0.25rem', flexShrink: 0, fontSize: '0.9rem' }} />
                                                <span style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>{obj}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* KEY FEATURES */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                    border: '1px solid rgba(168, 85, 247, 0.25)',
                                    borderRadius: '16px',
                                    padding: '2rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                                        <FaStar style={{ color: '#a855f7', fontSize: '1.3rem' }} />
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                            Key Features
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                        {center.keyFeatures.map((feat, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.8rem',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255, 255, 255, 0.06)'
                                            }}>
                                                <span style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(168, 85, 247, 0.25)',
                                                    color: '#c084fc',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                    flexShrink: 0,
                                                    marginTop: '0.1rem',
                                                    border: '1px solid rgba(168, 85, 247, 0.4)'
                                                }}>
                                                    {idx + 1}
                                                </span>
                                                <span style={{ color: '#f1f5f9', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '500' }}>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 4. EXPECTED OUTCOMES MATRIX */}
                            <div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        <FaGraduationCap /> Value Delivery
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', marginTop: '0.3rem', margin: 0 }}>
                                        Expected Outcomes
                                    </h3>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                    gap: '1.4rem'
                                }}>
                                    {center.expectedOutcomes.map((outcome, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                                border: `1px solid ${outcome.color}35`,
                                                borderRadius: '16px',
                                                padding: '1.6rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                boxShadow: '0 8px 20px -4px rgba(0,0,0,0.25)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.1rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '10px',
                                                    background: `${outcome.color}20`,
                                                    color: outcome.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.2rem',
                                                    border: `1px solid ${outcome.color}40`
                                                }}>
                                                    {outcome.icon}
                                                </div>
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                                    {outcome.stakeholder}
                                                </h4>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {outcome.points.map((point, pIdx) => (
                                                    <div key={pIdx} style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '0.6rem',
                                                        fontSize: '0.88rem',
                                                        color: '#cbd5e1'
                                                    }}>
                                                        <span style={{ color: outcome.color, fontWeight: 'bold' }}>•</span>
                                                        <span>{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. LAB INFRASTRUCTURE & PROJECTS */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '2rem'
                            }}>
                                {/* FACILITIES & RIGS */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                    borderRadius: '16px',
                                    padding: '1.8rem'
                                }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <FaTools style={{ color: '#38bdf8' }} /> Laboratory Infrastructure
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                        {center.facilities.map((fac, idx) => (
                                            <div key={idx} style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                                padding: '0.9rem 1.1rem',
                                                borderRadius: '10px'
                                            }}>
                                                <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#ffffff' }}>
                                                    {fac.name}
                                                </div>
                                                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                                                    {fac.spec}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* RESEARCH PROJECTS & PATENTS */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                    border: '1px solid rgba(168, 85, 247, 0.25)',
                                    borderRadius: '16px',
                                    padding: '1.8rem'
                                }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <FaFlask style={{ color: '#a855f7' }} /> Flagship Innovations & Patents
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {center.projects.map((proj, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '1rem',
                                                padding: '0.7rem 0',
                                                borderBottom: idx === center.projects.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)'
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ffffff' }}>
                                                        {proj.title}
                                                    </div>
                                                    <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '700' }}>
                                                        {proj.tag}
                                                    </span>
                                                </div>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    padding: '0.25rem 0.6rem',
                                                    borderRadius: '12px',
                                                    background: 'rgba(56, 189, 248, 0.15)',
                                                    color: '#38bdf8',
                                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {proj.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CERTIFICATIONS & LEAD FACULTY STRIP */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '1.8rem',
                                alignItems: 'center'
                            }}>
                                {/* CERTIFICATIONS */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                    border: '1px solid rgba(56, 189, 248, 0.25)',
                                    borderRadius: '16px',
                                    padding: '1.6rem'
                                }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <FaCertificate style={{ color: '#38bdf8' }} /> Industry Certification Pathways
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {center.certifications.map((cert, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '0.82rem',
                                                fontWeight: '600',
                                                padding: '0.4rem 0.85rem',
                                                borderRadius: '20px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                                color: '#e2e8f0'
                                            }}>
                                                ✓ {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* FACULTY IN CHARGE */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                    border: '1px solid rgba(168, 85, 247, 0.25)',
                                    borderRadius: '16px',
                                    padding: '1.6rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.2rem'
                                }}>
                                    <div style={{
                                        width: '54px',
                                        height: '54px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.4rem',
                                        flexShrink: 0,
                                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)'
                                    }}>
                                        <FaUsers />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>
                                            Faculty Coordinators & Department
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem' }}>
                                            {Array.isArray(center.leadFaculty) ? (
                                                center.leadFaculty.map((name, idx) => (
                                                    <span key={idx} style={{
                                                        fontSize: '0.95rem',
                                                        fontWeight: '800',
                                                        color: '#ffffff',
                                                        background: 'rgba(255, 255, 255, 0.06)',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid rgba(168, 85, 247, 0.3)'
                                                    }}>
                                                        {name}
                                                    </span>
                                                ))
                                            ) : (
                                                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
                                                    {center.leadFaculty}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '600', marginTop: '0.35rem' }}>
                                            {center.leadDepartment}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </section>

                {/* 3. INDUSTRY COLLABORATIONS & MOU ECOSYSTEM */}
                <section style={{ marginBottom: '4.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            color: '#38bdf8',
                            fontWeight: '800',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem'
                        }}>
                            CORPORATE ALLIANCES
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: '#ffffff', marginTop: '0.5rem' }}>
                            Industry Alliances & Technology Ecosystem
                        </h2>
                        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0.6rem auto 0', fontSize: '0.95rem' }}>
                            CoE-AIMAA collaborates with leading industry technology providers to co-develop curricula, facilitate hackathons, and power advanced AI & Analytics research.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {industryPartners.map((partner, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                className="card-3d-subtle"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                    border: '1px solid rgba(56, 189, 248, 0.2)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
                                    color: '#38bdf8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.4rem',
                                    flexShrink: 0,
                                    border: '1px solid rgba(56, 189, 248, 0.3)'
                                }}>
                                    <FaIndustry />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {partner.domain}
                                    </span>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginTop: '0.2rem', marginBottom: '0.3rem' }}>
                                        {partner.name}
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                                        {partner.focus}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. CALL TO ACTION & INQUIRY BANNER */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="card-3d-subtle"
                    style={{
                        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.18) 0%, rgba(99, 102, 241, 0.18) 50%, rgba(15, 23, 42, 0.9) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        borderRadius: '24px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -10px rgba(2, 132, 199, 0.25)'
                    }}
                >
                    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.35rem 1rem',
                            borderRadius: '30px',
                            background: 'rgba(56, 189, 248, 0.2)',
                            color: '#38bdf8',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1rem',
                            border: '1px solid rgba(56, 189, 248, 0.4)'
                        }}>
                            <FaHandshake /> Partner with CoE-AIMAA
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: '#ffffff', marginBottom: '1rem' }}>
                            Ready to Collaborate, Innovate, or Tour CoE-AIMAA?
                        </h3>
                        <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                            Whether you are an industry partner seeking AI/analytics solutions, a student eager to embark on deep-tech innovation, or an academic researcher, CoE-AIMAA welcomes you.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <a
                                href="mailto:research@ecetonline.com?subject=Inquiry regarding CoE-AIMAA (AI, ML & Advanced Analytics)"
                                className="btn-3d"
                                style={{
                                    background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    boxShadow: '0 8px 20px -4px rgba(2, 132, 199, 0.5)'
                                }}
                            >
                                <FaFlask /> Inquire / Propose Project
                            </a>
                            <a
                                href="https://docs.google.com/document/d/1APC44Ed6-unX82A5RonU4qU54ykSuiF_exREfvrzJMg/edit?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            >
                                <FaFileAlt /> View Institutional MoUs <FaExternalLinkAlt size={12} />
                            </a>
                        </div>
                    </div>
                </motion.section>

            </div>

            <Footer />
        </div>
    );
};

export default CenterOfExcellencePage;
