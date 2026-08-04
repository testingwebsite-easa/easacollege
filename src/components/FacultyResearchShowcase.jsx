import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaExternalLinkAlt,
    FaUsers,
    FaBookOpen,
    FaLightbulb,
    FaCertificate,
    FaFileAlt,
    FaGraduationCap,
    FaUserGraduate
} from 'react-icons/fa';
import API_BASE_URL from '../api';
import {
    facultyResearchData as defaultProfiles,
    facultyPublicationsData as defaultPublications,
    facultyPhdData as defaultPhd,
    facultyPatentsData as defaultPatents
} from '../data/facultyResearchData';

const FacultyResearchShowcase = ({ departmentFilter = null }) => {
    const [activeTab, setActiveTab] = useState('publications'); // 'publications', 'patents', 'phd', or 'profiles'
    const [facultyList, setFacultyList] = useState(defaultProfiles);
    const [publicationsList, setPublicationsList] = useState(defaultPublications);
    const [phdList, setPhdList] = useState(defaultPhd);
    const [patentsList, setPatentsList] = useState(defaultPatents);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState(departmentFilter || 'ALL');

    useEffect(() => {
        const fetchFacultyData = async () => {
            try {
                const [resProfiles, resPubs, resPhd, resPatents] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/faculty-research`),
                    fetch(`${API_BASE_URL}/api/faculty-publications`),
                    fetch(`${API_BASE_URL}/api/faculty-phd`),
                    fetch(`${API_BASE_URL}/api/faculty-patents`)
                ]);

                if (resProfiles.ok) {
                    const dataP = await resProfiles.json();
                    if (Array.isArray(dataP) && dataP.length > 0) setFacultyList(dataP);
                }

                if (resPubs.ok) {
                    const dataPubs = await resPubs.json();
                    if (Array.isArray(dataPubs) && dataPubs.length > 0) setPublicationsList(dataPubs);
                }

                if (resPhd.ok) {
                    const dataPhd = await resPhd.json();
                    if (Array.isArray(dataPhd) && dataPhd.length > 0) setPhdList(dataPhd);
                }

                if (resPatents.ok) {
                    const dataPatents = await resPatents.json();
                    if (Array.isArray(dataPatents) && dataPatents.length > 0) setPatentsList(dataPatents);
                }
            } catch (err) {
                console.warn("Using default faculty research data:", err);
            }
        };
        fetchFacultyData();
    }, []);

    const isDeptMatch = (itemDept, selDept) => {
        if (selDept === 'ALL') return true;
        const normItem = (itemDept || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        const normSel = (selDept || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

        if (normSel === 'SH' || normSel === 'SANDH') {
            return normItem.includes('SH') ||
                normItem.includes('SCIENCE') ||
                normItem.includes('MATH') ||
                normItem.includes('PHYSIC') ||
                normItem.includes('CHEM') ||
                normItem.includes('TAMIL') ||
                normItem.includes('ENGLISH');
        }

        return normItem === normSel || normItem.includes(normSel) || normSel.includes(normItem);
    };

    // Filter faculty profiles
    const filteredFaculty = facultyList.filter(item => {
        const matchesDept = isDeptMatch(item.department, selectedDept);
        const matchesSearch =
            (item.facultyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.researchArea || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.qualification || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.memberships || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.designation || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Filter publications
    const filteredPublications = publicationsList.filter(item => {
        const matchesDept = isDeptMatch(item.department, selectedDept);
        const matchesSearch =
            (item.faculty || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.authors || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.journalConferenceBook || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.publisher || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.indexing || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Filter Ph.D scholars
    const filteredPhd = phdList.filter(item => {
        const matchesDept = isDeptMatch(item.department, selectedDept);
        const matchesSearch =
            (item.facultyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.phdProgramDetails || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.researchAreas || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.researchSupervisors || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.status || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Filter Patents
    const filteredPatents = patentsList.filter(item => {
        const matchesDept = isDeptMatch(item.department, selectedDept);
        const matchesSearch =
            (item.faculty || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.patentTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.inventors || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.applicationNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.status || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Calculate Summary Stats
    const totalFaculty = facultyList.length;
    const totalPhdScholars = phdList.length;
    const totalPubs = publicationsList.length + facultyList.reduce((acc, f) => acc + (parseInt(f.publicationsCount) || 0), 0);
    const totalPatentsCount = patentsList.length + facultyList.reduce((acc, f) => acc + (parseInt(f.patentsCount) || 0), 0);

    const departments = ['ALL', ...Array.from(new Set([
        'S&H', 'MBA', 'AGRI', 'CIVIL', 'EEE', 'CSE', 'ECE', 'MECH', 'BME',
        ...facultyList.map(d => (d.department || '').toUpperCase()),
        ...publicationsList.map(d => (d.department || '').toUpperCase()),
        ...phdList.map(d => (d.department || '').toUpperCase()),
        ...patentsList.map(d => (d.department || '').toUpperCase())
    ]))];

    return (
        <section style={{ padding: '2rem 0', width: '100%' }}>
            {/* MAIN VIEW SWITCH TABS */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem'
            }}>
                <button
                    onClick={() => setActiveTab('publications')}
                    style={{
                        padding: '0.85rem 1.8rem',
                        borderRadius: '30px',
                        border: activeTab === 'publications' ? 'none' : '2px solid var(--primary)',
                        background: activeTab === 'publications' ? 'linear-gradient(135deg, #1B2A6B 0%, #3B82F6 100%)' : 'transparent',
                        color: activeTab === 'publications' ? '#ffffff' : 'var(--primary)',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: activeTab === 'publications' ? '0 6px 20px rgba(27,42,107,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FaFileAlt /> Faculty Publications
                </button>
                <button
                    onClick={() => setActiveTab('patents')}
                    style={{
                        padding: '0.85rem 1.8rem',
                        borderRadius: '30px',
                        border: activeTab === 'patents' ? 'none' : '2px solid var(--primary)',
                        background: activeTab === 'patents' ? 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)' : 'transparent',
                        color: activeTab === 'patents' ? '#ffffff' : 'var(--primary)',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: activeTab === 'patents' ? '0 6px 20px rgba(217,119,6,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FaLightbulb /> Patent Details
                </button>
                <button
                    onClick={() => setActiveTab('phd')}
                    style={{
                        padding: '0.85rem 1.8rem',
                        borderRadius: '30px',
                        border: activeTab === 'phd' ? 'none' : '2px solid var(--primary)',
                        background: activeTab === 'phd' ? 'linear-gradient(135deg, #1B2A6B 0%, #3B82F6 100%)' : 'transparent',
                        color: activeTab === 'phd' ? '#ffffff' : 'var(--primary)',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: activeTab === 'phd' ? '0 6px 20px rgba(27,42,107,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FaUserGraduate /> Ph.D. Research Program
                </button>
                <button
                    onClick={() => setActiveTab('profiles')}
                    style={{
                        padding: '0.85rem 1.8rem',
                        borderRadius: '30px',
                        border: activeTab === 'profiles' ? 'none' : '2px solid var(--primary)',
                        background: activeTab === 'profiles' ? 'linear-gradient(135deg, #1B2A6B 0%, #3B82F6 100%)' : 'transparent',
                        color: activeTab === 'profiles' ? '#ffffff' : 'var(--primary)',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: activeTab === 'profiles' ? '0 6px 20px rgba(27,42,107,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <FaGraduationCap /> Faculty Research Profiles
                </button>
            </div>

            {/* STATS OVERVIEW CARDS */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem'
            }}>
                <motion.div
                    whileHover={{ y: -4 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(5,150,105,0.08) 0%, rgba(5,150,105,0.02) 100%)',
                        border: '1px solid rgba(5,150,105,0.15)',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: '#059669',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem'
                    }}>
                        <FaBookOpen />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalPubs}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total Publications</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0.02) 100%)',
                        border: '1px solid rgba(217,119,6,0.15)',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: '#D97706',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem'
                    }}>
                        <FaLightbulb />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalPatentsCount}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Patents & Innovations</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(27,42,107,0.08) 0%, rgba(27,42,107,0.02) 100%)',
                        border: '1px solid rgba(27,42,107,0.15)',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'var(--primary)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem'
                    }}>
                        <FaUserGraduate />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalPhdScholars}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Ph.D. Research Scholars</p>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -4 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.02) 100%)',
                        border: '1px solid rgba(124,58,237,0.15)',
                        borderRadius: '16px',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: '#7C3AED',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem'
                    }}>
                        <FaUsers />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalFaculty}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Faculty Members</p>
                    </div>
                </motion.div>
            </div>

            {/* SEARCH AND DEPT FILTERS BAR */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                background: 'var(--bg-card)',
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)'
            }}>
                {/* Department Filter Tabs */}
                {!departmentFilter && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                style={{
                                    padding: '0.45rem 1rem',
                                    borderRadius: '25px',
                                    border: selectedDept === dept ? 'none' : '1px solid var(--glass-border)',
                                    background: selectedDept === dept ? 'var(--primary)' : 'transparent',
                                    color: selectedDept === dept ? '#ffffff' : 'var(--text-main)',
                                    fontSize: '0.82rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                )}

                {/* Search Bar */}
                <div style={{ position: 'relative', flex: '1 1 250px', maxWidth: '380px' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search title, faculty, journal, publisher, status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.65rem 1rem 0.65rem 2.6rem',
                            borderRadius: '30px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--bg-main)',
                            color: 'var(--text-main)',
                            fontSize: '0.88rem',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* TAB CONTENT 1: FACULTY PUBLICATIONS TABLE */}
            {activeTab === 'publications' && (
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    overflowX: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    width: '100%'
                }}>
                    <table style={{ width: '100%', minWidth: '1300px', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#1B2A6B', color: '#ffffff', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>S.No.</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '150px', verticalAlign: 'middle' }}>Faculty</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Dept</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '150px', verticalAlign: 'middle' }}>Category</th>
                                <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '280px', verticalAlign: 'middle' }}>Paper Title</th>
                                <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '220px', verticalAlign: 'middle' }}>Author(s)</th>
                                <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '250px', verticalAlign: 'middle' }}>Journal / Conference</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '100px', textAlign: 'center', verticalAlign: 'middle' }}>Publisher</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Year</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '180px', verticalAlign: 'middle' }}>DOI / ISBN</th>
                                <th style={{ padding: '1rem 0.9rem', width: '140px', textAlign: 'center', verticalAlign: 'middle' }}>Indexing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPublications.length === 0 ? (
                                <tr>
                                    <td colSpan="11" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        No publication records found matching your query.
                                    </td>
                                </tr>
                            ) : (
                                filteredPublications.map((pub, index) => (
                                    <tr key={pub.sNo || index} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.88rem', lineHeight: '1.5' }} className="table-row-hover">
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{index + 1}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{pub.faculty}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{pub.department}</td>
                                        <td style={{ padding: '1rem 0.8rem', color: 'var(--text-main)', fontWeight: '600', verticalAlign: 'middle' }}>{pub.publicationCategory}</td>
                                        <td style={{ padding: '1rem 1rem', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{pub.title}</td>
                                        <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', verticalAlign: 'middle' }}>{pub.authors}</td>
                                        <td style={{ padding: '1rem 1rem', color: 'var(--text-main)', fontStyle: 'italic', fontSize: '0.85rem', verticalAlign: 'middle' }}>{pub.journalConferenceBook}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{pub.publisher}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{pub.year}</td>
                                        <td style={{ padding: '1rem 0.9rem', verticalAlign: 'middle' }}>
                                            <span style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--text-main)', fontSize: '0.82rem', wordBreak: 'break-word', display: 'block', lineHeight: '1.4' }}>
                                                {pub.doiIsbn || '-'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 0.9rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{pub.indexing}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TAB CONTENT 2: PATENT DETAILS TABLE */}
            {activeTab === 'patents' && (
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    overflowX: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    width: '100%'
                }}>
                    <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#D97706', color: '#ffffff', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.2)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>S.No.</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.2)', minWidth: '150px', verticalAlign: 'middle' }}>Faculty</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.2)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Dept</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.2)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Patents</th>
                                <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.2)', minWidth: '320px', verticalAlign: 'middle' }}>Patent Title</th>
                                <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.2)', minWidth: '260px', verticalAlign: 'middle' }}>Inventor(s)</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.2)', minWidth: '180px', verticalAlign: 'middle' }}>Patent / App No.</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.2)', width: '120px', textAlign: 'center', verticalAlign: 'middle' }}>Status</th>
                                <th style={{ padding: '1rem 0.8rem', width: '110px', textAlign: 'center', verticalAlign: 'middle' }}>Grant Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatents.length === 0 ? (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        No patent records found matching your query.
                                    </td>
                                </tr>
                            ) : (
                                filteredPatents.map((item, index) => (
                                    <tr key={item.sNo || index} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.88rem', lineHeight: '1.5' }} className="table-row-hover">
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{index + 1}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.faculty}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.department}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.patents || 1}</td>
                                        <td style={{ padding: '1rem 1rem', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.patentTitle}</td>
                                        <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', verticalAlign: 'middle' }}>{item.inventors}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.applicationNumber}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.status}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.grantDate || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TAB CONTENT 3: PH.D. RESEARCH PROGRAM TABLE */}
            {activeTab === 'phd' && (
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    overflowX: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    width: '100%'
                }}>
                    <table style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#1B2A6B', color: '#ffffff', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>S.No.</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '160px', verticalAlign: 'middle' }}>Faculty Name</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Registration Date</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '180px', verticalAlign: 'middle' }}>Ph.D. Program</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '180px', verticalAlign: 'middle' }}>Research Area</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '160px', verticalAlign: 'middle' }}>Supervisor</th>
                                <th style={{ padding: '1rem 0.8rem', textAlign: 'center', width: '120px', verticalAlign: 'middle' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPhd.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        No Ph.D. research program records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredPhd.map((item, index) => (
                                    <tr key={item.sNo || index} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.88rem', lineHeight: '1.5' }} className="table-row-hover">
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{index + 1}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.facultyName}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.dateOfRegistration}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.phdProgramDetails}</td>
                                        <td style={{ padding: '1rem 0.9rem', color: 'var(--text-main)', fontWeight: '600', verticalAlign: 'middle' }}>{item.researchAreas}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.researchSupervisors}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TAB CONTENT 4: FACULTY RESEARCH PROFILES TABLE */}
            {activeTab === 'profiles' && (
                <div style={{
                    background: 'var(--bg-card)',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    overflowX: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                    width: '100%'
                }}>
                    <table style={{ width: '100%', minWidth: '1500px', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#1B2A6B', color: '#ffffff', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '50px', textAlign: 'center', verticalAlign: 'middle' }}>S.No</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '70px', textAlign: 'center', verticalAlign: 'middle' }}>Dept</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '150px', verticalAlign: 'middle' }}>Faculty Name</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '100px', verticalAlign: 'middle' }}>Designation</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', verticalAlign: 'middle' }}>Qual</th>
                                <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '150px', verticalAlign: 'middle' }}>Research Area</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '120px', verticalAlign: 'middle' }}>Google Scholar</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '120px', verticalAlign: 'middle' }}>Scopus ID</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '130px', verticalAlign: 'middle' }}>ORCID ID</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '100px', verticalAlign: 'middle' }}>Vidwan</th>
                                <th style={{ padding: '1rem 0.6rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>Pubs</th>
                                <th style={{ padding: '1rem 0.6rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>Books</th>
                                <th style={{ padding: '1rem 0.6rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>Patents</th>
                                <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '100px', verticalAlign: 'middle' }}>Awards</th>
                                <th style={{ padding: '1rem 0.8rem', minWidth: '120px', verticalAlign: 'middle' }}>Memberships</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFaculty.length === 0 ? (
                                <tr>
                                    <td colSpan="15" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                        No faculty research records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredFaculty.map((item, index) => (
                                    <tr key={item.sNo || index} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.85rem', lineHeight: '1.5' }} className="table-row-hover">
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{index + 1}</td>
                                        <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.department || '-'}</td>
                                        <td style={{ padding: '1rem 0.9rem', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.facultyName || '-'}</td>
                                        <td style={{ padding: '1rem 0.8rem', color: 'var(--text-main)', fontWeight: '700', verticalAlign: 'middle' }}>{item.designation || '-'}</td>
                                        <td style={{ padding: '1rem 0.8rem', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{item.qualification || '-'}</td>
                                        <td style={{ padding: '1rem 0.9rem', color: 'var(--text-main)', fontWeight: '600', verticalAlign: 'middle' }}>{item.researchArea || '-'}</td>
                                        <td style={{ padding: '1rem 0.8rem', verticalAlign: 'middle' }}>
                                            {item.googleScholar ? (
                                                <a href={item.googleScholar} target="_blank" rel="noopener noreferrer" style={{ color: '#4285F4', fontWeight: '700', textDecoration: 'none', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    Link <FaExternalLinkAlt style={{ fontSize: '0.65rem' }} />
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td style={{ padding: '1rem 0.8rem', fontSize: '0.8rem', verticalAlign: 'middle' }}>
                                            {item.scopusId ? (
                                                <a href={`https://www.scopus.com/authid/detail.uri?authorId=${item.scopusId}`} target="_blank" rel="noopener noreferrer" style={{ color: '#E9711C', fontWeight: '700', textDecoration: 'none' }}>
                                                    {item.scopusId}
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td style={{ padding: '1rem 0.8rem', fontSize: '0.8rem', verticalAlign: 'middle' }}>
                                            {item.orcidId ? (
                                                <a href={item.orcidId} target="_blank" rel="noopener noreferrer" style={{ color: '#A6CE39', fontWeight: '700', textDecoration: 'none' }}>
                                                    {item.orcidId.replace(/https?:\/\/orcid.org\//, '')}
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td style={{ padding: '1rem 0.8rem', fontSize: '0.8rem', verticalAlign: 'middle' }}>
                                            {item.vidwanProfile ? (
                                                <a href={`https://vidwan.inflibnet.ac.in/profile/${item.vidwanProfile}`} target="_blank" rel="noopener noreferrer" style={{ color: '#8E44AD', fontWeight: '700', textDecoration: 'none' }}>
                                                    {item.vidwanProfile}
                                                </a>
                                            ) : '-'}
                                        </td>
                                        <td style={{ padding: '1rem 0.6rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.publicationsCount || 0}</td>
                                        <td style={{ padding: '1rem 0.6rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.booksCount || 0}</td>
                                        <td style={{ padding: '1rem 0.6rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.patentsCount || 0}</td>
                                        <td style={{ padding: '1rem 0.8rem', color: 'var(--text-main)', fontSize: '0.8rem', verticalAlign: 'middle' }}>{item.awards || '-'}</td>
                                        <td style={{ padding: '1rem 0.8rem', color: 'var(--text-main)', fontSize: '0.8rem', verticalAlign: 'middle' }}>{item.memberships || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
                .table-row-hover:hover {
                    background: rgba(255, 255, 255, 0.03) !important;
                }
            `}</style>
        </section>
    );
};

export default FacultyResearchShowcase;
