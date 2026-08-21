import mammoth from 'mammoth';

/**
 * High-Precision Word Document Syllabus Parser for Autonomous / Anna University Syllabi
 * Extracts exact curriculum tables, detailed course syllabi, units, COs, textbooks, and references
 */

function cleanText(text) {
    if (!text) return '';
    return text.replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
}

function romanToNumber(roman) {
    if (!roman) return 1;
    const r = roman.toUpperCase().trim();
    const map = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8 };
    if (map[r]) return map[r];
    const num = parseInt(r.replace(/\D/g, ''), 10);
    return isNaN(num) ? 1 : num;
}

const VALID_CATEGORIES = [
    'HUM', 'BSC', 'ESC', 'ESE', 'PCC', 'PEC', 'OEC', 'EEC', 'MC',
    'HSMC', 'HS', 'BS', 'ES', 'PC', 'PE', 'OE', 'EE',
    'HUMANITIES', 'BASIC SCIENCE', 'BASIC SCIENCES', 'ENGINEERING SCIENCE', 'ENGINEERING SCIENCES',
    'PROFESSIONAL CORE', 'PROFESSIONAL ELECTIVE', 'OPEN ELECTIVE', 'OPEN ELECTIVES',
    'EMPLOYABILITY ENHANCEMENT', 'MANDATORY', 'MANDATORY COURSE', 'MANDATORY COURSES'
];

function normalizeCategoryType(type) {
    if (!type) return 'PCC';
    const t = type.toUpperCase().trim();
    if (t === 'HUM' || t === 'HSMC' || t === 'HS' || t.startsWith('HUMANITIES')) return 'HUM';
    if (t === 'BSC' || t === 'BS' || t.startsWith('BASIC SCIENCE')) return 'BSC';
    if (t === 'ESC' || t === 'ES' || t === 'ESE' || t.startsWith('ENGINEERING SCIENCE')) return 'ESC';
    if (t === 'PCC' || t === 'PC' || t.startsWith('PROFESSIONAL CORE')) return 'PCC';
    if (t === 'PEC' || t === 'PE' || t.startsWith('PROFESSIONAL ELECTIVE')) return 'PEC';
    if (t === 'OEC' || t === 'OE' || t.startsWith('OPEN ELECTIVE')) return 'OEC';
    if (t === 'EEC' || t === 'EE' || t.startsWith('EMPLOYABILITY')) return 'EEC';
    if (t === 'MC' || t.startsWith('MANDATORY')) return 'MC';
    return 'PCC';
}

function isCategoryString(str) {
    if (!str) return false;
    const s = str.toUpperCase().trim();
    return VALID_CATEGORIES.includes(s);
}

const COURSE_CODE_REGEX = /^[A-Z0-9]{2,4}[A-Z]{2,4}[0-9X]{2,4}$/i;
const LOOSE_CODE_REGEX = /^[A-Z0-9]{4,10}$/i;
const NON_COURSE_WORDS = [
    'THEORY', 'PRACTICAL', 'PERIODS', 'CREDIT', 'CREDITS', 'TOTAL', 'MARKS', 'WEEKS', 'CATEGORY', 'SEMESTER', 'COURSE', 'HOURS', 'VERTICAL', 'OPEN',
    'HSMC', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC', 'HUM', 'ESE', 'CIA', 'S.NO', 'SL.NO', 'NO'
];

function isCourseCode(str) {
    if (!str) return false;
    const s = str.trim().toUpperCase();
    if (NON_COURSE_WORDS.includes(s) || isCategoryString(s)) return false;
    if (s.length < 4 || s.length > 12) return false;
    if (!/\d/.test(s) && !s.includes('XX')) return false;
    return COURSE_CODE_REGEX.test(s) || LOOSE_CODE_REGEX.test(s);
}

function isNumeric(str) {
    if (typeof str === 'number') return true;
    if (!str) return false;
    return !isNaN(parseFloat(str)) && isFinite(str);
}

/**
 * Automatically infer semester from course code if not detected from table headings
 * E.g.: U26TM101 -> 1, U26MA201 -> 2, U26CS301 -> 3, CS3351 -> 3, CS3451 -> 4, U26BM604 -> 6, U26EM701 -> 7
 */
function inferSemesterFromCourseCode(code) {
    if (!code) return null;
    const clean = code.trim().toUpperCase();

    // 1. Autonomous pattern: U26BM604, U26TM101, U26AD102, U23CS201, 23CS301, U26ME401, U26EM701
    const autoMatch = clean.match(/^[A-Z0-9]{2,5}([1-8])\d{2}[A-Z0-9]?$/i);
    if (autoMatch) {
        const sem = parseInt(autoMatch[1], 10);
        if (sem >= 1 && sem <= 8) return sem;
    }

    // 2. Anna University 2021 Regulation (e.g. CS3351, MA3151, GE3251, IT3401, CS3591, CS3691, CS3701, CS3801)
    const auMatch = clean.match(/^[A-Z]{2,4}3([1-8])\d{2}$/i);
    if (auMatch) {
        const sem = parseInt(auMatch[1], 10);
        if (sem >= 1 && sem <= 8) return sem;
    }

    // 3. Anna University 2017 Regulation (e.g. CS8351, CS8491, CS8591, CS8691, CS8791, CS8811, GE8151, MA8251)
    const au2017Match = clean.match(/^[A-Z]{2,4}8([1-8])\d{2}$/i);
    if (au2017Match) {
        const sem = parseInt(au2017Match[1], 10);
        if (sem >= 1 && sem <= 8) return sem;
    }

    // 4. Simple CS101, CS201, CS301 ...
    const simpleMatch = clean.match(/^[A-Z]{2,4}([1-8])\d{2}$/i);
    if (simpleMatch) {
        const sem = parseInt(simpleMatch[1], 10);
        if (sem >= 1 && sem <= 8) return sem;
    }

    return null;
}

