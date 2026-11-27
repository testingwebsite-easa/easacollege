/**
 * Shared HTML table column definitions and header builders for printable curriculum PDFs.
 * Explicit <colgroup> widths prevent CSS `table-layout: fixed` from collapsing columns
 * when the first row is a full-width category banner (e.g. LANGUAGE ELECTIVE - I).
 */

export const CURRICULUM_11_COLGROUP = `
    <colgroup>
        <col style="width: 12%;" />
        <col style="width: 32%;" />
        <col style="width: 9%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 9%;" />
        <col style="width: 7%;" />
        <col style="width: 6%;" />
        <col style="width: 6%;" />
        <col style="width: 7%;" />
    </colgroup>
`;

export const CURRICULUM_10_COLGROUP = `
    <colgroup>
        <col style="width: 12%;" />
        <col style="width: 36%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 10%;" />
        <col style="width: 8%;" />
        <col style="width: 7%;" />
        <col style="width: 7%;" />
        <col style="width: 8%;" />
    </colgroup>
`;

export const CURRICULUM_12_COLGROUP = `
    <colgroup>
        <col style="width: 5%;" />
        <col style="width: 12%;" />
        <col style="width: 27%;" />
        <col style="width: 8%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 4%;" />
        <col style="width: 9%;" />
        <col style="width: 7%;" />
        <col style="width: 6%;" />
        <col style="width: 6%;" />
        <col style="width: 8%;" />
    </colgroup>
`;

/** Returns true when the given department slug, name, or degree prefix corresponds to M.B.A. */
export const isMBADepartment = (deptSlugOrObj, degreePrefix = '') => {
    const slug = typeof deptSlugOrObj === 'string'
        ? deptSlugOrObj
        : (deptSlugOrObj?.slug || '');
    const name = typeof deptSlugOrObj === 'string'
        ? deptSlugOrObj
        : (deptSlugOrObj?.name || '');
    const slugLower = String(slug || '').toLowerCase().trim();
    const nameLower = String(name || '').toLowerCase().trim();
    const prefixNorm = String(degreePrefix || '').toUpperCase().replace(/\./g, '').trim();

    return (
        slugLower === 'master-of-business-administration' ||
        slugLower === 'mba' ||
        nameLower === 'master of business administration' ||
        nameLower === 'mba' ||
        nameLower === 'm.b.a.' ||
        prefixNorm === 'MBA'
    );
};

/** Builds the two-row header for 10-, 11-, or 12-column curriculum tables. */
export const buildCurriculumTableHeadRows = ({
    includeSno = false,
    includeCategory = true,
    titleLabel = 'Course',
    periodsLabel = 'Periods / Week',
    creditLabel = 'Credit'
} = {}) => `
    <tr>
        ${includeSno ? '<th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">S. No.</th>' : ''}
        <th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Course Code</th>
        <th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">${titleLabel}</th>
        ${includeCategory ? '<th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; white-space: nowrap;">Category</th>' : ''}
        <th colSpan="3" style="font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center; vertical-align: middle;">${periodsLabel}</th>
        <th rowSpan="2" style="font-size: 8pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; line-height: 1.15;">Total Contact Periods</th>
        <th rowSpan="2" style="font-size: 8.5pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle; white-space: nowrap;">${creditLabel}</th>
        <th colSpan="3" style="font-size: 8pt; font-family: Arial, sans-serif; padding: 2px; text-align: center; vertical-align: middle; white-space: nowrap;">Marks</th>
    </tr>
    <tr>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">L</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">T</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">P</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">CIA</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">ESE</th>
        <th style="font-size: 7.5pt; font-family: Arial, sans-serif; padding: 2px 1px; text-align: center; white-space: nowrap;">Total</th>
    </tr>
`;

/** Builds a Language Elective table block with consistent colgroup column alignment. */
export const buildLanguageElectiveBlockHTML = (heading, rowsHtml) => `
    <div class="lang-elective-block" style="margin-top: 6px; page-break-inside: avoid;">
        <table class="curriculum-table" style="margin-top: 0; margin-bottom: 4px;">
            ${CURRICULUM_11_COLGROUP}
            <thead>
                <tr class="category-row">
                    <td colSpan="11" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: #f2f2f2; text-align: left; padding: 3px 6px; text-transform: uppercase;">
                        ${heading}
                    </td>
                </tr>
                ${buildCurriculumTableHeadRows({ includeCategory: true, titleLabel: 'Course' })}
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>
    </div>
`;

export const isMbaNfeSubject = (subj) => {
    const catU = (subj?.category || '').toUpperCase();
    const typeU = (subj?.categoryType || '').toUpperCase().trim();
    return (
        typeU === 'NFE' ||
        catU.includes('NON-FUNCTIONAL') ||
        catU.includes('NON FUNCTIONAL') ||
        catU.includes('NFE')
    );
};

/**
 * Distinguishes the Semester I placeholder slot (e.g., P26BANXX / "Non-Functional Elective")
 * inside THEORY COURSES from the selectable NFE options listed below Semester I.
 */
