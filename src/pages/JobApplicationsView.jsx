import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import API_BASE_URL from '../api';
import { useTheme } from '../context/ThemeContext';
import {
    FaDownload, FaLock, FaUser, FaBriefcase, FaUsers,
    FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter,
    FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaMapMarkerAlt,
    FaMoneyBillWave, FaArrowLeft, FaExternalLinkAlt, FaTimes
} from 'react-icons/fa';
import GlobalHero from '../components/GlobalHero';

const defaultJobForm = {
    title: '',
    department: 'Computer Science & Engineering',
    location: 'Navakkarai, Coimbatore, Tamil Nadu',
    type: 'Full-time',
    salary: 'As per AICTE / 7th Pay Norms',
    status: 'Active',
    closingDate: '',
    description: '',
    requirements: '',
    responsibilities: ''
};

const departmentOptions = [
    'Computer Science & Engineering',
    'Artificial Intelligence & Data Science',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Biomedical Engineering',
    'Agricultural Engineering',
    'Civil Engineering',
    'Science & Humanities',
    'Management Studies (MBA)',
    'Training & Placement Cell',
    'Administrative & Support Staff',
    'Other'
];

const JobApplicationsView = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Navigation Tab
    const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'postings'

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    // Data State
    const [applications, setApplications] = useState([]);
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Search & Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    // Job Posting Form Modal State
    const [jobModalOpen, setJobModalOpen] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);
    const [jobForm, setJobForm] = useState(defaultJobForm);
    const [submittingJob, setSubmittingJob] = useState(false);

    // Application Detail Modal State
    const [selectedApp, setSelectedApp] = useState(null);

    // PDF Modal State
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [pdfError, setPdfError] = useState(false);

    // Styles & Theme Palette
    const colors = {
        bg: isDark ? '#0b1120' : '#f8fafc',
        cardBg: isDark ? '#1e293b' : '#ffffff',
        subBg: isDark ? '#0f172a' : '#f1f5f9',
        text: isDark ? '#f1f5f9' : '#0f172a',
        muted: isDark ? '#94a3b8' : '#64748b',
        border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(226, 232, 240, 0.9)',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        accent: '#10b981',
        danger: '#ef4444',
        hover: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
    };

    // Check existing session
    useEffect(() => {
        const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            fetchApplications();
            fetchCareers();
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (credentials.username.toLowerCase() !== 'admin') {
            alert("Invalid Username");
            return;
        }

        try {
            const baseUrl = API_BASE_URL;
            const response = await fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: credentials.username, password: credentials.password })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('admin_token', data.token);
                setIsAuthenticated(true);
                fetchApplications();
                fetchCareers();
            } else {
                alert("Invalid Password");
            }
        } catch (error) {
            console.error(error);
            alert("Login Verification Failed. Check backend connection.");
        }
    };

    const fetchApplications = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch(`${API_BASE_URL}/api/job-applications`, { headers });
            if (res.ok) {
                const data = await res.json();
                setApplications(Array.isArray(data) ? data : []);
            } else {
                const errText = await res.text();
                setError(`Failed to fetch applications: ${errText}`);
            }
        } catch (err) {
            console.error("Fetch applications error:", err);
            setError(`Fetch error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchCareers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/careers`);
            if (res.ok) {
                const data = await res.json();
                setCareers(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error("Fetch careers error:", err);
        }
    };

    // Application Status Update
    const handleUpdateAppStatus = async (appId, newStatus) => {
        try {
            const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE_URL}/api/job-applications/${appId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setApplications(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus } : a));
                if (selectedApp && selectedApp._id === appId) {
                    setSelectedApp(prev => ({ ...prev, status: newStatus }));
                }
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert('Error updating status');
        }
    };

    // Delete Application
    const handleDeleteApplication = async (appId) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        try {
            const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

            const res = await fetch(`${API_BASE_URL}/api/job-applications/${appId}`, {
                method: 'DELETE',
                headers
            });
            if (res.ok) {
                setApplications(prev => prev.filter(a => a._id !== appId));
                if (selectedApp && selectedApp._id === appId) {
                    setSelectedApp(null);
                }
                alert("Application deleted successfully");
            } else {
                alert("Failed to delete application");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting application");
        }
    };

    // Open Job Form for Create / Edit
    const handleOpenJobModal = (job = null) => {
        if (job) {
            setEditingJobId(job._id);
            setJobForm({
                title: job.title || '',
                department: job.department || 'Computer Science & Engineering',
                location: job.location || 'Navakkarai, Coimbatore, Tamil Nadu',
                type: job.type || 'Full-time',
                salary: job.salary || 'As per AICTE / 7th Pay Norms',
                status: job.status || 'Active',
                closingDate: job.closingDate ? job.closingDate.split('T')[0] : '',
                description: job.description || '',
                requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
                responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || '')
            });
        } else {
            setEditingJobId(null);
            setJobForm(defaultJobForm);
        }
        setJobModalOpen(true);
    };

    // Save Job (POST / PUT)
    const handleSaveJob = async (e) => {
        e.preventDefault();
        setSubmittingJob(true);
        try {
            const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const payload = {
                ...jobForm,
                requirements: jobForm.requirements ? jobForm.requirements.split('\n').map(s => s.trim()).filter(Boolean) : [],
                responsibilities: jobForm.responsibilities ? jobForm.responsibilities.split('\n').map(s => s.trim()).filter(Boolean) : []
            };

            const url = editingJobId
                ? `${API_BASE_URL}/api/careers/${editingJobId}`
                : `${API_BASE_URL}/api/careers`;
            const method = editingJobId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const saved = await res.json();
                if (editingJobId) {
                    setCareers(prev => prev.map(j => j._id === editingJobId ? saved : j));
                    alert("Job opening updated successfully!");
                } else {
                    setCareers(prev => [saved, ...prev]);
                    alert("New job opening posted successfully!");
                }
                setJobModalOpen(false);
                setJobForm(defaultJobForm);
                setEditingJobId(null);
            } else {
                const errData = await res.json().catch(() => ({}));
                alert(`Failed to save job: ${errData.error || 'Server error'}`);
            }
        } catch (err) {
            console.error("Save job error:", err);
            alert("Error saving job");
        } finally {
            setSubmittingJob(false);
        }
    };

    // Toggle Job Status (Active <-> Closed)
    const handleToggleJobStatus = async (job) => {
        const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
        try {
            const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(`${API_BASE_URL}/api/careers/${job._id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setCareers(prev => prev.map(j => j._id === job._id ? { ...j, status: newStatus } : j));
            } else {
                alert("Failed to update status");
            }
        } catch (err) {
            console.error(err);
            alert("Error toggling status");
        }
    };

    // Delete Job Opening
    const handleDeleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job posting? This cannot be undone.")) return;
        try {
            const token = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || localStorage.getItem('token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

            const res = await fetch(`${API_BASE_URL}/api/careers/${jobId}`, {
                method: 'DELETE',
                headers
            });

            if (res.ok) {
                setCareers(prev => prev.filter(j => j._id !== jobId));
                alert("Job posting deleted successfully");
            } else {
                alert("Failed to delete job posting");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting job");
        }
    };

    // Download Applications Excel
    const downloadExcel = () => {
        if (applications.length === 0) {
            alert("No applications data to export");
            return;
        }

        const flattenedData = filteredApplications.map((app, index) => ({
            "S.No": index + 1,
            "Date Applied": app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A',
            "Full Name": app.fullName || app.name || 'N/A',
            "Designation / Role": app.designation || app.postAppliedFor || app.position || 'N/A',
            "Department": app.department || 'N/A',
            "Qualification": app.qualification || 'N/A',
            "Total Experience": app.totalExperienceYears || app.experience || 'Fresher',
            "Mobile": app.mobileNo || app.phone || 'N/A',
            "Email": app.email || 'N/A',
            "Status": app.status || 'Pending',
            "Resume Link": app.resumeUrl || "Not Uploaded",
            "Last Drawn Salary": app.lastDrawnSalary || 'N/A',
            "Expected Salary": app.expectedSalary || 'N/A',
            "Present Address": app.presentAddress || 'N/A'
        }));

        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `EASA_Job_Applications_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // PDF Resume URL Formatter
    const getResumeUrl = (url) => {
        if (!url) return '';
        let finalUrl = url;

        if (!/^https?:\/\//i.test(finalUrl)) {
            const baseUrl = API_BASE_URL;
            const cleanUrl = finalUrl.startsWith('/') ? finalUrl.slice(1) : finalUrl;
            finalUrl = `${baseUrl}/${cleanUrl}`;
        }

        if (finalUrl.includes('cloudinary.com')) {
            if (finalUrl.startsWith('http://')) {
                finalUrl = finalUrl.replace('http://', 'https://');
            }
            if (finalUrl.match(/\.pdf$/i)) {
                finalUrl = finalUrl.replace('/image/upload/', '/raw/upload/');
            }
        }
        return finalUrl;
    };

    // Filtered Applications List
    const filteredApplications = applications.filter(app => {
        const name = (app.fullName || app.name || '').toLowerCase();
        const role = (app.designation || app.postAppliedFor || app.position || '').toLowerCase();
        const dept = (app.department || '').toLowerCase();
        const email = (app.email || '').toLowerCase();
        const phone = (app.mobileNo || app.phone || '').toLowerCase();
        const search = searchTerm.toLowerCase();

        const matchesSearch = !search || name.includes(search) || role.includes(search) || dept.includes(search) || email.includes(search) || phone.includes(search);
        const matchesDept = deptFilter === 'All' || app.department === deptFilter;
        const matchesStatus = statusFilter === 'All' || (app.status || 'Pending') === statusFilter;

        return matchesSearch && matchesDept && matchesStatus;
    });

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: colors.bg,
                color: colors.text
            }}>
                <form onSubmit={handleLogin} style={{
                    padding: '2.5rem',
                    background: colors.cardBg,
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    maxWidth: '400px',
                    border: `1px solid ${colors.border}`
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '56px', height: '56px', background: 'rgba(99, 102, 241, 0.15)', color: colors.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>
                            <FaBriefcase />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.3rem' }}>Careers Admin</h2>
                        <p style={{ color: colors.muted, fontSize: '0.85rem' }}>Post job openings & manage candidates</p>
                    </div>

                    <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <FaUser style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} />
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${colors.border}`,
                                    background: colors.subBg,
                                    color: colors.text,
                                    outline: 'none'
                                }}
                                placeholder="Enter username (admin)"
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} />
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${colors.border}`,
                                    background: colors.subBg,
                                    color: colors.text,
                                    outline: 'none'
                                }}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '8px',
                        background: colors.primary,
                        color: 'white',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}>
                        Sign In to Portal
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: colors.bg, color: colors.text }}>
            <GlobalHero
                pageKey="admin-applications"
                defaultTitle="Careers & Applications Portal"
                defaultSubtitle="Publish job openings and review incoming candidate applications"
            />

            {/* TOP NAVIGATION & CONTROLS */}
            <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* HEADER BAR */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem',
                    paddingBottom: '1.5rem',
                    borderBottom: `1px solid ${colors.border}`
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                            <Link to="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: colors.muted, textDecoration: 'none', fontSize: '0.85rem' }}>
                                <FaArrowLeft size={10} /> Back to Dashboard
                            </Link>
                            <span style={{ color: colors.muted }}>•</span>
                            <a href="/careers" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: colors.primary, textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600' }}>
                                Live Careers Page <FaExternalLinkAlt size={10} />
                            </a>
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '900', margin: 0 }}>
                            {activeTab === 'applications' ? 'Received Candidate Applications' : 'Job Openings & Postings'}
                        </h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => handleOpenJobModal()}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.75rem 1.4rem',
                                background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                            }}
                        >
                            <FaPlus size={12} /> Post New Job
                        </button>

                        {activeTab === 'applications' && (
                            <button
                                onClick={downloadExcel}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.75rem 1.4rem',
                                    background: '#10B981',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
                                }}
                            >
                                <FaDownload size={12} /> Download Excel
                            </button>
                        )}
                    </div>
                </div>

                {/* TABS SWITCHER */}
                <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    marginBottom: '2rem',
                    background: colors.cardBg,
                    padding: '0.5rem',
                    borderRadius: '14px',
                    border: `1px solid ${colors.border}`,
                    width: 'fit-content'
                }}>
                    <button
                        onClick={() => setActiveTab('applications')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.7rem 1.5rem',
                            borderRadius: '10px',
                            border: 'none',
                            background: activeTab === 'applications' ? colors.primary : 'transparent',
                            color: activeTab === 'applications' ? '#ffffff' : colors.muted,
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <FaUsers />
                        <span>Received Applications</span>
                        <span style={{
                            padding: '2px 8px',
                            borderRadius: '50px',
                            background: activeTab === 'applications' ? 'rgba(255,255,255,0.25)' : colors.subBg,
                            color: activeTab === 'applications' ? '#fff' : colors.text,
                            fontSize: '0.78rem'
                        }}>
                            {applications.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('postings')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.7rem 1.5rem',
                            borderRadius: '10px',
                            border: 'none',
                            background: activeTab === 'postings' ? colors.primary : 'transparent',
                            color: activeTab === 'postings' ? '#ffffff' : colors.muted,
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <FaBriefcase />
                        <span>Job Openings & Postings</span>
                        <span style={{
                            padding: '2px 8px',
                            borderRadius: '50px',
                            background: activeTab === 'postings' ? 'rgba(255,255,255,0.25)' : colors.subBg,
                            color: activeTab === 'postings' ? '#fff' : colors.text,
                            fontSize: '0.78rem'
                        }}>
                            {careers.length}
                        </span>
                    </button>
                </div>

                {/* TAB 1: RECEIVED APPLICATIONS */}
                {activeTab === 'applications' && (
                    <div>
                        {/* SEARCH & FILTERS */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            background: colors.cardBg,
                            padding: '1.2rem',
                            borderRadius: '14px',
                            border: `1px solid ${colors.border}`
                        }}>
                            {/* Search */}
                            <div style={{ position: 'relative' }}>
                                <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} />
                                <input
                                    type="text"
                                    placeholder="Search candidate name, role, email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem 0.7rem 0.7rem 2.4rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>

                            {/* Department Filter */}
                            <div>
                                <select
                                    value={deptFilter}
                                    onChange={(e) => setDeptFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <option value="All">All Departments</option>
                                    {departmentOptions.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.7rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Interviewed">Interviewed</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div style={{ color: colors.danger, marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem', color: colors.muted }}>
                                Loading applications...
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto', background: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1050px' }}>
                                    <thead>
                                        <tr style={{ background: colors.subBg, textAlign: 'left' }}>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Date</th>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Candidate</th>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Position & Dept</th>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Exp & Qual</th>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Resume</th>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Status</th>
                                            <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}`, textAlign: 'center' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredApplications.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" style={{ padding: '3rem', textAlign: 'center', color: colors.muted }}>
                                                    No job applications match your filters.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredApplications.map((app) => (
                                                <tr
                                                    key={app._id}
                                                    style={{
                                                        borderBottom: `1px solid ${colors.border}`,
                                                        transition: '0.2s',
                                                        background: 'inherit'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.background = colors.hover}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'inherit'}
                                                >
                                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap', fontSize: '0.85rem', color: colors.muted }}>
                                                        {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{app.fullName || app.name || 'Candidate'}</div>
                                                        <div style={{ fontSize: '0.82rem', color: colors.muted }}>{app.email}</div>
                                                        <div style={{ fontSize: '0.82rem', color: colors.muted }}>{app.mobileNo || app.phone}</div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ fontWeight: '600', color: colors.primary }}>{app.designation || app.postAppliedFor || app.position || 'Faculty'}</div>
                                                        <div style={{ fontSize: '0.85rem', color: colors.muted }}>{app.department || 'General'}</div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ fontSize: '0.9rem' }}>
                                                            {app.isFresher === true || (!app.totalExperienceYears && !app.experience)
                                                                ? <span style={{ color: '#10B981', fontWeight: 'bold' }}>Fresher</span>
                                                                : `${app.totalExperienceYears || app.experience} Yrs Exp`}
                                                        </div>
                                                        <div style={{ fontSize: '0.82rem', color: colors.muted }}>{app.qualification || 'Not Specified'}</div>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        {app.resumeUrl ? (
                                                            <button
                                                                onClick={() => {
                                                                    const url = getResumeUrl(app.resumeUrl);
                                                                    if (url) {
                                                                        setPdfUrl(url);
                                                                        setPdfError(false);
                                                                        setPdfModalOpen(true);
                                                                    }
                                                                }}
                                                                style={{
                                                                    color: colors.primary,
                                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                                    border: 'none',
                                                                    padding: '0.35rem 0.8rem',
                                                                    borderRadius: '6px',
                                                                    fontWeight: '600',
                                                                    fontSize: '0.85rem',
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.3rem'
                                                                }}
                                                            >
                                                                📄 View Resume
                                                            </button>
                                                        ) : (
                                                            <span style={{ color: colors.muted, fontSize: '0.85rem' }}>N/A</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <select
                                                            value={app.status || 'Pending'}
                                                            onChange={(e) => handleUpdateAppStatus(app._id, e.target.value)}
                                                            style={{
                                                                padding: '0.4rem 0.7rem',
                                                                borderRadius: '6px',
                                                                fontSize: '0.85rem',
                                                                fontWeight: '600',
                                                                border: `1px solid ${colors.border}`,
                                                                background: app.status === 'Hired' ? 'rgba(16, 185, 129, 0.15)' :
                                                                    app.status === 'Shortlisted' ? 'rgba(59, 130, 246, 0.15)' :
                                                                        app.status === 'Rejected' ? 'rgba(239, 68, 68, 0.15)' : colors.subBg,
                                                                color: app.status === 'Hired' ? '#10B981' :
                                                                    app.status === 'Shortlisted' ? '#3B82F6' :
                                                                        app.status === 'Rejected' ? '#EF4444' : colors.text,
                                                                outline: 'none',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Shortlisted">Shortlisted</option>
                                                            <option value="Interviewed">Interviewed</option>
                                                            <option value="Hired">Hired</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                                                            <button
                                                                onClick={() => setSelectedApp(app)}
                                                                title="View Full Candidate Profile"
                                                                style={{
                                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                                    color: colors.primary,
                                                                    border: 'none',
                                                                    padding: '0.4rem 0.7rem',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.85rem'
                                                                }}
                                                            >
                                                                <FaEye /> Profile
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteApplication(app._id)}
                                                                title="Delete Application"
                                                                style={{
                                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                                    color: colors.danger,
                                                                    border: 'none',
                                                                    padding: '0.4rem 0.7rem',
                                                                    borderRadius: '6px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.85rem'
                                                                }}
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: JOB OPENINGS & POSTINGS */}
                {activeTab === 'postings' && (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                            {careers.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', background: colors.cardBg, padding: '3rem', borderRadius: '16px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', color: colors.muted, marginBottom: '1rem' }}><FaBriefcase /></div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No Active Job Openings Posted</h3>
                                    <p style={{ color: colors.muted, marginBottom: '1.5rem' }}>Create faculty and staff job openings to attract top talent to EASA College.</p>
                                    <button
                                        onClick={() => handleOpenJobModal()}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            background: colors.primary,
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        + Post Your First Job
                                    </button>
                                </div>
                            ) : (
                                careers.map(job => (
                                    <div
                                        key={job._id}
                                        style={{
                                            background: colors.cardBg,
                                            borderRadius: '16px',
                                            border: `1px solid ${colors.border}`,
                                            padding: '1.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                                            position: 'relative'
                                        }}
                                    >
                                        <div>
                                            {/* Status Badge & Employment Type */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                                <span style={{
                                                    padding: '3px 10px',
                                                    borderRadius: '50px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    background: job.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                    color: job.status === 'Active' ? '#10B981' : '#EF4444'
                                                }}>
                                                    ● {job.status || 'Active'}
                                                </span>

                                                <span style={{ fontSize: '0.8rem', color: colors.muted, background: colors.subBg, padding: '2px 8px', borderRadius: '6px' }}>
                                                    {job.type || 'Full-time'}
                                                </span>
                                            </div>

                                            {/* Job Title */}
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: colors.text, marginBottom: '0.4rem' }}>
                                                {job.title}
                                            </h3>

                                            {/* Department */}
                                            <div style={{ color: colors.primary, fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.8rem' }}>
                                                🏢 {job.department || 'General Department'}
                                            </div>

                                            {/* Location & Salary Info */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: colors.muted, marginBottom: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <FaMapMarkerAlt /> {job.location || 'Coimbatore, Tamil Nadu'}
                                                </div>
                                                {job.salary && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <FaMoneyBillWave /> {job.salary}
                                                    </div>
                                                )}
                                                {job.closingDate && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                        <FaCalendarAlt /> Closes: {new Date(job.closingDate).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description snippet */}
                                            {job.description && (
                                                <p style={{
                                                    fontSize: '0.88rem',
                                                    color: colors.muted,
                                                    lineHeight: '1.5',
                                                    marginBottom: '1rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {job.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div style={{
                                            borderTop: `1px solid ${colors.border}`,
                                            paddingTop: '1rem',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <button
                                                onClick={() => handleToggleJobStatus(job)}
                                                style={{
                                                    padding: '0.4rem 0.8rem',
                                                    borderRadius: '6px',
                                                    border: `1px solid ${colors.border}`,
                                                    background: colors.subBg,
                                                    color: colors.text,
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {job.status === 'Active' ? 'Close Posting' : 'Reactivate'}
                                            </button>

                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleOpenJobModal(job)}
                                                    style={{
                                                        padding: '0.4rem 0.8rem',
                                                        borderRadius: '6px',
                                                        background: 'rgba(59, 130, 246, 0.1)',
                                                        color: colors.primary,
                                                        border: 'none',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem'
                                                    }}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteJob(job._id)}
                                                    style={{
                                                        padding: '0.4rem 0.8rem',
                                                        borderRadius: '6px',
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        color: colors.danger,
                                                        border: 'none',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* JOB POSTING MODAL (ADD / EDIT) */}
            {jobModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: colors.cardBg,
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '680px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        border: `1px solid ${colors.border}`,
                        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>
                                    {editingJobId ? 'Edit Job Opening' : 'Post New Job Opening'}
                                </h2>
                                <p style={{ color: colors.muted, fontSize: '0.85rem', margin: '0.2rem 0 0' }}>
                                    This job will be published immediately on the public careers page.
                                </p>
                            </div>
                            <button
                                onClick={() => setJobModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', color: colors.muted, fontSize: '1.5rem', cursor: 'pointer' }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSaveJob} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {/* Job Title */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Job Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Assistant Professor in AI & Data Science"
                                    value={jobForm.title}
                                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {/* Department & Type */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Department *</label>
                                    <select
                                        value={jobForm.department}
                                        onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.subBg,
                                            color: colors.text,
                                            outline: 'none'
                                        }}
                                    >
                                        {departmentOptions.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Employment Type</label>
                                    <select
                                        value={jobForm.type}
                                        onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.subBg,
                                            color: colors.text,
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location & Salary */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Location</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Coimbatore, Tamil Nadu"
                                        value={jobForm.location}
                                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.subBg,
                                            color: colors.text,
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Salary / Pay Scale</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. As per AICTE / 7th Pay Norms"
                                        value={jobForm.salary}
                                        onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.subBg,
                                            color: colors.text,
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Status & Closing Date */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Posting Status</label>
                                    <select
                                        value={jobForm.status}
                                        onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.subBg,
                                            color: colors.text,
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="Active">Active (Accepting Applications)</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Closing / Deadline Date</label>
                                    <input
                                        type="date"
                                        value={jobForm.closingDate}
                                        onChange={(e) => setJobForm({ ...jobForm, closingDate: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.subBg,
                                            color: colors.text,
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Job Overview & Role Summary</label>
                                <textarea
                                    rows="3"
                                    placeholder="Brief summary of the role, expectations, and research focus..."
                                    value={jobForm.description}
                                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* Requirements */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                                    Requirements & Eligibility (One per line)
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Ph.D. or M.E./M.Tech in relevant engineering discipline&#10;Minimum 2 years of teaching or industrial experience&#10;Strong publications in SCI/Scopus indexed journals"
                                    value={jobForm.requirements}
                                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                                    Key Responsibilities (One per line)
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Deliver high-quality undergraduate and postgraduate lectures&#10;Mentor student research projects and patent submissions&#10;Participate in departmental NBA/NAAC accreditation tasks"
                                    value={jobForm.responsibilities}
                                    onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${colors.border}`,
                                        background: colors.subBg,
                                        color: colors.text,
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setJobModalOpen(false)}
                                    style={{
                                        padding: '0.75rem 1.4rem',
                                        borderRadius: '8px',
                                        background: 'transparent',
                                        border: `1px solid ${colors.border}`,
                                        color: colors.text,
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingJob}
                                    style={{
                                        padding: '0.75rem 1.8rem',
                                        borderRadius: '8px',
                                        background: colors.primary,
                                        color: '#ffffff',
                                        border: 'none',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        opacity: submittingJob ? 0.7 : 1
                                    }}
                                >
                                    {submittingJob ? 'Saving...' : (editingJobId ? 'Update Job' : 'Publish Job Opening')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* CANDIDATE PROFILE DETAILS MODAL */}
            {selectedApp && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: colors.cardBg,
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '650px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        border: `1px solid ${colors.border}`,
                        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>
                                    {selectedApp.fullName || selectedApp.name || 'Candidate Profile'}
                                </h2>
                                <p style={{ color: colors.primary, fontSize: '0.9rem', fontWeight: '600', margin: '0.2rem 0 0' }}>
                                    Applied for: {selectedApp.designation || selectedApp.postAppliedFor || selectedApp.position} ({selectedApp.department})
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedApp(null)}
                                style={{ background: 'transparent', border: 'none', color: colors.muted, fontSize: '1.5rem', cursor: 'pointer' }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: colors.subBg, padding: '1rem', borderRadius: '10px' }}>
                                <div><strong>Email:</strong> {selectedApp.email}</div>
                                <div><strong>Phone:</strong> {selectedApp.mobileNo || selectedApp.phone}</div>
                                <div><strong>Gender:</strong> {selectedApp.gender || 'N/A'}</div>
                                <div><strong>DOB / Age:</strong> {selectedApp.dob || 'N/A'} {selectedApp.age ? `(${selectedApp.age} Yrs)` : ''}</div>
                                <div><strong>Qualification:</strong> {selectedApp.qualification || 'N/A'}</div>
                                <div><strong>Experience:</strong> {selectedApp.totalExperienceYears || selectedApp.experience || 'Fresher'}</div>
                                <div><strong>Last Drawn:</strong> {selectedApp.lastDrawnSalary || 'N/A'}</div>
                                <div><strong>Expected Salary:</strong> {selectedApp.expectedSalary || 'N/A'}</div>
                            </div>

                            {selectedApp.presentAddress && (
                                <div style={{ background: colors.subBg, padding: '1rem', borderRadius: '10px' }}>
                                    <strong>Present Address:</strong>
                                    <p style={{ margin: '0.4rem 0 0', color: colors.muted }}>{selectedApp.presentAddress}</p>
                                </div>
                            )}

                            {selectedApp.coverLetter && (
                                <div style={{ background: colors.subBg, padding: '1rem', borderRadius: '10px' }}>
                                    <strong>Cover Letter / Note:</strong>
                                    <p style={{ margin: '0.4rem 0 0', color: colors.muted, lineHeight: '1.6' }}>{selectedApp.coverLetter}</p>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${colors.border}` }}>
                                <div>
                                    <label style={{ fontWeight: '700', marginRight: '0.5rem' }}>Update Status:</label>
                                    <select
                                        value={selectedApp.status || 'Pending'}
                                        onChange={(e) => handleUpdateAppStatus(selectedApp._id, e.target.value)}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '6px',
                                            border: `1px solid ${colors.border}`,
                                            background: colors.cardBg,
                                            color: colors.text,
                                            fontWeight: '600'
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shortlisted">Shortlisted</option>
                                        <option value="Interviewed">Interviewed</option>
                                        <option value="Hired">Hired</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                {selectedApp.resumeUrl && (
                                    <button
                                        onClick={() => {
                                            const url = getResumeUrl(selectedApp.resumeUrl);
                                            if (url) {
                                                setPdfUrl(url);
                                                setPdfError(false);
                                                setPdfModalOpen(true);
                                            }
                                        }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            background: colors.primary,
                                            color: '#ffffff',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <FaDownload size={12} /> View Resume PDF
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* RESUME PDF VIEWER MODAL */}
            {pdfModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1100
                }}>
                    <div style={{
                        background: colors.cardBg,
                        borderRadius: '12px',
                        padding: '1rem',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <button
                            onClick={() => { setPdfModalOpen(false); setPdfError(false); }}
                            style={{
                                position: 'absolute',
                                top: 8,
                                right: 12,
                                background: 'transparent',
                                border: 'none',
                                color: colors.text,
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            aria-label="Close PDF"
                        >
                            <FaTimes />
                        </button>

                        <div style={{ position: 'absolute', top: 12, left: 16 }}>
                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: colors.primary,
                                    color: 'white',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                            >
                                <FaDownload size={12} /> Open Original PDF
                            </a>
                        </div>

                        {!pdfError ? (
                            <iframe
                                src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                                title="Resume PDF"
                                style={{ width: '70vw', height: '80vh', border: 'none', borderRadius: '8px', background: '#fff', marginTop: '2.5rem' }}
                                onError={() => setPdfError(true)}
                            />
                        ) : (
                            <div style={{ color: 'red', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>PDF could not be previewed.</p>
                                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: colors.primary, textDecoration: 'underline' }}>
                                    Click here to download directly
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobApplicationsView;