function determineSubjectCategoryAndType({
    title = '',
    code = '',
    l = 3,
    t = 0,
    p = 0,
    credits = 3,
    rawCategory = '',
    rawCategoryType = '',
    contextCategory = '',
    contextCategoryType = ''
}) {
    const tUpper = String(title || '').toUpperCase().trim();
    const cUpper = String(code || '').toUpperCase().trim();
    const rawCatUpper = String(rawCategory || '').toUpperCase().trim();
    const rawTypeUpper = String(rawCategoryType || '').toUpperCase().trim();
    const ctxCatUpper = String(contextCategory || '').toUpperCase().trim();

    let categoryType = '';

    // 1. Check Explicit Category Type (HUM/BSC/ESC/PCC/PEC/OEC/EEC/MC/HSMC)
    if (rawTypeUpper) {
        categoryType = normalizeCategoryType(rawTypeUpper);
    } else if (rawCatUpper && isCategoryString(rawCatUpper)) {
        categoryType = normalizeCategoryType(rawCatUpper);
    } else if (contextCategoryType) {
        categoryType = normalizeCategoryType(contextCategoryType);
    }

    // 2. Detect Category Type from Title / Code if not yet determined or default
    if (!categoryType || categoryType === 'PCC') {
        if (tUpper.includes('HERITAGE OF TAMIL') || tUpper.includes('TAMILS AND TECHNOLOGY') || tUpper.includes('CONSTITUTION') || tUpper.includes('ENVIRONMENTAL SCIENCE') || tUpper.includes('INDUCTION') || tUpper.includes('HUMAN VALUES') || tUpper.includes('ETHICS')) {
            categoryType = 'MC';
        } else if (tUpper.includes('INTERNSHIP') || tUpper.includes('PROJECT WORK') || tUpper.includes('MINI PROJECT') || tUpper.includes('TECHNICAL SEMINAR') || tUpper.includes('PROFESSIONAL DEVELOPMENT') || tUpper.includes('EMPLOYABILITY') || tUpper.includes('SKILL')) {
            categoryType = 'EEC';
        } else if (tUpper.includes('MATHEMATICS') || tUpper.includes('PHYSICS') || tUpper.includes('CHEMISTRY') || cUpper.startsWith('MA') || cUpper.startsWith('PH') || cUpper.startsWith('CY')) {
            categoryType = 'BSC';
        } else if (tUpper.includes('ENGLISH') || tUpper.includes('COMMUNICATION') || tUpper.includes('HUMANITIES') || cUpper.startsWith('HS') || cUpper.startsWith('EN')) {
            categoryType = 'HUM';
        } else if (tUpper.includes('ENGINEERING GRAPHICS') || tUpper.includes('PROBLEM SOLVING AND PYTHON') || tUpper.includes('BASIC ELECTRICAL') || tUpper.includes('WORKSHOP')) {
            categoryType = 'ESC';
        }
    }

    // 3. Determine Course Category
    let category = '';
    // A. Language Electives
    if (tUpper.includes('LANGUAGE ELECTIVE') && (tUpper.includes('II') || tUpper.includes('2') || rawCatUpper.includes('II') || rawCatUpper.includes('2'))) {
        category = 'Language Elective - II';
        categoryType = 'HUM';
    } else if (tUpper.includes('LANGUAGE ELECTIVE') || rawCatUpper.includes('LANGUAGE ELECTIVE')) {
        category = 'Language Elective – I';
        categoryType = 'HUM';
    }
    // B. Mandatory Courses
    else if (categoryType === 'MC' || credits === 0 || rawCatUpper.includes('MANDATORY') || ctxCatUpper.includes('MANDATORY') || tUpper.includes('HERITAGE OF TAMIL') || tUpper.includes('TAMILS AND TECHNOLOGY') || tUpper.includes('CONSTITUTION') || tUpper.includes('ENVIRONMENTAL SCIENCE')) {
        category = 'MANDATORY COURSES';
        categoryType = 'MC';
    }
    // C. Employability Enhancement Courses
    else if (categoryType === 'EEC' || rawCatUpper.includes('EMPLOYABILITY') || ctxCatUpper.includes('EMPLOYABILITY') || tUpper.includes('PROJECT WORK') || tUpper.includes('MINI PROJECT') || tUpper.includes('INTERNSHIP') || tUpper.includes('TECHNICAL SEMINAR') || tUpper.includes('PROFESSIONAL DEVELOPMENT')) {
        category = 'EMPLOYABILITY ENHANCEMENT COURSE';
        categoryType = 'EEC';
    }
    // D. Theory cum Practical (Integrated/Embedded)
    else if (rawCatUpper.includes('THEORY CUM') || rawCatUpper.includes('INTEGRATED') || ctxCatUpper.includes('THEORY CUM') || (Number(p) > 0 && Number(l) > 0)) {
        category = 'THEORY CUM PRACTICAL';
        if (!categoryType) categoryType = 'PCC';
    }
    // E. Practical / Laboratory
    else if ((Number(p) > 0 && Number(l) === 0) || tUpper.includes('LABORATORY') || tUpper.includes(' LAB') || tUpper.endsWith('LAB') || tUpper.includes('PRACTICAL') || rawCatUpper.includes('PRACTICAL') || ctxCatUpper.includes('PRACTICAL')) {
        category = 'PRACTICAL';
        if (!categoryType) categoryType = 'PCC';
    }
    // F. Theory
    else {
        category = 'THEORY';
        if (!categoryType) categoryType = 'PCC';
    }

    return { category, categoryType };
}

