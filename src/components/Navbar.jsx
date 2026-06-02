import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaAward, FaMedal, FaTrophy, FaCertificate, FaBars, FaTimes, FaPhone, FaEnvelope, FaUser, FaGlobe, FaChevronDown } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import API_BASE_URL from '../api';
import headerLogoDark from '../assets/College Logo with White Letter.png';
import headerLogoLight from '../assets/College Logo with Blue Letter.png';
import accreditationsLight from '../assets/6 Logos with blue Letter.png';
import accreditationsDark from '../assets/6 Logos with white Letter.png';
import yearsOfExcellence from '../assets/years-of-excellence.png';
import languages from '../data/languages.json';
import NewsTicker from './NewsTicker';
import { departments as staticDepartments } from '../data/departmentsData';

const NAV_ITEMS = [
    {
        title: 'HOME',
        href: '/',
    },
    {
        title: 'ABOUT US',
        children: [
            { title: 'Institution', href: '/institution' },
            { title: 'Management Members', href: '/management' },
            { title: "Principal's Message", href: '/principal' },
            { title: 'Core Values', href: '/core-beliefs' },
            { title: 'Media & Press', href: '/media-press' },
            { title: 'Institute Vision & Mission', href: '/mission-vision' },
            { title: 'Institute Milestones', href: '/milestones' },
            { title: 'Leadership (Hierarchy)', href: '/leadership' },
            { title: 'Governance', href: '/governance' },
            { title: 'Administration', href: '/administration' },
            { title: 'Sustainability', href: '/sustainability' },
            { title: 'Community Outreach', href: '/community-outreach' }
        ]
    },
    {
        title: 'ACADEMIC PROGRAMS',
        isMega: true,
        children: [
            {
                title: 'UG PROGRAMS',
                href: '#',
                children: [

                ]
            },
            {
                title: 'PG PROGRAMS',
                href: '#',
                children: [
                ]
            },
            {
                title: 'RESEARCH',
                href: '#',
                children: [
                    { title: 'Research Programs', href: '/research' },
                    { title: 'Department Research', href: '/department-research' },
                    { title: 'Student Research', href: '/student-research' },
                    { title: 'Faculty Research', href: '/faculty-research' },
                    { title: 'Industrial Research', href: '/industrial-research' },
                    { title: 'IPR Cell', href: '/ipr-cell' },
                    { title: 'R&D Projects', href: '/rd-projects' },
                    { title: 'Patents', href: '/patents' }
                ]
            }
        ]
    },
    {
        title: 'LIFE @ EASA',
        children: [
            {
                title: 'Campus',
                children: [
                    { title: 'Library', href: '/page/library' },
                    { title: 'Hostel', href: '/page/hostel' },
                    { title: 'Gym', href: '/page/gym' },
                    { title: 'Yoga', href: '/page/yoga' },
                    { title: 'Sports', href: '/page/sports' },
                    { title: 'Cafeteria', href: '/page/cafeteria' },
                    { title: 'Dinning', href: '/page/food-court' },
                    { title: 'Amenities', href: '/page/amenities' },
                    { title: 'Store', href: '/page/store' },
                    { title: 'Transport', href: '/page/transport' },
                    { title: 'First Aid Center', href: '/page/medical' }
                ]
            },
            { title: 'Cells', href: '/page/cells' },
            { title: 'Clubs', href: '/page/clubs' },
            { title: 'Fest', href: '/page/fest' },
            { title: 'Associations', href: '/page/associations' }
        ]
    },
    {
        title: 'ADMISSIONS',
        children: [
            { title: 'Application Form', href: '#' },
            { title: 'Scholarships', href: '/scholarships' },
            { title: 'Eligibility', href: '/admissions#eligibility' }
        ]
    },
    {
        title: 'ASCEND',
        children: [
            { title: 'Skilling', href: '/page/skilling' },
            { title: 'Higher Education', href: '/page/higher-education' },
            { title: 'Entrepreneurship', href: '/page/entrepreneurship' },
            {
                title: 'Placement',
                href: '/page/placement'
            }
        ]
    },
    {
        title: 'ACCREDITATION',
        children: [
            { title: 'AICTE Approvals', href: '/aicte' },
            { title: 'NAAC', href: '/naac' },
            { title: 'NBA', href: '/nba' },
            { title: 'NIRF', href: '/nirf' }
        ]
    },
    {
        title: 'EASA ECOSYSTEM',
        children: [
            {
                title: 'IQAC',
                children: [
                    { title: 'About', href: '/iqac-about' },
                    { title: 'Committee', href: '/iqac-committee' },
                    { title: 'AQAR', href: '/iqac-aqar' },
                    { title: 'Meeting Minutes', href: '/iqac-minutes' }
                ]
            },
            // { title: 'SDGS @EASA', href: '/sdgs' },
            { title: 'Centre of Excellence', href: '/coe' },
            { title: "Professional Chapters", href: "/professional-chapters" },
            { title: 'Spark Innovation Lab', href: '/spark-lab' },
            { title: 'Evolve Makerspace Lab', href: '/evolve-makerspace' },
            { title: 'Evoke Project Lab', href: '/evoke-project' },
            { title: 'Leap Incubation Lab', href: '/leap-incubation' },
            { title: 'ASCEND (Career Advancement Centre)', href: '/ascend-center' }
        ]
    },
    {
        title: 'GALLERY',
        children: [
            { title: 'Photo Gallery', href: '/gallery' },
            { title: 'Video Gallery', href: '/video-gallery' },
            { title: 'Virtual Tour', href: '/virtual-tour' }
        ]
    },
    {
        title: 'RESOURCES',
        children: [
            { title: 'Regulations', href: '/resources/regulations' },
            // { title: 'Syllabus & Curriculum', href: '/resources/syllabus-curriculum' },
            { title: 'Statutory and Non-Statutory Bodies', href: '/resources/statutory-bodies' },
            { title: 'Forms', href: '/resources/forms' },
            { title: 'Institute Academic Calendar', href: '/resources/academic-calendar' },
            {
                title: 'Handbook',
                children: [
                    { title: 'Faculty', href: '/resources/handbook/faculty' },
                    { title: 'Student', href: '/resources/handbook/student' }
                ]
            }
        ]
    },
    {
        title: 'GRIEVANCES',
        children: [
            {
                title: 'Forms',
                children: [
                    { title: 'Parents', href: '/grievance-parents' },
                    { title: 'Students', href: '/grievance-students' },
                    { title: 'Faculty', href: '/grievance-faculty' },
                    { title: 'Visitors', href: '/grievance-visitors' }
                ]
            }
        ]
    }
];

