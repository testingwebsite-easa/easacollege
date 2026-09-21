import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import missionBg from '../../assets/mission-bg.webp';
import AdmissionForm from '../../components/AdmissionForm';
import AdmissionCTA from '../../components/AdmissionCTA';
import API_BASE_URL from '../../api';
import { departments as staticDepartments } from '../../data/departmentsData';
import { FaFilePdf, FaEye, FaDownload, FaBookOpen, FaGraduationCap, FaChevronDown, FaChevronUp, FaSearch, FaLightbulb, FaMusic, FaFlask, FaFileAlt, FaTimes, FaGlobe } from 'react-icons/fa';
import collegeLogo from '../../assets/Logo - Blue.webp';

import { SYLLABUS_DATA, GENERIC_FIRST_YEAR, getDetailedSyllabusForSubject } from '../../data/syllabusData';
import { sanitizeCoPoMapping, sortSubjectsByCode } from '../../utils/coPoMappingUtils';

const getRomanNumeral = (num) => {
    const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return roman[Number(num)] || num;
};

const mapStaticCategoryToAbbrev = (category) => {
    const raw = (category || '').toUpperCase().trim();
    if (raw.includes('HUMANITIES') || raw === 'HS' || raw === 'HUM') return 'HUM';
    if (raw.includes('BASIC SCIENCE') || raw === 'BS' || raw === 'BSC') return 'BSC';
    if (raw.includes('ENGINEERING SCIENCE') || raw === 'ES' || raw === 'ESC') return 'ESC';
    if (raw.includes('PROFESSIONAL CORE') || raw === 'PC' || raw === 'PCC') return 'PCC';
    if (raw.includes('PROFESSIONAL ELECTIVE') || raw === 'PE' || raw === 'PEC') return 'PEC';
    if (raw.includes('OPEN ELECTIVE') || raw === 'OE' || raw === 'OEC') return 'OEC';
    if (raw.includes('PROJECT') || raw.includes('EMPLOYABILITY') || raw === 'EE' || raw === 'EEC') return 'EEC';
    if (raw.includes('MANDATORY') || raw === 'MC') return 'MC';
    return 'PCC';
};

const flattenSemesters = (syllabusBreakdown) => {
    const subjects = [];
    (syllabusBreakdown || []).forEach(semData => {
        const sem = semData.semester;
        (semData.courses || []).forEach(course => {
            let l = 0, t = 0, p = 0, creditsVal = 0;
            if (typeof course.credits === 'string') {
                const parts = course.credits.split('-');
                if (parts.length === 4) {
                    l = Number(parts[0]) || 0;
                    t = Number(parts[1]) || 0;
                    p = Number(parts[2]) || 0;
                    creditsVal = Number(parts[3]) || 0;
                } else if (parts.length > 0) {
                    creditsVal = Number(parts[parts.length - 1]) || 0;
                }
            } else if (typeof course.credits === 'number') {
                creditsVal = course.credits;
            }
            const mappedCat = mapStaticCategoryToAbbrev(course.category);
            subjects.push({
                semester: sem,
                code: course.code,
                title: course.title,
                category: course.category,
                categoryType: mappedCat,
                l,
                t,
                p,
                contactPeriods: l + t + p,
                credits: creditsVal,
                cia: '-',
                ese: '-',
                total: '-',
                isOpenElective: mappedCat === 'OEC' || (course.category || '').toLowerCase().includes('open elective') || (course.code || '').startsWith('OE'),
                vertical: mappedCat === 'PEC' || (course.category || '').toLowerCase().includes('professional elective') || (course.code || '').startsWith('PE') ? 1 : undefined
            });
        });
    });
    return subjects;
};

