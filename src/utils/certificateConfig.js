import { departments as staticDepartments } from '../data/departmentsData';

export const CERTIFICATE_STATUSES = [
    'Pending',
    'Processing',
    'Ready for Collection',
    'Collected'
];

export const STATUS_STYLE_MAP = {
    'Pending': { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' },
    'Processing': { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' },
    'Ready for Collection': { bg: '#dcfce7', color: '#166534', border: '#86efac' },
    'Collected': { bg: '#f1f5f9', color: '#334155', border: '#cbd5e1' }
};

export const DEFAULT_CERTIFICATE_DOCUMENTS = [
    { label: 'Provisional Certificate', description: 'Provisional degree completion certificate', isActive: true },
    { label: 'Consolidated Mark Statement', description: 'Combined marksheet covering all semesters', isActive: true },
    { label: 'Semester Mark Statements', description: 'Individual semester-wise grade sheets', isActive: true },
    { label: 'Original Degree Certificate', description: 'University convocation degree certificate', isActive: true },
    { label: 'Transfer Certificate (TC)', description: 'Official institutional transfer certificate', isActive: true },
    { label: 'Conduct / Character Certificate', description: 'Student conduct and character verification', isActive: true },
    { label: 'Course Completion Certificate', description: 'Certification of academic program completion', isActive: true },
    { label: 'Bonafide Certificate', description: 'Bonafide student or alumni status certificate', isActive: true },
    { label: 'Migration Certificate', description: 'University migration certificate for higher studies', isActive: true },
    { label: 'Official Transcripts', description: 'Sealed academic transcripts for overseas or higher education', isActive: true }
];

export const getBatchYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = 2008; y <= currentYear; y++) {
        years.push(String(y));
    }
    return years;
};

export const getPassingOutYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = 2010; y <= currentYear + 1; y++) {
        years.push(String(y));
    }
    return years;
};

const CANONICAL_UG_ALIASES = {
    'artificial intelligence & machine learning': 'CSE - Artificial Intelligence & Machine Learning',
    'artificial intelligence and machine learning': 'CSE - Artificial Intelligence & Machine Learning',
    'cse - artificial intelligence & machine learning': 'CSE - Artificial Intelligence & Machine Learning',
    'cse (cyber security)': 'CSE - Cyber Security',
    'cse - cyber security': 'CSE - Cyber Security',
    'agricultural engineering': 'Agriculture Engineering',
    'agriculture engineering': 'Agriculture Engineering',
    'petrolium engineering': 'Petroleum Engineering',
    'petroleum engineering': 'Petroleum Engineering'
};

const formatDeptOptionLabel = (dept) => {
    const rawName = String(dept?.name || dept || '').trim();
    if (!rawName) return '';
    const type = String(dept?.type || '').toUpperCase();
    const degree = String(dept?.degree || '').trim();
    const lower = rawName.toLowerCase();

    if (type === 'PHD' || type === 'RESEARCH' || lower.startsWith('ph.d')) {
        if (lower.startsWith('ph.d')) return rawName;
        return `Ph.D. ${rawName}`;
    }

    if (type === 'PG' || degree.toUpperCase() === 'M.E.' || degree.toUpperCase() === 'MBA') {
        if (lower.includes('master of business') || lower === 'mba' || degree.toUpperCase() === 'MBA') {
            return 'Master of Business Administration (MBA)';
        }
        const cleaned = rawName.replace(/^m\.?e\.?\s+/i, '').trim();
        return `M.E. ${cleaned}`;
    }

    if (CANONICAL_UG_ALIASES[lower]) {
        return CANONICAL_UG_ALIASES[lower];
    }

    return rawName;
};

const getDedupeKey = (category, label) => {
    const stripped = label
        .toLowerCase()
        .replace(/^m\.?e\.?\s+/i, '')
        .replace(/^b\.?(e|tech)\.?\s+/i, '')
        .replace(/^ph\.?d\.?\s+/i, '')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]/g, '');
    return `${category}:${stripped}`;
};

