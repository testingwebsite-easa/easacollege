const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const { CertificateApplication, CertificateDocumentOption } = require('../models/Schemas');
const { verifyToken } = require('./auth');
const { sendEmail } = require('../config/email');

const ALLOWED_STATUSES = ['Pending', 'Processing', 'Ready for Collection', 'Collected'];

const DEFAULT_DOCUMENT_OPTIONS = [
    { label: 'Provisional Certificate', description: 'Provisional degree completion certificate', order: 1, isActive: true },
    { label: 'Consolidated Mark Statement', description: 'Combined marksheet covering all semesters', order: 2, isActive: true },
    { label: 'Semester Mark Statements', description: 'Individual semester-wise grade sheets', order: 3, isActive: true },
    { label: 'Original Degree Certificate', description: 'University convocation degree certificate', order: 4, isActive: true },
    { label: 'Transfer Certificate (TC)', description: 'Official institutional transfer certificate', order: 5, isActive: true },
    { label: 'Conduct / Character Certificate', description: 'Student conduct and character verification', order: 6, isActive: true },
    { label: 'Course Completion Certificate', description: 'Certification of academic program completion', order: 7, isActive: true },
    { label: 'Bonafide Certificate', description: 'Bonafide student or alumni status certificate', order: 8, isActive: true },
    { label: 'Migration Certificate', description: 'University migration certificate for higher studies', order: 9, isActive: true },
    { label: 'Official Transcripts', description: 'Sealed academic transcripts for overseas or higher education', order: 10, isActive: true }
];

const requireDb = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ success: false, error: 'Database not connected' });
    }
    next();
};

const requireAdmin = (req, res, next) => {
    const role = String(req.user?.role || '').toLowerCase().trim();
    if (!['admin', 'superadmin', 'coe'].includes(role)) {
        return res.status(403).json({ success: false, error: 'Unauthorized: Admin access required' });
    }
    next();
};

const ensureDefaultDocumentOptions = async () => {
    const count = await CertificateDocumentOption.countDocuments();
    if (count === 0) {
        await CertificateDocumentOption.insertMany(DEFAULT_DOCUMENT_OPTIONS, { ordered: false }).catch(() => {});
    }
};

const normalizePhone = (raw) => {
    const str = String(raw || '').trim();
    const hasPlus = str.startsWith('+');
    const digits = str.replace(/\D/g, '');
    return { raw: str, digits, hasPlus };
};

const isValidPhone = (raw) => {
    const { digits, hasPlus } = normalizePhone(raw);
    if (!digits) return false;
    // Reject all-same digits (e.g. 0000000000 or 9999999999)
    if (/^(\d)\1+$/.test(digits)) return false;

    // Standard 10-digit Indian mobile number
    if (!hasPlus && digits.length === 10) {
        return /^[6-9]\d{9}$/.test(digits);
    }
    // Indian number with 91 prefix
    if (digits.length === 12 && digits.startsWith('91')) {
        return /^[6-9]\d{9}$/.test(digits.slice(2));
    }
    // International format with + prefix (8 to 15 digits)
    if (hasPlus && digits.length >= 8 && digits.length <= 15) {
        return true;
    }
    return false;
};

