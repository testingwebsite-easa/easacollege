import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCertificate,
    FaCalendarAlt,
    FaIdCard,
    FaUser,
    FaUserTie,
    FaBuilding,
    FaLayerGroup,
    FaGraduationCap,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFileAlt,
    FaCheckCircle,
    FaExclamationCircle,
    FaPaperPlane,
    FaRedo,
    FaCopy,
    FaCheck,
    FaClock,
    FaShieldAlt,
    FaInfoCircle,
    FaSearch,
    FaTimes
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import AdmissionForm from '../components/AdmissionForm';
import API_BASE_URL from '../api';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import {
    CERTIFICATE_STATUSES,
    STATUS_STYLE_MAP,
    DEFAULT_CERTIFICATE_DOCUMENTS,
    getBatchYears,
    getPassingOutYears,
    buildDepartmentOptions,
    validateCertificateForm
} from '../utils/certificateConfig';

const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const generateFormId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let suffix = '';
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        const arr = new Uint32Array(6);
        window.crypto.getRandomValues(arr);
        for (let i = 0; i < 6; i++) {
            suffix += chars[arr[i] % chars.length];
        }
    } else {
        for (let i = 0; i < 6; i++) {
            suffix += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    return `ECET-CERT-${suffix}`;
};

const createInitialFormState = () => ({
    applicationId: generateFormId(),
    dateOfApplication: getTodayDate(),
    registrationNumber: '',
    studentName: '',
    department: '',
    batch: '',
    contactNumber: '',
    email: '',
    fatherName: '',
    passingOutYear: '',
    requiredDocuments: [],
    address: ''
});

const CertificateCollectionPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const { showToast } = useToast();

    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [formData, setFormData] = useState(createInitialFormState);
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [duplicateWarning, setDuplicateWarning] = useState(null);
    const [submittedReceipt, setSubmittedReceipt] = useState(null);
    const [copiedId, setCopiedId] = useState(false);

    const [apiDepartments, setApiDepartments] = useState([]);
    const [documentOptions, setDocumentOptions] = useState(DEFAULT_CERTIFICATE_DOCUMENTS);
    const [loadingOptions, setLoadingOptions] = useState(true);

    // Status Tracking Bar States
    const [trackQuery, setTrackQuery] = useState('');
    const [trackLoading, setTrackLoading] = useState(false);
    const [trackResults, setTrackResults] = useState([]);
    const [hasTracked, setHasTracked] = useState(false);
    const [trackError, setTrackError] = useState('');

    const batchYears = useMemo(() => getBatchYears(), []);
    const passingOutYears = useMemo(() => getPassingOutYears(), []);
    const departmentGroups = useMemo(() => buildDepartmentOptions(apiDepartments), [apiDepartments]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchMetadata = async () => {
            try {
                const [deptRes, optRes] = await Promise.allSettled([
                    fetch(`${API_BASE_URL}/api/departments`),
                    fetch(`${API_BASE_URL}/api/certificates/options`)
                ]);

                if (deptRes.status === 'fulfilled' && deptRes.value.ok) {
                    const deptData = await deptRes.value.json();
                    if (Array.isArray(deptData) && deptData.length > 0) {
                        setApiDepartments(deptData);
                    }
                }

                if (optRes.status === 'fulfilled' && optRes.value.ok) {
                    const optData = await optRes.value.json();
                    if (Array.isArray(optData) && optData.length > 0) {
                        setDocumentOptions(optData.filter(o => o.isActive !== false));
                    }
                }
            } catch (err) {
                console.error('Failed to load certificate form metadata:', err);
            } finally {
                setLoadingOptions(false);
            }
        };

        fetchMetadata();
    }, []);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateOfApplication') return;
        let nextVal = value;

        if (name === 'registrationNumber') {
            nextVal = value.toUpperCase().replace(/[^A-Z0-9/-]/g, '');
        } else if (name === 'contactNumber') {
            // Allow leading + and digits only
            nextVal = value.startsWith('+')
                ? '+' + value.slice(1).replace(/\D/g, '').slice(0, 15)
                : value.replace(/\D/g, '').slice(0, 12);
        }

        const updatedForm = { ...formData, [name]: nextVal };
        setFormData(updatedForm);
        setDuplicateWarning(null);

        if (touched[name] || fieldErrors[name]) {
            const errs = validateCertificateForm(updatedForm);
            setFieldErrors(prev => ({ ...prev, [name]: errs[name] }));
        }
    };

    const handleBlur = (fieldName) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        const errs = validateCertificateForm(formData);
        setFieldErrors(prev => ({ ...prev, [fieldName]: errs[fieldName] }));
    };

    const handleDocumentToggle = (docLabel) => {
        setFormData(prev => {
            const exists = prev.requiredDocuments.includes(docLabel);
            const nextDocs = exists
                ? prev.requiredDocuments.filter(d => d !== docLabel)
                : [...prev.requiredDocuments, docLabel];
            const nextState = { ...prev, requiredDocuments: nextDocs };

            const errs = validateCertificateForm(nextState);
            setFieldErrors(fe => ({ ...fe, requiredDocuments: errs.requiredDocuments }));
            return nextState;
        });
        setTouched(prev => ({ ...prev, requiredDocuments: true }));
        setDuplicateWarning(null);
    };

    const handleReset = () => {
        setFormData(createInitialFormState());
        setFieldErrors({});
        setTouched({});
        setDuplicateWarning(null);
        showToast('Form fields have been reset.', 'info', 'Form Reset');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        // Mark all fields touched and run full validation
        const allTouched = {
            dateOfApplication: true,
            registrationNumber: true,
            studentName: true,
            department: true,
            batch: true,
            contactNumber: true,
            email: true,
            fatherName: true,
            passingOutYear: true,
            requiredDocuments: true,
            address: true
        };
        setTouched(allTouched);
        setDuplicateWarning(null);

        const errors = validateCertificateForm(formData);
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            const firstKey = Object.keys(errors)[0];
            showToast(errors[firstKey], 'warning', 'Validation Error');
            const firstEl = document.getElementById(`cert-${firstKey}`);
            if (firstEl) {
                firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstEl.focus();
            }
            return;
        }

        // Session-level quick duplicate guard
        const sessionKey = `cert_submitted_${formData.registrationNumber.trim().toUpperCase()}_${[...formData.requiredDocuments].sort().join('|')}`;
        try {
            const prevSubmission = sessionStorage.getItem(sessionKey);
            if (prevSubmission) {
                const parsed = JSON.parse(prevSubmission);
                setDuplicateWarning({
                    message: `You have already submitted an identical request in this session (Reference: ${parsed.applicationId}).`,
                    applicationId: parsed.applicationId,
                    status: parsed.status || 'Pending'
                });
                showToast('Duplicate submission prevented.', 'warning', 'Already Submitted');
                return;
            }
        } catch {
            // sessionStorage unavailable
        }

        setSubmitting(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    applicationId: formData.applicationId,
                    dateOfApplication: getTodayDate(),
                    registrationNumber: formData.registrationNumber.trim().toUpperCase(),
                    studentName: formData.studentName.trim(),
                    fatherName: formData.fatherName.trim(),
                    contactNumber: formData.contactNumber.trim(),
                    email: formData.email.trim().toLowerCase(),
                    address: formData.address.trim()
                })
            });

            const data = await res.json();

            if (res.status === 409) {
                setDuplicateWarning({
                    message: data.error || 'A duplicate certificate collection request already exists for this registration number.',
                    applicationId: data.duplicateApplicationId,
                    status: data.existingStatus
                });
                showToast(data.error || 'Duplicate submission detected.', 'warning', 'Duplicate Application');
                return;
            }

            if (!res.ok || !data.success) {
                if (data.errors) {
                    setFieldErrors(data.errors);
                }
                showToast(data.error || 'Failed to submit application. Please check your details.', 'error', 'Submission Failed');
                return;
            }

            try {
                sessionStorage.setItem(
                    sessionKey,
                    JSON.stringify({
                        applicationId: data.applicationId,
                        status: data.application?.status || 'Pending'
                    })
                );
            } catch {
                // ignore storage failure
            }

            setSubmittedReceipt({
                ...data.application,
                applicationId: data.applicationId,
                formattedTimestamp: new Date(data.application?.submittedAt || Date.now()).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                })
            });
            showToast(`Application submitted successfully! Reference ID: ${data.applicationId}`, 'success', 'Application Confirmed');
            window.scrollTo({ top: 280, behavior: 'smooth' });
        } catch (err) {
            console.error('Certificate submission error:', err);
            showToast('Network error while submitting application. Please try again.', 'error', 'Network Error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCopyApplicationId = () => {
        if (!submittedReceipt?.applicationId) return;
        navigator.clipboard.writeText(submittedReceipt.applicationId);
        setCopiedId(true);
        showToast('Reference ID copied to clipboard!', 'info', 'Copied');
        setTimeout(() => setCopiedId(false), 3000);
    };

    const handleNewSubmission = () => {
        setSubmittedReceipt(null);
        setFormData(createInitialFormState());
        setFieldErrors({});
        setTouched({});
        setDuplicateWarning(null);
    };

    const runStatusLookup = async (rawQuery) => {
        const cleanQuery = String(rawQuery || '').trim().toUpperCase();
        if (!cleanQuery || cleanQuery.length < 4) {
            setTrackError('Please enter a valid Unique Form ID (e.g. ECET-CERT-XXXXXX) or Registration Number.');
            showToast('Enter at least 4 characters to track your certificate status.', 'warning', 'Query Required');
            return;
        }

        setTrackError('');
        setTrackLoading(true);
        setHasTracked(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/track/${encodeURIComponent(cleanQuery)}`, {
                cache: 'no-store'
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to check certificate status');
            }
            setTrackResults(Array.isArray(data.records) ? data.records : []);
        } catch (err) {
            console.error('Certificate status tracking error:', err);
            setTrackResults([]);
            setTrackError(err.message || 'Unable to check status. Please try again.');
            showToast(err.message || 'Unable to check status.', 'error', 'Tracking Error');
        } finally {
            setTrackLoading(false);
        }
    };

    const handleTrackSubmit = (e) => {
        e.preventDefault();
        runStatusLookup(trackQuery);
    };

    const handleClearTrack = () => {
        setTrackQuery('');
        setTrackResults([]);
        setHasTracked(false);
        setTrackError('');
    };

    // Theme-aware styling variables
    const pageBg = isDark ? '#060a14' : '#f8fafc';
    const cardBg = isDark ? 'rgba(15, 23, 42, 0.92)' : '#ffffff';
    const subCardBg = isDark ? 'rgba(30, 41, 59, 0.55)' : '#f8fafc';
    const borderCol = isDark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0';
    const textPrimary = isDark ? '#f8fafc' : '#0f172a';
    const textMuted = isDark ? '#94a3b8' : '#64748b';
    const inputBg = isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff';
    const inputBorder = isDark ? 'rgba(148, 163, 184, 0.3)' : '#cbd5e1';

    return (
        <div style={{ background: pageBg, minHeight: '100vh', color: textPrimary }}>
            <SEO
                title="Certificate Collection | Controller of Examinations (C.O.E)"
                description="Apply online for Provisional Certificate, Consolidated Mark Statement, Original Degree Certificate, Transfer Certificate, and Academic Transcripts through the EASA College COE Certificate Collection Portal."
                url="https://easacollege.com/certificate-collection"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="certificate-collection"
                defaultTitle="Certificate Collection Portal"
                defaultSubtitle="Office of the Controller of Examinations (C.O.E) — Request Academic, Degree, Provisional, and Transfer Certificates online."
            />

            {/* COE Compliance & Guidelines Bar */}
            <div style={{ background: '#1B2A6B', color: '#ffffff', padding: '0.9rem 1.5rem', borderBottom: '3px solid #FCCA26' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaShieldAlt style={{ color: '#FCCA26', fontSize: '1.2rem', flexShrink: 0 }} />
                        <span style={{ fontWeight: '700' }}>
                            OFFICE OF THE CONTROLLER OF EXAMINATIONS (C.O.E) • Official Certificate Request Desk
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', opacity: 0.95 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <FaClock style={{ color: '#FCCA26' }} /> Mon–Sat: 9:30 AM – 4:30 PM
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <FaIdCard style={{ color: '#FCCA26' }} /> Original ID required at collection
                        </span>
                    </div>
                </div>
            </div>

            <main style={{ maxWidth: '1050px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem' }}>
                {/* ============================================================ */}
                {/* STUDENT STATUS TRACKING SEARCH BAR                           */}
                {/* ============================================================ */}
                <motion.section
                    id="cert-status-tracker"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: cardBg,
                        borderRadius: '18px',
                        padding: 'clamp(1.15rem, 3vw, 1.75rem)',
                        border: `1px solid ${borderCol}`,
                        boxShadow: isDark ? '0 14px 36px rgba(0,0,0,0.4)' : '0 8px 25px rgba(15, 23, 42, 0.05)',
                        marginBottom: '2rem'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: isDark ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff',
                                color: isDark ? '#60a5fa' : '#1B2A6B',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.05rem',
                                flexShrink: 0
                            }}>
                                <FaSearch />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: textPrimary }}>
                                    Track Certificate Status
                                </h2>
                                <p style={{ margin: 0, fontSize: '0.84rem', color: textMuted }}>
                                    Enter your <strong>Unique Form ID</strong> (e.g. <code>ECET-CERT-XXXXXX</code>) or <strong>Registration Number</strong> to check live progress.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'stretch' }}>
                        <div style={{ position: 'relative', flex: '1 1 280px' }}>
                            <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: textMuted }} />
                            <input
                                type="text"
                                aria-label="Track certificate status by Unique Form ID or Registration Number"
                                placeholder="Enter Unique Form ID (ECET-CERT-...) or Registration Number"
                                value={trackQuery}
                                onChange={(e) => {
                                    setTrackQuery(e.target.value.toUpperCase());
                                    if (trackError) setTrackError('');
                                }}
                                className="cert-input"
                                style={{ paddingLeft: '2.6rem', paddingRight: trackQuery ? '2.5rem' : '1rem', fontFamily: 'monospace', fontWeight: '700' }}
                            />
                            {trackQuery && (
                                <button
                                    type="button"
                                    onClick={handleClearTrack}
                                    aria-label="Clear search"
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        color: textMuted,
                                        cursor: 'pointer',
                                        padding: '4px'
                                    }}
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={trackLoading}
                            style={{
                                padding: '0.85rem 1.6rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: trackLoading ? '#475569' : 'linear-gradient(135deg, #1B2A6B 0%, #2563eb 100%)',
                                color: '#ffffff',
                                fontWeight: '700',
                                fontSize: '0.94rem',
                                cursor: trackLoading ? 'not-allowed' : 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 6px 16px rgba(27, 42, 107, 0.25)'
                            }}
                        >
                            <FaSearch style={{ color: '#FCCA26' }} />
                            {trackLoading ? 'Checking...' : 'Track Status'}
                        </button>
                    </form>

                    {trackError && (
                        <p className="cert-err-msg" style={{ marginTop: '0.55rem' }}>{trackError}</p>
                    )}

                    {/* Tracking Results */}
                    {hasTracked && !trackLoading && (
                        <div style={{ marginTop: '1.25rem' }}>
                            {trackResults.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {trackResults.map((rec, idx) => {
                                        const currentStatus = rec.status || 'Pending';
                                        const stStyle = STATUS_STYLE_MAP[currentStatus] || STATUS_STYLE_MAP.Pending;
                                        const activeStepIndex = Math.max(0, CERTIFICATE_STATUSES.indexOf(currentStatus));

                                        return (
                                            <div key={rec._id || idx} style={{
                                                background: subCardBg,
                                                borderRadius: '14px',
                                                padding: '1.25rem',
                                                border: `1px solid ${borderCol}`
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                                                    <div>
                                                        <span style={{
                                                            display: 'inline-block',
                                                            background: '#1B2A6B',
                                                            color: '#FCCA26',
                                                            padding: '3px 10px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.82rem',
                                                            fontWeight: '800',
                                                            fontFamily: 'monospace'
                                                        }}>
                                                            {rec.applicationId}
                                                        </span>
                                                        <h3 style={{ margin: '0.45rem 0 0.15rem 0', fontSize: '1.12rem', fontWeight: '800', color: textPrimary }}>
                                                            {rec.studentName} ({rec.registrationNumber})
                                                        </h3>
                                                        <div style={{ fontSize: '0.82rem', color: textMuted }}>
                                                            {rec.department} • Batch {rec.batch} • Passed Out {rec.passingOutYear}
                                                        </div>
                                                    </div>

                                                    <span style={{
                                                        padding: '5px 14px',
                                                        borderRadius: '999px',
                                                        fontWeight: '800',
                                                        fontSize: '0.82rem',
                                                        background: stStyle.bg,
                                                        color: stStyle.color,
                                                        border: `1.5px solid ${stStyle.border}`
                                                    }}>
                                                        ● {currentStatus}
                                                    </span>
                                                </div>

                                                {/* 4-Step Visual Progress Tracker */}
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                                    gap: '0.5rem',
                                                    marginBottom: '1rem'
                                                }}>
                                                    {CERTIFICATE_STATUSES.map((stepName, sIdx) => {
                                                        const reached = sIdx <= activeStepIndex;
                                                        return (
                                                            <div key={stepName} style={{
                                                                padding: '0.55rem 0.7rem',
                                                                borderRadius: '8px',
                                                                border: reached ? '1.5px solid #2563eb' : `1px solid ${borderCol}`,
                                                                background: reached ? (isDark ? 'rgba(37, 99, 235, 0.2)' : '#eff6ff') : inputBg,
                                                                color: reached ? (isDark ? '#93c5fd' : '#1e3a8a') : textMuted,
                                                                fontSize: '0.76rem',
                                                                fontWeight: reached ? '800' : '600',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            }}>
                                                                <span>{reached ? '✓' : sIdx + 1}</span>
                                                                <span>{stepName}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.76rem', fontWeight: '700', color: textMuted, marginRight: '4px' }}>Documents:</span>
                                                    {(rec.requiredDocuments || []).map((doc, dIdx) => (
                                                        <span key={dIdx} style={{
                                                            background: isDark ? 'rgba(59, 130, 246, 0.16)' : '#e0e7ff',
                                                            color: isDark ? '#93c5fd' : '#1e3a8a',
                                                            padding: '2px 9px',
                                                            borderRadius: '999px',
                                                            fontSize: '0.76rem',
                                                            fontWeight: '700'
                                                        }}>
                                                            {doc}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: textMuted }}>
                                                    <span>Applied Date: <strong>{rec.dateOfApplication}</strong></span>
                                                    {rec.statusUpdatedAt && (
                                                        <span>Last Updated: <strong>{new Date(rec.statusUpdatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</strong></span>
                                                    )}
                                                </div>

                                                {rec.adminRemarks && (
                                                    <div style={{
                                                        marginTop: '0.75rem',
                                                        padding: '0.65rem 0.9rem',
                                                        borderRadius: '8px',
                                                        background: isDark ? 'rgba(16, 185, 129, 0.14)' : '#ecfdf5',
                                                        border: '1px solid rgba(16, 185, 129, 0.35)',
                                                        color: isDark ? '#6ee7b7' : '#065f46',
                                                        fontSize: '0.84rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        <strong>COE Office Remarks:</strong> {rec.adminRemarks}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '1.5rem',
                                    background: subCardBg,
                                    borderRadius: '12px',
                                    border: `1px solid ${borderCol}`
                                }}>
                                    <FaExclamationCircle style={{ color: '#f59e0b', fontSize: '1.6rem', marginBottom: '0.4rem' }} />
                                    <p style={{ margin: 0, fontWeight: '700', color: textPrimary }}>
                                        No certificate application found for &ldquo;{trackQuery}&rdquo;
                                    </p>
                                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.82rem', color: textMuted }}>
                                        Double-check your Unique Form ID (ECET-CERT-XXXXXX) or University Registration Number.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.section>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                        background: cardBg,
                        borderRadius: '20px',
                        padding: 'clamp(1.5rem, 4vw, 3rem)',
                        border: `1px solid ${borderCol}`,
                        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.45)' : '0 12px 35px rgba(15, 23, 42, 0.06)'
                    }}
                >
                    <AnimatePresence mode="wait">
                        {submittedReceipt ? (
                            /* ======================================================== */
                            /* CONFIRMATION RECEIPT VIEW                                */
                            /* ======================================================== */
                            <motion.div
                                key="receipt"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ textAlign: 'center', padding: '1rem 0' }}
                            >
                                <div style={{
                                    width: '78px',
                                    height: '78px',
                                    borderRadius: '50%',
                                    background: 'rgba(22, 163, 74, 0.14)',
                                    color: '#16a34a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.2rem'
                                }}>
                                    <FaCheckCircle size={42} />
                                </div>

                                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', margin: '0 0 0.5rem 0', color: textPrimary }}>
                                    Certificate Request Submitted Successfully
                                </h2>
                                <p style={{ color: textMuted, maxWidth: '560px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                                    Your certificate collection application has been securely recorded by the Office of the Controller of Examinations. Save your Reference ID below.
                                </p>

                                {/* Reference Card */}
                                <div style={{
                                    maxWidth: '580px',
                                    margin: '0 auto 2rem',
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%)',
                                    color: '#ffffff',
                                    borderRadius: '16px',
                                    textAlign: 'left',
                                    boxShadow: '0 14px 32px rgba(27, 42, 107, 0.35)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FCCA26', letterSpacing: '1px' }}>
                                            OFFICIAL APPLICATION REFERENCE ID
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleCopyApplicationId}
                                            style={{
                                                background: 'rgba(255,255,255,0.18)',
                                                border: 'none',
                                                color: '#ffffff',
                                                padding: '5px 10px',
                                                borderRadius: '6px',
                                                fontSize: '0.78rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            {copiedId ? <><FaCheck /> Copied</> : <><FaCopy /> Copy</>}
                                        </button>
                                    </div>

                                    <div style={{ fontSize: '1.85rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '0.85rem' }}>
                                        {submittedReceipt.applicationId}
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.82rem', opacity: 0.92, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.85rem' }}>
                                        <span><strong>Status:</strong> <span style={{ background: '#FCCA26', color: '#0f172a', padding: '2px 8px', borderRadius: '999px', fontWeight: '800' }}>{submittedReceipt.status || 'Pending'}</span></span>
                                        <span><strong>Submitted:</strong> {submittedReceipt.formattedTimestamp}</span>
                                    </div>
                                </div>

                                {/* Detailed Summary Grid */}
                                <div style={{
                                    maxWidth: '720px',
                                    margin: '0 auto 2rem',
                                    background: subCardBg,
                                    borderRadius: '14px',
                                    border: `1px solid ${borderCol}`,
                                    padding: '1.4rem',
                                    textAlign: 'left',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                    gap: '1rem',
                                    fontSize: '0.9rem'
                                }}>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>STUDENT NAME</span><strong>{submittedReceipt.studentName}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>REGISTRATION NO.</span><strong>{submittedReceipt.registrationNumber}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>DEPARTMENT</span><strong>{submittedReceipt.department}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>BATCH / PASSING YEAR</span><strong>{submittedReceipt.batch} / {submittedReceipt.passingOutYear}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>FATHER&apos;S NAME</span><strong>{submittedReceipt.fatherName}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>CONTACT NUMBER</span><strong>{submittedReceipt.contactNumber}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>EMAIL ID</span><strong>{submittedReceipt.email}</strong></div>
                                    <div><span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>APPLICATION DATE</span><strong>{submittedReceipt.dateOfApplication}</strong></div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.35rem' }}>REQUIRED DOCUMENTS</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                            {(submittedReceipt.requiredDocuments || []).map((doc, idx) => (
                                                <span key={idx} style={{
                                                    background: isDark ? 'rgba(59, 130, 246, 0.2)' : '#e0e7ff',
                                                    color: isDark ? '#93c5fd' : '#1e3a8a',
                                                    padding: '4px 10px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '700'
                                                }}>
                                                    {doc}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <span style={{ color: textMuted, display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>COMMUNICATION ADDRESS</span>
                                        <span>{submittedReceipt.address}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTrackQuery(submittedReceipt.applicationId);
                                            runStatusLookup(submittedReceipt.applicationId);
                                            const el = document.getElementById('cert-status-tracker');
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        style={{
                                            padding: '0.85rem 1.6rem',
                                            borderRadius: '10px',
                                            border: `1.5px solid ${inputBorder}`,
                                            background: subCardBg,
                                            color: textPrimary,
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <FaSearch /> Track Status
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNewSubmission}
                                        style={{
                                            padding: '0.85rem 1.8rem',
                                            borderRadius: '10px',
                                            border: 'none',
                                            background: '#1B2A6B',
                                            color: '#ffffff',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <FaCertificate style={{ color: '#FCCA26' }} /> Submit Another Request
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* ======================================================== */
                            /* APPLICATION FORM VIEW                                    */
                            /* ======================================================== */
                            <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '2rem' }}>
                                {/* Form Header */}
                                <div style={{ borderBottom: `2px solid ${borderCol}`, paddingBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '14px',
                                            background: 'linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%)',
                                            color: '#FCCA26',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.6rem',
                                            flexShrink: 0
                                        }}>
                                            <FaCertificate />
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', color: isDark ? '#FCCA26' : '#1B2A6B', textTransform: 'uppercase' }}>
                                                COE CERTIFICATE REQUISITION FORM
                                            </span>
                                            <h2 style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', fontWeight: '900', margin: '0.15rem 0', color: textPrimary }}>
                                                Certificate Collection Application
                                            </h2>
                                            <p style={{ fontSize: '0.9rem', color: textMuted, margin: 0 }}>
                                                Complete all mandatory fields accurately. Fields marked with <span style={{ color: '#ef4444' }}>*</span> are required.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Unique Form ID Badge */}
                                    <div style={{
                                        background: isDark ? 'rgba(37, 99, 235, 0.14)' : '#eff6ff',
                                        border: '1.5px solid #2563eb',
                                        borderRadius: '12px',
                                        padding: '0.65rem 1rem',
                                        textAlign: 'right'
                                    }}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: '800', color: isDark ? '#93c5fd' : '#1e40af', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                                            UNIQUE FORM ID
                                        </div>
                                        <div style={{ fontSize: '1.15rem', fontWeight: '900', fontFamily: 'monospace', color: isDark ? '#FCCA26' : '#1B2A6B', letterSpacing: '0.6px' }}>
                                            {formData.applicationId}
                                        </div>
                                    </div>
                                </div>

                                {/* Duplicate Alert Banner */}
                                {duplicateWarning && (
                                    <div role="alert" style={{
                                        background: isDark ? 'rgba(245, 158, 11, 0.14)' : '#fffbeb',
                                        border: '1.5px solid #f59e0b',
                                        borderRadius: '12px',
                                        padding: '1rem 1.25rem',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '12px',
                                        color: isDark ? '#fde68a' : '#92400e'
                                    }}>
                                        <FaExclamationCircle style={{ fontSize: '1.3rem', marginTop: '2px', flexShrink: 0, color: '#f59e0b' }} />
                                        <div>
                                            <div style={{ fontWeight: '800', marginBottom: '0.2rem' }}>Duplicate Request Prevented</div>
                                            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{duplicateWarning.message}</div>
                                            {duplicateWarning.applicationId && (
                                                <div style={{ fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: '700' }}>
                                                    Existing Reference ID: <span style={{ fontFamily: 'monospace' }}>{duplicateWarning.applicationId}</span> • Status: {duplicateWarning.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Section 1: Student & Academic Details */}
                                <div style={{ background: subCardBg, padding: 'clamp(1.1rem, 2.5vw, 1.75rem)', borderRadius: '16px', border: `1px solid ${borderCol}` }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.08rem', fontWeight: '800', color: isDark ? '#FCCA26' : '#1B2A6B', margin: '0 0 1.35rem 0' }}>
                                        <FaGraduationCap /> 1. Student & Academic Details
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                                        {/* 0. Unique Form / Application ID */}
                                        <div>
                                            <label htmlFor="cert-applicationId" className="cert-label">
                                                <FaIdCard /> Unique Form ID
                                                <span style={{ fontSize: '0.72rem', fontWeight: '600', color: textMuted, marginLeft: 'auto' }}>
                                                    (Auto-generated)
                                                </span>
                                            </label>
                                            <input
                                                id="cert-applicationId"
                                                type="text"
                                                name="applicationId"
                                                value={formData.applicationId}
                                                readOnly
                                                tabIndex={-1}
                                                className="cert-input"
                                                style={{
                                                    fontFamily: 'monospace',
                                                    fontWeight: '800',
                                                    letterSpacing: '0.6px',
                                                    color: isDark ? '#FCCA26' : '#1B2A6B',
                                                    background: isDark ? 'rgba(30, 41, 59, 0.85)' : '#f1f5f9',
                                                    cursor: 'not-allowed'
                                                }}
                                            />
                                        </div>

                                        {/* 1. Date of Application (Locked to Current Date) */}
                                        <div>
                                            <label htmlFor="cert-dateOfApplication" className="cert-label">
                                                <FaCalendarAlt /> Date of Application <span className="cert-req">*</span>
                                                <span style={{ fontSize: '0.72rem', fontWeight: '600', color: textMuted, marginLeft: 'auto' }}>
                                                    (Current Date Only)
                                                </span>
                                            </label>
                                            <input
                                                id="cert-dateOfApplication"
                                                type="date"
                                                name="dateOfApplication"
                                                value={getTodayDate()}
                                                min={getTodayDate()}
                                                max={getTodayDate()}
                                                readOnly
                                                tabIndex={-1}
                                                onChange={() => {}}
                                                onKeyDown={(e) => e.preventDefault()}
                                                className="cert-input"
                                                style={{
                                                    cursor: 'not-allowed',
                                                    background: isDark ? 'rgba(30, 41, 59, 0.85)' : '#f1f5f9',
                                                    opacity: 0.9,
                                                    pointerEvents: 'none'
                                                }}
                                                required
                                            />
                                        </div>

                                        {/* 2. Registration Number */}
                                        <div>
                                            <label htmlFor="cert-registrationNumber" className="cert-label">
                                                <FaIdCard /> Registration Number <span className="cert-req">*</span>
                                            </label>
                                            <input
                                                id="cert-registrationNumber"
                                                type="text"
                                                name="registrationNumber"
                                                placeholder="e.g. 710921104001"
                                                maxLength={30}
                                                value={formData.registrationNumber}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('registrationNumber')}
                                                className={`cert-input ${fieldErrors.registrationNumber ? 'cert-input-err' : ''}`}
                                                required
                                            />
                                            {fieldErrors.registrationNumber && <p className="cert-err-msg">{fieldErrors.registrationNumber}</p>}
                                        </div>

                                        {/* 3. Student Name */}
                                        <div>
                                            <label htmlFor="cert-studentName" className="cert-label">
                                                <FaUser /> Student Name <span className="cert-req">*</span>
                                            </label>
                                            <input
                                                id="cert-studentName"
                                                type="text"
                                                name="studentName"
                                                placeholder="Enter student full name"
                                                maxLength={120}
                                                value={formData.studentName}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('studentName')}
                                                className={`cert-input ${fieldErrors.studentName ? 'cert-input-err' : ''}`}
                                                required
                                            />
                                            {fieldErrors.studentName && <p className="cert-err-msg">{fieldErrors.studentName}</p>}
                                        </div>

                                        {/* 4. Father's Name */}
                                        <div>
                                            <label htmlFor="cert-fatherName" className="cert-label">
                                                <FaUserTie /> Father&apos;s Name <span className="cert-req">*</span>
                                            </label>
                                            <input
                                                id="cert-fatherName"
                                                type="text"
                                                name="fatherName"
                                                placeholder="Enter father's full name"
                                                maxLength={120}
                                                value={formData.fatherName}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('fatherName')}
                                                className={`cert-input ${fieldErrors.fatherName ? 'cert-input-err' : ''}`}
                                                required
                                            />
                                            {fieldErrors.fatherName && <p className="cert-err-msg">{fieldErrors.fatherName}</p>}
                                        </div>

                                        {/* 5. Department */}
                                        <div>
                                            <label htmlFor="cert-department" className="cert-label">
                                                <FaBuilding /> Department <span className="cert-req">*</span>
                                            </label>
                                            <select
                                                id="cert-department"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('department')}
                                                className={`cert-input ${fieldErrors.department ? 'cert-input-err' : ''}`}
                                                required
                                            >
                                                <option value="">-- Select Department --</option>
                                                <optgroup label="Undergraduate Programmes (B.E. / B.Tech.)">
                                                    {departmentGroups.ug.map(dept => (
                                                        <option key={`ug-${dept}`} value={dept}>{dept}</option>
                                                    ))}
                                                </optgroup>
                                                <optgroup label="Postgraduate Programmes (M.E. / MBA)">
                                                    {departmentGroups.pg.map(dept => (
                                                        <option key={`pg-${dept}`} value={dept}>{dept}</option>
                                                    ))}
                                                </optgroup>
                                                <optgroup label="Doctoral / Research Programmes (Ph.D.)">
                                                    {departmentGroups.phd.map(dept => (
                                                        <option key={`phd-${dept}`} value={dept}>{dept}</option>
                                                    ))}
                                                </optgroup>
                                            </select>
                                            {fieldErrors.department && <p className="cert-err-msg">{fieldErrors.department}</p>}
                                        </div>

                                        {/* 6. Batch (2008 onwards) */}
                                        <div>
                                            <label htmlFor="cert-batch" className="cert-label">
                                                <FaLayerGroup /> Batch (Admission Year) <span className="cert-req">*</span>
                                            </label>
                                            <select
                                                id="cert-batch"
                                                name="batch"
                                                value={formData.batch}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('batch')}
                                                className={`cert-input ${fieldErrors.batch ? 'cert-input-err' : ''}`}
                                                required
                                            >
                                                <option value="">-- Select Batch (2008 onwards) --</option>
                                                {batchYears.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                            {fieldErrors.batch && <p className="cert-err-msg">{fieldErrors.batch}</p>}
                                        </div>

                                        {/* 7. Year of Passing Out */}
                                        <div>
                                            <label htmlFor="cert-passingOutYear" className="cert-label">
                                                <FaGraduationCap /> Year of Passing Out <span className="cert-req">*</span>
                                            </label>
                                            <select
                                                id="cert-passingOutYear"
                                                name="passingOutYear"
                                                value={formData.passingOutYear}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('passingOutYear')}
                                                className={`cert-input ${fieldErrors.passingOutYear ? 'cert-input-err' : ''}`}
                                                required
                                            >
                                                <option value="">-- Select Year of Passing Out --</option>
                                                {passingOutYears.map(year => (
                                                    <option
                                                        key={year}
                                                        value={year}
                                                        disabled={Boolean(formData.batch && Number(year) < Number(formData.batch))}
                                                    >
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                            {fieldErrors.passingOutYear && <p className="cert-err-msg">{fieldErrors.passingOutYear}</p>}
                                        </div>

                                        {/* 8. Contact Number */}
                                        <div>
                                            <label htmlFor="cert-contactNumber" className="cert-label">
                                                <FaPhoneAlt /> Contact Number <span className="cert-req">*</span>
                                            </label>
                                            <input
                                                id="cert-contactNumber"
                                                type="tel"
                                                name="contactNumber"
                                                placeholder="10-digit mobile number (e.g. 9876543210)"
                                                value={formData.contactNumber}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('contactNumber')}
                                                className={`cert-input ${fieldErrors.contactNumber ? 'cert-input-err' : ''}`}
                                                required
                                            />
                                            {fieldErrors.contactNumber && <p className="cert-err-msg">{fieldErrors.contactNumber}</p>}
                                        </div>

                                        {/* 9. Email ID */}
                                        <div>
                                            <label htmlFor="cert-email" className="cert-label">
                                                <FaEnvelope /> Email ID <span className="cert-req">*</span>
                                            </label>
                                            <input
                                                id="cert-email"
                                                type="email"
                                                name="email"
                                                placeholder="e.g. student@example.com"
                                                value={formData.email}
                                                onChange={handleFieldChange}
                                                onBlur={() => handleBlur('email')}
                                                className={`cert-input ${fieldErrors.email ? 'cert-input-err' : ''}`}
                                                required
                                            />
                                            {fieldErrors.email && <p className="cert-err-msg">{fieldErrors.email}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Required Documents */}
                                <div id="cert-requiredDocuments" style={{
                                    background: subCardBg,
                                    padding: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                                    borderRadius: '16px',
                                    border: fieldErrors.requiredDocuments ? '1.5px solid #ef4444' : `1px solid ${borderCol}`
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.08rem', fontWeight: '800', color: isDark ? '#FCCA26' : '#1B2A6B', margin: 0 }}>
                                                <FaFileAlt /> 2. Required Documents <span className="cert-req">*</span>
                                            </h3>
                                            <p style={{ fontSize: '0.84rem', color: textMuted, margin: '0.25rem 0 0 0' }}>
                                                Select one or more certificates/documents you wish to collect.
                                            </p>
                                        </div>
                                        <span style={{
                                            background: formData.requiredDocuments.length > 0 ? '#1B2A6B' : (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'),
                                            color: formData.requiredDocuments.length > 0 ? '#FCCA26' : textMuted,
                                            padding: '4px 12px',
                                            borderRadius: '999px',
                                            fontSize: '0.8rem',
                                            fontWeight: '800'
                                        }}>
                                            {formData.requiredDocuments.length} Selected
                                        </span>
                                    </div>

                                    {loadingOptions ? (
                                        <p style={{ color: textMuted, fontSize: '0.9rem' }}>Loading document options...</p>
                                    ) : (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.75rem' }}>
                                            {documentOptions.map((opt) => {
                                                const label = opt.label || opt;
                                                const isChecked = formData.requiredDocuments.includes(label);
                                                return (
                                                    <label
                                                        key={label}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: '10px',
                                                            padding: '0.85rem 1rem',
                                                            borderRadius: '12px',
                                                            cursor: 'pointer',
                                                            border: isChecked
                                                                ? '2px solid #2563eb'
                                                                : `1.5px solid ${borderCol}`,
                                                            background: isChecked
                                                                ? (isDark ? 'rgba(37, 99, 235, 0.16)' : '#eff6ff')
                                                                : inputBg,
                                                            transition: 'all 0.18s ease'
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={() => handleDocumentToggle(label)}
                                                            style={{
                                                                width: '18px',
                                                                height: '18px',
                                                                marginTop: '2px',
                                                                accentColor: '#1B2A6B',
                                                                cursor: 'pointer',
                                                                flexShrink: 0
                                                            }}
                                                        />
                                                        <div>
                                                            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: textPrimary }}>
                                                                {label}
                                                            </div>
                                                            {opt.description && (
                                                                <div style={{ fontSize: '0.76rem', color: textMuted, marginTop: '2px', lineHeight: '1.35' }}>
                                                                    {opt.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {fieldErrors.requiredDocuments && <p className="cert-err-msg" style={{ marginTop: '0.75rem' }}>{fieldErrors.requiredDocuments}</p>}
                                </div>

                                {/* Section 3: Communication Address */}
                                <div style={{ background: subCardBg, padding: 'clamp(1.1rem, 2.5vw, 1.75rem)', borderRadius: '16px', border: `1px solid ${borderCol}` }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.08rem', fontWeight: '800', color: isDark ? '#FCCA26' : '#1B2A6B', margin: '0 0 1rem 0' }}>
                                        <FaMapMarkerAlt /> 3. Communication Address
                                    </h3>
                                    <div>
                                        <label htmlFor="cert-address" className="cert-label">
                                            Complete Communication Address <span className="cert-req">*</span>
                                        </label>
                                        <textarea
                                            id="cert-address"
                                            name="address"
                                            rows="4"
                                            placeholder="Enter Door No., Street, Village/Town, City, District, State, and PIN Code..."
                                            value={formData.address}
                                            onChange={handleFieldChange}
                                            onBlur={() => handleBlur('address')}
                                            className={`cert-input ${fieldErrors.address ? 'cert-input-err' : ''}`}
                                            style={{ resize: 'vertical', minHeight: '105px' }}
                                            required
                                        />
                                        {fieldErrors.address && <p className="cert-err-msg">{fieldErrors.address}</p>}
                                    </div>
                                </div>

                                {/* Action Buttons: Submit & Reset */}
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        style={{
                                            flex: '1 1 240px',
                                            padding: '1.05rem 1.8rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: submitting ? '#475569' : 'linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%)',
                                            color: '#ffffff',
                                            fontWeight: '800',
                                            fontSize: '1.02rem',
                                            cursor: submitting ? 'not-allowed' : 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            boxShadow: '0 8px 22px rgba(27, 42, 107, 0.3)',
                                            transition: 'transform 0.15s ease'
                                        }}
                                    >
                                        <FaPaperPlane style={{ color: '#FCCA26' }} />
                                        {submitting ? 'Submitting Application...' : 'Submit Application'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={submitting}
                                        style={{
                                            flex: '0 1 180px',
                                            padding: '1.05rem 1.4rem',
                                            borderRadius: '12px',
                                            border: `1.5px solid ${inputBorder}`,
                                            background: 'transparent',
                                            color: textPrimary,
                                            fontWeight: '700',
                                            fontSize: '0.96rem',
                                            cursor: submitting ? 'not-allowed' : 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <FaRedo /> Reset Form
                                    </button>
                                </div>
                            </form>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Helpful Information Strip */}
                <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ background: cardBg, padding: '1.35rem', borderRadius: '14px', border: `1px solid ${borderCol}` }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 0.5rem 0', fontSize: '0.98rem', fontWeight: '800', color: isDark ? '#FCCA26' : '#1B2A6B' }}>
                            <FaInfoCircle /> Verification & Processing
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: textMuted, lineHeight: '1.55' }}>
                            Requests are verified by the COE office for no-dues clearance and academic record confirmation prior to issuance.
                        </p>
                    </div>
                    <div style={{ background: cardBg, padding: '1.35rem', borderRadius: '14px', border: `1px solid ${borderCol}` }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 0.5rem 0', fontSize: '0.98rem', fontWeight: '800', color: isDark ? '#FCCA26' : '#1B2A6B' }}>
                            <FaIdCard /> Collection Requirements
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: textMuted, lineHeight: '1.55' }}>
                            Please carry your Reference ID along with a valid Government / College Photo ID when collecting certificates in person.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />

            <style>{`
                .cert-label {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: ${isDark ? '#e2e8f0' : '#334155'};
                    margin-bottom: 0.45rem;
                }
                .cert-req {
                    color: #ef4444;
                    font-weight: 800;
                }
                .cert-input {
                    width: 100%;
                    padding: 0.85rem 1rem;
                    background: ${inputBg};
                    border: 1.5px solid ${inputBorder};
                    border-radius: 10px;
                    color: ${textPrimary};
                    font-size: 0.94rem;
                    font-family: inherit;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .cert-input:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
                }
                .cert-input-err {
                    border-color: #ef4444 !important;
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
                }
                .cert-err-msg {
                    margin: 0.35rem 0 0 0;
                    color: #ef4444;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default CertificateCollectionPage;