function extractNumericSequence(cells) {
    const nums = [];
    if (!cells || !Array.isArray(cells)) return nums;
    cells.forEach(cell => {
        if (cell === null || cell === undefined) return;
        const str = String(cell).trim();
        if (str === '' || str === '-' || str === '–' || str === '—' || str.toUpperCase() === 'NIL' || str.toUpperCase() === 'NA' || str.toUpperCase() === 'N/A') {
            nums.push(0);
            return;
        }
        const tokens = str.match(/\d+(?:\.\d+)?/g);
        if (tokens) {
            tokens.forEach(tok => {
                const n = parseFloat(tok);
                if (!isNaN(n)) nums.push(n);
            });
        }
    });
    return nums;
}

function resolvePeriodsAndMarks(nums, { isLabOrPractical = false, isMC = false, isEEC = false } = {}) {
    let l = 3, t = 0, p = 0, contactPeriods = 3, credits = 3, cia = 40, ese = 60, total = 100;

    if (nums.length >= 8) {
        l = nums[0];
        t = nums[1];
        p = nums[2];
        contactPeriods = nums[3];
        credits = nums[4];
        cia = nums[5];
        ese = nums[6];
        total = (nums.length >= 8 && nums[7] > 0) ? nums[7] : (cia + ese);
    } else if (nums.length === 7) {
        if (nums[3] === nums[0] + nums[1] + nums[2] || nums[3] >= nums[4]) {
            l = nums[0]; t = nums[1]; p = nums[2]; contactPeriods = nums[3]; credits = nums[4]; cia = nums[5]; ese = nums[6];
            total = cia + ese;
        } else {
            l = nums[0]; t = nums[1]; p = nums[2]; credits = nums[3]; cia = nums[4]; ese = nums[5]; total = nums[6];
            contactPeriods = l + t + p;
        }
    } else if (nums.length === 6) {
        if (nums[4] + nums[5] === 100 || (nums[4] <= 60 && nums[5] <= 60 && nums[4] + nums[5] > 0)) {
            l = nums[0]; t = nums[1]; p = nums[2]; credits = nums[3]; cia = nums[4]; ese = nums[5]; total = cia + ese;
            contactPeriods = l + t + p;
        } else {
            l = nums[0]; t = nums[1]; p = nums[2]; contactPeriods = nums[3]; credits = nums[4]; total = nums[5];
            cia = (p > 0 && l === 0) ? 60 : (isEEC ? 50 : 40);
            ese = (p > 0 && l === 0) ? 40 : (isEEC ? 50 : 60);
        }
    } else if (nums.length === 5) {
        if (nums[3] === nums[0] + nums[1] + nums[2]) {
            l = nums[0]; t = nums[1]; p = nums[2]; contactPeriods = nums[3]; credits = nums[4];
        } else if (nums[4] === 100 || nums[4] === 50 || nums[4] === 200) {
            l = nums[0]; t = nums[1]; p = nums[2]; credits = nums[3]; contactPeriods = l + t + p; total = nums[4];
        } else {
            l = nums[0]; t = nums[1]; p = nums[2]; contactPeriods = nums[3]; credits = nums[4];
        }
        cia = (p > 0 && l === 0) ? 60 : (isEEC ? 50 : 40);
        ese = (p > 0 && l === 0) ? 40 : (isEEC ? 50 : 60);
        total = total || (cia + ese);
    } else if (nums.length === 4) {
        l = nums[0]; t = nums[1]; p = nums[2]; credits = nums[3]; contactPeriods = l + t + p;
        cia = (p > 0 && l === 0) ? 60 : (isEEC ? 50 : 40);
        ese = (p > 0 && l === 0) ? 40 : (isEEC ? 50 : 60);
        total = 100;
    } else if (nums.length === 3) {
        l = nums[0]; t = nums[1]; p = nums[2]; contactPeriods = l + t + p;
        credits = (p > 0 && l === 0) ? Math.max(1, Math.round(p / 2)) : (l + t);
        cia = (p > 0 && l === 0) ? 60 : (isEEC ? 50 : 40);
        ese = (p > 0 && l === 0) ? 40 : (isEEC ? 50 : 60);
        total = 100;
    } else if (nums.length === 2) {
        if (isLabOrPractical) {
            l = 0; t = 0; p = nums[0]; contactPeriods = nums[0]; credits = nums[1];
        } else {
            l = nums[0]; t = 0; p = 0; contactPeriods = nums[0]; credits = nums[1];
        }
        cia = isLabOrPractical ? 60 : 40;
        ese = isLabOrPractical ? 40 : 60;
        total = 100;
    } else if (nums.length === 1) {
        credits = nums[0];
        if (isLabOrPractical) {
            l = 0; t = 0; p = Math.max(2, credits * 2); contactPeriods = p;
        } else {
            l = credits || 3; t = 0; p = 0; contactPeriods = l;
        }
        cia = isLabOrPractical ? 60 : 40;
        ese = isLabOrPractical ? 40 : 60;
        total = 100;
    } else {
        if (isLabOrPractical) {
            l = 0; t = 0; p = 4; contactPeriods = 4; credits = 2; cia = 60; ese = 40; total = 100;
        } else if (isMC) {
            l = 2; t = 0; p = 0; contactPeriods = 2; credits = 0; cia = 100; ese = 0; total = 100;
        } else {
            l = 3; t = 0; p = 0; contactPeriods = 3; credits = 3; cia = 40; ese = 60; total = 100;
        }
    }

    if (isMC) {
        credits = 0;
        cia = 100;
        ese = 0;
        total = 100;
    }

    return { l, t, p, contactPeriods, credits, cia, ese, total };
}