export const isMbaNfePlaceholder = (subj) => {
    if (!isMbaNfeSubject(subj)) return false;
    const codeU = (subj?.code || '').trim().toUpperCase();
    const titleU = (subj?.title || '').trim().toUpperCase();
    const catU = (subj?.category || '').trim().toUpperCase();
    const typeU = (subj?.categoryType || '').trim().toUpperCase();

    return (
        codeU.endsWith('XX') ||
        codeU.includes('NXX') ||
        titleU === 'NON-FUNCTIONAL ELECTIVE' ||
        titleU === 'NON FUNCTIONAL ELECTIVE' ||
        (catU === 'THEORY' && typeU === 'NFE')
    );
};

export const classifyMbaSubjectCategory = (subj) => {
    if (!subj) return 'PCC';
    if (subj.isOpenElective) return 'OEC';
    if (isMbaNfeSubject(subj)) return 'NFE';
    if (subj.vertical) return 'PEC';

    const typeU = (subj.categoryType || '').toUpperCase().trim();
    if (['IPR', 'HUM', 'BSC', 'ESC', 'PCC', 'PEC', 'OEC', 'EEC', 'MC', 'NFE'].includes(typeU)) return typeU;
    if (typeU === 'HS' || typeU === 'HSS') return 'HUM';
    if (typeU === 'BS') return 'BSC';
    if (typeU === 'ES') return 'ESC';
    if (typeU === 'PC') return 'PCC';
    if (typeU === 'PE') return 'PEC';
    if (typeU === 'OE') return 'OEC';
    if (typeU === 'EE') return 'EEC';

    const text = `${subj.categoryType || ''} ${subj.category || ''} ${subj.categoryName || ''}`.toUpperCase();
    if (text.includes('IPR') || text.includes('RESEARCH METHODOLOGY')) return 'IPR';
    if (text.includes('HUMANITIES') || text.includes('HUM') || text.includes('HS')) return 'HUM';
    if (text.includes('BASIC SCIENCE') || text.includes('BSC') || text.includes('BS')) return 'BSC';
    if (text.includes('ENGINEERING SCIENCE') || text.includes('ESC') || text.includes('ES')) return 'ESC';
    if (text.includes('PROFESSIONAL ELECTIVE') || text.includes('FUNCTIONAL ELECTIVE') || text.includes('PEC') || text.includes('PE')) return 'PEC';
    if (text.includes('OPEN ELECTIVE') || text.includes('OEC') || text.includes('OE')) return 'OEC';
    if (text.includes('EMPLOYABILITY') || text.includes('PROJECT') || text.includes('INTERNSHIP') || text.includes('EEC') || text.includes('EE')) return 'EEC';
    if (text.includes('MANDATORY') || text.includes('MC')) return 'MC';
    return 'PCC';
};

const MBA_PEC_STREAMS = [
    {
        vertical: 1,
        verticalName: 'Financial Management',
        courses: [
            { code: 'P26BA302', title: 'Security Analysis and Portfolio Management' },
            { code: 'P26BA303', title: 'Financial Markets' },
            { code: 'P26BA304', title: 'Banking and Financial Services' },
            { code: 'P26BA305', title: 'Financial Derivatives' },
            { code: 'P26BA306', title: 'Fintech and sustainability' },
            { code: 'P26BA307', title: 'Behavioral Finance' }
        ]
    },
    {
        vertical: 2,
        verticalName: 'Marketing Management',
        courses: [
            { code: 'P26BA311', title: 'Retail Marketing' },
            { code: 'P26BA312', title: 'Services Marketing' },
            { code: 'P26BA313', title: 'Product and Brand Management' },
            { code: 'P26BA314', title: 'Consumer Behaviour and Neural Marketing' },
            { code: 'P26BA315', title: 'Sales and Distribution Management' },
            { code: 'P26BA316', title: 'Digital Marketing' }
        ]
    },
    {
        vertical: 3,
        verticalName: 'Human Resource Management',
        courses: [
            { code: 'P26BA321', title: 'Strategic Human Resource Management' },
            { code: 'P26BA322', title: 'Industrial relations and labour legislations' },
            { code: 'P26BA323', title: 'Knowledge Management and Innovation' },
            { code: 'P26BA324', title: 'Negotiation and Conflict Management' },
            { code: 'P26BA325', title: 'Reward and Compensation Management' },
            { code: 'P26BA326', title: 'Managing HR in Digital Age' }
        ]
    },
    {
        vertical: 4,
        verticalName: 'Operations Management',
        courses: [
            { code: 'P26BA331', title: 'Supply Chain and Logistics Management' },
            { code: 'P26BA332', title: 'Quality Management' },
            { code: 'P26BA333', title: 'Materials Management' },
            { code: 'P26BA334', title: 'Services Operations Management' },
            { code: 'P26BA335', title: 'Lean Six Sigma and Business excellence' },
            { code: 'P26BA336', title: 'Project Management' }
        ]
    },
    {
        vertical: 5,
        verticalName: 'Logistics and Supply Chain Management',
        courses: [
            { code: 'P26BA341', title: 'Port and Terminal Management' },
            { code: 'P26BA342', title: 'Exim Management' },
            { code: 'P26BA343', title: 'Fundamentals of Shipping' },
            { code: 'P26BA344', title: 'Sourcing and Supply Management' },
            { code: 'P26BA345', title: 'Warehouse Management' },
            { code: 'P26BA346', title: 'Transportation and Distribution Management' }
        ]
    },
    {
        vertical: 6,
        verticalName: 'Hospital Administration & Health Care Management',
        courses: [
            { code: 'P26BA351', title: 'Hospital Planning & Patient Care Management' },
            { code: 'P26BA352', title: 'Health Insurance & Medical Tourism' },
            { code: 'P26BA353', title: "Health Care Services & it's Changing Scenario" },
            { code: 'P26BA354', title: 'Hospital Management Information System' },
            { code: 'P26BA355', title: 'Health Information System' },
            { code: 'P26BA356', title: 'Health Promotion Approaches and Management' }
        ]
    },
    {
        vertical: 7,
        verticalName: 'Business Analytics with AI',
        courses: [
            { code: 'P26BA361', title: 'AI and Machine Learning for Business' },
            { code: 'P26BA362', title: 'E-Business Management' },
            { code: 'P26BA363', title: 'Social media web Analytics' },
            { code: 'P26BA364', title: 'Big Data Analytics' },
            { code: 'P26BA365', title: 'Business Analytics using Python' },
            { code: 'P26BA366', title: 'Data Mining and Decision Science' }
        ]
    },
    {
        vertical: 8,
        verticalName: 'Airport and Aviation Management',
        courses: [
            { code: 'P26BA371', title: 'Aviation Safety and Security' },
            { code: 'P26BA372', title: 'Airline And Airport Operations' },
            { code: 'P26BA373', title: 'Logistics For Aviation Management' },
            { code: 'P26BA374', title: 'Air Transportation Safety And Security' },
            { code: 'P26BA375', title: 'Airline Operation And Scheduling' },
            { code: 'P26BA376', title: 'Airline Marketing And Strategic Airline Alliances' }
        ]
    }
];

