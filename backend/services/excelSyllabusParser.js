const XLSX = require('xlsx');

function cleanStr(val) {
    if (val === null || val === undefined) return '';
    return String(val).replace(/\s+/g, ' ').trim();
}

function romanToNumber(roman) {
    if (!roman) return null;
    const r = String(roman).toUpperCase().trim();
    const map = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8 };
    if (map[r]) return map[r];
    const num = parseInt(r.replace(/\D/g, ''), 10);
    return (num >= 1 && num <= 8) ? num : null;
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
    const t = String(type).toUpperCase().trim();
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
    const s = String(str).toUpperCase().trim();
    return VALID_CATEGORIES.includes(s);
}

const COURSE_CODE_REGEX = /^[A-Z0-9]{2,4}[A-Z]{2,4}[0-9X]{2,4}$/i;
const LOOSE_CODE_REGEX = /^[A-Z0-9]{4,10}$/i;
const NON_COURSE_WORDS = [
    'THEORY', 'PRACTICAL', 'PERIODS', 'CREDIT', 'CREDITS', 'TOTAL', 'MARKS', 'WEEKS', 'CATEGORY', 'SEMESTER', 'COURSE', 'HOURS', 'VERTICAL', 'OPEN',
    'HSMC', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC', 'HUM', 'ESE', 'CIA', 'S.NO', 'SL.NO', 'SL NO', 'S NO', 'NO', 'SERIAL NO'
];

