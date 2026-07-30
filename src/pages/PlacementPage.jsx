import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBriefcase, FaChartLine, FaHandshake, FaChalkboardTeacher,
    FaChartPie, FaIdBadge, FaCogs, FaQuoteLeft, FaImages, FaDownload,
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserTie,
    FaCheckCircle, FaStar, FaGlobe, FaRocket, FaFileAlt, FaCalendarCheck,
    FaChevronRight, FaGraduationCap, FaCode, FaMicrochip, FaBuilding,
    FaMoneyBillWave, FaLightbulb, FaHandsHelping, FaLaptopCode, FaCheckDouble
} from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';

const defaultRecruiters = [
    { name: "Reliance", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Reliance_Industries_Logo.svg", sector: "Information Technology & Services", package: "3–5 LPA" },
    { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg", sector: "Information Technology", package: "4–5 LPA" },
    { name: "Tata Consultancy Services (TCS)", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg", sector: "Information Technology", package: "3.5 LPA" },
    { name: "Tekkovai", logo: "", sector: "Information Technology", package: "10–15 LPA" },
    { name: "Besant Technologies", logo: "", sector: "Information Technology", package: "6 LPA" },
    { name: "Test Series Pro", logo: "", sector: "Information Technology", package: "8 LPA" },
    { name: "QSpiders", logo: "", sector: "Information Technology", package: "3–5 LPA" },
    { name: "DBS Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/DBS_Bank_logo.svg", sector: "Banking & Financial Services", package: "5.75 LPA" },
    { name: "Park Commercial", logo: "", sector: "Core Engineering", package: "7 LPA" },
    { name: "Trans Energy", logo: "", sector: "Core Engineering", package: "5 LPA" },
    { name: "Motherson", logo: "", sector: "Core Engineering", package: "3 LPA" },
    { name: "KGIS", logo: "", sector: "Information Technology", package: "3 LPA" },
    { name: "Zoho Corporation", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Zoho_Corporation_logo.png", sector: "Information Technology", package: "6–12 LPA" },
    { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Cognizant_logo.svg", sector: "Information Technology", package: "4–6 LPA" },
    { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg", sector: "Information Technology", package: "4–7 LPA" },
    { name: "L&T Construction", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Larsen%26Toubro_logo.svg", sector: "Core Engineering", package: "4.5–6 LPA" },
    { name: "Roots Industries", logo: "", sector: "Core Engineering", package: "3.5–5 LPA" },
    { name: "Pricol", logo: "", sector: "Core Engineering", package: "3.5–4.5 LPA" },
    { name: "TVS Motors", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/TVS_Motor_Company_logo.svg", sector: "Core Engineering", package: "4.5–6 LPA" }
];

const placementData = {
    name: "Training & Placement Cell",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2868&ixlib=rb-4.0.3",
    vision: "To become a center of excellence in grooming students into industry-ready professionals and providing them with the best career opportunities.",
    mission: [
        "To provide comprehensive training in soft skills, aptitude, and technical domain.",
        "To foster strong industry-academia linkages and long-term hiring partnerships.",
        "To facilitate internships and campus placements in top global organizations.",
        "To guide students in their holistic career planning and ethical professional development."
    ],
    overviewParagraphs: [
        "The Training and Placement Cell of EASA College of Engineering and Technology is committed to providing students with excellent career opportunities by connecting academic learning with industry expectations. Through continuous skill development, career guidance, industry interaction, and campus recruitment activities, the institution strives to develop competent professionals capable of succeeding in diverse industrial sectors.",
        "The Placement Cell maintains strong relationships with organizations from Information Technology, Core Engineering, Manufacturing, Banking, Training, and Emerging Technology sectors. Regular campus recruitment drives, technical sessions, workshops, internships, and career development programmes help students gain industry exposure and improve their employability.",
        "The institution focuses on holistic student development by strengthening technical knowledge, communication skills, aptitude, leadership qualities, and professional ethics. This comprehensive approach enables students to confidently participate in recruitment processes and build successful careers."
    ],
    overviewNote: "These achievements reflect the institution's commitment to producing industry-ready graduates equipped with the knowledge and skills required by leading organizations.",
    stats: [
        { label: "Placement Percentage", value: "85%", icon: <FaCheckCircle /> },
        { label: "Students Successfully Placed", value: "250+", icon: <FaGraduationCap /> },
        { label: "Total Placement Offers", value: "345+", icon: <FaRocket /> },
        { label: "Highest Package", value: "15 LPA", icon: <FaStar /> },
        { label: "Average Salary Package", value: "4–5 LPA", icon: <FaChartLine /> },
        { label: "Recruiting Companies", value: "25+", icon: <FaBriefcase /> }
    ],
    companyPackages: [
        { company: "Tekkovai", package: "10–15 LPA", category: "Information Technology" },
        { company: "Test Series Pro", package: "8 LPA", category: "Information Technology" },
        { company: "Park Commercial", package: "7 LPA", category: "Core Engineering" },
        { company: "Besant Technologies", package: "6 LPA", category: "Information Technology" },
        { company: "DBS Bank", package: "5.75 LPA", category: "Banking & Financial Services" },
        { company: "Trans Energy", package: "5 LPA", category: "Core Engineering" },
        { company: "Accenture", package: "4–5 LPA", category: "Information Technology" },
        { company: "Reliance", package: "3–5 LPA", category: "Information Technology" },
        { company: "QSpiders", package: "3–5 LPA", category: "Information Technology" },
        { company: "Tata Consultancy Services (TCS)", package: "3.5 LPA", category: "Information Technology" },
        { company: "KGIS", package: "3 LPA", category: "Information Technology" },
        { company: "Motherson", package: "3 LPA", category: "Core Engineering" }
    ],
    recruiterSectors: {
        "Information Technology": [
            "Accenture", "Tata Consultancy Services (TCS)", "Reliance", "Tekkovai",
            "Besant Technologies", "Test Series Pro", "QSpiders", "KGIS"
        ],
        "Core Engineering": [
            "Park Commercial Vehicles", "Motherson", "Trans Energy"
        ],
        "Banking & Financial Services": [
            "DBS Bank"
        ],
        "Emerging Technology": [
            "Artificial Intelligence", "Data Science", "Cloud Computing",
            "Software Development", "IoT", "Cyber Security", "Digital Engineering"
        ]
    },
    campusRecruitmentText: "Campus recruitment is conducted throughout the academic year with the participation of companies from diverse industrial domains. Recruitment activities generally include pre-placement interactions, aptitude assessments, technical evaluations, group discussions, interviews, and final selection processes. Students receive multiple opportunities to participate in campus drives conducted by organizations based on their academic background, technical skills, and career interests.",
    industryCollaborationText: "The Training and Placement Cell actively collaborates with industries to strengthen students' practical knowledge and professional competencies. Industry interaction programmes provide students with valuable exposure to current technologies, corporate culture, and workplace expectations.",
    collaborationPoints: [
        "Campus Recruitment Drives",
        "Technical Workshops",
        "Guest Lectures",
        "Industrial Visits",
        "Internship Opportunities",
        "Career Guidance Sessions",
        "Industry Expert Interactions"
    ],
    careerDevelopmentText: "The Placement Cell follows a structured career development approach aimed at preparing students for successful professional careers. Continuous guidance and mentoring enable students to identify their strengths and improve their employability throughout their academic journey.",
    careerDevelopmentPoints: [
        "Career Counselling",
        "Placement Guidance",
        "Resume Preparation",
        "Interview Readiness",
        "Technical Skill Enhancement",
        "Professional Development",
        "Industry Orientation"
    ],
    trainingOverviewText: "At EASA College of Engineering and Technology, training is an integral part of the academic journey. The Training and Placement Cell follows a structured and progressive approach to enhance students' technical expertise, communication abilities, analytical thinking, and professional competence. Training begins from the early semesters and is designed to equip students with the knowledge and confidence required to excel in campus recruitment and professional careers. Our comprehensive training programmes are delivered by experienced faculty members, industry experts, and certified trainers through classroom sessions, practical workshops, coding laboratories, mock assessments, and interactive learning activities.",
    trainingModules: [
        {
            title: "Communication & Soft Skills Training",
            subtitle: "Developing confident and competent professionals",
            desc: "Effective communication is a key requirement in today's professional environment. The Communication and Soft Skills Training programme focuses on developing students into confident and competent professionals capable of working in diverse teams and organizational environments.",
            icon: <FaUserTie />,
            highlights: [
                "Verbal and Written Communication", "Business Communication", "Public Speaking",
                "Presentation Skills", "Personality Development", "Leadership & Team Building",
                "Time Management", "Critical Thinking", "Professional Etiquette", "Workplace Ethics",
                "Group Discussion Practice", "HR Interview Preparation", "Confidence Building Activities"
            ]
        },
        {
            title: "Aptitude Training",
            subtitle: "Strengthening analytical thinking & problem-solving",
            desc: "The Aptitude Training programme focuses on strengthening students' analytical thinking and problem-solving abilities, which are essential for competitive examinations and campus recruitment processes. Students regularly participate in mock tests and assessment sessions to improve speed, accuracy, and confidence.",
            icon: <FaChartPie />,
            highlights: [
                "Quantitative Aptitude", "Logical Reasoning", "Analytical Reasoning", "Verbal Ability",
                "Data Interpretation", "Numerical Ability", "Puzzle Solving", "Speed & Accuracy Improvement",
                "Competitive Examination Practice", "Company-Specific Aptitude Tests"
            ]
        },
        {
            title: "Technical Training",
            subtitle: "Hands-on coding, programming & software development",
            desc: "Technical competency forms the foundation of career success. Students receive extensive hands-on training in programming languages, software development, and emerging technologies through practical sessions, coding exercises, and industry-oriented projects.",
            icon: <FaCode />,
            programmingLanguages: ["C Programming", "C++", "Python", "Java"],
            coreSkills: [
                "Data Structures & Algorithms", "Object-Oriented Programming",
                "Database Management Systems (SQL)", "Web Technologies",
                "Software Development Fundamentals", "Problem Solving & Coding Practice",
                "Version Control & Development Tools"
            ]
        },
        {
            title: "Embedded Systems & Internet of Things (IoT) Training",
            subtitle: "Smart hardware, automation & real-time systems",
            desc: "To prepare students for careers in electronics, automation, and smart technologies, specialized training is offered in Embedded Systems and Internet of Things (IoT). The programme combines theoretical concepts with practical implementation using modern hardware and software platforms.",
            icon: <FaMicrochip />,
            highlights: [
                "Embedded C Programming", "Microcontrollers & Microprocessors", "Arduino Programming",
                "Raspberry Pi", "Sensor Interfacing", "Actuators & Control Systems", "IoT Architecture",
                "Wireless Communication Protocols", "Cloud-Based IoT Applications", "Smart Device Development",
                "Real-Time Embedded Applications", "Mini Projects & Prototype Development"
            ]
        }
    ],
    placementSupportText: "The Placement Cell provides continuous support to students throughout the recruitment process by coordinating campus drives, facilitating company interactions, conducting preparatory sessions, and providing career guidance. Every effort is made to ensure that students are equipped with the skills and confidence required to secure rewarding employment opportunities.",
    ourCommitmentText: "EASA College of Engineering and Technology remains committed to nurturing talented professionals through quality education, industry-oriented training, and dedicated placement support. By fostering strong industry partnerships and promoting continuous learning, the institution aims to create graduates who are technically competent, professionally confident, and prepared to contribute effectively to organizations across diverse sectors.",
    ourApproachText: "The Training and Placement Cell believes that continuous learning, practical exposure, and industry interaction are the pillars of successful careers. Through comprehensive training programmes, modern learning methodologies, and expert mentoring, EASA College equips students with the technical knowledge, professional skills, and confidence needed to become successful engineers and future industry leaders.",
    branchData: [
        { branch: "Computer Science & Engineering", placed: "96%" },
        { branch: "Information Technology", placed: "94%" },
        { branch: "Electronics & Communication", placed: "90%" },
        { branch: "Artificial Intelligence & Data Science", placed: "92%" },
        { branch: "Electrical & Electronics", placed: "88%" },
        { branch: "Mechanical Engineering", placed: "85%" },
        { branch: "Civil Engineering", placed: "82%" },
        { branch: "MBA", placed: "95%" }
    ],
    internships: [
        { company: "Tekkovai", role: "Software Engineering Intern", stipend: "₹15,000/mo", duration: "6 Months" },
        { company: "Besant Technologies", role: "Full Stack Intern", stipend: "₹12,000/mo", duration: "3 Months" },
        { company: "Park Commercial", role: "Engineering Graduate Trainee", stipend: "₹12,000/mo", duration: "6 Months" },
        { company: "Trans Energy", role: "Core Electrical Trainee", stipend: "₹10,000/mo", duration: "4 Months" },
        { company: "QSpiders", role: "Technical Test Engineer Intern", stipend: "₹10,000/mo", duration: "3 Months" }
    ],
    process: [
        { step: 1, title: "Pre-Placement Skill Assessment & Registration", desc: "Students register with the placement cell and complete diagnostic skill assessments." },
        { step: 2, title: "Customized Training & Bootcamps", desc: "Students undergo intense Aptitude, Soft Skills, Technical & Coding Bootcamps." },
        { step: 3, title: "Pre-Placement Talks & Campus Drives", desc: "Visiting companies deliver orientation presentations and publish job profiles." },
        { step: 4, title: "Multi-Round Evaluation", desc: "Aptitude Tests, Coding Evaluations, Group Discussions, and Technical Interviews." },
        { step: 5, title: "HR Interview & Final Selection", desc: "Candidates undergo HR evaluation, professional etiquette check, and job offer rollout." }
    ],
    testimonials: [
        { name: "Arjun K.", branch: "CSE", company: "Tekkovai (15 LPA)", text: "The intensive technical and coding training at EASA was a game-changer. The mock interviews really helped me crack the actual recruitment process." },
        { name: "Priya S.", branch: "ECE", company: "Accenture", text: "I am grateful to the placement cell for their constant support and guidance. The soft skills and communication workshops gave me tremendous confidence." },
        { name: "Rahul M.", branch: "Mech", company: "Park Commercial", text: "EASA's strong core industry connections opened incredible doors. I landed a top core engineering position right before graduation." }
    ],
    downloads: [
        { title: "Placement Brochure 2025-26", size: "4.2 MB", fileType: "PDF" },
        { title: "Student Placement Policy", size: "1.5 MB", fileType: "PDF" },
        { title: "Recruitment Form for Companies", size: "850 KB", fileType: "DOCX" },
        { title: "Standard Resume Format Template", size: "500 KB", fileType: "DOCX" }
    ],
    recruiters: defaultRecruiters,
    contact: {
        name: "Training & Placement Officer",
        designation: "Head - Training & Placement Cell",
        email: "placement@easacollege.com",
        phone: "+91 93426 28013",
        address: "Placement Office, Main Block, EASA College Campus"
    }
};

const PlacementPage = () => {
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [data, setData] = useState(placementData);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const pageRes = await fetch(`${API_BASE_URL}/api/placement-page`);
                if (pageRes.ok) {
                    const pageData = await pageRes.json();
                    if (pageData && Object.keys(pageData).length > 0) {
                        setData(prev => ({ ...prev, ...pageData }));
                    }
                }

                const partnersRes = await fetch(`${API_BASE_URL}/api/placement-partners`);
                if (partnersRes.ok) {
                    const partnersData = await partnersRes.json();
                    if (Array.isArray(partnersData) && partnersData.length > 0) {
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
        { id: 'statistics', label: 'Statistics & Highlights', icon: <FaChartLine /> },
        { id: 'recruiters', label: 'Top Recruiters', icon: <FaHandshake /> },
        { id: 'packages', label: 'Salary Packages', icon: <FaMoneyBillWave /> },
        { id: 'training', label: 'Training Programmes', icon: <FaChalkboardTeacher /> },
        { id: 'career', label: 'Career Development & Support', icon: <FaHandsHelping /> },
        { id: 'collaboration', label: 'Industry Collaboration', icon: <FaBuilding /> },
        { id: 'branchData', label: 'Branch-wise Data', icon: <FaChartPie /> },
        { id: 'internships', label: 'Internships', icon: <FaIdBadge /> },
        { id: 'process', label: 'Process Flow', icon: <FaCogs /> },
        { id: 'testimonials', label: 'Testimonials', icon: <FaQuoteLeft /> },
        { id: 'downloads', label: 'Downloads', icon: <FaDownload /> },
        { id: 'contact', label: 'Contact Us', icon: <FaPhone /> }
    ];

    const allRecruitersList = data.recruiters && data.recruiters.length > 0 ? data.recruiters : defaultRecruiters;

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
                    {/* 1. Placement Overview */}
                    {activeSection === 'overview' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Placement Overview</h2>
                            <div className="overview-hero">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                    {data.overviewParagraphs.map((para, idx) => (
                                        <p key={idx} style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                <div className="vision-mission-grid">
                                    <div style={{ padding: '2.5rem', background: 'var(--bg-section)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem', textAlign: 'center' }}><FaGlobe /></div>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>Vision</h4>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', textAlign: 'center' }}>{data.vision}</p>
                                    </div>
                                    <div style={{ padding: '2.5rem', background: 'var(--bg-section)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem', textAlign: 'center' }}><FaRocket /></div>
                                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>Mission</h4>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

                    {/* 2. Statistics & Highlights */}
                    {activeSection === 'statistics' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Placement Highlights & Statistics</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}>
                                    The institution has consistently demonstrated encouraging placement performance through industry collaborations and structured placement initiatives.
                                </p>
                            </div>

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

                            <div style={{ background: 'var(--bg-card)', padding: '2rem 2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', borderLeft: '6px solid var(--secondary)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <FaLightbulb style={{ fontSize: '2rem', color: 'var(--secondary)', flexShrink: 0 }} />
                                <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '600', margin: 0, lineHeight: 1.6 }}>
                                    {data.overviewNote}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 3. Top Recruiters & Logos */}
                    {activeSection === 'recruiters' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Major Recruiters & Corporate Partners</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                    Students have secured placement opportunities in reputed organizations across Information Technology, Core Engineering, Manufacturing, Banking, and Emerging Technology sectors.
                                </p>
                            </div>

                            {/* Recruiters Logos Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.8rem' }}>
                                {allRecruitersList.map((recruiter, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            background: 'var(--bg-card)',
                                            borderRadius: '24px',
                                            padding: '1.8rem 1.2rem',
                                            border: '1px solid var(--glass-border)',
                                            boxShadow: 'var(--card-shadow)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            minHeight: '160px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {recruiter.logo ? (
                                            <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img
                                                    src={recruiter.logo}
                                                    alt={recruiter.name}
                                                    style={{
                                                        maxWidth: '85%',
                                                        maxHeight: '70px',
                                                        objectFit: 'contain',
                                                        filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
                                                        opacity: theme === 'dark' ? 0.95 : 0.9
                                                    }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <span style={{ display: 'none', color: 'var(--text-main)', fontWeight: '800', fontSize: '1.1rem', textAlign: 'center' }}>
                                                    {recruiter.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>
                                                <span style={{ color: 'var(--text-main)', fontWeight: '800', fontSize: '1.15rem', textAlign: 'center' }}>
                                                    {recruiter.name}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 4. Salary Packages */}
                    {activeSection === 'packages' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Salary Packages</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                    The campus recruitment process has offered students competitive salary packages across various organizations (3 LPA – 15 LPA).
                                </p>
                            </div>

                            {/* Company Package Table */}
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '24px', overflow: 'hidden' }}>
                                <div style={{ padding: '1.5rem 2rem', background: 'var(--glass-highlight)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>Company Salary Packages</h3>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
                                            <tr>
                                                <th style={{ padding: '1.2rem 2rem', textAlign: 'left', fontWeight: '800', color: 'var(--secondary)' }}>Company</th>
                                                <th style={{ padding: '1.2rem 2rem', textAlign: 'left', fontWeight: '800', color: 'var(--secondary)' }}>Sector</th>
                                                <th style={{ padding: '1.2rem 2rem', textAlign: 'right', fontWeight: '800', color: 'var(--secondary)' }}>Salary Package</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.companyPackages.map((row, idx) => (
                                                <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                    <td style={{ padding: '1.2rem 2rem', fontWeight: '700', color: 'var(--text-main)' }}>{row.company}</td>
                                                    <td style={{ padding: '1.2rem 2rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>{row.category}</td>
                                                    <td style={{ padding: '1.2rem 2rem', textAlign: 'right', fontWeight: '900', color: 'var(--secondary)', fontSize: '1.1rem' }}>{row.package}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. Training Programmes */}
                    {activeSection === 'training' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Training Programmes</h2>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>Empowering Students with Industry-Ready Skills</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    {data.trainingOverviewText}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                {data.trainingModules.map((module, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '28px', padding: '3rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.8rem', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
                                                {module.icon}
                                            </div>
                                            <div>
                                                <h3 style={{ color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.2rem' }}>{module.title}</h3>
                                                <div style={{ color: 'var(--secondary)', fontSize: '0.95rem', fontWeight: '700' }}>{module.subtitle}</div>
                                            </div>
                                        </div>

                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                                            {module.desc}
                                        </p>

                                        {module.highlights && (
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Programme Highlights & Modules</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                                                    {module.highlights.map((item, itemIdx) => (
                                                        <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-section)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: '600' }}>
                                                            <FaCheckCircle style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                                                            <span>{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {module.programmingLanguages && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                                <div>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Programming Languages</h4>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                                        {module.programmingLanguages.map((lang, lIdx) => (
                                                            <span key={lIdx} style={{ background: 'var(--secondary)', color: 'var(--bg-dark)', padding: '0.6rem 1.5rem', borderRadius: '50px', fontWeight: '800', fontSize: '0.95rem' }}>
                                                                {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Core Technical Skills</h4>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                                                        {module.coreSkills.map((skill, sIdx) => (
                                                            <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-section)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: '600' }}>
                                                                <FaCode style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                                                                <span>{skill}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. Career Development */}
                    {activeSection === 'career' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Career Development & Placement Support</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    {data.careerDevelopmentText}
                                </p>
                            </div>

                            <div className="overview-hero">
                                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Career Development Activities</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
                                    {data.careerDevelopmentPoints.map((point, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-section)', padding: '1.2rem 1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontWeight: '700' }}>
                                            <FaCheckDouble style={{ color: 'var(--secondary)', fontSize: '1.2rem', flexShrink: 0 }} />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Placement Support</h3>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                            {data.placementSupportText}
                                        </p>
                                    </div>

                                    <div style={{ background: 'var(--bg-section)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                        <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>Our Commitment & Approach</h3>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                                            {data.ourCommitmentText}
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                                            {data.ourApproachText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. Industry Collaboration */}
                    {activeSection === 'collaboration' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem' }}>Industry Collaboration & Campus Recruitment</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    {data.industryCollaborationText}
                                </p>
                            </div>

                            <div className="overview-hero">
                                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Key Collaborative Initiatives</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                    {data.collaborationPoints.map((item, idx) => (
                                        <div key={idx} style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0 }}>
                                                {idx + 1}
                                            </div>
                                            <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.05rem' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem' }}>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Campus Recruitment Drive</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                        {data.campusRecruitmentText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 8. Branch Data */}
                    {activeSection === 'branchData' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Branch-wise Placement Performance</h2>
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '32px', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: 'var(--glass-highlight)' }}>
                                        <tr>
                                            <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', color: 'var(--secondary)' }}>Department / Branch</th>
                                            <th style={{ padding: '1.5rem 2rem', textAlign: 'left', fontWeight: '800', color: 'var(--secondary)' }}>Placement Percentage</th>
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

                    {/* 9. Internships */}
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

                    {/* 10. Process Flow */}
                    {activeSection === 'process' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Campus Recruitment Process Flow</h2>
                            <div className="overview-hero">
                                <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                                    <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)' }}></div>
                                    {data.process.map((step, idx) => (
                                        <div key={idx} style={{ position: 'relative', marginBottom: '3rem' }}>
                                            <div style={{ position: 'absolute', left: '-30px', top: '5px', width: '24px', height: '24px', background: 'var(--secondary)', borderRadius: '50%', border: '4px solid var(--bg-card)', zIndex: 2 }}></div>
                                            <div style={{ background: 'var(--bg-section)', borderRadius: '20px', padding: '2rem', border: '1px solid var(--glass-border)' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Step {step.step || idx + 1}</span>
                                                <h4 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.8rem' }}>{step.title}</h4>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 11. Testimonials */}
                    {activeSection === 'testimonials' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Student Testimonials</h2>
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

                    {/* 12. Downloads */}
                    {activeSection === 'downloads' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Placement Resources & Downloads</h2>
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

                    {/* 13. Contact */}
                    {activeSection === 'contact' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)' }}>Contact Placement Cell</h2>
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
                title="Training & Placement | EASA College of Engineering and Technology"
                description="Explore top engineering placements, statistics (85% placement rate, 15 LPA highest package), salary packages, major recruiters, and comprehensive training programmes at EASA College."
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
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Placement Navigation</div>
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
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2rem;
                }

                .stat-card {
                    background: var(--bg-card);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 2.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
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

                    .vision-mission-grid, .training-grid { grid-template-columns: 1fr; }
                    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .overview-hero { padding: 2rem; }
                }

                @media (max-width: 480px) {
                    .placement-container { padding: 0.5rem 0; width: 100vw; max-width: 100vw; }
                    aside > div { 
                        margin-left: -0.5rem !important;
                    }
                    .overview-hero { padding: 1.2rem; border-radius: 16px; }
                    
                    h2 { font-size: 2rem !important; }

                    .vision-mission-grid {
                        grid-template-columns: 1fr;
                    }
                    
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