export const MBA_DEFAULT_NFE_OPTIONS = [
    {
        semester: 1,
        code: 'P26BAN01',
        title: 'Entrepreneurship Development',
        category: 'NON-FUNCTIONAL ELECTIVE (NFE)',
        categoryType: 'NFE',
        l: 4,
        t: 0,
        p: 0,
        contactPeriods: 4,
        credits: 4,
        cia: 40,
        ese: 60,
        total: 100,
        isOpenElective: false,
        isCatalogFallback: true
    },
    {
        semester: 1,
        code: 'P26BAN02',
        title: 'Event Management',
        category: 'NON-FUNCTIONAL ELECTIVE (NFE)',
        categoryType: 'NFE',
        l: 4,
        t: 0,
        p: 0,
        contactPeriods: 4,
        credits: 4,
        cia: 40,
        ese: 60,
        total: 100,
        isOpenElective: false,
        isCatalogFallback: true
    }
];

export const MBA_DEFAULT_PEC_SPECIALISATIONS = MBA_PEC_STREAMS.flatMap(stream =>
    stream.courses.map(course => ({
        semester: 3,
        vertical: stream.vertical,
        verticalName: stream.verticalName,
        code: course.code,
        title: course.title,
        category: 'THEORY',
        categoryType: 'PEC',
        l: 3,
        t: 0,
        p: 0,
        contactPeriods: 3,
        credits: 3,
        cia: 40,
        ese: 60,
        total: 100,
        isOpenElective: false,
        isCatalogFallback: true
    }))
);

/**
 * Returns MBA subjects enriched with standard Non-Functional Electives and Functional Specialisations
 * only for display/export when those sections have not yet been added in the database, preserving
 * all existing DB subjects without mutation.
 */
export const withMbaDefaultElectivesIfMissing = (subjects) => {
    if (!Array.isArray(subjects) || subjects.length === 0) return subjects || [];

    const hasNfeOptions = subjects.some(s => isMbaNfeSubject(s) && !isMbaNfePlaceholder(s));
    const hasSem1 = subjects.some(s => Number(s?.semester || 1) === 1 && !s?.vertical && !s?.isOpenElective);
    const hasPecTracks = subjects.some(s => Boolean(s?.vertical) || (s?.verticalName && s.verticalName.trim() !== ''));

    if ((hasNfeOptions || !hasSem1) && hasPecTracks) {
        return subjects;
    }

    const existingCodes = new Set(subjects.map(s => String(s?.code || '').trim().toUpperCase()).filter(Boolean));
    const additions = [];

    if (!hasNfeOptions && hasSem1) {
        MBA_DEFAULT_NFE_OPTIONS.forEach(opt => {
            if (!existingCodes.has(opt.code)) additions.push(opt);
        });
    }
    if (!hasPecTracks) {
        MBA_DEFAULT_PEC_SPECIALISATIONS.forEach(pec => {
            if (!existingCodes.has(pec.code)) additions.push(pec);
        });
    }

    return additions.length > 0 ? [...subjects, ...additions] : subjects;
};

/**
 * Sorts MBA subjects by course code while placing Semester I NFE placeholder
 * (e.g., P26BANXX) at slot 7 before P26BA108.
 */
export const sortMbaCourses = (subjects) => {
    const getSortKey = (s) => {
        const codeU = String(s?.code || '').trim().toUpperCase();
        if (codeU.endsWith('NXX') && isMbaNfePlaceholder(s)) {
            return codeU.replace(/NXX$/, '107');
        }
        return codeU;
    };

    if (!Array.isArray(subjects)) return [];
    return [...subjects].map((s, idx) => ({
        s,
        idx,
        key: getSortKey(s)
    })).sort((a, b) => {
        const cmp = a.key.localeCompare(b.key, undefined, { numeric: true, sensitivity: 'base' });
        return cmp !== 0 ? cmp : (a.idx - b.idx);
    }).map(item => item.s);
};

