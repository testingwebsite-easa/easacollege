import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaSearch,
    FaUniversity,
    FaBookOpen,
    FaLightbulb,
    FaFlask,
    FaFileAlt
} from 'react-icons/fa';
import API_BASE_URL from '../api';
import { departmentResearchData as defaultDeptResearch } from '../data/facultyResearchData';

const DepartmentResearchShowcase = ({ departmentFilter = null }) => {
    const [deptResearchList, setDeptResearchList] = useState(defaultDeptResearch);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState(departmentFilter || 'ALL');

    useEffect(() => {
        const fetchDeptData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/department-research-overview`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setDeptResearchList(data);
                    }
                }
            } catch (err) {
                console.warn("Using default department research data:", err);
            }
        };
        fetchDeptData();
    }, []);

    const isDeptMatch = (itemDept, selDept) => {
        if (selDept === 'ALL') return true;
        const normItem = (itemDept || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        const normSel = (selDept || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        return normItem === normSel;
    };

    // Filter department research overview
    const filteredDeptResearch = deptResearchList.filter(item => {
        const matchesDept = isDeptMatch(item.department, selectedDept);
        const matchesSearch =
            (item.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.overview || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.domains || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.interests || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.laboratories || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    // Calculate Summary Stats
    const totalDepartments = deptResearchList.length;
    const totalPubs = deptResearchList.reduce((acc, d) => acc + (parseInt(d.publications) || 0), 0);
    const totalPatents = deptResearchList.reduce((acc, d) => acc + (parseInt(d.patents) || 0), 0);
    const totalBooks = deptResearchList.reduce((acc, d) => acc + (parseInt(d.books) || 0), 0);

    const departments = ['ALL', ...Array.from(new Set(['S&H', 'MBA', 'CIVIL', 'AGRI', 'EEE', 'CSE', 'ECE', 'MECH', 'BME', ...deptResearchList.map(d => (d.department || '').toUpperCase())]))];

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
                        <FaUniversity />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalDepartments}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Research Departments</p>
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
                        <FaBookOpen />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalPubs}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Department Publications</p>
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
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalPatents}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Department Patents</p>
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
                        <FaFlask />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>{totalBooks}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Authored Books / Chapters</p>
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
                        placeholder="Search department, domains, projects, labs..."
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

            {/* DEPARTMENT RESEARCH OVERVIEW TABLE (12 EXACT COLUMNS) */}
            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                overflowX: 'auto',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                width: '100%'
            }}>
                <table style={{ width: '100%', minWidth: '1600px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#1B2A6B', color: '#ffffff', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '60px', textAlign: 'center', verticalAlign: 'middle' }}>S. No.</th>
                            <th style={{ padding: '1rem 0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '110px', textAlign: 'center', verticalAlign: 'middle' }}>Department</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '280px', verticalAlign: 'middle' }}>Department Research Overview</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '220px', verticalAlign: 'middle' }}>Research Domains</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '220px', verticalAlign: 'middle' }}>Faculty Research Interests</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '220px', verticalAlign: 'middle' }}>Ongoing Research Projects</th>
                            <th style={{ padding: '1rem 1rem', borderRight: '1px solid rgba(255,255,255,0.1)', minWidth: '220px', verticalAlign: 'middle' }}>Completed Research Projects</th>
                            <th style={{ padding: '1rem 0.8rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '120px', textAlign: 'center', verticalAlign: 'middle' }}>Sponsored Projects</th>
                            <th style={{ padding: '1rem 0.6rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '80px', textAlign: 'center', verticalAlign: 'middle' }}>Publications</th>
                            <th style={{ padding: '1rem 0.6rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '70px', textAlign: 'center', verticalAlign: 'middle' }}>Patents</th>
                            <th style={{ padding: '1rem 0.6rem', borderRight: '1px solid rgba(255,255,255,0.1)', width: '100px', textAlign: 'center', verticalAlign: 'middle' }}>Books / Chapters</th>
                            <th style={{ padding: '1rem 0.9rem', minWidth: '160px', verticalAlign: 'middle' }}>Research Laboratories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDeptResearch.length === 0 ? (
                            <tr>
                                <td colSpan="12" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    No department research overview records found matching your query.
                                </td>
                            </tr>
                        ) : (
                            filteredDeptResearch.map((item, index) => (
                                <tr key={item.sNo || index} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.88rem', lineHeight: '1.5' }} className="table-row-hover">
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{index + 1}</td>
                                    <td style={{ padding: '1rem 0.9rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.department}</td>
                                    <td style={{ padding: '1rem 1rem', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.overview}</td>
                                    <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', verticalAlign: 'middle' }}>{item.domains}</td>
                                    <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', verticalAlign: 'middle' }}>{item.interests}</td>
                                    <td style={{ padding: '1rem 1rem', color: 'var(--text-main)', fontWeight: '600', verticalAlign: 'middle' }}>{item.ongoingProjects}</td>
                                    <td style={{ padding: '1rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem', verticalAlign: 'middle' }}>{item.completedProjects}</td>
                                    <td style={{ padding: '1rem 0.8rem', textAlign: 'center', fontWeight: '700', color: 'var(--text-muted)', verticalAlign: 'middle' }}>{item.sponsoredProjects}</td>
                                    <td style={{ padding: '1rem 0.6rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.publications}</td>
                                    <td style={{ padding: '1rem 0.6rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.patents}</td>
                                    <td style={{ padding: '1rem 0.6rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.books}</td>
                                    <td style={{ padding: '1rem 0.9rem', fontWeight: '700', color: 'var(--text-main)', verticalAlign: 'middle' }}>{item.laboratories}</td>
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

export default DepartmentResearchShowcase;
