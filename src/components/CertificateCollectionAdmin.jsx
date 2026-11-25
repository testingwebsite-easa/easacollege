import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import {
    FaSearch,
    FaFileExcel,
    FaFileCsv,
    FaEye,
    FaEdit,
    FaTrash,
    FaSync,
    FaCog,
    FaTimes,
    FaPlus,
    FaCheck,
    FaFilter,
    FaCertificate
} from 'react-icons/fa';
import API_BASE_URL from '../api';
import { useToast } from '../context/ToastContext';
import {
    CERTIFICATE_STATUSES,
    STATUS_STYLE_MAP,
    DEFAULT_CERTIFICATE_DOCUMENTS,
    OTHER_DOCUMENT_LABEL,
    isOtherDocumentOption,
    formatDocumentLabel,
    formatRequiredDocuments,
    getBatchYears,
    getPassingOutYears,
    buildDepartmentOptions,
    validateCertificateForm
} from '../utils/certificateConfig';

const CertificateCollectionAdmin = ({ token: propToken, onAuthError, lightTheme = false }) => {
    const { showToast } = useToast();

    const getAuthToken = useCallback(() => {
        return (
            propToken ||
            localStorage.getItem('admin_token') ||
            localStorage.getItem('authToken') ||
            localStorage.getItem('token') ||
            ''
        );
    }, [propToken]);

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // Search & Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [batchFilter, setBatchFilter] = useState('all');
    const [passingOutFilter, setPassingOutFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modals & Interactive States
    const [viewingApp, setViewingApp] = useState(null);
    const [editingApp, setEditingApp] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const [editErrors, setEditErrors] = useState({});
    const [savingEdit, setSavingEdit] = useState(false);

    // Configurable Document Options Modal
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [docOptions, setDocOptions] = useState(DEFAULT_CERTIFICATE_DOCUMENTS);
    const [newOptionLabel, setNewOptionLabel] = useState('');
    const [newOptionDesc, setNewOptionDesc] = useState('');
    const [configSaving, setConfigSaving] = useState(false);

    // Department list
    const [apiDepartments, setApiDepartments] = useState([]);
    const batchYears = useMemo(() => getBatchYears(), []);
    const passingOutYears = useMemo(() => getPassingOutYears(), []);
    const departmentGroups = useMemo(() => buildDepartmentOptions(apiDepartments), [apiDepartments]);

    const handleAuthFailure = useCallback((status) => {
        if (status === 401 || status === 403) {
            setErrorMsg('Session expired or unauthorized. Please log in with an admin account.');
            if (onAuthError) onAuthError(status);
            return true;
        }
        return false;
    }, [onAuthError]);

    const fetchApplications = useCallback(async () => {
        const token = getAuthToken();
        if (!token) {
            setLoading(false);
            setErrorMsg('Admin authentication token missing.');
            return;
        }

        setLoading(true);
        setErrorMsg('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates`, {
                cache: 'no-store',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (handleAuthFailure(res.status)) {
                setLoading(false);
                return;
            }

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to load certificate applications');
            }

            const data = await res.json();
            setApplications(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Certificate fetch error:', err);
            setErrorMsg(err.message || 'Unable to fetch certificate applications');
        } finally {
            setLoading(false);
        }
    }, [getAuthToken, handleAuthFailure]);

    const fetchDocOptions = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/options?all=true`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setDocOptions(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch certificate document options:', err);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
        fetchDocOptions();
        fetch(`${API_BASE_URL}/api/departments`)
            .then(r => (r.ok ? r.json() : []))
            .then(d => {
                if (Array.isArray(d)) setApiDepartments(d);
            })
            .catch(() => {});
    }, [fetchApplications, fetchDocOptions]);

    // Merge static/API department list with any historical department strings in applications
    const allFilterDepartments = useMemo(() => {
        const set = new Set(departmentGroups.all);
        applications.forEach(a => {
            if (a.department) set.add(a.department);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [departmentGroups, applications]);

    // Filtered applications
    const filteredApplications = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return applications.filter(app => {
            if (q) {
                const regMatch = (app.registrationNumber || '').toLowerCase().includes(q);
                const nameMatch = (app.studentName || '').toLowerCase().includes(q);
                const idMatch = (app.applicationId || '').toLowerCase().includes(q);
                const phoneMatch = (app.contactNumber || '').toLowerCase().includes(q);
                const emailMatch = (app.email || '').toLowerCase().includes(q);
                const otherDocMatch = (app.otherDocument || '').toLowerCase().includes(q);
                if (!regMatch && !nameMatch && !idMatch && !phoneMatch && !emailMatch && !otherDocMatch) return false;
            }
            if (departmentFilter !== 'all' && app.department !== departmentFilter) return false;
            if (batchFilter !== 'all' && String(app.batch) !== batchFilter) return false;
            if (passingOutFilter !== 'all' && String(app.passingOutYear) !== passingOutFilter) return false;
            if (statusFilter !== 'all' && app.status !== statusFilter) return false;
            return true;
        });
    }, [applications, searchQuery, departmentFilter, batchFilter, passingOutFilter, statusFilter]);

    // Stats summary
    const stats = useMemo(() => {
        const counts = { total: applications.length, Pending: 0, Processing: 0, 'Ready for Collection': 0, Collected: 0 };
        applications.forEach(a => {
            const st = a.status || 'Pending';
            if (counts[st] !== undefined) counts[st] += 1;
        });
        return counts;
    }, [applications]);

    const handleStatusUpdate = async (id, newStatus) => {
        const token = getAuthToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (handleAuthFailure(res.status)) return;

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to update status');
            }

            const updatedApp = data.application || { status: newStatus };
            setApplications(prev => prev.map(item => (item._id === id ? { ...item, ...updatedApp } : item)));
            if (viewingApp && viewingApp._id === id) {
                setViewingApp(prev => ({ ...prev, ...updatedApp }));
            }
            showToast(`Status updated to "${newStatus}"`, 'success', 'Status Updated');
        } catch (err) {
            console.error('Status update error:', err);
            showToast(err.message || 'Failed to update status', 'error', 'Error');
        }
    };

    const handleDeleteApplication = async (id, regNo) => {
        if (!window.confirm(`Delete certificate application for ${regNo || 'this student'}?`)) return;
        const token = getAuthToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (handleAuthFailure(res.status)) return;
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to delete application');
            }
            setApplications(prev => prev.filter(a => a._id !== id));
            if (viewingApp?._id === id) setViewingApp(null);
            showToast('Application record deleted.', 'success', 'Deleted');
        } catch (err) {
            showToast(err.message || 'Delete failed', 'error', 'Error');
        }
    };

    const openEditModal = (app) => {
        setEditingApp(app);
        setEditForm({
            dateOfApplication: app.dateOfApplication || '',
            registrationNumber: app.registrationNumber || '',
            studentName: app.studentName || '',
            department: app.department || '',
            batch: String(app.batch || ''),
            contactNumber: app.contactNumber || '',
            email: app.email || '',
            fatherName: app.fatherName || '',
            passingOutYear: String(app.passingOutYear || ''),
            requiredDocuments: Array.isArray(app.requiredDocuments) ? [...app.requiredDocuments] : [],
            otherDocument: app.otherDocument || '',
            address: app.address || '',
            status: app.status || 'Pending',
            adminRemarks: app.adminRemarks || ''
        });
        setEditErrors({});
    };

    const handleEditDocToggle = (label) => {
        setEditForm(prev => {
            const exists = prev.requiredDocuments.includes(label);
            const nextDocs = exists
                ? prev.requiredDocuments.filter(d => d !== label)
                : [...prev.requiredDocuments, label];
            const hasOther = nextDocs.some(d => isOtherDocumentOption(d));
            return {
                ...prev,
                requiredDocuments: nextDocs,
                otherDocument: hasOther ? prev.otherDocument : ''
            };
        });
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editForm || savingEdit) return;

        const errs = validateCertificateForm(editForm);
        setEditErrors(errs);
        if (Object.keys(errs).length > 0) {
            showToast(Object.values(errs)[0], 'warning', 'Validation Error');
            return;
        }

        setSavingEdit(true);
        const token = getAuthToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/${editingApp._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (handleAuthFailure(res.status)) return;
            const data = await res.json();
            if (!res.ok) {
                if (data.errors) setEditErrors(data.errors);
                throw new Error(data.error || 'Failed to update application');
            }

            setApplications(prev => prev.map(item => (item._id === editingApp._id ? data.application : item)));
            setEditingApp(null);
            setEditForm(null);
            showToast('Application details updated successfully.', 'success', 'Saved');
        } catch (err) {
            showToast(err.message || 'Failed to save changes', 'error', 'Update Error');
        } finally {
            setSavingEdit(false);
        }
    };

    const handleExportExcel = () => {
        if (filteredApplications.length === 0) {
            showToast('No records to export.', 'warning', 'Empty Export');
            return;
        }
        const rows = filteredApplications.map((app, idx) => ({
            'S.No': idx + 1,
            'Application ID': app.applicationId || '',
            'Date of Application': app.dateOfApplication || '',
            'Registration Number': app.registrationNumber || '',
            'Student Name': app.studentName || '',
            "Father's Name": app.fatherName || '',
            'Department': app.department || '',
            'Batch': app.batch || '',
            'Year of Passing Out': app.passingOutYear || '',
            'Contact Number': app.contactNumber || '',
            'Email ID': app.email || '',
            'Required Documents': formatRequiredDocuments(app.requiredDocuments, app.otherDocument).join(', '),
            'Address': app.address || '',
            'Status': app.status || 'Pending',
            'Admin Remarks': app.adminRemarks || '',
            'Submitted Timestamp': app.submittedAt
                ? new Date(app.submittedAt).toLocaleString('en-IN')
                : (app.createdAt ? new Date(app.createdAt).toLocaleString('en-IN') : '')
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Certificate Collection');
        XLSX.writeFile(workbook, `certificate_collection_${new Date().toISOString().slice(0, 10)}.xlsx`);
        showToast(`Exported ${rows.length} records to Excel.`, 'success', 'Excel Exported');
    };

    const handleExportCsv = async () => {
        if (filteredApplications.length === 0) {
            showToast('No records to export.', 'warning', 'Empty Export');
            return;
        }
        const token = getAuthToken();
        try {
            const params = new URLSearchParams();
            if (searchQuery.trim()) params.append('search', searchQuery.trim());
            if (departmentFilter !== 'all') params.append('department', departmentFilter);
            if (batchFilter !== 'all') params.append('batch', batchFilter);
            if (passingOutFilter !== 'all') params.append('passingOutYear', passingOutFilter);
            if (statusFilter !== 'all') params.append('status', statusFilter);

            const res = await fetch(`${API_BASE_URL}/api/certificates/export?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (handleAuthFailure(res.status)) return;
            if (!res.ok) throw new Error('CSV export failed');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate_collection_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            showToast('CSV exported successfully.', 'success', 'CSV Exported');
        } catch (err) {
            showToast(err.message || 'CSV export failed', 'error', 'Export Error');
        }
    };

    // Document options management
    const handleAddDocOption = async (e) => {
        e.preventDefault();
        const label = newOptionLabel.trim();
        if (!label) return;
        setConfigSaving(true);
        const token = getAuthToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/options`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    label,
                    description: newOptionDesc.trim(),
                    order: docOptions.length + 1
                })
            });
            if (handleAuthFailure(res.status)) return;
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to add option');
            setDocOptions(prev => [...prev, data.option]);
            setNewOptionLabel('');
            setNewOptionDesc('');
            showToast('Document option added.', 'success', 'Option Added');
        } catch (err) {
            showToast(err.message, 'error', 'Error');
        } finally {
            setConfigSaving(false);
        }
    };

    const handleToggleDocOption = async (opt) => {
        if (!opt._id) return;
        const token = getAuthToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/options/${opt._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !opt.isActive })
            });
            if (handleAuthFailure(res.status)) return;
            const data = await res.json();
            if (res.ok && data.option) {
                setDocOptions(prev => prev.map(o => (o._id === opt._id ? data.option : o)));
            }
        } catch (err) {
            console.error('Toggle option failed:', err);
            showToast('Failed to toggle option', 'error', 'Error');
        }
    };

    const handleDeleteDocOption = async (opt) => {
        if (!opt._id || !window.confirm(`Remove document option "${opt.label}"?`)) return;
        const token = getAuthToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/certificates/options/${opt._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (handleAuthFailure(res.status)) return;
            if (res.ok) {
                setDocOptions(prev => prev.filter(o => o._id !== opt._id));
                showToast('Document option deleted.', 'success', 'Removed');
            }
        } catch (err) {
            console.error('Delete option failed:', err);
            showToast('Failed to delete option', 'error', 'Error');
        }
    };

    const clearFilters = () => {
        setSearchQuery('');
        setDepartmentFilter('all');
        setBatchFilter('all');
        setPassingOutFilter('all');
        setStatusFilter('all');
    };

    // Theme-safe colors (AdminDashboard uses dark CSS vars, dashboards/AdminDashboard uses light styles)
    const surfaceBg = lightTheme ? '#ffffff' : 'var(--bg-section, #0f172a)';
    const cardBg = lightTheme ? '#f8fafc' : 'var(--bg-card, rgba(30, 41, 59, 0.7))';
    const textCol = lightTheme ? '#0f172a' : 'var(--text-main, #f8fafc)';
    const mutedCol = lightTheme ? '#64748b' : 'var(--text-muted, #94a3b8)';
    const borderCol = lightTheme ? '#e2e8f0' : 'var(--glass-border, rgba(255,255,255,0.12))';

    return (
        <div style={{ color: textCol }}>
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FaCertificate style={{ fontSize: '1.5rem', color: '#FCCA26' }} />
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>Certificate Collection Requests</h3>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: mutedCol }}>
                            Review, filter, update status, edit, and export student certificate applications
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={() => setShowConfigModal(true)}
                        style={{
                            padding: '0.55rem 0.95rem',
                            borderRadius: '8px',
                            border: `1px solid ${borderCol}`,
                            background: surfaceBg,
                            color: textCol,
                            fontWeight: '600',
                            fontSize: '0.84rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <FaCog /> Configure Documents
                    </button>
                    <button
                        type="button"
                        onClick={handleExportExcel}
                        style={{
                            padding: '0.55rem 0.95rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#16a34a',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '0.84rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <FaFileExcel /> Export Excel
                    </button>
                    <button
                        type="button"
                        onClick={handleExportCsv}
                        style={{
                            padding: '0.55rem 0.95rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#2563eb',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '0.84rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <FaFileCsv /> Export CSV
                    </button>
                    <button
                        type="button"
                        onClick={fetchApplications}
                        style={{
                            padding: '0.55rem 0.9rem',
                            borderRadius: '8px',
                            border: `1px solid ${borderCol}`,
                            background: surfaceBg,
                            color: textCol,
                            fontWeight: '600',
                            fontSize: '0.84rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <FaSync /> Refresh
                    </button>
                </div>
            </div>

            {/* Summary Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'Total Requests', value: stats.total, color: '#3b82f6' },
                    { label: 'Pending', value: stats.Pending, color: '#f59e0b' },
                    { label: 'Processing', value: stats.Processing, color: '#0ea5e9' },
                    { label: 'Ready for Collection', value: stats['Ready for Collection'], color: '#10b981' },
                    { label: 'Collected', value: stats.Collected, color: '#64748b' }
                ].map(card => (
                    <div
                        key={card.label}
                        style={{
                            background: cardBg,
                            border: `1px solid ${borderCol}`,
                            borderLeft: `4px solid ${card.color}`,
                            borderRadius: '10px',
                            padding: '0.85rem 1rem'
                        }}
                    >
                        <div style={{ fontSize: '0.75rem', color: mutedCol, fontWeight: '700', textTransform: 'uppercase' }}>{card.label}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: '900', marginTop: '0.2rem', color: textCol }}>{card.value}</div>
                    </div>
                ))}
            </div>

            {/* Search & Filters Bar */}
            <div style={{
                background: cardBg,
                border: `1px solid ${borderCol}`,
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                alignItems: 'end'
            }}>
                <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '0.3rem' }}>
                        <FaSearch /> Search Reg No / Name
                    </label>
                    <input
                        type="text"
                        placeholder="Reg No, Name, Email, Ref ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.55rem 0.75rem',
                            borderRadius: '8px',
                            border: `1px solid ${borderCol}`,
                            background: surfaceBg,
                            color: textCol,
                            fontSize: '0.86rem'
                        }}
                    />
                </div>

                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '0.3rem' }}>
                        <FaFilter /> Department
                    </label>
                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem 0.65rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: surfaceBg, color: textCol, fontSize: '0.86rem' }}
                    >
                        <option value="all">All Departments</option>
                        {allFilterDepartments.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '0.3rem' }}>Batch</label>
                    <select
                        value={batchFilter}
                        onChange={(e) => setBatchFilter(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem 0.65rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: surfaceBg, color: textCol, fontSize: '0.86rem' }}
                    >
                        <option value="all">All Batches</option>
                        {batchYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '0.3rem' }}>Passing Out Year</label>
                    <select
                        value={passingOutFilter}
                        onChange={(e) => setPassingOutFilter(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem 0.65rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: surfaceBg, color: textCol, fontSize: '0.86rem' }}
                    >
                        <option value="all">All Years</option>
                        {passingOutYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '0.3rem' }}>Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: '100%', padding: '0.55rem 0.65rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: surfaceBg, color: textCol, fontSize: '0.86rem' }}
                    >
                        <option value="all">All Statuses</option>
                        {CERTIFICATE_STATUSES.map(st => (
                            <option key={st} value={st}>{st}</option>
                        ))}
                    </select>
                </div>

                {(searchQuery || departmentFilter !== 'all' || batchFilter !== 'all' || passingOutFilter !== 'all' || statusFilter !== 'all') && (
                    <div>
                        <button
                            type="button"
                            onClick={clearFilters}
                            style={{
                                width: '100%',
                                padding: '0.55rem 0.85rem',
                                borderRadius: '8px',
                                border: `1px solid ${borderCol}`,
                                background: 'transparent',
                                color: '#ef4444',
                                fontWeight: '700',
                                fontSize: '0.84rem',
                                cursor: 'pointer'
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {errorMsg && (
                <div style={{ padding: '0.9rem 1rem', background: 'rgba(239, 68, 68, 0.14)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontWeight: '600' }}>
                    {errorMsg}
                </div>
            )}

            {/* Table */}
            <div style={{ overflowX: 'auto', background: cardBg, borderRadius: '12px', border: `1px solid ${borderCol}` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1050px' }}>
                    <thead>
                        <tr style={{ background: lightTheme ? '#f1f5f9' : 'rgba(0,0,0,0.3)', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', color: mutedCol }}>
                            <th style={{ padding: '0.9rem 1rem' }}>Ref ID / Date</th>
                            <th style={{ padding: '0.9rem 1rem' }}>Reg No & Student</th>
                            <th style={{ padding: '0.9rem 1rem' }}>Dept / Batch / Pass Out</th>
                            <th style={{ padding: '0.9rem 1rem' }}>Contact</th>
                            <th style={{ padding: '0.9rem 1rem' }}>Required Documents</th>
                            <th style={{ padding: '0.9rem 1rem' }}>Status</th>
                            <th style={{ padding: '0.9rem 1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" style={{ padding: '2.5rem', textAlign: 'center', color: mutedCol }}>
                                    Loading certificate collection records...
                                </td>
                            </tr>
                        ) : filteredApplications.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ padding: '2.5rem', textAlign: 'center', color: mutedCol }}>
                                    No certificate collection applications match the current filters.
                                </td>
                            </tr>
                        ) : (
                            filteredApplications.map(app => {
                                const stStyle = STATUS_STYLE_MAP[app.status] || STATUS_STYLE_MAP.Pending;
                                return (
                                    <tr key={app._id} style={{ borderBottom: `1px solid ${borderCol}`, fontSize: '0.88rem' }}>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top' }}>
                                            <div style={{ fontFamily: 'monospace', fontWeight: '800', color: '#60a5fa', fontSize: '0.84rem' }}>
                                                {app.applicationId}
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: mutedCol, marginTop: '3px' }}>
                                                App: {app.dateOfApplication}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: mutedCol }}>
                                                {app.submittedAt ? new Date(app.submittedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top' }}>
                                            <div style={{ fontWeight: '800' }}>{app.registrationNumber}</div>
                                            <div style={{ fontWeight: '600', marginTop: '2px' }}>{app.studentName}</div>
                                            <div style={{ fontSize: '0.76rem', color: mutedCol }}>S/o, D/o: {app.fatherName}</div>
                                        </td>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top' }}>
                                            <div style={{ fontWeight: '600', maxWidth: '220px' }}>{app.department}</div>
                                            <div style={{ fontSize: '0.78rem', color: mutedCol, marginTop: '3px' }}>
                                                Batch: <strong>{app.batch}</strong> • Pass: <strong>{app.passingOutYear}</strong>
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top' }}>
                                            <div style={{ fontWeight: '600' }}>{app.contactNumber}</div>
                                            {app.email && <div style={{ fontSize: '0.76rem', color: mutedCol, marginTop: '2px', wordBreak: 'break-word' }}>{app.email}</div>}
                                        </td>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top', maxWidth: '240px' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {(app.requiredDocuments || []).map((doc, idx) => (
                                                    <span key={idx} style={{
                                                        background: lightTheme ? '#e0e7ff' : 'rgba(59, 130, 246, 0.18)',
                                                        color: lightTheme ? '#1e3a8a' : '#93c5fd',
                                                        padding: '2px 7px',
                                                        borderRadius: '999px',
                                                        fontSize: '0.73rem',
                                                        fontWeight: '700'
                                                    }}>
                                                        {formatDocumentLabel(doc, app.otherDocument)}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top' }}>
                                            <select
                                                value={app.status || 'Pending'}
                                                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                                aria-label={`Status for ${app.registrationNumber}`}
                                                style={{
                                                    padding: '0.35rem 0.55rem',
                                                    borderRadius: '6px',
                                                    border: `1.5px solid ${stStyle.border}`,
                                                    background: stStyle.bg,
                                                    color: stStyle.color,
                                                    fontWeight: '800',
                                                    fontSize: '0.78rem',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {CERTIFICATE_STATUSES.map(st => (
                                                    <option key={st} value={st}>{st}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td style={{ padding: '0.9rem 1rem', verticalAlign: 'top' }}>
                                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                <button
                                                    type="button"
                                                    title="View Details"
                                                    onClick={() => setViewingApp(app)}
                                                    style={{ background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.42rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    type="button"
                                                    title="Edit Application"
                                                    onClick={() => openEditModal(app)}
                                                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.42rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    type="button"
                                                    title="Delete Application"
                                                    onClick={() => handleDeleteApplication(app._id, app.registrationNumber)}
                                                    style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.42rem 0.6rem', borderRadius: '6px', cursor: 'pointer' }}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* ============================================================== */}
            {/* VIEW APPLICATION DETAILS MODAL                                 */}
            {/* ============================================================== */}
            {viewingApp && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100, padding: '1rem' }}>
                    <div style={{ background: surfaceBg, color: textCol, borderRadius: '16px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', border: `1px solid ${borderCol}`, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderCol}`, paddingBottom: '0.9rem', marginBottom: '1.2rem' }}>
                            <div>
                                <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#60a5fa', fontSize: '0.88rem' }}>{viewingApp.applicationId}</span>
                                <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.3rem', fontWeight: '800' }}>Application Full Details</h3>
                            </div>
                            <button type="button" onClick={() => setViewingApp(null)} style={{ background: 'transparent', border: 'none', color: mutedCol, fontSize: '1.3rem', cursor: 'pointer' }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>REGISTRATION NUMBER</span><strong>{viewingApp.registrationNumber}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>STUDENT NAME</span><strong>{viewingApp.studentName}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>FATHER&apos;S NAME</span><strong>{viewingApp.fatherName}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>CONTACT NUMBER</span><strong>{viewingApp.contactNumber}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>EMAIL ID</span><strong>{viewingApp.email || 'N/A'}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>DEPARTMENT</span><strong>{viewingApp.department}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>BATCH / PASSING OUT YEAR</span><strong>{viewingApp.batch} / {viewingApp.passingOutYear}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>DATE OF APPLICATION</span><strong>{viewingApp.dateOfApplication}</strong></div>
                            <div><span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>SUBMITTED TIMESTAMP</span><strong>{viewingApp.submittedAt ? new Date(viewingApp.submittedAt).toLocaleString('en-IN') : 'N/A'}</strong></div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700', marginBottom: '0.35rem' }}>REQUIRED DOCUMENTS</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {(viewingApp.requiredDocuments || []).map((doc, idx) => (
                                        <span key={idx} style={{ background: lightTheme ? '#e0e7ff' : 'rgba(59, 130, 246, 0.2)', color: lightTheme ? '#1e3a8a' : '#93c5fd', padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700' }}>
                                            {formatDocumentLabel(doc, viewingApp.otherDocument)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>COMMUNICATION ADDRESS</span>
                                <p style={{ margin: '0.25rem 0 0 0', lineHeight: '1.5' }}>{viewingApp.address}</p>
                            </div>
                            {viewingApp.adminRemarks && (
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <span style={{ color: mutedCol, fontSize: '0.74rem', display: 'block', fontWeight: '700' }}>ADMIN REMARKS</span>
                                    <p style={{ margin: '0.25rem 0 0 0' }}>{viewingApp.adminRemarks}</p>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${borderCol}`, flexWrap: 'wrap', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Status:</span>
                                <select
                                    value={viewingApp.status || 'Pending'}
                                    onChange={(e) => handleStatusUpdate(viewingApp._id, e.target.value)}
                                    style={{ padding: '0.4rem 0.7rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol, fontWeight: '700' }}
                                >
                                    {CERTIFICATE_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                <button
                                    type="button"
                                    onClick={() => { const app = viewingApp; setViewingApp(null); openEditModal(app); }}
                                    style={{ padding: '0.55rem 1.1rem', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
                                >
                                    Edit Record
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewingApp(null)}
                                    style={{ padding: '0.55rem 1.1rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: 'transparent', color: textCol, fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* EDIT APPLICATION MODAL                                         */}
            {/* ============================================================== */}
            {editingApp && editForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100, padding: '1rem' }}>
                    <div style={{ background: surfaceBg, color: textCol, borderRadius: '16px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', border: `1px solid ${borderCol}`, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderCol}`, paddingBottom: '0.9rem', marginBottom: '1.2rem' }}>
                            <div>
                                <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#60a5fa', fontSize: '0.88rem' }}>{editingApp.applicationId}</span>
                                <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.25rem', fontWeight: '800' }}>Edit Application Details</h3>
                            </div>
                            <button type="button" onClick={() => setEditingApp(null)} style={{ background: 'transparent', border: 'none', color: mutedCol, fontSize: '1.3rem', cursor: 'pointer' }}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Date of Application *</label>
                                    <input
                                        type="date"
                                        value={editForm.dateOfApplication}
                                        onChange={e => setEditForm({ ...editForm, dateOfApplication: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    />
                                    {editErrors.dateOfApplication && <small style={{ color: '#ef4444' }}>{editErrors.dateOfApplication}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Registration Number *</label>
                                    <input
                                        type="text"
                                        value={editForm.registrationNumber}
                                        onChange={e => setEditForm({ ...editForm, registrationNumber: e.target.value.toUpperCase() })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    />
                                    {editErrors.registrationNumber && <small style={{ color: '#ef4444' }}>{editErrors.registrationNumber}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Student Name *</label>
                                    <input
                                        type="text"
                                        value={editForm.studentName}
                                        onChange={e => setEditForm({ ...editForm, studentName: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    />
                                    {editErrors.studentName && <small style={{ color: '#ef4444' }}>{editErrors.studentName}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Father&apos;s Name *</label>
                                    <input
                                        type="text"
                                        value={editForm.fatherName}
                                        onChange={e => setEditForm({ ...editForm, fatherName: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    />
                                    {editErrors.fatherName && <small style={{ color: '#ef4444' }}>{editErrors.fatherName}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Department *</label>
                                    <select
                                        value={editForm.department}
                                        onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    >
                                        <option value="">Select Department</option>
                                        <optgroup label="Undergraduate (B.E. / B.Tech.)">
                                            {departmentGroups.ug.map(d => <option key={`ug-${d}`} value={d}>{d}</option>)}
                                        </optgroup>
                                        <optgroup label="Postgraduate (M.E. / MBA)">
                                            {departmentGroups.pg.map(d => <option key={`pg-${d}`} value={d}>{d}</option>)}
                                        </optgroup>
                                        <optgroup label="Doctoral / Research (Ph.D.)">
                                            {departmentGroups.phd.map(d => <option key={`phd-${d}`} value={d}>{d}</option>)}
                                        </optgroup>
                                        {allFilterDepartments.filter(d => !departmentGroups.all.includes(d)).map(d => (
                                            <option key={`legacy-${d}`} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    {editErrors.department && <small style={{ color: '#ef4444' }}>{editErrors.department}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Batch *</label>
                                    <select
                                        value={editForm.batch}
                                        onChange={e => setEditForm({ ...editForm, batch: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    >
                                        <option value="">Select Batch</option>
                                        {batchYears.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {editErrors.batch && <small style={{ color: '#ef4444' }}>{editErrors.batch}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Passing Out Year *</label>
                                    <select
                                        value={editForm.passingOutYear}
                                        onChange={e => setEditForm({ ...editForm, passingOutYear: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    >
                                        <option value="">Select Year</option>
                                        {passingOutYears.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {editErrors.passingOutYear && <small style={{ color: '#ef4444' }}>{editErrors.passingOutYear}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Contact Number *</label>
                                    <input
                                        type="tel"
                                        value={editForm.contactNumber}
                                        onChange={e => setEditForm({ ...editForm, contactNumber: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    />
                                    {editErrors.contactNumber && <small style={{ color: '#ef4444' }}>{editErrors.contactNumber}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Email ID *</label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    />
                                    {editErrors.email && <small style={{ color: '#ef4444' }}>{editErrors.email}</small>}
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Application Status *</label>
                                    <select
                                        value={editForm.status}
                                        onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                                        style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                    >
                                        {CERTIFICATE_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '6px' }}>Required Documents *</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '6px' }}>
                                    {Array.from(new Set([...docOptions.map(o => o.label), OTHER_DOCUMENT_LABEL, ...(editForm.requiredDocuments || [])])).map(label => {
                                        const checked = (editForm.requiredDocuments || []).includes(label);
                                        return (
                                            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.45rem 0.6rem', borderRadius: '6px', border: `1px solid ${borderCol}`, background: cardBg, cursor: 'pointer', fontSize: '0.82rem' }}>
                                                <input type="checkbox" checked={checked} onChange={() => handleEditDocToggle(label)} />
                                                <span>{label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {editErrors.requiredDocuments && <small style={{ color: '#ef4444' }}>{editErrors.requiredDocuments}</small>}
                                {(editForm.requiredDocuments || []).some(d => isOtherDocumentOption(d)) && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>
                                            Specify Other Document(s) *
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={200}
                                            placeholder="Enter specified other document(s)"
                                            value={editForm.otherDocument || ''}
                                            onChange={e => setEditForm({ ...editForm, otherDocument: e.target.value })}
                                            style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${editErrors.otherDocument ? '#ef4444' : borderCol}`, background: cardBg, color: textCol }}
                                        />
                                        {editErrors.otherDocument && <small style={{ color: '#ef4444' }}>{editErrors.otherDocument}</small>}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Address *</label>
                                <textarea
                                    rows="3"
                                    value={editForm.address}
                                    onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                />
                                {editErrors.address && <small style={{ color: '#ef4444' }}>{editErrors.address}</small>}
                            </div>

                            <div>
                                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: mutedCol, display: 'block', marginBottom: '4px' }}>Admin Remarks (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Verified by COE desk, ready at counter 2..."
                                    value={editForm.adminRemarks}
                                    onChange={e => setEditForm({ ...editForm, adminRemarks: e.target.value })}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg, color: textCol }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                                <button type="button" onClick={() => setEditingApp(null)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: 'transparent', color: textCol, fontWeight: '600', cursor: 'pointer' }}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={savingEdit} style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <FaCheck /> {savingEdit ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* CONFIGURABLE DOCUMENT OPTIONS MODAL                            */}
            {/* ============================================================== */}
            {showConfigModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100, padding: '1rem' }}>
                    <div style={{ background: surfaceBg, color: textCol, borderRadius: '16px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem', border: `1px solid ${borderCol}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderCol}`, paddingBottom: '0.8rem', marginBottom: '1.1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Configure Required Document Options</h3>
                            <button type="button" onClick={() => setShowConfigModal(false)} style={{ background: 'transparent', border: 'none', color: mutedCol, fontSize: '1.3rem', cursor: 'pointer' }}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleAddDocOption} style={{ display: 'grid', gap: '0.6rem', background: cardBg, padding: '1rem', borderRadius: '10px', border: `1px solid ${borderCol}`, marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.84rem', fontWeight: '700' }}>Add New Document Option</div>
                            <input
                                type="text"
                                placeholder="Document Name (e.g. Rank Certificate)"
                                value={newOptionLabel}
                                onChange={e => setNewOptionLabel(e.target.value)}
                                required
                                style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: surfaceBg, color: textCol }}
                            />
                            <input
                                type="text"
                                placeholder="Short Description (optional)"
                                value={newOptionDesc}
                                onChange={e => setNewOptionDesc(e.target.value)}
                                style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: surfaceBg, color: textCol }}
                            />
                            <button type="submit" disabled={configSaving} style={{ padding: '0.55rem 1rem', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                <FaPlus /> {configSaving ? 'Adding...' : 'Add Option'}
                            </button>
                        </form>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {docOptions.map((opt, idx) => (
                                <div key={opt._id || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.9rem', borderRadius: '8px', border: `1px solid ${borderCol}`, background: cardBg }}>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.9rem', opacity: opt.isActive === false ? 0.5 : 1 }}>{opt.label}</div>
                                        {opt.description && <div style={{ fontSize: '0.76rem', color: mutedCol }}>{opt.description}</div>}
                                    </div>
                                    {opt._id && (
                                        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                                            <button
                                                type="button"
                                                onClick={() => handleToggleDocOption(opt)}
                                                style={{
                                                    padding: '0.3rem 0.65rem',
                                                    borderRadius: '6px',
                                                    border: 'none',
                                                    background: opt.isActive !== false ? '#16a34a' : '#64748b',
                                                    color: '#fff',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {opt.isActive !== false ? 'Active' : 'Hidden'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteDocOption(opt)}
                                                style={{ padding: '0.3rem 0.55rem', borderRadius: '6px', border: 'none', background: '#ef4444', color: '#fff', fontSize: '0.75rem', cursor: 'pointer' }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificateCollectionAdmin;