const UTILITY_ITEMS = [
    {
        title: 'AUTONOMOUS',
        children: [
            { title: 'Regulations', href: '#' },
            { title: 'Outcome-Based Education', href: '/obe' },
            { title: 'Program Advisory Committee', href: '#' },
            { title: 'Curriculum Development Committee', href: '#' },
            { title: 'Board of Studies', href: '#' },
            { title: 'Standing Committee', href: '#' },
            { title: 'Governing Bodies', href: '#' },
            { title: 'Academic Council', href: '#' },
            { title: 'Result Passing Board', href: '#' }
        ]
    },
    {
        title: 'EXAMINATION (C.O.E)',
        children: [
            { title: 'Courses Registered (Preview)', href: '#' },
            {
                title: 'Continuous Internal Assessment',
                children: [
                    { title: 'Timetable Schedule', href: '#' },
                    { title: 'Result', href: '#' }
                ]
            },
            {
                title: 'End Semester Examination',
                children: [
                    { title: 'Exam Fee Payment', href: '#' },
                    {
                        title: 'Theory Examination',
                        children: [
                            { title: 'Timetable Schedule', href: '#' },
                            { title: 'Result', href: '#' }
                        ]
                    },
                    {
                        title: 'Practical Examination',
                        children: [
                            { title: 'Timetable Schedule', href: '#' },
                            { title: 'Result', href: '#' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'CAREER',
        children: [
            { title: 'Job Openings', href: '/careers' }
        ]
    },
    {
        title: 'ALUMNI',
        children: [
            { title: 'Registration', href: '/alumni-registration' },
            { title: 'Alumni Social', href: '/alumni-social' }
        ]
    }
];

const Navbar = ({ onApplyClick }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [departments, setDepartments] = useState(staticDepartments);

    // useEffect(() => {
    //     const fetchDepartments = async () => {
    //         try {
    //             // Add timestamp to prevent caching
    //             const response = await fetch(`${API_BASE_URL}/api/departments?_t=${Date.now()}`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log("Navbar: Fetched data", data);
    //                 setDepartments(data);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch departments:", error);
    //         }
    //     };
    //     fetchDepartments();
    // }, []);

    const dynamicNavItems = useMemo(() => {
        const items = JSON.parse(JSON.stringify(NAV_ITEMS));
        const academicPrograms = items.find(item => item.title === 'ACADEMIC PROGRAMS');

        if (academicPrograms && Array.isArray(departments) && departments.length > 0) {
            console.log("Navbar: Processing departments", departments);

            // Group departments into UG and PG based on type or name/slug
            const ugDepts = departments.filter(dept => {
                if (!dept || !dept.name) return false;

                const type = dept.type ? dept.type.toUpperCase() : '';

                // If type is explicitly set to UG or Other, include in UG section
                if (type === 'UG' || type === 'OTHER') return true;
                // If type is explicitly PG, exclude
                if (type === 'PG') return false;

                // Fallback for legacy data without type
                return !dept.name.toLowerCase().includes('m.e') &&
                    !dept.name.toLowerCase().includes('mba') &&
                    (!dept.slug || (!dept.slug.toLowerCase().includes('me-') && !dept.slug.toLowerCase().includes('mba')));
            });

            const pgDepts = departments.filter(dept => {
                if (!dept || !dept.name) return false;

                const type = dept.type ? dept.type.toUpperCase() : '';

                // If type is explicitly set to PG, include
                if (type === 'PG') return true;
                // If type is explicitly UG or Other, exclude
                if (type === 'UG' || type === 'OTHER') return false;

                // Fallback
                return dept.name.toLowerCase().includes('m.e') ||
                    dept.name.toLowerCase().includes('mba') ||
                    (dept.slug && (dept.slug.toLowerCase().includes('me-') || dept.slug.toLowerCase().includes('mba')));
            });

            const ugSection = academicPrograms.children.find(child => child.title === 'UG PROGRAMS');
            const pgSection = academicPrograms.children.find(child => child.title === 'PG PROGRAMS');

            // Helper to remove duplicates based on name
            const getUnique = (depts) => {
                const seen = new Set();
                return depts.filter(dept => {
                    const name = (dept.name || '').trim();
                    if (seen.has(name)) return false;
                    seen.add(name);
                    return true;
                });
            };

            if (ugSection) {
                ugSection.children = getUnique(ugDepts).map(dept => ({
                    title: dept.name,
                    href: `/department/${dept.slug}`
                }));
            }

            if (pgSection) {
                pgSection.children = getUnique(pgDepts).map(dept => ({
                    title: dept.name,
                    href: `/department/${dept.slug}`
                }));
            }
        }
        return items;
    }, [departments]);

    const logoToDisplay = theme === 'light' ? headerLogoLight : headerLogoDark;
    const accreditationsToDisplay = theme === 'light' ? accreditationsLight : accreditationsDark;

    const toggleMobileItem = (title) => {
        setMobileExpanded(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,
            backgroundColor: 'var(--nav-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease'
        }}>
            <NewsTicker />
            {/* Top Bar: Notices & Quick Contact - Sleek & Minimal - Hidden on Mobile */}
            <div className="nav-tablet-hide-mobile" style={{
                background: 'linear-gradient(90deg, var(--bg-card) 0%, var(--glass) 100%)',
                padding: '0.3rem 0',
                fontSize: '0.75rem',
                borderBottom: '1px solid var(--glass-border)',
                color: 'var(--nav-text)',
                zIndex: 2000,
                position: 'relative'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', flexShrink: 0 }}>
                        {/* 1. College Code */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: theme === 'dark' ? '#F8D53D' : '#3E3E7E' }}>Counselling Code: TN-UG/PG 2749</span>
                        </div>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>

                        {/* 2. AUTONOMOUS Dropdown */}
                        <div className="nav-item-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}
                            onClick={(e) => { e.stopPropagation(); setMobileExpanded(prev => ({ ...prev, 'AUTONOMOUS_UTILITY': !prev['AUTONOMOUS_UTILITY'] })) }}>
                            <span style={{ fontSize: '0.85rem' }}>AUTONOMOUS</span> <FaChevronDown size={10} />
                            <div className="dropdown-menu" style={{
                                minWidth: '240px', left: 'auto', right: 0, top: '100%',
                                background: theme === 'dark' ? '#000' : '#fff',
                                color: theme === 'dark' ? '#fff' : '#000',
                                display: mobileExpanded['AUTONOMOUS_UTILITY'] ? 'block' : 'none'
                            }} onClick={(e) => e.stopPropagation()}>
                                <a href="/page/autonomous-regulations" className="dropdown-item">Regulations</a>
                                <a href="/obe" className="dropdown-item">Outcome-Based Education</a>
                                <a href="/page/pac" className="dropdown-item">Program Advisory Committee</a>
                                <a href="/page/cdc" className="dropdown-item">Curriculum Development Committee</a>
                                <a href="/page/bos" className="dropdown-item">Board of Studies</a>
                                <a href="/page/standing-committee" className="dropdown-item">Standing Committee</a>
                                <a href="/page/governing-bodies" className="dropdown-item">Governing Bodies</a>
                                <a href="/page/academic-council" className="dropdown-item">Academic Council</a>
                                <a href="/page/result-passing-board" className="dropdown-item">Result Passing Board</a>
                            </div>
                        </div>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>

                        {/* 3. Examination Dropdown */}
                        <div className="nav-item-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}
                            onClick={(e) => { e.stopPropagation(); setMobileExpanded(prev => ({ ...prev, 'EXAM_UTILITY': !prev['EXAM_UTILITY'] })) }}>
                            <span style={{ fontSize: '0.85rem' }}>EXAMINATION (C.O.E)</span> <FaChevronDown size={10} />
                            <div className="dropdown-menu" style={{
                                minWidth: '220px', left: 'auto', right: 0, top: '100%', overflow: 'visible',
                                background: theme === 'dark' ? '#000' : '#fff',
                                color: theme === 'dark' ? '#fff' : '#000',
                                display: mobileExpanded['EXAM_UTILITY'] ? 'block' : 'none'
                            }} onClick={(e) => e.stopPropagation()}>
                                <a href="/page/courses-registered" className="dropdown-item">Courses Registered (Preview)</a>

                                {/* Continuous Internal Assessment */}
                                <div className="dropdown-item-container" style={{ position: 'relative', overflow: 'visible' }}>
                                    <a href="#" className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setMobileExpanded(prev => ({ ...prev, 'EXAM_CIA': !prev['EXAM_CIA'] }));
                                        }}>
                                        Continuous Internal Assessment <span style={{ fontSize: '0.8em' }}>{mobileExpanded['EXAM_CIA'] ? '▼' : '▶'}</span>
                                    </a>
                                    <div className="dropdown-menu-nested" style={{
                                        position: 'absolute', right: '100%', top: 0, minWidth: '200px',
                                        background: theme === 'dark' ? '#000' : '#fff',
                                        borderRadius: '12px', padding: '0.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 1005,
                                        display: mobileExpanded['EXAM_CIA'] ? 'block' : 'none'
                                    }}>
                                        <a href="/page/cia-timetable" className="dropdown-item">Timetable Schedule</a>
                                        <a href="/page/cia-result" className="dropdown-item">Result</a>
                                    </div>
                                </div>

                                {/* End Semester Examination */}
                                <div className="dropdown-item-container" style={{ position: 'relative', overflow: 'visible' }}>
                                    <a href="#" className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setMobileExpanded(prev => ({ ...prev, 'EXAM_ESE': !prev['EXAM_ESE'] }));
                                        }}>
                                        End Semester Examination <span style={{ fontSize: '0.8em' }}>{mobileExpanded['EXAM_ESE'] ? '▼' : '▶'}</span>
                                    </a>
                                    <div className="dropdown-menu-nested" style={{
                                        position: 'absolute', right: '100%', top: 0, minWidth: '220px',
                                        background: theme === 'dark' ? '#000' : '#fff',
                                        borderRadius: '12px', padding: '0.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 1005,
                                        display: mobileExpanded['EXAM_ESE'] ? 'block' : 'none'
                                    }}>
                                        <a href="/page/exam-fee" className="dropdown-item">Exam Fee Payment</a>

                                        {/* Theory Examination */}
                                        <div className="dropdown-item-container" style={{ position: 'relative', overflow: 'visible' }}>
                                            <a href="#" className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setMobileExpanded(prev => ({ ...prev, 'EXAM_THEORY': !prev['EXAM_THEORY'] }));
                                                }}>
                                                Theory Examination <span style={{ fontSize: '0.8em' }}>{mobileExpanded['EXAM_THEORY'] ? '▼' : '▶'}</span>
                                            </a>
                                            <div className="dropdown-menu-nested" style={{
                                                position: 'absolute', right: '100%', top: 0, minWidth: '200px',
                                                background: theme === 'dark' ? '#000' : '#fff',
                                                borderRadius: '12px', padding: '0.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 1005,
                                                display: mobileExpanded['EXAM_THEORY'] ? 'block' : 'none'
                                            }}>
                                                <a href="/page/ese-theory-timetable" className="dropdown-item">Timetable Schedule</a>
                                                <a href="/page/ese-theory-result" className="dropdown-item">Result</a>
                                            </div>
                                        </div>

                                        {/* Practical Examination */}
                                        <div className="dropdown-item-container" style={{ position: 'relative', overflow: 'visible' }}>
                                            <a href="#" className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setMobileExpanded(prev => ({ ...prev, 'EXAM_PRACTICAL': !prev['EXAM_PRACTICAL'] }));
                                                }}>
                                                Practical Examination <span style={{ fontSize: '0.8em' }}>{mobileExpanded['EXAM_PRACTICAL'] ? '▼' : '▶'}</span>
                                            </a>
                                            <div className="dropdown-menu-nested" style={{
                                                position: 'absolute', right: '100%', top: 0, minWidth: '200px',
                                                background: theme === 'dark' ? '#000' : '#fff',
                                                borderRadius: '12px', padding: '0.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 1005,
                                                display: mobileExpanded['EXAM_PRACTICAL'] ? 'block' : 'none'
                                            }}>
                                                <a href="/page/ese-practical-timetable" className="dropdown-item">Timetable Schedule</a>
                                                <a href="/page/ese-practical-result" className="dropdown-item">Result</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>

                        {/* 4. CAREER Dropdown */}
                        {/* 4. CAREER Dropdown */}
                        <div className="nav-item-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}
                            onClick={(e) => { e.stopPropagation(); setMobileExpanded(prev => ({ ...prev, 'CAREER_UTILITY': !prev['CAREER_UTILITY'] })) }}>
                            <span style={{ fontSize: '0.85rem' }}>CAREER</span> <FaChevronDown size={10} />
                            <div className="dropdown-menu" style={{
                                minWidth: '160px', left: 'auto', right: 0, top: '100%',
                                background: theme === 'dark' ? '#000' : '#fff',
                                color: theme === 'dark' ? '#fff' : '#000',
                                display: mobileExpanded['CAREER_UTILITY'] ? 'block' : 'none'
                            }}>
                                <a href="/careers" className="dropdown-item">Job Openings</a>
                            </div>
                        </div>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>

                        {/* 5. Portal Login */}
                        <a href="https://portal.EASAcollege.com/Login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s', color: 'var(--nav-text)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--nav-text)'}>
                            <FaUser size={12} /> Portal Login
                        </a>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>

                        {/* 6. Pay Online Dropdown */}
                        <div className="nav-item-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}
                            onClick={(e) => { e.stopPropagation(); setMobileExpanded(prev => ({ ...prev, 'PAY_UTILITY': !prev['PAY_UTILITY'] })) }}>
                            <span style={{ fontSize: '0.85rem' }}>PAY ONLINE</span> <FaChevronDown size={10} />
                            <div className="dropdown-menu" style={{
                                minWidth: '160px', left: 'auto', right: 0, top: '100%',
                                background: theme === 'dark' ? '#000' : '#fff',
                                color: theme === 'dark' ? '#fff' : '#000',
                                display: mobileExpanded['PAY_UTILITY'] ? 'block' : 'none'
                            }}>
                                <a href="#" className="dropdown-item">College Fee</a>
                                <a href="#" className="dropdown-item">Exam Fee</a>
                            </div>
                        </div>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>


                        {/* 7. ALUMNI Dropdown */}
                        <div className="nav-item-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}
                            onClick={(e) => { e.stopPropagation(); setMobileExpanded(prev => ({ ...prev, 'ALUMNI_UTILITY': !prev['ALUMNI_UTILITY'] })) }}>
                            <span style={{ fontSize: '0.85rem' }}>ALUMNI</span> <FaChevronDown size={10} />
                            <div className="dropdown-menu" style={{
                                minWidth: '160px', left: 'auto', right: 0, top: '100%',
                                background: theme === 'dark' ? '#000' : '#fff',
                                color: theme === 'dark' ? '#fff' : '#000',
                                display: mobileExpanded['ALUMNI_UTILITY'] ? 'block' : 'none'
                            }}>
                                <a href="/alumni-registration" className="dropdown-item">Registration</a>
                                <a href="/alumni-social" className="dropdown-item">Alumni Social</a>
                            </div>
                        </div>
                        
                        {/* 8. Language Selector */}
                        <div className="nav-item-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', position: 'relative' }}
                            onClick={(e) => { e.stopPropagation(); setMobileExpanded(prev => ({ ...prev, 'LANG_UTILITY': !prev['LANG_UTILITY'] })) }}>
                            <FaGlobe size={12} /> {selectedLanguage.name} <FaChevronDown size={10} />
                            <div className="dropdown-menu" style={{
                                minWidth: '140px', left: 'auto', right: 0, top: '100%',
                                background: theme === 'dark' ? '#000' : '#fff',
                                color: theme === 'dark' ? '#fff' : '#000',
                                display: mobileExpanded['LANG_UTILITY'] ? 'block' : 'none'
                            }}>
                                {languages.map((lang) => (
                                    <a
                                        key={lang.code}
                                        href="#"
                                        className="dropdown-item"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSelectedLanguage(lang);
                                        }}
                                    >
                                        {lang.name} <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{lang.code}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div style={{ width: '1px', height: '14px', background: 'var(--glass-border)' }}></div>

                        {/* 9. Theme Switch */}
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Main Header: Logo & Actions - Premium Feel */}
            <div className="container header-row" style={{ padding: '0.8rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Left: College Logo (Desktop & Mobile) */}
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={logoToDisplay} alt="EASA College Logo" style={{ height: '310px', objectFit: 'contain' }} />
                </div>

                <div className="nav-tablet-hide-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={accreditationsToDisplay} alt="Accreditations" style={{ height: '350px', objectFit: 'contain' }} />
                </div>

                <div className="nav-tablet-hide-mobile" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={yearsOfExcellence} alt="18+ Years of Excellence" style={{ height: '225px', objectFit: 'contain' }} />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-menu-btn nav-tablet-show-mobile" style={{ alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                    <div onClick={toggleMenu} style={{
                        fontSize: '1.4rem',
                        cursor: 'pointer',
                        color: isMenuOpen ? '#fff' : 'var(--text-main)', // Adaptive color
                        background: isMenuOpen ? 'var(--primary)' : 'var(--glass)', // Glass effect
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        padding: '0.6rem',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: isMenuOpen ? '0 4px 12px var(--primary-glow)' : 'none'
                    }}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>

            {/* Navigation Bar - Clean & Centered */}
            <div className="nav-tablet-hide-mobile" style={{ borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.1)', width: '100%' }}>
                {/* CSS for hover effect */}
                <div className="container" style={{ maxWidth: '100%', padding: '0 1rem' }}>
                    <nav className="desktop-nav" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '0', minHeight: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* Navigation Items Structure */}
                        {dynamicNavItems.map((item, index) => (
                            <div key={index} className="nav-item-dropdown" style={{ position: item.isMega ? 'static' : 'relative' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Close other menus if needed, or just toggle this one
                                    setMobileExpanded(prev => {
                                        const newState = { ...prev };
                                        // Optional: Close others? For now, just toggle.
                                        // Object.keys(newState).forEach(k => newState[k] = false); 
                                        newState[item.title] = !prev[item.title];
                                        return newState;
                                    });
                                }}
                            >
                                <a href={item.href || '#'} className="nav-link" style={{ fontSize: '0.7rem', fontWeight: '500', textTransform: 'uppercase', display: 'flex', alignItems: 'center', padding: '0.75rem 0', whiteSpace: 'nowrap' }}
                                    onClick={(e) => {
                                        if (item.children) {
                                            e.preventDefault();
                                        } else if (item.href === '/') {
                                            e.preventDefault();
                                            navigate('/');
                                        }
                                    }}>
                                    {item.title} {item.children && <span style={{ fontSize: '0.6em', marginLeft: '4px', marginTop: '2px' }}>{mobileExpanded[item.title] ? '▲' : '▼'}</span>}
                                </a>

                                {item.children && (
                                    <div className="dropdown-menu" style={{
                                        display: mobileExpanded[item.title] ? (item.title === 'ABOUT US' ? 'grid' : 'block') : 'none',
                                        ...(item.title === 'ABOUT US' ? {
                                            minWidth: '500px',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '0.5rem',
                                            // Override normal display block if grid is needed, but handled above in conditional
                                        } : {}),
                                        ...(item.isMega ? {
                                            width: '100vw',
                                            left: '0',
                                            right: '0',
                                            marginLeft: '0',
                                            padding: '1rem 0',
                                            background: 'var(--bg-card)',
                                            borderTop: '3px solid var(--secondary)',
                                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                            maxHeight: 'calc(100vh - 80px)',
                                            overflowY: 'auto'
                                        } : {}),
                                        ...(item.title === 'GRIEVANCES' ? {
                                            right: 0,
                                            left: 'auto'
                                        } : {})
                                    }}>
                                        {item.isMega ? (
                                            <div className="container">
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                                    {item.children.map((column, colIndex) => (
                                                        <div key={colIndex}>
                                                            <h4 style={{
                                                                fontSize: '0.9rem',
                                                                fontWeight: '700',
                                                                marginBottom: '0.6rem',
                                                                paddingBottom: '0.3rem',
                                                                borderBottom: '1px solid var(--glass-border)',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                color: 'var(--secondary)'
                                                            }}>
                                                                {column.title} <span style={{ fontSize: '0.8em', opacity: 0.6 }}>›</span>
                                                            </h4>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                                {column.children.map((link, linkIndex) => (
                                                                    <a
                                                                        key={linkIndex}
                                                                        href={link.href}
                                                                        className="dropdown-item"
                                                                        style={{
                                                                            padding: '0.35rem 0.6rem',
                                                                            borderBottom: 'none',
                                                                            borderRadius: '6px',
                                                                            fontSize: '0.85rem',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'flex-start',
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        {link.title}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            item.children.map((child, cIndex) => (
                                                <div key={cIndex} className="dropdown-item-container" style={{ position: 'relative', overflow: 'visible' }}>
                                                    <a
                                                        href={child.href || '#'}
                                                        className="dropdown-item"
                                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                                        onClick={(e) => {
                                                            if (child.title === 'Application Form' && onApplyClick) {
                                                                e.preventDefault();
                                                                onApplyClick();
                                                            }
                                                        }}
                                                    >
                                                        {child.title}
                                                        {child.children && <span style={{ fontSize: '0.8em' }}>▶</span>}
                                                    </a>

                                                    {/* Nested Dropdown (Level 2) */}
                                                    {child.children && (
                                                        <div className="dropdown-menu-nested" style={{
                                                            position: 'absolute',
                                                            left: (item.title === 'GRIEVANCES' || item.title === 'RESOURCES') ? 'auto' : '100%',
                                                            right: (item.title === 'GRIEVANCES' || item.title === 'RESOURCES') ? '100%' : 'auto',
                                                            top: 0,
                                                            minWidth: child.title === 'Campus' ? '420px' : '200px',
                                                            background: 'var(--bg-card)',
                                                            borderRadius: '12px',
                                                            padding: '0.5rem',
                                                            border: '1px solid var(--glass-border)',
                                                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                            backdropFilter: 'none',
                                                            zIndex: 1005,
                                                            display: 'none',
                                                        }}>
                                                            {child.title === 'Campus' ? (
                                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                                                    {child.children.map((subChild, sIndex) => (
                                                                        <a key={sIndex} href={subChild.href || '#'} className="dropdown-item">
                                                                            {subChild.title}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                child.children.map((subChild, sIndex) => (
                                                                    <a key={sIndex} href={subChild.href || '#'} className="dropdown-item">
                                                                        {subChild.title}
                                                                    </a>
                                                                ))
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div >

            {/* Mobile Menu Overlay */}
            {/* Mobile Menu Overlay */}
            <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Menu</span>
                    <FaTimes size={24} onClick={toggleMenu} style={{ cursor: 'pointer' }} />
                </div>

                {/* Theme Toggle in Mobile Menu */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>Switch Theme</span>
                    <ThemeToggle />
                </div>

                <div className="mobile-menu-content">
                    {[...dynamicNavItems, ...UTILITY_ITEMS].map((item, index) => (
                        <div key={index} className="mobile-item-border">
                            <div
                                onClick={() => item.children ? toggleMobileItem(item.title) : null}
                                className="mobile-item-header"
                            >
                                {item.href ? <a href={item.href} style={{ color: 'inherit' }}>{item.title}</a> : <span>{item.title}</span>}
                                {item.children && (
                                    <FaChevronDown
                                        size={12}
                                        style={{
                                            transform: mobileExpanded[item.title] ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    />
                                )}
                            </div>

                            {/* Mobile Dropdown Children */}
                            {item.children && mobileExpanded[item.title] && (
                                <div className="mobile-dropdown-content">
                                    {item.children.map((child, cIndex) => (
                                        <div key={cIndex} style={{ padding: '0.5rem 0' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <a
                                                    href={child.href || '#'}
                                                    className="mobile-sub-link"
                                                    onClick={(e) => {
                                                        if (child.title === 'Application Form' && onApplyClick) {
                                                            e.preventDefault();
                                                            onApplyClick();
                                                            toggleMenu();
                                                        }
                                                    }}
                                                >
                                                    {child.title}
                                                </a>
                                                {child.children && (
                                                    <div className="mobile-nested-container">
                                                        {child.children.map((sub, sIndex) => (
                                                            <a key={sIndex} href={sub.href || '#'} className="mobile-nested-link">
                                                                {sub.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button className="btn btn-warning" style={{ width: '100%' }}>Pay Fees</button>
                    <button className="btn btn-primary" onClick={() => { onApplyClick(); toggleMenu(); }} style={{ width: '100%' }}>Apply Now</button>
                </div>
            </div>

            {/* Backdrop for mobile menu */}
            <div className={`mobile-backdrop ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

            <style>{`
                @media (max-width: 1400px) {
                    .desktop-nav { gap: 0.6rem !important; }
                    .nav-link { font-size: 0.65rem !important; }
                    .header-row img { height: 45px !important; }
                }

                @media (max-width: 1100px) {
                    .nav-tablet-hide-mobile { display: none !important; }
                    
                    .header-row.container {
                        display: flex !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                        padding: 0.5rem 1rem !important;
                        height: 60px !important;
                        width: 100% !important;
                        max-width: 100% !important;
                    }

                    .header-row.container > div:first-child {
                        position: relative !important;
                        left: 0 !important;
                        top: 0 !important;
                        transform: none !important;
                        max-width: 70%;
                    }

                    .header-row.container img {
                        height: 40px !important;
                    }

                    .mobile-menu-btn {
                        display: flex !important;
                        margin-left: auto !important;
                    }
                }

                /* Mobile Drawer Enhancements */
                .mobile-drawer {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .mobile-menu-content {
                    flex: 1;
                    overflow-y: auto;
                    margin: 1rem 0;
                    padding-right: 5px;
                }

                .mobile-menu-content::-webkit-scrollbar {
                    width: 4px;
                }

                .mobile-menu-content::-webkit-scrollbar-thumb {
                    background: var(--glass-border);
                    border-radius: 4px;
                }

                /* Dropdown Logic */
                .nav-item-dropdown {
                    position: relative;
                }
                
                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    min-width: 220px;
                    background: var(--bg-card);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(10px);
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    z-index: 1050;
                    padding: 0.5rem;
                }

                .nav-item-dropdown:hover .dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .dropdown-item {
                    display: block;
                    padding: 0.7rem 1rem;
                    color: var(--text-main);
                    font-size: 0.9rem;
                    font-weight: 500;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }

                .dropdown-item:hover {
                    background: var(--glass-highlight);
                    color: var(--secondary);
                    padding-left: 1.25rem;
                }

                /* Nested Dropdowns */
                .dropdown-item-container:hover .dropdown-menu-nested {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(0);
                }

                .dropdown-menu-nested {
                    position: absolute;
                    top: -5px;
                    left: 100%;
                    min-width: 200px;
                    background: var(--bg-card);
                    backdrop-filter: blur(16px);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    padding: 0.5rem;
                    opacity: 0;
                    transform: translateX(10px);
                    visibility: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
            `}</style>
        </header >
    );
};

export default Navbar;
