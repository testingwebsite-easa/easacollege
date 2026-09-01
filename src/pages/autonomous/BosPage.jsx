import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBookOpen, FaUniversity, FaUserTie, FaGraduationCap,
    FaCheckCircle, FaChartLine, FaFileAlt, FaDownload,
    FaChevronRight, FaLightbulb, FaShieldAlt, FaCogs,
    FaLaptopCode, FaMicrochip, FaBolt, FaHeartbeat,
    FaSeedling, FaExternalLinkAlt, FaBuilding, FaComments
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import AdmissionForm from '../../components/AdmissionForm';
import GlobalHero from '../../components/GlobalHero';
import { Link } from 'react-router-dom';

const bosData = {
    title: "Board of Studies (BoS)",
    subtitle: "Departmental Statutory Authority for Curriculum Design, Syllabus Regulations & Academic Rigor.",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    overview: [
        "The Board of Studies (BoS) is the statutory academic authority for every engineering department, responsible for designing, restructuring, and continuously updating the curriculum and course syllabi.",
        "Composed of the Head of Department, Anna University Nominees, distinguished professors from premier institutions (IITs, NITs), senior industry leaders, and alumni, the BoS ensures that academic programs maintain global relevance, Outcome-Based Education (OBE) alignment, and Washington Accord benchmarks.",
        "The BoS formulates regulations, prescribes course credit structures, finalizes textbooks and reference materials, reviews elective baskets (Professional & Open Electives), and submits recommendations to the Academic Council for final ratification."
    ],
    departments: [
        {
            id: "cse",
            name: "Computer Science & Engineering",
            chairperson: "Dr. S. Ramasamy (Professor & HOD)",
            universityNominee: "Dr. K. Balakrishnan (Professor, Anna University, Chennai)",
            subjectExperts: [
                "Dr. P. Manoharan (Associate Professor, NIT Tiruchirappalli)",
                "Dr. M. Sridharan (Professor, Coimbatore Institute of Technology)"
            ],
            industryRep: "Mr. G. Arvind (Principal Architect, Zoho Corporation)",
            alumniRep: "Ms. Priyanka R. (Senior Software Engineer, Cognizant)",
            specializations: ["Cloud Architecture", "Generative AI", "Full Stack Development", "Cyber Security"],
            icon: <FaLaptopCode />
        },
        {
            id: "aids",
            name: "Artificial Intelligence & Data Science",
            chairperson: "Dr. P. Manoharan (Professor & HOD)",
            universityNominee: "Dr. S. Saravanan (Professor, Anna University Regional Campus)",
            subjectExperts: [
                "Dr. R. Kavitha (Professor, PSG College of Technology)",
                "Dr. N. Suresh (Associate Professor, Government College of Tech)"
            ],
            industryRep: "Mr. K. Vignesh (Data Engineering Lead, LatentView Analytics)",
            alumniRep: "Mr. Vignesh S. (MLOps Engineer, Freshworks)",
            specializations: ["Deep Learning", "Computer Vision", "Big Data Analytics", "MLOps"],
            icon: <FaLightbulb />
        },
        {
            id: "mech",
            name: "Mechanical Engineering",
            chairperson: "Dr. K. Arulmurugan (Professor & HOD)",
            universityNominee: "Dr. T. Murugesan (Professor, Anna University, Chennai)",
            subjectExperts: [
                "Dr. P. Selvakumar (Professor, PSG College of Technology)",
                "Dr. N. Ramesh (Associate Professor, CIT Coimbatore)"
            ],
            industryRep: "Mr. S. Ravichandran (VP - Operations, L&T Valves)",
            alumniRep: "Mr. Karthik R. (Founder, AgroBotix Technologies)",
            specializations: ["Robotics & Automation", "Electric Mobility", "Smart Manufacturing", "3D Printing"],
            icon: <FaCogs />
        },
        {
            id: "ece",
            name: "Electronics & Communication Engineering",
            chairperson: "Dr. N. Saravanan (Professor & HOD)",
            universityNominee: "Dr. R. Jayagopal (Professor, Anna University)",
            subjectExperts: [
                "Dr. K. Revathi (Professor, GCT Coimbatore)",
                "Dr. M. Anand (Associate Professor, PSG Tech)"
            ],
            industryRep: "Mr. B. Suresh Kumar (Senior Director, Texas Instruments)",
            alumniRep: "Ms. Lavanya K. (Embedded Engineer, Bosch)",
            specializations: ["VLSI Design", "Edge IoT", "5G Wireless Networks", "Embedded Firmware"],
            icon: <FaMicrochip />
        },
        {
            id: "eee",
            name: "Electrical & Electronics Engineering",
            chairperson: "Dr. M. Vijayakumar (Professor & HOD)",
            universityNominee: "Dr. S. Albert (Professor, Anna University)",
            subjectExperts: [
                "Dr. A. Sundar (Professor, CIT Coimbatore)",
                "Dr. C. Mohan (Associate Professor, GCT Coimbatore)"
            ],
            industryRep: "Mr. D. Srinivasan (General Manager, ABB India Ltd)",
            alumniRep: "Mr. Mohanraj P. (EV Specialist, Ather Energy)",
            specializations: ["Electric Vehicles (EV)", "Smart Grids", "Renewable Energy", "Power Electronics"],
            icon: <FaBolt />
        },
        {
            id: "bme",
            name: "Biomedical Engineering",
            chairperson: "Dr. R. Anuradha (Professor & HOD)",
            universityNominee: "Dr. S. Meenakshi (Professor, Anna University)",
            subjectExperts: [
                "Dr. G. Pavithra (Professor, PSG IMS&R)",
                "Dr. S. Santhosh (Associate Professor, KMCH Institute)"
            ],
            industryRep: "Mr. K. Rajesh (Lead Medical Devices, Siemens Healthineers)",
            alumniRep: "Ms. Deepika S. (Clinical Specialist, Apollo Healthcare)",
            specializations: ["Bio-Instrumentation", "Medical Imaging", "Telemedicine", "Biomechanics"],
            icon: <FaHeartbeat />
        },
        {
            id: "agri",
            name: "Agriculture Engineering",
            chairperson: "Dr. S. Thilagavathi (Professor & HOD)",
            universityNominee: "Dr. M. Chinnasamy (Professor, TNAU Coimbatore)",
            subjectExperts: [
                "Dr. R. Senthamil (Professor, Tamil Nadu Agricultural Univ)",
                "Dr. K. Vetrivel (Associate Professor, AEC&RI)"
            ],
            industryRep: "Mr. V. Sakthivel (Director, Jain Irrigation Systems)",
            alumniRep: "Mr. Pradeep K. (Consultant, AgriTech Solutions)",
            specializations: ["Precision Farming", "Farm Automation", "Soil & Water Conservation", "Post-Harvest Tech"],
            icon: <FaSeedling />
        }
    ],
    functions: [
        {
            title: "Curriculum & Syllabi Structuring",
            desc: "Drafting semester-wise course schemes, credits, prerequisites, and Course Outcomes (COs) aligned with Bloom's Taxonomy."
        },
        {
            title: "Professional & Open Elective Baskets",
            desc: "Prescribing industry-relevant elective pathways across AI, Cloud, Cyber Security, Robotics, EV, and Management."
        },
        {
            title: "Textbook & Reference Material Approval",
            desc: "Selecting standard reference books, global online resources, NPTEL/SWAYAM mappings, and virtual laboratory modules."
        },
        {
            title: "Value-Added Courses & Industry Certifications",
            desc: "Recommending 30-hour specialized value-added certificate courses in collaboration with corporate industry partners."
        }
    ]
};

const BosPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [selectedDept, setSelectedDept] = useState('cse');
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

    const currentDept = bosData.departments.find(d => d.id === selectedDept) || bosData.departments[0];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="Board of Studies (BoS) | EASA College"
                description="Board of Studies (BoS) at EASA College - Departmental statutory bodies for syllabus design, curriculum regulations, and academic quality assurance."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="bos"
                defaultTitle={bosData.title}
                defaultSubtitle={bosData.subtitle}
                defaultImage={bosData.heroImage}
            />

            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
                {/* OVERVIEW */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                            color: accentColor,
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Academic Statutory Authority
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Board of Studies Framework
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {bosData.overview.map((p, idx) => (
                                <p key={idx} style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, margin: 0 }}>
                                    {p}
                                </p>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                            {bosData.functions.map((f, idx) => (
                                <div key={idx} style={{ background: cardBg, borderRadius: '20px', border: cardBorder, padding: '1.8rem', boxShadow: cardShadow }}>
                                    <div style={{ color: accentColor, fontSize: '1.5rem', marginBottom: '0.8rem' }}><FaBookOpen /></div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem' }}>{f.title}</h4>
                                    <p style={{ fontSize: '0.88rem', color: secondaryTextColor, lineHeight: '1.5', margin: 0 }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DEPARTMENT BOS MEMBERS */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                            color: accentColor,
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Department Committees
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Department Board of Studies Composition
                        </h2>
                    </div>

                    {/* DEPT CHIPS */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                        {bosData.departments.map((dept) => {
                            const isSel = selectedDept === dept.id;
                            return (
                                <button
                                    key={dept.id}
                                    onClick={() => setSelectedDept(dept.id)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '50px',
                                        border: isSel ? `1px solid ${accentColor}` : cardBorder,
                                        background: isSel ? 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)' : cardBg,
                                        color: isSel ? '#ffffff' : primaryTextColor,
                                        fontWeight: '800',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.6rem'
                                    }}
                                >
                                    <span>{dept.icon}</span>
                                    <span>{dept.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* SELECTED DEPT BOS DETAILS */}
                    <motion.div
                        key={selectedDept}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: cardBg,
                            borderRadius: '28px',
                            border: cardBorder,
                            padding: '3rem',
                            boxShadow: cardShadow
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: primaryTextColor, margin: '0 0 0.4rem' }}>
                                    {currentDept.name} BoS
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                                    {currentDept.specializations.map((spec, sIdx) => (
                                        <span key={sIdx} style={{ padding: '0.3rem 0.8rem', borderRadius: '8px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF', color: accentColor, fontSize: '0.8rem', fontWeight: '700' }}>
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span style={{ padding: '0.4rem 1rem', borderRadius: '50px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontSize: '0.82rem', fontWeight: '800' }}>
                                Term: 2024 - 2027
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: accentColor, fontWeight: '800', marginBottom: '0.4rem' }}>Chairman (HOD)</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>{currentDept.chairperson}</h4>
                            </div>
                            <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: isDark ? '#FBBF24' : '#D97706', fontWeight: '800', marginBottom: '0.4rem' }}>Anna University Nominee</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>{currentDept.universityNominee}</h4>
                            </div>
                            <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#10B981', fontWeight: '800', marginBottom: '0.4rem' }}>Industry Representative</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>{currentDept.industryRep}</h4>
                            </div>
                            <div style={{ padding: '1.5rem', borderRadius: '18px', background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC', border: cardBorder }}>
                                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#8B5CF6', fontWeight: '800', marginBottom: '0.4rem' }}>Meritorious Alumni</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: primaryTextColor, margin: 0 }}>{currentDept.alumniRep}</h4>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.8rem', paddingTop: '1.5rem', borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(226, 232, 240, 0.8)' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: '800', color: primaryTextColor, marginBottom: '0.8rem', textTransform: 'uppercase' }}>
                                Subject Matter Experts from Premier Institutions:
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {currentDept.subjectExperts.map((exp, eIdx) => (
                                    <li key={eIdx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.92rem', color: secondaryTextColor }}>
                                        <FaCheckCircle size={13} style={{ color: '#10B981', flexShrink: 0 }} />
                                        <span>{exp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </section>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default BosPage;