function isCourseCode(str) {
    if (!str) return false;
    const s = String(str).trim().toUpperCase();
    if (NON_COURSE_WORDS.includes(s) || isCategoryString(s)) return false;
    if (s.length < 4 || s.length > 12) return false;
    if (!/\d/.test(s) && !s.includes('XX')) return false;
    return COURSE_CODE_REGEX.test(s) || LOOSE_CODE_REGEX.test(s);
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

function inferSemesterFromCourseCode(code) {
    if (!code) return null;
    const clean = String(code).trim().toUpperCase();

    // 1. Autonomous pattern: U26BM604 -> 6, U26TM101 -> 1, U26AD102 -> 1, U23CS201 -> 2, 23CS301 -> 3, 26CS401 -> 4, U26EM701 -> 7
    const autoMatch = clean.match(/^[A-Z0-9]{2,5}([1-8])\d{2}[A-Z0-9]?$/i);
    if (autoMatch) {
        const sem = parseInt(autoMatch[1], 10);
        if (sem >= 1 && sem <= 8) return sem;
    }

    // 2. Anna University 2021 Regulation (e.g. CS3351 -> 3, MA3151 -> 1, GE3251 -> 2, IT3401 -> 4, CS3591 -> 5, CS3691 -> 6)
    const auMatch = clean.match(/^[A-Z]{2,4}3([1-8])\d{2}$/i);
    if (auMatch) {
        const sem = parseInt(auMatch[1], 10);
        if (sem >= 1 && sem <= 8) return sem;
    }

    // 3. Anna University 2017 Regulation (e.g. CS8351 -> 3, CS8491 -> 4, CS8591 -> 5, CS8691 -> 6, CS8791 -> 7)
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

function parseNumber(val, defaultVal = 0) {
    if (val === null || val === undefined) return defaultVal;
    if (typeof val === 'number') return isNaN(val) ? defaultVal : val;
    const str = String(val).trim();
    if (str === '' || str === '-' || str === '–' || str === '—' || str.toUpperCase() === 'NIL' || str.toUpperCase() === 'NA' || str.toUpperCase() === 'N/A') {
        return 0;
    }
    const clean = str.replace(/[^\d\.]/g, '').trim();
    const num = parseFloat(clean);
    return isNaN(num) ? defaultVal : num;
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

function detectSheetContext(sheetName) {
    const s = sheetName.toUpperCase().trim();
    let semester = null;
    let vertical = null;
    let verticalName = '';
    let isOpenElective = false;

    const semMatch = s.match(/(?:SEMESTER|SEM|SESSION|SESS|TERM|YEAR)[\s_\-:]*([IVXLCDM\d]+)/i);
    if (semMatch) {
        semester = romanToNumber(semMatch[1]) || (parseInt(semMatch[1], 10) >= 1 && parseInt(semMatch[1], 10) <= 8 ? parseInt(semMatch[1], 10) : null);
    }

    const vertMatch = s.match(/(?:VERTICAL|TRACK|PE[\s_\-]?VERTICAL)[\s_\-:]*([IVXLCDM\d]+)(?:[\s_\-:]*(.*))?/i);
    if (vertMatch) {
        vertical = romanToNumber(vertMatch[1]) || parseInt(vertMatch[1], 10) || 1;
        verticalName = vertMatch[2] ? cleanStr(vertMatch[2]) : `Vertical ${vertical}`;
    }

    if (s.includes('OPEN ELECTIVE') || s.includes('OEC') || s.includes('OPEN_ELECTIVE')) {
        isOpenElective = true;
    }

    return { semester, vertical, verticalName, isOpenElective };
}

function parseSheetRows(rows, defaultContext) {
    if (!rows || rows.length === 0) return [];

    const subjects = [];
    let colMap = null;
    let currentContext = { ...defaultContext };

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;

        const rowClean = row.map(c => cleanStr(c));
        const rowUpper = rowClean.map(c => c.toUpperCase());
        const rowStr = rowUpper.join(' ').trim();

        if (!rowStr) continue;

        if ((rowStr.includes('SUBJECT AREA') || rowStr.includes('CREDIT DISTRIBUTION') || rowStr.includes('DISTRIBUTION OF CREDITS') || rowStr.includes('SUMMARY OF CURRICULUM')) && (rowStr.includes('CREDITS PER SEMESTER') || rowStr.includes('PERCENTAGE') || rowStr.includes('TOTAL CREDITS'))) {
            continue;
        }

        if ((rowStr.includes('SEMESTER') || rowStr.includes('SESSION') || rowStr.includes('TERM')) && !rowStr.includes('END SEMESTER')) {
            const semMatch = rowStr.match(/(?:SEMESTER|SESSION|SEM|TERM)[\s_\-–—:]*([IVXLCDM\d]+)/i);
            if (semMatch) {
                const sNum = romanToNumber(semMatch[1]) || parseInt(semMatch[1], 10);
                if (sNum >= 1 && sNum <= 8) {
                    currentContext.semester = sNum;
                    currentContext.vertical = null;
                    currentContext.isOpenElective = false;
                }
            }
        }

        if (rowStr.includes('VERTICAL') && !isCourseCode(rowClean[0]) && !isCourseCode(rowClean[1])) {
            const vertMatch = rowStr.match(/VERTICAL\s*[-–—:_]?\s*([IVXLCDM\d]+)(?:\s*[:\-]\s*(.*))?/i);
            if (vertMatch) {
                const vNum = romanToNumber(vertMatch[1]) || parseInt(vertMatch[1], 10);
                currentContext.vertical = vNum || 1;
                currentContext.verticalName = vertMatch[2] ? cleanStr(vertMatch[2]) : `Vertical ${currentContext.vertical}`;
                currentContext.isOpenElective = false;
                currentContext.semester = null;
            }
        }

        if ((rowStr.includes('OPEN ELECTIVE COURSES') || rowStr === 'OPEN ELECTIVES' || rowStr.startsWith('OPEN ELECTIVE')) && rowClean.filter(Boolean).length <= 3) {
            currentContext.isOpenElective = true;
            currentContext.vertical = null;
            currentContext.semester = null;
            continue;
        }

        if (currentContext.isOpenElective && rowClean.filter(Boolean).length <= 2) {
            const potentialDept = rowClean.find(c => c.length > 3 && !isCourseCode(c) && !rowUpper.includes('COURSE CODE'));
            if (potentialDept && !potentialDept.toUpperCase().includes('OPEN ELECTIVE')) {
                currentContext.offeringDept = potentialDept;
                continue;
            }
        }

        // Section category banner row
        if (rowStr.includes('THEORY CUM PRACTICAL') || rowStr.includes('THEORY & PRACTICAL') || rowStr.includes('INTEGRATED')) {
            currentContext.currentCategory = 'THEORY CUM PRACTICAL';
            currentContext.defaultCategoryType = 'PCC';
            continue;
        }
        if (rowStr.includes('THEORY COURSE') || rowStr.includes('THEORY COURSES') || rowStr === 'THEORY' || rowStr.startsWith('A. THEORY')) {
            currentContext.currentCategory = 'THEORY';
            currentContext.defaultCategoryType = 'PCC';
            continue;
        }
        if (rowStr.includes('PRACTICAL COURSE') || rowStr.includes('PRACTICAL COURSES') || rowStr.includes('LABORATORY COURSES') || rowStr === 'PRACTICAL' || rowStr === 'LABORATORY' || rowStr.startsWith('B. PRACTICAL') || rowStr.startsWith('B. LABORATORY')) {
            currentContext.currentCategory = 'PRACTICAL';
            currentContext.defaultCategoryType = 'ESC';
            continue;
        }
        if (rowStr.includes('EMPLOYABILITY ENHANCEMENT') || rowStr.includes('EEC')) {
            currentContext.currentCategory = 'EMPLOYABILITY ENHANCEMENT COURSE';
            currentContext.defaultCategoryType = 'EEC';
            continue;
        }
        if (rowStr.includes('MANDATORY COURSE') || rowStr.includes('MANDATORY COURSES') || rowStr === 'MANDATORY') {
            currentContext.currentCategory = 'MANDATORY COURSES';
            currentContext.defaultCategoryType = 'MC';
            continue;
        }

        const hasCodeHeader = rowUpper.some(c => c.includes('COURSE CODE') || c.includes('SUB CODE') || c.includes('SUBJECT CODE') || c === 'CODE' || c === 'SUB_CODE');
        const hasTitleHeader = rowUpper.some(c => c.includes('COURSE TITLE') || c.includes('SUBJECT NAME') || c.includes('COURSE NAME') || c === 'TITLE' || c === 'NAME OF THE COURSE' || c === 'SUBJECT');
        
        if (hasCodeHeader || (hasTitleHeader && (rowUpper.includes('L') || rowUpper.includes('C') || rowUpper.includes('CREDITS')))) {
            colMap = {};
            rowUpper.forEach((col, idx) => {
                const c = col.trim();
                if (c.includes('COURSE CODE') || c.includes('SUB CODE') || c.includes('SUBJECT CODE') || c === 'CODE' || c === 'SUB_CODE' || c === 'PAPER CODE') colMap.code = idx;
                else if (c.includes('COURSE TITLE') || c.includes('SUBJECT NAME') || c.includes('COURSE NAME') || c === 'TITLE' || c === 'SUBJECT' || c === 'NAME OF SUBJECT') colMap.title = idx;
                else if (c === 'CATEGORY TYPE' || c === 'CAT TYPE' || c === 'BASKET') colMap.categoryType = idx;
                else if (c === 'CATEGORY' || c === 'CAT' || c === 'TYPE' || c.includes('COURSE TYPE') || c.includes('NATURE')) {
                    if (colMap.category === undefined) colMap.category = idx;
                    else colMap.categoryType = idx;
                }
                else if (c === 'L' || c.includes('LECTURE')) colMap.l = idx;
                else if (c === 'T' || c.includes('TUTORIAL')) colMap.t = idx;
                else if (c === 'P' || c.includes('PRACTICAL') || c.includes('LAB')) colMap.p = idx;
                else if (c === 'C' || c.includes('CREDIT') || c.includes('CREDITS')) colMap.credits = idx;
                else if (c.includes('CONTACT') || c.includes('TOTAL PERIODS') || c.includes('TOTAL HOURS') || c.includes('PERIODS')) colMap.contactPeriods = idx;
                else if (c.includes('CIA') || c.includes('INTERNAL') || c.includes('CA MARKS')) colMap.cia = idx;
                else if (c.includes('ESE') || c.includes('EXTERNAL') || c.includes('END SEM') || c.includes('ES MARKS')) colMap.ese = idx;
                else if (c === 'TOTAL' || c.includes('TOTAL MARKS') || c.includes('MAX MARKS')) colMap.total = idx;
                else if (c === 'SEM' || c.includes('SEMESTER') || c.includes('SESSION') || c.includes('TERM') || c === 'YEAR') colMap.semester = idx;
                else if (c.includes('VERTICAL') || c.includes('TRACK')) colMap.vertical = idx;
                else if (c.includes('OFFERING DEPT') || c.includes('DEPARTMENT')) colMap.offeringDept = idx;
            });
            continue;
        }

        let code = '';
        let title = '';
        let rawCategoryVal = '';
        let rawCategoryTypeVal = '';
        let l = 3, t = 0, p = 0, contactPeriods = 3, credits = 3, cia = 40, ese = 60, total = 100;
        let rowSem = currentContext.semester;
        let rowVert = currentContext.vertical;
        let rowVertName = currentContext.verticalName;
        let rowIsOpenElective = currentContext.isOpenElective;
        let rowOfferingDept = currentContext.offeringDept || '';

        if (colMap && colMap.code !== undefined && rowClean[colMap.code]) {
            const rawCode = rowClean[colMap.code];
            if (isCourseCode(rawCode)) {
                code = rawCode.toUpperCase().trim();
                title = colMap.title !== undefined && rowClean[colMap.title] ? rowClean[colMap.title] : code;
                
                if (colMap.categoryType !== undefined && rowClean[colMap.categoryType]) {
                    rawCategoryTypeVal = rowClean[colMap.categoryType];
                }
                if (colMap.category !== undefined && rowClean[colMap.category]) {
                    rawCategoryVal = rowClean[colMap.category];
                }

                const hasExplicitPeriods = (colMap.l !== undefined && rowClean[colMap.l] !== undefined && rowClean[colMap.l] !== '') ||
                                           (colMap.p !== undefined && rowClean[colMap.p] !== undefined && rowClean[colMap.p] !== '') ||
                                           (colMap.credits !== undefined && rowClean[colMap.credits] !== undefined && rowClean[colMap.credits] !== '');

                if (hasExplicitPeriods) {
                    l = colMap.l !== undefined ? parseNumber(rowClean[colMap.l], 0) : 0;
                    t = colMap.t !== undefined ? parseNumber(rowClean[colMap.t], 0) : 0;
                    p = colMap.p !== undefined ? parseNumber(rowClean[colMap.p], 0) : 0;
                    credits = colMap.credits !== undefined && rowClean[colMap.credits] !== undefined ? parseNumber(rowClean[colMap.credits], 3) : (p > 0 && l === 0 ? Math.max(1, Math.round(p / 2)) : (l + t));
                    contactPeriods = colMap.contactPeriods !== undefined && rowClean[colMap.contactPeriods] !== undefined ? parseNumber(rowClean[colMap.contactPeriods], l + t + p) : (l + t + p);
                    cia = colMap.cia !== undefined && rowClean[colMap.cia] !== undefined ? parseNumber(rowClean[colMap.cia], 40) : 40;
                    ese = colMap.ese !== undefined && rowClean[colMap.ese] !== undefined ? parseNumber(rowClean[colMap.ese], 60) : 60;
                    total = colMap.total !== undefined && rowClean[colMap.total] !== undefined ? parseNumber(rowClean[colMap.total], cia + ese) : (cia + ese);
                } else {
                    const titleIdx = colMap.title !== undefined ? colMap.title : colMap.code;
                    const remaining = rowClean.slice(Math.max(colMap.code, titleIdx) + 1).filter(c => !isCategoryString(c));
                    const nums = extractNumericSequence(remaining);
                    const isLab = title.toUpperCase().includes('LAB') || title.toUpperCase().includes('PRACTICAL');
                    const isMC = rawCategoryVal.toUpperCase().includes('MC') || rawCategoryVal.toUpperCase().includes('MANDATORY');
                    const isEEC = rawCategoryVal.toUpperCase().includes('EEC') || rawCategoryVal.toUpperCase().includes('EMPLOYABILITY');
                    const resolved = resolvePeriodsAndMarks(nums, { isLabOrPractical: isLab, isMC, isEEC });
                    l = resolved.l; t = resolved.t; p = resolved.p; contactPeriods = resolved.contactPeriods; credits = resolved.credits;
                    cia = resolved.cia; ese = resolved.ese; total = resolved.total;
                }

                if (colMap.semester !== undefined && rowClean[colMap.semester]) {
                    const parsedS = romanToNumber(rowClean[colMap.semester]) || parseInt(String(rowClean[colMap.semester]).replace(/\D/g, ''), 10);
                    if (parsedS >= 1 && parsedS <= 8) rowSem = parsedS;
                }
                if (colMap.vertical !== undefined && rowClean[colMap.vertical]) {
                    const parsedV = romanToNumber(rowClean[colMap.vertical]) || parseInt(String(rowClean[colMap.vertical]).replace(/\D/g, ''), 10);
                    if (parsedV) {
                        rowVert = parsedV;
                        rowVertName = `Vertical ${parsedV}`;
                    }
                }
                if (colMap.offeringDept !== undefined && rowClean[colMap.offeringDept]) {
                    rowOfferingDept = rowClean[colMap.offeringDept];
                    rowIsOpenElective = true;
                }
            }
        }

        if (!code) {
            let codeIdx = -1;
            for (let i = 0; i < Math.min(5, rowClean.length); i++) {
                if (isCourseCode(rowClean[i])) {
                    codeIdx = i;
                    break;
                }
            }

            if (codeIdx !== -1) {
                code = rowClean[codeIdx].toUpperCase().trim();
                let nextIdx = codeIdx + 1;
                if (nextIdx < rowClean.length && isNaN(Number(rowClean[nextIdx])) && !isCategoryString(rowClean[nextIdx])) {
                    title = rowClean[nextIdx];
                    nextIdx++;
                } else if (codeIdx > 0 && isNaN(Number(rowClean[codeIdx - 1])) && !isCategoryString(rowClean[codeIdx - 1]) && rowClean[codeIdx - 1].length > 4) {
                    title = rowClean[codeIdx - 1];
                } else {
                    title = code;
                }

                if (nextIdx < rowClean.length && isCategoryString(rowClean[nextIdx])) {
                    rawCategoryTypeVal = rowClean[nextIdx];
                    nextIdx++;
                }

                const remaining = rowClean.slice(nextIdx);
                const nums = extractNumericSequence(remaining);
                const isLab = title.toUpperCase().includes('LAB') || title.toUpperCase().includes('PRACTICAL');
                const isMC = rawCategoryTypeVal.toUpperCase() === 'MC' || rawCategoryVal.toUpperCase().includes('MANDATORY');
                const isEEC = rawCategoryTypeVal.toUpperCase() === 'EEC' || rawCategoryVal.toUpperCase().includes('EMPLOYABILITY');
                const resolved = resolvePeriodsAndMarks(nums, { isLabOrPractical: isLab, isMC, isEEC });
                l = resolved.l; t = resolved.t; p = resolved.p; contactPeriods = resolved.contactPeriods; credits = resolved.credits;
                cia = resolved.cia; ese = resolved.ese; total = resolved.total;
            }
        }

        if (code) {
            const catResult = determineSubjectCategoryAndType({
                title,
                code,
                l,
                t,
                p,
                credits,
                rawCategory: rawCategoryVal,
                rawCategoryType: rawCategoryTypeVal,
                contextCategory: currentContext.currentCategory,
                contextCategoryType: currentContext.defaultCategoryType
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

            if (!rowVert && !rowIsOpenElective && (!rowSem || rowSem < 1 || rowSem > 8)) {
                const inferred = inferSemesterFromCourseCode(code);
                rowSem = inferred || 1;
            }

            if (rowVert) {
                categoryType = 'PEC';
                category = 'PROFESSIONAL ELECTIVE';
            } else if (rowIsOpenElective) {
                categoryType = 'OEC';
                category = 'OPEN ELECTIVE';
            }

            const units = [1, 2, 3, 4, 5].map(u => ({
                unitNo: `Unit ${u}`,
                title: `Unit ${u} - Fundamental & Applied Topics`,
                topics: [`Comprehensive concepts, methods, and practical aspects of ${title}.`]
            }));

            const outcomes = [
                { coNo: 'CO 1', outcome: `Remember and explain the foundational concepts and theories of ${title}.`, rbtLevel: 'K2' },
                { coNo: 'CO 2', outcome: `Understand and illustrate core techniques and structural frameworks of ${title}.`, rbtLevel: 'K2' },
                { coNo: 'CO 3', outcome: `Apply methods, models, and computational approaches to solve engineering problems.`, rbtLevel: 'K3' },
                { coNo: 'CO 4', outcome: `Analyze performance metrics, design alternatives, and standard methodologies.`, rbtLevel: 'K4' },
                { coNo: 'CO 5', outcome: `Evaluate, develop, or synthesize solutions for complex and modern domain requirements.`, rbtLevel: 'K5' }
            ];

            const createDefaultMapping = () => [1, 2, 3, 4, 5].map(num => {
                const mapObj = { coNo: `CO ${num}` };
                for (let i = 1; i <= 12; i++) mapObj[`po${i}`] = (i <= 3) ? '3' : (i <= 6 ? '2' : '-');
                for (let i = 1; i <= 3; i++) mapObj[`pso${i}`] = '2';
                return mapObj;
            });

            const parsedSubject = {
                code,
                title: title || code,
                category,
                categoryType,
                l,
                t,
                p,
                contactPeriods: contactPeriods || (l + t + p),
                credits: credits || 3,
                cia: cia !== undefined ? cia : 40,
                ese: ese !== undefined ? ese : 60,
                total: total || 100,
                semester: (rowVert || rowIsOpenElective) ? null : (rowSem || 1),
                vertical: rowVert || null,
                verticalName: rowVert ? (rowVertName || `Vertical ${rowVert}`) : '',
                isOpenElective: Boolean(rowIsOpenElective),
                offeringDept: rowIsOpenElective ? rowOfferingDept : '',
                objectives: [
                    `Understand the basic concepts, principles, and scope of ${title || 'the course'}.`,
                    `Familiarize students with design, problem solving, and analytical approaches.`,
                    `Provide hands-on exposure to practical techniques and real-world tools.`
                ],
                outcomes,
                units,
                textbooks: [
                    `Standard Curriculum Textbook for ${title}, Latest Edition.`
                ],
                references: [
                    `Reference Guide and Manual for ${title}, Reputed Academic Publishers.`
                ],
                webReferences: [
                    `https://nptel.ac.in/courses`
                ],
                coPoMapping: createDefaultMapping()
            };

            const exists = subjects.some(s => s.code === parsedSubject.code && s.semester === parsedSubject.semester && s.vertical === parsedSubject.vertical);
            if (!exists) {
                subjects.push(parsedSubject);
            }
        }
    }

    return subjects;
}

/**
 * Backend Parser for Excel Buffer
 * @param {Buffer} buffer 
 */
function parseSyllabusExcelDoc(buffer) {
    try {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
            return { success: false, error: 'The uploaded Excel spreadsheet contains no worksheets.' };
        }

        let allSubjects = [];

        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            if (!worksheet) return;

            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
            if (!rows || rows.length === 0) return;

            const sheetContext = detectSheetContext(sheetName);
            const sheetSubjects = parseSheetRows(rows, sheetContext);

            sheetSubjects.forEach(subj => {
                const exists = allSubjects.some(s => s.code === subj.code && s.semester === subj.semester && s.vertical === subj.vertical);
                if (!exists) {
                    allSubjects.push(subj);
                }
            });
        });

        if (allSubjects.length === 0) {
            return {
                success: false,
                error: 'No course rows or syllabus tables could be detected. Please ensure your Excel sheet has Course Code, Title, Category, and Credit columns.',
                subjects: []
            };
        }

        return {
            success: true,
            totalSubjects: allSubjects.length,
            subjects: allSubjects
        };
    } catch (err) {
        console.error('Backend Excel Parser Error:', err);
        return {
            success: false,
            error: err.message || 'Failed to parse Excel spreadsheet',
            subjects: []
        };
    }
}

module.exports = {
    parseSyllabusExcelDoc
};