const escapeRegex = (str) => String(str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const validatePayload = (body, isPartialUpdate = false) => {
    const errors = {};
    const currentYear = new Date().getFullYear();

    if (!isPartialUpdate || body.dateOfApplication !== undefined) {
        const d = String(body.dateOfApplication || '').trim();
        if (!d) {
            errors.dateOfApplication = 'Date of application is required';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || Number.isNaN(Date.parse(d))) {
            errors.dateOfApplication = 'Invalid date format (expected YYYY-MM-DD)';
        }
    }

    if (!isPartialUpdate || body.registrationNumber !== undefined) {
        const reg = String(body.registrationNumber || '').trim();
        if (!reg) {
            errors.registrationNumber = 'Registration number is required';
        } else if (!/^[A-Za-z0-9/-]{4,30}$/.test(reg)) {
            errors.registrationNumber = 'Registration number must be 4-30 alphanumeric characters';
        }
    }

    if (!isPartialUpdate || body.studentName !== undefined) {
        const name = String(body.studentName || '').trim();
        if (!name) {
            errors.studentName = 'Student name is required';
        } else if (name.length < 2 || name.length > 120) {
            errors.studentName = 'Student name must be between 2 and 120 characters';
        }
    }

    if (!isPartialUpdate || body.department !== undefined) {
        const dept = String(body.department || '').trim();
        if (!dept) {
            errors.department = 'Department is required';
        }
    }

    if (!isPartialUpdate || body.batch !== undefined) {
        const batchStr = String(body.batch || '').trim();
        const batchNum = Number(batchStr);
        if (!batchStr) {
            errors.batch = 'Batch is required';
        } else if (!Number.isInteger(batchNum) || batchNum < 2008 || batchNum > currentYear + 1) {
            errors.batch = `Batch year must be between 2008 and ${currentYear + 1}`;
        }
    }

    if (!isPartialUpdate || body.contactNumber !== undefined) {
        const phone = String(body.contactNumber || '').trim();
        if (!phone) {
            errors.contactNumber = 'Contact number is required';
        } else if (!isValidPhone(phone)) {
            errors.contactNumber = 'Enter a valid 10-digit mobile number or international format (e.g. +919876543210)';
        }
    }

    if (!isPartialUpdate || body.email !== undefined) {
        const email = String(body.email || '').trim();
        if (!email) {
            errors.email = 'Email ID is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Enter a valid Email ID';
        }
    }

    if (!isPartialUpdate || body.fatherName !== undefined) {
        const father = String(body.fatherName || '').trim();
        if (!father) {
            errors.fatherName = "Father's name is required";
        } else if (father.length < 2 || father.length > 120) {
            errors.fatherName = "Father's name must be between 2 and 120 characters";
        }
    }

    if (!isPartialUpdate || body.passingOutYear !== undefined) {
        const passStr = String(body.passingOutYear || '').trim();
        const passNum = Number(passStr);
        if (!passStr) {
            errors.passingOutYear = 'Year of passing out is required';
        } else if (!Number.isInteger(passNum) || passNum < 2010 || passNum > currentYear + 5) {
            errors.passingOutYear = `Year of passing out must be between 2010 and ${currentYear + 5}`;
        } else if (body.batch !== undefined && !errors.batch && passNum < Number(body.batch)) {
            errors.passingOutYear = 'Year of passing out cannot be earlier than Batch year';
        }
    }

    if (!isPartialUpdate || body.requiredDocuments !== undefined) {
        const docs = Array.isArray(body.requiredDocuments)
            ? body.requiredDocuments.map(d => String(d || '').trim()).filter(Boolean)
            : [];
        if (docs.length === 0) {
            errors.requiredDocuments = 'Select at least one required document';
        }
    }

    if (!isPartialUpdate || body.address !== undefined) {
        const addr = String(body.address || '').trim();
        if (!addr) {
            errors.address = 'Communication address is required';
        } else if (addr.length < 10) {
            errors.address = 'Please enter a complete communication address (at least 10 characters)';
        }
    }

    if (body.status !== undefined && !ALLOWED_STATUSES.includes(body.status)) {
        errors.status = `Status must be one of: ${ALLOWED_STATUSES.join(', ')}`;
    }

    return errors;
};

// =========================================================================
// PUBLIC: Get configurable document options
// =========================================================================
router.get('/options', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(DEFAULT_DOCUMENT_OPTIONS);
        }
        await ensureDefaultDocumentOptions();

        const includeAll = req.query.all === 'true';
        const filter = includeAll ? {} : { isActive: true };
        const options = await CertificateDocumentOption.find(filter).sort({ order: 1, label: 1 }).lean();
        res.json(options);
    } catch (err) {
        console.error('Error fetching certificate document options:', err);
        res.json(DEFAULT_DOCUMENT_OPTIONS);
    }
});