const renderPieChart = (categories, rowTotals, grandTotal) => {
    const colors = {
        'HUM': '#6366f1', // Indigo
        'BSC': '#3b82f6',  // Blue
        'ESC': '#10b981',  // Emerald
        'PCC': '#f59e0b',  // Amber
        'PEC': '#ec4899',  // Pink
        'OEC': '#8b5cf6',  // Violet
        'EEC': '#06b6d4',  // Cyan
    };

    let cumulativeAngle = 0;
    const slices = [];

    categories.forEach(cat => {
        if (cat === 'MC') return;
        const value = rowTotals[cat] || 0;
        if (value === 0) return;

        const percentage = (value / grandTotal) * 100;
        const angle = (value / grandTotal) * 360;

        const x1 = 50 + 35 * Math.cos((cumulativeAngle - 90) * Math.PI / 180);
        const y1 = 50 + 35 * Math.sin((cumulativeAngle - 90) * Math.PI / 180);

        cumulativeAngle += angle;

        const x2 = 50 + 35 * Math.cos((cumulativeAngle - 90) * Math.PI / 180);
        const y2 = 50 + 35 * Math.sin((cumulativeAngle - 90) * Math.PI / 180);

        const largeArcFlag = angle > 180 ? 1 : 0;
        const d = `M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        slices.push({
            cat,
            d,
            color: colors[cat] || '#ccc',
            percentage: Math.round(percentage),
            value
        });
    });

    return (
        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Credit Distribution Pie Chart</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
                <svg width="220" height="220" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="36" fill="#1e1b4b" stroke="var(--glass-border)" strokeWidth="1" />
                    {slices.map((slice, i) => (
                        <path
                            key={i}
                            d={slice.d}
                            fill={slice.color}
                            stroke="#1e1b4b"
                            strokeWidth="0.8"
                            style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                            title={`${slice.cat}: ${slice.percentage}%`}
                        />
                    ))}
                    <circle cx="50" cy="50" r="15" fill="#1e1b4b" />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {slices.map((slice, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <span style={{ width: '12px', height: '12px', background: slice.color, borderRadius: '3px', display: 'inline-block' }}></span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minWidth: '40px', fontWeight: 'bold' }}>{slice.percentage}%</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{slice.cat} ({slice.value} Credits)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const renderCreditDistributionTable = (subjects) => {
    if (!subjects || subjects.length === 0) return null;

    const categories = ['HUM', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC'];
    const categoryLabels = {
        'HUM': 'Humanities and Social Sciences including Management Courses (HUM)',
        'BSC': 'Basic Science Courses (BSC)',
        'ESC': 'Engineering Science Courses (ESC)',
        'PCC': 'Professional Core Courses (PCC)',
        'PEC': 'Professional Elective Courses (PEC)',
        'OEC': 'Open Elective Courses (OEC)',
        'EEC': 'Employability Enhancement Courses (EEC)',
        'MC': 'Mandatory Courses (MC)'
    };

    const distribution = {};
    categories.forEach(cat => {
        distribution[cat] = Array(8).fill(0);
    });

    const seenLangCategories = new Set();
    subjects.forEach(subj => {
        const isLang1 = subj.category?.toUpperCase().includes('LANGUAGE ELECTIVE – I') || subj.category?.toUpperCase().includes('LANGUAGE ELECTIVE - I') || subj.category?.toUpperCase().includes('LANGUAGE ELECTIVE I');
        const isLang2 = subj.category?.toUpperCase().includes('LANGUAGE ELECTIVE – II') || subj.category?.toUpperCase().includes('LANGUAGE ELECTIVE - II') || subj.category?.toUpperCase().includes('LANGUAGE ELECTIVE II');

        if (isLang1 || isLang2) {
            const key = `${subj.semester || 1}_${isLang1 ? 'lang1' : 'lang2'}`;
            if (seenLangCategories.has(key)) {
                return;
            }
            seenLangCategories.add(key);
        }

        let cat = 'PCC';
        if (subj.isOpenElective) {
            cat = 'OEC';
        } else if (subj.vertical) {
            cat = 'PEC';
        } else {
            const rawCat = (subj.category || subj.categoryType || '').toUpperCase().trim();
            if (rawCat.includes('HUMANITIES') || rawCat === 'HS' || rawCat === 'HUM') cat = 'HUM';
            else if (rawCat.includes('BASIC SCIENCE') || rawCat === 'BS' || rawCat === 'BSC') cat = 'BSC';
            else if (rawCat.includes('ENGINEERING SCIENCE') || rawCat === 'ES' || rawCat === 'ESC') cat = 'ESC';
            else if (rawCat.includes('PROFESSIONAL CORE') || rawCat === 'PC' || rawCat === 'PCC') cat = 'PCC';
            else if (rawCat.includes('PROFESSIONAL ELECTIVE') || rawCat === 'PE' || rawCat === 'PEC') cat = 'PEC';
            else if (rawCat.includes('OPEN ELECTIVE') || rawCat === 'OE' || rawCat === 'OEC') cat = 'OEC';
            else if (rawCat.includes('PROJECT') || rawCat.includes('EMPLOYABILITY') || rawCat === 'EE' || rawCat === 'EEC') cat = 'EEC';
            else if (rawCat.includes('MANDATORY') || rawCat === 'MC') cat = 'MC';
            else cat = 'PCC';
        }

        let credits = 0;
        if (typeof subj.credits === 'number') {
            credits = subj.credits;
        } else if (typeof subj.credits === 'string') {
            const parts = subj.credits.split('-');
            if (parts.length > 0) {
                const last = Number(parts[parts.length - 1]);
                if (!isNaN(last)) credits = last;
            }
        }

        let sem = Number(subj.semester);
        if (!sem && subj.code) {
            const match = subj.code.match(/^[A-Za-z]{2}\d(\d)/);
            if (match) {
                sem = Number(match[1]);
            }
        }
        if (!sem || sem < 1 || sem > 8) {
            if (subj.isOpenElective) sem = 6;
            else if (subj.vertical) sem = 5;
            else sem = 1;
        }

        distribution[cat][sem - 1] += credits;
    });

    const rowTotals = {};
    let grandTotal = 0;
    categories.forEach(cat => {
        const total = distribution[cat].reduce((sum, val) => sum + val, 0);
        rowTotals[cat] = total;
        if (cat !== 'MC') {
            grandTotal += total;
        }
    });

    const semTotals = Array(8).fill(0);
    for (let semIdx = 0; semIdx < 8; semIdx++) {
        categories.forEach(cat => {
            if (cat !== 'MC') {
                semTotals[semIdx] += distribution[cat][semIdx];
            }
        });
    }

    return (
        <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--bg-section)' }}>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Summary of Credit Distribution
            </h4>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', border: '1px solid var(--glass-border)', background: 'var(--bg-section)' }}>
                    <thead style={{ background: 'transparent' }}>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '38%' }}>SUBJECT AREA</th>
                            <th colSpan="8" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center' }}>CREDITS PER SEMESTER</th>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>CREDITS TOTAL</th>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>%</th>
                        </tr>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map((num, i) => (
                                <th key={i} style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>{num}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, idx) => {
                            const isMC = cat === 'MC';
                            const total = rowTotals[cat];
                            const percentage = (grandTotal > 0 && !isMC) ? Math.round((total / grandTotal) * 100) : '-';
                            return (
                                <tr key={cat} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: '500' }}>{categoryLabels[cat]}</td>
                                    {distribution[cat].map((val, semIdx) => (
                                        <td key={semIdx} style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: val > 0 ? 'var(--text-main)' : 'var(--text-muted)' }}>
                                            {val > 0 ? val : '-'}
                                        </td>
                                    ))}
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>
                                        {isMC ? 'No Credits' : total}
                                    </td>
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)' }}>
                                        {isMC ? '-' : `${percentage}%`}
                                    </td>
                                </tr>
                            );
                        })}
                        <tr style={{ background: 'rgba(255,255,255,0.02)', fontWeight: 'bold' }}>
                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', color: 'var(--primary)' }}>Total</td>
                            {semTotals.map((total, semIdx) => (
                                <td key={semIdx} style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--primary)' }}>
                                    {total}
                                </td>
                            ))}
                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--primary)' }}>{grandTotal}</td>
                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--primary)' }}>100%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {grandTotal > 0 && renderPieChart(categories, rowTotals, grandTotal)}
        </div>
    );
};

const formatDeptHeaderTitle = (degreePrefix, deptName, regYear) => {
    let cleanPrefix = (degreePrefix || '').trim();
    if (cleanPrefix) {
        const upper = cleanPrefix.toUpperCase().replace(/\./g, '');
        if (upper === 'BTECH') cleanPrefix = 'B.Tech.';
        else if (upper === 'BE') cleanPrefix = 'B.E.';
        else if (upper === 'ME') cleanPrefix = 'M.E.';
        else if (upper === 'MBA') cleanPrefix = 'M.B.A.';
        else if (!cleanPrefix.endsWith('.')) cleanPrefix += '.';
    }

    const smallWords = new Set(['and', 'or', 'of', 'in', 'for', 'the', 'to', 'cum', 'on', 'at', 'a', 'an']);
    const formatTitleCase = (str) => {
        if (!str) return '';
        return str
            .replace(/&/g, ' and ')
            .toLowerCase()
            .split(/\s+/)
            .map((part, idx) => {
                if (!part || part.trim() === '') return '';
                const lower = part.toLowerCase();
                if (idx > 0 && smallWords.has(lower)) return lower;
                return lower.charAt(0).toUpperCase() + lower.slice(1);
            })
            .filter(Boolean)
            .join(' ');
    };

    const formattedDept = formatTitleCase(deptName || '');
    const reg = regYear || 'R-2023';
    return `${cleanPrefix ? `${cleanPrefix} ` : ''}${formattedDept} (${reg})`.trim();
};

const getCreditDistributionHTML = (subjects, pageTracker, bosMeetingDate, acMeetingDate, degreePrefix, deptName, regYear) => {
    const pageNum = ++pageTracker.current;
    const categories = ['HUM', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC'];
    const categoryLabels = {
        'HUM': 'Humanities and Social Sciences including Management Courses (HUM)',
        'BSC': 'Basic Science Courses (BSC)',
        'ESC': 'Engineering Science Courses (ESC)',
        'PCC': 'Professional Core Courses (PCC)',
        'PEC': 'Professional Elective Courses (PEC)',
        'OEC': 'Open Elective Courses (OEC)',
        'EEC': 'Employability Enhancement Courses (EEC)',
        'MC': 'Mandatory Courses (MC)'
    };

    const distribution = {};
    categories.forEach(cat => {
        distribution[cat] = Array(8).fill(0);
    });

    const validSubjectsForDistribution = [];
    const regularSubjectsBySem = {};

    subjects.forEach(subj => {
        if (subj.isOpenElective || subj.vertical) {
            validSubjectsForDistribution.push(subj);
            return;
        }
        const sem = Number(subj.semester) || 1;
        if (!regularSubjectsBySem[sem]) regularSubjectsBySem[sem] = [];
        regularSubjectsBySem[sem].push(subj);
    });

    Object.entries(regularSubjectsBySem).forEach(([semStr, semSubjs]) => {
        const lang1Options = semSubjs.filter(s => (s.category || '').toUpperCase().includes('LANGUAGE ELECTIVE – I') || (s.category || '').toUpperCase().includes('LANGUAGE ELECTIVE - I') || (s.category || '').toUpperCase().includes('LANGUAGE ELECTIVE I'));
        const lang2Options = semSubjs.filter(s => (s.category || '').toUpperCase().includes('LANGUAGE ELECTIVE – II') || (s.category || '').toUpperCase().includes('LANGUAGE ELECTIVE - II') || (s.category || '').toUpperCase().includes('LANGUAGE ELECTIVE II'));

        const hasLang1Placeholder = semSubjs.some(s => !lang1Options.includes(s) && ((s.title || '').toUpperCase().includes('LANGUAGE ELECTIVE') && ((s.title || '').toUpperCase().includes('I') || (s.code || '').toUpperCase().includes('EN10X') || (s.code || '').toUpperCase().includes('EN1X'))));
        const hasLang2Placeholder = semSubjs.some(s => !lang2Options.includes(s) && ((s.title || '').toUpperCase().includes('LANGUAGE ELECTIVE') && ((s.title || '').toUpperCase().includes('II') || (s.code || '').toUpperCase().includes('EN20X') || (s.code || '').toUpperCase().includes('EN2X'))));

        const excludedFromSem = new Set();
        if (hasLang1Placeholder) {
            lang1Options.forEach(s => excludedFromSem.add(s));
        } else if (lang1Options.length > 1) {
            lang1Options.slice(1).forEach(s => excludedFromSem.add(s));
        }

        if (hasLang2Placeholder) {
            lang2Options.forEach(s => excludedFromSem.add(s));
        } else if (lang2Options.length > 1) {
            lang2Options.slice(1).forEach(s => excludedFromSem.add(s));
        }

        semSubjs.forEach(s => {
            if (!excludedFromSem.has(s)) {
                validSubjectsForDistribution.push(s);
            }
        });
    });

    validSubjectsForDistribution.forEach(subj => {
        let cat = 'PCC';
        if (subj.isOpenElective) {
            cat = 'OEC';
        } else if (subj.vertical) {
            cat = 'PEC';
        } else {
            const type = (subj.categoryType || '').toUpperCase().trim();
            if (['HUM', 'HS', 'HSS'].includes(type)) cat = 'HUM';
            else if (['BSC', 'BS'].includes(type)) cat = 'BSC';
            else if (['ESC', 'ES'].includes(type)) cat = 'ESC';
            else if (['PCC', 'PC'].includes(type)) cat = 'PCC';
            else if (['PEC', 'PE'].includes(type)) cat = 'PEC';
            else if (['OEC', 'OE'].includes(type)) cat = 'OEC';
            else if (['EEC', 'EE'].includes(type)) cat = 'EEC';
            else if (['MC'].includes(type)) cat = 'MC';
            else {
                const text = `${subj.categoryType || ''} ${subj.category || ''} ${subj.categoryName || ''}`.toUpperCase();
                if (text.includes('HUMANITIES') || text.includes('MANAGEMENT') || text.includes('HUM') || text.includes('HS')) cat = 'HUM';
                else if (text.includes('BASIC SCIENCE') || text.includes('BSC') || text.includes('BS')) cat = 'BSC';
                else if (text.includes('ENGINEERING SCIENCE') || text.includes('ESC') || text.includes('ES')) cat = 'ESC';
                else if (text.includes('PROFESSIONAL CORE') || text.includes('PCC') || text.includes('PC')) cat = 'PCC';
                else if (text.includes('PROFESSIONAL ELECTIVE') || text.includes('PEC') || text.includes('PE')) cat = 'PEC';
                else if (text.includes('OPEN ELECTIVE') || text.includes('OEC') || text.includes('OE')) cat = 'OEC';
                else if (text.includes('EMPLOYABILITY') || text.includes('PROJECT') || text.includes('EEC') || text.includes('EE')) cat = 'EEC';
                else if (text.includes('MANDATORY') || text.includes('MC')) cat = 'MC';
                else cat = 'PCC';
            }
        }

        let credits = 0;
        if (typeof subj.credits === 'number') {
            credits = subj.credits;
        } else if (typeof subj.credits === 'string') {
            const parts = subj.credits.split('-');
            if (parts.length > 0) {
                const last = Number(parts[parts.length - 1]);
                if (!isNaN(last)) credits = last;
            }
        }

        let sem = Number(subj.semester);
        if (!sem && subj.code) {
            const match = subj.code.match(/^[A-Za-z]{2}\d(\d)/);
            if (match) {
                sem = Number(match[1]);
            }
        }
        if (!sem || sem < 1 || sem > 8) {
            if (subj.isOpenElective) sem = 6;
            else if (subj.vertical) sem = 5;
            else sem = 1;
        }

        distribution[cat][sem - 1] += credits;
    });

    const rowTotals = {};
    let grandTotal = 0;
    categories.forEach(cat => {
        const total = distribution[cat].reduce((sum, val) => sum + val, 0);
        rowTotals[cat] = total;
        if (cat !== 'MC') {
            grandTotal += total;
        }
    });

    const semTotals = Array(8).fill(0);
    for (let semIdx = 0; semIdx < 8; semIdx++) {
        categories.forEach(cat => {
            if (cat !== 'MC') {
                semTotals[semIdx] += distribution[cat][semIdx];
            }
        });
    }

    const colors = {
        'HUM': '#ef4444',
        'BSC': '#3b82f6',
        'ESC': '#10b981',
        'PCC': '#f59e0b',
        'PEC': '#8b5cf6',
        'OEC': '#ec4899',
        'EEC': '#06b6d4'
    };

    let startAngle = 0;
    const slices = [];
    categories.filter(c => c !== 'MC').forEach(cat => {
        const value = rowTotals[cat];
        if (value === 0) return;

        const percentage = (value / grandTotal) * 100;
        const angle = (value / grandTotal) * 360;
        const endAngle = startAngle + angle;

        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;

        const x1 = 50 + 35 * Math.cos(startRad);
        const y1 = 50 + 35 * Math.sin(startRad);
        const x2 = 50 + 35 * Math.cos(endRad);
        const y2 = 50 + 35 * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;
        const d = `M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`;

        startAngle = endAngle;

        slices.push({
            cat,
            d,
            color: colors[cat] || '#ccc',
            percentage: Math.round(percentage),
            value
        });
    });

    const svgPieChartHTML = grandTotal > 0 ? `
        <div style="margin-top: 25px; display: flex; justify-content: center; align-items: center; gap: 40px; font-family: Arial, sans-serif;">
            <svg width="150" height="150" viewBox="0 0 100 100" style="display: block;">
                <circle cx="50" cy="50" r="36" fill="#fff" stroke="#000" stroke-width="0.5" />
                ${slices.map(slice => `<path d="${slice.d}" fill="${slice.color}" stroke="#fff" stroke-width="0.5" />`).join('')}
                <circle cx="50" cy="50" r="15" fill="#fff" />
            </svg>
            <div style="display: flex; flex-direction: column; gap: 5px;">
                ${slices.map(slice => `
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 8.5pt;">
                        <span style="width: 10px; height: 10px; background: ${slice.color}; border: 1px solid #000; border-radius: 1px; display: inline-block;"></span>
                        <span style="font-weight: bold; width: 30px;">${slice.percentage}%</span>
                        <span>${slice.cat} (${slice.value} Credits)</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    return `
        <div class="page">
            <div class="pdf-header pdf-header-inner">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">${formatDeptHeaderTitle(degreePrefix, deptName, regYear || 'R-2023')}</div>
            </div>
            
            <div class="title-block" style="margin-top: 15px; margin-bottom: 20px;">
                <h1 style="font-size: 12pt; text-align: center; text-decoration: underline;">SUMMARY OF CREDIT DISTRIBUTION</h1>
            </div>

            <table class="curriculum-table">
                <thead>
                    <tr>
                        <th rowSpan="2" style="width: 50%; font-size: 8pt; font-family: Arial, sans-serif; text-align: left; vertical-align: middle;">Subject Area</th>
                        <th colSpan="8" style="font-size: 8pt; font-family: Arial, sans-serif; text-align: center; padding: 3px;">Credits per Semester</th>
                        <th rowSpan="2" style="width: 14%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credits Total</th>
                        <th rowSpan="2" style="width: 8%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">%</th>
                    </tr>
                    <tr>
                        ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map(num => `<th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 3px; text-align: center;">${num}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${categories.map((cat, idx) => {
        const isMC = cat === 'MC';
        const total = rowTotals[cat];
        const percentage = (grandTotal > 0 && !isMC) ? Math.round((total / grandTotal) * 100) : '-';
        return `
                            <tr>
                                <td style="font-weight: bold; font-family: Arial, sans-serif;">${categoryLabels[cat]}</td>
                                ${distribution[cat].map(val => `<td class="center">${val > 0 ? val : '-'}</td>`).join('')}
                                <td class="center" style="font-weight: bold; font-family: Arial, sans-serif;">${isMC ? 'No Credits' : total}</td>
                                <td class="center" style="font-family: Arial, sans-serif;">${isMC ? '-' : `${percentage}%`}</td>
                            </tr>
                        `;
    }).join('')}
                    <tr style="font-weight: bold; background-color: rgba(0, 0, 0, 0.02);">
                        <td style="font-family: Arial, sans-serif;">Total</td>
                        ${semTotals.map(total => `<td class="center">${total}</td>`).join('')}
                        <td class="center" style="font-family: Arial, sans-serif;">${grandTotal}</td>
                        <td class="center" style="font-family: Arial, sans-serif;">100%</td>
                    </tr>
                </tbody>
            </table>

            ${svgPieChartHTML}
            <div class="pdf-footer pdf-footer-inner">
                <div class="footer-left">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center">${pageNum}</div>
                <div class="footer-right">Approved in Academic Council Meeting on ${acMeetingDate}</div>
            </div>
        </div>
    `;
};

const getDefaultCategoryName = (catType) => {
    const map = {
        'HUM': 'Humanities, Social Sciences and Management Course (HUM)',
        'BSC': 'Basic Science Course (BSC)',
        'ESC': 'Engineering Science Course (ESC)',
        'PCC': 'Professional Core Course (PCC)',
        'PEC': 'Professional Elective Course (PEC)',
        'OEC': 'Open Elective Course (OEC)',
        'EEC': 'Employability Enhancement Course (EEC)',
        'MC': 'Mandatory Course (MC)'
    };
    return map[catType] || catType || 'Professional Core Course (PCC)';
};

const getDefaultObjectives = (code, title) => {
    const codeUpper = (code || '').toUpperCase();
    const titleLower = (title || '').toLowerCase();
    if (codeUpper.startsWith('HS') || titleLower.includes('english')) {
        return [
            "Improve the communicative competence of learners",
            "Learn to use basic grammatical structures in suitable context",
            "Acquire lexical competence and use them appropriately in a sentence and understand their meaning in a text",
            "Use language effectively in professional context",
            "Enhance the ability to read and write complex text, summaries, articles, blogs, definitions, essays and user manuals."
        ];
    }
    return [
        `Understand the fundamental concepts of ${title || 'the course'}.`,
        "Analyze intermediate problems and theoretical models.",
        "Apply knowledge to design and implement practical solutions.",
        "Evaluate different alternatives and optimize performance.",
        "Synthesize concepts for research, development and lifelong learning."
    ];
};

const getDefaultOutcomes = (code, title) => {
    const codeUpper = (code || '').toUpperCase();
    const titleLower = (title || '').toLowerCase();
    if (codeUpper.startsWith('HS') || titleLower.includes('english')) {
        return [
            { coNo: "CO1", outcome: "To use appropriate words in a professional context.", rbtLevel: "Apply" },
            { coNo: "CO2", outcome: "To use of basic grammatical structures in right context", rbtLevel: "Apply" },
            { coNo: "CO3", outcome: "To read and infer the denotative and connotative meanings of technical texts", rbtLevel: "Apply" },
            { coNo: "CO4", outcome: "To write definitions, descriptions, narrations and essays on various topics", rbtLevel: "Apply" },
            { coNo: "CO5", outcome: "To express their opinions effectively in both oral and written medium of communication", rbtLevel: "Apply" }
        ];
    }
    return [
        { coNo: "CO1", outcome: `Remember and define key terms and concepts of ${title || 'the subject'}.`, rbtLevel: "Remember" },
        { coNo: "CO2", outcome: "Understand and explain theoretical principles and architectural patterns.", rbtLevel: "Understand" },
        { coNo: "CO3", outcome: "Apply knowledge to solve problems and build modules.", rbtLevel: "Apply" },
        { coNo: "CO4", outcome: "Analyze and evaluate the performance of different implementations.", rbtLevel: "Analyze" },
        { coNo: "CO5", outcome: "Create and deploy complex systems addressing real-world constraints.", rbtLevel: "Create" }
    ];
};

const renderAssessmentComponentsHTML = (subj) => {
    const titleUpper = (subj.title || '').toUpperCase();
    const catUpper = (subj.category || subj.categoryType || '').toUpperCase();
    const lVal = Number(subj.l) || 0;
    const tVal = Number(subj.t) || 0;
    const pVal = Number(subj.p) || 0;
    const cVal = Number(subj.credits) || 0;

    // 1. MANDATORY COURSE (MC)
    if (catUpper.includes('MC') || catUpper.includes('MANDATORY') || titleUpper.includes('MANDATORY')) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">MANDATORY COURSE</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7.5pt; text-align: center;">
                <thead>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th colspan="2" style="border: 1.5px solid #000; padding: 2.5px 3px; width: 50%;">Continuous Internal Assessment (100)</th>
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2.5px 3px; width: 30%; vertical-align: middle;">End Semester Examination Theory</th>
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2.5px 3px; width: 20%; vertical-align: middle;">Total</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 25%;">CIAT - I</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 25%;">CIAT - II</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px;">50</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px;">50</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px;">-</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">100</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }

    // 2. MINI PROJECT
    if (titleUpper.includes('MINI PROJECT') || catUpper.includes('MINI PROJECT')) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">Mini Project*</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7.5pt; text-align: center;">
                <thead>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th colspan="4" style="border: 1.5px solid #000; padding: 2.5px 3px;">Continuous assessment (100 Marks)</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 25%; vertical-align: middle;">Review I</th>
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 25%; vertical-align: middle;">Review II</th>
                        <th colspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 50%;">Review III</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 25%;">Report</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 25%;">Viva-Voce Examination</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">25</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">25</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">30</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">20</td>
                    </tr>
                </tbody>
            </table>
            <div style="font-size: 7pt; font-style: italic; margin-top: 2px; margin-bottom: 2px; text-align: left;">*Internal mode only</div>
        </div>
        `;
    }

    // 3. PROJECT WORK / INTERNSHIP CUM PROJECT WORK
    if (titleUpper.includes('PROJECT WORK') || titleUpper.includes('INTERNSHIP CUM PROJECT') || titleUpper.includes('FINAL YEAR PROJECT') || (titleUpper.includes('PROJECT') && !titleUpper.includes('MINI'))) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">Project Work / Internship cum project work</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7.5pt; text-align: center;">
                <thead>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th colspan="3" style="border: 1.5px solid #000; padding: 2.5px 3px; width: 45%;">Continuous Assessment (60 Marks)</th>
                        <th colspan="4" style="border: 1.5px solid #000; padding: 2.5px 3px; width: 55%;">End Semester Examination (40 Marks)</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 15%; vertical-align: middle;">Review I</th>
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 15%; vertical-align: middle;">Review II</th>
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 15%; vertical-align: middle;">Review III</th>
                        <th colspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 27%;">Project Thesis Report Evaluation</th>
                        <th colspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 28%;">Viva-Voce Examination</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 13.5%;">Guide</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 13.5%;">External</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">External</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Internal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">20</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">20</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">20</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">10</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">10</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">10</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">10</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }

    // 4. INTERNSHIP
    if (titleUpper.includes('INTERNSHIP') || catUpper.includes('INTERNSHIP')) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">Internship</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7.5pt; text-align: center;">
                <thead>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th colspan="4" style="border: 1.5px solid #000; padding: 2.5px 3px;">Final assessment (100 Marks)</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 25%; vertical-align: middle;">Project Report</th>
                        <th rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 25%; vertical-align: middle;">Presentation</th>
                        <th colspan="2" style="border: 1.5px solid #000; padding: 2px 3px; width: 50%;">Viva-Voce Examination</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 25%;">Course Coordinator</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 25%;">Industry representative</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">40</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">30</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">20</td>
                        <td style="border: 1.5px solid #000; padding: 2.5px 3px; font-weight: bold;">10</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }

    // 5. THEORY WITH PRACTICAL COURSES (L > 0 and P > 0)
    if ((lVal > 0 && pVal > 0) || catUpper.includes('THEORY CUM PRACTICAL') || catUpper.includes('THEORY WITH PRACTICAL')) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 2px; font-family: Arial, sans-serif; text-transform: uppercase;">THEORY WITH PRACTICAL COURSES</div>
            <div style="text-align: center; font-size: 7.5pt; font-weight: bold; margin-bottom: 4px; font-family: Arial, sans-serif;">L T P C : ${lVal} ${tVal} ${pVal} ${cVal}</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7pt; text-align: center;">
                <thead>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 22%;">Assessment Components</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 12%;">Duration</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Syllabus to be covered</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 10%;">Max. Marks</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Weightage for Internal Marks</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Continuous Internal Assessment Marks</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">End Semester Examination Marks</th>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th colspan="7" style="border: 1.5px solid #000; padding: 2px 3px; text-align: center;">Theory Component</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: center; font-weight: bold;">CIAT I</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">3 hours</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">2.5 units</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">13.5</td>
                        <td rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">27</td>
                        <td rowspan="5" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">50</td>
                    </tr>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: center; font-weight: bold;">CIAT II</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">3 hours</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">2.5 units</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">13.5</td>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9; font-family: Arial, sans-serif;">
                        <th colspan="6" style="border: 1.5px solid #000; padding: 2px 3px; text-align: center;">Practical Component</th>
                        <th style="border: 1.5px solid #000; display: none;"></th>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left;">Observation & Analysis of Experimental results, Viva Voce, Quiz based on rubrics.</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">9</td>
                        <td rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">18</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left;">Activities/ Test</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">9</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 6.5pt; line-height: 1.2;">
                            Attendance (80-84%–1, 85-88%–2, 89-92%–3, 93-96%–4, 97-100%–5 Marks)
                        </td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">5</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">5</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px; font-weight: bold;">5</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">-</td>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9;">
                        <td colspan="5" style="border: 1.5px solid #000; padding: 2px 3px; text-align: right;">Total</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">50</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">50</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }

    // 6. PRACTICAL COURSES (Pure Practical, L == 0, P > 0)
    if ((lVal === 0 && pVal > 0) || catUpper.includes('PRACTICAL') || catUpper.includes('LAB')) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 2px; font-family: Arial, sans-serif; text-transform: uppercase;">PRACTICAL COURSES</div>
            <div style="text-align: center; font-size: 7.5pt; font-weight: bold; margin-bottom: 4px; font-family: Arial, sans-serif;">L T P C : ${lVal} ${tVal} ${pVal} ${cVal}</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7pt; text-align: center;">
                <thead>
                    <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 40%;">Assessment Components</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 12%;">Max. Marks</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 16%;">Weightage for Internal Marks</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 16%;">Continuous Internal Assessment Marks</th>
                        <th style="border: 1.5px solid #000; padding: 2px 3px; width: 16%;">End Semester Examination Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: left;">Observation, Analysis of Experimental results & Record, Viva-voce based on rubrics.</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">75</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">40</td>
                        <td rowspan="3" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">40</td>
                    </tr>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: left;">Activities / Test</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">25</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">15</td>
                    </tr>
                    <tr>
                        <td colspan="1" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 6.5pt; line-height: 1.2;">
                            Attendance (80-84%–1, 85-88%–2, 89-92%–3, 93-96%–4, 97-100%–5 Marks)
                        </td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">5</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">-</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px; font-weight: bold;">5</td>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9;">
                        <td colspan="3" style="border: 1.5px solid #000; padding: 2px 3px; text-align: right;">Total</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">60</td>
                        <td style="border: 1.5px solid #000; padding: 2px 3px;">40</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }

    // 7. THEORY COURSES (Default)
    return `
    <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
        <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 8.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">THEORY COURSES</div>
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 7.5pt; text-align: center;">
            <thead>
                <tr style="font-weight: bold; background-color: #f2f2f2; font-family: Arial, sans-serif;">
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 22%;">Assessment Components</th>
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 12%;">Duration</th>
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Syllabus to be covered</th>
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 10%;">Max. Marks</th>
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Weightage for Internal Marks</th>
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">Continuous Internal Assessment Marks</th>
                    <th style="border: 1.5px solid #000; padding: 2px 3px; width: 14%;">End Semester Examination Marks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: center; font-weight: bold;">CIAT I</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">3 hours</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">2.5 units</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">12.25</td>
                    <td rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">25</td>
                    <td rowspan="4" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">60</td>
                </tr>
                <tr>
                    <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: center; font-weight: bold;">CIAT II</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">3 hours</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">2.5 units</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">12.25</td>
                </tr>
                <tr>
                    <td colspan="4" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 7pt; line-height: 1.2;">
                        Objective Test/Online Quiz, Assignment / Case study/ Seminar/Tutorial, Role Play, Poster Presentation, Group Discussions, Oral Presentation, Mini Project etc., (5 marks during CIAT I and 5 marks during CIAT II)
                    </td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">10</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px; font-weight: bold;">10</td>
                </tr>
                <tr>
                    <td colspan="4" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 7pt; line-height: 1.2;">
                        Attendance (80-84% – 1 Mark, 85-88% – 2 Marks, 89-92%- 3 Marks, 93-96% – 4 Marks, 97-100% – 5 Marks)
                    </td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">5</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px; font-weight: bold;">5</td>
                </tr>
                <tr style="font-weight: bold; background-color: #f9f9f9;">
                    <td colspan="5" style="border: 1.5px solid #000; padding: 2px 3px; text-align: right;">Total</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">40</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">60</td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
};

const formatCategoryWithCode = (rawCatName, catType, category) => {
    let raw = (rawCatName || '').trim();
    // Strip out (Non-Credit) or Non-Credit if present
    raw = raw.replace(/\(\s*Non-Credit\s*\)/gi, '').replace(/\bNon-Credit\b/gi, '').replace(/\s{2,}/g, ' ').trim();
    const type = (catType || category || '').trim().toUpperCase();

    const map = {
        'HUM': 'Humanities, Social Sciences and Management Course (HUM)',
        'HSMC': 'Humanities, Social Sciences and Management Course (HUM)',
        'HSC': 'Humanities, Social Sciences and Management Course (HUM)',
        'BSC': 'Basic Science Course (BSC)',
        'BS': 'Basic Science Course (BSC)',
        'ESC': 'Engineering Science Course (ESC)',
        'ES': 'Engineering Science Course (ESC)',
        'PCC': 'Professional Core Course (PCC)',
        'PC': 'Professional Core Course (PCC)',
        'PEC': 'Professional Elective Course (PEC)',
        'PE': 'Professional Elective Course (PEC)',
        'OEC': 'Open Elective Course (OEC)',
        'OE': 'Open Elective Course (OEC)',
        'EEC': 'Employability Enhancement Course (EEC)',
        'EE': 'Employability Enhancement Course (EEC)',
        'MC': 'Mandatory Course (MC)',
        'AC': 'Audit Course (AC)'
    };

    if (raw) {
        if (/\([A-Za-z0-9\s-]+\)$/.test(raw)) {
            return raw;
        }
        const upper = raw.toUpperCase();
        if (upper.includes('HUMANITIES') || upper.includes('SOCIAL SCIENCES') || upper.includes('MANAGEMENT')) return 'Humanities, Social Sciences and Management Course (HUM)';
        if (upper.includes('BASIC SCIENCE')) return 'Basic Science Course (BSC)';
        if (upper.includes('ENGINEERING SCIENCE')) return 'Engineering Science Course (ESC)';
        if (upper.includes('PROFESSIONAL CORE')) return 'Professional Core Course (PCC)';
        if (upper.includes('PROFESSIONAL ELECTIVE')) return 'Professional Elective Course (PEC)';
        if (upper.includes('OPEN ELECTIVE')) return 'Open Elective Course (OEC)';
        if (upper.includes('EMPLOYABILITY')) return 'Employability Enhancement Course (EEC)';
        if (upper.includes('MANDATORY')) return 'Mandatory Course (MC)';
        if (upper.includes('AUDIT')) return 'Audit Course (AC)';
        if (map[upper]) return map[upper];
        if (type && map[type]) return map[type];
        if (type) return `${raw} (${type})`;
        return raw;
    }

    if (type && map[type]) {
        return map[type];
    }

    return 'Professional Core Course (PCC)';
};

const getDetailedSyllabiHTML = (subjects, regYear, pageTracker, bosMeetingDate, acMeetingDate, poList, psoList, degreePrefix, deptName) => {
    if (!subjects || subjects.length === 0) return '';

    return subjects.map((subj, sIdx) => {
        const categoryName = formatCategoryWithCode(subj.categoryName, subj.categoryType, subj.category);
        const prerequisites = subj.prerequisites || 'Basic knowledge of the subject.';
        const subtitleStr = subj.subtitle ? `<div style="font-size: 9.5pt; font-weight: normal; margin-top: 3px;">(${subj.subtitle})</div>` : '';

        const objectives = (subj.objectives && subj.objectives.length > 0)
            ? subj.objectives
            : getDefaultObjectives(subj.code, subj.title);

        const outcomes = (subj.outcomes && subj.outcomes.length > 0)
            ? subj.outcomes
            : getDefaultOutcomes(subj.code, subj.title);

        const units = (subj.units && subj.units.length > 0)
            ? subj.units
            : getDetailedSyllabusForSubject(subj.code, subj.title).map(u => ({
                unitNo: u.unit || u.unitNo || '',
                title: u.title || '',
                topics: Array.isArray(u.topics) ? u.topics : [u.topics || '']
            }));

        const textbooks = (subj.textbooks && Array.isArray(subj.textbooks))
            ? subj.textbooks.map(t => typeof t === 'string' ? t : (t.title ? `${t.author ? t.author + ', ' : ''}"${t.title}"${t.publisher ? ', ' + t.publisher : ''}${t.year ? ' (' + t.year + ')' : ''}` : '')).filter(t => t && t.trim() !== '')
            : [];

        const references = (subj.references && Array.isArray(subj.references))
            ? subj.references.map(r => typeof r === 'string' ? r : (r.title ? `${r.author ? r.author + ', ' : ''}"${r.title}"${r.publisher ? ', ' + r.publisher : ''}${r.year ? ' (' + r.year + ')' : ''}` : '')).filter(r => r && r.trim() !== '')
            : [];

        const webReferences = (subj.webReferences && Array.isArray(subj.webReferences))
            ? subj.webReferences.filter(wr => wr && typeof wr === 'string' && wr.trim() !== '')
            : [];

        const experiments = subj.experiments || [];

        const poCount = (poList && poList.length > 0) ? poList.length : 11;
        const psoCount = (psoList && psoList.length > 0) ? psoList.length : 3;
        const coPoMapping = sanitizeCoPoMapping(subj.coPoMapping, subj.outcomes, poCount, psoCount);

        const lValue = subj.l !== undefined ? subj.l : 0;
        const tValue = subj.t !== undefined ? subj.t : 0;
        const pValue = subj.p !== undefined ? subj.p : 0;
        const cValue = subj.credits !== undefined ? subj.credits : 0;

        const lVal = Number(lValue) || 0;
        const tVal = Number(tValue) || 0;
        const pVal = Number(pValue) || 0;
        const contactHrs = lVal + tVal + pVal;
        const defaultUnitPeriods = contactHrs > 0 ? contactHrs * 3 : 9;

        let calculatedTotalPeriods = 0;
        let hasCustomUnitPeriods = false;
        units.forEach(u => {
            if (u.periods !== undefined && u.periods !== null && String(u.periods).trim() !== '') {
                hasCustomUnitPeriods = true;
                calculatedTotalPeriods += (Number(u.periods) || 0);
            } else {
                calculatedTotalPeriods += defaultUnitPeriods;
            }
        });
        const totalPeriods = (hasCustomUnitPeriods && calculatedTotalPeriods > 0) ? calculatedTotalPeriods : (defaultUnitPeriods * (units.length || 5));

        // Subject Type Checks
        const isInduction = (subj.title || '').toUpperCase().includes('INDUCTION') || (subj.code || '').toUpperCase().includes('INDUCTION');
        const categoryUpper = (subj.category || '').toUpperCase();
        const isPractical = categoryUpper.includes('PRACTICAL') || categoryUpper.includes('LAB');
        const isTheory = categoryUpper.includes('THEORY');
        const isTheoryCumPractical = isPractical && isTheory;

        // Helper to render experiments table
        const renderExperimentsTableHTML = (expList, title = "List of Exercises") => {
            if (!expList || expList.length === 0) return '';
            return `
                <div style="margin-top: 4px; margin-bottom: 4px; page-break-inside: avoid;">
                    <h4 style="font-size: 9pt; font-weight: bold; font-family: Arial, sans-serif; border-bottom: 1px solid #ddd; padding-bottom: 2px; margin: 0 0 3px 0; text-transform: uppercase;">${title}</h4>
                    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8pt; text-align: center;">
                        <thead>
                            <tr style="font-weight: bold; font-family: Arial, sans-serif; background-color: #f2f2f2;">
                                <th style="border: 1.5px solid #000; padding: 2.5px; width: 8%;">S.No.</th>
                                <th style="border: 1.5px solid #000; padding: 2.5px; width: 67%; text-align: left; padding-left: 6px;">List of Exercises</th>
                                <th style="border: 1.5px solid #000; padding: 2.5px; width: 10%;">CO</th>
                                <th style="border: 1.5px solid #000; padding: 2.5px; width: 15%;">RBT Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${expList.map(exp => `
                                <tr>
                                    <td style="border: 1.5px solid #000; padding: 2px; text-align: center;">${exp.sNo || ''}</td>
                                    <td style="border: 1.5px solid #000; padding: 2px 6px; text-align: left;">${exp.name || ''}</td>
                                    <td style="border: 1.5px solid #000; padding: 2px; text-align: center;">${exp.co || ''}</td>
                                    <td style="border: 1.5px solid #000; padding: 2px; text-align: center;">${exp.rbtLevel || 'Apply'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        };

        const pageNum1 = ++pageTracker.current;
        const pageNum2 = ++pageTracker.current;

        return `
        <!-- Syllabus Subject Page 1: ${(subj.code || '').toUpperCase()} -->
        <div class="page syllabus-page">
            <div class="pdf-header pdf-header-inner">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">${formatDeptHeaderTitle(degreePrefix, deptName, regYear)}</div>
            </div>

            <div class="syllabus-page-content" style="flex: 1 1 auto;">
                <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 6px; font-size: 9pt; border: 1.5px solid #000; page-break-inside: avoid;">
                    <tr>
                        <td rowspan="2" style="width: 18%; border: 1.5px solid #000; padding: 4px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 9.5pt;">
                            ${(subj.code || '').toUpperCase()}
                        </td>
                        <td rowspan="2" style="width: 58%; border: 1.5px solid #000; padding: 4px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 9.5pt; text-transform: uppercase;">
                            ${subj.title || ''}
                            ${subtitleStr}
                        </td>
                        ${isInduction ? `
                        <td rowspan="2" colspan="4" style="width: 24%; border: 1.5px solid #000; padding: 4px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 9.5pt; font-family: Arial, sans-serif;">
                            2 WEEKS
                        </td>
                        ` : `
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">L</td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">T</td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">P</td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">C</td>
                        `}
                    </tr>
                    ${!isInduction ? `
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${lValue}</td>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${tValue}</td>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${pValue}</td>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${cValue}</td>
                    </tr>
                    ` : ''}
                    ${subj.isOpenElective ? '' : `
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 3px 5px; font-weight: bold; font-size: 9pt;">Category</td>
                        <td colspan="5" style="border: 1.5px solid #000; padding: 3px 5px; font-size: 9pt;">${categoryName}</td>
                    </tr>
                    `}
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 3px 5px; font-weight: bold; font-size: 9pt;">Pre requisites</td>
                        <td colspan="5" style="border: 1.5px solid #000; padding: 3px 5px; text-align: justify; font-size: 9pt;">${prerequisites}</td>
                    </tr>
                </table>

                ${objectives.length > 0 ? `
                <div class="section-container" style="margin-bottom: 6px; page-break-inside: avoid;">
                    <h3 style="font-size: 9.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif; text-transform: uppercase;">Course Objectives</h3>
                    <p style="font-size: 9pt; margin: 0 0 2px 0;">The course is intended to make the students to</p>
                    <ol style="margin: 0; padding-left: 18px;">
                        ${objectives.map(obj => (obj && obj.trim()) ? `<li style="margin-bottom: 2px; font-size: 9pt; line-height: 1.35; text-align: justify;">${obj}</li>` : '').join('')}
                    </ol>
                </div>
                ` : ''}

                <!-- Units or Exercises -->
                <div style="margin-top: 4px; margin-bottom: 4px;">
                    ${isPractical && !isTheory ? `
                        ${renderExperimentsTableHTML(experiments, "List of Exercises")}
                    ` : units.map((unit, uIdx) => {
            const unitNo = unit.unitNo || `UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][uIdx] || (uIdx + 1)}`;
            const unitTitle = unit.title ? unit.title.toUpperCase() : '';
            const thisUnitPeriods = (unit.periods !== undefined && unit.periods !== null && String(unit.periods).trim() !== '') ? unit.periods : defaultUnitPeriods;
            const topicsStr = Array.isArray(unit.topics) ? unit.topics.filter(t => t && t.trim() !== '').join(', ') : (unit.topics || '');

            return topicsStr ? `
                                <div style="margin-bottom: 5px; text-align: justify; font-size: 9pt; line-height: 1.35; page-break-inside: avoid;">
                                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-family: Arial, sans-serif; font-size: 9.5pt; margin-bottom: 2px;">
                                        <span>${unitNo.toUpperCase()}: ${unitTitle}</span>
                                        <span>${thisUnitPeriods} Periods</span>
                                    </div>
                                    <div style="font-size: 9pt; line-height: 1.35; text-align: justify;">
                                        ${topicsStr}
                                    </div>
                                </div>
                            ` : '';
        }).join('')}
                    
                    ${isTheoryCumPractical && experiments.length > 0 ? `
                        ${renderExperimentsTableHTML(experiments, "List of Exercises / Experiments")}
                    ` : ''}

                    <div style="text-align: right; font-weight: bold; font-family: Arial, sans-serif; font-size: 9pt; margin-top: 4px; margin-bottom: 4px; border-top: 1px solid #ddd; padding-top: 2px;">
                        ${isInduction ? 'TOTAL: 2 WEEKS' : `TOTAL: ${totalPeriods} PERIODS`}
                    </div>
                </div>

                ${outcomes.some(co => (co && co.outcome && co.outcome.trim()) || (typeof co === 'string' && co.trim())) ? `
                <table style="width: 100%; border-collapse: collapse; margin-top: 4px; margin-bottom: 4px; font-size: 8pt; border: 1.5px solid #000; page-break-inside: avoid;">
                    <thead>
                        <tr>
                            <th colspan="3" style="border: 1.5px solid #000; padding: 2.5px; text-align: center; font-weight: bold; font-family: Arial, sans-serif; text-transform: uppercase; font-size: 8.5pt;">Course Outcomes</th>
                        </tr>
                        <tr>
                            <th colspan="3" style="border: 1.5px solid #000; padding: 2px 4px; text-align: left; font-weight: normal; font-size: 8pt;">On successful completion of the course, students will be able to</th>
                        </tr>
                        <tr style="font-family: Arial, sans-serif; font-size: 7.5pt; font-weight: bold; text-align: center;">
                            <th style="width: 12%; border: 1.5px solid #000; padding: 2px;">CO. No</th>
                            <th style="width: 73%; border: 1.5px solid #000; padding: 2px; text-align: left; padding-left: 5px;">Course Outcome</th>
                            <th style="width: 15%; border: 1.5px solid #000; padding: 2px;">RBT Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${outcomes.map(co => {
            const coNo = co.coNo || (co.outcome ? co.outcome.slice(0, 3) : '');
            const outcomeText = co.outcome || (typeof co === 'string' ? co : '');
            const rbtLevel = co.rbtLevel || 'Apply';
            if (!outcomeText || !outcomeText.trim()) return '';
            return `
                            <tr>
                                <td style="border: 1.5px solid #000; padding: 1.5px 3px; text-align: center; font-weight: bold;">${coNo}</td>
                                <td style="border: 1.5px solid #000; padding: 1.5px 5px; text-align: justify; line-height: 1.2;">${outcomeText}</td>
                                <td style="border: 1.5px solid #000; padding: 1.5px 3px; text-align: center;">${rbtLevel}</td>
                            </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
                ` : ''}
            </div>

            <div class="pdf-footer pdf-footer-inner">
                <div class="footer-left">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center">${pageNum1}</div>
                <div class="footer-right">Approved in Academic Council Meeting on ${acMeetingDate}</div>
            </div>
        </div>

        <!-- Syllabus Subject Page 2: ${(subj.code || '').toUpperCase()} -->
        <div class="page syllabus-page">
            <div class="pdf-header pdf-header-inner">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">${formatDeptHeaderTitle(degreePrefix, deptName, regYear)}</div>
            </div>

            <div class="syllabus-page-content" style="flex: 1 1 auto;">
                ${(textbooks.length > 0 || references.length > 0 || webReferences.length > 0) ? `
                <div class="section-container" style="margin-top: 4px; margin-bottom: 6px; page-break-inside: avoid;">
                    ${textbooks.length > 0 ? `
                    <h4 style="font-size: 8.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif; text-transform: uppercase;">Text Book${textbooks.length > 1 ? 's' : ''}</h4>
                    <ol style="margin: 0 0 4px 0; padding-left: 18px;">
                        ${textbooks.map(tb => tb.trim() ? `<li style="margin-bottom: 2px; font-size: 8pt; line-height: 1.3; text-align: justify;">${tb}</li>` : '').join('')}
                    </ol>
                    ` : ''}

                    ${references.length > 0 ? `
                    <h4 style="font-size: 8.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif; text-transform: uppercase;">References Books</h4>
                    <ol style="margin: 0 0 4px 0; padding-left: 18px;">
                        ${references.map(ref => ref.trim() ? `<li style="margin-bottom: 2px; font-size: 8pt; line-height: 1.3; text-align: justify;">${ref}</li>` : '').join('')}
                    </ol>
                    ` : ''}

                    ${webReferences.length > 0 ? `
                    <h4 style="font-size: 8.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif; text-transform: uppercase;">Additional / Web References</h4>
                    <ol style="margin: 0; padding-left: 18px;">
                        ${webReferences.map(wr => wr.trim() ? `<li style="margin-bottom: 2px; font-size: 8pt; line-height: 1.3; text-align: justify;"><a href="${wr}" style="color: #000; text-decoration: underline;">${wr}</a></li>` : '').join('')}
                    </ol>
                    ` : ''}
                </div>
                ` : ''}

                <div style="font-size: 8pt; font-weight: bold; margin-top: 4px; margin-bottom: 2px; font-family: Arial, sans-serif; text-align: center;">
                    Mapping of Course Outcomes (COs)with Programme Outcomes (POs) & Programme Specific Outcomes (PSOs)
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 4px; font-size: 7.5pt; border: 1.5px solid #000; text-align: center; page-break-inside: avoid;">
                    <thead>
                        <tr>
                            <th rowspan="2" style="border: 1.5px solid #000; padding: 2px; width: 10%;">COs</th>
                            <th colspan="${poCount}" style="border: 1.5px solid #000; padding: 2px;">POs</th>
                            <th colspan="${psoCount}" style="border: 1.5px solid #000; padding: 2px;">PSOs</th>
                        </tr>
                        <tr>
                            ${poList && poList.length > 0
                ? poList.map((_, i) => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7pt;">${i + 1}</th>`).join('')
                : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7pt;">${n}</th>`).join('')
            }
                            ${psoList && psoList.length > 0
                ? psoList.map((_, i) => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7pt;">${i + 1}</th>`).join('')
                : [1, 2, 3].map(n => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7pt;">${n}</th>`).join('')
            }
                        </tr>
                    </thead>
                    <tbody>
                        ${coPoMapping.map(row => `
                            <tr>
                                <td style="border: 1.5px solid #000; padding: 1.5px; font-weight: bold;">${row.coNo}</td>
                                ${poList && poList.length > 0
                    ? poList.map((_, i) => `<td style="border: 1.5px solid #000; padding: 1px;">${row[`po${i + 1}`] || '-'}</td>`).join('')
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => `<td style="border: 1.5px solid #000; padding: 1px;">${row[`po${n}`] || '-'}</td>`).join('')
                }
                                ${psoList && psoList.length > 0
                    ? psoList.map((_, i) => `<td style="border: 1.5px solid #000; padding: 1px;">${row[`pso${i + 1}`] || '-'}</td>`).join('')
                    : [1, 2, 3].map(n => `<td style="border: 1.5px solid #000; padding: 1px;">${row[`pso${n}`] || '-'}</td>`).join('')
                }
                            </tr>
                        `).join('')}
                        <tr style="font-weight: bold; background-color: #f9f9f9;">
                            <td style="border: 1.5px solid #000; padding: 1.5px;">Average</td>
                            ${poList && poList.length > 0
                ? poList.map((_, i) => {
                    const validValues = coPoMapping.map(r => Number(r[`po${i + 1}`])).filter(v => !isNaN(v) && v > 0);
                    const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                    return `<td style="border: 1.5px solid #000; padding: 1px;">${avg}</td>`;
                }).join('')
                : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => {
                    const validValues = coPoMapping.map(r => Number(r[`po${n}`])).filter(v => !isNaN(v) && v > 0);
                    const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                    return `<td style="border: 1.5px solid #000; padding: 1px;">${avg}</td>`;
                }).join('')
            }
                            ${psoList && psoList.length > 0
                ? psoList.map((_, i) => {
                    const validValues = coPoMapping.map(r => Number(r[`pso${i + 1}`])).filter(v => !isNaN(v) && v > 0);
                    const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                    return `<td style="border: 1.5px solid #000; padding: 1px;">${avg}</td>`;
                }).join('')
                : [1, 2, 3].map(n => {
                    const validValues = coPoMapping.map(r => Number(r[`pso${n}`])).filter(v => !isNaN(v) && v > 0);
                    const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                    return `<td style="border: 1.5px solid #000; padding: 1px;">${avg}</td>`;
                }).join('')
            }
                        </tr>
                    </tbody>
                </table>
                <div style="display: flex; justify-content: space-between; font-size: 7pt; margin-top: 1px; margin-bottom: 2px;">
                    <span>3 - High</span>
                    <span>2 - Medium</span>
                    <span>1 - Low</span>
                    <span>"-" - No Correlation</span>
                </div>

                ${renderAssessmentComponentsHTML(subj)}
            </div>

            <div class="pdf-footer pdf-footer-inner">
                <div class="footer-left">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center">${pageNum2}</div>
                <div class="footer-right">Approved in Academic Council Meeting on ${acMeetingDate}</div>
            </div>
        </div>
        `;
    }).join('');
};

const exportCurriculumPDF = (deptData, academicLevel, regYearInput, instVisionMission) => {
    if (!deptData) return;

    const deptName = deptData.name || "Mechanical Engineering";
    const subjects = deptData.subjects || [];

    // Determine regulation year
    let regYear = regYearInput || deptData.regulation;
    if (!regYear && subjects.length > 0) {
        const firstCode = subjects[0].code || "";
        const match = firstCode.match(/\d{2}/);
        if (match) {
            regYear = `R-20${match[0]}`;
        }
    }
    if (!regYear) regYear = "R-2023";

    const pageTracker = { current: 1 };

    const isSH = (
        (deptData?.slug || '').toLowerCase().includes('science') && (deptData?.slug || '').toLowerCase().includes('humanities')
    ) || (
            (deptData?.slug || '').toLowerCase() === 'sh' || (deptData?.slug || '').toLowerCase() === 's-and-h'
        ) || (
            (deptName || '').toLowerCase().includes('science') && (deptName || '').toLowerCase().includes('humanities')
        ) || (
            (deptName || '').toLowerCase().includes('science & humanities')
        );

    let degreePrefix = "B.E.";
    if (isSH) {
        degreePrefix = "";
    } else if (academicLevel === "PG") {
        degreePrefix = deptData.slug === 'master-of-business-administration' ? 'M.B.A.' : 'M.E.';
    } else {
        const techSlugs = [
            'artificial-intelligence-and-data-science',
            'information-technology',
            'artificial-intelligence-and-machine-learning',
            'computer-science-and-engineering-cyber-security'
        ];
        degreePrefix = techSlugs.includes(deptData.slug || '') ? 'B.Tech.' : 'B.E.';
    }

    // Group subjects by semester (excluding vertical and open elective subjects)
    const semestersGrouped = subjects.filter(s => !s.vertical && !s.isOpenElective).reduce((acc, subj) => {
        const sem = subj.semester || 1;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(subj);
        return acc;
    }, {});

    const sortedSemesters = Object.keys(semestersGrouped).sort((a, b) => Number(a) - Number(b));

    // Group subjects by vertical
    const verticalsGrouped = subjects.filter(s => s.vertical).reduce((acc, subj) => {
        const vert = subj.vertical;
        if (!acc[vert]) acc[vert] = [];
        acc[vert].push(subj);
        return acc;
    }, {});

    const sortedVerticals = Object.keys(verticalsGrouped).sort((a, b) => Number(a) - Number(b));


    // Helper to generate page header
    const getHeaderHTML = () => `
        <div class="pdf-header pdf-header-inner">
            <div class="left-col">EASA College of Engineering and Technology</div>
            <div class="right-col">${formatDeptHeaderTitle(degreePrefix, deptName, regYear)}</div>
        </div>
    `;

    const bosMeetingDate = deptData.bosMeetingDate || "29.10.2024";
    const acMeetingDate = deptData.acMeetingDate || "25.11.2024";

    // Helper to generate page footer
    const getFooterHTML = (pageNum) => `
        <div class="pdf-footer pdf-footer-inner">
            <div class="footer-left">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
            <div class="footer-center">${pageNum}</div>
            <div class="footer-right">Approved in Academic Council Meeting on ${acMeetingDate}</div>
        </div>
    `;

    // Helper to render semester table HTML
    const renderSemesterTableHTML = (semNum) => {
        const subjectsForSem = sortSubjectsByCode(semestersGrouped[semNum] || []);
        if (subjectsForSem.length === 0) return '';

        const theoryCourses = subjectsForSem.filter(s => s.category?.toUpperCase() === 'THEORY' || (s.category?.toUpperCase().includes('THEORY') && !s.category?.toUpperCase().includes('PRACTICAL') && !s.category?.toUpperCase().includes('LANGUAGE') && !s.category?.toUpperCase().includes('EMPLOYABILITY') && !s.category?.toUpperCase().includes('MANDATORY')));
        const practicalCourses = subjectsForSem.filter(s => s.category?.toUpperCase() === 'PRACTICAL' || ((s.category?.toUpperCase().includes('PRACTICAL') || s.category?.toUpperCase().includes('LAB')) && !s.category?.toUpperCase().includes('THEORY') && !s.category?.toUpperCase().includes('EMPLOYABILITY') && !s.category?.toUpperCase().includes('MANDATORY')));
        const theoryCumPracticalCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('THEORY') && s.category?.toUpperCase().includes('PRACTICAL'));
        const languageElective1 = subjectsForSem.filter(s => s.category?.toUpperCase().includes('LANGUAGE ELECTIVE – I') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE - I') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE I'));
        const languageElective2 = subjectsForSem.filter(s => s.category?.toUpperCase().includes('LANGUAGE ELECTIVE – II') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE - II') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE II'));
        const employabilityCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('EMPLOYABILITY') || s.categoryType === 'EEC');
        const mandatoryCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('MANDATORY') || s.categoryType === 'MC');

        const accounted = new Set([
            ...theoryCourses,
            ...practicalCourses,
            ...theoryCumPracticalCourses,
            ...languageElective1,
            ...languageElective2,
            ...employabilityCourses,
            ...mandatoryCourses
        ]);
        const otherCourses = subjectsForSem.filter(s => !accounted.has(s));

        // Exclude Language Elective options from raw semester total sum
        const regularCoursesForTotal = subjectsForSem.filter(s => {
            const isLang1 = languageElective1.includes(s);
            const isLang2 = languageElective2.includes(s);
            return !isLang1 && !isLang2;
        });

        const semTotalContactPeriods = regularCoursesForTotal.reduce((sum, s) => {
            const cp = (s.contactPeriods !== undefined && s.contactPeriods !== '') ? Number(s.contactPeriods) : (Number(s.l || 0) + Number(s.t || 0) + Number(s.p || 0));
            return sum + (Number.isNaN(cp) ? 0 : cp);
        }, 0);

        const semTotalCredits = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.credits) || 0), 0);

        const renderCourseRows = (courseList) => {
            return sortSubjectsByCode(courseList).map(s => {
                const isInduction = (s.title || '').toUpperCase().includes('INDUCTION') || (s.code || '').toUpperCase().includes('INDUCTION');
                if (isInduction) {
                    return `
                    <tr>
                        <td class="center" style="font-family: monospace; font-weight: bold;">${(s.code || '').toUpperCase()}</td>
                        <td>${s.title}</td>
                        <td class="center" style="font-family: Arial, sans-serif;">${s.categoryType || 'MC'}</td>
                        <td class="center" colspan="4" style="font-weight: bold; font-family: Arial, sans-serif; font-size: 8pt; letter-spacing: 0.5px;">2 WEEKS</td>
                        <td class="center" style="font-weight: bold;">0</td>
                        <td class="center">-</td>
                        <td class="center">-</td>
                        <td class="center">-</td>
                    </tr>
                    `;
                }
                return `
                <tr>
                    <td class="center" style="font-family: monospace; font-weight: bold;">${(s.code || '').toUpperCase()}</td>
                    <td>${s.title}</td>
                    <td class="center" style="font-family: Arial, sans-serif;">${s.categoryType || 'PCC'}</td>
                    <td class="center">${s.l ?? 0}</td>
                    <td class="center">${s.t ?? 0}</td>
                    <td class="center">${s.p ?? 0}</td>
                    <td class="center">${s.contactPeriods || (Number(s.l || 0) + Number(s.t || 0) + Number(s.p || 0))}</td>
                    <td class="center" style="font-weight: bold;">${s.credits ?? 0}</td>
                    <td class="center">${s.cia !== undefined ? s.cia : 40}</td>
                    <td class="center">${s.ese !== undefined ? s.ese : 60}</td>
                    <td class="center">${s.total !== undefined ? s.total : 100}</td>
                </tr>
                `;
            }).join('');
        };

        return `
            <div style="page-break-inside: avoid; margin-bottom: 25px;">
                <h3 style="font-size: 10pt; font-weight: bold; text-align: center; margin-bottom: 8px; font-family: Arial, sans-serif;">
                    SEMESTER ${semNum}
                </h3>
                
                <table class="curriculum-table">
                    <thead>
                        <tr>
                            <th rowSpan="2" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif;">Course Code</th>
                            <th rowSpan="2" style="width: 42%; font-size: 8pt; font-family: Arial, sans-serif;">Course</th>
                            <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif;">Category</th>
                            <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px;">Periods / Week</th>
                            <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif;">Total Contact Periods</th>
                            <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif;">Credit</th>
                            <th colSpan="3" style="width: 13%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px;">Marks</th>
                        </tr>
                        <tr>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">L</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">T</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">P</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">CIA</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">ESE</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${theoryCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">THEORY COURSES</td>
                            </tr>
                            ${renderCourseRows(theoryCourses)}
                        ` : ''}

                        ${theoryCumPracticalCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">THEORY CUM PRACTICAL COURSES</td>
                            </tr>
                            ${renderCourseRows(theoryCumPracticalCourses)}
                        ` : ''}
                        
                        ${practicalCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">PRACTICAL COURSES</td>
                            </tr>
                            ${renderCourseRows(practicalCourses)}
                        ` : ''}

                        ${employabilityCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">EMPLOYABILITY ENHANCEMENT COURSE</td>
                            </tr>
                            ${renderCourseRows(employabilityCourses)}
                        ` : ''}

                        ${mandatoryCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">MANDATORY COURSES</td>
                            </tr>
                            ${renderCourseRows(mandatoryCourses)}
                        ` : ''}

                        ${otherCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">Other Courses</td>
                            </tr>
                            ${renderCourseRows(otherCourses)}
                        ` : ''}

                        <tr style="font-weight: bold; background: rgba(0,0,0,0.02); border-top: 1.5px solid #000;">
                            <td colSpan="6" style="text-align: center; font-weight: bold; font-family: Arial, sans-serif;">TOTAL</td>
                            <td class="center" style="font-weight: bold;">${semTotalContactPeriods}</td>
                            <td class="center" style="font-weight: bold;">${semTotalCredits}</td>
                            <td colSpan="3"></td>
                        </tr>
                    </tbody>
                </table>

                ${languageElective1.length > 0 ? `
                <div style="margin-top: 12px; page-break-inside: avoid;">
                    <table class="curriculum-table">
                        <thead>
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: #f2f2f2; text-align: left; padding: 4px 8px; border: 1.5px solid #000; text-transform: uppercase;">
                                    LANGUAGE ELECTIVE – I
                                </td>
                            </tr>
                            <tr>
                                <th rowSpan="2" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif;">Course Code</th>
                                <th rowSpan="2" style="width: 42%; font-size: 8pt; font-family: Arial, sans-serif;">Course</th>
                                <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif;">Category</th>
                                <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px;">Periods / Week</th>
                                <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif;">Total Contact Periods</th>
                                <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif;">Credit</th>
                                <th colSpan="3" style="width: 13%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px;">Marks</th>
                            </tr>
                            <tr>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">L</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">T</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">P</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">CIA</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">ESE</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderCourseRows(languageElective1)}
                        </tbody>
                    </table>
                </div>
                ` : ''}

                ${languageElective2.length > 0 ? `
                <div style="margin-top: 12px; page-break-inside: avoid;">
                    <table class="curriculum-table">
                        <thead>
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: #f2f2f2; text-align: left; padding: 4px 8px; border: 1.5px solid #000; text-transform: uppercase;">
                                    LANGUAGE ELECTIVE – II
                                </td>
                            </tr>
                            <tr>
                                <th rowSpan="2" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif;">Course Code</th>
                                <th rowSpan="2" style="width: 42%; font-size: 8pt; font-family: Arial, sans-serif;">Course</th>
                                <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif;">Category</th>
                                <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px;">Periods / Week</th>
                                <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif;">Total Contact Periods</th>
                                <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif;">Credit</th>
                                <th colSpan="3" style="width: 13%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px;">Marks</th>
                            </tr>
                            <tr>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">L</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">T</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">P</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">CIA</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">ESE</th>
                                <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${renderCourseRows(languageElective2)}
                        </tbody>
                    </table>
                </div>
                ` : ''}
            </div>
        `;
    };

    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Curriculum and Syllabus - ${deptName}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            /* Default typography with full Tamil Unicode font fallback */
            body {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                font-size: 10pt;
            }
            
            /* Apply consistent font family to all elements on content pages (page 2 onwards) except headers and footers */
            .print-table .page,
            .page {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
            }
            
            /* Header and Footer styles (exempt from the content page font/size overrides) */
            .pdf-header, .pdf-header * {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif !important;
                font-size: 9.5pt !important;
                font-style: italic !important;
                font-weight: bold !important;
            }
            .pdf-footer, .pdf-footer * {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif !important;
                font-size: 9pt !important;
                font-style: italic !important;
            }
            .pdf-footer .footer-center, .pdf-footer .footer-center * {
                font-style: normal !important;
                font-weight: bold !important;
            }
            @page {
                size: A4;
                margin: 15mm 15mm 20mm 15mm;
            }
            body {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                color: #000;
                background: #fff;
                margin: 0;
                padding: 0;
                font-size: 11pt;
                line-height: 1.4;
            }
            .page {
                position: relative;
                box-sizing: border-box;
                padding-top: 20px;
                padding-bottom: 20px;
            }
            
            /* Header */
            .pdf-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: 1.5px solid #000;
                padding-bottom: 5px;
                margin-bottom: 25px;
                font-size: 9.5pt;
                font-weight: bold;
                font-family: Arial, sans-serif;
                font-style: italic;
                position: relative;
            }
            .pdf-header .left-col {
                text-align: left;
            }
            .pdf-header .right-col {
                text-align: right;
            }
            
            /* Footer */
            .pdf-footer {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-size: 9pt;
                font-family: Arial, sans-serif;
                font-style: italic;
                color: #000;
            }
            .pdf-footer .footer-left {
                text-align: left;
            }
            .pdf-footer .footer-right {
                text-align: right;
            }
            .pdf-footer .footer-center {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                font-style: normal;
                font-weight: bold;
            }
            
            /* Circular Stamp CSS */
            .stamp-wrapper {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -22px;
                z-index: 10;
            }
            .stamp {
                width: 90px;
                height: 90px;
                border: 2px dashed rgba(255, 0, 127, 0.85);
                border-radius: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                box-sizing: border-box;
                position: relative;
                background: #fff;
            }
            .stamp-top {
                font-size: 4pt;
                color: rgba(255, 0, 127, 0.85);
                font-weight: 800;
                letter-spacing: 0.2px;
                text-align: center;
                width: 85%;
            }
            .stamp-bottom {
                font-size: 4.5pt;
                color: rgba(255, 0, 127, 0.85);
                font-weight: 800;
                letter-spacing: 0.2px;
                text-align: center;
            }
            .stamp-inner {
                border: 1px solid rgba(255, 0, 127, 0.85);
                color: rgba(255, 0, 127, 0.85);
                font-size: 6.5pt;
                font-weight: 900;
                padding: 1px 4px;
                transform: rotate(-6deg);
                background: #fff;
                white-space: nowrap;
                letter-spacing: 0.2px;
            }

            /* Content Typography */
            .title-block {
                text-align: center;
                margin-top: 30px;
                margin-bottom: 30px;
            }
            .title-block h1 {
                font-size: 14pt;
                font-weight: bold;
                margin: 0 0 10px 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .title-block h2 {
                font-size: 11pt;
                font-weight: bold;
                margin: 0;
                line-height: 1.5;
                letter-spacing: 0.2px;
            }
            
            .section-container {
                margin-bottom: 25px;
            }
            .section-title {
                font-size: 11pt;
                font-weight: bold;
                text-decoration: underline;
                margin-bottom: 10px;
                text-transform: uppercase;
            }
            
            p.section-text {
                font-size: 10.5pt;
                text-align: justify;
                margin: 0 0 12px 0;
                text-indent: 30px;
            }
            
            ol, ul {
                margin: 0 0 15px 0;
                padding-left: 20px;
            }
            li {
                margin-bottom: 6px;
                text-align: justify;
                font-size: 10.5pt;
            }
            
            /* Table Styles */
            table.curriculum-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                margin-bottom: 25px;
                font-size: 9pt;
            }
            table.curriculum-table th, table.curriculum-table td {
                border: 1px solid #000;
                padding: 5px 6px;
                text-align: left;
                vertical-align: middle;
            }
            table.curriculum-table th {
                font-weight: bold;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            table.curriculum-table td.center {
                text-align: center;
            }
            table.curriculum-table tr.category-row td {
                font-weight: bold;
                background-color: rgba(0, 0, 0, 0.03);
                padding: 4px 6px;
            }
            
            .cover-border {
                border: 3.5px double #000;
                padding: 40px 25px 25px 25px;
                box-sizing: border-box;
                height: 242mm;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                position: relative;
            }
            
            /* Screen & Preview styling */
            @media screen {
                body {
                    background: #f3f4f6;
                    padding: 40px 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .cover-page, .page, .syllabus-subject-block {
                    background: #fff;
                    width: 210mm;
                    min-height: auto;
                    margin: 20px auto;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 20mm 15mm;
                    box-sizing: border-box;
                    position: relative;
                }
                .cover-page {
                    min-height: 297mm;
                    margin-top: 60px;
                }
                .page {
                    min-height: 297mm;
                }
                .preview-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 56px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 24px;
                    z-index: 9999;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                }
                .preview-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #1f2937;
                }
                .preview-btn {
                    padding: 8px 16px;
                    font-size: 13px;
                    font-weight: 500;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: none;
                    outline: none;
                }
                .btn-print {
                    background: #2563eb;
                    color: #fff;
                    margin-right: 8px;
                }
                .btn-print:hover {
                    background: #1d4ed8;
                }
                .btn-close {
                    background: #f3f4f6;
                    color: #4b5563;
                    border: 1px solid #d1d5db;
                }
                .btn-close:hover {
                    background: #e5e7eb;
                    color: #1f2937;
                }
                .print-table {
                    display: block;
                    width: 100%;
                }
                .print-table > thead, .print-table > tfoot {
                    display: none !important;
                }
                .print-table > tbody {
                    display: block;
                    width: 100%;
                }
                .print-table > tbody > tr {
                    display: block;
                    width: 100%;
                }
                .print-table > tbody > tr > td {
                    display: block;
                    width: 100%;
                }
            }
            
            /* Print settings */
            @media print {
                @page {
                    size: A4 portrait;
                    margin: 12mm 15mm 12mm 15mm;
                }
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    background: #fff !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .preview-bar {
                    display: none !important;
                }
                .cover-page {
                    width: 100% !important;
                    height: 260mm !important;
                    max-height: 260mm !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    box-shadow: none !important;
                    background: #fff !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    overflow: hidden !important;
                }
                .page {
                    width: 100% !important;
                    min-height: 255mm !important;
                    height: auto !important;
                    max-height: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    box-shadow: none !important;
                    background: #fff !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: space-between !important;
                    overflow: visible !important;
                }
                .syllabus-subject-block {
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    position: relative !important;
                    box-shadow: none !important;
                    background: #fff !important;
                    page-break-before: always !important;
                    break-before: page !important;
                    page-break-after: auto !important;
                    break-after: auto !important;
                }
                .pdf-header,
                .pdf-header-inner {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: flex-end !important;
                    border-bottom: 1.5px solid #000 !important;
                    padding-bottom: 5px !important;
                    margin-bottom: 15px !important;
                    font-size: 9.5pt !important;
                    font-weight: bold !important;
                    font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif !important;
                    font-style: italic !important;
                    width: 100% !important;
                    flex-shrink: 0 !important;
                }
                .pdf-footer,
                .pdf-footer-inner {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: flex-end !important;
                    border-top: 1px solid #000 !important;
                    padding-top: 5px !important;
                    margin-top: auto !important;
                    font-size: 9pt !important;
                    font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif !important;
                    font-style: italic !important;
                    color: #000 !important;
                    width: 100% !important;
                    position: relative !important;
                    flex-shrink: 0 !important;
                }
                .pdf-footer .footer-center,
                .pdf-footer-inner .footer-center {
                    position: absolute !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    text-align: center !important;
                    font-style: normal !important;
                    font-weight: bold !important;
                }
            }
        </style>
    </head>
    <body>
        <!-- Preview Control Bar -->
        <div class="preview-bar no-print">
            <div class="preview-title">Curriculum & Syllabus Preview - ${formatDeptHeaderTitle(degreePrefix, deptName, regYear)}</div>
            <div>
                <button class="preview-btn btn-print" onclick="window.print()">Print / Save PDF</button>
                <button class="preview-btn btn-close" onclick="window.close()">Close Preview</button>
            </div>
        </div>
    
        <!-- PAGE 1: COVER PAGE -->
        <div class="cover-page">
            <div class="cover-border">
                <!-- 1. HEADER CELL -->
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; border-bottom: 1.5px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
                    <!-- Left: College Logo -->
                    <div style="flex: 0 0 75px; display: flex; align-items: center; justify-content: flex-start;">
                        <img src="${collegeLogo}" style="height: 70px; padding-left: 150px; object-fit: contain;" />
                    </div>
                </div>

                <!-- 2. DEGREE & DEPARTMENT -->
                <div style="margin: 40px 0; text-align: center;">
                    <h2 style="font-family: Arial, sans-serif; font-size: 30pt; font-weight: bold; line-height: 1.5; text-transform: uppercase; margin: 0; padding: 0 10px;">
                        ${degreePrefix ? `${degreePrefix} ` : ''}${deptName.toUpperCase()}
                    </h2>
                </div>

                <!-- 3. TITLE block -->
                <div style="margin: 40px 0; text-align: center;">
                    <h1 style="font-family: Arial, sans-serif; font-size: 24pt; font-weight: bold; line-height: 1.3; text-transform: uppercase; margin: 0 0 10px 0;">
                        CURRICULUM AND SYLLABUS
                    </h1>
                    <h3 style="font-family: Arial, sans-serif; font-size:20pt; font-weight: bold; text-transform: uppercase; margin: 0;">
                        (CHOICE BASED CREDIT SYSTEM)
                    </h3>
                </div>

                <!-- 4. REGULATION YEAR -->
                <div style="margin: 45px 0; text-align: center;">
                    <h2 style="font-family: Arial, sans-serif; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 0;">
                        REGULATIONS ${regYear.replace('R-', '')}
                    </h2>
                </div>

                <!-- 5. SIGNATURE / FOOTER BLOCK -->
                <div style="width: 100%; display: flex; justify-content: center; margin-top: 40px;">
                </div>
            </div>
        </div>
    
        <!-- PAGE 2: INSTITUTION VISION & MISSION -->
        <div class="page">
            ${getHeaderHTML()}
            
            <div class="title-block" style="margin-top: 30px; margin-bottom: 25px;">
                <h1 style="font-size: 16pt;">EASA College of Engineering and Technology</h1>
                <h2 style="font-size: 11pt; color: #555; margin-top: 5px;">An Autonomous Institution</h2>
            </div>
            
            <div class="section-container" style="margin-bottom: 30px;">
                <h3 class="section-title">Vision of the Institution</h3>
                <p class="section-text" style="font-size: 11pt; line-height: 1.6;">${instVisionMission?.vision || 'To excel in training the young minds of our nation with technical expertise, professional ethics and holistic values to meet the challenges of the future.'}</p>
            </div>
            
            <div class="section-container">
                <h3 class="section-title">Mission of the Institution</h3>
                <ul style="list-style-type: none; padding-left: 0;">
                    ${instVisionMission?.mission && instVisionMission.mission.length > 0
            ? instVisionMission.mission.map((m, i) => `<li style="margin-bottom: 10px; font-size: 10.5pt; line-height: 1.5;"><strong>M${i + 1}</strong>: ${m}</li>`).join('')
            : `
                            <li style="margin-bottom: 10px; font-size: 10.5pt; line-height: 1.5;"><strong>M1</strong>: To provide quality technical education and soft skills training to groom the students for modern industrial needs.</li>
                            <li style="margin-bottom: 10px; font-size: 10.5pt; line-height: 1.5;"><strong>M2</strong>: To foster an environment conducive for research, development, and entrepreneurship.</li>
                            <li style="margin-bottom: 10px; font-size: 10.5pt; line-height: 1.5;"><strong>M3</strong>: To instill professional ethics, social responsibility, and lifelong learning in young professionals.</li>
                        `
        }
                </ul>
            </div>
            ${getFooterHTML(++pageTracker.current)}
        </div>

        <!-- PAGE 3: DEPARTMENT VISION, MISSION, PEOs, PSOs -->
        <div class="page">
            ${getHeaderHTML()}
            
            <div class="title-block" style="margin-top: 20px; margin-bottom: 20px;">
                <h1 style="font-size: 16pt; text-transform: uppercase;">Department of ${deptName.toUpperCase()}</h1>
            </div>
            
            <div class="section-container" style="margin-bottom: 25px;">
                <h3 class="section-title">Vision of the Department</h3>
                <p class="section-text">${deptData.vision || 'To be a center of excellence in education and research, fostering technically competent, ethically responsible professionals.'}</p>
            </div>
            
            <div class="section-container" style="margin-bottom: 25px;">
                <h3 class="section-title">Mission of the Department</h3>
                <ul style="list-style-type: none; padding-left: 0;">
                    ${deptData.mission && deptData.mission.length > 0
            ? deptData.mission.map((m, i) => `<li style="margin-bottom: 8px;"><strong>M${i + 1}</strong>: ${m}</li>`).join('')
            : '<li>To provide quality technical education and skills training.</li>'
        }
                </ul>
            </div>
            
            ${deptData.peo && deptData.peo.length > 0 ? `
            <div class="section-container" style="margin-bottom: 25px;">
                <h3 class="section-title">Program Educational Objectives (PEOs)</h3>
                <ol style="list-style-type: none; padding-left: 0;">
                    ${deptData.peo.map((peo, i) => `<li style="margin-bottom: 8px;"><strong>PEO${i + 1}</strong>: ${peo}</li>`).join('')}
                </ol>
            </div>
            ` : ''}

            ${deptData.pso && deptData.pso.length > 0 ? `
            <div class="section-container">
                <h3 class="section-title">Program Specific Outcomes (PSOs)</h3>
                <ol style="list-style-type: none; padding-left: 0;">
                    ${deptData.pso.map((pso, i) => `<li style="margin-bottom: 8px;"><strong>PSO${i + 1}</strong>: ${pso}</li>`).join('')}
                </ol>
            </div>
            ` : ''}
            ${getFooterHTML(++pageTracker.current)}
        </div>

        <!-- PAGE 4: POs -->
        ${deptData.po && deptData.po.length > 0 ? `
        <div class="page">
            ${getHeaderHTML()}
            
            <div class="section-container" style="margin-top: 10px;">
                <h3 class="section-title" style="margin-bottom: 15px;">Program Outcomes (POs)</h3>
                <div style="font-size: 9.5pt; line-height: 1.45;">
                    ${deptData.po.map((po, i) => {
            const parts = po.split(':');
            const title = parts.length > 1 ? parts[0].trim() : `PO ${i + 1}`;
            const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : po.trim();
            const cleanTitle = title.replace(/^PO\s*\d+\.?\s*/i, '');
            return `
                            <div style="margin-bottom: 12px; text-align: justify;">
                                <strong>PO ${i + 1}. ${cleanTitle}</strong>: ${desc}
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
            ${getFooterHTML(++pageTracker.current)}
        </div>
        ` : ''}

        <!-- CURRICULUM PAGES -->
        ${(() => {
            return sortedSemesters.map((semNum, index) => {
                return `
                <div class="page">
                    ${getHeaderHTML()}
                    ${index === 0 ? `
                    <div class="title-block" style="margin-top: 15px; margin-bottom: 20px;">
                        <h1 style="font-size: 15pt; font-family: Arial, sans-serif;">${degreePrefix ? `${degreePrefix.toUpperCase()} ` : ''}${deptName.toUpperCase()}</h1>
                        <h2 style="font-size: 11pt; font-family: Arial, sans-serif; font-weight: bold; line-height: 1.5; margin-top: 10px;">
                            REGULATION – ${regYear.replace('R-', '')}<br>
                            CHOICE BASED CREDIT SYSTEM<br>
                            CURRICULUM
                        </h2>
                    </div>
                    ` : ''}
                    
                    ${renderSemesterTableHTML(semNum)}
                    
                    ${getFooterHTML(++pageTracker.current)}
                </div>
                `;
            }).join('');
        })()}

        <!-- PROFESSIONAL ELECTIVES PAGE -->
        ${sortedVerticals.length > 0 ? `
        <div class="page">
            ${getHeaderHTML()}
            
            <div style="margin-top: 10px;">
                <h3 style="font-size: 11pt; font-weight: bold; text-align: center; margin-bottom: 12px; font-family: Arial, sans-serif; text-transform: uppercase;">
                    Professional Elective Courses
                </h3>
                
                <table class="curriculum-table">
                    <thead>
                        <tr>
                            <th rowSpan="2" style="width: 15%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Code</th>
                            <th rowSpan="2" style="width: 43%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Title</th>
                            <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Periods / Week</th>
                            <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Total Contact Periods</th>
                            <th rowSpan="2" style="width: 7%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credit</th>
                            <th colSpan="3" style="width: 13%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Marks</th>
                        </tr>
                        <tr>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">L</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">T</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">P</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">CIA</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">ESE</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(() => {
                return sortedVerticals.map(vertNum => {
                    const subjectsForVert = sortSubjectsByCode(verticalsGrouped[vertNum] || []);
                    const verticalName = subjectsForVert.find(s => s.verticalName)?.verticalName || '';
                    const romanNum = getRomanNumeral(vertNum);

                    return `
                                    <tr class="category-row" style="background-color: rgba(0, 0, 0, 0.05);">
                                        <td colSpan="10" style="font-family: Arial, sans-serif; font-size: 9pt; font-weight: bold; text-align: center; padding: 6px;">
                                            Vertical ${romanNum}: ${verticalName}
                                        </td>
                                    </tr>
                                    ${subjectsForVert.map(s => {
                        return `
                                            <tr>
                                                <td class="center" style="font-family: monospace; font-weight: bold;">${(s.code || '').toUpperCase()}</td>
                                                <td>${s.title}</td>
                                                <td class="center">${s.l}</td>
                                                <td class="center">${s.t}</td>
                                                <td class="center">${s.p}</td>
                                                <td class="center">${s.contactPeriods}</td>
                                                <td class="center" style="font-weight: bold;">${s.credits}</td>
                                                <td class="center">${s.cia}</td>
                                                <td class="center">${s.ese}</td>
                                                <td class="center">${s.total}</td>
                                            </tr>
                                        `;
                    }).join('')}
                                `;
                }).join('');
            })()}
                    </tbody>
                </table>
            </div>
            
            ${getFooterHTML(++pageTracker.current)}
        </div>
        ` : ''}

        <!-- OPEN ELECTIVES PAGE -->
        ${subjects.some(s => s.isOpenElective) ? `
        <div class="page">
            ${getHeaderHTML()}
            
            <div style="margin-top: 10px;">
                <h3 style="font-size: 11pt; font-weight: bold; text-align: center; margin-bottom: 12px; font-family: Arial, sans-serif; text-transform: uppercase;">
                    Open Elective Courses
                </h3>
                
                <table class="curriculum-table">
                    <thead>
                        <tr>
                            <th rowSpan="2" style="width: 15%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Code</th>
                            <th rowSpan="2" style="width: 51%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Title</th>
                            <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Periods / Week</th>
                            <th rowSpan="2" style="width: 9%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Total Contact Periods</th>
                            <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credit</th>
                            <th colSpan="3" style="width: 13%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Marks</th>
                        </tr>
                        <tr>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">L</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">T</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">P</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">CIA</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">ESE</th>
                            <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(() => {
                const oecsGrouped = subjects.filter(s => s.isOpenElective).reduce((acc, subj) => {
                    const dept = (subj.offeringDept && subj.offeringDept !== 'Other Departments') ? subj.offeringDept : (deptData?.name || selectedDept || 'Biomedical Engineering');
                    if (!acc[dept]) acc[dept] = [];
                    acc[dept].push(subj);
                    return acc;
                }, {});
                const sortedOecDepts = Object.keys(oecsGrouped).sort();
                return sortedOecDepts.map(deptName => {
                    const deptSubjects = sortSubjectsByCode(oecsGrouped[deptName] || []);
                    return `
                                    <tr style="background: #f9f9f9;">
                                        <td colspan="10" style="font-weight: bold; text-align: center; font-size: 9.5pt; font-family: Arial, sans-serif; background-color: #f2f2f2; border: 1px solid #000; padding: 6px;">
                                            ${deptName}
                                        </td>
                                    </tr>
                                    ${deptSubjects.map(s => {
                        return `
                                            <tr>
                                                <td class="center" style="font-family: monospace; font-weight: bold;">${(s.code || '').toUpperCase()}</td>
                                                <td>${s.title}</td>
                                                <td class="center">${s.l}</td>
                                                <td class="center">${s.t}</td>
                                                <td class="center">${s.p}</td>
                                                <td class="center">${s.contactPeriods}</td>
                                                <td class="center" style="font-weight: bold;">${s.credits}</td>
                                                <td class="center">${s.cia}</td>
                                                <td class="center">${s.ese}</td>
                                                <td class="center">${s.total}</td>
                                            </tr>
                                        `;
                    }).join('')}
                                `;
                }).join('');
            })()}
                    </tbody>
                </table>
            </div>
            
            ${getFooterHTML(++pageTracker.current)}
        </div>
        ` : ''}

        <!-- CREDIT DISTRIBUTION PAGE -->
        ${subjects && subjects.length > 0 ? getCreditDistributionHTML(subjects, pageTracker, bosMeetingDate, acMeetingDate, degreePrefix, deptName, regYear) : ''}

        <!-- DETAILED SYLLABI -->
        ${subjects && subjects.length > 0 ? getDetailedSyllabiHTML(subjects, regYear, pageTracker, bosMeetingDate, acMeetingDate, deptData.po, deptData.pso, degreePrefix, deptName) : ''}
        
        <script>
            function getRomanNumeral(num) {
                const lookup = {1:'I', 2:'II', 3:'III', 4:'IV', 5:'V', 6:'VI', 7:'VII', 8:'VIII', 9:'IX', 10:'X'};
                return lookup[num] || num;
            }
        </script>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
};

const SyllabusPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [resources, setResources] = useState([]);
    const [instVisionMission, setInstVisionMission] = useState({ vision: '', mission: [] });
    const [loading, setLoading] = useState(true);

    // Filter States
    const [academicLevel, setAcademicLevel] = useState("UG");
    const [selectedDept, setSelectedDept] = useState("computer-science-and-engineering");
    const [selectedReg, setSelectedReg] = useState("R-2023");
    const [searchQuery, setSearchQuery] = useState("");

    // Department Data State
    const [deptData, setDeptData] = useState(null);

    // New Subject Explorer States
    const [selectedSemester, setSelectedSemester] = useState("all");
    const [selectedSubjectCode, setSelectedSubjectCode] = useState("all");

    // Ref for smooth scrolling to detailed viewer
    const detailedViewerRef = useRef(null);

    // Accordion active semester state
    const [activeSemester, setActiveSemester] = useState(1);

    // Fetch Syllabus resources from backend
    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/api/resources?category=${encodeURIComponent("Syllabus & Curriculum")}`)
            .then(res => res.json())
            .then(data => {
                setResources(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch syllabus documents", err);
                setLoading(false);
            });

        // Fetch institute mission & vision
        fetch(`${API_BASE_URL}/api/mission-vision`)
            .then(res => res.json())
            .then(data => {
                if (data) setInstVisionMission(data);
            })
            .catch(err => console.error("Failed to fetch institute mission-vision", err));
    }, []);

    // Fetch Department Data whenever selectedDept changes
    useEffect(() => {
        if (!selectedDept) return;
        fetch(`${API_BASE_URL}/api/departments/${selectedDept}`)
            .then(res => res.json())
            .then(data => {
                setDeptData(data);
                if (data && data.regulation) {
                    setSelectedReg(data.regulation);
                }
            })
            .catch(err => console.error("Failed to fetch department data", err));
    }, [selectedDept]);

    // Extract available departments based on Level
    const filteredDepts = staticDepartments.filter(d => d.type === academicLevel);

    // Automatically ensure selected department is valid when Level changes
    useEffect(() => {
        if (filteredDepts.length > 0) {
            const hasCurrent = filteredDepts.some(d => d.slug === selectedDept);
            if (!hasCurrent) {
                setSelectedDept(filteredDepts[0].slug);
            }
        }
    }, [academicLevel, filteredDepts, selectedDept]);

    // Find dynamically uploaded documents that match filters
    const matchingDocs = resources.filter(res => {
        const titleLower = (res.title || "").toLowerCase();
        const descLower = (res.description || "").toLowerCase();
        const textToSearch = `${titleLower} ${descLower}`;

        // Get department metadata for keyword matching
        const deptObj = staticDepartments.find(d => d.slug === selectedDept);
        const deptName = deptObj ? deptObj.name.toLowerCase() : "";
        const deptSlugShort = selectedDept.replace(/-/g, " ");

        // Check if matching regulation year (e.g. "2023", "2021", "2017")
        const regYear = selectedReg.replace("R-", "");
        const matchesReg = textToSearch.includes(regYear);

        // Check if matching department keywords
        const matchesDept = textToSearch.includes(selectedDept) ||
            (deptName && textToSearch.includes(deptName)) ||
            textToSearch.includes(deptSlugShort) ||
            (selectedDept === "computer-science-and-engineering" && textToSearch.includes("cse")) ||
            (selectedDept === "information-technology" && textToSearch.includes("it")) ||
            (selectedDept === "electronics-and-communication-engineering" && textToSearch.includes("ece")) ||
            (selectedDept === "electrical-and-electronics-engineering" && textToSearch.includes("eee")) ||
            (selectedDept === "biomedical-engineering" && textToSearch.includes("bme")) ||
            (selectedDept === "mechanical-engineering" && textToSearch.includes("mech")) ||
            (selectedDept === "agriculture-engineering" && textToSearch.includes("agri")) ||
            (selectedDept === "artificial-intelligence-and-data-science" && (textToSearch.includes("ai & ds") || textToSearch.includes("aids") || textToSearch.includes("artificial intelligence")));

        return matchesReg && matchesDept;
    });

    // Retrieve active syllabus breakdown (static mock data + fallbacks)
    const getSyllabusBreakdown = () => {
        const regData = SYLLABUS_DATA[selectedReg];
        if (regData && regData[academicLevel] && regData[academicLevel][selectedDept]) {
            return regData[academicLevel][selectedDept];
        }

        // If not explicitly defined, return generic first-year engineering for semesters 1-2, 
        // and empty placeholders for 3-8 (representing dynamic syllabus being updated).
        const totalSemesters = academicLevel === "UG" ? 8 : 4;
        const semesters = [];

        for (let sem = 1; sem <= totalSemesters; sem++) {
            if (sem <= 2 && academicLevel === "UG") {
                semesters.push(GENERIC_FIRST_YEAR[sem - 1]);
            } else {
                semesters.push({
                    semester: sem,
                    courses: [] // Empty - will display dynamic download banner
                });
            }
        }
        return semesters;
    };

    const syllabusBreakdown = getSyllabusBreakdown();
    const activeDeptData = staticDepartments.find(d => d.slug === selectedDept);

    // Calculate available semesters for current department
    const getAvailableSemesters = () => {
        return syllabusBreakdown.map(sem => sem.semester);
    };

    // Calculate available subjects for selected semester
    const getSubjectsForSemester = (semesterNum) => {
        if (semesterNum === "all") {
            // Return all subjects across all semesters
            return syllabusBreakdown.flatMap(sem => sem.courses);
        }
        const semData = syllabusBreakdown.find(sem => sem.semester === parseInt(semesterNum));
        return semData ? semData.courses : [];
    };

    // Get subjects to display in filter (sorted A-Z)
    const availableSubjects = sortSubjectsByCode(
        selectedSemester === "all"
            ? Array.from(new Map(syllabusBreakdown.flatMap(sem => sem.courses).map(course => [course.code, course])).values())
            : getSubjectsForSemester(selectedSemester)
    );

    // Get the selected subject details
    const getSelectedSubjectDetails = () => {
        const subject = availableSubjects.find(s => s.code === selectedSubjectCode);
        return subject || null;
    };

    const selectedSubject = getSelectedSubjectDetails();

    return (
        <div className="resource-page" style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* Premium Page Hero */}
            <div className="page-hero">
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${missionBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.5, zIndex: 0 }} />

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem', width: '100%', maxWidth: '1000px' }}>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-1px', textShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        Syllabus & Curriculum
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', maxWidth: '750px', margin: '0 auto', fontWeight: '300', lineHeight: 1.6 }}>
                        Explore academic regulations, course modules, and credit distributions designed to foster professional capability and technical expertise.
                    </p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link
                            to="/admin/syllabus"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0.6rem 1.4rem',
                                borderRadius: '30px',
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.35))',
                                border: '1px solid rgba(99, 102, 241, 0.5)',
                                color: '#e0e7ff',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                textDecoration: 'none',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)',
                                transition: 'all 0.2s'
                            }}
                        >
                            ⚙️ Manage Syllabus & Curriculum (Faculty / Admin Portal) &rarr;
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Filter Section */}
            <section className="container" style={{ marginTop: '3rem', padding: '0 2rem', position: 'relative', zIndex: 20 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card"
                    style={{
                        padding: '2rem',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        background: 'var(--bg-card)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(20px)'
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                        {/* Level Filter */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Academic Level</label>
                            <div style={{ display: 'flex', background: 'var(--bg-section)', padding: '4px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                <button
                                    onClick={() => setAcademicLevel("UG")}
                                    style={{
                                        flex: 1, padding: '0.6rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
                                        background: academicLevel === 'UG' ? 'var(--primary)' : 'transparent',
                                        color: academicLevel === 'UG' ? '#fff' : 'var(--text-main)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Undergraduate (UG)
                                </button>
                                <button
                                    onClick={() => setAcademicLevel("PG")}
                                    style={{
                                        flex: 1, padding: '0.6rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem',
                                        background: academicLevel === 'PG' ? 'var(--primary)' : 'transparent',
                                        color: academicLevel === 'PG' ? '#fff' : 'var(--text-main)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Postgraduate (PG)
                                </button>
                            </div>
                        </div>

                        {/* Department Dropdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</label>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                style={{
                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                                    fontWeight: '500', width: '100%', cursor: 'pointer'
                                }}
                            >
                                {filteredDepts.map(dept => (
                                    <option key={dept.id} value={dept.slug}>{dept.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Regulation Year */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Regulation Year</label>
                            <select
                                value={selectedReg}
                                onChange={(e) => setSelectedReg(e.target.value)}
                                style={{
                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                                    fontWeight: '500', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <option value="R-2023">R-2023 (Latest)</option>
                                <option value="R-2021">R-2021</option>
                                <option value="R-2017">R-2017</option>
                            </select>
                        </div>

                        {/* Semester Selector */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Semester</label>
                            <select
                                value={selectedSemester}
                                onChange={(e) => {
                                    setSelectedSemester(e.target.value);
                                    setSelectedSubjectCode("all"); // Reset subject selection
                                }}
                                style={{
                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                                    fontWeight: '500', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <option value="all">All Semesters</option>
                                {getAvailableSemesters().map(sem => (
                                    <option key={sem} value={sem}>Semester {sem}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subject Selector */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</label>
                            <select
                                value={selectedSubjectCode}
                                onChange={(e) => {
                                    setSelectedSubjectCode(e.target.value);
                                    if (e.target.value !== "all") {
                                        const subCode = e.target.value;
                                        const foundSem = syllabusBreakdown.find(sem =>
                                            sem.courses.some(c => c.code === subCode)
                                        );
                                        if (foundSem) {
                                            setActiveSemester(foundSem.semester);
                                        }
                                        // Scroll to detailed viewer
                                        setTimeout(() => {
                                            detailedViewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }, 100);
                                    }
                                }}
                                style={{
                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                                    background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                                    fontWeight: '500', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <option value="all">All Subjects</option>
                                {availableSubjects.map(sub => (
                                    <option key={sub.code} value={sub.code}>{sub.code} - {sub.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

            </section>

            {/* Main Content Area */}
            <section className="container" style={{ padding: '3rem 2rem', flex: 1, position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

                    {/* Department Overview (Mission, Vision, Outcomes) */}
                    {deptData && (deptData.mission?.length > 0 || deptData.vision?.length > 0 || deptData.peo?.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{
                                padding: '2rem',
                                border: '1px solid var(--glass-border)',
                                background: 'var(--bg-card)',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--glass-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>
                                    Department Overview & Outcomes
                                </h2>
                                <button
                                    onClick={() => {
                                        const activeDeptObj = staticDepartments.find(d => d.slug === selectedDept);
                                        exportCurriculumPDF({
                                            ...(deptData || {}),
                                            name: activeDeptObj ? activeDeptObj.name : 'Engineering Department',
                                            slug: selectedDept,
                                            subjects: (deptData && deptData.subjects && deptData.subjects.length > 0)
                                                ? deptData.subjects
                                                : flattenSemesters(syllabusBreakdown)
                                        }, academicLevel, selectedReg, instVisionMission);
                                    }}
                                    className="btn btn-primary"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '8px' }}
                                >
                                    <FaFilePdf /> Export Official Curriculum PDF
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {deptData.mission?.length > 0 && (
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaGlobe style={{ color: 'var(--secondary)' }} /> Mission
                                        </h3>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {deptData.mission.map((item, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--text-muted)' }}>
                                                    <span style={{ minWidth: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '6px' }}></span>
                                                    <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {deptData.vision?.length > 0 && (
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaLightbulb style={{ color: 'var(--secondary)' }} /> Vision
                                        </h3>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {deptData.vision.map((item, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--text-muted)' }}>
                                                    <span style={{ minWidth: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '6px' }}></span>
                                                    <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {deptData.peo?.length > 0 && (
                                <div style={{ marginTop: '1rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaGraduationCap style={{ color: 'var(--secondary)' }} /> Program Educational Objectives (PEO)
                                    </h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {deptData.peo.map((peo, idx) => (
                                            <div key={idx} style={{ padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{idx + 1}</span>
                                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{peo}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {deptData.po?.length > 0 && (
                                <div style={{ marginTop: '1rem' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaBookOpen style={{ color: 'var(--secondary)' }} /> Program Outcomes (PO)
                                    </h3>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {deptData.po.map((po, idx) => (
                                            <div key={idx} style={{ padding: '1.2rem', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{idx + 1}</span>
                                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{po}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dynamic Semester & Vertical Tables */}
                            {deptData.subjects && deptData.subjects.length > 0 && (
                                <div style={{ marginTop: '3rem' }}>
                                    {/* Group subjects by semester (excluding verticals and open electives) */}
                                    {Object.entries(
                                        deptData.subjects.filter(s => !s.vertical && !s.isOpenElective).reduce((acc, subj) => {
                                            const sem = subj.semester || 1;
                                            if (!acc[sem]) acc[sem] = [];
                                            acc[sem].push(subj);
                                            return acc;
                                        }, {})
                                    ).sort((a, b) => Number(a[0]) - Number(b[0])).map(([semesterNum, subjectsForSem]) => (
                                        <div key={`sem-${semesterNum}`} style={{ marginBottom: '3rem', width: '100%' }}>
                                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                                                SEMESTER {semesterNum}
                                            </h3>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
                                                <thead style={{ background: 'transparent' }}>
                                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '13%' }}>Course Code</th>
                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.5rem', color: 'var(--primary)', textAlign: 'left', verticalAlign: 'middle', width: '32%' }}>Course Title</th>
                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Category</th>
                                                        <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--primary)', textAlign: 'center', width: '10%' }}>Periods per Week</th>
                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>Total Contact Periods</th>
                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>Credit</th>
                                                        <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--primary)', textAlign: 'center', width: '15%' }}>Marks</th>
                                                    </tr>
                                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>L</th>
                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>T</th>
                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>P</th>
                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>CIA</th>
                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>ESE</th>
                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(
                                                        subjectsForSem.reduce((acc, subj) => {
                                                            let cat = subj.category || 'THEORY';
                                                            const cUpper = String(cat).toUpperCase().trim();
                                                            const typeUpper = String(subj.categoryType || '').toUpperCase().trim();
                                                            if (cUpper.includes('THEORY CUM') || cUpper.includes('INTEGRATED') || (Number(subj.l || 0) > 0 && Number(subj.p || 0) > 0 && !cUpper.includes('THEORY') && !cUpper.includes('PRACTICAL'))) cat = 'THEORY CUM PRACTICAL';
                                                            else if (cUpper.includes('PRACTICAL') || cUpper.includes('LAB') || cUpper === 'PR' || (typeUpper === 'PCC' && Number(subj.l || 0) === 0 && Number(subj.p || 0) > 0)) cat = 'PRACTICAL';
                                                            else if (cUpper.includes('EMPLOYABILITY') || cUpper.includes('EEC') || typeUpper === 'EEC') cat = 'EMPLOYABILITY ENHANCEMENT COURSE';
                                                            else if (cUpper.includes('MANDATORY') || cUpper.includes('MC') || typeUpper === 'MC') cat = 'MANDATORY COURSES';
                                                            else if (cUpper.includes('LANGUAGE') && (cUpper.includes('I') || cUpper.includes('1'))) cat = 'Language Elective – I';
                                                            else if (cUpper.includes('LANGUAGE') && (cUpper.includes('II') || cUpper.includes('2'))) cat = 'Language Elective - II';
                                                            else if (cUpper.includes('HONOR')) cat = 'Electives for Honors Degree';
                                                            else cat = 'THEORY';

                                                            if (!acc[cat]) acc[cat] = [];
                                                            acc[cat].push(subj);
                                                            return acc;
                                                        }, {})
                                                    ).map(([categoryName, categorySubjects], catIndex) => (
                                                        <React.Fragment key={catIndex}>
                                                            <tr>
                                                                <td colSpan="11" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', background: 'rgba(255,255,255,0.03)', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                                                    {categoryName === 'THEORY' ? 'THEORY COURSES' : categoryName === 'PRACTICAL' ? 'PRACTICAL COURSES' : categoryName === 'THEORY CUM PRACTICAL' ? 'THEORY CUM PRACTICAL COURSES' : categoryName === 'EMPLOYABILITY ENHANCEMENT COURSE' ? 'EMPLOYABILITY ENHANCEMENT COURSE' : categoryName === 'MANDATORY COURSES' ? 'MANDATORY COURSES' : categoryName}
                                                                </td>
                                                            </tr>
                                                            {sortSubjectsByCode(categorySubjects).map((subj, subjIdx) => {
                                                                const isInduction = (subj.title || subj.name || '').toUpperCase().includes('INDUCTION') || (subj.code || '').toUpperCase().includes('INDUCTION');
                                                                return (
                                                                    <tr key={subjIdx}>
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>{subj.code}</td>
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.5rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.categoryType}</td>
                                                                        {isInduction ? (
                                                                            <td colSpan={4} style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                                                                                2 WEEKS
                                                                            </td>
                                                                        ) : (
                                                                            <>
                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                            </>
                                                                        )}
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{isInduction ? 0 : subj.credits}</td>
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{isInduction ? '-' : subj.cia}</td>
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{isInduction ? '-' : subj.ese}</td>
                                                                        <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{isInduction ? '-' : subj.total}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}

                                    {/* Group subjects by vertical */}
                                    {(() => {
                                        const verticalsGrouped = deptData.subjects.filter(s => s.vertical).reduce((acc, subj) => {
                                            const vert = subj.vertical;
                                            if (!acc[vert]) acc[vert] = [];
                                            acc[vert].push(subj);
                                            return acc;
                                        }, {});
                                        const sortedVerticals = Object.keys(verticalsGrouped).sort((a, b) => Number(a) - Number(b));

                                        if (sortedVerticals.length === 0) return null;

                                        return (
                                            <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--bg-section)' }}>
                                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                    Professional Elective Courses
                                                </h3>
                                                <div style={{ width: '100%' }}>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
                                                        <thead style={{ background: 'transparent' }}>
                                                            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Course Code</th>
                                                                <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.5rem', color: 'var(--primary)', textAlign: 'left', verticalAlign: 'middle', width: '35%' }}>Course Title</th>
                                                                <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--primary)', textAlign: 'center', width: '10%' }}>Periods per Week</th>
                                                                <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>Total Contact Periods</th>
                                                                <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>Credit</th>
                                                                <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--primary)', textAlign: 'center', width: '15%' }}>Marks</th>
                                                            </tr>
                                                            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>L</th>
                                                                <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>T</th>
                                                                <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>P</th>
                                                                <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>CIA</th>
                                                                <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>ESE</th>
                                                                <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {sortedVerticals.map(vertNum => {
                                                                const subjectsForVert = sortSubjectsByCode(verticalsGrouped[vertNum] || []);
                                                                const verticalName = subjectsForVert.find(s => s.verticalName)?.verticalName || '';
                                                                const romanNum = getRomanNumeral(vertNum);

                                                                return (
                                                                    <React.Fragment key={`vert-${vertNum}`}>
                                                                        <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                                            <td colSpan="10" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.95rem' }}>
                                                                                Vertical {romanNum}: {verticalName}
                                                                            </td>
                                                                        </tr>
                                                                        {subjectsForVert.map((subj, subjIdx) => {
                                                                            return (
                                                                                <tr key={subjIdx}>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>{subj.code}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.5rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* Open Elective Courses */}
                                    {deptData.subjects.some(s => s.isOpenElective) && (
                                        <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--bg-section)' }}>
                                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                Open Elective Courses
                                            </h3>
                                            <div style={{ width: '100%' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-section)', border: '1px solid var(--glass-border)', fontSize: '0.85rem' }}>
                                                    <thead style={{ background: 'transparent' }}>
                                                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Course Code</th>
                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.5rem', color: 'var(--primary)', textAlign: 'left', verticalAlign: 'middle', width: '45%' }}>Course Title</th>
                                                            <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--primary)', textAlign: 'center', width: '10%' }}>Periods per Week</th>
                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>Total Contact Periods</th>
                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.4rem', color: 'var(--primary)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>Credit</th>
                                                            <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--primary)', textAlign: 'center', width: '15%' }}>Marks</th>
                                                        </tr>
                                                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>L</th>
                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>T</th>
                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>P</th>
                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>CIA</th>
                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>ESE</th>
                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-main)', textAlign: 'center' }}>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(() => {
                                                            const oecsGrouped = deptData.subjects.filter(s => s.isOpenElective).reduce((acc, subj) => {
                                                                const dept = (subj.offeringDept && subj.offeringDept !== 'Other Departments') ? subj.offeringDept : (deptData?.name || selectedDept || 'Biomedical Engineering');
                                                                if (!acc[dept]) acc[dept] = [];
                                                                acc[dept].push(subj);
                                                                return acc;
                                                            }, {});
                                                            const sortedOecDepts = Object.keys(oecsGrouped).sort();
                                                            return sortedOecDepts.map(deptName => {
                                                                const deptSubjects = sortSubjectsByCode(oecsGrouped[deptName] || []);
                                                                return (
                                                                    <React.Fragment key={`oec-dept-${deptName}`}>
                                                                        <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                                            <td colSpan={10} style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.95rem' }}>
                                                                                {deptName}
                                                                            </td>
                                                                        </tr>
                                                                        {deptSubjects.map((subj, idx) => {
                                                                            return (
                                                                                <tr key={idx}>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>{subj.code}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.5rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </React.Fragment>
                                                                );
                                                            });
                                                        })()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                    {deptData && deptData.subjects && renderCreditDistributionTable(deptData.subjects)}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 1. Dynmically Uploaded Documents Matching Filters */}
                    {matchingDocs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{
                                padding: '1.8rem',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                background: 'rgba(16, 185, 129, 0.03)',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981' }}>
                                <FaFilePdf size={24} />
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Official Syllabus & Curriculum Documents Found</h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                                {matchingDocs.map((doc, idx) => (
                                    <div
                                        key={doc._id || idx}
                                        style={{
                                            background: 'var(--bg-card)',
                                            padding: '1.25rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--glass-border)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            gap: '1rem'
                                        }}
                                    >
                                        <div>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{doc.title}</h4>
                                            {doc.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{doc.description}</p>}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            {doc.fileUrl && (
                                                <>
                                                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}>
                                                        <FaEye /> View PDF
                                                    </a>
                                                    <a href={doc.fileUrl} download className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <FaDownload /> Download
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 1.5. Interactive Subject Detailed Syllabus Explorer */}
                    {selectedSubject && (
                        <motion.div
                            ref={detailedViewerRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                border: '1px solid var(--primary)',
                                background: 'rgba(30, 27, 75, 0.4)',
                                borderRadius: '16px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(30px)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem',
                                marginTop: '1rem',
                                position: 'relative'
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedSubjectCode("all")}
                                style={{
                                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                                    background: 'rgba(255,255,255,0.05)', border: 'none',
                                    borderRadius: '50%', width: '36px', height: '36px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: 'var(--text-main)', transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                <FaTimes />
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <span style={{
                                    background: 'var(--primary)', color: '#fff', padding: '0.25rem 0.75rem',
                                    borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', width: 'fit-content'
                                }}>
                                    Detailed Subject Syllabus
                                </span>
                                <h2 className="text-gradient" style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>
                                    {selectedSubject.code}: {selectedSubject.title}
                                </h2>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Category</span>
                                        <strong style={{ fontSize: '0.95rem' }}>{selectedSubject.category}</strong>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Credits (L-T-P-C)</span>
                                        <strong style={{ fontSize: '0.95rem', fontFamily: 'monospace' }}>{selectedSubject.credits}</strong>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Type</span>
                                        <strong style={{ fontSize: '0.95rem', color: selectedSubject.type === 'Theory' ? '#3b82f6' : '#10b981' }}>{selectedSubject.type}</strong>
                                    </div>
                                </div>
                            </div>

                            <hr style={{ border: '0', height: '1px', background: 'var(--glass-border)', margin: '0' }} />

                            {/* Syllabus Units Accordion */}
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaBookOpen style={{ color: 'var(--primary)' }} />
                                    Course Outline & Syllabus Units
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {getDetailedSyllabusForSubject(selectedSubject.code, selectedSubject.title).map((unitObj, uIdx) => (
                                        <div
                                            key={uIdx}
                                            style={{
                                                background: 'rgba(255,255,255,0.02)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '10px',
                                                padding: '1.25rem'
                                            }}
                                        >
                                            <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                                                    Unit {uIdx + 1}
                                                </span>
                                                {unitObj.title}
                                            </h4>
                                            <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                {unitObj.topics.map((topic, tIdx) => (
                                                    <li key={tIdx} style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                                                        {topic}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Syllabus Actions */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaDownload /> Download Subject Syllabus PDF
                                </button>
                                <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)' }}>
                                    <FaEye /> View Study Materials
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* 2. Semester Wise Curriculum Explorer */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaBookOpen style={{ color: 'var(--primary)' }} />
                                    Course Modules Breakdown
                                </h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                    Showing semester curriculum for {activeDeptData ? activeDeptData.name : selectedDept} ({selectedReg})
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                {(!deptData || (!deptData.mission?.length && !deptData.vision?.length && !deptData.peo?.length)) && (
                                    <button
                                        onClick={() => {
                                            const activeDeptObj = staticDepartments.find(d => d.slug === selectedDept);
                                            exportCurriculumPDF({
                                                ...(deptData || {}),
                                                name: activeDeptObj ? activeDeptObj.name : 'Engineering Department',
                                                slug: selectedDept,
                                                subjects: (deptData && deptData.subjects && deptData.subjects.length > 0)
                                                    ? deptData.subjects
                                                    : flattenSemesters(syllabusBreakdown)
                                            }, academicLevel, selectedReg, instVisionMission);
                                        }}
                                        className="btn btn-primary"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '8px' }}
                                    >
                                        <FaFilePdf /> Export Official Curriculum PDF
                                    </button>
                                )}
                                {/* Search Subject Input */}
                                <div style={{ position: 'relative', minWidth: '260px' }}>
                                    <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="Search subject code or name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--glass-border)',
                                            background: 'var(--bg-card)',
                                            color: 'var(--text-main)',
                                            outline: 'none',
                                            fontSize: '0.9rem',
                                            width: '100%'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Interactive Semester Breakdown list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {syllabusBreakdown.map((semData) => {
                                const isExpanded = activeSemester === semData.semester;

                                // Apply semester dropdown filter
                                if (selectedSemester !== "all" && semData.semester !== parseInt(selectedSemester)) {
                                    return null;
                                }

                                // Filter courses inside semester based on search query AND selected subject
                                const filteredCourses = semData.courses.filter(course => {
                                    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        course.code.toLowerCase().includes(searchQuery.toLowerCase());
                                    const matchesSubject = selectedSubjectCode === "all" || course.code === selectedSubjectCode;
                                    return matchesSearch && matchesSubject;
                                });

                                // If a search query is active and this semester has no matches, skip showing it
                                if ((searchQuery || selectedSubjectCode !== "all") && filteredCourses.length === 0) return null;

                                return (
                                    <div
                                        key={semData.semester}
                                        className="glass-card"
                                        style={{
                                            padding: 0,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: isExpanded ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                                            transition: 'border 0.3s ease'
                                        }}
                                    >
                                        {/* Accordion Trigger Header */}
                                        <div
                                            onClick={() => setActiveSemester(isExpanded ? null : semData.semester)}
                                            style={{
                                                padding: '1.25rem 1.5rem',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                background: isExpanded ? 'rgba(45, 44, 122, 0.05)' : 'transparent',
                                                transition: 'background 0.3s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    background: isExpanded ? 'var(--primary)' : 'var(--bg-section)',
                                                    color: isExpanded ? '#fff' : 'var(--text-main)',
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.3s ease'
                                                }}>
                                                    {semData.semester}
                                                </div>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                                                    Semester {semData.semester}
                                                </h3>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                    ({filteredCourses.length} {filteredCourses.length === 1 ? 'subject' : 'subjects'})
                                                </span>
                                            </div>
                                            <div>
                                                {isExpanded ? <FaChevronUp style={{ color: 'var(--primary)' }} /> : <FaChevronDown />}
                                            </div>
                                        </div>

                                        {/* Accordion Content */}
                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', overflowX: 'auto' }}>
                                                        {filteredCourses.length > 0 ? (
                                                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                                                <thead style={{ background: 'transparent' }}>
                                                                    <tr style={{ borderBottom: '2px solid var(--glass-border)', textAlign: 'left' }}>
                                                                        <th style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem' }}>Subject Code</th>
                                                                        <th style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem' }}>Subject Title</th>
                                                                        <th style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem' }}>Category</th>
                                                                        <th style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'center' }}>L-T-P-C</th>
                                                                        <th style={{ padding: '0.75rem 1rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'center' }}>Type</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {filteredCourses.map((course, cIdx) => (
                                                                        <tr
                                                                            key={course.code || cIdx}
                                                                            onClick={() => {
                                                                                setSelectedSemester(semData.semester.toString());
                                                                                setSelectedSubjectCode(course.code);
                                                                                setActiveSemester(semData.semester);
                                                                                setTimeout(() => {
                                                                                    detailedViewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                                }, 100);
                                                                            }}
                                                                            style={{
                                                                                borderBottom: '1px solid var(--glass-border)',
                                                                                cursor: 'pointer',
                                                                                background: selectedSubjectCode === course.code ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                                                                                transition: 'background 0.3s'
                                                                            }}
                                                                            className="subject-row-clickable"
                                                                        >
                                                                            <td style={{ padding: '1rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'var(--text-main)' }}>{course.code}</td>
                                                                            <td style={{ padding: '1rem', fontWeight: '500' }}>{course.title}</td>
                                                                            <td style={{ padding: '1rem' }}>
                                                                                <span style={{
                                                                                    background: 'var(--bg-section)',
                                                                                    border: '1px solid var(--glass-border)',
                                                                                    padding: '0.2rem 0.5rem',
                                                                                    borderRadius: '4px',
                                                                                    fontSize: '0.75rem',
                                                                                    color: 'var(--text-muted)'
                                                                                }}>
                                                                                    {course.category}
                                                                                </span>
                                                                            </td>
                                                                            <td style={{ padding: '1rem', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.9rem' }}>{course.credits}</td>
                                                                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                                                <span style={{
                                                                                    background: course.type === 'Theory' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                                                    color: course.type === 'Theory' ? '#3b82f6' : '#10b981',
                                                                                    padding: '0.2rem 0.5rem',
                                                                                    borderRadius: '12px',
                                                                                    fontSize: '0.75rem',
                                                                                    fontWeight: 'bold'
                                                                                }}>
                                                                                    {course.type}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        ) : (
                                                            // Display fallback detail if no structured course list found
                                                            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                                                <FaGraduationCap size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                                                                <h4 style={{ marginBottom: '0.5rem' }}>Detailed course structure is being updated</h4>
                                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
                                                                    We are currently mapping the individual course modules for this semester. You can download or view the official syllabus document above if uploaded, or reach the admin block for immediate details.
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                            {(!deptData || !deptData.subjects || deptData.subjects.length === 0) && renderCreditDistributionTable(flattenSemesters(syllabusBreakdown))}
                        </div>
                    </div>

                </div>
            </section>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default SyllabusPage;