/**
 * Groups MBA semester subjects without dropping PRACTICAL EEC courses (Seminars/Labs/Capstone)
 * or keeping selectable NFE options mixed inside Semester I's main table.
 */
export const classifyMbaSemesterCourses = (subjectsForSem) => {
    const ordered = sortMbaCourses(subjectsForSem);
    const clean = ordered.filter(s => {
        if (!s || !s.code) return false;
        const c = (s.code || '').trim().toUpperCase();
        const t = (s.title || '').trim().toUpperCase();
        return !c.startsWith('TOTAL') && !c.includes('TOTAL') && !t.startsWith('TOTAL') && !t.includes('TOTAL CREDITS') && !t.includes('TOTAL PERIODS');
    });

    const nfePlaceholders = clean.filter(s => isMbaNfePlaceholder(s));
    const nfeOptions = clean.filter(s => isMbaNfeSubject(s) && !isMbaNfePlaceholder(s));

    const languageElective1 = clean.filter(s => {
        const c = (s.category || '').toUpperCase();
        return c.includes('LANGUAGE ELECTIVE – I') || c.includes('LANGUAGE ELECTIVE - I') || c.includes('LANGUAGE ELECTIVE I');
    });
    const languageElective2 = clean.filter(s => {
        const c = (s.category || '').toUpperCase();
        return c.includes('LANGUAGE ELECTIVE – II') || c.includes('LANGUAGE ELECTIVE - II') || c.includes('LANGUAGE ELECTIVE II');
    });
    const mandatoryCourses = clean.filter(s => !isMbaNfeSubject(s) && ((s.category || '').toUpperCase().includes('MANDATORY') || (s.categoryType || '').toUpperCase() === 'MC'));

    const excludedFromMain = new Set([...nfeOptions, ...languageElective1, ...languageElective2, ...mandatoryCourses]);
    const mainCandidates = clean.filter(s => !excludedFromMain.has(s));

    const theoryCumPracticalCourses = mainCandidates.filter(s => {
        const c = (s.category || '').toUpperCase();
        return c.includes('THEORY') && c.includes('PRACTICAL');
    });
    // Identify Internship & Project Work (and explicit EMPLOYABILITY courses) before PRACTICAL fallback
    // even when DB records store Project Work under category "PRACTICAL" + categoryType "EEC".
    const employabilityCourses = mainCandidates.filter(s => {
        if (theoryCumPracticalCourses.includes(s)) return false;
        const c = (s.category || '').toUpperCase();
        const t = (s.categoryType || '').toUpperCase();
        const titleU = (s.title || '').toUpperCase();
        const isProjOrIntern = titleU.includes('INTERNSHIP') || titleU.includes('PROJECT WORK');
        return isProjOrIntern || c.includes('EMPLOYABILITY') || (!c.includes('PRACTICAL') && !c.includes('LAB') && !c.includes('THEORY') && t === 'EEC');
    });
    const practicalCourses = mainCandidates.filter(s => {
        if (theoryCumPracticalCourses.includes(s) || employabilityCourses.includes(s)) return false;
        const c = (s.category || '').toUpperCase();
        return c === 'PRACTICAL' || c.includes('PRACTICAL') || c.includes('LAB');
    });
    const theoryCourses = mainCandidates.filter(s => {
        if (theoryCumPracticalCourses.includes(s) || practicalCourses.includes(s) || employabilityCourses.includes(s)) return false;
        const c = (s.category || '').toUpperCase();
        return (
            isMbaNfePlaceholder(s) ||
            c === 'THEORY' ||
            c.includes('THEORY') ||
            c.includes('PROFESSIONAL ELECTIVE') ||
            c.includes('CORE') ||
            ['PCC', 'PEC', 'IPR', 'NFE'].includes((s.categoryType || '').toUpperCase())
        );
    });

    const accountedMain = new Set([...theoryCourses, ...theoryCumPracticalCourses, ...employabilityCourses, ...practicalCourses]);
    const otherCourses = mainCandidates.filter(s => !accountedMain.has(s));

    const regularCoursesForTotal = [...mainCandidates];
    if (nfePlaceholders.length === 0 && nfeOptions.length > 0) {
        regularCoursesForTotal.push(nfeOptions[0]);
    }

    return {
        clean,
        nfePlaceholders,
        nfeOptions,
        languageElective1,
        languageElective2,
        mandatoryCourses,
        theoryCourses,
        theoryCumPracticalCourses,
        employabilityCourses,
        practicalCourses,
        otherCourses,
        regularCoursesForTotal
    };
};

export const getMbaSemesterNoteHTML = (semNum) => {
    const sem = Number(semNum);
    if (sem === 3) {
        return `<p style="font-family: Arial, sans-serif; font-size: 8.5pt; line-height: 1.35; text-align: justify; margin: 4px 0 8px 0;">Internship &ndash; minimum of 4 weeks of internship. The report along with the company certificate should be submitted of around 40 pages. The report should be sent to the Controller of Examinations by the HOD through the Principal, before the last working day of the 3<sup>rd</sup> Semester.</p>`;
    }
    if (sem === 4) {
        return `<p style="font-family: Arial, sans-serif; font-size: 8.5pt; line-height: 1.35; text-align: justify; margin: 4px 0 8px 0;"><strong>Note :</strong> Students should select the Project Topic for their Project work only based on the selected area from two functional specialization.</p>`;
    }
    return '';
};