function parseSubjectRow(row, context) {
    const rowClean = row.map(c => cleanText(c)).filter(c => c !== '');
    if (rowClean.length < 2) return null;

    const rowStr = rowClean.join(' ').toUpperCase();

    if (rowStr.startsWith('TOTAL') || rowStr.includes('TOTAL CREDITS') || rowStr.includes('PERIODS PER WEEK')) {
        return null;
    }
    if (rowClean.every(c => ['S.NO', 'S.NO.', 'SL.NO', 'SL.NO.', 'NO', 'COURSE CODE', 'COURSE TITLE', 'CATEGORY', 'L', 'T', 'P', 'CIA', 'ESE', 'TOTAL', 'CREDITS', 'PERIODS'].includes(c.toUpperCase()))) {
        return null;
    }

    // 1. Locate Course Code
    let codeIndex = -1;
    for (let i = 0; i < Math.min(4, rowClean.length); i++) {
        if (isCourseCode(rowClean[i])) {
            codeIndex = i;
            break;
        }
    }

    if (codeIndex === -1) return null;

    const code = rowClean[codeIndex].toUpperCase().trim();
    
    // 2. Extract Title
    let title = '';
    let nextIdx = codeIndex + 1;
    if (nextIdx < rowClean.length && !isNumeric(rowClean[nextIdx]) && !isCategoryString(rowClean[nextIdx])) {
        title = rowClean[nextIdx].trim();
        nextIdx++;
    } else if (codeIndex > 0 && !isNumeric(rowClean[codeIndex - 1]) && !isCategoryString(rowClean[codeIndex - 1]) && rowClean[codeIndex - 1].length > 4) {
        title = rowClean[codeIndex - 1].trim();
    }

    if (!title) {
        title = code;
    }

    // 3. Extract Category
    let rawCategoryTypeVal = '';
    if (nextIdx < rowClean.length && isCategoryString(rowClean[nextIdx])) {
        rawCategoryTypeVal = rowClean[nextIdx];
        nextIdx++;
    }

    // 4. Extract Numbers & Duration using sequence parser
    const remainingCells = rowClean.slice(nextIdx);
    const nums = extractNumericSequence(remainingCells);
    const isLab = title.toUpperCase().includes('LAB') || title.toUpperCase().includes('PRACTICAL');
    const isMC = rawCategoryTypeVal.toUpperCase() === 'MC' || (context.currentCategory && context.currentCategory.includes('MANDATORY'));
    const isEEC = rawCategoryTypeVal.toUpperCase() === 'EEC' || (context.currentCategory && context.currentCategory.includes('EMPLOYABILITY'));
    const resolved = resolvePeriodsAndMarks(nums, { isLabOrPractical: isLab, isMC, isEEC });

    let l = resolved.l;
    let t = resolved.t;
    let p = resolved.p;
    let contactPeriods = resolved.contactPeriods;
    let credits = resolved.credits;
    let cia = resolved.cia;
    let ese = resolved.ese;
    let total = resolved.total;

    const catResult = determineSubjectCategoryAndType({
        title,
        code,
        l,
        t,
        p,
        credits,
        rawCategoryType: rawCategoryTypeVal,
        contextCategory: context.currentCategory,
        contextCategoryType: context.defaultCategoryType
    });

    let category = catResult.category;
    let categoryType = catResult.categoryType;

    if (category === 'PRACTICAL' && (cia === 40 || !cia)) {
        cia = 60; ese = 40; total = 100;
    } else if (category === 'MANDATORY COURSES') {
        cia = 100; ese = 0; total = 100;
    } else if (category === 'EMPLOYABILITY ENHANCEMENT COURSE' && (cia === 40 || !cia)) {
        cia = 50; ese = 50; total = 100;
    }

    // Determine if this course is truly an Open Elective from the Open Elective Table
    const isExplicitOEC = context.isCurrentOpenElective && !context.currentVertical;
    let semester = context.currentSemester || 1;

    if (!context.currentVertical && !isExplicitOEC) {
        const inferredSem = inferSemesterFromCourseCode(code);
        if (inferredSem && (context.isDefaultSemester || inferredSem !== semester)) {
            semester = inferredSem;
        }
    }

    if (context.currentVertical) {
        categoryType = 'PEC';
        category = 'PROFESSIONAL ELECTIVE';
    } else if (isExplicitOEC) {
        categoryType = 'OEC';
        category = 'OPEN ELECTIVE';
    }

    return {
        code,
        title,
        category,
        categoryType,
        l,
        t,
        p,
        contactPeriods,
        credits,
        cia,
        ese,
        total,
        semester: (context.currentVertical || isExplicitOEC) ? null : semester,
        vertical: context.currentVertical,
        verticalName: context.currentVertical ? context.currentVerticalName : '',
        isOpenElective: isExplicitOEC,
        offeringDept: isExplicitOEC ? (context.currentOfferingDept || '') : '',
        objectives: [],
        outcomes: [],
        units: [],
        textbooks: [],
        references: [],
        webReferences: [],
        coPoMapping: []
    };
}

