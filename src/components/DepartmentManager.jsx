import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaFilePdf, FaBook } from 'react-icons/fa';
import { departments as staticDepartments } from '../data/departmentsData';
import { getDetailedSyllabusForSubject } from '../data/syllabusData';
import collegeLogo from '../assets/EASA College Logo.jpg';
import API_BASE_URL from '../api';

const getRomanNumeral = (num) => {
    const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return roman[Number(num)] || num;
};

const renderPieChart = (categories, rowTotals, grandTotal) => {
    const colors = {
        'HSMC': '#6366f1', // Indigo
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

    const categories = ['HSMC', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC'];
    const categoryLabels = {
        'HSMC': 'Humanities and Social Sciences including Management Courses (HSMC)',
        'BSC': 'Basic Science Courses (BSC)',
        'ESC': 'Engineering Science Courses (ESC)',
        'PCC': 'Professional Core Courses (PCC)',
        'PEC': 'Professional Elective Courses (PEC)',
        'OEC': 'Open Elective Courses (OEC)',
        'EEC': 'Employability Enhancement Courses (EEC)',
        'MC': 'Mandatory Courses (Non-Credit) (MC)'
    };

    const distribution = {};
    categories.forEach(cat => {
        distribution[cat] = Array(8).fill(0);
    });

    subjects.forEach(subj => {
        let cat = 'PCC';
        if (subj.isOpenElective) {
            cat = 'OEC';
        } else if (subj.vertical) {
            cat = 'PEC';
        } else {
            const rawCat = (subj.categoryType || '').toUpperCase().trim();
            if (rawCat === 'HS' || rawCat === 'HSMC') cat = 'HSMC';
            else if (rawCat === 'BS' || rawCat === 'BSC') cat = 'BSC';
            else if (rawCat === 'ES' || rawCat === 'ESC') cat = 'ESC';
            else if (rawCat === 'PC' || rawCat === 'PCC') cat = 'PCC';
            else if (rawCat === 'PE' || rawCat === 'PEC') cat = 'PEC';
            else if (rawCat === 'OE' || rawCat === 'OEC') cat = 'OEC';
            else if (rawCat === 'EE' || rawCat === 'EEC') cat = 'EEC';
            else if (rawCat === 'MC') cat = 'MC';
            else cat = 'PCC';
        }

        const credits = Number(subj.credits) || 0;

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
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '5%' }}>S.No</th>
                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '35%' }}>SUBJECT AREA</th>
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
                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{idx + 1}</td>
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
                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem' }}></td>
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

const getCreditDistributionHTML = (subjects, pageTracker, bosMeetingDate, acMeetingDate) => {
    const pageNum = ++pageTracker.current;
    const categories = ['HSMC', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC'];
    const categoryLabels = {
        'HSMC': 'Humanities and Social Sciences including Management Courses (HSMC)',
        'BSC': 'Basic Science Courses (BSC)',
        'ESC': 'Engineering Science Courses (ESC)',
        'PCC': 'Professional Core Courses (PCC)',
        'PEC': 'Professional Elective Courses (PEC)',
        'OEC': 'Open Elective Courses (OEC)',
        'EEC': 'Employability Enhancement Courses (EEC)',
        'MC': 'Mandatory Courses (Non-Credit) (MC)'
    };

    const distribution = {};
    categories.forEach(cat => {
        distribution[cat] = Array(8).fill(0);
    });

    subjects.forEach(subj => {
        let cat = 'PCC';
        if (subj.isOpenElective) {
            cat = 'OEC';
        } else if (subj.vertical) {
            cat = 'PEC';
        } else {
            const rawCat = (subj.categoryType || '').toUpperCase().trim();
            if (rawCat === 'HS' || rawCat === 'HSMC') cat = 'HSMC';
            else if (rawCat === 'BS' || rawCat === 'BSC') cat = 'BSC';
            else if (rawCat === 'ES' || rawCat === 'ESC') cat = 'ESC';
            else if (rawCat === 'PC' || rawCat === 'PCC') cat = 'PCC';
            else if (rawCat === 'PE' || rawCat === 'PEC') cat = 'PEC';
            else if (rawCat === 'OE' || rawCat === 'OEC') cat = 'OEC';
            else if (rawCat === 'EE' || rawCat === 'EEC') cat = 'EEC';
            else if (rawCat === 'MC') cat = 'MC';
            else cat = 'PCC';
        }

        const credits = Number(subj.credits) || 0;

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
        'HSMC': '#4f46e5',
        'BSC': '#2563eb',
        'ESC': '#059669',
        'PCC': '#d97706',
        'PEC': '#db2777',
        'OEC': '#7c3aed',
        'EEC': '#0891b2',
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

    const svgPieChartHTML = grandTotal > 0 ? `
        <div style="margin-top: 25px; display: flex; justify-content: center; align-items: center; gap: 40px; font-family: 'Times New Roman', Times, serif;">
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
        <div class="page" style="page-break-before: always;">
            <div class="pdf-header">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">Summary of Credit Distribution</div>
            </div>
            
            <div class="title-block" style="margin-top: 15px; margin-bottom: 20px;">
                <h1 style="font-size: 12pt; text-align: center; text-decoration: underline;">SUMMARY OF CREDIT DISTRIBUTION</h1>
            </div>

            <table class="curriculum-table">
                <thead>
                    <tr>
                        <th rowSpan="2" style="width: 6%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">S.No</th>
                        <th rowSpan="2" style="width: 44%; font-size: 8pt; font-family: Arial, sans-serif; text-align: left; vertical-align: middle;">Subject Area</th>
                        <th colSpan="8" style="font-size: 8pt; font-family: Arial, sans-serif; text-align: center; padding: 3px;">Credits per Semester</th>
                        <th rowSpan="2" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credits Total</th>
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
                                <td class="center" style="font-family: Arial, sans-serif;">${idx + 1}</td>
                                <td style="font-weight: bold; font-family: Arial, sans-serif;">${categoryLabels[cat]}</td>
                                ${distribution[cat].map(val => `<td class="center">${val > 0 ? val : '-'}</td>`).join('')}
                                <td class="center" style="font-weight: bold; font-family: Arial, sans-serif;">${isMC ? 'No Credits' : total}</td>
                                <td class="center" style="font-family: Arial, sans-serif;">${isMC ? '-' : `${percentage}%`}</td>
                            </tr>
                        `;
                    }).join('')}
                    <tr style="font-weight: bold; background-color: rgba(0, 0, 0, 0.02);">
                        <td></td>
                        <td style="font-family: Arial, sans-serif;">Total</td>
                        ${semTotals.map(total => `<td class="center">${total}</td>`).join('')}
                        <td class="center" style="font-family: Arial, sans-serif;">${grandTotal}</td>
                        <td class="center" style="font-family: Arial, sans-serif;">100%</td>
                    </tr>
                </tbody>
            </table>

            ${svgPieChartHTML}
            <div class="pdf-footer" style="position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 9pt; font-family: Arial, sans-serif; font-style: italic; color: #000;">
                <div class="footer-left" style="text-align: left;">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center" style="position: absolute; left: 50%; transform: translateX(-50%); text-align: center; font-style: normal; font-weight: bold;">${pageNum}</div>
                <div class="footer-right" style="text-align: right;">Approved in Academic Council Meeting on ${acMeetingDate}</div>
            </div>
        </div>
    `;
};

const getDetailedSyllabiHTML = (subjects, regYear, pageTracker, bosMeetingDate, acMeetingDate, poList, psoList) => {
    if (!subjects || subjects.length === 0) return '';

    return subjects.map(subj => {
        const categoryName = subj.categoryName || getDefaultCategoryName(subj.categoryType);
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

        const textbooks = (subj.textbooks && subj.textbooks.length > 0)
            ? subj.textbooks
            : ['Textbook of ' + (subj.title || 'Course') + ' - First Edition'];

        const references = (subj.references && subj.references.length > 0)
            ? subj.references
            : ['Reference Book of ' + (subj.title || 'Course') + ' - Second Edition'];
        const webReferences = (subj.webReferences && subj.webReferences.length > 0)
            ? subj.webReferences
            : [];

        const experiments = subj.experiments || [];

        const coPoMapping = (subj.coPoMapping && subj.coPoMapping.length === 5)
            ? subj.coPoMapping
            : [1, 2, 3, 4, 5].map(num => {
                const mapObj = { coNo: `CO ${num}` };
                for (let i = 1; i <= 12; i++) {
                    mapObj[`po${i}`] = '-';
                }
                for (let i = 1; i <= 3; i++) {
                    mapObj[`pso${i}`] = '-';
                }
                return mapObj;
            });

        const poCount = (poList && poList.length > 0) ? poList.length : 11;
        const psoCount = (psoList && psoList.length > 0) ? psoList.length : 2;

        const lValue = subj.l !== undefined ? subj.l : 0;
        const tValue = subj.t !== undefined ? subj.t : 0;
        const pValue = subj.p !== undefined ? subj.p : 0;
        const cValue = subj.credits !== undefined ? subj.credits : 0;

        const pageNum1 = ++pageTracker.current;
        const pageNum2 = ++pageTracker.current;

        // Subject Type Checks
        const categoryUpper = (subj.category || '').toUpperCase();
        const isPractical = categoryUpper.includes('PRACTICAL') || categoryUpper.includes('LAB');
        const isTheory = categoryUpper.includes('THEORY');
        const isPurePractical = isPractical && !isTheory;
        const isTheoryCumPractical = isPractical && isTheory;

        // Experiments Split for Pure Practical
        const halfIndex = Math.ceil(experiments.length / 2);
        const firstHalfExperiments = experiments.slice(0, halfIndex);
        const secondHalfExperiments = experiments.slice(halfIndex);

        // Helper to render experiments table
        const renderExperimentsTableHTML = (expList, title = "List of Exercises") => {
            if (!expList || expList.length === 0) return '';
            return `
                <div style="margin-top: 10px; margin-bottom: 10px; page-break-inside: avoid;">
                    <h4 style="font-size: 10pt; font-weight: bold; font-family: Arial, sans-serif; border-bottom: 1px solid #ddd; padding-bottom: 2px; margin: 0 0 5px 0; text-transform: uppercase;">${title}</h4>
                    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8.5pt; text-align: center;">
                        <thead>
                            <tr style="font-weight: bold; font-family: Arial, sans-serif; background-color: #f2f2f2;">
                                <th style="border: 1.5px solid #000; padding: 4px; width: 8%;">S.No.</th>
                                <th style="border: 1.5px solid #000; padding: 4px; width: 67%; text-align: left;">List of Exercises</th>
                                <th style="border: 1.5px solid #000; padding: 4px; width: 10%;">CO</th>
                                <th style="border: 1.5px solid #000; padding: 4px; width: 15%;">RBT Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${expList.map(exp => `
                                <tr>
                                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center;">${exp.sNo || ''}</td>
                                    <td style="border: 1.5px solid #000; padding: 3px; text-align: left; padding-left: 6px;">${exp.name || ''}</td>
                                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center;">${exp.co || ''}</td>
                                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center;">${exp.rbtLevel || 'Apply'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        };

        return `
        <!-- PAGE A: Syllabus Part 1 -->
        <div class="page" style="page-break-before: always; font-family: 'Times New Roman', Times, serif; font-size: 9.5pt; line-height: 1.35; padding-top: 25px; padding-bottom: 25px;">
            <div class="pdf-header" style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1.5px solid #000; padding-bottom: 5px; margin-bottom: 15px; font-size: 9.5pt; font-weight: bold; font-family: Arial, sans-serif; font-style: italic;">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">B.E/B.Tech Programmes (${regYear})</div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 5px; margin-bottom: 10px; font-size: 9.5pt; border: 1.5px solid #000;">
                <tr>
                    <td rowspan="2" style="width: 18%; border: 1.5px solid #000; padding: 6px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 10pt;">
                        ${subj.code || ''}
                    </td>
                    <td rowspan="2" style="width: 58%; border: 1.5px solid #000; padding: 6px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 10pt; text-transform: uppercase;">
                        ${subj.title || ''}
                        ${subtitleStr}
                    </td>
                    <td style="width: 6%; border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">L</td>
                    <td style="width: 6%; border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">T</td>
                    <td style="width: 6%; border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">P</td>
                    <td style="width: 6%; border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">C</td>
                </tr>
                <tr>
                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">${lValue}</td>
                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">${tValue}</td>
                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">${pValue}</td>
                    <td style="border: 1.5px solid #000; padding: 3px; text-align: center; font-weight: bold;">${cValue}</td>
                </tr>
                <tr>
                    <td style="border: 1.5px solid #000; padding: 5px; font-weight: bold;">Category</td>
                    <td colspan="5" style="border: 1.5px solid #000; padding: 5px;">${categoryName}</td>
                </tr>
                <tr>
                    <td style="border: 1.5px solid #000; padding: 5px; font-weight: bold;">Pre requisites</td>
                    <td colspan="5" style="border: 1.5px solid #000; padding: 5px; text-align: justify;">${prerequisites}</td>
                </tr>
            </table>

            <div class="section-container" style="margin-bottom: 12px;">
                <h3 style="font-size: 10.5pt; font-weight: bold; margin: 0 0 3px 0; font-family: Arial, sans-serif; text-transform: uppercase;">Course Objectives</h3>
                <p style="font-size: 9.5pt; margin: 0 0 5px 0;">The course is intended to make the students to</p>
                <ol style="margin: 0; padding-left: 20px;">
                    ${objectives.map(obj => obj.trim() ? `<li style="margin-bottom: 3px; font-size: 9.5pt; text-align: justify;">${obj}</li>` : '').join('')}
                </ol>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 9.5pt; border: 1.5px solid #000;">
                <thead>
                    <tr>
                        <th colspan="3" style="border: 1.5px solid #000; padding: 4px; text-align: center; font-weight: bold; font-family: Arial, sans-serif; text-transform: uppercase; font-size: 10pt;">Course Outcomes</th>
                    </tr>
                    <tr>
                        <th colspan="3" style="border: 1.5px solid #000; padding: 4px; text-align: left; font-weight: normal; font-size: 9.5pt;">On successful completion of the course, students will be able</th>
                    </tr>
                    <tr style="font-family: Arial, sans-serif; font-size: 9pt; font-weight: bold; text-align: center;">
                        <th style="width: 12%; border: 1.5px solid #000; padding: 4px;">CO. No</th>
                        <th style="width: 73%; border: 1.5px solid #000; padding: 4px; text-align: left;">Course Outcome</th>
                        <th style="width: 15%; border: 1.5px solid #000; padding: 4px;">RBT Level</th>
                    </tr>
                </thead>
                <tbody>
                    ${outcomes.map(co => co.outcome.trim() ? `
                        <tr>
                            <td style="border: 1.5px solid #000; padding: 4px; text-align: center; font-weight: bold;">${co.coNo}</td>
                            <td style="border: 1.5px solid #000; padding: 4px; text-align: justify;">${co.outcome}</td>
                            <td style="border: 1.5px solid #000; padding: 4px; text-align: center;">${co.rbtLevel || 'Apply'}</td>
                        </tr>
                    ` : '').join('')}
                </tbody>
            </table>

            <div style="margin-top: 15px; margin-bottom: 12px;">
                ${isPurePractical 
                    ? renderExperimentsTableHTML(firstHalfExperiments, "List of Exercises (Part I)")
                    : units.slice(0, 2).map((unit, uIdx) => {
                        const unitNo = unit.unitNo || `UNIT ${['I', 'II', 'III', 'IV', 'V'][uIdx] || (uIdx + 1)}`;
                        const unitTitle = unit.title ? unit.title.toUpperCase() : '';
                        const topicsStr = Array.isArray(unit.topics) ? unit.topics.filter(t => t.trim() !== '').join(', ') : (unit.topics || '');
                        
                        return topicsStr ? `
                            <div style="margin-bottom: 8px; text-align: justify; font-size: 9.5pt; line-height: 1.35;">
                                <div style="display: flex; justify-content: space-between; font-weight: bold; font-family: Arial, sans-serif; font-size: 9.5pt; margin-bottom: 2px;">
                                    <span>${unitNo.toUpperCase()}: ${unitTitle}</span>
                                    <span>9 Periods</span>
                                </div>
                                <span style="font-family: 'Times New Roman', Times, serif;">${topicsStr}</span>
                            </div>
                        ` : '';
                    }).join('')
                }
            </div>

            <div class="pdf-footer" style="position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 9pt; font-family: Arial, sans-serif; font-style: italic; color: #000;">
                <div class="footer-left" style="text-align: left;">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center" style="position: absolute; left: 50%; transform: translateX(-50%); text-align: center; font-style: normal; font-weight: bold;">${pageNum1}</div>
                <div class="footer-right" style="text-align: right;">Approved in Academic Council Meeting on ${acMeetingDate}</div>
            </div>
        </div>

        <!-- PAGE B: Syllabus Part 2 -->
        <div class="page" style="page-break-before: always; font-family: 'Times New Roman', Times, serif; font-size: 9.5pt; line-height: 1.35; padding-top: 25px; padding-bottom: 25px;">
            <div class="pdf-header" style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1.5px solid #000; padding-bottom: 5px; margin-bottom: 15px; font-size: 9.5pt; font-weight: bold; font-family: Arial, sans-serif; font-style: italic;">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">B.E/B.Tech Programmes (${regYear})</div>
            </div>

            <div style="margin-top: 10px; margin-bottom: 12px;">
                ${isPurePractical 
                    ? renderExperimentsTableHTML(secondHalfExperiments, "List of Exercises (Part II)")
                    : units.slice(2).map((unit, uIdx) => {
                        const actualIdx = uIdx + 2;
                        const unitNo = unit.unitNo || `UNIT ${['I', 'II', 'III', 'IV', 'V'][actualIdx] || (actualIdx + 1)}`;
                        const unitTitle = unit.title ? unit.title.toUpperCase() : '';
                        const topicsStr = Array.isArray(unit.topics) ? unit.topics.filter(t => t.trim() !== '').join(', ') : (unit.topics || '');
                        
                        return topicsStr ? `
                            <div style="margin-bottom: 8px; text-align: justify; font-size: 9.5pt; line-height: 1.35;">
                                <div style="display: flex; justify-content: space-between; font-weight: bold; font-family: Arial, sans-serif; font-size: 9.5pt; margin-bottom: 2px;">
                                    <span>${unitNo.toUpperCase()}: ${unitTitle}</span>
                                    <span>9 Periods</span>
                                </div>
                                <span style="font-family: 'Times New Roman', Times, serif;">${topicsStr}</span>
                            </div>
                        ` : '';
                    }).join('')
                }
            </div>

            ${textbooks.some(t => t.trim() !== '') ? `
            <div style="margin-top: 15px; margin-bottom: 8px;">
                <h4 style="font-size: 10pt; font-weight: bold; font-family: Arial, sans-serif; border-bottom: 1px solid #ddd; padding-bottom: 2px; margin: 0 0 5px 0; text-transform: uppercase;">Text Books</h4>
                <ol style="margin: 0; padding-left: 20px; font-size: 9pt;">
                    ${textbooks.map(tb => tb.trim() ? `<li style="margin-bottom: 3px; text-align: justify; line-height: 1.35;">${tb}</li>` : '').join('')}
                </ol>
            </div>
            ` : ''}

            ${references.some(r => r.trim() !== '') ? `
            <div style="margin-bottom: 10px;">
                <h4 style="font-size: 10pt; font-weight: bold; font-family: Arial, sans-serif; border-bottom: 1px solid #ddd; padding-bottom: 2px; margin: 0 0 5px 0; text-transform: uppercase;">References</h4>
                <ol style="margin: 0; padding-left: 20px; font-size: 9pt;">
                    ${references.map(ref => ref.trim() ? `<li style="margin-bottom: 3px; text-align: justify; line-height: 1.35;">${ref}</li>` : '').join('')}
                </ol>
            </div>
            ` : ''}

            ${webReferences.some(w => w.trim() !== '') ? `
            <div style="margin-bottom: 10px;">
                <h4 style="font-size: 10pt; font-weight: bold; font-family: Arial, sans-serif; border-bottom: 1px solid #ddd; padding-bottom: 2px; margin: 0 0 5px 0; text-transform: uppercase;">Additional / Web References</h4>
                <ol style="margin: 0; padding-left: 20px; font-size: 9pt;">
                    ${webReferences.map(web => web.trim() ? `<li style="margin-bottom: 3px; text-align: justify; line-height: 1.35;"><a href="${web}" target="_blank" style="color: #0000EE; text-decoration: underline;">${web}</a></li>` : '').join('')}
                </ol>
            </div>
            ` : ''}

            ${isTheoryCumPractical ? renderExperimentsTableHTML(experiments, "List of Exercises") : ''}

            <!-- CO-PO Mapping Table (Relocated from Page C) -->
            <div style="margin-top: 15px; page-break-inside: avoid;">
                <h4 style="font-size: 10pt; font-weight: bold; text-align: center; margin: 0 0 8px 0; font-family: Arial, sans-serif; text-transform: uppercase;">
                    Mapping of Course Outcomes (COs) with Programme Outcomes (POs) Programme Specific Outcomes (PSOs)
                </h4>
                
                <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8.5pt; text-align: center;">
                    <thead>
                        <tr style="font-weight: bold; font-family: Arial, sans-serif; background-color: #f2f2f2;">
                            <th rowspan="2" style="border: 1.5px solid #000; padding: 4px; width: 12%;">COs</th>
                            <th colspan="${poCount}" style="border: 1.5px solid #000; padding: 2px;">POs</th>
                            <th colspan="${psoCount}" style="border: 1.5px solid #000; padding: 2px;">PSOs</th>
                        </tr>
                        <tr style="font-weight: bold; font-family: Arial, sans-serif; background-color: #f2f2f2;">
                            ${Array.from({ length: poCount }).map((_, i) => `<th style="border: 1.5px solid #000; padding: 2px;">${i + 1}</th>`).join('')}
                            ${Array.from({ length: psoCount }).map((_, i) => `<th style="border: 1.5px solid #000; padding: 2px;">${i + 1}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${coPoMapping.map(row => {
                            return `
                            <tr>
                                <td style="border: 1.5px solid #000; padding: 4px; font-weight: bold;">${row.coNo}</td>
                                ${Array.from({ length: poCount }).map((_, i) => {
                                    const val = row[`po${i + 1}`] || '-';
                                    return `<td style="border: 1.5px solid #000; padding: 4px;">${val}</td>`;
                                }).join('')}
                                ${Array.from({ length: psoCount }).map((_, i) => {
                                    const val = row[`pso${i + 1}`] || '-';
                                    return `<td style="border: 1.5px solid #000; padding: 4px;">${val}</td>`;
                                }).join('')}
                            </tr>
                            `;
                        }).join('')}
                        <!-- Average row -->
                        <tr style="font-weight: bold; background-color: #f9f9f9;">
                            <td style="border: 1.5px solid #000; padding: 4px;">Average</td>
                            ${Array.from({ length: poCount }).map((_, i) => {
                                const key = `po${i + 1}`;
                                const values = coPoMapping.map(row => row[key]).filter(v => v && v !== '-').map(Number);
                                const avg = values.length > 0 ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1).replace('.0', '') : '-';
                                return `<td style="border: 1.5px solid #000; padding: 4px;">${avg}</td>`;
                            }).join('')}
                            ${Array.from({ length: psoCount }).map((_, i) => {
                                const key = `pso${i + 1}`;
                                const values = coPoMapping.map(row => row[key]).filter(v => v && v !== '-').map(Number);
                                const avg = values.length > 0 ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1).replace('.0', '') : '-';
                                return `<td style="border: 1.5px solid #000; padding: 4px;">${avg}</td>`;
                            }).join('')}
                        </tr>
                    </tbody>
                </table>
                <div style="font-size: 7.5pt; font-style: italic; display: flex; justify-content: space-between; margin-top: 4px; font-family: Arial, sans-serif;">
                    <span>3 - High</span>
                    <span>2 - Medium</span>
                    <span>1 - Low</span>
                    <span>"-" - No Correlation</span>
                </div>
            </div>

            <!-- Assessment Components Table (Relocated from Page C) -->
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8pt; margin-top: 15px; text-align: center; page-break-inside: avoid;">
                <thead>
                    <tr style="font-weight: bold; font-family: Arial, sans-serif; background-color: #f2f2f2;">
                        <th style="border: 1.5px solid #000; padding: 4px; width: 30%;">Assessment Components</th>
                        <th style="border: 1.5px solid #000; padding: 4px; width: 12%;">Duration</th>
                        <th style="border: 1.5px solid #000; padding: 4px; width: 14%;">Syllabus to be covered</th>
                        <th style="border: 1.5px solid #000; padding: 4px; width: 10%;">Max. Marks</th>
                        <th style="border: 1.5px solid #000; padding: 4px; width: 12%;">Weightage for Internal Marks</th>
                        <th style="border: 1.5px solid #000; padding: 4px; width: 12%;">Continuous Internal Assessment Marks</th>
                        <th style="border: 1.5px solid #000; padding: 4px; width: 10%;">End Semester Examination Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 4px; text-align: left; font-weight: bold;">CIAT I</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">3 hours</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">2.5 units</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">12</td>
                        <td rowspan="2" style="border: 1.5px solid #000; padding: 4px; vertical-align: middle; font-weight: bold;">24</td>
                        <td rowspan="3" style="border: 1.5px solid #000; padding: 4px; vertical-align: middle; font-weight: bold;">60</td>
                    </tr>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 4px; text-align: left; font-weight: bold;">CIAT II</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">3 hours</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">2.5 units</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">100</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">12</td>
                    </tr>
                    <tr>
                        <td colspan="5" style="border: 1.5px solid #000; padding: 4px; text-align: left; font-size: 7.5pt; line-height: 1.25;">
                            Objective Test/Online Quiz, Assignment / Case study/ Seminar/Tutorial, Role Play, Poster Presentation, Group Discussions, Oral Presentation, Mini Project etc., (8 marks during CIAT I and 8 marks during CIAT II)
                        </td>
                        <td style="border: 1.5px solid #000; padding: 4px; font-weight: bold;">16</td>
                    </tr>
                    <tr style="font-weight: bold; background-color: #f9f9f9;">
                        <td colspan="5" style="border: 1.5px solid #000; padding: 4px; text-align: right;">Total</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">40</td>
                        <td style="border: 1.5px solid #000; padding: 4px;">60</td>
                    </tr>
                </tbody>
            </table>

            <div class="pdf-footer" style="position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-between; font-size: 9pt; font-family: Arial, sans-serif; font-style: italic; color: #000;">
                <div class="footer-left" style="text-align: left;">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center" style="position: absolute; left: 50%; transform: translateX(-50%); text-align: center; font-style: normal; font-weight: bold;">${pageNum2}</div>
                <div class="footer-right" style="text-align: right;">Approved in Academic Council Meeting on ${acMeetingDate}</div>
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

    let degreePrefix = "B.E.";
    if (academicLevel === "PG") {
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
        <div class="pdf-header">
            <div class="left-col">EASA College of Engineering and Technology</div>
            <div class="right-col">${degreePrefix} ${deptName} (${regYear})</div>
        </div>
    `;

    const bosMeetingDate = deptData.bosMeetingDate || "29.10.2024";
    const acMeetingDate = deptData.acMeetingDate || "25.11.2024";

    // Helper to generate page footer
    const getFooterHTML = (pageNum) => `
        <div class="pdf-footer">
            <div class="footer-left">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
            <div class="footer-center">${pageNum}</div>
            <div class="footer-right">Approved in Academic Council Meeting on ${acMeetingDate}</div>
        </div>
    `;

    // Helper to render semester table HTML
    const renderSemesterTableHTML = (semNum) => {
        const subjectsForSem = semestersGrouped[semNum] || [];
        if (subjectsForSem.length === 0) return '';

        const theoryCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('THEORY') && !s.category?.toUpperCase().includes('PRACTICAL'));
        const practicalCourses = subjectsForSem.filter(s => (s.category?.toUpperCase().includes('PRACTICAL') && !s.category?.toUpperCase().includes('THEORY')) || s.category?.toUpperCase().includes('LAB'));
        const theoryCumPracticalCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('THEORY') && s.category?.toUpperCase().includes('PRACTICAL'));
        const otherCourses = subjectsForSem.filter(s => !theoryCourses.includes(s) && !practicalCourses.includes(s) && !theoryCumPracticalCourses.includes(s));

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
                            <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif;">C</th>
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
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt;">Theory Course(s)</td>
                            </tr>
                            ${theoryCourses.map(s => `
                                <tr>
                                    <td class="center" style="font-family: monospace; font-weight: bold;">${s.code}</td>
                                    <td>${s.title}</td>
                                    <td class="center" style="font-family: Arial, sans-serif;">${s.categoryType || 'HS'}</td>
                                    <td class="center">${s.l}</td>
                                    <td class="center">${s.t}</td>
                                    <td class="center">${s.p}</td>
                                    <td class="center">${s.contactPeriods}</td>
                                    <td class="center" style="font-weight: bold;">${s.credits}</td>
                                    <td class="center">${s.cia}</td>
                                    <td class="center">${s.ese}</td>
                                    <td class="center">${s.total}</td>
                                </tr>
                            `).join('')}
                        ` : ''}

                        ${theoryCumPracticalCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt;">Theory cum Practical Course(s)</td>
                            </tr>
                            ${theoryCumPracticalCourses.map(s => `
                                <tr>
                                    <td class="center" style="font-family: monospace; font-weight: bold;">${s.code}</td>
                                    <td>${s.title}</td>
                                    <td class="center" style="font-family: Arial, sans-serif;">${s.categoryType || 'PC'}</td>
                                    <td class="center">${s.l}</td>
                                    <td class="center">${s.t}</td>
                                    <td class="center">${s.p}</td>
                                    <td class="center">${s.contactPeriods}</td>
                                    <td class="center" style="font-weight: bold;">${s.credits}</td>
                                    <td class="center">${s.cia}</td>
                                    <td class="center">${s.ese}</td>
                                    <td class="center">${s.total}</td>
                                </tr>
                            `).join('')}
                        ` : ''}
                        
                        ${practicalCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt;">Practical Course(s)</td>
                            </tr>
                            ${practicalCourses.map(s => `
                                <tr>
                                    <td class="center" style="font-family: monospace; font-weight: bold;">${s.code}</td>
                                    <td>${s.title}</td>
                                    <td class="center" style="font-family: Arial, sans-serif;">${s.categoryType || 'EEC'}</td>
                                    <td class="center">${s.l}</td>
                                    <td class="center">${s.t}</td>
                                    <td class="center">${s.p}</td>
                                    <td class="center">${s.contactPeriods}</td>
                                    <td class="center" style="font-weight: bold;">${s.credits}</td>
                                    <td class="center">${s.cia}</td>
                                    <td class="center">${s.ese}</td>
                                    <td class="center">${s.total}</td>
                                </tr>
                            `).join('')}
                        ` : ''}

                        ${otherCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt;">Other Course(s)</td>
                            </tr>
                            ${otherCourses.map(s => `
                                <tr>
                                    <td class="center" style="font-family: monospace; font-weight: bold;">${s.code}</td>
                                    <td>${s.title}</td>
                                    <td class="center" style="font-family: Arial, sans-serif;">${s.categoryType || 'EEC'}</td>
                                    <td class="center">${s.l}</td>
                                    <td class="center">${s.t}</td>
                                    <td class="center">${s.p}</td>
                                    <td class="center">${s.contactPeriods}</td>
                                    <td class="center" style="font-weight: bold;">${s.credits}</td>
                                    <td class="center">${s.cia}</td>
                                    <td class="center">${s.ese}</td>
                                    <td class="center">${s.total}</td>
                                </tr>
                            `).join('')}
                        ` : ''}
                    </tbody>
                </table>
            </div>
        `;
    };

    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Curriculum and Syllabus - ${deptName}</title>
        <style>
            * {
                font-family: 'Times New Roman', Times, serif !important;
            }
            @page {
                size: A4;
                margin: 15mm 15mm 20mm 15mm;
            }
            body {
                font-family: 'Times New Roman', Times, serif;
                color: #000;
                background: #fff;
                margin: 0;
                padding: 0;
                font-size: 11pt;
                line-height: 1.4;
            }
            .page {
                page-break-after: always;
                position: relative;
                box-sizing: border-box;
                padding-top: 40px;
                padding-bottom: 30px;
                min-height: 260mm;
            }
            .page:last-child {
                page-break-after: avoid;
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
                .page {
                    background: #fff;
                    width: 210mm;
                    min-height: 297mm;
                    margin: 20px auto;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 20mm 15mm;
                    box-sizing: border-box;
                    position: relative;
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
                /* Offset first page so it doesn't get covered by the sticky preview bar */
                .page:first-of-type {
                    margin-top: 60px;
                }
            }
            
            /* Print settings */
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    background: #fff;
                }
                .preview-bar {
                    display: none !important;
                }
                .page {
                    width: auto !important;
                    min-height: 260mm !important;
                    margin: 0 !important;
                    box-shadow: none !important;
                    padding-top: 40px !important;
                    padding-bottom: 30px !important;
                }
            }
        </style>
    </head>
    <body>
        <!-- Preview Control Bar -->
        <div class="preview-bar no-print">
            <div class="preview-title">Curriculum & Syllabus Preview - ${degreePrefix} ${deptName} (${regYear})</div>
            <div>
                <button class="preview-btn btn-print" onclick="window.print()">Print / Save PDF</button>
                <button class="preview-btn btn-close" onclick="window.close()">Close Preview</button>
            </div>
        </div>
    
        <!-- PAGE 1: COVER PAGE -->
        <div class="page">
            <div class="cover-border">
                <!-- 1. HEADER CELL -->
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; border-bottom: 1.5px solid #000; padding-bottom: 12px; margin-bottom: 20px;">
                    <!-- Left: College Logo -->
                    <div style="flex: 0 0 75px; display: flex; margin-left: 120px; align-items: center; justify-content: flex-start;">
                        <img src="${collegeLogo}" style="height: 70px; object-fit: contain;" />
                    </div>             
                </div>

                <!-- 2. DEGREE & DEPARTMENT -->
                <div style="margin: 40px 0; text-align: center;">
                    <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 16pt; font-weight: bold; line-height: 1.5; text-transform: uppercase; margin: 0; padding: 0 10px;">
                        ${degreePrefix} ${deptName.toUpperCase()}
                    </h2>
                </div>

                <!-- 3. TITLE block -->
                <div style="margin: 40px 0; text-align: center;">
                    <h1 style="font-family: 'Times New Roman', Times, serif; font-size: 20pt; font-weight: bold; line-height: 1.3; text-transform: uppercase; margin: 0 0 10px 0;">
                        CURRICULUM AND SYLLABUS
                    </h1>
                    <h3 style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; font-weight: bold; text-transform: uppercase; margin: 0;">
                        (CHOICE BASED CREDIT SYSTEM)
                    </h3>
                </div>

                <!-- 4. REGULATION YEAR -->
                <div style="margin: 45px 0; text-align: center;">
                    <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin: 0;">
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
                <h1 style="font-size: 16pt;">Department of ${deptName}</h1>
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
            const semPages = [];
            const pairs = [[1, 2], [3, 4], [5, 6], [7, 8]];
            pairs.forEach(([semA, semB]) => {
                const hasA = semestersGrouped[semA] && semestersGrouped[semA].length > 0;
                const hasB = semestersGrouped[semB] && semestersGrouped[semB].length > 0;
                if (hasA || hasB) {
                    semPages.push({ semA, semB, hasA, hasB });
                }
            });

            return semPages.map(({ semA, semB, hasA, hasB }, index) => {
                return `
                <div class="page">
                    ${getHeaderHTML()}
                    ${index === 0 ? `
                    <div class="title-block">
                        <h1 style="font-size: 15pt; font-family: Arial, sans-serif;">${degreePrefix.replace('.', '')} ${deptName.toUpperCase()}</h1>
                        <h2 style="font-size: 11pt; font-family: Arial, sans-serif; font-weight: bold; line-height: 1.5; margin-top: 10px;">
                            REGULATION – ${regYear.replace('R-', '')}<br>
                            CHOICE BASED CREDIT SYSTEM<br>
                            CURRICULUM
                        </h2>
                    </div>
                    ` : ''}
                    
                    ${hasA ? renderSemesterTableHTML(semA) : ''}
                    ${hasB ? renderSemesterTableHTML(semB) : ''}
                    
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
                            <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">S.No.</th>
                            <th rowSpan="2" style="width: 15%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Code</th>
                            <th rowSpan="2" style="width: 38%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Title</th>
                            <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Periods / Week</th>
                            <th rowSpan="2" style="width: 10%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Total Contact Periods</th>
                            <th rowSpan="2" style="width: 7%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credits</th>
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
                            let globalIndex = 0;
                            return sortedVerticals.map(vertNum => {
                                const subjectsForVert = verticalsGrouped[vertNum];
                                const verticalName = subjectsForVert.find(s => s.verticalName)?.verticalName || '';
                                const romanNum = getRomanNumeral(vertNum);

                                return `
                                    <tr class="category-row" style="background-color: rgba(0, 0, 0, 0.05);">
                                        <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 9pt; font-weight: bold; text-align: center; padding: 6px;">
                                            Vertical ${romanNum}: ${verticalName}
                                        </td>
                                    </tr>
                                    ${subjectsForVert.map(s => {
                                        globalIndex++;
                                        return `
                                            <tr>
                                                <td class="center">${globalIndex}</td>
                                                <td class="center" style="font-family: monospace; font-weight: bold;">${s.code}</td>
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
                            <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">S.No.</th>
                            <th rowSpan="2" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Code</th>
                            <th rowSpan="2" style="width: 49%; font-size: 8pt; font-family: Arial, sans-serif; vertical-align: middle;">Course Title</th>
                            <th colSpan="3" style="width: 12%; font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center;">Periods / Week</th>
                            <th rowSpan="2" style="width: 9%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Total Contact Periods</th>
                            <th rowSpan="2" style="width: 5%; font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credits</th>
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
                                const dept = subj.offeringDept || 'Other Departments';
                                if (!acc[dept]) acc[dept] = [];
                                acc[dept].push(subj);
                                return acc;
                            }, {});
                            const sortedOecDepts = Object.keys(oecsGrouped).sort();
                            let oecGlobalIndex = 0;
                            return sortedOecDepts.map(deptName => {
                                const deptSubjects = oecsGrouped[deptName];
                                return `
                                    <tr style="background: #f9f9f9;">
                                        <td colspan="11" style="font-weight: bold; text-align: center; font-size: 9.5pt; font-family: Arial, sans-serif; background-color: #f2f2f2; border: 1px solid #000; padding: 6px;">
                                            ${deptName}
                                        </td>
                                    </tr>
                                    ${deptSubjects.map(s => {
                                        oecGlobalIndex++;
                                        return `
                                            <tr>
                                                <td class="center">${oecGlobalIndex}</td>
                                                <td class="center" style="font-family: monospace; font-weight: bold;">${s.code}</td>
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
        ${subjects && subjects.length > 0 ? getCreditDistributionHTML(subjects, pageTracker, bosMeetingDate, acMeetingDate) : ''}
        ${subjects && subjects.length > 0 ? getDetailedSyllabiHTML(subjects, regYear, pageTracker, bosMeetingDate, acMeetingDate, deptData.po, deptData.pso) : ''}
        
        <!-- No auto-print on load -->
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
};

const getDefaultCategoryName = (catType) => {
    const map = {
        'HSMC': 'Humanities, Social Sciences and Management Course (HSMC)',
        'BSC': 'Basic Science Course (BSC)',
        'ESC': 'Engineering Science Course (ESC)',
        'PCC': 'Professional Core Course (PCC)',
        'PEC': 'Professional Elective Course (PEC)',
        'OEC': 'Open Elective Course (OEC)',
        'EEC': 'Employability Enhancement Course (EEC)',
        'MC': 'Mandatory Course (Non-Credit) (MC)'
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

const DepartmentManager = () => {
    const { user } = useAuth();

    // Filter States
    const [academicLevel, setAcademicLevel] = useState("UG");

    // Extract available departments based on Level
    const filteredDepts = staticDepartments.filter(d => d.type === academicLevel);

    // Determine initial department based on user role if needed, defaulting to CS
    const initialDept = filteredDepts.length > 0 ? filteredDepts[0].slug : 'computer-science-and-engineering';

    const [selectedDept, setSelectedDept] = useState(initialDept);

    // Automatically ensure selected department is valid when Level changes
    useEffect(() => {
        if (filteredDepts.length > 0) {
            const hasCurrent = filteredDepts.some(d => d.slug === selectedDept);
            if (!hasCurrent) {
                setSelectedDept(filteredDepts[0].slug);
            }
        }
    }, [academicLevel, filteredDepts, selectedDept]);
    const [deptData, setDeptData] = useState(null);
    const [creditDetails, setCreditDetails] = useState(null);
    const [data, setData] = useState({
        mission: [],
        vision: [],
        peo: [],
        pso: [],
        po: [],
        subjects: [],
        bosMeetingDate: '29.10.2024',
        acMeetingDate: '25.11.2024',
        regulation: 'R-2023'
    });
    const [loading, setLoading] = useState(true);
    const [instVisionMission, setInstVisionMission] = useState({ vision: '', mission: [] });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/mission-vision`)
            .then(res => res.json())
            .then(data => {
                if (data) setInstVisionMission(data);
            })
            .catch(err => console.error("Failed to fetch institute mission-vision", err));
    }, []);

    const [newSubject, setNewSubject] = useState({
        semester: 1,
        vertical: '',
        verticalName: '',
        category: 'THEORY',
        code: '',
        title: '',
        categoryType: 'HSMC',
        l: 0,
        t: 0,
        p: 0,
        contactPeriods: 0,
        credits: 3,
        cia: 40,
        ese: 60,
        total: 100,
        isOpenElective: false,
        offeringDept: ''
    });

    const [courseType, setCourseType] = useState('semester'); // 'semester', 'professional_elective', 'open_elective'

    const updateNewSubjectField = (field, value) => {
        setNewSubject(prev => {
            const updated = { ...prev, [field]: value };

            // Treat empty string as 0 for calculations
            const lVal = updated.l === '' ? 0 : Number(updated.l);
            const tVal = updated.t === '' ? 0 : Number(updated.t);
            const pVal = updated.p === '' ? 0 : Number(updated.p);
            const ciaVal = updated.cia === '' ? 0 : Number(updated.cia);
            const eseVal = updated.ese === '' ? 0 : Number(updated.ese);

            updated.contactPeriods = lVal + tVal + pVal;
            updated.total = ciaVal + eseVal;

            return updated;
        });
    };

    // State for managing inline edits
    const [editingSection, setEditingSection] = useState(null); // 'mission', 'vision', etc.
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editValue, setEditValue] = useState('');

    // State for editing subjects
    const [editingSubjectIndex, setEditingSubjectIndex] = useState(null);
    const [editingSubjectValue, setEditingSubjectValue] = useState(null);

    // State for adding new points
    const [newItemValues, setNewItemValues] = useState({
        mission: '',
        vision: '',
        peo: '',
        pso: '',
        po: ''
    });

    // State for managing syllabus details
    const [selectedSyllabusSubjectIndex, setSelectedSyllabusSubjectIndex] = useState(null);
    const [syllabusEditValue, setSyllabusEditValue] = useState(null);
    const [activeSyllabusTab, setActiveSyllabusTab] = useState('objectives-outcomes');

    const handleStartManageSyllabus = (originalIndex) => {
        const subj = data.subjects[originalIndex];
        setSelectedSyllabusSubjectIndex(originalIndex);
        
        const prefilledMapping = (subj.coPoMapping && subj.coPoMapping.length === 5)
            ? subj.coPoMapping.map(m => ({ ...m }))
            : [1, 2, 3, 4, 5].map(num => {
                const mapObj = { coNo: `CO ${num}` };
                for (let i = 1; i <= 12; i++) {
                    mapObj[`po${i}`] = '-';
                }
                for (let i = 1; i <= 3; i++) {
                    mapObj[`pso${i}`] = '-';
                }
                return mapObj;
            });

        // Prefill values
        const prefilledSyllabus = {
            code: subj.code || '',
            title: subj.title || '',
            category: subj.category || 'THEORY',
            categoryType: subj.categoryType || 'HSMC',
            l: subj.l ?? 0,
            t: subj.t ?? 0,
            p: subj.p ?? 0,
            credits: subj.credits ?? 3,
            subtitle: subj.subtitle || '',
            categoryName: subj.categoryName || getDefaultCategoryName(subj.categoryType),
            prerequisites: subj.prerequisites || 'Basic knowledge of the subject.',
            objectives: (subj.objectives && subj.objectives.length > 0) 
                ? [...subj.objectives] 
                : getDefaultObjectives(subj.code, subj.title),
            outcomes: (subj.outcomes && subj.outcomes.length > 0) 
                ? subj.outcomes.map(co => ({ ...co }))
                : getDefaultOutcomes(subj.code, subj.title),
            units: (subj.units && subj.units.length > 0) 
                ? subj.units.map(u => ({ ...u, topics: Array.isArray(u.topics) ? [...u.topics] : [u.topics || ''] }))
                : getDetailedSyllabusForSubject(subj.code, subj.title).map(u => ({
                    unitNo: u.unit || u.unitNo || '',
                    title: u.title || '',
                    topics: Array.isArray(u.topics) ? [...u.topics] : [u.topics || '']
                })),
            experiments: subj.experiments && subj.experiments.length > 0
                ? subj.experiments.map(exp => ({ ...exp }))
                : [],
            textbooks: (subj.textbooks && subj.textbooks.length > 0)
                ? [...subj.textbooks]
                : ['1. Textbook of ' + (subj.title || 'Course') + ' - First Edition'],
            references: (subj.references && subj.references.length > 0)
                ? [...subj.references]
                : ['1. Reference Book of ' + (subj.title || 'Course') + ' - Second Edition'],
            webReferences: (subj.webReferences && subj.webReferences.length > 0)
                ? [...subj.webReferences]
                : ['https://www.google.com'],
            coPoMapping: prefilledMapping
        };

        setSyllabusEditValue(prefilledSyllabus);
        setActiveSyllabusTab('objectives-outcomes');
    };

    const handleSaveSyllabus = async () => {
        if (!syllabusEditValue) return;

        const originalIndex = selectedSyllabusSubjectIndex;
        const currentSubject = data.subjects[originalIndex];
        
        const updatedSubject = {
            ...currentSubject,
            subtitle: syllabusEditValue.subtitle,
            categoryName: syllabusEditValue.categoryName,
            prerequisites: syllabusEditValue.prerequisites,
            objectives: syllabusEditValue.objectives.filter(o => o.trim() !== ''),
            outcomes: syllabusEditValue.outcomes.filter(co => co.outcome.trim() !== ''),
            units: syllabusEditValue.units.map(u => ({
                ...u,
                topics: Array.isArray(u.topics) ? u.topics.filter(t => t.trim() !== '') : [u.topics]
            })),
            experiments: syllabusEditValue.experiments ? syllabusEditValue.experiments.filter(e => e.name && e.name.trim() !== '') : [],
            textbooks: syllabusEditValue.textbooks.filter(t => t.trim() !== ''),
            references: syllabusEditValue.references.filter(r => r.trim() !== ''),
            webReferences: syllabusEditValue.webReferences ? syllabusEditValue.webReferences.filter(w => w.trim() !== '') : [],
            coPoMapping: syllabusEditValue.coPoMapping
        };

        const updatedSubjects = [...data.subjects];
        updatedSubjects[originalIndex] = updatedSubject;

        const updatedData = { ...data, subjects: updatedSubjects };
        const success = await updateBackend(updatedData);

        if (success) {
            setSelectedSyllabusSubjectIndex(null);
            setSyllabusEditValue(null);
        }
    };

    useEffect(() => {
        fetchDepartmentData();
    }, [selectedDept]);

    const fetchDepartmentData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/departments/${selectedDept}`);
            if (res.ok) {
                const json = await res.json();
                if (json) {
                    setData({
                        _id: json._id,
                        mission: json.mission || [],
                        vision: json.vision || [],
                        peo: json.peo || [],
                        pso: json.pso || [],
                        po: json.po || [],
                        subjects: json.subjects || [],
                        bosMeetingDate: json.bosMeetingDate || '29.10.2024',
                        acMeetingDate: json.acMeetingDate || '25.11.2024',
                        regulation: json.regulation || 'R-2023'
                    });
                } else {
                    setData({ mission: [], vision: [], peo: [], pso: [], po: [], subjects: [], bosMeetingDate: '29.10.2024', acMeetingDate: '25.11.2024', regulation: 'R-2023' });
                }
            } else {
                setData({ mission: [], vision: [], peo: [], pso: [], po: [], subjects: [], bosMeetingDate: '29.10.2024', acMeetingDate: '25.11.2024', regulation: 'R-2023' });
            }
        } catch (error) {
            console.error('Error fetching department data:', error);
            setData({ mission: [], vision: [], peo: [], pso: [], po: [], subjects: [], bosMeetingDate: '29.10.2024', acMeetingDate: '25.11.2024', regulation: 'R-2023' });
        }
        setLoading(false);
        // After loading department data, fetch credit distribution details
        fetchCreditDetails();
    };

    const fetchCreditDetails = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/departments/${selectedDept}/details`);
            if (res.ok) {
                const json = await res.json();
                setCreditDetails(json);
            } else {
                setCreditDetails(null);
            }
        } catch (error) {
            console.error('Error fetching credit details:', error);
            setCreditDetails(null);
        }
    };

    const updateBackend = async (updatedData) => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${API_BASE_URL}/api/departments/${selectedDept}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!res.ok) throw new Error('Failed to update');
            setData(updatedData);
            return true;
        } catch (error) {
            console.error('Error updating department data:', error);
            alert('Failed to save changes. Please try again.');
            return false;
        }
    };

    const handleStartEditSubject = (originalIndex) => {
        setEditingSubjectIndex(originalIndex);
        setEditingSubjectValue({ ...data.subjects[originalIndex] });
    };

    const handleCancelEditSubject = () => {
        setEditingSubjectIndex(null);
        setEditingSubjectValue(null);
    };

    const updateEditingSubjectField = (field, value) => {
        setEditingSubjectValue(prev => {
            const updated = { ...prev, [field]: value };
            
            // Treat empty string as 0 for calculations
            const lVal = updated.l === '' ? 0 : Number(updated.l || 0);
            const tVal = updated.t === '' ? 0 : Number(updated.t || 0);
            const pVal = updated.p === '' ? 0 : Number(updated.p || 0);
            const ciaVal = updated.cia === '' ? 0 : Number(updated.cia || 0);
            const eseVal = updated.ese === '' ? 0 : Number(updated.ese || 0);

            updated.contactPeriods = lVal + tVal + pVal;
            updated.total = ciaVal + eseVal;

            return updated;
        });
    };

    const handleSaveEditSubject = async () => {
        if (!editingSubjectValue.code || !editingSubjectValue.title) {
            alert('Please enter Course Code and Title.');
            return;
        }

        const lVal = editingSubjectValue.l === '' ? 0 : Number(editingSubjectValue.l || 0);
        const tVal = editingSubjectValue.t === '' ? 0 : Number(editingSubjectValue.t || 0);
        const pVal = editingSubjectValue.p === '' ? 0 : Number(editingSubjectValue.p || 0);
        const ciaVal = editingSubjectValue.cia === '' ? 0 : Number(editingSubjectValue.cia || 0);
        const eseVal = editingSubjectValue.ese === '' ? 0 : Number(editingSubjectValue.ese || 0);

        const updatedSubj = {
            ...editingSubjectValue,
            l: lVal,
            t: tVal,
            p: pVal,
            contactPeriods: lVal + tVal + pVal,
            cia: ciaVal,
            ese: eseVal,
            total: ciaVal + eseVal,
            credits: Number(editingSubjectValue.credits || 0)
        };

        const updatedSubjects = [...data.subjects];
        updatedSubjects[editingSubjectIndex] = updatedSubj;

        const updatedData = { ...data, subjects: updatedSubjects };
        const success = await updateBackend(updatedData);

        if (success) {
            setEditingSubjectIndex(null);
            setEditingSubjectValue(null);
        }
    };

    const handleAddItem = async (section) => {
        const val = newItemValues[section].trim();
        if (!val) return;

        const updatedData = { ...data, [section]: [...data[section], val] };
        const success = await updateBackend(updatedData);
        if (success) {
            setNewItemValues(prev => ({ ...prev, [section]: '' }));
        }
    };

    const handleDeleteItem = async (section, index) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        const newArray = [...data[section]];
        newArray.splice(index, 1);

        const updatedData = { ...data, [section]: newArray };
        await updateBackend(updatedData);
    };

    const handleAddSubject = async () => {
        if (!newSubject.code || !newSubject.title) {
            alert('Please enter Course Code and Title.');
            return;
        }
        const subjectToAdd = { ...newSubject };

        if (courseType === 'semester') {
            delete subjectToAdd.vertical;
            delete subjectToAdd.verticalName;
            subjectToAdd.isOpenElective = false;
            delete subjectToAdd.offeringDept;
        } else if (courseType === 'professional_elective') {
            delete subjectToAdd.semester;
            subjectToAdd.isOpenElective = false;
            subjectToAdd.vertical = Number(subjectToAdd.vertical);
            delete subjectToAdd.offeringDept;
        } else if (courseType === 'open_elective') {
            delete subjectToAdd.semester;
            delete subjectToAdd.vertical;
            delete subjectToAdd.verticalName;
            subjectToAdd.isOpenElective = true;
            delete subjectToAdd.category;
            delete subjectToAdd.categoryType;
        }

        const updatedData = { ...data, subjects: [...(data.subjects || []), subjectToAdd] };
        const success = await updateBackend(updatedData);
        if (success) {
            setNewSubject({
                semester: 1, vertical: '', verticalName: '', category: 'THEORY', code: '', title: '', categoryType: 'HSMC',
                l: 0, t: 0, p: 0, contactPeriods: 0, credits: 3, cia: 40, ese: 60, total: 100, isOpenElective: false, offeringDept: ''
            });
        }
    };

    const handleDeleteSubject = async (index) => {
        if (!window.confirm('Are you sure you want to delete this subject?')) return;
        const newArray = [...(data.subjects || [])];
        newArray.splice(index, 1);
        const updatedData = { ...data, subjects: newArray };
        await updateBackend(updatedData);
    };

    const handleStartEdit = (section, index, currentValue) => {
        setEditingSection(section);
        setEditingIndex(index);
        setEditValue(currentValue);
    };

    const handleCancelEdit = () => {
        setEditingSection(null);
        setEditingIndex(-1);
        setEditValue('');
    };

    const handleSaveEdit = async (section, index) => {
        const val = editValue.trim();
        if (!val) return;

        const newArray = [...data[section]];
        newArray[index] = val;

        const updatedData = { ...data, [section]: newArray };
        const success = await updateBackend(updatedData);

        if (success) {
            handleCancelEdit();
        }
    };

    // Render a section (e.g., Mission, PEO)
    const renderSection = (title, sectionKey) => {
        return (
            <div className="dept-section-card" style={{
                background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
                borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem'
            }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary)' }}>{title}</h3>

                {/* List of items */}
                {data[sectionKey].length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>No {title} defined yet.</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {data[sectionKey].map((item, index) => {
                            const isEditing = editingSection === sectionKey && editingIndex === index;
                            return (
                                <li key={index} style={{
                                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                                    background: 'var(--bg-section)', padding: '1rem', borderRadius: '8px',
                                    border: '1px solid var(--glass-border)', gap: '1rem'
                                }}>
                                    {isEditing ? (
                                        <div style={{ flex: 1, display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                                            <textarea
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--primary)', background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '80px', resize: 'vertical' }}
                                            />
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleSaveEdit(sectionKey, index)} className="btn btn-success" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaSave /> Save</button>
                                                <button onClick={handleCancelEdit} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaTimes /> Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ flex: 1, lineHeight: '1.5' }}>
                                                <strong style={{ marginRight: '0.5rem', color: 'var(--primary)' }}>{index + 1}.</strong>
                                                {item}
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                                <button onClick={() => handleStartEdit(sectionKey, index, item)} className="btn" style={{ padding: '0.5rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} title="Edit"><FaEdit /></button>
                                                <button onClick={() => handleDeleteItem(sectionKey, index)} className="btn btn-danger" style={{ padding: '0.5rem' }} title="Delete"><FaTrash /></button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}

                {/* Add new item form */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <textarea
                        placeholder={`Add new ${title} point...`}
                        value={newItemValues[sectionKey]}
                        onChange={(e) => setNewItemValues(prev => ({ ...prev, [sectionKey]: e.target.value }))}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-section)', color: 'var(--text-main)', minHeight: '60px', resize: 'vertical' }}
                    />
                    <button
                        onClick={() => handleAddItem(sectionKey)}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', height: 'fit-content' }}
                        disabled={!newItemValues[sectionKey].trim()}
                    >
                        <FaPlus /> Add
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="department-manager-container">
            {/* Department Selector */}
            <div style={{
                background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px',
                border: '1px solid var(--glass-border)', marginBottom: '2rem',
                display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center'
            }}>
                {/* Academic Level Toggle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1', minWidth: '250px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Academic Level</label>
                    <div style={{ display: 'flex', background: 'var(--bg-section)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '2', minWidth: '300px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Department</label>
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        style={{
                            padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                            fontWeight: '500', width: '100%', cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        {filteredDepts.map(dept => (
                            <option key={dept.slug} value={dept.slug}>{dept.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Regulation & Meeting Dates Edit Section */}
            <div style={{
                background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px',
                border: '1px solid var(--glass-border)', marginBottom: '2rem',
                display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1', minWidth: '250px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Academic Regulation</label>
                    <input
                        type="text"
                        value={data.regulation || ''}
                        onChange={(e) => setData(prev => ({ ...prev, regulation: e.target.value }))}
                        style={{
                            padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                            fontWeight: '500', fontSize: '1rem'
                        }}
                        placeholder="e.g. R-2023"
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1', minWidth: '250px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Board of Studies Meeting Date</label>
                    <input
                        type="text"
                        value={data.bosMeetingDate || ''}
                        onChange={(e) => setData(prev => ({ ...prev, bosMeetingDate: e.target.value }))}
                        style={{
                            padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                            fontWeight: '500', fontSize: '1rem'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1', minWidth: '250px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Academic Council Meeting Date</label>
                    <input
                        type="text"
                        value={data.acMeetingDate || ''}
                        onChange={(e) => setData(prev => ({ ...prev, acMeetingDate: e.target.value }))}
                        style={{
                            padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)',
                            background: 'var(--bg-section)', color: 'var(--text-main)', outline: 'none',
                            fontWeight: '500', fontSize: '1rem'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
                    <button
                        onClick={async () => {
                            const success = await updateBackend(data);
                            if (success) {
                                alert('Regulation details updated successfully!');
                            }
                        }}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold' }}
                    >
                        Save Regulation Details
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    Loading department data...
                </div>
            ) : (
                <div className="department-sections-grid">
                    {renderSection('Mission', 'mission')}
                    {renderSection('Vision', 'vision')}
                    {renderSection('Program Educational Objectives (PEO)', 'peo')}
                    {renderSection('Program Specific Outcomes (PSO)', 'pso')}
                    {renderSection('Program Outcomes (PO)', 'po')}

                    {/* Subjects Section */}
                    <div className="dept-section-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', margin: 0 }}>Syllabus Subjects</h3>
                            <button
                                onClick={() => {
                                    const activeDeptObj = staticDepartments.find(d => d.slug === selectedDept);
                                    exportCurriculumPDF({
                                        ...data,
                                        name: activeDeptObj ? activeDeptObj.name : 'Engineering Department',
                                        slug: selectedDept
                                    }, academicLevel, undefined, instVisionMission);
                                }}
                                className="btn btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}
                            >
                                <FaFilePdf /> Export Official Curriculum PDF
                            </button>
                        </div>

                        {/* List of Subjects */}
                        {(data.subjects || []).length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>No subjects defined yet.</p>
                        ) : (
                            <div style={{ marginBottom: '2rem' }}>
                                {(() => {
                                    const subjectsWithIndex = (data.subjects || []).map((subj, idx) => ({ ...subj, originalIndex: idx }));

                                    // Group semesters (excluding verticals and open electives)
                                    const semestersGrouped = subjectsWithIndex.filter(s => !s.vertical && !s.isOpenElective).reduce((acc, subj) => {
                                        const sem = subj.semester || 1;
                                        if (!acc[sem]) acc[sem] = [];
                                        acc[sem].push(subj);
                                        return acc;
                                    }, {});
                                    const sortedSemesters = Object.keys(semestersGrouped).sort((a, b) => Number(a) - Number(b));

                                    // Group verticals
                                    const verticalsGrouped = subjectsWithIndex.filter(s => s.vertical).reduce((acc, subj) => {
                                        const vert = subj.vertical;
                                        if (!acc[vert]) acc[vert] = [];
                                        acc[vert].push(subj);
                                        return acc;
                                    }, {});
                                    const sortedVerticals = Object.keys(verticalsGrouped).sort((a, b) => Number(a) - Number(b));

                                    return (
                                        <>
                                            {/* Semester Tables */}
                                            {sortedSemesters.map(semNum => {
                                                const subjectsForSem = semestersGrouped[semNum];
                                                const categoriesGrouped = subjectsForSem.reduce((acc, subj) => {
                                                    const cat = subj.category || 'THEORY';
                                                    if (!acc[cat]) acc[cat] = [];
                                                    acc[cat].push(subj);
                                                    return acc;
                                                }, {});

                                                return (
                                                    <div key={`sem-${semNum}`} style={{ marginBottom: '2rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--bg-section)' }}>
                                                        <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}>
                                                            SEMESTER {semNum}
                                                        </h4>
                                                        <div style={{ overflowX: 'auto' }}>
                                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', border: '1px solid var(--glass-border)' }}>
                                                                <thead style={{ background: 'transparent' }}>
                                                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>S. No.</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>Course Code</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>Course Title</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>Category</th>
                                                                        <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center' }}>Periods per Week</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>Total Contact Periods</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>C</th>
                                                                        <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center' }}>Marks</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle' }}>Action</th>
                                                                    </tr>
                                                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Object.entries(categoriesGrouped).map(([categoryName, categorySubjects], catIdx) => (
                                                                        <React.Fragment key={catIdx}>
                                                                            <tr>
                                                                                <td colSpan="13" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', background: 'rgba(255,255,255,0.02)', color: 'var(--primary)' }}>
                                                                                    {categoryName === 'THEORY' ? 'Theory Course(s)' : categoryName === 'PRACTICAL' ? 'Practical Course(s)' : categoryName === 'THEORY CUM PRACTICAL' ? 'Theory cum Practical Course(s)' : categoryName}
                                                                                </td>
                                                                            </tr>
                                                                            {categorySubjects.map((subj, subjIdx) => (
                                                                                <tr key={subjIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subjIdx + 1}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: '500' }}>{subj.code}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.categoryType}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                                                                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                                                            <button onClick={() => handleStartManageSyllabus(subj.originalIndex)} className="btn btn-primary" style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.75rem' }} title="Manage Syllabus">
                                                                                            Syllabus <FaBook />
                                                                                            </button>
                                                                                            <button onClick={() => handleStartEditSubject(subj.originalIndex)} className="btn" style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Subject">
                                                                                                <FaEdit />
                                                                                            </button>
                                                                                            <button onClick={() => handleDeleteSubject(subj.originalIndex)} className="btn btn-danger" style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Delete Subject">
                                                                                                <FaTrash />
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Single Professional Electives / Vertical Table */}
                                            {sortedVerticals.length > 0 && (
                                                <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--bg-section)' }}>
                                                    <h4 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                        Professional Elective Courses
                                                    </h4>
                                                    <div style={{ overflowX: 'auto' }}>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', border: '1px solid var(--glass-border)' }}>
                                                            <thead style={{ background: 'transparent' }}>
                                                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '5%' }}>S.No.</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Course Code</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '30%' }}>Course Title</th>
                                                                    <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center', width: '12%' }}>Periods per Week</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>Total Contact Periods</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Credits</th>
                                                                    <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center', width: '13%' }}>Marks</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>Action</th>
                                                                </tr>
                                                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {(() => {
                                                                    let globalIndex = 0;
                                                                    return sortedVerticals.map(vertNum => {
                                                                        const subjectsForVert = verticalsGrouped[vertNum];
                                                                        const verticalName = subjectsForVert.find(s => s.verticalName)?.verticalName || '';
                                                                        const romanNum = getRomanNumeral(vertNum);

                                                                        return (
                                                                            <React.Fragment key={`vert-${vertNum}`}>
                                                                                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                                                    <td colSpan="12" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.9rem' }}>
                                                                                        Vertical {romanNum}: {verticalName}
                                                                                    </td>
                                                                                </tr>
                                                                                {subjectsForVert.map((subj, subjIdx) => {
                                                                                    globalIndex++;
                                                                                    return (
                                                                                        <tr key={subjIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{globalIndex}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: '500', fontFamily: 'monospace' }}>{subj.code}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                                                                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                                                                    <button onClick={() => handleStartManageSyllabus(subj.originalIndex)} className="btn btn-primary" style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.75rem' }} title="Manage Syllabus">
                                                                                                        Next <FaBook />
                                                                                                    </button>
                                                                                                    <button onClick={() => handleStartEditSubject(subj.originalIndex)} className="btn" style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Subject">
                                                                                                        <FaEdit />
                                                                                                    </button>
                                                                                                    <button onClick={() => handleDeleteSubject(subj.originalIndex)} className="btn btn-danger" style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Delete Subject">
                                                                                                        <FaTrash />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
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

                                            {/* Open Elective Courses Table */}
                                            {subjectsWithIndex.some(s => s.isOpenElective) && (
                                                <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', background: 'var(--bg-section)' }}>
                                                    <h4 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                        Open Elective Courses
                                                    </h4>
                                                    <div style={{ overflowX: 'auto' }}>
                                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', border: '1px solid var(--glass-border)' }}>
                                                            <thead style={{ background: 'transparent' }}>
                                                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '5%' }}>S.No.</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '12%' }}>Course Code</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '44%' }}>Course Title</th>
                                                                    <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center', width: '12%' }}>Periods per Week</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Total Contact Periods</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '6%' }}>Credits</th>
                                                                    <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', color: 'var(--text-main)', textAlign: 'center', width: '13%' }}>Marks</th>
                                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>Action</th>
                                                                </tr>
                                                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.4rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {(() => {
                                                                    const oecsGrouped = subjectsWithIndex.filter(s => s.isOpenElective).reduce((acc, subj) => {
                                                                        const dept = subj.offeringDept || 'Other Departments';
                                                                        if (!acc[dept]) acc[dept] = [];
                                                                        acc[dept].push(subj);
                                                                        return acc;
                                                                    }, {});
                                                                    const sortedOecDepts = Object.keys(oecsGrouped).sort();
                                                                    let oecGlobalIndex = 0;
                                                                    return sortedOecDepts.map(deptName => {
                                                                        const deptSubjects = oecsGrouped[deptName];
                                                                        return (
                                                                            <React.Fragment key={`oec-dept-${deptName}`}>
                                                                                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                                                    <td colSpan={12} style={{ border: '1px solid var(--glass-border)', padding: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.95rem' }}>
                                                                                        {deptName}
                                                                                    </td>
                                                                                </tr>
                                                                                {deptSubjects.map((subj, idx) => {
                                                                                    oecGlobalIndex++;
                                                                                    return (
                                                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{oecGlobalIndex}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: '500', fontFamily: 'monospace' }}>{subj.code}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                                                                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                                                                    <button onClick={() => handleStartManageSyllabus(subj.originalIndex)} className="btn btn-primary" style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.75rem' }} title="Manage Syllabus">
                                                                                                        Next <FaBook />
                                                                                                    </button>
                                                                                                    <button onClick={() => handleStartEditSubject(subj.originalIndex)} className="btn" style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Subject">
                                                                                                        <FaEdit />
                                                                                                    </button>
                                                                                                    <button onClick={() => handleDeleteSubject(subj.originalIndex)} className="btn btn-danger" style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Delete Subject">
                                                                                                        <FaTrash />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>
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
                                            {renderCreditDistributionTable(data.subjects)}
                                        </>
                                    );
                                })()
                                }
                            </div>
                        )}

                        {/* Add Subject Form */}
                        <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Add New Subject</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course Type</label>
                                    <select
                                        value={courseType}
                                        onChange={e => setCourseType(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="semester">Semester Course</option>
                                        <option value="professional_elective">Professional Elective (Vertical)</option>
                                        <option value="open_elective">Open Elective Course</option>
                                    </select>
                                </div>
                                 {courseType === 'semester' && (
                                     <div>
                                         <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Semester</label>
                                         <input type="number" value={newSubject.semester} onChange={e => setNewSubject({ ...newSubject, semester: Number(e.target.value) })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} />
                                     </div>
                                 )}
                                {courseType === 'professional_elective' && (
                                    <>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Vertical</label>
                                            <input type="number" placeholder="e.g. 1" value={newSubject.vertical || ''} onChange={e => setNewSubject({ ...newSubject, vertical: e.target.value === '' ? '' : Number(e.target.value) })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Vertical Name</label>
                                            <input type="text" placeholder="e.g. Cloud Computing" value={newSubject.verticalName || ''} onChange={e => setNewSubject({ ...newSubject, verticalName: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} />
                                        </div>
                                    </>
                                )}
                                {courseType === 'semester' && (
                                    <>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                            <select
                                                value={newSubject.category}
                                                onChange={e => setNewSubject({ ...newSubject, category: e.target.value })}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                            >
                                                <option value="THEORY">THEORY</option>
                                                <option value="PRACTICAL">PRACTICAL</option>
                                                <option value="THEORY CUM PRACTICAL">THEORY CUM PRACTICAL</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category Type</label>
                                            <select
                                                value={newSubject.categoryType || 'HSMC'}
                                                onChange={e => setNewSubject({ ...newSubject, categoryType: e.target.value })}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                            >
                                                <option value="HSMC">HSMC</option>
                                                <option value="BSC">BSC</option>
                                                <option value="ESC">ESC</option>
                                                <option value="PCC">PCC</option>
                                                <option value="PEC">PEC</option>
                                                <option value="OEC">OEC</option>
                                                <option value="EEC">EEC</option>
                                                <option value="MC">MC</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                                {courseType === 'open_elective' && (
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Offering Department</label>
                                        <select
                                            value={newSubject.offeringDept || ''}
                                            onChange={e => setNewSubject({ ...newSubject, offeringDept: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="">Select Offering Department</option>
                                            {staticDepartments.map(dept => (
                                                <option key={dept.slug} value={dept.name}>{dept.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course Code</label>
                                    <input type="text" value={newSubject.code} onChange={e => setNewSubject({ ...newSubject, code: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course Title</label>
                                    <input type="text" value={newSubject.title} onChange={e => setNewSubject({ ...newSubject, title: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Credits</label>
                                    <input type="number" value={newSubject.credits} onChange={e => setNewSubject({ ...newSubject, credits: Number(e.target.value) })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>L</label><input type="number" value={newSubject.l} onChange={e => { const val = e.target.value; updateNewSubjectField('l', val === '' ? '' : Math.max(0, Number(val))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>T</label><input type="number" value={newSubject.t} onChange={e => { const val = e.target.value; updateNewSubjectField('t', val === '' ? '' : Math.max(0, Number(val))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>P</label><input type="number" value={newSubject.p} onChange={e => { const val = e.target.value; updateNewSubjectField('p', val === '' ? '' : Math.max(0, Number(val))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Periods</label><input type="number" value={newSubject.contactPeriods} readOnly style={{ width: '100%', padding: '0.4rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#aaa', cursor: 'not-allowed' }} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CIA</label><input type="number" max="40" value={newSubject.cia} onChange={e => { const val = e.target.value; updateNewSubjectField('cia', val === '' ? '' : Math.min(40, Math.max(0, Number(val)))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ESE</label><input type="number" max="60" value={newSubject.ese} onChange={e => { const val = e.target.value; updateNewSubjectField('ese', val === '' ? '' : Math.min(60, Math.max(0, Number(val)))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total</label><input type="number" value={newSubject.total} readOnly style={{ width: '100%', padding: '0.4rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#aaa', cursor: 'not-allowed' }} /></div>
                            </div>

                            <button onClick={handleAddSubject} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                                <FaPlus /> Add Subject
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Subject Modal */}
            {editingSubjectIndex !== null && editingSubjectValue !== null && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.85)', zIndex: 99999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem', backdropFilter: 'blur(8px)'
                }}>
                    <div style={{
                        background: 'var(--bg-card)', border: '1px solid var(--primary)',
                        borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '650px',
                        maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>Edit Subject</h3>
                            <button onClick={handleCancelEditSubject} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}><FaTimes /></button>
                        </div>

                        {/* Subject Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {/* Course Code */}
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Course Code</label>
                                <input type="text" value={editingSubjectValue.code || ''} onChange={e => updateEditingSubjectField('code', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>

                            {/* Course Title */}
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Course Title</label>
                                <input type="text" value={editingSubjectValue.title || ''} onChange={e => updateEditingSubjectField('title', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>

                            {/* L-T-P-Credits-ContactPeriods */}
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>L (Lecture periods)</label>
                                <input type="number" value={editingSubjectValue.l === undefined ? '' : editingSubjectValue.l} onChange={e => { const val = e.target.value; updateEditingSubjectField('l', val === '' ? '' : Math.max(0, Number(val))); }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>T (Tutorial periods)</label>
                                <input type="number" value={editingSubjectValue.t === undefined ? '' : editingSubjectValue.t} onChange={e => { const val = e.target.value; updateEditingSubjectField('t', val === '' ? '' : Math.max(0, Number(val))); }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>P (Practical periods)</label>
                                <input type="number" value={editingSubjectValue.p === undefined ? '' : editingSubjectValue.p} onChange={e => { const val = e.target.value; updateEditingSubjectField('p', val === '' ? '' : Math.max(0, Number(val))); }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Total Contact Periods</label>
                                <input type="number" value={editingSubjectValue.contactPeriods === undefined ? '' : editingSubjectValue.contactPeriods} readOnly style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#aaa', cursor: 'not-allowed', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Credits</label>
                                <input type="number" step="any" value={editingSubjectValue.credits === undefined ? '' : editingSubjectValue.credits} onChange={e => { const val = e.target.value; updateEditingSubjectField('credits', val === '' ? '' : Number(val)); }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>

                            {/* Category and Category Type */}
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                                <select value={editingSubjectValue.category || 'THEORY'} onChange={e => updateEditingSubjectField('category', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                    <option value="THEORY">THEORY</option>
                                    <option value="PRACTICAL">PRACTICAL</option>
                                    <option value="THEORY CUM PRACTICAL">THEORY CUM PRACTICAL</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category Type</label>
                                <select value={editingSubjectValue.categoryType || 'HSMC'} onChange={e => updateEditingSubjectField('categoryType', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                    <option value="HSMC">HSMC</option>
                                    <option value="BSC">BSC</option>
                                    <option value="ESC">ESC</option>
                                    <option value="PCC">PCC</option>
                                    <option value="PEC">PEC</option>
                                    <option value="OEC">OEC</option>
                                    <option value="EEC">EEC</option>
                                    <option value="MC">MC</option>
                                </select>
                            </div>

                            {/* CIA, ESE, Total Marks */}
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>CIA Marks</label>
                                <input type="number" max="40" value={editingSubjectValue.cia === undefined ? '' : editingSubjectValue.cia} onChange={e => { const val = e.target.value; updateEditingSubjectField('cia', val === '' ? '' : Math.min(40, Math.max(0, Number(val)))); }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>ESE Marks</label>
                                <input type="number" max="60" value={editingSubjectValue.ese === undefined ? '' : editingSubjectValue.ese} onChange={e => { const val = e.target.value; updateEditingSubjectField('ese', val === '' ? '' : Math.min(60, Math.max(0, Number(val)))); }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Total Marks</label>
                                <input type="number" value={editingSubjectValue.total === undefined ? '' : editingSubjectValue.total} readOnly style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#aaa', cursor: 'not-allowed', outline: 'none' }} />
                            </div>

                            {/* Semester Course Type fields */}
                            {!editingSubjectValue.vertical && !editingSubjectValue.isOpenElective && (
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Semester</label>
                                    <input type="number" value={editingSubjectValue.semester || 1} onChange={e => updateEditingSubjectField('semester', Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                                </div>
                            )}

                            {/* Professional Elective Course Type fields */}
                            {editingSubjectValue.vertical && (
                                <>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Vertical</label>
                                        <input type="number" value={editingSubjectValue.vertical || ''} onChange={e => updateEditingSubjectField('vertical', e.target.value === '' ? '' : Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Vertical Name</label>
                                        <input type="text" value={editingSubjectValue.verticalName || ''} onChange={e => updateEditingSubjectField('verticalName', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} />
                                    </div>
                                </>
                            )}

                            {/* Open Elective Course Type fields */}
                            {editingSubjectValue.isOpenElective && (
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Offering Department</label>
                                    <select value={editingSubjectValue.offeringDept || ''} onChange={e => updateEditingSubjectField('offeringDept', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                        <option value="">Select Offering Department</option>
                                        {staticDepartments.map(dept => (
                                            <option key={dept.slug} value={dept.name}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                            <button onClick={handleCancelEditSubject} className="btn" style={{ padding: '0.6rem 1.2rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>Cancel</button>
                            <button onClick={handleSaveEditSubject} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Syllabus Modal */}
            {selectedSyllabusSubjectIndex !== null && syllabusEditValue !== null && (() => {
                const showExercisesTab = (syllabusEditValue.category || '').toUpperCase().includes('PRACTICAL') || (syllabusEditValue.category || '').toUpperCase().includes('LAB');
                return (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(15, 23, 42, 0.85)', zIndex: 99999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '2rem', backdropFilter: 'blur(8px)'
                    }}>
                        <div style={{
                            background: 'var(--bg-card)', border: '1px solid var(--primary)',
                            borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '850px',
                            maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>
                                    Manage Syllabus: {syllabusEditValue.code} - {syllabusEditValue.title}
                                </h3>
                                <button onClick={() => { setSelectedSyllabusSubjectIndex(null); setSyllabusEditValue(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}><FaTimes /></button>
                            </div>

                            {/* Tabs Navigation */}
                            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                {[
                                    { id: 'objectives-outcomes', label: 'Objectives & Outcomes' },
                                    { id: 'units', label: 'Unit-wise Syllabus' },
                                    ...(showExercisesTab ? [{ id: 'experiments', label: 'List of Exercises' }] : []),
                                    { id: 'textbooks-references', label: 'Textbooks & References' },
                                    { id: 'co-po-mapping', label: 'CO-PO Mapping' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveSyllabusTab(tab.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            background: activeSyllabusTab === tab.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                                            color: activeSyllabusTab === tab.id ? 'white' : 'var(--text-muted)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                        {/* Tab Contents */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {activeSyllabusTab === 'objectives-outcomes' && (
                                <>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Course Subtitle (e.g. Common to all branches)</label>
                                            <input type="text" value={syllabusEditValue.subtitle} onChange={e => setSyllabusEditValue({ ...syllabusEditValue, subtitle: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} placeholder="e.g. Common to all B.E/B.Tech Programmes" />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category Full Name</label>
                                            <input type="text" value={syllabusEditValue.categoryName} onChange={e => setSyllabusEditValue({ ...syllabusEditValue, categoryName: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} placeholder="e.g. Humanities, Social Sciences and Management Course (HSMC)" />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Pre-requisites</label>
                                        <textarea value={syllabusEditValue.prerequisites} onChange={e => setSyllabusEditValue({ ...syllabusEditValue, prerequisites: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', minHeight: '60px', resize: 'vertical' }} placeholder="e.g. Basic knowledge of English grammar..." />
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Course Objectives </h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Objective Description</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {syllabusEditValue.objectives.map((obj, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                            <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                <input 
                                                                    type="text" 
                                                                    value={obj} 
                                                                    onChange={e => {
                                                                        const newObjs = [...syllabusEditValue.objectives];
                                                                        newObjs[idx] = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, objectives: newObjs });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                                                                <button 
                                                                    onClick={() => {
                                                                        const newObjs = syllabusEditValue.objectives.filter((_, i) => i !== idx);
                                                                        setSyllabusEditValue({ ...syllabusEditValue, objectives: newObjs });
                                                                    }} 
                                                                    className="btn btn-danger" 
                                                                    style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {syllabusEditValue.objectives.length === 0 && (
                                                        <tr>
                                                            <td colSpan="3" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No objectives defined. Add one below.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            <input 
                                                type="text" 
                                                id="newObjectiveInput" 
                                                placeholder="Type new course objective description here..." 
                                                style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                            />
                                            <button 
                                                onClick={() => {
                                                    const input = document.getElementById('newObjectiveInput');
                                                    if (input && input.value.trim()) {
                                                        setSyllabusEditValue({ 
                                                            ...syllabusEditValue, 
                                                            objectives: [...syllabusEditValue.objectives, input.value.trim()] 
                                                        });
                                                        input.value = '';
                                                    }
                                                }} 
                                                className="btn btn-primary" 
                                                style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                            >
                                                <FaPlus /> Add Objective
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Course Outcomes (COs) </h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold' }}>CO No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Course Outcome Description</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '22%', color: 'var(--text-main)', fontWeight: 'bold' }}>RBT Level</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {syllabusEditValue.outcomes.map((co, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                <input 
                                                                    type="text" 
                                                                    value={co.coNo} 
                                                                    onChange={e => {
                                                                        const newOutcomes = [...syllabusEditValue.outcomes];
                                                                        newOutcomes[idx].coNo = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontWeight: 'bold' }} 
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                <textarea 
                                                                    value={co.outcome} 
                                                                    onChange={e => {
                                                                        const newOutcomes = [...syllabusEditValue.outcomes];
                                                                        newOutcomes[idx].outcome = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', minHeight: '55px', resize: 'vertical' }} 
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                <select 
                                                                    value={co.rbtLevel} 
                                                                    onChange={e => {
                                                                        const newOutcomes = [...syllabusEditValue.outcomes];
                                                                        newOutcomes[idx].rbtLevel = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                                                >
                                                                    {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(lvl => (
                                                                        <option key={lvl} value={lvl}>{lvl}</option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center', verticalAlign: 'top' }}>
                                                                <button 
                                                                    onClick={() => {
                                                                        const newOutcomes = syllabusEditValue.outcomes.filter((_, i) => i !== idx);
                                                                        setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes });
                                                                    }} 
                                                                    className="btn btn-danger" 
                                                                    style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {syllabusEditValue.outcomes.length === 0 && (
                                                        <tr>
                                                            <td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No course outcomes defined. Add one below.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '15% 55% 20% 10%', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                            <input 
                                                type="text" 
                                                id="newCoNoInput" 
                                                placeholder="CO No" 
                                                defaultValue={`CO${syllabusEditValue.outcomes.length + 1}`}
                                                style={{ padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontWeight: 'bold' }} 
                                            />
                                            <textarea 
                                                id="newOutcomeInput" 
                                                placeholder="Type new course outcome description..." 
                                                style={{ padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', minHeight: '38px', resize: 'vertical' }} 
                                            />
                                            <select 
                                                id="newOutcomeRbtSelect"
                                                defaultValue="Apply"
                                                style={{ padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                            >
                                                {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(lvl => (
                                                    <option key={lvl} value={lvl}>{lvl}</option>
                                                ))}
                                            </select>
                                            <button 
                                                onClick={() => {
                                                    const coNoInput = document.getElementById('newCoNoInput');
                                                    const outcomeInput = document.getElementById('newOutcomeInput');
                                                    const rbtSelect = document.getElementById('newOutcomeRbtSelect');
                                                    if (coNoInput && outcomeInput && rbtSelect && outcomeInput.value.trim()) {
                                                        const newCo = {
                                                            coNo: coNoInput.value.trim() || `CO${syllabusEditValue.outcomes.length + 1}`,
                                                            outcome: outcomeInput.value.trim(),
                                                            rbtLevel: rbtSelect.value
                                                        };
                                                        setSyllabusEditValue({
                                                            ...syllabusEditValue,
                                                            outcomes: [...syllabusEditValue.outcomes, newCo]
                                                        });
                                                        outcomeInput.value = '';
                                                        coNoInput.value = `CO${syllabusEditValue.outcomes.length + 2}`;
                                                    }
                                                }} 
                                                className="btn btn-primary" 
                                                style={{ padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px' }}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                            <button 
                                                onClick={() => setActiveSyllabusTab('units')} 
                                                className="btn btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontWeight: 'bold' }}
                                            >
                                                Next: Unit-wise Syllabus →
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeSyllabusTab === 'units' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.2rem', fontWeight: 'bold' }}>Unit-wise Syllabus </h4>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold' }}>Unit No</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '33%', color: 'var(--text-main)', fontWeight: 'bold' }}>Unit Title</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Topics (One topic per line)</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '10%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {syllabusEditValue.units.map((unit, idx) => (
                                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                            <input 
                                                                type="text" 
                                                                value={unit.unitNo} 
                                                                onChange={e => {
                                                                    const newUnits = [...syllabusEditValue.units];
                                                                    newUnits[idx].unitNo = e.target.value;
                                                                    setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                }} 
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontWeight: 'bold' }} 
                                                            />
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                            <input 
                                                                type="text" 
                                                                value={unit.title} 
                                                                onChange={e => {
                                                                    const newUnits = [...syllabusEditValue.units];
                                                                    newUnits[idx].title = e.target.value;
                                                                    setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                }} 
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                                            />
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                            <textarea 
                                                                value={unit.topics.join('\n')} 
                                                                onChange={e => {
                                                                    const newUnits = [...syllabusEditValue.units];
                                                                    newUnits[idx].topics = e.target.value.split('\n');
                                                                    setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                }} 
                                                                placeholder="Enter topics, one per line..."
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', minHeight: '80px', resize: 'vertical', fontSize: '0.85rem' }} 
                                                            />
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top', textAlign: 'center' }}>
                                                            <button 
                                                                onClick={() => {
                                                                    const newUnits = syllabusEditValue.units.filter((_, i) => i !== idx);
                                                                    setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                }} 
                                                                className="btn btn-danger" 
                                                                style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                            >
                                                                    <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {syllabusEditValue.units.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No units defined. Add one below.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '15% 35% 40% 10%', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <input 
                                            type="text" 
                                            id="newUnitNoInput" 
                                            placeholder="Unit No" 
                                            defaultValue={`UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][syllabusEditValue.units.length] || (syllabusEditValue.units.length + 1)}`}
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontWeight: 'bold' }} 
                                        />
                                        <input 
                                            type="text" 
                                            id="newUnitTitleInput" 
                                            placeholder="Unit Title (e.g. INTRODUCTION)..." 
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                        />
                                        <textarea 
                                            id="newUnitTopicsInput" 
                                            placeholder="Enter topics, one per line..." 
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', minHeight: '38px', resize: 'vertical', fontSize: '0.85rem' }} 
                                        />
                                        <button 
                                            onClick={() => {
                                                const unitNoInput = document.getElementById('newUnitNoInput');
                                                const titleInput = document.getElementById('newUnitTitleInput');
                                                const topicsInput = document.getElementById('newUnitTopicsInput');
                                                if (unitNoInput && titleInput && topicsInput && (titleInput.value.trim() || topicsInput.value.trim())) {
                                                    const newUnit = {
                                                        unitNo: unitNoInput.value.trim() || `UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI'][syllabusEditValue.units.length] || (syllabusEditValue.units.length + 1)}`,
                                                        title: titleInput.value.trim(),
                                                        topics: topicsInput.value.trim().split('\n').filter(t => t.trim() !== '')
                                                    };
                                                    setSyllabusEditValue({
                                                        ...syllabusEditValue,
                                                        units: [...syllabusEditValue.units, newUnit]
                                                    });
                                                    titleInput.value = '';
                                                    topicsInput.value = '';
                                                    unitNoInput.value = `UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][syllabusEditValue.units.length + 1] || (syllabusEditValue.units.length + 2)}`;
                                                }
                                            }} 
                                            className="btn btn-primary" 
                                            style={{ width: '100%', padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px' }}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                        <button 
                                            onClick={() => setActiveSyllabusTab(showExercisesTab ? 'experiments' : 'textbooks-references')} 
                                            className="btn btn-primary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontWeight: 'bold' }}
                                        >
                                            {showExercisesTab ? 'Next: List of Exercises →' : 'Next: Textbooks & References →'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeSyllabusTab === 'experiments' && showExercisesTab && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.2rem', fontWeight: 'bold' }}>List of Exercises</h4>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '10%', color: 'var(--text-main)', fontWeight: 'bold', textAlign: 'center' }}>S.No</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '58%', color: 'var(--text-main)', fontWeight: 'bold' }}>Exercise / Experiment Name</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold', textAlign: 'center' }}>CO</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold', textAlign: 'center' }}>RBT Level</th>
                                                    <th style={{ padding: '0.6rem 0.75rem', width: '8%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(syllabusEditValue.experiments || []).map((exp, idx) => (
                                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                value={exp.sNo || ''} 
                                                                onChange={e => {
                                                                    const newExps = [...(syllabusEditValue.experiments || [])];
                                                                    newExps[idx].sNo = e.target.value;
                                                                    setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                }} 
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', textAlign: 'center' }} 
                                                            />
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle' }}>
                                                            <input 
                                                                type="text" 
                                                                value={exp.name || ''} 
                                                                onChange={e => {
                                                                    const newExps = [...(syllabusEditValue.experiments || [])];
                                                                    newExps[idx].name = e.target.value;
                                                                    setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                }} 
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                                            />
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                            <input 
                                                                type="text" 
                                                                value={exp.co || ''} 
                                                                onChange={e => {
                                                                    const newExps = [...(syllabusEditValue.experiments || [])];
                                                                    newExps[idx].co = e.target.value;
                                                                    setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                }} 
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', textAlign: 'center' }} 
                                                            />
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                            <select 
                                                                value={exp.rbtLevel || 'Apply'} 
                                                                onChange={e => {
                                                                    const newExps = [...(syllabusEditValue.experiments || [])];
                                                                    newExps[idx].rbtLevel = e.target.value;
                                                                    setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                }} 
                                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                                            >
                                                                {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(lvl => (
                                                                    <option key={lvl} value={lvl}>{lvl}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                            <button 
                                                                onClick={() => {
                                                                    const newExps = (syllabusEditValue.experiments || []).filter((_, i) => i !== idx);
                                                                    setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                }} 
                                                                className="btn btn-danger" 
                                                                style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {(!syllabusEditValue.experiments || syllabusEditValue.experiments.length === 0) && (
                                                    <tr>
                                                        <td colSpan="5" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No exercises defined. Add one below.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '10% 54% 12% 16% 8%', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <input 
                                            type="text" 
                                            id="newExpSNoInput" 
                                            placeholder="S.No" 
                                            defaultValue={(syllabusEditValue.experiments || []).length + 1}
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontWeight: 'bold', textAlign: 'center' }} 
                                        />
                                        <input 
                                            type="text" 
                                            id="newExpNameInput" 
                                            placeholder="Experiment Name..." 
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                        />
                                        <input 
                                            type="text" 
                                            id="newExpCoInput" 
                                            placeholder="CO" 
                                            defaultValue="CO1"
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', textAlign: 'center' }} 
                                        />
                                        <select 
                                            id="newExpRbtSelect"
                                            defaultValue="Apply"
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                        >
                                            {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(lvl => (
                                                <option key={lvl} value={lvl}>{lvl}</option>
                                            ))}
                                        </select>
                                        <button 
                                            onClick={() => {
                                                const sNoInput = document.getElementById('newExpSNoInput');
                                                const nameInput = document.getElementById('newExpNameInput');
                                                const coInput = document.getElementById('newExpCoInput');
                                                const rbtSelect = document.getElementById('newExpRbtSelect');
                                                if (sNoInput && nameInput && coInput && rbtSelect && nameInput.value.trim()) {
                                                    const newExp = {
                                                        sNo: sNoInput.value.trim() || String((syllabusEditValue.experiments || []).length + 1),
                                                        name: nameInput.value.trim(),
                                                        co: coInput.value.trim() || 'CO1',
                                                        rbtLevel: rbtSelect.value
                                                    };
                                                    const updatedExps = [...(syllabusEditValue.experiments || []), newExp];
                                                    setSyllabusEditValue({
                                                        ...syllabusEditValue,
                                                        experiments: updatedExps
                                                    });
                                                    nameInput.value = '';
                                                    sNoInput.value = String(updatedExps.length + 1);
                                                }
                                            }} 
                                            className="btn btn-primary" 
                                            style={{ width: '100%', padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px' }}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                        <button 
                                            onClick={() => setActiveSyllabusTab('textbooks-references')} 
                                            className="btn btn-primary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontWeight: 'bold' }}
                                        >
                                            Next: Textbooks & References →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeSyllabusTab === 'textbooks-references' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Textbooks </h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Textbook details (title, authors, publisher, year)</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {syllabusEditValue.textbooks.map((tb, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                            <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                <input 
                                                                    type="text" 
                                                                    value={tb} 
                                                                    onChange={e => {
                                                                        const newTbs = [...syllabusEditValue.textbooks];
                                                                        newTbs[idx] = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, textbooks: newTbs });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                                                                <button 
                                                                    onClick={() => {
                                                                        const newTbs = syllabusEditValue.textbooks.filter((_, i) => i !== idx);
                                                                        setSyllabusEditValue({ ...syllabusEditValue, textbooks: newTbs });
                                                                    }} 
                                                                    className="btn btn-danger" 
                                                                    style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {syllabusEditValue.textbooks.length === 0 && (
                                                        <tr>
                                                            <td colSpan="3" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No textbooks defined. Add one below.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input 
                                                type="text" 
                                                id="newTextbookInput" 
                                                placeholder="Enter textbook title, authors, publisher, year..." 
                                                style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                            />
                                            <button 
                                                onClick={() => {
                                                    const input = document.getElementById('newTextbookInput');
                                                    if (input && input.value.trim()) {
                                                        setSyllabusEditValue({ 
                                                            ...syllabusEditValue, 
                                                            textbooks: [...syllabusEditValue.textbooks, input.value.trim()] 
                                                        });
                                                        input.value = '';
                                                    }
                                                }} 
                                                className="btn btn-primary" 
                                                style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                            >
                                                <FaPlus /> Add Textbook
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Reference Books</h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Reference book details (title, authors, publisher, year)</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {syllabusEditValue.references.map((ref, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                            <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                <input 
                                                                    type="text" 
                                                                    value={ref} 
                                                                    onChange={e => {
                                                                        const newRefs = [...syllabusEditValue.references];
                                                                        newRefs[idx] = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, references: newRefs });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                                                                <button 
                                                                    onClick={() => {
                                                                        const newRefs = syllabusEditValue.references.filter((_, i) => i !== idx);
                                                                        setSyllabusEditValue({ ...syllabusEditValue, references: newRefs });
                                                                    }} 
                                                                    className="btn btn-danger" 
                                                                    style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {syllabusEditValue.references.length === 0 && (
                                                        <tr>
                                                            <td colSpan="3" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No references defined. Add one below.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input 
                                                type="text" 
                                                id="newReferenceInput" 
                                                placeholder="Enter reference book title, authors, publisher, year..." 
                                                style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                            />
                                            <button 
                                                onClick={() => {
                                                    const input = document.getElementById('newReferenceInput');
                                                    if (input && input.value.trim()) {
                                                        setSyllabusEditValue({ 
                                                            ...syllabusEditValue, 
                                                            references: [...syllabusEditValue.references, input.value.trim()] 
                                                        });
                                                        input.value = '';
                                                    }
                                                }} 
                                                className="btn btn-primary" 
                                                style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }} 
                                            >
                                                <FaPlus /> Add Reference
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Additional / Web References</h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Web reference URL</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(syllabusEditValue.webReferences || []).map((web, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                            <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                <input 
                                                                    type="text" 
                                                                    value={web} 
                                                                    onChange={e => {
                                                                        const newWebs = [...(syllabusEditValue.webReferences || [])];
                                                                        newWebs[idx] = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, webReferences: newWebs });
                                                                    }} 
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>
                                                                <button 
                                                                    onClick={() => {
                                                                        const newWebs = (syllabusEditValue.webReferences || []).filter((_, i) => i !== idx);
                                                                        setSyllabusEditValue({ ...syllabusEditValue, webReferences: newWebs });
                                                                    }} 
                                                                    className="btn btn-danger" 
                                                                    style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {(!syllabusEditValue.webReferences || syllabusEditValue.webReferences.length === 0) && (
                                                        <tr>
                                                            <td colSpan="3" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No web references defined. Add one below.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input 
                                                type="text" 
                                                id="newWebReferenceInput" 
                                                placeholder="Enter web reference URL (e.g., https://example.com)..." 
                                                style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none' }} 
                                            />
                                            <button 
                                                onClick={() => {
                                                    const input = document.getElementById('newWebReferenceInput');
                                                    if (input && input.value.trim()) {
                                                        setSyllabusEditValue({ 
                                                            ...syllabusEditValue, 
                                                            webReferences: [...(syllabusEditValue.webReferences || []), input.value.trim()] 
                                                        });
                                                        input.value = '';
                                                    }
                                                }} 
                                                className="btn btn-primary" 
                                                style={{ padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                            >
                                                <FaPlus /> Add Web Reference
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSyllabusTab === 'co-po-mapping' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <h4 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                        Mapping of Course Outcomes (COs) with Programme Outcomes (POs) & Programme Specific Outcomes (PSOs)
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        Select correlation levels: <strong>3</strong> (High), <strong>2</strong> (Medium), <strong>1</strong> (Low), or <strong>-</strong> (No Correlation).
                                    </p>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                            <thead>
                                                <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                                                    <th style={{ padding: '0.6rem 0.5rem', color: 'var(--text-main)', fontWeight: 'bold', minWidth: '80px' }}>COs</th>
                                                    {Array.from({ length: data.po?.length || 12 }).map((_, i) => (
                                                        <th key={i} style={{ padding: '0.6rem 0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>PO{i + 1}</th>
                                                    ))}
                                                    {Array.from({ length: data.pso?.length || 2 }).map((_, i) => (
                                                        <th key={i} style={{ padding: '0.6rem 0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>PSO{i + 1}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(syllabusEditValue.coPoMapping || []).map((row, rIdx) => (
                                                    <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                        <td style={{ padding: '0.5rem 0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{row.coNo}</td>
                                                        {Array.from({ length: data.po?.length || 12 }).map((_, i) => {
                                                            const key = `po${i + 1}`;
                                                            return (
                                                                <td key={i} style={{ padding: '0.3rem 0.2rem' }}>
                                                                    <select
                                                                        value={row[key] || '-'}
                                                                        onChange={e => {
                                                                            const newMapping = [...(syllabusEditValue.coPoMapping || [])];
                                                                            newMapping[rIdx] = { ...row, [key]: e.target.value };
                                                                            setSyllabusEditValue({ ...syllabusEditValue, coPoMapping: newMapping });
                                                                        }}
                                                                        style={{ padding: '0.3rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', width: '50px', textAlign: 'center' }}
                                                                    >
                                                                        <option value="-">-</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </td>
                                                            );
                                                        })}
                                                        {Array.from({ length: data.pso?.length || 2 }).map((_, i) => {
                                                            const key = `pso${i + 1}`;
                                                            return (
                                                                <td key={i} style={{ padding: '0.3rem 0.2rem' }}>
                                                                    <select
                                                                        value={row[key] || '-'}
                                                                        onChange={e => {
                                                                            const newMapping = [...(syllabusEditValue.coPoMapping || [])];
                                                                            newMapping[rIdx] = { ...row, [key]: e.target.value };
                                                                            setSyllabusEditValue({ ...syllabusEditValue, coPoMapping: newMapping });
                                                                        }}
                                                                        style={{ padding: '0.3rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', width: '50px', textAlign: 'center' }}
                                                                    >
                                                                        <option value="-">-</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                    </select>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                                {/* Calculated Average Row */}
                                                <tr style={{ background: 'rgba(255, 255, 255, 0.02)', fontWeight: 'bold', borderTop: '2px solid var(--glass-border)' }}>
                                                    <td style={{ padding: '0.5rem 0.5rem', color: 'var(--primary)' }}>Average</td>
                                                    {Array.from({ length: data.po?.length || 12 }).map((_, i) => {
                                                        const key = `po${i + 1}`;
                                                        const values = (syllabusEditValue.coPoMapping || []).map(row => row[key]).filter(v => v && v !== '-').map(Number);
                                                        const avg = values.length > 0 ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1).replace('.0', '') : '-';
                                                        return <td key={i} style={{ padding: '0.5rem 0.5rem', color: 'var(--primary)' }}>{avg}</td>;
                                                    })}
                                                    {Array.from({ length: data.pso?.length || 2 }).map((_, i) => {
                                                        const key = `pso${i + 1}`;
                                                        const values = (syllabusEditValue.coPoMapping || []).map(row => row[key]).filter(v => v && v !== '-').map(Number);
                                                        const avg = values.length > 0 ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1).replace('.0', '') : '-';
                                                        return <td key={i} style={{ padding: '0.5rem 0.5rem', color: 'var(--primary)' }}>{avg}</td>;
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                                <button onClick={() => { setSelectedSyllabusSubjectIndex(null); setSyllabusEditValue(null); }} className="btn" style={{ padding: '0.6rem 1.2rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>Cancel</button>
                                <button onClick={handleSaveSyllabus} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Save Syllabus</button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default DepartmentManager;