const renderMbaCourseRowHTML = (s, sNo) => {
    const titleUpper = (s.title || '').toUpperCase();
    const codeUpper = (s.code || '').toUpperCase();
    const isInduction = titleUpper.includes('INDUCTION') || codeUpper.includes('INDUCTION');
    const isInternship = titleUpper.includes('INTERNSHIP') && Number(s.l || 0) === 0 && Number(s.t || 0) === 0;
    const categoryCode = s.categoryType || classifyMbaSubjectCategory(s);

    if (isInduction) {
        return `
            <tr>
                <td class="center">${sNo}</td>
                <td class="center" style="font-family: monospace; font-weight: bold; white-space: nowrap;">${codeUpper}</td>
                <td style="line-height: 1.25;">${s.title}</td>
                <td class="center" style="font-family: Arial, sans-serif; white-space: nowrap;">${categoryCode || 'MC'}</td>
                <td class="center" colspan="4" style="font-weight: bold; font-family: Arial, sans-serif; font-size: 8.5pt;">2 Weeks</td>
                <td class="center" style="font-weight: bold;">0</td>
                <td class="center">-</td>
                <td class="center">-</td>
                <td class="center">-</td>
            </tr>
        `;
    }

    const cp = (s.contactPeriods !== undefined && s.contactPeriods !== '')
        ? s.contactPeriods
        : (Number(s.l || 0) + Number(s.t || 0) + Number(s.p || 0));

    return `
        <tr>
            <td class="center">${sNo}</td>
            <td class="center" style="font-family: monospace; font-weight: bold; white-space: nowrap;">${codeUpper}</td>
            <td style="line-height: 1.25;">${s.title}</td>
            <td class="center" style="font-family: Arial, sans-serif; white-space: nowrap;">${categoryCode}</td>
            ${isInternship
                ? `<td class="center" colspan="4" style="font-weight: bold; font-family: Arial, sans-serif;">4 Weeks</td>`
                : `<td class="center" style="white-space: nowrap;">${s.l ?? 0}</td>
                   <td class="center" style="white-space: nowrap;">${s.t ?? 0}</td>
                   <td class="center" style="white-space: nowrap;">${s.p ?? 0}</td>
                   <td class="center" style="white-space: nowrap;">${cp}</td>`
            }
            <td class="center" style="font-weight: bold; white-space: nowrap;">${s.credits ?? 0}</td>
            <td class="center" style="white-space: nowrap;">${s.cia !== undefined ? s.cia : 40}</td>
            <td class="center" style="white-space: nowrap;">${s.ese !== undefined ? s.ese : 60}</td>
            <td class="center" style="white-space: nowrap; font-weight: bold;">${s.total !== undefined ? s.total : 100}</td>
        </tr>
    `;
};

const MBA_HEAD_ARGS = {
    includeSno: true,
    includeCategory: true,
    titleLabel: 'Course Title',
    periodsLabel: 'Periods per Week',
    creditLabel: 'Credits'
};