// =========================================================================
// ADMIN: Manage configurable document options
// =========================================================================
router.post('/options', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        const label = String(req.body.label || '').trim();
        const description = String(req.body.description || '').trim();
        const isActive = req.body.isActive !== undefined ? Boolean(req.body.isActive) : true;
        const order = Number.isFinite(Number(req.body.order)) ? Number(req.body.order) : 99;

        if (!label) {
            return res.status(400).json({ success: false, error: 'Document option label is required' });
        }

        const existing = await CertificateDocumentOption.findOne({
            label: { $regex: new RegExp(`^${escapeRegex(label)}$`, 'i') }
        });
        if (existing) {
            return res.status(409).json({ success: false, error: 'A document option with this name already exists' });
        }

        const option = await CertificateDocumentOption.create({ label, description, isActive, order });
        res.status(201).json({ success: true, option });
    } catch (err) {
        console.error('Error creating certificate document option:', err);
        res.status(500).json({ success: false, error: 'Failed to create document option' });
    }
});

router.put('/options/:id', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        const updates = {};
        if (req.body.label !== undefined) {
            const label = String(req.body.label).trim();
            if (!label) return res.status(400).json({ success: false, error: 'Label cannot be empty' });
            updates.label = label;
        }
        if (req.body.description !== undefined) updates.description = String(req.body.description).trim();
        if (req.body.isActive !== undefined) updates.isActive = Boolean(req.body.isActive);
        if (req.body.order !== undefined && Number.isFinite(Number(req.body.order))) {
            updates.order = Number(req.body.order);
        }

        const option = await CertificateDocumentOption.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!option) {
            return res.status(404).json({ success: false, error: 'Document option not found' });
        }
        res.json({ success: true, option });
    } catch (err) {
        console.error('Error updating certificate document option:', err);
        res.status(500).json({ success: false, error: 'Failed to update document option' });
    }
});

router.delete('/options/:id', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        const deleted = await CertificateDocumentOption.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Document option not found' });
        }
        res.json({ success: true, message: 'Document option deleted' });
    } catch (err) {
        console.error('Error deleting certificate document option:', err);
        res.status(500).json({ success: false, error: 'Failed to delete document option' });
    }
});

