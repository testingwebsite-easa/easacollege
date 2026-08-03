import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaLightbulb, FaBullseye, FaRocket, FaCogs, FaTools, FaMicrochip,
    FaVial, FaChartLine, FaUserTie, FaGraduationCap, FaUserGraduate,
    FaCheckCircle, FaLaptopCode, FaPrint, FaRulerCombined, FaAward,
    FaDesktop, FaDraftingCompass, FaCube, FaBroadcastTower, FaShieldAlt
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';

const IdeaLabPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [activeZone, setActiveZone] = useState(0);

    const missions = [
        "Encourage the application of STEM fundamentals through hands-on learning and learning-by-doing practices.",
        "Provide access to advanced tools, technology platforms, and structured mentorship for prototype development and innovation.",
        "Foster interdisciplinary collaboration across departments to enhance creativity, teamwork, and problem-solving skills.",
        "Support student-driven research, product development, and entrepreneurial initiatives, including participation in innovation challenges and startup activities.",
        "Strengthen industry–academia linkages by facilitating real-world projects, mentoring, and technology transfer opportunities."
    ];

    const objectives = [
        {
            title: "Experiential Learning",
            desc: "Enhance experiential learning by enabling students to translate theoretical concepts into practical applications through design, prototyping, and testing.",
            icon: <FaDraftingCompass />
        },
        {
            title: "Innovation Mindset",
            desc: "Nurture an innovation mindset by cultivating critical thinking, creativity, and solution-oriented approaches.",
            icon: <FaLightbulb />
        },
        {
            title: "Product Development",
            desc: "Encourage product development through idea validation, prototype creation, and preparation for industry adoption or commercialization.",
            icon: <FaCube />
        },
        {
            title: "Entrepreneurship",
            desc: "Promote entrepreneurship by supporting incubation, startup mentoring, and commercialization pathways.",
            icon: <FaRocket />
        },
        {
            title: "Industry Collaboration",
            desc: "Facilitate industry collaboration by engaging industry partners in problem definition, mentoring, and project execution.",
            icon: <FaUserTie />
        }
    ];

    const zones = [
        {
            id: 'spark',
            badge: 'Zone 1',
            title: 'SPARK Zone',
            subtitle: 'Ideation & Conceptualization',
            icon: <FaLightbulb />,
            color: '#f59e0b',
            description: 'A collaborative space equipped for design thinking, mind-mapping, wireframing, and initial product conceptualization.',
            subsections: [
                {
                    title: 'Furniture & Collaboration Tools',
                    items: [
                        'Modular tables and ergonomic chairs',
                        'Writable whiteboards',
                        'Pin-up boards & idea canvases',
                        'Mobile partitions for team discussions'
                    ]
                },
                {
                    title: 'Digital & Design Tools',
                    items: [
                        'High-performance desktop computers',
                        'Interactive smart board',
                        'Design thinking toolkits',
                        'Mind-mapping and brainstorming software'
                    ]
                },
                {
                    title: 'Software & Wireframing',
                    items: [
                        'CAD conceptual tools (AutoCAD, Fusion 360 – basic design use)',
                        'UI/UX wireframing tools',
                        'Project planning and documentation tools'
                    ]
                }
            ]
        },
        {
            id: 'evoke',
            badge: 'Zone 2',
            title: 'EVOKE Zone',
            subtitle: 'Product Development & Prototyping',
            icon: <FaTools />,
            color: '#3b82f6',
            description: 'Advanced rapid prototyping machinery, mechanical fabrication tools, and embedded electronics systems for building tangible prototypes.',
            subsections: [
                {
                    title: 'Rapid Prototyping Equipment',
                    items: [
                        '3D Printers',
                        '3D Scanner',
                        'Laser Cutting and Engraving Machine',
                        'CNC Milling / Routing Machine',
                        'Desktop CNC Lathe'
                    ]
                },
                {
                    title: 'Mechanical & Fabrication Tools',
                    items: [
                        'Bench drilling machine',
                        'Grinding and polishing machine',
                        'Power tools (hand drill, jigsaw, rotary tools)',
                        'Hand tools (spanners, screwdrivers, pliers, clamps, vices)'
                    ]
                },
                {
                    title: 'Electronics & Embedded Systems',
                    items: [
                        'Soldering stations (temperature-controlled)',
                        'Desoldering units',
                        'Breadboards and jumper wires',
                        'Power supplies (regulated DC)',
                        'Oscilloscope (basic digital)',
                        'Function generator'
                    ]
                },
                {
                    title: 'Embedded & IoT Kits',
                    items: [
                        'Arduino development boards',
                        'Raspberry Pi kits',
                        'ESP32 / NodeMCU modules',
                        'Sensor kits (temperature, humidity, gas, motion, pressure, IR)',
                        'Actuators (DC motors, servo motors, stepper motors)',
                        'Relay modules and motor drivers'
                    ]
                }
            ]
        },
        {
            id: 'evolve',
            badge: 'Zone 3',
            title: 'EVOLVE Zone',
            subtitle: 'Testing, Inspection & Validation',
            icon: <FaVial />,
            color: '#10b981',
            description: 'Rigorous electronic testing, precision mechanical measurement tools, and quality assurance equipment to validate prototype performance.',
            subsections: [
                {
                    title: 'Electrical & Electronics Testing',
                    items: [
                        'Digital multimeters',
                        'LCR meters',
                        'Logic analyzers',
                        'Battery testers and chargers',
                        'Thermal cameras (basic)'
                    ]
                },
                {
                    title: 'Mechanical & Product Testing',
                    items: [
                        'Vernier calipers, micrometers',
                        'Surface roughness tester (basic)',
                        'Load testing setup (small-scale)',
                        'Vibration analysis kit',
                        'Torque measurement tools'
                    ]
                },
                {
                    title: 'Quality & Safety Tools',
                    items: [
                        'Insulation resistance tester (Megger)',
                        'Continuity testers',
                        'Safety gloves, goggles, ESD mats',
                        'Fire extinguishers and first-aid kits'
                    ]
                }
            ]
        },
        {
            id: 'leap',
            badge: 'Zone 4',
            title: 'LEAP Zone',
            subtitle: 'Incubation, Entrepreneurship & Commercialization',
            icon: <FaRocket />,
            color: '#8b5cf6',
            description: 'Dedicated incubation infrastructure, IP & business guidance tools, and pitch recording setups for launching successful student ventures.',
            subsections: [
                {
                    title: 'Office & Startup Infrastructure',
                    items: [
                        'Dedicated incubation workstations',
                        'High-speed internet connectivity',
                        'Meeting and presentation rooms',
                        'Video conferencing setup'
                    ]
                },
                {
                    title: 'Business & Innovation Tools',
                    items: [
                        'Computers with business planning software',
                        'Financial modeling and market analysis tools',
                        'Patent search and IP awareness software access',
                        'Startup documentation templates'
                    ]
                },
                {
                    title: 'Mentorship & Outreach Facilities',
                    items: [
                        'Presentation systems (projector / LED display)',
                        'Recording tools for pitch sessions',
                        'Demo and product showcase units'
                    ]
                }
            ]
        }
    ];

    const impacts = [
        "Transform engineering education from traditional classroom-centric learning to innovation-driven, practice-oriented experiences.",
        "Equip students with 21st-century skills, including design thinking, critical analysis, collaboration, and communication.",
        "Enhance student participation in national and international innovation challenges, research activities, and startup ventures.",
        "Bridge the gap between academic learning and industry expectations, thereby improving employability and entrepreneurial success."
    ];

    const personnel = [
        { role: "Chief Mentor", name: "Dr. Robert Kennedy Z", details: "Principal", category: "leadership" },
        { role: "Faculty Coordinator", name: "Dr. Santhosh S", details: "Professor, Mechanical Engineering", category: "faculty" },
        { role: "Faculty Co-Coordinator", name: "Dr. Rajesh Ruban", details: "Assistant Professor, Mechanical Engineering", category: "faculty" },
        { role: "Student Ambassador 1", name: "Mathan K", details: "Electrical and Electronics Engineering", category: "student" },
        { role: "Student Ambassador 2", name: "Sharu Kesavan M", details: "Agricultural Engineering", category: "student" },
        { role: "Student Ambassador 3", name: "Santhana Pandi G", details: "Electronics and Communication Engineering", category: "student" },
        { role: "Tech Guru 1", name: "Gunasekaran T", details: "Assistant Professor, Mechanical Engineering", category: "guru" },
        { role: "Tech Guru 2", name: "Nithyananth R", details: "Assistant Professor, Mechanical Engineering", category: "guru" },
        { role: "Tech Guru 3", name: "Ranjith Kumar G", details: "Assistant Professor, Electrical and Electronics Engineering", category: "guru" },
        { role: "Tech Guru 4", name: "Sivakumar M", details: "Assistant Professor, Electronics", category: "guru" }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="AICTE-IDEA Lab | EASA College of Engineering and Technology"
                description="The AICTE-IDEA Lab at EASA College promotes innovation, experiential learning, design thinking, and entrepreneurship with 3,000 sq ft dedicated four-zone facility."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="idea-lab"
                defaultTitle="AICTE-IDEA Lab"
                defaultSubtitle="Idea Development, Evaluation & Application Lab — Empowering Innovation & Product Development"
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem' }}>

                {/* About & Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '24px',
                        padding: '3rem',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                        marginBottom: '4rem'
                    }}
                >
                    <div style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '1rem' }}>
                        AICTE Initiative
                    </div>
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Innovation Ecosystem at EASA
                    </h2>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        The <strong>AICTE-IDEA (Idea Development, Evaluation & Application) Lab</strong> at EASA College of Engineering and Technology is a state-of-the-art innovation ecosystem established under the initiative of the All India Council for Technical Education (AICTE).
                    </p>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                        The IDEA Lab is envisioned as a dynamic platform that promotes innovation, experiential learning, design thinking, and entrepreneurship, enabling students and faculty to transform ideas into viable products and real-world solutions through collaborative, hands-on engagement.
                    </p>
                </motion.div>

                {/* Vision & Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.03)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#f59e0b', color: '#fff', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                <FaLightbulb />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Vision</h3>
                        </div>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                            To establish a vibrant innovation hub that empowers students and faculty to engage, explore, experience, express, and excel in emerging technologies and real-world problem solving, in alignment with the National Education Policy (NEP) 2020, the national vision of Atma Nirbhar Bharat, and Technology Vision 2035.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.03)'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#3b82f6', color: '#fff', width: '50px', height: '50px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                <FaBullseye />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Mission</h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {missions.map((m, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '1.02rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                                    <FaCheckCircle style={{ color: '#3b82f6', marginTop: '4px', flexShrink: 0 }} />
                                    <span>{m}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Key Objectives */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.8rem' }}>Primary Objectives</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Core focus areas guiding the activities and growth of the AICTE-IDEA Lab</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {objectives.map((obj, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.03)'
                                }}
                            >
                                <div style={{ color: '#3b82f6', fontSize: '2rem', marginBottom: '1rem' }}>
                                    {obj.icon}
                                </div>
                                <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.8rem' }}>{obj.title}</h4>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>{obj.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Infrastructure Overview Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '24px',
                        padding: '3rem',
                        marginBottom: '4rem'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                        <FaRulerCombined style={{ fontSize: '2rem', color: '#3b82f6' }} />
                        <h3 style={{ fontSize: '2rem', fontWeight: '800' }}>Infrastructure & Functional Layout</h3>
                    </div>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        The institution has demonstrated commendable performance in establishing the IDEA Lab strictly in accordance with AICTE objectives and guidelines. A dedicated exclusive space measuring <strong>100 × 30 feet</strong>, with a total built-up area of <strong>3,000 square feet</strong>, has been allotted exclusively for the IDEA Lab.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                        To ensure smooth workflow, structured innovation processes, and effective utilization of resources, the IDEA Lab is organized into <strong>four thematic functional zones</strong> covering the full product life cycle.
                    </p>
                </motion.div>

                {/* Four Thematic Zones Section */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.8rem' }}>The Four Thematic Functional Zones</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>An end-to-end ecosystem from ideation to prototype commercialization</p>
                    </div>

                    {/* Zone Selector Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                        {zones.map((zone, idx) => (
                            <button
                                key={zone.id}
                                onClick={() => setActiveZone(idx)}
                                style={{
                                    padding: '0.8rem 1.6rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    transition: 'all 0.3s ease',
                                    background: activeZone === idx ? zone.color : 'var(--bg-card)',
                                    color: activeZone === idx ? '#ffffff' : 'var(--text-muted)',
                                    boxShadow: activeZone === idx ? `0 10px 20px ${zone.color}40` : '0 4px 12px rgba(0,0,0,0.03)'
                                }}
                            >
                                <span>{zone.icon}</span>
                                <span>{zone.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Zone Detail Card */}
                    {zones.map((zone, idx) => {
                        if (idx !== activeZone) return null;
                        return (
                            <motion.div
                                key={zone.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    padding: '3rem',
                                    border: `2px solid ${zone.color}30`,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: zone.color, color: '#fff', padding: '1rem', borderRadius: '16px', fontSize: '1.8rem', display: 'flex' }}>
                                            {zone.icon}
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', tracking: '1px', color: zone.color }}>
                                                {zone.badge}
                                            </span>
                                            <h3 style={{ fontSize: '2rem', fontWeight: '800' }}>{zone.title}</h3>
                                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '600' }}>{zone.subtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                                    {zone.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                    {zone.subsections.map((sub, sIdx) => (
                                        <div key={sIdx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.8rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: zone.color }}>
                                                {sub.title}
                                            </h4>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {sub.items.map((item, iIdx) => (
                                                    <li key={iIdx} style={{ fontSize: '0.98rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                        <span style={{ color: zone.color, fontWeight: 'bold' }}>•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Expected Impact */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.8rem' }}>Expected Impact</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Transforming education and preparing students for future technological leadership</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                        {impacts.map((imp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                                    {idx + 1}
                                </div>
                                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>{imp}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Personnel / Management Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '24px',
                        padding: '3rem',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <FaUserTie style={{ fontSize: '2rem', color: '#3b82f6' }} />
                        <div>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>Operation & Management Personnel</h2>
                            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Leadership, Mentors, Ambassadors, and Technical Experts steering the AICTE-IDEA Lab</p>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--glass-border)', color: 'var(--text-main)' }}>
                                    <th style={{ padding: '1rem', fontSize: '1rem', fontWeight: '700' }}>Sl. No</th>
                                    <th style={{ padding: '1rem', fontSize: '1rem', fontWeight: '700' }}>Personnel Role</th>
                                    <th style={{ padding: '1rem', fontSize: '1rem', fontWeight: '700' }}>Name</th>
                                    <th style={{ padding: '1rem', fontSize: '1rem', fontWeight: '700' }}>Department / Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personnel.map((p, idx) => (
                                    <tr
                                        key={idx}
                                        style={{
                                            borderBottom: '1px solid var(--glass-border)',
                                            background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'
                                        }}
                                    >
                                        <td style={{ padding: '1rem', fontWeight: '700', color: '#3b82f6' }}>{idx + 1}</td>
                                        <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                            <span style={{
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                background: p.category === 'leadership' ? 'rgba(245, 158, 11, 0.15)' :
                                                            p.category === 'faculty' ? 'rgba(59, 130, 246, 0.15)' :
                                                            p.category === 'student' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                                                color: p.category === 'leadership' ? '#f59e0b' :
                                                       p.category === 'faculty' ? '#3b82f6' :
                                                       p.category === 'student' ? '#10b981' : '#8b5cf6'
                                            }}>
                                                {p.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-main)' }}>{p.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{p.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

            </div>

            <Footer />
        </div>
    );
};

export default IdeaLabPage;
