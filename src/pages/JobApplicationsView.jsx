import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import API_BASE_URL from '../api';
import { useTheme } from '../context/ThemeContext';
import { FaDownload, FaLock, FaUser } from 'react-icons/fa';
import GlobalHero from '../components/GlobalHero';

const JobApplicationsView = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // PDF Modal State
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [pdfError, setPdfError] = useState(false);



    // Styles
    const colors = {
        bg: isDark ? '#0f172a' : '#f8fafc',
        cardBg: isDark ? '#1e293b' : '#fff',
        text: isDark ? '#e2e8f0' : '#1e293b',
        muted: isDark ? '#94a3b8' : '#64748b',
        border: isDark ? '#334155' : '#e2e8f0',
        primary: '#6366f1',
        hover: isDark ? '#334155' : '#f1f5f9'
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple client-side username check + Backend password check
        if (credentials.username.toLowerCase() !== 'admin') {
            alert("Invalid Username");
            return;
        }

        try {
            const baseUrl = API_BASE_URL;
            const response = await fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: credentials.password })
            });

            const data = await response.json();
            if (data.success) {
                // Store token for persistence across pages
                localStorage.setItem('admin_token', data.token);
                setIsAuthenticated(true);
                fetchApplications();
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
            const baseUrl = API_BASE_URL;
            const response = await fetch(`${baseUrl}/api/job-applications`);
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            } else {
                const errText = await response.text();
                setError(`Failed to fetch applications. Server responded with ${response.status}: ${errText}`);
            }
        } catch (error) {
            setError(`Fetch error: ${error.message}`);
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Check for existing session
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            setIsAuthenticated(true);
            fetchApplications();
        }
    }, []);

    const downloadExcel = () => {
        if (applications.length === 0) {
            alert("No data to download");
            return;
        }

        // Flatten Data for Excel
        const flattenedData = applications.map((app, index) => ({
            "S.No": index + 1,
            "Date Applied": new Date(app.submittedAt).toLocaleDateString(),
            "Full Name": app.fullName,
            "Designation": app.designation,
            "Category": app.postAppliedFor,
            "Department": app.department,
            "Employment Type": Array.isArray(app.employmentType) ? app.employmentType.join(', ') : app.employmentType,
            "Gender": app.gender,
            "DOB": app.dob,
            "Age": app.age,
            "Mobile": app.mobileNo,
            "Email": app.email,
            "Resume Link": app.resumeUrl || "Not Uploaded",
            "Total Experience": app.totalExperienceYears || "Fresher",
            "Last Salary": app.lastDrawnSalary,
            "Expected Salary": app.expectedSalary,
            "Present Address": app.presentAddress
        }));

        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

        // Generate buffer
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `Job_Applications_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Helper to get absolute PDF URL
    const getResumeUrl = (url) => {
        if (!url) return '';
        let finalUrl = url;

        // Ensure absolute URL
        if (!/^https?:\/\//i.test(finalUrl)) {
            const baseUrl = API_BASE_URL;
            const cleanUrl = finalUrl.startsWith('/') ? finalUrl.slice(1) : finalUrl;
            finalUrl = `${baseUrl}/${cleanUrl}`;
        }

        // Cloudinary Fix: PDFs should often be accessed as raw files to avoid transformation errors or 401s
        if (finalUrl.includes('cloudinary.com')) {
            // Force HTTPS
            if (finalUrl.startsWith('http://')) {
                finalUrl = finalUrl.replace('http://', 'https://');
            }

            if (finalUrl.match(/\.pdf$/i)) {
                // Replace 'image/upload' with 'raw/upload' if present
                finalUrl = finalUrl.replace('/image/upload/', '/raw/upload/');
            }
        }

        return finalUrl;
    };

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
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    border: `1px solid ${colors.border}`
                }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Admin Access</h2>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Username</label>
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
                                    background: colors.bg,
                                    color: colors.text,
                                    outline: 'none'
                                }}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
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
                                    background: colors.bg,
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
                        padding: '0.8rem',
                        borderRadius: '8px',
                        background: colors.primary,
                        color: 'white',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}>
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: colors.bg, color: colors.text }}>
            <GlobalHero 
                pageKey="admin-applications"
                defaultTitle="Job Applications"
                defaultSubtitle="Review and manage candidate submissions"
            />
            <div style={{ padding: '2rem' }}>
                {/* PDF Modal */}
                {pdfModalOpen && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
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
                            >×</button>

                            {/* Fallback Action */}
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
                                    style={{ width: '70vw', height: '80vh', border: 'none', borderRadius: '8px', background: '#fff' }}
                                    onError={() => setPdfError(true)}
                                />
                            ) : (
                                <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>PDF could not be loaded (404 Not Found).</p>
                                    <p style={{ fontSize: '0.8rem', color: colors.muted, wordBreak: 'break-all' }}>Attempted URL: {pdfUrl}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Job Applications</h1>
                            <p style={{ color: colors.muted }}>View and manage submitted job applications</p>
                        </div>
                        <button
                            onClick={downloadExcel}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                background: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            <FaDownload /> Download Excel
                        </button>
                    </div>

                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>
                    ) : (
                        <div style={{ overflowX: 'auto', background: colors.cardBg, borderRadius: '12px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                                <thead>
                                    <tr style={{ background: isDark ? '#334155' : '#f1f5f9', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Date</th>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Name</th>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Role</th>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Dept</th>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Exp</th>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Contact</th>
                                        <th style={{ padding: '1rem', borderBottom: `1px solid ${colors.border}` }}>Resume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: colors.muted }}>
                                                No applications found.
                                                {/* Show hint if no error and no applications */}
                                                {!error && (
                                                    <div style={{ marginTop: '1rem', color: colors.muted, fontSize: '0.95rem' }}>
                                                        If you recently submitted an application and don't see it here, please check your backend server and form submission endpoint.
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ) : (
                                        applications.map((app) => (
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
                                                <td style={{ padding: '1rem' }}>{new Date(app.submittedAt).toLocaleDateString()}</td>
                                                <td style={{ padding: '1rem', fontWeight: 600 }}>{app.fullName}</td>
                                                <td style={{ padding: '1rem' }}>{app.designation}</td>
                                                <td style={{ padding: '1rem' }}>{app.department}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    {app.isFresher === true || (!app.totalExperienceYears && app.isFresher !== false)
                                                        ? 'Fresher'
                                                        : `${app.totalExperienceYears || 0} Yrs`}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontSize: '0.9rem' }}>{app.mobileNo}</div>
                                                    <div style={{ fontSize: '0.85rem', color: colors.muted }}>{app.email}</div>
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
                                                                background: 'none',
                                                                border: 'none',
                                                                padding: 0,
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                textDecoration: 'underline'
                                                            }}
                                                        >
                                                            View PDF
                                                        </button>
                                                    ) : (
                                                        <span style={{ color: colors.muted }}>N/A</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobApplicationsView;