// =========================================================================
// PUBLIC: Submit Certificate Collection Application
// =========================================================================
router.post('/', requireDb, async (req, res) => {
    try {
        const errors = validatePayload(req.body, false);
        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            return res.status(400).json({
                success: false,
                error: firstError,
                errors
            });
        }

        const normalizedRegNo = String(req.body.registrationNumber).trim().toUpperCase();
        const normalizedDocs = Array.from(
            new Set(req.body.requiredDocuments.map(d => String(d).trim()).filter(Boolean))
        );

        // Normalize phone formatting cleanly
        const { digits, hasPlus } = normalizePhone(req.body.contactNumber);
        const cleanContact = hasPlus ? `+${digits}` : (digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits);

        // Duplicate submission protection
        const existingApplications = await CertificateApplication.find({
            registrationNumber: normalizedRegNo
        }).sort({ createdAt: -1 }).lean();

        const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
        for (const existing of existingApplications) {
            const existingDocs = Array.isArray(existing.requiredDocuments) ? existing.requiredDocuments : [];
            const overlappingDocs = normalizedDocs.filter(doc => existingDocs.includes(doc));
            const isRecentDoubleSubmit = existing.createdAt && new Date(existing.createdAt).getTime() > twoMinutesAgo;
            const isExactSameDocs =
                existingDocs.length === normalizedDocs.length &&
                overlappingDocs.length === normalizedDocs.length;

            if (existing.status !== 'Collected' && overlappingDocs.length > 0) {
                return res.status(409).json({
                    success: false,
                    error: `An active request (${existing.applicationId}, Status: ${existing.status}) already exists for Registration Number ${normalizedRegNo} covering: ${overlappingDocs.join(', ')}.`,
                    duplicateApplicationId: existing.applicationId,
                    existingStatus: existing.status
                });
            }

            if (isRecentDoubleSubmit || (isExactSameDocs && existing.dateOfApplication === String(req.body.dateOfApplication).trim())) {
                return res.status(409).json({
                    success: false,
                    error: `Duplicate submission detected. Application ${existing.applicationId} was already recorded for Registration Number ${normalizedRegNo}.`,
                    duplicateApplicationId: existing.applicationId,
                    existingStatus: existing.status
                });
            }
        }

        // Always stamp current application date (IST) on new public submissions
        const currentDateStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        // Use unique Form ID displayed on the form if valid and unclaimed, otherwise generate a fresh unique ID
        let applicationId = '';
        const candidateId = String(req.body.applicationId || '').trim().toUpperCase();
        if (/^ECET-CERT-[A-Z0-9]{6,12}$/.test(candidateId)) {
            const idTaken = await CertificateApplication.findOne({ applicationId: candidateId }).lean();
            if (!idTaken) {
                applicationId = candidateId;
            }
        }
        if (!applicationId) {
            const randomCode = crypto.randomInt(100000, 999999);
            applicationId = `ECET-CERT-${randomCode}`;
        }
        const submittedAt = new Date();

        const newApplication = await CertificateApplication.create({
            applicationId,
            dateOfApplication: currentDateStr,
            registrationNumber: normalizedRegNo,
            studentName: String(req.body.studentName).trim(),
            department: String(req.body.department).trim(),
            batch: String(req.body.batch).trim(),
            contactNumber: cleanContact,
            email: String(req.body.email).trim().toLowerCase(),
            fatherName: String(req.body.fatherName).trim(),
            passingOutYear: String(req.body.passingOutYear).trim(),
            requiredDocuments: normalizedDocs,
            address: String(req.body.address).trim(),
            status: 'Pending',
            submittedAt
        });

        // Fire-and-forget admin notification email if SMTP is configured
        if (typeof sendEmail === 'function' && process.env.SMTP_USER && process.env.SMTP_PASS) {
            (async () => {
                try {
                    await sendEmail({
                        to: process.env.SMTP_TO || 'enquiry@ecetonline.com',
                        subject: `[${applicationId}] New Certificate Collection Request - ${newApplication.registrationNumber}`,
                        html: `
                            <h2>New Certificate Collection Request</h2>
                            <p><strong>Application ID:</strong> ${applicationId}</p>
                            <p><strong>Date of Application:</strong> ${newApplication.dateOfApplication}</p>
                            <p><strong>Registration Number:</strong> ${newApplication.registrationNumber}</p>
                            <p><strong>Student Name:</strong> ${newApplication.studentName}</p>
                            <p><strong>Father's Name:</strong> ${newApplication.fatherName}</p>
                            <p><strong>Department:</strong> ${newApplication.department}</p>
                            <p><strong>Batch:</strong> ${newApplication.batch} | <strong>Passing Out Year:</strong> ${newApplication.passingOutYear}</p>
                            <p><strong>Contact Number:</strong> ${newApplication.contactNumber}</p>
                            <p><strong>Email ID:</strong> ${newApplication.email}</p>
                            <p><strong>Required Documents:</strong> ${newApplication.requiredDocuments.join(', ')}</p>
                            <p><strong>Address:</strong> ${newApplication.address}</p>
                        `
                    });
                    await sendEmail({
                        to: newApplication.email,
                        subject: `Certificate Collection Request Received [${applicationId}] - EASA College COE`,
                        html: `
                            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                                <h2 style="color: #1B2A6B;">Certificate Collection Request Acknowledged</h2>
                                <p>Dear ${newApplication.studentName},</p>
                                <p>Your certificate collection application has been received by the Office of the Controller of Examinations (C.O.E).</p>
                                <p><strong>Reference ID:</strong> ${applicationId}</p>
                                <p><strong>Registration Number:</strong> ${newApplication.registrationNumber}</p>
                                <p><strong>Required Documents:</strong> ${newApplication.requiredDocuments.join(', ')}</p>
                                <p><strong>Status:</strong> Pending</p>
                                <p>Regards,<br/><strong>Controller of Examinations<br/>EASA College of Engineering and Technology</strong></p>
                            </div>
                        `
                    });
                } catch (mailErr) {
                    console.warn('[Certificate] Admin email notification skipped:', mailErr.message);
                }
            })();
        }

        res.status(201).json({
            success: true,
            message: 'Certificate collection application submitted successfully.',
            applicationId: newApplication.applicationId,
            application: newApplication
        });
    } catch (err) {
        if (err?.code === 11000) {
            return res.status(409).json({
                success: false,
                error: 'Duplicate submission conflict. Please try again.'
            });
        }
        console.error('Error submitting certificate application:', err);
        res.status(500).json({ success: false, error: 'Failed to submit certificate application' });
    }
});

