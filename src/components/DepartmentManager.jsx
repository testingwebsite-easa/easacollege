import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaFilePdf, FaBook, FaBookOpen, FaCheckCircle, FaExclamationTriangle, FaListAlt, FaLock, FaInfoCircle, FaBullseye, FaGraduationCap, FaLightbulb, FaChartBar, FaCalendarAlt, FaPrint } from 'react-icons/fa';
import { departments as staticDepartments } from '../data/departmentsData';
import { getDetailedSyllabusForSubject, SYLLABUS_DATA } from '../data/syllabusData';
import { sanitizeCoPoMapping, sortSubjectsByCode } from '../utils/coPoMappingUtils';
import {
    CURRICULUM_11_COLGROUP,
    CURRICULUM_10_COLGROUP,
    buildCurriculumTableHeadRows,
    buildLanguageElectiveBlockHTML,
    isMBADepartment,
    classifyMbaSemesterCourses,
    classifyMbaSubjectCategory,
    buildMbaSemesterSectionHTML,
    buildMbaPecSectionHTML,
    buildMbaCreditDistributionHTML,
    withMbaDefaultElectivesIfMissing
} from '../utils/curriculumTableTemplate';
import MbaCreditSummary from './MbaCreditSummary';
import collegeLogo from '../assets/EASA College Logo.webp';
import API_BASE_URL from '../api';

const getDeptDisplayName = (slugOrName) => {
    if (!slugOrName) return '';
    const found = staticDepartments.find(d => d.slug === slugOrName || d.name?.toLowerCase() === slugOrName?.toLowerCase());
    if (found) return found.name;
    return slugOrName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getRomanNumeral = (num) => {
    const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return roman[Number(num)] || num;
};

const renderPieChart = (categories, rowTotals, grandTotal) => {
    const colors = {
        'HUM': '#6366f1', // Indigo
        'BSC': '#3b82f6',  // Blue
        'ESC': '#10b981',  // Emerald
        'PCC': '#f59e0b',  // Amber
        'PEC': '#ec4899',  // Pink
        'NFE': '#f97316',  // Orange (Non-Functional Elective)
        'OEC': '#8b5cf6',  // Violet
        'EEC': '#06b6d4',  // Cyan
        'IPR': '#84cc16',  // Lime / Green
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

const renderCreditDistributionTable = (subjects, isMBA = false, deptName = '') => {
    if (!subjects || subjects.length === 0) return null;
    if (isMBA) {
        return <MbaCreditSummary subjects={subjects} deptName={deptName} />;
    }

    const hasIPR = (subjects || []).some(s => (s.categoryType || '').toUpperCase() === 'IPR' || (s.category || '').toUpperCase().includes('IPR') || (s.category || '').toUpperCase().includes('RESEARCH METHODOLOGY'));
    const categories = ['HUM', 'BSC', 'ESC', 'PCC', 'PEC', 'NFE', 'OEC', 'EEC', 'MC'];
    if (hasIPR) {
        categories.push('IPR');
    }
    const categoryLabels = {
        'HUM': 'Humanities and Social Sciences including Management Courses (HUM)',
        'BSC': 'Basic Science Courses (BSC)',
        'ESC': 'Engineering Science Courses (ESC)',
        'PCC': 'Professional Core Courses (PCC)',
        'PEC': 'Professional Elective Courses (PEC)',
        'NFE': 'Non-Functional Elective Courses (NFE)',
        'OEC': 'Open Elective Courses (OEC)',
        'EEC': 'Employability Enhancement Courses (EEC)',
        'MC': 'Mandatory Courses (MC)',
        'IPR': 'Research Methodology and IPR (IPR)'
    };

    const distribution = {};
    [...categories, 'IPR'].forEach(cat => {
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
        } else if (subj.categoryType === 'IPR' || (subj.categoryType || '').toUpperCase() === 'IPR' || (subj.category || '').toUpperCase().includes('IPR') || (subj.category || '').toUpperCase().includes('RESEARCH METHODOLOGY')) {
            cat = 'IPR';
        } else if (subj.categoryType === 'NFE' || (subj.category || '').toUpperCase().includes('NON-FUNCTIONAL') || (subj.category || '').toUpperCase().includes('NON FUNCTIONAL') || (subj.category || '').toUpperCase().includes('NFE')) {
            cat = 'NFE';
        } else if (subj.vertical) {
            cat = 'PEC';
        } else {
            const rawCat = (subj.categoryType || subj.category || '').toUpperCase().trim();
            if (rawCat === 'IPR' || rawCat.includes('IPR') || rawCat.includes('RESEARCH METHODOLOGY')) cat = 'IPR';
            else if (rawCat === 'NFE' || rawCat.includes('NON-FUNCTIONAL') || rawCat.includes('NON FUNCTIONAL')) cat = 'NFE';
            else if (rawCat === 'HS' || rawCat === 'HUM' || rawCat.includes('HUMANITIES')) cat = 'HUM';
            else if (rawCat === 'BS' || rawCat === 'BSC' || rawCat.includes('BASIC')) cat = 'BSC';
            else if (rawCat === 'ES' || rawCat === 'ESC' || rawCat.includes('ENGINEERING')) cat = 'ESC';
            else if (rawCat === 'PC' || rawCat === 'PCC' || rawCat.includes('CORE')) cat = 'PCC';
            else if (rawCat === 'PE' || rawCat === 'PEC' || rawCat.includes('ELECTIVE')) cat = 'PEC';
            else if (rawCat === 'OE' || rawCat === 'OEC' || rawCat.includes('OPEN')) cat = 'OEC';
            else if (rawCat === 'EE' || rawCat === 'EEC' || rawCat.includes('EMPLOYABILITY') || rawCat.includes('PROJECT')) cat = 'EEC';
            else if (rawCat === 'MC' || rawCat.includes('MANDATORY')) cat = 'MC';
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
    const rawDept = String(deptName || '').trim();
    const rawDeptLower = rawDept.toLowerCase();
    const reg = regYear || 'R-2026';

    if (
        rawDeptLower.includes('science and humanities') ||
        rawDeptLower.includes('science & humanities') ||
        rawDeptLower.includes('sciences and humanities') ||
        (rawDeptLower.includes('science') && rawDeptLower.includes('humanities')) ||
        rawDeptLower === 's&h' ||
        rawDeptLower === 'sh' ||
        rawDeptLower === 'science-and-humanities'
    ) {
        return `B.E. / B.Tech. Programmes (${reg})`;
    }

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
    return `${cleanPrefix ? `${cleanPrefix} ` : ''}${formattedDept} (${reg})`.trim();
};

const getPdfPaginationScript = (maxContentHeightMm, startPageNum) => `
<script>
(function paginatePdfPages() {
    if (window.__pdfPaginated) return;
    window.__pdfPaginated = true;

    var MAX_HEIGHT_MM = ${maxContentHeightMm};
    var START_PAGE_NUM = ${startPageNum};
    var INLINE_TAGS = {
        A: 1, ABBR: 1, B: 1, BDI: 1, BDO: 1, BR: 1, CITE: 1, CODE: 1, DATA: 1, DFN: 1,
        EM: 1, I: 1, IMG: 1, KBD: 1, LABEL: 1, MARK: 1, Q: 1, S: 1, SAMP: 1, SMALL: 1,
        SPAN: 1, STRONG: 1, SUB: 1, SUP: 1, SVG: 1, TIME: 1, U: 1, VAR: 1, WBR: 1
    };

    function measurePxPerMm() {
        var probe = document.createElement('div');
        probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:100mm;height:100mm;padding:0;margin:0;border:0;visibility:hidden;pointer-events:none;';
        document.body.appendChild(probe);
        var h = probe.getBoundingClientRect().height;
        document.body.removeChild(probe);
        return h > 0 ? h / 100 : (96 / 25.4);
    }

    function getDirectHeader(page) {
        for (var i = 0; i < page.children.length; i++) {
            if (page.children[i].classList.contains('pdf-header')) return page.children[i];
        }
        return null;
    }

    function getDirectFooter(page) {
        for (var i = page.children.length - 1; i >= 0; i--) {
            if (page.children[i].classList.contains('pdf-footer')) return page.children[i];
        }
        return null;
    }

    function normalizePage(page) {
        var header = getDirectHeader(page);
        var footer = getDirectFooter(page);
        var body = null;
        var extraNodes = [];
        for (var i = 0; i < page.children.length; i++) {
            var ch = page.children[i];
            if (ch === header || ch === footer) continue;
            if (!body && (ch.classList.contains('page-body') || ch.classList.contains('syllabus-page-content')) && page.children.length <= 3) {
                body = ch;
            } else {
                extraNodes.push(ch);
            }
        }
        if (!body) {
            body = document.createElement('div');
            body.className = 'page-body';
            extraNodes.forEach(function (n) { body.appendChild(n); });
            if (footer) {
                page.insertBefore(body, footer);
            } else {
                page.appendChild(body);
            }
        } else if (extraNodes.length > 0) {
            extraNodes.forEach(function (n) { body.appendChild(n); });
        }
        return { header: header, body: body, footer: footer };
    }

    function enterMeasureMode(page, body, footer) {
        page.style.setProperty('min-height', '0px', 'important');
        page.style.setProperty('height', 'auto', 'important');
        page.style.setProperty('justify-content', 'flex-start', 'important');
        body.style.setProperty('flex', '0 0 auto', 'important');
        if (footer) {
            footer.style.setProperty('margin-top', '0px', 'important');
        }
    }

    function exitMeasureMode(page, body, footer) {
        page.style.removeProperty('min-height');
        page.style.removeProperty('height');
        page.style.removeProperty('justify-content');
        body.style.removeProperty('flex');
        if (footer) {
            footer.style.removeProperty('margin-top');
        }
    }

    function isHeadingOrLabel(el) {
        if (!el || el.nodeType !== 1) return false;
        var tag = el.tagName;
        if (/^H[1-6]$/.test(tag)) return true;
        if (el.classList.contains('section-title') || el.classList.contains('title-block')) return true;
        if (tag === 'P' && el.getBoundingClientRect().height < 42) {
            var txt = (el.textContent || '').trim();
            if (txt.length < 140) return true;
        }
        if (tag === 'DIV' && el.children.length === 0 && el.getBoundingClientRect().height < 45) {
            var cs = getComputedStyle(el);
            if ((parseInt(cs.fontWeight, 10) >= 600 || cs.fontWeight === 'bold') && (el.textContent || '').trim().length < 160) {
                return true;
            }
        }
        return false;
    }

    function isTotalFooterNode(el) {
        if (!el || el.nodeType !== 1) return false;
        var txt = (el.textContent || '').trim();
        return /^TOTAL\\s*:/i.test(txt) && txt.length < 60;
    }

    function isGroupHeaderRow(tr) {
        if (!tr) return false;
        if (tr.classList.contains('category-row')) return true;
        if (tr.cells && tr.cells.length === 1 && (tr.cells[0].colSpan || 1) >= 4) {
            var txt = (tr.textContent || '').trim();
            if (!/^TOTAL$/i.test(txt)) return true;
        }
        return false;
    }

    function isTotalRow(tr) {
        if (!tr || !tr.cells || tr.cells.length === 0) return false;
        for (var c = 0; c < Math.min(tr.cells.length, 3); c++) {
            var txt = (tr.cells[c].textContent || '').trim();
            if (/^TOTAL(\b|:|\s)/i.test(txt) || /^TOTAL$/i.test(txt)) return true;
        }
        return false;
    }

    function isSplittableElement(el, availableHeightPx) {
        if (!el || el.nodeType !== 1) return false;
        if (el.classList.contains('title-block') || el.classList.contains('pie-chart-block') || el.classList.contains('co-po-block')) return false;
        var tag = el.tagName;
        var rect = el.getBoundingClientRect();
        var cs = getComputedStyle(el);

        if (tag === 'TABLE') {
            var tbody = el.tBodies && el.tBodies.length === 1 ? el.tBodies[0] : null;
            if (!tbody || tbody.rows.length < 2) return false;
            if (tbody.querySelector('[rowspan]')) return false;
            var avoidBreak = cs.pageBreakInside === 'avoid' || cs.breakInside === 'avoid';
            if (avoidBreak && rect.height < availableHeightPx * 0.8) return false;
            return true;
        }

        if (tag === 'OL' || tag === 'UL') {
            return el.children.length >= 2;
        }

        if (tag !== 'DIV' && tag !== 'SECTION' && tag !== 'ARTICLE') return false;
        if (el.querySelector('svg') && rect.height < availableHeightPx * 0.85) return false;
        if (cs.display && cs.display.indexOf('flex') !== -1 && cs.flexDirection !== 'column') return false;

        var avoid = cs.pageBreakInside === 'avoid' || cs.breakInside === 'avoid';
        if (avoid && rect.height < availableHeightPx * 0.8) return false;

        var hasBlockChild = false;
        for (var i = 0; i < el.children.length; i++) {
            if (!INLINE_TAGS[el.children[i].tagName]) {
                hasBlockChild = true;
                break;
            }
        }
        return hasBlockChild;
    }

    function splitTable(table, maxBodyBottom) {
        var tbody = table.tBodies[0];
        var rows = Array.prototype.slice.call(tbody.rows);
        if (rows.length < 2) return null;

        if (table.tHead && table.tHead.getBoundingClientRect().bottom > maxBodyBottom) {
            return null;
        }

        var splitIdx = -1;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].getBoundingClientRect().bottom > maxBodyBottom) {
                splitIdx = i;
                break;
            }
        }
        if (splitIdx === -1) {
            splitIdx = rows.length - 1;
        }

        if (rows.length >= 4) {
            if (isTotalRow(rows[rows.length - 1])) {
                if (splitIdx >= rows.length - 1) {
                    splitIdx = rows.length - 2;
                }
                if (splitIdx === rows.length - 2 && rows.length >= 4) {
                    splitIdx = rows.length - 3;
                }
            }
        } else if (splitIdx === rows.length - 1 && isTotalRow(rows[splitIdx]) && rows.length >= 3) {
            splitIdx--;
        }

        while (splitIdx > 0 && isGroupHeaderRow(rows[splitIdx - 1])) {
            splitIdx--;
        }

        if (splitIdx <= 0) return null;

        var cloneTable = table.cloneNode(false);
        var colgroup = table.querySelector('colgroup');
        if (colgroup) cloneTable.appendChild(colgroup.cloneNode(true));
        if (table.tHead) cloneTable.appendChild(table.tHead.cloneNode(true));

        var cloneTbody = tbody.cloneNode(false);
        for (var j = splitIdx; j < rows.length; j++) {
            cloneTbody.appendChild(rows[j]);
        }
        cloneTable.appendChild(cloneTbody);

        if (table.tFoot) {
            cloneTable.appendChild(table.tFoot);
        }

        table.style.marginBottom = '4px';
        return cloneTable;
    }

    function splitList(listEl, maxBodyBottom) {
        var items = Array.prototype.slice.call(listEl.children);
        if (items.length < 2) return null;

        var splitIdx = -1;
        for (var i = 0; i < items.length; i++) {
            if (items[i].getBoundingClientRect().bottom > maxBodyBottom) {
                splitIdx = i;
                break;
            }
        }
        if (splitIdx === -1) splitIdx = items.length - 1;
        if (splitIdx <= 0) return null;

        var cloneList = listEl.cloneNode(false);
        if (listEl.tagName === 'OL') {
            var baseStart = (typeof listEl.start === 'number' && listEl.start > 0) ? listEl.start : 1;
            cloneList.start = baseStart + splitIdx;
        }
        for (var j = splitIdx; j < items.length; j++) {
            cloneList.appendChild(items[j]);
        }
        listEl.style.marginBottom = '4px';
        return cloneList;
    }

    function splitContainer(container, maxBodyBottom, availableHeightPx, isRootBody) {
        var children = Array.prototype.slice.call(container.children);
        if (children.length === 0) return null;

        var overflowIdx = -1;
        for (var i = 0; i < children.length; i++) {
            if (children[i].getBoundingClientRect().bottom > maxBodyBottom) {
                overflowIdx = i;
                break;
            }
        }
        if (overflowIdx === -1) return null;

        var target = children[overflowIdx];
        var targetRect = target.getBoundingClientRect();
        var canTryInnerSplit = isSplittableElement(target, availableHeightPx) &&
            (targetRect.top < maxBodyBottom - 22 || overflowIdx === 0);

        if (canTryInnerSplit) {
            var splitPart = null;
            if (target.tagName === 'TABLE') {
                splitPart = splitTable(target, maxBodyBottom);
            } else if (target.tagName === 'OL' || target.tagName === 'UL') {
                splitPart = splitList(target, maxBodyBottom);
            } else {
                splitPart = splitContainer(target, maxBodyBottom, availableHeightPx, false);
            }
            if (splitPart) {
                var outWrap = container.cloneNode(false);
                outWrap.appendChild(splitPart);
                for (var k = overflowIdx + 1; k < children.length; k++) {
                    outWrap.appendChild(children[k]);
                }
                return outWrap;
            }
        }

        var moveFromIdx = overflowIdx;
        while (moveFromIdx > 0 && isHeadingOrLabel(children[moveFromIdx - 1])) {
            moveFromIdx--;
        }

        if (moveFromIdx > 1 && moveFromIdx === children.length - 1 && isTotalFooterNode(children[moveFromIdx])) {
            moveFromIdx--;
            while (moveFromIdx > 0 && isHeadingOrLabel(children[moveFromIdx - 1])) {
                moveFromIdx--;
            }
        }

        if (moveFromIdx === 1 && moveFromIdx === children.length - 1 && isTotalFooterNode(children[moveFromIdx])) {
            var prevChild = children[0];
            if (isSplittableElement(prevChild, availableHeightPx)) {
                var forcedCutoff = prevChild.getBoundingClientRect().bottom - 20;
                var forcedSplit = prevChild.tagName === 'TABLE'
                    ? splitTable(prevChild, forcedCutoff)
                    : (prevChild.tagName === 'OL' || prevChild.tagName === 'UL')
                        ? splitList(prevChild, forcedCutoff)
                        : splitContainer(prevChild, forcedCutoff, availableHeightPx, false);
                if (forcedSplit) {
                    var totalWrap = container.cloneNode(false);
                    totalWrap.appendChild(forcedSplit);
                    totalWrap.appendChild(children[1]);
                    return totalWrap;
                }
            }
        }

        if (moveFromIdx === 0) {
            if (!isRootBody) return null;
            if (children.length > 1) {
                moveFromIdx = 1;
            } else {
                return null;
            }
        }

        var movedWrap = container.cloneNode(false);
        for (var m = moveFromIdx; m < children.length; m++) {
            movedWrap.appendChild(children[m]);
        }
        return movedWrap;
    }

    function createContinuationPage(sourcePage, header, overflowBody, footer) {
        var newPage = sourcePage.cloneNode(false);
        newPage.style.removeProperty('min-height');
        newPage.style.removeProperty('height');
        newPage.style.removeProperty('justify-content');
        if (header) {
            newPage.appendChild(header.cloneNode(true));
        }
        overflowBody.style.removeProperty('flex');
        overflowBody.style.marginTop = '0px';
        newPage.appendChild(overflowBody);
        if (footer) {
            newPage.appendChild(footer.cloneNode(true));
        }
        return newPage;
    }

    var pxPerMm = measurePxPerMm();
    var maxHeightPx = MAX_HEIGHT_MM * pxPerMm;
    var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
    var guard = 0;

    for (var p = 0; p < pages.length && guard < 2000; p++) {
        guard++;
        var page = pages[p];
        var parts = normalizePage(page);
        if (!parts.body || parts.body.children.length === 0) continue;

        enterMeasureMode(page, parts.body, parts.footer);

        var topAnchor = parts.header ? parts.header.getBoundingClientRect().top : parts.body.getBoundingClientRect().top;
        var bottomAnchor = parts.footer ? parts.footer.getBoundingClientRect().bottom : parts.body.getBoundingClientRect().bottom;
        var naturalHeight = bottomAnchor - topAnchor;

        if (naturalHeight > maxHeightPx) {
            var footerHeight = parts.footer ? parts.footer.getBoundingClientRect().height : 0;
            var bodyTop = parts.body.getBoundingClientRect().top;
            var maxBodyBottom = topAnchor + maxHeightPx - footerHeight - 8;
            var availableBodyHeight = Math.max(120, maxBodyBottom - bodyTop);

            var overflowBody = splitContainer(parts.body, maxBodyBottom, availableBodyHeight, true);
            if (overflowBody && overflowBody.children.length > 0 && parts.body.children.length > 0) {
                var nextPage = createContinuationPage(page, parts.header, overflowBody, parts.footer);
                page.parentNode.insertBefore(nextPage, page.nextSibling);
                pages.splice(p + 1, 0, nextPage);
            }
        }

        exitMeasureMode(page, parts.body, parts.footer);
    }

    var allPages = document.querySelectorAll('.page');
    for (var idx = 0; idx < allPages.length; idx++) {
        var centerEl = allPages[idx].querySelector('.pdf-footer .footer-center');
        if (centerEl) {
            centerEl.textContent = String(START_PAGE_NUM + idx);
        }
    }
})();
</script>
`;

const getCreditDistributionHTML = (subjects, pageTracker, bosMeetingDate, acMeetingDate, degreePrefix, deptName, regYear) => {
    const pageNum = ++pageTracker.current;
    if (isMBADepartment(deptName, degreePrefix)) {
        return buildMbaCreditDistributionHTML({
            rawSubjects: subjects,
            pageNum,
            bosMeetingDate,
            acMeetingDate,
            degreePrefix,
            deptName,
            regYear,
            formatDeptHeaderTitle
        });
    }
    const isPG = (degreePrefix || '').toUpperCase().includes('M.') || (deptName || '').toUpperCase().includes('M.E.') || (deptName || '').toUpperCase().includes('M.TECH');
    const hasIPR = isPG || (subjects || []).some(s => (s.categoryType || '').toUpperCase() === 'IPR' || (s.category || '').toUpperCase().includes('IPR') || (s.category || '').toUpperCase().includes('RESEARCH METHODOLOGY'));
    const categories = ['HUM', 'BSC', 'ESC', 'PCC', 'PEC', 'NFE', 'OEC', 'EEC', 'MC'];
    if (hasIPR) {
        categories.push('IPR');
    }
    const categoryLabels = {
        'HUM': 'Humanities and Social Sciences including Management Courses (HUM)',
        'BSC': 'Basic Science Courses (BSC)',
        'ESC': 'Engineering Science Courses (ESC)',
        'PCC': 'Professional Core Courses (PCC)',
        'PEC': 'Professional Elective Courses (PEC)',
        'NFE': 'Non-Functional Elective Courses (NFE)',
        'OEC': 'Open Elective Courses (OEC)',
        'EEC': 'Employability Enhancement Courses (EEC)',
        'MC': 'Mandatory Courses (MC)',
        'IPR': 'Research Methodology and IPR (IPR)'
    };

    const distribution = {};
    [...categories, 'IPR'].forEach(cat => {
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
        } else if (subj.categoryType === 'IPR' || (subj.categoryType || '').toUpperCase() === 'IPR' || (subj.category || '').toUpperCase().includes('IPR') || (subj.category || '').toUpperCase().includes('RESEARCH METHODOLOGY')) {
            cat = 'IPR';
        } else if (subj.categoryType === 'NFE' || (subj.category || '').toUpperCase().includes('NON-FUNCTIONAL') || (subj.category || '').toUpperCase().includes('NON FUNCTIONAL') || (subj.category || '').toUpperCase().includes('NFE')) {
            cat = 'NFE';
        } else if (subj.vertical) {
            cat = 'PEC';
        } else {
            const type = (subj.categoryType || '').toUpperCase().trim();
            if (['IPR'].includes(type)) cat = 'IPR';
            else if (['HUM', 'HS', 'HSS'].includes(type)) cat = 'HUM';
            else if (['BSC', 'BS'].includes(type)) cat = 'BSC';
            else if (['ESC', 'ES'].includes(type)) cat = 'ESC';
            else if (['PCC', 'PC'].includes(type)) cat = 'PCC';
            else if (['PEC', 'PE'].includes(type)) cat = 'PEC';
            else if (['NFE'].includes(type)) cat = 'NFE';
            else if (['OEC', 'OE'].includes(type)) cat = 'OEC';
            else if (['EEC', 'EE'].includes(type)) cat = 'EEC';
            else if (['MC'].includes(type)) cat = 'MC';
            else {
                const text = `${subj.categoryType || ''} ${subj.category || ''} ${subj.categoryName || ''}`.toUpperCase();
                if (text.includes('IPR') || text.includes('RESEARCH METHODOLOGY')) cat = 'IPR';
                else if (text.includes('NON-FUNCTIONAL') || text.includes('NON FUNCTIONAL') || text.includes('NFE')) cat = 'NFE';
                else if (text.includes('HUMANITIES') || text.includes('MANAGEMENT') || text.includes('HUM') || text.includes('HS')) cat = 'HUM';
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
        'NFE': '#f97316',
        'OEC': '#ec4899',
        'EEC': '#06b6d4',
        'IPR': '#84cc16'
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
        <div class="pie-chart-block" style="margin-top: 18px; page-break-inside: avoid; display: flex; justify-content: center; align-items: center; gap: 40px; font-family: Arial, sans-serif;">
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
            
            <div class="title-block" style="margin-top: 8px; margin-bottom: 12px;">
                <h1 style="font-size: 12pt; text-align: center; text-decoration: underline;">SUMMARY OF CREDIT DISTRIBUTION</h1>
            </div>

            <table class="curriculum-table">
                <thead>
                    <tr>
                        <th rowSpan="2" style="width: 50%; font-size: 9pt; font-family: Arial, sans-serif; text-align: left; vertical-align: middle;">Subject Area</th>
                        <th colSpan="8" style="font-size: 9pt; font-family: Arial, sans-serif; text-align: center; padding: 3px;">Credits per Semester</th>
                        <th rowSpan="2" style="width: 14%; font-size: 9pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Credits Total</th>
                        <th rowSpan="2" style="width: 8%; font-size: 9pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">%</th>
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
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">MANDATORY COURSE</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">Mini Project*</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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
            <div style="font-size: 7.5pt; font-style: italic; margin-top: 2px; margin-bottom: 2px; text-align: left;">*Internal mode only</div>
        </div>
        `;
    }

    // 3. PROJECT WORK / INTERNSHIP CUM PROJECT WORK
    if (titleUpper.includes('PROJECT WORK') || titleUpper.includes('INTERNSHIP CUM PROJECT') || titleUpper.includes('FINAL YEAR PROJECT') || (titleUpper.includes('PROJECT') && !titleUpper.includes('MINI'))) {
        return `
        <div style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">Project Work / Internship cum project work</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">Internship</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 2px; font-family: Arial, sans-serif; text-transform: uppercase;">THEORY WITH PRACTICAL COURSES</div>
            <div style="text-align: center; font-size: 8.5pt; font-weight: bold; margin-bottom: 4px; font-family: Arial, sans-serif;">L T P C : ${lVal} ${tVal} ${pVal} ${cVal}</div>
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
                        <td colspan="3" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 7pt; line-height: 1.2;">
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
            <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 2px; font-family: Arial, sans-serif; text-transform: uppercase;">PRACTICAL COURSES</div>
            <div style="text-align: center; font-size: 8.5pt; font-weight: bold; margin-bottom: 4px; font-family: Arial, sans-serif;">L T P C : ${lVal} ${tVal} ${pVal} ${cVal}</div>
            <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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
                        <td colspan="1" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 7pt; line-height: 1.2;">
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
        <div style="font-weight: bold; text-align: center; text-decoration: underline; font-size: 9.5pt; margin-bottom: 4px; font-family: Arial, sans-serif; text-transform: uppercase;">THEORY COURSES</div>
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">12.5</td>
                    <td rowspan="2" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">25</td>
                    <td rowspan="4" style="border: 1.5px solid #000; padding: 2px 3px; vertical-align: middle; font-weight: bold;">60</td>
                </tr>
                <tr>
                    <td style="border: 1.5px solid #000; padding: 2px 3px; text-align: center; font-weight: bold;">CIAT II</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">3 hours</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">2.5 units</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">100</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">12.5</td>
                </tr>
                <tr>
                    <td colspan="4" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 7.5pt; line-height: 1.25;">
                        Objective Test/Online Quiz, Assignment / Case study/ Seminar/Tutorial, Role Play, Poster Presentation, Group Discussions, Oral Presentation, Mini Project etc., (5 marks during CIAT I and 5 marks during CIAT II)
                    </td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px;">10</td>
                    <td style="border: 1.5px solid #000; padding: 2px 3px; font-weight: bold;">10</td>
                </tr>
                <tr>
                    <td colspan="4" style="border: 1.5px solid #000; padding: 2px 3px; text-align: left; font-size: 7.5pt; line-height: 1.25;">
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
        'NFE': 'Non-Functional Elective Course (NFE)',
        'OEC': 'Open Elective Course (OEC)',
        'OE': 'Open Elective Course (OEC)',
        'EEC': 'Employability Enhancement Course (EEC)',
        'EE': 'Employability Enhancement Course (EEC)',
        'MC': 'Mandatory Course (MC)',
        'AC': 'Audit Course (AC)',
        'IPR': 'Research Methodology and IPR (IPR)'
    };

    if (raw) {
        if (/\([A-Za-z0-9\s-]+\)$/.test(raw)) {
            return raw;
        }
        const upper = raw.toUpperCase();
        if (upper.includes('RESEARCH METHODOLOGY') || upper.includes('IPR')) return 'Research Methodology and IPR (IPR)';
        if (upper.includes('NON-FUNCTIONAL') || upper.includes('NON FUNCTIONAL') || upper === 'NFE') return 'Non-Functional Elective Course (NFE)';
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
        // Subject Type Checks
        const isInduction = (subj.title || '').toUpperCase().includes('INDUCTION') || (subj.code || '').toUpperCase().includes('INDUCTION');
        const defaultUnitPeriods = isInduction ? 0 : (contactHrs > 0 ? contactHrs * 3 : 9);

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

        const categoryUpper = (subj.category || '').toUpperCase();
        const isPractical = categoryUpper.includes('PRACTICAL') || categoryUpper.includes('LAB');
        const isTheory = categoryUpper.includes('THEORY');
        const isTheoryCumPractical = isPractical && isTheory;

        // Helper to render experiments table
        const renderExperimentsTableHTML = (expList, title = "List of Exercises") => {
            if (!expList || expList.length === 0) return '';
            return `
                <div style="margin-top: 4px; margin-bottom: 4px;">
                    <h4 style="font-size: 9pt; font-weight: bold; font-family: Arial, sans-serif; border-bottom: 1px solid #ddd; padding-bottom: 2px; margin: 0 0 3px 0; text-transform: uppercase;">${title}</h4>
                    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 9pt; text-align: center;">
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

        const pageNum = ++pageTracker.current;

        return `
        <!-- Syllabus Subject: ${(subj.code || '').toUpperCase()} -->
        <div class="page syllabus-page">
            <div class="pdf-header pdf-header-inner">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">${formatDeptHeaderTitle(degreePrefix, deptName, regYear)}</div>
            </div>

            <div class="syllabus-page-content" style="flex: 1 1 auto;">
                <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 6px; font-size: 9pt; border: 1.5px solid #000; page-break-inside: avoid;">
                    ${isInduction ? `
                    <tr>
                        <td style="width: 22%; border: 1.5px solid #000; padding: 6px 4px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 9.5pt;">
                            ${(subj.code || 'U26MC101').toUpperCase()}
                        </td>
                        <td style="width: 58%; border: 1.5px solid #000; padding: 6px 4px; text-align: center; vertical-align: middle;">
                            <div style="font-weight: bold; font-size: 9.5pt; text-transform: uppercase;">${subj.title || 'INDUCTION PROGRAMME'}</div>
                            <div style="font-size: 8.5pt; font-weight: normal; margin-top: 2px;">${subtitleStr ? subtitleStr.replace(/^\s*[-•]\s*/, '') : '(COMMON TO ALL B.E./B.TECH.. PROGRAMMES)'}</div>
                        </td>
                        <td style="width: 20%; border: 1.5px solid #000; padding: 6px 4px; text-align: center; vertical-align: middle; font-family: Arial, sans-serif;">
                            <div style="font-size: 8.5pt; font-weight: bold; text-transform: uppercase; margin-bottom: 2px;">Duration</div>
                            <div style="font-weight: bold; font-size: 9.5pt;">2 WEEKS</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 4px 6px; font-weight: bold; font-size: 9pt; text-align: center;">Category</td>
                        <td style="border: 1.5px solid #000; padding: 4px 6px; font-size: 9pt;">${categoryName || 'Mandatory Course (MC)'}</td>
                        <td style="border: 1.5px solid #000; padding: 4px 6px;"></td>
                    </tr>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 4px 6px; font-weight: bold; font-size: 9pt;">Pre requisites</td>
                        <td colspan="2" style="border: 1.5px solid #000; padding: 4px 6px; font-size: 9pt;">${prerequisites || 'Nil'}</td>
                    </tr>
                    ` : `
                    <tr>
                        <td rowspan="2" style="width: 18%; border: 1.5px solid #000; padding: 4px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 9.5pt;">
                            ${(subj.code || '').toUpperCase()}
                        </td>
                        <td rowspan="2" style="width: 58%; border: 1.5px solid #000; padding: 4px; text-align: center; vertical-align: middle; font-weight: bold; font-size: 9.5pt;">
                            ${subj.title || ''}
                            ${subtitleStr}
                        </td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">L</td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">T</td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">P</td>
                        <td style="width: 6%; border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">C</td>
                    </tr>
                    <tr>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${lValue}</td>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${tValue}</td>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${pValue}</td>
                        <td style="border: 1.5px solid #000; padding: 2px; text-align: center; font-weight: bold; font-size: 9pt;">${cValue}</td>
                    </tr>
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
                    `}
                </table>

                ${objectives.length > 0 ? `
                <div class="section-container" style="margin-bottom: 6px; page-break-inside: avoid;">
                    <h3 style="font-size: 9.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif;">Course Objectives</h3>
                    <p style="font-size: 9pt; margin: 0 0 2px 0;">The course is intended to make the students to</p>
                    <ol style="margin: 0; padding-left: 18px;">
                        ${objectives.map(obj => (obj && obj.trim()) ? `<li style="margin-bottom: 2px; font-size: 9pt; line-height: 1.35; text-align: justify;">${obj}</li>` : '').join('')}
                    </ol>
                </div>
                ` : ''}

                ${(!isInduction && outcomes.some(co => (co && co.outcome && co.outcome.trim()) || (typeof co === 'string' && co.trim()))) ? `
                <table style="width: 100%; border-collapse: collapse; margin-top: 4px; margin-bottom: 14px; font-size: 9pt; border: 1.5px solid #000; page-break-inside: avoid;">
                    <thead>
                        <tr>
                            <th colspan="3" style="border: 1.5px solid #000; padding: 2.5px; text-align: center; font-weight: bold; font-family: Arial, sans-serif; font-size: 8.5pt;">Course Outcomes</th>
                        </tr>
                        <tr>
                            <th colspan="3" style="border: 1.5px solid #000; padding: 2px 4px; text-align: left; font-weight: normal; font-size: 9pt;">On successful completion of the course, students will be able to</th>
                        </tr>
                        <tr style="font-family: Arial, sans-serif; font-size: 7.5pt; font-weight: bold; text-align: center;">
                            <th style="width: 12%; border: 1.5px solid #000; padding: 2px;">CO. No</th>
                            <th style="width: 73%; border: 1.5px solid #000; padding: 2px; text-align: center;">Course Outcomes</th>
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

                ${isInduction ? `
                <div style="margin-top: 6px; margin-bottom: 6px;">
                    ${units.map((unit, uIdx) => {
            const topicsArr = Array.isArray(unit.topics)
                ? unit.topics.filter(t => t && t.trim() !== '')
                : (typeof unit.topics === 'string' ? unit.topics.split('\n').filter(t => t.trim() !== '') : []);
            const unitHeader = unit.title ? `${unit.unitNo || 'UNIT I'}: ${unit.title.toUpperCase()}` : 'UNIT I: LIST OF ACTIVITIES:';
            return `
                        <div style="margin-bottom: 6px; text-align: justify; font-size: 9pt; line-height: 1.4; page-break-inside: avoid;">
                            <div style="font-weight: bold; font-family: Arial, sans-serif; font-size: 9.5pt; margin-bottom: 4px;">
                                ${unitHeader.endsWith(':') ? unitHeader : unitHeader + ':'}
                            </div>
                            <ol style="margin: 0; padding-left: 20px; line-height: 1.45;">
                                ${topicsArr.map(topic => {
                const cleanedTopic = topic.replace(/^\\d+[\\.\\)]\\s*/, '');
                return `<li style="margin-bottom: 3px; text-align: justify; font-size: 9pt;">${cleanedTopic}</li>`;
            }).join('')}
                            </ol>
                        </div>
                        `;
        }).join('')}
                    <div style="text-align: right; font-weight: bold; font-family: Arial, sans-serif; font-size: 9pt; margin-top: 8px; margin-bottom: 4px; border-top: 1px solid #ddd; padding-top: 4px;">
                        TOTAL: 2 WEEKS
                    </div>
                </div>
                ` : `
                <!-- Units or Exercises -->
                <div style="margin-top: 8px; margin-bottom: 4px;">
                    ${isPractical && !isTheory ? `
                        ${renderExperimentsTableHTML(experiments, "List of Exercises")}
                    ` : units.map((unit, uIdx) => {
            const unitNo = unit.unitNo || `UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][uIdx] || (uIdx + 1)}`;
            const unitTitle = unit.title || '';
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
                        TOTAL: ${totalPeriods} PERIODS
                    </div>
                </div>
                `}

                ${(!isInduction && (textbooks.length > 0 || references.length > 0 || webReferences.length > 0)) ? `
                <div class="section-container" style="margin-top: 6px; margin-bottom: 6px; word-break: break-word; overflow-wrap: anywhere;">
                    ${textbooks.length > 0 ? `
                    <h4 style="font-size: 9.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif;">Text Book${textbooks.length > 1 ? 's' : ''}</h4>
                    <ol style="margin: 0 0 4px 0; padding-left: 18px; word-break: break-word; overflow-wrap: anywhere;">
                        ${textbooks.map(tb => {
                            const cleanTb = (tb || '').trim().replace(/\u00a0/g, ' ');
                            return cleanTb ? `<li style="margin-bottom: 2px; font-size: 9pt; line-height: 1.35; text-align: justify; word-break: break-word; overflow-wrap: anywhere;">${cleanTb}</li>` : '';
                        }).join('')}
                    </ol>
                    ` : ''}

                    ${references.length > 0 ? `
                    <h4 style="font-size: 9.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif;">References Books</h4>
                    <ol style="margin: 0 0 4px 0; padding-left: 18px; word-break: break-word; overflow-wrap: anywhere;">
                        ${references.map(ref => {
                            const cleanRef = (ref || '').trim().replace(/\u00a0/g, ' ');
                            return cleanRef ? `<li style="margin-bottom: 2px; font-size: 9pt; line-height: 1.35; text-align: justify; word-break: break-word; overflow-wrap: anywhere;">${cleanRef}</li>` : '';
                        }).join('')}
                    </ol>
                    ` : ''}

                    ${webReferences.length > 0 ? `
                    <h4 style="font-size: 9.5pt; font-weight: bold; margin: 0 0 2px 0; font-family: Arial, sans-serif;">Additional / Web References</h4>
                    <ol style="margin: 0; padding-left: 18px; word-break: break-word; overflow-wrap: anywhere;">
                        ${webReferences.map(wr => {
                            const cleanWr = (wr || '').trim().replace(/\u00a0/g, ' ');
                            return cleanWr ? `<li style="margin-bottom: 2px; font-size: 9pt; line-height: 1.35; text-align: justify; word-break: break-word; overflow-wrap: anywhere;"><a href="${cleanWr}" target="_blank" rel="noopener noreferrer" style="color: #000; text-decoration: underline; word-break: break-all; overflow-wrap: anywhere;">${cleanWr}</a></li>` : '';
                        }).join('')}
                    </ol>
                    ` : ''}
                </div>
                ` : ''}

                ${!isInduction ? `
                <div class="co-po-block" style="margin-top: 6px; margin-bottom: 4px; page-break-inside: avoid;">
                    <div style="font-size: 8.5pt; font-weight: bold; margin-top: 0; margin-bottom: 2px; font-family: Arial, sans-serif; text-align: center;">
                        Mapping of Course Outcomes (COs) with Programme Outcomes (POs) & Programme Specific Outcomes (PSOs)
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 2px; margin-bottom: 4px; font-size: 9pt; border: 1.5px solid #000; text-align: center;">
                        <thead>
                            <tr style="background-color: #f2f2f2; font-family: Arial, sans-serif;">
                                <th rowspan="2" style="border: 1.5px solid #000; padding: 2px; width: 10%; font-size: 9pt;">COs</th>
                                <th colspan="${poCount}" style="border: 1.5px solid #000; padding: 2px; font-size: 9pt;">POs</th>
                                <th colspan="${psoCount}" style="border: 1.5px solid #000; padding: 2px; font-size: 9pt;">PSOs</th>
                            </tr>
                            <tr style="background-color: #f2f2f2; font-family: Arial, sans-serif;">
                                ${poList && poList.length > 0
                        ? poList.map((_, i) => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7.5pt;">${i + 1}</th>`).join('')
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7.5pt;">${n}</th>`).join('')
                    }
                                ${psoList && psoList.length > 0
                        ? psoList.map((_, i) => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7.5pt;">${i + 1}</th>`).join('')
                        : [1, 2, 3].map(n => `<th style="border: 1.5px solid #000; padding: 1px; width: 6%; font-size: 7.5pt;">${n}</th>`).join('')
                    }
                            </tr>
                        </thead>
                        <tbody>
                            ${coPoMapping.map(row => `
                                <tr>
                                    <td style="border: 1.5px solid #000; padding: 1.5px; font-weight: bold; font-size: 9pt;">${row.coNo}</td>
                                    ${poList && poList.length > 0
                            ? poList.map((_, i) => `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${row[`po${i + 1}`] || '-'}</td>`).join('')
                            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${row[`po${n}`] || '-'}</td>`).join('')
                        }
                                    ${psoList && psoList.length > 0
                            ? psoList.map((_, i) => `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${row[`pso${i + 1}`] || '-'}</td>`).join('')
                            : [1, 2, 3].map(n => `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${row[`pso${n}`] || '-'}</td>`).join('')
                        }
                                </tr>
                            `).join('')}
                            <tr style="font-weight: bold; background-color: #f9f9f9;">
                                <td style="border: 1.5px solid #000; padding: 1.5px; font-size: 9pt;">Average</td>
                                ${poList && poList.length > 0
                        ? poList.map((_, i) => {
                            const validValues = coPoMapping.map(r => Number(r[`po${i + 1}`])).filter(v => !isNaN(v) && v > 0);
                            const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                            return `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${avg}</td>`;
                        }).join('')
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => {
                            const validValues = coPoMapping.map(r => Number(r[`po${n}`])).filter(v => !isNaN(v) && v > 0);
                            const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                            return `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${avg}</td>`;
                        }).join('')
                    }
                                ${psoList && psoList.length > 0
                        ? psoList.map((_, i) => {
                            const validValues = coPoMapping.map(r => Number(r[`pso${i + 1}`])).filter(v => !isNaN(v) && v > 0);
                            const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                            return `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${avg}</td>`;
                        }).join('')
                        : [1, 2, 3].map(n => {
                            const validValues = coPoMapping.map(r => Number(r[`pso${n}`])).filter(v => !isNaN(v) && v > 0);
                            const avg = validValues.length > 0 ? (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1) : '-';
                            return `<td style="border: 1.5px solid #000; padding: 1px; font-size: 9pt;">${avg}</td>`;
                        }).join('')
                    }
                                </tr>
                        </tbody>
                    </table>
                    <div style="display: flex; justify-content: space-between; font-size: 7.5pt; margin-top: 1px; margin-bottom: 2px;">
                        <span>3 - High</span>
                        <span>2 - Medium</span>
                        <span>1 - Low</span>
                        <span>"-" - No Correlation</span>
                    </div>
                </div>
                ` : ''}

                ${!isInduction ? renderAssessmentComponentsHTML(subj) : ''}
            </div>

            <div class="pdf-footer pdf-footer-inner">
                <div class="footer-left">Passed in Board of Studies Meeting on ${bosMeetingDate}</div>
                <div class="footer-center">${pageNum}</div>
                <div class="footer-right">Approved in Academic Council Meeting on ${acMeetingDate}</div>
            </div>
        </div>
        `;
    }).join('');
};

const exportCurriculumPDF = (deptData, academicLevel, regYearInput, instVisionMission) => {
    if (!deptData) return;

    const deptName = deptData.name || "Mechanical Engineering";
    const rawSubjects = deptData.subjects || [];
    const subjects = rawSubjects.filter(s => {
        if (!s) return false;
        const c = (s.code || '').trim().toUpperCase();
        const t = (s.title || '').trim().toUpperCase();
        return !c.startsWith('TOTAL') && !c.includes('TOTAL') && !t.startsWith('TOTAL') && !t.includes('TOTAL CREDITS') && !t.includes('TOTAL PERIODS');
    });

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

    const isMBA = isMBADepartment(deptData, degreePrefix) || isMBADepartment(deptName, degreePrefix);
    const effectiveSubjects = isMBA ? withMbaDefaultElectivesIfMissing(subjects) : subjects;

    // Group subjects by semester (excluding vertical and open elective subjects)
    const isPecTrackSubject = (s) => Boolean(s?.vertical) || (isMBA && Boolean(s?.verticalName && s.verticalName.trim() !== ''));

    const semestersGrouped = effectiveSubjects.filter(s => !isPecTrackSubject(s) && !s.isOpenElective).reduce((acc, subj) => {
        const sem = subj.semester || 1;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(subj);
        return acc;
    }, {});

    const sortedSemesters = Object.keys(semestersGrouped).sort((a, b) => Number(a) - Number(b));

    // Group subjects by vertical / MBA specialization stream
    const verticalsGrouped = effectiveSubjects.filter(isPecTrackSubject).reduce((acc, subj) => {
        const vert = subj.vertical || subj.verticalName;
        if (!acc[vert]) acc[vert] = [];
        acc[vert].push(subj);
        return acc;
    }, {});

    const sortedVerticals = Object.keys(verticalsGrouped).sort((a, b) => {
        const na = Number(a);
        const nb = Number(b);
        if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
        return String(a).localeCompare(String(b));
    });

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
        if (isMBA) {
            return buildMbaSemesterSectionHTML({
                semNum,
                subjectsForSem: semestersGrouped[semNum] || [],
                getRomanNumeral,
                sortSubjectsByCode
            });
        }
        const subjectsForSem = sortSubjectsByCode((semestersGrouped[semNum] || []).filter(s => {
            if (!s) return false;
            const c = (s.code || '').trim().toUpperCase();
            const t = (s.title || '').trim().toUpperCase();
            return !c.startsWith('TOTAL') && !c.includes('TOTAL') && !t.startsWith('TOTAL') && !t.includes('TOTAL CREDITS') && !t.includes('TOTAL PERIODS');
        }));
        if (subjectsForSem.length === 0) return '';

        const employabilityCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('EMPLOYABILITY') || s.categoryType === 'EEC');
        const nonFunctionalElectiveCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('NON-FUNCTIONAL') || s.category?.toUpperCase().includes('NON FUNCTIONAL') || s.category?.toUpperCase().includes('NFE') || s.categoryType === 'NFE');
        const mandatoryCourses = subjectsForSem.filter(s => s.category?.toUpperCase().includes('MANDATORY') || s.categoryType === 'MC');
        const languageElective1 = subjectsForSem.filter(s => s.category?.toUpperCase().includes('LANGUAGE ELECTIVE – I') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE - I') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE I'));
        const languageElective2 = subjectsForSem.filter(s => s.category?.toUpperCase().includes('LANGUAGE ELECTIVE – II') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE - II') || s.category?.toUpperCase().includes('LANGUAGE ELECTIVE II'));

        const isSpecialCategory = (s) => employabilityCourses.includes(s) || nonFunctionalElectiveCourses.includes(s) || mandatoryCourses.includes(s) || languageElective1.includes(s) || languageElective2.includes(s);

        const theoryCumPracticalCourses = subjectsForSem.filter(s => !isSpecialCategory(s) && s.category?.toUpperCase().includes('THEORY') && s.category?.toUpperCase().includes('PRACTICAL'));
        const theoryCourses = subjectsForSem.filter(s => !isSpecialCategory(s) && !theoryCumPracticalCourses.includes(s) && (s.category?.toUpperCase() === 'THEORY' || s.category?.toUpperCase().includes('THEORY') || s.categoryType === 'IPR' || s.category?.toUpperCase().includes('IPR') || s.category?.toUpperCase().includes('RESEARCH METHODOLOGY')));
        const practicalCourses = subjectsForSem.filter(s => !isSpecialCategory(s) && !theoryCumPracticalCourses.includes(s) && (s.category?.toUpperCase() === 'PRACTICAL' || s.category?.toUpperCase().includes('PRACTICAL') || s.category?.toUpperCase().includes('LAB')));

        const accounted = new Set([
            ...theoryCourses,
            ...practicalCourses,
            ...theoryCumPracticalCourses,
            ...languageElective1,
            ...languageElective2,
            ...employabilityCourses,
            ...nonFunctionalElectiveCourses,
            ...mandatoryCourses
        ]);
        const otherCourses = subjectsForSem.filter(s => !accounted.has(s));

        // Exclude Language Elective and Non-Functional Elective (NFE) options from raw semester total sum
        const regularCoursesForTotal = subjectsForSem.filter(s => {
            const isLang1 = languageElective1.includes(s);
            const isLang2 = languageElective2.includes(s);
            const isNfe = nonFunctionalElectiveCourses.includes(s);
            return !isLang1 && !isLang2 && !isNfe;
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
                        <td class="center" colspan="4" style="font-weight: bold; font-family: Arial, sans-serif; font-size: 9pt; letter-spacing: 0.5px;">2 WEEKS</td>
                        <td class="center" style="font-weight: bold;">0</td>
                        <td class="center">-</td>
                        <td class="center">-</td>
                        <td class="center">-</td>
                    </tr>
                    `;
                }
                return `
                <tr>
                    <td class="center" style="font-family: monospace; font-weight: bold; white-space: nowrap;">${(s.code || '').toUpperCase()}</td>
                    <td style="line-height: 1.25;">${s.title}</td>
                    <td class="center" style="font-family: Arial, sans-serif; white-space: nowrap;">${s.categoryType || 'PCC'}</td>
                    <td class="center" style="white-space: nowrap;">${s.l ?? 0}</td>
                    <td class="center" style="white-space: nowrap;">${s.t ?? 0}</td>
                    <td class="center" style="white-space: nowrap;">${s.p ?? 0}</td>
                    <td class="center" style="white-space: nowrap;">${s.contactPeriods || (Number(s.l || 0) + Number(s.t || 0) + Number(s.p || 0))}</td>
                    <td class="center" style="font-weight: bold; white-space: nowrap;">${s.credits ?? 0}</td>
                    <td class="center" style="white-space: nowrap;">${s.cia !== undefined ? s.cia : 40}</td>
                    <td class="center" style="white-space: nowrap;">${s.ese !== undefined ? s.ese : 60}</td>
                    <td class="center" style="white-space: nowrap; font-weight: bold;">${s.total !== undefined ? s.total : 100}</td>
                </tr>
                `;
            }).join('');
        };

        return `
            <div class="semester-block" style="margin-bottom: 12px; page-break-inside: auto;">
                <h3 style="font-size: 9pt; font-weight: bold; text-align: center; margin: 6px 0 4px 0; font-family: Arial, sans-serif;">
                    SEMESTER ${semNum}
                </h3>
                
                <table class="curriculum-table">
                    ${CURRICULUM_11_COLGROUP}
                    <thead>
                        ${buildCurriculumTableHeadRows({ includeCategory: true, titleLabel: 'Course' })}
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

                        ${nonFunctionalElectiveCourses.length > 0 ? `
                            <tr class="category-row">
                                <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">NON-FUNCTIONAL ELECTIVE COURSES</td>
                            </tr>
                            ${renderCourseRows(nonFunctionalElectiveCourses)}
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

                ${languageElective1.length > 0 ? buildLanguageElectiveBlockHTML('LANGUAGE ELECTIVE – I', renderCourseRows(languageElective1)) : ''}

                ${languageElective2.length > 0 ? buildLanguageElectiveBlockHTML('LANGUAGE ELECTIVE – II', renderCourseRows(languageElective2)) : ''}
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
            @page {
                size: A4 portrait;
                margin: 12mm 15mm 12mm 15mm;
            }

            /* Default typography with full Tamil Unicode font fallback */
            body {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                color: #000;
                background: #fff;
                margin: 0;
                padding: 0;
                font-size: 11pt;
                line-height: 1.4;
            }

            .print-table .page,
            .page {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                position: relative;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }

            .page-body,
            .syllabus-page-content {
                flex: 1 1 auto;
                display: block;
                width: 100%;
                box-sizing: border-box;
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            ol, ul {
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            li {
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            a {
                word-break: break-all;
                overflow-wrap: anywhere;
            }

            /* Header and Footer styles (exempt from content page font/size overrides) */
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

            /* Header */
            .pdf-header,
            .pdf-header-inner {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: 1.5px solid #000;
                padding-bottom: 4px;
                margin-bottom: 10px;
                font-size: 9.5pt;
                font-weight: bold;
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                font-style: italic;
                position: relative;
                width: 100%;
                flex-shrink: 0;
            }
            .pdf-header .left-col {
                text-align: left;
            }
            .pdf-header .right-col {
                text-align: right;
            }

            /* Footer */
            .pdf-footer,
            .pdf-footer-inner {
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-top: 1px solid #000;
                padding-top: 5px;
                margin-top: auto;
                font-size: 9pt;
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                font-style: italic;
                color: #000;
                width: 100%;
                flex-shrink: 0;
            }
            .pdf-footer .footer-left {
                text-align: left;
            }
            .pdf-footer .footer-right {
                text-align: right;
            }
            .pdf-footer .footer-center,
            .pdf-footer-inner .footer-center {
                position: absolute;
                left: 50%;
                bottom: 0;
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
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            li {
                margin-bottom: 6px;
                text-align: justify;
                font-size: 10.5pt;
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            a {
                word-break: break-all;
                overflow-wrap: anywhere;
            }
            
            /* Table Styles */
            table.curriculum-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 4px;
                margin-bottom: 8px;
                font-size: 8.5pt;
                line-height: 1.25;
                table-layout: fixed;
            }
            table.curriculum-table thead {
                display: table-header-group;
            }
            table.curriculum-table tr {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            table.curriculum-table th, table.curriculum-table td {
                border: 1px solid #000;
                padding: 3px 4px;
                text-align: left;
                vertical-align: middle;
                box-sizing: border-box;
                word-break: normal;
                overflow-wrap: break-word;
            }
            table.curriculum-table th {
                font-weight: bold;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            table.curriculum-table td.center,
            table.curriculum-table th.center {
                text-align: center;
                white-space: nowrap;
            }
            table.curriculum-table tr.category-row td {
                font-weight: bold;
                background-color: rgba(0, 0, 0, 0.03);
                padding: 3px 5px;
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
                    min-height: 297mm;
                    margin: 16px auto;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 12mm 15mm;
                    box-sizing: border-box;
                    position: relative;
                }
                .cover-page {
                    margin-top: 60px;
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
                    min-height: 266mm !important;
                    height: auto !important;
                    max-height: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    box-shadow: none !important;
                    background: #fff !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    page-break-inside: auto !important;
                    break-inside: auto !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: flex-start !important;
                    overflow: visible !important;
                }
                .page:last-child {
                    page-break-after: avoid !important;
                    break-after: avoid !important;
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
                    padding-bottom: 4px !important;
                    margin-bottom: 10px !important;
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
                    bottom: 0 !important;
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
                    <div style="flex: 0 0 75px; display: flex; margin-left: 120px; align-items: center; justify-content: flex-start;">
                        <img src="${collegeLogo}" alt="EASA College Logo" style="height: 70px; object-fit: contain;" />
                    </div>             
                </div>

                <!-- 2. DEGREE & DEPARTMENT -->
                <div style="margin: 40px 0; text-align: center;">
                    <h2 style="font-family: Arial, sans-serif; font-size: 24pt; font-weight: bold; line-height: 1.5; text-transform: uppercase; margin: 0; padding: 0 10px;">
                        ${degreePrefix ? `${degreePrefix} ` : ''}${deptName.toUpperCase()}
                    </h2>
                </div>

                <!-- 3. TITLE block -->
                <div style="margin: 40px 0; text-align: center;">
                    <h1 style="font-family: Arial, sans-serif; font-size: 25pt; font-weight: bold; line-height: 1.3; text-transform: uppercase; margin: 0 0 10px 0;">
                        CURRICULUM AND SYLLABUS
                    </h1>
                    <h3 style="font-family: Arial, sans-serif; font-size: 12pt; font-weight: bold; text-transform: uppercase; margin: 0;">
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

        <!-- CURRICULUM PAGES (CONTINUOUS) -->
        ${sortedSemesters.length > 0 ? `
        <div class="page curriculum-page">
            ${getHeaderHTML()}
            <div class="title-block" style="margin-top: 2px; margin-bottom: 8px;">
                <h1 style="font-size: 14pt; font-family: Arial, sans-serif; margin: 0 0 4px 0;">${degreePrefix ? `${degreePrefix.toUpperCase()} ` : ''}${deptName.toUpperCase()}</h1>
                <h2 style="font-size: 10.5pt; font-family: Arial, sans-serif; font-weight: bold; line-height: 1.35; margin-top: 2px;">
                    REGULATION – ${regYear.replace('R-', '')}<br>
                    CHOICE BASED CREDIT SYSTEM<br>
                    ${isMBA ? 'I TO IV SEMESTERS CURRICULUM' : 'CURRICULUM'}
                </h2>
            </div>
            
            ${sortedSemesters.map(semNum => renderSemesterTableHTML(semNum)).join('')}
            ${isMBA && sortedVerticals.length > 0 ? buildMbaPecSectionHTML({ sortedVerticals, verticalsGrouped, sortSubjectsByCode, getRomanNumeral }) : ''}
            
            ${getFooterHTML(++pageTracker.current)}
        </div>
        ` : ''}

        <!-- PROFESSIONAL ELECTIVES PAGE -->
        ${!isMBA && sortedVerticals.length > 0 ? `
        <div class="page">
            ${getHeaderHTML()}
            
            <div style="margin-top: 10px;">
                <h3 style="font-size: 11pt; font-weight: bold; text-align: center; margin-bottom: 12px; font-family: Arial, sans-serif; text-transform: uppercase;">
                    Professional Elective Courses
                </h3>
                
                <table class="curriculum-table">
                    ${CURRICULUM_10_COLGROUP}
                    <thead>
                        ${buildCurriculumTableHeadRows({ includeCategory: false, titleLabel: 'Course Title' })}
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
                                <td class="center" style="font-family: monospace; font-weight: bold; white-space: nowrap;">${(s.code || '').toUpperCase()}</td>
                                <td style="line-height: 1.25;">${s.title}</td>
                                <td class="center" style="white-space: nowrap;">${s.l}</td>
                                <td class="center" style="white-space: nowrap;">${s.t}</td>
                                <td class="center" style="white-space: nowrap;">${s.p}</td>
                                <td class="center" style="white-space: nowrap;">${s.contactPeriods}</td>
                                <td class="center" style="font-weight: bold; white-space: nowrap;">${s.credits}</td>
                                <td class="center" style="white-space: nowrap;">${s.cia}</td>
                                <td class="center" style="white-space: nowrap;">${s.ese}</td>
                                <td class="center" style="white-space: nowrap; font-weight: bold;">${s.total}</td>
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
                    ${CURRICULUM_10_COLGROUP}
                    <thead>
                        ${buildCurriculumTableHeadRows({ includeCategory: false, titleLabel: 'Course Title' })}
                    </thead>
                    <tbody>
                        ${(() => {
                const oecsGrouped = subjects.filter(s => s.isOpenElective).reduce((acc, subj) => {
                    const dept = (subj.offeringDept && subj.offeringDept !== 'Other Departments') ? subj.offeringDept : (deptData?.name || selectedDeptObj?.name || 'Biomedical Engineering');
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
                                <td class="center" style="font-family: monospace; font-weight: bold; white-space: nowrap;">${(s.code || '').toUpperCase()}</td>
                                <td style="line-height: 1.25;">${s.title}</td>
                                <td class="center" style="white-space: nowrap;">${s.l}</td>
                                <td class="center" style="white-space: nowrap;">${s.t}</td>
                                <td class="center" style="white-space: nowrap;">${s.p}</td>
                                <td class="center" style="white-space: nowrap;">${s.contactPeriods}</td>
                                <td class="center" style="font-weight: bold; white-space: nowrap;">${s.credits}</td>
                                <td class="center" style="white-space: nowrap;">${s.cia}</td>
                                <td class="center" style="white-space: nowrap;">${s.ese}</td>
                                <td class="center" style="white-space: nowrap; font-weight: bold;">${s.total}</td>
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
        
        ${getPdfPaginationScript(264, 2)}
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
    } else {
        alert("Please allow popups for this site to preview and print the curriculum PDF.");
    }
};

const exportSubjectSyllabusPDF = (subj, deptData, academicLevel, regYearInput) => {
    if (!subj) return;

    const deptName = (subj.offeringDept && subj.offeringDept !== 'Other Departments') ? subj.offeringDept : (deptData?.name || "Engineering Department");
    let regYear = regYearInput || deptData?.regulation;
    if (!regYear && subj.code) {
        const match = subj.code.match(/\d{2}/);
        if (match) {
            regYear = `R-20${match[0]}`;
        }
    }
    if (!regYear) regYear = "R-2023";

    const pageTracker = { current: 0 };

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
        degreePrefix = deptData?.slug === 'master-of-business-administration' ? 'M.B.A.' : 'M.E.';
    } else {
        const techSlugs = [
            'artificial-intelligence-and-data-science',
            'information-technology',
            'artificial-intelligence-and-machine-learning',
            'computer-science-and-engineering-cyber-security'
        ];
        degreePrefix = techSlugs.includes(deptData?.slug || '') ? 'B.Tech.' : 'B.E.';
    }

    const bosMeetingDate = (deptData && deptData.bosMeetingDate) ? deptData.bosMeetingDate : "04.09.2023";
    const acMeetingDate = (deptData && deptData.acMeetingDate) ? deptData.acMeetingDate : "23.09.2023";

    const detailedSyllabiHTML = getDetailedSyllabiHTML([subj], regYear, pageTracker, bosMeetingDate, acMeetingDate, deptData?.po, deptData?.pso, degreePrefix, deptName);

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Syllabus - ${(subj.code || '').toUpperCase()}: ${subj.title || ''}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            @page {
                size: A4 portrait;
                margin: 8mm 12mm 8mm 12mm;
            }
            body {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif;
                font-size: 9pt;
                line-height: 1.4;
                color: #000;
                margin: 0;
                padding: 0;
                background-color: #fff;
            }
            * {
                box-sizing: border-box;
            }
            .page {
                position: relative;
                box-sizing: border-box;
                page-break-after: always;
                break-after: page;
                page-break-inside: auto;
                break-inside: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                min-height: 273mm;
            }
            .page:last-child {
                page-break-after: avoid;
                break-after: avoid;
            }
            .page-body,
            .syllabus-page-content {
                flex: 1 1 auto;
                display: block;
                width: 100%;
                box-sizing: border-box;
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            ol, ul {
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            li {
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            a {
                word-break: break-all;
                overflow-wrap: anywhere;
            }
            .pdf-header,
            .pdf-header-inner {
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif !important;
                font-size: 9.5pt !important;
                border-bottom: 1.5px solid #000;
                padding-bottom: 4px;
                margin-bottom: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold !important;
                font-style: italic !important;
                width: 100%;
                flex-shrink: 0;
            }
            .pdf-header, .pdf-header * {
                font-style: italic !important;
                font-weight: bold !important;
            }
            .pdf-footer,
            .pdf-footer-inner {
                position: relative;
                font-family: Arial, 'Noto Sans Tamil', 'Mukta Malar', 'Latha', 'Nirmala UI', 'Vijaya', 'Arial Unicode MS', sans-serif !important;
                font-size: 9pt !important;
                border-top: 1px solid #000;
                padding-top: 4px;
                margin-top: auto;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                font-style: italic !important;
                width: 100%;
                flex-shrink: 0;
            }
            .pdf-footer, .pdf-footer * {
                font-style: italic !important;
            }
            .pdf-footer .footer-center,
            .pdf-footer .footer-center * {
                font-style: normal !important;
                font-weight: bold !important;
            }
            .pdf-footer .footer-center,
            .pdf-footer-inner .footer-center {
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                text-align: center;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            thead {
                display: table-header-group;
            }
            tr {
                page-break-inside: avoid;
                break-inside: avoid;
            }
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
                    margin: 16px auto;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 8mm 12mm;
                    box-sizing: border-box;
                    position: relative;
                }
                .preview-bar + .page {
                    margin-top: 32px;
                }
                .preview-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 56px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(8px);
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
            }
            @media print {
                @page {
                    size: A4 portrait;
                    margin: 8mm 12mm 8mm 12mm;
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
                .page {
                    width: 100% !important;
                    min-height: 273mm !important;
                    height: auto !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    margin: 0 !important;
                    border: none !important;
                    page-break-after: always !important;
                    break-after: page !important;
                    page-break-inside: auto !important;
                    break-inside: auto !important;
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: flex-start !important;
                }
                .page:last-child {
                    page-break-after: avoid !important;
                    break-after: avoid !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="preview-bar">
            <div class="preview-title">Syllabus Preview - ${(subj.code || '').toUpperCase()}: ${subj.title || ''}</div>
            <div>
                <button class="preview-btn btn-print" onclick="window.print()">Print / Save PDF</button>
                <button class="preview-btn btn-close" onclick="window.close()">Close Preview</button>
            </div>
        </div>
        ${detailedSyllabiHTML}
        ${getPdfPaginationScript(272, 1)}
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
    } else {
        alert("Please allow popups for this site to preview and print the syllabus PDF.");
    }
};

const STANDARD_CATEGORY_NAMES = [
    'Humanities, Social Sciences and Management Course (HUM)',
    'Basic Science Course (BSC)',
    'Engineering Science Course (ESC)',
    'Professional Core Course (PCC)',
    'Professional Elective Course (PEC)',
    'Open Elective Course (OEC)',
    'Employability Enhancement Course (EEC)',
    'Mandatory Course (MC)',
    'Humanities and Social Sciences including Management Courses (HUM)',
    'Basic Science Courses (BSC)',
    'Engineering Science Courses (ESC)',
    'Professional Core Courses (PCC)',
    'Professional Elective Courses (PEC)',
    'Open Elective Courses (OEC)',
    'Employability Enhancement Courses (EEC)',
    'Mandatory Courses (MC)',
    'Audit Course (AC)'
];

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
    if (codeUpper.includes('INDUCTION') || titleLower.includes('induction') || codeUpper === 'U26MC101') {
        return [
            "To adapt to the new collegiate environment and transition smoothly into engineering education.",
            "To understand institutional ethos, code of conduct, autonomous examination procedures and regulations.",
            "To build healthy relationships and self-management skills through universal human values.",
            "To emphasize mental health, physical wellness, yoga, sports and emotional well-being.",
            "To provide exposure to institutional clubs, professional chapters, and community outreach exploration."
        ];
    }
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

const mapStaticCategoryToAbbrev = (category) => {
    const raw = (category || '').toUpperCase().trim();
    if (raw.includes('IPR') || raw.includes('RESEARCH METHODOLOGY') || raw === 'IPR') return 'IPR';
    if (raw.includes('NON-FUNCTIONAL') || raw.includes('NON FUNCTIONAL') || raw === 'NFE') return 'NFE';
    if (raw.includes('HUMANITIES') || raw === 'HS' || raw === 'HUM') return 'HUM';
    if (raw.includes('BASIC SCIENCE') || raw === 'BS' || raw === 'BSC') return 'BSC';
    if (raw.includes('ENGINEERING SCIENCE') || raw === 'ES' || raw === 'ESC') return 'ESC';
    if (raw.includes('PROFESSIONAL CORE') || raw === 'PC' || raw === 'PCC') return 'PCC';
    if (raw.includes('PROFESSIONAL ELECTIVE') || raw === 'PE' || raw === 'PEC') return 'PEC';
    if (raw.includes('OPEN ELECTIVE') || raw === 'OE' || raw === 'OEC') return 'OEC';
    if (raw.includes('EMPLOYABILITY') || raw === 'EEC') return 'EEC';
    if (raw.includes('MANDATORY') || raw === 'MC') return 'MC';
    return 'PCC';
};

const DepartmentManager = ({ initialLevel, initialDeptSlug }) => {
    const { user } = useAuth();

    const getDeptSlug = (userDeptName) => {
        if (!userDeptName) return '';
        const lower = userDeptName.toLowerCase().trim();
        let found = staticDepartments.find(d =>
            d.slug.toLowerCase() === lower ||
            d.id.toLowerCase() === lower ||
            d.name.toLowerCase() === lower
        );
        if (found) return found.slug;

        if (lower === 'cse') return 'computer-science-and-engineering';
        if (lower === 'eee') return 'electrical-and-electronics-engineering';
        if (lower === 'ece') return 'electronics-and-communication-engineering';
        if (lower === 'it') return 'information-technology';
        if (lower === 'aids' || lower === 'ai & ds' || lower === 'ai/ds') return 'artificial-intelligence-and-data-science';
        if (lower === 'aiml' || lower === 'ai & ml' || lower === 'ai/ml' || lower === 'ai-ml' || lower === 'ai ml') return 'artificial-intelligence-and-machine-learning';
        if (lower === 'cyber' || lower === 'cybersecurity' || lower === 'cyber security') return 'computer-science-and-engineering-cyber-security';
        if (lower === 'bme') return 'biomedical-engineering';
        if (lower === 'mech') return 'mechanical-engineering';
        if (lower === 'agri') return 'agriculture-engineering';
        if (lower === 'mba') return 'master-of-business-administration';

        if (lower === 'science-and-humanities' || lower === 'science and humanities' || lower === 'sciences and humanities' || lower === 's&h' || lower === 'sh') return 'science-and-humanities';
        if (lower.includes('science') && lower.includes('humanities')) return 'science-and-humanities';
        if (lower.includes('humanities') || lower === 'sh' || lower === 's&h') return 'science-and-humanities';

        found = staticDepartments.find(d =>
            d.name.toLowerCase().includes(lower) ||
            lower.includes(d.name.toLowerCase())
        );
        if (found) return found.slug;

        return lower.replace(/\s+/g, '-');
    };

    const userRole = (user?.role || '').toLowerCase().trim();
    const isHOD = userRole === 'hod';
    const isAdmin = !isHOD && (userRole === 'admin' || userRole === 'superadmin' || !!localStorage.getItem('admin_token'));
    const hodDeptSlug = isHOD ? getDeptSlug(user?.department) : '';
    const hodDeptObj = isHOD ? staticDepartments.find(d => d.slug === hodDeptSlug) : null;

    // URL parameters resolution
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const urlLevel = urlParams?.get('level')?.toUpperCase();
    const urlDept = urlParams?.get('dept');
    const isUrlPG = typeof window !== 'undefined' && (window.location.pathname.includes('/pg') || urlLevel === 'PG');

    const effectiveLevel = isHOD && hodDeptObj 
        ? hodDeptObj.type 
        : (initialLevel || (isUrlPG ? 'PG' : (urlLevel === 'UG' ? 'UG' : 'UG')));

    // Filter States
    const [academicLevel, setAcademicLevel] = useState(effectiveLevel);

    // Extract available departments based on Level
    const filteredDepts = staticDepartments.filter(d => d.type === academicLevel);

    // Determine initial department based on user role or URL params
    const getInitialDept = () => {
        if (isHOD && hodDeptSlug) return hodDeptSlug;
        const requestedDept = initialDeptSlug || urlDept;
        if (requestedDept) {
            const match = staticDepartments.find(d => d.slug === requestedDept || d.id === requestedDept);
            if (match) return match.slug;
        }
        if (filteredDepts.length > 0) return filteredDepts[0].slug;
        return effectiveLevel === 'PG' ? 'me-computer-science-and-engineering' : 'computer-science-and-engineering';
    };

    const [selectedDept, setSelectedDept] = useState(getInitialDept);

    // Enforce selectedDept for HODs
    useEffect(() => {
        if (isHOD && hodDeptSlug && selectedDept !== hodDeptSlug) {
            setSelectedDept(hodDeptSlug);
        }
    }, [selectedDept, isHOD, hodDeptSlug]);

    // Automatically ensure selected department is valid when Level changes (only for non-HODs)
    useEffect(() => {
        if (isHOD) return;
        if (filteredDepts.length > 0) {
            const hasCurrent = filteredDepts.some(d => d.slug === selectedDept);
            if (!hasCurrent) {
                setSelectedDept(filteredDepts[0].slug);
            }
        }
    }, [academicLevel, filteredDepts, selectedDept, isHOD]);
    const [activeDeptTab, setActiveDeptTab] = useState('syllabus');
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

    // Custom Centered Modal Dialog State (replaces top browser popups)
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        title: '',
        message: '',
        note: '',
        type: 'confirm', // 'confirm' | 'alert' | 'danger' | 'warning' | 'success'
        confirmText: 'OK',
        cancelText: 'Cancel',
        onConfirm: null,
        onCancel: null
    });

    const showConfirmDialog = ({ title = 'Confirmation', message, note = '', confirmText = 'OK', cancelText = 'Cancel', type = 'confirm', onConfirm, onCancel }) => {
        setDialogState({
            isOpen: true,
            title,
            message,
            note,
            type,
            confirmText,
            cancelText,
            onConfirm: () => {
                setDialogState(prev => ({ ...prev, isOpen: false }));
                if (onConfirm) onConfirm();
            },
            onCancel: () => {
                setDialogState(prev => ({ ...prev, isOpen: false }));
                if (onCancel) onCancel();
            }
        });
    };

    const showAlertDialog = ({ title = 'Notice', message, note = '', type = 'alert', buttonText = 'OK', onClose }) => {
        setDialogState({
            isOpen: true,
            title,
            message,
            note,
            type,
            confirmText: buttonText,
            cancelText: null,
            onConfirm: () => {
                setDialogState(prev => ({ ...prev, isOpen: false }));
                if (onClose) onClose();
            },
            onCancel: null
        });
    };

    const [newSubject, setNewSubject] = useState({
        semester: 1,
        vertical: '',
        verticalName: '',
        category: 'THEORY',
        code: '',
        title: '',
        creatorDept: '',
        categoryType: 'HUM',
        l: 0,
        t: 0,
        p: 0,
        contactPeriods: 0,
        credits: 0,
        cia: 0,
        ese: 0,
        total: 0,
        isOpenElective: false,
        offeringDept: '',
        prerequisites: '',
        subtitle: '',
        categoryName: '',
        objectives: [],
        outcomes: [],
        units: [],
        textbooks: [],
        references: [],
        webReferences: [],
        experiments: [],
        coPoMapping: []
    });

    const [courseType, setCourseType] = useState('semester'); // 'semester', 'professional_elective', 'open_elective'
    const [offeringDeptSubjects, setOfferingDeptSubjects] = useState([]);
    const [loadingOfferingSubjects, setLoadingOfferingSubjects] = useState(false);

    useEffect(() => {
        const fetchOfferingDeptSubjects = async () => {
            if (courseType !== 'open_elective' || !newSubject.offeringDept) {
                setOfferingDeptSubjects([]);
                return;
            }
            setLoadingOfferingSubjects(true);
            try {
                const offeringDeptObj = staticDepartments.find(d => d.name === newSubject.offeringDept);
                if (offeringDeptObj) {
                    const res = await fetch(`${API_BASE_URL}/api/departments/${offeringDeptObj.slug}`);
                    if (res.ok) {
                        const json = await res.json();
                        setOfferingDeptSubjects(json.subjects || []);
                    }
                }
            } catch (error) {
                console.error('Error fetching offering department subjects:', error);
            } finally {
                setLoadingOfferingSubjects(false);
            }
        };
        fetchOfferingDeptSubjects();
    }, [newSubject.offeringDept, courseType]);

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

    // Master Course Bank across all departments (populated from actual saved subjects)
    const [masterCourses, setMasterCourses] = useState([]);
    const [matchedMasterCourse, setMatchedMasterCourse] = useState(null);
    const [loadingMasterCourses, setLoadingMasterCourses] = useState(false);

    // Fetch master courses across all departments from backend
    const fetchMasterCourses = async () => {
        setLoadingMasterCourses(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/departments/all/master-courses`);
            let backendCourses = [];
            if (res.ok) {
                backendCourses = await res.json();
            }

            const courseMap = new Map();

            // 1. Overlay live backend database courses from all departments
            if (Array.isArray(backendCourses)) {
                backendCourses.forEach(bc => {
                    if (bc && bc.code) {
                        const codeKey = bc.code.trim().toUpperCase();
                        courseMap.set(codeKey, {
                            ...(courseMap.get(codeKey) || {}),
                            ...bc,
                            code: codeKey,
                            creatorDept: bc.creatorDept || bc.sourceDept
                        });
                    }
                });
            }

            // 2. Also include any currently loaded department subjects
            if (Array.isArray(data.subjects)) {
                data.subjects.forEach(s => {
                    if (s && s.code) {
                        const codeKey = s.code.trim().toUpperCase();
                        if (!courseMap.has(codeKey) || s.units?.length) {
                            courseMap.set(codeKey, {
                                ...(courseMap.get(codeKey) || {}),
                                ...s,
                                code: codeKey,
                                creatorDept: s.creatorDept || selectedDept,
                                sourceDept: s.creatorDept || selectedDept
                            });
                        }
                    }
                });
            }

            const finalList = Array.from(courseMap.values()).sort((a, b) => (a.code || '').localeCompare(b.code || ''));
            setMasterCourses(finalList);
        } catch (err) {
            console.error('Error fetching master courses:', err);
        } finally {
            setLoadingMasterCourses(false);
        }
    };

    useEffect(() => {
        fetchMasterCourses();
    }, [selectedDept]);

    const applyMasterCourseToNewSubject = (codeOrObj) => {
        let matched = null;
        if (typeof codeOrObj === 'object' && codeOrObj !== null) {
            matched = codeOrObj;
        } else if (typeof codeOrObj === 'string' && codeOrObj.trim()) {
            const clean = codeOrObj.trim().toUpperCase();
            matched = masterCourses.find(c => c.code?.toUpperCase() === clean);
        }

        if (matched) {
            setMatchedMasterCourse(matched);
            setNewSubject(prev => {
                const lVal = matched.l !== undefined && matched.l !== '' ? Number(matched.l) : prev.l;
                const tVal = matched.t !== undefined && matched.t !== '' ? Number(matched.t) : prev.t;
                const pVal = matched.p !== undefined && matched.p !== '' ? Number(matched.p) : prev.p;
                const ciaVal = matched.cia !== undefined && matched.cia !== '' ? Number(matched.cia) : prev.cia;
                const eseVal = matched.ese !== undefined && matched.ese !== '' ? Number(matched.ese) : prev.ese;
                const contactPeriodsVal = matched.contactPeriods !== undefined && matched.contactPeriods !== '' ? Number(matched.contactPeriods) : (lVal + tVal + pVal);
                const creditsVal = matched.credits !== undefined && matched.credits !== '' ? Number(matched.credits) : prev.credits;
                const totalVal = matched.total !== undefined && matched.total !== '' ? Number(matched.total) : (ciaVal + eseVal);

                let units = [];
                if (Array.isArray(matched.units) && matched.units.length > 0) {
                    units = matched.units.map(u => ({ ...u, topics: Array.isArray(u.topics) ? [...u.topics] : [u.topics || ''] }));
                }

                const objectives = (Array.isArray(matched.objectives) && matched.objectives.length > 0)
                    ? [...matched.objectives]
                    : [];

                const outcomes = (Array.isArray(matched.outcomes) && matched.outcomes.length > 0)
                    ? matched.outcomes.map(co => ({ ...co }))
                    : [];

                return {
                    ...prev,
                    code: (matched.code || prev.code).toUpperCase(),
                    title: matched.title || prev.title,
                    creatorDept: matched.creatorDept || matched.sourceDept || '',
                    category: matched.category || prev.category || 'THEORY',
                    categoryType: matched.categoryType || prev.categoryType || 'HUM',
                    categoryName: matched.categoryName || prev.categoryName || '',
                    subtitle: matched.subtitle || prev.subtitle || '',
                    l: lVal,
                    t: tVal,
                    p: pVal,
                    contactPeriods: contactPeriodsVal,
                    credits: creditsVal,
                    cia: ciaVal,
                    ese: eseVal,
                    total: totalVal,
                    prerequisites: matched.prerequisites || '',
                    objectives,
                    outcomes,
                    units,
                    textbooks: (Array.isArray(matched.textbooks) && matched.textbooks.length > 0) ? [...matched.textbooks] : [],
                    references: (Array.isArray(matched.references) && matched.references.length > 0) ? [...matched.references] : [],
                    webReferences: (Array.isArray(matched.webReferences) && matched.webReferences.length > 0) ? [...matched.webReferences] : [],
                    experiments: Array.isArray(matched.experiments) ? matched.experiments.map(e => ({ ...e })) : [],
                    coPoMapping: Array.isArray(matched.coPoMapping) ? matched.coPoMapping.map(m => ({ ...m })) : []
                };
            });
        } else {
            setMatchedMasterCourse(null);
        }
    };

    const applyMasterCourseToEditingSubject = (codeOrObj) => {
        let matched = null;
        if (typeof codeOrObj === 'object' && codeOrObj !== null) {
            matched = codeOrObj;
        } else if (typeof codeOrObj === 'string' && codeOrObj.trim()) {
            const clean = codeOrObj.trim().toUpperCase();
            matched = masterCourses.find(c => c.code?.toUpperCase() === clean);
        }

        if (matched) {
            setEditingSubjectValue(prev => {
                if (!prev) return prev;
                const lVal = matched.l !== undefined && matched.l !== '' ? Number(matched.l) : (prev.l || 0);
                const tVal = matched.t !== undefined && matched.t !== '' ? Number(matched.t) : (prev.t || 0);
                const pVal = matched.p !== undefined && matched.p !== '' ? Number(matched.p) : (prev.p || 0);
                const ciaVal = matched.cia !== undefined && matched.cia !== '' ? Number(matched.cia) : (prev.cia || 0);
                const eseVal = matched.ese !== undefined && matched.ese !== '' ? Number(matched.ese) : (prev.ese || 0);
                const contactPeriodsVal = matched.contactPeriods !== undefined && matched.contactPeriods !== '' ? Number(matched.contactPeriods) : (lVal + tVal + pVal);
                const creditsVal = matched.credits !== undefined && matched.credits !== '' ? Number(matched.credits) : (prev.credits || 0);
                const totalVal = matched.total !== undefined && matched.total !== '' ? Number(matched.total) : (ciaVal + eseVal);

                let units = [];
                if (Array.isArray(matched.units) && matched.units.length > 0) {
                    units = matched.units.map(u => ({ ...u, topics: Array.isArray(u.topics) ? [...u.topics] : [u.topics || ''] }));
                } else if (Array.isArray(prev.units)) {
                    units = [...prev.units];
                }

                return {
                    ...prev,
                    code: (matched.code || prev.code).toUpperCase(),
                    title: matched.title || prev.title,
                    creatorDept: matched.creatorDept || matched.sourceDept || prev.creatorDept || '',
                    category: matched.category || prev.category || 'THEORY',
                    categoryType: matched.categoryType || prev.categoryType || 'HUM',
                    categoryName: matched.categoryName || prev.categoryName || '',
                    subtitle: matched.subtitle || prev.subtitle || '',
                    l: lVal,
                    t: tVal,
                    p: pVal,
                    contactPeriods: contactPeriodsVal,
                    credits: creditsVal,
                    cia: ciaVal,
                    ese: eseVal,
                    total: totalVal,
                    prerequisites: matched.prerequisites || prev.prerequisites || '',
                    objectives: (Array.isArray(matched.objectives) && matched.objectives.length > 0) ? [...matched.objectives] : (prev.objectives || []),
                    outcomes: (Array.isArray(matched.outcomes) && matched.outcomes.length > 0) ? matched.outcomes.map(co => ({ ...co })) : (prev.outcomes || []),
                    units,
                    textbooks: (Array.isArray(matched.textbooks) && matched.textbooks.length > 0) ? [...matched.textbooks] : (prev.textbooks || []),
                    references: (Array.isArray(matched.references) && matched.references.length > 0) ? [...matched.references] : (prev.references || []),
                    webReferences: (Array.isArray(matched.webReferences) && matched.webReferences.length > 0) ? [...matched.webReferences] : (prev.webReferences || []),
                    experiments: Array.isArray(matched.experiments) ? matched.experiments.map(e => ({ ...e })) : (prev.experiments || []),
                    coPoMapping: Array.isArray(matched.coPoMapping) ? matched.coPoMapping.map(m => ({ ...m })) : (prev.coPoMapping || [])
                };
            });
        }
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
    const [selectedSyllabusFallbackSubject, setSelectedSyllabusFallbackSubject] = useState(null);
    const [editingFallbackCode, setEditingFallbackCode] = useState(null);
    const [syllabusEditValue, setSyllabusEditValue] = useState(null);
    const [activeSyllabusTab, setActiveSyllabusTab] = useState('objectives-outcomes');

    const getAuthToken = () => {
        return localStorage.getItem('authToken') || localStorage.getItem('admin_token') || localStorage.getItem('token') || (user && user.token);
    };

    /**
     * Promotes default MBA catalog subjects into the persisted subjects array when an admin
     * customizes or deletes a catalog entry, while keeping all existing DB subjects untouched.
     */
    const materializeCatalogSubjects = (currentSubjects, replacementSubj = null, excludeCode = null) => {
        const enriched = withMbaDefaultElectivesIfMissing(currentSubjects || []);
        let cleanReplacement = null;
        if (replacementSubj) {
            cleanReplacement = { ...replacementSubj, creatorDept: replacementSubj.creatorDept || selectedDept };
            delete cleanReplacement.isCatalogFallback;
        }
        const excludeUpper = excludeCode ? String(excludeCode).trim().toUpperCase() : null;
        const replaceTargetUpper = excludeUpper || (cleanReplacement ? String(cleanReplacement.code || '').trim().toUpperCase() : null);

        const nextList = [];
        let inserted = false;

        enriched.forEach(item => {
            const codeU = String(item?.code || '').trim().toUpperCase();
            if (item.isCatalogFallback) {
                if (replaceTargetUpper && codeU === replaceTargetUpper) {
                    if (cleanReplacement && !inserted) {
                        nextList.push(cleanReplacement);
                        inserted = true;
                    }
                    return;
                }
                const copy = { ...item, creatorDept: item.creatorDept || selectedDept };
                delete copy.isCatalogFallback;
                nextList.push(copy);
            } else {
                nextList.push(item);
            }
        });

        if (cleanReplacement && !inserted) {
            nextList.push(cleanReplacement);
        }
        return nextList;
    };

    const handleStartManageSyllabus = (subjOrIndex) => {
        const isCatalogObj = typeof subjOrIndex === 'object' && subjOrIndex !== null;
        const subj = isCatalogObj ? subjOrIndex : data.subjects[subjOrIndex];
        setSelectedSyllabusSubjectIndex(isCatalogObj ? -1 : subjOrIndex);
        setSelectedSyllabusFallbackSubject(isCatalogObj ? { ...subjOrIndex } : null);

        const prefilledMapping = sanitizeCoPoMapping(
            subj.coPoMapping,
            subj.outcomes,
            (data.po && data.po.length > 0) ? data.po.length : 11,
            (data.pso && data.pso.length > 0) ? data.pso.length : 3
        );

        // Prefill values - strictly clean, completely blank if not entered
        const prefilledSyllabus = {
            code: subj.code || '',
            title: subj.title || '',
            category: subj.category || 'THEORY',
            categoryType: subj.categoryType || 'HUM',
            l: subj.l ?? 0,
            t: subj.t ?? 0,
            p: subj.p ?? 0,
            credits: subj.credits ?? 0,
            subtitle: subj.subtitle || '',
            categoryName: subj.categoryName || '',
            prerequisites: subj.prerequisites || '',
            objectives: (subj.objectives && subj.objectives.length > 0)
                ? [...subj.objectives]
                : [],
            outcomes: (subj.outcomes && subj.outcomes.length > 0)
                ? subj.outcomes.map(co => ({ ...co }))
                : [],
            units: (subj.units && subj.units.length > 0)
                ? subj.units.map(u => ({ ...u, topics: Array.isArray(u.topics) ? [...u.topics] : [u.topics || ''] }))
                : [],
            experiments: subj.experiments && subj.experiments.length > 0
                ? subj.experiments.map(exp => ({ ...exp }))
                : [],
            textbooks: (subj.textbooks && subj.textbooks.length > 0)
                ? [...subj.textbooks]
                : [],
            references: (subj.references && subj.references.length > 0)
                ? [...subj.references]
                : [],
            webReferences: (subj.webReferences && subj.webReferences.length > 0)
                ? [...subj.webReferences]
                : [],
            coPoMapping: prefilledMapping
        };

        setSyllabusEditValue(prefilledSyllabus);
        setActiveSyllabusTab('objectives-outcomes');
    };

    const handleSaveSyllabus = async () => {
        if (!syllabusEditValue) return;

        const originalIndex = selectedSyllabusSubjectIndex;
        const isCatalog = originalIndex === -1;
        const currentSubject = isCatalog ? selectedSyllabusFallbackSubject : data.subjects[originalIndex];

        // Permission check: only creator department or admin can update syllabus content
        const isCreator = !currentSubject?.creatorDept || currentSubject?.creatorDept === selectedDept || isAdmin;
        if (!isCreator) {
            showAlertDialog({
                title: 'Shared Course (Read Only)',
                message: `This syllabus was created by ${getDeptDisplayName(currentSubject?.creatorDept) || 'another department'}. Only the creator department or an administrator can modify it.`,
                type: 'warning'
            });
            setSelectedSyllabusSubjectIndex(null);
            setSelectedSyllabusFallbackSubject(null);
            setSyllabusEditValue(null);
            return;
        }

        const updatedSubject = {
            ...currentSubject,
            creatorDept: currentSubject?.creatorDept || selectedDept,
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
            coPoMapping: sanitizeCoPoMapping(
                syllabusEditValue.coPoMapping,
                syllabusEditValue.outcomes,
                (data.po && data.po.length > 0) ? data.po.length : 11,
                (data.pso && data.pso.length > 0) ? data.pso.length : 3
            )
        };
        delete updatedSubject.isCatalogFallback;

        let updatedSubjects;
        if (isCatalog) {
            updatedSubjects = materializeCatalogSubjects(data.subjects, updatedSubject, currentSubject?.code);
        } else {
            updatedSubjects = [...data.subjects];
            updatedSubjects[originalIndex] = updatedSubject;
        }

        const updatedData = { ...data, subjects: updatedSubjects };
        const success = await updateBackend(updatedData);

        if (success) {
            setSelectedSyllabusSubjectIndex(null);
            setSelectedSyllabusFallbackSubject(null);
            setSyllabusEditValue(null);
        }
    };

    useEffect(() => {
        fetchDepartmentData();
    }, [selectedDept]);

    const fetchDepartmentData = async () => {
        setLoading(true);
        const staticDept = staticDepartments.find(d => d.slug === selectedDept) || {};
        const fallbackVision = Array.isArray(staticDept.vision)
            ? staticDept.vision
            : (staticDept.vision ? [staticDept.vision] : []);
        const fallbackMission = staticDept.mission || [];
        const fallbackPEO = staticDept.peo || [];
        const fallbackPO = staticDept.po || [];
        const fallbackPSO = staticDept.pso || [];

        try {
            const res = await fetch(`${API_BASE_URL}/api/departments/${selectedDept}`);
            if (res.ok) {
                const json = await res.json();
                if (json) {
                    setData({
                        _id: json._id,
                        mission: (json.mission && json.mission.length > 0) ? json.mission : fallbackMission,
                        vision: (json.vision && json.vision.length > 0) ? json.vision : fallbackVision,
                        peo: (json.peo && json.peo.length > 0) ? json.peo : fallbackPEO,
                        pso: (json.pso && json.pso.length > 0) ? json.pso : fallbackPSO,
                        po: (json.po && json.po.length > 0) ? json.po : fallbackPO,
                        subjects: json.subjects || [],
                        bosMeetingDate: json.bosMeetingDate || '29.10.2024',
                        acMeetingDate: json.acMeetingDate || '25.11.2024',
                        regulation: json.regulation || 'R-2023'
                    });
                } else {
                    setData({
                        mission: fallbackMission,
                        vision: fallbackVision,
                        peo: fallbackPEO,
                        pso: fallbackPSO,
                        po: fallbackPO,
                        subjects: [],
                        bosMeetingDate: '29.10.2024',
                        acMeetingDate: '25.11.2024',
                        regulation: 'R-2023'
                    });
                }
            } else {
                setData({
                    mission: fallbackMission,
                    vision: fallbackVision,
                    peo: fallbackPEO,
                    pso: fallbackPSO,
                    po: fallbackPO,
                    subjects: [],
                    bosMeetingDate: '29.10.2024',
                    acMeetingDate: '25.11.2024',
                    regulation: 'R-2023'
                });
            }
        } catch (error) {
            console.error('Error fetching department data:', error);
            setData({
                mission: fallbackMission,
                vision: fallbackVision,
                peo: fallbackPEO,
                pso: fallbackPSO,
                po: fallbackPO,
                subjects: [],
                bosMeetingDate: '29.10.2024',
                acMeetingDate: '25.11.2024',
                regulation: 'R-2023'
            });
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
            const token = getAuthToken();
            const res = await fetch(`${API_BASE_URL}/api/departments/${selectedDept}`, {
                method: 'PUT',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Failed to update (HTTP ${res.status})`);
            }
            const savedData = await res.json();
            setData(savedData || updatedData);
            return true;
        } catch (error) {
            console.error('Error updating department data:', error);
            showAlertDialog({
                title: 'Save Error',
                message: 'Failed to save changes: ' + error.message,
                type: 'danger'
            });
            return false;
        }
    };

    const handleStartEditSubject = (subjOrIndex) => {
        if (typeof subjOrIndex === 'object' && subjOrIndex !== null) {
            setEditingSubjectIndex(-1);
            setEditingFallbackCode(subjOrIndex.code || null);
            setEditingSubjectValue({ ...subjOrIndex });
            return;
        }
        setEditingSubjectIndex(subjOrIndex);
        setEditingFallbackCode(null);
        setEditingSubjectValue({ ...data.subjects[subjOrIndex] });
    };

    const handleCancelEditSubject = () => {
        setEditingSubjectIndex(null);
        setEditingFallbackCode(null);
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
            showAlertDialog({
                title: 'Missing Required Fields',
                message: 'Please enter Course Code and Title.',
                type: 'warning'
            });
            return;
        }

        const isCreator = !editingSubjectValue.creatorDept || editingSubjectValue.creatorDept === selectedDept || isAdmin;
        const matched = masterCourses.find(c => c.code?.toUpperCase() === (editingSubjectValue.code || '').toUpperCase());

        let updatedSubj;
        if (!isCreator && matched) {
            // Preserve master course data from creator department, only update local department curriculum placement
            updatedSubj = {
                ...matched,
                ...editingSubjectValue,
                // Lock core course data
                title: matched.title,
                l: matched.l,
                t: matched.t,
                p: matched.p,
                contactPeriods: matched.contactPeriods,
                credits: matched.credits,
                cia: matched.cia,
                ese: matched.ese,
                total: matched.total,
                subtitle: matched.subtitle,
                categoryName: matched.categoryName,
                prerequisites: matched.prerequisites,
                objectives: matched.objectives,
                outcomes: matched.outcomes,
                units: matched.units,
                textbooks: matched.textbooks,
                references: matched.references,
                webReferences: matched.webReferences,
                experiments: matched.experiments,
                coPoMapping: matched.coPoMapping,
                creatorDept: matched.creatorDept || editingSubjectValue.creatorDept
            };
        } else {
            const lVal = editingSubjectValue.l === '' ? 0 : Number(editingSubjectValue.l || 0);
            const tVal = editingSubjectValue.t === '' ? 0 : Number(editingSubjectValue.t || 0);
            const pVal = editingSubjectValue.p === '' ? 0 : Number(editingSubjectValue.p || 0);
            const ciaVal = editingSubjectValue.cia === '' ? 0 : Number(editingSubjectValue.cia || 0);
            const eseVal = editingSubjectValue.ese === '' ? 0 : Number(editingSubjectValue.ese || 0);

            updatedSubj = {
                ...editingSubjectValue,
                code: editingSubjectValue.code.toUpperCase(),
                creatorDept: editingSubjectValue.creatorDept || selectedDept,
                l: lVal,
                t: tVal,
                p: pVal,
                contactPeriods: lVal + tVal + pVal,
                cia: ciaVal,
                ese: eseVal,
                total: ciaVal + eseVal,
                credits: Number(editingSubjectValue.credits || 0)
            };
        }

        let updatedSubjects;
        if (editingSubjectIndex === -1) {
            updatedSubjects = materializeCatalogSubjects(data.subjects, updatedSubj, editingFallbackCode || editingSubjectValue.code);
        } else {
            updatedSubjects = [...data.subjects];
            updatedSubjects[editingSubjectIndex] = updatedSubj;
        }

        const updatedData = { ...data, subjects: updatedSubjects };
        const success = await updateBackend(updatedData);

        if (success) {
            setEditingSubjectIndex(null);
            setEditingFallbackCode(null);
            setEditingSubjectValue(null);
            fetchMasterCourses();
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

    const handleDeleteItem = (section, index) => {
        showConfirmDialog({
            title: 'Delete Item',
            message: 'Are you sure you want to delete this item?',
            type: 'danger',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
                const newArray = [...data[section]];
                newArray.splice(index, 1);

                const updatedData = { ...data, [section]: newArray };
                await updateBackend(updatedData);
            }
        });
    };

    const handleAddSubject = async () => {
        if (!newSubject.code || !newSubject.title) {
            showAlertDialog({
                title: 'Missing Required Fields',
                message: 'Please enter Course Code and Title.',
                type: 'warning'
            });
            return;
        }
        const cleanCode = newSubject.code.toUpperCase();
        const matched = masterCourses.find(c => c.code?.toUpperCase() === cleanCode);
        const creatorDept = newSubject.creatorDept || matched?.creatorDept || matched?.sourceDept || selectedDept;

        const subjectToAdd = {
            ...newSubject,
            code: cleanCode,
            creatorDept: creatorDept,
            objectives: (newSubject.objectives && newSubject.objectives.length > 0)
                ? newSubject.objectives
                : (matched?.objectives || []),
            outcomes: (newSubject.outcomes && newSubject.outcomes.length > 0)
                ? newSubject.outcomes
                : (matched?.outcomes || []),
            units: (newSubject.units && newSubject.units.length > 0)
                ? newSubject.units
                : (matched?.units || []),
            textbooks: (newSubject.textbooks && newSubject.textbooks.length > 0)
                ? newSubject.textbooks
                : (matched?.textbooks || []),
            references: (newSubject.references && newSubject.references.length > 0)
                ? newSubject.references
                : (matched?.references || []),
            webReferences: (newSubject.webReferences && newSubject.webReferences.length > 0)
                ? newSubject.webReferences
                : (matched?.webReferences || []),
            experiments: (newSubject.experiments && newSubject.experiments.length > 0)
                ? newSubject.experiments
                : (matched?.experiments || []),
            coPoMapping: (newSubject.coPoMapping && newSubject.coPoMapping.length > 0)
                ? newSubject.coPoMapping
                : (matched?.coPoMapping || []),
            prerequisites: newSubject.prerequisites || (matched?.prerequisites || ''),
            subtitle: newSubject.subtitle || (matched?.subtitle || ''),
            categoryName: newSubject.categoryName || (matched?.categoryName || '')
        };

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
        } else if (courseType === 'non_functional_elective') {
            delete subjectToAdd.vertical;
            delete subjectToAdd.verticalName;
            subjectToAdd.isOpenElective = false;
            delete subjectToAdd.offeringDept;
            subjectToAdd.category = 'NON-FUNCTIONAL ELECTIVE (NFE)';
            subjectToAdd.categoryType = 'NFE';
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
                semester: 1, vertical: '', verticalName: '', category: 'THEORY', code: '', title: '', creatorDept: '', categoryType: 'HUM',
                l: 0, t: 0, p: 0, contactPeriods: 0, credits: 0, cia: 0, ese: 0, total: 0, isOpenElective: false, offeringDept: '',
                prerequisites: '', subtitle: '', categoryName: '', objectives: [], outcomes: [], units: [], textbooks: [], references: [], webReferences: [], experiments: [], coPoMapping: []
            });
            setMatchedMasterCourse(null);
            fetchMasterCourses();
        }
    };

    const handleDeleteSubject = (subjOrIndex) => {
        const isCatalogObj = typeof subjOrIndex === 'object' && subjOrIndex !== null;
        const subj = isCatalogObj ? subjOrIndex : (data.subjects && data.subjects[subjOrIndex]);
        const isCreator = !subj?.creatorDept || subj.creatorDept === selectedDept || isAdmin;
        const creatorName = subj?.creatorDept ? getDeptDisplayName(subj.creatorDept) : '';

        showConfirmDialog({
            title: isCreator ? 'Delete Course' : 'Remove Course',
            message: isCreator
                ? `Are you sure you want to delete "${subj?.code || 'this course'}" from the curriculum?`
                : `Remove ${subj?.code || 'this course'} from your department's curriculum?`,
            note: !isCreator && creatorName
                ? `The master course details created by ${creatorName} will remain safe in the system.`
                : '',
            type: isCreator ? 'danger' : 'warning',
            confirmText: isCreator ? 'Delete' : 'Remove',
            cancelText: 'Cancel',
            onConfirm: async () => {
                let newArray;
                if (isCatalogObj) {
                    newArray = materializeCatalogSubjects(data.subjects || [], null, subj.code);
                } else {
                    newArray = [...(data.subjects || [])];
                    newArray.splice(subjOrIndex, 1);
                }
                const updatedData = { ...data, subjects: newArray };
                await updateBackend(updatedData);
            }
        });
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
            {isHOD ? (
                <div style={{
                    background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px',
                    border: '1px solid var(--glass-border)', marginBottom: '2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
                            Your Department
                        </span>
                        <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {staticDepartments.find(d => d.slug === selectedDept)?.name || user?.department}
                        </h2>
                    </div>
                </div>
            ) : (
                /* Department Selector */
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
            )}

            {/* Department Navigation Tabs (Curriculum & Syllabus, Vision & Mission, PEO, PSO, PO, Regulation & Dates) */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem',
                marginBottom: '1.75rem',
                background: 'var(--bg-card)',
                padding: '0.65rem 0.85rem',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                alignItems: 'center'
            }}>
                <button
                    onClick={() => setActiveDeptTab('syllabus')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        border: activeDeptTab === 'syllabus' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeDeptTab === 'syllabus' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                        color: activeDeptTab === 'syllabus' ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: activeDeptTab === 'syllabus' ? 'bold' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaBookOpen /> Curriculum & Syllabus
                </button>
                <button
                    onClick={() => setActiveDeptTab('vision_mission')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        border: activeDeptTab === 'vision_mission' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeDeptTab === 'vision_mission' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                        color: activeDeptTab === 'vision_mission' ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: activeDeptTab === 'vision_mission' ? 'bold' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaBullseye /> Vision & Mission
                </button>
                <button
                    onClick={() => setActiveDeptTab('peo')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        border: activeDeptTab === 'peo' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeDeptTab === 'peo' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                        color: activeDeptTab === 'peo' ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: activeDeptTab === 'peo' ? 'bold' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaGraduationCap /> PEO
                </button>
                <button
                    onClick={() => setActiveDeptTab('pso')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        border: activeDeptTab === 'pso' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeDeptTab === 'pso' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                        color: activeDeptTab === 'pso' ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: activeDeptTab === 'pso' ? 'bold' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaLightbulb /> PSO
                </button>
                <button
                    onClick={() => setActiveDeptTab('po')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        border: activeDeptTab === 'po' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeDeptTab === 'po' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                        color: activeDeptTab === 'po' ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: activeDeptTab === 'po' ? 'bold' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaChartBar /> PO
                </button>
                <button
                    onClick={() => setActiveDeptTab('regulation')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.2rem',
                        borderRadius: '8px',
                        border: activeDeptTab === 'regulation' ? '1px solid var(--primary)' : '1px solid transparent',
                        background: activeDeptTab === 'regulation' ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                        color: activeDeptTab === 'regulation' ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: activeDeptTab === 'regulation' ? 'bold' : '500',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <FaCalendarAlt /> Regulation & Dates
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    Loading department data...
                </div>
            ) : (
                <>
                    {/* Tab 1: Academic Regulation & Meeting Dates */}
                    {activeDeptTab === 'regulation' && (
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
                                            showAlertDialog({
                                                title: 'Regulation Details Saved',
                                                message: 'Regulation details have been updated successfully in the system!',
                                                type: 'success'
                                            });
                                        }
                                    }}
                                    className="btn btn-primary"
                                    style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold' }}
                                >
                                    Save Regulation Details
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Vision & Mission */}
                    {activeDeptTab === 'vision_mission' && (
                        <div className="department-sections-grid">
                            {renderSection('Department Vision', 'vision')}
                            {renderSection('Department Mission', 'mission')}
                        </div>
                    )}

                    {/* Tab 3: PEO */}
                    {activeDeptTab === 'peo' && (
                        <div className="department-sections-grid">
                            {renderSection('Program Educational Objectives (PEO)', 'peo')}
                        </div>
                    )}

                    {/* Tab 4: PSO */}
                    {activeDeptTab === 'pso' && (
                        <div className="department-sections-grid">
                            {renderSection('Program Specific Outcomes (PSO)', 'pso')}
                        </div>
                    )}

                    {/* Tab 5: PO */}
                    {activeDeptTab === 'po' && (
                        <div className="department-sections-grid">
                            {renderSection('Program Outcomes (PO)', 'po')}
                        </div>
                    )}

                    {/* Tab 6: Curriculum & Syllabus */}
                    {activeDeptTab === 'syllabus' && (
                        <div className="dept-section-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', margin: 0 }}>Syllabus Subjects</h3>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
                            </div>

                            {/* Add Subject Form */}
                            <div style={{ background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Add New Subject</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course Type</label>
                                        <select
                                            value={courseType}
                                            onChange={e => {
                                                const ct = e.target.value;
                                                setCourseType(ct);
                                                if (ct === 'non_functional_elective') {
                                                    setNewSubject({ ...newSubject, category: 'NON-FUNCTIONAL ELECTIVE (NFE)', categoryType: 'NFE' });
                                                }
                                            }}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                        >
                                            <option value="semester">Semester Course</option>
                                            <option value="non_functional_elective">Non-Functional Elective (NFE)</option>
                                            <option value="professional_elective">Professional Elective (Vertical)</option>
                                            <option value="open_elective">Open Elective Course</option>
                                        </select>
                                    </div>
                                    {(courseType === 'semester' || courseType === 'non_functional_elective') && (
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
                                    {(courseType === 'semester' || courseType === 'non_functional_elective') && (
                                        <>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                                                <select
                                                    value={newSubject.category}
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        let autoCatType = newSubject.categoryType;
                                                        if (val === 'NON-FUNCTIONAL ELECTIVE (NFE)' || val.includes('NON-FUNCTIONAL') || val.includes('NON FUNCTIONAL')) autoCatType = 'NFE';
                                                        else if (val === 'EMPLOYABILITY ENHANCEMENT COURSE') autoCatType = 'EEC';
                                                        else if (val === 'MANDATORY COURSES') autoCatType = 'MC';
                                                        else if (val.includes('Language')) autoCatType = 'HUM';
                                                        else if (val.includes('IPR') || val.includes('RESEARCH METHODOLOGY')) autoCatType = 'IPR';
                                                        setNewSubject({ ...newSubject, category: val, categoryType: autoCatType });
                                                    }}
                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                                >
                                                    <option value="THEORY">THEORY</option>
                                                    <option value="PRACTICAL">PRACTICAL</option>
                                                    <option value="THEORY CUM PRACTICAL">THEORY CUM PRACTICAL</option>
                                                    <option value="EMPLOYABILITY ENHANCEMENT COURSE">EMPLOYABILITY ENHANCEMENT COURSE</option>
                                                    <option value="MANDATORY COURSES">MANDATORY COURSES</option>
                                                    <option value="NON-FUNCTIONAL ELECTIVE (NFE)">NON-FUNCTIONAL ELECTIVE (NFE)</option>
                                                    <option value="RESEARCH METHODOLOGY AND IPR">RESEARCH METHODOLOGY AND IPR</option>
                                                    <option value="Language Elective – I">Language Elective – I</option>
                                                    <option value="Language Elective - II">Language Elective - II</option>
                                                    <option value="Electives for Honors Degree">Electives for Honors Degree</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category Type</label>
                                                <select
                                                    value={newSubject.categoryType || 'HUM'}
                                                    onChange={e => setNewSubject({ ...newSubject, categoryType: e.target.value })}
                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                                >
                                                    <option value="HUM">HUM</option>
                                                    <option value="BSC">BSC</option>
                                                    <option value="ESC">ESC</option>
                                                    <option value="PCC">PCC</option>
                                                    <option value="PEC">PEC</option>
                                                    <option value="NFE">NFE</option>
                                                    <option value="OEC">OEC</option>
                                                    <option value="EEC">EEC</option>
                                                    <option value="MC">MC</option>
                                                    <option value="IPR">IPR</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    {courseType === 'open_elective' && (
                                        <>
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
                                            {newSubject.offeringDept && (
                                                <div>
                                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                        {loadingOfferingSubjects ? 'Loading Courses...' : 'Select Course'}
                                                    </label>
                                                    <select
                                                        value={newSubject.code || ''}
                                                        onChange={e => {
                                                            const selectedCode = e.target.value;
                                                            if (!selectedCode) return;
                                                            const selectedSubj = offeringDeptSubjects.find(s => s.code === selectedCode);
                                                            if (selectedSubj) {
                                                                setNewSubject(prev => ({
                                                                    ...prev,
                                                                    code: selectedSubj.code || '',
                                                                    title: selectedSubj.title || '',
                                                                    credits: selectedSubj.credits !== undefined ? selectedSubj.credits : 3,
                                                                    l: selectedSubj.l !== undefined ? selectedSubj.l : 0,
                                                                    t: selectedSubj.t !== undefined ? selectedSubj.t : 0,
                                                                    p: selectedSubj.p !== undefined ? selectedSubj.p : 0,
                                                                    contactPeriods: selectedSubj.contactPeriods !== undefined ? selectedSubj.contactPeriods : 0,
                                                                    cia: selectedSubj.cia !== undefined ? selectedSubj.cia : 40,
                                                                    ese: selectedSubj.ese !== undefined ? selectedSubj.ese : 60,
                                                                    total: selectedSubj.total !== undefined ? selectedSubj.total : 100,
                                                                    prerequisites: selectedSubj.prerequisites || '',
                                                                    categoryName: selectedSubj.categoryName || '',
                                                                    subtitle: selectedSubj.subtitle || '',
                                                                    objectives: selectedSubj.objectives || [],
                                                                    outcomes: selectedSubj.outcomes || [],
                                                                    units: selectedSubj.units || [],
                                                                    textbooks: selectedSubj.textbooks || [],
                                                                    references: selectedSubj.references || [],
                                                                    webReferences: selectedSubj.webReferences || [],
                                                                    coPoMapping: selectedSubj.coPoMapping || [],
                                                                    experiments: selectedSubj.experiments || [],
                                                                }));
                                                            }
                                                        }}
                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                                    >
                                                        <option value="">-- Choose Course --</option>
                                                        {offeringDeptSubjects.map(s => (
                                                            <option key={s.code} value={s.code}>{s.code} - {s.title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {/* Inter-Department Master Course Bank Quick Selector */}
                                    <div style={{ gridColumn: '1 / -1', marginBottom: '0.8rem', padding: '0.8rem 1rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(59, 130, 246, 0.08))', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '6px' }}>
                                            <label style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                                                ⚡ Shared Inter-Department Course Bank (Auto-Fill Full Syllabus, Units, L-T-P & Credits)
                                            </label>
                                            {loadingMasterCourses && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Loading Master Bank...</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <select
                                                value={matchedMasterCourse ? matchedMasterCourse.code : ''}
                                                onChange={e => {
                                                    const sel = e.target.value;
                                                    if (sel) {
                                                        applyMasterCourseToNewSubject(sel);
                                                    } else {
                                                        setMatchedMasterCourse(null);
                                                    }
                                                }}
                                                style={{
                                                    flex: 1, minWidth: '260px', padding: '0.6rem 0.8rem', borderRadius: '6px',
                                                    background: 'var(--bg-main)', border: '1px solid rgba(99, 102, 241, 0.45)',
                                                    color: 'white', outline: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '500'
                                                }}
                                            >
                                                <option value="">-- Choose Existing Course to Auto-Fill Details ({masterCourses.length} available) --</option>
                                                {masterCourses.map(c => (
                                                    <option key={c.code} value={c.code}>
                                                        {c.code} - {c.title} (L-T-P: {c.l || 0}-{c.t || 0}-{c.p || 0}, C: {c.credits || 0}) • {c.sourceDeptName || 'Master Bank'}
                                                    </option>
                                                ))}
                                            </select>
                                            {matchedMasterCourse && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMatchedMasterCourse(null);
                                                        setNewSubject(prev => ({ ...prev, code: '', title: '', l: 0, t: 0, p: 0, credits: 3 }));
                                                    }}
                                                    style={{ padding: '0.5rem 0.9rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#fca5a5', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                        {matchedMasterCourse && (
                                            <div style={{ marginTop: '0.6rem', padding: '0.5rem 0.8rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px', fontSize: '0.8rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                <FaCheckCircle color="#10b981" />
                                                <span><strong>Linked with {matchedMasterCourse.code}:</strong> Title, Category, Credits ({matchedMasterCourse.credits}), L-T-P ({matchedMasterCourse.l}-{matchedMasterCourse.t}-{matchedMasterCourse.p}), 5 Syllabus Units, Course Outcomes, and Textbooks auto-loaded!</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course Code (Type or Pick from Suggestions)</label>
                                        <input
                                            type="text"
                                            list="master-course-codes-list"
                                            value={newSubject.code}
                                            onChange={e => {
                                                const val = e.target.value.toUpperCase();
                                                setNewSubject(prev => ({ ...prev, code: val }));
                                                applyMasterCourseToNewSubject(val);
                                            }}
                                            placeholder="e.g. HS3151 or CS3251"
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }}
                                        />
                                        <datalist id="master-course-codes-list">
                                            {masterCourses.map(c => (
                                                <option key={c.code} value={c.code}>
                                                    {c.title} • ({c.sourceDeptName || 'Master Bank'})
                                                </option>
                                            ))}
                                        </datalist>
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
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CIA</label><input type="number" min="0" max="100" value={newSubject.cia} onChange={e => { const val = e.target.value; updateNewSubjectField('cia', val === '' ? '' : Math.min(100, Math.max(0, Number(val)))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ESE</label><input type="number" min="0" max="100" value={newSubject.ese} onChange={e => { const val = e.target.value; updateNewSubjectField('ese', val === '' ? '' : Math.min(100, Math.max(0, Number(val)))); }} style={{ width: '100%', padding: '0.4rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white' }} /></div>
                                    <div><label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total</label><input type="number" value={newSubject.total} readOnly style={{ width: '100%', padding: '0.4rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#aaa', cursor: 'not-allowed' }} /></div>
                                </div>

                                <button onClick={handleAddSubject} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                                    <FaPlus /> Add Subject
                                </button>
                            </div>

                            {/* List of Subjects */}
                            {(data.subjects || []).length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>No subjects defined yet.</p>
                            ) : (
                                <div style={{ marginBottom: '2rem' }}>
                                    {(() => {
                                        const activeAdminDept = staticDepartments.find(d => d.slug === selectedDept);
                                        const isMBA = isMBADepartment(activeAdminDept || selectedDept) || isMBADepartment(data?.name);
                                        const rawSubjectsWithIndex = (data.subjects || []).map((subj, idx) => ({ ...subj, originalIndex: idx }));
                                        const subjectsWithIndex = isMBA ? withMbaDefaultElectivesIfMissing(rawSubjectsWithIndex) : rawSubjectsWithIndex;
                                        const isPecTrackSubject = (s) => Boolean(s?.vertical) || (isMBA && Boolean(s?.verticalName && s.verticalName.trim() !== ''));

                                        // Group semesters (excluding verticals and open electives)
                                        const semestersGrouped = subjectsWithIndex.filter(s => !isPecTrackSubject(s) && !s.isOpenElective).reduce((acc, subj) => {
                                            const sem = subj.semester || 1;
                                            if (!acc[sem]) acc[sem] = [];
                                            acc[sem].push(subj);
                                            return acc;
                                        }, {});
                                        const sortedSemesters = Object.keys(semestersGrouped).sort((a, b) => Number(a) - Number(b));

                                        // Group verticals
                                        const verticalsGrouped = subjectsWithIndex.filter(isPecTrackSubject).reduce((acc, subj) => {
                                            const vert = subj.vertical || subj.verticalName;
                                            if (!acc[vert]) acc[vert] = [];
                                            acc[vert].push(subj);
                                            return acc;
                                        }, {});
                                        const sortedVerticals = Object.keys(verticalsGrouped).sort((a, b) => {
                                            const na = Number(a);
                                            const nb = Number(b);
                                            if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
                                            return String(a).localeCompare(String(b));
                                        });

                                        const renderActionCell = (subj, isCourseCreator, creatorName) => {
                                            const actionTarget = typeof subj.originalIndex === 'number' ? subj.originalIndex : subj;
                                            return (
                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', alignItems: 'center' }}>
                                                    <button
                                                        onClick={() => handleStartManageSyllabus(actionTarget)}
                                                        className={isCourseCreator ? "btn btn-primary" : "btn"}
                                                        style={{
                                                            padding: '0.3rem 0.5rem',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '0.25rem',
                                                            fontSize: '0.75rem',
                                                            whiteSpace: 'nowrap',
                                                            background: isCourseCreator ? undefined : 'rgba(99, 102, 241, 0.15)',
                                                            border: isCourseCreator ? undefined : '1px solid rgba(99, 102, 241, 0.4)',
                                                            color: isCourseCreator ? undefined : '#c7d2fe'
                                                        }}
                                                        title={isCourseCreator ? "Manage Syllabus" : `View Syllabus (Created by ${creatorName})`}
                                                    >
                                                        {isCourseCreator ? 'Syllabus' : 'View'} {isCourseCreator ? <FaBook size={10} /> : <FaLock size={8} />}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            exportSubjectSyllabusPDF(subj, {
                                                                ...(data || {}),
                                                                name: activeAdminDept ? activeAdminDept.name : (data?.name || 'Engineering Department'),
                                                                slug: selectedDept
                                                            }, academicLevel);
                                                        }}
                                                        className="btn"
                                                        style={{
                                                            padding: '0.3rem 0.45rem',
                                                            background: 'rgba(16, 185, 129, 0.15)',
                                                            border: '1px solid rgba(16, 185, 129, 0.4)',
                                                            color: '#6ee7b7',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer'
                                                        }}
                                                        title="Print Subject Syllabus PDF"
                                                    >
                                                        <FaPrint size={11} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStartEditSubject(actionTarget)}
                                                        className="btn"
                                                        style={{
                                                            padding: '0.3rem 0.45rem',
                                                            background: 'var(--bg-main)',
                                                            border: '1px solid var(--glass-border)',
                                                            color: isCourseCreator ? 'var(--text-main)' : '#fbbf24',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        title={isCourseCreator ? "Edit Subject" : `Edit Curriculum Placement (Course details locked by ${creatorName})`}
                                                    >
                                                        <FaEdit size={11} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSubject(actionTarget)}
                                                        className="btn btn-danger"
                                                        style={{ padding: '0.3rem 0.45rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                        title={isCourseCreator ? "Delete Subject" : `Remove from your department's curriculum`}
                                                    >
                                                        <FaTrash size={11} />
                                                    </button>
                                                </div>
                                            </td>
                                            );
                                        };

                                        const renderAdminMbaHead = () => (
                                            <thead style={{ background: 'transparent' }}>
                                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.35rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '5%' }}>S. No.</th>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '11%' }}>Course Code</th>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '25%' }}>Course Title</th>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.35rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '7%' }}>Category</th>
                                                    <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '9%' }}>Periods per Week</th>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.35rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Total Contact Periods</th>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.35rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '6%' }}>Credits</th>
                                                    <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '13%' }}>Marks</th>
                                                    <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '16%' }}>Action</th>
                                                </tr>
                                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                    <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                </tr>
                                            </thead>
                                        );

                                        const renderAdminMbaRow = (subj, sNo, rowKey) => {
                                            const isCourseCreator = !subj.creatorDept || subj.creatorDept === selectedDept || isAdmin;
                                            const creatorName = subj.creatorDept ? getDeptDisplayName(subj.creatorDept) : '';
                                            const titleUpper = (subj.title || subj.name || '').toUpperCase();
                                            const codeUpper = (subj.code || '').toUpperCase();
                                            const isInduction = titleUpper.includes('INDUCTION') || codeUpper.includes('INDUCTION');
                                            const isInternship = titleUpper.includes('INTERNSHIP') && Number(subj.l || 0) === 0 && Number(subj.t || 0) === 0;
                                            const catDisplay = subj.categoryType || classifyMbaSubjectCategory(subj);

                                            return (
                                                <tr key={rowKey} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{sNo}</td>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                        <div>{subj.code}</div>
                                                        {!isCourseCreator && (
                                                            <span
                                                                title={`Course created by ${creatorName}. Shared in read-only mode.`}
                                                                style={{
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '3px',
                                                                    fontSize: '0.68rem',
                                                                    padding: '1px 5px',
                                                                    borderRadius: '4px',
                                                                    background: 'rgba(99, 102, 241, 0.15)',
                                                                    color: '#a5b4fc',
                                                                    border: '1px solid rgba(99, 102, 241, 0.3)',
                                                                    marginTop: '3px',
                                                                    fontWeight: 'normal'
                                                                }}
                                                            >
                                                                <FaLock size={7} /> {creatorName || 'Shared'}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.5rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{catDisplay}</td>
                                                    {isInduction || isInternship ? (
                                                        <td colSpan={4} style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                                                            {isInduction ? '2 WEEKS' : '4 Weeks'}
                                                        </td>
                                                    ) : (
                                                        <>
                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l ?? 0}</td>
                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t ?? 0}</td>
                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p ?? 0}</td>
                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods ?? ((Number(subj.l || 0) + Number(subj.t || 0) + Number(subj.p || 0)))}</td>
                                                        </>
                                                    )}
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{isInduction ? 0 : subj.credits}</td>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{isInduction ? '-' : subj.cia}</td>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{isInduction ? '-' : subj.ese}</td>
                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 'bold' }}>{isInduction ? '-' : subj.total}</td>
                                                    {renderActionCell(subj, isCourseCreator, creatorName)}
                                                </tr>
                                            );
                                        };

                                        return (
                                            <>
                                                {isMBA && sortedSemesters.length > 0 && (
                                                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', textAlign: 'center', fontWeight: 'bold', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                                                        I TO IV SEMESTERS CURRICULUM
                                                    </h3>
                                                )}

                                                {/* Semester Tables */}
                                                {sortedSemesters.map(semNum => {
                                                    const subjectsForSem = semestersGrouped[semNum];

                                                    if (isMBA) {
                                                        const {
                                                            nfeOptions,
                                                            mandatoryCourses,
                                                            theoryCourses,
                                                            theoryCumPracticalCourses,
                                                            employabilityCourses,
                                                            practicalCourses,
                                                            otherCourses,
                                                            regularCoursesForTotal
                                                        } = classifyMbaSemesterCourses(subjectsForSem, sortSubjectsByCode);

                                                        const semTotalL = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.l) || 0), 0);
                                                        const semTotalT = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.t) || 0), 0);
                                                        const semTotalP = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.p) || 0), 0);
                                                        const semTotalCP = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.contactPeriods ?? (Number(s.l || 0) + Number(s.t || 0) + Number(s.p || 0))) || 0), 0);
                                                        const semTotalCredits = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.credits) || 0), 0);

                                                        const isSingleProjectSemIV = Number(semNum) === 4 && employabilityCourses.length === 1 && theoryCourses.length === 0 && practicalCourses.length === 0 && theoryCumPracticalCourses.length === 0 && mandatoryCourses.length === 0 && otherCourses.length === 0;
                                                        let sNoCounter = 0;

                                                        const mbaSections = [
                                                            { title: 'THEORY COURSES', items: theoryCourses },
                                                            { title: 'THEORY CUM PRACTICAL COURSES', items: theoryCumPracticalCourses },
                                                            { title: isSingleProjectSemIV ? null : 'EMPLOYABILITY ENHANCEMENT COURSE', items: employabilityCourses },
                                                            { title: 'PRACTICAL COURSES', items: practicalCourses },
                                                            { title: 'MANDATORY COURSES', items: mandatoryCourses },
                                                            { title: 'OTHER COURSES', items: otherCourses }
                                                        ].filter(sec => sec.items.length > 0);

                                                        return (
                                                            <div key={`sem-${semNum}`} style={{ marginBottom: '2rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--bg-section)' }}>
                                                                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}>
                                                                    SEMESTER {getRomanNumeral(semNum)}
                                                                </h4>
                                                                <div style={{ width: '100%', overflowX: 'auto' }}>
                                                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', border: '1px solid var(--glass-border)' }}>
                                                                        {renderAdminMbaHead()}
                                                                        <tbody>
                                                                            {mbaSections.map((sec, secIdx) => (
                                                                                <React.Fragment key={secIdx}>
                                                                                    {sec.title && (
                                                                                        <tr>
                                                                                            <td colSpan="13" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.75rem', fontWeight: 'bold', background: 'rgba(255,255,255,0.03)', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                                                                                {sec.title}
                                                                                            </td>
                                                                                        </tr>
                                                                                    )}
                                                                                    {sec.items.map((subj, idx) => renderAdminMbaRow(subj, ++sNoCounter, `${semNum}-${secIdx}-${idx}`))}
                                                                                </React.Fragment>
                                                                            ))}
                                                                            {!isSingleProjectSemIV && (
                                                                                <tr style={{ background: 'rgba(255,255,255,0.04)', fontWeight: 'bold' }}>
                                                                                    <td colSpan="4" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem', textAlign: 'center', color: 'var(--primary)' }}>TOTAL</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--primary)' }}>{semTotalL}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--primary)' }}>{semTotalT}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--primary)' }}>{semTotalP}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--primary)' }}>{semTotalCP}</td>
                                                                                    <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--primary)' }}>{semTotalCredits}</td>
                                                                                    <td colSpan="4" style={{ border: '1px solid var(--glass-border)' }}></td>
                                                                                </tr>
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                {Number(semNum) === 3 && (
                                                                    <p style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                                                        Internship – minimum of 4 weeks of internship. The report along with the company certificate should be submitted of around 40 pages. The report should be sent to the Controller of Examinations by the HOD through the Principal, before the last working day of the 3rd Semester.
                                                                    </p>
                                                                )}
                                                                {Number(semNum) === 4 && (
                                                                    <p style={{ marginTop: '0.75rem', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                                                        <strong style={{ color: 'var(--text-main)' }}>Note :</strong> Students should select the Project Topic for their Project work only based on the selected area from two functional specialization.
                                                                    </p>
                                                                )}

                                                                {nfeOptions.length > 0 && (
                                                                    <div style={{ marginTop: '1.5rem' }}>
                                                                        <h5 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                                            NON-FUNCTIONAL ELECTIVE (NFE)
                                                                        </h5>
                                                                        <div style={{ width: '100%', overflowX: 'auto' }}>
                                                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', border: '1px solid var(--glass-border)' }}>
                                                                                {renderAdminMbaHead()}
                                                                                <tbody>
                                                                                    {nfeOptions.map((subj, nIdx) => renderAdminMbaRow(subj, nIdx + 1, `nfe-${semNum}-${nIdx}`))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <p style={{ marginTop: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                                                                            <strong style={{ color: 'var(--text-main)' }}>Note:</strong> In the First Semester students need to choose one elective from Non-Functional Stream
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }

                                                    const categoriesGrouped = subjectsForSem.reduce((acc, subj) => {
                                                        let cat = subj.category || 'THEORY';
                                                        const cUpper = String(cat).toUpperCase().trim();
                                                        const typeUpper = String(subj.categoryType || '').toUpperCase().trim();
                                                        if (cUpper.includes('NON-FUNCTIONAL') || cUpper.includes('NON FUNCTIONAL') || cUpper.includes('NFE') || typeUpper === 'NFE') cat = 'NON-FUNCTIONAL ELECTIVE (NFE)';
                                                        else if (cUpper.includes('THEORY CUM') || cUpper.includes('INTEGRATED') || (Number(subj.l || 0) > 0 && Number(subj.p || 0) > 0 && !cUpper.includes('THEORY') && !cUpper.includes('PRACTICAL'))) cat = 'THEORY CUM PRACTICAL';
                                                        else if (cUpper.includes('PRACTICAL') || cUpper.includes('LAB') || cUpper === 'PR' || (typeUpper === 'PCC' && Number(subj.l || 0) === 0 && Number(subj.p || 0) > 0)) cat = 'PRACTICAL';
                                                        else if (cUpper.includes('EMPLOYABILITY') || cUpper.includes('EEC') || typeUpper === 'EEC') cat = 'EMPLOYABILITY ENHANCEMENT COURSE';
                                                        else if (cUpper.includes('MANDATORY') || cUpper.includes('MC') || typeUpper === 'MC') cat = 'MANDATORY COURSES';
                                                        else if (cUpper.includes('LANGUAGE') && (cUpper.includes('I') || cUpper.includes('1'))) cat = 'Language Elective – I';
                                                        else if (cUpper.includes('LANGUAGE') && (cUpper.includes('II') || cUpper.includes('2'))) cat = 'Language Elective - II';
                                                        else if (cUpper.includes('HONOR')) cat = 'Electives for Honors Degree';
                                                        else cat = 'THEORY';

                                                        if (!acc[cat]) acc[cat] = [];
                                                        acc[cat].push({ ...subj, category: cat });
                                                        return acc;
                                                    }, {});

                                                    return (
                                                        <div key={`sem-${semNum}`} style={{ marginBottom: '2rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--bg-section)' }}>
                                                            <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}>
                                                                SEMESTER {semNum}
                                                            </h4>
                                                            <div style={{ width: '100%' }}>
                                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', border: '1px solid var(--glass-border)' }}>
                                                                    <thead style={{ background: 'transparent' }}>
                                                                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '12%' }}>Course Code</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '28%' }}>Course Title</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Category</th>
                                                                            <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '9%' }}>Periods / Week</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Contact Periods</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '5%' }}>Credit</th>
                                                                            <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '14%' }}>Marks</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '16%' }}>Action</th>
                                                                        </tr>
                                                                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {Object.entries(categoriesGrouped).map(([categoryName, categorySubjects], catIdx) => (
                                                                            <React.Fragment key={catIdx}>
                                                                                <tr>
                                                                                    <td colSpan="12" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.75rem', fontWeight: 'bold', background: 'rgba(255,255,255,0.03)', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                                                                                        {categoryName === 'THEORY' ? 'THEORY COURSES' : categoryName === 'PRACTICAL' ? 'PRACTICAL COURSES' : categoryName === 'THEORY CUM PRACTICAL' ? 'THEORY CUM PRACTICAL COURSES' : categoryName === 'EMPLOYABILITY ENHANCEMENT COURSE' ? 'EMPLOYABILITY ENHANCEMENT COURSE' : (categoryName === 'NON-FUNCTIONAL ELECTIVE (NFE)' || categoryName.includes('NON-FUNCTIONAL') || categoryName.includes('NON FUNCTIONAL')) ? 'NON-FUNCTIONAL ELECTIVE COURSES' : categoryName === 'MANDATORY COURSES' ? 'MANDATORY COURSES' : categoryName}
                                                                                    </td>
                                                                                </tr>
                                                                                {sortSubjectsByCode(categorySubjects).map((subj, subjIdx) => {
                                                                                    const isCourseCreator = !subj.creatorDept || subj.creatorDept === selectedDept || isAdmin;
                                                                                    const creatorName = subj.creatorDept ? getDeptDisplayName(subj.creatorDept) : '';
                                                                                    const isInduction = (subj.title || subj.name || '').toUpperCase().includes('INDUCTION') || (subj.code || '').toUpperCase().includes('INDUCTION');
                                                                                    return (
                                                                                        <tr key={subjIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                            <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                                                                <div>{subj.code}</div>
                                                                                                {!isCourseCreator && (
                                                                                                    <span
                                                                                                        title={`Course created by ${creatorName}. Shared in read-only mode.`}
                                                                                                        style={{
                                                                                                            display: 'inline-flex',
                                                                                                            alignItems: 'center',
                                                                                                            gap: '3px',
                                                                                                            fontSize: '0.68rem',
                                                                                                            padding: '1px 5px',
                                                                                                            borderRadius: '4px',
                                                                                                            background: 'rgba(99, 102, 241, 0.15)',
                                                                                                            color: '#a5b4fc',
                                                                                                            border: '1px solid rgba(99, 102, 241, 0.3)',
                                                                                                            marginTop: '3px',
                                                                                                            fontWeight: 'normal'
                                                                                                        }}
                                                                                                    >
                                                                                                        <FaLock size={7} /> {creatorName || 'Shared'}
                                                                                                    </span>
                                                                                                )}
                                                                                            </td>
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
                                                                                            {renderActionCell(subj, isCourseCreator, creatorName)}
                                                                                        </tr>
                                                                                    );
                                                                                })}
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
                                                    <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--bg-section)' }}>
                                                        <h4 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: isMBA ? '0.25rem' : '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                            {isMBA ? 'PROFESSIONAL ELECTIVE COURSES (PEC)' : 'Professional Elective Courses'}
                                                        </h4>
                                                        {isMBA && (
                                                            <>
                                                                <div style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.75rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                                    FUNCTIONAL SPECIALISATIONS
                                                                </div>
                                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                                                    Students can take 3+3 elective courses from each specialisation
                                                                </p>
                                                            </>
                                                        )}
                                                        <div style={{ width: '100%', overflowX: 'auto' }}>
                                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', border: '1px solid var(--glass-border)' }}>
                                                                {isMBA ? renderAdminMbaHead() : (
                                                                    <thead style={{ background: 'transparent' }}>
                                                                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Course Code</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '32%' }}>Course Title</th>
                                                                            <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '10%' }}>Periods per Week</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '9%' }}>Contact Periods</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '6%' }}>Credit</th>
                                                                            <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '13%' }}>Marks</th>
                                                                            <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Action</th>
                                                                        </tr>
                                                                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                                            <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                )}
                                                                <tbody>
                                                                    {(() => {
                                                                        return sortedVerticals.map(vertNum => {
                                                                            const subjectsForVert = sortSubjectsByCode(verticalsGrouped[vertNum] || []);
                                                                            const verticalName = subjectsForVert.find(s => s.verticalName)?.verticalName || '';
                                                                            const romanNum = getRomanNumeral(vertNum);

                                                                            if (isMBA) {
                                                                                return (
                                                                                    <React.Fragment key={`vert-${vertNum}`}>
                                                                                        <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                                                            <td colSpan="13" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.9rem' }}>
                                                                                                Stream/ Specialization: {verticalName || `Specialisation ${romanNum}`}
                                                                                            </td>
                                                                                        </tr>
                                                                                        {subjectsForVert.map((subj, subjIdx) => renderAdminMbaRow(subj, subjIdx + 1, `mba-pec-${vertNum}-${subjIdx}`))}
                                                                                    </React.Fragment>
                                                                                );
                                                                            }

                                                                            return (
                                                                                <React.Fragment key={`vert-${vertNum}`}>
                                                                                    <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                                                        <td colSpan="11" style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.9rem' }}>
                                                                                            Vertical {romanNum}: {verticalName}
                                                                                        </td>
                                                                                    </tr>
                                                                                    {subjectsForVert.map((subj, subjIdx) => {
                                                                                        const isCourseCreator = !subj.creatorDept || subj.creatorDept === selectedDept || isAdmin;
                                                                                        const creatorName = subj.creatorDept ? getDeptDisplayName(subj.creatorDept) : '';
                                                                                        return (
                                                                                            <tr key={subjIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                                                                    <div>{subj.code}</div>
                                                                                                    {!isCourseCreator && (
                                                                                                        <span
                                                                                                            title={`Course created by ${creatorName}. Shared in read-only mode.`}
                                                                                                            style={{
                                                                                                                display: 'inline-flex',
                                                                                                                alignItems: 'center',
                                                                                                                gap: '3px',
                                                                                                                fontSize: '0.68rem',
                                                                                                                padding: '1px 5px',
                                                                                                                borderRadius: '4px',
                                                                                                                background: 'rgba(99, 102, 241, 0.15)',
                                                                                                                color: '#a5b4fc',
                                                                                                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                                                                                                marginTop: '3px',
                                                                                                                fontWeight: 'normal'
                                                                                                            }}
                                                                                                        >
                                                                                                            <FaLock size={7} /> {creatorName || 'Shared'}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.5rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                                {renderActionCell(subj, isCourseCreator, creatorName)}
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
                                                    <div style={{ marginTop: '3rem', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.25rem', background: 'var(--bg-section)' }}>
                                                        <h4 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                            Open Elective Courses
                                                        </h4>
                                                        <div style={{ width: '100%' }}>
                                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', border: '1px solid var(--glass-border)' }}>
                                                                <thead style={{ background: 'transparent' }}>
                                                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Course Code</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'left', verticalAlign: 'middle', width: '45%' }}>Course Title</th>
                                                                        <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '10%' }}>Periods per Week</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '8%' }}>Contact Periods</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '5%' }}>Credit</th>
                                                                        <th colSpan="3" style={{ border: '1px solid var(--glass-border)', padding: '0.35rem', color: 'var(--text-main)', textAlign: 'center', width: '12%' }}>Marks</th>
                                                                        <th rowSpan="2" style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', color: 'var(--text-main)', textAlign: 'center', verticalAlign: 'middle', width: '15%' }}>Action</th>
                                                                    </tr>
                                                                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>L</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>T</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>P</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>CIA</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>ESE</th>
                                                                        <th style={{ border: '1px solid var(--glass-border)', padding: '0.3rem', color: 'var(--text-muted)', textAlign: 'center' }}>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(() => {
                                                                        const oecsGrouped = subjectsWithIndex.filter(s => s.isOpenElective).reduce((acc, subj) => {
                                                                            const dept = (subj.offeringDept && subj.offeringDept !== 'Other Departments') ? subj.offeringDept : (deptData?.name || selectedDeptObj?.name || 'Biomedical Engineering');
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
                                                                                        <td colSpan={11} style={{ border: '1px solid var(--glass-border)', padding: '0.6rem 0.75rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--primary)', fontSize: '0.95rem' }}>
                                                                                            {deptName}
                                                                                        </td>
                                                                                    </tr>
                                                                                    {deptSubjects.map((subj, idx) => {
                                                                                        const isCourseCreator = !subj.creatorDept || subj.creatorDept === selectedDept || isAdmin;
                                                                                        const creatorName = subj.creatorDept ? getDeptDisplayName(subj.creatorDept) : '';
                                                                                        return (
                                                                                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.4rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                                                                    <div>{subj.code}</div>
                                                                                                    {!isCourseCreator && (
                                                                                                        <span
                                                                                                            title={`Course created by ${creatorName}. Shared in read-only mode.`}
                                                                                                            style={{
                                                                                                                display: 'inline-flex',
                                                                                                                alignItems: 'center',
                                                                                                                gap: '3px',
                                                                                                                fontSize: '0.68rem',
                                                                                                                padding: '1px 5px',
                                                                                                                borderRadius: '4px',
                                                                                                                background: 'rgba(99, 102, 241, 0.15)',
                                                                                                                color: '#a5b4fc',
                                                                                                                border: '1px solid rgba(99, 102, 241, 0.3)',
                                                                                                                marginTop: '3px',
                                                                                                                fontWeight: 'normal'
                                                                                                            }}
                                                                                                        >
                                                                                                            <FaLock size={7} /> {creatorName || 'Shared'}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.5rem', color: 'var(--text-main)' }}>{subj.title}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.l}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.t}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.p}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.contactPeriods}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>{subj.credits}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.cia}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.2rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.ese}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center', color: 'var(--text-muted)' }}>{subj.total}</td>
                                                                                                <td style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 0.3rem', textAlign: 'center' }}>
                                                                                                    <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                        <button
                                                                                                            onClick={() => handleStartManageSyllabus(subj.originalIndex)}
                                                                                                            className={isCourseCreator ? "btn btn-primary" : "btn"}
                                                                                                            style={{
                                                                                                                padding: '0.3rem 0.5rem',
                                                                                                                display: 'inline-flex',
                                                                                                                alignItems: 'center',
                                                                                                                justifyContent: 'center',
                                                                                                                gap: '0.25rem',
                                                                                                                fontSize: '0.75rem',
                                                                                                                whiteSpace: 'nowrap',
                                                                                                                background: isCourseCreator ? undefined : 'rgba(99, 102, 241, 0.15)',
                                                                                                                border: isCourseCreator ? undefined : '1px solid rgba(99, 102, 241, 0.4)',
                                                                                                                color: isCourseCreator ? undefined : '#c7d2fe'
                                                                                                            }}
                                                                                                            title={isCourseCreator ? "Manage Syllabus" : `View Syllabus (Created by ${creatorName})`}
                                                                                                        >
                                                                                                            {isCourseCreator ? 'Syllabus' : 'View'} {isCourseCreator ? <FaBook size={10} /> : <FaLock size={8} />}
                                                                                                        </button>
                                                                                                        <button
                                                                                                            onClick={() => {
                                                                                                                const activeDeptObj = staticDepartments.find(d => d.slug === selectedDept);
                                                                                                                exportSubjectSyllabusPDF(subj, {
                                                                                                                    ...(data || {}),
                                                                                                                    name: activeDeptObj ? activeDeptObj.name : (data?.name || 'Engineering Department'),
                                                                                                                    slug: selectedDept
                                                                                                                }, academicLevel);
                                                                                                            }}
                                                                                                            className="btn"
                                                                                                            style={{
                                                                                                                padding: '0.3rem 0.45rem',
                                                                                                                background: 'rgba(16, 185, 129, 0.15)',
                                                                                                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                                                                                                color: '#6ee7b7',
                                                                                                                display: 'inline-flex',
                                                                                                                alignItems: 'center',
                                                                                                                justifyContent: 'center',
                                                                                                                cursor: 'pointer'
                                                                                                            }}
                                                                                                            title="Print Subject Syllabus PDF"
                                                                                                        >
                                                                                                            <FaPrint size={11} />
                                                                                                        </button>
                                                                                                        <button
                                                                                                            onClick={() => handleStartEditSubject(subj.originalIndex)}
                                                                                                            className="btn"
                                                                                                            style={{
                                                                                                                padding: '0.3rem 0.45rem',
                                                                                                                background: 'var(--bg-main)',
                                                                                                                border: '1px solid var(--glass-border)',
                                                                                                                color: isCourseCreator ? 'var(--text-main)' : '#fbbf24',
                                                                                                                display: 'inline-flex',
                                                                                                                alignItems: 'center',
                                                                                                                justifyContent: 'center'
                                                                                                            }}
                                                                                                            title={isCourseCreator ? "Edit Subject" : `Edit Curriculum Placement (Course details locked by ${creatorName})`}
                                                                                                        >
                                                                                                            <FaEdit size={11} />
                                                                                                        </button>
                                                                                                        <button
                                                                                                            onClick={() => handleDeleteSubject(subj.originalIndex)}
                                                                                                            className="btn btn-danger"
                                                                                                            style={{ padding: '0.3rem 0.45rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                                                            title={isCourseCreator ? "Delete Subject" : `Remove from your department's curriculum`}
                                                                                                        >
                                                                                                            <FaTrash size={11} />
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
                                                {renderCreditDistributionTable(data.subjects, isMBA, activeAdminDept?.name || data?.name || 'Master of Business Administration')}
                                            </>
                                        );
                                    })()
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* Edit Subject Modal */}
            {/* Edit Subject Modal */}
            {editingSubjectIndex !== null && editingSubjectValue !== null && (() => {
                const isCreator = !editingSubjectValue.creatorDept || editingSubjectValue.creatorDept === selectedDept || isAdmin;
                const creatorName = editingSubjectValue.creatorDept ? getDeptDisplayName(editingSubjectValue.creatorDept) : '';

                return (
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
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>Edit Subject</h3>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        {isCreator ? `Creator Department: ${getDeptDisplayName(selectedDept)}` : `Shared from: ${creatorName || 'Master Bank'} (Core Details Locked)`}
                                    </span>
                                </div>
                                <button onClick={handleCancelEditSubject} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}><FaTimes /></button>
                            </div>

                            {!isCreator && (
                                <div style={{
                                    padding: '0.85rem 1rem',
                                    background: 'rgba(234, 179, 8, 0.12)',
                                    border: '1px solid rgba(234, 179, 8, 0.35)',
                                    borderRadius: '8px',
                                    color: '#fef08a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    fontSize: '0.85rem'
                                }}>
                                    <FaLock size={16} style={{ color: '#facc15', flexShrink: 0 }} />
                                    <div>
                                        <strong style={{ color: '#ffffff' }}>Course Data Owned by {creatorName}</strong>
                                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>
                                            Course Code, Title, and L-T-P-Credits are managed by <strong>{creatorName}</strong> and cannot be edited by other departments. You can only adjust the semester or elective category placement within your department's curriculum.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Inter-Department Master Course Bank Quick Selector */}
                            {isCreator && (
                                <div style={{ padding: '0.8rem 1rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(59, 130, 246, 0.08))', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '6px' }}>
                                        <label style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                                            ⚡ Sync / Auto-Fill from Inter-Department Course Bank
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <select
                                            value={editingSubjectValue.code || ''}
                                            onChange={e => {
                                                const sel = e.target.value;
                                                if (sel) {
                                                    applyMasterCourseToEditingSubject(sel);
                                                }
                                            }}
                                            style={{
                                                flex: 1, minWidth: '240px', padding: '0.6rem 0.8rem', borderRadius: '6px',
                                                background: 'var(--bg-main)', border: '1px solid rgba(99, 102, 241, 0.45)',
                                                color: 'white', outline: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '500'
                                            }}
                                        >
                                            <option value="">-- Choose Course from Master Bank to Auto-Sync ({masterCourses.length} available) --</option>
                                            {masterCourses.map(c => (
                                                <option key={c.code} value={c.code}>
                                                    {c.code} - {c.title} (L-T-P: {c.l || 0}-{c.t || 0}-{c.p || 0}, C: {c.credits || 0}) • {c.sourceDeptName || 'Master Bank'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Subject Fields */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {/* Course Code */}
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Course Code {!isCreator && '🔒'}</label>
                                    <input
                                        type="text"
                                        list="master-course-codes-list"
                                        value={editingSubjectValue.code || ''}
                                        disabled={!isCreator}
                                        onChange={e => {
                                            const val = e.target.value.toUpperCase();
                                            updateEditingSubjectField('code', val);
                                            const found = masterCourses.find(c => c.code?.toUpperCase() === val);
                                            if (found) {
                                                applyMasterCourseToEditingSubject(found);
                                            }
                                        }}
                                        placeholder="e.g. HS3151"
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>

                                {/* Course Title */}
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Course Title {!isCreator && '🔒'}</label>
                                    <input
                                        type="text"
                                        value={editingSubjectValue.title || ''}
                                        disabled={!isCreator}
                                        onChange={e => updateEditingSubjectField('title', e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>

                                {/* L-T-P-Credits-ContactPeriods */}
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>L (Lecture periods) {!isCreator && '🔒'}</label>
                                    <input
                                        type="number"
                                        disabled={!isCreator}
                                        value={editingSubjectValue.l === undefined ? '' : editingSubjectValue.l}
                                        onChange={e => { const val = e.target.value; updateEditingSubjectField('l', val === '' ? '' : Math.max(0, Number(val))); }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>T (Tutorial periods) {!isCreator && '🔒'}</label>
                                    <input
                                        type="number"
                                        disabled={!isCreator}
                                        value={editingSubjectValue.t === undefined ? '' : editingSubjectValue.t}
                                        onChange={e => { const val = e.target.value; updateEditingSubjectField('t', val === '' ? '' : Math.max(0, Number(val))); }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>P (Practical periods) {!isCreator && '🔒'}</label>
                                    <input
                                        type="number"
                                        disabled={!isCreator}
                                        value={editingSubjectValue.p === undefined ? '' : editingSubjectValue.p}
                                        onChange={e => { const val = e.target.value; updateEditingSubjectField('p', val === '' ? '' : Math.max(0, Number(val))); }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Total Contact Periods</label>
                                    <input type="number" value={editingSubjectValue.contactPeriods === undefined ? '' : editingSubjectValue.contactPeriods} readOnly style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', color: '#aaa', cursor: 'not-allowed', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Credits {!isCreator && '🔒'}</label>
                                    <input
                                        type="number"
                                        step="any"
                                        disabled={!isCreator}
                                        value={editingSubjectValue.credits === undefined ? '' : editingSubjectValue.credits}
                                        onChange={e => { const val = e.target.value; updateEditingSubjectField('credits', val === '' ? '' : Number(val)); }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>

                                {/* Category and Category Type */}
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                                    <select
                                        value={editingSubjectValue.category || 'THEORY'}
                                        onChange={e => {
                                            const val = e.target.value;
                                            let autoCatType = editingSubjectValue.categoryType;
                                            if (val === 'NON-FUNCTIONAL ELECTIVE (NFE)' || val.includes('NON-FUNCTIONAL') || val.includes('NON FUNCTIONAL')) autoCatType = 'NFE';
                                            else if (val === 'EMPLOYABILITY ENHANCEMENT COURSE') autoCatType = 'EEC';
                                            else if (val === 'MANDATORY COURSES') autoCatType = 'MC';
                                            else if (val.includes('Language')) autoCatType = 'HUM';
                                            else if (val.includes('IPR') || val.includes('RESEARCH METHODOLOGY')) autoCatType = 'IPR';
                                            updateEditingSubjectField('category', val);
                                            if (autoCatType && autoCatType !== editingSubjectValue.categoryType) {
                                                updateEditingSubjectField('categoryType', autoCatType);
                                            }
                                        }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}
                                    >
                                        <option value="THEORY">THEORY</option>
                                        <option value="PRACTICAL">PRACTICAL</option>
                                        <option value="THEORY CUM PRACTICAL">THEORY CUM PRACTICAL</option>
                                        <option value="EMPLOYABILITY ENHANCEMENT COURSE">EMPLOYABILITY ENHANCEMENT COURSE</option>
                                        <option value="MANDATORY COURSES">MANDATORY COURSES</option>
                                        <option value="NON-FUNCTIONAL ELECTIVE (NFE)">NON-FUNCTIONAL ELECTIVE (NFE)</option>
                                        <option value="RESEARCH METHODOLOGY AND IPR">RESEARCH METHODOLOGY AND IPR</option>
                                        <option value="Language Elective – I">Language Elective – I</option>
                                        <option value="Language Elective - II">Language Elective - II</option>
                                        <option value="Electives for Honors Degree">Electives for Honors Degree</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category Type</label>
                                    <select value={editingSubjectValue.categoryType || 'HUM'} onChange={e => updateEditingSubjectField('categoryType', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', cursor: 'pointer' }}>
                                        <option value="HUM">HUM</option>
                                        <option value="BSC">BSC</option>
                                        <option value="ESC">ESC</option>
                                        <option value="PCC">PCC</option>
                                        <option value="PEC">PEC</option>
                                        <option value="NFE">NFE</option>
                                        <option value="OEC">OEC</option>
                                        <option value="EEC">EEC</option>
                                        <option value="MC">MC</option>
                                        <option value="IPR">IPR</option>
                                    </select>
                                </div>

                                {/* CIA, ESE, Total Marks */}
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>CIA Marks {!isCreator && '🔒'}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        disabled={!isCreator}
                                        value={editingSubjectValue.cia === undefined ? '' : editingSubjectValue.cia}
                                        onChange={e => { const val = e.target.value; updateEditingSubjectField('cia', val === '' ? '' : Math.min(100, Math.max(0, Number(val)))); }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>ESE Marks {!isCreator && '🔒'}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        disabled={!isCreator}
                                        value={editingSubjectValue.ese === undefined ? '' : editingSubjectValue.ese}
                                        onChange={e => { const val = e.target.value; updateEditingSubjectField('ese', val === '' ? '' : Math.min(100, Math.max(0, Number(val)))); }}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                    />
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
                );
            })()}

            {/* Manage Syllabus Modal */}
            {selectedSyllabusSubjectIndex !== null && syllabusEditValue !== null && (() => {
                const currentSubject = selectedSyllabusSubjectIndex >= 0
                    ? data.subjects[selectedSyllabusSubjectIndex]
                    : selectedSyllabusFallbackSubject;
                const isCreator = !currentSubject?.creatorDept || currentSubject?.creatorDept === selectedDept || isAdmin;
                const creatorName = currentSubject?.creatorDept ? getDeptDisplayName(currentSubject.creatorDept) : '';
                const catUp = (syllabusEditValue.category || '').toUpperCase();
                const typeUp = (syllabusEditValue.categoryType || '').toUpperCase();
                const showExercisesTab = catUp.includes('PRACTICAL') || catUp.includes('LAB') || catUp.includes('THEORY CUM PRACTICAL') || catUp.includes('INTEGRATED') || catUp.includes('EMPLOYABILITY') || catUp.includes('EEC') || typeUp === 'EEC' || (Number(syllabusEditValue.p || 0) > 0);

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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Manage Syllabus: {syllabusEditValue.code} - {syllabusEditValue.title}
                                        {!isCreator && <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.4)', fontWeight: 'normal', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><FaLock /> Read Only</span>}
                                    </h3>
                                </div>
                                <button onClick={() => { setSelectedSyllabusSubjectIndex(null); setSyllabusEditValue(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}><FaTimes /></button>
                            </div>

                            {/* Ownership Alert Banner if read-only */}
                            {!isCreator && (
                                <div style={{
                                    padding: '0.85rem 1.1rem',
                                    background: 'rgba(59, 130, 246, 0.08)',
                                    border: '1px solid rgba(59, 130, 246, 0.25)',
                                    borderRadius: '8px',
                                    color: '#93c5fd',
                                    fontSize: '0.88rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    lineHeight: 1.5
                                }}>
                                    <FaLock style={{ color: '#60a5fa', fontSize: '1.1rem', flexShrink: 0 }} />
                                    <div>
                                        <strong>Shared Course Syllabus (Read-Only):</strong> This course was created by <strong>{creatorName || 'another department'}</strong>. You can view all syllabus details and use this course in your curriculum, but master syllabus modifications are reserved for the creator department or an Administrator.
                                    </div>
                                </div>
                            )}

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
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Course Subtitle (e.g. Common to all branches) {!isCreator && '🔒'}</label>
                                                <input
                                                    type="text"
                                                    disabled={!isCreator}
                                                    value={syllabusEditValue.subtitle}
                                                    onChange={e => setSyllabusEditValue({ ...syllabusEditValue, subtitle: e.target.value })}
                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                    placeholder="e.g. Common to all B.E/B.Tech Programmes"
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category Full Name {!isCreator && '🔒'}</label>
                                                <select
                                                    disabled={!isCreator}
                                                    value={syllabusEditValue.categoryName || ''}
                                                    onChange={e => setSyllabusEditValue({ ...syllabusEditValue, categoryName: e.target.value })}
                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'pointer' }}
                                                >
                                                    <option value="">-- Select Category Full Name --</option>
                                                    {syllabusEditValue.categoryName && !STANDARD_CATEGORY_NAMES.includes(syllabusEditValue.categoryName) && (
                                                        <option value={syllabusEditValue.categoryName}>{syllabusEditValue.categoryName} (Current)</option>
                                                    )}
                                                    <optgroup label="Standard Singular">
                                                        <option value="Humanities, Social Sciences and Management Course (HUM)">Humanities, Social Sciences and Management Course (HUM)</option>
                                                        <option value="Basic Science Course (BSC)">Basic Science Course (BSC)</option>
                                                        <option value="Engineering Science Course (ESC)">Engineering Science Course (ESC)</option>
                                                        <option value="Professional Core Course (PCC)">Professional Core Course (PCC)</option>
                                                        <option value="Professional Elective Course (PEC)">Professional Elective Course (PEC)</option>
                                                        <option value="Open Elective Course (OEC)">Open Elective Course (OEC)</option>
                                                        <option value="Employability Enhancement Course (EEC)">Employability Enhancement Course (EEC)</option>
                                                        <option value="Mandatory Course (MC)">Mandatory Course (MC)</option>
                                                    </optgroup>
                                                    <optgroup label="Anna University Plural Format">
                                                        <option value="Humanities and Social Sciences including Management Courses (HUM)">Humanities and Social Sciences including Management Courses (HUM)</option>
                                                        <option value="Basic Science Courses (BSC)">Basic Science Courses (BSC)</option>
                                                        <option value="Engineering Science Courses (ESC)">Engineering Science Courses (ESC)</option>
                                                        <option value="Professional Core Courses (PCC)">Professional Core Courses (PCC)</option>
                                                        <option value="Professional Elective Courses (PEC)">Professional Elective Courses (PEC)</option>
                                                        <option value="Open Elective Courses (OEC)">Open Elective Courses (OEC)</option>
                                                        <option value="Employability Enhancement Courses (EEC)">Employability Enhancement Courses (EEC)</option>
                                                        <option value="Mandatory Courses (MC)">Mandatory Courses (MC)</option>
                                                        <option value="Audit Course (AC)">Audit Course (AC)</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Pre-requisites {!isCreator && '🔒'}</label>
                                            <textarea
                                                disabled={!isCreator}
                                                value={syllabusEditValue.prerequisites}
                                                onChange={e => setSyllabusEditValue({ ...syllabusEditValue, prerequisites: e.target.value })}
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', minHeight: '60px', resize: 'vertical', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                placeholder="e.g. Basic knowledge of English grammar..."
                                            />
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Course Objectives {!isCreator && '🔒'}</h4>
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                    <thead>
                                                        <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                            <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Objective Description</th>
                                                            {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {syllabusEditValue.objectives.map((obj, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                    <input
                                                                        type="text"
                                                                        disabled={!isCreator}
                                                                        value={obj}
                                                                        onChange={e => {
                                                                            const newObjs = [...syllabusEditValue.objectives];
                                                                            newObjs[idx] = e.target.value;
                                                                            setSyllabusEditValue({ ...syllabusEditValue, objectives: newObjs });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                    />
                                                                </td>
                                                                {isCreator && (
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
                                                                )}
                                                            </tr>
                                                        ))}
                                                        {syllabusEditValue.objectives.length === 0 && (
                                                            <tr>
                                                                <td colSpan={isCreator ? 3 : 2} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No objectives defined.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {isCreator && (
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
                                            )}
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Course Outcomes (COs){!isCreator && '🔒'}</h4>
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                    <thead>
                                                        <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold' }}>CO No</th>
                                                            <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Course Outcome Description</th>
                                                            <th style={{ padding: '0.6rem 0.75rem', width: '22%', color: 'var(--text-main)', fontWeight: 'bold' }}>RBT Level</th>
                                                            {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {syllabusEditValue.outcomes.map((co, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                    <input
                                                                        type="text"
                                                                        disabled={!isCreator}
                                                                        value={co.coNo}
                                                                        onChange={e => {
                                                                            const oldCoNo = co.coNo;
                                                                            const newOutcomes = [...syllabusEditValue.outcomes];
                                                                            newOutcomes[idx] = { ...newOutcomes[idx], coNo: e.target.value };
                                                                            const updatedMapping = sanitizeCoPoMapping(
                                                                                syllabusEditValue.coPoMapping,
                                                                                newOutcomes,
                                                                                (data.po && data.po.length > 0) ? data.po.length : 11,
                                                                                (data.pso && data.pso.length > 0) ? data.pso.length : 3
                                                                            );
                                                                            setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes, coPoMapping: updatedMapping });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', fontWeight: 'bold', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                    />
                                                                </td>
                                                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                    <textarea
                                                                        disabled={!isCreator}
                                                                        value={co.outcome}
                                                                        onChange={e => {
                                                                            const newOutcomes = [...syllabusEditValue.outcomes];
                                                                            newOutcomes[idx] = { ...newOutcomes[idx], outcome: e.target.value };
                                                                            setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', minHeight: '55px', resize: 'vertical', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                    />
                                                                </td>
                                                                <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                    <select
                                                                        disabled={!isCreator}
                                                                        value={co.rbtLevel}
                                                                        onChange={e => {
                                                                            const newOutcomes = [...syllabusEditValue.outcomes];
                                                                            newOutcomes[idx] = { ...newOutcomes[idx], rbtLevel: e.target.value };
                                                                            setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'pointer' }}
                                                                    >
                                                                        {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(lvl => (
                                                                            <option key={lvl} value={lvl}>{lvl}</option>
                                                                        ))}
                                                                    </select>
                                                                </td>
                                                                {isCreator && (
                                                                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center', verticalAlign: 'top' }}>
                                                                        <button
                                                                            onClick={() => {
                                                                                const newOutcomes = syllabusEditValue.outcomes.filter((_, i) => i !== idx);
                                                                                const updatedMapping = sanitizeCoPoMapping(
                                                                                    syllabusEditValue.coPoMapping,
                                                                                    newOutcomes,
                                                                                    (data.po && data.po.length > 0) ? data.po.length : 11,
                                                                                    (data.pso && data.pso.length > 0) ? data.pso.length : 3
                                                                                );
                                                                                setSyllabusEditValue({ ...syllabusEditValue, outcomes: newOutcomes, coPoMapping: updatedMapping });
                                                                            }}
                                                                            className="btn btn-danger"
                                                                            style={{ padding: '0.4rem 0.6rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                                                        >
                                                                            <FaTrash />
                                                                        </button>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        ))}
                                                        {syllabusEditValue.outcomes.length === 0 && (
                                                            <tr>
                                                                <td colSpan={isCreator ? 4 : 3} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No course outcomes defined.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {isCreator && (
                                                <div style={{ display: 'grid', gridTemplateColumns: '15% 55% 20% 10%', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                                    <input
                                                        type="text"
                                                        id="newCoNoInput"
                                                        placeholder="CO No"
                                                        defaultValue={`CO ${syllabusEditValue.outcomes.length + 1}`}
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
                                                                    coNo: coNoInput.value.trim() || `CO ${syllabusEditValue.outcomes.length + 1}`,
                                                                    outcome: outcomeInput.value.trim(),
                                                                    rbtLevel: rbtSelect.value
                                                                };
                                                                const updatedOutcomes = [...syllabusEditValue.outcomes, newCo];
                                                                const updatedMapping = sanitizeCoPoMapping(
                                                                    syllabusEditValue.coPoMapping,
                                                                    updatedOutcomes,
                                                                    (data.po && data.po.length > 0) ? data.po.length : 11,
                                                                    (data.pso && data.pso.length > 0) ? data.pso.length : 3
                                                                );

                                                                setSyllabusEditValue({
                                                                    ...syllabusEditValue,
                                                                    outcomes: updatedOutcomes,
                                                                    coPoMapping: updatedMapping
                                                                });
                                                                outcomeInput.value = '';
                                                                coNoInput.value = `CO ${updatedOutcomes.length + 1}`;
                                                            }
                                                        }}
                                                        className="btn btn-primary"
                                                        style={{ padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px' }}
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            )}
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
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.2rem', fontWeight: 'bold' }}>Unit-wise Syllabus {!isCreator && '🔒'}</h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold' }}>Unit No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '28%', color: 'var(--text-main)', fontWeight: 'bold' }}>Unit Title</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold' }}>Total Periods</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Topics (One topic per line)</th>
                                                        {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '8%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {syllabusEditValue.units.map((unit, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                <input
                                                                    type="text"
                                                                    disabled={!isCreator}
                                                                    value={unit.unitNo}
                                                                    onChange={e => {
                                                                        const newUnits = [...syllabusEditValue.units];
                                                                        newUnits[idx].unitNo = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', fontWeight: 'bold', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                <input
                                                                    type="text"
                                                                    disabled={!isCreator}
                                                                    value={unit.title}
                                                                    onChange={e => {
                                                                        const newUnits = [...syllabusEditValue.units];
                                                                        newUnits[idx].title = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                <input
                                                                    type="text"
                                                                    disabled={!isCreator}
                                                                    placeholder="e.g. 9"
                                                                    value={unit.periods !== undefined && unit.periods !== null ? unit.periods : ''}
                                                                    onChange={e => {
                                                                        const newUnits = [...syllabusEditValue.units];
                                                                        newUnits[idx].periods = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'top' }}>
                                                                <textarea
                                                                    disabled={!isCreator}
                                                                    value={unit.topics.join('\n')}
                                                                    onChange={e => {
                                                                        const newUnits = [...syllabusEditValue.units];
                                                                        newUnits[idx].topics = e.target.value.split('\n');
                                                                        setSyllabusEditValue({ ...syllabusEditValue, units: newUnits });
                                                                    }}
                                                                    placeholder="Enter topics, one per line..."
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', minHeight: '80px', resize: 'vertical', fontSize: '0.85rem', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            {isCreator && (
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
                                                            )}
                                                        </tr>
                                                    ))}
                                                    {syllabusEditValue.units.length === 0 && (
                                                        <tr>
                                                            <td colSpan={isCreator ? 5 : 4} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No units defined.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {syllabusEditValue.units.length > 0 && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    Total Units: <strong style={{ color: 'white' }}>{syllabusEditValue.units.length}</strong>
                                                </span>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                                    TOTAL PERIODS: {syllabusEditValue.units.reduce((acc, u) => acc + (Number(u.periods) || 9), 0)} PERIODS
                                                </span>
                                            </div>
                                        )}
                                        {isCreator && (
                                            <div style={{ display: 'grid', gridTemplateColumns: '12% 28% 12% 38% 10%', gap: '0.5rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
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
                                                <input
                                                    type="text"
                                                    id="newUnitPeriodsInput"
                                                    placeholder="Periods (e.g. 9)"
                                                    defaultValue="9"
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
                                                        const periodsInput = document.getElementById('newUnitPeriodsInput');
                                                        const topicsInput = document.getElementById('newUnitTopicsInput');
                                                        if (unitNoInput && titleInput && topicsInput && (titleInput.value.trim() || topicsInput.value.trim())) {
                                                            const newUnit = {
                                                                unitNo: unitNoInput.value.trim() || `UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI'][syllabusEditValue.units.length] || (syllabusEditValue.units.length + 1)}`,
                                                                title: titleInput.value.trim(),
                                                                periods: periodsInput ? periodsInput.value.trim() : '9',
                                                                topics: topicsInput.value.trim().split('\n').filter(t => t.trim() !== '')
                                                            };
                                                            setSyllabusEditValue({
                                                                ...syllabusEditValue,
                                                                units: [...syllabusEditValue.units, newUnit]
                                                            });
                                                            titleInput.value = '';
                                                            topicsInput.value = '';
                                                            if (periodsInput) periodsInput.value = '9';
                                                            unitNoInput.value = `UNIT ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][syllabusEditValue.units.length + 1] || (syllabusEditValue.units.length + 2)}`;
                                                        }
                                                    }}
                                                    className="btn btn-primary"
                                                    style={{ width: '100%', padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px' }}
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        )}
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
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.2rem', fontWeight: 'bold' }}>List of Exercises {!isCreator && '🔒'}</h4>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '10%', color: 'var(--text-main)', fontWeight: 'bold', textAlign: 'center' }}>S.No</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '58%', color: 'var(--text-main)', fontWeight: 'bold' }}>Exercise / Experiment Name</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold', textAlign: 'center' }}>CO</th>
                                                        <th style={{ padding: '0.6rem 0.75rem', width: '12%', color: 'var(--text-main)', fontWeight: 'bold', textAlign: 'center' }}>RBT Level</th>
                                                        {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '8%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(syllabusEditValue.experiments || []).map((exp, idx) => (
                                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                                <input
                                                                    type="text"
                                                                    disabled={!isCreator}
                                                                    value={exp.sNo || ''}
                                                                    onChange={e => {
                                                                        const newExps = [...(syllabusEditValue.experiments || [])];
                                                                        newExps[idx].sNo = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', textAlign: 'center', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle' }}>
                                                                <input
                                                                    type="text"
                                                                    disabled={!isCreator}
                                                                    value={exp.name || ''}
                                                                    onChange={e => {
                                                                        const newExps = [...(syllabusEditValue.experiments || [])];
                                                                        newExps[idx].name = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                                <input
                                                                    type="text"
                                                                    disabled={!isCreator}
                                                                    value={exp.co || ''}
                                                                    onChange={e => {
                                                                        const newExps = [...(syllabusEditValue.experiments || [])];
                                                                        newExps[idx].co = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', textAlign: 'center', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                />
                                                            </td>
                                                            <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', textAlign: 'center' }}>
                                                                <select
                                                                    disabled={!isCreator}
                                                                    value={exp.rbtLevel || 'Apply'}
                                                                    onChange={e => {
                                                                        const newExps = [...(syllabusEditValue.experiments || [])];
                                                                        newExps[idx].rbtLevel = e.target.value;
                                                                        setSyllabusEditValue({ ...syllabusEditValue, experiments: newExps });
                                                                    }}
                                                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'pointer' }}
                                                                >
                                                                    {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(lvl => (
                                                                        <option key={lvl} value={lvl}>{lvl}</option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            {isCreator && (
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
                                                            )}
                                                        </tr>
                                                    ))}
                                                    {(!syllabusEditValue.experiments || syllabusEditValue.experiments.length === 0) && (
                                                        <tr>
                                                            <td colSpan={isCreator ? 5 : 4} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No exercises defined.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {isCreator && (
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
                                        )}
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
                                            <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Textbooks {!isCreator && '🔒'}</h4>
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                    <thead>
                                                        <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                            <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Textbook details (title, authors, publisher, year)</th>
                                                            {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {syllabusEditValue.textbooks.map((tb, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                    <input
                                                                        type="text"
                                                                        disabled={!isCreator}
                                                                        value={tb}
                                                                        onChange={e => {
                                                                            const newTbs = [...syllabusEditValue.textbooks];
                                                                            newTbs[idx] = e.target.value;
                                                                            setSyllabusEditValue({ ...syllabusEditValue, textbooks: newTbs });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                    />
                                                                </td>
                                                                {isCreator && (
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
                                                                )}
                                                            </tr>
                                                        ))}
                                                        {syllabusEditValue.textbooks.length === 0 && (
                                                            <tr>
                                                                <td colSpan={isCreator ? 3 : 2} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No textbooks defined.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {isCreator && (
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
                                            )}
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Reference Books {!isCreator && '🔒'}</h4>
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                    <thead>
                                                        <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                            <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Reference book details (title, authors, publisher, year)</th>
                                                            {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {syllabusEditValue.references.map((ref, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                    <input
                                                                        type="text"
                                                                        disabled={!isCreator}
                                                                        value={ref}
                                                                        onChange={e => {
                                                                            const newRefs = [...syllabusEditValue.references];
                                                                            newRefs[idx] = e.target.value;
                                                                            setSyllabusEditValue({ ...syllabusEditValue, references: newRefs });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                    />
                                                                </td>
                                                                {isCreator && (
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
                                                                )}
                                                            </tr>
                                                        ))}
                                                        {syllabusEditValue.references.length === 0 && (
                                                            <tr>
                                                                <td colSpan={isCreator ? 3 : 2} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No references defined.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {isCreator && (
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
                                            )}
                                        </div>

                                        <div>
                                            <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.75rem', fontWeight: 'bold' }}>Additional / Web References {!isCreator && '🔒'}</h4>
                                            <div style={{ overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                                    <thead>
                                                        <tr style={{ background: 'rgba(255, 255, 255, 0.05)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '0.6rem 0.75rem', width: '8%', color: 'var(--text-main)', fontWeight: 'bold' }}>S.No</th>
                                                            <th style={{ padding: '0.6rem 0.75rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Web reference URL</th>
                                                            {isCreator && <th style={{ padding: '0.6rem 0.75rem', width: '12%', textAlign: 'center', color: 'var(--text-main)', fontWeight: 'bold' }}>Action</th>}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(syllabusEditValue.webReferences || []).map((web, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                <td style={{ padding: '0.5rem 0.75rem', verticalAlign: 'middle', color: 'var(--text-muted)' }}>{idx + 1}</td>
                                                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                                                    <input
                                                                        type="text"
                                                                        disabled={!isCreator}
                                                                        value={web}
                                                                        onChange={e => {
                                                                            const newWebs = [...(syllabusEditValue.webReferences || [])];
                                                                            newWebs[idx] = e.target.value;
                                                                            setSyllabusEditValue({ ...syllabusEditValue, webReferences: newWebs });
                                                                        }}
                                                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', cursor: !isCreator ? 'not-allowed' : 'text' }}
                                                                    />
                                                                </td>
                                                                {isCreator && (
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
                                                                )}
                                                            </tr>
                                                        ))}
                                                        {(!syllabusEditValue.webReferences || syllabusEditValue.webReferences.length === 0) && (
                                                            <tr>
                                                                <td colSpan={isCreator ? 3 : 2} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>No web references defined.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {isCreator && (
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
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeSyllabusTab === 'co-po-mapping' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <h4 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                            Mapping of Course Outcomes (COs)with Programme Outcomes (POs) & Programme Specific Outcomes (PSOs) {!isCreator && '🔒'}
                                        </h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            Select correlation levels: <strong>3</strong> (High), <strong>2</strong> (Medium), <strong>1</strong> (Low), or <strong>-</strong> (No Correlation).
                                        </p>
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                <thead>
                                                    <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--glass-border)' }}>
                                                        <th style={{ padding: '0.6rem 0.5rem', color: 'var(--text-main)', fontWeight: 'bold', minWidth: '80px' }}>COs</th>
                                                        {Array.from({ length: (data.po && data.po.length > 0) ? data.po.length : 11 }).map((_, i) => (
                                                            <th key={i} style={{ padding: '0.6rem 0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>PO{i + 1}</th>
                                                        ))}
                                                        {Array.from({ length: (data.pso && data.pso.length > 0) ? data.pso.length : 3 }).map((_, i) => (
                                                            <th key={i} style={{ padding: '0.6rem 0.5rem', color: 'var(--text-main)', fontWeight: 'bold' }}>PSO{i + 1}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(() => {
                                                        const mappingRows = sanitizeCoPoMapping(
                                                            syllabusEditValue.coPoMapping,
                                                            syllabusEditValue.outcomes,
                                                            (data.po && data.po.length > 0) ? data.po.length : 11,
                                                            (data.pso && data.pso.length > 0) ? data.pso.length : 3
                                                        );

                                                        return (
                                                            <>
                                                                {mappingRows.map((row, rIdx) => (
                                                                    <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                                                        <td style={{ padding: '0.5rem 0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{row.coNo}</td>
                                                                        {Array.from({ length: (data.po && data.po.length > 0) ? data.po.length : 11 }).map((_, i) => {
                                                                            const key = `po${i + 1}`;
                                                                            return (
                                                                                <td key={i} style={{ padding: '0.3rem 0.2rem' }}>
                                                                                    <select
                                                                                        disabled={!isCreator}
                                                                                        value={row[key] || '-'}
                                                                                        onChange={e => {
                                                                                            const newMapping = mappingRows.map((m, idx) => idx === rIdx ? { ...m, [key]: e.target.value } : { ...m });
                                                                                            setSyllabusEditValue({ ...syllabusEditValue, coPoMapping: newMapping });
                                                                                        }}
                                                                                        style={{ padding: '0.3rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', width: '50px', textAlign: 'center', cursor: !isCreator ? 'not-allowed' : 'pointer' }}
                                                                                    >
                                                                                        <option value="-">-</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                    </select>
                                                                                </td>
                                                                            );
                                                                        })}
                                                                        {Array.from({ length: (data.pso && data.pso.length > 0) ? data.pso.length : 3 }).map((_, i) => {
                                                                            const key = `pso${i + 1}`;
                                                                            return (
                                                                                <td key={i} style={{ padding: '0.3rem 0.2rem' }}>
                                                                                    <select
                                                                                        disabled={!isCreator}
                                                                                        value={row[key] || '-'}
                                                                                        onChange={e => {
                                                                                            const newMapping = mappingRows.map((m, idx) => idx === rIdx ? { ...m, [key]: e.target.value } : { ...m });
                                                                                            setSyllabusEditValue({ ...syllabusEditValue, coPoMapping: newMapping });
                                                                                        }}
                                                                                        style={{ padding: '0.3rem', borderRadius: '4px', background: !isCreator ? 'rgba(255,255,255,0.04)' : 'var(--bg-main)', border: '1px solid var(--glass-border)', color: !isCreator ? '#94a3b8' : 'white', outline: 'none', width: '50px', textAlign: 'center', cursor: !isCreator ? 'not-allowed' : 'pointer' }}
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
                                                                    {Array.from({ length: (data.po && data.po.length > 0) ? data.po.length : 11 }).map((_, i) => {
                                                                        const key = `po${i + 1}`;
                                                                        const values = mappingRows.map(row => row[key]).filter(v => v && v !== '-').map(Number);
                                                                        const avg = values.length > 0 ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1).replace('.0', '') : '-';
                                                                        return <td key={i} style={{ padding: '0.5rem 0.5rem', color: 'var(--primary)' }}>{avg}</td>;
                                                                    })}
                                                                    {Array.from({ length: (data.pso && data.pso.length > 0) ? data.pso.length : 3 }).map((_, i) => {
                                                                        const key = `pso${i + 1}`;
                                                                        const values = mappingRows.map(row => row[key]).filter(v => v && v !== '-').map(Number);
                                                                        const avg = values.length > 0 ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1).replace('.0', '') : '-';
                                                                        return <td key={i} style={{ padding: '0.5rem 0.5rem', color: 'var(--primary)' }}>{avg}</td>;
                                                                    })}
                                                                </tr>
                                                            </>
                                                        );
                                                    })()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                                {isCreator ? (
                                    <>
                                        <button onClick={() => { setSelectedSyllabusSubjectIndex(null); setSyllabusEditValue(null); }} className="btn" style={{ padding: '0.6rem 1.2rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>Cancel</button>
                                        <button onClick={handleSaveSyllabus} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>Save Syllabus</button>
                                    </>
                                ) : (
                                    <button onClick={() => { setSelectedSyllabusSubjectIndex(null); setSyllabusEditValue(null); }} className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>Close (View Only)</button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Custom Centered Alert / Confirm Dialog */}
            {dialogState.isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    <div style={{
                        background: '#0f172a',
                        border: dialogState.type === 'danger'
                            ? '1px solid rgba(239, 68, 68, 0.45)'
                            : dialogState.type === 'warning'
                                ? '1px solid rgba(245, 158, 11, 0.45)'
                                : dialogState.type === 'success'
                                    ? '1px solid rgba(16, 185, 129, 0.45)'
                                    : '1px solid rgba(99, 102, 241, 0.5)',
                        borderRadius: '16px',
                        padding: '1.8rem',
                        width: '100%',
                        maxWidth: '460px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
                        color: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            background: dialogState.type === 'danger'
                                ? 'rgba(239, 68, 68, 0.15)'
                                : dialogState.type === 'warning'
                                    ? 'rgba(245, 158, 11, 0.15)'
                                    : dialogState.type === 'success'
                                        ? 'rgba(16, 185, 129, 0.15)'
                                        : 'rgba(99, 102, 241, 0.15)',
                            color: dialogState.type === 'danger'
                                ? '#ef4444'
                                : dialogState.type === 'warning'
                                    ? '#f59e0b'
                                    : dialogState.type === 'success'
                                        ? '#10b981'
                                        : '#818cf8',
                            border: `1px solid ${dialogState.type === 'danger' ? 'rgba(239, 68, 68, 0.35)'
                                : dialogState.type === 'warning' ? 'rgba(245, 158, 11, 0.35)'
                                    : dialogState.type === 'success' ? 'rgba(16, 185, 129, 0.35)'
                                        : 'rgba(99, 102, 241, 0.35)'
                                }`
                        }}>
                            {dialogState.type === 'danger' ? <FaExclamationTriangle />
                                : dialogState.type === 'warning' ? <FaExclamationTriangle />
                                    : dialogState.type === 'success' ? <FaCheckCircle />
                                        : <FaInfoCircle />}
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', margin: '0 0 0.5rem 0' }}>
                                {dialogState.title}
                            </h3>
                            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-line' }}>
                                {dialogState.message}
                            </p>
                            {dialogState.note && (
                                <div style={{
                                    marginTop: '0.85rem',
                                    padding: '0.65rem 0.85rem',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    border: '1px solid rgba(59, 130, 246, 0.25)',
                                    borderRadius: '8px',
                                    fontSize: '0.83rem',
                                    color: '#93c5fd',
                                    lineHeight: 1.4,
                                    textAlign: 'left'
                                }}>
                                    <strong>Note:</strong> {dialogState.note}
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                            {dialogState.cancelText && (
                                <button
                                    onClick={dialogState.onCancel}
                                    className="btn"
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 1.2rem',
                                        background: 'rgba(255, 255, 255, 0.07)',
                                        border: '1px solid var(--glass-border)',
                                        color: '#e2e8f0',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {dialogState.cancelText}
                                </button>
                            )}
                            <button
                                onClick={dialogState.onConfirm}
                                className="btn"
                                style={{
                                    flex: 1,
                                    padding: '0.65rem 1.2rem',
                                    background: dialogState.type === 'danger'
                                        ? '#dc2626'
                                        : dialogState.type === 'warning'
                                            ? '#d97706'
                                            : dialogState.type === 'success'
                                                ? '#059669'
                                                : 'var(--primary, #6366f1)',
                                    border: 'none',
                                    color: '#fff',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                }}
                            >
                                {dialogState.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentManager;