function parseSequentialElementsDOM(html) {
    const elements = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nodes = doc.body.childNodes;

    nodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName.toLowerCase();

        if (tag === 'table') {
            const rows = [];
            const trElements = node.querySelectorAll('tr');
            trElements.forEach(trEl => {
                const cells = [];
                const cellElements = trEl.querySelectorAll('th, td');
                cellElements.forEach(cellEl => {
                    cells.push(cleanText(cellEl.textContent));
                });
                if (cells.length > 0 && cells.some(c => c.length > 0)) {
                    rows.push(cells);
                }
            });
            if (rows.length > 0) {
                elements.push({ type: 'table', rows });
            }
        } else {
            const text = cleanText(node.textContent);
            if (text) {
                elements.push({ type: 'heading', text });
            }
        }
    });

    return elements;
}

function parseCurriculumSequential(elements) {
    const subjects = [];
    const context = {
        currentSemester: 1,
        isDefaultSemester: true,
        currentVertical: null,
        currentVerticalName: '',
        isCurrentOpenElective: false,
        currentOfferingDept: '',
        currentCategory: 'THEORY',
        defaultCategoryType: 'PCC'
    };

    elements.forEach(elem => {
        if (elem.type === 'heading') {
            const headingStr = elem.text.toUpperCase();

            // 1. Detect Semester Headings (e.g. SEMESTER I, SEMESTER VI)
            if (headingStr.includes('SEMESTER') && !headingStr.includes('END SEMESTER')) {
                const semMatch = headingStr.match(/SEMESTER\s*[-–—:]?\s*([IVXLCDM\d]+)/i);
                if (semMatch) {
                    context.currentSemester = romanToNumber(semMatch[1]);
                    context.isDefaultSemester = false;
                    context.currentVertical = null;
                    context.isCurrentOpenElective = false;
                    context.currentCategory = 'THEORY';
                    context.defaultCategoryType = 'PCC';
                }
            }

            // 2. Detect Vertical Section Headings
            if (headingStr.includes('VERTICAL')) {
                const vertMatch = headingStr.match(/VERTICAL\s*[-–—:]?\s*([IVXLCDM\d]+)(?:\s*[:\-]\s*(.*))?/i);
                if (vertMatch) {
                    context.currentVertical = romanToNumber(vertMatch[1]);
                    context.currentVerticalName = vertMatch[2] ? cleanText(vertMatch[2]) : `Vertical ${context.currentVertical}`;
                    context.isCurrentOpenElective = false;
                    context.currentCategory = 'PROFESSIONAL ELECTIVE';
                    context.defaultCategoryType = 'PEC';
                }
            }

            // 3. Detect Standalone Open Elective Section Headings
            if ((headingStr.includes('OPEN ELECTIVE COURSES') || headingStr.includes('OPEN ELECTIVES') || headingStr.includes('OEC COURSES')) && !headingStr.includes('OPEN ELECTIVE -') && !headingStr.includes('OPEN ELECTIVE –') && !headingStr.includes('OPEN ELECTIVE I')) {
                context.isCurrentOpenElective = true;
                context.currentVertical = null;
                context.currentCategory = 'OPEN ELECTIVE';
                context.defaultCategoryType = 'OEC';
            }

            // 4. Detect Category Headings (e.g. "THEORY COURSES", "A. THEORY COURSES", "PRACTICAL COURSES", "B. PRACTICAL COURSES")
            if (headingStr.includes('THEORY CUM PRACTICAL') || headingStr.includes('THEORY & PRACTICAL') || headingStr.includes('INTEGRATED')) {
                context.currentCategory = 'THEORY CUM PRACTICAL';
                context.defaultCategoryType = 'PCC';
            } else if (headingStr.includes('THEORY COURSE') || headingStr.includes('THEORY COURSES') || headingStr === 'THEORY' || headingStr.startsWith('A. THEORY')) {
                context.currentCategory = 'THEORY';
                context.defaultCategoryType = 'PCC';
            } else if (headingStr.includes('PRACTICAL COURSE') || headingStr.includes('PRACTICAL COURSES') || headingStr.includes('LABORATORY COURSES') || headingStr === 'PRACTICAL' || headingStr.startsWith('B. PRACTICAL') || headingStr.startsWith('B. LABORATORY')) {
                context.currentCategory = 'PRACTICAL';
                context.defaultCategoryType = 'ESC';
            } else if (headingStr.includes('EMPLOYABILITY ENHANCEMENT') || headingStr.includes('EEC')) {
                context.currentCategory = 'EMPLOYABILITY ENHANCEMENT COURSE';
                context.defaultCategoryType = 'EEC';
            } else if (headingStr.includes('MANDATORY COURSE') || headingStr.includes('MANDATORY COURSES') || headingStr === 'MANDATORY') {
                context.currentCategory = 'MANDATORY COURSES';
                context.defaultCategoryType = 'MC';
            }
            return;
        }

        if (elem.type === 'table') {
            const allTableText = elem.rows.map(r => r.join(' ')).join(' ').toUpperCase();
            if ((allTableText.includes('SUBJECT AREA') || allTableText.includes('CREDIT DISTRIBUTION') || allTableText.includes('DISTRIBUTION OF CREDITS') || allTableText.includes('SUMMARY OF CURRICULUM')) && (allTableText.includes('CREDITS PER SEMESTER') || allTableText.includes('CREDITS TOTAL') || allTableText.includes('PERCENTAGE') || allTableText.includes('TOTAL %') || allTableText.includes('CREDITS TOTAL %'))) {
                return;
            }

            elem.rows.forEach(row => {
                const rowStr = row.join(' ').toUpperCase().trim();
                const rowClean = row.map(c => cleanText(c)).filter(c => c !== '');

                // Check if this row is a Semester switch header
                if (rowStr.includes('SEMESTER') && !rowStr.includes('END SEMESTER')) {
                    const semMatch = rowStr.match(/SEMESTER\s*[-–—:]?\s*([IVXLCDM\d]+)/i);
                    if (semMatch) {
                        context.currentSemester = romanToNumber(semMatch[1]);
                        context.isDefaultSemester = false;
                        context.currentVertical = null;
                        context.isCurrentOpenElective = false;
                        context.currentCategory = 'THEORY';
                        context.defaultCategoryType = 'PCC';
                    }
                }

                // Check if this row is a Vertical switch header
                if (rowStr.includes('VERTICAL') && !isCourseCode(rowClean[0]) && !isCourseCode(rowClean[1])) {
                    const vertMatch = rowStr.match(/VERTICAL\s*[-–—:]?\s*([IVXLCDM\d]+)(?:\s*[:\-]\s*(.*))?/i);
                    if (vertMatch) {
                        context.currentVertical = romanToNumber(vertMatch[1]);
                        context.currentVerticalName = vertMatch[2] ? cleanText(vertMatch[2]) : `Vertical ${context.currentVertical}`;
                        context.isCurrentOpenElective = false;
                        context.currentCategory = 'PROFESSIONAL ELECTIVE';
                        context.defaultCategoryType = 'PEC';
                    }
                }

                // Check if this row is a standalone Open Electives section header
                if ((rowStr === 'OPEN ELECTIVE COURSES' || rowStr === 'OPEN ELECTIVES' || rowStr.startsWith('OPEN ELECTIVE COURSES') || rowStr.startsWith('OPEN ELECTIVES (')) && rowClean.length <= 3) {
                    context.isCurrentOpenElective = true;
                    context.currentVertical = null;
                    context.currentCategory = 'OPEN ELECTIVE';
                    context.defaultCategoryType = 'OEC';
                    return;
                }

                // If inside Open Elective section, check for Department Name banner row (e.g. "Biomedical Engineering")
                if (context.isCurrentOpenElective && rowClean.length <= 2) {
                    const potentialDept = rowClean[0];
                    if (potentialDept && !isCourseCode(potentialDept) && !['S.NO', 'S.NO.', 'COURSE CODE', 'COURSE TITLE'].includes(potentialDept.toUpperCase()) && potentialDept.length > 3) {
                        context.currentOfferingDept = potentialDept;
                        return;
                    }
                }

                // Section categories inside semester tables
                if (rowStr.includes('THEORY CUM PRACTICAL') || rowStr.includes('THEORY & PRACTICAL') || rowStr.includes('INTEGRATED')) {
                    context.currentCategory = 'THEORY CUM PRACTICAL';
                    context.defaultCategoryType = 'PCC';
                    return;
                }
                if (rowStr.includes('THEORY COURSE') || rowStr.includes('THEORY COURSES') || rowStr === 'THEORY' || rowStr.startsWith('A. THEORY') || rowStr.startsWith('THEORY COURSES')) {
                    context.currentCategory = 'THEORY';
                    context.defaultCategoryType = 'PCC';
                    return;
                }
                if (rowStr.includes('PRACTICAL COURSE') || rowStr.includes('PRACTICAL COURSES') || rowStr.includes('LABORATORY COURSES') || rowStr === 'PRACTICAL' || rowStr.startsWith('B. PRACTICAL') || rowStr.startsWith('PRACTICAL COURSES') || rowStr.startsWith('B. LABORATORY')) {
                    context.currentCategory = 'PRACTICAL';
                    context.defaultCategoryType = 'ESC';
                    return;
                }
                if (rowStr.includes('EMPLOYABILITY ENHANCEMENT') || rowStr.includes('EEC')) {
                    context.currentCategory = 'EMPLOYABILITY ENHANCEMENT COURSE';
                    context.defaultCategoryType = 'EEC';
                    return;
                }
                if (rowStr.includes('MANDATORY COURSE') || rowStr.includes('MANDATORY COURSES') || rowStr === 'MANDATORY') {
                    context.currentCategory = 'MANDATORY COURSES';
                    context.defaultCategoryType = 'MC';
                    return;
                }
                if (rowStr.includes('LANGUAGE ELECTIVE – I') || rowStr.includes('LANGUAGE ELECTIVE - I') || rowStr.includes('LANGUAGE ELECTIVE I')) {
                    context.currentCategory = 'Language Elective – I';
                    context.defaultCategoryType = 'HUM';
                    return;
                }
                if (rowStr.includes('LANGUAGE ELECTIVE – II') || rowStr.includes('LANGUAGE ELECTIVE - II') || rowStr.includes('LANGUAGE ELECTIVE II')) {
                    context.currentCategory = 'Language Elective - II';
                    context.defaultCategoryType = 'HUM';
                    return;
                }

                const parsedSubject = parseSubjectRow(row, context);
                if (parsedSubject) {
                    const exists = subjects.some(s => s.code === parsedSubject.code && s.title === parsedSubject.title && s.semester === parsedSubject.semester);
                    if (!exists) {
                        subjects.push(parsedSubject);
                    }
                }
            });
        }
    });

    return subjects;
}