// Helper to build Mongo filter from query params
const buildSearchFilter = (queryParams) => {
    const filter = {};
    const { search, department, batch, passingOutYear, status } = queryParams;

    if (search && String(search).trim()) {
        const regex = new RegExp(escapeRegex(String(search).trim()), 'i');
        filter.$or = [
            { registrationNumber: regex },
            { studentName: regex },
            { applicationId: regex },
            { contactNumber: regex },
            { email: regex }
        ];
    }
    if (department && department !== 'all') {
        filter.department = department;
    }
    if (batch && batch !== 'all') {
        filter.batch = batch;
    }
    if (passingOutYear && passingOutYear !== 'all') {
        filter.passingOutYear = passingOutYear;
    }
    if (status && status !== 'all') {
        filter.status = status;
    }
    return filter;
};

// =========================================================================
// ADMIN: Export Certificate Applications to CSV
// =========================================================================
router.get('/export', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        const filter = buildSearchFilter(req.query);
        const applications = await CertificateApplication.find(filter).sort({ createdAt: -1 }).lean();

        const headers = [
            'Application ID',
            'Date of Application',
            'Registration Number',
            'Student Name',
            "Father's Name",
            'Department',
            'Batch',
            'Passing Out Year',
            'Contact Number',
            'Email ID',
            'Required Documents',
            'Address',
            'Status',
            'Admin Remarks',
            'Submitted Timestamp'
        ];

        const escapeCsvCell = (val) => {
            const str = String(val === null || val === undefined ? '' : val).replace(/"/g, '""');
            return `"${str}"`;
        };

        const rows = applications.map(app => [
            app.applicationId || '',
            app.dateOfApplication || '',
            app.registrationNumber || '',
            app.studentName || '',
            app.fatherName || '',
            app.department || '',
            app.batch || '',
            app.passingOutYear || '',
            app.contactNumber || '',
            app.email || '',
            Array.isArray(app.requiredDocuments) ? app.requiredDocuments.join('; ') : '',
            app.address || '',
            app.status || 'Pending',
            app.adminRemarks || '',
            app.submittedAt ? new Date(app.submittedAt).toISOString() : (app.createdAt ? new Date(app.createdAt).toISOString() : '')
        ].map(escapeCsvCell).join(','));

        const csvString = headers.map(escapeCsvCell).join(',') + '\n' + rows.join('\n');

        res.header('Content-Type', 'text/csv; charset=utf-8');
        res.attachment(`certificate_collection_${new Date().toISOString().slice(0, 10)}.csv`);
        res.send(csvString);
    } catch (err) {
        console.error('Error exporting certificate applications:', err);
        res.status(500).json({ success: false, error: 'Failed to export certificate applications' });
    }
});

// =========================================================================
// PUBLIC: Track Certificate Collection Status by Form ID or Registration No
// (Redacts sensitive PII such as address, phone, email, and fatherName)
// =========================================================================
const handleTrackCertificate = async (req, res) => {
    try {
        const rawQuery = String(req.params.query || req.query.q || '').trim().toUpperCase();
        if (!rawQuery || rawQuery.length < 4) {
            return res.status(400).json({
                success: false,
                error: 'Enter a valid Unique Form ID or Registration Number (at least 4 characters)'
            });
        }

        const safeProjection = 'applicationId registrationNumber studentName department batch passingOutYear dateOfApplication requiredDocuments status adminRemarks statusUpdatedAt submittedAt createdAt';

        const records = await CertificateApplication.find({
            $or: [
                { applicationId: rawQuery },
                { registrationNumber: rawQuery }
            ]
        })
            .select(safeProjection)
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            records
        });
    } catch (err) {
        console.error('Error tracking certificate status:', err);
        res.status(500).json({ success: false, error: 'Failed to track certificate status' });
    }
};

