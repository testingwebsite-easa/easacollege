import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaUserGraduate,
    FaProjectDiagram,
    FaChalkboardTeacher,
    FaAward
} from 'react-icons/fa';
import API_BASE_URL from '../api';
import { studentResearchData as defaultStudentResearch } from '../data/studentResearchData';

const StudentResearchShowcase = ({ departmentFilter = null }) => {
    const [studentResearchList, setStudentResearchList] = useState(defaultStudentResearch);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState(departmentFilter || 'ALL');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/student-research-items`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setStudentResearchList(data);
                    }
                }
            } catch (err) {
                console.warn("Using default student research data:", err);
            }
        };
        fetchStudentData();
    }, []);

    const isDeptMatch = (itemDept, selDept) => {
        if (selDept === 'ALL') return true;
        const normItem = (itemDept || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        const normSel = (selDept || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        return normItem === normSel;
    };

    // Filter student research records
    const filteredResearch = studentResearchList.filter(item => {
        const matchesDept = isDeptMatch(item.department, selectedDept);
        const matchesSearch =
            (item.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.registerNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.projectTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.conferencePresentations || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.facultyGuide || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Calculate Summary Stats
    const totalStudents = studentResearchList.length;
    const uniqueProjects = new Set(studentResearchList.map(s => s.projectTitle)).size;
    const conferencePresentationsCount = studentResearchList.filter(s => s.conferencePresentations && s.conferencePresentations !== 'No' && s.conferencePresentations !== 'Not Available').length;
    const uniqueGuides = new Set(studentResearchList.map(s => s.facultyGuide)).size;

    const departments = ['ALL', 'EEE', 'CSE', 'ECE', 'MECH', 'BME'];

    return (
        <section style={{ padding: '2rem 0', width: '100%' }}>
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
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalStudents}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Student Researchers</p>
                    </div>
                </motion.div>

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
                        <FaProjectDiagram />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{uniqueProjects}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Innovative Projects</p>
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
                        <FaAward />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{conferencePresentationsCount}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Conference Papers</p>
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
                        <FaChalkboardTeacher />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{uniqueGuides}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Faculty Mentors</p>
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
                        placeholder="Search student, reg no, project, conference, guide..."
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

            {/* STUDENT RESEARCH TABLE (15 COLUMNS) */}
            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                overflowX: 'auto',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                width: '100%'
            }}>
                <table style={{ width: '100%', minWidth: '1700px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#1B2A6B', color: '#ffffff', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '50px', textAlign: 'center', verticalAlign: 'middle' }}>S.No</th>
                            <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '150px', verticalAlign: 'middle' }}>Student Name</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '120px', textAlign: 'center', verticalAlign: 'middle' }}>Register No</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Dept</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '100px', textAlign: 'center', verticalAlign: 'middle' }}>Academic Year</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '250px', verticalAlign: 'middle' }}>Student Research Project</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '90px', textAlign: 'center', verticalAlign: 'middle' }}>Final Year Project</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '90px', textAlign: 'center', verticalAlign: 'middle' }}>Publications</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '280px', verticalAlign: 'middle' }}>Conference Presentations</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Patent Filed</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Patent Granted</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '110px', textAlign: 'center', verticalAlign: 'middle' }}>Project Awards</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '110px', textAlign: 'center', verticalAlign: 'middle' }}>Hackathons</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '110px', textAlign: 'center', verticalAlign: 'middle' }}>Startups</th>
                            <th style={{ padding: '1rem 0.9rem', minWidth: '150px', verticalAlign: 'middle' }}>Faculty Guide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResearch.length === 0 ? (
                            <tr>
                                <td colSpan="15" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    No student research records found matching your query.
                                </td>
                            </tr>
                        ) : (
                            filteredResearch.map((item, index) => (
                                <tr key={item.sNo || index} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.88rem', lineHeight: '1.5' }} className="table-row-hover">
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{index + 1}</td>
                                    <td style={{ padding: '1rem 0.9rem', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.studentName}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.registerNo}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.department}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.academicYear}</td>
                                    <td style={{ padding: '1rem 1rem', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.projectTitle}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.finalYearProject}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.publications}</td>
                                    <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.84rem', verticalAlign: 'middle' }}>{item.conferencePresentations}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.patentFiled}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.patentGranted}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', verticalAlign: 'middle' }}>{item.projectAwards}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', verticalAlign: 'middle' }}>{item.hackathons}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', verticalAlign: 'middle' }}>{item.startupActivities}</td>
                                    <td style={{ padding: '1rem 0.9rem', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.facultyGuide}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <style>{`
                .table-row-hover:hover {
                    background: rgba(255, 255, 255, 0.03) !important;
                }
            `}</style>
        </section>
    );
};

export default StudentResearchShowcase;
