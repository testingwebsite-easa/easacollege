const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');

// Assuming Schemas is imported where DepartmentData is exported
const { DepartmentData } = require('../models/Schemas');
const { getDepartmentDetails } = require('../controllers/departmentController');
const { parseSyllabusWordDoc } = require('../services/syllabusParser');
const { parseSyllabusExcelDoc } = require('../services/excelSyllabusParser');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

// Middleware for auth
const { verifyToken } = require('./auth');

function sanitizeCoPoMapping(coPoMapping, outcomes, poCount = 11, psoCount = 3) {
    const normKey = (str) => String(str || '').replace(/\s+/g, '').toUpperCase();
    const existingValuesMap = new Map();

    if (Array.isArray(coPoMapping)) {
        coPoMapping.forEach((row, idx) => {
            if (!row || typeof row !== 'object') return;
            const key = normKey(row.coNo) || `CO${idx + 1}`;
            const existing = existingValuesMap.get(key) || {};
            const merged = { ...existing, ...row, coNo: row.coNo || `CO ${idx + 1}` };
            const maxPo = Math.max(poCount || 11, 11);
            for (let i = 1; i <= maxPo; i++) {
                const k = `po${i}`;
                const val = (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') ? String(row[k]).trim() : '-';
                const exVal = existing[k] !== undefined ? String(existing[k]).trim() : '-';
                merged[k] = (val !== '-' && val !== '') ? val : exVal;
            }
            const maxPso = Math.max(psoCount || 3, 3);
            for (let i = 1; i <= maxPso; i++) {
                const k = `pso${i}`;
                const val = (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') ? String(row[k]).trim() : '-';
                const exVal = existing[k] !== undefined ? String(existing[k]).trim() : '-';
                merged[k] = (val !== '-' && val !== '') ? val : exVal;
            }
            existingValuesMap.set(key, merged);
        });
    }

    let targetCos = [];
    if (Array.isArray(outcomes) && outcomes.length > 0) {
        targetCos = outcomes
            .filter(co => co && (typeof co === 'string' || (co.outcome && co.outcome.trim() !== '') || co.coNo))
            .map((co, idx) => {
                const raw = typeof co === 'object' ? (co.coNo || `CO ${idx + 1}`) : `CO ${idx + 1}`;
                return String(raw).trim();
            });
    }

    if (targetCos.length === 0) {
        if (existingValuesMap.size > 0) {
            targetCos = Array.from(existingValuesMap.values()).map((r, idx) => r.coNo || `CO ${idx + 1}`);
        } else {
            targetCos = ['CO 1', 'CO 2', 'CO 3', 'CO 4', 'CO 5'];
        }
    }

    const seen = new Set();
    const uniqueTargetCos = [];
    targetCos.forEach((co, idx) => {
        const key = normKey(co) || `CO${idx + 1}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueTargetCos.push(co);
        }
    });

    const effectivePoCount = poCount || 11;
    const effectivePsoCount = psoCount || 3;
    return uniqueTargetCos.map((coLabel, idx) => {
        const key = normKey(coLabel) || `CO${idx + 1}`;
        const found = existingValuesMap.get(key) || (Array.isArray(coPoMapping) && coPoMapping[idx] ? coPoMapping[idx] : {});
        const mapObj = { coNo: coLabel };
        for (let i = 1; i <= effectivePoCount; i++) {
            const k = `po${i}`;
            const val = found && found[k] !== undefined && found[k] !== null ? String(found[k]).trim() : '-';
            mapObj[k] = val || '-';
        }
        for (let i = 1; i <= effectivePsoCount; i++) {
            const k = `pso${i}`;
            const val = found && found[k] !== undefined && found[k] !== null ? String(found[k]).trim() : '-';
            mapObj[k] = val || '-';
        }
        return mapObj;
    });
}

// POST /api/departments/scan-syllabus-word - Scan and parse Word (.docx) syllabus files
router.post('/scan-syllabus-word', upload.single('file'), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'Please upload a valid Word document (.docx)' });
        }
        const fileName = (req.file.originalname || '').toLowerCase();
        let result;
        if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
            result = await parseSyllabusExcelDoc(req.file.buffer);
        } else {
            result = await parseSyllabusWordDoc(req.file.buffer);
        }
        if (!result.success) {
            return res.status(422).json({ error: result.error || 'Failed to parse syllabus document' });
        }
        res.json(result);
    } catch (err) {
        console.error('Word syllabus scan error:', err);
        res.status(500).json({ error: 'Server error while processing Word document: ' + err.message });
    }
});

// POST /api/departments/scan-syllabus-excel - Scan and parse Excel (.xlsx, .xls, .csv) syllabus files
router.post('/scan-syllabus-excel', upload.single('file'), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'Please upload a valid Excel spreadsheet (.xlsx, .xls, .csv)' });
        }
        const result = await parseSyllabusExcelDoc(req.file.buffer);
        if (!result.success) {
            return res.status(422).json({ error: result.error || 'Failed to parse Excel spreadsheet' });
        }
        res.json(result);
    } catch (err) {
        console.error('Excel syllabus scan error:', err);
        res.status(500).json({ error: 'Server error while processing Excel file: ' + err.message });
    }
});

// GET /api/departments/all/master-courses - Aggregated shared course bank across all departments
router.get('/all/master-courses', async (req, res) => {
    try {
        const allDeptData = await DepartmentData.find({}, 'departmentSlug subjects');
        const courseMap = new Map();

        allDeptData.forEach(dept => {
            if (Array.isArray(dept.subjects)) {
                dept.subjects.forEach(subj => {
                    if (subj && subj.code) {
                        const codeKey = String(subj.code).trim().toUpperCase();
                        if (codeKey) {
                            const subjObj = subj.toObject ? subj.toObject() : subj;
                            const creatorDept = subjObj.creatorDept || dept.departmentSlug;
                            const existing = courseMap.get(codeKey);
                            // If not existing or existing has fewer details (e.g. no units) or this dept is the true creator, store or update
                            if (!existing || (!existing.units?.length && subjObj.units?.length) || (subjObj.creatorDept && subjObj.creatorDept === dept.departmentSlug)) {
                                courseMap.set(codeKey, {
                                    ...subjObj,
                                    creatorDept: creatorDept,
                                    sourceDept: creatorDept,
                                    sourceDeptName: creatorDept?.replace(/-/g, ' ').toUpperCase()
                                });
                            }
                        }
                    }
                });
            }
        });

        const courses = Array.from(courseMap.values()).sort((a, b) => (a.code || '').localeCompare(b.code || ''));
        res.json(courses);
    } catch (err) {
        console.error('Error fetching master courses:', err);
        res.status(500).json({ error: 'Failed to fetch master courses: ' + err.message });
    }
});

// GET department data by slug
router.get('/:slug', async (req, res) => {
    try {
        const data = await DepartmentData.findOne({ departmentSlug: req.params.slug });
        if (!data) {
            return res.json({ mission: [], vision: [], peo: [], pso: [], po: [] });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const getDeptSlug = (userDeptName) => {
    if (!userDeptName) return '';
    const lower = userDeptName.toLowerCase().trim();

    // Direct matches
    if (lower === 'computer-science-and-engineering' || lower === 'computer science and engineering') return 'computer-science-and-engineering';
    if (lower === 'electronics-and-communication-engineering' || lower === 'electronics and communication engineering') return 'electronics-and-communication-engineering';
    if (lower === 'mechanical-engineering' || lower === 'mechanical engineering') return 'mechanical-engineering';
    if (lower === 'electrical-and-electronics-engineering' || lower === 'electrical and electronics engineering') return 'electrical-and-electronics-engineering';
    if (lower === 'me-computer-science-and-engineering' || lower === 'me computer science and engineering') return 'me-computer-science-and-engineering';
    if (lower === 'master-of-business-administration' || lower === 'master of business administration') return 'master-of-business-administration';
    if (lower === 'artificial-intelligence-and-machine-learning' || lower === 'artificial intelligence and machine learning' || lower === 'ai & ml' || lower === 'ai ml' || lower === 'aiml') return 'artificial-intelligence-and-machine-learning';
    if (lower === 'artificial-intelligence-and-data-science' || lower === 'artificial intelligence and data science' || lower === 'aids' || lower === 'ai & ds' || lower === 'ai ds') return 'artificial-intelligence-and-data-science';
    if (lower === 'computer-science-and-engineering-cyber-security' || lower === 'computer science and engineering cyber security' || lower === 'cyber security') return 'computer-science-and-engineering-cyber-security';
    if (lower === 'biomedical-engineering' || lower === 'biomedical engineering' || lower === 'biomedical') return 'biomedical-engineering';
    if (lower === 'information-technology' || lower === 'information technology') return 'information-technology';
    if (lower === 'agriculture-engineering' || lower === 'agriculture engineering') return 'agriculture-engineering';
    if (lower === 'construction-engineering-and-management' || lower === 'construction engineering and management') return 'construction-engineering-and-management';
    if (lower === 'communication-systems' || lower === 'communication systems') return 'communication-systems';
    if (lower === 'manufacturing-engineering' || lower === 'manufacturing engineering') return 'manufacturing-engineering';
    if (lower === 'power-electronics-and-drives' || lower === 'power electronics and drives') return 'power-electronics-and-drives';
    if (lower === 'structural-engineering' || lower === 'structural engineering') return 'structural-engineering';
    if (lower === 'science-and-humanities' || lower === 'science and humanities' || lower === 'sciences and humanities' || lower === 'school of science and humanities' || lower === 's&h' || lower === 'sh') return 'science-and-humanities';

    // Abbreviations
    if (lower === 'cse') return 'computer-science-and-engineering';
    if (lower === 'eee') return 'electrical-and-electronics-engineering';
    if (lower === 'ece') return 'electronics-and-communication-engineering';
    if (lower === 'it') return 'information-technology';
    if (lower === 'bme') return 'biomedical-engineering';
    if (lower === 'mech') return 'mechanical-engineering';
    if (lower === 'agri') return 'agriculture-engineering';
    if (lower === 'mba') return 'master-of-business-administration';
    if (lower === 'sh' || lower === 's&h' || lower === 's and h') return 'science-and-humanities';
    if (lower === 'ped') return 'power-electronics-and-drives';
    if (lower === 'cem') return 'construction-engineering-and-management';
    if (lower === 'mfg') return 'manufacturing-engineering';

    // Substring contains
    if (lower.includes('science') && lower.includes('humanities')) return 'science-and-humanities';
    if (lower.includes('humanities') || lower.includes('s&h') || lower === 'sh') return 'science-and-humanities';
    if (lower.includes('data science') || lower.includes('aids')) return 'artificial-intelligence-and-data-science';
    if (lower.includes('machine learning') || lower.includes('ai-ml')) return 'artificial-intelligence-and-machine-learning';
    if (lower.includes('cyber')) return 'computer-science-and-engineering-cyber-security';
    if (lower.includes('construction')) return 'construction-engineering-and-management';
    if (lower.includes('communication sys')) return 'communication-systems';
    if (lower.includes('power electronics') || lower.includes('drives')) return 'power-electronics-and-drives';
    if (lower.includes('manufacturing')) return 'manufacturing-engineering';
    if (lower.includes('structural')) return 'structural-engineering';
    if (lower.includes('computer') || lower.includes('cse')) return 'computer-science-and-engineering';
    if (lower.includes('electrical') || lower.includes('eee')) return 'electrical-and-electronics-engineering';
    if (lower.includes('electronics') || lower.includes('ece')) return 'electronics-and-communication-engineering';
    if (lower.includes('info') || lower.includes('it')) return 'information-technology';
    if (lower.includes('biomedical') || lower.includes('bme')) return 'biomedical-engineering';
    if (lower.includes('mechanical') || lower.includes('mech')) return 'mechanical-engineering';
    if (lower.includes('agriculture') || lower.includes('agri')) return 'agriculture-engineering';
    if (lower.includes('management') || lower.includes('mba') || lower.includes('business')) return 'master-of-business-administration';

    return lower;
};

// PUT / Update department data (Secured with Inter-Department Ownership & Lock)
router.put('/:slug', verifyToken, async (req, res) => {
    try {
        const { mission, vision, peo, pso, po, subjects, bosMeetingDate, acMeetingDate, regulation } = req.body;
        const targetSlug = getDeptSlug(req.params.slug) || req.params.slug;

        // Resolve user & effective role (case-insensitive & check both token and DB)
        const { User } = require('../models/Schemas');
        const userId = req.user?.userId || req.user?.id || req.user?._id;
        let dbUser = null;
        if (userId) {
            try {
                dbUser = await User.findById(userId);
            } catch (e) {
                console.error('Error fetching dbUser in PUT /departments/:slug:', e);
            }
        }

        const tokenRole = (req.user?.role || '').toLowerCase().trim();
        const dbRole = (dbUser?.role || '').toLowerCase().trim();
        const isSuperOrAdmin = tokenRole === 'admin' || tokenRole === 'superadmin' || dbRole === 'admin' || dbRole === 'superadmin' || dbUser?.username === 'admin';

        if (!isSuperOrAdmin) {
            if (tokenRole === 'hod' || dbRole === 'hod') {
                const userDept = dbUser?.department || req.user?.department;
                const allowedSlug = getDeptSlug(userDept);
                if (!allowedSlug || (allowedSlug !== targetSlug && allowedSlug !== req.params.slug)) {
                    return res.status(403).json({ error: 'You are only authorized to manage your own department: ' + (userDept || 'Assigned Department') });
                }
            } else {
                return res.status(403).json({ error: 'Unauthorized to update department curriculum' });
            }
        }

        // Fetch all department data to look up existing master courses and their creator departments
        const allDepts = await DepartmentData.find({}, 'departmentSlug subjects');
        const masterCourseMap = new Map();

        allDepts.forEach(d => {
            if (Array.isArray(d.subjects)) {
                d.subjects.forEach(s => {
                    if (s && s.code) {
                        const codeKey = String(s.code).trim().toUpperCase();
                        if (codeKey) {
                            const sObj = s.toObject ? s.toObject() : s;
                            const creator = sObj.creatorDept || d.departmentSlug;
                            if (!masterCourseMap.has(codeKey) || sObj.creatorDept === d.departmentSlug || (!masterCourseMap.get(codeKey).units?.length && sObj.units?.length)) {
                                masterCourseMap.set(codeKey, {
                                    ...sObj,
                                    creatorDept: creator
                                });
                            }
                        }
                    }
                });
            }
        });

        // Process incoming subjects: enforce creatorDept and prevent non-creator departments from overwriting shared course details
        const processedSubjects = (Array.isArray(subjects) ? subjects : []).map(subj => {
            if (!subj || !subj.code) return subj;
            const codeKey = String(subj.code).trim().toUpperCase();
            const existingMaster = masterCourseMap.get(codeKey);

            let creatorDept = subj.creatorDept;
            if (!creatorDept) {
                if (existingMaster && existingMaster.creatorDept) {
                    creatorDept = existingMaster.creatorDept;
                } else {
                    creatorDept = targetSlug;
                }
            }

            // If this course is owned by another department and the user is NOT super admin, preserve original master content
            if (creatorDept !== targetSlug && !isSuperOrAdmin && existingMaster) {
                return {
                    ...subj,
                    code: codeKey,
                    creatorDept: creatorDept,
                    // Preserve master course details from creator department
                    title: existingMaster.title || subj.title,
                    l: existingMaster.l !== undefined ? existingMaster.l : subj.l,
                    t: existingMaster.t !== undefined ? existingMaster.t : subj.t,
                    p: existingMaster.p !== undefined ? existingMaster.p : subj.p,
                    contactPeriods: existingMaster.contactPeriods !== undefined ? existingMaster.contactPeriods : subj.contactPeriods,
                    credits: existingMaster.credits !== undefined ? existingMaster.credits : subj.credits,
                    cia: existingMaster.cia !== undefined ? existingMaster.cia : subj.cia,
                    ese: existingMaster.ese !== undefined ? existingMaster.ese : subj.ese,
                    total: existingMaster.total !== undefined ? existingMaster.total : subj.total,
                    subtitle: existingMaster.subtitle || subj.subtitle,
                    categoryName: existingMaster.categoryName || subj.categoryName,
                    prerequisites: existingMaster.prerequisites || subj.prerequisites,
                    objectives: (Array.isArray(existingMaster.objectives) && existingMaster.objectives.length > 0) ? existingMaster.objectives : (subj.objectives || []),
                    outcomes: (Array.isArray(existingMaster.outcomes) && existingMaster.outcomes.length > 0) ? existingMaster.outcomes : (subj.outcomes || []),
                    units: (Array.isArray(existingMaster.units) && existingMaster.units.length > 0) ? existingMaster.units : (subj.units || []),
                    textbooks: (Array.isArray(existingMaster.textbooks) && existingMaster.textbooks.length > 0) ? existingMaster.textbooks : (subj.textbooks || []),
                    references: (Array.isArray(existingMaster.references) && existingMaster.references.length > 0) ? existingMaster.references : (subj.references || []),
                    webReferences: (Array.isArray(existingMaster.webReferences) && existingMaster.webReferences.length > 0) ? existingMaster.webReferences : (subj.webReferences || []),
                    experiments: (Array.isArray(existingMaster.experiments) && existingMaster.experiments.length > 0) ? existingMaster.experiments : (subj.experiments || []),
                    coPoMapping: sanitizeCoPoMapping(
                        (Array.isArray(existingMaster.coPoMapping) && existingMaster.coPoMapping.length > 0) ? existingMaster.coPoMapping : (subj.coPoMapping || []),
                        (Array.isArray(existingMaster.outcomes) && existingMaster.outcomes.length > 0) ? existingMaster.outcomes : (subj.outcomes || []),
                        po?.length || 11,
                        pso?.length || 3
                    )
                };
            }

            return {
                ...subj,
                code: codeKey,
                creatorDept: creatorDept,
                coPoMapping: sanitizeCoPoMapping(
                    subj.coPoMapping,
                    subj.outcomes,
                    po?.length || 11,
                    pso?.length || 3
                )
            };
        });

        // Find and update, or create if it doesn't exist
        const updatedData = await DepartmentData.findOneAndUpdate(
            { departmentSlug: req.params.slug },
            {
                mission: mission || [],
                vision: vision || [],
                peo: peo || [],
                pso: pso || [],
                po: po || [],
                subjects: processedSubjects,
                bosMeetingDate: bosMeetingDate || "29.10.2024",
                acMeetingDate: acMeetingDate || "25.11.2024",
                regulation: regulation || "R-2023"
            },
            { new: true, upsert: true }
        );

        res.json(updatedData);
    } catch (err) {
        console.error('Error in PUT /api/departments/:slug:', err);
        res.status(500).json({ error: 'Server error while updating: ' + err.message });
    }
});

// New endpoint for credit distribution details
router.get('/:slug/details', getDepartmentDetails);

module.exports = router;