router.get('/track', requireDb, handleTrackCertificate);
router.get('/track/:query', requireDb, handleTrackCertificate);

// =========================================================================
// ADMIN: List & Filter Certificate Applications
// =========================================================================
router.get('/', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        const filter = buildSearchFilter(req.query);
        const applications = await CertificateApplication.find(filter).sort({ createdAt: -1 }).lean();
        res.json(applications);
    } catch (err) {
        console.error('Error fetching certificate applications:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch certificate applications' });
    }
});

// =========================================================================
// ADMIN: Get Single Certificate Application
// =========================================================================
router.get('/:id', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, error: 'Invalid application ID' });
        }
        const application = await CertificateApplication.findById(req.params.id).lean();
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        res.json(application);
    } catch (err) {
        console.error('Error fetching certificate application:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch application' });
    }
});

// =========================================================================
// ADMIN: Update / Edit Certificate Application or Status
// =========================================================================
const handleUpdateApplication = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, error: 'Invalid application ID' });
        }

        const existing = await CertificateApplication.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }

        const isStatusOnly =
            Object.keys(req.body).every(k => ['status', 'adminRemarks'].includes(k));

        const validationPayload = {
            ...existing.toObject(),
            ...req.body
        };
        const errors = validatePayload(validationPayload, isStatusOnly);
        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            return res.status(400).json({ success: false, error: firstError, errors });
        }

        const allowedEditableFields = [
            'dateOfApplication',
            'registrationNumber',
            'studentName',
            'department',
            'batch',
            'contactNumber',
            'email',
            'fatherName',
            'passingOutYear',
            'requiredDocuments',
            'address',
            'status',
            'adminRemarks'
        ];

        const updateData = {};
        for (const field of allowedEditableFields) {
            if (req.body[field] !== undefined) {
                if (field === 'registrationNumber') {
                    updateData[field] = String(req.body[field]).trim().toUpperCase();
                } else if (field === 'email') {
                    updateData[field] = String(req.body[field]).trim().toLowerCase();
                } else if (field === 'requiredDocuments') {
                    updateData[field] = Array.from(
                        new Set(req.body[field].map(d => String(d).trim()).filter(Boolean))
                    );
                } else if (field === 'contactNumber') {
                    const { digits, hasPlus } = normalizePhone(req.body[field]);
                    updateData[field] = hasPlus ? `+${digits}` : (digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits);
                } else if (typeof req.body[field] === 'string') {
                    updateData[field] = req.body[field].trim();
                } else {
                    updateData[field] = req.body[field];
                }
            }
        }

        if (updateData.status && updateData.status !== existing.status) {
            updateData.statusUpdatedAt = new Date();
        }

        const updated = await CertificateApplication.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({ success: true, application: updated });
    } catch (err) {
        console.error('Error updating certificate application:', err);
        res.status(500).json({ success: false, error: 'Failed to update certificate application' });
    }
};

router.put('/:id', requireDb, verifyToken, requireAdmin, handleUpdateApplication);
router.patch('/:id', requireDb, verifyToken, requireAdmin, handleUpdateApplication);

// =========================================================================
// ADMIN: Delete Certificate Application
// =========================================================================
router.delete('/:id', requireDb, verifyToken, requireAdmin, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, error: 'Invalid application ID' });
        }
        const deleted = await CertificateApplication.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        res.json({ success: true, message: 'Certificate application deleted' });
    } catch (err) {
        console.error('Error deleting certificate application:', err);
        res.status(500).json({ success: false, error: 'Failed to delete certificate application' });
    }
});

module.exports = {
    router,
    DEFAULT_DOCUMENT_OPTIONS
};
