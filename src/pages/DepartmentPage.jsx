import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap, FaBook, FaChalkboardTeacher, FaTrophy,
    FaCalendarAlt, FaDownload, FaArrowRight, FaUniversity, FaUsers, FaLightbulb, FaRocket, FaGlobe, FaChevronRight,
    FaBalanceScale, FaLaptopCode, FaStar, FaHandHoldingHeart, FaGlobeAsia, FaImages, FaFlask, FaHandshake, FaFileSignature,
    FaChartLine, FaBriefcase, FaBullseye, FaCheckCircle, FaAward, FaBoxes, FaFilePdf, FaEye, FaTimes, FaExternalLinkAlt,
    FaSearch, FaEdit, FaLayerGroup, FaShieldAlt
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import { getDepartment } from '../data/departmentsData';
import { SYLLABUS_DATA, GENERIC_FIRST_YEAR, getDetailedSyllabusForSubject } from '../data/syllabusData';
import { useAuth } from '../context/AuthContext';
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
    const { user } = useAuth();
    const [department, setDepartment] = useState(() => getDepartment(id) || null);
    const [deptSyllabusData, setDeptSyllabusData] = useState(null);
    const [selectedCurriculumSem, setSelectedCurriculumSem] = useState('1');
    const [selectedSubjectModal, setSelectedSubjectModal] = useState(null);
    const [curriculumSearch, setCurriculumSearch] = useState('');
    const [loading, setLoading] = useState(!department);
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [facultyList, setFacultyList] = useState([]);
    const [galleryData, setGalleryData] = useState({ events: [], images: [] });
    const [deptEvents, setDeptEvents] = useState([]);
    const [deptLabsList, setDeptLabsList] = useState([]);
    const [peoActiveTab, setPeoActiveTab] = useState('all');
    const [facultyFilter, setFacultyFilter] = useState('All');
    const [selectedPoster, setSelectedPoster] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const isSH = department?.slug === 'science-and-humanities' || department?.id === 'science-and-humanities' || id === 'science-and-humanities' || id === 'sh' || (department?.slug || '').toLowerCase().includes('science') && (department?.slug || '').toLowerCase().includes('humanities') || (department?.name || '').toLowerCase().includes('science') && (department?.name || '').toLowerCase().includes('humanities') || (department?.name || '').toLowerCase().includes('science & humanities');

    // Navigation sections list
    const sections = [
        { id: 'overview', label: 'Overview', icon: <FaUniversity /> },
        ...(!isSH ? [{ id: 'vision-mission', label: 'Vision & Mission', icon: <FaGlobe /> }] : []),
        ...(!isSH ? [{ id: 'peo-po-pso', label: 'PEO, PO & PSO', icon: <FaGraduationCap /> }] : []),
        { id: 'curriculum', label: 'Curriculum & Detailed Syllabus', icon: <FaLaptopCode /> },
        ...(department?.courseOutcomes ? [{ id: 'course-outcomes', label: 'Course Outcomes', icon: <FaBook /> }] : []),
        ...(department?.documents ? [{ id: 'documents', label: 'Downloads & Syllabi', icon: <FaDownload /> }] : []),
        { id: 'labs', label: 'Laboratories', icon: <FaFlask /> },
        { id: 'hod', label: isSH ? 'Dean Desk' : 'HOD Desk', icon: <FaChalkboardTeacher /> },
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
        if (activeSection === 'labs' && id) {
            fetch(`${API_BASE_URL}/api/departments/${id}/labs`)
                .then(res => res.json())
                .then(data => { if (Array.isArray(data)) setDeptLabsList(data); })
                .catch(err => console.error("Error fetching labs:", err));
        }
    }, [activeSection, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const staticDept = getDepartment(id);
        if (staticDept) {
            setDepartment(staticDept);
            if (staticDept.slug !== id) {
                navigate(`/department/${staticDept.slug}`, { replace: true });
            }
        } else {
            setDepartment(null);
        }
        setLoading(false);

        // Fetch dynamic syllabus & curriculum from database
        const targetSlug = staticDept?.slug || id;
        if (targetSlug) {
            fetch(`${API_BASE_URL}/api/departments/${targetSlug}`)
                .then(res => res.json())
                .then(data => {
                    if (data && (data.subjects || data.vision || data.mission)) {
                        setDeptSyllabusData(data);
                    }
                })
                .catch(err => console.error("Error fetching department syllabus:", err));
        }
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

            {(!isSH && (department.vision || department.mission?.length > 0)) && (
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
                                {department.mission?.map((item, idx) => {
                                    const match = typeof item === 'string' ? item.match(/^(M\d+)\s*:\s*(.*)$/i) : null;
                                    const tag = match ? match[1].toUpperCase() : (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`);
                                    const text = match ? match[2] : item;
                                    return (
                                        <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <span style={{
                                                minWidth: '38px',
                                                height: '28px',
                                                padding: '0 6px',
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
                                                {tag}
                                            </span>
                                            <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>
                                                {text}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '800' }}>
                            <FaCheckCircle /> Academic-Industry Bridge & Innovation
                        </div>
                    </Tilt3DCard>
                </div>
            )}
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
                        ...(department.wk?.length ? [{ id: 'wk', label: `Knowledge Profile - WK (${department.wk.length})` }] : []),
                        { id: 'pso', label: `PSOs (${department.pso?.length || 0})` },
                        ...(department.peo?.length ? [{ id: 'peo', label: `PEOs (${department.peo.length})` }] : [])
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

            {/* KNOWLEDGE AND ATTITUDE PROFILE (WK) */}
            {department.wk && (peoActiveTab === 'all' || peoActiveTab === 'wk') && (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                        <span style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.15)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <FaBook />
                        </span>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                Knowledge and Attitude Profile (WK)
                            </h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Foundational scientific, mathematical, engineering, and ethical competencies</span>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.3rem' }}>
                        {department.wk.map((wk, idx) => {
                            const hasColon = typeof wk === 'string' && wk.includes(':');
                            const rawTitle = hasColon ? wk.split(':')[0] : (typeof wk === 'string' ? `WK ${idx + 1}` : wk.title || wk.code || `WK ${idx + 1}`);
                            const description = hasColon ? wk.split(':').slice(1).join(':').trim() : (typeof wk === 'string' ? wk.trim() : wk.description);
                            const tag = rawTitle.split(' ')[0];
                            const subtitle = rawTitle.split(' ').slice(1).join(' ') || 'Knowledge Competency';

                            return (
                                <Tilt3DCard
                                    key={idx}
                                    maxTilt={4}
                                    glareOpacity={0.08}
                                    style={{
                                        padding: '1.8rem 2rem',
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.8rem',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{
                                            padding: '0.35rem 0.8rem',
                                            borderRadius: '8px',
                                            background: 'rgba(230, 182, 39, 0.15)',
                                            color: 'var(--secondary)',
                                            fontWeight: '900',
                                            fontSize: '0.85rem',
                                            border: '1px solid rgba(230, 182, 39, 0.3)'
                                        }}>
                                            {tag}
                                        </span>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                                            {subtitle}
                                        </h4>
                                    </div>
                                    <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                        {description}
                                    </p>
                                </Tilt3DCard>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 2. PROGRAM SPECIFIC OUTCOMES (PSOs) */}
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
                        {department.pso.map((pso, idx) => {
                            const strPso = typeof pso === 'string' ? pso : (pso.description ? `${pso.code || `PSO${idx + 1}`}: ${pso.description}` : pso.title);
                            const match = strPso.match(/^(PSO\d+)\s*:\s*(.*)$/i);
                            const tag = match ? match[1].toUpperCase() : `PSO ${idx + 1}`;
                            const text = match ? match[2] : strPso;
                            return (
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
                                            {tag}
                                        </div>
                                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                                            {text}
                                        </p>
                                    </div>
                                </Tilt3DCard>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 3. PROGRAM EDUCATIONAL OBJECTIVES (PEOs) */}
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
                        {department.peo.map((peo, idx) => {
                            const strPeo = typeof peo === 'string' ? peo : (peo.description ? `${peo.code || `PEO${idx + 1}`}: ${peo.description}` : peo.title);
                            const match = strPeo.match(/^(PEO\d+)[:.]?\s*(.*)$/i);
                            const tag = match ? match[1].toUpperCase() : (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`);
                            const text = match ? match[2] : strPeo;

                            return (
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
                                            display: 'inline-flex',
                                            padding: '0.4rem 0.9rem',
                                            borderRadius: '12px',
                                            background: 'rgba(230, 182, 39, 0.12)',
                                            color: 'var(--secondary)',
                                            fontWeight: '900',
                                            fontSize: '0.9rem',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1.2rem',
                                            border: '1px solid rgba(230, 182, 39, 0.3)'
                                        }}>
                                            {tag.startsWith('PEO') ? tag : `PEO ${tag}`}
                                        </div>
                                        <h5 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--secondary)', marginBottom: '0.6rem' }}>
                                            Objective {idx + 1}
                                        </h5>
                                        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                                            {text}
                                        </p>
                                    </div>
                                </Tilt3DCard>
                            );
                        })}
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

    const renderHOD = () => {
        if (!department.hod) return null;
        return (
            <div
                className="hod-section"
                style={{
                    background: 'var(--bg-card)',
                    borderRadius: '32px',
                    padding: 'clamp(2rem, 3.5vw, 3.5rem)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
                }}
            >
                {/* Top Row: Photo next to Role / Name */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    paddingBottom: '2rem',
                    borderBottom: '1px solid var(--glass-border)'
                }}>
                    {/* Photo Container */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div
                            className="hod-image-container"
                            style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid rgba(230, 182, 39, 0.5)',
                                boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                                background: 'linear-gradient(135deg, rgba(45, 44, 122, 0.2), rgba(230, 182, 39, 0.15))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {department.hod.image ? (
                                <img
                                    src={department.hod.image}
                                    alt={department.hod.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                                />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                                    <FaChalkboardTeacher size={55} />
                                </div>
                            )}
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            background: 'var(--secondary)',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--bg-dark)',
                            fontSize: '1.1rem',
                            border: '3px solid var(--bg-card)',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}>
                            <FaChalkboardTeacher />
                        </div>
                    </div>

                    {/* Next to Photo: Name and Role */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: '240px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '0.35rem 0.9rem',
                            borderRadius: '20px',
                            background: 'rgba(230, 182, 39, 0.12)',
                            border: '1px solid rgba(230, 182, 39, 0.3)',
                            color: 'var(--secondary)',
                            fontSize: '0.78rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            width: 'fit-content',
                            marginBottom: '4px'
                        }}>
                            <FaAward /> {isSH ? 'Dean Desk' : 'HOD Desk'}
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', margin: 0, lineHeight: '1.2' }}>
                            {department.hod.name}
                        </h3>
                        <div style={{ fontSize: '1.05rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '2px' }}>
                            {department.hod.designation}
                        </div>
                    </div>
                </div>

                {/* Below: Full Message Box */}
                <div style={{
                    background: 'linear-gradient(145deg, rgba(45, 44, 122, 0.12) 0%, rgba(230, 182, 39, 0.04) 100%)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: '1px solid var(--glass-border)',
                    position: 'relative'
                }}>
                    <span style={{ fontSize: '5rem', color: 'var(--secondary)', opacity: 0.18, position: 'absolute', top: '-20px', left: '15px', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' }}>“</span>
                    <p style={{
                        fontSize: '1.18rem',
                        lineHeight: '1.9',
                        color: 'var(--text-muted)',
                        position: 'relative',
                        zIndex: 1,
                        textAlign: 'justify',
                        margin: 0
                    }}>
                        {department.hod.message}
                    </p>
                    <span style={{ fontSize: '5rem', color: 'var(--secondary)', opacity: 0.18, position: 'absolute', bottom: '-45px', right: '20px', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' }}>”</span>
                </div>
            </div>
        );
    };

    const renderFaculty = () => {
        const displayFaculty = facultyList.length > 0 ? facultyList : (department?.faculty || []);
        const subjects = ['All', ...new Set(displayFaculty.map(f => f.subject || f.researchArea).filter(Boolean))];
        const filteredFaculty = facultyFilter === 'All'
            ? displayFaculty
            : displayFaculty.filter(f => (f.subject || f.researchArea) === facultyFilter);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0.45rem 1.1rem',
                            borderRadius: '30px',
                            background: 'rgba(230, 182, 39, 0.12)',
                            border: '1px solid rgba(230, 182, 39, 0.3)',
                            color: 'var(--secondary)',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            marginBottom: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            <FaUniversity /> Department of {department?.name}
                        </div>
                        <h2 className="section-title" style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                            Faculty Members
                        </h2>
                        <span style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '6px', display: 'block' }}>
                            Distinguished Faculty & Mentors • Department of {department?.name}
                        </span>
                    </div>

                    {/* Department Discipline Filters */}
                    {subjects.length > 2 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {subjects.map((sub, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setFacultyFilter(sub)}
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        borderRadius: '25px',
                                        border: facultyFilter === sub ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                                        background: facultyFilter === sub ? 'var(--secondary)' : 'var(--bg-card)',
                                        color: facultyFilter === sub ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        fontWeight: '800',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {displayFaculty.length === 0 ? (
                    <div style={{
                        background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(45, 44, 122, 0.12) 100%)',
                        borderRadius: '28px',
                        padding: 'clamp(2.5rem, 5vw, 4rem)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Background subtle watermark icon */}
                        <div style={{
                            position: 'absolute',
                            right: '-20px',
                            bottom: '-20px',
                            fontSize: '12rem',
                            color: 'var(--secondary)',
                            opacity: 0.03,
                            pointerEvents: 'none'
                        }}>
                            <FaChalkboardTeacher />
                        </div>

                        {/* Top Section */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.8rem', flexWrap: 'wrap' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, rgba(230, 182, 39, 0.2), rgba(45, 44, 122, 0.3))',
                                border: '1px solid rgba(230, 182, 39, 0.4)',
                                color: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                flexShrink: 0,
                                boxShadow: '0 8px 25px rgba(230, 182, 39, 0.15)'
                            }}>
                                <FaUsers />
                            </div>

                            <div style={{ flex: 1, minWidth: '280px' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '0.3rem 0.85rem',
                                    borderRadius: '20px',
                                    background: 'rgba(230, 182, 39, 0.12)',
                                    border: '1px solid rgba(230, 182, 39, 0.3)',
                                    color: 'var(--secondary)',
                                    fontSize: '0.78rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '0.8rem'
                                }}>
                                    <FaAward /> Academic Faculty Directory
                                </div>
                                <h3 style={{ fontSize: '1.9rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 0.8rem 0' }}>
                                    Faculty Profiles Updating for Current Session
                                </h3>
                                <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: '1.75', margin: 0, maxWidth: '850px' }}>
                                    The comprehensive faculty directory and research portfolio for the <strong>Department of {department?.name}</strong> is actively being updated. Our department features experienced academicians, doctorates, and industry veterans committed to student mentorship and research excellence.
                                </p>
                            </div>
                        </div>

                        {/* Metric Highlights Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.2rem',
                            marginTop: '0.5rem'
                        }}>
                            <div style={{
                                background: 'var(--bg-section)',
                                padding: '1.4rem',
                                borderRadius: '18px',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.12)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                    <FaUsers />
                                </span>
                                <div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)' }}>{department?.facultyCount || 'Experienced'}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Faculty Mentors</div>
                                </div>
                            </div>

                            <div style={{
                                background: 'var(--bg-section)',
                                padding: '1.4rem',
                                borderRadius: '18px',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.12)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                    <FaGraduationCap />
                                </span>
                                <div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)' }}>{department?.studentCount || 'Enrolled'}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Student Scholars</div>
                                </div>
                            </div>

                            <div style={{
                                background: 'var(--bg-section)',
                                padding: '1.4rem',
                                borderRadius: '18px',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.12)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                    <FaFlask />
                                </span>
                                <div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)' }}>{department?.labCount || '2+'}</div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Labs & Research Facilities</div>
                                </div>
                            </div>
                        </div>

                        {/* Department Head Spotlight Card */}
                        {department?.hod && (
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(230, 182, 39, 0.08) 0%, rgba(45, 44, 122, 0.08) 100%)',
                                borderRadius: '20px',
                                padding: '1.8rem 2rem',
                                border: '1px solid rgba(230, 182, 39, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap' }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '2px solid var(--secondary)',
                                        background: 'var(--bg-dark)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--secondary)',
                                        fontSize: '1.6rem',
                                        flexShrink: 0
                                    }}>
                                        {department.hod.image ? (
                                            <img src={department.hod.image} alt={department.hod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <FaChalkboardTeacher />
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Department Leadership
                                        </div>
                                        <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)', margin: '0.2rem 0' }}>
                                            {department.hod.name}
                                        </h4>
                                        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                                            {department.hod.designation} • Department of {department.name}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveSection('hod')}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '0.75rem 1.4rem',
                                        borderRadius: '25px',
                                        background: 'var(--secondary)',
                                        color: 'var(--bg-dark)',
                                        fontWeight: '800',
                                        fontSize: '0.88rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    View {isSH ? 'Dean' : 'HOD'} Desk <FaArrowRight />
                                </button>
                            </div>
                        )}

                        {/* Quick Action Links */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
                            {department?.hod && (
                                <button
                                    onClick={() => setActiveSection('hod')}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '30px',
                                        background: 'rgba(230, 182, 39, 0.15)',
                                        border: '1px solid rgba(230, 182, 39, 0.35)',
                                        color: 'var(--secondary)',
                                        fontWeight: '800',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaChalkboardTeacher /> {isSH ? 'Dean Desk' : 'HOD Desk'}
                                </button>
                            )}
                            <button
                                onClick={() => setActiveSection('overview')}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '30px',
                                    background: 'var(--bg-section)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-main)',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaUniversity /> Program Overview
                            </button>
                            <button
                                onClick={() => setShowAdmissionForm(true)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '30px',
                                    background: 'var(--primary)',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaGraduationCap /> Academic Inquiries
                            </button>
                        </div>
                    </div>
                ) : filteredFaculty.length === 0 ? (
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '20px',
                        padding: '3rem 2rem',
                        border: '1px solid var(--glass-border)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'rgba(230, 182, 39, 0.12)',
                            color: 'var(--secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            <FaUsers />
                        </div>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                            No faculty profiles found for "{facultyFilter}"
                        </h4>
                        <p style={{ color: 'var(--text-muted)', margin: 0, maxWidth: '500px', fontSize: '0.95rem' }}>
                            Try selecting another discipline filter or view all faculty members in this department.
                        </p>
                        <button
                            onClick={() => setFacultyFilter('All')}
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.6rem 1.4rem',
                                borderRadius: '25px',
                                background: 'var(--secondary)',
                                color: 'var(--bg-dark)',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Show All Faculty
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.8rem' }}>
                        {filteredFaculty.map((fac, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '20px',
                                    padding: '1.6rem 1.8rem',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1.2rem',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '14px',
                                        background: 'rgba(230, 182, 39, 0.12)',
                                        border: '1px solid rgba(230, 182, 39, 0.3)',
                                        color: 'var(--secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        fontWeight: '800',
                                        flexShrink: 0,
                                        marginTop: '2px'
                                    }}
                                >
                                    <FaChalkboardTeacher />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
                                    {/* Line 1: Name */}
                                    <h4 style={{ fontSize: '1.18rem', fontWeight: '800', margin: 0, color: 'var(--text-main)', lineHeight: '1.3' }}>
                                        {fac.name}
                                    </h4>
                                    {/* Line 2: Designation */}
                                    <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {fac.designation}
                                    </div>
                                    {/* Line 3: Department / Subject */}
                                    {(fac.subject || fac.researchArea) && (
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                            <FaFlask style={{ color: 'var(--secondary)', fontSize: '0.82rem' }} />
                                            <span>{fac.subject || fac.researchArea}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderGallery = () => {
        // Consolidate all photos into a single list for unified grid display
        const allPhotos = [];

        if (Array.isArray(galleryData?.events)) {
            galleryData.events.forEach(event => {
                if (Array.isArray(event.photos) && event.photos.length > 0) {
                    event.photos.forEach(photo => {
                        const src = typeof photo === 'string' ? photo : (photo.src || photo.url || photo.image);
                        if (src) {
                            allPhotos.push({
                                src,
                                title: photo.caption || event.eventName || 'Department Photo',
                                date: event.date
                            });
                        }
                    });
                } else if (event.image) {
                    allPhotos.push({
                        src: event.image,
                        title: event.eventName || 'Department Photo',
                        date: event.date
                    });
                }
            });
        }

        if (Array.isArray(galleryData?.images)) {
            galleryData.images.forEach(img => {
                const src = typeof img === 'string' ? img : (img.src || img.url || img.image);
                if (src) {
                    allPhotos.push({
                        src,
                        title: img.caption || 'Department Photo'
                    });
                }
            });
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <FaImages style={{ color: 'var(--secondary)' }} /> Campus & Department Gallery
                        </h3>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            Smart classrooms, laboratories, campus life, workshops, and facilities
                        </span>
                    </div>
                    {allPhotos.length > 0 && (
                        <span style={{
                            padding: '6px 16px',
                            borderRadius: '20px',
                            background: 'rgba(230, 182, 39, 0.12)',
                            color: 'var(--secondary)',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            border: '1px solid rgba(230, 182, 39, 0.25)'
                        }}>
                            {allPhotos.length} {allPhotos.length === 1 ? 'Photo' : 'Photos'}
                        </span>
                    )}
                </div>

                {allPhotos.length === 0 ? (
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
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {allPhotos.map((photo, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4) }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                onClick={() => setSelectedPoster({ url: photo.src, title: photo.title })}
                                style={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    height: '240px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                                    cursor: 'pointer'
                                }}
                                className="gallery-photo-card"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.title || 'Department Gallery'}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    className="gallery-photo-img"
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(5, 10, 24, 0.88) 0%, rgba(5, 10, 24, 0.15) 60%, transparent 100%)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        padding: '1.2rem'
                                    }}
                                    className="gallery-photo-overlay"
                                >
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '50%',
                                            background: 'rgba(230, 182, 39, 0.95)',
                                            color: 'var(--bg-dark)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.9rem',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                                        }}>
                                            <FaEye />
                                        </div>
                                    </div>
                                    {photo.title && !photo.title.toUpperCase().includes('PHOTO') && (
                                        <span style={{
                                            color: '#ffffff',
                                            fontSize: '0.95rem',
                                            fontWeight: '800',
                                            textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                                        }}>
                                            {photo.title}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderEvents = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FaCalendarAlt style={{ color: 'var(--secondary)' }} /> Department Events & Highlights
                    </h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Workshops, technical symposiums, guest lectures, and student initiatives
                    </span>
                </div>
                {deptEvents.length > 0 && (
                    <span style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        background: 'rgba(230, 182, 39, 0.12)',
                        color: 'var(--secondary)',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        border: '1px solid rgba(230, 182, 39, 0.25)'
                    }}>
                        {deptEvents.length} {deptEvents.length === 1 ? 'Event' : 'Events'} Available
                    </span>
                )}
            </div>

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
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {deptEvents.map((event, idx) => {
                        const eventDate = event.date ? new Date(event.date) : new Date();
                        const day = !isNaN(eventDate.getTime()) ? eventDate.getDate() : '--';
                        const month = !isNaN(eventDate.getTime()) ? eventDate.toLocaleString('default', { month: 'short' }).toUpperCase() : 'DATE';
                        const year = !isNaN(eventDate.getTime()) ? eventDate.getFullYear() : '';
                        const hasPdf = Boolean(event.pdf_url || event.pdfUrl || event.brochure || event.fileUrl);
                        const pdfLink = event.pdf_url || event.pdfUrl || event.brochure || event.fileUrl;
                        const posterImage = event.image || event.poster;

                        return (
                            <motion.div
                                key={event._id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                whileHover={{ y: -6 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 12px 35px rgba(0,0,0,0.06)',
                                    position: 'relative'
                                }}
                            >
                                {/* Event Poster / Banner Header */}
                                <div
                                    style={{
                                        height: '220px',
                                        width: '100%',
                                        position: 'relative',
                                        background: 'linear-gradient(135deg, rgba(27, 42, 107, 0.45) 0%, rgba(15, 23, 42, 0.85) 100%)',
                                        overflow: 'hidden',
                                        cursor: posterImage ? 'pointer' : 'default'
                                    }}
                                    onClick={() => posterImage && setSelectedPoster({ url: posterImage, title: event.title })}
                                >
                                    {posterImage ? (
                                        <>
                                            <img
                                                src={posterImage}
                                                alt={event.title || 'Event Poster'}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease'
                                                }}
                                                className="event-poster-img"
                                            />
                                            {/* Hover overlay hint */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                background: 'rgba(0,0,0,0.7)',
                                                backdropFilter: 'blur(8px)',
                                                color: '#ffffff',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                            }}>
                                                <FaEye size={12} /> View Poster
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--secondary)',
                                            gap: '8px'
                                        }}>
                                            <FaCalendarAlt size={48} style={{ opacity: 0.6 }} />
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>Academic Event</span>
                                        </div>
                                    )}

                                    {/* Date Floating Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 12,
                                        left: 14,
                                        background: 'rgba(15, 23, 42, 0.9)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(230, 182, 39, 0.4)',
                                        borderRadius: '14px',
                                        padding: '6px 14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#ffffff',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.35)'
                                    }}>
                                        <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--secondary)', lineHeight: 1 }}>{day}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1 }}>{month}</span>
                                            {year && <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>{year}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Event Body */}
                                <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '1.2rem' }}>
                                    <div>
                                        <h4 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: '900',
                                            color: 'var(--text-main)',
                                            margin: '0 0 0.6rem 0',
                                            lineHeight: '1.4'
                                        }}>
                                            {event.title}
                                        </h4>
                                        {event.desc && (
                                            <p style={{
                                                fontSize: '0.92rem',
                                                color: 'var(--text-muted)',
                                                lineHeight: '1.6',
                                                margin: 0,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {event.desc}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons: PDF View & Download */}
                                    {hasPdf && (
                                        <div style={{
                                            display: 'flex',
                                            gap: '10px',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid var(--glass-border)',
                                            flexWrap: 'wrap'
                                        }}>
                                            {/* View PDF */}
                                            <button
                                                onClick={() => setSelectedPdf({ url: pdfLink, title: event.title })}
                                                style={{
                                                    flex: 1,
                                                    minWidth: '120px',
                                                    padding: '0.65rem 1rem',
                                                    borderRadius: '12px',
                                                    background: 'rgba(230, 182, 39, 0.12)',
                                                    border: '1px solid rgba(230, 182, 39, 0.35)',
                                                    color: 'var(--secondary)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <FaEye size={14} /> View PDF
                                            </button>

                                            {/* Download PDF */}
                                            <a
                                                href={pdfLink}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    flex: 1,
                                                    minWidth: '120px',
                                                    padding: '0.65rem 1rem',
                                                    borderRadius: '12px',
                                                    background: 'var(--secondary)',
                                                    border: 'none',
                                                    color: 'var(--bg-dark)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '900',
                                                    textDecoration: 'none',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <FaDownload size={13} /> Download PDF
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );

    const renderLabs = () => {
        const displayLabs = deptLabsList.length > 0 ? deptLabsList : (department?.labs || []);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <FaFlask style={{ color: 'var(--secondary)' }} /> Department Laboratories & Facilities
                        </h3>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            Equipped with industry-standard hardware, cutting-edge software suites, and research apparatus
                        </span>
                    </div>
                    {displayLabs.length > 0 && (
                        <span style={{
                            padding: '6px 16px',
                            borderRadius: '20px',
                            background: 'rgba(230, 182, 39, 0.12)',
                            color: 'var(--secondary)',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            border: '1px solid rgba(230, 182, 39, 0.25)'
                        }}>
                            {displayLabs.length} {displayLabs.length === 1 ? 'Lab' : 'Labs'} Configured
                        </span>
                    )}
                </div>

                {displayLabs.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '5rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '28px',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)'
                    }}>
                        <FaFlask size={45} style={{ color: 'var(--secondary)', opacity: 0.5, marginBottom: '1rem' }} />
                        <h4 style={{ fontSize: '1.4rem', color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>Laboratories Information Updating</h4>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>High-tech laboratory details and photos will be displayed here soon.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {displayLabs.map((lab, idx) => (
                            <motion.div
                                key={lab._id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: idx * 0.05 }}
                                whileHover={{ y: -6 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
                                }}
                            >
                                <div
                                    style={{
                                        height: '220px',
                                        background: 'linear-gradient(135deg, rgba(27, 42, 107, 0.3) 0%, rgba(15, 23, 42, 0.7) 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: lab.image ? 'pointer' : 'default'
                                    }}
                                    onClick={() => lab.image && setSelectedPoster({ url: lab.image, title: `${lab.name} - Laboratory Photo`, hideDownload: true })}
                                >
                                    {lab.image ? (
                                        <>
                                            <img
                                                src={lab.image}
                                                alt={lab.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                                className="event-poster-img"
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                background: 'rgba(0,0,0,0.7)',
                                                backdropFilter: 'blur(8px)',
                                                color: '#ffffff',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                border: '1px solid rgba(255,255,255,0.2)'
                                            }}>
                                                <FaEye size={12} /> View Photo
                                            </div>
                                        </>
                                    ) : (
                                        <FaFlask size={50} style={{ color: 'var(--secondary)', opacity: 0.6 }} />
                                    )}
                                </div>
                                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', gap: '1rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.6rem', color: 'var(--text-main)', lineHeight: '1.3' }}>
                                            {lab.name}
                                        </h4>
                                        {lab.description && (
                                            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                                {lab.description}
                                            </p>
                                        )}
                                    </div>
                                    {lab.equipment && (
                                        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                                            <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--secondary)', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
                                                Key Equipment / Software:
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                                                {lab.equipment}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

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

    const renderCurriculum = () => {
        const categoryColors = {
            'HUM': { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)', label: 'Humanities & Management (HUM)' },
            'BSC': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)', label: 'Basic Sciences (BSC)' },
            'ESC': { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)', label: 'Engineering Sciences (ESC)' },
            'PCC': { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)', label: 'Professional Core (PCC)' },
            'PEC': { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6', border: 'rgba(236, 72, 153, 0.3)', label: 'Professional Electives (PEC)' },
            'OEC': { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)', label: 'Open Electives (OEC)' },
            'EEC': { bg: 'rgba(6, 182, 212, 0.15)', text: '#22d3ee', border: 'rgba(6, 182, 212, 0.3)', label: 'Employability Enhancement (EEC)' },
            'MC': { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.3)', label: 'Mandatory Course (MC)' },
        };

        const getCategoryBadge = (cat) => {
            const key = (cat || 'PCC').toUpperCase().trim();
            const config = categoryColors[key] || { bg: 'rgba(255, 255, 255, 0.1)', text: '#e2e8f0', border: 'rgba(255, 255, 255, 0.2)', label: key };
            return (
                <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    background: config.bg,
                    color: config.text,
                    border: `1px solid ${config.border}`,
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    letterSpacing: '0.5px'
                }}>
                    {key}
                </span>
            );
        };

        const getRbtBadge = (rbtLevel) => {
            const level = (rbtLevel || 'Apply').toLowerCase();
            let label = rbtLevel || 'Apply';
            let bg = 'rgba(230, 182, 39, 0.15)';
            let color = 'var(--secondary)';

            if (level.includes('rem') || level === 'k1') { label = 'K1 • Remember'; bg = 'rgba(56, 189, 248, 0.15)'; color = '#38bdf8'; }
            else if (level.includes('und') || level === 'k2') { label = 'K2 • Understand'; bg = 'rgba(74, 222, 128, 0.15)'; color = '#4ade80'; }
            else if (level.includes('app') || level === 'k3') { label = 'K3 • Apply'; bg = 'rgba(230, 182, 39, 0.15)'; color = 'var(--secondary)'; }
            else if (level.includes('ana') || level === 'k4') { label = 'K4 • Analyze'; bg = 'rgba(192, 132, 252, 0.15)'; color = '#c084fc'; }
            else if (level.includes('eval') || level === 'k5') { label = 'K5 • Evaluate'; bg = 'rgba(244, 63, 94, 0.15)'; color = '#f43f5e'; }
            else if (level.includes('cre') || level === 'k6') { label = 'K6 • Create'; bg = 'rgba(236, 72, 153, 0.15)'; color = '#ec4899'; }

            return (
                <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    background: bg,
                    color: color,
                    fontSize: '0.75rem',
                    fontWeight: '800'
                }}>
                    {label}
                </span>
            );
        };

        // Gather all subjects from dynamic data or static fallbacks
        const dynamicSubjects = (deptSyllabusData && deptSyllabusData.subjects && deptSyllabusData.subjects.length > 0)
            ? deptSyllabusData.subjects
            : [];

        // Build all semester courses list
        let allCourses = [];
        if (dynamicSubjects.length > 0) {
            allCourses = dynamicSubjects.map(s => ({
                id: s._id || s.code,
                semester: s.semester ? Number(s.semester) : (s.vertical ? 'PE' : 1),
                vertical: s.vertical || '',
                verticalName: s.verticalName || '',
                code: s.code || '',
                title: s.title || '',
                name: s.title || '',
                category: s.category || 'THEORY',
                categoryType: s.categoryType || 'PCC',
                l: s.l !== undefined ? s.l : 3,
                t: s.t !== undefined ? s.t : 0,
                p: s.p !== undefined ? s.p : 0,
                credits: s.credits !== undefined ? s.credits : 3,
                contactPeriods: s.contactPeriods || ((s.l || 0) + (s.t || 0) + (s.p || 0)),
                cia: s.cia || 40,
                ese: s.ese || 60,
                total: s.total || 100,
                isOpenElective: !!s.isOpenElective,
                courseObjectives: s.courseObjectives || [],
                units: s.units || [],
                courseOutcomes: s.courseOutcomes || [],
                textBooks: s.textBooks || [],
                referenceBooks: s.referenceBooks || [],
                webReferences: s.webReferences || []
            }));
        } else if (department.curriculum && department.curriculum.length > 0) {
            department.curriculum.forEach((semBlock, bIdx) => {
                const semNum = semBlock.semester ? Number(String(semBlock.semester).replace(/\D/g, '')) || (bIdx + 1) : (bIdx + 1);
                (semBlock.courses || []).forEach(c => {
                    allCourses.push({
                        ...c,
                        semester: semNum,
                        categoryType: c.categoryType || (c.credits > 2 ? 'PCC' : 'ESC'),
                        contactPeriods: (c.l || 3) + (c.t || 0) + (c.p || 0),
                        cia: 40,
                        ese: 60,
                        total: 100
                    });
                });
            });
        } else {
            const staticSyllabus = SYLLABUS_DATA["R-2023"]?.["UG"]?.[department?.slug] || [];
            staticSyllabus.forEach(semBlock => {
                (semBlock.courses || []).forEach(c => {
                    allCourses.push({
                        ...c,
                        name: c.title,
                        semester: semBlock.semester,
                        categoryType: c.category?.includes('Humanities') ? 'HUM' : c.category?.includes('Basic') ? 'BSC' : c.category?.includes('Core') ? 'PCC' : 'ESC',
                        l: 3, t: 0, p: 0, credits: 3, contactPeriods: 3, cia: 40, ese: 60, total: 100
                    });
                });
            });
        }

        // Available semester tabs
        const totalSems = department?.type === 'PG' ? 4 : 8;
        const semTabs = [];
        for (let i = 1; i <= totalSems; i++) {
            semTabs.push({ id: String(i), label: `Semester ${i}` });
        }
        semTabs.push({ id: 'PE', label: 'Professional Electives' });
        semTabs.push({ id: 'OE', label: 'Open Electives' });
        semTabs.push({ id: 'all', label: 'All Courses (1-8)' });

        // Filter courses by semester & search
        const filteredCourses = allCourses.filter(course => {
            const matchesSearch = !curriculumSearch ||
                (course.code || '').toLowerCase().includes(curriculumSearch.toLowerCase()) ||
                (course.title || course.name || '').toLowerCase().includes(curriculumSearch.toLowerCase()) ||
                (course.categoryType || '').toLowerCase().includes(curriculumSearch.toLowerCase());

            if (!matchesSearch) return false;

            if (selectedCurriculumSem === 'all') return true;
            if (selectedCurriculumSem === 'PE') return course.vertical || course.categoryType === 'PEC';
            if (selectedCurriculumSem === 'OE') return course.isOpenElective || course.categoryType === 'OEC';
            return String(course.semester) === selectedCurriculumSem;
        });

        // Semester statistics
        const semTotalCredits = filteredCourses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
        const semTotalCourses = filteredCourses.length;
        const semTotalContactHours = filteredCourses.reduce((sum, c) => sum + (Number(c.contactPeriods) || (Number(c.l) || 0) + (Number(c.t) || 0) + (Number(c.p) || 0)), 0);

        // Compute Credit Breakdown for All Courses
        const categoryTotals = {};
        let grandTotalCredits = 0;
        allCourses.forEach(c => {
            const cat = (c.categoryType || 'PCC').toUpperCase();
            const cr = Number(c.credits) || 0;
            categoryTotals[cat] = (categoryTotals[cat] || 0) + cr;
            if (cat !== 'MC') grandTotalCredits += cr;
        });

        const regulationBadge = deptSyllabusData?.regulation || "R-2023 Autonomous Scheme";
        const bosDate = deptSyllabusData?.bosMeetingDate || "29.10.2024";
        const acDate = deptSyllabusData?.acMeetingDate || "25.11.2024";

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {/* Header Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95), rgba(15, 23, 42, 0.98))',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                                <span style={{
                                    background: 'rgba(230, 182, 39, 0.15)',
                                    color: 'var(--secondary)',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '30px',
                                    fontWeight: '800',
                                    fontSize: '0.8rem',
                                    border: '1px solid rgba(230, 182, 39, 0.3)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <FaGraduationCap /> {regulationBadge}
                                </span>
                                <span style={{
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    color: '#a5b4fc',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '30px',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    border: '1px solid rgba(99, 102, 241, 0.3)'
                                }}>
                                    BOS Approved: {bosDate}
                                </span>
                                <span style={{
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    color: '#6ee7b7',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '30px',
                                    fontWeight: '700',
                                    fontSize: '0.8rem',
                                    border: '1px solid rgba(16, 185, 129, 0.3)'
                                }}>
                                    Academic Council Approved: {acDate}
                                </span>
                            </div>

                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f8fafc', margin: '0 0 0.5rem 0' }}>
                                Curriculum & Detailed Syllabi
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0, maxWidth: '800px', lineHeight: '1.6' }}>
                                Choice Based Credit System (CBCS) & Outcome-Based Education (OBE) course structures, complete with L-T-P credit matrices, detailed unit outlines, course objectives & cognitive outcomes.
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                            <Link
                                to="/resources/syllabus-curriculum"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.75rem 1.4rem',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    color: '#f8fafc',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FaBook /> View Full College Syllabi
                            </Link>

                            <Link
                                to={`/admin/syllabus`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.75rem 1.4rem',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    fontWeight: '800',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FaShieldAlt /> Admin: Manage Syllabus & PDF
                            </Link>
                        </div>
                    </div>

                    {/* Semester KPIs */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem',
                        marginTop: '0.5rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Selection</span>
                            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--secondary)', marginTop: '4px' }}>
                                {selectedCurriculumSem === 'all' ? 'All Semesters' : selectedCurriculumSem === 'PE' ? 'Electives' : selectedCurriculumSem === 'OE' ? 'Open Electives' : `Semester ${selectedCurriculumSem}`}
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Courses Count</span>
                            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f8fafc', marginTop: '4px' }}>
                                {semTotalCourses} Courses
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Semester Credits</span>
                            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>
                                {semTotalCredits} Credits
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Periods/Wk</span>
                            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#4ade80', marginTop: '4px' }}>
                                {semTotalContactHours} Hours
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Controls Bar: Semester Navigation & Search */}
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '1.5rem',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        {/* Semester Tabs */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
                            {semTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedCurriculumSem(tab.id)}
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '12px',
                                        border: selectedCurriculumSem === tab.id ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                                        background: selectedCurriculumSem === tab.id ? 'var(--secondary)' : 'var(--bg-section)',
                                        color: selectedCurriculumSem === tab.id ? 'var(--bg-dark)' : 'var(--text-main)',
                                        fontWeight: '800',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: selectedCurriculumSem === tab.id ? '0 4px 12px rgba(230, 182, 39, 0.25)' : 'none'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div style={{ position: 'relative', minWidth: '260px' }}>
                            <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search course code or title..."
                                value={curriculumSearch}
                                onChange={(e) => setCurriculumSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.85rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Legend Pill Badges */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        flexWrap: 'wrap',
                        paddingTop: '0.8rem',
                        borderTop: '1px solid var(--glass-border)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                    }}>
                        <span style={{ fontWeight: '700', marginRight: '4px' }}>Categories:</span>
                        {Object.entries(categoryColors).map(([catKey, conf]) => (
                            <span
                                key={catKey}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '0.2rem 0.55rem',
                                    borderRadius: '6px',
                                    background: conf.bg,
                                    color: conf.text,
                                    border: `1px solid ${conf.border}`,
                                    fontSize: '0.75rem',
                                    fontWeight: '700'
                                }}
                            >
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: conf.text }} />
                                {catKey}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Courses Table / Cards */}
                {filteredCourses.length === 0 ? (
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '20px',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)'
                    }}>
                        <FaBook style={{ fontSize: '3rem', color: 'var(--secondary)', opacity: 0.6, marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Courses Found</h3>
                        <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.9rem' }}>
                            No courses match the current filters. Please select another semester or clear your search term.
                        </p>
                    </div>
                ) : (
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg-section)', borderBottom: '2px solid var(--glass-border)' }}>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', width: '50px' }}>#</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', width: '90px' }}>Cat</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', width: '120px' }}>Course Code</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem' }}>Course Title</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '60px' }}>L</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '60px' }}>T</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '60px' }}>P</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '70px' }}>Periods</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '70px' }}>Credits</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '110px' }}>Marks (C/E)</th>
                                        <th style={{ padding: '1.2rem 1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.85rem', textAlign: 'center', width: '130px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCourses.map((course, idx) => {
                                        const isInduction = (course.title || course.name || '').toUpperCase().includes('INDUCTION') || (course.code || '').toUpperCase().includes('INDUCTION');
                                        return (
                                            <tr
                                                key={course.id || idx}
                                                style={{
                                                    borderBottom: '1px solid var(--glass-border)',
                                                    transition: 'background 0.2s',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                onClick={() => setSelectedSubjectModal(course)}
                                            >
                                                <td style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.85rem' }}>{idx + 1}</td>
                                                <td style={{ padding: '1rem' }}>{getCategoryBadge(course.categoryType)}</td>
                                                <td style={{ padding: '1rem', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.95rem' }}>{course.code}</td>
                                                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.95rem' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                        <span>{course.title || course.name}</span>
                                                        {course.verticalName && (
                                                            <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>• {course.verticalName}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                {isInduction ? (
                                                    <td colSpan={4} style={{ padding: '1rem', color: 'var(--primary)', textAlign: 'center', fontSize: '0.9rem', fontWeight: '800', letterSpacing: '0.5px' }}>
                                                        2 WEEKS
                                                    </td>
                                                ) : (
                                                    <>
                                                        <td style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}>{course.l !== undefined ? course.l : 3}</td>
                                                        <td style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}>{course.t !== undefined ? course.t : 0}</td>
                                                        <td style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}>{course.p !== undefined ? course.p : 0}</td>
                                                        <td style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', fontWeight: '700' }}>{course.contactPeriods || (Number(course.l || 0) + Number(course.t || 0) + Number(course.p || 0))}</td>
                                                    </>
                                                )}
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.7rem',
                                                        borderRadius: '8px',
                                                        background: Number(course.credits) > 0 ? 'rgba(230, 182, 39, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                                                        color: Number(course.credits) > 0 ? 'var(--secondary)' : 'var(--text-muted)',
                                                        fontWeight: '900',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        {isInduction ? 0 : course.credits}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600' }}>
                                                    {isInduction ? '-' : `${course.cia || 40} / ${course.ese || 60}`}
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedSubjectModal(course);
                                                        }}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            padding: '0.45rem 0.9rem',
                                                            borderRadius: '8px',
                                                            background: 'rgba(99, 102, 241, 0.15)',
                                                            color: '#818cf8',
                                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '800',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <FaEye size={11} /> Syllabus
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Credit Distribution Summary Matrix */}
                {grandTotalCredits > 0 && (
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 0.3rem 0' }}>
                                    Credit Distribution by Course Category
                                </h3>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    AICTE & Autonomous R-2023 Credit Allocation Framework
                                </span>
                            </div>
                            <span style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '30px',
                                background: 'rgba(230, 182, 39, 0.15)',
                                color: 'var(--secondary)',
                                fontWeight: '800',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(230, 182, 39, 0.3)'
                            }}>
                                Total Minimum Credits: {grandTotalCredits}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {Object.entries(categoryColors).map(([catKey, conf]) => {
                                const catCredits = categoryTotals[catKey] || 0;
                                const percentage = grandTotalCredits > 0 ? ((catCredits / grandTotalCredits) * 100).toFixed(1) : 0;
                                return (
                                    <div
                                        key={catKey}
                                        style={{
                                            background: 'var(--bg-section)',
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            border: `1px solid ${conf.border}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '6px',
                                                background: conf.bg,
                                                color: conf.text,
                                                fontSize: '0.75rem',
                                                fontWeight: '800'
                                            }}>
                                                {catKey}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                                                {percentage}%
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minHeight: '32px' }}>
                                            {conf.label}
                                        </div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '800', color: conf.text, marginTop: 'auto' }}>
                                            {catCredits} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Credits</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Detailed Subject Syllabus Modal */}
                {selectedSubjectModal && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '1.5rem'
                        }}
                        onClick={() => setSelectedSubjectModal(null)}
                    >
                        <div
                            style={{
                                background: 'var(--bg-card, #0f172a)',
                                borderRadius: '24px',
                                maxWidth: '900px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                                padding: '2.5rem'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                        {getCategoryBadge(selectedSubjectModal.categoryType)}
                                        <span style={{ color: 'var(--secondary)', fontWeight: '900', fontSize: '1.1rem' }}>
                                            {selectedSubjectModal.code}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                            • L-T-P-C: {selectedSubjectModal.l || 3}-{selectedSubjectModal.t || 0}-{selectedSubjectModal.p || 0}-{selectedSubjectModal.credits || 3}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                                        {selectedSubjectModal.title || selectedSubjectModal.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setSelectedSubjectModal(null)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: 'none',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        color: '#fff',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Course Objectives */}
                            {selectedSubjectModal.courseObjectives && selectedSubjectModal.courseObjectives.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.75rem' }}>
                                        Course Objectives:
                                    </h4>
                                    <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                        {selectedSubjectModal.courseObjectives.map((obj, oIdx) => (
                                            <li key={oIdx} style={{ marginBottom: '0.4rem' }}>{obj}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Units Outline */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>
                                    Detailed Units Syllabus:
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {(selectedSubjectModal.units && selectedSubjectModal.units.length > 0
                                        ? selectedSubjectModal.units
                                        : getDetailedSyllabusForSubject(selectedSubjectModal.code, selectedSubjectModal.title || selectedSubjectModal.name)
                                    ).map((unit, uIdx) => (
                                        <div
                                            key={uIdx}
                                            style={{
                                                background: 'var(--bg-section)',
                                                borderRadius: '14px',
                                                padding: '1.25rem',
                                                border: '1px solid var(--glass-border)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: '800', color: '#818cf8', fontSize: '0.95rem' }}>
                                                    {unit.unitNo || unit.unit || `UNIT ${uIdx + 1}`}: {unit.unitTitle || unit.title}
                                                </span>
                                                {unit.hours && (
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                                                        {unit.hours} Hours
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                                                {Array.isArray(unit.topics) ? unit.topics.join(' • ') : unit.topics || unit.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Course Outcomes (COs)*/}
                            {selectedSubjectModal.courseOutcomes && selectedSubjectModal.courseOutcomes.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.75rem' }}>
                                        Course Outcomes (COs)& Cognitive Domains:
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {selectedSubjectModal.courseOutcomes.map((co, coIdx) => (
                                            <div
                                                key={coIdx}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '0.75rem 1rem',
                                                    background: 'var(--bg-section)',
                                                    borderRadius: '10px',
                                                    border: '1px solid var(--glass-border)',
                                                    gap: '1rem'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <span style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '0.85rem' }}>
                                                        {co.coNo || `CO${coIdx + 1}`}
                                                    </span>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                                                        {co.outcome || co.text}
                                                    </span>
                                                </div>
                                                {getRbtBadge(co.rbtLevel || co.level)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Textbooks & References */}
                            {((selectedSubjectModal.textBooks && selectedSubjectModal.textBooks.length > 0) ||
                                (selectedSubjectModal.referenceBooks && selectedSubjectModal.referenceBooks.length > 0)) && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        {selectedSubjectModal.textBooks && selectedSubjectModal.textBooks.length > 0 && (
                                            <div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                                                    Text Books:
                                                </h4>
                                                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                                                    {selectedSubjectModal.textBooks.map((tb, tbIdx) => (
                                                        <li key={tbIdx} style={{ marginBottom: '0.3rem' }}>
                                                            <strong>{tb.author}</strong>, "{tb.title}", {tb.publisher} {tb.year ? `(${tb.year})` : ''}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {selectedSubjectModal.referenceBooks && selectedSubjectModal.referenceBooks.length > 0 && (
                                            <div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                                                    References:
                                                </h4>
                                                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                                                    {selectedSubjectModal.referenceBooks.map((rb, rbIdx) => (
                                                        <li key={rbIdx} style={{ marginBottom: '0.3rem' }}>
                                                            <strong>{rb.author}</strong>, "{rb.title}", {rb.publisher} {rb.year ? `(${rb.year})` : ''}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                            {/* Modal Actions */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                <button
                                    onClick={() => setSelectedSubjectModal(null)}
                                    style={{
                                        padding: '0.7rem 1.4rem',
                                        borderRadius: '10px',
                                        background: 'var(--bg-section)',
                                        color: 'var(--text-muted)',
                                        border: '1px solid var(--glass-border)',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Close
                                </button>
                                <Link
                                    to="/admin/syllabus"
                                    style={{
                                        padding: '0.7rem 1.4rem',
                                        borderRadius: '10px',
                                        background: 'var(--primary)',
                                        color: '#fff',
                                        fontSize: '0.85rem',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaEdit size={12} /> Edit in Admin Panel
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

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

            {/* CENTER OF EXCELLENCE SPOTLIGHT (IF APPLICABLE) */}
            {department.coe && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
                    borderRadius: '28px',
                    padding: 'clamp(2rem, 3.5vw, 3rem)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {department.coe.logo && (
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                                }}>
                                    <img
                                        src={department.coe.logo}
                                        alt={department.coe.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', background: '#0a0f1d' }}
                                    />
                                </div>
                            )}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '900',
                                        color: '#34d399',
                                        textTransform: 'uppercase',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        padding: '0.2rem 0.7rem',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(16, 185, 129, 0.3)'
                                    }}>
                                        {department.coe.code || 'Center of Excellence'}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Institutional Innovation Hub</span>
                                </div>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#ffffff', margin: 0 }}>
                                    {department.coe.name}
                                </h3>
                                {department.coe.subname && (
                                    <div style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: '0.2rem', fontWeight: '600' }}>
                                        {department.coe.subname}
                                    </div>
                                )}
                                {department.coe.tagline && (
                                    <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: '#38bdf8', margin: '0.4rem 0 0 0' }}>
                                        “{department.coe.tagline}”
                                    </p>
                                )}
                            </div>
                        </div>

                        <Link
                            to={`/coe?center=${department.coe?.id || (department.slug.includes('cyber') ? 'cyber-shield' : department.slug.includes('electrical') ? 'energy-studies' : 'coe-aimaa')}`}
                            style={{
                                padding: '0.8rem 1.8rem',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                                color: '#ffffff',
                                fontWeight: '800',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)'
                            }}
                        >
                            Explore Center of Excellence <FaArrowRight size={12} />
                        </Link>
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
                        Admissions Open for Academic Year 2026 - 2027. Fast-track your application today.
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
                    <button
                        onClick={() => setActiveSection('curriculum')}
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
                        View Curriculum & Syllabus
                    </button>
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

    const degreePrefix = isSH ? '' : (department.degree || (department.type === 'PG' ? 'M.E.' : 'B.E. / B.Tech'));
    const pageTitle = department.seoTitle || (isSH ? `Department of ${department.name} - EASA College Coimbatore` : `Best ${degreePrefix} in ${department.name} in Coimbatore`);
    const pageDesc = department.seoDescription || (isSH ? `Explore the Department of ${department.name} at EASA College Coimbatore. Strong foundational learning, expert faculty, modern labs, and academic excellence.` : `Pursue ${degreePrefix} in ${department.name} at EASA College Coimbatore. Future-proof curriculum, high-impact research, expert faculty, and 100% placement support. Check eligibility & admissions.`);
    const pageKeywords = department.seoKeywords || `${department.name}, ${degreePrefix ? `${degreePrefix} ${department.name}, ` : ''}Best Engineering College in Coimbatore, Anna University Affiliated, Engineering Placements Coimbatore, EASA College, Vision Mission ${department.name}`;

    const departmentSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": isSH ? `Department of ${department.name}` : `${degreePrefix} in ${department.name}`,
        "description": department.overview || pageDesc,
        "provider": {
            "@type": "CollegeOrUniversity",
            "name": "EASA College of Engineering and Technology",
            "url": "https://easacollege.ac.in",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "NH-47, Palakkad Main Road, Navakkarai",
                "addressLocality": "Coimbatore",
                "addressRegion": "Tamil Nadu",
                "postalCode": "641105",
                "addressCountry": "IN"
            }
        },
        "educationalCredentialAwarded": degreePrefix || "General Engineering Foundation",
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "Full-Time",
            "courseWorkload": department.type === 'PG' ? "2 Years" : "4 Years"
        }
    };

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title={pageTitle}
                description={pageDesc}
                keywords={pageKeywords}
                image={department.heroImage}
                url={`https://easacollege.ac.in/department/${department.slug}`}
                schema={departmentSchema}
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                title={department.name}
                defaultTitle={department.name}
                defaultSubtitle="Excellence in Engineering, Management and Professional Leadership"
                defaultImage={department.heroImage}
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '5rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        {/* Department Name in Sidebar */}
                        <div style={{ marginBottom: '1.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
                                <FaUniversity /> Academic Department
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-main)', margin: 0, lineHeight: '1.3' }}>
                                {department.name}
                            </h3>
                            {department.type && (
                                <span style={{
                                    display: 'inline-block',
                                    marginTop: '8px',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '6px',
                                    background: 'rgba(230, 182, 39, 0.12)',
                                    color: 'var(--secondary)',
                                    fontSize: '0.75rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase'
                                }}>
                                    {department.type} Program
                                </span>
                            )}
                        </div>

                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Menu Navigation</div>
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
                            {activeSection === 'curriculum' && renderCurriculum()}
                            {activeSection === 'course-outcomes' && renderCourseOutcomes()}
                            {activeSection === 'documents' && renderDocuments()}
                            {activeSection === 'labs' && renderLabs()}
                            {activeSection === 'hod' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                        {isSH ? "DEAN'S MESSAGE" : "HOD MESSAGE"}
                                    </h2>
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

                .gallery-photo-card:hover .gallery-photo-overlay {
                    opacity: 1 !important;
                }
                .gallery-photo-card:hover .gallery-photo-img {
                    transform: scale(1.08) !important;
                }
            `}</style>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />

            {/* Poster Lightbox Modal */}
            {selectedPoster && (
                <div
                    onClick={() => setSelectedPoster(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(5, 10, 24, 0.88)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: '850px',
                            width: '100%',
                            maxHeight: '90vh',
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.2rem 1.8rem',
                            borderBottom: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)'
                        }}>
                            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                {selectedPoster.title || 'Event Poster'}
                            </h4>
                            <button
                                onClick={() => setSelectedPoster(null)}
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    color: 'var(--text-main)',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto', background: '#0a0f1d' }}>
                            <img
                                src={selectedPoster.url}
                                alt={selectedPoster.title || 'Poster'}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '70vh',
                                    objectFit: 'contain',
                                    borderRadius: '12px'
                                }}
                            />
                        </div>
                        <div style={{ padding: '1rem 1.8rem', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: 'var(--bg-section)', borderTop: '1px solid var(--glass-border)' }}>
                            <a
                                href={selectedPoster.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '10px',
                                    background: 'rgba(230, 182, 39, 0.15)',
                                    color: 'var(--secondary)',
                                    fontWeight: '800',
                                    fontSize: '0.85rem',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <FaExternalLinkAlt size={12} /> Open Full Image
                            </a>
                            {selectedPoster.hideDownload ? (
                                <button
                                    onClick={() => setSelectedPoster(null)}
                                    style={{
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: '10px',
                                        background: 'var(--secondary)',
                                        color: 'var(--bg-dark)',
                                        fontWeight: '900',
                                        fontSize: '0.85rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaTimes size={12} /> Close View
                                </button>
                            ) : (
                                <a
                                    href={selectedPoster.url}
                                    download
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '10px',
                                        background: 'var(--secondary)',
                                        color: 'var(--bg-dark)',
                                        fontWeight: '900',
                                        fontSize: '0.85rem',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaDownload size={12} /> Download Poster
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Viewer Modal */}
            {selectedPdf && (
                <div
                    onClick={() => setSelectedPdf(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(5, 10, 24, 0.88)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: '950px',
                            width: '100%',
                            height: '88vh',
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.2rem 1.8rem',
                            borderBottom: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)',
                            flexWrap: 'wrap',
                            gap: '0.8rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FaFilePdf size={20} color="#f87171" />
                                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                    {selectedPdf.title ? `${selectedPdf.title} - Document` : 'Brochure / Document'}
                                </h4>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <a
                                    href={selectedPdf.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(230, 182, 39, 0.15)',
                                        color: 'var(--secondary)',
                                        fontWeight: '800',
                                        fontSize: '0.8rem',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaExternalLinkAlt size={12} /> Open in Tab
                                </a>
                                <a
                                    href={selectedPdf.url}
                                    download
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        background: 'var(--secondary)',
                                        color: 'var(--bg-dark)',
                                        fontWeight: '900',
                                        fontSize: '0.8rem',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <FaDownload size={12} /> Download
                                </a>
                                <button
                                    onClick={() => setSelectedPdf(null)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        color: 'var(--text-main)',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        marginLeft: '4px'
                                    }}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1, width: '100%', height: '100%', background: '#1e293b' }}>
                            <iframe
                                src={selectedPdf.url}
                                title={selectedPdf.title || "Document Viewer"}
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default DepartmentPage;