export const buildDepartmentOptions = (apiDepartments = []) => {
    const source = Array.isArray(apiDepartments) && apiDepartments.length > 0
        ? apiDepartments
        : [];

    const ugMap = new Map();
    const pgMap = new Map();
    const phdMap = new Map();

    // Process staticDepartments first so canonical names take precedence, then merge any extra DB departments
    [...staticDepartments, ...source].forEach(dept => {
        if (!dept || !dept.name) return;
        const type = String(dept.type || '').toUpperCase();
        const slug = String(dept.slug || dept.id || '').toLowerCase();
        const rawLower = String(dept.name).toLowerCase();

        // Exclude first-year common Science & Humanities from graduating certificate list
        if (slug === 'science-and-humanities') return;

        const isPhd = type === 'PHD' || type === 'RESEARCH' || rawLower.startsWith('ph.d') || slug.startsWith('phd-');
        const isPg = !isPhd && (
            type === 'PG' ||
            rawLower.startsWith('m.e.') ||
            rawLower.includes('mba') ||
            rawLower.includes('master of business') ||
            slug.startsWith('me-') ||
            slug.includes('mba') ||
            slug === 'manufacturing' ||
            slug === 'structural' ||
            slug === 'construction-mgmt' ||
            slug === 'communication-systems' ||
            slug === 'ped'
        );

        const normalizedDept = isPhd
            ? { ...dept, type: 'PHD' }
            : isPg
                ? { ...dept, type: 'PG' }
                : { ...dept, type: 'UG' };

        const label = formatDeptOptionLabel(normalizedDept);
        if (!label) return;

        if (isPhd) {
            const key = getDedupeKey('PHD', label);
            if (!phdMap.has(key)) phdMap.set(key, label);
        } else if (isPg) {
            const key = getDedupeKey('PG', label);
            if (!pgMap.has(key)) pgMap.set(key, label);
        } else {
            const key = getDedupeKey('UG', label);
            if (!ugMap.has(key)) ugMap.set(key, label);
        }
    });

    // Ensure Civil Engineering (alumni 2008+) and Petroleum Engineering are present in UG
    [
        'Civil Engineering',
        'Petroleum Engineering'
    ].forEach(extraUg => {
        const key = getDedupeKey('UG', extraUg);
        if (!ugMap.has(key)) ugMap.set(key, extraUg);
    });

    // Ensure Ph.D. Mechanical Engineering is present in Doctoral / Research
    const phdMech = 'Ph.D. Mechanical Engineering';
    const phdKey = getDedupeKey('PHD', phdMech);
    if (!phdMap.has(phdKey)) phdMap.set(phdKey, phdMech);

    const ug = Array.from(ugMap.values()).sort((a, b) => a.localeCompare(b));
    const pg = Array.from(pgMap.values()).sort((a, b) => a.localeCompare(b));
    const phd = Array.from(phdMap.values()).sort((a, b) => a.localeCompare(b));

    return {
        ug,
        pg,
        phd,
        all: [...ug, ...pg, ...phd]
    };
};

export const isValidPhoneNumber = (raw) => {
    const str = String(raw || '').trim();
    const hasPlus = str.startsWith('+');
    const digits = str.replace(/\D/g, '');
    if (!digits) return false;
    if (/^(\d)\1+$/.test(digits)) return false;

    if (!hasPlus && digits.length === 10) {
        return /^[6-9]\d{9}$/.test(digits);
    }
    if (digits.length === 12 && digits.startsWith('91')) {
        return /^[6-9]\d{9}$/.test(digits.slice(2));
    }
    if (hasPlus && digits.length >= 8 && digits.length <= 15) {
        return true;
    }
    return false;
};

export const validateCertificateForm = (formData) => {
    const errors = {};
    const currentYear = new Date().getFullYear();

    const dateVal = String(formData.dateOfApplication || '').trim();
    if (!dateVal) {
        errors.dateOfApplication = 'Please select the date of application.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateVal) || Number.isNaN(Date.parse(dateVal))) {
        errors.dateOfApplication = 'Please enter a valid application date.';
    }

    const regNo = String(formData.registrationNumber || '').trim();
    if (!regNo) {
        errors.registrationNumber = 'Registration number is required.';
    } else if (!/^[A-Za-z0-9/-]{4,30}$/.test(regNo)) {
        errors.registrationNumber = 'Enter a valid registration number (4-30 alphanumeric characters).';
    }

    const studentName = String(formData.studentName || '').trim();
    if (!studentName) {
        errors.studentName = 'Student name is required.';
    } else if (studentName.length < 2) {
        errors.studentName = 'Student name must be at least 2 characters.';
    }

    if (!String(formData.department || '').trim()) {
        errors.department = 'Please select your department.';
    }

    const batchVal = String(formData.batch || '').trim();
    if (!batchVal) {
        errors.batch = 'Please select your admission batch.';
    } else if (Number(batchVal) < 2008 || Number(batchVal) > currentYear) {
        errors.batch = `Batch must be between 2008 and ${currentYear}.`;
    }

    const phoneVal = String(formData.contactNumber || '').trim();
    if (!phoneVal) {
        errors.contactNumber = 'Contact number is required.';
    } else if (!isValidPhoneNumber(phoneVal)) {
        errors.contactNumber = 'Enter a valid 10-digit mobile number (e.g. 9876543210 or +919876543210).';
    }

    const emailVal = String(formData.email || '').trim();
    if (!emailVal) {
        errors.email = 'Email ID is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        errors.email = 'Enter a valid Email ID (e.g. student@example.com).';
    }

    const fatherName = String(formData.fatherName || '').trim();
    if (!fatherName) {
        errors.fatherName = "Father's name is required.";
    } else if (fatherName.length < 2) {
        errors.fatherName = "Father's name must be at least 2 characters.";
    }

    const passVal = String(formData.passingOutYear || '').trim();
    if (!passVal) {
        errors.passingOutYear = 'Please select your year of passing out.';
    } else if (batchVal && Number(passVal) < Number(batchVal)) {
        errors.passingOutYear = 'Year of passing out cannot be earlier than your Batch year.';
    }

    if (!Array.isArray(formData.requiredDocuments) || formData.requiredDocuments.length === 0) {
        errors.requiredDocuments = 'Please select at least one required document.';
    }

    const addr = String(formData.address || '').trim();
    if (!addr) {
        errors.address = 'Communication address is required.';
    } else if (addr.length < 10) {
        errors.address = 'Please provide a complete address (minimum 10 characters).';
    }

    return errors;
};