function parseDetailedSyllabi(rawText) {
    const syllabi = {};
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

    let currentSubject = null;
    let currentSection = null;
    let currentUnit = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const upper = line.toUpperCase();

        let foundCode = null;
        let foundTitle = '';

        const codeMatch = line.match(/^([0-9]{2}[A-Z]{2,4}[0-9]{2,4}|[A-Z]{2,4}[0-9]{3,5}|U26[A-Z]{2,4}[0-9X]{2,4})\b/i);
        if (codeMatch && !upper.includes('UNIT') && !upper.includes('SEMESTER')) {
            foundCode = codeMatch[1].toUpperCase().trim();
            const restOfLine = line.substring(codeMatch[0].length).replace(/^[\s\-–—:]+/, '').trim();
            if (restOfLine && !isNumeric(restOfLine.split(' ')[0])) {
                foundTitle = restOfLine.replace(/\bL\s*T\s*P\s*C.*$/i, '').trim();
            } else if (i + 1 < lines.length && !lines[i + 1].toUpperCase().includes('UNIT') && !lines[i + 1].toUpperCase().includes('OBJECTIVE')) {
                foundTitle = lines[i + 1].trim();
            }
        }

        if (foundCode) {
            if (!syllabi[foundCode]) {
                syllabi[foundCode] = {
                    code: foundCode,
                    title: foundTitle || '',
                    objectives: [],
                    outcomes: [],
                    units: [],
                    textbooks: [],
                    references: [],
                    webReferences: [],
                    coPoMapping: []
                };
            }
            currentSubject = syllabi[foundCode];
            currentSection = null;
            currentUnit = null;
            continue;
        }

        if (!currentSubject) continue;

        if (upper.includes('COURSE OBJECTIVE') || upper.includes('OBJECTIVES:') || upper === 'OBJECTIVES' || upper.startsWith('OBJECTIVES')) {
            currentSection = 'objectives';
            continue;
        }

        if (upper.includes('COURSE OUTCOME') || upper.includes('OUTCOMES:') || upper === 'OUTCOMES' || upper.startsWith('OUTCOMES') || upper.includes('STUDENTS WILL BE ABLE TO')) {
            currentSection = 'outcomes';
            continue;
        }

        if (upper.includes('TEXT BOOK') || upper.includes('TEXTBOOKS') || upper.includes('TEXT BOOK(S)')) {
            currentSection = 'textbooks';
            continue;
        }

        if (upper.includes('REFERENCE') || upper.includes('REFERENCES:') || upper.includes('REFERENCE BOOKS') || upper.includes('REFERENCE BOOK(S)')) {
            currentSection = 'references';
            continue;
        }

        if (upper.includes('WEB REFERENCE') || upper.includes('ONLINE RESOURCES') || upper.includes('REFERENCES (WEB)') || upper.includes('E-RESOURCES')) {
            currentSection = 'webReferences';
            continue;
        }

        const unitMatch = line.match(/^UNIT\s*([IVXLCDM\d]+)\s*[-–—:]?\s*(.*)$/i);
        if (unitMatch) {
            currentSection = 'units';
            const unitNo = romanToNumber(unitMatch[1]);
            const unitTitle = cleanText(unitMatch[2]) || `Unit ${unitNo}`;
            currentUnit = {
                unitNo: `Unit ${unitNo}`,
                title: unitTitle.replace(/\d+\s*(PERIODS|HOURS|PERIOD).*$/i, '').trim(),
                topics: []
            };
            currentSubject.units.push(currentUnit);
            continue;
        }

        if (currentSection === 'objectives') {
            const objText = line.replace(/^[•\-\*\d\.\)]+\s*/, '').trim();
            if (objText && objText.length > 5 && !upper.startsWith('TOTAL')) {
                currentSubject.objectives.push(objText);
            }
        } else if (currentSection === 'outcomes') {
            const coMatch = line.match(/^(CO\s*\d+|CO[1-5])\s*[-–—:]?\s*(.*)$/i);
            if (coMatch) {
                const coNo = coMatch[1].replace(/\s+/g, ' ').toUpperCase();
                const outcomeText = coMatch[2].trim();
                const rbtMatch = outcomeText.match(/\[([Kk]\d+)\]/);
                const rbtLevel = rbtMatch ? rbtMatch[1].toUpperCase() : 'K2';
                currentSubject.outcomes.push({
                    coNo,
                    outcome: outcomeText.replace(/\[[Kk]\d+\]/, '').trim(),
                    rbtLevel
                });
            } else if (line.length > 10 && !upper.startsWith('TOTAL') && !upper.startsWith('PO') && !upper.startsWith('CO')) {
                const coIndex = currentSubject.outcomes.length + 1;
                if (coIndex <= 5) {
                    currentSubject.outcomes.push({
                        coNo: `CO ${coIndex}`,
                        outcome: line.replace(/^[•\-\*\d\.\)]+\s*/, '').trim(),
                        rbtLevel: 'K2'
                    });
                }
            }
        } else if (currentSection === 'units' && currentUnit) {
            if (!upper.includes('TOTAL') && !upper.includes('PERIODS') && line.length > 3) {
                currentUnit.topics.push(line);
            }
        } else if (currentSection === 'textbooks') {
            if (line.length > 5 && !upper.includes('REFERENCE')) {
                currentSubject.textbooks.push(line.replace(/^\d+[\.\)]\s*/, '').trim());
            }
        } else if (currentSection === 'references') {
            if (line.length > 5 && !upper.includes('WEB')) {
                currentSubject.references.push(line.replace(/^\d+[\.\)]\s*/, '').trim());
            }
        } else if (currentSection === 'webReferences') {
            if (line.length > 5) {
                currentSubject.webReferences.push(line.replace(/^\d+[\.\)]\s*/, '').trim());
            }
        }
    }

    return syllabi;
}

