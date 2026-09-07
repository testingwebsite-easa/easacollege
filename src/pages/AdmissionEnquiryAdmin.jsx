import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import * as XLSX from 'xlsx';
import {
    FaGraduationCap,
    FaEnvelopeOpenText,
    FaSearch,
    FaFilter,
    FaFileExcel,
    FaTrash,
    FaEye,
    FaPhoneAlt,
    FaEnvelope,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaUserCheck,
    FaSync,
    FaPlus,
    FaLock,
    FaArrowLeft,
    FaTimes,
    FaUser
} from 'react-icons/fa';

const AdmissionEnquiryAdmin = () => {
    const navigate = useNavigate();
    const baseUrl = API_BASE_URL || 'http://localhost:5000';

    // Auth states
    const [token, setToken] = useState(
        localStorage.getItem('admin_token') || localStorage.getItem('admission_token') || ''
    );
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Active Dashboard Tab: 'admissions' | 'enquiries'
    const [activeTab, setActiveTab] = useState('admissions');

    // Data states
    const [admissions, setAdmissions] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    // Search and Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [courseFilter, setCourseFilter] = useState('all');

    // Modals
    const [selectedAdmission, setSelectedAdmission] = useState(null);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showAddAdmissionModal, setShowAddAdmissionModal] = useState(false);
    const [showAddEnquiryModal, setShowAddEnquiryModal] = useState(false);

    // Forms
    const [newAdmissionForm, setNewAdmissionForm] = useState({
        name: '',
        email: '',
        phone: '',
        course: 'B.E. Computer Science and Engineering',
        community: 'General',
        district: '',
        state: 'Tamil Nadu',
        school: '',
        percentage: '',
        fatherName: '',
        motherName: '',
        address: '',
        pincode: '',
        sslcMark: '',
        hscMark: '',
        remarks: '',
        status: 'Pending'
    });

    const [newEnquiryForm, setNewEnquiryForm] = useState({
        name: '',
        email: '',
        phone: '',
        course: 'General Enquiry',
        category: 'Admission',
        message: '',
        status: 'New'
    });

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        try {
            const res = await fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('admission_token', data.token);
                localStorage.setItem('admin_token', data.token);
                setToken(data.token);
            } else {
                setLoginError(data.message || 'Invalid username or password');
            }
        } catch (err) {
            setLoginError('Could not connect to authentication server');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admission_token');
        localStorage.removeItem('admin_token');
        setToken('');
    };

    // Fetch all data
    const fetchData = async () => {
        if (!token) return;
        setLoading(true);
        try {
            // Fetch Admissions
            const resAdm = await fetch(`${baseUrl}/api/admissions`);
            if (resAdm.ok) {
                const dataAdm = await resAdm.json();
                setAdmissions(Array.isArray(dataAdm) ? dataAdm : []);
            }

            // Fetch Enquiries
            const resEnq = await fetch(`${baseUrl}/api/enquiries`);
            if (resEnq.ok) {
                const dataEnq = await resEnq.json();
                setEnquiries(Array.isArray(dataEnq) ? dataEnq : []);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    // Admission Status Update
    const handleUpdateAdmissionStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${baseUrl}/api/admissions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setAdmissions((prev) =>
                    prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
                );
                if (selectedAdmission && selectedAdmission._id === id) {
                    setSelectedAdmission((prev) => ({ ...prev, status: newStatus }));
                }
            } else {
                alert('Failed to update status.');
            }
        } catch (err) {
            alert('Error updating status: ' + err.message);
        }
    };

    // Delete Admission
    const handleDeleteAdmission = async (id) => {
        if (!window.confirm('Are you sure you want to delete this admission record?')) return;
        try {
            const res = await fetch(`${baseUrl}/api/admissions/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setAdmissions((prev) => prev.filter((item) => item._id !== id));
                if (selectedAdmission && selectedAdmission._id === id) setSelectedAdmission(null);
            } else {
                alert('Failed to delete admission record.');
            }
        } catch (err) {
            alert('Error deleting admission: ' + err.message);
        }
    };

    // Add Manual Admission
    const handleAddAdmissionSubmit = async (e) => {
        e.preventDefault();
        const cleanPhone = (newAdmissionForm.phone || '').replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        try {
            const res = await fetch(`${baseUrl}/api/admissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newAdmissionForm, phone: cleanPhone })
            });
            if (res.ok) {
                alert('Admission entry added successfully!');
                setShowAddAdmissionModal(false);
                setNewAdmissionForm({
                    name: '',
                    email: '',
                    phone: '',
                    course: 'B.E. Computer Science and Engineering',
                    community: 'General',
                    district: '',
                    state: 'Tamil Nadu',
                    school: '',
                    percentage: '',
                    fatherName: '',
                    motherName: '',
                    address: '',
                    pincode: '',
                    sslcMark: '',
                    hscMark: '',
                    remarks: '',
                    status: 'Pending'
                });
                fetchData();
            } else {
                alert('Failed to add admission record.');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    // Enquiry Status Update
    const handleUpdateEnquiryStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${baseUrl}/api/enquiries/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setEnquiries((prev) =>
                    prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
                );
                if (selectedEnquiry && selectedEnquiry._id === id) {
                    setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
                }
            } else {
                alert('Failed to update enquiry status.');
            }
        } catch (err) {
            alert('Error updating enquiry: ' + err.message);
        }
    };

    // Delete Enquiry
    const handleDeleteEnquiry = async (id) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
        try {
            const res = await fetch(`${baseUrl}/api/enquiries/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setEnquiries((prev) => prev.filter((item) => item._id !== id));
                if (selectedEnquiry && selectedEnquiry._id === id) setSelectedEnquiry(null);
            } else {
                alert('Failed to delete enquiry.');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    // Add Manual Enquiry
    const handleAddEnquirySubmit = async (e) => {
        e.preventDefault();
        const cleanPhone = (newEnquiryForm.phone || '').replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        try {
            const res = await fetch(`${baseUrl}/api/enquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newEnquiryForm, phone: cleanPhone })
            });
            if (res.ok) {
                alert('Enquiry logged successfully!');
                setShowAddEnquiryModal(false);
                setNewEnquiryForm({
                    name: '',
                    email: '',
                    phone: '',
                    course: 'General Enquiry',
                    category: 'Admission',
                    message: '',
                    status: 'New'
                });
                fetchData();
            } else {
                alert('Failed to submit enquiry.');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    // Filtered Admissions
    const filteredAdmissions = useMemo(() => {
        return admissions.filter((item) => {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                !q ||
                (item.name && item.name.toLowerCase().includes(q)) ||
                (item.email && item.email.toLowerCase().includes(q)) ||
                (item.phone && item.phone.toLowerCase().includes(q)) ||
                (item.course && item.course.toLowerCase().includes(q)) ||
                (item.district && item.district.toLowerCase().includes(q)) ||
                (item.community && item.community.toLowerCase().includes(q));

            const matchesStatus =
                statusFilter === 'all' || (item.status && item.status.toLowerCase() === statusFilter.toLowerCase());

            const matchesCourse =
                courseFilter === 'all' || (item.course && item.course.toLowerCase().includes(courseFilter.toLowerCase()));

            return matchesSearch && matchesStatus && matchesCourse;
        });
    }, [admissions, searchQuery, statusFilter, courseFilter]);

    // Filtered Enquiries
    const filteredEnquiries = useMemo(() => {
        return enquiries.filter((item) => {
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                !q ||
                (item.name && item.name.toLowerCase().includes(q)) ||
                (item.email && item.email.toLowerCase().includes(q)) ||
                (item.phone && item.phone.toLowerCase().includes(q)) ||
                (item.course && item.course.toLowerCase().includes(q)) ||
                (item.message && item.message.toLowerCase().includes(q)) ||
                (item.category && item.category.toLowerCase().includes(q));

            const matchesStatus =
                statusFilter === 'all' || (item.status && item.status.toLowerCase() === statusFilter.toLowerCase());

            return matchesSearch && matchesStatus;
        });
    }, [enquiries, searchQuery, statusFilter]);

    // Excel Export Function
    const exportAdmissionsToExcel = () => {
        const exportData = filteredAdmissions.map((adm, idx) => ({
            'S.No': idx + 1,
            'Student Name': adm.name || '',
            'Email': adm.email || '',
            'Phone': adm.phone || '',
            'Course Applied': adm.course || '',
            'Status': adm.status || 'Pending',
            'Community': adm.community || '',
            'District': adm.district || '',
            'State': adm.state || '',
            'Father Name': adm.fatherName || '',
            'Mother Name': adm.motherName || '',
            'SSLC %': adm.sslcMark || '',
            'HSC %': adm.hscMark || '',
            'Percentage': adm.percentage || '',
            'School': adm.school || '',
            'Address': adm.address || '',
            'Pincode': adm.pincode || '',
            'Remarks': adm.remarks || '',
            'Submitted Date': adm.date ? new Date(adm.date).toLocaleDateString() : ''
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Admissions');
        XLSX.writeFile(wb, `EASA_Admissions_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const exportEnquiriesToExcel = () => {
        const exportData = filteredEnquiries.map((enq, idx) => ({
            'S.No': idx + 1,
            'Name': enq.name || '',
            'Email': enq.email || '',
            'Phone': enq.phone || '',
            'Course / Interest': enq.course || '',
            'Category': enq.category || '',
            'Status': enq.status || 'New',
            'Message': enq.message || '',
            'Submitted Date': enq.submittedAt ? new Date(enq.submittedAt).toLocaleDateString() : ''
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Quick_Enquiries');
        XLSX.writeFile(wb, `EASA_Enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    // Stats calculations
    const stats = useMemo(() => {
        const totalAdmissions = admissions.length;
        const pendingAdmissions = admissions.filter((a) => (a.status || 'pending').toLowerCase() === 'pending').length;
        const acceptedAdmissions = admissions.filter((a) => (a.status || '').toLowerCase() === 'accepted').length;

        const totalEnquiries = enquiries.length;
        const newEnquiries = enquiries.filter((e) => (e.status || 'new').toLowerCase() === 'new').length;
        const resolvedEnquiries = enquiries.filter((e) => (e.status || '').toLowerCase() === 'resolved').length;

        return {
            totalAdmissions,
            pendingAdmissions,
            acceptedAdmissions,
            totalEnquiries,
            newEnquiries,
            resolvedEnquiries
        };
    }, [admissions, enquiries]);

    // Distinct courses
    const distinctCourses = useMemo(() => {
        const set = new Set();
        admissions.forEach((a) => {
            if (a.course) set.add(a.course);
        });
        return Array.from(set);
    }, [admissions]);

    // ----------------------------------------------------
    // LOGIN SCREEN (If not authenticated)
    // ----------------------------------------------------
    if (!token) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #0b1120 0%, #0f172a 50%, #1e1b4b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '460px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '18px',
                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontSize: '1.75rem',
                                marginBottom: '1rem',
                                boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.5)'
                            }}
                        >
                            <FaGraduationCap />
                        </div>
                        <h2 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                            Admissions & Enquiry Hub
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                            EASA College of Engineering & Technology
                        </p>
                    </div>

                    {loginError && (
                        <div
                            style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: '#fca5a5',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                fontSize: '0.85rem'
                            }}
                        >
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    color: '#cbd5e1',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    marginBottom: '0.4rem'
                                }}
                            >
                                Username
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaUser
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#64748b'
                                    }}
                                />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username (e.g. admin)"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem 0.85rem 2.6rem',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        color: '#ffffff',
                                        fontSize: '0.95rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                style={{
                                    display: 'block',
                                    color: '#cbd5e1',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    marginBottom: '0.4rem'
                                }}
                            >
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaLock
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#64748b'
                                    }}
                                />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem 0.85rem 2.6rem',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '12px',
                                        color: '#ffffff',
                                        fontSize: '0.95rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            style={{
                                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.9rem',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                marginTop: '0.5rem',
                                transition: 'all 0.2s',
                                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.5)'
                            }}
                        >
                            {isLoggingIn ? 'Verifying...' : 'Access Admissions Dashboard →'}
                        </button>
                    </form>

                    <div
                        style={{
                            marginTop: '1.5rem',
                            padding: '0.85rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '10px',
                            textAlign: 'center',
                            fontSize: '0.8rem',
                            color: '#94a3b8'
                        }}
                    >
                        🔑 <strong>Master Admin Login:</strong> User: <code style={{ color: '#38bdf8' }}>admin</code> /
                        Pass: <code style={{ color: '#38bdf8' }}>admin123</code>
                    </div>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------
    // MAIN ADMISSIONS & ENQUIRIES DASHBOARD
    // ----------------------------------------------------
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#090d16',
                color: '#f1f5f9',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
            }}
        >
            {/* Top Navigation Bar */}
            <header
                style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '1rem 2rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/admin')}
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#cbd5e1',
                            padding: '0.5rem 0.8rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.85rem'
                        }}
                    >
                        <FaArrowLeft /> Admin Home
                    </button>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                            Admissions & Quick Enquiry Portal
                        </h1>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                            EASA College of Engineering & Technology — Lead Management System
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={fetchData}
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            padding: '0.55rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem'
                        }}
                    >
                        <FaSync className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>

                    {activeTab === 'admissions' && (
                        <>
                            <button
                                onClick={() => setShowAddAdmissionModal(true)}
                                style={{
                                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}
                            >
                                <FaPlus /> + New Admission Entry
                            </button>
                            <button
                                onClick={exportAdmissionsToExcel}
                                style={{
                                    background: '#059669',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}
                            >
                                <FaFileExcel /> Export Excel
                            </button>
                        </>
                    )}

                    {activeTab === 'enquiries' && (
                        <>
                            <button
                                onClick={() => setShowAddEnquiryModal(true)}
                                style={{
                                    background: 'linear-gradient(135deg, #d97706, #b45309)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}
                            >
                                <FaPlus /> + Log Offline Enquiry
                            </button>
                            <button
                                onClick={exportEnquiriesToExcel}
                                style={{
                                    background: '#059669',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.55rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}
                            >
                                <FaFileExcel /> Export Excel
                            </button>
                        </>
                    )}

                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            padding: '0.55rem 0.9rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
                {/* Metric Summary Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.25rem',
                        marginBottom: '2rem'
                    }}
                >
                    <div
                        onClick={() => setActiveTab('admissions')}
                        style={{
                            background:
                                activeTab === 'admissions'
                                    ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(30, 27, 75, 0.5))'
                                    : 'rgba(255, 255, 255, 0.03)',
                            border:
                                activeTab === 'admissions'
                                    ? '1px solid #3b82f6'
                                    : '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '16px',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                                Total Admission Forms
                            </span>
                            <FaGraduationCap style={{ color: '#38bdf8', fontSize: '1.3rem' }} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem' }}>
                            {stats.totalAdmissions}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                            {stats.pendingAdmissions} Pending Review
                        </div>
                    </div>

                    <div
                        onClick={() => setActiveTab('enquiries')}
                        style={{
                            background:
                                activeTab === 'enquiries'
                                    ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(69, 26, 3, 0.5))'
                                    : 'rgba(255, 255, 255, 0.03)',
                            border:
                                activeTab === 'enquiries'
                                    ? '1px solid #f59e0b'
                                    : '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '16px',
                            padding: '1.25rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                                Quick Enquiries / Leads
                            </span>
                            <FaEnvelopeOpenText style={{ color: '#fbbf24', fontSize: '1.3rem' }} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '0.5rem' }}>
                            {stats.totalEnquiries}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '0.2rem' }}>
                            {stats.newEnquiries} New Inquiries
                        </div>
                    </div>

                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '16px',
                            padding: '1.25rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                                Accepted Students
                            </span>
                            <FaUserCheck style={{ color: '#34d399', fontSize: '1.3rem' }} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', marginTop: '0.5rem' }}>
                            {stats.acceptedAdmissions}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                            Ready for enrollment
                        </div>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div
                    style={{
                        display: 'flex',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        marginBottom: '1.5rem',
                        gap: '1rem'
                    }}
                >
                    <button
                        onClick={() => {
                            setActiveTab('admissions');
                            setStatusFilter('all');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'admissions' ? '3px solid #3b82f6' : '3px solid transparent',
                            color: activeTab === 'admissions' ? '#ffffff' : '#94a3b8',
                            fontWeight: 700,
                            fontSize: '1rem',
                            padding: '0.75rem 1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaGraduationCap /> Admission Applications ({admissions.length})
                    </button>

                    <button
                        onClick={() => {
                            setActiveTab('enquiries');
                            setStatusFilter('all');
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'enquiries' ? '3px solid #f59e0b' : '3px solid transparent',
                            color: activeTab === 'enquiries' ? '#ffffff' : '#94a3b8',
                            fontWeight: 700,
                            fontSize: '1rem',
                            padding: '0.75rem 1.25rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaEnvelopeOpenText /> Quick Enquiries & Leads ({enquiries.length})
                    </button>
                </div>

                {/* Filters & Search Row */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div style={{ position: 'relative', flex: '1 1 280px' }}>
                        <FaSearch
                            style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#64748b'
                            }}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, phone, email, district, course..."
                            style={{
                                width: '100%',
                                padding: '0.65rem 1rem 0.65rem 2.6rem',
                                background: 'rgba(15, 23, 42, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Status Filter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaFilter style={{ color: '#94a3b8', fontSize: '0.85rem' }} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                padding: '0.65rem 1rem',
                                background: 'rgba(15, 23, 42, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '0.85rem',
                                outline: 'none'
                            }}
                        >
                            <option value="all">All Statuses</option>
                            {activeTab === 'admissions' ? (
                                <>
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </>
                            ) : (
                                <>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="resolved">Resolved</option>
                                </>
                            )}
                        </select>
                    </div>

                    {/* Course Filter for Admissions */}
                    {activeTab === 'admissions' && distinctCourses.length > 0 && (
                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            style={{
                                padding: '0.65rem 1rem',
                                background: 'rgba(15, 23, 42, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '0.85rem',
                                outline: 'none',
                                maxWidth: '260px'
                            }}
                        >
                            <option value="all">All Courses</option>
                            {distinctCourses.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* ---------------- TAB 1: ADMISSIONS ---------------- */}
                {activeTab === 'admissions' && (
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr
                                        style={{
                                            background: 'rgba(15, 23, 42, 0.9)',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                                        }}
                                    >
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>APPLICANT</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>CONTACT INFO</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>COURSE</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>LOCATION / COMM</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>STATUS</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>DATE</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem', textAlign: 'right' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAdmissions.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                                                No admission records found matching your filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAdmissions.map((adm) => (
                                            <tr
                                                key={adm._id}
                                                style={{
                                                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                                                    transition: 'background 0.2s'
                                                }}
                                            >
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{adm.name}</div>
                                                    {adm.percentage && (
                                                        <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
                                                            Marks: {adm.percentage}%
                                                        </div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontSize: '0.85rem' }}>
                                                        <a
                                                            href={`tel:${adm.phone}`}
                                                            style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                                        >
                                                            <FaPhoneAlt size={10} color="#34d399" /> {adm.phone}
                                                        </a>
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                                                        {adm.email}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
                                                    {adm.course}
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                                    <div>{adm.district || '—'}</div>
                                                    <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                                                        {adm.community || 'General'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <select
                                                        value={adm.status || 'Pending'}
                                                        onChange={(e) => handleUpdateAdmissionStatus(adm._id, e.target.value)}
                                                        style={{
                                                            padding: '0.35rem 0.65rem',
                                                            borderRadius: '6px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            background:
                                                                (adm.status || '').toLowerCase() === 'accepted'
                                                                    ? '#065f46'
                                                                    : (adm.status || '').toLowerCase() === 'reviewed'
                                                                    ? '#1e40af'
                                                                    : (adm.status || '').toLowerCase() === 'rejected'
                                                                    ? '#991b1b'
                                                                    : '#854d0e',
                                                            color: '#ffffff',
                                                            border: 'none',
                                                            outline: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Reviewed">Reviewed</option>
                                                        <option value="Accepted">Accepted</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                                                    {adm.date ? new Date(adm.date).toLocaleDateString() : '—'}
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => setSelectedAdmission(adm)}
                                                            title="View Full Details"
                                                            style={{
                                                                background: 'rgba(59, 130, 246, 0.15)',
                                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                                color: '#60a5fa',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <FaEye /> View
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAdmission(adm._id)}
                                                            title="Delete Record"
                                                            style={{
                                                                background: 'rgba(239, 68, 68, 0.15)',
                                                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                                                color: '#f87171',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
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
                    </div>
                )}

                {/* ---------------- TAB 2: ENQUIRIES ---------------- */}
                {activeTab === 'enquiries' && (
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr
                                        style={{
                                            background: 'rgba(15, 23, 42, 0.9)',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                                        }}
                                    >
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>ENQUIRER</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>CONTACT INFO</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>INTEREST / COURSE</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>MESSAGE / QUERY</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>STATUS</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>DATE</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem', textAlign: 'right' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEnquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                                                No enquiry leads found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredEnquiries.map((enq) => (
                                            <tr
                                                key={enq._id}
                                                style={{
                                                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                                                    transition: 'background 0.2s'
                                                }}
                                            >
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{enq.name}</div>
                                                    <span style={{ fontSize: '0.75rem', color: '#fbbf24' }}>
                                                        {enq.category || 'General'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontSize: '0.85rem' }}>
                                                        <a
                                                            href={`tel:${enq.phone}`}
                                                            style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                                        >
                                                            <FaPhoneAlt size={10} color="#34d399" /> {enq.phone}
                                                        </a>
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                                                        {enq.email}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
                                                    {enq.course || 'General Admission Enquiry'}
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#94a3b8', maxWidth: '300px' }}>
                                                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {enq.message || '—'}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <select
                                                        value={enq.status || 'New'}
                                                        onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                                                        style={{
                                                            padding: '0.35rem 0.65rem',
                                                            borderRadius: '6px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 600,
                                                            background:
                                                                (enq.status || '').toLowerCase() === 'resolved'
                                                                    ? '#065f46'
                                                                    : (enq.status || '').toLowerCase() === 'contacted'
                                                                    ? '#1e40af'
                                                                    : '#854d0e',
                                                            color: '#ffffff',
                                                            border: 'none',
                                                            outline: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="New">New</option>
                                                        <option value="Contacted">Contacted</option>
                                                        <option value="Resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                                                    {enq.submittedAt ? new Date(enq.submittedAt).toLocaleDateString() : '—'}
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => setSelectedEnquiry(enq)}
                                                            title="View Message"
                                                            style={{
                                                                background: 'rgba(245, 158, 11, 0.15)',
                                                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                                                color: '#fbbf24',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEnquiry(enq._id)}
                                                            title="Delete"
                                                            style={{
                                                                background: 'rgba(239, 68, 68, 0.15)',
                                                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                                                color: '#f87171',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer'
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
                    </div>
                )}
            </main>

            {/* ---------------- MODAL 1: VIEW ADMISSION DETAILS ---------------- */}
            {selectedAdmission && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 50,
                        padding: '1rem'
                    }}
                >
                    <div
                        style={{
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '650px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#ffffff' }}>
                                    {selectedAdmission.name}
                                </h3>
                                <span style={{ color: '#38bdf8', fontSize: '0.85rem' }}>
                                    Applied Course: {selectedAdmission.course}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedAdmission(null)}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Phone Number</div>
                                <a href={`tel:${selectedAdmission.phone}`} style={{ color: '#34d399', fontWeight: 600, textDecoration: 'none' }}>
                                    📞 {selectedAdmission.phone}
                                </a>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Email Address</div>
                                <a href={`mailto:${selectedAdmission.email}`} style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
                                    ✉️ {selectedAdmission.email}
                                </a>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>District & State</div>
                                <div style={{ color: '#f1f5f9' }}>{selectedAdmission.district || '—'}, {selectedAdmission.state || 'Tamil Nadu'}</div>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Community / Category</div>
                                <div style={{ color: '#f1f5f9' }}>{selectedAdmission.community || 'General'}</div>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Father's Name</div>
                                <div style={{ color: '#f1f5f9' }}>{selectedAdmission.fatherName || '—'}</div>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Mother's Name</div>
                                <div style={{ color: '#f1f5f9' }}>{selectedAdmission.motherName || '—'}</div>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>SSLC / 10th Marks</div>
                                <div style={{ color: '#f1f5f9' }}>{selectedAdmission.sslcMark ? `${selectedAdmission.sslcMark}%` : '—'}</div>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>HSC / 12th Marks / Percentage</div>
                                <div style={{ color: '#f1f5f9' }}>{selectedAdmission.hscMark || selectedAdmission.percentage ? `${selectedAdmission.hscMark || selectedAdmission.percentage}%` : '—'}</div>
                            </div>
                        </div>

                        {selectedAdmission.address && (
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Permanent Address</div>
                                <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                    {selectedAdmission.address} {selectedAdmission.pincode && `- ${selectedAdmission.pincode}`}
                                </div>
                            </div>
                        )}

                        {selectedAdmission.remarks && (
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Remarks / Notes</div>
                                <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                    {selectedAdmission.remarks}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Status:</span>
                                <select
                                    value={selectedAdmission.status || 'Pending'}
                                    onChange={(e) => handleUpdateAdmissionStatus(selectedAdmission._id, e.target.value)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        background: '#1e293b',
                                        color: '#ffffff',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Reviewed">Reviewed</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setSelectedAdmission(null)}
                                style={{
                                    background: '#334155',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------------- MODAL 2: VIEW ENQUIRY DETAILS ---------------- */}
            {selectedEnquiry && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 50,
                        padding: '1rem'
                    }}
                >
                    <div
                        style={{
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '550px',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#ffffff' }}>
                                    {selectedEnquiry.name}
                                </h3>
                                <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                                    Category: {selectedEnquiry.category || 'General Enquiry'}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedEnquiry(null)}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Phone Number</div>
                                <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#34d399', fontWeight: 600, textDecoration: 'none' }}>
                                    📞 {selectedEnquiry.phone}
                                </a>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Email Address</div>
                                <a href={`mailto:${selectedEnquiry.email}`} style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
                                    ✉️ {selectedEnquiry.email}
                                </a>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem' }}>Enquiry Message / Query</div>
                            <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                {selectedEnquiry.message || 'No specific message recorded.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Status:</span>
                                <select
                                    value={selectedEnquiry.status || 'New'}
                                    onChange={(e) => handleUpdateEnquiryStatus(selectedEnquiry._id, e.target.value)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        background: '#1e293b',
                                        color: '#ffffff',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setSelectedEnquiry(null)}
                                style={{
                                    background: '#334155',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------------- MODAL 3: ADD NEW MANUAL ADMISSION ---------------- */}
            {showAddAdmissionModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 50,
                        padding: '1rem'
                    }}
                >
                    <div
                        style={{
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '650px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#ffffff' }}>
                                + Add Manual Admission Entry
                            </h3>
                            <button
                                onClick={() => setShowAddAdmissionModal(false)}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleAddAdmissionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Applicant Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAdmissionForm.name}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, name: e.target.value })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        pattern="[0-9]{10}"
                                        title="Please enter a 10-digit mobile number"
                                        placeholder="10-digit Phone"
                                        value={newAdmissionForm.phone}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
                                    <input
                                        type="email"
                                        value={newAdmissionForm.email}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, email: e.target.value })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Course Applied *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAdmissionForm.course}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, course: e.target.value })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>District</label>
                                    <input
                                        type="text"
                                        value={newAdmissionForm.district}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, district: e.target.value })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Community</label>
                                    <select
                                        value={newAdmissionForm.community}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, community: e.target.value })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    >
                                        <option value="General">General / OC</option>
                                        <option value="BC">BC</option>
                                        <option value="MBC">MBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>HSC / 12th %</label>
                                    <input
                                        type="text"
                                        value={newAdmissionForm.percentage}
                                        onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, percentage: e.target.value })}
                                        placeholder="e.g. 85%"
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Remarks</label>
                                <textarea
                                    rows={3}
                                    value={newAdmissionForm.remarks}
                                    onChange={(e) => setNewAdmissionForm({ ...newAdmissionForm, remarks: e.target.value })}
                                    placeholder="Counselor notes or fee quota details..."
                                    style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddAdmissionModal(false)}
                                    style={{ background: '#334155', color: '#fff', padding: '0.65rem 1.25rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ background: '#0284c7', color: '#fff', padding: '0.65rem 1.25rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                                >
                                    Save Admission Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ---------------- MODAL 4: ADD NEW OFFLINE ENQUIRY ---------------- */}
            {showAddEnquiryModal && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 50,
                        padding: '1rem'
                    }}
                >
                    <div
                        style={{
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '520px',
                            padding: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.35rem', color: '#ffffff' }}>
                                + Log Offline / Phone Enquiry
                            </h3>
                            <button
                                onClick={() => setShowAddEnquiryModal(false)}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleAddEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={newEnquiryForm.name}
                                    onChange={(e) => setNewEnquiryForm({ ...newEnquiryForm, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        pattern="[0-9]{10}"
                                        title="Please enter a 10-digit mobile number"
                                        placeholder="10-digit Phone"
                                        value={newEnquiryForm.phone}
                                        onChange={(e) => setNewEnquiryForm({ ...newEnquiryForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Email</label>
                                    <input
                                        type="email"
                                        value={newEnquiryForm.email}
                                        onChange={(e) => setNewEnquiryForm({ ...newEnquiryForm, email: e.target.value })}
                                        style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Course / Interest</label>
                                <input
                                    type="text"
                                    value={newEnquiryForm.course}
                                    onChange={(e) => setNewEnquiryForm({ ...newEnquiryForm, course: e.target.value })}
                                    style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Message / Query Details</label>
                                <textarea
                                    rows={3}
                                    value={newEnquiryForm.message}
                                    onChange={(e) => setNewEnquiryForm({ ...newEnquiryForm, message: e.target.value })}
                                    style={{ width: '100%', padding: '0.65rem', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowAddEnquiryModal(false)}
                                    style={{ background: '#334155', color: '#fff', padding: '0.65rem 1.25rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ background: '#d97706', color: '#fff', padding: '0.65rem 1.25rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                                >
                                    Save Enquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdmissionEnquiryAdmin;
