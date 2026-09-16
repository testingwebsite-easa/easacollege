import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBrain, FaCheckCircle, FaAward, FaHandshake, FaFlask, FaRocket,
    FaCertificate, FaIndustry, FaUsers, FaLightbulb,
    FaStar, FaTools, FaFileAlt, FaExternalLinkAlt,
    FaGraduationCap, FaServer, FaBullseye, FaChartLine,
    FaQuoteLeft, FaUniversity, FaAtom, FaCheck,
    FaShieldAlt, FaLock, FaUserSecret, FaBug, FaNetworkWired,
    FaCodeBranch, FaLaptopCode
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';

const CenterOfExcellencePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCenter = searchParams.get('center') || 'cyber-shield';
    const [activeCenterId, setActiveCenterId] = useState(initialCenter);

    const coeStats = [
        { label: "Dedicated Lab Facilities", value: "8+", icon: <FaFlask />, desc: "GPU clusters, cyber ranges & forensics rigs" },
        { label: "Core Thrust Domains", value: "6", icon: <FaAtom />, desc: "AI/ML, Cyber Defence, Analytics & IoT Security" },
        { label: "Industry Partners & MoUs", value: "25+", icon: <FaHandshake />, desc: "Global tech & cybersecurity leaders" },
        { label: "Patents & Innovations", value: "18+", icon: <FaAward />, desc: "High-impact deep-tech & defence patents" }
    ];

    const centers = [
        {
            id: 'cyber-shield',
            code: 'Cyber Shield Hub',
            badgeCode: 'CoE-CSDD',
            shortTitle: 'Cyber Shield (Cyber Security)',
            title: 'Cyber Shield Innovation Hub',
            subtitle: 'Centre of Excellence in Cyber Security & Digital Defence',
            tagline: '“Securing the Digital Future through Innovation, Intelligence, and Resilience.”',
            department: 'Department of CSE (Cyber Security)',
            category: 'Cyber Security & Defence',
            icon: <FaShieldAlt />,
            color: '#10b981',
            accent: 'rgba(16, 185, 129, 0.2)',
            glowColor: 'rgba(16, 185, 129, 0.35)',
            gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #06b6d4 100%)',
            badgeGradient: 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)',
            themeBorder: 'rgba(16, 185, 129, 0.35)',
            themeLightBorder: 'rgba(16, 185, 129, 0.2)',
            themeText: '#34d399',
            image: '/images/coe-cyber-shield-bg.png',
            logo: '/images/coe-cyber-shield-logo.png',
            description: 'Empowering next-generation cyber defenders, threat hunters, ethical hackers, and digital forensic specialists to protect societal, industrial, and national digital infrastructures.',
            vision: 'To become a nationally recognized innovation hub in Cyber security and Digital Defence by fostering innovation, research, industry collaboration, and cyber-resilient practices that empower learners and organizations in the digital era.',
            mission: [
                'Provide world-class training in Cyber security, Ethical Hacking, and Digital Forensics.',
                'Promote research, innovation, and interdisciplinary collaboration in cyber defence and secure digital technologies.',
                'Bridge the gap between academia and industry through experiential learning, cyber labs, and industry partnerships.',
                'Develop skilled professionals capable of identifying, analysing, and mitigating real-world cyber threats using emerging security technologies.',
                'Establish a culture of continuous improvement, cyber awareness, and ethical practices for societal and industrial digital resilience.'
            ],
            objectives: [
                'Develop competency in cyber security, ethical hacking, digital forensics, and secure computing among students and faculty.',
                'Facilitate industry-oriented certification programmes, workshops, cyber security drills, and internships.',
                'Promote research, innovation, patents, and publications in cyber security and digital defence technologies.',
                'Establish strong collaborations with industries, cyber security organizations, research institutions, and academic partners.',
                'Provide consultancy and technical support in cyber security, vulnerability assessment, and digital risk management.',
                'Encourage entrepreneurship and start-up initiatives in cyber security and security technology domains.',
                'Enhance employability through hands-on projects, cyber ranges, simulations, and experiential learning.',
                'Promote ethical, responsible, and resilient cyber security practices in academic and industrial applications.'
            ],
            thrustAreas: [
                {
                    title: 'Cyber security & Ethical Hacking',
                    icon: <FaUserSecret />,
                    color: '#10b981',
                    accentBg: 'rgba(16, 185, 129, 0.12)',
                    borderColor: 'rgba(16, 185, 129, 0.35)',
                    topics: [
                        'Network & System Security',
                        'Ethical Hacking & Penetration Testing',
                        'Web & Application Security',
                        'Security Operations & Threat Hunting'
                    ]
                },
                {
                    title: 'Digital Forensics & Cyber Intelligence',
                    icon: <FaLock />,
                    color: '#06b6d4',
                    accentBg: 'rgba(6, 182, 212, 0.12)',
                    borderColor: 'rgba(6, 182, 212, 0.35)',
                    topics: [
                        'Digital & Mobile Forensics',
                        'Incident Response',
                        'Malware Analysis',
                        'Threat Intelligence & OSINT'
                    ]
                },
                {
                    title: 'Emerging Security Technologies',
                    icon: <FaServer />,
                    color: '#34d399',
                    accentBg: 'rgba(52, 211, 153, 0.12)',
                    borderColor: 'rgba(52, 211, 153, 0.35)',
                    topics: [
                        'Cloud & IOT Security',
                        'AI for Cyber security',
                        'Block chain Security',
                        'Industry 5.0 & Cyber-Physical Systems'
                    ]
                }
            ],
            keyFeatures: [
                'Industry-aligned cyber security curriculum and certification programmes.',
                'Advanced cyber security, ethical hacking & digital forensics laboratories.',
                'Industry-supported security projects, internships, and cyber defence challenges.',
                'Research and innovation ecosystem in cyber security and digital resilience.',
                'Capture the Flag (CTF), Hackathons, Cyber Drills, and Innovation Challenges.',
                'Entrepreneurship and start up support initiatives in security technologies.'
            ],
            expectedOutcomes: [
                {
                    stakeholder: 'Students',
                    icon: <FaGraduationCap />,
                    color: '#10b981',
                    points: [
                        'Enhanced cyber security skills',
                        'Certifications & internships',
                        'Better placements'
                    ]
                },
                {
                    stakeholder: 'Faculty',
                    icon: <FaUsers />,
                    color: '#06b6d4',
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
                        'Strong cyber industry partnerships',
                        'Improved rankings',
                        'Research funding'
                    ]
                },
                {
                    stakeholder: 'Industry',
                    icon: <FaIndustry />,
                    color: '#34d399',
                    points: [
                        'Access to skilled cyber professionals',
                        'Consultancy support',
                        'Joint innovation'
                    ]
                }
            ],
            facilities: [
                { name: 'Advanced Cyber Range & Threat Sandbox', spec: 'Multi-node Isolated Virtual Simulation Testbed, Kali Linux, Parrot Security & Active Defence Nodes' },
                { name: 'Digital Forensics & DFIR Investigation Lab', spec: 'Forensic Workstations equipped with FTK Imager, Autopsy, Ghidra Reverse Engineering & Volatility' },
                { name: 'Hardware Hacking & Wireless Security Rig', spec: 'HackRF One SDR, Proxmark3 RFID, Wi-Fi Pineapple, BadUSB & CAN Bus Penetration Kits' },
                { name: 'SOC & Cloud Security Operations Center', spec: 'SIEM/Wazuh XDR, Suricata IDS/IPS, Zeek Network Analyzers, AWS/Azure Security Sandboxes' }
            ],
            projects: [
                { title: 'AI-Driven Automated Real-Time Zero-Day Threat Mitigation', tag: 'AI & Cyber Defense', status: 'Patent Applied' },
                { title: 'Blockchain-Authenticated Forensic Digital Chain of Custody', tag: 'Digital Forensics', status: 'Funded Research' },
                { title: 'Annual EASA National CyberDrill & CTF Flagship Challenge', tag: 'Ethical Hacking', status: 'Annual Flagship' }
            ],
            certifications: [
                'Certified Ethical Hacker (CEH v12)',
                'CompTIA Security+ / CySA+',
                'Cisco Certified CyberOps Associate',
                'Offensive Security Certified Professional (OSCP)',
                'Palo Alto Networks Certified Cybersecurity Practitioner (PCCET)'
            ],
            leadFaculty: ['Dr. Sasikala P (HOD)', 'Cybersecurity Faculty & Research Team'],
            leadDepartment: 'Department of CSE (Cyber Security)',
            industryPartners: [
                { name: 'Cisco Networking Academy', focus: 'Cybersecurity Operations, Defense & Network Infrastructure', domain: 'Network Security' },
                { name: 'EC-Council Academia', focus: 'Ethical Hacking, Penetration Testing & DFIR Certification', domain: 'Ethical Hacking' },
                { name: 'Palo Alto Networks Academy', focus: 'Next-Gen Firewall, Cloud Security & SOC Automation', domain: 'Cloud & SOC' },
                { name: 'Fortinet Security Academy', focus: 'Network Security Expert (NSE) & Threat Protection', domain: 'Threat Defense' },
                { name: 'Quick Heal Academy', focus: 'Malware Analysis, Threat Intelligence & Digital Forensics', domain: 'Cyber Intelligence' },
                { name: 'Maxbite Technologies', focus: 'Industrial IoT Security & Cyber-Physical Protection', domain: 'IoT Security' }
            ]
        },
        {
            id: 'coe-aimaa',
            code: 'CoE-AIMAA',
            badgeCode: 'CoE-AIMAA',
            shortTitle: 'AI, ML & Advanced Analytics',
            title: 'Centre of Excellence in AI, ML & Advanced Analytics',
            subtitle: 'Empowering Next-Generation Intelligent Computing, Machine Learning & Advanced Analytics',
            tagline: '“Transforming Data into Intelligence, Innovation, and Impact.”',
            department: 'Department of AI & Data Science',
            category: 'AI & Data Science',
            icon: <FaBrain />,
            color: '#38bdf8',
            accent: 'rgba(56, 189, 248, 0.2)',
            glowColor: 'rgba(99, 102, 241, 0.35)',
            gradient: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
            badgeGradient: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
            themeBorder: 'rgba(99, 102, 241, 0.35)',
            themeLightBorder: 'rgba(56, 189, 248, 0.2)',
            themeText: '#38bdf8',
            image: '/images/coe-aimaa-bg.png',
            logo: '/images/coe-aimaa-logo.png',
            description: 'Fostering deep research, neural computing algorithms, business intelligence architectures, and big data sandboxes to empower digital revolution.',
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
                    borderColor: 'rgba(56, 189, 248, 0.35)',
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
                    borderColor: 'rgba(129, 140, 248, 0.35)',
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
                    borderColor: 'rgba(168, 85, 247, 0.35)',
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
            leadDepartment: 'Department of AI & Data Science',
            industryPartners: [
                { name: 'NVIDIA Deep Learning Institute', focus: 'Accelerated Computing & AI Research', domain: 'Artificial Intelligence' },
                { name: 'AWS Academy', focus: 'Cloud, Machine Learning & MLOps', domain: 'Cloud & AI' },
                { name: 'IBM Academic Initiative', focus: 'Data Science & Enterprise AI Analytics', domain: 'Advanced Analytics' },
                { name: 'Google Cloud Education', focus: 'Big Data, TensorFlow & Vertex AI', domain: 'Cloud Data Platforms' },
                { name: 'Microsoft Learn', focus: 'Azure AI, Cognitive Services & Power BI', domain: 'Business Intelligence' },
                { name: 'Maxbite Technologies', focus: 'IoT, Industrial Analytics & Smart Systems', domain: 'Smart Systems' }
            ]
        }
    ];

    // Find active center
    const activeCenter = centers.find(c => c.id === activeCenterId) || centers[0];

    const handleSelectCenter = (centerId) => {
        setActiveCenterId(centerId);
        setSearchParams({ center: centerId });
    };

    useEffect(() => {
        const param = searchParams.get('center');
        if (param && (param === 'cyber-shield' || param === 'coe-aimaa' || param === 'aimaa' || param === 'csdd')) {
            const mapped = (param === 'aimaa' || param === 'coe-aimaa') ? 'coe-aimaa' : 'cyber-shield';
            setActiveCenterId(mapped);
        }
    }, [searchParams]);

    return (
        <div className="coe-page" style={{
            backgroundColor: '#070b14',
            backgroundImage: `
                radial-gradient(at 15% 10%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
                radial-gradient(at 85% 20%, rgba(56, 189, 248, 0.12) 0px, transparent 50%),
                radial-gradient(at 50% 65%, rgba(99, 102, 241, 0.1) 0px, transparent 60%),
                radial-gradient(at 10% 90%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)
            `,
            minHeight: '100vh',
            color: '#f8fafc'
        }}>
            <SEO
                title={`${activeCenter.title} | Centers of Excellence | EASA College of Engineering and Technology`}
                description={`Explore EASA's Centers of Excellence: ${activeCenter.title} under ${activeCenter.department}. ${activeCenter.tagline}`}
            />
            <Navbar />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="center-of-excellence"
                defaultTitle="Centers of Excellence"
                defaultSubtitle="Next-Generation Innovation Hubs & Deep-Tech Research Centers"
                title="Centers of Excellence"
                subtitle="Next-Generation Innovation Hubs & Deep-Tech Research Centers"
            />

            <div className="coe-wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>

                {/* 1. INTERACTIVE COES SELECTION SWITCHER / TABS */}
                <section style={{ marginBottom: '3.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: activeCenter.themeText,
                            fontWeight: '800',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem'
                        }}>
                            <FaAtom /> ADVANCED RESEARCH HUBS
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: '900', color: '#ffffff', marginTop: '0.4rem' }}>
                            Select Center of Excellence
                        </h2>
                        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0.5rem auto 0', fontSize: '0.98rem' }}>
                            Explore our state-of-the-art specialized research, cyber defence, and artificial intelligence innovation hubs.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {centers.map((c) => {
                            const isSelected = c.id === activeCenter.id;
                            return (
                                <div
                                    key={c.id}
                                    onClick={() => handleSelectCenter(c.id)}
                                    style={{
                                        cursor: 'pointer',
                                        background: isSelected
                                            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)`
                                            : 'rgba(15, 23, 42, 0.6)',
                                        border: isSelected ? `2px solid ${c.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '20px',
                                        padding: '1.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.4rem',
                                        boxShadow: isSelected ? `0 10px 25px -5px ${c.glowColor}` : '0 4px 12px rgba(0, 0, 0, 0.2)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease'
                                    }}
                                >
                                    {isSelected && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '4px',
                                            background: c.gradient
                                        }} />
                                    )}

                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '16px',
                                        background: isSelected ? c.gradient : 'rgba(255, 255, 255, 0.05)',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.8rem',
                                        flexShrink: 0,
                                        boxShadow: isSelected ? `0 6px 16px -4px ${c.glowColor}` : 'none',
                                        border: '1px solid rgba(255, 255, 255, 0.15)'
                                    }}>
                                        {c.icon}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '12px',
                                                background: isSelected ? c.accent : 'rgba(255, 255, 255, 0.06)',
                                                color: isSelected ? c.color : '#94a3b8',
                                                border: `1px solid ${isSelected ? c.color : 'rgba(255, 255, 255, 0.1)'}`
                                            }}>
                                                {c.badgeCode}
                                            </span>
                                            {isSelected && (
                                                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                                    <FaCheckCircle /> Active Hub
                                                </span>
                                            )}
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0, lineHeight: '1.3' }}>
                                            {c.title}
                                        </h3>
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                            {c.department}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 2. STATS METRICS GRID */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {coeStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                                    padding: '2rem 1.8rem',
                                    borderRadius: '16px',
                                    border: `1px solid ${activeCenter.themeLightBorder}`,
                                    backdropFilter: 'blur(12px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.25s ease, border-color 0.25s ease'
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '14px',
                                    background: activeCenter.accent,
                                    color: activeCenter.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem',
                                    flexShrink: 0,
                                    border: `1px solid ${activeCenter.themeBorder}`,
                                    boxShadow: `0 8px 16px -4px ${activeCenter.glowColor}`
                                }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.1' }}>
                                        {stat.value}
                                    </div>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: activeCenter.color, marginTop: '0.2rem' }}>
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

                {/* 3. ACTIVE CENTER OF EXCELLENCE DEEP DIVE SHOWCASE */}
                <AnimatePresence mode="wait">
                    <motion.section
                        key={activeCenter.id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.45 }}
                        style={{ marginBottom: '4.5rem' }}
                    >
                        <div
                            style={{
                                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
                                border: `1px solid ${activeCenter.themeBorder}`,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: `0 20px 45px -10px ${activeCenter.glowColor}`
                            }}
                        >
                            {/* TOP HERO BANNER WITH THEMATIC IMAGE BACKGROUND */}
                            <div style={{
                                position: 'relative',
                                minHeight: '360px',
                                background: `
                                    linear-gradient(to right, rgba(7, 11, 20, 0.94) 0%, rgba(15, 23, 42, 0.85) 50%, rgba(15, 23, 42, 0.4) 100%),
                                    url(${activeCenter.image})
                                `,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center right',
                                padding: '3.5rem 2.5rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                alignItems: 'center',
                                gap: '2.5rem',
                                borderBottom: `1px solid ${activeCenter.themeBorder}`
                            }}>
                                <div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.2rem' }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            background: activeCenter.badgeGradient,
                                            color: '#ffffff',
                                            fontSize: '0.85rem',
                                            fontWeight: '800',
                                            padding: '0.45rem 1.1rem',
                                            borderRadius: '20px',
                                            width: 'fit-content',
                                            letterSpacing: '0.5px',
                                            boxShadow: `0 4px 14px ${activeCenter.glowColor}`
                                        }}>
                                            {activeCenter.icon} {activeCenter.code}
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
                                            <FaUniversity style={{ color: activeCenter.color }} /> {activeCenter.department}
                                        </div>
                                    </div>

                                    <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', fontWeight: '900', color: '#ffffff', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                                        {activeCenter.title}
                                    </h2>
                                    
                                    <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                                        {activeCenter.subtitle}
                                    </div>

                                    <div style={{
                                        fontStyle: 'italic',
                                        fontSize: '1.2rem',
                                        color: activeCenter.themeText,
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        marginTop: '0.2rem',
                                        marginBottom: '0.9rem',
                                        textShadow: `0 2px 10px ${activeCenter.glowColor}`
                                    }}>
                                        <FaQuoteLeft size={15} style={{ opacity: 0.9, color: activeCenter.color }} /> {activeCenter.tagline}
                                    </div>

                                    <p style={{ color: '#cbd5e1', fontSize: '1.02rem', maxWidth: '750px', margin: 0, lineHeight: '1.7' }}>
                                        {activeCenter.description}
                                    </p>
                                </div>

                                {/* OFFICIAL EMBEDDED LOGO */}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <motion.div
                                        key={activeCenter.id + '-logo'}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            width: 'clamp(200px, 22vw, 260px)',
                                            height: 'clamp(200px, 22vw, 260px)',
                                            borderRadius: '50%',
                                            padding: '8px',
                                            background: activeCenter.badgeGradient,
                                            boxShadow: `0 16px 40px -6px ${activeCenter.glowColor}, 0 0 30px ${activeCenter.glowColor}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img
                                            src={activeCenter.logo}
                                            alt={`${activeCenter.title} Official Logo`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '50%',
                                                background: '#071018',
                                                boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)'
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/easa_logo.png';
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
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderLeft: `4px solid ${activeCenter.color}`,
                                        borderRadius: '16px',
                                        padding: '2rem',
                                        boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                            <div style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '8px',
                                                background: activeCenter.accent,
                                                color: activeCenter.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem',
                                                border: `1px solid ${activeCenter.themeLightBorder}`
                                            }}>
                                                <FaRocket />
                                            </div>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                                Vision
                                            </h3>
                                        </div>
                                        <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.8', margin: 0 }}>
                                            {activeCenter.vision}
                                        </p>
                                    </div>

                                    {/* MISSION */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderLeft: `4px solid ${activeCenter.color}`,
                                        borderRadius: '16px',
                                        padding: '2rem',
                                        boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                            <div style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '8px',
                                                background: activeCenter.accent,
                                                color: activeCenter.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem',
                                                border: `1px solid ${activeCenter.themeLightBorder}`
                                            }}>
                                                <FaBullseye />
                                            </div>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                                Mission
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {activeCenter.mission.map((item, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                                                    <span style={{ color: activeCenter.color, fontWeight: 'bold', marginTop: '0.1rem' }}>•</span>
                                                    <span style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. THRUST AREAS */}
                                <div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: activeCenter.themeText, fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
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
                                        {activeCenter.thrustAreas.map((area, idx) => (
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
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderRadius: '16px',
                                        padding: '2rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                                            <FaBullseye style={{ color: activeCenter.color, fontSize: '1.3rem' }} />
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                                Strategic Objectives
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {activeCenter.objectives.map((obj, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                                                    <FaCheckCircle style={{ color: activeCenter.color, marginTop: '0.25rem', flexShrink: 0, fontSize: '0.9rem' }} />
                                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>{obj}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* KEY FEATURES */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderRadius: '16px',
                                        padding: '2rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem' }}>
                                            <FaStar style={{ color: activeCenter.color, fontSize: '1.3rem' }} />
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                                                Key Features
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                            {activeCenter.keyFeatures.map((feat, idx) => (
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
                                                        background: activeCenter.accent,
                                                        color: activeCenter.color,
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        flexShrink: 0,
                                                        marginTop: '0.1rem',
                                                        border: `1px solid ${activeCenter.themeLightBorder}`
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
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: activeCenter.themeText, fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
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
                                        {activeCenter.expectedOutcomes.map((outcome, idx) => (
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
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderRadius: '16px',
                                        padding: '1.8rem'
                                    }}>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <FaTools style={{ color: activeCenter.color }} /> Laboratory Infrastructure
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                            {activeCenter.facilities.map((fac, idx) => (
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
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderRadius: '16px',
                                        padding: '1.8rem'
                                    }}>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <FaFlask style={{ color: activeCenter.color }} /> Flagship Innovations & Patents
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {activeCenter.projects.map((proj, idx) => (
                                                <div key={idx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '1rem',
                                                    padding: '0.7rem 0',
                                                    borderBottom: idx === activeCenter.projects.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)'
                                                }}>
                                                    <div>
                                                        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ffffff' }}>
                                                            {proj.title}
                                                        </div>
                                                        <span style={{ fontSize: '0.78rem', color: activeCenter.color, fontWeight: '700' }}>
                                                            {proj.tag}
                                                        </span>
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: '700',
                                                        padding: '0.25rem 0.6rem',
                                                        borderRadius: '12px',
                                                        background: activeCenter.accent,
                                                        color: activeCenter.color,
                                                        border: `1px solid ${activeCenter.themeLightBorder}`,
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
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
                                        borderRadius: '16px',
                                        padding: '1.6rem'
                                    }}>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <FaCertificate style={{ color: activeCenter.color }} /> Industry Certification Pathways
                                        </h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {activeCenter.certifications.map((cert, idx) => (
                                                <span key={idx} style={{
                                                    fontSize: '0.82rem',
                                                    fontWeight: '600',
                                                    padding: '0.4rem 0.85rem',
                                                    borderRadius: '20px',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: `1px solid ${activeCenter.themeLightBorder}`,
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
                                        border: `1px solid ${activeCenter.themeLightBorder}`,
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
                                            background: activeCenter.badgeGradient,
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.4rem',
                                            flexShrink: 0,
                                            boxShadow: `0 4px 14px ${activeCenter.glowColor}`
                                        }}>
                                            <FaUsers />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px' }}>
                                                Faculty Coordinators & Department
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem' }}>
                                                {Array.isArray(activeCenter.leadFaculty) ? (
                                                    activeCenter.leadFaculty.map((name, idx) => (
                                                        <span key={idx} style={{
                                                            fontSize: '0.95rem',
                                                            fontWeight: '800',
                                                            color: '#ffffff',
                                                            background: 'rgba(255, 255, 255, 0.06)',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '8px',
                                                            border: `1px solid ${activeCenter.themeLightBorder}`
                                                        }}>
                                                            {name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
                                                        {activeCenter.leadFaculty}
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: activeCenter.color, fontWeight: '600', marginTop: '0.35rem' }}>
                                                {activeCenter.leadDepartment}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.section>
                </AnimatePresence>

                {/* 4. INDUSTRY COLLABORATIONS & MOU ECOSYSTEM */}
                <section style={{ marginBottom: '4.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            color: activeCenter.themeText,
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
                            {activeCenter.title} collaborates with leading industry technology providers to co-develop curricula, facilitate hackathons, and power advanced {activeCenter.category} research.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {activeCenter.industryPartners.map((partner, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.5) 100%)',
                                    border: `1px solid ${activeCenter.themeLightBorder}`,
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem',
                                    transition: 'border-color 0.25s ease, transform 0.25s ease',
                                    boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: activeCenter.accent,
                                    color: activeCenter.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.4rem',
                                    flexShrink: 0,
                                    border: `1px solid ${activeCenter.themeLightBorder}`
                                }}>
                                    <FaIndustry />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: activeCenter.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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

                {/* 5. CALL TO ACTION & INQUIRY BANNER */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
                        border: `1px solid ${activeCenter.themeBorder}`,
                        borderRadius: '24px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: `0 20px 40px -10px ${activeCenter.glowColor}`
                    }}
                >
                    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.35rem 1rem',
                            borderRadius: '30px',
                            background: activeCenter.accent,
                            color: activeCenter.color,
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1rem',
                            border: `1px solid ${activeCenter.themeLightBorder}`
                        }}>
                            <FaHandshake /> Partner with {activeCenter.code}
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: '#ffffff', marginBottom: '1rem' }}>
                            Ready to Collaborate, Innovate, or Tour {activeCenter.code}?
                        </h3>
                        <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                            Whether you are an industry partner seeking security/AI solutions, a student eager to embark on deep-tech innovation, or an academic researcher, {activeCenter.title} welcomes you.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <a
                                href={`mailto:research@ecetonline.com?subject=Inquiry regarding ${activeCenter.title} (${activeCenter.department})`}
                                className="btn-3d"
                                style={{
                                    background: activeCenter.badgeGradient,
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    padding: '0.9rem 2rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    boxShadow: `0 8px 20px -4px ${activeCenter.glowColor}`
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