/**
 * Parses a Word document File or ArrayBuffer
 * @param {File|ArrayBuffer} fileOrBuffer 
 */
export async function parseWordSyllabusClient(fileOrBuffer) {
    try {
        let arrayBuffer;
        if (fileOrBuffer instanceof ArrayBuffer) {
            arrayBuffer = fileOrBuffer;
        } else if (fileOrBuffer && typeof fileOrBuffer.arrayBuffer === 'function') {
            arrayBuffer = await fileOrBuffer.arrayBuffer();
        } else {
            throw new Error('Invalid file format. Please provide a Word document (.docx).');
        }

        const [htmlResult, textResult] = await Promise.all([
            mammoth.convertToHtml({ arrayBuffer }),
            mammoth.extractRawText({ arrayBuffer })
        ]);

        const html = htmlResult.value || '';
        const rawText = textResult.value || '';

        const elements = parseSequentialElementsDOM(html);
        const curriculumSubjects = parseCurriculumSequential(elements);
        const detailedSyllabi = parseDetailedSyllabi(rawText);

        const createDefaultMapping = () => [1, 2, 3, 4, 5].map(num => {
            const mapObj = { coNo: `CO ${num}` };
            for (let i = 1; i <= 12; i++) mapObj[`po${i}`] = '-';
            for (let i = 1; i <= 3; i++) mapObj[`pso${i}`] = '-';
            return mapObj;
        });

        const mergedSubjects = [...curriculumSubjects];

        mergedSubjects.forEach(subj => {
            const details = detailedSyllabi[subj.code];
            if (details) {
                if (details.objectives && details.objectives.length > 0) subj.objectives = details.objectives;
                if (details.outcomes && details.outcomes.length > 0) subj.outcomes = details.outcomes;
                if (details.units && details.units.length > 0) subj.units = details.units;
                if (details.textbooks && details.textbooks.length > 0) subj.textbooks = details.textbooks;
                if (details.references && details.references.length > 0) subj.references = details.references;
                if (details.webReferences && details.webReferences.length > 0) subj.webReferences = details.webReferences;
            }

            if (!subj.units || subj.units.length === 0) {
                subj.units = [1, 2, 3, 4, 5].map(u => ({
                    unitNo: `Unit ${u}`,
                    title: `Unit ${u} - Topics`,
                    topics: [`Fundamental concepts and applications of ${subj.title || 'Course'}.`]
                }));
            }

            if (!subj.outcomes || subj.outcomes.length === 0) {
                subj.outcomes = [1, 2, 3, 4, 5].map(c => ({
                    coNo: `CO ${c}`,
                    outcome: `Understand and apply concepts of ${subj.title || 'Course'}.`,
                    rbtLevel: 'K2'
                }));
            }

            if (!subj.coPoMapping || subj.coPoMapping.length === 0) {
                subj.coPoMapping = createDefaultMapping();
            }
        });

        return {
            success: true,
            totalSubjects: mergedSubjects.length,
            subjects: mergedSubjects,
            warnings: htmlResult.messages || []
        };
    } catch (error) {
        console.error('Client Word Parser Error:', error);
        return {
            success: false,
            error: error.message,
            subjects: []
        };
    }
}