export const buildMbaSemesterSectionHTML = ({ semNum, subjectsForSem, getRomanNumeral, sortSubjectsByCode }) => {
    const grouped = classifyMbaSemesterCourses(subjectsForSem, sortSubjectsByCode);
    if (grouped.clean.length === 0) return '';

    const {
        nfeOptions,
        mandatoryCourses,
        theoryCourses,
        theoryCumPracticalCourses,
        employabilityCourses,
        practicalCourses,
        otherCourses,
        regularCoursesForTotal
    } = grouped;

    const semTotalL = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.l) || 0), 0);
    const semTotalT = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.t) || 0), 0);
    const semTotalP = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.p) || 0), 0);
    const semTotalContactPeriods = regularCoursesForTotal.reduce((sum, s) => {
        const cp = (s.contactPeriods !== undefined && s.contactPeriods !== '')
            ? Number(s.contactPeriods)
            : (Number(s.l || 0) + Number(s.t || 0) + Number(s.p || 0));
        return sum + (Number.isNaN(cp) ? 0 : cp);
    }, 0);
    const semTotalCredits = regularCoursesForTotal.reduce((sum, s) => sum + (Number(s.credits) || 0), 0);

    let sNoCounter = 0;
    const renderNumberedGroup = (list) => list.map(s => renderMbaCourseRowHTML(s, ++sNoCounter)).join('');

    const isSingleProjectSemIV = Number(semNum) === 4 && employabilityCourses.length === 1 && theoryCourses.length === 0 && practicalCourses.length === 0 && theoryCumPracticalCourses.length === 0 && mandatoryCourses.length === 0 && otherCourses.length === 0;

    return `
        <div class="semester-block" style="margin-bottom: 12px; page-break-inside: auto;">
            <h3 style="font-size: 9.5pt; font-weight: bold; text-align: center; margin: 6px 0 4px 0; font-family: Arial, sans-serif;">
                SEMESTER ${getRomanNumeral(semNum)}
            </h3>

            <table class="curriculum-table">
                ${CURRICULUM_12_COLGROUP}
                <thead>
                    ${buildCurriculumTableHeadRows(MBA_HEAD_ARGS)}
                </thead>
                <tbody>
                    ${theoryCourses.length > 0 ? `
                        <tr class="category-row">
                            <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">THEORY COURSES</td>
                        </tr>
                        ${renderNumberedGroup(theoryCourses)}
                    ` : ''}

                    ${theoryCumPracticalCourses.length > 0 ? `
                        <tr class="category-row">
                            <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">THEORY CUM PRACTICAL COURSES</td>
                        </tr>
                        ${renderNumberedGroup(theoryCumPracticalCourses)}
                    ` : ''}

                    ${employabilityCourses.length > 0 ? `
                        ${isSingleProjectSemIV ? '' : `
                        <tr class="category-row">
                            <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">EMPLOYABILITY ENHANCEMENT COURSE</td>
                        </tr>`}
                        ${renderNumberedGroup(employabilityCourses)}
                    ` : ''}

                    ${practicalCourses.length > 0 ? `
                        <tr class="category-row">
                            <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">PRACTICAL COURSES</td>
                        </tr>
                        ${renderNumberedGroup(practicalCourses)}
                    ` : ''}

                    ${mandatoryCourses.length > 0 ? `
                        <tr class="category-row">
                            <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">MANDATORY COURSES</td>
                        </tr>
                        ${renderNumberedGroup(mandatoryCourses)}
                    ` : ''}

                    ${otherCourses.length > 0 ? `
                        <tr class="category-row">
                            <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; background: rgba(0,0,0,0.04);">OTHER COURSES</td>
                        </tr>
                        ${renderNumberedGroup(otherCourses)}
                    ` : ''}

                    ${isSingleProjectSemIV ? '' : `
                        <tr style="font-weight: bold; background: rgba(0,0,0,0.02); border-top: 1.5px solid #000;">
                            <td colSpan="4" style="text-align: center; font-weight: bold; font-family: Arial, sans-serif;">TOTAL</td>
                            <td class="center" style="font-weight: bold;">${semTotalL}</td>
                            <td class="center" style="font-weight: bold;">${semTotalT}</td>
                            <td class="center" style="font-weight: bold;">${semTotalP}</td>
                            <td class="center" style="font-weight: bold;">${semTotalContactPeriods}</td>
                            <td class="center" style="font-weight: bold;">${semTotalCredits}</td>
                            <td colSpan="3"></td>
                        </tr>
                    `}
                </tbody>
            </table>

            ${getMbaSemesterNoteHTML(semNum)}

            ${nfeOptions.length > 0 ? `
                <div class="lang-elective-block" style="margin-top: 8px; page-break-inside: avoid;">
                    <h4 style="font-size: 9pt; font-weight: bold; text-align: center; margin: 4px 0; font-family: Arial, sans-serif; text-transform: uppercase;">
                        NON-FUNCTIONAL ELECTIVE (NFE)
                    </h4>
                    <table class="curriculum-table" style="margin-top: 2px; margin-bottom: 4px;">
                        ${CURRICULUM_12_COLGROUP}
                        <thead>
                            ${buildCurriculumTableHeadRows(MBA_HEAD_ARGS)}
                        </thead>
                        <tbody>
                            ${nfeOptions.map((s, idx) => renderMbaCourseRowHTML(s, idx + 1)).join('')}
                        </tbody>
                    </table>
                    <p style="font-family: Arial, sans-serif; font-size: 8.5pt; margin: 3px 0 8px 0;">
                        <strong>Note:</strong> In the First Semester students need to choose one elective from Non-Functional Stream
                    </p>
                </div>
            ` : ''}
        </div>
    `;
};

export const buildMbaPecSectionHTML = ({ sortedVerticals, verticalsGrouped, sortSubjectsByCode, getRomanNumeral }) => {
    return `
        <div style="margin-top: 10px;">
            <h3 style="font-size: 10.5pt; font-weight: bold; text-align: center; margin: 0 0 2px 0; font-family: Arial, sans-serif; text-transform: uppercase;">
                PROFESSIONAL ELECTIVE COURSES (PEC)
            </h3>
            <h4 style="font-size: 10pt; font-weight: bold; text-align: center; margin: 0 0 8px 0; font-family: Arial, sans-serif; text-transform: uppercase;">
                FUNCTIONAL SPECIALISATIONS
            </h4>
            <p style="font-family: Arial, sans-serif; font-size: 8.5pt; margin: 0 0 4px 0;">
                Students can take 3+3 elective courses from each specialisation
            </p>

            <table class="curriculum-table">
                ${CURRICULUM_12_COLGROUP}
                <thead>
                    ${buildCurriculumTableHeadRows(MBA_HEAD_ARGS)}
                </thead>
                <tbody>
                    ${sortedVerticals.map(vertNum => {
                        const subjectsForVert = sortSubjectsByCode(verticalsGrouped[vertNum] || []);
                        const verticalName = subjectsForVert.find(s => s.verticalName)?.verticalName || `Specialisation ${getRomanNumeral(vertNum)}`;
                        return `
                            <tr class="category-row" style="background-color: rgba(0, 0, 0, 0.04);">
                                <td colSpan="12" style="font-family: Arial, sans-serif; font-size: 8.5pt; font-weight: bold; text-align: center; padding: 5px;">
                                    Stream/ Specialization: ${verticalName}
                                </td>
                            </tr>
                            ${subjectsForVert.map((s, idx) => renderMbaCourseRowHTML(s, idx + 1)).join('')}
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
};

