import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap, FaBook, FaChalkboardTeacher, FaTrophy,
    FaCalendarAlt, FaDownload, FaArrowRight, FaUniversity, FaUsers, FaLightbulb, FaRocket, FaGlobe, FaChevronRight,
    FaBalanceScale, FaLaptopCode, FaStar, FaHandHoldingHeart, FaGlobeAsia, FaImages, FaFlask, FaHandshake, FaFileSignature,
    FaChartLine, FaBriefcase, FaBullseye, FaCheckCircle, FaAward, FaBoxes
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import { getDepartment } from '../data/departmentsData';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';
import Tilt3DCard from '../components/Tilt3DCard';

const iconMap = {
    FaGraduationCap, FaBook, FaChalkboardTeacher, FaTrophy,
    FaCalendarAlt, FaDownload, FaArrowRight,
    FaBalanceScale, FaLaptopCode, FaStar, FaHandHoldingHeart, FaGlobeAsia
};

const getIcon = (iconName) => {
    if (React.isValidElement(iconName)) return iconName;
    const Icon = iconMap[iconName] || FaUniversity;
    return <Icon />;
};

const DepartmentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [department, setDepartment] = useState(() => getDepartment(id) || null);
    const [loading, setLoading] = useState(!department);
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [facultyList, setFacultyList] = useState([]);
    const [galleryData, setGalleryData] = useState({ events: [], images: [] });
    const [deptEvents, setDeptEvents] = useState([]);
    const [peoActiveTab, setPeoActiveTab] = useState('all');

    // Navigation sections list
    const sections = [
        { id: 'overview', label: 'Overview', icon: <FaUniversity /> },
        { id: 'vision-mission', label: 'Vision & Mission', icon: <FaGlobe /> },
        { id: 'peo-po-pso', label: 'PEO, PO & PSO', icon: <FaGraduationCap /> },
        ...(department?.courseOutcomes ? [{ id: 'course-outcomes', label: 'Course Outcomes', icon: <FaBook /> }] : []),
        ...(department?.documents ? [{ id: 'documents', label: 'Downloads & Syllabi', icon: <FaDownload /> }] : []),
        { id: 'labs', label: 'Laboratories', icon: <FaFlask /> },
        { id: 'hod', label: 'HOD Desk', icon: <FaChalkboardTeacher /> },
        { id: 'faculty', label: 'Faculty Members', icon: <FaUsers /> },
        { id: 'mou', label: 'Industry Collaborations', icon: <FaHandshake /> },
        { id: 'gallery', label: 'Campus Gallery', icon: <FaImages /> },
        { id: 'events', label: 'Events & News', icon: <FaCalendarAlt /> },
        { id: 'milestones', label: 'Milestones', icon: <FaTrophy /> },
    ];

    // Fetch dynamic data based on active section
    useEffect(() => {
        if (activeSection === 'faculty' && id) {
            fetch(`${API_BASE_URL}/api/faculty?department=${id}`)
                .then(res => res.json())
                .then(data => setFacultyList(data))
                .catch(err => console.error("Error fetching faculty:", err));
        }
        if (activeSection === 'gallery' && id) {
            fetch(`${API_BASE_URL}/api/departments/${id}/gallery`)
                .then(res => res.json())
                .then(data => setGalleryData(data))
                .catch(err => console.error("Error fetching gallery:", err));
        }
        if (activeSection === 'events' && id) {
            fetch(`${API_BASE_URL}/api/departments/${id}/events`)
                .then(res => res.json())
                .then(data => setDeptEvents(data))
                .catch(err => console.error("Error fetching events:", err));
        }
    }, [activeSection, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const staticDept = getDepartment(id);
        if (staticDept) {
            setDepartment(staticDept);
        }

        // Fetch live department data from backend
        fetch(`${API_BASE_URL}/api/departments/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Backend response not ok");
                return res.json();
            })
            .then(data => {
                const currentStatic = getDepartment(id);
                if (!currentStatic) {
                    setDepartment(null);
                    return;
                }
                
                // If the static dept's slug differs from the URL id, redirect
                if (currentStatic.slug !== id) {
                    navigate(`/department/${currentStatic.slug}`, { replace: true });
                    return;
                }
                
                // Merge the live data with the static data
                if (data && (data.mission?.length > 0 || data.vision?.length > 0 || data.peo?.length > 0 || data.pso?.length > 0 || data.po?.length > 0)) {
                    setDepartment({
                        ...currentStatic,
                        mission: data.mission?.length > 0 ? data.mission : currentStatic.mission || [],
                        vision: data.vision?.length > 0 ? data.vision : currentStatic.vision || [],
                        peo: data.peo?.length > 0 ? data.peo : currentStatic.peo || [],
                        pso: data.pso?.length > 0 ? data.pso : currentStatic.pso || [],
                        po: data.po?.length > 0 ? data.po : currentStatic.po || []
                    });
                } else {
                    setDepartment(currentStatic);
                }
            })
            .catch(err => {
                console.warn("Could not fetch live department data, using static fallback:", err);
                const currentStatic = getDepartment(id);
                if (currentStatic && currentStatic.slug !== id) {
                    navigate(`/department/${currentStatic.slug}`, { replace: true });
                    return;
                }
                setDepartment(currentStatic || null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, navigate]);

    const renderVisionMission = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 className="section-title" style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                        Vision & Mission
                    </h2>
                    <span style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px', display: 'block' }}>
                        Guiding Principles & Strategic Imperatives of the Department
                    </span>
                </div>
                {department.documents?.find(d => d.type === 'Web') && (
                    <a
                        href={department.documents.find(d => d.type === 'Web').url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0.65rem 1.4rem',
                            borderRadius: '30px',
                            background: 'rgba(230, 182, 39, 0.12)',
                            border: '1px solid rgba(230, 182, 39, 0.3)',
                            color: 'var(--secondary)',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            textDecoration: 'none'
                        }}
                    >
                        <FaGlobe /> Official Portal
                    </a>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Vision 3D Card */}
                <Tilt3DCard
                    maxTilt={5}
                    glareOpacity={0.12}
                    style={{
                        background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(45, 44, 122, 0.15) 100%)',
                        borderRadius: '28px',
                        padding: '3rem 2.5rem',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '9rem', color: 'var(--secondary)', opacity: 0.04, pointerEvents: 'none' }}>
                        <FaGlobe />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                            <span style={{ width: '48px', height: '48px', background: 'rgba(230, 182, 39, 0.15)', border: '1px solid rgba(230, 182, 39, 0.3)', borderRadius: '14px', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                                <FaGlobe />
                            </span>
                            <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--secondary)' }}>Our Destination</span>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>Department Vision</h3>
                            </div>
                        </div>
                        {Array.isArray(department.vision) ? (
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: 0 }}>
                                {department.vision.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                        <span style={{ minWidth: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '10px' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ fontSize: '1.2rem', lineHeight: '1.85', color: 'var(--text-muted)', margin: 0 }}>
                                {department.vision}
                            </p>
                        )}
                    </div>
                    <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '800' }}>
                        <FaAward /> Global Excellence & Ethical Leadership
                    </div>
                </Tilt3DCard>

                {/* Mission 3D Card */}
                <Tilt3DCard
                    maxTilt={5}
                    glareOpacity={0.12}
                    style={{
                        background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(230, 182, 39, 0.08) 100%)',
                        borderRadius: '28px',
                        padding: '3rem 2.5rem',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '9rem', color: 'var(--secondary)', opacity: 0.04, pointerEvents: 'none' }}>
                        <FaRocket />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                            <span style={{ width: '48px', height: '48px', background: 'rgba(230, 182, 39, 0.15)', border: '1px solid rgba(230, 182, 39, 0.3)', borderRadius: '14px', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                                <FaRocket />
                            </span>
                            <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--secondary)' }}>Our Strategic Path</span>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>Department Mission</h3>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {department.mission?.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{
                                        minWidth: '28px',
                                        height: '28px',
                                        borderRadius: '8px',
                                        background: 'rgba(230, 182, 39, 0.15)',
                                        color: 'var(--secondary)',
                                        fontSize: '0.8rem',
                                        fontWeight: '900',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        marginTop: '3px'
                                    }}>
                                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                    </span>
                                    <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '800' }}>
                        <FaCheckCircle /> Academic-Industry Bridge & Innovation
                    </div>
                </Tilt3DCard>
            </div>
        </div>
    );

    const renderPEO = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                    <h2 className="section-title" style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                        PEO, PO & PSO Outcomes
                    </h2>
                    <span style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px', display: 'block' }}>
                        Outcome-Based Education (OBE) Framework • Program Attributes
                    </span>
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                        { id: 'all', label: 'All Outcomes' },
                        { id: 'po', label: `POs (${department.po?.length || 0})` },
                        { id: 'peo', label: `PEOs (${department.peo?.length || 0})` },
                        { id: 'pso', label: `PSOs (${department.pso?.length || 0})` }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setPeoActiveTab(tab.id)}
                            style={{
                                padding: '0.55rem 1.3rem',
                                borderRadius: '25px',
                                border: peoActiveTab === tab.id ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                                background: peoActiveTab === tab.id ? 'var(--secondary)' : 'var(--bg-card)',
                                color: peoActiveTab === tab.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: '0.2s'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 1. PROGRAM OUTCOMES (POs) */}
            {department.po && (peoActiveTab === 'all' || peoActiveTab === 'po') && (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                        <span style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <FaGraduationCap />
                        </span>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                Program Outcomes (POs)
                            </h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Core competencies & engineering/management skills acquired upon graduation</span>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gap: '1.3rem' }}>
                        {department.po.map((po, idx) => {
                            const hasColon = po.includes(':');
                            const title = hasColon ? po.split(':')[0] : `PO ${idx + 1}`;
                            const description = hasColon ? po.split(':').slice(1).join(':').trim() : po.trim();

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '1.8rem 2.2rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '22px',
                                        display: 'grid',
                                        gridTemplateColumns: '110px 1fr',
                                        gap: '2rem',
                                        alignItems: 'center',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '1.05rem',
                                        fontWeight: '900',
                                        color: 'var(--bg-dark)',
                                        background: 'var(--secondary)',
                                        padding: '0.6rem 1rem',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        letterSpacing: '1px'
                                    }}>
                                        {title.split(' ')[0]}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                                            {title.split(' ').slice(1).join(' ') || 'Outcome Objective'}
                                        </h4>
                                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 2. PROGRAM EDUCATIONAL OBJECTIVES (PEOs) */}
            {department.peo && (peoActiveTab === 'all' || peoActiveTab === 'peo') && (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                        <span style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <FaAward />
                        </span>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                Program Educational Objectives (PEOs)
                            </h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Long-term career achievements & professional impact 3-5 years after graduation</span>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {department.peo.map((peo, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={5}
                                glareOpacity={0.1}
                                style={{
                                    padding: '2.2rem',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '22px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                                }}
                            >
                                <div>
                                    <div style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '12px',
                                        background: 'rgba(230, 182, 39, 0.12)',
                                        color: 'var(--secondary)',
                                        fontWeight: '900',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.2rem'
                                    }}>
                                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                    </div>
                                    <h5 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--secondary)', marginBottom: '0.6rem' }}>
                                        Objective {idx + 1}
                                    </h5>
                                    <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                                        {peo}
                                    </p>
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. PROGRAM SPECIFIC OUTCOMES (PSOs) */}
            {department.pso && (peoActiveTab === 'all' || peoActiveTab === 'pso') && (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                        <span style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <FaLightbulb />
                        </span>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                Program Specific Outcomes (PSOs)
                            </h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Specialized domain abilities specific to this discipline</span>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {department.pso.map((pso, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={5}
                                glareOpacity={0.1}
                                style={{
                                    padding: '2.2rem',
                                    background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(45, 44, 122, 0.1) 100%)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '22px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                                }}
                            >
                                <div>
                                    <div style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        background: 'rgba(230, 182, 39, 0.15)',
                                        color: 'var(--secondary)',
                                        fontWeight: '900',
                                        fontSize: '0.8rem',
                                        display: 'inline-block',
                                        marginBottom: '1.2rem',
                                        border: '1px solid rgba(230, 182, 39, 0.3)'
                                    }}>
                                        PSO {idx + 1}
                                    </div>
                                    <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                                        {pso}
                                    </p>
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderMilestones = () => (
        <div className="milestones-section" style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', position: 'relative' }}>
            <div className="milestone-line" style={{ position: 'absolute', left: '4.5rem', top: '4rem', bottom: '4rem', width: '2px', background: 'linear-gradient(to bottom, var(--secondary), transparent)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {department.milestones?.map((milestone, idx) => (
                    <div key={idx} className="milestone-item" style={{ display: 'flex', gap: '3rem', position: 'relative' }}>
                        <div className="milestone-dot" style={{ width: '20px', height: '20px', background: 'var(--secondary)', borderRadius: '50%', border: '4px solid var(--bg-card)', zIndex: 2, marginTop: '10px' }}></div>
                        <div style={{ background: 'var(--bg-section)', borderRadius: '20px', padding: '2rem', flex: 1, border: '1px solid var(--glass-border)' }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)', display: 'block', marginBottom: '0.8rem' }}>{milestone.year}</span>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>{milestone.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderHOD = () => (
        department.hod && (
            <div className="hod-section" style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: 'minmax(300px, auto) 1fr', gap: '4rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <div className="hod-image-container" style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '6px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                            <img src={department.hod.image} alt={department.hod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--secondary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-dark)', fontSize: '1.5rem', border: '4px solid var(--bg-card)' }}>
                            <FaChalkboardTeacher />
                        </div>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{department.hod.name}</h3>
                    <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{department.hod.designation}</div>
                </div>
                <div style={{ paddingTop: '2.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ fontSize: '5rem', color: 'var(--secondary)', opacity: 0.1, position: 'absolute', top: '-40px', left: '-20px', fontFamily: 'serif' }}>"</span>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-muted)', fontStyle: 'italic', position: 'relative', zIndex: 1, textAlign: 'justify' }}>{department.hod.message}</p>
                        <span style={{ fontSize: '5rem', color: 'var(--secondary)', opacity: 0.1, position: 'absolute', bottom: '-60px', right: '0', fontFamily: 'serif' }}>"</span>
                    </div>
                </div>
            </div>
        )
    );

    const renderFaculty = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {facultyList.length === 0 ? <p className="text-muted">Faculty list is being updated.</p> : facultyList.map((fac, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-main)' }}>{fac.name}</h4>
                    <div style={{ fontSize: '0.95rem', color: 'var(--secondary)', fontWeight: '600', textTransform: 'uppercase' }}>{fac.designation}</div>
                </div>
            ))}
        </div>
    );

    const renderGallery = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {galleryData.events.length === 0 && galleryData.images.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="gallery-empty-state"
                    style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                        opacity: 0.1,
                        pointerEvents: 'none',
                        filter: 'blur(40px)'
                    }} />

                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'var(--glass-highlight)',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <FaImages size={50} color="var(--secondary)" />
                    </motion.div>

                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        Visual Experience Arriving Soon
                    </h3>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: '1.8'
                    }}>
                        We are crafting an immersive gallery to showcase our department's vibrant life, events, and achievements.
                        A stunning new interface is on its way!
                    </p>
                </motion.div>
            )}

            {/* Gallery Events */}
            {galleryData.events.map((event, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{event.eventName}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {event.photos.map((photo, pIdx) => (
                            <div key={pIdx} style={{ borderRadius: '12px', overflow: 'hidden', height: '150px' }}>
                                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Loose Images */}
            {galleryData.images.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {galleryData.images.map((img, idx) => (
                        <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', height: '200px', border: '1px solid var(--glass-border)' }}>
                            <img src={img.src} alt={img.caption || 'Gallery'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderEvents = () => (
        <div style={{ display: 'grid', gap: '2rem' }}>
            {deptEvents.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="events-empty-state"
                    style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                        opacity: 0.1,
                        pointerEvents: 'none',
                        filter: 'blur(40px)'
                    }} />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'var(--glass-highlight)',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <FaCalendarAlt size={50} color="var(--secondary)" />
                    </motion.div>

                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        Exciting Events on the Horizon
                    </h3>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: '1.8'
                    }}>
                        We are organizing a series of workshops, seminars, and technical fests.
                        The updated schedule with impressive new opportunities will be available soon!
                    </p>
                </motion.div>
            ) : deptEvents.map((event, idx) => (
                <div key={idx} className="event-card" style={{ display: 'flex', gap: '2rem', background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--glass-highlight)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', flexShrink: 0 }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: '900' }}>{new Date(event.date || Date.now()).getDate()}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase' }}>{new Date(event.date || Date.now()).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{event.title}</h4>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{event.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderLabs = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {department.labs ? department.labs.map((lab, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                    <div style={{ height: '220px', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                        {lab.image ? (
                            <img src={lab.image} alt={lab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <FaFlask size={50} />
                        )}
                    </div>
                    <div style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>{lab.name}</h4>
                        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{lab.description}</p>
                        {lab.equipment && (
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Key Equipment</div>
                                <div style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{lab.equipment}</div>
                            </div>
                        )}
                    </div>
                </div>
            )) : <p className="text-muted">Laboratories information coming soon.</p>}
        </div>
    );

    const renderMOU = () => (
        <div style={{ display: 'grid', gap: '2rem' }}>
            {!department.mou || department.mou.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{
                        background: 'var(--glass-highlight)',
                        padding: '1.5rem',
                        borderRadius: '50%',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <FaHandshake size={50} color="var(--secondary)" />
                    </div>
                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0
                    }}>
                        Strategic Partnerships
                    </h3>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: '1.8'
                    }}>
                        Information about our Memorandums of Understanding (MOUs) with leading industries and academic institutions is currently being updated.
                    </p>
                </motion.div>
            ) : (
                department.mou.map((mou, idx) => (
                    <div key={idx} style={{
                        background: 'var(--bg-card)',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        gap: '2.5rem',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: 'var(--glass-highlight)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: 'var(--secondary)'
                        }}>
                            <FaFileSignature size={40} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{mou.partner}</h3>
                                <span style={{ padding: '0.4rem 1rem', background: 'var(--glass-highlight)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary)' }}>{mou.year}</span>
                            </div>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{mou.purpose}</p>
                            {mou.benefits && (
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <strong style={{ color: 'var(--secondary)' }}>Focus:</strong> {mou.benefits}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const renderCourseOutcomes = () => {
        const [selectedSemester, setSelectedSemester] = useState('all');
        const [searchTerm, setSearchTerm] = useState('');

        const cosList = department.courseOutcomes || [];
        const semesters = ['all', ...new Set(cosList.map(c => c.semester))];

        const filteredCourses = cosList.filter(course => {
            const matchesSem = selectedSemester === 'all' || course.semester === selectedSemester;
            const matchesSearch = searchTerm === '' ||
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.cos.some(co => co.text.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesSem && matchesSearch;
        });

        const getKBadgeColor = (kLevel) => {
            switch (kLevel) {
                case 'K1': return { bg: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', label: 'K1 • Remember' };
                case 'K2': return { bg: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', label: 'K2 • Understand' };
                case 'K3': return { bg: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', label: 'K3 • Apply' };
                case 'K4': return { bg: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', label: 'K4 • Analyze' };
                case 'K5': return { bg: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', label: 'K5 • Evaluate' };
                default: return { bg: 'rgba(255, 255, 255, 0.1)', color: 'white', label: kLevel };
            }
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <h2 className="section-title" style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                            Course Outcomes (COs)
                        </h2>
                        <span style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px', display: 'block' }}>
                            Choice Based Credit System • Outcome-Based Education (OBE)
                        </span>
                    </div>

                    {department.documents && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {department.documents.map((doc, idx) => (
                                <a
                                    key={idx}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '0.65rem 1.4rem',
                                        borderRadius: '30px',
                                        background: 'rgba(230, 182, 39, 0.12)',
                                        border: '1px solid rgba(230, 182, 39, 0.3)',
                                        color: 'var(--secondary)',
                                        fontSize: '0.85rem',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        transition: '0.2s'
                                    }}
                                >
                                    <FaDownload size={12} /> {doc.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '1.5rem',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {semesters.map(sem => (
                            <button
                                key={sem}
                                onClick={() => setSelectedSemester(sem)}
                                style={{
                                    padding: '0.5rem 1.2rem',
                                    borderRadius: '25px',
                                    border: selectedSemester === sem ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                                    background: selectedSemester === sem ? 'var(--secondary)' : 'transparent',
                                    color: selectedSemester === sem ? 'var(--bg-dark)' : 'var(--text-muted)',
                                    fontWeight: '800',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {sem === 'all' ? 'All Semesters' : sem}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Search by course code, name or outcome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '25px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                            outline: 'none',
                            minWidth: '260px'
                        }}
                    />
                </div>

                {/* Courses Matrix */}
                {filteredCourses.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
                        No course outcomes match your query.
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {filteredCourses.map((course, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{
                                    padding: '1.8rem 2.2rem',
                                    background: 'linear-gradient(90deg, rgba(45, 44, 122, 0.2), rgba(230, 182, 39, 0.05))',
                                    borderBottom: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <span style={{
                                            background: 'var(--secondary)',
                                            color: 'var(--bg-dark)',
                                            padding: '6px 14px',
                                            borderRadius: '8px',
                                            fontWeight: '900',
                                            fontSize: '1rem',
                                            letterSpacing: '1px'
                                        }}>
                                            {course.code}
                                        </span>
                                        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                            {course.name}
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                                            {course.semester}
                                        </span>
                                        <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                                            {course.regulations}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem 2.2rem' }}>
                                    <h5 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--secondary)', marginBottom: '1.2rem' }}>
                                        Course Outcome Statements & Knowledge Levels:
                                    </h5>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {course.cos.map((co, cIdx) => {
                                            const kBadge = getKBadgeColor(co.kLevel);
                                            return (
                                                <div
                                                    key={cIdx}
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '80px 1fr 140px',
                                                        gap: '1.5rem',
                                                        alignItems: 'center',
                                                        background: 'var(--bg-section)',
                                                        padding: '1rem 1.4rem',
                                                        borderRadius: '14px',
                                                        border: '1px solid var(--glass-border)'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '0.95rem' }}>
                                                        {co.id}
                                                    </span>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                                        {co.text}
                                                    </span>
                                                    <span style={{
                                                        background: kBadge.bg,
                                                        color: kBadge.color,
                                                        padding: '4px 10px',
                                                        borderRadius: '20px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '800',
                                                        textAlign: 'center',
                                                        border: `1px solid ${kBadge.color}40`
                                                    }}>
                                                        {kBadge.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderDocuments = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 className="section-title" style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)' }}>
                Official Program Documents
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {department.documents ? department.documents.map((doc, idx) => (
                    <a
                        key={idx}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            padding: '2.5rem 2rem',
                            border: '1px solid var(--glass-border)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: 'rgba(230, 182, 39, 0.12)',
                                color: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                marginBottom: '1.5rem'
                            }}>
                                <FaDownload />
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>
                                {doc.type} Document
                            </span>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                {doc.title}
                            </h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.9rem', marginTop: '2rem' }}>
                            Download Document <FaArrowRight size={12} />
                        </div>
                    </a>
                )) : <p style={{ color: 'var(--text-muted)' }}>Official documents coming soon.</p>}
            </div>
        </div>
    );

    const renderOverview = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {/* 1. HEADER & INTRO CARD */}
            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '32px',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <FaAward /> Flagship Leadership Program • Autonomous
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                    Welcome to <span style={{ color: 'var(--secondary)' }}>{department.name}</span>
                </h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    {department.overview}
                </p>

                {/* Highlight Callout Box */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(45, 44, 122, 0.25), rgba(230, 182, 39, 0.08))',
                    border: '1px solid rgba(230, 182, 39, 0.3)',
                    borderRadius: '20px',
                    padding: '1.6rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem'
                }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--secondary)', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                        <FaRocket />
                    </div>
                    <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '900', color: 'white' }}>
                            Future-Proof Corporate Leadership & Entrepreneurship
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                            Our curriculum combines academic rigor with hands-on corporate case studies, Bloomberg-style financial tools, and direct CXO mentorship.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. VISION & MISSION SHOWCASE BLOCK (Directly in Overview) */}
            {(department.vision || department.mission) && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FaGlobe style={{ color: 'var(--secondary)' }} /> Vision & Mission
                            </h3>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>The strategic foundation guiding our academic and research excellence</span>
                        </div>
                        <button
                            onClick={() => setActiveSection('vision-mission')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--secondary)',
                                fontWeight: '800',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            View Full Vision & Mission <FaArrowRight size={12} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Vision Preview */}
                        {department.vision && (
                            <Tilt3DCard
                                maxTilt={5}
                                glareOpacity={0.1}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '24px',
                                    padding: '2.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.8rem' }}>
                                        <FaGlobe /> Vision
                                    </div>
                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
                                        {Array.isArray(department.vision) ? department.vision[0] : department.vision}
                                    </p>
                                </div>
                                <div style={{ marginTop: '1.5rem', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '800' }}>
                                    • Global Outlook & Ethical Impact
                                </div>
                            </Tilt3DCard>
                        )}

                        {/* Mission Preview */}
                        {department.mission && (
                            <Tilt3DCard
                                maxTilt={5}
                                glareOpacity={0.1}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '24px',
                                    padding: '2.2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.8rem' }}>
                                        <FaRocket /> Key Mission Directives
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {department.mission.slice(0, 2).map((m, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                <span style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)', marginTop: '8px' }} />
                                                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginTop: '1.5rem', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '800' }}>
                                    + {department.mission.length - 2} More Strategic Directives
                                </div>
                            </Tilt3DCard>
                        )}
                    </div>
                </div>
            )}

            {/* 3. PEO, PO & PSO OUTCOMES SHOWCASE BLOCK */}
            {(department.po || department.peo || department.pso) && (
                <div style={{
                    background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(45, 44, 122, 0.12) 100%)',
                    borderRadius: '28px',
                    padding: 'clamp(2rem, 3.5vw, 3rem)',
                    border: '1px solid var(--glass-border)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>
                                <FaAward /> Outcome-Based Education (OBE)
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                Program Outcomes & Objectives (PEO • PO • PSO)
                            </h3>
                        </div>
                        <button
                            onClick={() => setActiveSection('peo-po-pso')}
                            style={{
                                padding: '0.7rem 1.6rem',
                                borderRadius: '30px',
                                background: 'var(--secondary)',
                                color: 'var(--bg-dark)',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Explore All PEO, PO & PSO <FaArrowRight size={12} />
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {department.po && (
                            <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--secondary)', lineHeight: '1', marginBottom: '0.4rem' }}>
                                    {department.po.length}
                                </div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                                    Program Outcomes (POs)
                                </h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    Graduate attributes, engineering & management competencies
                                </span>
                            </div>
                        )}
                        {department.peo && (
                            <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--secondary)', lineHeight: '1', marginBottom: '0.4rem' }}>
                                    {department.peo.length}
                                </div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                                    Educational Objectives (PEOs)
                                </h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    Career success & leadership targets 3-5 years post graduation
                                </span>
                            </div>
                        )}
                        {department.pso && (
                            <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--secondary)', lineHeight: '1', marginBottom: '0.4rem' }}>
                                    {department.pso.length}
                                </div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                                    Specific Outcomes (PSOs)
                                </h4>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    Specialized domain proficiencies in modern technologies
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 4. KEY METRICS 3D CARDS */}
            {department.keyMetrics && (
                <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaChartLine style={{ color: 'var(--secondary)' }} /> Program Highlights & Career Metrics
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {department.keyMetrics.map((stat, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={7}
                                glareOpacity={0.15}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '24px',
                                    padding: '2rem 1.8rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--secondary)', lineHeight: '1', marginBottom: '0.6rem' }}>
                                    {stat.value}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                                        {stat.label}
                                    </h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {stat.desc}
                                    </span>
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. CORE SPECIALIZATIONS & TRACKS */}
            {department.specializations && (
                <div>
                    <div style={{ marginBottom: '1.8rem' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaBullseye style={{ color: 'var(--secondary)' }} /> Industry-Driven Specializations
                        </h3>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem' }}>
                            Choose major & minor dual specializations aligned with high-growth corporate sectors.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
                        {department.specializations.map((spec, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={6}
                                glareOpacity={0.12}
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '22px',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.04)'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            background: 'rgba(230, 182, 39, 0.12)',
                                            color: 'var(--secondary)',
                                            fontSize: '0.75rem',
                                            fontWeight: '800',
                                            border: '1px solid rgba(230, 182, 39, 0.3)'
                                        }}>
                                            {spec.tag}
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.8rem', lineHeight: '1.3' }}>
                                        {spec.title}
                                    </h4>
                                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                        {spec.desc}
                                    </p>
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            )}

            {/* 6. PILLARS OF EXCELLENCE */}
            {department.programFeatures && (
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '28px',
                    padding: '3rem',
                    border: '1px solid var(--glass-border)'
                }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaStar style={{ color: 'var(--secondary)' }} /> The EASA MBA Advantage
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                        {department.programFeatures.map((feat, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px' }}>
                                    <FaCheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                                        {feat.title}
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                        {feat.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. CAREER PATHWAYS & OPPORTUNITIES */}
            {department.careerPaths && (
                <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaBriefcase style={{ color: 'var(--secondary)' }} /> Career Pathways & Leadership Roles
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {department.careerPaths.map((role, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '0.8rem 1.6rem',
                                    borderRadius: '50px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.95rem',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }} />
                                {role}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 6. CALL TO ACTION BAR */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(45, 44, 122, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)',
                borderRadius: '26px',
                padding: '2.5rem',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem'
            }}>
                <div>
                    <h3 style={{ color: 'white', fontSize: '1.6rem', fontWeight: '900', margin: '0 0 6px 0' }}>
                        Ready to Accelerate Your Management Career?
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '0.95rem' }}>
                        Admissions Open for Academic Year 2025 - 2026. Fast-track your application today.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setShowAdmissionForm(true)}
                        style={{
                            padding: '0.9rem 2rem',
                            borderRadius: '50px',
                            background: 'var(--secondary)',
                            color: 'var(--bg-dark)',
                            fontWeight: '900',
                            fontSize: '0.95rem',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Apply for MBA <FaArrowRight size={12} />
                    </button>
                    {department.courseOutcomes && (
                        <button
                            onClick={() => setActiveSection('course-outcomes')}
                            style={{
                                padding: '0.9rem 1.8rem',
                                borderRadius: '50px',
                                background: 'rgba(255,255,255,0.08)',
                                color: 'white',
                                fontWeight: '800',
                                fontSize: '0.95rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                cursor: 'pointer'
                            }}
                        >
                            View Curriculum & COs
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading && !department) {
        return (
            <div style={{ background: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                <Navbar onApplyClick={() => setShowAdmissionForm(true)} />
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Loading Department...</div>
                    <p style={{ color: 'var(--text-muted)' }}>Retrieving academic programs and curriculum details</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!department) {
        return (
            <div style={{ background: 'var(--bg-main)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)' }}>
                <Navbar onApplyClick={() => setShowAdmissionForm(true)} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>Department Not Found</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The requested academic department could not be located.</p>
                    <Link to="/" style={{ padding: '0.8rem 2rem', borderRadius: '50px', background: 'var(--secondary)', color: 'var(--bg-dark)', fontWeight: '800', textDecoration: 'none' }}>
                        Return to Homepage
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title={`Best ${department.type === 'PG' ? 'Master' : 'B.Tech'} in ${department.name} in Coimbatore`}
                description={`Apply for the ${department.name} program at EASA College. Ranked among the top programs, we offer a future-proof curriculum, expert faculty, and 100% placement assistance. Check eligibility, fees, and curriculum.`}
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                defaultTitle={department.name}
                defaultSubtitle="Excellence in Engineering, Management and Professional Leadership"
                defaultImage={department.heroImage}
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '5rem' }}>
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

                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {activeSection === 'overview' && renderOverview()}

                            {activeSection === 'vision-mission' && renderVisionMission()}
                            {activeSection === 'peo-po-pso' && renderPEO()}
                            {activeSection === 'course-outcomes' && renderCourseOutcomes()}
                            {activeSection === 'documents' && renderDocuments()}
                            {activeSection === 'labs' && renderLabs()}
                            {activeSection === 'hod' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)' }}>HOD MESSAGE</h2>
                                    {renderHOD()}
                                </div>
                            )}
                            {activeSection === 'faculty' && renderFaculty()}
                            {activeSection === 'mou' && renderMOU()}
                            {activeSection === 'gallery' && renderGallery()}
                            {activeSection === 'events' && renderEvents()}
                            {activeSection === 'milestones' && renderMilestones()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .container { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; gap: 3rem !important; }
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
                    
                    /* Section Specifics */
                    .section-title { fontSize: 2.5rem !important; }
                    .overview-card, .vision-mission-card, .hod-section, .milestones-section { padding: 2.5rem !important; }
                    .hod-section { grid-template-columns: 1fr !important; text-align: center; gap: 2rem !important; }
                    .hod-image-container { margin: 0 auto; }
                    .milestone-line { left: 2.5rem !important; }
                    .milestone-item { gap: 1.5rem !important; }
                    .milestone-dot { width: 16px !important; height: 16px !important; margin-top: 5px !important; }
                }

                @media (max-width: 768px) {
                    .container { padding: 6rem 1rem !important; } /* Adjust for fixed header */
                    .section-title { fontSize: 2rem !important; }
                    
                    /* HOD Section Mobile */
                    .hod-section { padding: 2rem 1.5rem !important; }
                    .hod-image-container { width: 180px !important; height: 180px !important; }
                    
                    /* Milestones Mobile */
                    .milestones-section { padding: 1.5rem !important; }
                    .milestone-line { display: none; }
                    .milestone-item { flex-direction: column; gap: 1rem !important; }
                    .milestone-dot { display: none; }
                    
                    /* Events Mobile */
                    .event-card { flex-direction: column; text-align: center; padding: 1.5rem !important; gap: 1rem !important; }
                    
                    /* General Padding Reduction */
                    .overview-card, .vision-mission-card { padding: 1.5rem !important; }
                }
            `}</style>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default DepartmentPage;