const MBA_PIE_PALETTE = {
    'PCC': '#1e3a8a',
    'PEC': '#64748b',
    'EEC': '#334155',
    'NFE': '#475569',
    'HUM': '#ef4444',
    'BSC': '#3b82f6',
    'ESC': '#10b981',
    'OEC': '#ec4899',
    'IPR': '#84cc16'
};

/**
 * Computes MBA 4-semester (I-IV) credit distribution without double-counting
 * NFE stream options or Functional Specialization pools when Sem I/III placeholders exist.
 */
export const computeMbaCreditDistribution = (rawSubjects) => {
    const subjects = (rawSubjects || []).filter(s =>
        s && s.code && !s.code.toUpperCase().startsWith('TOTAL') && !s.code.toUpperCase().includes('TOTAL') && !s.title?.toUpperCase().startsWith('TOTAL')
    );

    const hasSemesterPEC = subjects.some(s => !s.vertical && !s.isOpenElective && classifyMbaSubjectCategory(s) === 'PEC');

    const regularBySem = {};
    const validSubjects = [];

    subjects.forEach(subj => {
        if (subj.vertical) {
            // Avoid double-counting the specialization pool when Sem III already holds PEC placeholder slots
            if (!hasSemesterPEC) {
                validSubjects.push(subj);
            }
            return;
        }
        if (subj.isOpenElective) {
            validSubjects.push(subj);
            return;
        }
        const sem = Math.min(Math.max(Number(subj.semester) || 1, 1), 4);
        if (!regularBySem[sem]) regularBySem[sem] = [];
        regularBySem[sem].push(subj);
    });

    Object.values(regularBySem).forEach(semSubjs => {
        const nfeSubjects = semSubjs.filter(s => isMbaNfeSubject(s));
        const hasPlaceholder = nfeSubjects.some(s => isMbaNfePlaceholder(s));
        const excluded = new Set();

        if (hasPlaceholder) {
            nfeSubjects.filter(s => !isMbaNfePlaceholder(s)).forEach(s => excluded.add(s));
        } else if (nfeSubjects.length > 1) {
            nfeSubjects.slice(1).forEach(s => excluded.add(s));
        }

        semSubjs.forEach(s => {
            if (!excluded.has(s)) validSubjects.push(s);
        });
    });

    const allPossibleCats = ['PCC', 'PEC', 'EEC', 'NFE', 'HUM', 'BSC', 'ESC', 'OEC', 'MC', 'IPR'];
    const distribution = {};
    allPossibleCats.forEach(cat => { distribution[cat] = [0, 0, 0, 0]; });

    validSubjects.forEach(subj => {
        const cat = classifyMbaSubjectCategory(subj);
        let credits = 0;
        if (typeof subj.credits === 'number') {
            credits = subj.credits;
        } else if (typeof subj.credits === 'string') {
            const parts = subj.credits.split('-');
            const last = Number(parts[parts.length - 1]);
            if (!Number.isNaN(last)) credits = last;
        }

        let sem = Number(subj.semester);
        if (!sem && subj.code) {
            const match = subj.code.match(/^[A-Za-z]+(\d)/);
            if (match) sem = Number(match[1]);
        }
        if (!sem || sem < 1 || sem > 4) {
            sem = subj.vertical ? 3 : 1;
        }
        distribution[cat][sem - 1] += credits;
    });

    const rowTotals = {};
    let grandTotal = 0;
    allPossibleCats.forEach(cat => {
        const total = distribution[cat].reduce((sum, val) => sum + val, 0);
        rowTotals[cat] = total;
        if (cat !== 'MC') grandTotal += total;
    });

    const baseCategories = ['PCC', 'PEC', 'EEC', 'NFE'];
    const extraNonZero = ['HUM', 'BSC', 'ESC', 'OEC', 'MC', 'IPR'].filter(cat => rowTotals[cat] > 0);
    const categories = [...baseCategories, ...extraNonZero];

    const semTotals = [0, 1, 2, 3].map(semIdx =>
        categories.reduce((sum, cat) => (cat !== 'MC' ? sum + distribution[cat][semIdx] : sum), 0)
    );

    let startAngle = 0;
    const slices = [];
    categories.filter(c => c !== 'MC').forEach(cat => {
        const value = rowTotals[cat];
        if (value <= 0 || grandTotal <= 0) return;

        const percentage = (value / grandTotal) * 100;
        const angle = (value / grandTotal) * 360;
        const endAngle = startAngle + angle;
        const midAngle = (startAngle + endAngle) / 2;

        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        const midRad = (midAngle - 90) * Math.PI / 180;

        const R = 38;
        const x1 = 50 + R * Math.cos(startRad);
        const y1 = 50 + R * Math.sin(startRad);
        const x2 = 50 + R * Math.cos(endRad);
        const y2 = 50 + R * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;
        const d = `M 50 50 L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        const labelRadius = angle < 25 ? 27 : 22;
        const labelX = 50 + labelRadius * Math.cos(midRad);
        const labelY = 50 + labelRadius * Math.sin(midRad);

        startAngle = endAngle;
        slices.push({
            cat,
            d,
            color: MBA_PIE_PALETTE[cat] || '#64748b',
            percentage: Math.round(percentage),
            value,
            labelX,
            labelY
        });
    });

    return { categories, distribution, rowTotals, semTotals, grandTotal, slices };
};

export const buildMbaCreditDistributionHTML = ({
    rawSubjects,
    pageNum,
    bosMeetingDate,
    acMeetingDate,
    degreePrefix,
    deptName,
    regYear,
    formatDeptHeaderTitle
}) => {
    const { categories, distribution, rowTotals, semTotals, grandTotal, slices } = computeMbaCreditDistribution(rawSubjects);

    const svgPieChartHTML = grandTotal > 0 ? `
        <div class="pie-chart-block" style="margin-top: 22px; page-break-inside: avoid; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 14px;">
                <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase;">MBA &ndash; ${(deptName || 'MASTER OF BUSINESS ADMINISTRATION').toUpperCase()}</div>
                <div style="font-size: 9pt; margin-top: 2px;">Distribution by Subject Area (Total Credits = ${grandTotal})</div>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 36px;">
                <svg width="170" height="170" viewBox="0 0 100 100" style="display: block;">
                    ${slices.map(slice => `
                        <path d="${slice.d}" fill="${slice.color}" stroke="#ffffff" stroke-width="0.6" />
                    `).join('')}
                    ${slices.map(slice => (slice.percentage >= 3 ? `
                        <text x="${slice.labelX}" y="${slice.labelY}" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-size="6" font-weight="bold" font-family="Arial, sans-serif" style="paint-order: stroke; stroke: rgba(0,0,0,0.45); stroke-width: 0.8px;">${slice.percentage}%</text>
                    ` : '')).join('')}
                </svg>
                <div style="display: flex; flex-direction: column; gap: 7px;">
                    ${slices.map(slice => `
                        <div style="display: flex; align-items: center; gap: 8px; font-size: 9pt;">
                            <span style="width: 10px; height: 10px; background: ${slice.color}; border: 1px solid #000; border-radius: 1px; display: inline-block; flex-shrink: 0;"></span>
                            <span>${slice.cat} (${slice.value} Credits)</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    ` : '';

    return `
        <div class="page">
            <div class="pdf-header pdf-header-inner">
                <div class="left-col">EASA College of Engineering and Technology</div>
                <div class="right-col">${formatDeptHeaderTitle(degreePrefix, deptName, regYear || 'R-2026')}</div>
            </div>

            <div class="title-block" style="margin-top: 8px; margin-bottom: 12px; text-align: center;">
                <h1 style="font-size: 11.5pt; text-align: center; font-family: Arial, sans-serif; font-weight: bold; margin: 0 0 8px 0;">CURRICULUM CREDIT SUMMARY</h1>
                <div style="font-size: 10.5pt; font-weight: bold; font-family: Arial, sans-serif; text-transform: uppercase;">
                    MBA - ${(deptName || 'MASTER OF BUSINESS ADMINISTRATION').toUpperCase()}
                </div>
            </div>

            <table class="curriculum-table" style="width: 100%;">
                <colgroup>
                    <col style="width: 10%;" />
                    <col style="width: 24%;" />
                    <col style="width: 11.5%;" />
                    <col style="width: 11.5%;" />
                    <col style="width: 11.5%;" />
                    <col style="width: 11.5%;" />
                    <col style="width: 20%;" />
                </colgroup>
                <thead>
                    <tr>
                        <th rowSpan="2" style="font-size: 9pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Sl. No</th>
                        <th rowSpan="2" style="font-size: 9pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Subject Area</th>
                        <th colSpan="4" style="font-size: 9pt; font-family: Arial, sans-serif; text-align: center; padding: 4px;">Credits per Semester</th>
                        <th rowSpan="2" style="font-size: 9pt; font-family: Arial, sans-serif; text-align: center; vertical-align: middle;">Total Credits</th>
                    </tr>
                    <tr>
                        ${['I', 'II', 'III', 'IV'].map(num => `<th style="font-size: 8.5pt; font-family: Arial, sans-serif; padding: 3px; text-align: center;">${num}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${categories.map((cat, idx) => {
                        const isMC = cat === 'MC';
                        const total = rowTotals[cat];
                        return `
                            <tr>
                                <td class="center" style="font-family: Arial, sans-serif; padding: 5px;">${idx + 1}</td>
                                <td class="center" style="font-family: Arial, sans-serif; font-weight: bold; padding: 5px;">${cat}</td>
                                ${distribution[cat].map(val => `<td class="center" style="padding: 5px;">${val}</td>`).join('')}
                                <td class="center" style="font-weight: bold; font-family: Arial, sans-serif; padding: 5px;">${isMC ? 'No Credits' : total}</td>
                            </tr>
                        `;
                    }).join('')}
                    <tr style="font-weight: bold; background-color: rgba(0, 0, 0, 0.02);">
                        <td colSpan="2" class="center" style="font-family: Arial, sans-serif; font-weight: bold; padding: 5px;">Total</td>
                        ${semTotals.map(total => `<td class="center" style="font-weight: bold; padding: 5px;">${total}</td>`).join('')}
                        <td class="center" style="font-family: Arial, sans-serif; font-weight: bold; padding: 5px;">${grandTotal}</td>
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
